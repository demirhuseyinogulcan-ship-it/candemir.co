/**
 * SectionHeader Component
 * 
 * Tutarlı section başlıkları — number, title, description.
 * Behance case study formatı.
 */

"use client";

import { motion } from "framer-motion";
import { SPACING, COLORS, TYPOGRAPHY, fadeUp } from "@/app/lib/design-tokens";

interface SectionHeaderProps {
  /** Section numarası (01, 02, vb.) */
  number: string;
  /** Ana başlık */
  title: string;
  /** Açıklama metni (opsiyonel) */
  description?: string;
  /** Alt başlık arası boşluk */
  spacing?: keyof typeof SPACING;
}

export default function SectionHeader({
  number,
  title,
  description,
  spacing = "element",
}: SectionHeaderProps) {
  return (
    <motion.header 
      {...fadeUp}
      style={{ marginBottom: SPACING[spacing] }}
    >
      {/* Overline — Section Number */}
      <p
        style={{
          fontSize: TYPOGRAPHY.overline.size,
          fontWeight: TYPOGRAPHY.overline.weight,
          letterSpacing: TYPOGRAPHY.overline.letterSpacing,
          textTransform: TYPOGRAPHY.overline.textTransform,
          color: COLORS.ash,
          marginBottom: SPACING.inner,
        }}
      >
        {number}
      </p>
      
      {/* Title */}
      <h2
        style={{
          fontSize: TYPOGRAPHY.h1.size,
          fontWeight: TYPOGRAPHY.h1.weight,
          lineHeight: TYPOGRAPHY.h1.lineHeight,
          letterSpacing: TYPOGRAPHY.h1.letterSpacing,
          color: COLORS.snow,
        }}
      >
        {title}
      </h2>
      
      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: TYPOGRAPHY.body.size,
            fontWeight: TYPOGRAPHY.body.weight,
            lineHeight: TYPOGRAPHY.body.lineHeight,
            color: COLORS.concrete,
            marginTop: SPACING.heading,
            maxWidth: "540px",
          }}
        >
          {description}
        </p>
      )}
    </motion.header>
  );
}
