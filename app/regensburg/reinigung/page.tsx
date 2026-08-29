import type { Metadata } from "next";

import { LocalServiceSeoPage } from "@/components/LocalServiceSeoPage";
import { company } from "@/lib/company";
import { getCentralSeoEntry } from "@/lib/content/seo-matrix";
import { getLocalServiceSeoPage } from "@/lib/local-service-seo-pages";
import { getServiceVisual } from "@/lib/service-visuals";

const config = getLocalServiceSeoPage("regensburg-reinigung");
const seo = getCentralSeoEntry(config.path);
const socialVisual = getServiceVisual({
  region: config.cityKey,
  slug: config.key,
  path: config.path,
  serviceLabel: config.serviceName,
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: seo.activeTitle,
  description: seo.metaDescription,
  alternates: {
    canonical: config.path,
    languages: {
      "de-DE": config.path,
      en: "/en/regensburg/cleaning",
      "x-default": config.path,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: config.path,
    title: seo.ogTitle,
    description: seo.ogDescription,
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
    title: seo.ogTitle,
    description: seo.ogDescription,
    images: [socialVisual.src],
  },
};

export default function RegensburgReinigungPage() {
  return <LocalServiceSeoPage config={config} />;
}
