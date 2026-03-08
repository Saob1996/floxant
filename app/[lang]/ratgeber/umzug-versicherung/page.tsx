import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'ratgeber/umzug-versicherung', title: 'Umzug Versicherung: Was ist wichtig? | FLOXANT Ratgeber', description: 'Transportversicherung beim Umzug: Was deckt sie ab und worauf sollten Sie achten?' });
}

export default async function Article({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Bin ich beim Umzug versichert?", "acceptedAnswer": { "@type": "Answer", "text": "Die Umzugsfirma haftet gesetzlich begrenzt. Für vollen Schutz empfehlen wir eine Allgefahrenversicherung." } },
            { "@type": "Question", "name": "Was kostet eine Umzugsversicherung?", "acceptedAnswer": { "@type": "Answer", "text": "Ca. 1 bis 2 Prozent des Inventarwerts für Vollwertdeckung." } }
        ],
    };

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Umzug Versicherung: Was ist wichtig?",
        "description": "Transportversicherung beim Umzug: Was deckt sie ab und worauf sollten Sie achten?",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
        "datePublished": "2026-03-01",
        "dateModified": "2026-03-08",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Ratgeber", href: `/${lang}/ratgeber` }, { label: "Umzug Versicherung: Was ist wichtig?" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Umzug Versicherung: Was Sie wissen müssen</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Beim Umzug kann trotz aller Vorsicht etwas kaputt gehen. Welche Versicherungen schützen Sie?</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Gesetzliche Haftung der Umzugsfirma</h2>
                        <p className="text-muted-foreground leading-relaxed">Nach § 451e HGB haftet die Umzugsfirma gesetzlich mit 620 Euro pro Kubikmeter. Das deckt selten den Vollwert hochwertiger Möbel.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Allgefahrenversicherung</h2>
                        <p className="text-muted-foreground leading-relaxed">Eine Allgefahrenversicherung (auch Vollwert-Deckung) deckt den vollen Neuwert oder Zeitwert Ihres Inventars ab. Kostet ca. 1–2% des Inventarwerts.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">FLOXANT Versicherung</h2>
                        <p className="text-muted-foreground leading-relaxed">FLOXANT ist betriebshaftpflichtversichert und bietet optionale Vollwertversicherung an. Schäden werden schnell und unbürokratisch reguliert.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {[
                            { q: "Bin ich beim Umzug versichert?", a: "Die Umzugsfirma haftet gesetzlich begrenzt. Für vollen Schutz empfehlen wir eine Allgefahrenversicherung." },
                            { q: "Was kostet eine Umzugsversicherung?", a: "Ca. 1 bis 2 Prozent des Inventarwerts für Vollwertdeckung." }
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
