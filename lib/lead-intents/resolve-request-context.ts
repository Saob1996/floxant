import {
  resolveLeadIntent,
  type LeadIntent,
  type LeadPriority,
  type LeadService,
} from "@/lib/lead-intents";
import {
  normalizeContactCity,
  normalizeRouteToken,
  serviceRoutingByKey,
} from "@/lib/service-routing";
import {
  isRequestServiceAllowedAtLocation,
  requestServiceOptionsByLocation,
  resolveAllowedRequestService,
  type RequestLocation,
  type RequestServiceOption,
} from "@/lib/lead-intents/request-location-policy";

export {
  requestServiceOptionsByLocation,
  type RequestLocation,
  type RequestServiceOption,
} from "@/lib/lead-intents/request-location-policy";
export type GlobalRequestSource =
  | "global_header"
  | "global_mobile_header"
  | "global_footer"
  | "global_404";

export type RequestContextInput = {
  mode?: string | null;
  location?: string | null;
  city?: string | null;
  service?: string | null;
  intent?: string | null;
  priority?: string | null;
  source?: string | null;
  entryPage?: string | null;
  campaign?: string | null;
  locale?: string | null;
};

export type RequestContext = {
  valid: boolean;
  neutral: boolean;
  location: RequestLocation | "";
  service: LeadService | "";
  serviceKey: string;
  intent: string;
  priority: LeadPriority;
  headline: string;
  badge: string;
  description: string;
  formVariant: string;
  sourceLabel: string;
  entryPage: string;
  campaign: string;
  locale: "de" | "en";
  availableServices: readonly RequestServiceOption[];
  leadIntent: LeadIntent;
};

const neutralDescription =
  "Wählen Sie den passenden Standort und die gewünschte Leistung. Anschließend können Sie die wichtigsten Eckdaten direkt senden.";

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

function normalizeLocale(value: string | null | undefined): "de" | "en" {
  return String(value || "").trim().toLowerCase().startsWith("en") ? "en" : "de";
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
    priority: leadIntent.priority,
    headline: "Leistung unverbindlich anfragen",
    badge: "FLOXANT Anfrage",
    description: neutralDescription,
    formVariant: "core",
    sourceLabel: String(input.source || "kontakt").trim(),
    entryPage: String(input.entryPage || ""),
    campaign: String(input.campaign || "").trim(),
    locale: normalizeLocale(input.locale),
    availableServices: location ? requestServiceOptionsByLocation[location] : [],
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
  const option = resolveAllowedRequestService(location, rawServiceKey);

  if (!option || !isRequestServiceAllowedAtLocation(location, option)) {
    return neutralContext(input, location);
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
    priority: leadIntent.priority,
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
    campaign: String(input.campaign || "").trim(),
    locale: normalizeLocale(input.locale),
    availableServices: options,
    leadIntent,
  };
}
