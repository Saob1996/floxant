import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "out");
const REGISTRY_FILE = path.join(ROOT, "lib", "content", "page-intent-registry.ts");
const GENERATED_INVENTORY_FILE = path.join(ROOT, "lib", "content", "generated-page-route-inventory.ts");
const SITEMAP_FILE = path.join(OUT_DIR, "sitemap.xml");
const ARTIFACT_DIR = path.join(ROOT, "artifacts");
const OUTPUT_FILE = path.join(ARTIFACT_DIR, "page-intent-registry-audit.csv");

const REQUIRED_FIELDS = [
  "route", "locale", "location", "pageType", "primaryService", "primaryIntent", "secondaryIntent", "targetAudience",
  "canonicalRoute", "parentHub", "allowedSections", "prohibitedSections", "relatedServices", "indexable", "sitemap",
  "status", "contentOwner", "reviewDate",
];

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(absolute) : [absolute];
  });
}

function routeFromHtmlFile(file) {
  const relative = path.relative(OUT_DIR, file).replaceAll(path.sep, "/");
  if (relative === "index.html") return "/";
  if (/^google[a-z0-9_-]+\.html$/i.test(relative)) return `/${relative}`;
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"/index.html".length)}`;
  return `/${relative.replace(/\.html$/i, "")}`;
}

function normalizeRoute(value) {
  if (!value) return "";
  try {
    const pathname = new URL(value, "https://www.floxant.de").pathname;
    return pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  } catch {
    const route = String(value).split(/[?#]/)[0];
    return route === "/" ? "/" : `/${route.replace(/^\/+|\/+$/g, "")}`;
  }
}

function decodeHtml(value) {
  const named = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"' };
  return String(value ?? "")
    .replace(/&#(\d+);/g, (_, item) => String.fromCodePoint(Number(item)))
    .replace(/&#x([0-9a-f]+);/gi, (_, item) => String.fromCodePoint(Number.parseInt(item, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match);
}

function attributes(tag) {
  const result = new Map();
  for (const match of tag.matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    result.set(match[1].toLowerCase(), decodeHtml(match[2] ?? match[3] ?? match[4] ?? ""));
  }
  return result;
}

function metaRobots(html) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const data = attributes(tag);
    if ((data.get("name") ?? "").toLowerCase() === "robots") return data.get("content") ?? "";
  }
  return "";
}

function canonicalRoute(html) {
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    const data = attributes(tag);
    if ((data.get("rel") ?? "").toLowerCase().split(/\s+/).includes("canonical")) return normalizeRoute(data.get("href") ?? "");
  }
  return "";
}

function evaluateTypescriptModule(source, fileName) {
  const compiled = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    fileName,
    reportDiagnostics: true,
  });
  const diagnostics = compiled.diagnostics ?? [];
  const errors = diagnostics.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  if (errors.length) throw new Error(errors.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")).join("; "));
  const compiledModule = { exports: {} };
  const execute = new Function("exports", "module", "require", compiled.outputText);
  execute(compiledModule.exports, compiledModule, require);
  return compiledModule.exports;
}

function loadGeneratedInventory() {
  if (!fs.existsSync(GENERATED_INVENTORY_FILE)) throw new Error("generated page route inventory is missing");
  const exports = evaluateTypescriptModule(fs.readFileSync(GENERATED_INVENTORY_FILE, "utf8"), GENERATED_INVENTORY_FILE);
  const inventory = exports.generatedPageRouteInventory;
  if (!Array.isArray(inventory)) throw new Error("generatedPageRouteInventory was not exported as an array");
  return inventory;
}

function loadRegistry() {
  const generatedPageRouteInventory = loadGeneratedInventory();
  const source = fs.readFileSync(REGISTRY_FILE, "utf8").replace(
    /import\s*\{\s*generatedPageRouteInventory\s*\}\s*from\s*["']@\/lib\/content\/generated-page-route-inventory["'];?\s*/,
    `const generatedPageRouteInventory = ${JSON.stringify(generatedPageRouteInventory)};\n`,
  );
  const registryExports = evaluateTypescriptModule(source, REGISTRY_FILE);
  const contracts = registryExports.allPageIntentContracts;
  if (!Array.isArray(contracts)) throw new Error("allPageIntentContracts was not exported as an array");
  return { contracts, generatedPageRouteInventory };
}

function loadSitemap() {
  if (!fs.existsSync(SITEMAP_FILE)) throw new Error("out/sitemap.xml is missing");
  return new Set([...fs.readFileSync(SITEMAP_FILE, "utf8").matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => normalizeRoute(decodeHtml(match[1]))));
}

function loadBuiltRoutes() {
  const result = new Map();
  for (const file of walkFiles(OUT_DIR).filter((candidate) => candidate.toLowerCase().endsWith(".html"))) {
    const html = fs.readFileSync(file, "utf8");
    const route = routeFromHtmlFile(file);
    result.set(route, {
      route,
      file,
      robots: metaRobots(html),
      indexable: !/\bnoindex\b/i.test(metaRobots(html)),
      canonical: canonicalRoute(html),
    });
  }
  return result;
}

function asciiFold(value) {
  return String(value ?? "")
    .toLocaleLowerCase("de")
    .replaceAll("ä", "ae").replaceAll("ö", "oe").replaceAll("ü", "ue").replaceAll("ß", "ss")
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeIntent(value) {
  // Geography is part of a local service intent. Stripping it would turn distinct
  // location tasks into synthetic cannibalisation findings.
  return asciiFold(value);
}

function visibleMainText(file) {
  const html = fs.readFileSync(file, "utf8");
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  return decodeHtml(main
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<form\b[^>]*>[\s\S]*?<\/form>/gi, " ")
    .replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function hubExpectation(contract, contractRoutes) {
  const route = contract.route;
  if (["alias", "private", "verification"].includes(contract.status)) return null;
  if (["homepage", "location_hub", "service_hub", "faq_hub", "legal", "internal", "verification", "error"].includes(contract.pageType)) return null;
  if (contract.pageType === "ads_landing") return contract.parentHub;
  if (contract.pageType === "guide") {
    if (["/blog", "/ratgeber", "/wissen", "/en/blog"].includes(route)) return null;
    return route.startsWith("/en/blog/") ? "/en/blog" : route.startsWith("/blog/") ? "/blog" : "/ratgeber";
  }
  if (contract.pageType === "tool") return route === "/rechner" || route.startsWith("/en/") ? null : "/rechner";
  if (route === "/duesseldorf/reinigung") return contractRoutes.has("/duesseldorf") ? "/duesseldorf" : "/leistungen";
  if (route.startsWith("/duesseldorf/")) return "/duesseldorf/reinigung";
  if (route.startsWith("/regensburg/")) return "/regensburg";
  if (route.startsWith("/en/duesseldorf/") || route.startsWith("/en/regensburg/")) return "/en/services";
  if (route.startsWith("/en/")) return "/en/services";
  return "/leistungen";
}

function hubContainsRoute(hubFile, route) {
  const html = fs.readFileSync(hubFile, "utf8");
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`<a\\b[^>]*href=["'](?:https:\\/\\/www\\.floxant\\.de)?${escaped}(?:[?#][^"']*)?["']`, "i").test(html);
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

if (!fs.existsSync(OUT_DIR) || !fs.existsSync(REGISTRY_FILE)) {
  console.error("PAGE_INTENT_REGISTRY_AUDIT_ERROR required out/ or registry source is missing.");
  process.exit(1);
}

let contracts;
let generatedInventory;
let sitemap;
let builtRoutes;
try {
  ({ contracts, generatedPageRouteInventory: generatedInventory } = loadRegistry());
  sitemap = loadSitemap();
  builtRoutes = loadBuiltRoutes();
} catch (error) {
  console.error(`PAGE_INTENT_REGISTRY_AUDIT_ERROR ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}

const rows = [];
const dedupe = new Set();

function add({ route, relatedRoute = "", check, expected, actual, severity = "ERROR", details = "" }) {
  const row = { route, relatedRoute, check, expected, actual, severity, status: "FAIL", details };
  const key = Object.values(row).join("\u0000");
  if (dedupe.has(key)) return;
  dedupe.add(key);
  rows.push(row);
}

const contractsByRoute = new Map();
for (const contract of contracts) {
  if (contractsByRoute.has(contract.route)) {
    add({ route: contract.route, check: "DUPLICATE_REGISTRY_ROUTE", expected: "one record", actual: "multiple records", details: "A route may have only one InternalPageRecord." });
  }
  contractsByRoute.set(contract.route, contract);
}
const contractRoutes = new Set(contractsByRoute.keys());

const generatedByRoute = new Map();
for (const entry of generatedInventory) {
  if (generatedByRoute.has(entry.route)) {
    add({ route: entry.route, check: "DUPLICATE_GENERATED_ROUTE", expected: "one generated record", actual: "multiple records", details: "The deterministic inventory may contain each built route only once." });
  }
  generatedByRoute.set(entry.route, entry);
  if (!entry.route || !["de", "en"].includes(entry.locale) || typeof entry.indexable !== "boolean" || typeof entry.sitemap !== "boolean" || !(entry.canonicalRoute === null || typeof entry.canonicalRoute === "string")) {
    add({ route: entry.route || "(missing)", check: "INVALID_GENERATED_ROUTE", expected: "valid route/locale/indexable/sitemap/canonical metadata", actual: JSON.stringify(entry) });
  }
}

for (const contract of contracts) {
  for (const field of REQUIRED_FIELDS) {
    const value = contract[field];
    const valid = field === "parentHub"
      ? value === null || typeof value === "string"
      : ["allowedSections", "prohibitedSections", "relatedServices"].includes(field)
        ? Array.isArray(value)
        : ["indexable", "sitemap"].includes(field)
          ? typeof value === "boolean"
          : typeof value === "string" && value.trim().length > 0;
    if (!valid) add({ route: contract.route || "(missing)", check: "REQUIRED_FIELD", expected: `${field} with valid type/value`, actual: JSON.stringify(value), details: `Invalid InternalPageRecord.${field}` });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(contract.reviewDate ?? "")) {
    add({ route: contract.route, check: "REVIEW_DATE", expected: "YYYY-MM-DD", actual: contract.reviewDate ?? "", severity: "REVIEW" });
  }
}

for (const [route, built] of builtRoutes) {
  const generated = generatedByRoute.get(route);
  if (!generated) {
    add({ route, check: "BUILT_ROUTE_WITHOUT_GENERATED_INVENTORY", expected: "generated technical record", actual: "missing", details: path.relative(ROOT, built.file).replaceAll(path.sep, "/") });
  } else {
    if (generated.indexable !== built.indexable) {
      add({ route, check: "GENERATED_INDEXABILITY_MISMATCH", expected: String(built.indexable), actual: String(generated.indexable), details: `robots=${built.robots || "(empty)"}` });
    }
    const builtInSitemap = sitemap.has(route);
    if (generated.sitemap !== builtInSitemap) {
      add({ route, check: "GENERATED_SITEMAP_MISMATCH", expected: String(builtInSitemap), actual: String(generated.sitemap) });
    }
    const generatedCanonical = normalizeRoute(generated.canonicalRoute);
    if (generatedCanonical !== built.canonical) {
      add({ route, check: "GENERATED_CANONICAL_MISMATCH", expected: built.canonical || "missing", actual: generatedCanonical || "missing" });
    }
  }
  if (built.indexable && !contractsByRoute.has(route)) {
    add({ route, check: "INDEXABLE_ROUTE_WITHOUT_REGISTRY", expected: "InternalPageRecord", actual: "missing", details: path.relative(ROOT, built.file).replaceAll(path.sep, "/") });
  }
}

for (const entry of generatedInventory) {
  if (!builtRoutes.has(entry.route)) {
    add({ route: entry.route, check: "GENERATED_INVENTORY_WITHOUT_BUILT_ROUTE", expected: "built HTML route", actual: "missing" });
  }
}

for (const contract of contracts) {
  const built = builtRoutes.get(contract.route);
  const inSitemap = sitemap.has(contract.route);
  if (!built) {
    add({ route: contract.route, check: "REGISTRY_WITHOUT_BUILT_ROUTE", expected: "built HTML route", actual: "missing" });
    continue;
  }
  if (contract.indexable !== built.indexable) {
    add({ route: contract.route, check: "INDEXABILITY_MISMATCH", expected: String(contract.indexable), actual: String(built.indexable), details: `robots=${built.robots || "(empty)"}` });
  }
  if (contract.sitemap !== inSitemap) {
    add({ route: contract.route, check: "SITEMAP_MISMATCH", expected: String(contract.sitemap), actual: String(inSitemap) });
  }
  const generated = generatedByRoute.get(contract.route);
  const expectedCanonical = normalizeRoute(contract.canonicalRoute);
  const canonicalIntentionallyAbsent = generated?.canonicalRoute === null && built.canonical === "";
  if (!canonicalIntentionallyAbsent && built.canonical !== expectedCanonical) {
    add({ route: contract.route, check: "CANONICAL_MISMATCH", expected: expectedCanonical, actual: built.canonical || "missing" });
  }
  if ((contract.status === "alias" || expectedCanonical !== contract.route) && inSitemap) {
    add({ route: contract.route, relatedRoute: expectedCanonical, check: "ALIAS_IN_SITEMAP", expected: "not in sitemap", actual: "in sitemap" });
  }
  if (contract.pageType === "ads_landing" || contract.status === "ads_landing") {
    if (contract.indexable || built.indexable) add({ route: contract.route, check: "ADS_PAGE_INDEXABLE", expected: "noindex", actual: `registry=${contract.indexable};build=${built.indexable}` });
    if (inSitemap || contract.sitemap) add({ route: contract.route, check: "ADS_PAGE_IN_SITEMAP", expected: "excluded", actual: `registry=${contract.sitemap};build=${inSitemap}` });
  }
}

for (const contract of contracts) {
  const foldedRoute = asciiFold(contract.route);
  const foldedLocation = asciiFold(contract.location);
  if (foldedRoute.includes("duesseldorf") && !foldedLocation.includes("duesseldorf")) {
    add({ route: contract.route, check: "WRONG_LOCATION", expected: "Düsseldorf", actual: contract.location, severity: "REVIEW" });
  }
  if (foldedRoute.includes("regensburg") && !foldedLocation.includes("regensburg")) {
    add({ route: contract.route, check: "WRONG_LOCATION", expected: "Regensburg", actual: contract.location, severity: "REVIEW" });
  }

  const expectedHub = hubExpectation(contract, contractRoutes);
  if (expectedHub && contract.parentHub !== expectedHub) {
    add({ route: contract.route, relatedRoute: contract.parentHub ?? "", check: "WRONG_PARENT_HUB", expected: expectedHub, actual: contract.parentHub ?? "null", severity: "REVIEW" });
  }
  if (contract.parentHub === contract.route) {
    add({ route: contract.route, check: "SELF_PARENT_HUB", expected: "different parent hub", actual: contract.parentHub, severity: "REVIEW" });
  }
  if (contract.parentHub && !contractsByRoute.has(contract.parentHub)) {
    add({ route: contract.route, relatedRoute: contract.parentHub, check: "PARENT_HUB_WITHOUT_REGISTRY", expected: "registered parent hub", actual: "missing", severity: "REVIEW" });
  }
}

const intentGroups = new Map();
for (const contract of contracts.filter((item) => item.indexable && item.status === "active")) {
  const intent = normalizeIntent(contract.primaryIntent);
  if (!intent) continue;
  if (!intentGroups.has(intent)) intentGroups.set(intent, []);
  intentGroups.get(intent).push(contract);
}
for (const group of intentGroups.values()) {
  if (group.length < 2) continue;
  for (let left = 0; left < group.length; left += 1) {
    for (let right = left + 1; right < group.length; right += 1) {
      const a = group[left];
      const b = group[right];
      add({
        route: a.route,
        relatedRoute: b.route,
        check: "DUPLICATE_PRIMARY_INTENT",
        expected: "one primary task per indexable route",
        actual: a.primaryIntent,
        severity: "CANNIBALIZATION_RISK",
        details: a.canonicalRoute === b.canonicalRoute ? "Same task and canonical target." : `Same task with two canonicals: ${a.canonicalRoute}, ${b.canonicalRoute}`,
      });
    }
  }
}

for (const contract of contracts) {
  const built = builtRoutes.get(contract.route);
  if (!built || !Array.isArray(contract.prohibitedSections) || !contract.prohibitedSections.length) continue;
  const mainText = visibleMainText(built.file);
  const foldedMain = asciiFold(mainText);
  for (const prohibited of contract.prohibitedSections) {
    const folded = asciiFold(prohibited);
    if (!folded || ["interne pruefbegriffe", "fremde standorte", "nicht angebotene leistungen", "unbelegte versprechen"].includes(folded)) continue;
    if (foldedMain.includes(folded)) {
      add({ route: contract.route, check: "PROHIBITED_SECTION_RENDERED", expected: `absent: ${prohibited}`, actual: "present in main content", severity: "REVIEW" });
    }
  }
  if (/\b(?:seo|serp|gsc|search intent|payload|manual review|canonical mapping|health check|content cluster|performance budget)\b/i.test(mainText)) {
    add({ route: contract.route, check: "PROHIBITED_INTERNAL_SECTION", expected: "no internal planning language", actual: "internal term in main content", severity: "ERROR" });
  }
}

const parentHtmlCache = new Map();
for (const contract of contracts) {
  if (!contract.indexable || contract.status !== "active" || contract.pageType !== "service" || !contract.parentHub || contract.parentHub === contract.route) continue;
  const parentBuilt = builtRoutes.get(contract.parentHub);
  if (!parentBuilt) continue;
  let linked = parentHtmlCache.get(`${contract.parentHub}\u0000${contract.route}`);
  if (linked === undefined) {
    linked = hubContainsRoute(parentBuilt.file, contract.route);
    parentHtmlCache.set(`${contract.parentHub}\u0000${contract.route}`, linked);
  }
  if (!linked) {
    add({ route: contract.route, relatedRoute: contract.parentHub, check: "SPECIALIST_WITHOUT_HUB_LINK", expected: `link from ${contract.parentHub}`, actual: "missing", severity: "REVIEW" });
  }
}

const severityOrder = new Map([["ERROR", 0], ["CANNIBALIZATION_RISK", 1], ["REVIEW", 2]]);
rows.sort((left, right) =>
  (severityOrder.get(left.severity) ?? 9) - (severityOrder.get(right.severity) ?? 9)
  || left.check.localeCompare(right.check)
  || left.route.localeCompare(right.route, "de")
  || left.relatedRoute.localeCompare(right.relatedRoute, "de"));

fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
const headers = ["route", "relatedRoute", "check", "expected", "actual", "severity", "status", "details"];
fs.writeFileSync(OUTPUT_FILE, `${[headers.join(","), ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(","))].join("\n")}\n`, "utf8");

const indexableBuilt = [...builtRoutes.values()].filter((item) => item.indexable).length;
const counts = Object.fromEntries(["ERROR", "CANNIBALIZATION_RISK", "REVIEW"].map((severity) => [severity, rows.filter((row) => row.severity === severity).length]));
const missingRegistry = rows.filter((row) => row.check === "INDEXABLE_ROUTE_WITHOUT_REGISTRY").length;
const missingGenerated = rows.filter((row) => row.check === "BUILT_ROUTE_WITHOUT_GENERATED_INVENTORY").length;
const duplicateIntents = rows.filter((row) => row.check === "DUPLICATE_PRIMARY_INTENT").length;
const blocking = counts.ERROR + counts.CANNIBALIZATION_RISK;
console.log(`PAGE_INTENT_REGISTRY_AUDIT builtRoutes=${builtRoutes.size} indexableBuilt=${indexableBuilt} generatedRoutes=${generatedInventory.length} registryRecords=${contracts.length} sitemapRoutes=${sitemap.size} findings=${rows.length}`);
console.log(`PAGE_INTENT_REGISTRY_AUDIT missingGenerated=${missingGenerated} missingRegistry=${missingRegistry} duplicateIntentPairs=${duplicateIntents} ERROR=${counts.ERROR} CANNIBALIZATION_RISK=${counts.CANNIBALIZATION_RISK} REVIEW=${counts.REVIEW}`);
console.log(`PAGE_INTENT_REGISTRY_AUDIT output=${path.relative(ROOT, OUTPUT_FILE).replaceAll(path.sep, "/")} status=${blocking > 0 ? "FAIL" : "PASS"}`);
if (blocking > 0) process.exitCode = 1;
