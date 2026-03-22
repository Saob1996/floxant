import { Metadata } from "next";
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
        path: "klaviertransport-muenchen",
        title: "Klaviertransport & Tresortransport München | FLOXANT Schwertransporte",
        description: "Klaviertransport, Flügeltransport und Tresortransport in München. Spezialisiertes Equipment, geschultes Team, volle Versicherung. Jetzt anfragen! Sofortpreis online berechnen oder bequem per WhatsApp / Telefon anfragen: +49 1577 1105087.",
    });
}

export default async function KlaviertransportPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "name": "Klaviertransport & Tresortransport München",
        "provider": {
            "@type": "MovingCompany", "name": "FLOXANT",
            "telephone": "+4915771105087",
            "address": { "@type": "PostalAddress", "streetAddress": "Friedenstraße 24", "addressLocality": "Regensburg", "postalCode": "93053", "addressCountry": "DE" }
        },
        "areaServed": { "@type": "City", "name": "München", "geo": { "@type": "GeoCoordinates", "latitude": "48.1351", "longitude": "11.5820" } },
        "serviceType": ["Klaviertransport", "Flügeltransport", "Tresortransport"],
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug München", href: "/" + lang + "/umzug-muenchen" }, { label: "Klavier- & Tresortransport" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

            <section className="pt-12 pb-24 px-6 bg-gradient-to-b from-slate-100 dark:from-slate-900/40 via-muted/30 to-background overflow-hidden relative">
                <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold">
                        <AlertTriangle className="w-4 h-4" /> Spezialtransporte · Schwerlast
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
                        Klavier- & Tresortransport<br className="hidden md:block"/>
                        <span className="text-primary">München</span>
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
                        <h2 className="text-3xl font-extrabold text-foreground">Schwertransporte in München: lokales Können</h2>
                        <p>In München erleben wir häufig Klaviertransporte aus Altbauwohnungen in Schwabing oder  Bogenhausen. Die Herausforderung: enge Treppenhäuser, keine Aufzüge, Wendeltreppen. Unsere Lösung: Außenlift oder Krantransport über den Balkon – je nach Situation.</p>
                        <p>Tresortransporte sind dagegen oft Firmenkunden-Aufträge. Wir transportieren Waffenschränke, Datensafes und Dokumententresore sowohl innerhalb von München als auch überregional. Dabei garantieren wir absolute Diskretion und volle Versicherungsdeckung.</p>
                    </div>

                    <div id="wizard" className="text-center py-16 bg-card rounded-[3rem] border border-border shadow-2xl relative mt-16 scroll-mt-24">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold text-sm shadow-lg">Spezialservice</div>
                        <h2 className="text-4xl font-extrabold mb-6 mt-6">Schwertransport in München anfragen</h2>
                        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">Teilen Sie uns Gewicht, Maße und Standort mit – wir kalkulieren den sicheren Transport.</p>
                        <div className="px-6"><SmartBookingWizard dict={dict} /></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        <Link href={"/" + lang + "/umzug-muenchen"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold hover:border-primary/50 transition-all">Umzug München</Link>
                        <Link href={"/" + lang + "/seniorenumzug-muenchen"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold hover:border-primary/50 transition-all">Seniorenumzug München</Link>
                        <Link href={"/" + lang + "/halteverbotszone-muenchen"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold hover:border-primary/50 transition-all">Halteverbotszone München</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
