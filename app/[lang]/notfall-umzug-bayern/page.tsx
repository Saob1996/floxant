import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AlertTriangle, Phone, CheckCircle2, Shield } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: "Notfall-Umzug Bayern | Sofort-Hilfe | FLOXANT",
        description: "Notfall-Umzug in Bayern bei Wasserschaden, Brand, Räumungsklage oder familiären Notfällen. FLOXANT – sofortige Hilfe, 24/7 erreichbar. Regensburg, Nürnberg, München.",
        alternates: {
            canonical: `https://floxant.de/${lang}/notfall-umzug-bayern`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://floxant.de/${l}/notfall-umzug-bayern`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function NotfallUmzugBayern({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: `/${lang}/umzug-bayern` }, { label: "Notfall-Umzug" }]} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-medium">
                        <AlertTriangle className="w-4 h-4" /><span>Notfall-Service</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Notfall-Umzug in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Wasserschaden, Brand, Räumungsklage oder familiäre Krise – wenn ein sofortiger Umzug nötig ist, steht FLOXANT bereit. 24/7 erreichbar, schnell einsatzbereit, professionell wie immer.
                    </p>
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                        <Phone className="w-5 h-5" /> +49 1577 1105087
                    </div>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Wenn jede Stunde zählt</h2>
                        <p>Notfälle lassen sich nicht planen. Ein Rohrbruch, ein Brand in der Nachbarwohnung, eine Räumungsklage oder ein plötzlicher familiärer Notfall – in diesen Situationen brauchen Sie einen Umzugspartner, der sofort handelt. FLOXANT bietet einen Notfall-Umzugsservice für ganz Bayern mit Bereitschaftsteams in Regensburg.</p>
                        <p>Wir verstehen, dass Notfallsituationen extrem belastend sind. Deshalb übernehmen wir nicht nur den physischen Transport, sondern koordinieren bei Bedarf auch Zwischenlagerung, Notunterkünfte und die Kontaktaufnahme mit Versicherungen.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Notfall-Szenarien</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Wasserschaden / Brand", desc: "Sofortige Bergung und Sicherung Ihres Inventars. Zwischenlagerung bis zur Klärung mit der Versicherung." },
                                { title: "Räumungsklage", desc: "Schnelle und strukturierte Räumung unter Einhaltung aller rechtlichen Fristen." },
                                { title: "Familiäre Notfälle", desc: "Diskrete und einfühlsame Abwicklung bei Trennungssituationen oder Todesfällen." },
                                { title: "Akute Wohnungsprobleme", desc: "Schimmel, Unbewohnbarkeit oder Sicherheitsmängel – wir helfen beim sofortigen Auszug." },
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Verwandte Leistungen</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/24h-umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">24h Umzug Bayern</Link>
                            <Link href={`/${lang}/kurzfristiger-umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Kurzfristiger Umzug</Link>
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/entruempelung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Bayern</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Notfall-Umzug jetzt anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Rufen Sie uns an oder senden Sie eine Anfrage. Wir reagieren sofort.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
