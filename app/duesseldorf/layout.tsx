import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DuesseldorfChrome } from "@/components/duesseldorf/DuesseldorfChrome";

const regionalTitle = "FLOXANT Düsseldorf | Reinigung für Büro, Praxis und Objekt";
const regionalDescription =
  "Reinigungsleistungen in Düsseldorf auswählen, Eckdaten senden und den weiteren Ablauf abstimmen.";
const regionalImage = "/seo-image/reinigung";

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/duesseldorf",
    title: regionalTitle,
    description: regionalDescription,
    images: [{ url: regionalImage, width: 1200, height: 630, alt: regionalTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: regionalTitle,
    description: regionalDescription,
    images: [{ url: regionalImage, alt: regionalTitle }],
  },
  other: {
    "geo.region": "DE-NW",
    "geo.placename": "Düsseldorf",
    "geo.position": "51.2277;6.7735",
    "dc.title": regionalTitle,
    "dc.description": regionalDescription,
    "dc.subject":
      "Reinigung Düsseldorf, Büroreinigung Düsseldorf, Praxisreinigung Düsseldorf, Gewerbereinigung Düsseldorf, Fotos senden, Termin anfragen",
    "dc.coverage":
      "Düsseldorf: Reinigungsleistungen für Wohnung, Büro, Praxis und Gewerbe.",
  },
};

export default function DuesseldorfLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DuesseldorfChrome>{children}</DuesseldorfChrome>
  );
}

