import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/endreinigung",
    title: "Endreinigung Düsseldorf | FLOXANT Reinigung",
    description:
      "Endreinigung und Übergabereinigung in Düsseldorf für Wohnungswechsel, Rückgabe und neue Nutzung. Lokal und unverbindlich anfragbar.",
  });
}

export default function DuesseldorfEndreinigungPage() {
  return (
    <DuesseldorfServicePage
      kicker="FLOXANT Endreinigung Düsseldorf"
      title="Endreinigung und Übergabereinigung in Düsseldorf"
      description="Für Rückgabe, Nachmieterwechsel und neue Nutzung, wenn der Zustand einer Fläche sichtbar sauber und nachvollziehbar vorbereitet werden soll."
      bullets={[
        "Geeignet für Übergaben nach Auszug, vor Einzug oder vor neuer Nutzung durch Mieter, Käufer oder Teams.",
        "Der Umfang hängt stark von Zustand, Küche, Bad, Fenstern und Terminfenster ab.",
        "Gerade für knappe Übergaben ist die unverbindliche Ersteinschätzung ein sinnvoller Startpunkt.",
      ]}
      localFocus={["Innenstadt", "Altstadt", "Stadtmitte", "Benrath", "Ratingen", "Hilden"]}
    />
  );
}
