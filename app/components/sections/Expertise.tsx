"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COLORS, TYPOGRAPHY, SPACING, ANIMATION, staggerContainer, staggerItem } from "@/app/lib/design-tokens";
import { SECTION_PATHS, SERVICES, PROJECTS } from "@/app/lib/constants";
import Container from "@/app/components/ui/Container";
import PathHeader from "@/app/components/ui/PathHeader";

/* ═══════════════════════════════════════════════════════════════
   Sn. 03 — HİZMETLER (Services)
   
   Sinematik kartlar, φ-zigzag grid.
   Her kart: başlık + açıklama + ince çizgi vurgusu
   Link → ilgili projeye yönlendirir (servis sayfası yok)
   ═══════════════════════════════════════════════════════════════ */

/** φ-zigzag: Row 0 → [61.8%, 38.2%], Row 1 → [38.2%, 61.8%] */
const PHI_PATTERN = [
  ["61.8%", "38.2%"],
  ["38.2%", "61.8%"],
] as const;

/** Service slug → related project id */
const SERVICE_PROJECT_MAP: Record<string, string> = {
  "web-development": "alya",
  seo: "gamzetango",
  photography: "alya",
  ecommerce: "alya",
};

/** Title + summary per slug, localized */
const CARD_CONTENT: Record<string, { tr: { title: string; summary: string }; en: { title: string; summary: string } }> = {
  "web-development": {
    tr: { title: "Web Geliştirme", summary: "Hızlı, çok dilli, SEO uyumlu web sistemleri. Kartvizit değil, iş üreten altyapılar." },
    en: { title: "Web Development", summary: "Fast, multilingual, SEO-ready web systems. Not business cards — revenue infrastructure." },
  },
  seo: {
    tr: { title: "SEO & Dijital Görünürlük", summary: "Google'da bulunabilir olmanızı sağlıyorum. Veriyle konuşan, sahadan gelen strateji." },
    en: { title: "SEO & Digital Visibility", summary: "Making sure you're found on Google. Data-driven strategy from the field." },
  },
  photography: {
    tr: { title: "Endüstriyel Fotoğrafçılık", summary: "Ürünlerinizi gerçek haliyle, profesyonel kalitede görüntülüyorum. Stock değil, orijinal." },
    en: { title: "Industrial Photography", summary: "Your products, shot as they really are. Original, not stock." },
  },
  ecommerce: {
    tr: { title: "E-Ticaret & Marketplace", summary: "Marketplace'lerde ve kendi sitenizde satış altyapısı. Katalogdan dönüşüme." },
    en: { title: "E-Commerce & Marketplace", summary: "Sales infrastructure on marketplaces and your own site. From catalog to conversion." },
  },
};

export default function Expertise() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";

  return (
    <section
      id="expertise"
      style={{
        backgroundColor: COLORS.void,
        paddingTop: SPACING.section,
        paddingBottom: SPACING.section,
      }}
    >
      <Container>
        <PathHeader
          path={SECTION_PATHS.services}
          title={locale === "tr" ? "Hizmetler" : "Services"}
        />

        <motion.div
          {...staggerContainer}
          className="flex flex-col"
          style={{ gap: SPACING.inner }}
        >
          {/* Row 0: [61.8%, 38.2%] */}
          <div className="flex flex-col md:flex-row" style={{ gap: SPACING.inner }}>
            <ServiceCard slug={SERVICES[0].slug} flexBasis={PHI_PATTERN[0][0]} index={0} locale={locale} />
            <ServiceCard slug={SERVICES[1].slug} flexBasis={PHI_PATTERN[0][1]} index={1} locale={locale} />
          </div>

          {/* Row 1: [38.2%, 61.8%] — zigzag */}
          <div className="flex flex-col md:flex-row" style={{ gap: SPACING.inner }}>
            <ServiceCard slug={SERVICES[2].slug} flexBasis={PHI_PATTERN[1][0]} index={2} locale={locale} />
            <ServiceCard slug={SERVICES[3].slug} flexBasis={PHI_PATTERN[1][1]} index={3} locale={locale} />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ─── Service Card — Sinematik Kart ─── */

function ServiceCard({
  slug,
  flexBasis,
  index,
  locale,
}: {
  slug: string;
  flexBasis: string;
  index: number;
  locale: string;
}) {
  const content = CARD_CONTENT[slug]?.[locale as "tr" | "en"] ?? CARD_CONTENT[slug]?.tr;
  if (!content) return null;

  const projectId = SERVICE_PROJECT_MAP[slug] ?? "alya";

  return (
    <motion.div
      {...staggerItem}
      transition={{ ...staggerItem.transition, delay: index * 0.1 }}
      className="group relative md:flex-none"
      style={{ flexBasis }}
    >
      <Link
        href={`/${locale}/work/${projectId}`}
        className="block relative overflow-hidden"
        style={{
          backgroundColor: COLORS.void,
          border: `1px solid ${COLORS.glassBorder}`,
          borderRadius: "2px",
          padding: `${SPACING.element} ${SPACING.element}`,
          textDecoration: "none",
          minHeight: "clamp(200px, 22vw, 320px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          transition: "border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = COLORS.ash;
          el.style.transform = "scale(1.01)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = COLORS.glassBorder;
          el.style.transform = "scale(1)";
        }}
      >
        {/* Top accent line — animates width on hover */}
        <div
          className="absolute top-0 left-0 group-hover:w-full"
          style={{
            height: "1px",
            width: "0%",
            backgroundColor: COLORS.lamp.dim,
            transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Title + Summary + Arrow */}
        <div>
          <h3
            className="group-hover:!text-[#FAFAFA]"
            style={{
              fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: COLORS.snow,
              margin: 0,
              marginBottom: "clamp(12px, 1.5vw, 20px)",
              transition: "color 0.4s",
            }}
          >
            {content.title}
          </h3>

          <p
            style={{
              fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)",
              fontWeight: 400,
              lineHeight: 1.6,
              color: COLORS.concrete,
              margin: 0,
              maxWidth: "38ch",
              marginBottom: "clamp(16px, 2vw, 24px)",
            }}
          >
            {content.summary}
          </p>

          {/* Arrow line */}
          <div className="flex items-center gap-3">
            <div
              className="cta-line"
              style={{
                height: "1px",
                backgroundColor: COLORS.ash,
                transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s",
              }}
            />
            <span
              className="group-hover:!text-[#F0F0F0] group-hover:translate-x-1"
              style={{
                fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                color: COLORS.concrete,
                transition: "color 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                display: "inline-block",
              }}
            >
              &rarr;
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
