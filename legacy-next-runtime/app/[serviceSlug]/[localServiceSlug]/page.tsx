import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocalSeoPage } from "@/components/local-seo/LocalSeoPage";
import {
  getLocalSeoPageByPath,
  getTwoSegmentLocalSeoPages,
} from "@/lib/local-seo/localSeoPages";
import { buildLocalSeoMetadata } from "@/lib/local-seo/seoMetadata";

type PageProps = {
  params: Promise<{
    serviceSlug: string;
    localServiceSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getTwoSegmentLocalSeoPages()
    .filter((page) => page.type === "cityService")
    .map((page) => {
      const [serviceSlug, localServiceSlug] = page.path.split("/").filter(Boolean);
      return { serviceSlug, localServiceSlug };
    });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceSlug, localServiceSlug } = await params;
  const page = getLocalSeoPageByPath(`/${serviceSlug}/${localServiceSlug}`);
  if (!page) notFound();

  return buildLocalSeoMetadata(page);
}

export default async function LocalCityServicePage({ params }: PageProps) {
  const { serviceSlug, localServiceSlug } = await params;
  const page = getLocalSeoPageByPath(`/${serviceSlug}/${localServiceSlug}`);
  if (!page) notFound();

  return <LocalSeoPage page={page} />;
}
