"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { COLORS, ANIMATION } from "@/app/lib/design-tokens";
import { NAV_ITEMS } from "@/app/lib/constants";
import GlitchBrand from "@/app/components/brand/GlitchBrand";
import Navigation from "@/app/components/layout/Navigation";

/* ═══════════════════════════════════════════════════════════════
   Header — Sabit Üst Bar (Layout Seviyesi)
   
   Tüm sayfalarda görünür.
   Sol: GlitchBrand (candemir.co)
   Sağ: Menu butonu + Hamburger → X dönüşümü
   Scroll sonrası: frosted glass arka plan
   ═══════════════════════════════════════════════════════════════ */

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[90] flex items-center justify-between"
        style={{
          padding: "clamp(20px, 3vh, 36px) clamp(24px, 5vw, 96px)",
          backgroundColor: scrolled && !isOpen ? "rgba(5,5,5,0.85)" : "transparent",
          backdropFilter: scrolled && !isOpen ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled && !isOpen ? "blur(16px)" : "none",
          borderBottom: scrolled && !isOpen
            ? `1px solid ${COLORS.glassBorder}`
            : "1px solid transparent",
          transition: "background-color 0.6s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.6s, border-color 0.6s",
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: ANIMATION.ease }}
      >
        <GlitchBrand />

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

      <Navigation
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={NAV_ITEMS}
      />
    </>
  );
}
