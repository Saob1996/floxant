import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Truck, ShieldCheck, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: "Umzugsfirma Bayern | FLOXANT – Umzug Bayern & Deutschland",
    description: "Professionelle Umzugsfirma für Bayern und deutschlandweite Fernumzüge. Firmensitz in Düsseldorf, regelmäßig in Bayern aktiv. Jetzt Angebot anfordern.",
};

export default async function UmzugBayern({ params }: { params: Promise<{ lang: string }> }) {
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
                        <span>Bayern & Deutschlandweit</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Professionelle Umzüge in <span className="text-primary">Bayern</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Ihr Partner für stressfreie Wohnungswechsel. FLOXANT koordiniert Ihren Umzug mit Präzision und Sorgfalt – von Bayern in jede Region Deutschlands.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">

                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Ihr Umzug in Bayern – Strukturiert und Sicher</h2>
                        <p>
                            Ein Umzug ist weit mehr als der Transport von Möbeln von A nach B. Er markiert einen neuen Lebensabschnitt, eine Veränderung, die oft mit viel Organisation und emotionalem Aufwand verbunden ist. Bei FLOXANT verstehen wir diese Herausforderung genau. Unser Anspruch ist es, Ihnen nicht nur schwere Kisten, sondern auch die Last der Planung abzunehmen.
                        </p>
                        <p className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic">
                            <strong>Wichtiger Hinweis:</strong> FLOXANT hat seinen juristischen Firmensitz in Düsseldorf. Unser operatives Team ist jedoch regelmäßig für Umzüge in ganz Bayern im Einsatz. Ob München, Nürnberg oder Augsburg – wir sind vor Ort vernetzt und führen Ihren Auftrag mit höchster Zuverlässigkeit aus. Zusätzlich organisieren wir routiniert Fernumzüge von Bayern in alle Regionen Nordrhein-Westfalens und ganz Deutschlands.
                        </p>
                        <p>
                            Unsere Philosophie basiert auf architektonischer Ordnung. Wir überlassen nichts dem Zufall. Jeder Handgriff sitzt, jede Phase des Umzugs ist durchgeplant. Das gibt Ihnen die Sicherheit, dass Ihr Hab und Gut in den besten Händen ist.
                        </p>
                    </div>

                    {/* Services Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">Unsere Leistungen in Bayern</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-2xl bg-muted/10 border border-border/50">
                                <Truck className="w-10 h-10 text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-4">Privatumzüge</h3>
                                <p className="text-muted-foreground mb-6">
                                    Ob Single-Appartement oder Familienhaus – wir behandeln Ihren Privatumzug mit Diskretion und Respekt. Unsere Teams sind geschult im Umgang mit sensiblen Gegenständen und sorgen dafür, dass Sie sich in Ihrem neuen Zuhause sofort wohlfühlen.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Demontage & Montage</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Ein- und Auspackservice</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Schutz empfindlicher Böden</li>
                                </ul>
                            </div>

                            <div className="p-8 rounded-2xl bg-muted/10 border border-border/50">
                                <Clock className="w-10 h-10 text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-4">Fernumzüge ab Bayern</h3>
                                <p className="text-muted-foreground mb-6">
                                    Sie ziehen von Bayern nach NRW, Hamburg oder Berlin? Fernumzüge sind unsere Spezialität. Durch unseren Sitz in Düsseldorf und unsere regelmäßigen Touren in den Süden können wir logistisch effiziente Lösungen für Langstrecken anbieten.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Bundesweite Logistik</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Festpreis-Garantie</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Termintreue Zustellung</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Content: Why Floxant */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Warum FLOXANT für Ihren Umzug wählen?</h2>
                        <p>
                            Der Markt für Umzugsdienstleistungen ist groß und oft unübersichtlich. FLOXANT unterscheidet sich durch einen Ansatz, der Qualität und Transparenz in den Mittelpunkt stellt. Wir sind keine reine Transportfirma, sondern ein Full-Service-Dienstleister für Ihren Wohnungswechsel.
                        </p>
                        <h3>Transparente Preisgestaltung</h3>
                        <p>
                            Versteckte Kosten und nachträgliche Aufschläge gibt es bei uns nicht. Nach einer detaillierten Bestandsaufnahme – die wir gerne auch digital per Videochat durchführen – erhalten Sie ein verbindliches Festpreisangebot. Darin sind alle vereinbarten Leistungen inkludiert: vom Verpackungsmaterial bis zur Versicherung, von der Anfahrt bis zur besenreinen Übergabe.
                        </p>
                        <h3>Sicherheit und Versicherung</h3>
                        <p>
                            Trotz größter Sorgfalt kann im Eifer des Gefechts einmal etwas passieren. Als professionelles Unternehmen sind wir selbstverständlich umfassend versichert. Eine Haftpflicht- und Transportversicherung schützt Ihr Eigentum während des gesamten Prozesses. Sollte ein Schaden entstehen, kümmern wir uns um eine unbürokratische Regulierung.
                        </p>
                        <h3>Fokus auf Nachhaltigkeit</h3>
                        <p>
                            Wir versuchen, unseren ökologischen Fußabdruck so gering wie möglich zu halten. Das bedeutet: effiziente Routenplanung zur Vermeidung von Leerfahrten, Einsatz von wiederverwendbaren Verpackungsmaterialien und fachgerechte Trennung bei Entrümpelungen. Gerade bei Fernumzügen kombinieren wir Ladungen intelligent, um CO2 zu sparen.
                        </p>
                    </div>

                    {/* Regional Expertise */}
                    <div className="bg-muted/20 p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-6">Unsere Einsatzgebiete in der Region</h2>
                        <p className="text-muted-foreground mb-8">
                            Wir sind in allen größeren Städten und Regionen Bayerns aktiv. Unsere Teams kennen die lokalen Gegebenheiten, von den engen Gassen in Regensburg bis zu den Parkplatzsituationen in München.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href="/umzug-muenchen" className="flex items-center gap-2 p-3 bg-background rounded-lg hover:shadow-md transition-all text-sm font-medium">
                                <ArrowRight className="w-4 h-4 text-primary" /> München
                            </Link>
                            <Link href="/umzug-nuernberg" className="flex items-center gap-2 p-3 bg-background rounded-lg hover:shadow-md transition-all text-sm font-medium">
                                <ArrowRight className="w-4 h-4 text-primary" /> Nürnberg
                            </Link>
                            <Link href="/umzug-augsburg" className="flex items-center gap-2 p-3 bg-background rounded-lg hover:shadow-md transition-all text-sm font-medium">
                                <ArrowRight className="w-4 h-4 text-primary" /> Augsburg
                            </Link>
                            <Link href="/umzug-regensburg" className="flex items-center gap-2 p-3 bg-background rounded-lg hover:shadow-md transition-all text-sm font-medium">
                                <ArrowRight className="w-4 h-4 text-primary" /> Regensburg
                            </Link>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center py-10 bg-primary/5 rounded-3xl border border-primary/10">
                        <h2 className="text-3xl font-bold mb-4">Bereit für den Neustart?</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Fordern Sie jetzt Ihr unverbindliches Festpreisangebot an. Wir beraten Sie gerne persönlich zu Ihrem Umzugsvorhaben in Bayern oder deutschlandweit.
                        </p>
                        <SmartBookingWizard dict={dict} />
                    </div>

                </div>
            </section>

            <Footer lang={lang} dic={dict} />
        </main>
    );
}
