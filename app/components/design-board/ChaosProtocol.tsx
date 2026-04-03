"use client";

import { motion, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import {
  SPACING,
  ANIMATION,
  COLORS,
  TYPOGRAPHY,
  fadeUp,
} from "@/app/lib/design-tokens";
import SectionHeader from "@/app/components/ui/SectionHeader";

// ============================================
// KAOS PROTOKOLU
// Duzen icinde kirilma ani. Temiz tasarim dili
// aniden bozulur, kaosa doner, sonra toparlanir.
// Jinx estetigi ÔÇö ama isim yok, konsept var.
// ============================================

// Kaos renk paleti ÔÇö mevcut sistemin antitezi
const CHAOS = {
  magenta: "#FF44CC",
  cyan: "#00FFFF",
  purple: "#1A0030",
  pink: "#FF0066",
  acid: "#39FF14",
  violet: "#8B00FF",
} as const;

// --- 01: GLITCH TYPOGRAPHY ---
// Temiz baslik metni, scroll ile titresmeye baslar.
// Harfler rastgele sembollerle yer degistirir, renkler bozulur.
function GlitchTypography() {
  const originalText = "Can Demir";
  const glitchChars = "!@#$%^&*<>{}[]|/\\~?.,:;";
  const chaosWords = [
    // Ofke / isyan
    "Kafayi yicem",
    "Itaat etme",
    "Otoriteyi yik",
    "Sikicem",
    "Yeter artik",
    "Dur artik",
    "HAYIIIIIIIR",
    "Kac burdan",
    "Birakin beni",
    // Yalnizlik / ac─▒
    "Yalnizim",
    "Canim yaniyor",
    "Kimse duymuyor",
    "Kimse aramiyor",
    "Oda cok sessiz",
    "Duvarlara konusuyorum",
    "Mesajlar okunmadi",
    "Son gorulme: 3 gun once",
    "0 bildirim",
    "Hep ayni tavan",
    "Uyaninca kimse yok",
    "Yataktan cikmak zor",
    "Dis cephe gulumseme",
    // Panik / cigilk
    "AAAAAAAAAAA",
    "HAHAHAHAHAHA",
    "Nefes alamiyorum",
    "Cigilk atacam",
    "Kontrolu kaybettim",
    "Geri donus yok",
    "Neden neden neden",
    "Yaniyorum",
    "Bas agriyor",
    "Uykusuzluk",
    "Kac gundur uyumadim",
    // Varolussel
    "Hic bir sey gercek degil",
    "Hersey yalan",
    "Niye burdayim",
    "Anlami ne",
    "Kim bu aynada",
    "Tanimiyor kendimi",
    "Kayboldum",
    "Ici bos",
    "Hissizlik",
    // Tekrarlayan / obsesif
    "tekrar tekrar tekrar",
    "dur dur dur dur",
    "yok yok yok yok",
    // Yuzler / ifadeler
    ":)",
    ":(",
    ":) :) :)",
    "(:        :)",
    ":))))))))",
    ":/",
    ":]  ...  :[",
    ":) iyiyim :)",
    ":( :( :(",
    "^_^",
    "<_>",
    ">:(",
  ];

  // Odak kelimeleri ÔÇö 2x gosterilecek, daha uzun kalacak
  const focusWords = [
    "Yalnizim",
    "Canim yaniyor",
    ":) iyiyim :)",
    "Kimse duymuyor",
    "0 bildirim",
    "AAAAAAAAAAA",
    "Hissizlik",
  ];

  // Renk paleti ÔÇö surekli degisen, sadece pembe/mavi degil
  const chaosColorPool = [
    "#FF44CC", // magenta
    "#00FFFF", // cyan
    "#39FF14", // acid green
    "#FF0066", // hot pink
    "#8B00FF", // violet
    "#FFD700", // gold
    "#FF4500", // orange red
    "#00FF88", // mint
    "#FF1493", // deep pink
    "#7DF9FF", // electric blue
    "#FF6EC7", // neon pink
    "#ADFF2F", // green yellow
  ];

  const [text, setText] = useState(originalText);
  const [chaosLevel, setChaosLevel] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentColor, setCurrentColor] = useState<string>(COLORS.snow);
  const [offsetColor1, setOffsetColor1] = useState<string>(CHAOS.cyan);
  const [offsetColor2, setOffsetColor2] = useState<string>(CHAOS.magenta);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const colorTickRef = useRef(0);

  const pickColor = useCallback(() => {
    return chaosColorPool[Math.floor(Math.random() * chaosColorPool.length)];
  }, []);

  const corruptText = useCallback((source: string, intensity: number) => {
    return source
      .split("")
      .map((char) =>
        Math.random() < intensity * 0.5
          ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
          : char
      )
      .join("");
  }, []);

  useEffect(() => {
    if (!isHovered) {
      setText(originalText);
      setChaosLevel(0);
      setCurrentColor(COLORS.snow);
      setOffsetColor1(CHAOS.cyan);
      setOffsetColor2(CHAOS.magenta);
      colorTickRef.current = 0;
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    let tick = 0;
    let focusCounter = 0;
    let focusText = "";
    let cancelled = false;

    // Dinamik hiz: baslangicta yavas, ortada hizli
    // 120ms ÔåÆ 100 ÔåÆ 80 ÔåÆ 60 ÔåÆ 50 ÔåÆ 40ms (kaos zirvesi) 
    const getSpeed = (chaos: number) => {
      if (chaos < 0.15) return 120;
      if (chaos < 0.25) return 100;
      if (chaos < 0.4) return 80;
      if (chaos < 0.6) return 60;
      if (chaos < 0.8) return 50;
      return 40;
    };

    const runTick = () => {
      if (cancelled) return;
      tick++;
      colorTickRef.current++;
      const chaos = Math.min(tick / 10, 1);
      setChaosLevel(chaos);

      // Renk gecisi
      if (colorTickRef.current % 2 === 0 && chaos > 0.2) {
        setCurrentColor(pickColor());
        setOffsetColor1(pickColor());
        setOffsetColor2(pickColor());
      }

      // Odak kelimesi aktifse kalsin
      if (focusCounter > 0) {
        focusCounter--;
        setText(focusText);
      } else if (chaos < 0.3) {
        setText(corruptText(originalText, chaos));
        setCurrentColor(COLORS.snow);
      } else if (chaos < 1) {
        const word = chaosWords[Math.floor(Math.random() * chaosWords.length)];
        const isFocus = focusWords.includes(word);
        if (isFocus && Math.random() < 0.5) {
          focusText = word;
          focusCounter = 1;
          setText(word);
        } else if (Math.random() < 0.35) {
          setText(corruptText(word, chaos * 0.3));
        } else {
          const fragment = word.slice(0, Math.floor(Math.random() * word.length) + 2);
          const noise = Array.from({ length: 3 + Math.floor(Math.random() * 5) }, () =>
            glitchChars[Math.floor(Math.random() * glitchChars.length)]
          ).join("");
          setText(Math.random() > 0.5 ? fragment + noise : noise + fragment);
        }
      } else {
        const word = chaosWords[Math.floor(Math.random() * chaosWords.length)];
        const isFocus = focusWords.includes(word);
        if (isFocus) {
          focusText = word;
          focusCounter = 1;
          setText(word);
        } else {
          setText(Math.random() < 0.6 ? word : corruptText(word, 0.4));
        }
      }

      // Zirve sonrasi ÔåÆ toparlanma fazina gec
      if (tick > 35) {
        startRecovery();
        return;
      }

      // Sonraki tick ÔÇö dinamik hizla
      intervalRef.current = setTimeout(runTick, getSpeed(chaos)) as unknown as ReturnType<typeof setInterval>;
    };

    const startRecovery = () => {
      let recovery = 24;
      // Toparlanma: hizli baslar, yavaslar
      // 40ms ÔåÆ 50 ÔåÆ 60 ÔåÆ 80 ÔåÆ 100 ÔåÆ 120ms
      const getRecoverySpeed = (rchaos: number) => {
        if (rchaos > 0.8) return 40;
        if (rchaos > 0.6) return 50;
        if (rchaos > 0.4) return 60;
        if (rchaos > 0.25) return 80;
        if (rchaos > 0.1) return 100;
        return 120;
      };

      const runRecovery = () => {
        if (cancelled) return;
        recovery--;
        colorTickRef.current++;
        const rchaos = Math.max(recovery / 24, 0);
        setChaosLevel(rchaos);

        if (colorTickRef.current % 3 === 0) {
          if (rchaos > 0.3) {
            setCurrentColor(pickColor());
          } else {
            setCurrentColor(COLORS.snow);
          }
          setOffsetColor1(rchaos > 0.3 ? pickColor() : CHAOS.cyan);
          setOffsetColor2(rchaos > 0.3 ? pickColor() : CHAOS.magenta);
        }

        if (rchaos > 0.5) {
          const word = chaosWords[Math.floor(Math.random() * chaosWords.length)];
          setText(corruptText(word, rchaos));
        } else if (rchaos > 0.1) {
          setText(corruptText(originalText, rchaos));
        } else {
          setText(originalText);
          setCurrentColor(COLORS.snow);
        }

        if (recovery <= 0) {
          // Goz segirmesi ÔÇö tam bitti derken ufak titresmeler
          setText(originalText);
          setChaosLevel(0);
          setCurrentColor(COLORS.snow);

          const twitch = (count: number) => {
            if (cancelled || count <= 0) {
              setText(originalText);
              setChaosLevel(0);
              setCurrentColor(COLORS.snow);
              setOffsetColor1(CHAOS.cyan);
              setOffsetColor2(CHAOS.magenta);
              return;
            }
            // Kisa bir bozulma
            const glitchAmount = count * 0.08;
            setText(corruptText(originalText, glitchAmount));
            setChaosLevel(glitchAmount);
            setCurrentColor(count % 2 === 0 ? pickColor() : COLORS.snow);

            setTimeout(() => {
              // Hemen duzelt
              setText(originalText);
              setChaosLevel(0);
              setCurrentColor(COLORS.snow);

              // Artan bekleme ÔÇö segirmeler seyreklesir
              const pause = 200 + (4 - count) * 180;
              setTimeout(() => twitch(count - 1), pause);
            }, 60 + Math.random() * 40);
          };

          // 3 segirme: kisa bekleme sonra pat, pat, pat
          setTimeout(() => twitch(3), 300);
          return;
        }

        intervalRef.current = setTimeout(runRecovery, getRecoverySpeed(rchaos)) as unknown as ReturnType<typeof setInterval>;
      };

      runRecovery();
    };

    // Basla
    intervalRef.current = setTimeout(runTick, getSpeed(0)) as unknown as ReturnType<typeof setInterval>;

    return () => {
      cancelled = true;
      if (intervalRef.current) clearTimeout(intervalRef.current as unknown as number);
    };
  }, [isHovered, corruptText, pickColor]);

  return (
    <motion.div {...fadeUp}>
      <div
        className="rounded-2xl overflow-hidden cursor-pointer relative"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${chaosLevel > 0.5 ? CHAOS.magenta + "40" : COLORS.glassBorder}`,
          padding: "clamp(56px, 10vw, 100px) clamp(24px, 4vw, 48px)",
          transition: "background-color 0.3s, border-color 0.3s",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setChaosLevel(0);
          setText(originalText);
        }}
      >
        <div className="text-center relative">
          {/* Kaos RGB offset katmanlari */}
          {chaosLevel > 0.2 && (
            <>
              <p
                className="absolute inset-0 font-light tracking-tighter"
                style={{
                  fontSize: "clamp(4rem, 10vw, 8rem)",
                  lineHeight: 1,
                  color: offsetColor1,
                  opacity: chaosLevel * 0.4,
                  transform: `translate(${chaosLevel * -4}px, ${chaosLevel * -2}px)`,
                  mixBlendMode: "screen",
                }}
              >
                {text}
              </p>
              <p
                className="absolute inset-0 font-light tracking-tighter"
                style={{
                  fontSize: "clamp(4rem, 10vw, 8rem)",
                  lineHeight: 1,
                  color: offsetColor2,
                  opacity: chaosLevel * 0.4,
                  transform: `translate(${chaosLevel * 4}px, ${chaosLevel * 2}px)`,
                  mixBlendMode: "screen",
                }}
              >
                {text}
              </p>
            </>
          )}

          {/* Ana metin */}
          <p
            className="font-light tracking-tighter relative"
            style={{
              fontSize: "clamp(4rem, 10vw, 8rem)",
              lineHeight: 1,
              color: chaosLevel > 0.2 ? currentColor : COLORS.snow,
              transform: chaosLevel > 0.3
                ? `skewX(${(Math.random() - 0.5) * chaosLevel * 6}deg)`
                : "none",
              transition: "color 0.15s",
            }}
          >
            {text}
          </p>

        </div>
      </div>
    </motion.div>
  );
}

// --- 02: COLOR INVASION ---
// Amber palette yavasta neon kaos renklerine donusur.
// Renk cubugu ustunde savas ÔÇö duzen vs kaos.
function ColorInvasion() {
  const [invasionProgress, setInvasionProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInvasion = useCallback(() => {
    if (isActive) return;
    setIsActive(true);
    let progress = 0;

    animRef.current = setInterval(() => {
      progress += 0.015;
      if (progress >= 1) {
        // Geri don
        const retreat = setInterval(() => {
          progress -= 0.02;
          setInvasionProgress(Math.max(0, progress));
          if (progress <= 0) {
            clearInterval(retreat);
            setIsActive(false);
          }
        }, 30);
        clearInterval(animRef.current!);
        return;
      }
      setInvasionProgress(progress);
    }, 30);
  }, [isActive]);

  // Duzen renkleri
  const orderColors = [COLORS.lamp.bright, COLORS.lamp.warm, COLORS.lamp.glow, COLORS.lamp.dim];
  // Kaos renkleri
  const chaosColors = [CHAOS.magenta, CHAOS.cyan, CHAOS.acid, CHAOS.pink];

  return (
    <motion.div {...fadeUp}>
      <div
        className="rounded-2xl overflow-hidden cursor-pointer"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${invasionProgress > 0.3 ? CHAOS.magenta + "30" : COLORS.glassBorder}`,
          padding: "clamp(40px, 6vw, 64px) clamp(24px, 4vw, 48px)",
          transition: "border-color 0.3s",
        }}
        onClick={startInvasion}
      >
        {/* Renk cubugu ÔÇö sol duzen, sag kaos */}
        <div className="flex h-12 rounded-lg overflow-hidden mb-6">
          {orderColors.map((color, i) => {
            const threshold = (i + 1) / orderColors.length;
            const invaded = invasionProgress >= threshold;
            const transitioning = invasionProgress > threshold - 0.25 && invasionProgress < threshold;

            return (
              <motion.div
                key={i}
                className="flex-1 relative overflow-hidden"
                animate={{
                  backgroundColor: invaded ? chaosColors[i] : color,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Kaos dalgasi kenari */}
                {transitioning && (
                  <motion.div
                    className="absolute inset-y-0 right-0"
                    style={{
                      width: "60%",
                      background: `linear-gradient(90deg, transparent, ${chaosColors[i]})`,
                    }}
                    animate={{ opacity: [0, 0.8, 0.4] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}

                {/* Etiket */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "9px",
                      color: invaded ? CHAOS.purple : COLORS.void,
                      fontWeight: invaded ? 700 : 400,
                    }}
                  >
                    {invaded ? "X" : "ÔÇö"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Durum cubugu */}
        <div className="relative h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.slate }}>
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${CHAOS.magenta}, ${CHAOS.cyan})`,
            }}
            animate={{ width: `${invasionProgress * 100}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>

        {/* Etkiletler */}
        <div className="flex justify-between mt-4">
          <span className="font-mono" style={{ fontSize: "10px", color: invasionProgress > 0.5 ? CHAOS.magenta : COLORS.lamp.dim }}>
            {invasionProgress > 0.7 ? "Istila: %" + Math.round(invasionProgress * 100) : invasionProgress > 0 ? "Yayiliyor..." : "Duzen"}
          </span>
          <span className="font-mono" style={{ fontSize: "10px", color: COLORS.ash }}>
            {isActive ? "Mudahale edilemiyor" : "Tikla ÔåÆ istila baslat"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// --- 03: GRID EXPLOSION ---
// Duzgun grid ÔåÆ patlama ÔåÆ parcalar dag─▒lir ÔåÆ geri toplanir.
// Tikla ile tetiklenir. Spring fizigi ile parcalar ucar.
function GridExplosion() {
  const [exploded, setExploded] = useState(false);
  const gridSize = 16;

  const cells = useMemo(() =>
    Array.from({ length: gridSize }, (_, i) => ({
      id: i,
      row: Math.floor(i / 4),
      col: i % 4,
      // Patlama vektorleri ÔÇö merkezden disari
      explosionX: (i % 4 - 1.5) * (40 + Math.random() * 60),
      explosionY: (Math.floor(i / 4) - 1.5) * (40 + Math.random() * 60),
      rotation: (Math.random() - 0.5) * 180,
      chaosColor: [CHAOS.magenta, CHAOS.cyan, CHAOS.acid, CHAOS.pink, CHAOS.violet][
        Math.floor(Math.random() * 5)
      ],
    })),
    []
  );

  const toggle = useCallback(() => {
    setExploded(true);
    setTimeout(() => setExploded(false), 2000);
  }, []);

  return (
    <motion.div {...fadeUp}>
      <div
        className="rounded-2xl overflow-hidden cursor-pointer relative"
        style={{
          backgroundColor: exploded ? CHAOS.purple : COLORS.void,
          border: `1px solid ${exploded ? CHAOS.magenta + "30" : COLORS.glassBorder}`,
          padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
          transition: "background-color 0.5s, border-color 0.5s",
        }}
        onClick={toggle}
      >
        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
          {cells.map((cell) => (
            <motion.div
              key={cell.id}
              className="aspect-square rounded-md"
              animate={
                exploded
                  ? {
                      x: cell.explosionX,
                      y: cell.explosionY,
                      rotate: cell.rotation,
                      scale: 0.6 + Math.random() * 0.8,
                      backgroundColor: cell.chaosColor,
                      borderColor: cell.chaosColor,
                    }
                  : {
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                      backgroundColor: COLORS.carbon,
                      borderColor: COLORS.glassBorder,
                    }
              }
              transition={{
                type: "spring",
                stiffness: exploded ? 80 : 200,
                damping: exploded ? 8 : 20,
                delay: exploded ? cell.id * 0.02 : (gridSize - cell.id) * 0.02,
              }}
              style={{
                border: "1px solid",
              }}
            />
          ))}
        </div>

        {/* Patlama aninda cikan X isaretleri */}
        <AnimatePresence>
          {exploded && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`x-${i}`}
                  className="absolute pointer-events-none font-light"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 6rem)",
                    color: CHAOS.magenta,
                    opacity: 0.15,
                    left: `${20 + i * 25}%`,
                    top: `${15 + i * 20}%`,
                  }}
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1.5, rotate: 0 + i * 15 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  X
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// --- 04: GRAFFITI OVERLAY ---
// Temiz yuzeye SVG spray paint storke'lari beliriyor.
// Scroll ile tetiklenir. Organik, el cizimi gibi path'ler.
function GraffitiOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isInView) setKey((k) => k + 1);
  }, [isInView]);

  // Graffiti stroke path'leri ÔÇö agresif, angular
  const strokes = useMemo(() => [
    { d: "M 30 120 L 170 30", color: CHAOS.magenta, width: 4, delay: 0 },
    { d: "M 170 120 L 30 30", color: CHAOS.magenta, width: 4, delay: 0.1 },
    { d: "M 200 80 Q 250 20, 350 60 T 450 40", color: CHAOS.cyan, width: 3, delay: 0.4 },
    { d: "M 280 110 C 300 10, 380 130, 420 20", color: CHAOS.acid, width: 2, delay: 0.7 },
    { d: "M 100 140 Q 200 160, 350 130", color: CHAOS.pink, width: 5, delay: 0.3 },
    // Kucuk detaylar
    { d: "M 380 90 L 420 90", color: CHAOS.cyan, width: 2, delay: 0.9 },
    { d: "M 400 80 L 400 100", color: CHAOS.cyan, width: 2, delay: 0.95 },
  ], []);

  return (
    <div ref={ref}>
      <motion.div {...fadeUp}>
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{
            backgroundColor: COLORS.void,
            border: `1px solid ${COLORS.glassBorder}`,
          }}
        >
          {/* Temiz arka plan icerigi */}
          <div
            className="flex flex-col items-center justify-center"
            style={{ padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)" }}
          >
            <p
              className="font-light tracking-tighter"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: COLORS.snow,
                opacity: 0.15,
              }}
            >
              temiz yuzeye dokunma
            </p>
          </div>

          {/* Graffiti SVG katmani */}
          <svg
            viewBox="0 0 480 160"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            style={{ overflow: "visible" }}
          >
            {strokes.map((stroke, i) => (
              <motion.path
                key={`${key}-${i}`}
                d={stroke.d}
                fill="none"
                stroke={stroke.color}
                strokeWidth={stroke.width}
                strokeLinecap="round"
                strokeDasharray="500"
                initial={{ strokeDashoffset: 500, opacity: 0 }}
                animate={
                  isInView
                    ? { strokeDashoffset: 0, opacity: 0.8 }
                    : { strokeDashoffset: 500, opacity: 0 }
                }
                transition={{
                  duration: 0.5,
                  delay: stroke.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  filter: `drop-shadow(0 0 ${stroke.width * 2}px ${stroke.color}80)`,
                }}
              />
            ))}
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

// --- 05: FONT DISTORTION ---
// Ayni cumle 5 seviyede gosteriliyor: temiz ÔåÆ hafif bozulma ÔåÆ orta ÔåÆ
// agir ÔåÆ tam kaos. Her seviye CSS transform ile farkli distorsiyon.
function FontDistortion() {
  const phrase = "tasarim kurallari";
  const levels = useMemo(() => [
    {
      label: "Seviye 0 ÔÇö Duzen",
      style: {
        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
        fontWeight: 300,
        letterSpacing: "-0.02em",
        color: COLORS.snow,
        transform: "none",
      } as React.CSSProperties,
    },
    {
      label: "Seviye 1 ÔÇö Titresim",
      style: {
        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
        fontWeight: 300,
        letterSpacing: "0.05em",
        color: COLORS.snow,
        transform: "skewX(-2deg)",
        textShadow: `1px 0 ${CHAOS.magenta}30`,
      } as React.CSSProperties,
    },
    {
      label: "Seviye 2 ÔÇö Bozulma",
      style: {
        fontSize: "clamp(1.7rem, 3.5vw, 2.8rem)",
        fontWeight: 500,
        letterSpacing: "0.1em",
        color: CHAOS.magenta,
        transform: "skewX(-5deg) scaleY(1.1)",
        textShadow: `2px 0 ${CHAOS.cyan}50, -2px 0 ${CHAOS.magenta}50`,
      } as React.CSSProperties,
    },
    {
      label: "Seviye 3 ÔÇö Kirilma",
      style: {
        fontSize: "clamp(2rem, 4vw, 3.2rem)",
        fontWeight: 700,
        letterSpacing: "0.2em",
        color: CHAOS.cyan,
        transform: "skewX(-10deg) scaleY(1.3) rotate(-2deg)",
        textShadow: `4px 2px ${CHAOS.magenta}, -3px -1px ${CHAOS.acid}80`,
      } as React.CSSProperties,
    },
    {
      label: "Seviye 4 ÔÇö Tam Kaos",
      style: {
        fontSize: "clamp(2.5rem, 5vw, 4rem)",
        fontWeight: 900,
        letterSpacing: "0.35em",
        color: CHAOS.acid,
        transform: "skewX(-15deg) scaleY(1.5) rotate(-4deg) scaleX(1.2)",
        textShadow: `6px 3px ${CHAOS.magenta}, -5px -2px ${CHAOS.cyan}, 3px -4px ${CHAOS.pink}`,
        textTransform: "uppercase" as const,
      } as React.CSSProperties,
    },
  ], []);

  return (
    <motion.div {...fadeUp}>
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          padding: "clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)",
        }}
      >
        <div className="space-y-6">
          {levels.map((level, i) => (
            <div key={i}>
              <span
                className="font-mono block mb-2"
                style={{
                  fontSize: "9px",
                  color: i > 2 ? CHAOS.magenta : COLORS.ash,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
              >
                {level.label}
              </span>
              <p
                className="font-light tracking-tighter"
                style={level.style}
              >
                {phrase}
              </p>
              {i < levels.length - 1 && (
                <div
                  className="h-px mt-4"
                  style={{
                    backgroundColor: i > 1 ? `${CHAOS.magenta}20` : COLORS.glassBorder,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// --- 06: RECOVERY SEQUENCE ---
// Tam kaos durumundan duzene donus.
// Tikla ÔåÆ kaos parcalari merkezden disari itilir,
// temiz yuzey alttan yukari reveal olur.
function RecoverySequence() {
  const [phase, setPhase] = useState<"chaos" | "recovering" | "clean">("chaos");

  const triggerRecovery = useCallback(() => {
    if (phase === "recovering") return;
    if (phase === "clean") {
      setPhase("chaos");
      return;
    }
    setPhase("recovering");
    setTimeout(() => setPhase("clean"), 1800);
  }, [phase]);

  // Kaos parcaciklari ÔÇö client-only to avoid hydration mismatch
  const [chaosParticles, setChaosParticles] = useState<
    { id: number; x: number; y: number; size: number; color: string; shape: string }[]
  >([]);

  useEffect(() => {
    setChaosParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.random() * 20,
        color: [CHAOS.magenta, CHAOS.cyan, CHAOS.acid, CHAOS.pink, CHAOS.violet][
          Math.floor(Math.random() * 5)
        ],
        shape: Math.random() > 0.5 ? "circle" : "rect",
      }))
    );
  }, []);

  return (
    <motion.div {...fadeUp}>
      <div
        className="rounded-2xl overflow-hidden cursor-pointer relative"
        style={{
          backgroundColor: phase === "clean" ? COLORS.void : CHAOS.purple,
          border: `1px solid ${phase === "clean" ? COLORS.glassBorder : CHAOS.magenta + "30"}`,
          height: "280px",
          transition: "background-color 0.8s, border-color 0.8s",
        }}
        onClick={triggerRecovery}
      >
        {/* Kaos parcaciklari */}
        {chaosParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.shape === "circle" ? "50%" : "2px",
              boxShadow: `0 0 ${p.size}px ${p.color}60`,
            }}
            animate={
              phase === "chaos"
                ? {
                    opacity: [0.3, 0.8, 0.3],
                    rotate: [0, 180, 360],
                    scale: [0.8, 1.2, 0.8],
                  }
                : phase === "recovering"
                ? {
                    opacity: 0,
                    scale: 0,
                    x: (p.x - 50) * 5,
                    y: (p.y - 50) * 5,
                  }
                : { opacity: 0, scale: 0 }
            }
            transition={
              phase === "chaos"
                ? { duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}

        {/* Temiz yuzey ÔÇö alttan reveal */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            backgroundColor: COLORS.void,
          }}
          animate={{
            clipPath:
              phase === "clean"
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : phase === "recovering"
                ? "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)"
                : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-light tracking-tighter"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1,
              color: COLORS.lamp.bright,
              textShadow: `0 0 40px ${COLORS.lamp.glow}40`,
            }}
          >
            Kontrol
          </p>
          <p className="font-mono mt-4" style={{ fontSize: "10px", color: COLORS.concrete }}>
            Duzen yeniden kuruldu
          </p>
        </motion.div>

        {/* Durum */}
        <div className="absolute bottom-4 right-5">
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              color: phase === "chaos" ? CHAOS.magenta : phase === "recovering" ? CHAOS.cyan : COLORS.lamp.dim,
            }}
          >
            {phase === "chaos"
              ? "Tikla ÔåÆ duzeni geri getir"
              : phase === "recovering"
              ? "Toparlaniliyor..."
              : "Tikla ÔåÆ kaosu geri cagir"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN CHAOS PROTOCOL COMPONENT
// ============================================
export default function ChaosProtocol() {
  return (
    <div>
      <SectionHeader
        number="08"
        title="Kaos Protokolu"
        description="Kirilma ani. Temiz tasarim dili aniden bozulur, neon kaos ele gecirir, sonra duzen geri doner. Her demo kaosin bir fazini gosteriyor."
      />

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: CHAOS.magenta, marginBottom: SPACING.heading }}
        >
          01 ÔÇö Glitch Typography
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Temiz baslik hover ile bozulmaya baslar. Harfler rastgele sembollerle yer degistirir, RGB kanallari kayar, font carpilir. Sonra kendi kendine toparlanir.
        </p>
        <GlitchTypography />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: CHAOS.magenta, marginBottom: SPACING.heading }}
        >
          02 ÔÇö Color Invasion
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Amber duzen paleti neon kaos renkleri tarafindan istila ediliyor. Renk cubugu soldan saga ele geciriliyor. Sonra geri cekilir.
        </p>
        <ColorInvasion />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: CHAOS.magenta, marginBottom: SPACING.heading }}
        >
          03 ÔÇö Grid Explosion
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Duzgun grid patlayarak dag─▒l─▒r. Spring fizigi ile parcalar uca, X isaretleri belirir. 2 saniye sonra duzen geri gelir.
        </p>
        <GridExplosion />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: CHAOS.magenta, marginBottom: SPACING.heading }}
        >
          04 ÔÇö Graffiti Overlay
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Temiz yuzeye SVG spray paint cizimleri beliriyor. X isareti, capraz cizgiler, kaotik stroke'lar. Scroll ile tetiklenir.
        </p>
        <GraffitiOverlay />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: CHAOS.magenta, marginBottom: SPACING.heading }}
        >
          05 ÔÇö Font Distortion
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Ayni cumle 5 seviyede distorsiyon. Temiz ÔåÆ titresim ÔåÆ bozulma ÔåÆ kirilma ÔåÆ tam kaos. Her seviyede font weight, skew, scale ve renk degisiyor.
        </p>
        <FontDistortion />
      </div>

      <div style={{ marginBottom: SPACING.element }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: CHAOS.magenta, marginBottom: SPACING.heading }}
        >
          06 ÔÇö Recovery Sequence
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Tam kaos durumundan duzene donus. Parcaciklar merkezden disari itilir, temiz yuzey alttan reveal olur. Tikla ÔåÆ duzen geri gelir. Tekrar tikla ÔåÆ kaos doner.
        </p>
        <RecoverySequence />
      </div>
    </div>
  );
}