import { type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import React from 'react';
import DualCalculator from '@/components/calculator/DualCalculator';

export const metadata = {
  title: 'Umzugskosten berechnen 2026 | FLOXANT Rechner',
  description: 'Berechnen Sie sofort Ihre Umzugskosten. Unser Dual-Calculator zeigt Ihnen sekundenschnell eine Schätzung oder berechnet ein millimetergenaues Festprei...',
};

export default async function UmzugKostenRechnerPage({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Umzugskosten Rechner",
    "provider": {
      "@type": "LocalBusiness",
      "name": "FLOXANT",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "DE"
      }
    },
    "description": "Erhalten Sie sofort eine Kostenschätzung für Ihren bevorstehenden Umzug.",
    "serviceType": "MovingCompany"
  };

  return (
    <main className="min-h-screen bg-[#05050A] text-white pt-32 pb-24">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Live Preisberechnung
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
            Was kostet Ihr <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">Umzug?</span>
          </h1>
          <p className="text-white/60 text-lg">
            Transparente Preise in Sekunden. Starten Sie mit der Schnellschätzung 
            oder konfigurieren Sie Ihr verbindliches Festpreis-Angebot.
          </p>
        </header>

        {/* Start Calculator in Umzug Mode */}
        <DualCalculator initialService="umzug" />

        {/* Dynamic SEO Content Layer */}
        <section className="mt-32 max-w-4xl mx-auto prose prose-invert">
          <h2 className="text-3xl font-light">Wie berechnen sich die Umzugskosten bei FLOXANT?</h2>
          <p className="text-white/70">
            Die Berechnung der Umzugskosten hängt von mehreren Faktoren ab. Unser Algorithmus berücksichtigt:
          </p>
          <ul className="text-white/60">
            <li><strong>Die Wohnfläche und Anzahl der Zimmer:</strong> Hiermit ermitteln wir das ungefähre Volumen an Umzugsgut.</li>
            <li><strong>Die Distanz:</strong> Die Entfernung zwischen Auszug und Einzug.</li>
            <li><strong>Stockwerke und Aufzug:</strong> Erschwernisse wie höhere Stockwerke ohne Aufzug wirken sich auf den Preis aus.</li>
            <li><strong>Zusatzleistungen:</strong> Benötigen Sie De- und Montage oder einen Einpackservice?</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
