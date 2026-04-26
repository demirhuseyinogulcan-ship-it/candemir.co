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
          style={{
            fontSize: "13px",
            color: COLORS.concrete,
          }}
        >
          {SITE_META.name}
        </p>
      </Container>
    </footer>
  );
}
