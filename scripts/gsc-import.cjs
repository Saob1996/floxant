const fs = require("fs");
const path = require("path");

const root = process.cwd();
const dataDir = path.join(root, "data", "gsc");
const docsDir = path.join(root, "docs");
const reportPath = path.join(docsDir, "GSC_IMPORT_REPORT.md");
const mappingPath = path.join(docsDir, "QUERY_TO_PAGE_MAPPING.md");
const jsonPath = path.join(root, "gsc-import-report.json");

const expectedFiles = [
  { key: "queries28d", file: "gsc-queries-28d.csv", type: "query", range: "28d" },
  { key: "queries90d", file: "gsc-queries-90d.csv", type: "query", range: "90d" },
  { key: "pages28d", file: "gsc-pages-28d.csv", type: "page", range: "28d" },
  { key: "pages90d", file: "gsc-pages-90d.csv", type: "page", range: "90d" },
];

const targetSeeds = [
  ["angebot pruefen", "Angebot pruefen", "vorhandenes Angebot einordnen", "angebot-pruefen", "", "/angebot-guenstiger-pruefen", "add_offercheck_cta", "P0"],
  ["angebotscheck", "Angebot pruefen", "Red Flags und offene Punkte vor Zusage", "angebot-pruefen", "", "/angebotscheck", "improve_title_description", "P0"],
  ["anbieter vergleichen", "Anbieter vergleichen", "Dienstleister ohne reine Preisfalle vergleichen", "angebot-pruefen", "", "/anbieter-vergleichen", "improve_internal_links", "P0"],
  ["reinigungsfirma angebot", "Reinigungsangebot", "Reinigungsangebot anfragen oder pruefen", "reinigung", "", "/reinigungsfirma-angebot", "improve_title_description", "P0"],
  ["reinigung duesseldorf", "Reinigung", "lokale Reinigung anfragen", "reinigung", "duesseldorf", "/duesseldorf/reinigung", "improve_content", "P0"],
  ["bueroreinigung duesseldorf", "Bueroreinigung", "Firmenflaechen mit Raumliste und Turnus", "bueroreinigung", "duesseldorf", "/duesseldorf/bueroreinigung", "improve_internal_links", "P0"],
  ["gewerbereinigung duesseldorf", "Gewerbereinigung", "Objekt, Flaeche und Turnus klaeren", "gewerbereinigung", "duesseldorf", "/duesseldorf/gewerbereinigung", "improve_title_description", "P0"],
  ["praxisreinigung duesseldorf", "Praxisreinigung", "Praxisraeume nach Flaeche und Zeitfenster klaeren", "praxisreinigung", "duesseldorf", "/duesseldorf/praxisreinigung", "improve_title_description", "P0"],
  ["fensterreinigung duesseldorf", "Fensterreinigung", "Fenster, Glas und Zugang klaeren", "fensterreinigung", "duesseldorf", "/duesseldorf/fensterreinigung", "improve_internal_links", "P0"],
  ["umzug regensburg", "Umzug", "lokalen Umzug mit Volumen und Zugang anfragen", "umzug", "regensburg", "/regensburg/umzug", "add_offercheck_cta", "P0"],
  ["reinigung regensburg", "Reinigung", "Reinigung mit Objekt und Termin anfragen", "reinigung", "regensburg", "/regensburg/reinigung", "add_offercheck_cta", "P0"],
  ["entruempelung regensburg", "Entruempelung", "Raeumung mit Menge, Zugang und Termin klaeren", "entruempelung", "regensburg", "/regensburg/entruempelung", "add_offercheck_cta", "P0"],
  ["gewerbereinigung regensburg", "Gewerbereinigung", "gewerbliche Flaechen in Regensburg anfragen", "gewerbereinigung", "regensburg", "/regensburg/gewerbereinigung", "improve_internal_links", "P1"],
  ["bueroreinigung regensburg", "Bueroreinigung", "Bueroflaechen, Turnus und Raumliste klaeren", "bueroreinigung", "regensburg", "/regensburg/bueroreinigung", "improve_internal_links", "P1"],
  ["klaviertransport regensburg", "Klaviertransport", "Instrument, Etage und Zugang klaeren", "klaviertransport", "regensburg", "/klaviertransport-regensburg", "improve_title_description", "P0"],
  ["b2b bueroreinigung", "B2B", "Firmenreinigung mit Angebot", "bueroreinigung", "duesseldorf", "/duesseldorf/bueroreinigung", "improve_internal_links", "P0"],
  ["diskreter service", "Diskret-Service", "sensible Anfrage mit sicherem Kontaktweg", "diskret-service", "", "/diskreter-umzug-trennung-scheidung", "improve_content", "P0"],
  ["solarreinigung", "Solarreinigung/PV", "PV-Flaeche, Zugang und Sicherheit klaeren", "solarreinigung", "", "/solarreinigung", "add_offercheck_cta", "P1"],
  ["pv anlagen reinigung", "Solarreinigung/PV", "PV-Module und Dachzugang klaeren", "pv-anlagen-reinigung", "", "/pv-anlagen-reinigung", "add_offercheck_cta", "P1"],
  ["seniorenumzug bayern", "Seniorenumzug", "Umzug im Alter ruhig abstimmen", "seniorenumzug", "bayern", "/seniorenumzug-bayern", "improve_internal_links", "P1"],
];

const clusterRules = [
  ["Brand", ["floxant"]],
  ["Angebot pruefen", ["angebot", "angebote", "angebotscheck", "pruefen", "vergleich", "guenstiger", "zweiteinschaetzung"]],
  ["Reinigungsangebot", ["reinigungsangebot", "reinigungsfirma angebot", "angebot reinigung"]],
  ["Reinigung", ["reinigung", "putz", "cleaning", "endreinigung", "grundreinigung", "wohnungsreinigung"]],
  ["Bueroreinigung", ["bueroreinigung", "buero", "office", "kanzlei"]],
  ["Gewerbereinigung", ["gewerbe", "gewerbereinigung", "objektreinigung", "firma", "b2b"]],
  ["Praxisreinigung", ["praxis", "arztpraxis"]],
  ["Fensterreinigung", ["fenster", "glasreinigung"]],
  ["Umzug", ["umzug", "umzugs", "moving", "transport"]],
  ["Seniorenumzug", ["senior", "alter", "angehoerige"]],
  ["Klaviertransport", ["klavier", "piano"]],
  ["Fernumzug", ["fernumzug", "fernstrecke"]],
  ["Entruempelung", ["entruempelung", "raeumung", "entsorgung", "keller"]],
  ["Haushaltsaufloesung", ["haushaltsaufloesung", "wohnungsaufloesung", "hausaufloesung", "nachlass"]],
  ["Solarreinigung/PV", ["solar", "pv", "photovoltaik"]],
  ["Signature Services", ["signature", "objektbrief", "plan b", "fairpreis", "uebergabeakte"]],
  ["Diskret-Service", ["diskret", "trennung", "scheidung", "private client", "sensibel"]],
  ["B2B", ["b2b", "firma", "unternehmen", "gewerbe", "hausverwaltung"]],
  ["Duesseldorf", ["duesseldorf", "dusseldorf"]],
  ["Regensburg", ["regensburg"]],
  ["Muenchen/Bayern", ["muenchen", "bayern", "nuernberg", "landshut", "ingolstadt", "erlangen", "bamberg"]],
  ["unsicherer Ort", ["naehe", "umgebung", "near me", "in der naehe"]],
  ["nicht bedient / manuell pruefen", ["flensburg", "leipzig", "bielingplatz", "sulzbach", "schwandorf"]],
];

const notServedLocations = ["flensburg", "leipzig", "bielingplatz"];
const uncertainLocations = ["neuburg", "grafenau", "starnberg", "sulzbach", "schwandorf"];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function ascii(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/Ã¼|ü/g, "ue")
    .replace(/Ã¶|ö/g, "oe")
    .replace(/Ã¤|ä/g, "ae")
    .replace(/ÃŸ|ß/g, "ss")
    .replace(/Ã„|Ä/g, "Ae")
    .replace(/Ã–|Ö/g, "Oe")
    .replace(/Ãœ|Ü/g, "Ue");
}

function normalizeText(value) {
  return ascii(value).toLowerCase().replace(/[^\p{L}\p{N}/.-]+/gu, " ").replace(/\s+/g, " ").trim();
}

function chooseDelimiter(text) {
  const firstLine = text.split(/\r?\n/)[0] || "";
  const comma = (firstLine.match(/,/g) || []).length;
  const semicolon = (firstLine.match(/;/g) || []).length;
  const tab = (firstLine.match(/\t/g) || []).length;
  if (tab > comma && tab > semicolon) return "\t";
  return semicolon > comma ? ";" : ",";
}

function parseCsv(text) {
  const delimiter = chooseDelimiter(text);
  const rows = [];
  let cell = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i += 1;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (!inQuotes && char === delimiter) {
      row.push(cell);
      cell = "";
      continue;
    }
    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((value) => value.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
      continue;
    }
    cell += char;
  }

  row.push(cell);
  if (row.some((value) => value.trim() !== "")) rows.push(row);
  if (!rows.length) return [];

  const headers = rows[0].map(normalizeHeader);
  return rows.slice(1).map((values) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = (values[index] || "").trim();
    });
    return record;
  });
}

function normalizeHeader(value) {
  return normalizeText(String(value || "").replace(/^\ufeff/, "")).replace(/\s+/g, "_");
}

function pick(record, names) {
  for (const name of names) {
    const normalized = normalizeHeader(name);
    if (Object.prototype.hasOwnProperty.call(record, normalized)) return record[normalized];
  }
  return "";
}

function parseNumber(value, { isCtr = false } = {}) {
  if (value == null || value === "") return 0;
  const raw = String(value).trim();
  const hasPercent = raw.includes("%");
  let clean = raw.replace("%", "").replace(/\s/g, "");
  if (/^\d{1,3}(\.\d{3})+,\d+$/.test(clean)) {
    clean = clean.replace(/\./g, "").replace(",", ".");
  } else if (/^\d+,\d+$/.test(clean)) {
    clean = clean.replace(",", ".");
  } else {
    clean = clean.replace(/,/g, "");
  }
  const parsed = Number(clean);
  if (!Number.isFinite(parsed)) return 0;
  if (isCtr && !hasPercent && parsed > 0 && parsed <= 1) return parsed * 100;
  return parsed;
}

function classify(label) {
  const normalized = normalizeText(label);
  const matches = clusterRules
    .filter(([, needles]) => needles.some((needle) => normalized.includes(normalizeText(needle))))
    .map(([cluster]) => cluster);
  return matches.length ? [...new Set(matches)] : ["needs_manual_review"];
}

function detectCity(label) {
  const normalized = normalizeText(label);
  if (normalized.includes("duesseldorf") || normalized.includes("dusseldorf")) return "duesseldorf";
  if (normalized.includes("regensburg")) return "regensburg";
  if (normalized.includes("muenchen")) return "muenchen";
  if (normalized.includes("bayern")) return "bayern";
  if (normalized.includes("landshut")) return "landshut";
  if (normalized.includes("nuernberg")) return "nuernberg";
  return "";
}

function detectService(label, clusters) {
  const normalized = normalizeText(label);
  if (clusters.includes("Angebot pruefen")) return "angebot-pruefen";
  if (clusters.includes("Bueroreinigung")) return "bueroreinigung";
  if (clusters.includes("Gewerbereinigung")) return "gewerbereinigung";
  if (clusters.includes("Praxisreinigung")) return "praxisreinigung";
  if (clusters.includes("Fensterreinigung")) return "fensterreinigung";
  if (clusters.includes("Klaviertransport")) return "klaviertransport";
  if (clusters.includes("Seniorenumzug")) return "seniorenumzug";
  if (clusters.includes("Entruempelung")) return "entruempelung";
  if (clusters.includes("Haushaltsaufloesung")) return "wohnungsaufloesung";
  if (clusters.includes("Solarreinigung/PV")) return normalized.includes("pv") ? "pv-anlagen-reinigung" : "solarreinigung";
  if (clusters.includes("Diskret-Service")) return "diskret-service";
  if (clusters.includes("Umzug")) return "umzug";
  if (clusters.includes("Reinigung") || clusters.includes("Reinigungsangebot")) return "reinigung";
  return "";
}

function recommendTarget(label, clusters, page = "") {
  const normalized = normalizeText(`${label} ${page}`);
  if (clusters.includes("Brand")) return { targetPage: "/", status: "ignore_brand", priority: "P3" };
  if (notServedLocations.some((city) => normalized.includes(city))) return { targetPage: "", status: "ignore_not_served", priority: "P3" };
  if (uncertainLocations.some((city) => normalized.includes(city))) return { targetPage: "", status: "needs_manual_review", priority: "P2" };
  if (normalized.includes("reinigungsfirma angebot") || normalized.includes("angebot reinigung")) return { targetPage: "/reinigungsfirma-angebot", status: "improve_title_description", priority: "P0" };
  if (clusters.includes("Angebot pruefen")) return { targetPage: normalized.includes("red flag") || normalized.includes("angebotscheck") ? "/angebotscheck" : "/angebot-guenstiger-pruefen", status: "add_offercheck_cta", priority: "P0" };
  if (clusters.includes("Diskret-Service")) return { targetPage: "/diskreter-umzug-trennung-scheidung", status: "improve_content", priority: "P0" };
  if (clusters.includes("Klaviertransport") && normalized.includes("regensburg")) return { targetPage: "/klaviertransport-regensburg", status: "improve_title_description", priority: "P0" };
  if (clusters.includes("Fensterreinigung") && normalized.includes("duesseldorf")) return { targetPage: "/duesseldorf/fensterreinigung", status: "improve_internal_links", priority: "P0" };
  if (clusters.includes("Praxisreinigung") && normalized.includes("duesseldorf")) return { targetPage: "/duesseldorf/praxisreinigung", status: "improve_title_description", priority: "P0" };
  if (clusters.includes("Bueroreinigung") && normalized.includes("duesseldorf")) return { targetPage: "/duesseldorf/bueroreinigung", status: "improve_internal_links", priority: "P0" };
  if (clusters.includes("Gewerbereinigung") && normalized.includes("duesseldorf")) return { targetPage: "/duesseldorf/gewerbereinigung", status: "improve_title_description", priority: "P0" };
  if (clusters.includes("Reinigung") && normalized.includes("duesseldorf")) return { targetPage: "/duesseldorf/reinigung", status: "improve_content", priority: "P0" };
  if (clusters.includes("Umzug") && normalized.includes("regensburg")) return { targetPage: "/regensburg/umzug", status: "add_offercheck_cta", priority: "P0" };
  if (clusters.includes("Reinigung") && normalized.includes("regensburg")) return { targetPage: "/regensburg/reinigung", status: "add_offercheck_cta", priority: "P0" };
  if (clusters.includes("Entruempelung") && normalized.includes("regensburg")) return { targetPage: "/regensburg/entruempelung", status: "add_offercheck_cta", priority: "P0" };
  if (clusters.includes("Bueroreinigung") && normalized.includes("regensburg")) return { targetPage: "/regensburg/bueroreinigung", status: "improve_internal_links", priority: "P1" };
  if (clusters.includes("Gewerbereinigung") && normalized.includes("regensburg")) return { targetPage: "/regensburg/gewerbereinigung", status: "improve_internal_links", priority: "P1" };
  if (clusters.includes("Solarreinigung/PV")) return { targetPage: normalized.includes("pv") ? "/pv-anlagen-reinigung" : "/solarreinigung", status: "add_offercheck_cta", priority: "P1" };
  if (clusters.includes("Seniorenumzug")) return { targetPage: "/seniorenumzug-bayern", status: "improve_internal_links", priority: "P1" };
  if (clusters.includes("Duesseldorf")) return { targetPage: "/duesseldorf", status: "improve_internal_links", priority: "P1" };
  if (clusters.includes("Regensburg")) return { targetPage: "/regensburg", status: "improve_internal_links", priority: "P1" };
  return { targetPage: page || "", status: page ? "improve_content" : "needs_manual_review", priority: page ? "P2" : "P3" };
}

function normalizeRecord(raw, meta) {
  const query = pick(raw, ["Query", "Suchanfrage", "Suchanfragen", "Top queries", "Abfrage"]);
  const page = pick(raw, ["Page", "Seite", "Pages", "URL", "Landing page"]);
  const clicks = parseNumber(pick(raw, ["Clicks", "Klicks"]));
  const impressions = parseNumber(pick(raw, ["Impressions", "Impressionen"]));
  const ctr = parseNumber(pick(raw, ["CTR", "Klickrate"]), { isCtr: true });
  const position = parseNumber(pick(raw, ["Position", "Average position", "Durchschnittliche Position"]));
  const label = meta.type === "page" ? page : query;
  const clusters = classify(`${query} ${page}`);
  const recommendation = recommendTarget(label, clusters, page);
  const city = detectCity(`${query} ${page}`);
  const service = detectService(`${query} ${page}`, clusters);

  return {
    range: meta.range,
    type: meta.type,
    query,
    page,
    clicks,
    impressions,
    ctr: Math.round(ctr * 100) / 100,
    position: Math.round(position * 10) / 10,
    clusters,
    city,
    service,
    label,
    ...recommendation,
  };
}

function summarize(records) {
  const byCluster = new Map();
  for (const record of records) {
    for (const cluster of record.clusters) {
      const current = byCluster.get(cluster) || { cluster, clicks: 0, impressions: 0, records: 0 };
      current.clicks += record.clicks;
      current.impressions += record.impressions;
      current.records += 1;
      byCluster.set(cluster, current);
    }
  }

  const queryRecords = records.filter((record) => record.type === "query");
  return {
    topByImpressions: [...records].sort((a, b) => b.impressions - a.impressions).slice(0, 25),
    topByClicks: [...records].sort((a, b) => b.clicks - a.clicks).slice(0, 25),
    lowCtrTopTen: queryRecords
      .filter((record) => record.impressions >= 50 && record.position >= 1 && record.position <= 10 && record.ctr > 0 && record.ctr < 2.5 && !record.clusters.includes("Brand"))
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 25),
    nearPageOneBusiness: queryRecords
      .filter((record) => record.impressions > 0 && record.position > 10 && record.position <= 20 && ["P0", "P1"].includes(record.priority))
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 25),
    highImpressionWeakPosition: queryRecords
      .filter((record) => record.impressions >= 100 && record.position > 20 && !record.clusters.includes("Brand"))
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 25),
    missingTarget: queryRecords
      .filter((record) => !record.targetPage || record.status === "needs_manual_review")
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 25),
    brandQueries: queryRecords.filter((record) => record.clusters.includes("Brand")).sort((a, b) => b.impressions - a.impressions).slice(0, 25),
    clusters: [...byCluster.values()].sort((a, b) => b.impressions - a.impressions),
  };
}

function escapeMd(value) {
  return String(value || "-").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function metric(value, fallback = "-") {
  return value === null || value === undefined || value === "" ? fallback : value;
}

function tableRows(records) {
  if (!records.length) return "| - | - | - | - | - | - | - |\n";
  return records
    .map((record) => `| ${escapeMd(record.label)} | ${record.range} | ${record.clicks} | ${record.impressions} | ${record.ctr}% | ${record.position} | ${escapeMd(record.targetPage)} |`)
    .join("\n") + "\n";
}

function mappingRows(records) {
  if (!records.length) {
    return targetSeeds
      .map(([query, cluster, intent, service, city, targetPage, status, priority]) =>
        `| ${query} | ${cluster} | ${intent} | ${service} | ${city || "-"} | nicht bekannt | ${targetPage} | ${status} | ${priority} | nicht messbar | nicht messbar | hoch | niedrig bis mittel | CSV importieren, Snippet/CTA pruefen |`)
      .join("\n");
  }

  return records
    .filter((record) => record.type === "query")
    .sort((a, b) => {
      const priorityOrder = { P0: 0, P1: 1, P2: 2, P3: 3 };
      return (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9) || b.impressions - a.impressions;
    })
    .slice(0, 80)
    .map((record) => {
      const ctrRisk = record.position >= 1 && record.position <= 10 && record.ctr < 2.5 ? "hoch" : record.ctr > 0 && record.ctr < 5 ? "mittel" : "niedrig";
      const positionChance = record.position > 10 && record.position <= 20 ? "hoch" : record.position <= 10 ? "snippet" : record.position > 20 ? "link/content" : "unklar";
      const conversionValue = ["P0", "P1"].includes(record.priority) ? "hoch" : "mittel";
      return `| ${escapeMd(record.query)} | ${escapeMd(record.clusters.join(", "))} | ${escapeMd(record.clusters[0])} | ${record.service || "-"} | ${record.city || "-"} | ${escapeMd(record.page || "-")} | ${escapeMd(record.targetPage || "-")} | ${record.status} | ${record.priority} | ${ctrRisk} | ${positionChance} | ${conversionValue} | ${record.status === "needs_manual_review" ? "hoch" : "mittel"} | ${nextAction(record)} |`;
    })
    .join("\n");
}

function nextAction(record) {
  if (record.status === "ignore_brand") return "Brand-Query getrennt beobachten";
  if (record.status === "ignore_not_served") return "Keine Seite erstellen";
  if (record.status === "needs_manual_review") return "Ort/Intent manuell pruefen";
  if (record.position >= 1 && record.position <= 10 && record.ctr < 2.5) return "Title/Description verbessern und nach 28 Tagen pruefen";
  if (record.position > 10 && record.position <= 20) return "Content und interne Links staerken";
  return "Mapping halten, CTA und interne Links pruefen";
}

ensureDir(dataDir);
ensureDir(docsDir);

const files = [];
const warnings = [];
let allRecords = [];

for (const meta of expectedFiles) {
  const filePath = path.join(dataDir, meta.file);
  if (!fs.existsSync(filePath)) {
    warnings.push(`Missing ${meta.file}`);
    files.push({ ...meta, exists: false, rows: 0 });
    continue;
  }

  const text = fs.readFileSync(filePath, "utf8");
  const rows = parseCsv(text).map((row) => normalizeRecord(row, meta)).filter((record) => record.label);
  allRecords = allRecords.concat(rows);
  files.push({ ...meta, exists: true, rows: rows.length });
}

const summary = summarize(allRecords);
const status = allRecords.length ? (warnings.length ? "WARN" : "PASS") : "WARN";
const result = {
  status,
  generatedAt: new Date().toISOString(),
  files,
  warnings,
  records: allRecords.length,
  summary,
  queryToPage: allRecords.length ? allRecords.filter((record) => record.type === "query").slice(0, 200) : targetSeeds.map(([query, cluster, intent, service, city, , status, priority]) => ({
    query,
    cluster,
    intent,
    service,
    city,
    status,
    priority,
    metrics: null,
  })),
};

const report = `# GSC Import Report

Stand: ${new Date().toISOString()}

Status: ${status}

## Ergebnis

${allRecords.length ? "CSV-Daten wurden importiert, normalisiert, geclustert und in Query-to-Page-Mapping ueberfuehrt." : "Kein CSV vorhanden. Entscheidungen bleiben datenarm; es werden keine Klicks, Impressionen, CTRs oder Positionen erfunden."}

## Erwartete Dateien

| Datei | Status | Zeilen |
| --- | --- | ---: |
${files.map((file) => `| data/gsc/${file.file} | ${file.exists ? "PASS" : "WARN missing"} | ${file.rows} |`).join("\n")}

## Top Queries/Pages nach Impressionen

| Query/Page | Zeitraum | Klicks | Impressionen | CTR | Position | Empfohlene Zielseite |
| --- | --- | ---: | ---: | ---: | ---: | --- |
${tableRows(summary.topByImpressions)}
## Top Queries/Pages nach Klicks

| Query/Page | Zeitraum | Klicks | Impressionen | CTR | Position | Empfohlene Zielseite |
| --- | --- | ---: | ---: | ---: | ---: | --- |
${tableRows(summary.topByClicks)}
## Position 1-10 mit niedriger CTR

| Query/Page | Zeitraum | Klicks | Impressionen | CTR | Position | Empfohlene Zielseite |
| --- | --- | ---: | ---: | ---: | ---: | --- |
${tableRows(summary.lowCtrTopTen)}
## Position 11-20 mit Business-Relevanz

| Query/Page | Zeitraum | Klicks | Impressionen | CTR | Position | Empfohlene Zielseite |
| --- | --- | ---: | ---: | ---: | ---: | --- |
${tableRows(summary.nearPageOneBusiness)}
## Hohe Impressionen bei Position >20

| Query/Page | Zeitraum | Klicks | Impressionen | CTR | Position | Empfohlene Zielseite |
| --- | --- | ---: | ---: | ---: | ---: | --- |
${tableRows(summary.highImpressionWeakPosition)}
## Queries ohne sichere Zielseite

| Query/Page | Zeitraum | Klicks | Impressionen | CTR | Position | Empfohlene Zielseite |
| --- | --- | ---: | ---: | ---: | ---: | --- |
${tableRows(summary.missingTarget)}
## Brand Queries getrennt

| Query/Page | Zeitraum | Klicks | Impressionen | CTR | Position | Empfohlene Zielseite |
| --- | --- | ---: | ---: | ---: | ---: | --- |
${tableRows(summary.brandQueries)}
## Cluster

| Cluster | Records | Klicks | Impressionen |
| --- | ---: | ---: | ---: |
${summary.clusters.length ? summary.clusters.map((item) => `| ${item.cluster} | ${item.records} | ${item.clicks} | ${item.impressions} |`).join("\n") : "| - | 0 | 0 | 0 |"}

## Regeln

- Es werden keine Seiten automatisch erstellt.
- Fehlende CSV-Dateien sind WARN, kein Build-Fail.
- Deutsche und englische Spaltennamen werden erkannt.
- Brand Queries werden getrennt behandelt.
- Unsichere oder nicht bediente Orte werden als manuelle Pruefung oder Ignore markiert.
- Keine personenbezogenen Daten in CSVs aufnehmen.
`;

const mapping = `# Query to Page Mapping

Stand: ${new Date().toISOString()}

Status: ${status}

## Datenstatus

${allRecords.length ? "Dieses Mapping basiert auf importierten CSV-Daten." : "Keine CSV-Daten vorhanden. Dieses Mapping nutzt vorhandene Prioritaetsreports als datenarme Watchlist; Metriken bleiben bewusst leer."}

## Mapping

| Query | Cluster | Suchintention | Service | Stadt | aktuelle Zielseite, falls bekannt | empfohlene Zielseite | Status | Prioritaet | CTR-Risiko | Positionschance | Conversion-Wert | Kannibalisierungsrisiko | naechste Massnahme |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${mappingRows(allRecords)}

## Entscheidungsregeln

- Eine Suchintention bekommt eine primaere Zielseite.
- Keine neue Seite, wenn eine bestehende Zielseite verbessert werden kann.
- Keine Seite fuer nicht bestaetigte Orte.
- Brand Queries bleiben getrennt von generischen Service-Seiten.
- Neue Seitenkandidaten bleiben Kandidaten und brauchen echte GSC-/Intent-Daten.
`;

fs.writeFileSync(reportPath, report);
fs.writeFileSync(mappingPath, mapping);
fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2));
console.log(`GSC import status: ${status}`);
console.log(`Records: ${allRecords.length}`);
console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, mappingPath)}, ${path.relative(root, jsonPath)}`);
