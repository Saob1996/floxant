import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Compass, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import { getDictionary } from "@/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
 const dict = (await getDictionary("de")) as any;

 return generatePageSEO({
  lang: "de",
  path: "ratgeber",
  title: dict.ratgeber?.meta_title || "Ratgeber für Umzug, Reinigung und Entrümpelung | FLOXANT",
  description:
   dict.ratgeber?.meta_desc ||
   "Praxisnahe Ratgeber, Checklisten und Kostenhilfen für Umzug, Reinigung und Entrümpelung in Regensburg und Bayern.",
 });
}

const articleSlugs = [
 "umzug-kosten-regensburg",
 "checkliste-umzug",
 "gute-umzugsfirma-finden",
 "entruempelung-kosten-pro-m3",
 "umzug-vorbereiten-7-schritte",
 "wann-lohnt-sich-umzugsfirma",
 "moebeltransport-sicher",
 "umzug-tipps-familien",
 "reinigung-nach-umzug",
 "umzug-kosten-rechner",
 "umzug-anmelden-ummelden",
 "umzug-versicherung",
 "wohnungsaufloesung-tipps",
 "umzug-im-winter",
 "umzug-erste-wohnung",
];

export default async function RatgeberPage() {
 const dict = (await getDictionary("de")) as any;

 return (
  <main className="min-h-screen bg-[#07111f] text-white">
   <Breadcrumbs items={[{ label: "Ratgeber" }]} />

   <section className="px-6 pb-16 pt-8">
    <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] px-8 py-12 shadow-2xl shadow-black/30">
     <div className="max-w-3xl space-y-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
       <BookOpen className="h-4 w-4" />
       {dict.ratgeber?.title || "FLOXANT Ratgeber"}
      </div>

      <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
       Checklisten, Kostenwissen und klare Antworten für Umzug und Serviceplanung
      </h1>

      <p className="max-w-2xl text-lg leading-relaxed text-white/50">
       Der FLOXANT Ratgeber sammelt die stärksten Hilfen für Umzug, Reinigung und Entrümpelung in Regensburg
       und Bayern. Statt Fuelltext finden Sie hier direkt nutzbare Anleitungen, Preislogik und operative Tipps.
      </p>
     </div>

     <div className="mt-10 grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
       <Compass className="h-4 w-4 text-blue-400" />
       <h2 className="mt-4 text-lg font-semibold text-white">Praxisnah statt generisch</h2>
       <p className="mt-2 text-sm leading-relaxed text-white/45">
        Inhalte mit echtem Nutzwert für Planung, Kostenrahmen und regionale Besonderheiten.
       </p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
       <Sparkles className="h-4 w-4 text-blue-400" />
       <h2 className="mt-4 text-lg font-semibold text-white">Regensburg und Bayern im Fokus</h2>
       <p className="mt-2 text-sm leading-relaxed text-white/45">
        Regionale Einordnung für Parken, Zugang, Terminfenster und typische Einsatzarten.
       </p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
       <BookOpen className="h-4 w-4 text-blue-400" />
       <h2 className="mt-4 text-lg font-semibold text-white">Direkte Einstiege</h2>
       <p className="mt-2 text-sm leading-relaxed text-white/45">
        Jeder Beitrag führt sauber weiter zu Rechner, Services oder passenden Spezialseiten.
       </p>
      </div>
     </div>
    </div>
   </section>

   <section className="px-6 pb-20">
    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.6fr_0.7fr]">
     <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {articleSlugs.map((slug) => {
       const dictKey = slug.replace(/-/g, "_");
       const articleData = (dict.ratgeber?.articles as Record<string, any>)?.[dictKey] || {};

       return (
        <Link
         key={slug}
         href={`/ratgeber/${slug}`}
         className="group rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.04]"
        >
         <h2 className="text-lg font-semibold text-white transition-colors group-hover:text-blue-300">
          {articleData.title || slug}
         </h2>
         <p className="mt-3 text-sm leading-relaxed text-white/45">{articleData.desc || "Praxisnahe Einordnung und direkte Hilfe für die weitere Planung."}</p>
         <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
          {dict.ratgeber?.read_more || "Weiterlesen"}
         </span>
        </Link>
       );
      })}
     </div>

     <aside className="space-y-6">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6">
       <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Content Hub</p>
       <h2 className="mt-4 text-2xl font-semibold text-white">Mehr aktuelle Blogthemen</h2>
       <p className="mt-3 text-sm leading-relaxed text-white/45">
        Neben dem Ratgeber gibt es jetzt auch einen zentralen Blog-Hub mit neuen Beitragen zu Beiladung,
        Endreinigung und regionaler Einsatzplanung.
       </p>
       <Link
        href="/blog"
        className="mt-6 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300 transition-all hover:bg-blue-500/20"
       >
        Zum Blog
       </Link>
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6">
       <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Direkter Einstieg</p>
       <div className="mt-5 space-y-3">
        <Link href="/rechner" className="block rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-white hover:border-blue-400/20">
         FLOXANT Rechner
        </Link>
        <Link href="/umzug" className="block rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-white hover:border-blue-400/20">
         Umzug
        </Link>
        <Link href="/reinigung" className="block rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-white hover:border-blue-400/20">
         Reinigung
        </Link>
        <Link href="/entruempelung" className="block rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-white hover:border-blue-400/20">
         Entrümpelung
        </Link>
       </div>
      </div>
     </aside>
    </div>
   </section>
  </main>
 );
}
