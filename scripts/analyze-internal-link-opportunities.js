const fs = require("node:fs");
const path = require("node:path");
const { parseCsvFile, writeCsv } = require("./lib/search-console-utils");

const root = process.cwd();
const outDir = path.join(root, "out");
const pageDataPath = path.join(root, "artifacts", "gsc-page-opportunities.csv");
const outputPath = path.join(root, "artifacts", "internal-link-opportunities.csv");

function routeFromUrl(value) {
  try {
    return new URL(value).pathname.replace(/\/$/, "") || "/";
  } catch {
    return String(value || "/").replace(/\/$/, "") || "/";
  }
}

function htmlPath(route) {
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  if (!clean) return path.join(outDir, "index.html");
  const flat = path.join(outDir, `${clean}.html`);
  return fs.existsSync(flat) ? flat : path.join(outDir, clean, "index.html");
}

function localeOf(route) {
  return route === "/en" || route.startsWith("/en/") ? "en" : "de";
}

function isEligible(route, sitemap) {
  if (route.startsWith("/dashboard")) return false;
  const file = htmlPath(route);
  if (!fs.existsSync(file)) return false;
  if (!sitemap.includes(`https://www.floxant.de${route === "/" ? "" : route}`)) return false;
  const html = fs.readFileSync(file, "utf8");
  return !/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
}

const sitemapPath = path.join(outDir, "sitemap.xml");
if (!fs.existsSync(sitemapPath) || !fs.existsSync(pageDataPath)) {
  console.error("Internal-Link-Analyse fehlgeschlagen: statischer Build oder GSC-Seitenartefakt fehlt.");
  process.exit(1);
}

const sitemap = fs.readFileSync(sitemapPath, "utf8");
const pageMetrics = new Map(parseCsvFile(pageDataPath).map((row) => [routeFromUrl(row.url), row]));
const candidates = [
  { sourceUrl: "/duesseldorf", targetUrl: "/duesseldorf/reinigung", suggestedAnchor: "Reinigungsumfang in Düsseldorf klären", cluster: "duesseldorf-cleaning" },
  { sourceUrl: "/duesseldorf/reinigung", targetUrl: "/duesseldorf/bueroreinigung", suggestedAnchor: "Anforderungen an die Büroreinigung", cluster: "duesseldorf-cleaning" },
  { sourceUrl: "/duesseldorf/reinigung", targetUrl: "/duesseldorf/fensterreinigung", suggestedAnchor: "Fenster- und Glasflächen beschreiben", cluster: "duesseldorf-cleaning" },
  { sourceUrl: "/duesseldorf/reinigung", targetUrl: "/duesseldorf/gewerbereinigung", suggestedAnchor: "Reinigung für gewerblich genutzte Flächen", cluster: "duesseldorf-cleaning" },
  { sourceUrl: "/regensburg", targetUrl: "/regensburg/bueroreinigung", suggestedAnchor: "Büroreinigung in Regensburg anfragen", cluster: "regensburg-cleaning" },
  { sourceUrl: "/en", targetUrl: "/en/contact", suggestedAnchor: "describe your service request", cluster: "english-service" }
];

const rows = [];
const rejected = [];
for (const candidate of candidates) {
  if (localeOf(candidate.sourceUrl) !== localeOf(candidate.targetUrl)) {
    rejected.push(`${candidate.sourceUrl} -> ${candidate.targetUrl}: locale mismatch`);
    continue;
  }
  if (!isEligible(candidate.sourceUrl, sitemap) || !isEligible(candidate.targetUrl, sitemap)) {
    rejected.push(`${candidate.sourceUrl} -> ${candidate.targetUrl}: source or target is not an indexable static page`);
    continue;
  }
  const sourceHtml = fs.readFileSync(htmlPath(candidate.sourceUrl), "utf8");
  const alreadyLinked = new RegExp(`href=["']${candidate.targetUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:[?#/][^"']*)?["']`, "i").test(sourceHtml);
  const target = pageMetrics.get(candidate.targetUrl);
  const impressions = Number(target?.impressions || 0);
  const position = Number(target?.position || 0);
  const priority = impressions >= 250 && position >= 4 && position <= 40 ? "high" : impressions >= 100 ? "medium" : "low";
  rows.push({
    ...candidate,
    reason: target ? `${target.impressions} GSC-Impressionen; Ø Position ${Number(target.position).toFixed(2)}; redaktionellen Kontext prüfen` : "Strukturell relevante Weiterführung; GSC-Zieldaten fehlen",
    locale: localeOf(candidate.sourceUrl),
    priority,
    alreadyLinked: String(alreadyLinked),
    manualReview: "true",
  });
}

writeCsv(outputPath, ["sourceUrl", "targetUrl", "suggestedAnchor", "reason", "locale", "cluster", "priority", "alreadyLinked", "manualReview"], rows);
console.log(`Internal-Link-Analyse erfolgreich: ${rows.length} Vorschläge, ${rows.filter((row) => row.priority === "high").length} hohe Priorität, ${rejected.length} verworfen.`);
console.log("Keine Links wurden automatisch eingefügt; jeder Vorschlag erfordert redaktionelle Prüfung.");
