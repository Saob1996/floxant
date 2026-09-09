import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { company } from "@/lib/company";
import { getPracticalGuide, type PracticalGuide } from "@/lib/practical-guides";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data";

export function buildPracticalGuideMetadata(slug: string): Metadata {
  const guide = getPracticalGuide(slug);
  const canonical = `${company.url}/blog/${slug}`;
  return {
    title: guide.title, description: guide.description,
    alternates: { canonical },
    openGraph: { type: "article", locale: "de_DE", url: canonical, title: guide.title, description: guide.description, modifiedTime: "2026-09-09" },
  };
}

export function PracticalGuidePage({ guide }: { guide: PracticalGuide }) {
  const url = `${company.url}/blog/${guide.slug}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", "@id": `${url}#article`, headline: guide.title, description: guide.description, mainEntityOfPage: url, inLanguage: "de-DE", dateModified: "2026-09-09", ...(!guide.existing ? {datePublished: "2026-09-09"} : {}), author: {"@type":"Organization",name:"FLOXANT",url:company.url} },
      buildBreadcrumbJsonLd([{name:"FLOXANT",item:"/"},{name:"Ratgeber",item:"/blog"},{name:guide.title,item:`/blog/${guide.slug}`}]),
    ],
  };
  return (
    <main className="bg-white px-5 pb-20 pt-28 text-slate-950 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(graph).replace(/</g,"\\u003c")}} />
      <article className="mx-auto max-w-3xl">
        <nav aria-label="Brotkrümelnavigation" className="mb-8 flex flex-wrap gap-2 text-sm text-slate-600"><Link href="/">FLOXANT</Link><span aria-hidden="true">/</span><Link href="/blog">Ratgeber</Link></nav>
        <header className="border-b border-slate-200 pb-9">
          <p className="text-sm font-semibold text-blue-800">FLOXANT Redaktion · Aktualisiert am <time dateTime="2026-09-09">9. September 2026</time></p>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{guide.title}</h1>
          <p className="mt-7 rounded-xl border border-blue-100 bg-blue-50 p-5 text-lg leading-8 text-slate-800">{guide.answer}</p>
        </header>
        <nav aria-label="In diesem Ratgeber" className="py-8"><p className="font-bold">In diesem Ratgeber</p><ol className="mt-3 list-decimal space-y-2 pl-5 text-blue-800">{guide.sections.map((section,index)=><li key={section.title}><a className="underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700" href={`#abschnitt-${index+1}`}>{section.title}</a></li>)}</ol></nav>
        {guide.sections.map((section,index)=><section className="scroll-mt-28 py-6" id={`abschnitt-${index+1}`} key={section.title}><h2 className="text-2xl font-bold leading-snug sm:text-3xl">{section.title}</h2>{section.paragraphs.map(paragraph=><p key={paragraph} className="mt-4 text-base leading-8 text-slate-700">{paragraph}</p>)}{section.bullets?.length ? <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-slate-700">{section.bullets.map(item=><li key={item}>{item}</li>)}</ul> : null}</section>)}
        <footer className="mt-8 rounded-xl bg-slate-950 p-6 text-white"><h2 className="text-2xl font-bold">Passende Unterstützung für Ihr Vorhaben</h2><p className="mt-3 leading-7 text-slate-200">Beschreiben Sie kurz, welche Arbeit Sie abgeben möchten. Den Umfang und ein persönliches Angebot stimmen wir mit Ihnen ab.</p><Link className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-lg bg-white px-5 font-bold text-slate-950" href={guide.serviceHref}>{guide.serviceLabel}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></footer>
      </article>
    </main>
  );
}
