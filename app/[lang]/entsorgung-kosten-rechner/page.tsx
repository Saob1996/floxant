import React from 'react';
import DualCalculator from '@/components/calculator/DualCalculator';

export const metadata = {
  title: 'Entsorgungskosten berechnen 2026 | FLOXANT Rechner',
  description: 'Berechnen Sie sofort Ihre Entsorgungskosten. Tragen Sie Abfallart und Volumen in unseren Rechner ein für ein verbindliches Festpreis-Angebot. Sofortpreis online berechnen oder bequem per WhatsApp / Telefon anfragen: +49 1577 1105087.',
};

export default function EntsorgungKostenRechnerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Entsorgungskosten Rechner",
    "provider": {
      "@type": "LocalBusiness",
      "name": "FLOXANT",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "DE"
      }
    },
    "description": "Erhalten Sie sofort eine Kostenschätzung für Ihre fachgerechte Entsorgung.",
    "serviceType": "WasteClearance"
  };

  return (
    <main className="min-h-screen bg-[#05050A] text-white pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Ökologisch & Fair
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
            Was kostet Ihre <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">Entsorgung?</span>
          </h1>
          <p className="text-white/60 text-lg">
            Egal ob Sperrmüll, Bauschutt oder kompletter Hausrat. Berechnen Sie Ihren Festpreis direkt online.
          </p>
        </header>

        {/* Start Calculator in Entsorgung Mode */}
        <DualCalculator initialService="entsorgung" />

        {/* Dynamic SEO Content Layer */}
        <section className="mt-32 max-w-4xl mx-auto prose prose-invert">
          <h2 className="text-3xl font-light">Wie berechnen sich die Entsorgungskosten?</h2>
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
