import type { LocalSeoLink, LocalSeoRegionKey, LocalSeoServiceKey } from "./types";

const duesseldorfCleaningLinks: LocalSeoLink[] = [
  { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf", text: "Zentraler Einstieg für Düsseldorfer Reinigungsanfragen." },
  { href: "/duesseldorf/grundreinigung", label: "Grundreinigung Düsseldorf", text: "Wenn normale Unterhaltsreinigung nicht reicht." },
  { href: "/duesseldorf/putzfirma", label: "Putzfirma Düsseldorf", text: "Alltagsnaher Einstieg für Wohnung, Büro oder Praxis." },
  { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung Düsseldorf", text: "Für Auszug, Übergabe, Leerstand und Wohnung." },
  { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung Düsseldorf", text: "Für Hauseingang, Hausflur und Hausverwaltung." },
  { href: "/duesseldorf/gebaeudereinigung", label: "Gebäudereinigung Düsseldorf", text: "Für Objekt, Eingang, Gewerbe und Treppenhaus." },
  { href: "/duesseldorf/geruchsneutralisation", label: "Geruchsneutralisation Düsseldorf", text: "Für Nikotin, Tiergeruch oder muffige Räume nach Prüfung." },
  { href: "/duesseldorf/angebot-vergleichen", label: "Angebot prüfen Düsseldorf", text: "Reinigungsangebot sachlich vergleichen lassen." },
];

const regensburgMovingLinks: LocalSeoLink[] = [
  { href: "/regensburg/umzug", label: "Umzug Regensburg", text: "Zentraler Einstieg für Umzug mit Fotos und Eckdaten." },
  { href: "/regensburg/umzugsservice", label: "Umzugsservice Regensburg", text: "Für Planung, Zusatzleistungen und Ablauf." },
  { href: "/regensburg/umzug-kosten", label: "Umzugskosten Regensburg", text: "Kostenfaktoren ohne erfundene Festpreise verstehen." },
  { href: "/regensburg/seniorenumzug", label: "Seniorenumzug Regensburg", text: "Ruhige Abstimmung mit Angehörigen und Übergabe." },
  { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsauflösung Regensburg", text: "Räumung, Entsorgung und Reinigung zusammen sortieren." },
  { href: "/regensburg/reinigung-nach-umzug", label: "Reinigung nach Umzug", text: "Alte Wohnung für Übergabe oder Nachnutzung vorbereiten." },
  { href: "/regensburg/angebot-vergleichen", label: "Angebot prüfen Regensburg", text: "Umzugs-, Reinigungs- oder Räumungsangebot einordnen." },
];

export function getRegionalHubLinks(region: LocalSeoRegionKey): LocalSeoLink[] {
  if (region === "duesseldorf") {
    return [
      { href: "/duesseldorf", label: "Düsseldorf-Hub", text: "Hauptzentrum für Reinigung." },
      { href: "/region-duesseldorf", label: "Region Düsseldorf", text: "Kuratiertes Einsatzgebiet ohne Linkfarm." },
      ...duesseldorfCleaningLinks,
      { href: "/angebot-pruefen", label: "Allgemeine Angebotsprüfung", text: "Wenn erst die Angebotslogik geklärt werden soll." },
    ];
  }

  return [
    { href: "/regensburg", label: "Regensburg-Hub", text: "Hauptzentrum für Umzug und Wohnungsauflösung." },
    { href: "/region-regensburg", label: "Region Regensburg", text: "Kuratiertes Einsatzgebiet rund um Regensburg." },
    ...regensburgMovingLinks,
    { href: "/angebot-pruefen", label: "Allgemeine Angebotsprüfung", text: "Für Reinigung, Umzug, Entrümpelung und Auflösung." },
  ];
}

export function getServiceInternalLinks(region: LocalSeoRegionKey, serviceKey: LocalSeoServiceKey): LocalSeoLink[] {
  if (region === "duesseldorf") {
    if (serviceKey === "angebot-vergleichen") {
      return [
        { href: "/duesseldorf/putzfirma", label: "Putzfirma Düsseldorf" },
        { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung Düsseldorf" },
        { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung Düsseldorf" },
        { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
        { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung Düsseldorf" },
        { href: "/region-duesseldorf", label: "Region Düsseldorf" },
      ];
    }

    return duesseldorfCleaningLinks;
  }

  if (serviceKey === "angebot-vergleichen") {
    return [
      { href: "/regensburg/umzug", label: "Umzug Regensburg" },
      { href: "/regensburg/umzugsunternehmen", label: "Umzugsunternehmen Regensburg" },
      { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
      { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsauflösung Regensburg" },
      { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
      { href: "/region-regensburg", label: "Region Regensburg" },
    ];
  }

  return regensburgMovingLinks;
}
