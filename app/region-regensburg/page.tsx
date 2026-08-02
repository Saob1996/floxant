import type { Metadata } from "next";

import { ServiceAreaPage } from "@/components/service-areas/ServiceAreaPage";
import { generatePageSEO } from "@/lib/seo";
import { serviceAreaPageConfigs } from "@/lib/service-areas";

const config = serviceAreaPageConfigs.regensburg;

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path: config.path,
  title: "Einsatzgebiet Regensburg | Umzug & Transport",
  description:
    "Umzug, Transport und Räumung rund um Regensburg: Ort im verifizierten 75-km-Einsatzgebiet prüfen und Eckdaten direkt an FLOXANT senden.",
});

export default function RegionRegensburgPage() {
  return <ServiceAreaPage regionId="regensburg" />;
}
