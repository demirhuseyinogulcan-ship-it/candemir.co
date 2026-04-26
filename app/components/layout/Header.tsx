"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COLORS, ANIMATION } from "@/app/lib/design-tokens";
import { NAV_ITEMS } from "@/app/lib/constants";
import GlitchBrand from "@/app/components/brand/GlitchBrand";
import Navigation from "./Navigation";

/*
   Header - Sabit Ust Bar

   Tum sayfalarda gorunur.
   Sol: Menu butonu + GlitchBrand (candemir.co)
*/

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const locale = pathname.split("/")[1] || "tr";
  const nextLocale = locale === "en" ? "tr" : "en";
  const localizedPath = pathname.startsWith(`/${locale}`)
    ? pathname.replace(`/${locale}`, `/${nextLocale}`)
    : `/${nextLocale}`;

  const localizedItems = useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        ...item,
        href: item.href.startsWith("/#")
          ? `/${locale}${item.href.slice(1)}`
          : `/${locale}${item.href}`,
      })),
    [locale]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <div className="flex items-center" style={{ gap: "clamp(14px, 2vw, 24px)" }}>
          <button
            onPointerEnter={() => {
              if (!isOpen) setIsOpen(true);
            }}
            onClick={() => setIsOpen((prev) => !prev)}
            className="group cursor-pointer bg-transparent border-none outline-none"
            style={{
              width: "40px",
              height: "40px",
              margin: "-10px 0 -10px -10px",
              padding: "14px 10px",
            }}
            aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isOpen}
          >
            <div className="relative" style={{ width: 20, height: 11 }}>
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

          <GlitchBrand />
        </div>

        <div className="flex items-center" style={{ gap: "clamp(10px, 1.4vw, 18px)" }}>
          <Link
            href={localizedPath}
            className="font-mono uppercase"
            style={{
              color: COLORS.concrete,
              fontSize: "clamp(10px, 1.2vw, 13px)",
              letterSpacing: "0.18em",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            aria-label={nextLocale === "en" ? "Switch to English" : "Türkçeye geç"}
          >
            {locale.toUpperCase()} / {nextLocale.toUpperCase()}
          </Link>
        </div>
      </motion.nav>

      <Navigation
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={localizedItems}
      />
    </>
  );
}
