#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const DEFAULT_EXPORT = path.join(ROOT, "reports", "search-console.csv");
const IMPORTANT_ROUTES = [
  "/",
  "/rechner",
  "/buchung",
  "/umzug-regensburg",
  "/umzugsunternehmen-regensburg",
  "/reinigung-regensburg",
  "/endreinigung-regensburg",
  "/entruempelung-regensburg",
  "/kleintransport-regensburg",
  "/duesseldorf/reinigung",
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

const CLUSTERS = [
  {
    id: "regensburg_umzug",
    label: "Regensburg Umzug",
    target: "/umzug-regensburg",
    patterns: ["umzug regensburg", "umzugsunternehmen regensburg", "umzugsfirma regensburg", "umzugshelfer regensburg", "privatumzug regensburg", "moebeltransport regensburg", "möbeltransport regensburg"],
  },
  {
    id: "regensburg_reinigung",
    label: "Regensburg Reinigung",
    target: "/reinigung-regensburg",
    patterns: ["reinigung regensburg", "wohnungsreinigung regensburg", "endreinigung regensburg", "auszug reinigung regensburg", "grundreinigung regensburg", "reinigungsfirma regensburg"],
  },
  {
    id: "regensburg_entruempelung",
    label: "Regensburg Entrümpelung",
    target: "/entruempelung-regensburg",
    patterns: ["entruempelung regensburg", "entrümpelung regensburg", "wohnungsaufloesung regensburg", "wohnungsauflösung regensburg", "keller entrumpeln regensburg", "keller entrümpeln regensburg", "sperrmuell regensburg", "sperrmüll regensburg"],
  },
  {
    id: "bayern",
    label: "Bayern Einsatzgebiet",
    target: "/umzug-bayern",
    patterns: ["umzug bayern", "umzugsunternehmen bayern", "transport bayern", "umzug innerhalb bayern"],
  },
  {
    id: "duesseldorf_reinigung",
    label: "Düsseldorf Reinigung",
    target: "/duesseldorf/reinigung",
    patterns: ["reinigung duesseldorf", "reinigung düsseldorf", "wohnungsreinigung duesseldorf", "wohnungsreinigung düsseldorf", "endreinigung duesseldorf", "endreinigung düsseldorf", "grundreinigung duesseldorf", "grundreinigung düsseldorf", "reinigungsfirma duesseldorf", "reinigungsfirma düsseldorf"],
  },
  {
    id: "signature",
    label: "Signature Services",
    target: "/schluesseluebergabe",
    patterns: ["schluesseluebergabe", "schlüsselübergabe", "wohnungsuebergabe", "wohnungsübergabe", "uebergabeprotokoll", "übergabeprotokoll", "halteverbotszone", "leerfahrt", "rueckfahrt", "rückfahrt", "umzug und reinigung"],
  },
  {
    id: "brand",
    label: "Brand",
    target: "/",
    patterns: ["floxant", "floxant umzug", "floxant reinigung"],
  },
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

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function classifyCluster(query, page) {
  const haystack = `${normalizeText(query)} ${normalizeText(page)}`;
  const cluster = CLUSTERS.find((item) =>
    item.patterns.some((pattern) => haystack.includes(normalizeText(pattern))),
  );
  return cluster || { id: "unclustered", label: "Nicht zugeordnet", target: "" };
}

function classifyOpportunity(item) {
  if (/umzug.{0,80}(dusseldorf|duesseldorf)|dusseldorf.{0,80}(umzug|transport|entruempelung|entrumpelung)/i.test(normalizeText(`${item.query} ${item.page}`))) {
    return "wrong_duesseldorf_signal";
  }
  if (item.impressions >= 100 && item.position >= 8 && item.position <= 20) return "quick_win_position_8_20";
  if (item.impressions >= 100 && item.ctr < 0.02 && item.position <= 30) return "high_impression_low_ctr";
  if (item.impressions >= 100 && item.position > 20 && item.position <= 50) return "content_authority_position_21_50";
  if (item.impressions >= 100 && item.position > 50) return "high_impression_low_position";
  return "monitor";
}

function printNoExportHelp(file) {
  console.log("CTR_OPPORTUNITY_REPORT_READY");
  console.log(`No Search Console export found at ${path.relative(ROOT, file)}.`);
  console.log("Export a Search Console performance CSV to reports/search-console.csv, then run npm run seo:ctr.");
  console.log("Recommended columns: Query, Page, Clicks, Impressions, CTR, Position, Country, Device, Date range.");
  console.log("Priority pages to monitor:");
  for (const route of IMPORTANT_ROUTES) {
    console.log(`- ${route}`);
  }
  console.log("Opportunity buckets:");
  console.log("- quick_win_position_8_20");
  console.log("- high_impression_low_ctr");
  console.log("- content_authority_position_21_50");
  console.log("- high_impression_low_position");
  console.log("- wrong_duesseldorf_signal");
}

function main() {
  const file = path.resolve(process.argv[2] || DEFAULT_EXPORT);

  if (!fs.existsSync(file)) {
    printNoExportHelp(file);
    return;
  }

  const rows = parseCsv(fs.readFileSync(file, "utf8"));
  const headers = rows.shift() || [];
  const queryIndex = findColumn(headers, ["query", "suchanfrage", "suchbegriff"]);
  const pageIndex = findColumn(headers, ["page", "seite", "url"]);
  const clicksIndex = findColumn(headers, ["clicks", "klicks"]);
  const impressionsIndex = findColumn(headers, ["impressions", "impressionen"]);
  const ctrIndex = findColumn(headers, ["ctr", "klickrate"]);
  const positionIndex = findColumn(headers, ["position", "avg. position", "durchschnittliche position"]);
  const countryIndex = findColumn(headers, ["country", "land"]);
  const deviceIndex = findColumn(headers, ["device", "gerät", "geraet"]);
  const dateIndex = findColumn(headers, ["date", "datum", "date range", "zeitraum"]);

  if ([pageIndex, clicksIndex, impressionsIndex, ctrIndex, positionIndex].some((index) => index < 0)) {
    console.log("CTR_EXPORT_COLUMNS_MISSING");
    console.log("Expected columns: Page, Clicks, Impressions, CTR, Position.");
    process.exitCode = 1;
    return;
  }

  const opportunities = rows
    .map((row) => {
      const page = row[pageIndex] || "";
      const query = queryIndex >= 0 ? row[queryIndex] || "" : "";
      const impressions = normalizeNumber(row[impressionsIndex]);
      const clicks = normalizeNumber(row[clicksIndex]);
      const ctr = normalizePercent(row[ctrIndex]);
      const position = normalizeNumber(row[positionIndex]);
      const country = countryIndex >= 0 ? row[countryIndex] || "" : "";
      const device = deviceIndex >= 0 ? row[deviceIndex] || "" : "";
      const dateRange = dateIndex >= 0 ? row[dateIndex] || "" : "";
      const cluster = classifyCluster(query, page);
      const bucket = classifyOpportunity({ query, page, impressions, clicks, ctr, position });
      return { query, page, impressions, clicks, ctr, position, country, device, dateRange, cluster, bucket };
    })
    .filter((item) => item.bucket !== "monitor")
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 40);

  console.log(`CTR_OPPORTUNITIES count=${opportunities.length}`);
  for (const item of opportunities) {
    const ctrPercent = `${(item.ctr * 100).toFixed(1)}%`;
    const query = item.query ? `query="${item.query}" | ` : "";
    const device = item.device ? ` device=${item.device}` : "";
    const country = item.country ? ` country=${item.country}` : "";
    console.log(
      `${item.bucket} | ${item.cluster.label} -> ${item.cluster.target || "prüfen"} | ${query}${item.page} | impressions=${item.impressions} clicks=${item.clicks} ctr=${ctrPercent} position=${item.position.toFixed(1)}${device}${country}`,
    );
  }
}

main();
