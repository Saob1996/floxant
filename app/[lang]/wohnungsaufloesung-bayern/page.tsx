import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { CheckCircle2, MapPin, Shield, Heart, Clock, ArrowRight, Home } from "lucide-react";

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
        title: "Wohnungsauflösung Bayern | Haushaltsauflösung | FLOXANT",
        description: "Professionelle Wohnungsauflösung in Bayern – Regensburg, Nürnberg, München. Nachlassräumung, Seniorenumzüge, besenreine Übergabe. Diskret, versichert & kurzfristig verfügbar.",
        alternates: {
            canonical: `https://floxant.de/${lang}/wohnungsaufloesung-bayern`,
            languages: i18n.locales.reduce(
                (acc, l) => {
                    acc[l] = `https://floxant.de/${l}/wohnungsaufloesung-bayern`;
                    return acc;
                },
                {} as Record<string, string>
            ),
        },
    };
}

export default async function WohnungsaufloesungBayern({
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
                    { label: "Entrümpelung", href: `/${lang}/entruempelung` },
                    { label: "Wohnungsauflösung Bayern" },
                ]}
            />

            {/* Hero */}
            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>Wohnungsauflösung in ganz Bayern</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Wohnungsauflösung in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Wenn ein Haushalt aufgelöst werden muss, brauchen Sie einen Partner mit Erfahrung, Feingefühl und der nötigen Infrastruktur. FLOXANT übernimmt die vollständige Wohnungsauflösung in ganz Bayern – diskret, versichert und termingerecht.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">

                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Haushaltsauflösung – behutsam und professionell</h2>
                        <p>
                            Eine Wohnungsauflösung ist selten ein einfacher Vorgang. Ob nach einem Todesfall, bei einem Umzug ins Pflegeheim, nach einer Trennung oder bei einer Auswanderung – die Gründe sind so vielfältig wie die Emotionen, die damit verbunden sind. FLOXANT versteht diese Situationen und geht mit der gebotenen Sensibilität vor.
                        </p>
                        <p>
                            Unser Team übernimmt den gesamten Prozess: von der Sichtung und Bewertung des Inventars über die Sortierung und fachgerechte Entsorgung bis hin zur besenreinen Übergabe des Objekts an den Vermieter oder Makler. Wertvolle Gegenstände werden gesichert, brauchbare Möbel und Kleidung können auf Wunsch an soziale Einrichtungen in der Region gespendet werden.
                        </p>
                        <p>
                            Unser operativer Schwerpunkt liegt in Regensburg und der Oberpfalz. Von hier betreuen wir Kunden in München, Nürnberg, Augsburg, Feucht und allen weiteren bayerischen Regionen. Wir sind kurzfristig verfügbar und bieten transparente Festpreise ohne versteckte Kosten.
                        </p>
                    </div>

                    {/* Trust Signals */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Heart, title: "Sensibel & diskret", desc: "Besonders einfühlsame Abwicklung bei Nachlassräumungen und emotionalen Situationen." },
                            { icon: Shield, title: "Voll versichert", desc: "Umfassender Versicherungsschutz für alle Arbeiten. Ihr Eigentum ist geschützt." },
                            { icon: Home, title: "Besenrein", desc: "Übergabefertiger Zustand – inklusive Reinigung und vollständiger Räumung." },
                            { icon: Clock, title: "Kurzfristig möglich", desc: "Schnelle Einsatzbereitschaft bei dringenden Auflösungen. Flexible Terminvergabe." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50 text-center">
                                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Process */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">Unser Ablauf bei der Wohnungsauflösung</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { step: "01", title: "Begehung & Bestandsaufnahme", desc: "Gemeinsame Besichtigung – vor Ort oder per Video-Call. Wir erfassen den Umfang und besprechen Ihre Wünsche: Was bleibt? Was wird entsorgt? Was gespendet?" },
                                { step: "02", title: "Transparentes Angebot", desc: "Sie erhalten ein verbindliches Festpreisangebot. Alle Leistungen sind inklusive: Sortierung, Entsorgung, Reinigung, Abtransport." },
                                { step: "03", title: "Durchführung", desc: "Unser geschultes Team räumt systematisch. Wertgegenstände werden gesichert, Wertstoffe getrennt, Müll fachgerecht entsorgt." },
                                { step: "04", title: "Besenreine Übergabe", desc: "Das Objekt wird gereinigt und übergabebereit hinterlassen. Entsorgungsnachweise werden auf Wunsch bereitgestellt." },
                            ].map((item, i) => (
                                <div key={i} className="relative p-6 rounded-2xl border border-border/50 bg-background">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm">{item.step}</span>
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Regional Sections */}
                    <div className="space-y-12">
                        <h2 className="text-3xl font-bold text-foreground">Wohnungsauflösung in Ihrer Region</h2>
                        <div className="prose prose-lg max-w-none text-muted-foreground">
                            <h3 className="text-2xl font-bold text-foreground">Regensburg & Oberpfalz</h3>
                            <p>
                                Als unser Haupteinsatzgebiet bieten wir in Regensburg und der gesamten Oberpfalz die schnellsten Reaktionszeiten. Wir arbeiten eng mit lokalen Entsorgungspartnern, sozialen Einrichtungen und Hausverwaltungen zusammen.
                            </p>

                            <h3 className="text-2xl font-bold text-foreground">Nürnberg & Metropolregion</h3>
                            <p>
                                Wohnungsauflösungen in Nürnberg, Fürth, Erlangen und dem Nürnberger Land inklusive Feucht und Schwarzenbruck. Unser Team passt die Vorgehensweise an die jeweilige Wohnsituation an – vom Altbau bis zum Hochhaus.
                            </p>

                            <h3 className="text-2xl font-bold text-foreground">München & Oberbayern</h3>
                            <p>
                                Auch in München und dem oberbayerischen Raum führen wir Wohnungsauflösungen durch. Die Besonderheiten des Münchner Immobilienmarktes – strenge Übergabestandards, Parkplatzmangel, Aufzugskoordination – kennen wir aus langjähriger Erfahrung.
                            </p>
                        </div>
                    </div>

                    {/* Einsatzgebiet */}
                    <div className="bg-muted/20 p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-6">Einsatzgebiet Bayern</h2>
                        <p className="text-muted-foreground mb-8">
                            FLOXANT führt Wohnungsauflösungen in allen bayerischen Regionen durch. Kontaktieren Sie uns für ein individuelles Angebot.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { href: `/${lang}/entruempelung-regensburg`, label: "Regensburg" },
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
                            <Link href={`/${lang}/reinigung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Reinigung Bayern</Link>
                            <Link href={`/${lang}/seniorenumzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Seniorenumzug Bayern</Link>
                            <Link href={`/${lang}/service-area-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Einsatzgebiet Bayern</Link>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Wohnungsauflösung in Bayern anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Kostenlose Beratung und transparentes Festpreisangebot. Diskret und einfühlsam – in ganz Bayern.
                        </p>
                        <SmartBookingWizard dict={dict} />
                    </div>

                </div>
            </section>
        </main>
    );
}
