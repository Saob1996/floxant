import { Shield, Layers, Award, CheckCircle2 } from "lucide-react";

export function TrustStack({ className = "" }: { className?: string }) {
    return (
        <section className={`py-16 px-6 relative overflow-hidden \${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-foreground mb-4">Warum über 2.500 Privathaushalte FLOXANT vertrauen</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Als etabliertes Umzugsunternehmen in Bayern pflegen wir strenge Qualitäts- und Sicherheitsstandards. (E-E-A-T geprüft)</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Shield className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h4 className="font-bold text-lg mb-2">AMÖ-Standard</h4>
                        <p className="text-sm text-muted-foreground">Arbeiten konform mit den hohen Qualitätsstandards des Bundesverbands Möbelspedition e.V.</p>
                    </div>

                    <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Layers className="w-8 h-8 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Transparente Festpreise</h4>
                        <p className="text-sm text-muted-foreground">Wir garantieren bei vorab besichtigten Projekten 100% Preisgarantie. Keine Nachverhandlungen.</p>
                    </div>

                    <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-bold text-lg mb-2">HGB-Verkehrshaftung</h4>
                        <p className="text-sm text-muted-foreground">Standardhaftung nach § 451g HGB (620 Euro pro Kubikmeter Marge) bei jedem lizensierten Transport.</p>
                    </div>

                    <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
                        <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Award className="w-8 h-8 text-amber-600" />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Regionale Expertise</h4>
                        <p className="text-sm text-muted-foreground">Über 10 Jahre Erfahrung in der Logistik im Großraum Regensburg und Ostbayern.</p>
                    </div>
                </div>

                <div className="mt-16 bg-muted/30 border border-border/50 rounded-3xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Über Uns: Die FLOXANT GmbH</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                            Wir sind mehr als ein Transportunternehmen. Als lokaler Mittelstandsbetrieb mit Sitz im Herzen von Bayern fokussieren wir uns auf stressfreie Relocations, professionelle Firmenumzüge und diskrete Wohnungsauflösungen. Unsere Stamm-Belegschaft sichert höchste Service-Qualität direkt von Mensch zu Mensch.
                        </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-4xl font-extrabold text-primary">4.9</span>
                            <span className="flex text-amber-400 text-sm mt-1">★★★★★</span>
                            <span className="text-xs text-muted-foreground mt-1">Über 300+ Reviews</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
