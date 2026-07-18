const fs = require("node:fs");
const path = require("node:path");

const STOP_WORDS = new Set([
  "der", "die", "das", "den", "dem", "des", "ein", "eine", "einer", "und", "oder", "für", "fuer",
  "von", "mit", "in", "im", "am", "an", "auf", "to", "the", "a", "an", "and", "or", "for", "of",
  "in", "near", "service", "services", "firma", "unternehmen",
]);

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLocaleLowerCase("de-DE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9äöü\s/_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value) {
  return [...new Set(normalizeText(value).split(/[\s/_-]+/).filter((token) => token.length > 2 && !STOP_WORDS.has(token)))];
}

function detectDelimiter(text) {
  const line = String(text).replace(/^\uFEFF/, "").split(/\r?\n/).find((item) => item.trim()) || "";
  let quoted = false;
  const counts = { ",": 0, ";": 0, "\t": 0 };
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') index += 1;
      else quoted = !quoted;
    } else if (!quoted && Object.hasOwn(counts, character)) counts[character] += 1;
  }
  return Object.entries(counts).sort((left, right) => right[1] - left[1])[0][0];
}

function parseDelimited(text, delimiter = detectDelimiter(text)) {
  const source = String(text).replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (character === '"') {
      if (quoted && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === delimiter && !quoted) {
      row.push(field);
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && source[index + 1] === "\n") index += 1;
      row.push(field);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  row.push(field);
  if (row.some((value) => value.trim())) rows.push(row);
  return rows;
}

function rowsToObjects(rows) {
  if (!rows.length) return [];
  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])));
}

function parseCsvFile(filePath) {
  return rowsToObjects(parseDelimited(fs.readFileSync(filePath, "utf8")));
}

function parseLocalizedNumber(value, { integer = false, percent = false } = {}) {
  let input = String(value ?? "").trim().replace(/\s|\u00a0/g, "").replace(/%$/, "");
  if (!input) return 0;
  const lastComma = input.lastIndexOf(",");
  const lastDot = input.lastIndexOf(".");
  if (lastComma >= 0 && lastDot >= 0) {
    const decimal = lastComma > lastDot ? "," : ".";
    const thousands = decimal === "," ? /\./g : /,/g;
    input = input.replace(thousands, "").replace(decimal, ".");
  } else if (lastComma >= 0) {
    input = input.replace(/\./g, "").replace(",", ".");
  } else if (integer && /^\d{1,3}(\.\d{3})+$/.test(input)) {
    input = input.replace(/\./g, "");
  }
  const parsed = Number(input);
  if (!Number.isFinite(parsed)) return 0;
  return percent ? parsed / 100 : integer ? Math.round(parsed) : parsed;
}

function safeSpreadsheetValue(value) {
  const text = String(value ?? "");
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function csvCell(value) {
  const text = safeSpreadsheetValue(value).replace(/"/g, '""');
  return /[",;\r\n]/.test(text) ? `"${text}"` : text;
}

function writeCsv(filePath, headers, rows) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const lines = [headers.map(csvCell).join(",")];
  for (const row of rows) lines.push(headers.map((header) => csvCell(row[header] ?? "")).join(","));
  fs.writeFileSync(filePath, `${lines.join("\n")}\n`, "utf8");
}

function inferLanguage(query) {
  const normalized = ` ${normalizeText(query)} `;
  const englishSignals = [" cleaning ", " moving ", " clearance ", " company ", " office ", " apartment ", " quote ", " germany ", " near me "];
  const germanSignals = [" reinigung ", " umzug ", " entraumplung ", " entrumpelung ", " haushaltsauflosung ", " angebot ", " kosten ", " firma "];
  const english = englishSignals.filter((signal) => normalized.includes(signal)).length;
  const german = germanSignals.filter((signal) => normalized.includes(signal)).length;
  return english > german ? "en" : "de";
}

function inferIntent(query) {
  const normalized = normalizeText(query);
  if (/angebot|quote|kosten|preis|buchen|firma|company|service|dienstleister|umzugsunternehmen|reinigungsfirma/.test(normalized)) return "transactional";
  if (/was|wie|wann|warum|checkliste|tipps|guide|ratgeber|what|how|when|why/.test(normalized)) return "informational";
  return /reinigung|cleaning|umzug|moving|entrumpelung|clearance|raumung/.test(normalized) ? "commercial" : "unknown";
}

function normalizeUrl(value) {
  try {
    const url = new URL(String(value));
    return `${url.origin}${url.pathname.replace(/\/$/, "") || "/"}`;
  } catch {
    const pathValue = String(value || "/").split(/[?#]/)[0];
    return pathValue === "/" ? "/" : pathValue.replace(/\/$/, "");
  }
}

module.exports = {
  detectDelimiter,
  inferIntent,
  inferLanguage,
  normalizeText,
  normalizeUrl,
  parseCsvFile,
  parseDelimited,
  parseLocalizedNumber,
  rowsToObjects,
  tokenize,
  writeCsv,
};
