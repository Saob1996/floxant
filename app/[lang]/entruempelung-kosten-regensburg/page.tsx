import { i18n } from "@/i18n-config";
import { type Locale } from "@/i18n-config";
import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
const DualCalculator = dynamic(
    () => import("@/components/calculator/DualCalculator"),
    { loading: () => <div className="w-full max-w-7xl mx-auto min-h-[400px] animate-pulse bg-white/5 rounded-3xl" /> }
);

import Link from "next/link";
import { Calculator } from "lucide-react";



export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = dict?.pages?.entruempelung_kosten_regensburg || {};
    return {
        title: content.meta_title,
        description: 'description: content.meta_desc || Was kostet eine Entrümpelung in Regensburg? Transparente Preise für Haushaltsauflösung, Gewerberäumung & Nachlassräu...',
        alternates: {
            canonical: `https://floxant.de/${pageLocale}/entruempelung-kosten-regensburg`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://floxant.de/${l}/entruempelung-kosten-regensburg`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function EntruempelungKostenRegensburg({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
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
        "url": `https://www.floxant.de/${pageLocale}/entruempelung-kosten-regensburg`,
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "streetAddress": "Johanna-Kinkel-Straße 1 + 2", "addressLocality": "Regensburg", "postalCode": "93049", "addressCountry": "DE" },
        "areaServed": { "@type": "City", "name": "Regensburg" },
        "priceRange": "$$"
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
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://www.floxant.de/${pageLocale}` },
            { "@type": "ListItem", "position": 2, "name": "Entrümpelung Regensburg", "item": `https://www.floxant.de/${pageLocale}/entruempelung-regensburg` },
            { "@type": "ListItem", "position": 3, "name": "Kosten", "item": `https://www.floxant.de/${pageLocale}/entruempelung-kosten-regensburg` }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs pageLocale={pageLocale} items={[{ label: "Entrümpelung Regensburg", href: `/${pageLocale}/entruempelung-regensburg` }, { label: "Kosten" }]} />
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
                        Transparent kalkuliert, fair bepreist. FLOXANT bietet verbindliche Festpreise für Entrümpelungen in Regensburg und Umgebung.
                    </p>
                </div>
            </section>

            
      <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Was kostet eine Entrümpelung in Regensburg?</h2>
                        <p>Die Kosten einer Entrümpelung hängen von der Größe des Objekts, dem Füllgrad und der Art der zu entsorgenden Gegenstände ab. Sondermüll, Elektrogeräte und Sperrmüll haben unterschiedliche Entsorgungskosten. FLOXANT kalkuliert transparent und bietet nach einer kostenlosen Begehung ein verbindliches Festpreisangebot.</p>
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
                            <p className="text-xs text-muted-foreground mt-4">* Inkl. Entsorgung, Recycling, besenreine Übergabe. Individuelle Kalkulation nach Begehung.</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">{dict.common.faq_title}</h2>
                        <div className="space-y-6">
                            {[
                                { q: "Was kostet eine Entrümpelung in Regensburg?", a: "Je nach Umfang zwischen 300 und 3.000+ Euro. Nach kostenloser Begehung erhalten Sie ein verbindliches Festpreisangebot." },
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
                            <Link href={`/${pageLocale}/entruempelung-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Regensburg</Link>
                            <Link href={`/${pageLocale}/entruempelung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Bayern</Link>
                            <Link href={`/${pageLocale}/wohnungsaufloesung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Wohnungsauflösung Bayern</Link>
                            <Link href={`/${pageLocale}/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Kostenloses Angebot anfordern</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Verbindliches Festpreisangebot nach kostenloser Begehung.</p>
                        <DualCalculator dic={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
