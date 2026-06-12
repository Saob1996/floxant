import { MetadataRoute } from "next";

import { germanizeDeep } from "@/lib/german-text";

export default function manifest(): MetadataRoute.Manifest {
  return germanizeDeep({
    name: "FLOXANT | Umzug, Reinigung und Entrümpelung",
    short_name: "FLOXANT",
    description:
      "FLOXANT prüft Umzug, Reinigung, Entrümpelung, Haushaltsauflösung, Gewerbereinigung und Endreinigung in Düsseldorf und Regensburg.",
    start_url: "/",
    display: "standalone",
    background_color: "#EEF5FF",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "FLOXANT Anfrage starten",
        short_name: "Anfrage",
        description: "Umzug, Reinigung, Entrümpelung oder Entsorgung direkt anfragen.",
        url: "/buchung",
        icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
      },
      {
        name: "Kostenrahmen prüfen",
        short_name: "Rechner",
        description: "Preisrahmen für Umzug, Reinigung oder Entrümpelung einschätzen.",
        url: "/rechner",
        icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
      },
      {
        name: "Angebot prüfen lassen",
        short_name: "Angebot prüfen",
        description: "Angebot anderer Firma hochladen und Alternative prüfen lassen.",
        url: "/angebot-guenstiger-pruefen",
        icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
      },
      {
        name: "Reinigung Düsseldorf",
        short_name: "Düsseldorf",
        description: "Umzug, Reinigung, Entrümpelung oder Endreinigung in Düsseldorf anfragen.",
        url: "/duesseldorf/reinigung",
        icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
      },
      {
        name: "Umzug Düsseldorf",
        short_name: "Umzug DUS",
        description: "Umzug in Düsseldorf mit Fotos, Termin und Angebot prüfen lassen.",
        url: "/duesseldorf/umzug",
        icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
      },
    ],
    categories: ["business", "productivity", "utilities"],
    lang: "de",
    orientation: "portrait-primary",
  });
}
