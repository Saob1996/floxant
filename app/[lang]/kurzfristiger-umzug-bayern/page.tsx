import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale, isValidLocale } from "../../../i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Zap, Shield, Clock, ArrowRight } from "lucide-react";
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
    const content = dict.pages?.kurzfristiger_umzug_bayern || {};

    return generatePageSEO({
        pageLocale,
        path: "kurzfristiger-umzug-bayern",
        title: content.meta_title || "Kurzfristiger Umzug Bayern | Schnell & Flexibel | FLOXANT",
        description: content.meta_desc || "Kurzfristiger Umzug in Bayern – auch innerhalb weniger Tage.",
    });
}

export default async function KurzfristigerUmzugBayern({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const pageLocale: Locale = lang;
    const dict = await getDictionary(pageLocale);
    const isDe = pageLocale === "de";

    const breadcrumbs = [
        { label: "Umzug Bayern", href: `/${pageLocale}/umzug-bayern` },
        { label: "Kurzfristiger Umzug" }
    ];

    return (
        <main className="min-h-screen bg-background text-start font-sans">
            <Breadcrumbs lang={pageLocale} items={breadcrumbs} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        <Zap className="w-4 h-4" />
                        <span>Kurzfristig verfügbar</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
                        Kurzfristiger Umzug in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Manchmal bleibt keine Zeit für wochenlange Planung. FLOXANT organisiert Ihren
                        kurzfristigen Umzug in ganz Bayern – professionell, versichert und auch unter
                        Zeitdruck mit gewohnter Qualität.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground text-start">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Schnell umziehen – ohne Qualitätsverlust</h2>
                        <p>
                            Kurzfristige Kündigungen, berufliche Versetzungen oder plötzliche Lebenswechsel
                            erfordern oft schnelles Handeln. FLOXANT ist darauf vorbereitet. Unser
                            Bereitschaftsnetzwerk in Regensburg und ganz Bayern ermöglicht auch bei kurzen
                            Vorlaufzeiten einen vollwertigen Umzugsservice.
                        </p>
                        <p>
                            Ob innerhalb von Nürnberg, von München nach Regensburg oder bayernweit – wir
                            mobilisieren Teams schnell, planen effizient und führen Ihren Umzug mit gleicher
                            Sorgfalt durch wie bei monatelanger Vorplanung.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Zap,
                                title: "Schnelle Reaktion",
                                desc: "Anfrage heute – Umzug in wenigen Tagen meistens möglich.",
                            },
                            {
                                icon: Clock,
                                title: "Flexible Zeiten",
                                desc: "Wir finden auch kurzfristig passende Zeitfenster für Sie.",
                            },
                            {
                                icon: Shield,
                                title: "Gleiche Qualität",
                                desc: "Keine Kompromisse bei Sicherheit und Sorgfalt trotz Zeitdruck.",
                            },
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-muted/10 border border-border/50 text-center">
                                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {isDe && (
                        <div className="border-t border-border pt-12">
                            <h3 className="text-lg font-semibold mb-6">Verwandte Leistungen</h3>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={`/${pageLocale}/umzug-bayern`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Bayern
                                </Link>
                                <Link
                                    href={`/${pageLocale}/24h-umzug-bayern`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    24h Umzug Bayern
                                </Link>
                                <Link
                                    href={`/${pageLocale}/notfall-umzug-bayern`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Notfall-Umzug
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-regensburg`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Regensburg
                                </Link>
                            </div>
                        </div>
                    )}

                    <div id="rechner" className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-[3rem] border border-primary/10 shadow-lg scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-4">Kurzfristigen Umzug anfragen</h2>
                        <p className="text-muted-foreground mb-12 max-w-xl mx-auto text-lg text-start px-8">
                            Nutzen Sie unseren Rechner für ein schnelles Angebot. Wir melden uns umgehend bei Ihnen zurück.
                        </p>
                        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl">
                            <div className="p-4 md:p-8 text-start">
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
