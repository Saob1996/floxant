import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);
import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Truck, ShieldCheck, Clock } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: 'umzug-bayern',
        title: 'Umzugsunternehmen Bayern ✓ Festpreis ✓ Versicherung | FLOXANT',
        description: 'Professionelles Umzugsunternehmen in Bayern. Umzug, Entrümpelung und Reinigung mit Festpreis und Versicherung. Jetzt Angebot bei FLOXANT anfragen.',
    });
}

export default async function UmzugBayern({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany", "name": "FLOXANT Umzug Bayern",
        "url": `https://www.floxant.de/${lang}/umzug-bayern`, "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "streetAddress": "Johanna-Kinkel-Straße 1 + 2", "addressLocality": "Regensburg", "postalCode": "93049", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 49.0134, "longitude": 12.1016 },
        "areaServed": [{ "@type": "State", "name": "Bayern" }], "priceRange": "$$",
    };

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "serviceType": "Umzug, Transport, Entrümpelung, Reinigung",
        "provider": { "@type": "LocalBusiness", "name": "FLOXANT Umzug Bayern", "telephone": "+4915771105087" },
        "areaServed": { "@type": "State", "name": "Bayern" }
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://www.floxant.de/${lang}` },
            { "@type": "ListItem", "position": 2, "name": "Umzug Bayern", "item": `https://www.floxant.de/${lang}/umzug-bayern` }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={dict.nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

            {/* Hero Section */}
            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>Bayern & Deutschlandweit</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzugsunternehmen in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Ihr Partner für stressfreie Wohnungswechsel. FLOXANT koordiniert Ihren Umzug mit Präzision und Sorgfalt – von Bayern in jede Region Deutschlands.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">

                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Ihr Umzug in Bayern – Strukturiert und Sicher</h2>
                        <p>
                            Ein Umzug ist weit mehr als der Transport von Möbeln von A nach B. Er markiert einen neuen Lebensabschnitt, eine Veränderung, die oft mit viel Organisation und emotionalem Aufwand verbunden ist. Bei FLOXANT verstehen wir diese Herausforderung genau. Unser Anspruch ist es, Ihnen nicht nur schwere Kisten, sondern auch die Last der Planung abzunehmen.
                        </p>
                        <p className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic">
                            <strong>Operativer Schwerpunkt Bayern:</strong> FLOXANT hat seinen Firmensitz in Regensburg. Von hier aus sind unsere Teams regelmäßig in ganz Bayern im Einsatz – in München, Nürnberg, Augsburg, Feucht und allen umliegenden Regionen. Zusätzlich organisieren wir routiniert Fernumzüge von Bayern nach NRW und ganz Deutschland.
                        </p>
                        <p>
                            Unsere Philosophie basiert auf architektonischer Ordnung. Wir überlassen nichts dem Zufall. Jeder Handgriff sitzt, jede Phase des Umzugs ist durchgeplant. Das gibt Ihnen die Sicherheit, dass Ihr Hab und Gut in den besten Händen ist.
                        </p>
                    </div>

                    {/* Services Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">Unsere Leistungen in Bayern</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-2xl bg-muted/10 border border-border/50">
                                <Truck className="w-10 h-10 text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-4">Privatumzüge</h3>
                                <p className="text-muted-foreground mb-6">
                                    Ob Single-Appartement oder Familienhaus – wir behandeln Ihren Privatumzug mit Diskretion und Respekt. Unsere Teams sind geschult im Umgang mit sensiblen Gegenständen.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Demontage & Montage</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Ein- und Auspackservice</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Schutz empfindlicher Böden</li>
                                </ul>
                            </div>

                            <div className="p-8 rounded-2xl bg-muted/10 border border-border/50">
                                <Clock className="w-10 h-10 text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-4">Fernumzüge ab Bayern</h3>
                                <p className="text-muted-foreground mb-6">
                                    Von Bayern nach NRW, Hamburg oder Berlin? Fernumzüge sind unsere Spezialität. Logistisch effiziente Lösungen für Langstrecken.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Bundesweite Logistik</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Festpreis-Garantie</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Termintreue Zustellung</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Regional Coverage */}
                    <div className="space-y-12">
                        <h2 className="text-3xl font-bold text-foreground">Umzug in Ihrer Region</h2>
                        <div className="prose prose-lg max-w-none text-muted-foreground">
                            <h3 className="text-2xl font-bold text-foreground">Umzug in Regensburg & Oberpfalz</h3>
                            <p>Regensburg ist unser operatives Zentrum. Ob mittelalterliche Altstadt, Universitätsviertel oder Neubaugebiete am Stadtrand – wir kennen die logistischen Herausforderungen jeder Lage. Enge Zufahrten, Fußgängerzonen und denkmalgeschützte Gebäude erfordern Erfahrung, die wir aus hunderten von Aufträgen mitbringen.</p>

                            <h3 className="text-2xl font-bold text-foreground">Umzug in Nürnberg & Franken</h3>
                            <p>In der Metropolregion Nürnberg sind wir regelmäßig für Privat- und Firmenumzüge im Einsatz. Von der Südstadt über Fürth und Erlangen bis nach Schwabach – unser Team kennt die fränkischen Gegebenheiten und organisiert Ihren Umzug effizient.</p>

                            <h3 className="text-2xl font-bold text-foreground">Umzug in München</h3>
                            <p>Münchens angespannter Wohnungsmarkt und die Parkplatzsituation erfordern besondere Vorbereitung. Wir beantragen Halteverbotszonen, koordinieren Aufzugsbelegungen und planen Ihren Münchner Umzug bis ins Detail.</p>

                            <h3 className="text-2xl font-bold text-foreground">Umzug in Feucht & Nürnberger Land</h3>
                            <p>Im Raum Feucht, Schwarzenbruck und dem Nürnberger Land bieten wir kurze Anfahrtszeiten und flexible Terminvergabe. Ideal für kurzfristige Umzüge in der Region.</p>
                        </div>
                    </div>

                    {/* Why FLOXANT */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Warum FLOXANT für Ihren Umzug wählen?</h2>
                        <h3>Transparente Preisgestaltung</h3>
                        <p>Versteckte Kosten gibt es bei uns nicht. Nach einer detaillierten Bestandsaufnahme erhalten Sie ein verbindliches Festpreisangebot. Darin sind alle Leistungen inkludiert: vom Verpackungsmaterial bis zur Versicherung.</p>
                        <h3>Sicherheit und Versicherung</h3>
                        <p>Als professionelles Unternehmen sind wir umfassend versichert. Eine Haftpflicht- und Transportversicherung schützt Ihr Eigentum während des gesamten Prozesses.</p>
                        <h3>Fokus auf Nachhaltigkeit</h3>
                        <p>Effiziente Routenplanung, wiederverwendbare Verpackungsmaterialien und fachgerechte Trennung bei Entrümpelungen. Bei Fernumzügen kombinieren wir Ladungen intelligent, um CO2 zu sparen.</p>
                    </div>

                    {/* Einsatzgebiet Bayern */}
                    <div className="bg-muted/20 p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-6">Einsatzgebiet Bayern – Alle Standorte</h2>
                        <p className="text-muted-foreground mb-8">
                            Wir sind in allen größeren Städten und Regionen Bayerns aktiv. Unsere Teams kennen die lokalen Gegebenheiten.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href={`/${lang}/umzug-muenchen`} className="flex items-center gap-2 p-3 bg-background rounded-lg hover:shadow-md transition-all text-sm font-medium">
                                <ArrowRight className="w-4 h-4 text-primary" /> München
                            </Link>
                            <Link href={`/${lang}/umzug-nuernberg`} className="flex items-center gap-2 p-3 bg-background rounded-lg hover:shadow-md transition-all text-sm font-medium">
                                <ArrowRight className="w-4 h-4 text-primary" /> Nürnberg
                            </Link>
                            <Link href={`/${lang}/umzug-augsburg`} className="flex items-center gap-2 p-3 bg-background rounded-lg hover:shadow-md transition-all text-sm font-medium">
                                <ArrowRight className="w-4 h-4 text-primary" /> Augsburg
                            </Link>
                            <Link href={`/${lang}/umzug-regensburg`} className="flex items-center gap-2 p-3 bg-background rounded-lg hover:shadow-md transition-all text-sm font-medium">
                                <ArrowRight className="w-4 h-4 text-primary" /> Regensburg
                            </Link>
                        </div>
                    </div>

                    {/* Internal Links */}
                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Weitere Leistungen in Bayern</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/entruempelung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Bayern</Link>
                            <Link href={`/${lang}/reinigung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Reinigung Bayern</Link>
                            <Link href={`/${lang}/wohnungsaufloesung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Wohnungsauflösung Bayern</Link>
                            <Link href={`/${lang}/familienumzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Familienumzug Bayern</Link>
                            <Link href={`/${lang}/seniorenumzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Seniorenumzug Bayern</Link>
                            <Link href={`/${lang}/24h-umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">24h Umzug Bayern</Link>
                            <Link href={`/${lang}/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
                            <Link href={`/${lang}/service-area-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Einsatzgebiet Bayern</Link>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center py-10 bg-primary/5 rounded-3xl border border-primary/10">
                        <h2 className="text-3xl font-bold mb-4">Bereit für den Neustart?</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Fordern Sie jetzt Ihr unverbindliches Festpreisangebot an. Wir beraten Sie gerne persönlich zu Ihrem Umzugsvorhaben in Bayern oder deutschlandweit.
                        </p>
                        <SmartBookingWizard dict={dict} />
                    </div>

                </div>
            </section>

        </main>
    );
}
