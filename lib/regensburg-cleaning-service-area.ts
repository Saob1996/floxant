import regensburgCleaningAreaData from "@/data/serviceAreas/regensburgCleaning.json";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type CleaningPlaceInput = {
  slug?: string;
  name?: string;
  coordinates?: Coordinates;
};

export const regensburgCleaningServiceArea = regensburgCleaningAreaData;

export const cleaningServiceAreaName = regensburgCleaningAreaData.serviceAreaName;
export const cleaningServiceAreaRadiusKm = regensburgCleaningAreaData.radiusKm;
export const regensburgCleaningCenter = regensburgCleaningAreaData.center;
export const regensburgCleaningAreaLabel = "Regensburg und Umgebung bis 50 km";

const umlautMap: Record<string, string> = {
  ä: "ae",
  ö: "oe",
  ü: "ue",
  ß: "ss",
};

export function normalizeCleaningPlaceKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[äöüß]/g, (char) => umlautMap[char] || char)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " und ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const aliasEntries = Object.entries(regensburgCleaningAreaData.aliases).flatMap(([canonical, aliases]) => [
  [normalizeCleaningPlaceKey(canonical), normalizeCleaningPlaceKey(canonical)] as const,
  ...aliases.map((alias) => [normalizeCleaningPlaceKey(alias), normalizeCleaningPlaceKey(canonical)] as const),
]);

const canonicalPlaceKeys = new Set(
  [
    "Regensburg",
    ...regensburgCleaningAreaData.allowedCitiesAndMunicipalities,
    ...regensburgCleaningAreaData.regensburgDistricts,
    ...regensburgCleaningAreaData.regensburgSubdistricts,
    ...regensburgCleaningAreaData.localVillagesAndHamlets,
  ].map(normalizeCleaningPlaceKey),
);

const aliasToCanonicalPlaceKey = new Map(aliasEntries);
const cityCoordinateEntries = Object.entries(regensburgCleaningAreaData.cityCoordinates).map(([key, coordinates]) => [
  normalizeCleaningPlaceKey(key),
  coordinates,
] as const);
const cityCoordinatesByKey = new Map<string, Coordinates>(cityCoordinateEntries);
const genericRegensburgCleaningRouteSlugs = new Set([
  "reinigung",
  "gewerbereinigung",
  "notfallreinigung-24h",
  "reinigung-nach-veranstaltung",
  "reinigungsfirma-angebot",
  "reinigung-preis-rechner",
  "reinigungsgarantie",
  "spezialreinigung",
  "solarreinigung",
  "pv-anlagen-reinigung",
  "clean-start",
]);

function canonicalizePlaceKey(value: string): string {
  const key = normalizeCleaningPlaceKey(value);
  return aliasToCanonicalPlaceKey.get(key) || key;
}

export function distanceToRegensburgKm(coordinates: Coordinates): number {
  const earthRadiusKm = 6371;
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const centerLat = toRadians(regensburgCleaningAreaData.center.latitude);
  const centerLon = toRadians(regensburgCleaningAreaData.center.longitude);
  const targetLat = toRadians(coordinates.latitude);
  const targetLon = toRadians(coordinates.longitude);
  const latDelta = targetLat - centerLat;
  const lonDelta = targetLon - centerLon;
  const a =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(centerLat) * Math.cos(targetLat) * Math.sin(lonDelta / 2) ** 2;

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(a));
}

export function isWithinRegensburgCleaningRadius(coordinates: Coordinates): boolean {
  return distanceToRegensburgKm(coordinates) <= regensburgCleaningAreaData.radiusKm;
}

export function isCleaningPlaceAllowed(input: CleaningPlaceInput): boolean {
  const possibleKeys = [input.slug, input.name].filter(Boolean).map((value) => canonicalizePlaceKey(String(value)));

  for (const key of possibleKeys) {
    const coordinates = cityCoordinatesByKey.get(key);
    if (coordinates) return isWithinRegensburgCleaningRadius(coordinates);
    if (canonicalPlaceKeys.has(key)) return true;
  }

  if (input.coordinates) {
    return isWithinRegensburgCleaningRadius(input.coordinates);
  }

  return false;
}

export function isCleaningRoutePath(path: string): boolean {
  const normalizedPath = path.toLowerCase().replace(/^\/+|\/+$/g, "");
  const segments = normalizedPath.split("/");

  return (
    normalizedPath === "reinigung" ||
    normalizedPath.includes("cleaning") ||
    normalizedPath.includes("cleaner") ||
    normalizedPath.includes("facility-cleaning") ||
    segments.some((segment) =>
      [
        "reinigung",
        "reinigungsfirma",
        "reinigungsdienst",
        "putzfirma",
        "gebaeudereinigung",
        "bueroreinigung",
        "praxisreinigung",
        "treppenhausreinigung",
        "grundreinigung",
        "glasreinigung",
        "fensterreinigung",
        "baureinigung",
        "bauendreinigung",
        "sonderreinigung",
        "gewerbereinigung",
        "privatreinigung",
        "unterhaltsreinigung",
        "wohnungsreinigung",
        "haushaltsreinigung",
        "hotelreinigung",
        "kanzleireinigung",
        "objektreinigung",
        "teppichreinigung",
        "solarreinigung",
        "pv-anlagen-reinigung",
        "endreinigung",
        "uebergabereinigung",
      ].some((term) => segment === term || segment.includes(term)),
    )
  );
}

export function extractCleaningPlaceSlugFromRoute(path: string): string | null {
  const normalizedPath = path.toLowerCase().replace(/^\/+|\/+$/g, "");

  if (normalizedPath.startsWith("reinigung-")) return normalizedPath.replace(/^reinigung-/, "");
  if (normalizedPath.endsWith("-reinigung")) return normalizedPath.replace(/-reinigung$/, "");
  if (normalizedPath.startsWith("en/")) {
    const parts = normalizedPath.split("/");
    if (parts.length >= 3 && (parts[2].includes("cleaning") || parts[2].includes("quote-review"))) {
      return parts[1];
    }
  }

  const parts = normalizedPath.split("/");
  if (parts[0] === "regensburg") return "regensburg";
  if (parts.length >= 2 && isCleaningRoutePath(parts.slice(1).join("/"))) return parts[0];

  return null;
}

export function isCleaningRouteAllowed(path: string): boolean {
  if (!isCleaningRoutePath(path)) return true;

  const normalizedPath = path.replace(/^\/+|\/+$/g, "").toLowerCase();
  if (normalizedPath.startsWith("blog/")) {
    return (
      normalizedPath.includes("regensburg") ||
      normalizedPath.includes("50-km") ||
      normalizedPath.includes("50km")
    );
  }

  const placeSlug = extractCleaningPlaceSlugFromRoute(path);
  if (!placeSlug) {
    return genericRegensburgCleaningRouteSlugs.has(normalizedPath);
  }

  return isCleaningPlaceAllowed({ slug: placeSlug });
}

export function getCleaningAreaKeywords(limit?: number): readonly string[] {
  const keywords = [
    ...regensburgCleaningAreaData.localSeoKeywords,
    ...regensburgCleaningAreaData.regensburgDistricts.map((district) => `Reinigung ${district}`),
    ...regensburgCleaningAreaData.allowedCitiesAndMunicipalities.map((city) => `Reinigung ${city}`),
  ];

  return typeof limit === "number" ? keywords.slice(0, limit) : keywords;
}

export function getVisibleCleaningAreaPlaces() {
  return {
    districts: regensburgCleaningAreaData.regensburgDistricts,
    subdistricts: regensburgCleaningAreaData.regensburgSubdistricts,
    municipalities: regensburgCleaningAreaData.allowedCitiesAndMunicipalities,
    villagesAndHamlets: regensburgCleaningAreaData.localVillagesAndHamlets,
  };
}

export function buildRegensburgCleaningAreaServedJsonLd() {
  return [
    {
      "@type": "City",
      name: "Regensburg",
    },
    {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: regensburgCleaningAreaData.center.latitude,
        longitude: regensburgCleaningAreaData.center.longitude,
      },
      geoRadius: `${regensburgCleaningAreaData.radiusKm} km`,
    },
    ...regensburgCleaningAreaData.regensburgDistricts.map((name) => ({ "@type": "Place", name })),
    ...regensburgCleaningAreaData.allowedCitiesAndMunicipalities.map((name) => ({ "@type": "Place", name })),
  ];
}
