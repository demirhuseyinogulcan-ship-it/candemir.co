import type { MetadataRoute } from "next";
import { LOCALES } from "@/app/lib/i18n/config";
import { PROJECTS } from "@/app/lib/constants";

/**
 * Dynamic Sitemap — locale-aware URL generation.
 * Her dil için tüm sayfaların URL'lerini üretir.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://candemir.co";

  const routes = [""];
  const projectRoutes = PROJECTS.map((p) => `/work/${p.id}`);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
      });
    }

    for (const route of projectRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
