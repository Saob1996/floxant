import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/treppenhausreinigung",
    title: "Treppenhausreinigung Düsseldorf | Haus & Eingang",
    description:
      "Treppenhausreinigung in Düsseldorf für Mehrfamilienhäuser, Eingänge und Gemeinschaftsflächen: Stadtteil, Etagen, Turnus und Fotos senden.",
  });
}

export default function DuesseldorfTreppenhausreinigungPage() {
  return (
    <DuesseldorfServicePage
      path="/duesseldorf/treppenhausreinigung"
      metaDescription="Treppenhausreinigung in Düsseldorf für Mehrfamilienhäuser, Eingänge und Gemeinschaftsflächen: Stadtteil, Etagen, Turnus und Fotos senden."
      kicker="FLOXANT Treppenhausreinigung Düsseldorf"
      title="Treppenhausreinigung in Düsseldorf"
      serviceLabel="Treppenhausreinigung"
      description="Für Treppenhäuser, Eingangsbereiche und gemeinschaftlich genutzte Flächen in Düsseldorf und nahen Orten."
      contentSections={[
        {
          title: "Treppenhausreinigung für Haus, Eingang und Laufwege",
          paragraphs: [
            "Treppenhausreinigung in Düsseldorf betrifft nicht nur Stufen. Eingangsbereich, Geländer, Briefkastenbereich, Aufzugsvorraum, Kellerzugang, Flure und sichtbare Laufwege prägen den Eindruck für Bewohner, Besucher und Hausverwaltung.",
            "Damit eine Anfrage schnell prüfbar ist, helfen Etagenzahl, Turnus, Objektart, Zugang, Fotos und Hinweise zu besonderen Verschmutzungen. Gerade in Mehrfamilienhäusern sind Hausordnung, Zeitfenster und Ansprechpartner wichtig.",
          ],
        },
        {
          title: "Regelmäßigkeit macht den Unterschied",
          paragraphs: [
            "Einmalige Reinigung vor einer Besichtigung ist anders zu planen als wöchentliche oder monatliche Treppenhausreinigung. Auch Herbstlaub, Straßenschmutz, Baustellenstaub oder hoher Publikumsverkehr verändern den Aufwand.",
            "FLOXANT prüft den Bedarf nach Objekt, Stadtteil, Etagen, Zugang und gewünschtem Ergebnis. So bleibt die Leistung klar auf gemeinschaftliche Reinigungsflächen fokussiert.",
          ],
        },
      ]}
      bullets={[
        "Sinnvoll für Eigentümer, Hausverwaltungen oder kleinere Objekte mit regelmäßigem Reinigungsbedarf.",
        "Laufwege, Etagen und sichtbare Eingangsflächen werden im Anfrageweg sauber eingeordnet.",
        "Keine Mischleistung, sondern klare Gebäudereinigung für gemeinschaftliche Bereiche.",
      ]}
      localFocus={["Derendorf", "Pempelfort", "Bilk", "Oberbilk", "Neuss", "Meerbusch"]}
      priceLogic={[
        "Etagen, Eingangsbereich, Aufzugsvorraum, Kellerzugang und gewünschter Turnus bestimmen den Aufwand.",
        "Hausordnung, Zugang, Ansprechpartner und Reinigungszeitfenster müssen vor Start klar sein.",
        "Fotos von Stufen, Geländer, Eingang und Laufwegen helfen bei einer schnellen Einschätzung.",
      ]}
    />
  );
}
