/**
 * Section Component
 * 
 * Full-width section wrapper with vertical rhythm.
 * Behance-style generous spacing.
 */

import { ReactNode } from "react";
import { SPACING, COLORS } from "@/app/lib/design-tokens";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Section öncesi boşluk tipi */
  spacingTop?: keyof typeof SPACING | "none";
  /** Section sonrası boşluk tipi */
  spacingBottom?: keyof typeof SPACING | "none";
  /** Arka plan rengi */
  background?: keyof typeof COLORS | "transparent";
}

export default function Section({ 
  children, 
  id,
  className = "",
  spacingTop = "none",
  spacingBottom = "section",
  background = "transparent",
}: SectionProps) {
  const paddingTop = spacingTop === "none" ? "0" : SPACING[spacingTop];
  const paddingBottom = spacingBottom === "none" ? "0" : SPACING[spacingBottom];
  
  const bgColor = background === "transparent" 
    ? "transparent" 
    : COLORS[background as keyof typeof COLORS] as string;

  return (
    <section
      id={id}
      className={className}
      style={{
        width: "100%",
        paddingTop,
        paddingBottom,
        backgroundColor: bgColor,
      }}
    >
      {children}
    </section>
  );
}
