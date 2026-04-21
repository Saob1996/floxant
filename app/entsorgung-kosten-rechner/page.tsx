import { getDictionary } from "@/get-dictionary";
import React from 'react';
import DualCalculator from '@/components/calculator/DualCalculator';
export async function generateMetadata({ params }: { params: Promise<{}> }) {
    const pageLocale = "de";
    const dict = (await getDictionary(pageLocale as any)) as any;
    return {
        title: dict.pages?.calc_entsorgung?.meta_title || "FLOXANT",
        description: dict.pages?.calc_entsorgung?.meta_desc || "FLOXANT",
    };
}
export default async function EntsorgungKostenRechnerPage() {
    var dict = await getDictionary("de");
  return (
    <main className="min-h-screen bg-[#05050A] text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Ökologisch & Fair
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
            {(dict as any).pages?.calc_entsorgung?.h1_pre} <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">{(dict as any).pages?.calc_entsorgung?.h1_hi}</span>
          </h1>
          <p className="text-white/60 text-lg">
            {(dict as any).pages?.calc_entsorgung?.subtitle}
          </p>
        </header>
        {/* Start Calculator in Entsorgung Mode */}
        <DualCalculator initialService="entsorgung" />
        {/* Dynamic SEO Content Layer */}
        <section className="mt-32 max-w-4xl mx-auto prose prose-invert">
          <h2 className="text-3xl font-light">{(dict as any).pages?.calc_entsorgung?.h2}</h2>
          <p className="text-white/70">
            Jede Entsorgung ist einzigartig. Um Ihnen einen fairen Preis zu bieten, analysiert unser Rechner:
          </p>
          <ul className="text-white/60">
            <li><strong>Das Volumen:</strong> In Kubikmetern gemessen.</li>
            <li><strong>Die Abfallarten:</strong> Sondermüll oder Bauschutt sind in der Verwertung teurer als Altmetall.</li>
            <li><strong>Die Erreichbarkeit:</strong> Lange Tragewege erhöhen den Zeitaufwand unserer Flotte.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
