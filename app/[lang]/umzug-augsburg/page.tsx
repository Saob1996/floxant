import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { TrustStack } from "@/components/TrustStack";
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
    
    const dict = (await getDictionary(pageLocale as Locale)) as any;
return generatePageSEO({
        pageLocale,
        path: 'umzug-augsburg',
        title: dict.seo?.dynamic_city_title || "Umzugsunternehmen",
        description: dict.seo?.dynamic_city_desc || "Professioneller Umzug",
    });
}

export default async function UmzugAugsburg({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.service_umzug || {};

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
                { "@type": "Question", "name": content.faqs?.[0]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[0]?.a } },
                { "@type": "Question", "name": content.faqs?.[1]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[1]?.a } },
                { "@type": "Question", "name": content.faqs?.[2]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[2]?.a } }
            ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany",
        "name": "FLOXANT Umzug Augsburg",
        "description": "Professionelles Umzugsunternehmen. Moving company and clearance services in Augsburg. Local moving, long distance, and professional packing.",
        "url": "https://www.floxant.de/" + pageLocale + "/umzug-augsburg",
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "addressLocality": "Augsburg", "addressRegion": "Bayern", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 48.3715, "longitude": 10.8985 },
        "areaServed": [{ "@type": "City", "name": "Augsburg" }, { "@type": "AdministrativeArea", "name": "Schwaben" }],
        "priceRange": "$$",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "134", "bestRating": "5" },
    };

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "serviceType": "Umzug, Transport, Entrümpelung, Reinigung",
        "provider": { "@type": "LocalBusiness", "name": "FLOXANT Umzug Augsburg", "telephone": "+4915771105087" },
        "areaServed": { "@type": "City", "name": "Augsburg" }
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.floxant.de/" + pageLocale },
            { "@type": "ListItem", "position": 2, "name": "Umzug Bayern", "item": "https://www.floxant.de/" + pageLocale + "/umzug-bayern" },
            { "@type": "ListItem", "position": 3, "name": "Umzug Augsburg", "item": "https://www.floxant.de/" + pageLocale + "/umzug-augsburg" }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs pageLocale={pageLocale} items={[{ label: "Umzug Bayern", href: "/" + pageLocale + "/umzug-bayern" }, { label: "Umzug Augsburg" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Augsburg & Schwaben</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzugsunternehmen in <span className="text-primary">Augsburg</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            `FLOXANT ist Ihr starker Umzugspartner für Augsburg. Wir bieten {dict.calculator?.fixed_price_tag}, voll versicherten Transport und lokale Expertise für Privathaushalte und Firmen.`
          </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> {dict.calculator?.insured_tag}</span>
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> {dict.calculator?.inspection_tag}</span>
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2"><Layers className="w-4 h-4 text-primary" /> {dict.calculator?.fixed_price_tag}</span>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Ihr verlässlicher Umzug in Augsburg</h2>
                        <p>In der Fuggerstadt Augsburg übernehmen wir Privatumzüge und Büroverlagerungen. Ob im Univiertel, Göggingen oder in der engen Jakobervorstadt – FLOXANT garantiert Festpreise und absolute Termintreue in ganz Bayerisch-Schwaben.</p>
                        <p>Ein Umzug ist mehr als nur der Transport von Kartons. Es ist ein Neustart. Wir von FLOXANT verstehen das und setzen alles daran, Ihren Wohnungswechsel so stressfrei wie möglich zu gestalten. Neben dem reinen Möbeltransport bieten wir Ihnen in Augsburg auch professionelle Demontage- und Montagearbeiten, Einpackservice sowie die Bereitstellung von hochwertigem Verpackungsmaterial an.</p>
                        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic mt-6">
                            <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" />{dict.common.transparency_start}</h4>
                            <p className="m-0 text-sm">Nach unser kostenlosen, oft virtuellen Besichtigung erhalten Sie ein verbindliches Festpreisangebot. Keine versteckten Gebühren, keine Stundensätze, die aus dem Ruder laufen. Sie wissen genau, was Ihr Umzug in Augsburg kosten wird.</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">Unsere Kompetenzen für Augsburg</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Milestone className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">{dict.common.local_expertise}</h3>
                                <p className="text-sm text-muted-foreground">Kenntnis der örtlichen Gegebenheiten, Treppenhäuser und Halteverbots-Beantragung direkt in Augsburg.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Shield className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">{dict.common.full_insurance}</h3>
                                <p className="text-sm text-muted-foreground">{dict.common.full_insurance_desc}</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Award className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">{dict.calculator?.fixed_price_tag}</h3>
                                <p className="text-sm text-muted-foreground">Verbindliche Angebote nach kostenloser Besichtigung. Keine versteckten Kosten, keine Nachverhandlungen.</p>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">{dict.common.extra_services_relocation}</h2>
                        <p>Wer nach Augsburg zieht, oder die Stadt verlässt, muss oft auch alte Möbel entsorgen. FLOXANT bietet exzellente <Link href={"/" + pageLocale + "/entruempelung"}>{dict.common.entruempelung_services}</Link>{dict.common.waste_disposal_desc}</p>
                        <p>{dict.common.also_handle_desc}<Link href={"/" + pageLocale + "/reinigung"}>{dict.common.besenrein_cleaning}</Link>{dict.common.handover_desc}</p>
                    </div>

                    {/* FAQ Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Häufige Fragen zum Umzug in Augsburg</h2>
                        <div className="space-y-4">
                            <details className="group border border-border/50 rounded-lg p-4 bg-muted/10 open:ring-2 open:ring-primary/20 transition-all">
                                <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none"><span>Was kostet ein Umzug in Augsburg?</span><span className="transition group-open:rotate-180">↓</span></summary>
                                <div className="pt-4 text-muted-foreground">Ein lokaler Umzug kostet im Schnitt zwischen 400 und 2.000 Euro. Der genaue Preis hängt vom Transportvolumen (Kubikmeter) ab. Wir vereinbaren per Video-Call einen verbindlichen Festpreis.</div>
                            </details>
                            <details className="group border border-border/50 rounded-lg p-4 bg-muted/10 open:ring-2 open:ring-primary/20 transition-all">
                                <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none"><span>{dict.common.faq_boxes_q}</span><span className="transition group-open:rotate-180">↓</span></summary>
                                <div className="pt-4 text-muted-foreground">{dict.common.faq_boxes_a}</div>
                            </details>
                            <details className="group border border-border/50 rounded-lg p-4 bg-muted/10 open:ring-2 open:ring-primary/20 transition-all">
                                <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none"><span>{dict.common.faq_no_parking_who_q}</span><span className="transition group-open:rotate-180">↓</span></summary>
                                <div className="pt-4 text-muted-foreground">Falls am Be- oder Entladeort in Augsburg keine Parkplätze verfügbar sind, übernehmen wir die behördliche Anmeldung und Beschilderung der offiziellen Halteverbotszone für Sie komplett.</div>
                            </details>
                        </div>
                    </div>

                    <div className="bg-muted/20 p-8 rounded-3xl border border-border/50 text-center">
                        <h2 className="text-2xl font-bold mb-6">{dict.common.customer_voices}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start max-w-3xl mx-auto">
                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <p className="italic text-muted-foreground mb-4">"Sehr freundliche Möbelpacker! Hatten extrem schwere Massivholzschränke, die einwandfrei in Augsburg-Pfersee angekommen sind."</p>
                                <p className="font-semibold">– Thomas K.</p>
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

                    {/* Global E-E-A-T Trust Signal Injection */}
            <TrustStack className="my-16" />
            
            <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg mt-8">
                        <h2 className="text-3xl font-bold mb-4">{dict.common.calculate_price}</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kontaktieren Sie uns noch heute. Wir erstellen Ihr individuelles Festpreisangebot für Augsburg.</p>
                        <DualCalculator dic={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
