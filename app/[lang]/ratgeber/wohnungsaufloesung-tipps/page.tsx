import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'ratgeber/wohnungsaufloesung-tipps', title: 'Wohnungsauflösung: Tipps und Kosten | FLOXANT Ratgeber', description: 'Wohnungsauflösung organisieren: Ablauf, Kosten, Checkliste und Tipps von FLOXANT.' });
}

export default async function Article({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Wie lange dauert eine Wohnungsauflösung?", "acceptedAnswer": { "@type": "Answer", "text": "In der Regel 1 bis 3 Tage, je nach Wohnungsgröße." } },
            { "@type": "Question", "name": "Was passiert mit verwertbaren Gegenständen?", "acceptedAnswer": { "@type": "Answer", "text": "Gegengerechnet oder auf Wunsch an Sozialkaufhäuser gespendet." } }
        ],
    };

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Wohnungsauflösung: Tipps und Kosten",
        "description": "Wohnungsauflösung organisieren: Ablauf, Kosten, Checkliste und Tipps von FLOXANT.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
        "datePublished": "2026-03-01",
        "dateModified": "2026-03-08",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Ratgeber", href: `/${lang}/ratgeber` }, { label: "Wohnungsauflösung: Tipps und Kosten" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Wohnungsauflösung: Tipps und Kosten</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Eine Wohnungsauflösung ist oft emotional und logistisch anspruchsvoll. Hier erfahren Sie, wie der Ablauf funktioniert.</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Wann braucht man eine Wohnungsauflösung?</h2>
                        <p className="text-muted-foreground leading-relaxed">Bei Todesfall, Pflegeheimeinzug, Auswanderung oder wenn eine Wohnung komplett geräumt werden muss. Der Unterschied zur Entrümpelung: bei der Wohnungsauflösung wird der gesamte Hausstand aufgelöst.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Kosten und Ablauf</h2>
                        <p className="text-muted-foreground leading-relaxed">Eine Wohnungsauflösung kostet je nach Wohnungsgröße 500 bis 3.000 Euro. Verwertbare Gegenstände werden gegengerechnet. FLOXANT bietet Festpreise nach Besichtigung.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Emotionale Begleitung</h2>
                        <p className="text-muted-foreground leading-relaxed">Wir gehen sensibel mit der Situation um. Persönliche Erinnerungsstücke werden sorgfältig aussortiert. Auf Wunsch dokumentieren wir alles fotografisch.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {[
                            { q: "Wie lange dauert eine Wohnungsauflösung?", a: "In der Regel 1 bis 3 Tage, je nach Wohnungsgröße." },
                            { q: "Was passiert mit verwertbaren Gegenständen?", a: "Gegengerechnet oder auf Wunsch an Sozialkaufhäuser gespendet." }
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
