import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Building2, Truck, Wallet, CheckCircle2 } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return {
        title: `Umzugsfirma München | Festpreis & Versichert | FLOXANT`,
        description: "Professionelle Umzugsfirma in München & Oberbayern. Halteverbotszone, Aufzugsservice, Fernumzüge. Festpreisgarantie, voll versichert. Jetzt kostenloses Angebot anfordern!",
        alternates: {
            canonical: `https://www.floxant.de/${lang}/umzug-muenchen`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://www.floxant.de/${l}/umzug-muenchen`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function UmzugMuenchen({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const content = (dict as any).pages?.umzug_muenchen;

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in München?", "acceptedAnswer": { "@type": "Answer", "text": "Ein lokaler Umzug in München kostet zwischen 600 und 3.000 Euro je nach Wohnungsgröße und Etage. FLOXANT bietet verbindliche Festpreise nach kostenloser Besichtigung." } },
            { "@type": "Question", "name": "Kümmert sich FLOXANT um die Halteverbotszone in München?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wir beantragen und organisieren Halteverbotszonen in München für einen reibungslosen Umzugstag." } },
            { "@type": "Question", "name": "Bietet FLOXANT Fernumzüge von München an?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wir organisieren Fernumzüge von München nach ganz Deutschland, insbesondere NRW und Norddeutschland." } },
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany",
        "name": "FLOXANT Umzug München",
        "description": "Professionelle Umzugsfirma für München & Oberbayern.",
        "url": `https://www.floxant.de/${lang}/umzug-muenchen`,
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "addressLocality": "München", "addressRegion": "Bayern", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 48.1351, "longitude": 11.5820 },
        "areaServed": [{ "@type": "City", "name": "München" }, { "@type": "City", "name": "Freising" }, { "@type": "AdministrativeArea", "name": "Oberbayern" }],
        "priceRange": "$$",
    };

    // Fallback content if dictionary keys aren't available
    const heroPrefix = content?.hero_title_prefix || "Professionelle Umzüge in";
    const heroHighlight = content?.hero_title_highlight || "München";
    const heroDesc = content?.hero_desc || "Ihr Umzugspartner für München und ganz Bayern. Festpreisgarantie, voll versichert, kurzfristig verfügbar.";

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={dict.nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Umzug München" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>{content?.badge || "München & Oberbayern"}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        {heroPrefix} <span className="text-primary">{heroHighlight}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{heroDesc}</p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">{content?.intro_title || "Ihr Umzug in München – Strukturiert und Sicher"}</h2>
                        <p>{content?.intro_text_1 || "München ist eine der begehrtesten Städte Deutschlands. Der angespannte Wohnungsmarkt und die besondere Parkplatzsituation erfordern einen erfahrenen Umzugspartner. FLOXANT organisiert Ihren Umzug in München mit Präzision – von der Halteverbotszone bis zur Schlüsselübergabe."}</p>
                        <p>{content?.intro_text_2 || "Wir beantragen Halteverbotszonen, koordinieren Aufzugsbelegungen und planen Ihren Münchner Umzug bis ins Detail."}</p>
                        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic">
                            <h4 className="text-foreground font-semibold mb-2">{content?.transparency_title || "Festpreisgarantie"}</h4>
                            <p className="m-0 text-sm">{content?.transparency_text || "Unser Festpreis umfasst alle vereinbarten Leistungen. Keine versteckten Zuschläge, keine Nachverhandlungen am Umzugstag."}</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">{content?.portfolio_title || "Leistungen für München"}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm">
                                <Building2 className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-3">{content?.services?.city?.title || "Stadtumzüge"}</h3>
                                <p className="text-sm text-muted-foreground">{content?.services?.city?.desc || "Umzüge innerhalb Münchens – von Schwabing nach Sendling, von der Maxvorstadt nach Bogenhausen."}</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm">
                                <Truck className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-3">{content?.services?.remote?.title || "Fernumzüge"}</h3>
                                <p className="text-sm text-muted-foreground">{content?.services?.remote?.desc || "Von München nach ganz Deutschland. Festpreise, feste Termine."}</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm">
                                <Wallet className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-3">{content?.services?.clearance?.title || "Entrümpelung"}</h3>
                                <p className="text-sm text-muted-foreground">{content?.services?.clearance?.desc || "Professionelle Entrümpelung und Wohnungsauflösung in München und Umgebung."}</p>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">{content?.details_title || "München-Umzug Herausforderungen"}</h2>
                        <p>{content?.details_text || "Münchens angespannter Wohnungsmarkt und die komplexe Parkplatzsituation erfordern besondere Vorbereitung. Wir beantragen Halteverbotszonen und koordinieren Aufzugsbelegungen."}</p>
                        <ul className="list-none pl-0 space-y-4 my-8">
                            <li className="flex items-start gap-3"><div className="mt-1 p-1 bg-primary/10 rounded-full"><CheckCircle2 className="w-4 h-4 text-primary" /></div><div><strong>{content?.features?.inspection || "Kostenlose Besichtigung vor Ort oder per Video"}</strong></div></li>
                            <li className="flex items-start gap-3"><div className="mt-1 p-1 bg-primary/10 rounded-full"><CheckCircle2 className="w-4 h-4 text-primary" /></div><div><strong>{content?.features?.insurance || "Vollversicherung für Ihr Inventar"}</strong></div></li>
                            <li className="flex items-start gap-3"><div className="mt-1 p-1 bg-primary/10 rounded-full"><CheckCircle2 className="w-4 h-4 text-primary" /></div><div><strong>{content?.features?.staff || "Erfahrene Fachkräfte, keine Aushilfen"}</strong></div></li>
                        </ul>
                    </div>

                    {/* FAQ Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Häufige Fragen zum Umzug in München</h2>
                        <div className="space-y-6">
                            {[
                                { q: "Was kostet ein Umzug in München?", a: "Ein lokaler Umzug kostet zwischen 600 und 3.000 Euro. Nach kostenloser Besichtigung erhalten Sie ein verbindliches Festpreisangebot." },
                                { q: "Kümmern Sie sich um die Halteverbotszone?", a: "Ja. Wir beantragen und organisieren die Halteverbotszone direkt vor Ihrer Tür." },
                                { q: "Bieten Sie Fernumzüge von München an?", a: "Ja. Wir organisieren Fernumzüge deutschlandweit, insbesondere nach NRW und Norddeutschland." },
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
                        <h3 className="text-lg font-semibold mb-6">Weitere Standorte & Leistungen</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                            <Link href={`/${lang}/umzug-nuernberg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Nürnberg</Link>
                            <Link href={`/${lang}/umzug-augsburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Augsburg</Link>
                            <Link href={`/${lang}/entruempelung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Bayern</Link>
                            <Link href={`/${lang}/reinigung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Reinigung Bayern</Link>
                            <Link href={`/${lang}/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
                            <Link href={`/${lang}/familienumzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Familienumzug Bayern</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">{content?.cta_title || "Angebot für München anfordern"}</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{content?.cta_text || "Kostenloses, unverbindliches Festpreisangebot für Ihren Umzug in München."}</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
