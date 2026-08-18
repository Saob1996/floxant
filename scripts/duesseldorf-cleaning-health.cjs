const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const ts = require("typescript");

const root = process.cwd();
const policyPath = path.join(root, "lib/booking/request-service-policy.js");
const registryPath = path.join(root, "lib/services/service-registry.ts");
const leadIntentsPath = path.join(root, "lib/lead-intents.ts");
const resolverPath = path.join(root, "lib/lead-intents/resolve-request-context.ts");

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
  getRequestServicesForLocation,
  isAllowedRequestCombination,
} = require(policyPath);
const { serviceRegistry } = require(registryPath);
const { buildLeadHref } = require(leadIntentsPath);
const { resolveRequestContext } = require(resolverPath);

const results = [];
function check(id, label, run, details = "") {
  try {
    run();
    results.push({ status: "PASS", id, label, details });
  } catch (error) {
    results.push({ status: "FAIL", id, label, details: error.message });
  }
}

function sortedIds(entries) {
  return entries.map((entry) => entry.id).sort((a, b) => a.localeCompare(b, "de"));
}

function contextFor(href) {
  const url = new URL(href, "https://www.floxant.de");
  return { url, context: resolveRequestContext(Object.fromEntries(url.searchParams)) };
}

function assertValidServiceHref(href, label, expectedLocation = "") {
  const { url, context } = contextFor(href);
  const service = url.searchParams.get("service");
  const location = url.searchParams.get("city") || url.searchParams.get("location");
  if (url.searchParams.get("mode") === "neutral") {
    assert.equal(context.neutral, true, `${label}: neutraler CTA wurde vorausgewählt`);
    assert.equal(context.serviceKey, "", `${label}: neutraler CTA enthält eine Leistung`);
    return;
  }
  assert.ok(service, `${label}: service fehlt`);
  assert.match(location || "", /^(?:duesseldorf|regensburg)$/, `${label}: falscher oder fehlender Standort`);
  if (expectedLocation) assert.equal(location, expectedLocation, `${label}: falscher Standort`);
  assert.equal(context.valid, true, `${label}: CTA fällt nicht auf einen gültigen Kontext`);
  assert.equal(context.neutral, false, `${label}: aktiver CTA wurde neutral`);
  assert.equal(context.serviceKey, service, `${label}: Leistung wurde still umklassifiziert`);
  assert.ok(context.headline.includes("anfragen"), `${label}: benannte Zielüberschrift fehlt`);
}

function assertSubmissionContract() {
  const contact = read("components/ContactQueryPersonalization.tsx");
  const form = read("components/ProfessionalRequestForm.tsx");
  const client = read("lib/booking-submission-client.ts");
  assert.match(contact, /import \{ ProfessionalRequestForm \}/);
  assert.match(contact, /<ProfessionalRequestForm/);
  assert.match(form, /import \{ bookingFetch, bookingFieldErrors \}/);
  assert.match(form, /appendBookingPayloadToFormData\(new FormData\(\), requestFields\)/);
  assert.match(form, /bookingFetch\("\/api\/bookings"/);
  assert.doesNotMatch(form, /fetch\("\/api\/bookings"/);
  assert.match(client, /response\.status === 201/);
  assert.match(client, /typeof payload\.requestId === "string"/);
  assert.match(client, /typeof payload\.bookingId === "string"/);
  assert.match(client, /const inFlightRequests = new Map/);
  assert.match(client, /const requestBodyKeys = new WeakMap/);
}

const activeRegistry = serviceRegistry.filter(
  (entry) => entry.publicVisible && entry.category === "cleaning" && entry.regions.includes("Düsseldorf"),
);
const activePolicy = getRequestServicesForLocation("duesseldorf").filter(
  (entry) => entry.category === "cleaning",
);

check(
  "policy:active-cleaning-projection",
  "Aktive Düsseldorfer Reinigungsleistungen stimmen zwischen Registry und Anfrage-Policy überein",
  () => assert.deepEqual(sortedIds(activePolicy), sortedIds(activeRegistry)),
  `${activePolicy.length} aktive Kombinationen`,
);

check(
  "policy:active-combinations",
  "Jede aktive Düsseldorfer Kombination löst in der zentralen Kontaktstrecke benannt auf",
  () => {
    for (const service of activeRegistry) {
      assert.equal(isAllowedRequestCombination("duesseldorf", service.id), true, service.id);
      const context = resolveRequestContext({ city: "duesseldorf", service: service.id, source: "seo" });
      assert.equal(context.valid, true, service.id);
      assert.equal(context.serviceKey, service.id, service.id);
      assert.ok(context.headline.includes(service.germanName), `${service.id}: Name fehlt in der Überschrift`);
    }
  },
);

check(
  "cta:registry",
  "Registry-CTAs der aktiven Düsseldorfer Reinigungsleistungen sind gültig und unverfälscht",
  () => activeRegistry.forEach((service) => {
    assertValidServiceHref(service.cta.href, service.id);
    const { url } = contextFor(service.cta.href);
    const location = url.searchParams.get("city") || url.searchParams.get("location");
    const region = location === "duesseldorf" ? "Düsseldorf" : "Regensburg";
    assert.ok(service.regions.includes(region), `${service.id}: CTA-Standort ist nicht in der Registry belegt`);
  }),
);

check(
  "cta:duesseldorf-component",
  "Konfigurierte Kontakt-CTAs des Düsseldorfer Reinigungsclusters nutzen den zentralen Builder und gültige Kontexte",
  () => {
    const source = read("components/duesseldorf/DuesseldorfCleaningServicePage.tsx");
    assert.match(source, /import \{ buildLeadHref \} from "@\/lib\/lead-intents"/);
    assert.match(source, /buildLeadHref\(\{ service, city: "duesseldorf", intent \}\)/);
    const configuredCtas = [...source.matchAll(/href:\s*requestHref\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)/g)];
    assert.equal(configuredCtas.length, 9, "nicht alle neun Reinigungsseiten haben einen konfigurierten CTA");
    configuredCtas.forEach((match, index) => {
      const href = buildLeadHref({ service: match[1], city: "duesseldorf", intent: match[2] });
      assertValidServiceHref(href, `CTA ${index + 1}`, "duesseldorf");
    });
  },
);

check(
  "contact:professional-submission-contract",
  "Kontaktseite nutzt ProfessionalRequestForm, kanonische FormData und bookingFetch mit striktem 201-Vertrag",
  assertSubmissionContract,
);

check(
  "package:script",
  "npm-Skript duesseldorf-cleaning:health ist registriert",
  () => assert.equal(require(path.join(root, "package.json")).scripts["duesseldorf-cleaning:health"], "node scripts/duesseldorf-cleaning-health.cjs"),
);

const totals = {
  pass: results.filter((result) => result.status === "PASS").length,
  fail: results.filter((result) => result.status === "FAIL").length,
};
const overallStatus = totals.fail ? "FAIL" : "PASS";
const generatedAt = new Date().toISOString();
const escapeCell = (value) => String(value || "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
const markdown = [
  "# Düsseldorf Cleaning Health Report",
  "",
  `Generated: ${generatedAt}`,
  "",
  `Overall status: **${overallStatus}**`,
  "",
  `Active policy combinations checked: **${activePolicy.length}**`,
  "",
  "| Status | ID | Check | Details |",
  "| --- | --- | --- | --- |",
  ...results.map((result) => `| ${result.status} | ${escapeCell(result.id)} | ${escapeCell(result.label)} | ${escapeCell(result.details)} |`),
  "",
].join("\n");
const report = { generatedAt, overallStatus, totals, activeServiceIds: sortedIds(activePolicy), results };
fs.writeFileSync(path.join(root, "DUESSELDORF_CLEANING_HEALTH_REPORT.md"), markdown);
fs.writeFileSync(path.join(root, "duesseldorf-cleaning-health-report.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(`Düsseldorf cleaning health: ${overallStatus} (${totals.pass} pass, ${totals.fail} fail)`);
console.log("Wrote DUESSELDORF_CLEANING_HEALTH_REPORT.md and duesseldorf-cleaning-health-report.json");
if (totals.fail) process.exitCode = 1;
