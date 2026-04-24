import { NextResponse, type NextRequest } from "next/server";

const LEGACY_LOCALES = new Set(["de", "en", "ru", "bg"]);
const GERMAN_PATH_CHARS: Record<string, string> = {
 ä: "ae",
 ö: "oe",
 ü: "ue",
 Ä: "ae",
 Ö: "oe",
 Ü: "ue",
 ß: "ss",
};

function normalizeGermanPath(pathname: string) {
 let decodedPathname = pathname;

 try {
  decodedPathname = decodeURI(pathname);
 } catch {
  decodedPathname = pathname;
 }

 return decodedPathname.replace(/[äöüÄÖÜß]/g, (char) => GERMAN_PATH_CHARS[char] || char);
}

/**
 * Minimal Middleware for FLOXANT Premium OS.
 * Locale detection is DISABLED. 
 * Root architecture is strictly enforced.
 */
export default function middleware(req: NextRequest) {
 const { pathname } = req.nextUrl;

 // 1. Pass-through for static assets and API
 if (
  pathname.startsWith("/_next") ||
  pathname.startsWith("/api") ||
  pathname.includes(".")
 ) {
  return NextResponse.next();
 }

 // 2. Absolute Root Priority: no locale folders, no Unicode URL variants.
 const segments = pathname.split("/").filter(Boolean);
 const firstSegment = segments[0];

 if (firstSegment && LEGACY_LOCALES.has(firstSegment)) {
  const url = req.nextUrl.clone();
  const rest = segments.slice(1).join("/");
  url.pathname = rest ? `/${rest}` : "/";
  return NextResponse.redirect(url, 308);
 }

 const normalizedPathname = normalizeGermanPath(pathname);

 if (normalizedPathname !== pathname) {
  const url = req.nextUrl.clone();
  url.pathname = normalizedPathname;
  return NextResponse.redirect(url, 308);
 }

 return NextResponse.next();
}

export const config = {
 matcher: ["/((?!_next|api|favicon.ico).*)"],
};
