const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

function loadPureTypescript(relativePath) {
  const filename = path.resolve(relativePath);
  const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = module.paths;
  loaded._compile(compiled.outputText, filename);
  return loaded.exports;
}

const { BAVARIAN_CITIES_GEO } = loadPureTypescript("lib/geo-data.ts");
const { LOCAL_SERVICE_RADIUS_KM, SERVICE_AREA_CENTRES, calculateAirDistanceKm } = loadPureTypescript("lib/service-area-policy.ts");
const resolvedPlaceInputPath = "data/serviceAreas/resolvedLegacyPlaces.json";
const resolvedPlaceInput = JSON.parse(fs.readFileSync(resolvedPlaceInputPath, "utf8"));
const minimumAdditionalDistanceKm = LOCAL_SERVICE_RADIUS_KM + 1;
if (resolvedPlaceInput.minimumOutsideDistanceKm !== minimumAdditionalDistanceKm) throw new Error("Additional GeoNames places require a one-kilometre review margin");
const resolvedPlaces = new Map();
const addressReviewPlaces = new Map();
for (const [entries, destination, requiresOutsideMargin] of [
  [resolvedPlaceInput.places, resolvedPlaces, true],
  [resolvedPlaceInput.addressReviewPlaces, addressReviewPlaces, false],
]) {
  for (const entry of entries) {
    if (resolvedPlaces.has(entry.citySlug) || addressReviewPlaces.has(entry.citySlug) || BAVARIAN_CITIES_GEO[entry.citySlug]) throw new Error(`Duplicate or overridden city key: ${entry.citySlug}`);
    if (!Number.isSafeInteger(entry.geonamesId) || entry.countryCode !== "DE" || entry.admin1 !== "02" || entry.featureClass !== "P" || !Number.isFinite(entry.latitude) || !Number.isFinite(entry.longitude) || entry.sourceUrl !== `https://www.geonames.org/${entry.geonamesId}/`) throw new Error(`Invalid sourced GeoNames place: ${entry.citySlug}`);
    const nearestDistance = Math.min(...Object.values(SERVICE_AREA_CENTRES).map(centre => calculateAirDistanceKm(centre, entry)));
    if (requiresOutsideMargin ? nearestDistance <= minimumAdditionalDistanceKm : nearestDistance <= LOCAL_SERVICE_RADIUS_KM || nearestDistance > minimumAdditionalDistanceKm) throw new Error(`Place violates its distance decision: ${entry.citySlug}`);
    destination.set(entry.citySlug, entry);
  }
}
const source = fs.readFileSync("lib/local-seo-routes.ts", "utf8");
const match = source.match(/const unfilteredDynamicLocalSeoRoutes = (\[[\s\S]*?\]) as const/);
if (!match) throw new Error("Dynamic route data could not be read");
const routes = JSON.parse(match[1]);
const routeExceptions = ["/umzug-muenchen", "/umzug-nuernberg", "/fernumzug-muenchen"];
const explicitHardPages = new Set(["entruempelung", "wohnungsaufloesung", "bueroumzug", "seniorenumzug"].flatMap(service => ["muenchen", "nuernberg"].map(city => `/${service}-${city}`)));
const excludedRoutes = [];
const unresolvedCities = new Map();
const checkedCities = new Set();
for (const route of routes) {
  if (routeExceptions.includes(route.route)) continue;
  // Exact keys only: substring lookup could confuse towns and districts.
  const resolvedPlace = resolvedPlaces.get(route.citySlug);
  const city = BAVARIAN_CITIES_GEO[route.citySlug] || (resolvedPlace ? {name:resolvedPlace.name,lat:resolvedPlace.latitude,lng:resolvedPlace.longitude} : undefined);
  if (!city || !Number.isFinite(Number(city.lat)) || !Number.isFinite(Number(city.lng))) {
    const addressReviewPlace = addressReviewPlaces.get(route.citySlug);
    const unresolved = unresolvedCities.get(route.citySlug) || {citySlug:route.citySlug,city:route.city,routes:[],...(addressReviewPlace ? {reason:"75–76 km boundary case; concrete address requires review",geonamesId:addressReviewPlace.geonamesId,sourceUrl:addressReviewPlace.sourceUrl} : {})};
    unresolved.routes.push(route.route);
    unresolvedCities.set(route.citySlug,unresolved);
    continue;
  }
  checkedCities.add(route.citySlug);
  const point = {latitude:Number(city.lat),longitude:Number(city.lng)};
  const distances = Object.fromEntries(Object.entries(SERVICE_AREA_CENTRES).map(([key,centre])=>[key,calculateAirDistanceKm(centre,point)]));
  const requiredDistance = resolvedPlace ? minimumAdditionalDistanceKm : LOCAL_SERVICE_RADIUS_KM;
  if (Object.values(distances).every(distance => distance > requiredDistance)) excludedRoutes.push({path:route.route,citySlug:route.citySlug,city:city.name,service:route.service,serviceLabel:route.label,latitude:point.latitude,longitude:point.longitude,distanceDuesseldorfKm:Number(distances.duesseldorf.toFixed(3)),distanceRegensburgKm:Number(distances.regensburg.toFixed(3)),kind:explicitHardPages.has(route.route)?"explicit-hard-page":"legacy-local-route",coordinateSource:resolvedPlace?resolvedPlaceInputPath:"lib/geo-data.ts",...(resolvedPlace?{geonamesId:resolvedPlace.geonamesId,sourceUrl:resolvedPlace.sourceUrl}:{} )});
}
excludedRoutes.sort((a,b)=>a.path.localeCompare(b.path));
for (const route of explicitHardPages) if (!excludedRoutes.some(entry=>entry.path===route)) throw new Error(`Hard page was not resolved outside the radius: ${route}`);
const result = {schemaVersion:2,generatedOn:"2026-09-09",radiusKm:LOCAL_SERVICE_RADIUS_KM,method:"Haversine, mean earth radius 6371 km; unrounded distances; exact citySlug match; additional GeoNames records require >76 km from both centres",coordinateSource:"lib/geo-data.ts and sourced data/serviceAreas/resolvedLegacyPlaces.json; no fuzzy matches or inferred coordinates",additionalPlaceMinimumDistanceKm:minimumAdditionalDistanceKm,addressReviewCities:[...addressReviewPlaces.values()].map(entry=>({citySlug:entry.citySlug,city:entry.name,geonamesId:entry.geonamesId,sourceUrl:entry.sourceUrl,latitude:entry.latitude,longitude:entry.longitude,distanceDuesseldorfKm:calculateAirDistanceKm(SERVICE_AREA_CENTRES.duesseldorf,entry),distanceRegensburgKm:calculateAirDistanceKm(SERVICE_AREA_CENTRES.regensburg,entry),decision:"No automatic exclusion; review the concrete address"})),centreSource:"lib/service-area-policy.ts SERVICE_AREA_CENTRES",centres:SERVICE_AREA_CENTRES,routeExceptions,excludedRoutes,unresolvedCities:[...unresolvedCities.values()].sort((a,b)=>a.citySlug.localeCompare(b.citySlug)),checkedCityCount:checkedCities.size};
fs.writeFileSync("data/local-route-area-policy.json",JSON.stringify(result,null,2)+"\n");
const q = value => `"${String(value).replace(/"/g,'""')}"`;
fs.mkdirSync("reports/seo",{recursive:true});
fs.writeFileSync("reports/seo/outside-radius-decisions.csv","URL,City,Service,Latitude,Longitude,DistanceDuesseldorfKm,DistanceRegensburgKm,Decision,Evidence\n"+excludedRoutes.map(entry=>[entry.path,entry.city,entry.serviceLabel,entry.latitude,entry.longitude,entry.distanceDuesseldorfKm,entry.distanceRegensburgKm,"noindex,follow; service-area notice for generic template or listed hard pages",entry.geonamesId?`GeoNames ${entry.geonamesId}; ${entry.sourceUrl}; CC BY 4.0; exact match; >76km from both centres`:"exact lib/geo-data.ts key; Haversine >75km from both shared centres"].map(q).join(",")).join("\n")+"\n");
console.log(JSON.stringify({excludedRoutes:excludedRoutes.length,checkedCities:checkedCities.size,unresolvedCities:unresolvedCities.size,additionalGeoNamesPlaces:resolvedPlaces.size,addressReviewCities:addressReviewPlaces.size,exceptions:routeExceptions}));
