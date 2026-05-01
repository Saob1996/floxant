import type { Metadata } from "next";

import { StrategicBlogArticleRoute } from "@/components/blog/StrategicBlogArticleRoute";
import { generatePageSEO } from "@/lib/seo";
import { getStrategicBlogArticle } from "@/lib/strategic-blog-articles";

const slug = "studenten-umzug-wohnungsuebergabe";
const article = getStrategicBlogArticle(slug)!;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: `blog/${slug}`,
    title: article.metaTitle,
    description: article.description,
    keywords: article.keywords,
  });
}

export default function StudentenUmzugWohnungsuebergabeBlogPage() {
  return <StrategicBlogArticleRoute article={article} />;
}
