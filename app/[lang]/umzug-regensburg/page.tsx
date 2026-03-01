import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Milestone, Layers, Award, ArrowRight } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: "Umzugsfirma Regensburg | Festpreis & Versichert | FLOXANT",
        description: "Professionelle Umzugsfirma in Regensburg & Oberpfalz. Privatumzüge, Firmenumzüge, Fernumzüge. Festpreisgarantie, voll versichert. Kostenlose Besichtigung – jetzt Angebot anfordern!",
        alternates: {
            canonical: `https://www.floxant.de/${lang}/umzug-regensburg`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://www.floxant.de/${l}/umzug-regensburg`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function UmzugRegensburg({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in Regensburg?", "acceptedAnswer": { "@type": "Answer", "text": "Ein lokaler Umzug in Regensburg kostet zwischen 400 und 2.000 Euro je nach Wohnungsgröße. FLOXANT bietet verbindliche Festpreise nach kostenloser Besichtigung." } },
            { "@type": "Question", "name": "Macht FLOXANT auch Umzüge in der Regensburger Altstadt?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, wir sind spezialisiert auf Altstadt-Logistik: enge Gassen, Fußgängerzonen, denkmalgeschützte Gebäude. Wir kümmern uns um Genehmigungen für Zufahrten." } },
            { "@type": "Question", "name": "Bieten Sie Fernumzüge ab Regensburg an?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wir organisieren Fernumzüge von Regensburg nach ganz Deutschland, insbesondere NRW. Wöchentliche Touren ermöglichen effiziente Preise." } },
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany",
        "name": "FLOXANT Umzug Regensburg",
        "description": "Professionelle Umzugsfirma in Regensburg – Privatumzüge, Firmenumzüge, Entrümpelungen.",
        "url": `https://www.floxant.de/${lang}/umzug-regensburg`,
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "addressLocality": "Regensburg", "addressRegion": "Bayern", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 49.0134, "longitude": 12.1016 },
        "areaServed": [{ "@type": "City", "name": "Regensburg" }, { "@type": "AdministrativeArea", "name": "Oberpfalz" }],
        "priceRange": "$$",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={dict.nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Umzug Regensburg" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Regensburg & Oberpfalz</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzugsfirma in <span className="text-primary">Regensburg</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        FLOXANT ist Ihr Umzugspartner in Regensburg und der Oberpfalz. Altstadt-Logistik, Festpreisgarantie und voll versicherter Transport – von der UNESCO-Welterbestadt in ganz Deutschland.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Umziehen im Herzen der Oberpfalz</h2>
                        <p>Regensburg begeistert mit seinen mittelalterlichen Gassen und der lebendigen Atmosphäre. Doch was für Touristen charmant ist, kann beim Umzug zur Herausforderung werden. Enge Zufahrten, Fußgängerzonen und denkmalgeschützte Bauten erfordern Feingefühl und genaue Planung. FLOXANT bringt die nötige Erfahrung mit, um auch in schwierigen Lagen einen reibungslosen Ablauf zu garantieren.</p>
                        <p>Wir kümmern uns nicht nur um den Transport, sondern auch um die behördlichen Genehmigungen für Zufahrten in der Altstadt. So vermeiden Sie Bußgelder und Stress am Umzugstag.</p>
                        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic">
                            <h4 className="text-foreground font-semibold mb-2">Unser Standort-Konzept</h4>
                            <p className="m-0 text-sm">Regensburg ist das operative Zentrum von FLOXANT in Bayern. Von hier aus koordinieren wir Einsätze in der gesamten Oberpfalz und ganz Bayern. Die Nähe zu unseren Kunden bedeutet kurze Reaktionszeiten, hohe Flexibilität und persönliche Betreuung vor Ort.</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">Unsere Kompetenzen für Regensburg</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Milestone className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">Altstadt-Logistik</h3>
                                <p className="text-sm text-muted-foreground">Spezialisiert auf enge Gassen, Fußgängerzonen und denkmalgeschützte Gebäude in der Regensburger Altstadt.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Layers className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">Sorgfältige Verpackung</h3>
                                <p className="text-sm text-muted-foreground">Hochwertige Materialien zum Schutz Ihres Inventars. Spezialverpackung für Antiquitäten und empfindliche Gegenstände.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Award className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">Festpreisgarantie</h3>
                                <p className="text-sm text-muted-foreground">Verbindliche Angebote nach kostenloser Besichtigung. Keine versteckten Kosten, keine Nachverhandlungen.</p>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Modularer Service für jeden Bedarf</h2>
                        <p>Ein Umzug ist ein komplexes Projekt. Wir bieten Ihnen einen modularen Service an. Möchten Sie selbst packen und wir übernehmen nur den Transport? Oder wünschen Sie das Rundum-Sorglos-Paket, bei dem Sie am Abend nur noch die Schlüssel für das fertig eingerichtete neue Zuhause übernehmen müssen?</p>
                        <h3>Fernumzüge ab Regensburg</h3>
                        <p>Regensburg ist ein bedeutender Wirtschaftsstandort, was oft berufliche Wechsel mit sich bringt. Wenn Ihr Weg Sie von hier in eine andere Metropole Deutschlands führt, sind wir an Ihrer Seite. Fernumzüge koordinieren wir mit höchster Präzision. Beladung und Entladung werden getaktet, damit sie perfekt in Ihren Zeitplan passen.</p>
                        <h3>Service für Studenten und Senioren</h3>
                        <p>Regensburg ist Universitätsstadt. Für Studierende bieten wir flexible und kostengünstige Lösungen an. Gleichzeitig betreuen wir Senioren mit besonderer Sensibilität und Geduld beim Wechsel in eine altersgerechte Wohnung.</p>
                    </div>

                    {/* FAQ Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Häufige Fragen zum Umzug in Regensburg</h2>
                        <div className="space-y-6">
                            {[
                                { q: "Was kostet ein Umzug in Regensburg?", a: "Ein lokaler Umzug kostet zwischen 400 und 2.000 Euro je nach Wohnungsgröße. Nach kostenloser Besichtigung erhalten Sie ein verbindliches Festpreisangebot." },
                                { q: "Machen Sie auch Umzüge in der Altstadt?", a: "Ja. Wir sind auf Altstadt-Logistik spezialisiert und kümmern uns um alle nötigen Genehmigungen für Zufahrten in der Fußgängerzone." },
                                { q: "Bieten Sie Fernumzüge ab Regensburg an?", a: "Ja. Wöchentliche Touren nach NRW und ganz Deutschland ermöglichen effiziente Preise für Fernumzüge." },
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                                    <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                                    <p className="text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Internal Links */}
                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Weitere Leistungen in Regensburg & Bayern</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/reinigung-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Reinigung Regensburg</Link>
                            <Link href={`/${lang}/entruempelung-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Regensburg</Link>
                            <Link href={`/${lang}/buero-umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Büroumzug Regensburg</Link>
                            <Link href={`/${lang}/studentenumzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Studentenumzug Regensburg</Link>
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
                            <Link href={`/${lang}/entruempelung-kosten-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Kosten Regensburg</Link>
                            <Link href={`/${lang}/umzug-nuernberg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Nürnberg</Link>
                            <Link href={`/${lang}/umzug-muenchen`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug München</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Ihr Umzug in Regensburg</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kontaktieren Sie uns noch heute. Wir erstellen Ihr individuelles Festpreisangebot.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
