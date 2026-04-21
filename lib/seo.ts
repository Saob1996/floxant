import type { Metadata, Viewport } from "next";
import { company } from "@/lib/company";
import { getCityGeoData } from "@/lib/geo-data";
import { germanizeText } from "@/lib/german-text";

const BASE_URL = company.url;
const OG_IMAGE = `${BASE_URL}/opengraph-image`;
const TITLE_LIMIT = 68;
const DESCRIPTION_LIMIT = 160;

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

function buildKeywords(path: string, title: string, _locale: Locale = "de", explicitKeywords: string[] = []) {
  const keywords = new Set<string>([
    "FLOXANT",
    "Regensburg",
    "Bayern",
    "Umzug",
    "Reinigung",
    "Entrümpelung",
    ...explicitKeywords,
    title,
  ]);

  if (path.includes("rechner")) keywords.add("Preisrechner");
  if (path.includes("umzug")) keywords.add("Umzugsunternehmen");
  if (path.includes("reinigung")) keywords.add("Reinigungsfirma");
  if (path.includes("entruempelung")) keywords.add("Wohnungsauflösung");
  if (path.includes("bueroumzug")) keywords.add("Büroumzug");
  if (path.includes("firmenentsorgung")) keywords.add("Firmenentsorgung");
  if (path.includes("leerfahrt-rueckfahrt")) keywords.add("Leer-Rückfahrt");
  if (path.includes("private-client-service")) {
    keywords.add("Private Client Service");
    keywords.add("Anwesen");
    keywords.add("Baden-Württemberg");
  }

  return Array.from(keywords).map((keyword) => germanizeText(keyword)).filter(Boolean).slice(0, 12).join(", ");
}

function normalizePath(path: string) {
  if (!path) return "";
  return `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}`;
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
  keywords: customKeywords,
}: PageSEOInput & { keywords?: string[] }): Metadata {
  const resolvedLocale = resolveLocale(lang || pageLocale || locale);
  const normalizedPath = normalizePath(path);
  const canonical = `${BASE_URL}${normalizedPath}`.replace("https://www.floxant.de/de", "https://www.floxant.de");
  const safeTitle = trimTitle(normalizeText(title, getDefaultTitle(resolvedLocale)));
  const safeDescription = trimDescription(normalizeText(description, getDefaultDescription(resolvedLocale)));
  const keywords = buildKeywords(normalizedPath, safeTitle, resolvedLocale, customKeywords);
  const geo = getCityGeoData(normalizedPath);

  return {
    metadataBase: new URL(BASE_URL),
    applicationName: company.name,
    title: safeTitle,
    description: safeDescription,
    keywords,
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
        de: canonical,
        "x-default": canonical,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
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
