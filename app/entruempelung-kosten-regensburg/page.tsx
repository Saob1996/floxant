import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/get-dictionary";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import DualCalculator from "@/components/calculator/DualCalculator";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { generatePageSEO } from "@/lib/seo";
export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "entruempelung-kosten-regensburg",
    title: "Entrümpelung Kosten Regensburg | Preisrahmen & Faktoren",
    description:
      "Was beeinflusst Entrümpelungskosten in Regensburg? Volumen, Zugang, Materialarten, Entsorgung und unverbindlicher Preisrahmen verständlich erklärt.",
  });
}
export default async function EntrümpelungKostenRegensburg() {
  const pageLocale = "de";
  var dict = await getDictionary("de");
  const content = (dict as any)?.pages?.service_entruempelung || {};
  const faqJsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
        { "@type": "Question", "name": content.faqs?.[0]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[0]?.a } },
        { "@type": "Question", "name": content.faqs?.[1]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[1]?.a } }
      ],
  };
  const localBusinessJsonLd = {
    "@context": "https://schema.org", "@type": "LocalBusiness",
    "name": "FLOXANT Entrümpelung Regensburg",
    "url": `https://www.floxant.de/entruempelung-kosten-regensburg`,
    "telephone": "+4915771105087",
    "address": { "@type": "PostalAddress", "streetAddress": "Johanna-Kinkel-Straße 1 + 2", "addressLocality": "Regensburg", "postalCode": "93049", "addressCountry": "DE" },
    "areaServed": { "@type": "City", "name": "Regensburg" }
  };
  const serviceJsonLd = {
    "@context": "https://schema.org", "@type": "Service",
    "serviceType": "Entrümpelung, Haushaltsauflösung",
    "provider": { "@type": "LocalBusiness", "name": "FLOXANT Entrümpelung Regensburg", "telephone": "+4915771105087" },
    "areaServed": { "@type": "City", "name": "Regensburg" }
  };
  const breadcrumbsJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://www.floxant.de/` },
      { "@type": "ListItem", "position": 2, "name": "Entrümpelung Regensburg", "item": `https://www.floxant.de/regensburg/entruempelung` },
      { "@type": "ListItem", "position": 3, "name": "Kosten", "item": `https://www.floxant.de/entruempelung-kosten-regensburg` }
    ]
  };
  return (
    <main className="min-h-screen bg-background">
      <Breadcrumbs lang="de" items={[{ label: "Entrümpelung Regensburg", href: `/regensburg/entruempelung` }, { label: "Kosten" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />
      <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Calculator className="w-4 h-4" /><span>Kosten Entrümpelung Regensburg</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Entrümpelung Kosten in <span className="text-primary">Regensburg</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transparent kalkuliert, fair eingeordnet. FLOXANT zeigt nachvollziehbare Preisrahmen für Entrümpelungen in Regensburg und Umgebung.
          </p>
        </div>
      </section>
   <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-24">
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <h2 className="text-3xl font-bold text-foreground mb-6">Was kostet eine Entrümpelung in Regensburg?</h2>
            <p>Die Kosten einer Entrümpelung hängen von der Größe des Objekts, dem Füllgrad und der Art der zu entsorgenden Gegenstände ab. Sondermüll, Elektrogeräte und Sperrmüll haben unterschiedliche Entsorgungskosten. FLOXANT kalkuliert transparent und erstellt nach Prüfung ein konkretes, individuell abgestimmtes Angebot.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">Orientierungspreise Entrümpelung Regensburg</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-start py-4 px-4 font-semibold">Objektgröße</th>
                    <th className="text-start py-4 px-4 font-semibold">Preisbereich*</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/30"><td className="py-4 px-4">Keller / Dachboden</td><td className="py-4 px-4 font-medium">ab 300 €</td></tr>
                  <tr className="border-b border-border/30"><td className="py-4 px-4">1-Zimmer-Wohnung</td><td className="py-4 px-4 font-medium">ab 500 €</td></tr>
                  <tr className="border-b border-border/30"><td className="py-4 px-4">2-Zimmer-Wohnung</td><td className="py-4 px-4 font-medium">ab 900 €</td></tr>
                  <tr className="border-b border-border/30"><td className="py-4 px-4">3-Zimmer-Wohnung</td><td className="py-4 px-4 font-medium">ab 1.400 €</td></tr>
                  <tr><td className="py-4 px-4">Haus / Gewerbefläche</td><td className="py-4 px-4 font-medium">ab 2.000 €</td></tr>
                </tbody>
              </table>
              <p className="text-xs text-muted-foreground mt-4">* Unverbindliche Orientierungswerte. Entsorgung, Recycling und Übergabe hängen vom konkreten Material- und Objektzustand ab.</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8">{dict.common.faq_title}</h2>
            <div className="space-y-6">
              {[
                { q: "Was kostet eine Entrümpelung in Regensburg?", a: "Je nach Umfang kann der Rahmen deutlich variieren. Nach Prüfung von Volumen, Materialarten und Zugang erhalten Sie ein konkretes Angebot." },
                { q: "Ist die Entsorgung im Preis enthalten?", a: "Ja. Alle Entsorgungskosten, Recycling und besenreine Übergabe sind inklusive." },
                { q: "Gibt es Wertanrechnung?", a: "Brauchbare Möbel und Elektrogeräte können ggf. den Preis reduzieren. Wir prüfen das bei der Begehung." },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                  <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-border pt-12">
            <div className="flex flex-wrap gap-4">
              <Link href={`/regensburg/entruempelung`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Regensburg</Link>
              <Link href={`/entruempelung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Bayern</Link>
              <Link href={`/wohnungsaufloesung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Wohnungsauflösung Bayern</Link>
              <Link href={`/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
            </div>
          </div>
          <div id="rechner" className="bg-slate-900 py-24 px-6 rounded-[3rem] relative overflow-hidden border border-white/5 shadow-2xl scroll-mt-24">
            {/* Premium Background Ambient Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
              <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-violet-600/20 blur-[120px] rounded-full animate-pulse" />
              <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
            <div className="max-w-4xl mx-auto relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Unverbindliche Vorprüfung starten</h2>
              <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
                Der Rechner hilft bei der ersten Einordnung. Die finale Kalkulation erfolgt nach Prüfung der konkreten Objekt- und Materialdaten.
              </p>
              <DualCalculator dic={dict} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
