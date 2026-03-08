import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'ratgeber/umzug-vorbereiten-7-schritte', title: 'Umzug vorbereiten in 7 Schritten | FLOXANT Ratgeber', description: '7 einfache Schritte für die perfekte Umzugsvorbereitung. Planung, Packen, Transport.' });
}

export default async function Article({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Wie lange dauert ein Umzug?", "acceptedAnswer": { "@type": "Answer", "text": "Ein lokaler Umzug dauert in der Regel 4 bis 8 Stunden, abhängig von der Wohnungsgröße." } },
            { "@type": "Question", "name": "Was brauche ich zum Packen?", "acceptedAnswer": { "@type": "Answer", "text": "Umzugskartons, Packpapier, Luftpolsterfolie, Klebeband und einen Marker zum Beschriften." } }
        ],
    };

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Umzug vorbereiten in 7 Schritten",
        "description": "7 einfache Schritte für die perfekte Umzugsvorbereitung. Planung, Packen, Transport.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
        "datePublished": "2026-03-01",
        "dateModified": "2026-03-08",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Ratgeber", href: `/${lang}/ratgeber` }, { label: "Umzug vorbereiten in 7 Schritten" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Umzug vorbereiten in 7 Schritten</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Mit der richtigen Vorbereitung wird Ihr Umzug zum Kinderspiel. Hier sind die 7 wichtigsten Schritte.</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Schritt 1–3: Planung & Organisation</h2>
                        <p className="text-muted-foreground leading-relaxed">1. Budget festlegen und Angebote einholen. 2. Umzugstermin vereinbaren und Urlaub beantragen. 3. Inventar erstellen und aussortieren.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Schritt 4–5: Packen & Vorbereiten</h2>
                        <p className="text-muted-foreground leading-relaxed">4. Packmaterial besorgen und Zimmer für Zimmer packen. 5. Halteverbotszone beantragen und Nachsendeauftrag einrichten.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Schritt 6–7: Umzugstag & Nachbereitung</h2>
                        <p className="text-muted-foreground leading-relaxed">6. Zählerstände dokumentieren, Wohnung übergeben. 7. Ummeldung innerhalb von 14 Tagen erledigen. Am neuen Ort ankommen und einleben.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {[
                            { q: "Wie lange dauert ein Umzug?", a: "Ein lokaler Umzug dauert in der Regel 4 bis 8 Stunden, abhängig von der Wohnungsgröße." },
                            { q: "Was brauche ich zum Packen?", a: "Umzugskartons, Packpapier, Luftpolsterfolie, Klebeband und einen Marker zum Beschriften." }
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
