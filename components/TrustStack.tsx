import { Shield, Layers, Award, CheckCircle2, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrustStack({ className = "" }: { className?: string }) {
    return (
        <section className={cn("py-16 px-6 relative overflow-hidden", className)}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                        Warum FLOXANT Vertrauen aufbaut
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        Klare Preisstruktur, abgesicherte Transporte und regionale Erfahrung in Regensburg und ganz Bayern.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center group hover:border-primary/40 transition-colors">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Shield className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Abgesicherter Transport</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Transporte erfolgen mit gesetzlicher Verkehrshaftung und sorgfältiger Behandlung Ihres Umzugsguts.
                        </p>
                    </div>

                    <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center group hover:border-primary/40 transition-colors">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Layers className="w-8 h-8 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Transparente Festpreise</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Nach Besichtigung erhalten Sie ein klares Angebot ohne versteckte Kosten und ohne unnötige Nachverhandlungen.
                        </p>
                    </div>

                    <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center group hover:border-primary/40 transition-colors">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Verbindliche Planung</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Termine, Leistungsumfang und Ablauf werden vorab sauber abgestimmt, damit der Umzug planbar bleibt.
                        </p>
                    </div>

                    <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center group hover:border-primary/40 transition-colors">
                        <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Award className="w-8 h-8 text-amber-600" />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Regionale Erfahrung</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Regensburg, Oberpfalz und Bayern bringen eigene logistische Anforderungen mit sich. Genau darauf ist FLOXANT eingestellt.
                        </p>
                    </div>
                </div>

                <div className="mt-16 bg-muted/30 border border-border/50 rounded-3xl p-8 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 justify-between">
                    <div className="max-w-2xl">
                        <h3 className="text-xl font-bold mb-2">FLOXANT in Kürze</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            FLOXANT unterstützt bei Umzügen, Entrümpelungen und Reinigungen in Bayern mit klarem Ablauf, direkter Kommunikation und lokalem Praxiswissen. Der Fokus liegt auf sauberer Organisation, realistischen Angeboten und stressärmeren Übergaben.
                        </p>
                    </div>

                    <div className="flex-shrink-0 w-full md:w-auto">
                        <div className="rounded-2xl border border-border bg-card px-6 py-5 text-center shadow-sm min-w-[220px]">
                            <div className="flex items-center justify-center mb-3">
                                <PhoneCall className="w-5 h-5 text-primary" />
                            </div>
                            <p className="text-sm font-semibold text-foreground mb-1">
                                Direkter Kontakt
                            </p>
                            <p className="text-xs text-muted-foreground mb-3">
                                Schnell erreichbar für Rückfragen und Terminabstimmung
                            </p>
                            <a
                                href="tel:+4915771105087"
                                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                                +49 1577 1105087
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
