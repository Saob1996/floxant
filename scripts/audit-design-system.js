#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { walk, writeCsv } = require("./editorial-audit-utils.js");

const root = process.cwd();
const reportFile = path.join(root, "artifacts", "design-system-audit.csv");
const sourceFiles = [...walk(path.join(root, "app"), (entry) => /\.(?:tsx|ts|css)$/.test(entry)), ...walk(path.join(root, "components"), (entry) => /\.(?:tsx|ts|css)$/.test(entry))];
const rows = [];

for (const file of sourceFiles) {
  const relative = path.relative(root, file).replace(/\\/g, "/");
  const source = fs.readFileSync(file, "utf8");
  const lines = source.split(/\r?\n/);
  lines.forEach((line, index) => {
    const normalized = line.replace(/\s+/g, " ");
    const classNames = [...line.matchAll(/className=["']([^"']+)["']/g)].map((match) => match[1]);
    for (const className of classNames) {
      const tokens = className.split(/\s+/);
      const hasDarkBackground = tokens.some((token) => /^(?:bg-(?:black|slate-9|gray-9|zinc-9|neutral-9|stone-9))/.test(token));
      const hasDarkForeground = tokens.some((token) => /^(?:text-(?:black|slate-9|gray-9|zinc-9|neutral-9|stone-9))/.test(token));
      if (hasDarkBackground && hasDarkForeground) {
        rows.push({ file: relative, line: index + 1, issue: "DARK_FOREGROUND_ON_DARK_CONTAINER", severity: "error", detail: className.slice(0, 220) });
      }
    }
    if (/<(?:button|a|Link)\b/.test(normalized) && /className=/.test(normalized) && !/(?:min-h-(?:11|12|14)|h-(?:11|12|14)|py-[34])/.test(normalized)) rows.push({ file: relative, line: index + 1, issue: "TOUCH_TARGET_REVIEW", severity: "warning", detail: normalized.slice(0, 220) });
    if (/<(?:button|a|Link)\b/.test(normalized) && /className=/.test(normalized) && !/focus(?:-visible)?:/.test(normalized)) rows.push({ file: relative, line: index + 1, issue: "FOCUS_STYLE_REVIEW", severity: "warning", detail: normalized.slice(0, 220) });
    if (/transition(?:-|\s)/.test(normalized) && !/motion-reduce|motion-safe/.test(normalized)) rows.push({ file: relative, line: index + 1, issue: "REDUCED_MOTION_REVIEW", severity: "warning", detail: normalized.slice(0, 220) });
  });
}

writeCsv(reportFile, ["file", "line", "issue", "severity", "detail"], rows);
const errors = rows.filter((row) => row.severity === "error").length;
console.log(JSON.stringify({ files: sourceFiles.length, findings: rows.length, errors, warnings: rows.length - errors, browserWidthsRequired: [1440, 1024, 768, 390], report: path.relative(root, reportFile) }, null, 2));
if (errors) process.exit(1);
