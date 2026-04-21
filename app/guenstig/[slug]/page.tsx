import React from 'react';
import DualCalculator from '@/components/calculator/DualCalculator';
import { Euro, TrendingDown, Target } from 'lucide-react';
import { getDictionary } from "@/get-dictionary";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const dict = await getDictionary("de");
  const parts = slug.split('-');
  const service = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'Umzug';
  const city = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : 'Ihrer Region';
  return {
    title: `Günstiger ${service} in ${city} ab 300€ | FLOXANT Preisrechner`,
    description: `Was kostet ein ${service} in ${city} wirklich? Keine Lockangebote. Transparente Festpreise direkt online berechnen.`,
  };
}
export default async function PriceTrapPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const dict = await getDictionary("de");
  const parts = slug.split('-');
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
        <section className="relative group mb-16">
          {/* Premium Background Ambient Effects */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
            <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-emerald-600/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-teal-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-[#0A0C10] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-sm p-4 md:p-8">
              <DualCalculator initialService={serviceKey} dic={dict} />
            </div>
          </div>
        </section>
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
