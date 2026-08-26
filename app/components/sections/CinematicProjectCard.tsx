"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COLORS, TYPOGRAPHY, SPACING } from "@/app/lib/design-tokens";
import { PROJECTS } from "@/app/lib/constants";

/* ═══════════════════════════════════════════════════════════════
   CinematicProjectCard

   Design board'daki CinematicFrame'den türetildi.
   21:9 letterbox — viewport'a girince barlar iner,
   üst bar: proje no / toplam,
   alt bar: tech stack · yıl,
   altında: başlık + açıklama caption.
   ═══════════════════════════════════════════════════════════════ */

type Project = (typeof PROJECTS)[number];

const BAR_HEIGHT = 12; // %
const TOTAL = PROJECTS.length;

export default function CinematicProjectCard({
  project,
}: {
  project: Project;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-12% 0px -12% 0px" });
  const [barsActive, setBarsActive] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setBarsActive(true), 350);
      return () => clearTimeout(timer);
    } else {
      setBarsActive(false);
    }
  }, [isInView]);

  const barPercent = barsActive ? BAR_HEIGHT : 0;
  const objectPosition =
    "imagePosition" in project && project.imagePosition
      ? (project.imagePosition as string)
      : "center";

  return (
    <Link
      href={`/${locale}/work/${project.id}`}
      className="block group"
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <article ref={ref}>
        {/* Cinematic frame */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "21/9",
            backgroundColor: COLORS.void,
            borderRadius: "2px",
          }}
        >
          {/* Image or placeholder */}
          {project.image ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 image-shimmer" />
              )}
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 90vw"
                quality={95}
                className="absolute inset-0"
                style={{
                  objectFit: "cover",
                  objectPosition,
                  opacity: imageLoaded ? 1 : 0,
                  transform: isHovering ? "scale(1.015)" : "scale(1)",
                  transition: `transform ${isHovering ? "300ms" : "450ms"} cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease`,
                }}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
              />
            </>
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: COLORS.carbon }}
            >
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: "clamp(10px, 1.4vw, 14px)",
                  color: COLORS.ash,
                  letterSpacing: "0.25em",
                }}
              >
                you&apos;re looking at it
              </span>
            </div>
          )}

          {/* ── Top bar text ── */}
          <div
            className="absolute top-0 left-0 right-0 z-[5] flex items-center justify-between pointer-events-none"
            style={{ height: `${BAR_HEIGHT}%`, padding: "0 clamp(12px, 3vw, 24px)" }}
          >
            <motion.span
              className="font-mono uppercase"
              style={{
                fontSize: "clamp(8px, 1.2vw, 11px)",
                color: COLORS.snow,
                letterSpacing: "0.2em",
                textShadow: "0 1px 6px rgba(0,0,0,0.9)",
              }}
              animate={{ opacity: barsActive ? 0.9 : 0 }}
              transition={{ duration: 0.6, delay: barsActive ? 0.8 : 0 }}
            >
              PRJ — {project.number}/{String(TOTAL).padStart(2, "0")}
            </motion.span>
            <motion.span
              className="font-mono"
              style={{
                fontSize: "clamp(8px, 1.1vw, 10px)",
                color: COLORS.snow,
                textShadow: "0 1px 6px rgba(0,0,0,0.9)",
              }}
              animate={{ opacity: barsActive ? 0.75 : 0 }}
              transition={{ duration: 0.6, delay: barsActive ? 0.9 : 0 }}
            >
              {project.category}
            </motion.span>
          </div>

          {/* ── Bottom bar text — sadece yıl (stack etiketleri sade tutmak için kaldırıldı) ── */}
          <div
            className="absolute bottom-0 left-0 right-0 z-[5] flex items-center justify-end pointer-events-none"
            style={{ height: `${BAR_HEIGHT}%`, padding: "0 clamp(12px, 3vw, 24px)" }}
          >
            <motion.span
              className="font-mono"
              style={{
                fontSize: "clamp(8px, 1.1vw, 10px)",
                color: COLORS.concrete,
                textShadow: "0 1px 6px rgba(0,0,0,0.9)",
                letterSpacing: "0.08em",
              }}
              animate={{ opacity: barsActive ? 0.85 : 0 }}
              transition={{ duration: 0.6, delay: barsActive ? 1.0 : 0 }}
            >
              {project.year}
            </motion.span>
          </div>

          {/* ── Top letterbox bar ── */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-[4]"
            style={{ backgroundColor: COLORS.void }}
            animate={{ height: `${barPercent}%` }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* ── Bottom letterbox bar ── */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-[4]"
            style={{ backgroundColor: COLORS.void }}
            animate={{ height: `${barPercent}%` }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* ── Thin divider lines (bar/görsel sınırı, nötr gri) ── */}
          <motion.div
            className="absolute left-0 right-0 z-[6] pointer-events-none"
            style={{
              top: `${BAR_HEIGHT}%`,
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, var(--decorative-line) 20%, var(--decorative-line) 80%, transparent 100%)",
            }}
            animate={{ opacity: barsActive ? 0.5 : 0 }}
            transition={{ duration: 0.8, delay: barsActive ? 0.6 : 0 }}
          />
          <motion.div
            className="absolute left-0 right-0 z-[6] pointer-events-none"
            style={{
              bottom: `${BAR_HEIGHT}%`,
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, var(--decorative-line) 20%, var(--decorative-line) 80%, transparent 100%)",
            }}
            animate={{ opacity: barsActive ? 0.5 : 0 }}
            transition={{ duration: 0.8, delay: barsActive ? 0.6 : 0 }}
          />
        </div>

        {/* ── Caption: title + description ── */}
        <motion.div
          style={{ marginTop: SPACING.inner, maxWidth: "720px" }}
          animate={{ opacity: barsActive ? 1 : 0.3 }}
          transition={{ duration: 0.8, delay: barsActive ? 1.2 : 0 }}
        >
          <h3
            style={{
              ...TYPOGRAPHY.h3,
              color: COLORS.chalk,
              margin: 0,
              marginBottom: "6px",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              ...TYPOGRAPHY.body,
              color: COLORS.snow,
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            {project.description}
          </p>
          <span
            className="inline-block group-hover:translate-x-1"
            style={{
              marginTop: "12px",
              fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)",
              color: COLORS.concrete,
              transition: "color 0.3s, transform 0.3s",
            }}
          >
            {locale === "tr" ? "Detaylar" : "View project"} &rarr;
          </span>
        </motion.div>
      </article>
    </Link>
  );
}
