import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'entruempelung-passau', title: 'Entrümpelung Passau | Wohnungsauflösung | FLOXANT', description: 'Professionelle Entrümpelung in Passau. Wohnungsauflösung, Kellerentrümpelung, Sperrmüll. Festpreis & umweltgerechte Entsorgung.' });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet eine Entrümpelung in Passau?", "acceptedAnswer": { "@type": "Answer", "text": "30 bis 80 Euro pro Kubikmeter, abhängig von Material und Zugänglichkeit. Festpreis nach Besichtigung." } },
            { "@type": "Question", "name": "Wie schnell können Sie entrümpeln?", "acceptedAnswer": { "@type": "Answer", "text": "Express-Entrümpelung innerhalb von 24 bis 48 Stunden möglich. Standard innerhalb einer Woche." } }
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "LocalBusiness",
        "name": "FLOXANT Entrümpelung Passau",
        "url": `https://www.floxant.de/${lang}/entruempelung-passau`,
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "streetAddress": "Johanna-Kinkel-Straße 1 + 2", "addressLocality": "Regensburg", "postalCode": "93049", "addressCountry": "DE" },
        "areaServed": [{ "@type": "City", "name": "Passau" }],
        "priceRange": "$$",
    };

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "serviceType": "Entrümpelung, Wohnungsauflösung",
        "provider": { "@type": "LocalBusiness", "name": "FLOXANT Entrümpelung Passau", "telephone": "+4915771105087" },
        "areaServed": { "@type": "City", "name": "Passau" }
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://www.floxant.de/${lang}` },
            { "@type": "ListItem", "position": 2, "name": "Entrümpelung Bayern", "item": `https://www.floxant.de/${lang}/entruempelung-bayern` },
            { "@type": "ListItem", "position": 3, "name": "Entrümpelung Passau", "item": `https://www.floxant.de/${lang}/entruempelung-passau` }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Entrümpelung Bayern", href: `/${lang}/entruempelung-bayern` }, { label: "Entrümpelung Passau" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Passau & Niederbayern</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Entrümpelung in <span className="text-primary">Passau</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        FLOXANT bietet professionelle Entrümpelung in Passau und Umgebung. Ob Wohnungsauflösung, Kellerentrümpelung oder Dachbodenräumung – wir erledigen alles schnell, sauber und zu fairen Festpreisen.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Entrümpelung in Passau – schnell & sauber</h2>
                        <p>Unsere erfahrenen Teams räumen Wohnungen, Keller, Dachböden und Büros in Passau professionell. Verwertbare Gegenstände werden gegengerechnet, alles andere umweltgerecht entsorgt.</p>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Wohnungsauflösung</h2>
                        <p>Bei Todesfall, Pflegeheimeinzug oder Auswanderung übernehmen wir die komplette Wohnungsauflösung. Sensibel, sorgfältig und mit Respekt vor persönlichen Erinnerungsstücken.</p>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Kombination mit Umzug</h2>
                        <p>Oft fallen Entrümpelung und Umzug zusammen. FLOXANT koordiniert beides aus einer Hand – das spart Zeit, Geld und Nerven.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Häufige Fragen</h2>
                        <div className="space-y-6">
                            {[
                            { q: "Was kostet eine Entrümpelung in Passau?", a: "30 bis 80 Euro pro Kubikmeter, abhängig von Material und Zugänglichkeit. Festpreis nach Besichtigung." },
                            { q: "Wie schnell können Sie entrümpeln?", a: "Express-Entrümpelung innerhalb von 24 bis 48 Stunden möglich. Standard innerhalb einer Woche." }
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                                    <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                                    <p className="text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Weitere Leistungen</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-passau`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Passau</Link>
                            <Link href={`/${lang}/entruempelung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Bayern</Link>
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/ratgeber`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Ratgeber</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Entrümpelung in Passau anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses Festpreisangebot für Entrümpelung in Passau.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
