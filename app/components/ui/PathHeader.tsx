/**
 * PathHeader — Terminal Path Section Header
 * 
 * "01 — süreç" yerine "~/candemir/process/" gösterir.
 * Ziyaretçi bir siteyi "okumuyor", bir sistemi keşfediyor.
 * 
 * Monospace font, terminal estetiği, accessibility korunur.
 */

"use client";

import { motion } from "framer-motion";
import { SPACING, COLORS, TYPOGRAPHY, fadeUp } from "@/app/lib/design-tokens";

interface PathHeaderProps {
  /** Terminal path — e.g., "~/candemir/process/" */
  path: string;
  /** Section başlığı (accessibility + görsel) */
  title: string;
  /** Opsiyonel açıklama */
  description?: string;
  /** Alt boşluk spacing key'i */
  spacing?: keyof typeof SPACING;
}

export default function PathHeader({
  path,
  title,
  description,
  spacing = "element",
}: PathHeaderProps) {
  return (
    <motion.header
      {...fadeUp}
      style={{ marginBottom: SPACING[spacing] }}
      role="banner"
      aria-label={title}
    >
      {/* Terminal Path */}
      <p
        className="font-mono"
        style={{
          fontSize: TYPOGRAPHY.mono.size,
          letterSpacing: TYPOGRAPHY.mono.letterSpacing,
          color: COLORS.concrete,
          marginBottom: SPACING.inner,
        }}
      >
        <span style={{ color: COLORS.ash }}>$</span>{" "}
        <span style={{ color: COLORS.concrete }}>{path}</span>
      </p>

      {/* Title */}
      <h2
        style={{
          fontSize: "clamp(1.5rem, 2.8vw, 2.5rem)",
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
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
