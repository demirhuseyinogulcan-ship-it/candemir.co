import { COLORS, SPACING } from "@/app/lib/design-tokens";
import { SITE_META } from "@/app/lib/constants";
import Container from "@/app/components/ui/Container";

/* ═══════════════════════════════════════════════════════════════
   Footer — Minimal Alt Bilgi
   
   Tüm sayfalarda layout seviyesinde görünür.
   Server Component — no "use client" needed.
   ═══════════════════════════════════════════════════════════════ */

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: COLORS.void,
        borderTop: `1px solid ${COLORS.glassBorder}`,
        paddingTop: SPACING.element,
        paddingBottom: SPACING.element,
      }}
    >
      <Container className="text-center">
        <p
          className="tracking-[0.3em]"
          style={{ fontSize: "11px", color: COLORS.ash }}
        >
          Istanbul, Turkey
        </p>
        <p
          style={{
            fontSize: "13px",
            color: COLORS.concrete,
            marginTop: SPACING.heading,
          }}
        >
          {SITE_META.name} — {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
}
