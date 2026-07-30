#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const {
  normalizeText,
  routeCandidates,
  stripHtml,
  walk,
  writeCsv,
} = require("./editorial-audit-utils.js");

const root = process.cwd();
const outRoot = path.join(root, "out");
const outputFile = path.join(root, "artifacts", "duesseldorf-service-pages-audit.csv");
const sitemapFile = path.join(outRoot, "sitemap.xml");
const redirectsFile = path.join(root, "public", "_redirects");

const pages = [
  { route: "/duesseldorf/reinigung", intent: "allgemeine Reinigung", searchTerm: "reinigung", primary: "reinigung" },
  { route: "/duesseldorf/bueroreinigung", intent: "Büroreinigung", searchTerm: "büroreinigung", primary: "bueroreinigung" },
  { route: "/duesseldorf/praxisreinigung", intent: "Praxisreinigung", searchTerm: "praxisreinigung", primary: "praxisreinigung" },
  { route: "/duesseldorf/fensterreinigung", intent: "Fensterreinigung", searchTerm: "fensterreinigung", primary: "fensterreinigung" },
  { route: "/duesseldorf/grundreinigung", intent: "Grundreinigung", searchTerm: "grundreinigung", primary: "grundreinigung" },
  { route: "/duesseldorf/unterhaltsreinigung", intent: "Unterhaltsreinigung", searchTerm: "unterhaltsreinigung", primary: "unterhaltsreinigung" },
  { route: "/duesseldorf/baureinigung", intent: "Bau- und Bauendreinigung", searchTerm: "bauendreinigung", primary: "bauendreinigung" },
  { route: "/duesseldorf/treppenhausreinigung", intent: "Treppenhausreinigung", searchTerm: "treppenhausreinigung", primary: "treppenhausreinigung" },
  { route: "/duesseldorf/gewerbereinigung", intent: "Gewerbereinigung", searchTerm: "gewerbereinigung", primary: "gewerbereinigung" },
];

function decode(value) {
  return String(value || "")
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
    .replace(/\s+/g, " ")
    .trim();
}

function capture(html, pattern) {
  return decode(stripHtml(html.match(pattern)?.[1] || ""));
}

function metaContent(html, name) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const key = tag.match(/\b(?:name|property)=["']([^"']+)["']/i)?.[1] || "";
    if (key.toLowerCase() !== name.toLowerCase()) continue;
    return decode(tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] || "");
  }
  return "";
}

function canonicalHref(html) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const tag = tags.find((candidate) => /\brel=["']canonical["']/i.test(candidate));
  return decode(tag?.match(/\bhref=["']([^"']+)["']/i)?.[1] || "");
}

function firstIntro(html) {
  const h1End = html.search(/<\/h1>/i);
  const afterH1 = h1End >= 0 ? html.slice(h1End + 5) : html;
  return capture(afterH1, /<p\b[^>]*>([\s\S]*?)<\/p>/i);
}

function add(rows, route, check, expected, actual, passed) {
  rows.push({ route, check, expected, actual, status: passed ? "PASS" : "FAIL" });
}

if (!fs.existsSync(outRoot) || !fs.existsSync(sitemapFile)) {
  console.error("Düsseldorf service pages audit requires an existing static build in out/. Run npm run build first.");
  process.exit(1);
}

const sitemap = fs.readFileSync(sitemapFile, "utf8");
const redirects = fs.readFileSync(redirectsFile, "utf8");
const allHtmlFiles = walk(outRoot, (entry) => entry.endsWith(".html"));
const htmlByFile = new Map(allHtmlFiles.map((file) => [file, fs.readFileSync(file, "utf8")]));
const records = [];
const rows = [];

for (const page of pages) {
  const file = routeCandidates(outRoot, page.route).find((candidate) => fs.existsSync(candidate));
  add(rows, page.route, "STATUS_200_STATIC", "static HTML present", file ? path.relative(root, file) : "missing", Boolean(file));
  if (!file) continue;

  const html = htmlByFile.get(file);
  const mainHtml = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
  const title = capture(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const h1Values = [...mainHtml.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => decode(stripHtml(match[1])));
  const description = metaContent(html, "description");
  const intro = firstIntro(mainHtml);
  const canonical = canonicalHref(html);
  const routePattern = page.route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const redirectConflict = new RegExp(`^${routePattern}\\s+`, "m").test(redirects);
  const inboundLinks = [...htmlByFile.entries()]
    .filter(([candidate]) => candidate !== file)
    .reduce((count, [, candidateHtml]) => count + ((candidateHtml.match(new RegExp(`href=["']${routePattern}(?:["'#?])`, "g")) || []).length), 0);
  const faqCount = Math.max(
    (mainHtml.match(/<details\b/gi) || []).length,
    (mainHtml.match(/"@type":"Question"/g) || []).length,
  );
  const mainText = normalizeText(decode(stripHtml(mainHtml)));
  const hasCorrectCta = mainHtml.includes("city=duesseldorf") && !mainHtml.includes("city=regensburg");

  records.push({ ...page, title, h1: h1Values[0] || "", description, intro });
  add(rows, page.route, "TITLE", "unique and service-specific", title, title.includes("Düsseldorf") && title.length >= 25);
  add(rows, page.route, "H1", "exactly one service-specific H1", `${h1Values.length}: ${h1Values[0] || ""}`, h1Values.length === 1 && h1Values[0].includes("Düsseldorf"));
  add(rows, page.route, "META_DESCRIPTION", "service-specific, 80+ characters", description, description.length >= 80 && description.includes("Düsseldorf"));
  add(rows, page.route, "INTRO", "service-specific, 100+ characters", intro.slice(0, 220), intro.length >= 100);
  add(rows, page.route, "SEARCH_INTENT", page.intent, `${title} | ${h1Values[0] || ""}`, normalizeText(`${title} ${h1Values[0] || ""}`).includes(normalizeText(page.searchTerm)));
  add(rows, page.route, "CANONICAL", `https://www.floxant.de${page.route}`, canonical, canonical === `https://www.floxant.de${page.route}`);
  add(rows, page.route, "REDIRECT_CONFLICT", "none", redirectConflict ? "primary route redirects" : "none", !redirectConflict);
  add(rows, page.route, "SITEMAP", "included", sitemap.includes(`<loc>https://www.floxant.de${page.route}</loc>`) ? "included" : "missing", sitemap.includes(`<loc>https://www.floxant.de${page.route}</loc>`));
  add(rows, page.route, "INTERNAL_LINKS", "at least one inbound link", inboundLinks, inboundLinks >= 1);
  add(rows, page.route, "FAQ", "at least three page FAQ entries", faqCount, faqCount >= 3);
  add(rows, page.route, "LOCATION_CONTENT", "Düsseldorf only", mainText.includes("regensburg") ? "Regensburg found" : "clean", mainText.includes("dusseldorf") && !mainText.includes("regensburg"));
  add(rows, page.route, "CTA", "Düsseldorf request target", hasCorrectCta ? "city=duesseldorf" : "missing or mixed", hasCorrectCta);
}

for (const field of ["title", "h1", "description", "intro"]) {
  const groups = new Map();
  for (const record of records) {
    const value = normalizeText(record[field]);
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(record.route);
  }
  for (const record of records) {
    const duplicates = groups.get(normalizeText(record[field])) || [];
    add(rows, record.route, `UNIQUE_${field.toUpperCase()}`, "unique", duplicates.join("|"), duplicates.length === 1);
  }
}

for (const primary of ["bueroreinigung", "praxisreinigung", "fensterreinigung"]) {
  const matchingRecords = records.filter((record) => record.primary === primary);
  add(
    rows,
    `/duesseldorf/${primary}`,
    "PRIMARY_INTENT_URL",
    `one primary ${primary} URL`,
    matchingRecords.map((record) => record.route).join("|"),
    matchingRecords.length === 1,
  );
}

writeCsv(outputFile, ["route", "check", "expected", "actual", "status"], rows);
const failures = rows.filter((row) => row.status === "FAIL");
console.log(JSON.stringify({
  status: failures.length ? "FAIL" : "PASS",
  pages: pages.length,
  checks: rows.length,
  failures: failures.length,
  output: path.relative(root, outputFile),
}, null, 2));
if (failures.length) process.exit(1);
