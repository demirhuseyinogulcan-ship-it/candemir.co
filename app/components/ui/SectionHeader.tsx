/**
 * SectionHeader Component
 * 
 * Tutarl─▒ section ba┼şl─▒klar─▒ ÔÇö number, title, description.
 * Behance case study format─▒.
 */

"use client";

import { motion } from "framer-motion";
import { SPACING, COLORS, TYPOGRAPHY, fadeUp } from "@/app/lib/design-tokens";

interface SectionHeaderProps {
  /** Section numaras─▒ (01, 02, vb.) */
  number: string;
  /** Ana ba┼şl─▒k */
  title: string;
  /** A├ğ─▒klama metni (opsiyonel) */
  description?: string;
  /** Alt ba┼şl─▒k aras─▒ bo┼şluk */
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
      {/* Overline ÔÇö Section Number */}
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