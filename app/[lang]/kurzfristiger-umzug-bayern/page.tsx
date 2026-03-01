import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Zap, MapPin, CheckCircle2, Shield, Clock } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: "Kurzfristiger Umzug Bayern | Schnell & Flexibel | FLOXANT",
        description: "Kurzfristiger Umzug in Bayern – auch innerhalb weniger Tage. Regensburg, Nürnberg, München. Professionell & versichert. Jetzt anfragen!",
        alternates: {
            canonical: `https://floxant.de/${lang}/kurzfristiger-umzug-bayern`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://floxant.de/${l}/kurzfristiger-umzug-bayern`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function KurzfristigerUmzugBayern({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Kurzfristiger Umzug" }]} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <Zap className="w-4 h-4" /><span>Kurzfristig verfügbar</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Kurzfristiger Umzug in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Manchmal bleibt keine Zeit für wochenlange Planung. FLOXANT organisiert Ihren kurzfristigen Umzug in ganz Bayern – professionell und auch unter Zeitdruck mit gewohnter Qualität.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Schnell umziehen – ohne Qualitätsverlust</h2>
                        <p>Kurzfristige Kündigungen, berufliche Versetzungen, plötzliche Lebenswechsel oder die unerwartete Verfügbarkeit der Traumwohnung – die Gründe für einen schnellen Umzug sind vielfältig. FLOXANT ist darauf eingestellt. Unser Bereitschaftsnetzwerk in Regensburg und ganz Bayern ermöglicht auch bei kurzen Vorlaufzeiten einen vollwertigen Umzugsservice.</p>
                        <p>Ob innerhalb von Nürnberg, von München nach Regensburg oder bayernweit – wir mobilisieren Teams schnell, planen effizient und führen Ihren Umzug mit gleicher Sorgfalt durch wie bei monatelanger Vorplanung.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Zap, title: "Schnelle Reaktion", desc: "Anfrage heute – Umzug in wenigen Tagen." },
                            { icon: Clock, title: "Flexible Zeiten", desc: "Auch Abend-, Nacht- und Wochenendtermine." },
                            { icon: Shield, title: "Gleiche Qualität", desc: "Keine Kompromisse bei Sicherheit und Sorgfalt." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50 text-center">
                                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Verwandte Leistungen</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/24h-umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">24h Umzug Bayern</Link>
                            <Link href={`/${lang}/notfall-umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Notfall-Umzug</Link>
                            <Link href={`/${lang}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Kurzfristigen Umzug anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Schnelle Reaktion, transparenter Festpreis. Jetzt anfragen!</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
