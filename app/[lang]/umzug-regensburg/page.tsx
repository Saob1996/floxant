import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Milestone, Layers, Award } from "lucide-react";

export const metadata: Metadata = {
    title: "Umzugsfirma Regensburg | FLOXANT – Umzug Bayern & Deutschland",
    description: "Professionelle Umzüge in Regensburg und Umgebung. Zuverlässig, schnell und sicher. Ihr Partner für lokale und deutschlandweite Umzüge.",
};

export default async function UmzugRegensburg({ params }: { params: Promise<{ lang: string }> }) {
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
                        <span>Regensburg & Oberpfalz</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Ihr neuer Start in <span className="text-primary">Regensburg</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Mit FLOXANT gelingt der Umzug in die UNESCO-Welterbestadt entspannt und sicher. Erfahrung trifft auf moderne Logistik.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">

                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Umziehen im Herzen der Oberpfalz</h2>
                        <p>
                            Regensburg begeistert mit seinen mittelalterlichen Gassen und der lebendigen Atmosphäre. Doch was für Touristen charmant ist, kann beim Umzug zur Herausforderung werden. Enge Zufahrten, Fußgängerzonen und denkmalgeschützte Bauten erfordern Feingefühl und genaue Planung. FLOXANT bringt die nötige Erfahrung mit, um auch in schwierigen Lagen einen reibungslosen Ablauf zu garantieren.
                        </p>
                        <p>
                            Wir kümmern uns nicht nur um den Transport, sondern auch um die behördlichen Genehmigungen für Zufahrten in der Altstadt. So vermeiden Sie Bußgelder und Stress am Umzugstag.
                        </p>
                        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic">
                            <h4 className="text-foreground font-semibold mb-2">Unser Standort-Konzept</h4>
                            <p className="m-0 text-sm">
                                FLOXANT wird zentral aus Düsseldorf (Firmensitz) gesteuert, agiert jedoch mit hoher Frequenz in Bayern. Unsere Teams sind regelmäßig in Regensburg und Umgebung im Einsatz. Diese Struktur erlaubt es uns, Ihnen lokale Expertise zu bieten und gleichzeitig die logistischen Vorteile eines deutschlandweit agierenden Unternehmens für Fernumzüge zu nutzen.
                            </p>
                        </div>
                    </div>

                    {/* Services Section specifically for Regensburg */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">Unsere Kompetenzen für Regensburg</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Milestone className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">Altstadt-Logistik</h3>
                                <p className="text-sm text-muted-foreground">Spezialisiert auf enge Gassen und schwierige Anfahrten.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Layers className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">Sorgfältige Verpackung</h3>
                                <p className="text-sm text-muted-foreground">Hochwertige Materialien zum Schutz Ihres Inventars.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Award className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">Festpreis</h3>
                                <p className="text-sm text-muted-foreground">Verbindliche Angebote ohne versteckte Kosten.</p>
                            </div>
                        </div>
                    </div>

                    {/* Content: Regensburg specifics */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Mehr als nur Kisten schleppen</h2>
                        <p>
                            Ein Umzug ist ein komplexes Projekt. Wir bieten Ihnen daher einen modularen Service an. Möchten Sie selbst packen und wir übernehmen nur den Transport? Oder wünschen Sie das Rundum-Sorglos-Paket, bei dem Sie am Abend nur noch die Schlüssel für das fertig eingerichtete neue Zuhause übernehmen müssen? Alles ist machbar.
                        </p>
                        <h3>Umzug von Bayern in ganz Deutschland</h3>
                        <p>
                            Regensburg ist ein bedeutender Wirtschaftsstandort, was oft berufliche Wechsel mit sich bringt. Wenn Ihr Weg Sie von hier in eine andere Metropole Deutschlands führt, sind wir an Ihrer Seite. Fernumzüge koordinieren wir mit militärischer Präzision. Wir takten Beladung und Entladung so, dass sie perfekt in Ihren Zeitplan passen. Kein Warten auf den LKW, keine Ungewissheit.
                        </p>
                        <h3>Service für Studenten und Senioren</h3>
                        <p>
                            Regensburg ist Universitätsstadt. Für Studenten bieten wir flexible und kostengünstige Lösungen ("Bordsteinkante zu Bordsteinkante") an. Gleichzeitig betreuen wir Senioren mit besonderer Sensibilität und Geduld beim Wechsel in eine altersgerechte Wohnung oder Residenz. Unser Team nimmt Rücksicht auf die jeweilige Lebenssituation und passt den Service entsprechend an.
                        </p>
                    </div>

                    {/* Links back to other regions */}
                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Weitere Einsatzgebiete</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/umzug-nuernberg" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                                <ArrowRight className="w-3 h-3" /> Umzug Nürnberg
                            </Link>
                            <Link href="/umzug-muenchen" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                                <ArrowRight className="w-3 h-3" /> Umzug München
                            </Link>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Ihr Umzug in Regensburg</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Kontaktieren Sie uns noch heute. Wir besprechen Ihre Wünsche und erstellen ein Angebot, das passt.
                        </p>
                        <SmartBookingWizard dict={dict} />
                    </div>

                </div>
            </section>

            <Footer lang={lang} dic={dict} />
        </main>
    );
}
