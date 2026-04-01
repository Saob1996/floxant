import { type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import React from 'react';
import DualCalculator from '@/components/calculator/DualCalculator';

export const metadata = {
  title: 'Reinigungskosten berechnen 2026 | FLOXANT Rechner',
  description: 'Berechnen Sie sofort Ihre Reinigungskosten. Ob Grundreinigung oder Spezialauftrag – unser Dual-Calculator zeigt Ihnen sekundenschnell ein Festpreis-An...',
};

export default async function ReinigungPreisRechnerPage({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Reinigungskosten Rechner",
    "provider": {
      "@type": "LocalBusiness",
      "name": "FLOXANT",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "DE"
      }
    },
    "description": "Erhalten Sie sofort eine Kostenschätzung für Ihre professionelle Reinigung.",
    "serviceType": "CleaningService"
  };

  return (
    <main className="min-h-screen bg-[#05050A] text-white pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Transparente Preise
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
            Ihre <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">Reinigungskosten</span> berechnen
          </h1>
          <p className="text-white/60 text-lg">
            Sekundenschnell zur ersten Schätzung oder millimetergenau zum garantierten Festpreis.
          </p>
        </header>

        {/* Start Calculator in Reinigung Mode */}
        <DualCalculator initialService="reinigung" />

        {/* Dynamic SEO Content Layer */}
        <section className="mt-32 max-w-4xl mx-auto prose prose-invert">
          <h2 className="text-3xl font-light">Kostenfaktoren der professionellen Reinigung</h2>
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
