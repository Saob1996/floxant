export const LOCAL_SERVICE_RADIUS_KM = 75;

// Existing city reference points from lib/local-seo/service-area-registry.ts.
// These define the straight-line service radius, not a geocoded business address.
export const SERVICE_AREA_CENTRES = {
  duesseldorf: { latitude: 51.2277, longitude: 6.7735 },
  regensburg: { latitude: 49.01343, longitude: 12.10162 },
} as const;

export function calculateAirDistanceKm(
  from: { latitude: number; longitude: number },
  to: { latitude: number; longitude: number },
) {
  const radians = (value: number) => value * Math.PI / 180;
  const latitudeDelta = radians(to.latitude - from.latitude);
  const longitudeDelta = radians(to.longitude - from.longitude);
  const a = Math.sin(latitudeDelta / 2) ** 2 + Math.cos(radians(from.latitude)) * Math.cos(radians(to.latitude)) * Math.sin(longitudeDelta / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
