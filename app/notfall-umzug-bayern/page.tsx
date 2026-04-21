import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/get-dictionary";
import { type Locale } from "@/i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import { AlertTriangle, Phone, CheckCircle2, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
export async function generateMetadata(): Promise<Metadata> {
    const pageLocale: Locale = "de";
    const dict = await getDictionary("de");
    const content = dict.pages?.notfall_umzug_bayern || {};
    return generatePageSEO({
        pageLocale,
        path: "notfall-umzug-bayern",
        title: content.meta_title || "Notfall-Umzug Bayern | Sofort-Hilfe | FLOXANT",
        description: content.meta_desc || "Notfall-Umzug in Bayern bei Wasserschaden, Brand oder Räumungsklage.",
    });
}
export default async function NotfallUmzugBayern() {
    const pageLocale: Locale = "de";
    const dict = await getDictionary("de");
    const isDe = pageLocale === "de";
    const breadcrumbs = [
        { label: "Umzug Bayern", href: `/umzug-bayern` },
        { label: "Notfall-Umzug" }
    ];
    return (
        <main className="min-h-screen bg-background text-start font-sans">
            <Breadcrumbs lang="de" items={breadcrumbs} />
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
                                    href={`/24h-umzug-bayern`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all font-sans"
                                >
                                    24h Umzug Bayern
                                </Link>
                                <Link
                                    href={`/kurzfristiger-umzug-bayern`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all font-sans"
                                >
                                    Kurzfristiger Umzug
                                </Link>
                                <Link
                                    href={`/umzug-bayern`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all font-sans"
                                >
                                    Umzug Bayern
                                </Link>
                                <Link
                                    href={`/entruempelung-bayern`}
                                    className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all font-sans"
                                >
                                    Entrümpelung Bayern
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
                            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Notfall-Umzug anfragen</h2>
                            <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
                                Geben Sie uns die wichtigsten Details durch. Wir reagieren schnellstmöglich und erstellen eine erste belastbare Einschätzung.
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
