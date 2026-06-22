import {
  serviceInventory,
  type ServiceAvailability,
  type ServiceCategory,
  type ServiceInventoryItem,
  type ServicePriority,
} from "@/lib/service-inventory";

export type ServiceProduct = {
  serviceKey: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  customerProblem: string;
  suitableFor: readonly string[];
  notSuitableFor: readonly string[];
  requiredInfo: readonly string[];
  optionalInfo: readonly string[];
  effortFactors: readonly string[];
  commonQuestions: readonly string[];
  commonObjections: readonly string[];
  primaryCTA: string;
  contactParams: {
    service: string;
    intent: string;
    source: "seo";
  };
  relatedServices: readonly string[];
  relatedSignatureServices: readonly string[];
  relatedBlogs: readonly string[];
  dusseldorfAvailability: ServiceAvailability;
  regensburgAvailability: ServiceAvailability;
  hasPage: boolean;
  recommendedRoute: string;
  canonicalRoute: string;
  priority: ServicePriority;
  seoIntent: string;
  shortKeywords: readonly string[];
  longTailKeywords: readonly string[];
  faqCandidates: readonly string[];
  aiAnswerCandidate: boolean;
};

type SupplementalProductInput = Omit<
  ServiceProduct,
  | "notSuitableFor"
  | "optionalInfo"
  | "commonQuestions"
  | "commonObjections"
  | "primaryCTA"
  | "contactParams"
  | "relatedServices"
  | "relatedSignatureServices"
  | "relatedBlogs"
  | "hasPage"
  | "canonicalRoute"
  | "priority"
  | "shortKeywords"
  | "longTailKeywords"
  | "faqCandidates"
  | "aiAnswerCandidate"
> &
  Partial<
    Pick<
      ServiceProduct,
      | "notSuitableFor"
      | "optionalInfo"
      | "commonQuestions"
      | "commonObjections"
      | "primaryCTA"
      | "contactParams"
      | "relatedServices"
      | "relatedSignatureServices"
      | "relatedBlogs"
      | "hasPage"
      | "canonicalRoute"
      | "priority"
      | "shortKeywords"
      | "longTailKeywords"
      | "faqCandidates"
      | "aiAnswerCandidate"
    >
  >;

const defaultNotSuitableFor = [
  "Preisgarantie ohne Angaben",
  "Sofortzusage ohne Machbarkeitspruefung",
  "rechtliche Bewertung oder Garantieversprechen",
] as const;

const defaultOptionalInfo = [
  "Fotos",
  "vorhandenes Angebot",
  "Budget oder Preisrahmen",
  "Zugang, Etage, Aufzug oder Zeitfenster",
] as const;

const contactServiceByCategory: Record<ServiceCategory, string> = {
  reinigung: "reinigung",
  umzug_transport: "umzug",
  entruempelung_aufloesung: "entruempelung",
  angebot_pruefen: "angebot-pruefen",
  signature_service: "angebot-pruefen",
};

const knownLeadServices = new Set([
  "reinigung",
  "bueroreinigung",
  "gewerbereinigung",
  "entruempelung",
  "wohnungsaufloesung",
  "umzug",
  "fernumzug",
  "seniorenumzug",
  "klaviertransport",
  "praxisreinigung",
  "fensterreinigung",
  "diskret-service",
  "private-client",
  "angebot-pruefen",
  "kontakt",
  "sonstiges",
]);

function safeContactService(service: string, category: ServiceCategory) {
  return knownLeadServices.has(service) ? service : contactServiceByCategory[category];
}

function buildProductContactHref(service: string, intent: string) {
  return `/kontakt?service=${encodeURIComponent(service)}&intent=${encodeURIComponent(intent)}&source=seo`;
}

function productFromInventory(item: ServiceInventoryItem): ServiceProduct {
  const service = safeContactService(item.contactParams.service, item.category);
  const intent = item.contactParams.intent || item.serviceKey;

  return {
    ...item,
    primaryCTA: buildProductContactHref(service, intent),
    contactParams: {
      service,
      intent,
      source: "seo",
    },
    commonQuestions: item.faqCandidates,
    commonObjections: item.notSuitableFor,
    relatedBlogs: item.blogCandidates,
    aiAnswerCandidate: item.priority === "P0" || item.priority === "P1",
  };
}

function makeSupplementalProduct(input: SupplementalProductInput): ServiceProduct {
  const contactService = safeContactService(input.contactParams?.service || input.serviceKey, input.category);
  const contactIntent = input.contactParams?.intent || input.serviceKey;
  const route = input.recommendedRoute;

  return {
    ...input,
    notSuitableFor: input.notSuitableFor || defaultNotSuitableFor,
    optionalInfo: input.optionalInfo || defaultOptionalInfo,
    commonQuestions:
      input.commonQuestions ||
      [
        `Welche Angaben braucht FLOXANT fuer ${input.name}?`,
        `Wann ist ${input.name} sinnvoll?`,
        "Kann ein vorhandenes Angebot geprueft werden?",
      ],
    commonObjections:
      input.commonObjections ||
      [
        "Ich weiss noch nicht, welcher Service passt.",
        "Ich habe nur Fotos oder ein grobes Angebot.",
        "Ich brauche erst eine realistische Einordnung.",
      ],
    primaryCTA: input.primaryCTA || buildProductContactHref(contactService, contactIntent),
    contactParams: input.contactParams || {
      service: contactService,
      intent: contactIntent,
      source: "seo",
    },
    relatedServices: input.relatedServices || [],
    relatedSignatureServices:
      input.relatedSignatureServices ||
      ["floxant-angebotscheck", "floxant-objektbrief", "floxant-plan-b-service"],
    relatedBlogs: input.relatedBlogs || [`${input.name}: Anfrage und Angebot richtig einordnen`],
    hasPage: input.hasPage ?? false,
    canonicalRoute: input.canonicalRoute || route,
    priority: input.priority || "P2",
    shortKeywords: input.shortKeywords || [input.name],
    longTailKeywords: input.longTailKeywords || [`${input.name} anfragen`, `${input.name} Angebot pruefen`],
    faqCandidates:
      input.faqCandidates ||
      [
        `Welche Angaben sind fuer ${input.name} wichtig?`,
        `Wann sollte ${input.name} mit Fotos angefragt werden?`,
      ],
    aiAnswerCandidate: input.aiAnswerCandidate ?? (input.priority === "P0" || input.priority === "P1"),
  };
}

const supplementalProducts: readonly ServiceProduct[] = [
  makeSupplementalProduct({
    serviceKey: "hotelreinigung",
    name: "Hotelreinigung",
    category: "reinigung",
    shortDescription: "Hotel-, Unterkunfts- und Gaesteflaechen mit Zimmerlogik, Zeitfenster und Objektzustand klaeren.",
    customerProblem: "Taktung, Gaestewechsel und Flaechen werden oft ohne Raumliste beschrieben.",
    suitableFor: ["Hotel", "Gaestehaus", "Apartmenthaus", "Airbnb Turnover nach Pruefung"],
    requiredInfo: ["Ort", "Objektart", "Zimmerzahl", "Zeitfenster", "Turnus", "Ansprechpartner"],
    effortFactors: ["Zimmerzahl", "Sanitaer", "Waeschegrenze", "Check-in-Zeit", "Zugang"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/hotelreinigung-regensburg",
    hasPage: true,
    relatedServices: ["gewerbereinigung", "bueroreinigung", "unterhaltsreinigung"],
    seoIntent: "Hotelreinigung mit Turnus und Zimmerlogik anfragen",
  }),
  makeSupplementalProduct({
    serviceKey: "treppenhausreinigung",
    name: "Treppenhausreinigung",
    category: "reinigung",
    shortDescription: "Treppenhaus, Eingang, Etagen und Gemeinschaftsflaechen nach Turnus und Schluesselweg einordnen.",
    customerProblem: "Hausverwaltungen brauchen klare Flaechen, Turnus, Zugang und Ansprechpartner.",
    suitableFor: ["Hausverwaltung", "Mehrfamilienhaus", "Gewerbeobjekt", "Gemeinschaftsflaechen"],
    requiredInfo: ["Ort", "Etagen", "Turnus", "Zugang", "Ansprechpartner"],
    effortFactors: ["Etagen", "Eingang", "Kelleranteil", "Turnus", "Schluesselweg"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/duesseldorf/treppenhausreinigung",
    hasPage: true,
    relatedServices: ["hausverwaltungsreinigung", "unterhaltsreinigung", "gewerbereinigung"],
    seoIntent: "Treppenhausreinigung nach Turnus und Objekt klaeren",
  }),
  makeSupplementalProduct({
    serviceKey: "unterhaltsreinigung",
    name: "Unterhaltsreinigung",
    category: "reinigung",
    shortDescription: "Wiederkehrende Reinigung mit Raumliste, Turnus, Zeitfenster und klaren Grenzen.",
    customerProblem: "Turnus, Flaechen und Zusatzleistungen werden oft nicht sauber getrennt.",
    suitableFor: ["Buero", "Praxis", "Gewerbeflaeche", "Hausverwaltung"],
    requiredInfo: ["Ort", "Flaeche", "Raumliste", "Turnus", "Zeitfenster"],
    effortFactors: ["Flaeche", "Turnus", "Sanitaer", "Kueche", "Zugang"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/duesseldorf/unterhaltsreinigung",
    hasPage: true,
    relatedServices: ["bueroreinigung", "gewerbereinigung", "praxisreinigung"],
    seoIntent: "Unterhaltsreinigung mit Turnus und Raumliste anfragen",
  }),
  makeSupplementalProduct({
    serviceKey: "wohnungsreinigung",
    name: "Wohnungsreinigung",
    category: "reinigung",
    shortDescription: "Wohnung, Auszug, Uebergabe oder Neustart nach Flaeche, Zustand und Ziel einordnen.",
    customerProblem: "Wohnungsreinigung wird oft mit Haushaltshilfe, Endreinigung oder Grundreinigung vermischt.",
    suitableFor: ["Wohnung", "Auszug", "Uebergabe", "Leerstand", "Zwischennutzung"],
    requiredInfo: ["Ort", "Flaeche", "Raeume", "Zustand", "Termin"],
    effortFactors: ["Bad", "Kueche", "Fenster", "Moebel", "Restmengen"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/duesseldorf/wohnungsreinigung",
    hasPage: true,
    relatedServices: ["endreinigung", "grundreinigung", "reinigung-vor-wohnungsuebergabe"],
    seoIntent: "Wohnungsreinigung nach Zielzustand anfragen",
  }),
  makeSupplementalProduct({
    serviceKey: "eventreinigung",
    name: "Eventreinigung",
    category: "reinigung",
    shortDescription: "Event-, Veranstaltungs- oder Zwischenreinigung nach Zeitfenster, Flaeche und Nutzung klaeren.",
    customerProblem: "Eventreinigung ist stark vom Zeitfenster und von Restmengen abhaengig.",
    suitableFor: ["Veranstaltung", "Gewerbeflaeche", "Zwischenreinigung", "Nachreinigung"],
    requiredInfo: ["Ort", "Eventart", "Flaeche", "Zeitfenster", "Restmengen"],
    effortFactors: ["Zeitfenster", "Personenaufkommen", "Sanitaer", "Abfall", "Zugang"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "needs_manual_confirmation",
    recommendedRoute: "/spezialreinigung",
    relatedServices: ["sonderreinigung", "gewerbereinigung", "spezialreinigung"],
    seoIntent: "Eventreinigung ohne Sofortzusage einordnen",
  }),
  makeSupplementalProduct({
    serviceKey: "reinigung-nach-entruempelung",
    name: "Reinigung nach Entruempelung",
    category: "reinigung",
    shortDescription: "Raeume nach Raeumung wieder nutzbar oder uebergabefaehig machen.",
    customerProblem: "Nach Raeumung bleiben Staub, Laufspuren, Geruch oder Zielzustand offen.",
    suitableFor: ["Wohnungsaufloesung", "Keller", "Nachlass", "Uebergabe", "Neuvermietung"],
    requiredInfo: ["Ort", "Raeume", "Zielzustand", "Termin", "Fotos"],
    effortFactors: ["Reststaub", "Bad", "Kueche", "Boden", "Frist"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/spezialreinigung",
    relatedServices: ["entruempelung", "endreinigung", "wohnungsaufloesung"],
    seoIntent: "Raeumung und Reinigung mit Zielzustand planen",
  }),
  makeSupplementalProduct({
    serviceKey: "pv-anlagen-reinigung",
    name: "PV-Anlagen-Reinigung",
    category: "reinigung",
    shortDescription: "PV-Module nach Fotos, Dachzugang, Wasser, Sicherheitslage und Grenzen einordnen.",
    customerProblem: "PV-Anfragen duerfen nicht mit Ertrags-, Dach- oder Elektroversprechen vermischt werden.",
    suitableFor: ["PV-Anlage", "sichtbare Verschmutzung", "Sicherer Zugang nach Pruefung"],
    notSuitableFor: ["Ertragsgarantie", "Elektroarbeiten", "Dachreparatur", "Betreten ohne Sicherheitspruefung"],
    requiredInfo: ["Ort", "Fotos", "Dachzugang", "Modulflaeche", "Wasseranschluss"],
    effortFactors: ["Dachneigung", "Modulflaeche", "Zugang", "Sicherheitslage", "Verschmutzung"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "needs_manual_confirmation",
    recommendedRoute: "/pv-anlagen-reinigung",
    hasPage: true,
    relatedServices: ["solarreinigung", "spezialreinigung"],
    relatedSignatureServices: ["floxant-pv-sichtklar-service", "floxant-objektbrief"],
    seoIntent: "PV Reinigung ohne Ertragsversprechen pruefen",
  }),
  makeSupplementalProduct({
    serviceKey: "privatumzug",
    name: "Privatumzug",
    category: "umzug_transport",
    shortDescription: "Wohnung oder Haus nach Start, Ziel, Volumen, Etage und Terminfenster klaeren.",
    customerProblem: "Umzugskosten sind ohne Volumen, Laufweg und Zusatzleistungen nicht vergleichbar.",
    suitableFor: ["Wohnung", "Haus", "kleiner Haushalt", "Umzug mit Reinigung"],
    requiredInfo: ["Start", "Ziel", "Volumen", "Etage", "Termin"],
    effortFactors: ["Volumen", "Etage", "Strecke", "Haltezone", "Montage"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/regensburg/umzug",
    hasPage: true,
    relatedServices: ["umzug", "mini-umzug", "umzug-mit-reinigung"],
    seoIntent: "Privatumzug nach Volumen und Zugang anfragen",
  }),
  makeSupplementalProduct({
    serviceKey: "studentenumzug",
    name: "Studentenumzug",
    category: "umzug_transport",
    shortDescription: "Kleine Umzuege mit wenigen Moebeln, engen Zeitfenstern und oft knappen Budgets einordnen.",
    customerProblem: "Auch kleine Umzuege werden durch Etage, Parken und Zeitfenster schnell aufwendig.",
    suitableFor: ["WG-Zimmer", "Studentenwohnung", "Apartment", "kleines Volumen"],
    requiredInfo: ["Start", "Ziel", "Gegenstaende", "Etage", "Termin"],
    effortFactors: ["Etage", "Laufweg", "Haltezone", "Volumen", "Terminfenster"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/spezialumzug",
    relatedServices: ["mini-umzug", "moebeltransport", "beiladung-rueckfahrt"],
    seoIntent: "Studentenumzug als kleiner Umzug pruefen",
  }),
  makeSupplementalProduct({
    serviceKey: "notfallumzug",
    name: "Notfallumzug",
    category: "umzug_transport",
    shortDescription: "Kurzfristiger Umzug oder Anbieter-Ausfall mit ehrlicher Machbarkeitspruefung.",
    customerProblem: "Zeitdruck fuehrt oft zu falschen Sofortversprechen.",
    suitableFor: ["Anbieterabsage", "Deadline", "Plan B", "dringende Klaerung"],
    notSuitableFor: ["24/7-Garantie", "Sofortzusage ohne Umfang", "Preisgarantie"],
    requiredInfo: ["Was ist passiert?", "Start", "Ziel", "Umfang", "Deadline"],
    effortFactors: ["Frist", "Verfuegbarkeit", "Volumen", "Zugang", "Strecke"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/notfall-umzug-bayern",
    hasPage: true,
    relatedServices: ["express-umzug", "plan-b-service", "umzug"],
    relatedSignatureServices: ["floxant-plan-b-service", "floxant-objektbrief"],
    seoIntent: "Notfallumzug ohne Sofortgarantie pruefen",
  }),
  makeSupplementalProduct({
    serviceKey: "trennungs-scheidungsumzug",
    name: "Trennungs-/Scheidungsumzug",
    category: "umzug_transport",
    shortDescription: "Sensibler Umzug mit ruhigem Kontaktweg, klaren Grenzen und diskreter Abstimmung.",
    customerProblem: "Private Lage und Logistik muessen getrennt werden; Rechtsberatung darf nicht behauptet werden.",
    suitableFor: ["Trennung", "Scheidung", "diskreter Umzug", "Kontakt ueber Dritte"],
    notSuitableFor: ["Rechtsberatung", "Mediation", "Sicherheitsdienstleistung"],
    requiredInfo: ["Ort", "Kontaktweg", "grober Umfang", "Zeitfenster", "besondere Diskretion"],
    effortFactors: ["Kommunikation", "Zugang", "Frist", "Freigabe", "Umfang"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/diskreter-umzug-trennung-scheidung",
    hasPage: true,
    relatedServices: ["diskreter-umzug", "private-client-service", "umzug"],
    relatedSignatureServices: ["floxant-diskret-service", "floxant-objektbrief"],
    seoIntent: "diskreten Trennungsumzug ruhig abstimmen",
  }),
  makeSupplementalProduct({
    serviceKey: "garagenentruempelung",
    name: "Garagenentruempelung",
    category: "entruempelung_aufloesung",
    shortDescription: "Garage, Stellplatz oder Nebenflaeche nach Menge, Material, Zugang und Entsorgung klaeren.",
    customerProblem: "Garagen enthalten oft gemischtes Material und schwer einschaetzbare Restmengen.",
    suitableFor: ["Garage", "Stellplatz", "Nebenraum", "Kleinmengen"],
    requiredInfo: ["Ort", "Fotos", "Menge", "Material", "Zugang"],
    effortFactors: ["Menge", "Materialmix", "Laufweg", "Parken", "Entsorgung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/spezial-entruempelung",
    relatedServices: ["kellerentruempelung", "kleinmengen-entsorgung", "entruempelung"],
    seoIntent: "Garage mit Fotos und Entsorgungsweg klaeren",
  }),
  makeSupplementalProduct({
    serviceKey: "dachbodenentruempelung",
    name: "Dachbodenentruempelung",
    category: "entruempelung_aufloesung",
    shortDescription: "Dachboden nach Zugang, Menge, Trageweg, Material und Sicherheitsgrenzen einordnen.",
    customerProblem: "Dachboeden haben oft enge Zugaenge, Staub, unbekannte Mengen und Tragewege.",
    suitableFor: ["Dachboden", "Speicher", "Nebenflaeche", "Altbestand"],
    requiredInfo: ["Ort", "Fotos", "Zugang", "Menge", "Etage"],
    effortFactors: ["Zugang", "Treppen", "Staub", "Menge", "Material"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/spezial-entruempelung",
    relatedServices: ["entruempelung", "kellerentruempelung", "nachlassaufloesung"],
    seoIntent: "Dachbodenraeumung sachlich pruefen",
  }),
  makeSupplementalProduct({
    serviceKey: "bueroaufloesung",
    name: "Bueroaufloesung",
    category: "entruempelung_aufloesung",
    shortDescription: "Buero, Nebenflaeche oder Gewerbeinventar nach Inventar, Zugang und Termin klaeren.",
    customerProblem: "Gewerbeflaechen brauchen Freigabe, Ansprechpartner und klare IT-/Akten-Grenzen.",
    suitableFor: ["Buero", "Kanzlei", "Gewerbeflaeche", "Inventar"],
    notSuitableFor: ["Aktenvernichtung ohne Spezialbeauftragung", "IT-Loeschung", "Gefahrstoffe"],
    requiredInfo: ["Firma", "Ort", "Inventar", "Flaeche", "Termin", "Ansprechpartner"],
    effortFactors: ["Inventar", "Etage", "Demontage", "Zeitfenster", "Entsorgung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/firmenentsorgung",
    hasPage: true,
    relatedServices: ["lageraufloesung", "firmenentsorgung", "gewerbe-auszug"],
    seoIntent: "Bueroaufloesung mit Inventar und Ansprechpartner klaeren",
  }),
  makeSupplementalProduct({
    serviceKey: "lageraufloesung",
    name: "Lageraufloesung",
    category: "entruempelung_aufloesung",
    shortDescription: "Lager, Nebenflaeche oder Restbestand nach Volumen, Material, Zugang und Freigabe sortieren.",
    customerProblem: "Lager wirken einfach, enthalten aber oft gemischte Mengen, Paletten und Sondermaterial.",
    suitableFor: ["Lager", "Nebenflaeche", "Gewerbe", "Restbestand"],
    requiredInfo: ["Ort", "Flaeche", "Material", "Volumen", "Freigabe"],
    effortFactors: ["Volumen", "Material", "Paletten", "Zugang", "Entsorgungsweg"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/spezial-entruempelung",
    relatedServices: ["bueroaufloesung", "firmenentsorgung", "entruempelung"],
    seoIntent: "Lageraufloesung nach Volumen und Material pruefen",
  }),
  makeSupplementalProduct({
    serviceKey: "messie-wohnung",
    name: "Messie-Wohnung",
    category: "entruempelung_aufloesung",
    shortDescription: "Belastete Wohnung wuerdevoll, sachlich und ohne abwertende Sprache nach Freigabe klaeren.",
    customerProblem: "Sensible Raeume brauchen Respekt, Freigabe, Fotos und klare Grenzen.",
    suitableFor: ["belastete Wohnung", "Angehoerige", "Hausverwaltung", "diskrete Raeumung"],
    notSuitableFor: ["Abwertung", "medizinische oder psychologische Beratung", "Einsatz ohne Berechtigung"],
    requiredInfo: ["Ort", "Kontaktweg", "Freigabe", "grober Zustand", "Zielzustand"],
    effortFactors: ["Zustand", "Menge", "Hygienelage", "Zugang", "Diskretion"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "needs_manual_confirmation",
    recommendedRoute: "/spezial-entruempelung",
    relatedServices: ["diskrete-entruempelung", "wohnungsaufloesung", "reinigung-nach-entruempelung"],
    relatedSignatureServices: ["floxant-diskret-service", "floxant-objektbrief"],
    seoIntent: "sensible Raeumung wuerdevoll vorpruefen",
  }),
  makeSupplementalProduct({
    serviceKey: "reinigungsangebot-pruefen",
    name: "Reinigungsangebot pruefen",
    category: "angebot_pruefen",
    shortDescription: "Reinigungsangebot nach Flaeche, Turnus, Zusatzpositionen, Zugang und Zeitfenster einordnen.",
    customerProblem: "Reinigungsangebote sind ohne Raumliste, Turnus und Leistungsgrenzen kaum vergleichbar.",
    suitableFor: ["Bueroreinigung", "Gewerbereinigung", "Wohnungsreinigung", "Spezialreinigung"],
    notSuitableFor: ["Preisgarantie", "Unterbietungszusage", "Rechtsberatung"],
    requiredInfo: ["Angebot", "Flaeche", "Turnus", "Objektart", "Pruefgrund"],
    effortFactors: ["Flaeche", "Turnus", "Sanitaer", "Zeitfenster", "Zusatzpositionen"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/angebot-guenstiger-pruefen",
    hasPage: true,
    relatedServices: ["angebot-pruefen", "bueroreinigung", "gewerbereinigung"],
    relatedSignatureServices: ["floxant-angebotscheck", "floxant-fairpreis-check"],
    seoIntent: "Reinigungsangebot sachlich pruefen lassen",
  }),
  makeSupplementalProduct({
    serviceKey: "solarreinigung-angebot-pruefen",
    name: "Solarreinigung Angebot pruefen",
    category: "angebot_pruefen",
    shortDescription: "Solar- oder PV-Reinigungsangebot nach Zugang, Sicherheit, Umfang und Grenzen pruefen.",
    customerProblem: "PV-Angebote duerfen nicht mit Ertrags-, Dach- oder Elektroversprechen verwechselt werden.",
    suitableFor: ["PV-Angebot", "Solarreinigung", "Sicherheitsfragen", "Fotos vorhanden"],
    notSuitableFor: ["Ertragsgarantie", "Dacharbeiten", "Elektropruefung"],
    requiredInfo: ["Angebot", "Fotos", "Modulflaeche", "Dachzugang", "Pruefgrund"],
    effortFactors: ["Zugang", "Dachneigung", "Modulflaeche", "Wasser", "Sicherheitslage"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "needs_manual_confirmation",
    recommendedRoute: "/angebot-guenstiger-pruefen",
    relatedServices: ["solarreinigung", "pv-anlagen-reinigung", "angebot-pruefen"],
    relatedSignatureServices: ["floxant-pv-sichtklar-service", "floxant-fairpreis-check"],
    seoIntent: "Solarreinigungsangebot ohne Ertragsversprechen pruefen",
  }),
] as const;

export const serviceProducts: readonly ServiceProduct[] = [
  ...serviceInventory.map(productFromInventory),
  ...supplementalProducts.filter(
    (supplement) => !serviceInventory.some((item) => item.serviceKey === supplement.serviceKey),
  ),
];

export const serviceProductsByKey: Readonly<Record<string, ServiceProduct>> = Object.fromEntries(
  serviceProducts.map((product) => [product.serviceKey, product]),
);

export function getServiceProduct(serviceKey: string) {
  return serviceProductsByKey[serviceKey] || null;
}

export function getServiceProductsByCategory(category: ServiceCategory) {
  return serviceProducts.filter((product) => product.category === category);
}

export function getAiAnswerServiceProducts(limit = 12) {
  return serviceProducts
    .filter((product) => product.aiAnswerCandidate)
    .sort((a, b) => a.priority.localeCompare(b.priority) || a.name.localeCompare(b.name))
    .slice(0, limit);
}
