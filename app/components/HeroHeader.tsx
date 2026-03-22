"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ANIMATION, COLORS } from "@/app/lib/design-tokens";

/* ═══════════════════════════════════════════════════════════════
   HERO — Golden Ratio · Bottom-Right Anchor Architecture
   
   φ  = 1.618034
   1/φ   = 0.61803  (61.8%)
   1/φ²  = 0.38197  (38.2%)
   1/φ³  = 0.23607  (23.6%)
   1/φ⁴  = 0.14590  (14.6%)

   ┌───────────────────────────────────────────┐
   │                                           │
   │          61.8% vertical void              │
   │          (sinematik negatif alan)          │
   │                                           │
   │─ ─ ─ ─ ─ ─ ─ ─ ─ φ H ─ ─ ─ ─ ─ ─ ─ ─ ─│ ← 61.8vh
   │              61.8%  │  content zone       │
   │              empty  │  right-aligned      │
   │                     │  name + manifesto   │
   │                     │  + icons            │
   └───────────────────────────────────────────┘
                         ↑ 61.8vw (φ W)

   TYPOGRAPHY SCALE (anchor: H1 = 5.5vw):
   ├── H1 Name:     5.5vw          (base)
   ├── Manifesto:   5.5vw / φ³    ≈ 1.3vw  (ratio 4.24:1)
   └── Icon size:   clamped 15–17px         (a11y minimum)
   
   SPACING SCALE:
   ├── Name → Manifesto gap:   base / φ²  ≈ 2.1vw   (30px @1440)
   ├── Manifesto → Icons gap:  base / φ³  ≈ 1.3vw   (19px @1440)
   ├── Icon internal gap:      base / φ⁴  ≈ 0.8vw   (min 10px)
   ├── Container right pad:    5vw                    (72px @1440)
   └── Container bottom pad:   5vw × φ    ≈ 8.09vw   (117px @1440)
        → Neden φ çarpanı? İnsan gözü dikey mesafeleri yataydan
          ~%20 kısa algılar. φ oranı bu optik aldanmayı kompanze
          ederek köşe padding'lerinin eşit HİSSETMESİNİ sağlar.

   Line-height: 0.82 → "Can" / "Demir" arası sıfır görsel boşluk.
   Text-align: right → Ressam imzası estetiği.
   ═══════════════════════════════════════════════════════════════ */

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

      {/* Gradient overlay — vignette biased toward bottom-left content zone
          Radial center offset to 35%/60% creates a subtle spotlight
          on the content area while deepening the void above-right */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 70% 60% at 35% 60%, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.92) 100%)",
            "linear-gradient(to bottom, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0) 40%, rgba(5,5,5,0) 65%, rgba(5,5,5,0.9) 100%)",
          ].join(", "),
        }}
      />

      {/* Film grain canvas */}
      <canvas
        ref={grainRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: "overlay", opacity: 0.5 }}
      />

      {/* ────── Content: Bottom-Left Golden Anchor ──────
          Absolute positioning to corner.
          maxWidth = 38.2vw (= 100/φ²) constrains content
          to the golden-ratio left zone of the viewport. */}
      <div 
        className="absolute bottom-0 left-0 flex flex-col items-start"
        style={{ 
          paddingLeft: "clamp(24px, 5vw, 96px)",
          paddingBottom: "clamp(48px, 8.09vw, 156px)",
          textAlign: "left",
          maxWidth: "clamp(300px, 38.2vw, 550px)",
        }}
      >
        {/* ── H1 Name — zero line-gap signature ──
            lineHeight: 0.82 eliminates visual gap between lines.
            "Can" + "Demir" stack like a monolithic typographic block.
            No marginTop on span — pure leading compression. */}
        <motion.h1
          style={{ 
            fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)",
            lineHeight: 0.82,
            letterSpacing: "-0.04em",
            color: COLORS.chalk,
            fontWeight: 300,
            margin: 0,
            padding: 0,
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: ANIMATION.ease }}
        >
          Can
          <span 
            className="block"
            style={{ color: COLORS.concrete }}
          >
            Demir
          </span>
        </motion.h1>

        {/* ── Manifesto — φ³ ratio (4.24:1 from H1 base) ──
            marginTop = base / φ² ≈ 2.1vw — golden gap from name */}
        <motion.p
          style={{ 
            fontSize: "clamp(13px, 1.3vw, 19px)",
            lineHeight: 1.5,
            color: COLORS.concrete,
            fontWeight: 400,
            margin: 0,
            marginTop: "clamp(16px, 2.1vw, 32px)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: ANIMATION.ease }}
        >
          I find what{"\u2019"}s missing and build it.
        </motion.p>

        {/* ── Social Icons — φ⁴ level, right-aligned row ──
            marginTop = base / φ³ ≈ 1.3vw
            gap = base / φ⁴ ≈ 0.8vw (min 10px for touch) */}
        <motion.div
          className="flex items-center"
          style={{
            gap: "clamp(10px, 0.8vw, 14px)",
            marginTop: "clamp(12px, 1.3vw, 20px)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: ANIMATION.ease }}
        >
          {/* GitHub */}
          <a
            href="https://github.com/demirhuseyinogulcan-ship-it"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="block transition-colors duration-500 hover:!text-[#F0F0F0]"
            style={{ color: COLORS.ash }}
          >
            <svg width="clamp(15px, 1.1vw, 17px)" height="clamp(15px, 1.1vw, 17px)" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="block transition-colors duration-500 hover:!text-[#F0F0F0]"
            style={{ color: COLORS.ash }}
          >
            <svg width="clamp(15px, 1.1vw, 17px)" height="clamp(15px, 1.1vw, 17px)" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* Behance — proper bounded SVG that fills 24x24 viewBox evenly */}
          <a
            href="https://behance.net"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance"
            className="block transition-colors duration-500 hover:!text-[#F0F0F0]"
            style={{ color: COLORS.ash }}
          >
            <svg width="clamp(15px, 1.1vw, 17px)" height="clamp(15px, 1.1vw, 17px)" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="block transition-colors duration-500 hover:!text-[#F0F0F0]"
            style={{ color: COLORS.ash }}
          >
            <svg width="clamp(15px, 1.1vw, 17px)" height="clamp(15px, 1.1vw, 17px)" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </header>
  );
}
