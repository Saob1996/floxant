#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const page = read("app/regensburg/seniorenumzug/page.tsx");
const redirectsSource = read("public/_redirects");
const seo = read("lib/seo.ts");
const sitemap = read("lib/sitemap-routes.ts");
const sitemapConfig = read("lib/sitemap-config.ts");
const sitemapXml = read("lib/sitemap-xml.ts");
const navigation = [
  read("lib/service-navigation.ts"),
  read("lib/service-routing.ts"),
  read("lib/floxant-services.ts"),
  read("components/FloxServicesMegaMenu.tsx"),
].join("\n");
const registry = read("lib/services/service-registry.ts");
const article = read("lib/strategic-blog-articles.ts");
const dynamicRoutePage = read("app/[serviceSlug]/page.tsx");
const relativesArticleStart = article.indexOf('slug: "seniorenumzug-fuer-angehoerige"');
const relativesArticleEnd = article.indexOf('slug: "diskreter-umzug-sensible-situationen"', relativesArticleStart + 1);
const relativesArticle = article.slice(
  relativesArticleStart,
  relativesArticleEnd > relativesArticleStart ? relativesArticleEnd : undefined,
);

const canonical = "/regensburg/seniorenumzug";
const aliases = [
  "/seniorenumzug",
  "/seniorenumzug-bayern",
  "/seniorenumzug-augsburg",
  "/seniorenumzug-ingolstadt",
  "/seniorenumzug-landshut",
  "/seniorenumzug-muenchen",
  "/seniorenumzug-nuernberg",
  "/seniorenumzug-passau",
];

const redirects = new Map(
  redirectsSource
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split(/\s+/))
    .filter((parts) => parts.length >= 3)
    .map(([source, target, status]) => [source, { target, status }]),
);

const checks = [];
function check(label, condition) {
  checks.push({ label, condition: Boolean(condition) });
}

check("canonical metadata points to Regensburg", page.includes(`const canonicalPath = "${canonical}"`));
check("one clear H1 is present", (page.match(/<h1\b/g) || []).length === 1 && page.includes("Seniorenumzug in Regensburg ruhig und klar planen."));
check("preselected contact route is used", page.includes("/kontakt?location=regensburg&service=seniorenumzug&intent=seniorenumzug-anfragen&source=website"));
check("direct telephone CTA is used", page.includes("href={`tel:${company.phoneRaw}`}"));
check("institutional section is exact", page.includes("Für Kassen, Sozialdienste und professionelle Ansprechpartner"));
check(
  "institutional audiences are named without a partnership claim",
  [
    "Versicherten, Patienten oder Klienten",
    "Krankenkassen",
    "Pflegekassen",
    "Sozialdienste",
    "Pflegeberatungen",
    "gesetzliche Betreuer",
    "Kliniken",
    "Reha-Einrichtungen",
    "Pflegeeinrichtungen",
    "ambulante Dienste",
    "keine bestehende Partnerschaft",
  ].every((value) => page.includes(value)),
);
check("relatives section is present", page.includes("Für Angehörige"));
check("three process steps are defined", ["Eckdaten senden", "Umfang persönlich klären", "Nächsten Schritt abstimmen"].every((value) => page.includes(value)));
check("seven visible FAQs are defined", (page.match(/\n\s+q: "/g) || []).length === 7);
check(
  "individual-case disclaimer is present",
  [
    "Ob und in welchem Umfang ein Kostenträger Leistungen übernimmt",
    "Einzelfall ab",
    "keine Rechts-",
    "oder Sozialleistungsberatung",
  ].every((value) => page.includes(value)),
);
check("no amount or cost-coverage promise is present", !/[0-9]+\s*(?:€|Euro)|Kostenübernahme (?:ist|wird) garantiert|garantierte Kostenübernahme/i.test(page));

for (const type of ["WebPage", "Service", "BreadcrumbList"]) {
  check(`schema ${type} is present`, page.includes(`"@type": "${type}"`));
}
for (const type of ["FAQPage", "ItemList", "Offer", "AggregateRating", "Review"]) {
  check(`schema ${type} is absent`, !page.includes(`"@type": "${type}"`));
}

for (const alias of aliases) {
  const rule = redirects.get(alias);
  check(`${alias} redirects directly with 308`, rule?.target === canonical && rule?.status === "308");
  check(`${alias} SEO alias points directly to Regensburg`, seo.includes(`"${alias}": "${canonical}"`));
  check(`${alias} is absent from sitemap`, !sitemap.includes(`"${alias}"`));
}

const retiredTargets = new Set(aliases.slice(1));
check(
  "senior wildcard redirects directly to Regensburg",
  redirects.get("/seniorenumzug-*")?.target === canonical &&
    redirects.get("/seniorenumzug-*")?.status === "308",
);
check(
  "no redirect chain targets a retired senior page",
  [...redirects.values()].every(
    ({ target }) => !retiredTargets.has(target) && !target.startsWith("/seniorenumzug-"),
  ),
);
check(
  "SEO aliases contain no senior intermediate target",
  !/:\s*"\/seniorenumzug-(?!regensburg)/.test(seo),
);
check("canonical page remains in sitemap", sitemap.includes(`"${canonical}"`));
check("retired senior roots cannot enter generated sitemap", sitemapXml.includes('normalizedRoute.startsWith("seniorenumzug-")'));
check("retired senior roots are absent from sitemap config", !/"seniorenumzug-(?!regensburg\/)/.test(sitemapConfig));
check(
  "dynamic senior location pages are excluded from static params",
  dynamicRoutePage.includes('.filter((entry) => entry.service !== "seniorenumzug")'),
);
check("navigation uses only the Regensburg primary route", navigation.includes(`primaryRoute: "${canonical}"`) && !navigation.includes('primaryRoute: "/seniorenumzug-bayern"'));
check("service routing supports Regensburg only", navigation.includes('supportedCities: ["regensburg"]') && navigation.includes(`internalRoute: "${canonical}"`));
check("service registry is Regensburg-scoped", registry.includes('regions: ["Regensburg"]') && registry.includes(`canonicalRoute: "${canonical}"`));
check("relatives article links to the canonical page", relativesArticle.includes(`{ href: "${canonical}", label: "Seniorenumzug Regensburg ansehen" }`));
check("relatives article does not claim Düsseldorf service", relativesArticle.includes("FLOXANT kann in Regensburg helfen") && !relativesArticle.includes("Düsseldorf"));

const failed = checks.filter((entry) => !entry.condition);
for (const entry of checks) {
  console.log(`${entry.condition ? "PASS" : "FAIL"} ${entry.label}`);
}
console.log(`Seniorenumzug health: ${checks.length - failed.length}/${checks.length} checks passed`);

if (failed.length) process.exit(1);
