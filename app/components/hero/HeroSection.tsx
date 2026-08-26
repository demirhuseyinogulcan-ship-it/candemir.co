"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ANIMATION } from "@/app/lib/design-tokens";
import { SOCIAL_LINKS } from "@/app/lib/constants";

/* ═══════════════════════════════════════════════════════════════
   HERO — Golden Ratio · Bottom-Left Anchor Architecture
   
   φ  = 1.618034
   
   Container:
     paddingLeft   = 5vw
     paddingBottom = 5vw × φ = 8.09vw
     maxWidth      = 100/φ²  = 38.2vw
   
   Vertical Rhythm (φ-cascade @1440px):
     H1 font       = 1.8vw   (26px)  — taban
     gap1 H1→man.  = 1.11vw  (16px)  — taban / φ
     gap2 man.→ic. = 0.69vw  (10px)  — gap1  / φ
   
   Film grain: 256×256 canvas, rAF loop, mix-blend-mode: overlay
   ═══════════════════════════════════════════════════════════════ */

export default function HeroSection() {
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
        backgroundColor: "var(--hero-background)",
        height: "100vh",
        minHeight: "600px",
      }}
    >
      {/* Background photograph */}
      <div className="absolute inset-0">
        <Image
          src="/images/DSCF0390.JPG"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ opacity: 0.4 }}
          sizes="100vw"
          quality={75}
        />
      </div>

      {/* Gradient overlay — bottom only for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0) 50%, rgba(5,5,5,0.7) 80%, rgba(5,5,5,0.95) 100%)",
          ].join(", "),
        }}
      />

      {/* Film grain canvas */}
      <canvas
        ref={grainRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: "overlay", opacity: 0.5 }}
      />

      {/* Content: Bottom-Left Golden Anchor */}
      <div
        className="absolute bottom-0 left-0 flex flex-col items-start"
        style={{
          paddingLeft: "clamp(24px, 5vw, 96px)",
          paddingBottom: "clamp(48px, 8.09vw, 156px)",
          textAlign: "left",
          maxWidth: "clamp(300px, 38.2vw, 550px)",
        }}
      >
        {/* H1 Name — tek satır, imza ölçeği */}
        <motion.h1
          style={{
            fontSize: "clamp(1.5rem, 1.8vw, 2rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--color-on-media)",
            fontWeight: 300,
            margin: 0,
            padding: 0,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: ANIMATION.ease }}
        >
          Can{" "}
          <span style={{ color: "var(--color-on-media-muted)" }}>Demir</span>
        </motion.h1>

        {/* Manifesto */}
        <motion.p
          style={{
            fontSize: "clamp(13px, 1.3vw, 19px)",
            lineHeight: 1.5,
            color: "var(--color-on-media-muted)",
            fontWeight: 400,
            margin: 0,
            marginTop: "clamp(10px, 1.11vw, 18px)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: ANIMATION.ease }}
        >
          I find what{"\u2019"}s missing and build it.
        </motion.p>

        {/* Social Icons — from constants */}
        <motion.div
          className="flex items-center"
          style={{
            gap: "clamp(8px, 0.55vw, 10px)",
            marginTop: "clamp(7px, 0.69vw, 11px)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: ANIMATION.ease }}
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="hero-social block transition-colors duration-500"
              style={{ color: "var(--color-on-media-muted)" }}
            >
              <svg
                width="clamp(13px, 0.97vw, 15px)"
                height="clamp(13px, 0.97vw, 15px)"
                viewBox="0 0 24 24"
                fill="currentColor"
                dangerouslySetInnerHTML={{ __html: link.svg }}
              />
            </a>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
