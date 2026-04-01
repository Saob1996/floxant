import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
const DualCalculator = dynamic(
    () => import("@/components/calculator/DualCalculator"),
    { loading: () => <div className="w-full max-w-7xl mx-auto min-h-[400px] animate-pulse bg-white/5 rounded-3xl" /> }
);

import Link from "next/link";
import { MapPin, Milestone, Layers, Award, ArrowRight, Shield, CheckCircle2 } from "lucide-react";



export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    return generatePageSEO({
        pageLocale,
        path: 'umzug-amberg',
        title: 'Umzugsunternehmen in Amberg | FLOXANT',
        description: 'Professionelle Umzugsunternehmen in Amberg in Bayern. Seriöse Abwicklung, Festpreisgarantie und versicherter Transport. Jetzt online berechnen!',
    });
}

export default async function UmzugAmberg({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.service_umzug || {};

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
                { "@type": "Question", "name": content.faqs?.[0]?.q || "Was kostet ein Umzug in Amberg?", "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[0]?.a || "Ein lokaler Umzug in Amberg kostet zwischen 400 und 2.000 Euro je nach Wohnungsgröße. FLOXANT bietet verbindliche Festpreise nach kostenloser Besichtigung." } },
                { "@type": "Question", "name": content.faqs?.[1]?.q || "Macht FLOXANT auch Umzüge in der Altstadt von Amberg?", "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[1]?.a || "Ja, wir sind auf schwierige Logistik wie enge Gassen oder viele Treppen spezialisiert und kümmern uns um alle Halteverbotszonen." } },
                { "@type": "Question", "name": content.faqs?.[2]?.q || "Bieten Sie Fernumzüge ab Amberg an?", "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[2]?.a || "Ja. Wir organisieren Fernumzüge von Amberg nach ganz Deutschland." } }
            ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany",
        "name": "FLOXANT Umzug Amberg",
        "description": "Professionelles Umzugsunternehmen. Moving company and clearance services in Amberg. Local moving, long distance, and professional packing.",
        "url": "https://www.floxant.de/" + pageLocale + "/umzug-amberg",
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "addressLocality": "Amberg", "addressRegion": "Bayern", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 49.4429, "longitude": 11.8633 },
        "areaServed": [{ "@type": "City", "name": "Amberg" }, { "@type": "AdministrativeArea", "name": "Oberpfalz" }],
        "priceRange": "$$",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "134", "bestRating": "5" },
    };

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "serviceType": "Umzug, Transport, Entrümpelung, Reinigung",
        "provider": { "@type": "LocalBusiness", "name": "FLOXANT Umzug Amberg", "telephone": "+4915771105087" },
        "areaServed": { "@type": "City", "name": "Amberg" }
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.floxant.de/" + pageLocale },
            { "@type": "ListItem", "position": 2, "name": "Umzug Bayern", "item": "https://www.floxant.de/" + pageLocale + "/umzug-bayern" },
            { "@type": "ListItem", "position": 3, "name": "Umzug Amberg", "item": "https://www.floxant.de/" + pageLocale + "/umzug-amberg" }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs pageLocale={pageLocale} items={[{ label: "Umzug Bayern", href: "/" + pageLocale + "/umzug-bayern" }, { label: "Umzug Amberg" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Amberg & Oberpfalz</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzugsunternehmen in <span className="text-primary">Amberg</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {pageLocale === 'de' ? `FLOXANT ist Ihr starker Umzugspartner für Amberg. Wir bieten {dict.calculator?.fixed_price_tag || "Festpreisgarantie"}, voll versicherten Transport und lokale Expertise für Privathaushalte und Firmen.` : "FLOXANT is your professional partner for moves, cleaning and clearance. We offer fixed price guarantee, fully insured transport and local expertise."}
          </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> {dict.calculator?.insured_tag || "100% Versichert"}</span>
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> {dict.calculator?.inspection_tag || "Kostenlose Besichtigung"}</span>
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2"><Layers className="w-4 h-4 text-primary" /> {dict.calculator?.fixed_price_tag || "Festpreisgarantie"}</span>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Ihr verlässlicher Umzug in Amberg</h2>
                        <p>In Amberg, der historischen Hauptstadt der Oberpfalz, bieten wir moderne Umzugslogistik. Wir beantragen Halteverbote in der eng bebauten historische Altstadt und transportieren schwere Fracht auch über enge Treppen hoch hinaus.</p>
                        <p>Ein Umzug ist mehr als nur der Transport von Kartons. Es ist ein Neustart. Wir von FLOXANT verstehen das und setzen alles daran, Ihren Wohnungswechsel so stressfrei wie möglich zu gestalten. Neben dem reinen Möbeltransport bieten wir Ihnen in Amberg auch professionelle Demontage- und Montagearbeiten, Einpackservice sowie die Bereitstellung von hochwertigem Verpackungsmaterial an.</p>
                        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic mt-6">
                            <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" />{dict.common.transparency_start}</h4>
                            <p className="m-0 text-sm">Nach unser kostenlosen, oft virtuellen Besichtigung erhalten Sie ein verbindliches Festpreisangebot. Keine versteckten Gebühren, keine Stundensätze, die aus dem Ruder laufen. Sie wissen genau, was Ihr Umzug in Amberg kosten wird.</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">Unsere Kompetenzen für Amberg</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Milestone className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">{dict.common.local_expertise}</h3>
                                <p className="text-sm text-muted-foreground">Kenntnis der örtlichen Gegebenheiten, Treppenhäuser und Halteverbots-Beantragung direkt in Amberg.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Shield className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">{dict.common.full_insurance}</h3>
                                <p className="text-sm text-muted-foreground">{dict.common.full_insurance_desc}</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Award className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">{dict.calculator?.fixed_price_tag || "Festpreisgarantie"}</h3>
                                <p className="text-sm text-muted-foreground">Verbindliche Angebote nach kostenloser Besichtigung. Keine versteckten Kosten, keine Nachverhandlungen.</p>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">{dict.common.extra_services_relocation}</h2>
                        <p>Wer nach Amberg zieht, oder die Stadt verlässt, muss oft auch alte Möbel entsorgen. FLOXANT bietet exzellente <Link href={"/" + pageLocale + "/entruempelung"}>{dict.common.entruempelung_services}</Link>{dict.common.waste_disposal_desc}</p>
                        <p>{dict.common.also_handle_desc}<Link href={"/" + pageLocale + "/reinigung"}>{dict.common.besenrein_cleaning}</Link>{dict.common.handover_desc}</p>
                    </div>

                    {/* FAQ Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Häufige Fragen zum Umzug in Amberg</h2>
                        <div className="space-y-4">
                            <details className="group border border-border/50 rounded-lg p-4 bg-muted/10 open:ring-2 open:ring-primary/20 transition-all">
                                <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none"><span>Was kostet ein Umzug in Amberg?</span><span className="transition group-open:rotate-180">↓</span></summary>
                                <div className="pt-4 text-muted-foreground">Ein lokaler Umzug kostet im Schnitt zwischen 400 und 2.000 Euro. Der genaue Preis hängt vom Transportvolumen (Kubikmeter) ab. Wir vereinbaren per Video-Call einen verbindlichen Festpreis.</div>
                            </details>
                            <details className="group border border-border/50 rounded-lg p-4 bg-muted/10 open:ring-2 open:ring-primary/20 transition-all">
                                <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none"><span>{dict.common.faq_boxes_q}</span><span className="transition group-open:rotate-180">↓</span></summary>
                                <div className="pt-4 text-muted-foreground">{dict.common.faq_boxes_a}</div>
                            </details>
                            <details className="group border border-border/50 rounded-lg p-4 bg-muted/10 open:ring-2 open:ring-primary/20 transition-all">
                                <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none"><span>{dict.common.faq_no_parking_who_q}</span><span className="transition group-open:rotate-180">↓</span></summary>
                                <div className="pt-4 text-muted-foreground">Falls am Be- oder Entladeort in Amberg keine Parkplätze verfügbar sind, übernehmen wir die behördliche Anmeldung und Beschilderung der offiziellen Halteverbotszone für Sie komplett.</div>
                            </details>
                        </div>
                    </div>

                    <div className="bg-muted/20 p-8 rounded-3xl border border-border/50 text-center">
                        <h2 className="text-2xl font-bold mb-6">{dict.common.customer_voices}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <p className="italic text-muted-foreground mb-4">"Super Service in Amberg. Auch kurzfristige Änderungen am Umzugstag waren kein Problem für den Teamleiter."</p>
                                <p className="font-semibold">– Felix T.</p>
                            </div>
                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <p className="italic text-muted-foreground mb-4">"Wir hatten große Sorge wegen unserer schweren Massivholzküche. Die FLOXANT-Monteure haben alles perfekt zerlegt und sicher im LKW verstaut."</p>
                                <p className="font-semibold">– Familie Meier</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">{dict.common.additional_services_locations}</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={"/" + pageLocale + "/reinigung"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">{dict.common.cleaning_company}</Link>
                            <Link href={"/" + pageLocale + "/entruempelung"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Haushaltsauflösung</Link>
                            <Link href={"/" + pageLocale + "/kleintransporte"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Kleintransporte</Link>
                            <Link href={"/" + pageLocale + "/umzug-regensburg"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                            <Link href={"/" + pageLocale + "/umzug-nuernberg"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">{dict.common.umzug_nuremberg}</Link>
                            <Link href={"/" + pageLocale + "/umzug-muenchen"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">{dict.common.umzug_munich}</Link>
                            <Link href={"/" + pageLocale + "/umzug-bayern"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">{dict.common.umzug_bavaria}</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg mt-8">
                        <h2 className="text-3xl font-bold mb-4">{dict.common.calculate_price}</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kontaktieren Sie uns noch heute. Wir erstellen Ihr individuelles Festpreisangebot für Amberg.</p>
                        <DualCalculator dic={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
