import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "out");
const ARTIFACT_DIR = path.join(ROOT, "artifacts");
const OUTPUT_FILE = path.join(ARTIFACT_DIR, "rendered-public-language-audit.csv");

const PUBLIC_DATA_FILES = ["search-index.json", "service-graph.json"];
const PUBLIC_TEXT_FILES = ["llms.txt"];

const LANGUAGE_RULES = [
  { severity: "P0", pattern: /\b(?:MANUAL_REVIEW|MERGE_CANDIDATE|REDIRECT_CANDIDATE|REWRITE_FOR_CUSTOMER|DELETE_DUPLICATE|CONSOLIDATION_CANDIDATE|MOVE_TO_HUB|MOVE_TO_SPECIALIST_PAGE)\b/giu },
  { severity: "P0", pattern: /\b(?:KEEP|REWRITE)\b/gu },
  { severity: "P0", pattern: /\bP[0-3]\b/gu },
  { severity: "P0", pattern: /\bseo_quick_lead_form\b/giu },
  { severity: "P0", pattern: /\bpriority\s*=\s*p[0-3]\b/giu },
  { severity: "P0", pattern: /\bsource\s*=\s*seo\b/giu },
  { severity: "P0", pattern: /\b(?:interne Notiz|Entwicklerhinweis|Platzhaltertext|Testinhalt|technische Validierung|interner Formularname)\b/giu },
  { severity: "P0", pattern: /\b(?:Anfragebriefing|(?:Schneller\s+)?Kontaktfluss|Der Button öffnet)\b/giu },
  { severity: "P1", pattern: /\bSEO\b/gu },
  { severity: "P1", pattern: /\b(?:Ranking|Keyword(?:-Cluster)?|Search Intent|Query|SERP|GSC|Conversion(?: Lift)?|Lead|Funnel|Payload|Mapping|Routing|Registry|Audit|QA|Health Check|Canonical Mapping|Canonical|Internal Link Opportunity|Local Proof|Visual Proof|Trust Proof|Servicefit|Signature-Empfehlung|AI Discoverability|Content Cluster|Performance Budget)\b/giu },
  { severity: "P1", pattern: /\b(?:evidenceStatus|auditStatus|manualReview|rankingOpportunity|conversionGoal|canonicalCandidate|targetQuery|searchIntent|contentOwner|internalId|internalLabel|seoNotes|serviceIds?|relatedServiceIds?|sourcePage|reviewedAt)\b/giu },
  { severity: "P1", pattern: /\b(?:noindex|hreflang|Indexierung|indexierbar|Sitemap|Structured Data|Schema|JSON-LD|LocalBusiness|Core Web Vitals|Lighthouse|Search Console|Money-Page|Landingpage|Doorway(?: Page)?)\b/giu },
  { severity: "P2", pattern: /\b(?:AI Visibility|KI-Ranking|Suchphrase|Conversion Rate|Tracking|Tracking-ID)\b/giu },
  { severity: "P0", pattern: /(?:\uFFFD|Ãƒ|Â©|Â®|â€“|â€”|â€ž|â€œ|â€™)/gu },
];

const INTERNAL_JSON_KEY = /^(?:id|internalId|serviceId|serviceIds|relatedServiceIds|slug|status|evidenceStatus|auditStatus|manualReview|rankingOpportunity|conversionGoal|canonicalCandidate|targetQuery|searchIntent|contentOwner|owner|seoNotes|internalLabel|priority|reviewedAt|lastReviewedAt|source)$/i;
const INTERNAL_HTML_ATTRIBUTE = /^(?:data-(?:priority|page-intent|manual-review|internal-id|service-id|evidence-status|audit-status|target-query|ranking-opportunity|content-owner|seo(?:-|$))|data-internal(?:-|$))/i;
const JSON_LD_STRUCTURAL_KEYS = new Set(["@context", "@type", "@id", "query-input", "position"]);

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(absolute) : [absolute];
  });
}

function relativeFile(file) {
  return path.relative(ROOT, file).replaceAll(path.sep, "/");
}

function routeFromHtmlFile(file) {
  const relative = path.relative(OUT_DIR, file).replaceAll(path.sep, "/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"/index.html".length)}`;
  return `/${relative.replace(/\.html$/i, "")}`;
}

function decodeHtml(value) {
  const named = {
    amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"',
    auml: "ä", Auml: "Ä", ouml: "ö", Ouml: "Ö", uuml: "ü", Uuml: "Ü", szlig: "ß",
  };
  return String(value ?? "")
    .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number(value)))
    .replace(/&#x([0-9a-f]+);/gi, (_, value) => String.fromCodePoint(Number.parseInt(value, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name] ?? named[name.toLowerCase()] ?? match);
}

function plainContext(value) {
  return decodeHtml(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function clipContext(value, index, length) {
  const clean = plainContext(value);
  const safeIndex = Math.max(0, Math.min(index, clean.length));
  const start = Math.max(0, safeIndex - 90);
  const end = Math.min(clean.length, safeIndex + length + 110);
  return `${start > 0 ? "…" : ""}${clean.slice(start, end)}${end < clean.length ? "…" : ""}`;
}

const findings = [];
const seen = new Set();

function addFinding({ route, file, term, context, sourceType, severity, replacementRequired = "yes", status = "OPEN" }) {
  const normalizedContext = plainContext(context).slice(0, 320);
  const key = [route, file, term.toLowerCase(), normalizedContext, sourceType, severity].join("\u0000");
  if (seen.has(key)) return;
  seen.add(key);
  findings.push({ route, file, term, context: normalizedContext, sourceType, severity, replacementRequired, status });
}

function scanValue({ route, file, value, sourceType, jsonPath = "" }) {
  const text = String(value ?? "");
  for (const rule of LANGUAGE_RULES) {
    rule.pattern.lastIndex = 0;
    for (const match of text.matchAll(rule.pattern)) {
      if (sourceType === "jsonLd" && /^schema$/i.test(match[0]) && /https?:\/\/schema\.org\//i.test(text)) continue;
      if (sourceType === "jsonLd" && /^query$/i.test(match[0]) && /https?:\/\/www\.google\.com\/maps\/search\/\?api=1&query=/i.test(text)) continue;
      const prefix = jsonPath ? `${jsonPath}: ` : "";
      addFinding({
        route,
        file,
        term: match[0],
        context: `${prefix}${clipContext(text, match.index ?? 0, match[0].length)}`,
        sourceType,
        severity: rule.severity,
        replacementRequired: rule.severity === "P2" ? "review" : "yes",
      });
    }
  }
}

function attributeMap(tag) {
  const result = [];
  const pattern = /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  for (const match of tag.matchAll(pattern)) {
    result.push([match[1], decodeHtml(match[2] ?? match[3] ?? match[4] ?? "")]);
  }
  return result;
}

function extractVisibleBody(html) {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  return plainContext(
    body
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, " ")
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " "),
  );
}

function scanJsonLd({ html, route, file }) {
  const scripts = html.matchAll(/<script\b([^>]*)type=["']application\/ld\+json["']([^>]*)>([\s\S]*?)<\/script>/gi);
  let documentIndex = 0;
  for (const match of scripts) {
    documentIndex += 1;
    try {
      const parsed = JSON.parse(decodeHtml(match[3]));
      visitJson(parsed, {
        route,
        file,
        sourceType: "jsonLd",
        pathParts: [`$jsonld[${documentIndex}]`],
        scanKeys: false,
      });
    } catch {
      scanValue({ route, file, value: match[3], sourceType: "jsonLd", jsonPath: `$jsonld[${documentIndex}]` });
    }
  }
}

function scanHtml(file) {
  const html = fs.readFileSync(file, "utf8");
  const route = routeFromHtmlFile(file);
  const relative = relativeFile(file);

  scanValue({ route, file: relative, value: extractVisibleBody(html), sourceType: "visibleText" });

  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (title) scanValue({ route, file: relative, value: plainContext(title), sourceType: "metaTitle" });

  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const attributes = new Map(attributeMap(tag).map(([name, value]) => [name.toLowerCase(), value]));
    const name = attributes.get("name")?.toLowerCase() ?? "";
    const property = attributes.get("property")?.toLowerCase() ?? "";
    const content = attributes.get("content") ?? "";
    if (name === "description") scanValue({ route, file: relative, value: content, sourceType: "metaDescription" });
    if (property.startsWith("og:") || name.startsWith("twitter:")) {
      scanValue({ route, file: relative, value: content, sourceType: "openGraph" });
    }
  }

  for (const tag of html.match(/<(?:img|input|area|button|a|div|section|form|label)\b[^>]*>/gi) ?? []) {
    for (const [rawName, value] of attributeMap(tag)) {
      const name = rawName.toLowerCase();
      if (name === "alt") scanValue({ route, file: relative, value, sourceType: "alt" });
      if (name === "aria-label" || name === "aria-description" || name === "title") {
        scanValue({ route, file: relative, value, sourceType: "aria" });
      }
      if (INTERNAL_HTML_ATTRIBUTE.test(name)) {
        addFinding({ route, file: relative, term: rawName, context: `${rawName}=${value}`, sourceType: "htmlAttribute", severity: "P0" });
      }
      if (name.startsWith("data-") || name === "href" || name === "action" || name === "formaction") {
        scanValue({ route, file: relative, value: `${rawName}=${value}`, sourceType: "htmlAttribute" });
      }
    }
  }

  scanJsonLd({ html, route, file: relative });
}

function visitJson(value, { route, file, sourceType, pathParts, scanKeys }) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => visitJson(item, { route, file, sourceType, pathParts: [...pathParts, `[${index}]`], scanKeys }));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      const nextPath = [...pathParts, key];
      if (scanKeys && INTERNAL_JSON_KEY.test(key) && key !== "@id") {
        addFinding({
          route,
          file,
          term: key,
          context: `${nextPath.join(".")}=${typeof child === "string" ? child : JSON.stringify(child).slice(0, 180)}`,
          sourceType: "publicJsonKey",
          severity: "P0",
        });
      } else if (scanKeys) {
        scanValue({ route, file, value: key, sourceType: "publicJsonKey", jsonPath: nextPath.join(".") });
      }
      if (sourceType === "jsonLd" && JSON_LD_STRUCTURAL_KEYS.has(key)) continue;
      visitJson(child, { route, file, sourceType, pathParts: nextPath, scanKeys });
    }
    return;
  }
  if (typeof value === "string") {
    scanValue({ route, file, value, sourceType, jsonPath: pathParts.join(".") });
  }
}

function scanPublicJson(fileName) {
  const file = path.join(OUT_DIR, fileName);
  if (!fs.existsSync(file)) return;
  const route = `/${fileName}`;
  const relative = relativeFile(file);
  const raw = fs.readFileSync(file, "utf8");
  try {
    visitJson(JSON.parse(raw), { route, file: relative, sourceType: "publicJsonValue", pathParts: ["$"], scanKeys: true });
  } catch {
    scanValue({ route, file: relative, value: raw, sourceType: "publicJsonValue" });
  }
}

function scanPublicText(fileName) {
  const file = path.join(OUT_DIR, fileName);
  if (!fs.existsSync(file)) return;
  scanValue({ route: `/${fileName}`, file: relativeFile(file), value: fs.readFileSync(file, "utf8"), sourceType: "publicText" });
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(rows) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  const headers = ["route", "file", "term", "context", "sourceType", "severity", "replacementRequired", "status"];
  const lines = [headers.join(","), ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(","))];
  fs.writeFileSync(OUTPUT_FILE, `${lines.join("\n")}\n`, "utf8");
}

if (!fs.existsSync(OUT_DIR)) {
  console.error("PUBLIC_LANGUAGE_AUDIT_ERROR out/ is missing; run the production build first.");
  process.exit(1);
}

for (const file of walkFiles(OUT_DIR).filter((candidate) => candidate.toLowerCase().endsWith(".html"))) scanHtml(file);
for (const fileName of PUBLIC_DATA_FILES) scanPublicJson(fileName);
for (const fileName of PUBLIC_TEXT_FILES) scanPublicText(fileName);

const severityOrder = new Map([["P0", 0], ["P1", 1], ["P2", 2]]);
findings.sort((left, right) =>
  (severityOrder.get(left.severity) ?? 9) - (severityOrder.get(right.severity) ?? 9)
  || left.route.localeCompare(right.route, "de")
  || left.sourceType.localeCompare(right.sourceType)
  || left.term.localeCompare(right.term, "de"));
writeCsv(findings);

const counts = Object.fromEntries(["P0", "P1", "P2"].map((severity) => [severity, findings.filter((item) => item.severity === severity).length]));
const routes = new Set(findings.map((item) => item.route)).size;
console.log(`PUBLIC_LANGUAGE_AUDIT scannedHtml=${walkFiles(OUT_DIR).filter((candidate) => candidate.toLowerCase().endsWith(".html")).length} findings=${findings.length} affectedRoutes=${routes} P0=${counts.P0} P1=${counts.P1} P2=${counts.P2}`);
console.log(`PUBLIC_LANGUAGE_AUDIT output=${relativeFile(OUTPUT_FILE)} status=${counts.P0 > 0 ? "FAIL" : "PASS"}`);
if (counts.P0 > 0) process.exitCode = 1;
