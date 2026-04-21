import React from 'react';
import DualCalculator from '@/components/calculator/DualCalculator';
import { MapPin } from 'lucide-react';
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { type Locale } from "@/i18n-config";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
  const parts = slug.split('-');
  const service = parts[0]; 
  const city = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : '';
  return generatePageSEO({
    pageLocale: "de" as Locale,
    path: `angebote/${slug}`,
    title: `${service.charAt(0).toUpperCase() + service.slice(1)} Preisrahmen in ${city} | FLOXANT`,
    description: `Unverbindliche Vorprüfung für ${service} in ${city}: Aufwand, Region und Kostentreiber strukturiert einordnen.`,
  });
}
export default async function ProgrammaticSeoCalculator({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const dict = await getDictionary("de");
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
      answer: `Die Kosten für ein ${serviceType} in ${city} hängen von Faktoren wie Distanz, Volumen, Zugang und Zusatzleistungen ab. Der Rechner liefert dafür einen unverbindlichen Orientierungsrahmen.`
    },
    {
      question: `Ist die Einschätzung für ${city} verbindlich?`,
      answer: `Nein. Die Einschätzung ist eine vorläufige Orientierung. Verbindlich wird ein Angebot erst nach finaler Prüfung der Angaben und Abstimmung des Leistungsumfangs.`
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
            Starten Sie eine unverbindliche Vorprüfung für {city}. Ihre Angaben werden strukturiert eingeordnet, damit Aufwand, Region und Kostentreiber verständlich werden.
          </p>
        </header>
        {/* DualCalculator Orchestrator automatically tracks user data now */}
        <section className="relative group mb-16">
          {/* Premium Background Ambient Effects */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
            <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-violet-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-[#0A0C10] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-sm p-4 md:p-8">
              <DualCalculator initialService={serviceType} dic={dict} />
            </div>
          </div>
        </section>
        {/* SEO AUTHORITY LAYER: Micro Case Studies & Geo Signals */}
        <section className="mt-32 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-[#0B0B12] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 end- p-6">
               <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full">Verifiziert</span>
             </div>
             <h3 className="text-2xl font-light mb-6 text-white">Welche Angaben für {city} wichtig sind</h3>
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
                 <span>Orientierungsrahmen:</span> <span className="text-blue-400">nach Vorprüfung</span>
               </li>
             </ul>
           </div>
           <div className="bg-[#0B0B12] border border-white/5 rounded-3xl p-8 content-center shadow-2xl">
             <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
               <MapPin size={32} />
             </div>
             <h3 className="text-2xl font-light mb-4 text-white hover:text-blue-400 transition-colors">Stark vernetzt in Ihrer Region</h3>
             <p className="text-white/60 leading-relaxed max-w-sm">
               Unsere Disponenten koordinieren täglich Routen. Für <strong className="text-white font-medium">{city}</strong> und umliegende Großräume prüfen wir, ob Laufwege, Zugang, Terminlage und mögliche Rückfahrten den Aufwand sinnvoll reduzieren können.
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
                href={`/angebote/${serviceType}-${c.toLowerCase()}-kosten`}
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
