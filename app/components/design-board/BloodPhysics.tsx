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
// KAN FİZİĞİ — Blood Physics
// Kanın, ateşin ve kızılötesinin fiziksel
// fenomenlerini dijital ortama taşıyan animasyonlar.
// İkincil accent: Maroon / Crimson sistemi.
// ============================================

// --- 01: PULSE / NABIZ ---
// Kalp atışı ritmine senkronize yüzük genişleme/daralma.
// Gerçek EKG ritmi: sistol-diastol asimetrik pattern.
function Pulse() {
  const [bpm] = useState(72);
  const beatDuration = 60 / bpm;

  return (
    <motion.div {...fadeUp}>
      <div
        className="rounded-2xl overflow-hidden flex items-center justify-center relative"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          padding: "clamp(56px, 10vw, 100px) clamp(24px, 4vw, 48px)",
        }}
      >
        {/* Dış dalga — en soluk, en geniş */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 200,
            height: 200,
            border: `1px solid ${COLORS.maroon.neon}15`,
          }}
          animate={{
            scale: [1, 1.6, 1.6, 1],
            opacity: [0.3, 0.05, 0.05, 0.3],
          }}
          transition={{
            duration: beatDuration,
            repeat: Infinity,
            times: [0, 0.15, 0.5, 1],
            ease: "easeOut",
          }}
        />

        {/* Orta dalga */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 140,
            height: 140,
            border: `1px solid ${COLORS.maroon.neon}30`,
          }}
          animate={{
            scale: [1, 1.35, 1.35, 1],
            opacity: [0.5, 0.1, 0.1, 0.5],
          }}
          transition={{
            duration: beatDuration,
            repeat: Infinity,
            times: [0, 0.15, 0.5, 1],
            ease: "easeOut",
          }}
        />

        {/* İç çekirdek — nabız merkezi */}
        <motion.div
          className="relative rounded-full flex items-center justify-center"
          style={{
            width: 80,
            height: 80,
            backgroundColor: COLORS.maroon.dark,
            border: `1px solid ${COLORS.maroon.warm}`,
          }}
          animate={{
            scale: [1, 1.12, 0.97, 1],
            boxShadow: [
              `0 0 0px ${COLORS.maroon.neon}00`,
              `0 0 50px ${COLORS.maroon.neon}60, 0 0 100px ${COLORS.maroon.dark}80`,
              `0 0 20px ${COLORS.maroon.neon}20`,
              `0 0 0px ${COLORS.maroon.neon}00`,
            ],
          }}
          transition={{
            duration: beatDuration,
            repeat: Infinity,
            times: [0, 0.12, 0.3, 1],
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* EKG mini çizgisi */}
          <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
            <motion.path
              d="M0 10 L8 10 L11 3 L14 17 L17 5 L20 10 L36 10"
              stroke={COLORS.maroon.neon}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              animate={{
                opacity: [0.4, 1, 0.4],
                pathLength: [0.7, 1, 0.7],
              }}
              transition={{
                duration: beatDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>

        {/* BPM göstergesi */}
        <div className="absolute bottom-5 left-6 flex items-baseline gap-2">
          <motion.span
            className="font-mono"
            style={{ fontSize: "22px", color: COLORS.maroon.neon, fontWeight: 300 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: beatDuration, repeat: Infinity }}
          >
            {bpm}
          </motion.span>
          <span className="font-mono" style={{ fontSize: "9px", color: COLORS.maroon.shirt }}>
            BPM
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// --- 02: THERMAL VİSİON — Kızılötesi Termal Kamera ---
// Hover → soluk gri elemanlar "ısınarak" kırmızı-turuncu-sarıya döner.
// Gerçek termal kamera renk haritası: mavi → yeşil → sarı → kırmızı → beyaz.
function ThermalVision() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cellSize = 16;
  const gap = 1;
  const step = cellSize + gap;
  const brightnessRef = useRef<Float32Array | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -100, y: -100, active: false });
  const rafRef = useRef<number>(0);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);
  const timeRef = useRef(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Viewport gözlemcisi — ekran dışındayken RAF çalıştırma
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { rootMargin: "100px" }
    );
    observer.observe(container);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      canvas.width = w;
      canvas.height = h;
      colsRef.current = Math.floor(w / step);
      rowsRef.current = Math.floor(h / step);
      const total = colsRef.current * rowsRef.current;
      if (!brightnessRef.current || brightnessRef.current.length !== total) {
        brightnessRef.current = new Float32Array(total);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Termal renk haritasi — daha canli, gercekci
    const heatColor = (b: number): [number, number, number] => {
      if (b < 0.15) return [17 + b * 80, 17 + b * 40, 30 + b * 80];        // Koyu mor-mavi
      if (b < 0.3)  return [20 + b * 100, 10 + b * 20, 60 + b * 140];       // Mor
      if (b < 0.5)  return [80 + b * 300, 15 + b * 10, 50 - b * 60];        // Kirmizi
      if (b < 0.7)  return [255, Math.round(50 + (b - 0.5) * 400), 10];     // Turuncu
      if (b < 0.85) return [255, Math.round(130 + (b - 0.7) * 500), 30];    // Sari-turuncu
      return [255, 255, Math.round(100 + (b - 0.85) * 1000)];               // Beyaz-sicak
    };

    const draw = () => {
      if (!ctx || !brightnessRef.current) { rafRef.current = requestAnimationFrame(draw); return; }
      if (!visibleRef.current) { rafRef.current = requestAnimationFrame(draw); return; }
      const cols = colsRef.current;
      const rows = rowsRef.current;
      const brightness = brightnessRef.current;
      const mouse = mouseRef.current;
      const radius = 6;
      timeRef.current++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const cx = col * step + cellSize / 2;
          const cy = row * step + cellSize / 2;

          let target = 0;
          if (mouse.active) {
            const dx = (mouse.x - cx) / step;
            const dy = (mouse.y - cy) / step;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radius) {
              target = Math.pow(1 - dist / radius, 1.5);
            }
          }

          // Hafif titresim — canlilik icin
          const noise = mouse.active ? (Math.sin(timeRef.current * 0.15 + idx * 0.7) * 0.03) : 0;

          const current = brightness[idx];
          const lerpSpeed = target > current ? 0.15 : 0.05;
          brightness[idx] = Math.max(0, Math.min(1, current + (target - current) * lerpSpeed + noise * target));

          const b = brightness[idx];

          if (b < 0.005) {
            ctx.fillStyle = "#0D0D11";
          } else {
            const [r, g, bl] = heatColor(b);
            ctx.fillStyle = `rgb(${Math.min(255, Math.round(r))},${Math.min(255, Math.round(g))},${Math.min(255, Math.round(bl))})`;
          }

          ctx.beginPath();
          ctx.roundRect(col * step, row * step, cellSize, cellSize, 4);
          ctx.fill();

          // Glow — sicak bolgelerde
          if (b > 0.35) {
            ctx.save();
            const glowAlpha = (b - 0.35) * 0.6;
            const [gr, gg, gb] = heatColor(Math.min(1, b + 0.1));
            ctx.shadowColor = `rgb(${Math.min(255, Math.round(gr))},${Math.min(255, Math.round(gg))},${Math.min(255, Math.round(gb))})`;
            ctx.shadowBlur = b * 16;
            ctx.fillStyle = `rgba(${Math.min(255, Math.round(gr))},${Math.min(255, Math.round(gg))},${Math.min(255, Math.round(gb))},${glowAlpha})`;
            ctx.beginPath();
            ctx.roundRect(col * step, row * step, cellSize, cellSize, 4);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { ...mouseRef.current, active: false };
  }, []);

  return (
    <motion.div {...fadeUp}>
      <div
        ref={containerRef}
        className="rounded-2xl overflow-hidden cursor-crosshair relative"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          height: "clamp(280px, 40vw, 420px)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Yazi katmani — canvas ustunde */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 1 }}
        >
          <p
            className="font-light tracking-tighter"
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              lineHeight: 1,
              color: COLORS.snow,
              opacity: 0.12,
              mixBlendMode: "overlay",
            }}
          >
            Thermal
          </p>
          <p
            className="font-mono tracking-[0.4em] uppercase mt-3"
            style={{
              fontSize: "clamp(10px, 1.2vw, 13px)",
              color: COLORS.snow,
              opacity: 0.08,
              mixBlendMode: "overlay",
            }}
          >
            Kizilotesi Goruntu
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// --- 02b: ELECTRIC SHOCK / ELEKTRIK CARPMASI ---
// Fare gectigi yerleri elektrik carpiyor. Mavi-beyaz yildirim efekti.
// Canvas ile piksel grid, fare izini takip eden elektrik arklari.
function ElectricShock() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cellSize = 16;
  const gap = 1;
  const step = cellSize + gap;
  const brightnessRef = useRef<Float32Array | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -100, y: -100, active: false });
  const rafRef = useRef<number>(0);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);
  const timeRef = useRef(0);
  const trailRef = useRef<{ col: number; row: number; life: number }[]>([]);
  const visibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { rootMargin: "100px" }
    );
    observer.observe(container);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      canvas.width = w;
      canvas.height = h;
      colsRef.current = Math.floor(w / step);
      rowsRef.current = Math.floor(h / step);
      const total = colsRef.current * rowsRef.current;
      if (!brightnessRef.current || brightnessRef.current.length !== total) {
        brightnessRef.current = new Float32Array(total);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Elektrik renk haritasi — mavi/cyan/beyaz
    const elecColor = (b: number): [number, number, number] => {
      if (b < 0.2) return [10 + b * 60, 15 + b * 100, 40 + b * 300];          // Koyu mavi
      if (b < 0.4) return [20 + b * 80, 80 + b * 250, 180 + b * 180];         // Cyan
      if (b < 0.6) return [60 + b * 200, 180 + b * 120, 255];                  // Acik mavi
      if (b < 0.8) return [150 + b * 130, 220 + b * 40, 255];                  // Beyaz-mavi
      return [220 + b * 35, 240 + b * 15, 255];                                // Neredeyse beyaz
    };

    let lastMouseCol = -1;
    let lastMouseRow = -1;

    const draw = () => {
      if (!ctx || !brightnessRef.current) { rafRef.current = requestAnimationFrame(draw); return; }
      if (!visibleRef.current) { rafRef.current = requestAnimationFrame(draw); return; }
      const cols = colsRef.current;
      const rows = rowsRef.current;
      const brightness = brightnessRef.current;
      const mouse = mouseRef.current;
      timeRef.current++;

      // Fare pozisyonundaki hucreye elektrik birak
      if (mouse.active) {
        const mCol = Math.floor(mouse.x / step);
        const mRow = Math.floor(mouse.y / step);
        if (mCol >= 0 && mCol < cols && mRow >= 0 && mRow < rows) {
          if (mCol !== lastMouseCol || mRow !== lastMouseRow) {
            lastMouseCol = mCol;
            lastMouseRow = mRow;
            // Ana carpma noktasi
            trailRef.current.push({ col: mCol, row: mRow, life: 1.0 });
            // Rastgele yildirim kollari — etraftaki hucrelere zipla
            const branches = 2 + Math.floor(Math.random() * 3);
            for (let i = 0; i < branches; i++) {
              const bCol = mCol + Math.round((Math.random() - 0.5) * 6);
              const bRow = mRow + Math.round((Math.random() - 0.5) * 6);
              if (bCol >= 0 && bCol < cols && bRow >= 0 && bRow < rows) {
                trailRef.current.push({ col: bCol, row: bRow, life: 0.5 + Math.random() * 0.5 });
              }
            }
          }
        }
      }

      // Trail yaslandirma
      trailRef.current = trailRef.current.filter((t) => {
        t.life -= 0.04;
        return t.life > 0;
      });

      // Brightness guncelle — trail'den
      // Once hepsini sogut
      for (let i = 0; i < brightness.length; i++) {
        brightness[i] *= 0.88;
      }
      // Trail'den isin
      for (const t of trailRef.current) {
        const idx = t.row * cols + t.col;
        if (idx >= 0 && idx < brightness.length) {
          brightness[idx] = Math.min(1, brightness[idx] + t.life * 0.35);
        }
        // Etraf da hafif aydinlat
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = t.row + dr;
            const nc = t.col + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
              const ni = nr * cols + nc;
              brightness[ni] = Math.min(1, brightness[ni] + t.life * 0.1);
            }
          }
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const b = brightness[idx];

          // Hafif titresim
          const flicker = b > 0.1 ? (Math.random() * 0.08 * b) : 0;
          const bFinal = Math.min(1, b + flicker);

          if (bFinal < 0.005) {
            ctx.fillStyle = "#0A0A10";
          } else {
            const [r, g, bl] = elecColor(bFinal);
            ctx.fillStyle = `rgb(${Math.min(255, Math.round(r))},${Math.min(255, Math.round(g))},${Math.min(255, Math.round(bl))})`;
          }

          ctx.beginPath();
          ctx.roundRect(col * step, row * step, cellSize, cellSize, 4);
          ctx.fill();

          // Glow — elektrik kuvvetli yerlerde
          if (bFinal > 0.3) {
            ctx.save();
            const glowAlpha = (bFinal - 0.3) * 0.7;
            const [gr, gg, gb] = elecColor(Math.min(1, bFinal + 0.15));
            ctx.shadowColor = `rgb(${Math.min(255, Math.round(gr))},${Math.min(255, Math.round(gg))},${Math.min(255, Math.round(gb))})`;
            ctx.shadowBlur = bFinal * 20;
            ctx.fillStyle = `rgba(${Math.min(255, Math.round(gr))},${Math.min(255, Math.round(gg))},${Math.min(255, Math.round(gb))},${glowAlpha})`;
            ctx.beginPath();
            ctx.roundRect(col * step, row * step, cellSize, cellSize, 4);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { ...mouseRef.current, active: false };
  }, []);

  return (
    <motion.div {...fadeUp}>
      <div
        ref={containerRef}
        className="rounded-2xl overflow-hidden cursor-crosshair relative"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          height: "clamp(280px, 40vw, 420px)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 1 }}
        >
          <p
            className="font-light tracking-tighter"
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              lineHeight: 1,
              color: COLORS.snow,
              opacity: 0.1,
              mixBlendMode: "overlay",
            }}
          >
            Electric
          </p>
          <p
            className="font-mono tracking-[0.4em] uppercase mt-3"
            style={{
              fontSize: "clamp(10px, 1.2vw, 13px)",
              color: COLORS.snow,
              opacity: 0.07,
              mixBlendMode: "overlay",
            }}
          >
            Elektrik Carpmasi
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// --- 03: WOUND HEAL / YARA İYİLEŞME ---
// Yatay "yırtık" açılır, kırmızı parlar, sonra kendi kendini onarır.
// CSS clip-path + height animasyonu ile yara fiziği.
function WoundHeal() {
  const [wounded, setWounded] = useState(false);
  const [healing, setHealing] = useState(false);

  const triggerWound = useCallback(() => {
    if (wounded || healing) return;
    setWounded(true);
    // 1.5s sonra iyileşme başlar
    setTimeout(() => {
      setHealing(true);
      setTimeout(() => {
        setWounded(false);
        setHealing(false);
      }, 1200);
    }, 1500);
  }, [wounded, healing]);

  return (
    <motion.div {...fadeUp}>
      <div
        className="rounded-2xl overflow-hidden cursor-pointer relative"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
        }}
        onClick={triggerWound}
      >
        {/* Üst yarı */}
        <motion.div
          className="text-center"
          animate={{
            y: wounded && !healing ? -6 : 0,
            clipPath: wounded && !healing
              ? "polygon(0 0, 100% 0, 100% 95%, 85% 100%, 70% 96%, 55% 100%, 40% 97%, 25% 100%, 10% 96%, 0 100%)"
              : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          transition={{ duration: healing ? 1.2 : 0.3, ease: ANIMATION.ease }}
        >
          <p
            className="font-light tracking-tighter"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 1,
              color: COLORS.snow,
            }}
          >
            KIRILMA
          </p>
        </motion.div>

        {/* Yara çizgisi — kırmızı ışık */}
        <motion.div
          className="relative overflow-hidden mx-auto"
          style={{ maxWidth: "80%" }}
          animate={{
            height: wounded && !healing ? 12 : 0,
            opacity: wounded ? 1 : 0,
          }}
          transition={{ duration: healing ? 1.0 : 0.2, ease: ANIMATION.ease }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.maroon.neon}80, ${COLORS.maroon.neon}, ${COLORS.maroon.neon}80, transparent)`,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: healing ? [1, 0.3, 0] : wounded ? [0, 1] : 0,
            }}
            transition={{ duration: healing ? 1.2 : 0.4 }}
          />
          <div
            className="absolute inset-x-0 top-1/2 h-px"
            style={{
              backgroundColor: COLORS.maroon.neon,
              boxShadow: `0 0 10px ${COLORS.maroon.neon}, 0 0 30px ${COLORS.maroon.dark}`,
            }}
          />
        </motion.div>

        {/* Alt yarı */}
        <motion.div
          className="text-center"
          animate={{
            y: wounded && !healing ? 6 : 0,
            clipPath: wounded && !healing
              ? "polygon(0 0, 10% 4%, 25% 0, 40% 3%, 55% 0, 70% 4%, 85% 0, 100% 5%, 100% 100%, 0 100%)"
              : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          transition={{ duration: healing ? 1.2 : 0.3, ease: ANIMATION.ease }}
        >
          <p
            className="font-light tracking-tighter"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 1,
              color: COLORS.snow,
              opacity: 0.4,
            }}
          >
            ONARIM
          </p>
        </motion.div>

        {/* Durum */}
        <motion.div
          className="absolute bottom-4 right-5"
          animate={{ opacity: wounded ? 1 : 0.6 }}
        >
          <span className="font-mono" style={{ fontSize: "10px", color: healing ? "#4a9" : wounded ? COLORS.maroon.neon : COLORS.ash }}>
            {healing ? "Iyilesiyor..." : wounded ? "Yara acik" : "Tikla → yirt"}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// --- 04: SUSPENSE ZOOM — Hitchcock Dolly Zoom ---
// Arka plan küçülürken ön plan büyür.
// Vertigo / dolly zoom sinematik efekti.
function SuspenseZoom() {
  const [zoomed, setZoomed] = useState(false);

  return (
    <motion.div {...fadeUp}>
      <div
        className="rounded-2xl overflow-hidden cursor-pointer relative"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
        }}
        onClick={() => setZoomed(!zoomed)}
      >
        {/* Arka plan katmanı — küçülür */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: zoomed ? 0.7 : 1,
          }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Kırmızı gradient arka plan */}
          <div
            className="w-full h-full"
            style={{
              background: `radial-gradient(ellipse at center, ${COLORS.maroon.dark} 0%, ${COLORS.void} 70%)`,
            }}
          />

          {/* Grid çizgileri — perspektif referansı */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 50}
                y1="0"
                x2={i * 50}
                y2="200"
                stroke={COLORS.maroon.warm}
                strokeWidth="0.5"
                opacity="0.2"
              />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 50}
                x2="400"
                y2={i * 50}
                stroke={COLORS.maroon.warm}
                strokeWidth="0.5"
                opacity="0.2"
              />
            ))}
          </svg>
        </motion.div>

        {/* Ön plan — büyür (ters dolly) */}
        <motion.div
          className="relative text-center"
          animate={{
            scale: zoomed ? 1.25 : 1,
          }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-light tracking-tighter"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1,
              color: COLORS.maroon.neon,
              textShadow: zoomed
                ? `0 0 40px ${COLORS.maroon.neon}80, 0 0 80px ${COLORS.maroon.dark}`
                : "none",
              transition: "text-shadow 0.5s",
            }}
          >
            VERTiGO
          </p>
          <motion.p
            className="font-mono mt-4"
            style={{ fontSize: "11px", color: COLORS.maroon.shirt }}
            animate={{ letterSpacing: zoomed ? "0.3em" : "0.05em" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Dolly Zoom
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// --- 05: EMBER TRAİL / KIVILCIM İZİ ---
// Ateş partikül sistemi. Parçacıklar yükselip söner.
// Tıkla → kıvılcım patlaması. Yerçekimi ile yavaşça düşer.
function EmberTrail() {
  const [embers, setEmbers] = useState<Array<{ id: number; x: number; delay: number; size: number }>>([]);
  const nextId = useRef(0);

  const spawnEmbers = useCallback(() => {
    const newEmbers = Array.from({ length: 16 }, () => ({
      id: nextId.current++,
      x: 35 + Math.random() * 30, // % pozisyon
      delay: Math.random() * 0.3,
      size: 2 + Math.random() * 4,
    }));
    setEmbers((prev) => [...prev, ...newEmbers]);

    // Temizle
    setTimeout(() => {
      setEmbers((prev) => prev.filter((e) => !newEmbers.find((n) => n.id === e.id)));
    }, 2500);
  }, []);

  // Otomatik ambient kıvılcımlar
  useEffect(() => {
    const interval = setInterval(() => {
      const ambient = Array.from({ length: 3 }, () => ({
        id: nextId.current++,
        x: 40 + Math.random() * 20,
        delay: Math.random() * 0.5,
        size: 1.5 + Math.random() * 2,
      }));
      setEmbers((prev) => [...prev, ...ambient]);
      setTimeout(() => {
        setEmbers((prev) => prev.filter((e) => !ambient.find((a) => a.id === e.id)));
      }, 2500);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div {...fadeUp}>
      <div
        className="rounded-2xl overflow-hidden cursor-pointer relative"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          height: "280px",
        }}
        onClick={spawnEmbers}
      >
        {/* Embers */}
        <AnimatePresence>
          {embers.map((ember) => (
            <motion.div
              key={ember.id}
              className="absolute rounded-full"
              style={{
                width: ember.size,
                height: ember.size,
                left: `${ember.x}%`,
                bottom: "15%",
                backgroundColor: COLORS.maroon.neon,
                boxShadow: `0 0 ${ember.size * 3}px ${COLORS.maroon.neon}80`,
              }}
              initial={{ opacity: 0, y: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                y: [0, -80 - Math.random() * 120, -140 - Math.random() * 60],
                x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80],
                scale: [0, 1.2, 0.3],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5 + Math.random() * 1,
                delay: ember.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </AnimatePresence>

        {/* Kor kaynak noktası */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[15%]"
          style={{ width: "60%", height: "2px" }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.maroon.neon}40, ${COLORS.maroon.warm}, ${COLORS.maroon.neon}40, transparent)`,
              boxShadow: `0 0 30px ${COLORS.maroon.neon}30, 0 0 60px ${COLORS.maroon.dark}50`,
            }}
          />
        </div>

        {/* Alt bilgi */}
        <div className="absolute bottom-4 left-6">
          <span className="font-mono" style={{ fontSize: "10px", color: COLORS.maroon.shirt }}>
            Tikla → kivilcim patlamasi
          </span>
        </div>
        <div className="absolute bottom-4 right-6">
          <span className="font-mono" style={{ fontSize: "10px", color: COLORS.ash }}>
            {embers.length} parca aktif
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// --- 06: BLOOD DRİP / DAMLA ---
// Yerçekimi + viskozite fiziği ile akan kırmızı damla.
// Yavaşça büyüyen damla → kopuş → düşüş → sıçrama.
function BloodDrip() {
  const [drips, setDrips] = useState<Array<{ id: number; x: number; phase: "growing" | "falling" | "splash" }>>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const x = 15 + Math.random() * 70;
      const id = nextId.current++;
      // Büyüme fazı
      setDrips((prev) => [...prev, { id, x, phase: "growing" }]);
      // Düşme fazı
      setTimeout(() => {
        setDrips((prev) => prev.map((d) => d.id === id ? { ...d, phase: "falling" } : d));
      }, 1200);
      // Sıçrama
      setTimeout(() => {
        setDrips((prev) => prev.map((d) => d.id === id ? { ...d, phase: "splash" } : d));
      }, 2000);
      // Temizle
      setTimeout(() => {
        setDrips((prev) => prev.filter((d) => d.id !== id));
      }, 3000);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div {...fadeUp}>
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          height: "240px",
        }}
      >
        {/* Üst kenar — damlama kaynağı */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent 10%, ${COLORS.maroon.dark} 30%, ${COLORS.maroon.warm} 50%, ${COLORS.maroon.dark} 70%, transparent 90%)`,
          }}
        />

        {drips.map((drip) => (
          <div key={drip.id}>
            {/* Damla */}
            <motion.div
              className="absolute"
              style={{
                left: `${drip.x}%`,
                top: 0,
              }}
              animate={{
                y: drip.phase === "growing" ? [0, 8] :
                   drip.phase === "falling" ? [8, 200] : 200,
                scaleY: drip.phase === "growing" ? [0.5, 1.8] :
                        drip.phase === "falling" ? [2, 0.8] : 0,
                scaleX: drip.phase === "growing" ? [1, 0.7] : 1,
                opacity: drip.phase === "splash" ? 0 : 1,
              }}
              transition={{
                duration: drip.phase === "growing" ? 1.2 :
                          drip.phase === "falling" ? 0.8 : 0.3,
                ease: drip.phase === "falling" ? [0.55, 0.06, 0.68, 0.19] : ANIMATION.ease,
              }}
            >
              <div
                className="w-2.5 h-4 rounded-b-full"
                style={{
                  background: `linear-gradient(180deg, ${COLORS.maroon.dark}, ${COLORS.maroon.neon})`,
                  boxShadow: `0 4px 12px ${COLORS.maroon.neon}40`,
                }}
              />
            </motion.div>

            {/* Sıçrama efekti */}
            {drip.phase === "splash" && (
              <motion.div
                className="absolute"
                style={{
                  left: `${drip.x}%`,
                  bottom: "16%",
                  transform: "translateX(-50%)",
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 1.5], opacity: [0.8, 0] }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div
                  className="w-8 h-1 rounded-full"
                  style={{
                    background: `radial-gradient(ellipse, ${COLORS.maroon.neon}60, transparent)`,
                  }}
                />
              </motion.div>
            )}
          </div>
        ))}

        {/* Alt birikinti */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10"
          style={{
            background: `linear-gradient(0deg, ${COLORS.maroon.dark}60, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

// --- 07: VEİN NETWORK / DAMAR AGI ---
// SVG path'ler organik dallanma ile yayılır.
// Scroll ile tetiklenir, nabız ile titrer.
function VeinNetwork() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isInView) setKey((k) => k + 1);
  }, [isInView]);

  // Damar yolları — organik, dallanmalı
  const veins = useMemo(() => [
    { d: "M 10 100 Q 60 80, 120 90 T 240 70 Q 300 60, 380 80", width: 3, delay: 0 },
    { d: "M 120 90 Q 150 50, 200 40 T 320 30", width: 1.5, delay: 0.4 },
    { d: "M 240 70 Q 260 100, 300 120 T 400 100", width: 1.5, delay: 0.6 },
    { d: "M 200 40 Q 230 20, 280 25 T 360 15", width: 1, delay: 0.8 },
    { d: "M 300 120 Q 340 140, 380 130", width: 1, delay: 1.0 },
    { d: "M 60 80 Q 40 50, 80 30 T 160 20", width: 1, delay: 0.5 },
  ], []);

  return (
    <div ref={ref}>
      <motion.div {...fadeUp}>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: COLORS.void,
            border: `1px solid ${COLORS.glassBorder}`,
            padding: "clamp(24px, 4vw, 40px) clamp(16px, 3vw, 32px)",
          }}
        >
          <svg viewBox="0 0 400 150" className="w-full" style={{ overflow: "visible" }}>
            {veins.map((vein, i) => (
              <g key={i}>
                {/* Glow katmanı */}
                <motion.path
                  key={`g-${key}-${i}`}
                  d={vein.d}
                  fill="none"
                  stroke={COLORS.maroon.neon}
                  strokeWidth={vein.width * 4}
                  strokeLinecap="round"
                  strokeDasharray="600"
                  initial={{ strokeDashoffset: 600, opacity: 0 }}
                  animate={isInView
                    ? { strokeDashoffset: 0, opacity: 0.15 }
                    : { strokeDashoffset: 600, opacity: 0 }
                  }
                  transition={{
                    duration: 2,
                    delay: vein.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ filter: "blur(4px)" }}
                />

                {/* Ana damar */}
                <motion.path
                  key={`m-${key}-${i}`}
                  d={vein.d}
                  fill="none"
                  stroke={i === 0 ? COLORS.maroon.neon : COLORS.maroon.shirt}
                  strokeWidth={vein.width}
                  strokeLinecap="round"
                  strokeDasharray="600"
                  initial={{ strokeDashoffset: 600 }}
                  animate={isInView
                    ? { strokeDashoffset: 0 }
                    : { strokeDashoffset: 600 }
                  }
                  transition={{
                    duration: 1.8,
                    delay: vein.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </g>
            ))}

            {/* Nabız dalgası — ana damar üzerinde akan vurgu */}
            {isInView && (
              <motion.circle
                r="5"
                fill={COLORS.maroon.neon}
                opacity="0.6"
                style={{ filter: `blur(2px)` }}
                animate={{
                  cx: [10, 120, 240, 380],
                  cy: [100, 90, 70, 80],
                  opacity: [0, 0.6, 0.6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeInOut",
                }}
              />
            )}
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

// --- 08: CRİMSON FOG / KIZIL SİS ---
// Çok katmanlı kırmızı sis. Paralaks ile hareket.
// Mouse hareketi ile sis katmanlarının hızı değişir.
function CrimsonFog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0.5);
  const smoothX = useSpring(0.5, { stiffness: 40, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    setMouseX(x);
    smoothX.set(x);
  }, [smoothX]);

  const layers = useMemo(() => [
    { opacity: 0.08, blur: 60, speed: 0.3, color: COLORS.maroon.dark, y: "60%" },
    { opacity: 0.12, blur: 40, speed: 0.5, color: COLORS.maroon.warm, y: "45%" },
    { opacity: 0.06, blur: 80, speed: 0.2, color: COLORS.maroon.neon, y: "70%" },
  ], []);

  return (
    <motion.div {...fadeUp}>
      <div
        ref={containerRef}
        className="rounded-2xl overflow-hidden relative cursor-crosshair"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          height: "260px",
        }}
        onMouseMove={handleMouse}
      >
        {/* Sis katmanları */}
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 pointer-events-none"
            animate={{
              x: `${(mouseX - 0.5) * layer.speed * 60}px`,
            }}
            transition={{ type: "spring", stiffness: 30, damping: 15 }}
            style={{
              background: `radial-gradient(ellipse 120% 80% at ${50 + (mouseX - 0.5) * 20}% ${layer.y}, ${layer.color}${Math.round(layer.opacity * 255).toString(16).padStart(2, "0")}, transparent 70%)`,
              filter: `blur(${layer.blur}px)`,
            }}
          />
        ))}

        {/* Merkez metin — sisin arkasından */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p
            className="font-light tracking-tighter"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1,
              color: COLORS.maroon.neon,
              opacity: 0.7,
              textShadow: `0 0 60px ${COLORS.maroon.neon}40`,
            }}
          >
            SIS
          </p>
          <p className="font-mono mt-3" style={{ fontSize: "10px", color: COLORS.maroon.shirt }}>
            Mouse ile sisi hareket ettir
          </p>
        </div>

        {/* Kenar vinyetleme */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 80px ${COLORS.void}, inset 0 0 160px ${COLORS.void}80`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN BLOOD PHYSICS COMPONENT
// ============================================
export default function BloodPhysics() {
  return (
    <div>
      <SectionHeader
        number="07"
        title="Kan Fizigi"
        description="Ikincil accent — kizilin fiziksel fenomenleri. Nabiz, isi, yara, vertigo, kivilcim, damla, damar ve sis."
      />

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.maroon.shirt, marginBottom: SPACING.heading }}
        >
          01 — Pulse / Nabiz
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Kalp atisi ritmine senkron genisleme/daralma. EKG cizgisi ile birlikte. Sistol-diastol asimetrik pattern — gercek kardiyak ritim.
        </p>
        <Pulse />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.maroon.shirt, marginBottom: SPACING.heading }}
        >
          02 — Thermal Vision
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Kizilotesi termal kamera simulasyonu. Hover → soguk grid isinarak kirmizi haritaya donusur. Merkez en sicak.
        </p>
        <ThermalVision />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: "#4488FF", marginBottom: SPACING.heading }}
        >
          02b — Electric Shock
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Elektrik carpmasi. Fare gectigi yerleri yildirim carpiyor, etraftaki hucrelere zipliyor. Mavi-beyaz ark efekti.
        </p>
        <ElectricShock />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.maroon.shirt, marginBottom: SPACING.heading }}
        >
          03 — Wound Heal
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Yara fizigi. Tikla → yuzey yirtilir, kirmizi isik parlar. 1.5 saniye sonra kendini onarir. clip-path ile organik kirilma.
        </p>
        <WoundHeal />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.maroon.shirt, marginBottom: SPACING.heading }}
        >
          04 — Suspense Zoom
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Hitchcock dolly zoom. Tikla → arka plan kuculurken on plan buyur. Vertigo hissiyati, sinematik gerilim.
        </p>
        <SuspenseZoom />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.maroon.shirt, marginBottom: SPACING.heading }}
        >
          05 — Ember Trail
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Ates kivilcim sistemi. Parcaciklar yukselip soner — yercekimi + rastgele ruzgar. Tikla → patlama, yoksa ambient koru bekle.
        </p>
        <EmberTrail />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.maroon.shirt, marginBottom: SPACING.heading }}
        >
          06 — Blood Drip
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Yercekimi + viskozite fizigi. Damla yavasta buyur, kopar, hizlanarak duser, sicrar. Otomatik dongude calisir.
        </p>
        <BloodDrip />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.maroon.shirt, marginBottom: SPACING.heading }}
        >
          07 — Vein Network
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Organik damar agi. SVG path'ler dallanarak yayilir, nabiz dalgasi ana damar uzerinde akar. Scroll ile tetiklenir.
        </p>
        <VeinNetwork />
      </div>

      <div style={{ marginBottom: SPACING.element }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.maroon.shirt, marginBottom: SPACING.heading }}
        >
          08 — Crimson Fog
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Kizil sis. Cok katmanli paralaks gradient, mouse hareketi ile sis yonlenir.
          Vinyetleme ile derinlik, sinematik atmosfer.
        </p>
        <CrimsonFog />
      </div>
    </div>
  );
}