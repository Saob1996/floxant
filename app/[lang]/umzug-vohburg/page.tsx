import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Milestone, Layers, Award, ArrowRight, Shield, CheckCircle2, Clock, ThumbsUp, Truck } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: "umzug-vohburg",
        title: "Umzugsunternehmen Vohburg an der Donau ✓ Festpreis ✓ Versichert | FLOXANT",
        description: "Ihr Umzugsunternehmen für Vohburg an der Donau (Oberbayern). Professioneller Umzug mit Festpreisgarantie, voller Versicherung und schneller Verfügbarkeit. Jetzt Angebot anfordern!",
    });
}

export default async function UmzugVohburg({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in Vohburg an der Donau?", "acceptedAnswer": { "@type": "Answer", "text": "Die Kosten hängen von Wohnungsgröße, Etage und Entfernung ab. Ein Studentenumzug startet bei günstigen Einstiegspreisen. Familien erhalten ein maßgeschneidertes Festpreisangebot nach kostenloser Besichtigung." } },
            { "@type": "Question", "name": "Wie schnell ist FLOXANT in Vohburg an der Donau verfügbar?", "acceptedAnswer": { "@type": "Answer", "text": "Da unsere Teams täglich auf der Strecke A9 Ingolstadt–München unterwegs sind, können wir oft schon innerhalb weniger Tage einen Termin in Vohburg an der Donau realisieren." } },
            { "@type": "Question", "name": "Ist mein Umzugsgut bei FLOXANT versichert?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Jeder Transport ist über unsere Betriebshaftpflicht und die gesetzliche Verkehrshaftung nach §451g HGB abgesichert." } },
            { "@type": "Question", "name": "Bieten Sie auch Entrümpelung in Vohburg an der Donau an?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wir kombinieren Umzug, Entrümpelung und Endreinigung zu einem Paket. Ideal bei Wohnungsauflösungen oder wenn die alte Wohnung besenrein übergeben werden muss." } },
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany",
        "name": "FLOXANT Umzug Vohburg an der Donau",
        "description": "Professioneller Umzugsservice und Möbeltransport in Vohburg an der Donau (Oberbayern). Regional, versichert und zum garantierten Festpreis.",
        "url": "https://www.floxant.de/" + lang + "/umzug-vohburg",
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "addressLocality": "Vohburg an der Donau", "addressRegion": "Oberbayern", "addressCountry": "DE" },
        "areaServed": [{ "@type": "City", "name": "Vohburg an der Donau" }, { "@type": "AdministrativeArea", "name": "Oberbayern" }],
        "priceRange": "$$",
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.floxant.de/" + lang },
            { "@type": "ListItem", "position": 2, "name": "Umzug Bayern", "item": "https://www.floxant.de/" + lang + "/umzug-bayern" },
            { "@type": "ListItem", "position": 3, "name": "Umzug Vohburg an der Donau", "item": "https://www.floxant.de/" + lang + "/umzug-vohburg" }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: "/" + lang + "/umzug-bayern" }, { label: "Umzug Vohburg an der Donau" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

            {/* Hero */}
            <section className="pt-12 pb-24 px-6 bg-gradient-to-b from-primary/5 via-muted/30 to-background overflow-hidden relative">
                <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
                <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold shadow-sm ring-1 ring-primary/20 justify-center">
                        <MapPin className="w-4 h-4" /><span>Umzugsservice Vohburg an der Donau · Oberbayern</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
                        Umzugsunternehmen in <br className="hidden md:block"/>
                        <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Vohburg an der Donau</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                        Vom sorgfältigen Einpacken Ihrer Lieblingsstücke bis zum termingerechten Aufbau am neuen Standort – wir managen Ihren gesamten Wohnungswechsel.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-10">
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Award className="w-5 h-5 text-emerald-500" /> 100% Versichert</span>
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Layers className="w-5 h-5 text-blue-500" /> Festpreisgarantie</span>
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><ThumbsUp className="w-5 h-5 text-primary" /> Korridor A9 Ingolstadt–München</span>
                    </div>
                    <div className="mt-12 flex justify-center">
                        <a href="#wizard" className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/30">
                            Kostenloses Angebot anfordern
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Deep Content */}
            <section className="py-24 px-6 relative">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <h2 className="text-4xl font-extrabold text-foreground mb-8 tracking-tight">Professioneller Umzug in Vohburg an der Donau</h2>
                        <p className="text-lg">Ein Umzug ist immer ein großer Schritt. Egal ob Sie beruflich bedingt umziehen oder privat den Standort wechseln – die logistischen Anforderungen sind erheblich. Wir nehmen Ihnen den Stress ab und garantieren einen reibungslosen Ablauf mit festem Preis.</p>
                        <p className="text-lg">Unsere Disposition prüft tagesaktuell die Auslastung und freien Kapazitäten. Dadurch können wir oft auch mit wenigen Tagen Vorlauf noch attraktive Konditionen für Ihren Transport anbieten.</p>
                        <div className="bg-gradient-to-br from-card to-muted p-8 rounded-3xl border border-border mt-10 shadow-sm not-italic relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10"><Truck className="w-32 h-32" /></div>
                            <h4 className="text-2xl text-foreground font-bold mb-4 flex items-center gap-3 relative z-10"><CheckCircle2 className="w-8 h-8 text-emerald-500" /> Lokale Herausforderungen meistern</h4>
                            <p className="m-0 text-base relative z-10">Empfindliche Wertgegenstände, Kunst oder IT-Equipment? Dafür setzen wir Spezialverpackungen und klimaneutrale Schutzfolien ein, gestellt von unserem eigenen Materialpool. Wir kennen die infrastrukturellen Besonderheiten in Vohburg an der Donau und reagieren routiniert auf jede Situation.</p>
                        </div>
                    </div>

                    {/* USP Grid */}
                    <div>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-extrabold text-foreground mb-4">Warum FLOXANT für Vohburg an der Donau?</h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Wir verbinden regionalen Service mit überregionaler Logistikkompetenz.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-3xl bg-card border border-border shadow-md hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Clock className="w-7 h-7 text-primary" /></div>
                                <h3 className="text-xl font-bold mb-3">Schnell verfügbar</h3>
                                <p className="text-muted-foreground leading-relaxed">Unsere Teams fahren regelmäßig auf der Strecke A9 Ingolstadt–München. Dadurch sind wir in Vohburg an der Donau oft schon innerhalb weniger Tage einsatzbereit.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-card border border-border shadow-md hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Shield className="w-7 h-7 text-emerald-600" /></div>
                                <h3 className="text-xl font-bold mb-3">100% Versichert</h3>
                                <p className="text-muted-foreground leading-relaxed">Jeder Transport ist über unsere Betriebshaftpflicht nach §451g HGB abgesichert. Bei Hochpreisigem empfehlen wir eine optionale Zusatzversicherung.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-card border border-border shadow-md hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Layers className="w-7 h-7 text-blue-600" /></div>
                                <h3 className="text-xl font-bold mb-3">Festpreis ohne Nachverhandlung</h3>
                                <p className="text-muted-foreground leading-relaxed">Wir kalkulieren auf Basis einer kostenlosen Besichtigung (vor Ort oder per Video). Der Preis steht, bevor ein Karton gepackt wird.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-card border border-border shadow-md hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Milestone className="w-7 h-7 text-purple-600" /></div>
                                <h3 className="text-xl font-bold mb-3">Alles aus einer Hand</h3>
                                <p className="text-muted-foreground leading-relaxed">Transport, Küchenmontage, Entrümpelung und Endreinigung – wir bieten ein modulares Gesamtpaket, das Sie je nach Bedarf zusammenstellen.</p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="bg-card p-8 md:p-12 rounded-[2.5rem] border border-border shadow-sm">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-extrabold text-foreground mb-4">Häufige Fragen – Umzug Vohburg an der Donau</h2>
                        </div>
                        <div className="space-y-4 max-w-3xl mx-auto">
                            <details className="group border border-border/50 rounded-2xl p-6 bg-muted/20 open:bg-card open:ring-2 open:ring-primary/20 transition-all cursor-pointer">
                                <summary className="text-xl font-bold list-none flex justify-between items-center outline-none"><span>Was kostet ein Umzug in Vohburg an der Donau?</span><span className="text-primary transition-transform group-open:rotate-180">▼</span></summary>
                                <div className="pt-5 text-muted-foreground leading-relaxed">Die Kosten hängen von Faktoren wie Wohnungsgröße, Stockwerk, Entfernung zum Zielort und gewünschten Zusatzleistungen ab. Ein Single-Umzug beginnt ab günstigen Einstiegspreisen, ein Full-Service für Familien liegt typischerweise zwischen 800€ und 1.800€. Wir arbeiten ausschließlich mit verbindlichen Festpreisen.</div>
                            </details>
                            <details className="group border border-border/50 rounded-2xl p-6 bg-muted/20 open:bg-card open:ring-2 open:ring-primary/20 transition-all cursor-pointer">
                                <summary className="text-xl font-bold list-none flex justify-between items-center outline-none"><span>Wie kurzfristig kann ich in Vohburg an der Donau einen Termin bekommen?</span><span className="text-primary transition-transform group-open:rotate-180">▼</span></summary>
                                <div className="pt-5 text-muted-foreground leading-relaxed">Da unsere Fahrzeuge regelmäßig auf der Route A9 Ingolstadt–München unterwegs sind, können wir häufig auch innerhalb von 3–5 Werktagen einen Termin in Vohburg an der Donau anbieten.</div>
                            </details>
                            <details className="group border border-border/50 rounded-2xl p-6 bg-muted/20 open:bg-card open:ring-2 open:ring-primary/20 transition-all cursor-pointer">
                                <summary className="text-xl font-bold list-none flex justify-between items-center outline-none"><span>Organisieren Sie auch Halteverbotszonen?</span><span className="text-primary transition-transform group-open:rotate-180">▼</span></summary>
                                <div className="pt-5 text-muted-foreground leading-relaxed">Ja. Wir übernehmen die behördliche Beantragung und Beschilderung bei der zuständigen Verwaltung. Bitte planen Sie mindestens 14 Tage Vorlauf ein.</div>
                            </details>
                            <details className="group border border-border/50 rounded-2xl p-6 bg-muted/20 open:bg-card open:ring-2 open:ring-primary/20 transition-all cursor-pointer">
                                <summary className="text-xl font-bold list-none flex justify-between items-center outline-none"><span>Bieten Sie auch Entrümpelung und Reinigung an?</span><span className="text-primary transition-transform group-open:rotate-180">▼</span></summary>
                                <div className="pt-5 text-muted-foreground leading-relaxed">Selbstverständlich. Wir kombinieren Umzug, fachgerechte Entrümpelung und besenreine Endreinigung zu einem effizienten Gesamtpaket – ideal für Wohnungsübergaben.</div>
                            </details>
                        </div>
                    </div>

                    {/* Cross-Links */}
                    <div className="border-t border-border pt-16">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-bold mb-4">Weitere FLOXANT-Standorte in Bayern</h3>
                            <p className="text-muted-foreground">Wir sind in ganz Bayern aktiv – nutzen Sie unser dichtes Netzwerk.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href={"/" + lang + "/umzug-regensburg"} className="px-5 py-3 rounded-2xl border-2 border-primary/20 bg-primary/5 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all shadow-sm">Hauptsitz Regensburg</Link>
                            <Link href={"/" + lang + "/umzug-ingolstadt"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold text-foreground hover:border-primary/50 transition-all shadow-sm">Umzug Ingolstadt</Link>
                            <Link href={"/" + lang + "/umzug-roth"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Roth</Link>
                            <Link href={"/" + lang + "/umzug-mammendorf"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Mammendorf</Link>
                            <Link href={"/" + lang + "/umzug-friedberg"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Friedberg</Link>
                            <Link href={"/" + lang + "/umzug-freising"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Freising</Link>
                            <Link href={"/" + lang + "/umzug-postbauer-heng"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Postbauer-Heng</Link>
                            <Link href={"/" + lang + "/umzug-koenigsbrunn"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Königsbrunn</Link>
                            <Link href={"/" + lang + "/umzug-moosburg"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Moosburg an der Isar</Link>
                            <Link href={"/" + lang + "/umzug-pfaffenhofen"} className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card/50">Umzug Pfaffenhofen an der Ilm</Link>
                        </div>
                    </div>

                    {/* Booking Wizard */}
                    <div id="wizard" className="text-center py-16 bg-card rounded-[3rem] border border-border shadow-2xl relative mt-16 scroll-mt-24">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold text-sm shadow-lg">Unverbindlich & Kostenlos</div>
                        <h2 className="text-4xl font-extrabold mb-6 mt-6">Preis anfragen für Vohburg an der Donau</h2>
                        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">Füllen Sie unser kurzes Formular aus und erhalten Sie Ihr persönliches Festpreisangebot für Vohburg an der Donau.</p>
                        <div className="px-6">
                            <SmartBookingWizard dict={dict} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
