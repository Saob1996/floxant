#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const moduleCache = new Map();

function resolveModule(fromFile, request) {
  const candidate = request.startsWith("@/")
    ? path.join(root, request.slice(2))
    : request.startsWith(".")
      ? path.resolve(path.dirname(fromFile), request)
      : null;
  if (!candidate) return null;
  for (const file of [candidate, `${candidate}.ts`, `${candidate}.tsx`, path.join(candidate, "index.ts")]) {
    if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  }
  return null;
}

function loadTypeScriptModule(file) {
  const absolute = path.resolve(file);
  if (moduleCache.has(absolute)) return moduleCache.get(absolute).exports;
  const source = fs.readFileSync(absolute, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: absolute,
  }).outputText;
  const loadedModule = { exports: {} };
  moduleCache.set(absolute, loadedModule);
  const localRequire = (request) => {
    const resolved = resolveModule(absolute, request);
    return resolved ? loadTypeScriptModule(resolved) : require(request);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports,__filename,__dirname){${output}\n})`,
    { filename: absolute },
  );
  wrapper(localRequire, loadedModule, loadedModule.exports, absolute, path.dirname(absolute));
  return loadedModule.exports;
}

const { germanizeDeep } = loadTypeScriptModule(
  path.join(root, "lib", "german-text.ts"),
);

function stringProperty(node, name) {
  if (!ts.isObjectLiteralExpression(node)) return "";
  const property = node.properties.find(
    (item) =>
      ts.isPropertyAssignment(item) &&
      (item.name?.text === name || item.name?.escapedText === name),
  );
  if (!property || !ts.isPropertyAssignment(property)) return "";
  if (
    ts.isStringLiteralLike(property.initializer) ||
    ts.isNoSubstitutionTemplateLiteral(property.initializer)
  ) {
    return property.initializer.text;
  }
  return "";
}

function extractBlogEntries(file) {
  if (!fs.existsSync(file)) return [];
  const source = fs.readFileSync(file, "utf8");
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const entries = [];
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const slug = stringProperty(node, "slug");
      const title = stringProperty(node, "title");
      const description =
        stringProperty(node, "description") || stringProperty(node, "excerpt");
      if (slug && title && !entries.some((entry) => entry.slug === slug)) {
        entries.push({ slug, title, description });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  return entries;
}

function cleanArray(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => item.trim())
    .filter((item) => {
      const normalized = item.toLocaleLowerCase("de");
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    });
}

function normalizeGermanEntry(entry) {
  const normalized = germanizeDeep(entry);
  return {
    ...normalized,
    regions: cleanArray(normalized.regions),
    serviceIds: cleanArray(normalized.serviceIds),
    keywords: cleanArray(normalized.keywords),
  };
}

function cleanLocales(value) {
  return cleanArray(value).filter((locale) => locale === "de" || locale === "en");
}

function localeFromRoute(route) {
  return route === "/en" || route.startsWith("/en/") ? "en" : "de";
}

function isLocaleRoute(route, locale) {
  if (typeof route !== "string" || !route.startsWith("/") || route.startsWith("//")) {
    return false;
  }
  if (route.includes("?") || route.includes("#")) return false;
  return localeFromRoute(route) === locale;
}

function serviceRouteForLocale(service, locale) {
  const route = locale === "en" ? service.englishAlternativeRoute : service.canonicalRoute;
  return isLocaleRoute(route, locale) ? route : null;
}

function serviceRoutesForLocale(service, locale) {
  const primaryRoute =
    locale === "en" ? service.englishAlternativeRoute : service.canonicalRoute;
  return cleanArray([primaryRoute, ...cleanArray(service.additionalRoutes)]).filter(
    (route) => isLocaleRoute(route, locale),
  );
}

function regionsForRoute(service, route) {
  if (route.includes("/duesseldorf/")) return ["Düsseldorf"];
  if (route.includes("/regensburg/")) return ["Regensburg"];
  return cleanArray(service.regions);
}

function localizedServiceDescription(service, locale) {
  if (locale === "de") return service.shortDescription;
  return `Public service information and enquiry details for ${service.englishName}.`;
}

function unique(entries) {
  const seen = new Set();
  return entries.filter((entry) => {
    const key = `${entry.locale}:${entry.url}:${entry.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const servicesModule = loadTypeScriptModule(
  path.join(root, "lib", "services", "service-registry.ts"),
);
const signaturesModule = loadTypeScriptModule(
  path.join(root, "lib", "services", "signature-solutions.ts"),
);
const faqModule = loadTypeScriptModule(
  path.join(root, "lib", "content", "faq-registry.ts"),
);
const dominanceArticleModule = loadTypeScriptModule(
  path.join(root, "lib", "content", "dominance-articles.ts"),
);
const entries = [];
const publicServices = servicesModule.publicServices || [];
const serviceById = new Map(publicServices.map((service) => [service.id, service]));
const assignmentRoutesByFaqId = new Map();

for (const assignment of faqModule.priorityFaqAssignments || []) {
  if (
    assignment.status !== "ACTIVE" ||
    !isLocaleRoute(assignment.route, assignment.locale)
  ) {
    continue;
  }
  for (const faqId of cleanArray(assignment.faqIds)) {
    const routes = assignmentRoutesByFaqId.get(faqId) || [];
    if (!routes.includes(assignment.route)) routes.push(assignment.route);
    assignmentRoutesByFaqId.set(faqId, routes);
  }
}

function faqRouteForLocale(faq, locale) {
  const assignedRoutes = assignmentRoutesByFaqId.get(faq.id) || [];
  const directCandidates = [
    ...assignedRoutes,
    faq.relatedService,
    faq.relatedArticle,
  ];
  const assignedOrRelated = directCandidates.find((route) =>
    isLocaleRoute(route, locale),
  );
  if (assignedOrRelated) return assignedOrRelated;

  for (const serviceId of cleanArray(faq.serviceIds)) {
    const service = serviceById.get(serviceId);
    if (!service) continue;
    const route = serviceRouteForLocale(service, locale);
    if (route) return route;
  }

  return locale === "en" ? "/en/questions" : "/fragen";
}

for (const service of publicServices) {
  for (const locale of cleanLocales(service.locale)) {
    for (const url of serviceRoutesForLocale(service, locale)) {
      entries.push({
        id: `service:${service.id}:${locale}:${url.replace(/[^a-z0-9]+/gi, "-")}`,
        title: locale === "en" ? service.englishName : service.germanName,
        description: localizedServiceDescription(service, locale),
        url,
        locale,
        type: service.specialSolution
          ? "special_solution"
          : service.signature
            ? "signature"
            : "service",
        regions: regionsForRoute(service, url),
        serviceIds: [service.id],
        keywords: cleanArray([
          ...cleanArray(service.targetAudiences),
          ...cleanArray(service.objectTypes),
          locale === "en" ? service.englishName : service.shortTitle,
          service.headline,
        ]),
      });
    }
  }
}

for (const solution of signaturesModule.publicSignatureSolutions || []) {
  const locale = localeFromRoute(solution.canonicalRoute);
  if (!isLocaleRoute(solution.canonicalRoute, locale)) continue;
  entries.push({
    id: `signature:${solution.id}:${locale}`,
    title: solution.name,
    description: solution.actualFunction,
    url: solution.canonicalRoute,
    locale,
    type: solution.kind === "SPECIAL_SOLUTION" ? "special_solution" : "signature",
    regions: cleanArray(solution.regions),
    serviceIds: cleanArray(solution.serviceIds),
    keywords: cleanArray([
      ...cleanArray(solution.targetGroups),
      solution.problem,
      solution.result,
    ]),
  });
}

for (const faq of faqModule.publicFaqs || []) {
  const locale = faq.locale === "en" ? "en" : "de";
  entries.push({
    id: `faq:${faq.id}`,
    title: faq.question,
    description: faq.shortAnswer,
    url: faqRouteForLocale(faq, locale),
    locale,
    type: "faq",
    regions: cleanArray(faq.region),
    serviceIds: cleanArray(faq.serviceIds),
    keywords: cleanArray([
      faq.category,
      faq.intent,
      ...cleanArray(faq.audience),
    ]),
  });
}

for (const article of extractBlogEntries(path.join(root, "lib", "blog-posts.ts"))) {
  entries.push({
    id: `article:de:${article.slug}`,
    title: article.title,
    description: article.description || "FLOXANT Ratgeber mit konkretem Servicebezug.",
    url: `/blog/${article.slug}`,
    locale: "de",
    type: "article",
    regions: article.title.includes("Düsseldorf")
      ? ["Düsseldorf"]
      : article.title.includes("Regensburg")
        ? ["Regensburg"]
        : [],
    serviceIds: [],
    keywords: [],
  });
}

for (const article of dominanceArticleModule.dominanceArticles || []) {
  entries.push({
    id: `article:${article.locale}:${article.slug}`,
    title: article.title,
    description: article.description,
    url: article.locale === "en" ? `/en/blog/${article.slug}` : `/blog/${article.slug}`,
    locale: article.locale,
    type: "article",
    regions: article.title.includes("Düsseldorf")
      ? ["Düsseldorf"]
      : article.title.includes("Regensburg")
        ? ["Regensburg"]
        : [],
    serviceIds: cleanArray([article.serviceId]),
    keywords: cleanArray([article.category, ...cleanArray(article.about)]),
  });
}

entries.push(
  {
    id: "location:de:duesseldorf",
    title: "FLOXANT Düsseldorf",
    description: "Öffentliche FLOXANT-Leistungen und Anfragewege für Düsseldorf.",
    url: "/duesseldorf",
    locale: "de",
    type: "location",
    regions: ["Düsseldorf"],
    serviceIds: [],
    keywords: ["duesseldorf", "düsseldorf"],
  },
  {
    id: "location:de:regensburg",
    title: "FLOXANT Regensburg",
    description: "Öffentliche FLOXANT-Leistungen und Anfragewege für Regensburg.",
    url: "/regensburg",
    locale: "de",
    type: "location",
    regions: ["Regensburg"],
    serviceIds: [],
    keywords: [],
  },
  {
    id: "location:en:duesseldorf",
    title: "FLOXANT Düsseldorf services",
    description: "English service guidance for enquiries in Düsseldorf.",
    url: "/en/duesseldorf/cleaning",
    locale: "en",
    type: "location",
    regions: ["Düsseldorf"],
    serviceIds: [],
    keywords: ["duesseldorf", "dusseldorf"],
  },
  {
    id: "location:en:regensburg",
    title: "FLOXANT Regensburg services",
    description: "English service guidance for enquiries in Regensburg.",
    url: "/en/regensburg/moving",
    locale: "en",
    type: "location",
    regions: ["Regensburg"],
    serviceIds: [],
    keywords: [],
  },
  {
    id: "guide:de:signature-services",
    title: "FLOXANT Signature Services und Spezialloesungen",
    description: "Angebot, Objektbrief, Uebergabe, Plan B, Diskretion, Spezialreinigung, Spezialumzug und Spezialentruempelung passend einordnen.",
    url: "/signature-services",
    locale: "de",
    type: "guide",
    regions: ["Regensburg", "Duesseldorf"],
    serviceIds: ["angebotscheck", "objektbrief", "uebergabeakte", "plan-b-service", "diskret-service"],
    keywords: ["signature services", "spezialservice", "sonderfall", "angebot pruefen"],
  },
  {
    id: "guide:de:spezialreinigung",
    title: "Spezialreinigung mit klarer Anfrage",
    description: "Solarreinigung, PV-Anlagen-Reinigung, Glasreinigung, Bauendreinigung, Praxisreinigung und Hausverwaltungsreinigung sauber vorbereiten.",
    url: "/spezialreinigung",
    locale: "de",
    type: "guide",
    regions: ["Regensburg", "Duesseldorf"],
    serviceIds: ["solarreinigung", "pv-anlagen-reinigung", "fensterreinigung", "baureinigung", "praxisreinigung"],
    keywords: ["spezialreinigung", "pv reinigung", "glasreinigung", "baureinigung"],
  },
  {
    id: "guide:de:spezialumzug",
    title: "Spezialumzug, Mini-Umzug und Transport",
    description: "Kleine, dringende oder flexible Transporte mit Route, Volumen, Zugang, Haltezone und Zeitfenster vorab sortieren.",
    url: "/spezialumzug",
    locale: "de",
    type: "guide",
    regions: ["Regensburg", "Duesseldorf"],
    serviceIds: ["mini-umzug", "express-umzug", "moebeltransport", "rueckfahrt-radar"],
    keywords: ["spezialumzug", "mini umzug", "express umzug", "moebeltransport", "beiladung"],
  },
  {
    id: "guide:de:spezial-entruempelung",
    title: "Spezialentruempelung, Nachlass und Keller",
    description: "Keller, Nachlass, Lager, Restmengen und Uebergabevorbereitung diskret, fotobasiert und realistisch anfragen.",
    url: "/spezial-entruempelung",
    locale: "de",
    type: "guide",
    regions: ["Regensburg", "Duesseldorf"],
    serviceIds: ["kellerentruempelung", "nachlassaufloesung", "wohnungsaufloesung", "diskret-service"],
    keywords: ["spezialentruempelung", "nachlass", "kellerentruempelung", "aufloesung"],
  },
  {
    id: "guide:de:methodik",
    title: "FLOXANT Methodik",
    description: "Wie Fakten, Servicegrenzen und Inhalte geprüft werden.",
    url: "/methodik",
    locale: "de",
    type: "guide",
    regions: [],
    serviceIds: [],
    keywords: ["redaktion", "fakten", "review"],
  },
  {
    id: "guide:en:methodology",
    title: "FLOXANT methodology",
    description: "How facts, service boundaries and content are reviewed.",
    url: "/en/methodology",
    locale: "en",
    type: "guide",
    regions: [],
    serviceIds: [],
    keywords: ["editorial", "facts", "review"],
  },
);

const searchIndex = {
  version: 1,
  source: "FLOXANT public registries and reviewed public routes",
  entries: unique(entries).map((entry) =>
    entry.locale === "de" ? normalizeGermanEntry(entry) : entry,
  ).sort(
    (left, right) =>
      left.locale.localeCompare(right.locale) ||
      left.title.localeCompare(right.title, left.locale),
  ),
};
const output = path.join(root, "public", "search-index.json");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(searchIndex, null, 2)}\n`, "utf8");
console.log(
  JSON.stringify(
    {
      output: path.relative(root, output),
      entries: searchIndex.entries.length,
      de: searchIndex.entries.filter((entry) => entry.locale === "de").length,
      en: searchIndex.entries.filter((entry) => entry.locale === "en").length,
      services: searchIndex.entries.filter((entry) => entry.type === "service").length,
      faq: searchIndex.entries.filter((entry) => entry.type === "faq").length,
      articles: searchIndex.entries.filter((entry) => entry.type === "article").length,
    },
    null,
    2,
  ),
);
