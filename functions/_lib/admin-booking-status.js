const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const ADMIN_BOOKING_STATUSES = Object.freeze([
  "new",
  "in_progress",
  "contacted",
  "quote_sent",
  "appointment_scheduled",
  "details_missing",
  "under_review",
  "budget_feasible",
  "reduced_scope_proposed",
  "counter_offer_sent",
  "not_feasible",
  "customer_confirmed",
  "declined",
  "expired",
  "order_created",
  "not_applied",
  "cost_estimate_created",
  "submitted_to_payer",
  "payer_question",
  "partially_approved",
  "fully_approved",
  "rejected",
  "billing_open",
  "paid",
  "backhaul_matching",
  "backhaul_notified",
  "backhaul_accepted",
  "backhaul_declined",
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

  let currentResponse;
  try {
    const currentQuery = `id=eq.${encodeURIComponent(bookingId)}&select=id%2Cstatus%2Cdetails`;
    currentResponse = await fetchImpl(`${configuration.supabaseUrl}/rest/v1/bookings?${currentQuery}`, {
      headers: {
        apikey: configuration.publishableKey,
        Authorization: authorization,
        Accept: "application/json",
      },
    });
  } catch {
    return json(502, { ok: false, code: "BOOKING_STATUS_READ_FAILED" });
  }
  const currentRows = await responseJson(currentResponse);
  if (!currentResponse.ok || !Array.isArray(currentRows) || currentRows.length !== 1) {
    return json(403, { ok: false, code: "BOOKING_STATUS_READ_FORBIDDEN" });
  }
  const currentDetails = record(currentRows[0]?.details);
  const currentConfiguration = record(currentDetails.configuration);
  const currentWorkflow = record(currentConfiguration.round3Workflow);
  const statusHistory = Array.isArray(currentWorkflow.statusHistory)
    ? currentWorkflow.statusHistory.filter((entry) => entry && typeof entry === "object").slice(-99)
    : [];
  const details = {
    ...currentDetails,
    configuration: {
      ...currentConfiguration,
      round3Workflow: {
        ...currentWorkflow,
        statusHistory: [
          ...statusHistory,
          {
            status,
            previousStatus: text(currentRows[0]?.status) || "new",
            at: new Date().toISOString(),
            source: "admin_dashboard",
          },
        ],
      },
    },
  };

  let updateResponse;
  try {
    const query = `id=eq.${encodeURIComponent(bookingId)}&select=id%2Cstatus%2Cdetails`;
    updateResponse = await fetchImpl(`${configuration.supabaseUrl}/rest/v1/bookings?${query}`, {
      method: "PATCH",
      headers: {
        apikey: configuration.publishableKey,
        Authorization: authorization,
        Accept: "application/json",
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ status, details }),
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

  return json(200, { ok: true, bookingId, status: updatedRows[0].status, details: updatedRows[0].details });
}
