#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://www.floxant.de";
const sitemapUrl = `${baseUrl}/sitemap.xml`;
const gscFile = path.join(root, "artifacts", "gsc-page-opportunities-2026-08-11.csv");
const outputCsv = path.join(root, "artifacts", "round2-live-url-inventory.csv");
const outputJson = path.join(root, "artifacts", "round2-live-url-inventory.json");

const redirectDecisions = new Map([
  ["/regensburg/reinigungsfirma", "/regensburg/reinigung"],
  ["/regensburg/umzugsservice", "/regensburg/umzug"],
  ["/regensburg/umzugsunternehmen", "/regensburg/umzug"],
  ["/en/regensburg/moving-company", "/en/regensburg/moving"],
  ["/regensburg/uebergabereinigung", "/regensburg/reinigung-nach-umzug"],
  ["/regensburg/endreinigung", "/regensburg/reinigung-nach-umzug"],
  ["/regensburg/besenreine-uebergabe", "/regensburg/reinigung-nach-umzug"],
  ["/regensburg/haushaltsaufloesung", "/regensburg/wohnungsaufloesung"],
  ["/solarreinigung", "/pv-anlagen-reinigung"],
  ["/regensburg/solarreinigung", "/pv-anlagen-reinigung"],
  ["/rueckfahrt-boerse", "/leerfahrt-rueckfahrt"],
  ["/rueckfahrt-radar", "/leerfahrt-rueckfahrt"],
  ["/beiladung", "/leerfahrt-rueckfahrt"],
  ["/beiladung-regensburg", "/leerfahrt-rueckfahrt"],
  ["/angebot-pruefen", "/angebot-guenstiger-pruefen"],
  ["/angebotscheck", "/angebot-guenstiger-pruefen"],
  ["/fairpreis-check", "/angebot-guenstiger-pruefen"],
]);

const strengthen = new Set([
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/fensterreinigung",
  "/duesseldorf/grundreinigung",
  "/duesseldorf/unterhaltsreinigung",
  "/duesseldorf/baureinigung",
  "/duesseldorf/treppenhausreinigung",
  "/regensburg/reinigung",
  "/regensburg/umzug",
  "/regensburg/entruempelung",
  "/regensburg/wohnungsaufloesung",
  "/regensburg/reinigung-nach-umzug",
  "/pv-anlagen-reinigung",
  "/leerfahrt-rueckfahrt",
  "/angebot-guenstiger-pruefen",
  "/signature-services",
  "/en/signature-services",
  "/kontakt",
  "/en/contact",
]);

const plannedEnglishPages = [
  "/en/duesseldorf/deep-cleaning",
  "/en/duesseldorf/move-out-cleaning",
  "/en/duesseldorf/post-construction-cleaning",
  "/en/duesseldorf/maintenance-cleaning",
  "/en/duesseldorf/stairwell-cleaning",
  "/en/regensburg/piano-transport",
  "/en/regensburg/moving-help",
  "/en/regensburg/furniture-assembly",
  "/en/regensburg/commercial-cleaning",
  "/en/regensburg/practice-cleaning",
  "/en/regensburg/window-cleaning",
  "/en/regensburg/post-construction-cleaning",
  "/en/regensburg/senior-moving",
];
const plannedEnglishPageSet = new Set(plannedEnglishPages);

function parseCsv(value) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    if (quoted) {
      if (char === '"' && value[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else field += char;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  const [headers, ...data] = rows;
  return data.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function routeFromUrl(url) {
  const pathname = new URL(url).pathname.replace(/\/$/, "");
  return pathname || "/";
}

function classify(route) {
  const lower = route.toLowerCase();
  const language = lower === "/en" || lower.startsWith("/en/") ? "en" : "de";
  const region = lower.includes("duesseldorf")
    ? "Düsseldorf"
    : lower.includes("regensburg")
      ? "Regensburg"
      : "überregional";
  const pageType = lower.startsWith("/blog/") || lower.startsWith("/ratgeber/") || lower.startsWith("/wissen/")
    ? "Ratgeber"
    : lower.includes("kontakt") || lower.includes("buchen") || lower.includes("buchung")
      ? "Anfrage"
      : lower.includes("signature")
        ? "Signature Hub"
        : /^\/(?:en\/)?(?:duesseldorf|regensburg)$/.test(lower)
          ? "Standort-Hub"
          : "Service-/Informationsseite";
  const service = lower.includes("reinig") || lower.includes("cleaning")
    ? "Reinigung"
    : lower.includes("umzug") || lower.includes("moving") || lower.includes("transport") || lower.includes("rueckfahrt") || lower.includes("beiladung")
      ? "Umzug/Transport"
      : lower.includes("entruempel") || lower.includes("clearance") || lower.includes("aufloesung")
        ? "Räumung/Auflösung"
        : lower.includes("angebot") || lower.includes("quote")
          ? "Angebotsprüfung"
          : "übergreifend";
  const intent = pageType === "Ratgeber"
    ? "informational"
    : pageType === "Anfrage"
      ? "transactional"
      : service === "übergreifend"
        ? "navigational/informational"
        : "commercial/transactional";
  return { language, region, pageType, service, intent };
}

function extract(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || "";
}

function decide(route) {
  if (redirectDecisions.has(route)) return "301-Weiterleitung";
  if (route === "/suche" || route === "/en/search") return "noindex";
  if (plannedEnglishPageSet.has(route)) return "neu veröffentlicht";
  if (strengthen.has(route)) return "stärken";
  return "unverändert behalten";
}

async function crawl(url) {
  try {
    const response = await fetch(url, { redirect: "manual", headers: { "User-Agent": "FLOXANT-Round2-Inventory/1.0" } });
    const html = response.headers.get("content-type")?.includes("text/html") ? await response.text() : "";
    const canonical = extract(html, /<link[^>]+rel=["'][^"']*canonical[^"']*["'][^>]+href=["']([^"']+)/i)
      || extract(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["'][^"']*canonical/i);
    const robots = extract(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i)
      || extract(html, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots/i);
    const hreflang = [...html.matchAll(/<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)/gi)]
      .map((match) => `${match[1]}:${match[2]}`)
      .join(" | ");
    return {
      status: response.status,
      canonical,
      hreflang,
      indexing: /noindex/i.test(robots) ? "noindex" : response.status === 200 ? "index" : "nicht indexierbar",
    };
  } catch (error) {
    return { status: "Fehler", canonical: "", hreflang: "", indexing: "unklar", error: error instanceof Error ? error.message : String(error) };
  }
}

async function mapLimit(items, concurrency, worker) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await worker(items[index], index);
    }
  }));
  return results;
}

const [sitemapResponse, gscRaw] = await Promise.all([fetch(sitemapUrl), fs.readFile(gscFile, "utf8")]);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemapXml = await sitemapResponse.text();
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const liveRoutes = new Set(urls.map(routeFromUrl));
const gscByPath = new Map(parseCsv(gscRaw).map((row) => [row.path, row]));
const crawled = await mapLimit(urls, 8, crawl);

const inventory = urls.map((url, index) => {
  const route = routeFromUrl(url);
  const classification = classify(route);
  const gsc = gscByPath.get(route) || {};
  return {
    URL: url,
    Sprache: classification.language,
    Region: classification.region,
    Seitentyp: classification.pageType,
    Service: classification.service,
    Suchintention: classification.intent,
    Status: crawled[index].status,
    Indexierung: crawled[index].indexing,
    Canonical: crawled[index].canonical || "nicht ermittelt",
    Hreflang: crawled[index].hreflang || "nicht vorhanden",
    Klicks: gsc.clicks || "0",
    Impressionen: gsc.impressions || "0",
    CTR: gsc.ctrPercent ? `${gsc.ctrPercent}%` : "0%",
    Position: gsc.position || "nicht verfügbar",
    Leads: "nicht verfügbar",
    Entscheidung: decide(route),
  };
});

for (const route of plannedEnglishPages) {
  if (liveRoutes.has(route)) continue;
  const classification = classify(route);
  inventory.push({
    URL: `${baseUrl}${route}`,
    Sprache: classification.language,
    Region: classification.region,
    Seitentyp: "Service-Seite (geplant)",
    Service: classification.service,
    Suchintention: "commercial/transactional",
    Status: "vor Veröffentlichung nicht live",
    Indexierung: "index nach Qualitätsprüfung",
    Canonical: `${baseUrl}${route}`,
    Hreflang: "siehe Hreflang-Register; ohne echte Gegenroute nur en + x-default",
    Klicks: "0",
    Impressionen: "0",
    CTR: "0%",
    Position: "nicht verfügbar",
    Leads: "nicht verfügbar",
    Entscheidung: "neue Seite erstellen",
  });
}

const headers = ["URL", "Sprache", "Region", "Seitentyp", "Service", "Suchintention", "Status", "Indexierung", "Canonical", "Hreflang", "Klicks", "Impressionen", "CTR", "Position", "Leads", "Entscheidung"];
const csv = [headers.join(","), ...inventory.map((row) => headers.map((header) => csvCell(row[header])).join(","))].join("\n");
await Promise.all([
  fs.writeFile(outputCsv, `\ufeff${csv}\n`, "utf8"),
  fs.writeFile(outputJson, `${JSON.stringify({ generatedAt: new Date().toISOString(), source: sitemapUrl, rows: inventory }, null, 2)}\n`, "utf8"),
]);

console.log(JSON.stringify({
  sitemapUrls: urls.length,
  plannedPages: plannedEnglishPages.length,
  plannedPagesNotLive: plannedEnglishPages.filter((route) => !liveRoutes.has(route)).length,
  inventoryRows: inventory.length,
  outputCsv,
  outputJson,
}, null, 2));
