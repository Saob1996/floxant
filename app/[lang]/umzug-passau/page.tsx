import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Shield, Truck, Building } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: 'umzug-passau',
        title: 'Umzugsfirma Passau | Niederbayern | FLOXANT',
        description: 'Professionelle Umzugsfirma in Passau & Niederbayern. Privatumzüge, Firmenumzüge, Fernumzüge. Festpreisgarantie, voll versichert.',
    });
}

export default async function UmzugPassau({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in Passau?", "acceptedAnswer": { "@type": "Answer", "text": "Ein lokaler Umzug in Passau kostet zwischen 400 und 2.000 Euro. FLOXANT bietet verbindliche Festpreise nach Besichtigung." } },
            { "@type": "Question", "name": "Bietet FLOXANT Fernumzüge ab Passau?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wir organisieren Fernumzüge von Passau nach ganz Deutschland. Regelmäßige Touren ermöglichen attraktive Preise." } },
            { "@type": "Question", "name": "Macht FLOXANT Umzüge in der Passauer Altstadt?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Passaus Altstadt mit den engen Gassen zwischen Donau und Inn kennen wir genau. Wir kümmern uns um Zufahrtsgenehmigungen." } },
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany", "name": "FLOXANT Umzug Passau",
        "url": `https://www.floxant.de/${lang}/umzug-passau`, "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "streetAddress": "Johanna-Kinkel-Straße 1 + 2", "addressLocality": "Regensburg", "postalCode": "93049", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 48.5748, "longitude": 13.4609 },
        "areaServed": [{ "@type": "City", "name": "Passau" }, { "@type": "AdministrativeArea", "name": "Niederbayern" }], "priceRange": "$$",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Umzug Passau" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Passau &amp; Niederbayern</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzugsfirma in <span className="text-primary">Passau</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        FLOXANT – Ihr Umzugspartner für Passau und Niederbayern. Dreiflüssestadt-Expertise, Festpreisgarantie und voll versicherter Transport.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Umzug in Passau – Die Dreiflüssestadt</h2>
                        <p>Passau, an der Mündung von Donau, Inn und Ilz gelegen, ist eine der schönsten Städte Bayerns. Die historische Altstadt auf der schmalen Halbinsel zwischen den Flüssen stellt besondere Anforderungen an die Umzugslogistik. Enge Gassen, steile Treppen und eingeschränkte Zufahrtsmöglichkeiten erfordern Erfahrung und präzise Planung.</p>
                        <p>FLOXANT bringt genau diese Erfahrung mit. Wir koordinieren Zufahrtsgenehmigungen, setzen kompakte Fahrzeuge ein und planen jeden Handgriff im Voraus. So wird Ihr Umzug in Passau stressfrei und effizient.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: <Building className="w-8 h-8 text-primary" />, title: "Altstadt-Logistik", desc: "Spezialisiert auf die engen Gassen und Treppen der Passauer Altstadt zwischen Donau und Inn." },
                            { icon: <Shield className="w-8 h-8 text-primary" />, title: "Festpreisgarantie", desc: "Verbindliches Angebot nach Besichtigung. Keine versteckten Kosten." },
                            { icon: <Truck className="w-8 h-8 text-primary" />, title: "Fernumzüge", desc: "Von Passau nach München, NRW oder ganz Deutschland – termingenau und versichert." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <div className="mb-4">{item.icon}</div>
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Alle Services aus einer Hand</h2>
                        <p>Neben dem klassischen Umzug bieten wir in Passau auch Entrümpelung, Reinigung und Wohnungsauflösung an. So erhalten Sie alles aus einer Hand – von der alten Wohnung bis zur schlüsselfertigen Übergabe.</p>
                        <h3>Universitätsstadt Passau</h3>
                        <p>Als Universitätsstadt zieht Passau regelmäßig Studierende an. FLOXANT bietet flexible und kostengünstige Studentenumzüge, die perfekt auf kleinere Wohnungen und WG-Zimmer zugeschnitten sind.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Häufige Fragen</h2>
                        <div className="space-y-6">
                            {[
                                { q: "Was kostet ein Umzug in Passau?", a: "Zwischen 400 und 2.000 Euro. Verbindlicher Festpreis nach kostenloser Besichtigung." },
                                { q: "Bieten Sie Fernumzüge ab Passau an?", a: "Ja. Regelmäßige Touren nach NRW und ganz Deutschland ermöglichen faire Preise." },
                                { q: "Machen Sie Umzüge in der Passauer Altstadt?", a: "Ja. Wir kennen die Dreiflüssestadt genau und kümmern uns um alle Genehmigungen." },
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
                            <Link href={`/${lang}/umzug-muenchen`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug München</Link>
                            <Link href={`/${lang}/umzug-landshut`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Landshut</Link>
                            <Link href={`/${lang}/umzug-nuernberg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Nürnberg</Link>
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Angebot für Passau anfordern</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses Festpreisangebot für Ihren Umzug in Passau.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
