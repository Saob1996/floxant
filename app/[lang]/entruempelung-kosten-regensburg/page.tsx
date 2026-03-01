import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Calculator } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: "Entrümpelung Kosten Regensburg | Preise & Angebot | FLOXANT",
        description: "Was kostet eine Entrümpelung in Regensburg? Transparente Preise für Haushaltsauflösung, Gewerberäumung & Nachlassräumung. Festpreisangebot von FLOXANT anfordern!",
        alternates: {
            canonical: `https://floxant.de/${lang}/entruempelung-kosten-regensburg`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://floxant.de/${l}/entruempelung-kosten-regensburg`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function EntruempelungKostenRegensburg({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet eine Entrümpelung in Regensburg?", "acceptedAnswer": { "@type": "Answer", "text": "Eine Entrümpelung in Regensburg kostet je nach Umfang zwischen 300 und 3.000 Euro. FLOXANT bietet verbindliche Festpreise nach kostenloser Begehung." } },
            { "@type": "Question", "name": "Ist die Entsorgung im Preis inbegriffen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Fachgerechte Entsorgung, Recycling und besenreine Übergabe sind im Festpreis enthalten." } },
        ],
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Entrümpelung Regensburg", href: `/${lang}/entruempelung-regensburg` }, { label: "Kosten" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
                                        <th className="text-left py-4 px-4 font-semibold">Objektgröße</th>
                                        <th className="text-left py-4 px-4 font-semibold">Preisbereich*</th>
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
                        <h2 className="text-3xl font-bold text-foreground mb-8">Häufige Fragen</h2>
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
                            <Link href={`/${lang}/entruempelung-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Regensburg</Link>
                            <Link href={`/${lang}/entruempelung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Bayern</Link>
                            <Link href={`/${lang}/wohnungsaufloesung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Wohnungsauflösung Bayern</Link>
                            <Link href={`/${lang}/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Kostenloses Angebot anfordern</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Verbindliches Festpreisangebot nach kostenloser Begehung.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
