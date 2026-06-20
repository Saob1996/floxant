export type LocalSeoRegionKey = "duesseldorf" | "regensburg";
export type LocalSeoMaturityLevel = "M0" | "M1" | "M2" | "M3";
export type LocalSeoIndexStatus = "index" | "noindex";
export type LocalSeoLanguage = "de-DE" | "en";
export type LocalSeoServiceKey =
  | "reinigung"
  | "grundreinigung"
  | "putzfirma"
  | "reinigungsdienst"
  | "haushaltsreinigung"
  | "wohnungsreinigung"
  | "treppenhausreinigung"
  | "gebaeudereinigung"
  | "bueroreinigung"
  | "gewerbereinigung"
  | "praxisreinigung"
  | "kanzleireinigung"
  | "gewerbeflaechen-reinigung"
  | "geruchsneutralisation"
  | "angebot-vergleichen"
  | "umzug"
  | "umzugsservice"
  | "umzugsunternehmen"
  | "umzug-kosten"
  | "seniorenumzug"
  | "entruempelung"
  | "wohnungsaufloesung"
  | "reinigung-nach-umzug";

export type LocalSeoPageType =
  | "regionHub"
  | "offerHub"
  | "centerService"
  | "cityService"
  | "districtService";

export type LocalSeoLink = {
  href: string;
  label: string;
  text?: string;
};

export type LocalSeoFaq = {
  q: string;
  a: string;
};

export type LocalSeoSection = {
  title: string;
  body: readonly string[];
};

export type LocalSeoIntentType =
  | "commercial"
  | "transactional"
  | "local"
  | "quote-check"
  | "english-service";

export type LocalSeoIntentCluster = {
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  longTailKeywords: readonly string[];
  nearMeKeywords: readonly string[];
  englishKeywords: readonly string[];
  mixedLanguageKeywords: readonly string[];
  searchConsoleSignals: readonly string[];
  customerProblems: readonly string[];
  conversionCtas: readonly string[];
  localModifiers: readonly string[];
  h2Topics: readonly string[];
  intentType: LocalSeoIntentType;
};

export type LocalSeoLanguageAlternate = {
  hreflang: "de-DE" | "en" | "x-default";
  path: string;
};

export type LocalSeoMaturitySnapshot = {
  indexStatus: LocalSeoIndexStatus;
  maturityLevel: LocalSeoMaturityLevel;
  passedChecks: readonly string[];
  missingChecks?: readonly string[];
};

export type LocalSeoCityRecord = {
  slug: string;
  displayName: string;
  region: LocalSeoRegionKey;
  parentHub: string;
  serviceFocus: readonly string[];
  nearbyCities: readonly string[];
  districts: readonly string[];
  customerTypes: readonly string[];
  relevantServices: readonly LocalSeoServiceKey[];
  specialCases: readonly string[];
  localIntro: string;
  localProofNotes: readonly string[];
  maturity: LocalSeoMaturitySnapshot;
};

export type LocalSeoDistrictRecord = LocalSeoCityRecord & {
  citySlug: "duesseldorf" | "regensburg";
  cityName: "Düsseldorf" | "Regensburg";
};

export type LocalSeoPageConfig = {
  key: string;
  type: LocalSeoPageType;
  locale: LocalSeoLanguage;
  slug: string;
  path: string;
  region: LocalSeoRegionKey;
  city: LocalSeoCityRecord | LocalSeoDistrictRecord;
  serviceKey: LocalSeoServiceKey;
  serviceName: string;
  serviceType: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  heroText: string;
  localIntro: string;
  localProofNotes: readonly string[];
  serviceFocus: readonly string[];
  customerTypes: readonly string[];
  relevantServices: readonly string[];
  specialCases: readonly string[];
  nearbyCities: readonly string[];
  districts: readonly string[];
  sections: readonly LocalSeoSection[];
  process: readonly string[];
  offerCheck: {
    title: string;
    body: string;
  };
  faq: readonly LocalSeoFaq[];
  internalLinks: readonly LocalSeoLink[];
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  whatsappMessage: string;
  seo: LocalSeoIntentCluster;
  languageAlternates: readonly LocalSeoLanguageAlternate[];
  maturity: LocalSeoMaturitySnapshot;
};
