import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const EARTH_RADIUS_KM = 6371.0088;
const COVERAGE_RADIUS_KM = 75;
const REVIEW_RADIUS_KM = 80;
const VERIFIED_AT = "2026-08-02";
const BKG_WFS_URL = "https://sgx.geodatenzentrum.de/wfs_vg250";
const BKG_PRODUCT_URL =
  "https://gdz.bkg.bund.de/index.php/default/open-data/wfs-verwaltungsgebiete-1-250-000-stand-01-01-wfs-vg250.html";

const regionDefinitions = {
  duesseldorf: {
    label: "Düsseldorf",
    center: {
      latitude: 51.2225767,
      longitude: 6.7772364,
      address: "Breite Straße 22, 40213 Düsseldorf",
      source: "OpenStreetMap Nominatim, OSM node 8804334133",
      sourceUrl:
        "https://nominatim.openstreetmap.org/ui/search.html?q=Breite+Stra%C3%9Fe+22%2C+40213+D%C3%BCsseldorf%2C+Deutschland",
      verificationNote: "Exakter Hauspunkt der im Projekt geführten Düsseldorfer Adresse.",
    },
    hubMunicipalityId: "05111000",
    availableServices: [
      "reinigung",
      "bueroreinigung",
      "gewerbereinigung",
      "praxisreinigung",
      "fensterreinigung",
      "grundreinigung",
      "unterhaltsreinigung",
      "treppenhausreinigung",
      "baureinigung",
    ],
  },
  regensburg: {
    label: "Regensburg",
    center: {
      latitude: 49.0130057,
      longitude: 12.074602,
      address: "Johanna-Kinkel-Straße 1 + 2, 93049 Regensburg",
      source:
        "OpenStreetMap Nominatim, Mittelpunkt der OSM-Hauspunkte 12658114029 und 12658114030",
      sourceUrl:
        "https://nominatim.openstreetmap.org/ui/search.html?q=Johanna-Kinkel-Stra%C3%9Fe+1+%2B+2%2C+93049+Regensburg%2C+Deutschland",
      verificationNote:
        "Rechnerischer Mittelpunkt der beiden Hauspunkte 1 und 2 der im Projekt geführten Adresse.",
    },
    hubMunicipalityId: "09362000",
    availableServices: [
      "umzug",
      "moebeltransport",
      "klaviertransport",
      "beiladung-rueckfahrt",
      "entruempelung",
      "haushaltsaufloesung",
      "wohnungsaufloesung",
      "nachlassaufloesung",
      "reinigung",
    ],
  },
};

const stateNames = {
  BY: "Bayern",
  HE: "Hessen",
  NI: "Niedersachsen",
  NW: "Nordrhein-Westfalen",
  RP: "Rheinland-Pfalz",
  SL: "Saarland",
  TH: "Thüringen",
};

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function haversineKm(from, to) {
  const latitudeDelta = toRadians(to.latitude - from.latitude);
  const longitudeDelta = toRadians(to.longitude - from.longitude);
  const fromLatitude = toRadians(from.latitude);
  const toLatitude = toRadians(to.latitude);
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(fromLatitude) *
      Math.cos(toLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;

  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function directionFor(from, to) {
  const fromLatitude = toRadians(from.latitude);
  const toLatitude = toRadians(to.latitude);
  const longitudeDelta = toRadians(to.longitude - from.longitude);
  const y = Math.sin(longitudeDelta) * Math.cos(toLatitude);
  const x =
    Math.cos(fromLatitude) * Math.sin(toLatitude) -
    Math.sin(fromLatitude) * Math.cos(toLatitude) * Math.cos(longitudeDelta);
  const bearing = (Math.atan2(y, x) * 180) / Math.PI;
  const normalized = (bearing + 360) % 360;
  const directions = [
    "nord",
    "nordost",
    "ost",
    "suedost",
    "sued",
    "suedwest",
    "west",
    "nordwest",
  ];

  return directions[Math.round(normalized / 45) % directions.length];
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function boundingBox(center, radiusKm) {
  const latitudeDelta = radiusKm / 111.32;
  const longitudeDelta = radiusKm / (111.32 * Math.cos(toRadians(center.latitude)));

  return [
    center.longitude - longitudeDelta,
    center.latitude - latitudeDelta,
    center.longitude + longitudeDelta,
    center.latitude + latitudeDelta,
  ];
}

async function fetchMunicipalityPoints(center) {
  const params = new URLSearchParams({
    service: "WFS",
    version: "2.0.0",
    request: "GetFeature",
    typeNames: "vg250:vg250_pk",
    outputFormat: "application/json",
    srsName: "EPSG:4326",
    count: "250000",
    BBOX: `${boundingBox(center, REVIEW_RADIUS_KM).join(",")},EPSG:4326`,
  });
  const response = await fetch(`${BKG_WFS_URL}?${params}`, {
    headers: {
      "User-Agent": "FLOXANT service-area verification (info@floxant.de)",
    },
  });

  if (!response.ok) {
    throw new Error(`BKG WFS request failed with HTTP ${response.status}.`);
  }

  const data = await response.json();
  if (!Array.isArray(data.features)) {
    throw new Error("BKG WFS response does not contain a feature list.");
  }

  return data.features;
}

function toEntry(feature, regionId, definition) {
  const properties = feature.properties ?? {};
  const latitude = Number(properties.lat_dez ?? feature.geometry?.coordinates?.[1]);
  const longitude = Number(properties.lon_dez ?? feature.geometry?.coordinates?.[0]);
  const distance = haversineKm(definition.center, { latitude, longitude });
  const isIncluded = distance <= COVERAGE_RADIUS_KM;
  const isHub = properties.ags === definition.hubMunicipalityId;

  return {
    id: `${regionId}-${properties.ags}`,
    name: properties.gen,
    slug: `${slugify(properties.gen)}-${properties.ags}`,
    region: regionId,
    bundesland: stateNames[properties.lkz] ?? properties.lkz,
    municipalityKey: properties.ags,
    municipalityType: properties.bez,
    latitude,
    longitude,
    distanceKm: Number(distance.toFixed(2)),
    direction: directionFor(definition.center, { latitude, longitude }),
    availableServices: definition.availableServices,
    pageStatus: isIncluded ? (isHub ? "hub" : "coverage-only") : "excluded",
    indexable: isHub,
    source: "BKG VG250 Gemeindepunkte (WFS), Stand 01.01.2025",
    sourceUrl: BKG_PRODUCT_URL,
    verificationStatus: "verified-official",
    lastVerifiedAt: VERIFIED_AT,
    notes:
      distance >= 72
        ? "Randbereich: Luftlinie des amtlichen Gemeindekernpunkts liegt nahe der 75-km-Grenze. Konkreten Auftrag immer einzeln prüfen."
        : "Amtlicher Gemeindekernpunkt rechnerisch geprüft.",
  };
}

async function buildRegion(regionId, definition) {
  const features = await fetchMunicipalityPoints(definition.center);
  const entries = features
    .filter((feature) => ["Gemeinde", "Stadt"].includes(feature.properties?.bez))
    .map((feature) => toEntry(feature, regionId, definition))
    .filter((entry) => entry.distanceKm <= REVIEW_RADIUS_KM)
    .sort((left, right) => left.distanceKm - right.distanceKm || left.name.localeCompare(right.name, "de"));

  const places = entries.filter((entry) => entry.pageStatus !== "excluded");
  const excludedBorderCases = entries.filter((entry) => entry.pageStatus === "excluded");

  if (!places.some((entry) => entry.pageStatus === "hub")) {
    throw new Error(`No hub municipality found for ${regionId}.`);
  }

  return {
    id: regionId,
    label: definition.label,
    radiusKm: COVERAGE_RADIUS_KM,
    center: definition.center,
    availableServices: definition.availableServices,
    places,
    excludedBorderCases,
  };
}

const regions = {};
for (const [regionId, definition] of Object.entries(regionDefinitions)) {
  regions[regionId] = await buildRegion(regionId, definition);
}

const output = {
  schemaVersion: 1,
  generatedAt: `${VERIFIED_AT}T00:00:00.000Z`,
  methodology: {
    distance: "Haversine-Luftlinie zwischen realem Standortzentrum und amtlichem Gemeindekernpunkt",
    earthRadiusKm: EARTH_RADIUS_KM,
    coverageRadiusKm: COVERAGE_RADIUS_KM,
    borderReviewRadiusKm: REVIEW_RADIUS_KM,
    municipalitySource: "BKG VG250 Gemeindepunkte, Stand 01.01.2025",
    municipalitySourceUrl: BKG_PRODUCT_URL,
    license: "© BKG 2026 dl-de/by-2-0 (Daten verändert)",
    licenseUrl: "https://www.govdata.de/dl-de/by-2-0",
    attributionUrl: "https://www.bkg.bund.de",
    dataSourcesUrl:
      "https://sgx.geodatenzentrum.de/web_public/gdz/datenquellen/datenquellen_vg_nuts.pdf",
    caveat:
      "Die Luftlinie ist keine Fahrzeit- oder Verfügbarkeitszusage. Jeder Auftrag wird anhand von Leistung, Strecke, Zugang, Umfang, Termin und Kapazität persönlich geprüft.",
  },
  regions,
};

const outputDirectory = path.join(process.cwd(), "data", "service-areas");
await mkdir(outputDirectory, { recursive: true });
await writeFile(
  path.join(outputDirectory, "service-areas.json"),
  `${JSON.stringify(output, null, 2)}\n`,
  "utf8",
);

for (const region of Object.values(regions)) {
  console.log(
    `${region.label}: ${region.places.length} verifizierte Gemeinden, ${region.excludedBorderCases.length} ausgeschlossene Grenzfälle (75–80 km).`,
  );
}
