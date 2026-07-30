#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const outRoot = path.join(root, "out");
const sitemapFile = path.join(outRoot, "sitemap.xml");
const outputFile = path.join(root, "artifacts", "page-intent-alignment.csv");

if (!fs.existsSync(sitemapFile)) {
  console.error("Page-intent audit requires out/sitemap.xml. Run npm run build first.");
  process.exit(1);
}

const siteUrl = "https://www.floxant.de";
const priorityIntent = new Map([
  ["/", ["FLOXANT Leistungen", "Passende Leistung und Standort finden"]],
  ["/leistungen", ["Leistungsübersicht", "Leistungen nach Standort auswählen"]],
  ["/duesseldorf", ["Reinigung", "Reinigungsleistungen in Düsseldorf auswählen"]],
  ["/duesseldorf/reinigung", ["Reinigung", "Reinigung in Düsseldorf anfragen"]],
  ["/duesseldorf/bueroreinigung", ["Büroreinigung", "Büroreinigung in Düsseldorf anfragen"]],
  ["/duesseldorf/praxisreinigung", ["Praxisreinigung", "Praxisreinigung in Düsseldorf anfragen"]],
  ["/duesseldorf/fensterreinigung", ["Fensterreinigung", "Fensterreinigung in Düsseldorf anfragen"]],
  ["/duesseldorf/grundreinigung", ["Grundreinigung", "Grundreinigung in Düsseldorf anfragen"]],
  ["/duesseldorf/unterhaltsreinigung", ["Unterhaltsreinigung", "Unterhaltsreinigung in Düsseldorf anfragen"]],
  ["/duesseldorf/baureinigung", ["Bau- und Bauendreinigung", "Bauendreinigung in Düsseldorf anfragen"]],
  ["/regensburg", ["Umzug, Entrümpelung und Reinigung", "Leistungen in Regensburg auswählen"]],
  ["/regensburg/umzug", ["Umzug", "Umzug mit Start oder Ziel in Regensburg anfragen"]],
  ["/regensburg/entruempelung", ["Entrümpelung", "Entrümpelung in Regensburg anfragen"]],
  ["/regensburg/wohnungsaufloesung", ["Wohnungsauflösung", "Wohnungsauflösung in Regensburg anfragen"]],
  ["/klaviertransport-regensburg", ["Klaviertransport", "Klaviertransport in Regensburg vorbereiten"]],
  ["/kontakt", ["Kontakt", "Anfrage sicher übermitteln"]],
]);

const serviceRules = [
  [/(?:bueroreinigung|office-cleaning)/, "Büroreinigung", ["buero", "büro", "office"]],
  [/(?:praxisreinigung|practice-cleaning)/, "Praxisreinigung", ["praxis", "practice"]],
  [/(?:fensterreinigung|window-cleaning)/, "Fensterreinigung", ["fenster", "window"]],
  [/(?:grundreinigung|deep-cleaning)/, "Grundreinigung", ["grundreinigung", "deep cleaning"]],
  [/(?:unterhaltsreinigung|maintenance-cleaning)/, "Unterhaltsreinigung", ["unterhaltsreinigung", "maintenance cleaning"]],
  [/(?:baureinigung|bauendreinigung|post-construction-cleaning)/, "Bauendreinigung", ["bau", "construction"]],
  [/(?:treppenhausreinigung|stairwell-cleaning)/, "Treppenhausreinigung", ["treppenhaus", "stairwell"]],
  [/(?:gewerbereinigung|commercial-cleaning)/, "Gewerbereinigung", ["gewerbe", "commercial"]],
  [/(?:klaviertransport|piano-transport)/, "Klaviertransport", ["klavier", "piano"]],
  [/(?:seniorenumzug|senior-moving)/, "Seniorenumzug", ["seniorenumzug", "senior"]],
  [/(?:umzug|moving)/, "Umzug", ["umzug", "moving"]],
  [/(?:entruempelung|clearance)/, "Entrümpelung", ["entruempelung", "entrümpelung", "clearance"]],
  [/(?:wohnungsaufloesung|haushaltsaufloesung|household-clearance)/, "Wohnungsauflösung", ["aufloesung", "auflösung", "clearance"]],
  [/(?:angebot|offer|quote)/, "Angebotsprüfung", ["angebot", "offer", "quote"]],
  [/(?:reinigung|cleaning)/, "Reinigung", ["reinigung", "cleaning"]],
];

const internalTerms =
  /\b(?:seo|ranking|keyword|search intent|query|conversion|lead|funnel|payload|mapping|routing|registry|audit|qa|health check|canonical mapping|local proof|trust proof|visual proof|servicefit|signature-empfehlung|performance budget|ai discoverability|gsc|serp|event tracking|datenmodell|marketing-modul|google-ads-landingpage)\b/i;

function decode(value) {
  return String(value || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&auml;/gi, "ä")
    .replace(/&ouml;/gi, "ö")
    .replace(/&uuml;/gi, "ü")
    .replace(/&Auml;/g, "Ä")
    .replace(/&Ouml;/g, "Ö")
    .replace(/&Uuml;/g, "Ü")
    .replace(/&szlig;/gi, "ß")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(value) {
  return decode(
    String(value || "")
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
}

function fold(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function capture(html, pattern) {
  return stripHtml(html.match(pattern)?.[1] || "");
}

function metaContent(html, key) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const name = tag.match(/\b(?:name|property)=["']([^"']+)["']/i)?.[1] || "";
    if (name.toLowerCase() !== key.toLowerCase()) continue;
    return decode(tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] || "");
  }
  return "";
}

function canonical(html) {
  const tag = (html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i) || html.match(/<link\b[^>]*href=["'][^"']+["'][^>]*rel=["']canonical["'][^>]*>/i))?.[0] || "";
  return decode(tag.match(/\bhref=["']([^"']+)["']/i)?.[1] || "");
}

function htmlFile(route) {
  const clean = route === "/" ? "" : route.replace(/^\/+/, "");
  const candidates = route === "/"
    ? [path.join(outRoot, "index.html")]
    : [path.join(outRoot, `${clean}.html`), path.join(outRoot, clean, "index.html")];
  return candidates.find((file) => fs.existsSync(file)) || null;
}

function routeLocation(route) {
  if (/duesseldorf/i.test(route)) return "Düsseldorf";
  if (/regensburg/i.test(route)) return "Regensburg";
  return "Überregional";
}

function routeType(route) {
  if (route === "/") return "homepage";
  if (["/duesseldorf", "/regensburg", "/standorte"].includes(route)) return "location_hub";
  if (["/leistungen", "/en/services"].includes(route)) return "service_hub";
  if (["/fragen", "/en/questions"].includes(route)) return "faq_hub";
  if (/^\/(?:blog|ratgeber|wissen)(?:\/|$)/.test(route) || route === "/en/blog") return "guide";
  if (["/kontakt", "/en/contact"].includes(route)) return "contact";
  if (["/suche", "/service-finder", "/en/search", "/en/service-finder"].includes(route)) return "tool";
  if (["/impressum", "/datenschutz", "/agb"].includes(route)) return "legal";
  return "service";
}

function routeService(route) {
  const priority = priorityIntent.get(route);
  if (priority) return priority[0];
  return serviceRules.find(([pattern]) => pattern.test(route))?.[1] || (routeType(route) === "guide" ? "Ratgeber" : "Information und Anfrage");
}

function expectedTokens(route) {
  const rule = serviceRules.find(([pattern]) => pattern.test(route));
  return rule?.[2] || [];
}

function firstParagraph(main) {
  for (const match of main.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    const text = stripHtml(match[1]);
    if (text.length >= 50) return text;
  }
  return "";
}

function extractCta(main) {
  const anchors = [...main.matchAll(/<(?:a|button)\b[^>]*>([\s\S]*?)<\/(?:a|button)>/gi)]
    .map((match) => stripHtml(match[1]))
    .filter((text) => /\b(?:anfragen|kontakt|prüfen|finden|request|contact|enquir)/i.test(text));
  return anchors[0] || "";
}

function sectionDecisions(main, route) {
  const headings = [...main.matchAll(/<h[2-3]\b[^>]*>([\s\S]*?)<\/h[2-3]>/gi)]
    .map((match) => stripHtml(match[1]))
    .filter(Boolean);
  const location = routeLocation(route);
  const service = routeService(route);

  return headings.slice(0, 18).map((heading) => {
    const folded = fold(heading);
    if (internalTerms.test(heading)) return `${heading}:REWRITE`;
    if (location === "Düsseldorf" && /\bregensburg\b/.test(folded)) return `${heading}:MOVE`;
    if (location === "Regensburg" && /\bdusseldorf\b/.test(folded)) return `${heading}:MOVE`;
    if (service === "Klaviertransport" && /\breinigung|entruempelung|auflosung\b/.test(folded)) return `${heading}:MANUAL_REVIEW`;
    return `${heading}:KEEP`;
  });
}

function csv(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

const sitemap = fs.readFileSync(sitemapFile, "utf8");
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((match) => new URL(decode(match[1])).pathname.replace(/\/+$/, "") || "/")
  .filter((route, index, values) => values.indexOf(route) === index);
const rows = [];

for (const route of routes) {
  const file = htmlFile(route);
  const language = route === "/en" || route.startsWith("/en/") ? "en" : "de";
  const location = routeLocation(route);
  const pageType = routeType(route);
  const service = routeService(route);
  let issue = "";
  let classification = "KEEP";

  if (!file) {
    rows.push({
      url: route,
      language,
      location,
      pageType,
      service,
      primaryIntent: priorityIntent.get(route)?.[1] || `${service} verständlich erklären`,
      secondaryIntent: "Umfang, Zugang, Zeitraum und nächsten Schritt klären",
      currentH1: "",
      recommendedH1: `${service}${location === "Überregional" ? "" : ` in ${location}`} klar anfragen`,
      currentSeoTitle: "",
      recommendedSeoTitle: `${service}${location === "Überregional" ? "" : ` ${location}`} | FLOXANT`,
      shortTitle: service,
      metaDescription: "",
      primaryCta: "",
      allowedSections: "Direkte Antwort|Leistungsumfang|benötigte Angaben|Aufwandstreiber|Ablauf|FAQ|verwandte Leistungen|nächster Schritt",
      unrelatedSections: "interne Begriffe|fremde Standorte|nicht angebotene Leistungen|unbelegte Versprechen",
      relatedServices: "",
      relatedGuides: "",
      faq: "nicht prüfbar",
      canonical: "",
      indexingStatus: "missing",
      sitemapStatus: "included",
      firstVisibleSection: "",
      sectionDecisions: "",
      issue: "MISSING_HTML",
      classification: "MANUAL_REVIEW",
    });
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
  const currentH1 = capture(main, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const title = capture(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = metaContent(html, "description");
  const robots = metaContent(html, "robots");
  const firstVisibleSection = firstParagraph(main);
  const tokens = expectedTokens(route);
  const h1Folded = fold(currentH1);
  const introFolded = fold(firstVisibleSection);
  const mainText = stripHtml(main);
  const locationMismatch =
    pageType !== "guide" &&
    ((location === "Düsseldorf" && /\bregensburg\b/i.test(`${currentH1} ${firstVisibleSection}`)) ||
      (location === "Regensburg" && /\bdüsseldorf|duesseldorf\b/i.test(`${currentH1} ${firstVisibleSection}`)));
  const serviceMismatch =
    pageType === "service" && tokens.length > 0 && !tokens.some((token) => h1Folded.includes(fold(token)));

  if (!currentH1) issue = "MISSING_H1";
  else if (locationMismatch) issue = "LOCATION_MIX_IN_H1_OR_INTRO";
  else if (serviceMismatch) issue = "H1_SERVICE_MISMATCH";
  else if (internalTerms.test(`${currentH1} ${firstVisibleSection}`)) issue = "INTERNAL_TERM_IN_H1_OR_INTRO";
  if (issue) classification = issue === "LOCATION_MIX_IN_H1_OR_INTRO" ? "MOVE" : "REWRITE";

  const decisions = sectionDecisions(main, route);
  const faqCount = (main.match(/<details\b/gi) || []).length + [...main.matchAll(/<h[2-3]\b[^>]*>([\s\S]*?)<\/h[2-3]>/gi)].filter((match) => /\?/i.test(stripHtml(match[1]))).length;
  const priority = priorityIntent.get(route);
  const fallbackH1 = language === "en"
    ? `${service} clearly explained`
    : `${service}${location === "Überregional" ? "" : ` in ${location}`} klar anfragen`;

  rows.push({
    url: route,
    language,
    location,
    pageType,
    service,
    primaryIntent: priority?.[1] || `${service}${location === "Überregional" ? "" : ` in ${location}`} verständlich erklären und zum passenden nächsten Schritt führen`,
    secondaryIntent: "Umfang, Zugang, Zeitraum und Kontaktwunsch klären",
    currentH1,
    recommendedH1: issue ? fallbackH1 : currentH1,
    currentSeoTitle: title,
    recommendedSeoTitle: title || `${service}${location === "Überregional" ? "" : ` ${location}`} | FLOXANT`,
    shortTitle: title.split("|")[0].trim().slice(0, 65) || service,
    metaDescription: description,
    primaryCta: extractCta(main),
    allowedSections: "Direkte Antwort|Leistungsumfang|benötigte Angaben|Aufwandstreiber|Ablauf|FAQ|verwandte Leistungen|nächster Schritt",
    unrelatedSections: "interne Begriffe|fremde Standorte|nicht angebotene Leistungen|unbelegte Versprechen",
    relatedServices: "",
    relatedGuides: "",
    faq: faqCount ? `${faqCount} sichtbare FAQ-Indikatoren` : "keine sichtbare FAQ erkannt",
    canonical: canonical(html),
    indexingStatus: /noindex/i.test(robots) ? "noindex" : "index_follow",
    sitemapStatus: "included",
    firstVisibleSection,
    sectionDecisions: decisions.join("|"),
    issue,
    classification,
    internalTermInMain: internalTerms.test(mainText) ? "MANUAL_REVIEW" : "",
  });
}

const columns = [
  "url",
  "language",
  "location",
  "pageType",
  "service",
  "primaryIntent",
  "secondaryIntent",
  "currentH1",
  "recommendedH1",
  "currentSeoTitle",
  "recommendedSeoTitle",
  "shortTitle",
  "metaDescription",
  "primaryCta",
  "allowedSections",
  "unrelatedSections",
  "relatedServices",
  "relatedGuides",
  "faq",
  "canonical",
  "indexingStatus",
  "sitemapStatus",
  "firstVisibleSection",
  "sectionDecisions",
  "issue",
  "classification",
  "internalTermInMain",
];

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(
  outputFile,
  `${columns.join(",")}\n${rows.map((row) => columns.map((column) => csv(row[column])).join(",")).join("\n")}\n`,
  "utf8",
);

const mismatches = rows.filter((row) => row.issue);
const missingHtml = mismatches.filter((row) => row.issue === "MISSING_HTML");
console.log(JSON.stringify({
  status: mismatches.length ? "REVIEW" : "PASS",
  indexablePages: rows.length,
  h1IntentMismatches: mismatches.length - missingHtml.length,
  missingHtml: missingHtml.length,
  keep: rows.filter((row) => row.classification === "KEEP").length,
  rewrite: rows.filter((row) => row.classification === "REWRITE").length,
  move: rows.filter((row) => row.classification === "MOVE").length,
  output: path.relative(root, outputFile),
  canonicalBase: siteUrl,
}, null, 2));

if (mismatches.length) process.exitCode = 1;
