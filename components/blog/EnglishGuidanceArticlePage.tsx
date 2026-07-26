import Link from "next/link";
import { ArrowRight, Check, Clock3 } from "lucide-react";

import type { DominanceArticle } from "@/lib/content/dominance-articles";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

export function EnglishGuidanceArticlePage({ article }: { article: DominanceArticle }) {
  const path = `/en/blog/${article.slug}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({ name: article.title, description: article.description, path, about: article.about }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/en" },
        { name: "Guides", item: "/en/blog" },
        { name: article.title, item: path },
      ]),
      { ...buildArticleJsonLd({ headline: article.title, description: article.description, path, datePublished: article.datePublished }), inLanguage: "en" },
      buildFaqJsonLd(article.faqItems),
    ],
  };

  return (
    <main className="bg-slate-50 text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />
      <header className="bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-sm font-bold text-cyan-200">
            <Link href="/en">FLOXANT</Link> <span aria-hidden="true">/</span> <Link href="/en/blog">Guides</Link>
          </nav>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.12em] text-cyan-200">{article.category}</p>
          <h1 className="mt-4 text-4xl font-black leading-[1.05] sm:text-6xl">{article.title}</h1>
          <p className="mt-6 max-w-4xl text-lg font-medium leading-8 text-slate-200">{article.intro}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-slate-300">
            <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" aria-hidden="true" />{article.readTime}</span>
            <span>Reviewed {article.reviewedAt}</span>
            <span>Responsible: {article.owner}</span>
          </div>
        </div>
      </header>

      <article className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-6">
          {article.sections.map((section, index) => (
            <section key={section.title} className={`rounded-3xl border p-6 sm:p-8 ${index === 0 ? "border-cyan-300 bg-cyan-50" : "border-slate-200 bg-white"}`}>
              <h2 className="text-2xl font-black sm:text-3xl">{section.title}</h2>
              <div className="mt-4 grid gap-3 text-base font-medium leading-8 text-slate-700">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {section.bullets.map((item) => <li key={item} className="flex gap-3 font-bold leading-6 text-slate-800"><Check className="mt-0.5 h-5 w-5 shrink-0 text-cyan-800" aria-hidden="true" />{item}</li>)}
                </ul>
              ) : null}
            </section>
          ))}

          <section className="rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
            <h2 className="text-3xl font-black">Related questions</h2>
            <div className="mt-6 grid gap-3">
              {article.faqItems.map((item) => (
                <details key={item.q} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <summary className="cursor-pointer font-black outline-none focus-visible:ring-2 focus-visible:ring-cyan-200">{item.q}</summary>
                  <p className="mt-3 font-medium leading-7 text-slate-200">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <nav aria-label="Next steps" className="grid gap-3 sm:grid-cols-3">
            {article.ctas.map((cta) => (
              <Link key={cta.href} href={cta.href} prefetch={false} className="inline-flex min-h-12 items-center justify-between gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-black outline-none hover:border-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-600">
                {cta.label}
                <ArrowRight className="h-4 w-4 text-cyan-900" aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      </article>
    </main>
  );
}
