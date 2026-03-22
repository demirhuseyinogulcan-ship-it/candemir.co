"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { COLORS } from "@/app/lib/design-tokens";

// ============================================
// SOKAK ALFABE — Her section icin ozel cizgisel ikon
// Sadece stroke + line/path/circle ile sifirdan yaratilmis
// Artan karmasiklik: basitten kaosa evrim
// ============================================

const SECTIONS = [
  { id: "renkler", label: "Renkler" },
  { id: "tipografi", label: "Tipografi" },
  { id: "butonlar", label: "Butonlar" },
  { id: "imza", label: "Imza" },
  { id: "mimari", label: "Mimari" },
  { id: "animasyonlar", label: "Animasyonlar" },
  { id: "kan", label: "Kan Fizigi" },
  { id: "kaos", label: "Kaos" },
] as const;

// Her ikon 24x24 viewBox, sadece stroke tabanli
function SectionIcon({ index, active }: { index: number; active: boolean }) {
  const color = active ? COLORS.lamp.bright : COLORS.ash;
  const strokeW = active ? 1.8 : 1.2;
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: { overflow: "visible" as const },
  };

  switch (index) {
    // 01 — RENKLER: Uc damlacik, ustten yana dogru acilan — renk birlesmesi
    case 0:
      return (
        <svg {...props}>
          <circle cx="9" cy="10" r="5" stroke={color} strokeWidth={strokeW} />
          <circle cx="15" cy="10" r="5" stroke={color} strokeWidth={strokeW} opacity={0.7} />
          <circle cx="12" cy="15.5" r="5" stroke={color} strokeWidth={strokeW} opacity={0.5} />
        </svg>
      );

    // 02 — TIPOGRAFI: Zarif serif "A" harfi iskeleti — cizgilerden olusan harf anatomisi
    case 1:
      return (
        <svg {...props}>
          {/* Sol bacak */}
          <line x1="5" y1="20" x2="12" y2="3" stroke={color} strokeWidth={strokeW} strokeLinecap="round" />
          {/* Sag bacak */}
          <line x1="19" y1="20" x2="12" y2="3" stroke={color} strokeWidth={strokeW} strokeLinecap="round" />
          {/* Crossbar */}
          <line x1="7.5" y1="13" x2="16.5" y2="13" stroke={color} strokeWidth={strokeW} strokeLinecap="round" />
          {/* Serif sol */}
          <line x1="3" y1="20" x2="7" y2="20" stroke={color} strokeWidth={strokeW * 0.8} strokeLinecap="round" opacity={0.6} />
          {/* Serif sag */}
          <line x1="17" y1="20" x2="21" y2="20" stroke={color} strokeWidth={strokeW * 0.8} strokeLinecap="round" opacity={0.6} />
        </svg>
      );

    // 03 — BUTONLAR: Rounded rectangle + tiklanma dalga efekti
    case 2:
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="10" rx="5" stroke={color} strokeWidth={strokeW} />
          {/* Cursor oku */}
          <path d="M10 10 L14 12 L10 14 L10.5 12 Z" stroke={color} strokeWidth={strokeW * 0.7} strokeLinejoin="round" strokeLinecap="round" />
          {/* Tiklanma dalgasi */}
          <circle cx="12" cy="12" r="8" stroke={color} strokeWidth={strokeW * 0.5} strokeDasharray="2 3" opacity={0.35} />
        </svg>
      );

    // 04 — IMZA: Akan kaligrafik cizgi — bir imzanin ozeti
    case 3:
      return (
        <svg {...props}>
          <path
            d="M3 17 C5 8, 7 6, 9 12 S13 20, 15 10 C16 6, 17 8, 19 7"
            stroke={color}
            strokeWidth={strokeW}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Imza bitisindeki cizgi — kalem kaldirir gibi incelir */}
          <path
            d="M19 7 L21 5"
            stroke={color}
            strokeWidth={strokeW * 0.6}
            strokeLinecap="round"
            opacity={0.5}
          />
          {/* Alt cizgi — imza alti */}
          <line x1="4" y1="20" x2="18" y2="20" stroke={color} strokeWidth={strokeW * 0.5} strokeLinecap="round" opacity={0.3} />
        </svg>
      );

    // 05 — MIMARI: Modüller grid / blueprint kesisim
    case 4:
      return (
        <svg {...props}>
          {/* Dikey grid cizgileri */}
          <line x1="8" y1="2" x2="8" y2="22" stroke={color} strokeWidth={strokeW * 0.6} opacity={0.4} />
          <line x1="16" y1="2" x2="16" y2="22" stroke={color} strokeWidth={strokeW * 0.6} opacity={0.4} />
          {/* Yatay grid cizgileri */}
          <line x1="2" y1="8" x2="22" y2="8" stroke={color} strokeWidth={strokeW * 0.6} opacity={0.4} />
          <line x1="2" y1="16" x2="22" y2="16" stroke={color} strokeWidth={strokeW * 0.6} opacity={0.4} />
          {/* Vurgulu kesisim noktalari */}
          <circle cx="8" cy="8" r="1.5" stroke={color} strokeWidth={strokeW} />
          <circle cx="16" cy="8" r="1.5" stroke={color} strokeWidth={strokeW} />
          <circle cx="8" cy="16" r="1.5" stroke={color} strokeWidth={strokeW} />
          <circle cx="16" cy="16" r="1.5" stroke={color} strokeWidth={strokeW} />
          {/* Capraz baglanti */}
          <line x1="8" y1="8" x2="16" y2="16" stroke={color} strokeWidth={strokeW * 0.7} strokeDasharray="2 2" opacity={0.5} />
        </svg>
      );

    // 06 — ANIMASYONLAR: Hareket izi olan cisim — easing egrisi + hareket cizgisi
    case 5:
      return (
        <svg {...props}>
          {/* Easing curve — cubic bezier */}
          <path
            d="M3 20 C3 20, 6 20, 8 14 S12 4, 14 4 C16 4, 18 4, 21 4"
            stroke={color}
            strokeWidth={strokeW}
            strokeLinecap="round"
          />
          {/* Hareket eden daire */}
          <circle cx="21" cy="4" r="2.5" stroke={color} strokeWidth={strokeW} />
          {/* Hareket izi cizgileri */}
          <line x1="3" y1="20" x2="6" y2="20" stroke={color} strokeWidth={strokeW * 0.6} strokeLinecap="round" opacity={0.3} />
          <line x1="5" y1="18" x2="7" y2="16" stroke={color} strokeWidth={strokeW * 0.5} strokeLinecap="round" opacity={0.2} />
          <line x1="7" y1="16" x2="9" y2="12" stroke={color} strokeWidth={strokeW * 0.5} strokeLinecap="round" opacity={0.15} />
        </svg>
      );

    // 07 — KAN FIZIGI: Nabiz cizgisi + damlama — EKG hatti keskin sivri iniyor
    case 6:
      return (
        <svg {...props}>
          {/* EKG hatti */}
          <path
            d="M2 13 L6 13 L8 6 L10 18 L12 4 L14 16 L15 13 L18 13"
            stroke={color}
            strokeWidth={strokeW}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Damlama */}
          <path
            d="M20 12 C20 12, 22 15, 22 17 C22 18.6, 21.1 19.5, 20 19.5 C18.9 19.5, 18 18.6, 18 17 C18 15, 20 12, 20 12 Z"
            stroke={color}
            strokeWidth={strokeW * 0.8}
            strokeLinejoin="round"
          />
        </svg>
      );

    // 08 — KAOS: Kirilmis geometri — cerceve parcalaniyor, cizgiler dagiliyor
    case 7:
      return (
        <svg {...props}>
          {/* Kirik cerceve — sol ust */}
          <path d="M3 9 L3 3 L9 3" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" />
          {/* Kaymis sag ust */}
          <path d="M16 5 L22 5 L22 11" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
          {/* Daha da kaymis sol alt */}
          <path d="M5 15 L1 21 L7 21" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" opacity={0.5} />
          {/* En cok kaymis sag alt */}
          <path d="M17 19 L23 23 L23 17" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" opacity={0.35} />
          {/* Capraz kirik cizgi — cerceve icinden gecen hasar */}
          <line x1="7" y1="7" x2="11" y2="11" stroke={color} strokeWidth={strokeW * 0.7} strokeLinecap="round" />
          <line x1="13" y1="13" x2="17" y2="17" stroke={color} strokeWidth={strokeW * 0.7} strokeLinecap="round" opacity={0.6} />
          {/* Patlama noktasi */}
          <circle cx="12" cy="12" r="1" stroke={color} strokeWidth={strokeW} />
        </svg>
      );

    default:
      return null;
  }
}

// ============================================
// SIDE NAV — Sag kenar dikey section indicator
// ============================================
export default function SideNav() {
  const [activeSection, setActiveSection] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pastHero, setPastHero] = useState(false);

  const updateActive = useCallback(() => {
    const scrollY = window.scrollY;
    const viewH = window.innerHeight;

    // Hero gecildi mi?
    setPastHero(scrollY > viewH * 0.7);

    // Hangi section gorunur?
    let current = -1;
    for (let i = 0; i < SECTIONS.length; i++) {
      const el = document.getElementById(SECTIONS[i].id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      // Section'in ust %40'i viewport'un ust yarisinda mi?
      if (rect.top < viewH * 0.5 && rect.bottom > viewH * 0.2) {
        current = i;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    // Passive scroll listener — performans icin
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <AnimatePresence>
      {pastHero && (
        <motion.nav
          className="fixed z-50 flex flex-col items-center gap-1"
          style={{
            right: "clamp(12px, 2vw, 24px)",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Glass background */}
          <div
            className="absolute rounded-2xl pointer-events-none"
            style={{
              inset: "-12px -10px",
              background: `rgba(5, 5, 5, 0.6)`,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${COLORS.glassBorder}`,
            }}
          />

          {SECTIONS.map((section, i) => {
            const isActive = activeSection === i;
            const isHovered = hoveredIndex === i;

            return (
              <div
                key={section.id}
                className="relative cursor-pointer"
                style={{ padding: "6px 4px" }}
                onClick={() => handleClick(section.id)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Ikon */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : isHovered ? 1.1 : 1,
                    opacity: isActive ? 1 : isHovered ? 0.8 : 0.4,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <SectionIcon index={i} active={isActive} />
                </motion.div>

                {/* Glow — aktif ikonda */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${COLORS.lamp.bright}15 0%, transparent 70%)`,
                    }}
                    layoutId="navGlow"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Tooltip — hover'da sol tarafta belirir */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute right-full top-1/2 mr-3 whitespace-nowrap pointer-events-none"
                      style={{
                        transform: "translateY(-50%)",
                        fontSize: "11px",
                        color: isActive ? COLORS.lamp.bright : COLORS.snow,
                        letterSpacing: "0.1em",
                        textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                      }}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span style={{ opacity: 0.5, marginRight: "6px", fontFamily: "monospace", fontSize: "9px" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {section.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
