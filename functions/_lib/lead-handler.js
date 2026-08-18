import {
  PayloadValidationError,
  assertAllowedFileFields,
  normalizeLeadPayload,
} from "./lead-payload.js";
import { normalizeCleaningRequest } from "./cleaning-request.js";
import { normalizeServiceRequest } from "./service-request.js";
import { buildSupabaseServiceHeaders } from "./supabase-headers.js";
import {
  REQUEST_ATTACHMENT_RULES,
  REQUEST_LOCATION_OPTIONS,
  getCanonicalRequestUpgrade,
  getRequestFormProfile,
  getRequestService,
  isAllowedRequestCombination,
  normalizeRequestPolicyToken,
  validateRequestContact,
} from "../../lib/booking/request-service-policy.js";

const MAX_FILE_BYTES = REQUEST_ATTACHMENT_RULES.maxFileBytes;
const MAX_TOTAL_FILE_BYTES = REQUEST_ATTACHMENT_RULES.maxTotalBytes;
const MAX_REQUEST_BYTES = 50 * 1024 * 1024;
const MAX_FILES = REQUEST_ATTACHMENT_RULES.maxFiles;
const ALLOWED_FILE_TYPES = new Set(REQUEST_ATTACHMENT_RULES.allowedMimeTypes);
const RESEND_TIMEOUT_MS = 4_000;
const MAX_IDEMPOTENCY_KEY_LENGTH = 96;
const UUID_PATTERN = "[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}";
const PLAIN_IDEMPOTENCY_KEY = new RegExp(`^${UUID_PATTERN}$`, "i");
const NAMESPACED_IDEMPOTENCY_KEY = new RegExp(`^[a-z][a-z0-9_-]{0,31}:[0-9]{10,16}:${UUID_PATTERN}$`, "i");
const CLOUDFLARE_PROJECT_PREVIEW_SUFFIX = ".floxant.pages.dev";
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

class IdempotencyConflictFailure extends Error {
  constructor() {
    super("IDEMPOTENCY_CONFLICT");
  }
}

function text(value) {
  return String(value ?? "").trim();
}

function firstText(...values) {
  return values.map(text).find(Boolean) || "";
}

function firstPresent(...values) {
  return values.find(
    (value) => value !== undefined && value !== null && !(typeof value === "string" && !value.trim()),
  );
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

function readIdempotencyKey(request) {
  const rawKey = request.headers.get("Idempotency-Key");
  if (rawKey === null) return { key: null };

  const key = rawKey.trim();
  if (
    !key
    || key.length > MAX_IDEMPOTENCY_KEY_LENGTH
    || (!PLAIN_IDEMPOTENCY_KEY.test(key) && !NAMESPACED_IDEMPOTENCY_KEY.test(key))
  ) {
    return { key: null, invalid: true };
  }

  return { key: key.toLowerCase(), invalid: false };
}

function idempotencyBookingId(key) {
  if (!key) return "";
  const match = key.match(new RegExp(`(${UUID_PATTERN})$`, "i"));
  return match?.[1]?.toLowerCase() || "";
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
      parsed.protocol === "https:"
      && !parsed.port
      && parsed.hostname.endsWith(CLOUDFLARE_PROJECT_PREVIEW_SUFFIX)
    ) {
      return true;
    }
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

const STRUCTURED_SELECTION_FIELDS = Object.freeze([
  "selectedAddons",
  "selectedServices",
  "upgrades",
]);

function structuredSelectionItems(value, field) {
  if (Array.isArray(value)) {
    return value.flatMap((item) => structuredSelectionItems(item, field));
  }
  if (value && typeof value === "object") {
    return Object.entries(value)
      .filter(([, enabled]) => isTruthyConsent(enabled))
      .map(([key]) => key);
  }
  if (typeof value !== "string") {
    throw new ValidationFailure({ [field]: "Bitte wählen Sie die Zusatzleistungen erneut aus." });
  }

  const normalized = value.trim();
  if (!normalized) return [];
  if (normalized.startsWith("[") || normalized.startsWith("{")) {
    let parsed;
    try {
      parsed = JSON.parse(normalized);
    } catch {
      throw new ValidationFailure({ [field]: "Die Zusatzleistungen konnten nicht gelesen werden." });
    }
    if (!Array.isArray(parsed) && (!parsed || typeof parsed !== "object")) {
      throw new ValidationFailure({ [field]: "Bitte wählen Sie die Zusatzleistungen erneut aus." });
    }
    return structuredSelectionItems(parsed, field);
  }
  return normalized.split(/[|,]/).map((item) => item.trim()).filter(Boolean);
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

const VOLATILE_FINGERPRINT_FIELDS = new Set([
  "timestamp",
  "createdat",
  "submittedat",
  "updatedat",
  "formstartedat",
  "formdurationms",
  "eventtimestamp",
  "eventtime",
  "occurredat",
  "recordedat",
  "trackedat",
  "capturedat",
  "idempotencyfingerprint",
  "idempotencyrequestid",
]);

const ATTRIBUTION_FINGERPRINT_FIELDS = new Set([
  "source",
  "leadsource",
  "sourcecomponent",
  "sourcecontext",
  "sourcepage",
  "landingpage",
  "entrypage",
  "entrypoint",
  "campaign",
  "clientcontext",
  "locale",
  "priority",
]);

function isVolatileFingerprintField(key) {
  const normalized = String(key).replace(/[^a-z0-9]/gi, "").toLowerCase();
  return VOLATILE_FINGERPRINT_FIELDS.has(normalized)
    || ATTRIBUTION_FINGERPRINT_FIELDS.has(normalized)
    || /^(?:utm|gclid|gbraid|wbraid|fbclid|msclkid)/.test(normalized)
    || /^(?:conversion|journey|analytics|attribution|tracking)/.test(normalized);
}

function stableSubmissionValue(value) {
  if (Array.isArray(value)) return value.map(stableSubmissionValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .filter((key) => !isVolatileFingerprintField(key))
        .sort()
        .map((key) => [key, stableSubmissionValue(value[key])]),
    );
  }
  return value;
}

function hexDigest(buffer) {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function sha256(value) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : value;
  return hexDigest(await crypto.subtle.digest("SHA-256", bytes));
}

async function submissionFingerprint(payload, files) {
  const fileFacts = [];
  for (const { field, file } of files) {
    fileFacts.push({
      field,
      name: safeFileName(file.name),
      type: file.type,
      size: file.size,
      sha256: await sha256(await file.arrayBuffer()),
    });
  }
  const canonical = stableSubmissionValue({ payload, files: fileFacts });
  return `sha256:${await sha256(JSON.stringify(canonical))}`;
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
  cityOrZip: "Ort oder PLZ",
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
    cityOrZip: [
      payload.cityOrZip,
      configuration.cityOrZip,
      configuration.city,
      rawFields.cityOrZip,
      rawFields.city,
    ],
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
    payload.selectedServices,
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

function canonicalizeProfessionalPayload(payload, professionalContext, contact) {
  if (!professionalContext) return payload;
  const details = record(payload.details);
  const detailService = record(details.service);
  const configuration = record(details.configuration);
  const rawFields = record(configuration.rawFields);
  const canonicalService = normalizeService(professionalContext.leadService);
  const submittedLocation = firstText(
    payload.cityOrZip,
    professionalContext.locationLabel,
  );
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
    location: submittedLocation,
    locationId: professionalContext.locationId,
    locationLabel: submittedLocation,
    region: professionalContext.locationId,
    regionLabel: professionalContext.locationLabel,
    regionPreset: professionalContext.locationId,
    preferredContactMethod: contact.contactMethod,
    selectedAddons: professionalContext.canonicalUpgrades,
    selectedServices: professionalContext.canonicalUpgrades,
    rawFields: {
      ...rawFields,
      serviceId: professionalContext.serviceId,
      serviceLabel: professionalContext.serviceLabel,
      location: submittedLocation,
      locationId: professionalContext.locationId,
      locationLabel: submittedLocation,
      regionLabel: professionalContext.locationLabel,
      contactMethod: contact.contactMethod,
      preferredContactMethod: contact.contactMethod,
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
    locationId: professionalContext.locationId,
    locationLabel: submittedLocation,
    regionLabel: professionalContext.locationLabel,
    intent: professionalContext.intent,
    contactMethod: contact.contactMethod,
    preferredContactMethod: contact.contactMethod,
    selectedAddons: professionalContext.canonicalUpgrades,
    upgrades: professionalContext.canonicalUpgrades,
    details: {
      ...details,
      contact: {
        ...record(details.contact),
        fullName: contact.name,
        email: contact.email,
        phone: contact.phone,
        callbackPreference: contact.contactMethod,
      },
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
  for (const field of STRUCTURED_SELECTION_FIELDS) {
    if (!Object.hasOwn(payload, field)) continue;
    payload[field] = structuredSelectionItems(payload[field], field);
  }
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
  const contactInput = {
    name: firstText(payload.name, payload.fullName, payload.contactName, existingContact.fullName),
    email: firstText(payload.email, existingContact.email),
    phone: firstText(payload.phone, existingContact.phone),
    contactMethod: firstText(
      payload.preferredContactMethod,
      payload.contactMethod,
      existingContact.callbackPreference,
    ),
    privacyConsent: firstPresent(
      payload.privacyConsent,
      payload.privacy,
      payload.consent,
      payload.dataProtectionConsent,
      payload.details?.configuration?.privacyConsent,
      payload.details?.metadata?.privacyConsent,
    ),
  };
  const validatedContact = validateRequestContact(contactInput, {
    // Historical payloads without a preference stay compatible. As soon as a
    // form explicitly names a route, that route must have matching contact
    // data even when the request does not use the professional profile.
    requireContactMethod: Boolean(firstText(payload.preferredContactMethod, payload.contactMethod)),
    requireConsent: true,
  });
  const contact = validatedContact.contact;
  Object.assign(fields, validatedContact.fields);

  if (firstText(payload.companyWebsite, payload.website, payload.url)) {
    throw new ValidationFailure({ form: "Die Anfrage konnte nicht angenommen werden." });
  }

  if (payload.timestamp) {
    const timestamp = Date.parse(text(payload.timestamp));
    if (!Number.isFinite(timestamp) || timestamp > Date.now() + 10 * 60 * 1000) {
      delete payload.timestamp;
    }
  }
  if (payload.formStartedAt !== undefined && text(payload.formStartedAt)) {
    const startedAt = Number(payload.formStartedAt);
    const elapsed = Date.now() - startedAt;
    if (!Number.isFinite(startedAt) || elapsed < 0 || elapsed > 24 * 60 * 60 * 1000) {
      delete payload.formStartedAt;
    }
  }
  if (Object.keys(fields).length) throw new ValidationFailure(fields);
  return contact;
}

function validateProfessionalContact(payload, contact) {
  const existingContact = payload.details?.contact || payload.contact || {};
  const submittedMethods = [
    payload.preferredContactMethod,
    payload.contactMethod,
    existingContact.callbackPreference,
  ].map(text).filter(Boolean);
  const canonicalMethods = submittedMethods.map((contactMethod) => validateRequestContact({
    ...contact,
    contactMethod,
  }, {
    requireContactMethod: false,
    requireConsent: false,
  }).contact.contactMethod);
  if (
    submittedMethods.length > 1
    && (canonicalMethods.some((contactMethod) => !contactMethod) || new Set(canonicalMethods).size > 1)
  ) {
    throw new ValidationFailure({
      contactMethod: "Bitte wählen Sie einen eindeutigen bevorzugten Kontaktweg.",
    });
  }
  const validated = validateRequestContact({
    ...contact,
    contactMethod: firstText(
      payload.preferredContactMethod,
      payload.contactMethod,
      existingContact.callbackPreference,
    ),
    privacyConsent: true,
  });
  if (Object.keys(validated.fields).length) throw new ValidationFailure(validated.fields);
  return validated.contact;
}

function buildDetails(
  payload,
  contact,
  service,
  uploadedFiles,
  request,
  professionalContext = null,
  idempotency = null,
) {
  const normalizedPayload = professionalContext
    ? {
        ...payload,
        serviceId: professionalContext.serviceId,
        serviceLabel: professionalContext.serviceLabel,
        location: professionalContext.locationId,
        locationId: professionalContext.locationId,
        locationLabel: firstText(payload.locationLabel, payload.cityOrZip, professionalContext.locationLabel),
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
      callbackPreference: firstText(contact.contactMethod, existing.contact?.callbackPreference),
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
        location: firstText(
          existing.configuration?.location,
          existing.configuration?.city,
          normalizedPayload.cityOrZip,
          normalizedPayload.locationLabel,
          professionalContext.locationLabel,
        ),
        locationId: professionalContext.locationId,
        locationLabel: firstText(
          existing.configuration?.locationLabel,
          existing.configuration?.location,
          existing.configuration?.city,
          normalizedPayload.cityOrZip,
          normalizedPayload.locationLabel,
          professionalContext.locationLabel,
        ),
        region: professionalContext.locationId,
        regionLabel: professionalContext.locationLabel,
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
      ...(idempotency?.fingerprint ? {
        idempotencyFingerprint: idempotency.fingerprint,
        idempotencyRequestId: idempotency.requestId,
      } : {}),
    },
  };
}

async function uploadFiles(files, configuration, requestId, allowExisting = false) {
  if (!files.length) return [];
  const uploaded = [];
  const storagePrefix = allowExisting
    ? `cloudflare-pages/idempotent/${requestId}`
    : `cloudflare-pages/${new Date().toISOString().slice(0, 10)}/${requestId}`;
  for (let index = 0; index < files.length; index += 1) {
    const { field, file } = files[index];
    const storagePath = `${storagePrefix}/${index}_${safeFileName(file.name)}`;
    const uploadUrl = `${configuration.supabaseUrl}/storage/v1/object/uploads/${encodeObjectPath(storagePath)}`;
    let response;
    try {
      response = await fetch(uploadUrl, {
        method: "POST",
        headers: buildSupabaseServiceHeaders(configuration.serviceRoleKey, {
          "Content-Type": file.type,
          "x-upsert": "false",
        }),
        body: file,
      });
    } catch {
      throw new SubmissionFailure("UPLOAD_REQUEST_FAILED");
    }
    if (!response.ok && !(allowExisting && response.status === 409)) {
      throw new SubmissionFailure("UPLOAD_FAILED");
    }
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

function bookingIdempotencyMetadata(row) {
  let details = row?.details;
  if (typeof details === "string") details = parseJson(details, {});
  return record(record(details).metadata);
}

function replayedBooking(row, identity) {
  const metadata = bookingIdempotencyMetadata(row);
  if (text(metadata.idempotencyFingerprint) !== identity.fingerprint) {
    throw new IdempotencyConflictFailure();
  }
  return {
    bookingId: firstText(row?.id, identity.bookingId),
    requestId: firstText(metadata.idempotencyRequestId, identity.requestId),
    replayed: true,
  };
}

async function readBookingById(bookingId, configuration) {
  let response;
  try {
    const query = `id=eq.${encodeURIComponent(bookingId)}&select=id%2Cdetails&limit=1`;
    response = await fetch(`${configuration.supabaseUrl}/rest/v1/bookings?${query}`, {
      method: "GET",
      headers: buildSupabaseServiceHeaders(configuration.serviceRoleKey, {
        Accept: "application/json",
      }),
    });
  } catch {
    throw new SubmissionFailure("DATABASE_REQUEST_FAILED");
  }
  if (!response.ok) throw new SubmissionFailure("DATABASE_LOOKUP_FAILED");
  let rows;
  try {
    rows = await response.json();
  } catch {
    throw new SubmissionFailure("DATABASE_RESPONSE_INVALID");
  }
  return Array.isArray(rows) && rows[0] ? rows[0] : null;
}

async function insertBooking(booking, configuration, identity = null) {
  let response;
  try {
    response = await fetch(`${configuration.supabaseUrl}/rest/v1/bookings?select=id`, {
      method: "POST",
      headers: buildSupabaseServiceHeaders(configuration.serviceRoleKey, {
        "Content-Type": "application/json",
        Prefer: "return=representation",
      }),
      body: JSON.stringify([booking]),
    });
  } catch {
    throw new SubmissionFailure("DATABASE_REQUEST_FAILED");
  }
  if (response.status === 409 && identity) {
    const existing = await readBookingById(identity.bookingId, configuration);
    if (!existing) throw new IdempotencyConflictFailure();
    return replayedBooking(existing, identity);
  }
  if (!response.ok) throw new SubmissionFailure("DATABASE_INSERT_FAILED");
  let rows;
  try {
    rows = await response.json();
  } catch {
    throw new SubmissionFailure("DATABASE_RESPONSE_INVALID");
  }
  if (!rows?.[0]?.id) throw new SubmissionFailure("DATABASE_ID_MISSING");
  return {
    bookingId: String(rows[0].id),
    requestId: identity?.requestId || "",
    replayed: false,
  };
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
    .slice(0, 8);
}

function contactMethodLabel(value) {
  return {
    email: "E-Mail",
    telefon: "Telefon",
    whatsapp: "WhatsApp",
  }[text(value)] || "";
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
  if (!apiKey) return { status: "not_configured", deliveryCount: 0 };
  const from = text(env?.RESEND_FROM_EMAIL) || "FLOXANT Website <onboarding@resend.dev>";
  if (hasHeaderInjection(from)) return { status: "failed", deliveryCount: 0 };

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
      <p><strong>Bevorzugter Kontakt:</strong> ${escapeHtml(contactMethodLabel(contact.contactMethod) || "-")}</p>
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
    const emailRow = `<tr><td style="padding:6px 0;color:#475569;vertical-align:top">E-Mail</td><td style="padding:6px 0 6px 16px;font-weight:700">${escapeHtml(contact.email)}</td></tr>`;
    const phoneRow = contact.phone
      ? `<tr><td style="padding:6px 0;color:#475569;vertical-align:top">Telefon</td><td style="padding:6px 0 6px 16px;font-weight:700">${escapeHtml(contact.phone)}</td></tr>`
      : "";
    const preferredContactRow = contact.contactMethod
      ? `<tr><td style="padding:6px 0;color:#475569;vertical-align:top">Bevorzugter Kontakt</td><td style="padding:6px 0 6px 16px;font-weight:700">${escapeHtml(contactMethodLabel(contact.contactMethod))}</td></tr>`
      : "";
    const customerHtml = `
      <div style="margin:0;background:#f8fafc;padding:20px 12px;font-family:Arial,sans-serif;color:#0f172a">
        <div style="box-sizing:border-box;width:100%;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;background:#ffffff;padding:24px">
          <p style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:700">Ihre Anfrage bei FLOXANT ist eingegangen</p>
          <p style="margin:0 0 18px;line-height:1.6">Guten Tag ${escapeHtml(contact.name)}, vielen Dank für Ihre Anfrage. Wir haben Ihre Angaben erhalten und prüfen den gewünschten Umfang persönlich.</p>
          <table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 18px"><tbody>${serviceRow}${locationRow}${factRows}${emailRow}${phoneRow}${preferredContactRow}</tbody></table>
          <p style="margin:0 0 12px;line-height:1.6;color:#334155">Für eine verlässliche Einschätzung können Rückfragen oder – je nach Leistung und Umfang – eine Besichtigung erforderlich sein.</p>
          <p style="margin:0;line-height:1.6;color:#334155">Diese Nachricht bestätigt den Eingang Ihrer Anfrage. Ein Auftrag oder Termin ist damit noch nicht automatisch bestätigt.</p>
        </div>
      </div>`;
    deliveries.push(sendResendEmail(apiKey, {
      from,
      to: [contact.email],
      subject: "Ihre Anfrage bei FLOXANT ist eingegangen",
      html: customerHtml,
    }));
  }

  if (!deliveries.length) return { status: failed ? "failed" : "not_configured", deliveryCount: 0 };
  const deliveryStatuses = await Promise.all(deliveries);
  if (deliveryStatuses.includes("failed")) failed = true;
  return { status: failed ? "failed" : "sent", deliveryCount: deliveries.length };
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

async function handleLeadSubmissionUncached(context, idempotencyKey = "") {
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
    let contact = validateSubmission(payload);
    const professionalContext = validateProfessionalRequestContext(payload);
    if (professionalContext) contact = validateProfessionalContact(payload, contact);
    const effectivePayload = canonicalizeProfessionalPayload(payload, professionalContext, contact);
    assertAllowedFileFields(files, context.request);
    await validateFiles(files);
    const identity = idempotencyKey
      ? {
          bookingId: idempotencyBookingId(idempotencyKey),
          fingerprint: await submissionFingerprint(effectivePayload, files),
          requestId,
        }
      : null;
    if (identity) {
      const existing = await readBookingById(identity.bookingId, configuration);
      if (existing) {
        const replay = replayedBooking(existing, identity);
        return json({
          ok: true,
          requestId: replay.requestId,
          bookingId: replay.bookingId,
        }, 201, context.request, env);
      }
    }
    const uploadScope = identity
      ? `${identity.bookingId}/${identity.fingerprint.replace(/^sha256:/, "")}`
      : requestId;
    const uploadedFiles = await uploadFiles(files, configuration, uploadScope, Boolean(identity));
    const service = normalizeService(firstText(
      professionalContext?.leadService,
      effectivePayload.details?.service?.type,
      effectivePayload.service?.type,
      effectivePayload.service,
      effectivePayload.type,
      effectivePayload.lead_type,
    ));
    const details = buildDetails(
      effectivePayload,
      contact,
      service,
      uploadedFiles,
      context.request,
      professionalContext,
      identity,
    );
    const serviceRequest = record(details.configuration?.serviceRequest);
    const serviceLabel = firstText(professionalContext?.serviceLabel, serviceRequest.serviceLabel, service);
    const locationLabel = firstText(
      serviceRequest.location,
      serviceRequest.locationLabel,
      professionalContext?.locationLabel,
    );
    const fileUrls = uploadedFiles.map((item) => item.publicUrl);
    const booking = {
      ...(identity ? { id: identity.bookingId } : {}),
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

    const inserted = await insertBooking(booking, configuration, identity);
    if (inserted.replayed) {
      return json({
        ok: true,
        requestId: inserted.requestId,
        bookingId: inserted.bookingId,
      }, 201, context.request, env);
    }
    const bookingId = inserted.bookingId;
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
    } else if (notification.status === "sent") {
      console.info("Cloudflare lead notification sent", {
        requestId: inserted.requestId || requestId,
        bookingId,
        status: "sent",
        deliveryCount: notification.deliveryCount,
      });
    }
    return json({
      ok: true,
      requestId: inserted.requestId || requestId,
      bookingId,
    }, 201, context.request, env);
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
    if (error instanceof IdempotencyConflictFailure) {
      return json({
        ok: false,
        code: "IDEMPOTENCY_CONFLICT",
        requestId,
      }, 409, context.request, env);
    }
    console.error("Cloudflare lead submission failed", {
      requestId,
      status: 500,
      errorType: error?.internalType || error?.name || "UNKNOWN",
    });
    return json({ ok: false, code: "SUBMISSION_FAILED", requestId }, 500, context.request, env);
  }
}

export async function handleLeadSubmission(context) {
  const env = context.env || {};

  // Never allow a disallowed origin to probe another origin's cached result.
  if (!allowedOrigin(context.request, env)) return handleLeadSubmissionUncached(context);

  const idempotency = readIdempotencyKey(context.request);
  if (idempotency.invalid) {
    return json({
      ok: false,
      code: "INVALID_IDEMPOTENCY_KEY",
      requestId: crypto.randomUUID(),
    }, 400, context.request, env);
  }
  return handleLeadSubmissionUncached(context, idempotency.key || "");
}
