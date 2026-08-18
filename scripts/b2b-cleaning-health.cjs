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
const b2bServiceIds = [
  "bueroreinigung",
  "gewerbereinigung",
  "praxisreinigung",
  "unterhaltsreinigung",
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
  assert.equal(context.serviceKey, service, `${label}: Leistung wurde still umklassifiziert`);
  assert.ok(context.headline.includes("anfragen"), `${label}: benannte Zielüberschrift fehlt`);
}

function assertSubmissionContract() {
  const contact = read("components/ContactQueryPersonalization.tsx");
  const form = read("components/ProfessionalRequestForm.tsx");
  const client = read("lib/booking-submission-client.ts");
  assert.match(contact, /<ProfessionalRequestForm/);
  assert.match(form, /import \{ bookingFetch, bookingFieldErrors \}/);
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
  "policy:b2b-matrix",
  "Aktive B2B-Reinigungsleistungen sind für alle in der Registry belegten Standorte zulässig",
  () => {
    for (const id of b2bServiceIds) {
      const registryService = registryById.get(id);
      assert.ok(registryService, `${id}: Registry-Eintrag fehlt`);
      assert.equal(registryService.publicVisible, true, `${id}: nicht öffentlich aktiv`);
      assert.ok(REQUEST_SERVICE_POLICY.some((entry) => entry.id === id), `${id}: Anfrage-Policy fehlt`);
      for (const region of registryService.regions) {
        const location = region === "Düsseldorf" ? "duesseldorf" : "regensburg";
        assert.equal(isAllowedRequestCombination(location, id), true, `${location}/${id}`);
        const projected = getRequestService(location, id);
        assert.equal(projected?.id, id, `${location}/${id}: Policy klassifiziert um`);
        assert.ok(projected?.name, `${location}/${id}: sichtbarer Name fehlt`);
        const context = resolveRequestContext({ city: location, service: id, source: "b2b" });
        assert.equal(context.valid, true, `${location}/${id}: Kontaktkontext ungültig`);
        assert.equal(context.serviceKey, id, `${location}/${id}: Resolver klassifiziert um`);
      }
    }
  },
  `${b2bServiceIds.length} Services`,
);

check(
  "cta:registry",
  "Registry-CTAs der B2B-Reinigungsleistungen öffnen einen gültigen benannten Kontaktkontext",
  () => b2bServiceIds.forEach((id) => assertContactHref(registryById.get(id).cta.href, id)),
);

check(
  "cta:rendered-static",
  "Statische und zentral konfigurierte B2B-Kontakt-CTAs sind gültig oder bewusst neutral",
  () => {
    const files = [
      "app/bueroreinigung/page.tsx",
      "app/gewerbereinigung/page.tsx",
      "components/B2BRequestPanel.tsx",
    ];
    let checked = 0;
    for (const file of files) {
      const source = read(file);
      for (const match of source.matchAll(/["'](\/kontakt\?[^"']+)["']/g)) {
        const href = match[1];
        const service = new URL(href, "https://www.floxant.de").searchParams.get("service");
        if (!service || b2bServiceIds.includes(service) || service === "angebotscheck") {
          assertContactHref(href, `${file}:${checked + 1}`);
          checked += 1;
        }
      }
    }
    const clusterSource = read("components/duesseldorf/DuesseldorfCleaningServicePage.tsx");
    assert.match(clusterSource, /import \{ buildLeadHref \} from "@\/lib\/lead-intents"/);
    for (const match of clusterSource.matchAll(/href:\s*requestHref\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)/g)) {
      const service = match[1];
      if (!b2bServiceIds.includes(service)) continue;
      const href = buildLeadHref({ service, city: "duesseldorf", intent: match[2] });
      assertContactHref(href, `DuesseldorfCleaningServicePage:${checked + 1}`);
      checked += 1;
    }
    assert.ok(checked >= 8, "zu wenige B2B-Kontakt-CTAs gefunden");
  },
);

check(
  "cta:no-legacy-booking",
  "Primäre B2B-Landingpages verweisen nicht mehr auf die alte Buchungsstrecke",
  () => {
    const files = ["app/bueroreinigung/page.tsx", "app/gewerbereinigung/page.tsx"];
    const legacyFiles = files.filter((file) => /["']\/buchung\?/.test(read(file)));
    assert.deepEqual(legacyFiles, [], `Alte Buchungs-CTA in: ${legacyFiles.join(", ")}`);
  },
);

check(
  "contact:professional-submission-contract",
  "Zentrale Kontaktstrecke nutzt kanonische FormData und bookingFetch mit striktem 201-Vertrag",
  assertSubmissionContract,
);

check(
  "package:script",
  "npm-Skript b2b-cleaning:health ist registriert",
  () => assert.equal(require(path.join(root, "package.json")).scripts["b2b-cleaning:health"], "node scripts/b2b-cleaning-health.cjs"),
);

const totals = {
  pass: results.filter((result) => result.status === "PASS").length,
  fail: results.filter((result) => result.status === "FAIL").length,
};
const overallStatus = totals.fail ? "FAIL" : "PASS";
const generatedAt = new Date().toISOString();
const escapeCell = (value) => String(value || "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
const markdown = [
  "# B2B Cleaning Health Report",
  "",
  `Generated: ${generatedAt}`,
  "",
  `Overall status: **${overallStatus}**`,
  "",
  `B2B services checked: **${b2bServiceIds.length}**`,
  "",
  "| Status | ID | Check | Details |",
  "| --- | --- | --- | --- |",
  ...results.map((result) => `| ${result.status} | ${escapeCell(result.id)} | ${escapeCell(result.label)} | ${escapeCell(result.details)} |`),
  "",
].join("\n");
const report = { generatedAt, overallStatus, totals, serviceIds: b2bServiceIds, results };
fs.writeFileSync(path.join(root, "B2B_CLEANING_HEALTH_REPORT.md"), markdown);
fs.writeFileSync(path.join(root, "b2b-cleaning-health-report.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(`B2B cleaning health: ${overallStatus} (${totals.pass} pass, ${totals.fail} fail)`);
console.log("Wrote B2B_CLEANING_HEALTH_REPORT.md and b2b-cleaning-health-report.json");
if (totals.fail) process.exitCode = 1;
