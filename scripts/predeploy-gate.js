const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = process.cwd();
const expectedBranch = "feat/authority-revenue-operations-2026";
const sourceBranch = "feat/market-moat-conversion-2026";
const outDir = path.join(root, "out");
const reportPath = path.join(root, "artifacts", "predeploy-gate.json");
const failures = [];

function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function readJson(relativePath, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
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

function htmlPath(route) {
  if (route === "/") return path.join(outDir, "index.html");
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  const flat = path.join(outDir, `${clean}.html`);
  return fs.existsSync(flat) ? flat : path.join(outDir, clean, "index.html");
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

const branch = git(["branch", "--show-current"]);
check(branch === expectedBranch, `Branch ist ${branch || "unbekannt"}, erwartet ${expectedBranch}.`);

const stagedNames = git(["diff", "--cached", "--name-only"]).split(/\r?\n/).filter(Boolean);
const branchNames = git(["diff", "--name-only", `${sourceBranch}...HEAD`]).split(/\r?\n/).filter(Boolean);
const changedNames = [...new Set([...branchNames, ...stagedNames])];
check(!stagedNames.some((file) => /(^|\/)\.env(?:\.|$)/i.test(file)), ".env-Datei ist gestagt.");
check(!branchNames.some((file) => /(^|\/)\.env(?:\.|$)/i.test(file)), ".env-Datei befindet sich im Branch-Diff.");
check(!changedNames.some((file) => /^data\/private\/search-console\//i.test(file) || /^data\/(?:gsc|gsc-exports)\//i.test(file)), "Private Search-Console-Rohdaten befinden sich im Branch-Diff.");
check(!changedNames.some((file) => /(?:fixtures?|test-data).*customer|data\/bookings\.json/i.test(file)), "Mögliche Testkundendaten befinden sich im Branch-Diff.");

const committedDiff = git(["diff", "--unified=0", `${sourceBranch}...HEAD`]);
const stagedDiff = git(["diff", "--cached", "--unified=0"]);
const inspectedDiff = `${committedDiff}\n${stagedDiff}`;
const secretPatterns = [
  /\bsb_secret_[a-zA-Z0-9_-]{16,}\b/,
  /\bre_[a-zA-Z0-9_-]{20,}\b/,
  /SUPABASE_SERVICE_ROLE_KEY\s*[:=]\s*["'](?!test-only-)[^"'$<{\s][^"']{9,}["']/,
  /RESEND_API_KEY\s*[:=]\s*["'](?!test-only-)[^"'$<{\s][^"']{9,}["']/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
];
check(!secretPatterns.some((pattern) => pattern.test(inspectedDiff)), "Mögliches Secret im Branch- oder Stage-Diff gefunden.");
check(!/(?:supabase\s+db\s+push|supabase\s+migration\s+up|psql\s+[^\n]*20260718090000)/i.test(inspectedDiff), "Hinweis auf automatische Ausführung der neuen SQL-Migration gefunden.");

const nextConfig = fs.existsSync(path.join(root, "next.config.js")) ? fs.readFileSync(path.join(root, "next.config.js"), "utf8") : "";
check(/output\s*:\s*["']export["']/.test(nextConfig), "Next.js output: export fehlt.");
check(/unoptimized\s*:\s*true/.test(nextConfig), "images.unoptimized: true fehlt.");
check(fs.existsSync(outDir), "out/ fehlt; Build wurde nicht nachgewiesen.");
check(fs.existsSync(path.join(root, ".next", "BUILD_ID")), ".next/BUILD_ID fehlt; Build wurde nicht nachgewiesen.");

const cloudflare = readJson("artifacts/cloudflare-pages-audit.json");
check(Boolean(cloudflare), "Cloudflare-Pages-Audit fehlt.");
if (cloudflare) {
  const cloudflareFailureCount = Object.values(cloudflare.failures || {}).reduce((sum, value) => sum + (Array.isArray(value) ? value.length : Number(Boolean(value))), 0);
  check(cloudflareFailureCount === 0, `Cloudflare-Pages-Audit enthält ${cloudflareFailureCount} Fehler.`);
  check(cloudflare.limits.fileCount < cloudflare.limits.fileCountLimit, "Cloudflare-Dateilimit überschritten.");
  check(cloudflare.limits.largestFileBytes <= 25 * 1024 * 1024, "Mindestens eine Exportdatei ist größer als 25 MiB.");
  check(cloudflare.counts.brokenLinks === 0, "Defekte interne Links gefunden.");
  check(cloudflare.counts.missingImages === 0, "Fehlende Bilder gefunden.");
  check(cloudflare.counts.redirectChains === 0, "Redirect-Ketten gefunden.");
  check(cloudflare.counts.noindexSitemapPages === 0, "Noindex-Seite in Sitemap gefunden.");
}

const sitemapPath = path.join(outDir, "sitemap.xml");
const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
check(sitemapUrls.length === 394, `Sitemap enthält ${sitemapUrls.length} statt der geprüften 394 URLs.`);
check(!sitemapUrls.some((url) => /\/dashboard(?:\/|$)/.test(url)), "Dashboard-Route steht in sitemap.xml.");
check(sitemapUrls.every((url) => url.startsWith("https://www.floxant.de")), "Sitemap enthält eine fremde Canonical-Domain.");

let pagesDevCanonicals = 0;
let missingStaticPages = 0;
for (const value of sitemapUrls) {
  const route = new URL(value).pathname || "/";
  const file = htmlPath(route);
  if (!fs.existsSync(file)) {
    missingStaticPages += 1;
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  if (/<link[^>]+rel=["']canonical["'][^>]+href=["']https?:\/\/[^"']*pages\.dev/i.test(html)) pagesDevCanonicals += 1;
}
check(missingStaticPages === 0, `${missingStaticPages} Sitemap-Seiten fehlen im statischen Export.`);
check(pagesDevCanonicals === 0, `${pagesDevCanonicals} Canonicals zeigen auf pages.dev.`);

for (const route of ["/dashboard", "/dashboard/login"]) {
  const file = htmlPath(route);
  check(fs.existsSync(file), `${route} fehlt im statischen Export.`);
  if (fs.existsSync(file)) {
    const html = fs.readFileSync(file, "utf8");
    check(/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex[^"']*nofollow/i.test(html), `${route} enthält nicht noindex und nofollow.`);
  }
}

const prerender = readJson(".next/prerender-manifest.json", { routes: {}, dynamicRoutes: {} });
const appRoutes = readJson(".next/app-path-routes-manifest.json", {});
const prerenderedRoutes = Object.keys(prerender.routes || {});
const isrRoutes = Object.values(prerender.routes || {}).filter((route) => route.initialRevalidateSeconds !== false);
const fallbackRoutes = Object.values(prerender.dynamicRoutes || {}).filter((route) => route.fallback !== false);
const prerendered = new Set([...prerenderedRoutes, ...Object.keys(prerender.dynamicRoutes || {})]);
const dynamicRoutes = [...new Set(Object.values(appRoutes))].filter((route) => !route.startsWith("/_") && !prerendered.has(route) && !["/seo-gone", "/umzug-duesseldorf"].includes(route));
check(isrRoutes.length === 0, `${isrRoutes.length} ISR-Routen gefunden.`);
check(fallbackRoutes.length === 0, `${fallbackRoutes.length} dynamische Fallback-Routen gefunden.`);
check(dynamicRoutes.length === 0, `${dynamicRoutes.length} Next.js Serverless Functions/dynamische Routen gefunden.`);

const middlewareManifest = readJson(".next/server/middleware-manifest.json", { middleware: {}, functions: {} });
const middlewareCount = Object.keys(middlewareManifest.middleware || {}).length;
check(middlewareCount === 0, `${middlewareCount} Middleware-Einträge gefunden.`);

const functionFiles = walk(path.join(root, "functions")).filter((file) => /\.(?:js|mjs|ts)$/.test(file) && !file.includes(`${path.sep}_lib${path.sep}`));
const migrationFiles = branchNames.filter((file) => /^supabase\/migrations\/.*\.sql$/i.test(file));
const outFiles = walk(outDir);
const browserTextFiles = outFiles.filter((file) => /\.js$/.test(file));
const envSecretValues = [process.env.SUPABASE_SERVICE_ROLE_KEY, process.env.RESEND_API_KEY].filter((value) => typeof value === "string" && value.length >= 12);
let browserSecretMatches = 0;
for (const file of browserTextFiles) {
  const source = fs.readFileSync(file, "utf8");
  if (/\bsb_secret_[a-zA-Z0-9_-]{16,}\b/.test(source) || envSecretValues.some((value) => source.includes(value))) browserSecretMatches += 1;
}
check(browserSecretMatches === 0, `Secret-Muster in ${browserSecretMatches} Browser-Build-Datei(en) gefunden.`);

const report = {
  generatedAt: new Date().toISOString(),
  branch,
  sourceBranch,
  status: failures.length ? "FAIL" : "PASS",
  counts: {
    changedFiles: branchNames.length,
    stagedFiles: stagedNames.length,
    sitemapUrls: sitemapUrls.length,
    staticRoutes: prerenderedRoutes.length,
    isrRoutes: isrRoutes.length,
    nextServerlessFunctions: dynamicRoutes.length,
    cloudflarePagesFunctions: functionFiles.length,
    middleware: middlewareCount,
    browserSecretMatches,
    newMigrationFiles: migrationFiles.length,
    executedMigrations: 0,
    brokenLinks: cloudflare?.counts?.brokenLinks ?? null,
    missingImages: cloudflare?.counts?.missingImages ?? null,
    redirectChains: cloudflare?.counts?.redirectChains ?? null,
    outputFiles: outFiles.length,
    outputBytes: cloudflare?.limits?.totalBytes ?? null,
  },
  failures,
  notes: [
    "Das Gate führt keinen Deploy und keine Migration aus.",
    "SQL-Dateien werden nur gezählt; ausgeführte Migrationen sind in dieser Arbeitsphase 0.",
    "Private Search-Console-Rohdaten und lokale .env-Dateien werden nicht in den Branch-Diff aufgenommen.",
  ],
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
if (failures.length) {
  console.error(`Pre-Deployment-Gate fehlgeschlagen: ${failures.length} Problem(e).`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`Pre-Deployment-Gate erfolgreich: ${sitemapUrls.length} Sitemap-Seiten, ${prerenderedRoutes.length} statische Routen, 0 ISR, 0 Next.js Functions, 0 Middleware.`);
  console.log(`Cloudflare Pages Functions: ${functionFiles.length}; Migrationen ausgeführt: 0.`);
}
