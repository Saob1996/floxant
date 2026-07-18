#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");
const {
  inferIntent,
  inferLanguage,
  normalizeText,
  normalizeUrl,
  parseDelimited,
  parseLocalizedNumber,
  writeCsv,
} = require("./lib/search-console-utils");

const root = process.cwd();
const artifactDir = path.join(root, "artifacts");
const inputs = process.argv.slice(2).filter((argument) => !argument.startsWith("--"));
const inputPaths = (inputs.length ? inputs : ["data/private/search-console"]).map((item) => path.resolve(root, item));

function discoverFiles(inputPath) {
  if (!fs.existsSync(inputPath)) return [];
  const stat = fs.statSync(inputPath);
  if (stat.isFile()) return [inputPath];
  return fs.readdirSync(inputPath, { withFileTypes: true }).flatMap((entry) => discoverFiles(path.join(inputPath, entry.name)));
}

function readZipCsvEntries(filePath) {
  const buffer = fs.readFileSync(filePath);
  let endOffset = -1;
  for (let index = Math.max(0, buffer.length - 65_557); index <= buffer.length - 22; index += 1) {
    if (buffer.readUInt32LE(index) === 0x06054b50) endOffset = index;
  }
  if (endOffset < 0) throw new Error(`ZIP-Endverzeichnis fehlt: ${path.basename(filePath)}`);

  const entryCount = buffer.readUInt16LE(endOffset + 10);
  let offset = buffer.readUInt32LE(endOffset + 16);
  const entries = [];
  for (let index = 0; index < entryCount; index += 1) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) throw new Error(`Ungültiges ZIP-Verzeichnis: ${path.basename(filePath)}`);
    const flags = buffer.readUInt16LE(offset + 8);
    const method = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const uncompressedSize = buffer.readUInt32LE(offset + 24);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localOffset = buffer.readUInt32LE(offset + 42);
    const name = buffer.subarray(offset + 46, offset + 46 + nameLength).toString(flags & 0x800 ? "utf8" : "utf8");
    offset += 46 + nameLength + extraLength + commentLength;
    if (!/\.csv$/i.test(name) || name.endsWith("/")) continue;
    if (flags & 0x1) throw new Error(`Verschlüsselte ZIP-Datei wird nicht unterstützt: ${name}`);
    if (buffer.readUInt32LE(localOffset) !== 0x04034b50) throw new Error(`Ungültiger ZIP-Eintrag: ${name}`);
    const localNameLength = buffer.readUInt16LE(localOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = buffer.subarray(dataStart, dataStart + compressedSize);
    const data = method === 0 ? compressed : method === 8 ? zlib.inflateRawSync(compressed) : null;
    if (!data) throw new Error(`Nicht unterstützte ZIP-Kompression (${method}): ${name}`);
    if (data.length !== uncompressedSize) throw new Error(`ZIP-Größenprüfung fehlgeschlagen: ${name}`);
    entries.push({ name: `${path.basename(filePath)}:${name}`, text: data.toString("utf8") });
  }
  return entries;
}

function normalizeHeader(value) {
  return normalizeText(value).replace(/[\s_-]+/g, " ");
}

function classify(headers, fileName) {
  const joined = `${headers.join(" ")} ${normalizeText(fileName)}`;
  if (/suchanfrag|top quer|queries|query/.test(joined)) return "query";
  if (/haufigsten seiten|top page|pages|seite/.test(joined)) return "page";
  if (/gerat|device/.test(joined)) return "device";
  if (/land|country|countries/.test(joined)) return "country";
  if (/darstellung|search appearance|appearance/.test(joined)) return "appearance";
  if (/datum|date|diagramm/.test(joined)) return "date";
  return "unknown";
}

function findIndex(headers, patterns) {
  return headers.findIndex((header) => patterns.some((pattern) => pattern.test(header)));
}

function metricIndexes(headers) {
  return {
    clicks: findIndex(headers, [/^klicks?$/, /^clicks?$/]),
    impressions: findIndex(headers, [/^impressionen?$/, /^impressions?$/]),
    ctr: findIndex(headers, [/^ctr$/, /click through/]),
    position: findIndex(headers, [/position/]),
  };
}

function dimensionIndex(headers, type) {
  const patterns = {
    query: [/suchanfrag/, /quer/],
    page: [/seite/, /page/],
    device: [/gerat/, /device/],
    country: [/land/, /country/],
    appearance: [/darstellung/, /appearance/],
    date: [/datum/, /date/],
  };
  return findIndex(headers, patterns[type] || []);
}

function metrics(row, indexes) {
  return {
    clicks: parseLocalizedNumber(row[indexes.clicks], { integer: true }),
    impressions: parseLocalizedNumber(row[indexes.impressions], { integer: true }),
    ctr: parseLocalizedNumber(row[indexes.ctr], { percent: true }),
    position: parseLocalizedNumber(row[indexes.position]),
  };
}

function addAggregate(map, key, values, source) {
  if (!key) return;
  const current = map.get(key) || { key, clicks: 0, impressions: 0, weightedPosition: 0, sourceFiles: new Set() };
  current.clicks += values.clicks;
  current.impressions += values.impressions;
  current.weightedPosition += values.position * Math.max(values.impressions, 1);
  current.sourceFiles.add(source);
  map.set(key, current);
}

function finalizeAggregate(record) {
  return {
    clicks: record.clicks,
    impressions: record.impressions,
    ctr: record.impressions ? record.clicks / record.impressions : 0,
    position: record.impressions ? record.weightedPosition / record.impressions : 0,
    sourceCount: record.sourceFiles.size,
  };
}

const aggregates = {
  query: new Map(),
  page: new Map(),
  device: new Map(),
  country: new Map(),
  appearance: new Map(),
  date: new Map(),
};
const importedFiles = [];
const skippedFiles = [];

function processCsv(sourceName, text) {
  const rows = parseDelimited(text);
  if (!rows.length) return;
  const headers = rows[0].map(normalizeHeader);
  const type = classify(headers, sourceName);
  const indexes = metricIndexes(headers);
  const dimension = dimensionIndex(headers, type);
  if (type === "unknown" || dimension < 0 || indexes.clicks < 0 || indexes.impressions < 0) {
    skippedFiles.push({ name: path.basename(sourceName), reason: "unbekannter Datentyp oder fehlende Metrikspalten" });
    return;
  }

  let dataRows = 0;
  for (const row of rows.slice(1)) {
    const rawKey = String(row[dimension] ?? "").replace(/\s+/g, " ").trim();
    if (!rawKey) continue;
    const key = type === "page" ? normalizeUrl(rawKey) : rawKey;
    addAggregate(aggregates[type], key, metrics(row, indexes), path.basename(sourceName));
    dataRows += 1;
  }
  importedFiles.push({ name: path.basename(sourceName), type, rows: dataRows });
}

for (const inputPath of inputPaths) {
  for (const filePath of discoverFiles(inputPath)) {
    if (/\.csv$/i.test(filePath)) processCsv(filePath, fs.readFileSync(filePath, "utf8"));
    else if (/\.zip$/i.test(filePath)) readZipCsvEntries(filePath).forEach((entry) => processCsv(entry.name, entry.text));
  }
}

if (!importedFiles.length) {
  console.error(`Keine unterstützten Search-Console-Daten gefunden. Geprüft: ${inputPaths.join(", ")}`);
  process.exit(2);
}

fs.mkdirSync(artifactDir, { recursive: true });
const queryRows = [...aggregates.query.values()].map((record) => {
  const values = finalizeAggregate(record);
  return {
    query: record.key,
    ...values,
    ctr: values.ctr.toFixed(6),
    position: values.position.toFixed(2),
    language: inferLanguage(record.key),
    intent: inferIntent(record.key),
    brandQuery: /(^|\s)floxant(\s|$)/i.test(record.key) ? "true" : "false",
  };
}).sort((left, right) => right.impressions - left.impressions || left.position - right.position);

const pageRows = [...aggregates.page.values()].map((record) => {
  const values = finalizeAggregate(record);
  let locale = "unknown";
  try {
    const pathname = new URL(record.key).pathname;
    locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
  } catch {
    locale = record.key === "/en" || record.key.startsWith("/en/") ? "en" : "de";
  }
  return { url: record.key, ...values, ctr: values.ctr.toFixed(6), position: values.position.toFixed(2), locale };
}).sort((left, right) => right.impressions - left.impressions || left.position - right.position);

const deviceMetrics = [...aggregates.device.values()].map((record) => ({ device: record.key, ...finalizeAggregate(record) }));
const bestDeviceCtr = Math.max(0, ...deviceMetrics.map((row) => row.ctr));
const deviceRows = deviceMetrics.map((row) => ({
  device: row.device,
  clicks: row.clicks,
  impressions: row.impressions,
  ctr: row.ctr.toFixed(6),
  position: row.position.toFixed(2),
  ctrGapToBest: (bestDeviceCtr - row.ctr).toFixed(6),
  manualReview: bestDeviceCtr - row.ctr >= 0.01 ? "true" : "false",
})).sort((left, right) => right.impressions - left.impressions);

const languages = new Map();
for (const row of queryRows) {
  const current = languages.get(row.language) || { locale: row.language, clicks: 0, impressions: 0 };
  current.clicks += row.clicks;
  current.impressions += row.impressions;
  languages.set(row.language, current);
}
const languageRows = [...languages.values()].map((row) => ({
  ...row,
  ctr: row.impressions ? (row.clicks / row.impressions).toFixed(6) : "0.000000",
  opportunity: row.impressions > 0 && row.clicks === 0 ? "impressions_without_clicks" : "measure_separately",
}));

const dateRows = [...aggregates.date.values()].map((record) => ({ date: record.key, ...finalizeAggregate(record) })).sort((left, right) => left.date.localeCompare(right.date));
const periodSize = Math.min(7, Math.floor(dateRows.length / 2));
const firstPeriod = dateRows.slice(0, periodSize);
const lastPeriod = periodSize ? dateRows.slice(-periodSize) : [];
const sum = (rows, key) => rows.reduce((total, row) => total + row[key], 0);
const firstClicks = sum(firstPeriod, "clicks");
const lastClicks = sum(lastPeriod, "clicks");
const trend = !periodSize ? "not_available" : lastClicks > firstClicks * 1.1 ? "growing" : lastClicks < firstClicks * 0.9 ? "declining" : "stable";

writeCsv(path.join(artifactDir, "gsc-query-opportunities.csv"), ["query", "clicks", "impressions", "ctr", "position", "language", "intent", "brandQuery", "sourceCount"], queryRows);
writeCsv(path.join(artifactDir, "gsc-page-opportunities.csv"), ["url", "clicks", "impressions", "ctr", "position", "locale", "sourceCount"], pageRows);
writeCsv(path.join(artifactDir, "gsc-device-gaps.csv"), ["device", "clicks", "impressions", "ctr", "position", "ctrGapToBest", "manualReview"], deviceRows);
writeCsv(path.join(artifactDir, "gsc-language-opportunities.csv"), ["locale", "clicks", "impressions", "ctr", "opportunity"], languageRows);
writeCsv(path.join(artifactDir, "gsc-cannibalization.csv"), ["query", "primaryUrl", "secondaryUrls", "impressions", "clicks", "position", "risk", "reason", "manualReview"], []);

const summary = {
  generatedAt: new Date().toISOString(),
  inputs: inputPaths.map((inputPath) => path.basename(inputPath)),
  importedFiles,
  skippedFiles,
  privacy: {
    rawRowsCommitted: false,
    artifactsAggregated: true,
    queryPageJoinAvailable: false,
    note: "Standard-GSC-Tabellenexporte enthalten getrennte Query- und Page-Tabellen. Query-URL-Zuordnung wird daher semantisch markiert und bleibt manuell zu prüfen.",
  },
  totals: {
    queries: queryRows.length,
    queryClicks: queryRows.reduce((total, row) => total + row.clicks, 0),
    queryImpressions: queryRows.reduce((total, row) => total + row.impressions, 0),
    pages: pageRows.length,
    pageClicks: pageRows.reduce((total, row) => total + row.clicks, 0),
    pageImpressions: pageRows.reduce((total, row) => total + row.impressions, 0),
    devices: deviceRows.length,
    languages: languageRows.length,
    dates: dateRows.length,
  },
  trend: { periodDays: periodSize, firstClicks, lastClicks, classification: trend },
};
fs.writeFileSync(path.join(artifactDir, "gsc-summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");

console.log(JSON.stringify({ importedFiles: importedFiles.length, queries: queryRows.length, pages: pageRows.length, devices: deviceRows.length, trend, artifacts: 6 }, null, 2));
