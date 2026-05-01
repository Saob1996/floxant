import { BlogArticlePage } from "@/components/blog/BlogArticlePage";
import type { StrategicBlogArticle } from "@/lib/strategic-blog-articles";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

type StrategicBlogArticleRouteProps = {
  article: StrategicBlogArticle;
};

export function StrategicBlogArticleRoute({ article }: StrategicBlogArticleRouteProps) {
  const path = `/blog/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: article.title,
        description: article.description,
        path,
        about: article.about,
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        { name: article.title, item: path },
      ]),
      buildArticleJsonLd({
        headline: article.title,
        description: article.description,
        path,
        datePublished: article.datePublished,
      }),
      buildFaqJsonLd(article.faqItems),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticlePage
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: article.category },
        ]}
        date={article.date}
        readTime={article.readTime}
        title={article.title}
        intro={article.intro}
        sections={article.sections}
        highlightTitle={article.highlightTitle}
        highlightPoints={article.highlightPoints}
        ctas={article.ctas}
        faqTitle={article.faqTitle}
        faqItems={article.faqItems}
      />
    </>
  );
}
