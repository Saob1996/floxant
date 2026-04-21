#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function toTitle(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function main() {
  const slug = (process.argv[2] || "").trim();

  if (!slug) {
    console.log("BLOG_GENERATOR_READY");
    console.log("Usage: npm run make:blog -- neuer-artikel-slug");
    console.log("The generator creates a safe draft page. Add the article to lib/blog-posts.ts before publishing.");
    return;
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    console.error("BLOG_GENERATOR_INVALID_SLUG");
    console.error("Use lowercase ASCII letters, numbers and hyphens only.");
    process.exitCode = 1;
    return;
  }

  const targetDir = path.join(ROOT, "app", "blog", slug);
  const targetFile = path.join(targetDir, "page.tsx");

  if (fs.existsSync(targetFile)) {
    console.log(`BLOG_PAGE_EXISTS ${path.relative(ROOT, targetFile)}`);
    return;
  }

  fs.mkdirSync(targetDir, { recursive: true });
  const title = toTitle(slug);
  const content = `import { Metadata } from "next";
import { BlogArticlePage } from "@/components/blog/BlogArticlePage";
import { generatePageSEO } from "@/lib/seo";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
  {
    q: "Welche Frage beantwortet dieser FLOXANT Artikel?",
    a: "Dieser Entwurf sollte vor der Veröffentlichung mit einer konkreten Nutzerfrage, klarer Service-Zuordnung und passendem nächsten Schritt gefüllt werden.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/${slug}",
    title: "${title} | FLOXANT Ratgeber",
    description: "FLOXANT Ratgeberentwurf. Bitte vor Veröffentlichung mit konkreter Suchintention, Servicebezug und Nutzenversprechen schärfen.",
  });
}

export default function GeneratedBlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "${title}",
        description: "FLOXANT Ratgeberentwurf.",
        path: "/blog/${slug}",
        about: ["FLOXANT"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        { name: "${title}", item: "/blog/${slug}" },
      ]),
      buildArticleJsonLd({
        headline: "${title}",
        description: "FLOXANT Ratgeberentwurf.",
        path: "/blog/${slug}",
        datePublished: "2026-04-21",
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogArticlePage
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: "${title}" }]}
        date="21. April 2026"
        readTime="5 Min."
        title="${title}"
        intro="Dieser Entwurf muss vor Veröffentlichung mit echtem Nutzwert ersetzt werden."
        sections={[
          {
            title: "Entwurf prüfen",
            paragraphs: [
              "Dieser Generator legt nur die technische Struktur an. Inhalt, Suchintention, interne Links und FAQ müssen vor dem Deploy redaktionell geprüft werden.",
            ],
          },
        ]}
        ctas={[{ href: "/blog", label: "Zum Blog" }]}
        faqTitle="FAQ"
        faqItems={faqItems}
      />
    </>
  );
}
`;

  fs.writeFileSync(targetFile, content, "utf8");
  console.log(`BLOG_PAGE_CREATED ${path.relative(ROOT, targetFile)}`);
}

main();
