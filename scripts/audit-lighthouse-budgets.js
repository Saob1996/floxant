#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { writeCsv } = require("./growth-audit-utils.cjs");

const root = process.cwd();
const artifacts = path.join(root, "artifacts");
const baselineFile = path.join(artifacts, "lighthouse-baseline-2026-07-30.json");
const afterFile = path.join(artifacts, "lighthouse-after-2026-07-30.json");
const outputFile = path.join(artifacts, "lighthouse-budgets.csv");

for (const file of [baselineFile, afterFile]) {
  if (!fs.existsSync(file)) {
    console.error(`Missing Lighthouse input: ${path.relative(root, file)}`);
    process.exit(1);
  }
}

const baseline = JSON.parse(fs.readFileSync(baselineFile, "utf8"));
const after = JSON.parse(fs.readFileSync(afterFile, "utf8"));

function averageTransfer(report, mode) {
  const results = report.results.filter((result) => result.mode === mode);
  return results.reduce((sum, result) => sum + result.transferSize.value, 0) / results.length;
}

const checks = [];
function add(mode, metric, baselineValue, actual, budget, passed, note) {
  checks.push({
    mode,
    metric,
    baseline: Math.round(baselineValue * 100) / 100,
    actual: Math.round(actual * 100) / 100,
    budget,
    status: passed ? "PASS" : "FAIL",
    note,
  });
}

for (const mode of ["mobile", "desktop"]) {
  const before = baseline.summary[mode];
  const current = after.summary[mode];
  add(
    mode,
    "average-performance-score",
    before.averageScores.performance,
    current.averageScores.performance,
    "not below baseline",
    current.averageScores.performance >= before.averageScores.performance,
    "Lab score must not regress across the ten-route average.",
  );
  add(
    mode,
    "p75-lcp-ms",
    before.p75Metrics.largestContentfulPaintMs,
    current.p75Metrics.largestContentfulPaintMs,
    mode === "mobile" ? "<=12000 and improved" : "<=2500 and improved",
    current.p75Metrics.largestContentfulPaintMs <
      before.p75Metrics.largestContentfulPaintMs &&
      current.p75Metrics.largestContentfulPaintMs <=
        (mode === "mobile" ? 12_000 : 2_500),
    "Project remediation budget on the uncompressed local static server.",
  );
  add(
    mode,
    "p75-tbt-ms",
    before.p75Metrics.totalBlockingTimeMs,
    current.p75Metrics.totalBlockingTimeMs,
    mode === "mobile" ? "<=600" : "<=150",
    current.p75Metrics.totalBlockingTimeMs <= (mode === "mobile" ? 600 : 150),
    "TBT is a lab proxy, not INP field data.",
  );
  add(
    mode,
    "p75-cls",
    before.p75Metrics.cumulativeLayoutShift,
    current.p75Metrics.cumulativeLayoutShift,
    "<=0.1",
    current.p75Metrics.cumulativeLayoutShift <= 0.1,
    "Layout stability budget.",
  );
  add(
    mode,
    "average-transfer-bytes",
    averageTransfer(baseline, mode),
    averageTransfer(after, mode),
    "<=2252800 and improved",
    averageTransfer(after, mode) < averageTransfer(baseline, mode) &&
      averageTransfer(after, mode) <= 2_252_800,
    "Includes uncompressed local HTML, CSS, JavaScript and images.",
  );
  for (const category of ["accessibility", "bestPractices", "seo"]) {
    const threshold = category === "accessibility" ? 95 : 100;
    add(
      mode,
      `average-${category}`,
      before.averageScores[category],
      current.averageScores[category],
      `>=${threshold}`,
      current.averageScores[category] >= threshold,
      "Quality category average across ten routes.",
    );
  }
}

writeCsv(
  outputFile,
  ["mode", "metric", "baseline", "actual", "budget", "status", "note"],
  checks,
);
const failures = checks.filter((check) => check.status === "FAIL");
console.log(
  JSON.stringify(
    {
      status: failures.length ? "FAIL" : "PASS",
      checks: checks.length,
      failures: failures.length,
      output: path.relative(root, outputFile),
    },
    null,
    2,
  ),
);
if (failures.length) process.exit(1);
