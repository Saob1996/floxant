import { Metadata } from "next";
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
        path: "halteverbotszone-regensburg",
        title: "Halteverbotszone Regensburg – Beantragung & Aufstellung | FLOXANT",
        description: "Halteverbotszone in Regensburg beantragen: Wir übernehmen die behördliche Genehmigung und stellen die Schilder auf. Rechtskonform, fristgerecht, stressfrei. Sofortpreis online berechnen oder bequem per WhatsApp / Telefon anfragen: +49 1577 1105087.",
    });
}

export default async function HalteverbotPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "name": "Halteverbotszone Regensburg",
        "provider": {
            "@type": "MovingCompany", "name": "FLOXANT",
            "telephone": "+4915771105087",
            "address": { "@type": "PostalAddress", "streetAddress": "Friedenstraße 24", "addressLocality": "Regensburg", "postalCode": "93053", "addressCountry": "DE" }
        },
        "areaServed": { "@type": "City", "name": "Regensburg", "geo": { "@type": "GeoCoordinates", "latitude": "49.0134", "longitude": "12.1016" } },
        "serviceType": "Halteverbotszone Beantragung und Aufstellung",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Regensburg", href: "/" + lang + "/umzug-regensburg" }, { label: "Halteverbotszone Regensburg" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

            <section className="pt-12 pb-24 px-6 bg-gradient-to-b from-amber-50 dark:from-amber-950/20 via-muted/30 to-background overflow-hidden relative">
                <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-bold">
                        <AlertTriangle className="w-4 h-4" /> Behördlicher Halteverbotsservice
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
                        Halteverbotszone in<br className="hidden md:block"/>
                        <span className="text-amber-600 dark:text-amber-400">Regensburg</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                        Kein Parkplatzstress am Umzugstag. Wir beantragen, genehmigen und beschildern Ihre Halteverbotszone in Regensburg – rechtskonform und fristgerecht.
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
                            { step: "1", title: "Antrag stellen", desc: "Wir beantragen die Halteverbotszone bei der zuständigen Behörde in Regensburg. Vorlaufzeit: min. 14 Tage." },
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
                        <h2 className="text-3xl font-extrabold text-foreground">Halteverbotszone in Regensburg: Was Sie wissen müssen</h2>
                        <p>In Regensburg ist die Halteverbotszone über die städtische Straßenverkehrsbehörde zu beantragen. Je nach Standort (Innenstadt wie Altstadt vs. Außenbezirk) variieren Bearbeitungszeiten und Gebühren.</p>
                        <p><strong>Kosten:</strong> Die behördlichen Gebühren liegen bei ca. 20-80€ pro Schild. Hinzu kommt eine Aufstellpauschale. Bei FLOXANT ist der komplette Halteverbot-Service bereits in vielen Umzugsangeboten enthalten.</p>
                        <p><strong>Tipp:</strong> In engeren Straßen von  Stadtamhof empfehlen wir, die Halteverbotszone beidseitig einzurichten, um genügend Rangierraum für den Umzugs-LKW zu schaffen.</p>
                    </div>

                    <div id="wizard" className="text-center py-16 bg-card rounded-[3rem] border border-border shadow-2xl relative mt-16 scroll-mt-24">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">Inkl. behördlicher Beantragung</div>
                        <h2 className="text-4xl font-extrabold mb-6 mt-6">Halteverbotszone jetzt beantragen</h2>
                        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">Teilen Sie uns Ihren Umzugstermin und die Adresse mit – wir kümmern uns um den Rest.</p>
                        <div className="px-6"><SmartBookingWizard dict={dict} /></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        <Link href={"/" + lang + "/umzug-regensburg"} className="px-5 py-3 rounded-2xl border border-border/50 bg-card text-sm font-semibold hover:border-primary/50 transition-all">Umzug Regensburg</Link>
                        <Link href={"/" + lang + "/halteverbotszone"} className="px-5 py-3 rounded-2xl border-2 border-primary/20 bg-primary/5 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all">Halteverbotszone Bayern</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
