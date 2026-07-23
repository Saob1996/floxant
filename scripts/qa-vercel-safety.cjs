#!/usr/bin/env node

const path = require("node:path");

const {
  ROOT,
  addResult,
  npmCommand,
  readFileIfExists,
  rel,
  scriptExists,
  walk,
  writeReport,
} = require("./qa-shared.cjs");

const publicPagePatterns = [
  { rule: "public revalidate", pattern: /\bexport\s+const\s+revalidate\b|\brevalidate\s*=/, status: "FAIL", action: "Keep public pages fully static unless explicitly approved." },
  { rule: "public node runtime", pattern: /\bexport\s+const\s+runtime\s*=\s*["']nodejs["']/, status: "FAIL", action: "Do not force public pages onto Node runtime." },
  { rule: "public force dynamic", pattern: /\bexport\s+const\s+dynamic\s*=\s*["']force-dynamic["']/, status: "FAIL", action: "Do not force public pages dynamic." },
  { rule: "public api fetch", pattern: /fetch\(\s*["']\/api\//, status: "FAIL", action: "Normal public page render must not require API calls." },
  { rule: "public sendBeacon", pattern: /navigator\.sendBeacon|sendBeacon\(/, status: "FAIL", action: "Do not auto-beacon during public page render." },
  { rule: "public supabase", pattern: /@supabase\/supabase-js|from\s+["']@\/lib\/supabase|supabase\./, status: "FAIL", action: "Keep Supabase out of normal public page load." },
  { rule: "public resend", pattern: /from\s+["']resend["']|new\s+Resend/, status: "FAIL", action: "Keep Resend out of normal public page load." },
  { rule: "public sharp/pdf", pattern: /from\s+["']sharp["']|require\(["']sharp["']\)|@react-pdf|\/api\/pdf/, status: "FAIL", action: "Keep PDF/sharp out of public page load." },
];

const globalPatterns = [
  { rule: "automatic vitals post", pattern: /\/api\/vitals/, status: "FAIL", action: "Do not auto-post vitals from public surfaces." },
  { rule: "automatic conversion post", pattern: /\/api\/conversion-events/, status: "WARN", action: "Confirm conversion endpoint is submit/user-action bound only." },
  { rule: "sendBeacon", pattern: /navigator\.sendBeacon|sendBeacon\(/, status: "WARN", action: "Confirm beacon is not automatic page-load tracking." },
  { rule: "client polling", pattern: /setInterval\(/, status: "WARN", action: "Confirm polling is private/user-scoped and not public page polling." },
];

function isPublicPage(file) {
  const relative = rel(file);
  if (!/^app\//.test(relative)) return false;
  if (/^app\/(api|admin|dashboard|login)\//.test(relative)) return false;
  return /\/page\.(tsx|ts|jsx|js)$/.test(relative) || relative === "app/page.tsx";
}

function isApiFile(file) {
  return /^app\/api\//.test(rel(file));
}

function scanSource(results) {
  const sourceFiles = [
    ...walk(path.join(ROOT, "app"), (file) => /\.(ts|tsx|js|jsx)$/.test(file)),
    ...walk(path.join(ROOT, "components"), (file) => /\.(ts|tsx|js|jsx)$/.test(file)),
    ...walk(path.join(ROOT, "lib"), (file) => /\.(ts|tsx|js|jsx|cjs|mjs)$/.test(file)),
    path.join(ROOT, "proxy.ts"),
    path.join(ROOT, "next.config.js"),
  ].filter((file, index, all) => all.indexOf(file) === index);

  for (const file of sourceFiles) {
    const source = readFileIfExists(file);
    if (!source) continue;
    if (isPublicPage(file)) {
      for (const rule of publicPagePatterns) {
        if (rule.pattern.test(source)) {
          addResult(results, rule.status, "public-page", rel(file), rule.rule, rule.action, { priority: rule.status === "FAIL" ? "P0" : "P2" });
        }
      }
    }

    if (!isApiFile(file)) {
      for (const rule of globalPatterns) {
        if (rule.pattern.test(source)) {
          addResult(results, rule.status, "global-source", rel(file), rule.rule, rule.action, { priority: rule.status === "FAIL" ? "P0" : "P2" });
        }
      }
    }
  }

  const nextConfig = readFileIfExists("next.config.js");
  addResult(results, /unoptimized\s*:\s*true/.test(nextConfig) ? "PASS" : "FAIL", "next-config", "next.config.js", /unoptimized\s*:\s*true/.test(nextConfig) ? "Vercel Image Optimization remains disabled." : "images.unoptimized true not detected.", /unoptimized\s*:\s*true/.test(nextConfig) ? "No action." : "Keep Vercel Image Optimization disabled unless cost model changes.", { priority: "P0" });

  const proxy = readFileIfExists("proxy.ts");
  if (proxy) {
    const heavy = /fetch\(|supabase|Resend|sharp|pdf|@react-pdf/i.test(proxy);
    addResult(results, heavy ? "FAIL" : "PASS", "proxy", "proxy.ts", heavy ? "Heavy operation marker found in proxy." : "Proxy has no heavy operation markers.", heavy ? "Keep proxy limited to routing/header logic." : "No action.", { priority: "P0" });
  }

  const cron = path.join(ROOT, "app", "api", "cron", "daily", "route.ts");
  if (readFileIfExists(cron)) {
    addResult(results, "WARN", "cron", rel(cron), "Cron route exists and must stay secret-gated.", "Verify cron secret before production.", { priority: "P2" });
  }
}

function runExisting(results) {
  if (!scriptExists("vercel:usage-safety")) {
    addResult(results, "WARN", "existing-script", "vercel:usage-safety", "Script missing.", "Add or update Vercel usage safety script.", { priority: "P1" });
    return;
  }
  const result = npmCommand("vercel:usage-safety", {}, { optional: true, tailLines: 30 });
  addResult(results, result.status, "existing-script", "vercel:usage-safety", `Exit ${result.exitCode}; duration ${result.durationMs}ms.`, result.status === "PASS" ? "No action." : "Inspect VERCEL_USAGE_SAFETY_REPORT.md.", { priority: result.status === "PASS" ? "P2" : "P1", stdoutTail: result.stdoutTail, stderrTail: result.stderrTail });
}

function main() {
  const results = [];
  scanSource(results);
  runExisting(results);

  const output = writeReport({
    markdownPath: "QA_VERCEL_SAFETY_REPORT.md",
    jsonPath: "qa-vercel-safety-report.json",
    title: "QA Vercel Safety Report",
    summary: {
      scanRoots: "app, components, lib, proxy.ts, next.config.js",
      leadApiPolicy: "Lead API may run only after explicit form submit.",
      imagePolicy: "Vercel Image Optimization must remain disabled.",
    },
    results,
    extraMarkdown: [
      "## Policy",
      "",
      "- No ISR/revalidate, force-dynamic, public Node runtime or API fetches on public pages.",
      "- Supabase, Resend, PDF and sharp must stay out of normal public page visits.",
      "- Warnings require manual confirmation before production.",
    ],
  });

  console.log(`QA Vercel safety status: ${output.status}`);
  console.log("Reports written: QA_VERCEL_SAFETY_REPORT.md, qa-vercel-safety-report.json");
  process.exit(output.status === "FAIL" ? 1 : 0);
}

main();
