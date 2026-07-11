#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = process.cwd();
const PACKAGE_FILE = path.join(ROOT, "package.json");
const OUTPUTS = {
  markdown: path.join(ROOT, "OPTIMIZE_HEALTH_REPORT.md"),
  json: path.join(ROOT, "optimize-health-report.json"),
};

const RUNBOOK = [
  { name: "gsc:import", critical: true },
  { name: "optimize:score", critical: true },
  { name: "seo:conversion", critical: true },
  { name: "lead:health", critical: true },
  { name: "site:qa", critical: false },
  { name: "vercel:usage-safety", critical: false },
  { name: "snippet:health", critical: false },
  { name: "search:coverage", critical: false },
  { name: "content:quality", critical: false },
  { name: "copy:quality", critical: false },
  { name: "seo:dedupe-risk", critical: false },
  { name: "seo:sitemap", critical: true },
  { name: "seo:health", critical: true },
  { name: "lint", critical: true },
  { name: "typecheck", critical: true },
  { name: "build", critical: true },
];

function loadScripts() {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_FILE, "utf8"));
  return pkg.scripts || {};
}

function mdEscape(value) {
  return String(value ?? "-").replace(/\r?\n/g, " ").replace(/\|/g, "\\|").trim() || "-";
}

function mdTable(headers, rows) {
  return [
    `| ${headers.map(mdEscape).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...(rows.length ? rows.map((row) => `| ${row.map(mdEscape).join(" | ")} |`) : [`| ${headers.map(() => "-").join(" | ")} |`]),
  ].join("\n");
}

function tail(value, limit = 2600) {
  const text = String(value || "").trim();
  if (text.length <= limit) return text;
  return text.slice(text.length - limit);
}

function runScript(item, scripts) {
  if (!scripts[item.name]) {
    return {
      script: item.name,
      status: item.critical ? "FAIL" : "WARN",
      critical: item.critical,
      exitCode: null,
      durationMs: 0,
      summary: "Script missing in package.json.",
      stdoutTail: "",
      stderrTail: "",
    };
  }

  const started = Date.now();
  const command = process.platform === "win32" ? process.env.ComSpec || "cmd.exe" : "npm";
  const args = process.platform === "win32" ? ["/d", "/s", "/c", `npm run ${item.name}`] : ["run", item.name];
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
    env: { ...process.env, CI: process.env.CI || "1" },
  });
  const durationMs = Date.now() - started;
  const exitCode = typeof result.status === "number" ? result.status : result.error ? 1 : 0;
  const status = exitCode === 0 ? "PASS" : item.critical ? "FAIL" : "WARN";
  return {
    script: item.name,
    status,
    critical: item.critical,
    exitCode,
    durationMs,
    summary: exitCode === 0 ? "Completed." : result.error ? result.error.message : `Exited with ${exitCode}.`,
    stdoutTail: tail(result.stdout),
    stderrTail: tail(result.stderr),
  };
}

function main() {
  const scripts = loadScripts();
  const results = RUNBOOK.map((item) => runScript(item, scripts));
  const counts = results.reduce(
    (acc, item) => {
      acc[item.status.toLowerCase()] += 1;
      return acc;
    },
    { pass: 0, warn: 0, fail: 0 },
  );
  const criticalFailures = results.filter((item) => item.critical && item.status === "FAIL");
  const status = criticalFailures.length ? "FAIL" : counts.warn ? "WARN" : "PASS";
  const payload = {
    status,
    generatedAt: new Date().toISOString(),
    summary: {
      scripts: results.length,
      pass: counts.pass,
      warn: counts.warn,
      fail: counts.fail,
      criticalFailures: criticalFailures.length,
    },
    results,
  };

  const markdown = `# Optimize Health Report

Status: ${status}
Generiert: ${payload.generatedAt}

## Zusammenfassung

- Scripts: ${payload.summary.scripts}
- PASS: ${payload.summary.pass}
- WARN: ${payload.summary.warn}
- FAIL: ${payload.summary.fail}
- Kritische FAILs: ${payload.summary.criticalFailures}

## Ergebnisse

${mdTable(
    ["Script", "Status", "kritisch", "Exit", "Dauer ms", "Kurzinfo"],
    results.map((item) => [item.script, item.status, item.critical ? "ja" : "nein", item.exitCode ?? "-", item.durationMs, item.summary]),
  )}

## Kritische Fehler

${criticalFailures.map((item) => `- ${item.script}: ${item.summary}`).join("\n") || "- keine"}

## Hinweise

- Fehlende optionale Scripts sind WARN.
- Kritische Scripts sind: gsc:import, optimize:score, seo:conversion, lead:health, seo:sitemap, seo:health, lint, typecheck, build.
- Dieser Check erzeugt keine Trackingdaten und fuehrt keine Lead-Abfrage aus.
- Details stehen in den jeweiligen Einzelreports.
`;

  fs.writeFileSync(OUTPUTS.json, JSON.stringify(payload, null, 2));
  fs.writeFileSync(OUTPUTS.markdown, markdown);

  console.log(`optimize:health status: ${status}`);
  console.log(`PASS/WARN/FAIL: ${counts.pass}/${counts.warn}/${counts.fail}`);
  console.log(`Reports written: ${path.relative(ROOT, OUTPUTS.markdown)}, ${path.relative(ROOT, OUTPUTS.json)}`);
  if (status === "FAIL") process.exitCode = 1;
}

main();
