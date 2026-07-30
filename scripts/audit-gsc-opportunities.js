#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const {
  readCsv,
  staticHtmlPath,
  writeCsv,
} = require("./growth-audit-utils.cjs");

const root = process.cwd();
const outRoot = path.join(root, "out");
const artifacts = path.join(root, "artifacts");
const summaryFile = path.join(artifacts, "gsc-summary-2026-07-30.json");
const queryFile = path.join(artifacts, "gsc-query-opportunities-2026-07-30.csv");
const pageFile = path.join(artifacts, "gsc-page-opportunities-2026-07-30.csv");
const outputFile = path.join(artifacts, "gsc-priority-matrix.csv");

for (const file of [summaryFile, queryFile, pageFile]) {
  if (!fs.existsSync(file)) {
    console.error(`Required GSC aggregate is missing: ${path.relative(root, file)}`);
    process.exit(1);
  }
}

const summary = JSON.parse(fs.readFileSync(summaryFile, "utf8"));
const queries = readCsv(queryFile);
const pages = readCsv(pageFile);
const matrix = new Map();

function priorityFor(classes, impressions) {
  const names = new Set(String(classes).split("|"));
  if (names.has("PROTECT_WINNER")) return "P0";
  if (
    names.has("WEAK_SERVICE_PAGE") ||
    names.has("CTR_OPPORTUNITY") ||
    names.has("POSITION_4_TO_10") ||
    names.has("POSITION_11_TO_20") ||
    Number(impressions) >= 100
  ) {
    return "P1";
  }
  return "P2";
}

function strongerPriority(left, right) {
  return ["P0", "P1", "P2"].indexOf(left) <= ["P0", "P1", "P2"].indexOf(right)
    ? left
    : right;
}

function ensure(route) {
  if (!matrix.has(route)) {
    matrix.set(route, {
      priority: "P2",
      route,
      pageClicks: 0,
      pageImpressions: 0,
      pageCtr: "",
      pagePosition: "",
      queryImpressions: 0,
      classes: new Set(),
      relationStatus: new Set(),
      evidence: new Set(),
      decision: "STRENGTHEN",
      staticStatus: "MISSING",
    });
  }
  return matrix.get(route);
}

for (const page of pages) {
  const route = page.suggestedPrimaryRoute || (page.label.startsWith("/") ? page.label : "");
  if (!route) continue;
  const entry = ensure(route);
  entry.priority = strongerPriority(
    entry.priority,
    priorityFor(page.classes, page.impressions),
  );
  if (page.label === route) {
    entry.pageClicks = Number(page.clicks || 0);
    entry.pageImpressions = Number(page.impressions || 0);
    entry.pageCtr = page.ctr;
    entry.pagePosition = page.position;
  }
  String(page.classes).split("|").filter(Boolean).forEach((value) => entry.classes.add(value));
  entry.relationStatus.add(page.relationStatus || "not_applicable");
  entry.evidence.add(
    page.label === route
      ? "28-day page aggregate"
      : "separate page aggregate; target relation not proven",
  );
}

for (const query of queries) {
  const route = query.suggestedPrimaryRoute;
  if (!route) continue;
  const entry = ensure(route);
  entry.priority = strongerPriority(
    entry.priority,
    priorityFor(query.classes, query.impressions),
  );
  entry.queryImpressions += Number(query.impressions || 0);
  String(query.classes).split("|").filter(Boolean).forEach((value) => entry.classes.add(value));
  entry.relationStatus.add(query.relationStatus || "unclear");
  entry.evidence.add("query aggregate kept separate from page aggregate");
}

const rows = Array.from(matrix.values())
  .map((entry) => {
    entry.staticStatus = staticHtmlPath(outRoot, entry.route) ? "PRESENT" : "MISSING";
    if (entry.staticStatus === "MISSING") {
      entry.priority = "P2";
      entry.decision = "NO_NEW_PAGE_MANUAL_REVIEW";
      entry.evidence.add(
        "historical aggregate alone does not justify restoring or creating a route",
      );
    } else if (entry.priority === "P0") entry.decision = "PROTECT";
    else if (entry.classes.has("CANNIBALIZATION_RISK")) entry.decision = "MANUAL_REVIEW";
    return {
      priority: entry.priority,
      route: entry.route,
      pageClicks: entry.pageClicks,
      pageImpressions: entry.pageImpressions,
      pageCtr: entry.pageCtr,
      pagePosition: entry.pagePosition,
      queryImpressions: entry.queryImpressions,
      classes: Array.from(entry.classes).sort().join("|"),
      relationStatus: Array.from(entry.relationStatus).sort().join("|"),
      decision: entry.decision,
      staticStatus: entry.staticStatus,
      evidence: Array.from(entry.evidence).join("; "),
    };
  })
  .sort((left, right) => {
    const priority = ["P0", "P1", "P2"].indexOf(left.priority) - ["P0", "P1", "P2"].indexOf(right.priority);
    return priority || right.pageImpressions - left.pageImpressions || left.route.localeCompare(right.route);
  });

writeCsv(
  outputFile,
  [
    "priority",
    "route",
    "pageClicks",
    "pageImpressions",
    "pageCtr",
    "pagePosition",
    "queryImpressions",
    "classes",
    "relationStatus",
    "decision",
    "staticStatus",
    "evidence",
  ],
  rows,
);

const trackedPrivateFiles = execFileSync("git", ["ls-files", "data/private/search-console"], {
  cwd: root,
  encoding: "utf8",
}).trim();
const failures = [];
if (summary.methodology?.confirmedQueryToUrlMappings !== 0) {
  failures.push("Separate query/page aggregates were incorrectly treated as confirmed mappings.");
}
if (trackedPrivateFiles) failures.push("Raw private Search Console files are tracked by Git.");
if (!rows.length) failures.push("Priority matrix is empty.");
for (const row of rows.filter((item) => item.priority !== "P2" && item.staticStatus !== "PRESENT")) {
  failures.push(`Priority route has no static page: ${row.route}`);
}

console.log(
  JSON.stringify(
    {
      status: failures.length ? "FAIL" : "PASS",
      rows: rows.length,
      p0: rows.filter((row) => row.priority === "P0").length,
      p1: rows.filter((row) => row.priority === "P1").length,
      confirmedQueryToUrlMappings: summary.methodology?.confirmedQueryToUrlMappings,
      trackedPrivateFiles: trackedPrivateFiles ? trackedPrivateFiles.split(/\r?\n/).length : 0,
      failures,
      output: path.relative(root, outputFile),
    },
    null,
    2,
  ),
);
if (failures.length) process.exit(1);
