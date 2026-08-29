const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const outDir = path.join(root, "out");
const reportPath = path.join(root, "artifacts", "performance-budget-report.json");
const MiB = 1024 ** 2;

const budgets = {
  fileCount: 20_000,
  largestFileBytes: 25 * MiB,
  totalOutputBytes: 4_450_000_000,
  totalJavaScriptBytes: 4 * MiB,
  largestJavaScriptBytes: 256 * 1024,
  totalCssBytes: 600 * 1024,
  largestHtmlBytes: 2 * MiB,
  largestReactServerPayloadBytes: 1.5 * MiB,
  largestImageBytes: 5 * MiB,
  totalFontBytes: 1 * MiB,
  sourceMapFiles: 0,
  toolRouteJavaScriptBytes: 110 * 1024,
};

function walk(directory) {
  const files = [];
  const stack = [directory];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(absolute);
      else if (entry.isFile()) files.push(absolute);
    }
  }
  return files;
}

function sum(files) {
  return files.reduce((total, file) => total + file.bytes, 0);
}

function max(files) {
  return files.length ? Math.max(...files.map((file) => file.bytes)) : 0;
}

if (!fs.existsSync(outDir)) throw new Error("out/ fehlt. Zuerst npm run build ausführen.");
const files = walk(outDir).map((file) => ({ file, path: path.relative(outDir, file).replaceAll("\\", "/"), bytes: fs.statSync(file).size, extension: path.extname(file).toLowerCase() }));
const javascript = files.filter((file) => file.extension === ".js");
const css = files.filter((file) => file.extension === ".css");
const html = files.filter((file) => file.extension === ".html");
const reactServerPayloads = files.filter((file) => file.extension === ".txt");
const images = files.filter((file) => /\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(file.path));
const fonts = files.filter((file) => /\.(?:eot|otf|ttf|woff2?)$/i.test(file.path));
const sourceMaps = files.filter((file) => file.extension === ".map");
const toolRoutePatterns = [
  /app\/angebotscheck\/page-[^/]+\.js$/,
  /app\/objektbrief\/page-[^/]+\.js$/,
  /app\/leistungsfinder\/page-[^/]+\.js$/,
  /app\/en\/quote-check\/page-[^/]+\.js$/,
  /app\/en\/create-request\/page-[^/]+\.js$/,
  /app\/en\/service-finder\/page-[^/]+\.js$/,
];
const toolRouteBundles = javascript.filter((file) => toolRoutePatterns.some((pattern) => pattern.test(file.path)));
const externalScriptOrigins = new Set();
for (const file of html) {
  const content = fs.readFileSync(file.file, "utf8");
  for (const match of content.matchAll(/<script\b[^>]*\bsrc=["'](https?:\/\/[^"']+)["']/gi)) {
    externalScriptOrigins.add(new URL(match[1]).origin);
  }
}

const measurements = {
  fileCount: files.length,
  largestFileBytes: max(files),
  totalOutputBytes: sum(files),
  totalJavaScriptBytes: sum(javascript),
  largestJavaScriptBytes: max(javascript),
  totalCssBytes: sum(css),
  largestHtmlBytes: max(html),
  largestReactServerPayloadBytes: max(reactServerPayloads),
  largestImageBytes: max(images),
  totalFontBytes: sum(fonts),
  sourceMapFiles: sourceMaps.length,
  largestToolRouteJavaScriptBytes: max(toolRouteBundles),
  toolRouteBundles: toolRouteBundles.map(({ path: filePath, bytes }) => ({ path: filePath, bytes })),
  externalScriptOrigins: [...externalScriptOrigins],
};

const checks = [
  ["fileCount", measurements.fileCount, budgets.fileCount],
  ["largestFileBytes", measurements.largestFileBytes, budgets.largestFileBytes],
  ["totalOutputBytes", measurements.totalOutputBytes, budgets.totalOutputBytes],
  ["totalJavaScriptBytes", measurements.totalJavaScriptBytes, budgets.totalJavaScriptBytes],
  ["largestJavaScriptBytes", measurements.largestJavaScriptBytes, budgets.largestJavaScriptBytes],
  ["totalCssBytes", measurements.totalCssBytes, budgets.totalCssBytes],
  ["largestHtmlBytes", measurements.largestHtmlBytes, budgets.largestHtmlBytes],
  ["largestReactServerPayloadBytes", measurements.largestReactServerPayloadBytes, budgets.largestReactServerPayloadBytes],
  ["largestImageBytes", measurements.largestImageBytes, budgets.largestImageBytes],
  ["totalFontBytes", measurements.totalFontBytes, budgets.totalFontBytes],
  ["sourceMapFiles", measurements.sourceMapFiles, budgets.sourceMapFiles],
  ["toolRouteJavaScriptBytes", measurements.largestToolRouteJavaScriptBytes, budgets.toolRouteJavaScriptBytes],
].map(([name, actual, budget]) => ({ name, actual, budget, passed: actual <= budget }));
const failures = checks.filter((check) => !check.passed);
const report = {
  generatedAt: new Date().toISOString(),
  baselineNote: "Budgets use the measured pre-change export (4.06 GiB, 3.11 MB JS, 475,979 B CSS, 198,492 B largest JS) plus only bounded headroom for the required static tool routes.",
  budgets,
  measurements,
  checks,
  passed: failures.length === 0,
  failures,
};
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ passed: report.passed, checks: checks.length, failures, report: path.relative(root, reportPath) }, null, 2));
if (failures.length) process.exitCode = 1;
