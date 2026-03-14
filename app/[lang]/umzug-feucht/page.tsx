import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { generatePageSEO } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Shield, Clock, Truck } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: 'umzug-feucht',
        title: 'Umzugsunternehmen Feucht ✓ Festpreis ✓ Versicherung | FLOXANT',
        description: 'Professionelles Umzugsunternehmen in Feucht. Umzug, Entrümpelung und Reinigung mit Festpreis und Versicherung. Jetzt Angebot bei FLOXANT anfragen.',
    });
}

export default async function UmzugFeucht({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in Feucht?", "acceptedAnswer": { "@type": "Answer", "text": "Ein Umzug in Feucht kostet je nach Wohnungsgröße zwischen 300 und 1.500 Euro. Verbindlicher Festpreis nach Besichtigung." } },
            { "@type": "Question", "name": "Bietet FLOXANT auch Entrümpelung in Feucht?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Professionelle Entrümpelung und Wohnungsauflösung in Feucht und dem gesamten Nürnberger Land." } },
        ],
    };
    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany", "name": "FLOXANT Umzug Feucht",
        "url": `https://www.floxant.de/${lang}/umzug-feucht`, "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "addressLocality": "Feucht", "addressRegion": "Bayern", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 49.3769, "longitude": 11.2147 },
        "areaServed": [{ "@type": "City", "name": "Feucht" }, { "@type": "City", "name": "Nürnberg" }, { "@type": "AdministrativeArea", "name": "Nürnberger Land" }], "priceRange": "$$",
    };

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "serviceType": "Umzug, Transport, Entrümpelung, Reinigung",
        "provider": { "@type": "LocalBusiness", "name": "FLOXANT Umzug Feucht", "telephone": "+4915771105087" },
        "areaServed": { "@type": "City", "name": "Feucht" }
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://www.floxant.de/${lang}` },
            { "@type": "ListItem", "position": 2, "name": "Umzug Bayern", "item": `https://www.floxant.de/${lang}/umzug-bayern` },
            { "@type": "ListItem", "position": 3, "name": "Umzug Feucht", "item": `https://www.floxant.de/${lang}/umzug-feucht` }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Umzug Feucht" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Feucht & Nürnberger Land</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzugsunternehmen in <span className="text-primary">Feucht</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        FLOXANT – Ihr Umzugspartner in Feucht bei Nürnberg. Operativer Hub im Nürnberger Land, Festpreisgarantie und professioneller Service.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Umzug in Feucht – Im Herzen des Nürnberger Landes</h2>
                        <p>Feucht liegt verkehrsgünstig am südöstlichen Rand der Metropolregion Nürnberg. Die Marktgemeinde ist ein beliebter Wohnort für Familien und Pendler. Als einer der operativen Knotenpunkte von FLOXANT in Franken bieten wir hier besonders schnelle Verfügbarkeit und kurze Anfahrtszeiten.</p>
                        <p>Ob Umzug innerhalb von Feucht, in die Nürnberger Stadtteile oder Fernumzug nach ganz Deutschland – wir planen und realisieren Ihren Umzug professionell und zum Festpreis.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: <Clock className="w-8 h-8 text-primary" />, title: "Operativer Hub", desc: "Feucht ist einer unserer Knotenpunkte – besonders kurze Anfahrtszeiten." },
                            { icon: <Shield className="w-8 h-8 text-primary" />, title: "Festpreisgarantie", desc: "Verbindliches Angebot nach Besichtigung. Keine versteckten Kosten." },
                            { icon: <Truck className="w-8 h-8 text-primary" />, title: "Fernumzüge", desc: "Von Feucht nach ganz Deutschland – effizient und termingenau." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <div className="mb-4">{item.icon}</div>
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Häufige Fragen</h2>
                        <div className="space-y-6">
                            {[
                                { q: "Was kostet ein Umzug in Feucht?", a: "Zwischen 300 und 1.500 Euro je nach Wohnungsgröße. Verbindlicher Festpreis nach Besichtigung." },
                                { q: "Bieten Sie auch Entrümpelung in Feucht?", a: "Ja. Professionelle Entrümpelung und Wohnungsauflösung für Feucht und das Nürnberger Land." },
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                                    <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                                    <p className="text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Weitere Standorte</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-nuernberg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Nürnberg</Link>
                            <Link href={`/${lang}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                            <Link href={`/${lang}/umzug-neumarkt`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Neumarkt</Link>
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Angebot für Feucht anfordern</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses Festpreisangebot für Ihren Umzug in Feucht.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
