const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "app");
const DOCS_DIR = path.join(ROOT, "docs");
const PUBLIC_BASE_URL = "https://www.floxant.de";

const OUTPUTS = {
  inventory: path.join(DOCS_DIR, "PUBLIC_ROUTE_INDEXATION_INVENTORY.md"),
  policy: path.join(DOCS_DIR, "INDEXATION_POLICY.md"),
  targets: path.join(DOCS_DIR, "PRIMARY_INTENT_TARGETS.md"),
  cannibalization: path.join(DOCS_DIR, "CANNIBALIZATION_CLUSTER_REPORT.md"),
  cannibalizationJson: path.join(ROOT, "cannibalization-cluster-report.json"),
  sitemapTiering: path.join(DOCS_DIR, "SITEMAP_TIERING_PLAN.md"),
  canonicalNoindex: path.join(DOCS_DIR, "CANONICAL_NOINDEX_CANDIDATES.md"),
  indexQuality: path.join(ROOT, "INDEX_QUALITY_REPORT.md"),
  indexQualityJson: path.join(ROOT, "index-quality-report.json"),
  moneyLinks: path.join(DOCS_DIR, "MONEY_PAGE_PRIORITY_LINKING_PLAN.md"),
  blog: path.join(DOCS_DIR, "BLOG_INDEXATION_SUPPORT_REPORT.md"),
  dualLocation: path.join(DOCS_DIR, "DUAL_LOCATION_INDEXATION_REPORT.md"),
  offerCheck: path.join(DOCS_DIR, "OFFER_CHECK_INDEXATION_ARCHITECTURE.md"),
  robots: path.join(DOCS_DIR, "ROBOTS_REDIRECTS_LEGACY_INDEXATION_REPORT.md"),
};

const P0_MONEY_PAGES = [
  "/",
  "/kontakt",
  "/angebot-guenstiger-pruefen",
  "/angebotscheck",
  "/anbieter-vergleichen",
  "/duesseldorf",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/fensterreinigung",
  "/regensburg",
  "/regensburg/umzug",
  "/regensburg/reinigung",
  "/regensburg/entruempelung",
  "/regensburg/gewerbereinigung",
  "/regensburg/bueroreinigung",
  "/klaviertransport-regensburg",
  "/solarreinigung",
  "/pv-anlagen-reinigung",
];

const LEGAL_ROUTES = new Set(["/impressum", "/datenschutz", "/agb", "/widerruf", "/buchungsbedingungen"]);
const PRIVATE_PREFIXES = ["/api", "/admin", "/dashboard", "/login"];
const LEGACY_PREFIXES = ["/de", "/ru", "/bg", "/vi", "/tr", "/ar", "/fr", "/es", "/it", "/pl", "/uk"];
const OFFER_TERMS = ["angebot", "angebotscheck", "anbieter", "vergleich", "plattform"];
const SERVICE_TERMS = [
  "reinigung",
  "umzug",
  "entruempelung",
  "wohnungsaufloesung",
  "haushaltsaufloesung",
  "bueroreinigung",
  "gewerbereinigung",
  "praxisreinigung",
  "klaviertransport",
  "solarreinigung",
  "pv-anlagen-reinigung",
  "seniorenumzug",
  "fensterreinigung",
  "grundreinigung",
  "treppenhausreinigung",
];

const INTENT_TARGETS = [
  ["Angebot prüfen allgemein", "angebot prüfen", "/angebot-guenstiger-pruefen", ["/angebotscheck", "/anbieter-vergleichen", "/leistungen-vergleichen"], "HIGH"],
  ["Angebotscheck", "angebotscheck", "/angebotscheck", ["/angebot-guenstiger-pruefen", "/anbieter-vergleichen"], "MEDIUM"],
  ["Reinigungsangebot prüfen", "reinigungsangebot prüfen", "/angebot-vergleichen-duesseldorf", ["/duesseldorf/angebot-vergleichen", "/blog/reinigungsangebot-pruefen-regensburg-duesseldorf"], "HIGH"],
  ["Umzugsangebot prüfen", "umzugsangebot prüfen", "/angebot-guenstiger-pruefen", ["/blog/umzugsangebot-pruefen-regensburg-bayern", "/regensburg/umzug"], "MEDIUM"],
  ["Entrümpelungsangebot prüfen", "entruempelungsangebot prüfen", "/angebot-guenstiger-pruefen", ["/regensburg/entruempelung", "/blog/entruempelungsangebot-pruefen-serioes"], "MEDIUM"],
  ["Anbieter vergleichen", "anbieter vergleichen", "/anbieter-vergleichen", ["/leistungen-vergleichen", "/angebotscheck"], "MEDIUM"],
  ["Reinigung Düsseldorf", "reinigung düsseldorf", "/duesseldorf/reinigung", ["/duesseldorf/reinigungsfirma", "/duesseldorf/putzfirma"], "HIGH"],
  ["Büroreinigung Düsseldorf", "büroreinigung düsseldorf", "/duesseldorf/bueroreinigung", ["/duesseldorf/gewerbereinigung", "/duesseldorf/reinigungskraft-buero"], "HIGH"],
  ["Gewerbereinigung Düsseldorf", "gewerbereinigung düsseldorf", "/duesseldorf/gewerbereinigung", ["/duesseldorf/gewerbeflaechen-reinigung", "/duesseldorf/bueroreinigung"], "HIGH"],
  ["Praxisreinigung Düsseldorf", "praxisreinigung düsseldorf", "/duesseldorf/praxisreinigung", ["/duesseldorf/reinigung", "/duesseldorf/bueroreinigung"], "MEDIUM"],
  ["Fensterreinigung Düsseldorf", "fensterreinigung düsseldorf", "/duesseldorf/fensterreinigung", ["/duesseldorf/reinigung"], "MEDIUM"],
  ["Umzug Düsseldorf", "umzug düsseldorf", "/duesseldorf/umzug", ["/region-duesseldorf"], "MEDIUM"],
  ["Entrümpelung Düsseldorf", "entruempelung düsseldorf", "/duesseldorf/entruempelung", ["/duesseldorf/haushaltsaufloesung"], "MEDIUM"],
  ["Haushaltsauflösung Düsseldorf", "haushaltsauflösung düsseldorf", "/duesseldorf/haushaltsaufloesung", ["/duesseldorf/entruempelung"], "MEDIUM"],
  ["Umzug Regensburg", "umzug regensburg", "/regensburg/umzug", ["/regensburg/umzug", "/regensburg/umzugsunternehmen"], "HIGH"],
  ["Reinigung Regensburg", "reinigung regensburg", "/regensburg/reinigung", ["/regensburg/reinigung", "/regensburg/bueroreinigung"], "HIGH"],
  ["Entrümpelung Regensburg", "entruempelung regensburg", "/regensburg/entruempelung", ["/regensburg/entruempelung", "/regensburg/wohnungsaufloesung"], "HIGH"],
  ["Gewerbereinigung Regensburg", "gewerbereinigung regensburg", "/regensburg/gewerbereinigung", ["/regensburg/gewerbereinigung", "/regensburg/bueroreinigung"], "HIGH"],
  ["Büroreinigung Regensburg", "büroreinigung regensburg", "/regensburg/bueroreinigung", ["/regensburg/bueroreinigung", "/regensburg/gewerbereinigung"], "HIGH"],
  ["Klaviertransport Regensburg", "klaviertransport regensburg", "/klaviertransport-regensburg", ["/klaviertransport"], "MEDIUM"],
  ["Wohnungsauflösung Regensburg", "wohnungsauflösung regensburg", "/regensburg/wohnungsaufloesung", ["/regensburg/wohnungsaufloesung", "/regensburg/entruempelung"], "HIGH"],
  ["B2B Büroreinigung", "b2b büroreinigung", "/duesseldorf/bueroreinigung", ["/duesseldorf/b2b-reinigung", "/gewerbereinigung"], "MEDIUM"],
  ["Diskret Service", "diskret service", "/diskreter-umzug-trennung-scheidung", ["/plan-b-service", "/private-client-service"], "MEDIUM"],
  ["Solarreinigung", "solarreinigung", "/solarreinigung", ["/pv-anlagen-reinigung", "/duesseldorf/solarreinigung"], "MEDIUM"],
  ["Reinigung nach Entrümpelung", "reinigung nach entrümpelung", "/regensburg/reinigung", ["/regensburg/entruempelung", "/blog/entruempelung-endreinigung-uebergabe-regensburg-kombinieren"], "MEDIUM"],
  ["Seniorenumzug", "seniorenumzug", "/seniorenumzug", ["/regensburg/seniorenumzug", "/regensburg/seniorenumzug"], "MEDIUM"],
  ["Fernumzug", "fernumzug", "/fernumzug-muenchen", ["/blog/fernumzug-bayern-nrw-tipps", "/umzug-muenchen"], "LOW"],
];

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function ensureDocsDir() {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

function normalizeRoute(route) {
  if (!route || route === "/") return "/";
  return `/${route.replace(/^\/+/, "").replace(/\/+$/, "")}`;
}

function escapeCell(value) {
  return String(value ?? "")
    .replace(/\r?\n/g, " ")
    .replace(/\|/g, "\\|")
    .trim();
}

function mdTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`),
  ].join("\n");
}

function extractQuotedRoutes(source) {
  const routes = [];
  const regex = /"([^"]+)"/g;
  let match;
  while ((match = regex.exec(source))) {
    if (match[1].startsWith("/")) routes.push(normalizeRoute(match[1]));
  }
  return routes;
}

function loadSitemapRoutes() {
  return new Set(extractQuotedRoutes(read(path.join(ROOT, "lib", "sitemap-routes.ts"))));
}

function discoverAppRoutes() {
  const routes = new Map();

  function walk(dir, segments = []) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const page = entries.find((entry) => entry.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(entry.name));
    const routeFile = entries.find((entry) => entry.isFile() && /^route\.(tsx|ts|jsx|js)$/.test(entry.name));
    const publicSegments = segments.filter((segment) => !segment.startsWith("(") && !segment.startsWith("["));
    const route = normalizeRoute(publicSegments.join("/"));

    if (page || routeFile) {
      routes.set(route, path.relative(ROOT, path.join(dir, page?.name || routeFile.name)));
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith("_")) continue;
      walk(path.join(dir, entry.name), [...segments, entry.name]);
    }
  }

  walk(APP_DIR);
  return routes;
}

function collectSourceFiles() {
  const roots = ["app", "components", "lib"];
  const files = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(tsx|ts|jsx|js|json|md)$/.test(entry.name)) {
        files.push(full);
      }
    }
  }

  for (const root of roots) walk(path.join(ROOT, root));
  return files.map((filePath) => ({
    filePath,
    text: read(filePath),
  }));
}

function sourceContainsRoute(files, route) {
  let count = 0;
  const needles = route === "/" ? [] : [route, `href="${route}"`, `href: "${route}"`];
  if (!needles.length) return count;
  for (const file of files) {
    if (needles.some((needle) => file.text.includes(needle))) count += 1;
  }
  return count;
}

function serviceForRoute(route) {
  const lower = route.toLowerCase();
  return SERVICE_TERMS.find((term) => lower.includes(term)) || "";
}

function regionForRoute(route) {
  const lower = route.toLowerCase();
  if (lower.includes("duesseldorf") || lower.includes("koeln") || lower.includes("neuss") || lower.includes("meerbusch") || lower.includes("duisburg")) return "Düsseldorf / Rheinland";
  if (lower.includes("regensburg") || lower.includes("landshut") || lower.includes("straubing") || lower.includes("kelheim") || lower.includes("amberg")) return "Regensburg / Bayern";
  if (lower.includes("bayern") || lower.includes("muenchen") || lower.includes("nuernberg")) return "Bayern";
  return "";
}

function inferType(route) {
  if (PRIVATE_PREFIXES.some((prefix) => route === prefix || route.startsWith(`${prefix}/`))) return "Private/Internal/Admin/API";
  if (LEGAL_ROUTES.has(route) || route.includes("datenschutz") || route.includes("agb") || route.includes("impressum")) return "Legal";
  if (route.startsWith("/blog/") || route === "/blog" || route.startsWith("/ratgeber") || route.startsWith("/wissen")) return "Blog/Ratgeber";
  if (route.includes("/signature/") || route.includes("signature") || route.includes("plan-b") || route.includes("private-client") || route.includes("diskret")) return "Signature Service Page";
  if (OFFER_TERMS.some((term) => route.includes(term))) return "Offer Check / Comparison";
  if (route === "/duesseldorf" || route === "/regensburg" || route.startsWith("/region-")) return "Local Hub";
  if (P0_MONEY_PAGES.includes(route)) return "Primary Money Page";
  if (serviceForRoute(route)) return route.split("/").length > 2 ? "Local Service Page" : "Service Hub / Service Page";
  return "Support Page";
}

function inferIntent(route, type, service, region) {
  if (type === "Private/Internal/Admin/API") return "internal";
  if (type === "Legal") return "legal trust";
  if (type === "Blog/Ratgeber") return "informational support";
  if (type === "Offer Check / Comparison") return "quote review / comparison";
  if (service && region) return `${service} local commercial`;
  if (service) return `${service} service intent`;
  return "brand/support";
}

function primaryKeyword(route, service, region, type) {
  if (type === "Offer Check / Comparison") return route.includes("anbieter") ? "anbieter vergleichen" : "angebot prüfen";
  if (service && region.includes("Düsseldorf")) return `${service} düsseldorf`;
  if (service && region.includes("Regensburg")) return `${service} regensburg`;
  if (service) return service;
  if (route === "/") return "FLOXANT";
  return route.replace(/^\/+/, "").replace(/-/g, " ");
}

function funnelStage(type) {
  if (type === "Private/Internal/Admin/API") return "Internal";
  if (type === "Legal") return "Trust";
  if (type === "Blog/Ratgeber") return "Awareness";
  if (type === "Offer Check / Comparison" || type === "Primary Money Page") return "Conversion";
  if (type.includes("Service") || type === "Local Hub") return "Consideration";
  return "Support";
}

function isLegacyRoute(route) {
  return LEGACY_PREFIXES.some((prefix) => route === prefix || route.startsWith(`${prefix}/`));
}

function assessRoute(route, source, sitemapSet, sourceFiles) {
  const type = inferType(route);
  const service = serviceForRoute(route);
  const region = regionForRoute(route);
  const inSitemap = sitemapSet.has(route);
  const noindexByPattern = type === "Private/Internal/Admin/API" || route.includes("/danke") || route.includes("seo-gone") || isLegacyRoute(route);
  const sourceText = source && source !== "sitemap/generated" ? read(path.join(ROOT, source)) : "";
  const noindexBySource = /robots:\s*\{[\s\S]*?index:\s*false/.test(sourceText) || /X-Robots-Tag["']?\s*:\s*["']noindex/i.test(sourceText);
  const noindex = noindexByPattern || noindexBySource;
  const shouldIndex = !noindex && type !== "Private/Internal/Admin/API" && !route.includes("/danke");
  const money = P0_MONEY_PAGES.includes(route) || type === "Primary Money Page";
  const support = ["Blog/Ratgeber", "Support Page", "Signature Service Page"].includes(type);
  const canonical = shouldIndex ? `${PUBLIC_BASE_URL}${route === "/" ? "" : route}` : "none / noindex";
  const refs = sourceContainsRoute(sourceFiles, route);
  const risk = [];

  if (inSitemap && noindex) risk.push("HIGH: noindex/private route appears in sitemap");
  if (type === "Private/Internal/Admin/API" && inSitemap) risk.push("HIGH: private route in sitemap");
  if (type === "Blog/Ratgeber" && OFFER_TERMS.some((term) => route.includes(term))) risk.push("MEDIUM: blog may compete with offer-check money page");
  if (route.split("/").length > 2 && inSitemap && !money && !support) risk.push("MEDIUM: longtail route needs quality review");
  if (refs === 0 && money) risk.push("MEDIUM: money page has low detected internal references");
  if (!risk.length) risk.push("LOW");

  const action = (() => {
    if (inSitemap && noindex) return "remove_from_sitemap_candidate";
    if (type === "Private/Internal/Admin/API") return "keep_private_noindex";
    if (money) return "keep_strengthen_links";
    if (type === "Blog/Ratgeber") return "keep_as_support_if_unique";
    if (risk.some((item) => item.includes("longtail"))) return "manual_review";
    return shouldIndex ? "keep" : "manual_review";
  })();

  return {
    url: route,
    source: source || "sitemap/generated",
    type,
    service,
    region,
    intent: inferIntent(route, type, service, region),
    primaryKeyword: primaryKeyword(route, service, region, type),
    funnelStage: funnelStage(type),
    isMoneyPage: money,
    isSupportPage: support,
    isBlog: type === "Blog/Ratgeber",
    isLegal: type === "Legal",
    isPrivate: type === "Private/Internal/Admin/API",
    inSitemap,
    canonical,
    noindex,
    shouldIndex,
    risk: risk.join("; "),
    action,
    internalReferenceCount: refs,
    grade: gradeRoute({ type, money, support, inSitemap, noindex, risk, refs }),
  };
}

function gradeRoute(route) {
  if (route.risk.some((item) => item.startsWith("HIGH"))) return "F";
  if (route.money && route.refs > 2 && route.inSitemap && !route.noindex) return "A";
  if (route.inSitemap && !route.noindex) return "B";
  if (route.support && !route.noindex) return "C";
  if (route.noindex && !route.inSitemap) return "B";
  return "D";
}

function buildInventory() {
  const sitemapSet = loadSitemapRoutes();
  const appRoutes = discoverAppRoutes();
  const sourceFiles = collectSourceFiles();
  const allRoutes = new Map();

  for (const route of sitemapSet) allRoutes.set(route, "sitemap/generated");
  for (const [route, source] of appRoutes) allRoutes.set(route, source);

  return [...allRoutes.entries()]
    .map(([route, source]) => assessRoute(route, source, sitemapSet, sourceFiles))
    .sort((a, b) => a.url.localeCompare(b.url));
}

function buildClusters(inventory) {
  const clusterDefinitions = [
    ["Offer Check Cluster", (route) => OFFER_TERMS.some((term) => route.url.includes(term))],
    ["Düsseldorf Reinigung Cluster", (route) => route.region.includes("Düsseldorf") && route.service.includes("reinigung")],
    ["Düsseldorf Putzfirma/Reinigungsfirma Cluster", (route) => route.url.includes("putzfirma") || route.url.includes("reinigungsfirma") || route.url.includes("reinigungsdienst")],
    ["Büroreinigung/Gewerbereinigung Cluster", (route) => route.url.includes("bueroreinigung") || route.url.includes("gewerbereinigung")],
    ["Regensburg Umzug Cluster", (route) => route.region.includes("Regensburg") && route.service.includes("umzug")],
    ["Regensburg Entrümpelung/Wohnungsauflösung Cluster", (route) => route.region.includes("Regensburg") && (route.service.includes("entruempelung") || route.service.includes("wohnungsaufloesung"))],
    ["Klaviertransport Regensburg Cluster", (route) => route.url.includes("klaviertransport") && route.url.includes("regensburg")],
    ["Seniorenumzug Cluster", (route) => route.url.includes("seniorenumzug") || route.url.includes("umzug-im-alter")],
    ["Diskret/Private Client Cluster", (route) => route.url.includes("diskret") || route.url.includes("private-client") || route.url.includes("plan-b")],
    ["Solar/PV Cluster", (route) => route.url.includes("solar") || route.url.includes("pv-anlagen")],
    ["Bayern/München/Landshut Longtail Cluster", (route) => route.url.includes("bayern") || route.url.includes("muenchen") || route.url.includes("landshut")],
    ["Dynamic Local SEO Cluster", (route) => route.type === "Local Service Page"],
  ];

  return clusterDefinitions.map(([name, predicate]) => {
    const affected = inventory.filter(predicate);
    const target = choosePrimaryTarget(name, affected);
    const risk = affected.length > 12 ? "HIGH" : affected.length > 5 ? "MEDIUM" : "LOW";
    return {
      clusterName: name,
      affectedUrls: affected.map((route) => route.url),
      searchIntent: name.replace(" Cluster", "").toLowerCase(),
      primaryTarget: target,
      supportPages: affected.map((route) => route.url).filter((url) => url !== target).slice(0, 20),
      risk,
      recommendedAction: risk === "HIGH" ? "differentiate_support + sitemap_tier_review" : "keep + monitor",
    };
  });
}

function choosePrimaryTarget(name, affected) {
  const preferred = {
    "Offer Check Cluster": "/angebot-guenstiger-pruefen",
    "Düsseldorf Reinigung Cluster": "/duesseldorf/reinigung",
    "Düsseldorf Putzfirma/Reinigungsfirma Cluster": "/duesseldorf/reinigungsfirma",
    "Büroreinigung/Gewerbereinigung Cluster": "/duesseldorf/bueroreinigung",
    "Regensburg Umzug Cluster": "/regensburg/umzug",
    "Regensburg Entrümpelung/Wohnungsauflösung Cluster": "/regensburg/entruempelung",
    "Klaviertransport Regensburg Cluster": "/klaviertransport-regensburg",
    "Seniorenumzug Cluster": "/seniorenumzug",
    "Diskret/Private Client Cluster": "/diskreter-umzug-trennung-scheidung",
    "Solar/PV Cluster": "/solarreinigung",
    "Bayern/München/Landshut Longtail Cluster": "/regensburg",
    "Dynamic Local SEO Cluster": "/region-duesseldorf",
  };
  return preferred[name] || affected.find((route) => route.isMoneyPage)?.url || affected[0]?.url || "";
}

function sitemapTier(route) {
  if (!route.shouldIndex || route.isPrivate) return "Nicht in Sitemap";
  if (P0_MONEY_PAGES.includes(route.url) || route.url === "/") return "Tier 1";
  if (route.type === "Local Hub" || route.type === "Service Hub / Service Page" || route.type === "Primary Money Page") return "Tier 1";
  if (route.type === "Local Service Page" || route.type === "Offer Check / Comparison" || route.type === "Signature Service Page") return "Tier 2";
  if (route.type === "Blog/Ratgeber") return "Tier 3";
  return "Tier 3";
}

function supportTargetForBlog(route) {
  const lower = route.url.toLowerCase();
  if (lower.includes("angebot") || lower.includes("vergleich")) return "/angebot-guenstiger-pruefen";
  if (lower.includes("duesseldorf") && lower.includes("reinigung")) return "/duesseldorf/reinigung";
  if (lower.includes("regensburg") && lower.includes("umzug")) return "/regensburg/umzug";
  if (lower.includes("entruempel")) return "/regensburg/entruempelung";
  if (lower.includes("bueroreinigung") || lower.includes("gewerbe")) return "/duesseldorf/bueroreinigung";
  return "/leistungen";
}

function writeInventory(inventory) {
  const rows = inventory.map((route) => [
    route.url,
    route.source,
    route.type,
    route.service,
    route.region,
    route.intent,
    route.primaryKeyword,
    route.funnelStage,
    route.isMoneyPage ? "Ja" : "Nein",
    route.isSupportPage ? "Ja" : "Nein",
    route.isBlog ? "Ja" : "Nein",
    route.isLegal ? "Ja" : "Nein",
    route.isPrivate ? "Ja" : "Nein",
    route.inSitemap ? "Ja" : "Nein",
    route.canonical,
    route.noindex ? "Ja" : "Nein",
    route.shouldIndex ? "Ja" : "Nein",
    route.risk,
    route.action,
  ]);

  fs.writeFileSync(
    OUTPUTS.inventory,
    [
      "# Public Route Indexation Inventory",
      "",
      `Stand: ${new Date().toISOString().slice(0, 10)}`,
      "",
      `Geprüfte Routen: ${inventory.length}`,
      "",
      mdTable(
        [
          "URL",
          "Datei/Quelle",
          "Seitentyp",
          "Service",
          "Stadt/Region",
          "Suchintention",
          "Primäres Keyword",
          "Funnel-Stufe",
          "Money-Page",
          "Support-Seite",
          "Blog/Ratgeber",
          "Rechtlich",
          "Intern/Private",
          "Sitemap aktuell",
          "Canonical",
          "Noindex",
          "Sollte indexiert werden",
          "Risiko",
          "Empfohlene Maßnahme",
        ],
        rows,
      ),
      "",
    ].join("\n"),
  );
}

function writePolicy() {
  const rows = [
    ["Primary Money Page", "index/follow", "Tier 1", "Self-canonical", "starke Hub-, Home- und Bloglinks", "klare CTA, Trust, FAQ, sichtbarer Kundennutzen", "Kannibalisierung durch Support-Seiten"],
    ["Service Hub", "index/follow", "Tier 1", "Self-canonical", "verlinkt lokale Money-Pages", "Service-Überblick, keine lokale Konkurrenz", "zu breit oder konkurrierend"],
    ["Local Hub", "index/follow", "Tier 1", "Self-canonical", "verlinkt lokale Services", "Stadtlogik, echte Standort-/Einsatzlogik", "Doorway-Risiko bei austauschbarem Text"],
    ["Signature Service Page", "index wenn eigenständig", "Tier 2", "Self-canonical", "von Service-/Trust-Kontext verlinken", "klare Situation, keine Fake-Claims", "unklare Suchnachfrage"],
    ["Spezialservice Page", "index wenn echter Service", "Tier 2", "Self-canonical", "von passenden Money-Pages", "eigene Nachfrage und Scope", "zu dünn oder nicht real bedient"],
    ["Blog/Ratgeber", "index wenn hilfreich", "Tier 3", "Self-canonical oder Merge-Kandidat", "zu Money-Page verlinken", "Info-Intent, kein Kaufseiten-Ersatz", "Konkurrenz zur Money-Page"],
    ["Support Page", "index optional", "Tier 3 oder nicht", "Self-canonical", "kontextuell", "hilft Entscheidung oder Vertrauen", "niedrige Qualität"],
    ["Duplicate/Weak Longtail Candidate", "prüfen", "nicht automatisch", "Kandidat", "schwach priorisieren", "nur behalten, wenn differenziert", "Cannibalization"],
    ["Private/Internal/Admin/API", "noindex/nicht öffentlich", "nie", "none", "nicht von Public verlinken", "keine Public-CTA", "Sitemap-Leak"],
    ["Legacy/Locale/Redirect", "redirect/410/noindex", "nie", "kanonische Zielseite", "nicht intern verlinken", "nur Alt-Signal", "Index-Leichen"],
  ];
  fs.writeFileSync(
    OUTPUTS.policy,
    `# Indexation Policy\n\n${mdTable(["Seitenklasse", "Indexierungsregel", "Sitemap-Regel", "Canonical-Regel", "Interne Linkregel", "Content-Mindestanforderung", "Risiko"], rows)}\n`,
  );
}

function writePrimaryTargets(inventory) {
  const rows = INTENT_TARGETS.map(([intent, primary, target, support, risk]) => [
    intent,
    primary,
    "",
    target.includes("duesseldorf") ? "Düsseldorf-Kunde" : target.includes("regensburg") ? "Regensburg-Kunde" : "Service-Kunde",
    target,
    support.join(", "),
    support.filter((url) => url.startsWith("/blog")).join(", ") || "nach Bedarf",
    target.includes("angebot") ? "zentral" : "/angebot-guenstiger-pruefen als Prüf-CTA",
    "/kontakt oder service-spezifischer CTA",
    inventory.filter((route) => route.url !== target && route.primaryKeyword === primary).map((route) => route.url).slice(0, 8).join(", "),
    risk,
    risk === "HIGH" ? "Primärseite stärken, Support differenzieren" : "Beobachten und intern sauber verlinken",
  ]);
  fs.writeFileSync(
    OUTPUTS.targets,
    `# Primary Intent Targets\n\n${mdTable(["Suchintention", "Primäres Keyword", "Sekundäre Keywords", "Zielkunde", "Primäre Zielseite", "Unterstützende Seiten", "Blog-/Ratgeber-Unterstützung", "Angebotsprüfung-Verknüpfung", "Kontakt-CTA", "Seiten, die nicht konkurrieren dürfen", "Risiko", "Maßnahme"], rows)}\n`,
  );
}

function writeCannibalization(clusters) {
  const rows = clusters.map((cluster) => [
    cluster.clusterName,
    cluster.affectedUrls.slice(0, 30).join(", "),
    cluster.searchIntent,
    cluster.primaryTarget,
    cluster.supportPages.slice(0, 12).join(", "),
    cluster.risk,
    cluster.recommendedAction,
  ]);
  fs.writeFileSync(
    OUTPUTS.cannibalization,
    `# Cannibalization Cluster Report\n\nKeine automatische noindex- oder canonical-Massenaktion. Die folgenden Cluster sind Prioritäten für manuelle Differenzierung, interne Links und Sitemap-Tiering.\n\n${mdTable(["Clustername", "Betroffene URLs", "Suchintention", "Primäre Zielseite", "Unterstützende Seiten", "Risiko", "Empfohlene Maßnahme"], rows)}\n`,
  );
  fs.writeFileSync(OUTPUTS.cannibalizationJson, JSON.stringify(clusters, null, 2));
}

function writeSitemapTiering(inventory) {
  const tierRows = ["Tier 1", "Tier 2", "Tier 3", "Nicht in Sitemap"].map((tier) => {
    const routes = inventory.filter((route) => sitemapTier(route) === tier);
    return [tier, routes.length, routes.slice(0, 40).map((route) => route.url).join(", ")];
  });
  fs.writeFileSync(
    OUTPUTS.sitemapTiering,
    `# Sitemap Tiering Plan\n\nZiel: Sitemap priorisiert starke indexierbare Seiten. Keine API/Admin/Login/Dashboard-Routen. Noindex-Seiten dürfen nicht in der Sitemap bleiben.\n\n${mdTable(["Tier", "Anzahl", "Beispiele"], tierRows)}\n\n## Klare Kandidaten\n\n${mdTable(["URL", "Grund", "Maßnahme"], inventory.filter((route) => route.inSitemap && !route.shouldIndex).map((route) => [route.url, route.risk, "aus Sitemap entfernen / noindex respektieren"]))}\n`,
  );
}

function writeCanonicalNoindex(inventory) {
  const candidates = inventory.filter((route) => route.inSitemap && !route.shouldIndex || route.risk.includes("longtail") || route.risk.includes("compete")).slice(0, 250);
  fs.writeFileSync(
    OUTPUTS.canonicalNoindex,
    `# Canonical / Noindex Candidates\n\nKeine Massenumsetzung. P0/P1-Seiten bleiben indexierbar, solange keine harte Gegenbegründung vorliegt.\n\n${mdTable(["URL", "Grund", "Suchintention", "Primäre Zielseite", "Empfohlene Maßnahme", "Risiko", "Manuelle Prüfung nötig", "Umgesetzt"], candidates.map((route) => [route.url, route.risk, route.intent, chooseManualPrimary(route), route.action, route.risk.startsWith("HIGH") ? "HIGH" : route.risk.includes("MEDIUM") ? "MEDIUM" : "LOW", "Ja", "Nein"]))}\n`,
  );
}

function chooseManualPrimary(route) {
  const match = INTENT_TARGETS.find(([, , target, support]) => target === route.url || support.includes(route.url));
  return match?.[2] || (route.region.includes("Düsseldorf") ? "/duesseldorf/reinigung" : route.region.includes("Regensburg") ? "/regensburg/umzug" : "/angebot-guenstiger-pruefen");
}

function writeIndexQuality(inventory) {
  const counts = inventory.reduce((acc, route) => {
    acc[route.grade] = (acc[route.grade] || 0) + 1;
    return acc;
  }, {});
  const highRisk = inventory.filter((route) => route.risk.includes("HIGH"));
  const markdown = [
    "# Index Quality Report",
    "",
    `Geprüfte Routen: ${inventory.length}`,
    "",
    mdTable(["Grade", "Anzahl"], Object.entries(counts).sort().map(([grade, count]) => [grade, count])),
    "",
    "## High-Risk Findings",
    "",
    mdTable(["URL", "Risiko", "Maßnahme"], highRisk.map((route) => [route.url, route.risk, route.action])),
    "",
    "## Bewertung",
    "",
    "- A = starke P0/P1-Seite mit Sitemap und internen Referenzen",
    "- B = indexierbar oder korrekt noindex ohne Sitemap-Leak",
    "- C = Support mit Prüfbedarf",
    "- D = schwach / manuell prüfen",
    "- F = nicht indexreif oder Sitemap-Leak",
    "",
  ].join("\n");
  fs.writeFileSync(OUTPUTS.indexQuality, markdown);
}

function writeMoneyLinks(inventory) {
  const rows = P0_MONEY_PAGES.map((url) => {
    const route = inventory.find((item) => item.url === url);
    return [
      url,
      route ? "Ja" : "Nein",
      route?.inSitemap ? "Ja" : "Nein",
      route?.canonical || "nicht gefunden",
      route?.internalReferenceCount ?? 0,
      route && route.internalReferenceCount > 2 ? "OK" : "mehr kontextuelle Links prüfen",
    ];
  });
  fs.writeFileSync(
    OUTPUTS.moneyLinks,
    `# Money Page Priority Linking Plan\n\n${mdTable(["P0-Seite", "Existiert", "Sitemap", "Canonical", "Interne Referenzen", "Empfehlung"], rows)}\n`,
  );
}

function writeBlogReport(inventory) {
  const blogs = inventory.filter((route) => route.type === "Blog/Ratgeber");
  const rows = blogs.map((route) => [
    route.url,
    route.primaryKeyword,
    supportTargetForBlog(route),
    route.risk.includes("compete") ? "möglich" : "nein / gering",
    route.shouldIndex ? "Ja" : "Nein",
    route.action,
    route.internalReferenceCount > 0 ? "Ja" : "prüfen",
    route.url.includes("angebot") ? "Ja" : "nach Bedarf",
    route.grade,
    route.risk,
  ]);
  fs.writeFileSync(
    OUTPUTS.blog,
    `# Blog Indexation Support Report\n\n${mdTable(["URL", "Thema", "Unterstützt Money-Page", "Konkurriert", "Sollte indexierbar sein", "Canonical/Noindex", "Interne Links", "Angebotsprüfung-CTA", "Qualität", "Maßnahme"], rows)}\n`,
  );
}

function writeDualLocation(inventory) {
  const watched = [
    "/duesseldorf",
    "/duesseldorf/reinigung",
    "/duesseldorf/bueroreinigung",
    "/duesseldorf/gewerbereinigung",
    "/duesseldorf/praxisreinigung",
    "/duesseldorf/fensterreinigung",
    "/duesseldorf/umzug",
    "/duesseldorf/entruempelung",
    "/duesseldorf/haushaltsaufloesung",
    "/regensburg",
    "/regensburg/umzug",
    "/regensburg/reinigung",
    "/regensburg/entruempelung",
    "/regensburg/gewerbereinigung",
    "/regensburg/bueroreinigung",
    "/klaviertransport-regensburg",
    "/regensburg/wohnungsaufloesung",
  ];
  const rows = watched.map((url) => {
    const route = inventory.find((item) => item.url === url);
    return [url, route ? "Ja" : "Nein", route?.inSitemap ? "Ja" : "Nein", route?.canonical || "", route?.risk || "missing", route?.action || "manual_review"];
  });
  fs.writeFileSync(
    OUTPUTS.dualLocation,
    `# Dual Location Indexation Report\n\nDüsseldorf und Regensburg bleiben getrennte lokale Strukturen. Düsseldorf priorisiert Reinigung, Regensburg priorisiert Umzug, Entrümpelung/Wohnungsauflösung und Reinigung.\n\n${mdTable(["URL", "Existiert", "Sitemap", "Canonical", "Risiko", "Maßnahme"], rows)}\n`,
  );
}

function writeOfferArchitecture(inventory) {
  const offers = inventory.filter((route) => route.type === "Offer Check / Comparison" || OFFER_TERMS.some((term) => route.url.includes(term)));
  const rows = offers.map((route) => [
    route.url,
    route.url === "/angebot-guenstiger-pruefen" ? "Primary general offer check" : route.url === "/anbieter-vergleichen" ? "Primary provider comparison" : "Support/specific",
    route.inSitemap ? "Ja" : "Nein",
    route.risk,
    route.url === "/angebot-guenstiger-pruefen" || route.url === "/anbieter-vergleichen" ? "keep_primary" : "differentiate_support_or_review",
  ]);
  fs.writeFileSync(
    OUTPUTS.offerCheck,
    `# Offer Check Indexation Architecture\n\nPrimäre allgemeine Zielseite: /angebot-guenstiger-pruefen\n\nPrimäre Anbieter-Vergleichsseite: /anbieter-vergleichen\n\nLokale Reinigungsangebot-Seite: /angebot-vergleichen-duesseldorf\n\n${mdTable(["URL", "Rolle", "Sitemap", "Kannibalisierungsrisiko", "Maßnahme"], rows)}\n`,
  );
}

function writeRobotsReport(inventory) {
  const robots = read(path.join(ROOT, "app", "robots.ts"));
  const proxy = read(path.join(ROOT, "proxy.ts"));
  const nextConfig = read(path.join(ROOT, "next.config.js"));
  const sitemapLeaks = inventory.filter((route) => route.inSitemap && !route.shouldIndex);
  fs.writeFileSync(
    OUTPUTS.robots,
    [
      "# Robots / Redirects / Legacy Indexation Report",
      "",
      mdTable(
        ["Prüfung", "Status", "Hinweis"],
        [
          ["robots.txt Quelle", robots ? "gefunden" : "fehlt", "app/robots.ts"],
          ["Proxy Quelle", proxy ? "gefunden" : "fehlt", "proxy.ts"],
          ["Next Redirects", nextConfig.includes("async redirects") ? "gefunden" : "nicht gefunden", "next.config.js"],
          ["Legacy Locale Handling", proxy.includes("LEGACY_LOCALES") ? "Proxy-basiert" : "prüfen", "alte Locale-Routen sollen redirect/410 bleiben"],
          ["Sitemap noindex/private leaks", sitemapLeaks.length ? "Achtung" : "OK", sitemapLeaks.map((route) => route.url).join(", ") || "keine"],
        ],
      ),
      "",
      "## Low-Risk Fix-Kandidaten",
      "",
      mdTable(["URL", "Grund", "Empfehlung"], sitemapLeaks.map((route) => [route.url, route.risk, "aus Sitemap entfernen"])),
      "",
    ].join("\n"),
  );
}

function writeJson(inventory, clusters) {
  const payload = {
    generatedAt: new Date().toISOString(),
    routeCount: inventory.length,
    sitemapCount: inventory.filter((route) => route.inSitemap).length,
    gradeCounts: inventory.reduce((acc, route) => {
      acc[route.grade] = (acc[route.grade] || 0) + 1;
      return acc;
    }, {}),
    highRisk: inventory.filter((route) => route.risk.includes("HIGH")),
    canonicalNoindexCandidates: inventory.filter((route) => route.inSitemap && !route.shouldIndex),
    clusters,
    inventory,
  };
  fs.writeFileSync(OUTPUTS.indexQualityJson, JSON.stringify(payload, null, 2));
}

function main() {
  ensureDocsDir();
  const inventory = buildInventory();
  const clusters = buildClusters(inventory);

  writeInventory(inventory);
  writePolicy();
  writePrimaryTargets(inventory);
  writeCannibalization(clusters);
  writeSitemapTiering(inventory);
  writeCanonicalNoindex(inventory);
  writeIndexQuality(inventory);
  writeMoneyLinks(inventory);
  writeBlogReport(inventory);
  writeDualLocation(inventory);
  writeOfferArchitecture(inventory);
  writeRobotsReport(inventory);
  writeJson(inventory, clusters);

  const highRisk = inventory.filter((route) => route.risk.includes("HIGH"));
  console.log(`INDEX_QUALITY_OK routes=${inventory.length} highRisk=${highRisk.length} outputs=${Object.keys(OUTPUTS).length}`);
  if (highRisk.length) {
    console.log(`INDEX_QUALITY_HIGH_RISK\n${highRisk.map((route) => `${route.url}: ${route.risk}`).join("\n")}`);
  }
}

main();
