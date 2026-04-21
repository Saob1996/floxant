import { Metadata } from "next";
import { getDictionary } from "@/get-dictionary";
import { type Locale } from "@/i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import { notFound } from "next/navigation";
import { Calculator, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
export async function generateMetadata(): Promise<Metadata> {
    const pageLocale = "de";
    const dict = await getDictionary("de");
    const content = dict.pages?.umzugskosten_bayern || {};
    return generatePageSEO({
        pageLocale: pageLocale as any,
        path: "umzugskosten-bayern",
        title: "Umzugskosten Bayern | Preisrahmen & Faktoren | FLOXANT",
        description: content.meta_desc || "Was kostet ein Umzug in Bayern? Preisübersicht für Regensburg, Nürnberg, München.",
    });
}
export default async function UmzugskostenBayern() {
    const pageLocale: Locale = "de";
    const dict = await getDictionary("de");
    const content = dict.pages?.umzugskosten_bayern || {};
    const isDe = pageLocale === "de";
    const normalizePriceCopy = (value: string) =>
        value
            .replace(/Festpreisangebot/g, "Angebot nach Prüfung")
            .replace(/Festpreis-Garantie/g, "saubere Vorprüfung")
            .replace(/Festpreisgarantie/g, "saubere Vorprüfung")
            .replace(/Festpreise/g, "Preisrahmen")
            .replace(/Festpreis/g, "Preisrahmen")
            .replace(/verbindliche Preisrahmen/g, "konkrete Angebote");
    const faqItems = (content.faqs || []).map((item: { q: string; a: string }) => ({
        q: normalizePriceCopy(item.q),
        a: normalizePriceCopy(item.a),
    }));
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
        { label: "Umzug Bayern", href: `/umzug-bayern` },
        { label: "Umzugskosten" }
    ];
    return (
        <main className="min-h-screen bg-background text-start">
            <Breadcrumbs lang="de" items={breadcrumbs} />
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
                        Nachvollziehbare Preisrahmen statt böser Überraschungen. FLOXANT kalkuliert fair, transparent und auf Basis Ihrer konkreten Angaben.
                    </p>
                </div>
            </section>
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground text-start">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Was kostet ein Umzug in Bayern?</h2>
                        <p>Die Kosten eines Umzugs hängen von vielen Faktoren ab: Wohnungsgröße, Etage, Entfernung, Zeitpunkt und gewünschte Zusatzleistungen. FLOXANT zeigt deshalb zuerst einen unverbindlichen Orientierungsrahmen und erstellt das konkrete Angebot nach Prüfung der Details.</p>
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
                                        <td className="py-4 px-4">Langstrecke, individuelle Kalkulation</td>
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
                                <Link href={`/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                                <Link href={`/studentenumzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Studentenumzug Regensburg</Link>
                                <Link href={`/entruempelung-kosten-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Kosten Regensburg</Link>
                                <Link href={`/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                            </div>
                        </div>
                    )}
                    <div id="rechner" className="bg-slate-900 py-24 rounded-3xl border border-white/5 shadow-2xl overflow-hidden relative scroll-mt-24">
                        {/* Premium Mesh Gradient Background */}
                        <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
                            <div className="absolute -left-[10%] -top-[10%] h-[60%] w-[60%] animate-pulse rounded-full bg-blue-600/20 blur-[120px]" />
                            <div className="absolute -right-[10%] bottom-[0%] h-[50%] w-[50%] animate-bounce rounded-full bg-emerald-600/10 blur-[100px] [animation-duration:12s]" />
                            <div className="absolute left-[20%] top-[40%] h-[40%] w-[40%] animate-pulse rounded-full bg-purple-600/10 blur-[110px] [animation-duration:8s]" />
                        </div>
                        <div className="relative z-10 px-4">
                            <div className="mx-auto mb-16 max-w-3xl text-center">
                                <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
                                    Unverbindliche Anfrage starten
                                </h2>
                                <p className="text-lg text-slate-400 max-w-xl mx-auto">
                                    Unverbindlich und transparent. Sie senden die wichtigsten Angaben, FLOXANT prüft den Aufwand und meldet sich mit einer realistischen Einordnung.
                                </p>
                            </div>
                            <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0A0C10] p-1 shadow-2xl">
                                <div className="relative z-10 p-4 md:p-8 text-start">
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
                </div>
            </section>
        </main>
    );
}
