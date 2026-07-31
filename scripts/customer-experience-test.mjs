import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const form = read("components/ProfessionalRequestForm.tsx");
const contact = read("app/kontakt/page.tsx");
const personalization = read("components/ContactQueryPersonalization.tsx");
const resolver = read("lib/lead-intents/resolve-request-context.ts");
const dashboard = read("lib/admin-dashboard/booking-details.ts");
const dashboardUi = read("components/admin-dashboard/AdminDashboard.tsx");
const analytics = read("lib/analytics/google-tag.ts");

const checks = [];
function test(name, run) {
  run();
  checks.push(name);
}

test("neutraler globaler Einstieg", () => {
  assert.match(resolver, /mode\) === "neutral"/);
  assert.match(resolver, /service: ""/);
  assert.match(resolver, /location: RequestLocation \| "" = ""/);
});

test("kontextuelle Standort- und Leistungsauswahl", () => {
  assert.match(personalization, /Wo wird die Leistung benötigt\?/);
  assert.match(personalization, /Welche Leistung benötigen Sie\?/);
  assert.match(resolver, /isRequestServiceAllowedAtLocation/);
});

test("maximal drei verständliche Schritte", () => {
  assert.match(form, /type RequestStep = 1 \| 2 \| 3/);
  assert.match(form, /Kontakt und Zusammenfassung/);
});

test("optionale Angaben sind progressiv", () => {
  assert.match(form, /aria-expanded=\{optionalOpen\}/);
  assert.match(form, /Weitere Angaben hinzufügen/);
  assert.match(form, /request-optional-details/);
});

test("mindestens ein passender Kontaktweg", () => {
  assert.match(form, /!email\.trim\(\) && !phone\.trim\(\)/);
  assert.match(form, /contactMethod === "email" && !email\.trim\(\)/);
  assert.match(form, /\["telefon", "whatsapp"\]\.includes\(contactMethod\)/);
});

test("Eingaben bleiben bei Validierungsfehlern erhalten", () => {
  assert.match(form, /setErrors\(next\)/);
  assert.doesNotMatch(form, /setName\(""\)|setEmail\(""\)|setPhone\(""\)/);
});

test("Doppelklickschutz und strikte Erfolgskontrolle", () => {
  assert.match(form, /if \(status === "submitting"\) return/);
  assert.match(form, /response\.status !== 201/);
  assert.match(form, /result\.ok !== true/);
});

test("Dateien werden geprüft und können entfernt werden", () => {
  assert.match(form, /maxFileSize = 8 \* 1024 \* 1024/);
  assert.match(form, /acceptedFileTypes/);
  assert.match(form, />Entfernen<\/button>/);
});

test("Zusammenfassung enthält nur vorhandene Werte", () => {
  assert.match(form, /importantDetails\.filter\(\(\[, value\]\) => value\)/);
  assert.match(form, /\{message \?/);
  assert.match(form, /Angaben ändern/);
});

test("kundengerechter Erfolg ohne falsche Buchungszusage", () => {
  assert.match(form, /Ihre Anfrage ist angekommen\./);
  assert.match(form, /persönlichen Abstimmung/);
  assert.doesNotMatch(form, /Buchung abgeschlossen|Termin garantiert|verbindlich reserviert/);
});

test("Kontaktseite bleibt formularzentriert", () => {
  assert.match(contact, /<ContactLeadForm/);
  assert.doesNotMatch(contact, /ServicePackageDecisionExperience|DecisionCompassPanel|WhatWeNeedChecklist/);
});

test("Dashboard behält bekannte und unbekannte Angaben", () => {
  assert.match(dashboard, /additionalItems/);
  assert.match(dashboardUi, /Weitere gespeicherte Angaben/);
  assert.match(form, /selectedServices/);
  assert.match(form, /preferredDate/);
});

test("Analytics-Parameter sind nicht personenbezogen", () => {
  assert.match(analytics, /form_name/);
  assert.match(analytics, /service_type/);
  assert.match(analytics, /lead_source/);
  assert.doesNotMatch(analytics, /\b(email|phone|message|requestId|bookingId)\b/i);
});

console.log(`Customer experience tests: PASS (${checks.length} checks)`);
for (const check of checks) console.log(`PASS ${check}`);
