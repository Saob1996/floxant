import { Header } from "@/components/Header";
import dynamic from "next/dynamic";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);
import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Truck, Leaf, Package } from "lucide-react";

export const metadata: Metadata = {
    title: "Umzugsfirma Augsburg | FLOXANT – Umzug Bayern & Deutschland",
    description: "Zuverlässiger Umzugsservice in Augsburg. Von der Planung bis zur Montage. Stressfrei umziehen mit FLOXANT – Bayernweit und Deutschlandweit.",
};

export default async function UmzugAugsburg({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={dict.nav} />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>Augsburg & Schwaben</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Entspannter Umzug in <span className="text-primary">Augsburg</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Wir bringen Sie in Ihr neues Zuhause. Pünktlich, sauber und zu fairen Preisen. Ihr Partner für Augsburg und Fernumzüge.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">

                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Augsburg – Eine Stadt im Wandel</h2>
                        <p>
                            Als eine der ältesten Städte Deutschlands bietet Augsburg eine hohe Lebensqualität. Wer hierher zieht oder innerhalb der Stadt wechselt, schätzt die Verbindung aus Tradition und Moderne. Ein Umzug in Augsburg erfordert jedoch oft gute Nerven und starke Arme. FLOXANT nimmt Ihnen diese Last ab.
                        </p>
                        <p>
                            Wir planen, verpacken und transportieren Ihr Hab und Gut mit höchster Sorgfalt. Egal ob Sie ins Textilviertel, nach Lechhausen oder Göggingen ziehen – unser Team navigiert sicher durch die Fuggerstadt.
                        </p>
                        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic">
                            <h4 className="text-foreground font-semibold mb-2">Offenheit und Transparenz</h4>
                            <p className="m-0 text-sm">
                                Unser Hauptsitz befindet sich in Düsseldorf, doch unsere operative Reichweite erstreckt sich fest über Bayern. Wir sind regelmäßig für Kunden in Augsburg tätig und kennen die Region bestens. Diese überregionale Aufstellung ist Ihr Vorteil bei Fernumzügen: Wir verbinden Augsburg effizient mit dem Rest der Republik, ohne teure Subunternehmer-Strukturen.
                            </p>
                        </div>
                    </div>

                    {/* Services Section specifically for Augsburg */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">Unsere Umzugsleistungen für Augsburg</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-6 bg-muted/10 rounded-2xl border border-border/50">
                                <Leaf className="w-10 h-10 text-green-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2">Nachhaltigkeit im Fokus</h3>
                                <p className="text-muted-foreground">
                                    Wir setzen auf wiederverwendbare Verpackungen und effiziente Routenplanung, um Ihren Umzug so umweltfreundlich wie möglich zu gestalten.
                                </p>
                            </div>
                            <div className="p-6 bg-muted/10 rounded-2xl border border-border/50">
                                <Package className="w-10 h-10 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-2">Full-Service Paket</h3>
                                <p className="text-muted-foreground">
                                    Vom Einpacken des Geschirrs bis zum Aufbau der Schrankwand. Buchen Sie genau die Leistungen, die Sie brauchen.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content: Augsburg specifics */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Qualität, die überzeugt</h2>
                        <p>
                            Ein Umzug ist Vertrauenssache. Sie lassen fremde Menschen in Ihre Privatsphäre und vertrauen ihnen Ihre persönlichen Werte an. Wir bei FLOXANT sind uns dieser Verantwortung bewusst. Diskretion, Höflichkeit und Sauberkeit sind für unsere Mitarbeiter keine leeren Worthülsen, sondern gelebter Standard.
                        </p>
                        <h3>Umzug von Bayern in ganz Deutschland</h3>
                        <p>
                            Zieht es Sie beruflich weg aus Augsburg? Wir begleiten Sie auf diesem Weg. Unsere Fernumzüge sind legendär für ihre Zuverlässigkeit. Wir garantieren Ihnen feste Liefertermine, damit Sie in Ihrer neuen Heimatstadt – sei es Köln, Hamburg oder Dresden – sofort planen können. Keine wochenlangen Wartezeiten auf Beiladungen, keine unklaren Ankunftsfenster.
                        </p>
                        <h3>Transparenz bei den Kosten</h3>
                        <p>
                            Gerade bei Umzügen innerhalb von Augsburg oder ins Umland bieten wir attraktive Pauschalpreise an. Nach einer kurzen Besichtigung (gerne auch via Video) erhalten Sie ein Angebot, auf das Sie sich verlassen können.
                        </p>
                        <p>
                            Auch schwierige Bedingungen schrecken uns nicht ab. Unsere Möbelaufzüge kommen zum Einsatz, wenn das Treppenhaus zu eng ist. Schwere Klaviere oder Tresore transportieren wir mit spezialisiertem Equipment und Know-how.
                        </p>
                    </div>

                    {/* Links back to other regions */}
                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Regionale Anbindung</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/umzug-muenchen" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                                <ArrowRight className="w-3 h-3" /> Umzug München
                            </Link>
                            <Link href="/umzug-bayern" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                                <ArrowRight className="w-3 h-3" /> Alle Standorte
                            </Link>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Angebot für Augsburg anfordern</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Wir erstellen Ihnen gerne ein kostenloses und unverbindliches Angebot für Ihren Umzug. Profitieren Sie von unserer Erfahrung.
                        </p>
                        <SmartBookingWizard dict={dict} />
                    </div>

                </div>
            </section>

        </main>
    );
}
