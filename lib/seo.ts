import type { Metadata, Viewport } from "next";
import { company } from "@/lib/company";
import { getCityGeoData } from "@/lib/geo-data";
import { germanizeText } from "@/lib/german-text";
import { getDominanceIntent, getDominanceSnippet } from "@/lib/seo-dominance";

const BASE_URL = company.url;
const OG_IMAGE = `${BASE_URL}/opengraph-image`;
const TWITTER_IMAGE = `${BASE_URL}/twitter-image`;
const SOCIAL_IMAGE_BASE = `${BASE_URL}/seo-image`;
const TITLE_LIMIT = 68;
const DESCRIPTION_LIMIT = 160;
const SIGNATURE_ROOT_SLUGS = new Set([
 "ritual-exit-box",
 "clean-start",
 "new-neighbour-kit",
 "first-48h",
 "buerokratie-schutz",
 "moebel-optimierung",
 "reinigungsgarantie",
 "lager-rotation",
 "kinder-umzugsbox",
 "24h-umzugsservice",
 "damen-team",
 "erinnerungskapsel",
 "vielleicht-box",
 "schluesseluebergabe",
]);
const PRIVATE_NOINDEX_PREFIXES = ["/api", "/admin", "/dashboard", "/login"];
const LOW_VALUE_NOINDEX_PREFIXES = ["/angebote", "/guenstig", "/feedback"];
const LEGACY_CANONICAL_PATHS: Record<string, string> = {
 "/villenservice": "/private-client-service",
};

type Locale = "de";

interface PageSEOInput {
 lang?: string;
 pageLocale?: string;
 locale?: string;
 path: string;
 title?: string;
 description?: string;
}

function normalizeText(value: string | undefined, fallback: string) {
 const raw = (value || "").trim();
 const normalized = raw || fallback;
 return germanizeText(normalized).replace(/\s+/g, " ").trim();
}

function trimTitle(title: string) {
 if (title.length <= TITLE_LIMIT) return title;
 const shortened = title.slice(0, TITLE_LIMIT - 1).replace(/\s+\S*$/, "").trim();
 return `${shortened || title.slice(0, TITLE_LIMIT - 1).trim()}…`;
}

function trimDescription(description: string) {
 if (description.length <= DESCRIPTION_LIMIT) return description;
 const shortened = description.slice(0, DESCRIPTION_LIMIT - 1).replace(/\s+\S*$/, "").trim();
 return `${shortened || description.slice(0, DESCRIPTION_LIMIT - 1).trim()}…`;
}

function resolveLocale(_input?: string): Locale {
 return "de";
}

function getDefaultTitle(_locale: Locale = "de") {
 return "FLOXANT Regensburg | Umzug, Reinigung & Entrümpelung";
}

function getDefaultDescription(_locale: Locale = "de") {
 return "Umzug, Reinigung, Entrümpelung und Büroumzug in Regensburg und Bayern: Preisrahmen online prüfen, Ablauf klären und direkt anfragen.";
}

function getOgLocale(_locale: Locale = "de") {
 return "de_DE";
}

function normalizePath(path: string) {
 if (!path) return "";
 const withoutParameters = path.split("#")[0].split("?")[0];
 const withoutLocale = withoutParameters
  .replace(/^\/+/, "")
  .replace(/\/+$/, "")
  .replace(/^(de|en|ru|bg)(\/|$)/, "");

 return withoutLocale ? `/${withoutLocale}` : "";
}

function resolveCanonicalPath(path: string) {
 if (!path) return "";

 if (LEGACY_CANONICAL_PATHS[path]) {
  return LEGACY_CANONICAL_PATHS[path];
 }

 const signatureMatch = path.match(/^\/signature\/([^/]+)$/);
 if (signatureMatch && SIGNATURE_ROOT_SLUGS.has(signatureMatch[1])) {
  return `/${signatureMatch[1]}`;
 }

 if (/^\/alternativen\/[^/]+$/.test(path)) {
  return "/alternativen";
 }

 if (/^\/(angebote|guenstig)\/[^/]+$/.test(path)) {
  return "/rechner";
 }

 return path;
}

function resolveSocialImagePath(path: string) {
 const route = path || "/";
 const exactProfiles: Record<string, string> = {
  "/": "floxant",
  "/buchung": "buchung",
  "/rechner": "rechner",
  "/umzug": "umzug",
  "/reinigung": "reinigung",
  "/gewerbereinigung-regensburg": "reinigung",
  "/entruempelung": "entruempelung",
  "/bueroumzug": "bueroumzug",
  "/firmenentsorgung": "firmenentsorgung",
  "/leerfahrt-rueckfahrt": "leerfahrt-rueckfahrt",
  "/private-client-service": "private-client-service",
  "/service-area-bayern": "service-area-bayern",
  "/qualitaet-ablauf": "qualitaet-ablauf",
  "/praxisfaelle": "praxisfaelle",
  "/kostenfaktoren": "kostenfaktoren",
  "/leistungen-vergleichen": "leistungen-vergleichen",
  "/anbieter-vergleichen": "anbieter-vergleichen",
  "/buchung-ablauf": "buchung-ablauf",
  "/kontakt": "kontakt",
  "/express-anfrage": "express-anfrage",
  "/anfrage-mit-preisrahmen": "anfrage-mit-preisrahmen",
  "/beiladung": "beiladung",
  "/umzug-mit-reinigung": "umzug-mit-reinigung",
  "/kleinmengen-entsorgung": "kleinmengen-entsorgung",
 };

 if (exactProfiles[route]) {
  return `${SOCIAL_IMAGE_BASE}/${exactProfiles[route]}`;
 }

 if (route.startsWith("/umzug-")) return `${SOCIAL_IMAGE_BASE}/umzug`;
 if (route.startsWith("/reinigung-")) return `${SOCIAL_IMAGE_BASE}/reinigung`;
 if (route.startsWith("/entruempelung-")) return `${SOCIAL_IMAGE_BASE}/entruempelung`;
 if (route.startsWith("/bueroumzug-")) return `${SOCIAL_IMAGE_BASE}/bueroumzug`;

 if (route.startsWith("/blog") || route.startsWith("/ratgeber")) {
  return OG_IMAGE;
 }

 return TWITTER_IMAGE;
}

function isPrivateRoute(path: string) {
 return PRIVATE_NOINDEX_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

function isLowValueRoute(path: string) {
 if (LOW_VALUE_NOINDEX_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) {
  return true;
 }

 if (/^\/alternativen\/[^/]+$/.test(path)) return true;
 if (/^\/signature\/[^/]+$/.test(path)) return true;

 return false;
}

function getMetadataKeywords(path: string, geoName?: string) {
 const keywords = new Set(["FLOXANT", "Regensburg", "Bayern"]);
 const route = path || "/";

 if (route.includes("reinigung")) keywords.add("Reinigung");
 if (route.includes("gewerbereinigung")) {
  keywords.add("Gewerbereinigung");
  keywords.add("Büroreinigung");
  keywords.add("Praxisreinigung");
  keywords.add("Kanzleireinigung");
  keywords.add("Treppenhausreinigung");
  keywords.add("Immobilienreinigung");
 }
 if (route.includes("entruempelung") || route.includes("wohnungsaufloesung")) keywords.add("Entrümpelung");
 if (route.includes("bueroumzug")) keywords.add("Büroumzug");
 if (route.includes("firmenentsorgung")) keywords.add("Firmenentsorgung");
 if (route.includes("leerfahrt") || route.includes("rueckfahrt")) keywords.add("Leer-Rückfahrt");
 if (route.includes("private-client")) keywords.add("Private Client");
 if (route.includes("rechner") || route.includes("buchung")) keywords.add("Preisrahmen");

 if (
  route === "/" ||
  route.includes("umzug") ||
  (!route.includes("reinigung") && !route.includes("entruempelung") && !route.includes("bueroumzug"))
 ) {
  keywords.add("Umzug");
 }

 if (geoName && geoName !== "Regensburg") keywords.add(geoName);
 return Array.from(keywords).slice(0, 10);
}

function getPrimaryCtaSignal(path: string) {
 if (path.includes("express")) return "Express-Check mit wenigen Eckdaten starten";
 if (path.includes("gewerbereinigung")) return "Gewerbereinigung in Regensburg direkt anfragen";
 if (path.includes("preisrahmen") || path.includes("preisvorschlag")) return "Preisvorstellung unverbindlich mitsenden";
 if (path.includes("buchung")) return "Direkte Buchungsanfrage starten";
 if (path.includes("kontakt")) return "Telefon, WhatsApp oder Anfrageweg wählen";
 if (path.includes("leerfahrt") || path.includes("rueckfahrt")) return "Freie Rückfahrt und Ladefläche prüfen";
 return "Unverbindlichen Preisrahmen prüfen";
}

export const viewport: Viewport = {
 themeColor: "#EEF5FF",
 width: "device-width",
 initialScale: 1,
 maximumScale: 5,
};

export function generatePageSEO({
 lang,
 pageLocale,
 locale,
 path,
 title,
 description,
}: PageSEOInput & { keywords?: string[] }): Metadata {
 const resolvedLocale = resolveLocale(lang || pageLocale || locale);
 const normalizedPath = normalizePath(path);
 const canonicalPath = resolveCanonicalPath(normalizedPath);
 const canonical = `${BASE_URL}${canonicalPath}`.replace("https://www.floxant.de/de", "https://www.floxant.de");
 const dominanceSnippet = getDominanceSnippet(normalizedPath || "/", { title, description });
 const safeTitle = trimTitle(normalizeText(dominanceSnippet.title, getDefaultTitle(resolvedLocale)));
 const safeDescription = trimDescription(normalizeText(dominanceSnippet.description, getDefaultDescription(resolvedLocale)));
 const searchIntent = germanizeText(getDominanceIntent(normalizedPath || "/"));
 const geo = getCityGeoData(normalizedPath);
 const indexable = !isPrivateRoute(normalizedPath) && !isLowValueRoute(normalizedPath);
 const followable = !isPrivateRoute(normalizedPath);
 const socialImage = resolveSocialImagePath(canonicalPath || normalizedPath || "/");

 return {
  metadataBase: new URL(BASE_URL),
  applicationName: company.name,
  title: safeTitle,
  description: safeDescription,
  keywords: getMetadataKeywords(normalizedPath || "/", geo?.name),
  authors: [{ name: company.name, url: BASE_URL }],
  creator: company.name,
  publisher: company.name,
  category: "Lokale Dienstleistungen",
  referrer: "origin-when-cross-origin",
  formatDetection: {
   telephone: false,
   address: false,
   email: false,
  },
  appleWebApp: {
   capable: true,
   statusBarStyle: "default",
   title: "FLOXANT",
  },
  manifest: "/manifest.webmanifest",
  icons: {
   icon: [
    { url: "/favicon.ico" },
    { url: "/icon.png", type: "image/png" },
   ],
   shortcut: "/favicon.ico",
   apple: [{ url: "/icon.png", type: "image/png" }],
  },
  alternates: {
   canonical,
   languages: {
    "de-DE": canonical,
    "x-default": canonical,
   },
  },
  robots: {
   index: indexable,
   follow: followable,
   googleBot: {
    index: indexable,
    follow: followable,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
   },
  },
  openGraph: {
   type: "website",
   url: canonical,
   title: safeTitle,
   description: safeDescription,
   siteName: company.name,
   locale: getOgLocale(resolvedLocale),
   images: [{ url: socialImage, width: 1200, height: 630, alt: safeTitle }],
  },
  twitter: {
   card: "summary_large_image",
   title: safeTitle,
   description: safeDescription,
   images: [socialImage],
  },
  other: {
   "geo.region": geo?.regionCode || "DE-BY",
   "geo.placename": geo?.name || company.city,
   "geo.position": geo ? `${geo.lat};${geo.lng}` : "49.0134;12.1016",
   "wikidata-id": geo?.wikidataId || "",
   "search-intent": searchIntent,
   "service-area": geo?.name ? `${geo.name}, Bayern, Deutschland` : "Regensburg, Bayern, Deutschland",
   "content-tags": getMetadataKeywords(normalizedPath || "/", geo?.name).join(", "),
   "primary-services": "Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung, Leer-Rückfahrt, Private Client Service",
   "business-category": "Lokale Dienstleistungen, Umzugsunternehmen, Reinigungsfirma, Entrümpelung",
   "business:contact_data:street_address": company.streetAddress,
   "business:contact_data:postal_code": company.postalCode,
   "business:contact_data:locality": company.city,
   "business:contact_data:region": "Bayern",
   "business:contact_data:country_name": "Deutschland",
   "business:contact_data:phone_number": company.phoneRaw,
   "business:contact_data:email": company.email,
   "local-seo-focus": "Relevanz für Regensburg, Bayern, Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung und Leer-Rückfahrt",
   "ai-readable-summary":
    "FLOXANT ist eine deutsche Premium-Dienstleistungsmarke für Umzug, Reinigung, Entrümpelung, Büroumzug und Zusatzservices mit operativem Kern Regensburg und Ausbau in Bayern.",
   "primary-conversion-url": `${BASE_URL}/buchung`,
   "primary-cta": getPrimaryCtaSignal(normalizedPath || "/"),
   "maps-booking-url": `${BASE_URL}/buchung`,
   "direct-booking-action": "Rechner starten, Express-Check nutzen, Preisvorschlag senden oder direkt anfragen.",
   "booking-entry": "Rechner, Express-Check, Preisvorschlag und direkte Buchung sind über /buchung erreichbar.",
   "ctr-promise": "Direkt anfragen statt Vergleichsportal: klare Vorprüfung, verständlicher Preisrahmen und regionale Einsatzplanung.",
   "visual-content-policy": "Service-Visuals ohne Menschengesichter: Fahrzeug, Route, Ladefläche, Reinigung, Räumung und Büroservice klar erkennbar.",
   "answer-engine-service-summary": "FLOXANT beantwortet Anfragen zu Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung, Leer-Rückfahrt und Private Client ab Regensburg für Bayern.",
   "google-maps-preconnect": "https://maps.google.com",
   "google-fonts-preconnect": "https://fonts.googleapis.com",
  },
 };
}
