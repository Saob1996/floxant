import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'ratgeber/umzug-im-winter', title: 'Umzug im Winter: Vor- und Nachteile | FLOXANT Ratgeber', description: 'Lohnt sich ein Umzug im Winter? Tipps, Vor- und Nachteile für den Winterumzug.' });
}

export default async function Article({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Ist ein Winterumzug günstiger?", "acceptedAnswer": { "@type": "Answer", "text": "Oft ja, weil die Nachfrage geringer ist und Umzugsfirmen besser verfügbar sind." } },
            { "@type": "Question", "name": "Welche Risiken gibt es?", "acceptedAnswer": { "@type": "Answer", "text": "Glätte, Kälte und kürzere Tage. Mit guter Planung lassen sich diese Risiken minimieren." } }
        ],
    };

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Umzug im Winter: Vor- und Nachteile",
        "description": "Lohnt sich ein Umzug im Winter? Tipps, Vor- und Nachteile für den Winterumzug.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
        "datePublished": "2026-03-01",
        "dateModified": "2026-03-08",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Ratgeber", href: `/${lang}/ratgeber` }, { label: "Umzug im Winter: Vor- und Nachteile" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Umzug im Winter: Vor- und Nachteile</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Winterumzüge haben Vor- und Nachteile. Hier erfahren Sie, worauf Sie achten müssen.</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Vorteile</h2>
                        <p className="text-muted-foreground leading-relaxed">Umzugsfirmen haben im Winter weniger Aufträge – das bedeutet bessere Verfügbarkeit, kürzere Wartezeiten und oft günstigere Preise. Die Terminwahl ist flexibler.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Nachteile</h2>
                        <p className="text-muted-foreground leading-relaxed">Glätte, Schnee und Dunkelheit können den Transport erschweren. Heizung in der neuen Wohnung muss funktionieren. Empfindliche Gegenstände wie Pflanzen brauchen besonderen Schutz.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Tipps für den Winterumzug</h2>
                        <p className="text-muted-foreground leading-relaxed">Wege streuen lassen, Kartons trocken halten, früh am Tag starten wegen der kurzen Tage. FLOXANT ist ganzjährig im Einsatz und kennt die Herausforderungen im bayerischen Winter.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {[
                            { q: "Ist ein Winterumzug günstiger?", a: "Oft ja, weil die Nachfrage geringer ist und Umzugsfirmen besser verfügbar sind." },
                            { q: "Welche Risiken gibt es?", a: "Glätte, Kälte und kürzere Tage. Mit guter Planung lassen sich diese Risiken minimieren." }
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
