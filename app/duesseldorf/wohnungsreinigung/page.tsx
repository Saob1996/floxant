import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/wohnungsreinigung",
    title: "Wohnungsreinigung Düsseldorf | Wohnung reinigen lassen",
    description:
      "Wohnungsreinigung in Düsseldorf für bewohnte oder leere Wohnungen: Stadtteil, Fläche, Zustand und Fotos senden, Preisrahmen unverbindlich prüfen lassen.",
  });
}

export default function DuesseldorfWohnungsreinigungPage() {
  return (
    <DuesseldorfServicePage
      path="/duesseldorf/wohnungsreinigung"
      metaDescription="Wohnungsreinigung in Düsseldorf für bewohnte oder leere Wohnungen: Stadtteil, Fläche, Zustand und Fotos senden, Preisrahmen unverbindlich prüfen lassen."
      kicker="FLOXANT Wohnungsreinigung Düsseldorf"
      title="Wohnungsreinigung in Düsseldorf"
      serviceLabel="Wohnungsreinigung"
      description="Wenn Wohnungen in Düsseldorf sauber, nachvollziehbar und ohne überladene Service-Mischung gereinigt werden sollen."
      contentSections={[
        {
          title: "Wohnungsreinigung mit Blick auf den echten Zustand",
          paragraphs: [
            "Bei einer Wohnungsreinigung in Düsseldorf reicht eine reine Quadratmeterzahl selten aus. Eine leere Wohnung nach Auszug, eine bewohnte Wohnung mit Alltagsverschmutzung oder eine möblierte Einheit vor neuer Nutzung haben sehr unterschiedliche Anforderungen. FLOXANT fragt deshalb nach Küche, Bad, Böden, Fenstern, Nebenflächen, Zugang und Fotos.",
            "Besonders hilfreich sind kurze Bilder von den Bereichen, die Ihnen wichtig sind. So lässt sich schneller erkennen, ob eine normale Reinigung reicht, ob punktuell Grundreinigung sinnvoll ist oder ob Entsorgung getrennt geprüft werden sollte.",
          ],
        },
        {
          title: "Für Einzug, Auszug und Übergabe in Düsseldorf",
          paragraphs: [
            "Viele Kunden fragen an, weil eine Wohnung vor Übergabe, Neuvermietung oder Einzug wieder stimmig aussehen soll. Dann zählen Terminfenster, Schlüsselzugang, Parkmöglichkeit, Etage und ein realistisches Ergebnis stärker als ein pauschales Versprechen.",
            "FLOXANT bleibt dabei klar bei Reinigung. Umzug und Transport werden in Düsseldorf nicht als Leistung beworben, damit die Anfrage sauber und verständlich bleibt.",
          ],
        },
      ]}
      bullets={[
        "Geeignet für laufende Wohnungsreinigung, punktuelle Intensivreinigung oder kurze Vorbereitungen vor Terminen.",
        "Küche, Bad, Oberflächen und typische Alltagsbereiche werden je nach Bedarf abgestimmt.",
        "Die Anfrage bleibt bewusst lokal und auf Reinigung fokussiert.",
      ]}
      localFocus={["Altstadt", "Flingern", "Bilk", "Oberbilk", "Düsseltal", "Meerbusch"]}
      priceLogic={[
        "Fläche, Zustand, Küche, Bad, Bodenart, Fensterbereiche und gewünschtes Ergebnis bestimmen den Aufwand.",
        "Fotos von stark genutzten Bereichen verkürzen Rückfragen und machen den Preisrahmen realistischer.",
        "Bei Auszug oder Übergabe sind Termin, Zugang, Etage und Schlüsselregelung besonders wichtig.",
      ]}
    />
  );
}
