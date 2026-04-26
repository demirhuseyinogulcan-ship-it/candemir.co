import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/app/lib/constants";
import { LOCALES, hasLocale } from "@/app/lib/i18n/config";
import type { Locale } from "@/app/lib/i18n/config";
import {
  generateBreadcrumbSchema,
  safeJsonLd,
} from "@/app/lib/seo/schemas";
import { getDictionary } from "@/app/lib/i18n/dictionaries";
import ProjectPageContent from "@/app/components/projects/ProjectPageContent";

const VALID_IDS = PROJECTS.map((p) => p.id);

export async function generateStaticParams() {
  const params = [];
  for (const locale of LOCALES) {
    for (const project of PROJECTS) {
      params.push({ locale, id: project.id });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  if (!hasLocale(locale)) return {};

  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return {};

  const title = `${project.title} — Can Demir`;
  const description = project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://candemir.co/${locale}/work/${id}`,
      siteName: "Can Demir",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "article",
      ...(project.image ? { images: [{ url: project.image }] } : {}),
    },
    alternates: {
      canonical: `https://candemir.co/${locale}/work/${id}`,
      languages: {
        tr: `https://candemir.co/tr/work/${id}`,
        en: `https://candemir.co/en/work/${id}`,
      },
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  if (!hasLocale(locale)) notFound();
  if (!VALID_IDS.includes(id as (typeof VALID_IDS)[number])) notFound();

  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  const dict = await getDictionary(locale);

  const breadcrumbSchema = generateBreadcrumbSchema(locale as Locale, [
    { name: dict.site.name, url: `https://candemir.co/${locale}` },
    { name: locale === "tr" ? "Seçili İşler" : "Selected Work", url: `https://candemir.co/${locale}/#work` },
    { name: project.title, url: `https://candemir.co/${locale}/work/${id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
      />
      <ProjectPageContent project={project} locale={locale} />
    </>
  );
}
