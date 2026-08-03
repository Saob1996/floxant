const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const ts = require("typescript");

const root = process.cwd();
const policyPath = path.join(root, "lib/booking/request-service-policy.js");
const registryPath = path.join(root, "lib/services/service-registry.ts");
const resolverPath = path.join(root, "lib/lead-intents/resolve-request-context.ts");
const canonicalServiceId = "treppenhausreinigung";
const aliases = [
  "hausverwaltung-reinigung",
  "property-cleaning",
  "property-management-cleaning",
  "staircase-cleaning",
];

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

const results = [];
function check(id, label, run, details = "") {
  try {
    run();
    results.push({ status: "PASS", id, label, details });
  } catch (error) {
    results.push({ status: "FAIL", id, label, details: error.message });
  }
}

function contextFor(href) {
  const url = new URL(href, "https://www.floxant.de");
  return { url, context: resolveRequestContext(Object.fromEntries(url.searchParams)) };
}

function assertContactHref(href, label) {
  const { url, context } = contextFor(href);
  if (url.searchParams.get("mode") === "neutral") {
    assert.equal(context.neutral, true, `${label}: neutraler CTA wurde vorausgewählt`);
    assert.equal(context.serviceKey, "", `${label}: neutraler CTA enthält eine Leistung`);
    return;
  }
  const service = url.searchParams.get("service");
  const location = url.searchParams.get("city") || url.searchParams.get("location");
  assert.ok(service, `${label}: service fehlt`);
  assert.match(location || "", /^(?:duesseldorf|regensburg)$/, `${label}: Standort fehlt`);
  assert.equal(context.valid, true, `${label}: Kontaktkontext ist ungültig`);
  assert.equal(context.neutral, false, `${label}: aktiver CTA wurde neutral`);
  assert.equal(context.serviceKey, service, `${label}: CTA verwendet eine Alias-ID statt des aktiven Ziels`);
  assert.ok(context.headline.includes("anfragen"), `${label}: benannte Zielüberschrift fehlt`);
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
  assert.match(client, /typeof payload\.requestId === "string"/);
  assert.match(client, /typeof payload\.bookingId === "string"/);
  assert.match(client, /const requestBodyKeys = new WeakMap/);
}

const registryTarget = serviceRegistry.find((entry) => entry.id === canonicalServiceId);
const policyTarget = REQUEST_SERVICE_POLICY.find((entry) => entry.id === canonicalServiceId);

check(
  "registry:active-named-target",
  "Hausverwaltung-Anfragen haben mit Treppenhausreinigung ein aktives benanntes Registry-Ziel",
  () => {
    assert.ok(registryTarget, "Registry-Ziel fehlt");
    assert.equal(registryTarget.publicVisible, true);
    assert.equal(registryTarget.status, "ACTIVE_PUBLIC");
    assert.equal(registryTarget.germanName, "Treppenhausreinigung");
    assert.ok(policyTarget, "Anfrage-Policy-Ziel fehlt");
    assert.equal(policyTarget.name, registryTarget.germanName);
  },
);

check(
  "policy:hausverwaltung-aliases",
  "Hausverwaltung- und englische Property-Aliase lösen an beiden Standorten auf das aktive Ziel auf",
  () => {
    for (const location of ["duesseldorf", "regensburg"]) {
      assert.equal(isAllowedRequestCombination(location, canonicalServiceId), true, location);
      for (const alias of aliases) {
        assert.equal(getRequestService(location, alias)?.id, canonicalServiceId, `${location}/${alias}`);
        const context = resolveRequestContext({ city: location, service: alias, source: "seo" });
        assert.equal(context.valid, true, `${location}/${alias}: ungültig`);
        assert.equal(context.neutral, false, `${location}/${alias}: neutral`);
        assert.equal(context.serviceKey, canonicalServiceId, `${location}/${alias}: falsches Ziel`);
        assert.ok(context.headline.includes("Treppenhausreinigung"), `${location}/${alias}: Zielname fehlt`);
      }
    }
  },
  `${aliases.length} Aliase`,
);

check(
  "cta:canonical-property-cleaning",
  "Gerenderte Hausverwaltung-/Objektreinigungs-CTAs verwenden aktive kanonische IDs oder fallen neutral",
  () => {
    const files = [
      "components/duesseldorf/DuesseldorfCleaningServicePage.tsx",
      "app/angebot-guenstiger-pruefen/page.tsx",
      "app/angebotscheck/page.tsx",
      "app/anbieter-vergleichen/page.tsx",
    ];
    let checked = 0;
    for (const file of files) {
      const source = read(file);
      assert.doesNotMatch(source, /[?&]service=hausverwaltung-reinigung(?:[&#"'])/, `${file}: historische Alias-ID im CTA`);
      for (const match of source.matchAll(/["'](\/kontakt\?[^"']+)["']/g)) {
        const href = match[1];
        if (/hausverwaltung|treppenhaus|unterhalt|objekt|gebaeude|gewerbe/.test(href)) {
          assertContactHref(href, `${file}:${checked + 1}`);
          checked += 1;
        }
      }
    }
    assert.ok(checked >= 5, "zu wenige Hausverwaltung-/Objektreinigungs-CTAs gefunden");
  },
);

check(
  "contact:professional-submission-contract",
  "Zentrale Kontaktstrecke nutzt kanonische FormData und bookingFetch mit striktem 201-Vertrag",
  assertSubmissionContract,
);

check(
  "package:script",
  "npm-Skript hausverwaltung-cleaning:health ist registriert",
  () => assert.equal(require(path.join(root, "package.json")).scripts["hausverwaltung-cleaning:health"], "node scripts/hausverwaltung-cleaning-health.cjs"),
);

const totals = {
  pass: results.filter((result) => result.status === "PASS").length,
  fail: results.filter((result) => result.status === "FAIL").length,
};
const overallStatus = totals.fail ? "FAIL" : "PASS";
const generatedAt = new Date().toISOString();
const escapeCell = (value) => String(value || "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
const markdown = [
  "# Hausverwaltung Cleaning Health Report",
  "",
  `Generated: ${generatedAt}`,
  "",
  `Overall status: **${overallStatus}**`,
  "",
  `Canonical request target: **${canonicalServiceId} (${policyTarget?.name || "fehlt"})**`,
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
  aliases,
  canonicalServiceId,
  canonicalServiceName: policyTarget?.name || "",
  results,
};
fs.writeFileSync(path.join(root, "HAUSVERWALTUNG_CLEANING_HEALTH_REPORT.md"), markdown);
fs.writeFileSync(path.join(root, "hausverwaltung-cleaning-health-report.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(`Hausverwaltung cleaning health: ${overallStatus} (${totals.pass} pass, ${totals.fail} fail)`);
console.log("Wrote HAUSVERWALTUNG_CLEANING_HEALTH_REPORT.md and hausverwaltung-cleaning-health-report.json");
if (totals.fail) process.exitCode = 1;
