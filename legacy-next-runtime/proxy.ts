import { NextResponse, type NextRequest } from "next/server";

const LEGACY_LOCALES = new Set(["de", "ru", "bg", "vi", "tr", "ar", "fr", "es", "it", "pl", "uk", "fa", "zh", "ko"]);
const ENGLISH_INDEXABLE_PATHS = new Set([
  "/en",
  "/en/regensburg/cleaning",
  "/en/regensburg/office-cleaning",
  "/en/regensburg/apartment-cleaning",
  "/en/regensburg/deep-cleaning",
  "/en/regensburg/move-out-cleaning",
  "/en/regensburg/stairwell-cleaning",
  "/en/regensburg/cleaning-quote-review",
  "/en/regensburg/moving",
  "/en/regensburg/moving-company",
  "/en/regensburg/moving-costs",
  "/en/regensburg/house-clearance",
  "/en/regensburg/apartment-clearance",
  "/en/regensburg/cleaning-after-moving",
  "/en/regensburg/moving-quote-review",
]);
const GERMAN_PATH_CHARS: Record<string, string> = {
  "\u00e4": "ae",
  "\u00f6": "oe",
  "\u00fc": "ue",
  "\u00c4": "ae",
  "\u00d6": "oe",
  "\u00dc": "ue",
  "\u00df": "ss",
};

const DUESSELDORF_FORBIDDEN_SERVICE_TERMS = [
  "umzug",
  "umzugs",
  "bueroumzug",
  "transport",
  "kleintransport",
  "klaviertransport",
  "halteverbotszone",
  "beiladung",
  "rueckfahrt",
  "leerfahrt",
  "seniorenumzug",
  "studentenumzug",
  "entruempelung",
  "haushaltsaufloesung",
  "wohnungsaufloesung",
];

const OUT_OF_AREA_CLEANING_PLACES = [
  "duesseldorf",
  "koeln",
  "neuss",
  "meerbusch",
  "duisburg",
  "ratingen",
  "hilden",
  "krefeld",
  "moenchengladbach",
];

const CLEANING_SERVICE_TERMS = [
  "reinigung",
  "cleaning",
  "cleaner",
  "bueroreinigung",
  "office-cleaning",
  "apartment-cleaning",
  "deep-cleaning",
  "move-out-cleaning",
  "stairwell-cleaning",
  "cleaning-quote-review",
  "gewerbereinigung",
  "praxisreinigung",
  "fensterreinigung",
  "grundreinigung",
  "treppenhausreinigung",
];

const DUESSELDORF_ALLOWED_SERVICE_PATHS = new Set([
  "/duesseldorf/umzug",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/fensterreinigung",
  "/duesseldorf/grundreinigung",
  "/duesseldorf/unterhaltsreinigung",
  "/duesseldorf/baureinigung",
]);

function normalizeGermanPath(pathname: string) {
  let decodedPathname = pathname;

  try {
    decodedPathname = decodeURI(pathname);
  } catch {
    decodedPathname = pathname;
  }

  return decodedPathname.replace(/[\u00e4\u00f6\u00fc\u00c4\u00d6\u00dc\u00df]/g, (char) => GERMAN_PATH_CHARS[char] || char);
}

function stripLegacyLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  if (firstSegment && LEGACY_LOCALES.has(firstSegment)) {
    return `/${segments.slice(1).join("/")}`.replace(/\/$/, "") || "/";
  }

  return pathname;
}

function normalizePolicyCandidate(pathname: string) {
  return normalizeGermanPath(pathname).toLowerCase().replace(/\/$/, "") || "/";
}

function isIndexableEnglishPath(pathname: string) {
  return ENGLISH_INDEXABLE_PATHS.has(normalizePolicyCandidate(pathname));
}

function getPolicyPathname(pathname: string) {
  const policyPathname = stripLegacyLocale(normalizeGermanPath(pathname)).toLowerCase();
  return policyPathname.replace(/\/$/, "") || "/";
}

function isForbiddenDuesseldorfSignal(pathname: string) {
  if (!pathname.includes("duesseldorf")) return false;
  if (DUESSELDORF_ALLOWED_SERVICE_PATHS.has(pathname)) return false;

  return DUESSELDORF_FORBIDDEN_SERVICE_TERMS.some((term) => pathname.includes(term));
}

function isOutOfAreaCleaningSignal(pathname: string) {
  if (DUESSELDORF_ALLOWED_SERVICE_PATHS.has(pathname)) return false;

  return OUT_OF_AREA_CLEANING_PLACES.some((place) => pathname.includes(place))
    && CLEANING_SERVICE_TERMS.some((term) => pathname.includes(term));
}

function redirectToPath(req: NextRequest, pathname: string) {
  const url = req.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  return NextResponse.redirect(url, 308);
}

function rewriteGone(req: NextRequest, reason: string) {
  const url = req.nextUrl.clone();
  url.pathname = "/seo-gone";
  url.search = "";
  url.searchParams.set("reason", reason);
  return NextResponse.rewrite(url);
}

/**
 * Minimal proxy for FLOXANT Premium OS.
 * German pages stay root-first; selected real English pages keep /en.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Pass-through for static assets and API.
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // 2. Hard policy: historic non-canonical Dusseldorf moving signals should
  // leave Google's index; new /duesseldorf/... service pages are allowed.
  const policyPathname = getPolicyPathname(pathname);

  if (policyPathname === "/duesseldorf/umzug") {
    return rewriteGone(req, "duesseldorf-retired-moving-route");
  }

  if (isOutOfAreaCleaningSignal(policyPathname)) {
    return redirectToPath(req, "/duesseldorf");
  }

  if (isForbiddenDuesseldorfSignal(policyPathname)) {
    return rewriteGone(req, "duesseldorf-forbidden-moving-signal");
  }

  // 3. Root priority with a small allowlist for real English SEO pages.
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  if (firstSegment === "en") {
    if (isIndexableEnglishPath(pathname)) {
      return NextResponse.next();
    }

    const url = req.nextUrl.clone();
    const rest = segments.slice(1).join("/");
    url.pathname = normalizeGermanPath(rest ? `/${rest}` : "/");
    return NextResponse.redirect(url, 308);
  }

  if (firstSegment && LEGACY_LOCALES.has(firstSegment)) {
    const url = req.nextUrl.clone();
    const rest = segments.slice(1).join("/");
    url.pathname = normalizeGermanPath(rest ? `/${rest}` : "/");
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

export default proxy;

export const config = {
  // Keep the proxy off every canonical public page. It is reserved for rare,
  // non-canonical legacy URLs that cannot be represented as a finite redirect
  // list without losing the existing URL-normalization/410 policy.
  matcher: [
    "/:locale(de|ru|bg|vi|tr|ar|fr|es|it|pl|uk|fa|zh|ko)/:path*",
    "/((?=.*[äöüÄÖÜß]).*)",
    "/((?=.*duesseldorf)(?=.*(?:umzug|umzugs|bueroumzug|transport|kleintransport|klaviertransport|halteverbotszone|beiladung|rueckfahrt|leerfahrt|seniorenumzug|studentenumzug|entruempelung|haushaltsaufloesung|wohnungsaufloesung)).*)",
    "/((?!(?:duesseldorf/(?:reinigung|bueroreinigung|gewerbereinigung|praxisreinigung|fensterreinigung|grundreinigung|unterhaltsreinigung|baureinigung))/?$)(?=.*(?:duesseldorf|koeln|neuss|meerbusch|duisburg|ratingen|hilden|krefeld|moenchengladbach))(?=.*(?:reinigung|cleaning|cleaner|bueroreinigung|office-cleaning|apartment-cleaning|deep-cleaning|move-out-cleaning|stairwell-cleaning|cleaning-quote-review|gewerbereinigung|praxisreinigung|fensterreinigung|grundreinigung|unterhaltsreinigung|baureinigung|bauendreinigung|treppenhausreinigung)).*)",
  ],
};
