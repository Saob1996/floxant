const fs = require("node:fs");
const path = require("node:path");
const { spawnSync, spawn } = require("node:child_process");
const net = require("node:net");

const ROOT = process.cwd();
const PUBLIC_BASE_URL = "https://www.floxant.de";
const DEFAULT_BASE_URL = "http://localhost:3000";
const ACCEPTED_REDIRECTS = new Set([301, 302, 307, 308]);

const criticalRoutes = [
  { path: "/", expectedStatus: 200, expectedH1Contains: ["FLOXANT", "Reinigung", "Gebäudeservice"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "multi", expectedCity: "deutschland", expectedIntent: "home", priority: "P0", moneyPage: true },
  { path: "/leistungen", expectedStatus: 200, expectedH1Contains: ["Leistung", "Service"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "multi", expectedCity: "deutschland", expectedIntent: "service-overview", priority: "P0", moneyPage: true },
  { path: "/kontakt", expectedStatus: 200, expectedH1Contains: ["Kontakt", "Anfrage", "Beschreiben", "Hilfe"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "kontakt", expectedCity: "deutschland", expectedIntent: "kontakt", priority: "P0", contactPage: true },
  { path: "/angebot-guenstiger-pruefen", expectedStatus: 200, expectedH1Contains: ["Angebot", "pruefen"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "angebot-pruefen", expectedCity: "deutschland", expectedIntent: "angebot-pruefen", priority: "P0", moneyPage: true },
  { path: "/angebotscheck", expectedStatus: 200, expectedH1Contains: ["Angebot", "Check"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "angebot-pruefen", expectedCity: "deutschland", expectedIntent: "angebot-pruefen", priority: "P0", moneyPage: true },
  { path: "/anbieter-vergleichen", expectedStatus: 200, expectedH1Contains: ["Anbieter", "vergleichen"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "angebot-pruefen", expectedCity: "deutschland", expectedIntent: "anbieter-vergleichen", priority: "P0", moneyPage: true },

  { path: "/duesseldorf", expectedStatus: 200, expectedH1Contains: ["Duesseldorf", "Dusseldorf", "Düsseldorf"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "multi", expectedCity: "duesseldorf", expectedIntent: "duesseldorf", priority: "P0", moneyPage: true },
  { path: "/duesseldorf/reinigung", expectedStatus: 200, allowRedirect: true, expectedH1Contains: ["Reinigung", "Duesseldorf", "Düsseldorf"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "reinigung", expectedCity: "duesseldorf", expectedIntent: "reinigung-duesseldorf", priority: "P0", moneyPage: true },
  { path: "/duesseldorf/bueroreinigung", expectedStatus: 200, allowRedirect: true, expectedH1Contains: ["Bueroreinigung", "Büroreinigung", "Duesseldorf", "Düsseldorf"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "bueroreinigung", expectedCity: "duesseldorf", expectedIntent: "bueroreinigung-duesseldorf", priority: "P0", moneyPage: true },
  { path: "/duesseldorf/gewerbereinigung", expectedStatus: 200, allowRedirect: true, expectedH1Contains: ["Gewerbereinigung", "Duesseldorf", "Düsseldorf"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "gewerbereinigung", expectedCity: "duesseldorf", expectedIntent: "gewerbereinigung-duesseldorf", priority: "P0", moneyPage: true },
  { path: "/duesseldorf/praxisreinigung", expectedStatus: 200, allowRedirect: true, expectedH1Contains: ["Praxisreinigung", "Duesseldorf", "Düsseldorf"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "praxisreinigung", expectedCity: "duesseldorf", expectedIntent: "praxisreinigung-duesseldorf", priority: "P0", moneyPage: true },
  { path: "/duesseldorf/fensterreinigung", expectedStatus: 200, allowRedirect: true, expectedH1Contains: ["Fensterreinigung", "Duesseldorf", "Düsseldorf"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "fensterreinigung", expectedCity: "duesseldorf", expectedIntent: "fensterreinigung-duesseldorf", priority: "P0", moneyPage: true },
  { path: "/duesseldorf/grundreinigung", expectedStatus: 200, expectedH1Contains: ["Grundreinigung", "Duesseldorf", "Düsseldorf"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "grundreinigung", expectedCity: "duesseldorf", expectedIntent: "grundreinigung-duesseldorf", priority: "P0", moneyPage: true },
  { path: "/duesseldorf/unterhaltsreinigung", expectedStatus: 200, expectedH1Contains: ["Unterhaltsreinigung", "Duesseldorf", "Düsseldorf"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "unterhaltsreinigung", expectedCity: "duesseldorf", expectedIntent: "unterhaltsreinigung-duesseldorf", priority: "P0", moneyPage: true },
  { path: "/duesseldorf/baureinigung", expectedStatus: 200, expectedH1Contains: ["Baureinigung", "Duesseldorf", "Düsseldorf"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "baureinigung", expectedCity: "duesseldorf", expectedIntent: "baureinigung-duesseldorf", priority: "P0", moneyPage: true },
  { path: "/duesseldorf/entruempelung", expectedStatus: 410, allowRedirect: true, expectedRedirectPath: "/seo-gone", nonHtml: true, priority: "P0", retired: true },
  { path: "/duesseldorf/haushaltsaufloesung", expectedStatus: 410, allowRedirect: true, expectedRedirectPath: "/seo-gone", nonHtml: true, priority: "P0", retired: true },
  { path: "/duesseldorf/hausverwaltung-reinigung", optional: true, expectedStatus: 200, allowRedirect: true, expectedRedirectPath: "/duesseldorf", expectedH1Contains: ["Hausverwaltung", "Reinigung", "Duesseldorf", "Düsseldorf"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "hausverwaltung-reinigung", expectedCity: "duesseldorf", expectedIntent: "hausverwaltung-reinigung-duesseldorf", priority: "P1", moneyPage: true },

  { path: "/regensburg", expectedStatus: 200, expectedH1Contains: ["Regensburg"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "multi", expectedCity: "regensburg", expectedIntent: "regensburg", priority: "P0", moneyPage: true },
  { path: "/umzug-regensburg", expectedStatus: 200, allowRedirect: true, expectedRedirectPath: "/regensburg/umzug", expectedH1Contains: ["Umzug", "Regensburg"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "umzug", expectedCity: "regensburg", expectedIntent: "umzug-regensburg", priority: "P0", moneyPage: true },
  { path: "/reinigung-regensburg", expectedStatus: 200, allowRedirect: true, expectedRedirectPath: "/regensburg/reinigung", expectedH1Contains: ["Reinigung", "Regensburg"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "reinigung", expectedCity: "regensburg", expectedIntent: "reinigung-regensburg", priority: "P0", moneyPage: true },
  { path: "/entruempelung-regensburg", expectedStatus: 200, allowRedirect: true, expectedRedirectPath: "/regensburg/entruempelung", expectedH1Contains: ["Entruempelung", "Entrümpelung", "Regensburg"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "entruempelung", expectedCity: "regensburg", expectedIntent: "entruempelung-regensburg", priority: "P0", moneyPage: true },
  { path: "/gewerbereinigung-regensburg", expectedStatus: 200, allowRedirect: true, expectedRedirectPath: "/regensburg/gewerbereinigung", expectedH1Contains: ["Gewerbereinigung", "Regensburg"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "gewerbereinigung", expectedCity: "regensburg", expectedIntent: "gewerbereinigung-regensburg", priority: "P0", moneyPage: true },
  { path: "/bueroreinigung-regensburg", expectedStatus: 200, allowRedirect: true, expectedRedirectPath: "/regensburg/bueroreinigung", expectedH1Contains: ["Bueroreinigung", "Büroreinigung", "Regensburg"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "bueroreinigung", expectedCity: "regensburg", expectedIntent: "bueroreinigung-regensburg", priority: "P0", moneyPage: true },
  { path: "/klaviertransport-regensburg", expectedStatus: 200, expectedH1Contains: ["Klaviertransport", "Regensburg"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "klaviertransport", expectedCity: "regensburg", expectedIntent: "klaviertransport-regensburg", priority: "P0", moneyPage: true },
  { path: "/grundreinigung-regensburg", expectedStatus: 200, expectedH1Contains: ["Grundreinigung", "normal putzen"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "grundreinigung", expectedCity: "regensburg", expectedIntent: "grundreinigung-regensburg", priority: "P0", moneyPage: true },
  { path: "/unterhaltsreinigung-regensburg", expectedStatus: 200, expectedH1Contains: ["Unterhaltsreinigung", "regelmaessig sauber", "regelmäßig sauber"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "unterhaltsreinigung", expectedCity: "regensburg", expectedIntent: "unterhaltsreinigung-regensburg", priority: "P0", moneyPage: true },
  { path: "/baureinigung-regensburg", expectedStatus: 200, expectedH1Contains: ["Baureinigung", "Baustaub"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "baureinigung", expectedCity: "regensburg", expectedIntent: "baureinigung-regensburg", priority: "P0", moneyPage: true },
  { path: "/wohnungsaufloesung-regensburg", optional: true, expectedStatus: 200, allowRedirect: true, expectedRedirectPath: "/regensburg/wohnungsaufloesung", expectedH1Contains: ["Wohnungsaufloesung", "Wohnungsauflösung", "Regensburg"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "wohnungsaufloesung", expectedCity: "regensburg", expectedIntent: "wohnungsaufloesung-regensburg", priority: "P1", moneyPage: true },

  { path: "/diskret-service", expectedStatus: 200, allowRedirect: true, expectedRedirectPath: "/diskreter-umzug-trennung-scheidung", expectedH1Contains: ["Diskret", "diskret"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "diskret-service", expectedCity: "deutschland", expectedIntent: "diskret-service", priority: "P0", moneyPage: true },
  { path: "/private-client-service", optional: true, expectedStatus: 200, expectedH1Contains: ["Private", "Client", "Diskret"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "private-client-service", expectedCity: "deutschland", expectedIntent: "private-client-service", priority: "P1", moneyPage: true },
  { path: "/seniorenumzug-bayern", expectedStatus: 200, expectedH1Contains: ["Seniorenumzug", "Bayern"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "seniorenumzug", expectedCity: "bayern", expectedIntent: "seniorenumzug-anfragen", priority: "P0", moneyPage: true },
  { path: "/solarreinigung", expectedStatus: 200, expectedH1Contains: ["Solar", "Reinigung"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "solarreinigung", expectedCity: "deutschland", expectedIntent: "solarreinigung-anfragen", priority: "P0", moneyPage: true },
  { path: "/pv-anlagen-reinigung", expectedStatus: 200, expectedH1Contains: ["PV", "Reinigung"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "pv-anlagen-reinigung", expectedCity: "deutschland", expectedIntent: "pv-anlagen-reinigung-anfragen", priority: "P0", moneyPage: true },
  { path: "/objektbrief", optional: true, expectedStatus: 200, expectedH1Contains: ["Objektbrief"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "objektbrief", expectedCity: "deutschland", expectedIntent: "objektbrief", priority: "P1", moneyPage: true },
  { path: "/uebergabe-sprint", optional: true, expectedStatus: 200, expectedH1Contains: ["Uebergabe", "Übergabe"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "uebergabe-sprint", expectedCity: "deutschland", expectedIntent: "uebergabe-sprint", priority: "P1", moneyPage: true },
  { path: "/vermieter-ready-service", optional: true, expectedStatus: 200, expectedH1Contains: ["Vermieter", "Ready"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "vermieter-ready-service", expectedCity: "deutschland", expectedIntent: "vermieter-ready-service", priority: "P1", moneyPage: true },
  { path: "/leerfahrt-rueckfahrt", optional: true, expectedStatus: 200, expectedH1Contains: ["Leerfahrt", "Rueckfahrt", "Rückfahrt"], mustHaveCanonical: true, mustHaveMetaDescription: true, mustHaveCta: true, mustHaveContactLink: true, mustHaveNoFakeClaims: true, mustNotHaveNoindex: true, expectedService: "leerfahrt", expectedCity: "deutschland", expectedIntent: "leerfahrt-rueckfahrt", priority: "P1", moneyPage: true },

  { path: "/impressum", expectedStatus: 200, expectedH1Contains: ["Impressum"], mustHaveCanonical: true, mustHaveMetaDescription: false, mustHaveCta: false, mustHaveContactLink: false, mustHaveNoFakeClaims: true, mustNotHaveNoindex: false, expectedService: "legal", expectedCity: "regensburg", expectedIntent: "impressum", priority: "P0" },
  { path: "/datenschutz", expectedStatus: 200, expectedH1Contains: ["Datenschutz"], mustHaveCanonical: true, mustHaveMetaDescription: false, mustHaveCta: false, mustHaveContactLink: false, mustHaveNoFakeClaims: true, mustNotHaveNoindex: false, expectedService: "legal", expectedCity: "regensburg", expectedIntent: "datenschutz", priority: "P0" },
  { path: "/agb", expectedStatus: 200, expectedH1Contains: ["AGB", "Allgemein"], mustHaveCanonical: true, mustHaveMetaDescription: false, mustHaveCta: false, mustHaveContactLink: false, mustHaveNoFakeClaims: true, mustNotHaveNoindex: false, expectedService: "legal", expectedCity: "regensburg", expectedIntent: "agb", priority: "P0" },
  { path: "/robots.txt", expectedStatus: 200, nonHtml: true, mustHaveCanonical: false, mustHaveMetaDescription: false, mustHaveCta: false, mustHaveContactLink: false, mustHaveNoFakeClaims: true, mustNotHaveNoindex: false, expectedService: "technical", expectedCity: "deutschland", expectedIntent: "robots", priority: "P0" },
  { path: "/sitemap.xml", expectedStatus: 200, nonHtml: true, mustHaveCanonical: false, mustHaveMetaDescription: false, mustHaveCta: false, mustHaveContactLink: false, mustHaveNoFakeClaims: true, mustNotHaveNoindex: false, expectedService: "technical", expectedCity: "deutschland", expectedIntent: "sitemap", priority: "P0" },
];

const contactScenarios = [
  { path: "/kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo", expectedService: ["angebot-pruefen", "angebot_pruefen"], expectedCity: [], expectedIntent: "angebot-pruefen" },
  { path: "/kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo", expectedService: ["reinigung"], expectedCity: ["duesseldorf"], expectedIntent: "reinigung-duesseldorf" },
  { path: "/kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo", expectedService: ["bueroreinigung", "b2b_reinigung"], expectedCity: ["duesseldorf"], expectedIntent: "bueroreinigung-duesseldorf" },
  { path: "/kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo", expectedService: ["gewerbereinigung", "b2b_reinigung"], expectedCity: ["duesseldorf"], expectedIntent: "gewerbereinigung-duesseldorf" },
  { path: "/kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo", expectedService: ["umzug"], expectedCity: ["regensburg"], expectedIntent: "umzug-regensburg" },
  { path: "/kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo", expectedService: ["entruempelung", "entsorgung"], expectedCity: ["regensburg"], expectedIntent: "entruempelung-regensburg" },
  { path: "/kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo", expectedService: ["klaviertransport"], expectedCity: ["regensburg"], expectedIntent: "klaviertransport-regensburg" },
  { path: "/kontakt?service=diskret-service&intent=diskret-service&source=seo", expectedService: ["diskret-service", "private-client", "private_client"], expectedCity: [], expectedIntent: "diskret-service" },
  { path: "/kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo", expectedService: ["seniorenumzug"], expectedCity: [], expectedIntent: "seniorenumzug-anfragen" },
  { path: "/kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo", expectedService: ["solarreinigung"], expectedCity: [], expectedIntent: "solarreinigung-anfragen" },
  { path: "/kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo", expectedService: ["cleaning", "reinigung"], expectedCity: ["duesseldorf"], expectedIntent: "english-cleaning-duesseldorf" },
  { path: "/kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo", expectedService: ["moving", "umzug"], expectedCity: ["regensburg"], expectedIntent: "english-moving-regensburg" },
  { path: "/kontakt?service=offer-check&intent=english-offer-check&source=seo", expectedService: ["offer-check", "angebot-pruefen", "angebot_pruefen"], expectedCity: [], expectedIntent: "english-offer-check" },
];

const hardClaimRules = [
  { id: "guaranteed-cheap", pattern: /\bgarantiert\s+(guenstig|gunstig|billig|preiswert|billiger|guenstiger|gunstiger)\b/i },
  { id: "satisfaction-100", pattern: /\b100\s*%\s+zufriedenheit\b/i },
  { id: "number-one", pattern: /\b(nr\.?\s*1|platz\s*1)\b/i },
  { id: "best-provider", pattern: /\b(bester\s+anbieter|beste\s+wahl|beste\s+firma)\b/i },
  { id: "legally-secure", pattern: /\brechtssicher\b/i },
  { id: "certified-unqualified", pattern: /\bzertifiziert\b/i },
  { id: "instant-appointment-guarantee", pattern: /\b(soforttermin|termin)\s+garantiert\b/i },
  { id: "savings-guarantee", pattern: /\b(ersparnis|preis)\s*garantie\b/i },
  { id: "deposit-guarantee", pattern: /\bkautionsrueckzahlung\s+garantiert\b/i },
  { id: "handover-guarantee", pattern: /\buebergabe\s+garantiert\b/i },
  { id: "damage-free-guarantee", pattern: /\bschadenfreiheit\s+garantiert\b/i },
  { id: "care-advice", pattern: /\bpflegeberatung\b/i },
  { id: "medical-advice", pattern: /\bmedizinische\s+beratung\b/i },
  { id: "legal-advice", pattern: /\brechtsberatung\b/i },
  { id: "yield-guarantee", pattern: /\bertragssteigerung\s+garantiert\b/i },
  { id: "fake-review", pattern: /\bechte\s+bewertung(en)?\b/i },
  { id: "customer-count", pattern: /\b\d{3,}\s+kunden\b/i },
];

function nowIso() {
  return new Date().toISOString();
}

function reportBaseUrl() {
  const explicit = Boolean(process.env.BASE_URL);
  const baseUrl = String(process.env.BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");
  return { baseUrl, explicit };
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

function normalizeForScan(value = "") {
  return decodeHtml(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/\u00c3\u00bc/g, "ue")
    .replace(/\u00c3\u00a4/g, "ae")
    .replace(/\u00c3\u00b6/g, "oe")
    .replace(/\u00c3\u009c/g, "Ue")
    .replace(/\u00c3\u0084/g, "Ae")
    .replace(/\u00c3\u0096/g, "Oe")
    .toLowerCase();
}

function normalizePath(value) {
  if (!value) return "/";
  let pathname = String(value);
  try {
    pathname = new URL(String(value), PUBLIC_BASE_URL).pathname;
  } catch {
    pathname = String(value);
  }
  const clean = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "");
  return clean ? (clean.startsWith("/") ? clean : `/${clean}`) : "/";
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

function getTitle(html) {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return match ? stripTags(match[1]) : "";
}

function getHeadings(html, level) {
  const regex = new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, "gi");
  return Array.from(html.matchAll(regex), (match) => stripTags(match[1])).filter(Boolean);
}

function collectAnchors(html) {
  const anchors = [];
  const anchorRegex = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchorRegex.exec(html))) {
    const attrs = getAttrs(`<a ${match[1]}>`);
    const href = attrs.href || "";
    anchors.push({
      href,
      path: normalizePath(href),
      text: stripTags(match[2]),
      attrs,
    });
  }
  return anchors;
}

function collectForms(html) {
  return Array.from(html.matchAll(/<form\b([\s\S]*?)<\/form>/gi), (match) => ({
    html: match[0],
    attrs: getAttrs(`<form ${match[1]}>`),
  }));
}

function collectJsonLd(html) {
  const scripts = [];
  const errors = [];
  const regex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html))) {
    try {
      scripts.push(JSON.parse(decodeHtml(match[1]).trim()));
    } catch (error) {
      errors.push(error.message);
    }
  }
  return { scripts, errors };
}

function jsonLdTypes(value) {
  const types = [];
  const visit = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    const type = node["@type"];
    if (Array.isArray(type)) types.push(...type);
    else if (type) types.push(type);
    if (Array.isArray(node["@graph"])) node["@graph"].forEach(visit);
    Object.keys(node).forEach((key) => {
      if (key !== "@graph") visit(node[key]);
    });
  };
  visit(value);
  return Array.from(new Set(types.map(String)));
}

function extractSitemapLocs(xml) {
  return Array.from(String(xml || "").matchAll(/<loc>([^<]+)<\/loc>/gi), (match) => match[1].trim());
}

function hasNoindex(html) {
  const robots = findMetaContent(html, "robots");
  return /\bnoindex\b/i.test(robots);
}

function hasApplicationError(html) {
  return /Application error|This page could not be found|Hydration failed|Text content does not match server-rendered HTML|data-nextjs-dialog/i.test(html);
}

function hasPiiInUrl(value) {
  const forbidden = ["name", "email", "mail", "phone", "telefon", "tel", "adresse", "address", "street", "strasse", "nachname", "vorname"];
  try {
    const url = new URL(value, PUBLIC_BASE_URL);
    return forbidden.some((key) => url.searchParams.has(key));
  } catch {
    return /\b(name|email|phone|telefon|adresse)=/i.test(String(value || ""));
  }
}

function isNegatedClaim(normalizedText, index) {
  const before = normalizedText.slice(Math.max(0, index - 120), index);
  const after = normalizedText.slice(index, Math.min(normalizedText.length, index + 120));
  const negatedBefore = /\b(keine|kein|nicht|ohne|keinerlei|statt|vermeidet|keine automatische|keine preiszusage|keine termin|keine verfugbarkeit|keine verfuegbarkeit)\b/.test(before);
  const questionThenDenied = /\b(frage|ist|wird|kann|darf)\b/.test(before) &&
    /\b(nein|nicht|keine|kein|keinerlei|ersetzt|keine rechtliche|keine medizinische|keine pflege)\b/.test(after);
  return negatedBefore || questionThenDenied;
}

function findRiskClaims(text) {
  const normalized = normalizeForScan(text);
  const findings = [];
  for (const rule of hardClaimRules) {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags.includes("g") ? rule.pattern.flags : `${rule.pattern.flags}g`);
    let match;
    while ((match = regex.exec(normalized))) {
      if (isNegatedClaim(normalized, match.index)) continue;
      findings.push({ rule: rule.id, excerpt: normalized.slice(Math.max(0, match.index - 45), match.index + 80).replace(/\s+/g, " ").trim() });
    }
  }
  return findings;
}

async function fetchUrl(url, options = {}) {
  const timeoutMs = Number(options.timeoutMs || process.env.QA_FETCH_TIMEOUT_MS || 25000);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      redirect: options.redirect || "manual",
      method: options.method || "GET",
      body: options.body,
      signal: controller.signal,
      headers: options.headers,
    });
    const contentType = response.headers.get("content-type") || "";
    const text = /html|xml|text|json/i.test(contentType) ? await response.text() : "";
    return {
      ok: true,
      status: response.status,
      redirected: response.redirected,
      location: response.headers.get("location") || "",
      contentType,
      body: text,
      url: response.url,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      redirected: false,
      location: "",
      contentType: "",
      body: "",
      url,
      error: error.name === "AbortError" ? `Timeout after ${timeoutMs}ms` : error.message,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchPath(baseUrl, routePath, options = {}) {
  const url = new URL(routePath, baseUrl).toString();
  return fetchUrl(url, options);
}

function addResult(results, status, scope, routePath, detail, action, extra = {}) {
  results.push({
    status,
    scope,
    path: routePath,
    detail,
    action,
    priority: extra.priority || "P1",
    ...extra,
  });
}

function statusFromResults(results) {
  if (results.some((item) => item.status === "FAIL")) return "FAIL";
  if (results.some((item) => item.status === "WARN")) return "WARN";
  return "PASS";
}

function escapeCell(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();
}

function writeReport({ markdownPath, jsonPath, title, summary, results, extraMarkdown = [] }) {
  const status = statusFromResults(results);
  const output = {
    status,
    generatedAt: summary.generatedAt || nowIso(),
    summary: {
      ...summary,
      checks: results.length,
      pass: results.filter((item) => item.status === "PASS").length,
      warn: results.filter((item) => item.status === "WARN").length,
      fail: results.filter((item) => item.status === "FAIL").length,
    },
    results,
  };

  const rows = results.map((item) => `| ${escapeCell(item.status)} | ${escapeCell(item.priority)} | ${escapeCell(item.scope)} | ${escapeCell(item.path)} | ${escapeCell(item.detail)} | ${escapeCell(item.action)} |`);
  const md = [
    `# ${title}`,
    "",
    `Generated: ${output.generatedAt}`,
    `Status: ${status}`,
    "",
    "## Summary",
    "",
    ...Object.entries(output.summary).map(([key, value]) => `- ${key}: ${Array.isArray(value) ? value.join(", ") : value}`),
    "",
    ...extraMarkdown,
    ...(extraMarkdown.length ? [""] : []),
    "## Results",
    "",
    "| Status | Priority | Scope | Path | Detail | Action |",
    "| --- | --- | --- | --- | --- | --- |",
    ...(rows.length ? rows : ["| PASS | P2 | report | - | No checks were required. | No action. |"]),
    "",
  ].join("\n");

  fs.writeFileSync(path.join(ROOT, jsonPath), JSON.stringify(output, null, 2));
  fs.writeFileSync(path.join(ROOT, markdownPath), md);
  return output;
}

function npmCommand(script, env = {}, options = {}) {
  const startedAt = Date.now();
  const isWin = process.platform === "win32";
  const executable = isWin ? "cmd.exe" : "npm";
  const args = isWin ? ["/d", "/s", "/c", `npm run ${script}`] : ["run", script];
  const result = spawnSync(executable, args, {
    cwd: ROOT,
    env: { ...process.env, ...env },
    encoding: "utf8",
    maxBuffer: options.maxBuffer || 1024 * 1024 * 30,
  });
  const exitCode = typeof result.status === "number" ? result.status : 1;
  return {
    name: `npm run ${script}`,
    script,
    exitCode,
    status: exitCode === 0 ? "PASS" : options.optional ? "WARN" : "FAIL",
    durationMs: Date.now() - startedAt,
    stdoutTail: tail(result.stdout || "", options.tailLines || 80),
    stderrTail: tail(result.stderr || result.error?.message || "", options.tailLines || 80),
  };
}

function scriptExists(scriptName) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
    return Boolean(packageJson.scripts && packageJson.scripts[scriptName]);
  } catch {
    return false;
  }
}

function tail(value, lines = 80) {
  const all = String(value || "").split(/\r?\n/);
  return all.slice(Math.max(0, all.length - lines)).join("\n").trim();
}

function walk(entry, predicate = () => true, files = []) {
  const absolute = path.isAbsolute(entry) ? entry : path.join(ROOT, entry);
  if (!fs.existsSync(absolute)) return files;
  const stat = fs.statSync(absolute);
  if (stat.isDirectory()) {
    if (["node_modules", ".next", ".git", ".vercel", "coverage"].includes(path.basename(absolute))) return files;
    for (const child of fs.readdirSync(absolute)) walk(path.join(absolute, child), predicate, files);
    return files;
  }
  if (predicate(absolute)) files.push(absolute);
  return files;
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

function readFileIfExists(file) {
  const absolute = path.isAbsolute(file) ? file : path.join(ROOT, file);
  return fs.existsSync(absolute) ? fs.readFileSync(absolute, "utf8") : "";
}

function findOpenPort(start = 3220) {
  return new Promise((resolve, reject) => {
    const tryPort = (port) => {
      const server = net.createServer();
      server.once("error", () => tryPort(port + 1));
      server.once("listening", () => {
        server.close(() => resolve(port));
      });
      server.listen(port, "127.0.0.1");
    };
    try {
      tryPort(start);
    } catch (error) {
      reject(error);
    }
  });
}

function startNextServer(port) {
  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
    cwd: ROOT,
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => {
    stdout += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });
  child.getOutput = () => ({ stdout, stderr });
  return child;
}

async function waitForServer(baseUrl, timeoutMs = 60000) {
  const startedAt = Date.now();
  let last = "";
  while (Date.now() - startedAt < timeoutMs) {
    const response = await fetchUrl(baseUrl, { redirect: "manual", timeoutMs: 5000 });
    if (response.ok && response.status > 0 && response.status < 500) return { ok: true, response };
    last = response.error || `status ${response.status}`;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return { ok: false, error: last || "server did not respond" };
}

function stopProcess(child) {
  if (!child || child.killed) return;
  try {
    child.kill();
  } catch {
    // Best effort cleanup; the report contains enough context if shutdown fails.
  }
}

module.exports = {
  ROOT,
  PUBLIC_BASE_URL,
  DEFAULT_BASE_URL,
  ACCEPTED_REDIRECTS,
  criticalRoutes,
  contactScenarios,
  hardClaimRules,
  nowIso,
  reportBaseUrl,
  decodeHtml,
  stripTags,
  normalizeForScan,
  normalizePath,
  getAttrs,
  findMetaContent,
  findLinkHref,
  getTitle,
  getHeadings,
  collectAnchors,
  collectForms,
  collectJsonLd,
  jsonLdTypes,
  extractSitemapLocs,
  hasNoindex,
  hasApplicationError,
  hasPiiInUrl,
  findRiskClaims,
  fetchUrl,
  fetchPath,
  addResult,
  statusFromResults,
  writeReport,
  npmCommand,
  scriptExists,
  tail,
  walk,
  rel,
  readFileIfExists,
  findOpenPort,
  startNextServer,
  waitForServer,
  stopProcess,
};
