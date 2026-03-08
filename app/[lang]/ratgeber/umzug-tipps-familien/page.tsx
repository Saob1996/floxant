import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'ratgeber/umzug-tipps-familien', title: 'Umzug Tipps für Familien | FLOXANT Ratgeber', description: 'Umzug mit Kindern: praktische Tipps für Familien. So wird der Umzug stressfrei.' });
}

export default async function Article({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Wie bereite ich Kinder auf den Umzug vor?", "acceptedAnswer": { "@type": "Answer", "text": "Früh darüber sprechen, neue Wohnung gemeinsam besuchen und das neue Zimmer planen." } },
            { "@type": "Question", "name": "Sollten Kinder am Umzugstag dabei sein?", "acceptedAnswer": { "@type": "Answer", "text": "Bei kleinen Kindern ist eine Betreuung besser. Ältere Kinder können je nach Alter mithelfen." } }
        ],
    };

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Umzug Tipps für Familien",
        "description": "Umzug mit Kindern: praktische Tipps für Familien. So wird der Umzug stressfrei.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
        "datePublished": "2026-03-01",
        "dateModified": "2026-03-08",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Ratgeber", href: `/${lang}/ratgeber` }, { label: "Umzug Tipps für Familien" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Umzug Tipps für Familien</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Ein Umzug mit Kindern erfordert besondere Planung. So meistern Sie den Wohnungswechsel als Familie.</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Kinder vorbereiten</h2>
                        <p className="text-muted-foreground leading-relaxed">Sprechen Sie früh mit den Kindern über den Umzug. Besuchen Sie gemeinsam die neue Wohnung. Lassen Sie Kinder ihr neues Zimmer mitgestalten – das steigert die Vorfreude.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Am Umzugstag</h2>
                        <p className="text-muted-foreground leading-relaxed">Organisieren Sie eine Kinderbetreuung für den Umzugstag. Packen Sie eine Tasche mit Lieblingsspielzeug und Snacks. So bleibt der Umzug für die Kleinen ein Abenteuer, kein Stressfaktor.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Einleben am neuen Ort</h2>
                        <p className="text-muted-foreground leading-relaxed">Richten Sie das Kinderzimmer zuerst ein. Erkunden Sie die neue Umgebung zusammen. Finden Sie schnell Spielplätze, Schulwege und Sportvereine.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {[
                            { q: "Wie bereite ich Kinder auf den Umzug vor?", a: "Früh darüber sprechen, neue Wohnung gemeinsam besuchen und das neue Zimmer planen." },
                            { q: "Sollten Kinder am Umzugstag dabei sein?", a: "Bei kleinen Kindern ist eine Betreuung besser. Ältere Kinder können je nach Alter mithelfen." }
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
