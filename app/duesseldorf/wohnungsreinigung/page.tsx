import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/wohnungsreinigung",
    title: "Wohnungsreinigung Düsseldorf | FLOXANT Reinigung",
    description:
      "Wohnungsreinigung in Düsseldorf für bewohnte oder leere Wohnungen. Klar angefragt, lokal abgestimmt und unverbindlich einordenbar.",
  });
}

export default function DuesseldorfWohnungsreinigungPage() {
  return (
    <DuesseldorfServicePage
      kicker="FLOXANT Wohnungsreinigung Düsseldorf"
      title="Wohnungsreinigung in Düsseldorf"
      description="Wenn Wohnungen in Düsseldorf sauber, nachvollziehbar und ohne überladene Service-Mischung gereinigt werden sollen."
      bullets={[
        "Geeignet für laufende Wohnungsreinigung, punktuelle Intensivreinigung oder kurze Vorbereitungen vor Terminen.",
        "Küche, Bad, Oberflächen und typische Alltagsbereiche werden je nach Bedarf abgestimmt.",
        "Die Anfrage bleibt bewusst lokal und auf Reinigung fokussiert.",
      ]}
      localFocus={["Altstadt", "Flingern", "Bilk", "Oberbilk", "Düsseltal", "Meerbusch"]}
    />
  );
}
