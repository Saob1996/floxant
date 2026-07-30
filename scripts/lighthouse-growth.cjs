const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const label = process.argv[2];
const allowedLabels = new Set(["baseline", "after", "release-candidate"]);
const baseUrl = process.env.LIGHTHOUSE_BASE_URL || "http://127.0.0.1:4173";
const runsPerRoute = Number(
  process.env.LIGHTHOUSE_RUNS_PER_ROUTE || (label === "release-candidate" ? 3 : 1),
);
const chromePath =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

if (!allowedLabels.has(label)) {
  console.error("Usage: node scripts/lighthouse-growth.cjs <baseline|after|release-candidate>");
  process.exit(1);
}
if (!Number.isInteger(runsPerRoute) || runsPerRoute < 1) {
  console.error("LIGHTHOUSE_RUNS_PER_ROUTE must be a positive integer.");
  process.exit(1);
}

if (!fs.existsSync(chromePath)) {
  console.error(`Chrome not found: ${chromePath}`);
  process.exit(1);
}

const routes = [
  "/",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/fensterreinigung",
  "/regensburg/umzug",
  "/regensburg/entruempelung",
  "/regensburg/wohnungsaufloesung",
  "/klaviertransport-regensburg",
  "/reinigungsfirma-angebot",
];

const modes = ["mobile", "desktop"];
const artifactsDir = path.join(root, "artifacts");
const temporaryDir = path.join(artifactsDir, `.lighthouse-${label}`);
const outputPath = path.join(
  artifactsDir,
  label === "release-candidate"
    ? "lighthouse-release-candidate.json"
    : `lighthouse-${label}-2026-07-30.json`,
);

fs.mkdirSync(temporaryDir, { recursive: true });

function metric(audits, id) {
  const audit = audits[id];
  if (!audit || typeof audit.numericValue !== "number") return null;
  return {
    value: audit.numericValue,
    unit: audit.numericUnit || null,
    displayValue: audit.displayValue || null,
  };
}

function round(value, digits = 2) {
  const power = 10 ** digits;
  return Math.round(value * power) / power;
}

function average(values) {
  const usable = values.filter((value) => typeof value === "number");
  if (!usable.length) return null;
  return round(usable.reduce((sum, value) => sum + value, 0) / usable.length);
}

function percentile(values, p) {
  const usable = values
    .filter((value) => typeof value === "number")
    .sort((a, b) => a - b);
  if (!usable.length) return null;
  return round(usable[Math.ceil(p * usable.length) - 1]);
}

function median(values) {
  const usable = values
    .filter((value) => typeof value === "number")
    .sort((a, b) => a - b);
  if (!usable.length) return null;
  const middle = Math.floor(usable.length / 2);
  return round(
    usable.length % 2
      ? usable[middle]
      : (usable[middle - 1] + usable[middle]) / 2,
  );
}

function lcpElement(audits) {
  const legacy = audits["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node;
  if (legacy) {
    return {
      selector: legacy.selector || null,
      snippet: legacy.snippet || null,
      nodeLabel: legacy.nodeLabel || null,
    };
  }
  const insightItems = audits["lcp-discovery-insight"]?.details?.items || [];
  const node = insightItems
    .flatMap((item) => item.items || [item])
    .find((item) => item?.node)?.node;
  return node
    ? {
        selector: node.selector || null,
        snippet: node.snippet || null,
        nodeLabel: node.nodeLabel || null,
      }
    : null;
}

const results = [];

for (const mode of modes) {
  for (const route of routes) {
    for (let runNumber = 1; runNumber <= runsPerRoute; runNumber += 1) {
      const slug = route === "/" ? "home" : route.slice(1).replace(/\//g, "--");
      const rawPath = path.join(temporaryDir, `${mode}--${slug}--${runNumber}.json`);
      const url = `${baseUrl}${route}`;
      const lighthouseArgs = [
        url,
        "--quiet",
        "--output=json",
        `--output-path=${rawPath}`,
        `--chrome-path=${chromePath}`,
        "--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage",
        "--only-categories=performance,accessibility,best-practices,seo",
      ];

      if (mode === "desktop") lighthouseArgs.push("--preset=desktop");

      console.log(`[${label}] ${mode} ${route} run ${runNumber}/${runsPerRoute}`);
      const npmCli = process.env.npm_execpath;
      if (!npmCli) {
        console.error("npm_execpath is unavailable; run this script through npm.");
        process.exit(1);
      }
      const run = spawnSync(
        process.execPath,
        [
          npmCli,
          "exec",
          "--yes",
          "--package=lighthouse@12.8.2",
          "--",
          "lighthouse",
          ...lighthouseArgs,
        ],
        {
          cwd: root,
          encoding: "utf8",
          env: process.env,
          stdio: ["ignore", "pipe", "pipe"],
          timeout: 180_000,
        },
      );

      if (!fs.existsSync(rawPath)) {
        console.error(
          run.error?.stack ||
            run.stderr ||
            run.stdout ||
            `Lighthouse failed for ${url}`,
        );
        process.exit(run.status || 1);
      }
      if (run.status !== 0) {
        const cleanupWarning = `${run.stderr || run.stdout}`.trim();
        console.warn(
          `Lighthouse returned ${run.status} after writing a valid report for ${url}` +
            (cleanupWarning ? `: ${cleanupWarning.split(/\r?\n/, 1)[0]}` : ""),
        );
      }

      const report = JSON.parse(fs.readFileSync(rawPath, "utf8"));
      const categories = report.categories;
      const audits = report.audits;
      results.push({
        route,
        mode,
        run: runNumber,
        finalUrl: report.finalUrl,
        fetchTime: report.fetchTime,
        scores: {
          performance: Math.round(categories.performance.score * 100),
          accessibility: Math.round(categories.accessibility.score * 100),
          bestPractices: Math.round(categories["best-practices"].score * 100),
          seo: Math.round(categories.seo.score * 100),
        },
        metrics: {
          firstContentfulPaint: metric(audits, "first-contentful-paint"),
          largestContentfulPaint: metric(audits, "largest-contentful-paint"),
          totalBlockingTime: metric(audits, "total-blocking-time"),
          cumulativeLayoutShift: metric(audits, "cumulative-layout-shift"),
          interactionToNextPaint: metric(audits, "interaction-to-next-paint"),
          speedIndex: metric(audits, "speed-index"),
        },
        lcpElement: lcpElement(audits),
        transferSize: metric(audits, "total-byte-weight"),
      });
    }
  }
}

function summarizeRoute(route, mode) {
  const subset = results.filter((result) => result.route === route && result.mode === mode);
  return {
    route,
    mode,
    runs: subset.length,
    medianScores: {
      performance: median(subset.map((item) => item.scores.performance)),
      accessibility: median(subset.map((item) => item.scores.accessibility)),
      bestPractices: median(subset.map((item) => item.scores.bestPractices)),
      seo: median(subset.map((item) => item.scores.seo)),
    },
    medianMetrics: {
      largestContentfulPaintMs: median(
        subset.map((item) => item.metrics.largestContentfulPaint?.value),
      ),
      totalBlockingTimeMs: median(
        subset.map((item) => item.metrics.totalBlockingTime?.value),
      ),
      cumulativeLayoutShift: median(
        subset.map((item) => item.metrics.cumulativeLayoutShift?.value),
      ),
    },
    lcpElements: Array.from(
      new Map(
        subset
          .filter((item) => item.lcpElement)
          .map((item) => [JSON.stringify(item.lcpElement), item.lcpElement]),
      ).values(),
    ),
  };
}

function summarize(mode) {
  const subset = results.filter((result) => result.mode === mode);
  const routeMedians = routes.map((route) => summarizeRoute(route, mode));
  const values = (selector) => subset.map(selector);
  return {
    routes: routeMedians.length,
    runs: subset.length,
    medianScores: {
      performance: median(routeMedians.map((item) => item.medianScores.performance)),
      accessibility: median(routeMedians.map((item) => item.medianScores.accessibility)),
      bestPractices: median(routeMedians.map((item) => item.medianScores.bestPractices)),
      seo: median(routeMedians.map((item) => item.medianScores.seo)),
    },
    averageScores: {
      performance: average(values((item) => item.scores.performance)),
      accessibility: average(values((item) => item.scores.accessibility)),
      bestPractices: average(values((item) => item.scores.bestPractices)),
      seo: average(values((item) => item.scores.seo)),
    },
    p75Metrics: {
      largestContentfulPaintMs: percentile(
        routeMedians.map((item) => item.medianMetrics.largestContentfulPaintMs),
        0.75,
      ),
      totalBlockingTimeMs: percentile(
        routeMedians.map((item) => item.medianMetrics.totalBlockingTimeMs),
        0.75,
      ),
      cumulativeLayoutShift: percentile(
        routeMedians.map((item) => item.medianMetrics.cumulativeLayoutShift),
        0.75,
      ),
    },
    maximumMetrics: {
      largestContentfulPaintMs: Math.max(
        ...routeMedians.map((item) => item.medianMetrics.largestContentfulPaintMs),
      ),
      totalBlockingTimeMs: Math.max(
        ...routeMedians.map((item) => item.medianMetrics.totalBlockingTimeMs),
      ),
      cumulativeLayoutShift: Math.max(
        ...routeMedians.map((item) => item.medianMetrics.cumulativeLayoutShift),
      ),
    },
    routeMedians,
  };
}

const output = {
  schemaVersion: 1,
  label,
  generatedAt: new Date().toISOString(),
  baseUrl,
  lighthouseVersion: "12.8.2",
  chromePath,
  runsPerRoute,
  methodology: {
    routes,
    modes,
    network: "Lighthouse default simulated throttling",
    note: "Local lab measurements; INP requires field or interactive user data and may be null.",
  },
  summary: {
    mobile: summarize("mobile"),
    desktop: summarize("desktop"),
  },
  results,
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
fs.rmSync(temporaryDir, { recursive: true, force: true });
console.log(`Wrote ${path.relative(root, outputPath)}`);
