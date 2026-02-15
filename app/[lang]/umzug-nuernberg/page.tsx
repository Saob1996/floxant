import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Truck, History, Calculator } from "lucide-react";

export const metadata: Metadata = {
    title: "Umzugsfirma Nürnberg | FLOXANT – Umzug Bayern & Deutschland",
    description: "Ihr Umzug in Nürnberg mit FLOXANT. Professionell, diskret und transparent. Fernumzüge deutschlandweit. Jetzt Festpreis-Angebot sichern.",
};

export default async function UmzugNuernberg({ params }: { params: Promise<{ lang: string }> }) {
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
                        <span>Nürnberg & Metropolregion</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Sorgloser Umzug in <span className="text-primary">Nürnberg</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Ob Altstadt oder Außenbezirk – wir bringen Sie sicher in Ihr neues Zuhause. Kompetent, zuverlässig und mit Festpreis.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">

                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Wohnungswechsel in der Frankenmetropole</h2>
                        <p>
                            Nürnberg verbindet Geschichte mit Moderne, enge Gassen unter der Burg mit weitläufigen Wohngebieten. Ein Umzug hier verlangt Ortskenntnis und eine solide Logistik. Als erfahrener Umzugsdienstleister kennen wir die Herausforderungen, die ein Standortwechsel in dieser historischen Stadt mit sich bringt.
                        </p>
                        <p>
                            Wir bei FLOXANT sehen uns nicht nur als Möbelpacker, sondern als Ihre Partner für einen reibungslosen Übergang. Wir planen den Ablauf so, dass Sie sich um nichts kümmern müssen. Parkverbotszonen, Etagenlogistik oder der sichere Transport von Antiquitäten – wir haben die Lösungen.
                        </p>
                        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic">
                            <h4 className="text-foreground font-semibold mb-2">Transparenz zum Standort</h4>
                            <p className="m-0 text-sm">
                                FLOXANT agiert mit juristischem Hauptsitz in Düsseldorf, ist aber operativ tief in Bayern verwurzelt. Unser Team fährt regelmäßige Touren nach und von Nürnberg. Das ermöglicht uns eine hohe Flexibilität und Termintreue auch in Franken. Fernumzüge von Nürnberg in Richtung NRW oder Norddeutschland sind durch unsere regelmäßigen Verbindungen besonders effizient und kostengünstig realisierbar.
                            </p>
                        </div>
                    </div>

                    {/* Services Section specifically for Nuremberg */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">Maßgeschneiderte Leistungen für Nürnberg</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex gap-4">
                                <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit"><History className="w-6 h-6 text-primary" /></div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Umzüge in historischen Vierteln</h3>
                                    <p className="text-muted-foreground">Besondere Vorsicht und Ausrüstung für enge Altbau-Treppenhäuser und denkmalgeschützte Gebäude.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit"><Truck className="w-6 h-6 text-primary" /></div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Fernumzüge Franken – NRW</h3>
                                    <p className="text-muted-foreground">Spezialisierte Logistik für Langstrecken. Wöchentliche Touren ermöglichen flexible Planung für Ihren Fernumzug.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit"><Calculator className="w-6 h-6 text-primary" /></div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Festpreisgarantie</h3>
                                    <p className="text-muted-foreground">Keine Nachverhandlungen am Umzugstag. Unser Angebot gilt bindend.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit"><CheckCircle2 className="w-6 h-6 text-primary" /></div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Full-Service</h3>
                                    <p className="text-muted-foreground">Einpacken, Möbelmontage und Lampeninstallation. Sie kommen an, wir machen den Rest.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content: Nuremberg Challenges & Solutions */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Herausforderungen in Nürnberg meistern</h2>
                        <p>
                            Die Parksituation, insbesondere in der Südstadt oder Gostenhof, kann kritisch sein. Wir kümmern uns rechtzeitig um die behördliche Einrichtung einer Halteverbotszone direkt vor Ihrer Haustür. So vermeiden wir lange Laufwege, sparen Zeit und schonen Ihre Nerven sowie die der Nachbarn.
                        </p>
                        <h3>Umzug von Bayern in ganz Deutschland</h3>
                        <p>
                            Planen Sie einen Wegzug aus Nürnberg? Vielleicht beruflich nach Hamburg, Berlin oder zurück ins Rheinland? Dank unserer bundesweiten Logistikstruktur sind wir der ideale Partner für Fernumzüge. Wir verladen Ihr Gut sicher in Nürnberg und liefern es termingerecht an jedem Ort in Deutschland ab. Durch clevere Tourenplanung vermeiden wir Leerfahrten, was nicht nur die Umwelt schont, sondern auch Ihr Budget entlastet.
                        </p>
                        <h3>Unser Qualitätsversprechen</h3>
                        <p>
                            Bei FLOXANT arbeiten keine Aushilfen. Unsere Teams bestehen aus erfahrenen Möbelpackern und Monteuren, die ihr Handwerk verstehen. Jeder Handgriff ist routiniert, jedes Möbelstück wird fachgerecht emballiert. Wir nutzen hochwertige Packmaterialien, um Kratzer und Schäden effektiv zu vermeiden. Sollte dennoch einmal etwas passieren, greift unsere umfassende Transportversicherung.
                        </p>

                        <div className="my-10 p-6 bg-card rounded-2xl border border-border shadow-sm">
                            <h4 className="text-xl font-bold mb-4">Checkliste für Ihren Nürnberg-Umzug</h4>
                            <ul className="space-y-2 list-disc pl-5">
                                <li>Rechtzeitig Halteverbot beantragen (machen wir für Sie)</li>
                                <li>Sperrmüll-Termin bei der Stadt Nürnberg vereinbaren oder Entrümpelung durch uns buchen</li>
                                <li>Wohnungsübergabeprotokoll vorbereiten</li>
                                <li>Zählerstände (Strom, Gas, Wasser) dokumentieren</li>
                            </ul>
                        </div>
                    </div>

                    {/* Links back to other regions */}
                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Wir sind auch hier für Sie da:</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/umzug-muenchen" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                                <ArrowRight className="w-3 h-3" /> Umzug München
                            </Link>
                            <Link href="/umzug-regensburg" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                                <ArrowRight className="w-3 h-3" /> Umzug Regensburg
                            </Link>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Ihr Angebot für Nürnberg</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Lassen Sie sich kostenlos beraten. Wir erstellen Ihnen ein individuelles Angebot für Ihren Umzug in Nürnberg oder ins Bundesgebiet.
                        </p>
                        <SmartBookingWizard dict={dict} />
                    </div>

                </div>
            </section>

            <Footer lang={lang} dic={dict} />
        </main>
    );
}
