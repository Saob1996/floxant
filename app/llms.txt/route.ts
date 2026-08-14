import { company } from "@/lib/company";

export const dynamic = "force-static";

const canonicalPages = [
  ["Startseite", "/"],
  ["Leistungen", "/leistungen"],
  ["Buchung", "/buchung"],
  ["Kontakt", "/kontakt"],
  ["Düsseldorf", "/duesseldorf"],
  ["Reinigung Düsseldorf", "/duesseldorf/reinigung"],
  ["Büroreinigung Düsseldorf", "/duesseldorf/bueroreinigung"],
  ["Praxisreinigung Düsseldorf", "/duesseldorf/praxisreinigung"],
  ["Fensterreinigung Düsseldorf", "/duesseldorf/fensterreinigung"],
  ["Grundreinigung Düsseldorf", "/duesseldorf/grundreinigung"],
  ["Unterhaltsreinigung Düsseldorf", "/duesseldorf/unterhaltsreinigung"],
  ["Bauendreinigung Düsseldorf", "/duesseldorf/baureinigung"],
  ["Gewerbereinigung Düsseldorf", "/duesseldorf/gewerbereinigung"],
  ["Regensburg", "/regensburg"],
  ["Umzug Regensburg", "/regensburg/umzug"],
  ["Entrümpelung Regensburg", "/regensburg/entruempelung"],
  ["Wohnungsauflösung Regensburg", "/regensburg/wohnungsaufloesung"],
  ["Klaviertransport Regensburg", "/klaviertransport-regensburg"],
  ["Angebot prüfen", "/angebot-guenstiger-pruefen"],
  ["Leer-Rückfahrt Richtung Regensburg", "/leerfahrt-rueckfahrt"],
  ["Beiladung", "/beiladung"],
  ["Service Graph", "/service-graph.json"],
  ["Sitemap", "/sitemap.xml"],
] as const;

export function GET() {
  const pages = canonicalPages
    .map(([label, path]) => `- ${label}: ${company.url}${path === "/" ? "" : path}`)
    .join("\n");

  const content = `# FLOXANT

FLOXANT ist ein direkter Dienstleister für Reinigung in Düsseldorf sowie Umzug, Räumung und Transport in Regensburg.

Stand dieser Fakten: 14. August 2026.

## Regionale Schwerpunkte
- Düsseldorf: Reinigung für Wohnung, Büro, Praxis und Gewerbe, darunter Fenster-, Grund-, Unterhalts- und Bauendreinigung.
- Regensburg: Umzug, Entrümpelung, Wohnungsauflösung, Klaviertransport und weitere Transportleistungen.
- Andere Kombinationen werden nur nach Ort, Umfang, Zugang und tatsächlicher Machbarkeit geprüft.

## Anfragehinweise
- Für Reinigung helfen Ort, Objektart, Fläche, Turnus, Zustand, Zugang, Termin und freiwillige Fotos.
- Für Umzug und Transport helfen Start, Ziel, Etagen, Umfang, Termin und besondere Zugänge.
- Für Räumungen helfen Räume, Menge, Zugang, gewünschter Zielzustand und freiwillige Fotos.
- Ein vorhandenes Angebot kann getrennt über /angebot-guenstiger-pruefen eingereicht werden.

## Grenzen
- Keine pauschalen Preis-, Termin- oder Verfügbarkeitsgarantien.
- Keine erfundenen Bewertungen, Testsiegel, Mitarbeiterzahlen oder Marktpositionen.
- Die jeweilige kanonische Leistungsseite und ${company.url}/kontakt sind die verbindlichen öffentlichen Einstiege.

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
