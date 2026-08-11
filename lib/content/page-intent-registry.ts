import { generatedPageRouteInventory } from "@/lib/content/generated-page-route-inventory";
import { sanitizePublicContent } from "@/lib/content/public-content";

export type PageLanguage = "de" | "en";
export type PageLocation = "Düsseldorf" | "Regensburg" | "Mehrere Standorte" | "Überregional";
export type PageType =
  | "homepage"
  | "location_hub"
  | "service"
  | "guide"
  | "faq_hub"
  | "service_hub"
  | "contact"
  | "tool"
  | "legal"
  | "internal"
  | "verification"
  | "error"
  | "ads_landing";
export type InternalPageRecord = {
  route: string;
  locale: PageLanguage;
  location: PageLocation;
  pageType: PageType;
  primaryService: string;
  primaryIntent: string;
  secondaryIntent: string;
  targetAudience: string;
  recommendedH1: string;
  recommendedSeoTitle: string;
  shortTitle: string;
  metaDescription: string;
  primaryCta: string;
  parentHub: string | null;
  allowedSections: readonly string[];
  prohibitedSections: readonly string[];
  relatedServices: readonly string[];
  relatedGuides: readonly string[];
  faqTopics: readonly string[];
  canonicalRoute: string;
  indexable: boolean;
  sitemap: boolean;
  status: "active" | "alias" | "private" | "verification" | "ads_landing";
  contentOwner: string;
  reviewDate: string;
};

/** @deprecated Use InternalPageRecord for registry-only page planning data. */
export type PageIntentContract = InternalPageRecord;

export type PublicPageContent = {
  publicRoute: string;
  publicTitle: string;
  publicHeadline: string;
  publicDescription: string;
  publicLabel: string;
  publicBenefits: readonly string[];
  publicRequirements: readonly string[];
  publicFaq: readonly { question: string; answer: string }[];
  publicCta: string;
};

const serviceLabels: readonly [RegExp, string][] = [
  [/(?:bueroreinigung|office-cleaning)/, "Büroreinigung"],
  [/(?:praxisreinigung|practice-cleaning)/, "Praxisreinigung"],
  [/(?:fensterreinigung|window-cleaning)/, "Fensterreinigung"],
  [/(?:grundreinigung|deep-cleaning)/, "Grundreinigung"],
  [/(?:unterhaltsreinigung|maintenance-cleaning)/, "Unterhaltsreinigung"],
  [/(?:bauendreinigung|baureinigung|post-construction-cleaning)/, "Bau- und Bauendreinigung"],
  [/(?:treppenhausreinigung|stairwell-cleaning)/, "Treppenhausreinigung"],
  [/(?:gewerbereinigung|commercial-cleaning)/, "Gewerbereinigung"],
  [/(?:endreinigung|final-cleaning|uebergabereinigung)/, "End- und Übergabereinigung"],
  [/(?:klaviertransport|piano-transport)/, "Klaviertransport"],
  [/(?:moebeltransport|kleintransport|furniture-transport)/, "Möbeltransport"],
  [/(?:seniorenumzug|senior-moving)/, "Seniorenumzug"],
  [/(?:fernumzug|long-distance-moving)/, "Fernumzug"],
  [/(?:umzug|moving)/, "Umzug"],
  [/(?:entruempelung|clearance)/, "Entrümpelung"],
  [/(?:wohnungsaufloesung|haushaltsaufloesung|household-clearance)/, "Wohnungs- und Haushaltsauflösung"],
  [/(?:angebot|offer|quote)/, "Angebotsprüfung"],
  [/(?:reinigung|cleaning)/, "Reinigung"],
] as const;

const priorityContracts: Record<string, Partial<PageIntentContract>> = {
  "/": {
    location: "Mehrere Standorte",
    pageType: "homepage",
    primaryService: "FLOXANT Leistungen",
    primaryIntent: "Passende FLOXANT Leistung und den richtigen Standort finden",
    secondaryIntent: "Anfrageweg für Düsseldorf oder Regensburg wählen",
    recommendedH1: "Umzug, Reinigung und besondere Lösungen klar anfragen",
    recommendedSeoTitle: "FLOXANT | Reinigung Düsseldorf & Umzug Regensburg",
    shortTitle: "FLOXANT",
    metaDescription:
      "Reinigung in Düsseldorf sowie Umzug, Entrümpelung und weitere Leistungen in Regensburg verständlich auswählen und direkt anfragen.",
    primaryCta: "Passende Leistung finden",
  },
  "/duesseldorf": {
    location: "Düsseldorf",
    pageType: "location_hub",
    primaryService: "Reinigungsleistungen",
    primaryIntent: "Reinigungsleistungen in Düsseldorf verständlich auswählen",
    secondaryIntent: "Objekt, Turnus und Umfang für eine Anfrage vorbereiten",
    recommendedH1: "Reinigung in Düsseldorf passend zum Objekt anfragen",
    recommendedSeoTitle: "Reinigung Düsseldorf für Büro, Praxis & Objekt | FLOXANT",
    shortTitle: "Reinigung Düsseldorf",
    metaDescription:
      "Büro-, Praxis-, Fenster-, Grund- und weitere Reinigungen in Düsseldorf auswählen. Objekt und Umfang beschreiben und Anfrage senden.",
    primaryCta: "Reinigung in Düsseldorf anfragen",
  },
  "/duesseldorf/reinigung": {
    location: "Düsseldorf",
    pageType: "service",
    primaryService: "Reinigung",
    primaryIntent: "Reinigungsleistungen in Düsseldorf erklären und eine Anfrage ermöglichen",
    secondaryIntent: "Passende Reinigungsart nach Objekt und Turnus wählen",
    recommendedH1: "Reinigung in Düsseldorf für Ihr Objekt klar anfragen",
    recommendedSeoTitle: "Reinigung Düsseldorf klar anfragen | FLOXANT",
    shortTitle: "Reinigung Düsseldorf",
    metaDescription:
      "Reinigung in Düsseldorf für Büro, Praxis, Gewerbe oder private Räume. Objekt, Fläche, Turnus und Zeitraum beschreiben und anfragen.",
    primaryCta: "Reinigung anfragen",
  },
  "/duesseldorf/bueroreinigung": {
    location: "Düsseldorf",
    pageType: "service",
    primaryService: "Büroreinigung",
    primaryIntent: "Büroreinigung in Düsseldorf erklären und konkrete Eckdaten sammeln",
    secondaryIntent: "Turnus, Zugangszeit und Raumumfang klären",
    recommendedH1: "Büroreinigung in Düsseldorf klar anfragen",
    recommendedSeoTitle: "Büroreinigung Düsseldorf klar anfragen | FLOXANT",
    shortTitle: "Büroreinigung Düsseldorf",
    metaDescription:
      "Büroreinigung in Düsseldorf mit Fläche, Räumen, Turnus und Zugangszeiten beschreiben. Anforderungen klären und Anfrage senden.",
    primaryCta: "Büroreinigung anfragen",
  },
  "/duesseldorf/gewerbereinigung": {
    location: "Düsseldorf",
    pageType: "service",
    primaryService: "Gewerbereinigung",
    primaryIntent: "Gewerbereinigung in Düsseldorf nach Objektart und Nutzung erklären",
    secondaryIntent: "Fläche, Nutzungszeiten, Turnus, Sonderflächen und Zugang klären",
    recommendedH1: "Gewerbereinigung in Düsseldorf mit konkreten Eckdaten anfragen",
    recommendedSeoTitle: "Gewerbereinigung Düsseldorf | Objekt & Turnus",
    shortTitle: "Gewerbereinigung Düsseldorf",
    metaDescription:
      "Gewerbereinigung in Düsseldorf mit Objektart, Fläche, Nutzungszeiten, Turnus, Sonderflächen und Zugang konkret anfragen.",
    primaryCta: "Gewerbereinigung anfragen",
  },
  "/duesseldorf/praxisreinigung": {
    location: "Düsseldorf",
    pageType: "service",
    primaryService: "Praxisreinigung",
    primaryIntent: "Praxisreinigung in Düsseldorf nach Räumen und Anforderungen erklären",
    secondaryIntent: "Zeitfenster, Kontaktflächen und Zugangsweg klären",
    recommendedH1: "Praxisreinigung in Düsseldorf klar anfragen",
    recommendedSeoTitle: "Praxisreinigung Düsseldorf klar anfragen | FLOXANT",
    shortTitle: "Praxisreinigung Düsseldorf",
    metaDescription:
      "Praxisreinigung in Düsseldorf nach Räumen, Flächen, Turnus und Zugangszeit anfragen. Besondere Anforderungen vorab beschreiben.",
    primaryCta: "Praxisreinigung anfragen",
  },
  "/duesseldorf/fensterreinigung": {
    location: "Düsseldorf",
    pageType: "service",
    primaryService: "Fensterreinigung",
    primaryIntent: "Fensterreinigung in Düsseldorf nach Flächen und Zugang erklären",
    secondaryIntent: "Rahmen, Höhe, Erreichbarkeit und Turnus klären",
    recommendedH1: "Fensterreinigung in Düsseldorf klar anfragen",
    recommendedSeoTitle: "Fensterreinigung Düsseldorf anfragen | FLOXANT",
    shortTitle: "Fensterreinigung Düsseldorf",
    metaDescription:
      "Fensterreinigung in Düsseldorf mit Anzahl, Höhe, Rahmen und Zugang beschreiben. Fotos ergänzen und Umfang anfragen.",
    primaryCta: "Fensterreinigung anfragen",
  },
  "/duesseldorf/grundreinigung": {
    location: "Düsseldorf",
    pageType: "service",
    primaryService: "Grundreinigung",
    primaryIntent: "Grundreinigung in Düsseldorf nach Zustand und Ziel erklären",
    secondaryIntent: "Flächen, Verschmutzung und gewünschtes Ergebnis klären",
    recommendedH1: "Grundreinigung in Düsseldorf klar anfragen",
    recommendedSeoTitle: "Grundreinigung Düsseldorf klar anfragen | FLOXANT",
    shortTitle: "Grundreinigung Düsseldorf",
    metaDescription:
      "Grundreinigung in Düsseldorf für Böden, Oberflächen und ausgewählte Bereiche. Zustand, Fläche und Ziel beschreiben und anfragen.",
    primaryCta: "Grundreinigung anfragen",
  },
  "/duesseldorf/unterhaltsreinigung": {
    location: "Düsseldorf",
    pageType: "service",
    primaryService: "Unterhaltsreinigung",
    primaryIntent: "Regelmäßige Unterhaltsreinigung in Düsseldorf erklären",
    secondaryIntent: "Turnus, Bereiche und Zugangszeiten festhalten",
    recommendedH1: "Unterhaltsreinigung in Düsseldorf klar anfragen",
    recommendedSeoTitle: "Unterhaltsreinigung Düsseldorf anfragen | FLOXANT",
    shortTitle: "Unterhaltsreinigung Düsseldorf",
    metaDescription:
      "Unterhaltsreinigung in Düsseldorf mit Flächen, Bereichen, Turnus und Zugangszeiten beschreiben. Regelmäßige Reinigung anfragen.",
    primaryCta: "Unterhaltsreinigung anfragen",
  },
  "/duesseldorf/baureinigung": {
    location: "Düsseldorf",
    pageType: "service",
    primaryService: "Bau- und Bauendreinigung",
    primaryIntent: "Bau- und Bauendreinigung in Düsseldorf voneinander abgrenzen",
    secondaryIntent: "Bauphase, Fläche, Verschmutzung und Termin klären",
    recommendedH1: "Bau- und Bauendreinigung in Düsseldorf anfragen",
    recommendedSeoTitle: "Bauendreinigung Düsseldorf anfragen | FLOXANT",
    shortTitle: "Bauendreinigung Düsseldorf",
    metaDescription:
      "Bau- und Bauendreinigung in Düsseldorf nach Bauphase, Fläche, Zustand und Termin anfragen. Umfang und Zugänge vorab beschreiben.",
    primaryCta: "Bauendreinigung anfragen",
  },
  "/regensburg": {
    location: "Regensburg",
    pageType: "location_hub",
    primaryService: "Umzug, Entrümpelung und Reinigung",
    primaryIntent: "Leistungen für Regensburg verständlich auswählen",
    secondaryIntent: "Umzug und passende Zusatzleistungen kombinieren",
    recommendedH1: "Umzug und weitere Leistungen in Regensburg klar anfragen",
    recommendedSeoTitle: "Umzug, Entrümpelung & Reinigung Regensburg | FLOXANT",
    shortTitle: "FLOXANT Regensburg",
    metaDescription:
      "Umzug, Entrümpelung, Auflösung, Reinigung und weitere Leistungen in Regensburg auswählen, kombinieren und direkt anfragen.",
    primaryCta: "Leistung in Regensburg anfragen",
  },
  "/regensburg/umzug": {
    location: "Regensburg",
    pageType: "service",
    primaryService: "Umzug",
    primaryIntent: "Umzüge mit Start oder Ziel im Regensburger Leistungsgebiet erklären",
    secondaryIntent: "Start, Ziel, Umfang, Zugang und Zeitraum vorbereiten",
    recommendedH1: "Umzug in Regensburg mit klaren Eckdaten anfragen",
    recommendedSeoTitle: "Umzug Regensburg mit Start & Ziel anfragen | FLOXANT",
    shortTitle: "Umzug Regensburg",
    metaDescription:
      "Umzug mit Start oder Ziel in Regensburg anfragen. Start, Ziel, Etagen, Aufzug, Umfang und Zeitraum verständlich beschreiben.",
    primaryCta: "Umzug anfragen",
  },
  "/umzug-regensburg": {
    location: "Regensburg",
    pageType: "service",
    primaryService: "Umzug",
    primaryIntent: "Zur kanonischen Umzugsseite Regensburg führen",
    secondaryIntent: "Bestehende Rankingsignale ohne Inhaltsduplikat erhalten",
    recommendedH1: "Umzug in Regensburg mit klaren Eckdaten anfragen",
    recommendedSeoTitle: "Umzug Regensburg mit Start & Ziel anfragen | FLOXANT",
    shortTitle: "Umzug Regensburg",
    metaDescription:
      "Umzug mit Start oder Ziel in Regensburg anfragen. Start, Ziel, Etagen, Aufzug, Umfang und Zeitraum verständlich beschreiben.",
    primaryCta: "Umzug anfragen",
  },
  "/regensburg/entruempelung": {
    location: "Regensburg",
    pageType: "service",
    primaryService: "Entrümpelung",
    primaryIntent: "Entrümpelung in Regensburg nach Menge, Zugang und Zielzustand erklären",
    secondaryIntent: "Räumung, Entsorgung und mögliche Reinigung abgrenzen",
    recommendedH1: "Entrümpelung in Regensburg klar anfragen",
    recommendedSeoTitle: "Entrümpelung Regensburg klar anfragen | FLOXANT",
    shortTitle: "Entrümpelung Regensburg",
    metaDescription:
      "Entrümpelung in Regensburg mit Räumen, Menge, Zugang, Fotos und Zielzustand beschreiben. Zusatzleistungen getrennt anfragen.",
    primaryCta: "Entrümpelung anfragen",
  },
  "/regensburg/wohnungsaufloesung": {
    location: "Regensburg",
    pageType: "service",
    primaryService: "Wohnungsauflösung",
    primaryIntent: "Wohnungsauflösung in Regensburg ruhig und verständlich erklären",
    secondaryIntent: "Freigaben, Räume, Restgegenstände und Übergabeziel klären",
    recommendedH1: "Wohnungsauflösung in Regensburg klar vorbereiten",
    recommendedSeoTitle: "Wohnungsauflösung Regensburg anfragen | FLOXANT",
    shortTitle: "Wohnungsauflösung Regensburg",
    metaDescription:
      "Wohnungsauflösung in Regensburg mit Räumen, Freigaben, Fotos und gewünschtem Endzustand vorbereiten und anfragen.",
    primaryCta: "Wohnungsauflösung anfragen",
  },
  "/klaviertransport-regensburg": {
    location: "Regensburg",
    pageType: "service",
    primaryService: "Klaviertransport",
    primaryIntent: "Klaviertransport in Regensburg anhand von Instrument und Zugang erklären",
    secondaryIntent: "Maße, Gewicht, Etagen, Treppen und Engstellen klären",
    recommendedH1: "Klaviertransport in Regensburg sorgfältig vorbereiten",
    recommendedSeoTitle: "Klaviertransport Regensburg vorbereiten | FLOXANT",
    shortTitle: "Klaviertransport Regensburg",
    metaDescription:
      "Klaviertransport in Regensburg mit Instrumentart, Maßen, Gewicht, Etagen, Treppen und Zugängen beschreiben und anfragen.",
    primaryCta: "Klaviertransport anfragen",
  },
  "/leistungen": {
    location: "Mehrere Standorte",
    pageType: "service_hub",
    primaryService: "Leistungsübersicht",
    primaryIntent: "Alle aktuell öffentlichen Leistungen nach Standort verständlich zeigen",
    secondaryIntent: "Zur passenden Leistungs- oder Standortseite führen",
    recommendedH1: "Leistungen für Düsseldorf und Regensburg auswählen",
    recommendedSeoTitle: "FLOXANT Leistungen nach Standort auswählen",
    shortTitle: "Leistungen",
    metaDescription:
      "FLOXANT Leistungen für Düsseldorf und Regensburg nach Standort und Bedarf auswählen und zur passenden Seite wechseln.",
    primaryCta: "Passende Leistung auswählen",
  },
  "/kontakt": {
    location: "Mehrere Standorte",
    pageType: "contact",
    primaryService: "Kontakt und Anfrage",
    primaryIntent: "Eine Anfrage mit den wichtigsten Angaben sicher übermitteln",
    secondaryIntent: "Telefon, WhatsApp oder Formular wählen",
    recommendedH1: "FLOXANT kontaktieren und Anliegen beschreiben",
    recommendedSeoTitle: "FLOXANT Kontakt | Anfrage sicher senden",
    shortTitle: "Kontakt",
    metaDescription:
      "FLOXANT per Formular, Telefon oder WhatsApp kontaktieren. Standort, Leistung, Umfang und gewünschten Zeitraum kurz beschreiben.",
    primaryCta: "Anfrage senden",
  },
  "/reinigungsfirma-angebot": {
    location: "Mehrere Standorte",
    pageType: "service",
    primaryService: "Neue Reinigungsanfrage",
    primaryIntent: "Eckdaten für ein neues Reinigungsangebot übermitteln",
    secondaryIntent: "Bestehende Angebote klar zur getrennten Angebotsprüfung führen",
    recommendedH1: "Neues Reinigungsangebot mit klaren Eckdaten anfragen",
    recommendedSeoTitle: "Reinigungsangebot anfragen | FLOXANT",
    shortTitle: "Reinigungsangebot anfragen",
    metaDescription:
      "Ein neues Reinigungsangebot mit Objekt, Fläche, Turnus und Zeitraum anfragen. Ein bestehendes Angebot separat prüfen lassen.",
    primaryCta: "Reinigungsangebot anfragen",
  },
  "/rechner": {
    location: "Überregional",
    pageType: "tool",
    primaryService: "Aufwand einschätzen",
    primaryIntent: "Zwischen Umzugs- und Reinigungsrechner wählen",
    secondaryIntent: "Zum passenden eigenständigen Rechner führen",
    recommendedH1: "Welchen Aufwand möchten Sie einschätzen?",
    recommendedSeoTitle: "FLOXANT Rechner | Umzug oder Reinigung einschätzen",
    shortTitle: "FLOXANT Rechner",
    metaDescription:
      "Wählen Sie den Umzugs- oder Reinigungsrechner und erhalten Sie eine unverbindliche Aufwandseinschätzung ohne Scheingenauigkeit.",
    primaryCta: "Rechner auswählen",
  },
  "/umzug-kosten-rechner": {
    location: "Überregional",
    pageType: "tool",
    primaryService: "Umzugsaufwand einschätzen",
    primaryIntent: "Umzugsaufwand anhand weniger zentraler Angaben einordnen",
    secondaryIntent: "Ergebnis strukturiert in eine unverbindliche Anfrage übernehmen",
    recommendedH1: "Umzugsaufwand in wenigen Schritten einschätzen",
    recommendedSeoTitle: "Umzugsrechner | Aufwand unverbindlich einschätzen",
    shortTitle: "Umzugsrechner",
    metaDescription:
      "Route, Umfang und Zugang angeben und den Umzugsaufwand als verständlichen Rahmen einschätzen. Ergebnis direkt in eine Anfrage übernehmen.",
    primaryCta: "Umzugsaufwand einschätzen",
  },
  "/reinigung-preis-rechner": {
    location: "Überregional",
    pageType: "tool",
    primaryService: "Reinigungsaufwand einschätzen",
    primaryIntent: "Reinigungsaufwand anhand von Objekt, Fläche und Reinigungsart einordnen",
    secondaryIntent: "Ergebnis strukturiert in eine unverbindliche Anfrage übernehmen",
    recommendedH1: "Reinigungsaufwand in wenigen Schritten einschätzen",
    recommendedSeoTitle: "Reinigungsrechner | Aufwand unverbindlich einschätzen",
    shortTitle: "Reinigungsrechner",
    metaDescription:
      "Objekt, Fläche und Reinigungsart angeben und den Aufwand als verständlichen Rahmen einschätzen. Ergebnis direkt in eine Anfrage übernehmen.",
    primaryCta: "Reinigungsaufwand einschätzen",
  },
};

function inferLanguage(url: string): PageLanguage {
  return url === "/en" || url.startsWith("/en/") ? "en" : "de";
}

function inferLocation(url: string): PageLocation {
  if (/duesseldorf/i.test(url)) return "Düsseldorf";
  if (/regensburg/i.test(url)) return "Regensburg";
  return "Überregional";
}

function inferService(url: string) {
  const normalized = url.toLowerCase();
  return serviceLabels.find(([pattern]) => pattern.test(normalized))?.[1] ?? "Information und Anfrage";
}

function inferPageType(url: string): PageType {
  if (url === "/") return "homepage";
  if (["/404", "/_not-found"].includes(url)) return "error";
  if (url === "/dashboard" || url.startsWith("/dashboard/")) return "internal";
  if (/^\/google[a-z0-9_-]+\.html$/i.test(url)) return "verification";
  if (url === "/duesseldorf" || url === "/regensburg" || url === "/standorte") return "location_hub";
  if (url === "/leistungen" || url === "/en/services") return "service_hub";
  if (url === "/fragen" || url === "/en/questions") return "faq_hub";
  if (url === "/kontakt" || url === "/en/contact") return "contact";
  if (/^\/(?:blog|ratgeber|wissen)\//.test(url) || /^\/en\/blog\//.test(url) || ["/blog", "/ratgeber", "/wissen", "/en/blog"].includes(url)) return "guide";
  if (
    ["/suche", "/service-finder", "/en/search", "/en/service-finder"].includes(url)
    || /(?:\/rechner|-rechner)$/.test(url)
  ) return "tool";
  if (["/impressum", "/datenschutz", "/agb", "/buchungsbedingungen", "/widerruf", "/korrekturen", "/methodik", "/redaktion", "/en/corrections", "/en/editorial-policy", "/en/methodology"].includes(url)) return "legal";
  return "service";
}

function inferParentHub(url: string, pageType: PageType) {
  if (["homepage", "location_hub", "service_hub", "faq_hub", "legal", "internal", "verification", "error"].includes(pageType)) return null;
  if (pageType === "guide" && ["/blog", "/ratgeber", "/wissen", "/en/blog"].includes(url)) return null;
  if (pageType === "tool" && url === "/rechner") return null;
  if (url === "/duesseldorf/reinigung") return "/duesseldorf";
  if (url.startsWith("/duesseldorf/")) return "/duesseldorf/reinigung";
  if (url.startsWith("/regensburg/")) return "/regensburg";
  if (pageType === "guide") {
    if (url.startsWith("/en/blog/")) return "/en/blog";
    return url.startsWith("/blog/") ? "/blog" : "/ratgeber";
  }
  if (url.startsWith("/en/")) return "/en/services";
  if (pageType === "tool") return "/rechner";
  return "/leistungen";
}

function routeFocus(url: string) {
  if (url === "/") return "FLOXANT Leistungs- und Standortwahl";
  return url
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment)
      .replace(/\.html$/i, "")
      .replaceAll("-", " ")
      .replace(/\bduesseldorf\b/gi, "Düsseldorf")
      .replace(/\b(?:entruempelung|entrumpelung)\b/gi, "Entrümpelung")
      .replace(/\bbueroreinigung\b/gi, "Büroreinigung")
      .replace(/\bbueroumzug\b/gi, "Büroumzug")
      .replace(/\bwohnungsaufloesung\b/gi, "Wohnungsauflösung")
      .replace(/\buebergabe\b/gi, "Übergabe")
      .replace(/\bumzug\b/gi, "Umzug")
      .replace(/\breinigung\b/gi, "Reinigung")
      .replace(/^./, (character) => character.toLocaleUpperCase("de")))
    .join(" / ");
}

function inferPrimaryIntent(url: string, language: PageLanguage, pageType: PageType, service: string) {
  const focus = routeFocus(url);
  if (language === "en") {
    if (pageType === "guide") return `Answer the specific guidance topic “${focus}” and point to a suitable next step`;
    if (pageType === "tool") return `Help visitors complete the “${focus}” tool and interpret its result`;
    if (pageType === "contact") return `Collect the information needed for “${focus}” and transmit the enquiry safely`;
    if (["legal", "internal", "verification", "error"].includes(pageType)) return `Fulfil the technical or informational purpose of “${focus}”`;
    return `Explain the specific ${service} need “${focus}” and guide visitors to the suitable next step`;
  }
  if (pageType === "guide") return `Die konkrete Informationsfrage „${focus}“ beantworten und zum passenden nächsten Schritt führen`;
  if (pageType === "tool") return `Das Werkzeug „${focus}“ verständlich durchführen und das Ergebnis einordnen`;
  if (pageType === "contact") return `Die für „${focus}“ benötigten Angaben sicher erfassen und übermitteln`;
  if (["legal", "internal", "verification", "error"].includes(pageType)) return `Den technischen oder informativen Zweck von „${focus}“ erfüllen`;
  return `Den konkreten Bedarf „${focus}“ für ${service} verständlich erklären und zum passenden nächsten Schritt führen`;
}

function defaultContract(url: string): PageIntentContract {
  const language = inferLanguage(url);
  const location = inferLocation(url);
  const pageType = inferPageType(url);
  const service = inferService(url);
  const locationSuffix = location === "Überregional" ? "" : ` in ${location}`;
  const isEnglish = language === "en";

  return {
    route: url,
    locale: language,
    location,
    pageType,
    primaryService: service,
    primaryIntent: inferPrimaryIntent(url, language, pageType, service),
    secondaryIntent: isEnglish
      ? "Clarify scope, access, timeframe and contact preference"
      : "Umfang, Zugang, Zeitraum und Kontaktwunsch klären",
    targetAudience: isEnglish ? "People and organisations requesting a service" : "Privatpersonen und Unternehmen mit konkretem Leistungsbedarf",
    recommendedH1: isEnglish ? `${service} clearly explained` : `${service}${locationSuffix} klar anfragen`,
    recommendedSeoTitle: `${service}${locationSuffix} | FLOXANT`,
    shortTitle: `${service}${locationSuffix}`,
    metaDescription: isEnglish
      ? `Understand ${service.toLowerCase()}, provide the key details and contact FLOXANT for a personal review.`
      : `${service}${locationSuffix} mit den wichtigsten Angaben beschreiben, offene Punkte klären und persönlich anfragen.`,
    primaryCta: isEnglish ? "Send an enquiry" : `${service} anfragen`,
    parentHub: inferParentHub(url, pageType),
    allowedSections: [
      "Direkte Antwort",
      "Leistungsumfang",
      "benötigte Angaben",
      "Aufwandstreiber",
      "Ablauf",
      "FAQ",
      "verwandte Leistungen",
      "nächster Schritt",
    ],
    prohibitedSections: [
      "interne Prüfbegriffe",
      "fremde Standorte",
      "nicht angebotene Leistungen",
      "unbelegte Versprechen",
    ],
    relatedServices: [],
    relatedGuides: [],
    faqTopics: ["Angaben", "Ablauf", "Umfang", "Termin"],
    canonicalRoute: url,
    indexable: true,
    sitemap: true,
    status: "active",
    contentOwner: "FLOXANT Redaktion",
    reviewDate: "2026-08-11",
  };
}

const adsPageRoutes = new Set([
  "/duesseldorf/reinigung/anfrage",
  "/umzug-regensburg/anfrage",
]);

function inferTechnicalStatus(
  entry: (typeof generatedPageRouteInventory)[number],
): InternalPageRecord["status"] {
  if (entry.route.startsWith("/google") && entry.route.endsWith(".html")) return "verification";
  if (entry.canonicalRoute && entry.canonicalRoute !== entry.route) return "alias";
  if (!entry.indexable) return "private";
  return "active";
}

export const pageIntentRegistry: readonly PageIntentContract[] = generatedPageRouteInventory
  .filter((entry) => !adsPageRoutes.has(entry.route))
  .map((entry) => ({
    ...defaultContract(entry.route),
    ...priorityContracts[entry.route],
    route: entry.route,
    locale: entry.locale,
    canonicalRoute: entry.canonicalRoute ?? entry.route,
    indexable: entry.indexable,
    sitemap: entry.sitemap,
    status: inferTechnicalStatus(entry),
  }));

export const adsPageIntentContracts: readonly PageIntentContract[] = [
  {
    ...defaultContract("/duesseldorf/reinigung/anfrage"),
    route: "/duesseldorf/reinigung/anfrage",
    locale: "de",
    location: "Düsseldorf",
    pageType: "ads_landing",
    primaryService: "Reinigung",
    primaryIntent: "Reinigung in Düsseldorf in zwei Schritten anfragen",
    secondaryIntent: "Objekt, Leistung, Umfang, Zeitraum und Kontaktweg übermitteln",
    recommendedH1: "Reinigung in Düsseldorf direkt anfragen",
    recommendedSeoTitle: "Reinigung Düsseldorf direkt anfragen | FLOXANT",
    shortTitle: "Reinigung Düsseldorf",
    metaDescription:
      "Reinigung in Düsseldorf für Büro, Praxis, Gewerbe oder private Räume in zwei klaren Schritten anfragen.",
    primaryCta: "Reinigung anfragen",
    parentHub: "/duesseldorf/reinigung",
    canonicalRoute: "/duesseldorf/reinigung",
    indexable: false,
    sitemap: false,
    status: "ads_landing",
  },
  {
    ...defaultContract("/umzug-regensburg/anfrage"),
    route: "/umzug-regensburg/anfrage",
    locale: "de",
    location: "Regensburg",
    pageType: "ads_landing",
    primaryService: "Umzug",
    primaryIntent: "Umzug mit Start oder Ziel in Regensburg in zwei Schritten anfragen",
    secondaryIntent: "Start, Ziel, Umfang, Zugang, Zeitraum und Kontaktweg übermitteln",
    recommendedH1: "Umzug in Regensburg unkompliziert anfragen",
    recommendedSeoTitle: "Umzug Regensburg unkompliziert anfragen | FLOXANT",
    shortTitle: "Umzug Regensburg",
    metaDescription:
      "Start, Ziel, Zeitraum und Umfang für einen Umzug mit Start oder Ziel in Regensburg in zwei klaren Schritten senden.",
    primaryCta: "Umzug anfragen",
    parentHub: "/regensburg/umzug",
    canonicalRoute: "/regensburg/umzug",
    indexable: false,
    sitemap: false,
    status: "ads_landing",
  },
];

export const allPageIntentContracts = [...pageIntentRegistry, ...adsPageIntentContracts] as const;

export function getPageIntentContract(url: string) {
  const normalized = url === "/" ? "/" : `/${url.replace(/^\/+|\/+$/g, "")}`;
  return allPageIntentContracts.find((contract) => contract.route === normalized) ?? null;
}

export function selectPublicPageContent(record: InternalPageRecord): PublicPageContent {
  return sanitizePublicContent({
    publicRoute: record.route,
    publicTitle: record.recommendedSeoTitle,
    publicHeadline: record.recommendedH1,
    publicDescription: record.metaDescription,
    publicLabel: record.shortTitle,
    publicBenefits: [],
    publicRequirements: [],
    publicFaq: [],
    publicCta: record.primaryCta,
  });
}
