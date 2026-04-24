import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import { blogPosts } from "@/lib/blog-posts";

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog",
  title: "FLOXANT Blog | Umzug, Reinigung und Preiswissen aus Bayern",
  description:
   "Praxisnahe FLOXANT Artikel zu Umzug, Reinigung, Entrümpelung, Preisvorstellung, Express-Anfragen und Signatur-Services in Regensburg und Bayern.",
 });
}

export default function BlogHubPage() {
 const featuredPosts = blogPosts.filter((post) => post.featured);
 const blogHubFaqItems = [
  {
   q: "Welche FLOXANT Ratgeber helfen vor einer Anfrage am meisten?",
   a: "Am hilfreichsten sind Artikel zu Preisrahmen, Service-Kombination, Umzugskosten, Endreinigung, Beiladung und Preisvorstellung. Sie erklären die Entscheidung, bevor der Rechner gestartet wird.",
  },
  {
   q: "Warum gibt es Artikel zu Preisrahmen statt nur Preislisten?",
   a: "Weil Umzug, Reinigung und Entrümpelung stark von Zugang, Umfang, Region, Terminlage und Zusatzleistungen abhängen. Der Blog erklärt diese Faktoren in Kundensprache.",
  },
  {
   q: "Wie geht es nach dem Lesen weiter?",
   a: "Je nach Thema führt der nächste Schritt zum Rechner, zur Preisvorstellung, zum Kombiservice oder direkt zu einer Hauptservice-Seite.",
  },
 ];

 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "FLOXANT Blog",
    description:
     "Blogbeiträge zu Umzug, Reinigung, Entrümpelung, Beiladung, Preisvorstellung und Serviceplanung in Regensburg und Bayern.",
    path: "/blog",
    about: [
     "Umzug",
     "Reinigung",
     "Entrümpelung",
     "Beiladung",
     "Preisvorstellung",
     "Regensburg",
     "Bayern",
    ],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
   ]),
   buildFaqJsonLd(blogHubFaqItems),
   {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FLOXANT Blogartikel",
    itemListElement: blogPosts.map((post, index) => ({
     "@type": "ListItem",
     position: index + 1,
     url: `https://www.floxant.de/blog/${post.slug}`,
     name: post.title,
     description: post.description,
    })),
   },
  ],
 };

 return (
  <main className="min-h-screen bg-background">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <Breadcrumbs items={[{ label: "Blog" }]} />

   <section className="px-6 pb-12 pt-8">
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-8 py-12 shadow-2xl shadow-black/30 md:px-12 md:py-16">
     <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-3xl">
       <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
        <BookOpen className="h-4 w-4" />
        FLOXANT Blog
       </div>
       <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">
        Leitfäden für Services, Signatur-Services und Preisvorstellung
       </h1>
       <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/50">
        Der Blog ergänzt die Service-Seiten mit echten Praxisfragen: Was kostet ein Umzug
        realistisch, wann lohnt sich Beiladung, wie funktioniert ein Kombiservice und wie
        sinnvoll ist eine Preisvorstellung in der Anfrage?
       </p>
       <div className="mt-8 flex flex-wrap gap-3">
        <Link
         href="/rechner"
         className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
        >
         Zum Rechner
         <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
         href="/anfrage-mit-preisrahmen"
         className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/[0.08] hover:text-white"
        >
         Preisvorstellung senden
        </Link>
       </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
       {[
        "Klare Artikel für Umzug, Reinigung und Entrümpelung",
        "Eigene Beiträge für Preisvorstellung, Express und Kombi-Services",
        "Saubere interne Wege vom Lesen zur Anfrage",
       ].map((point) => (
        <div key={point} className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
         <Sparkles className="mb-3 h-5 w-5 text-blue-300" />
         <p className="text-sm leading-relaxed text-white/65">{point}</p>
        </div>
       ))}
      </div>
     </div>
    </div>
   </section>

   <section className="px-6 pb-10">
    <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
     {[
      { href: "/umzug", title: "Umzug", text: "Kosten, Ablauf, Beiladung und Expressfälle besser verstehen." },
      { href: "/reinigung", title: "Reinigung", text: "Übergabe, Endreinigung und Kombiservices sauber einordnen." },
      { href: "/anfrage-mit-preisrahmen", title: "Preisvorstellung", text: "Budget, Orientierungsrahmen und Anfrage-Logik nachvollziehen." },
     ].map((item) => (
      <Link
       key={item.href}
       href={item.href}
       className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-blue-400/20"
      >
       <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">Themenpfad</div>
       <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">{item.title}</h2>
       <p className="mt-4 text-sm leading-relaxed text-white/45">{item.text}</p>
      </Link>
     ))}
    </div>
   </section>

   <section className="px-6 pb-12">
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.12),rgba(255,255,255,0.025))] p-7 md:p-9">
     <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
       <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">Lesen mit nächstem Schritt</div>
       <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Vom Ratgeber direkt zur passenden Entscheidung</h2>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-white/48 md:text-right">
       Die Artikel sind nicht als Textarchiv gedacht, sondern als klare Wege vom Problem zur Vorprüfung.
      </p>
     </div>
     <div className="grid gap-4 md:grid-cols-4">
      {[
       { step: "01", title: "Problem verstehen", text: "Kosten, Ablauf, Region oder Zusatzservice einordnen." },
       { step: "02", title: "Passenden Service wählen", text: "Umzug, Reinigung, Entrümpelung oder Spezialweg." },
       { step: "03", title: "Preisrahmen prüfen", text: "Rechner oder Preisvorstellung ohne harte Preisversprechen." },
       { step: "04", title: "Anfrage vorbereiten", text: "Daten so erfassen, dass FLOXANT realistisch planen kann." },
      ].map((item) => (
       <div key={item.step} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">{item.step}</div>
        <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/45">{item.text}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   <section className="px-6 pb-12">
    <div className="mx-auto max-w-7xl">
     <div className="mb-8 flex items-end justify-between gap-6">
      <div>
       <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">Empfohlen</div>
       <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Die stärksten Einstiegsartikel</h2>
      </div>
     </div>
     <div className="grid gap-6 lg:grid-cols-3">
      {featuredPosts.map((article) => (
       <Link
        key={article.slug}
        href={`/blog/${article.slug}`}
        className="group rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-7 transition-all hover:-translate-y-1 hover:border-blue-400/20"
       >
        <div className="flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
         <span>{article.category}</span>
         <span className="inline-flex items-center gap-1">
          <Clock3 className="h-3.5 w-3.5" />
          {article.readTime}
         </span>
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-blue-300">
         {article.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-white/45">{article.description}</p>
        <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
         Artikel lesen
        </span>
       </Link>
      ))}
     </div>
    </div>
   </section>

   <section className="px-6 pb-20">
    <div className="mx-auto max-w-7xl">
     <div className="mb-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">Alle Beiträge</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Blog-Cluster für Suchintention und Nutzerführung</h2>
     </div>
     <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {blogPosts.map((article) => (
       <Link
        key={article.slug}
        href={`/blog/${article.slug}`}
        className="group rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.04]"
       >
        <div className="flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
         <span>{article.category}</span>
         <span className="inline-flex items-center gap-1">
          <Clock3 className="h-3.5 w-3.5" />
          {article.readTime}
         </span>
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-blue-300">
         {article.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-white/45">{article.description}</p>
        <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
         Weiterlesen
        </span>
       </Link>
      ))}
     </div>
    </div>
   </section>

   <section className="border-t border-white/5 px-6 py-20">
    <div className="mx-auto max-w-5xl">
     <div className="mb-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">FAQ</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Häufige Fragen zu den FLOXANT Ratgebern</h2>
     </div>
     <div className="space-y-4">
      {blogHubFaqItems.map((item) => (
       <div key={item.q} className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6">
        <h3 className="text-lg font-semibold text-white">{item.q}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/50">{item.a}</p>
       </div>
      ))}
     </div>
    </div>
   </section>
  </main>
 );
}
