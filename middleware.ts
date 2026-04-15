import { NextResponse, type NextRequest } from "next/server";
import { i18n } from "./i18n-config";

/**
 * High-Performance Proxy — Germany-First SEO Architecture (Next.js 16)
 * - Native Web-APIs ONLY (zero external deps)
 * - Seamless [de, en, ru] routing with DE as default
 * - Redirects unlocalized paths to /de/ for SEO hygiene
 */
export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Faster static skipping using native string methods
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // Catch all file extensions like .ico, .jpg, etc.
  ) {
    return NextResponse.next();
  }

  // ROOT path strategy: Default to DE
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${i18n.defaultLocale}`, req.url));
  }

  // Check if path already has a valid locale prefix
  const hasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no locale detected, redirect to /de/ prefix for SEO consistency
  if (!hasLocale) {
    return NextResponse.redirect(
      new URL(`/${i18n.defaultLocale}${pathname}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
