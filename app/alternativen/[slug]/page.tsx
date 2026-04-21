import React from 'react';
import DualCalculator from '@/components/calculator/DualCalculator';
import { Check, X, Shield, Clock, TrendingDown } from 'lucide-react';
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { type Locale } from "@/i18n-config";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const pageLocale = "de";
    const parts = slug.split('-');
    const competitor = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'anderen Anbietern';
    const city = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : 'Ihrer Region';
    return generatePageSEO({
        pageLocale: pageLocale as Locale,
        path: `alternativen/${slug}`,
        title: `Die bessere Alternative zu ${competitor} in ${city} | FLOXANT`,
        description: `Warum FLOXANT die ideale Wahl gegenüber ${competitor} in ${city} ist. 100% Festpreis, keine versteckten Kosten.`,
    });
}
export default async function AlternativenPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const pageLocale = "de";
    const dict = await getDictionary("de");
  const parts = slug.split('-');
  const competitor = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'Wettbewerbern';
  const city = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : 'Ihrer Stadt';
  return (
    <main className="min-h-screen bg-[#05050A] text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-6">
            Ehrlicher Vergleich
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-6">
            Suchen Sie nach <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">{competitor} in {city}?</span>
          </h1>
          <p className="text-lg text-white/60">
            Bevor Sie blind buchen, vergleichen Sie die echten Kosten. FLOXANT berechnet Ihren Festpreis durch intelligente Datenalgorithmen – ganz ohne versteckte Gebühren.
          </p>
        </header>
        {/* The VS Matrix */}
        <section className="max-w-4xl mx-auto mb-20 bg-[#0B0B12] rounded-3xl border border-white/5 overflow-hidden">
          <div className="grid grid-cols-3 bg-white/5 p-4 border-b border-white/10 text-center font-medium">
            <div className="text-start ps- text-white/40">Kriterium</div>
            <div className="text-white/60">{competitor}</div>
            <div className="text-blue-400 font-bold text-xl drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">FLOXANT</div>
          </div>
          <div className="divide-y divide-white/5">
            {[
              { label: 'Preisbildung', comp: 'Mögliche Nachverhandlung', flox: `100% ${dict.calculator?.fixed_price_tag || 'Festpreis'}` },
              { label: 'Tarife', comp: 'Statischer Preis', flox: 'Intelligentes 3-Tier System' },
              { label: 'Wartezeit', comp: 'Bis zu 48h auf Angebot', flox: 'Sofortige KI-Kalkulation' },
              { label: 'Disposition', comp: 'Manuelle Subunternehmer', flox: 'Cluster-Optimierte Flotten' }
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 p-4 text-center items-center hover:bg-white/5 transition-colors">
                 <div className="text-start ps- text-white/70 text-sm">{row.label}</div>
                 <div className="text-red-400/80 text-sm flex flex-col items-center gap-1">
                   {row.comp}
                 </div>
                 <div className="text-emerald-400 text-sm font-medium flex flex-col items-center gap-1">
                   <div className="bg-emerald-500/10 p-1 rounded-full"><Check size={16} /></div>
                   {row.flox}
                 </div>
              </div>
            ))}
          </div>
        </section>
        {/* Immediately push user into the funnel to prove the point */}
        <section id="proof" className="relative group mt-20 py-24 px-6 rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
          {/* Premium Background Ambient Effects */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
            <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-red-600/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-orange-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Überzeugen Sie sich selbst.</h2>
            <p className="text-white/60 text-lg mb-12">Berechnen Sie in 60 Sekunden Ihren Preis für {city}.</p>
            <div className="relative group-calc">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-[2.5rem] blur-xl opacity-0 group-calc-hover:opacity-100 transition duration-1000" />
              <div className="relative bg-[#0A0C10] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-sm p-4 md:p-8 text-start">
                <DualCalculator dic={dict} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
