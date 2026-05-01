import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/treppenhausreinigung",
    title: "Treppenhausreinigung Düsseldorf | FLOXANT Reinigung",
    description:
      "Treppenhausreinigung in Düsseldorf für Mehrfamilienhäuser und gemeinschaftliche Bereiche. Lokal abgestimmt und unverbindlich anfragbar.",
  });
}

export default function DuesseldorfTreppenhausreinigungPage() {
  return (
    <DuesseldorfServicePage
      kicker="FLOXANT Treppenhausreinigung Düsseldorf"
      title="Treppenhausreinigung in Düsseldorf"
      description="Für Treppenhäuser, Eingangsbereiche und gemeinschaftlich genutzte Flächen in Düsseldorf und nahen Orten."
      bullets={[
        "Sinnvoll für Eigentümer, Hausverwaltungen oder kleinere Objekte mit regelmäßigem Reinigungsbedarf.",
        "Laufwege, Etagen und sichtbare Eingangsflächen werden im Anfrageweg sauber eingeordnet.",
        "Keine Entsorgungs- oder Transportlogik, sondern klare Gebäudereinigung.",
      ]}
      localFocus={["Derendorf", "Pempelfort", "Bilk", "Oberbilk", "Neuss", "Meerbusch"]}
    />
  );
}
