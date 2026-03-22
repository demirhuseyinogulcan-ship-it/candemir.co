"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { COLORS, ANIMATION } from "@/app/lib/design-tokens";

/* ═══════════════════════════════════════════════════════════════
   NAVİGASYON — Sabit Üst Bar + Sağdan Açılan Altın Oran Paneli
   
   Matematik:
   φ = 1.618033… (Altın Oran)
   Panel genişliği = 100vw / φ ≈ 38.2vw (minor golden segment)
   Görünen sayfa = 100vw − 38.2vw ≈ 61.8vw (major golden segment)
   → Sayfa her zaman panelden φ kat daha geniş kalır.
   
   Mobilde (< 768px): Panel = φ/(1+φ) ≈ 61.8vw
   → Ekranın küçüklüğü nedeniyle oranlar tersine döner.
   
   Renk: Sadece ash / concrete / snow — accent yok
   Hamburger: 2 çizgi → X dönüşümü (korundu)
   Açılış: sağdan sola translateX slide
   Kapanış: sol taraftaki karanlık alana tıklama veya X butonu
   ═══════════════════════════════════════════════════════════════ */

/** Golden ratio panel width — minor segment on desktop, major on mobile */
const PANEL_WIDTH_DESKTOP = "38.2vw";   // 100/φ ≈ 61.8 visible, 38.2 panel
const PANEL_WIDTH_MOBILE = "78vw";      // Mobile-friendly wider panel
const PANEL_MIN_WIDTH = "320px";        // Minimum usable width
const PANEL_MAX_WIDTH = "560px";        // Maximum on ultra-wide

const BRAND = "candemir.co";
const PROCESS_WORDS = [
  "discover", "observe", "focus", "think", "frame",
  "design", "code", "launch", "grow",
];
const GLITCH_CHARS = "!@#$%^&*<>{}[]|/\\~";

const NAV_ITEMS = [
  { label: "Can Demir", description: "Hakkımda" },
  { label: "Projeler", description: "Seçili işler" },
  { label: "Prodüksiyon", description: "Video / Fotoğraf" },
  { label: "Notlar", description: "Günlük / Blog" },
  { label: "İletişim", description: "Birlikte çalışalım" },
];

/* ── GlitchBrand — Hover ile kaotik kelime döngüsü ── */
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
    let cancelled = false;

    const schedule = (fn: () => void, ms: number) => {
      if (cancelled) return;
      timeoutRef.current = setTimeout(fn, ms);
    };

    // ── Phase 1: Escalate ──
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

    // ── Phase 2: Cycle through process words ──
    const cycle = () => {
      if (cancelled) return;
      const word = PROCESS_WORDS[wordIdx];
      setChaosLevel(0.6 + Math.random() * 0.3);
      setText(Math.random() < 0.3 ? corrupt(word, 0.25) : word);
      wordIdx++;
      if (wordIdx < PROCESS_WORDS.length) {
        const mid = PROCESS_WORDS.length / 2;
        const dist = Math.abs(wordIdx - mid);
        schedule(cycle, 50 + dist * 20);
      } else {
        tick = 8;
        schedule(recover, 60);
      }
    };

    // ── Phase 3: Recover ──
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
    <a
      href="#"
      className="tracking-[0.3em] lowercase cursor-pointer select-none relative inline-block"
      style={{
        fontSize: "clamp(10px, 1.2vw, 13px)",
        color: chaosLevel > 0.3 ? COLORS.snow : COLORS.ash,
        fontWeight: 400,
        textDecoration: "none",
        transition: "color 0.15s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Chromatic offset — sadece glitch anında */}
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

/* ── Ana Navigasyon ── */
export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü açıkken scroll kilitle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Sabit Üst Bar ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[90] flex items-center justify-between"
        style={{
          padding: "clamp(20px, 3vh, 36px) clamp(24px, 5vw, 96px)",
          backgroundColor:
            scrolled && !isOpen ? "rgba(5,5,5,0.85)" : "transparent",
          backdropFilter: scrolled && !isOpen ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled && !isOpen ? "blur(16px)" : "none",
          borderBottom:
            scrolled && !isOpen
              ? `1px solid ${COLORS.glassBorder}`
              : "1px solid transparent",
          transition:
            "background-color 0.6s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.6s, border-color 0.6s",
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: ANIMATION.ease }}
      >
        <GlitchBrand />

        {/* Menü Tetikleyici */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer flex items-center gap-4 bg-transparent border-none outline-none"
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          <span
            className="tracking-[0.3em] uppercase"
            style={{
              fontSize: "10px",
              color: isOpen ? COLORS.snow : COLORS.ash,
              transition: "color 0.4s",
            }}
          >
            {isOpen ? "Kapat" : "Menu"}
          </span>

          {/* Hamburger → X dönüşümü */}
          <div className="relative" style={{ width: 20, height: 11 }}>
            <motion.span
              className="absolute left-0 top-0 block w-full"
              style={{ height: "1px" }}
              animate={{
                y: isOpen ? 5 : 0,
                rotate: isOpen ? 45 : 0,
                backgroundColor: isOpen ? COLORS.snow : COLORS.ash,
              }}
              transition={{ duration: 0.4, ease: ANIMATION.ease }}
            />
            <motion.span
              className="absolute left-0 bottom-0 block w-full"
              style={{ height: "1px" }}
              animate={{
                y: isOpen ? -5 : 0,
                rotate: isOpen ? -45 : 0,
                backgroundColor: isOpen ? COLORS.snow : COLORS.ash,
              }}
              transition={{ duration: 0.4, ease: ANIMATION.ease }}
            />
          </div>
        </button>
      </motion.nav>

      {/* ── Sağdan Açılan Panel + Backdrop ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop — sol taraftaki karanlık alan, tıkla → kapat */}
            <motion.div
              className="fixed inset-0 z-[84]"
              style={{ backgroundColor: "rgba(5, 5, 5, 0.6)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel — sağ kenar, altın oran genişliği */}
            <motion.aside
              className="fixed top-0 right-0 bottom-0 z-[86] flex flex-col nav-panel-golden"
              style={{
                width: `clamp(${PANEL_MIN_WIDTH}, ${PANEL_WIDTH_DESKTOP}, ${PANEL_MAX_WIDTH})`,
                backgroundColor: COLORS.void,
                borderLeft: `1px solid ${COLORS.glassBorder}`,
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Panel iç yapısı */}
              <div
                className="flex-1 flex flex-col justify-center overflow-y-auto"
                style={{
                  padding:
                    "clamp(100px, 15vh, 140px) clamp(32px, 4vw, 56px) clamp(32px, 4vh, 56px)",
                }}
              >
                {/* Menü Öğeleri */}
                <div className="flex-1 flex flex-col justify-center">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href="#"
                      className="group block relative"
                      style={{
                        textDecoration: "none",
                        borderBottom: `1px solid ${COLORS.glassBorder}`,
                        padding: "clamp(14px, 2.2vh, 28px) 0",
                      }}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.12 + i * 0.06,
                        ease: ANIMATION.ease,
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {/* Sol kenar çizgisi — hover'da scale-y 0→1 */}
                      <div
                        className="absolute left-0 top-0 h-full w-[1px] origin-top scale-y-0 group-hover:scale-y-100"
                        style={{
                          backgroundColor: COLORS.snow,
                          transition:
                            "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      />

                      <div className="flex flex-col gap-1" style={{ paddingLeft: "12px" }}>
                        {/* Numara */}
                        <span
                          className="tracking-[0.5em] font-mono transition-colors duration-500 group-hover:!text-[#777777]"
                          style={{ fontSize: "10px", color: COLORS.ash }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Başlık */}
                        <span
                          className="inline-block transition-all duration-500 group-hover:translate-x-1 group-hover:!text-[#F0F0F0]"
                          style={{
                            fontSize: "clamp(1.25rem, 2.8vw, 2rem)",
                            fontWeight: 300,
                            lineHeight: 1.2,
                            letterSpacing: "-0.02em",
                            color: COLORS.concrete,
                          }}
                        >
                          {item.label}
                        </span>

                        {/* Açıklama — her zaman görünür, subtle */}
                        <span
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ fontSize: "12px", color: COLORS.ash }}
                        >
                          {item.description}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Alt Bilgi */}
                <motion.div
                  className="flex flex-col gap-3"
                  style={{
                    paddingTop: "clamp(32px, 4vh, 56px)",
                    borderTop: `1px solid ${COLORS.glassBorder}`,
                    marginTop: "clamp(24px, 3vh, 40px)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                >
                  <p
                    className="tracking-[0.3em]"
                    style={{ fontSize: "11px", color: COLORS.ash }}
                  >
                    Istanbul, Turkey
                  </p>
                  <p
                    className="tracking-[0.2em]"
                    style={{ fontSize: "11px", color: COLORS.ash }}
                  >
                    2026
                  </p>
                </motion.div>
              </div>

              {/* Panel sol kenarında ince altın oran çizgisi */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{
                  background: `linear-gradient(to bottom, transparent 0%, ${COLORS.ash}40 20%, ${COLORS.ash}40 80%, transparent 100%)`,
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: ANIMATION.ease }}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
