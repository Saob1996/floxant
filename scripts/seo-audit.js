#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const PUBLIC_BASE_URL = "https://www.floxant.de";
const DEFAULT_LOCAL_BASE_URL = process.env.SEO_AUDIT_BASE_URL || "http://127.0.0.1:3090";
const SCOPE = process.env.SEO_AUDIT_SCOPE || process.argv[2] || "priority";
const CONCURRENCY = Number(process.env.SEO_AUDIT_CONCURRENCY || 6);
const LIMIT = Number(process.env.SEO_AUDIT_LIMIT || 0);

const PRIORITY_ROUTES = [
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/reinigung",
  "/duesseldorf/reinigung-stadtteile-umgebung",
  "/duesseldorf/hausverwaltung-reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/umzug",
  "/duesseldorf/entruempelung",
  "/angebot-vergleichen-duesseldorf",
  "/duesseldorf/vielleicht-guenstiger",
  "/regensburg/reinigung",
  "/regensburg/umzug",
  "/regensburg/entruempelung",
  "/regensburg/haushaltsaufloesung",
  "/regensburg/gewerbereinigung",
  "/umzug-muenchen",
  "/reinigung-muenchen",
  "/bueroumzug-muenchen",
  "/umzug-regensburg",
  "/umzug-aufhausen",
  "/umzug-friedberg",
  "/umzug-forchheim",
  "/entruempelung",
  "/entruempelung-regensburg",
  "/reinigung-regensburg",
  "/gewerbereinigung-regensburg",
];

const REQUIRED_SITEMAP_ROUTES = [
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/reinigung",
  "/duesseldorf/reinigung-stadtteile-umgebung",
  "/duesseldorf/hausverwaltung-reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/umzug",
  "/duesseldorf/entruempelung",
  "/duesseldorf/haushaltsaufloesung",
  "/angebot-vergleichen-duesseldorf",
  "/regensburg/reinigung",
  "/regensburg/umzug",
  "/regensburg/entruempelung",
  "/regensburg/haushaltsaufloesung",
  "/regensburg/gewerbereinigung",
  "/umzug-muenchen",
  "/reinigung-muenchen",
  "/bueroumzug-muenchen",
  "/umzug-regensburg",
  "/umzug-aufhausen",
  "/umzug-friedberg",
  "/umzug-forchheim",
  "/entruempelung",
  "/entruempelung-regensburg",
  "/reinigung-regensburg",
  "/gewerbereinigung-regensburg",
];

const ASSET_EXTENSIONS = new Set([
  ".avif",
  ".css",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".js",
  ".json",
  ".map",
  ".pdf",
  ".png",
  ".svg",
  ".txt",
  ".webmanifest",
  ".webp",
  ".xml",
]);

function readText(relativePath) {
  const filePath = path.join(ROOT, relativePath);
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function collectConstArray(relativePath, constName) {
  const source = readText(relativePath);
  const start = source.indexOf(`export const ${constName}`);
  if (start === -1) return [];

  const end = source.indexOf("] as const", start);
  if (end === -1) return [];

  const body = source.slice(start, end);
  return Array.from(body.matchAll(/"([^"]+)"/g), (match) => match[1]);
}

function collectSitemapRoutes() {
  const source = readText("lib/sitemap-routes.ts");
  return Array.from(source.matchAll(/"([^"]+)"/g), (match) => match[1]);
}

function normalizeRoute(value) {
  if (!value) return "/";
  const clean = value.split("#")[0].split("?")[0].replace(/\/+$/, "");
  return clean ? (clean.startsWith("/") ? clean : `/${clean}`) : "/";
}

function sortRoutes(routes) {
  const priorityIndex = new Map(PRIORITY_ROUTES.map((route, index) => [route, index]));
  return routes.sort((routeA, routeB) => {
    const indexA = priorityIndex.has(routeA) ? priorityIndex.get(routeA) : Number.MAX_SAFE_INTEGER;
    const indexB = priorityIndex.has(routeB) ? priorityIndex.get(routeB) : Number.MAX_SAFE_INTEGER;
    if (indexA !== indexB) return indexA - indexB;
    return routeA.localeCompare(routeB, "de");
  });
}

function collectAuditRoutes() {
  const moneyRoutes = collectConstArray("lib/seo-dominance.ts", "SEO_MONEY_ROUTES");
  const supportRoutes = collectConstArray("lib/seo-dominance.ts", "SEO_SUPPORT_ROUTES");
  const sitemapRoutes = collectSitemapRoutes();

  let routes;
  if (SCOPE === "all") {
    routes = sitemapRoutes;
  } else if (SCOPE === "priority") {
    routes = PRIORITY_ROUTES;
  } else if (SCOPE === "support") {
    routes = [...PRIORITY_ROUTES, ...moneyRoutes, ...supportRoutes];
  } else {
    routes = [...PRIORITY_ROUTES, ...moneyRoutes];
  }

  const normalizedRoutes = sortRoutes(
    Array.from(new Set(routes.map(normalizeRoute))).filter((route) => !route.includes("[") && !route.startsWith("/api")),
  );

  return LIMIT > 0 ? normalizedRoutes.slice(0, LIMIT) : normalizedRoutes;
}

function decodeHtml(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(value = "") {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getAttrs(tag) {
  const attrs = {};
  const attrRegex = /([a-zA-Z0-9_:\-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
  let match;
  while ((match = attrRegex.exec(tag))) {
    attrs[match[1].toLowerCase()] = decodeHtml(match[3] || match[4] || "");
  }
  return attrs;
}

function findMetaContent(html, key, attrName = "name") {
  const target = key.toLowerCase();
  const tagRegex = /<meta\b[^>]*>/gi;
  let match;
  while ((match = tagRegex.exec(html))) {
    const attrs = getAttrs(match[0]);
    if ((attrs[attrName] || "").toLowerCase() === target) return attrs.content || "";
  }
  return "";
}

function findLinkHref(html, relName) {
  const target = relName.toLowerCase();
  const tagRegex = /<link\b[^>]*>/gi;
  let match;
  while ((match = tagRegex.exec(html))) {
    const attrs = getAttrs(match[0]);
    const rel = (attrs.rel || "").toLowerCase().split(/\s+/);
    if (rel.includes(target)) return attrs.href || "";
  }
  return "";
}

function hasHreflang(html) {
  const tagRegex = /<link\b[^>]*>/gi;
  let match;
  while ((match = tagRegex.exec(html))) {
    const attrs = getAttrs(match[0]);
    const rel = (attrs.rel || "").toLowerCase().split(/\s+/);
    if (rel.includes("alternate") && attrs.hreflang) return true;
  }
  return false;
}

function getHeadings(html, level) {
  const regex = new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, "gi");
  return Array.from(html.matchAll(regex), (match) => stripTags(match[1])).filter(Boolean);
}

function getJsonLdTypes(html) {
  const regex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const types = [];
  let count = 0;
  let match;

  while ((match = regex.exec(html))) {
    count += 1;
    try {
      const parsed = JSON.parse(decodeHtml(match[1]));
      const nodes = Array.isArray(parsed?.["@graph"]) ? parsed["@graph"] : [parsed];
      for (const node of nodes) {
        const type = node?.["@type"];
        if (Array.isArray(type)) types.push(...type);
        else if (type) types.push(type);
      }
    } catch {
      types.push("unparseable");
    }
  }

  return { count, types: Array.from(new Set(types)) };
}

function normalizeInternalHref(rawHref) {
  if (!rawHref) return null;
  const href = decodeHtml(rawHref).trim();
  if (!href || href.startsWith("#")) return null;
  if (/^(mailto|tel|sms|whatsapp|javascript):/i.test(href)) return null;

  let url;
  try {
    url = new URL(href, PUBLIC_BASE_URL);
  } catch {
    return null;
  }

  if (url.origin !== PUBLIC_BASE_URL) return null;
  if (url.pathname.startsWith("/_next/") || url.pathname.startsWith("/api/")) return null;

  const extension = path.extname(url.pathname).toLowerCase();
  if (ASSET_EXTENSIONS.has(extension)) return null;

  return normalizeRoute(url.pathname);
}

function getInternalLinks(html) {
  const links = new Set();
  const anchorRegex = /<a\b[^>]*href\s*=\s*("([^"]*)"|'([^']*)')[^>]*>/gi;
  let match;
  while ((match = anchorRegex.exec(html))) {
    const normalized = normalizeInternalHref(match[2] || match[3] || "");
    if (normalized) links.add(normalized);
  }
  return Array.from(links).sort();
}

function classifyPage(route) {
  if (route.startsWith("/blog") || route.startsWith("/ratgeber") || route.startsWith("/wissen")) return "Blog";
  if (route.startsWith("/duesseldorf") || route.startsWith("/regensburg")) {
    const segments = route.split("/").filter(Boolean);
    return segments.length === 1 ? "Stadtseite" : "Service-Seite";
  }
  if (/\/(impressum|datenschutz|agb|widerruf|buchungsbedingungen)$/.test(route)) return "Rechtliches";
  if (route.includes("angebot") || route.includes("buchung") || route.includes("kontakt")) return "Sonstiges";
  return "Service-Seite";
}

function classifyCity(route) {
  if (route.includes("duesseldorf")) return "Düsseldorf";
  if (route.includes("regensburg")) return "Regensburg";
  return "neutral";
}

function classifyService(route, h1 = "") {
  const haystack = `${route} ${h1}`.toLowerCase();
  if (haystack.includes("gewerbereinigung")) return "Gewerbereinigung";
  if (haystack.includes("bueroreinigung") || haystack.includes("büroreinigung")) return "Büroreinigung";
  if (haystack.includes("haushaltsaufloesung") || haystack.includes("haushaltsauflösung")) return "Haushaltsauflösung";
  if (haystack.includes("wohnungsaufloesung") || haystack.includes("wohnungsauflösung")) return "Wohnungsauflösung";
  if (haystack.includes("entruempelung") || haystack.includes("entrümpelung")) return "Entrümpelung";
  if (haystack.includes("umzug")) return "Umzug";
  if (haystack.includes("reinigung")) return "Reinigung";
  if (haystack.includes("angebot")) return "Angebotsprüfung";
  return "übergreifend";
}

function isPriorityRoute(route) {
  return PRIORITY_ROUTES.includes(route);
}

function expectedCanonical(route) {
  return `${PUBLIC_BASE_URL}${route === "/" ? "" : route}`;
}

function normalizeCanonical(value) {
  if (!value) return "";
  try {
    const url = new URL(value, PUBLIC_BASE_URL);
    return `${url.origin}${normalizeRoute(url.pathname) === "/" ? "" : normalizeRoute(url.pathname)}`;
  } catch {
    return value.replace(/\/+$/, "");
  }
}

function extractPage(route, status, headers, html) {
  const title = stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  const description = findMetaContent(html, "description");
  const robotsMeta = findMetaContent(html, "robots");
  const robotsHeader = headers.get("x-robots-tag") || "";
  const robotsCombined = [robotsMeta, robotsHeader].filter(Boolean).join(", ").toLowerCase();
  const h1 = getHeadings(html, 1);
  const h2 = getHeadings(html, 2);
  const canonical = normalizeCanonical(findLinkHref(html, "canonical"));
  const expected = expectedCanonical(route);
  const jsonLd = getJsonLdTypes(html);
  const internalLinks = getInternalLinks(html);
  const ogTitle = findMetaContent(html, "og:title", "property");
  const ogDescription = findMetaContent(html, "og:description", "property");
  const ogUrl = findMetaContent(html, "og:url", "property");
  const ogImage = findMetaContent(html, "og:image", "property");
  const noindex = robotsCombined.includes("noindex");
  const nofollow = robotsCombined.includes("nofollow");

  return {
    route,
    url: expected,
    pageType: classifyPage(route),
    city: classifyCity(route),
    service: classifyService(route, h1[0]),
    statusCode: status,
    title,
    titleLength: title.length,
    description,
    descriptionLength: description.length,
    h1,
    h2,
    canonical,
    expectedCanonical: expected,
    canonicalOk: canonical === expected,
    robots: `${noindex ? "noindex" : "index"}/${nofollow ? "nofollow" : "follow"}`,
    hreflang: hasHreflang(html),
    openGraph: Boolean(ogTitle && ogDescription && ogUrl && ogImage),
    jsonLdCount: jsonLd.count,
    jsonLdTypes: jsonLd.types,
    internalLinks,
    inboundLinks: [],
    brokenInternalLinks: [],
    duplicateTitleRoutes: [],
    duplicateDescriptionRoutes: [],
    issues: [],
    rating: "Stark",
  };
}

async function fetchRoute(baseUrl, route) {
  const response = await fetch(`${baseUrl}${route}`, {
    redirect: "manual",
    signal: AbortSignal.timeout(25000),
  });
  const contentType = response.headers.get("content-type") || "";
  const html = contentType.includes("text/html") ? await response.text() : "";
  return extractPage(route, response.status, response.headers, html);
}

async function mapLimit(items, concurrency, worker) {
  const results = new Array(items.length);
  let cursor = 0;

  async function runNext() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, runNext));
  return results;
}

async function checkInternalLinks(baseUrl, routes, knownGoodRoutes) {
  const statuses = new Map();
  const uniqueRoutes = Array.from(new Set(routes.map(normalizeRoute))).sort();
  const candidates = uniqueRoutes.filter((route) => !knownGoodRoutes.has(route));

  for (const route of uniqueRoutes) {
    if (knownGoodRoutes.has(route)) statuses.set(route, 200);
  }

  await mapLimit(candidates, CONCURRENCY, async (route) => {
    try {
      const response = await fetch(`${baseUrl}${route}`, {
        redirect: "manual",
        signal: AbortSignal.timeout(15000),
      });
      statuses.set(route, response.status);
    } catch {
      statuses.set(route, 0);
    }
  });

  return statuses;
}

function buildDuplicates(pages, field) {
  const map = new Map();
  for (const page of pages) {
    const value = (page[field] || "").trim();
    if (!value) continue;
    if (!map.has(value)) map.set(value, []);
    map.get(value).push(page.route);
  }
  return map;
}

function addIssue(page, severity, text) {
  page.issues.push({ severity, text });
}

function applyPageScoring(page) {
  if (page.statusCode !== 200) addIssue(page, "critical", `Statuscode ${page.statusCode}`);
  if (!page.title) addIssue(page, "critical", "Title fehlt");
  if (page.title && (page.titleLength < 45 || page.titleLength > 60)) {
    addIssue(page, "medium", `Title-Länge außerhalb Zielbereich 45-60 (${page.titleLength})`);
  }
  if (!page.description) addIssue(page, "critical", "Meta-Description fehlt");
  if (page.description && (page.descriptionLength < 135 || page.descriptionLength > 160)) {
    addIssue(page, "medium", `Description-Länge außerhalb Zielbereich 135-160 (${page.descriptionLength})`);
  }
  if (page.h1.length !== 1) addIssue(page, "critical", `${page.h1.length} H1 gefunden`);
  if (!page.canonical) addIssue(page, "critical", "Canonical fehlt");
  else if (!page.canonicalOk) addIssue(page, "critical", `Canonical zeigt auf ${page.canonical}`);
  if (isPriorityRoute(page.route) && page.robots.includes("noindex")) addIssue(page, "critical", "Prioritätsseite ist noindex");
  if (!page.hreflang) addIssue(page, "medium", "Hreflang fehlt");
  if (!page.openGraph) addIssue(page, "medium", "Open Graph unvollständig");
  if (page.jsonLdCount === 0) addIssue(page, "medium", "JSON-LD fehlt");
  if (page.brokenInternalLinks.length) {
    addIssue(page, "critical", `${page.brokenInternalLinks.length} kaputte interne Links`);
  }
  if (page.duplicateTitleRoutes.length) addIssue(page, "medium", "Doppelter Title");
  if (page.duplicateDescriptionRoutes.length) addIssue(page, "medium", "Doppelte Description");

  const hasCritical = page.issues.some((issue) => issue.severity === "critical");
  const mediumCount = page.issues.filter((issue) => issue.severity === "medium").length;

  if (hasCritical) page.rating = "Kritisch";
  else if (mediumCount >= 3) page.rating = "Schwach";
  else if (mediumCount > 0) page.rating = "Mittel";
  else page.rating = "Stark";
}

function mdEscape(value) {
  return String(value || "").replace(/\|/g, "\\|");
}

function mdList(values, fallback = "keine") {
  if (!values || values.length === 0) return fallback;
  return values.map((value) => `\`${value}\``).join(", ");
}

function issueList(page) {
  if (!page.issues.length) return "keine";
  return page.issues.map((issue) => `${issue.severity}: ${issue.text}`).join("; ");
}

function buildInventoryMarkdown(pages, generatedAt, baseUrl, sitemapMissing) {
  const lines = [
    "# SEO Inventory FLOXANT",
    "",
    `Stand: ${generatedAt}`,
    `Quelle: lokaler Render-Check gegen ${baseUrl}`,
    `Scope: ${SCOPE}`,
    "",
    "Diese Datei wird von `node scripts/seo-audit.js` erzeugt. Sie kombiniert gerenderte HTML-Daten mit interner Linkauswertung.",
    "",
  ];

  if (sitemapMissing.length) {
    lines.push("## Sitemap-Lücken", "", ...sitemapMissing.map((route) => `- ${route}`), "");
  }

  pages.forEach((page, index) => {
    lines.push(
      `## ${index + 1}. ${page.route}`,
      "",
      `- URL: ${page.url}`,
      `- Seitentyp: ${page.pageType}`,
      `- Stadt: ${page.city}`,
      `- Hauptservice: ${page.service}`,
      `- Title: ${page.title || "(fehlt)"}`,
      `- Title-Länge: ${page.titleLength}`,
      `- Meta-Description: ${page.description || "(fehlt)"}`,
      `- Description-Länge: ${page.descriptionLength}`,
      `- H1: ${page.h1.length ? page.h1.join(" | ") : "(fehlt)"}`,
      `- H2-Struktur: ${page.h2.length ? page.h2.join(" | ") : "(keine)"}`,
      `- Canonical: ${page.canonical || "(fehlt)"}`,
      `- robots index/follow Status: ${page.robots}`,
      `- hreflang vorhanden: ${page.hreflang ? "ja" : "nein"}`,
      `- Open Graph vorhanden: ${page.openGraph ? "ja" : "nein"}`,
      `- JSON-LD vorhanden: ${page.jsonLdCount > 0 ? `ja (${page.jsonLdTypes.join(", ") || page.jsonLdCount})` : "nein"}`,
      `- interne Links auf der Seite: ${mdList(page.internalLinks.slice(0, 60))}`,
      `- interne Links, die auf diese Seite zeigen: ${mdList(page.inboundLinks.slice(0, 60))}`,
      `- kaputte interne Links: ${mdList(page.brokenInternalLinks.map((link) => `${link.route} (${link.status})`))}`,
      `- Status: ${page.rating}`,
      `- Hinweise: ${issueList(page)}`,
      "",
    );
  });

  return `${lines.join("\n")}\n`;
}

function buildResultMarkdown(summary, pages, duplicates, sitemapMissing) {
  const priorityPages = pages.filter((page) => PRIORITY_ROUTES.includes(page.route));
  const criticalPages = pages.filter((page) => page.rating === "Kritisch");
  const weakPages = pages.filter((page) => page.rating === "Schwach");

  const lines = [
    "# SEO Audit Result FLOXANT",
    "",
    `Stand: ${summary.generatedAt}`,
    `Geprüfte Seiten: ${summary.checkedRoutes}`,
    `Scope: ${summary.scope}`,
    "",
    "## Ergebnis",
    "",
    `- Stark: ${summary.ratings.Stark || 0}`,
    `- Mittel: ${summary.ratings.Mittel || 0}`,
    `- Schwach: ${summary.ratings.Schwach || 0}`,
    `- Kritisch: ${summary.ratings.Kritisch || 0}`,
    `- Kaputte interne Links: ${summary.brokenInternalLinks}`,
    `- Doppelte Titles: ${duplicates.titles.length}`,
    `- Doppelte Descriptions: ${duplicates.descriptions.length}`,
    "",
    "## Prioritätsseiten",
    "",
    "| URL | Status | Title-Länge | Description-Länge | H1 | Canonical | JSON-LD | OG | Hreflang |",
    "| --- | --- | ---: | ---: | --- | --- | --- | --- | --- |",
    ...priorityPages.map((page) =>
      `| ${mdEscape(page.route)} | ${page.rating} | ${page.titleLength} | ${page.descriptionLength} | ${page.h1.length} | ${page.canonicalOk ? "ok" : "prüfen"} | ${page.jsonLdCount ? "ja" : "nein"} | ${page.openGraph ? "ja" : "nein"} | ${page.hreflang ? "ja" : "nein"} |`,
    ),
    "",
  ];

  if (sitemapMissing.length) {
    lines.push("## Sitemap-Priorität", "", ...sitemapMissing.map((route) => `- fehlt in Sitemap: ${route}`), "");
  }

  if (criticalPages.length) {
    lines.push("## Kritische Seiten", "", ...criticalPages.map((page) => `- ${page.route}: ${issueList(page)}`), "");
  }

  if (weakPages.length) {
    lines.push("## Schwache Seiten", "", ...weakPages.map((page) => `- ${page.route}: ${issueList(page)}`), "");
  }

  if (duplicates.titles.length) {
    lines.push(
      "## Doppelte Titles",
      "",
      ...duplicates.titles.map((item) => `- "${item.value}" -> ${item.routes.join(", ")}`),
      "",
    );
  }

  if (duplicates.descriptions.length) {
    lines.push(
      "## Doppelte Descriptions",
      "",
      ...duplicates.descriptions.map((item) => `- "${item.value}" -> ${item.routes.join(", ")}`),
      "",
    );
  }

  return `${lines.join("\n")}\n`;
}

function duplicateReport(map) {
  return Array.from(map.entries())
    .filter(([, routes]) => routes.length > 1)
    .map(([value, routes]) => ({ value, routes }));
}

function ratingTotals(pages) {
  return pages.reduce((acc, page) => {
    acc[page.rating] = (acc[page.rating] || 0) + 1;
    return acc;
  }, {});
}

async function main() {
  const routes = collectAuditRoutes();

  try {
    const probe = await fetch(DEFAULT_LOCAL_BASE_URL, {
      redirect: "manual",
      signal: AbortSignal.timeout(10000),
    });
    if (probe.status >= 500) {
      throw new Error(`local server responded with ${probe.status}`);
    }
  } catch (error) {
    console.error(`SEO_AUDIT_SERVER_UNREACHABLE baseUrl=${DEFAULT_LOCAL_BASE_URL}`);
    console.error(error.message);
    process.exit(1);
  }

  const pages = await mapLimit(routes, CONCURRENCY, async (route) => {
    try {
      return await fetchRoute(DEFAULT_LOCAL_BASE_URL, route);
    } catch (error) {
      return {
        route,
        url: expectedCanonical(route),
        pageType: classifyPage(route),
        city: classifyCity(route),
        service: classifyService(route),
        statusCode: 0,
        title: "",
        titleLength: 0,
        description: "",
        descriptionLength: 0,
        h1: [],
        h2: [],
        canonical: "",
        expectedCanonical: expectedCanonical(route),
        canonicalOk: false,
        robots: "unknown",
        hreflang: false,
        openGraph: false,
        jsonLdCount: 0,
        jsonLdTypes: [],
        internalLinks: [],
        inboundLinks: [],
        brokenInternalLinks: [],
        duplicateTitleRoutes: [],
        duplicateDescriptionRoutes: [],
        issues: [{ severity: "critical", text: error.message }],
        rating: "Kritisch",
      };
    }
  });

  const inboundMap = new Map(pages.map((page) => [page.route, []]));
  for (const page of pages) {
    for (const link of page.internalLinks) {
      if (!inboundMap.has(link)) inboundMap.set(link, []);
      inboundMap.get(link).push(page.route);
    }
  }

  for (const page of pages) {
    page.inboundLinks = Array.from(new Set(inboundMap.get(page.route) || [])).sort();
  }

  const sitemapRoutes = collectSitemapRoutes();
  const sitemapRouteSet = new Set(sitemapRoutes.map(normalizeRoute));
  const knownGoodRoutes = new Set([
    ...Array.from(sitemapRouteSet),
    ...pages.filter((page) => page.statusCode === 200).map((page) => page.route),
  ]);
  const linkedRoutes = pages.flatMap((page) => page.internalLinks);
  const linkStatuses = await checkInternalLinks(DEFAULT_LOCAL_BASE_URL, linkedRoutes, knownGoodRoutes);
  for (const page of pages) {
    page.brokenInternalLinks = page.internalLinks
      .map((route) => ({ route, status: linkStatuses.get(route) || 0 }))
      .filter((link) => link.status === 0 || link.status >= 400);
  }

  const titleDuplicates = buildDuplicates(pages, "title");
  const descriptionDuplicates = buildDuplicates(pages, "description");
  for (const page of pages) {
    page.duplicateTitleRoutes = (titleDuplicates.get(page.title) || []).filter((route) => route !== page.route);
    page.duplicateDescriptionRoutes = (descriptionDuplicates.get(page.description) || []).filter((route) => route !== page.route);
    applyPageScoring(page);
  }

  const sitemapMissing = REQUIRED_SITEMAP_ROUTES.filter((route) => !sitemapRouteSet.has(route));
  const generatedAt = new Date().toISOString();
  const duplicates = {
    titles: duplicateReport(titleDuplicates),
    descriptions: duplicateReport(descriptionDuplicates),
  };
  const summary = {
    generatedAt,
    baseUrl: DEFAULT_LOCAL_BASE_URL,
    scope: SCOPE,
    checkedRoutes: pages.length,
    ratings: ratingTotals(pages),
    brokenInternalLinks: pages.reduce((count, page) => count + page.brokenInternalLinks.length, 0),
    duplicateTitles: duplicates.titles.length,
    duplicateDescriptions: duplicates.descriptions.length,
    sitemapMissing,
  };
  const output = {
    summary,
    duplicates,
    pages,
  };

  fs.writeFileSync(path.join(ROOT, "SEO_AUDIT_RESULT.json"), `${JSON.stringify(output, null, 2)}\n`);
  fs.writeFileSync(path.join(ROOT, "SEO_AUDIT_RESULT.md"), buildResultMarkdown(summary, pages, duplicates, sitemapMissing));
  fs.writeFileSync(path.join(ROOT, "SEO_INVENTORY_FLOXANT.md"), buildInventoryMarkdown(pages, generatedAt, DEFAULT_LOCAL_BASE_URL, sitemapMissing));

  console.log(
    `SEO_AUDIT_OK routes=${pages.length} critical=${summary.ratings.Kritisch || 0} weak=${summary.ratings.Schwach || 0} brokenLinks=${summary.brokenInternalLinks}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
