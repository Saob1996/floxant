import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'ratgeber/umzug-kosten-rechner', title: 'Umzug Kosten Rechner Erklärung | FLOXANT Ratgeber', description: 'Wie funktioniert ein Umzugskostenrechner? Faktoren und Berechnung verständlich erklärt.' });
}

export default async function Article({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Sind Online-Umzugsrechner genau?", "acceptedAnswer": { "@type": "Answer", "text": "Sie geben eine grobe Orientierung. Für einen verbindlichen Preis ist eine Besichtigung vor Ort nötig." } },
            { "@type": "Question", "name": "Bietet FLOXANT eine kostenlose Besichtigung an?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Die Besichtigung ist kostenlos und unverbindlich." } }
        ],
    };

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Umzug Kosten Rechner Erklärung",
        "description": "Wie funktioniert ein Umzugskostenrechner? Faktoren und Berechnung verständlich erklärt.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
        "datePublished": "2026-03-01",
        "dateModified": "2026-03-08",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Ratgeber", href: `/${lang}/ratgeber` }, { label: "Umzug Kosten Rechner Erklärung" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Umzug Kosten Rechner: So funktioniert er</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Online-Kostenrechner geben eine erste Orientierung. Hier erfahren Sie, wie sie funktionieren und wo ihre Grenzen liegen.</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Eingabefaktoren</h2>
                        <p className="text-muted-foreground leading-relaxed">Typische Rechner fragen nach Wohnfläche, Etage, Entfernung, Anzahl der Zimmer und Sonderpositionen wie Klavier oder Waschmaschine. Je genauer die Angaben, desto besser die Schätzung.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Grenzen von Online-Rechnern</h2>
                        <p className="text-muted-foreground leading-relaxed">Online-Rechner können individuelle Faktoren wie Zufahrtsschwierigkeiten, Treppenhaus-Breite oder Balkon-Ausfädelung nicht berücksichtigen. Deshalb empfehlen wir immer eine kostenlose Vor-Ort-Besichtigung.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Unser Ansatz</h2>
                        <p className="text-muted-foreground leading-relaxed">FLOXANT bietet nach einer persönlichen Besichtigung einen verbindlichen Festpreis an. So haben Sie volle Kostensicherheit ohne Nachverhandlungen.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {[
                            { q: "Sind Online-Umzugsrechner genau?", a: "Sie geben eine grobe Orientierung. Für einen verbindlichen Preis ist eine Besichtigung vor Ort nötig." },
                            { q: "Bietet FLOXANT eine kostenlose Besichtigung an?", a: "Ja. Die Besichtigung ist kostenlos und unverbindlich." }
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
