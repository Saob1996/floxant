import React from 'react';
import DualCalculator from '@/components/calculator/DualCalculator';
import { Euro, TrendingDown, Target } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const parts = params.slug.split('-');
  const service = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'Umzug';
  const city = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : 'Ihrer Region';

  return {
    title: `Günstiger ${service} in ${city} ab 300€ | FLOXANT Preisrechner`,
    description: `Was kostet ein ${service} in ${city} wirklich? Keine Lockangebote. Transparente Festpreise direkt online berechnen.`,
  };
}

export default function PriceTrapPage({ params }: { params: { slug: string } }) {
  const parts = params.slug.split('-');
  const service = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'Umzug';
  const serviceKey = parts[0]?.toLowerCase() as 'umzug' | 'reinigung' | 'entsorgung' || 'umzug';
  const city = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : 'Ihrer Stadt';

  return (
    <main className="min-h-screen bg-[#05050A] text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <header className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Target size={14} /> Günstigste Marktpreise
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
            Was kostet ein <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">{service} in {city}</span> wirklich?
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Vorsicht vor unseriösen Lockangeboten unter 200€. Nutzen Sie unser intelligentes System, um den echten, garantierten Tiefstpreis direkt zu ermitteln.
          </p>
        </header>

        <DualCalculator initialService={serviceKey} />

        {/* Trust injection to override skepticism of "cheap" searches */}
        <section className="mt-24 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { title: 'Tiefpreis durch KI', desc: 'Wir gleichen Preise in Echtzeit mit dem Marktdurchschnitt in '+city+' ab.', i: TrendingDown },
             { title: '0€ Nachträgliche Kosten', desc: 'Sie zahlen den generierten Tarif. Nachverhandlungen ausgeschlossen.', i: Euro },
             { title: 'Leerfahrten-Rabatt', desc: 'Durch Flottenbündelung geben wir Logistikvorteile direkt an Sie weiter.', i: Target }
           ].map((t, idx) => (
             <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
               <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                 <t.i size={20} />
               </div>
               <h3 className="text-white font-medium mb-2">{t.title}</h3>
               <p className="text-white/50 text-sm">{t.desc}</p>
             </div>
           ))}
        </section>

      </div>
    </main>
  );
}
