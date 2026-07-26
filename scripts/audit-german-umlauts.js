const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "out");
const OUTPUT = path.join(ROOT, "artifacts", "german-umlaut-audit.csv");

const replacements = [
  ["Duesseldorf", "Düsseldorf"],
  ["Bueroreinigung", "Büroreinigung"],
  ["Gebaeudereinigung", "Gebäudereinigung"],
  ["Entruempelung", "Entrümpelung"],
  ["Raeumung", "Räumung"],
  ["Wohnungsaufloesung", "Wohnungsauflösung"],
  ["Uebergabe", "Übergabe"],
  ["Rueckruf", "Rückruf"],
  ["pruefen", "prüfen"],
  ["guenstig", "günstig"],
  ["moeglich", "möglich"],
  ["regelmaessig", "regelmäßig"],
  ["zusaetzlich", "zusätzlich"],
  ["fuer", "für"],
  ["ueber", "über"],
  ["koennen", "können"],
  ["waehlen", "wählen"],
  ["groesser", "größer"],
  ["verlaesslich", "verlässlich"],
  ["persoenlich", "persönlich"],
  ["gewuenscht", "gewünscht"],
  ["Flaeche", "Fläche"],
  ["Raeume", "Räume"],
  ["Buero", "Büro"],
  ["Bueros", "Büros"],
  ["Kueche", "Küche"],
  ["Schluessel", "Schlüssel"],
  ["Aufloesung", "Auflösung"],
  ["zurueck", "zurück"],
  ["zurueckhaltend", "zurückhaltend"],
  ["Angehoerige", "Angehörige"],
  ["Massnahmen", "Maßnahmen"],
  ["Groesse", "Größe"],
  ["Einschaetzung", "Einschätzung"],
  ["Verfuegbarkeit", "Verfügbarkeit"],
  ["Kapazitaet", "Kapazität"],
  ["bestaetigt", "bestätigt"],
  ["noetig", "nötig"],
  ["zaehlt", "zählt"],
  ["gehoeren", "gehören"],
  ["spaeter", "später"],
  ["erklaeren", "erklären"],
  ["klaeren", "klären"],
] ;

const patterns = replacements.map(([ascii, umlaut]) => ({
  ascii,
  umlaut,
  pattern: new RegExp(`(^|[^\\p{L}\\p{N}])(${ascii})(?=$|[^\\p{L}\\p{N}])`, "giu"),
}));

function walk(directory, predicate, result = []) {
  if (!fs.existsSync(directory)) return result;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute, predicate, result);
    else if (predicate(absolute)) result.push(absolute);
  }
  return result;
}

function decode(value) {
  return String(value || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&auml;/gi, "ä")
    .replace(/&ouml;/gi, "ö")
    .replace(/&uuml;/gi, "ü")
    .replace(/&Auml;/g, "Ä")
    .replace(/&Ouml;/g, "Ö")
    .replace(/&Uuml;/g, "Ü")
    .replace(/&szlig;/gi, "ß")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

function visibleText(html) {
  return decode(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
      .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " "),
  );
}

function metadataTexts(html) {
  const values = [];
  for (const match of html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)) {
    values.push({ context: "title", text: decode(match[1]) });
  }
  for (const match of html.matchAll(/<meta\b([^>]+)>/gi)) {
    const attrs = match[1];
    const key = attrs.match(/\b(?:name|property)=["']([^"']+)["']/i)?.[1] || "";
    const content = attrs.match(/\bcontent=["']([^"']*)["']/i)?.[1] || "";
    if (/^(?:description|og:title|og:description|twitter:title|twitter:description)$/i.test(key)) {
      values.push({ context: key, text: decode(content) });
    }
  }
  return values;
}

function jsonLdTexts(html) {
  const values = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(match[1]);
      collectJsonStrings(parsed, values, "json-ld");
    } catch {
      // Invalid JSON-LD is covered by the dedicated structured-data audit.
    }
  }
  return values;
}

function collectJsonStrings(value, values, context, key = "") {
  if (typeof value === "string") {
    if (
      !/^(?:@id|id|key|slug|slugs|serviceId|serviceIds|serviceKey|serviceKeys|cityKey|locationKey|url|urls|route|routes|path|href|canonical|sameAs|image|logo|item|contentUrl|embedUrl)$/i.test(key) &&
      !/^(?:https?:|\/)/i.test(value)
    ) {
      values.push({ context, text: value });
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectJsonStrings(item, values, context, key));
    return;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([nestedKey, nested]) => collectJsonStrings(nested, values, context, nestedKey));
  }
}

function routeForHtml(file) {
  const relative = path.relative(OUT, file).replaceAll("\\", "/");
  if (relative === "index.html") return "/";
  return `/${relative.replace(/(?:\/index)?\.html$/, "")}`;
}

function snippet(text, index, length) {
  return text.slice(Math.max(0, index - 80), Math.min(text.length, index + length + 100)).replace(/\s+/g, " ");
}

function csv(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function scanText(findings, source, route, context, text) {
  if (!text) return;
  for (const { ascii, umlaut, pattern } of patterns) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const term = match[2];
      const index = (match.index || 0) + match[1].length;
      findings.push({
        source,
        route,
        context,
        term,
        replacement: term === ascii ? umlaut : umlaut,
        snippet: snippet(text, index, term.length),
        status: "OPEN",
      });
    }
  }
}

function main() {
  if (!fs.existsSync(OUT)) throw new Error("Statischer Export fehlt. Bitte zuerst npm run build ausführen.");
  const findings = [];
  const htmlFiles = walk(OUT, (file) => file.endsWith(".html"));
  let germanHtmlFiles = 0;

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    if (!/<html\b[^>]*\blang=["']de(?:-|["'])/i.test(html)) continue;
    germanHtmlFiles += 1;
    const relative = path.relative(ROOT, file).replaceAll("\\", "/");
    const route = routeForHtml(file);
    scanText(findings, relative, route, "sichtbarer Text", visibleText(html));
    for (const item of metadataTexts(html)) scanText(findings, relative, route, item.context, item.text);
    for (const item of jsonLdTexts(html)) scanText(findings, relative, route, item.context, item.text);
  }

  for (const relative of ["public/search-index.json", "public/service-graph.json"]) {
    const absolute = path.join(ROOT, relative);
    if (!fs.existsSync(absolute)) continue;
    const values = [];
    const parsed = JSON.parse(fs.readFileSync(absolute, "utf8"));
    const germanPublicData =
      relative === "public/search-index.json" && Array.isArray(parsed.entries)
        ? { ...parsed, entries: parsed.entries.filter((entry) => entry?.locale === "de") }
        : parsed;
    collectJsonStrings(germanPublicData, values, "öffentliches JSON");
    values.forEach((item) => scanText(findings, relative, "", item.context, item.text));
  }

  const unique = Array.from(
    new Map(
      findings.map((finding) => [
        [finding.source, finding.route, finding.context, finding.term, finding.snippet].join("\u0000"),
        finding,
      ]),
    ).values(),
  ).sort((a, b) => a.source.localeCompare(b.source, "de") || a.term.localeCompare(b.term, "de"));

  const columns = ["source", "route", "context", "term", "replacement", "snippet", "status"];
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(
    OUTPUT,
    `${columns.join(",")}\n${unique.map((item) => columns.map((column) => csv(item[column])).join(",")).join("\n")}${unique.length ? "\n" : ""}`,
    "utf8",
  );

  console.log(JSON.stringify({
    status: unique.length ? "FAIL" : "PASS",
    htmlFiles: htmlFiles.length,
    germanHtmlFiles,
    findings: unique.length,
    technicalExceptions: "URLs, Slugs, Dateinamen, IDs, API-Pfade, Variablennamen und externe Links werden nicht als sichtbarer Text geprüft.",
    output: path.relative(ROOT, OUTPUT),
  }, null, 2));
  process.exitCode = unique.length ? 1 : 0;
}

main();
