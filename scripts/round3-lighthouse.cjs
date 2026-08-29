const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const baseUrl = process.env.LIGHTHOUSE_BASE_URL || "http://127.0.0.1:4173";
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const npmCli = process.env.npm_execpath;
const routes = [
  "/europa-umzug-ab-deutschland",
  "/umzug-mit-preisvorstellung",
  "/hilfe-in-schwierigen-lebenssituationen",
  "/kostenuebernahme-fuer-umzug-und-haushaltshilfe",
];
const modes = ["mobile", "desktop"];
const artifactsDir = path.join(root, "artifacts", "round3");
const temporaryDir = path.join(artifactsDir, ".lighthouse-release-candidate");
const outputPath = path.join(artifactsDir, "lighthouse-release-candidate.json");

if (!npmCli || !fs.existsSync(chromePath)) throw new Error("npm or Chrome is unavailable");
fs.mkdirSync(temporaryDir, { recursive: true });

const results = [];
for (const route of routes) {
  for (const mode of modes) {
    const slug = route.slice(1).replaceAll("/", "--");
    const rawPath = path.join(temporaryDir, `${slug}-${mode}.json`);
    const args = [
      npmCli, "exec", "--yes", "--package=lighthouse@12.8.2", "--", "lighthouse",
      `${baseUrl}${route}`, "--quiet", "--output=json", `--output-path=${rawPath}`,
      `--chrome-path=${chromePath}`,
      "--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage --disable-gpu",
      "--only-categories=performance,accessibility,best-practices,seo",
    ];
    if (mode === "desktop") args.push("--preset=desktop");
    console.log(`[round3-lighthouse] ${mode} ${route}`);
    const run = spawnSync(process.execPath, args, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 180_000,
    });
    if (!fs.existsSync(rawPath)) throw new Error(run.error?.message || run.stderr || `Lighthouse failed: ${route}`);
    const report = JSON.parse(fs.readFileSync(rawPath, "utf8"));
    const score = (id) => Math.round((report.categories[id]?.score || 0) * 100);
    const metric = (id) => report.audits[id]?.numericValue ?? null;
    results.push({
      route,
      mode,
      finalUrl: report.finalUrl,
      scores: {
        performance: score("performance"),
        accessibility: score("accessibility"),
        bestPractices: score("best-practices"),
        seo: score("seo"),
      },
      metrics: {
        firstContentfulPaintMs: metric("first-contentful-paint"),
        largestContentfulPaintMs: metric("largest-contentful-paint"),
        totalBlockingTimeMs: metric("total-blocking-time"),
        cumulativeLayoutShift: metric("cumulative-layout-shift"),
      },
    });
  }
}

const output = {
  generatedAt: new Date().toISOString(),
  lighthouseVersion: "12.8.2",
  baseUrl,
  methodology: "One release-candidate lab run per route and device profile with Lighthouse simulated throttling.",
  results,
};
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
const resolvedTemp = path.resolve(temporaryDir);
if (resolvedTemp.startsWith(`${path.resolve(artifactsDir)}${path.sep}`) && path.basename(resolvedTemp).startsWith(".lighthouse-")) {
  fs.rmSync(resolvedTemp, { recursive: true, force: true });
}
console.log(`Wrote ${path.relative(root, outputPath)}`);
