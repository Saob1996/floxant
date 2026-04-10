import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale, isValidLocale } from "../../../i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Calculator, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const pageLocale: Locale = lang;
    const dict = await getDictionary(pageLocale);
    const content = dict.pages?.umzugskosten_bayern || {};

    return generatePageSEO({
        pageLocale,
        path: "umzugskosten-bayern",
        title: content.meta_title || "Umzugskosten Bayern | Preise & Festpreisangebot | FLOXANT",
        description: content.meta_desc || "Was kostet ein Umzug in Bayern? Preisübersicht für Regensburg, Nürnberg, München.",
    });
}

export default async function UmzugskostenBayern({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const pageLocale: Locale = lang;
    const dict = await getDictionary(pageLocale);
    const content = dict.pages?.umzugskosten_bayern || {};
    const isDe = pageLocale === "de";

    const faqItems = content.faqs || [];
    const faqJsonLd = faqItems.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
        }))
    } : null;

    const breadcrumbs = [
        { label: "Umzug Bayern", href: `/${pageLocale}/umzug-bayern` },
        { label: "Umzugskosten" }
    ];

    return (
        <main className="min-h-screen bg-background text-start">
            <Breadcrumbs lang={pageLocale} items={breadcrumbs} />
            {faqJsonLd && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            )}

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <Calculator className="w-4 h-4" />
                        <span>Preisübersicht Bayern</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
                        Umzugskosten in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Transparente Festpreise statt böser Überraschungen. FLOXANT kalkuliert fair und verbindlich – für jeden Umzug in Bayern.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground text-start">
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
                                        <th className="text-start py-4 px-4 font-semibold">Wohnungsgröße</th>
                                        <th className="text-start py-4 px-4 font-semibold">Preisbereich*</th>
                                        <th className="text-start py-4 px-4 font-semibold">Leistungen</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted-foreground">
                                    <tr className="border-b border-border/30">
                                        <td className="py-4 px-4">1-Zimmer / Studio</td>
                                        <td className="py-4 px-4 font-medium">ab 400 €</td>
                                        <td className="py-4 px-4">Transport, 2 Personen, Versicherung</td>
                                    </tr>
                                    <tr className="border-b border-border/30">
                                        <td className="py-4 px-4">2-Zimmer-Wohnung</td>
                                        <td className="py-4 px-4 font-medium">ab 700 €</td>
                                        <td className="py-4 px-4">Transport, 2-3 Personen, Versicherung</td>
                                    </tr>
                                    <tr className="border-b border-border/30">
                                        <td className="py-4 px-4">3-Zimmer-Wohnung</td>
                                        <td className="py-4 px-4 font-medium">ab 1.100 €</td>
                                        <td className="py-4 px-4">Transport, 3 Personen, Schutzverpackung</td>
                                    </tr>
                                    <tr className="border-b border-border/30">
                                        <td className="py-4 px-4">4+ Zimmer / Haus</td>
                                        <td className="py-4 px-4 font-medium">ab 1.800 €</td>
                                        <td className="py-4 px-4">Full-Service Transport, 3-4 Personen</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4">Fernumzug (ab Bayern)</td>
                                        <td className="py-4 px-4 font-medium">ab 1.500 €</td>
                                        <td className="py-4 px-4">Langstrecke, Festpreis-Garantie</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="text-xs text-muted-foreground mt-4 italic">
                                * Unverbindliche Richtwerte. Der tatsächliche Preis wird nach kostenloser Besichtigung individuell kalkuliert.
                            </p>
                        </div>
                    </div>

                    {faqItems.length > 0 && (
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-8 text-start">Häufige Fragen zu Umzugskosten</h2>
                            <div className="space-y-6">
                                {faqItems.map((item, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50 text-start">
                                        <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                                        <p className="text-muted-foreground">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {isDe && (
                        <div className="border-t border-border pt-12">
                            <h3 className="text-lg font-semibold mb-6">Verwandte Themen</h3>
                            <div className="flex flex-wrap gap-4 text-start">
                                <Link href={`/${pageLocale}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                                <Link href={`/${pageLocale}/studentenumzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Studentenumzug Regensburg</Link>
                                <Link href={`/${pageLocale}/entruempelung-kosten-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Kosten Regensburg</Link>
                                <Link href={`/${pageLocale}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                            </div>
                        </div>
                    )}

                    <div id="rechner" className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-4">Kostenloses Festpreisangebot</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Unverbindlich und transparent. In 24 Stunden erhalten Sie Ihr individuelles Angebot für Ihren Umzug in Bayern.
                        </p>
                        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl">
                            <div className="p-4 md:p-8 text-start">
                                <SmartBookingWizard
                                    dict={{
                                        common: dict.common,
                                        calculator: dict.calculator,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
