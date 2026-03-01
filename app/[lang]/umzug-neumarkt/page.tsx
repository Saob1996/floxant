import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
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
    return {
        title: "Umzugsfirma Neumarkt i.d.OPf. | Festpreis | FLOXANT",
        description: "Professionelle Umzugsfirma in Neumarkt in der Oberpfalz. Privatumzüge, Firmenumzüge, Fernumzüge. Festpreisgarantie, voll versichert. Kurze Anfahrt ab Regensburg.",
        alternates: {
            canonical: `https://www.floxant.de/${lang}/umzug-neumarkt`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://www.floxant.de/${l}/umzug-neumarkt`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function UmzugNeumarkt({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in Neumarkt i.d.OPf.?", "acceptedAnswer": { "@type": "Answer", "text": "Ein Umzug in Neumarkt kostet je nach Wohnungsgröße zwischen 350 und 1.800 Euro. FLOXANT bietet verbindliche Festpreise." } },
            { "@type": "Question", "name": "Wie schnell ist FLOXANT in Neumarkt?", "acceptedAnswer": { "@type": "Answer", "text": "Durch unseren operativen Schwerpunkt in Regensburg sind wir in unter 30 Minuten in Neumarkt – ideal für kurzfristige Umzüge." } },
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany", "name": "FLOXANT Umzug Neumarkt",
        "url": `https://www.floxant.de/${lang}/umzug-neumarkt`, "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "addressLocality": "Neumarkt in der Oberpfalz", "addressRegion": "Bayern", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 49.2798, "longitude": 11.4608 },
        "areaServed": [{ "@type": "City", "name": "Neumarkt in der Oberpfalz" }], "priceRange": "$$",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Umzug Neumarkt" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Neumarkt i.d.OPf.</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzugsfirma in <span className="text-primary">Neumarkt</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        FLOXANT – Ihr Umzugspartner für Neumarkt in der Oberpfalz. Kurze Anfahrt ab Regensburg, Festpreisgarantie und professionelle Abwicklung.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Umzug in Neumarkt – Professionell und Pünktlich</h2>
                        <p>Neumarkt in der Oberpfalz liegt strategisch günstig zwischen Regensburg und Nürnberg. Als wachsende Kreisstadt mit moderner Infrastruktur und familienfreundlichem Umfeld zieht Neumarkt immer mehr Menschen an. FLOXANT bietet professionelle Umzüge mit Festpreisgarantie für die gesamte Region.</p>
                        <p>Durch unseren operativen Schwerpunkt in Regensburg sind wir in weniger als 30 Minuten vor Ort. Das bedeutet kurze Anfahrtszeiten, flexible Terminvergabe und schnelle Reaktion auch bei kurzfristigen Anfragen.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: <Clock className="w-8 h-8 text-primary" />, title: "Kurze Anfahrt", desc: "Unter 30 Min. ab Regensburg – schnell verfügbar, auch kurzfristig." },
                            { icon: <Shield className="w-8 h-8 text-primary" />, title: "Festpreisgarantie", desc: "Verbindliches Angebot nach kostenloser Besichtigung. Keine versteckten Kosten." },
                            { icon: <Truck className="w-8 h-8 text-primary" />, title: "Fernumzüge", desc: "Von Neumarkt nach NRW, Berlin oder Hamburg – effizient und termingenau." },
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
                                { q: "Was kostet ein Umzug in Neumarkt?", a: "Zwischen 350 und 1.800 Euro je nach Größe. Verbindliches Festpreisangebot nach Besichtigung." },
                                { q: "Wie schnell können Sie in Neumarkt sein?", a: "Ab Regensburg in unter 30 Minuten. Ideal auch für kurzfristige Umzüge." },
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                                    <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                                    <p className="text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Weitere Standorte in der Region</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                            <Link href={`/${lang}/umzug-nuernberg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Nürnberg</Link>
                            <Link href={`/${lang}/umzug-schwandorf`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Schwandorf</Link>
                            <Link href={`/${lang}/umzug-amberg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Amberg</Link>
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Angebot für Neumarkt anfordern</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses Festpreisangebot für Ihren Umzug in Neumarkt i.d.OPf.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
