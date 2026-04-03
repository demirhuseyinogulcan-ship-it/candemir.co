"use client";

import { motion } from "framer-motion";
import { 
  SPACING, 
  COLORS, 
  TYPOGRAPHY,
  GLOW,
  fadeUp 
} from "@/app/lib/design-tokens";
import SectionHeader from "@/app/components/ui/SectionHeader";

// ============================================
// BUTTON DATA ÔÇö Sinematik + Sokak Lambas─▒ Sistemi
// ============================================

// Ana CTA'lar ÔÇö Sokak Lambas─▒ Amber birincil
const PRIMARY_BUTTONS = [
  {
    label: "Calisalim",
    bg: COLORS.lamp.bright,
    color: COLORS.void,
    border: `1px solid ${COLORS.lamp.warm}`,
    glow: GLOW.lamp,
  },
  {
    label: "Kaydet",
    bg: COLORS.snow,
    color: COLORS.void,
    border: `1px solid ${COLORS.concrete}`,
    glow: GLOW.white,
  },
  {
    label: "Onayla",
    bg: COLORS.lamp.warm,
    color: COLORS.void,
    border: `1px solid ${COLORS.lamp.bright}`,
    glow: GLOW.lampSubtle,
  },
  {
    label: "Iptal",
    bg: COLORS.carbon,
    color: COLORS.concrete,
    border: `1px solid ${COLORS.glassBorder}`,
    glow: GLOW.subtle,
  },
];

// ─░kincil butonlar ÔÇö Maroon accent
const SECONDARY_BUTTONS = [
  {
    label: "Projeler",
    color: COLORS.lamp.bright,
    border: `1px solid ${COLORS.lamp.dim}`,
    glow: GLOW.lampSubtle,
  },
  {
    label: "Galeri",
    color: COLORS.maroon.shirt,
    border: `1px solid rgba(114, 47, 55, 0.4)`,
    glow: GLOW.maroonSubtle,
  },
  {
    label: "Vazgec",
    color: COLORS.concrete,
    border: `1px solid ${COLORS.glassBorder}`,
    glow: GLOW.subtle,
  },
];

// Text butonlar ÔÇö minimal, hover ile ortaya ├ğ─▒kan
const TEXT_BUTTONS = [
  { label: "Devamini Oku", color: COLORS.lamp.bright, hoverBg: "rgba(255,184,0,0.08)" },
  { label: "Tum Yazilar", color: COLORS.snow, hoverBg: "rgba(255,255,255,0.06)" },
  { label: "Hakkimda", color: COLORS.maroon.shirt, hoverBg: "rgba(114,47,55,0.12)" },
];

const TOOLBAR_TABS = ["Tumu", "Web", "Fotograf", "3D"];

// ============================================
// COMPONENT
// ============================================
export default function ButtonSystem() {
  return (
    <div>
      {/* Section Header */}
      <SectionHeader
        number="03"
        title="Buton Sistemi"
        description="Duz, temiz butonlar. Hover'da yumusak glow efekti. Gereksiz 3D efekt yok, minimalist ve fonksiyonel."
      />

      {/* PRIMARY BUTTONS */}
      <motion.div {...fadeUp} style={{ marginBottom: SPACING.section }}>
        <div style={{ marginBottom: SPACING.heading }}>
          <p 
            className="tracking-[0.5em] uppercase"
            style={{ 
              fontSize: TYPOGRAPHY.overline.size,
              color: COLORS.ash,
            }}
          >
            Primary ÔÇö Glow Hover
          </p>
          <p 
            className="leading-relaxed"
            style={{ 
              fontSize: TYPOGRAPHY.small.size,
              color: COLORS.concrete,
              marginTop: "16px",
            }}
          >
            Ana eylem butonlari. Hover'da yumusak isik yayilimi.
          </p>
        </div>

        <div
          className="rounded-xl"
          style={{ 
            backgroundColor: COLORS.slate,
            padding: "clamp(40px, 6vw, 80px)",
          }}
        >
          <div className="flex flex-wrap gap-8 items-center justify-center">
            {PRIMARY_BUTTONS.map((btn) => (
              <motion.div
                key={btn.label}
                className="w-36 h-36 rounded-xl flex items-center justify-center cursor-pointer font-medium"
                style={{
                  backgroundColor: btn.bg,
                  color: btn.color,
                  border: btn.border,
                  fontSize: TYPOGRAPHY.small.size,
                }}
                whileHover={btn.glow}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {btn.label}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SECONDARY BUTTONS */}
      <motion.div {...fadeUp} style={{ marginBottom: SPACING.section }}>
        <div style={{ marginBottom: SPACING.heading }}>
          <p 
            className="tracking-[0.5em] uppercase"
            style={{ 
              fontSize: TYPOGRAPHY.overline.size,
              color: COLORS.ash,
            }}
          >
            Secondary ÔÇö Border Glow
          </p>
          <p 
            className="leading-relaxed"
            style={{ 
              fontSize: TYPOGRAPHY.small.size,
              color: COLORS.concrete,
              marginTop: "16px",
            }}
          >
            Ikincil eylem. Seffaf arka plan, hover'da border glow.
          </p>
        </div>

        <div
          className="rounded-xl"
          style={{ 
            backgroundColor: COLORS.slate,
            padding: "clamp(40px, 6vw, 80px)",
          }}
        >
          <div className="flex flex-wrap gap-8 items-center justify-center">
            {SECONDARY_BUTTONS.map((btn) => (
              <motion.div
                key={btn.label}
                className="w-36 h-36 rounded-xl flex items-center justify-center cursor-pointer font-medium"
                style={{
                  backgroundColor: "transparent",
                  color: btn.color,
                  border: btn.border,
                  fontSize: TYPOGRAPHY.small.size,
                }}
                whileHover={btn.glow}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {btn.label}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* TEXT BUTTONS */}
      <motion.div {...fadeUp} style={{ marginBottom: SPACING.section }}>
        <div style={{ marginBottom: SPACING.heading }}>
          <p 
            className="tracking-[0.5em] uppercase"
            style={{ 
              fontSize: TYPOGRAPHY.overline.size,
              color: COLORS.ash,
            }}
          >
            Text ÔÇö Minimal
          </p>
          <p 
            className="leading-relaxed"
            style={{ 
              fontSize: TYPOGRAPHY.small.size,
              color: COLORS.concrete,
              marginTop: "16px",
            }}
          >
            Border yok, dolgu yok. Hover arka plan hafifce belirir.
          </p>
        </div>

        <div
          className="rounded-xl"
          style={{ 
            backgroundColor: COLORS.slate,
            padding: "clamp(40px, 6vw, 80px)",
          }}
        >
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center">
            {TEXT_BUTTONS.map((btn) => (
              <motion.button
                key={btn.label}
                whileHover={{ backgroundColor: btn.hoverBg }}
                className="px-5 py-2.5 rounded-md font-medium cursor-pointer transition-all duration-200"
                style={{ 
                  color: btn.color, 
                  backgroundColor: "transparent",
                  fontSize: TYPOGRAPHY.small.size,
                }}
              >
                {btn.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* TOOLBAR */}
      <motion.div {...fadeUp}>
        <div style={{ marginBottom: SPACING.heading }}>
          <p 
            className="tracking-[0.5em] uppercase"
            style={{ 
              fontSize: TYPOGRAPHY.overline.size,
              color: COLORS.ash,
            }}
          >
            Toolbar ÔÇö Grup
          </p>
          <p 
            className="leading-relaxed"
            style={{ 
              fontSize: TYPOGRAPHY.small.size,
              color: COLORS.concrete,
              marginTop: "16px",
            }}
          >
            Birlesmis buton grubu. Terminal/Nautilus headerbar stili.
          </p>
        </div>

        <div
          className="rounded-xl"
          style={{ 
            backgroundColor: COLORS.slate,
            padding: "clamp(40px, 6vw, 80px)",
          }}
        >
          <div className="flex flex-col gap-10 items-center justify-center">
            {/* Segmented group */}
            <div
              className="inline-flex max-w-full rounded-lg overflow-x-auto"
              style={{ border: `1px solid ${COLORS.ash}` }}
            >
              {TOOLBAR_TABS.map((tab, i) => (
                <button
                  key={tab}
                  className="px-6 py-3 font-medium transition-colors duration-200 hover:bg-[rgba(255,255,255,0.06)]"
                  style={{ 
                    fontSize: TYPOGRAPHY.small.size,
                    color: i === 0 ? COLORS.snow : COLORS.concrete,
                    backgroundColor: i === 0 ? "rgba(255,255,255,0.06)" : "transparent",
                    borderLeft: i > 0 ? `1px solid ${COLORS.ash}` : "none",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Header bar style */}
            <div
              className="inline-flex gap-px rounded-lg overflow-hidden"
              style={{ backgroundColor: COLORS.ash }}
            >
              <button
                className="px-5 py-2.5 font-medium transition-colors duration-200 hover:bg-[var(--slate)]"
                style={{ 
                  backgroundColor: COLORS.carbon, 
                  color: COLORS.snow,
                  fontSize: "12px",
                }}
              >
                Grid
              </button>
              <button
                className="px-5 py-2.5 font-medium transition-colors duration-200 hover:bg-[var(--slate)]"
                style={{ 
                  backgroundColor: COLORS.carbon, 
                  color: COLORS.concrete,
                  fontSize: "12px",
                }}
              >
                Liste
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}