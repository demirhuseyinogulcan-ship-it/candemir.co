/**
 * Divider Component
 * 
 * Görsel section ayırıcı — ince çizgi veya gradient fade.
 */

import { COLORS, SPACING } from "@/app/lib/design-tokens";

interface DividerProps {
  /** Ayırıcı tipi */
  variant?: "line" | "gradient" | "space";
  /** Dikey margin */
  spacing?: keyof typeof SPACING;
}

export default function Divider({
  variant = "line",
  spacing = "section",
}: DividerProps) {
  const marginY = SPACING[spacing];

  if (variant === "space") {
    return <div style={{ height: marginY }} />;
  }

  if (variant === "gradient") {
    return (
      <div
        style={{
          width: "100%",
          height: "1px",
          marginTop: marginY,
          marginBottom: marginY,
          background: `linear-gradient(90deg, transparent 0%, ${COLORS.glassBorder} 20%, ${COLORS.glassBorder} 80%, transparent 100%)`,
        }}
      />
    );
  }

  // Default: line
  return (
    <div
      style={{
        width: "100%",
        height: "1px",
        marginTop: marginY,
        marginBottom: marginY,
        backgroundColor: COLORS.glassBorder,
      }}
    />
  );
}
