/**
 * Video sıkıştırma script'i
 *
 * Her .mp4 için sıkıştırılmış sürüm üretir: <name>.compressed.mp4
 * Orijinaller silinmez — kullanıcı önce doğruluyor, sonra yer değiştiriyor.
 *
 * Kullanım:
 *   node scripts/compress-videos.mjs <file1> [file2] ...
 *   node scripts/compress-videos.mjs --all     # public/videos/ altındaki büyük yeni dosyalar
 *
 * Hedef: 720p (mobile için yeterli), H.264 CRF 28, ses kaldırılmış.
 * Beklenti: 100+ MB → 5-15 MB.
 */

import { execFileSync } from "node:child_process";
import { statSync, existsSync, readdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const VIDEOS_DIR = join(ROOT, "public", "videos");

// Yeni eklenen büyük videolar (varsayılan target listesi --all için)
const NEW_VIDEOS = [
  "feedeep-web.mp4",
  "feedeep-mobile-1.mp4",
  "feedeep-mobile-2.mp4",
  "gamzetango-web.mp4",
  "gamzetango-mobile.mp4",
  "alya-mobile-1.mp4",
  "alya-mobile-2.mp4",
];

function fmtMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(1) + " MB";
}

/**
 * Mobile dikey video → 720x1280 max
 * Desktop landscape → 1280x720 max
 * scale=-2: yüksekliği auto, çift sayıya yuvarla
 * scale=720:-2 → genişlik 720, yükseklik oran korunarak
 *
 * Mobile videoları portrait (h>w) olduğu için scale=720:-2 yanlış olur.
 * Cevap: scale='if(gt(iw,ih),720,-2)':'if(gt(iw,ih),-2,1280)' — ama karışık.
 *
 * Daha basit: scale='min(720,iw)':-2 → max 720 width, height auto.
 * Mobile portrait için height ~1280 olur (1080→1080 olmaz çünkü min 720).
 *
 * Ama mobile mockup içine sığacak — 720x1280 hedef boyut çok yüksek.
 * Mockup'taki ekran ~270×570 piksel görünüyor desktop'ta. 540×1080 yeterli.
 *
 * Karar: tek bir scale filter kullanalım, en uzun kenarı 1080'e indirelim.
 *   scale='if(gt(iw,ih),1080,-2)':'if(gt(iw,ih),-2,1080)'
 */
/**
 * Önce fps=30 (Samsung telefonların 60-120fps VFR kayıtlarını sabitler — bu cap olmadan
 * ffmpeg 90k fps yorumluyor ve dosya küçülmek yerine büyüyor),
 * sonra scale (en uzun kenar 1080px).
 */
const VIDEO_FILTER =
  "fps=30,scale='if(gt(iw,ih),1080,-2)':'if(gt(iw,ih),-2,1080)'";

function compressOne(inputPath) {
  if (!existsSync(inputPath)) {
    console.error(`✗ Bulunamadı: ${inputPath}`);
    return null;
  }

  const inSize = statSync(inputPath).size;
  const dir = dirname(inputPath);
  const name = basename(inputPath, ".mp4");
  const outputPath = join(dir, `${name}.compressed.mp4`);

  console.log(`\n→ ${basename(inputPath)} (${fmtMB(inSize)})`);
  console.log(`  output: ${basename(outputPath)}`);

  const args = [
    "-y",                          // overwrite output
    "-i", inputPath,
    "-vcodec", "libx264",
    "-crf", "28",                  // kalite/boyut dengesi (24=hi, 30=lo)
    "-preset", "slow",             // tek seferlik, slow daha iyi sıkıştırma
    "-vf", VIDEO_FILTER,
    "-r", "30",                    // çıktı frame rate sabitle
    "-pix_fmt", "yuv420p",         // her tarayıcıda oynar
    "-movflags", "+faststart",     // web için header en başta
    "-an",                         // ses kaldır
    outputPath,
  ];

  const t0 = Date.now();
  try {
    execFileSync(ffmpegPath, args, { stdio: ["ignore", "ignore", "pipe"] });
  } catch (err) {
    console.error(`  ✗ Hata: ${err.message}`);
    if (err.stderr) console.error(err.stderr.toString().slice(-500));
    return null;
  }

  const outSize = statSync(outputPath).size;
  const ratio = ((1 - outSize / inSize) * 100).toFixed(1);
  const dur = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`  ✓ ${fmtMB(outSize)} (${ratio}% küçüldü, ${dur}s)`);

  return { input: inputPath, output: outputPath, inSize, outSize };
}

// ── Argüman çözümleme ──
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Kullanım: node scripts/compress-videos.mjs <file1.mp4> [file2.mp4 ...]");
  console.error("        node scripts/compress-videos.mjs --all");
  process.exit(1);
}

let targets;
if (args[0] === "--all") {
  targets = NEW_VIDEOS.map((n) => join(VIDEOS_DIR, n));
} else {
  targets = args.map((a) => (a.includes("/") || a.includes("\\") ? a : join(VIDEOS_DIR, a)));
}

console.log(`Hedef: ${targets.length} dosya\n`);

const results = [];
for (const t of targets) {
  const r = compressOne(t);
  if (r) results.push(r);
}

console.log("\n══════════════════════════════════════════════");
console.log("Özet:");
let totalIn = 0, totalOut = 0;
for (const r of results) {
  console.log(
    `  ${basename(r.input).padEnd(28)} ${fmtMB(r.inSize).padStart(10)} → ${fmtMB(r.outSize).padStart(10)}`
  );
  totalIn += r.inSize;
  totalOut += r.outSize;
}
console.log("──────────────────────────────────────────────");
console.log(`  TOPLAM                       ${fmtMB(totalIn).padStart(10)} → ${fmtMB(totalOut).padStart(10)}`);
console.log(`  Tasarruf: ${fmtMB(totalIn - totalOut)} (${((1 - totalOut / totalIn) * 100).toFixed(1)}%)`);
console.log("══════════════════════════════════════════════\n");
console.log("Doğrula → public/videos/ içindeki *.compressed.mp4 dosyalarını oynat.");
console.log("Onaylı → script'in aşağıdaki bloğunu çalıştır (manuel veya replace komutuyla):");
console.log("  for f in *.compressed.mp4; do mv \"$f\" \"${f/.compressed.mp4/.mp4}\"; done");
