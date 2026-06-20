import type { Metadata } from "next";

import { StrategicBlogArticleRoute } from "@/components/blog/StrategicBlogArticleRoute";
import { generatePageSEO } from "@/lib/seo";
import { getStrategicBlogArticle } from "@/lib/strategic-blog-articles";

const slug = "wohnungsuebergabe-komplettpaket";
const article = getStrategicBlogArticle(slug)!;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: `blog/${slug}`,
    title: article.metaTitle,
    description: article.description,
  });
}

export default function WohnungsuebergabeKomplettpaketBlogPage() {
  return <StrategicBlogArticleRoute article={article} />;
}
