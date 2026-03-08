import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'ratgeber/gute-umzugsfirma-finden', title: 'Wie findet man eine gute Umzugsfirma? | FLOXANT Ratgeber', description: 'Worauf Sie bei der Wahl einer Umzugsfirma achten sollten. Tipps für die richtige Entscheidung.' });
}

export default async function Article({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Woran erkenne ich eine seriöse Umzugsfirma?", "acceptedAnswer": { "@type": "Answer", "text": "Festpreisangebot, Versicherungsnachweis, positive Bewertungen und transparente Kommunikation." } },
            { "@type": "Question", "name": "Wie viele Angebote sollte man einholen?", "acceptedAnswer": { "@type": "Answer", "text": "Mindestens drei Angebote vergleichen. Achten Sie auf den Leistungsumfang, nicht nur den Preis." } }
        ],
    };

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Wie findet man eine gute Umzugsfirma?",
        "description": "Worauf Sie bei der Wahl einer Umzugsfirma achten sollten. Tipps für die richtige Entscheidung.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
        "datePublished": "2026-03-01",
        "dateModified": "2026-03-08",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Ratgeber", href: `/${lang}/ratgeber` }, { label: "Wie findet man eine gute Umzugsfirma?" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Wie findet man eine gute Umzugsfirma?</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Die Wahl der richtigen Umzugsfirma entscheidet über Erfolg oder Frust am Umzugstag. Erfahren Sie, welche Kriterien wirklich zählen.</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Transparente Preisgestaltung</h2>
                        <p className="text-muted-foreground leading-relaxed">Seriöse Umzugsfirmen bieten Festpreise nach Besichtigung an. Vorsicht bei Stundenlohn-Angeboten ohne Obergrenze – hier können die Kosten explodieren.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Versicherungsschutz prüfen</h2>
                        <p className="text-muted-foreground leading-relaxed">Fragen Sie nach der Transportversicherung. Eine gute Umzugsfirma ist haftpflichtversichert und bietet Allgefahrenversicherung für Ihr Inventar an.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Erfahrung und Bewertungen</h2>
                        <p className="text-muted-foreground leading-relaxed">Lesen Sie Google-Bewertungen und fragen Sie nach Referenzen. Regionale Erfahrung – etwa Kenntnis der Altstadtlagen – ist ein Plus.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {[
                            { q: "Woran erkenne ich eine seriöse Umzugsfirma?", a: "Festpreisangebot, Versicherungsnachweis, positive Bewertungen und transparente Kommunikation." },
                            { q: "Wie viele Angebote sollte man einholen?", a: "Mindestens drei Angebote vergleichen. Achten Sie auf den Leistungsumfang, nicht nur den Preis." }
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
