#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "app");
const PREFIXES = ["umzug-", "reinigung-", "entruempelung-", "bueroumzug-", "wohnungsaufloesung-"];
const NON_GEO_ROUTES = new Set([
  "umzug-kosten-rechner",
  "umzug-mit-reinigung",
  "reinigung-preis-rechner",
  "entruempelung-kosten-regensburg",
]);

function main() {
  const entries = fs.readdirSync(APP_DIR, { withFileTypes: true });
  const report = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (NON_GEO_ROUTES.has(entry.name)) continue;
    const prefix = PREFIXES.find((candidate) => entry.name.startsWith(candidate));
    if (!prefix) continue;

    const pageFile = path.join(APP_DIR, entry.name, "page.tsx");
    if (!fs.existsSync(pageFile)) continue;

    const text = fs.readFileSync(pageFile, "utf8");
    const score = [
      text.includes("generatePageSEO"),
      text.includes("SpecialtyPageLayout"),
      text.includes("Breadcrumbs") || text.includes("breadcrumbs"),
      text.includes("path:"),
      text.includes("city:"),
    ].filter(Boolean).length;

    report.push({ route: `/${entry.name}`, prefix, score });
  }

  const byPrefix = PREFIXES.map((prefix) => {
    const items = report.filter((item) => item.prefix === prefix);
    const weak = items.filter((item) => item.score < 4);
    return { prefix, count: items.length, weak };
  });

  console.log("GEO_QUALITY_REPORT");
  for (const group of byPrefix) {
    console.log(`${group.prefix} pages=${group.count} weak=${group.weak.length}`);
  }

  const weakPages = byPrefix.flatMap((group) => group.weak).slice(0, 50);
  if (weakPages.length) {
    console.log("WEAK_GEO_PAGES");
    for (const page of weakPages) console.log(`${page.route} score=${page.score}`);
  }
}

main();
