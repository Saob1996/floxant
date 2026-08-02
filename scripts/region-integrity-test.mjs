import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const checks = [];

function test(name, check) {
  check();
  checks.push(name);
}

function loadTypeScriptModule(relativePath, requireModule = () => ({})) {
  const source = read(relativePath);
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: relativePath,
  }).outputText;
  const runtimeModule = { exports: {} };
  const execute = new Function("require", "module", "exports", output);
  execute(requireModule, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function assertRegionSeparated(links, expectedRegion, wrongRegion) {
  const rendered = JSON.stringify(links);
  assert.match(rendered, new RegExp(expectedRegion, "i"));
  assert.doesNotMatch(rendered, new RegExp(wrongRegion, "i"));
}

const seoSource = read("lib/seo.ts");
const localServiceSource = read("lib/local-service-seo-pages.ts");
const internalLinksSource = read("lib/local-seo/internalLinks.ts");
const trustProofSource = read("lib/trust-proof.ts");
const floxantServicesSource = read("lib/floxant-services.ts");
const cheaperAlternativeFormSource = read("components/CheaperAlternativeForm.tsx");
const bookingWizardSource = read("components/SmartBookingWizard.tsx");
const bookingPageSource = read("app/buchung/page.tsx");
const bookingQueryRegionGateSource = read("components/BookingQueryRegionGate.tsx");
const geoDataSource = read("lib/geo-data.ts");
const duesseldorfOfferCheckSource = read("app/angebot-vergleichen-duesseldorf/page.tsx");
const duesseldorfLayoutSource = read("app/duesseldorf/layout.tsx");
const siteChromeSource = read("components/layout/SiteChrome.tsx");
const specialtyPageLayoutSource = read("components/SpecialtyPageLayout.tsx");
const localServiceBridgeSource = read("components/conversion/LocalServiceBridge.tsx");
const growthServiceLandingSource = read("components/GrowthServiceLandingPage.tsx");
const specialMovingSource = read("app/spezialumzug/page.tsx");
const professionalCopySource = read("lib/professional-copy.ts");
const serviceAreaSearchSource = read("components/service-areas/ServiceAreaSearch.tsx");
const homepageSource = read("app/page.tsx");
const qualityGateSource = read("scripts/quality-gate.js");
const discreetServiceSource = read("app/diskret-service/page.tsx");
const expressRequestSource = read("app/express-anfrage/page.tsx");
const faqSource = read("lib/faqs.ts");
const sourceOfTruthSource = read("lib/source-of-truth.ts");
const offerCheckBlogSource = read("lib/offer-check-blog-articles.ts");
const serviceClusterGridSource = read("components/ServiceClusterGrid.tsx");
const publicSearchIndexSource = read("public/search-index.json");
const leadIntentsSource = read("lib/lead-intents.ts");
const publicCoverageClaimsSource = [
  "app/bueroumzug-bayern/page.tsx",
  "app/kurzfristiger-umzug-bayern/page.tsx",
  "app/leerfahrt-rueckfahrt/page.tsx",
  "app/notfall-umzug-bayern/page.tsx",
  "app/rueckfahrt-boerse/page.tsx",
  "app/seo-image/[slug]/route.tsx",
  "app/umzug/page.tsx",
  "components/BackhaulOffersBoard.tsx",
  "components/PublicAuthorityModules.tsx",
  "lib/ai-recommendation-blog-articles.ts",
  "lib/backhaul-offers.ts",
  "lib/strategic-blog-articles.ts",
].map(read).join("\n");
const publicSpecialServiceCopySource = [
  "app/spezialreinigung/page.tsx",
  "app/regensburg/page.tsx",
  "app/signature-services/page.tsx",
  "components/visuals/ServiceVisuals.tsx",
].map(read).join("\n");
const localServiceModule = loadTypeScriptModule("lib/local-service-seo-pages.ts", (specifier) => {
  if (specifier === "@/lib/german-text") return { germanizeDeep: (value) => value };
  throw new Error(`Unexpected import in local service page test: ${specifier}`);
});
const internalLinksModule = loadTypeScriptModule("lib/local-seo/internalLinks.ts");

test("Düsseldorf route detection does not classify Regensburg routes", () => {
  const match = seoSource.match(/function isDuesseldorfRoute\(path: string\)\s*\{\s*return ([^;]+);\s*\}/);
  assert.ok(match, "isDuesseldorfRoute must remain a directly testable predicate");
  const isDuesseldorfRoute = new Function("path", `return ${match[1]};`);

  assert.equal(isDuesseldorfRoute("/duesseldorf/reinigung"), true);
  assert.equal(isDuesseldorfRoute("/angebot-vergleichen-duesseldorf"), true);
  assert.equal(isDuesseldorfRoute("/regensburg/umzug"), false);
});

test("Düsseldorf SEO branches do not emit Regensburg copy or keywords", () => {
  const descriptionStart = seoSource.indexOf("  if (isDuesseldorfRoute(path)) {");
  const descriptionEnd = seoSource.indexOf('  if (path.includes("angebot-guenstiger"))', descriptionStart);
  const descriptionBranch = seoSource.slice(descriptionStart, descriptionEnd);
  assert.match(descriptionBranch, /Düsseldorf/);
  assert.doesNotMatch(descriptionBranch, /Regensburg/);

  const keywordStart = seoSource.indexOf("  if (isDuesseldorfPath) {", seoSource.indexOf('  if (route === "/")'));
  const keywordEnd = seoSource.indexOf('  if (route.includes("reinigung"))', keywordStart);
  const keywordBranch = seoSource.slice(keywordStart, keywordEnd);
  assert.match(keywordBranch, /Reinigung Düsseldorf/);
  assert.doesNotMatch(keywordBranch, /Regensburg/);
});

test("Regensburg service pages contain only Regensburg locality data", () => {
  const pages = Object.values(localServiceModule.localServiceSeoPages);
  const foreignTerms = /Düsseldorf|Düsseldorfer|Flingern|Pempelfort|Derendorf|Oberkassel|Bilk|Benrath|Kaiserswerth/i;

  assert.ok(pages.length > 0);
  for (const page of pages) {
    assert.equal(page.cityKey, "regensburg", `${page.key} has the wrong city key`);
    assert.doesNotMatch(JSON.stringify(page), foreignTerms, `${page.key} contains Düsseldorf locality data`);
    assert.equal(new Set(page.districts).size, page.districts.length, `${page.key} contains duplicate districts`);
    assert.ok(page.relatedLinks.every((link) => !link.href.startsWith("/duesseldorf")), `${page.key} links to Düsseldorf`);
  }

  assert.match(localServiceModule.localServiceSeoPages["regensburg-umzug"].localTitle, /^Regensburger/);
  assert.doesNotMatch(localServiceSource, /duesseldorfDistricts|duesseldorfServiceLinks/);
});

test("Regensburg cleaning copy uses the verified 75-km service-area model", () => {
  const regionalSources = `${seoSource}\n${localServiceSource}\n${internalLinksSource}`;
  assert.match(regionalSources, /75(?:-| )km/);
  assert.doesNotMatch(regionalSources, /50(?:-| )km/);
});

test("regional hub links use the requested region and coverage page", () => {
  const duesseldorfLinks = internalLinksModule.getRegionalHubLinks("duesseldorf");
  const regensburgLinks = internalLinksModule.getRegionalHubLinks("regensburg");

  assertRegionSeparated(duesseldorfLinks, "duesseldorf", "regensburg");
  assertRegionSeparated(regensburgLinks, "regensburg", "duesseldorf");
  assert.ok(duesseldorfLinks.some((link) => link.href === "/duesseldorf/einsatzgebiet"));
  assert.ok(regensburgLinks.some((link) => link.href === "/region-regensburg"));
});

test("service and offer links remain region-specific", () => {
  for (const serviceKey of ["reinigung", "angebot-vergleichen", "umzug"]) {
    const duesseldorfLinks = internalLinksModule.getServiceInternalLinks("duesseldorf", serviceKey);
    const regensburgLinks = internalLinksModule.getServiceInternalLinks("regensburg", serviceKey);

    assertRegionSeparated(duesseldorfLinks, "duesseldorf", "regensburg");
    assertRegionSeparated(regensburgLinks, "regensburg", "duesseldorf");
    assert.ok(
      duesseldorfLinks.every((link) => !/umzug|entruempelung|wohnungsaufloesung/.test(link.href)),
      `Düsseldorf ${serviceKey} links mix in non-cleaning services`,
    );
  }
});

test("visible Düsseldorf proof and form choices stay cleaning-only", () => {
  const proofStart = trustProofSource.indexOf("  duesseldorf: {");
  const proofEnd = trustProofSource.indexOf("  regensburg: {", proofStart);
  const proofBlock = trustProofSource.slice(proofStart, proofEnd);
  assert.match(proofBlock, /Reinigung/);
  assert.doesNotMatch(proofBlock, /Umzug|Entrümpelung|Räumung|Haushaltsauflösung|Klaviertransport/);

  const regionStart = floxantServicesSource.indexOf("  duesseldorf: {");
  const regionEnd = floxantServicesSource.indexOf("  regensburg: {", regionStart);
  const regionBlock = floxantServicesSource.slice(regionStart, regionEnd);
  assert.match(regionBlock, /Reinigung/);
  assert.doesNotMatch(regionBlock, /Umzug|Entrümpelung|Räumung|Haushaltsauflösung|Klaviertransport/);

  const optionsStart = cheaperAlternativeFormSource.indexOf("const duesseldorfServices = [");
  const optionsEnd = cheaperAlternativeFormSource.indexOf("];", optionsStart);
  const optionsBlock = cheaperAlternativeFormSource.slice(optionsStart, optionsEnd);
  assert.match(optionsBlock, /reinigung/);
  assert.doesNotMatch(optionsBlock, /umzug|entruempelung|haushaltsaufloesung|solarreinigung|klaviertransport/);
});

test("retired Düsseldorf disposal routes redirect directly to cleaning", () => {
  const redirectsSource = read("public/_redirects");
  const sitemapSource = read("lib/sitemap-routes.ts");
  assert.equal(fs.existsSync(path.join(root, "app/entsorgung-duesseldorf/page.tsx")), false);
  assert.equal(fs.existsSync(path.join(root, "app/duesseldorf/entsorgung/page.tsx")), false);
  assert.match(redirectsSource, /^\/entsorgung-duesseldorf \/duesseldorf\/reinigung 308$/m);
  assert.match(redirectsSource, /^\/duesseldorf\/entsorgung \/duesseldorf\/reinigung 308$/m);
  assert.equal((sitemapSource.match(/"\/entsorgung-duesseldorf"/g) || []).length, 0);
  assert.equal((sitemapSource.match(/"\/duesseldorf\/entsorgung"/g) || []).length, 0);
});

test("Düsseldorf metadata uses the verified NRW location and generic pages do not inherit Bavaria", () => {
  assert.match(geoDataSource, /duesseldorf:\s*\{/);
  assert.match(geoDataSource, /lat: "51\.2225767"/);
  assert.match(geoDataSource, /lng: "6\.7772364"/);
  assert.match(geoDataSource, /regionCode: "DE-NW"/);
  assert.doesNotMatch(seoSource, /geo\?\.regionCode \|\| "DE-BY"/);
  assert.doesNotMatch(seoSource, /geo \? `\$\{geo\.lat\};\$\{geo\.lng\}` : "49\.0134;12\.1016"/);
  assert.match(duesseldorfOfferCheckSource, /"geo\.region": "DE-NW"/);
  assert.match(duesseldorfOfferCheckSource, /"geo\.placename": "Düsseldorf"/);
  assert.match(duesseldorfOfferCheckSource, /"geo\.position": "51\.2225767;6\.7772364"/);
  assert.match(duesseldorfOfferCheckSource, /addressRegion: duesseldorfCompany\.state/);
  assert.match(duesseldorfOfferCheckSource, /latitude: duesseldorfCompany\.geo\.lat/);
  assert.match(duesseldorfOfferCheckSource, /longitude: duesseldorfCompany\.geo\.lng/);
  assert.match(duesseldorfLayoutSource, /"geo\.position": "51\.2225767;6\.7772364"/);
  assert.match(
    siteChromeSource,
    /const hasPageSpecificOrganizationSchema =[\s\S]{0,120}pathname === "\/angebot-vergleichen-duesseldorf"/,
  );
  assert.match(
    siteChromeSource,
    /!hasPageSpecificOrganizationSchema && !isPrivateSection \? <JsonLd/,
  );
});

test("service-area search never guesses ambiguous place names and exposes every active service", () => {
  const serviceAreaData = JSON.parse(read("data/service-areas/service-areas.json"));
  const regensburgNames = serviceAreaData.regions.regensburg.places.map((place) => place.name);
  const duplicateNames = regensburgNames.filter(
    (name, index) => regensburgNames.indexOf(name) !== index,
  );

  assert.ok(duplicateNames.length > 0, "fixture must retain real duplicate municipality names");
  assert.match(serviceAreaSearchSource, /exactMatches\.length === 1/);
  assert.doesNotMatch(serviceAreaSearchSource, /suggestions\[0\]/);
  assert.match(serviceAreaSearchSource, /selectedPlace \? config\.serviceLinks : \[\]/);
  assert.doesNotMatch(serviceAreaSearchSource, /serviceLinks\.slice/);
  assert.match(serviceAreaSearchSource, /params\.set\("service", serviceId\)/);
  assert.match(serviceAreaSearchSource, /aria-pressed=\{isSelected\}/);
});

test("Düsseldorf booking context can only preselect and offer cleaning", () => {
  const allowedStart = bookingWizardSource.indexOf("const DUSSELDORF_BOOKING_SERVICE_IDS");
  const allowedEnd = bookingWizardSource.indexOf("]);", allowedStart);
  const allowedBlock = bookingWizardSource.slice(allowedStart, allowedEnd);

  assert.match(allowedBlock, /"reinigung"/);
  assert.doesNotMatch(allowedBlock, /"entsorgung"|"umzug"|"bueroumzug"|"seniorenumzug"|"klaviertransport"/);
  assert.match(bookingWizardSource, /const isDusseldorfUnsupportedQueryContext/);
  assert.match(bookingWizardSource, /queryServicePreset = isDusseldorfUnsupportedQueryContext\s*\? null/);
  assert.match(bookingWizardSource, /options\.filter\(\(option\) => DUSSELDORF_BOOKING_SERVICE_IDS\.has/);
  assert.doesNotMatch(bookingPageSource, /duesseldorf_moving_booking/);
  assert.doesNotMatch(bookingWizardSource, /duesseldorf_disposal_booking/);
  assert.match(bookingPageSource, /service\.title === "Reinigung"/);
  assert.match(bookingPageSource, /\["Fotos ergänzen", "Schadensbegrenzung"\]\.includes/);
  assert.match(bookingPageSource, /region === "duesseldorf" && service !== "reinigung"/);
  assert.match(bookingPageSource, /duesseldorfContent=\{<CoreServicesGrid region="duesseldorf" \/>\}/);
  assert.match(bookingQueryRegionGateSource, /useSearchParams/);
  assert.match(bookingQueryRegionGateSource, /looksLikeDuesseldorf\(queryRegion\)/);
});

test("Entrümpelung offer-check link stays in the Regensburg journey", () => {
  assert.match(
    specialtyPageLayoutSource,
    /serviceName === "Entrümpelung"\) return "\/blog\/entsorgungsangebot-pruefen-regensburg"/,
  );
  assert.doesNotMatch(
    specialtyPageLayoutSource,
    /entsorgungsangebot-pruefen-regensburg-duesseldorf/,
  );
});

test("global local bridges and moving pages preserve the regional service split", () => {
  const bridgeTargetFunctionStart = growthServiceLandingSource.indexOf("function getLocalBridgeTargets");
  const movingStart = growthServiceLandingSource.indexOf(
    'if (config.kind === "moving")',
    bridgeTargetFunctionStart,
  );
  const movingEnd = growthServiceLandingSource.indexOf('if (config.kind === "clearance")', movingStart);
  const movingBlock = growthServiceLandingSource.slice(movingStart, movingEnd);

  assert.match(movingBlock, /showDuesseldorf: false/);
  assert.match(localServiceBridgeSource, /duesseldorfText = "Reinigung/);
  assert.doesNotMatch(localServiceBridgeSource, /duesseldorfText = "[^"]*(?:Umzug|Entrümpelung|Räumung)/);
  assert.match(specialMovingSource, /showDuesseldorf=\{false\}/);
  assert.doesNotMatch(specialMovingSource, /areaServed:\s*\[[^\]]*Düsseldorf/);

  const professionalStart = professionalCopySource.indexOf('title: "Düsseldorf:');
  const professionalEnd = professionalCopySource.indexOf("  },", professionalStart);
  const professionalBlock = professionalCopySource.slice(professionalStart, professionalEnd);
  assert.match(professionalBlock, /Reinigung/);
  assert.doesNotMatch(professionalBlock, /Umzug|Entrümpelung|Räumung/);
});

test("homepage metadata and service schema separate Düsseldorf from Regensburg", () => {
  assert.match(homepageSource, /Reinigung Düsseldorf · Umzug & Räumung Regensburg/);
  assert.match(homepageSource, /name: "FLOXANT Reinigung Düsseldorf"/);
  assert.match(homepageSource, /serviceType: "Reinigung",\s*areaServed: \["Düsseldorf"\]/);
  assert.match(homepageSource, /name: "FLOXANT Umzug, Transport, Räumung und Reinigung Regensburg"/);
  assert.match(homepageSource, /areaServed: \["Regensburg"\]/);
  assert.doesNotMatch(homepageSource, /serviceType: "Umzug, Reinigung und Entrümpelung",\s*areaServed: \["Düsseldorf", "Regensburg"\]/);
});

test("quality gate knows the canonical coverage redirects and all generated blog sources", () => {
  assert.match(qualityGateSource, /"content", "dominance-articles\.ts"/);
  assert.match(qualityGateSource, /\["\/einsatzgebiet-regensburg-200km", "\/region-regensburg"\]/);
  assert.match(qualityGateSource, /\["\/service-area-bayern", "\/region-regensburg"\]/);
  assert.match(qualityGateSource, /\["\/entsorgung-duesseldorf", "\/duesseldorf\/reinigung"\]/);
  assert.match(qualityGateSource, /\["\/duesseldorf\/entsorgung", "\/duesseldorf\/reinigung"\]/);
});

test("discreet and express journeys do not advertise Düsseldorf moving or clearance", () => {
  const duesseldorfLocalCardStart = discreetServiceSource.indexOf(
    'title: "Düsseldorf Reinigung diskret starten"',
  );
  const duesseldorfLocalCardEnd = discreetServiceSource.indexOf("  },", duesseldorfLocalCardStart);
  const duesseldorfLocalCard = discreetServiceSource.slice(
    duesseldorfLocalCardStart,
    duesseldorfLocalCardEnd,
  );

  assert.match(duesseldorfLocalCard, /service=reinigung/);
  assert.doesNotMatch(duesseldorfLocalCard, /Entrümpelung|Haushaltsauflösung|Umzug/);
  assert.match(expressRequestSource, /initialRegion="regensburg-bayern"/);
  assert.doesNotMatch(expressRequestSource, /eilige Fälle in Düsseldorf und Regensburg/);
  assert.doesNotMatch(expressRequestSource, /(?:Umzug|Umzüge|Räumung|Räumungen)[^"\n]{0,120}Düsseldorf/);
});

test("shared FAQs keep Duesseldorf and Regensburg copy separated", () => {
  const duesseldorfStart = faqSource.indexOf("export const duesseldorfFaqItems");
  const duesseldorfEnd = faqSource.indexOf("export const regensburgFaqItems", duesseldorfStart);
  const duesseldorfFaqBlock = faqSource.slice(duesseldorfStart, duesseldorfEnd);

  assert.match(duesseldorfFaqBlock, /Duesseldorf/);
  assert.doesNotMatch(duesseldorfFaqBlock, /Regensburg/);
  assert.doesNotMatch(faqSource, /Fairpreis-Check|Rueckfahrt-Radar|PV-Sichtklar-Service|Mini-Umzug/);
});

test("MANUAL_REVIEW products stay outside every public registry projection", () => {
  assert.match(sourceOfTruthSource, /nonPublishedSourceServiceKeys/);
  assert.match(sourceOfTruthSource, /publishedServiceRoutingMatrix\.map/);
  assert.match(offerCheckBlogSource, /nonPublishedOfferCheckBlogSlugs/);
  assert.match(serviceClusterGridSource, /nonPublishedServiceKeys/);
  assert.match(serviceClusterGridSource, /service\[key\] === "available" \|\| service\[key\] === "limited"/);
});

test("client search index contains no retired service names or routes", () => {
  assert.doesNotMatch(
    publicSearchIndexSource,
    /uebergabe-sprint|übergabe-sprint|solarreinigung|pv-anlagen-reinigung|solar panel cleaning|mini-umzug|express-umzug|fairpreis-check|rueckfahrt-radar|rückfahrt-radar|vermieter-ready|buero-startklar|büro-startklar|pv-sichtklar/i,
  );
});

test("public lead service options contain only published services", () => {
  const optionsStart = leadIntentsSource.indexOf("export const leadServiceOptions");
  const optionsEnd = leadIntentsSource.indexOf("];", optionsStart);
  const publicOptions = leadIntentsSource.slice(optionsStart, optionsEnd);

  assert.doesNotMatch(publicOptions, /solarreinigung|pv-anlagen-reinigung|mini-umzug|express-umzug/);
});

test("reachable coverage claims use the verified 75-km model", () => {
  assert.match(publicCoverageClaimsSource, /75 km/);
  assert.doesNotMatch(publicCoverageClaimsSource, /(?:150|200)\s+km/i);
  assert.doesNotMatch(publicCoverageClaimsSource, /Baden-Württemberg/i);
  assert.doesNotMatch(publicCoverageClaimsSource, /areaServed:\s*\[[^\]]*["']Bayern["']/i);
});

test("reachable special-service copy excludes unverified Solar and PV offers", () => {
  assert.doesNotMatch(publicSpecialServiceCopySource, /\bSolar\w*|\bPV\b|PV[-/]/i);
});

console.log(`Region integrity tests: PASS (${checks.length} checks)`);
for (const name of checks) console.log(`PASS ${name}`);
