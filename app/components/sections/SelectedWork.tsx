"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { COLORS, TYPOGRAPHY, ANIMATION, SPACING, fadeUp } from "@/app/lib/design-tokens";
import { PROJECTS } from "@/app/lib/constants";
import Container from "@/app/components/ui/Container";

/* ═══════════════════════════════════════════════════════════════
   Sn. 04 — SEÇİLİ İŞLER (Selected Work)
   
   φ-zigzag alternating layout:
   Tek index → görsel sol, metin sağ
   Çift index → metin sol, görsel sağ
   
   Görsel yüksekliği: 61.8vh (100vh / φ)
   Görsel/metin oranı: 61.8% / 38.2%
   Projeler arası: ince gradient divider
   ═══════════════════════════════════════════════════════════════ */

export default function SelectedWork() {
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
          04 — seçili işler
        </motion.span>

        {/* Project list */}
        <div className="flex flex-col" style={{ gap: SPACING.section }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── Project Card ─── */

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.article
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: index * 0.05 }}
    >
      {/* Divider line (not before first) */}
      {index > 0 && (
        <div
          style={{
            width: "100%",
            height: "1px",
            marginBottom: SPACING.section,
            background: `linear-gradient(90deg, transparent 0%, ${COLORS.glassBorder} 20%, ${COLORS.glassBorder} 80%, transparent 100%)`,
          }}
        />
      )}

      <div
        className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}
        style={{ gap: SPACING.element, alignItems: "center" }}
      >
        {/* Image — 61.8% */}
        <div
          className="w-full lg:flex-none overflow-hidden"
          style={{
            flexBasis: "61.8%",
            borderRadius: "2px",
            backgroundColor: COLORS.carbon,
            border: `1px solid ${COLORS.glassBorder}`,
          }}
        >
          {project.image ? (
            <div
              className="relative w-full overflow-hidden group"
              style={{ height: "clamp(280px, 38.2vh, 520px)" }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 61.8vw"
              />
              {/* Subtle vignette overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(to top, ${COLORS.void}33 0%, transparent 40%)`,
                }}
              />
            </div>
          ) : (
            /* Placeholder for projects without image (e.g. this site) */
            <div
              className="flex items-center justify-center"
              style={{
                height: "clamp(280px, 38.2vh, 520px)",
                backgroundColor: COLORS.obsidian,
              }}
            >
              <span
                style={{
                  ...TYPOGRAPHY.overline,
                  color: COLORS.ash,
                }}
              >
                {project.id === "candemir" ? "you\u2019re looking at it" : "yakında"}
              </span>
            </div>
          )}
        </div>

        {/* Text — 38.2% */}
        <div
          className="w-full lg:flex-none flex flex-col justify-center"
          style={{ flexBasis: "38.2%" }}
        >
          {/* Project number */}
          <span
            style={{
              ...TYPOGRAPHY.overline,
              color: COLORS.ash,
              marginBottom: SPACING.inner,
            }}
          >
            {project.number}
          </span>

          {/* Title */}
          <h3
            style={{
              ...TYPOGRAPHY.h3,
              color: COLORS.chalk,
              margin: 0,
              marginBottom: "8px",
            }}
          >
            {project.title}
          </h3>

          {/* Category + Year */}
          <span
            style={{
              ...TYPOGRAPHY.small,
              color: COLORS.concrete,
              marginBottom: SPACING.inner,
            }}
          >
            {project.category} · {project.year}
          </span>

          {/* Description */}
          <p
            style={{
              ...TYPOGRAPHY.body,
              color: COLORS.concrete,
              margin: 0,
            }}
          >
            {project.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
