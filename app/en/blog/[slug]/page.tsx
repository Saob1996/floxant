import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EnglishGuidanceArticlePage } from "@/components/blog/EnglishGuidanceArticlePage";
import { dominanceEnglishArticles, getDominanceArticle } from "@/lib/content/dominance-articles";
import { company } from "@/lib/company";
import { getRoundThreeBlogArticle, roundThreeEnglishBlogArticles } from "@/lib/round3/blog-articles";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...dominanceEnglishArticles, ...roundThreeEnglishBlogArticles].map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getRoundThreeBlogArticle(slug, "en") || getDominanceArticle(slug, "en");
  if (!article) return {};
  const path = `/en/blog/${article.slug}`;
  return {
    metadataBase: new URL(company.url),
    title: article.metaTitle,
    description: article.description,
    alternates: { canonical: path, languages: { en: path, "x-default": path } },
    openGraph: { type: "article", locale: "en_GB", url: path, title: article.title, description: article.description },
  };
}

export default async function EnglishGuidanceRoute({ params }: Props) {
  const { slug } = await params;
  const article = getRoundThreeBlogArticle(slug, "en") || getDominanceArticle(slug, "en");
  if (!article) notFound();
  return <EnglishGuidanceArticlePage article={article} />;
}
