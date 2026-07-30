const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const generatedAt = new Date().toISOString();
const scanRoots = ["app", "components", "lib", "proxy.ts", "next.config.js"];
const ignoredDirs = new Set(["node_modules", ".next", ".git", ".vercel", "coverage"]);
const sourceExt = new Set([".ts", ".tsx", ".js", ".jsx", ".cjs", ".mjs"]);

const publicPageRules = [
  { name: "public revalidate", pattern: /\bexport\s+const\s+revalidate\b|\brevalidate\s*=/, severity: "FAIL", action: "Public pages should stay static unless explicitly approved." },
  { name: "public node runtime", pattern: /\bexport\s+const\s+runtime\s*=\s*["']nodejs["']/, severity: "FAIL", action: "Do not force public pages onto node runtime." },
  { name: "public force dynamic", pattern: /\bexport\s+const\s+dynamic\s*=\s*["']force-dynamic["']/, severity: "FAIL", action: "Do not force public pages dynamic." },
  { name: "public api fetch", pattern: /fetch\(["']\/api\//, severity: "FAIL", action: "Normal public page render must not require API calls." },
  { name: "public sendBeacon", pattern: /navigator\.sendBeacon|sendBeacon\(/, severity: "FAIL", action: "Remove automatic beacon on public pages." },
  { name: "public supabase", pattern: /from\s+["']@\/lib\/supabase|supabase\./, severity: "FAIL", action: "Keep Supabase out of normal public page load." },
  { name: "public resend", pattern: /from\s+["']resend["']|new\s+Resend/, severity: "FAIL", action: "Keep Resend out of normal public page load." },
  { name: "public sharp/pdf", pattern: /from\s+["']sharp["']|require\(["']sharp["']\)|@react-pdf|\/api\/pdf/, severity: "FAIL", action: "Keep PDF/sharp out of public page load." },
];

const globalRules = [
  { name: "automatic vitals post", pattern: /\/api\/vitals/, severity: "FAIL", action: "Do not auto-post vitals from public pages." },
  { name: "automatic conversion post", pattern: /\/api\/conversion-events/, severity: "FAIL", action: "Do not auto-post conversion events from public pages." },
  { name: "sendBeacon", pattern: /navigator\.sendBeacon|sendBeacon\(/, severity: "WARN", action: "Check that beacon is not automatic on page load." },
  {
    name: "network polling",
    pattern:
      /setInterval\s*\([\s\S]{0,600}(?:fetch\s*\(|[A-Za-z]\w*Fetch\s*\(|axios\.|XMLHttpRequest|router\.refresh\s*\()/,
    severity: "WARN",
    action: "Confirm interval is user-scoped and not public polling.",
  },
];

function walk(entry, files = []) {
  const absolute = path.join(root, entry);
  if (!fs.existsSync(absolute)) return files;
  const stat = fs.statSync(absolute);
  if (stat.isDirectory()) {
    if (ignoredDirs.has(path.basename(absolute))) return files;
    for (const child of fs.readdirSync(absolute)) {
      walk(path.join(entry, child), files);
    }
    return files;
  }
  if (sourceExt.has(path.extname(absolute))) files.push(entry);
  return files;
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function add(results, status, priority, file, rule, detail, action) {
  results.push({ status, priority, file, rule, detail, action });
}

function isPublicPage(file) {
  if (/^app[\\/](admin|dashboard|login)[\\/]/.test(file)) return false;
  return /^app[\\/].*[\\/]page\.(tsx|ts|jsx|js)$/.test(file) || /^app[\\/]page\.(tsx|ts|jsx|js)$/.test(file);
}

function isApiFile(file) {
  return /^app[\\/]api[\\/]/.test(file);
}

function isPrivateAppSurface(file) {
  return /^app[\\/](admin|dashboard|login)[\\/]/.test(file);
}

function scanFiles() {
  const results = [];
  const files = scanRoots.flatMap((entry) => walk(entry));
  const uniqueFiles = Array.from(new Set(files));

  for (const file of uniqueFiles) {
    const source = read(file);
    if (isPublicPage(file)) {
      for (const rule of publicPageRules) {
        if (rule.pattern.test(source)) {
          add(results, rule.severity, "P0", file, rule.name, "Pattern found in public page.", rule.action);
        }
      }
    } else if (isPrivateAppSurface(file)) {
      if (/dynamic\s*=\s*["']force-dynamic["']|runtime\s*=\s*["']nodejs["']|@react-pdf|\/api\/pdf|sharp/i.test(source)) {
        add(results, "PASS", "P2", file, "private dynamic surface", "Dynamic/PDF-sensitive pattern is limited to admin/dashboard/login surface.", "No action for normal public visitors.");
      }
    }

    if (!isApiFile(file)) {
      for (const rule of globalRules) {
        if (rule.pattern.test(source)) {
          add(results, rule.severity, rule.severity === "FAIL" ? "P0" : "P2", file, rule.name, "Pattern found outside API route.", rule.action);
        }
      }
    }
  }

  const nextConfig = read("next.config.js");
  if (/unoptimized\s*:\s*true/.test(nextConfig)) {
    add(results, "PASS", "P0", "next.config.js", "image optimization disabled", "images.unoptimized remains true.", "No action.");
  } else {
    add(results, "FAIL", "P0", "next.config.js", "image optimization disabled", "images.unoptimized true not detected.", "Keep Vercel Image Optimization disabled unless cost model changes.");
  }

  const proxy = fs.existsSync(path.join(root, "proxy.ts")) ? read("proxy.ts") : "";
  if (/fetch\(|supabase|Resend|sharp|pdf/i.test(proxy)) {
    add(results, "FAIL", "P0", "proxy.ts", "proxy heavy operation", "Heavy operation pattern detected in proxy.", "Keep proxy lightweight.");
  } else {
    add(results, "PASS", "P0", "proxy.ts", "proxy lightweight", "No fetch/Supabase/Resend/sharp/pdf pattern detected.", "No action.");
  }

  if (fs.existsSync(path.join(root, "app/api/cron/daily/route.ts"))) {
    add(results, "WARN", "P2", "app/api/cron/daily/route.ts", "cron route exists", "Cron route exists and must stay secret-gated.", "Check Vercel cron config and secret before production.");
  }

  const authRoute = "app/api/auth/[...nextauth]/route.ts";
  if (fs.existsSync(path.join(root, authRoute)) && /runtime\s*=\s*["']nodejs["']/.test(read(authRoute))) {
    add(results, "PASS", "P2", authRoute, "node runtime api", "Node runtime is limited to API/auth context.", "No action.");
  }

  const bookingsRoute = "app/api/bookings/route.ts";
  if (fs.existsSync(path.join(root, bookingsRoute)) && /runtime\s*=\s*["']nodejs["']/.test(read(bookingsRoute))) {
    add(results, "PASS", "P0", bookingsRoute, "node runtime lead api", "Node runtime is limited to explicit lead API submit path.", "No action.");
  }

  return { files: uniqueFiles.length, results };
}

function statusFromResults(results) {
  if (results.some((item) => item.status === "FAIL")) return "FAIL";
  if (results.some((item) => item.status === "WARN")) return "WARN";
  return "PASS";
}

function writeReports(files, results) {
  const status = statusFromResults(results);
  const summary = {
    generatedAt,
    scannedFiles: files,
    checks: results.length,
    pass: results.filter((item) => item.status === "PASS").length,
    warn: results.filter((item) => item.status === "WARN").length,
    fail: results.filter((item) => item.status === "FAIL").length,
  };
  const output = { status, summary, results };
  const rows = results.map((item) => `| ${item.status} | ${item.priority} | ${item.file} | ${item.rule} | ${item.detail} | ${item.action} |`);
  const md = [
    "# Vercel Usage Safety Report",
    "",
    `Generated: ${generatedAt}`,
    `Status: ${status}`,
    "",
    "## Summary",
    "",
    `- Scanned files: ${summary.scannedFiles}`,
    `- Checks: ${summary.checks}`,
    `- PASS: ${summary.pass}`,
    `- WARN: ${summary.warn}`,
    `- FAIL: ${summary.fail}`,
    "",
    "## Results",
    "",
    "| Status | Priority | File | Rule | Detail | Action |",
    "| --- | --- | --- | --- | --- | --- |",
    ...rows,
    "",
    "## Policy",
    "",
    "- Normal public page visits must stay static and must not trigger lead APIs.",
    "- API routes may use Node runtime, Supabase, Resend, PDF, or sharp only after explicit user action.",
    "- This script scans and reports only; it does not modify code.",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(root, "vercel-usage-safety-report.json"), JSON.stringify(output, null, 2));
  fs.writeFileSync(path.join(root, "VERCEL_USAGE_SAFETY_REPORT.md"), md);
  return output;
}

function main() {
  const { files, results } = scanFiles();
  const output = writeReports(files, results);
  console.log(`Vercel usage safety status: ${output.status}`);
  console.log("Reports written: VERCEL_USAGE_SAFETY_REPORT.md, vercel-usage-safety-report.json");
  process.exit(output.status === "FAIL" ? 1 : 0);
}

main();
