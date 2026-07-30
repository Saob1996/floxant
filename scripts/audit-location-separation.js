#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const {
  normalizeText,
  routeCandidates,
  stripHtml,
  writeCsv,
} = require("./editorial-audit-utils.js");

const root = process.cwd();
const outRoot = path.join(root, "out");
const outputFile = path.join(root, "artifacts", "location-separation-audit.csv");
const sitemapFile = path.join(outRoot, "sitemap.xml");

const routeGroups = [
  {
    location: "Düsseldorf",
    wrongLocation: "Regensburg",
    canonicalPrefix: "/duesseldorf/",
    wrongRoutePrefix: "/regensburg",
    routes: [
      "/duesseldorf/reinigung",
      "/duesseldorf/bueroreinigung",
      "/duesseldorf/praxisreinigung",
      "/duesseldorf/fensterreinigung",
      "/duesseldorf/grundreinigung",
      "/duesseldorf/unterhaltsreinigung",
      "/duesseldorf/baureinigung",
      "/duesseldorf/treppenhausreinigung",
      "/duesseldorf/gewerbereinigung",
    ],
  },
  {
    location: "Regensburg",
    wrongLocation: "Düsseldorf",
    canonicalPrefix: "/regensburg/",
    wrongRoutePrefix: "/duesseldorf",
    routes: [
      "/regensburg/reinigung",
      "/regensburg/bueroreinigung",
      "/regensburg/gewerbereinigung",
      "/regensburg/umzug",
      "/regensburg/entruempelung",
      "/regensburg/wohnungsaufloesung",
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
    .replace(/&szlig;/gi, "ß");
}

function canonicalHref(html) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const tag = tags.find((candidate) => /\brel=["']canonical["']/i.test(candidate));
  return decode(tag?.match(/\bhref=["']([^"']+)["']/i)?.[1] || "");
}

function hrefs(html) {
  return (html.match(/\bhref=["'][^"']+["']/gi) || [])
    .map((attribute) => decode(attribute.match(/["']([^"']+)["']/)?.[1] || ""))
    .filter(Boolean);
}

function jsonLd(html) {
  return (html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || [])
    .join("\n");
}

function add(rows, route, check, expected, actual, passed) {
  rows.push({
    route,
    check,
    expected,
    actual,
    status: passed ? "PASS" : "FAIL",
  });
}

if (!fs.existsSync(outRoot) || !fs.existsSync(sitemapFile)) {
  console.error("Location separation audit requires an existing static build in out/. Run npm run build first.");
  process.exit(1);
}

const sitemap = fs.readFileSync(sitemapFile, "utf8");
const rows = [];

for (const group of routeGroups) {
  for (const route of group.routes) {
    const file = routeCandidates(outRoot, route).find((candidate) => fs.existsSync(candidate));
    add(rows, route, "STATIC_ROUTE", "present", file ? path.relative(root, file) : "missing", Boolean(file));
    if (!file) continue;

    const html = fs.readFileSync(file, "utf8");
    const mainHtml = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
    const mainText = normalizeText(decode(stripHtml(mainHtml)));
    const locationKey = normalizeText(group.location);
    const wrongLocationKey = normalizeText(group.wrongLocation);
    const canonical = canonicalHref(html);
    const expectedCanonical = `https://www.floxant.de${route}`;
    const pageHrefs = hrefs(mainHtml);
    const wrongLinks = pageHrefs.filter(
      (href) => href === group.wrongRoutePrefix || href.startsWith(`${group.wrongRoutePrefix}/`),
    );
    const structuredData = decode(jsonLd(mainHtml));
    const hasBreadcrumb =
      /aria-label=["']Breadcrumb["']/i.test(mainHtml) ||
      structuredData.includes('"@type":"BreadcrumbList"') ||
      structuredData.includes('"@type": "BreadcrumbList"');

    add(rows, route, "CANONICAL", expectedCanonical, canonical, canonical === expectedCanonical);
    add(rows, route, "LOCATION_COPY", `${group.location} present`, mainText.includes(locationKey) ? "present" : "missing", mainText.includes(locationKey));
    add(rows, route, "WRONG_LOCATION_COPY", `${group.wrongLocation} absent`, mainText.includes(wrongLocationKey) ? "found" : "absent", !mainText.includes(wrongLocationKey));
    add(rows, route, "BREADCRUMB", `${group.location} breadcrumb`, hasBreadcrumb ? "present" : "missing", hasBreadcrumb && mainText.includes(locationKey));
    add(rows, route, "CTA_AND_RELATED_LINKS", `no ${group.wrongRoutePrefix} service links`, wrongLinks.join("|") || "none", wrongLinks.length === 0);
    add(rows, route, "FAQ_LOCATION", `${group.wrongLocation} absent from page FAQ`, mainText.includes(wrongLocationKey) ? "mixed" : "clean", !mainText.includes(wrongLocationKey));
    add(rows, route, "SITEMAP_LOCATION", "included once", (sitemap.match(new RegExp(`<loc>https://www\\.floxant\\.de${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>`, "g")) || []).length, sitemap.includes(`<loc>https://www.floxant.de${route}</loc>`));
    add(rows, route, "STRUCTURED_DATA_LOCATION", `${group.location} only`, structuredData.includes(group.wrongLocation) ? group.wrongLocation : group.location, structuredData.includes(group.location) && !structuredData.includes(group.wrongLocation));
  }
}

writeCsv(outputFile, ["route", "check", "expected", "actual", "status"], rows);
const failures = rows.filter((row) => row.status === "FAIL");
console.log(JSON.stringify({
  status: failures.length ? "FAIL" : "PASS",
  routes: routeGroups.reduce((sum, group) => sum + group.routes.length, 0),
  checks: rows.length,
  failures: failures.length,
  output: path.relative(root, outputFile),
}, null, 2));
if (failures.length) process.exit(1);
