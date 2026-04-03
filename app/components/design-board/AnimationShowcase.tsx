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
// SOKAK F─░Z─░─Ş─░ ÔÇö Animasyon Vitrini
// Gece sokak foto─şraf├ğ─▒l─▒─ş─▒n─▒n fiziksel fenomenlerini
// dijital ortama ta┼ş─▒yan ├Âzel animasyonlar.
// ============================================

// --- 01: NEON FL─░CKER ÔÇö Bozuk Neon Tabela ---
function NeonFlicker() {
  const text = "SOKAK";
  const [flickers, setFlickers] = useState<number[]>(Array(text.length).fill(1));
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const intervals = text.split("").map((_, i) => {
      const baseDelay = 80 + Math.random() * 200;
      return setInterval(() => {
        setFlickers((prev) => {
          const next = [...prev];
          if (Math.random() < 0.3) {
            next[i] = Math.random() < 0.5 ? 0.1 : 0.4;
            setTimeout(() => {
              setFlickers((p) => {
                const n = [...p];
                n[i] = 1;
                return n;
              });
            }, 50 + Math.random() * 80);
          }
          return next;
        });
      }, baseDelay + i * 120);
    });

    return () => intervals.forEach(clearInterval);
  }, [text, isInView]);

  return (
    <motion.div {...fadeUp}>
      <div
        ref={containerRef}
        className="rounded-2xl overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          padding: "clamp(48px, 8vw, 96px) clamp(24px, 4vw, 48px)",
        }}
      >
        <div className="flex gap-[0.05em]">
          {text.split("").map((char, i) => (
            <span
              key={i}
              className="font-light tracking-tighter inline-block"
              style={{
                fontSize: "clamp(4rem, 10vw, 8rem)",
                lineHeight: 1,
                color: COLORS.lamp.bright,
                opacity: flickers[i],
                textShadow: flickers[i] > 0.5
                  ? `0 0 20px ${COLORS.lamp.glow}, 0 0 60px ${COLORS.lamp.warm}80, 0 0 120px ${COLORS.lamp.bright}40`
                  : "none",
                transition: "opacity 0.05s, text-shadow 0.05s",
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-mono" style={{ fontSize: "10px", color: COLORS.ash }}>
          Rastgele flicker pattern
        </span>
        <span style={{ fontSize: "10px", color: COLORS.concrete }}>┬À</span>
        <span className="font-mono" style={{ fontSize: "10px", color: COLORS.ash }}>
          Her harf bagimsiz titresim dongusunde
        </span>
      </div>
    </motion.div>
  );
}

// --- 02: PUDDLE R─░PPLE ÔÇö Yagmur Damlasi Su Birikintisi ---
function PuddleRipple() {
  const [turbulence, setTurbulence] = useState(0.000);
  const [isRippling, setIsRippling] = useState(false);
  const filterId = "puddle-ripple-filter";

  const triggerRipple = useCallback(() => {
    if (isRippling) return;
    setIsRippling(true);

    let frame = 0;
    const rise = setInterval(() => {
      frame++;
      setTurbulence(Math.sin(frame * 0.3) * 0.04 + 0.02);
      if (frame > 20) {
        clearInterval(rise);
        let decay = 20;
        const fall = setInterval(() => {
          decay--;
          setTurbulence(Math.sin(decay * 0.3) * 0.02 * (decay / 20));
          if (decay <= 0) {
            clearInterval(fall);
            setTurbulence(0);
            setIsRippling(false);
          }
        }, 50);
      }
    }, 40);
  }, [isRippling]);

  return (
    <motion.div {...fadeUp}>
      <div
        className="rounded-2xl overflow-hidden cursor-pointer relative"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
        }}
        onClick={triggerRipple}
      >
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id={filterId}>
              <feTurbulence
                type="turbulence"
                baseFrequency={`${turbulence} ${turbulence * 1.5}`}
                numOctaves={3}
                result="turbulence"
                seed={2}
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="turbulence"
                scale={turbulence > 0 ? 30 : 0}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        <div
          className="flex items-center justify-center"
          style={{
            padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
            filter: turbulence > 0 ? `url(#${filterId})` : "none",
            transition: "filter 0.1s",
          }}
        >
          <div className="text-center">
            <p
              className="font-light tracking-tighter"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                lineHeight: 1,
                color: COLORS.lamp.bright,
                textShadow: `0 0 40px ${COLORS.lamp.glow}60`,
              }}
            >
              Yansima
            </p>
            <p
              className="font-light tracking-tighter"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                lineHeight: 1,
                color: COLORS.lamp.dim,
                opacity: 0.3,
                transform: "scaleY(-1)",
                maskImage: "linear-gradient(to bottom, black 20%, transparent 80%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 80%)",
              }}
            >
              Yansima
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-4 right-5"
          style={{ fontSize: "10px", color: COLORS.ash }}
        >
          {isRippling ? "Dalga yayiliyor..." : "Tikla ÔåÆ dalga at"}
        </div>
      </div>
    </motion.div>
  );
}

// --- 03: DEPTH OF FIELD ÔÇö Lens Fokus Efekti ---
function DepthOfField() {
  const [focusIndex, setFocusIndex] = useState(2);
  const layers = [
    { label: "Arka Plan", z: 0 },
    { label: "Orta Zemin", z: 1 },
    { label: "Odak Noktasi", z: 2 },
    { label: "On Plan", z: 3 },
    { label: "Subjektif", z: 4 },
  ];

  return (
    <motion.div {...fadeUp}>
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          padding: "clamp(40px, 6vw, 64px) clamp(24px, 4vw, 48px)",
        }}
      >
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {layers.map((layer, i) => {
            const distance = Math.abs(i - focusIndex);
            const blur = distance * 3;
            const opacity = 1 - distance * 0.2;
            const scale = 1 - distance * 0.05;

            return (
              <motion.div
                key={layer.label}
                onClick={() => setFocusIndex(i)}
                className="cursor-pointer flex flex-col items-center gap-3"
                animate={{
                  filter: `blur(${blur}px)`,
                  opacity: Math.max(0.25, opacity),
                  scale,
                }}
                transition={{ duration: 0.8, ease: ANIMATION.ease }}
              >
                <div
                  className="w-14 h-20 rounded-lg"
                  style={{
                    backgroundColor: i === focusIndex ? COLORS.lamp.bright : COLORS.carbon,
                    border: `1px solid ${i === focusIndex ? COLORS.lamp.warm : COLORS.glassBorder}`,
                    boxShadow: i === focusIndex
                      ? `0 0 40px ${COLORS.lamp.glow}50`
                      : "none",
                  }}
                />
                <span
                  className="font-mono whitespace-nowrap"
                  style={{ fontSize: "9px", color: COLORS.ash }}
                >
                  {layer.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 relative">
          <div className="h-px w-full" style={{ backgroundColor: COLORS.glassBorder }} />
          <motion.div
            className="absolute top-0 h-px"
            style={{ backgroundColor: COLORS.lamp.dim }}
            initial={false}
            animate={{
              left: `${(focusIndex / (layers.length - 1)) * 100}%`,
              width: "20%",
              x: "-50%",
            }}
            transition={{ duration: 0.6, ease: ANIMATION.ease }}
          />
          <div className="flex justify-between mt-2">
            <span className="font-mono" style={{ fontSize: "9px", color: COLORS.ash }}>f/1.4 ÔÇö Sig</span>
            <span className="font-mono" style={{ fontSize: "9px", color: COLORS.ash }}>f/16 ÔÇö Derin</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- 04: LIGHT PA─░NT─░NG ÔÇö Uzun Pozlama Cizgi Cizimi ---
function LightPainting() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isInView) setKey((k) => k + 1);
  }, [isInView]);

  const pathD = "M 20 80 Q 60 10, 120 50 T 220 30 Q 280 80, 340 40 T 460 60 Q 500 20, 540 50";

  return (
    <div ref={ref}>
      <motion.div {...fadeUp}>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: COLORS.void,
            border: `1px solid ${COLORS.glassBorder}`,
            padding: "clamp(32px, 5vw, 56px) clamp(16px, 3vw, 32px)",
          }}
        >
          <svg
            viewBox="0 0 560 100"
            className="w-full"
            style={{ overflow: "visible" }}
          >
            <path
              d={pathD}
              fill="none"
              stroke={COLORS.glassBorder}
              strokeWidth="1"
              strokeDasharray="4 8"
            />

            <motion.path
              key={`glow-${key}`}
              d={pathD}
              fill="none"
              stroke={COLORS.lamp.glow}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="800"
              initial={{ strokeDashoffset: 800, opacity: 0 }}
              animate={isInView ? { strokeDashoffset: 0, opacity: 0.3 } : { strokeDashoffset: 800, opacity: 0 }}
              transition={{ duration: 3, ease: "easeOut" }}
              style={{ filter: "blur(6px)" }}
            />

            <motion.path
              key={`main-${key}`}
              d={pathD}
              fill="none"
              stroke={COLORS.lamp.bright}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="800"
              initial={{ strokeDashoffset: 800 }}
              animate={isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: 800 }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          <div className="flex items-center gap-6 mt-6">
            {["f/2.8", "30s", "ISO 100", "Tripod"].map((info) => (
              <span key={info} className="font-mono" style={{ fontSize: "10px", color: COLORS.ash }}>
                {info}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- 05: CHROMAT─░C ABERRAT─░ON ÔÇö Lens Kromatik Sapmasi ---
function ChromaticAberration() {
  const [split, setSplit] = useState(0);

  return (
    <motion.div {...fadeUp}>
      <div
        className="rounded-2xl overflow-hidden cursor-crosshair relative"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
        }}
        onMouseEnter={() => setSplit(1)}
        onMouseLeave={() => setSplit(0)}
      >
        <div className="relative flex items-center justify-center" style={{ minHeight: "clamp(4rem, 10vw, 7rem)" }}>
          <motion.p
            className="absolute font-light tracking-tighter"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 45, 45, 0.7)",
              mixBlendMode: "screen",
            }}
            animate={{ x: split * -6, y: split * -2 }}
            transition={{ duration: 0.4, ease: ANIMATION.ease }}
          >
            LENS
          </motion.p>

          <motion.p
            className="absolute font-light tracking-tighter"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1px rgba(45, 255, 100, 0.7)",
              mixBlendMode: "screen",
            }}
          >
            LENS
          </motion.p>

          <motion.p
            className="absolute font-light tracking-tighter"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1px rgba(91, 143, 168, 0.8)",
              mixBlendMode: "screen",
            }}
            animate={{ x: split * 6, y: split * 2 }}
            transition={{ duration: 0.4, ease: ANIMATION.ease }}
          >
            LENS
          </motion.p>

          <p
            className="font-light tracking-tighter relative"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 1,
              color: COLORS.snow,
              opacity: split > 0 ? 0 : 1,
              transition: "opacity 0.3s",
            }}
          >
            LENS
          </p>
        </div>

        <motion.div
          className="text-center mt-6"
          animate={{ opacity: split > 0 ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-mono" style={{ fontSize: "10px", color: COLORS.ash }}>
            {split > 0 ? "RGB fringing ÔÇö kanallar ayrist─▒" : "Hover ÔåÆ sapma tetikle"}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// --- 06: GL─░TCH REVEAL ÔÇö Kirik LED Tabela ---
function GlitchReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [glitching, setGlitching] = useState(false);
  const sliceCount = 8;

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200 + Math.random() * 150);
    }, 2500 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [isInView]);

  const slices = useMemo(() =>
    Array.from({ length: sliceCount }, (_, i) => ({
      top: `${(i / sliceCount) * 100}%`,
      height: `${100 / sliceCount}%`,
    })),
    [sliceCount]
  );

  return (
    <div ref={ref}>
      <motion.div {...fadeUp}>
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{
            backgroundColor: COLORS.void,
            border: `1px solid ${COLORS.glassBorder}`,
            padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
          }}
        >
          <div className="relative">
            {slices.map((slice, i) => (
              <motion.div
                key={i}
                className="absolute inset-x-0 overflow-hidden"
                style={{
                  top: slice.top,
                  height: slice.height,
                }}
                animate={glitching ? {
                  x: [0, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 15, 0],
                  skewX: [0, Math.random() * 3, 0],
                } : { x: 0, skewX: 0 }}
                transition={{ duration: 0.15, ease: "linear" }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: `${sliceCount * 100}%`,
                    marginTop: `-${i * 100}%`,
                  }}
                >
                  <p
                    className="font-light tracking-tighter whitespace-nowrap"
                    style={{
                      fontSize: "clamp(3rem, 8vw, 6rem)",
                      lineHeight: 1,
                      color: COLORS.snow,
                    }}
                  >
                    BOZULMA
                  </p>
                </div>
              </motion.div>
            ))}

            <AnimatePresence>
              {glitching && (
                <>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ x: -8, opacity: 0 }}
                    animate={{ x: -4, opacity: 0.6 }}
                    exit={{ x: 0, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <p
                      className="font-light tracking-tighter"
                      style={{
                        fontSize: "clamp(3rem, 8vw, 6rem)",
                        lineHeight: 1,
                        color: "rgba(255, 45, 45, 0.4)",
                      }}
                    >
                      BOZULMA
                    </p>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ x: 8, opacity: 0 }}
                    animate={{ x: 4, opacity: 0.6 }}
                    exit={{ x: 0, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <p
                      className="font-light tracking-tighter"
                      style={{
                        fontSize: "clamp(3rem, 8vw, 6rem)",
                        lineHeight: 1,
                        color: "rgba(91, 143, 168, 0.4)",
                      }}
                    >
                      BOZULMA
                    </p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <div className="invisible">
              <p
                className="font-light tracking-tighter text-center"
                style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1 }}
              >
                BOZULMA
              </p>
            </div>
          </div>

          {glitching && (
            <motion.div
              className="absolute left-0 right-0 h-px pointer-events-none"
              style={{ backgroundColor: COLORS.lamp.bright, opacity: 0.6 }}
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 0.15, ease: "linear" }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

// --- 07: C─░NEMAT─░C SHUTTER ÔÇö Panjur Acilisi ---
function CinematicShutter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const bladeCount = 6;

  return (
    <div ref={ref}>
      <motion.div {...fadeUp}>
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{
            backgroundColor: COLORS.void,
            border: `1px solid ${COLORS.glassBorder}`,
            minHeight: "200px",
          }}
        >
          <div
            className="flex flex-col items-center justify-center"
            style={{ padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)" }}
          >
            <p
              className="font-light tracking-tighter"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1,
                color: COLORS.lamp.bright,
                textShadow: `0 0 60px ${COLORS.lamp.glow}40`,
              }}
            >
              Perdede ne var?
            </p>
            <p className="font-mono mt-4" style={{ fontSize: "10px", color: COLORS.concrete }}>
              Panjur acildi ÔÇö sahne senindir
            </p>
          </div>

          {Array.from({ length: bladeCount }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 bottom-0"
              style={{
                left: `${(i / bladeCount) * 100}%`,
                width: `${100 / bladeCount + 0.5}%`,
                backgroundColor: COLORS.carbon,
                transformOrigin: i % 2 === 0 ? "left" : "right",
              }}
              initial={{ scaleX: 1 }}
              animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: ANIMATION.ease,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// --- 08: MAGNET─░C REPULS─░ON ÔÇö Elemanlar Mouse'tan Kacar ---
function MagneticRepulsion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const items = useMemo(() => [
    "Next.js", "React", "Motion", "CSS", "SVG",
    "Canvas", "TypeScript", "Grid", "Flex",
    "Clamp", "Blur", "Glow", "Spring", "Decay",
  ], []);

  return (
    <motion.div {...fadeUp}>
      <div
        ref={containerRef}
        className="rounded-2xl overflow-hidden relative cursor-none"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          padding: "clamp(40px, 6vw, 72px) clamp(24px, 4vw, 48px)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos(null)}
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {items.map((item) => (
            <RepulsionItem
              key={item}
              label={item}
              mousePos={mousePos}
              containerRef={containerRef}
            />
          ))}
        </div>

        {mousePos && (
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 80,
              height: 80,
              border: `1px solid ${COLORS.lamp.bright}20`,
              background: `radial-gradient(circle, ${COLORS.lamp.reflection} 0%, transparent 70%)`,
            }}
            animate={{
              left: mousePos.x - 40,
              top: mousePos.y - 40,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}
      </div>
    </motion.div>
  );
}

function RepulsionItem({
  label,
  mousePos,
  containerRef,
}: {
  label: string;
  mousePos: { x: number; y: number } | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    if (!mousePos || !itemRef.current || !containerRef.current) {
      x.set(0);
      y.set(0);
      return;
    }

    const rect = itemRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const itemCenterX = rect.left - containerRect.left + rect.width / 2;
    const itemCenterY = rect.top - containerRect.top + rect.height / 2;

    const dx = itemCenterX - mousePos.x;
    const dy = itemCenterY - mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = 120;

    if (distance < radius) {
      const force = (1 - distance / radius) * 25;
      const angle = Math.atan2(dy, dx);
      x.set(Math.cos(angle) * force);
      y.set(Math.sin(angle) * force);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [mousePos, x, y, containerRef]);

  return (
    <motion.div
      ref={itemRef}
      className="rounded-lg px-4 py-2"
      style={{
        x,
        y,
        backgroundColor: COLORS.carbon,
        border: `1px solid ${COLORS.glassBorder}`,
        fontSize: "12px",
        color: COLORS.concrete,
      }}
    >
      {label}
    </motion.div>
  );
}

// --- 09: ELAST─░C MORPH ÔÇö Organik Blob Deformasyon ---
function ElasticMorph() {
  const shapes = useMemo(() => [
    "30% 70% 70% 30% / 30% 30% 70% 70%",
    "60% 40% 30% 70% / 60% 30% 70% 40%",
    "40% 60% 70% 30% / 50% 60% 40% 50%",
    "70% 30% 50% 50% / 40% 70% 30% 60%",
  ], []);
  const [shapeIndex, setShapeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShapeIndex((prev) => (prev + 1) % shapes.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [shapes.length]);

  return (
    <motion.div {...fadeUp}>
      <div
        className="rounded-2xl overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0"
            animate={{
              borderRadius: shapes[shapeIndex],
              scale: 1.3,
            }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: `radial-gradient(circle, ${COLORS.lamp.glow}30, transparent 70%)`,
              filter: "blur(20px)",
            }}
          />

          <motion.div
            className="relative w-40 h-40 flex items-center justify-center cursor-pointer"
            animate={{ borderRadius: shapes[shapeIndex] }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: `linear-gradient(135deg, ${COLORS.lamp.bright}, ${COLORS.lamp.warm})`,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShapeIndex((prev) => (prev + 1) % shapes.length)}
          >
            <span
              className="font-mono"
              style={{ fontSize: "11px", color: COLORS.void, fontWeight: 500 }}
            >
              morph
            </span>
          </motion.div>
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-mono" style={{ fontSize: "10px", color: COLORS.ash }}>
          border-radius morphing
        </span>
        <span style={{ fontSize: "10px", color: COLORS.concrete }}>┬À</span>
        <span className="font-mono" style={{ fontSize: "10px", color: COLORS.ash }}>
          tikla veya bekle
        </span>
      </div>
    </motion.div>
  );
}

// --- 10: NO─░SE GRA─░N ÔÇö Film Grain Canvas Overlay ---
function NoiseGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [grainActive, setGrainActive] = useState(true);
  const visibleRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { rootMargin: "100px" }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const w = 200;
    const h = 120;
    canvas.width = w;
    canvas.height = h;

    function drawNoise() {
      if (!ctx || !grainActive || !visibleRef.current) {
        animId = requestAnimationFrame(drawNoise);
        return;
      }
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 35;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 40;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(drawNoise);
    }

    drawNoise();
    return () => cancelAnimationFrame(animId);
  }, [grainActive]);

  return (
    <motion.div {...fadeUp}>
      <div
        ref={containerRef}
        className="rounded-2xl overflow-hidden relative cursor-pointer"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
        }}
        onClick={() => setGrainActive((prev) => !prev)}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            mixBlendMode: "screen",
            opacity: grainActive ? 1 : 0,
            transition: "opacity 0.5s",
          }}
        />

        <div className="relative text-center">
          <p
            className="font-light tracking-tighter"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 1,
              color: COLORS.snow,
            }}
          >
            Film Grain
          </p>
          <p className="font-mono mt-4" style={{ fontSize: "11px", color: COLORS.concrete }}>
            Kodak Tri-X 400 ┬À Pushed +2
          </p>
          <p className="font-mono mt-2" style={{ fontSize: "10px", color: COLORS.ash }}>
            {grainActive ? "Grain aktif ÔÇö tikla ÔåÆ temiz" : "Temiz ÔÇö tikla ÔåÆ grain ekle"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN SHOWCASE COMPONENT
// ============================================
export default function AnimationShowcase() {
  return (
    <div>
      <SectionHeader
        number="06"
        title="Sokak Fizigi"
        description="Gece sokak fotografciliginin fiziksel fenomenlerini dijital ortama tasiyan ozel animasyonlar. Her biri tiklanabilir, her biri etkilesimli."
      />

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.lamp.dim, marginBottom: SPACING.heading }}
        >
          01 ÔÇö Neon Flicker
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Yari bozuk neon tabela simulasyonu. Her harf bagimsiz bir zamanlayicida titrer ÔÇö rastgele sonme ve ani yanma.
        </p>
        <NeonFlicker />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.lamp.dim, marginBottom: SPACING.heading }}
        >
          02 ÔÇö Puddle Ripple
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Islak asfalta dusen yagmur damlasi. SVG feTurbulence ile sivi yuzey bozulmasi.
          Tikla ÔÇö dalga yayilsin, sonra kendili─şinden sakinle┼şsin.
        </p>
        <PuddleRipple />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.lamp.dim, marginBottom: SPACING.heading }}
        >
          03 ÔÇö Depth of Field
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Fotograf makinesi derinlik alani. Secili element net, digerleri mesafeye gore bulanik.
          Herhangi birine tikla ÔåÆ fokus oraya kayar. f/1.4 sig derinlik simulasyonu.
        </p>
        <DepthOfField />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.lamp.dim, marginBottom: SPACING.heading }}
        >
          04 ÔÇö Light Painting
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Uzun pozlama isik boyama. SVG stroke-dashoffset animasyonu ile karanlikta cizilen isik izi.
          Scroll ile tetiklenir, her seferinde bastan cizer.
        </p>
        <LightPainting />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.lamp.dim, marginBottom: SPACING.heading }}
        >
          05 ÔÇö Chromatic Aberration
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Ucuz lenslerde gorulen kromatik sapma. RGB kanallari birbirinden kayar.
          Hover yap ÔÇö kanallar ayrissin. Birak ÔÇö tekrar toplanir.
        </p>
        <ChromaticAberration />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.lamp.dim, marginBottom: SPACING.heading }}
        >
          06 ÔÇö Glitch Reveal
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Kirik LED tabela efekti. Horizontal slice kayma + kirmizi/mavi kanal bozulmasi.
          Periyodik glitch patlamalari ÔÇö kontrol edemezsin, o gelir.
        </p>
        <GlitchReveal />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.lamp.dim, marginBottom: SPACING.heading }}
        >
          07 ÔÇö Cinematic Shutter
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Fotograf makinesi panjuru. Dikey seritler alternatif yonlerden acilarak arkasindaki sahneyi gosterir.
          Scroll ile tetiklenir.
        </p>
        <CinematicShutter />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.lamp.dim, marginBottom: SPACING.heading }}
        >
          08 ÔÇö Magnetic Repulsion
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Manyetik itme alani. Mouse yaklastiginda elemanlar kacisir ÔÇö spring fizigi ile.
          Cursor kaldirinca herkes yerine doner. Mesafe ters orantili kuvvet.
        </p>
        <MagneticRepulsion />
      </div>

      <div style={{ marginBottom: SPACING.block }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.lamp.dim, marginBottom: SPACING.heading }}
        >
          09 ÔÇö Elastic Morph
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Organik blob deformasyon. border-radius morphing ile surekli sekil degistiren canli bir nesne.
          Tikla ÔåÆ zorla donustur. Ya da bekle ÔÇö kendi dongusunde yuzer.
        </p>
        <ElasticMorph />
      </div>

      <div style={{ marginBottom: SPACING.element }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ fontSize: TYPOGRAPHY.overline.size, color: COLORS.lamp.dim, marginBottom: SPACING.heading }}
        >
          10 ÔÇö Film Grain
        </motion.p>
        <p style={{ fontSize: "12px", color: COLORS.concrete, marginBottom: SPACING.element, maxWidth: "520px" }}>
          Sinematik film grain. Canvas 2D uzerinde her karede yenilenen noise pattern.
          Kodak Tri-X 400 pushed +2 estetigi. Tikla ÔåÆ ac/kapat.
        </p>
        <NoiseGrain />
      </div>
    </div>
  );
}