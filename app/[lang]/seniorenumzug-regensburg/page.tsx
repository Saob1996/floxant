import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Heart, Shield, Clock, Package, ArrowRight, CheckCircle2, Phone, Users, Home } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: "seniorenumzug-regensburg",
        title: "Seniorenumzug Regensburg – Einfühlsam & Sicher | FLOXANT",
        description: "Seniorenumzug in Regensburg: Kompletter Einpackservice, Möbelmontage, Behördenhilfe. Empathisches Team, fester Preis, volle Versicherung. Jetzt beraten lassen! Sofortpreis online berechnen oder bequem per WhatsApp / Telefon anfragen: +49 1577 1105087.",
    });
}

export default async function SeniorenumzugPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "name": "Seniorenumzug Regensburg",
        "provider": {
            "@type": "MovingCompany", "name": "FLOXANT",
            "telephone": "+4915771105087",
            "address": { "@type": "PostalAddress", "streetAddress": "Friedenstraße 24", "addressLocality": "Regensburg", "postalCode": "93053", "addressCountry": "DE" },
            "geo": { "@type": "GeoCoordinates", "latitude": "49.0134", "longitude": "12.1016" }
        },
        "areaServed": {
            "@type": "City", "name": "Regensburg",
            "geo": { "@type": "GeoCoordinates", "latitude": "49.0134", "longitude": "12.1016" }
        },
        "serviceType": "Seniorenumzug",
        "description": "Einfühlsamer Umzugsservice speziell für Senioren in Regensburg. Kompletter Einpackservice, Möbelmontage, Behördenunterstützung.",
    };

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was unterscheidet einen Seniorenumzug vom normalen Umzug?", "acceptedAnswer": { "@type": "Answer", "text": "Beim Seniorenumzug übernehmen wir deutlich mehr: Komplettes Einpacken, Aussortieren, Möbelmontage, Behördengänge und auf Wunsch sogar die Einrichtung am neuen Standort. Unser Team ist speziell geschult, empathisch und geduldig." } },
            { "@type": "Question", "name": "Wie viel kostet ein Seniorenumzug in Regensburg?", "acceptedAnswer": { "@type": "Answer", "text": "Die Kosten richten sich nach Wohnungsgröße und gewünschten Zusatzleistungen. Ein Full-Service Seniorenumzug mit Einpacken liegt typischerweise 30-50% über einem Standard-Umzug, eliminiert dafür aber jeglichen Stress." } },
            { "@type": "Question", "name": "Helfen Sie auch bei der Wohnungsauflösung?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wir kombinieren Seniorenumzug mit fachgerechter Entrümpelung und besenreiner Endreinigung. Ideal beim Wechsel ins betreute Wohnen oder Pflegeheim." } },
        ],
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Regensburg", href: "/" + lang + "/umzug-regensburg" }, { label: "Seniorenumzug Regensburg" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

            {/* Hero */}
            <section className="pt-12 pb-24 px-6 bg-gradient-to-b from-rose-50 dark:from-rose-950/20 via-muted/30 to-background overflow-hidden relative">
                <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-sm font-bold">
                        <Heart className="w-4 h-4" /> Empathischer Umzugsservice für Senioren
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
                        Seniorenumzug in<br className="hidden md:block"/>
                        <span className="text-rose-600 dark:text-rose-400">Regensburg</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                        Wir wissen: Ein Umzug im Alter ist mehr als Logistik – es ist ein Abschied und ein Neuanfang zugleich. Unser einfühlsames Team begleitet Sie durch jeden Schritt.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Package className="w-5 h-5 text-rose-500" /> Kompletter Einpackservice</span>
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Home className="w-5 h-5 text-blue-500" /> Möbelauf- & -abbau</span>
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Shield className="w-5 h-5 text-emerald-500" /> 100% Versichert</span>
                    </div>
                    <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#wizard" className="group inline-flex items-center gap-3 px-8 py-4 bg-rose-600 text-white text-lg font-bold rounded-full hover:bg-rose-700 hover:scale-105 transition-all shadow-xl">
                            Kostenlose Beratung anfordern <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="tel:+4915771105087" className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-card text-foreground text-lg font-bold rounded-full border-2 border-border hover:border-rose-300 transition-all">
                            <Phone className="w-5 h-5" /> Sofort anrufen
                        </a>
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center mb-16">Was unseren Seniorenumzug besonders macht</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Heart, title: "Empathie & Geduld", desc: "Unser Team nimmt sich Zeit. Kein Zeitdruck, kein Hetzen. Wir respektieren, dass jedes Möbelstück Erinnerungen trägt." },
                            { icon: Package, title: "Komplettes Einpacken", desc: "Wir packen alles ein – von der Porzellansammlung bis zur Fotoalbum-Kiste. Systematisch, sicher und beschriftet." },
                            { icon: Home, title: "Möbelmontage inklusive", desc: "Im neuen Zuhause bauen wir alles wieder auf, hängen Bilder auf und richten ein – bis Sie sich wohlfühlen." },
                            { icon: Users, title: "Behördenhilfe", desc: "Ummeldung, Nachsendeauftrag, Versorger-Wechsel: Wir helfen bei den bürokratischen Formalitäten." },
                            { icon: Shield, title: "Volle Versicherung", desc: "Jedes einzelne Stück ist während des gesamten Transports über unsere Betriebshaftpflicht versichert." },
                            { icon: Clock, title: "Flexible Termine", desc: "Wir richten uns nach Ihrem Tempo. Ob der Umzug an einem Tag oder verteilt über mehrere Tage stattfindet – wir passen uns an." },
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-card border border-border shadow-md hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-7 h-7 text-rose-600 dark:text-rose-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deep Content */}
            <section className="py-16 px-6 bg-muted/20">
                <div className="max-w-4xl mx-auto prose prose-xl text-muted-foreground leading-loose">
                    <h2 className="text-3xl font-extrabold text-foreground">Seniorenumzug in Regensburg: Lokalwissen trifft Einfühlungsvermögen</h2>
                    <p>In Regensburg kennen wir die Wohnsituation genau. Ob Sie aus einer langjährigen Mietwohnung in Altstadt, Stadtamhof, Kumpfmühl, Galgenberg, Kasernenviertel, Westenviertel, Prüfening in eine barrierefreie Seniorenresidenz wechseln oder zu Ihren Kindern ziehen – wir planen den gesamten Prozess mit Ihnen gemeinsam.</p>
                    <p>Unsere Erfahrung zeigt: Die größte Sorge unserer älteren Kunden ist nicht der Transport selbst, sondern das <strong>Loslassen und Sortieren</strong>. Deshalb bieten wir einen einfühlsamen Vorsortier-Service an: Gemeinsam mit Ihnen entscheiden wir, was mitkommt, was verschenkt wird und was entsorgt werden kann.</p>
                    <p>Typische Projekte in Regensburg: Wechsel ins betreute Wohnen, Verkleinerung von 4 auf 2 Zimmer, Zusammenzug mit dem Partner, Nachzug zu den Kindern in eine andere Stadt. Für jeden dieser Fälle haben wir erprobte Abläufe.</p>
                    
                    <div className="not-prose mt-12 p-8 bg-card rounded-3xl border border-border shadow-sm">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><CheckCircle2 className="w-7 h-7 text-emerald-500" /> Referenz: Erfolgreich umgezogen</h3>
                        <p className="text-muted-foreground mb-2"><em>"Frau K. (78) zog aus ihrer 3-Zimmer-Wohnung in Altstadt in eine Seniorenresidenz. Unser Team hat an zwei Tagen die gesamte Wohnung eingepackt, die Möbel demontiert und im neuen Zimmer alles wieder aufgebaut. Am zweiten Abend hingen sogar die Bilder."</em></p>
                        <p className="text-sm text-muted-foreground">– FLOXANT Seniorenumzug-Team Regensburg</p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-center mb-10">Häufige Fragen zum Seniorenumzug</h2>
                    <div className="space-y-4">
                        <details className="group border border-border/50 rounded-2xl p-6 bg-muted/20 open:bg-card open:ring-2 open:ring-rose-200 transition-all cursor-pointer">
                            <summary className="text-xl font-bold list-none flex justify-between items-center"><span>Was unterscheidet den Seniorenumzug vom Standard-Umzug?</span><span className="text-rose-500 transition-transform group-open:rotate-180">▼</span></summary>
                            <div className="pt-5 text-muted-foreground leading-relaxed">Mehr Zeit, mehr Fürsorge, mehr Service. Wir übernehmen das komplette Einpacken, Sortieren, Montieren und auf Wunsch sogar die Einrichtung am neuen Standort. Unser Team ist speziell für den sensiblen Umgang mit älteren Kunden geschult.</div>
                        </details>
                        <details className="group border border-border/50 rounded-2xl p-6 bg-muted/20 open:bg-card open:ring-2 open:ring-rose-200 transition-all cursor-pointer">
                            <summary className="text-xl font-bold list-none flex justify-between items-center"><span>Wie viel kostet ein Seniorenumzug?</span><span className="text-rose-500 transition-transform group-open:rotate-180">▼</span></summary>
                            <div className="pt-5 text-muted-foreground leading-relaxed">Ein Full-Service Seniorenumzug (inkl. Einpacken) liegt typischerweise 30-50% über einem Standard-Umzug. Dafür entfällt jeglicher eigener Aufwand. Wir erstellen immer ein verbindliches Festpreisangebot nach persönlicher Besichtigung.</div>
                        </details>
                        <details className="group border border-border/50 rounded-2xl p-6 bg-muted/20 open:bg-card open:ring-2 open:ring-rose-200 transition-all cursor-pointer">
                            <summary className="text-xl font-bold list-none flex justify-between items-center"><span>Helfen Sie bei der Wohnungsauflösung?</span><span className="text-rose-500 transition-transform group-open:rotate-180">▼</span></summary>
                            <div className="pt-5 text-muted-foreground leading-relaxed">Ja. Wir kombinieren Ihren Seniorenumzug nahtlos mit einer <Link href={"/" + lang + "/entruempelung"} className="text-primary underline">professionellen Entrümpelung</Link> und <Link href={"/" + lang + "/reinigung"} className="text-primary underline">Endreinigung</Link>.</div>
                        </details>
                    </div>
                </div>
            </section>

            {/* CTA + Links */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div id="wizard" className="text-center py-16 bg-card rounded-[3rem] border border-border shadow-2xl relative scroll-mt-24">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-rose-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">Unverbindlich & Kostenlos</div>
                        <h2 className="text-4xl font-extrabold mb-6 mt-6">Seniorenumzug in Regensburg anfragen</h2>
                        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">Wir beraten Sie persönlich und erstellen ein maßgeschneidertes Festpreisangebot für Ihren Seniorenumzug.</p>
                        <div className="px-6"><SmartBookingWizard dict={dict} /></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href={"/" + lang + "/umzug-regensburg"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold hover:border-primary/50 transition-all">Umzug Regensburg</Link>
                        <Link href={"/" + lang + "/halteverbotszone-regensburg"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold hover:border-primary/50 transition-all">Halteverbotszone Regensburg</Link>
                        <Link href={"/" + lang + "/klaviertransport-regensburg"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold hover:border-primary/50 transition-all">Klaviertransport Regensburg</Link>
                        <Link href={"/" + lang + "/seniorenumzug-bayern"} className="px-5 py-3 rounded-2xl border-2 border-primary/20 bg-primary/5 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all">Seniorenumzug Bayern</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
