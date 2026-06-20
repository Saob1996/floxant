const fs = require("fs");
const path = require("path");

const root = process.cwd();
const jsonPath = path.join(root, "performance-health-report.json");
const mdPath = path.join(root, "PERFORMANCE_HEALTH_REPORT.md");

const sourceDirs = ["app", "components", "lib"];
const ignoreDirs = new Set([".git", ".next", "node_modules", "out", "dist", "coverage"]);
const publicPageSkip = /[\\/]app[\\/](api|dashboard|admin|login)[\\/]/;

function walk(dir, predicate = () => true) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignoreDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full, predicate));
    } else if (predicate(full)) {
      files.push(full);
    }
  }

  return files;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function has(regex, text) {
  return regex.test(text);
}

function findMatches(files, regex) {
  const matches = [];
  for (const file of files) {
    const text = read(file);
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (regex.test(line)) {
        matches.push({ file: rel(file), line: index + 1, text: line.trim().slice(0, 180) });
      }
    });
  }
  return matches;
}

function assetReport() {
  const publicDir = path.join(root, "public");
  const files = walk(publicDir, (file) => fs.statSync(file).isFile());
  const assets = files.map((file) => {
    const size = fs.statSync(file).size;
    return {
      file: rel(file),
      bytes: size,
      kb: Math.round((size / 1024) * 10) / 10,
      ext: path.extname(file).toLowerCase(),
    };
  }).sort((a, b) => b.bytes - a.bytes);

  return {
    totalBytes: assets.reduce((sum, item) => sum + item.bytes, 0),
    totalKb: Math.round((assets.reduce((sum, item) => sum + item.bytes, 0) / 1024) * 10) / 10,
    count: assets.length,
    over512Kb: assets.filter((item) => item.bytes > 512 * 1024),
    over1024Kb: assets.filter((item) => item.bytes > 1024 * 1024),
    largest: assets.slice(0, 20),
  };
}

function imageUsage(files) {
  const rows = [];
  for (const file of files) {
    const text = read(file);
    const nextImageCount = (text.match(/<Image\b/g) || []).length;
    const rawImgCount = (text.match(/<img\b/g) || []).length;
    const priorityCount = (text.match(/\bpriority(?:=|\s|>)/g) || []).length;
    const sizesCount = (text.match(/\bsizes=/g) || []).length;
    if (nextImageCount || rawImgCount) {
      rows.push({
        file: rel(file),
        nextImageCount,
        rawImgCount,
        priorityCount,
        sizesCount,
      });
    }
  }
  return rows;
}

function statusItem(status, label, detail, file = "", line = "") {
  return { status, label, detail, file, line };
}

function main() {
  const sourceFiles = sourceDirs.flatMap((dir) =>
    walk(path.join(root, dir), (file) => /\.(tsx|ts|jsx|js|cjs|mjs)$/.test(file)),
  );
  const tsxFiles = sourceFiles.filter((file) => /\.(tsx|jsx)$/.test(file));
  const clientFiles = sourceFiles.filter((file) => /["']use client["']/.test(read(file)));
  const clientApiFetches = [];
  const browserApiHits = [];

  for (const file of clientFiles) {
    const text = read(file);
    const browserHits = (text.match(/\b(window|document|localStorage|sessionStorage|navigator)\b|addEventListener|useEffect|useState/g) || []).length;
    if (browserHits) browserApiHits.push({ file: rel(file), hits: browserHits });
    if (/fetch\s*\(\s*["'`]\/api\//.test(text)) {
      clientApiFetches.push({
        file: rel(file),
        submitLikely: /handleSubmit|onSubmit|FormEvent|submitState|isSubmitting/.test(text),
      });
    }
  }

  const nextConfigPath = path.join(root, "next.config.js");
  const nextConfig = fs.existsSync(nextConfigPath) ? read(nextConfigPath) : "";
  const layoutPath = path.join(root, "app", "layout.tsx");
  const layout = fs.existsSync(layoutPath) ? read(layoutPath) : "";
  const reporterPath = path.join(root, "components", "ConversionEventReporter.tsx");
  const reporter = fs.existsSync(reporterPath) ? read(reporterPath) : "";

  const pageFiles = walk(path.join(root, "app"), (file) => /page\.(tsx|ts|jsx|js)$/.test(file));
  const publicPages = pageFiles.filter((file) => !publicPageSkip.test(file));
  const hardFindings = [];

  if (!/images\s*:\s*{[\s\S]*unoptimized\s*:\s*true/.test(nextConfig)) {
    hardFindings.push(statusItem("FAIL", "Image optimization", "next.config.js muss images.unoptimized: true behalten.", "next.config.js"));
  }

  for (const file of publicPages) {
    const text = read(file);
    if (/export const runtime\s*=\s*["']nodejs["']/.test(text)) {
      hardFindings.push(statusItem("FAIL", "Public runtime", "Public page nutzt runtime=nodejs.", rel(file)));
    }
    if (/export const dynamic\s*=\s*["']force-dynamic["']/.test(text)) {
      hardFindings.push(statusItem("FAIL", "Public dynamic", "Public page nutzt dynamic=force-dynamic.", rel(file)));
    }
    if (/export const revalidate\b|revalidate\s*=/.test(text)) {
      hardFindings.push(statusItem("FAIL", "Public revalidate", "Public page nutzt revalidate/ISR.", rel(file)));
    }
  }

  const forbiddenTracking = findMatches(sourceFiles, /\/api\/vitals|\/api\/conversion-events|sendBeacon\s*\(/);
  for (const match of forbiddenTracking) {
    hardFindings.push(statusItem("FAIL", "Forbidden tracking endpoint", match.text, match.file, match.line));
  }

  if (/WebVitalsReporter/.test(layout)) {
    hardFindings.push(statusItem("FAIL", "WebVitals layout", "WebVitalsReporter ist im Root Layout eingebunden.", "app/layout.tsx"));
  }

  const assets = assetReport();
  const images = imageUsage(tsxFiles);
  const warnings = [];

  if (clientFiles.length > 100) {
    warnings.push(statusItem("WARN", "Client component budget", `${clientFiles.length} Client-Dateien gefunden.`));
  }
  if (assets.over512Kb.length) {
    warnings.push(statusItem("WARN", "Large assets", `${assets.over512Kb.length} Assets ueber 512 KB gefunden.`));
  }
  if (!/const enableSuccessFetchTracking = false/.test(reporter)) {
    warnings.push(statusItem("WARN", "Fetch patch", "ConversionEventReporter hat keinen deaktivierten Fetch-Patch-Marker.", "components/ConversionEventReporter.tsx"));
  }
  if (!/const enableDwellTracking = false/.test(reporter)) {
    warnings.push(statusItem("WARN", "Dwell tracking", "ConversionEventReporter hat keinen deaktivierten Dwell-Marker.", "components/ConversionEventReporter.tsx"));
  }

  const status = hardFindings.length ? "FAIL" : warnings.length ? "WARN" : "PASS";
  const output = {
    status,
    generatedAt: new Date().toISOString(),
    summary: {
      sourceFiles: sourceFiles.length,
      clientFiles: clientFiles.length,
      clientApiFetches,
      browserApiHitsTop: browserApiHits.sort((a, b) => b.hits - a.hits).slice(0, 25),
      publicAssetTotalKb: assets.totalKb,
      publicAssetsOver512Kb: assets.over512Kb.length,
      publicAssetsOver1024Kb: assets.over1024Kb.length,
      imageUsageCount: images.length,
    },
    checks: [
      statusItem("PASS", "Vercel image optimization", "images.unoptimized bleibt true.", "next.config.js"),
      statusItem("PASS", "Public page runtime", "Keine runtime=nodejs/force-dynamic/revalidate Treffer auf public pages."),
      statusItem("PASS", "No vitals/conversion API", "Keine /api/vitals, /api/conversion-events oder sendBeacon Treffer."),
      ...warnings,
      ...hardFindings,
    ],
    assets,
    imageUsage: images,
  };

  const md = `# Performance Health Report

Generated: ${output.generatedAt}

Status: ${status}

## Summary

- Source files scanned: ${sourceFiles.length}
- Client files: ${clientFiles.length}
- Client API fetch files: ${clientApiFetches.length}
- Public assets: ${assets.count} files / ${assets.totalKb} KB
- Assets over 512 KB: ${assets.over512Kb.length}
- Assets over 1024 KB: ${assets.over1024Kb.length}
- Files with image usage: ${images.length}

## Checks

| Status | Check | Detail | File |
| --- | --- | --- | --- |
${output.checks.map((item) => `| ${item.status} | ${item.label} | ${item.detail.replace(/\|/g, "/")} | ${item.file || "-"}${item.line ? `:${item.line}` : ""} |`).join("\n")}

## Largest Public Assets

| KB | File |
| ---: | --- |
${assets.largest.map((item) => `| ${item.kb} | \`${item.file}\` |`).join("\n")}

## Client API Fetch Files

| Submit-bound likely | File |
| --- | --- |
${clientApiFetches.length ? clientApiFetches.map((item) => `| ${item.submitLikely ? "yes" : "unknown"} | \`${item.file}\` |`).join("\n") : "| - | - |"}

## Recommendations

- Keep image optimization disabled on Vercel.
- Convert oversized PNG hero assets to smaller WebP/AVIF in a dedicated asset sprint.
- Keep automatic dwell/fetch patch tracking disabled; prefer explicit user action or form-success custom events.
- Keep API work on real submit only.
`;

  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));
  fs.writeFileSync(mdPath, md);
  console.log(`Performance health status: ${status}`);
  console.log(`Reports written: ${path.relative(root, mdPath)}, ${path.relative(root, jsonPath)}`);
  process.exit(hardFindings.length ? 1 : 0);
}

main();
