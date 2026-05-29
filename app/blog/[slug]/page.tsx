import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StrategicBlogArticleRoute } from "@/components/blog/StrategicBlogArticleRoute";
import { aiRecommendationBlogArticles } from "@/lib/ai-recommendation-blog-articles";
import { getOfferCheckBlogArticle, offerCheckBlogArticles } from "@/lib/offer-check-blog-articles";
import {
  getPsychologicalCleaningBlogArticle,
  getPsychologicalCleaningBlogArticleSlugs,
} from "@/lib/psychological-cleaning-pages";
import { generatePageSEO } from "@/lib/seo";
import { getStrategicBlogArticle, strategicBlogArticles } from "@/lib/strategic-blog-articles";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function getArticle(slug: string) {
  return (
    aiRecommendationBlogArticles.find((article) => article.slug === slug) ||
    getOfferCheckBlogArticle(slug) ||
    getPsychologicalCleaningBlogArticle(slug) ||
    getStrategicBlogArticle(slug)
  );
}

export function generateStaticParams() {
  const slugs = new Set([
    ...aiRecommendationBlogArticles.map((article) => article.slug),
    ...offerCheckBlogArticles.map((article) => article.slug),
    ...strategicBlogArticles.map((article) => article.slug),
    ...getPsychologicalCleaningBlogArticleSlugs(),
  ]);

  return Array.from(slugs).map((slug) => ({ slug }));
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
