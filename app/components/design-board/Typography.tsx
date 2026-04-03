"use client";

import { motion } from "framer-motion";
import { 
  SPACING, 
  ANIMATION, 
  COLORS, 
  TYPOGRAPHY as TYPE,
  fadeUp 
} from "@/app/lib/design-tokens";
import SectionHeader from "@/app/components/ui/SectionHeader";

// ============================================
// HIERARCHY DATA
// ============================================
const HIERARCHY = [
  {
    label: "H1 / Hero",
    style: {
      fontSize: TYPE.display.size,
      fontWeight: TYPE.display.weight,
      lineHeight: TYPE.display.lineHeight,
      letterSpacing: TYPE.display.letterSpacing,
    },
    example: "Can.",
  },
  {
    label: "H2 / Section",
    style: {
      fontSize: TYPE.h1.size,
      fontWeight: TYPE.h1.weight,
      lineHeight: TYPE.h1.lineHeight,
      letterSpacing: TYPE.h1.letterSpacing,
    },
    example: "Projeler",
  },
  {
    label: "H3 / Card",
    style: {
      fontSize: TYPE.h2.size,
      fontWeight: TYPE.h2.weight,
      lineHeight: TYPE.h2.lineHeight,
    },
    example: "Geometrik Kompozisyon",
  },
  {
    label: "H4 / Subtitle",
    style: {
      fontSize: TYPE.h3.size,
      fontWeight: TYPE.h3.weight,
      lineHeight: TYPE.h3.lineHeight,
    },
    example: "WebGL ile interaktif deneyimler",
  },
  {
    label: "Body",
    style: {
      fontSize: TYPE.body.size,
      fontWeight: TYPE.body.weight,
      lineHeight: TYPE.body.lineHeight,
    },
    example: "Dijital dunyada hikayeler anlatiyorum. Fotograf, kod ve 3D ile sinirlari zorlayan deneyimler yaratiyorum.",
  },
  {
    label: "Small",
    style: {
      fontSize: TYPE.small.size,
      fontWeight: TYPE.small.weight,
    },
    example: "Portfolyo ÔÇö 2026",
  },
  {
    label: "Overline",
    style: {
      fontSize: TYPE.overline.size,
      letterSpacing: TYPE.overline.letterSpacing,
      textTransform: TYPE.overline.textTransform,
    },
    example: "Hakkimda",
  },
] as const;

const RULES_FORBIDDEN = [
  "Emoji kullanimi",
  "Ikon kullanimi (SVG, FontAwesome vs.)",
  "Birden fazla font ailesi",
  "Italic stil",
  "Allcaps body text",
];

const RULES_ALLOWED = [
  "Sadece Neue Montreal (Regular, Medium, Bold)",
  "Ok karakteri: ÔåÆ",
  "Nokta vurgusu: Can.",
  "Buyuk bosluklar ile hiyerarsi",
  "Tracking ile vurgu (overline, label)",
];

// ============================================
// COMPONENT
// ============================================
export default function Typography() {
  return (
    <div>
      {/* Section Header */}
      <SectionHeader
        number="02"
        title="Tipografi"
        description="Neue Montreal. Tek font ailesi. Agirlik ve boyut ile hiyerarsi kurulur."
      />

      {/* FONT SPECIMEN */}
      <motion.div {...fadeUp} style={{ marginBottom: SPACING.section }}>
        <div
          className="rounded-2xl"
          style={{ 
            backgroundColor: COLORS.carbon,
            padding: "clamp(32px, 5vw, 80px)",
          }}
        >
          {/* Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-baseline md:justify-between" style={{ marginBottom: SPACING.heading }}>
            <p 
              className="tracking-[0.5em] uppercase"
              style={{ 
                fontSize: TYPE.overline.size,
                color: COLORS.ash,
              }}
            >
              Neue Montreal
            </p>
            <div className="flex gap-8" style={{ fontSize: TYPE.small.size, color: COLORS.concrete }}>
              <span className="font-normal">400</span>
              <span className="font-medium">500</span>
              <span className="font-bold">700</span>
            </div>
          </div>

          {/* Character set */}
          <p
            className="tracking-wide leading-relaxed"
            style={{ 
              fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
              color: COLORS.concrete,
            }}
          >
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </p>
          <p
            className="tracking-wide leading-relaxed"
            style={{ 
              fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
              color: COLORS.ash,
              marginTop: "16px",
            }}
          >
            abcdefghijklmnopqrstuvwxyz
          </p>
          <p
            className="tracking-wide leading-relaxed"
            style={{ 
              fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
              color: COLORS.ash,
              marginTop: "16px",
            }}
          >
            1234567890 !@#$%&amp;*()
          </p>
        </div>
      </motion.div>

      {/* HIERARCHY SYSTEM */}
      <div style={{ marginBottom: SPACING.section }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ 
            fontSize: TYPE.overline.size,
            color: COLORS.ash,
            marginBottom: SPACING.heading,
          }}
        >
          Hiyerarsi Sistemi
        </motion.p>

        <div>
          {HIERARCHY.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: ANIMATION.ease }}
              className="group"
              style={{ 
                borderBottom: `1px solid ${COLORS.glassBorder}`,
                padding: "clamp(32px, 4vw, 56px) 0",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-6 md:gap-0">
                {/* Label */}
                <div className="md:w-44 shrink-0">
                  <p
                    className="font-mono transition-colors duration-300 group-hover:text-[var(--snow)]"
                    style={{ 
                      fontSize: "11px",
                      color: COLORS.ash,
                    }}
                  >
                    {item.label}
                  </p>
                </div>
                
                {/* Example */}
                <div className="flex-1 overflow-hidden">
                  <p style={item.style}>{item.example}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RULES */}
      <motion.div {...fadeUp}>
        <p
          className="tracking-[0.5em] uppercase"
          style={{ 
            fontSize: TYPE.overline.size,
            color: COLORS.ash,
            marginBottom: SPACING.heading,
          }}
        >
          Kurallar
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Forbidden */}
          <div 
            className="rounded-2xl"
            style={{ 
              backgroundColor: COLORS.carbon,
              padding: "clamp(32px, 4vw, 48px)",
            }}
          >
            <p
              className="tracking-[0.4em] uppercase"
              style={{ 
                fontSize: "10px",
                color: COLORS.maroon.neon,
                marginBottom: SPACING.heading,
              }}
            >
              Yasak
            </p>
            <div className="space-y-4">
              {RULES_FORBIDDEN.map((rule) => (
                <p
                  key={rule}
                  className="leading-relaxed"
                  style={{ 
                    fontSize: TYPE.small.size,
                    color: COLORS.concrete,
                  }}
                >
                  {rule}
                </p>
              ))}
            </div>
          </div>

          {/* Allowed */}
          <div 
            className="rounded-2xl"
            style={{ 
              backgroundColor: COLORS.carbon,
              padding: "clamp(32px, 4vw, 48px)",
            }}
          >
            <p
              className="tracking-[0.4em] uppercase"
              style={{ 
                fontSize: "10px",
                color: COLORS.snow,
                marginBottom: SPACING.heading,
              }}
            >
              Izin Verilen
            </p>
            <div className="space-y-4">
              {RULES_ALLOWED.map((rule) => (
                <p
                  key={rule}
                  className="leading-relaxed"
                  style={{ 
                    fontSize: TYPE.small.size,
                    color: COLORS.concrete,
                  }}
                >
                  {rule}
                </p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}