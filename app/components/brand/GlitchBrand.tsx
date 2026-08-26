"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { BRAND, GLITCH_PROCESS_WORDS } from "@/app/lib/constants";

/* ═══════════════════════════════════════════════════════════════
   GlitchBrand — Kaotik Marka Animasyonu
   
   Hover ile 4 fazlı glitch döngüsü:
   1. Escalate — Karakterler bozulmaya başlar
   2. Cycle — Süreç kelimeleri arasında geçiş
   3. Recover — Marka metni geri toparlanır
   4. Twitch — Son subtle sarsıntılar
   
   Chromatic aberration: cyan (#00FFFF) + magenta (#FF44CC)
   ═══════════════════════════════════════════════════════════════ */

const GLITCH_CHARS = "!@#$%^&*<>{}[]|/\\~";

interface GlitchBrandProps {
  href?: string;
}

export default function GlitchBrand({ href = "/" }: GlitchBrandProps) {
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
    let cancelled = false;

    const schedule = (fn: () => void, ms: number) => {
      if (cancelled) return;
      timeoutRef.current = setTimeout(fn, ms);
    };

    const escalate = () => {
      if (cancelled) return;
      tick++;
      const chaos = Math.min(tick / 6, 1);
      setChaosLevel(chaos);
      setText(corrupt(BRAND, chaos));
      if (tick < 6) {
        schedule(escalate, 60);
      } else {
        tick = 0;
        schedule(cycle, 40);
      }
    };

    const cycle = () => {
      if (cancelled) return;
      const word = GLITCH_PROCESS_WORDS[wordIdx];
      setChaosLevel(0.6 + Math.random() * 0.3);
      setText(Math.random() < 0.3 ? corrupt(word, 0.25) : word);
      wordIdx++;
      if (wordIdx < GLITCH_PROCESS_WORDS.length) {
        const mid = GLITCH_PROCESS_WORDS.length / 2;
        const dist = Math.abs(wordIdx - mid);
        schedule(cycle, 50 + dist * 20);
      } else {
        tick = 8;
        schedule(recover, 60);
      }
    };

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
        schedule(() => twitch(2), 300);
      }
    };

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
    <a
      href={href}
      className="tracking-[0.3em] lowercase cursor-pointer select-none relative inline-block"
      style={{
        fontSize: "clamp(10px, 1.2vw, 13px)",
        color: chaosLevel > 0.3 ? "var(--header-control)" : "var(--header-control-muted)",
        fontWeight: 400,
        textDecoration: "none",
        transition: "color 0.15s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
    </a>
  );
}
