#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "app");
const PUBLIC_BASE_URL = "https://www.floxant.de";
const DEFAULT_PORT = Number(process.env.CHECK_PORT || 4317);

const PRIVATE_SEGMENTS = new Set(["api", "dashboard", "admin", "login"]);
const LEGACY_REDIRECT_ROUTES = new Set(["/villenservice"]);
const TEXT_EXTENSIONS = new Set([".tsx", ".ts", ".jsx", ".js", ".json", ".md"]);
const SOURCE_ROOTS = ["app", "components", "lib"];
const STATIC_METADATA_ROUTES = ["/robots.txt"];
const DOMINANCE_MONEY_ROUTES = [
  "/",
  "/rechner",
  "/umzug",
  "/reinigung",
  "/entruempelung",
  "/bueroumzug",
  "/firmenentsorgung",
  "/leerfahrt-rueckfahrt",
  "/private-client-service",
  "/service-area-bayern",
  "/einsatzgebiet-regensburg-200km",
];
const IMPORTANT_ROUTES = [
  "/",
  "/rechner",
  "/umzug",
  "/reinigung",
  "/entruempelung",
  "/service-area-bayern",
  "/blog",
  "/floxant-fakten",
  "/llms.txt",
  "/sitemap.xml",
  "/robots.txt",
];

const REDIRECT_EXPECTATIONS = [
  ["/de", "/"],
  ["/de/umzug", "/umzug"],
  ["/entr%C3%BCmpelung", "/entruempelung"],
  ["/entr%C3%BCmpelung-regensburg", "/entruempelung-regensburg"],
  ["/umzug-n%C3%BCrnberg", "/umzug-nuernberg"],
  ["/reinigung-n%C3%BCrnberg", "/reinigung-nuernberg"],
  ["/entr%C3%BCmpelung-n%C3%BCrnberg", "/entruempelung-nuernberg"],
  ["/umzug-m%C3%BCnchen", "/umzug-muenchen"],
  ["/reinigung-m%C3%BCnchen", "/reinigung-muenchen"],
  ["/entr%C3%BCmpelung-m%C3%BCnchen", "/entruempelung-muenchen"],
  ["/villenservice", "/private-client-service"],
  ["/signature/clean-start", "/clean-start"],
];

function isPrivateSegment(segment) {
  return (
    PRIVATE_SEGMENTS.has(segment) ||
    segment.startsWith("_") ||
    segment.startsWith("[") ||
    segment.startsWith("(")
  );
}

function isNonRoutableSegment(segment) {
  return segment.startsWith("_") || segment.startsWith("[") || segment.startsWith("(");
}

function routeFromSegments(segments) {
  const publicSegments = segments.filter((segment) => !segment.startsWith("(") && !segment.endsWith(")"));
  const route = `/${publicSegments.join("/")}`;
  return route === "/" ? "/" : route.replace(/\/$/, "");
}

function discoverRoutes({ includePrivate = false } = {}) {
  const routes = new Set(["/"]);

  function walk(directory, segments = []) {
    if (!fs.existsSync(directory)) return;

    const entries = fs.readdirSync(directory, { withFileTypes: true });
    const hasPage = entries.some((entry) => entry.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(entry.name));
    const hasRoute = entries.some((entry) => entry.isFile() && /^route\.(tsx|ts|jsx|js)$/.test(entry.name));

    if (hasPage || hasRoute) {
      const route = routeFromSegments(segments);
      if (!LEGACY_REDIRECT_ROUTES.has(route)) routes.add(route);
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (includePrivate ? isNonRoutableSegment(entry.name) : isPrivateSegment(entry.name)) continue;
      walk(path.join(directory, entry.name), [...segments, entry.name]);
    }
  }

  walk(APP_DIR);

  for (const route of STATIC_METADATA_ROUTES) {
    routes.add(route);
  }

  return routes;
}

function walkFiles(directory, files = []) {
  if (!fs.existsSync(directory)) return files;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (["node_modules", ".next", "out", ".git"].includes(entry.name)) continue;

    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, files);
      continue;
    }

    if (TEXT_EXTENSIONS.has(path.extname(entry.name)) && entry.name !== "package-lock.json") {
      files.push(fullPath);
    }
  }

  return files;
}

function sourceFiles() {
  return SOURCE_ROOTS.flatMap((root) => walkFiles(path.join(ROOT, root)));
}

function lineForIndex(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function normalizeInternalUrl(value) {
  if (!value) return null;
  if (value.startsWith("mailto:") || value.startsWith("tel:") || value.startsWith("whatsapp:")) return null;
  if (value.startsWith("http") && !value.startsWith(PUBLIC_BASE_URL)) return null;

  const withoutOrigin = value.startsWith(PUBLIC_BASE_URL) ? value.slice(PUBLIC_BASE_URL.length) || "/" : value;
  if (!withoutOrigin.startsWith("/")) return null;
  if (withoutOrigin.startsWith("/api/")) return null;

  return withoutOrigin.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
}

function hasNonAscii(value) {
  return [...value].some((char) => char.charCodeAt(0) > 127);
}

function runLinkCheck() {
  const routes = discoverRoutes({ includePrivate: true });
  const files = sourceFiles();
  const missing = [];
  const nonAscii = [];
  const legacyLocaleLinks = [];
  const hrefRegexes = [
    /href\s*=\s*["']([^"']+)["']/g,
    /href\s*:\s*["']([^"']+)["']/g,
    /url\s*:\s*["']([^"']+)["']/g,
    /item\s*:\s*["']([^"']+)["']/g,
    /path\s*:\s*["']([^"']+)["']/g,
  ];

  for (const file of files) {
    const relativeFile = path.relative(ROOT, file);
    const text = fs.readFileSync(file, "utf8");

    for (const regex of hrefRegexes) {
      regex.lastIndex = 0;
      let match;

      while ((match = regex.exec(text))) {
        const rawUrl = match[1];
        const url = normalizeInternalUrl(rawUrl);
        if (!url) continue;
        if (url.includes("${") || url.includes("[") || url.includes("*")) continue;

        const line = lineForIndex(text, match.index);

        if (hasNonAscii(url)) nonAscii.push(`${relativeFile}:${line}: ${rawUrl}`);
        if (url === "/de" || url.startsWith("/de/")) legacyLocaleLinks.push(`${relativeFile}:${line}: ${rawUrl}`);
        if (!routes.has(url)) missing.push(`${relativeFile}:${line}: ${rawUrl} -> ${url}`);
      }
    }
  }

  if (missing.length || nonAscii.length || legacyLocaleLinks.length) {
    if (missing.length) console.log(`MISSING_INTERNAL_ROUTES\n${missing.join("\n")}`);
    if (nonAscii.length) console.log(`NON_ASCII_INTERNAL_LINKS\n${nonAscii.join("\n")}`);
    if (legacyLocaleLinks.length) console.log(`LEGACY_LOCALE_LINKS\n${legacyLocaleLinks.join("\n")}`);
    process.exitCode = 1;
    return;
  }

  console.log(`LINK_CHECK_OK routes=${routes.size} files=${files.length}`);
}

function runSeoCheck() {
  const files = sourceFiles();
  const mojibake = [];
  const riskyClaims = [];
  const importantMissing = [];
  const suspiciousPatterns = [
    { pattern: /Ã|Â|â€|â€¦|â€“|â€”/g, label: "mojibake" },
  ];
  const riskyClaimPatterns = [
    /\bFestpreisgarantie\b/gi,
    /\bgarantierter (Festpreis|Preis|Endpreis)\b/gi,
    /\bfester Endpreis\b/gi,
    /\b100%\s*Abnahmegarantie\b/gi,
    /\bdie beste Wahl\b/gi,
  ];

  for (const file of files) {
    const relativeFile = path.relative(ROOT, file);
    const text = fs.readFileSync(file, "utf8");

    for (const { pattern } of suspiciousPatterns) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(text))) {
        mojibake.push(`${relativeFile}:${lineForIndex(text, match.index)}: ${match[0]}`);
      }
    }

    for (const pattern of riskyClaimPatterns) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(text))) {
        const lineText = text.split(/\r?\n/)[lineForIndex(text, match.index) - 1] || "";
        if (lineText.includes(".replace(/")) continue;
        riskyClaims.push(`${relativeFile}:${lineForIndex(text, match.index)}: ${match[0]}`);
      }
    }
  }

  for (const route of IMPORTANT_ROUTES) {
    if (!discoverRoutes().has(route)) importantMissing.push(route);
  }

  if (mojibake.length || riskyClaims.length || importantMissing.length) {
    if (mojibake.length) console.log(`MOJIBAKE_SUSPECTS\n${mojibake.slice(0, 120).join("\n")}`);
    if (riskyClaims.length) console.log(`RISKY_SEO_OR_PRICE_CLAIMS\n${riskyClaims.slice(0, 120).join("\n")}`);
    if (importantMissing.length) console.log(`IMPORTANT_ROUTES_MISSING\n${importantMissing.join("\n")}`);
    process.exitCode = 1;
    return;
  }

  console.log(`SEO_GUARD_OK files=${files.length} importantRoutes=${IMPORTANT_ROUTES.length}`);
}

function routeToPageFile(route) {
  const segments = route === "/" ? [] : route.replace(/^\/+/, "").split("/");
  return path.join(APP_DIR, ...segments, "page.tsx");
}

function fileContains(file, needles) {
  if (!fs.existsSync(file)) return false;
  const text = fs.readFileSync(file, "utf8");
  return needles.every((needle) => text.includes(needle));
}

function runDominanceCheck() {
  const routes = discoverRoutes({ includePrivate: true });
  const failures = [];
  const blogMetaPath = path.join(ROOT, "lib", "blog-posts.ts");
  const seoPath = path.join(ROOT, "lib", "seo.ts");
  const seoDominancePath = path.join(ROOT, "lib", "seo-dominance.ts");
  const sitemapPath = path.join(ROOT, "lib", "sitemap-xml.ts");
  const footerPath = path.join(ROOT, "components", "Footer.tsx");
  const llmsPath = path.join(ROOT, "app", "llms.txt", "route.ts");
  const localBusinessPath = path.join(ROOT, "components", "seo", "LocalBusinessJsonLd.tsx");

  for (const route of DOMINANCE_MONEY_ROUTES) {
    if (!routes.has(route)) failures.push(`missing money route: ${route}`);
  }

  if (!fileContains(seoPath, ["getDominanceSnippet", "robots", "canonical"])) {
    failures.push("central metadata does not use dominance snippets, robots and canonical logic");
  }

  if (!fileContains(seoDominancePath, ["SEO_MONEY_ROUTES", "serviceCityPatterns", "getDominanceSnippet"])) {
    failures.push("seo-dominance registry is incomplete");
  }

  for (const segment of ["angebote", "guenstig", "signature", "feedback", "villenservice"]) {
    if (!fileContains(sitemapPath, [`segment === "${segment}"`])) {
      failures.push(`sitemap does not defensively skip ${segment}`);
    }
  }

  for (const href of ["/rechner", "/umzug", "/reinigung", "/entruempelung", "/bueroumzug", "/firmenentsorgung", "/leerfahrt-rueckfahrt", "/private-client-service"]) {
    if (!fileContains(footerPath, [`href: "${href}"`]) && !fileContains(footerPath, [`href="${href}"`])) {
      failures.push(`footer misses authority link: ${href}`);
    }
  }

  const pageRequirements = {
    "/": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd", "LocalBusinessJsonLd"],
    "/rechner": ["generatePageSEO", "buildFaqJsonLd", "Orientierungsrahmen"],
    "/umzug": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd"],
    "/reinigung": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd"],
    "/entruempelung": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd"],
    "/leerfahrt-rueckfahrt": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd", "BackhaulOffersBoard"],
    "/private-client-service": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd", "PrivateClientInquiryForm"],
  };

  for (const [route, needles] of Object.entries(pageRequirements)) {
    if (!fileContains(routeToPageFile(route), needles)) {
      failures.push(`money page lacks required SEO/content signals: ${route}`);
    }
  }

  if (fs.existsSync(blogMetaPath)) {
    const blogMeta = fs.readFileSync(blogMetaPath, "utf8");
    const postCount = (blogMeta.match(/slug:\s*"/g) || []).length;
    const featuredCount = (blogMeta.match(/featured:\s*true/g) || []).length;
    if (postCount < 18) failures.push(`blog cluster too small: ${postCount} posts`);
    if (featuredCount < 6) failures.push(`not enough featured blog entry points: ${featuredCount}`);
  } else {
    failures.push("blog metadata registry missing");
  }

  if (!fileContains(llmsPath, ["Leer-Rückfahrt", "Private Client", "Büroumzug", "unverbindlichen Orientierungsrahmen"])) {
    failures.push("llms.txt route is missing AI-readable core service context");
  }

  if (!fileContains(localBusinessPath, ["department", "openingHoursSpecification", "Leer-Rückfahrt", "areaServed"])) {
    failures.push("LocalBusiness JSON-LD lacks recommended local dominance properties");
  }

  if (failures.length) {
    console.log(`DOMINANCE_CHECK_FAILED issues=${failures.length}`);
    console.log(failures.join("\n"));
    process.exitCode = 1;
    return;
  }

  console.log(`DOMINANCE_CHECK_OK moneyRoutes=${DOMINANCE_MONEY_ROUTES.length}`);
}

async function waitForServer(baseUrl, child) {
  for (let attempt = 0; attempt < 90; attempt += 1) {
    if (child.exitCode !== null) break;
    try {
      const response = await fetch(baseUrl, { redirect: "manual" });
      if (response.status === 200) return true;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return false;
}

async function runHttpCheck() {
  const routes = [...discoverRoutes()].sort();
  const baseUrl = `http://127.0.0.1:${DEFAULT_PORT}`;
  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(process.execPath, [nextBin, "start", "-p", String(DEFAULT_PORT)], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
  const output = [];

  child.stdout.on("data", (chunk) => output.push(chunk.toString()));
  child.stderr.on("data", (chunk) => output.push(chunk.toString()));

  try {
    const ready = await waitForServer(baseUrl, child);
    if (!ready) {
      console.log("HTTP_SERVER_NOT_READY");
      console.log(output.join("").split(/\r?\n/).slice(-80).join("\n"));
      process.exitCode = 1;
      return;
    }

    const failures = [];

    for (const route of routes) {
      const response = await fetch(`${baseUrl}${route}`, { redirect: "manual" });
      if (response.status !== 200) failures.push(`${response.status} ${route}`);
    }

    for (const [source, destination] of REDIRECT_EXPECTATIONS) {
      const response = await fetch(`${baseUrl}${source}`, { redirect: "manual" });
      const location = response.headers.get("location") || "";
      const statusOk = response.status === 308 || response.status === 301;
      const targetOk = location === destination || location === `${baseUrl}${destination}`;
      if (!statusOk || !targetOk) failures.push(`${response.status} ${source} -> ${location || "(no location)"}`);
    }

    if (failures.length) {
      console.log(`HTTP_CHECK_FAILED checked=${routes.length} redirects=${REDIRECT_EXPECTATIONS.length}`);
      console.log(failures.join("\n"));
      process.exitCode = 1;
      return;
    }

    console.log(`HTTP_200_AND_REDIRECTS_OK checked=${routes.length} redirects=${REDIRECT_EXPECTATIONS.length}`);
  } finally {
    child.kill("SIGTERM");
  }
}

async function main() {
  const modes = process.argv.slice(2);
  const selectedModes = modes.length ? modes : ["links", "seo"];

  for (const mode of selectedModes) {
    if (mode === "links") runLinkCheck();
    else if (mode === "seo") runSeoCheck();
    else if (mode === "dominance") runDominanceCheck();
    else if (mode === "http") await runHttpCheck();
    else {
      console.error(`Unknown quality-gate mode: ${mode}`);
      process.exitCode = 1;
    }

    if (process.exitCode) return;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
