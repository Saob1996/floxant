import { type Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { TrustStack } from "@/components/TrustStack";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckCircle2, Recycle, Trash2, Home, Building2, Shield, Leaf, MapPin } from "lucide-react";
import dynamic from 'next/dynamic';

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    
    const dict = (await getDictionary(pageLocale as Locale)) as any;
return generatePageSEO({
        pageLocale,
        path: 'entruempelung',
        title: dict.seo?.dynamic_city_title || "Umzugsunternehmen",
        description: dict.seo?.dynamic_city_desc || "Professioneller Umzug",
    });
}

export default async function EntruempelungPillarPage({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.service_entruempelung || {};

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
                { "@type": "Question", "name": content.faqs?.[0]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[0]?.a } },
                { "@type": "Question", "name": content.faqs?.[1]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[1]?.a } },
                { "@type": "Question", "name": content.faqs?.[2]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[2]?.a } },
                { "@type": "Question", "name": content.faqs?.[3]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[3]?.a } }
            ],
    };

    const breadcrumbs = [
        { label: "Home", href: `/${pageLocale}` },
        { label: "Entrümpelung (Pillar)" }
    ];

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": crumb.label,
            "item": `https://www.floxant.de${crumb.href || `/${pageLocale}/entruempelung`}`
        }))
    };

    return (
        <main className="min-h-screen bg-background">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

            <Breadcrumbs pageLocale={pageLocale} items={breadcrumbs} />
            
            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>Ihr Experte für Räumungen in Bayern</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Professionelle <span className="text-primary">{dict.common.entruempelung}</span> & Auflösung
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Wir schaffen Platz. Ob komplette Wohnungsauflösung nach einem Todesfall, eine Firmenentrümpelung oder eine private Kellerentrümpelung: FLOXANT räumt schnell, diskret, umweltbewusst und hinterlässt das Objekt immer besenrein.
                    </p>
                </div>
            </section>

            {/* Semantic Keyword Cluster 1: Entrümpelung & Wohnungsauflösung */}
            <section className="py-20 bg-white">
                <div className="container px-4 max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold tracking-tight">Wohnungsauflösung: Taktvoll und zuverlässig entrümpeln</h2>
                            <div className="prose prose-lg text-slate-700">
                                <p>
                                    Eine <strong>Wohnungsauflösung</strong> ist oft mit einem hohen emotionalen und körperlichen Aufwand verbunden. Meistens finden Wohnungsauflösungen aufgrund eines Todesfalls, dem Umzug in ein Pflegeheim oder bei schweren Mieterproblemen (Messie-Wohnungen) statt. Für Angehörige ist die <strong>{dict.common.entruempelung}</strong> der Räumlichkeiten eine schwere Last.
                                </p>
                                <p>
                                    FLOXANT ist Ihr verständnisvoller Partner in dieser herausfordernden Zeit. Als professioneller Fachbetrieb für <strong>{dict.common.entruempelung}</strong> in Bayern übernehmen wir die gesamte Räumung. Wir katalogisieren auf Wunsch Wertgegenstände, übergeben persönliche Dokumente ordentlich separiert an Sie und sorgen für den schnellen und völlig lautlosen Abtransport der restlichen Einrichtungsgegenstände. Diskretion đối với den Nachbarn hat hier oberste Priorität. Am Ende einer <strong>Wohnungsauflösung</strong> übergeben wir Ihnen die Immobilie komplett besenrein und übergabefertig.
                                </p>
                            </div>
                        </div>
                        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border">
                            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                                {/* Placeholder for large image */}
                                <Home className="w-32 h-32 text-slate-300" />
                            </div>
                            <div className="absolute top-4 end- bg-white/90 backdrop-blur px-4 py-2 rounded-full font-bold text-primary flex items-center gap-2 shadow">
                                <Shield className="w-5 h-5"/> Diskret & Besenrein
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Semantic Keyword Cluster 2: Hausentrümpelung & Kellerentrümpelung */}
             <section className="py-20 bg-slate-900 text-white">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold tracking-tight mb-4">Hausentrümpelung und Kellerentrümpelung</h2>
                        <p className="text-xl text-slate-400">Vom Dachboden bis zum hintersten Kellerraum – wir befreien Ihre Immobilie von Altlasten.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-primary/50 transition-colors">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Home className="text-primary w-8 h-8" /> Die komplette Hausentrümpelung</h3>
                            <p className="text-slate-300 mb-6 leading-relaxed">
                                Eine vollumfängliche <strong>Hausentrümpelung</strong> betrifft oft ganze Immobilien, die verkauft oder kernsaniert werden sollen. Von alten Schuppen im Garten, jahrzehntealten Einbauküchen bis hin zum Sperrmüll auf dem Dachboden – unser Team verfügt über die notwendigen großen LKWs und Container-Logistik, um selbst das größte Einfamilienhaus binnen ein bis zwei Tagen besenrein zu entkernen. Bei der <strong>Hausentrümpelung</strong> entfernen wir auf Wunsch auch Teppichböden und hohle Holzverkleidungen.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-slate-300"><CheckCircle2 className="text-emerald-400 shrink-0 mt-1" /> Demontage von Einbauten</li>
                                <li className="flex items-start gap-3 text-slate-300"><CheckCircle2 className="text-emerald-400 shrink-0 mt-1" /> Fachgerechte Wertstofftrennung</li>
                            </ul>
                        </div>

                        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-primary/50 transition-colors">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Trash2 className="text-primary w-8 h-8" /> Die schnelle Kellerentrümpelung</h3>
                            <p className="text-slate-300 mb-6 leading-relaxed">
                                Oft sammelt sich über Jahre hinweg unbemerkt Unrat an. Feuchtigkeit macht Kartons unbrauchbar, alte Möbel blockieren wertvollen Stauraum. Eine <strong>Kellerentrümpelung</strong> bringt Frische zurück in Ihr Zuhause. Auch bei Schimmelbefall im Keller oder nach einem Wasserschaden kümmern wir uns um die sichere Abholung und umweltgerechte Entsorgung von kontaminierten Materialien. Eine <strong>Kellerentrümpelung</strong> ist oft in wenigen Stunden abgeschlossen.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-slate-300"><CheckCircle2 className="text-emerald-400 shrink-0 mt-1" /> Schnelle Umsetzung in wenigen Stunden</li>
                                <li className="flex items-start gap-3 text-slate-300"><CheckCircle2 className="text-emerald-400 shrink-0 mt-1" /> Sperrmüllentsorgung & Abtransport</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Semantic Keyword Cluster 3: Firmenentrümpelung */}
            <section className="py-20 bg-slate-50 border-b">
                <div className="container px-4 max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border order-2 lg:order-1">
                            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                {/* Placeholder for large image */}
                                <Building2 className="w-32 h-32 text-primary/40" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                            <div className="absolute bottom-6 start- z-20 text-white">
                                <p className="font-bold text-xl">Sichere Firmenauflösung</p>
                            </div>
                        </div>
                        <div className="space-y-6 order-1 lg:order-2">
                            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm tracking-widest uppercase mb-2">B2B & Gewerbe</div>
                            <h2 className="text-4xl font-bold tracking-tight">Akten, IT & Schrott: Die Firmenentrümpelung</h2>
                            <div className="prose prose-lg text-slate-700">
                                <p>
                                    Bei Betriebsaufgaben, Standortverlegungen oder Insolvenzen ist Schnelligkeit und Präzision gefragt. Die gewerbliche <strong>Firmenentrümpelung</strong> ist anspruchsvoller als private Hausräumungen. Maschinen müssen demontiert, schwere Tresore und veraltete IT-Hardware (Elektroschrott) fachmännisch recycelt werden.
                                </p>
                                <p>
                                    FLOXANT bietet B2B-Kunden eine rechtssichere <strong>Firmenentrümpelung</strong>. Dies beinhaltet unter anderem die datenschutzkonforme Vernichtung von Akten (inklusive Nachweiszertifikat der Entsorgungsbetriebe) und die umweltgerechte Trennung kritischer Materialien. Vom Großraumbüro mit 100 Arbeitsplätzen bis zur ausgeräumten Produktionshalle – wir hinterlassen Gewerbeimmobilien besenrein für den direkten Rückbau oder die Neuvermietung.
                                </p>
                            </div>
                            <div className="flex gap-4 items-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                <Leaf className="text-emerald-500 w-10 h-10 shrink-0" />
                                <p className="text-sm text-emerald-900"><strong>Zertifizierte Entsorgung:</strong> Als ordentliches Gewerbeunternehmen garantieren wir bei jeder Entrümpelung die Einhaltung deutscher Entsorgungsrichtlinien. Wir recyceln nach den strengen Vorgaben der Abfallwirtschaftsverordnungen Bayerns.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Smart Booking Call to Action */}
             <section className="py-24 bg-white" id="booking">
                <div className="container px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Entrümpelungs-Kosten online berechnen</h2>
                        <p className="text-lg text-slate-500">
                            Wir erstellen Ihnen für Ihre Wohnungsauflösung, Kellerentrümpelung oder Firmenentrümpelung ein garantiertes Festpreisangebot.
                        </p>
                    </div>
                    <div className="bg-slate-50 text-slate-900 rounded-3xl overflow-hidden shadow-sm border max-w-5xl mx-auto">
                        <div className="p-4 md:p-8">
                            <SmartBookingWizard dict={dict} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Internal Routing / Semantic Links */}
            <section className="py-16 bg-slate-900 text-white">
                <div className="container px-4 text-center max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold tracking-tight mb-8">Unsere Entrümpelungsservices vor Ort</h2>
                    <p className="text-slate-400 mb-8 max-w-3xl mx-auto">Besenreine Räumungen und Wohnungsauflösungen bieten wir flächendeckend in allen großen bayerischen Städten an.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href={`/${pageLocale}/entruempelung-regensburg`} className="bg-slate-800 border border-slate-700 hover:border-primary hover:text-white px-6 py-3 rounded-xl font-medium transition-all">Entrümpelung Regensburg</a>
                        <a href={`/${pageLocale}/entruempelung-muenchen`} className="bg-slate-800 border border-slate-700 hover:border-primary hover:text-white px-6 py-3 rounded-xl font-medium transition-all">Entrümpelung München</a>
                        <a href={`/${pageLocale}/entruempelung-nuernberg`} className="bg-slate-800 border border-slate-700 hover:border-primary hover:text-white px-6 py-3 rounded-xl font-medium transition-all">Entrümpelung Nürnberg</a>
                        <a href={`/${pageLocale}/entruempelung-augsburg`} className="bg-slate-800 border border-slate-700 hover:border-primary hover:text-white px-6 py-3 rounded-xl font-medium transition-all">Entrümpelung Augsburg</a>
                        <a href={`/${pageLocale}/entruempelung-landshut`} className="bg-slate-800 border border-slate-700 hover:border-primary hover:text-white px-6 py-3 rounded-xl font-medium transition-all">Entrümpelung Landshut</a>
                        <a href={`/${pageLocale}/entruempelung-passau`} className="bg-slate-800 border border-slate-700 hover:border-primary hover:text-white px-6 py-3 rounded-xl font-medium transition-all">Entrümpelung Passau</a>
                    </div>
                </div>
            </section>

        </main>
    );
}
