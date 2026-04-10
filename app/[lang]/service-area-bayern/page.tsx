import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale, isValidLocale } from "../../../i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const pageLocale: Locale = lang;

    return generatePageSEO({
        pageLocale,
        path: "service-area-bayern",
        title: "Einsatzgebiet Bayern ✓ Wir kommen zu Ihnen | FLOXANT",
        description: "FLOXANT Servicegebiet: Ganz Bayern mit Schwerpunkt Regensburg, Nürnberg, München, Feucht & Oberpfalz. Wir sind bayernweit im Einsatz.",
    });
}

export default async function ServiceAreaBayern({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const pageLocale: Locale = lang;
    const dict = await getDictionary(pageLocale);
    const isDe = pageLocale === "de";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "FLOXANT",
        "description": "Professionelles Umzugsunternehmen für ganz Bayern.",
        "url": `https://www.floxant.de/${pageLocale}/service-area-bayern`,
        "telephone": "+4915771105087",
        "address": { 
            "@type": "PostalAddress", 
            "streetAddress": "Johanna-Kinkel-Straße 1 + 2", 
            "addressLocality": "Regensburg", 
            "postalCode": "93049", 
            "addressCountry": "DE" 
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 49.0134, "longitude": 12.1016 },
        "areaServed": [
            { "@type": "State", "name": "Bayern" },
            { "@type": "City", "name": "Regensburg" },
            { "@type": "City", "name": "Nürnberg" },
            { "@type": "City", "name": "München" },
            { "@type": "City", "name": "Augsburg" }
        ]
    };

    const regions = [
        { 
            name: "Regensburg & Oberpfalz", 
            desc: "Unser operatives Zentrum. Höchste Verfügbarkeit und kürzeste Reaktionszeiten in der gesamten Oberpfalz.", 
            cities: ["Regensburg", "Neutraubling", "Neumarkt", "Schwandorf", "Amberg", "Weiden"] 
        },
        { 
            name: "Nürnberg & Metropolregion", 
            desc: "Regelmäßige Einsätze in der fränkischen Metropolregion inklusive Fürth und Erlangen.", 
            cities: ["Nürnberg", "Fürth", "Erlangen", "Schwabach", "Feucht"] 
        },
        { 
            name: "München & Oberbayern", 
            desc: "Professionelle Umzüge und Reinigungen in der Landeshauptstadt und angrenzenden Landkreisen.", 
            cities: ["München", "Freising", "Dachau", "Erding", "Rosenheim"] 
        },
        { 
            name: "Augsburg & Schwaben", 
            desc: "Umzüge und Entrümpelungen im schwäbischen Raum mit erfahrenen Teams vor Ort.", 
            cities: ["Augsburg", "Friedberg", "Donauwörth", "Günzburg"] 
        },
    ];

    return (
        <main className="min-h-screen bg-background text-start">
            <Breadcrumbs lang={pageLocale} items={[{ label: "Einsatzgebiet Bayern" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>Bayernweit im Einsatz</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
                        Einsatzgebiet in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        FLOXANT operiert bayernweit mit Schwerpunkt in Regensburg und der Oberpfalz. Von unserem operativen Zentrum aus betreuen wir Kunden in allen bayerischen Regionen – flexibel und zuverlässig.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24 text-start">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Mobiles Servicemodell für den Freistaat</h2>
                        <p>
                            FLOXANT arbeitet mit einem mobilen Servicemodell. Unser Firmensitz liegt in Regensburg, von wo aus wir Einsätze in ganz Bayern koordinieren. Unsere Teams kommen direkt zu Ihnen – egal ob Großstadt oder ländlicher Raum.
                        </p>
                        <p>
                            Alle Leistungen sind vor Ort verfügbar: Umzug, Reinigung, Entrümpelung und Wohnungsauflösung. Durch unser dichtes Netzwerk können wir auch kurzfristige Termine realisieren.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-foreground">Unsere Fokus-Regionen</h2>
                        <div className="grid grid-cols-1 gap-6">
                            {regions.map((region, i) => (
                                <div key={i} className="p-8 rounded-3xl bg-muted/10 border border-border/50">
                                    <h3 className="text-xl font-bold mb-3">{region.name}</h3>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">{region.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {region.cities.map(city => (
                                            <span key={city} className="px-3 py-1 rounded-full bg-background text-xs border border-border/50 font-medium">
                                                {city}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {isDe && (
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-8">Service-Übersicht Bayern</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { label: "Umzug Bayern", href: `/${pageLocale}/umzug-bayern` },
                                    { label: "Entrümpelung Bayern", href: `/${pageLocale}/entruempelung-bayern` },
                                    { label: "Reinigung Bayern", href: `/${pageLocale}/reinigung-bayern` },
                                    { label: "Wohnungsauflösung Bayern", href: `/${pageLocale}/wohnungsaufloesung-bayern` },
                                    { label: "Umzug Regensburg", href: `/${pageLocale}/umzug-regensburg` },
                                    { label: "Umzug Nürnberg", href: `/${pageLocale}/umzug-nuernberg` },
                                    { label: "Umzug München", href: `/${pageLocale}/umzug-muenchen` },
                                    { label: "24h Umzugsservice", href: `/${pageLocale}/24h-umzug-bayern` },
                                ].map(link => (
                                    <Link key={link.href} href={link.href} className="flex items-center gap-3 p-4 bg-background rounded-2xl hover:shadow-lg transition-all text-sm font-semibold border border-border/50 group">
                                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" /> 
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div id="kontakt" className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-[3rem] border border-primary/10 shadow-lg scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-4">Angebot für Ihre Region</h2>
                        <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
                            Egal wo in Bayern – wir erstellen Ihr individuelles und kostenloses Festpreisangebot.
                        </p>
                        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl">
                            <div className="p-4 md:p-8 text-start">
                                <SmartBookingWizard
                                    dict={{
                                        common: dict.common,
                                        calculator: dict.calculator,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
