import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'ratgeber/moebeltransport-sicher', title: 'Möbeltransport sicher organisieren | FLOXANT Ratgeber', description: 'So kommen Ihre Möbel sicher an: Verpackung, Transport und Versicherung beim Umzug.' });
}

export default async function Article({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Wie werden Möbel beim Umzug geschützt?", "acceptedAnswer": { "@type": "Answer", "text": "Durch fachgerechte Demontage, Polsterung, Verpackung und Ladungssicherung." } },
            { "@type": "Question", "name": "Was passiert bei Transportschäden?", "acceptedAnswer": { "@type": "Answer", "text": "FLOXANT ist voll versichert. Schäden werden dokumentiert und reguliert." } }
        ],
    };

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Möbeltransport sicher organisieren",
        "description": "So kommen Ihre Möbel sicher an: Verpackung, Transport und Versicherung beim Umzug.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
        "datePublished": "2026-03-01",
        "dateModified": "2026-03-08",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Ratgeber", href: `/${lang}/ratgeber` }, { label: "Möbeltransport sicher organisieren" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Möbeltransport sicher organisieren</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Ihre Möbel sind wertvoll – emotional und finanziell. Erfahren Sie, wie der sichere Transport gelingt.</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Richtig verpacken</h2>
                        <p className="text-muted-foreground leading-relaxed">Demontierbare Möbel auseinanderbauen und Schrauben in beschrifteten Beuteln aufbewahren. Polstermöbel mit Decken umwickeln, Glastüren mit Luftpolsterfolie schützen.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Professioneller Transport</h2>
                        <p className="text-muted-foreground leading-relaxed">Ladungssicherung im Transporter mit Gurten und Antirutschmatten. Schwere Stücke zuerst laden, zerbrechliche Teile oben und fixiert.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Versicherung</h2>
                        <p className="text-muted-foreground leading-relaxed">Prüfen Sie die Transportversicherung Ihrer Umzugsfirma. FLOXANT bietet vollen Versicherungsschutz für Ihr Mobiliar während des gesamten Transports.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {[
                            { q: "Wie werden Möbel beim Umzug geschützt?", a: "Durch fachgerechte Demontage, Polsterung, Verpackung und Ladungssicherung." },
                            { q: "Was passiert bei Transportschäden?", a: "FLOXANT ist voll versichert. Schäden werden dokumentiert und reguliert." }
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
