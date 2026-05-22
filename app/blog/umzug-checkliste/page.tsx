
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Clock, CalendarDays, UserCircle, CheckSquare, AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const dict = (await getDictionary("de")) as any;
  const pageLocale = "de";
  return generatePageSEO({
    pageLocale,
    path: 'blog/umzug-checkliste',
    title: "Die ultimative Umzug Checkliste | FLOXANT Blog",
    description: "Vom Packen bis zur Ummeldung: Unsere interaktive Umzug Checkliste bewahrt Sie vor dem Chaos.",
  });
}

export default async function BlogUmzugCheckliste() {
  const dict = await getDictionary("de");
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Die ultimative Umzug Checkliste: Zeitplan & Tipps",
    "author": { "@type": "Organization", "name": "FLOXANT Redaktion" },
    "datePublished": "2024-03-26T08:00:00+01:00",
  };
  
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Umzugscheckliste" }
  ];

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <div className="container px-4 max-w-4xl mx-auto pt-10 pb-20 text-slate-900">
        <div className="mb-8"><Breadcrumbs lang="de" items={breadcrumbs} /></div>
        <article>
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
              <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> 26. März 2024</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 Min. Lesezeit</span>
              <span className="flex items-center gap-1"><UserCircle className="w-4 h-4" /> FLOXANT Umzugsprofis</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">
              Die ultimative Umzug Checkliste: Schritt für Schritt zum neuen Zuhause
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed border-s-4 border-blue-600 ps-4">
              Nichts verursacht mehr Stress als ein unkoordinierter Umzug. Mit unserem chronologischen Zeitplan haken Sie alles stressfrei ab.
            </p>
          </header>
          <div className="prose prose-lg md:prose-xl prose-slate max-w-none">
            <p>
              Unsere Erfahrung beweist: Gute Logistik verzeiht fast jeden Fehler – schlechte Planung verzeiht nichts.
            </p>
            <div className="bg-slate-900 text-white p-8 rounded-3xl my-10 shadow-xl">
              <h2 className="text-3xl text-white mt-0 mb-6 flex items-center gap-3"><Clock className="text-blue-500 w-8 h-8" /> Purer Vorlauf (3 Monate vorher)</h2>
              <ul className="space-y-4 list-none ps-0">
                <li className="flex gap-4">
                  <CheckSquare className="w-6 h-6 text-blue-500 shrink-0" />
                  <div>
                    <strong className="block text-lg">Mietvertrag kündigen</strong>
                    <span className="text-slate-400 text-base">Achten Sie auf Ihre Kündigungsfrist im alten Mietvertrag.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <CheckSquare className="w-6 h-6 text-blue-500 shrink-0" />
                  <div>
                    <strong className="block text-lg">Internet & Strom ummelden</strong>
                    <span className="text-slate-400 text-base">Telekommunikationsanbieter brauchen oft wochenlangen Vorlauf.</span>
                  </div>
                </li>
              </ul>
            </div>
            <h2>Die heiße Phase (1 Monat vorher)</h2>
            <div className="bg-slate-50 p-6 rounded-2xl border my-6">
              <ul className="list-none ps-0 space-y-3">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-600" /> Starten Sie mit der Entrümpelung.</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-600" /> Kaufen oder mieten Sie hochwertige Umzugskartons.</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-600" /> Klären Sie Zugang, Laufweg und Parkmöglichkeit.</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-600" /> Einrichten eines Nachsendeauftrags.</li>
              </ul>
            </div>
            <div className="bg-primary/5 p-8 rounded-2xl border-blue-600/20 border mt-12 text-center">
              <Lightbulb className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="mt-0">Haben Sie das Wichtigste schon erledigt?</h3>
              <p className="mb-6">Sichern Sie sich jetzt Ihren Wunschtermin bei FLOXANT.</p>
              <a href="/rechner" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors no-underline">
                Jetzt anfragen
              </a>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
