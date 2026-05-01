import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/grundreinigung",
    title: "Grundreinigung Düsseldorf | FLOXANT Reinigung",
    description:
      "Grundreinigung in Düsseldorf für Flächen mit höherem Reinigungsbedarf. Klar strukturiert, lokal und unverbindlich anfragbar.",
  });
}

export default function DuesseldorfGrundreinigungPage() {
  return (
    <DuesseldorfServicePage
      kicker="FLOXANT Grundreinigung Düsseldorf"
      title="Grundreinigung in Düsseldorf"
      description="Für Flächen in Düsseldorf, die mehr als eine normale Unterhaltsreinigung brauchen und deshalb sauber vorgeprüft werden müssen."
      bullets={[
        "Geeignet bei stärkerer Verschmutzung, nach längerer Nutzung oder vor neuer Belegung.",
        "Der tatsächliche Zustand beeinflusst Umfang, Zeit und Preis stärker als bei Standardreinigung.",
        "Die Seite bleibt bewusst auf Reinigung begrenzt und vermeidet fremde Leistungsversprechen.",
      ]}
      localFocus={["Innenstadt", "Gerresheim", "Benrath", "Kaiserswerth", "Hilden", "Erkrath"]}
    />
  );
}
