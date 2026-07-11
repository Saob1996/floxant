const MAX_FILE_BYTES = 12 * 1024 * 1024;
const MAX_REQUEST_BYTES = 50 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);

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

function allowedOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;

  try {
    const hostname = new URL(origin).hostname.toLowerCase();
    return hostname === "floxant.de"
      || hostname === "www.floxant.de"
      || hostname === "localhost"
      || hostname === "127.0.0.1"
      || hostname.endsWith(".pages.dev");
  } catch {
    return false;
  }
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
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    throw Object.assign(new Error("Die Anfrage ist zu gross."), { status: 413 });
  }

  if (contentType.includes("application/json")) {
    return { payload: await request.json(), files: [] };
  }

  if (!contentType.includes("multipart/form-data") && !contentType.includes("application/x-www-form-urlencoded")) {
    throw Object.assign(new Error("Nicht unterstuetztes Anfrageformat."), { status: 415 });
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
      throw Object.assign(new Error(`${file.name}: maximal 12 MiB pro Datei.`), { status: 413 });
    }
    if (!ALLOWED_FILE_TYPES.has(file.type)) {
      throw Object.assign(new Error(`${file.name}: nur PDF, JPG, PNG oder WebP sind erlaubt.`), { status: 415 });
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
      throw Object.assign(new Error(`Upload von ${file.name} ist fehlgeschlagen.`), { status: 502 });
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
    throw Object.assign(new Error("Die Anfrage konnte nicht gespeichert werden."), { status: 502 });
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

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      subject: `[FLOXANT Lead] ${service} – ${contact.name}`,
      html,
    }),
  });

  return { status: response.ok ? "sent" : "failed" };
}

export async function handleLeadSubmission(context) {
  const requestId = crypto.randomUUID();
  try {
    if (!allowedOrigin(context.request)) {
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

    const { payload, files } = await parsePayload(context.request);
    const honeypot = firstText(payload.companyWebsite, payload.website, payload.url);
    if (honeypot) {
      return json({ success: false, error: "Spam-Schutz", requestId }, 400);
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

    const uploadedFiles = await uploadFiles(files, context.env, requestId);
    const service = normalizeService(firstText(payload.details?.service?.type, payload.service, payload.type, payload.lead_type));
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
    const notification = await sendNotification({ bookingId, contact, service, details, uploadedFiles }, context.env);

    return json({
      success: true,
      id: bookingId,
      mailStatus: notification.status,
      warning: notification.status === "failed"
        ? "Die Anfrage wurde gespeichert, aber die interne E-Mail-Benachrichtigung ist fehlgeschlagen."
        : notification.status === "not_configured"
          ? "Die Anfrage wurde gespeichert; die E-Mail-Benachrichtigung ist nicht konfiguriert."
          : undefined,
    });
  } catch (error) {
    console.error("Cloudflare lead submission failed", { requestId, message: error?.message || String(error) });
    return json({
      success: false,
      error: error?.message || "Die Anfrage konnte gerade nicht verarbeitet werden. Bitte nutzen Sie WhatsApp oder Telefon.",
      requestId,
    }, Number(error?.status) || 500);
  }
}
