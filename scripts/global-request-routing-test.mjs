import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const navigation = read("components/FloxNavigation.tsx");
const footer = read("components/Footer.tsx");
const contact = read("components/ContactQueryPersonalization.tsx");
const contactPage = read("app/kontakt/page.tsx");
const form = read("components/SeoLeadForm.tsx");
const leadIntents = read("lib/lead-intents.ts");
const resolver = read("lib/lead-intents/resolve-request-context.ts");
const siteChrome = read("components/layout/SiteChrome.tsx");
const adsCleaning = read("components/forms/DuesseldorfCleaningAdsForm.tsx");
const adsMoving = read("components/forms/RegensburgMovingAdsForm.tsx");

const cases = [];
function test(name, check) {
  check();
  cases.push(name);
}

test("1. Desktop-Header öffnet den neutralen Einstieg", () => {
  assert.match(navigation, /headerOfferHref = buildGlobalRequestHref\("global_header"\)/);
  assert.match(resolver, /\/kontakt\?mode=neutral&source=\$\{source\}/);
});

test("2. Mobile Navigation öffnet den neutralen Einstieg", () => {
  assert.match(navigation, /mobileOfferHref = buildGlobalRequestHref\("global_mobile_header"\)/);
  assert.match(navigation, /href=\{mobileOfferHref\}/);
});

test("3. Global ist kein Standort vorausgewählt", () => {
  assert.match(resolver, /if \(explicitNeutral\) return neutralContext\(input\)/);
  assert.match(resolver, /location: RequestLocation \| "" = ""/);
});

test("4. Global ist keine Leistung vorausgewählt", () => {
  assert.match(resolver, /service: ""/);
  assert.match(form, /value=\{serviceSelected \? service : ""\}/);
});

test("5. Die neutrale H1 ist verbindlich", () => {
  assert.match(resolver, /headline: "Leistung unverbindlich anfragen"/);
  assert.match(contact, /data-request-headline/);
});

test("6. Das neutrale Badge ist verbindlich", () => {
  assert.match(resolver, /badge: "FLOXANT Anfrage"/);
  assert.match(contactPage, /<ContactHeroBadge \/>/);
});

test("7. Büroreinigung ist Düsseldorf korrekt zugeordnet", () => {
  assert.match(resolver, /key: "bueroreinigung", label: "Büroreinigung"/);
  assert.match(resolver, /duesseldorf: duesseldorfServices/);
});

test("8. Praxisreinigung ist Düsseldorf korrekt zugeordnet", () => {
  assert.match(resolver, /key: "praxisreinigung", label: "Praxisreinigung"/);
});

test("9. Umzug ist Regensburg korrekt zugeordnet", () => {
  assert.match(resolver, /key: "umzug", label: "Umzug"/);
  assert.match(resolver, /regensburg: regensburgServices/);
});

test("10. Entrümpelung ist Regensburg korrekt zugeordnet", () => {
  assert.match(resolver, /key: "entruempelung", label: "Entrümpelung"/);
});

test("11. Ungültige Kombinationen fallen neutral zurück", () => {
  assert.match(resolver, /if \(!option\) return neutralContext\(input\)/);
  assert.match(resolver, /!registryEntry\.supportedCities\.includes\(location\)/);
});

test("12. Ein neuer globaler Einstieg verwirft alten Formularzustand", () => {
  assert.match(contact, /floxant:neutral-request-entry/);
  assert.match(contact, /static-contact-default.*entryReset/);
  assert.match(navigation, /resetNeutralRequestState/);
  assert.doesNotMatch(`${contact}\n${form}`, /localStorage|sessionStorage/);
});

test("13. Validierungsfehler behalten Eingaben derselben Anfrage", () => {
  assert.match(form, /setErrors\(nextErrors\)/);
  assert.match(form, /setStatus\("error"\)/);
  assert.doesNotMatch(form, /setName\(""\).*Validierung/s);
});

test("14. Google-Ads-Formulare behalten ihren Kampagnenkontext", () => {
  assert.match(siteChrome, /"cleaning-duesseldorf"/);
  assert.match(siteChrome, /"moving-regensburg"/);
  assert.match(adsCleaning, /Google Ads – Reinigung Düsseldorf/);
  assert.match(adsMoving, /Google Ads – Umzug Regensburg/);
});

test("15. Angebot prüfen bleibt eine getrennte Route", () => {
  assert.match(navigation, /href="\/angebot-guenstiger-pruefen"/);
  assert.match(contact, /window\.location\.assign\("\/angebot-guenstiger-pruefen\?source=contact_selector"\)/);
});

test("16. Budget nennen bleibt eine getrennte Route", () => {
  assert.match(navigation, /headerBudgetHref = "\/anfrage-mit-preisrahmen"/);
  assert.match(navigation, /href=\{headerBudgetHref\}/);
});

test("17. Desktop- und Mobile-Trackingquellen stimmen", () => {
  assert.match(navigation, /data-source="global_header"/);
  assert.match(navigation, /data-source="global_mobile_header"/);
});

test("18. generate_lead wird nicht beim Öffnen ausgelöst", () => {
  assert.doesNotMatch(`${navigation}\n${contact}\n${contactPage}`, /generate_lead/);
  assert.match(form, /response\.status !== 201 \|\| responsePayload\?\.ok !== true/);
});

test("19. Düsseldorf und Regensburg werden nicht vermischt", () => {
  assert.match(resolver, /const options = requestServiceOptionsByLocation\[location\]/);
  assert.match(resolver, /if \(!option\) return neutralContext\(input\)/);
});

test("20. Desktop, Mobile und Footer nutzen dieselbe zentrale Routinglogik", () => {
  assert.match(navigation, /buildGlobalRequestHref/);
  assert.match(footer, /buildGlobalRequestHref\("global_footer"\)/);
  assert.equal((navigation.match(/buildGlobalRequestHref\(/g) || []).length, 2);
});

test("Kontakt-Metadaten und Canonical sind neutral", () => {
  assert.match(contactPage, /Angebot und Leistung anfragen \| FLOXANT/);
  assert.match(contactPage, /Wählen Sie Standort und Leistung und senden Sie die wichtigsten Eckdaten direkt an FLOXANT\./);
  assert.match(contactPage, /canonical: `\$\{company\.url\}\/kontakt`/);
});

test("Der alte Regensburg-Kontaktfallback ist entfernt", () => {
  assert.match(leadIntents, /"\/kontakt": \{[\s\S]*?city: "deutschland"/);
  assert.doesNotMatch(navigation, /headerOfferHref = buildLeadHref/);
});

console.log(`Global request routing tests: PASS (${cases.length} checks)`);
for (const name of cases) console.log(`PASS ${name}`);
