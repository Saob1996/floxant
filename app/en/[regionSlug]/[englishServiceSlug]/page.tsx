import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocalSeoPage } from "@/components/local-seo/LocalSeoPage";
import {
  getEnglishLocalSeoPageByPath,
  getEnglishLocalSeoServicePages,
} from "@/lib/local-seo/englishLocalSeoPages";
import { buildLocalSeoMetadata } from "@/lib/local-seo/seoMetadata";

type PageProps = {
  params: Promise<{
    regionSlug: string;
    englishServiceSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getEnglishLocalSeoServicePages().map((page) => {
    const [, regionSlug, englishServiceSlug] = page.path.split("/").filter(Boolean);
    return { regionSlug, englishServiceSlug };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { regionSlug, englishServiceSlug } = await params;
  const page = getEnglishLocalSeoPageByPath(`/en/${regionSlug}/${englishServiceSlug}`);
  if (!page) notFound();

  return buildLocalSeoMetadata(page);
}

export default async function EnglishLocalServicePage({ params }: PageProps) {
  const { regionSlug, englishServiceSlug } = await params;
  const page = getEnglishLocalSeoPageByPath(`/en/${regionSlug}/${englishServiceSlug}`);
  if (!page) notFound();

  return <LocalSeoPage page={page} />;
}
