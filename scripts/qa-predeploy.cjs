#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const {
  ROOT,
  addResult,
  findOpenPort,
  nowIso,
  npmCommand,
  reportBaseUrl,
  scriptExists,
  startNextServer,
  statusFromResults,
  stopProcess,
  waitForServer,
  writeReport,
} = require("./qa-shared.cjs");

const mode = process.argv[2] === "predeploy" ? "predeploy" : "critical";

const criticalScripts = [
  "qa:routes",
  "qa:cta",
  "qa:contact",
  "qa:seo",
  "qa:content-safety",
  "qa:vercel-safety",
];

const requiredBuildScripts = ["lint", "typecheck", "build"];

const predeployExtraScripts = [
  "service-router:health",
  "contact-flow:health",
  "request-brief:health",
  "lead-response:health",
  "content-authority:health",
  "faq:health",
  "architecture:health",
  "seo:conversion",
  "lead:health",
  "site:qa",
  "risk:closure",
];

const childReportFiles = {
  "qa:routes": "qa-routes-report.json",
  "qa:cta": "qa-cta-report.json",
  "qa:contact": "qa-contact-report.json",
  "qa:seo": "qa-seo-report.json",
  "qa:content-safety": "qa-content-safety-report.json",
  "qa:vercel-safety": "qa-vercel-safety-report.json",
  "qa:lead-submit": "qa-lead-submit-report.json",
  "seo:conversion": "seo-conversion-report.json",
  "site:qa": "site-qa-report.json",
  "risk:closure": "risk-closure-report.json",
  "service-router:health": "service-router-health-report.json",
  "contact-flow:health": "contact-flow-health-report.json",
  "request-brief:health": "request-brief-health-report.json",
  "lead-response:health": "lead-response-health-report.json",
  "content-authority:health": "content-authority-health-report.json",
  "faq:health": "faq-health-report.json",
  "architecture:health": "architecture-health-report.json",
  "lead:health": "lead-health-report.json",
};

function addCommandResult(results, script, result, required = true) {
  const status = result.exitCode === 0 ? "PASS" : required ? "FAIL" : "WARN";
  addResult(
    results,
    status,
    "command",
    script,
    `Exit ${result.exitCode}; duration ${result.durationMs}ms.`,
    status === "PASS" ? "No action." : required ? "Fix required command before deploy." : "Inspect child report before production.",
    {
      priority: required ? "P0" : "P1",
      command: result.name,
      stdoutTail: result.stdoutTail,
      stderrTail: result.stderrTail,
    },
  );
}

function readJsonReport(file) {
  const absolute = path.join(ROOT, file);
  if (!fs.existsSync(absolute)) return null;
  try {
    return JSON.parse(fs.readFileSync(absolute, "utf8"));
  } catch {
    return null;
  }
}

function normalizedReportStatus(report) {
  if (!report || typeof report !== "object") return "";
  if (typeof report.status === "string") return report.status.toUpperCase();
  if (typeof report.summary?.status === "string") return report.summary.status.toUpperCase();
  if (typeof report.summary?.FAIL === "number" && report.summary.FAIL > 0) return "FAIL";
  if (typeof report.summary?.WARN === "number" && report.summary.WARN > 0) return "WARN";
  if (typeof report.summary?.PASS === "number") return "PASS";
  return "";
}

function reportStatusLine(file) {
  const report = readJsonReport(file);
  if (!report) return "MISSING";
  return `${normalizedReportStatus(report) || "UNKNOWN"} (${report.summary?.checks ?? "?"} checks)`;
}

function writeDashboard({ generatedAt, baseUrl, status, results, serverMode }) {
  const red = results.filter((item) => item.status === "FAIL");
  const yellow = results.filter((item) => item.status === "WARN");
  const dashboard = [
    "# QA Predeploy Dashboard",
    "",
    `Letzter Lauf: ${generatedAt}`,
    `Modus: ${mode}`,
    `Base URL: ${baseUrl}`,
    `Server-Modus: ${serverMode}`,
    `Gesamtstatus: ${status}`,
    "",
    "## Statusuebersicht",
    "",
    `- P0-Routenstatus: ${reportStatusLine("qa-routes-report.json")}`,
    `- CTA-Status: ${reportStatusLine("qa-cta-report.json")}`,
    `- Kontaktformularstatus: ${reportStatusLine("qa-contact-report.json")}`,
    `- Lead-Submit-Teststatus: ${reportStatusLine("qa-lead-submit-report.json")}`,
    `- SEO-Status: ${reportStatusLine("qa-seo-report.json")}`,
    `- Content-Safety-Status: ${reportStatusLine("qa-content-safety-report.json")}`,
    `- Vercel-Safety-Status: ${reportStatusLine("qa-vercel-safety-report.json")}`,
    `- Build/Lint/Typecheck: ${results.filter((item) => ["build", "lint", "typecheck"].includes(item.path)).map((item) => `${item.path}=${item.status}`).join(", ") || "nicht im Lauf enthalten"}`,
    "",
    "## RED-Blocker",
    "",
    red.length ? red.map((item) => `- ${item.scope} ${item.path}: ${item.detail}`).join("\n") : "- Keine RED-Blocker im Orchestrator.",
    "",
    "## YELLOW-Risiken",
    "",
    yellow.length ? yellow.slice(0, 60).map((item) => `- ${item.scope} ${item.path}: ${item.detail}`).join("\n") : "- Keine YELLOW-Risiken im Orchestrator.",
    "",
    "## Deploy-Regeln",
    "",
    `- Preview erlaubt: ${status === "FAIL" ? "nein" : "ja, wenn YELLOW bewusst akzeptiert wird"}`,
    "- Production erlaubt: erst nach manuellem Browsercheck, GBP/NAP-Sichtpruefung und bewusster Freigabe.",
    "- RED blockiert Deploy.",
    "- YELLOW braucht bewusste Entscheidung.",
    "- GREEN erlaubt Preview.",
    "",
    "## Manuelle Checks",
    "",
    "- Startseite, Kontakt, Angebotspruefung, Duesseldorf, Regensburg und P0-Service-Seiten im Browser pruefen.",
    "- Kontaktparameter im Formular visuell pruefen.",
    "- Keine echten Leads absenden.",
    "- Production erst nach Preview-Browsercheck.",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(ROOT, "docs", "QA_PREDEPLOY_DASHBOARD.md"), dashboard);
}

async function ensureBaseUrl(results) {
  const provided = Boolean(process.env.BASE_URL);
  const configured = reportBaseUrl();
  if (provided) {
    addResult(results, "PASS", "server", configured.baseUrl, "BASE_URL provided by caller.", "No local server started.", { priority: "P1" });
    return { baseUrl: configured.baseUrl, server: null, serverMode: "external BASE_URL" };
  }

  if (!scriptExists("build")) {
    addResult(results, "FAIL", "server", "build", "Cannot start the static export server because build script is missing.", "Restore build script.", { priority: "P0" });
    return { baseUrl: configured.baseUrl, server: null, serverMode: "missing build script" };
  }

  const buildResult = npmCommand("build", {}, { tailLines: 80 });
  addCommandResult(results, "build", buildResult, true);
  if (buildResult.exitCode !== 0) {
    return { baseUrl: configured.baseUrl, server: null, serverMode: "build failed; no local server" };
  }

  const port = await findOpenPort(Number(process.env.QA_SERVER_PORT || 3220));
  const server = startNextServer(port);
  const baseUrl = `http://127.0.0.1:${port}`;
  const ready = await waitForServer(baseUrl, Number(process.env.QA_SERVER_START_TIMEOUT_MS || 90000));
  if (!ready.ok) {
    const output = server.getOutput ? server.getOutput() : { stdout: "", stderr: "" };
    addResult(results, "FAIL", "server", baseUrl, `Local static export did not become ready: ${ready.error}`, "Inspect build/server output.", { priority: "P0", stdoutTail: output.stdout.slice(-4000), stderrTail: output.stderr.slice(-4000) });
  } else {
    addResult(results, "PASS", "server", baseUrl, "Local static export ready for HTTP QA.", "No action.", { priority: "P0" });
  }

  return { baseUrl, server, serverMode: "auto static export after build" };
}

function runScriptList(results, scripts, env, required) {
  for (const script of scripts) {
    if (!scriptExists(script)) {
      addResult(results, required ? "FAIL" : "WARN", "command", script, "npm script missing.", required ? "Restore required script." : "Add script or keep as documented manual gap.", { priority: required ? "P0" : "P2" });
      continue;
    }
    const result = npmCommand(script, env, { optional: !required, tailLines: 70 });
    addCommandResult(results, script, result, required);
    const childReport = childReportFiles[script] ? readJsonReport(childReportFiles[script]) : null;
    const childStatus = normalizedReportStatus(childReport);
    if (childStatus === "WARN" || childStatus === "FAIL") {
      addResult(
        results,
        childStatus,
        "child-report",
        script,
        `${childReportFiles[script]} reported ${childStatus}.`,
        childStatus === "FAIL" ? "Fix child report RED blocker." : "Review child report YELLOW risks before deploy.",
        {
          priority: childStatus === "FAIL" && required ? "P0" : "P1",
          reportFile: childReportFiles[script],
          childSummary: childReport?.summary || {},
        },
      );
    }
  }
}

async function main() {
  const generatedAt = nowIso();
  const results = [];
  let server = null;
  let baseUrl = process.env.BASE_URL || "";
  let serverMode = "unknown";

  try {
    const resolved = await ensureBaseUrl(results);
    baseUrl = resolved.baseUrl;
    server = resolved.server;
    serverMode = resolved.serverMode;

    const env = {
      BASE_URL: baseUrl,
      SEO_HEALTH_BASE_URL: baseUrl,
      SEO_CONVERSION_BASE_URL: baseUrl,
    };
    runScriptList(results, criticalScripts, env, true);

    for (const script of requiredBuildScripts) {
      if (!process.env.BASE_URL && script === "build") {
        addResult(results, "PASS", "command", "build", "Build already ran before auto-starting local server.", "No action.", { priority: "P0" });
        continue;
      }
      if (!scriptExists(script)) {
        addResult(results, "FAIL", "command", script, "npm script missing.", "Restore required script.", { priority: "P0" });
        continue;
      }
      const result = npmCommand(script, {}, { tailLines: 80 });
      addCommandResult(results, script, result, true);
    }

    if (mode === "predeploy") {
      runScriptList(results, predeployExtraScripts, env, false);
    }

    const status = statusFromResults(results);
    writeDashboard({ generatedAt, baseUrl, status, results, serverMode });

    const output = writeReport({
      markdownPath: "QA_PREDEPLOY_REPORT.md",
      jsonPath: "qa-predeploy-report.json",
      title: mode === "predeploy" ? "QA Predeploy Report" : "QA Critical Report",
      summary: {
        mode,
        baseUrl,
        generatedAt,
        serverMode,
        previewAllowed: status === "FAIL" ? "no" : "yes_with_conscious_yellow_review",
        productionAllowed: "manual_browsercheck_required",
      },
      results,
      extraMarkdown: [
        "## Gate Rules",
        "",
        "- RED/FAIL blocks preview and production.",
        "- YELLOW/WARN requires a conscious decision and manual review.",
        "- Production always requires a manual browser check after preview.",
      ],
    });

    console.log(`${mode === "predeploy" ? "QA predeploy" : "QA critical"} status: ${output.status}`);
    console.log("Reports written: QA_PREDEPLOY_REPORT.md, qa-predeploy-report.json, docs/QA_PREDEPLOY_DASHBOARD.md");
    process.exitCode = output.status === "FAIL" ? 1 : 0;
  } finally {
    stopProcess(server);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
