import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const root = process.cwd();
const nativeRequire = createRequire(import.meta.url);
const moduleCache = new Map();
const sourceRoots = ["app", "components", "lib"];
const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx"]);
const dynamicCtaExceptions = new Map([
  [
    "components/ContactQueryPersonalization.tsx",
    "Validated legacy-query redirect; it is not a rendered CTA.",
  ],
  [
    "lib/services/service-registry.ts",
    "Registry generator is evaluated below for every public CTA.",
  ],
  [
    "lib/content/faq-registry.ts",
    "FAQ seed URLs are normalized by buildFaqPair and evaluated below.",
  ],
  [
    "lib/lead-intents/resolve-request-context.ts",
    "Request CTA builders are evaluated below for every active registry combination.",
  ],
  [
    "lib/regional-route-policy.ts",
    "Every regional route policy CTA is evaluated below.",
  ],
]);

function resolveProjectModule(specifier, parentFile) {
  if (!specifier.startsWith("@/") && !specifier.startsWith(".")) return "";
  const base = specifier.startsWith("@/")
    ? path.join(root, specifier.slice(2))
    : path.resolve(path.dirname(parentFile), specifier);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    path.join(base, "index.ts"),
    path.join(base, "index.js"),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()) || "";
}

function loadProjectModule(file) {
  const absolute = path.resolve(root, file);
  if (moduleCache.has(absolute)) return moduleCache.get(absolute).exports;

  const loadedModule = { exports: {} };
  moduleCache.set(absolute, loadedModule);
  const source = fs.readFileSync(absolute, "utf8");
  const compiled = ts.transpileModule(source, {
    fileName: absolute,
    compilerOptions: {
      allowJs: true,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const localRequire = (specifier) => {
    const resolved = resolveProjectModule(specifier, absolute);
    return resolved ? loadProjectModule(resolved) : nativeRequire(specifier);
  };
  const execute = new Function("require", "module", "exports", "__filename", "__dirname", compiled);
  execute(localRequire, loadedModule, loadedModule.exports, absolute, path.dirname(absolute));
  return loadedModule.exports;
}

const { resolveRequestContext, buildRequestHref, buildGlobalRequestHref } = loadProjectModule("lib/lead-intents/resolve-request-context.ts");

function normalizeFile(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function validateContactHref(href, label) {
  assert.equal(typeof href, "string", `${label}: CTA is not a string`);
  assert.ok(href.startsWith("/kontakt?"), `${label}: expected /kontakt query, got ${href}`);
  const url = new URL(href, "https://www.floxant.de");
  const service = url.searchParams.get("service") || "";
  const location = url.searchParams.get("location") || url.searchParams.get("city") || "";
  const mode = url.searchParams.get("mode") || "";
  for (const forbiddenKey of ["name", "email", "phone", "address", "message", "scope"]) {
    assert.equal(
      url.searchParams.has(forbiddenKey),
      false,
      `${label}: CTA must not place customer input in ${forbiddenKey} (${href})`,
    );
  }

  if (service) {
    assert.match(
      location,
      /^(?:duesseldorf|regensburg)$/,
      `${label}: service CTA requires city/location=duesseldorf|regensburg (${href})`,
    );
    const context = resolveRequestContext(Object.fromEntries(url.searchParams));
    assert.equal(context.valid, true, `${label}: resolveRequestContext rejected ${href}`);
    assert.equal(context.neutral, false, `${label}: service CTA became neutral (${href})`);
    assert.equal(
      context.serviceKey,
      service,
      `${label}: requested service must be the resolved active registry ID (${href})`,
    );
    assert.equal(context.location, location, `${label}: resolved location changed (${href})`);
    return;
  }

  if (mode === "neutral") {
    assert.equal(location, "", `${label}: neutral CTA must not preselect a location (${href})`);
    assert.equal(url.searchParams.has("service"), false, `${label}: neutral CTA must not contain service`);
    const context = resolveRequestContext(Object.fromEntries(url.searchParams));
    assert.equal(context.neutral, true, `${label}: neutral URL did not resolve neutrally (${href})`);
    assert.equal(context.location, "", `${label}: neutral URL resolved a location (${href})`);
    assert.equal(context.serviceKey, "", `${label}: neutral URL resolved a service (${href})`);
    return;
  }

  assert.match(
    location,
    /^(?:duesseldorf|regensburg)$/,
    `${label}: global/uncertain CTA must use mode=neutral (${href})`,
  );
  const context = resolveRequestContext(Object.fromEntries(url.searchParams));
  assert.equal(context.neutral, true, `${label}: location-only CTA must remain neutral (${href})`);
  assert.equal(context.location, location, `${label}: location-only CTA changed location (${href})`);
}

function isCtaProperty(node) {
  let current = node.parent;
  if (ts.isJsxExpression(current)) current = current.parent;
  if (ts.isJsxAttribute(current)) {
    return /^(?:href|ctaHref|bookingHref|data-destination)$/.test(current.name.getText());
  }
  if (ts.isPropertyAssignment(current)) {
    const name = current.name.getText().replace(/["']/g, "");
    return /^(?:href|target|ctaHref|bookingHref|primaryCTA|relatedCTA)$/.test(name);
  }
  if (ts.isVariableDeclaration(current)) {
    return /href$/i.test(current.name.getText());
  }
  return false;
}

function isPlainContactNavigation(node) {
  let current = node.parent;
  while (current && !ts.isSourceFile(current)) {
    if (ts.isObjectLiteralExpression(current)) {
      const label = current.properties.find(
        (property) =>
          ts.isPropertyAssignment(property) &&
          property.name.getText().replace(/["']/g, "") === "label" &&
          ts.isStringLiteralLike(property.initializer),
      );
      if (label && /^(?:Kontakt|Kontaktseite)$/.test(label.initializer.text)) return true;
    }
    if (ts.isJsxElement(current)) {
      const text = current.children
        .filter(ts.isJsxText)
        .map((child) => child.text.trim())
        .filter(Boolean)
        .join(" ");
      if (/^(?:Kontakt|Kontaktseite)$/.test(text)) return true;
    }
    current = current.parent;
  }
  return false;
}

function renderTemplate(node) {
  if (ts.isStringLiteralLike(node)) return { value: node.text, dynamic: false };
  if (!ts.isTemplateExpression(node)) return null;
  let value = node.head.text;
  for (const span of node.templateSpans) value += "${policy-value}" + span.literal.text;
  return { value, dynamic: true };
}

function sourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(absolute);
    return sourceExtensions.has(path.extname(entry.name)) ? [absolute] : [];
  });
}

const scanned = [];
const dynamic = [];
const violations = [];
for (const sourceRoot of sourceRoots) {
  for (const file of sourceFiles(path.join(root, sourceRoot))) {
    const relative = normalizeFile(file);
    const source = fs.readFileSync(file, "utf8");
    const sourceFile = ts.createSourceFile(
      file,
      source,
      ts.ScriptTarget.Latest,
      true,
      [".tsx", ".jsx"].includes(path.extname(file)) ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );

    function visit(node) {
      if (ts.isStringLiteralLike(node) || ts.isTemplateExpression(node)) {
        const rendered = renderTemplate(node);
        if (
          rendered?.value.startsWith("/kontakt") &&
          relative !== "lib/content/faq-registry.ts"
        ) {
          const line = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
          const label = `${relative}:${line}`;
          if (rendered.value === "/kontakt") {
            if (isCtaProperty(node) && !isPlainContactNavigation(node)) {
              violations.push(`${label}: bare global CTA must be /kontakt?mode=neutral`);
            }
          } else if (rendered.value.startsWith("/kontakt?")) {
            if (rendered.dynamic) {
              dynamic.push({ relative, label, value: rendered.value });
            } else {
              try {
                validateContactHref(rendered.value, label);
              } catch (error) {
                violations.push(error.message);
              }
              scanned.push(label);
            }
          }
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);
  }
}

for (const candidate of dynamic) {
  if (dynamicCtaExceptions.has(candidate.relative)) continue;
  try {
    const serviceIsDynamic = /[?&]service=\$\{policy-value\}/.test(candidate.value);
    const locationIsDynamic = /[?&](?:city|location)=\$\{policy-value\}/.test(candidate.value);
    assert.equal(
      serviceIsDynamic || locationIsDynamic,
      false,
      `${candidate.label}: dynamic service/location must use a policy-tested CTA builder (${candidate.value})`,
    );
    validateContactHref(candidate.value.replaceAll("${policy-value}", "policy-value"), candidate.label);
  } catch (error) {
    violations.push(error.message);
  }
  scanned.push(candidate.label);
}

const { buildLeadHref } = loadProjectModule("lib/lead-intents.ts");
const { buildServiceContactHref } = loadProjectModule("lib/service-routing.ts");
const { servicePackages, buildServicePackageHref } = loadProjectModule("lib/service-packages.ts");
const { combinedServiceStrategies } = loadProjectModule("lib/combined-services.ts");
const { requestChecklistDefinitions, buildRequestChecklistContactHref } = loadProjectModule(
  "lib/request-checklists.ts",
);
const { serviceFitOptions, getServiceFitHref } = loadProjectModule("lib/service-fit.ts");
const { serviceInventory } = loadProjectModule("lib/service-inventory.ts");
const { serviceProducts } = loadProjectModule("lib/service-products.ts");
const { floxantLocationList, getLocationContactHref } = loadProjectModule("lib/floxant-locations.ts");
const { publicServices } = loadProjectModule("lib/services/service-registry.ts");
const { faqRegistry } = loadProjectModule("lib/content/faq-registry.ts");
const { getRegionalRoutePolicy, regensburgCleaningReviewRoutes } = loadProjectModule("lib/regional-route-policy.ts");

const generated = [];
function generatedHref(href, label) {
  try {
    validateContactHref(href, label);
  } catch (error) {
    violations.push(error.message);
  }
  generated.push(label);
}

for (const location of ["duesseldorf", "regensburg"]) {
  for (const service of ["reinigung", "ferienwohnung-reinigung", "umzug", "angebotscheck", "unknown-service"]) {
    generatedHref(buildLeadHref({ service, city: location, intent: "cta-policy" }), `buildLeadHref:${location}:${service}`);
    generatedHref(
      buildServiceContactHref({ service, city: location, intent: "cta-policy", anchor: "" }),
      `buildServiceContactHref:${location}:${service}`,
    );
  }
}
generatedHref(buildLeadHref({ service: "reinigung" }), "buildLeadHref:missing-location");
generatedHref(buildLeadHref({ service: "umzug", city: "muenchen" }), "buildLeadHref:unsupported-location");
const invalidLeadLocationHref = buildLeadHref({ service: "endreinigung", city: "duesseldorf" });
assert.equal(
  new URL(invalidLeadLocationHref, "https://www.floxant.de").searchParams.get("mode"),
  "neutral",
  "buildLeadHref must not reclassify an active registry service at an unsupported location",
);
generatedHref(invalidLeadLocationHref, "buildLeadHref:active-service-wrong-location");
const invalidRouteLocationHref = buildServiceContactHref({
  service: "endreinigung",
  city: "duesseldorf",
  anchor: "",
});
assert.equal(
  new URL(invalidRouteLocationHref, "https://www.floxant.de").searchParams.get("mode"),
  "neutral",
  "buildServiceContactHref must not reclassify an active registry service at an unsupported location",
);
generatedHref(invalidRouteLocationHref, "buildServiceContactHref:active-service-wrong-location");
generatedHref(buildServiceContactHref({ service: "sonstiges", anchor: "" }), "buildServiceContactHref:manual-review");

for (const item of servicePackages) {
  generatedHref(buildServicePackageHref(item), `service-package:${item.serviceKey}`);
}
for (const item of combinedServiceStrategies) generatedHref(item.href, `combined-service:${item.key}`);
for (const serviceKey of Object.keys(requestChecklistDefinitions)) {
  generatedHref(buildRequestChecklistContactHref(serviceKey), `request-checklist:${serviceKey}:neutral`);
  for (const city of ["duesseldorf", "regensburg"]) {
    generatedHref(
      buildRequestChecklistContactHref(serviceKey, { city }),
      `request-checklist:${serviceKey}:${city}`,
    );
  }
}
for (const item of serviceFitOptions) {
  generatedHref(getServiceFitHref(item), `service-fit:${item.optionKey}:neutral`);
  for (const city of ["duesseldorf", "regensburg"]) {
    generatedHref(getServiceFitHref(item, city), `service-fit:${item.optionKey}:${city}`);
  }
}
for (const item of serviceInventory) generatedHref(item.primaryCTA, `service-inventory:${item.serviceKey}`);
for (const item of serviceProducts) generatedHref(item.primaryCTA, `service-product:${item.serviceKey}`);
for (const location of floxantLocationList) {
  for (const service of ["reinigung", "ferienwohnung-reinigung", "umzug", "unknown-service"]) {
    generatedHref(
      getLocationContactHref(location.locationKey, service),
      `location-contact:${location.locationKey}:${service}`,
    );
  }
}
for (const service of publicServices) generatedHref(service.cta.href, `service-registry:${service.id}`);
for (const service of publicServices) {
  const context = resolveRequestContext(Object.fromEntries(new URL(service.cta.href, "https://www.floxant.de").searchParams));
  generatedHref(buildRequestHref({ location: context.location, service: context.serviceKey }), `request-builder:${service.id}`);
}
for (const source of ["global_homepage", "global_header", "global_mobile_header", "global_floating", "global_footer", "global_404"]) {
  generatedHref(buildGlobalRequestHref(source), `global-request-builder:${source}`);
  generatedHref(buildRequestHref({ source }), `request-builder:neutral:${source}`);
}
for (const input of [{}, { mode: "neutral", location: "regensburg", service: "umzug" }, { location: "muenchen", service: "umzug" }, { location: "duesseldorf", service: "umzug" }, { location: "regensburg", service: "unknown-service" }]) {
  generatedHref(buildRequestHref(input), `request-builder:fallback:${JSON.stringify(input)}`);
}
for (const route of regensburgCleaningReviewRoutes) {
  generatedHref(getRegionalRoutePolicy(route.path).targetHref, `regional-route:${route.path}`);
}
for (const faq of faqRegistry) {
  if (faq.CTA.href.startsWith("/kontakt")) generatedHref(faq.CTA.href, `faq-registry:${faq.id}`);
}

const legacyRedirectSource = fs.readFileSync(
  path.join(root, "components", "ContactQueryPersonalization.tsx"),
  "utf8",
);
assert.match(legacyRedirectSource, /const next = new URLSearchParams\(\);/);
assert.doesNotMatch(legacyRedirectSource, /const next = new URLSearchParams\(query\);/);
// Preserve only service context and non-personal CTA provenance in legacy redirects.
assert.match(legacyRedirectSource, /\["service", "intent", "source", "priority", "mode", "locale", "entryPage", "ctaComponent", "ctaPosition"\]/);
for (const piiKey of ["name", "email", "phone", "scope", "message"]) {
  assert.doesNotMatch(
    legacyRedirectSource,
    new RegExp(`next\\.set\\(["']${piiKey}["']`),
  );
}
assert.match(legacyRedirectSource, /offerConcernScopes\[key\] \|\| ""/);
assert.match(legacyRedirectSource, /initialScope=\{offerConcern\}/);

const plannerSource = fs.readFileSync(
  path.join(root, "components", "dominance", "DuesseldorfCleaningPlanner.tsx"),
  "utf8",
);
assert.doesNotMatch(plannerSource, /[?&]scope=/);
assert.match(plannerSource, /Anfrageformular öffnen/);

if (violations.length > 0) {
  console.error(`Contact CTA policy violations (${violations.length}):`);
  for (const violation of violations) console.error(`- ${violation}`);
}
assert.equal(violations.length, 0, "Contact CTA policy violations remain");

console.log(
  `Contact CTA policy tests: PASS (${scanned.length} source URLs, ${generated.length} generated URLs)`,
);
