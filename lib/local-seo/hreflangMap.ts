import type { LocalSeoLanguageAlternate } from "./types";

type HreflangPair = {
  de: string;
  en: string;
};

const allLocalSeoHreflangPairs = [
  { de: "/duesseldorf/reinigung", en: "/en/duesseldorf/cleaning" },
  { de: "/duesseldorf/bueroreinigung", en: "/en/duesseldorf/office-cleaning" },
  { de: "/duesseldorf/gewerbereinigung", en: "/en/duesseldorf/commercial-cleaning" },
  { de: "/duesseldorf/praxisreinigung", en: "/en/duesseldorf/practice-cleaning" },
  { de: "/duesseldorf/fensterreinigung", en: "/en/duesseldorf/window-cleaning" },
  { de: "/angebot-vergleichen-duesseldorf", en: "/en/duesseldorf/cleaning-quote-review" },
  { de: "/regensburg/reinigung", en: "/en/regensburg/cleaning" },
  { de: "/regensburg/bueroreinigung", en: "/en/regensburg/office-cleaning" },
  { de: "/grundreinigung-regensburg", en: "/en/regensburg/deep-cleaning" },
  { de: "/treppenhausreinigung-regensburg", en: "/en/regensburg/stairwell-cleaning" },
  { de: "/regensburg/angebot-vergleichen", en: "/en/regensburg/cleaning-quote-review" },
  { de: "/regensburg/umzug", en: "/en/regensburg/moving" },
  { de: "/regensburg/umzugsunternehmen", en: "/en/regensburg/moving-company" },
  { de: "/regensburg/umzug-kosten", en: "/en/regensburg/moving-costs" },
  { de: "/kleintransport-regensburg", en: "/en/regensburg/transport-service" },
  { de: "/moebeltransport", en: "/en/regensburg/furniture-transport" },
  { de: "/regensburg/wohnungsaufloesung", en: "/en/regensburg/house-clearance" },
  { de: "/regensburg/entruempelung", en: "/en/regensburg/apartment-clearance" },
  { de: "/regensburg/reinigung-nach-umzug", en: "/en/regensburg/cleaning-after-moving" },
  { de: "/angebot-vergleichen-regensburg", en: "/en/regensburg/moving-quote-review" },
] as const satisfies readonly HreflangPair[];

export const localSeoHreflangPairs = allLocalSeoHreflangPairs.filter(
  (pair) =>
    pair.de.includes("regensburg") ||
    pair.de.includes("duesseldorf") ||
    pair.de === "/angebot-vergleichen-regensburg",
) as readonly HreflangPair[];

const pairByPath = new Map<string, HreflangPair>();

for (const pair of localSeoHreflangPairs) {
  pairByPath.set(pair.de, pair);
  pairByPath.set(pair.en, pair);
}

export function getLanguageAlternatesForPath(path: string): readonly LocalSeoLanguageAlternate[] {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const pair = pairByPath.get(normalizedPath);

  if (!pair) {
    if (normalizedPath === "/en" || normalizedPath.startsWith("/en/")) {
      return [
        { hreflang: "en", path: normalizedPath },
        { hreflang: "x-default", path: normalizedPath },
      ];
    }

    return [
      { hreflang: "de-DE", path: normalizedPath },
      { hreflang: "x-default", path: normalizedPath },
    ];
  }

  return [
    { hreflang: "de-DE", path: pair.de },
    { hreflang: "en", path: pair.en },
    { hreflang: "x-default", path: pair.de },
  ];
}

export function getCounterpartPath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const pair = pairByPath.get(normalizedPath);
  if (!pair) return null;
  return normalizedPath === pair.en ? pair.de : pair.en;
}
