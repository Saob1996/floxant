import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/bueroreinigung",
    title: "Büroreinigung Düsseldorf | FLOXANT Reinigung",
    description:
      "Büroreinigung in Düsseldorf für Büros, Praxen und kleine Gewerbeflächen. Sauber abgestimmt, lokal erreichbar und unverbindlich anfragbar.",
  });
}

export default function DuesseldorfBueroreinigungPage() {
  return (
    <DuesseldorfServicePage
      kicker="FLOXANT Büroreinigung Düsseldorf"
      title="Büroreinigung in Düsseldorf"
      description="Für Büros, Praxen und kleinere Gewerbeflächen in Düsseldorf, wenn regelmäßige oder intensive Reinigung strukturiert und ohne Umweg angefragt werden soll."
      bullets={[
        "Sinnvoll für laufende Büroflächen, kleine Teams, Praxen oder Besprechungsbereiche.",
        "Zeiten und Umfang werden sauber abgestimmt, damit der Betrieb so wenig wie möglich gestört wird.",
        "Auch für Übergänge, Neuvermietung oder Vorbereitung von Objektterminen geeignet.",
      ]}
      localFocus={["Stadtmitte", "Pempelfort", "Derendorf", "Bilk", "Neuss", "Ratingen"]}
    />
  );
}
