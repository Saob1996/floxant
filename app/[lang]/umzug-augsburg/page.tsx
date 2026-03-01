import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Leaf, Package, CheckCircle2 } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: "Umzugsfirma Augsburg | Festpreis & Versichert | FLOXANT",
        description: "Zuverlässiger Umzugsservice in Augsburg & Schwaben. Privatumzüge, Full-Service, Fernumzüge deutschlandweit. Festpreisgarantie. Jetzt kostenloses Angebot anfordern!",
        alternates: {
            canonical: `https://www.floxant.de/${lang}/umzug-augsburg`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://www.floxant.de/${l}/umzug-augsburg`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function UmzugAugsburg({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in Augsburg?", "acceptedAnswer": { "@type": "Answer", "text": "Ein Umzug in Augsburg kostet je nach Wohnungsgröße zwischen 400 und 2.500 Euro. FLOXANT bietet verbindliche Festpreise nach kostenloser Besichtigung." } },
            { "@type": "Question", "name": "Bietet FLOXANT Fernumzüge von Augsburg an?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wir organisieren Fernumzüge von Augsburg nach ganz Deutschland mit festen Lieferterminen." } },
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany",
        "name": "FLOXANT Umzug Augsburg",
        "description": "Professionelle Umzugsfirma für Augsburg & Schwaben.",
        "url": `https://www.floxant.de/${lang}/umzug-augsburg`,
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "addressLocality": "Augsburg", "addressRegion": "Bayern", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 48.3705, "longitude": 10.8978 },
        "areaServed": [{ "@type": "City", "name": "Augsburg" }, { "@type": "City", "name": "Friedberg" }, { "@type": "AdministrativeArea", "name": "Schwaben" }],
        "priceRange": "$$",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={dict.nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Umzug Augsburg" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Augsburg & Schwaben</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzugsfirma in <span className="text-primary">Augsburg</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Pünktlich, sauber und zu fairen Festpreisen. FLOXANT ist Ihr Partner für Umzüge in Augsburg, Schwaben und deutschlandweite Fernumzüge.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Augsburg – Eine Stadt im Wandel</h2>
                        <p>Als eine der ältesten Städte Deutschlands bietet Augsburg eine hohe Lebensqualität. Wer hierher zieht oder innerhalb der Stadt wechselt, schätzt die Verbindung aus Tradition und Moderne. Ob Textilviertel, Lechhausen oder Göggingen – unser Team navigiert sicher durch die Fuggerstadt.</p>
                        <p>Wir planen, verpacken und transportieren Ihr Hab und Gut mit höchster Sorgfalt. Egal welches Viertel, welche Etage – FLOXANT nimmt Ihnen die Last ab.</p>
                        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic">
                            <h4 className="text-foreground font-semibold mb-2">Überregionaler Vorteil</h4>
                            <p className="m-0 text-sm">Unsere operative Reichweite erstreckt sich fest über Bayern. Wir sind regelmäßig in Augsburg tätig und kennen die Region bestens. Diese überregionale Aufstellung ist Ihr Vorteil bei Fernumzügen.</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">Unsere Umzugsleistungen für Augsburg</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-6 bg-muted/10 rounded-2xl border border-border/50">
                                <Leaf className="w-10 h-10 text-green-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2">Nachhaltigkeit im Fokus</h3>
                                <p className="text-muted-foreground">Wiederverwendbare Verpackungen und effiziente Routenplanung für einen umweltfreundlichen Umzug.</p>
                            </div>
                            <div className="p-6 bg-muted/10 rounded-2xl border border-border/50">
                                <Package className="w-10 h-10 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-2">Full-Service Paket</h3>
                                <p className="text-muted-foreground">Vom Einpacken des Geschirrs bis zum Aufbau der Schrankwand. Buchen Sie genau die Leistungen, die Sie brauchen.</p>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Qualität, die überzeugt</h2>
                        <p>Ein Umzug ist Vertrauenssache. Diskretion, Höflichkeit und Sauberkeit sind für unsere Mitarbeiter gelebter Standard. Schwere Klaviere oder Tresore transportieren wir mit spezialisiertem Equipment.</p>
                        <h3>Fernumzüge ab Augsburg</h3>
                        <p>Wir garantieren Ihnen feste Liefertermine, damit Sie in Ihrer neuen Heimatstadt sofort planen können. Keine wochenlangen Wartezeiten auf Beiladungen.</p>
                        <h3>Transparenz bei den Kosten</h3>
                        <p>Gerade bei Umzügen innerhalb von Augsburg bieten wir attraktive Pauschalpreise an. Nach einer kurzen Besichtigung erhalten Sie ein Angebot, auf das Sie sich verlassen können.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Häufige Fragen zum Umzug in Augsburg</h2>
                        <div className="space-y-6">
                            {[
                                { q: "Was kostet ein Umzug in Augsburg?", a: "Je nach Wohnungsgröße zwischen 400 und 2.500 Euro. Verbindliches Festpreisangebot nach kostenloser Besichtigung." },
                                { q: "Bieten Sie Fernumzüge an?", a: "Ja. Von Augsburg nach ganz Deutschland mit festen Lieferterminen." },
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                                    <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                                    <p className="text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Weitere Standorte & Leistungen</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-muenchen`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug München</Link>
                            <Link href={`/${lang}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                            <Link href={`/${lang}/umzug-nuernberg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Nürnberg</Link>
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/entruempelung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Bayern</Link>
                            <Link href={`/${lang}/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Angebot für Augsburg anfordern</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses und unverbindliches Festpreisangebot für Ihren Umzug.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
