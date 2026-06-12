import type { Metadata } from "next";

import { LocalServiceSeoPage } from "@/components/LocalServiceSeoPage";
import { company } from "@/lib/company";
import { getLocalServiceSeoPage } from "@/lib/local-service-seo-pages";
import { getServiceVisual } from "@/lib/service-visuals";

const config = getLocalServiceSeoPage("regensburg-gewerbereinigung");
const socialVisual = getServiceVisual({
  region: config.cityKey,
  slug: config.key,
  path: config.path,
  serviceLabel: config.serviceName,
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: config.metaTitle,
  description: config.metaDescription,
  keywords: [config.mainKeyword, ...config.secondaryKeywords],
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

export default function RegensburgGewerbereinigungPage() {
  return <LocalServiceSeoPage config={config} />;
}
