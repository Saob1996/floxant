#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputPath = path.resolve(root, process.argv[2] || "artifacts/vercel-hobby-build-audit.json");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function walkFiles(directory, files = []) {
  if (!fs.existsSync(directory)) return files;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walkFiles(absolute, files);
    else files.push(absolute);
  }
  return files;
}

function sumBytes(directory) {
  return walkFiles(directory).reduce((total, file) => total + fs.statSync(file).size, 0);
}

function isPrivateOrInternal(route) {
  return /^(?:\/_|\/api(?:\/|$)|\/admin(?:\/|$)|\/dashboard(?:\/|$)|\/login(?:\/|$))/.test(route);
}

function isRetirementHandler(route) {
  return route === "/seo-gone" || route === "/umzug-duesseldorf";
}

for (const required of [".next/app-path-routes-manifest.json", ".next/prerender-manifest.json"]) {
  if (!fs.existsSync(path.join(root, required))) {
    console.error(`Missing ${required}. Run npm run build first.`);
    process.exit(2);
  }
}

const appPathRoutes = readJson(".next/app-path-routes-manifest.json");
const prerender = readJson(".next/prerender-manifest.json");
const functionConfig = fs.existsSync(path.join(root, ".next/server/functions-config-manifest.json"))
  ? readJson(".next/server/functions-config-manifest.json")
  : { functions: {} };

const prerenderedRoutes = Object.keys(prerender.routes || {});
const prerenderedPatterns = Object.entries(prerender.dynamicRoutes || {}).map(([route, value]) => ({
  route,
  fallback: value.fallback,
}));
const isrRoutes = Object.entries(prerender.routes || {})
  .filter(([, value]) => value.initialRevalidateSeconds !== false)
  .map(([route, value]) => ({ route, initialRevalidateSeconds: value.initialRevalidateSeconds }));
const fallbackPatterns = prerenderedPatterns.filter((item) => item.fallback !== false);
const prerenderedPatternSet = new Set(prerenderedPatterns.map((item) => item.route));
const prerenderedRouteSet = new Set(prerenderedRoutes);
const appRoutes = [...new Set(Object.values(appPathRoutes))].sort();
const dynamicRoutes = appRoutes.filter(
  (route) => !prerenderedRouteSet.has(route) && !prerenderedPatternSet.has(route) && !route.startsWith("/_"),
);
const publicDynamicPages = dynamicRoutes.filter(
  (route) => !isPrivateOrInternal(route) && !isRetirementHandler(route),
);
const functions = [
  ...dynamicRoutes,
  ...(Object.keys(functionConfig.functions || {}).includes("/_middleware") ? ["/_middleware"] : []),
];

const nextConfigSource = fs.readFileSync(path.join(root, "next.config.js"), "utf8");
const proxySource = fs.existsSync(path.join(root, "proxy.ts"))
  ? fs.readFileSync(path.join(root, "proxy.ts"), "utf8")
  : "";
const sourceFiles = [
  ...walkFiles(path.join(root, "app")),
  ...walkFiles(path.join(root, "components")),
  ...walkFiles(path.join(root, "lib")),
].filter((file) => /\.(?:ts|tsx|js|jsx|mjs|cjs)$/.test(file));
const sourceFindings = [];

for (const file of sourceFiles) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  const source = fs.readFileSync(file, "utf8");
  const isPublicPage = /^app\/(?!api\/|admin\/|dashboard\/|login\/).*\/page\.(?:ts|tsx|js|jsx)$/.test(relative)
    || relative === "app/page.tsx";
  if (!isPublicPage) continue;

  const checks = [
    ["revalidate", /\bexport\s+const\s+revalidate\b|\brevalidate\s*=/],
    ["force-dynamic", /\bforce-dynamic\b/],
    ["request cookies", /\bcookies\s*\(/],
    ["request headers", /\bheaders\s*\(/],
    ["no-store", /\bno-store\b/],
    ["request searchParams", /\bsearchParams\b/],
  ];
  for (const [kind, pattern] of checks) {
    if (pattern.test(source)) sourceFindings.push({ routeFile: relative, kind });
  }
}

const publicAssets = walkFiles(path.join(root, "public"))
  .map((file) => ({
    path: path.relative(root, file).replaceAll("\\", "/"),
    bytes: fs.statSync(file).size,
  }))
  .sort((a, b) => b.bytes - a.bytes);

const staticOutputBytes = sumBytes(path.join(root, ".next/server/app"))
  + sumBytes(path.join(root, ".next/static"))
  + sumBytes(path.join(root, "public"));
const broadProxyMatcher = proxySource.includes('"/((?!_next|api|favicon.ico|.*\\\\..*).*)"');

const checks = {
  noIsr: isrRoutes.length === 0,
  noDynamicPublicPages: publicDynamicPages.length === 0,
  noDynamicFallbacks: fallbackPatterns.length === 0,
  publicSourceIsRequestIndependent: sourceFindings.length === 0,
  imageOptimizationDisabled: /unoptimized\s*:\s*true/.test(nextConfigSource),
  proxyNotGlobal: !broadProxyMatcher,
  noVercelAnalyticsPackages: !/@vercel\/(?:analytics|speed-insights)/.test(
    fs.readFileSync(path.join(root, "package.json"), "utf8"),
  ),
};

const result = {
  generatedAt: new Date().toISOString(),
  checks,
  counts: {
    prerenderedRoutes: prerenderedRoutes.length,
    prerenderedPatterns: prerenderedPatterns.length,
    isrRoutes: isrRoutes.length,
    dynamicRoutes: dynamicRoutes.length,
    publicDynamicPages: publicDynamicPages.length,
    functions: functions.length,
    publicAssets: publicAssets.length,
  },
  estimatedNormalPublicPage: {
    isrReads: 0,
    functionInvocations: checks.noDynamicPublicPages && checks.proxyNotGlobal ? 0 : "review-required",
  },
  staticOutputBytes,
  isrRoutes,
  fallbackPatterns,
  dynamicRoutes,
  publicDynamicPages,
  functions,
  sourceFindings,
  largestAssets: publicAssets.slice(0, 20),
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);

const failedChecks = Object.entries(checks).filter(([, passed]) => !passed).map(([name]) => name);
console.log(`Static routes: ${result.counts.prerenderedRoutes}`);
console.log(`Dynamic routes: ${result.counts.dynamicRoutes}`);
console.log(`Public dynamic pages: ${result.counts.publicDynamicPages}`);
console.log(`Functions incl. proxy: ${result.counts.functions}`);
console.log(`ISR routes: ${result.counts.isrRoutes}`);
console.log(`Static output: ${(staticOutputBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`Audit: ${failedChecks.length ? `FAIL (${failedChecks.join(", ")})` : "PASS"}`);
console.log(`Report: ${path.relative(root, outputPath)}`);
process.exit(failedChecks.length ? 1 : 0);
