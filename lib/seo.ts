import type { Metadata, Viewport } from "next";
import { company } from "@/lib/company";
import { getCityGeoData } from "@/lib/geo-data";
import { germanizeText } from "@/lib/german-text";
import { getDominanceSnippet } from "@/lib/seo-dominance";

const BASE_URL = company.url;
const OG_IMAGE = `${BASE_URL}/opengraph-image`;
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
  return "FLOXANT Regensburg | Umzug, Reinigung & Private Services";
}

function getDefaultDescription(_locale: Locale = "de") {
  return "Umzug, Reinigung, Entrümpelung, Büroumzug und Private Client in Regensburg und Bayern: klare Vorprüfung, sauberer Ablauf und direkte Anfrage.";
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

export const viewport: Viewport = {
  themeColor: "#0A0D14",
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
  const geo = getCityGeoData(normalizedPath);
  const indexable = !isPrivateRoute(normalizedPath) && !isLowValueRoute(normalizedPath);
  const followable = !isPrivateRoute(normalizedPath);

  return {
    metadataBase: new URL(BASE_URL),
    applicationName: company.name,
    title: safeTitle,
    description: safeDescription,
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
      statusBarStyle: "black-translucent",
      title: "FLOXANT",
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
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: safeTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: safeTitle,
      description: safeDescription,
      images: [OG_IMAGE],
    },
    other: {
      "geo.region": geo?.regionCode || "DE-BY",
      "geo.placename": geo?.name || company.city,
      "geo.position": geo ? `${geo.lat};${geo.lng}` : "49.0134;12.1016",
      "wikidata-id": geo?.wikidataId || "",
      "google-maps-preconnect": "https://maps.google.com",
      "google-fonts-preconnect": "https://fonts.googleapis.com",
    },
  };
}
