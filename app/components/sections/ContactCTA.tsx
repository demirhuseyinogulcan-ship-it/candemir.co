"use client";

import { motion } from "framer-motion";
import { COLORS, TYPOGRAPHY, SPACING, fadeUp } from "@/app/lib/design-tokens";
import { SECTION_PATHS, SOCIAL_LINKS, SITE_META } from "@/app/lib/constants";
import Container from "@/app/components/ui/Container";
import PathHeader from "@/app/components/ui/PathHeader";

/* ═══════════════════════════════════════════════════════════════
   ~/candemir/signal/ — İletişim CTA
   
   Manifestoya geri dönüş — son replik.
   Full viewport, merkeze hizalı.
   H2 + ince çizgi + e-posta + social row.
   ═══════════════════════════════════════════════════════════════ */

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="flex items-center justify-center"
      style={{
        backgroundColor: COLORS.void,
        minHeight: "61.8vh",
        paddingTop: SPACING.section,
        paddingBottom: SPACING.section,
      }}
    >
      <Container className="flex flex-col items-center text-center">
        <PathHeader
          path={SECTION_PATHS.contact}
          title="İletişim"
        />

        {/* Divider */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          style={{
            width: "48px",
            height: "1px",
            backgroundColor: COLORS.ash,
            marginTop: SPACING.heading,
            marginBottom: SPACING.heading,
          }}
        />

        {/* Email */}
        <motion.a
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.25 }}
          href={`mailto:${SITE_META.email}`}
          className="group"
          style={{
            ...TYPOGRAPHY.body,
            color: COLORS.chalk,
            textDecoration: "none",
            transition: "color 0.4s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = COLORS.mist;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = COLORS.chalk;
          }}
        >
          {SITE_META.email}
        </motion.a>

        {/* Social links */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.35 }}
          className="flex items-center"
          style={{ gap: "24px", marginTop: SPACING.element }}
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="transition-colors duration-300"
              style={{ color: COLORS.ash }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = COLORS.snow;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = COLORS.ash;
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                dangerouslySetInnerHTML={{ __html: link.svg }}
              />
            </a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
