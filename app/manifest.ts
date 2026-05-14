import { MetadataRoute } from "next";

import { germanizeDeep } from "@/lib/german-text";

export default function manifest(): MetadataRoute.Manifest {
  return germanizeDeep({
    name: "FLOXANT | Umzug, Reinigung und Entrümpelung in Regensburg und Bayern",
    short_name: "FLOXANT",
    description:
      "FLOXANT ist Ihr Ansprechpartner für Umzug, Reinigung und Entrümpelung in Regensburg und Bayern mit klarer Einschätzung, regionaler Planung und professioneller Einsatzkoordination.",
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
        description: "Reinigung oder Entsorgung in Düsseldorf anfragen, keine Umzüge.",
        url: "/duesseldorf/reinigung",
        icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
      },
    ],
    categories: ["business", "productivity", "utilities"],
    lang: "de",
    orientation: "portrait-primary",
  });
}
