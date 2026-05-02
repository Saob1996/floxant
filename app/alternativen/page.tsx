import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from "next/link";
import { generatePageSEO } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{}> }) {
  return generatePageSEO({
    lang: "de",
    path: "alternativen",
    title: "FLOXANT vs. Wettbewerber | Der ehrliche Vergleich | Umzug Bayern",
    description: "FLOXANT im Vergleich: nachvollziehbarer Preisrahmen, klare Leistungen und strukturierte Umzugsplanung in Bayern.",
  });
}
export default async function AlternativenLandingPage() {
  return (
    <main className="min-h-screen bg-[#05050A] text-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-8">
          <ShieldCheck size={18} /> FLOXANT Vergleich
        </div>
        <h1 className="text-4xl md:text-6xl font-light mb-8">
          Die <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">transparente</span> Alternative.
        </h1>
        <p className="text-xl text-white/60 mb-12 leading-relaxed">
          Suchen Sie nach anderen Anbietern? Vergleichen Sie Leistungen, Ablauf und Preisrahmen, bevor Sie sich entscheiden. FLOXANT setzt auf ehrliche Einschätzung, klare Zuständigkeit und saubere Abstimmung.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
          {[
            { title: "Klarer als viele Pauschalen", slug: "anbieter-regensburg", desc: "Wie Leistungsumfang, Preisrahmen und nächster Schritt besser vergleichbar werden." },
            { title: "Service im Vergleich", slug: "umzugsfirma-bayern", desc: "Warum ein strukturierter Ablauf oft hilfreicher ist als starre Pauschalaussagen." },
          ].map((item) => (
            <Link 
              key={item.slug} 
              href={`/alternativen/${item.slug}`}
              className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all"
            >
              <h3 className="text-xl font-medium mb-2 group-hover:text-orange-400 transition-colors">{item.title}</h3>
              <p className="text-white/40 text-sm mb-4">{item.desc}</p>
              <div className="flex items-center gap-2 text-orange-400 font-medium">
                Zum Vergleich <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
