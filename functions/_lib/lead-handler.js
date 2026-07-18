const MAX_FILE_BYTES = 12 * 1024 * 1024;
const MAX_REQUEST_BYTES = 50 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;
const recentSubmissionHashes = new Map();
const TEXT_LIMITS = {
  name: 160,
  fullName: 160,
  contactName: 160,
  email: 254,
  phone: 60,
  city: 120,
  cityOrZip: 120,
  postcode: 24,
  service: 120,
  type: 120,
  lead_type: 120,
  source: 500,
  sourcePage: 500,
  landingPage: 500,
  message: 8000,
  note: 8000,
  notes: 8000,
  details: 12000,
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function text(value) {
  return String(value ?? "").trim();
}

function firstText(...values) {
  return values.map(text).find(Boolean) || "";
}

function isValidEmail(value) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function allowedOrigin(request, env) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;

  try {
    const normalized = new URL(origin).origin.toLowerCase();
    const configured = text(env.ALLOWED_FORM_ORIGINS)
      .split(",")
      .map((value) => value.trim().replace(/\/$/, "").toLowerCase())
      .filter(Boolean);
    const allowed = new Set([
      "https://floxant.de",
      "https://www.floxant.de",
      "https://floxant.pages.dev",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      ...configured,
    ]);
    return allowed.has(normalized);
  } catch {
    return false;
  }
}

function httpError(status, clientMessage, code) {
  return Object.assign(new Error(code), { status, clientMessage, code });
}

function assertTextLimits(value, key = "value", depth = 0) {
  if (depth > 8) throw httpError(400, "Die Anfrage enthält eine zu tiefe Datenstruktur.", "PAYLOAD_DEPTH");
  if (typeof value === "string") {
    const limit = TEXT_LIMITS[key] || 4000;
    if (value.length > limit) throw httpError(413, "Eine Eingabe überschreitet die zulässige Länge.", "TEXT_LIMIT");
    return;
  }
  if (Array.isArray(value)) {
    if (value.length > 100) throw httpError(413, "Die Anfrage enthält zu viele Einträge.", "ARRAY_LIMIT");
    value.forEach((item) => assertTextLimits(item, key, depth + 1));
    return;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length > 150) throw httpError(413, "Die Anfrage enthält zu viele Felder.", "FIELD_LIMIT");
    entries.forEach(([childKey, item]) => assertTextLimits(item, childKey, depth + 1));
  }
}

async function requestWithEnforcedSize(request) {
  const declaredSize = Number(request.headers.get("Content-Length") || 0);
  if (declaredSize > MAX_REQUEST_BYTES) throw httpError(413, "Die Anfrage ist zu groß.", "REQUEST_TOO_LARGE");
  const body = await request.arrayBuffer();
  if (body.byteLength > MAX_REQUEST_BYTES) throw httpError(413, "Die Anfrage ist zu groß.", "REQUEST_TOO_LARGE");
  return new Request(request, { body });
}

function bytesStartWith(bytes, signature) {
  return signature.every((value, index) => bytes[index] === value);
}

async function hasValidFileSignature(file) {
  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (file.type === "application/pdf") return bytesStartWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d]);
  if (file.type === "image/jpeg") return bytesStartWith(bytes, [0xff, 0xd8, 0xff]);
  if (file.type === "image/png") return bytesStartWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (file.type === "image/webp") return bytesStartWith(bytes, [0x52, 0x49, 0x46, 0x46]) && bytesStartWith(bytes.slice(8), [0x57, 0x45, 0x42, 0x50]);
  return false;
}

async function submissionHash(payload, contact, service) {
  const stable = JSON.stringify({
    contact: { email: contact.email.toLowerCase(), phone: contact.phone.replace(/\D/g, "") },
    service,
    source: firstText(payload.source, payload.sourcePage, payload.landingPage),
    details: firstText(typeof payload.details === "string" ? payload.details : "", payload.message, payload.note).slice(0, 2000),
  });
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(stable));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function isRecentDuplicate(payload, contact, service) {
  const now = Date.now();
  for (const [hash, timestamp] of recentSubmissionHashes) {
    if (now - timestamp > DUPLICATE_WINDOW_MS) recentSubmissionHashes.delete(hash);
  }
  const hash = await submissionHash(payload, contact, service);
  if (recentSubmissionHashes.has(hash)) return true;
  recentSubmissionHashes.set(hash, now);
  return false;
}

function parseJson(value, fallback = null) {
  if (typeof value !== "string" || !value.trim()) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function encodeObjectPath(value) {
  return value.split("/").map(encodeURIComponent).join("/");
}

function safeFileName(value) {
  return text(value).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "upload";
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
  const raw = text(value).toLowerCase().replace(/[\s-]+/g, "_");
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

async function parsePayload(request) {
  const contentType = request.headers.get("Content-Type") || "";

  if (contentType.includes("application/json")) {
    const payload = await request.json();
    assertTextLimits(payload);
    return { payload, files: [] };
  }

  if (!contentType.includes("multipart/form-data") && !contentType.includes("application/x-www-form-urlencoded")) {
    throw httpError(415, "Nicht unterstütztes Anfrageformat.", "UNSUPPORTED_CONTENT_TYPE");
  }

  const formData = await request.formData();
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

  assertTextLimits(payload);

  return { payload, files };
}

function buildDetails(payload, contact, service, uploadedFiles) {
  const existing = payload.details && typeof payload.details === "object" ? payload.details : {};
  const now = new Date().toISOString();
  const rawFields = Object.fromEntries(
    Object.entries(payload).filter(([key]) => key !== "details" && key !== "companyWebsite"),
  );

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
      rawFields,
      uploadMetadata: uploadedFiles,
    },
    metadata: {
      ...(existing.metadata || {}),
      createdAt: firstText(existing.metadata?.createdAt, payload.timestamp, now),
      intakeVersion: firstText(existing.metadata?.intakeVersion, "cloudflare-pages-v1"),
      locale: firstText(existing.metadata?.locale, payload.locale, payload.language, "unknown").toLowerCase(),
    },
  };
}

async function uploadFiles(files, env, requestId) {
  if (!files.length) return [];

  const supabaseUrl = text(env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL).replace(/\/$/, "");
  const serviceRoleKey = text(env.SUPABASE_SERVICE_ROLE_KEY);
  const uploaded = [];

  for (let index = 0; index < files.length; index += 1) {
    const { field, file } = files[index];
    if (file.size > MAX_FILE_BYTES) {
      throw httpError(413, "Eine Datei überschreitet 12 MiB.", "FILE_TOO_LARGE");
    }
    if (!ALLOWED_FILE_TYPES.has(file.type)) {
      throw httpError(415, "Nur PDF-, JPG-, PNG- oder WebP-Dateien sind erlaubt.", "FILE_TYPE");
    }
    if (!(await hasValidFileSignature(file))) {
      throw httpError(415, "Der Dateiinhalt stimmt nicht mit dem angegebenen Dateityp überein.", "FILE_SIGNATURE");
    }

    const storagePath = `cloudflare-pages/${new Date().toISOString().slice(0, 10)}/${requestId}/${index}_${safeFileName(file.name)}`;
    const uploadUrl = `${supabaseUrl}/storage/v1/object/uploads/${encodeObjectPath(storagePath)}`;
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": file.type,
        "x-upsert": "false",
      },
      body: file,
    });

    if (!response.ok) {
      throw httpError(502, "Eine Datei konnte nicht verarbeitet werden.", "UPLOAD_FAILED");
    }

    uploaded.push({
      field,
      originalName: safeFileName(file.name),
      storagePath,
      publicUrl: `${supabaseUrl}/storage/v1/object/public/uploads/${encodeObjectPath(storagePath)}`,
      contentType: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    });
  }

  return uploaded;
}

async function insertBooking(booking, env) {
  const supabaseUrl = text(env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL).replace(/\/$/, "");
  const serviceRoleKey = text(env.SUPABASE_SERVICE_ROLE_KEY);
  const response = await fetch(`${supabaseUrl}/rest/v1/bookings?select=id`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify([booking]),
  });

  if (!response.ok) {
    throw httpError(502, "Die Anfrage konnte gerade nicht verarbeitet werden.", "BOOKING_INSERT_FAILED");
  }

  const rows = await response.json();
  return rows?.[0]?.id ? String(rows[0].id) : "unknown";
}

async function sendNotification({ bookingId, contact, service, details, uploadedFiles }, env) {
  const apiKey = text(env.RESEND_API_KEY);
  const recipient = text(env.INTAKE_NOTIFICATION_EMAIL);
  if (!apiKey || !recipient) return { status: "not_configured" };

  const from = text(env.RESEND_FROM_EMAIL) || "FLOXANT Website <onboarding@resend.dev>";
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
  const plainText = [
    "Neue FLOXANT-Anfrage",
    `Vorgang: ${bookingId}`,
    `Service: ${service}`,
    `Name: ${contact.name || "-"}`,
    `E-Mail: ${contact.email || "-"}`,
    `Telefon: ${contact.phone || "-"}`,
    uploadedFiles.length ? `Uploads: ${uploadedFiles.map((item) => item.publicUrl).join("\n")}` : "Uploads: keine",
    "Strukturierte Angaben:",
    JSON.stringify(details, null, 2),
  ].join("\n\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `floxant-booking-${bookingId}`,
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: contact.email || undefined,
      subject: `[FLOXANT Anfrage] ${service}`,
      html,
      text: plainText,
    }),
  });

  return { status: response.ok ? "sent" : "failed" };
}

export async function handleLeadSubmission(context) {
  const requestId = crypto.randomUUID();
  try {
    if (!allowedOrigin(context.request, context.env)) {
      return json({ success: false, error: "Ungueltige Anfragequelle.", requestId }, 403);
    }

    const supabaseUrl = text(context.env.SUPABASE_URL || context.env.NEXT_PUBLIC_SUPABASE_URL);
    const serviceRoleKey = text(context.env.SUPABASE_SERVICE_ROLE_KEY);
    if (!supabaseUrl || !serviceRoleKey) {
      return json({
        success: false,
        error: "Das Anfrageformular ist noch nicht vollstaendig konfiguriert. Bitte nutzen Sie WhatsApp oder Telefon.",
        requestId,
      }, 503);
    }

    const sizedRequest = await requestWithEnforcedSize(context.request);
    const { payload, files } = await parsePayload(sizedRequest);
    const honeypot = firstText(payload.companyWebsite, payload.website, payload.url);
    if (honeypot) {
      return json({ success: true, requestId }, 202);
    }

    const existingContact = payload.details?.contact || payload.contact || {};
    const contact = {
      name: firstText(payload.name, payload.fullName, payload.contactName, existingContact.fullName),
      email: firstText(payload.email, existingContact.email),
      phone: firstText(payload.phone, existingContact.phone),
    };

    if (contact.name && contact.name.length < 2) {
      return json({ success: false, error: "Name ist zu kurz.", requestId }, 400);
    }
    if (!isValidEmail(contact.email)) {
      return json({ success: false, error: "E-Mail-Adresse ist ungueltig.", requestId }, 400);
    }
    if (contact.phone && contact.phone.replace(/\D/g, "").length < 6) {
      return json({ success: false, error: "Telefonnummer ist zu kurz.", requestId }, 400);
    }
    if (!contact.email && !contact.phone) {
      return json({
        success: false,
        error: "Bitte Telefonnummer oder E-Mail angeben. Alternativ koennen Sie WhatsApp nutzen.",
        requestId,
      }, 400);
    }

    const startedAt = Number(payload.formStartedAt);
    if (Number.isFinite(startedAt) && Date.now() - startedAt > 0 && Date.now() - startedAt < 2000) {
      return json({ success: false, error: "Bitte pruefen Sie Ihre Angaben kurz und senden Sie erneut.", requestId }, 400);
    }

    const service = normalizeService(firstText(payload.details?.service?.type, payload.service, payload.type, payload.lead_type));
    if (await isRecentDuplicate(payload, contact, service)) {
      return json({ success: false, error: "Eine identische Anfrage wurde gerade bereits verarbeitet.", requestId }, 409);
    }

    const uploadedFiles = await uploadFiles(files, context.env, requestId);
    const details = buildDetails(payload, contact, service, uploadedFiles);
    const booking = {
      name: contact.name || "Interessent",
      email: contact.email,
      phone: contact.phone,
      service,
      timestamp: firstText(payload.timestamp, details.metadata?.createdAt, new Date().toISOString()),
      status: "new",
      upgrades: payload.upgrades || [],
      details,
      file_urls: uploadedFiles.map((item) => item.publicUrl),
    };

    const bookingId = await insertBooking(booking, context.env);
    await sendNotification({ bookingId, contact, service, details, uploadedFiles }, context.env);

    return json({
      success: true,
      id: bookingId,
    });
  } catch (error) {
    const status = Number(error?.status) || 500;
    console.error("Cloudflare lead submission failed", {
      requestId,
      status,
      errorType: error?.code || "UNEXPECTED_ERROR",
    });
    return json({
      success: false,
      error: error?.clientMessage || "Die Anfrage konnte gerade nicht verarbeitet werden. Bitte nutzen Sie WhatsApp oder Telefon.",
      requestId,
    }, status);
  }
}
