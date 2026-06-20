import type { LocalSeoLanguageAlternate } from "./types";

type HreflangPair = {
  de: string;
  en: string;
};

export const localSeoHreflangPairs = [
  { de: "/duesseldorf/reinigung", en: "/en/duesseldorf/cleaning" },
  { de: "/duesseldorf/reinigungsfirma", en: "/en/duesseldorf/cleaning" },
  { de: "/duesseldorf/bueroreinigung", en: "/en/duesseldorf/office-cleaning" },
  { de: "/duesseldorf/gewerbereinigung", en: "/en/duesseldorf/office-cleaning" },
  { de: "/duesseldorf/gewerbeflaechen-reinigung", en: "/en/duesseldorf/office-cleaning" },
  { de: "/duesseldorf/wohnungsreinigung", en: "/en/duesseldorf/apartment-cleaning" },
  { de: "/duesseldorf/grundreinigung", en: "/en/duesseldorf/deep-cleaning" },
  { de: "/duesseldorf/treppenhausreinigung", en: "/en/duesseldorf/stairwell-cleaning" },
  { de: "/duesseldorf/geruchsneutralisation", en: "/en/duesseldorf/odor-removal" },
  { de: "/duesseldorf/angebot-vergleichen", en: "/en/duesseldorf/cleaning-quote-review" },
  { de: "/angebot-vergleichen-duesseldorf", en: "/en/duesseldorf/cleaning-quote-review" },
  { de: "/koeln/reinigung", en: "/en/koeln/cleaning" },
  { de: "/neuss/reinigung", en: "/en/neuss/cleaning" },
  { de: "/meerbusch/reinigung", en: "/en/meerbusch/cleaning" },
  { de: "/duisburg/reinigung", en: "/en/duisburg/cleaning" },
  { de: "/regensburg/umzug", en: "/en/regensburg/moving" },
  { de: "/regensburg/umzugsservice", en: "/en/regensburg/moving" },
  { de: "/regensburg/umzugsunternehmen", en: "/en/regensburg/moving-company" },
  { de: "/regensburg/umzug-kosten", en: "/en/regensburg/moving-costs" },
  { de: "/regensburg/wohnungsaufloesung", en: "/en/regensburg/house-clearance" },
  { de: "/regensburg/entruempelung", en: "/en/regensburg/apartment-clearance" },
  { de: "/regensburg/reinigung-nach-umzug", en: "/en/regensburg/cleaning-after-moving" },
  { de: "/regensburg/reinigungsfirma", en: "/en/regensburg/cleaning-after-moving" },
  { de: "/regensburg/angebot-vergleichen", en: "/en/regensburg/moving-quote-review" },
  { de: "/angebot-vergleichen-regensburg", en: "/en/regensburg/moving-quote-review" },
] as const satisfies readonly HreflangPair[];

const pairByPath = new Map<string, HreflangPair>();

for (const pair of localSeoHreflangPairs) {
  pairByPath.set(pair.de, pair);
  pairByPath.set(pair.en, pair);
}

export function getLanguageAlternatesForPath(path: string): readonly LocalSeoLanguageAlternate[] {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const pair = pairByPath.get(normalizedPath);

  if (!pair) {
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
