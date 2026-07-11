import type { LeadPriority, LeadService } from "@/lib/lead-intents";
import { getLocationDisplayName } from "@/lib/customer-labels";

export type ServiceRoutingCategory =
  | "cleaning"
  | "moving"
  | "clearance"
  | "offer-check"
  | "signature"
  | "discreet"
  | "unclear";

export type ContactFieldGroupKey =
  | "core"
  | "cleaning"
  | "b2b-cleaning"
  | "property-cleaning"
  | "moving"
  | "clearance"
  | "offer-check"
  | "discreet"
  | "english"
  | "special-transport"
  | "solar-pv"
  | "handover";

export type ContactSuccessStateKey =
  | "general-success"
  | "cleaning-success"
  | "b2b-success"
  | "property-cleaning-success"
  | "moving-success"
  | "clearance-success"
  | "offer-check-success"
  | "discreet-success"
  | "english-success"
  | "special-transport-success"
  | "solar-pv-success"
  | "handover-success";

export type ServiceRoutingEntry = {
  serviceKey: string;
  label: string;
  category: ServiceRoutingCategory;
  contactService: LeadService;
  defaultIntent: string;
  priority: LeadPriority;
  defaultCity?: string;
  supportedCities: readonly string[];
  aliases: readonly string[];
  fieldGroup: ContactFieldGroupKey;
  successState: ContactSuccessStateKey;
  relatedServices: readonly string[];
  internalRoute?: string;
  noApiOnSelect: true;
};

export type ServiceRouteInput = {
  serviceKey?: string | null;
  service?: string | null;
  city?: string | null;
  intent?: string | null;
  priority?: string | null;
  source?: string | null;
  destination?: string;
  anchor?: string;
};

export type ServiceRouteResult = {
  entry: ServiceRoutingEntry;
  serviceKey: string;
  service: LeadService;
  city: string;
  cityLabel: string;
  intent: string;
  priority: LeadPriority;
  href: string;
  manualReview: boolean;
};

const cityLabels: Record<string, string> = {
  bayern: "Bayern",
  deutschland: "Deutschland",
  duesseldorf: "Düsseldorf",
  landshut: "Landshut",
  muenchen: "Muenchen",
  nuernberg: "Nuernberg",
  regensburg: "Regensburg",
  unbekannt: "Ort offen",
};

export const serviceRoutingMatrix: readonly ServiceRoutingEntry[] = [
  {
    serviceKey: "reinigung",
    label: "Reinigung",
    category: "cleaning",
    contactService: "reinigung",
    defaultIntent: "reinigung-anfrage",
    priority: "p1",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "bayern", "duesseldorf"],
    aliases: ["cleaning", "cleaning-service", "house-cleaning", "endreinigung", "grundreinigung"],
    fieldGroup: "cleaning",
    successState: "cleaning-success",
    relatedServices: ["bueroreinigung", "entruempelung", "angebot-pruefen"],
    internalRoute: "/reinigung",
    noApiOnSelect: true,
  },
  {
    serviceKey: "bueroreinigung",
    label: "Büro- und Gewerbereinigung",
    category: "cleaning",
    contactService: "bueroreinigung",
    defaultIntent: "b2b-bueroreinigung",
    priority: "p0",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["office-cleaning", "b2b", "b2b-cleaning", "buero-reinigung", "bueroreinigung"],
    fieldGroup: "b2b-cleaning",
    successState: "b2b-success",
    relatedServices: ["gewerbereinigung", "praxisreinigung", "unterhaltsreinigung"],
    internalRoute: "/bueroreinigung",
    noApiOnSelect: true,
  },
  {
    serviceKey: "gewerbereinigung",
    label: "Gewerbereinigung",
    category: "cleaning",
    contactService: "gewerbereinigung",
    defaultIntent: "gewerbereinigung-anfrage",
    priority: "p0",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["commercial-cleaning", "firmenreinigung", "gewerbe-reinigung"],
    fieldGroup: "b2b-cleaning",
    successState: "b2b-success",
    relatedServices: ["bueroreinigung", "praxisreinigung", "angebot-pruefen"],
    internalRoute: "/gewerbereinigung",
    noApiOnSelect: true,
  },
  {
    serviceKey: "hausverwaltung-reinigung",
    label: "Hausverwaltung-Reinigung",
    category: "cleaning",
    contactService: "hausverwaltung-reinigung",
    defaultIntent: "hausverwaltung-reinigung-anfrage",
    priority: "p0",
    defaultCity: "duesseldorf",
    supportedCities: ["duesseldorf", "regensburg", "bayern"],
    aliases: ["property-management-cleaning", "property-cleaning", "objektpflege", "wohnanlagen-reinigung"],
    fieldGroup: "property-cleaning",
    successState: "property-cleaning-success",
    relatedServices: ["treppenhausreinigung", "unterhaltsreinigung", "gebaeudereinigung"],
    internalRoute: "/hausverwaltung-reinigung",
    noApiOnSelect: true,
  },
  {
    serviceKey: "treppenhausreinigung",
    label: "Treppenhausreinigung",
    category: "cleaning",
    contactService: "treppenhausreinigung",
    defaultIntent: "treppenhausreinigung-anfrage",
    priority: "p0",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["staircase-cleaning", "stairwell-cleaning", "treppenhaus-reinigung", "treppenreinigung"],
    fieldGroup: "property-cleaning",
    successState: "property-cleaning-success",
    relatedServices: ["hausverwaltung-reinigung", "unterhaltsreinigung", "gebaeudereinigung"],
    internalRoute: "/treppenhausreinigung-regensburg",
    noApiOnSelect: true,
  },
  {
    serviceKey: "unterhaltsreinigung",
    label: "Unterhaltsreinigung",
    category: "cleaning",
    contactService: "unterhaltsreinigung",
    defaultIntent: "unterhaltsreinigung-anfrage",
    priority: "p0",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["maintenance-cleaning", "recurring-cleaning", "regelmaessige-reinigung"],
    fieldGroup: "property-cleaning",
    successState: "property-cleaning-success",
    relatedServices: ["bueroreinigung", "gewerbereinigung", "hausverwaltung-reinigung"],
    internalRoute: "/unterhaltsreinigung-regensburg",
    noApiOnSelect: true,
  },
  {
    serviceKey: "gebaeudereinigung",
    label: "Gebäudereinigung",
    category: "cleaning",
    contactService: "gebaeudereinigung",
    defaultIntent: "gebaeudereinigung-anfrage",
    priority: "p1",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["building-cleaning", "objektreinigung", "objekt-reinigung"],
    fieldGroup: "property-cleaning",
    successState: "property-cleaning-success",
    relatedServices: ["bueroreinigung", "unterhaltsreinigung", "angebot-pruefen"],
    internalRoute: "/gewerbereinigung",
    noApiOnSelect: true,
  },
  {
    serviceKey: "praxisreinigung",
    label: "Praxisreinigung",
    category: "cleaning",
    contactService: "praxisreinigung",
    defaultIntent: "praxisreinigung-anfrage",
    priority: "p1",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["practice-cleaning", "arztpraxis-reinigung", "kanzleireinigung"],
    fieldGroup: "b2b-cleaning",
    successState: "b2b-success",
    relatedServices: ["bueroreinigung", "gewerbereinigung"],
    internalRoute: "/praxisreinigung-regensburg",
    noApiOnSelect: true,
  },
  {
    serviceKey: "fensterreinigung",
    label: "Fensterreinigung",
    category: "cleaning",
    contactService: "fensterreinigung",
    defaultIntent: "fensterreinigung-anfrage",
    priority: "p1",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["window-cleaning", "glasreinigung", "glas-reinigung"],
    fieldGroup: "cleaning",
    successState: "cleaning-success",
    relatedServices: ["reinigung", "angebot-pruefen"],
    internalRoute: "/fensterreinigung-regensburg",
    noApiOnSelect: true,
  },
  {
    serviceKey: "solarreinigung",
    label: "Solarreinigung",
    category: "cleaning",
    contactService: "solarreinigung",
    defaultIntent: "solarreinigung-anfrage",
    priority: "p2",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["solar-cleaning", "solar-panel-cleaning"],
    fieldGroup: "solar-pv",
    successState: "solar-pv-success",
    relatedServices: ["pv-anlagen-reinigung", "angebot-pruefen"],
    internalRoute: "/reinigung-regensburg",
    noApiOnSelect: true,
  },
  {
    serviceKey: "pv-anlagen-reinigung",
    label: "PV-Anlagen-Reinigung",
    category: "cleaning",
    contactService: "pv-anlagen-reinigung",
    defaultIntent: "pv-reinigung-anfragen",
    priority: "p2",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["pv-cleaning", "photovoltaik-reinigung", "pv-reinigung", "pv-sichtklar"],
    fieldGroup: "solar-pv",
    successState: "solar-pv-success",
    relatedServices: ["solarreinigung", "angebot-pruefen"],
    internalRoute: "/reinigung-regensburg",
    noApiOnSelect: true,
  },
  {
    serviceKey: "umzug",
    label: "Umzug",
    category: "moving",
    contactService: "umzug",
    defaultIntent: "umzug-transport",
    priority: "p1",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern", "muenchen", "nuernberg"],
    aliases: ["moving", "moving-help", "relocation", "privatumzug"],
    fieldGroup: "moving",
    successState: "moving-success",
    relatedServices: ["moebeltransport", "seniorenumzug", "angebot-pruefen"],
    internalRoute: "/regensburg/umzug",
    noApiOnSelect: true,
  },
  {
    serviceKey: "fernumzug",
    label: "Fernumzug",
    category: "moving",
    contactService: "fernumzug",
    defaultIntent: "fernumzug-anfrage",
    priority: "p1",
    defaultCity: "bayern",
    supportedCities: ["bayern", "regensburg", "muenchen", "duesseldorf"],
    aliases: ["long-distance-moving", "fern-umzug", "relocation"],
    fieldGroup: "moving",
    successState: "moving-success",
    relatedServices: ["umzug", "moebeltransport", "angebot-pruefen"],
    internalRoute: "/fernumzug-muenchen",
    noApiOnSelect: true,
  },
  {
    serviceKey: "seniorenumzug",
    label: "Seniorenumzug",
    category: "moving",
    contactService: "seniorenumzug",
    defaultIntent: "seniorenumzug-anfragen",
    priority: "p1",
    defaultCity: "bayern",
    supportedCities: ["regensburg", "bayern", "nuernberg", "landshut"],
    aliases: ["senior-moving", "umzug-im-alter", "senior-relocation"],
    fieldGroup: "moving",
    successState: "moving-success",
    relatedServices: ["umzug", "diskret-service", "angebot-pruefen"],
    internalRoute: "/seniorenumzug-bayern",
    noApiOnSelect: true,
  },
  {
    serviceKey: "klaviertransport",
    label: "Klaviertransport",
    category: "moving",
    contactService: "klaviertransport",
    defaultIntent: "klaviertransport-anfrage",
    priority: "p1",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "bayern"],
    aliases: ["piano-transport", "pianotransport", "klavier-transport"],
    fieldGroup: "special-transport",
    successState: "special-transport-success",
    relatedServices: ["moebeltransport", "umzug", "angebot-pruefen"],
    internalRoute: "/klaviertransport-regensburg",
    noApiOnSelect: true,
  },
  {
    serviceKey: "moebeltransport",
    label: "Möbeltransport",
    category: "moving",
    contactService: "moebeltransport",
    defaultIntent: "moebeltransport-anfrage",
    priority: "p1",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "bayern"],
    aliases: ["furniture-moving", "furniture-transport", "kleintransport", "beiladung", "rueckfahrt"],
    fieldGroup: "special-transport",
    successState: "special-transport-success",
    relatedServices: ["umzug", "klaviertransport", "angebot-pruefen"],
    internalRoute: "/kleintransport-regensburg",
    noApiOnSelect: true,
  },
  {
    serviceKey: "entruempelung",
    label: "Entrümpelung",
    category: "clearance",
    contactService: "entruempelung",
    defaultIntent: "entruempelung-aufloesung",
    priority: "p1",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern", "landshut"],
    aliases: ["house-clearance", "apartment-clearance", "clearance", "decluttering", "entsorgung"],
    fieldGroup: "clearance",
    successState: "clearance-success",
    relatedServices: ["wohnungsaufloesung", "reinigung", "angebot-pruefen"],
    internalRoute: "/regensburg/entruempelung",
    noApiOnSelect: true,
  },
  {
    serviceKey: "wohnungsaufloesung",
    label: "Wohnungsaufloesung",
    category: "clearance",
    contactService: "wohnungsaufloesung",
    defaultIntent: "wohnungsaufloesung-anfrage",
    priority: "p1",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "bayern", "nuernberg"],
    aliases: ["apartment-dissolution", "hausaufloesung", "haushaltsaufloesung", "nachlassaufloesung"],
    fieldGroup: "clearance",
    successState: "clearance-success",
    relatedServices: ["entruempelung", "diskret-service", "reinigung"],
    internalRoute: "/regensburg/wohnungsaufloesung",
    noApiOnSelect: true,
  },
  {
    serviceKey: "angebot-pruefen",
    label: "Angebot prüfen",
    category: "offer-check",
    contactService: "angebot-pruefen",
    defaultIntent: "angebot-pruefen",
    priority: "p0",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["offer-check", "quote-check", "quote-review", "angebotscheck", "zweitmeinung", "fairpreis-check"],
    fieldGroup: "offer-check",
    successState: "offer-check-success",
    relatedServices: ["reinigung", "umzug", "entruempelung", "plan-b-service"],
    internalRoute: "/angebot-guenstiger-pruefen",
    noApiOnSelect: true,
  },
  {
    serviceKey: "plan-b-service",
    label: "Plan-B-Service",
    category: "offer-check",
    contactService: "angebot-pruefen",
    defaultIntent: "plan-b-anbieterabsage",
    priority: "p0",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["plan-b", "backup-service", "anbieter-abgesagt", "schadensbegrenzung"],
    fieldGroup: "offer-check",
    successState: "offer-check-success",
    relatedServices: ["angebot-pruefen", "diskret-service", "umzug"],
    internalRoute: "/plan-b-service",
    noApiOnSelect: true,
  },
  {
    serviceKey: "diskret-service",
    label: "Diskret-Service",
    category: "discreet",
    contactService: "diskret-service",
    defaultIntent: "diskret-service",
    priority: "p0",
    defaultCity: "bayern",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["discreet-service", "private-case", "sensible-anfrage", "diskreter-service"],
    fieldGroup: "discreet",
    successState: "discreet-success",
    relatedServices: ["private-client", "wohnungsaufloesung", "plan-b-service"],
    internalRoute: "/diskret-service",
    noApiOnSelect: true,
  },
  {
    serviceKey: "private-client",
    label: "Private Client Service",
    category: "discreet",
    contactService: "private-client",
    defaultIntent: "private-client",
    priority: "p0",
    defaultCity: "bayern",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["private-client-service", "villenservice", "private-client-service-bayern"],
    fieldGroup: "discreet",
    successState: "discreet-success",
    relatedServices: ["diskret-service", "angebot-pruefen"],
    internalRoute: "/private-client-service",
    noApiOnSelect: true,
  },
  {
    serviceKey: "uebergabeakte",
    label: "Übergabeakte",
    category: "signature",
    contactService: "reinigung",
    defaultIntent: "uebergabeakte",
    priority: "p1",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "bayern"],
    aliases: ["handover-file", "handover-cleaning", "wohnungsuebergabe", "objektbrief"],
    fieldGroup: "handover",
    successState: "handover-success",
    relatedServices: ["reinigung", "entruempelung", "angebot-pruefen"],
    internalRoute: "/uebergabeakte",
    noApiOnSelect: true,
  },
  {
    serviceKey: "english-contact",
    label: "English request",
    category: "unclear",
    contactService: "sonstiges",
    defaultIntent: "english-contact",
    priority: "p1",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["english", "english-request", "expat", "international"],
    fieldGroup: "english",
    successState: "english-success",
    relatedServices: ["reinigung", "umzug", "angebot-pruefen"],
    internalRoute: "/en",
    noApiOnSelect: true,
  },
  {
    serviceKey: "sonstiges",
    label: "Service unklar",
    category: "unclear",
    contactService: "sonstiges",
    defaultIntent: "unsichere-anfrage",
    priority: "p2",
    defaultCity: "regensburg",
    supportedCities: ["regensburg", "duesseldorf", "bayern"],
    aliases: ["unknown", "unsicher", "sonstige-anfrage", "service-unsicher"],
    fieldGroup: "core",
    successState: "general-success",
    relatedServices: ["reinigung", "umzug", "entruempelung", "angebot-pruefen"],
    internalRoute: "/kontakt",
    noApiOnSelect: true,
  },
] as const;

export const serviceRoutingByKey: Readonly<Record<string, ServiceRoutingEntry>> = Object.fromEntries(
  serviceRoutingMatrix.map((entry) => [entry.serviceKey, entry] as const),
);

export const serviceAliasMap: Readonly<Record<string, string>> = Object.fromEntries(
  serviceRoutingMatrix.flatMap((entry) => [
    [entry.serviceKey, entry.serviceKey] as const,
    ...entry.aliases.map((alias) => [normalizeRouteToken(alias), entry.serviceKey] as const),
  ]),
);

export function normalizeRouteToken(value: string | null | undefined) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " und ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeContactCity(value: string | null | undefined) {
  const normalized = normalizeRouteToken(value);
  if (!normalized) return "";
  if (["dusseldorf", "duesseldorf", "duesseldorf-nrw"].includes(normalized)) return "duesseldorf";
  if (["regensburg", "regensburg-bayern"].includes(normalized)) return "regensburg";
  if (["munchen", "muenchen"].includes(normalized)) return "muenchen";
  if (["nurnberg", "nuernberg"].includes(normalized)) return "nuernberg";
  if (["bavaria", "bayern", "oberpfalz"].includes(normalized)) return "bayern";
  return normalized;
}

export function normalizeServiceRoutingKey(value: string | null | undefined) {
  const normalized = normalizeRouteToken(value);
  return serviceAliasMap[normalized] || normalized || "sonstiges";
}

function normalizePriority(value: string | null | undefined, fallback: LeadPriority): LeadPriority {
  const normalized = normalizeRouteToken(value);
  if (["p0", "p1", "p2", "p3"].includes(normalized)) return normalized as LeadPriority;
  if (["0", "1", "2", "3"].includes(normalized)) return `p${normalized}` as LeadPriority;
  return fallback;
}

export function getCityLabel(city: string | null | undefined) {
  const normalized = normalizeContactCity(city);
  return cityLabels[normalized] || getLocationDisplayName(normalized);
}

export function buildServiceContactHref(input: ServiceRouteInput = {}) {
  const key = normalizeServiceRoutingKey(input.serviceKey || input.service || "");
  const entry = serviceRoutingByKey[key] || serviceRoutingByKey.sonstiges;
  const city = normalizeContactCity(input.city || entry.defaultCity || "");
  const intent = normalizeRouteToken(input.intent || entry.defaultIntent);
  const priority = normalizePriority(input.priority, entry.priority);
  const source = normalizeRouteToken(input.source || "service-finder");
  const destination = input.destination || "/kontakt";
  const params = new URLSearchParams();

  params.set("service", entry.contactService);
  if (city && city !== "deutschland") params.set("city", city);
  if (intent) params.set("intent", intent);
  params.set("priority", priority);
  params.set("source", source);

  const anchor = input.anchor === "" ? "" : input.anchor || "direktanfrage";
  return `${destination}?${params.toString()}${anchor ? `#${anchor}` : ""}`;
}

export function resolveServiceRoute(input: ServiceRouteInput = {}): ServiceRouteResult {
  const rawKey = normalizeServiceRoutingKey(input.serviceKey || input.service || input.intent || "");
  const entry = serviceRoutingByKey[rawKey] || serviceRoutingByKey.sonstiges;
  const city = normalizeContactCity(input.city || entry.defaultCity || "");
  const intent = normalizeRouteToken(input.intent || entry.defaultIntent);
  const priority = normalizePriority(input.priority, entry.priority);

  return {
    entry,
    serviceKey: entry.serviceKey,
    service: entry.contactService,
    city,
    cityLabel: getCityLabel(city),
    intent,
    priority,
    href: buildServiceContactHref({
      serviceKey: entry.serviceKey,
      city,
      intent,
      priority,
      source: input.source || "service-finder",
      destination: input.destination,
      anchor: input.anchor,
    }),
    manualReview: entry.serviceKey === "sonstiges" || !serviceRoutingByKey[rawKey],
  };
}

export function buildContactPageHeading(input: ServiceRouteInput = {}) {
  const route = resolveServiceRoute(input);
  if (route.entry.category === "offer-check") {
    return route.city ? `Angebot für ${route.cityLabel} prüfen lassen` : "Vorhandenes Angebot prüfen lassen";
  }
  if (route.entry.category === "discreet") {
    return "Sensible Situation diskret beschreiben";
  }
  if (route.entry.category === "unclear") {
    return "Beschreiben Sie kurz, wobei Sie Hilfe brauchen";
  }
  return route.city ? `${route.entry.label} in ${route.cityLabel} anfragen` : `${route.entry.label} anfragen`;
}

export function buildContactPageIntro(input: ServiceRouteInput = {}) {
  const route = resolveServiceRoute(input);
  if (route.entry.category === "offer-check") {
    return "Vorhandenes Angebot, Preisrahmen, Umfang, Termin und Prüfgrund reichen für den ersten Schritt. Es wird erst beim Absenden übermittelt.";
  }
  if (route.entry.category === "discreet") {
    return "Ort, grober Umfang und sicherer Kontaktweg reichen. Private Details können bewusst knapp bleiben und werden erst nach Absenden geprüft.";
  }
  if (route.entry.fieldGroup === "property-cleaning") {
    return "Nennen Sie Objektart, Bereiche, Turnus, Zugang und einen Ansprechpartner. Ein vorhandenes Angebot können Sie ebenfalls angeben.";
  }
  return "Ort, gewünschte Leistung, Umfang, Termin und Kontaktweg reichen für den Start. Weitere Angaben können Sie später ergänzen.";
}
export type CanonicalLocation = {
  locationKey: string;
  displayName: string;
  canonicalRoute: string;
  isRealLocation: boolean;
  serviceAreaParent: "duesseldorf" | "regensburg" | "bayern" | "manual-review";
  supportedServices: readonly string[];
  contactCityValue: string;
  areaServed: readonly string[];
  schemaEligible: boolean;
  manualReviewRequired: boolean;
};

const englishServiceAliasMap: Readonly<Record<string, string>> = {
  cleaning: "reinigung",
  "office-cleaning": "bueroreinigung",
  "commercial-cleaning": "gewerbereinigung",
  moving: "umzug",
  "moving-help": "umzug",
  "house-clearance": "entruempelung",
  decluttering: "entruempelung",
  "piano-transport": "klaviertransport",
  "offer-check": "angebot-pruefen",
  "solar-panel-cleaning": "solarreinigung",
  "property-cleaning": "hausverwaltung-reinigung",
};

const cityAliasMap: Readonly<Record<string, string>> = {
  dusseldorf: "duesseldorf",
  duesseldorf: "duesseldorf",
  "duesseldorf-nrw": "duesseldorf",
  "dusseldorf-nrw": "duesseldorf",
  munchen: "muenchen",
  muenchen: "muenchen",
  nurnberg: "nuernberg",
  nuernberg: "nuernberg",
  mettingen: "mettingen",
  mettmann: "mettmann",
};

function buildManualServiceAreaLocation(
  locationKey: string,
  displayName: string,
  serviceAreaParent: CanonicalLocation["serviceAreaParent"],
): CanonicalLocation {
  return {
    locationKey,
    displayName,
    canonicalRoute: "",
    isRealLocation: true,
    serviceAreaParent,
    supportedServices: [],
    contactCityValue: locationKey,
    areaServed: [displayName],
    schemaEligible: false,
    manualReviewRequired: true,
  };
}

const canonicalLocations: Readonly<Record<string, CanonicalLocation>> = {
  duesseldorf: {
    locationKey: "duesseldorf",
    displayName: "Düsseldorf",
    canonicalRoute: "/duesseldorf",
    isRealLocation: true,
    serviceAreaParent: "duesseldorf",
    supportedServices: ["reinigung", "bueroreinigung", "gewerbereinigung", "entruempelung", "angebot-pruefen"],
    contactCityValue: "duesseldorf",
    areaServed: ["Düsseldorf", "Neuss", "Ratingen", "Meerbusch", "Hilden", "Erkrath", "Krefeld", "Mettmann"],
    schemaEligible: true,
    manualReviewRequired: false,
  },
  regensburg: {
    locationKey: "regensburg",
    displayName: "Regensburg",
    canonicalRoute: "/regensburg",
    isRealLocation: true,
    serviceAreaParent: "regensburg",
    supportedServices: [
      "umzug",
      "reinigung",
      "entruempelung",
      "wohnungsaufloesung",
      "bueroreinigung",
      "gewerbereinigung",
      "klaviertransport",
      "angebot-pruefen",
    ],
    contactCityValue: "regensburg",
    areaServed: ["Regensburg", "Neutraubling", "Lappersdorf", "Regenstauf", "Wenzenbach", "Bad Abbach", "Kelheim"],
    schemaEligible: true,
    manualReviewRequired: false,
  },
  neuss: buildManualServiceAreaLocation("neuss", "Neuss", "duesseldorf"),
  ratingen: buildManualServiceAreaLocation("ratingen", "Ratingen", "duesseldorf"),
  meerbusch: buildManualServiceAreaLocation("meerbusch", "Meerbusch", "duesseldorf"),
  hilden: buildManualServiceAreaLocation("hilden", "Hilden", "duesseldorf"),
  erkrath: buildManualServiceAreaLocation("erkrath", "Erkrath", "duesseldorf"),
  krefeld: buildManualServiceAreaLocation("krefeld", "Krefeld", "duesseldorf"),
  mettmann: buildManualServiceAreaLocation("mettmann", "Mettmann", "duesseldorf"),
  mettingen: buildManualServiceAreaLocation("mettingen", "Mettingen (nicht Mettmann; wird einzeln geprüft)", "manual-review"),
  neutraubling: buildManualServiceAreaLocation("neutraubling", "Neutraubling", "regensburg"),
  lappersdorf: buildManualServiceAreaLocation("lappersdorf", "Lappersdorf", "regensburg"),
  regenstauf: buildManualServiceAreaLocation("regenstauf", "Regenstauf", "regensburg"),
  wenzenbach: buildManualServiceAreaLocation("wenzenbach", "Wenzenbach", "regensburg"),
  "bad-abbach": buildManualServiceAreaLocation("bad-abbach", "Bad Abbach", "regensburg"),
  kelheim: buildManualServiceAreaLocation("kelheim", "Kelheim", "regensburg"),
  nittendorf: buildManualServiceAreaLocation("nittendorf", "Nittendorf", "regensburg"),
  hemau: buildManualServiceAreaLocation("hemau", "Hemau", "regensburg"),
  burglengenfeld: buildManualServiceAreaLocation("burglengenfeld", "Burglengenfeld", "regensburg"),
  schwandorf: buildManualServiceAreaLocation("schwandorf", "Schwandorf", "regensburg"),
};

export function normalizeServiceKey(value: string | null | undefined) {
  return normalizeServiceRoutingKey(value);
}

export function normalizeCityKey(value: string | null | undefined) {
  const normalized = normalizeContactCity(value);
  return cityAliasMap[normalized] || normalized || "unbekannt";
}

export function normalizeIntentKey(value: string | null | undefined) {
  return normalizeRouteToken(value);
}

export function normalizeEnglishAlias(value: string | null | undefined) {
  const normalized = normalizeRouteToken(value);
  return englishServiceAliasMap[normalized] || normalizeServiceRoutingKey(normalized);
}

export function buildContactHref(input: ServiceRouteInput = {}) {
  return buildServiceContactHref(input);
}

export function getPrimaryRouteForService(serviceKey: string | null | undefined) {
  const key = normalizeServiceRoutingKey(serviceKey);
  const entry = serviceRoutingByKey[key];
  return entry?.internalRoute || "/kontakt";
}

export function getServiceForRoute(path: string | null | undefined) {
  const route = `/${normalizeRouteToken(path || "")}`.replace(/\/$/, "") || "/";
  const exact = serviceRoutingMatrix.find((entry) => entry.internalRoute === route);
  if (exact) return exact;

  const routeTokens = route.split("/").filter(Boolean);
  const matchedAlias = routeTokens
    .flatMap((token) => [token, ...token.split("-")])
    .map((token) => serviceAliasMap[token])
    .find(Boolean);

  return matchedAlias ? serviceRoutingByKey[matchedAlias] || null : null;
}

export function getCanonicalLocation(value: string | null | undefined): CanonicalLocation {
  const locationKey = normalizeCityKey(value);
  const known = canonicalLocations[locationKey];
  if (known) return known;

  return {
    locationKey,
    displayName: getCityLabel(locationKey),
    canonicalRoute: "",
    isRealLocation: false,
    serviceAreaParent: "manual-review",
    supportedServices: [],
    contactCityValue: locationKey,
    areaServed: [],
    schemaEligible: false,
    manualReviewRequired: true,
  };
}

export const canonicalLocationList = Object.values(canonicalLocations);
