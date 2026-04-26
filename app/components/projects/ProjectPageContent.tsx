"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { COLORS, SPACING, ANIMATION } from "@/app/lib/design-tokens";
import { PROJECTS } from "@/app/lib/constants";
import Container from "@/app/components/ui/Container";
import DeviceMockup from "@/app/components/projects/DeviceMockup";

/* ═══════════════════════════════════════════════════════════════
   ProjectPageContent — Sinematik Case Study

   1. Cinematic Hero  — Tam ekran 21:9, letterbox barları animasyonla
                        iniyor, metadata barların içinde beliriyor
                        (anasayfadaki CinematicProjectCard ile aynı dil)
   2. Başlık + Metadata — barlardan sonra fade-in
   3. Açıklama bloğu  — φ split
   4. Video           — (varsa) lazy load
   5. Galeri           — (varsa) 2-kolon grid
   6. Sonraki Proje   — circular navigation
   ═══════════════════════════════════════════════════════════════ */

const BAR_HEIGHT = 12; // % — letterbox bar yüksekliği
const TOTAL = PROJECTS.length;

interface ProjectData {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly category: string;
  readonly year: string;
  readonly stack: readonly string[];
  readonly description: string;
  readonly story?: string;
  readonly image: string | null;
  readonly imagePosition?: string;
  readonly gallery: readonly string[];
  readonly video: string | null;
  readonly mockupScreenshot?: string | null;
  readonly mockupVideos?: readonly string[];
  readonly url: string | null;
  readonly metrics: {
    readonly languages: number;
    readonly products: number;
    readonly schemas: number;
  } | null;
}

export default function ProjectPageContent({
  project,
  locale,
}: {
  project: ProjectData;
  locale: string;
}) {
  const [barsActive, setBarsActive] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hiResLoaded, setHiResLoaded] = useState(false);

  // Sonraki proje (circular)
  const currentIdx = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  // Sayfa yüklenince → barlar iniyor
  useEffect(() => {
    const timer = setTimeout(() => setBarsActive(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Arka planda orijinal kalitede görseli yükle
  useEffect(() => {
    if (!project.image || !imageLoaded) return;
    const img = new window.Image();
    img.src = project.image;
    img.onload = () => setHiResLoaded(true);
  }, [project.image, imageLoaded]);

  return (
    <main style={{ backgroundColor: COLORS.void }}>
      {/* ─── 1. Cinematic Hero — Full Viewport ─── */}
      <section>
        {/* Full-viewport hero frame — header üstüne binecek şekilde */}
        <div
          className="relative overflow-hidden"
          style={{
            height: "100vh",
            backgroundColor: COLORS.void,
          }}
        >
          {/* Görsel */}
          {project.image ? (
            <>
              {!imageLoaded && <div className="absolute inset-0 image-shimmer" />}
              {/* 1. katman — Next.js optimize (hızlı yükleme) */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="absolute inset-0"
                style={{
                  objectFit: "cover",
                  objectPosition: project.imagePosition ?? "center",
                  opacity: imageLoaded ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
                sizes="100vw"
                quality={95}
                priority
                onLoad={() => setImageLoaded(true)}
              />
              {/* 2. katman — Orijinal kalite (arka planda yüklenir, yüklenince üste çıkar) */}
              {hiResLoaded && (
                <img
                  src={project.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full"
                  style={{
                    objectFit: "cover",
                    objectPosition: project.imagePosition ?? "center",
                    opacity: 1,
                    animation: "fadeIn 0.4s ease",
                    zIndex: 1,
                  }}
                />
              )}
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
                {project.title}
              </span>
            </div>
          )}

          {/* ── Üst letterbox bar ── */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-[4]"
            style={{ backgroundColor: COLORS.void }}
            animate={{ height: barsActive ? `${BAR_HEIGHT}%` : "0%" }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* ── Alt letterbox bar ── */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-[4]"
            style={{ backgroundColor: COLORS.void }}
            animate={{ height: barsActive ? `${BAR_HEIGHT}%` : "0%" }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        {/* ── Başlık + Metadata + Açıklama — tek kompakt blok ── */}
        <Container>
          <motion.div
            style={{ marginTop: SPACING.element }}
            animate={{ opacity: barsActive ? 1 : 0, y: barsActive ? 0 : 20 }}
            transition={{ duration: 0.8, delay: barsActive ? 1.2 : 0, ease: ANIMATION.ease }}
          >
            {/* Metadata satırı */}
            <div
              className="flex items-center flex-wrap"
              style={{
                gap: "clamp(12px, 2vw, 24px)",
                marginBottom: "clamp(16px, 2vw, 24px)",
              }}
            >
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: "clamp(9px, 1vw, 11px)",
                  letterSpacing: "0.2em",
                  color: COLORS.ash,
                }}
              >
                PRJ — {project.number}/{String(TOTAL).padStart(2, "0")}
              </span>
              <span
                style={{
                  width: "1px",
                  height: "12px",
                  backgroundColor: COLORS.glassBorder,
                }}
              />
              <span
                className="font-mono"
                style={{
                  fontSize: "clamp(9px, 1vw, 11px)",
                  color: COLORS.concrete,
                }}
              >
                {project.category}
              </span>
              <span
                style={{
                  width: "1px",
                  height: "12px",
                  backgroundColor: COLORS.glassBorder,
                }}
              />
              <span
                className="font-mono"
                style={{
                  fontSize: "clamp(9px, 1vw, 11px)",
                  color: COLORS.concrete,
                }}
              >
                {project.year}
              </span>
            </div>

            {/* Proje başlığı */}
            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: COLORS.chalk,
                margin: 0,
                marginBottom: "clamp(20px, 3vw, 36px)",
              }}
            >
              {project.title}
            </h1>

            {project.story && (
              <div
                style={{
                  marginTop: "clamp(8px, 1.6vw, 16px)",
                  maxWidth: "64ch",
                }}
              >
                {project.story.split("\n\n").map((paragraph) => (
                  <p
                    key={paragraph}
                    style={{
                      fontSize: "clamp(0.98rem, 1.3vw, 1.1rem)",
                      fontWeight: 300,
                      lineHeight: 1.9,
                      color: COLORS.snow,
                      margin: 0,
                      marginBottom: "clamp(18px, 2.2vw, 24px)",
                      opacity: 0.8,
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </motion.div>
        </Container>
      </section>

      {/* ─── 2. Video ─── */}
      {project.video && (
        <section style={{ paddingTop: SPACING.block, paddingBottom: SPACING.block }}>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: ANIMATION.duration.slow,
                ease: ANIMATION.ease,
              }}
            >
              <LazyVideo src={project.video} title={project.title} />
            </motion.div>
          </Container>
        </section>
      )}

      {/* ─── 3. Device Mockup ─── */}
      {(project.mockupScreenshot || (project.mockupVideos && project.mockupVideos.length > 0)) && (
        <section style={{ paddingTop: SPACING.block, paddingBottom: SPACING.block }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: ANIMATION.duration.slow,
              ease: ANIMATION.ease,
            }}
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 clamp(16px, 4vw, 48px)",
            }}
          >
            <DeviceMockup
              screenshot={project.mockupScreenshot ?? undefined}
              videos={project.mockupVideos ? [...project.mockupVideos] : undefined}
              alt={`${project.title} — site preview`}
            />
          </motion.div>
        </section>
      )}

      {/* ─── 4. Galeri ─── */}
      {project.gallery.length > 0 && (
        <section style={{ paddingBottom: SPACING.block }}>
          <Container>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: SPACING.inner }}
            >
              {project.gallery.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: ANIMATION.duration.normal,
                    delay: (i % 2) * 0.1,
                    ease: ANIMATION.ease,
                  }}
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: "16/10",
                    borderRadius: "2px",
                    border: `1px solid ${COLORS.glassBorder}`,
                  }}
                >
                  <Image
                    src={src}
                    alt={`${project.title} — ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ─── 5. Sonraki Proje ─── */}
      <section
        style={{
          paddingTop: SPACING.section,
          paddingBottom: SPACING.section,
          borderTop: `1px solid ${COLORS.glassBorder}`,
        }}
      >
        <Container>
          <Link
            href={`/${locale}/work/${nextProject.id}`}
            className="group block"
            style={{ textDecoration: "none" }}
          >
            <span
              className="font-mono uppercase"
              style={{
                fontSize: "clamp(9px, 1vw, 11px)",
                letterSpacing: "0.2em",
                color: COLORS.ash,
                display: "block",
                marginBottom: "16px",
              }}
            >
              {locale === "tr" ? "Sonraki Proje" : "Next Project"}
            </span>
            <div className="flex items-baseline justify-between">
              <h2
                className="group-hover:!text-[#FAFAFA]"
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: COLORS.concrete,
                  margin: 0,
                  transition:
                    "color 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {nextProject.title}
              </h2>
              <span
                className="group-hover:translate-x-2 group-hover:!text-[#F0F0F0]"
                style={{
                  fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                  color: COLORS.ash,
                  transition:
                    "color 0.4s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "inline-block",
                }}
              >
                &rarr;
              </span>
            </div>
          </Link>
        </Container>
      </section>
    </main>
  );
}

/* ─── Lazy Video — IntersectionObserver ile sadece görünürken yükle ─── */

function LazyVideo({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        aspectRatio: "16/9",
        backgroundColor: COLORS.carbon,
        borderRadius: "2px",
        border: `1px solid ${COLORS.glassBorder}`,
        overflow: "hidden",
      }}
    >
      {isVisible && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full"
          style={{ objectFit: "cover" }}
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
