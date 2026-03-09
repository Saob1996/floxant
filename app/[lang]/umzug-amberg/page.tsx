import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { generatePageSEO } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Shield, Clock, Building2 } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: 'umzug-amberg',
        title: 'Umzugsfirma Amberg | Festpreis | FLOXANT',
        description: 'Professionelle Umzugsfirma in Amberg & Oberpfalz. Privatumzüge, Firmenumzüge, Fernumzüge. Festpreisgarantie, voll versichert. Ihr Partner für die Oberpfalz.',
    });
}

export default async function UmzugAmberg({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in Amberg?", "acceptedAnswer": { "@type": "Answer", "text": "Ein lokaler Umzug in Amberg kostet zwischen 350 und 1.800 Euro. FLOXANT bietet verbindliche Festpreise nach Besichtigung." } },
            { "@type": "Question", "name": "Bietet FLOXANT Fernumzüge ab Amberg?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wir organisieren Fernumzüge von Amberg nach ganz Deutschland – NRW, Norddeutschland und alle Bundesländer." } },
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany", "name": "FLOXANT Umzug Amberg",
        "url": `https://www.floxant.de/${lang}/umzug-amberg`, "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "addressLocality": "Amberg", "addressRegion": "Bayern", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 49.4429, "longitude": 11.8633 },
        "areaServed": [{ "@type": "City", "name": "Amberg" }, { "@type": "AdministrativeArea", "name": "Oberpfalz" }], "priceRange": "$$",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127", "bestRating": "5" },
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Umzug Amberg" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Amberg & Oberpfalz</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzugsfirma in <span className="text-primary">Amberg</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        FLOXANT – Ihr Umzugspartner für Amberg. Festpreisgarantie, professionelle Teams und schnelle Verfügbarkeit in der gesamten Oberpfalz.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Umzug in Amberg – Verlässlich und Professionell</h2>
                        <p>Amberg, die historische Hauptstadt der Oberpfalz, verbindet mittelalterliches Flair mit moderner Lebensqualität. Die kompakte Altstadt mit ihren engen Gassen erfordert beim Umzug besondere Planung – genau unsere Stärke.</p>
                        <p>FLOXANT plant Ihren Umzug in Amberg präzise: Halteverbotszone, Etagen-Logistik, empfindliche Möbel. Wir kennen die lokalen Gegebenheiten und liefern Festpreise ohne Überraschungen.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: <Building2 className="w-8 h-8 text-primary" />, title: "Altstadt-Erfahrung", desc: "Enge Gassen und Treppenhäuser? Kein Problem – wir bringen die richtige Ausrüstung." },
                            { icon: <Shield className="w-8 h-8 text-primary" />, title: "Festpreisgarantie", desc: "Verbindliches Angebot nach kostenloser Besichtigung." },
                            { icon: <Clock className="w-8 h-8 text-primary" />, title: "Schnelle Verfügbarkeit", desc: "Direkte Anbindung ab Regensburg – auch kurzfristig einsatzbereit." },
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
                                { q: "Was kostet ein Umzug in Amberg?", a: "Zwischen 350 und 1.800 Euro je nach Wohnungsgröße. Verbindliches Festpreisangebot nach Besichtigung." },
                                { q: "Bieten Sie Fernumzüge ab Amberg?", a: "Ja. Von Amberg nach ganz Deutschland – termingenau und zum Festpreis." },
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
                            <Link href={`/${lang}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                            <Link href={`/${lang}/umzug-schwandorf`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Schwandorf</Link>
                            <Link href={`/${lang}/umzug-neumarkt`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Neumarkt</Link>
                            <Link href={`/${lang}/umzug-nuernberg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Nürnberg</Link>
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Angebot für Amberg anfordern</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses Festpreisangebot für Ihren Umzug in Amberg.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
