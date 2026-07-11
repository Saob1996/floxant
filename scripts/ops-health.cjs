const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const generatedAt = new Date().toISOString();

const runList = [
  { script: "postdeploy:health", report: "postdeploy-health-report.json", critical: true },
  { script: "lead:delivery-check", report: "lead-delivery-check-report.json", critical: true },
  { script: "routes:health", report: "routes-health-report.json", critical: true },
  { script: "vercel:usage-safety", report: "vercel-usage-safety-report.json", critical: true },
  { script: "release:health", report: "release-health-report.json", critical: false },
  { script: "navigation:health", report: "navigation-health-report.json", critical: false },
  { script: "trust:health", report: "trust-health-report.json", critical: false },
  { script: "services:coverage", report: "services-coverage-report.json", critical: false },
  { script: "ai:answer-health", report: "ai-answer-health-report.json", critical: false },
  { script: "english:intent-health", report: "english-intent-health-report.json", critical: false },
  { script: "search:coverage", report: "search-coverage-report.json", critical: false },
  { script: "content:prune-health", report: "content-prune-health-report.json", critical: false },
  { script: "editorial:quality", report: "editorial-quality-report.json", critical: false },
  { script: "copy:quality", report: "copy-quality-report.json", critical: false },
  { script: "snippet:health", report: "snippet-health-report.json", critical: false },
  { script: "seo:dedupe-risk", report: "seo-dedupe-risk-report.json", critical: false },
  { script: "seo:sitemap", report: null, critical: true },
  { script: "seo:health", report: "seo-health-report.json", critical: true },
  { script: "seo:conversion", report: "seo-conversion-report.json", critical: true },
  { script: "lead:health", report: "lead-health-report.json", critical: true },
  { script: "site:qa", report: "site-qa-report.json", critical: false },
  { script: "risk:closure", report: "risk-closure-report.json", critical: false },
  { script: "lint", report: null, critical: true },
  { script: "typecheck", report: null, critical: true },
  { script: "build", report: null, critical: true },
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

function reportStatus(report) {
  if (!report) return null;
  if (typeof report.status === "string") return report.status.toUpperCase();
  const summary = report.summary || {};
  const fail = numeric(summary.fail) + numeric(summary.FAIL) + numeric(summary.failures) + numeric(summary.failCount);
  const warn = numeric(summary.warn) + numeric(summary.WARN) + numeric(summary.warnings) + numeric(summary.warnCount);
  const pass = numeric(summary.pass) + numeric(summary.PASS);
  if (fail > 0) return "FAIL";
  if (warn > 0) return "WARN";
  if (pass > 0 || Object.keys(summary).length) return "PASS";
  return null;
}

function compactSummary(report) {
  if (!report) return "";
  if (report.summary && typeof report.summary === "object") return JSON.stringify(report.summary);
  if (report.parseError) return `parseError=${report.parseError}`;
  return "";
}

function runScript(script) {
  const command = process.platform === "win32" ? process.env.ComSpec || "cmd.exe" : "npm";
  const args = process.platform === "win32" ? ["/d", "/s", "/c", `npm run ${script}`] : ["run", script];
  const start = Date.now();
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 40,
    shell: false,
    windowsHide: true,
    env: process.env,
  });
  return {
    exitCode: typeof result.status === "number" ? result.status : 1,
    durationMs: Date.now() - start,
    stdoutTail: String(result.stdout || "").split(/\r?\n/).slice(-20).join("\n"),
    stderrTail: String(result.stderr || "").split(/\r?\n/).slice(-20).join("\n"),
    error: result.error ? result.error.message : null,
  };
}

function main() {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
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
        stdoutTail: "",
        stderrTail: "",
        error: "script missing",
      });
      continue;
    }

    const run = runScript(item.script);
    const report = readJson(item.report);
    const rStatus = reportStatus(report);
    const status =
      run.exitCode !== 0
        ? item.critical
          ? "FAIL"
          : "WARN"
        : rStatus === "FAIL"
          ? item.critical
            ? "FAIL"
            : "WARN"
          : rStatus === "WARN"
            ? "WARN"
            : "PASS";

    results.push({
      script: item.script,
      status,
      critical: item.critical,
      missing: false,
      exitCode: run.exitCode,
      durationMs: run.durationMs,
      report: item.report,
      reportStatus: rStatus,
      reportSummary: compactSummary(report),
      stdoutTail: run.stdoutTail,
      stderrTail: run.stderrTail,
      error: run.error,
    });
  }

  const summary = {
    generatedAt,
    scripts: results.length,
    pass: results.filter((item) => item.status === "PASS").length,
    warn: results.filter((item) => item.status === "WARN").length,
    fail: results.filter((item) => item.status === "FAIL").length,
    missing: results.filter((item) => item.missing).length,
    criticalFailures: results.filter((item) => item.critical && item.status === "FAIL").map((item) => item.script),
  };
  const status = summary.fail ? "FAIL" : summary.warn ? "WARN" : "PASS";
  const output = { status, summary, results };

  const rows = results.map((item) => {
    const seconds = Math.round((item.durationMs / 1000) * 10) / 10;
    const summaryText = (item.reportSummary || item.error || "").replace(/\|/g, "/");
    return `| ${item.status} | ${item.script} | ${item.critical ? "yes" : "no"} | ${item.exitCode ?? "-"} | ${seconds}s | ${item.report || "-"} | ${summaryText || "-"} |`;
  });

  const md = [
    "# Ops Health Report",
    "",
    `Generated: ${generatedAt}`,
    `Status: ${status}`,
    "",
    "## Summary",
    "",
    `- Scripts: ${summary.scripts}`,
    `- PASS: ${summary.pass}`,
    `- WARN: ${summary.warn}`,
    `- FAIL: ${summary.fail}`,
    `- Missing scripts: ${summary.missing}`,
    `- Critical failures: ${summary.criticalFailures.length ? summary.criticalFailures.join(", ") : "none"}`,
    "",
    "## Checks",
    "",
    "| Status | Script | Critical | Exit | Duration | Report | Summary |",
    "| --- | --- | --- | ---: | ---: | --- | --- |",
    ...rows,
    "",
    "## Policy",
    "",
    "- FAIL on critical command failures.",
    "- WARN keeps the release in YELLOW.",
    "- This script does not stage, commit, push, migrate, or install dependencies.",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(root, "ops-health-report.json"), JSON.stringify(output, null, 2));
  fs.writeFileSync(path.join(root, "OPS_HEALTH_REPORT.md"), md);

  console.log(`Ops health status: ${status}`);
  console.log("Reports written: OPS_HEALTH_REPORT.md, ops-health-report.json");
  for (const item of results) {
    console.log(`${item.status} ${item.script} exit=${item.exitCode ?? "-"} report=${item.reportStatus || "-"}`);
  }
  process.exit(status === "FAIL" ? 1 : 0);
}

main();
