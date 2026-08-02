import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DuesseldorfChrome } from "@/components/duesseldorf/DuesseldorfChrome";
import { DuesseldorfStickyActions } from "@/components/duesseldorf/DuesseldorfStickyActions";

export const metadata: Metadata = {
  other: {
    "geo.region": "DE-NW",
    "geo.placename": "Düsseldorf",
    "geo.position": "51.2225767;6.7772364",
    "dc.title": "FLOXANT Düsseldorf | Reinigung verständlich anfragen",
    "dc.description":
      "Reinigung in Düsseldorf nach Objekt, Fläche, Turnus, Zugang und Termin verständlich auswählen und anfragen.",
    "dc.subject":
      "Reinigung Düsseldorf, Büroreinigung Düsseldorf, Praxisreinigung Düsseldorf, Fensterreinigung Düsseldorf",
    "dc.coverage": "Düsseldorf als Hauptort; umliegende Einsatzorte nur nach Objekt- und Terminprüfung.",
  },
};

export default function DuesseldorfLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DuesseldorfChrome>
      {children}
      <DuesseldorfStickyActions />
    </DuesseldorfChrome>
  );
}

