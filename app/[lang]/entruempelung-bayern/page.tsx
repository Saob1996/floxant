import { i18n } from "@/i18n-config";
import { type Locale } from "@/i18n-config";
import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
const DualCalculator = dynamic(
    () => import("@/components/calculator/DualCalculator"),
    { loading: () => <div className="w-full max-w-7xl mx-auto min-h-[400px] animate-pulse bg-white/5 rounded-3xl" /> }
);

import Link from "next/link";
import { CheckCircle2, MapPin, Shield, Clock, Leaf, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = (dict?.pages as any)?.entruempelung_bayern || {};
    return {
        title: (content as any).meta_title || "Entrümpelung Bayern | Professionelle Räumung | FLOXANT",
        description: (content as any).meta_desc || "Professionelle Entrümpelung in ganz Bayern – Regensburg, Nürnberg, München & Umgebung. Haushaltsauflösung, Gewerberäumung, Nachlassräumung. Versichert, diskret & kurzfristig verfügbar. Sofortpreis online berechnen oder bequem per WhatsApp / Telefon anfragen: +49 1577 1105087.",
        alternates: {
            canonical: `https://floxant.de/${pageLocale}/entruempelung-bayern`,
            languages: i18n.locales.reduce(
                (acc, l) => {
                    acc[l] = `https://floxant.de/${l}/entruempelung-bayern`;
                    return acc;
                },
                {} as Record<string, string>
            ),
        },
    };
}

export default async function EntruempelungBayern({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "LocalBusiness",
        "name": "FLOXANT Entrümpelung Bayern",
        "description": "Professionelle Entrümpelung in ganz Bayern – Regensburg, Nürnberg, München & Umgebung.",
        "url": `https://www.floxant.de/${pageLocale}/entruempelung-bayern`,
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "streetAddress": "Johanna-Kinkel-Straße 1 + 2", "addressLocality": "Regensburg", "postalCode": "93049", "addressRegion": "Bayern", "addressCountry": "DE" },
        "priceRange": "$$"
    };

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "serviceType": "Entrümpelung, Haushaltsauflösung, Gewerberäumung",
        "provider": { "@type": "LocalBusiness", "name": "FLOXANT Entrümpelung Bayern", "telephone": "+4915771105087" },
        "areaServed": [{ "@type": "AdministrativeArea", "name": "Bayern" }]
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://www.floxant.de/${pageLocale}` },
            { "@type": "ListItem", "position": 2, "name": "Entrümpelung", "item": `https://www.floxant.de/${pageLocale}/entruempelung` },
            { "@type": "ListItem", "position": 3, "name": "Entrümpelung Bayern", "item": `https://www.floxant.de/${pageLocale}/entruempelung-bayern` }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs
                lang={pageLocale}
                items={[
                    { label: "Entrümpelung", href: `/${pageLocale}/entruempelung` },
                    { label: "Bayern" },
                ]}
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

            {/* Hero Section */}
            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>Bayernweit im Einsatz</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Professionelle Entrümpelung in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Haushaltsauflösungen, Nachlassräumungen and Gewerbeentrümpelungen in ganz Bayern. FLOXANT räumt diskret, schnell and umweltbewusst – mit operativem Schwerpunkt in Regensburg and der Oberpfalz.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            
      <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">

                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Entrümpelung in Bayern – zuverlässig and verantwortungsvoll</h2>
                        <p>
                            Eine Entrümpelung ist oft mehr als das Entfernen von Gegenständen. Ob nach einem Todesfall, bei einer Haushaltsauflösung, vor einem Immobilienverkauf oder bei der Räumung einer Gewerbefläche – hinter jeder Entrümpelung steht eine individuelle Geschichte. FLOXANT begegnet jeder Situation mit dem gebotenen Respekt, professioneller Diskretion and der Erfahrung aus hunderten von Aufträgen in ganz Bayern.
                        </p>
                        <p>
                            Unser operativer Schwerpunkt liegt in Regensburg and der Oberpfalz. Von hier aus betreuen wir Kunden in allen bayerischen Regionen: ob in der Landeshauptstadt München, in Nürnberg and der Metropolregion, im Raum Augsburg oder in den ländlichen Gebieten Frankens and Schwabens. Unsere Teams are flexible, kurzfristig verfügbar and arbeiten stets nach einem strukturierten Prozess, der Ihnen volle Transparenz bietet.
                        </p>
                    </div>

                    {/* Trust Signals */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Shield, title: "Voll versichert", desc: "Haftpflichtversicherung für alle Entrümpelungsarbeiten. Ihr Eigentum ist geschützt." },
                            { icon: Clock, title: "Kurzfristig verfügbar", desc: "Schnelle Einsatzbereitschaft – auch bei dringenden Räumungen innerhalb weniger Tage." },
                            { icon: Leaf, title: "Umweltgerecht", desc: "Fachgerechte Trennung and Entsorgung über zertifizierte Partner. Recyclingquote maximiert." },
                            { icon: CheckCircle2, title: "Besenrein garantiert", desc: "Nach der Räumung übergeben wir das Objekt in einwandfreiem Zustand." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50 text-center">
                                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Services */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">Unsere Entrümpelungsleistungen</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-2xl bg-muted/10 border border-border/50">
                                <h3 className="text-xl font-bold mb-4">Haushaltsauflösung</h3>
                                <p className="text-muted-foreground mb-4">
                                    Vollständige Räumung von Privatwohnungen and Häusern. Besonders einfühlsam bei Nachlassräumungen. Wir sortieren, trennen and entsorgen – auf Wunsch spenden wir brauchbare Gegenstände an soziale Einrichtungen in der Region.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Nachlassräumung mit Feingefühl</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Wertgegenstände werden gesichert</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Besenreine Übergabe</li>
                                </ul>
                            </div>
                            <div className="p-8 rounded-2xl bg-muted/10 border border-border/50">
                                <h3 className="text-xl font-bold mb-4">Gewerberäumung</h3>
                                <p className="text-muted-foreground mb-4">
                                    Professionelle Räumung von Büros, Lagerhallen, Praxen and Geschäftsräumen. Auch bei Betriebsaufgabe, Insolvenz oder Standortverlegung. Diskrete and termingerechte Abwicklung – auch außerhalb der Geschäftszeiten möglich.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Gewerbliche Entsorgungsnachweise</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Aktenvernichtung nach DSGVO</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Wochenend- and Abendeinsätze</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Regional Sections */}
                    <div className="space-y-12">
                        <h2 className="text-3xl font-bold text-foreground">Entrümpelung in Ihrer Region</h2>

                        <div className="prose prose-lg max-w-none text-muted-foreground">
                            <h3 className="text-2xl font-bold text-foreground">Entrümpelung in Regensburg & Oberpfalz</h3>
                            <p>
                                Als unser operativer Hauptstandort ist Regensburg das Zentrum unserer Entrümpelungstätigkeit. Wir kennen die lokalen Entsorgungsbetriebe, die städtischen Vorgaben and die Besonderheiten der Altstadtlogistik. Ob Kellerräumung in der Innenstadt, Dachbodenauflösung in Prüfening oder Komplettentsorgung in Neutraubling – unsere Teams are schnell vor Ort and arbeiten mit höchster Sorgfalt.
                            </p>

                            <h3 className="text-2xl font-bold text-foreground">Entrümpelung in Nürnberg & Metropolregion</h3>
                            <p>
                                In Nürnberg and der umliegenden Metropolregion sind wir regelmäßig im Einsatz. Die vielfältige Bausubstanz – von Altbauwohnungen in der Südstadt bis zu Gewerbeeinheiten in Fürth and Erlangen – erfordert jeweils angepasste Vorgehensweisen. Unser Team bringt die nötige Flexibilität and das lokale Wissen mit.
                            </p>

                            <h3 className="text-2xl font-bold text-foreground">Entrümpelung in München</h3>
                            <p>
                                Auch in der bayerischen Landeshauptstadt München führen wir Entrümpelungen durch. Von Schwabinger Altbauwohnungen bis zu Gewerbeeinheiten in Schwabing-Nord oder Berg am Laim – wir organisieren die Zufahrt, beantragen bei Bedarf Halteverbotszonen and führen die Räumung effizient durch.
                            </p>

                            <h3 className="text-2xl font-bold text-foreground">Entrümpelung in Feucht & Umgebung</h3>
                            <p>
                                Im Raum Feucht, Schwarzenbruck and dem direkten Nürnberger Land bieten wir besonders schnelle Einsatzzeiten. Die Nähe zu unserem operativen Netzwerk ermöglicht flexible Terminvereinbarungen and kurzfristige Räumungen.
                            </p>
                        </div>
                    </div>

                    {/* Einsatzgebiet Bayern */}
                    <div className="bg-muted/20 p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-6">Einsatzgebiet Bayern – Ihre Entrümpelung vor Ort</h2>
                        <p className="text-muted-foreground mb-8">
                            FLOXANT führt Entrümpelungen in allen Regionen Bayerns durch. Unsere Teams are flexible and can be used on short notice even in rural areas. Contact us for a non-binding offer.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { href: `/${pageLocale}/entruempelung-regensburg`, label: "Regensburg" },
                                { href: `/${pageLocale}/umzug-nuernberg`, label: "Nürnberg" },
                                { href: `/${pageLocale}/umzug-muenchen`, label: "München" },
                                { href: `/${pageLocale}/umzug-augsburg`, label: "Augsburg" },
                            ].map((link) => (
                                <Link key={link.href} href={link.href} className="flex items-center gap-2 p-3 bg-background rounded-lg hover:shadow-md transition-all text-sm font-medium">
                                    <ArrowRight className="w-4 h-4 text-primary" /> {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Why FLOXANT */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Warum FLOXANT für Ihre Entrümpelung?</h2>
                        <p>
                            Der Markt für Entrümpelungen ist leider von unseriösen Anbietern geprägt, die mit Dumpingpreisen locken and dann vor Ort Nachzahlungen verlangen oder Müll illegal entsorgen. FLOXANT steht für das genaue Gegenteil: transparente Festpreise, nachweisbare Entsorgungswege and die Gewissheit, dass jeder Handgriff professionell and versichert erfolgt.
                        </p>
                        <p>
                            Wir arbeiten ausschließlich mit zertifizierten Entsorgungspartnern zusammen and stellen Ihnen auf Wunsch vollständige Entsorgungsnachweise aus. Bei Nachlassräumungen nehmen wir uns die Zeit, die es braucht – mit Sensibilität and Respekt gegenüber dem Verstorbenen and den Hinterbliebenen.
                        </p>
                    </div>

                    {/* Internal Links */}
                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Weitere Leistungen in Bayern</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${pageLocale}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">{(dict.common as any).umzug_bavaria || "Umzug Bayern"}</Link>
                            <Link href={`/${pageLocale}/reinigung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Reinigung Bayern</Link>
                            <Link href={`/${pageLocale}/wohnungsaufloesung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Wohnungsauflösung Bayern</Link>
                            <Link href={`/${pageLocale}/entruempelung-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Regensburg</Link>
                            <Link href={`/${pageLocale}/service-area-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Einsatzgebiet Bayern</Link>
                            <Link href={`/${pageLocale}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Entrümpelung in Bayern anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Kostenlose Beratung and transparentes Festpreisangebot. Kurzfristig verfügbar in ganz Bayern.
                        </p>
                        <DualCalculator dic={dict} />
                    </div>

                </div>
            </section>
        </main>
    );
}
