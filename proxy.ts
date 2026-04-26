import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, hasLocale } from "@/app/lib/i18n/config";

/**
 * Proxy — Locale Detection & Redirect
 * 
 * Next.js 16'da middleware yerine proxy kullanılır.
 * Gelen istekte locale yoksa default locale'e yönlendirir.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pathname'de desteklenen bir locale var mı kontrol et
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Cookie'den locale tercihini al
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && hasLocale(cookieLocale)) {
    request.nextUrl.pathname = `/${cookieLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Accept-Language header'ından tespit et
  const acceptLang = request.headers.get("accept-language") || "";
  const detectedLocale = LOCALES.find((locale) =>
    acceptLang.toLowerCase().includes(locale)
  );

  const locale = detectedLocale || DEFAULT_LOCALE;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Static dosyalar, API route'ları ve _next'i atla
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|images|videos|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|mp4|webm|woff2?)$).*)",
  ],
};
