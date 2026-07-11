import {
  buildContactHref,
  normalizeCityKey,
  normalizeIntentKey,
  normalizeServiceKey,
  resolveServiceRoute,
  type ServiceRouteInput,
} from "@/lib/service-routing";

export type CtaKey =
  | "primary-contact"
  | "service-contact"
  | "offer-check"
  | "mobile-sticky"
  | "inline-support"
  | "footer-contact";

export type CtaPriority = "p0" | "p1" | "p2" | "p3" | "hot";

export type CtaInput = {
  ctaKey?: CtaKey;
  label?: string;
  href?: string;
  serviceKey?: string;
  service?: string;
  cityKey?: string;
  city?: string;
  intentKey?: string;
  intent?: string;
  priority?: CtaPriority | string;
  source?: string;
  destination?: string;
  anchor?: ServiceRouteInput["anchor"];
};

export type ResolvedCtaConfig = {
  ctaKey: CtaKey;
  label: string;
  href: string;
  serviceKey: string;
  cityKey: string;
  intentKey: string;
  priority: string;
  source: string;
  dataAttributes: {
    event: "seo_cta_click";
    service: string;
    city?: string;
    pageIntent: string;
    priority: string;
    ctaLabel: string;
    destination: string;
    source: string;
  };
};

const defaultLabels: Record<CtaKey, string> = {
  "primary-contact": "Anfrage stellen",
  "service-contact": "Service anfragen",
  "offer-check": "Angebot pruefen lassen",
  "mobile-sticky": "Anfrage",
  "inline-support": "Anfrage vorbereiten",
  "footer-contact": "Kontakt aufnehmen",
};

function coercePriority(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  const normalized = normalizeIntentKey(value);
  if (["p0", "p1", "p2", "p3", "hot"].includes(normalized)) return normalized;
  return fallback;
}

export function resolveCtaConfig(input: CtaInput = {}): ResolvedCtaConfig {
  const ctaKey = input.ctaKey || "service-contact";
  const rawService = input.serviceKey || input.service || (ctaKey === "offer-check" ? "angebot-pruefen" : "");
  const serviceKey = normalizeServiceKey(rawService);
  const route = resolveServiceRoute({
    serviceKey,
    city: input.cityKey || input.city,
    intent: input.intentKey || input.intent,
    priority: input.priority,
    source: input.source || "seo",
    destination: input.destination,
    anchor: input.anchor,
  });
  const cityInput = input.cityKey || input.city;
  const cityKey = cityInput ? normalizeCityKey(cityInput) : route.city;
  const intentKey = normalizeIntentKey(input.intentKey || input.intent || route.intent);
  const priority = coercePriority(input.priority, route.priority);
  const label = input.label || defaultLabels[ctaKey] || route.entry.label;
  const source = normalizeIntentKey(input.source || "seo");
  const href =
    input.href ||
    buildContactHref({
      serviceKey,
      city: cityInput ? cityKey : route.city,
      intent: intentKey,
      priority,
      source,
      destination: input.destination,
      anchor: input.anchor,
    });

  return {
    ctaKey,
    label,
    href,
    serviceKey: route.service,
    cityKey,
    intentKey,
    priority,
    source,
    dataAttributes: {
      event: "seo_cta_click",
      service: route.service,
      city: cityKey && cityKey !== "deutschland" && cityKey !== "unbekannt" ? cityKey : undefined,
      pageIntent: intentKey,
      priority,
      ctaLabel: label,
      destination: href,
      source,
    },
  };
}

export const ctaDefinitions = [
  {
    ctaKey: "service-contact",
    label: defaultLabels["service-contact"],
    hrefBuilder: buildContactHref,
    dataEvent: "seo_cta_click",
    priority: "p1",
    source: "seo",
  },
  {
    ctaKey: "offer-check",
    label: defaultLabels["offer-check"],
    hrefBuilder: buildContactHref,
    dataEvent: "seo_cta_click",
    service: "angebot-pruefen",
    intent: "angebot-pruefen",
    priority: "p0",
    source: "seo",
  },
  {
    ctaKey: "mobile-sticky",
    label: defaultLabels["mobile-sticky"],
    hrefBuilder: buildContactHref,
    dataEvent: "seo_cta_click",
    priority: "p2",
    source: "mobile_floating_contact",
  },
] as const;
