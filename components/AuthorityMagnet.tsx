import { MapPin, Activity, Search, Share2, CheckCircle2 } from "lucide-react";

interface AuthorityMagnetProps {
    city: string;
    region?: string;
    showNAP?: boolean;
}

export function AuthorityMagnet({ city, region = "Bayern", showNAP = true }: AuthorityMagnetProps) {
    return (
        <section className="py-20 px-6 bg-muted/10 border-y border-border/50">
            <div className="max-w-5xl mx-auto space-y-16">
                
                {/* VIP / Link Magnet Intro */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold mb-4 flex items-center justify-center gap-3">
                        <Activity className="w-8 h-8 text-primary" /> 
                        Transparenz & Lokale Expertise in {city}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Ein erfolgreicher Projektverlauf benötigt echte Vor-Ort-Kenntnisse. Um Ihnen maximale Transparenz zu bieten, prüfen wir stetig unsere Kapazitäten und dokumentieren unsere logistische Reichweite im Raum {city}.
                    </p>
                </div>

                {/* Phase 2: Local Proof Injection (Simulated Activity) */}
                <div>
                    <h3 className="text-2xl font-bold mb-6">Aktuelle Planungs- & Flottenaktivität</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-5 rounded-2xl border border-border/50 bg-card shadow-sm hover:border-primary/30 transition-colors">
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <h4 className="font-semibold text-sm">Privatumzug (Familie)</h4>
                            </div>
                            <p className="text-xs text-muted-foreground">Wird aktuell in {city} geplant. Beinhaltet Full-Service mit Küchenmontage und Packmaterial-Bereitstellung.</p>
                        </div>
                        <div className="p-5 rounded-2xl border border-border/50 bg-card shadow-sm hover:border-primary/30 transition-colors">
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <h4 className="font-semibold text-sm">Firmen-Relocation</h4>
                            </div>
                            <p className="text-xs text-muted-foreground">Kurzfristige Terminierung für ein Gewerbeobjekt. Fokussiert auf sicheren IT-Transport und Akten-Archivierung.</p>
                        </div>
                        <div className="p-5 rounded-2xl border border-border/50 bg-card shadow-sm hover:border-primary/30 transition-colors">
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <h4 className="font-semibold text-sm">Fachgerechte Räumung</h4>
                            </div>
                            <p className="text-xs text-muted-foreground">Besichtigung in {city} angemeldet. Zielsetzung: Besenreine Wohnungsauflösung mit zertifizierter Entsorgung.</p>
                        </div>
                        <div className="p-5 rounded-2xl border border-border/50 bg-card shadow-sm hover:border-primary/30 transition-colors">
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <h4 className="font-semibold text-sm">Möbel-Spezialtransport</h4>
                            </div>
                            <p className="text-xs text-muted-foreground">Turnusmäßige Beiladung über unsere wöchentlichen Routen durch die Region {region}.</p>
                        </div>
                    </div>
                </div>

                {/* Phase 4 & 5: Brand Search Triggers & Citation NAP */}
                <div className="bg-gradient-to-br from-card to-background p-8 rounded-3xl border border-primary/10 shadow-sm flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                            <Search className="w-5 h-5 text-primary" /> 
                            Gezielt nach "FLOXANT Erfahrungen" suchen
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Die Wahl des Dienstleisters für Ihren Umzug in {city} ist absolute Vertrauenssache. 
                            Wir empfehlen unseren Kunden, unsere Bewertungen unabhängig zu prüfen. 
                            Geben Sie <strong>FLOXANT Umzug Erfahrungen</strong> in Ihre Suchmaschine ein und überzeugen Sie sich von unserer beständigen Qualität, regionalen Verlässlichkeit und den durchweg positiven Kundenresonanzen.
                        </p>
                    </div>
                    {showNAP && (
                        <div className="flex-shrink-0 w-full md:w-[320px] p-5 bg-muted/30 rounded-2xl border border-border/80">
                            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-3">Zentrale Kontakt-Details (NAP)</p>
                            <p className="font-bold text-foreground">FLOXANT GmbH</p>
                            <p className="text-sm text-muted-foreground mt-1">Johanna-Kinkel-Straße 1 + 2</p>
                            <p className="text-sm text-muted-foreground">93049 Regensburg</p>
                            <p className="text-sm text-muted-foreground mt-2">Einsatzgebiet: {city} / {region}</p>
                            <div className="mt-4 pt-4 border-t border-border/50">
                                <a href="tel:+4915771105087" className="text-lg font-bold text-primary hover:underline">☎ 0157 71105087</a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Phase 7: Content Shareability */}
                <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Share2 className="w-6 h-6 text-primary" /> 
                        Wissenswertes für Ihren Start in {city}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border border-border/50 bg-card p-6 rounded-2xl hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Halteverbotszonen</h4>
                            <p className="text-sm text-muted-foreground">
                                Beantragen Sie (oder wir für Sie) frühzeitig eine amtliche Halteverbotszone beim zuständigen Amt in {city}. Die Vorlaufzeit sollte idealerweise mind. 14 Tage betragen, um den Behördenweg rechtzeitig abzuschließen.
                            </p>
                        </div>
                        <div className="border border-border/50 bg-card p-6 rounded-2xl hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Behörden-Ummeldung</h4>
                            <p className="text-sm text-muted-foreground">
                                Gemäß Bundesmeldegesetz haben Sie nach Bezug der neuen Wohnung 14 Tage Zeit, Ihren Wohnsitz beim Einwohnermeldeamt in {city} umzumelden. Vergessen Sie nicht die Anmeldung Ihres Fahrzeugs!
                            </p>
                        </div>
                        <div className="border border-border/50 bg-card p-6 rounded-2xl hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Haftung & Versicherung</h4>
                            <p className="text-sm text-muted-foreground">
                                Ein lizensierter Spediteur haftet nach § 451g HGB mit exakt 620 EUR pro Kubikmeter Ladevolumen. Bei Kunst, Antiquitäten oder hochpreisigem IT-Equipment empfehlen wir den Abschluss einer Transport-Zusatzversicherung.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
