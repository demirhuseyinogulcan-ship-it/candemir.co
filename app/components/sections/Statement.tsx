"use client";

import { motion } from "framer-motion";
import { COLORS, TYPOGRAPHY, ANIMATION, SPACING, fadeUp } from "@/app/lib/design-tokens";
import Container from "@/app/components/ui/Container";

/* ═══════════════════════════════════════════════════════════════
   Sn. 01 — STATEMENT (Köprü)
   
   Hero'daki manifestoyu genişletir.
   "Neyi buluyorsun?" sorusuna cevap verir.
   
   Layout: φ-split — 61.8% sol (büyük metin) / 38.2% sağ (destek)
   ═══════════════════════════════════════════════════════════════ */

export default function Statement() {
  return (
    <section
      style={{
        backgroundColor: COLORS.obsidian,
        paddingTop: SPACING.section,
        paddingBottom: SPACING.section,
      }}
    >
      <Container>
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
          01
        </motion.span>

        {/* φ-split layout */}
        <div
          className="flex flex-col lg:flex-row"
          style={{ gap: SPACING.element }}
        >
          {/* Sol — 61.8% — Büyük statement */}
          <motion.div
            {...fadeUp}
            className="lg:flex-none"
            style={{ flexBasis: "61.8%" }}
          >
            <h2
              style={{
                ...TYPOGRAPHY.h2,
                color: COLORS.chalk,
                margin: 0,
              }}
            >
              Bir şirket harika ürünler satıp
              <br />
              dijitalde{" "}
              <span style={{ color: COLORS.concrete }}>
                nalbur gibi görünüyorsa
              </span>
              {" "}—
              <br />
              orada bir kopukluk var.
            </h2>
          </motion.div>

          {/* Sağ — 38.2% — Destekleyici metin */}
          <motion.div
            {...fadeUp}
            transition={{
              ...fadeUp.transition,
              delay: 0.15,
            }}
            className="lg:flex-none"
            style={{ flexBasis: "38.2%" }}
          >
            <p
              style={{
                ...TYPOGRAPHY.body,
                color: COLORS.concrete,
                margin: 0,
              }}
            >
              Sahayı okurum, müşteriyi dinlerim, veriyi incelerim.
              Şirketin gerçekte ne olduğu ile dışarıdan nasıl göründüğü
              arasındaki boşluğu bulurum — sonra onu kapatırım.
            </p>
            <p
              style={{
                ...TYPOGRAPHY.body,
                color: COLORS.ash,
                margin: 0,
                marginTop: SPACING.inner,
              }}
            >
              Satıştan markaya, SEO{"\u2019"}dan ürün fotoğrafına
              kadar uçtan uca.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
