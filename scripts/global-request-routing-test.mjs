import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const navigation = read("components/FloxNavigation.tsx");
const footer = read("components/Footer.tsx");
const contact = read("components/ContactQueryPersonalization.tsx");
const contactPage = read("app/kontakt/page.tsx");
const form = read("components/ProfessionalRequestForm.tsx");
const notFound = read("app/not-found.tsx");
const leadIntents = read("lib/lead-intents.ts");
const resolver = read("lib/lead-intents/resolve-request-context.ts");
const locationPolicy = read("lib/lead-intents/request-location-policy.ts");
const requestPolicy = read("lib/booking/request-service-policy.js");
const siteChrome = read("components/layout/SiteChrome.tsx");
const adsCleaning = read("components/forms/DuesseldorfCleaningAdsForm.tsx");
const adsMoving = read("components/forms/RegensburgMovingAdsForm.tsx");
const bookingPage = read("app/buchung/page.tsx");
const serviceNavigation = read("lib/service-navigation.ts");
const serviceRegistry = read("lib/services/service-registry.ts");
const officeCleaningPage = read("app/bueroreinigung/page.tsx");
const discreetServicePage = read("app/diskret-service/page.tsx");
const duesseldorfCleaningPages = read("components/duesseldorf/DuesseldorfCleaningServicePage.tsx");

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
  assert.match(contact, /serviceKey=\{context\.serviceKey\}/);
  assert.match(contact, /Bitte Leistung auswählen/);
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
  assert.match(requestPolicy, /id: "bueroreinigung", name: "Büroreinigung"[\s\S]*?locations: both[\s\S]*?leadService: "bueroreinigung"/);
  assert.match(locationPolicy, /duesseldorf: optionsFor\("duesseldorf"\)/);
});

test("8. Praxisreinigung ist Düsseldorf korrekt zugeordnet", () => {
  assert.match(requestPolicy, /id: "praxisreinigung", name: "Praxisreinigung"[\s\S]*?locations: both[\s\S]*?leadService: "praxisreinigung"/);
});

test("9. Umzug ist Regensburg korrekt zugeordnet", () => {
  assert.match(requestPolicy, /id: "umzug", name: "Umzug"[\s\S]*?locations: regensburg[\s\S]*?leadService: "umzug"/);
  assert.match(locationPolicy, /regensburg: optionsFor\("regensburg"\)/);
});

test("10. Entrümpelung ist Regensburg korrekt zugeordnet", () => {
  assert.match(requestPolicy, /id: "entruempelung", name: "Entrümpelung"[\s\S]*?locations: regensburg[\s\S]*?leadService: "entruempelung"/);
});

test("11. Ungültige Kombinationen fallen neutral zurück", () => {
  assert.match(resolver, /!option \|\| !isRequestServiceAllowedAtLocation\(location, option\)/);
  assert.match(resolver, /Diese Leistung ist am gewählten Standort nicht verfügbar/);
  assert.match(locationPolicy, /isAllowedRequestCombination\(location, option\.registryServiceId\)/);
});

test("12. Ein neuer globaler Einstieg verwirft alten Formularzustand", () => {
  assert.match(contact, /floxant:neutral-request-entry/);
  assert.match(contact, /key=\{`central-request:\$\{entryReset\}:\$\{offerConcern\}`\}/);
  assert.match(contact, /initialScope=\{offerConcern\}/);
  assert.match(contact, /const routerQuery = searchParams\.toString\(\)/);
  assert.match(contact, /window\.addEventListener\("popstate", syncFromLocation\)/);
  assert.doesNotMatch(contact, /key=\{`[^`]*query/);
  assert.match(navigation, /resetNeutralRequestState/);
  assert.doesNotMatch(`${contact}\n${form}`, /localStorage|sessionStorage/);
});

test("13. Validierungsfehler behalten Eingaben derselben Anfrage", () => {
  assert.match(form, /setErrors\(next\)/);
  assert.match(form, /setStatus\("error"\)/);
  assert.doesNotMatch(form, /setName\(""\).*Validierung/s);
});

test("14. Google-Ads-Formulare behalten ihren Kampagnenkontext", () => {
  assert.match(siteChrome, /"cleaning-duesseldorf"/);
  assert.match(siteChrome, /"moving-regensburg"/);
  assert.match(adsCleaning, /location: "duesseldorf"/);
  assert.match(adsCleaning, /service: "reinigung"/);
  assert.match(adsCleaning, /source: "google_ads"/);
  assert.match(adsMoving, /location: "regensburg"/);
  assert.match(adsMoving, /service: "umzug"/);
  assert.match(adsMoving, /source: "google_ads"/);
  assert.match(adsCleaning, /<ProfessionalRequestForm/);
  assert.match(adsMoving, /<ProfessionalRequestForm/);
});

test("15. Angebotscheck ist im zentralen Anfrageprozess verfügbar", () => {
  assert.match(requestPolicy, /id: "angebotscheck"/);
  assert.doesNotMatch(contact, /window\.location\.assign/);
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
  assert.match(form, /response\.status !== 201[\s\S]*result\.ok !== true/);
});

test("19. Düsseldorf und Regensburg werden nicht vermischt", () => {
  assert.match(resolver, /const options = requestServiceOptionsByLocation\[location\]/);
  assert.match(resolver, /resolveAllowedRequestService\(location, rawServiceKey\)/);
  assert.match(locationPolicy, /getRequestServicesForLocation\(location\)/);
  assert.match(requestPolicy, /locations: both/);
  assert.match(requestPolicy, /locations: regensburg/);
});

test("20. Desktop, Mobile und Footer nutzen dieselbe zentrale Routinglogik", () => {
  assert.match(navigation, /buildGlobalRequestHref/);
  assert.match(footer, /buildGlobalRequestHref\("global_footer"\)/);
  assert.equal((navigation.match(/buildGlobalRequestHref\(/g) || []).length, 2);
});

test("404-Anfrage nutzt den neutralen Einstieg", () => {
  assert.match(notFound, /buildGlobalRequestHref\("global_404"\)/);
});

test("Kontaktformular hat genau drei klar benannte Schritte", () => {
  assert.match(form, /Standort und Leistung/);
  assert.match(form, /Eckdaten/);
  assert.match(form, /Kontakt und Zusammenfassung/);
  assert.match(form, /Schritt \$\{step\} von 3/);
});

test("Kontakt-Metadaten und Canonical sind neutral", () => {
  assert.match(contactPage, /Leistung unverbindlich anfragen \| FLOXANT/);
  assert.match(contactPage, /Wählen Sie Standort und Leistung und senden Sie die wichtigsten Eckdaten direkt an FLOXANT\./);
  assert.match(contactPage, /canonical: `\$\{company\.url\}\/kontakt`/);
});

test("Der alte Regensburg-Kontaktfallback ist entfernt", () => {
  assert.match(leadIntents, /"\/kontakt": \{[\s\S]*?city: "deutschland"/);
  assert.doesNotMatch(navigation, /headerOfferHref = buildLeadHref/);
});

test("Signatur-CTAs verwenden explizite Policy-Services", () => {
  assert.doesNotMatch(bookingPage, /getSignatureActionHref/);
  assert.match(bookingPage, /service=uebergabeakte&entry=uebergabeakte/);
  assert.match(bookingPage, /service=diskret-service&entry=diskret/);
  assert.match(bookingPage, /service=umzug-mit-reinigung&entry=kombination/);
  assert.match(bookingPage, /service=entruempelung&entry=raeumung-reinigung/);
  assert.match(bookingPage, /service=beiladung-rueckfahrt&entry=rueckfahrt/);
});

test("Alte Düsseldorf-Buchungsparameter öffnen den neutralen zentralen Kontext", () => {
  assert.match(contact, /LegacyBookingContextRedirect/);
  assert.match(contact, /next\.set\("location", "duesseldorf"\)/);
  assert.match(contact, /window\.location\.replace\(`\/kontakt\?/);
  assert.match(bookingPage, /<LegacyBookingContextRedirect \/>/);
});

test("Registry-CTAs behalten ihre aktive Service-ID und setzen einen Standort", () => {
  assert.match(serviceRegistry, /service=\$\{encodeURIComponent\(seed\.id\)\}&city=\$\{requestLocation\}/);
  assert.match(
    serviceRegistry,
    /service=ferienwohnung-reinigung&city=duesseldorf&intent=ferienwohnung-reinigung-anfrage/,
  );
  assert.doesNotMatch(
    serviceRegistry,
    /service=reinigung&intent=ferienwohnung-reinigung/,
  );
});

test("Globale mobile und Footer-Anfragen bleiben neutral", () => {
  assert.match(serviceNavigation, /Unsicher\?"\s*,\s*href: "\/kontakt\?mode=neutral&source=mobile-nav"/);
  assert.match(serviceNavigation, /Anfrage stellen"\s*,\s*href: "\/kontakt\?mode=neutral&source=footer"/);
});

test("Kontextseiten setzen Standort und kanonische Registry-Service-ID", () => {
  for (const [label, source] of [
    ["Büroreinigung", officeCleaningPage],
    ["Diskret-Service", discreetServicePage],
  ]) {
    const hrefs = source.match(/\/kontakt\?service=[^"'`\s]+/g) || [];
    assert.ok(hrefs.length > 0, `${label}: kein Anfrage-CTA gefunden`);
    for (const href of hrefs) {
      assert.match(href, /[?&]city=(?:duesseldorf|regensburg)(?:&|$)/, `${label}: ${href}`);
    }
  }

  assert.match(duesseldorfCleaningPages, /import \{ buildLeadHref \} from "@\/lib\/lead-intents"/);
  assert.match(duesseldorfCleaningPages, /buildLeadHref\(\{ service, city: "duesseldorf", intent \}\)/);
  assert.match(duesseldorfCleaningPages, /requestHref\("grundreinigung", "grundreinigung-duesseldorf"\)/);
  assert.match(duesseldorfCleaningPages, /\/duesseldorf\/buchen\?service=bauendreinigung/);
  assert.match(duesseldorfCleaningPages, /requestHref\("treppenhausreinigung", "treppenhausreinigung-duesseldorf"\)/);
  assert.match(duesseldorfCleaningPages, /requestHref\("gewerbereinigung", "gewerbereinigung-duesseldorf"\)/);
  assert.doesNotMatch(
    duesseldorfCleaningPages,
    /requestHref\("(?:solarreinigung|hausverwaltung-reinigung|gebaeudereinigung)"/,
  );
});

test("Englische Navigation verwendet kanonische Registry-Service-IDs", () => {
  for (const service of [
    "reinigung",
    "bueroreinigung",
    "umzug",
    "entruempelung",
    "klaviertransport",
    "angebotscheck",
  ]) {
    assert.match(
      serviceNavigation,
      new RegExp(`service=${service}&city=regensburg&intent=english-`),
      service,
    );
  }
  assert.doesNotMatch(
    serviceNavigation,
    /service=(?:cleaning|office-cleaning|moving|house-clearance|piano-transport|offer-check)&/,
  );
});

console.log(`Global request routing tests: PASS (${cases.length} checks)`);
for (const name of cases) console.log(`PASS ${name}`);
