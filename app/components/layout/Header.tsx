"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { COLORS, ANIMATION } from "@/app/lib/design-tokens";
import { NAV_ITEMS } from "@/app/lib/constants";
import GlitchBrand from "@/app/components/brand/GlitchBrand";
import Navigation from "./Navigation";

/* ═══════════════════════════════════════════════════════════════
   Header — Sabit Üst Bar (Layout Seviyesi)
   
   Tüm sayfalarda görünür.
   Sol: GlitchBrand (candemir.co)
   Sağ: Menu butonu + Hamburger → X dönüşümü
   Scroll sonrası: frosted glass arka plan
   Arc-style: Fare sağ kenara gelince menü otomatik açılır
   ═══════════════════════════════════════════════════════════════ */

const EDGE_ZONE = 28; // px — sağ kenar tetikleme alanı
const EDGE_DELAY = 120; // ms — açılma gecikmesi (yanlışlıkla tetiklemeyi önler)
const SCROLLBAR_DEAD_ZONE = 10; // px — scrollbar'a dokunulduğunda menü açılmasın

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const edgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Locale prefix from current path (e.g., "/tr" or "/en")
  const locale = pathname.split("/")[1] || "tr";

  const localizedItems = useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        ...item,
        href: item.href.startsWith("/#")
          ? `/${locale}${item.href.slice(1)}` // /#process → /tr#process
          : `/${locale}${item.href}`,         // /about → /tr/about
      })),
    [locale]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll kilitleme yok — scrollbar her zaman yerinde = 0 layout shift

  // Arc-style: sağ kenara fare gelince menü açılır
  const clearEdgeTimer = useCallback(() => {
    if (edgeTimerRef.current) {
      clearTimeout(edgeTimerRef.current);
      edgeTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const distFromRight = window.innerWidth - e.clientX;

      // Scrollbar dead zone: scrollbar üzerindeyken menüyü tetikleme
      if (distFromRight <= SCROLLBAR_DEAD_ZONE) {
        clearEdgeTimer();
        return;
      }

      if (distFromRight <= EDGE_ZONE + SCROLLBAR_DEAD_ZONE && !isOpen) {
        if (!edgeTimerRef.current) {
          edgeTimerRef.current = setTimeout(() => {
            setIsOpen(true);
            edgeTimerRef.current = null;
          }, EDGE_DELAY);
        }
      } else if (distFromRight > EDGE_ZONE + SCROLLBAR_DEAD_ZONE && !isOpen) {
        clearEdgeTimer();
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearEdgeTimer();
    };
  }, [isOpen, clearEdgeTimer]);

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
          className="group cursor-pointer flex items-center gap-4 bg-transparent border-none outline-none"
          style={{
            padding: "12px 16px",
            margin: "-12px -16px",
          }}
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          <span
            className="tracking-[0.3em] uppercase transition-colors duration-400 group-hover:!text-[#F0F0F0]"
            style={{
              fontSize: "10px",
              color: isOpen ? COLORS.snow : COLORS.ash,
              transition: "color 0.4s",
            }}
          >
            {isOpen ? "Kapat" : "Menu"}
          </span>

          <div className="relative transition-colors duration-400" style={{ width: 20, height: 11 }}>
            <motion.span
              className="absolute left-0 top-0 block w-full group-hover:!bg-[#F0F0F0]"
              style={{ height: "1px", transition: "background-color 0.4s" }}
              animate={{
                y: isOpen ? 5 : 0,
                rotate: isOpen ? 45 : 0,
                backgroundColor: isOpen ? COLORS.snow : COLORS.ash,
              }}
              transition={{ duration: 0.4, ease: ANIMATION.ease }}
            />
            <motion.span
              className="absolute left-0 bottom-0 block w-full group-hover:!bg-[#F0F0F0]"
              style={{ height: "1px", transition: "background-color 0.4s" }}
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
        items={localizedItems}
      />
    </>
  );
}
