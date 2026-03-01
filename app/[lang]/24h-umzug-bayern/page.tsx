import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Clock, MapPin, Shield, Truck, CheckCircle2 } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: "24h Umzug Bayern | Notfall-Umzugsservice | FLOXANT",
        description: "24-Stunden-Umzugsservice in Bayern. Kurzfristiger Umzug auch abends, nachts und am Wochenende. Regensburg, Nürnberg, München. Sofort verfügbar!",
        alternates: {
            canonical: `https://floxant.de/${lang}/24h-umzug-bayern`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://floxant.de/${l}/24h-umzug-bayern`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function UmzugBayern24h({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "24h Umzugsservice" }]} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <Clock className="w-4 h-4" /><span>Rund um die Uhr verfügbar</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        24h Umzugsservice in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Manchmal muss es schnell gehen. FLOXANT steht Ihnen rund um die Uhr zur Verfügung – auch abends, nachts und am Wochenende. Professioneller Umzugsservice ohne zeitliche Einschränkung.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Ihr Umzug wartet nicht – wir auch nicht</h2>
                        <p>
                            Kurzfristige Kündigungen, berufliche Versetzungen, familiäre Notfälle oder plötzliche Wohnungswechsel – es gibt zahlreiche Situationen, in denen ein Umzug nicht bis zu den regulären Geschäftszeiten warten kann. Der 24h Umzugsservice von FLOXANT löst genau dieses Problem: Wir sind in ganz Bayern einsatzbereit, wann immer Sie uns brauchen.
                        </p>
                        <p>
                            Unser Bereitschaftsteam in Regensburg und der Oberpfalz kann innerhalb kürzester Zeit mobilisiert werden. Auch in Nürnberg, München, Augsburg und den umliegenden Regionen garantieren wir schnelle Verfügbarkeit. Die Qualität bleibt dabei identisch zu unseren regulären Umzügen: professionell verpackt, sicher transportiert und termingerecht geliefert.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Clock, title: "Keine Wartezeiten", desc: "Einsatz auch abends, nachts und an Feiertagen. Keine Aufschläge für Wochenendtermine bei regulärer Buchung." },
                            { icon: Truck, title: "Sofort einsatzbereit", desc: "Bereitschaftsteams in Regensburg und Bayern. Mobilisierung innerhalb weniger Stunden möglich." },
                            { icon: Shield, title: "Volle Versicherung", desc: "Auch bei Notfalleinsätzen: Ihr Inventar ist vollständig versichert und professionell geschützt." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50 text-center">
                                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Wann ist der 24h-Service sinnvoll?</h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span>Kurzfristige Kündigung mit engem Auszugstermin</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span>Berufliche Versetzung mit sofortigem Umzugsbedarf</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span>Familiäre Notfälle oder Trennungssituationen</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span>Gewerbliche Umzüge außerhalb der Geschäftszeiten</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span>Wochenendeand Feiertagsumzüge ohne Zuschläge</span></li>
                        </ul>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Verwandte Leistungen</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/notfall-umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Notfall-Umzug Bayern</Link>
                            <Link href={`/${lang}/kurzfristiger-umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Kurzfristiger Umzug</Link>
                            <Link href={`/${lang}/signature/24h-umzugsservice`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">24h Signature Service</Link>
                            <Link href={`/${lang}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">24h Umzug jetzt anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kontaktieren Sie uns jetzt – wir sind rund um die Uhr für Sie erreichbar.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
