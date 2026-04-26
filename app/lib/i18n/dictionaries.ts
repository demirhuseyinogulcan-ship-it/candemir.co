import "server-only";
import type { Locale } from "./config";

/**
 * Dictionary Loader — Lazy import ile sadece gerekli dil yüklenir.
 * Server Component'lerde kullanılır, client bundle'a girmez.
 */
const dictionaries = {
  tr: () => import("./dictionaries/tr.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["tr"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
