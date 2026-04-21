#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const DEFAULT_EXPORT = path.join(ROOT, "reports", "search-console.csv");
const IMPORTANT_ROUTES = [
  "/",
  "/rechner",
  "/umzug",
  "/reinigung",
  "/entruempelung",
  "/bueroumzug",
  "/firmenentsorgung",
  "/leerfahrt-rueckfahrt",
  "/private-client-service",
  "/service-area-bayern",
  "/einsatzgebiet-regensburg-200km",
  "/blog",
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell || row.length) {
    row.push(cell);
    if (row.some(Boolean)) rows.push(row);
  }

  return rows;
}

function normalizePercent(value) {
  const raw = String(value || "").trim().replace("%", "").replace(",", ".");
  const number = Number(raw);
  if (!Number.isFinite(number)) return 0;
  return number > 1 ? number / 100 : number;
}

function normalizeNumber(value) {
  const raw = String(value || "").trim().replace(/\./g, "").replace(",", ".");
  const number = Number(raw);
  return Number.isFinite(number) ? number : 0;
}

function findColumn(headers, names) {
  const normalized = headers.map((header) => header.trim().toLowerCase());
  return normalized.findIndex((header) => names.some((name) => header === name || header.includes(name)));
}

function printNoExportHelp(file) {
  console.log("CTR_OPPORTUNITY_REPORT_READY");
  console.log(`No Search Console export found at ${path.relative(ROOT, file)}.`);
  console.log("Export a Search Console performance CSV with Page, Clicks, Impressions, CTR and Position columns, then run npm run seo:ctr.");
  console.log("Priority pages to monitor:");
  for (const route of IMPORTANT_ROUTES) {
    console.log(`- ${route}`);
  }
}

function main() {
  const file = path.resolve(process.argv[2] || DEFAULT_EXPORT);

  if (!fs.existsSync(file)) {
    printNoExportHelp(file);
    return;
  }

  const rows = parseCsv(fs.readFileSync(file, "utf8"));
  const headers = rows.shift() || [];
  const pageIndex = findColumn(headers, ["page", "seite", "url"]);
  const clicksIndex = findColumn(headers, ["clicks", "klicks"]);
  const impressionsIndex = findColumn(headers, ["impressions", "impressionen"]);
  const ctrIndex = findColumn(headers, ["ctr", "klickrate"]);
  const positionIndex = findColumn(headers, ["position", "avg. position", "durchschnittliche position"]);

  if ([pageIndex, clicksIndex, impressionsIndex, ctrIndex, positionIndex].some((index) => index < 0)) {
    console.log("CTR_EXPORT_COLUMNS_MISSING");
    console.log("Expected columns: Page, Clicks, Impressions, CTR, Position.");
    process.exitCode = 1;
    return;
  }

  const opportunities = rows
    .map((row) => {
      const page = row[pageIndex] || "";
      const impressions = normalizeNumber(row[impressionsIndex]);
      const clicks = normalizeNumber(row[clicksIndex]);
      const ctr = normalizePercent(row[ctrIndex]);
      const position = normalizeNumber(row[positionIndex]);
      return { page, impressions, clicks, ctr, position };
    })
    .filter((item) => item.impressions >= 100 && item.ctr < 0.04 && item.position <= 20)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 25);

  console.log(`CTR_OPPORTUNITIES count=${opportunities.length}`);
  for (const item of opportunities) {
    const ctrPercent = `${(item.ctr * 100).toFixed(1)}%`;
    console.log(`${item.page} | impressions=${item.impressions} clicks=${item.clicks} ctr=${ctrPercent} position=${item.position.toFixed(1)}`);
  }
}

main();
