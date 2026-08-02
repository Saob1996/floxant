/**
 * Public enquiry contract shared by browser submitters and Cloudflare Functions.
 * Legacy fields remain accepted by the server; new submitters should use these
 * canonical names and never persist presentation-only query state.
 */
export const CANONICAL_REQUEST_TOP_LEVEL_FIELDS = Object.freeze([
  "type", "lead_type", "leadSource", "source", "sourceComponent", "sourcePage", "landingPage",
  "service", "serviceCategory", "intent", "name", "email", "phone", "contactMethod",
  "serviceId", "serviceLabel", "location", "locationLabel",
  "preferredContactMethod", "cityOrZip", "objectType", "areaSize", "cleaningFrequency",
  "desiredDate", "startLocation", "destinationLocation", "startFloor", "destinationFloor",
  "startElevator", "destinationElevator", "floor", "elevator", "scope", "selectedAddons",
  "cleaningRequested", "message", "privacyConsent", "formStartedAt", "timestamp",
  "companyWebsite", "utmSource", "utmMedium", "utmCampaign", "utmTerm", "utmContent",
  "gclid", "gbraid", "wbraid", "upgrades", "details", "conversionJourneyId",
  "itemDescription", "dimensions", "weight", "instrumentType", "stairs", "accessWidth",
  "vehicleDistance", "accessPath", "condition", "windowCount", "fillLevel",
  "conversionLastEvent", "conversionLastSource", "conversionLastChannel", "conversionLastIntent",
  "conversionLastPriority",
]);

export const CANONICAL_REQUEST_NESTED_FIELDS = Object.freeze([
  "rawFields", "entryPage", "entryPoint", "campaign", "serviceId", "serviceLabel",
  "location", "locationLabel", "itemDescription", "dimensions", "weight",
  "instrumentType", "stairs", "accessWidth", "vehicleDistance", "accessPath",
  "condition", "windowCount", "fillLevel", "dashboardLabel", "formProfile",
  "confirmationEmailVariant", "timeframe",
]);

export const REQUEST_FIELD_ALIASES = Object.freeze({
  formType: "type",
  entryPage: "entryPoint",
  preferredContact: "preferredContactMethod",
  preferred_contact: "preferredContactMethod",
  requestedDate: "desiredDate",
  destination: "destinationLocation",
  elevatorAtStart: "startElevator",
  elevatorAtDestination: "destinationElevator",
  additionalServices: "selectedAddons",
});

export const REQUEST_UI_ONLY_FIELDS = Object.freeze([
  "priority", "mode", "step", "currentStep", "summary", "clientState", "displayLabel",
  "headline", "badge", "availableServices", "formVariant",
]);

const UI_ONLY_FIELD_SET = new Set(REQUEST_UI_ONLY_FIELDS);

export function normalizeRequestAliases(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return payload;
  const normalized = {};
  for (const [key, value] of Object.entries(payload)) {
    if (UI_ONLY_FIELD_SET.has(key)) continue;
    const canonicalKey = REQUEST_FIELD_ALIASES[key] || key;
    normalized[canonicalKey] = value;
  }
  return normalized;
}

export function sanitizeBookingPayload(payload) {
  const aliased = normalizeRequestAliases(payload);
  if (!aliased || typeof aliased !== "object" || Array.isArray(aliased)) return {};
  return Object.fromEntries(
    Object.entries(aliased).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );
}
