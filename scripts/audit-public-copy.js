#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { routeCandidates, stripHtml, writeCsv } = require("./editorial-audit-utils.js");

const root = process.cwd();
const outRoot = path.join(root, "out");
const sitemapFile = path.join(outRoot, "sitemap.xml");
const outputFile = path.join(root, "artifacts", "public-copy.csv");

if (!fs.existsSync(sitemapFile)) {
  console.error("Public-copy audit requires out/sitemap.xml. Run npm run build first.");
  process.exit(1);
}

const terms = [
  ["SEO", /\bSEO\b/giu],
  ["Ranking", /\bRanking(?:s)?\b/giu],
  ["Keyword", /\bKeywords?\b/giu],
  ["Search Intent", /\bSearch[\s-]?Intent\b/giu],
  ["Query", /\bQuer(?:y|ies)\b/giu],
  ["Conversion", /\bConversions?\b/giu],
  ["Lead", /\b(?:B2B[\s-]?Leads?|Lead[\s-]?(?:Formular|Strecke|Erfassung|Generierung|Management))\b/giu],
  ["Funnel", /\bFunnels?\b/giu],
  ["Payload", /\bPayloads?\b/giu],
  ["Mapping", /\bMappings?\b/giu],
  ["Routing", /\bRouting\b/giu],
  ["Registry", /\bRegistr(?:y|ies)\b/giu],
  ["Audit", /\bAudits?\b/giu],
  ["QA", /\bQA\b/gu],
  ["Health Check", /\bHealth[\s-]?Checks?\b/giu],
  ["Canonical Mapping", /\bCanonical[\s-]?Mapping\b/giu],
  ["Local Proof", /\bLocal[\s-]?Proof\b/giu],
  ["Trust Proof", /\bTrust[\s-]?Proof\b/giu],
  ["Visual Proof", /\bVisual[\s-]?Proof\b/giu],
  ["Servicefit", /\bService[\s-]?fit\b/giu],
  ["Signature-Empfehlung", /\bSignature[\s-]?Empfehlung\b/giu],
  ["Performance Budget", /\bPerformance[\s-]?Budget\b/giu],
  ["Priority Code", /\bP[0-3]\b/gu],
  ["AI Discoverability", /\bAI[\s-]?Discoverability\b/giu],
  ["GSC", /\bGSC\b/gu],
  ["SERP", /\bSERPs?\b/giu],
  ["Event Tracking", /\bEvent[\s-]?Tracking\b/giu],
  ["Datenmodell", /\bDatenmodell(?:e)?\b/giu],
  ["Marketing-Modul", /\bMarketing[\s-]?Modul(?:e)?\b/giu],
  ["Google-Ads-Landingpage", /\bGoogle[\s-]?Ads[\s-]?Landingpage\b/giu],
  ["Framework Error", /\b(?:Framework|Hydration|Runtime)[\s-]?(?:Error|Fehler)\b/giu],
  ["Public Test Content", /\b(?:synthetic|systemtest|testdatensatz|kein kundenauftrag)\b/giu],
];

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
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function metaTexts(html) {
  const values = [];
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (title) values.push(["title", decode(title)]);
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const key = tag.match(/\b(?:name|property)=["']([^"']+)["']/i)?.[1] || "";
    if (!/^(?:description|og:title|og:description|twitter:title|twitter:description)$/i.test(key)) continue;
    values.push([key, decode(tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] || "")]);
  }
  return values;
}

function visibleText(html) {
  return decode(stripHtml(
    html
      .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " "),
  )).replace(/\s+/g, " ").trim();
}

function snippet(text, index, length) {
  return text.slice(Math.max(0, index - 70), Math.min(text.length, index + length + 110)).replace(/\s+/g, " ").trim();
}

const sitemap = fs.readFileSync(sitemapFile, "utf8");
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((match) => new URL(decode(match[1])).pathname.replace(/\/+$/, "") || "/");
routes.push("/duesseldorf/reinigung/anfrage", "/umzug-regensburg/anfrage");

const rows = [];
for (const route of [...new Set(routes)]) {
  const file = routeCandidates(outRoot, route).find((candidate) => fs.existsSync(candidate));
  if (!file) {
    rows.push({ route, context: "html", term: "MISSING_HTML", snippet: "", status: "ERROR" });
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const contexts = [["visible", visibleText(html)], ...metaTexts(html)];
  for (const [context, text] of contexts) {
    for (const [term, pattern] of terms) {
      for (const match of text.matchAll(new RegExp(pattern.source, pattern.flags))) {
        rows.push({
          route,
          context,
          term,
          snippet: snippet(text, match.index || 0, match[0].length),
          status: "ERROR",
        });
      }
    }
  }
}

const uniqueRows = [...new Map(rows.map((row) => [[row.route, row.context, row.term, row.snippet].join("\u0000"), row])).values()];
writeCsv(outputFile, ["route", "context", "term", "snippet", "status"], uniqueRows);
console.log(JSON.stringify({
  status: uniqueRows.length ? "FAIL" : "PASS",
  pages: new Set(routes).size,
  findings: uniqueRows.length,
  output: path.relative(root, outputFile),
}, null, 2));
if (uniqueRows.length) process.exit(1);
