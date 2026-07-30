#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { createHash } = require("node:crypto");
const { ensureDirectory, htmlFileToRoute, normalizeText, stripHtml, walk } = require("./editorial-audit-utils.js");

const root = process.cwd();
const outRoot = path.join(root, "out");
const reportFile = path.join(root, "artifacts", "content-uniqueness.csv");
const priorityMetaSource = fs.readFileSync(
  path.join(root, "lib", "content", "seo-meta-registry.ts"),
  "utf8",
);
const priorityRoutes = new Set(
  Array.from(priorityMetaSource.matchAll(/^\s*"([^"]+)": defineMeta\(/gm), (match) => match[1]),
);

if (!fs.existsSync(outRoot)) {
  console.error("Content uniqueness audit requires an existing out/ build.");
  process.exit(1);
}

function capture(html, pattern) {
  const match = html.match(pattern);
  return match ? stripHtml(match[1]) : "";
}

function captureIntro(html) {
  const paragraphs = [];
  const pattern = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  let match;

  while (paragraphs.length < 2 && (match = pattern.exec(html))) {
    const paragraph = stripHtml(match[1]);
    if (paragraph.length >= 80) paragraphs.push(paragraph);
  }

  return normalizeText(paragraphs.join(" ")).slice(0, 420);
}

function contentKey(value) {
  return `${value.length}:${createHash("sha256").update(value).digest("hex")}`;
}

function addGroupedValue(groups, value, routeId) {
  const key = contentKey(value);
  const existing = groups.get(key);

  if (!existing) {
    groups.set(key, { routeIds: [routeId], lastRouteId: routeId, sample: value.slice(0, 180) });
    return;
  }

  // All blocks for one page are processed consecutively, so this removes
  // duplicate occurrences on that page without allocating a per-page Set.
  if (existing.lastRouteId !== routeId) {
    existing.routeIds.push(routeId);
    existing.lastRouteId = routeId;
  }
}

const fieldAudits = [
  { field: "title", issue: "DUPLICATE_TITLE", minimumLength: 8 },
  { field: "h1", issue: "DUPLICATE_H1", minimumLength: 8 },
  { field: "description", issue: "DUPLICATE_META_DESCRIPTION", minimumLength: 80 },
  { field: "intro", issue: "DUPLICATE_INTRO", minimumLength: 80 },
  { field: "mainFingerprint", issue: "NEAR_TEMPLATE_MATCH", minimumLength: 80 },
];
const fieldGroups = new Map(fieldAudits.map(({ field }) => [field, new Map()]));
const blockGroups = new Map();
const routes = [];
const htmlFiles = walk(outRoot, (entry) => entry.endsWith(".html"));
let peakHeapUsed = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const main = capture(html, /<main\b[^>]*>([\s\S]*?)<\/main>/i) || stripHtml(html);
  const routeId = routes.push(htmlFileToRoute(outRoot, file)) - 1;
  const fields = {
    title: capture(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    h1: capture(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i),
    description: (html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) || html.match(/<meta\b[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i) || [])[1] || "",
    intro: captureIntro(html),
    mainFingerprint: normalizeText(main).split(" ").slice(0, 120).join(" "),
  };

  for (const { field, minimumLength } of fieldAudits) {
    const value = normalizeText(fields[field]);
    if (!value || value.length < minimumLength) continue;
    addGroupedValue(fieldGroups.get(field), value, routeId);
  }

  const blockPattern = /<(?:p|div)\b[^>]*>([\s\S]*?)<\/(?:p|div)>/gi;
  let blockMatch;
  while ((blockMatch = blockPattern.exec(html))) {
    const block = stripHtml(blockMatch[1]);
    if (block.length < 90 || block.length > 700) continue;
    const normalized = normalizeText(block);
    if (normalized.length < 100) continue;
    addGroupedValue(blockGroups, normalized, routeId);
  }

  peakHeapUsed = Math.max(peakHeapUsed, process.memoryUsage().heapUsed);
}

function csv(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

ensureDirectory(reportFile);
const temporaryReportFile = `${reportFile}.tmp`;
const report = fs.openSync(temporaryReportFile, "w");
const headers = ["route", "issue", "matches", "matchCount", "sample", "action"];
fs.writeSync(report, `${headers.map(csv).join(",")}\n`);

let findings = 0;
let duplicateTitles = 0;
let duplicateH1 = 0;
let repeatedBlocks = 0;
let hardViolations = 0;

function writeFinding(routeId, issue, routeIds, sample, action) {
  const matchingRoutes = routeIds
    .filter((candidateId) => candidateId !== routeId)
    .map((candidateId) => routes[candidateId]);
  // Keep the CSV reviewable and Git-friendly while preserving the full count.
  const matches = matchingRoutes.slice(0, 8).join("|");
  const affectsPriorityRoute = routeIds.some((candidateId) =>
    priorityRoutes.has(routes[candidateId]),
  );
  const isPriorityMetaDuplicate =
    affectsPriorityRoute &&
    ["DUPLICATE_TITLE", "DUPLICATE_H1", "DUPLICATE_META_DESCRIPTION"].includes(issue);
  fs.writeSync(
    report,
    `${[
      routes[routeId],
      issue,
      matches,
      matchingRoutes.length,
      sample,
      isPriorityMetaDuplicate ? "FIX_PRIORITY_DUPLICATE" : action,
    ].map(csv).join(",")}\n`,
  );
  findings += 1;
  if (isPriorityMetaDuplicate) hardViolations += 1;
  if (issue === "DUPLICATE_TITLE") duplicateTitles += 1;
  if (issue === "DUPLICATE_H1") duplicateH1 += 1;
  if (issue === "REPEATED_CONTENT_BLOCK") repeatedBlocks += 1;
}

try {
  for (const { field, issue } of fieldAudits) {
    for (const group of fieldGroups.get(field).values()) {
      if (group.routeIds.length < 2) continue;
      writeFinding(group.routeIds[0], issue, group.routeIds, group.sample, "MANUAL_REVIEW");
    }
  }

  for (const group of blockGroups.values()) {
    if (group.routeIds.length < 3) continue;
    writeFinding(
      group.routeIds[0],
      "REPEATED_CONTENT_BLOCK",
      group.routeIds,
      group.sample,
      "STRENGTHEN_OR_MERGE_REVIEW",
    );
  }
} finally {
  fs.closeSync(report);
}

if (fs.existsSync(reportFile)) fs.rmSync(reportFile);
fs.renameSync(temporaryReportFile, reportFile);

console.log(JSON.stringify({
  pages: routes.length,
  findings,
  duplicateTitles,
  duplicateH1,
  repeatedBlocks,
  hardViolations,
  peakHeapUsedMb: Math.round(peakHeapUsed / 1024 / 1024),
  report: path.relative(root, reportFile),
}, null, 2));
if (hardViolations) process.exit(1);
