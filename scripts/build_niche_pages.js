const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app/[lang]');

// ═══════════════════════════════════════════════════════
// NICHE PAGES: 3 high-profit niches × 3 top cities
// ═══════════════════════════════════════════════════════

const cities = [
    { key: 'regensburg', name: 'Regensburg', region: 'Oberpfalz', lat: '49.0134', lng: '12.1016', zip: '93047',
      districts: 'Altstadt, Stadtamhof, Kumpfmühl, Galgenberg, Kasernenviertel, Westenviertel, Prüfening' },
    { key: 'nuernberg', name: 'Nürnberg', region: 'Mittelfranken', lat: '49.4521', lng: '11.0767', zip: '90402',
      districts: 'Altstadt, Gostenhof, Maxfeld, Wöhrd, St. Johannis, Langwasser, Mögeldorf, Schoppershof' },
    { key: 'muenchen', name: 'München', region: 'Oberbayern', lat: '48.1351', lng: '11.5820', zip: '80331',
      districts: 'Schwabing, Bogenhausen, Sendling, Pasing, Haidhausen, Neuhausen, Laim, Berg am Laim' },
];

// ── NICHE 1: Seniorenumzüge ──
function seniorenPage(city) {
    return `import { Metadata } from "next";
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
        path: "seniorenumzug-${city.key}",
        title: "Seniorenumzug ${city.name} – Einfühlsam & Sicher | FLOXANT",
        description: "Seniorenumzug in ${city.name}: Kompletter Einpackservice, Möbelmontage, Behördenhilfe. Empathisches Team, fester Preis, volle Versicherung. Jetzt beraten lassen!",
    });
}

export default async function SeniorenumzugPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "name": "Seniorenumzug ${city.name}",
        "provider": {
            "@type": "MovingCompany", "name": "FLOXANT GmbH",
            "telephone": "+4915771105087",
            "address": { "@type": "PostalAddress", "streetAddress": "Friedenstraße 24", "addressLocality": "Regensburg", "postalCode": "93053", "addressCountry": "DE" },
            "geo": { "@type": "GeoCoordinates", "latitude": "${city.lat}", "longitude": "${city.lng}" }
        },
        "areaServed": {
            "@type": "City", "name": "${city.name}",
            "geo": { "@type": "GeoCoordinates", "latitude": "${city.lat}", "longitude": "${city.lng}" }
        },
        "serviceType": "Seniorenumzug",
        "description": "Einfühlsamer Umzugsservice speziell für Senioren in ${city.name}. Kompletter Einpackservice, Möbelmontage, Behördenunterstützung.",
    };

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was unterscheidet einen Seniorenumzug vom normalen Umzug?", "acceptedAnswer": { "@type": "Answer", "text": "Beim Seniorenumzug übernehmen wir deutlich mehr: Komplettes Einpacken, Aussortieren, Möbelmontage, Behördengänge und auf Wunsch sogar die Einrichtung am neuen Standort. Unser Team ist speziell geschult, empathisch und geduldig." } },
            { "@type": "Question", "name": "Wie viel kostet ein Seniorenumzug in ${city.name}?", "acceptedAnswer": { "@type": "Answer", "text": "Die Kosten richten sich nach Wohnungsgröße und gewünschten Zusatzleistungen. Ein Full-Service Seniorenumzug mit Einpacken liegt typischerweise 30-50% über einem Standard-Umzug, eliminiert dafür aber jeglichen Stress." } },
            { "@type": "Question", "name": "Helfen Sie auch bei der Wohnungsauflösung?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wir kombinieren Seniorenumzug mit fachgerechter Entrümpelung und besenreiner Endreinigung. Ideal beim Wechsel ins betreute Wohnen oder Pflegeheim." } },
        ],
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug ${city.name}", href: "/" + lang + "/umzug-${city.key}" }, { label: "Seniorenumzug ${city.name}" }]} />
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
                        <span className="text-rose-600 dark:text-rose-400">${city.name}</span>
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
                    <h2 className="text-3xl font-extrabold text-foreground">Seniorenumzug in ${city.name}: Lokalwissen trifft Einfühlungsvermögen</h2>
                    <p>In ${city.name} kennen wir die Wohnsituation genau. Ob Sie aus einer langjährigen Mietwohnung in ${city.districts} in eine barrierefreie Seniorenresidenz wechseln oder zu Ihren Kindern ziehen – wir planen den gesamten Prozess mit Ihnen gemeinsam.</p>
                    <p>Unsere Erfahrung zeigt: Die größte Sorge unserer älteren Kunden ist nicht der Transport selbst, sondern das <strong>Loslassen und Sortieren</strong>. Deshalb bieten wir einen einfühlsamen Vorsortier-Service an: Gemeinsam mit Ihnen entscheiden wir, was mitkommt, was verschenkt wird und was entsorgt werden kann.</p>
                    <p>Typische Projekte in ${city.name}: Wechsel ins betreute Wohnen, Verkleinerung von 4 auf 2 Zimmer, Zusammenzug mit dem Partner, Nachzug zu den Kindern in eine andere Stadt. Für jeden dieser Fälle haben wir erprobte Abläufe.</p>
                    
                    <div className="not-prose mt-12 p-8 bg-card rounded-3xl border border-border shadow-sm">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><CheckCircle2 className="w-7 h-7 text-emerald-500" /> Referenz: Erfolgreich umgezogen</h3>
                        <p className="text-muted-foreground mb-2"><em>"Frau K. (78) zog aus ihrer 3-Zimmer-Wohnung in ${city.districts.split(',')[0]} in eine Seniorenresidenz. Unser Team hat an zwei Tagen die gesamte Wohnung eingepackt, die Möbel demontiert und im neuen Zimmer alles wieder aufgebaut. Am zweiten Abend hingen sogar die Bilder."</em></p>
                        <p className="text-sm text-muted-foreground">– FLOXANT Seniorenumzug-Team ${city.name}</p>
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
                        <h2 className="text-4xl font-extrabold mb-6 mt-6">Seniorenumzug in ${city.name} anfragen</h2>
                        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">Wir beraten Sie persönlich und erstellen ein maßgeschneidertes Festpreisangebot für Ihren Seniorenumzug.</p>
                        <div className="px-6"><SmartBookingWizard dict={dict} /></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href={"/" + lang + "/umzug-${city.key}"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold hover:border-primary/50 transition-all">Umzug ${city.name}</Link>
                        <Link href={"/" + lang + "/halteverbotszone-${city.key}"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold hover:border-primary/50 transition-all">Halteverbotszone ${city.name}</Link>
                        <Link href={"/" + lang + "/klaviertransport-${city.key}"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold hover:border-primary/50 transition-all">Klaviertransport ${city.name}</Link>
                        <Link href={"/" + lang + "/seniorenumzug-bayern"} className="px-5 py-3 rounded-2xl border-2 border-primary/20 bg-primary/5 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all">Seniorenumzug Bayern</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
`;
}

// ── NICHE 2: Halteverbotszone ──
function halteverbotPage(city) {
    return `import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AlertTriangle, FileCheck, MapPin, Clock, ArrowRight, CheckCircle2, Phone, Shield, Truck } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: "halteverbotszone-${city.key}",
        title: "Halteverbotszone ${city.name} – Beantragung & Aufstellung | FLOXANT",
        description: "Halteverbotszone in ${city.name} beantragen: Wir übernehmen die behördliche Genehmigung und stellen die Schilder auf. Rechtskonform, fristgerecht, stressfrei.",
    });
}

export default async function HalteverbotPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "name": "Halteverbotszone ${city.name}",
        "provider": {
            "@type": "MovingCompany", "name": "FLOXANT GmbH",
            "telephone": "+4915771105087",
            "address": { "@type": "PostalAddress", "streetAddress": "Friedenstraße 24", "addressLocality": "Regensburg", "postalCode": "93053", "addressCountry": "DE" }
        },
        "areaServed": { "@type": "City", "name": "${city.name}", "geo": { "@type": "GeoCoordinates", "latitude": "${city.lat}", "longitude": "${city.lng}" } },
        "serviceType": "Halteverbotszone Beantragung und Aufstellung",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug ${city.name}", href: "/" + lang + "/umzug-${city.key}" }, { label: "Halteverbotszone ${city.name}" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

            <section className="pt-12 pb-24 px-6 bg-gradient-to-b from-amber-50 dark:from-amber-950/20 via-muted/30 to-background overflow-hidden relative">
                <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-bold">
                        <AlertTriangle className="w-4 h-4" /> Behördlicher Halteverbotsservice
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
                        Halteverbotszone in<br className="hidden md:block"/>
                        <span className="text-amber-600 dark:text-amber-400">${city.name}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                        Kein Parkplatzstress am Umzugstag. Wir beantragen, genehmigen und beschildern Ihre Halteverbotszone in ${city.name} – rechtskonform und fristgerecht.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><FileCheck className="w-5 h-5 text-amber-500" /> Behördliche Genehmigung</span>
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><MapPin className="w-5 h-5 text-blue-500" /> Schilder-Aufstellung</span>
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Clock className="w-5 h-5 text-emerald-500" /> Fristgerechte Abwicklung</span>
                    </div>
                    <div className="mt-12 flex justify-center">
                        <a href="#wizard" className="group inline-flex items-center gap-3 px-8 py-4 bg-amber-600 text-white text-lg font-bold rounded-full hover:bg-amber-700 hover:scale-105 transition-all shadow-xl">
                            Halteverbotszone beantragen <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center mb-8">So funktioniert der Halteverbot-Service</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            { step: "1", title: "Antrag stellen", desc: "Wir beantragen die Halteverbotszone bei der zuständigen Behörde in ${city.name}. Vorlaufzeit: min. 14 Tage." },
                            { step: "2", title: "Schilder aufstellen", desc: "Nach Genehmigung stellen wir die offiziellen Halteverbotsschilder an den vereinbarten Stellen auf." },
                            { step: "3", title: "Freie Fahrt", desc: "Am Umzugstag ist die Fläche reserviert. Sollte ein Fahrzeug im Halteverbot stehen, wird es auf unsere Kosten umgesetzt." },
                        ].map((item, i) => (
                            <div key={i} className="text-center p-8 rounded-3xl bg-card border border-border shadow-md">
                                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-extrabold text-amber-600">{item.step}</div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <h2 className="text-3xl font-extrabold text-foreground">Halteverbotszone in ${city.name}: Was Sie wissen müssen</h2>
                        <p>In ${city.name} ist die Halteverbotszone über die städtische Straßenverkehrsbehörde zu beantragen. Je nach Standort (Innenstadt wie ${city.districts.split(',')[0]} vs. Außenbezirk) variieren Bearbeitungszeiten und Gebühren.</p>
                        <p><strong>Kosten:</strong> Die behördlichen Gebühren liegen bei ca. 20-80€ pro Schild. Hinzu kommt eine Aufstellpauschale. Bei FLOXANT ist der komplette Halteverbot-Service bereits in vielen Umzugsangeboten enthalten.</p>
                        <p><strong>Tipp:</strong> In engeren Straßen von ${city.districts.split(',')[1] || city.name} empfehlen wir, die Halteverbotszone beidseitig einzurichten, um genügend Rangierraum für den Umzugs-LKW zu schaffen.</p>
                    </div>

                    <div id="wizard" className="text-center py-16 bg-card rounded-[3rem] border border-border shadow-2xl relative mt-16 scroll-mt-24">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">Inkl. behördlicher Beantragung</div>
                        <h2 className="text-4xl font-extrabold mb-6 mt-6">Halteverbotszone jetzt beantragen</h2>
                        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">Teilen Sie uns Ihren Umzugstermin und die Adresse mit – wir kümmern uns um den Rest.</p>
                        <div className="px-6"><SmartBookingWizard dict={dict} /></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        <Link href={"/" + lang + "/umzug-${city.key}"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold hover:border-primary/50 transition-all">Umzug ${city.name}</Link>
                        <Link href={"/" + lang + "/halteverbotszone"} className="px-5 py-3 rounded-2xl border-2 border-primary/20 bg-primary/5 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all">Halteverbotszone Bayern</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
`;
}

// ── NICHE 3: Klavier & Tresor ──
function klavierPage(city) {
    return `import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Shield, Weight, Truck, ArrowRight, CheckCircle2, AlertTriangle, Lock, Music } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: "klaviertransport-${city.key}",
        title: "Klaviertransport & Tresortransport ${city.name} | FLOXANT Schwertransporte",
        description: "Klaviertransport, Flügeltransport und Tresortransport in ${city.name}. Spezialisiertes Equipment, geschultes Team, volle Versicherung. Jetzt anfragen!",
    });
}

export default async function KlaviertransportPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "name": "Klaviertransport & Tresortransport ${city.name}",
        "provider": {
            "@type": "MovingCompany", "name": "FLOXANT GmbH",
            "telephone": "+4915771105087",
            "address": { "@type": "PostalAddress", "streetAddress": "Friedenstraße 24", "addressLocality": "Regensburg", "postalCode": "93053", "addressCountry": "DE" }
        },
        "areaServed": { "@type": "City", "name": "${city.name}", "geo": { "@type": "GeoCoordinates", "latitude": "${city.lat}", "longitude": "${city.lng}" } },
        "serviceType": ["Klaviertransport", "Flügeltransport", "Tresortransport"],
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug ${city.name}", href: "/" + lang + "/umzug-${city.key}" }, { label: "Klavier- & Tresortransport" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

            <section className="pt-12 pb-24 px-6 bg-gradient-to-b from-slate-100 dark:from-slate-900/40 via-muted/30 to-background overflow-hidden relative">
                <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold">
                        <AlertTriangle className="w-4 h-4" /> Spezialtransporte · Schwerlast
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
                        Klavier- & Tresortransport<br className="hidden md:block"/>
                        <span className="text-primary">${city.name}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                        Ein Klavier wiegt 200-500 kg, ein Tresor oft noch mehr. Für solche Aufträge braucht es Spezialkönnen, -equipment und -versicherung. Genau das liefern wir.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Music className="w-5 h-5 text-primary" /> Klavier & Flügel</span>
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Lock className="w-5 h-5 text-slate-600" /> Tresore & Safes</span>
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Shield className="w-5 h-5 text-emerald-500" /> Spezialversicherung</span>
                    </div>
                    <div className="mt-12 flex justify-center">
                        <a href="#wizard" className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/30">
                            Schwertransport anfragen <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="p-8 rounded-3xl bg-card border border-border shadow-md">
                            <Music className="w-10 h-10 text-primary mb-6" />
                            <h3 className="text-2xl font-bold mb-4">Klaviertransport</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> Spezial-Klavierrollwagen & Tragegurte</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> Schutzpolsterung für Tasten, Pedale & Gehäuse</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> Klimatisierter Transport (Feuchtigkeit!)</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> Auf Wunsch: Neuformung durch Fachstimmer</li>
                            </ul>
                        </div>
                        <div className="p-8 rounded-3xl bg-card border border-border shadow-md">
                            <Lock className="w-10 h-10 text-slate-600 mb-6" />
                            <h3 className="text-2xl font-bold mb-4">Tresortransport</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> Tresore bis 2.000 kg Eigengewicht</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> Hydraulische Hubwagen & Treppen-Raupen</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> Statikprüfung für Zielort (Deckenlast)</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> Diskrete Abwicklung für Wertgegenstände</li>
                            </ul>
                        </div>
                    </div>

                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <h2 className="text-3xl font-extrabold text-foreground">Schwertransporte in ${city.name}: lokales Können</h2>
                        <p>In ${city.name} erleben wir häufig Klaviertransporte aus Altbauwohnungen in ${city.districts.split(',')[0]} oder ${city.districts.split(',')[1] || city.name}. Die Herausforderung: enge Treppenhäuser, keine Aufzüge, Wendeltreppen. Unsere Lösung: Außenlift oder Krantransport über den Balkon – je nach Situation.</p>
                        <p>Tresortransporte sind dagegen oft Firmenkunden-Aufträge. Wir transportieren Waffenschränke, Datensafes und Dokumententresore sowohl innerhalb von ${city.name} als auch überregional. Dabei garantieren wir absolute Diskretion und volle Versicherungsdeckung.</p>
                    </div>

                    <div id="wizard" className="text-center py-16 bg-card rounded-[3rem] border border-border shadow-2xl relative mt-16 scroll-mt-24">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold text-sm shadow-lg">Spezialservice</div>
                        <h2 className="text-4xl font-extrabold mb-6 mt-6">Schwertransport in ${city.name} anfragen</h2>
                        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">Teilen Sie uns Gewicht, Maße und Standort mit – wir kalkulieren den sicheren Transport.</p>
                        <div className="px-6"><SmartBookingWizard dict={dict} /></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        <Link href={"/" + lang + "/umzug-${city.key}"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold hover:border-primary/50 transition-all">Umzug ${city.name}</Link>
                        <Link href={"/" + lang + "/seniorenumzug-${city.key}"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold hover:border-primary/50 transition-all">Seniorenumzug ${city.name}</Link>
                        <Link href={"/" + lang + "/halteverbotszone-${city.key}"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold hover:border-primary/50 transition-all">Halteverbotszone ${city.name}</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
`;
}

// ═══════════════════════════════════════════════════════
// GENERATE ALL 9 NICHE PAGES
// ═══════════════════════════════════════════════════════

let created = 0;

cities.forEach(city => {
    // Seniorenumzug
    const senDir = path.join(appDir, 'seniorenumzug-' + city.key);
    if (!fs.existsSync(path.join(senDir, 'page.tsx'))) {
        fs.mkdirSync(senDir, { recursive: true });
        fs.writeFileSync(path.join(senDir, 'page.tsx'), seniorenPage(city), 'utf8');
        created++;
        console.log('CREATED: seniorenumzug-' + city.key);
    }

    // Halteverbotszone
    const hvDir = path.join(appDir, 'halteverbotszone-' + city.key);
    if (!fs.existsSync(path.join(hvDir, 'page.tsx'))) {
        fs.mkdirSync(hvDir, { recursive: true });
        fs.writeFileSync(path.join(hvDir, 'page.tsx'), halteverbotPage(city), 'utf8');
        created++;
        console.log('CREATED: halteverbotszone-' + city.key);
    }

    // Klaviertransport
    const klDir = path.join(appDir, 'klaviertransport-' + city.key);
    if (!fs.existsSync(path.join(klDir, 'page.tsx'))) {
        fs.mkdirSync(klDir, { recursive: true });
        fs.writeFileSync(path.join(klDir, 'page.tsx'), klavierPage(city), 'utf8');
        created++;
        console.log('CREATED: klaviertransport-' + city.key);
    }
});

console.log('Done. Created ' + created + ' niche pages.');

