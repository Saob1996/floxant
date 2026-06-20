import type { Metadata } from "next";

import { StrategicBlogArticleRoute } from "@/components/blog/StrategicBlogArticleRoute";
import { getOfferCheckBlogArticle } from "@/lib/offer-check-blog-articles";
import { generatePageSEO } from "@/lib/seo";

const slug = "reinigungsangebot-pruefen-regensburg-duesseldorf";
const article = getOfferCheckBlogArticle(slug)!;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: `blog/${slug}`,
    title: article.metaTitle,
    description: article.description,
  });
}

export default function ReinigungsangebotPruefenRegensburgDuesseldorfBlogPage() {
  return <StrategicBlogArticleRoute article={article} />;
}
