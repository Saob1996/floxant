import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'ratgeber/wann-lohnt-sich-umzugsfirma', title: 'Wann lohnt sich eine Umzugsfirma? | FLOXANT Ratgeber', description: 'Ab wann lohnt sich eine Umzugsfirma? Kosten-Nutzen-Analyse für Ihren Umzug.' });
}

export default async function Article({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Ab welcher Wohnungsgröße lohnt sich eine Umzugsfirma?", "acceptedAnswer": { "@type": "Answer", "text": "Ab einer 2-Zimmer-Wohnung oder bei erschwertem Zugang (Treppen, enge Gassen)." } },
            { "@type": "Question", "name": "Kann ich einzelne Leistungen buchen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. FLOXANT bietet modulare Pakete – vom reinen Transport bis zum Full-Service." } }
        ],
    };

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Wann lohnt sich eine Umzugsfirma?",
        "description": "Ab wann lohnt sich eine Umzugsfirma? Kosten-Nutzen-Analyse für Ihren Umzug.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
        "datePublished": "2026-03-01",
        "dateModified": "2026-03-08",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Ratgeber", href: `/${lang}/ratgeber` }, { label: "Wann lohnt sich eine Umzugsfirma?" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Wann lohnt sich eine Umzugsfirma?</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Selber machen oder Profis beauftragen? Die Antwort hängt von mehreren Faktoren ab.</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Zeitfaktor</h2>
                        <p className="text-muted-foreground leading-relaxed">Ein Umzug mit Freunden dauert oft doppelt so lang wie mit Profis. Die gesparte Arbeitszeit übersteigt häufig die Kosten der Umzugsfirma.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Schadensrisiko</h2>
                        <p className="text-muted-foreground leading-relaxed">Ohne Erfahrung passieren Schäden an Möbeln, Wänden und Böden. Eine professionelle Umzugsfirma ist versichert – bei Privatumzügen zahlen Sie Schäden aus eigener Tasche.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Fazit</h2>
                        <p className="text-muted-foreground leading-relaxed">Ab einer 2-Zimmer-Wohnung oder bei Treppen ohne Aufzug lohnt sich eine Umzugsfirma fast immer. Die Kombination aus Zeitersparnis, Versicherung und Stressreduktion überwiegt die Kosten.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {[
                            { q: "Ab welcher Wohnungsgröße lohnt sich eine Umzugsfirma?", a: "Ab einer 2-Zimmer-Wohnung oder bei erschwertem Zugang (Treppen, enge Gassen)." },
                            { q: "Kann ich einzelne Leistungen buchen?", a: "Ja. FLOXANT bietet modulare Pakete – vom reinen Transport bis zum Full-Service." }
                            ].map((item, i) => (
                                <div key={i} className="p-5 rounded-xl bg-muted/10 border border-border/50">
                                    <h3 className="font-bold mb-2">{item.q}</h3>
                                    <p className="text-sm text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border pt-8 flex flex-wrap gap-3">
                        <Link href={`/${lang}/ratgeber`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">← Alle Ratgeber</Link>
                        <Link href={`/${lang}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugsfirma Regensburg</Link>
                        <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
