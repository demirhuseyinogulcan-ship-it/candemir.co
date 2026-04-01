"use client";

import { motion, AnimatePresence } from "framer-motion";
import { COLORS, ANIMATION } from "@/app/lib/design-tokens";

/* ═══════════════════════════════════════════════════════════════
   Navigation — Sağdan Açılan Altın Oran Paneli
   
   Panel genişliği = 100vw / φ ≈ 38.2vw (minor golden segment)
   Mobilde: 78vw (φ/(1+φ) ≈ 61.8vw yaklaşık)
   ═══════════════════════════════════════════════════════════════ */

const PANEL_WIDTH_DESKTOP = "38.2vw";
const PANEL_WIDTH_MOBILE = "78vw";
const PANEL_MIN_WIDTH = "320px";
const PANEL_MAX_WIDTH = "560px";

interface NavItem {
  readonly label: string;
  readonly description: string;
  readonly href: string;
}

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
  items: readonly NavItem[];
}

export default function Navigation({ isOpen, onClose, items }: NavigationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[84]"
            style={{ backgroundColor: "rgba(5, 5, 5, 0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-[86] flex flex-col"
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
            <div
              className="flex-1 flex flex-col justify-center overflow-y-auto"
              style={{
                padding: "clamp(100px, 15vh, 140px) clamp(32px, 4vw, 56px) clamp(32px, 4vh, 56px)",
              }}
            >
              {/* Menu Items */}
              <div className="flex-1 flex flex-col justify-center">
                {items.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
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
                    onClick={onClose}
                  >
                    {/* Left edge line on hover */}
                    <div
                      className="absolute left-0 top-0 h-full w-[1px] origin-top scale-y-0 group-hover:scale-y-100"
                      style={{
                        backgroundColor: COLORS.snow,
                        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />

                    <div className="flex flex-col gap-1" style={{ paddingLeft: "12px" }}>
                      <span
                        className="tracking-[0.5em] font-mono transition-colors duration-500 group-hover:!text-[#777777]"
                        style={{ fontSize: "10px", color: COLORS.ash }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

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

              {/* Footer info */}
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

            {/* Left edge golden ratio line */}
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
  );
}
