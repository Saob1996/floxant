import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'ratgeber/entruempelung-kosten-pro-m3', title: 'Entrümpelung Kosten pro m³ erklärt | FLOXANT Ratgeber', description: 'Was kostet eine Entrümpelung pro Kubikmeter? Alle Preise und Faktoren im Überblick.' });
}

export default async function Article({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet Entrümpelung pro m³?", "acceptedAnswer": { "@type": "Answer", "text": "30 bis 80 Euro im Durchschnitt, je nach Material und Zugänglichkeit." } },
            { "@type": "Question", "name": "Ist eine Entrümpelung auch kurzfristig möglich?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. FLOXANT bietet auch Express-Entrümpelung innerhalb von 24 bis 48 Stunden." } }
        ],
    };

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Entrümpelung Kosten pro m³ erklärt",
        "description": "Was kostet eine Entrümpelung pro Kubikmeter? Alle Preise und Faktoren im Überblick.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
        "datePublished": "2026-03-01",
        "dateModified": "2026-03-08",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Ratgeber", href: `/${lang}/ratgeber` }, { label: "Entrümpelung Kosten pro m³ erklärt" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Entrümpelung Kosten pro m³ erklärt</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Die Kosten einer Entrümpelung werden häufig pro Kubikmeter berechnet. Was das genau bedeutet und wie Sie sparen können, erklären wir hier.</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Durchschnittliche Kosten pro m³</h2>
                        <p className="text-muted-foreground leading-relaxed">Die Entrümpelung kostet in Bayern durchschnittlich 30 bis 80 Euro pro Kubikmeter. Der Preis hängt von der Art des Materials ab: Sperrmüll ist günstiger als Sondermüll oder Elektroaltgeräte.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Was beeinflusst den Preis?</h2>
                        <p className="text-muted-foreground leading-relaxed">Zugänglichkeit, Etage, Menge, Materialart und ob eine besenreine Übergabe gewünscht ist. Kellerentrümpelungen sind oft teurer wegen eingeschränktem Zugang.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Spartipps</h2>
                        <p className="text-muted-foreground leading-relaxed">Sortieren Sie vorab selbst, was weg kann. Bringen Sie Verwertbares zu lokalen Sozialkaufhäusern. FLOXANT bietet Pauschalangebote bei Kombination mit Umzug oder Reinigung.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {[
                            { q: "Was kostet Entrümpelung pro m³?", a: "30 bis 80 Euro im Durchschnitt, je nach Material und Zugänglichkeit." },
                            { q: "Ist eine Entrümpelung auch kurzfristig möglich?", a: "Ja. FLOXANT bietet auch Express-Entrümpelung innerhalb von 24 bis 48 Stunden." }
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
