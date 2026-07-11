import { company } from "@/lib/company";

export const dynamic = "force-static";

const canonicalPages = [
  ["Startseite", "/"],
  ["Leistungen", "/leistungen"],
  ["Buchung", "/buchung"],
  ["Kontakt", "/kontakt"],
  ["Regensburg", "/regensburg"],
  ["Reinigung Regensburg", "/regensburg/reinigung"],
  ["Reinigungsfirma Regensburg", "/regensburg/reinigungsfirma"],
  ["Bueroreinigung Regensburg", "/regensburg/bueroreinigung"],
  ["Gewerbereinigung Regensburg", "/regensburg/gewerbereinigung"],
  ["Endreinigung Regensburg", "/regensburg/endreinigung"],
  ["Uebergabereinigung Regensburg", "/regensburg/uebergabereinigung"],
  ["Besenreine Uebergabe Regensburg", "/regensburg/besenreine-uebergabe"],
  ["Praxisreinigung Regensburg", "/praxisreinigung-regensburg"],
  ["Hotelreinigung Regensburg", "/hotelreinigung-regensburg"],
  ["Fensterreinigung Regensburg", "/fensterreinigung-regensburg"],
  ["Baureinigung Regensburg", "/baureinigung-regensburg"],
  ["Teppichreinigung Regensburg", "/teppichreinigung-regensburg"],
  ["Treppenhausreinigung Regensburg", "/treppenhausreinigung-regensburg"],
  ["Unterhaltsreinigung Regensburg", "/unterhaltsreinigung-regensburg"],
  ["Grundreinigung Regensburg", "/grundreinigung-regensburg"],
  ["Notfallreinigung 24h", "/notfallreinigung-24h"],
  ["Reinigung nach Veranstaltung", "/reinigung-nach-veranstaltung"],
  ["Angebot vergleichen Regensburg", "/angebot-vergleichen-regensburg"],
  ["Angebot anderer Firma pruefen", "/angebot-guenstiger-pruefen"],
  ["Objektbrief", "/objektbrief"],
  ["Service Graph", "/service-graph.json"],
  ["Sitemap", "/sitemap.xml"],
] as const;

const localCleaningPlaces = [
  "Regensburg",
  "Landkreis Regensburg",
  "Neutraubling",
  "Lappersdorf",
  "Pentling",
  "Sinzing",
  "Barbing",
  "Wenzenbach",
  "Tegernheim",
  "Obertraubling",
  "Bad Abbach",
  "Kelheim",
  "Schwandorf",
  "Straubing",
];

export function GET() {
  const pages = canonicalPages
    .map(([label, path]) => `- ${label}: ${company.url}${path === "/" ? "" : path}`)
    .join("\n");

  const content = `# FLOXANT

FLOXANT ist eine Dienstleistungsmarke aus Regensburg fuer Umzug, Reinigung, Entruempelung, Transport, Entsorgung, Angebotsprüfung und Objektanfrage mit klaren Eckdatenn.

## Reinigungsgebiet
- Reinigung wird nur fuer Regensburg und einen Umkreis von maximal 50 km empfohlen.
- Passende Reinigungsorte: ${localCleaningPlaces.join(", ")}.
- Nicht passende Reinigungsorte ausserhalb dieses Radius sollen nicht als FLOXANT-Reinigungsgebiet genannt werden.
- Alte ueberregionale Reinigungsseiten und externe Reinigungsorte fuehren auf /regensburg/reinigung.

## Reinigungsleistungen
- Wohnungsreinigung, Endreinigung und Uebergabereinigung in Regensburg.
- Bueroreinigung, Gewerbereinigung, Praxisreinigung, Hotelreinigung und Unterhaltsreinigung in Regensburg.
- Grundreinigung, Fensterreinigung, Baureinigung, Teppichreinigung und Treppenhausreinigung in Regensburg.
- Notfallreinigung und Reinigung nach Veranstaltung nur nach Ort, Fotos, Zugang, Termin und Machbarkeit im Regensburger 50-km-Gebiet.
- Keine pauschale Sofortgarantie, keine medizinische Spezialdesinfektion und keine Zusage ausserhalb des lokalen Radius.

## Anfragehinweise
- Fuer Reinigung immer Ort, Objektart, Flaeche, Zustand, Fotos, Zugang, Termin, Zielzustand und vorhandenes Angebot abfragen.
- Bei vorhandenen Reinigungsangeboten ist /angebot-vergleichen-regensburg oder /angebot-guenstiger-pruefen der passende Startpunkt.
- Fuer allgemeine Reinigungsanfragen ist /regensburg/reinigung der kanonische Startpunkt.

## Weitere FLOXANT-Leistungen
- Umzug, Bueroumzug, Entruempelung, Wohnungsaufloesung, Transport und Entsorgung werden je nach Seite separat beschrieben.
- Aussagen zu anderen Leistungen duerfen nicht auf Reinigung ausserhalb von Regensburg plus 50 km erweitert werden.

## Kanonische Seiten
${pages}
`;

  return new Response(`${content.trim()}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "index, follow",
      Link: '</service-graph.json>; rel="alternate"; type="application/json", </sitemap.xml>; rel="sitemap"; type="application/xml"',
    },
  });
}
