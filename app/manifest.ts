import { MetadataRoute } from "next";

import { germanizeDeep } from "@/lib/german-text";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return germanizeDeep({
    name: "FLOXANT | Umzug, Reinigung und Entrümpelung",
    short_name: "FLOXANT",
    description:
      "FLOXANT prueft Umzug, Entruempelung und Reinigung lokal ab Regensburg. Reinigung gilt fuer Regensburg und maximal 75 km Umkreis.",
    start_url: "/",
    display: "standalone",
    background_color: "#EEF5FF",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "FLOXANT Anfrage starten",
        short_name: "Anfrage",
        description: "Umzug, Reinigung, Entrümpelung oder Entsorgung direkt anfragen.",
        url: "/buchung",
        icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Kostenrahmen prüfen",
        short_name: "Rechner",
        description: "Preisrahmen für Umzug, Reinigung oder Entrümpelung einschätzen.",
        url: "/rechner",
        icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Angebot prüfen lassen",
        short_name: "Angebot prüfen",
        description: "Angebot anderer Firma hochladen und Alternative prüfen lassen.",
        url: "/angebot-guenstiger-pruefen",
        icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Reinigung Regensburg",
        short_name: "Reinigung",
        description: "Reinigung, Bueroreinigung oder Endreinigung in Regensburg und im 75-km-Umkreis anfragen.",
        url: "/regensburg/reinigung",
        icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Umzug Regensburg",
        short_name: "Umzug",
        description: "Umzug in Regensburg mit Fotos, Termin und Angebot prüfen lassen.",
        url: "/regensburg/umzug",
        icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }],
      },
    ],
    categories: ["business", "productivity", "utilities"],
    lang: "de",
    orientation: "portrait-primary",
  });
}
