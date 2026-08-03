const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const ts = require("typescript");

const root = process.cwd();
const policyPath = path.join(root, "lib/booking/request-service-policy.js");
const registryPath = path.join(root, "lib/services/service-registry.ts");
const resolverPath = path.join(root, "lib/lead-intents/resolve-request-context.ts");
const growthPath = path.join(root, "lib/growth-service-pages.ts");
const routingPath = path.join(root, "lib/service-routing.ts");
const manualRegistryIds = ["solarreinigung", "pv-sichtklar-service"];
const publicSolarTokens = ["solarreinigung", "pv-anlagen-reinigung", "solar-panel-cleaning"];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function resolveProjectAlias(request) {
  const base = path.join(root, request.slice(2));
  return [base, `${base}.ts`, `${base}.tsx`, `${base}.js`, path.join(base, "index.ts")]
    .find((candidate) => fs.existsSync(candidate)) || base;
}

function compileProjectModule(module, filename) {
  const result = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      allowJs: true,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filename,
    reportDiagnostics: true,
  });
  const errors = (result.diagnostics || []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  assert.deepEqual(
    errors.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")),
    [],
    `Syntaxfehler in ${path.relative(root, filename)}`,
  );
  module._compile(result.outputText, filename);
}

const originalResolveFilename = Module._resolveFilename;
const originalJsLoader = Module._extensions[".js"];
Module._resolveFilename = function resolveFilename(request, parent, isMain, options) {
  return originalResolveFilename.call(
    this,
    request.startsWith("@/") ? resolveProjectAlias(request) : request,
    parent,
    isMain,
    options,
  );
};
Module._extensions[".ts"] = compileProjectModule;
Module._extensions[".tsx"] = compileProjectModule;
Module._extensions[".js"] = function loadJavaScript(module, filename) {
  if (path.resolve(filename) === path.resolve(policyPath)) return compileProjectModule(module, filename);
  return originalJsLoader(module, filename);
};

const {
  REQUEST_SERVICE_POLICY,
  getRequestService,
  isAllowedRequestCombination,
} = require(policyPath);
const { serviceRegistry } = require(registryPath);
const { resolveRequestContext } = require(resolverPath);
const { getGrowthServicePage } = require(growthPath);
const { buildServiceContactHref, resolveServiceRoute } = require(routingPath);

const results = [];
function check(id, label, run, details = "") {
  try {
    run();
    results.push({ status: "PASS", id, label, details });
  } catch (error) {
    results.push({ status: "FAIL", id, label, details: error.message });
  }
}

function assertNeutralHref(href, label) {
  const url = new URL(href, "https://www.floxant.de");
  assert.equal(url.pathname, "/kontakt", `${label}: CTA führt nicht zur zentralen Kontaktseite`);
  assert.equal(url.searchParams.get("mode"), "neutral", `${label}: mode=neutral fehlt`);
  assert.equal(url.searchParams.has("service"), false, `${label}: manuell zu prüfende Leistung wird vorausgewählt`);
  assert.equal(url.searchParams.has("city"), false, `${label}: Standort wird trotz manueller Prüfung vorausgewählt`);
  const context = resolveRequestContext(Object.fromEntries(url.searchParams));
  assert.equal(context.neutral, true, `${label}: Resolver fällt nicht neutral`);
  assert.equal(context.serviceKey, "", `${label}: Resolver setzt eine Leistung`);
  assert.equal(context.location, "", `${label}: Resolver setzt einen Standort`);
}

function assertSubmissionContract() {
  const contact = read("components/ContactQueryPersonalization.tsx");
  const form = read("components/ProfessionalRequestForm.tsx");
  const client = read("lib/booking-submission-client.ts");
  assert.match(contact, /<ProfessionalRequestForm/);
  assert.match(form, /appendBookingPayloadToFormData\(new FormData\(\), requestFields\)/);
  assert.match(form, /bookingFetch\("\/api\/bookings"/);
  assert.doesNotMatch(form, /fetch\("\/api\/bookings"/);
  assert.match(client, /response\.status === 201/);
  assert.match(client, /payload\.ok === true/);
  assert.match(client, /typeof payload\.requestId === "string"/);
  assert.match(client, /typeof payload\.bookingId === "string"/);
  assert.match(client, /const requestBodyKeys = new WeakMap/);
}

const registryById = new Map(serviceRegistry.map((entry) => [entry.id, entry]));

check(
  "registry:manual-review",
  "Solar-/PV-Registry-Einträge bleiben MANUAL_REVIEW und nicht öffentlich auswählbar",
  () => {
    for (const id of manualRegistryIds) {
      const service = registryById.get(id);
      assert.ok(service, `${id}: Registry-Eintrag fehlt`);
      assert.equal(service.status, "MANUAL_REVIEW", id);
      assert.equal(service.publicVisible, false, id);
      assert.deepEqual(service.regions, [], `${id}: unbelegte Region eingetragen`);
      assertNeutralHref(service.cta.href, `${id} Registry-CTA`);
    }
  },
);

check(
  "policy:excluded",
  "Solar-/PV-Begriffe werden nicht als aktive REQUEST_SERVICE_POLICY-Kombination zugelassen",
  () => {
    for (const token of publicSolarTokens) {
      assert.equal(REQUEST_SERVICE_POLICY.some((entry) => entry.id === token), false, token);
      for (const location of ["duesseldorf", "regensburg"]) {
        assert.equal(isAllowedRequestCombination(location, token), false, `${location}/${token}`);
        assert.equal(getRequestService(location, token), null, `${location}/${token}: still umklassifiziert`);
      }
    }
  },
);

check(
  "resolver:neutral-fallback",
  "Direkte Solar-/PV-Vorauswahlen fallen in der zentralen Kontaktstrecke neutral",
  () => {
    for (const token of publicSolarTokens) {
      for (const location of ["duesseldorf", "regensburg"]) {
        const context = resolveRequestContext({ city: location, service: token, source: "seo" });
        assert.equal(context.valid, false, `${location}/${token}: unerwartet gültig`);
        assert.equal(context.neutral, true, `${location}/${token}: nicht neutral`);
        assert.equal(context.serviceKey, "", `${location}/${token}: Leistung gesetzt`);
      }
    }
  },
);

check(
  "cta:growth-pages-neutral",
  "Alle Solar-/PV-Landingpages verwenden den explizit neutralen zentralen Kontakt-CTA",
  () => {
    for (const slug of ["solarreinigung", "pv-anlagen-reinigung", "regensburg-solarreinigung"]) {
      const config = getGrowthServicePage(slug);
      assert.ok(config, `${slug}: Seitenkonfiguration fehlt`);
      assertNeutralHref(config.bookingHref, `${slug} bookingHref`);
    }
    const source = read("components/duesseldorf/DuesseldorfCleaningServicePage.tsx");
    assert.match(source, /const solarContact\s*=\s*[\r\n\s]*["']\/kontakt\?mode=neutral&source=seo["']/);
  },
);

check(
  "cta:no-active-solar-service",
  "Solar-/PV-Seiten setzen keine manuell zu prüfende Service-ID im Kontakt-CTA",
  () => {
    const source = [
      read("lib/growth-service-pages.ts"),
      read("components/GrowthServiceLandingPage.tsx"),
      read("components/duesseldorf/DuesseldorfCleaningServicePage.tsx"),
    ].join("\n");
    assert.doesNotMatch(source, /\/kontakt\?[^"'\s]*service=(?:solarreinigung|pv-anlagen-reinigung)/);
  },
);

check(
  "forms:no-public-solar-direct-submit",
  "Öffentliche Direktformulare bieten Solar/PV nicht als aktiven Submit-Service an",
  () => {
    const leadIntents = read("lib/lead-intents.ts");
    const seoForm = read("components/SeoLeadForm.tsx");
    const budgetForm = read("components/BudgetContactForm.tsx");
    assert.doesNotMatch(leadIntents, /\{\s*value:\s*["'](?:solarreinigung|pv-anlagen-reinigung)["']\s*,\s*label:/);
    assert.doesNotMatch(budgetForm, /<option\s+value=["'](?:solarreinigung|pv-anlagen-reinigung)["']/);
    assert.doesNotMatch(seoForm, /<option[^>]+value=["'](?:solarreinigung|pv-anlagen-reinigung)["']/);
    assert.match(leadIntents, /normalized === "solarreinigung" \|\| normalized === "pv-anlagen-reinigung"\) return "sonstiges"/);
    assert.doesNotMatch(leadIntents, /normalized === "solarreinigung"[^\n]+return "reinigung"/);
  },
);

check(
  "cta:all-active-solar-paths-neutral",
  "Aktive Solar-/PV-Chooser, Wizard und Brücken bleiben neutral oder rein informativ",
  () => {
    for (const location of ["duesseldorf", "regensburg"]) {
      const href = buildServiceContactHref({ service: "solarreinigung", city: location, source: "health" });
      assertNeutralHref(href, `${location} Solar-Routing`);
      assert.equal(resolveServiceRoute({ service: "solarreinigung", city: location }).manualReview, true);
    }
    const wizard = read("components/SmartBookingWizard.tsx");
    const chooser = read("components/ContactPathChooser.tsx");
    const regensburg = read("app/reinigung-regensburg/page.tsx");
    const objectBrief = read("components/FloxantObjectBriefBuilder.tsx");
    const services = read("lib/floxant-services.ts");
    const growth = read("components/GrowthServiceLandingPage.tsx");
    const overview = read("app/leistungen/page.tsx");
    assert.doesNotMatch(wizard, /service=reinigung[^"'\s]*(?:addon=solarreinigung|solar|pv)/i);
    assert.match(wizard, /booking_wizard_solar_pv/);
    assert.match(chooser, /serviceKey:\s*["']solarreinigung["']/);
    assert.doesNotMatch(regensburg, /serviceLabel=["'][^"']*(?:Solar|PV)[^"']*["'][\s\S]{0,300}?(?:primaryHref|photoHref)=["']\/buchung\?service=reinigung/i);
    assert.doesNotMatch(objectBrief, /["']Solar- \/ PV-Reinigung["']:\s*["']\/regensburg\/reinigung["']/);
    assert.equal((services.match(/id:\s*["']regensburg-solarreinigung["']/g) || []).length, 1);
    assert.doesNotMatch(growth, /solarRequest:\s*href\(["']reinigung["']/);
    assert.doesNotMatch(growth, /pvRequest:\s*href\(["']reinigung["']/);
    assert.match(overview, /title:\s*["']Solar- und PV-Anlagen["'][\s\S]{0,260}?href:\s*["']\/solarreinigung["']/);
  },
);

check(
  "contact:professional-submission-contract",
  "Zentrale Kontaktstrecke nutzt kanonische FormData und bookingFetch mit striktem 201-Vertrag",
  assertSubmissionContract,
);

check(
  "package:script",
  "npm-Skript solar-pv:health ist registriert",
  () => assert.equal(require(path.join(root, "package.json")).scripts["solar-pv:health"], "node scripts/solar-pv-health.cjs"),
);

const totals = {
  pass: results.filter((result) => result.status === "PASS").length,
  fail: results.filter((result) => result.status === "FAIL").length,
};
const overallStatus = totals.fail ? "FAIL" : "PASS";
const generatedAt = new Date().toISOString();
const escapeCell = (value) => String(value || "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
const markdown = [
  "# Solar/PV Health Report",
  "",
  `Generated: ${generatedAt}`,
  "",
  `Overall status: **${overallStatus}**`,
  "",
  "Availability contract: **MANUAL_REVIEW → neutral contact flow**",
  "",
  "| Status | ID | Check | Details |",
  "| --- | --- | --- | --- |",
  ...results.map((result) => `| ${result.status} | ${escapeCell(result.id)} | ${escapeCell(result.label)} | ${escapeCell(result.details)} |`),
  "",
].join("\n");
const report = {
  generatedAt,
  overallStatus,
  totals,
  manualRegistryIds,
  publicSolarTokens,
  expectedFallback: "/kontakt?mode=neutral&source=seo",
  results,
};
fs.writeFileSync(path.join(root, "SOLAR_PV_HEALTH_REPORT.md"), markdown);
fs.writeFileSync(path.join(root, "solar-pv-health-report.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(`Solar/PV health: ${overallStatus} (${totals.pass} pass, ${totals.fail} fail)`);
console.log("Wrote SOLAR_PV_HEALTH_REPORT.md and solar-pv-health-report.json");
if (totals.fail) process.exitCode = 1;
