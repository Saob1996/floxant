import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, CheckCircle2, ArrowRight } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: "Einsatzgebiet Bayern | Servicegebiet | FLOXANT",
        description: "FLOXANT Servicegebiet: Ganz Bayern mit Schwerpunkt Regensburg, Nürnberg, München, Feucht & Oberpfalz. Umzug, Reinigung, Entrümpelung – bayernweit verfügbar.",
        alternates: {
            canonical: `https://floxant.de/${lang}/service-area-bayern`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://floxant.de/${l}/service-area-bayern`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function ServiceAreaBayern({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "FLOXANT",
        "description": "Professionelles Umzugsunternehmen für Bayern – Umzug, Reinigung, Entrümpelung.",
        "url": "https://floxant.de",
        "telephone": "+4915771105087",
        "email": "info@floxant.de",
        "address": { "@type": "PostalAddress", "streetAddress": "Johanna-Kinkel-Straße 1 + 2", "addressLocality": "Regensburg", "postalCode": "93049", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 49.0134, "longitude": 12.1016 },
        "areaServed": [
            { "@type": "State", "name": "Bayern" },
            { "@type": "City", "name": "Regensburg" },
            { "@type": "City", "name": "Nürnberg" },
            { "@type": "City", "name": "München" },
            { "@type": "City", "name": "Augsburg" },
            { "@type": "City", "name": "Feucht" },
            { "@type": "AdministrativeArea", "name": "Oberpfalz" },
        ],
        "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 49.0134, "longitude": 12.1016 },
            "geoRadius": "200000"
        },
    };

    const regions = [
        { name: "Regensburg & Oberpfalz", desc: "Unser operatives Zentrum. Höchste Verfügbarkeit und kürzeste Reaktionszeiten. Regensburg, Neutraubling, Neumarkt i.d.OPf., Schwandorf, Amberg, Weiden.", cities: ["Regensburg", "Neutraubling", "Neumarkt i.d.OPf.", "Schwandorf", "Amberg", "Weiden"] },
        { name: "Nürnberg & Metropolregion", desc: "Regelmäßige Einsätze in der fränkischen Metropolregion. Nürnberg, Fürth, Erlangen, Schwabach, Feucht, Schwarzenbruck, Altdorf.", cities: ["Nürnberg", "Fürth", "Erlangen", "Schwabach", "Feucht"] },
        { name: "München & Oberbayern", desc: "Professionelle Umzüge in der Landeshauptstadt und Umgebung. München, Freising, Dachau, Erding, Rosenheim.", cities: ["München", "Freising", "Dachau", "Erding", "Rosenheim"] },
        { name: "Augsburg & Schwaben", desc: "Umzüge, Reinigung und Entrümpelung im schwäbischen Raum. Augsburg, Friedberg, Donauwörth, Günzburg.", cities: ["Augsburg", "Friedberg", "Donauwörth"] },
    ];

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Einsatzgebiet Bayern" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Bayernweit im Einsatz</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Unser Einsatzgebiet in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        FLOXANT operiert bayernweit mit Schwerpunkt in Regensburg und der Oberpfalz. Von unserem operativen Zentrum aus betreuen wir Kunden in allen bayerischen Städten und Regionen – flexibel, zuverlässig und mit mobilen Teams.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Mobiles Servicemodell für ganz Bayern</h2>
                        <p>FLOXANT arbeitet mit einem mobilen Servicemodell. Unser Firmensitz liegt in Regensburg, von wo aus wir Einsätze in ganz Bayern koordinieren. Unsere Teams fahren zu Ihnen – egal ob Großstadt oder ländlicher Raum. Alle Leistungen sind vor Ort verfügbar: Umzug, Reinigung, Entrümpelung, Wohnungsauflösung und unsere Signature Services.</p>
                        <p>Durch unser Netzwerk und die regelmäßigen Fahrten innerhalb Bayerns können wir auch logistisch effiziente Beiladungen anbieten und Fernumzüge nach NRW und ganz Deutschland organisieren.</p>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-foreground">Unsere Regionen</h2>
                        {regions.map((region, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                                <h3 className="text-xl font-bold mb-3">{region.name}</h3>
                                <p className="text-muted-foreground mb-4">{region.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {region.cities.map(city => (
                                        <span key={city} className="px-3 py-1 rounded-full bg-background text-sm border border-border/50">{city}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Services Overview */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Verfügbare Leistungen</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: "Umzug Bayern", href: `/${lang}/umzug-bayern` },
                                { label: "Entrümpelung Bayern", href: `/${lang}/entruempelung-bayern` },
                                { label: "Reinigung Bayern", href: `/${lang}/reinigung-bayern` },
                                { label: "Wohnungsauflösung Bayern", href: `/${lang}/wohnungsaufloesung-bayern` },
                                { label: "Umzug Regensburg", href: `/${lang}/umzug-regensburg` },
                                { label: "Umzug Nürnberg", href: `/${lang}/umzug-nuernberg` },
                                { label: "Umzug München", href: `/${lang}/umzug-muenchen` },
                                { label: "24h Umzugsservice", href: `/${lang}/24h-umzug-bayern` },
                            ].map(link => (
                                <Link key={link.href} href={link.href} className="flex items-center gap-2 p-3 bg-background rounded-lg hover:shadow-md transition-all text-sm font-medium border border-border/30">
                                    <ArrowRight className="w-4 h-4 text-primary" /> {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Angebot für Ihre Region anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Egal wo in Bayern – wir erstellen Ihr individuelles Angebot.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
