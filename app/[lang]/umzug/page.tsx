import { type Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckCircle2, Shield, Star, Clock, Truck, Package, Banknote, MapPin } from "lucide-react";
import dynamic from 'next/dynamic';

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: 'umzug',
        title: 'Umzugsunternehmen Bayern ✓ Festpreis ✓ Versicherung | FLOXANT',
        description: 'Professionelles Umzugsunternehmen in Bayern. Umzugsservice planen, Umzugskosten berechnen. Ihre seriöse Umzugsfirma für stressfreie Umzüge deutschlandweit.',
    });
}

export default async function UmzugPillarPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Wie finde ich das richtige Umzugsunternehmen in Bayern?", "acceptedAnswer": { "@type": "Answer", "text": "Achten Sie auf Transparenz, einen festen Geschäftssitz (wie FLOXANT in Regensburg), Haftpflichtversicherungen und Festpreisangebote ohne versteckte Klauseln. Online-Bewertungen geben zusätzlichen Aufschluss über die Seriosität der Umzugsfirma." } },
            { "@type": "Question", "name": "Wie setzen sich die Umzug Kosten zusammen?", "acceptedAnswer": { "@type": "Answer", "text": "Die Umzug Kosten berechnen sich aus dem Transportvolumen (Anzahl der Möbel und Kartons in cbm), der Entfernung zwischen Auszugs- und Einzugsort, den Stockwerken sowie gebuchten Extra-Services wie Einpackservice oder Küchenmontage." } },
            { "@type": "Question", "name": "Was beinhaltet ein Full-Service Umzugsservice?", "acceptedAnswer": { "@type": "Answer", "text": "Ein Full-Service Umzugsservice umfasst das komplette Ein- und Auspacken aller Gegenstände, den sicheren Möbelabbau und -aufbau, den Transport sowie die Beantragung von Halteverbotszonen. Sie lehnen sich zurück, die Umzugsfirma erledigt alles." } },
            { "@type": "Question", "name": "Wann sollte ich den Umzug planen?", "acceptedAnswer": { "@type": "Answer", "text": "Beginnen Sie mit dem Umzug Planen idealerweise 2 bis 3 Monate im Voraus. So sichern Sie sich Ihren Wunschtermin bei Ihrem Umzugsunternehmen und haben genügend Zeit für Behördengänge, Ummeldungen und das Entrümpeln." } }
        ],
    };

    const breadcrumbs = [
        { label: "Home", href: `/${lang}` },
        { label: "Umzug (Pillar)" }
    ];

    // Added BreadcrumbList manually for maximum schema extraction
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": crumb.label,
            "item": `https://www.floxant.de${crumb.href || `/${lang}/umzug`}`
        }))
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

            <Breadcrumbs lang={lang} items={breadcrumbs} />
            
            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>Ihr Leitfaden für den perfekten Wohnortwechsel</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Das Kompetenzzentrum für Ihren <span className="text-primary">Umzug</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Ein Umzug ist ein komplexes logistisches Projekt. Erfahren Sie hier alles über professionelle Umzugsunternehmen, transparente Umzug Kosten, Full-Service-Leistungen und wie Sie Ihren Umzug perfekt planen. Profitieren Sie vom Know-how der renommiertesten Umzugsfirma in Bayern: FLOXANT.
                    </p>
                </div>
            </section>

            {/* Semantic Keyword Cluster 1: Umzugsunternehmen & Umzugsfirma */}
            <section className="py-20 bg-white">
                <div className="container px-4 max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold tracking-tight mb-8">Wie Sie das richtige Umzugsunternehmen finden</h2>
                    <div className="prose prose-lg text-slate-700 max-w-none">
                        <p>
                            Der Markt der <strong>Umzugsunternehmen</strong> ist groß, unübersichtlich und leider nicht immer komplett seriös. Die Suche nach der richtigen <strong>Umzugsfirma</strong> erfordert daher eine sorgfältige Prüfung der Anbieter. Ein seriöses <em>Umzugsunternehmen Bayern</em> zeichnet sich nicht nur durch bunte Werbung aus, sondern durch harte Fakten: Eigene Festangestellte, ein moderner, gepflegter Fuhrpark, nachweisbare Betriebshaftpflichtversicherungen und transparente Preisgestaltung.
                        </p>
                        <p>
                            Wenn Sie eine <strong>Umzug Firma</strong> beauftragen, überlassen Sie wildfremden Menschen Ihren gesamten Hausrat – Ihre Erinnerungsstücke, teure Elektronik und empfindliche Erbstücke. Setzen Sie deshalb auf ein etabliertes, bewertetes System. FLOXANT grenzt sich als <strong>Umzugsfirma</strong> im Premiumsektor bewusst von schwarzen Schafen ab. Wir arbeiten nicht mit verdeckten Stundenlöhnen, die bei einem Stau künstlich in die Höhe schnellen. Wir arbeiten mit garantierten Festpreisen.
                        </p>
                        <h3>Merkmale eines professionellen Umzugsunternehmens in Bayern</h3>
                        <ul className="grid md:grid-cols-2 gap-4 list-none pl-0">
                            {[
                                'Kostenlose und unverbindliche Vorabbesichtigung zur genauen Kalkulation',
                                'Transparenter Kostenvoranschlag mit Festpreisgarantie',
                                'Abgeschlossene Transport- und Verkehrshaftungsversicherung',
                                'Bereitstellung von professionellem Umzugsmaterial',
                                'Eigene, geschulte Handwerker und Möbelpacker',
                                'Zusatzleistungen wie Entrümpelung oder Endreinigung aus einer Hand'
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-3 mb-0">
                                    <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600 shrink-0"><CheckCircle2 className="h-4 w-4" /></div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Semantic Keyword Cluster 2: Umzug planen & Umzugsservice */}
            <section className="py-20 bg-slate-50 border-t border-b">
                <div className="container px-4 max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold tracking-tight mb-8">Den perfekten Umzug planen mit unserem Umzugsservice</h2>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border mb-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px]" />
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Clock className="text-primary w-6 h-6" /> Umzug planen: Das Timing</h3>
                                <p className="text-slate-600">
                                    Erfolgreiche Logistik beginnt Monate vor dem eigentlichen Stichtag. Einen <strong>Umzug planen</strong> erfordert Disziplin. Kündigen Sie alte Verträge rechtzeitig, organisieren Sie Nachsendeaufträge und beginnen Sie frühzeitig mit der Vorsortierung (Entrümpelung) Ihres Kellers. Je exakter Sie Ihren <strong>Umzug planen</strong>, desto reibungsloser greift das Zahnradwerk am eigentlichen Transporttag ineinander.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px]" />
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Package className="text-primary w-6 h-6" /> Der richtige Umzugsservice</h3>
                                <p className="text-slate-600">
                                    Nicht jeder Umzug ist gleich. Ein moderner <strong>Umzugsservice</strong> ist modular. Vom reinen Transport (inklusive Fahrer und LKW) über das Ein- und Auspacken (Packservice) bis hin zum Full-Service-Umzug, bei dem Sie keinen einzigen Finger krümmen müssen. FLOXANT bietet Ihnen exakt den <strong>Umzugsservice</strong>, der zu Ihrem Budget und Ihrem Zeitplan passt.
                                </p>
                            </div>
                        </div>
                        <div className="relative aspect-square lg:h-full lg:max-h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                             <div className="absolute inset-0 bg-slate-800" /> {/* Future image slot */}
                             <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 to-primary/40 mix-blend-multiply z-10" />
                             <div className="absolute inset-0 z-20 flex flex-col justify-end p-10 text-white">
                                <h3 className="text-3xl font-bold mb-4">Masterplan statt Chaos</h3>
                                <p className="text-white/90 text-lg">Ein professionell durchgeführter Umzug schont nicht nur das Inventar, sondern vor allem Ihre Nerven.</p>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Semantic Keyword Cluster 3: Umzug Kosten */}
             <section className="py-20 bg-white">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <Banknote className="w-16 h-16 text-primary mx-auto mb-6" />
                        <h2 className="text-4xl font-bold tracking-tight mb-4">Zusammensetzung der Umzug Kosten</h2>
                        <p className="text-xl text-muted-foreground">Absolute Transparenz statt böser Überraschungen beim Abrechnen.</p>
                    </div>
                    <div className="prose prose-lg text-slate-700 max-w-none text-center">
                        <p>
                            Eines der häufigsten Suchanliegen im Netz lautet <strong>Umzug Kosten</strong>. Viele Interessenten suchen nach pauschalen Listen, doch so einfach ist es in der Praxis nicht. Ein seriöses <strong>Umzugsunternehmen in Bayern</strong> wird Ihnen niemals seriös am Telefon einen finalen Preis zusagen können, ohne die Gegebenheiten zu kennen.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
                            <div className="bg-slate-50 p-8 rounded-2xl border">
                                <h3 className="mt-0 text-xl font-bold">Faktoren für die Umzug Kosten</h3>
                                <ul>
                                    <li><strong>Transportvolumen:</strong> Wieviele Kubikmeter Möbel und Hausrat müssen transportiert werden?</li>
                                    <li><strong>Distanz:</strong> Ist es ein Nahumzug (z.B. innerhalb von Regensburg) oder ein Fernumzug nach Berlin?</li>
                                    <li><strong>Tragewege & Stockwerke:</strong> Gibt es einen geräumigen Aufzug oder müssen schwere Schränke in den 5. Stock durch ein enges Treppenhaus getragen werden?</li>
                                    <li><strong>Zusatzleistungen:</strong> Buchen Sie Handwerker für den Möbelaufbau, oder übernehmen Sie dies selbst?</li>
                                </ul>
                            </div>
                            <div className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-xl flex flex-col justify-center">
                                <h3 className="mt-0 text-xl font-bold text-white">Die FLOXANT Festpreis-Garantie</h3>
                                <p className="text-primary-foreground/90">
                                    Um ungewisse <strong>Umzug Kosten</strong> auszuschließen, arbeiten wir mit digitalen Besichtigungen (oder auf Wunsch vor Ort in Bayern). Dabei ermitteln wir alle Faktoren exakt. 
                                </p>
                                <p className="text-primary-foreground/90 font-bold mt-4">
                                    Das Resultat: Ein garantierter Festpreis. Keine Nachverhandlungen. Keine versteckten Gebühren.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Smart Booking Call to Action */}
            <section className="py-24 bg-slate-900 border-t" id="booking">
                <div className="container px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Berechnen Sie jetzt Ihre Umzugskosten</h2>
                        <p className="text-lg text-slate-400">
                            Fordern Sie Ihr unverbindliches Angebot unserer Umzugsfirma an. In weniger als 2 Minuten übermitteln Sie uns die wichtigsten Eckdaten.
                        </p>
                    </div>
                    <div className="bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
                        <div className="p-4 md:p-8">
                            <SmartBookingWizard dict={dict} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Internal City Ring Linking */}
            <section className="py-20 bg-white">
                <div className="container px-4 text-center max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold tracking-tight mb-8">Unser Umzugsunternehmen Bayern in Ihrer Region</h2>
                    <p className="text-slate-600 mb-8 max-w-2xl mx-auto">Als etabliertes Umzugsunternehmen in Bayern bedienen wir alle großen Städte und Wirtschaftszentren mit unseren top ausgestatteten Flotten.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href={`/${lang}/umzug-regensburg`} className="bg-slate-50 border hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-medium transition-all">Umzugsfirma Regensburg</a>
                        <a href={`/${lang}/umzug-muenchen`} className="bg-slate-50 border hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-medium transition-all">Umzugsfirma München</a>
                        <a href={`/${lang}/umzug-nuernberg`} className="bg-slate-50 border hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-medium transition-all">Umzugsfirma Nürnberg</a>
                        <a href={`/${lang}/umzug-augsburg`} className="bg-slate-50 border hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-medium transition-all">Umzugsfirma Augsburg</a>
                        <a href={`/${lang}/umzug-ingolstadt`} className="bg-slate-50 border hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-medium transition-all">Umzugsfirma Ingolstadt</a>
                        <a href={`/${lang}/umzug-weiden`} className="bg-slate-50 border hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-medium transition-all">Umzugsfirma Weiden</a>
                    </div>
                </div>
            </section>

            {/* Internal Blog Ring Linking */}
            <section className="py-16 bg-slate-50 border-t">
                <div className="container px-4 text-center max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold tracking-tight mb-8">Ratgeber & Fachartikel zum Thema</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href={`/${lang}/blog/umzug-kosten-regensburg`} className="text-primary hover:underline px-4 py-2">➔ Umzugskosten im Detail verstehen</a>
                        <a href={`/${lang}/blog/umzug-checkliste`} className="text-primary hover:underline px-4 py-2">➔ Die ultimative Umzugs-Checkliste</a>
                        <a href={`/${lang}/blog/umzug-tipps-bayern`} className="text-primary hover:underline px-4 py-2">➔ 10 Tipps für einen stressfreien Umzug</a>
                    </div>
                </div>
            </section>

        </main>
    );
}
