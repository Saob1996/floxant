import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { CheckCircle2, MapPin, Shield, Sparkles, Clock, ArrowRight } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: "Reinigung Bayern | Professionelle Endreinigung | FLOXANT",
        description: "Professionelle Reinigungsdienstleistungen in ganz Bayern. Endreinigung nach Vermieterstandards, Baureinigung & Büroreinigung. Regensburg, Nürnberg, München. Jetzt anfragen!",
        alternates: {
            canonical: `https://floxant.de/${lang}/reinigung-bayern`,
            languages: i18n.locales.reduce(
                (acc, l) => {
                    acc[l] = `https://floxant.de/${l}/reinigung-bayern`;
                    return acc;
                },
                {} as Record<string, string>
            ),
        },
    };
}

export default async function ReinigungBayern({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs
                lang={lang}
                items={[
                    { label: "Reinigung", href: `/${lang}/reinigung` },
                    { label: "Bayern" },
                ]}
            />

            {/* Hero */}
            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>Reinigungsservice in ganz Bayern</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Professionelle Reinigung in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Endreinigung, Baureinigung und Unterhaltsreinigung für Privat- und Gewerbekunden in ganz Bayern. FLOXANT arbeitet nach dokumentierten Standards – mit Fotodokumentation und Zufriedenheitsgarantie.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">

                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Reinigungsservice Bayern – Maßstäbe statt Kompromisse</h2>
                        <p>
                            Sauberkeit ist kein Nebenschauplatz – sie ist die Grundlage für einen geordneten Abschluss bei jedem Mietverhältnis und die Voraussetzung für einen guten ersten Eindruck bei einem Neubezug. FLOXANT bietet professionelle Reinigungsdienstleistungen in ganz Bayern an, die weit über das hinausgehen, was herkömmliche Reinigungsfirmen leisten.
                        </p>
                        <p>
                            Unser operativer Schwerpunkt liegt in Regensburg und der Oberpfalz, wo wir die Standards der lokalen Hausverwaltungen und Wohnungsbaugesellschaften bestens kennen. Von hier aus betreuen wir Kunden in München, Nürnberg, Augsburg und allen bayerischen Regionen. Jede Reinigung wird nach einer definierten Checkliste durchgeführt und mit Fotos dokumentiert – damit Sie bei der Wohnungsübergabe auf der sicheren Seite sind.
                        </p>
                    </div>

                    {/* Trust Signals */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Sparkles, title: "Vermieterstandards", desc: "Reinigung nach dokumentierter Checkliste, abgestimmt auf gängige Übergabeprotokolle." },
                            { icon: Shield, title: "Zufriedenheitsgarantie", desc: "Nachbesserung bei berechtigten Beanstandungen – kostenfrei innerhalb von 14 Tagen." },
                            { icon: Clock, title: "Termingerecht", desc: "Zuverlässige Einhaltung Ihres Übergabetermins. Auch kurzfristige Buchungen möglich." },
                            { icon: CheckCircle2, title: "Fotodokumentation", desc: "Jeder Raum wird nach der Reinigung dokumentiert. Ihr Nachweis für den Vermieter." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50 text-center">
                                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Services */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">Reinigungsleistungen im Detail</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <h3 className="text-lg font-bold mb-3">Endreinigung</h3>
                                <p className="text-sm text-muted-foreground">Vollständige Reinigung der Wohnung vor der Übergabe an den Vermieter. Böden, Fenster, Küche, Sanitäranlagen – alles wird systematisch nach Checkliste gereinigt.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <h3 className="text-lg font-bold mb-3">Baureinigung</h3>
                                <p className="text-sm text-muted-foreground">Nach Renovierung oder Umbau: Entfernung von Staub, Farbresten, Putzspritzern und Bauschutt. Professionelle Reinigung für sofortige Bezugsfertigkeit.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <h3 className="text-lg font-bold mb-3">Büroreinigung</h3>
                                <p className="text-sm text-muted-foreground">Einmalige oder regelmäßige Reinigung von Gewerbeflächen. Diskret außerhalb der Geschäftszeiten. Ideal nach Firmenumzügen oder bei Mieterwechsel.</p>
                            </div>
                        </div>
                    </div>

                    {/* Regional Sections */}
                    <div className="space-y-12">
                        <h2 className="text-3xl font-bold text-foreground">Reinigung in Ihrer Region</h2>

                        <div className="prose prose-lg max-w-none text-muted-foreground">
                            <h3 className="text-2xl font-bold text-foreground">Reinigung in Regensburg & Oberpfalz</h3>
                            <p>
                                Regensburg ist unser operatives Zentrum und der Standort, an dem wir die höchste Verfügbarkeit bieten. Unsere Teams kennen die Besonderheiten der lokalen Vermieter, Genossenschaften und Hausverwaltungen in der Oberpfalz. Egal ob Altbauwohnung in der historischen Altstadt, Studentenwohnung im Kasernenviertel oder Neubau im Stadtosten – wir wissen genau, welche Standards bei der Übergabe gelten.
                            </p>

                            <h3 className="text-2xl font-bold text-foreground">Reinigung in Nürnberg</h3>
                            <p>
                                In Nürnberg und der umliegenden Metropolregion (Fürth, Erlangen, Schwabach) sind wir regelmäßig für Endreinigungen und Baureinigungen im Einsatz. Die vielfältige Wohnungslandschaft der fränkischen Metropole – von großzügigen Altbauwohnungen bis zu modernen Neubauprojekten – wird von unserem Team mit der nötigen Erfahrung bedient.
                            </p>

                            <h3 className="text-2xl font-bold text-foreground">Reinigung in München</h3>
                            <p>
                                Die Ansprüche Münchner Vermieter an eine Endreinigung sind erfahrungsgemäß besonders hoch. FLOXANT erfüllt diese Standards routiniert und dokumentiert das Ergebnis lückenlos. So schützen Sie Ihre Kaution und vermeiden Nachforderungen.
                            </p>

                            <h3 className="text-2xl font-bold text-foreground">Reinigung in den Regionen um Feucht & Nürnberger Land</h3>
                            <p>
                                Im Markt Feucht und dem Nürnberger Land (Schwarzenbruck, Altdorf, Lauf a.d. Pegnitz) profitieren Sie von besonders kurzen Anfahrtszeiten und flexibler Terminvergabe. Ideal für kurzfristige Reinigungsaufträge bei Wohnungsübergaben.
                            </p>
                        </div>
                    </div>

                    {/* Einsatzgebiet Bayern */}
                    <div className="bg-muted/20 p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-6">Einsatzgebiet Bayern – Professionelle Reinigung vor Ort</h2>
                        <p className="text-muted-foreground mb-8">
                            Unser Reinigungsservice steht Ihnen in allen bayerischen Städten und Regionen zur Verfügung. Kontaktieren Sie uns für Ihr individuelles Reinigungsangebot.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { href: `/${lang}/reinigung-regensburg`, label: "Regensburg" },
                                { href: `/${lang}/umzug-nuernberg`, label: "Nürnberg" },
                                { href: `/${lang}/umzug-muenchen`, label: "München" },
                                { href: `/${lang}/umzug-augsburg`, label: "Augsburg" },
                            ].map((link) => (
                                <Link key={link.href} href={link.href} className="flex items-center gap-2 p-3 bg-background rounded-lg hover:shadow-md transition-all text-sm font-medium">
                                    <ArrowRight className="w-4 h-4 text-primary" /> {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Internal Links */}
                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Weitere Leistungen in Bayern</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/entruempelung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Entrümpelung Bayern</Link>
                            <Link href={`/${lang}/wohnungsaufloesung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Wohnungsauflösung Bayern</Link>
                            <Link href={`/${lang}/reinigung-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Reinigung Regensburg</Link>
                            <Link href={`/${lang}/service-area-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Einsatzgebiet Bayern</Link>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Reinigung in Bayern anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Transparentes Festpreisangebot mit Zufriedenheitsgarantie. Kurzfristig verfügbar in ganz Bayern.
                        </p>
                        <SmartBookingWizard dict={dict} />
                    </div>

                </div>
            </section>
        </main>
    );
}
