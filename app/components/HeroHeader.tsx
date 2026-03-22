"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ANIMATION, COLORS } from "@/app/lib/design-tokens";

/* ═══════════════════════════════════════════════════════════════
   HERO — Golden Ratio Architecture
   
   Rule of Thirds: Ana metin viewport %33'te
   Başlık/alt yazı: φ³ ≈ 4.24:1 oranı
   Boşluk: %65 boş, %35 içerik
   Tipografi: 2 weight only (300 + 400)
   Renk: 2 only (chalk + concrete)
   
   Üst bar (brand + yıl) artık SideNav'a taşındı.
   Hero sadece isim, manifesto ve CTA içerir.
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

      {/* ────── Content ────── */}
      <div 
        className="relative h-full flex flex-col"
        style={{ padding: "clamp(24px, 4vh, 48px) clamp(24px, 5vw, 96px)" }}
      >
        {/* ── Main content — positioned at rule-of-thirds (≈33vh from top) ── */}
        <div 
          className="flex-1 flex flex-col"
          style={{ 
            justifyContent: "center",
            paddingBottom: "17vh",  /* Pushes content to ~33% from top */
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
            I find what{"'"}s missing and build it.
          </motion.p>

          {/* CTA — Editorial link */}
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
