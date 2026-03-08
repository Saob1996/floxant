import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'ratgeber/umzug-kosten-regensburg', title: 'Umzug Kosten Regensburg 2026 | FLOXANT Ratgeber', description: 'Was kostet ein Umzug in Regensburg? Preise, Faktoren und Spartipps für 2026.' });
}

export default async function Article({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in Regensburg?", "acceptedAnswer": { "@type": "Answer", "text": "Zwischen 400 und 2.500 Euro je nach Wohnungsgröße und Service." } },
            { "@type": "Question", "name": "Gibt es Festpreise?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. FLOXANT bietet nach kostenloser Besichtigung ein verbindliches Festpreisangebot." } }
        ],
    };

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Umzug Kosten Regensburg 2026",
        "description": "Was kostet ein Umzug in Regensburg? Preise, Faktoren und Spartipps für 2026.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
        "datePublished": "2026-03-01",
        "dateModified": "2026-03-08",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Ratgeber", href: `/${lang}/ratgeber` }, { label: "Umzug Kosten Regensburg 2026" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Was kostet ein Umzug in Regensburg?</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Die Kosten für einen Umzug in Regensburg hängen von verschiedenen Faktoren ab: Wohnungsgröße, Entfernung, Etage und gewünschtem Serviceumfang. In diesem Guide erfahren Sie, mit welchen Preisen Sie 2026 rechnen können.</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Durchschnittliche Umzugskosten in Regensburg</h2>
                        <p className="text-muted-foreground leading-relaxed">Ein lokaler Umzug einer 2-Zimmer-Wohnung kostet in Regensburg durchschnittlich 600 bis 1.200 Euro. Für eine 4-Zimmer-Wohnung müssen Sie mit 1.200 bis 2.500 Euro rechnen. Diese Preise beinhalten Transport, Be- und Entladung durch ein erfahrenes Team.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Faktoren, die den Preis beeinflussen</h2>
                        <p className="text-muted-foreground leading-relaxed">Die Etage ohne Aufzug, die Entfernung zum neuen Wohnort, Sperrgut wie Klaviere oder Tresore, und Zusatzleistungen wie Verpackung oder Möbelmontage beeinflussen den Endpreis erheblich. Eine Halteverbotszone verkürzt die Laufwege und spart Zeit.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Spartipps für Ihren Umzug</h2>
                        <p className="text-muted-foreground leading-relaxed">Packen Sie selbst, entrümpeln Sie vorab und wählen Sie einen Termin unter der Woche. FLOXANT bietet modulare Pakete: Sie bestimmen, welche Leistungen Sie benötigen, und zahlen nur dafür.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {[
                            { q: "Was kostet ein Umzug in Regensburg?", a: "Zwischen 400 und 2.500 Euro je nach Wohnungsgröße und Service." },
                            { q: "Gibt es Festpreise?", a: "Ja. FLOXANT bietet nach kostenloser Besichtigung ein verbindliches Festpreisangebot." }
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
