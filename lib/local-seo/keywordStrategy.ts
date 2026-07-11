import type { LocalSeoIntentCluster, LocalSeoIntentType, LocalSeoLanguage, LocalSeoRegionKey } from "./types";

type StrategyInput = LocalSeoIntentCluster & {
  path: string;
  locale: LocalSeoLanguage;
  region: LocalSeoRegionKey;
  serviceLabel: string;
};

type FallbackInput = {
  path: string;
  locale: LocalSeoLanguage;
  region: LocalSeoRegionKey;
  cityName: string;
  serviceName: string;
  serviceSearchIntents: readonly string[];
  localModifiers: readonly string[];
};

function strategy(input: StrategyInput): StrategyInput {
  return input;
}

function ctas(locale: LocalSeoLanguage, service: string) {
  if (locale === "en") {
    return [`Send ${service} request`, "Send photos via WhatsApp", "Review an existing quote"];
  }

  return [`${service} anfragen`, "Fotos per WhatsApp senden", "Angebot pruefen lassen"];
}

function h2Topics(locale: LocalSeoLanguage, service: string, city: string) {
  if (locale === "en") {
    return [`${service} in ${city}: local scope`, "Access, photos and timing", "Quote review before booking"];
  }

  return [`${service} in ${city}: lokale Einordnung`, "Leistungsumfang, Zugang und Termin", "Angebot sachlich pruefen"];
}

function nearMe(city: string, service: string) {
  return [`${service} in der Naehe ${city}`, `${service} Naehe ${city}`, `${service} near me ${city}`];
}

const regensburgCleaningProblems = [
  "Flaeche, Objektart, Zustand und Turnus sind vor dem Angebot unklar",
  "Fotos, Zugang, Termin und Uebergabeziel fehlen im bestehenden Angebot",
  "Reinigung muss auf Regensburg und den 50-km-Umkreis begrenzt bleiben",
] as const;

const regensburgServiceProblems = [
  "Umfang, Volumen, Etage und Laufweg sind vor dem Angebot unklar",
  "Umzug, Wohnungsaufloesung und Reinigung werden in einem Preis vermischt",
  "Termin und Uebergabe muessen ruhig vorbereitet werden",
] as const;

const regensburgCleaningModifiers = [
  "Innenstadt",
  "Stadtamhof",
  "Reinhausen",
  "Westenviertel",
  "Kumpfmuehl",
  "Burgweinting",
  "Neutraubling",
  "Lappersdorf",
  "Pentling",
  "Kelheim",
  "Schwandorf",
  "Straubing",
] as const;

export const localSeoKeywordStrategies = [
  strategy({
    path: "/regensburg/reinigung",
    locale: "de-DE",
    region: "regensburg",
    serviceLabel: "Reinigung",
    primaryKeyword: "reinigung regensburg",
    secondaryKeywords: ["reinigungsfirma regensburg", "bueroreinigung regensburg", "gewerbereinigung regensburg"],
    longTailKeywords: [
      "reinigung regensburg 50 km umkreis",
      "reinigung regensburg wohnung buero praxis",
      "reinigungsangebot regensburg pruefen",
    ],
    nearMeKeywords: nearMe("Regensburg", "Reinigung"),
    englishKeywords: ["cleaning service Regensburg", "cleaning company Regensburg"],
    mixedLanguageKeywords: ["cleaning Regensburg Anfrage", "cleaning quote review Regensburg"],
    searchConsoleSignals: ["reinigung regensburg", "reinigungsfirma regensburg", "bueroreinigung regensburg"],
    customerProblems: regensburgCleaningProblems,
    conversionCtas: ctas("de-DE", "Reinigung Regensburg"),
    localModifiers: regensburgCleaningModifiers,
    h2Topics: h2Topics("de-DE", "Reinigung", "Regensburg"),
    intentType: "local",
  }),
  strategy({
    path: "/regensburg/bueroreinigung",
    locale: "de-DE",
    region: "regensburg",
    serviceLabel: "Bueroreinigung",
    primaryKeyword: "bueroreinigung regensburg",
    secondaryKeywords: ["reinigung buero regensburg", "reinigungsfirma buero regensburg", "gewerbereinigung regensburg"],
    longTailKeywords: ["bueroreinigung regensburg angebot einholen", "buero reinigen lassen regensburg"],
    nearMeKeywords: nearMe("Regensburg", "Bueroreinigung"),
    englishKeywords: ["office cleaning Regensburg", "commercial cleaning Regensburg"],
    mixedLanguageKeywords: ["office cleaning Regensburg Angebot", "office cleaning Regensburg quote"],
    searchConsoleSignals: ["bueroreinigung regensburg", "reinigung regensburg"],
    customerProblems: regensburgCleaningProblems,
    conversionCtas: ctas("de-DE", "Bueroreinigung Regensburg"),
    localModifiers: regensburgCleaningModifiers,
    h2Topics: h2Topics("de-DE", "Bueroreinigung", "Regensburg"),
    intentType: "commercial",
  }),
  strategy({
    path: "/regensburg/gewerbereinigung",
    locale: "de-DE",
    region: "regensburg",
    serviceLabel: "Gewerbereinigung",
    primaryKeyword: "gewerbereinigung regensburg",
    secondaryKeywords: ["reinigung gewerbe regensburg", "gebaeudereinigung regensburg", "objektreinigung regensburg"],
    longTailKeywords: ["gewerbereinigung regensburg angebot pruefen", "gewerbeflaechen reinigen lassen regensburg"],
    nearMeKeywords: nearMe("Regensburg", "Gewerbereinigung"),
    englishKeywords: ["commercial cleaning Regensburg", "business cleaning Regensburg"],
    mixedLanguageKeywords: ["commercial cleaning Regensburg Angebot", "facility cleaning Regensburg quote"],
    searchConsoleSignals: ["gewerbereinigung regensburg", "gebaeudereinigung regensburg"],
    customerProblems: regensburgCleaningProblems,
    conversionCtas: ctas("de-DE", "Gewerbereinigung Regensburg"),
    localModifiers: regensburgCleaningModifiers,
    h2Topics: h2Topics("de-DE", "Gewerbereinigung", "Regensburg"),
    intentType: "commercial",
  }),
  strategy({
    path: "/angebot-vergleichen-regensburg",
    locale: "de-DE",
    region: "regensburg",
    serviceLabel: "Reinigungsangebot pruefen",
    primaryKeyword: "reinigungsangebot regensburg pruefen",
    secondaryKeywords: ["reinigungsangebot vergleichen", "angebot reinigung regensburg", "reinigungsfirma angebot"],
    longTailKeywords: ["reinigungsangebot regensburg mit fotos pruefen", "putzfirma angebot regensburg vergleichen"],
    nearMeKeywords: ["reinigungsangebot pruefen regensburg", "reinigungsfirma angebot in der naehe regensburg"],
    englishKeywords: ["cleaning quote review Regensburg", "cleaning offer review Regensburg"],
    mixedLanguageKeywords: ["cleaning quote review Regensburg Angebot", "cleaning offer pruefen Regensburg"],
    searchConsoleSignals: ["reinigungsangebot pruefen", "reinigungsangebot regensburg"],
    customerProblems: regensburgCleaningProblems,
    conversionCtas: ctas("de-DE", "Reinigungsangebot"),
    localModifiers: regensburgCleaningModifiers,
    h2Topics: h2Topics("de-DE", "Reinigungsangebot", "Regensburg"),
    intentType: "quote-check",
  }),
  strategy({
    path: "/en/regensburg/cleaning",
    locale: "en",
    region: "regensburg",
    serviceLabel: "Cleaning service",
    primaryKeyword: "cleaning service Regensburg",
    secondaryKeywords: ["office cleaning Regensburg", "apartment cleaning Regensburg", "move out cleaning Regensburg"],
    longTailKeywords: ["cleaning service Regensburg within 50 km", "cleaning quote review Regensburg"],
    nearMeKeywords: ["cleaning service near me Regensburg", "cleaner near me Regensburg"],
    englishKeywords: ["cleaning service Regensburg", "cleaning company Regensburg"],
    mixedLanguageKeywords: ["Reinigung Regensburg English", "cleaning Regensburg Angebot"],
    searchConsoleSignals: ["cleaning regensburg", "reinigung regensburg"],
    customerProblems: regensburgCleaningProblems,
    conversionCtas: ctas("en", "cleaning service"),
    localModifiers: regensburgCleaningModifiers,
    h2Topics: h2Topics("en", "Cleaning service", "Regensburg"),
    intentType: "english-service",
  }),
] as const satisfies readonly StrategyInput[];

export const localSeoKeywordStrategyByPath = new Map(localSeoKeywordStrategies.map((item) => [item.path, item]));

export const prioritySeoStrategyPaths = localSeoKeywordStrategies.map((item) => item.path) as readonly string[];

export function getSeoIntentCluster(path: string, fallback: FallbackInput): LocalSeoIntentCluster {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const explicit = localSeoKeywordStrategyByPath.get(normalizedPath);
  if (explicit) return explicit;

  return buildFallbackSeoIntentCluster(fallback);
}

export function getSeoStrategyMeta(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return localSeoKeywordStrategyByPath.get(normalizedPath);
}

function buildFallbackSeoIntentCluster(input: FallbackInput): LocalSeoIntentCluster {
  const isEnglish = input.locale === "en";
  const city = input.cityName;
  const service = input.serviceName;
  const baseKeyword = isEnglish ? `${service} ${city}` : `${service.toLowerCase()} ${city}`.trim();
  const fallbackIntentType: LocalSeoIntentType =
    input.serviceName.toLowerCase().includes("angebot") || input.path.includes("angebot")
      ? "quote-check"
      : isEnglish
        ? "english-service"
        : "local";

  return {
    primaryKeyword: baseKeyword,
    secondaryKeywords: input.serviceSearchIntents.map((intent) => `${intent} ${city}`),
    longTailKeywords: [
      isEnglish ? `${service} ${city} with photos and quote review` : `${service} ${city} mit Fotos und Angebotsprüfung`,
      isEnglish ? `${service} ${city} scope access timing` : `${service} ${city} Umfang Zugang Termin`,
    ],
    nearMeKeywords: isEnglish ? [`${service} near me ${city}`] : nearMe(city, service),
    englishKeywords: [`${service} ${city}`, `${service} near me ${city}`],
    mixedLanguageKeywords: isEnglish ? [`${service} ${city} Angebot`] : [`${service} ${city} English`],
    searchConsoleSignals: input.serviceSearchIntents,
    customerProblems: isEnglish
      ? ["scope, timing, access and quote details need a clear first check"]
      : input.path.includes("reinigung")
        ? regensburgCleaningProblems
        : regensburgServiceProblems,
    conversionCtas: ctas(input.locale, service),
    localModifiers: input.localModifiers.slice(0, 12),
    h2Topics: h2Topics(input.locale, service, city),
    intentType: fallbackIntentType,
  };
}
