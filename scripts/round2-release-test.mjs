#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const redirects = read("public/_redirects");
const routesConfig = read("public/_routes.json");
const redirectMiddleware = read("functions/_middleware.js");
const requiredRedirects = [
  "/regensburg/reinigungsfirma /regensburg/reinigung 301",
  "/regensburg/umzugsservice /regensburg/umzug 301",
  "/regensburg/umzugsunternehmen /regensburg/umzug 301",
  "/en/regensburg/moving-company /en/regensburg/moving 301",
  "/regensburg/uebergabereinigung /regensburg/reinigung-nach-umzug 301",
  "/regensburg/endreinigung /regensburg/reinigung-nach-umzug 301",
  "/regensburg/besenreine-uebergabe /regensburg/reinigung-nach-umzug 301",
  "/regensburg/haushaltsaufloesung /regensburg/wohnungsaufloesung 301",
  "/solarreinigung /pv-anlagen-reinigung 301",
  "/regensburg/solarreinigung /pv-anlagen-reinigung 301",
  "/rueckfahrt-boerse /leerfahrt-rueckfahrt 301",
  "/rueckfahrt-radar /leerfahrt-rueckfahrt 301",
  "/beiladung /leerfahrt-rueckfahrt 301",
  "/beiladung-regensburg /leerfahrt-rueckfahrt 301",
  "/angebot-pruefen /angebot-guenstiger-pruefen 301",
  "/angebotscheck /angebot-guenstiger-pruefen 301",
  "/fairpreis-check /angebot-guenstiger-pruefen 301",
];
for (const rule of requiredRedirects) {
  const [source, destination] = rule.split(" ");
  assert.ok(redirects.includes(rule), `missing redirect: ${rule}`);
  assert.ok(routesConfig.includes(`"${source}"`), `missing Pages Functions route: ${source}`);
  assert.ok(
    redirectMiddleware.includes(`["${source}", "${destination}"]`),
    `missing live middleware redirect: ${source} -> ${destination}`,
  );
}
assert.doesNotMatch(redirects, /^\/en\/duesseldorf\/\*/m, "English Düsseldorf pages must not be redirected to the German hub");
assert.doesNotMatch(
  redirects,
  /^\S+\s+\/(?:regensburg\/(?:reinigungsfirma|umzugsservice|umzugsunternehmen|uebergabereinigung|endreinigung|besenreine-uebergabe|haushaltsaufloesung|solarreinigung)|solarreinigung|rueckfahrt-boerse|rueckfahrt-radar|beiladung(?:-regensburg)?|angebot-pruefen|angebotscheck|fairpreis-check)(?:#\S*)?\s/m,
  "redirect targets must not create a chain through a consolidation loser",
);

for (const file of ["app/suche/page.tsx", "app/en/search/page.tsx"]) {
  assert.match(read(file), /robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/, `${file} must be noindex,follow`);
}

const sitemap = read("lib/sitemap-xml.ts");
for (const route of ["suche", "en/search", "regensburg/reinigungsfirma", "rueckfahrt-boerse", "angebotscheck"]) {
  assert.ok(sitemap.includes(`"${route}"`), `${route} must have an explicit sitemap exclusion`);
}
assert.match(sitemap, /git[\s\S]*log[\s\S]*--format=%cs/, "lastmod must use source history");

const hreflang = read("lib/local-seo/hreflangMap.ts");
for (const pair of [
  ["/duesseldorf/reinigung", "/en/duesseldorf/cleaning"],
  ["/regensburg/reinigung", "/en/regensburg/cleaning"],
  ["/signature-services", "/en/signature-services"],
  ["/kontakt", "/en/contact"],
]) {
  assert.ok(hreflang.includes(`{ de: "${pair[0]}", en: "${pair[1]}" }`), `missing hreflang pair ${pair.join(" ↔ ")}`);
}

const englishPages = read("lib/local-seo/englishLocalSeoPages.ts");
for (const route of [
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
]) {
  assert.ok(englishPages.includes(route), `missing evidence-backed English page ${route}`);
}
for (const forbidden of [
  "The English information describes the real service",
  "Publicly reviewed solutions",
  "Open service details in German",
]) assert.doesNotMatch(englishPages, new RegExp(forbidden, "i"));

const englishForm = read("components/english/EnglishRequestForm.tsx");
assert.match(englishForm, /type Step = 1 \| 2 \| 3/);
assert.match(englishForm, /Response language/);
assert.match(englishForm, /preferredContactMethod/);
assert.match(englishForm, /type="file"/);
assert.match(englishForm, /Reference:/);
assert.match(englishForm, /Next step:/);

const statuses = read("functions/_lib/admin-booking-status.js");
for (const status of ["backhaul_matching", "backhaul_notified", "backhaul_accepted", "backhaul_declined"]) {
  assert.ok(statuses.includes(`"${status}"`), `missing backhaul lifecycle status ${status}`);
}

const publicSources = [
  "app/en/service-finder/page.tsx",
  "app/en/services/page.tsx",
  "app/en/signature-services/page.tsx",
  "components/B2BTrustPanel.tsx",
  "components/LocalServiceSeoPage.tsx",
  "components/local-seo/LocalSeoPage.tsx",
  "lib/local-service-seo-pages.ts",
  "lib/local-seo/englishLocalSeoPages.ts",
].map(read).join("\n");
for (const phrase of [
  "damit der Hub nicht kannibalisiert",
  "B2B Proof",
  "Publicly reviewed solutions",
  "The English information describes the real service",
  "Locally checked",
  "Lokal geprüft",
]) assert.doesNotMatch(publicSources, new RegExp(phrase, "i"), `customer-facing phrase remains: ${phrase}`);

const matrix = read("lib/content/seo-matrix.ts");
for (const field of ["shortTitle", "longTitle", "activeTitle", "metaDescription", "h1", "ogTitle", "ogDescription"]) {
  assert.ok(matrix.includes(field), `central SEO matrix is missing ${field}`);
}

const scoreReport = read("docs/ROUND2_OPPORTUNITY_SCORES.md");
assert.match(scoreReport, /mindestens 11\/15/);
assert.match(scoreReport, /Lieferfähigkeit 3\/3/);

console.log(JSON.stringify({
  passed: true,
  redirects: requiredRedirects.length,
  englishPages: 13,
  searchPages: "noindex,follow",
  backhaulLifecycle: 4,
  seoMatrix: true,
}, null, 2));
