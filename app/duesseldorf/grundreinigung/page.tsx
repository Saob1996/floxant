import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/grundreinigung",
    title: "Grundreinigung Düsseldorf | Wohnung, Büro & Gewerbe reinigen lassen",
    description:
      "Grundreinigung Düsseldorf für Wohnung, Büro, Praxis, Kanzlei und Gewerbe: nach Auszug, Renovierung oder Leerstand Fotos senden und Angebot prüfen.",
  });
}

export default function DuesseldorfGrundreinigungPage() {
  return (
    <DuesseldorfServicePage
      path="/duesseldorf/grundreinigung"
      metaDescription="Grundreinigung Düsseldorf für Wohnung, Büro, Praxis, Kanzlei und Gewerbe: nach Auszug, Renovierung oder Leerstand Fotos senden und Angebot prüfen."
      kicker="FLOXANT Grundreinigung Düsseldorf"
      title="Grundreinigung Düsseldorf für Wohnung, Büro, Praxis und Gewerbe"
      serviceLabel="Grundreinigung"
      description="Für Düsseldorfer Flächen, die mehr als eine normale Unterhaltsreinigung brauchen: Wohnung, Büro, Praxis, Kanzlei, Ladenfläche, Treppenhaus oder Gewerbefläche werden nach Zustand, Ziel und Fotos eingeordnet."
      contentSections={[
        {
          title: "Wann eine Grundreinigung sinnvoll ist",
          paragraphs: [
            "Grundreinigung in Düsseldorf wird oft wichtig, wenn normale Reinigung nicht mehr reicht: nach Auszug, vor Wohnungsübergabe, nach Renovierung, nach längerer Nutzung, bei Leerstand oder vor neuer gewerblicher Nutzung.",
            "Entscheidend sind Zustand, Bodenart, Küche, Bad, Sanitärbereiche, Laufwege, Ränder, Ecken, Türen, Fensterrahmen, Staub, Kalk, Fett und zugängliche Flächen. FLOXANT prüft diese Punkte vor einer Zusage mit Stadtteil, Fotos und gewünschtem Termin.",
          ],
        },
        {
          title: "Grundreinigung oder Unterhaltsreinigung?",
          paragraphs: [
            "Unterhaltsreinigung meint wiederkehrende Reinigung nach Plan. Grundreinigung ist intensiver und wird meist einmalig oder als Neustart angefragt, wenn sichtbare Rückstände, Ecken, Kanten, Bodenpflege oder Übergabezustand wichtiger sind.",
            "Für Düsseldorf trennt FLOXANT diese Absichten bewusst: Büroreinigung, Praxisreinigung, Wohnungsreinigung, Treppenhausreinigung und Gewerbereinigung haben eigene Seiten. Grundreinigung bleibt der Weg für intensive Zustände und klare Zielbilder.",
          ],
        },
        {
          title: "Wohnung, Büro, Praxis und Kanzlei",
          paragraphs: [
            "Bei Wohnungen geht es häufig um Auszug, Einzug, möblierte Wohnung, Küche, Bad, Boden, Fensterrahmen und Wohnungsübergabe. Bei Büros zählen Raumliste, Arbeitsplätze, Küche, Sanitär, Boden, Randzeiten und Schlüsselweg.",
            "Bei Praxen und Kanzleien bleiben sensible Bereiche, Öffnungszeiten und zugängliche Flächen wichtig. FLOXANT verspricht keine medizinische Spezialdesinfektion, sondern prüft normale bis intensive Reinigung nach Objekt, Fotos und realistischem Umfang.",
          ],
        },
        {
          title: "Gewerbe, Leerstand und Renovierung",
          paragraphs: [
            "Für Ladenfläche, Studio, Büroetage, Gewerbefläche oder Treppenhaus hängt der Aufwand stark von Nutzung, Laufwegen, Boden, Sanitärbereichen, Staub, Fett, Glas, Zugang und Terminfenster ab.",
            "Nach Renovierung oder Handwerkertermin wird besonders geprüft, ob es um Staub, Farbspritzer, Rahmen, Boden, Küche, Bad oder Restmengen geht. Entsorgung, Reparaturen, Malerarbeiten und Gefahrstoffe werden getrennt eingeordnet.",
          ],
        },
        {
          title: "Angebot für Grundreinigung prüfen",
          paragraphs: [
            "Wenn bereits ein Angebot vorliegt, kann FLOXANT Umfang, Preis, Zusatzpositionen, Zeitfenster, Stadtteil, Fotos und gewünschtes Ergebnis sachlich prüfen. Das ist besonders sinnvoll, wenn Pauschalen unklar wirken oder wichtige Punkte fehlen.",
            "Für den Start reichen Düsseldorf-Stadtteil, Objektart, Fläche, Zustand, Termin, Fotos und vorhandenes Angebot. Daraus entsteht eine realistischere Einschätzung als aus Quadratmetern allein.",
          ],
        },
      ]}
      bullets={[
        "Geeignet für Wohnung, Büro, Praxis, Kanzlei, Ladenfläche, Gewerbe und Treppenhaus in Düsseldorf.",
        "Sinnvoll nach Auszug, vor Übergabe, nach Renovierung, bei Leerstand oder bei stärkerer Verschmutzung.",
        "Fotos, Stadtteil, Termin und Zielzustand machen Preisrahmen und Umfang belastbarer.",
        "Keine pauschalen Sonderversprechen: Entsorgung, Reparatur, Gefahrstoffe und Spezialdesinfektion werden getrennt geprüft.",
      ]}
      localFocus={["Altstadt", "Bilk", "Flingern", "Pempelfort", "Derendorf", "Oberkassel", "Heerdt", "Benrath", "Ratingen", "Neuss", "Meerbusch", "Hilden"]}
      priceLogic={[
        "Starke Verschmutzung, Kalk, Fett, Laufspuren, Bodenart und schwer zugängliche Bereiche erhöhen den Aufwand.",
        "Wohnung, Büro, Praxis, Kanzlei und Gewerbefläche werden nach Zielzustand, Zugang, Raumliste und Termin unterschiedlich bewertet.",
        "Fotos und Prioritäten helfen, Grundreinigung von normaler Unterhaltsreinigung, Wohnungsreinigung oder Büroreinigung sauber zu trennen.",
        "Ein vorhandenes Angebot wird erst vergleichbar, wenn Umfang, Zusatzpositionen, Turnus oder Einmaligkeit und Fotos sichtbar sind.",
      ]}
      faqItems={[
        {
          q: "Was kostet eine Grundreinigung in Düsseldorf?",
          a: "Der Preis hängt von Fläche, Zustand, Raumliste, Boden, Küche, Bad, Sanitär, Zugang, Termin und gewünschtem Ergebnis ab. Fotos und Stadtteil helfen für einen realistischen Preisrahmen.",
        },
        {
          q: "Ist Grundreinigung dasselbe wie Unterhaltsreinigung?",
          a: "Nein. Unterhaltsreinigung ist wiederkehrend und planbar. Grundreinigung ist intensiver und wird häufig nach Auszug, Renovierung, Leerstand oder stärkerer Verschmutzung angefragt.",
        },
        {
          q: "Kann FLOXANT eine Wohnung vor Übergabe grundreinigen?",
          a: "Ja, nach Prüfung von Räumen, Zustand, Fotos, Zugang und Termin. Besonders wichtig sind Küche, Bad, Boden, Fensterrahmen, Türen und sichtbare Restpunkte.",
        },
        {
          q: "Passt die Seite auch für Büro, Praxis oder Kanzlei?",
          a: "Ja. FLOXANT prüft Grundreinigung für Büro, Praxis und Kanzlei nach Raumliste, Öffnungszeiten, sensiblen Bereichen, Sanitär, Boden, Zugang und Fotos.",
        },
        {
          q: "Kann ich ein vorhandenes Angebot für Grundreinigung prüfen lassen?",
          a: "Ja. Senden Sie Angebot, Fotos, Fläche, Stadtteil, Termin und Zielzustand. FLOXANT prüft Umfang, Zusatzpositionen und Preisrahmen sachlich.",
        },
        {
          q: "Welche Leistungen werden nicht pauschal angeboten?",
          a: "Reparaturen, Malerarbeiten, Gefahrstoffe, Schimmel-Sanierung, Spezialdesinfektion, Industrie-Sonderreinigung und Entsorgung werden nicht als normale Grundreinigung versprochen.",
        },
      ]}
      relatedLinks={[
        { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf" },
        { href: "/duesseldorf/reinigungsfirma", label: "Reinigungsfirma Düsseldorf" },
        { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung Düsseldorf" },
        { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
        { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung Düsseldorf" },
        { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung Düsseldorf" },
        { href: "/duesseldorf/gewerbeflaechen-reinigung", label: "Gewerbeflächen-Reinigung" },
        { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung Düsseldorf" },
        { href: "/reinigungsfirma-angebot", label: "Neues Reinigungsangebot anfragen" },
        { href: "/duesseldorf/angebot-vergleichen", label: "Angebot prüfen Düsseldorf" },
        { href: "/angebot-vergleichen-duesseldorf", label: "Reinigungsangebot vergleichen" },
        { href: "/region-duesseldorf", label: "Region Düsseldorf" },
      ]}
    />
  );
}
