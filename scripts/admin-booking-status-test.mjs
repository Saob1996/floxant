#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  ADMIN_BOOKING_STATUSES,
  handleAdminBookingStatusUpdate,
} from "../functions/_lib/admin-booking-status.js";

const bookingId = "123e4567-e89b-42d3-a456-426614174000";
const supabaseUrl = "https://project.supabase.co";
const authorization = `Bearer ${"a".repeat(64)}`;
const env = {
  SUPABASE_URL: supabaseUrl,
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_browser_test_key",
};

assert.deepEqual(ADMIN_BOOKING_STATUSES, [
  "new",
  "in_progress",
  "contacted",
  "quote_sent",
  "appointment_scheduled",
  "backhaul_matching",
  "backhaul_notified",
  "backhaul_accepted",
  "backhaul_declined",
  "won",
  "lost",
  "completed",
]);

function context({ status = "contacted", origin = "https://www.floxant.de", requestOrigin = origin } = {}) {
  return {
    env,
    params: { id: bookingId },
    request: new Request(`${requestOrigin}/api/admin/bookings/${bookingId}`, {
      method: "PATCH",
      headers: {
        Authorization: authorization,
        Origin: origin,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }),
  };
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

{
  let fetchCalls = 0;
  const response = await handleAdminBookingStatusUpdate({
    env,
    params: { id: bookingId },
    request: new Request(`https://www.floxant.de/api/admin/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "contacted" }),
    }),
  }, async () => {
    fetchCalls += 1;
    return jsonResponse({});
  });
  assert.equal(response.status, 401);
  assert.equal(fetchCalls, 0, "anonymous status updates must stop before Supabase");
}

{
  const calls = [];
  const response = await handleAdminBookingStatusUpdate(context(), async (url, init = {}) => {
    calls.push({ url: String(url), init });
    return jsonResponse({ app_metadata: { role: "member" } });
  });
  assert.equal(response.status, 403);
  assert.equal(calls.length, 1, "non-admin must never reach the bookings update");
}

{
  let fetchCalls = 0;
  const response = await handleAdminBookingStatusUpdate(
    context({ origin: "https://attacker.example", requestOrigin: "https://www.floxant.de" }),
    async () => {
      fetchCalls += 1;
      return jsonResponse({});
    },
  );
  assert.equal(response.status, 403);
  assert.equal(fetchCalls, 0, "cross-origin updates must stop before Supabase");
}

{
  const calls = [];
  const response = await handleAdminBookingStatusUpdate(context({ status: "invalid" }), async (url, init = {}) => {
    calls.push({ url: String(url), init });
    return jsonResponse({ app_metadata: { role: "admin" } });
  });
  assert.equal(response.status, 400);
  assert.equal(calls.length, 1, "invalid status must not reach the bookings table");
}

{
  let storedStatus = "new";
  const calls = [];
  const response = await handleAdminBookingStatusUpdate(context({ status: "quote_sent" }), async (url, init = {}) => {
    const target = String(url);
    const method = String(init.method || "GET").toUpperCase();
    calls.push({ target, method, init });
    if (target.endsWith("/auth/v1/user")) return jsonResponse({ app_metadata: { role: "admin" } });
    if (target.includes("/rest/v1/bookings") && method === "PATCH") {
      storedStatus = JSON.parse(String(init.body)).status;
      return jsonResponse([{ id: bookingId, status: storedStatus }]);
    }
    throw new Error(`Unexpected request: ${method} ${target}`);
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, bookingId, status: "quote_sent" });
  assert.equal(storedStatus, "quote_sent", "status must be durably written before the response");
  assert.deepEqual(calls.map((call) => call.method), ["GET", "PATCH"]);
  assert.equal(calls[1].init.headers.Authorization, authorization, "the admin JWT must exercise bookings RLS");
  assert.equal(calls[1].init.headers.apikey, env.SUPABASE_PUBLISHABLE_KEY);
  assert.equal(calls[1].init.headers.Prefer, "return=representation");
}

{
  const response = await handleAdminBookingStatusUpdate(context(), async (url, init = {}) => {
    if (String(url).endsWith("/auth/v1/user")) return jsonResponse({ app_metadata: { role: "admin" } });
    return jsonResponse([]);
  });
  assert.equal(response.status, 409, "an empty RLS update result must never be reported as success");
}

const routeSource = readFileSync("functions/api/admin/bookings/[id].js", "utf8");
const dashboardSource = readFileSync("components/admin-dashboard/AdminDashboard.tsx", "utf8");
assert.match(routeSource, /onRequestPatch/);
assert.match(routeSource, /PATCH, DELETE, OPTIONS/);
assert.match(dashboardSource, /method: "PATCH"/);
assert.doesNotMatch(dashboardSource, /\.update\(\{ status \}\)/, "dashboard must not update status directly from the browser");

console.log(JSON.stringify({
  passed: true,
  statuses: ADMIN_BOOKING_STATUSES,
  authorization: ["anonymous rejected", "non-admin rejected", "admin RLS update confirmed"],
  persistence: "PATCH waits for the represented database row before updating UI state",
}, null, 2));
