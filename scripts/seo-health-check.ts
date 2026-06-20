#!/usr/bin/env node
// @ts-nocheck

const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { pathToFileURL } = require("node:url");

const ROOT = process.cwd();
const PUBLIC_BASE_URL = "https://www.floxant.de";
const PORT = Number(process.env.SEO_HEALTH_PORT || 3211);
const EXPLICIT_BASE_URL = process.env.SEO_HEALTH_BASE_URL || "";
const DEFAULT_BASE_URL = `http://127.0.0.1:${PORT}`;
const START_TIMEOUT_MS = Number(process.env.SEO_HEALTH_START_TIMEOUT_MS || 45000);
const FETCH_TIMEOUT_MS = Number(process.env.SEO_HEALTH_FETCH_TIMEOUT_MS || 25000);

const REPORT_FILES = {
  markdown: path.join(ROOT, "SEO_HEALTH_REPORT.md"),
  json: path.join(ROOT, "seo-health-report.json"),
  snippetMatrix: path.join(ROOT, "SEO_SNIPPET_MATRIX.md"),
  indexingActions: path.join(ROOT, "GSC_INDEXING_ACTIONS.md"),
  canonicalMap: path.join(ROOT, "SEO_CANONICAL_MAP.md"),
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeRoute(value) {
  if (!value) return "/";
  let pathname = value;
  try {
    pathname = new URL(value, PUBLIC_BASE_URL).pathname;
  } catch {
    pathname = String(value);
  }

  const clean = pathname.split("#")[0].split("?")[0].replace(/\/+$/, "");
  return clean ? (clean.startsWith("/") ? clean : `/${clean}`) : "/";
}

function canonicalUrl(route) {
  const normalized = normalizeRoute(route);
  return `${PUBLIC_BASE_URL}${normalized === "/" ? "" : normalized}`;
}

function decodeHtml(value = "") {
  return String(value)
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

function collectHreflangs(html) {
  const items = [];
  const tagRegex = /<link\b[^>]*>/gi;
  let match;
  while ((match = tagRegex.exec(html))) {
    const attrs = getAttrs(match[0]);
    const rel = (attrs.rel || "").toLowerCase().split(/\s+/);
    if (rel.includes("alternate") && attrs.hreflang && attrs.href) {
      items.push({
        hreflang: attrs.hreflang,
        href: attrs.href,
        path: normalizeRoute(attrs.href),
      });
    }
  }
  return items;
}

function getHeadings(html, level) {
  const regex = new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, "gi");
  return Array.from(html.matchAll(regex), (match) => stripTags(match[1])).filter(Boolean);
}

function collectJsonLd(html) {
  const regex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const types = [];
  const errors = [];
  let count = 0;
  let match;

  while ((match = regex.exec(html))) {
    count += 1;
    try {
      const parsed = JSON.parse(decodeHtml(match[1]).trim());
      const nodes = Array.isArray(parsed?.["@graph"]) ? parsed["@graph"] : [parsed];
      for (const node of nodes) {
        const type = node?.["@type"];
        if (Array.isArray(type)) types.push(...type);
        else if (type) types.push(type);
      }
    } catch (error) {
      errors.push(error.message);
    }
  }

  return {
    count,
    types: Array.from(new Set(types)),
    valid: errors.length === 0,
    errors,
  };
}

function collectAnchors(html) {
  const anchors = [];
  const anchorRegex = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchorRegex.exec(html))) {
    const attrs = getAttrs(`<a ${match[1]}>`);
    const href = attrs.href || "";
    if (!href || href.startsWith("#")) continue;
    if (/^(mailto|tel|sms|whatsapp|javascript):/i.test(href)) continue;
    let url;
    try {
      url = new URL(href, PUBLIC_BASE_URL);
    } catch {
      continue;
    }
    if (url.origin !== PUBLIC_BASE_URL) continue;
    if (url.pathname.startsWith("/_next/") || url.pathname.startsWith("/api/")) continue;
    anchors.push({
      href,
      path: normalizeRoute(url.pathname),
      text: stripTags(match[2]),
      attrs,
    });
  }
  return anchors;
}

function collectSeoCtas(html) {
  const items = [];
  const tagRegex = /<(a|button|form)\b[^>]*data-event\s*=\s*["']seo_cta_click["'][^>]*>/gi;
  let match;
  while ((match = tagRegex.exec(html))) {
    items.push({
      tag: match[1].toLowerCase(),
      attrs: getAttrs(match[0]),
      index: match.index,
    });
  }
  return items;
}

function containsPersian(value) {
  return /[\u0600-\u06ff]/.test(value || "");
}

function looksGerman(value) {
  return /\b(umzug|reinigung|entruempelung|entrümpelung|angebot|kontakt|wohnung|firma|büro|buero)\b/i.test(
    value || "",
  );
}

function readSitemapRoutes() {
  const sitemapFile = path.join(ROOT, "lib", "sitemap-routes.ts");
  if (!fs.existsSync(sitemapFile)) return new Set();
  const source = fs.readFileSync(sitemapFile, "utf8");
  return new Set(Array.from(source.matchAll(/"([^"]+)"/g), (match) => normalizeRoute(match[1])));
}

async function loadSeoMoneyPages() {
  const fileUrl = pathToFileURL(path.join(ROOT, "lib", "gsc-click-priorities.ts")).href;
  const seoModule = await import(fileUrl);
  if (!Array.isArray(seoModule.seoMoneyPages)) {
    throw new Error("seoMoneyPages export fehlt in lib/gsc-click-priorities.ts");
  }
  return seoModule.seoMoneyPages;
}

async function probeBaseUrl(baseUrl) {
  try {
    const response = await fetch(baseUrl, {
      redirect: "manual",
      signal: AbortSignal.timeout(5000),
    });
    return response.status > 0 && response.status < 500;
  } catch {
    return false;
  }
}

async function startNextServerIfNeeded() {
  const baseUrl = EXPLICIT_BASE_URL || DEFAULT_BASE_URL;
  if (await probeBaseUrl(baseUrl)) {
    return { baseUrl, child: null, started: false };
  }

  if (EXPLICIT_BASE_URL) {
    throw new Error(`SEO_HEALTH_BASE_URL nicht erreichbar: ${EXPLICIT_BASE_URL}`);
  }

  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  if (!fs.existsSync(nextBin)) {
    throw new Error("Next.js Binary nicht gefunden. Bitte npm install ausfuehren.");
  }

  const child = spawn(process.execPath, [nextBin, "start", "--port", String(PORT)], {
    cwd: ROOT,
    env: { ...process.env, PORT: String(PORT) },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  const startedAt = Date.now();
  while (Date.now() - startedAt < START_TIMEOUT_MS) {
    if (child.exitCode !== null) {
      throw new Error(`next start wurde beendet, bevor der Health-Check starten konnte:\n${output}`);
    }
    if (await probeBaseUrl(baseUrl)) {
      return { baseUrl, child, started: true };
    }
    await sleep(750);
  }

  child.kill();
  throw new Error(`next start auf ${baseUrl} nicht rechtzeitig erreichbar:\n${output}`);
}

async function stopNextServer(child) {
  if (!child) return;
  child.kill();
  await sleep(500);
}

async function fetchWithRedirects(baseUrl, route) {
  let current = new URL(route, baseUrl).toString();
  const redirects = [];

  for (let hop = 0; hop < 8; hop += 1) {
    const response = await fetch(current, {
      redirect: "manual",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    const location = response.headers.get("location");

    if (response.status >= 300 && response.status < 400 && location) {
      const nextUrl = new URL(location, current).toString();
      redirects.push({
        status: response.status,
        from: current,
        to: nextUrl,
      });
      current = nextUrl;
      continue;
    }

    const contentType = response.headers.get("content-type") || "";
    const html = contentType.includes("text/html") ? await response.text() : "";
    return { response, html, finalUrl: current, redirects };
  }

  throw new Error(`Zu viele Redirects fuer ${route}`);
}

async function fetchStatusForPath(baseUrl, route) {
  try {
    const { response } = await fetchWithRedirects(baseUrl, route);
    return response.status;
  } catch {
    return 0;
  }
}

function buildPageStatus(issues, warnings) {
  if (issues.length) return "FAIL";
  if (warnings.length) return "WARN";
  return "PASS";
}

async function auditPage(baseUrl, page, sitemapRoutes, canonicalMoneyPages) {
  const issues = [];
  const warnings = [];
  let fetched;

  try {
    fetched = await fetchWithRedirects(baseUrl, page.path);
  } catch (error) {
    return {
      ...page,
      url: page.path,
      status: 0,
      title: "",
      titleLength: 0,
      description: "",
      descriptionLength: 0,
      h1: [],
      canonical: "",
      indexable: false,
      hreflangStatus: "not_checked",
      jsonLdTypes: [],
      ctaFound: false,
      seoCtaEventFound: false,
      internalLinksCount: 0,
      moneyPageLinks: [],
      sitemapIncluded: sitemapRoutes.has(page.canonicalPath),
      issues: [`Fetch fehlgeschlagen: ${error.message}`],
      warnings,
      redirectChain: [],
      result: "FAIL",
    };
  }

  const { response, html, finalUrl, redirects } = fetched;
  const finalPath = normalizeRoute(finalUrl);
  const title = stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  const description = findMetaContent(html, "description");
  const robotsMeta = findMetaContent(html, "robots");
  const robotsHeader = response.headers.get("x-robots-tag") || "";
  const robotsCombined = `${robotsMeta},${robotsHeader}`.toLowerCase();
  const h1 = getHeadings(html, 1);
  const canonical = findLinkHref(html, "canonical");
  const normalizedCanonical = canonicalUrl(normalizeRoute(canonical));
  const expectedCanonical = canonicalUrl(page.canonicalPath);
  const hreflangs = collectHreflangs(html);
  const jsonLd = collectJsonLd(html);
  const anchors = collectAnchors(html);
  const seoCtas = collectSeoCtas(html);
  const bodyStart = html.search(/<main\b|<body\b/i);
  const firstSeoCta = seoCtas[0];
  const ctaAboveFold = Boolean(firstSeoCta && (bodyStart < 0 || firstSeoCta.index - bodyStart < 45000));
  const canonicalSitemapIncluded = sitemapRoutes.has(page.canonicalPath);
  const duplicateSitemapIncluded = page.path !== page.canonicalPath && sitemapRoutes.has(page.path);
  const moneyPageLinks = Array.from(
    new Set(anchors.map((anchor) => anchor.path).filter((route) => canonicalMoneyPages.has(route))),
  ).sort();
  const internalLinks = Array.from(new Set(anchors.map((anchor) => anchor.path))).sort();

  if (response.status !== 200) issues.push(`HTTP-Status ${response.status}`);
  if (!title) issues.push("Title fehlt");
  if (title && (title.length < 30 || title.length > 72)) warnings.push(`Title-Laenge ${title.length}`);
  if (!description) issues.push("Meta Description fehlt");
  if (description && (description.length < 110 || description.length > 220)) {
    warnings.push(`Meta-Description-Laenge ${description.length}`);
  }
  if (h1.length === 0) issues.push("H1 fehlt");
  if (h1.length > 1) warnings.push(`${h1.length} H1 gefunden`);
  if (!canonical) issues.push("Canonical fehlt");
  else if (normalizedCanonical !== expectedCanonical) {
    issues.push(`Canonical ${normalizedCanonical} erwartet ${expectedCanonical}`);
  }
  if (page.shouldBeIndexable && robotsCombined.includes("noindex")) {
    issues.push("Money-Page ist noindex");
  }
  if (!hreflangs.length) {
    warnings.push("hreflang fehlt");
  }
  if (hreflangs.some((item) => item.path.startsWith("/fa/"))) {
    issues.push("hreflang zeigt auf fa-Variante");
  }
  if (jsonLd.count === 0) warnings.push("JSON-LD fehlt");
  if (!jsonLd.valid) issues.push("JSON-LD ist nicht valide");
  for (const expectedType of page.expectedSchemaTypes) {
    if (!jsonLd.types.includes(expectedType)) warnings.push(`Schema ${expectedType} nicht gefunden`);
  }
  if (jsonLd.types.includes("FAQPage") && !/(faq|fragen|<details\b)/i.test(html)) {
    warnings.push("FAQPage vorhanden, aber keine sichtbare FAQ-Struktur erkannt");
  }
  if (!seoCtas.length) issues.push('data-event="seo_cta_click" fehlt');
  if (!ctaAboveFold) warnings.push("SEO-CTA nicht im ersten Hauptbereich erkannt");
  for (const cta of seoCtas) {
    const attrs = cta.attrs;
    const missing = ["data-service", "data-city", "data-page-intent", "data-priority", "data-cta-label"].filter(
      (name) => !attrs[name],
    );
    if (missing.length) warnings.push(`SEO-CTA ohne ${missing.join(", ")}`);
  }
  for (const expectedLink of page.expectedRelatedLinks) {
    if (!internalLinks.includes(expectedLink)) warnings.push(`erwarteter interner Link fehlt: ${expectedLink}`);
  }
  if (!canonicalSitemapIncluded && page.shouldBeInSitemap) {
    issues.push(`Canonical fehlt in Sitemap: ${page.canonicalPath}`);
  }
  if (duplicateSitemapIncluded) {
    issues.push(`Nicht-kanonische Variante steht in Sitemap: ${page.path}`);
  }
  if (page.language === "de" && containsPersian(`${title} ${description} ${h1.join(" ")}`)) {
    issues.push("deutsche Zielseite enthaelt persische Meta-/H1-Signale");
  }
  if (page.language === "fa" && finalPath.startsWith("/fa/") && looksGerman(description)) {
    issues.push("/fa/-URL mit deutscher Meta Description");
  }
  if (page.language === "fa" && !redirects.length) {
    warnings.push("/fa/-Variante leitet nicht auf die kanonische deutsche Seite weiter");
  }
  if (page.path.startsWith("/de/") && !redirects.length) {
    warnings.push("/de/-Variante leitet nicht auf die kanonische URL weiter");
  }

  const hreflangBroken = [];
  for (const alternate of hreflangs) {
    if (alternate.path === page.path || alternate.path === page.canonicalPath) continue;
    const status = await fetchStatusForPath(baseUrl, alternate.path);
    if (status >= 400 || status === 0) hreflangBroken.push(`${alternate.hreflang}:${alternate.path} (${status})`);
  }
  if (hreflangBroken.length) issues.push(`hreflang kaputt: ${hreflangBroken.join(", ")}`);

  const brokenInternalLinks = [];
  for (const route of internalLinks.slice(0, 80)) {
    if (sitemapRoutes.has(route) || canonicalMoneyPages.has(route)) continue;
    if (route.startsWith("/de/") || route.startsWith("/fa/")) continue;
    const status = await fetchStatusForPath(baseUrl, route);
    if (status >= 400 || status === 0) brokenInternalLinks.push(`${route} (${status})`);
  }
  if (brokenInternalLinks.length) issues.push(`kaputte interne Links: ${brokenInternalLinks.slice(0, 8).join(", ")}`);

  return {
    ...page,
    url: page.path,
    finalUrl,
    finalPath,
    status: response.status,
    title,
    titleLength: title.length,
    description,
    descriptionLength: description.length,
    h1,
    canonical: normalizedCanonical || canonical,
    expectedCanonical,
    indexable: !robotsCombined.includes("noindex"),
    hreflangStatus: hreflangs.length && !hreflangBroken.length ? "ok" : hreflangs.length ? "warn" : "missing",
    hreflangs,
    jsonLdTypes: jsonLd.types,
    jsonLdValid: jsonLd.valid,
    ctaFound: seoCtas.length > 0,
    seoCtaEventFound: seoCtas.length > 0,
    internalLinksCount: internalLinks.length,
    moneyPageLinks,
    sitemapIncluded: canonicalSitemapIncluded,
    duplicateSitemapIncluded,
    issues,
    warnings: Array.from(new Set(warnings)),
    redirectChain: redirects.map((redirect) => ({
      status: redirect.status,
      from: normalizeRoute(redirect.from),
      to: normalizeRoute(redirect.to),
    })),
    result: buildPageStatus(issues, warnings),
  };
}

function mdEscape(value) {
  return String(value || "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function buildHealthMarkdown(results, generatedAt, baseUrl) {
  const failCount = results.filter((item) => item.result === "FAIL").length;
  const warnCount = results.filter((item) => item.result === "WARN").length;
  const overall = failCount ? "FAIL" : warnCount ? "WARN" : "PASS";
  const lines = [
    "# SEO Health Report",
    "",
    `Zeitpunkt: ${generatedAt}`,
    `Getestete Base-URL: ${baseUrl}`,
    `Gesamtstatus: ${overall}`,
    "",
    "## Money-Page-Tabelle",
    "",
    "| URL | Status | Title | Desc | H1 | Canonical | Index | Hreflang | JSON-LD | CTA | Sitemap | Ergebnis |",
    "| --- | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- |",
    ...results.map((item) =>
      [
        mdEscape(item.url),
        item.status,
        item.titleLength,
        item.descriptionLength,
        item.h1.length,
        item.canonical === item.expectedCanonical ? "ok" : "prüfen",
        item.indexable ? "index" : "noindex",
        item.hreflangStatus,
        item.jsonLdTypes.join(", ") || "fehlt",
        item.seoCtaEventFound ? "ok" : "fehlt",
        item.sitemapIncluded ? "ok" : "fehlt",
        item.result,
      ].join(" | ").replace(/^/, "| ").replace(/$/, " |"),
    ),
    "",
    "## Konkrete Fehler",
    "",
  ];

  const issueRows = results.flatMap((item) => item.issues.map((issue) => `- ${item.url}: ${issue}`));
  lines.push(...(issueRows.length ? issueRows : ["- keine"]), "", "## Konkrete Warnungen", "");
  const warningRows = results.flatMap((item) => item.warnings.map((warning) => `- ${item.url}: ${warning}`));
  lines.push(...(warningRows.length ? warningRows : ["- keine"]), "", "## Empfohlene manuelle Prüfung", "");
  lines.push(
    "- In Google Search Console die Canonical-Auswahl für alle `/de/`-Varianten prüfen.",
    "- `/fa/reinigung-muenchen` nur kontrollieren, nicht aktiv als persische Zielseite pushen.",
    "- CTR nach 72 Stunden und 7 Tagen gegen `SEO_SNIPPET_MATRIX.md` bewerten.",
    "- Kontaktformular mobil einmal live testen, ohne personenbezogene Testdaten dauerhaft zu speichern.",
    "",
  );

  return `${lines.join("\n")}\n`;
}

function buildSnippetMatrix(results, generatedAt) {
  const lines = [
    "# SEO Snippet Matrix",
    "",
    `Stand: ${generatedAt}`,
    "",
    "Regel: Titles und Meta-Descriptions werden nicht täglich geändert. Änderungen erfolgen nur nach neuen GSC-Daten.",
    "",
    "| URL | Zielquery | Title | Title-Länge | Meta | Meta-Länge | H1 | Suchintent | Snippet-Risiko | Beobachtung | Nächste Änderung nur wenn |",
    "| --- | --- | --- | ---: | --- | ---: | --- | --- | --- | --- | --- |",
    ...results.map((item) => {
      const risk = item.titleLength < 30 || item.descriptionLength < 110 ? "Snippet zu dünn" : item.result;
      return [
        mdEscape(item.canonicalPath),
        mdEscape(item.targetQueries[0]),
        mdEscape(item.title),
        item.titleLength,
        mdEscape(item.description),
        item.descriptionLength,
        mdEscape(item.h1[0] || ""),
        mdEscape(item.intent),
        risk,
        "72h, danach 7 Tage",
        "GSC-Kriterium erfüllt",
      ].join(" | ").replace(/^/, "| ").replace(/$/, " |");
    }),
    "",
    "## Entscheidungskriterien nach 72 Stunden",
    "",
    "- Position 1-10 und CTR 0 Prozent: Snippet, Trust-Signal und Title prüfen.",
    "- Position 11-20: interne Links und sichtbaren Content-Abschnitt stärken.",
    "- Position 21-50: Relevanz und Suchintent prüfen.",
    "- Position 50+: technische Indexierung, Canonical, Sitemap und interne Links prüfen.",
    "- Impressionen unter 10: nicht anfassen, weiter beobachten.",
    "",
    "## Entscheidungskriterien nach 7 Tagen",
    "",
    "- Seiten mit mehr als 100 Impressionen und CTR 0 Prozent priorisieren.",
    "- Seiten mit steigender Position nicht unnötig ändern.",
    "- Seiten mit fallender Position auf Content und Intent prüfen.",
    "",
  ];

  return `${lines.join("\n")}\n`;
}

function buildIndexingActions(results, generatedAt) {
  const submitRows = results.filter((item) => item.language === "de");
  const checkOnlyRows = results.filter((item) => item.path !== item.canonicalPath || item.language === "fa");
  const lines = [
    "# GSC Indexing Actions",
    "",
    `Stand: ${generatedAt}`,
    "",
    "## Sofort prüfen/einreichen",
    "",
    "| GSC-URL | Erwarteter Canonical | Status | Sitemap | Sprache | Zielquery | Grund | Priorität |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...submitRows.map((item) =>
      [
        mdEscape(item.path),
        mdEscape(item.canonicalPath),
        item.status === 200 ? "200 final" : String(item.status),
        item.sitemapIncluded ? "canonical enthalten" : "prüfen",
        "de-DE",
        mdEscape(item.targetQueries[0]),
        item.path === item.canonicalPath ? "Money-Page überwachen" : "Redirect/Canonical kontrollieren",
        item.priority,
      ].join(" | ").replace(/^/, "| ").replace(/$/, " |"),
    ),
    "",
    "## Nicht aktiv einreichen",
    "",
    "- `/fa/reinigung-muenchen`: nur i18n/Canonical prüfen, keine persische Zielseite pushen.",
    "- `/de/*`-Varianten: in GSC prüfen, aber Canonical-URL als Ziel bewerten.",
    "- `/de/studentenumzug-vohenstrauss`: nur Redirect auf `/umzug-vohenstrauss` kontrollieren, keine Studentenumzug-Seite aufbauen.",
    "",
    "## Duplicate-/Varianten-URLs nur kontrollieren",
    "",
    ...checkOnlyRows.map((item) => `- ${item.path} -> erwartet ${item.canonicalPath}`),
    "",
  ];

  return `${lines.join("\n")}\n`;
}

function buildCanonicalMap(results, generatedAt) {
  const groups = [
    {
      name: "Düsseldorf",
      canonical: "/duesseldorf/reinigung",
      variants: ["/de/duesseldorf", "/de/duesseldorf/reinigung", "/de/duesseldorf/bueroreinigung", "/de/duesseldorf/gewerbereinigung", "/reinigung-duesseldorf"],
      rule: "City-Hub und Service-Seiten getrennt halten; Root-Slugs auf City-first-Servicepfade führen.",
    },
    {
      name: "Regensburg",
      canonical: "/regensburg/wohnungsaufloesung",
      variants: ["/de/regensburg/umzug", "/de/umzug-regensburg", "/de/regensburg/entruempelung", "/de/entruempelung-regensburg", "/de/wohnungsaufloesung-regensburg", "/de/regensburg/wohnungsaufloesung"],
      rule: "City-first-Pfade stärken; klassische Root-Slugs nur behalten, wenn sie eigene GSC-Signale tragen.",
    },
    {
      name: "München",
      canonical: "/reinigung-muenchen",
      variants: ["/de/reinigung-muenchen", "/fa/reinigung-muenchen", "/de/umzug-muenchen", "/de/fernumzug-muenchen", "/de/reinigung-nach-umzug-muenchen"],
      rule: "Locale-Varianten redirecten; Reinigungs- und Umzugsintent nicht vermischen.",
    },
    {
      name: "Senioren",
      canonical: "/seniorenumzug-bayern",
      variants: ["/de/seniorenumzug-bayern", "/de/umzug-im-alter-bayern", "/de/umzugshelfer-senioren-bayern", "/de/seniorenumzug-erlangen", "/de/seniorenumzug-bamberg"],
      rule: "Bayern-Hub intern stärken; Stadtvarianten nur bei eigener Substanz und GSC-Signal behalten.",
    },
  ];
  const lines = [
    "# SEO Canonical Map",
    "",
    `Stand: ${generatedAt}`,
    "",
  ];

  for (const group of groups) {
    lines.push(
      `## ${group.name}`,
      "",
      `- Kanonische Haupt-URL: ${group.canonical}`,
      `- Unterstützende URLs: ${results
        .filter((item) => item.city === group.name.toLowerCase() || group.variants.includes(item.path))
        .map((item) => item.canonicalPath)
        .filter((value, index, array) => array.indexOf(value) === index)
        .join(", ") || "siehe Varianten"}`,
      `- Duplicate-/Varianten-URLs: ${group.variants.join(", ")}`,
      "- Redirect-Kandidaten: klare Locale- und Legacy-Varianten mit gleichem Intent.",
      "- Canonical-Kandidaten: nur Varianten mit separatem Suchintent behalten.",
      `- Interne Link-Regel: ${group.rule}`,
      "- Sitemap-Regel: nur indexierbare kanonische URLs aufnehmen, keine `/de/`- oder `/fa/`-Duplicates.",
      "",
    );
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const generatedAt = new Date().toISOString();
  const moneyPages = await loadSeoMoneyPages();
  const sitemapRoutes = readSitemapRoutes();
  const canonicalMoneyPages = new Set(moneyPages.map((page) => page.canonicalPath));
  const server = await startNextServerIfNeeded();

  try {
    const results = [];
    for (const page of moneyPages) {
      results.push(await auditPage(server.baseUrl, page, sitemapRoutes, canonicalMoneyPages));
    }

    const summary = {
      generatedAt,
      baseUrl: server.baseUrl,
      checkedUrls: results.length,
      pass: results.filter((item) => item.result === "PASS").length,
      warn: results.filter((item) => item.result === "WARN").length,
      fail: results.filter((item) => item.result === "FAIL").length,
      startedServer: server.started,
    };
    const output = { summary, pages: results };

    fs.writeFileSync(REPORT_FILES.json, `${JSON.stringify(output, null, 2)}\n`, "utf8");
    fs.writeFileSync(REPORT_FILES.markdown, buildHealthMarkdown(results, generatedAt, server.baseUrl), "utf8");
    fs.writeFileSync(REPORT_FILES.snippetMatrix, buildSnippetMatrix(results, generatedAt), "utf8");
    fs.writeFileSync(REPORT_FILES.indexingActions, buildIndexingActions(results, generatedAt), "utf8");
    fs.writeFileSync(REPORT_FILES.canonicalMap, buildCanonicalMap(results, generatedAt), "utf8");

    const status = summary.fail ? "SEO_HEALTH_FAIL" : summary.warn ? "SEO_HEALTH_WARN" : "SEO_HEALTH_PASS";
    console.log(
      `${status} checked=${summary.checkedUrls} pass=${summary.pass} warn=${summary.warn} fail=${summary.fail} baseUrl=${server.baseUrl}`,
    );
  } finally {
    await stopNextServer(server.child);
  }
}

main().catch((error) => {
  console.error(`SEO_HEALTH_ERROR ${error.message}`);
  process.exit(1);
});
