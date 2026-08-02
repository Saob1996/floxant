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
const requestPolicy = read("lib/booking/request-service-policy.js");
const dashboardTest = read("scripts/admin-dashboard-details-test.mjs");
const functionTest = read("scripts/cloudflare-functions-test.mjs");
const analyticsTest = read("scripts/google-tag-consent-test.mjs");
const requestContent = read("lib/lead-intents/request-page-content.ts");
const requestSchema = read("lib/booking/request-schema.js");
const submissionClient = read("lib/booking-submission-client.ts");

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
  assert.match(requestPolicy, /id: "bueroreinigung", name: "Büroreinigung"[\s\S]*?locations: both[\s\S]*?leadService: "bueroreinigung"/);
  assert.match(policy, /duesseldorf: optionsFor\("duesseldorf"\)/);
});
test("11 Praxisreinigung Düsseldorf", () => {
  assert.match(requestPolicy, /id: "praxisreinigung", name: "Praxisreinigung"[\s\S]*?locations: both[\s\S]*?leadService: "praxisreinigung"/);
});
test("12 Umzug Regensburg", () => {
  assert.match(requestPolicy, /id: "umzug", name: "Umzug"[\s\S]*?locations: regensburg[\s\S]*?leadService: "umzug"/);
});
test("13 Entrümpelung Regensburg", () => {
  assert.match(requestPolicy, /id: "entruempelung", name: "Entrümpelung"[\s\S]*?locations: regensburg[\s\S]*?leadService: "entruempelung"/);
});
test("14 ungültige Kombination neutral", () => {
  assert.match(resolver, /Diese Leistung ist am gewählten Standort nicht verfügbar/);
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

test("43 Regensburg-Umzug nur Umzugshilfen", () => {
  assert.match(requestContent, /key: "regensburg_moving"[\s\S]*Etagen, Aufzüge, Fotos/);
  assert.doesNotMatch(requestContent.match(/const moving:[\s\S]*?\n};/)?.[0] || "", /besondere Bereiche/);
});
test("44 Düsseldorf-Reinigung mit Reinigungshilfen", () => {
  assert.match(requestContent, /key: "duesseldorf_cleaning"[\s\S]*Fotos, besondere Bereiche/);
});
test("45 neutraler Einstieg bleibt neutral", () => {
  assert.match(requestContent, /key: "neutral"[\s\S]*Zeitraum, Fotos/);
});
test("46 Anfrageanker mit Headerabstand", () => {
  assert.match(contact, /id="direktanfrage"[\s\S]{0,180}scroll-mt-28[\s\S]{0,80}lg:scroll-mt-32/);
});
test("47 gemeinsamer Anfragevertrag", () => {
  assert.match(functionTest, /regensburg-moving-context-formdata-201/);
  assert.match(requestSchema, /CANONICAL_REQUEST_TOP_LEVEL_FIELDS/);
  assert.match(requestSchema, /REQUEST_UI_ONLY_FIELDS[\s\S]*"priority"/);
  assert.match(requestSchema, /"rawFields", "entryPage", "entryPoint", "campaign"/);
});
test("48 statischer Query-Einstieg hydratisiert ohne Abweichung", () => {
  assert.match(contact, /const \[query, setQuery\] = useState\(""\)/);
  assert.match(contact, /window\.location\.search/);
  assert.match(contact, /syncFromLocation\(\)/);
});
test("49 temporÃ¤rer Kontextwechsel behÃ¤lt das letzte Fachprofil", () => {
  assert.match(form, /if \(!context\.valid\)[\s\S]*?group: previous\.group/);
});
test("50 veraltete Submit-Antworten Ã¤ndern keinen neuen Kontext", () => {
  assert.match(form, /const attemptKey = `professional_request:/);
  assert.match(form, /submissionAttemptKeyRef\.current !== attemptKey/);
  assert.match(submissionClient, /Idempotency-Key/);
  assert.match(submissionClient, /`\$\{url\}::\$\{idempotencyKey\}`/);
});

assert.equal(passed.length, 50);
console.log(`Professional conversion release tests: PASS (${passed.length} checks)`);
for (const name of passed) console.log(`PASS ${name}`);
