import { type Locale } from "@/i18n-config";
import React from 'react';
import DualCalculator from '@/components/calculator/DualCalculator';
import { MapPin } from 'lucide-react';
import { getDictionary } from "../../../../get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lang: string }> }) {
    var { lang: pageLocale, slug } = await params;
    var dict = await getDictionary(pageLocale as Locale);
  const parts = slug.split('-');
  
  const service = parts[0]; 
  const city = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : '';
  
  return {
    title: `${service.charAt(0).toUpperCase() + service.slice(1)} Kosten in ${city} berechnen | FLOXANT`,
    description: `Sofortige Preisberechnung für ${service} in ${city}. Transparente 3-Tier Angebote ohne versteckte Kosten. 4.9/5 auf Google Bewertungen.`,
  };
}

export default async function ProgrammaticSeoCalculator({ params }: { params: Promise<{ slug: string; lang: string }> }) {
    var { lang: pageLocale, slug } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.service_umzug || {};
  const parts = slug.split('-');
  
  const serviceRaw = parts[0]?.toLowerCase(); 
  const city = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : 'Ihrer Stadt';
  
  let serviceType: 'umzug' | 'reinigung' | 'entsorgung' = 'umzug';
  if (serviceRaw === 'reinigung' || serviceRaw === 'entsorgung') {
    serviceType = serviceRaw;
  }

  const faqs = [
    {
      question: `Was kostet ein ${serviceType} in ${city}?`,
      answer: `Die Kosten für ein ${serviceType} in ${city} hängen von Faktoren wie Distanz, Volumen und Zusatzleistungen ab. Nutzen Sie unseren Rechner für einen sekundenschnellen Festpreis.`
    },
    {
      question: `Bieten Sie in ${city} Festpreise an?`,
      answer: `Ja, unser intelligentes System generiert für Sie verbindliche 3-Tier Festpreise (Economy, Balanced, Premium) direkt online für ${city}.`
    }
  ];

  

  return (
    <main className="min-h-screen bg-[#05050A] text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Lokal in {city}
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight capitalize">
            {serviceType} <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">Kosten in {city}</span>
          </h1>
          <p className="text-white/60 text-lg">
            Sichern Sie sich Ihr maßgeschneidertes Angebot für {city}. Unser Algorithmus berechnet in Echtzeit den besten Tarif.
          </p>
        </header>

        {/* DualCalculator Orchestrator automatically tracks user data now */}
        <DualCalculator initialService={serviceType} />

        {/* SEO AUTHORITY LAYER: Micro Case Studies & Geo Signals */}
        <section className="mt-32 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-[#0B0B12] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 end- p-6">
               <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full">Verifiziert</span>
             </div>
             <h3 className="text-2xl font-light mb-6 text-white">Letzter {serviceType} in {city}</h3>
             <ul className="space-y-4 text-sm text-white/60">
               <li className="flex justify-between items-center border-b border-white/5 pb-3">
                 <span>Objekt / Umfang:</span> <span className="text-white font-medium">75m² Wohnung / Mittel</span>
               </li>
               <li className="flex justify-between items-center border-b border-white/5 pb-3">
                 <span>Einsatzteam:</span> <span className="text-white font-medium flex items-center gap-2">3 Experten</span>
               </li>
               <li className="flex justify-between items-center border-b border-white/5 pb-3">
                 <span>Fazit Dauer:</span> <span className="text-white font-medium">4.5 Stunden gesamt</span>
               </li>
               <li className="flex justify-between items-center pt-2 font-medium text-base">
                 <span>Gebuchter Festpreis:</span> <span className="text-blue-400">890€ (Balanced Tarif)</span>
               </li>
             </ul>
           </div>
           
           <div className="bg-[#0B0B12] border border-white/5 rounded-3xl p-8 content-center shadow-2xl">
             <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
               <MapPin size={32} />
             </div>
             <h3 className="text-2xl font-light mb-4 text-white hover:text-blue-400 transition-colors">Stark vernetzt in Ihrer Region</h3>
             <p className="text-white/60 leading-relaxed max-w-sm">
               Unsere Disponenten koordinieren täglich Flotten. Diese Woche waren wir besonders aktiv in den angrenzenden Bereichen von <strong className="text-white font-medium">{city}</strong> sowie umliegenden Großräumen, wodurch wir Leerfahrten vermeiden und Ihnen Bestpreise sichern.
             </p>
           </div>
        </section>

        {/* Dynamic SEO Auto-FAQ Layer */}
        <section className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-8">Häufige Fragen zu {city}</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <h3 className="text-xl font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-white/60">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Linking Engine */}
        <section className="mt-24 border-t border-white/10 pt-16">
          <h3 className="text-sm uppercase tracking-widest text-white/40 mb-6 text-center">In der Nähe berechnen</h3>
          <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
            {['München', 'Augsburg', 'Ingolstadt', 'Regensburg', 'Nürnberg'].filter(c => c !== city).map(c => (
              <a 
                key={c} 
                href={`/de/angebote/${serviceType}-${c.toLowerCase()}-kosten`}
                className="px-5 py-2.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all text-sm"
              >
                {serviceType} in {c}
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
