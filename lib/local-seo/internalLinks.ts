import type { LocalSeoLink, LocalSeoRegionKey, LocalSeoServiceKey } from "./types";

const regensburgCleaningLinks: LocalSeoLink[] = [
  { href: "/regensburg/reinigung", label: "Reinigung Regensburg", text: "Zentraler Einstieg für Reinigungsanfragen." },
  { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg", text: "Für Büro, Praxis und Objekt." },
  { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg", text: "Für gewerbliche Flächen." },
  { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg", text: "Für Praxisräume nach Objektangaben." },
  { href: "/treppenhausreinigung-regensburg", label: "Treppenhausreinigung Regensburg", text: "Für Hausverwaltung und WEG." },
  { href: "/angebot-vergleichen-regensburg", label: "Reinigungsangebot prüfen", text: "Bestehendes Angebot sachlich einordnen." },
];

const regensburgServiceLinks: LocalSeoLink[] = [
  { href: "/regensburg", label: "Regensburg-Hub", text: "Lokaler Einstieg für Regensburg." },
  { href: "/region-regensburg", label: "Region Regensburg", text: "Verifiziertes Regensburger Einsatzgebiet bis 75 km für Reinigung." },
  { href: "/regensburg/umzug", label: "Umzug Regensburg", text: "Umzug getrennt von Reinigung einordnen." },
  { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg", text: "Räumung und Entsorgung separat klären." },
  { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsauflösung Regensburg", text: "Auflösung, Restmengen und Übergabe planen." },
  { href: "/angebot-pruefen", label: "Allgemeine Angebotsprüfung", text: "Wenn erst die Angebotslogik geklärt werden soll." },
];

const duesseldorfCleaningLinks: LocalSeoLink[] = [
  { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf", text: "Zentraler Einstieg für Reinigungsanfragen." },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf", text: "Für Büros, Kanzleien und Arbeitsplätze." },
  { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung Düsseldorf", text: "Für gewerbliche Flächen und Objekte." },
  { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung Düsseldorf", text: "Für Praxisräume nach Objektangaben." },
  { href: "/duesseldorf/fensterreinigung", label: "Fensterreinigung Düsseldorf", text: "Für Glasflächen, Rahmen und Zugangsprüfung." },
  { href: "/angebot-vergleichen-duesseldorf", label: "Reinigungsangebot prüfen", text: "Bestehendes Düsseldorfer Angebot sachlich einordnen." },
];

const duesseldorfServiceLinks: LocalSeoLink[] = [
  { href: "/duesseldorf", label: "Düsseldorf-Hub", text: "Lokaler Einstieg für Düsseldorf." },
  { href: "/duesseldorf/einsatzgebiet", label: "Einsatzgebiet Düsseldorf", text: "Verifizierte Orte im Düsseldorfer Servicegebiet prüfen." },
  { href: "/duesseldorf/reinigung/anfrage", label: "Reinigung Düsseldorf anfragen", text: "Objekt, Umfang, Fotos und Termin übermitteln." },
];

const cleaningLinksByRegion: Record<LocalSeoRegionKey, readonly LocalSeoLink[]> = {
  regensburg: regensburgCleaningLinks,
  duesseldorf: duesseldorfCleaningLinks,
};

const serviceLinksByRegion: Record<LocalSeoRegionKey, readonly LocalSeoLink[]> = {
  regensburg: regensburgServiceLinks,
  duesseldorf: duesseldorfServiceLinks,
};

const offerLinksByRegion: Record<LocalSeoRegionKey, readonly LocalSeoLink[]> = {
  regensburg: [
    { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
    { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
    { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
    { href: "/region-regensburg", label: "Region Regensburg" },
  ],
  duesseldorf: [
    { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf" },
    { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
    { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung Düsseldorf" },
    { href: "/duesseldorf", label: "Düsseldorf-Hub" },
  ],
};

export function getRegionalHubLinks(region: LocalSeoRegionKey): LocalSeoLink[] {
  return [...serviceLinksByRegion[region], ...cleaningLinksByRegion[region]];
}

export function getServiceInternalLinks(region: LocalSeoRegionKey, serviceKey: LocalSeoServiceKey): LocalSeoLink[] {
  if (serviceKey === "angebot-vergleichen") {
    return [...offerLinksByRegion[region]];
  }

  return serviceKey.includes("reinigung") || serviceKey === "putzfirma" || serviceKey === "gebaeudereinigung"
    ? [...cleaningLinksByRegion[region]]
    : [...serviceLinksByRegion[region]];
}
