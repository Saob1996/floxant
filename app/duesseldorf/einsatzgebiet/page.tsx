import type { Metadata } from "next";

import { ServiceAreaPage } from "@/components/service-areas/ServiceAreaPage";
import { generatePageSEO } from "@/lib/seo";
import { serviceAreaPageConfigs } from "@/lib/service-areas";

const config = serviceAreaPageConfigs.duesseldorf;

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path: config.path,
  title: "Einsatzgebiet Reinigung Düsseldorf | Ort prüfen",
  description:
    "Reinigungsservice rund um Düsseldorf: Ort im verifizierten 75-km-Einsatzgebiet prüfen und Eckdaten direkt an FLOXANT senden.",
});

export default function DuesseldorfServiceAreaPage() {
  return <ServiceAreaPage regionId="duesseldorf" />;
}
