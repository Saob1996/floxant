import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/endreinigung",
    title: "Endreinigung Düsseldorf | Übergabe sauber vorbereiten",
    description:
      "Endreinigung und Übergabereinigung in Düsseldorf für Auszug, Rückgabe und neue Nutzung: Zustand, Termin, Fotos und Preisrahmen senden.",
  });
}

export default function DuesseldorfEndreinigungPage() {
  return (
    <DuesseldorfServicePage
      path="/duesseldorf/endreinigung"
      metaDescription="Endreinigung und Übergabereinigung in Düsseldorf für Auszug, Rückgabe und neue Nutzung: Zustand, Termin, Fotos und Preisrahmen senden."
      kicker="FLOXANT Endreinigung Düsseldorf"
      title="Endreinigung und Übergabereinigung in Düsseldorf"
      serviceLabel="Endreinigung"
      description="Für Rückgabe, Nachmieterwechsel und neue Nutzung, wenn der Zustand einer Fläche sichtbar sauber und nachvollziehbar vorbereitet werden soll."
      contentSections={[
        {
          title: "Endreinigung vor Übergabe, Auszug oder neuer Nutzung",
          paragraphs: [
            "Bei Endreinigung in Düsseldorf zählt der letzte Eindruck. Küche, Bad, Böden, Fensterbereiche, Ecken, Türen, Schalter, Sockelleisten und vergessene Stellen fallen bei Übergaben schnell auf. Deshalb wird der Umfang vorab sauber geklärt.",
            "FLOXANT prüft, ob der gewünschte Termin, Zustand und Anspruch zusammenpassen. Fotos von Küche, Bad, Boden, Fenstern und Problemstellen machen die Rückmeldung deutlich schneller und realistischer.",
          ],
        },
        {
          title: "Übergabe sauber vorbereiten ohne falsche Garantie",
          paragraphs: [
            "Eine Reinigung kann den Zustand verbessern und eine Übergabe vorbereiten, ersetzt aber keine rechtliche Abnahmegarantie. Entscheidend ist, was gereinigt werden soll, wie stark die Rückstände sind und wie knapp das Zeitfenster ist.",
            "Wenn zusätzlich Gegenstände entfernt werden müssen, wird Entsorgung getrennt geprüft. So bleiben Reinigung, mögliche Restmengen und Preisrahmen verständlich getrennt.",
          ],
        },
      ]}
      bullets={[
        "Geeignet für Übergaben nach Auszug, vor Einzug oder vor neuer Nutzung durch Mieter, Käufer oder Teams.",
        "Der Umfang hängt stark von Zustand, Küche, Bad, Fenstern und Terminfenster ab.",
        "Gerade für knappe Übergaben ist die unverbindliche Ersteinschätzung ein sinnvoller Startpunkt.",
      ]}
      localFocus={["Innenstadt", "Altstadt", "Stadtmitte", "Benrath", "Ratingen", "Hilden"]}
      priceLogic={[
        "Küche, Bad, Fensterbereiche, Boden, Ecken und starke Rückstände verändern Aufwand und Preisrahmen.",
        "Knappe Übergabetermine brauchen besonders klare Angaben zu Zugang, Schlüssel und Prioritäten.",
        "Entsorgung von Restmengen wird getrennt geprüft, damit die Endreinigung sauber kalkulierbar bleibt.",
      ]}
      faqItems={[
        {
          q: "Was kostet eine Endreinigung in Düsseldorf?",
          a: "Der Preis hängt von Fläche, Zustand, Küche, Bad, Böden, Fensterbereichen, Etage, Zugang, Termin und gewünschtem Übergabeziel ab.",
        },
        {
          q: "Welche Fotos helfen für eine Einschätzung?",
          a: "Hilfreich sind Bilder von Küche, Bad, Böden, Fensternähe, Türen, Ecken, Restmengen, Zugang und sichtbaren Problemstellen.",
        },
        {
          q: "Kann FLOXANT kurzfristig vor der Übergabe reinigen?",
          a: "Kurzfristige Termine können nach Umfang, Zugang, Teamverfügbarkeit und Deadline geprüft werden. Eine Sofortgarantie gibt es nicht.",
        },
        {
          q: "Kann die Endreinigung mit Umzug oder Entrümpelung kombiniert werden?",
          a: "Ja, wenn Reihenfolge und Termin passen. Umzug, Restmengen, Entrümpelung und Endreinigung werden getrennt geprüft.",
        },
        {
          q: "Garantiert FLOXANT die Wohnungsabnahme?",
          a: "Nein. Eine Abnahme oder Kautionsrückzahlung kann nicht garantiert werden. Die Reinigung wird nach vereinbartem Umfang vorbereitet.",
        },
        {
          q: "Ist eine Besichtigung in Düsseldorf möglich?",
          a: "Bei größeren oder unklaren Flächen kann eine Vor-Ort-Besichtigung sinnvoll sein. Für den Start reichen oft Fotos und Eckdaten.",
        },
      ]}
    />
  );
}
