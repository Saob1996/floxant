#!/usr/bin/env node
// @ts-nocheck

const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const ROOT = process.cwd();
const EXPORT_DIR = path.join(ROOT, "data", "gsc-exports");
const OUTPUT_JSON = path.join(ROOT, "gsc-analysis.json");
const OUTPUT_MD = path.join(ROOT, "GSC_ANALYSIS_REPORT.md");

function ensureExportDir() {
  fs.mkdirSync(EXPORT_DIR, { recursive: true });
}

function normalizeRoute(value) {
  if (!value) return "/";
  try {
    const url = new URL(value, "https://www.floxant.de");
    const clean = url.pathname.replace(/\/+$/, "");
    return clean || "/";
  } catch {
    const clean = String(value).split("#")[0].split("?")[0].replace(/\/+$/, "");
    return clean ? (clean.startsWith("/") ? clean : `/${clean}`) : "/";
  }
}

function normalizeHeader(value) {
  return String(value || "")
    .replace(/^\uFEFF/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function splitCsvLine(line, delimiter) {
  const cells = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
      continue;
    }
    if (char === '"') {
      quoted = !quoted;
      continue;
    }
    if (char === delimiter && !quoted) {
      cells.push(current);
      current = "";
      continue;
    }
    current += char;
  }

  cells.push(current);
  return cells.map((cell) => cell.trim());
}

function parseCsv(content) {
  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized.split("\n").filter((line) => line.trim().length > 0);
  if (!lines.length) return { rows: [], headers: [], delimiter: "," };
  const firstLine = lines[0];
  const delimiter = splitCsvLine(firstLine, ";").length >= splitCsvLine(firstLine, ",").length ? ";" : ",";
  const headers = splitCsvLine(firstLine, delimiter).map(normalizeHeader);
  const rows = lines.slice(1).map((line) => {
    const cells = splitCsvLine(line, delimiter);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] || "";
    });
    return row;
  });

  return { rows, headers, delimiter };
}

function findHeader(headers, candidates) {
  return candidates.find((candidate) => headers.includes(candidate)) || "";
}

function parseNumber(value) {
  const raw = String(value || "").trim();
  if (!raw) return 0;
  const hasPercent = raw.includes("%");
  let cleaned = raw.replace(/%/g, "").replace(/\s/g, "");
  if (cleaned.includes(",") && cleaned.includes(".")) {
    cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  } else if (cleaned.includes(",")) {
    cleaned = cleaned.replace(",", ".");
  }
  const parsed = Number(cleaned.replace(/[^0-9.\-]/g, ""));
  if (!Number.isFinite(parsed)) return 0;
  if (hasPercent || parsed > 1) return parsed / 100;
  return parsed;
}

function parseInteger(value) {
  const raw = String(value || "").trim();
  if (!raw) return 0;
  let cleaned = raw.replace(/\s/g, "");
  if (cleaned.includes(",") && cleaned.includes(".")) cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  else if (cleaned.includes(",")) cleaned = cleaned.replace(",", ".");
  const parsed = Number(cleaned.replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(parsed) ? Math.round(parsed) : 0;
}

function parsePosition(value) {
  const raw = String(value || "").trim();
  if (!raw) return 0;
  let cleaned = raw.replace(/\s/g, "");
  if (cleaned.includes(",") && cleaned.includes(".")) cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  else if (cleaned.includes(",")) cleaned = cleaned.replace(",", ".");
  const parsed = Number(cleaned.replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

async function loadSeoMoneyPages() {
  const fileUrl = pathToFileURL(path.join(ROOT, "lib", "gsc-click-priorities.ts")).href;
  const seoModule = await import(fileUrl);
  return Array.isArray(seoModule.seoMoneyPages) ? seoModule.seoMoneyPages : [];
}

function inferService(query, page, moneyPages) {
  const route = normalizeRoute(page);
  const match = moneyPages.find((item) => item.path === route || item.canonicalPath === route);
  if (match) return match.service;
  const haystack = `${query} ${route}`.toLowerCase();
  if (haystack.includes("bueroreinigung") || haystack.includes("büroreinigung")) return "bueroreinigung";
  if (haystack.includes("gewerbereinigung")) return "gewerbereinigung";
  if (haystack.includes("wohnungsaufloesung") || haystack.includes("wohnungsauflösung")) return "wohnungsaufloesung";
  if (haystack.includes("entruempelung") || haystack.includes("entrümpelung")) return "entruempelung";
  if (haystack.includes("umzug")) return "umzug";
  if (haystack.includes("kontakt")) return "kontakt";
  if (haystack.includes("reinigung")) return "reinigung";
  return "unbekannt";
}

function inferCity(query, page, moneyPages) {
  const route = normalizeRoute(page);
  const match = moneyPages.find((item) => item.path === route || item.canonicalPath === route);
  if (match) return match.city;
  const haystack = `${query} ${route}`.toLowerCase();
  if (haystack.includes("duesseldorf") || haystack.includes("düsseldorf")) return "duesseldorf";
  if (haystack.includes("regensburg")) return "regensburg";
  if (haystack.includes("landshut")) return "landshut";
  if (haystack.includes("muenchen") || haystack.includes("münchen")) return "muenchen";
  if (haystack.includes("vohenstrauss") || haystack.includes("vohenstrauß")) return "vohenstrauss";
  if (haystack.includes("waldnaab")) return "neustadt-an-der-waldnaab";
  return "unbekannt";
}

function positionBand(position) {
  if (position > 0 && position <= 3) return "1-3 Snippet-/Trust-Problem";
  if (position <= 10) return "4-10 sofortiges CTR-Potenzial";
  if (position <= 20) return "11-20 interne Links/Content-Push";
  if (position <= 50) return "21-50 Relevanz-/Content-Problem";
  return "50+ technische/Intent-Pruefung";
}

function opportunityScore(row) {
  const impressionWeight = Math.log10(row.impressions + 10) * 24;
  const ctrGap = Math.max(0.02, 1 - row.ctr);
  const positionMultiplier =
    row.position <= 3 ? 1.1 : row.position <= 10 ? 1.7 : row.position <= 20 ? 1.35 : row.position <= 50 ? 0.9 : 0.45;
  const zeroCtrBoost = row.ctr === 0 && row.impressions >= 10 ? 1.4 : 1;
  return Math.round(impressionWeight * ctrGap * positionMultiplier * zeroCtrBoost * 10) / 10;
}

function priorityFromScore(score, row) {
  if ((row.position <= 10 && row.ctr === 0 && row.impressions >= 10) || score >= 95) return "P0";
  if (score >= 65) return "P1";
  if (score >= 35) return "P2";
  return "P3";
}

function actionForRow(row) {
  if (row.impressions < 10) return "nicht anfassen";
  if (row.position <= 10 && row.ctr === 0) return "Snippet ändern";
  if (row.position <= 20) return "interne Links stärken";
  if (row.position <= 50) return "Content verbessern";
  if (row.page.includes("/de/") || row.page.includes("/fa/")) return "Canonical prüfen";
  return "nicht anfassen";
}

function isGermanQuery(query) {
  return /\b(reinigung|umzug|entrümpelung|entruempelung|angebot|kontakt|firma|büro|buero|wohnung)\b/i.test(query);
}

function analyzeRows(rows, moneyPages) {
  const byQuery = new Map();
  const byUrl = new Map();

  for (const row of rows) {
    row.score = opportunityScore(row);
    row.priority = priorityFromScore(row.score, row);
    row.positionBand = positionBand(row.position);
    row.service = inferService(row.query, row.page, moneyPages);
    row.city = inferCity(row.query, row.page, moneyPages);
    row.recommendation = actionForRow(row);
    if (!byQuery.has(row.query)) byQuery.set(row.query, []);
    if (!byUrl.has(row.page)) byUrl.set(row.page, []);
    byQuery.get(row.query).push(row);
    byUrl.get(row.page).push(row);
  }

  const cannibalization = [];
  for (const [query, items] of byQuery.entries()) {
    const pages = Array.from(new Set(items.map((item) => item.page)));
    if (pages.length > 1) {
      cannibalization.push({
        type: "gleiche Query rankt mit mehreren URLs",
        query,
        pages,
        impressions: items.reduce((sum, item) => sum + item.impressions, 0),
      });
    }
  }

  for (const [page, items] of byUrl.entries()) {
    const mismatched = items.filter((item) => item.service === "unbekannt" || item.city === "unbekannt");
    if (items.length >= 15 && mismatched.length / items.length > 0.5) {
      cannibalization.push({
        type: "gleiche URL rankt fuer viele unpassende Queries",
        page,
        queries: mismatched.slice(0, 12).map((item) => item.query),
      });
    }
  }

  const i18nWarnings = rows
    .filter((row) => (row.page.includes("/fa/") && isGermanQuery(row.query)) || (row.page.includes("/de/") && /[\u0600-\u06ff]/.test(row.query)))
    .map((row) => ({
      query: row.query,
      page: row.page,
      reason: row.page.includes("/fa/") ? "fremdsprachige URL rankt fuer deutsche Query" : "deutsche URL rankt fuer persische Query",
    }));

  const ctrOutliers = rows
    .filter(
      (row) =>
        (row.position > 0 && row.position < 10 && row.ctr === 0) ||
        (/floxant/i.test(row.query) && row.clicks === 0) ||
        (row.page.includes("/kontakt") && row.impressions > 0 && row.clicks === 0),
    )
    .map((row) => ({
      query: row.query,
      page: row.page,
      impressions: row.impressions,
      position: row.position,
      ctr: row.ctr,
      reason: /floxant/i.test(row.query)
        ? "Brand-Query ohne Klick"
        : row.page.includes("/kontakt")
          ? "Kontaktseite mit Impressionen aber 0 Klicks"
          : "Position < 10 und CTR 0 Prozent",
    }));

  const doNotTouch = rows
    .filter((row) => row.impressions < 10)
    .slice(0, 50)
    .map((row) => ({
      query: row.query,
      page: row.page,
      impressions: row.impressions,
      reason: "Impressionen < 10",
    }));

  return {
    rows,
    topActions: rows.slice().sort((a, b) => b.score - a.score).slice(0, 20),
    topUrls: Array.from(byUrl.entries())
      .map(([page, items]) => ({
        page,
        score: Math.round(items.reduce((sum, item) => sum + item.score, 0) * 10) / 10,
        impressions: items.reduce((sum, item) => sum + item.impressions, 0),
        clicks: items.reduce((sum, item) => sum + item.clicks, 0),
        queries: items.length,
        service: inferService("", page, moneyPages),
        city: inferCity("", page, moneyPages),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 20),
    queryUrlMapping: rows
      .slice()
      .sort((a, b) => b.score - a.score)
      .slice(0, 80)
      .map((row) => ({
        query: row.query,
        page: row.page,
        priority: row.priority,
        score: row.score,
        recommendation: row.recommendation,
      })),
    cannibalization,
    i18nWarnings,
    ctrOutliers,
    doNotTouch,
  };
}

function mdEscape(value) {
  return String(value || "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function pct(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function buildNoInputReport(generatedAt) {
  return [
    "# GSC Analysis Report",
    "",
    `Stand: ${generatedAt}`,
    "",
    "Status: Kein GSC-CSV-Input gefunden.",
    "",
    `Lege Search-Console-Exporte als CSV in \`${path.relative(ROOT, EXPORT_DIR)}\` ab und starte danach \`npm run seo:gsc\`.`,
    "",
    "Erwartete Spalten:",
    "",
    "- Deutsch: `Suchanfrage`, `Seite`, `Klicks`, `Impressionen`, `CTR`, `Position`",
    "- Englisch: `Query`, `Page`, `Clicks`, `Impressions`, `CTR`, `Position`",
    "",
  ].join("\n");
}

function buildMarkdown(analysis, generatedAt, files) {
  const lines = [
    "# GSC Analysis Report",
    "",
    `Stand: ${generatedAt}`,
    `Input-Dateien: ${files.map((file) => path.basename(file)).join(", ")}`,
    `Datensätze: ${analysis.rows.length}`,
    "",
    "## Top 20 Sofortmaßnahmen",
    "",
    "| Priorität | Score | Query | URL | Impr. | Klicks | CTR | Pos. | Empfehlung |",
    "| --- | ---: | --- | --- | ---: | ---: | ---: | ---: | --- |",
    ...analysis.topActions.map((row) =>
      [
        row.priority,
        row.score,
        mdEscape(row.query),
        mdEscape(row.page),
        row.impressions,
        row.clicks,
        pct(row.ctr),
        row.position.toFixed(1),
        row.recommendation,
      ].join(" | ").replace(/^/, "| ").replace(/$/, " |"),
    ),
    "",
    "## Top 20 URLs nach Opportunity",
    "",
    "| URL | Score | Impressionen | Klicks | Queries | Service | Stadt |",
    "| --- | ---: | ---: | ---: | ---: | --- | --- |",
    ...analysis.topUrls.map((item) =>
      [mdEscape(item.page), item.score, item.impressions, item.clicks, item.queries, item.service, item.city]
        .join(" | ")
        .replace(/^/, "| ")
        .replace(/$/, " |"),
    ),
    "",
    "## Query-URL-Mapping",
    "",
    "| Query | URL | Priorität | Score | Empfehlung |",
    "| --- | --- | --- | ---: | --- |",
    ...analysis.queryUrlMapping.map((item) =>
      [mdEscape(item.query), mdEscape(item.page), item.priority, item.score, item.recommendation]
        .join(" | ")
        .replace(/^/, "| ")
        .replace(/$/, " |"),
    ),
    "",
    "## Kannibalisierungsfälle",
    "",
    ...(analysis.cannibalization.length
      ? analysis.cannibalization.map((item) => `- ${item.type}: ${item.query || item.page} -> ${(item.pages || item.queries || []).join(", ")}`)
      : ["- keine erkannt"]),
    "",
    "## i18n-Warnungen",
    "",
    ...(analysis.i18nWarnings.length
      ? analysis.i18nWarnings.map((item) => `- ${item.page}: ${item.query} (${item.reason})`)
      : ["- keine erkannt"]),
    "",
    "## CTR-Ausreißer",
    "",
    ...(analysis.ctrOutliers.length
      ? analysis.ctrOutliers.map((item) => `- ${item.page}: ${item.query}, Pos. ${item.position}, ${item.impressions} Impr. (${item.reason})`)
      : ["- keine erkannt"]),
    "",
    "## Seiten, die nicht weiter optimiert werden sollen",
    "",
    ...(analysis.doNotTouch.length
      ? analysis.doNotTouch.map((item) => `- ${item.page}: ${item.query} (${item.reason})`)
      : ["- keine mit Impressionen < 10 im Export"]),
    "",
    "## Empfehlungen",
    "",
    "- `Snippet ändern`: nur bei ausreichend Impressionen, guter Position und CTR-Problem.",
    "- `interne Links stärken`: bei Position 11-20 und passendem Intent.",
    "- `Content verbessern`: bei Position 21-50 mit erkennbarem Intent-Mismatch.",
    "- `Canonical prüfen`: bei Locale-, Duplicate- oder Varianten-URLs.",
    "- `nicht anfassen`: bei sehr wenig Daten oder unklarem Signal.",
    "",
  ];

  return `${lines.join("\n")}\n`;
}

async function main() {
  ensureExportDir();
  const generatedAt = new Date().toISOString();
  const files = fs
    .readdirSync(EXPORT_DIR)
    .filter((file) => file.toLowerCase().endsWith(".csv"))
    .map((file) => path.join(EXPORT_DIR, file));

  if (!files.length) {
    const output = {
      generatedAt,
      inputFound: false,
      inputDirectory: path.relative(ROOT, EXPORT_DIR),
      rows: [],
      message: "Kein GSC-CSV gefunden. CSV-Export in data/gsc-exports/ ablegen.",
    };
    fs.writeFileSync(OUTPUT_JSON, `${JSON.stringify(output, null, 2)}\n`, "utf8");
    fs.writeFileSync(OUTPUT_MD, `${buildNoInputReport(generatedAt)}\n`, "utf8");
    console.log(`GSC_ANALYSIS_NO_INPUT dir=${path.relative(ROOT, EXPORT_DIR)}`);
    return;
  }

  const moneyPages = await loadSeoMoneyPages();
  const allRows = [];
  const fileReports = [];
  const requiredHeaders = {
    query: ["suchanfrage", "query", "top queries"],
    page: ["seite", "page", "url", "pages"],
    clicks: ["klicks", "clicks"],
    impressions: ["impressionen", "impressions"],
    ctr: ["ctr", "klickrate"],
    position: ["position", "durchschnittliche position", "average position"],
  };

  for (const file of files) {
    const parsed = parseCsv(fs.readFileSync(file, "utf8"));
    const headerMap = Object.fromEntries(
      Object.entries(requiredHeaders).map(([key, candidates]) => [key, findHeader(parsed.headers, candidates)]),
    );
    const missing = Object.entries(headerMap).filter(([, value]) => !value).map(([key]) => key);
    fileReports.push({ file: path.basename(file), rows: parsed.rows.length, delimiter: parsed.delimiter, missing });
    if (missing.length) continue;

    for (const row of parsed.rows) {
      const query = row[headerMap.query] || "";
      const page = normalizeRoute(row[headerMap.page] || "");
      if (!query || !page) continue;
      allRows.push({
        query,
        page,
        clicks: parseInteger(row[headerMap.clicks]),
        impressions: parseInteger(row[headerMap.impressions]),
        ctr: parseNumber(row[headerMap.ctr]),
        position: parsePosition(row[headerMap.position]),
        sourceFile: path.basename(file),
      });
    }
  }

  const missingFiles = fileReports.filter((file) => file.missing.length);
  if (missingFiles.length && !allRows.length) {
    const output = { generatedAt, inputFound: true, files: fileReports, rows: [], error: "Pflichtspalten fehlen." };
    fs.writeFileSync(OUTPUT_JSON, `${JSON.stringify(output, null, 2)}\n`, "utf8");
    fs.writeFileSync(
      OUTPUT_MD,
      `# GSC Analysis Report\n\nStand: ${generatedAt}\n\nStatus: CSV gefunden, aber Pflichtspalten fehlen.\n\n${missingFiles
        .map((file) => `- ${file.file}: fehlt ${file.missing.join(", ")}`)
        .join("\n")}\n`,
      "utf8",
    );
    console.log(`GSC_ANALYSIS_MISSING_COLUMNS files=${missingFiles.length}`);
    return;
  }

  const analysis = analyzeRows(allRows, moneyPages);
  const output = {
    generatedAt,
    inputFound: true,
    files: fileReports,
    summary: {
      rows: allRows.length,
      topActionCount: analysis.topActions.length,
      cannibalizationCount: analysis.cannibalization.length,
      i18nWarningCount: analysis.i18nWarnings.length,
      ctrOutlierCount: analysis.ctrOutliers.length,
    },
    ...analysis,
  };

  fs.writeFileSync(OUTPUT_JSON, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  fs.writeFileSync(OUTPUT_MD, buildMarkdown(analysis, generatedAt, files), "utf8");
  console.log(
    `GSC_ANALYSIS_OK rows=${allRows.length} actions=${analysis.topActions.length} cannibalization=${analysis.cannibalization.length} i18n=${analysis.i18nWarnings.length}`,
  );
}

main().catch((error) => {
  console.error(`GSC_ANALYSIS_ERROR ${error.message}`);
  process.exit(1);
});
