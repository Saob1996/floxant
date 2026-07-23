const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const packagePath = path.join(root, "package.json");
const mdPath = path.join(root, "RELEASE_HEALTH_REPORT.md");
const jsonPath = path.join(root, "release-health-report.json");

const runList = [
  { script: "navigation:health", report: "navigation-health-report.json", critical: true },
  { script: "trust:health", report: "trust-health-report.json", critical: false },
  { script: "packages:health", report: "package-health-report.json", critical: true },
  { script: "service-fit:health", report: "service-fit-health-report.json", critical: true },
  { script: "services:coverage", report: "services-coverage-report.json", critical: false },
  { script: "ai:answer-health", report: "ai-answer-health-report.json", critical: false },
  { script: "english:intent-health", report: "english-intent-health-report.json", critical: true },
  { script: "search:coverage", report: "search-coverage-report.json", critical: false },
  { script: "content:prune-health", report: "content-prune-health-report.json", critical: false },
  { script: "editorial:quality", report: "editorial-quality-report.json", critical: false },
  { script: "content:quality", report: "editorial-quality-report.json", critical: false },
  { script: "copy:quality", report: "copy-quality-report.json", critical: false },
  { script: "snippet:health", report: "snippet-health-report.json", critical: false },
  { script: "seo:dedupe-risk", report: "seo-dedupe-risk-report.json", critical: true },
  { script: "seo:sitemap", report: null, critical: true },
  { script: "seo:health", report: "seo-health-report.json", critical: false },
  { script: "seo:conversion", report: "seo-conversion-report.json", critical: true },
  { script: "lead:health", report: "lead-health-report.json", critical: true },
  { script: "site:qa", report: "site-qa-report.json", critical: false },
  { script: "risk:closure", report: "risk-closure-report.json", critical: false },
  { script: "lint", report: null, critical: true },
  { script: "typecheck", report: null, critical: true },
  { script: "build", report: null, critical: true },
  { script: "lighthouse:local", report: "lighthouse-local-report.json", critical: false, optional: true },
];

function readJson(file) {
  if (!file) return null;
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) return null;
  try {
    return JSON.parse(fs.readFileSync(absolute, "utf8"));
  } catch (error) {
    return { status: "WARN", parseError: error.message };
  }
}

function numeric(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function statusFromReport(report) {
  if (!report) return null;
  const direct = typeof report.status === "string" ? report.status.toUpperCase() : null;
  if (direct) return direct;

  if (Array.isArray(report.checks)) {
    const statuses = report.checks.map((item) => String(item.status || "").toUpperCase());
    if (statuses.includes("FAIL")) return "FAIL";
    if (statuses.includes("WARN")) return "WARN";
    if (statuses.includes("PASS")) return "PASS";
  }

  const summary = report.summary || {};
  const failures =
    numeric(summary.failCount) +
    numeric(summary.failures) +
    numeric(summary.fail) +
    numeric(summary.FAIL);
  const warnings =
    numeric(summary.warnCount) +
    numeric(summary.warnings) +
    numeric(summary.warn) +
    numeric(summary.WARN);
  const passes = numeric(summary.pass) + numeric(summary.PASS);
  if (failures > 0) return "FAIL";
  if (warnings > 0) return "WARN";
  if (passes > 0 || Object.keys(summary).length) return "PASS";
  return null;
}

function compactSummary(report) {
  if (!report) return "";
  if (report.summary && typeof report.summary === "object") {
    return JSON.stringify(report.summary);
  }
  if (Array.isArray(report.checks)) {
    const counts = report.checks.reduce((acc, item) => {
      const status = String(item.status || "UNKNOWN").toUpperCase();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    return JSON.stringify(counts);
  }
  return report.parseError ? `parseError=${report.parseError}` : "";
}

function runScript(script) {
  const command = process.platform === "win32" ? process.env.ComSpec || "cmd.exe" : "npm";
  const args = process.platform === "win32" ? ["/d", "/s", "/c", `npm run ${script}`] : ["run", script];
  const start = Date.now();
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 30,
    shell: false,
    windowsHide: true,
  });
  return {
    exitCode: typeof result.status === "number" ? result.status : 1,
    durationMs: Date.now() - start,
    stdoutTail: String(result.stdout || "").split(/\r?\n/).slice(-25).join("\n"),
    stderrTail: String(result.stderr || "").split(/\r?\n/).slice(-25).join("\n"),
    error: result.error ? result.error.message : null,
  };
}

function main() {
  const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const scripts = pkg.scripts || {};
  const results = [];

  for (const item of runList) {
    if (!scripts[item.script]) {
      results.push({
        script: item.script,
        status: item.critical ? "FAIL" : "WARN",
        critical: item.critical,
        missing: true,
        exitCode: null,
        durationMs: 0,
        report: item.report,
        reportStatus: null,
        reportSummary: "",
      });
      continue;
    }

    const run = runScript(item.script);
    const report = readJson(item.report);
    const reportStatus = statusFromReport(report);
    const status =
      run.exitCode !== 0
        ? item.critical
          ? "FAIL"
          : "WARN"
        : reportStatus === "FAIL"
          ? item.critical
            ? "FAIL"
            : "WARN"
          : reportStatus === "WARN"
            ? "WARN"
            : "PASS";

    results.push({
      script: item.script,
      status,
      critical: item.critical,
      optional: !!item.optional,
      missing: false,
      exitCode: run.exitCode,
      durationMs: run.durationMs,
      report: item.report,
      reportStatus,
      reportSummary: compactSummary(report),
      stdoutTail: run.stdoutTail,
      stderrTail: run.stderrTail,
      error: run.error,
    });
  }

  const status = results.some((item) => item.status === "FAIL")
    ? "FAIL"
    : results.some((item) => item.status === "WARN")
      ? "WARN"
      : "PASS";
  const output = {
    status,
    generatedAt: new Date().toISOString(),
    summary: {
      scripts: results.length,
      pass: results.filter((item) => item.status === "PASS").length,
      warn: results.filter((item) => item.status === "WARN").length,
      fail: results.filter((item) => item.status === "FAIL").length,
      missing: results.filter((item) => item.missing).length,
      criticalFailures: results.filter((item) => item.critical && item.status === "FAIL").map((item) => item.script),
    },
    results,
  };

  const rows = results.map((item) => {
    const seconds = Math.round((item.durationMs / 1000) * 10) / 10;
    const summary = (item.reportSummary || item.error || "").replace(/\|/g, "/");
    return `| ${item.status} | ${item.script} | ${item.critical ? "yes" : "no"} | ${item.exitCode ?? "-"} | ${seconds}s | ${item.report || "-"} | ${summary || "-"} |`;
  });

  const md = [
    "# Release Health Report",
    "",
    `Generated: ${output.generatedAt}`,
    "",
    `Status: ${status}`,
    "",
    "## Summary",
    "",
    `- Scripts: ${output.summary.scripts}`,
    `- PASS: ${output.summary.pass}`,
    `- WARN: ${output.summary.warn}`,
    `- FAIL: ${output.summary.fail}`,
    `- Missing scripts: ${output.summary.missing}`,
    `- Critical failures: ${output.summary.criticalFailures.length ? output.summary.criticalFailures.join(", ") : "none"}`,
    "",
    "## Checks",
    "",
    "| Status | Script | Critical | Exit | Duration | Report | Summary |",
    "| --- | --- | --- | ---: | ---: | --- | --- |",
    ...rows,
    "",
    "## Policy",
    "",
    "- WARN keeps the release in YELLOW, not RED.",
    "- Critical command failures keep the release in RED.",
    "- Missing optional scripts are WARN.",
    "- This sprint does not stage, commit, push, migrate, or add new dependencies.",
    "",
  ].join("\n");

  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));
  fs.writeFileSync(mdPath, md);

  console.log(`Release health status: ${status}`);
  console.log(`Reports written: ${path.relative(root, mdPath)}, ${path.relative(root, jsonPath)}`);
  for (const item of results) {
    console.log(`${item.status} ${item.script} exit=${item.exitCode ?? "-"} report=${item.reportStatus || "-"}`);
  }
  process.exit(status === "FAIL" ? 1 : 0);
}

main();
