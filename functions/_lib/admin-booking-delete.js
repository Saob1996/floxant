import { buildSupabaseServiceHeaders } from "./supabase-headers.js";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UPLOAD_BUCKET = "uploads";
const UPLOAD_PREFIX = "cloudflare-pages/";

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

function record(value) {
  if (typeof value === "string") {
    try {
      return record(JSON.parse(value));
    } catch {
      return {};
    }
  }
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function list(value) {
  if (typeof value === "string") {
    try {
      return list(JSON.parse(value));
    } catch {
      return value.trim() ? [value.trim()] : [];
    }
  }
  return Array.isArray(value) ? value.flatMap(list) : [];
}

function safeUploadPath(value) {
  const path = text(value).replace(/^\/+/, "");
  if (!path.startsWith(UPLOAD_PREFIX)) return "";
  const segments = path.split("/");
  if (segments.some((segment) => !segment)) return "";
  try {
    if (segments.some((segment) => {
      const decoded = decodeURIComponent(segment);
      return decoded === "." || decoded === ".." || decoded.includes("/") || decoded.includes("\\");
    })) return "";
  } catch {
    return "";
  }
  return path;
}

function uploadPathFromUrl(value, supabaseUrl) {
  try {
    const url = new URL(value);
    const expectedUrl = new URL(supabaseUrl);
    if (url.protocol !== "https:" || url.hostname !== expectedUrl.hostname) return "";
    const prefix = `/storage/v1/object/public/${UPLOAD_BUCKET}/`;
    if (!url.pathname.startsWith(prefix)) return "";
    const path = url.pathname
      .slice(prefix.length)
      .split("/")
      .map((segment) => decodeURIComponent(segment))
      .join("/");
    return safeUploadPath(path);
  } catch {
    return "";
  }
}

export function collectBookingUploadPaths(booking, supabaseUrl) {
  const paths = new Set();
  const details = record(booking?.details);
  const configuration = record(details.configuration);
  const uploadMetadata = Array.isArray(configuration.uploadMetadata)
    ? configuration.uploadMetadata
    : [];

  for (const upload of uploadMetadata) {
    const metadata = record(upload);
    const storagePath = safeUploadPath(metadata.storagePath);
    if (storagePath) paths.add(storagePath);
    const publicPath = uploadPathFromUrl(metadata.publicUrl, supabaseUrl);
    if (publicPath) paths.add(publicPath);
  }

  for (const url of [...list(booking?.file_url), ...list(booking?.file_urls)]) {
    const path = uploadPathFromUrl(url, supabaseUrl);
    if (path) paths.add(path);
  }

  return [...paths];
}

function getConfiguration(env) {
  const supabaseUrl = text(env?.SUPABASE_URL || env?.NEXT_PUBLIC_SUPABASE_URL).replace(/\/$/, "");
  const serviceKey = text(env?.SUPABASE_SERVICE_ROLE_KEY);
  const publishableKey = text(
    env?.SUPABASE_PUBLISHABLE_KEY ||
    env?.SUPABASE_ANON_KEY ||
    env?.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  return {
    supabaseUrl,
    serviceKey,
    publishableKey,
    deleteEnabled: text(env?.ADMIN_DELETE_ENABLED).toLowerCase() === "true",
    isConfigured: Boolean(supabaseUrl && serviceKey && publishableKey),
  };
}

async function responseJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function handleAdminBookingDelete(context, fetchImpl = fetch) {
  const { request, env, params } = context;
  const requestOrigin = new URL(request.url).origin;
  const suppliedOrigin = text(request.headers.get("Origin"));
  if (suppliedOrigin && suppliedOrigin !== requestOrigin) {
    return json(403, { ok: false, code: "ORIGIN_FORBIDDEN" });
  }

  const bookingId = text(params?.id);
  if (!UUID_PATTERN.test(bookingId)) {
    return json(400, { ok: false, code: "INVALID_BOOKING_ID" });
  }

  const authorization = text(request.headers.get("Authorization"));
  if (!authorization.startsWith("Bearer ") || authorization.length < 32) {
    return json(401, { ok: false, code: "AUTH_REQUIRED" });
  }

  const configuration = getConfiguration(env);
  if (!configuration.deleteEnabled) {
    return json(503, { ok: false, code: "ADMIN_DELETE_DISABLED" });
  }
  if (!configuration.isConfigured) {
    return json(503, { ok: false, code: "CONFIGURATION_ERROR" });
  }

  let userResponse;
  try {
    userResponse = await fetchImpl(`${configuration.supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: configuration.publishableKey,
        Authorization: authorization,
        Accept: "application/json",
      },
    });
  } catch {
    return json(502, { ok: false, code: "AUTH_UPSTREAM_ERROR" });
  }

  const user = await responseJson(userResponse);
  if (!userResponse.ok) return json(401, { ok: false, code: "AUTH_INVALID" });
  if (record(user?.app_metadata).role !== "admin") {
    return json(403, { ok: false, code: "ADMIN_REQUIRED" });
  }

  let bookingResponse;
  try {
    const query = `id=eq.${encodeURIComponent(bookingId)}&select=id%2Cdetails%2Cfile_url%2Cfile_urls&limit=1`;
    bookingResponse = await fetchImpl(`${configuration.supabaseUrl}/rest/v1/bookings?${query}`, {
      headers: buildSupabaseServiceHeaders(configuration.serviceKey, { Accept: "application/json" }),
    });
  } catch {
    return json(502, { ok: false, code: "BOOKING_LOOKUP_FAILED" });
  }

  const bookings = await responseJson(bookingResponse);
  if (!bookingResponse.ok) return json(502, { ok: false, code: "BOOKING_LOOKUP_FAILED" });
  const booking = Array.isArray(bookings) ? bookings[0] : null;
  if (!booking || booking.id !== bookingId) return json(404, { ok: false, code: "BOOKING_NOT_FOUND" });

  const uploadPaths = collectBookingUploadPaths(booking, configuration.supabaseUrl);
  // Storage is removed first on purpose: if the RLS-backed row delete fails, the
  // booking remains as a retry anchor. Deleting the row first would discard the
  // only durable path list and could leave customer uploads orphaned permanently.
  // The endpoint itself stays disabled until the live DELETE policy has passed.
  if (uploadPaths.length) {
    let storageResponse;
    try {
      storageResponse = await fetchImpl(
        `${configuration.supabaseUrl}/storage/v1/object/${UPLOAD_BUCKET}`,
        {
          method: "DELETE",
          headers: buildSupabaseServiceHeaders(configuration.serviceKey, {
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ prefixes: uploadPaths }),
        },
      );
    } catch {
      return json(502, { ok: false, code: "ATTACHMENT_DELETE_FAILED" });
    }
    if (!storageResponse.ok) return json(502, { ok: false, code: "ATTACHMENT_DELETE_FAILED" });
  }

  let deleteResponse;
  try {
    const query = `id=eq.${encodeURIComponent(bookingId)}&select=id`;
    deleteResponse = await fetchImpl(`${configuration.supabaseUrl}/rest/v1/bookings?${query}`, {
      method: "DELETE",
      headers: {
        apikey: configuration.publishableKey,
        Authorization: authorization,
        Accept: "application/json",
        Prefer: "return=representation",
      },
    });
  } catch {
    return json(502, { ok: false, code: "BOOKING_DELETE_FAILED" });
  }

  const deletedRows = await responseJson(deleteResponse);
  if (!deleteResponse.ok) return json(403, { ok: false, code: "BOOKING_DELETE_FORBIDDEN" });
  if (!Array.isArray(deletedRows) || deletedRows[0]?.id !== bookingId || deletedRows.length !== 1) {
    return json(409, { ok: false, code: "BOOKING_DELETE_NOT_CONFIRMED" });
  }

  return json(200, {
    ok: true,
    deletedId: bookingId,
    deletedFileCount: uploadPaths.length,
  });
}
