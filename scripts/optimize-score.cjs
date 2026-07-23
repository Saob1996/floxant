#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "docs");

const FILES = {
  gsc: ["live-gsc-import-report.json", "gsc-import-report.json", "gsc-2026-07-05-import-report.json"],
  seoConversion: ["seo-conversion-report.json"],
  leadHealth: ["lead-health-report.json"],
  siteQa: ["site-qa-report.json"],
  vercelUsage: ["vercel-usage-safety-report.json"],
  contentQuality: ["content-quality-report.json", "editorial-quality-report.json"],
  snippetHealth: ["snippet-health-report.json"],
};

const OUTPUTS = {
  markdown: path.join(DOCS_DIR, "OPTIMIZATION_SCORE_REPORT.md"),
  json: path.join(ROOT, "optimization-score-report.json"),
};

function readJsonCandidates(candidates) {
  for (const candidate of candidates) {
    const file = path.join(ROOT, candidate);
    if (!fs.existsSync(file)) continue;
    try {
      return { file: candidate, data: JSON.parse(fs.readFileSync(file, "utf8")) };
    } catch (error) {
      return { file: candidate, error: error.message, data: null };
    }
  }
  return { file: null, data: null };
}

function redactPii(value) {
  return String(value ?? "")
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]")
    .replace(/(?:\+?\d[\d\s()./-]{6,}\d)/g, "[redacted-phone]")
    .replace(/\b(?:telefon|phone|email|e-mail|mail)\s*[:=]\s*\S+/gi, "$1:[redacted]");
}

function mdEscape(value) {
  return redactPii(value).replace(/\r?\n/g, " ").replace(/\|/g, "\\|").trim() || "-";
}

function mdTable(headers, rows) {
  return [
    `| ${headers.map(mdEscape).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...(rows.length ? rows.map((row) => `| ${row.map(mdEscape).join(" | ")} |`) : [`| ${headers.map(() => "-").join(" | ")} |`]),
  ].join("\n");
}

function statusCounts(items) {
  const counts = { pass: 0, warn: 0, fail: 0 };
  for (const item of items || []) {
    const status = String(item.status || "").toUpperCase();
    if (status === "PASS") counts.pass += 1;
    else if (status === "FAIL") counts.fail += 1;
    else if (status === "WARN") counts.warn += 1;
  }
  return counts;
}

function priorityFromScore(score, hardRisk = false) {
  if (hardRisk) return "P0";
  if (score >= 70) return "P0";
  if (score >= 45) return "P1";
  if (score >= 25) return "P2";
  return "P3";
}

function number(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function isMoneyPage(route, record = {}) {
  const value = `${route} ${record.service || ""}`.toLowerCase();
  return [
    "kontakt",
    "angebot",
    "reinigung",
    "bueroreinigung",
    "gewerbereinigung",
    "umzug",
    "entruempelung",
    "klaviertransport",
    "praxisreinigung",
    "fensterreinigung",
    "diskret",
  ].some((needle) => value.includes(needle));
}

function buildConversionMap(report) {
  const map = new Map();
  for (const page of report?.pages || []) {
    if (!page.path) continue;
    map.set(page.path, page);
  }
  return map;
}

function buildQaMap(report) {
  const map = new Map();
  for (const item of report?.criticalRoutes || []) {
    if (item.route) map.set(item.route, item);
  }
  for (const item of report?.results || []) {
    if (item.route) map.set(item.route, item);
    if (item.path) map.set(item.path, item);
  }
  return map;
}

function buildSnippetMap(report) {
  const map = new Map();
  for (const item of report?.results || []) {
    if (item.route) map.set(item.route, item);
  }
  return map;
}

function scorePage(record, context) {
  const route = record.path || record.page || record.targetPage || "";
  const conversion = context.conversionMap.get(route) || context.conversionMap.get(record.targetPage || "") || {};
  const qa = context.qaMap.get(route) || context.qaMap.get(record.targetPage || "") || {};
  const snippet = context.snippetMap.get(route) || context.snippetMap.get(record.targetPage || "") || {};
  const reasons = [];
  let score = 0;

  const impressions = number(record.impressions);
  const ctr = number(record.ctr);
  const position = number(record.position);

  if (impressions >= 1000) {
    score += 25;
    reasons.push("sehr viele Impressionen");
  } else if (impressions >= 250) {
    score += 18;
    reasons.push("viele Impressionen");
  } else if (impressions >= 50) {
    score += 10;
    reasons.push("sichtbare Impressionen");
  }

  if (position >= 4 && position <= 15) {
    score += 18;
    reasons.push("Position 4-15");
  } else if (position > 15 && position <= 30) {
    score += 10;
    reasons.push("Position 16-30");
  }

  if (ctr > 0 && ctr < 1) {
    score += 15;
    reasons.push("niedrige CTR");
  } else if (ctr === 0 && impressions >= 20) {
    score += 18;
    reasons.push("Impressionen ohne Klicks");
  }

  if (isMoneyPage(route, record)) {
    score += 10;
    reasons.push("Money-/Service-Seite");
  }

  if (!conversion.contactCta || conversion.status === "WARN" || conversion.status === "FAIL") {
    score += 10;
    reasons.push("CTA/Conversion statisch pruefen");
  }

  if (record.service === "angebot-pruefen" && !String(conversion.contactCta || "").includes("angebot")) {
    score += 8;
    reasons.push("Angebotspruefung passt, aber CTA-Signal ist unklar");
  }

  if (snippet.status === "WARN" || qa.status === "WARN") {
    score += 8;
    reasons.push("Snippet/QA Warnung");
  }

  const technicalRisk = [conversion.status, qa.status, snippet.status].some((status) => String(status).toUpperCase() === "FAIL");
  const vercelFail = context.vercelFail;
  if (technicalRisk) {
    score += 15;
    reasons.push("technischer Fehler im vorhandenen Report");
  }

  const priority = priorityFromScore(score, technicalRisk || vercelFail);
  return {
    url: redactPii(route || record.targetPage || record.label),
    pageType: record.type || "page",
    service: record.service || "",
    city: record.city || "",
    impressions,
    clicks: number(record.clicks),
    ctr,
    position,
    score,
    priority,
    reasons,
    expectedImpact: "Moeglich hoeherer qualifizierter SEO-Klick- oder Anfrageanteil; keine Garantie.",
    nextAction: technicalRisk ? "Technischen Fehler vor Content-Aenderung klaeren." : "Snippet, CTA und Query-to-Page-Fit pruefen.",
    risk: vercelFail ? "Vercel-Risiko vor Umsetzung stoppen." : technicalRisk ? "Technischer Report enthaelt FAIL." : "normal",
  };
}

function scoreQuery(record) {
  const signals = record.liveSignals || {};
  const reasons = [];
  let score = 0;

  if (record.priority === "P0") {
    score += 20;
    reasons.push("GSC-P0");
  } else if (record.priority === "P1") {
    score += 12;
    reasons.push("GSC-P1");
  }
  if (signals.isOfferCheckQuery) {
    score += 12;
    reasons.push("Angebotspruefung");
  }
  if (signals.isDuesseldorfQuery || signals.isRegensburgQuery) {
    score += 12;
    reasons.push("Kernstandort");
  }
  if (record.service === "bueroreinigung" || record.service === "gewerbereinigung") {
    score += 10;
    reasons.push("B2B-Service");
  }
  if (signals.isSpecialServiceQuery) {
    score += 8;
    reasons.push("Spezialservice");
  }
  if (signals.isSignatureServiceQuery) {
    score += 8;
    reasons.push("Signature Service");
  }
  if (signals.isEnglishIntentQuery) {
    score += 6;
    reasons.push("English Intent");
  }
  if (signals.missingTargetPage) {
    score += 8;
    reasons.push("Zielseite unklar oder kritisch");
  }
  if (signals.weakCtrTop10) {
    score += 16;
    reasons.push("Top-10 mit schwacher CTR");
  }
  if (signals.highRelevance11to20) {
    score += 12;
    reasons.push("Position 11-20 mit Relevanz");
  }
  if (signals.highImpressionsWeakPosition) {
    score += 10;
    reasons.push("viele Impressionen, schwache Position");
  }

  let priority = score >= 60 ? "P0" : score >= 42 ? "P1" : score >= 25 ? "P2" : "P3";
  if (signals.unsupportedCity || signals.unsupportedService) {
    priority = "P3";
    reasons.push("nicht klar bedient: beobachten/manuell entscheiden");
  }

  return {
    query: redactPii(record.query || record.label),
    targetPage: redactPii(record.targetPage || ""),
    service: record.service || "",
    city: record.city || "",
    impressions: number(record.impressions),
    clicks: number(record.clicks),
    ctr: number(record.ctr),
    position: number(record.position),
    score,
    priority,
    reasons,
    nextAction:
      priority === "P0"
        ? "Snippet, Zielseite und CTA als erste Hypothese pruefen."
        : priority === "P1"
          ? "Naechsten Sprint als Kandidat aufnehmen."
          : "Beobachten oder manuell qualifizieren.",
  };
}

function buildLeadOpportunity(leadHealth, seoConversion) {
  const leadCounts = statusCounts(leadHealth?.results || []);
  const conversionCounts = statusCounts(seoConversion?.pages || []);
  const realLeadDataAvailable = false;
  return {
    status: realLeadDataAvailable ? "READY" : "DATA_GAP",
    score: realLeadDataAvailable ? 50 : 0,
    priority: "P2",
    evidence: [
      `lead:health PASS/WARN/FAIL ${leadCounts.pass}/${leadCounts.warn}/${leadCounts.fail}`,
      `seo:conversion PASS/WARN/FAIL ${conversionCounts.pass}/${conversionCounts.warn}/${conversionCounts.fail}`,
      "Keine anonymisierte echte Lead-Qualitaet im Repo gefunden.",
    ],
    nextAction: "Lead Feedback Log manuell/anonymisiert fuehren; keine Conversion-Rates erfinden.",
  };
}

function sortByScore(items) {
  return [...items].sort((a, b) => b.score - a.score || b.impressions - a.impressions || b.clicks - a.clicks);
}

function main() {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
  const sources = Object.fromEntries(Object.entries(FILES).map(([key, candidates]) => [key, readJsonCandidates(candidates)]));
  const gsc = sources.gsc.data || {};
  const seoConversion = sources.seoConversion.data || {};
  const siteQa = sources.siteQa.data || {};
  const vercelUsage = sources.vercelUsage.data || {};
  const snippetHealth = sources.snippetHealth.data || {};
  const leadHealth = sources.leadHealth.data || {};

  const conversionMap = buildConversionMap(seoConversion);
  const qaMap = buildQaMap(siteQa);
  const snippetMap = buildSnippetMap(snippetHealth);
  const vercelFail = String(vercelUsage.status || "").toUpperCase() === "FAIL" || (vercelUsage.summary?.fail || 0) > 0;
  const context = { conversionMap, qaMap, snippetMap, vercelFail };

  const pages = sortByScore((gsc.pages || []).map((record) => scorePage(record, context)));
  const queries = sortByScore((gsc.queries || []).map(scoreQuery));
  const leadOpportunity = buildLeadOpportunity(leadHealth, seoConversion);
  const p0Pages = pages.filter((item) => item.priority === "P0");
  const p1Pages = pages.filter((item) => item.priority === "P1");
  const p0Queries = queries.filter((item) => item.priority === "P0");
  const p1Queries = queries.filter((item) => item.priority === "P1");

  const missingSources = Object.entries(sources)
    .filter(([, source]) => !source.file)
    .map(([key]) => key);
  const parseErrors = Object.entries(sources)
    .filter(([, source]) => source.error)
    .map(([key, source]) => `${key}: ${source.error}`);

  const status = parseErrors.length || vercelFail ? "WARN" : missingSources.includes("gsc") ? "WARN" : "PASS";
  const payload = {
    status,
    generatedAt: new Date().toISOString(),
    sources: Object.fromEntries(Object.entries(sources).map(([key, source]) => [key, source.file || "MISSING"])),
    warnings: [
      ...missingSources.map((key) => `${key} source missing`),
      ...parseErrors,
      ...(leadOpportunity.status === "DATA_GAP" ? ["No anonymized real lead feedback available; lead scores remain structural."] : []),
      ...(vercelFail ? ["Vercel usage report contains FAIL; optimization should pause until resolved."] : []),
    ],
    summary: {
      pageOpportunities: pages.length,
      queryOpportunities: queries.length,
      p0Pages: p0Pages.length,
      p1Pages: p1Pages.length,
      p0Queries: p0Queries.length,
      p1Queries: p1Queries.length,
      leadOpportunityStatus: leadOpportunity.status,
    },
    pageOpportunities: pages,
    queryOpportunities: queries,
    leadOpportunity,
    topRecommendations: [
      ...p0Pages.slice(0, 3).map((item) => ({ type: "page", target: item.url, priority: item.priority, reason: item.reasons.join("; "), nextAction: item.nextAction })),
      ...p0Queries.slice(0, 4).map((item) => ({ type: "query", target: item.query, priority: item.priority, reason: item.reasons.join("; "), nextAction: item.nextAction })),
    ].slice(0, 5),
    piiSafety: {
      status: "PASS",
      rule: "New optimization score outputs redact obvious email and phone patterns; no raw lead messages are read.",
    },
  };

  const markdown = `# Optimization Score Report

Status: ${payload.status}
Generiert: ${payload.generatedAt}

## Quellen

${mdTable(
    ["Quelle", "Datei"],
    Object.entries(payload.sources).map(([key, value]) => [key, value]),
  )}

## Zusammenfassung

- Page Opportunities: ${payload.summary.pageOpportunities}
- Query Opportunities: ${payload.summary.queryOpportunities}
- P0 Pages: ${payload.summary.p0Pages}
- P1 Pages: ${payload.summary.p1Pages}
- P0 Queries: ${payload.summary.p0Queries}
- P1 Queries: ${payload.summary.p1Queries}
- Lead Opportunity: ${payload.summary.leadOpportunityStatus}

## P0 Page Opportunities

${mdTable(
    ["URL", "Score", "Service", "Stadt", "Impr.", "CTR", "Pos.", "Gruende", "Naechste Aktion"],
    p0Pages.slice(0, 20).map((item) => [item.url, item.score, item.service, item.city || "-", item.impressions, `${item.ctr}%`, item.position, item.reasons.join("; "), item.nextAction]),
  )}

## P1 Page Opportunities

${mdTable(
    ["URL", "Score", "Service", "Stadt", "Impr.", "CTR", "Pos.", "Gruende", "Naechste Aktion"],
    p1Pages.slice(0, 20).map((item) => [item.url, item.score, item.service, item.city || "-", item.impressions, `${item.ctr}%`, item.position, item.reasons.join("; "), item.nextAction]),
  )}

## P0 Query Opportunities

${mdTable(
    ["Query", "Zielseite", "Score", "Service", "Stadt", "Impr.", "CTR", "Pos.", "Gruende", "Naechste Aktion"],
    p0Queries.slice(0, 30).map((item) => [item.query, item.targetPage || "-", item.score, item.service, item.city || "-", item.impressions, `${item.ctr}%`, item.position, item.reasons.join("; "), item.nextAction]),
  )}

## P1 Query Opportunities

${mdTable(
    ["Query", "Zielseite", "Score", "Service", "Stadt", "Impr.", "CTR", "Pos.", "Gruende", "Naechste Aktion"],
    p1Queries.slice(0, 30).map((item) => [item.query, item.targetPage || "-", item.score, item.service, item.city || "-", item.impressions, `${item.ctr}%`, item.position, item.reasons.join("; "), item.nextAction]),
  )}

## Lead Opportunity

- Status: ${leadOpportunity.status}
- Evidenz: ${leadOpportunity.evidence.map(mdEscape).join("; ")}
- Naechste Aktion: ${leadOpportunity.nextAction}

## Warnungen

${payload.warnings.map((warning) => `- ${mdEscape(warning)}`).join("\n") || "- keine"}

## Scoring-Regeln

- P0: Score ab 70 oder harte technische/Vercel-Blockade.
- P1: Score ab 45.
- P2: Score ab 25.
- P3: beobachten, ignorieren oder nur mit manueller Business-Freigabe.
- Keine erwartete Wirkung ist eine Garantie.
- Nicht bediente Orte/Leistungen bleiben P3, bis FLOXANT sie bewusst anbietet.
- Es werden keine personenbezogenen Daten, Lead-Nachrichten oder Fake-Conversions gespeichert.
`;

  fs.writeFileSync(OUTPUTS.json, JSON.stringify(payload, null, 2));
  fs.writeFileSync(OUTPUTS.markdown, markdown);

  console.log(`optimize:score status: ${status}`);
  console.log(`P0 pages: ${p0Pages.length}`);
  console.log(`P0 queries: ${p0Queries.length}`);
  console.log(`Reports written: ${path.relative(ROOT, OUTPUTS.markdown)}, ${path.relative(ROOT, OUTPUTS.json)}`);
  if (status === "FAIL") process.exitCode = 1;
}

main();
