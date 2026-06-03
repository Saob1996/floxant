import type { Metadata } from "next";

import { RegensburgServicePage } from "@/components/regensburg/RegensburgServicePage";
import { company } from "@/lib/company";
import { getRegensburgServicePage } from "@/lib/regensburg-service-pages";

const config = getRegensburgServicePage("haushaltsaufloesung");

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: { canonical: config.path },
};

export default function RegensburgHaushaltsaufloesungPage() {
  return <RegensburgServicePage config={config} />;
}

