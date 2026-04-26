import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, LOCALES } from "@/app/lib/i18n/config";
import { getDictionary } from "@/app/lib/i18n/dictionaries";
import { generatePersonSchema, generateWebSiteSchema, safeJsonLd } from "@/app/lib/seo/schemas";
import SmoothScroll from "@/app/components/scroll/SmoothScroll";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import ErrorBoundary from "@/app/components/ui/ErrorBoundary";
import PageTransition from "@/app/components/ui/PageTransition";

/**
 * Static params — build zamanında desteklenen locale'leri üret.
 */
export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * Dynamic metadata — locale'e göre title, description, OG oluştur.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};

  const dict = await getDictionary(locale);

  return {
    title: dict.site.title,
    description: dict.site.description,
    metadataBase: new URL("https://candemir.co"),
    openGraph: {
      title: dict.site.title,
      description: dict.site.description,
      url: `https://candemir.co/${locale}`,
      siteName: dict.site.name,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.site.title,
      description: dict.site.description,
    },
    alternates: {
      canonical: `https://candemir.co/${locale}`,
      languages: {
        tr: "https://candemir.co/tr",
        en: "https://candemir.co/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const personSchema = generatePersonSchema(locale);
  const webSiteSchema = generateWebSiteSchema(locale);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(webSiteSchema) }}
      />

      <SmoothScroll>

        <Header />
        <ErrorBoundary>
          <PageTransition>
            {children}
          </PageTransition>
        </ErrorBoundary>
        <Footer />
      </SmoothScroll>
    </>
  );
}
