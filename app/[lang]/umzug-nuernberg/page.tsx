import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, History, Truck, Calculator, CheckCircle2, ArrowRight } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: "Umzugsfirma Nürnberg | Festpreis & Versichert | FLOXANT",
        description: "Professionelle Umzugsfirma in Nürnberg & Franken. Altstadt-Umzüge, Fernumzüge nach NRW, Festpreisgarantie. Voll versichert. Jetzt kostenloses Angebot anfordern!",
        alternates: {
            canonical: `https://www.floxant.de/${lang}/umzug-nuernberg`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://www.floxant.de/${l}/umzug-nuernberg`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function UmzugNuernberg({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in Nürnberg?", "acceptedAnswer": { "@type": "Answer", "text": "Ein lokaler Umzug in Nürnberg kostet zwischen 500 und 2.500 Euro. FLOXANT bietet verbindliche Festpreise nach kostenloser Besichtigung." } },
            { "@type": "Question", "name": "Bietet FLOXANT Fernumzüge von Nürnberg an?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Durch wöchentliche Touren Franken-NRW können wir besonders effiziente und kostengünstige Fernumzüge anbieten." } },
            { "@type": "Question", "name": "Kümmert sich FLOXANT um die Halteverbotszone?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wir beantragen und organisieren Halteverbotszonen in Nürnberg für einen reibungslosen Umzugstag." } },
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany",
        "name": "FLOXANT Umzug Nürnberg",
        "description": "Professionelle Umzugsfirma für Nürnberg & Franken.",
        "url": `https://www.floxant.de/${lang}/umzug-nuernberg`,
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "addressLocality": "Nürnberg", "addressRegion": "Bayern", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 49.4521, "longitude": 11.0767 },
        "areaServed": [{ "@type": "City", "name": "Nürnberg" }, { "@type": "City", "name": "Fürth" }, { "@type": "City", "name": "Erlangen" }, { "@type": "City", "name": "Feucht" }],
        "priceRange": "$$",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={dict.nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Umzug Nürnberg" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Nürnberg & Metropolregion</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzugsfirma in <span className="text-primary">Nürnberg</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Ob Altstadt oder Außenbezirk – FLOXANT bringt Sie sicher in Ihr neues Zuhause. Kompetent, zuverlässig und zum Festpreis.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Wohnungswechsel in der Frankenmetropole</h2>
                        <p>Nürnberg verbindet Geschichte mit Moderne, enge Gassen unter der Burg mit weitläufigen Wohngebieten. Ein Umzug hier verlangt Ortskenntnis und solide Logistik. FLOXANT kennt die Herausforderungen, die ein Standortwechsel in dieser historischen Stadt mit sich bringt – von der Südstadt über Gostenhof bis nach Langwasser.</p>
                        <p>Wir planen den Ablauf so, dass Sie sich um nichts kümmern müssen. Parkverbotszonen, Etagenlogistik oder der sichere Transport von Antiquitäten – wir haben die Lösungen.</p>
                        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic">
                            <h4 className="text-foreground font-semibold mb-2">Operativer Standort-Vorteil</h4>
                            <p className="m-0 text-sm">FLOXANT fährt regelmäßige Touren nach Nürnberg und die fränkische Metropolregion. Durch unsere wöchentlichen Verbindungen sind Fernumzüge von Nürnberg nach NRW oder Norddeutschland besonders effizient und kostengünstig.</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">Leistungen für Nürnberg</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { icon: <History className="w-6 h-6 text-primary" />, title: "Umzüge in historischen Vierteln", desc: "Besondere Vorsicht und Ausrüstung für enge Altbau-Treppenhäuser und denkmalgeschützte Gebäude." },
                                { icon: <Truck className="w-6 h-6 text-primary" />, title: "Fernumzüge Franken – NRW", desc: "Spezialisierte Logistik für Langstrecken. Wöchentliche Touren ermöglichen flexible Planung." },
                                { icon: <Calculator className="w-6 h-6 text-primary" />, title: "Festpreisgarantie", desc: "Keine Nachverhandlungen am Umzugstag. Unser Angebot gilt bindend." },
                                { icon: <CheckCircle2 className="w-6 h-6 text-primary" />, title: "Full-Service", desc: "Einpacken, Möbelmontage, Lampeninstallation. Sie kommen an, wir machen den Rest." },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit">{item.icon}</div>
                                    <div><h3 className="text-lg font-bold mb-2">{item.title}</h3><p className="text-muted-foreground">{item.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Herausforderungen in Nürnberg meistern</h2>
                        <p>Die Parksituation, insbesondere in der Südstadt oder Gostenhof, kann kritisch sein. Wir kümmern uns rechtzeitig um die behördliche Einrichtung einer Halteverbotszone direkt vor Ihrer Haustür.</p>
                        <h3>Qualitätsversprechen</h3>
                        <p>Bei FLOXANT arbeiten keine Aushilfen. Unsere Teams bestehen aus erfahrenen Möbelpackern, die ihr Handwerk verstehen. Hochwertige Packmaterialien vermeiden Kratzer und Schäden. Unsere umfassende Transportversicherung gibt zusätzliche Sicherheit.</p>
                        <div className="my-10 p-6 bg-card rounded-2xl border border-border shadow-sm">
                            <h4 className="text-xl font-bold mb-4">Checkliste für Ihren Nürnberg-Umzug</h4>
                            <ul className="space-y-2 list-disc pl-5">
                                <li>Rechtzeitig Halteverbot beantragen (machen wir für Sie)</li>
                                <li>Sperrmüll-Termin bei der Stadt Nürnberg vereinbaren oder Entrümpelung durch uns buchen</li>
                                <li>Wohnungsübergabeprotokoll vorbereiten</li>
                                <li>Zählerstände (Strom, Gas, Wasser) dokumentieren</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Häufige Fragen zum Umzug in Nürnberg</h2>
                        <div className="space-y-6">
                            {[
                                { q: "Was kostet ein Umzug in Nürnberg?", a: "Ein lokaler Umzug kostet zwischen 500 und 2.500 Euro. Wir kalkulieren nach kostenloser Besichtigung einen verbindlichen Festpreis." },
                                { q: "Bieten Sie Fernumzüge von Nürnberg an?", a: "Ja. Wöchentliche Touren nach NRW und ganz Deutschland ermöglichen besonders effiziente Preise." },
                                { q: "Kümmern Sie sich um die Halteverbotszone?", a: "Ja. Wir beantragen und organisieren Halteverbotszonen für einen reibungslosen Umzugstag in Nürnberg." },
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                                    <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                                    <p className="text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Weitere Leistungen & Standorte</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                            <Link href={`/${lang}/umzug-muenchen`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug München</Link>
                            <Link href={`/${lang}/umzug-augsburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Augsburg</Link>
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/entruempelung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Bayern</Link>
                            <Link href={`/${lang}/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
                            <Link href={`/${lang}/24h-umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">24h Umzug Bayern</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Ihr Angebot für Nürnberg</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses und unverbindliches Festpreisangebot für Ihren Umzug in Nürnberg.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
