import type { Metadata } from "next";

import { StrategicBlogArticleRoute } from "@/components/blog/StrategicBlogArticleRoute";
import { getOfferCheckBlogArticle } from "@/lib/offer-check-blog-articles";
import { generatePageSEO } from "@/lib/seo";

const slug = "umzugsangebot-pruefen-regensburg-bayern";
const article = getOfferCheckBlogArticle(slug)!;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: `blog/${slug}`,
    title: article.metaTitle,
    description: article.description,
  });
}

export default function UmzugsangebotPruefenRegensburgBayernBlogPage() {
  return <StrategicBlogArticleRoute article={article} />;
}
