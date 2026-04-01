"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { COLORS, TYPOGRAPHY, ANIMATION, SPACING, CONTAINER } from "@/app/lib/design-tokens";
import { GLITCH_PROCESS_WORDS } from "@/app/lib/constants";
import Container from "@/app/components/ui/Container";

/* ═══════════════════════════════════════════════════════════════
   Sn. 02 — SÜREÇ (Process Flow)
   
   GlitchBrand'daki 9 kelimeyi scroll-driven yatay akışa dönüştürür.
   Her kelime bir node — aralarında ince çizgi.
   Scroll ilerledikçe çizgi uzar, kelimeler sırayla aydınlanır.
   
   Alt metin hover'da veya aktif olduğunda görünür.
   ═══════════════════════════════════════════════════════════════ */

const PROCESS_DESCRIPTIONS: Record<string, string> = {
  discover: "İşi tanı, sektörü öğren",
  observe: "Müşteriyi dinle, veriyi oku",
  focus: "Asıl sorunu bul",
  think: "Stratejiyi kur",
  frame: "Hikayeyi çerçevele",
  design: "Algıyı tasarla",
  code: "Sistemi inşa et",
  launch: "Yayınla, ölç",
  grow: "Büyüt, otomatikleştir",
};

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: COLORS.obsidian,
        paddingTop: SPACING.block,
        paddingBottom: SPACING.section,
      }}
    >
      <Container>
        {/* Overline */}
        <motion.span
          className="block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION.duration.normal }}
          style={{
            ...TYPOGRAPHY.overline,
            color: COLORS.ash,
            marginBottom: SPACING.element,
          }}
        >
          02 — süreç
        </motion.span>

        {/* Process timeline */}
        <div className="relative" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
          {/* Background line (full width, dim) */}
          <div
            className="absolute left-0 right-0 hidden md:block"
            style={{
              top: "32px",
              height: "1px",
              backgroundColor: COLORS.slate,
            }}
          />

          {/* Progress line (scroll-driven) */}
          <motion.div
            className="absolute left-0 hidden md:block"
            style={{
              top: "32px",
              height: "1px",
              backgroundColor: COLORS.ash,
              scaleX: scrollYProgress,
              transformOrigin: "left",
              width: "100%",
            }}
          />

          {/* Nodes */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${GLITCH_PROCESS_WORDS.length}, 1fr)`,
              gap: "0",
            }}
          >
            {GLITCH_PROCESS_WORDS.map((word, i) => (
              <ProcessNode
                key={word}
                word={word}
                description={PROCESS_DESCRIPTIONS[word]}
                index={i}
                total={GLITCH_PROCESS_WORDS.length}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── Process Node ─── */

function ProcessNode({
  word,
  description,
  index,
  total,
  scrollProgress,
}: {
  word: string;
  description: string;
  index: number;
  total: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each node activates at its proportional scroll position
  const threshold = index / (total - 1);
  const isActive = useTransform(scrollProgress, (v) => v >= threshold - 0.02);

  return (
    <motion.div
      className="group flex flex-col items-center text-center relative"
      style={{ paddingTop: "16px" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: ANIMATION.duration.normal,
        delay: index * 0.08,
        ease: ANIMATION.ease,
      }}
    >
      {/* Dot node */}
      <motion.div
        className="hidden md:block"
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          backgroundColor: COLORS.ash,
          marginBottom: "16px",
          position: "absolute",
          top: "-8px",
          transition: "background-color 0.6s",
        }}
      />

      {/* Word */}
      <span
        className="block group-hover:!text-[#FAFAFA]"
        style={{
          ...TYPOGRAPHY.small,
          color: COLORS.concrete,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          transition: "color 0.4s",
          whiteSpace: "nowrap",
        }}
      >
        {word}
      </span>

      {/* Description — hover reveal */}
      <span
        className="block opacity-0 group-hover:opacity-100"
        style={{
          fontSize: "11px",
          color: COLORS.ash,
          marginTop: "8px",
          transition: "opacity 0.4s",
          lineHeight: 1.3,
          maxWidth: "120px",
        }}
      >
        {description}
      </span>
    </motion.div>
  );
}
