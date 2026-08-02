const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const ts = require("typescript");

const root = process.cwd();
const policyPath = path.join(root, "lib/booking/request-service-policy.js");
const registryPath = path.join(root, "lib/services/service-registry.ts");
const resolverPath = path.join(root, "lib/lead-intents/resolve-request-context.ts");
const formPath = path.join(root, "components/ProfessionalRequestForm.tsx");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function resolveProjectAlias(request) {
  const base = path.join(root, request.slice(2));
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.json`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
    path.join(base, "index.js"),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) || base;
}

function compileProjectModule(module, filename) {
  const result = ts.transpileModule(read(filename), {
    compilerOptions: {
      allowJs: true,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      target: ts.ScriptTarget.ES2020,
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
    `Syntaktischer Fehler beim Laden von ${path.relative(root, filename)}`,
  );
  module._compile(result.outputText, filename);
}

const originalResolveFilename = Module._resolveFilename;
const originalJsLoader = Module._extensions[".js"];
Module._resolveFilename = function resolveFilename(request, parent, isMain, options) {
  const resolvedRequest = request.startsWith("@/") ? resolveProjectAlias(request) : request;
  return originalResolveFilename.call(this, resolvedRequest, parent, isMain, options);
};
Module._extensions[".ts"] = compileProjectModule;
Module._extensions[".tsx"] = compileProjectModule;
Module._extensions[".js"] = function loadJavaScript(module, filename) {
  if (path.resolve(filename) === path.resolve(policyPath)) {
    compileProjectModule(module, filename);
    return;
  }
  originalJsLoader(module, filename);
};

const {
  REQUEST_FORM_PROFILES,
  REQUEST_SERVICE_POLICY,
  getRequestService,
  getRequestServicesForLocation,
  isAllowedRequestCombination,
} = require(policyPath);
const { serviceRegistry } = require(registryPath);
const {
  requestServiceOptionsByLocation,
  resolveRequestContext,
} = require(resolverPath);

const checks = [];
const failures = [];
function test(name, run) {
  try {
    run();
    checks.push(name);
  } catch (error) {
    failures.push({ name, error });
  }
}

function sorted(values) {
  return [...values].sort((left, right) => left.localeCompare(right, "de"));
}

function ids(entries) {
  return sorted(entries.map((entry) => entry.id || entry.registryServiceId));
}

const regionToLocation = {
  "Düsseldorf": "duesseldorf",
  Regensburg: "regensburg",
};
const locations = Object.values(regionToLocation);
const publicRegistryServices = serviceRegistry.filter((service) => service.publicVisible);
const projectedById = new Map(REQUEST_SERVICE_POLICY.map((service) => [service.id, service]));

test("Policy projiziert exakt alle öffentlich sichtbaren Registry-Services", () => {
  assert.equal(
    projectedById.size,
    REQUEST_SERVICE_POLICY.length,
    "Service-IDs in der Anfrage-Policy müssen eindeutig sein",
  );
  assert.deepEqual(ids(REQUEST_SERVICE_POLICY), ids(publicRegistryServices));

  for (const registryService of publicRegistryServices) {
    const projected = projectedById.get(registryService.id);
    assert.ok(projected, `${registryService.id} fehlt in der Anfrage-Policy`);
    assert.ok(projected.name.trim(), `${registryService.id}: sichtbare Bezeichnung fehlt`);
    assert.equal(projected.category, registryService.category, `${registryService.id}: Kategorie weicht ab`);
    assert.deepEqual(
      sorted(projected.locations),
      sorted(registryService.regions.map((region) => regionToLocation[region])),
      `${registryService.id}: Regionen weichen von der Registry ab`,
    );
  }
});

test("Inaktive, manuell zu prüfende und unterstützende Einträge fehlen", () => {
  const projectedIds = new Set(REQUEST_SERVICE_POLICY.map((service) => service.id));
  const excluded = serviceRegistry.filter(
    (service) =>
      !service.publicVisible ||
      service.status === "MANUAL_REVIEW" ||
      service.status === "ACTIVE_SUPPORTING",
  );
  for (const service of excluded) {
    assert.equal(
      projectedIds.has(service.id),
      false,
      `${service.id} (${service.status}) darf nicht auswählbar sein`,
    );
  }
});

test("Jede aktive Registry-Kombination ist in Policy, Optionen und Resolver auswählbar", () => {
  for (const registryService of publicRegistryServices) {
    for (const region of registryService.regions) {
      const location = regionToLocation[region];
      assert.ok(location, `Unbekannte öffentliche Registry-Region: ${region}`);
      assert.equal(isAllowedRequestCombination(location, registryService.id), true);
      assert.equal(getRequestService(location, registryService.id)?.id, registryService.id);
      assert.ok(
        requestServiceOptionsByLocation[location].some(
          (option) => option.registryServiceId === registryService.id,
        ),
        `${registryService.id} fehlt in den ${location}-Optionen`,
      );

      const context = resolveRequestContext({
        location,
        service: registryService.id,
        source: "seo",
      });
      assert.equal(context.valid, true, `${location}/${registryService.id} muss gültig sein`);
      assert.equal(context.neutral, false);
      assert.equal(context.notice, "");
      assert.equal(context.serviceKey, registryService.id);
      assert.equal(context.location, location);
    }
  }
});

test("Nicht belegte Standort-Service-Kombinationen werden nicht angeboten", () => {
  for (const service of REQUEST_SERVICE_POLICY) {
    for (const location of locations.filter((candidate) => !service.locations.includes(candidate))) {
      assert.equal(isAllowedRequestCombination(location, service.id), false);
      assert.equal(getRequestService(location, service.id), null);
      assert.equal(
        requestServiceOptionsByLocation[location].some(
          (option) => option.registryServiceId === service.id,
        ),
        false,
      );

      const context = resolveRequestContext({ location, service: service.id });
      assert.equal(context.valid, false);
      assert.equal(context.neutral, true);
      assert.equal(context.service, "");
      assert.equal(context.serviceKey, "");
      assert.match(context.notice, /Bitte wählen Sie/i);
    }
  }
});

test("Düsseldorf enthält keine Moving-Core-Services", () => {
  const duesseldorf = getRequestServicesForLocation("duesseldorf");
  assert.deepEqual(
    ids(duesseldorf.filter((service) => service.category === "moving")),
    [],
  );
  assert.deepEqual(
    ids(duesseldorf.filter((service) => service.category === "cleaning")),
    ids(
      publicRegistryServices.filter(
        (service) => service.category === "cleaning" && service.regions.includes("Düsseldorf"),
      ),
    ),
  );
});

test("Regensburg enthält Registry-aktive Reinigung, Umzug, Transport und Räumung", () => {
  const regensburg = getRequestServicesForLocation("regensburg");
  for (const category of ["cleaning", "moving", "clearance"]) {
    assert.ok(
      regensburg.some((service) => service.category === category),
      `Regensburg benötigt die Kategorie ${category}`,
    );
  }
  for (const requiredId of [
    "reinigung",
    "umzug",
    "moebeltransport",
    "klaviertransport",
    "entruempelung",
    "wohnungsaufloesung",
  ]) {
    assert.ok(projectedById.get(requiredId)?.locations.includes("regensburg"), requiredId);
  }
});

test("Möbel- und Klaviertransport verwenden getrennte Fachprofile", () => {
  assert.equal(projectedById.get("moebeltransport")?.formProfile, "furniture");
  assert.equal(projectedById.get("klaviertransport")?.formProfile, "piano");
  for (const field of [
    "startLocation",
    "destinationLocation",
    "itemDescription",
    "dimensions",
    "desiredDate",
  ]) {
    assert.ok(REQUEST_FORM_PROFILES.furniture.coreFields.includes(field), field);
  }
  for (const field of [
    "startLocation",
    "destinationLocation",
    "instrumentType",
    "dimensions",
    "desiredDate",
  ]) {
    assert.ok(REQUEST_FORM_PROFILES.piano.coreFields.includes(field), field);
  }
  for (const service of REQUEST_SERVICE_POLICY) {
    const profile = REQUEST_FORM_PROFILES[service.formProfile];
    assert.ok(profile, `${service.id}: unbekanntes Formularprofil ${service.formProfile}`);
    assert.ok(profile.coreFields.length <= 7, `${service.id}: mehr als sieben Kernfelder`);
  }
});

function assertFriendlyNeutralContext(input, label) {
  const context = resolveRequestContext(input);
  assert.equal(context.valid, false, `${label}: darf nicht gültig sein`);
  assert.equal(context.neutral, true, `${label}: muss neutral zurückfallen`);
  assert.equal(context.service, "", `${label}: Service muss gelöscht werden`);
  assert.equal(context.serviceKey, "", `${label}: Service-Key muss gelöscht werden`);
  assert.match(context.notice, /Bitte wählen Sie/i, `${label}: kundengerechter Hinweis fehlt`);
  assert.doesNotMatch(context.notice, /invalid|undefined|null|exception|stack|script/i);
}

for (const [label, input] of [
  ["falsche Standortkombination", { location: "duesseldorf", service: "umzug" }],
  ["unbekannter Service", { location: "regensburg", service: "nicht-vorhanden" }],
  ["unbekannter Standort", { location: "unbekannter-standort", service: "reinigung" }],
  ["manipulierter Standort", { location: "../regensburg", service: "umzug" }],
  ["manipulierter Service", { location: "regensburg", service: "../../umzug" }],
]) {
  test(`${label} fällt freundlich neutral zurück`, () => {
    assertFriendlyNeutralContext(input, label);
  });
}

test("Expliziter globaler Modus bleibt ohne Warnhinweis neutral", () => {
  const context = resolveRequestContext({
    mode: "neutral",
    location: "../regensburg",
    service: "../../umzug",
    source: "global_header",
  });
  assert.equal(context.valid, false);
  assert.equal(context.neutral, true);
  assert.equal(context.notice, "");
  assert.equal(context.location, "");
  assert.equal(context.service, "");
  assert.equal(context.serviceKey, "");
  assert.equal(context.sourceLabel, "global_header");
});

test("Quellen werden auf eine sichere Allowlist normalisiert", () => {
  const cases = [
    [undefined, "kontakt"],
    ["GLOBAL HEADER", "global_header"],
    ["google_ads", "google_ads"],
    ["service-finder", "service_finder"],
    ["../../admin", "direkt"],
    ["javascript:alert(1)", "direkt"],
    ["<script>seo</script>", "direkt"],
  ];
  const allowed = new Set([
    "kontakt",
    "global_header",
    "global_mobile_header",
    "global_footer",
    "global_404",
    "seo",
    "service_finder",
    "contact_selector",
    "booking",
    "buchung",
    "homepage",
    "google_ads",
    "google_maps",
    "navigation",
    "footer",
    "direct",
    "direkt",
  ]);

  for (const [source, expected] of cases) {
    const context = resolveRequestContext({ mode: "neutral", source });
    assert.equal(context.sourceLabel, expected);
    assert.ok(allowed.has(context.sourceLabel), `Quelle nicht allowlisted: ${context.sourceLabel}`);
    assert.match(context.sourceLabel, /^[a-z0-9_]+$/);
  }
});

test("Manipulierte Intent-, Pfad- und Kampagnenwerte steuern den Service nicht um", () => {
  const context = resolveRequestContext({
    location: "regensburg",
    service: "klaviertransport",
    intent: "admin-root",
    priority: "root",
    entryPage: "https://evil.example/kontakt",
    campaign: "x".repeat(200),
  });
  assert.equal(context.valid, true);
  assert.equal(context.intent, projectedById.get("klaviertransport").intent);
  assert.equal(context.entryPage, "");
  assert.equal(context.campaign.length, 120);
});

test("Das zentrale Formular deklariert exakt drei Profil-Schritte", () => {
  const formSource = read(formPath);
  const sourceFile = ts.createSourceFile(
    formPath,
    formSource,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  let requestStepValues = null;
  let progressLabels = null;

  function visit(node) {
    if (ts.isTypeAliasDeclaration(node) && node.name.text === "RequestStep") {
      assert.ok(ts.isUnionTypeNode(node.type), "RequestStep muss ein Union-Typ sein");
      requestStepValues = node.type.types.map((typeNode) => {
        assert.ok(ts.isLiteralTypeNode(typeNode), "RequestStep darf nur Literale enthalten");
        assert.ok(ts.isNumericLiteral(typeNode.literal), "RequestStep darf nur Zahlen enthalten");
        return Number(typeNode.literal.text);
      });
    }
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === "labels" &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      const values = node.initializer.elements
        .filter(ts.isStringLiteral)
        .map((element) => element.text);
      if (values.includes("Standort und Leistung")) progressLabels = values;
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);

  assert.deepEqual(requestStepValues, [1, 2, 3]);
  assert.deepEqual(progressLabels, [
    "Standort und Leistung",
    "Eckdaten",
    "Kontakt und Zusammenfassung",
  ]);
  assert.match(formSource, /Schritt \{number\}/);
  assert.match(formSource, /Schritt \$\{step\} von 3/);
  assert.doesNotMatch(formSource, /step\s*===\s*[4-9]|setStep\(\s*[4-9]\s*\)|von\s+[4-9]/);
});

test("Zentrale Policy und Formular enthalten keine Versicherungsbegriffe", () => {
  const customerFacingSources = `${read(policyPath)}\n${read(formPath)}`;
  assert.doesNotMatch(
    customerFacingSources,
    /versicher|haftpflicht|versicherungswert|allgefahren|deckungsschutz/i,
  );
});

if (failures.length > 0) {
  console.error(
    `Request service policy tests: FAIL (${failures.length} fehlgeschlagen, ${checks.length} bestanden)`,
  );
  for (const { name, error } of failures) {
    console.error(`FAIL ${name}`);
    console.error(error && error.stack ? error.stack : error);
  }
  process.exitCode = 1;
} else {
  console.log(`Request service policy tests: PASS (${checks.length} checks)`);
}
for (const check of checks) console.log(`PASS ${check}`);
