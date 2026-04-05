import { type Locale } from "@/i18n-config";
import React from 'react';
import DualCalculator from '@/components/calculator/DualCalculator';
import { Check, X, Shield, Clock, TrendingDown } from 'lucide-react';
import { getDictionary } from "../../../../get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ slug: string, lang: string }> }) {
    var { lang: pageLocale, slug } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    
    const content = (dict?.pages as any)?.[slug] || {};
  const parts = slug.split('-');
  const competitor = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'anderen Anbietern';
  const city = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : 'Ihrer Region';

  return {
    title: `Die bessere Alternative zu ${competitor} in ${city} | FLOXANT`,
    description: 'Warum FLOXANT die ideale Wahl gegenüber $... in $... ist. 100% $..., keine versteckt...',
  };
}

export default async function AlternativenPage({ params }: { params: Promise<{ slug: string, lang: string }> }) {
    var { lang: pageLocale, slug } = await params;
    var dict = await getDictionary(pageLocale as Locale);
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
              { label: 'Preisbildung', comp: 'Mögliche Nachverhandlung', flox: '100% {dict.calculator?.fixed_price_tag}' },
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
        <section className="max-w-5xl mx-auto text-center border-t border-white/10 pt-20">
          <h2 className="text-3xl font-light mb-8">Überzeugen Sie sich selbst.</h2>
          <p className="text-white/50 mb-12">Berechnen Sie in 60 Sekunden Ihren Preis für {city}.</p>
          <DualCalculator dic={dict} />
        </section>
        
      </div>
    </main>
  );
}
