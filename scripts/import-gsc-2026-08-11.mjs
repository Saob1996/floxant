import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const EXPORT_DATE = "2026-08-11";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INPUT_DIR = path.join(ROOT, "data", "private", "search-console", EXPORT_DATE);
const ARTIFACTS_DIR = path.join(ROOT, "artifacts");

const OUTPUTS = {
  summary: path.join(ARTIFACTS_DIR, `gsc-summary-${EXPORT_DATE}.json`),
  queries: path.join(ARTIFACTS_DIR, `gsc-query-opportunities-${EXPORT_DATE}.csv`),
  pages: path.join(ARTIFACTS_DIR, `gsc-page-opportunities-${EXPORT_DATE}.csv`),
  devices: path.join(ARTIFACTS_DIR, `gsc-device-gap-${EXPORT_DATE}.csv`),
  calculators: path.join(ARTIFACTS_DIR, `gsc-calculator-opportunities-${EXPORT_DATE}.csv`),
};

const SOURCE_DEFINITIONS = {
  chart: {
    file: "Diagramm.csv",
    headers: ["Datum", "Klicks", "Impressionen", "CTR", "Position"],
    rows: 28,
    metric: true,
  },
  queries: {
    file: "Suchanfragen.csv",
    headers: ["Häufigste Suchanfragen", "Klicks", "Impressionen", "CTR", "Position"],
    rows: 778,
    metric: true,
  },
  pages: {
    file: "Seiten.csv",
    headers: ["Die häufigsten Seiten", "Klicks", "Impressionen", "CTR", "Position"],
    rows: 616,
    metric: true,
  },
  countries: {
    file: "Länder.csv",
    headers: ["Land", "Klicks", "Impressionen", "CTR", "Position"],
    rows: 83,
    metric: true,
  },
  devices: {
    file: "Geräte.csv",
    headers: ["Gerät", "Klicks", "Impressionen", "CTR", "Position"],
    rows: 3,
    metric: true,
  },
  appearances: {
    file: "Darstellung in der Suche.csv",
    headers: ["Darstellung in der Suche", "Klicks", "Impressionen", "CTR", "Position"],
    rows: 0,
    metric: true,
  },
  filters: {
    file: "Filter.csv",
    headers: ["Filtern", "Wert"],
    rows: 2,
    metric: false,
  },
};

const ALLOWED_CLASSIFICATIONS = [
  "PROTECT_WINNER",
  "HIGH_IMPRESSIONS_LOW_CTR",
  "POSITION_1_TO_5_NO_CLICK",
  "POSITION_6_TO_10_LOW_CTR",
  "POSITION_11_TO_20",
  "URL_INTENT_MISMATCH",
  "TECHNICAL_CANNIBALIZATION",
  "LIKELY_CANNIBALIZATION",
  "CONTENT_OVERLAP",
  "WEAK_SERVICE_PAGE",
  "NEW_OR_LOW_DATA",
  "IRRELEVANT_QUERY",
  "MANUAL_REVIEW",
];
const ALLOWED_CLASSIFICATION_SET = new Set(ALLOWED_CLASSIFICATIONS);
const ALLOWED_RELATION_LABELS = ["CONFIRMED", "LIKELY", "UNCLEAR", "MANUAL_REVIEW"];
const ALLOWED_RELATION_SET = new Set(ALLOWED_RELATION_LABELS);

function invariant(condition, message) {
  if (!condition) throw new Error(`GSC_VALIDATION_FAILED: ${message}`);
}

function round(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function decodeUtf8(filePath) {
  const text = new TextDecoder("utf-8", { fatal: true }).decode(fs.readFileSync(filePath));
  invariant(!text.includes("\uFFFD"), `${path.basename(filePath)} enthält ungültige UTF-8-Zeichen.`);
  return text.replace(/^\uFEFF/u, "");
}

function parseCsv(text, sourceName) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  let fieldStarted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"') {
        if (text[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          quoted = false;
        }
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"' && !fieldStarted) {
      quoted = true;
      fieldStarted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
      fieldStarted = false;
    } else if (character === "\n" || character === "\r") {
      if (character === "\r" && text[index + 1] === "\n") index += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      fieldStarted = false;
    } else {
      field += character;
      fieldStarted = true;
    }
  }

  invariant(!quoted, `${sourceName} endet in einem nicht geschlossenen CSV-Zitat.`);
  if (fieldStarted || field || row.length) {
    row.push(field);
    rows.push(row);
  }
  while (rows.length && rows.at(-1).every((value) => value === "")) rows.pop();
  invariant(rows.length > 0, `${sourceName} ist leer.`);
  return { headers: rows[0], rows: rows.slice(1) };
}

function arraysEqual(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function rowsToObjects(headers, rows) {
  return rows.map((values, index) => {
    invariant(values.length === headers.length, `CSV-Zeile ${index + 2} hat ${values.length} statt ${headers.length} Spalten.`);
    return Object.fromEntries(headers.map((header, column) => [header, values[column]]));
  });
}

function parseInteger(value, context) {
  invariant(/^(?:0|[1-9]\d*)$/u.test(value), `${context} ist keine nichtnegative Ganzzahl: ${value}`);
  return Number(value);
}

function parseDecimal(value, context) {
  invariant(/^\d+(?:\.\d+)?$/u.test(value), `${context} ist keine nichtnegative Dezimalzahl: ${value}`);
  const parsed = Number(value);
  invariant(Number.isFinite(parsed), `${context} ist nicht endlich.`);
  return parsed;
}

function parsePercent(value, context) {
  invariant(value.endsWith("%"), `${context} ist kein Prozentwert: ${value}`);
  const parsed = parseDecimal(value.slice(0, -1), context);
  invariant(parsed >= 0 && parsed <= 100, `${context} liegt außerhalb 0–100 %.`);
  return parsed;
}

function metricFromRow(row, context) {
  const clicks = parseInteger(row.Klicks, `${context}/Klicks`);
  const impressions = parseInteger(row.Impressionen, `${context}/Impressionen`);
  const ctrPercent = parsePercent(row.CTR, `${context}/CTR`);
  const position = parseDecimal(row.Position, `${context}/Position`);
  invariant(clicks <= impressions, `${context} hat mehr Klicks als Impressionen.`);
  invariant(position > 0, `${context}/Position muss größer als 0 sein.`);
  const calculatedCtr = impressions ? (clicks / impressions) * 100 : 0;
  invariant(Math.abs(calculatedCtr - ctrPercent) <= 0.00501, `${context}/CTR stimmt nicht mit Klicks und Impressionen überein.`);
  return { clicks, impressions, ctrPercent, position };
}

function loadSource(key, definition) {
  const filePath = path.join(INPUT_DIR, definition.file);
  invariant(fs.existsSync(filePath), `${definition.file} fehlt.`);
  const parsed = parseCsv(decodeUtf8(filePath), definition.file);
  invariant(arraysEqual(parsed.headers, definition.headers), `${definition.file} hat unerwartete Spalten: ${parsed.headers.join(" | ")}`);
  invariant(parsed.rows.length === definition.rows, `${definition.file} hat ${parsed.rows.length} statt ${definition.rows} Datenzeilen.`);
  const objects = rowsToObjects(parsed.headers, parsed.rows);
  if (definition.metric) objects.forEach((row, index) => metricFromRow(row, `${definition.file}:${index + 2}`));
  return { key, definition, filePath, objects };
}

function normalize(value) {
  return value
    .toLocaleLowerCase("de-DE")
    .replace(/ä/gu, "ae")
    .replace(/ö/gu, "oe")
    .replace(/ü/gu, "ue")
    .replace(/ß/gu, "ss")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/gu, "")
    .replace(/[^a-z0-9]+/gu, " ")
    .trim();
}

function hasDuesseldorf(value) {
  return ["duesseldorf", "dueesseldorf", "dusseldorf"].some((variant) => value.includes(variant));
}

function canonicalPage(rawUrl) {
  const url = new URL(rawUrl);
  invariant(url.protocol === "https:", `Seiten-URL verwendet nicht HTTPS: ${rawUrl}`);
  invariant(url.hostname === "www.floxant.de", `Seiten-URL gehört nicht zu www.floxant.de: ${rawUrl}`);
  const pathname = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/u, "");
  return { url: rawUrl, path: `${pathname}${url.search}` };
}

const queryRules = [
  ["duesseldorf-office-cleaning", (value) => value.includes("bueroreinigung") && hasDuesseldorf(value), "bueroreinigung", "duesseldorf", "/duesseldorf/bueroreinigung", "P1"],
  ["duesseldorf-practice-cleaning", (value) => value.includes("praxisreinigung") && hasDuesseldorf(value), "praxisreinigung", "duesseldorf", "/duesseldorf/praxisreinigung", "P1"],
  ["duesseldorf-window-cleaning", (value) => ["fensterreinigung", "fensterreiniger", "glasreinigung"].some((term) => value.includes(term)) && hasDuesseldorf(value), "fensterreinigung", "duesseldorf", "/duesseldorf/fensterreinigung", "P1"],
  ["duesseldorf-deep-cleaning", (value) => value.includes("grundreinigung") && hasDuesseldorf(value), "grundreinigung", "duesseldorf", "/duesseldorf/grundreinigung", "P1"],
  ["duesseldorf-maintenance-cleaning", (value) => value.includes("unterhaltsreinigung") && hasDuesseldorf(value), "unterhaltsreinigung", "duesseldorf", "/duesseldorf/unterhaltsreinigung", "P1"],
  ["duesseldorf-construction-cleaning", (value) => ["bauendreinigung", "baufeinreinigung", "baustellenreinigung", "baureinigung"].some((term) => value.includes(term)) && hasDuesseldorf(value), "baureinigung", "duesseldorf", "/duesseldorf/baureinigung", "P1"],
  ["duesseldorf-commercial-cleaning", (value) => value.includes("gewerbereinigung") && hasDuesseldorf(value), "gewerbereinigung", "duesseldorf", "/duesseldorf/gewerbereinigung", "P2"],
  ["duesseldorf-cleaning-hub", (value) => ["reinigungsdienst", "reinigungsfirma", "reinigungsunternehmen", "reinigungsfirmen", "gebaeudereinigung", "putzfirma", "reinigung"].some((term) => value.includes(term)) && hasDuesseldorf(value), "reinigung", "duesseldorf", "/duesseldorf/reinigung", "P1"],
  ["regensburg-household-clearance", (value) => ["wohnungsaufloesung", "haushaltsaufloesung"].some((term) => value.includes(term)) && value.includes("regensburg"), "wohnungsaufloesung", "regensburg", "/regensburg/wohnungsaufloesung", "P2"],
  ["regensburg-clearance", (value) => value.includes("entruempelung") && value.includes("regensburg"), "entruempelung", "regensburg", "/regensburg/entruempelung", "P2"],
  ["regensburg-move", (value) => ["umzug", "umzugsfirma", "umzugsunternehmen", "umzugsservice"].some((term) => value.includes(term)) && value.includes("regensburg"), "umzug", "regensburg", "/regensburg/umzug", "P1"],
  ["cleaning-offer", (value) => value.includes("reinig") && ["angebot", "kostenvoranschlag"].some((term) => value.includes(term)), "reinigungsangebot", "", "/reinigungsfirma-angebot", "P2"],
];

function calculatorIntent(normalized) {
  const explicitCalculator = ["rechner", "kalkul", "berechn", "schaetz"].some((term) => normalized.includes(term));
  const costIntent = explicitCalculator || ["kosten", "kostet", "preis", "preise", "festpreis"].some((term) => normalized.includes(term));
  if (!costIntent) return null;
  const cleaningIntent = normalized.includes("umzugsreinigung") || normalized.includes("reinig") || normalized.includes("fensterputz");
  const movingIntent = ["umzug", "umzugs", "fernumzug"].some((term) => normalized.includes(term));
  if (!normalized.includes("umzugsreinigung") && cleaningIntent && movingIntent) {
    return { type: "mixed", route: "/rechner", signal: explicitCalculator ? "EXPLICIT_CALCULATOR" : "BROAD_COST_OR_PRICE" };
  }
  if (cleaningIntent) {
    return { type: "cleaning", route: "/reinigung-preis-rechner", signal: explicitCalculator ? "EXPLICIT_CALCULATOR" : "BROAD_COST_OR_PRICE" };
  }
  if (["entruempel", "wohnungsaufloes", "haushaltsaufloes", "raeum", "entsorg"].some((term) => normalized.includes(term))) {
    return { type: "disposal", route: "/entsorgung-kosten-rechner", signal: explicitCalculator ? "EXPLICIT_CALCULATOR" : "BROAD_COST_OR_PRICE" };
  }
  if (movingIntent) {
    return { type: "moving", route: "/umzug-kosten-rechner", signal: explicitCalculator ? "EXPLICIT_CALCULATOR" : "BROAD_COST_OR_PRICE" };
  }
  return null;
}

function inferQuery(query, metrics) {
  const normalized = normalize(query);
  const calculator = calculatorIntent(normalized);
  const matched = queryRules.find(([, predicate]) => predicate(normalized));
  if (matched) {
    const [cluster, , service, city, route, priority] = matched;
    const protectedQuery =
      (cluster === "duesseldorf-deep-cleaning" && metrics.position <= 5) ||
      (cluster === "duesseldorf-construction-cleaning" && normalized.includes("bauendreinigung") && metrics.position <= 6);
    return {
      cluster,
      service,
      city,
      suggestedPrimaryRoute: route,
      priority,
      relationStatus: "LIKELY",
      relationBasis: "Semantische Intent-Übereinstimmung; Query- und Seitenexport bleiben getrennt, daher kein Query-zu-URL-Beweis.",
      calculator,
      irrelevant: false,
      protectedQuery,
    };
  }
  if (normalized === "floxant" || normalized.startsWith("floxant ")) {
    return {
      cluster: "brand",
      service: "",
      city: "",
      suggestedPrimaryRoute: "/",
      priority: "P2",
      relationStatus: "LIKELY",
      relationBasis: "Markenquery; semantische Zuordnung, nicht durch eine Query-zu-URL-Zeile bestätigt.",
      calculator,
      irrelevant: false,
      protectedQuery: false,
    };
  }
  if (calculator) {
    return {
      cluster: `${calculator.type}-calculator-intent`,
      service: calculator.type,
      city: "",
      suggestedPrimaryRoute: calculator.route,
      priority: "P2",
      relationStatus: calculator.signal === "EXPLICIT_CALCULATOR" ? "LIKELY" : "MANUAL_REVIEW",
      relationBasis: calculator.signal === "EXPLICIT_CALCULATOR"
        ? "Explizite Rechnerabsicht; die konkrete rankende URL ist im getrennten Export dennoch nicht bewiesen."
        : "Kosten-/Preisabsicht kann Rechner-, Ratgeber- oder Leistungsintention sein und erfordert manuelle Prüfung.",
      calculator,
      irrelevant: false,
      protectedQuery: false,
    };
  }
  const irrelevant = /\b(?:toepfekauf|lackiertechnologien)\b/u.test(normalized);
  return {
    cluster: irrelevant ? "irrelevant" : "unclassified",
    service: "",
    city: "",
    suggestedPrimaryRoute: "",
    priority: metrics.impressions >= 100 ? "P2" : "P3",
    relationStatus: irrelevant ? "UNCLEAR" : metrics.impressions >= 10 ? "MANUAL_REVIEW" : "UNCLEAR",
    relationBasis: irrelevant
      ? "Keine belastbare Übereinstimmung mit dem geprüften FLOXANT-Leistungs- und Rechnerumfang."
      : "Kein belastbarer Zielseitenhinweis im Query-Aggregat; manuelle Prüfung vor Seiten- oder Routingentscheidungen.",
    calculator: null,
    irrelevant,
    protectedQuery: false,
  };
}

const pageRules = new Map([
  ["/duesseldorf/reinigung", ["duesseldorf-cleaning-hub", "reinigung", "duesseldorf", "P0", true]],
  ["/duesseldorf/bueroreinigung", ["duesseldorf-office-cleaning", "bueroreinigung", "duesseldorf", "P1", false]],
  ["/duesseldorf/praxisreinigung", ["duesseldorf-practice-cleaning", "praxisreinigung", "duesseldorf", "P1", false]],
  ["/duesseldorf/fensterreinigung", ["duesseldorf-window-cleaning", "fensterreinigung", "duesseldorf", "P1", false]],
  ["/duesseldorf/grundreinigung", ["duesseldorf-deep-cleaning", "grundreinigung", "duesseldorf", "P1", true]],
  ["/duesseldorf/unterhaltsreinigung", ["duesseldorf-maintenance-cleaning", "unterhaltsreinigung", "duesseldorf", "P1", false]],
  ["/duesseldorf/baureinigung", ["duesseldorf-construction-cleaning", "baureinigung", "duesseldorf", "P1", true]],
  ["/duesseldorf/gewerbereinigung", ["duesseldorf-commercial-cleaning", "gewerbereinigung", "duesseldorf", "P2", false]],
  ["/regensburg/umzug", ["regensburg-move", "umzug", "regensburg", "P1", false]],
  ["/regensburg/entruempelung", ["regensburg-clearance", "entruempelung", "regensburg", "P2", false]],
  ["/regensburg/wohnungsaufloesung", ["regensburg-household-clearance", "wohnungsaufloesung", "regensburg", "P2", false]],
  ["/reinigungsfirma-angebot", ["cleaning-offer", "reinigungsangebot", "", "P2", false]],
  ["/rechner", ["calculator-hub", "calculator", "", "P1", false]],
  ["/umzug-kosten-rechner", ["moving-calculator", "moving", "", "P1", false]],
  ["/reinigung-preis-rechner", ["cleaning-calculator", "cleaning", "", "P1", false]],
  ["/entsorgung-kosten-rechner", ["disposal-calculator", "disposal", "", "P2", false]],
]);

function inferPage(pagePath) {
  const pathname = pagePath.split("?")[0];
  const rule = pageRules.get(pathname);
  const calculatorType = pathname === "/rechner"
    ? "hub"
    : pathname.includes("umzug-kosten-rechner")
      ? "moving"
      : pathname.includes("reinigung-preis-rechner")
        ? "cleaning"
        : pathname.includes("entsorgung-kosten-rechner")
          ? "disposal"
          : "";
  if (rule) {
    const [cluster, service, city, priority, protectedRoute] = rule;
    return { cluster, service, city, priority, protectedRoute, likelyCannibalization: false, relatedPrimaryRouteForReview: pathname, calculatorType };
  }
  if (["/duesseldorf/reinigungsfirma", "/duesseldorf/reinigungsdienst"].includes(pathname)) {
    return {
      cluster: "duesseldorf-cleaning-hub-variant",
      service: "reinigung",
      city: "duesseldorf",
      priority: "P2",
      protectedRoute: false,
      likelyCannibalization: true,
      relatedPrimaryRouteForReview: "/duesseldorf/reinigung",
      calculatorType: "",
    };
  }
  if (pathname === "/ratgeber/umzug-kosten-rechner") {
    return {
      cluster: "moving-calculator-guide",
      service: "moving",
      city: "",
      priority: "P2",
      protectedRoute: false,
      likelyCannibalization: true,
      relatedPrimaryRouteForReview: "/umzug-kosten-rechner",
      calculatorType: "moving",
    };
  }
  return {
    cluster: "unclassified",
    service: "",
    city: "",
    priority: "P3",
    protectedRoute: false,
    likelyCannibalization: false,
    relatedPrimaryRouteForReview: "",
    calculatorType,
  };
}

function classificationsFor(metrics, dimension, context) {
  const classes = new Set();
  const metricWinner = metrics.clicks >= 2 && metrics.impressions >= 5 && metrics.position <= 10;
  if (context.protectedRoute || context.protectedQuery || metricWinner) classes.add("PROTECT_WINNER");
  if (metrics.impressions >= 100 && metrics.ctrPercent < 1) classes.add("HIGH_IMPRESSIONS_LOW_CTR");
  if (metrics.clicks === 0 && metrics.impressions >= 10 && metrics.position >= 1 && metrics.position <= 5) classes.add("POSITION_1_TO_5_NO_CLICK");
  if (metrics.impressions >= 10 && metrics.position > 5 && metrics.position <= 10 && metrics.ctrPercent < 1) classes.add("POSITION_6_TO_10_LOW_CTR");
  if (metrics.impressions >= 10 && metrics.position > 10 && metrics.position <= 20) classes.add("POSITION_11_TO_20");
  if (dimension === "PAGE" && context.service && metrics.impressions >= 10 && metrics.position > 20) classes.add("WEAK_SERVICE_PAGE");
  if (context.likelyCannibalization) {
    classes.add("LIKELY_CANNIBALIZATION");
    classes.add("MANUAL_REVIEW");
  }
  if (dimension === "QUERY" && context.irrelevant) classes.add("IRRELEVANT_QUERY");
  if (metrics.impressions < 10) classes.add("NEW_OR_LOW_DATA");
  if (dimension === "QUERY" && context.relationStatus === "MANUAL_REVIEW") classes.add("MANUAL_REVIEW");
  if (!classes.size) classes.add("MANUAL_REVIEW");
  return ALLOWED_CLASSIFICATIONS.filter((classification) => classes.has(classification));
}

function recommendedAction(classes, dimension, context) {
  if (classes.includes("IRRELEVANT_QUERY")) return "Nicht auf eine neue Seite ausrichten; Relevanz manuell bestätigen.";
  if (classes.includes("LIKELY_CANNIBALIZATION")) return "Historie, Canonical, Sitemap und interne Links manuell prüfen; keinen Redirect aus GSC-Aggregaten ableiten.";
  if (classes.includes("PROTECT_WINNER") && classes.includes("HIGH_IMPRESSIONS_LOW_CTR")) return "URL und Hauptsignale schützen; höchstens einen kontrollierten Snippet-Test über mindestens 28 Tage messen.";
  if (classes.includes("PROTECT_WINNER")) return "Gewinner-Signale schützen; keine radikale URL-, Canonical- oder Inhaltsänderung.";
  if (classes.includes("HIGH_IMPRESSIONS_LOW_CTR")) return "Title, Description und erste sichtbare Aussage kontrolliert prüfen; keine Query-zu-URL-Zuordnung behaupten.";
  if (classes.includes("POSITION_1_TO_5_NO_CLICK")) return "Snippet und Suchintention prüfen; vorhandene Zielseite vor einer neuen Seite manuell bestätigen.";
  if (classes.includes("POSITION_6_TO_10_LOW_CTR")) return "CTR-Hypothese mit einer begrenzten Snippet-Änderung testen und 28 Tage messen.";
  if (classes.includes("POSITION_11_TO_20")) return "Intent-spezifischen Inhalt und interne Links prüfen; keine Synonymseite erzeugen.";
  if (classes.includes("WEAK_SERVICE_PAGE")) return "Indexierbarkeit, Canonical, Sitemap, interne Links und Seitenfokus prüfen.";
  if (classes.includes("NEW_OR_LOW_DATA")) return "Mehr Daten sammeln; keine Routing- oder Redirect-Entscheidung treffen.";
  return dimension === "QUERY"
    ? "Query manuell prüfen; der getrennte Export beweist keine Zielseite."
    : `Seite manuell prüfen${context.relatedPrimaryRouteForReview ? `; Bezug zu ${context.relatedPrimaryRouteForReview} ist nur ein Review-Hinweis` : ""}.`;
}

function redactQuery(value) {
  return value
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/giu, "[REDACTED_EMAIL]")
    .replace(/(?:\+?\d[\d\s()./-]{7,}\d)/gu, "[REDACTED_PHONE]");
}

function csvCell(value) {
  let text = String(value ?? "");
  if (/^[=+\-@]/u.test(text)) text = `'${text}`;
  return /[",\r\n]/u.test(text) ? `"${text.replace(/"/gu, '""')}"` : text;
}

function writeCsv(filePath, headers, rows) {
  const text = [headers.join(","), ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(","))].join("\n");
  fs.writeFileSync(filePath, `${text}\n`, "utf8");
}

function classCounts(rows) {
  return Object.fromEntries(ALLOWED_CLASSIFICATIONS.map((classification) => [
    classification,
    rows.filter((row) => row.classifications.split("|").includes(classification)).length,
  ]));
}

invariant(fs.existsSync(INPUT_DIR) && fs.statSync(INPUT_DIR).isDirectory(), `Eingabeverzeichnis fehlt: ${INPUT_DIR}`);
const relativeInput = path.relative(ROOT, INPUT_DIR).replaceAll(path.sep, "/");
const ignored = spawnSync("git", ["check-ignore", "--quiet", relativeInput], { cwd: ROOT });
invariant(ignored.status === 0, `${relativeInput} ist nicht gitignoriert.`);
const trackedPrivateFiles = execFileSync("git", ["ls-files", "--", relativeInput], { cwd: ROOT, encoding: "utf8" }).trim();
invariant(!trackedPrivateFiles, `Private GSC-Rohdaten sind von Git erfasst: ${trackedPrivateFiles}`);

const sources = Object.fromEntries(Object.entries(SOURCE_DEFINITIONS).map(([key, definition]) => [key, loadSource(key, definition)]));
const sourceHashesBefore = Object.fromEntries(Object.values(sources).map((source) => [source.definition.file, sha256(source.filePath)]));

const chartRows = sources.chart.objects.map((row, index) => ({ date: row.Datum, ...metricFromRow(row, `Diagramm.csv:${index + 2}`) }));
const dates = chartRows.map((row) => row.date);
invariant(dates[0] === "2026-07-12" && dates.at(-1) === "2026-08-08", `Unerwarteter Datumsbereich: ${dates[0]}–${dates.at(-1)}`);
invariant(new Set(dates).size === 28, "Diagramm.csv enthält doppelte Tageswerte.");
for (let index = 1; index < dates.length; index += 1) {
  const previous = Date.parse(`${dates[index - 1]}T00:00:00Z`);
  const current = Date.parse(`${dates[index]}T00:00:00Z`);
  invariant(current - previous === 86_400_000, `Datumsreihe ist zwischen ${dates[index - 1]} und ${dates[index]} nicht lückenlos.`);
}

const totals = chartRows.reduce((sum, row) => ({ clicks: sum.clicks + row.clicks, impressions: sum.impressions + row.impressions }), { clicks: 0, impressions: 0 });
const weightedPosition = chartRows.reduce((sum, row) => sum + row.position * row.impressions, 0) / totals.impressions;
invariant(totals.clicks === 67, `Diagramm-Klicks sind ${totals.clicks} statt 67.`);
invariant(totals.impressions === 13_093, `Diagramm-Impressionen sind ${totals.impressions} statt 13093.`);
invariant(round((totals.clicks / totals.impressions) * 100, 2) === 0.51, "Gesamt-CTR ist nicht 0,51 %." );
invariant(round(weightedPosition, 2) === 16.71, "Gewichtete Gesamtposition ist nicht 16,71.");

const filterMap = new Map(sources.filters.objects.map((row) => [normalize(row.Filtern), normalize(row.Wert)]));
invariant(filterMap.get("suchtyp") === "web", "Filter Suchtyp ist nicht Web.");
invariant(filterMap.get("datum") === "letzte 28 tage", "Filter Datum ist nicht Letzte 28 Tage.");

const deviceName = { Mobil: "mobile", Computer: "desktop", Tablet: "tablet" };
const deviceMetrics = sources.devices.objects.map((row, index) => ({
  sourceLabel: row.Gerät,
  device: deviceName[row.Gerät],
  ...metricFromRow(row, `Geräte.csv:${index + 2}`),
}));
invariant(deviceMetrics.every((row) => row.device), "Geräte.csv enthält ein unerwartetes Gerät.");
const deviceTotals = deviceMetrics.reduce((sum, row) => ({ clicks: sum.clicks + row.clicks, impressions: sum.impressions + row.impressions }), { clicks: 0, impressions: 0 });
invariant(deviceTotals.clicks === totals.clicks && deviceTotals.impressions === totals.impressions, "Gerätesummen stimmen nicht mit Diagramm.csv überein.");
const mobile = deviceMetrics.find((row) => row.device === "mobile");
const desktop = deviceMetrics.find((row) => row.device === "desktop");
const tablet = deviceMetrics.find((row) => row.device === "tablet");
invariant(mobile.clicks === 45 && mobile.impressions === 3_900 && mobile.ctrPercent === 1.15 && mobile.position === 12.22, "Mobilwerte weichen von den erwarteten Werten ab.");
invariant(desktop.clicks === 21 && desktop.impressions === 9_014 && desktop.ctrPercent === 0.23 && desktop.position === 18.52, "Desktopwerte weichen von den erwarteten Werten ab.");
invariant(tablet.clicks === 1 && tablet.impressions === 179 && tablet.ctrPercent === 0.56 && tablet.position === 24.09, "Tabletwerte weichen von den erwarteten Werten ab.");

const countryMetrics = sources.countries.objects.map((row, index) => ({ country: row.Land, ...metricFromRow(row, `Länder.csv:${index + 2}`) }));
const countryTotals = countryMetrics.reduce((sum, row) => ({ clicks: sum.clicks + row.clicks, impressions: sum.impressions + row.impressions }), { clicks: 0, impressions: 0 });
invariant(countryTotals.clicks === totals.clicks && countryTotals.impressions === totals.impressions, "Ländersummen stimmen nicht mit Diagramm.csv überein.");
const germany = countryMetrics.find((row) => row.country === "Deutschland");
invariant(germany?.clicks === 62 && germany?.impressions === 12_324 && germany?.ctrPercent === 0.5 && germany?.position === 16.37, "Deutschlandwerte weichen von den erwarteten Werten ab.");

const queryLabels = sources.queries.objects.map((row) => row["Häufigste Suchanfragen"]);
const pageLabels = sources.pages.objects.map((row) => row["Die häufigsten Seiten"]);
invariant(new Set(queryLabels).size === queryLabels.length, "Suchanfragen.csv enthält doppelte Query-Zeilen.");
invariant(new Set(pageLabels).size === pageLabels.length, "Seiten.csv enthält doppelte Seiten-Zeilen.");

const queryRows = sources.queries.objects.map((row, index) => {
  const query = row["Häufigste Suchanfragen"];
  const metrics = metricFromRow(row, `Suchanfragen.csv:${index + 2}`);
  const context = inferQuery(query, metrics);
  const classifications = classificationsFor(metrics, "QUERY", context);
  return {
    aggregateType: "QUERY",
    sourceFile: SOURCE_DEFINITIONS.queries.file,
    sourceRow: index + 2,
    query: redactQuery(query),
    ...metrics,
    priority: context.priority,
    classifications: classifications.join("|"),
    cluster: context.cluster,
    service: context.service,
    city: context.city,
    suggestedPrimaryRoute: context.suggestedPrimaryRoute,
    relationStatus: context.relationStatus,
    relationBasis: context.relationBasis,
    recommendedAction: recommendedAction(classifications, "QUERY", context),
    _context: context,
  };
});

const pageRows = sources.pages.objects.map((row, index) => {
  const rawUrl = row["Die häufigsten Seiten"];
  const page = canonicalPage(rawUrl);
  const metrics = metricFromRow(row, `Seiten.csv:${index + 2}`);
  const context = inferPage(page.path);
  const classifications = classificationsFor(metrics, "PAGE", context);
  return {
    aggregateType: "PAGE",
    sourceFile: SOURCE_DEFINITIONS.pages.file,
    sourceRow: index + 2,
    pageUrl: page.url,
    path: page.path,
    ...metrics,
    priority: context.priority,
    classifications: classifications.join("|"),
    cluster: context.cluster,
    service: context.service,
    city: context.city,
    relatedPrimaryRouteForReview: context.relatedPrimaryRouteForReview,
    evidenceBoundary: "Nur Seitenaggregat; keine Query-Zuordnung und keine Redirect-Ableitung.",
    recommendedAction: recommendedAction(classifications, "PAGE", context),
    _context: context,
  };
});

const deviceRows = deviceMetrics.map((row) => {
  const classifications = row.device === "mobile"
    ? "PROTECT_WINNER"
    : row.device === "desktop"
      ? "HIGH_IMPRESSIONS_LOW_CTR"
      : "NEW_OR_LOW_DATA";
  const scenarioClicks = (row.impressions * mobile.ctrPercent) / 100;
  return {
    sourceFile: SOURCE_DEFINITIONS.devices.file,
    device: row.device,
    sourceLabel: row.sourceLabel,
    clicks: row.clicks,
    impressions: row.impressions,
    impressionSharePercent: round((row.impressions / totals.impressions) * 100, 2),
    ctrPercent: row.ctrPercent,
    mobileMinusDeviceCtrPercentagePoints: round(mobile.ctrPercent - row.ctrPercent, 2),
    ctrIndexVsMobilePercent: round((row.ctrPercent / mobile.ctrPercent) * 100, 2),
    position: row.position,
    positionDifferenceVsMobile: round(row.position - mobile.position, 2),
    scenarioClicksAtMobileCtr: round(scenarioClicks, 2),
    scenarioAdditionalClicksAtMobileCtr: round(Math.max(0, scenarioClicks - row.clicks), 2),
    classifications,
    scenarioBoundary: "Reine Vergleichsrechnung bei gleicher CTR wie Mobil; keine Prognose.",
    recommendedAction: row.device === "desktop"
      ? "Desktop-Snippets, sichtbare Hauptaussage und Klickpfad priorisiert prüfen; Rankings nicht pauschal ändern."
      : row.device === "mobile"
        ? "Mobile CTR als Vergleichsbasis schützen und UX nicht verschlechtern."
        : "Zu wenig Tablet-Daten für belastbare Änderungen.",
  };
});

const calculatorQueryRows = queryRows.filter((row) => row._context.calculator).map((row) => ({
  aggregateType: "QUERY",
  sourceFile: row.sourceFile,
  sourceRow: row.sourceRow,
  label: row.query,
  clicks: row.clicks,
  impressions: row.impressions,
  ctrPercent: row.ctrPercent,
  position: row.position,
  calculatorType: row._context.calculator.type,
  calculatorSignal: row._context.calculator.signal,
  candidateCalculatorRoute: row._context.calculator.route,
  priority: row.priority,
  classifications: row.classifications,
  relationStatus: row._context.calculator.signal === "EXPLICIT_CALCULATOR" ? "LIKELY" : "MANUAL_REVIEW",
  relationBasis: row._context.calculator.signal === "EXPLICIT_CALCULATOR"
    ? "Explizite Rechnerabsicht; die konkrete rankende URL bleibt im getrennten Export unbewiesen."
    : "Nur breite Kosten-/Preisabsicht; Rechner-, Ratgeber- oder Leistungsintention muss manuell unterschieden werden.",
  recommendedAction: row.recommendedAction,
}));
const calculatorPageRows = pageRows.filter((row) => row._context.calculatorType).map((row) => ({
  aggregateType: "PAGE",
  sourceFile: row.sourceFile,
  sourceRow: row.sourceRow,
  label: row.path,
  clicks: row.clicks,
  impressions: row.impressions,
  ctrPercent: row.ctrPercent,
  position: row.position,
  calculatorType: row._context.calculatorType,
  calculatorSignal: "PAGE_ROUTE",
  candidateCalculatorRoute: row._context.relatedPrimaryRouteForReview,
  priority: row.priority,
  classifications: row.classifications,
  relationStatus: "MANUAL_REVIEW",
  relationBasis: "Eigenständige Zeile aus dem Seitenaggregat; nicht mit Query-Zeilen verknüpft.",
  recommendedAction: row.recommendedAction,
}));
const calculatorRows = [...calculatorQueryRows, ...calculatorPageRows];

fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
const queryHeaders = ["aggregateType", "sourceFile", "sourceRow", "query", "clicks", "impressions", "ctrPercent", "position", "priority", "classifications", "cluster", "service", "city", "suggestedPrimaryRoute", "relationStatus", "relationBasis", "recommendedAction"];
const pageHeaders = ["aggregateType", "sourceFile", "sourceRow", "pageUrl", "path", "clicks", "impressions", "ctrPercent", "position", "priority", "classifications", "cluster", "service", "city", "relatedPrimaryRouteForReview", "evidenceBoundary", "recommendedAction"];
const deviceHeaders = ["sourceFile", "device", "sourceLabel", "clicks", "impressions", "impressionSharePercent", "ctrPercent", "mobileMinusDeviceCtrPercentagePoints", "ctrIndexVsMobilePercent", "position", "positionDifferenceVsMobile", "scenarioClicksAtMobileCtr", "scenarioAdditionalClicksAtMobileCtr", "classifications", "scenarioBoundary", "recommendedAction"];
const calculatorHeaders = ["aggregateType", "sourceFile", "sourceRow", "label", "clicks", "impressions", "ctrPercent", "position", "calculatorType", "calculatorSignal", "candidateCalculatorRoute", "priority", "classifications", "relationStatus", "relationBasis", "recommendedAction"];

writeCsv(OUTPUTS.queries, queryHeaders, queryRows);
writeCsv(OUTPUTS.pages, pageHeaders, pageRows);
writeCsv(OUTPUTS.devices, deviceHeaders, deviceRows);
writeCsv(OUTPUTS.calculators, calculatorHeaders, calculatorRows);

const queryDimensionTotals = queryRows.reduce((sum, row) => ({ clicks: sum.clicks + row.clicks, impressions: sum.impressions + row.impressions }), { clicks: 0, impressions: 0 });
const pageDimensionTotals = pageRows.reduce((sum, row) => ({ clicks: sum.clicks + row.clicks, impressions: sum.impressions + row.impressions }), { clicks: 0, impressions: 0 });
const summary = {
  schemaVersion: "1.0.0",
  exportDate: EXPORT_DATE,
  property: "https://www.floxant.de/",
  sourceStorage: `data/private/search-console/${EXPORT_DATE}/`,
  rawFilesCommitted: false,
  validation: {
    status: "PASS",
    requiredCsvFiles: Object.values(SOURCE_DEFINITIONS).map((definition) => definition.file),
    validatedCsvFileCount: Object.keys(SOURCE_DEFINITIONS).length,
    rowCounts: Object.fromEntries(Object.entries(SOURCE_DEFINITIONS).map(([key, definition]) => [key, definition.rows])),
    utf8: "PASS",
    headers: "PASS",
    columnCounts: "PASS",
    numericValues: "PASS",
    ctrReconciliationWithinDisplayRounding: "PASS",
    uniqueQueryAndPageLabels: "PASS",
    dateRange: { start: dates[0], end: dates.at(-1), days: dates.length, continuous: true },
    filter: { searchType: "Web", period: "Letzte 28 Tage" },
    searchAppearanceRows: sources.appearances.objects.length,
    chartMatchesDeviceTotals: true,
    chartMatchesCountryTotals: true,
    privateSourceGitIgnored: true,
    privateSourceTrackedFiles: 0,
    sourceFilesUnmodifiedDuringImport: true,
  },
  overall: {
    clicks: totals.clicks,
    impressions: totals.impressions,
    ctrPercent: round((totals.clicks / totals.impressions) * 100, 2),
    weightedAveragePosition: round(weightedPosition, 2),
  },
  separateDimensionAggregates: {
    queries: { rows: queryRows.length, ...queryDimensionTotals },
    pages: { rows: pageRows.length, ...pageDimensionTotals },
    reconciliationRule: "Query- und Seitenwerte sind getrennte Dimension-Aggregate und werden weder miteinander noch ersatzweise mit den Site-Gesamtwerten summiert.",
  },
  dimensionCoverage: {
    queryClickCoveragePercent: round((queryDimensionTotals.clicks / totals.clicks) * 100, 2),
    queryImpressionCoveragePercent: round((queryDimensionTotals.impressions / totals.impressions) * 100, 2),
    pageClickRatioPercent: round((pageDimensionTotals.clicks / totals.clicks) * 100, 2),
    pageImpressionRatioPercent: round((pageDimensionTotals.impressions / totals.impressions) * 100, 2),
    ratiosAreDiagnosticOnly: true,
  },
  sourceDeduplication: {
    processedLogicalCsvTables: 7,
    processedArchives: 0,
    ignoredArchives: fs.readdirSync(INPUT_DIR).filter((name) => path.extname(name).toLocaleLowerCase("de-DE") === ".zip"),
    logicalTablesProcessedExactlyOnce: true,
  },
  devices: Object.fromEntries(deviceMetrics.map((row) => [row.device, {
    clicks: row.clicks,
    impressions: row.impressions,
    ctrPercent: row.ctrPercent,
    position: row.position,
  }])),
  desktopCtrGap: {
    mobileMinusDesktopPercentagePoints: round(mobile.ctrPercent - desktop.ctrPercent, 2),
    desktopCtrIndexVsMobilePercent: round((desktop.ctrPercent / mobile.ctrPercent) * 100, 2),
    desktopMinusMobilePosition: round(desktop.position - mobile.position, 2),
    desktopImpressionSharePercent: round((desktop.impressions / totals.impressions) * 100, 2),
    scenarioAdditionalDesktopClicksAtMobileCtr: round((desktop.impressions * mobile.ctrPercent) / 100 - desktop.clicks, 2),
    scenarioIsNotForecast: true,
  },
  countryFocus: {
    germany: {
      clicks: germany.clicks,
      impressions: germany.impressions,
      ctrPercent: germany.ctrPercent,
      position: germany.position,
    },
  },
  methodology: {
    queryAndPageExportsAreSeparateAggregates: true,
    queryToUrlRelationsAreNotTreatedAsProof: true,
    allowedRelationLabels: ALLOWED_RELATION_LABELS,
    confirmedQueryToUrlMappings: 0,
    redirectsInferred: false,
    redirectRecommendations: [],
    allowedClassifications: ALLOWED_CLASSIFICATIONS,
    technicalCannibalizationConfirmedFromGscAggregates: 0,
    contentOverlapConfirmedFromGscAggregates: 0,
  },
  opportunityCounts: {
    queries: classCounts(queryRows),
    pages: classCounts(pageRows),
    calculatorQueryRows: calculatorQueryRows.length,
    calculatorPageRows: calculatorPageRows.length,
  },
  gscPriorityFramework: {
    P0: ["/duesseldorf/reinigung"],
    P1: [
      "/duesseldorf/bueroreinigung",
      "/duesseldorf/praxisreinigung",
      "/duesseldorf/fensterreinigung",
      "/duesseldorf/grundreinigung",
      "/duesseldorf/unterhaltsreinigung",
      "/duesseldorf/baureinigung",
      "/regensburg/umzug",
    ],
    P2: ["/regensburg/entruempelung", "/regensburg/wohnungsaufloesung", "/reinigungsfirma-angebot"],
  },
  observedPriorityPages: {
    P0: pageRows.filter((row) => row.priority === "P0").map((row) => row.path),
    P1: pageRows.filter((row) => row.priority === "P1").map((row) => row.path),
    P2: pageRows.filter((row) => row.priority === "P2").map((row) => row.path),
  },
  protectedWinnerQueries: queryRows.filter((row) => row.classifications.split("|").includes("PROTECT_WINNER")).map((row) => row.query),
  protectedWinnerPages: pageRows.filter((row) => row.classifications.split("|").includes("PROTECT_WINNER")).map((row) => row.path),
  highImpressionLowCtrPages: pageRows.filter((row) => row.classifications.split("|").includes("HIGH_IMPRESSIONS_LOW_CTR")).map((row) => row.path),
  manualCannibalizationReviewPages: pageRows.filter((row) => row.classifications.split("|").includes("LIKELY_CANNIBALIZATION")).map((row) => row.path),
};
fs.writeFileSync(OUTPUTS.summary, `${JSON.stringify(summary, null, 2)}\n`, "utf8");

for (const [fileName, hash] of Object.entries(sourceHashesBefore)) {
  invariant(sha256(path.join(INPUT_DIR, fileName)) === hash, `${fileName} wurde während des Imports verändert.`);
}

function verifyOutputCsv(filePath, expectedHeaders, expectedRows, dimension) {
  const parsed = parseCsv(decodeUtf8(filePath), path.basename(filePath));
  invariant(arraysEqual(parsed.headers, expectedHeaders), `${path.basename(filePath)} hat unerwartete Ausgabespalten.`);
  invariant(parsed.rows.length === expectedRows, `${path.basename(filePath)} hat ${parsed.rows.length} statt ${expectedRows} Ausgabezeilen.`);
  const objects = rowsToObjects(parsed.headers, parsed.rows);
  for (const row of objects) {
    if (row.classifications) {
      for (const classification of row.classifications.split("|")) {
        invariant(ALLOWED_CLASSIFICATION_SET.has(classification), `${path.basename(filePath)} enthält verbotene Klassifizierung ${classification}.`);
      }
    }
    if (row.relationStatus) {
      invariant(ALLOWED_RELATION_SET.has(row.relationStatus), `${path.basename(filePath)} enthält verbotenen Relationsstatus ${row.relationStatus}.`);
    }
    if (dimension) invariant(row.aggregateType === dimension, `${path.basename(filePath)} vermischt Aggregattypen.`);
  }
  return objects;
}

verifyOutputCsv(OUTPUTS.queries, queryHeaders, queryRows.length, "QUERY");
verifyOutputCsv(OUTPUTS.pages, pageHeaders, pageRows.length, "PAGE");
verifyOutputCsv(OUTPUTS.devices, deviceHeaders, deviceRows.length, "");
const verifiedCalculatorRows = verifyOutputCsv(OUTPUTS.calculators, calculatorHeaders, calculatorRows.length, "");
invariant(verifiedCalculatorRows.slice(0, calculatorQueryRows.length).every((row) => row.aggregateType === "QUERY"), "Rechnerartefakt hält den Query-Block nicht getrennt.");
invariant(verifiedCalculatorRows.slice(calculatorQueryRows.length).every((row) => row.aggregateType === "PAGE"), "Rechnerartefakt hält den Seiten-Block nicht getrennt.");
const parsedSummary = JSON.parse(decodeUtf8(OUTPUTS.summary));
invariant(parsedSummary.validation.status === "PASS", "Zusammenfassung hat keinen PASS-Status.");
invariant(parsedSummary.methodology.confirmedQueryToUrlMappings === 0, "Zusammenfassung behauptet bestätigte Query-zu-URL-Zuordnungen.");
invariant(parsedSummary.methodology.redirectRecommendations.length === 0, "Zusammenfassung enthält aus GSC abgeleitete Redirects.");
invariant(decodeUtf8(OUTPUTS.queries).includes("düsseldorf"), "Deutsche UTF-8-Zeichen fehlen im Query-Artefakt.");

console.log(`GSC_AUGUST_IMPORT_PASS export_date=${EXPORT_DATE} csv_files=7 date_range=${dates[0]}..${dates.at(-1)}`);
console.log(`GSC_TOTALS clicks=${totals.clicks} impressions=${totals.impressions} ctr=${round((totals.clicks / totals.impressions) * 100, 2)}% position=${round(weightedPosition, 2)}`);
console.log(`GSC_DEVICES mobile_ctr=${mobile.ctrPercent}% desktop_ctr=${desktop.ctrPercent}% tablet_ctr=${tablet.ctrPercent}% mobile_minus_desktop=${round(mobile.ctrPercent - desktop.ctrPercent)}pp`);
console.log(`GSC_ROWS queries=${queryRows.length} pages=${pageRows.length} countries=${countryMetrics.length} devices=${deviceRows.length} calculator_queries=${calculatorQueryRows.length} calculator_pages=${calculatorPageRows.length}`);
console.log(`GSC_COUNTRY_DE clicks=${germany.clicks} impressions=${germany.impressions} ctr=${germany.ctrPercent}% position=${germany.position}`);
