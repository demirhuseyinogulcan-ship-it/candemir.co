"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   3-SECOND CINEMATIC INTRO
   
   Fibonacci-inspired S-curve timing:
   Slow (readable) → Accelerate → Peak burst (subliminal) → Decelerate → Resolve → Brand
   ═══════════════════════════════════════════════════════════════ */

const CROSSFADE_WORDS = [
  { word: "discover", ms: 300 },
  { word: "observe", ms: 200 },
  { word: "focus", ms: 160 },
  { word: "think", ms: 120 },
  { word: "frame", ms: 100 },
];

const BURST_WORDS = [
  { word: "feel", ms: 60 },
  { word: "imagine", ms: 50 },
  { word: "sketch", ms: 40 },
  { word: "plan", ms: 30 },
  { word: "try", ms: 20 },
  { word: "break", ms: 20 },
  { word: "build", ms: 20 },
  { word: "merge", ms: 20 },
  { word: "measure", ms: 30 },
  { word: "shape", ms: 40 },
  { word: "review", ms: 50 },
  { word: "refine", ms: 60 },
];

const RESOLVE_WORDS = [
  { word: "design", ms: 100, opacity: 0.7 },
  { word: "code", ms: 140, opacity: 0.8 },
  { word: "launch", ms: 200, opacity: 0.9 },
  { word: "grow", ms: 260, opacity: 1 },
];

const BRAND_HOLD = 300;
const FADE_MS = 130;
const EXIT_MS = 650;

type Phase = "crossfade" | "burst" | "resolve" | "brand" | "exit";

export default function IntroOverlay({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("crossfade");
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const burstRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (phase !== "crossfade") return;
    if (idx >= CROSSFADE_WORDS.length) {
      setPhase("burst");
      return;
    }
    const t = setTimeout(() => setIdx((i) => i + 1), CROSSFADE_WORDS[idx].ms);
    return () => clearTimeout(t);
  }, [phase, idx]);

  useEffect(() => {
    if (phase !== "burst") return;
    let i = 1;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (i >= BURST_WORDS.length) {
        setIdx(0);
        setPhase("resolve");
        return;
      }
      if (burstRef.current) burstRef.current.textContent = BURST_WORDS[i].word;
      const ms = BURST_WORDS[i].ms;
      i++;
      timer = setTimeout(tick, ms);
    };

    timer = setTimeout(tick, BURST_WORDS[0].ms);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "resolve") return;
    if (idx >= RESOLVE_WORDS.length) {
      setPhase("brand");
      return;
    }
    const t = setTimeout(() => setIdx((i) => i + 1), RESOLVE_WORDS[idx].ms);
    return () => clearTimeout(t);
  }, [phase, idx]);

  useEffect(() => {
    if (phase !== "brand") return;
    const t = setTimeout(() => setPhase("exit"), BRAND_HOLD);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    setVisible(false);
    const t = setTimeout(onComplete, EXIT_MS + 50);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  const crossfadeWord =
    phase === "crossfade" && idx < CROSSFADE_WORDS.length
      ? CROSSFADE_WORDS[idx].word
      : phase === "resolve" && idx < RESOLVE_WORDS.length
        ? RESOLVE_WORDS[idx].word
        : null;

  const resolveOpacity =
    phase === "resolve" && idx < RESOLVE_WORDS.length
      ? RESOLVE_WORDS[idx].opacity
      : 0.85;

  const textBase: React.CSSProperties = {
    position: "absolute",
    fontSize: "clamp(1.25rem, 3.5vw, 3rem)",
    lineHeight: 1,
    color: "var(--intro-text)",
    textAlign: "center",
    fontWeight: 300,
    letterSpacing: "-0.02em",
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "var(--intro-background)" }}
          exit={{ y: "-100%" }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80vw",
              maxWidth: "600px",
              height: "clamp(36px, 5vw, 56px)",
            }}
          >
            {/* Crossfade words (intro + resolve) */}
            <AnimatePresence>
              {crossfadeWord && (
                <motion.h2
                  key={`${phase}-${idx}`}
                  className="lowercase"
                  style={{
                    ...textBase,
                    opacity: phase === "resolve" ? resolveOpacity : 0.85,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase === "resolve" ? resolveOpacity : 0.85 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: FADE_MS / 1000, ease: "easeOut" }}
                >
                  {crossfadeWord}
                </motion.h2>
              )}
            </AnimatePresence>

            {/* Burst phase — direct DOM */}
            {phase === "burst" && (
              <h2
                ref={burstRef}
                className="lowercase"
                style={{ ...textBase, opacity: 0.4 }}
              >
                {BURST_WORDS[0].word}
              </h2>
            )}

            {/* Brand hold */}
            {phase === "brand" && (
              <motion.h2
                className="tracking-[0.3em] lowercase"
                style={{
                  ...textBase,
                  fontSize: "clamp(1.25rem, 3.5vw, 3rem)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                candemir.co
              </motion.h2>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
