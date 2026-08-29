import regensburgCleaning from "@/data/serviceAreas/regensburgCleaning.json";

export type ServiceHub = "duesseldorf" | "regensburg";
export type AreaKind = "hub" | "city" | "district" | "municipality";
export type ServiceRing = 1 | 2 | 3 | "outside";
export type PublicationDecision = "existing-page" | "registry-only" | "noindex-candidate";

export interface AreaCoordinates {
  latitude: number;
  longitude: number;
}

export interface OpportunityScore {
  gscEvidence: number;
  competition: number;
  economics: number;
  authorityFit: number;
  distance: number;
  total: number;
}

export interface ServiceAreaRecord {
  slug: string;
  name: string;
  hub: ServiceHub;
  kind: AreaKind;
  coordinates: AreaCoordinates | null;
  coordinatesNote: string;
  distanceKm: number | null;
  ring: ServiceRing;
  services: readonly string[];
  postcodes: readonly string[];
  score: OpportunityScore;
  publication: PublicationDecision;
  evidence: readonly string[];
  localNotes: readonly string[];
  priceFactors: readonly string[];
  faqSeeds: readonly string[];
  existingUrls: readonly string[];
  sourceUrls: readonly string[];
}

const HUBS: Record<ServiceHub, AreaCoordinates> = {
  duesseldorf: { latitude: 51.2277, longitude: 6.7735 },
  regensburg: { latitude: 49.01343, longitude: 12.10162 },
};

const SERVICES = {
  duesseldorf: ["reinigung", "bueroreinigung", "praxisreinigung", "grundreinigung"],
  regensburg: ["reinigung", "umzug", "entruempelung", "haushaltsaufloesung"],
} as const;

const SOURCES = {
  duesseldorfDistricts: "https://www.duesseldorf.de/bv/",
  regensburgDistricts: "https://www.regensburg.de/leben/regensburger-stadtteile",
  regensburgMunicipalities:
    "https://www.landkreis-regensburg.de/Unser-Landkreis/St%C3%A4dte-M%C3%A4rkte-Gemeinden/",
} as const;

const DUESSSELDORF_DISTRICTS = [
  "Altstadt",
  "Carlstadt",
  "Stadtmitte",
  "Pempelfort",
  "Derendorf",
  "Golzheim",
  "Flingern-Nord",
  "Flingern-Süd",
  "Düsseltal",
  "Oberbilk",
  "Unterbilk",
  "Bilk",
  "Friedrichstadt",
  "Hafen",
  "Hamm",
  "Flehe",
  "Volmerswerth",
  "Oberkassel",
  "Heerdt",
  "Lörick",
  "Niederkassel",
  "Stockum",
  "Lohausen",
  "Kaiserswerth",
  "Wittlaer",
  "Kalkum",
  "Angermund",
  "Lichtenbroich",
  "Unterrath",
  "Rath",
  "Mörsenbroich",
  "Gerresheim",
  "Grafenberg",
  "Ludenberg",
  "Hubbelrath",
  "Knittkuhl",
  "Eller",
  "Lierenfeld",
  "Vennhausen",
  "Unterbach",
  "Wersten",
  "Holthausen",
  "Reisholz",
  "Benrath",
  "Urdenbach",
  "Hassels",
  "Itter",
  "Himmelgeist",
  "Garath",
  "Hellerhof",
] as const;

const DUESSSELDORF_CITY_CANDIDATES = [
  ["Ratingen", 51.2972, 6.8493, ["40878"], 13, 74],
  ["Meerbusch", 51.2616, 6.676, ["40667"], 13, 70],
  ["Neuss", 51.1981, 6.6916, ["41460"], 13, 72],
  ["Erkrath", 51.222, 6.914, ["40699"], 12, 69],
  ["Kaarst", 51.2249, 6.6177, ["41564"], 11, 66],
  ["Mettmann", 51.2504, 6.9754, ["40822"], 11, 68],
  ["Haan", 51.1932, 7.0133, ["42781"], 10, 64],
  ["Monheim am Rhein", 51.0913, 6.8922, ["40789"], 10, 63],
  ["Heiligenhaus", 51.3268, 6.9717, ["42579"], 9, 61],
  ["Korschenbroich", 51.1919, 6.5135, ["41352"], 9, 59],
  ["Willich", 51.2639, 6.5472, ["47877"], 9, 60],
  ["Krefeld", 51.3388, 6.5853, ["47798"], 9, 62],
  ["Duisburg", 51.4344, 6.7623, ["47051"], 8, 58],
  ["Essen", 51.4556, 7.0116, ["45127"], 8, 56],
  ["Wuppertal", 51.2562, 7.1508, ["42103"], 8, 58],
  ["Solingen", 51.1652, 7.0671, ["42651"], 8, 57],
  ["Leverkusen", 51.0341, 6.9878, ["51373"], 7, 53],
  ["Köln", 50.9375, 6.9603, ["50667"], 7, 51],
  ["Mönchengladbach", 51.1805, 6.4428, ["41061"], 7, 52],
] as const;

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function distanceKm(from: AreaCoordinates, to: AreaCoordinates) {
  const earthRadiusKm = 6371;
  const radians = (value: number) => (value * Math.PI) / 180;
  const dLat = radians(to.latitude - from.latitude);
  const dLng = radians(to.longitude - from.longitude);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radians(from.latitude)) *
      Math.cos(radians(to.latitude)) *
      Math.sin(dLng / 2) ** 2;
  return Math.round(earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
}

export function getServiceRing(distance: number): ServiceRing {
  if (distance <= 20) return 1;
  if (distance <= 45) return 2;
  if (distance <= 75) return 3;
  return "outside";
}

function buildScore(total: number, distancePoints: number): OpportunityScore {
  const remaining = Math.max(0, total - distancePoints);
  const gscEvidence = Math.min(25, Math.round(remaining * 0.25));
  const competition = Math.min(15, Math.round(remaining * 0.2));
  const economics = Math.min(20, Math.round(remaining * 0.25));
  const authorityFit = Math.min(20, remaining - gscEvidence - competition - economics);
  return { gscEvidence, competition, economics, authorityFit, distance: distancePoints, total };
}

function distancePointsFor(ring: ServiceRing) {
  if (ring === 1) return 20;
  if (ring === 2) return 14;
  if (ring === 3) return 8;
  return 0;
}

const duesseldorfDistrictRecords: ServiceAreaRecord[] = DUESSSELDORF_DISTRICTS.map((name) => ({
  slug: `duesseldorf-${slugify(name)}`,
  name,
  hub: "duesseldorf",
  kind: "district",
  coordinates: null,
  coordinatesNote:
    "Amtlicher Stadtteil; kein verifizierter Mittelpunkt im Projekt. Ring 1 folgt aus der Zugehörigkeit zum Stadtgebiet, nicht aus einer erfundenen Luftlinie.",
  distanceKm: null,
  ring: 1,
  services: SERVICES.duesseldorf,
  postcodes: [],
  score: buildScore(47, 20),
  publication: "registry-only",
  evidence: ["Amtlicher Düsseldorfer Stadtteil", "Keine GSC-Abfrage-zu-URL-Zuordnung vorhanden"],
  localNotes: ["Objektart, Zufahrt, Parken und Einsatzfenster vor Angebot prüfen"],
  priceFactors: ["Fläche", "Turnus", "Zugang", "Verschmutzungsgrad", "Einsatzzeit"],
  faqSeeds: ["Ist eine Besichtigung erforderlich?", "Welche Angaben werden für ein Angebot benötigt?"],
  existingUrls: ["/duesseldorf/reinigung"],
  sourceUrls: [SOURCES.duesseldorfDistricts],
}));

const duesseldorfCityRecords: ServiceAreaRecord[] = DUESSSELDORF_CITY_CANDIDATES.map(
  ([name, latitude, longitude, postcodes, authorityFitSeed, totalSeed]) => {
    const coordinates = { latitude, longitude };
    const calculatedDistance = distanceKm(HUBS.duesseldorf, coordinates);
    const ring = getServiceRing(calculatedDistance);
    const total = ring === "outside" ? Math.min(totalSeed, 49) : totalSeed;
    const score = buildScore(total, distancePointsFor(ring));
    score.authorityFit = Math.min(20, authorityFitSeed);
    score.total = score.gscEvidence + score.competition + score.economics + score.authorityFit + score.distance;

    return {
      slug: slugify(name),
      name,
      hub: "duesseldorf",
      kind: "city",
      coordinates,
      coordinatesNote: "Stadtmittelpunkt für Luftlinien-Vorprüfung; Fahrstrecke separat operativ prüfen.",
      distanceKm: calculatedDistance,
      ring,
      services: SERVICES.duesseldorf,
      postcodes,
      score,
      publication: score.total >= 70 ? "noindex-candidate" : "registry-only",
      evidence: ["Markt-/Umfeldkandidat", "Keine GSC-Abfrage-zu-URL-Zuordnung vorhanden"],
      localNotes: ["Umland-Einsatz nur nach Entfernung, Leistung und Machbarkeit bestätigen"],
      priceFactors: ["Anfahrt", "Fläche", "Turnus", "Zugang", "Einsatzzeit"],
      faqSeeds: ["Fällt eine Anfahrtspauschale an?", "Welche Reinigungsarten sind verfügbar?"],
      existingUrls: ["/duesseldorf/reinigung"],
      sourceUrls: [],
    } satisfies ServiceAreaRecord;
  },
);

type CoordinateRow = { latitude: number; longitude: number };
const regensburgCoordinates = regensburgCleaning.cityCoordinates as Record<string, CoordinateRow>;

const regensburgMunicipalityRecords: ServiceAreaRecord[] = regensburgCleaning.allowedCitiesAndMunicipalities.map(
  (name) => {
    const coordinates = regensburgCoordinates[slugify(name)] ?? null;
    const calculatedDistance = coordinates ? distanceKm(HUBS.regensburg, coordinates) : null;
    const ring = calculatedDistance === null ? "outside" : getServiceRing(calculatedDistance);
    const isHub = name === "Regensburg";
    const baseTotal = isHub ? 90 : ring === 1 ? 64 : ring === 2 ? 55 : ring === 3 ? 46 : 30;
    const score = buildScore(baseTotal, distancePointsFor(ring));

    return {
      slug: slugify(name),
      name,
      hub: "regensburg",
      kind: isHub ? "hub" : "municipality",
      coordinates,
      coordinatesNote: coordinates
        ? "Kommunenmittelpunkt aus dem bestehenden FLOXANT-Servicegebiet; Fahrstrecke separat prüfen."
        : "Keine belastbare Koordinate im bestehenden Datensatz; keine Radius- oder Seitenfreigabe.",
      distanceKm: calculatedDistance,
      ring,
      services: SERVICES.regensburg,
      postcodes: [],
      score,
      publication: isHub ? "existing-page" : "registry-only",
      evidence: isHub
        ? ["GSC-Nachfrage auf bestehenden Regensburg-Leistungsseiten", "Bestehender operativer Hub"]
        : ["Bestehender Servicegebietsdatensatz", "Keine GSC-Abfrage-zu-URL-Zuordnung vorhanden"],
      localNotes: ["Leistungsabhängigen Einsatzradius und Fahrstrecke vor Zusage prüfen"],
      priceFactors: ["Anfahrt", "Leistung", "Umfang", "Zugang", "Termin"],
      faqSeeds: ["Liegt der Ort im Einsatzgebiet?", "Welche Angaben werden für die Machbarkeitsprüfung benötigt?"],
      existingUrls: isHub
        ? ["/regensburg/reinigung", "/regensburg/umzug", "/regensburg/entruempelung"]
        : ["/regensburg"],
      sourceUrls: [SOURCES.regensburgMunicipalities],
    } satisfies ServiceAreaRecord;
  },
);

const regensburgDistrictRecords: ServiceAreaRecord[] = regensburgCleaning.regensburgDistricts.map(
  (name) => ({
    slug: `regensburg-${slugify(name)}`,
    name,
    hub: "regensburg",
    kind: "district",
    coordinates: null,
    coordinatesNote:
      "Amtlicher Stadtbezirk; kein verifizierter Mittelpunkt im Projekt. Ring 1 folgt aus der Zugehörigkeit zum Stadtgebiet.",
    distanceKm: null,
    ring: 1,
    services: SERVICES.regensburg,
    postcodes: [],
    score: buildScore(50, 20),
    publication: "registry-only",
    evidence: ["Amtlicher Regensburger Stadtbezirk", "Keine GSC-Abfrage-zu-URL-Zuordnung vorhanden"],
    localNotes: ["Zugang, Etage, Parken und Objektumfang vor Angebot prüfen"],
    priceFactors: ["Leistung", "Umfang", "Zugang", "Etage", "Termin"],
    faqSeeds: ["Wie wird der Aufwand eingeschätzt?", "Können Fotos für die Vorprüfung gesendet werden?"],
    existingUrls: ["/regensburg"],
    sourceUrls: [SOURCES.regensburgDistricts],
  }),
);

export const SERVICE_AREA_REGISTRY: readonly ServiceAreaRecord[] = [
  ...duesseldorfDistrictRecords,
  ...duesseldorfCityRecords,
  ...regensburgMunicipalityRecords,
  ...regensburgDistrictRecords,
];

export const REGISTRY_RELEASE_RULES = {
  minimumScoreForReview: 70,
  requirements: [
    "eindeutiger lokaler Suchintent oder GSC-Nachweis",
    "eigenständige lokale Fakten und keine bloße Ortsnamen-Ersetzung",
    "passender operativer Ring und bestätigte Leistung",
    "eigener Mehrwert bei Preisfaktoren, Ablauf, FAQ und internen Links",
    "keine Kannibalisierung einer bestehenden kanonischen Leistungsseite",
  ],
} as const;

export function getRegistryRecord(slug: string) {
  return SERVICE_AREA_REGISTRY.find((record) => record.slug === slug);
}

export function getQualifiedAreaCandidates() {
  return SERVICE_AREA_REGISTRY.filter(
    (record) =>
      record.score.total >= REGISTRY_RELEASE_RULES.minimumScoreForReview &&
      record.ring !== "outside" &&
      record.publication !== "registry-only",
  );
}
