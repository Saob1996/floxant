import type { Metadata } from "next";

import { RegensburgServicePage } from "@/components/regensburg/RegensburgServicePage";
import { company } from "@/lib/company";
import { getRegensburgServicePage } from "@/lib/regensburg-service-pages";
import { getServiceVisual } from "@/lib/service-visuals";

const config = getRegensburgServicePage("entruempelung");
const socialVisual = getServiceVisual({
  region: "regensburg",
  slug: config.slug,
  path: config.path,
  serviceLabel: config.serviceType,
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: {
    canonical: config.path,
    languages: {
      "de-DE": config.path,
      "x-default": config.path,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: config.path,
    title: config.metaTitle,
    description: config.metaDescription,
    images: [
      {
        url: socialVisual.src,
        width: 1200,
        height: 630,
        alt: socialVisual.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.metaTitle,
    description: config.metaDescription,
    images: [socialVisual.src],
  },
};

export default function RegensburgEntruempelungPage() {
  return <RegensburgServicePage config={config} />;
}
