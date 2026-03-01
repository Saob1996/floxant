import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Heart, MapPin, CheckCircle2, Shield, Clock } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: "Seniorenumzug Bayern | Einfühlsam & Professionell | FLOXANT",
        description: "Seniorenumzug in Bayern – mit Geduld, Respekt und professioneller Planung. Wechsel ins Pflegeheim, altersgerechte Wohnung oder Seniorenresidenz. FLOXANT begleitet Sie.",
        alternates: {
            canonical: `https://floxant.de/${lang}/seniorenumzug-bayern`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://floxant.de/${l}/seniorenumzug-bayern`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function SeniorenumzugBayern({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Seniorenumzug" }]} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <Heart className="w-4 h-4" /><span>Seniorenumzug in Bayern</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Seniorenumzug in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Ein Umzug im Alter erfordert besonderes Verständnis. FLOXANT begleitet Senioren und ihre Angehörigen mit Geduld, Respekt und einem durchdachten Ablauf durch jeden Schritt des Wohnungswechsels.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Umziehen im Alter – mit Würde und Unterstützung</h2>
                        <p>
                            Der Wechsel aus dem langjährigen Zuhause in eine kleinere Wohnung, ein Pflegeheim oder eine Seniorenresidenz ist einer der emotionalsten Umzüge überhaupt. Jahrzehnte an Erinnerungen, Gewohnheiten und Vertrautheit müssen in einen neuen Rahmen überführt werden. Das erfordert weit mehr als logistisches Geschick – es erfordert Empathie.
                        </p>
                        <p>
                            FLOXANT hat umfangreiche Erfahrung mit Seniorenumzügen in ganz Bayern. Unser Team nimmt sich die Zeit, die es braucht. Wir hören zu, beraten bei der Auswahl der Gegenstände, die mitgenommen werden sollen, und sorgen dafür, dass das neue Zuhause so eingerichtet wird, dass es sich vertraut anfühlt.
                        </p>
                        <p>
                            Von unserem operativen Standort in Regensburg betreuen wir Senioren und ihre Familien in der gesamten Oberpfalz, in Nürnberg, München, Augsburg und allen bayerischen Regionen. Wir arbeiten eng mit Pflegeeinrichtungen und Angehörigen zusammen, um den Übergang so sanft wie möglich zu gestalten.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Heart, title: "Einfühlsam", desc: "Respektvoller Umgang mit persönlichen Gegenständen und Erinnerungsstücken. Geduld ist selbstverständlich." },
                            { icon: Shield, title: "Versichert", desc: "Vollständiger Versicherungsschutz für alle transportierten Gegenstände – auch für antike Möbel." },
                            { icon: Clock, title: "Flexible Zeiten", desc: "Umzug in Ihrem Tempo. Kein Zeitdruck, keine Hektik. Wir passen uns Ihrem Rhythmus an." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50 text-center">
                                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Unser Service für Senioren</h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span>Beratung bei der Auswahl: Was kommt mit, was wird aufbewahrt, was gespendet?</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span>Sorgfältiges Verpacken empfindlicher und wertvoller Gegenstände</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span>Einrichtung des neuen Zuhauses nach Ihren Wünschen</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span>Koordination mit Pflegeheim oder Residenz</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span>Endreinigung der alten Wohnung inklusive</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span>Optional: Wohnungsauflösung der verbleibenden Gegenstände</span></li>
                        </ul>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Verwandte Leistungen</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/wohnungsaufloesung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Wohnungsauflösung Bayern</Link>
                            <Link href={`/${lang}/familienumzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Familienumzug Bayern</Link>
                            <Link href={`/${lang}/reinigung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Reinigung Bayern</Link>
                            <Link href={`/${lang}/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Seniorenumzug in Bayern anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenlose Beratung – einfühlsam und unverbindlich. Für Sie und Ihre Angehörigen.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
