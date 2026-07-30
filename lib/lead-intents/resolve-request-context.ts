import {
  resolveLeadIntent,
  type LeadIntent,
  type LeadService,
} from "@/lib/lead-intents";
import {
  normalizeContactCity,
  normalizeRouteToken,
  serviceRoutingByKey,
} from "@/lib/service-routing";

export type RequestLocation = "duesseldorf" | "regensburg" | "unsicher";
export type GlobalRequestSource =
  | "global_header"
  | "global_mobile_header"
  | "global_footer";

export type RequestServiceOption = {
  key: string;
  label: string;
  service: LeadService;
  intent: string;
};

export type RequestContextInput = {
  mode?: string | null;
  location?: string | null;
  city?: string | null;
  service?: string | null;
  intent?: string | null;
  priority?: string | null;
  source?: string | null;
  entryPage?: string | null;
};

export type RequestContext = {
  valid: boolean;
  neutral: boolean;
  location: RequestLocation | "";
  service: LeadService | "";
  serviceKey: string;
  intent: string;
  headline: string;
  badge: string;
  description: string;
  formVariant: string;
  sourceLabel: string;
  entryPage: string;
  leadIntent: LeadIntent;
};

const neutralDescription =
  "Wählen Sie zuerst den passenden Standort und die gewünschte Leistung. Anschließend können Sie die wichtigsten Eckdaten senden.";

const duesseldorfServices: readonly RequestServiceOption[] = [
  { key: "reinigung", label: "Reinigung", service: "reinigung", intent: "reinigung-anfrage" },
  { key: "bueroreinigung", label: "Büroreinigung", service: "bueroreinigung", intent: "bueroreinigung-anfrage" },
  { key: "praxisreinigung", label: "Praxisreinigung", service: "praxisreinigung", intent: "praxisreinigung-anfrage" },
  { key: "fensterreinigung", label: "Fensterreinigung", service: "fensterreinigung", intent: "fensterreinigung-anfrage" },
  { key: "grundreinigung", label: "Grundreinigung", service: "reinigung", intent: "grundreinigung-anfrage" },
  { key: "unterhaltsreinigung", label: "Unterhaltsreinigung", service: "unterhaltsreinigung", intent: "unterhaltsreinigung-anfrage" },
  { key: "baureinigung", label: "Bau- und Bauendreinigung", service: "reinigung", intent: "bauendreinigung-anfrage" },
  { key: "gewerbereinigung", label: "Gewerbereinigung", service: "gewerbereinigung", intent: "gewerbereinigung-anfrage" },
  { key: "hausverwaltung-reinigung", label: "Hausverwaltung-Reinigung", service: "hausverwaltung-reinigung", intent: "hausverwaltung-reinigung-anfrage" },
  { key: "treppenhausreinigung", label: "Treppenhausreinigung", service: "treppenhausreinigung", intent: "treppenhausreinigung-anfrage" },
] as const;

const regensburgServices: readonly RequestServiceOption[] = [
  { key: "umzug", label: "Umzug", service: "umzug", intent: "umzug-anfrage" },
  { key: "entruempelung", label: "Entrümpelung", service: "entruempelung", intent: "entruempelung-anfrage" },
  { key: "wohnungsaufloesung", label: "Wohnungsauflösung", service: "wohnungsaufloesung", intent: "wohnungsaufloesung-anfrage" },
  { key: "raeumung", label: "Räumung", service: "entruempelung", intent: "raeumung-anfrage" },
  { key: "reinigung", label: "Reinigung", service: "reinigung", intent: "reinigung-anfrage" },
  { key: "moebeltransport", label: "Möbeltransport", service: "moebeltransport", intent: "moebeltransport-anfrage" },
  { key: "klaviertransport", label: "Klaviertransport", service: "klaviertransport", intent: "klaviertransport-anfrage" },
  { key: "seniorenumzug", label: "Seniorenumzug", service: "seniorenumzug", intent: "seniorenumzug-anfrage" },
] as const;

const unsureServices: readonly RequestServiceOption[] = [
  { key: "reinigung", label: "Reinigung", service: "reinigung", intent: "reinigung-anfrage" },
  { key: "umzug", label: "Umzug", service: "umzug", intent: "umzug-anfrage" },
  { key: "raeumung-aufloesung", label: "Räumung oder Auflösung", service: "entruempelung", intent: "raeumung-oder-aufloesung" },
  { key: "angebot-pruefen", label: "Angebot prüfen", service: "angebot-pruefen", intent: "angebot-pruefen" },
  { key: "sonstiges", label: "Andere Anfrage", service: "sonstiges", intent: "allgemeine-anfrage" },
] as const;

export const requestServiceOptionsByLocation: Readonly<
  Record<RequestLocation, readonly RequestServiceOption[]>
> = {
  duesseldorf: duesseldorfServices,
  regensburg: regensburgServices,
  unsicher: unsureServices,
};

export function buildGlobalRequestHref(source: GlobalRequestSource) {
  return `/kontakt?mode=neutral&source=${source}`;
}

function normalizeLocation(value: string | null | undefined): RequestLocation | "" {
  const normalized = normalizeRouteToken(value);
  if (["duesseldorf", "dusseldorf"].includes(normalized)) return "duesseldorf";
  if (normalized === "regensburg") return "regensburg";
  if (["unsicher", "noch-unsicher", "unbekannt"].includes(normalized)) return "unsicher";
  return "";
}

function getFormVariant(service: LeadService) {
  const entry = serviceRoutingByKey[service];
  return entry?.fieldGroup || "core";
}

function neutralContext(input: RequestContextInput, location: RequestLocation | "" = ""): RequestContext {
  const leadIntent = resolveLeadIntent({
    path: "/kontakt",
    service: "kontakt",
    city: location === "duesseldorf" || location === "regensburg" ? location : "deutschland",
    intent: "neutrale-anfrage",
    priority: "p0",
  });

  return {
    valid: false,
    neutral: true,
    location,
    service: "",
    serviceKey: "",
    intent: "",
    headline: "Leistung unverbindlich anfragen",
    badge: "FLOXANT Anfrage",
    description: neutralDescription,
    formVariant: "core",
    sourceLabel: String(input.source || "kontakt").trim(),
    entryPage: String(input.entryPage || ""),
    leadIntent,
  };
}

export function resolveRequestContext(input: RequestContextInput = {}): RequestContext {
  const explicitNeutral = normalizeRouteToken(input.mode) === "neutral";
  if (explicitNeutral) return neutralContext(input);

  const location = normalizeLocation(input.location || input.city);
  if (!location) return neutralContext(input);

  const rawServiceKey = normalizeRouteToken(input.service);
  if (!rawServiceKey) return neutralContext(input, location);

  const options = requestServiceOptionsByLocation[location];
  const option =
    options.find((candidate) => candidate.key === rawServiceKey) ||
    options.find((candidate) => candidate.service === rawServiceKey);

  if (!option) return neutralContext(input);
  const registryEntry = serviceRoutingByKey[option.service];
  if (
    !registryEntry ||
    (location !== "unsicher" && !registryEntry.supportedCities.includes(location))
  ) {
    return neutralContext(input);
  }

  const city = location === "unsicher" ? "deutschland" : normalizeContactCity(location);
  const intent = normalizeRouteToken(input.intent) || option.intent;
  const leadIntent = resolveLeadIntent({
    path: "/kontakt",
    service: option.service,
    city,
    intent,
    priority: input.priority || "p1",
  });
  const citySuffix = location === "unsicher" ? "" : ` in ${leadIntent.cityLabel}`;

  return {
    valid: true,
    neutral: false,
    location,
    service: option.service,
    serviceKey: option.key,
    intent,
    headline: `${option.label}${citySuffix} anfragen`,
    badge:
      location === "unsicher"
        ? "FLOXANT Anfrage"
        : `FLOXANT Anfrage ${leadIntent.cityLabel}`,
    description:
      location === "unsicher"
        ? "Beschreiben Sie kurz den Einsatzort und die gewünschte Leistung. FLOXANT ordnet Ihre Anfrage passend ein."
        : `Senden Sie die wichtigsten Eckdaten für ${option.label}${citySuffix}. FLOXANT prüft Ihre Angaben und meldet sich gezielt zurück.`,
    formVariant: getFormVariant(option.service),
    sourceLabel: String(input.source || "kontakt").trim(),
    entryPage: String(input.entryPage || ""),
    leadIntent,
  };
}
