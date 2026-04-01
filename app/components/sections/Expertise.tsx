"use client";

import { motion } from "framer-motion";
import { COLORS, TYPOGRAPHY, ANIMATION, SPACING, staggerContainer, staggerItem } from "@/app/lib/design-tokens";
import Container from "@/app/components/ui/Container";

/* ═══════════════════════════════════════════════════════════════
   Sn. 03 — UZMANLIK (Expertise)
   
   φ-zigzag 2×2 grid:
   Satır 1: 61.8% sol + 38.2% sağ
   Satır 2: 38.2% sol + 61.8% sağ
   
   Göz Z-pattern yerine φ-zigzag takip eder.
   Her kart: carbon bg, glassBorder, hover → frost + lampSubtle glow.
   ═══════════════════════════════════════════════════════════════ */

const EXPERTISE = [
  {
    title: "Marka Algısı & Strateji",
    description:
      "Müşterinin zihnindeki görüntüyü anlamak ve tutarlı hale getirmek. GSC verisi, müşteri dili, rakip analizi.",
  },
  {
    title: "SEO & Dijital Görünürlük",
    description:
      "Google, Bing, Yandex. Schema, i18n, LLMs.txt. Bulunabilirlik mühendisliği.",
  },
  {
    title: "E-Ticaret & Marketplace",
    description:
      "Hepsiburada, Trendyol, İkas, WooCommerce. Ürün optimizasyonu, katalog sistemleri, satış stratejisi.",
  },
  {
    title: "Web Tasarım & Geliştirme",
    description:
      "WordPress'ten Next.js'e. Performans, çok dilli yapılar, online kataloglar, uçtan uca geliştirme.",
  },
] as const;

/**
 * φ-zigzag row pattern:
 * Row 0 → [61.8%, 38.2%]
 * Row 1 → [38.2%, 61.8%]
 */
const PHI_PATTERN = [
  ["61.8%", "38.2%"],
  ["38.2%", "61.8%"],
] as const;

export default function Expertise() {
  return (
    <section
      style={{
        backgroundColor: COLORS.obsidian,
        paddingTop: SPACING.section,
        paddingBottom: SPACING.section,
      }}
    >
      <Container>
        {/* Overline */}
        <motion.span
          className="block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION.duration.normal }}
          style={{
            ...TYPOGRAPHY.overline,
            color: COLORS.ash,
            marginBottom: SPACING.element,
          }}
        >
          03 — uzmanlık
        </motion.span>

        {/* φ-zigzag grid */}
        <motion.div
          {...staggerContainer}
          className="flex flex-col"
          style={{ gap: SPACING.inner }}
        >
          {/* Row 0: [61.8%, 38.2%] */}
          <div
            className="flex flex-col md:flex-row"
            style={{ gap: SPACING.inner }}
          >
            <ExpertiseCard
              item={EXPERTISE[0]}
              flexBasis={PHI_PATTERN[0][0]}
              index={0}
            />
            <ExpertiseCard
              item={EXPERTISE[1]}
              flexBasis={PHI_PATTERN[0][1]}
              index={1}
            />
          </div>

          {/* Row 1: [38.2%, 61.8%] — zigzag */}
          <div
            className="flex flex-col md:flex-row"
            style={{ gap: SPACING.inner }}
          >
            <ExpertiseCard
              item={EXPERTISE[2]}
              flexBasis={PHI_PATTERN[1][0]}
              index={2}
            />
            <ExpertiseCard
              item={EXPERTISE[3]}
              flexBasis={PHI_PATTERN[1][1]}
              index={3}
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ─── Expertise Card ─── */

function ExpertiseCard({
  item,
  flexBasis,
  index,
}: {
  item: (typeof EXPERTISE)[number];
  flexBasis: string;
  index: number;
}) {
  return (
    <motion.div
      {...staggerItem}
      transition={{
        ...staggerItem.transition,
        delay: index * 0.1,
      }}
      className="group relative md:flex-none"
      style={{
        flexBasis,
        backgroundColor: COLORS.carbon,
        border: `1px solid ${COLORS.glassBorder}`,
        borderRadius: "2px",
        padding: SPACING.element,
        transition: "background-color 0.5s, border-color 0.5s, box-shadow 0.5s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.backgroundColor = COLORS.slate;
        el.style.borderColor = COLORS.frost.medium;
        el.style.boxShadow = "0 0 40px rgba(255, 255, 255, 0.05)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.backgroundColor = COLORS.carbon;
        el.style.borderColor = COLORS.glassBorder;
        el.style.boxShadow = "none";
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "1px",
          backgroundColor: COLORS.ash,
          transition: "background-color 0.5s",
        }}
      />

      {/* Title */}
      <h3
        style={{
          ...TYPOGRAPHY.h3,
          color: COLORS.chalk,
          margin: 0,
          marginBottom: SPACING.inner,
        }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p
        style={{
          ...TYPOGRAPHY.body,
          color: COLORS.concrete,
          margin: 0,
        }}
      >
        {item.description}
      </p>
    </motion.div>
  );
}
