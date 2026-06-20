import type { Metadata } from "next";

import { company } from "@/lib/company";
import { germanizeText } from "@/lib/german-text";
import type { LocalSeoPageConfig } from "./types";

export function isIndexableLocalSeoPage(page: Pick<LocalSeoPageConfig, "maturity">) {
  return page.maturity.indexStatus === "index" && page.maturity.maturityLevel !== "M0";
}

export function buildLocalSeoCanonical(path: string) {
  return `${company.url}${path}`;
}

export function buildLocalSeoMetadata(page: LocalSeoPageConfig): Metadata {
  const indexable = isIndexableLocalSeoPage(page);
  const canonical = page.path;
  const languages = Object.fromEntries(
    page.languageAlternates.map((alternate) => [alternate.hreflang, alternate.path]),
  );
  const locale = page.locale === "en" ? "en_US" : "de_DE";
  const title = germanizeText(page.metaTitle);
  const description = germanizeText(page.metaDescription);

  return {
    metadataBase: new URL(company.url),
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    robots: {
      index: indexable,
      follow: true,
      googleBot: {
        index: indexable,
        follow: true,
      },
    },
    openGraph: {
      type: "website",
      locale,
      url: canonical,
      title,
      description,
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.jpg"],
    },
  };
}
