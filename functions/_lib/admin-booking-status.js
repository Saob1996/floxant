const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const ADMIN_BOOKING_STATUSES = Object.freeze([
  "new",
  "in_progress",
  "contacted",
  "quote_prepared",
  "quote_sent",
  "follow_up",
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
const ORDER_STATUS_SET = new Set(["not_scheduled", "scheduled", "completed", "billing_open", "paid", "cancelled"]);
const LOST_REASON_SET = new Set(["price", "no_contact", "date_unavailable", "competitor", "service_or_distance", "customer_cancelled", "duplicate", "other"]);

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
  const payloadRecord = record(payload);
  const status = text(payloadRecord.status);
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
  const workflowInput = record(payloadRecord.workflow);
  const nextAction = text(workflowInput.nextAction).slice(0, 240);
  const rawNextActionAt = text(workflowInput.nextActionAt);
  const nextActionAt = rawNextActionAt && Number.isFinite(Date.parse(rawNextActionAt))
    ? new Date(rawNextActionAt).toISOString()
    : "";
  const orderStatus = text(workflowInput.orderStatus);
  const lostReason = text(workflowInput.lostReason);
  const hasQuoteValueGross = Object.prototype.hasOwnProperty.call(workflowInput, "quoteValueGross") && text(workflowInput.quoteValueGross) !== "";
  const quoteValueGross = Number(workflowInput.quoteValueGross);
  const assignedTo = text(workflowInput.assignedTo).slice(0, 120);
  const internalNote = text(workflowInput.internalNote).slice(0, 2000);
  const lostReasonNote = text(workflowInput.lostReasonNote).slice(0, 400);
  const contactAttemptAt = text(workflowInput.contactAttemptAt);
  const effectiveNextActionAt = nextActionAt || text(currentWorkflow.nextActionAt);
  const effectiveLostReason = lostReason || text(currentWorkflow.lostReason);
  if (status === "quote_sent" && !effectiveNextActionAt) {
    return json(400, { ok: false, code: "FOLLOW_UP_REQUIRED" });
  }
  if (status === "lost" && !LOST_REASON_SET.has(effectiveLostReason)) {
    return json(400, { ok: false, code: "LOST_REASON_REQUIRED" });
  }
  if (orderStatus && !ORDER_STATUS_SET.has(orderStatus)) {
    return json(400, { ok: false, code: "INVALID_ORDER_STATUS" });
  }
  if (lostReason && !LOST_REASON_SET.has(lostReason)) {
    return json(400, { ok: false, code: "INVALID_LOST_REASON" });
  }
  if (hasQuoteValueGross && (!Number.isFinite(quoteValueGross) || quoteValueGross < 0 || quoteValueGross > 10000000)) {
    return json(400, { ok: false, code: "INVALID_QUOTE_VALUE" });
  }
  const statusHistory = Array.isArray(currentWorkflow.statusHistory)
    ? currentWorkflow.statusHistory.filter((entry) => entry && typeof entry === "object").slice(-99)
    : [];
  const activityHistory = Array.isArray(currentWorkflow.activityHistory)
    ? currentWorkflow.activityHistory.filter((entry) => entry && typeof entry === "object").slice(-99)
    : [];
  const now = new Date().toISOString();
  const previousStatus = text(currentRows[0]?.status) || "new";
  const nextWorkflow = {
    ...currentWorkflow,
    ...(nextAction ? { nextAction } : {}),
    ...(nextActionAt ? { nextActionAt } : {}),
    ...(assignedTo ? { assignedTo } : {}),
    ...(orderStatus ? { orderStatus } : {}),
    ...(lostReason ? { lostReason } : {}),
    ...(lostReasonNote ? { lostReasonNote } : {}),
    ...(internalNote ? { internalNote } : {}),
    ...(hasQuoteValueGross ? { quoteValueGross } : {}),
    ...(contactAttemptAt && Number.isFinite(Date.parse(contactAttemptAt)) ? { lastContactAt: new Date(contactAttemptAt).toISOString() } : {}),
    statusHistory: status === previousStatus
      ? statusHistory
      : [...statusHistory, { status, previousStatus, at: now, source: "admin_dashboard" }],
    activityHistory: workflowInput && Object.keys(workflowInput).length
      ? [...activityHistory, { at: now, type: contactAttemptAt ? "contact_attempt" : "workflow_update", source: "admin_dashboard" }]
      : activityHistory,
  };
  const details = {
    ...currentDetails,
    configuration: {
      ...currentConfiguration,
      round3Workflow: nextWorkflow,
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
