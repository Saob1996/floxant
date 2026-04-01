import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const locales = [
  "de","en","ar","tr","ru","uk","pl","ro","bg",
  "es","fr","it","fa","zh","vi","ko","ja"
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ROOT → redirect
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/de", request.url));
  }

  // VALID LOCALE → allow
  const isValidLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` ||
      pathname.startsWith(`/${locale}/`)
  );

  if (isValidLocale) {
    return NextResponse.next();
  }

  // ALLES ANDERE → NICHT redirecten!
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};