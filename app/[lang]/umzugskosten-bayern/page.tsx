import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Calculator, CheckCircle2 } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: "Umzugskosten Bayern | Preise & Festpreisangebot | FLOXANT",
        description: "Was kostet ein Umzug in Bayern? Preisübersicht für Regensburg, Nürnberg, München. Transparente Festpreise ohne versteckte Kosten. Jetzt kostenloses Angebot anfordern!",
        alternates: {
            canonical: `https://floxant.de/${lang}/umzugskosten-bayern`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://floxant.de/${l}/umzugskosten-bayern`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function UmzugskostenBayern({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in Bayern?", "acceptedAnswer": { "@type": "Answer", "text": "Ein lokaler Umzug in Bayern kostet je nach Volumen zwischen 400 und 2.500 Euro. FLOXANT bietet verbindliche Festpreise nach kostenloser Besichtigung." } },
            { "@type": "Question", "name": "Gibt es versteckte Kosten bei FLOXANT?", "acceptedAnswer": { "@type": "Answer", "text": "Nein. Unser Festpreis umfasst alle vereinbarten Leistungen: Transport, Verpackungsmaterial, Versicherung und Personal." } },
            { "@type": "Question", "name": "Wie bekomme ich ein Angebot?", "acceptedAnswer": { "@type": "Answer", "text": "Über unser Online-Formular oder telefonisch. Nach einer Besichtigung (vor Ort oder per Video-Call) erhalten Sie ein verbindliches Angebot." } },
        ],
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Umzugskosten" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <Calculator className="w-4 h-4" /><span>Preisübersicht Bayern</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzugskosten in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Transparente Festpreise statt böser Überraschungen. FLOXANT kalkuliert fair und verbindlich – für jeden Umzug in Bayern.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Was kostet ein Umzug in Bayern?</h2>
                        <p>Die Kosten eines Umzugs hängen von vielen Faktoren ab: Wohnungsgröße, Etage, Entfernung, Zeitpunkt und gewünschte Zusatzleistungen. FLOXANT bietet daher keine pauschalen Online-Preise, sondern individuelle Festpreisangebote nach einer kostenlosen Besichtigung.</p>
                        <p>Als Orientierung haben wir typische Preisspannen für Umzüge in Bayern zusammengestellt:</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-8">Orientierungspreise (lokaler Umzug)</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-4 px-4 font-semibold">Wohnungsgröße</th>
                                        <th className="text-left py-4 px-4 font-semibold">Preisbereich*</th>
                                        <th className="text-left py-4 px-4 font-semibold">Enthaltene Leistungen</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted-foreground">
                                    <tr className="border-b border-border/30"><td className="py-4 px-4">1-Zimmer / Studio</td><td className="py-4 px-4 font-medium">ab 400 €</td><td className="py-4 px-4">Transport, 2 Mann, Versicherung</td></tr>
                                    <tr className="border-b border-border/30"><td className="py-4 px-4">2-Zimmer-Wohnung</td><td className="py-4 px-4 font-medium">ab 700 €</td><td className="py-4 px-4">Transport, 2-3 Mann, Versicherung</td></tr>
                                    <tr className="border-b border-border/30"><td className="py-4 px-4">3-Zimmer-Wohnung</td><td className="py-4 px-4 font-medium">ab 1.100 €</td><td className="py-4 px-4">Transport, 3 Mann, Versicherung, Verpackung</td></tr>
                                    <tr className="border-b border-border/30"><td className="py-4 px-4">4+ Zimmer / Haus</td><td className="py-4 px-4 font-medium">ab 1.800 €</td><td className="py-4 px-4">Transport, 3-4 Mann, Versicherung, Verpackung</td></tr>
                                    <tr><td className="py-4 px-4">Fernumzug (Bayern → NRW)</td><td className="py-4 px-4 font-medium">ab 1.500 €</td><td className="py-4 px-4">Langstreckentransport, Festpreis</td></tr>
                                </tbody>
                            </table>
                            <p className="text-xs text-muted-foreground mt-4">* Unverbindliche Richtwerte. Der tatsächliche Preis wird nach kostenloser Besichtigung individuell kalkuliert.</p>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Häufige Fragen zu Umzugskosten</h2>
                        <div className="space-y-6">
                            {[
                                { q: "Was kostet ein Umzug in Bayern?", a: "Ein lokaler Umzug kostet je nach Volumen zwischen 400 und 2.500 Euro. FLOXANT bietet verbindliche Festpreise nach kostenloser Besichtigung." },
                                { q: "Gibt es versteckte Kosten?", a: "Nein. Unser Festpreis umfasst alle vereinbarten Leistungen: Transport, Material, Versicherung und Personal. Was vereinbart ist, gilt." },
                                { q: "Wie bekomme ich ein Angebot?", a: "Über unser Online-Formular oder telefonisch. Nach einer Besichtigung (vor Ort oder per Video-Call) erhalten Sie binnen 24 Stunden ein verbindliches Angebot." },
                                { q: "Sind Studentenrabatte möglich?", a: "Ja, wir bieten flexible Lösungen für Studierende – z.B. reinen Bordsteinkante-Transport ohne Verpackungsservice." },
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                                    <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                                    <p className="text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Verwandte Seiten</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/studentenumzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Studentenumzug Regensburg</Link>
                            <Link href={`/${lang}/entruempelung-kosten-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Kosten Regensburg</Link>
                            <Link href={`/${lang}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Kostenloses Festpreisangebot</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Unverbindlich und transparent. In 24 Stunden erhalten Sie Ihr individuelles Angebot.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
