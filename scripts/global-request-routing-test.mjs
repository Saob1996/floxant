import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const nativeRequire = createRequire(import.meta.url);
const moduleCache = new Map();

function loadTypeScriptModule(filePath) {
  const absolutePath = path.resolve(filePath);
  if (moduleCache.has(absolutePath)) return moduleCache.get(absolutePath).exports;

  const source = fs.readFileSync(absolutePath, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: absolutePath,
  }).outputText;
  const compiledModule = { exports: {} };
  moduleCache.set(absolutePath, compiledModule);

  const localRequire = (request) => {
    if (request.startsWith("@/")) {
      const resolved = path.join(root, request.slice(2));
      for (const candidate of [`${resolved}.ts`, `${resolved}.js`, resolved]) {
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
          return candidate.endsWith(".ts")
            ? loadTypeScriptModule(candidate)
            : nativeRequire(candidate);
        }
      }
    }
    if (!request.startsWith(".")) return nativeRequire(request);
    const resolved = path.resolve(path.dirname(absolutePath), request);
    for (const candidate of [`${resolved}.ts`, `${resolved}.js`, resolved]) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        return candidate.endsWith(".ts")
          ? loadTypeScriptModule(candidate)
          : nativeRequire(candidate);
      }
    }
    throw new Error(`Cannot resolve ${request} from ${absolutePath}`);
  };

  const context = vm.createContext({
    URL,
    console,
    exports: compiledModule.exports,
    module: compiledModule,
    require: localRequire,
  });
  vm.runInContext(compiled, context, { filename: absolutePath });
  return compiledModule.exports;
}

const { resolveRequestContext } = loadTypeScriptModule(
  path.join(root, "lib", "lead-intents", "resolve-request-context.ts"),
);

const navigation = read("components/FloxNavigation.tsx");
const footer = read("components/Footer.tsx");
const contact = read("components/ContactQueryPersonalization.tsx");
const contactPage = read("app/kontakt/page.tsx");
const form = read("components/ProfessionalRequestForm.tsx");
const notFound = read("app/not-found.tsx");
const leadIntents = read("lib/lead-intents.ts");
const resolver = read("lib/lead-intents/resolve-request-context.ts");
const locationPolicy = read("lib/lead-intents/request-location-policy.ts");
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
  assert.match(locationPolicy, /key: "bueroreinigung", service: "bueroreinigung", label: "Büroreinigung"/);
  assert.match(locationPolicy, /duesseldorf: buildConfirmedOptions\("duesseldorf"\)/);
});

test("8. Praxisreinigung ist Düsseldorf korrekt zugeordnet", () => {
  assert.match(locationPolicy, /key: "praxisreinigung", service: "praxisreinigung"/);
});

test("9. Umzug ist Regensburg korrekt zugeordnet", () => {
  assert.match(locationPolicy, /key: "umzug", service: "umzug"/);
  assert.match(locationPolicy, /regensburg: buildConfirmedOptions\("regensburg"\)/);
});

test("9a. Priorität p1 wird im Regensburg-Kontext erhalten", () => {
  const context = resolveRequestContext({
    source: "seo",
    location: "regensburg",
    service: "umzug",
    intent: "umzug-anfrage",
    priority: "p1",
  });
  assert.equal(context.valid, true);
  assert.equal(context.location, "regensburg");
  assert.equal(context.serviceKey, "umzug");
  assert.equal(context.priority, "p1");
  assert.equal(context.leadIntent.priority, "p1");
});

test("10. Entrümpelung ist Regensburg korrekt zugeordnet", () => {
  assert.match(locationPolicy, /key: "entruempelung", service: "entruempelung"/);
});

test("11. Ungültige Kombinationen fallen neutral zurück", () => {
  assert.match(resolver, /!option \|\| !isRequestServiceAllowedAtLocation\(location, option\)/);
  assert.match(resolver, /return neutralContext\(input, location\)/);
  assert.match(locationPolicy, /registry\?\.supportedCities\.includes\(location\)/);
});

test("12. Ein neuer globaler Einstieg verwirft alten Formularzustand", () => {
  assert.match(contact, /floxant:neutral-request-entry/);
  assert.match(contact, /static-contact-default.*entryReset/);
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
  assert.match(form, /response\.status !== 201[\s\S]*result\.ok !== true/);
});

test("19. Düsseldorf und Regensburg werden nicht vermischt", () => {
  assert.match(resolver, /const options = requestServiceOptionsByLocation\[location\]/);
  assert.match(resolver, /resolveAllowedRequestService\(location, rawServiceKey\)/);
  assert.match(locationPolicy, /confirmedServicePolicy/);
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

console.log(`Global request routing tests: PASS (${cases.length} checks)`);
for (const name of cases) console.log(`PASS ${name}`);
