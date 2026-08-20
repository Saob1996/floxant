import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (...segments) => fs.readFileSync(path.join(root, ...segments), "utf8");

const regensburgPage = read("app", "regensburg", "buchen", "page.tsx");
const duesseldorfPage = read("app", "duesseldorf", "buchen", "page.tsx");
const bookingPage = read("components", "booking", "LocalBookingPage.tsx");
const personalization = read("components", "ContactQueryPersonalization.tsx");
const requestForm = read("components", "ProfessionalRequestForm.tsx");
const duesseldorfServices = read("components", "duesseldorf", "DuesseldorfCleaningServicePage.tsx");
const pianoPage = read("app", "klaviertransport-regensburg", "page.tsx");
const movingPage = read("app", "regensburg", "umzug", "page.tsx");
const requestPolicy = read("lib", "booking", "request-service-policy.js");
const seoMeta = read("lib", "content", "seo-meta-registry.ts");

for (const [label, source, route, city] of [
  ["Regensburg", regensburgPage, "/regensburg/buchen", "Regensburg"],
  ["Düsseldorf", duesseldorfPage, "/duesseldorf/buchen", "Düsseldorf"],
]) {
  assert.match(source, new RegExp(`const path = "${route}"`), `${label}: stable route missing`);
  assert.match(source, /alternates:\s*\{ canonical: path \}/, `${label}: self canonical missing`);
  assert.match(source, /title: "Termin in /, `${label}: server title missing`);
  assert.match(source, /description: "/, `${label}: server description missing`);
  assert.match(source, new RegExp(`city="${city}"`), `${label}: city binding missing`);
  assert.match(source, /faq=\{faq\}/, `${label}: visible FAQ missing`);
}

assert.match(bookingPage, /<ContactLeadForm[\s\S]*?defaultLocation=\{location\}[\s\S]*?sourcePage=\{path\}/);
assert.match(bookingPage, /href=\{`tel:\$\{company\.phoneRaw\}`\}/);
assert.match(bookingPage, /Fotos und Dateien mitsenden/);
assert.match(bookingPage, /Termin erst nach persönlicher Prüfung/);
assert.match(personalization, /isGoogleBusinessProfile/);
assert.match(personalization, /isGoogleBusinessProfile \? "google_maps"/);
assert.match(personalization, /sourcePage\.endsWith\("\/buchen"\)/);
for (const field of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
  assert.ok(requestForm.includes(`query.get("${field}")`), `${field}: capture missing`);
}
for (const field of ["leadSource", "sourcePage", "landingPage", "city"]) {
  assert.match(requestForm, new RegExp(`${field}[:,]`), `${field}: lead field missing`);
}
for (const service of ["reinigung", "bueroreinigung", "praxisreinigung", "grundreinigung", "baureinigung"]) {
  assert.ok(
    duesseldorfServices.includes(`"${service}"`) &&
      duesseldorfServices.includes("localBookingServices = new Set"),
    `${service}: local booking CTA routing missing`,
  );
}
for (const question of [
  "Was kostet eine Büroreinigung in Düsseldorf?",
  "Was wird bei einer Praxisreinigung gereinigt?",
  "Was beeinflusst den Preis einer Grundreinigung in Düsseldorf?",
]) {
  assert.ok(duesseldorfServices.includes(question), `${question}: direct answer missing`);
}
assert.match(seoMeta, /Büroreinigung Düsseldorf \| Angebot anfragen \| FLOXANT/);
assert.match(seoMeta, /Praxisreinigung Düsseldorf \| Angebot anfragen \| FLOXANT/);
assert.match(seoMeta, /Grundreinigung Düsseldorf für Wohnung & Haus \| FLOXANT/);
assert.match(seoMeta, /Bauendreinigung Düsseldorf \| Angebot anfragen \| FLOXANT/);
assert.match(seoMeta, /Klaviertransport Regensburg \| Angebot anfragen \| FLOXANT/);
assert.match(seoMeta, /Umzugshilfe Regensburg \| Umzug anfragen \| FLOXANT/);

assert.match(pianoPage, /\/regensburg\/buchen\?service=klaviertransport/);
assert.match(pianoPage, /Was kostet ein Klaviertransport in Regensburg\?/);
assert.match(pianoPage, /Wie wird ein Wunschtermin angefragt\?/);
assert.match(movingPage, /\/regensburg\/buchen\?service=umzug/);
assert.match(movingPage, /\/regensburg\/buchen\?service=moebelmontage/);
assert.match(movingPage, /Was kostet eine Umzugshilfe in Regensburg\?/);
assert.match(duesseldorfServices, /Was kostet ein Reinigungsdienst in Düsseldorf\?/);
assert.match(duesseldorfServices, /id="umzugsreinigung"/);
assert.match(duesseldorfServices, /\/duesseldorf\/buchen\?service=bauendreinigung/);
assert.match(duesseldorfPage, /\/duesseldorf\/reinigung#umzugsreinigung/);
assert.doesNotMatch(duesseldorfPage, /href: "\/duesseldorf\/umzugsreinigung"/);

for (const [alias, canonical] of [
  ["moebelmontage", "moebeltransport"],
  ["umzugsreinigung", "reinigung"],
  ["bauendreinigung", "baureinigung"],
]) {
  assert.ok(requestPolicy.includes(`${alias}: "${canonical}"`), `${alias}: safe alias missing`);
}
assert.match(requestForm, /requestedServiceParam/);
assert.match(requestForm, /requestedService,/);

console.log(JSON.stringify({
  passed: true,
  routes: ["/regensburg/buchen", "/duesseldorf/buchen"],
  attribution: "google_maps -> Google-Unternehmensprofil",
  form: "existing ProfessionalRequestForm with uploads and UTM fields",
}, null, 2));
