const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const ADMIN_BOOKING_STATUSES = Object.freeze([
  "new",
  "in_progress",
  "contacted",
  "quote_sent",
  "appointment_scheduled",
  "won",
  "lost",
  "completed",
]);

const STATUS_SET = new Set(ADMIN_BOOKING_STATUSES);

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
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

async function responseJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function configurationFrom(env) {
  const supabaseUrl = text(env?.SUPABASE_URL || env?.NEXT_PUBLIC_SUPABASE_URL).replace(/\/$/, "");
  const publishableKey = text(
    env?.SUPABASE_PUBLISHABLE_KEY
      || env?.SUPABASE_ANON_KEY
      || env?.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  return { supabaseUrl, publishableKey, isConfigured: Boolean(supabaseUrl && publishableKey) };
}

export async function handleAdminBookingStatusUpdate(context, fetchImpl = fetch) {
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

  const configuration = configurationFrom(env);
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

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { ok: false, code: "INVALID_JSON" });
  }
  const status = text(record(payload).status);
  if (!STATUS_SET.has(status)) {
    return json(400, { ok: false, code: "INVALID_STATUS" });
  }

  let updateResponse;
  try {
    const query = `id=eq.${encodeURIComponent(bookingId)}&select=id%2Cstatus`;
    updateResponse = await fetchImpl(`${configuration.supabaseUrl}/rest/v1/bookings?${query}`, {
      method: "PATCH",
      headers: {
        apikey: configuration.publishableKey,
        Authorization: authorization,
        Accept: "application/json",
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ status }),
    });
  } catch {
    return json(502, { ok: false, code: "BOOKING_STATUS_UPDATE_FAILED" });
  }

  const updatedRows = await responseJson(updateResponse);
  if (!updateResponse.ok) {
    return json(403, { ok: false, code: "BOOKING_STATUS_FORBIDDEN" });
  }
  if (!Array.isArray(updatedRows) || updatedRows.length !== 1 || updatedRows[0]?.id !== bookingId) {
    return json(409, { ok: false, code: "BOOKING_STATUS_NOT_CONFIRMED" });
  }

  return json(200, { ok: true, bookingId, status: updatedRows[0].status });
}
