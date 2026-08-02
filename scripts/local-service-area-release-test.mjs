import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import ts from "typescript";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const serviceAreaData = JSON.parse(read("data/service-areas/service-areas.json"));
const results = [];

function loadTypeScriptModule(relativePath, requireModule = () => ({})) {
  const source = read(relativePath);
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      resolveJsonModule: true,
    },
    fileName: relativePath,
  }).outputText;
  const runtimeModule = { exports: {} };
  const execute = new Function("require", "module", "exports", output);
  execute(requireModule, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

async function test(name, check) {
  try {
    await check();
    results.push({ name, status: "PASS" });
  } catch (error) {
    results.push({ name, status: "FAIL", error });
  }
}

function assertSameSet(actual, expected, message) {
  assert.deepEqual([...new Set(actual)].sort(), [...new Set(expected)].sort(), message);
}

function extractBlock(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  assert.notEqual(start, -1, `Missing source marker: ${startMarker}`);
  const end = source.indexOf(endMarker, start);
  assert.notEqual(end, -1, `Missing source marker after ${startMarker}: ${endMarker}`);
  return source.slice(start, end + endMarker.length);
}

function haversineKm(origin, destination, earthRadiusKm) {
  const radians = (degrees) => (degrees * Math.PI) / 180;
  const latitudeDelta = radians(destination.latitude - origin.latitude);
  const longitudeDelta = radians(destination.longitude - origin.longitude);
  const originLatitude = radians(origin.latitude);
  const destinationLatitude = radians(destination.latitude);
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(originLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function listEmittableCodeFiles(directory) {
  const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
  const files = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listEmittableCodeFiles(absolutePath));
    if (entry.isFile() && extensions.has(path.extname(entry.name))) files.push(absolutePath);
  }

  return files;
}

const serviceAreasModule = loadTypeScriptModule("lib/service-areas.ts", (specifier) => {
  if (specifier === "@/data/service-areas/service-areas.json") return serviceAreaData;
  throw new Error(`Unexpected import in lib/service-areas.ts: ${specifier}`);
});
const sitemapModule = loadTypeScriptModule("lib/sitemap-routes.ts");
const companyModule = loadTypeScriptModule("lib/company.ts");
const locationsModule = loadTypeScriptModule("lib/floxant-locations.ts", (specifier) => {
  if (specifier === "@/lib/company") return companyModule;
  throw new Error(`Unexpected import in lib/floxant-locations.ts: ${specifier}`);
});

const canonicalCoveragePaths = {
  duesseldorf: "/duesseldorf/einsatzgebiet",
  regensburg: "/region-regensburg",
};
const legacyCoveragePaths = [
  "/einsatzradar-regensburg",
  "/einsatzgebiet-regensburg-200km",
  "/service-area-bayern",
];
const duesseldorfCleaningServices = [
  "reinigung",
  "bueroreinigung",
  "gewerbereinigung",
  "praxisreinigung",
  "fensterreinigung",
  "grundreinigung",
  "unterhaltsreinigung",
  "treppenhausreinigung",
  "baureinigung",
];
const regensburgPrimaryServices = [
  "umzug",
  "moebeltransport",
  "klaviertransport",
  "beiladung-rueckfahrt",
  "entruempelung",
  "haushaltsaufloesung",
  "wohnungsaufloesung",
  "nachlassaufloesung",
];

await test("canonical coverage routes exist and are in the sitemap exactly once", () => {
  const configs = serviceAreasModule.serviceAreaPageConfigs;
  assert.equal(configs.duesseldorf.path, canonicalCoveragePaths.duesseldorf);
  assert.equal(configs.regensburg.path, canonicalCoveragePaths.regensburg);
  assert.ok(fs.existsSync(path.join(root, "app", "duesseldorf", "einsatzgebiet", "page.tsx")));
  assert.ok(fs.existsSync(path.join(root, "app", "region-regensburg", "page.tsx")));

  for (const [regionId, route] of Object.entries(canonicalCoveragePaths)) {
    assert.equal(
      sitemapModule.sitemapRoutes.filter((candidate) => candidate === route).length,
      1,
      `${route} must occur exactly once in the sitemap route set`,
    );
    const pageSource = read(
      regionId === "duesseldorf"
        ? "app/duesseldorf/einsatzgebiet/page.tsx"
        : "app/region-regensburg/page.tsx",
    );
    assert.match(pageSource, new RegExp(`serviceAreaPageConfigs\\.${regionId}`));
    assert.match(pageSource, /path: config\.path/);
  }
});

await test("Düsseldorf exposes cleaning services only", () => {
  const region = serviceAreaData.regions.duesseldorf;
  const config = serviceAreasModule.serviceAreaPageConfigs.duesseldorf;
  assertSameSet(region.availableServices, duesseldorfCleaningServices, "Unexpected Düsseldorf service registry");
  assert.equal(config.primaryServiceId, "reinigung");
  assert.ok(config.serviceLinks.length > 0);
  assert.ok(
    config.serviceLinks.every((service) => duesseldorfCleaningServices.includes(service.id)),
    "Düsseldorf coverage links must contain cleaning services only",
  );
  for (const place of region.places) {
    assertSameSet(
      place.availableServices,
      duesseldorfCleaningServices,
      `${place.name} has a non-cleaning Düsseldorf service`,
    );
  }
});

await test("Regensburg keeps moving, transport and clearance primary and cleaning separate", () => {
  const region = serviceAreaData.regions.regensburg;
  const config = serviceAreasModule.serviceAreaPageConfigs.regensburg;
  assertSameSet(
    region.availableServices,
    [...regensburgPrimaryServices, "reinigung"],
    "Unexpected Regensburg service registry",
  );
  assert.equal(config.primaryServiceId, "umzug");
  assert.equal(config.primaryServiceHref, "/regensburg/umzug");
  const cleaningLink = config.serviceLinks.find((service) => service.id === "reinigung");
  assert.ok(cleaningLink, "Regensburg cleaning must remain an active addition");
  assert.match(`${cleaningLink.label} ${cleaningLink.description}`, /ergänzend|zusatzleistung/i);
  assert.match(cleaningLink.description, /getrennt/i);
  assert.ok(config.serviceLinks.some((service) => service.id === "moebeltransport"));
  assert.ok(config.serviceLinks.some((service) => service.id === "entruempelung"));

  const location = locationsModule.floxantLocations.regensburg;
  assert.ok(location.primaryServices.includes("Umzug"));
  assert.ok(location.primaryServices.includes("Möbeltransport"));
  assert.ok(location.primaryServices.includes("Entrümpelung"));
  assert.ok(!location.primaryServices.includes("Reinigung"));
  assert.ok(location.secondaryServices.includes("Reinigung"));
});

await test("75-km BKG data and the existing health contract are exact", () => {
  const methodology = serviceAreaData.methodology;
  assert.equal(methodology.coverageRadiusKm, 75);
  assert.equal(methodology.borderReviewRadiusKm, 80);
  assert.equal(methodology.earthRadiusKm, 6371.0088);
  assert.match(methodology.distance, /Haversine-Luftlinie/);
  assert.equal(methodology.municipalitySource, "BKG VG250 Gemeindepunkte, Stand 01.01.2025");
  assert.match(methodology.municipalitySourceUrl, /^https:\/\/gdz\.bkg\.bund\.de\//);
  assert.equal(methodology.license, "© BKG 2026 dl-de/by-2-0 (Daten verändert)");
  assert.equal(methodology.licenseUrl, "https://www.govdata.de/dl-de/by-2-0");
  assert.equal(methodology.attributionUrl, "https://www.bkg.bund.de");
  assert.match(methodology.dataSourcesUrl, /datenquellen_vg_nuts\.pdf$/);

  for (const [regionId, region] of Object.entries(serviceAreaData.regions)) {
    assert.equal(region.radiusKm, 75);
    assert.match(region.center.source, /OpenStreetMap Nominatim/);
    const ids = new Set();
    const slugs = new Set();
    const municipalityKeys = new Set();

    for (const place of [...region.places, ...region.excludedBorderCases]) {
      assert.equal(place.region, regionId);
      assert.ok(Number.isFinite(place.latitude) && Number.isFinite(place.longitude));
      assert.equal(place.source, "BKG VG250 Gemeindepunkte (WFS), Stand 01.01.2025");
      assert.equal(place.sourceUrl, methodology.municipalitySourceUrl);
      assert.equal(place.verificationStatus, "verified-official");
      assert.equal(place.lastVerifiedAt, "2026-08-02");
      assert.ok(!ids.has(place.id), `Duplicate id ${place.id}`);
      assert.ok(!slugs.has(place.slug), `Duplicate slug ${place.slug}`);
      assert.ok(!municipalityKeys.has(place.municipalityKey), `Duplicate municipality ${place.municipalityKey}`);
      ids.add(place.id);
      slugs.add(place.slug);
      municipalityKeys.add(place.municipalityKey);

      const calculated = Number(
        haversineKm(
          region.center,
          { latitude: place.latitude, longitude: place.longitude },
          methodology.earthRadiusKm,
        ).toFixed(2),
      );
      assert.equal(place.distanceKm, calculated, `${place.name} has an incorrect stored distance`);
    }

    assert.ok(region.places.every((place) => place.distanceKm <= 75));
    assert.ok(
      region.excludedBorderCases.every(
        (place) => place.distanceKm > 75 && place.distanceKm <= methodology.borderReviewRadiusKm,
      ),
    );
  }

  const health = spawnSync(process.execPath, [path.join(root, "scripts", "service-area-health.mjs")], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(
    health.status,
    0,
    `service-area-health.mjs failed:\n${health.stdout || ""}${health.stderr || ""}`,
  );
  assert.match(health.stdout, /Service-area health: PASS/);
});

await test("runtime service-area helpers preserve the JSON contract", () => {
  for (const regionId of Object.keys(canonicalCoveragePaths)) {
    const rawRegion = serviceAreaData.regions[regionId];
    const searchPlaces = serviceAreasModule.getServiceAreaSearchPlaces(regionId);
    const counts = serviceAreasModule.getServiceAreaCounts(regionId);
    assert.equal(searchPlaces.length, rawRegion.places.length);
    assert.ok(searchPlaces.every((place) => Number.isFinite(place.distanceKm)));
    assert.ok(searchPlaces.every((place) => place.distanceKm <= 75));
    assert.equal(counts.covered, rawRegion.places.length);
    assert.equal(counts.hubs, 1);
    assert.equal(counts.dedicatedPages, 0);
    assert.equal(
      counts.coverageOnly,
      rawRegion.places.filter((place) => place.pageStatus === "coverage-only").length,
    );
  }
});

await test("legacy radar and 200-km routes redirect, noindex and stay out of the sitemap", () => {
  const redirectLines = read("public/_redirects")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split(/\s+/));
  const redirects = new Map(redirectLines.map(([source, target, status]) => [source, { target, status }]));
  const seoSource = read("lib/seo.ts");
  const noindexBlock = extractBlock(seoSource, "const REDIRECTED_NOINDEX_ROUTES", "]);");
  const canonicalBlock = extractBlock(seoSource, "const LEGACY_CANONICAL_PATHS", "};");
  const sitemapXmlSource = read("lib/sitemap-xml.ts");
  const legacySitemapBlock = extractBlock(sitemapXmlSource, "const LEGACY_REDIRECT_ROUTES", "]);");

  for (const route of legacyCoveragePaths) {
    assert.equal(redirects.get(route)?.status, "308", `${route} needs a static redirect`);
    assert.ok(redirects.get(route)?.target, `${route} needs a redirect target`);
    assert.match(noindexBlock, new RegExp(`"${route}"`));
    assert.match(canonicalBlock, new RegExp(`"${route}"\\s*:`));
    assert.match(legacySitemapBlock, new RegExp(`"${route.slice(1)}"`));
    assert.ok(!sitemapModule.sitemapRoutes.includes(route), `${route} must not be in sitemapRoutes`);
  }
});

await test("emittable app, components and lib code contains no FAQPage type", () => {
  const forbiddenToken = ["FAQ", "Page"].join("");
  const matches = [];
  for (const directory of ["app", "components", "lib"]) {
    for (const absolutePath of listEmittableCodeFiles(path.join(root, directory))) {
      if (fs.readFileSync(absolutePath, "utf8").includes(forbiddenToken)) {
        matches.push(path.relative(root, absolutePath));
      }
    }
  }
  assert.deepEqual(matches, []);
});

await test("Düsseldorf and Regensburg use the verified real addresses and coordinates", () => {
  const expected = {
    duesseldorf: {
      address: "Breite Straße 22, 40213 Düsseldorf",
      latitude: 51.2225767,
      longitude: 6.7772364,
    },
    regensburg: {
      address: "Johanna-Kinkel-Straße 1 + 2, 93049 Regensburg",
      latitude: 49.0130057,
      longitude: 12.074602,
    },
  };

  for (const regionId of Object.keys(expected)) {
    const center = serviceAreaData.regions[regionId].center;
    assert.deepEqual(
      { address: center.address, latitude: center.latitude, longitude: center.longitude },
      expected[regionId],
    );
    assert.match(center.sourceUrl, /^https:\/\/nominatim\.openstreetmap\.org\//);
  }

  assert.equal(companyModule.duesseldorfCompany.streetAddress, "Breite Str. 22");
  assert.equal(companyModule.duesseldorfCompany.postalCode, "40213");
  assert.equal(companyModule.duesseldorfCompany.city, "Düsseldorf");
  assert.deepEqual(companyModule.duesseldorfCompany.geo, {
    lat: expected.duesseldorf.latitude,
    lng: expected.duesseldorf.longitude,
  });
  assert.equal(companyModule.company.streetAddress, "Johanna-Kinkel-Straße 1 + 2");
  assert.equal(companyModule.company.postalCode, "93049");
  assert.equal(companyModule.company.city, "Regensburg");
  assert.deepEqual(companyModule.company.geo, {
    lat: expected.regensburg.latitude,
    lng: expected.regensburg.longitude,
  });

  for (const regionId of Object.keys(expected)) {
    const location = locationsModule.floxantLocations[regionId];
    const sourceCompany = regionId === "duesseldorf" ? companyModule.duesseldorfCompany : companyModule.company;
    assert.equal(location.city, sourceCompany.city);
    assert.equal(location.postalCode, sourceCompany.postalCode);
    assert.equal(location.addressLine1, sourceCompany.streetAddress);
    assert.deepEqual(location.geo, sourceCompany.geo);
    assert.equal(location.serviceAreaPage, canonicalCoveragePaths[regionId]);
    assert.equal(location.dataStatus.address, "confirmed_from_code");
  }
});

await test("the municipality dataset creates no automatically indexable landing pages", () => {
  for (const [regionId, region] of Object.entries(serviceAreaData.regions)) {
    const hubs = region.places.filter((place) => place.pageStatus === "hub");
    const coverageOnly = region.places.filter((place) => place.pageStatus === "coverage-only");
    assert.equal(hubs.length, 1, `${regionId} needs exactly one regional hub record`);
    assert.equal(hubs[0].indexable, true);
    assert.equal(coverageOnly.length, region.places.length - 1);
    assert.ok(coverageOnly.every((place) => place.indexable === false));
    assert.ok(region.places.every((place) => place.pageStatus !== "dedicated-page"));
    assert.ok(region.excludedBorderCases.every((place) => place.indexable === false));
    assert.ok(region.excludedBorderCases.every((place) => place.pageStatus === "excluded"));

    for (const place of region.places) {
      assert.ok(
        !sitemapModule.sitemapRoutes.includes(`/${place.slug}`),
        `Municipality slug ${place.slug} must not become an indexable route`,
      );
    }
  }
});

const failures = results.filter((result) => result.status === "FAIL");
for (const result of results) {
  const stream = result.status === "PASS" ? console.log : console.error;
  stream(`${result.status} ${result.name}`);
  if (result.error) console.error(result.error.stack || result.error.message || result.error);
}

if (failures.length > 0) {
  console.error(`Local service-area release tests: FAIL (${failures.length}/${results.length} failed)`);
  process.exit(1);
}

console.log(`Local service-area release tests: PASS (${results.length} checks)`);
