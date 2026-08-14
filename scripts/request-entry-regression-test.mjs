import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const cases = [];

function test(name, check) {
  check();
  cases.push(name);
}

const navigation = read("components/FloxNavigation.tsx");
const footer = read("components/Footer.tsx");
const floating = read("components/MobileFloatingContact.tsx");
const homepage = read("app/page.tsx");
const contactPage = read("app/kontakt/page.tsx");
const contactEntry = read("components/ContactQueryPersonalization.tsx");
const form = read("components/ProfessionalRequestForm.tsx");
const leadIntents = read("lib/lead-intents.ts");
const requestContext = read("lib/lead-intents/resolve-request-context.ts");
const requestPolicy = read("lib/booking/request-service-policy.js");
const submission = read("lib/booking-submission-client.ts");
const serviceNavigation = read("lib/service-navigation.ts");

test("global header requests are neutral", () => {
  assert.match(navigation, /requestHref = buildGlobalRequestHref\("global_header"\)/);
  assert.match(navigation, /headerOfferHref = buildGlobalRequestHref\("global_header"\)/);
  assert.match(navigation, /mobileRequestHref = buildGlobalRequestHref\("global_mobile_header"\)/);
  assert.doesNotMatch(navigation, /headerOfferHref = buildLeadHref/);
});

test("footer and floating requests are neutral", () => {
  assert.match(footer, /buildGlobalRequestHref\("global_footer"\)/);
  assert.match(floating, /buildGlobalRequestHref\("global_floating"\)/);
  assert.match(floating, /const offerHref = "\/angebot-guenstiger-pruefen"/);
  assert.doesNotMatch(floating, /const requestHref = `\/kontakt\?service=/);
});

test("homepage and shared navigation requests are explicitly neutral", () => {
  assert.match(homepage, /buildGlobalRequestHref\("global_homepage"\)/);
  assert.match(serviceNavigation, /\/kontakt\?mode=neutral&source=mobile-nav/);
  assert.match(serviceNavigation, /\/kontakt\?mode=neutral&source=global_footer/);
  assert.doesNotMatch(serviceNavigation, /Anfrage stellen", href: "\/kontakt\?service=/);
});

test("contact fallback never assumes Regensburg", () => {
  assert.match(leadIntents, /"\/kontakt": \{[\s\S]*?city: "deutschland"[\s\S]*?intent: "neutrale-anfrage"/);
  assert.match(requestContext, /if \(explicitNeutral\) return neutralContext\(input\)/);
});

test("legacy partial selections remain calm and keep their service", () => {
  assert.match(leadIntents, /if \(destination === "\/kontakt"\)/);
  assert.match(leadIntents, /params\.set\("mode", "neutral"\)/);
  assert.match(leadIntents, /params\.set\("location", "unsicher"\)/);
  assert.doesNotMatch(contactEntry, /params\.delete\("service"\)/);
  assert.match(requestContext, /"deutschland",[\s\S]*?"bayern",[\s\S]*?"muenchen"/);
  assert.match(requestContext, /return normalized \? "unsicher" : ""/);
  assert.match(requestContext, /replace\(\/\[-_\]\+\/g, " "\)/);
  assert.match(form, /context\.locationHint \|\| "Anderer Ort"/);
  assert.doesNotMatch(requestContext, /hasLocationInput \|\| hasServiceInput/);
});

test("contact page renders one central request flow", () => {
  assert.equal((contactPage.match(/<ContactLeadForm/g) || []).length, 1);
  assert.doesNotMatch(contactPage, /SeoLeadForm|SmartBookingWizard|ContactPathChooser|LocationServiceSwitcher|ServiceFinder/);
  assert.ok(contactPage.indexOf("<ContactLeadForm") < contactPage.indexOf("Lieber direkt Kontakt aufnehmen?"));
});

test("selection starts with three customer-facing locations", () => {
  assert.match(contactEntry, /label: "Anderer Ort"/);
  assert.match(contactEntry, /Einsatzgebiet unverbindlich prüfen/);
  assert.doesNotMatch(contactEntry, />\s*1\. Wo wird/);
  assert.doesNotMatch(contactEntry, />\s*2\. Welche Leistung/);
});

test("form has exactly the intended three progress labels", () => {
  assert.match(form, /\["Standort und Leistung", "Eckdaten", "Kontakt und Zusammenfassung"\]/);
  assert.match(form, /Schritt \$\{step\} von 3/);
});

test("cleaning scope is optional and area has no upper limit", () => {
  const scopeLine = form.split(/\r?\n/).find((line) => line.includes("Reinigungsumfang (optional)")) || "";
  const areaLine = form.split(/\r?\n/).find((line) => line.includes('id="request-area" name="areaSize"')) || "";
  assert.ok(scopeLine, "optional cleaning scope field missing");
  assert.doesNotMatch(scopeLine, /\brequired\b/);
  assert.match(areaLine, /type=\{group === "cleaning" \? "number" : "text"\}/);
  assert.match(areaLine, /min=\{group === "cleaning" \? 1 : undefined\}/);
  assert.match(areaLine, /step=\{group === "cleaning" \? "any" : undefined\}/);
  assert.doesNotMatch(areaLine, /\bmax=/);
  assert.doesNotMatch(form, /Bitte Räume, Bereiche oder gewünschten Umfang angeben/);
  assert.match(requestPolicy, /cleaning: Object\.freeze\(\{[\s\S]*?coreFields: Object\.freeze\(\["cityOrZip", "objectType", "areaSize"\]\)[\s\S]*?optionalFields: Object\.freeze\(\["scope"/);
});

test("public specialist CTAs resolve at core and other locations", () => {
  for (const serviceId of [
    "fernumzug",
    "solarreinigung",
    "pv-anlagen-reinigung",
    "private-client",
  ]) {
    assert.match(requestPolicy, new RegExp(`id: "${serviceId}"`));
  }
  const unsurePolicy = requestPolicy.split("export const REQUEST_UNSURE_SERVICES")[1] || "";
  for (const serviceId of [
    "fernumzug",
    "solarreinigung",
    "pv-anlagen-reinigung",
    "angebotscheck",
    "diskret-service",
    "private-client",
  ]) {
    assert.match(unsurePolicy, new RegExp(`id: "${serviceId}"`));
  }
  assert.match(requestPolicy, /sonderreinigung: "reinigung"/);
  assert.match(requestPolicy, /"uebergabe-sprint": "reinigung"/);
});

test("current backend success is adapted without counting the honeypot response", () => {
  assert.match(submission, /response\.status === 200[\s\S]*?payload\.success === true[\s\S]*?typeof payload\.id === "string"/);
  assert.match(submission, /requestId: payload\.requestId\?\.trim\(\) \|\| payload\.id\?\.trim\(\)/);
  assert.match(submission, /bookingId: payload\.id\?\.trim\(\)/);
  assert.doesNotMatch(form, /trackGenerateLead/);
  assert.match(form, /floxant:conversion-event/);
});

console.log(`Request entry regression tests: PASS (${cases.length} checks)`);
for (const name of cases) console.log(`PASS ${name}`);
