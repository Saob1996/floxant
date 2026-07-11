import type { LocalSeoLink, LocalSeoRegionKey, LocalSeoServiceKey } from "./types";

const regensburgCleaningLinks: LocalSeoLink[] = [
  { href: "/regensburg/reinigung", label: "Reinigung Regensburg", text: "Zentraler Einstieg fuer Reinigungsanfragen." },
  { href: "/regensburg/bueroreinigung", label: "Bueroreinigung Regensburg", text: "Fuer Buero, Praxis und Objekt." },
  { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg", text: "Fuer gewerbliche Flaechen." },
  { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg", text: "Fuer Praxisraeume nach Objektangaben." },
  { href: "/treppenhausreinigung-regensburg", label: "Treppenhausreinigung Regensburg", text: "Fuer Hausverwaltung und WEG." },
  { href: "/angebot-vergleichen-regensburg", label: "Reinigungsangebot pruefen", text: "Bestehendes Angebot sachlich einordnen." },
];

const regensburgServiceLinks: LocalSeoLink[] = [
  { href: "/regensburg", label: "Regensburg-Hub", text: "Lokaler Einstieg fuer Regensburg." },
  { href: "/region-regensburg", label: "Region Regensburg", text: "Regensburg und Umgebung bis 50 km fuer Reinigung." },
  { href: "/regensburg/umzug", label: "Umzug Regensburg", text: "Umzug getrennt von Reinigung einordnen." },
  { href: "/regensburg/entruempelung", label: "Entruempelung Regensburg", text: "Raeumung und Entsorgung separat klaeren." },
  { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsaufloesung Regensburg", text: "Aufloesung, Restmengen und Uebergabe planen." },
  { href: "/angebot-pruefen", label: "Allgemeine Angebotsprüfung", text: "Wenn erst die Angebotslogik geklaert werden soll." },
];

export function getRegionalHubLinks(_region: LocalSeoRegionKey): LocalSeoLink[] {
  return [...regensburgServiceLinks, ...regensburgCleaningLinks];
}

export function getServiceInternalLinks(_region: LocalSeoRegionKey, serviceKey: LocalSeoServiceKey): LocalSeoLink[] {
  if (serviceKey === "angebot-vergleichen") {
    return [
      { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
      { href: "/regensburg/bueroreinigung", label: "Bueroreinigung Regensburg" },
      { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
      { href: "/region-regensburg", label: "Region Regensburg" },
    ];
  }

  return serviceKey.includes("reinigung") || serviceKey === "putzfirma" || serviceKey === "gebaeudereinigung"
    ? regensburgCleaningLinks
    : regensburgServiceLinks;
}
