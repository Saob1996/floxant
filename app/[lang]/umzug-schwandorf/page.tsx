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
        path: 'umzug-schwandorf',
        title: 'Umzugsfirma Schwandorf | Festpreis | FLOXANT',
        description: 'Professionelle Umzugsfirma in Schwandorf & Oberpfalz. Privatumzüge, Entrümpelung, Fernumzüge. Festpreisgarantie, voll versichert. Kurze Anfahrt ab Regensburg.',
    });
}

export default async function UmzugSchwandorf({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in Schwandorf?", "acceptedAnswer": { "@type": "Answer", "text": "Ein lokaler Umzug in Schwandorf kostet zwischen 350 und 1.600 Euro. FLOXANT bietet verbindliche Festpreise nach Besichtigung." } },
            { "@type": "Question", "name": "Bietet FLOXANT auch Entrümpelung in Schwandorf?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wir bieten professionelle Entrümpelung und Wohnungsauflösung in Schwandorf und der gesamten Oberpfalz." } },
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany", "name": "FLOXANT Umzug Schwandorf",
        "url": `https://www.floxant.de/${lang}/umzug-schwandorf`, "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "addressLocality": "Schwandorf", "addressRegion": "Bayern", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 49.3262, "longitude": 12.1104 },
        "areaServed": [{ "@type": "City", "name": "Schwandorf" }, { "@type": "AdministrativeArea", "name": "Oberpfalz" }], "priceRange": "$$",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Umzug Schwandorf" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Schwandorf & Oberpfalz</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzugsfirma in <span className="text-primary">Schwandorf</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Professionelle Umzüge in Schwandorf und Umgebung. FLOXANT – Ihr zuverlässiger Partner in der Oberpfalz mit Festpreisgarantie.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Umzug in Schwandorf – Zuverlässig und Fair</h2>
                        <p>Schwandorf, die größte Stadt im gleichnamigen Landkreis, ist ein wichtiger Verkehrsknotenpunkt in der Oberpfalz. Die zentrale Lage macht Schwandorf zu einem beliebten Wohnort für Pendler nach Regensburg, Amberg und Weiden. FLOXANT bietet maßgeschneiderte Umzugslösungen für die gesamte Region.</p>
                        <p>Ob Stadtumzug innerhalb Schwandorfs, Umzug in die umliegenden Gemeinden oder Fernumzug nach ganz Deutschland – unser Team kennt die lokalen Gegebenheiten und plant Ihren Umzug effizient.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: <Clock className="w-8 h-8 text-primary" />, title: "Kurze Wege", desc: "Direkte Anbindung ab unserem Regensburger Zentrum. Schnelle Verfügbarkeit." },
                            { icon: <Shield className="w-8 h-8 text-primary" />, title: "Festpreis", desc: "Verbindliches Angebot nach Besichtigung. Alles inklusive, keine Überraschungen." },
                            { icon: <Truck className="w-8 h-8 text-primary" />, title: "Voller Service", desc: "Verpackung, Transport, Montage und Entrümpelung – alles aus einer Hand." },
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
                                { q: "Was kostet ein Umzug in Schwandorf?", a: "Zwischen 350 und 1.600 Euro je nach Wohnungsgröße. Verbindlicher Festpreis nach Besichtigung." },
                                { q: "Bieten Sie auch Entrümpelung in Schwandorf?", a: "Ja. Professionelle Entrümpelung und Wohnungsauflösung für Schwandorf und die gesamte Oberpfalz." },
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
                            <Link href={`/${lang}/umzug-amberg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Amberg</Link>
                            <Link href={`/${lang}/umzug-neumarkt`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Neumarkt</Link>
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/entruempelung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Bayern</Link>
                            <Link href={`/${lang}/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Angebot für Schwandorf anfordern</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses Festpreisangebot für Ihren Umzug in Schwandorf.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
