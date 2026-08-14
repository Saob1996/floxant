import {
  resolveLeadIntent,
  type LeadIntent,
  type LeadService,
} from "@/lib/lead-intents";
import {
  normalizeContactCity,
  normalizeRouteToken,
} from "@/lib/service-routing";
import {
  isRequestServiceAllowedAtLocation,
  requestLocationOptions,
  requestServiceOptionsByLocation,
  resolveAllowedRequestService,
  type RequestLocation,
  type RequestServiceOption,
} from "@/lib/lead-intents/request-location-policy";

export {
  requestLocationOptions,
  requestServiceOptionsByLocation,
  type RequestLocation,
  type RequestServiceOption,
} from "@/lib/lead-intents/request-location-policy";
export type GlobalRequestSource =
  | "global_header"
  | "global_mobile_header"
  | "global_floating"
  | "global_footer"
  | "global_homepage"
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
  notice: string;
  location: RequestLocation | "";
  locationHint: string;
  service: LeadService | "";
  serviceKey: string;
  intent: string;
  headline: string;
  badge: string;
  description: string;
  formVariant: string;
  analyticsServiceType: string;
  allowedUpgrades: readonly string[];
  confirmationEmailVariant: string;
  sourceLabel: string;
  entryPage: string;
  campaign: string;
  locale: "de" | "en";
  availableServices: readonly RequestServiceOption[];
  leadIntent: LeadIntent;
};

const neutralDescription =
  "Wählen Sie den passenden Standort und die gewünschte Leistung. Anschließend können Sie die wichtigsten Eckdaten direkt senden.";

function isSafeRequestToken(value: string | null | undefined) {
  const raw = String(value || "").trim();
  return !raw || /^[\p{L}\p{N} _-]{1,80}$/u.test(raw);
}

export function buildGlobalRequestHref(source: GlobalRequestSource) {
  return `/kontakt?mode=neutral&source=${source}`;
}

function normalizeLocation(value: string | null | undefined): RequestLocation | "" {
  const normalized = normalizeRouteToken(value);
  if (["duesseldorf", "dusseldorf"].includes(normalized)) return "duesseldorf";
  if (["regensburg", "regensburg-bayern"].includes(normalized)) return "regensburg";
  if (
    [
      "unsicher",
      "noch-unsicher",
      "unbekannt",
      "deutschland",
      "bayern",
      "muenchen",
      "munchen",
      "munich",
    ].includes(normalized)
  ) {
    return "unsicher";
  }
  return normalized ? "unsicher" : "";
}

function resolveLocationHint(input: RequestContextInput, location: RequestLocation | "") {
  if (location !== "unsicher") return "";
  const city = normalizeRouteToken(input.city);
  if (!city || ["deutschland", "unsicher", "noch-unsicher", "unbekannt"].includes(city)) {
    return "";
  }
  const knownLabels: Readonly<Record<string, string>> = {
    bayern: "Bayern",
    landshut: "Landshut",
    muenchen: "München",
    nuernberg: "Nürnberg",
  };
  if (knownLabels[city]) return knownLabels[city];

  return String(input.city || "")
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase("de-DE"))
    .slice(0, 80);
}

function normalizeLocale(value: string | null | undefined): "de" | "en" {
  return String(value || "").trim().toLowerCase().startsWith("en") ? "en" : "de";
}

function normalizeSource(value: string | null | undefined) {
  const source = normalizeRouteToken(value);
  if (!source) return "kontakt";
  if (
    /^(?:global-(?:header|mobile-header|floating|footer|homepage|404)|seo|website|service-finder|contact-selector|kontakt|booking|buchung|homepage|google-ads|google-maps|navigation|footer|mobile-nav|decision-compass|direct)$/.test(
      source,
    )
  ) {
    return source.replace(/-/g, "_");
  }
  return "direkt";
}

function normalizeEntryPage(value: string | null | undefined) {
  const raw = String(value || "").trim();
  if (!raw.startsWith("/") || raw.startsWith("//")) return "";
  try {
    return new URL(raw, "https://www.floxant.de").pathname.slice(0, 240);
  } catch {
    return "";
  }
}

function normalizeCampaign(value: string | null | undefined) {
  return String(value || "").trim().slice(0, 120);
}

function neutralContext(
  input: RequestContextInput,
  location: RequestLocation | "" = "",
  notice = "",
): RequestContext {
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
    notice,
    location,
    locationHint: resolveLocationHint(input, location),
    service: "",
    serviceKey: "",
    intent: "",
    headline: "Leistung unverbindlich anfragen",
    badge: "FLOXANT Anfrage",
    description: neutralDescription,
    formVariant: "core",
    analyticsServiceType: "general",
    allowedUpgrades: [],
    confirmationEmailVariant: "general",
    sourceLabel: normalizeSource(input.source),
    entryPage: normalizeEntryPage(input.entryPage),
    campaign: normalizeCampaign(input.campaign),
    locale: normalizeLocale(input.locale),
    availableServices: location ? requestServiceOptionsByLocation[location] : [],
    leadIntent,
  };
}

export function resolveRequestContext(input: RequestContextInput = {}): RequestContext {
  const explicitNeutral = normalizeRouteToken(input.mode) === "neutral";
  if (explicitNeutral) return neutralContext(input);

  const rawLocation = input.location || input.city;
  const hasLocationInput = Boolean(String(rawLocation || "").trim());
  if (!isSafeRequestToken(rawLocation) || !isSafeRequestToken(input.service)) {
    return neutralContext(
      input,
      "",
      "Die aufgerufene Vorauswahl ist nicht verfügbar. Bitte wählen Sie Standort und Leistung neu aus.",
    );
  }

  const location = normalizeLocation(rawLocation);
  if (!location) {
    return neutralContext(
      input,
      "",
      hasLocationInput
        ? "Die aufgerufene Vorauswahl ist nicht verfügbar. Bitte wählen Sie Standort und Leistung neu aus."
        : "",
    );
  }

  const rawServiceKey = normalizeRouteToken(input.service);
  if (!rawServiceKey) return neutralContext(input, location);

  const options = requestServiceOptionsByLocation[location];
  const option = resolveAllowedRequestService(location, rawServiceKey);

  if (!option || !isRequestServiceAllowedAtLocation(location, option)) {
    return neutralContext(
      input,
      location,
      "Diese Leistung ist am gewählten Standort nicht verfügbar. Bitte wählen Sie eine passende Leistung aus.",
    );
  }

  const city = location === "unsicher" ? "deutschland" : normalizeContactCity(location);
  const intent = option.intent;
  const resolvedLeadIntent = resolveLeadIntent({
    path: "/kontakt",
    service: option.service,
    city,
    intent,
    priority: input.priority || "p1",
  });
  const leadIntent = {
    ...resolvedLeadIntent,
    serviceLabel: option.label,
    trackingIntent: intent,
  };
  const citySuffix = location === "unsicher" ? "" : ` in ${leadIntent.cityLabel}`;

  return {
    valid: true,
    neutral: false,
    notice: "",
    location,
    locationHint: resolveLocationHint(input, location),
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
    formVariant: option.formProfile,
    analyticsServiceType: option.analyticsServiceType,
    allowedUpgrades: option.allowedUpgrades,
    confirmationEmailVariant: option.confirmationEmailVariant,
    sourceLabel: normalizeSource(input.source),
    entryPage: normalizeEntryPage(input.entryPage),
    campaign: normalizeCampaign(input.campaign),
    locale: normalizeLocale(input.locale),
    availableServices: options,
    leadIntent,
  };
}
