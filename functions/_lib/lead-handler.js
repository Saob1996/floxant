import {
  PayloadValidationError,
  assertAllowedFileFields,
  normalizeLeadPayload,
} from "./lead-payload.js";
import { normalizeCleaningRequest } from "./cleaning-request.js";

const MAX_FILE_BYTES = 12 * 1024 * 1024;
const MAX_REQUEST_BYTES = 50 * 1024 * 1024;
const MAX_FILES = 12;
const ALLOWED_FILE_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
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
  for (const { file } of files) {
    if (file.size > MAX_FILE_BYTES) {
      throw new ValidationFailure({ files: "Maximal 12 MiB pro Datei sind erlaubt." });
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

function buildDetails(payload, contact, service, uploadedFiles, request) {
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
  const rawFields = Object.fromEntries(Object.entries(payload).filter(([key]) => !excludedRawFields.has(key)));
  const normalizedCleaningRequest = normalizeCleaningRequest(payload, service, locale);
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
      type: normalizeService(firstText(existing.service?.type, service)),
      source: firstText(existing.service?.source, payload.leadSource, payload.source, payload.type, "cloudflare_pages_form"),
      entryPoint: firstText(existing.service?.entryPoint, payload.landingPage, payload.sourcePage, "/kontakt"),
    },
    configuration: {
      ...(existing.configuration || {}),
      cloudflarePagesSubmission: true,
      privacyConsent: true,
      rawFields,
      uploadMetadata: uploadedFiles,
      ...(legacyDetailsText ? { legacyDetailsText } : {}),
      ...(normalizedCleaningRequest ? { cleaningRequest: normalizedCleaningRequest } : {}),
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

async function sendNotification({ bookingId, contact, service, details, uploadedFiles }, env) {
  const apiKey = text(env?.RESEND_API_KEY);
  const recipient = text(env?.INTAKE_NOTIFICATION_EMAIL);
  if (!apiKey || !recipient) return { status: "not_configured" };
  const from = text(env?.RESEND_FROM_EMAIL) || "FLOXANT Website <onboarding@resend.dev>";
  if (hasHeaderInjection(from) || hasHeaderInjection(recipient) || !isValidEmail(recipient.replace(/^.*<([^>]+)>.*$/, "$1"))) {
    return { status: "failed" };
  }

  const uploadLinks = uploadedFiles.length
    ? `<ul>${uploadedFiles.map((item) => `<li><a href="${escapeHtml(item.publicUrl)}">${escapeHtml(item.originalName)}</a></li>`).join("")}</ul>`
    : "<p>Keine Uploads.</p>";
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#0f172a">
      <h1>Neue FLOXANT-Anfrage</h1>
      <p><strong>Vorgang:</strong> ${escapeHtml(bookingId)}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(contact.email || "-")}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(contact.phone || "-")}</p>
      ${uploadLinks}
      <h2>Strukturierte Angaben</h2>
      <pre style="white-space:pre-wrap;background:#f8fafc;padding:16px;border-radius:8px">${escapeHtml(JSON.stringify(details, null, 2))}</pre>
    </div>`;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: contact.email || undefined,
        subject: `[FLOXANT Lead] ${service} – ${contact.name}`,
        html,
      }),
    });
    return { status: response.ok ? "sent" : "failed" };
  } catch {
    return { status: "failed" };
  }
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
    assertAllowedFileFields(files, context.request);
    await validateFiles(files);
    const uploadedFiles = await uploadFiles(files, configuration, requestId);
    const service = normalizeService(firstText(payload.details?.service?.type, payload.service?.type, payload.service, payload.type, payload.lead_type));
    const details = buildDetails(payload, contact, service, uploadedFiles, context.request);
    const fileUrls = uploadedFiles.map((item) => item.publicUrl);
    const booking = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      service,
      timestamp: firstText(payload.timestamp, details.metadata?.createdAt, new Date().toISOString()),
      status: "new",
      upgrades: payload.upgrades || [],
      details,
      file_url: fileUrls[0] || null,
      file_urls: fileUrls,
    };

    const bookingId = await insertBooking(booking, configuration);
    const notification = await sendNotification({ bookingId, contact, service, details, uploadedFiles }, env);
    if (notification.status === "failed") {
      console.error("Cloudflare lead notification failed", { requestId, status: "NOTIFICATION_FAILED" });
    }
    return json({ ok: true, requestId, bookingId }, 201, context.request, env);
  } catch (error) {
    if (error instanceof ValidationFailure || error instanceof PayloadValidationError) {
      return json({ ok: false, code: "VALIDATION_ERROR", requestId, fields: error.fields }, 400, context.request, env);
    }
    console.error("Cloudflare lead submission failed", {
      requestId,
      status: 500,
      errorType: error?.internalType || error?.name || "UNKNOWN",
    });
    return json({ ok: false, code: "SUBMISSION_FAILED", requestId }, 500, context.request, env);
  }
}
