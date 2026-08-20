/**
 * Compact public-enquiry projection of lib/services/service-registry.ts.
 *
 * This module intentionally contains no page copy or service-area municipality
 * data. It is small enough for the contact client and can also be imported by
 * Cloudflare Pages Functions. The registry-contract test keeps this projection
 * in lockstep with every public service and its verified regions.
 */

export const REQUEST_LOCATION_OPTIONS = Object.freeze([
  Object.freeze({ id: "duesseldorf", label: "Düsseldorf", registryRegion: "Düsseldorf" }),
  Object.freeze({ id: "regensburg", label: "Regensburg", registryRegion: "Regensburg" }),
]);

export const REQUEST_ATTACHMENT_RULES = Object.freeze({
  maxFiles: 5,
  maxFileBytes: 8 * 1024 * 1024,
  maxTotalBytes: 24 * 1024 * 1024,
  allowedMimeTypes: Object.freeze([
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ]),
});

export const REQUEST_CONTACT_METHODS = Object.freeze(["email", "telefon", "whatsapp"]);

const REQUEST_CONTACT_METHOD_ALIASES = Object.freeze({
  email: "email",
  e_mail: "email",
  mail: "email",
  telefon: "telefon",
  telephone: "telefon",
  phone: "telefon",
  tel: "telefon",
  callback: "telefon",
  whatsapp: "whatsapp",
  whats_app: "whatsapp",
});

function contactText(value) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function contactMethodKey(value) {
  return contactText(value)
    .toLocaleLowerCase("de-DE")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalizeRequestContactMethod(value) {
  return REQUEST_CONTACT_METHOD_ALIASES[contactMethodKey(value)] || "";
}

function requestConsentAccepted(value) {
  if (value === true || value === 1) return true;
  if (Array.isArray(value)) return value.some(requestConsentAccepted);
  return ["true", "1", "yes", "ja", "on", "accepted"].includes(
    contactText(value).toLowerCase(),
  );
}

function requestEmailValid(value) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function requestPhoneValid(value) {
  if (!value || value.length > 50 || !/^(?:\+)?[0-9\s().\-/]+$/.test(value)) return false;
  if ((value.match(/\+/g) || []).length > 1 || (value.includes("+") && !value.startsWith("+"))) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 6 && digits.length <= 20;
}

/**
 * Browser- and Function-safe validation for the public enquiry contact block.
 * It deliberately contains no runtime configuration or server-only behavior.
 */
export function validateRequestContact(
  { name, email, phone, contactMethod, privacyConsent } = {},
  { requireContactMethod = true, requireConsent = true } = {},
) {
  const contact = {
    name: contactText(name),
    email: contactText(email),
    phone: contactText(phone),
    contactMethod: normalizeRequestContactMethod(contactMethod),
  };
  const fields = {};

  if (
    contact.name.length < 2
    || contact.name.length > 120
    || !/\p{L}/u.test(contact.name)
    || /[\p{Cc}\p{Cf}]/u.test(contact.name)
  ) {
    fields.name = "Bitte geben Sie einen gültigen Namen an.";
  }

  const emailValid = !contact.email || requestEmailValid(contact.email);
  const phoneValid = !contact.phone || requestPhoneValid(contact.phone);
  if (!emailValid) fields.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  if (!phoneValid) fields.phone = "Bitte geben Sie eine gültige Telefonnummer an.";
  if (!contact.email && !contact.phone) {
    fields.contact = "Bitte geben Sie mindestens eine E-Mail-Adresse oder Telefonnummer an.";
  }

  if (requireContactMethod) {
    if (!contact.contactMethod) {
      fields.contactMethod = "Bitte wählen Sie einen bevorzugten Kontaktweg.";
    } else if (contact.contactMethod === "email" && (!contact.email || !emailValid)) {
      fields.email = "Bitte tragen Sie für den gewählten Kontaktweg eine gültige E-Mail-Adresse ein.";
    } else if (
      (contact.contactMethod === "telefon" || contact.contactMethod === "whatsapp")
      && (!contact.phone || !phoneValid)
    ) {
      fields.phone = "Bitte tragen Sie für den gewählten Kontaktweg eine gültige Telefonnummer ein.";
    }
  }

  if (requireConsent && !requestConsentAccepted(privacyConsent)) {
    fields.privacyConsent = "Bitte bestätigen Sie den Datenschutz-Hinweis.";
  }

  return { contact, fields };
}

export const REQUEST_FORM_PROFILES = Object.freeze({
  cleaning: Object.freeze({
    coreFields: Object.freeze(["cityOrZip", "objectType", "areaSize", "scope"]),
    optionalFields: Object.freeze(["frequency", "desiredDate", "condition", "accessPath", "windowCount", "upgrades", "message", "files"]),
    analyticsServiceType: "cleaning",
    confirmationEmailVariant: "cleaning",
  }),
  moving: Object.freeze({
    coreFields: Object.freeze(["startLocation", "destinationLocation", "scope"]),
    optionalFields: Object.freeze(["desiredDate", "startFloor", "destinationFloor", "startElevator", "destinationElevator", "accessPath", "upgrades", "message", "files"]),
    analyticsServiceType: "moving",
    confirmationEmailVariant: "moving",
  }),
  furniture: Object.freeze({
    coreFields: Object.freeze(["startLocation", "destinationLocation", "itemDescription"]),
    optionalFields: Object.freeze(["dimensions", "desiredDate", "startFloor", "destinationFloor", "startElevator", "destinationElevator", "accessPath", "vehicleDistance", "message", "files"]),
    analyticsServiceType: "furniture_transport",
    confirmationEmailVariant: "furniture_transport",
  }),
  piano: Object.freeze({
    coreFields: Object.freeze(["startLocation", "destinationLocation", "instrumentType"]),
    optionalFields: Object.freeze(["dimensions", "desiredDate", "weight", "startFloor", "destinationFloor", "stairs", "startElevator", "destinationElevator", "accessWidth", "vehicleDistance", "message", "files"]),
    analyticsServiceType: "piano_transport",
    confirmationEmailVariant: "piano_transport",
  }),
  clearance: Object.freeze({
    coreFields: Object.freeze(["cityOrZip", "objectType", "areaSize"]),
    optionalFields: Object.freeze(["floor", "elevator", "desiredDate", "scope", "fillLevel", "accessPath", "cleaningRequested", "message", "files"]),
    analyticsServiceType: "clearance",
    confirmationEmailVariant: "clearance",
  }),
  offer_check: Object.freeze({
    coreFields: Object.freeze(["cityOrZip", "scope"]),
    optionalFields: Object.freeze(["desiredDate", "message", "files"]),
    analyticsServiceType: "offer_check",
    confirmationEmailVariant: "offer_check",
  }),
  general: Object.freeze({
    coreFields: Object.freeze(["cityOrZip", "scope"]),
    optionalFields: Object.freeze(["desiredDate", "message", "files"]),
    analyticsServiceType: "general",
    confirmationEmailVariant: "general",
  }),
});

const cleaningUpgrades = Object.freeze([
  "Fenster- und Glasflächen",
  "Küche",
  "Sanitärbereiche",
  "Treppenhaus",
  "Grundreinigung",
]);

const movingUpgrades = Object.freeze([
  "Möbeldemontage",
  "Möbelmontage",
  "Verpackung",
  "Entrümpelung",
  "Reinigung",
]);

const both = Object.freeze(["duesseldorf", "regensburg"]);
const regensburg = Object.freeze(["regensburg"]);

function service(entry) {
  return Object.freeze({
    intent: `${entry.id}-anfrage`,
    allowedUpgrades: Object.freeze(entry.allowedUpgrades || []),
    successMessage:
      "Vielen Dank. Wir haben Ihre Angaben erhalten und prüfen den gewünschten Umfang persönlich.",
    dashboardLabel: entry.name,
    ...entry,
  });
}

export const REQUEST_SERVICE_POLICY = Object.freeze([
  service({ id: "reinigung", name: "Reinigung", category: "cleaning", locations: both, leadService: "reinigung", formProfile: "cleaning", allowedUpgrades: cleaningUpgrades }),
  service({ id: "ferienwohnung-reinigung", name: "Ferienwohnungs- und Apartmentreinigung", category: "cleaning", locations: both, leadService: "reinigung", formProfile: "cleaning", allowedUpgrades: ["Wäschewechsel nach Absprache", "Schlüsselkoordination nach Absprache", "Fotodokumentation nach Absprache", "Inventarhinweise nach Absprache"] }),
  service({ id: "bueroreinigung", name: "Büroreinigung", category: "cleaning", locations: both, leadService: "bueroreinigung", formProfile: "cleaning" }),
  service({ id: "gewerbereinigung", name: "Gewerbereinigung", category: "cleaning", locations: both, leadService: "gewerbereinigung", formProfile: "cleaning" }),
  service({ id: "praxisreinigung", name: "Praxisreinigung", category: "cleaning", locations: both, leadService: "praxisreinigung", formProfile: "cleaning" }),
  service({ id: "fensterreinigung", name: "Fensterreinigung", category: "cleaning", locations: both, leadService: "fensterreinigung", formProfile: "cleaning" }),
  service({ id: "grundreinigung", name: "Grundreinigung", category: "cleaning", locations: both, leadService: "reinigung", formProfile: "cleaning" }),
  service({ id: "unterhaltsreinigung", name: "Unterhaltsreinigung", category: "cleaning", locations: both, leadService: "unterhaltsreinigung", formProfile: "cleaning" }),
  service({ id: "treppenhausreinigung", name: "Treppenhausreinigung", category: "cleaning", locations: both, leadService: "treppenhausreinigung", formProfile: "cleaning" }),
  service({ id: "baureinigung", name: "Bau- und Bauendreinigung", category: "cleaning", locations: both, leadService: "reinigung", formProfile: "cleaning" }),
  service({ id: "endreinigung", name: "Endreinigung", category: "cleaning", locations: regensburg, leadService: "reinigung", formProfile: "cleaning" }),

  service({ id: "umzug", name: "Umzug", category: "moving", locations: regensburg, leadService: "umzug", formProfile: "moving", allowedUpgrades: movingUpgrades }),
  service({ id: "seniorenumzug", name: "Seniorenumzug", category: "moving", locations: regensburg, leadService: "seniorenumzug", formProfile: "moving", allowedUpgrades: movingUpgrades }),
  service({ id: "moebeltransport", name: "Möbeltransport", category: "moving", locations: regensburg, leadService: "moebeltransport", formProfile: "furniture" }),
  service({ id: "klaviertransport", name: "Klaviertransport", category: "moving", locations: regensburg, leadService: "klaviertransport", formProfile: "piano" }),
  service({ id: "beiladung-rueckfahrt", name: "Beiladung und Rückfahrt", category: "moving", locations: regensburg, leadService: "moebeltransport", formProfile: "furniture" }),
  service({ id: "umzug-mit-reinigung", name: "Umzug mit Reinigung", category: "moving", locations: regensburg, leadService: "umzug", formProfile: "moving", allowedUpgrades: movingUpgrades }),

  service({ id: "entruempelung", name: "Entrümpelung", category: "clearance", locations: regensburg, leadService: "entruempelung", formProfile: "clearance" }),
  service({ id: "kellerentruempelung", name: "Kellerentrümpelung", category: "clearance", locations: regensburg, leadService: "entruempelung", formProfile: "clearance" }),
  service({ id: "haushaltsaufloesung", name: "Haushaltsauflösung", category: "clearance", locations: regensburg, leadService: "wohnungsaufloesung", formProfile: "clearance" }),
  service({ id: "wohnungsaufloesung", name: "Wohnungsauflösung", category: "clearance", locations: regensburg, leadService: "wohnungsaufloesung", formProfile: "clearance" }),
  service({ id: "nachlassaufloesung", name: "Nachlassauflösung", category: "clearance", locations: regensburg, leadService: "wohnungsaufloesung", formProfile: "clearance" }),

  service({ id: "angebotscheck", name: "FLOXANT Angebotscheck", category: "offer_check", locations: both, leadService: "angebot-pruefen", formProfile: "offer_check" }),
  service({ id: "anbieter-vergleichen", name: "FLOXANT Anbietervergleich", category: "offer_check", locations: both, leadService: "angebot-pruefen", formProfile: "offer_check" }),
  service({ id: "objektbrief", name: "FLOXANT Objektbrief", category: "offer_check", locations: both, leadService: "angebot-pruefen", formProfile: "offer_check" }),
  service({ id: "uebergabeakte", name: "FLOXANT Übergabeakte", category: "offer_check", locations: both, leadService: "angebot-pruefen", formProfile: "offer_check" }),
  service({ id: "plan-b-service", name: "FLOXANT Plan-B-Service", category: "offer_check", locations: both, leadService: "angebot-pruefen", formProfile: "offer_check" }),

  service({ id: "diskret-service", name: "FLOXANT Diskret-Service", category: "clearance", locations: both, leadService: "diskret-service", formProfile: "general" }),
]);

export const REQUEST_UNSURE_SERVICES = Object.freeze([
  service({ id: "reinigung", name: "Reinigung", category: "cleaning", locations: ["unsicher"], leadService: "reinigung", formProfile: "cleaning", allowedUpgrades: cleaningUpgrades }),
  service({ id: "umzug", name: "Umzug", category: "moving", locations: ["unsicher"], leadService: "umzug", formProfile: "moving", allowedUpgrades: movingUpgrades }),
  service({ id: "raeumung-aufloesung", name: "Räumung oder Auflösung", category: "clearance", locations: ["unsicher"], leadService: "entruempelung", formProfile: "clearance" }),
  service({ id: "sonstiges", name: "Andere Anfrage", category: "general", locations: ["unsicher"], leadService: "sonstiges", formProfile: "general" }),
]);

const REQUEST_SERVICE_ALIASES = Object.freeze({
  cleaning: "reinigung",
  "cleaning-service": "reinigung",
  "house-cleaning": "reinigung",
  "holiday-apartment-cleaning": "ferienwohnung-reinigung",
  "office-cleaning": "bueroreinigung",
  "commercial-cleaning": "gewerbereinigung",
  "practice-cleaning": "praxisreinigung",
  "window-cleaning": "fensterreinigung",
  "deep-cleaning": "grundreinigung",
  "maintenance-cleaning": "unterhaltsreinigung",
  "recurring-cleaning": "unterhaltsreinigung",
  "routine-cleaning": "unterhaltsreinigung",
  "staircase-cleaning": "treppenhausreinigung",
  "stairwell-cleaning": "treppenhausreinigung",
  "construction-cleaning": "baureinigung",
  "post-construction-cleaning": "baureinigung",
  bauendreinigung: "baureinigung",
  umzugsreinigung: "reinigung",
  "move-out-cleaning": "endreinigung",
  moving: "umzug",
  "moving-help": "umzug",
  "senior-moving": "seniorenumzug",
  "senior-moving-service": "seniorenumzug",
  "furniture-moving": "moebeltransport",
  "furniture-transport": "moebeltransport",
  moebelmontage: "moebeltransport",
  "piano-transport": "klaviertransport",
  "shared-load-and-return-trip-transport": "beiladung-rueckfahrt",
  "house-clearance": "entruempelung",
  decluttering: "entruempelung",
  "basement-clearance": "kellerentruempelung",
  "household-clearance": "haushaltsaufloesung",
  "apartment-clearance": "wohnungsaufloesung",
  "estate-clearance": "nachlassaufloesung",
  "offer-check": "angebotscheck",
  "quote-check": "angebotscheck",
  "quote-review": "angebotscheck",
  "provider-comparison": "anbieter-vergleichen",
  "property-brief": "objektbrief",
  "handover-brief": "uebergabeakte",
  "handover-file": "uebergabeakte",
  "backup-assessment": "plan-b-service",
  "discreet-request": "diskret-service",
  "discreet-service": "diskret-service",
  "moving-with-cleaning": "umzug-mit-reinigung",
  entsorgung: "entruempelung",
  raeumung: "entruempelung",
  "raeumung-aufloesung": "raeumung-aufloesung",
  leerfahrt: "beiladung-rueckfahrt",
  rueckfahrt: "beiladung-rueckfahrt",
  kleintransport: "moebeltransport",
  "angebot-pruefen": "angebotscheck",
  "hausverwaltung-reinigung": "treppenhausreinigung",
  "property-cleaning": "treppenhausreinigung",
  "property-management-cleaning": "treppenhausreinigung",
  gebaeudereinigung: "gewerbereinigung",
  "building-cleaning": "gewerbereinigung",
  b2b: "bueroreinigung",
});

export function normalizeRequestPolicyToken(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getRequestServicesForLocation(location) {
  const normalizedLocation = normalizeRequestPolicyToken(location);
  if (normalizedLocation === "unsicher") return REQUEST_UNSURE_SERVICES;
  return REQUEST_SERVICE_POLICY.filter((entry) => entry.locations.includes(normalizedLocation));
}

export function getRequestService(location, serviceId) {
  const rawService = normalizeRequestPolicyToken(serviceId);
  const normalizedService = REQUEST_SERVICE_ALIASES[rawService] || rawService;
  const options = getRequestServicesForLocation(location);
  return (
    options.find((entry) => entry.id === normalizedService) ||
    options.find((entry) => entry.leadService === normalizedService) ||
    null
  );
}

export function isAllowedRequestCombination(location, serviceId) {
  return Boolean(getRequestService(location, serviceId));
}

export function getRequestFormProfile(profile) {
  return REQUEST_FORM_PROFILES[profile] || REQUEST_FORM_PROFILES.general;
}

export function getCanonicalRequestUpgrade(serviceEntry, value) {
  const normalizedValue = normalizeRequestPolicyToken(value);
  if (!normalizedValue || !serviceEntry?.allowedUpgrades) return null;
  return serviceEntry.allowedUpgrades.find(
    (upgrade) => normalizeRequestPolicyToken(upgrade) === normalizedValue,
  ) || null;
}
