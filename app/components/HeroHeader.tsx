"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ANIMATION, TYPOGRAPHY, COLORS } from "@/app/lib/design-tokens";

/* ═══════════════════════════════════════════════════════════════
   HERO — Golden Ratio Architecture
   
   Rule of Thirds: Ana metin viewport %33'te
   Başlık/alt yazı: φ³ ≈ 4.24:1 oranı
   Boşluk: %65 boş, %35 içerik
   Tipografi: 2 weight only (300 + 400)
   Renk: 2 only (chalk + concrete)
   ═══════════════════════════════════════════════════════════════ */

const BRAND = "candemir.co";
const PROCESS_WORDS = [
  "discover", "observe", "focus", "think", "frame",
  "design", "code", "launch", "grow",
];
const GLITCH_CHARS = "!@#$%^&*<>{}[]|/\\~";

function GlitchBrand() {
  const [text, setText] = useState(BRAND);
  const [isHovered, setIsHovered] = useState(false);
  const [chaosLevel, setChaosLevel] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const corrupt = useCallback((source: string, intensity: number) => {
    return source
      .split("")
      .map((ch) =>
        Math.random() < intensity * 0.4
          ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          : ch
      )
      .join("");
  }, []);

  useEffect(() => {
    if (!isHovered) return;

    let tick = 0;
    let wordIdx = 0;
    let phase: "escalate" | "cycle" | "recover" | "twitch" = "escalate";
    let cancelled = false;

    const schedule = (fn: () => void, ms: number) => {
      if (cancelled) return;
      timeoutRef.current = setTimeout(fn, ms);
    };

    // ── Phase 1: Escalate (corrupt brand name) ──
    const escalate = () => {
      if (cancelled) return;
      tick++;
      const chaos = Math.min(tick / 6, 1);
      setChaosLevel(chaos);
      setText(corrupt(BRAND, chaos));

      if (tick < 6) {
        schedule(escalate, 60);
      } else {
        phase = "cycle";
        tick = 0;
        schedule(cycle, 40);
      }
    };

    // ── Phase 2: Cycle through process words (fast) ──
    const cycle = () => {
      if (cancelled) return;
      const word = PROCESS_WORDS[wordIdx];
      setChaosLevel(0.6 + Math.random() * 0.3);

      if (Math.random() < 0.3) {
        setText(corrupt(word, 0.25));
      } else {
        setText(word);
      }

      wordIdx++;
      if (wordIdx < PROCESS_WORDS.length) {
        // Accelerating then decelerating
        const mid = PROCESS_WORDS.length / 2;
        const dist = Math.abs(wordIdx - mid);
        const speed = 50 + dist * 20;
        schedule(cycle, speed);
      } else {
        phase = "recover";
        tick = 8;
        schedule(recover, 60);
      }
    };

    // ── Phase 3: Recover back to brand ──
    const recover = () => {
      if (cancelled) return;
      tick--;
      const chaos = Math.max(tick / 8, 0);
      setChaosLevel(chaos);

      if (chaos > 0.15) {
        setText(corrupt(BRAND, chaos));
        schedule(recover, 70);
      } else {
        setText(BRAND);
        setChaosLevel(0);
        phase = "twitch";
        schedule(() => twitch(2), 300);
      }
    };

    // ── Phase 4: Subtle twitches ──
    const twitch = (count: number) => {
      if (cancelled || count <= 0) {
        setText(BRAND);
        setChaosLevel(0);
        return;
      }
      setText(corrupt(BRAND, 0.1));
      setChaosLevel(0.05);
      schedule(() => {
        setText(BRAND);
        setChaosLevel(0);
        schedule(() => twitch(count - 1), 200);
      }, 50);
    };

    schedule(escalate, 60);

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setText(BRAND);
      setChaosLevel(0);
    };
  }, [isHovered, corrupt]);

  return (
    <motion.span
      className="tracking-[0.3em] lowercase cursor-pointer select-none inline-block relative"
      style={{
        fontSize: "clamp(10px, 1.2vw, 13px)",
        color: chaosLevel > 0.3 ? COLORS.snow : COLORS.ash,
        fontWeight: 400,
        transition: "color 0.1s",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease: ANIMATION.ease }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Chromatic offset — subtle, only when glitching */}
      {chaosLevel > 0.25 && (
        <>
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              color: "#00FFFF",
              opacity: chaosLevel * 0.25,
              transform: `translate(${chaosLevel * -1.5}px, ${chaosLevel * -0.5}px)`,
              mixBlendMode: "screen",
            }}
          >
            {text}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              color: "#FF44CC",
              opacity: chaosLevel * 0.25,
              transform: `translate(${chaosLevel * 1.5}px, ${chaosLevel * 0.5}px)`,
              mixBlendMode: "screen",
            }}
          >
            {text}
          </span>
        </>
      )}
      {text}
    </motion.span>
  );
}

export default function HeroHeader() {
  const grainRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const w = 256;
    const h = 256;
    canvas.width = w;
    canvas.height = h;

    function drawGrain() {
      if (!ctx) { animId = requestAnimationFrame(drawGrain); return; }
      const imageData = ctx.createImageData(w, h);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 50;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 25;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(drawGrain);
    }
    drawGrain();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <header 
      className="relative overflow-hidden"
      style={{ 
        backgroundColor: COLORS.void,
        height: "100vh",
        minHeight: "600px",
      }}
    >
      {/* Background photograph — cinematic, very subtle */}
      <div className="absolute inset-0">
        <Image
          src="/images/DSCF0390.JPG"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ opacity: 0.15 }}
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay — centre-weighted vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.85) 100%)",
            "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0) 30%, rgba(5,5,5,0) 70%, rgba(5,5,5,1) 100%)",
          ].join(", "),
        }}
      />

      {/* Film grain canvas */}
      <canvas
        ref={grainRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          mixBlendMode: "overlay",
          opacity: 0.5,
        }}
      />

      {/* ────── Content Grid ────── */}
      <div 
        className="relative h-full flex flex-col"
        style={{ padding: "clamp(24px, 4vh, 48px) clamp(24px, 5vw, 96px)" }}
      >
        {/* Top bar — Brand + Year */}
        <div className="flex justify-between items-center">
          <GlitchBrand />

          <motion.p
            className="tracking-[0.5em] uppercase"
            style={{ 
              fontSize: TYPOGRAPHY.overline.size,
              color: COLORS.ash,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: ANIMATION.ease }}
          >
            2026
          </motion.p>
        </div>

        {/* ── Main content — positioned at rule-of-thirds (≈33vh from top) ── */}
        <div 
          className="flex-1 flex flex-col"
          style={{ 
            justifyContent: "center",
            paddingBottom: "17vh",  /* Pushes content to ~33% from top: 50% - 17% = 33% */
          }}
        >
          {/* Name — The only loud element */}
          <motion.h1
            style={{ 
              fontSize: "clamp(3.5rem, 9vw, 9rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: COLORS.chalk,
              fontWeight: 300,
            }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: ANIMATION.ease }}
          >
            Can
            <span 
              className="block"
              style={{ 
                color: COLORS.concrete,
                marginTop: "clamp(4px, 0.8vw, 12px)",
              }}
            >
              Demir
            </span>
          </motion.h1>

          {/* Manifesto — φ³ ratio below title (title ~9vw, this ~2.1vw ≈ 4.24:1) */}
          <motion.p
            className="leading-relaxed"
            style={{ 
              fontSize: "clamp(13px, 1.6vw, 18px)",
              lineHeight: 1.6,
              color: COLORS.concrete,
              fontWeight: 400,
              maxWidth: "420px",
              marginTop: "clamp(24px, 4vh, 48px)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: ANIMATION.ease }}
          >
            I find what's missing and build it.
          </motion.p>

          {/* CTA — Editorial link, no amber */}
          <motion.a
            href="#renkler"
            className="group inline-flex items-center cursor-pointer"
            style={{ 
              gap: "16px",
              marginTop: "clamp(32px, 5vh, 56px)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: ANIMATION.ease }}
          >
            <span
              className="cta-line block h-px transition-colors duration-500 group-hover:!bg-[#F0F0F0]"
              style={{ backgroundColor: COLORS.ash }}
            />
            <span
              className="tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-[#F0F0F0]"
              style={{
                fontSize: "10px",
                color: COLORS.ash,
                fontWeight: 400,
              }}
            >
              Explore
            </span>
          </motion.a>
        </div>
      </div>
    </header>
  );
}
