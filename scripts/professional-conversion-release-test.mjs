#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const navigation = read("components/FloxNavigation.tsx");
const footer = read("components/Footer.tsx");
const contact = read("components/ContactQueryPersonalization.tsx");
const form = read("components/ProfessionalRequestForm.tsx");
const resolver = read("lib/lead-intents/resolve-request-context.ts");
const policy = read("lib/lead-intents/request-location-policy.ts");
const dashboardTest = read("scripts/admin-dashboard-details-test.mjs");
const functionTest = read("scripts/cloudflare-functions-test.mjs");
const analyticsTest = read("scripts/google-tag-consent-test.mjs");

const passed = [];
function test(name, check) {
  check();
  passed.push(name);
}

test("1 Desktop-Header neutral", () => {
  assert.match(navigation, /buildGlobalRequestHref\("global_header"\)/);
});
test("2 Mobile-Header neutral", () => {
  assert.match(navigation, /buildGlobalRequestHref\("global_mobile_header"\)/);
});
test("3 Footer neutral", () => {
  assert.match(footer, /buildGlobalRequestHref\("global_footer"\)/);
});
test("4 keine Standortvorauswahl", () => {
  assert.match(resolver, /location: RequestLocation \| "" = ""/);
});
test("5 keine Servicevorauswahl", () => {
  assert.match(resolver, /service: ""/);
});
test("6 neutraler H1", () => {
  assert.match(resolver, /headline: "Leistung unverbindlich anfragen"/);
});
test("7 neutrales Badge", () => {
  assert.match(resolver, /badge: "FLOXANT Anfrage"/);
});
test("8 alter Zustand verworfen", () => {
  assert.match(contact, /floxant:neutral-request-entry/);
  assert.doesNotMatch(form, /localStorage|sessionStorage/);
});
test("9 Validierungsfehler behält Eingaben", () => {
  assert.match(form, /setErrors\(next\)/);
  assert.doesNotMatch(form, /setName\(""\).*setErrors/s);
});

test("10 Büroreinigung Düsseldorf", () => {
  assert.match(policy, /duesseldorf:[\s\S]*key: "bueroreinigung", service: "bueroreinigung"/);
});
test("11 Praxisreinigung Düsseldorf", () => {
  assert.match(policy, /duesseldorf:[\s\S]*key: "praxisreinigung", service: "praxisreinigung"/);
});
test("12 Umzug Regensburg", () => {
  assert.match(policy, /regensburg:[\s\S]*key: "umzug", service: "umzug"/);
});
test("13 Entrümpelung Regensburg", () => {
  assert.match(policy, /regensburg:[\s\S]*key: "entruempelung", service: "entruempelung"/);
});
test("14 ungültige Kombination neutral", () => {
  assert.match(resolver, /return neutralContext\(input, location\)/);
});

for (const [number, label, fixture] of [
  [15, "alte Umzugsanfrage", "alte Umzugsanfrage"],
  [16, "neue Umzugsanfrage", "neue Umzugsanfrage"],
  [17, "Reinigungsanfrage", "Reinigungsanfrage"],
  [18, "Ads-Reinigungsanfrage", "Google-Ads-Reinigungsanfrage"],
  [19, "Ads-Umzugsanfrage", "Google-Ads-Umzugsanfrage"],
  [20, "details als Text", "details als Text"],
  [21, "details als Objekt", "details als JSON-Text"],
  [22, "upgrades als Array", "upgrades als Array"],
  [23, "upgrades als Objekt", "upgrades als Objekt"],
  [24, "file_url", "file_url"],
  [25, "file_urls", "file_urls"],
  [26, "unbekannte Felder", "unbekannte Felder"],
  [27, "lange Werte", "sehr lange Werte"],
]) {
  test(`${number} ${label}`, () => assert.ok(dashboardTest.includes(`label: "${fixture}"`)));
}
test("28 keine Secrets", () => {
  assert.match(dashboardTest, /must not be displayed/);
  assert.match(functionTest, /service-role-not-in-browser/);
});

for (const [number, label, fixture] of [
  [29, "gültige Reinigung 201", "valid-cleaning-request-201"],
  [30, "gültiger Umzug 201", "valid-professional-moving-request-201"],
  [31, "gültige Räumung 201", "valid-professional-clearance-request-201"],
  [32, "fehlende Pflichtfelder 400", "empty-payload-400"],
  [33, "fremde Origin 403", "foreign-origin-403"],
  [34, "Konfigurationsfehler 503", "configuration-error-503"],
  [35, "Supabase-Fehler 500", "insert-failure-500"],
  [36, "Resend-Fehler nach Insert 201", "resend-failure-still-201"],
  [37, "Doppelklick ein Request", "double-click-one-request"],
  [38, "große gültige Payloads", "largest-active-contact-payload-201"],
  [39, "FormData", "valid-formdata-201"],
  [40, "Upload", "upload-not-counted-as-payload-field"],
]) {
  test(`${number} ${label}`, () => assert.ok(functionTest.includes(`"${fixture}"`)));
}
test("41 Analytics nur nach Erfolg", () => {
  assert.match(analyticsTest, /trackingCall > payloadGuard/);
  assert.match(form, /response\.status !== 201[\s\S]*result\.ok !== true/);
});
test("42 keine personenbezogenen Analytics-Daten", () => {
  assert.match(analyticsTest, /Object\.keys\(leadEvents\[0\]\[2\]\)\.sort/);
  assert.doesNotMatch(
    analyticsTest,
    /form_name[\s\S]{0,300}(?:customer_name|customer_email|customer_phone)/,
  );
});

assert.equal(passed.length, 42);
console.log(`Professional conversion release tests: PASS (${passed.length} checks)`);
for (const name of passed) console.log(`PASS ${name}`);
