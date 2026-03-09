import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { generatePageSEO } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Shield, GraduationCap, Truck } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: 'umzug-landshut',
        title: 'Umzugsfirma Landshut | Niederbayern | FLOXANT',
        description: 'Professionelle Umzugsfirma in Landshut & Niederbayern. Privatumzüge, Studentenumzüge, Fernumzüge. Festpreisgarantie, voll versichert.',
    });
}

export default async function UmzugLandshut({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in Landshut?", "acceptedAnswer": { "@type": "Answer", "text": "Ein lokaler Umzug in Landshut kostet zwischen 400 und 2.000 Euro. FLOXANT bietet verbindliche Festpreise nach Besichtigung." } },
            { "@type": "Question", "name": "Bietet FLOXANT Studentenumzüge in Landshut?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Als Hochschulstadt bieten wir flexible und günstige Studentenumzüge in Landshut und Umgebung." } },
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany", "name": "FLOXANT Umzug Landshut",
        "url": `https://www.floxant.de/${lang}/umzug-landshut`, "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "addressLocality": "Landshut", "addressRegion": "Bayern", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 48.5369, "longitude": 12.1522 },
        "areaServed": [{ "@type": "City", "name": "Landshut" }, { "@type": "AdministrativeArea", "name": "Niederbayern" }], "priceRange": "$$",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Umzug Landshut" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Landshut & Niederbayern</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzugsfirma in <span className="text-primary">Landshut</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        FLOXANT – Ihr Umzugspartner für Landshut und Niederbayern. Altstadt-Erfahrung, Studentenumzüge und Festpreisgarantie.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Umzug in Landshut – Die Burg-Stadt</h2>
                        <p>Landshut, die Hauptstadt Niederbayerns, beeindruckt mit der Burg Trausnitz und einer wunderschönen gotischen Altstadt. Die historische Bausubstanz und die engen Altstadtgassen erfordern beim Umzug besonders sorgfältige Planung – genau unsere Spezialität.</p>
                        <p>Als Hochschulstadt zieht Landshut regelmäßig Studierende an. FLOXANT bietet flexible Studentenumzüge ebenso wie Full-Service-Umzüge für Familien und Senioren.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: <GraduationCap className="w-8 h-8 text-primary" />, title: "Studentenumzüge", desc: "Flexible, kostengünstige Lösungen für Studierende der Hochschule Landshut." },
                            { icon: <Shield className="w-8 h-8 text-primary" />, title: "Festpreisgarantie", desc: "Verbindliches Angebot nach Besichtigung. Komplett transparent." },
                            { icon: <Truck className="w-8 h-8 text-primary" />, title: "Fernumzüge", desc: "Von Landshut nach München, NRW oder Hamburg – termingenau." },
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
                                { q: "Was kostet ein Umzug in Landshut?", a: "Zwischen 400 und 2.000 Euro. Verbindlicher Festpreis nach kostenloser Besichtigung." },
                                { q: "Bieten Sie Studentenumzüge in Landshut?", a: "Ja. Flexible und günstige Lösungen für Studierende – von Einzelzimmer bis WG-Umzug." },
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
                            <Link href={`/${lang}/umzug-straubing`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Straubing</Link>
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Angebot für Landshut anfordern</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses Festpreisangebot für Ihren Umzug in Landshut.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
