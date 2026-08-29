import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = (process.env.LIGHTHOUSE_BASE_URL || "http://127.0.0.1:4173").replace(/\/$/, "");
const outputDir = path.join(root, "artifacts", "lighthouse-production-2026-08-29-final");
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const lighthousePackage = "lighthouse@12.8.2";
const runsPerRoute = 3;
const concurrency = Math.max(1, Math.min(Number(process.env.LIGHTHOUSE_CONCURRENCY || 2), 3));

const routes = [
  { slug: "home", route: "/", label: "Startseite" },
  { slug: "duesseldorf", route: "/duesseldorf", label: "Düsseldorf Hub" },
  { slug: "duesseldorf-reinigung", route: "/duesseldorf/reinigung", label: "Düsseldorf Reinigung" },
  { slug: "duesseldorf-bueroreinigung", route: "/duesseldorf/bueroreinigung", label: "Düsseldorf Büroreinigung" },
  { slug: "regensburg", route: "/regensburg", label: "Regensburg Hub" },
  { slug: "regensburg-reinigung", route: "/regensburg/reinigung", label: "Regensburg Reinigung" },
  { slug: "regensburg-umzug", route: "/regensburg/umzug", label: "Regensburg Umzug" },
  { slug: "klaviertransport-regensburg", route: "/klaviertransport-regensburg", label: "Klaviertransport Regensburg" },
  {
    slug: "duesseldorf-praxisreinigung",
    route: "/duesseldorf/praxisreinigung",
    label: "Düsseldorf Praxisreinigung (Ersatz für nicht veröffentlichte Stadtteilseite)",
  },
  { slug: "reinigung-lappersdorf", route: "/reinigung-lappersdorf", label: "Ortsseite Lappersdorf" },
  {
    slug: "kontakt-bueroreinigung-duesseldorf",
    route: "/kontakt",
    label: "Anfrageformular",
  },
  { slug: "leistungsfinder", route: "/leistungsfinder", label: "KI-gestützter Leistungsfinder" },
  { slug: "dashboard", route: "/dashboard", label: "Dashboard" },
  { slug: "leerfahrt-rueckfahrt", route: "/leerfahrt-rueckfahrt", label: "Leerfahrt/Rückfahrt" },
];

const devices = ["mobile", "desktop"];

mkdirSync(outputDir, { recursive: true });

const jobs = routes.flatMap((route) =>
  devices.flatMap((device) =>
    Array.from({ length: runsPerRoute }, (_, index) => ({
      ...route,
      device,
      run: index + 1,
      outputPath: path.join(outputDir, `${route.slug}-${device}-run-${index + 1}.json`),
    })),
  ),
);

function isValidReport(file) {
  if (!existsSync(file)) return false;
  try {
    const report = JSON.parse(readFileSync(file, "utf8"));
    return Boolean(report?.lighthouseVersion && report?.categories?.performance);
  } catch {
    return false;
  }
}

function runJob(job) {
  if (isValidReport(job.outputPath)) {
    console.log(`SKIP ${job.slug} ${job.device} #${job.run}`);
    return Promise.resolve({ ...job, status: "SKIP", exitCode: 0 });
  }

  const args = [
    "--yes",
    lighthousePackage,
    `${baseUrl}${job.route}`,
    "--quiet",
    "--output=json",
    `--output-path=${job.outputPath}`,
    `--chrome-path=${chromePath}`,
    "--chrome-flags=--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage",
    "--only-categories=performance,accessibility,best-practices,seo",
    "--max-wait-for-load=60000",
  ];
  if (job.device === "desktop") args.push("--preset=desktop");

  console.log(`RUN  ${job.slug} ${job.device} #${job.run}`);
  return new Promise((resolve) => {
    const child = spawn("npx", args, {
      cwd: root,
      env: { ...process.env, NO_UPDATE_NOTIFIER: "1" },
      stdio: ["ignore", "pipe", "pipe"],
      shell: process.platform === "win32",
    });
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("error", (error) => resolve({ ...job, status: "FAIL", exitCode: -1, error: error.message }));
    child.on("close", (exitCode) => {
      const valid = isValidReport(job.outputPath);
      console.log(`${valid ? "DONE" : "FAIL"} ${job.slug} ${job.device} #${job.run}`);
      resolve({
        ...job,
        status: valid ? "PASS" : "FAIL",
        exitCode,
        error: valid ? "" : stderr.trim().slice(-2000),
      });
    });
  });
}

async function runQueue(items) {
  const results = [];
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const item = items[cursor++];
      results.push(await runJob(item));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
}

const results = await runQueue(jobs);
const failures = results.filter((result) => result.status === "FAIL");

function median(values) {
  const numbers = values.filter((value) => Number.isFinite(value)).sort((a, b) => a - b);
  if (!numbers.length) return null;
  return numbers[Math.floor(numbers.length / 2)];
}

function score(report, category) {
  const value = report.categories?.[category]?.score;
  return Number.isFinite(value) ? Math.round(value * 100) : null;
}

function numericAudit(report, id) {
  const value = report.audits?.[id]?.numericValue;
  return Number.isFinite(value) ? value : null;
}

function transferByType(report, resourceType) {
  const items = report.audits?.["network-requests"]?.details?.items || [];
  return items
    .filter((item) => item.resourceType === resourceType)
    .reduce((sum, item) => sum + (Number(item.transferSize) || 0), 0);
}

function thirdPartyTransfer(report) {
  const entities = report.audits?.["third-party-summary"]?.details?.items || [];
  return entities.reduce((sum, item) => sum + (Number(item.transferSize) || 0), 0);
}

const medians = routes.flatMap((route) => devices.map((device) => {
  const reports = Array.from({ length: runsPerRoute }, (_, index) =>
    path.join(outputDir, `${route.slug}-${device}-run-${index + 1}.json`),
  ).filter(isValidReport).map((file) => JSON.parse(readFileSync(file, "utf8")));

  return {
    label: route.label,
    route: route.route,
    device,
    successfulRuns: reports.length,
    performance: median(reports.map((report) => score(report, "performance"))),
    accessibility: median(reports.map((report) => score(report, "accessibility"))),
    bestPractices: median(reports.map((report) => score(report, "best-practices"))),
    seo: median(reports.map((report) => score(report, "seo"))),
    lcpMs: median(reports.map((report) => numericAudit(report, "largest-contentful-paint"))),
    cls: median(reports.map((report) => numericAudit(report, "cumulative-layout-shift"))),
    inpMs: median(reports.map((report) =>
      numericAudit(report, "interaction-to-next-paint") ?? numericAudit(report, "experimental-interaction-to-next-paint"),
    )),
    htmlTransferBytes: median(reports.map((report) => transferByType(report, "Document"))),
    scriptTransferBytes: median(reports.map((report) => transferByType(report, "Script"))),
    thirdPartyTransferBytes: median(reports.map(thirdPartyTransfer)),
  };
}));

const summary = {
  generatedAt: new Date().toISOString(),
  lighthouseVersion: medians.length && isValidReport(jobs[0].outputPath)
    ? JSON.parse(readFileSync(jobs[0].outputPath, "utf8")).lighthouseVersion
    : null,
  baseUrl,
  chromePath,
  runsPerRoute,
  devices,
  routes,
  totalExpectedRuns: jobs.length,
  successfulRuns: jobs.length - failures.length,
  failedRuns: failures.map(({ slug, route, device, run, exitCode, error }) => ({ slug, route, device, run, exitCode, error })),
  medians,
  notes: [
    "INP ist in einer Lighthouse-Navigation ohne echte Nutzerinteraktion in der Regel nicht verfügbar; null wird nicht als Messwert ausgegeben.",
    "Scores und Lab-Metriken sind unabhängige Mediane aus drei Production-Build-Läufen je Route und Geräteprofil.",
    "Die Düsseldorfer Ersatzroute ist keine Stadtteilseite; es wurde mangels freigegebener Tier-A-Stadtteilseite keine neue dünne URL erzeugt.",
  ],
};

writeFileSync(path.join(outputDir, "summary.json"), JSON.stringify(summary, null, 2));

const kb = (value) => Number.isFinite(value) ? (value / 1024).toFixed(1) : "–";
const number = (value, digits = 0) => Number.isFinite(value) ? Number(value).toFixed(digits) : "–";
const rows = medians.map((item) =>
  `| ${item.route} | ${item.device} | ${item.successfulRuns}/3 | ${item.performance ?? "–"} | ${item.accessibility ?? "–"} | ${item.bestPractices ?? "–"} | ${item.seo ?? "–"} | ${number(item.lcpMs)} | ${number(item.cls, 3)} | ${number(item.inpMs)} | ${kb(item.htmlTransferBytes)} | ${kb(item.scriptTransferBytes)} | ${kb(item.thirdPartyTransferBytes)} |`,
).join("\n");

const markdown = `# Lighthouse Production Median Report — 2026-08-29

Generated: ${summary.generatedAt}

- Lighthouse: ${summary.lighthouseVersion || "unbekannt"}
- Production-Build: ${baseUrl}
- Läufe: ${summary.successfulRuns}/${summary.totalExpectedRuns} erfolgreich
- Median: drei Läufe pro Route und Geräteprofil

| Route | Profil | Läufe | Perf | A11y | Best | SEO | LCP ms | CLS | INP ms | HTML KB | JS KB | 3rd-party KB |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rows}

## Hinweise

- INP wird bei einer Lighthouse-Navigation ohne echte Nutzerinteraktion meist nicht erhoben; „–“ ist kein behaupteter Messwert.
- Die Werte sind unabhängige Mediane der Rohberichte. Alle JSON-Läufe liegen in diesem Ordner.
- Für Düsseldorf existiert noch keine qualitätsgeprüfte, indexierbare Stadtteilseite. Daher wurde transparent /duesseldorf/praxisreinigung als lokale Ersatzroute gemessen.
${failures.length ? `\n## Fehlgeschlagene Läufe\n\n${failures.map((item) => `- ${item.route} ${item.device} #${item.run}: ${item.error || `Exit ${item.exitCode}`}`).join("\n")}\n` : ""}
`;

writeFileSync(path.join(outputDir, "README.md"), markdown);
console.log(`SUMMARY ${summary.successfulRuns}/${summary.totalExpectedRuns} successful`);
console.log(path.join(outputDir, "README.md"));
process.exit(failures.length ? 1 : 0);
