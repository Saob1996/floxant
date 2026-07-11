const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = process.cwd();
const reportPath = path.join(root, "DEADCODE_HEALTH_REPORT.md");
const jsonPath = path.join(root, "deadcode-health-report.json");
const findings = [];

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function readAbsolute(file) {
  return fs.readFileSync(file, "utf8");
}

function add(status, check, detail, file) {
  findings.push({ status, check, detail, file });
}

function walk(dir, files = []) {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) return files;

  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    if ([".git", ".next", "node_modules", "supabase"].includes(entry.name)) continue;
    const full = path.join(absolute, entry.name);
    if (entry.isDirectory()) {
      walk(rel(full), files);
    } else {
      files.push(full);
    }
  }

  return files;
}

function safeGitStatus() {
  try {
    return execSync("git status --short", { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    return "";
  }
}

const sourceFiles = [
  ...walk("app"),
  ...walk("components"),
  ...walk("lib"),
  ...walk("scripts"),
].filter((file) => /\.(tsx?|jsx?|cjs|mjs)$/.test(file));

const sourceTextByFile = new Map(sourceFiles.map((file) => [rel(file), readAbsolute(file)]));
const allSourceText = Array.from(sourceTextByFile.entries())
  .map(([file, text]) => `\n/* ${file} */\n${text}`)
  .join("\n");

const componentFiles = walk("components").filter((file) => /\.(tsx|jsx)$/.test(file));
const componentBasenameGroups = new Map();
for (const file of componentFiles) {
  const basename = path.basename(file).replace(/\.(tsx|jsx)$/, "");
  const group = componentBasenameGroups.get(basename) || [];
  group.push(rel(file));
  componentBasenameGroups.set(basename, group);
}

for (const [basename, files] of componentBasenameGroups.entries()) {
  if (files.length > 1) {
    add("WARN", "duplicate-component-name", `${basename} existiert mehrfach: ${files.join(", ")}`, files[0]);
  }
}

let unreferencedComponentCount = 0;
for (const file of componentFiles) {
  const relative = rel(file);
  const basename = path.basename(file).replace(/\.(tsx|jsx)$/, "");
  const importPath = relative.replace(/\.(tsx|jsx)$/, "").replace(/^components\//, "@/components/");
  const references = Array.from(sourceTextByFile.entries()).filter(([sourceFile, text]) => {
    if (sourceFile === relative) return false;
    return text.includes(basename) || text.includes(importPath) || text.includes(relative.replace(/\.(tsx|jsx)$/, ""));
  });

  if (references.length === 0) {
    unreferencedComponentCount += 1;
    if (unreferencedComponentCount <= 80) {
      add("WARN", "manual-review-unreferenced-component", `${relative} hat keinen direkten statischen Importtreffer. Nicht automatisch loeschen.`, relative);
    }
  }
}

const duplicateDataSignals = [
  ["FAQ data", ["lib/faqs.ts", "lib/service-faqs.ts", "lib/local-faqs.ts", "lib/local-seo/localFaqs.ts"]],
  ["AI answer data", ["lib/ai-answer-system.ts", "components/ai-answer/AiAnswerBlock.tsx", "components/AiAnswerBlock.tsx"]],
  ["CTA components", ["components/LeadCta.tsx", "components/conversion/OfferCheckCTA.tsx", "components/OfferCheckInlineCTA.tsx", "components/MobileFloatingContact.tsx"]],
  ["Service data", ["lib/service-routing.ts", "lib/service-inventory.ts", "lib/service-products.ts", "lib/floxant-services.ts", "lib/local-seo/services.ts"]],
];

for (const [label, files] of duplicateDataSignals) {
  const present = files.filter((file) => fs.existsSync(path.join(root, file)));
  add(
    present.length > 1 ? "WARN" : "PASS",
    "overlapping-source-review",
    present.length > 1
      ? `${label} hat mehrere Quellen und sollte nur ueber dokumentierte Adapter genutzt werden: ${present.join(", ")}`
      : `${label} hat keine offensichtliche Ueberschneidung.`,
    present[0] || "",
  );
}

const scriptFiles = walk("scripts").filter((file) => /\.(cjs|js|ts|mjs)$/.test(file)).map(rel);
const healthScripts = scriptFiles.filter((file) => /health|quality|coverage|seo|risk|sitemap/.test(path.basename(file)));
add(
  healthScripts.length > 20 ? "WARN" : "PASS",
  "script-overlap-review",
  `${healthScripts.length} Health-/Quality-/SEO-nahe Scripts gefunden; Ueberschneidungen sind dokumentationspflichtig.`,
  "scripts",
);

const docs = walk("docs").filter((file) => /\.(md|mdx)$/.test(file)).map(rel);
const reports = docs.filter((file) => /REPORT|AUDIT|PLAN|MAP|CHECKLIST|STRATEGY/.test(path.basename(file)));
add(
  reports.length > 80 ? "WARN" : "PASS",
  "docs-report-volume",
  `${reports.length} Report-/Audit-/Plan-Dokumente in docs/ gefunden; Index/Archive-Review noetig.`,
  "docs",
);

const gitStatus = safeGitStatus();
const deletedFiles = gitStatus
  .split(/\r?\n/)
  .filter((line) => /^ D|^D /.test(line))
  .map((line) => line.slice(3).trim())
  .filter(Boolean);

if (deletedFiles.length) {
  add(
    "WARN",
    "deleted-files-in-worktree",
    `${deletedFiles.length} geloeschte Dateien im Worktree sichtbar; vor Staging manuell pruefen.`,
    deletedFiles[0],
  );
}

const oldHelpers = sourceFiles
  .map(rel)
  .filter((file) => /(old|legacy|deprecated|backup|copy|tmp|temp)/i.test(path.basename(file)));
for (const file of oldHelpers.slice(0, 50)) {
  add("WARN", "legacy-helper-review", `${file} wirkt nach Name wie Alt-/Temp-/Legacy-Datei.`, file);
}

if (!/fetch\(\s*["']\/api\//.test(allSourceText)) {
  add("PASS", "api-fetch-scan", "Kein direkter fetch('/api...') Treffer im statischen Source-Scan.", "");
} else {
  add("WARN", "api-fetch-scan", "Direkte fetch('/api...') Treffer vorhanden; Submit-only manuell pruefen.", "");
}

const failures = findings.filter((item) => item.status === "FAIL");
const warnings = findings.filter((item) => item.status === "WARN");
const passes = findings.filter((item) => item.status === "PASS");
const status = failures.length ? "FAIL" : warnings.length ? "WARN" : "PASS";

const report = [
  "# Deadcode Health Report",
  "",
  `Status: ${status}`,
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Summary",
  "",
  `- PASS: ${passes.length}`,
  `- WARN: ${warnings.length}`,
  `- FAIL: ${failures.length}`,
  `- Unreferenced component candidates shown: ${Math.min(unreferencedComponentCount, 80)} of ${unreferencedComponentCount}`,
  "",
  "## Findings",
  "",
  ...findings.map((item) => `- ${item.status}: ${item.check} - ${item.detail}${item.file ? ` (${item.file})` : ""}`),
  "",
  "## Cleanup Policy",
  "",
  "- Keine automatische Loeschung.",
  "- P0-Komponenten und Routen bleiben unangetastet.",
  "- Unklare Treffer sind manual_review, nicht dead.",
].join("\n");

fs.writeFileSync(reportPath, report, "utf8");
fs.writeFileSync(
  jsonPath,
  JSON.stringify(
    {
      status,
      generatedAt: new Date().toISOString(),
      totals: { pass: passes.length, warn: warnings.length, fail: failures.length },
      unreferencedComponentCount,
      findings,
    },
    null,
    2,
  ),
  "utf8",
);

console.log(`Deadcode health status: ${status}`);
console.log(`Report written: ${rel(reportPath)}`);
console.log(`JSON written: ${rel(jsonPath)}`);

if (failures.length) process.exitCode = 1;
