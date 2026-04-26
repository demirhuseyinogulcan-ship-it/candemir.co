/**
 * SEO — JSON-LD Schema Generators
 * 
 * Structured data for search engines and AI.
 * Organization, WebSite, Person schemas.
 */

import type { Locale } from "@/app/lib/i18n/config";

const SITE_URL = "https://candemir.co";

/** Organization + Person schema — Can Demir kişisel marka */
export function generatePersonSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Can Demir",
    url: SITE_URL,
    jobTitle: locale === "tr"
      ? "Dijital Dönüşüm Stratejisti"
      : "Digital Transformation Strategist",
    description: locale === "tr"
      ? "Firmaların dijital varlığını büyüten, sahadan gelen stratejist. Web tasarım, SEO, e-ticaret ve marka fotoğrafçılığı."
      : "A field-born strategist growing the digital presence of industrial businesses. Web design, SEO, e-commerce, and brand photography.",
    sameAs: [
      "https://github.com/demirhuseyinogulcan-ship-it",
      "https://linkedin.com",
      "https://behance.net",
      "https://instagram.com",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Istanbul",
      addressCountry: "TR",
    },
    knowsAbout: [
      "Web Development",
      "Next.js",
      "SEO",
      "GEO",
      "B2B Digital Marketing",
      "Industrial Photography",
      "E-Commerce",
      "International Trade",
      "Logistics",
    ],
  };
}

/** WebSite schema — site search + metadata */
export function generateWebSiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Can Demir",
    alternateName: "candemir.co",
    url: SITE_URL,
    inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    description: locale === "tr"
      ? "Firmaların dijital varlığını büyüten, sahadan gelen stratejist."
      : "A field-born strategist growing the digital presence of industrial businesses.",
    author: {
      "@type": "Person",
      name: "Can Demir",
      url: SITE_URL,
    },
  };
}

/**
 * JSON-LD'yi güvenli şekilde render et.
 * XSS koruması: < karakterini unicode escape ile değiştir.
 */
export function safeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Service schema — her hizmet sayfası için */
export function generateServiceSchema(
  locale: Locale,
  service: {
    title: string;
    description: string;
    slug: string;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${SITE_URL}/${locale}/services/${service.slug}`,
    provider: {
      "@type": "Person",
      name: "Can Demir",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Turkey",
    },
    serviceType: service.title,
  };
}

/** BreadcrumbList schema — navigasyon yolu */
export function generateBreadcrumbSchema(
  locale: Locale,
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
