/**
 * i18n Configuration — Single Source of Truth
 * 
 * Desteklenen diller, varsayılan dil ve yardımcı fonksiyonlar.
 * Yeni dil eklemek: LOCALES array'ine ekle + dictionary oluştur.
 */

export const LOCALES = ["tr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "tr";

/** Dil adı eşlemeleri (kendi dilinde) */
export const LOCALE_NAMES: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
};

/** Verilen string'in desteklenen bir locale olup olmadığını kontrol eder */
export function hasLocale(locale: string): locale is Locale {
  return (LOCALES as readonly string[]).includes(locale);
}
