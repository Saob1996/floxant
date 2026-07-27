#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { routeCandidates, stripHtml, writeCsv } = require("./editorial-audit-utils.js");

const root = process.cwd();
const outRoot = path.join(root, "out");
const outputFile = path.join(root, "artifacts", "google-ads-pages-audit.csv");
const sitemapFile = path.join(outRoot, "sitemap.xml");

const pages = [
  {
    route: "/duesseldorf/reinigung/anfrage",
    canonical: "https://www.floxant.de/duesseldorf/reinigung",
    h1: "Reinigung in Düsseldorf direkt anfragen",
    sourceLabel: "Google Ads – Reinigung Düsseldorf",
    formFile: "components/forms/DuesseldorfCleaningAdsForm.tsx",
    requiredFields: [
      "objectType", "cityOrZip", "serviceScope", "areaSize", "cleaningFrequency", "desiredDate",
      "name", "phone", "email", "preferredContact", "privacyConsent",
    ],
  },
  {
    route: "/umzug-regensburg/anfrage",
    canonical: "https://www.floxant.de/regensburg/umzug",
    h1: "Umzug in Regensburg unkompliziert anfragen",
    sourceLabel: "Google Ads – Umzug Regensburg",
    formFile: "components/forms/RegensburgMovingAdsForm.tsx",
    requiredFields: [
      "startLocation", "destinationLocation", "desiredDate", "roomsCount", "startFloor", "destinationFloor",
      "startElevator", "destinationElevator", "name", "phone", "email", "preferredContact", "privacyConsent",
    ],
  },
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

function h1(html) {
  return decode(stripHtml(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || ""));
}

function add(rows, page, check, expected, actual, passed) {
  rows.push({
    route: page.route,
    check,
    expected,
    actual,
    status: passed ? "PASS" : "FAIL",
  });
}

if (!fs.existsSync(sitemapFile)) {
  console.error("Google-Ads pages audit requires out/sitemap.xml. Run npm run build first.");
  process.exit(1);
}

const sitemap = fs.readFileSync(sitemapFile, "utf8");
const rows = [];

for (const page of pages) {
  const file = routeCandidates(outRoot, page.route).find((candidate) => fs.existsSync(candidate));
  add(rows, page, "STATIC_HTML", "present", file ? path.relative(root, file) : "missing", Boolean(file));
  if (!file) continue;

  const html = fs.readFileSync(file, "utf8");
  const visible = decode(stripHtml(html));
  const robots = metaContent(html, "robots").toLowerCase();
  const canonical = canonicalHref(html);
  const source = fs.readFileSync(path.join(root, page.formFile), "utf8");
  const renderedAndSource = `${html}\n${source}`;
  const missingFields = page.requiredFields.filter((field) => !new RegExp(`name=["']${field}["']|set\\(["']${field}["']`).test(renderedAndSource));
  const missingAttribution = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"]
    .filter((field) => !source.includes(field));

  add(rows, page, "H1", page.h1, h1(html), h1(html) === page.h1);
  add(rows, page, "ROBOTS_NOINDEX", "noindex", robots, robots.includes("noindex"));
  add(rows, page, "ROBOTS_FOLLOW", "follow and no nofollow", robots, robots.includes("follow") && !robots.includes("nofollow"));
  add(rows, page, "CANONICAL", page.canonical, canonical, canonical === page.canonical);
  add(rows, page, "SITEMAP", "excluded", sitemap.includes(page.route) ? "included" : "excluded", !sitemap.includes(page.route));
  add(rows, page, "TWO_STEPS", "exactly 2", source.includes("useState<1 | 2>(1)") ? "exactly 2" : "not proven", source.includes("useState<1 | 2>(1)"));
  add(rows, page, "REQUIRED_FIELDS", "all present", missingFields.join("|") || "all present", missingFields.length === 0);
  add(rows, page, "ATTRIBUTION", "UTM + gclid + gbraid + wbraid", missingAttribution.join("|") || "complete", missingAttribution.length === 0);
  add(rows, page, "DASHBOARD_SOURCE", page.sourceLabel, source.includes(page.sourceLabel) ? page.sourceLabel : "missing", source.includes(page.sourceLabel));
  add(rows, page, "PHONE", "visible", /tel:\+?49/.test(html) ? "visible" : "missing", /tel:\+?49/.test(html));
  add(rows, page, "WHATSAPP", "visible", /wa\.me\//.test(html) ? "visible" : "missing", /wa\.me\//.test(html));
  add(rows, page, "PUBLIC_TECHNICAL_COPY", "absent", /Google[\s-]?Ads[\s-]?Landingpage|Payload|Funnel|P[0-3]\b/i.test(visible) ? "found" : "absent", !/Google[\s-]?Ads[\s-]?Landingpage|Payload|Funnel|P[0-3]\b/i.test(visible));
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
