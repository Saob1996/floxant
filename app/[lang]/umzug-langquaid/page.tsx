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
import { MapPin, Milestone, Layers, Award, ArrowRight, Shield, CheckCircle2, Clock, ThumbsUp, Truck } from "lucide-react";



export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = dict?.pages?.umzug_langquaid || {};
    return generatePageSEO({
        pageLocale,
        path: "umzug-langquaid",
        title: content.meta_title || "Umzug in Langquaid ab 79€ – Sofort verfügbar | FLOXANT",
        description: 'Professionelles Umzugsunternehmen für Langquaid. ✓ $... ✓ $.... Sofort anfragen!',
    });
}

export default async function UmzugLangquaid({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.service_umzug || {};

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
                { "@type": "Question", "name": content.faqs?.[0]?.q || "Was kostet ein Umzug in Langquaid?", "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[0]?.a || "Ein Transporter mit Helfern ist oft schon ab günstigen Einstiegspreisen verfügbar. Für den durchschnittlichen Familienhaushalt kalkulieren wir maßgeschneiderte Festpreise, in der Regel zwischen 400€ und 1.500€, abhängig von Raumanzahl und Transportstrecke." } },
                { "@type": "Question", "name": content.faqs?.[1]?.q || "Wie kurzfristig ist ein Umzugstermin in Langquaid verfügbar?", "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[1]?.a || "Da sich unsere Disposition im nahen Regensburg befindet, können wir oft auch sehr kurzfristige Umzüge oder Notfall-Termine in Langquaid realisieren." } },
                { "@type": "Question", "name": content.faqs?.[2]?.q || "Kümmern Sie sich um Halteverbotszonen in Langquaid?", "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[2]?.a || "Ja, absolut. Wenn Parkraum vor Ihrer Haustür knapp ist, organisieren wir die offizielle Beantragung sowie das Aufstellen der Halteverbotsschilder durch die lokalen Behörden." } },
                { "@type": "Question", "name": content.faqs?.[3]?.q || "Bieten Sie auch Küchenmontage in Langquaid an?", "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[3]?.a || "Wir demontieren Ihre Küche fachmännisch und verpacken die Teile sicher. Den fachgerechten Wiederaufbau übernehmen wir im Rahmen der Machbarkeiten ebenfalls gerne." } },
                { "@type": "Question", "name": content.faqs?.[4]?.q || "Muss ich die Umzugskartons selbst besorgen?", "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[4]?.a || "Nein. Sie können stabile Umzugskartons, Kleiderboxen und Packpapier komfortabel über uns mieten oder kaufen." } }
            ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany",
        "name": "FLOXANT Umzug Langquaid",
        "description": "Professioneller Umzugsservice, Möbeltransport und Entrümpelung in Langquaid. Regional, versichert und zum garantierten Festpreis.",
        "url": "https://www.floxant.de/" + pageLocale + "/umzug-langquaid",
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "addressLocality": "Langquaid", "addressRegion": "Bayern", "addressCountry": "DE" },
        "areaServed": [{ "@type": "City", "name": "Langquaid" }, { "@type": "City", "name": "Regensburg" }],
        "priceRange": "$$",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "218", "bestRating": "5" },
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.floxant.de/" + pageLocale },
            { "@type": "ListItem", "position": 2, "name": "Umzug Regensburg", "item": "https://www.floxant.de/" + pageLocale + "/umzug-regensburg" },
            { "@type": "ListItem", "position": 3, "name": "Umzug Langquaid", "item": "https://www.floxant.de/" + pageLocale + "/umzug-langquaid" }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs pageLocale={pageLocale} items={[{ label: "Umzug Region Regensburg", href: "/" + pageLocale + "/umzug-regensburg" }, { label: "Umzug Langquaid" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

            {/* CTR Optimized Hero */}
            
      <section className="pt-12 pb-24 px-6 bg-gradient-to-b from-primary/5 via-muted/30 to-background overflow-hidden relative">
                <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
                <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold shadow-sm ring-1 ring-primary/20 justify-center">
                        <MapPin className="w-4 h-4" /><span>Ihr Umzugspartner für Langquaid & Umgebung</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
                        Stressfreier Umzug in <br className="hidden md:block"/>
                        <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Langquaid</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                        Wir übernehmen das schwere Schleppen. <strong className="text-foreground">{dict.common.success_100_region}</strong> Garantiert zum Festpreis und 100% versichert.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-10">
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Award className="w-5 h-5 text-emerald-500" /> {dict.calculator?.insured_tag || "100% Versichert"}</span>
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Layers className="w-5 h-5 text-blue-500" /> {dict.calculator?.fixed_price_tag || "Festpreisgarantie"}</span>
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><ThumbsUp className="w-5 h-5 text-primary" />{dict.common.top_ratings}</span>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <a href="#wizard" className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/30">
                            Kostenloses Angebot anfordern
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Depth Level Content */}
            <section className="py-24 px-6 relative">
                <div className="max-w-4xl mx-auto space-y-24">
                    
                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <h2 className="text-4xl font-extrabold text-foreground mb-8 tracking-tight">{dict.common.local_expert}</h2>
                        <p className="text-lg">Ihre Einrichtungsgegenstände sind bei uns in besten Händen. Mit modernem Equipment und trainierten Teams wickeln wir Ihren Transport sicher ab. Ein Wohnungswechsel bedeutet für uns nicht nur den Transport von Kisten, sondern den sorgfältigen Transfer Ihres Lebensmittelpunkts.</p>
                        <p className="text-lg">Ob Unternehmensstandort im Gewerbegebiet oder privater Haushaltswechsel in ruhiger Wohnlage:  Wir stellen uns flexibel auf Ihre Wohnsituation ein. Unser Team demontiert Einrichtungsgegenstände, verpackt empfindliche Möbel sicher mit professionellem Material und lädt alles strukturiert in den LKW.</p>
                        
                        <div className="bg-gradient-to-br from-card to-muted p-8 rounded-3xl border border-border mt-10 shadow-sm not-italic relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10"><Truck className="w-32 h-32" /></div>
                            <h4 className="text-2xl text-foreground font-bold mb-4 flex items-center gap-3 relative z-10"><CheckCircle2 className="w-8 h-8 text-emerald-500" />{dict.common.master_logistics}</h4>
                            <p className="m-0 text-base relative z-10">In jeder Gemeinde und jedem Stadtteil tauchen individuelle Herausforderungen auf. Oft sind die Gassen eng oder Parkplätze am Umzugstag Mangelware. Wir kümmern uns im Vorfeld rechtzeitig um behördliche Halteverbotszonen, damit der LKW sichere Stellflächen findet. Bei einer vorherigen virtuellen oder persönlichen Besichtigung kalkulieren wir exakt, welches Equipment und wie viele Träger für den Standort in Langquaid optimal sind.</p>
                        </div>
                    </div>

                    {/* Behavioral CTA Anchor */}
                    <div className="flex flex-col md:flex-row items-center justify-between bg-primary/5 border border-primary/20 rounded-3xl p-8 gap-6 shadow-sm">
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">{dict.common.questions_process}</h3>
                            <p className="text-muted-foreground">{dict.common.quick_estimation}</p>
                        </div>
                        <a href="#wizard" className="flex-shrink-0 px-8 py-3 bg-foreground text-background font-bold rounded-full hover:bg-foreground/90 transition-all">
                            Jetzt Verfügbarkeit prüfen
                        </a>
                    </div>

                    {/* Local Authority Boost */}
                    <div>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-extrabold text-foreground mb-4">Warum FLOXANT in Langquaid?</h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{dict.common.local_advantages}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            <div className="p-8 rounded-3xl bg-card border border-border shadow-md hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Clock className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{dict.common.fast_reaction}</h3>
                                <p className="text-muted-foreground leading-relaxed">Unsere Disposition sitzt in Regensburg, wodurch wir auch bei kurzfristigen Notfällen rasch reagieren können. Eine spontane Besichtigung vor Ort oder ein kurzfristiger Einpack-Service lassen sich problemlos in unseren Tourenplan integrieren.</p>
                            </div>
                            
                            <div className="p-8 rounded-3xl bg-card border border-border shadow-md hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Shield className="w-7 h-7 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{dict.common.max_security}</h3>
                                <p className="text-muted-foreground leading-relaxed">Vertrauen ist gut, Versicherungen sind besser. Vom Ladevorgang in Langquaid bis zum Entladen in der Zieladresse haftet unsere Betriebshaftpflicht für eventuelle Schäden – so können Sie nachts ruhig schlafen.</p>
                            </div>

                            <div className="p-8 rounded-3xl bg-card border border-border shadow-md hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Layers className="w-7 h-7 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{dict.common.fixed_price_no_surprises}</h3>
                                <p className="text-muted-foreground leading-relaxed">{dict.common.fixed_price_desc}</p>
                            </div>

                            <div className="p-8 rounded-3xl bg-card border border-border shadow-md hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Milestone className="w-7 h-7 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{dict.common.combined_services}</h3>
                                <p className="text-muted-foreground leading-relaxed">Neben dem Transport können wir am alten Standort in Langquaid direkt auch übrig gebliebenen Hausrat entsorgen und die Räumlichkeiten besenrein fegen (<Link href={"/" + pageLocale + "/entruempelung"} className="text-primary underline hover:text-primary/80">{dict.common.entruempelung}</Link>).</p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Expansion Layer */}
                    <div className="bg-card p-8 md:p-12 rounded-[2.5rem] border border-border shadow-sm">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-extrabold text-foreground mb-4">Häufige Fragen zum Standort Langquaid</h2>
                            <p className="text-muted-foreground">{dict.common.important_aspects_summary}</p>
                        </div>
                        <div className="space-y-4 max-w-3xl mx-auto">
                            <details className="group border border-border/50 rounded-2xl p-6 bg-muted/20 open:bg-card open:ring-2 open:ring-primary/20 transition-all cursor-pointer">
                                <summary className="text-xl font-bold list-none flex justify-between items-center outline-none">
                                    <span>Was kostet ein durchschnittlicher Umzug in Langquaid?</span>
                                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                                </summary>
                                <div className="pt-5 text-muted-foreground leading-relaxed">Die Kosten variieren stark nach Aufwand. Grob formuliert: Ein Studenten-Transport startet bei extrem günstigen Konditionen, während der schlüsselfertige Full-Service-Umzug einer Familie (inkl. Packen) zwischen 800 und 1.800 Euro liegen kann. Bei uns gilt immer das Festpreisangebot.</div>
                            </details>
                            <details className="group border border-border/50 rounded-2xl p-6 bg-muted/20 open:bg-card open:ring-2 open:ring-primary/20 transition-all cursor-pointer">
                                <summary className="text-xl font-bold list-none flex justify-between items-center outline-none">
                                    <span>{dict.common.faq_insurance_q}</span>
                                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                                </summary>
                                <div className="pt-5 text-muted-foreground leading-relaxed">{dict.common.faq_insurance_a}</div>
                            </details>
                            <details className="group border border-border/50 rounded-2xl p-6 bg-muted/20 open:bg-card open:ring-2 open:ring-primary/20 transition-all cursor-pointer">
                                <summary className="text-xl font-bold list-none flex justify-between items-center outline-none">
                                    <span>{dict.common.faq_kitchen_q}</span>
                                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                                </summary>
                                <div className="pt-5 text-muted-foreground leading-relaxed">{dict.common.faq_kitchen_a}</div>
                            </details>
                            <details className="group border border-border/50 rounded-2xl p-6 bg-muted/20 open:bg-card open:ring-2 open:ring-primary/20 transition-all cursor-pointer">
                                <summary className="text-xl font-bold list-none flex justify-between items-center outline-none">
                                    <span>Können Umzugskartons in Langquaid geliefert werden?</span>
                                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                                </summary>
                                <div className="pt-5 text-muted-foreground leading-relaxed">Wenn Sie unseren Einpack-Service nicht buchen, können wir Ihnen Vorab hochwertiges Verpackungsmaterial (stabile Kartons, Kleiderboxen) bequem direkt an Ihre Haustür in Langquaid liefern.</div>
                            </details>
                            <details className="group border border-border/50 rounded-2xl p-6 bg-muted/20 open:bg-card open:ring-2 open:ring-primary/20 transition-all cursor-pointer">
                                <summary className="text-xl font-bold list-none flex justify-between items-center outline-none">
                                    <span>{dict.common.faq_booking_q}</span>
                                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                                </summary>
                                <div className="pt-5 text-muted-foreground leading-relaxed">{dict.common.faq_booking_a}</div>
                            </details>
                        </div>
                    </div>

                    {/* Internal Linking Intensification */}
                    <div className="border-t border-border pt-16">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-bold mb-4">{dict.common.transport_networks}</h3>
                            <p className="text-muted-foreground">{dict.common.regular_routes_bavaria}</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href={"/" + pageLocale + "/umzug-regensburg"} className="px-5 py-3 rounded-2xl border-2 border-primary/20 bg-primary/5 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all shadow-sm">{dict.common.headquarters_regensburg}</Link>
                            <Link href={"/" + pageLocale + "/umzug-muenchen"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold text-foreground hover:border-primary/50 transition-all shadow-sm">{dict.common.metro_munich}</Link>
                            <Link href={"/" + pageLocale + "/umzug-nuernberg"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold text-foreground hover:border-primary/50 transition-all shadow-sm">{dict.common.metro_nuremberg}</Link>
                            <Link href={"/" + pageLocale + "/umzug-rottenburg-an-der-laaber"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Rottenburg an der Laaber</Link>
                            <Link href={"/" + pageLocale + "/umzug-neutraubling"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Neutraubling</Link>
                            <Link href={"/" + pageLocale + "/umzug-obertraubling"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Obertraubling</Link>
                            <Link href={"/" + pageLocale + "/umzug-kelheim"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Kelheim</Link>
                            <Link href={"/" + pageLocale + "/umzug-donaustauf"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Donaustauf</Link>
                            <Link href={"/" + pageLocale + "/umzug-moetzing"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Mötzing</Link>
                            <Link href={"/" + pageLocale + "/umzug-brunn"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Brunn</Link>
                            <Link href={"/" + pageLocale + "/umzug-pentling"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Pentling</Link>
                            <Link href={"/" + pageLocale + "/umzug-aufhausen"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Aufhausen</Link>
                            <Link href={"/" + pageLocale + "/umzug-alteglofsheim"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Alteglofsheim</Link>
                        </div>
                    </div>

                    {/* Final Smart Booking Wizard Anchor */}
                    <div id="wizard" className="text-center py-16 bg-card rounded-[3rem] border border-border shadow-2xl relative mt-16 scroll-mt-24">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold text-sm shadow-lg">{dict.common.free_unbinding}</div>
                        <h2 className="text-4xl font-extrabold mb-6 mt-6">{dict.common.request_price_online}</h2>
                        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">Sichern Sie sich jetzt Ihren Umzugstermin für Langquaid. Wir berechnen das Volumen und das beste Angebot für Sie in Kürzester Zeit.</p>
                        <div className="px-6">
                            <DualCalculator dic={dict} />
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
