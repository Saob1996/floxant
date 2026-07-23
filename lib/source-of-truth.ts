import { getAiAnswerByKey, resolveAiAnswerKey, type AiAnswerKey } from "@/lib/ai-answer-system";
import { getRequestChecklist, normalizeRequestChecklistKey, type RequestChecklistKey } from "@/lib/request-checklists";
import {
  buildContactHref as buildRoutingContactHref,
  canonicalLocationList,
  getCanonicalLocation,
  getPrimaryRouteForService,
  getServiceForRoute,
  normalizeCityKey,
  normalizeEnglishAlias,
  normalizeIntentKey,
  normalizeServiceKey,
  resolveServiceRoute,
  serviceRoutingMatrix,
  type CanonicalLocation,
  type ServiceRoutingCategory,
} from "@/lib/service-routing";
import { resolveServiceFaqKey, type ServiceFaqKey } from "@/lib/service-faqs";
import { serviceProductsByKey } from "@/lib/service-products";

export {
  getCanonicalLocation,
  getPrimaryRouteForService,
  getServiceForRoute,
  normalizeCityKey,
  normalizeEnglishAlias,
  normalizeIntentKey,
  normalizeServiceKey,
};

export type SourceServiceDefinition = {
  serviceKey: string;
  displayName: string;
  category: ServiceRoutingCategory;
  subcategory: string;
  description: string;
  canonicalRoute: string;
  localRoutes: readonly string[];
  contactServiceValue: string;
  aliases: readonly string[];
  englishAliases: readonly string[];
  offerCheckSupported: boolean;
  discreetSupported: boolean;
  b2bSupported: boolean;
  locationsSupported: readonly string[];
  relatedServices: readonly string[];
  relatedSignatureServices: readonly string[];
  defaultIntent: string;
  ctaLabel: string;
  faqKeys: readonly ServiceFaqKey[];
  aiAnswerKey: AiAnswerKey;
  checklistKey: RequestChecklistKey;
};

export type SourceLocationDefinition = CanonicalLocation;

export type SourceIntentDefinition = {
  intentKey: string;
  displayName: string;
  serviceKey: string;
  cityRequired: boolean;
  offerCheck: boolean;
  discreet: boolean;
  b2b: boolean;
  english: boolean;
  priority: string;
  formTitle: string;
  formIntro: string;
  successMessageKey: string;
  requiredCoreFields: readonly string[];
  optionalFieldGroupKey: string;
};

export type SourceContentMapping = {
  faqKey: ServiceFaqKey;
  aiAnswerKey: AiAnswerKey;
  checklistKey: RequestChecklistKey;
  serviceKey: string;
  locationKey: string;
  pageType: "service" | "local" | "support" | "blog" | "unknown";
};

const englishAliasSignals = new Set([
  "cleaning",
  "office-cleaning",
  "commercial-cleaning",
  "moving",
  "moving-help",
  "house-clearance",
  "decluttering",
  "piano-transport",
  "offer-check",
  "solar-panel-cleaning",
  "property-cleaning",
]);

function uniqueList<T>(items: readonly T[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function routeList(serviceKey: string, canonicalRoute: string) {
  const product = serviceProductsByKey[serviceKey];
  return uniqueList([
    canonicalRoute,
    product?.canonicalRoute,
    product?.recommendedRoute,
  ].filter((route): route is string => Boolean(route)));
}

function getSourceServiceCategoryLabel(category: ServiceRoutingCategory) {
  if (category === "offer-check") return "offer-check";
  if (category === "clearance") return "clearance";
  if (category === "moving") return "transport";
  if (category === "discreet") return "sensitive-case";
  if (category === "signature") return "signature";
  return category;
}

export const sourceServices: readonly SourceServiceDefinition[] = serviceRoutingMatrix.map((entry) => {
  const product = serviceProductsByKey[entry.serviceKey];
  const canonicalRoute = entry.internalRoute || product?.canonicalRoute || product?.recommendedRoute || "/kontakt";
  const faqKey = resolveServiceFaqKey(`${entry.serviceKey} ${canonicalRoute}`);
  const aiAnswerKey = resolveAiAnswerKey(`${entry.serviceKey} ${canonicalRoute}`);
  const checklistKey = normalizeRequestChecklistKey(entry.serviceKey);
  const englishAliases = entry.aliases.filter((alias) => englishAliasSignals.has(alias));

  return {
    serviceKey: entry.serviceKey,
    displayName: entry.label,
    category: entry.category,
    subcategory: getSourceServiceCategoryLabel(entry.category),
    description: product?.shortDescription || entry.label,
    canonicalRoute,
    localRoutes: routeList(entry.serviceKey, canonicalRoute),
    contactServiceValue: entry.contactService,
    aliases: entry.aliases,
    englishAliases,
    offerCheckSupported: entry.category === "offer-check" || entry.relatedServices.includes("angebot-pruefen"),
    discreetSupported: entry.category === "discreet" || entry.relatedServices.includes("diskret-service"),
    b2bSupported: entry.fieldGroup === "b2b-cleaning" || entry.fieldGroup === "property-cleaning",
    locationsSupported: entry.supportedCities,
    relatedServices: entry.relatedServices,
    relatedSignatureServices: product?.relatedSignatureServices || [],
    defaultIntent: entry.defaultIntent,
    ctaLabel: resolveServiceRoute({ serviceKey: entry.serviceKey }).entry.label,
    faqKeys: [faqKey],
    aiAnswerKey,
    checklistKey,
  };
});

export const sourceLocations: readonly SourceLocationDefinition[] = canonicalLocationList;

export const sourceIntents: readonly SourceIntentDefinition[] = serviceRoutingMatrix.map((entry) => {
  const checklist = getRequestChecklist(normalizeRequestChecklistKey(entry.serviceKey));
  return {
    intentKey: normalizeIntentKey(entry.defaultIntent),
    displayName: entry.label,
    serviceKey: entry.serviceKey,
    cityRequired: entry.supportedCities.length > 0,
    offerCheck: entry.category === "offer-check",
    discreet: entry.category === "discreet",
    b2b: entry.fieldGroup === "b2b-cleaning" || entry.fieldGroup === "property-cleaning",
    english: entry.fieldGroup === "english",
    priority: entry.priority,
    formTitle: checklist.microcopy.headline,
    formIntro: checklist.microcopy.intro,
    successMessageKey: entry.successState,
    requiredCoreFields: checklist.requiredCoreInfo.map((item) => item.label),
    optionalFieldGroupKey: entry.fieldGroup,
  };
});

export const sourceContentMappings: readonly SourceContentMapping[] = sourceServices.map((service) => {
  const aiAnswer = getAiAnswerByKey(service.aiAnswerKey);
  const locationKey = aiAnswer?.route.includes("duesseldorf")
    ? "duesseldorf"
    : aiAnswer?.route.includes("regensburg")
      ? "regensburg"
      : "manual-review";

  return {
    faqKey: service.faqKeys[0],
    aiAnswerKey: service.aiAnswerKey,
    checklistKey: service.checklistKey,
    serviceKey: service.serviceKey,
    locationKey,
    pageType: locationKey === "manual-review" ? "support" : "local",
  };
});

export function buildContactHref(input: Parameters<typeof buildRoutingContactHref>[0] = {}) {
  return buildRoutingContactHref(input);
}

export function getSourceService(serviceKey: string | null | undefined) {
  const normalized = normalizeServiceKey(serviceKey);
  return sourceServices.find((service) => service.serviceKey === normalized) || null;
}

export function getSourceServiceForRoute(path: string | null | undefined) {
  const service = getServiceForRoute(path);
  return service ? getSourceService(service.serviceKey) : null;
}

export function getSourceLocation(locationKey: string | null | undefined) {
  return getCanonicalLocation(locationKey);
}
