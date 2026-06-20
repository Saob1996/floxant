#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const ROOT = process.cwd();
const SOURCE_ROOTS = ["app", "components", "lib"];
const TEXT_EXTENSIONS = new Set([".tsx", ".ts", ".jsx", ".js"]);
const PUBLIC_BASE_URL = "https://www.floxant.de";
const OUTPUT_JSON = path.join(ROOT, "internal-link-graph.json");
const OUTPUT_MD = path.join(ROOT, "INTERNAL_LINK_GRAPH.md");

function walkFiles(directory, files = []) {
  if (!fs.existsSync(directory)) return files;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walkFiles(fullPath, files);
      continue;
    }

    if (TEXT_EXTENSIONS.has(path.extname(entry.name))) files.push(fullPath);
  }

  return files;
}

function normalizeRoute(value) {
  if (!value) return "/";
  if (value.includes("${") || value.includes("[") || value.includes("*")) return null;
  if (/^(mailto|tel|sms|whatsapp|javascript):/i.test(value)) return null;

  let pathname = value;
  try {
    const url = new URL(value, PUBLIC_BASE_URL);
    if (url.origin !== PUBLIC_BASE_URL) return null;
    pathname = url.pathname;
  } catch {
    pathname = String(value);
  }

  if (!pathname.startsWith("/")) return null;
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/")) return null;
  const ext = path.extname(pathname).toLowerCase();
  if ([".avif", ".css", ".gif", ".ico", ".jpg", ".jpeg", ".js", ".json", ".map", ".png", ".svg", ".webp", ".xml"].includes(ext)) {
    return null;
  }
  const clean = pathname.split("#")[0].split("?")[0].replace(/\/+$/, "");
  return clean || "/";
}

function routeFromAppFile(file) {
  const appRoot = path.join(ROOT, "app");
  if (!file.startsWith(appRoot)) return null;
  const relative = path.relative(appRoot, path.dirname(file));
  if (!relative || relative === ".") return "/";
  const segments = relative
    .split(path.sep)
    .filter(Boolean)
    .filter((segment) => !segment.startsWith("("));
  if (segments.some((segment) => segment.startsWith("[") || segment === "api")) return null;
  return `/${segments.join("/")}`.replace(/\/+$/, "") || "/";
}

function stripTags(value = "") {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtml(value = "") {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function extractLinksFromSource(file, text) {
  const links = [];
  const sourceRoute = routeFromAppFile(file) || path.relative(ROOT, file).replace(/\\/g, "/");
  const elementRegex = /<(Link|a)\b([^>]*?)href\s*=\s*(?:"([^"]+)"|'([^']+)')[^>]*>([\s\S]*?)<\/(?:Link|a)>/g;
  const objectHrefRegex = /href\s*:\s*(?:"([^"]+)"|'([^']+)')/g;
  let match;

  while ((match = elementRegex.exec(text))) {
    const href = match[3] || match[4] || "";
    const target = normalizeRoute(href);
    if (!target) continue;
    const tag = match[0];
    links.push({
      source: sourceRoute,
      target,
      anchorText: decodeHtml(stripTags(match[5] || "")),
      area: classifyArea(file, tag),
      targetType: classifyTarget(target),
      file: path.relative(ROOT, file).replace(/\\/g, "/"),
    });
  }

  while ((match = objectHrefRegex.exec(text))) {
    const href = match[1] || match[2] || "";
    const target = normalizeRoute(href);
    if (!target) continue;
    links.push({
      source: sourceRoute,
      target,
      anchorText: "",
      area: classifyArea(file, text.slice(Math.max(0, match.index - 160), match.index + 160)),
      targetType: classifyTarget(target),
      file: path.relative(ROOT, file).replace(/\\/g, "/"),
    });
  }

  return links;
}

function classifyArea(file, snippet) {
  const normalizedFile = file.replace(/\\/g, "/").toLowerCase();
  const lowerSnippet = String(snippet || "").toLowerCase();
  if (normalizedFile.includes("floxnavigation")) return "Header";
  if (normalizedFile.includes("footer")) return "Footer";
  if (normalizedFile.endsWith("app/page.tsx")) return "Homepage";
  if (normalizedFile.includes("breadcrumb")) return "Breadcrumb";
  if (lowerSnippet.includes("data-event") || lowerSnippet.includes("cta")) return "CTA";
  if (normalizedFile.includes("/blog/")) return "Ratgeber";
  if (normalizedFile.includes("page.tsx")) return "Content";
  return "Sonstige";
}

function classifyTarget(route) {
  if (route === "/kontakt") return "Kontakt";
  if (route.startsWith("/blog") || route.startsWith("/ratgeber")) return "Ratgeber";
  if (/\/(impressum|datenschutz|agb|widerruf|buchungsbedingungen)$/.test(route)) return "Rechtliches";
  if (route.startsWith("/de/") || route.startsWith("/fa/") || route.startsWith("/en/")) return "Sprache";
  if (
    /(umzug|reinigung|entruempelung|entrümpelung|wohnungsaufloesung|haushaltsaufloesung|bueroreinigung|gewerbereinigung|angebot|private-client)/i.test(
      route,
    )
  ) {
    return "Money-Page";
  }
  return "Sonstige";
}

function readSitemapRoutes() {
  const file = path.join(ROOT, "lib", "sitemap-routes.ts");
  if (!fs.existsSync(file)) return new Set();
  const source = fs.readFileSync(file, "utf8");
  return new Set(Array.from(source.matchAll(/"([^"]+)"/g), (match) => normalizeRoute(match[1])).filter(Boolean));
}

function routeFromSegments(segments) {
  const route = `/${segments.filter((segment) => !segment.startsWith("(")).join("/")}`.replace(/\/+/g, "/");
  return route === "/" ? "/" : route.replace(/\/$/, "");
}

function collectPhysicalAppRoutes() {
  const appDir = path.join(ROOT, "app");
  const routes = new Set(["/"]);

  function walk(directory, segments = []) {
    if (!fs.existsSync(directory)) return;
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    if (entries.some((entry) => entry.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(entry.name))) {
      routes.add(routeFromSegments(segments));
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith("@") || entry.name.startsWith("_") || entry.name === "api") continue;
      if (entry.name.startsWith("[") && entry.name !== "[serviceSlug]") continue;
      walk(path.join(directory, entry.name), [...segments, entry.name]);
    }
  }

  walk(appDir);
  return routes;
}

function collectDynamicLocalRoutes() {
  const file = path.join(ROOT, "lib", "local-seo-routes.ts");
  if (!fs.existsSync(file)) return new Set();
  const source = fs.readFileSync(file, "utf8");
  return new Set(Array.from(source.matchAll(/"route":\s*"([^"]+)"/g), (match) => normalizeRoute(match[1])).filter(Boolean));
}

async function loadMoneyPages() {
  const fileUrl = pathToFileURL(path.join(ROOT, "lib", "gsc-click-priorities.ts")).href;
  const seoModule = await import(fileUrl);
  return Array.isArray(seoModule.seoMoneyPages) ? seoModule.seoMoneyPages : [];
}

function groupCount(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const key = keyFn(item);
    map.set(key, (map.get(key) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}

function mdEscape(value) {
  return String(value || "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function buildMarkdown(graph) {
  const lines = [
    "# Internal Link Graph",
    "",
    `Stand: ${graph.generatedAt}`,
    `Analysierte Links: ${graph.links.length}`,
    "",
    "## Top intern verlinkte Seiten",
    "",
    "| Ziel | Links | Typ |",
    "| --- | ---: | --- |",
    ...graph.topTargets
      .slice(0, 40)
      .map((item) => `| ${mdEscape(item.key)} | ${item.count} | ${classifyTarget(item.key)} |`),
    "",
    "## Money-Pages mit zu wenigen internen Links",
    "",
    ...(graph.weakMoneyPages.length
      ? graph.weakMoneyPages.map((item) => `- ${item.path}: ${item.inboundLinks} interne Links`)
      : ["- keine unter Schwelle"]),
    "",
    "## Ratgeberseiten mit viel Gewicht",
    "",
    ...(graph.heavyAdvicePages.length
      ? graph.heavyAdvicePages.map((item) => `- ${item.key}: ${item.count} Links`)
      : ["- keine auffällig"]),
    "",
    "## Footer-Link-Spam-Prüfung",
    "",
    graph.footerLinkCount > 80
      ? `- WARN: ${graph.footerLinkCount} Footer-Links erkannt, manuell auf Link-Spam prüfen.`
      : `- OK: ${graph.footerLinkCount} Footer-Links erkannt.`,
    "",
    "## Kaputte oder riskante interne Links",
    "",
    ...(graph.brokenInternalLinks.length
      ? graph.brokenInternalLinks.map((item) => `- ${item.source} -> ${item.target} (${item.file})`)
      : ["- keine offensichtlichen 404-Routen erkannt"]),
    "",
    "## Links auf nicht-kanonische Varianten",
    "",
    ...(graph.nonCanonicalLinks.length
      ? graph.nonCanonicalLinks.map((item) => `- ${item.source} -> ${item.target}, erwartet ${item.expectedCanonical}`)
      : ["- keine erkannt"]),
    "",
    "## Falsche Sprachlinks",
    "",
    ...(graph.languageLinks.length
      ? graph.languageLinks.map((item) => `- ${item.source} -> ${item.target}`)
      : ["- keine riskanten `/de/`- oder `/fa/`-Links erkannt"]),
    "",
    "## Generische Anchor-Texte auf SEO-Zielen",
    "",
    ...(graph.genericAnchors.length
      ? graph.genericAnchors.map((item) => `- ${item.source} -> ${item.target}: \"${item.anchorText || "(leer)"}\"`)
      : ["- keine erkannt"]),
    "",
    "## Empfehlungen",
    "",
    ...graph.recommendations.map((item) => `- ${item}`),
    "",
  ];

  return `${lines.join("\n")}\n`;
}

async function main() {
  const generatedAt = new Date().toISOString();
  const sitemapRoutes = readSitemapRoutes();
  const knownRoutes = new Set([...sitemapRoutes, ...collectPhysicalAppRoutes(), ...collectDynamicLocalRoutes()]);
  const moneyPages = await loadMoneyPages();
  const canonicalByVariant = new Map();
  const canonicalMoneyPages = new Set();

  for (const page of moneyPages) {
    canonicalMoneyPages.add(page.canonicalPath);
    canonicalByVariant.set(page.path, page.canonicalPath);
    canonicalByVariant.set(page.canonicalPath, page.canonicalPath);
  }

  const files = SOURCE_ROOTS.flatMap((root) => walkFiles(path.join(ROOT, root)));
  const links = files.flatMap((file) => extractLinksFromSource(file, fs.readFileSync(file, "utf8")));

  const canonicalizedLinks = links.map((link) => ({
    ...link,
    canonicalTarget: canonicalByVariant.get(link.target) || link.target,
  }));
  const topTargets = groupCount(canonicalizedLinks, (link) => link.canonicalTarget);
  const topSources = groupCount(canonicalizedLinks, (link) => link.source);
  const footerLinkCount = canonicalizedLinks.filter((link) => link.area === "Footer").length;
  const inboundByCanonical = new Map(topTargets.map((item) => [item.key, item.count]));
  const weakMoneyPages = moneyPages
    .filter((page) => page.shouldBeIndexable && (inboundByCanonical.get(page.canonicalPath) || 0) < 3)
    .map((page) => ({
      path: page.canonicalPath,
      inboundLinks: inboundByCanonical.get(page.canonicalPath) || 0,
      priority: page.priority,
    }))
    .sort((a, b) => a.inboundLinks - b.inboundLinks || a.path.localeCompare(b.path));
  const heavyAdvicePages = topTargets.filter((item) => item.key.startsWith("/blog") && item.count >= 15);
  const brokenInternalLinks = canonicalizedLinks.filter((link) => {
    if (link.target.startsWith("/dashboard") || link.target.startsWith("/admin")) return false;
    if (link.target.startsWith("/de/") || link.target.startsWith("/fa/")) return false;
    if (knownRoutes.has(link.target) || knownRoutes.has(link.canonicalTarget)) return false;
    if (canonicalMoneyPages.has(link.target) || canonicalMoneyPages.has(link.canonicalTarget)) return false;
    return link.targetType !== "Rechtliches";
  });
  const nonCanonicalLinks = canonicalizedLinks
    .filter((link) => canonicalByVariant.has(link.target) && canonicalByVariant.get(link.target) !== link.target)
    .map((link) => ({ ...link, expectedCanonical: canonicalByVariant.get(link.target) }));
  const languageLinks = canonicalizedLinks.filter((link) => link.target.startsWith("/de/") || link.target.startsWith("/fa/"));
  const genericAnchorSet = new Set(["hier", "mehr", "weiter", "anzeigen", "ansehen", "lesen", "weiterlesen"]);
  const genericAnchors = canonicalizedLinks.filter(
    (link) =>
      canonicalMoneyPages.has(link.canonicalTarget) &&
      genericAnchorSet.has(String(link.anchorText || "").trim().toLowerCase()),
  );
  const recommendations = [];

  if (weakMoneyPages.length) {
    recommendations.push(
      `Money-Pages mit unter 3 internen Links prüfen: ${weakMoneyPages
        .slice(0, 8)
        .map((item) => item.path)
        .join(", ")}`,
    );
  }
  if (brokenInternalLinks.length) recommendations.push("Offensichtliche 404-/Nicht-Sitemap-Links manuell prüfen oder korrigieren.");
  if (nonCanonicalLinks.length) recommendations.push("Interne Links auf Canonical-Ziele umstellen, besonders Locale- und Legacy-Varianten.");
  if (languageLinks.length) recommendations.push("Interne `/de/`- und `/fa/`-Links vermeiden; Canonical-Pfade ohne Locale verlinken.");
  if (genericAnchors.length) recommendations.push("Generische Anchor-Texte bei Money-Pages durch Service- und Ortsanker ersetzen.");
  if (!recommendations.length) recommendations.push("Keine offensichtlichen Linkgraph-Defekte erkannt; nach neuen GSC-Daten erneut prüfen.");

  const graph = {
    generatedAt,
    links: canonicalizedLinks,
    topTargets,
    topSources,
    moneyPages: moneyPages.map((page) => ({
      path: page.canonicalPath,
      sourcePath: page.path,
      priority: page.priority,
      inboundLinks: inboundByCanonical.get(page.canonicalPath) || 0,
    })),
    weakMoneyPages,
    heavyAdvicePages,
    footerLinkCount,
    brokenInternalLinks,
    nonCanonicalLinks,
    languageLinks,
    genericAnchors,
    recommendations,
  };

  fs.writeFileSync(OUTPUT_JSON, `${JSON.stringify(graph, null, 2)}\n`, "utf8");
  fs.writeFileSync(OUTPUT_MD, buildMarkdown(graph), "utf8");

  console.log(
    `INTERNAL_LINK_GRAPH_OK links=${links.length} weakMoney=${weakMoneyPages.length} broken=${brokenInternalLinks.length} nonCanonical=${nonCanonicalLinks.length}`,
  );
}

main().catch((error) => {
  console.error(`INTERNAL_LINK_GRAPH_ERROR ${error.message}`);
  process.exit(1);
});
