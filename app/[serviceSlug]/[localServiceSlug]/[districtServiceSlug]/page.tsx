import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocalSeoPage } from "@/components/local-seo/LocalSeoPage";
import {
  getLocalSeoPageByPath,
  getThreeSegmentLocalSeoPages,
} from "@/lib/local-seo/localSeoPages";
import { buildLocalSeoMetadata } from "@/lib/local-seo/seoMetadata";

type PageProps = {
  params: Promise<{
    serviceSlug: string;
    localServiceSlug: string;
    districtServiceSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getThreeSegmentLocalSeoPages().map((page) => {
    const [serviceSlug, localServiceSlug, districtServiceSlug] = page.path.split("/").filter(Boolean);
    return { serviceSlug, localServiceSlug, districtServiceSlug };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceSlug, localServiceSlug, districtServiceSlug } = await params;
  const page = getLocalSeoPageByPath(`/${serviceSlug}/${localServiceSlug}/${districtServiceSlug}`);
  if (!page) notFound();

  return buildLocalSeoMetadata(page);
}

export default async function DistrictServicePage({ params }: PageProps) {
  const { serviceSlug, localServiceSlug, districtServiceSlug } = await params;
  const page = getLocalSeoPageByPath(`/${serviceSlug}/${localServiceSlug}/${districtServiceSlug}`);
  if (!page) notFound();

  return <LocalSeoPage page={page} />;
}
