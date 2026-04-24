import { getDictionary } from "@/get-dictionary";
import React from 'react';
import DualCalculator from '@/components/calculator/DualCalculator';
export async function generateMetadata({ params }: { params: Promise<{}> }) {
  const pageLocale = "de";
  const dict = (await getDictionary(pageLocale as any)) as any;
  return {
    title: dict.pages?.calc_reinigung?.meta_title || "FLOXANT",
    description: dict.pages?.calc_reinigung?.meta_desc || "FLOXANT",
  };
}
export default async function ReinigungPreisRechnerPage() {
  var dict = await getDictionary("de");
 return (
  <main className="min-h-screen bg-[#05050A] text-white pt-32 pb-24">
   <div className="max-w-7xl mx-auto px-4 md:px-8">
    <header className="text-center mb-16 max-w-3xl mx-auto">
     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-6">
      <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
      Transparente Preise
     </div>
     <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
      {(dict as any).pages?.calc_reinigung?.h1_pre} <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">{(dict as any).pages?.calc_reinigung?.h1_hi}</span>
     </h1>
     <p className="text-white/60 text-lg">
      {(dict as any).pages?.calc_reinigung?.subtitle}
     </p>
    </header>
    {/* Start Calculator in Reinigung Mode */}
    <DualCalculator initialService="reinigung" />
    {/* Dynamic SEO Content Layer */}
    <section className="mt-32 max-w-4xl mx-auto prose prose-invert">
     <h2 className="text-3xl font-light">{(dict as any).pages?.calc_reinigung?.h2}</h2>
     <p className="text-white/70">
      Wir reinigen transparent nach Aufwand und Fläche. Zu den Faktoren zählen:
     </p>
     <ul className="text-white/60">
      <li><strong>Quadratmeterzahl:</strong> Basis der meisten Reinigungsangebote.</li>
      <li><strong>Verschmutzungsgrad:</strong> Leicht, mittel oder stark entscheidet über die notwendigen Reinigungsstunden.</li>
      <li><strong>Zusatzleistungen:</strong> Wie Tiefenreinigung, Teppichextraktion oder Kalkentfernung.</li>
     </ul>
    </section>
   </div>
  </main>
 );
}
