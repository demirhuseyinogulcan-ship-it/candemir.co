"use client";

import { motion } from "framer-motion";
import { COLORS, TYPOGRAPHY, ANIMATION, SPACING, fadeUp } from "@/app/lib/design-tokens";

/* ═══════════════════════════════════════════════════════════════
   Sn. 05 — İLETİŞİM CTA (Contact)
   
   Manifestoya geri dönüş — son replik.
   Full viewport, merkeze hizalı.
   H2 + ince çizgi + e-posta (lamp accent).
   ═══════════════════════════════════════════════════════════════ */

export default function ContactCTA() {
  return (
    <section
      className="flex items-center justify-center"
      style={{
        backgroundColor: COLORS.void,
        minHeight: "61.8vh",
        paddingTop: SPACING.section,
        paddingBottom: SPACING.section,
      }}
    >
      <div className="flex flex-col items-center text-center">
        {/* Overline */}
        <motion.span
          {...fadeUp}
          className="block"
          style={{
            ...TYPOGRAPHY.overline,
            color: COLORS.ash,
            marginBottom: SPACING.heading,
          }}
        >
          05
        </motion.span>

        {/* CTA Headline */}
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          style={{
            ...TYPOGRAPHY.h2,
            color: COLORS.chalk,
            margin: 0,
          }}
        >
          Let{"\u2019"}s build what{"\u2019"}s missing.
        </motion.h2>

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
          href="mailto:hey@candemir.co"
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
          hey@candemir.co
        </motion.a>
      </div>
    </section>
  );
}
