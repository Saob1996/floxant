const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const root = process.cwd();
const dataDir = path.join(root, "data", "gsc");
const docsDir = path.join(root, "docs");
const exportDate = "2026-07-05";
const docPrefix = "GSC_2026_07_05";
const jsonPath = path.join(root, "gsc-2026-07-05-import-report.json");
const legacyJsonPath = path.join(root, "gsc-import-report.json");
const liveJsonPath = path.join(root, "live-gsc-import-report.json");
const privateSearchConsoleDir = path.join(root, "data", "private", "search-console");
const growthArtifactsDir = path.join(root, "artifacts");
const growthExportDate = "2026-07-30";

const outputs = {
  importReport: path.join(docsDir, `${docPrefix}_IMPORT_REPORT.md`),
  priorityQueue: path.join(docsDir, `${docPrefix}_PRIORITY_QUEUE.md`),
  queryMap: path.join(docsDir, `${docPrefix}_QUERY_TO_PAGE_MAP.md`),
  ctrSnippet: path.join(docsDir, `${docPrefix}_CTR_SNIPPET_REPORT.md`),
  contentRefresh: path.join(docsDir, `${docPrefix}_CONTENT_REFRESH_REPORT.md`),
  internalLinking: path.join(docsDir, `${docPrefix}_INTERNAL_LINKING_REPORT.md`),
  cannibalization: path.join(docsDir, `${docPrefix}_CANNIBALIZATION_INDEXING_REPORT.md`),
  mobileUx: path.join(docsDir, `${docPrefix}_MOBILE_CTR_UX_REPORT.md`),
  checklist28d: path.join(docsDir, `${docPrefix}_NEXT_28_DAY_CHECKLIST.md`),
  legacyImport: path.join(docsDir, "GSC_IMPORT_REPORT.md"),
  legacyMap: path.join(docsDir, "QUERY_TO_PAGE_MAPPING.md"),
  liveImport: path.join(docsDir, "LIVE_GSC_IMPORT_REPORT.md"),
};

const expectedFiles = [
  { key: "queries", label: "Suchanfragen.csv", names: ["suchanfragen.csv", "queries.csv", "gsc-queries-28d.csv"], type: "query", required: true },
  { key: "pages", label: "Seiten.csv", names: ["seiten.csv", "pages.csv", "gsc-pages-28d.csv"], type: "page", required: true },
  { key: "chart", label: "Diagramm.csv", names: ["diagramm.csv", "chart.csv"], type: "chart", required: false },
  { key: "countries", label: "Laender.csv", names: ["laender.csv", "lander.csv", "countries.csv"], type: "country", required: false },
  { key: "devices", label: "Geraete.csv", names: ["geraete.csv", "gerate.csv", "devices.csv"], type: "device", required: false },
  { key: "filters", label: "Filter.csv", names: ["filter.csv", "filters.csv"], type: "filter", required: false },
  { key: "searchAppearance", label: "Darstellung in der Suche.csv", names: ["darstellung-in-der-suche.csv", "darstellung_in_der_suche.csv", "search-appearance.csv"], type: "appearance", required: false },
];

const knownP0Queries = [
  "b2b bueroreinigung",
  "reinigung nach entruempelung landshut",
  "diskreter service",
  "klaviertransport regensburg",
  "grundreinigung duesseldorf",
  "fensterreinigung duesseldorf",
  "umzug neustadt an der waldnaab",
  "umzug vohenstrauss",
  "umzug im alter bamberg",
  "umzug im alter erlangen",
  "umzug im alter bayern",
  "umzug im alter wuerzburg",
  "geruchsneutralisation wohnung duesseldorf",
  "praxisentruempelung nuernberg",
  "professionelle praxisreinigung duesseldorf",
  "bauendreinigung duesseldorf",
  "glasreinigung duesseldorf",
  "unterhaltsreinigung duesseldorf",
];

const knownP1Queries = [
  "praxisreinigung duesseldorf",
  "bueroreinigung duesseldorf",
  "gewerbereinigung",
  "angebot reinigungsfirma",
  "entruempelung regensburg",
  "umzug regensburg",
  "putzfirma duesseldorf",
  "umzugsunternehmen regensburg",
  "bueroreinigung",
  "bueroreinigung in duesseldorf",
  "putzfirmen duesseldorf",
  "hotelreinigung duesseldorf",
  "reinigung muenchen sofort termin",
  "reinigungsfirma angebot",
];

const p0PageHints = new Set([
  "/",
  "/duesseldorf",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/fensterreinigung",
  "/duesseldorf/hausverwaltung-reinigung",
  "/regensburg/umzug",
  "/umzug-regensburg",
  "/regensburg/entruempelung",
  "/entruempelung-regensburg",
  "/klaviertransport-regensburg",
  "/private-client-service",
  "/entruempelung-landshut",
  "/reinigung-landshut",
  "/angebot-guenstiger-pruefen",
  "/angebotscheck",
  "/anbieter-vergleichen",
]);

const serviceRules = [
  ["angebot-pruefen", ["angebot", "angebotscheck", "anbieter vergleichen", "guenstiger", "pruefen"]],
  ["bueroreinigung", ["bueroreinigung", "buero", "office", "b2b"]],
  ["gewerbereinigung", ["gewerbereinigung", "gewerbe", "objekt", "unterhaltsreinigung", "hausverwaltung"]],
  ["praxisreinigung", ["praxisreinigung", "praxis", "arztpraxis"]],
  ["fensterreinigung", ["fenster", "glasreinigung", "glas"]],
  ["grundreinigung", ["grundreinigung", "bodenreinigung", "bauendreinigung"]],
  ["geruchsneutralisation", ["geruch", "geruchsneutralisation", "geruchsentfernung"]],
  ["klaviertransport", ["klavier", "piano", "fluegel"]],
  ["seniorenumzug", ["senior", "alter", "umzugshelfer fuer senioren"]],
  ["entruempelung", ["entruempel", "raeumung", "entsorgung", "wohnungsaufloesung", "haushaltsaufloesung"]],
  ["umzug", ["umzug", "umzugs", "transport", "vohenstrauss", "waldnaab"]],
  ["diskret-service", ["diskret", "private client", "sensibel", "trennung"]],
  ["reinigung", ["reinigung", "putzfirma", "putz", "cleaning"]],
];

const cityRules = [
  ["duesseldorf", ["duesseldorf", "dusseldorf"]],
  ["regensburg", ["regensburg"]],
  ["landshut", ["landshut"]],
  ["muenchen", ["muenchen", "munich"]],
  ["nuernberg", ["nuernberg", "nurnberg"]],
  ["bamberg", ["bamberg"]],
  ["erlangen", ["erlangen"]],
  ["wuerzburg", ["wuerzburg"]],
  ["bayern", ["bayern"]],
  ["vohenstrauss", ["vohenstrauss"]],
  ["neustadt-waldnaab", ["neustadt an der waldnaab", "waldnaab"]],
];

const supportedCities = new Set(["", "duesseldorf", "regensburg", "landshut", "muenchen", "nuernberg", "bayern"]);
const supportedServices = new Set([
  "angebot-pruefen",
  "bueroreinigung",
  "gewerbereinigung",
  "praxisreinigung",
  "fensterreinigung",
  "grundreinigung",
  "geruchsneutralisation",
  "klaviertransport",
  "seniorenumzug",
  "entruempelung",
  "umzug",
  "diskret-service",
  "reinigung",
  "brand",
  "manual-review",
]);

const intentLabels = {
  "angebot-pruefen": "Angebot, Umfang oder Preis einordnen",
  bueroreinigung: "Firmenflaechen, Turnus und Raumliste klaeren",
  gewerbereinigung: "Gewerbeflaechen, Objektart und Zeitfenster klaeren",
  praxisreinigung: "Praxisflaechen und Hygieneanforderungen vorsichtig klaeren",
  fensterreinigung: "Glas, Rahmen, Etage und Zugang klaeren",
  grundreinigung: "Grundreinigung nach Zustand, Flaeche und Ziel klaeren",
  geruchsneutralisation: "Geruch, Ursache, Material und Anschlussreinigung klaeren",
  klaviertransport: "Instrument, Etage, Zugang und Termin klaeren",
  seniorenumzug: "Umzug im Alter ruhig mit Angehoerigen abstimmen",
  entruempelung: "Raeume, Menge, Zugang und Zielzustand klaeren",
  umzug: "Start, Ziel, Volumen, Etage und Termin klaeren",
  "diskret-service": "Sensible Anfrage mit zurueckhaltendem Kontaktweg klaeren",
  reinigung: "Reinigung nach Objekt, Flaeche, Zustand und Termin klaeren",
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function stripDiacritics(value) {
  return String(value || "")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/Ä/g, "Ae")
    .replace(/Ö/g, "Oe")
    .replace(/Ü/g, "Ue")
    .replace(/ß/g, "ss")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeText(value) {
  return stripDiacritics(value)
    .toLowerCase()
    .replace(/^\ufeff/, "")
    .replace(/[^a-z0-9/.-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeHeader(value) {
  return normalizeText(value).replace(/[ /.-]+/g, "_").replace(/^_+|_+$/g, "");
}

function redactPii(value) {
  return String(value ?? "")
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]")
    .replace(/(?:\+?\d[\d\s()./-]{6,}\d)/g, "[redacted-phone]")
    .replace(/\b(?:telefon|phone|email|e-mail|mail)\s*[:=]\s*\S+/gi, "$1:[redacted]");
}

function normalizeFileName(value) {
  return normalizeText(value).replace(/\s+/g, "_").replace(/_/g, "-");
}

function pick(record, names) {
  for (const name of names) {
    const normalized = normalizeHeader(name);
    if (Object.prototype.hasOwnProperty.call(record, normalized)) return record[normalized];
  }
  return "";
}

function chooseDelimiter(text) {
  const firstLine = text.split(/\r?\n/)[0] || "";
  const comma = (firstLine.match(/,/g) || []).length;
  const semicolon = (firstLine.match(/;/g) || []).length;
  const tab = (firstLine.match(/\t/g) || []).length;
  if (tab > comma && tab > semicolon) return "\t";
  return semicolon > comma ? ";" : ",";
}

function parseCsv(text) {
  const delimiter = chooseDelimiter(text);
  const rows = [];
  let cell = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i += 1;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (!inQuotes && char === delimiter) {
      row.push(cell);
      cell = "";
      continue;
    }
    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      cell = "";
      continue;
    }
    cell += char;
  }
  row.push(cell);
  if (row.some((value) => value.trim())) rows.push(row);
  if (!rows.length) return [];

  const headers = rows[0].map(normalizeHeader);
  return rows.slice(1).map((values) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = (values[index] || "").trim();
    });
    return record;
  });
}

function parseNumber(value, { isCtr = false } = {}) {
  if (value === null || value === undefined || value === "") return 0;
  const raw = String(value).trim();
  const hasPercent = raw.includes("%");
  let clean = raw.replace("%", "").replace(/\s/g, "");
  if (/^\d{1,3}(\.\d{3})+,\d+$/.test(clean)) {
    clean = clean.replace(/\./g, "").replace(",", ".");
  } else if (/^\d+,\d+$/.test(clean)) {
    clean = clean.replace(",", ".");
  } else {
    clean = clean.replace(/,/g, "");
  }
  const parsed = Number(clean);
  if (!Number.isFinite(parsed)) return 0;
  if (isCtr && !hasPercent && parsed > 0 && parsed <= 1) return parsed * 100;
  return parsed;
}

function canonicalPath(urlOrPath) {
  const raw = String(urlOrPath || "").trim();
  if (!raw) return "";
  try {
    const parsed = raw.startsWith("http") ? new URL(raw) : new URL(raw, "https://www.floxant.de");
    const pathOnly = decodeURI(parsed.pathname || "/").replace(/\/+$/, "");
    return pathOnly || "/";
  } catch {
    const cleaned = raw.replace(/^https?:\/\/(www\.)?floxant\.de/i, "").split("?")[0].split("#")[0].replace(/\/+$/, "");
    return cleaned ? (cleaned.startsWith("/") ? cleaned : `/${cleaned}`) : "/";
  }
}

function hasAny(normalized, needles) {
  return needles.some((needle) => normalized.includes(normalizeText(needle)));
}

function classifyLiveSignals(label, service, city, targetPage, routeStatusValue, metrics) {
  const normalized = normalizeText(label);
  const isBrandQuery = /\bfloxant\b/.test(normalized);
  const isEnglishIntentQuery = hasAny(normalized, ["english", "englisch", "moving company", "cleaning service", "relocation", "piano transport"]);
  const isOfferCheckQuery = hasAny(normalized, ["angebot", "preis", "kosten", "guenstiger", "vergleich", "pruefen", "quote", "estimate"]);
  const isSignatureServiceQuery = hasAny(normalized, [
    "diskret",
    "private client",
    "trennung",
    "scheidung",
    "objektbrief",
    "plan b",
    "uebergabeakte",
    "clean start",
    "first 48",
  ]);
  const isSpecialServiceQuery = hasAny(normalized, [
    "klavier",
    "piano",
    "geruch",
    "geruchsneutralisation",
    "pv",
    "solar",
    "praxis",
    "hotel",
    "teppich",
    "treppenhaus",
    "notfall",
  ]);
  const weakCtrTop10 = metrics.position >= 1 && metrics.position <= 10 && metrics.ctr < 1 && metrics.impressions >= 10;
  const highRelevance11to20 = metrics.position > 10 && metrics.position <= 20 && ["P0", "P1"].includes(metrics.priority);
  const highImpressionsWeakPosition = metrics.impressions >= 100 && metrics.position > 20;
  const missingTargetPage = !targetPage || routeStatusValue === "WARN missing" || routeStatusValue.includes("deprecated");

  return {
    isBrandQuery,
    isServiceQuery: Boolean(service && service !== "brand" && service !== "manual-review"),
    isDuesseldorfQuery: city === "duesseldorf" || normalized.includes("duesseldorf") || normalized.includes("dusseldorf"),
    isRegensburgQuery: city === "regensburg" || normalized.includes("regensburg"),
    isEnglishIntentQuery,
    isOfferCheckQuery,
    isSignatureServiceQuery,
    isSpecialServiceQuery,
    missingTargetPage,
    weakCtrTop10,
    highRelevance11to20,
    highImpressionsWeakPosition,
    unsupportedCity: Boolean(city && !supportedCities.has(city)),
    unsupportedService: Boolean(service && !supportedServices.has(service)),
  };
}

function detectCity(label) {
  const normalized = normalizeText(label);
  const match = cityRules.find(([, needles]) => hasAny(normalized, needles));
  return match ? match[0] : "";
}

function detectService(label) {
  const normalized = normalizeText(label);
  const match = serviceRules.find(([, needles]) => hasAny(normalized, needles));
  return match ? match[0] : "";
}

function clusterFor(service, city, label) {
  const clusters = [];
  if (service) clusters.push(service);
  if (city) clusters.push(city);
  if (normalizeText(label).includes("floxant")) clusters.push("brand");
  return clusters.length ? clusters : ["manual-review"];
}

function routeFile(route) {
  if (!route) return "";
  if (route === "/") return path.join(root, "app", "page.tsx");
  return path.join(root, "app", ...route.replace(/^\/+/, "").split("/"), "page.tsx");
}

function readIfExists(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function routeStatus(route) {
  if (!route) return { exists: false, source: "missing", deprecated: false };
  const file = routeFile(route);
  if (fs.existsSync(file)) {
    const text = readIfExists(file);
    const deprecated = /seo-gone|notFound\(|permanentRedirect\(["']\/seo-gone/.test(text);
    return { exists: true, source: path.relative(root, file), deprecated };
  }
  const dynamicRoutes = readIfExists(path.join(root, "lib", "local-seo-routes.ts"));
  if (dynamicRoutes.includes(`"route": "${route}"`) || dynamicRoutes.includes(`route: "${route}"`)) {
    return { exists: true, source: "lib/local-seo-routes.ts", deprecated: false };
  }
  const sitemapRoutes = readIfExists(path.join(root, "lib", "sitemap-routes.ts"));
  if (sitemapRoutes.includes(`"${route}"`)) {
    return { exists: true, source: "lib/sitemap-routes.ts", deprecated: false };
  }
  return { exists: false, source: "missing", deprecated: false };
}

function recommendTarget(label, currentPage = "") {
  const normalized = normalizeText(`${label} ${currentPage}`);
  const city = detectCity(label) || detectCity(currentPage);
  const service = detectService(label) || detectService(currentPage);

  if (normalized.includes("floxant") && !service) {
    return { targetPage: "/", supportingPages: ["/kontakt"], problem: "Brand-Query separat beobachten", action: "monitor_brand", service: "brand", city, intent: "Brand/Navigational" };
  }
  if (hasAny(normalized, ["b2b bueroreinigung"])) {
    return { targetPage: "/regensburg/bueroreinigung", supportingPages: ["/regensburg/gewerbereinigung", "/angebot-guenstiger-pruefen"], problem: "B2B-Intent ist rankstark, aber CTR 0", action: "title_description_improve; content_refresh; offercheck_cta_add", service: "bueroreinigung", city: "regensburg", intent: intentLabels.bueroreinigung };
  }
  if (hasAny(normalized, ["klaviertransport regensburg"])) {
    return { targetPage: "/klaviertransport-regensburg", supportingPages: ["/klaviertransport", "/regensburg/umzug"], problem: "Gute Position braucht klareren Snippet-/FAQ-Fokus", action: "title_description_improve; faq_add; quick_answer_add", service: "klaviertransport", city: "regensburg", intent: intentLabels.klaviertransport };
  }
  if (hasAny(normalized, ["diskreter service"])) {
    return { targetPage: "/private-client-service", supportingPages: ["/diskreter-umzug-trennung-scheidung", "/kontakt?service=diskret-service&intent=diskret-service&source=seo"], problem: "Diskret-Intent rankt, aber Snippet muss zurueckhaltender und eindeutiger werden", action: "title_description_improve; faq_add; internal_links_add", service: "diskret-service", city: "", intent: intentLabels["diskret-service"] };
  }
  if (hasAny(normalized, ["reinigung nach entruempelung landshut"])) {
    return { targetPage: "/entruempelung-landshut", supportingPages: ["/regensburg/reinigung", "/angebot-guenstiger-pruefen"], problem: "Kombi-Intent Reinigung nach Raeumung braucht Abschnitt statt duenner Extra-Seite", action: "content_refresh; quick_answer_add; internal_links_add", service: "entruempelung", city: "landshut", intent: "Reinigung nach Entruempelung in Landshut klaeren" };
  }
  if (hasAny(normalized, ["praxisreinigung duesseldorf", "professionelle praxisreinigung duesseldorf"])) {
    return { targetPage: "/duesseldorf/praxisreinigung", supportingPages: ["/duesseldorf/reinigung", "/kontakt?service=praxisreinigung&city=duesseldorf&intent=praxisreinigung-duesseldorf&source=seo"], problem: "Dusseldorf-Praxisreinigung ist kaufnah, Zielroute im Worktree aber kritisch", action: "manual_review; title_description_improve", service: "praxisreinigung", city: "duesseldorf", intent: intentLabels.praxisreinigung };
  }
  if (hasAny(normalized, ["bueroreinigung duesseldorf", "bueroreinigung in duesseldorf", "bueroreinigung dusseldorf"])) {
    return { targetPage: "/duesseldorf/bueroreinigung", supportingPages: ["/duesseldorf/gewerbereinigung", "/angebot-guenstiger-pruefen"], problem: "Bueroreinigung Dusseldorf hat viele Impressionen, aber Zielroute ist im Worktree kritisch", action: "manual_review; title_description_improve; offercheck_cta_add", service: "bueroreinigung", city: "duesseldorf", intent: intentLabels.bueroreinigung };
  }
  if (hasAny(normalized, ["gewerbereinigung duesseldorf"])) {
    return { targetPage: "/duesseldorf/gewerbereinigung", supportingPages: ["/duesseldorf/bueroreinigung", "/duesseldorf/reinigung"], problem: "Gewerbereinigung Dusseldorf braucht Abgrenzung zu Bueroreinigung", action: "manual_review; content_refresh; internal_links_add", service: "gewerbereinigung", city: "duesseldorf", intent: intentLabels.gewerbereinigung };
  }
  if (hasAny(normalized, ["fensterreinigung duesseldorf", "glasreinigung duesseldorf", "fensterreiniger duesseldorf"])) {
    return { targetPage: "/duesseldorf/fensterreinigung", supportingPages: ["/duesseldorf/reinigung", "/kontakt?service=fensterreinigung&city=duesseldorf&intent=fensterreinigung-duesseldorf&source=seo"], problem: "Fenster-/Glasreinigung Dusseldorf liegt nahe Seite 1", action: "manual_review; title_description_improve; faq_add", service: "fensterreinigung", city: "duesseldorf", intent: intentLabels.fensterreinigung };
  }
  if (hasAny(normalized, ["grundreinigung duesseldorf", "bauendreinigung duesseldorf", "bodenreinigung duesseldorf"])) {
    return { targetPage: "/duesseldorf/grundreinigung", supportingPages: ["/duesseldorf/reinigung", "/angebot-guenstiger-pruefen"], problem: "Grund-/Bauendreinigung Dusseldorf hat CTR-0 trotz guter Position", action: "manual_review; title_description_improve; quick_answer_add", service: "grundreinigung", city: "duesseldorf", intent: intentLabels.grundreinigung };
  }
  if (city === "duesseldorf" && ["reinigung", "geruchsneutralisation"].includes(service)) {
    return { targetPage: service === "geruchsneutralisation" ? "/duesseldorf/geruchsneutralisation" : "/duesseldorf/reinigung", supportingPages: ["/duesseldorf/reinigungsfirma", "/angebot-guenstiger-pruefen"], problem: "Dusseldorf-Reinigungscluster muss Hub/Unterseite sauber unterscheiden", action: "manual_review; content_refresh; internal_links_add", service, city, intent: intentLabels[service] || intentLabels.reinigung };
  }
  if (hasAny(normalized, ["angebot reinigungsfirma", "reinigungsfirma angebot"])) {
    return { targetPage: "/reinigungsfirma-angebot", supportingPages: ["/angebot-guenstiger-pruefen", "/regensburg/gewerbereinigung"], problem: "Angebots-Intent ist kaufnah, braucht klarere Einordnung ohne Preisgarantie", action: "title_description_improve; offercheck_cta_add; faq_add", service: "angebot-pruefen", city: "", intent: intentLabels["angebot-pruefen"] };
  }
  if (city === "regensburg" && service === "umzug") {
    return { targetPage: "/regensburg/umzug", supportingPages: ["/umzug-regensburg", "/angebot-guenstiger-pruefen", "/klaviertransport-regensburg"], problem: "Regensburg-Umzug rankt ueber mehrere Ziele, Primaerseite festlegen", action: "content_refresh; internal_links_add; canonical_review", service, city, intent: intentLabels.umzug };
  }
  if (city === "regensburg" && service === "entruempelung") {
    return { targetPage: "/regensburg/entruempelung", supportingPages: ["/entruempelung-regensburg", "/regensburg/wohnungsaufloesung", "/angebot-guenstiger-pruefen"], problem: "Regensburg-Entruempelung rankt ueber Dubletten, Primaerseite festlegen", action: "content_refresh; internal_links_add; canonical_review", service, city, intent: intentLabels.entruempelung };
  }
  if (hasAny(normalized, ["umzug neustadt an der waldnaab"])) {
    return { targetPage: "/umzug-neustadt-an-der-waldnaab", supportingPages: ["/umzug", "/angebot-guenstiger-pruefen"], problem: "Gute Position, CTR 0", action: "title_description_improve; faq_add", service: "umzug", city: "neustadt-waldnaab", intent: intentLabels.umzug };
  }
  if (hasAny(normalized, ["umzug vohenstrauss"])) {
    return { targetPage: "/umzug-vohenstrauss", supportingPages: ["/umzug", "/angebot-guenstiger-pruefen"], problem: "Gute Position, CTR 0", action: "title_description_improve; faq_add", service: "umzug", city: "vohenstrauss", intent: intentLabels.umzug };
  }
  if (service === "seniorenumzug") {
    const targetCity = city && city !== "bayern" ? city : "bayern";
    return { targetPage: targetCity === "bayern" ? "/seniorenumzug-bayern" : `/seniorenumzug-${targetCity}`, supportingPages: ["/seniorenumzug-bayern", "/angebot-guenstiger-pruefen"], problem: "Seniorenumzug-Longtail braucht Hub/ausgewaehlte lokale Seiten statt Ortsmasse", action: "content_refresh; internal_links_add; manual_review", service, city: targetCity, intent: intentLabels.seniorenumzug };
  }
  if (currentPage) {
    return { targetPage: currentPage, supportingPages: [], problem: "Bestehende Zielseite aus Seiten.csv pruefen", action: "title_description_improve; content_refresh", service: service || "manual-review", city, intent: intentLabels[service] || "Suchintention manuell einordnen" };
  }
  return { targetPage: "", supportingPages: [], problem: "Kein klares Ziel ohne manuelle Pruefung", action: "manual_review", service: service || "manual-review", city, intent: intentLabels[service] || "Suchintention manuell einordnen" };
}

function priorityFor(record, recommendation) {
  const normalized = normalizeText(record.label);
  const isKnownP0 = knownP0Queries.some((query) => normalized.includes(query));
  const isKnownP1 = knownP1Queries.some((query) => normalized.includes(query));
  const coreService = ["angebot-pruefen", "bueroreinigung", "gewerbereinigung", "praxisreinigung", "fensterreinigung", "grundreinigung", "klaviertransport", "seniorenumzug", "umzug", "entruempelung", "diskret-service", "reinigung"].includes(recommendation.service);

  if (record.type === "page") {
    if (p0PageHints.has(record.path) && record.impressions >= 100 && record.ctr < 1) return "P0";
    if (p0PageHints.has(record.path) || (record.impressions >= 100 && coreService)) return "P1";
    if (record.impressions >= 50) return "P2";
    return "P3";
  }

  if (isKnownP0) return "P0";
  if (record.position >= 1 && record.position <= 10 && record.ctr === 0 && record.impressions >= 20 && coreService) return "P0";
  if (recommendation.city === "duesseldorf" && ["bueroreinigung", "gewerbereinigung", "praxisreinigung", "fensterreinigung", "grundreinigung"].includes(recommendation.service)) return "P0";
  if (isKnownP1) return "P1";
  if (record.position > 10 && record.position <= 25 && coreService && record.impressions >= 20) return "P1";
  if (record.impressions >= 100 && record.ctr < 1 && coreService) return "P1";
  if (record.position <= 40 && coreService) return "P2";
  return "P3";
}

function normalizeRecord(raw, type) {
  const query = redactPii(pick(raw, ["Haeufigste Suchanfragen", "Häufigste Suchanfragen", "Suchanfrage", "Suchanfragen", "Query", "Top queries"]));
  const pageRaw = redactPii(pick(raw, ["Die haeufigsten Seiten", "Die häufigsten Seiten", "Seite", "Page", "Pages", "URL", "Landing page"]));
  const page = canonicalPath(pageRaw);
  const clicks = parseNumber(pick(raw, ["Klicks", "Clicks"]));
  const impressions = parseNumber(pick(raw, ["Impressionen", "Impressions"]));
  const ctr = parseNumber(pick(raw, ["CTR", "Klickrate"]), { isCtr: true });
  const position = parseNumber(pick(raw, ["Position", "Average position", "Durchschnittliche Position"]));
  const label = type === "page" ? page : query;
  const recommendation = recommendTarget(label, type === "page" ? page : "");
  const status = routeStatus(recommendation.targetPage);
  const priority = priorityFor({ type, label, path: page, impressions, ctr, position }, recommendation);
  const service = recommendation.service || detectService(`${query} ${page}`);
  const city = recommendation.city || detectCity(`${query} ${page}`);
  const routeStatusLabel = status.exists ? (status.deprecated ? "WARN deprecated/seo-gone" : "PASS exists") : "WARN missing";
  const liveSignals = classifyLiveSignals(label, service, city, recommendation.targetPage, routeStatusLabel, {
    impressions,
    ctr: Math.round(ctr * 100) / 100,
    position: Math.round(position * 100) / 100,
    priority,
  });
  return {
    type,
    query,
    page,
    path: page,
    label,
    clicks,
    impressions,
    ctr: Math.round(ctr * 100) / 100,
    position: Math.round(position * 100) / 100,
    service,
    city,
    clusters: clusterFor(service, city, label),
    priority,
    implementation: status.exists && !status.deprecated && ["P0", "P1"].includes(priority) ? "Ja" : "Nein",
    routeStatus: routeStatusLabel,
    routeSource: status.source,
    liveSignals,
    ...recommendation,
  };
}

function listDataFiles() {
  if (!fs.existsSync(dataDir)) return [];
  return fs.readdirSync(dataDir).map((file) => ({ file, normalized: normalizeFileName(file), path: path.join(dataDir, file) }));
}

function findExpectedFile(meta, dataFiles) {
  const wanted = meta.names.map(normalizeFileName);
  return dataFiles.find((file) => wanted.includes(file.normalized));
}

function loadRecords(meta, dataFiles, warnings) {
  const match = findExpectedFile(meta, dataFiles);
  if (!match) {
    if (meta.required) warnings.push(`Missing required ${meta.label}`);
    else warnings.push(`Optional ${meta.label} not found`);
    return { file: meta.label, exists: false, rows: [], rowCount: 0 };
  }
  const text = fs.readFileSync(match.path, "utf8");
  const rows = parseCsv(text);
  return {
    file: path.relative(root, match.path),
    exists: true,
    rows,
    rowCount: rows.length,
  };
}

function sortByImpressions(records) {
  return [...records].sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks);
}

function sortByClicks(records) {
  return [...records].sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
}

function mdEscape(value) {
  return redactPii(value).replace(/\r?\n/g, " ").replace(/\|/g, "\\|").trim() || "-";
}

function mdTable(headers, rows) {
  return [
    `| ${headers.map(mdEscape).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...(rows.length ? rows.map((row) => `| ${row.map(mdEscape).join(" | ")} |`) : [`| ${headers.map(() => "-").join(" | ")} |`]),
  ].join("\n");
}

function yesNo(value) {
  return value ? "ja" : "nein";
}

function liveSignalRows(records, limit = 80) {
  return records.slice(0, limit).map((record) => [
    record.label,
    record.type,
    record.clicks,
    record.impressions,
    `${record.ctr}%`,
    record.position,
    record.service,
    record.city || "-",
    record.targetPage || "-",
    record.priority,
    yesNo(record.liveSignals?.isBrandQuery),
    yesNo(record.liveSignals?.isServiceQuery),
    yesNo(record.liveSignals?.isOfferCheckQuery),
    yesNo(record.liveSignals?.isSignatureServiceQuery),
    yesNo(record.liveSignals?.isSpecialServiceQuery),
    yesNo(record.liveSignals?.weakCtrTop10),
    yesNo(record.liveSignals?.highRelevance11to20),
    yesNo(record.liveSignals?.highImpressionsWeakPosition),
    yesNo(record.liveSignals?.missingTargetPage),
    yesNo(record.liveSignals?.unsupportedCity || record.liveSignals?.unsupportedService),
  ]);
}

function metric(record) {
  return `${record.clicks} Klicks / ${record.impressions} Impr. / ${record.ctr}% / Pos. ${record.position}`;
}

function topRows(records, limit = 12) {
  return records.slice(0, limit).map((record) => [
    record.label,
    record.clicks,
    record.impressions,
    `${record.ctr}%`,
    record.position,
    record.priority,
    record.targetPage || "-",
  ]);
}

function priorityRows(records, limit = 80) {
  return records.slice(0, limit).map((record) => [
    record.label,
    record.type === "query" ? "Query" : "Page",
    record.clicks,
    record.impressions,
    `${record.ctr}%`,
    record.position,
    record.intent,
    record.service,
    record.city || "-",
    record.targetPage || "-",
    record.problem,
    record.action,
    record.priority,
    record.implementation,
  ]);
}

function queryMapRows(records, limit = 90) {
  return records.slice(0, limit).map((record) => {
    const currentWrong = record.page && record.page !== record.targetPage ? "moeglich" : "nein/unklar";
    const doorwayRisk = record.targetPage && record.supportingPages.length ? "niedrig bei Abschnitt/FAQ, hoch bei neuer Ortsseite" : "manuell";
    return [
      record.query || record.label,
      record.intent,
      record.service,
      record.city || "-",
      record.page || "-",
      record.page === "/" ? "ja/prüfen" : "nein/unklar",
      currentWrong,
      record.page && record.page !== record.targetPage ? "ja/prüfen" : "nein",
      record.targetPage || "-",
      record.supportingPages.join(", ") || "-",
      record.action,
      record.page && record.page !== record.targetPage ? "mittel" : "niedrig",
      doorwayRisk,
      contactHref(record),
      record.implementation,
    ];
  });
}

function contactHref(record) {
  const service = record.service === "angebot-pruefen" ? "angebot-pruefen" : record.service || "anfrage";
  const params = new URLSearchParams({ service, intent: `${service}${record.city ? `-${record.city}` : ""}`, source: "seo" });
  if (record.city) params.set("city", record.city);
  if (record.service === "angebot-pruefen") params.set("intent", "angebot-pruefen");
  return `/kontakt?${params.toString()}`;
}

function snippetSuggestion(record) {
  const cityPart = record.city && !["bayern", "neustadt-waldnaab"].includes(record.city) ? ` ${displayCity(record.city)}` : "";
  const service = displayService(record.service);
  if (record.service === "angebot-pruefen") {
    return {
      title: "Reinigungsfirma-Angebot pruefen lassen",
      description: "Reinigungsfirma-Angebot einordnen: Flaeche, Turnus, Leistungsumfang, Fotos und offene Punkte vor der Zusage klaeren.",
    };
  }
  if (record.service === "diskret-service") {
    return {
      title: "Diskreter Service: sensible Anfrage klaeren",
      description: "Diskreten Fall beschreiben, bevorzugten Kontaktweg waehlen und Umzug, Reinigung oder Raeumung ruhig einordnen lassen.",
    };
  }
  if (record.service === "klaviertransport") {
    return {
      title: "Klaviertransport Regensburg vorbereiten",
      description: "Klaviertransport Regensburg mit Instrument, Etage, Treppenhaus, Zugang, Fotos und Termin vorab klaeren.",
    };
  }
  if (record.service === "seniorenumzug") {
    return {
      title: `Umzug im Alter${cityPart || " Bayern"} ruhig planen`,
      description: "Seniorenumzug mit Angehoerigen, Moebeln, Etage, Fotos, Reinigung und Uebergabe ohne Druck vorbereiten.",
    };
  }
  return {
    title: `${service}${cityPart} mit Eckdaten klaeren`,
    description: `${service}${cityPart} anfragen: Umfang, Zugang, Fotos, Termin und vorhandenes Angebot sachlich einordnen lassen.`,
  };
}

function displayService(service) {
  return {
    "angebot-pruefen": "Angebot",
    bueroreinigung: "Bueroreinigung",
    gewerbereinigung: "Gewerbereinigung",
    praxisreinigung: "Praxisreinigung",
    fensterreinigung: "Fensterreinigung",
    grundreinigung: "Grundreinigung",
    geruchsneutralisation: "Geruchsneutralisation",
    klaviertransport: "Klaviertransport",
    seniorenumzug: "Seniorenumzug",
    entruempelung: "Entruempelung",
    umzug: "Umzug",
    "diskret-service": "Diskreter Service",
    reinigung: "Reinigung",
  }[service] || "Service";
}

function displayCity(city) {
  return {
    duesseldorf: "Duesseldorf",
    regensburg: "Regensburg",
    landshut: "Landshut",
    muenchen: "Muenchen",
    nuernberg: "Nuernberg",
    bamberg: "Bamberg",
    erlangen: "Erlangen",
    wuerzburg: "Wuerzburg",
    vohenstrauss: "Vohenstrauss",
    "neustadt-waldnaab": "Neustadt an der Waldnaab",
    bayern: "Bayern",
  }[city] || city || "";
}

function snippetRows(records) {
  const seen = new Set();
  return records
    .filter((record) => record.targetPage)
    .filter((record) => {
      if (seen.has(record.targetPage)) return false;
      seen.add(record.targetPage);
      return true;
    })
    .slice(0, 35)
    .map((record) => {
      const suggestion = snippetSuggestion(record);
      return [
        record.targetPage,
        record.query || record.label,
        oldSnippet(record.targetPage),
        suggestion.title,
        suggestion.description,
        record.priority === "P0" ? "hoch" : "mittel",
        record.routeStatus,
        "nach 28 Tagen in GSC pruefen",
      ];
    });
}

function oldSnippet(route) {
  const priorityText = readIfExists(path.join(root, "lib", "gsc-click-priorities.ts"));
  const marker = `"${route}":`;
  const index = priorityText.indexOf(marker);
  if (index !== -1) {
    const block = priorityText.slice(index, index + 1600);
    const title = block.match(/title:\s*"([^"]+)"/)?.[1] || "";
    const description = block.match(/description:\s*"([^"]+)"/)?.[1] || "";
    if (title || description) return `${title || "-"} / ${description || "-"}`;
  }
  const file = routeFile(route);
  const text = readIfExists(file);
  const title = text.match(/title:\s*["'`]([^"'`]+)["'`]/)?.[1] || text.match(/metaTitle:\s*["'`]([^"'`]+)["'`]/)?.[1] || "";
  const description = text.match(/description:\s*["'`]([^"'`]+)["'`]/)?.[1] || text.match(/metaDescription:\s*["'`]([^"'`]+)["'`]/)?.[1] || "";
  return title || description ? `${title || "-"} / ${description || "-"}` : "nicht automatisch ermittelbar";
}

function writeReports(payload) {
  const { queries, pages, dataStatus, files, warnings, devices, priorityRecords } = payload;
  const topQueriesImpr = sortByImpressions(queries);
  const topQueriesClicks = sortByClicks(queries);
  const topPagesImpr = sortByImpressions(pages);
  const topPagesClicks = sortByClicks(pages);
  const pos1to10Ctr0 = sortByImpressions(queries.filter((record) => record.position >= 1 && record.position <= 10 && record.ctr === 0));
  const pos11to20Business = sortByImpressions(queries.filter((record) => record.position > 10 && record.position <= 20 && ["P0", "P1"].includes(record.priority)));
  const weakCtrPages = sortByImpressions(pages.filter((record) => record.impressions >= 50 && record.ctr < 1));
  const p0Queries = priorityRecords.filter((record) => record.type === "query" && record.priority === "P0");
  const p1Queries = priorityRecords.filter((record) => record.type === "query" && record.priority === "P1");
  const p0Pages = priorityRecords.filter((record) => record.type === "page" && record.priority === "P0");
  const p1Pages = priorityRecords.filter((record) => record.type === "page" && record.priority === "P1");
  const weakCtrTop10 = sortByImpressions(queries.filter((record) => record.liveSignals?.weakCtrTop10));
  const highRelevance11to20 = sortByImpressions(queries.filter((record) => record.liveSignals?.highRelevance11to20));
  const highImpressionsWeakPosition = sortByImpressions([...queries, ...pages].filter((record) => record.liveSignals?.highImpressionsWeakPosition));
  const missingTargets = sortByImpressions([...queries, ...pages].filter((record) => record.liveSignals?.missingTargetPage));
  const unsupported = sortByImpressions(queries.filter((record) => record.liveSignals?.unsupportedCity || record.liveSignals?.unsupportedService));

  const importReport = `# GSC Import Report ${exportDate}

Status: ${dataStatus}

## A-K Vorab-Auswertung

- A. Importierte Suchanfragen: ${queries.length}
- B. Importierte Seiten: ${pages.length}
- C. Top Queries nach Impressionen: ${topQueriesImpr.slice(0, 8).map((record) => `${record.label} (${metric(record)})`).join("; ")}
- D. Top Queries nach Klicks: ${topQueriesClicks.slice(0, 8).map((record) => `${record.label} (${metric(record)})`).join("; ")}
- E. Top Pages nach Impressionen: ${topPagesImpr.slice(0, 8).map((record) => `${record.label} (${metric(record)})`).join("; ")}
- F. Top Pages nach Klicks: ${topPagesClicks.slice(0, 8).map((record) => `${record.label} (${metric(record)})`).join("; ")}
- G. Queries Position 1-10 mit CTR 0: ${pos1to10Ctr0.slice(0, 12).map((record) => record.label).join("; ") || "keine"}
- H. Queries Position 11-20 mit Business-Relevanz: ${pos11to20Business.slice(0, 12).map((record) => record.label).join("; ") || "keine"}
- I. Seiten mit vielen Impressionen und niedriger CTR: ${weakCtrPages.slice(0, 12).map((record) => record.label).join("; ") || "keine"}
- J. Datenluecken: Query-zu-URL-Paare, Conversiondaten und Indexabdeckung fehlen im GSC-Export; Dusseldorf-Routen sind im Worktree teils geloescht/seo-gone.
- K. Risiken vor Implementierung: keine Massen-Seiten, keine Doorway-Fixes, keine blinde Wiederherstellung geloeschter Routen, keine Preis-/Ranking-Garantien.

## Importierte Dateien

${mdTable(["Datei", "Status", "Zeilen"], files.map((file) => [file.file, file.exists ? "PASS" : "WARN missing", file.rowCount]))}

## Top Queries nach Impressionen

${mdTable(["Query", "Klicks", "Impressionen", "CTR", "Position", "Prioritaet", "Zielseite"], topRows(topQueriesImpr))}

## Top Queries nach Klicks

${mdTable(["Query", "Klicks", "Impressionen", "CTR", "Position", "Prioritaet", "Zielseite"], topRows(topQueriesClicks))}

## Top Pages nach Impressionen

${mdTable(["URL", "Klicks", "Impressionen", "CTR", "Position", "Prioritaet", "Zielseite"], topRows(topPagesImpr))}

## Top Pages nach Klicks

${mdTable(["URL", "Klicks", "Impressionen", "CTR", "Position", "Prioritaet", "Zielseite"], topRows(topPagesClicks))}

## Position 1-10 mit CTR 0

${mdTable(["Query", "Klicks", "Impressionen", "CTR", "Position", "Prioritaet", "Zielseite"], topRows(pos1to10Ctr0, 20))}

## Position 11-20 mit Business-Relevanz

${mdTable(["Query", "Klicks", "Impressionen", "CTR", "Position", "Prioritaet", "Zielseite"], topRows(pos11to20Business, 20))}

## Seiten mit vielen Impressionen und niedriger CTR

${mdTable(["URL", "Klicks", "Impressionen", "CTR", "Position", "Prioritaet", "Zielseite"], topRows(weakCtrPages, 20))}

## Datenluecken und Warnungen

${warnings.map((warning) => `- ${warning}`).join("\n") || "- keine"}

## Regeln

- Keine Seiten wurden automatisch erstellt.
- Deutsche und englische Spaltennamen werden akzeptiert.
- CTR und Position wurden numerisch normalisiert.
- Prioritaeten sind eine Arbeitsqueue, keine automatische Noindex- oder Seitenmassnahme.
`;

  const priorityQueue = `# GSC Priority Queue ${exportDate}

Status: ${dataStatus}

${mdTable(
    ["Query oder URL", "Typ", "Klicks", "Impressionen", "CTR", "Position", "Suchintention", "Service", "Stadt", "bestehende Zielseite", "Problem", "Massnahme", "Prioritaet", "Umsetzung in dieser Runde"],
    priorityRows(priorityRecords, 140),
  )}

## P0/P1 Zusammenfassung

- P0 Queries: ${p0Queries.map((record) => record.label).slice(0, 30).join("; ") || "-"}
- P1 Queries: ${p1Queries.map((record) => record.label).slice(0, 30).join("; ") || "-"}
- P0 Seiten: ${p0Pages.map((record) => record.label).slice(0, 30).join("; ") || "-"}
- P1 Seiten: ${p1Pages.map((record) => record.label).slice(0, 30).join("; ") || "-"}
`;

  const queryMap = `# GSC Query To Page Map ${exportDate}

Status: ${dataStatus}

${mdTable(
    ["Suchanfrage", "Suchintention", "Service", "Stadt/Region", "aktuelle passende Seite", "Startseite falsch rankt", "lokale Seite falsch rankt", "generische Seite falsch rankt", "primaere Zielseite", "unterstuetzende Seiten", "Massnahmen", "Kannibalisierungsrisiko", "Doorway-Risiko", "CTA-Ziel", "Umsetzung"],
    queryMapRows(priorityRecords.filter((record) => record.type === "query"), 120),
  )}

## Regeln

- Eine Suchintention bekommt eine primaere Zielseite.
- Bestehende Seite verbessern vor neuer Seite.
- Dusseldorf-/Regensburg-Dubletten werden nicht blind geloescht.
- Longtail wird als Abschnitt, FAQ oder interne Verlinkung bevorzugt.
`;

  const ctrSnippet = `# GSC CTR Snippet Report ${exportDate}

${mdTable(
    ["URL", "Zielquery", "alte Title/Description", "neue Title", "neue Description", "erwartete CTR-Wirkung", "Risiko", "nach 28 Tagen pruefen"],
    snippetRows(priorityRecords.filter((record) => ["P0", "P1"].includes(record.priority))),
  )}

## Snippet-Regeln

- Suchintention frueh nennen.
- Keine Keyword-Kette, keine Preisgarantie, kein Ranking-Versprechen.
- Ort nur nennen, wenn die Seite wirklich lokal ausgerichtet ist.
`;

  const contentRefresh = `# GSC Content Refresh Report ${exportDate}

${mdTable(
    ["Cluster", "Zielseiten", "Quick Answer", "FAQ", "CTA/Angebotspruefung", "Interne Links", "Status"],
    [
      ["B2B Bueroreinigung", "/regensburg/bueroreinigung, /regensburg/gewerbereinigung", "Flaeche, Turnus, Raumliste und Zeitfenster klar beantworten", "Angebot pruefen, Randzeiten, Ansprechpartner", "/kontakt?service=bueroreinigung&intent=bueroreinigung-angebot-pruefen&source=seo", "/regensburg/gewerbereinigung, /angebot-guenstiger-pruefen", "umgesetzt/weiter pruefen"],
      ["Praxisreinigung Dusseldorf", "/duesseldorf/praxisreinigung", "Hygienische Anforderungen vorsichtig erklaeren", "keine Zertifikate erfinden", "/kontakt?service=praxisreinigung&city=duesseldorf&intent=praxisreinigung-duesseldorf&source=seo", "/duesseldorf/reinigung", "manuelle Routenpruefung wegen seo-gone"],
      ["Reinigung Dusseldorf", "/duesseldorf/reinigung", "Hub klar nach Service-Clustern strukturieren", "Fenster, Grundreinigung, Unterhalt, Angebot", "/kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo", "/duesseldorf/bueroreinigung, /duesseldorf/gewerbereinigung", "manuelle Routenpruefung"],
      ["Regensburg Umzug/Entruempelung", "/regensburg/umzug, /regensburg/entruempelung", "Primaerseiten gegen Legacy-Slugs staerken", "Angebot, Fotos, Etage, Zugang", "/kontakt?service=umzug&city=regensburg&intent=umzugsangebot-pruefen&source=seo", "/umzug-regensburg, /angebot-guenstiger-pruefen", "umgesetzt/weiter pruefen"],
      ["Klaviertransport Regensburg", "/klaviertransport-regensburg", "Instrument, Etage, Zugang, Fotos, Termin", "Treppenhaus, Fluegel, Preis ohne Blindzusage", "/kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo", "/regensburg/umzug, /angebot-guenstiger-pruefen", "umgesetzt"],
      ["Diskret-Service", "/private-client-service", "Zurueckhaltende Einordnung sensibler Faelle", "Kontaktweg, keine Rechts-/Sicherheitsberatung", "/kontakt?service=diskret-service&intent=diskret-service&source=seo", "/diskreter-umzug-trennung-scheidung, /kontakt", "umgesetzt"],
      ["Reinigung nach Entruempelung Landshut", "/entruempelung-landshut", "Besenrein vs. gruendlich nach Raeumung erklaeren", "Staub, Geruch, Uebergabe, Fotos", "/kontakt?service=entruempelung&city=landshut&intent=reinigung-nach-entruempelung-landshut&source=seo", "/regensburg/reinigung, /angebot-guenstiger-pruefen", "umgesetzt ohne neue Seite"],
      ["Seniorenumzug / Umzug im Alter", "/seniorenumzug-bayern plus ausgewaehlte lokale Routen", "Angehoerige, Reduzierung, Uebergabe ruhig klaeren", "Packhilfe, Freigabe, Reinigung, Rueckruf", "/kontakt?service=umzug&intent=seniorenumzug&source=seo", "/angebot-guenstiger-pruefen", "dynamische Routen pruefen"],
    ],
  )}
`;

  const internalLinking = `# GSC Internal Linking Report ${exportDate}

${mdTable(
    ["Quelle/Cluster", "Linkziel", "Kontext", "Linktext", "Status"],
    [
      ["B2B Bueroreinigung", "/angebot-guenstiger-pruefen", "Vorhandenes Angebot mit Raumliste und Turnus pruefen", "Bueroreinigungsangebot pruefen", "umgesetzt"],
      ["Regensburg Reinigung", "/regensburg/bueroreinigung", "Bueroflaechen und Gewerbe sauber trennen", "Bueroreinigung Regensburg", "umgesetzt"],
      ["Regensburg Reinigung", "/regensburg/gewerbereinigung", "Objekt, Turnus, Randzeit", "Gewerbereinigung Regensburg", "umgesetzt"],
      ["Klaviertransport", "/regensburg/umzug", "Transport im Umzugskontext", "Umzug Regensburg", "umgesetzt"],
      ["Landshut Entruempelung", "/regensburg/reinigung", "Reinigung nach Raeumung als Abschnitt", "Reinigung nach Raeumung", "umgesetzt"],
      ["Diskret-Service", "/diskreter-umzug-trennung-scheidung", "Sensible Auszugssituation", "Diskreten Auszug absichern", "umgesetzt"],
      ["Dusseldorf Cluster", "/duesseldorf/reinigung", "Nur nach Routenfreigabe staerken", "Reinigung Dusseldorf", "manuelle Pruefung"],
    ],
  )}

Keine Footer-Link-Farm, keine Keyword-Wolke, keine neuen Doorway-Seiten.
`;

  const cannibalization = `# GSC Cannibalization And Indexing Report ${exportDate}

${mdTable(
    ["Cluster", "Primaere Zielseite", "Support/Alt", "Risiko", "Massnahme"],
    [
      ["Regensburg Umzug", "/regensburg/umzug", "/umzug-regensburg", "hoch: beide im Export", "Primaerseite intern staerken, Legacy nicht blind loeschen"],
      ["Regensburg Entruempelung", "/regensburg/entruempelung", "/entruempelung-regensburg", "hoch: beide im Export", "Primaerseite definieren, Canonical/Links pruefen"],
      ["Dusseldorf Reinigung", "/duesseldorf/reinigung", "/duesseldorf/reinigungsfirma, /duesseldorf/putzfirma", "hoch: Routen im Worktree kritisch", "keine Massen-Wiederherstellung; manuelle Business-Freigabe"],
      ["Dusseldorf Bueroreinigung/Gewerbereinigung", "/duesseldorf/bueroreinigung", "/duesseldorf/gewerbereinigung", "mittel: Intent verwandt", "Bueroreinigung=Raum/Turnus, Gewerbe=Objekt/Branche differenzieren"],
      ["Angebotscheck", "/angebot-guenstiger-pruefen", "/angebotscheck, /anbieter-vergleichen", "mittel", "Rollen klaeren: Pruefung vs. Check vs. Vergleich"],
      ["Seniorenumzug", "/seniorenumzug-bayern", "lokale Routen Bamberg/Erlangen/Wuerzburg", "mittel", "Hub staerken, lokale Seiten nur mit klarer Nachfrage"],
      ["Landshut Reinigung/Entruempelung", "/entruempelung-landshut", "/reinigung-landshut", "mittel: Kombi-Intent", "Kombi-Abschnitt statt neue duenne Seite"],
    ],
  )}

Keine Massen-Noindex-Aktion umgesetzt.
`;

  const mobileUx = `# GSC Mobile CTR UX Report ${exportDate}

## Geraete

${mdTable(["Geraet", "Klicks", "Impressionen", "CTR", "Position"], devices.map((item) => [item.device, item.clicks, item.impressions, `${item.ctr}%`, item.position]))}

## Mobile-/Desktop-Signale

- Mobile: ${devices.find((item) => item.device === "Mobil")?.ctr ?? "-"}% CTR bei ${devices.find((item) => item.device === "Mobil")?.impressions ?? "-"} Impressionen.
- Computer: ${devices.find((item) => item.device === "Computer")?.ctr ?? "-"}% CTR bei ${devices.find((item) => item.device === "Computer")?.impressions ?? "-"} Impressionen.
- Desktop hat deutlich mehr Impressionen, aber schwache CTR; Snippet-Verbesserungen sind nicht nur Mobile-Thema.
- Mobile QA bleibt wichtig fuer Kontakt-CTA, Hero-Hoehe, horizontale Scrollbars und Formularparameter.

## Priorisierte Mobile-Routen

${mdTable(
    ["Route", "Pruefung", "Status"],
    ["/duesseldorf/reinigung", "/duesseldorf", "/kontakt", "/angebot-guenstiger-pruefen", "/regensburg/umzug", "/umzug-regensburg"].map((route) => [route, "H1, CTA, Hero, Formularparameter, kein Sticky-Problem", routeStatus(route).exists ? routeStatus(route).deprecated ? "WARN deprecated" : "PASS exists" : "WARN missing"]),
  )}
`;

  const checklist28d = `# GSC Next 28 Day Checklist ${exportDate}

${mdTable(
    ["Was pruefen", "Queries/Seiten", "Ziel-CTR", "Ziel-Position", "Lead-/Kontakt-Signal", "Risiko"],
    [
      ["P0 CTR-0 Queries", p0Queries.slice(0, 15).map((record) => record.label).join("; "), "> 1.5%", "Position halten oder verbessern", "Kontaktklicks aus SEO-CTA", "Snippet ohne Clickbait"],
      ["P1 Quick Wins", p1Queries.slice(0, 15).map((record) => record.label).join("; "), "> 1.0%", "Richtung Top 10", "mehr Angebotspruefungen", "Kannibalisierung beobachten"],
      ["P0 Seiten", p0Pages.slice(0, 12).map((record) => record.label).join("; "), "> 1.0%", "Positionsverlust vermeiden", "Lead-Formular und Kontaktparameter", "Dusseldorf-Routenstatus"],
      ["Regensburg Dubletten", "/regensburg/umzug vs /umzug-regensburg; /regensburg/entruempelung vs /entruempelung-regensburg", "CTR Primaerseite steigt", "Primaerseite gewinnt", "Kontaktklicks steigen", "keine radikale Loeschung"],
      ["Vercel Usage", "Public-Seiten normal laden", "n/a", "n/a", "keine Usage-Spikes", "keine neue dynamische Serverlogik"],
    ],
  )}
`;

  const liveImport = `# Live GSC Import Report

Status: ${dataStatus}
Export-Datum: ${exportDate}
Generiert: ${new Date().toISOString()}

## Datenstatus

- Suchanfragen importiert: ${queries.length}
- Seiten importiert: ${pages.length}
- CSV-Quelle: ${files.filter((file) => file.exists).map((file) => file.file).join(", ") || "keine CSV gefunden"}
- Keine Google-API-Anbindung, keine Fake-Daten, keine Lead- oder Conversion-Zahlen aus GSC abgeleitet.

${queries.length && pages.length ? "" : `## Manuelle Exportanweisung

1. Google Search Console oeffnen.
2. Property fuer floxant.de waehlen.
3. Leistung -> Suchergebnisse -> Zeitraum 28 Tage.
4. Tabs Suchanfragen, Seiten, Geraete, Laender und Darstellung in der Suche als CSV exportieren.
5. CSV-Dateien in data/gsc/ ablegen.
6. Danach npm run gsc:import erneut ausfuehren.
`}

## Opportunity-Signale

- Position 1-10 mit schwacher CTR: ${weakCtrTop10.length}
- Position 11-20 mit hoher Relevanz: ${highRelevance11to20.length}
- Viele Impressionen mit schwacher Position: ${highImpressionsWeakPosition.length}
- Queries/Seiten ohne sichere Zielseite oder mit kritischer Route: ${missingTargets.length}
- Nicht klar bediente Orte/Leistungen: ${unsupported.length}

## Top Live-Signale

${mdTable(
    [
      "Query/URL",
      "Typ",
      "Klicks",
      "Impr.",
      "CTR",
      "Pos.",
      "Service",
      "Stadt",
      "Zielseite",
      "Prio",
      "Brand",
      "Service",
      "Angebot",
      "Signature",
      "Spezial",
      "Top10 schwache CTR",
      "Pos 11-20 relevant",
      "Impr hoch/Pos schwach",
      "Zielseite fehlt",
      "nicht bedient",
    ],
    liveSignalRows(priorityRecords, 120),
  )}

## Warnungen

${warnings.map((warning) => `- ${warning}`).join("\n") || "- keine Importwarnungen"}

## Regeln

- Keine neuen SEO-Seiten aus diesem Report ableiten, bevor Suchintention, Service und Zielseite manuell plausibilisiert sind.
- Nicht bediente Orte sind P3 oder manuelle Business-Entscheidung, keine Doorway-Seiten.
- Kontakt- und Lead-Daten werden hier nicht gespeichert.
- CTR-/Positionswerte sind GSC-Aggregate, keine Conversion-Rates.
`;

  fs.writeFileSync(outputs.importReport, importReport);
  fs.writeFileSync(outputs.legacyImport, importReport);
  fs.writeFileSync(outputs.priorityQueue, priorityQueue);
  fs.writeFileSync(outputs.queryMap, queryMap);
  fs.writeFileSync(outputs.legacyMap, queryMap);
  fs.writeFileSync(outputs.ctrSnippet, ctrSnippet);
  fs.writeFileSync(outputs.contentRefresh, contentRefresh);
  fs.writeFileSync(outputs.internalLinking, internalLinking);
  fs.writeFileSync(outputs.cannibalization, cannibalization);
  fs.writeFileSync(outputs.mobileUx, mobileUx);
  fs.writeFileSync(outputs.checklist28d, checklist28d);
  fs.writeFileSync(outputs.liveImport, liveImport);
}

const growthPeriodOrder = ["24h", "7d", "28d", "3m"];

const growthRouteRules = [
  {
    id: "duesseldorf-office-cleaning",
    matches: (value) => value.includes("bueroreinigung") && value.includes("duesseldorf"),
    service: "bueroreinigung",
    city: "duesseldorf",
    primaryRoute: "/duesseldorf/bueroreinigung",
  },
  {
    id: "duesseldorf-practice-cleaning",
    matches: (value) => value.includes("praxisreinigung") && value.includes("duesseldorf"),
    service: "praxisreinigung",
    city: "duesseldorf",
    primaryRoute: "/duesseldorf/praxisreinigung",
  },
  {
    id: "duesseldorf-window-cleaning",
    matches: (value) =>
      (value.includes("fensterreinigung") || value.includes("fensterreiniger") || value.includes("glasreinigung")) &&
      value.includes("duesseldorf"),
    service: "fensterreinigung",
    city: "duesseldorf",
    primaryRoute: "/duesseldorf/fensterreinigung",
  },
  {
    id: "duesseldorf-deep-cleaning",
    matches: (value) => value.includes("grundreinigung") && value.includes("duesseldorf"),
    service: "grundreinigung",
    city: "duesseldorf",
    primaryRoute: "/duesseldorf/grundreinigung",
  },
  {
    id: "duesseldorf-maintenance-cleaning",
    matches: (value) => value.includes("unterhaltsreinigung") && value.includes("duesseldorf"),
    service: "unterhaltsreinigung",
    city: "duesseldorf",
    primaryRoute: "/duesseldorf/unterhaltsreinigung",
  },
  {
    id: "duesseldorf-construction-cleaning",
    matches: (value) =>
      ["bauendreinigung", "baufeinreinigung", "baustellenreinigung", "baureinigung"].some((term) =>
        value.includes(term),
      ) && value.includes("duesseldorf"),
    service: "baureinigung",
    city: "duesseldorf",
    primaryRoute: "/duesseldorf/baureinigung",
  },
  {
    id: "duesseldorf-commercial-cleaning",
    matches: (value) => value.includes("gewerbereinigung") && value.includes("duesseldorf"),
    service: "gewerbereinigung",
    city: "duesseldorf",
    primaryRoute: "/duesseldorf/gewerbereinigung",
  },
  {
    id: "duesseldorf-cleaning-hub",
    matches: (value) =>
      ["reinigung", "reinigungsfirma", "reinigungsdienst", "reinigungsunternehmen", "putzfirma"].some((term) =>
        value.includes(term),
      ) && value.includes("duesseldorf"),
    service: "reinigung",
    city: "duesseldorf",
    primaryRoute: "/duesseldorf/reinigung",
  },
  {
    id: "regensburg-piano-transport",
    matches: (value) => (value.includes("klaviertransport") || value.includes("pianotransport")) && value.includes("regensburg"),
    service: "klaviertransport",
    city: "regensburg",
    primaryRoute: "/klaviertransport-regensburg",
  },
  {
    id: "regensburg-household-clearance",
    matches: (value) =>
      (value.includes("wohnungsaufloesung") || value.includes("haushaltsaufloesung")) && value.includes("regensburg"),
    service: "wohnungsaufloesung",
    city: "regensburg",
    primaryRoute: "/regensburg/wohnungsaufloesung",
  },
  {
    id: "regensburg-clearance",
    matches: (value) => value.includes("entruempelung") && value.includes("regensburg"),
    service: "entruempelung",
    city: "regensburg",
    primaryRoute: "/regensburg/entruempelung",
  },
  {
    id: "regensburg-move",
    matches: (value) =>
      ["umzug", "umzugsfirma", "umzugsunternehmen", "umzugsservice"].some((term) => value.includes(term)) &&
      value.includes("regensburg"),
    service: "umzug",
    city: "regensburg",
    primaryRoute: "/regensburg/umzug",
  },
  {
    id: "cleaning-offer",
    matches: (value) =>
      value.includes("reinig") && (value.includes("angebot") || value.includes("kostenvoranschlag")),
    service: "reinigungsangebot",
    city: "",
    primaryRoute: "/reinigungsfirma-angebot",
  },
];

const growthProtectedRoutes = new Set([
  "/",
  "/duesseldorf/reinigung",
  "/duesseldorf/grundreinigung",
  "/duesseldorf/baureinigung",
  "/klaviertransport-regensburg",
]);

const growthLegacyRiskRoutes = new Map([
  ["/umzug-regensburg", "/regensburg/umzug"],
  ["/entruempelung-regensburg", "/regensburg/entruempelung"],
  ["/wohnungsaufloesung-regensburg", "/regensburg/wohnungsaufloesung"],
  ["/bueroreinigung-duesseldorf", "/duesseldorf/bueroreinigung"],
  ["/praxisreinigung-duesseldorf", "/duesseldorf/praxisreinigung"],
  ["/fensterreinigung-duesseldorf", "/duesseldorf/fensterreinigung"],
  ["/gewerbereinigung-duesseldorf", "/duesseldorf/gewerbereinigung"],
]);

function growthArgument(name, fallback = "") {
  const direct = process.argv.find((value) => value.startsWith(`${name}=`));
  if (direct) return direct.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function csvCell(value) {
  const text = String(value ?? "");
  if (!/[",\r\n]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function writeCsvFile(filePath, headers, rows) {
  ensureDir(path.dirname(filePath));
  const content = [
    headers.map(csvCell).join(","),
    ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(",")),
  ].join("\n");
  fs.writeFileSync(filePath, `${content}\n`, "utf8");
}

function periodFromFilter(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true }).filter((entry) => entry.isFile());
  const filter = files.find((entry) => normalizeFileName(entry.name) === "filter.csv");
  if (!filter) return "";
  const value = normalizeText(fs.readFileSync(path.join(directory, filter.name), "utf8"));
  if (value.includes("24 stunden")) return "24h";
  if (value.includes("7 tage")) return "7d";
  if (value.includes("28 tage")) return "28d";
  if (value.includes("3 monate")) return "3m";
  return "";
}

function extractGrowthZip(zipPath, extractionRoot) {
  const destination = path.join(extractionRoot, path.basename(zipPath, path.extname(zipPath)));
  ensureDir(destination);
  const tool = process.platform === "win32" ? "tar.exe" : "unzip";
  const args = process.platform === "win32" ? ["-xf", zipPath, "-C", destination] : ["-qq", zipPath, "-d", destination];
  execFileSync(tool, args, { stdio: "pipe" });
  return destination;
}

function discoverGrowthPeriodDirectories(inputPath) {
  const resolved = path.resolve(inputPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`GSC input not found: ${resolved}`);
  }

  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "floxant-gsc-"));
  const candidates = [];
  const addDirectory = (directory) => {
    if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) return;
    if (periodFromFilter(directory)) candidates.push(directory);
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const child = path.join(directory, entry.name);
        if (periodFromFilter(child)) candidates.push(child);
      }
    }
  };

  if (fs.statSync(resolved).isFile()) {
    if (path.extname(resolved).toLowerCase() !== ".zip") {
      throw new Error("Growth mode expects a Search Console ZIP or a directory containing period exports.");
    }
    addDirectory(extractGrowthZip(resolved, temporaryRoot));
  } else {
    addDirectory(resolved);
    if (!candidates.length) {
      for (const entry of fs.readdirSync(resolved, { withFileTypes: true })) {
        if (entry.isFile() && path.extname(entry.name).toLowerCase() === ".zip") {
          addDirectory(extractGrowthZip(path.join(resolved, entry.name), temporaryRoot));
        }
      }
    }
  }

  const byPeriod = new Map();
  for (const directory of candidates) {
    const period = periodFromFilter(directory);
    if (period && !byPeriod.has(period)) byPeriod.set(period, directory);
  }
  return { byPeriod, temporaryRoot };
}

function growthCsvPath(directory, expectedNames) {
  const wanted = expectedNames.map(normalizeFileName);
  const entry = fs
    .readdirSync(directory, { withFileTypes: true })
    .find((candidate) => candidate.isFile() && wanted.includes(normalizeFileName(candidate.name)));
  return entry ? path.join(directory, entry.name) : "";
}

function readGrowthRows(directory, expectedNames) {
  const file = growthCsvPath(directory, expectedNames);
  if (!file) return { file: "", rows: [] };
  return { file, rows: parseCsv(fs.readFileSync(file, "utf8")) };
}

function normalizeGrowthMetricRecord(raw, type, period) {
  const query = redactPii(
    pick(raw, [
      "Haeufigste Suchanfragen",
      "Häufigste Suchanfragen",
      "HÃ¤ufigste Suchanfragen",
      "Suchanfrage",
      "Query",
      "Top queries",
    ]),
  ).trim();
  const rawPage = redactPii(
    pick(raw, [
      "Die haeufigsten Seiten",
      "Die häufigsten Seiten",
      "Die hÃ¤ufigsten Seiten",
      "Seite",
      "Page",
      "Pages",
      "URL",
    ]),
  );
  const page = canonicalPath(rawPage);
  const label = type === "query" ? query : page;
  return {
    type,
    period,
    label,
    query,
    page,
    clicks: parseNumber(pick(raw, ["Klicks", "Clicks"])),
    impressions: parseNumber(pick(raw, ["Impressionen", "Impressions"])),
    ctr: Math.round(parseNumber(pick(raw, ["CTR", "Klickrate"]), { isCtr: true }) * 100) / 100,
    position:
      Math.round(parseNumber(pick(raw, ["Position", "Average position", "Durchschnittliche Position"])) * 100) / 100,
  };
}

function growthRouteRule(record) {
  const normalized = normalizeText(record.label);
  const rule = growthRouteRules.find((candidate) => candidate.matches(normalized));
  if (rule) {
    return {
      cluster: rule.id,
      service: rule.service,
      city: rule.city,
      primaryRoute: rule.primaryRoute,
      relationStatus: record.type === "query" ? "probable" : record.page === rule.primaryRoute ? "not_applicable" : "manual_review",
    };
  }

  if (record.type === "page") {
    const legacyTarget = growthLegacyRiskRoutes.get(record.page);
    if (legacyTarget) {
      return {
        cluster: "legacy-route-variant",
        service: "",
        city: record.page.includes("duesseldorf") ? "duesseldorf" : "regensburg",
        primaryRoute: legacyTarget,
        relationStatus: "not_applicable",
      };
    }
  }

  return {
    cluster: "unclassified",
    service: "",
    city: "",
    primaryRoute: "",
    relationStatus: record.type === "query" ? "unclear" : "not_applicable",
  };
}

function growthClasses(record, context) {
  const classes = new Set();
  const rule = growthRouteRule(record);
  const normalized = normalizeText(record.label);
  const targetPage = rule.primaryRoute ? context.pageByPath.get(rule.primaryRoute) : null;

  if (
    (record.type === "page" && growthProtectedRoutes.has(record.page)) ||
    (normalized.includes("grundreinigung") && normalized.includes("duesseldorf") && record.position <= 5) ||
    (normalized.includes("bauendreinigung") && normalized.includes("duesseldorf") && record.position <= 6) ||
    (normalized.includes("klaviertransport") && normalized.includes("regensburg") && record.position <= 5)
  ) {
    classes.add("PROTECT_WINNER");
  }
  if (record.impressions >= 20 && record.position > 0 && record.position <= 10 && record.ctr < 1) {
    classes.add("CTR_OPPORTUNITY");
  }
  if (record.position >= 4 && record.position <= 10 && record.impressions >= 10) {
    classes.add("POSITION_4_TO_10");
  }
  if (record.position > 10 && record.position <= 20 && record.impressions >= 10) {
    classes.add("POSITION_11_TO_20");
    classes.add("PAGE_TWO_OPPORTUNITY");
  }
  if (record.type === "page" && rule.primaryRoute && record.position > 20 && record.impressions >= 20) {
    classes.add("WEAK_SERVICE_PAGE");
  }
  if (
    record.type === "query" &&
    rule.primaryRoute &&
    record.impressions >= 50 &&
    targetPage &&
    targetPage.position > 20
  ) {
    classes.add("STRONG_QUERY_WEAK_PAGE");
  }
  if (
    (record.type === "page" && growthLegacyRiskRoutes.has(record.page)) ||
    (record.type === "query" &&
      rule.primaryRoute &&
      ["/regensburg/umzug", "/regensburg/entruempelung", "/duesseldorf/bueroreinigung"].includes(rule.primaryRoute))
  ) {
    classes.add("CANNIBALIZATION_RISK");
  }
  if (record.period === "24h" && record.impressions >= 5 && !context.records28d.has(`${record.type}:${record.label}`)) {
    classes.add("NEW_PAGE_TOO_YOUNG");
  }
  if (
    record.type === "query" &&
    record.impressions >= 20 &&
    !rule.primaryRoute &&
    /(berlin|hamburg|koeln|muenchen|landshut|nuernberg|augsburg)/.test(normalized)
  ) {
    classes.add("OFF_TOPIC_VISIBILITY");
  }
  if (!classes.size) classes.add("MANUAL_REVIEW");
  return [...classes];
}

function growthAction(record, rule, classes) {
  if (classes.includes("PROTECT_WINNER")) return "Protect URL and primary signals; use one measured snippet or internal-link improvement.";
  if (classes.includes("STRONG_QUERY_WEAK_PAGE")) return "Audit indexability, canonical, sitemap, internal links and competing pages before changing the target.";
  if (classes.includes("CANNIBALIZATION_RISK")) return "Review historical alias, redirect, canonical, sitemap and internal links; do not infer query-to-URL proof.";
  if (classes.includes("CTR_OPPORTUNITY")) return "Test one concise title or description variant and measure for at least 28 days.";
  if (classes.includes("POSITION_11_TO_20")) return "Strengthen intent-specific copy, FAQs and precise internal links without creating a synonym page.";
  if (classes.includes("WEAK_SERVICE_PAGE")) return "Align H1, visible answer, scope, required details and related links with the page task.";
  if (rule.primaryRoute) return `Review ${rule.primaryRoute} manually against the separate query and page aggregates.`;
  return "Manual review; no automatic route or content decision.";
}

function aggregateChart(rows) {
  const values = rows.map((row) => ({
    clicks: parseNumber(pick(row, ["Klicks", "Clicks"])),
    impressions: parseNumber(pick(row, ["Impressionen", "Impressions"])),
    position: parseNumber(pick(row, ["Position", "Average position", "Durchschnittliche Position"])),
  }));
  const clicks = values.reduce((sum, row) => sum + row.clicks, 0);
  const impressions = values.reduce((sum, row) => sum + row.impressions, 0);
  const weightedPosition =
    impressions > 0 ? values.reduce((sum, row) => sum + row.position * row.impressions, 0) / impressions : 0;
  return {
    clicks,
    impressions,
    ctr: impressions > 0 ? Math.round((clicks / impressions) * 10000) / 100 : 0,
    weightedPosition: Math.round(weightedPosition * 100) / 100,
  };
}

function normalizeGrowthDevice(raw) {
  const rawName = pick(raw, ["Geraet", "Gerät", "GerÃ¤t", "Device"]);
  const normalized = normalizeText(rawName);
  const device = normalized.includes("mobil")
    ? "mobile"
    : normalized.includes("computer") || normalized.includes("desktop")
      ? "desktop"
      : normalized.includes("tablet")
        ? "tablet"
        : normalized || "unknown";
  return {
    device,
    clicks: parseNumber(pick(raw, ["Klicks", "Clicks"])),
    impressions: parseNumber(pick(raw, ["Impressionen", "Impressions"])),
    ctr: Math.round(parseNumber(pick(raw, ["CTR", "Klickrate"]), { isCtr: true }) * 100) / 100,
    position:
      Math.round(parseNumber(pick(raw, ["Position", "Average position", "Durchschnittliche Position"])) * 100) / 100,
  };
}

function mainGrowth() {
  const input = growthArgument("--input", privateSearchConsoleDir);
  const exportDateValue = growthArgument("--export-date", growthExportDate);
  ensureDir(growthArtifactsDir);

  const { byPeriod, temporaryRoot } = discoverGrowthPeriodDirectories(input);
  try {
    const missing = growthPeriodOrder.filter((period) => !byPeriod.has(period));
    if (missing.length) {
      throw new Error(`Missing Search Console periods: ${missing.join(", ")}`);
    }

    const periodData = {};
    for (const period of growthPeriodOrder) {
      const directory = byPeriod.get(period);
      const chart = readGrowthRows(directory, ["Diagramm.csv", "Chart.csv"]);
      const queries = readGrowthRows(directory, ["Suchanfragen.csv", "Queries.csv"]);
      const pages = readGrowthRows(directory, ["Seiten.csv", "Pages.csv"]);
      const devices = readGrowthRows(directory, ["Geräte.csv", "Geraete.csv", "Devices.csv"]);
      periodData[period] = {
        directory,
        sourceFiles: [chart.file, queries.file, pages.file, devices.file].filter(Boolean).map((file) => path.basename(file)),
        metrics: aggregateChart(chart.rows),
        queries: queries.rows
          .map((row) => normalizeGrowthMetricRecord(row, "query", period))
          .filter((record) => record.label),
        pages: pages.rows.map((row) => normalizeGrowthMetricRecord(row, "page", period)).filter((record) => record.label),
        devices: devices.rows.map(normalizeGrowthDevice),
      };
    }

    const primary = periodData["28d"];
    const records28d = new Set(
      [...primary.queries, ...primary.pages].map((record) => `${record.type}:${record.label}`),
    );
    const pageByPath = new Map(primary.pages.map((record) => [record.page, record]));
    const context = { records28d, pageByPath };

    const enrich = (record) => {
      const rule = growthRouteRule(record);
      const classes = growthClasses(record, context);
      return {
        period: record.period,
        type: record.type,
        label: record.label,
        clicks: record.clicks,
        impressions: record.impressions,
        ctr: record.ctr,
        position: record.position,
        classes: classes.join("|"),
        cluster: rule.cluster,
        service: rule.service,
        city: rule.city,
        suggestedPrimaryRoute: rule.primaryRoute,
        relationStatus: rule.relationStatus,
        action: growthAction(record, rule, classes),
      };
    };

    const queryOpportunities = primary.queries
      .map(enrich)
      .filter((row) => row.impressions >= 10 || row.classes !== "MANUAL_REVIEW")
      .sort((a, b) => b.impressions - a.impressions || a.position - b.position);
    const pageOpportunities = primary.pages
      .map(enrich)
      .filter((row) => row.impressions >= 10 || row.classes !== "MANUAL_REVIEW")
      .sort((a, b) => b.impressions - a.impressions || a.position - b.position);

    const riskPages = pageOpportunities
      .filter(
        (row) =>
          row.classes.includes("CANNIBALIZATION_RISK") ||
          row.classes.includes("WEAK_SERVICE_PAGE") ||
          row.classes.includes("OFF_TOPIC_VISIBILITY") ||
          row.position > 50,
      )
      .map((row) => ({
        page: row.label,
        impressions: row.impressions,
        clicks: row.clicks,
        ctr: row.ctr,
        position: row.position,
        riskClass: row.classes,
        primaryRoute: row.suggestedPrimaryRoute,
        evidence: growthLegacyRiskRoutes.has(row.label)
          ? "Historical route variant is present in the page aggregate and a local 308 rule points to the primary route."
          : "Page aggregate indicates weak visibility; query assignment remains unproven.",
        decision: growthProtectedRoutes.has(row.label) ? "PROTECT_WINNER" : "MANUAL_REVIEW",
      }));

    const deviceRows = growthPeriodOrder.flatMap((period) => {
      const devices = periodData[period].devices;
      const mobile = devices.find((row) => row.device === "mobile");
      const desktop = devices.find((row) => row.device === "desktop");
      const ctrGap = mobile && desktop ? Math.round((mobile.ctr - desktop.ctr) * 100) / 100 : "";
      return devices.map((row) => ({
        period,
        ...row,
        mobileMinusDesktopCtrPoints: ctrGap,
      }));
    });

    const desktop28d = primary.devices.find((row) => row.device === "desktop");
    const mobile28d = primary.devices.find((row) => row.device === "mobile");
    const summary = {
      generatedAt: new Date().toISOString(),
      exportDate: exportDateValue,
      property: "https://www.floxant.de/",
      sourceStorage: "data/private/search-console/",
      rawFilesCommitted: false,
      methodology: {
        queryAndPageExportsAreSeparateAggregates: true,
        queryToUrlRelationsAreNotTreatedAsProof: true,
        allowedRelationLabels: ["confirmed", "probable", "unclear", "manual_review"],
        confirmedQueryToUrlMappings: 0,
      },
      periods: Object.fromEntries(
        growthPeriodOrder.map((period) => [
          period,
          {
            ...periodData[period].metrics,
            queryRows: periodData[period].queries.length,
            pageRows: periodData[period].pages.length,
            sourceFiles: periodData[period].sourceFiles,
          },
        ]),
      ),
      deviceGap28d: {
        mobile: mobile28d || null,
        desktop: desktop28d || null,
        mobileMinusDesktopCtrPoints:
          mobile28d && desktop28d ? Math.round((mobile28d.ctr - desktop28d.ctr) * 100) / 100 : null,
      },
      opportunityCounts28d: {
        queryRows: queryOpportunities.length,
        pageRows: pageOpportunities.length,
        riskPages: riskPages.length,
        protectedWinners: [...queryOpportunities, ...pageOpportunities].filter((row) =>
          row.classes.includes("PROTECT_WINNER"),
        ).length,
        ctrOpportunities: [...queryOpportunities, ...pageOpportunities].filter((row) =>
          row.classes.includes("CTR_OPPORTUNITY"),
        ).length,
        probableCannibalizationRisks: [...queryOpportunities, ...pageOpportunities].filter((row) =>
          row.classes.includes("CANNIBALIZATION_RISK"),
        ).length,
      },
    };

    fs.writeFileSync(
      path.join(growthArtifactsDir, `gsc-summary-${exportDateValue}.json`),
      `${JSON.stringify(summary, null, 2)}\n`,
      "utf8",
    );
    const opportunityHeaders = [
      "period",
      "type",
      "label",
      "clicks",
      "impressions",
      "ctr",
      "position",
      "classes",
      "cluster",
      "service",
      "city",
      "suggestedPrimaryRoute",
      "relationStatus",
      "action",
    ];
    writeCsvFile(
      path.join(growthArtifactsDir, `gsc-query-opportunities-${exportDateValue}.csv`),
      opportunityHeaders,
      queryOpportunities,
    );
    writeCsvFile(
      path.join(growthArtifactsDir, `gsc-page-opportunities-${exportDateValue}.csv`),
      opportunityHeaders,
      pageOpportunities,
    );
    writeCsvFile(
      path.join(growthArtifactsDir, `gsc-device-gap-${exportDateValue}.csv`),
      ["period", "device", "clicks", "impressions", "ctr", "position", "mobileMinusDesktopCtrPoints"],
      deviceRows,
    );
    writeCsvFile(
      path.join(growthArtifactsDir, `gsc-risk-pages-${exportDateValue}.csv`),
      ["page", "impressions", "clicks", "ctr", "position", "riskClass", "primaryRoute", "evidence", "decision"],
      riskPages,
    );

    console.log(
      `GSC_GROWTH_IMPORT_OK periods=${growthPeriodOrder.join(",")} query_opportunities=${queryOpportunities.length} page_opportunities=${pageOpportunities.length} risk_pages=${riskPages.length}`,
    );
  } finally {
    const resolvedTemporaryRoot = path.resolve(temporaryRoot);
    const resolvedSystemTemp = path.resolve(os.tmpdir());
    if (resolvedTemporaryRoot.startsWith(`${resolvedSystemTemp}${path.sep}`)) {
      fs.rmSync(resolvedTemporaryRoot, { recursive: true, force: true });
    }
  }
}

function main() {
  ensureDir(dataDir);
  ensureDir(docsDir);
  const warnings = [];
  const dataFiles = listDataFiles();
  const loaded = expectedFiles.map((meta) => loadRecords(meta, dataFiles, warnings));
  const querySource = loaded.find((item, index) => expectedFiles[index].key === "queries");
  const pageSource = loaded.find((item, index) => expectedFiles[index].key === "pages");
  const deviceSource = loaded.find((item, index) => expectedFiles[index].key === "devices");

  const queries = querySource.rows.map((row) => normalizeRecord(row, "query")).filter((record) => record.label);
  const pages = pageSource.rows.map((row) => normalizeRecord(row, "page")).filter((record) => record.label);
  const devices = deviceSource?.exists
    ? deviceSource.rows.map((row) => ({
        device: pick(row, ["Geraet", "Gerät", "Device"]) || "-",
        clicks: parseNumber(pick(row, ["Klicks", "Clicks"])),
        impressions: parseNumber(pick(row, ["Impressionen", "Impressions"])),
        ctr: parseNumber(pick(row, ["CTR", "Klickrate"]), { isCtr: true }),
        position: parseNumber(pick(row, ["Position", "Average position"])),
      }))
    : [];

  const priorityRecords = sortByImpressions([...queries, ...pages].filter((record) => ["P0", "P1", "P2"].includes(record.priority)));
  const dataStatus = queries.length && pages.length ? (warnings.some((warning) => warning.startsWith("Missing required")) ? "WARN" : "PASS") : "WARN";
  const payload = {
    status: dataStatus,
    generatedAt: new Date().toISOString(),
    exportDate,
    files: loaded.map(({ file, exists, rowCount }) => ({ file, exists, rowCount })),
    warnings,
    queryCount: queries.length,
    pageCount: pages.length,
    queries,
    pages,
    devices,
    priorityRecords,
    p0Queries: priorityRecords.filter((record) => record.type === "query" && record.priority === "P0").map((record) => record.label),
    p1Queries: priorityRecords.filter((record) => record.type === "query" && record.priority === "P1").map((record) => record.label),
    p0Pages: priorityRecords.filter((record) => record.type === "page" && record.priority === "P0").map((record) => record.label),
    p1Pages: priorityRecords.filter((record) => record.type === "page" && record.priority === "P1").map((record) => record.label),
  };

  writeReports(payload);
  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2));
  fs.writeFileSync(legacyJsonPath, JSON.stringify(payload, null, 2));
  fs.writeFileSync(liveJsonPath, JSON.stringify(payload, null, 2));

  console.log(`GSC import status: ${dataStatus}`);
  console.log(`Queries: ${queries.length}`);
  console.log(`Pages: ${pages.length}`);
  console.log(`P0 queries: ${payload.p0Queries.length}`);
  console.log(`P1 queries: ${payload.p1Queries.length}`);
  console.log(`Reports written: ${Object.values(outputs).map((file) => path.relative(root, file)).join(", ")}, ${path.relative(root, jsonPath)}, ${path.relative(root, liveJsonPath)}`);
}

if (process.argv.includes("--growth")) mainGrowth();
else main();
