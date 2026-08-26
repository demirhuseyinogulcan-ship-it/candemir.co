"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { COLORS, SPACING, staggerContainer, staggerItem } from "@/app/lib/design-tokens";
import { SECTION_PATHS, SERVICES } from "@/app/lib/constants";
import Container from "@/app/components/ui/Container";
import PathHeader from "@/app/components/ui/PathHeader";

/* ═══════════════════════════════════════════════════════════════
   Sn. 03 — HİZMETLER (Bento Grid)

   Resend / Linear / Vercel kart dilinden esinlenildi:
   - Tek piksel "hairline" border
   - Hover'da mouse'u takip eden radyal parlaklık
   - Hover'da border'ın brightening → premium dokunuş
   - 2x2 grid (mobile: tek sütun)
   - Her kart: index numerası · ikon · başlık · özet · CTA
   ═══════════════════════════════════════════════════════════════ */

const SERVICE_PROJECT_MAP: Record<string, string> = {
  "web-development": "alya",
  seo: "gamzetango",
  photography: "alya",
  ecommerce: "alya",
};

const CARD_CONTENT: Record<
  string,
  {
    tr: { title: string; summary: string };
    en: { title: string; summary: string };
  }
> = {
  "web-development": {
    tr: {
      title: "Web Geliştirme",
      summary:
        "Hızlı, çok dilli, SEO uyumlu web sistemleri. Kartvizit değil, iş üreten altyapılar.",
    },
    en: {
      title: "Web Development",
      summary:
        "Fast, multilingual, SEO-ready web systems. Not business cards — revenue infrastructure.",
    },
  },
  seo: {
    tr: {
      title: "SEO & Dijital Görünürlük",
      summary:
        "Google'da bulunabilir olmanızı sağlıyorum. Veriyle konuşan, sahadan gelen strateji.",
    },
    en: {
      title: "SEO & Digital Visibility",
      summary:
        "Making sure you're found on Google. Data-driven strategy from the field.",
    },
  },
  photography: {
    tr: {
      title: "Endüstriyel Fotoğrafçılık",
      summary:
        "Ürünlerinizi gerçek haliyle, profesyonel kalitede görüntülüyorum. Stock değil, orijinal.",
    },
    en: {
      title: "Industrial Photography",
      summary: "Your products, shot as they really are. Original, not stock.",
    },
  },
  ecommerce: {
    tr: {
      title: "E-Ticaret & Marketplace",
      summary:
        "Marketplace'lerde ve kendi sitenizde satış altyapısı. Katalogdan dönüşüme.",
    },
    en: {
      title: "E-Commerce & Marketplace",
      summary:
        "Sales infrastructure on marketplaces and your own site. From catalog to conversion.",
    },
  },
};

/* Monoline ikonlar — currentColor → renk hover ile değişebilir */
function Icon({ slug }: { slug: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (slug) {
    case "web-development":
      return (
        <svg {...common}>
          <polyline points="8 6 2 12 8 18" />
          <polyline points="16 6 22 12 16 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      );
    case "seo":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
      );
    case "photography":
      return (
        <svg {...common}>
          <path d="M3 7h3l2-2h8l2 2h3v12H3z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    case "ecommerce":
      return (
        <svg {...common}>
          <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6" />
          <circle cx="10" cy="20" r="1.2" />
          <circle cx="17" cy="20" r="1.2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Expertise() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const totalLabel = String(SERVICES.length).padStart(2, "0");

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
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            gap: "clamp(12px, 1vw, 16px)",
          }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.slug}
              slug={service.slug}
              index={i}
              total={totalLabel}
              locale={locale}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* ─── Bento Service Card ─── */

function ServiceCard({
  slug,
  index,
  total,
  locale,
}: {
  slug: string;
  index: number;
  total: string;
  locale: string;
}) {
  const content = CARD_CONTENT[slug]?.[locale as "tr" | "en"];
  const projectId = SERVICE_PROJECT_MAP[slug] ?? "alya";
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  if (!content) return null;

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const glow = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, var(--interaction-glow), transparent 65%)`;

  return (
    <motion.div
      {...staggerItem}
      transition={{ ...staggerItem.transition, delay: index * 0.06 }}
      className="relative"
    >
      <Link
        href={`/${locale}/work/${projectId}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative block h-full overflow-hidden"
        style={{
          backgroundColor: COLORS.obsidian,
          border: `1px solid ${hovered ? "var(--interaction-border)" : COLORS.glassBorder}`,
          borderRadius: "8px",
          padding: "clamp(20px, 2vw, 32px)",
          textDecoration: "none",
          minHeight: "clamp(200px, 22vw, 260px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition:
            "border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s",
        }}
      >
        {/* Mouse-tracked radial glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: glow, opacity: hovered ? 1 : 0, transition: "opacity 0.4s" }}
        />

        {/* Top row: index · icon */}
        <div className="relative flex items-start justify-between" style={{ marginBottom: SPACING.heading }}>
          <span
            className="font-mono"
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: COLORS.ash,
              textTransform: "uppercase",
            }}
          >
            {String(index + 1).padStart(2, "0")} / {total}
          </span>
          <span
            className="group-hover:!text-snow"
            style={{ color: COLORS.concrete, transition: "color 0.4s", display: "block" }}
          >
            <Icon slug={slug} />
          </span>
        </div>

        {/* Body: title + summary */}
        <div className="relative">
          <h3
            className="group-hover:!text-chalk"
            style={{
              fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
              fontWeight: 500,
              letterSpacing: "-0.015em",
              lineHeight: 1.25,
              color: COLORS.snow,
              margin: 0,
              marginBottom: SPACING.atom,
              transition: "color 0.4s",
            }}
          >
            {content.title}
          </h3>
          <p
            style={{
              fontSize: "clamp(13px, 0.95vw, 14px)",
              fontWeight: 400,
              lineHeight: 1.55,
              color: COLORS.concrete,
              margin: 0,
              maxWidth: "44ch",
            }}
          >
            {content.summary}
          </p>
        </div>

        {/* Footer: CTA arrow */}
        <div
          className="relative flex items-center"
          style={{ gap: SPACING.atom, marginTop: SPACING.element }}
        >
          <span
            className="group-hover:!text-snow"
            style={{
              fontSize: "12px",
              color: COLORS.ash,
              transition: "color 0.3s",
              letterSpacing: "0.04em",
            }}
          >
            {locale === "tr" ? "Detayları gör" : "View details"}
          </span>
          <span
            className="group-hover:translate-x-1 group-hover:!text-snow"
            style={{
              fontSize: "13px",
              color: COLORS.ash,
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s",
              display: "inline-block",
            }}
          >
            &rarr;
          </span>
        </div>

        {/* Top hairline accent — animates on hover */}
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 group-hover:w-full"
          style={{
            height: "1px",
            width: "0%",
            background: `linear-gradient(90deg, ${COLORS.snow}, transparent)`,
            opacity: 0.5,
            transition: "width 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </Link>
    </motion.div>
  );
}
