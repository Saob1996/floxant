import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale, isValidLocale } from "../../../i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { AlertTriangle, Phone, CheckCircle2, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const pageLocale: Locale = lang;
    const dict = await getDictionary(pageLocale);
    const content = dict.pages?.notfall_umzug_bayern || {};

    return generatePageSEO({
        pageLocale,
        path: "notfall-umzug-bayern",
        title: content.meta_title || "Notfall-Umzug Bayern | Sofort-Hilfe | FLOXANT",
        description: content.meta_desc || "Notfall-Umzug in Bayern bei Wasserschaden, Brand oder Räumungsklage.",
    });
}

export default async function NotfallUmzugBayern({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const pageLocale: Locale = lang;
    const dict = await getDictionary(pageLocale);
    const isDe = pageLocale === "de";

    const breadcrumbs = [
        { label: "Umzug Bayern", href: `/${pageLocale}/umzug-bayern` },
        { label: "Notfall-Umzug" }
    ];

    return (
        <main className="min-h-screen bg-background text-start font-sans">
            <Breadcrumbs lang={pageLocale} items={breadcrumbs} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-red-50 to-background dark:from-red-950/10">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Notfall-Service</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
                        Notfall-Umzug in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Wasserschaden, Brand, Räumungsklage oder familiäre Krise – wenn ein sofortiger
                        Umzug nötig ist, steht FLOXANT bereit. Schnell einsatzbereit, diskret und
                        professionell wie immer.
                    </p>
                    <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                        <Phone className="w-5 h-5" /> +49 1577 1105087
                    </div>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground text-start">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Wenn jede Stunde zählt</h2>
                        <p>
                            Notfälle lassen sich nicht planen. Ein Rohrbruch, ein Brand, eine Räumungsklage
                            oder ein plötzlicher familiärer Notfall – in diesen Situationen brauchen Sie
                            einen Umzugspartner, der sofort handelt. FLOXANT bietet einen
                            Notfall-Umzugsservice für ganz Bayern mit Bereitschaftsteams in Regensburg.
                        </p>
                        <p>
                            Wir verstehen, dass Notfallsituationen extrem belastend sind. Deshalb
                            übernehmen wir nicht nur den physischen Transport, sondern koordinieren bei
                            Bedarf auch Zwischenlagerung und die notwendigen Schritte für einen
                            schnellen Objektauszug.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-start">Notfall-Szenarien & Unterstützung</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { 
                                    title: "Wasserschaden / Brand", 
                                    desc: "Sofortige Bergung und Sicherung Ihres Inventars. Zwischenlagerung bis zur Klärung der Situation." 
                                },
                                { 
                                    title: "Räumungsklage", 
                                    desc: "Schnelle und strukturierte Räumung unter Einhaltung gesetzlicher Anforderungen." 
                                },
                                { 
                                    title: "Familiäre Notfälle", 
                                    desc: "Diskrete und einfühlsame Abwicklung bei Trennungen oder anderen Krisen." 
                                },
                                { 
                                    title: "Akute Wohnungsprobleme", 
                                    desc: "Unbewohnbarkeit durch Mängel – wir helfen beim sofortigen Auszug und Transport." 
                                },
                            ].map((item, i) => (
                                <div key={i} className="p-8 rounded-3xl bg-muted/10 border border-border/50 text-start">
                                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {isDe && (
                        <div className="border-t border-border pt-12 text-start">
                            <h3 className="text-lg font-semibold mb-6">Verwandte Leistungen</h3>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={`/${pageLocale}/24h-umzug-bayern`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all font-sans"
                                >
                                    24h Umzug Bayern
                                </Link>
                                <Link
                                    href={`/${pageLocale}/kurzfristiger-umzug-bayern`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all font-sans"
                                >
                                    Kurzfristiger Umzug
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-bayern`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all font-sans"
                                >
                                    Umzug Bayern
                                </Link>
                                <Link
                                    href={`/${pageLocale}/entruempelung-bayern`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all font-sans"
                                >
                                    Entrümpelung Bayern
                                </Link>
                            </div>
                        </div>
                    )}

                    <div id="rechner" className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-[3rem] border border-primary/10 shadow-lg scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-4">Notfall-Umzug anfragen</h2>
                        <p className="text-muted-foreground mb-12 max-w-xl mx-auto px-8 text-start text-lg">
                            Geben Sie uns die wichtigsten Details durch. Wir reagieren sofort und erstellen Ihnen ein Festpreisangebot.
                        </p>
                        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl">
                            <div className="p-4 md:p-8 text-start font-sans">
                                <SmartBookingWizard
                                    dict={{
                                        common: dict.common,
                                        calculator: dict.calculator,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
