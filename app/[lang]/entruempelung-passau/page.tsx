import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
const DualCalculator = dynamic(
    () => import("@/components/calculator/DualCalculator"),
    { loading: () => <div className="w-full max-w-7xl mx-auto min-h-[400px] animate-pulse bg-white/5 rounded-3xl" /> }
);

import Link from "next/link";
import { MapPin } from "lucide-react";



export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    return generatePageSEO({
        pageLocale,
        path: 'entruempelung-passau',
        title: 'Entrümpelung in Passau | FLOXANT',
        description: 'Professionelle Entrümpelung in Passau in Bayern. Seriöse Abwicklung, Festpreisgarantie und versicherter Transport. Jetzt online berechnen!',
    });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.service_entruempelung || {};

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
                { "@type": "Question", "name": content.faqs?.[0]?.q || "Was kostet eine Entrümpelung in Passau?", "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[0]?.a || "30 bis 80 Euro pro Kubikmeter, abhängig von Material und Zugänglichkeit. Festpreis nach Besichtigung." } },
                { "@type": "Question", "name": content.faqs?.[1]?.q || "Wie schnell können Sie entrümpeln?", "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[1]?.a || "Express-Entrümpelung innerhalb von 24 bis 48 Stunden möglich. Standard innerhalb einer Woche." } }
            ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "LocalBusiness",
        "name": "FLOXANT Entrümpelung Passau",
        "url": `https://www.floxant.de/${pageLocale}/entruempelung-passau`,
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
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://www.floxant.de/${pageLocale}` },
            { "@type": "ListItem", "position": 2, "name": "Entrümpelung Bayern", "item": `https://www.floxant.de/${pageLocale}/entruempelung-bayern` },
            { "@type": "ListItem", "position": 3, "name": "Entrümpelung Passau", "item": `https://www.floxant.de/${pageLocale}/entruempelung-passau` }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs pageLocale={pageLocale} items={[{ label: "Entrümpelung Bayern", href: `/${pageLocale}/entruempelung-bayern` }, { label: "Entrümpelung Passau" }]} />
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
                        <h2 className="text-3xl font-bold text-foreground mb-6">{dict.common.combination_move}</h2>
                        <p>Oft fallen Entrümpelung und Umzug zusammen. FLOXANT koordiniert beides aus einer Hand – das spart Zeit, Geld und Nerven.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">{dict.common.faq_title}</h2>
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
                        <h3 className="text-lg font-semibold mb-6">{dict.common.more_services}</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${pageLocale}/umzug-passau`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Passau</Link>
                            <Link href={`/${pageLocale}/entruempelung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Bayern</Link>
                            <Link href={`/${pageLocale}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">{dict.common.umzug_bavaria}</Link>
                            <Link href={`/${pageLocale}/ratgeber`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">{dict.common.guide}</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Entrümpelung in Passau anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses Festpreisangebot für Entrümpelung in Passau.</p>
                        <DualCalculator dic={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
