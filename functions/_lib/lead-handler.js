import {
  PayloadValidationError,
  assertAllowedFileFields,
  normalizeLeadPayload,
} from "./lead-payload.js";
import { normalizeCleaningRequest } from "./cleaning-request.js";
import { normalizeServiceRequest } from "./service-request.js";
import {
  REQUEST_ATTACHMENT_RULES,
  REQUEST_LOCATION_OPTIONS,
  getCanonicalRequestUpgrade,
  getRequestFormProfile,
  getRequestService,
  isAllowedRequestCombination,
  normalizeRequestPolicyToken,
} from "../../lib/booking/request-service-policy.js";

const MAX_FILE_BYTES = REQUEST_ATTACHMENT_RULES.maxFileBytes;
const MAX_TOTAL_FILE_BYTES = REQUEST_ATTACHMENT_RULES.maxTotalBytes;
const MAX_REQUEST_BYTES = 50 * 1024 * 1024;
const MAX_FILES = REQUEST_ATTACHMENT_RULES.maxFiles;
const ALLOWED_FILE_TYPES = new Set(REQUEST_ATTACHMENT_RULES.allowedMimeTypes);
const RESEND_TIMEOUT_MS = 4_000;
const PUBLIC_ORIGINS = new Set([
  "https://www.floxant.de",
  "https://floxant.de",
  "https://floxant.pages.dev",
]);

class ValidationFailure extends Error {
  constructor(fields) {
    super("VALIDATION_ERROR");
    this.fields = fields;
  }
}

class SubmissionFailure extends Error {
  constructor(internalType = "SUBMISSION_FAILED") {
    super("SUBMISSION_FAILED");
    this.internalType = internalType;
  }
}

function text(value) {
  return String(value ?? "").trim();
}

function firstText(...values) {
  return values.map(text).find(Boolean) || "";
}

function record(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function responseHeaders(request, env, extra = {}) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "X-Robots-Tag": "noindex, nofollow",
    ...extra,
  };
  const origin = request?.headers?.get("Origin");
  if (origin && isAllowedOrigin(origin, env)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers.Vary = "Origin";
  }
  return headers;
}

function json(body, status, request, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders(request, env),
  });
}

function configuredOrigins(env) {
  return text(env?.ALLOWED_FORM_ORIGINS)
    .split(/[\s,]+/)
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => {
      try {
        return new URL(value).origin;
      } catch {
        return "";
      }
    })
    .filter(Boolean);
}

function isAllowedOrigin(origin, env) {
  if (!origin) return true;
  try {
    const parsed = new URL(origin);
    if (PUBLIC_ORIGINS.has(parsed.origin)) return true;
    if (
      (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1" || parsed.hostname === "[::1]")
      && (parsed.protocol === "http:" || parsed.protocol === "https:")
    ) {
      return true;
    }
    return configuredOrigins(env).includes(parsed.origin);
  } catch {
    return false;
  }
}

function allowedOrigin(request, env) {
  return isAllowedOrigin(request.headers.get("Origin"), env);
}

function parseJson(value, fallback = null) {
  if (typeof value !== "string" || !value.trim()) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isTruthyConsent(value) {
  if (value === true || value === 1) return true;
  if (Array.isArray(value)) return value.some(isTruthyConsent);
  return ["true", "1", "yes", "ja", "on", "accepted"].includes(text(value).toLowerCase());
}

function hasHeaderInjection(value) {
  return /[\r\n]/.test(String(value ?? ""));
}

function safeFileName(value) {
  return text(value).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "upload";
}

function encodeObjectPath(value) {
  return value.split("/").map(encodeURIComponent).join("/");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeService(value) {
  const raw = text(value).toLowerCase().replace(/[\s-]+/g, "_").slice(0, 100);
  const aliases = {
    offer_check: "angebot_pruefen",
    quote_check: "angebot_pruefen",
    angebotscheck: "angebot_pruefen",
    transport: "transport",
    kleintransport: "transport",
    moebeltransport: "transport",
    klaviertransport: "transport",
    entrümpelung: "entsorgung",
    entruempelung: "entsorgung",
    wohnungsaufloesung: "entsorgung",
    haushaltsaufloesung: "entsorgung",
    b2b_cleaning: "b2b_reinigung",
    bueroreinigung: "b2b_reinigung",
    gewerbereinigung: "b2b_reinigung",
    private_client_inquiry: "private_client",
    villenservice: "private_client",
  };
  return aliases[raw] || raw || "umzug";
}

function isSafeRequestPolicyToken(value) {
  const raw = text(value);
  return /^[\p{L}\p{N} _-]{1,80}$/u.test(raw);
}

const REQUIRED_REQUEST_FIELD_LABELS = Object.freeze({
  location: "Standort",
  objectType: "Objektart",
  areaSize: "Fläche oder Umfang",
  scope: "Leistungsumfang",
  frequency: "Turnus",
  desiredDate: "gewünschten Termin",
  startLocation: "Startort",
  destinationLocation: "Zielort",
  itemDescription: "Möbel oder Gegenstände",
  dimensions: "Maße",
  instrumentType: "Instrumentenart",
  floor: "Etage",
  elevator: "Aufzugangabe",
});

function requestListValues(...values) {
  const flattened = values.flatMap((value) => {
    if (Array.isArray(value)) return requestListValues(...value);
    if (value && typeof value === "object") {
      return Object.entries(value)
        .filter(([, enabled]) => isTruthyConsent(enabled))
        .map(([key]) => key);
    }
    if (typeof value === "string") return value.split(/[|,]/).map((item) => item.trim());
    return [];
  });
  return [...new Set(flattened.map(text).filter(Boolean))];
}

function requestCoreFieldValue(payload, configuration, rawFields, detailService, field) {
  const direct = [payload[field], configuration[field], rawFields[field]];
  const aliases = {
    location: [
      payload.location,
      detailService.regionPreset,
      configuration.locationId,
      configuration.location,
      rawFields.location,
      rawFields.cityOrZip,
      payload.cityOrZip,
    ],
    objectType: [payload.objectType, configuration.objectType, configuration.propertyType, rawFields.objectType, rawFields.propertyType],
    areaSize: [payload.areaSize, configuration.areaSize, configuration.area, rawFields.areaSize, rawFields.area],
    scope: [payload.scope, configuration.scope, rawFields.scope],
    frequency: [payload.frequency, payload.cleaningFrequency, configuration.frequency, configuration.cleaningFrequency, rawFields.frequency, rawFields.cleaningFrequency],
    desiredDate: [payload.desiredDate, configuration.desiredDate, configuration.preferredDate, configuration.timeframe, rawFields.desiredDate, rawFields.preferredDate],
    startLocation: [payload.startLocation, configuration.startLocation, rawFields.startLocation],
    destinationLocation: [payload.destinationLocation, configuration.destinationLocation, rawFields.destinationLocation],
    itemDescription: [payload.itemDescription, configuration.itemDescription, rawFields.itemDescription],
    dimensions: [payload.dimensions, configuration.dimensions, rawFields.dimensions],
    instrumentType: [payload.instrumentType, configuration.instrumentType, rawFields.instrumentType],
    floor: [payload.floor, configuration.floor, rawFields.floor],
    elevator: [payload.elevator, configuration.elevator, rawFields.elevator],
  };
  return firstText(...(aliases[field] || direct));
}

function validateProfessionalRequestContext(payload) {
  const details = record(payload.details);
  const configuration = record(details.configuration);
  const rawFields = record(configuration.rawFields);
  const detailService = record(details.service);
  const metadata = record(details.metadata);
  const typeMarkers = [
    ["type", payload.type],
    ["lead_type", payload.lead_type],
    ["requestContext", configuration.requestContext],
    ["leadType", configuration.leadType],
  ].map(([field, value]) => ({ field, raw: text(value), normalized: normalizeRequestPolicyToken(value) }))
    .filter((marker) => marker.raw);
  const hasProfessionalTypeMarker = typeMarkers.some((marker) => marker.normalized === "professional-request");
  const sourceComponent = normalizeRequestPolicyToken(payload.sourceComponent);
  const intakeVersion = normalizeRequestPolicyToken(metadata.intakeVersion);
  const hasCentralSourceMarker = ["professionalrequestform", "professional-request-form"].includes(sourceComponent);
  const hasCentralVersionMarker = intakeVersion === "professional-request"
    || intakeVersion.startsWith("professional-request-");
  const hasCentralConfigurationMarker = Boolean(
    payload.serviceId
    || configuration.serviceId
    || configuration.formProfile
    || configuration.confirmationEmailVariant,
  );
  const isProfessionalRequest = hasProfessionalTypeMarker
    || hasCentralSourceMarker
    || hasCentralVersionMarker
    || hasCentralConfigurationMarker;
  if (!isProfessionalRequest) return null;

  const conflictingTypeMarkers = typeMarkers.filter((marker) => marker.normalized !== "professional-request");
  if (conflictingTypeMarkers.length) {
    throw new ValidationFailure({
      type: "Die Anfrageart ist widersprüchlich. Bitte laden Sie das Formular neu.",
      form: "Bitte prüfen Sie die Anfrageart und senden Sie erneut.",
    });
  }

  const location = firstText(
    payload.location,
    detailService.regionPreset,
    configuration.locationId,
    configuration.location,
    rawFields.location,
    rawFields.cityOrZip,
    payload.cityOrZip,
  );
  const serviceId = firstText(
    payload.serviceId,
    configuration.serviceId,
    configuration.service,
    rawFields.serviceId,
    rawFields.service,
    payload.serviceCategory,
    detailService.type,
    typeof payload.service === "string" ? payload.service : "",
  );
  const fields = {};
  if (!location) fields.location = "Bitte wählen Sie einen gültigen Standort.";
  if (!serviceId) fields.serviceId = "Bitte wählen Sie eine verfügbare Leistung.";
  if (Object.keys(fields).length) throw new ValidationFailure(fields);
  if (!isSafeRequestPolicyToken(location) || !isSafeRequestPolicyToken(serviceId)) {
    throw new ValidationFailure({
      ...(!isSafeRequestPolicyToken(location) ? { location: "Bitte wählen Sie einen gültigen Standort." } : {}),
      ...(!isSafeRequestPolicyToken(serviceId) ? { serviceId: "Bitte wählen Sie eine verfügbare Leistung." } : {}),
      form: "Bitte wählen Sie Standort und Leistung erneut aus.",
    });
  }
  if (!isAllowedRequestCombination(location, serviceId)) {
    throw new ValidationFailure({
      serviceId: "Diese Leistung ist am gewählten Standort derzeit nicht verfügbar.",
      form: "Bitte wählen Sie Standort und Leistung erneut aus.",
    });
  }

  const serviceEntry = getRequestService(location, serviceId);
  if (!serviceEntry) {
    throw new ValidationFailure({ form: "Bitte wählen Sie Standort und Leistung erneut aus." });
  }
  const profile = getRequestFormProfile(serviceEntry.formProfile);
  const requiredFields = {};
  for (const field of profile.coreFields) {
    if (!requestCoreFieldValue(payload, configuration, rawFields, detailService, field)) {
      const label = REQUIRED_REQUEST_FIELD_LABELS[field] || field;
      requiredFields[field] = `Bitte ergänzen Sie ${label}.`;
    }
  }
  if (Object.keys(requiredFields).length) throw new ValidationFailure(requiredFields);

  const submittedUpgrades = requestListValues(
    payload.selectedAddons,
    payload.upgrades,
    configuration.selectedAddons,
    configuration.selectedServices,
    rawFields.selectedAddons,
    rawFields.selectedServices,
  );
  const canonicalUpgrades = [];
  const unsupportedUpgrades = [];
  for (const upgrade of submittedUpgrades) {
    const canonical = getCanonicalRequestUpgrade(serviceEntry, upgrade);
    if (!canonical) unsupportedUpgrades.push(upgrade);
    else if (!canonicalUpgrades.includes(canonical)) canonicalUpgrades.push(canonical);
  }
  if (unsupportedUpgrades.length) {
    throw new ValidationFailure({
      selectedAddons: "Mindestens eine Zusatzleistung ist für diese Anfrage nicht verfügbar.",
      form: "Bitte wählen Sie nur die angebotenen Zusatzleistungen aus.",
    });
  }

  const locationId = normalizeRequestPolicyToken(location);
  const locationOption = REQUEST_LOCATION_OPTIONS.find((entry) => entry.id === locationId);
  return {
    locationId,
    locationLabel: locationOption?.label || (locationId === "unsicher" ? "Standort noch offen" : location),
    serviceId: serviceEntry.id,
    serviceLabel: serviceEntry.name,
    leadService: serviceEntry.leadService,
    category: serviceEntry.category,
    intent: serviceEntry.intent,
    formProfile: serviceEntry.formProfile,
    confirmationEmailVariant: profile.confirmationEmailVariant,
    canonicalUpgrades,
  };
}

function canonicalizeProfessionalPayload(payload, professionalContext) {
  if (!professionalContext) return payload;
  const details = record(payload.details);
  const detailService = record(details.service);
  const configuration = record(details.configuration);
  const rawFields = record(configuration.rawFields);
  const canonicalService = normalizeService(professionalContext.leadService);
  const canonicalConfiguration = {
    ...configuration,
    requestContext: "professional_request",
    leadType: "professional_request",
    serviceId: professionalContext.serviceId,
    serviceLabel: professionalContext.serviceLabel,
    dashboardLabel: professionalContext.serviceLabel,
    service: professionalContext.serviceId,
    serviceType: canonicalService,
    serviceCategory: professionalContext.category,
    serviceSlug: professionalContext.serviceId,
    requestedService: professionalContext.serviceId,
    formProfile: professionalContext.formProfile,
    confirmationEmailVariant: professionalContext.confirmationEmailVariant,
    location: professionalContext.locationId,
    locationLabel: professionalContext.locationLabel,
    region: professionalContext.locationId,
    regionPreset: professionalContext.locationId,
    selectedAddons: professionalContext.canonicalUpgrades,
    selectedServices: professionalContext.canonicalUpgrades,
    rawFields: {
      ...rawFields,
      serviceId: professionalContext.serviceId,
      serviceLabel: professionalContext.serviceLabel,
      location: professionalContext.locationId,
      locationLabel: professionalContext.locationLabel,
      selectedAddons: professionalContext.canonicalUpgrades,
      selectedServices: professionalContext.canonicalUpgrades,
    },
  };
  return {
    ...payload,
    type: "professional_request",
    lead_type: "professional_request",
    service: canonicalService,
    serviceId: professionalContext.serviceId,
    serviceLabel: professionalContext.serviceLabel,
    serviceCategory: professionalContext.serviceId,
    location: professionalContext.locationId,
    locationLabel: professionalContext.locationLabel,
    intent: professionalContext.intent,
    selectedAddons: professionalContext.canonicalUpgrades,
    upgrades: professionalContext.canonicalUpgrades,
    details: {
      ...details,
      service: {
        ...detailService,
        id: professionalContext.serviceId,
        serviceId: professionalContext.serviceId,
        name: professionalContext.serviceLabel,
        type: canonicalService,
        label: professionalContext.serviceLabel,
        serviceLabel: professionalContext.serviceLabel,
        category: professionalContext.category,
        regionPreset: professionalContext.locationId,
      },
      configuration: canonicalConfiguration,
    },
  };
}

function readConfiguration(env) {
  const supabaseUrl = text(env?.SUPABASE_URL || env?.NEXT_PUBLIC_SUPABASE_URL).replace(/\/$/, "");
  const serviceRoleKey = text(env?.SUPABASE_SERVICE_ROLE_KEY);
  const missing = [];
  if (!supabaseUrl) missing.push("SUPABASE_URL_OR_NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (supabaseUrl) {
    try {
      const parsed = new URL(supabaseUrl);
      if (parsed.protocol !== "https:") missing.push("SUPABASE_URL_INVALID");
    } catch {
      missing.push("SUPABASE_URL_INVALID");
    }
  }
  return { supabaseUrl, serviceRoleKey, missing };
}

async function requestWithEnforcedSize(request) {
  const declaredLength = Number(request.headers.get("Content-Length") || 0);
  if (declaredLength > MAX_REQUEST_BYTES) {
    throw new ValidationFailure({ form: "Die Anfrage ist zu groß." });
  }
  if (!request.body) return request;

  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_REQUEST_BYTES) {
      await reader.cancel();
      throw new ValidationFailure({ form: "Die Anfrage ist zu groß." });
    }
    chunks.push(value);
  }

  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new Request(request.url, {
    method: request.method,
    headers: request.headers,
    body,
  });
}

async function parsePayload(request) {
  const sizedRequest = await requestWithEnforcedSize(request);
  const contentType = sizedRequest.headers.get("Content-Type") || "";

  if (contentType.includes("application/json")) {
    try {
      const payload = await sizedRequest.json();
      if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
        throw new ValidationFailure({ form: "Das Anfrageformat ist ungültig." });
      }
      return { payload, files: [] };
    } catch (error) {
      if (error instanceof ValidationFailure) throw error;
      throw new ValidationFailure({ form: "Das Anfrageformat ist ungültig." });
    }
  }

  if (!contentType.includes("multipart/form-data") && !contentType.includes("application/x-www-form-urlencoded")) {
    throw new ValidationFailure({ form: "Das Anfrageformat wird nicht unterstützt." });
  }

  let formData;
  try {
    formData = await sizedRequest.formData();
  } catch {
    throw new ValidationFailure({ form: "Die Formulardaten konnten nicht gelesen werden." });
  }

  const payload = {};
  const files = [];
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      if (Object.hasOwn(payload, key)) {
        payload[key] = Array.isArray(payload[key]) ? [...payload[key], value] : [payload[key], value];
      } else {
        payload[key] = value;
      }
    } else if (value.size > 0) {
      files.push({ field: key, file: value });
    }
  }

  const details = parseJson(payload.details);
  if (details) payload.details = details;
  const upgrades = parseJson(payload.upgrades);
  if (upgrades) payload.upgrades = upgrades;
  return { payload, files };
}

async function fileMatchesType(file) {
  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (file.type === "application/pdf") {
    return bytes.length >= 5 && String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-";
  }
  if (file.type === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (file.type === "image/png") {
    return bytes.length >= 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, index) => bytes[index] === value);
  }
  if (file.type === "image/webp") {
    return bytes.length >= 12
      && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF"
      && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  }
  return false;
}

async function validateFiles(files) {
  if (files.length > MAX_FILES) {
    throw new ValidationFailure({ files: `Maximal ${MAX_FILES} Dateien sind erlaubt.` });
  }
  const totalBytes = files.reduce((sum, { file }) => sum + file.size, 0);
  if (totalBytes > MAX_TOTAL_FILE_BYTES) {
    throw new ValidationFailure({ files: "Die Dateien dürfen zusammen maximal 24 MiB groß sein." });
  }
  for (const { file } of files) {
    if (file.size > MAX_FILE_BYTES) {
      throw new ValidationFailure({ files: "Maximal 8 MiB pro Datei sind erlaubt." });
    }
    if (!ALLOWED_FILE_TYPES.has(file.type) || !(await fileMatchesType(file))) {
      throw new ValidationFailure({ files: "Nur gültige PDF-, JPG-, PNG- oder WebP-Dateien sind erlaubt." });
    }
  }
}

function validateSubmission(payload) {
  const fields = {};
  const existingContact = payload.details?.contact || payload.contact || {};
  const contact = {
    name: firstText(payload.name, payload.fullName, payload.contactName, existingContact.fullName),
    email: firstText(payload.email, existingContact.email),
    phone: firstText(payload.phone, existingContact.phone),
  };

  if (firstText(payload.companyWebsite, payload.website, payload.url)) {
    throw new ValidationFailure({ form: "Die Anfrage konnte nicht angenommen werden." });
  }
  if (contact.name.length < 2 || contact.name.length > 120 || hasHeaderInjection(contact.name)) {
    fields.name = "Bitte geben Sie einen gültigen Namen an.";
  }
  if (contact.email && (contact.email.length > 254 || !isValidEmail(contact.email) || hasHeaderInjection(contact.email))) {
    fields.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  }
  const phoneDigits = contact.phone.replace(/\D/g, "");
  if (contact.phone && (phoneDigits.length < 6 || phoneDigits.length > 20 || contact.phone.length > 50 || hasHeaderInjection(contact.phone))) {
    fields.phone = "Bitte geben Sie eine gültige Telefonnummer an.";
  }
  if (!contact.email && !contact.phone) {
    fields.contact = "Bitte geben Sie eine Telefonnummer oder E-Mail-Adresse an.";
  }

  const consent = firstText(
    payload.privacyConsent,
    payload.privacy,
    payload.consent,
    payload.dataProtectionConsent,
    payload.details?.configuration?.privacyConsent,
    payload.details?.metadata?.privacyConsent,
  );
  if (!isTruthyConsent(consent)) {
    fields.privacyConsent = "Bitte bestätigen Sie den Datenschutz-Hinweis.";
  }

  if (payload.timestamp) {
    const timestamp = Date.parse(text(payload.timestamp));
    if (!Number.isFinite(timestamp) || timestamp > Date.now() + 10 * 60 * 1000) {
      fields.timestamp = "Bitte prüfen Sie den Zeitpunkt der Anfrage.";
    }
  }
  if (payload.formStartedAt !== undefined && text(payload.formStartedAt)) {
    const startedAt = Number(payload.formStartedAt);
    const elapsed = Date.now() - startedAt;
    if (!Number.isFinite(startedAt) || elapsed < 0 || elapsed > 24 * 60 * 60 * 1000) {
      fields.formStartedAt = "Bitte laden Sie das Formular neu und versuchen Sie es erneut.";
    } else if (elapsed < 1_500) {
      fields.form = "Bitte prüfen Sie Ihre Angaben kurz und senden Sie dann erneut.";
    }
  }
  if (Object.keys(fields).length) throw new ValidationFailure(fields);
  return contact;
}

function buildDetails(payload, contact, service, uploadedFiles, request, professionalContext = null) {
  const normalizedPayload = professionalContext
    ? {
        ...payload,
        serviceId: professionalContext.serviceId,
        serviceLabel: professionalContext.serviceLabel,
        location: professionalContext.locationId,
        locationLabel: professionalContext.locationLabel,
      }
    : payload;
  const existing = payload.details && typeof payload.details === "object"
    ? payload.details
    : {
        contact: payload.contact && typeof payload.contact === "object" ? payload.contact : undefined,
        service: payload.service && typeof payload.service === "object" ? payload.service : undefined,
        valuation: payload.valuation && typeof payload.valuation === "object" ? payload.valuation : undefined,
        configuration: payload.configuration && typeof payload.configuration === "object" ? payload.configuration : undefined,
        metadata: payload.metadata && typeof payload.metadata === "object" ? payload.metadata : undefined,
      };
  const now = new Date().toISOString();
  const legacyDetailsText = typeof payload.details === "string" ? text(payload.details) : "";
  const requestedLocale = firstText(existing.metadata?.locale, payload.locale);
  const acceptLanguage = firstText(request?.headers?.get?.("Accept-Language"));
  const locale = requestedLocale || (/^en(?:-|,|;|$)/i.test(acceptLanguage) ? "en" : "de");
  const excludedRawFields = new Set([
    "details",
    "upgrades",
    "contact",
    "service",
    "valuation",
    "configuration",
    "metadata",
    "companyWebsite",
    "website",
    "url",
  ]);
  const rawFields = Object.fromEntries(Object.entries(normalizedPayload).filter(([key]) => !excludedRawFields.has(key)));
  const normalizedCleaningRequest = normalizeCleaningRequest(normalizedPayload, service, locale);
  const normalizedServiceRequest = normalizeServiceRequest(normalizedPayload, service, locale);
  return {
    ...existing,
    contact: {
      ...(existing.contact || {}),
      fullName: firstText(existing.contact?.fullName, contact.name, "Interessent"),
      email: firstText(existing.contact?.email, contact.email),
      phone: firstText(existing.contact?.phone, contact.phone),
      notes: firstText(existing.contact?.notes, payload.message, payload.note),
    },
    service: {
      ...(existing.service || {}),
      type: professionalContext
        ? normalizeService(professionalContext.leadService)
        : normalizeService(firstText(existing.service?.type, service)),
      ...(professionalContext ? {
        id: professionalContext.serviceId,
        serviceId: professionalContext.serviceId,
        name: professionalContext.serviceLabel,
        label: professionalContext.serviceLabel,
        serviceLabel: professionalContext.serviceLabel,
        category: professionalContext.category,
        regionPreset: professionalContext.locationId,
      } : {}),
      source: firstText(existing.service?.source, payload.leadSource, payload.source, payload.type, "cloudflare_pages_form"),
      entryPoint: firstText(existing.service?.entryPoint, payload.landingPage, payload.sourcePage, "/kontakt"),
    },
    configuration: {
      ...(existing.configuration || {}),
      cloudflarePagesSubmission: true,
      privacyConsent: true,
      rawFields,
      uploadMetadata: uploadedFiles,
      ...(professionalContext ? {
        requestContext: "professional_request",
        leadType: "professional_request",
        serviceId: professionalContext.serviceId,
        serviceLabel: professionalContext.serviceLabel,
        dashboardLabel: professionalContext.serviceLabel,
        service: professionalContext.serviceId,
        serviceType: normalizeService(professionalContext.leadService),
        serviceCategory: professionalContext.category,
        serviceSlug: professionalContext.serviceId,
        requestedService: professionalContext.serviceId,
        formProfile: professionalContext.formProfile,
        confirmationEmailVariant: professionalContext.confirmationEmailVariant,
        location: professionalContext.locationId,
        locationLabel: professionalContext.locationLabel,
        region: professionalContext.locationId,
        regionPreset: professionalContext.locationId,
        selectedAddons: professionalContext.canonicalUpgrades,
        selectedServices: professionalContext.canonicalUpgrades,
      } : {}),
      ...(legacyDetailsText ? { legacyDetailsText } : {}),
      ...(normalizedCleaningRequest ? { cleaningRequest: normalizedCleaningRequest } : {}),
      serviceRequest: normalizedServiceRequest,
    },
    metadata: {
      ...(existing.metadata || {}),
      createdAt: firstText(existing.metadata?.createdAt, payload.timestamp, now),
      intakeVersion: firstText(existing.metadata?.intakeVersion, "cloudflare-pages-v2"),
      locale,
    },
  };
}

async function uploadFiles(files, configuration, requestId) {
  if (!files.length) return [];
  const uploaded = [];
  for (let index = 0; index < files.length; index += 1) {
    const { field, file } = files[index];
    const storagePath = `cloudflare-pages/${new Date().toISOString().slice(0, 10)}/${requestId}/${index}_${safeFileName(file.name)}`;
    const uploadUrl = `${configuration.supabaseUrl}/storage/v1/object/uploads/${encodeObjectPath(storagePath)}`;
    let response;
    try {
      response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          apikey: configuration.serviceRoleKey,
          Authorization: `Bearer ${configuration.serviceRoleKey}`,
          "Content-Type": file.type,
          "x-upsert": "false",
        },
        body: file,
      });
    } catch {
      throw new SubmissionFailure("UPLOAD_REQUEST_FAILED");
    }
    if (!response.ok) throw new SubmissionFailure("UPLOAD_FAILED");
    uploaded.push({
      field,
      originalName: safeFileName(file.name),
      storagePath,
      publicUrl: `${configuration.supabaseUrl}/storage/v1/object/public/uploads/${encodeObjectPath(storagePath)}`,
      contentType: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    });
  }
  return uploaded;
}

async function insertBooking(booking, configuration) {
  let response;
  try {
    response = await fetch(`${configuration.supabaseUrl}/rest/v1/bookings?select=id`, {
      method: "POST",
      headers: {
        apikey: configuration.serviceRoleKey,
        Authorization: `Bearer ${configuration.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify([booking]),
    });
  } catch {
    throw new SubmissionFailure("DATABASE_REQUEST_FAILED");
  }
  if (!response.ok) throw new SubmissionFailure("DATABASE_INSERT_FAILED");
  let rows;
  try {
    rows = await response.json();
  } catch {
    throw new SubmissionFailure("DATABASE_RESPONSE_INVALID");
  }
  if (!rows?.[0]?.id) throw new SubmissionFailure("DATABASE_ID_MISSING");
  return String(rows[0].id);
}

async function sendResendEmail(apiKey, message) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), RESEND_TIMEOUT_MS);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
      signal: controller.signal,
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  } finally {
    clearTimeout(timeout);
  }
}

function customerRequestFacts(details) {
  const configuration = record(details.configuration);
  const rawFields = record(configuration.rawFields);
  const serviceRequest = record(configuration.serviceRequest);
  const route = record(serviceRequest.route);
  const item = record(serviceRequest.item);
  const object = record(serviceRequest.object);
  const candidates = [
    ["Gewünschter Termin", serviceRequest.desiredPeriod],
    ["Startort", firstText(route.startLocation, configuration.startLocation, rawFields.startLocation)],
    ["Zielort", firstText(route.destinationLocation, configuration.destinationLocation, rawFields.destinationLocation)],
    ["Instrument oder Gegenstand", firstText(item.instrumentType, item.description)],
    ["Maße", item.dimensions],
    ["Objektart", object.type],
    ["Fläche oder Umfang", firstText(object.area, object.size)],
    ["Turnus", serviceRequest.frequency],
    ["Leistungsumfang", serviceRequest.scope],
  ];
  return candidates
    .map(([label, value]) => ({ label, value: text(value) }))
    .filter((fact) => fact.value && fact.value !== "[object Object]")
    .slice(0, 4);
}

async function sendNotifications({
  bookingId,
  contact,
  service,
  serviceLabel,
  locationLabel,
  details,
  uploadedFiles,
}, env) {
  const apiKey = text(env?.RESEND_API_KEY);
  const recipient = text(env?.INTAKE_NOTIFICATION_EMAIL);
  if (!apiKey) return { status: "not_configured" };
  const from = text(env?.RESEND_FROM_EMAIL) || "FLOXANT Website <onboarding@resend.dev>";
  if (hasHeaderInjection(from)) return { status: "failed" };

  const uploadLinks = uploadedFiles.length
    ? `<ul>${uploadedFiles.map((item) => `<li><a href="${escapeHtml(item.publicUrl)}">${escapeHtml(item.originalName)}</a></li>`).join("")}</ul>`
    : "<p>Keine Uploads.</p>";
  const internalHtml = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#0f172a">
      <h1>Neue FLOXANT-Anfrage</h1>
      <p><strong>Vorgang:</strong> ${escapeHtml(bookingId)}</p>
      <p><strong>Service:</strong> ${escapeHtml(serviceLabel || service)}</p>
      <p><strong>Standort:</strong> ${escapeHtml(locationLabel || "-")}</p>
      <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(contact.email || "-")}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(contact.phone || "-")}</p>
      ${uploadLinks}
      <h2>Strukturierte Angaben</h2>
      <pre style="white-space:pre-wrap;background:#f8fafc;padding:16px;border-radius:8px">${escapeHtml(JSON.stringify(details, null, 2))}</pre>
    </div>`;

  let failed = false;
  const deliveries = [];
  if (recipient) {
    const recipientMailbox = recipient.replace(/^.*<([^>]+)>.*$/, "$1");
    if (hasHeaderInjection(recipient) || !isValidEmail(recipientMailbox)) {
      failed = true;
    } else {
      deliveries.push(sendResendEmail(apiKey, {
        from,
        to: [recipient],
        reply_to: contact.email || undefined,
        subject: `[FLOXANT Lead] ${serviceLabel || service} – ${contact.name}`,
        html: internalHtml,
      }));
    }
  }

  if (contact.email) {
    const serviceRow = serviceLabel
      ? `<tr><td style="padding:6px 0;color:#475569;vertical-align:top">Leistung</td><td style="padding:6px 0 6px 16px;font-weight:700">${escapeHtml(serviceLabel)}</td></tr>`
      : "";
    const locationRow = locationLabel
      ? `<tr><td style="padding:6px 0;color:#475569;vertical-align:top">Standort</td><td style="padding:6px 0 6px 16px;font-weight:700">${escapeHtml(locationLabel)}</td></tr>`
      : "";
    const factRows = customerRequestFacts(details)
      .map((fact) => `<tr><td style="padding:6px 0;color:#475569;vertical-align:top">${escapeHtml(fact.label)}</td><td style="padding:6px 0 6px 16px;font-weight:700">${escapeHtml(fact.value)}</td></tr>`)
      .join("");
    const customerHtml = `
      <div style="margin:0;background:#f8fafc;padding:20px 12px;font-family:Arial,sans-serif;color:#0f172a">
        <div style="box-sizing:border-box;width:100%;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;background:#ffffff;padding:24px">
          <p style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:700">Ihre unverbindliche Anfrage ist eingegangen</p>
          <p style="margin:0 0 18px;line-height:1.6">Guten Tag ${escapeHtml(contact.name)}, diese Nachricht bestätigt den Eingang Ihrer unverbindlichen Anfrage bei FLOXANT.</p>
          ${(serviceRow || locationRow || factRows) ? `<table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 18px"><tbody>${serviceRow}${locationRow}${factRows}</tbody></table>` : ""}
          <p style="margin:0 0 12px;line-height:1.6;color:#334155">Für eine verlässliche Einschätzung können Rückfragen oder – je nach Leistung und Umfang – eine Besichtigung erforderlich sein.</p>
          <p style="margin:0;line-height:1.6;color:#334155">Die Anfrage ist unverbindlich und noch keine Termin- oder Auftragsbestätigung.</p>
        </div>
      </div>`;
    deliveries.push(sendResendEmail(apiKey, {
      from,
      to: [contact.email],
      subject: "Ihre unverbindliche Anfrage ist eingegangen",
      html: customerHtml,
    }));
  }

  if (!deliveries.length) return { status: failed ? "failed" : "not_configured" };
  const deliveryStatuses = await Promise.all(deliveries);
  if (deliveryStatuses.includes("failed")) failed = true;
  return { status: failed ? "failed" : "sent" };
}

export function handleLeadOptions(context) {
  const requestId = crypto.randomUUID();
  const env = context.env || {};
  if (!allowedOrigin(context.request, env)) {
    return json({ ok: false, code: "ORIGIN_NOT_ALLOWED", requestId }, 403, context.request, env);
  }
  return new Response(null, {
    status: 204,
    headers: responseHeaders(context.request, env, {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Idempotency-Key",
      "Access-Control-Max-Age": "86400",
    }),
  });
}

export async function handleLeadSubmission(context) {
  const requestId = crypto.randomUUID();
  const env = context.env || {};
  try {
    if (!allowedOrigin(context.request, env)) {
      return json({ ok: false, code: "ORIGIN_NOT_ALLOWED", requestId }, 403, context.request, env);
    }

    const configuration = readConfiguration(env);
    if (configuration.missing.length) {
      console.error("Cloudflare lead configuration missing", { requestId, missing: configuration.missing });
      return json({ ok: false, code: "CONFIGURATION_ERROR", requestId }, 503, context.request, env);
    }

    const { payload: rawPayload, files } = await parsePayload(context.request);
    const payload = normalizeLeadPayload(rawPayload, context.request);
    const contact = validateSubmission(payload);
    const professionalContext = validateProfessionalRequestContext(payload);
    const effectivePayload = canonicalizeProfessionalPayload(payload, professionalContext);
    assertAllowedFileFields(files, context.request);
    await validateFiles(files);
    const uploadedFiles = await uploadFiles(files, configuration, requestId);
    const service = normalizeService(firstText(
      professionalContext?.leadService,
      effectivePayload.details?.service?.type,
      effectivePayload.service?.type,
      effectivePayload.service,
      effectivePayload.type,
      effectivePayload.lead_type,
    ));
    const details = buildDetails(effectivePayload, contact, service, uploadedFiles, context.request, professionalContext);
    const serviceRequest = record(details.configuration?.serviceRequest);
    const serviceLabel = firstText(professionalContext?.serviceLabel, serviceRequest.serviceLabel, service);
    const locationLabel = firstText(
      professionalContext?.locationLabel,
      serviceRequest.locationLabel,
      serviceRequest.location,
    );
    const fileUrls = uploadedFiles.map((item) => item.publicUrl);
    const booking = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      service,
      timestamp: firstText(effectivePayload.timestamp, details.metadata?.createdAt, new Date().toISOString()),
      status: "new",
      upgrades: professionalContext?.canonicalUpgrades || effectivePayload.upgrades || [],
      details,
      file_url: fileUrls[0] || null,
      file_urls: fileUrls,
    };

    const bookingId = await insertBooking(booking, configuration);
    const notification = await sendNotifications({
      bookingId,
      contact,
      service,
      serviceLabel,
      locationLabel,
      details,
      uploadedFiles,
    }, env);
    if (notification.status === "failed") {
      console.error("Cloudflare lead notification failed", { requestId, status: "NOTIFICATION_FAILED" });
    }
    return json({ ok: true, requestId, bookingId }, 201, context.request, env);
  } catch (error) {
    if (error instanceof ValidationFailure || error instanceof PayloadValidationError) {
      return json({
        ok: false,
        code: error.code || "VALIDATION_ERROR",
        requestId,
        fields: error.fields,
        ...(error.unsupportedFields?.length ? { unsupportedFields: error.unsupportedFields } : {}),
      }, 400, context.request, env);
    }
    console.error("Cloudflare lead submission failed", {
      requestId,
      status: 500,
      errorType: error?.internalType || error?.name || "UNKNOWN",
    });
    return json({ ok: false, code: "SUBMISSION_FAILED", requestId }, 500, context.request, env);
  }
}
