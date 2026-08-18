#!/usr/bin/env node

import assert from "node:assert/strict";
import {
  collectBookingUploadPaths,
  handleAdminBookingDelete,
} from "../functions/_lib/admin-booking-delete.js";
import { buildSupabaseServiceHeaders } from "../functions/_lib/supabase-headers.js";

const bookingId = "123e4567-e89b-42d3-a456-426614174000";
const supabaseUrl = "https://project.supabase.co";
const authorization = `Bearer ${"a".repeat(64)}`;
const env = {
  ADMIN_DELETE_ENABLED: "true",
  SUPABASE_URL: supabaseUrl,
  SUPABASE_SERVICE_ROLE_KEY: "sb_secret_server_only_test_key",
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_browser_test_key",
};

function context({ role = "admin", origin = "https://www.floxant.de", requestOrigin = origin } = {}) {
  return {
    env,
    params: { id: bookingId },
    request: new Request(`${requestOrigin}/api/admin/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        Authorization: authorization,
        Origin: origin,
        "X-Test-Role": role,
      },
    }),
  };
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

assert.deepEqual(buildSupabaseServiceHeaders("sb_secret_new_format", { Accept: "application/json" }), {
  apikey: "sb_secret_new_format",
  Accept: "application/json",
});
assert.deepEqual(buildSupabaseServiceHeaders("legacy-jwt", { Accept: "application/json" }), {
  apikey: "legacy-jwt",
  Accept: "application/json",
  Authorization: "Bearer legacy-jwt",
});

const uploadPaths = collectBookingUploadPaths({
  details: {
    configuration: {
      uploadMetadata: [
        {
          storagePath: "cloudflare-pages/2026-08-19/request/photo.jpg",
          publicUrl: `${supabaseUrl}/storage/v1/object/public/uploads/cloudflare-pages/2026-08-19/request/photo.jpg`,
        },
        { storagePath: "cloudflare-pages/%2e%2e/private.txt" },
        { storagePath: "another-prefix/keep.txt" },
      ],
    },
  },
  file_url: `${supabaseUrl}/storage/v1/object/public/uploads/cloudflare-pages/2026-08-19/request/document.pdf`,
  file_urls: [
    "https://attacker.example/storage/v1/object/public/uploads/cloudflare-pages/keep.txt",
    `${supabaseUrl}/storage/v1/object/public/other-bucket/cloudflare-pages/keep.txt`,
  ],
}, supabaseUrl);
assert.deepEqual(uploadPaths, [
  "cloudflare-pages/2026-08-19/request/photo.jpg",
  "cloudflare-pages/2026-08-19/request/document.pdf",
]);

{
  let fetchCalls = 0;
  const request = new Request(`https://www.floxant.de/api/admin/bookings/${bookingId}`, {
    method: "DELETE",
  });
  const response = await handleAdminBookingDelete(
    { env, params: { id: bookingId }, request },
    async () => {
      fetchCalls += 1;
      return jsonResponse({});
    },
  );
  assert.equal(response.status, 401, "anonymous deletion must stop before an upstream call");
  assert.equal(fetchCalls, 0);
}

{
  let fetchCalls = 0;
  const response = await handleAdminBookingDelete(
    { ...context(), env: { ...env, ADMIN_DELETE_ENABLED: "false" } },
    async () => {
      fetchCalls += 1;
      return jsonResponse({});
    },
  );
  assert.equal(response.status, 503, "server-side delete gate must fail closed");
  assert.equal((await response.json()).code, "ADMIN_DELETE_DISABLED");
  assert.equal(fetchCalls, 0, "disabled deletion must not call an upstream API");
}

{
  const calls = [];
  const response = await handleAdminBookingDelete(context({ role: "member" }), async (url, init = {}) => {
    calls.push({ url: String(url), init });
    return jsonResponse({ app_metadata: { role: "member" } });
  });
  assert.equal(response.status, 403, "authenticated non-admin deletion must be rejected");
  assert.equal(calls.length, 1, "non-admin must never reach booking or storage APIs");
  assert.match(calls[0].url, /\/auth\/v1\/user$/);
}

{
  let fetchCalls = 0;
  const response = await handleAdminBookingDelete(
    context({ origin: "https://attacker.example", requestOrigin: "https://www.floxant.de" }),
    async () => {
      fetchCalls += 1;
      return jsonResponse({});
    },
  );
  assert.equal(response.status, 403, "cross-origin deletion must be rejected");
  assert.equal(fetchCalls, 0);
}

function successfulAdminFetch({ storageStatus = 200, deletedRows = [{ id: bookingId }] } = {}) {
  const calls = [];
  const mockFetch = async (url, init = {}) => {
    const target = String(url);
    const method = String(init.method || "GET").toUpperCase();
    calls.push({ target, method, init });
    if (target.endsWith("/auth/v1/user")) {
      return jsonResponse({ app_metadata: { role: "admin" } });
    }
    if (target.includes("/rest/v1/bookings") && method === "GET") {
      return jsonResponse([{
        id: bookingId,
        details: {
          configuration: {
            uploadMetadata: [{ storagePath: "cloudflare-pages/2026-08-19/request/photo.jpg" }],
          },
        },
        file_url: null,
        file_urls: null,
      }]);
    }
    if (target.endsWith("/storage/v1/object/uploads") && method === "DELETE") {
      return jsonResponse({}, storageStatus);
    }
    if (target.includes("/rest/v1/bookings") && method === "DELETE") {
      return jsonResponse(deletedRows);
    }
    throw new Error(`Unexpected request: ${method} ${target}`);
  };
  return { calls, mockFetch };
}

{
  const { calls, mockFetch } = successfulAdminFetch();
  const response = await handleAdminBookingDelete(context(), mockFetch);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    ok: true,
    deletedId: bookingId,
    deletedFileCount: 1,
  });
  assert.equal(calls.length, 4, "admin flow must authenticate, load, remove files, then delete row");
  assert.deepEqual(calls.map((call) => call.method), ["GET", "GET", "DELETE", "DELETE"]);
  assert.equal(calls[1].init.headers.apikey, env.SUPABASE_SERVICE_ROLE_KEY);
  assert.equal(calls[1].init.headers.Authorization, undefined, "new secret key must not be sent as Bearer");
  assert.deepEqual(JSON.parse(calls[2].init.body), {
    prefixes: ["cloudflare-pages/2026-08-19/request/photo.jpg"],
  });
  assert.equal(calls[3].init.headers.Authorization, authorization, "row deletion must exercise user RLS");
  assert.equal(calls[3].init.headers.apikey, env.SUPABASE_PUBLISHABLE_KEY);
}

{
  const { calls, mockFetch } = successfulAdminFetch({ storageStatus: 500 });
  const response = await handleAdminBookingDelete(context(), mockFetch);
  assert.equal(response.status, 502, "a storage failure must stop deletion");
  assert.equal(calls.some((call) => call.method === "DELETE" && call.target.includes("/rest/v1/bookings")), false);
}

{
  const { mockFetch } = successfulAdminFetch({ deletedRows: [] });
  const response = await handleAdminBookingDelete(context(), mockFetch);
  assert.equal(response.status, 409, "an empty RLS delete result must never be reported as success");
}

console.log(JSON.stringify({
  passed: true,
  authorization: ["anonymous rejected", "non-admin rejected", "admin confirmed"],
  storage: "only server-derived FLOXANT upload paths are removed",
  rls: "the authenticated admin JWT performs the final row deletion",
  note: "live database role probes remain a release gate",
}, null, 2));
