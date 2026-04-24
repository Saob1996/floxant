import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type FaqItem = {
 q: string;
 a: string;
};

type ContentSection = {
 title: string;
 paragraphs: string[];
 bullets?: string[];
};

type CtaLink = {
 href: string;
 label: string;
};

interface BlogArticlePageProps {
 breadcrumbs: Array<{ label: string; href?: string }>;
 date: string;
 readTime: string;
 title: string;
 intro: string;
 highlightTitle?: string;
 highlightPoints?: string[];
 sections: ContentSection[];
 ctas: CtaLink[];
 faqTitle: string;
 faqItems: FaqItem[];
}

export function BlogArticlePage({
 breadcrumbs,
 date,
 readTime,
 title,
 intro,
 highlightTitle,
 highlightPoints = [],
 sections,
 ctas,
 faqTitle,
 faqItems,
}: BlogArticlePageProps) {
 return (
  <main className="min-h-screen overflow-hidden bg-[#070A12] text-white">
   <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.13),transparent_32%),radial-gradient(circle_at_85%_16%,rgba(14,165,233,0.08),transparent_30%)]" />
   <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-10">
    <div className="mb-8">
     <Breadcrumbs items={breadcrumbs} />
    </div>

    <article className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] shadow-2xl shadow-black/40">
     <header className="relative border-b border-white/10 p-8 md:p-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />
      <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-white/45">
       <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
        <CalendarDays className="h-4 w-4" /> {date}
       </span>
       <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
        <Clock className="h-4 w-4" /> {readTime} Lesezeit
       </span>
      </div>
      <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">{title}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/58">{intro}</p>
     </header>

     <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
      <div className="p-8 md:p-12">
       <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-h2:text-2xl prose-p:leading-relaxed prose-p:text-white/62">
        {sections.map((section) => (
         <div key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
           <p key={paragraph}>{paragraph}</p>
          ))}
          {section.bullets?.length ? (
           <div className="not-prose grid gap-4 md:grid-cols-2">
            {section.bullets.map((item) => (
             <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-start gap-3">
               <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-300" />
               <p className="m-0 text-sm leading-relaxed text-white/62">{item}</p>
              </div>
             </div>
            ))}
           </div>
          ) : null}
         </div>
        ))}
       </div>

       {highlightPoints.length ? (
        <section className="mt-12 rounded-[1.75rem] border border-blue-300/20 bg-blue-500/10 p-6">
         <h2 className="text-2xl font-semibold tracking-tight text-white">
          {highlightTitle || "Kurz gesagt"}
         </h2>
         <div className="mt-6 grid gap-4 md:grid-cols-3">
          {highlightPoints.map((item) => (
           <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <CheckCircle2 className="mb-3 h-5 w-5 text-blue-300" />
            <p className="text-sm leading-relaxed text-white/68">{item}</p>
           </div>
          ))}
         </div>
        </section>
       ) : null}

       <section className="mt-14 border-t border-white/10 pt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-white">{faqTitle}</h2>
        <div className="mt-6 space-y-4">
         {faqItems.map((item) => (
          <div key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
           <h3 className="text-lg font-semibold text-white">{item.q}</h3>
           <p className="mt-3 text-sm leading-relaxed text-white/58">{item.a}</p>
          </div>
         ))}
        </div>
       </section>
      </div>

      <aside className="border-t border-white/10 bg-black/20 p-8 lg:border-l lg:border-t-0">
       <div className="sticky top-28">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">
         Nächster Schritt
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/50">
         Wenn das Thema gerade passt, führt der schnellste Weg über den passenden Rechner oder die Spezialseite.
        </p>
        <div className="mt-6 space-y-3">
         {ctas.map((item) => (
          <Link
           key={item.href}
           href={item.href}
           className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-white/78 transition-all hover:border-blue-300/30 hover:bg-blue-500/10 hover:text-white"
          >
           {item.label}
           <ArrowRight className="h-4 w-4 text-blue-300 transition-transform group-hover:translate-x-1" />
          </Link>
         ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
         <div className="text-sm font-semibold text-white">FLOXANT Prinzip</div>
         <p className="mt-3 text-xs leading-relaxed text-white/45">
          Erst klären, dann planen: Service, Umfang, Zugang, Region und Preisrahmen werden getrennt sichtbar gemacht.
         </p>
        </div>
       </div>
      </aside>
     </div>
    </article>
   </div>
  </main>
 );
}
