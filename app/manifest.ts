import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
 return {
  name: "FLOXANT | Umzug, Reinigung und Entrümpelung in Regensburg und Bayern",
  short_name: "FLOXANT",
  description:
   "FLOXANT ist Ihr Ansprechpartner für Umzug, Reinigung und Entrümpelung in Regensburg und Bayern mit klarer Vorprüfung, regionaler Planung und professioneller Einsatzkoordination.",
  start_url: "/",
  display: "standalone",
  background_color: "#0A0A0A",
  theme_color: "#3b82f6",
  icons: [
   {
    src: "/icon.png",
    sizes: "any",
    type: "image/png",
   },
  ],
 };
}
