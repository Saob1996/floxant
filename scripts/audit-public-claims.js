const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const outDir = path.join(root, "out");
const artifactPath = path.join(root, "artifacts", "public-claims-audit.csv");

const rules = [
  { id: "market-leader", severity: "error", pattern: /\b(marktf(?:ü|ue)hrer|market leader)\b/giu },
  { id: "number-one", severity: "error", pattern: /(?:\bnummer\s*1\b|#1\b|\bno\.?\s*1\b)/giu },
  { id: "best-provider", severity: "error", pattern: /\b(best(?:er|e)\s+(?:anbieter|reinigungsfirma|umzugsfirma)|best\s+(?:provider|cleaning company|moving company))\b/giu },
  { id: "guarantee", severity: "error", pattern: /\b(garantiert(?:e[nsr]?)?|garantie|guaranteed|guarantee)\b/giu, allowNegation: true },
  { id: "always-available", severity: "error", pattern: /\b(immer\s+verf(?:ü|ue)gbar|always\s+available)\b/giu, allowNegation: true },
  { id: "round-the-clock", severity: "error", pattern: /(?:\b24\s*\/\s*7\b|rund\s+um\s+die\s+uhr|around\s+the\s+clock)\b/giu, allowNegation: true },
  { id: "immediate-appointment", severity: "error", pattern: /\b(sofort(?:iger|ige|iges|igen)?\s+termin|immediate\s+appointment|same-day\s+appointment)\b/giu, allowNegation: true },
  { id: "fixed-response-time", severity: "error", pattern: /\b(?:antwort|r(?:ü|ue)ckmeldung|angebot|response|quote)\b.{0,45}\b(?:innerhalb|binnen|within)\s+\d+\s*(?:stunden?|minutes?|minuten?|hours?)\b/giu, allowNegation: true },
  { id: "invented-review-count", severity: "error", pattern: /\b\d{2,}\+?\s*(?:bewertungen|rezensionen|reviews)\b/giu },
  { id: "invented-project-count", severity: "error", pattern: /\b\d{2,}\+?\s*(?:projekte|auftr(?:ä|ae)ge|projects|jobs)\b/giu },
  { id: "rating-claim", severity: "error", pattern: /\b[1-5](?:[.,]\d)?\s*(?:von\s*5\s*)?(?:sterne|stars)\b/giu },
  { id: "insurance-claim", severity: "error", pattern: /\b(?:betriebshaftpflichtversichert|vollversichert|fully\s+insured)\b/giu, allowNegation: true },
  { id: "certification-claim", severity: "error", pattern: /\b(?:zertifiziert(?:e[nsr]?)?|certified)\b/giu, allowNegation: true },
  { id: "experience-count", severity: "error", pattern: /\b(?:über|mehr\s+als|over)\s+\d+\s+(?:jahre|years)\s+(?:erfahrung|experience)\b/giu },
];

function decodeHtml(value) {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/giu, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/giu, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&uuml;|&#252;/gi, "ü")
    .replace(/&auml;|&#228;/gi, "ä")
    .replace(/&ouml;|&#246;/gi, "ö")
    .replace(/&szlig;|&#223;/gi, "ß")
    .replace(/\s+/g, " ")
    .trim();
}

function isNegated(text, index, matchLength) {
  const before = text.slice(Math.max(0, index - 110), index).toLowerCase();
  const after = text.slice(index + matchLength, index + matchLength + 120).toLowerCase();
  const negationBefore = /(?:keine?|nicht|ohne|weder|nie|kein\s+versprechen|not|no|without|never|does\s+not|cannot|can't)[^.!?]{0,75}$/u;
  const negativeAnswer = /^\s*[^.!?]{0,55}\?\s*(?:nein|no)\b/u;
  const negativeContinuation = /^\s*(?:gibt\s+es|there\s+is)\s+(?:keine?|nicht|no)\b/u;
  const directNegation = /^\s*(?:aber\s+|but\s+)?(?:keine?|keinen|keiner|nicht|no|not)\b/u;
  return negationBefore.test(before) || negativeAnswer.test(after) || negativeContinuation.test(after) || directNegation.test(after);
}

function htmlPathForRoute(route) {
  if (route === "/") return path.join(outDir, "index.html");
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  const direct = path.join(outDir, `${clean}.html`);
  if (fs.existsSync(direct)) return direct;
  return path.join(outDir, clean, "index.html");
}

function getRoutes() {
  const sitemapPath = path.join(outDir, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) throw new Error("out/sitemap.xml fehlt. Zuerst den statischen Build erzeugen.");
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  return [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((match) => match[1] || "/");
}

function csvCell(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

const routes = getRoutes();
const findings = [];
for (const route of routes) {
  const htmlPath = htmlPathForRoute(route);
  if (!fs.existsSync(htmlPath)) continue;
  const text = decodeHtml(fs.readFileSync(htmlPath, "utf8"));
  for (const rule of rules) {
    rule.pattern.lastIndex = 0;
    for (const match of text.matchAll(rule.pattern)) {
      if (rule.allowNegation && isNegated(text, match.index, match[0].length)) continue;
      const start = Math.max(0, match.index - 85);
      const end = Math.min(text.length, match.index + match[0].length + 85);
      findings.push({ route, rule: rule.id, severity: rule.severity, match: match[0], context: text.slice(start, end) });
    }
  }
}

fs.mkdirSync(path.dirname(artifactPath), { recursive: true });
const rows = ["route,rule,severity,match,context", ...findings.map((finding) => [finding.route, finding.rule, finding.severity, finding.match, finding.context].map(csvCell).join(","))];
fs.writeFileSync(artifactPath, `${rows.join("\n")}\n`, "utf8");

if (findings.length) {
  console.error(`Claims-Audit fehlgeschlagen: ${findings.length} unbelegte oder verbotene öffentliche Aussage(n).`);
  console.error(`Details: ${path.relative(root, artifactPath)}`);
  process.exitCode = 1;
} else {
  console.log(`Claims-Audit erfolgreich: ${routes.length} Sitemap-Seiten geprüft, 0 Findings.`);
}
