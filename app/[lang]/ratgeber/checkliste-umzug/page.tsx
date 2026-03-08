import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'ratgeber/checkliste-umzug', title: 'Checkliste für stressfreien Umzug | FLOXANT Ratgeber', description: 'Die ultimative Umzug-Checkliste: Schritt für Schritt zum perfekten Umzug ohne Stress.' });
}

export default async function Article({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Wann sollte man mit der Umzugsplanung beginnen?", "acceptedAnswer": { "@type": "Answer", "text": "Idealerweise 8 bis 12 Wochen vor dem Umzugstermin." } },
            { "@type": "Question", "name": "Was vergisst man beim Umzug am häufigsten?", "acceptedAnswer": { "@type": "Answer", "text": "Nachsendeauftrag, Zählerstände ablesen, Schlüsselübergabe dokumentieren." } }
        ],
    };

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Checkliste für stressfreien Umzug",
        "description": "Die ultimative Umzug-Checkliste: Schritt für Schritt zum perfekten Umzug ohne Stress.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
        "datePublished": "2026-03-01",
        "dateModified": "2026-03-08",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Ratgeber", href: `/${lang}/ratgeber` }, { label: "Checkliste für stressfreien Umzug" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Checkliste für einen stressfreien Umzug</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Ein Umzug erfordert vorausschauende Planung. Mit unserer Checkliste behalten Sie den Überblick über alle wichtigen Aufgaben – von der Kündigung bis zum Einleben.</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">8 Wochen vorher</h2>
                        <p className="text-muted-foreground leading-relaxed">Kündigen Sie Ihren alten Mietvertrag fristgerecht. Beantragen Sie Urlaub für den Umzugstag. Holen Sie Angebote von Umzugsfirmen ein und vergleichen Sie Leistungen und Preise.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">4 Wochen vorher</h2>
                        <p className="text-muted-foreground leading-relaxed">Beginnen Sie mit dem Packen selten genutzter Gegenstände. Organisieren Sie Umzugskartons und Verpackungsmaterial. Beantragen Sie eine Halteverbotszone für Be- und Entladung.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Am Umzugstag</h2>
                        <p className="text-muted-foreground leading-relaxed">Legen Sie Zählerstände fest. Übergeben Sie die alte Wohnung dokumentiert. Überprüfen Sie die Möbel nach dem Transport auf Schäden.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {[
                            { q: "Wann sollte man mit der Umzugsplanung beginnen?", a: "Idealerweise 8 bis 12 Wochen vor dem Umzugstermin." },
                            { q: "Was vergisst man beim Umzug am häufigsten?", a: "Nachsendeauftrag, Zählerstände ablesen, Schlüsselübergabe dokumentieren." }
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
