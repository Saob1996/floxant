#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const {
  inferIntent,
  inferLanguage,
  normalizeText,
  normalizeUrl,
  parseCsvFile,
  tokenize,
  writeCsv,
} = require("./lib/search-console-utils");

const root = process.cwd();
const artifacts = path.join(root, "artifacts");
const queryFile = path.join(artifacts, "gsc-query-opportunities.csv");
const pageFile = path.join(artifacts, "gsc-page-opportunities.csv");
const auditFile = path.join(artifacts, "search-authority-audit.json");
if (!fs.existsSync(queryFile) || !fs.existsSync(pageFile) || !fs.existsSync(auditFile)) {
  console.error("Erforderliche GSC- oder Search-Authority-Artefakte fehlen. Zuerst import-search-console-data.js ausführen.");
  process.exit(2);
}

const queries = parseCsvFile(queryFile).map((row) => ({
  ...row,
  clicks: Number(row.clicks || 0),
  impressions: Number(row.impressions || 0),
  ctr: Number(row.ctr || 0),
  position: Number(row.position || 0),
}));
const pageMetrics = new Map(parseCsvFile(pageFile).map((row) => [normalizeUrl(row.url), row]));
const audit = JSON.parse(fs.readFileSync(auditFile, "utf8"));
const sitemapPages = audit.pages.filter((page) => page.statusInSitemap && page.outputFound && !page.url.startsWith("/dashboard"));
const knownCompetitionPairs = new Set();
for (const group of audit.cannibalizations || []) {
  for (const first of group.urls || []) {
    for (const second of group.urls || []) {
      if (first !== second) knownCompetitionPairs.add(`${first}\n${second}`);
    }
  }
}

function pageLocale(page) {
  return String(page.language || "").toLowerCase().startsWith("en") || page.url === "/en" || page.url.startsWith("/en/") ? "en" : "de";
}

function pageText(page) {
  return [page.primaryIntent, page.title, page.h1, page.shortTitle, ...(page.semanticTerms || [])].join(" ");
}

function matchScore(query, page) {
  const queryTokens = tokenize(query);
  const target = normalizeText(pageText(page));
  let score = queryTokens.reduce((total, token) => total + (target.includes(token) ? 2 : 0), 0);
  const normalizedQuery = normalizeText(query);
  if (normalizeText(page.primaryIntent) === normalizedQuery) score += 8;
  if (normalizedQuery.includes("dusseldorf") && /duesseldorf|düsseldorf/.test(`${page.url} ${target}`)) score += 4;
  if (normalizedQuery.includes("regensburg") && /regensburg/.test(`${page.url} ${target}`)) score += 4;
  if (/angebot|quote/.test(normalizedQuery) && /angebot|quote/.test(`${page.url} ${target}`)) score += 3;
  return score;
}

function mapQuery(query) {
  const locale = inferLanguage(query);
  const candidates = sitemapPages
    .filter((page) => pageLocale(page) === locale)
    .map((page) => ({ page, score: matchScore(query, page) }))
    .sort((left, right) => right.score - left.score || left.page.url.length - right.page.url.length);
  const best = candidates[0];
  if (!best || best.score <= 0) return { primary: locale === "en" ? "/en" : "/", secondary: [], confidence: "low", scores: [] };
  const secondary = candidates
    .filter((candidate, index) => index > 0
      && best.score >= 8
      && candidate.score >= Math.max(8, best.score - 1)
      && knownCompetitionPairs.has(`${best.page.url}\n${candidate.page.url}`))
    .slice(0, 4);
  return { primary: best.page.url, secondary: secondary.map((candidate) => candidate.page.url), confidence: best.score >= 8 ? "high" : best.score >= 4 ? "medium" : "low", scores: [best, ...secondary] };
}

function categoriesFor(row, page, mapping) {
  const categories = [];
  if (row.impressions >= 100 && row.ctr < 0.02) categories.push("HIGH_IMPRESSIONS_LOW_CTR");
  if (row.position >= 4 && row.position <= 10) categories.push("POSITION_4_TO_10");
  if (row.position > 10 && row.position <= 20) categories.push("POSITION_11_TO_20", "PAGE_TWO_OPPORTUNITY");
  if (row.position <= 3 && row.clicks === 0 && row.impressions >= 10) categories.push("STRONG_POSITION_NO_CLICKS");
  if (mapping.secondary.length) categories.push("QUERY_CANNIBALIZATION");
  const queryTokens = tokenize(row.query);
  const title = normalizeText(page?.title || "");
  if (queryTokens.length && queryTokens.filter((token) => title.includes(token)).length < Math.ceil(queryTokens.length / 2)) categories.push("TITLE_MISMATCH");
  if (page && pageLocale(page) !== inferLanguage(row.query)) categories.push("LANGUAGE_MISMATCH");
  categories.push(/(^|\s)floxant(\s|$)/i.test(row.query) ? "BRAND_QUERY" : "NON_BRAND_QUERY");
  if (/düsseldorf|duesseldorf|regensburg/i.test(row.query)) categories.push("LOCAL_QUERY");
  if (inferLanguage(row.query) === "en") categories.push("ENGLISH_QUERY");
  const intent = inferIntent(row.query);
  if (/angebot|quote|preis|kosten/i.test(row.query)) categories.push("OFFER_INTENT");
  if (intent === "informational") categories.push("INFORMATIONAL_INTENT");
  if (intent === "transactional" || intent === "commercial") categories.push("TRANSACTIONAL_INTENT");
  return [...new Set(categories)];
}

function priorityFor(row, categories) {
  if (categories.includes("HIGH_IMPRESSIONS_LOW_CTR") && row.position <= 10) return "P0";
  if ((row.position >= 4 && row.position <= 20) && row.impressions >= 20) return "P1";
  if (categories.includes("QUERY_CANNIBALIZATION") || categories.includes("TITLE_MISMATCH")) return "P2";
  return "P3";
}

function recommendation(categories) {
  if (categories.includes("QUERY_CANNIBALIZATION")) return "Primär-URL manuell bestätigen; interne Links und Snippet auf diese URL ausrichten, ohne automatischen Redirect.";
  if (categories.includes("HIGH_IMPRESSIONS_LOW_CTR")) return "Ein kontrolliertes Title- oder Description-Experiment mit dokumentierter Baseline über mindestens 28 Tage durchführen.";
  if (categories.includes("POSITION_11_TO_20")) return "Suchintention, ersten sichtbaren Bereich und wenige kontextuelle interne Links manuell stärken.";
  if (categories.includes("TITLE_MISMATCH")) return "Query-Sprache und Nutzerproblem im Snippet prüfen; keine Keyword-Kette erzeugen.";
  return "Beobachten und erst bei ausreichender Datenmenge eine einzelne reversible Änderung registrieren.";
}

const opportunities = queries.map((row) => {
  const mapping = mapQuery(row.query);
  const page = sitemapPages.find((candidate) => candidate.url === mapping.primary);
  const categories = categoriesFor(row, page, mapping);
  const intent = inferIntent(row.query);
  return {
    query: row.query,
    currentPage: mapping.primary,
    currentPosition: row.position.toFixed(2),
    currentCtr: row.ctr.toFixed(6),
    impressions: row.impressions,
    clicks: row.clicks,
    categories: categories.join("|"),
    priority: priorityFor(row, categories),
    problem: categories.filter((category) => !/^(BRAND|NON_BRAND|LOCAL|ENGLISH|OFFER|INFORMATIONAL|TRANSACTIONAL)_/.test(category)).join(", ") || "keine belastbare Problematik",
    recommendedAction: recommendation(categories),
    expectedUserType: intent === "informational" ? "Informationssuchend" : inferLanguage(row.query) === "en" ? "Englischsprachige Anfrage" : "Kommerzielle lokale Anfrage",
    risk: mapping.confidence === "low" ? "Query-URL-Zuordnung nur heuristisch; GSC-Query/Page-Join manuell verifizieren." : categories.includes("QUERY_CANNIBALIZATION") ? "Falsche Ziel-URL könnte bestehende Signale schwächen." : "Snippetänderung kann CTR auch verschlechtern; Rollbackwert dokumentieren.",
    measurementPeriod: "mindestens 28 Tage",
    mappingConfidence: mapping.confidence,
    secondaryUrls: mapping.secondary,
    locale: inferLanguage(row.query),
    intent,
  };
}).sort((left, right) => ["P0", "P1", "P2", "P3"].indexOf(left.priority) - ["P0", "P1", "P2", "P3"].indexOf(right.priority) || right.impressions - left.impressions);

const queryUrlRows = opportunities.map((item) => ({
  query: item.query,
  locale: item.locale,
  intent: item.intent,
  primaryUrl: item.currentPage,
  secondaryUrls: item.secondaryUrls.join("|"),
  impressions: item.impressions,
  clicks: item.clicks,
  position: item.currentPosition,
  cannibalizationRisk: item.secondaryUrls.length ? "possible" : "none_detected",
  recommendedAction: item.secondaryUrls.length ? "manual_primary_url_review" : "keep_and_measure",
  manualReview: item.mappingConfidence !== "high" || item.secondaryUrls.length ? "true" : "false",
}));
writeCsv(path.join(artifacts, "query-url-map.csv"), ["query", "locale", "intent", "primaryUrl", "secondaryUrls", "impressions", "clicks", "position", "cannibalizationRisk", "recommendedAction", "manualReview"], queryUrlRows);

const cannibalizationRows = opportunities.filter((item) => item.secondaryUrls.length && item.impressions > 0).map((item) => ({
  query: item.query,
  primaryUrl: item.currentPage,
  secondaryUrls: item.secondaryUrls.join("|"),
  impressions: item.impressions,
  clicks: item.clicks,
  position: item.currentPosition,
  risk: item.mappingConfidence === "high" ? "medium" : "high",
  reason: "Mehrere Sitemap-URLs decken semantisch dieselbe reale Query ab; Standard-GSC-Export enthält keinen Query/Page-Join.",
  manualReview: "true",
}));
writeCsv(path.join(artifacts, "gsc-cannibalization.csv"), ["query", "primaryUrl", "secondaryUrls", "impressions", "clicks", "position", "risk", "reason", "manualReview"], cannibalizationRows);

const pageRows = [...pageMetrics.entries()].map(([url, row]) => ({
  url,
  clicks: Number(row.clicks || 0),
  impressions: Number(row.impressions || 0),
  ctr: Number(row.ctr || 0),
  position: Number(row.position || 0),
}));
const decliningOrGrowing = JSON.parse(fs.readFileSync(path.join(artifacts, "gsc-summary.json"), "utf8")).trend;
const counts = Object.fromEntries(["P0", "P1", "P2", "P3"].map((priority) => [priority, opportunities.filter((item) => item.priority === priority).length]));
const top = opportunities.filter((item) => item.priority !== "P3").slice(0, 30);
const md = [
  "# Search-Opportunity-Report",
  "",
  "## Datenbasis und Grenzen",
  "",
  `Analysiert wurden ${queries.length} aggregierte reale Suchanfragen und ${pageRows.length} Seiten aus dem lokalen GSC-Export. Der Standardexport trennt Query- und Page-Tabellen; die Query-URL-Zuordnung ist deshalb als semantische Heuristik mit Pflicht zur manuellen Prüfung markiert. Es gibt keine Rankinggarantie und keinen künstlichen Gesamtscore.`,
  "",
  `Gesamttrend der verfügbaren ${decliningOrGrowing.periodDays}-Tage-Vergleichsfenster: **${decliningOrGrowing.classification}** (${decliningOrGrowing.firstClicks} zu ${decliningOrGrowing.lastClicks} Klicks). Dieser Trend gilt für den Export insgesamt, nicht für einzelne Seiten.`,
  "",
  "## Nachvollziehbare Prioritäten",
  "",
  `- P0: ${counts.P0}`,
  `- P1: ${counts.P1}`,
  `- P2: ${counts.P2}`,
  `- P3 / beobachten: ${counts.P3}`,
  `- mögliche Query-Kannibalisierungen: ${cannibalizationRows.length}`,
  "",
  "P0 bedeutet ausschließlich: hohe Impressionen, niedrige CTR und Position bis 10. P1 bedeutet: Position 4 bis 20, mindestens 20 Impressionen. P2 bündelt nachvollziehbare Snippet-/Intent-/Kannibalisierungsprüfungen. Änderungen bleiben einzeln, reversibel und mindestens 28 Tage messbar.",
  "",
  "## Priorisierte Chancen",
  "",
  "| Priorität | Query | Zielseite | Impressionen | Klicks | Position | CTR | Problem | Maßnahme | Risiko |",
  "| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- |",
  ...top.map((item) => `| ${item.priority} | ${item.query.replace(/\|/g, "\\|")} | ${item.currentPage} | ${item.impressions} | ${item.clicks} | ${item.currentPosition} | ${(Number(item.currentCtr) * 100).toFixed(2)} % | ${item.problem.replace(/\|/g, ", ")} | ${item.recommendedAction.replace(/\|/g, ", ")} | ${item.risk.replace(/\|/g, ", ")} |`),
  "",
  "## Seitensignale",
  "",
  ...pageRows.sort((left, right) => right.impressions - left.impressions).slice(0, 15).map((row) => `- ${row.url}: ${row.impressions} Impressionen, ${row.clicks} Klicks, ${(row.ctr * 100).toFixed(2)} % CTR, Position ${row.position.toFixed(2)}.`),
  "",
  "## Kontrollregeln",
  "",
  "- Query-URL-Zuordnungen mit `manualReview=true` müssen in GSC mit Query-plus-Seitenfilter bestätigt werden.",
  "- Keine automatische Weiterleitung, Löschung oder Noindex-Änderung.",
  "- Maximal ein großes aktives Experiment je URL.",
  "- Title, H1, Description und Hero nicht gleichzeitig austauschen.",
  "- Gewinner oder Verlierer erst nach dokumentierter Mindestlaufzeit bewerten.",
  "- Brand- und Non-Brand-Queries getrennt auswerten.",
];
fs.writeFileSync(path.join(root, "docs", "search-opportunity-report.md"), `${md.join("\n")}\n`, "utf8");

const summaryPath = path.join(artifacts, "gsc-summary.json");
const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
summary.analysis = {
  generatedAt: new Date().toISOString(),
  opportunities: opportunities.length,
  priorityCounts: counts,
  possibleCannibalizationQueries: cannibalizationRows.length,
  existingMetadataCannibalizationGroups: audit.cannibalizations.length,
  queryUrlMappingsRequiringManualReview: queryUrlRows.filter((row) => row.manualReview === "true").length,
  rankingGuarantee: false,
};
fs.writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");

console.log(JSON.stringify({ queries: opportunities.length, priorities: counts, possibleCannibalizations: cannibalizationRows.length, existingMetadataGroups: audit.cannibalizations.length, report: "docs/search-opportunity-report.md" }, null, 2));
