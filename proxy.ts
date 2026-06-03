import { NextResponse, type NextRequest } from "next/server";

const LEGACY_LOCALES = new Set(["de", "en", "ru", "bg", "vi", "tr"]);
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
  "wohnungsaufloesung",
];

const LEGACY_REGENSBURG_REDIRECTS: Record<string, string> = {
  "/umzug-regensburg": "/regensburg/umzug",
  "/entruempelung-regensburg": "/regensburg/entruempelung",
  "/wohnungsaufloesung-regensburg": "/regensburg/haushaltsaufloesung",
  "/umzug-reinigung-regensburg": "/regensburg/umzug-reinigung",
  "/endreinigung-regensburg": "/regensburg/endreinigung",
  "/schluesseluebergabe": "/regensburg/besenreine-uebergabe",

  "/reinigung-regensburg": "/regensburg/uebergabereinigung",
  "/gewerbereinigung-regensburg": "/regensburg/uebergabereinigung",
  "/bueroreinigung-regensburg": "/regensburg/uebergabereinigung",
  "/praxisreinigung-regensburg": "/regensburg/uebergabereinigung",
  "/hotelreinigung-regensburg": "/regensburg/uebergabereinigung",
  "/fensterreinigung-regensburg": "/regensburg/uebergabereinigung",
  "/baureinigung-regensburg": "/regensburg/endreinigung",
  "/teppichreinigung-regensburg": "/regensburg/endreinigung",
  "/treppenhausreinigung-regensburg": "/regensburg/besenreine-uebergabe",
  "/unterhaltsreinigung-regensburg": "/regensburg/uebergabereinigung",
  "/grundreinigung-regensburg": "/regensburg/endreinigung",

  "/blog/gewerbereinigung-regensburg-objekte-b2b": "/regensburg/uebergabereinigung",
  "/blog/bueroreinigung-regensburg-angebot-einholen": "/regensburg/uebergabereinigung",
  "/blog/hausverwaltung-treppenhausreinigung-regensburg": "/regensburg/besenreine-uebergabe",
  "/blog/unterhaltsreinigung-regensburg-buero-praxis-hotel": "/regensburg/uebergabereinigung",
  "/blog/reinigungsfirma-regensburg-buero-praxis-auswahl": "/regensburg/uebergabereinigung",
  "/blog/grosse-reinigungsauftraege-regensburg-buero-hotel-praxis": "/regensburg/uebergabereinigung",
  "/blog/endreinigung-regensburg-checkliste": "/regensburg/endreinigung",
  "/blog/umzug-mit-reinigung-regensburg": "/regensburg/umzug-reinigung",
};

const LEGACY_LOCAL_CLEANING_EXCEPTIONS = new Set([
  "/reinigung-moeblierte-wohnung-duesseldorf",
  "/reinigung-nach-veranstaltung",
  "/reinigung-preis-rechner",
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

function getPolicyPathname(pathname: string) {
  const policyPathname = stripLegacyLocale(normalizeGermanPath(pathname)).toLowerCase();
  return policyPathname.replace(/\/$/, "") || "/";
}

function isForbiddenDuesseldorfSignal(pathname: string) {
  if (!pathname.includes("duesseldorf")) return false;

  return DUESSELDORF_FORBIDDEN_SERVICE_TERMS.some((term) => pathname.includes(term));
}

function isLegacyLocalCleaningRoute(pathname: string) {
  return (
    /^\/reinigung-[a-z0-9-]+$/.test(pathname) &&
    !pathname.includes("duesseldorf") &&
    !LEGACY_LOCAL_CLEANING_EXCEPTIONS.has(pathname)
  );
}

function redirectTo(req: NextRequest, destination: string) {
  const url = req.nextUrl.clone();
  url.pathname = destination;
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
 * Root architecture is German-only, without legacy locale folders.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Pass-through for static assets and API.
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // 2. Hard policy: Dusseldorf is cleaning/disposal only. Historic moving
  // signals should leave Google's index instead of being redirected onward.
  const policyPathname = getPolicyPathname(pathname);

  if (isForbiddenDuesseldorfSignal(policyPathname)) {
    return rewriteGone(req, "duesseldorf-forbidden-moving-signal");
  }

  const legacyRegensburgDestination = LEGACY_REGENSBURG_REDIRECTS[policyPathname];

  if (legacyRegensburgDestination) {
    return redirectTo(req, legacyRegensburgDestination);
  }

  if (isLegacyLocalCleaningRoute(policyPathname)) {
    return redirectTo(req, "/regensburg/uebergabereinigung");
  }

  // 3. Absolute Root Priority: no locale folders, no Unicode URL variants.
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

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
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
