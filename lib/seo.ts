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
  "/partnercode": "/empfehlen",
  "/airbnb-reinigung-duesseldorf": "/reinigung-moeblierte-wohnung-duesseldorf",
  "/angebot-red-flag-scanner": "/angebotscheck",
  "/guenstigeres-angebot-pruefen": "/angebot-guenstiger-pruefen",
  "/villenservice": "/private-client-service",
  "/umzug-duesseldorf": "/duesseldorf/reinigung",
  "/umzug-berlin": "/umzug-bayern",
  "/umzug-bremen": "/umzug-bayern",
  "/umzug-dortmund": "/umzug-bayern",
  "/umzug-essen": "/umzug-bayern",
  "/umzug-frankfurt": "/umzug-bayern",
  "/umzug-hamburg": "/umzug-bayern",
  "/umzug-koeln": "/umzug-bayern",
  "/umzug-leipzig": "/umzug-bayern",
  "/umzug-stuttgart": "/umzug-bayern",
};

type Locale = "de";

interface PageSEOInput {
  lang?: string;
  pageLocale?: string;
  locale?: string;
  path: string;
  title?: string;
  description?: string;
  keywords?: string[];
}

function normalizeText(value: string | undefined, fallback: string) {
  const raw = (value || "").trim();
  const normalized = raw || fallback;
  return germanizeText(normalized).replace(/\s+/g, " ").trim();
}

function trimTitle(title: string) {
  if (title.length <= TITLE_LIMIT) return title;
  const shortened = title.slice(0, TITLE_LIMIT - 1).replace(/\s+\S*$/, "").trim();
  return `${shortened || title.slice(0, TITLE_LIMIT - 1).trim()}...`;
}

function trimDescription(description: string) {
  if (description.length <= DESCRIPTION_LIMIT) return description;
  const shortened = description
    .slice(0, DESCRIPTION_LIMIT - 1)
    .replace(/\s+\S*$/, "")
    .trim();
  return `${shortened || description.slice(0, DESCRIPTION_LIMIT - 1).trim()}...`;
}

function resolveLocale(_input?: string): Locale {
  return "de";
}

function getDefaultTitle(_locale: Locale = "de") {
  return "FLOXANT Regensburg | Umzug, Reinigung & Entrümpelung";
}

function getDefaultDescription(_locale: Locale = "de") {
  return "Umzug, Reinigung, Entrümpelung und Übergabe in Regensburg und Bayern: Aufwand realistisch prüfen, direkt anfragen und sauber planen.";
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
    "/empfehlen": "kontakt",
    "/express-anfrage": "express-anfrage",
    "/plattform-auftrag-pruefen": "anfrage-mit-preisrahmen",
    "/angebot-guenstiger-pruefen": "anfrage-mit-preisrahmen",
    "/plan-b-service": "express-anfrage",
    "/einsatzradar-regensburg": "service-area-bayern",
    "/entsorgung-duesseldorf": "kleinmengen-entsorgung",
    "/duesseldorf/reinigung": "reinigung",
    "/duesseldorf/bueroreinigung": "reinigung",
    "/duesseldorf/grundreinigung": "reinigung",
    "/duesseldorf/treppenhausreinigung": "reinigung",
    "/reinigung-moeblierte-wohnung-duesseldorf": "reinigung",
    "/anfrage-mit-preisrahmen": "anfrage-mit-preisrahmen",
    "/angebotscheck": "anfrage-mit-preisrahmen",
    "/makler-vermieter-link": "gewerbereinigung-regensburg",
    "/mieterwechsel-service-regensburg": "gewerbereinigung-regensburg",
    "/wohnung-wieder-vermietbar": "reinigung-regensburg",
    "/immobilie-verkaufsbereit-machen": "reinigung-regensburg",
    "/nachlass-raeumung-regensburg": "entruempelung",
    "/diskreter-umzug-trennung-scheidung": "private-client-service",
    "/rueckfahrt-boerse": "leerfahrt-rueckfahrt",
    "/uebergabeakte": "buchung-ablauf",
    "/schadensbegrenzung": "express-anfrage",
    "/keller-muellraum-rettung-regensburg": "entruempelung",
    "/beiladung": "beiladung",
    "/umzug-mit-reinigung": "umzug-mit-reinigung",
    "/kleinmengen-entsorgung": "kleinmengen-entsorgung",
    "/standorte": "kontakt",
  };

  if (exactProfiles[route]) {
    return `${SOCIAL_IMAGE_BASE}/${exactProfiles[route]}`;
  }

  if (route.startsWith("/umzug-")) return `${SOCIAL_IMAGE_BASE}/umzug`;
  if (route.startsWith("/reinigung-")) return `${SOCIAL_IMAGE_BASE}/reinigung`;
  if (route.startsWith("/entruempelung-")) return `${SOCIAL_IMAGE_BASE}/entruempelung`;
  if (route.startsWith("/bueroumzug-")) return `${SOCIAL_IMAGE_BASE}/bueroumzug`;
  if (route.startsWith("/blog") || route.startsWith("/ratgeber")) return OG_IMAGE;

  return TWITTER_IMAGE;
}

function isPrivateRoute(path: string) {
  return PRIVATE_NOINDEX_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

function isLowValueRoute(path: string) {
  if (
    LOW_VALUE_NOINDEX_PREFIXES.some(
      (prefix) => path === prefix || path.startsWith(`${prefix}/`),
    )
  ) {
    return true;
  }

  if (/^\/alternativen\/[^/]+$/.test(path)) return true;
  if (/^\/signature\/[^/]+$/.test(path)) return true;

  return false;
}

function getMetadataKeywords(path: string, geoName?: string) {
  const keywords = new Set(["FLOXANT", "Regensburg", "Bayern"]);
  const route = path || "/";
  const isDuesseldorfRoute = route.includes("duesseldorf");

  if (route === "/") {
    keywords.add("Direkt anfragen");
    keywords.add("Buchung Regensburg");
    keywords.add("Google Maps");
    keywords.add("Umzugsunternehmen Regensburg");
    keywords.add("Reinigungsfirma Regensburg");
  }

  if (isDuesseldorfRoute) {
    keywords.add("Düsseldorf");
    keywords.add("Reinigung Düsseldorf");
    keywords.add("Entsorgung Düsseldorf");
    keywords.add("Fotos senden");
    keywords.add("Budget prüfen");
    if (route.includes("bueroreinigung") || route.includes("b2b")) {
      keywords.add("B2B-Reinigung Düsseldorf");
      keywords.add("Büroreinigung Düsseldorf");
      keywords.add("kleine Unternehmen");
      keywords.add("regelmäßige Reinigung");
    }
    if (route.includes("treppenhaus")) keywords.add("Treppenhausreinigung Düsseldorf");
    if (route.includes("grundreinigung")) keywords.add("Grundreinigung Düsseldorf");
    if (route.includes("moeblierte") || route.includes("apartment")) {
      keywords.add("möblierte Wohnung Reinigung");
      keywords.add("Apartment Reinigung Düsseldorf");
      keywords.add("Kurzzeitvermietung Reinigung");
    }
    if (route.includes("entsorgung")) {
      keywords.add("Möbelentsorgung Düsseldorf");
      keywords.add("Sperrmüll Düsseldorf");
    }
  }

  if (route.includes("reinigung")) keywords.add("Reinigung");
  if (route.includes("gewerbereinigung")) {
    keywords.add("Gewerbereinigung");
    keywords.add("Büroreinigung");
    keywords.add("Praxisreinigung");
    keywords.add("Kanzleireinigung");
    keywords.add("Treppenhausreinigung");
    keywords.add("Immobilienreinigung");
    keywords.add("Hotelreinigung");
    keywords.add("Hausverwaltung Reinigung");
  }
  if (route.includes("entruempelung") || route.includes("wohnungsaufloesung")) {
    keywords.add("Entrümpelung");
    keywords.add("Wohnungsauflösung");
  }
  if (route.includes("bueroumzug")) {
    keywords.add("Büroumzug");
    keywords.add("Firmenumzug");
  }
  if (route.includes("firmenentsorgung")) keywords.add("Firmenentsorgung");
  if (route.includes("leerfahrt") || route.includes("rueckfahrt")) {
    keywords.add("Leer-Rückfahrt");
    keywords.add("Rücktransport");
  }
  if (route.includes("private-client")) {
    keywords.add("Private Client");
    keywords.add("Luxusumzug");
    keywords.add("diskrete Objektlogistik");
    keywords.add("Residenzservice");
    keywords.add("White Glove Service");
  }
  if (route.includes("rechner") || route.includes("buchung")) keywords.add("Preisrahmen");
  if (route.includes("plan-b")) {
    keywords.add("Plan B");
    keywords.add("Backup-Service");
    keywords.add("zweite Einschätzung");
  }
  if (route.includes("plattform-auftrag")) {
    keywords.add("Plattform-Auftrag prüfen");
    keywords.add("Angebot prüfen");
    keywords.add("zweite Einschätzung");
  }
  if (route.includes("angebot-guenstiger") || route.includes("guenstigeres-angebot")) {
    keywords.add("Angebot günstiger prüfen");
    keywords.add("günstigeres Angebot prüfen lassen");
    keywords.add("Alternative zum Angebot prüfen");
    keywords.add("Preisrahmen vergleichen");
  }
  if (route.includes("angebotscheck")) {
    keywords.add("Angebotscheck");
    keywords.add("Red-Flag-Scanner");
    keywords.add("Angebot vor Zusage prüfen");
  }
  if (route.includes("einsatzradar")) {
    keywords.add("Einsatzradar Regensburg");
    keywords.add("Servicegebiet Regensburg");
    keywords.add("lokale Einsatzarten");
  }
  if (route.includes("immobilie-verkaufsbereit")) {
    keywords.add("Immobilie verkaufsbereit machen");
    keywords.add("Besichtigung vorbereiten");
    keywords.add("Makler Objektservice");
  }
  if (route.includes("nachlass-raeumung")) {
    keywords.add("Nachlass-Räumung");
    keywords.add("Wohnungsauflösung Regensburg");
    keywords.add("diskrete Räumung");
  }
  if (route.includes("diskreter-umzug")) {
    keywords.add("diskreter Umzug");
    keywords.add("sensible Auszugssituation");
    keywords.add("Rückruf");
  }
  if (route.includes("buchung")) {
    keywords.add("Buchung");
    keywords.add("Anfrage");
    keywords.add("Google Maps");
    keywords.add("Google Business Profile");
    keywords.add("Direkter Buchungslink");
    keywords.add("Termin anfragen Regensburg");
  }
  if (route.includes("kontakt") || route.includes("standorte")) {
    keywords.add("Google Maps");
    keywords.add("lokaler Dienstleister");
    keywords.add("Kontakt Regensburg");
    keywords.add("Standorte Bayern");
    keywords.add("Google Unternehmensprofil Regensburg");
  }
  if (route.includes("service-area-bayern")) {
    keywords.add("Servicegebiet Bayern");
    keywords.add("Umzug Bayern");
    keywords.add("Reinigung Bayern");
    keywords.add("Regensburg Bayern");
  }
  if (route.includes("/blog") || route.includes("/ratgeber")) {
    keywords.add("Ratgeber");
    keywords.add("FAQ");
    keywords.add("Servicewissen");
    keywords.add("Google Maps Buchungslink");
  }

  if (
    route === "/" ||
    (!isDuesseldorfRoute && route.includes("umzug")) ||
    (!route.includes("reinigung") &&
      !route.includes("entruempelung") &&
      !route.includes("bueroumzug") &&
      !isDuesseldorfRoute)
  ) {
    keywords.add("Umzug");
  }

  if (geoName && geoName !== "Regensburg") keywords.add(geoName);
  return Array.from(keywords).slice(0, 12);
}

function getPrimaryCtaSignal(path: string) {
  if (path.includes("duesseldorf")) {
    if (path.includes("entsorgung")) return "Entsorgung Düsseldorf mit Fotos und Umfang anfragen";
    if (path.includes("bueroreinigung") || path.includes("b2b")) {
      return "B2B-Reinigung Düsseldorf mit Fläche, Frequenz und Zeitfenster anfragen";
    }
    return "Reinigung Düsseldorf ohne Umzug-Signal anfragen";
  }
  if (path.includes("plan-b")) return "Plan B mit Ort, Termin, Fotos und offenen Punkten prüfen";
  if (path.includes("angebot-guenstiger")) return "Angebot, Preisrahmen und günstigere Alternative prüfen lassen";
  if (path.includes("plattform-auftrag")) return "Plattform-Angebot oder Auftrag organisatorisch prüfen lassen";
  if (path.includes("einsatzradar")) return "Lokale Einsatzarten ansehen und eigenen Fall prüfen lassen";
  if (path.includes("express")) return "Express-Check mit wenigen Eckdaten starten";
  if (path.includes("gewerbereinigung")) {
    return "Gewerbereinigung in Regensburg direkt anfragen";
  }
  if (path.includes("preisrahmen") || path.includes("preisvorschlag")) {
    return "Preisvorstellung unverbindlich mitsenden";
  }
  if (path.includes("buchung")) return "Buchung oder Anfrage direkt starten";
  if (path.includes("kontakt")) return "Telefon, WhatsApp oder Anfrageweg wählen";
  if (path.includes("standorte")) return "Standort, Kontakt und Buchungsweg direkt öffnen";
  if (path.includes("leerfahrt") || path.includes("rueckfahrt")) {
    return "Freie Rückfahrt und Ladefläche prüfen";
  }
  if (path.includes("private-client")) return "Diskrete Private-Client-Anfrage starten";
  return "Unverbindlichen Preisrahmen prüfen";
}

function getRouteLocalSeoFocus(path: string) {
  if (path.includes("duesseldorf")) {
    return "Düsseldorf-Fokus ausschließlich für Reinigung und Entsorgung: private Reinigung, B2B-Reinigung, Apartment-Reinigung, Treppenhaus, Grundreinigung und Möbelentsorgung ohne Umzug-Düsseldorf-Signal.";
  }
  if (path.includes("einsatzradar")) {
    return "Local-SEO-Fokus Regensburg: Einsatzarten, Servicezonen, anonymisierte/typische Fälle und interne Links zu Umzug, Reinigung, Entrümpelung, Rückfahrt und Übergabeakte.";
  }
  if (path.includes("plan-b") || path.includes("schadensbegrenzung") || path.includes("plattform-auftrag") || path.includes("angebotscheck") || path.includes("angebot-guenstiger")) {
    return "Conversion-SEO-Fokus: kaufnahe Kunden mit Angebots-, Plattform-, Backup- oder Akutproblem direkt in einen prüfbaren FLOXANT-Anfragefluss führen.";
  }
  if (path.includes("immobilie-verkaufsbereit") || path.includes("nachlass-raeumung") || path.includes("diskreter-umzug")) {
    return "Signature-SEO-Fokus Regensburg: sensible Objekt-, Eigentümer-, Nachlass- und Diskret-Anfragen mit klarer rechtlicher Abgrenzung und hochwertigem Anfragefluss.";
  }
  return "Relevanz für Regensburg, Bayern, Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung und Leer-Rückfahrt";
}

function getRouteAnswerEngineSummary(path: string) {
  if (path.includes("duesseldorf")) {
    return "FLOXANT positioniert Düsseldorf getrennt für Reinigung und Entsorgung: B2B-Reinigung, Büroreinigung, Grundreinigung, Treppenhausreinigung, Apartment-Reinigung und Möbelentsorgung nach Absprache, keine Umzüge.";
  }
  if (path.includes("einsatzradar")) {
    return "Der FLOXANT Einsatzradar zeigt typische oder anonymisierte Einsatzarten im Raum Regensburg und verknüpft Servicezonen mit passenden Anfragewegen.";
  }
  if (path.includes("plan-b")) {
    return "Der FLOXANT Plan-B-Service prüft nach Verfügbarkeit Ersatz- oder Ergänzungspläne für unsichere Abläufe bei Umzug, Reinigung, Räumung, Entsorgung oder Übergabe.";
  }
  if (path.includes("plattform-auftrag")) {
    return "FLOXANT prüft Plattform- oder Anbieterangebote organisatorisch auf Umfang, Termin, Preisrahmen, Fotos und offene Punkte, ohne Plattformen rechtlich zu bewerten.";
  }
  if (path.includes("angebot-guenstiger")) {
    return "FLOXANT prüft vorhandene Angebote, Preisrahmen, Fotos und offene Punkte organisatorisch und schaut nach Verfügbarkeit, ob eine günstigere oder passendere Alternative möglich ist - ohne Preisgarantie.";
  }
  return "FLOXANT beantwortet Anfragen zu Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung, Leer-Rückfahrt und Private Client ab Regensburg für Bayern.";
}

function getRoutePrimaryServices(path: string) {
  if (path.includes("duesseldorf")) {
    return "Reinigung Düsseldorf, B2B-Reinigung Düsseldorf, Apartment-Reinigung Düsseldorf, Grundreinigung Düsseldorf, Treppenhausreinigung Düsseldorf, Entsorgung Düsseldorf";
  }
  if (path.includes("immobilie-verkaufsbereit")) {
    return "Räumung, Entsorgung, Reinigung vor Besichtigung, Fotoeinschätzung, Übergabeakte, Premium/Diskret";
  }
  if (path.includes("nachlass-raeumung")) {
    return "Nachlass-Räumung, Entsorgung, Reinigung, Objektvorbereitung, Übergabeakte, diskreter Rückruf";
  }
  if (path.includes("diskreter-umzug")) {
    return "Diskreter Umzug, Transport, Reinigung nach Auszug, Schlüsselübergabe, Übergabeakte, Premium/Diskret";
  }
  return company.coreServices.join(", ");
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
  keywords = [],
}: PageSEOInput): Metadata {
  const resolvedLocale = resolveLocale(lang || pageLocale || locale);
  const normalizedPath = normalizePath(path);
  const canonicalPath = resolveCanonicalPath(normalizedPath);
  const canonical = `${BASE_URL}${canonicalPath}`.replace(
    "https://www.floxant.de/de",
    "https://www.floxant.de",
  );
  const dominanceSnippet = getDominanceSnippet(normalizedPath || "/", {
    title,
    description,
  });
  const safeTitle = trimTitle(
    normalizeText(dominanceSnippet.title, getDefaultTitle(resolvedLocale)),
  );
  const safeDescription = trimDescription(
    normalizeText(dominanceSnippet.description, getDefaultDescription(resolvedLocale)),
  );
  const searchIntent = germanizeText(getDominanceIntent(normalizedPath || "/"));
  const geo = getCityGeoData(normalizedPath);
  const indexable = !isPrivateRoute(normalizedPath) && !isLowValueRoute(normalizedPath);
  const followable = !isPrivateRoute(normalizedPath);
  const socialImage = resolveSocialImagePath(canonicalPath || normalizedPath || "/");
  const keywordSet = new Set(getMetadataKeywords(normalizedPath || "/", geo?.name));

  keywords.forEach((keyword) => {
    const cleaned = normalizeText(keyword, "");
    if (cleaned) keywordSet.add(cleaned);
  });

  const contentTags = Array.from(keywordSet).slice(0, 18);

  return {
    metadataBase: new URL(BASE_URL),
    applicationName: company.name,
    title: safeTitle,
    description: safeDescription,
    keywords: contentTags,
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
      "service-area": geo?.name
        ? `${geo.name}, Bayern, Deutschland`
        : "Regensburg, Bayern, Deutschland",
      "content-tags": contentTags.join(", "),
      "primary-services": getRoutePrimaryServices(normalizedPath || "/"),
      "business-category": company.primaryCategories.join(", "),
      "business:contact_data:street_address": company.streetAddress,
      "business:contact_data:postal_code": company.postalCode,
      "business:contact_data:locality": company.city,
      "business:contact_data:region": company.state,
      "business:contact_data:country_name": company.country,
      "business:contact_data:phone_number": company.phoneRaw,
      "business:contact_data:email": company.email,
      "local-seo-focus": getRouteLocalSeoFocus(normalizedPath || "/"),
      "ai-readable-summary":
        "FLOXANT ist eine deutsche Premium-Dienstleistungsmarke für Umzug, Reinigung, Entrümpelung, Büroumzug und Zusatzservices mit operativem Kern in Regensburg und Ausbau in Bayern.",
      "primary-conversion-url": company.businessProfilePreferredUrl,
      "google-business-profile-url": company.businessProfilePreferredUrl,
      "google-maps-contact-url": company.contactUrl,
      "primary-cta": getPrimaryCtaSignal(normalizedPath || "/"),
      "maps-booking-url": company.businessProfilePreferredUrl,
      "direct-booking-action":
        "Rechner starten, Express-Check nutzen, Preisvorschlag senden oder direkt anfragen.",
      "booking-entry":
        "Rechner, Express-Check, Preisvorschlag und direkte Buchung sind über /buchung erreichbar.",
      "ctr-promise":
        "Direkt anfragen statt Vergleichsportal: klare Vorprüfung, verständlicher Preisrahmen und regionale Einsatzplanung.",
      "visual-content-policy":
        "Service-Visuals ohne Menschengesichter: Fahrzeug, Route, Ladefläche, Reinigung, Räumung und Büroservice klar erkennbar.",
      "answer-engine-service-summary": getRouteAnswerEngineSummary(normalizedPath || "/"),
      "maps-ranking-support":
        "Lokale Relevanz wird über Regensburg als Kernstandort, vollständige Kontaktdaten, Buchungslink, Servicegebiete und klare Standortpfade unterstützt.",
      "maps-relevance-signals":
        "Vollständige Kontaktangaben, Buchungslink, Standortseite, Bayern-Servicegebiet und lokale Servicepfade.",
      "google-business-preferred-link": company.businessProfilePreferredUrl,
      "google-maps-preconnect": "https://maps.google.com",
      "google-fonts-preconnect": "https://fonts.googleapis.com",
    },
  };
}

