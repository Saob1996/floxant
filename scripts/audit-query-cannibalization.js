#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const {
  normalizeRoute,
  staticHtmlPath,
  writeCsv,
} = require("./growth-audit-utils.cjs");

const root = process.cwd();
const outRoot = path.join(root, "out");
const outputFile = path.join(root, "artifacts", "query-cannibalization.csv");

function canonical(html) {
  const tag = (html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i) || [])[0] ||
    (html.match(/<link\b[^>]*href=["'][^"']+["'][^>]*rel=["']canonical["'][^>]*>/i) || [])[0] ||
    "";
  return tag.match(/href=["']([^"']+)["']/i)?.[1] || "";
}

function redirectMap() {
  const file = path.join(root, "public", "_redirects");
  const map = new Map();
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [source, destination, status = "302"] = trimmed.split(/\s+/);
    map.set(normalizeRoute(source), { destination: normalizeRoute(destination), status });
  }
  return map;
}

async function main() {
  const moduleUrl = pathToFileURL(
    path.join(root, "lib", "content", "route-consolidation-registry.ts"),
  ).href;
  const { routeConsolidationRegistry } = await import(moduleUrl);
  const sitemap = fs.readFileSync(path.join(outRoot, "sitemap.xml"), "utf8");
  const redirects = redirectMap();
  const rows = [];

  function add(entry, legacyRoute, check, expected, actual, passed) {
    rows.push({
      cluster: entry.cluster,
      location: entry.location,
      primaryRoute: entry.primaryRoute,
      legacyRoute,
      confidence: entry.confidence,
      check,
      expected,
      actual,
      status: passed ? "PASS" : "FAIL",
    });
  }

  for (const entry of routeConsolidationRegistry) {
    const file = staticHtmlPath(outRoot, entry.primaryRoute);
    const html = file ? fs.readFileSync(file, "utf8") : "";
    add(entry, "", "PRIMARY_STATIC", "present", file ? path.relative(root, file) : "missing", Boolean(file));
    add(
      entry,
      "",
      "PRIMARY_CANONICAL",
      `https://www.floxant.de${entry.primaryRoute}`,
      canonical(html),
      canonical(html) === `https://www.floxant.de${entry.primaryRoute}`,
    );
    add(
      entry,
      "",
      "PRIMARY_SITEMAP",
      "included",
      sitemap.includes(`<loc>https://www.floxant.de${entry.primaryRoute}</loc>`) ? "included" : "missing",
      sitemap.includes(`<loc>https://www.floxant.de${entry.primaryRoute}</loc>`),
    );

    for (const legacy of entry.legacyRoutes) {
      const rule = redirects.get(normalizeRoute(legacy.route));
      add(
        entry,
        legacy.route,
        "LEGACY_REDIRECT_TARGET",
        entry.primaryRoute,
        rule?.destination || "missing",
        rule?.destination === entry.primaryRoute,
      );
      add(
        entry,
        legacy.route,
        "LEGACY_REDIRECT_STATUS",
        "301 or 308",
        rule?.status || "missing",
        rule?.status === "301" || rule?.status === "308",
      );
      add(
        entry,
        legacy.route,
        "LEGACY_SITEMAP",
        "absent",
        sitemap.includes(`<loc>https://www.floxant.de${legacy.route}</loc>`) ? "included" : "absent",
        !sitemap.includes(`<loc>https://www.floxant.de${legacy.route}</loc>`),
      );
    }
  }

  writeCsv(
    outputFile,
    [
      "cluster",
      "location",
      "primaryRoute",
      "legacyRoute",
      "confidence",
      "check",
      "expected",
      "actual",
      "status",
    ],
    rows,
  );
  const failures = rows.filter((row) => row.status === "FAIL");
  console.log(
    JSON.stringify(
      {
        status: failures.length ? "FAIL" : "PASS",
        confirmed: routeConsolidationRegistry.filter((entry) => entry.confidence === "confirmed").length,
        probable: routeConsolidationRegistry.filter((entry) => entry.confidence === "probable").length,
        unresolvedChecks: routeConsolidationRegistry.reduce(
          (sum, entry) => sum + entry.unresolvedChecks.length,
          0,
        ),
        checks: rows.length,
        failures: failures.length,
        output: path.relative(root, outputFile),
      },
      null,
      2,
    ),
  );
  if (failures.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
