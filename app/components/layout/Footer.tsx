"use client";

import { usePathname } from "next/navigation";
import { COLORS, SPACING } from "@/app/lib/design-tokens";
import GlitchBrand from "@/app/components/brand/GlitchBrand";
import Container from "@/app/components/ui/Container";

/*
   Footer - Minimal Alt Bilgi

   Tum sayfalarda layout seviyesinde gorunur.
*/

export default function Footer() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "tr";

  return (
    <footer
      className="site-footer"
      style={{
        backgroundColor: COLORS.void,
        borderTop: `1px solid ${COLORS.glassBorder}`,
        paddingTop: SPACING.element,
        paddingBottom: SPACING.element,
      }}
    >
      <Container className="text-center">
        <GlitchBrand href={`/${locale}`} />
      </Container>
    </footer>
  );
}
