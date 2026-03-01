import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Users, MapPin, CheckCircle2, Baby, Shield } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: "Familienumzug Bayern | Stressfrei mit Kindern umziehen | FLOXANT",
        description: "Familienumzug in Bayern – kindgerecht, sorgfältig und durchgeplant. Regensburg, Nürnberg, München. Kinder-Umzugsbox inklusive. Jetzt Festpreisangebot anfordern!",
        alternates: {
            canonical: `https://floxant.de/${lang}/familienumzug-bayern`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://floxant.de/${l}/familienumzug-bayern`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function FamilienumzugBayern({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Familienumzug" }]} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <Users className="w-4 h-4" /><span>Familienumzug in Bayern</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Familienumzug in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Ein Umzug mit Familie ist eine besondere Herausforderung. FLOXANT plant und koordiniert Ihren Familienumzug so, dass alle Familienmitglieder – vom Kleinkind bis zum Teenager – den Übergang positiv erleben.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Umziehen mit Familie – mit System statt Chaos</h2>
                        <p>
                            Familien haben beim Umzug andere Bedürfnisse als Singles oder Paare. Das Volumen ist größer, die Logistik komplexer, und vor allem: Kinder brauchen Stabilität in einer Phase der Veränderung. FLOXANT hat sich auf genau diese Anforderungen spezialisiert. Wir planen Ihren Familienumzug so, dass der Ablauf für alle Beteiligten möglichst stressfrei ist.
                        </p>
                        <p>
                            Unser Team arbeitet von Regensburg und der Oberpfalz aus – mit Einsätzen in ganz Bayern. Ob innerhalb von München, von Nürnberg nach Augsburg oder vom ländlichen Oberbayern in die Stadt: Wir koordinieren Transport, Montage, Reinigung und bei Bedarf sogar die Kinderbetreuung am Umzugstag.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Baby, title: "Kinder-Umzugsbox", desc: "Optional: Altersgerechte Beschäftigungsbox für Kinder am Umzugstag. Macht den Übergang zum Abenteuer." },
                            { icon: Shield, title: "Vollversicherung", desc: "Spielzeug, Kindermöbel, Erinnerungsstücke – alles professionell verpackt und vollständig versichert." },
                            { icon: Users, title: "Familienfreundlich", desc: "Flexible Zeitfenster, leises Arbeiten und Rücksicht auf den Tagesrhythmus Ihrer Familie." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50 text-center">
                                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Was einen Familienumzug besonders macht</h2>
                        <p>
                            Kinder erleben einen Umzug emotional anders als Erwachsene. Das gewohnte Kinderzimmer verschwindet, Freunde bleiben zurück, die gesamte Routine ändert sich. FLOXANT nimmt darauf Rücksicht. Auf Wunsch wird das Kinderzimmer im neuen Zuhause als erstes eingerichtet, damit Ihr Kind sofort einen vertrauten Rückzugsort hat.
                        </p>
                        <p>
                            Darüber hinaus bieten wir unsere Signature „Kinder-Umzugsbox" an: eine liebevoll zusammengestellte Box mit Beschäftigungsmaterial, einem kleinen Erklärbuch zum Thema Umzug und einer persönlichen Überraschung für den ersten Tag im neuen Zimmer.
                        </p>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Verwandte Leistungen</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/seniorenumzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Seniorenumzug Bayern</Link>
                            <Link href={`/${lang}/signature/kinder-umzugsbox`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Kinder-Umzugsbox</Link>
                            <Link href={`/${lang}/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
                            <Link href={`/${lang}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Familienumzug in Bayern anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses Festpreisangebot – familienfreundlich und durchgeplant.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
