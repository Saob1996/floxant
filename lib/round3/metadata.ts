import type { Metadata } from "next";

import { company } from "@/lib/company";
import { getRoundThreeService, type RoundThreeLocale, type RoundThreeServiceKey } from "@/lib/round3/service-matrix";

export function roundThreeMetadata(serviceKey: RoundThreeServiceKey, locale: RoundThreeLocale): Metadata {
  const service = getRoundThreeService(serviceKey);
  const content = service.metadata[locale];
  const path = service.path[locale];
  return {
    metadataBase: new URL(company.url),
    title: content.activeTitle,
    description: content.metaDescription,
    alternates: {
      canonical: path,
      languages: { "de-DE": service.path.de, en: service.path.en, "x-default": service.path.de },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: company.name,
      locale: locale === "de" ? "de_DE" : "en_US",
      url: path,
      title: content.ogTitle,
      description: content.ogDescription,
      images: [{ url: "/assets/floxant-hero-neu-gedacht.png", width: 1200, height: 630, alt: content.h1 }],
    },
    twitter: { card: "summary_large_image", title: content.ogTitle, description: content.ogDescription, images: ["/assets/floxant-hero-neu-gedacht.png"] },
  };
}
