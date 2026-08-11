import { sanitizePublicContent } from "../content/public-content";

export type ServiceStatus =
  | "ACTIVE_PUBLIC"
  | "ACTIVE_SUPPORTING"
  | "SIGNATURE"
  | "SPECIAL_SOLUTION"
  | "INTERNAL_ONLY"
  | "NOT_CURRENTLY_OFFERED"
  | "MANUAL_REVIEW";

export type ServiceLocale = "de" | "en";
export type ServiceCategory = "cleaning" | "moving" | "clearance" | "offer_check";
export type ServiceCadence = "one_off" | "recurring" | "both";
export type ServiceAudienceType = "private" | "business";
export type ServiceRegion = "Düsseldorf" | "Regensburg";
export type ServiceEvidenceStatus =
  | "VERIFIED_PUBLIC"
  | "PARTIALLY_VERIFIED"
  | "MANUAL_REVIEW_REQUIRED";

export type ServiceEvidence = {
  source: string;
  kind: "public_page" | "public_component" | "public_registry" | "route";
  note: string;
};

export type ServiceCallToAction = { label: string; href: string };

export type InternalServiceRecord = {
  id: string;
  slug: string;
  status: ServiceStatus;
  publicVisible: boolean;
  locale: readonly ServiceLocale[];
  category: ServiceCategory;
  cadence: ServiceCadence;
  audienceTypes: readonly ServiceAudienceType[];
  germanName: string;
  englishName: string;
  shortTitle: string;
  seoTitle: string;
  headline: string;
  shortDescription: string;
  detailedDescription: string;
  regions: readonly ServiceRegion[];
  targetAudiences: readonly string[];
  objectTypes: readonly string[];
  problemStatement: string;
  includedServices: readonly string[];
  optionalAddOns: readonly string[];
  excludedServices: readonly string[];
  requiredDetails: readonly string[];
  effortDrivers: readonly string[];
  process: readonly string[];
  cta: ServiceCallToAction;
  canonicalRoute: string;
  regionalPrimaryRoutes: Readonly<Partial<Record<ServiceRegion, string>>>;
  englishAlternativeRoute: string | null;
  additionalRoutes: readonly string[];
  /** Anchored RegExp sources for legacy location and guide routes owned by this core service. */
  readonly legacyRoutePatterns: readonly string[];
  hubRoutes: readonly string[];
  faqIds: readonly string[];
  relatedServiceIds: readonly string[];
  signature: boolean;
  specialSolution: boolean;
  evidence: readonly ServiceEvidence[];
  evidenceStatus: ServiceEvidenceStatus;
  lastReviewedAt: string;
  owner: string;
};

/**
 * Explicit allow-list for data that may cross into public client components.
 * Internal status, evidence, ownership and review fields deliberately have no
 * representation here.
 */
export type PublicServiceContent = {
  publicTitle: string;
  publicEnglishTitle: string;
  publicHeadline: string;
  publicDescription: string;
  publicLabel: string;
  publicBenefits: readonly string[];
  publicRequirements: readonly string[];
  publicFaq: readonly string[];
  publicCta: ServiceCallToAction;
  publicCategory: "Reinigung" | "Umzug und Transport" | "Räumung und Auflösung" | "Angebotsprüfung";
  publicCadence: "Einmalig" | "Regelmäßig" | "Einmalig oder regelmäßig";
  publicAudienceLabels: readonly ("Privat" | "Gewerblich")[];
  publicTargetAudiences: readonly string[];
  publicRegions: readonly ServiceRegion[];
  publicRoute: string;
  publicEnglishRoute: string | null;
  publicBadges: readonly ("Signature Service" | "Speziallösung")[];
};

/** @deprecated Prefer InternalServiceRecord for internal data. */
export type ServiceRegistryEntry = InternalServiceRecord;

type RequiredSeedKeys =
  | "id"
  | "slug"
  | "status"
  | "category"
  | "cadence"
  | "audienceTypes"
  | "germanName"
  | "englishName"
  | "shortDescription"
  | "regions"
  | "problemStatement"
  | "canonicalRoute"
  | "evidence";
type ServiceSeed = Pick<InternalServiceRecord, RequiredSeedKeys> &
  Partial<Omit<InternalServiceRecord, RequiredSeedKeys>>;

export const PUBLIC_SERVICE_STATUSES = [
  "ACTIVE_PUBLIC",
  "SIGNATURE",
  "SPECIAL_SOLUTION",
] as const satisfies readonly ServiceStatus[];

const publicStatusSet = new Set<ServiceStatus>(PUBLIC_SERVICE_STATUSES);
const requestLocationByRegion: Readonly<Record<ServiceRegion, string>> = {
  Düsseldorf: "duesseldorf",
  Regensburg: "regensburg",
};
const defaultRequiredDetails = [
  "Einsatzort oder Postleitzahl",
  "kurze Beschreibung des Bedarfs",
  "gewünschter Termin oder Zeitraum",
  "Kontaktweg",
] as const;
const defaultProcess = [
  "Anfrage mit den bekannten Eckdaten senden",
  "FLOXANT prüft Umfang, Region und offene Punkte",
  "fehlende Angaben werden gezielt geklärt",
  "ein möglicher nächster Schritt wird abgestimmt",
] as const;
const defaultBoundaries = [
  "keine Preisgarantie ohne geprüfte Eckdaten",
  "keine Termin- oder Verfügbarkeitszusage durch die Anfrage",
  "keine Rechtsberatung",
] as const;

function publicPage(source: string, note = "Öffentlich vorhandene Leistungsseite."): ServiceEvidence {
  return { source, kind: "public_page", note };
}

function publicRegistry(source: string, note: string): ServiceEvidence {
  return { source, kind: "public_registry", note };
}

function getDefaultRequestLocation(seed: ServiceSeed) {
  for (const region of seed.regions) {
    const location = requestLocationByRegion[region];
    if (seed.canonicalRoute.includes(location)) return location;
  }
  return seed.regions[0] ? requestLocationByRegion[seed.regions[0]] : "";
}

function defineService(seed: ServiceSeed): InternalServiceRecord {
  const englishAlternativeRoute = seed.englishAlternativeRoute ?? null;
  const requestLocation = getDefaultRequestLocation(seed);
  const defaultCtaHref =
    publicStatusSet.has(seed.status) && requestLocation
      ? `/kontakt?service=${encodeURIComponent(seed.id)}&city=${requestLocation}&source=website`
      : "/kontakt?mode=neutral&source=website";
  return {
    ...seed,
    publicVisible: publicStatusSet.has(seed.status),
    locale: seed.locale ?? (englishAlternativeRoute ? ["de", "en"] : ["de"]),
    shortTitle: seed.shortTitle ?? seed.germanName,
    seoTitle: seed.seoTitle ?? `${seed.germanName} | FLOXANT`,
    headline: seed.headline ?? `${seed.germanName} klar anfragen`,
    detailedDescription: seed.detailedDescription ?? seed.shortDescription,
    targetAudiences: seed.targetAudiences ?? [],
    objectTypes: seed.objectTypes ?? [],
    includedServices: seed.includedServices ?? [],
    optionalAddOns: seed.optionalAddOns ?? [],
    excludedServices: seed.excludedServices ?? defaultBoundaries,
    requiredDetails: seed.requiredDetails ?? defaultRequiredDetails,
    effortDrivers: seed.effortDrivers ?? ["Umfang", "Zugang", "Zustand", "Zeitfenster"],
    process: seed.process ?? defaultProcess,
    cta: seed.cta ?? {
      label: `${seed.germanName} anfragen`,
      href: defaultCtaHref,
    },
    regionalPrimaryRoutes: seed.regionalPrimaryRoutes ?? {},
    englishAlternativeRoute,
    additionalRoutes: seed.additionalRoutes ?? [],
    legacyRoutePatterns: seed.legacyRoutePatterns ?? [],
    hubRoutes: seed.hubRoutes ?? ["/leistungen"],
    faqIds: seed.faqIds ?? [],
    relatedServiceIds: seed.relatedServiceIds ?? [],
    signature: seed.signature ?? seed.status === "SIGNATURE",
    specialSolution: seed.specialSolution ?? seed.status === "SPECIAL_SOLUTION",
    evidenceStatus: seed.evidenceStatus ?? "VERIFIED_PUBLIC",
    lastReviewedAt: seed.lastReviewedAt ?? "2026-07-19",
    owner: seed.owner ?? "FLOXANT Redaktion",
  };
}

const seeds: readonly ServiceSeed[] = [
  {
    id: "reinigung", slug: "reinigung", status: "ACTIVE_PUBLIC", category: "cleaning", cadence: "both",
    audienceTypes: ["private", "business"], germanName: "Reinigung", englishName: "Cleaning service",
    shortDescription: "Reinigung für Wohnungen, Büros, Praxen und gewerbliche Objekte nach Objektart, Zustand und gewünschtem Turnus.",
    problemStatement: "Vor der Anfrage ist häufig unklar, welche Reinigungsart und welcher Umfang zum Objekt passen.",
    regions: ["Düsseldorf", "Regensburg"], targetAudiences: ["Privathaushalte", "Unternehmen", "Vermieter", "Hausverwaltungen"],
    objectTypes: ["Wohnung", "Büro", "Praxis", "Gewerbeobjekt"], includedServices: ["Einordnung der Reinigungsart", "Klärung von Flächen und Zielzustand"],
    optionalAddOns: ["Fensterreinigung", "Grundreinigung", "Endreinigung"], canonicalRoute: "/reinigung",
    regionalPrimaryRoutes: { Düsseldorf: "/duesseldorf/reinigung", Regensburg: "/regensburg/reinigung" },
    englishAlternativeRoute: "/en/regensburg/cleaning", additionalRoutes: ["/duesseldorf/reinigung", "/regensburg/reinigung", "/en/duesseldorf/cleaning"],
    legacyRoutePatterns: [
      "^/(?:[a-z0-9-]+-)?reinigung(?:-[a-z0-9-]+)*$",
      "^/(?:notfall|spezial|teppich)reinigung(?:-[a-z0-9-]+)*$",
      "^/duesseldorf/luxusreinigung$",
      "^/regensburg/reinigungsfirma$",
      "^/reinigungsfirma-angebot$",
    ],
    hubRoutes: ["/leistungen", "/duesseldorf", "/regensburg"], relatedServiceIds: ["bueroreinigung", "grundreinigung", "endreinigung"],
    evidence: [publicPage("app/reinigung/page.tsx"), publicPage("app/duesseldorf/reinigung/page.tsx"), publicPage("app/regensburg/reinigung/page.tsx")],
  },
  {
    id: "ferienwohnung-reinigung",
    slug: "ferienwohnung-reinigung",
    status: "ACTIVE_PUBLIC",
    category: "cleaning",
    cadence: "both",
    audienceTypes: ["private", "business"],
    germanName: "Ferienwohnungs- und Apartmentreinigung",
    englishName: "Holiday apartment cleaning",
    shortTitle: "Ferienwohnung & Apartment",
    seoTitle: "Ferienwohnungs- und Apartmentreinigung | FLOXANT",
    headline: "Gästewechsel für Ferienwohnung und Apartment klar vorbereiten",
    shortDescription:
      "Reinigung und Vorbereitung möblierter Wohnungen, Ferienwohnungen und Apartments zwischen Aufenthalten oder vor einer Übergabe.",
    detailedDescription:
      "FLOXANT prüft Ferienwohnungs- und Apartmentreinigung anhand von Objekt, Fläche, Zustand, Checkout, nächstem Check-in, Zugang und gewünschter Rückmeldung. Wäsche, Schlüsselkoordination, Fotos oder Inventarhinweise gehören nur nach ausdrücklicher Absprache zum Umfang.",
    regions: ["Düsseldorf", "Regensburg"],
    targetAudiences: ["Hosts", "Vermieter", "Betreiber möblierter Apartments", "Hausverwaltungen"],
    objectTypes: ["Ferienwohnung", "möblierte Wohnung", "Apartment", "Serviced Apartment"],
    problemStatement:
      "Zwischen Checkout und nächstem Check-in müssen Reinigungsumfang, Zeitfenster, Zugang und Zusatzwünsche eindeutig zusammenpassen.",
    includedServices: [
      "Einordnung des Reinigungsumfangs zwischen Aufenthalten",
      "Klärung von Checkout, Check-in und Zugang",
      "Abstimmung des gewünschten Zielzustands",
    ],
    optionalAddOns: [
      "Wäschewechsel nach Absprache",
      "Schlüsselkoordination nach Absprache",
      "Fotodokumentation nach Absprache",
      "Inventarhinweise nach Absprache",
    ],
    excludedServices: [
      "keine Partnerschaft oder Vertretung einer Buchungsplattform",
      "keine Hotelstandard- oder Bewertungszusage",
      "keine automatische Wäsche-, Schlüssel- oder Inventarleistung",
      "keine Termin- oder Verfügbarkeitszusage durch die Anfrage",
    ],
    requiredDetails: [
      "Objektort und Objektart",
      "Fläche, Zimmer und Bäder",
      "Checkout und nächster Check-in, falls relevant",
      "Zugang und Schlüsselweg",
      "Zustand, Fotos und gewünschter Zielzustand",
    ],
    effortDrivers: [
      "Fläche und Raumanzahl",
      "aktueller Zustand",
      "Zeitfenster zwischen Checkout und Check-in",
      "Zugang, Etage und Parkweg",
      "Wäsche-, Foto- oder Inventarwünsche",
    ],
    process: [
      "Objekt, Terminfenster und gewünschten Umfang beschreiben",
      "Zugang, Schlüsselweg und mögliche Zusatzwünsche klären",
      "FLOXANT prüft Region, Machbarkeit und offene Punkte",
      "ein möglicher Ablauf wird vor einer Beauftragung abgestimmt",
    ],
    cta: {
      label: "Ferienwohnungsreinigung anfragen",
      href: "/kontakt?service=ferienwohnung-reinigung&city=duesseldorf&intent=ferienwohnung-reinigung-anfrage&source=website",
    },
    canonicalRoute: "/airbnb-turnover-express",
    lastReviewedAt: "2026-07-23",
    additionalRoutes: [
      "/reinigung-moeblierte-wohnung-duesseldorf",
      "/reinigung-moeblierte-wohnung-regensburg",
    ],
    legacyRoutePatterns: ["^/airbnb-reinigung-(?:duesseldorf|regensburg)$"],
    hubRoutes: ["/leistungen", "/duesseldorf", "/regensburg"],
    faqIds: [
      "faq-apartment-cleaning-details-duesseldorf-de",
      "faq-apartment-cleaning-details-regensburg-de",
      "faq-guest-turnover-scope-de",
      "faq-guest-turnover-access-de",
      "faq-guest-turnover-platform-boundary-de",
    ],
    relatedServiceIds: ["reinigung", "endreinigung", "vermieter-ready-service"],
    evidence: [
      publicPage("app/airbnb-turnover-express/page.tsx"),
      publicPage("app/reinigung-moeblierte-wohnung-duesseldorf/page.tsx"),
      publicPage("app/reinigung-moeblierte-wohnung-regensburg/page.tsx"),
      publicRegistry(
        "lib/floxant-services.ts",
        "Der bestehende Service-Katalog führt Gästewechsel mit Reinigung, Kontrolle, Fotos und Vorbereitung für Ferienwohnung oder Apartment.",
      ),
    ],
  },
  {
    id: "bueroreinigung", slug: "bueroreinigung", status: "ACTIVE_PUBLIC", category: "cleaning", cadence: "both",
    audienceTypes: ["business"], germanName: "Büroreinigung", englishName: "Office cleaning",
    shortDescription: "Reinigung von Büros, Kanzleien und vergleichbaren Arbeitsflächen mit Raumliste, Turnus und Zeitfenster.",
    problemStatement: "Fläche, Raumliste, Turnus, Randzeiten und Zugang fehlen häufig in Büroreinigungsanfragen.",
    regions: ["Düsseldorf", "Regensburg"], targetAudiences: ["Unternehmen", "Kanzleien", "Agenturen"],
    objectTypes: ["Büro", "Besprechungsraum", "Küche", "Sanitärbereich"],
    requiredDetails: ["Ort", "Fläche", "Raumliste", "Turnus", "Zeitfenster", "Zugang"], canonicalRoute: "/regensburg/bueroreinigung",
    regionalPrimaryRoutes: { Düsseldorf: "/duesseldorf/bueroreinigung", Regensburg: "/regensburg/bueroreinigung" },
    englishAlternativeRoute: "/en/regensburg/office-cleaning", additionalRoutes: ["/bueroreinigung", "/duesseldorf/bueroreinigung", "/en/duesseldorf/office-cleaning"],
    legacyRoutePatterns: ["^/(?:bueroreinigung(?:-[a-z0-9-]+)?|regensburg/bueroreinigung)$"],
    hubRoutes: ["/leistungen", "/duesseldorf", "/regensburg"], relatedServiceIds: ["gewerbereinigung", "unterhaltsreinigung", "praxisreinigung"],
    evidence: [publicPage("app/bueroreinigung/page.tsx"), publicPage("app/duesseldorf/bueroreinigung/page.tsx"), publicPage("app/regensburg/bueroreinigung/page.tsx")],
  },
  {
    id: "gewerbereinigung", slug: "gewerbereinigung", status: "ACTIVE_PUBLIC", category: "cleaning", cadence: "both",
    audienceTypes: ["business"], germanName: "Gewerbereinigung", englishName: "Commercial cleaning",
    shortDescription: "Reinigung gewerblich genutzter Flächen nach Objektart, Nutzung, Raumliste und Zeitfenster.",
    problemStatement: "Gewerbliche Flächen benötigen einen nachvollziehbaren Leistungsumfang und klare Zuständigkeiten.",
    regions: ["Düsseldorf", "Regensburg"], targetAudiences: ["Unternehmen", "Gewerbebetriebe", "Hausverwaltungen"],
    objectTypes: ["Gewerbefläche", "Laden", "Büro", "Praxis", "Hotelbereich"], canonicalRoute: "/regensburg/gewerbereinigung",
    regionalPrimaryRoutes: { Düsseldorf: "/duesseldorf/gewerbereinigung", Regensburg: "/regensburg/gewerbereinigung" },
    englishAlternativeRoute: "/en/duesseldorf/commercial-cleaning",
    additionalRoutes: ["/gewerbereinigung", "/duesseldorf/gewerbereinigung"], hubRoutes: ["/leistungen", "/duesseldorf", "/regensburg"],
    legacyRoutePatterns: ["^/(?:gewerbe|hotel)reinigung(?:-[a-z0-9-]+)?$"],
    relatedServiceIds: ["bueroreinigung", "praxisreinigung", "unterhaltsreinigung"], evidenceStatus: "PARTIALLY_VERIFIED",
    evidence: [publicPage("app/gewerbereinigung/page.tsx"), publicPage("app/duesseldorf/gewerbereinigung/page.tsx"), publicPage("app/regensburg/gewerbereinigung/page.tsx")],
  },
  {
    id: "praxisreinigung", slug: "praxisreinigung", status: "ACTIVE_PUBLIC", category: "cleaning", cadence: "both",
    audienceTypes: ["business"], germanName: "Praxisreinigung", englishName: "Practice cleaning",
    shortDescription: "Allgemeine Reinigung von Empfang, Wartebereich, Büro-, Sanitär- und Nebenflächen einer Praxis.",
    problemStatement: "Praxisreinigung muss klar von medizinischer Spezialdesinfektion und Laborreinigung abgegrenzt werden.",
    regions: ["Düsseldorf", "Regensburg"], targetAudiences: ["Praxen", "Therapie- und Beratungsräume"],
    objectTypes: ["Empfang", "Wartebereich", "Praxisbüro", "Sanitärbereich"],
    excludedServices: ["OP-Reinigung", "Labor-Spezialdesinfektion", "medizinische Zertifikatsversprechen"],
    canonicalRoute: "/praxisreinigung-regensburg",
    regionalPrimaryRoutes: { Düsseldorf: "/duesseldorf/praxisreinigung", Regensburg: "/praxisreinigung-regensburg" },
    englishAlternativeRoute: "/en/duesseldorf/practice-cleaning",
    additionalRoutes: ["/duesseldorf/praxisreinigung"], hubRoutes: ["/leistungen", "/duesseldorf", "/regensburg"],
    relatedServiceIds: ["bueroreinigung", "gewerbereinigung", "unterhaltsreinigung"], evidenceStatus: "PARTIALLY_VERIFIED",
    evidence: [publicPage("app/praxisreinigung-regensburg/page.tsx"), publicPage("app/duesseldorf/praxisreinigung/page.tsx")],
  },
  {
    id: "fensterreinigung", slug: "fensterreinigung", status: "ACTIVE_PUBLIC", category: "cleaning", cadence: "both",
    audienceTypes: ["private", "business"], germanName: "Fensterreinigung", englishName: "Window cleaning",
    shortDescription: "Fenster, erreichbare Glasflächen und Rahmen nach Anzahl, Höhe, Seite und Zugang reinigen.",
    problemStatement: "Anzahl, Innen- und Außenseite, Etage sowie Erreichbarkeit sind in Anfragen oft nicht beschrieben.",
    regions: ["Düsseldorf", "Regensburg"], targetAudiences: ["Privathaushalte", "Unternehmen", "Praxen", "Hausverwaltungen"],
    objectTypes: ["Fenster", "Glasfläche", "Schaufenster", "Rahmen"],
    excludedServices: ["Seiltechnik ohne Prüfung", "Fassadenkletterei ohne Prüfung"],
    requiredDetails: ["Ort", "Fensterzahl oder Fotos", "Innen- oder Außenseite", "Etage", "Zugang"],
    canonicalRoute: "/fensterreinigung-regensburg",
    regionalPrimaryRoutes: { Düsseldorf: "/duesseldorf/fensterreinigung", Regensburg: "/fensterreinigung-regensburg" },
    englishAlternativeRoute: "/en/duesseldorf/window-cleaning",
    additionalRoutes: ["/duesseldorf/fensterreinigung"],
    hubRoutes: ["/leistungen", "/duesseldorf", "/regensburg"], relatedServiceIds: ["reinigung", "grundreinigung"], evidenceStatus: "PARTIALLY_VERIFIED",
    evidence: [publicPage("app/fensterreinigung-regensburg/page.tsx"), publicPage("app/duesseldorf/fensterreinigung/page.tsx")],
  },
  {
    id: "grundreinigung", slug: "grundreinigung", status: "ACTIVE_PUBLIC", category: "cleaning", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "Grundreinigung", englishName: "Deep cleaning",
    shortDescription: "Intensivere Reinigung für stärker beanspruchte Flächen, wenn normale Unterhaltsreinigung nicht ausreicht.",
    problemStatement: "Der Zielzustand und die Abgrenzung zur normalen Unterhaltsreinigung sind häufig unklar.",
    regions: ["Düsseldorf", "Regensburg"], objectTypes: ["Wohnung", "Büro", "Küche", "Bad", "Objektfläche"],
    canonicalRoute: "/grundreinigung-regensburg",
    regionalPrimaryRoutes: { Düsseldorf: "/duesseldorf/grundreinigung", Regensburg: "/grundreinigung-regensburg" },
    englishAlternativeRoute: "/en/regensburg/deep-cleaning",
    additionalRoutes: ["/duesseldorf/grundreinigung"],
    hubRoutes: ["/leistungen", "/duesseldorf", "/regensburg"], relatedServiceIds: ["reinigung", "endreinigung"],
    evidence: [publicPage("app/grundreinigung-regensburg/page.tsx"), publicPage("app/duesseldorf/grundreinigung/page.tsx")],
  },
  {
    id: "unterhaltsreinigung", slug: "unterhaltsreinigung", status: "ACTIVE_PUBLIC", category: "cleaning", cadence: "recurring",
    audienceTypes: ["business"], germanName: "Unterhaltsreinigung", englishName: "Routine cleaning",
    shortDescription: "Regelmäßige Reinigung von Büros, Praxen, Treppenhäusern und Gewerbeflächen nach Raumliste und Turnus.",
    problemStatement: "Turnus, Raumliste, Zeitfenster und Zugangsweg müssen vor einem regelmäßigen Ablauf geklärt sein.",
    regions: ["Düsseldorf", "Regensburg"], targetAudiences: ["Unternehmen", "Praxen", "Hausverwaltungen"],
    canonicalRoute: "/unterhaltsreinigung-regensburg",
    regionalPrimaryRoutes: { Düsseldorf: "/duesseldorf/unterhaltsreinigung", Regensburg: "/unterhaltsreinigung-regensburg" },
    additionalRoutes: ["/duesseldorf/unterhaltsreinigung"],
    hubRoutes: ["/leistungen", "/duesseldorf", "/regensburg"],
    relatedServiceIds: ["bueroreinigung", "gewerbereinigung", "treppenhausreinigung"], evidenceStatus: "PARTIALLY_VERIFIED",
    evidence: [publicPage("app/unterhaltsreinigung-regensburg/page.tsx"), publicPage("app/duesseldorf/unterhaltsreinigung/page.tsx")],
  },
  {
    id: "treppenhausreinigung", slug: "treppenhausreinigung", status: "ACTIVE_PUBLIC", category: "cleaning", cadence: "recurring",
    audienceTypes: ["business"], germanName: "Treppenhausreinigung", englishName: "Stairwell cleaning",
    shortDescription: "Regelmäßige Reinigung von Eingängen, Treppen, Podesten und vereinbarten Gemeinschaftsflächen.",
    problemStatement: "Bereiche, Etagen, Turnus, Schlüsselweg und Ansprechpartner müssen eindeutig vereinbart werden.",
    regions: ["Düsseldorf", "Regensburg"], targetAudiences: ["Hausverwaltungen", "Eigentümergemeinschaften"],
    requiredDetails: ["Ort", "Etagen", "Bereiche", "Turnus", "Zugang", "Ansprechpartner"], canonicalRoute: "/treppenhausreinigung-regensburg",
    regionalPrimaryRoutes: { Düsseldorf: "/duesseldorf/treppenhausreinigung", Regensburg: "/treppenhausreinigung-regensburg" },
    englishAlternativeRoute: "/en/regensburg/stairwell-cleaning",
    additionalRoutes: ["/duesseldorf/treppenhausreinigung"],
    hubRoutes: ["/leistungen", "/duesseldorf", "/regensburg"],
    relatedServiceIds: ["unterhaltsreinigung", "gewerbereinigung"],
    evidence: [
      publicPage("app/treppenhausreinigung-regensburg/page.tsx"),
      publicPage("app/duesseldorf/treppenhausreinigung/page.tsx"),
    ],
  },
  {
    id: "baureinigung", slug: "baureinigung", status: "ACTIVE_PUBLIC", category: "cleaning", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "Bauendreinigung", englishName: "Post-construction cleaning",
    shortDescription: "Reinigung nach Renovierung, Umbau oder Handwerkerarbeiten mit klarer Grenze zu Sanierung und Mängelhaftung.",
    problemStatement: "Baustaub und Handwerkerreste werden in Anfragen häufig mit Sanierung oder Baumängeln vermischt.",
    regions: ["Düsseldorf", "Regensburg"], excludedServices: ["Sanierung", "Baumängelhaftung", "Gefahrstoff- oder Asbestarbeiten"],
    canonicalRoute: "/baureinigung-regensburg",
    regionalPrimaryRoutes: { Düsseldorf: "/duesseldorf/baureinigung", Regensburg: "/baureinigung-regensburg" },
    additionalRoutes: ["/duesseldorf/baureinigung"],
    hubRoutes: ["/leistungen", "/duesseldorf", "/regensburg"],
    relatedServiceIds: ["grundreinigung", "endreinigung"], evidenceStatus: "PARTIALLY_VERIFIED",
    evidence: [publicPage("app/baureinigung-regensburg/page.tsx"), publicPage("app/duesseldorf/baureinigung/page.tsx")],
  },
  {
    id: "endreinigung", slug: "endreinigung", status: "ACTIVE_PUBLIC", category: "cleaning", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "Endreinigung", englishName: "Move-out cleaning",
    shortDescription: "Reinigung nach Auszug, Umzug oder Räumung vor Rückgabe, Übergabe oder Nachnutzung.",
    problemStatement: "Restmengen, Zielzustand und Übergabetermin werden häufig erst spät gemeinsam betrachtet.",
    regions: ["Regensburg"], excludedServices: ["Abnahmegarantie", "Kautionsgarantie", "rechtliche Bewertung des Mietvertrags"],
    canonicalRoute: "/regensburg/endreinigung", englishAlternativeRoute: "/en/regensburg/move-out-cleaning",
    additionalRoutes: ["/endreinigung-regensburg", "/regensburg/uebergabereinigung"], hubRoutes: ["/leistungen", "/regensburg"],
    legacyRoutePatterns: ["^/regensburg/(?:besenreine-uebergabe|reinigung-nach-umzug)$", "^/reinigungsgarantie$"],
    relatedServiceIds: ["grundreinigung", "entruempelung", "umzug-mit-reinigung"],
    evidence: [publicPage("app/regensburg/endreinigung/page.tsx"), publicPage("app/regensburg/uebergabereinigung/page.tsx")],
  },
  {
    id: "umzug", slug: "umzug", status: "ACTIVE_PUBLIC", category: "moving", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "Umzug", englishName: "Moving service",
    shortDescription: "Privat- und Objektumzug mit Start, Ziel, Volumen, Zugang, Termin und vereinbarten Zusatzleistungen.",
    problemStatement: "Volumen, Etagen, Laufwege, Parken und Zusatzleistungen bestimmen den Aufwand und fehlen oft in Anfragen.",
    regions: ["Regensburg"], targetAudiences: ["Privatpersonen", "Familien", "Unternehmen"], objectTypes: ["Wohnung", "Haus", "Büro"],
    requiredDetails: ["Start", "Ziel", "Etagen", "Aufzug", "Volumen", "Termin", "Fotos"],
    effortDrivers: ["Volumen", "Etagen", "Laufwege", "Parken", "Montage", "Strecke", "Termin"],
    canonicalRoute: "/regensburg/umzug",
    regionalPrimaryRoutes: { Regensburg: "/regensburg/umzug" },
    englishAlternativeRoute: "/en/regensburg/moving", additionalRoutes: ["/umzug"],
    legacyRoutePatterns: [
      "^/(?:24h-umzug|24h-umzugsservice|bueroumzug|diskreter-umzug|familienumzug|fernumzug|kurzfristiger-umzug|notfall-umzug|umzug|umzugskosten|umzugsunternehmen)(?:-[a-z0-9-]+)?$",
      "^/regensburg/(?:umzug-kosten|umzugsservice|umzugsunternehmen)$",
      "^/kinder-umzugsbox$",
    ],
    hubRoutes: ["/leistungen", "/regensburg"], relatedServiceIds: ["seniorenumzug", "moebeltransport", "umzug-mit-reinigung"],
    evidence: [publicPage("app/umzug/page.tsx"), publicPage("app/regensburg/umzug/page.tsx")],
  },
  {
    id: "seniorenumzug", slug: "seniorenumzug", status: "ACTIVE_PUBLIC", category: "moving", cadence: "one_off",
    audienceTypes: ["private"], germanName: "Seniorenumzug", englishName: "Senior moving service",
    shortDescription: "Umzug im Alter mit Angehörigen, Verkleinerung, Sortierung und ruhiger Abstimmung.",
    problemStatement: "Neben dem Transport müssen Auswahl, Kommunikation, Tempo und Übergabe gemeinsam geplant werden.",
    regions: ["Regensburg"], targetAudiences: ["Seniorinnen und Senioren", "Angehörige"],
    canonicalRoute: "/regensburg/seniorenumzug", additionalRoutes: ["/seniorenumzug-bayern", "/seniorenumzug"],
    legacyRoutePatterns: ["^/seniorenumzug(?:-[a-z0-9-]+)?$"],
    hubRoutes: ["/leistungen", "/regensburg"], relatedServiceIds: ["umzug", "haushaltsaufloesung", "diskret-service"],
    evidenceStatus: "PARTIALLY_VERIFIED", evidence: [publicPage("app/regensburg/seniorenumzug/page.tsx")],
  },
  {
    id: "moebeltransport", slug: "moebeltransport", status: "ACTIVE_PUBLIC", category: "moving", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "Möbeltransport", englishName: "Furniture transport",
    shortDescription: "Transport einzelner Möbel oder kleiner Mengen nach Maßen, Gewicht, Etagen, Schutz und Strecke.",
    problemStatement: "Maße, Gewicht, Etagen, Demontage und Schutzbedarf müssen vor dem Transport bekannt sein.",
    regions: ["Regensburg"], requiredDetails: ["Start", "Ziel", "Maße", "Gewicht soweit bekannt", "Etagen", "Fotos", "Termin"],
    canonicalRoute: "/kleintransport-regensburg", additionalRoutes: ["/kleintransporte", "/spezialumzug"],
    hubRoutes: ["/leistungen", "/regensburg"], relatedServiceIds: ["umzug", "klaviertransport", "beiladung-rueckfahrt"], evidenceStatus: "PARTIALLY_VERIFIED",
    evidence: [publicPage("app/kleintransport-regensburg/page.tsx"), publicRegistry("lib/service-inventory.ts", "Bestehendes Inventar führt Möbeltransport mit benötigten Angaben.")],
  },
  {
    id: "klaviertransport", slug: "klaviertransport", status: "ACTIVE_PUBLIC", category: "moving", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "Klaviertransport", englishName: "Piano transport",
    shortDescription: "Klaviertransport nach Instrumenttyp, Gewicht, Treppen, Strecke, Schutz und Machbarkeit.",
    problemStatement: "Ein Klavier benötigt genauere Angaben zu Gewicht, Zugang und Transportweg als ein normaler Möbeltransport.",
    regions: ["Regensburg"], excludedServices: ["Blindzusage ohne Fotos", "Spezialkran ohne Prüfung"],
    requiredDetails: ["Instrumenttyp", "Maße", "Gewicht soweit bekannt", "Etagen", "Fotos", "Start und Ziel"],
    canonicalRoute: "/klaviertransport-regensburg",
    regionalPrimaryRoutes: { Regensburg: "/klaviertransport-regensburg" },
    additionalRoutes: ["/klaviertransport"], hubRoutes: ["/leistungen", "/regensburg"],
    legacyRoutePatterns: ["^/klaviertransport(?:-[a-z0-9-]+)?$"],
    relatedServiceIds: ["moebeltransport", "umzug"], evidenceStatus: "PARTIALLY_VERIFIED", evidence: [publicPage("app/klaviertransport-regensburg/page.tsx")],
  },
  {
    id: "beiladung-rueckfahrt", slug: "beiladung-rueckfahrt", status: "ACTIVE_PUBLIC", category: "moving", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "Beiladung und Rückfahrt", englishName: "Shared-load and return-trip transport",
    shortDescription: "Flexible Transportmöglichkeit, wenn Strecke, Zeitfenster und Volumen zu einer vorhandenen Fahrt passen.",
    problemStatement: "Beiladung ist nur möglich, wenn Route, Termin und Volumen ausreichend flexibel und kompatibel sind.",
    regions: ["Regensburg"], excludedServices: ["garantierte Mitnahme", "fester Termin ohne Kapazitätsprüfung"],
    requiredDetails: ["Start", "Ziel", "Zeitfenster", "Transportgut", "Volumen", "Fotos"], canonicalRoute: "/rueckfahrt-boerse",
    additionalRoutes: ["/beiladung", "/beiladung-regensburg", "/leerfahrt-rueckfahrt"], hubRoutes: ["/leistungen", "/regensburg"],
    relatedServiceIds: ["moebeltransport", "umzug"], evidenceStatus: "PARTIALLY_VERIFIED", evidence: [publicPage("app/rueckfahrt-boerse/page.tsx")],
  },
  {
    id: "entruempelung", slug: "entruempelung", status: "ACTIVE_PUBLIC", category: "clearance", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "Entrümpelung", englishName: "House clearance",
    shortDescription: "Räumung von Wohnung, Keller, Garage oder Objekt nach Menge, Material, Zugang und Freigabe.",
    problemStatement: "Menge, Materialmix, Entsorgungsweg und Zielzustand sind vor einer Räumung häufig unklar.",
    regions: ["Regensburg"], targetAudiences: ["Privathaushalte", "Vermieter", "Unternehmen"],
    objectTypes: ["Wohnung", "Keller", "Garage", "Nebenraum", "Gewerbefläche"],
    requiredDetails: ["Ort", "Fotos", "Menge", "Räume", "Zugang", "Freigabe"], canonicalRoute: "/regensburg/entruempelung",
    regionalPrimaryRoutes: { Regensburg: "/regensburg/entruempelung" },
    englishAlternativeRoute: "/en/regensburg/house-clearance", additionalRoutes: ["/entruempelung"], hubRoutes: ["/leistungen", "/regensburg"],
    legacyRoutePatterns: ["^/(?:entruempelung(?:-[a-z0-9-]+)?|spezial-entruempelung)$"],
    relatedServiceIds: ["kellerentruempelung", "haushaltsaufloesung", "wohnungsaufloesung"],
    evidence: [publicPage("app/entruempelung/page.tsx"), publicPage("app/regensburg/entruempelung/page.tsx")],
  },
  {
    id: "kellerentruempelung", slug: "kellerentruempelung", status: "ACTIVE_PUBLIC", category: "clearance", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "Kellerentrümpelung", englishName: "Basement clearance",
    shortDescription: "Räumung von Keller, Nebenraum oder Müllraum nach Menge, Material, Zugang und Fotos.",
    problemStatement: "Kleine Nebenflächen können durch Materialmix und lange Laufwege schwer einschätzbar sein.",
    regions: ["Regensburg"], canonicalRoute: "/keller-muellraum-rettung-regensburg", hubRoutes: ["/leistungen", "/regensburg"],
    relatedServiceIds: ["entruempelung", "endreinigung"], evidenceStatus: "PARTIALLY_VERIFIED", evidence: [publicPage("app/keller-muellraum-rettung-regensburg/page.tsx")],
  },
  {
    id: "haushaltsaufloesung", slug: "haushaltsaufloesung", status: "ACTIVE_PUBLIC", category: "clearance", cadence: "one_off",
    audienceTypes: ["private"], germanName: "Haushaltsauflösung", englishName: "Household clearance",
    shortDescription: "Auflösung eines Haushalts nach Auszug, Veränderung oder Erbfall mit Freigabe und Zielzustand.",
    problemStatement: "Freigabe, persönliche Gegenstände, Räumung, Entsorgung und Reinigung müssen respektvoll getrennt werden.",
    regions: ["Regensburg"], excludedServices: ["Rechtsberatung", "Wertgutachten", "Nachlassbewertung"],
    canonicalRoute: "/regensburg/haushaltsaufloesung", hubRoutes: ["/leistungen", "/regensburg"],
    relatedServiceIds: ["wohnungsaufloesung", "nachlassaufloesung", "diskret-service"], evidenceStatus: "PARTIALLY_VERIFIED",
    evidence: [publicPage("app/regensburg/haushaltsaufloesung/page.tsx")],
  },
  {
    id: "wohnungsaufloesung", slug: "wohnungsaufloesung", status: "ACTIVE_PUBLIC", category: "clearance", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "Wohnungsauflösung", englishName: "Apartment clearance",
    shortDescription: "Auflösung einer Wohnung nach Auszug, Nachlass oder Leerstand mit Freigabe und vereinbartem Zielzustand.",
    problemStatement: "Freigabe, Fotos, Räumungsumfang, Entsorgung und Reinigung danach müssen gemeinsam geklärt werden.",
    regions: ["Regensburg"], canonicalRoute: "/regensburg/wohnungsaufloesung",
    regionalPrimaryRoutes: { Regensburg: "/regensburg/wohnungsaufloesung" },
    englishAlternativeRoute: "/en/regensburg/apartment-clearance",
    legacyRoutePatterns: ["^/wohnungsaufloesung(?:-[a-z0-9-]+)?$"],
    hubRoutes: ["/leistungen", "/regensburg"], relatedServiceIds: ["haushaltsaufloesung", "entruempelung", "endreinigung"],
    evidence: [publicPage("app/regensburg/wohnungsaufloesung/page.tsx")],
  },
  {
    id: "nachlassaufloesung", slug: "nachlassaufloesung", status: "ACTIVE_PUBLIC", category: "clearance", cadence: "one_off",
    audienceTypes: ["private"], germanName: "Nachlassauflösung", englishName: "Estate clearance",
    shortDescription: "Respektvolle Räumung im Nachlassfall mit geklärter Freigabe, Ansprechpartnern und Grenzen.",
    problemStatement: "Berechtigung, persönliche Gegenstände und emotionale Situation benötigen eine ruhige Vorprüfung.",
    regions: ["Regensburg"], excludedServices: ["Rechtsberatung", "Wertgutachten", "Erbberatung"],
    canonicalRoute: "/nachlass-raeumung-regensburg", hubRoutes: ["/leistungen", "/regensburg"],
    relatedServiceIds: ["haushaltsaufloesung", "wohnungsaufloesung", "diskret-service"], evidenceStatus: "PARTIALLY_VERIFIED",
    evidence: [publicPage("app/nachlass-raeumung-regensburg/page.tsx")],
  },
  {
    id: "angebotscheck", slug: "angebotscheck", status: "SIGNATURE", category: "offer_check", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "FLOXANT Angebotscheck", englishName: "FLOXANT quote review",
    shortDescription: "Vorhandene Angebote anhand von Leistungsumfang, Zugang, Termin, Zusatzpositionen und offenen Angaben einordnen.",
    problemStatement: "Ein Endpreis ist ohne gleichen Leistungsumfang, Zugang und Zusatzpositionen oft nicht sinnvoll vergleichbar.",
    regions: ["Düsseldorf", "Regensburg"], objectTypes: ["Reinigungsangebot", "Umzugsangebot", "Räumungsangebot"],
    excludedServices: ["Rechtsberatung", "Preisgarantie", "Ersparnisgarantie", "Abwertung anderer Anbieter"],
    requiredDetails: ["Angebot oder Screenshot", "Ort", "Leistung", "Umfang", "Termin", "Fotos falls vorhanden"],
    canonicalRoute: "/angebotscheck", englishAlternativeRoute: "/en/regensburg/cleaning-quote-review",
    additionalRoutes: ["/angebot-guenstiger-pruefen", "/angebot-pruefen", "/en/duesseldorf/cleaning-quote-review"], hubRoutes: ["/leistungen", "/signature-services", "/duesseldorf", "/regensburg"],
    relatedServiceIds: ["anbieter-vergleichen", "objektbrief"], evidence: [publicPage("app/angebotscheck/page.tsx")],
  },
  {
    id: "anbieter-vergleichen", slug: "anbieter-vergleichen", status: "SIGNATURE", category: "offer_check", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "FLOXANT Anbietervergleich", englishName: "FLOXANT provider comparison",
    shortDescription: "Angebote und Anbieter anhand derselben Kriterien vergleichen, ohne Rangliste oder Niedrigpreisversprechen.",
    problemStatement: "Preis, Umfang, Termin, Kommunikation und Zusatzpositionen sind zwischen Angeboten oft nicht gleich beschrieben.",
    regions: ["Düsseldorf", "Regensburg"], excludedServices: ["Anbieterrangliste", "Rechtsberatung", "Ersparnisgarantie"],
    canonicalRoute: "/anbieter-vergleichen", additionalRoutes: ["/leistungen-vergleichen"], hubRoutes: ["/leistungen", "/signature-services"],
    legacyRoutePatterns: ["^/(?:angebot-vergleichen-[a-z0-9-]+|regensburg/angebot-vergleichen)$"],
    relatedServiceIds: ["angebotscheck", "objektbrief"], evidence: [publicPage("app/anbieter-vergleichen/page.tsx")],
  },
  {
    id: "objektbrief", slug: "objektbrief", status: "SIGNATURE", category: "offer_check", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "FLOXANT Objektbrief", englishName: "FLOXANT property brief",
    shortDescription: "Klarer Anfrageeinstieg für Objektart, Ort, Termin, Zugang, Fotos und Zielzustand.",
    problemStatement: "Nutzer wissen häufig nicht, welche Angaben für eine belastbare erste Einordnung erforderlich sind.",
    regions: ["Düsseldorf", "Regensburg"], excludedServices: ["automatische Auftragszusage", "verbindliches Angebot ohne Prüfung"],
    canonicalRoute: "/objektbrief", hubRoutes: ["/leistungen", "/signature-services"],
    relatedServiceIds: ["angebotscheck", "uebergabeakte"], evidence: [publicPage("app/objektbrief/page.tsx")],
  },
  {
    id: "uebergabeakte", slug: "uebergabeakte", status: "SIGNATURE", category: "offer_check", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "FLOXANT Übergabeakte", englishName: "FLOXANT handover brief",
    shortDescription: "Fotos, offene Punkte, Schlüsselstatus und Termin für eine Objektübergabe übersichtlich zusammenführen.",
    problemStatement: "Vor Übergaben sind Restpunkte, Fotos, Schlüssel und Zuständigkeiten häufig nicht gemeinsam dokumentiert.",
    regions: ["Düsseldorf", "Regensburg"], excludedServices: ["rechtliche Übergabeberatung", "Abnahme- oder Kautionsgarantie"],
    canonicalRoute: "/uebergabeakte", hubRoutes: ["/leistungen", "/signature-services"],
    legacyRoutePatterns: ["^/schluesseluebergabe$"],
    relatedServiceIds: ["objektbrief", "endreinigung", "entruempelung"], evidence: [publicPage("app/uebergabeakte/page.tsx")],
  },
  {
    id: "uebergabe-sprint", slug: "uebergabe-sprint", status: "MANUAL_REVIEW", category: "offer_check", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "FLOXANT Übergabe-Sprint", englishName: "FLOXANT handover prioritisation",
    shortDescription: "Kurzfristige Priorisierung von Restmengen, Reinigung, Fotos und Schlüsselweg vor einer Übergabe.",
    problemStatement: "Bei naher Frist müssen offene Aufgaben nach Machbarkeit und Wichtigkeit geordnet werden.",
    regions: [], excludedServices: ["Soforteinsatzgarantie", "vollständige Erledigung ohne Kapazitätsprüfung"],
    canonicalRoute: "/uebergabe-sprint", hubRoutes: ["/leistungen", "/signature-services"],
    relatedServiceIds: ["uebergabeakte", "plan-b-service", "endreinigung"], evidenceStatus: "MANUAL_REVIEW_REQUIRED",
    evidence: [publicRegistry("lib/signature-special-services.ts", "Öffentliche Referenz vorhanden, statische Zielseite fehlt.")],
  },
  {
    id: "plan-b-service", slug: "plan-b-service", status: "SIGNATURE", category: "offer_check", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "FLOXANT Plan-B-Service", englishName: "FLOXANT backup assessment",
    shortDescription: "Machbarkeit und nächste Schritte prüfen, wenn ein Anbieter ausfällt oder ein Termin unsicher wird.",
    problemStatement: "Ein geplanter Ablauf wird durch Absage, fehlende Rückmeldung oder offene Leistungen unsicher.",
    regions: ["Düsseldorf", "Regensburg"], excludedServices: ["Notdienstgarantie", "Soforteinsatzgarantie", "garantierte Übernahme"],
    canonicalRoute: "/plan-b-service", hubRoutes: ["/leistungen", "/signature-services"],
    relatedServiceIds: ["angebotscheck", "uebergabe-sprint"], evidence: [publicPage("app/plan-b-service/page.tsx")],
  },
  {
    id: "diskret-service", slug: "diskret-service", status: "SPECIAL_SOLUTION", category: "clearance", cadence: "one_off",
    audienceTypes: ["private"], germanName: "FLOXANT Diskret-Service", englishName: "FLOXANT discreet request",
    shortDescription: "Datensparsamer Anfrageweg für sensible Umzugs-, Räumungs-, Nachlass- oder Reinigungssituationen.",
    problemStatement: "Sensible Situationen benötigen einen ruhigen Kontaktweg ohne unnötige private Details im ersten Schritt.",
    regions: ["Düsseldorf", "Regensburg"], excludedServices: ["Rechtsberatung", "Pflegeberatung", "medizinische oder psychologische Beratung", "Verfügbarkeitsgarantie"],
    requiredDetails: ["grober Servicebedarf", "Ort", "bevorzugter Kontaktweg", "kurze Beschreibung", "Frist falls wichtig"],
    canonicalRoute: "/diskret-service", additionalRoutes: ["/private-client-service"], hubRoutes: ["/leistungen", "/signature-services", "/regensburg"],
    relatedServiceIds: ["nachlassaufloesung", "haushaltsaufloesung", "objektbrief"], evidence: [publicPage("app/diskret-service/page.tsx")],
  },
  {
    id: "umzug-mit-reinigung", slug: "umzug-mit-reinigung", status: "SPECIAL_SOLUTION", category: "moving", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "Umzug mit Reinigung", englishName: "Moving with cleaning",
    shortDescription: "Kombinierte Anfrage, wenn Transport, Restmengen, Endreinigung und Übergabe zusammen geplant werden sollen.",
    problemStatement: "Getrennte Planung von Umzug und Reinigung kann Restmengen, Zugang und Übergabetermin übersehen.",
    regions: ["Regensburg"], excludedServices: ["pauschale Komplettzusage ohne Prüfung", "Abnahme- oder Kautionsgarantie"],
    canonicalRoute: "/umzug-mit-reinigung", englishAlternativeRoute: "/en/regensburg/cleaning-after-moving",
    additionalRoutes: ["/regensburg/umzug-reinigung", "/umzug-reinigung-regensburg"], hubRoutes: ["/leistungen", "/regensburg"],
    relatedServiceIds: ["umzug", "endreinigung", "entruempelung"],
    evidence: [publicPage("app/umzug-mit-reinigung/page.tsx"), publicPage("app/regensburg/umzug-reinigung/page.tsx")],
  },
  {
    id: "glasreinigung", slug: "glasreinigung", status: "MANUAL_REVIEW", category: "cleaning", cadence: "both",
    audienceTypes: ["private", "business"], germanName: "Glasreinigung", englishName: "Glass cleaning",
    shortDescription: "Mögliche Bezeichnung für Glasflächen; Abgrenzung zur belegten Fensterreinigung ist noch nicht verbindlich geklärt.",
    problemStatement: "Das bestehende Inventar führt die Leistung nur mit manueller Verfügbarkeitsprüfung.", regions: [],
    canonicalRoute: "/glasreinigung", hubRoutes: ["/spezialreinigung"], relatedServiceIds: ["fensterreinigung"],
    evidenceStatus: "MANUAL_REVIEW_REQUIRED", evidence: [publicRegistry("lib/service-inventory.ts", "Beide Regionen sind needs_manual_confirmation.")],
  },
  {
    id: "solarreinigung", slug: "solarreinigung", status: "MANUAL_REVIEW", category: "cleaning", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "Solar- und PV-Anlagen-Reinigung", englishName: "Solar panel cleaning",
    shortDescription: "Bestehende öffentliche Inhalte zur PV-Reinigung, deren reale regionale Verfügbarkeit noch bestätigt werden muss.",
    problemStatement: "Zugang, Sicherheit und tatsächliche regionale Verfügbarkeit sind nicht verbindlich bestätigt.", regions: [],
    excludedServices: ["Ertragsgarantie", "Elektroarbeiten", "Dacharbeiten", "Reparaturen"], canonicalRoute: "/pv-anlagen-reinigung",
    additionalRoutes: ["/solarreinigung", "/regensburg/solarreinigung"], hubRoutes: ["/spezialreinigung"],
    evidenceStatus: "MANUAL_REVIEW_REQUIRED", evidence: [publicPage("app/pv-anlagen-reinigung/page.tsx"), publicRegistry("lib/service-inventory.ts", "Verfügbarkeit beider Regionen ist needs_manual_confirmation.")],
  },
  {
    id: "mini-umzug", slug: "mini-umzug", status: "MANUAL_REVIEW", category: "moving", cadence: "one_off",
    audienceTypes: ["private"], germanName: "Mini-Umzug", englishName: "Small move",
    shortDescription: "Bestehende Bezeichnung für kleine Umzüge; als eigene Kernleistung noch nicht ausreichend abgegrenzt.",
    problemStatement: "Der Eintrag ist eine Umfangsvariante des Kernservices Umzug und benötigt manuelle Bestätigung.", regions: [],
    canonicalRoute: "/mini-umzug", hubRoutes: ["/spezialumzug"], relatedServiceIds: ["umzug", "moebeltransport"],
    evidenceStatus: "MANUAL_REVIEW_REQUIRED", evidence: [publicRegistry("lib/service-inventory.ts", "Nur Regensburg wird als verfügbar geführt; eigene statische Route fehlt.")],
  },
  {
    id: "express-umzug", slug: "express-umzug", status: "MANUAL_REVIEW", category: "moving", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "Express-Umzug", englishName: "Urgent move",
    shortDescription: "Bestehender Dringlichkeitsbegriff ohne Sofortgarantie; als eigenes Angebot noch zu bestätigen.",
    problemStatement: "Dringlichkeit allein begründet keine eigenständige Leistung oder garantierte Verfügbarkeit.", regions: [],
    excludedServices: ["24/7-Sofortgarantie", "Zusage ohne Umfang", "Preisgarantie"], canonicalRoute: "/express-umzug",
    hubRoutes: ["/spezialumzug"], relatedServiceIds: ["umzug", "plan-b-service"], evidenceStatus: "MANUAL_REVIEW_REQUIRED",
    evidence: [publicRegistry("lib/service-inventory.ts", "Die Verfügbarkeit ist regional eingeschränkt und benötigt Prüfung.")],
  },
  {
    id: "fairpreis-check", slug: "fairpreis-check", status: "MANUAL_REVIEW", category: "offer_check", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "FLOXANT Fairpreis-Check", englishName: "FLOXANT fair-price check",
    shortDescription: "Bestehende Markenbezeichnung, deren angegebene Route im statischen App-Verzeichnis nicht vorhanden ist.",
    problemStatement: "Funktion und Abgrenzung zum belegten Angebotscheck sind nicht ausreichend eigenständig belegt.", regions: [],
    canonicalRoute: "/fairpreis-check", hubRoutes: ["/signature-services"], relatedServiceIds: ["angebotscheck"],
    evidenceStatus: "MANUAL_REVIEW_REQUIRED", evidence: [publicRegistry("lib/signature-special-services.ts", "Öffentliche Referenz vorhanden, statische Zielseite fehlt.")],
  },
  {
    id: "rueckfahrt-radar", slug: "rueckfahrt-radar", status: "MANUAL_REVIEW", category: "moving", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "FLOXANT Rückfahrt-Radar", englishName: "FLOXANT return-trip check",
    shortDescription: "Bestehende Markenbezeichnung für Rückfahrt und Beiladung ohne eigene belegte Zielseite.",
    problemStatement: "Die Funktion überschneidet sich mit Beiladung und Rückfahrt; die angegebene Route fehlt.", regions: [],
    canonicalRoute: "/rueckfahrt-radar", hubRoutes: ["/signature-services"], relatedServiceIds: ["beiladung-rueckfahrt"],
    evidenceStatus: "MANUAL_REVIEW_REQUIRED", evidence: [publicRegistry("lib/signature-special-services.ts", "Öffentliche Referenz vorhanden, statische Zielseite fehlt.")],
  },
  {
    id: "vermieter-ready-service", slug: "vermieter-ready-service", status: "MANUAL_REVIEW", category: "clearance", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "FLOXANT Vermieter-Ready-Service", englishName: "FLOXANT landlord-ready service",
    shortDescription: "Bestehende Markenbezeichnung für Objektvorbereitung ohne eigene belegte Zielseite.",
    problemStatement: "Die Funktion überschneidet sich mit Endreinigung und Übergabevorbereitung und ist nicht eigenständig bestätigt.", regions: [],
    canonicalRoute: "/vermieter-ready-service", hubRoutes: ["/signature-services"], relatedServiceIds: ["endreinigung", "uebergabeakte"],
    evidenceStatus: "MANUAL_REVIEW_REQUIRED", evidence: [publicRegistry("lib/signature-special-services.ts", "Öffentliche Referenz vorhanden, statische Zielseite fehlt.")],
  },
  {
    id: "buero-startklar-service", slug: "buero-startklar-service", status: "MANUAL_REVIEW", category: "cleaning", cadence: "one_off",
    audienceTypes: ["business"], germanName: "FLOXANT Büro-Startklar-Service", englishName: "FLOXANT office-ready service",
    shortDescription: "Bestehende Markenbezeichnung, die derzeit lediglich auf die Büroreinigung verweist.",
    problemStatement: "Eine eigenständige Funktion gegenüber Büro- und Grundreinigung ist nicht belegt.", regions: [],
    canonicalRoute: "/regensburg/bueroreinigung", hubRoutes: ["/signature-services"], relatedServiceIds: ["bueroreinigung", "grundreinigung"],
    evidenceStatus: "MANUAL_REVIEW_REQUIRED", evidence: [publicRegistry("lib/signature-special-services.ts", "Eintrag verweist auf eine Kernleistung statt auf eine eigene Funktion.")],
  },
  {
    id: "pv-sichtklar-service", slug: "pv-sichtklar-service", status: "MANUAL_REVIEW", category: "cleaning", cadence: "one_off",
    audienceTypes: ["private", "business"], germanName: "FLOXANT PV-Sichtklar-Service", englishName: "FLOXANT PV visual assessment",
    shortDescription: "Bestehende Markenbezeichnung für die Einordnung einer PV-Reinigungsanfrage.",
    problemStatement: "Die zugrunde liegende Solarreinigung ist regional noch nicht bestätigt.", regions: [],
    canonicalRoute: "/pv-anlagen-reinigung", hubRoutes: ["/signature-services"], relatedServiceIds: ["solarreinigung"],
    evidenceStatus: "MANUAL_REVIEW_REQUIRED", evidence: [publicRegistry("lib/service-inventory.ts", "Beide Regionen sind needs_manual_confirmation.")],
  },
  {
    id: "entscheidungs-kompass", slug: "entscheidungs-kompass", status: "ACTIVE_SUPPORTING", category: "offer_check", cadence: "both",
    audienceTypes: ["private", "business"], germanName: "FLOXANT Entscheidungs-Kompass", englishName: "FLOXANT service guidance",
    shortDescription: "Bestehende Auswahlhilfe, die zu einer passenden öffentlichen Leistung führt, aber selbst keine Leistung ist.",
    problemStatement: "Nutzer kennen die passende Servicekategorie noch nicht.", regions: [], includedServices: ["regelbasierte Auswahlhilfe"],
    canonicalRoute: "/signature-services", hubRoutes: ["/leistungen"], evidenceStatus: "PARTIALLY_VERIFIED",
    evidence: [publicPage("app/signature-services/page.tsx", "Öffentlicher Hub enthält eine Entscheidungshilfe.")],
  },
];

export const serviceRegistry: readonly InternalServiceRecord[] = seeds.map(defineService);

const duplicateIds = serviceRegistry.map(({ id }) => id).filter((id, index, ids) => ids.indexOf(id) !== index);
if (duplicateIds.length > 0) {
  throw new Error(`Duplicate service registry ids: ${Array.from(new Set(duplicateIds)).join(", ")}`);
}

for (const service of serviceRegistry) {
  if (service.publicVisible && service.regions.length === 0) {
    throw new Error(`Public service ${service.id} requires at least one verified region.`);
  }
  if (service.publicVisible && !service.cta.href) {
    throw new Error(`Public service ${service.id} requires a CTA.`);
  }
}

export const publicServices: readonly InternalServiceRecord[] = serviceRegistry.filter(({ publicVisible }) => publicVisible);

const publicCategoryLabels: Readonly<Record<ServiceCategory, PublicServiceContent["publicCategory"]>> = {
  cleaning: "Reinigung",
  moving: "Umzug und Transport",
  clearance: "Räumung und Auflösung",
  offer_check: "Angebotsprüfung",
};

const publicCadenceLabels: Readonly<Record<ServiceCadence, PublicServiceContent["publicCadence"]>> = {
  one_off: "Einmalig",
  recurring: "Regelmäßig",
  both: "Einmalig oder regelmäßig",
};

export function selectPublicServiceFields(
  service: InternalServiceRecord,
  overrides: Partial<PublicServiceContent> = {},
): PublicServiceContent {
  return sanitizePublicContent({
    publicTitle: service.germanName,
    publicEnglishTitle: service.englishName,
    publicHeadline: service.headline,
    publicDescription: service.shortDescription,
    publicLabel: service.shortTitle,
    publicBenefits: service.includedServices,
    publicRequirements: service.requiredDetails,
    publicFaq: [],
    publicCta: { label: service.cta.label, href: service.cta.href },
    publicCategory: publicCategoryLabels[service.category],
    publicCadence: publicCadenceLabels[service.cadence],
    publicAudienceLabels: service.audienceTypes.map((audience) => audience === "private" ? "Privat" as const : "Gewerblich" as const),
    publicTargetAudiences: service.targetAudiences,
    publicRegions: service.regions,
    publicRoute: service.canonicalRoute,
    publicEnglishRoute: service.englishAlternativeRoute,
    publicBadges: [
      ...(service.signature ? ["Signature Service" as const] : []),
      ...(service.specialSolution ? ["Speziallösung" as const] : []),
    ],
    ...overrides,
  });
}

export const publicServiceContents: readonly PublicServiceContent[] =
  publicServices.map((service) => selectPublicServiceFields(service));

export function getPublicServiceContentsByLocale(locale: ServiceLocale): readonly PublicServiceContent[] {
  return publicServices
    .filter((service) => service.locale.includes(locale))
    .map((service) => selectPublicServiceFields(service));
}

export function getServiceById(id: string): InternalServiceRecord | undefined {
  return serviceRegistry.find((service) => service.id === id);
}

export function getServicesByLocale(locale: ServiceLocale): readonly ServiceRegistryEntry[] {
  return publicServices.filter((service) => service.locale.includes(locale));
}

export function getServicesByCategory(category: ServiceCategory): readonly ServiceRegistryEntry[] {
  return publicServices.filter((service) => service.category === category);
}

export function getPublicServicesByRegion(region: ServiceRegion): readonly ServiceRegistryEntry[] {
  return publicServices.filter((service) => service.regions.includes(region));
}

export function isPublicServiceStatus(status: ServiceStatus): boolean {
  return publicStatusSet.has(status);
}
