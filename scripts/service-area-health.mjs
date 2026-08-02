import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const data = JSON.parse(
  await readFile(path.join(process.cwd(), "data", "service-areas", "service-areas.json"), "utf8"),
);

const expectedRegions = new Set(["duesseldorf", "regensburg"]);
const disallowedByRegion = {
  duesseldorf: new Set([
    "umzug",
    "moebeltransport",
    "klaviertransport",
    "beiladung-rueckfahrt",
    "entruempelung",
    "haushaltsaufloesung",
    "wohnungsaufloesung",
    "nachlassaufloesung",
  ]),
  regensburg: new Set(),
};

assert.equal(data.methodology.coverageRadiusKm, 75);
assert.equal(data.methodology.borderReviewRadiusKm, 80);
assert.deepEqual(new Set(Object.keys(data.regions)), expectedRegions);

for (const [regionId, region] of Object.entries(data.regions)) {
  assert.equal(region.id, regionId);
  assert.equal(region.radiusKm, 75);
  assert.ok(region.center.latitude && region.center.longitude, `${regionId} needs a verified center.`);
  assert.match(region.center.source, /OpenStreetMap Nominatim/);
  assert.ok(region.places.length > 0, `${regionId} needs covered municipalities.`);
  assert.equal(region.places.filter((place) => place.pageStatus === "hub").length, 1);

  const ids = new Set();
  const slugs = new Set();
  for (const place of region.places) {
    assert.equal(place.region, regionId);
    assert.ok(place.distanceKm <= 75, `${place.name} exceeds 75 km.`);
    assert.notEqual(place.pageStatus, "dedicated-page", "No municipality page may be generated automatically.");
    assert.equal(place.verificationStatus, "verified-official");
    assert.equal(place.lastVerifiedAt, "2026-08-02");
    assert.ok(!ids.has(place.id), `Duplicate id ${place.id}.`);
    assert.ok(!slugs.has(place.slug), `Duplicate slug ${place.slug}.`);
    ids.add(place.id);
    slugs.add(place.slug);

    for (const service of place.availableServices) {
      assert.ok(
        !disallowedByRegion[regionId].has(service),
        `${service} is not allowed in ${regionId}.`,
      );
    }
  }

  for (const place of region.excludedBorderCases) {
    assert.equal(place.region, regionId);
    assert.ok(place.distanceKm > 75 && place.distanceKm <= 80);
    assert.equal(place.pageStatus, "excluded");
    assert.equal(place.indexable, false);
  }
}

console.log(
  `Service-area health: PASS (${Object.values(data.regions)
    .map((region) => `${region.label} ${region.places.length}`)
    .join(", ")}; radius 75 km).`,
);
