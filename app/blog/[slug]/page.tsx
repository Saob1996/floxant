import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StrategicBlogArticleRoute } from "@/components/blog/StrategicBlogArticleRoute";
import { aiRecommendationBlogArticles } from "@/lib/ai-recommendation-blog-articles";
import { getOfferCheckBlogArticle } from "@/lib/offer-check-blog-articles";
import { generatePageSEO } from "@/lib/seo";
import { getStrategicBlogArticle } from "@/lib/strategic-blog-articles";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function getArticle(slug: string) {
  return (
    aiRecommendationBlogArticles.find((article) => article.slug === slug) ||
    getOfferCheckBlogArticle(slug) ||
    getStrategicBlogArticle(slug)
  );
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return generatePageSEO({
      lang: "de",
      path: `blog/${slug}`,
      title: "FLOXANT Blog",
      description: "FLOXANT Ratgeber zu Umzug, Reinigung, Entrümpelung, Angebotsprüfung und Servicefällen.",
    });
  }

  return generatePageSEO({
    lang: "de",
    path: `blog/${slug}`,
    title: article.metaTitle,
    description: article.description,
    keywords: article.keywords,
  });
}

export default async function DynamicBlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  return <StrategicBlogArticleRoute article={article} />;
}
