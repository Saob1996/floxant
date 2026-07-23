import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const CONCURRENCY = Math.max(1, Math.min(8, Number(process.env.COPY_AUDIT_CONCURRENCY || 5)));

const rules = [
  ["interner Begriff", "HIGH", /\b(?:Lead(?: Quality| Routing| Priority| Score)?|Page Intent|Service Intent|Request Payload|Request Summary|Manual Review|Service Key|Intent Key|Location Key|Kontaktparameter|Conversion|Funnel|Mapping|Routing|Tracking|Priority|Health Check|Backlog|Ticket|Trust Proof|Local Proof|Local Hub|Knowledge Hub|Content Authority|manuell offen|P[0-3])\b/gi, "Mit einer verständlichen Kundenbezeichnung ersetzen."],
  ["Entwicklerbegriff", "HIGH", /\b(?:API(?: Route)?|Server Function|Function Invocation|Runtime|Node\.js|Client Component|Server Component|ISR|SSR|SSG|Hydration|Validation Error|Database Error|Request failed|Internal Server Error|Vercel|Supabase|Resend)\b/gi, "Technische Abläufe nicht im Kundentext erklären."],
  ["Suchmaschinen-Fachsprache", "HIGH", /\b(?:SEO|SERP|GSC|GBP|CTR|LLM|GEO|AEO|Ranking|Keyword(?:-Cluster)?|Short-Tail|Long-Tail|Money-Page|Landingpage|Search Intent|Search Console|AI Answer|Quick Answer|noindex|Canonical|hreflang|Indexierung|indexierbar|Sitemap|Structured Data|Schema|JSON-LD|LocalBusiness|Core Web Vitals|Lighthouse|Conversion Rate|AI Visibility|KI-Ranking|Suchphrase|Doorway(?: Page)?|Worktree)\b/gi, "Leistung, Ort und Kundensituation nennen."],
  ["roher Schlüssel oder Slug", "HIGH", /\b(?:serviceKey|intentKey|locationKey|sourcePage|requestSummary|trackingIntent|manualReview|city=[a-z0-9_-]+|service=[a-z0-9_-]+|intent=[a-z0-9_-]+|source=[a-z0-9_-]+)\b/gi, "Display-Label statt internem Wert ausgeben."],
  ["Encoding-Fehler", "HIGH", /ï¿½|Ãƒ|Ã¢|DÃ|BÃ|â€|\uFFFD/g, "Betroffene Textquelle gezielt als UTF-8 korrigieren."],
  ["abstrakte Formulierung", "MEDIUM", /\b(?:strukturiert(?:e|en|er|es)?|Aufwandstreiber|Service-?Cluster(?:n)?|Serviceweg(?:e|en)?|nächster sinnvoller Schritt|passender nächster Schritt)\b/gi, "Konkret sagen, welche Angaben geprüft werden oder was folgt."],
  ["unzulässiges Versprechen", "HIGH", /\b(?:[A-Za-zÄÖÜäöüß-]*garantie[A-Za-zÄÖÜäöüß-]*|garantier[A-Za-zÄÖÜäöüß]*)\b/gi, "Nur als klare Grenze formulieren; keine unbestätigte Garantie versprechen."],
  ["unbelegte Preis-, Zeit- oder Leistungsangabe", "HIGH", /\b(?:\d{2,}\s*(?:€|Euro)|24h|24\/7|Sofortpreis|zertifiziert(?:e|en|er|es)?|voll(?:umfänglich)? versichert|volle Versicherung)\b/gi, "Nur nachweisbare Angaben verwenden und Preis oder Termin von den konkreten Eckdaten abhängig machen."],
];

function decodeHtml(value) {
  const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => entities[name.toLowerCase()] || match);
}

function visibleTextFromHtml(html) {
  return decodeHtml(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<!--([\s\S]*?)-->/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? decodeHtml(match[1].replace(/\s+/g, " ").trim()) : "";
}

function snippet(text, match) {
  const index = text.toLowerCase().indexOf(match.toLowerCase());
  return text.slice(Math.max(0, index - 80), Math.min(text.length, index + match.length + 100)).replaceAll("|", "\\|");
}

function scanText(url, text) {
  const findings = [];
  for (const [category, severity, pattern, recommendation] of rules) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      if (/\/empfehlen(?:\?|$)/.test(new URL(url).pathname) && /^50\s*Euro$/i.test(match[0])) continue;
      if (/\/(?:datenschutz|impressum|agb)(?:\/|$)/.test(new URL(url).pathname) && category === "Entwicklerbegriff") continue;
      if (category === "unzulässiges Versprechen" || category === "unbelegte Preis-, Zeit- oder Leistungsangabe") {
        const before = text.slice(Math.max(0, match.index - 60), match.index).toLowerCase();
        const after = text.slice(match.index, Math.min(text.length, match.index + 140));
        if (/\b(?:kein(?:e|en|er|es)?|nicht|nie|niemals|niemand|ohne|statt)\b/.test(before) || /\b(?:kein(?:e|en|er|es)?|nicht|nie|niemals)\b/.test(after.toLowerCase()) || after.includes("?")) continue;
      }
      findings.push({ url, term: match[0], excerpt: snippet(text, match[0]), category, severity, recommendation, status: "offen" });
    }
  }
  return findings;
}

async function fetchPage(url) {
  const response = await fetch(url, { redirect: "follow", headers: { "user-agent": "FLOXANT-public-copy-audit/1.0" } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return { body: await response.text(), contentType: response.headers.get("content-type") || "" };
}

async function getUrls() {
  const { body: sitemap } = await fetchPage(`${BASE_URL}/sitemap.xml`);
  const urls = [...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeHtml(match[1].trim()));
  return [...new Set(urls.map((url) => {
    const parsed = new URL(url);
    return `${BASE_URL}${parsed.pathname}${parsed.search}`;
  }))];
}

async function mapConcurrent(items, worker) {
  const output = new Array(items.length);
  let nextIndex = 0;
  async function run() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      output[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, items.length) }, run));
  return output;
}

const generatedAt = new Date().toISOString();
let urls = [];
const pages = [];
const findings = [];

try {
  urls = await getUrls();
  await mapConcurrent(urls, async (url) => {
    try {
      const { body: html, contentType } = await fetchPage(url);
      if (!/text\/html/i.test(contentType)) {
        pages.push({ url, status: "SKIP", textLength: 0, findingCount: 0, note: `Nicht-HTML: ${contentType || "unbekannt"}` });
        return;
      }
      const text = visibleTextFromHtml(html);
      const pageFindings = scanText(url, `${extractTitle(html)} ${text}`);
      pages.push({ url, status: "PASS", textLength: text.length, findingCount: pageFindings.length });
      findings.push(...pageFindings);
    } catch (error) {
      pages.push({ url, status: "WARN", textLength: 0, findingCount: 0, error: error instanceof Error ? error.message : "Unbekannter Fehler" });
    }
  });
} catch (error) {
  const reason = error instanceof Error ? error.message : "Unbekannter Fehler";
  const report = { status: "WARN", generatedAt, baseUrl: BASE_URL, summary: { scannedPages: 0, findings: 0, fetchWarnings: 1 }, pages: [], findings: [], warning: `Sitemap konnte nicht gelesen werden: ${reason}` };
  fs.writeFileSync(path.join(ROOT, "public-rendered-copy-report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(path.join(ROOT, "PUBLIC_RENDERED_COPY_REPORT.md"), `# Public Rendered Copy Report\n\nStand: ${generatedAt}\n\nStatus: **WARN**\n\nDie lokale Production-Version war unter ${BASE_URL} nicht prüfbar. Grund: ${reason}\n`, "utf8");
  console.warn(`Public rendered copy audit: WARN - ${reason}`);
  process.exit(0);
}

pages.sort((a, b) => a.url.localeCompare(b.url, "de"));
findings.sort((a, b) => a.url.localeCompare(b.url, "de") || a.term.localeCompare(b.term, "de"));
const fetchWarnings = pages.filter((page) => page.status === "WARN").length;
const status = findings.length > 0 ? "FAIL" : fetchWarnings > 0 ? "WARN" : "PASS";
const summary = { scannedPages: pages.length, findings: findings.length, fetchWarnings };
const report = { status, generatedAt, baseUrl: BASE_URL, summary, pages, findings };

const findingRows = findings.map((item) => `| ${item.url} | ${item.term.replaceAll("|", "\\|")} | ${item.excerpt} | ${item.category} | ${item.severity} | ${item.recommendation} | ${item.status} |`);
const warningRows = pages.filter((page) => page.status === "WARN").map((page) => `| ${page.url} | ${String(page.error).replaceAll("|", "\\|")} |`);
const markdown = `# Public Rendered Copy Report

Stand: ${generatedAt}

Status: **${status}**

## Zusammenfassung

- Geprüfte öffentliche Seiten: ${summary.scannedPages}
- Kundensichtbare Funde: ${summary.findings}
- Abrufwarnungen: ${summary.fetchWarnings}
- Formulare wurden nicht abgesendet; Script, Style, Noscript und JSON-LD wurden nicht als sichtbarer Text bewertet.

## Funde

| URL | Begriff | Textausschnitt | Problemklasse | Schweregrad | Empfehlung | Status |
| --- | --- | --- | --- | --- | --- | --- |
${findingRows.length ? findingRows.join("\n") : "| – | – | Keine Funde | – | – | – | erledigt |"}

## Abrufwarnungen

| URL | Warnung |
| --- | --- |
${warningRows.length ? warningRows.join("\n") : "| – | Keine |"}
`;

fs.writeFileSync(path.join(ROOT, "PUBLIC_RENDERED_COPY_REPORT.md"), markdown, "utf8");
fs.writeFileSync(path.join(ROOT, "public-rendered-copy-report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log(`Public rendered copy audit: ${status}`);
console.log(`Scanned pages: ${summary.scannedPages}; findings: ${summary.findings}; fetch warnings: ${summary.fetchWarnings}`);
process.exitCode = status === "FAIL" ? 1 : 0;
