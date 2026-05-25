#!/usr/bin/env node

const fs = require("fs");
const net = require("net");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "app");
const DYNAMIC_LOCAL_ROUTES_PATH = path.join(ROOT, "lib", "local-seo-routes.ts");
const PUBLIC_BASE_URL = "https://www.floxant.de";
const DEFAULT_PORT = Number(process.env.CHECK_PORT || 4317);

function canListen(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port, "127.0.0.1");
  });
}

async function findAvailablePort(startPort) {
  for (let port = startPort; port < startPort + 80; port += 1) {
    if (await canListen(port)) return port;
  }
  throw new Error(`No available local port found near ${startPort}`);
}

const PRIVATE_SEGMENTS = new Set(["api", "dashboard", "admin", "login"]);
const LEGACY_REDIRECT_ROUTES = new Set([
  "/partnercode",
  "/airbnb-reinigung-duesseldorf",
  "/angebot-red-flag-scanner",
  "/guenstigeres-angebot-pruefen",
  "/villenservice",
  "/umzug-duesseldorf",
  "/seo-gone",
]);
const TEXT_EXTENSIONS = new Set([".tsx", ".ts", ".jsx", ".js", ".json", ".md"]);
const SOURCE_ROOTS = ["app", "components", "lib"];
const STATIC_METADATA_ROUTES = [
  "/robots.txt",
  "/service-graph.json",
  "/indexnow-key.txt",
  "/seo-image/floxant",
  "/seo-image/buchung",
  "/seo-image/rechner",
  "/seo-image/umzug",
  "/seo-image/reinigung",
  "/seo-image/entruempelung",
  "/seo-image/bueroumzug",
  "/seo-image/qualitaet-ablauf",
  "/seo-image/praxisfaelle",
  "/seo-image/kostenfaktoren",
  "/seo-image/leistungen-vergleichen",
  "/seo-image/anbieter-vergleichen",
  "/seo-image/buchung-ablauf",
  "/seo-image/kontakt",
];
const DOMINANCE_MONEY_ROUTES = [
  "/",
  "/buchung",
  "/rechner",
  "/umzug",
  "/reinigung",
  "/entruempelung",
  "/bueroumzug",
  "/firmenentsorgung",
  "/leerfahrt-rueckfahrt",
  "/empfehlen",
  "/angebot-guenstiger-pruefen",
  "/makler-vermieter-link",
  "/wohnung-wieder-vermietbar",
  "/schadensbegrenzung",
  "/keller-muellraum-rettung-regensburg",
  "/uebergabeakte",
  "/private-client-service",
  "/service-area-bayern",
  "/einsatzgebiet-regensburg-200km",
  "/qualitaet-ablauf",
  "/praxisfaelle",
  "/kostenfaktoren",
  "/leistungen-vergleichen",
  "/anbieter-vergleichen",
  "/buchung-ablauf",
  "/kontakt",
];
const IMPORTANT_ROUTES = [
  "/",
  "/empfehlen",
  "/angebotscheck",
  "/angebot-guenstiger-pruefen",
  "/reinigung-moeblierte-wohnung-duesseldorf",
  "/makler-vermieter-link",
  "/mieterwechsel-service-regensburg",
  "/wohnung-wieder-vermietbar",
  "/schadensbegrenzung",
  "/keller-muellraum-rettung-regensburg",
  "/rueckfahrt-boerse",
  "/uebergabeakte",
  "/buchung",
  "/rechner",
  "/umzug",
  "/reinigung",
  "/entruempelung",
  "/service-area-bayern",
  "/blog",
  "/floxant-fakten",
  "/qualitaet-ablauf",
  "/praxisfaelle",
  "/kostenfaktoren",
  "/leistungen-vergleichen",
  "/anbieter-vergleichen",
  "/buchung-ablauf",
  "/kontakt",
  "/llms.txt",
  "/service-graph.json",
  "/sitemap.xml",
  "/robots.txt",
];

const REDIRECT_EXPECTATIONS = [
  ["/partnercode", "/empfehlen"],
  ["/airbnb-reinigung-duesseldorf", "/reinigung-moeblierte-wohnung-duesseldorf"],
  ["/angebot-red-flag-scanner", "/angebotscheck#red-flag-scanner"],
  ["/guenstigeres-angebot-pruefen", "/angebot-guenstiger-pruefen"],
  ["/de", "/"],
  ["/de/umzug", "/umzug"],
  ["/en/umzug-regensburg", "/umzug-regensburg"],
  ["/bg/umzug-landshut", "/umzug-landshut"],
  ["/vi/ratgeber/wann-lohnt-sich-umzugsfirma", "/ratgeber/wann-lohnt-sich-umzugsfirma"],
  ["/tr/reinigung-regensburg", "/reinigung-regensburg"],
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

const GONE_EXPECTATIONS = [
  "/umzug-duesseldorf",
  "/de/umzug-duesseldorf",
  "/en/umzug-duesseldorf",
  "/ru/wissen/halteverbotszone-duesseldorf",
  "/de/wissen/halteverbotszone-duesseldorf",
  "/halteverbotszone-duesseldorf",
  "/transport-duesseldorf",
  "/entruempelung-duesseldorf",
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

function loadDynamicLocalSeoRoutes() {
  if (!fs.existsSync(DYNAMIC_LOCAL_ROUTES_PATH)) return [];

  const source = fs.readFileSync(DYNAMIC_LOCAL_ROUTES_PATH, "utf8");
  const routes = [];
  const routeRegex = /"route":\s*"([^"]+)"/g;
  let match;

  while ((match = routeRegex.exec(source))) {
    routes.push(match[1]);
  }

  return routes;
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

  for (const route of loadDynamicLocalSeoRoutes()) {
    if (!LEGACY_REDIRECT_ROUTES.has(route)) routes.add(route);
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

function publicAssetExists(url) {
  if (!url || url === "/") return false;
  const cleanUrl = url.replace(/^\/+/, "");
  if (cleanUrl.includes("..")) return false;
  return fs.existsSync(path.join(ROOT, "public", cleanUrl));
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
        if (!routes.has(url) && !publicAssetExists(url)) missing.push(`${relativeFile}:${line}: ${rawUrl} -> ${url}`);
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
  const publicLanguageIssues = [];
  const importantMissing = [];
  const suspiciousPatterns = [
    { pattern: /[\u00c3\u00c2\u00e2]/g, label: "mojibake" },
  ];
  const riskyClaimPatterns = [
    /\bFestpreisgarantie\b/gi,
    /\bgarantierter (Festpreis|Preis|Endpreis)\b/gi,
    /\bfester Endpreis\b/gi,
    /\b100%\s*Abnahmegarantie\b/gi,
    /\bdie beste Wahl\b/gi,
  ];
  const publicLanguagePatterns = [
    { pattern: /\b(studentenumzug|student moving|no parking zone|halteverbotszone)\b/gi, label: "removed service signal" },
    { pattern: /\b(llms\.txt ansehen|Service Graph ansehen|Admin Login|Sitemap XML|Recht & Technik)\b/gi, label: "visible internal/technical label" },
    { pattern: /\b(Interne Wege|interne Wege|Wichtige interne|Direkte interne|Money Page|Internal Link|Answer Engine|SEO-Hauptseite|Local-SEO Anfrageweg)\b/gi, label: "customer-facing internal/seo wording" },
  ];
  const isCustomerFacingFile = (relativeFile) =>
    (relativeFile.startsWith("app" + path.sep) || relativeFile.startsWith("components" + path.sep)) &&
    !relativeFile.startsWith(path.join("app", "api") + path.sep) &&
    !relativeFile.startsWith(path.join("app", "dashboard") + path.sep) &&
    !relativeFile.startsWith(path.join("app", "admin") + path.sep) &&
    !relativeFile.startsWith(path.join("app", "llms.txt") + path.sep) &&
    !relativeFile.startsWith(path.join("app", "service-graph.json") + path.sep) &&
    !relativeFile.startsWith(path.join("components", "dashboard") + path.sep) &&
    !relativeFile.includes(`${path.sep}JsonLd.`);

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

    if (isCustomerFacingFile(relativeFile)) {
      for (const { pattern, label } of publicLanguagePatterns) {
        pattern.lastIndex = 0;
        let match;
        while ((match = pattern.exec(text))) {
          publicLanguageIssues.push(`${relativeFile}:${lineForIndex(text, match.index)}: ${label}: ${match[0]}`);
        }
      }
    }
  }

  for (const route of IMPORTANT_ROUTES) {
    if (!discoverRoutes().has(route)) importantMissing.push(route);
  }

  if (mojibake.length || riskyClaims.length || publicLanguageIssues.length || importantMissing.length) {
    if (mojibake.length) console.log(`MOJIBAKE_SUSPECTS\n${mojibake.slice(0, 120).join("\n")}`);
    if (riskyClaims.length) console.log(`RISKY_SEO_OR_PRICE_CLAIMS\n${riskyClaims.slice(0, 120).join("\n")}`);
    if (publicLanguageIssues.length) console.log(`PUBLIC_LANGUAGE_GUARD\n${publicLanguageIssues.slice(0, 120).join("\n")}`);
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
  const serviceGraphPath = path.join(ROOT, "lib", "ai-service-graph.ts");
  const schemaDatasetsPath = path.join(ROOT, "lib", "schema-datasets.ts");
  const localBusinessPath = path.join(ROOT, "components", "seo", "LocalBusinessJsonLd.tsx");
  const localSignalPath = path.join(ROOT, "components", "seo", "LocalSeoSignalPanel.tsx");
  const layoutPath = path.join(ROOT, "app", "layout.tsx");
  const webVitalsPath = path.join(ROOT, "components", "WebVitalsReporter.tsx");
  const twitterImagePath = path.join(ROOT, "app", "twitter-image.tsx");
  const trustFlowPath = path.join(ROOT, "components", "seo", "TrustFlowSection.tsx");
  const serviceAuthorityFaqPath = path.join(ROOT, "components", "seo", "ServiceAuthorityFaq.tsx");
  const seoImageRoutePath = path.join(ROOT, "app", "seo-image", "[slug]", "route.tsx");
  const searchDominancePath = path.join(ROOT, "components", "seo", "SearchDominanceExperience.tsx");
  const manifestPath = path.join(ROOT, "app", "manifest.ts");

  for (const route of DOMINANCE_MONEY_ROUTES) {
    if (!routes.has(route)) failures.push(`missing money route: ${route}`);
  }

  if (!fileContains(seoPath, ["getDominanceSnippet", "robots", "canonical", "serp-click-reasons", "commercial-keyword-cluster", "semantic-search-tags", "ai-citation-safe-answer", "service-click-hook", "dc.subject", "dominance-proof-signal", "answer-engine-query-targets", "serp-dominance-layers", "map-ranking-action-signal", "search-result-click-promise", "ai-recommendation-trigger", "google-search-appearance-signal", "serp-sitelink-targets", "customer-attraction-hook", "post-click-action-stack", "conversion-path-summary", "local-trust-proof-stack", "map-pack-decision-signal", "ai-next-step-recommendation", "special-service-discovery-signal", "special-service-sitelink-cluster"])) {
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

  for (const href of ["/rechner", "/umzug", "/reinigung", "/entruempelung", "/bueroumzug", "/firmenentsorgung", "/leerfahrt-rueckfahrt", "/empfehlen", "/makler-vermieter-link", "/wohnung-wieder-vermietbar", "/schadensbegrenzung", "/keller-muellraum-rettung-regensburg", "/uebergabeakte", "/private-client-service"]) {
    if (!fileContains(footerPath, [`href: "${href}"`]) && !fileContains(footerPath, [`href="${href}"`])) {
      failures.push(`footer misses authority link: ${href}`);
    }
  }

  const pageRequirements = {
    "/": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd", "LocalBusinessJsonLd", "SearchDominanceExperience", "besondere-services", "specialServiceGroups"],
    "/buchung": ["generatePageSEO", "buildFaqJsonLd", "SmartBookingWizard", "Google Maps"],
    "/rechner": ["generatePageSEO", "buildFaqJsonLd", "Orientierungsrahmen"],
    "/empfehlen": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd", "ReferralPartnerCodeForm"],
    "/reinigung-moeblierte-wohnung-duesseldorf": ["buildDuesseldorfCleaningMetadata", "buildFaqJsonLd", "DuesseldorfApartmentCleaningForm", "Apartment-Reset"],
    "/umzug": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd"],
    "/reinigung": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd"],
    "/entruempelung": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd"],
    "/leerfahrt-rueckfahrt": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd", "BackhaulOffersBoard"],
    "/rueckfahrt-boerse": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd", "ReturnTripBoardForm"],
    "/makler-vermieter-link": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd", "RealtorLandlordLinkForm"],
    "/wohnung-wieder-vermietbar": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd", "RentalReadyForm"],
    "/angebot-guenstiger-pruefen": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd", "CheaperAlternativeForm", "SearchDominanceExperience"],
    "/schadensbegrenzung": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd", "DamageControlForm"],
    "/keller-muellraum-rettung-regensburg": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd", "CellarTrashroomRescueForm"],
    "/uebergabeakte": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd", "HandoverFileForm"],
    "/private-client-service": ["generatePageSEO", "buildFaqJsonLd", "buildServiceJsonLd", "PrivateClientInquiryForm"],
    "/qualitaet-ablauf": ["generatePageSEO", "buildFaqJsonLd", "Vorprüfung", "Preisrahmen"],
    "/praxisfaelle": ["generatePageSEO", "buildFaqJsonLd", "Entscheidungssituationen", "CustomerIntentRouter"],
    "/kostenfaktoren": ["generatePageSEO", "buildFaqJsonLd", "CostDriverMatrix", "Orientierungsrahmen"],
    "/leistungen-vergleichen": ["generatePageSEO", "buildFaqJsonLd", "ServiceMatchBoard", "Service-Kompass"],
    "/anbieter-vergleichen": ["generatePageSEO", "buildFaqJsonLd", "ProviderComparisonPanel", "Anbieter vergleichen"],
    "/buchung-ablauf": ["generatePageSEO", "buildFaqJsonLd", "BookingProcessPanel", "Auftragsbestätigung"],
    "/kontakt": ["generatePageSEO", "buildFaqJsonLd", "ContactTrustPanel", "ContactPage"],
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

  if (!fileContains(llmsPath, ["Leer-Rückfahrt", "Private Client", "Büroumzug", "unverbindlichen Orientierungsrahmen", "service-graph.json"])) {
    failures.push("llms.txt route is missing AI-readable core service context");
  }

  if (
    !fileContains(serviceGraphPath, [
      "floxantServiceGraph",
      "Regensburg",
      "Düsseldorf",
      "Angebot anderer Firma prüfen",
      "keine Düsseldorf-Umzüge",
      "keine Preisgarantie",
    ])
  ) {
    failures.push("AI service graph is missing region, offer-check or safety rules");
  }

  if (
    !fileContains(schemaDatasetsPath, [
      '"@type": "Dataset"',
      "FLOXANT Service Graph",
      "description:",
      "service-graph.json",
    ])
  ) {
    failures.push("service graph Dataset JSON-LD is missing a required description");
  }

  for (const file of [
    path.join(ROOT, "components", "JsonLd.tsx"),
    path.join(ROOT, "components", "seo", "OrganizationJsonLd.tsx"),
  ]) {
    if (!fileContains(file, ["serviceGraphDatasetJsonLd"])) {
      failures.push(`structured data does not use shared Dataset helper: ${path.relative(ROOT, file)}`);
    }
  }

  if (!fileContains(localBusinessPath, ["department", "openingHoursSpecification", "Leer-Rückfahrt", "areaServed"])) {
    failures.push("LocalBusiness JSON-LD lacks recommended local dominance properties");
  }

  if (!fileContains(searchDominancePath, ["SearchDominanceExperience", "Google, Maps & klare Antworten", "Angebot hochladen", "Düsseldorf ohne Umzugs-Signal", "Suchergebnis-Vorschau", "Kurzantwort für Kunden", "Stärken im Vergleich", "Klick-Gründe im Suchergebnis", "Direkte Wege", "flox-dominance-panel", "Nach dem Klick sofort handlungsfähig", "flox-search-action-strip", "Maps, Vertrauen und schnelle Entscheidung", "flox-local-trust-deck"])) {
    failures.push("Search dominance experience component is missing visible conversion and AI/search signals");
  }

  if (!fileContains(manifestPath, ["shortcuts", "Angebot prüfen lassen", "Reinigung Düsseldorf", "germanizeDeep"])) {
    failures.push("manifest is missing mobile discovery shortcuts or German normalization");
  }

  if (!fileContains(routeToPageFile("/"), ["LocalSeoSignalPanel"]) || !fileContains(localSignalPath, ["Google Maps", "company.address", "company.phone"])) {
    failures.push("homepage lacks visible local SEO/NAP signal panel");
  }

  if (!fileContains(routeToPageFile("/"), ["TrustFlowSection"]) || !fileContains(trustFlowPath, ["Anfrage-Qualität", "Rechner starten", "Express-Check"])) {
    failures.push("homepage lacks trust-building request flow section");
  }

  if (!fileContains(serviceAuthorityFaqPath, ["serviceAuthorityFaqs", "ServiceAuthorityFaq", "getServiceAuthorityFaqs"])) {
    failures.push("service-specific authority FAQ component is missing");
  }

  if (!fileContains(path.join(ROOT, "components", "seo", "CustomerIntentRouter.tsx"), ["CustomerIntentRouter", "Leer-Rückfahrt", "Büro"])) {
    failures.push("customer intent router is missing or incomplete");
  }

  if (!fileContains(path.join(ROOT, "components", "seo", "CostDriverMatrix.tsx"), ["CostDriverMatrix", "costDriverGroups", "Kostenfaktoren"])) {
    failures.push("cost driver matrix is missing or incomplete");
  }

  if (!fileContains(path.join(ROOT, "components", "seo", "ServiceMatchBoard.tsx"), ["ServiceMatchBoard", "serviceComparisonRows", "Service-Kompass"])) {
    failures.push("service match board is missing or incomplete");
  }

  if (!fileContains(path.join(ROOT, "components", "seo", "ProviderComparisonPanel.tsx"), ["ProviderComparisonPanel", "providerComparisonCriteria", "Anbieter vergleichen"])) {
    failures.push("provider comparison panel is missing or incomplete");
  }

  if (!fileContains(path.join(ROOT, "components", "seo", "BookingProcessPanel.tsx"), ["BookingProcessPanel", "bookingDocumentSteps", "Auftragsbestätigung"])) {
    failures.push("booking process panel is missing or incomplete");
  }

  if (!fileContains(path.join(ROOT, "components", "seo", "ContactTrustPanel.tsx"), ["ContactTrustPanel", "contactEntryPoints", "WhatsApp"])) {
    failures.push("contact trust panel is missing or incomplete");
  }

  if (!fileContains(twitterImagePath, ["opengraph-image"]) || !fileContains(seoPath, ["twitter-image"])) {
    failures.push("twitter/social image metadata is not wired");
  }

  if (!fileContains(seoImageRoutePath, ["ImageResponse", "umzug", "reinigung", "entruempelung"]) || !fileContains(seoPath, ["seo-image"])) {
    failures.push("service-specific social image route is not wired");
  }

  for (const asset of ["logo_v10.png", "og.jpg", "favicon.ico"]) {
    if (!fs.existsSync(path.join(ROOT, "public", asset))) {
      failures.push(`required public SEO asset missing: ${asset}`);
    }
  }

  for (const file of [path.join(ROOT, "components", "JsonLd.tsx"), path.join(ROOT, "components", "seo", "OrganizationJsonLd.tsx"), path.join(ROOT, "lib", "structured-data.ts")]) {
    if (fileContains(file, ["logo-dark.png"])) {
      failures.push(`structured data references missing logo-dark.png: ${path.relative(ROOT, file)}`);
    }
  }

  if (!fileContains(layoutPath, ["WebVitalsReporter"]) || !fileContains(webVitalsPath, ["useReportWebVitals", "/api/vitals"])) {
    failures.push("web vitals monitoring is not wired into the layout");
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
  const port = await findAvailablePort(DEFAULT_PORT);
  const baseUrl = `http://127.0.0.1:${port}`;
  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
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

    for (const route of GONE_EXPECTATIONS) {
      const response = await fetch(`${baseUrl}${route}`, { redirect: "manual" });
      const robots = response.headers.get("x-robots-tag") || "";
      if (response.status !== 410 || !robots.includes("noindex")) {
        failures.push(`${response.status} ${route} expected 410 noindex`);
      }
    }

    if (failures.length) {
      console.log(`HTTP_CHECK_FAILED checked=${routes.length} redirects=${REDIRECT_EXPECTATIONS.length} gone=${GONE_EXPECTATIONS.length}`);
      console.log(failures.join("\n"));
      process.exitCode = 1;
      return;
    }

    console.log(`HTTP_200_REDIRECTS_AND_GONE_OK checked=${routes.length} redirects=${REDIRECT_EXPECTATIONS.length} gone=${GONE_EXPECTATIONS.length}`);
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
