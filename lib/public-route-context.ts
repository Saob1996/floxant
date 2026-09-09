import type { FloxantLocationKey } from "@/lib/floxant-locations";

// Route names supply service/location context only; user-entered query values are never copied.
export function getPublicRouteContext(pathname: string) {
  const path = pathname.toLowerCase();
  const isEnglish = path === "/en" || path.startsWith("/en/");
  const hasDuesseldorf = /duesseldorf|dusseldorf|düsseldorf|(?:\/|-)(?:neuss|ratingen|meerbusch|mettmann|duisburg|hilden|erkrath|krefeld)(?:[/-]|$)/.test(path);
  const hasRegensburg = /regensburg|(?:\/|-)(?:neutraubling|lappersdorf|pentling|obertraubling|regenstauf|kelheim|schwandorf|straubing|bad-abbach)(?:[/-]|$)/.test(path);
  const location: FloxantLocationKey | undefined = hasDuesseldorf && !hasRegensburg
    ? "duesseldorf" : hasRegensburg && !hasDuesseldorf ? "regensburg" : undefined;
  const serviceRules = [
    [/bueroreinigung|office-cleaning/, "bueroreinigung"],
    [/praxisreinigung|practice-cleaning/, "praxisreinigung"],
    [/fensterreinigung|glasreinigung|window-cleaning/, "fensterreinigung"],
    [/grundreinigung|deep-cleaning/, "grundreinigung"],
    [/unterhaltsreinigung|maintenance-cleaning/, "unterhaltsreinigung"],
    [/treppenhausreinigung|stairwell-cleaning/, "treppenhausreinigung"],
    [/endreinigung|end-of-tenancy|final-cleaning/, "endreinigung"],
    [/gewerbereinigung|commercial-cleaning/, "gewerbereinigung"],
    [/hotelreinigung|hotel-cleaning|housekeeping/, "hotelreinigung"],
    [/reinigung|cleaning/, "reinigung"],
    [/entruempelung|entrümpelung|house-clearance|clearance|wohnungsaufloesung|haushaltsaufloesung/, "entruempelung"],
    [/umzug|moving|relocation/, "umzug"],
  ] as const;
  const service = serviceRules.find(([pattern]) => pattern.test(path))?.[1];
  // These Düsseldorf pages describe the existing general-cleaning offer.
  const generalCleaning = location === "duesseldorf" && (service === "endreinigung" || service === "hotelreinigung");
  return { location, service: generalCleaning ? "reinigung" : service, intent: generalCleaning ? `${service}-duesseldorf` : undefined, isEnglish };
}
