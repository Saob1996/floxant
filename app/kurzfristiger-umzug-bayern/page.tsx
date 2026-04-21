import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/get-dictionary";
import { type Locale } from "@/i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import { Zap, Shield, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
export async function generateMetadata(): Promise<Metadata> {
    const pageLocale: Locale = "de";
    const dict = await getDictionary("de");
    const content = dict.pages?.kurzfristiger_umzug_bayern || {};
    return generatePageSEO({
        pageLocale,
        path: "kurzfristiger-umzug-bayern",
        title: content.meta_title || "Kurzfristiger Umzug Bayern | Schnell & Flexibel | FLOXANT",
        description: content.meta_desc || "Kurzfristiger Umzug in Bayern – auch innerhalb weniger Tage.",
    });
}
export default async function KurzfristigerUmzugBayern() {
    const pageLocale: Locale = "de";
    const dict = await getDictionary("de");
    const isDe = pageLocale === "de";
    const breadcrumbs = [
        { label: "Umzug Bayern", href: `/umzug-bayern` },
        { label: "Kurzfristiger Umzug" }
    ];
    return (
        <main className="min-h-screen bg-background text-start font-sans">
            <Breadcrumbs lang="de" items={breadcrumbs} />
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
                                    href={`/umzug-bayern`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Bayern
                                </Link>
                                <Link
                                    href={`/24h-umzug-bayern`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    24h Umzug Bayern
                                </Link>
                                <Link
                                    href={`/notfall-umzug-bayern`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Notfall-Umzug
                                </Link>
                                <Link
                                    href={`/umzug-regensburg`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Regensburg
                                </Link>
                            </div>
                        </div>
                    )}
                    <div id="rechner" className="bg-slate-900 py-24 px-6 rounded-[3rem] relative overflow-hidden border border-white/5 shadow-2xl scroll-mt-24">
                        {/* Premium Background Ambient Effects */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
                            <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-violet-600/20 blur-[120px] rounded-full animate-pulse" />
                            <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                        </div>
                        <div className="max-w-4xl mx-auto relative z-10 text-center">
                            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Kurzfristigen Umzug anfragen</h2>
                            <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
                                Nutzen Sie unseren Rechner für ein schnelles Angebot. Wir melden uns umgehend bei Ihnen zurück.
                            </p>
                            {/* The Premium Glass Container */}
                            <div className="relative group text-start">
                                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                                <div className="relative bg-[#0A0C10] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-sm p-4 md:p-8">
                                    <SmartBookingWizard
                                        dict={{
                                            common: dict.common as any,
                                            calculator: (dict as any).calculator,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
