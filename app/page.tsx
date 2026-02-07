"use client";

import { Header } from "@/components/Header";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { SignatureServices } from "@/components/SignatureServices";
import { motion } from "framer-motion";
import { ArrowRight, Box, Sparkles, Trash2, CheckCircle2 } from "lucide-react";

const services = [
    {

        icon: <Box className="w-8 h-8 md:w-10 md:h-10 text-accent" />,
        title: "Umzug – Präzise Bewegung",
        description: "Ein Umzug ist bei Floxant kein Kraftakt, sondern ein koordiniertes Projekt. Wir planen Abläufe, definieren Wege, sichern Gegenstände und bewegen Ihr Eigentum mit kontrollierter Ruhe. Jeder Handgriff folgt einer Logik – nichts geschieht zufällig. Vom ersten Karton bis zur finalen Platzierung behandeln wir Ihr Zuhause mit Respekt, Übersicht und Verantwortung.",
        features: ["Ablaufplanung & Logik", "Sichere Bewegung", "Versicherung inklusive"]
    },
    {
        icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-accent" />,
        title: "Reinigung – Sichtbare Ordnung",
        description: "Reinigung ist kein Nebenprodukt, sondern ein Qualitätsmerkmal. Ob vor Übergaben, nach Entsorgungen oder für den Einzug: Wir reinigen strukturiert, gründlich und nachvollziehbar. Das Ergebnis ist nicht nur sauber, sondern klar – für Sie, für Vermieter und für den nächsten Lebensabschnitt.",
        features: ["Abnahmegarantie", "Strukturierte Systematik", "Übergabe-Protokolle"]
    },
    {
        icon: <Trash2 className="w-8 h-8 md:w-10 md:h-10 text-accent" />,
        title: "Entsorgung – Raum schaffen",
        description: "Wir entsorgen nicht wahllos, wir lösen Platzprobleme. Überflüssiges wird fachgerecht, diskret und umweltbewusst entfernt. So entsteht Raum – physisch und mental – für das, was bleiben soll.",
        features: ["Diskret & Umweltbewusst", "Raumgewinnung", "Nachweis"]
    }
];

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
            <Header />

            <section id="zero" className="relative pt-32 pb-20 px-6 lg:pt-48">
                <div className="absolute inset-0 bg-grid-white/5 bg-[size:40px_40px] [mask-image:radial-gradient(white,transparent_70%)] pointer-events-none" />

                {/* Decorative blobs */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

                <div className="mx-auto max-w-7xl relative z-10 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center max-w-4xl mx-auto mb-20 space-y-8"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Architektur statt Chaos</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 leading-[1.1]">
                            Die Architekten Ihrer Veränderung.
                        </h1>
                        <p className="text-lg md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
                            Ein Umzug ist kein Durcheinander von Kartons. Er ist ein komplexes, technisches Projekt, das Präzision verlangt.
                            <br className="my-4 block" />
                            Bei <span className="text-foreground font-medium">Floxant</span> behandeln wir jeden Auftrag wie einen architektonischen Bauplan.
                        </p>
                    </motion.div>

                    <motion.div
                        id="contact"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="w-full scroll-mt-28"
                    >
                        <SmartBookingWizard />

                        {/* Direct Contact Card */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            <div className="glass p-6 rounded-2xl border border-white/10 flex items-center gap-4 hover:border-primary/30 transition-colors">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">Direkter Draht</p>
                                    <a href="tel:015771105087" className="text-lg font-bold text-foreground hover:text-primary transition-colors">01577 110 50 87</a>
                                </div>
                            </div>

                            <div className="glass p-6 rounded-2xl border border-white/10 flex items-center gap-4 hover:border-primary/30 transition-colors">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">Schriftliche Anfragen</p>
                                    <a href="mailto:salehobidvc@gmail.com" className="text-lg font-bold text-foreground hover:text-primary transition-colors">salehobidvc@gmail.com</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section id="about" className="py-32 px-6 relative bg-muted/10 border-y border-border/50">
                <div className="mx-auto max-w-4xl space-y-32">

                    {/* Block A: Haltung */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <span className="text-sm font-medium tracking-[0.2em] text-primary/60 uppercase">Haltung</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-medium leading-tight text-foreground">
                            Ordnung ist kein Zufall.
                        </h2>
                        <div className="prose prose-lg text-muted-foreground leading-relaxed max-w-none">
                            <p>
                                Wir bei FLOXANT verstehen einen Umzug nicht als bloßen Transport von Kisten, sondern als eine räumliche Veränderung, die Struktur verlangt. Chaos entsteht nur dort, wo Planung fehlt. Unser Ansatz ist architektonisch: Wir vermessen die Aufgabe, wir planen den Ablauf, wir führen aus. Mit Ruhe, Respekt und absoluter Diskretion.
                            </p>
                            <p>
                                Ein Zuhause ist ein geschützter Raum. Wer ihn betritt, übernimmt Verantwortung. Wir begegnen diesem Vertrauen mit einer Haltung, die Präzision über Geschwindigkeit stellt.
                            </p>
                        </div>
                    </motion.div>

                    {/* Block B: Arbeitsweise */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <span className="text-sm font-medium tracking-[0.2em] text-primary/60 uppercase">Arbeitsweise</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-medium leading-tight text-foreground">
                            Erst der Plan, dann die Bewegung.
                        </h2>
                        <div className="prose prose-lg text-muted-foreground leading-relaxed max-w-none">
                            <p>
                                Improvisation ist für uns kein Qualitätsmerkmal. Bevor wir den ersten Karton heben, steht der Ablauf fest. Wir analysieren die Gegebenheiten, schützen die Bausubstanz und definieren klare Phasen. Ob es um den sensiblen Umgang mit privaten Räumen geht oder um komplexe Logistik: Wir arbeiten prozessorientiert.
                            </p>
                            <p>
                                Wir trennen Planung von Ausführung. Jeder Schritt wird dokumentiert und kontrolliert. Das schafft Sicherheit – für Sie, für Ihre Werte und für unser Team.
                            </p>
                        </div>
                    </motion.div>

                    {/* Block C: Leistungen (Narrativ) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <span className="text-sm font-medium tracking-[0.2em] text-primary/60 uppercase">Kontext</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-medium leading-tight text-foreground">
                            Ein integriertes System.
                        </h2>
                        <div className="prose prose-lg text-muted-foreground leading-relaxed max-w-none space-y-8">
                            <p>
                                Unsere Services stehen nicht isoliert nebeneinander, sie greifen ineinander, um spezifische menschliche Bedürfnisse in dieser Phase des Wandels zu adressieren.
                            </p>
                            <p>
                                Ein Umzug wird oft von unsichtbaren Hürden begleitet. Deshalb setzt unser **Damen-Umzugsteam** – bewusst überwiegend weiblich besetzt – auf eine Atmosphäre der Ruhe und Sensibilität, besonders in sehr privaten Situationen. Für die körperlich schwersten Aufgaben ergänzt uns gezielt männliche Kraft. Das ist kein Zufall, sondern Strategie für Sicherheit und Vertrauen.
                            </p>
                            <p>
                                Wir wissen, dass das Leben nicht immer nach Plan läuft. Für unvorhersehbare Härtefälle halten wir einen **24h-Umzugsservice** bereit, der auch unter extremem Zeitdruck strukturiert und diskret agiert.
                            </p>
                            <p>
                                Auch die Kleinsten verlieren im Wandel oft die Orientierung. Unsere **Kinder-Umzugsbox** ist kein Spielzeug, sondern ein pädagogisches Werkzeug, das Kindern hilft, ihren eigenen Prozess zu verstehen und emotional im neuen Zuhause anzukommen.
                            </p>
                            <p>
                                Wenn Entscheidungen schwerfallen, bietet die **Vielleicht-Box** einen Aufschub ohne Druck – Dinge werden sicher verwahrt, bis Klarheit herrscht. Und für den bürokratischen Teil übernimmt unser **Bürokratie-Schutz** die Last der Formulare, damit Sie sich auf das Ankommen konzentrieren können.
                            </p>
                            <p>
                                Am Ende steht oft ein Abschied. Mit unserer **Ritual Exit Box** geben wir diesem Moment einen würdigen, ruhigen Rahmen. Ohne Drama, aber mit dem nötigen Respekt vor dem, was war, um frei für das Neue zu sein.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </section>

            <section id="services" className="py-32 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none" />

                <div className="mx-auto max-w-7xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl font-bold mb-6">Unsere Basis-Leistungen</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Ein Fundament aus Präzision und Ordnung. Immer Teil unseres Systems.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -5 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-8 rounded-3xl border border-white/10 hover:border-primary/20 transition-colors group"
                            >
                                <div className="mb-6 p-4 rounded-2xl bg-muted/50 w-fit group-hover:bg-primary/10 transition-colors">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                                <p className="text-muted-foreground mb-8 leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-3">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <CheckCircle2 className="w-4 h-4 text-accent" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <div id="extras">
                <SignatureServices />
            </div>

            {/* Extras Narrative - Optional/Zusatzleistungen */}
            <section className="py-24 px-6 bg-muted/10 border-t border-border/50">
                <div className="mx-auto max-w-3xl space-y-8 text-center md:text-left">
                    <div className="md:pl-4 border-l-2 border-primary/20">
                        <h3 className="text-2xl font-serif font-medium text-foreground mb-2">Über unsere Zusatzleistungen</h3>
                        <p className="text-muted-foreground">
                            Diese Angebote verstehen wir als optionale Ergänzung zu unserem Standard. Sie sind nicht Teil jedes Umzugs, sondern da, wo sie gebraucht werden.
                        </p>
                    </div>

                    <div className="prose prose-lg text-muted-foreground leading-relaxed max-w-none space-y-6">
                        <p>
                            Manchmal erfordert eine Situation besonderes Fingerspitzengefühl. Unser Damen-Team besteht deshalb überwiegend aus Frauen und wird gezielt von einem männlichen Kollegen für die schweren Tragearbeiten unterstützt. Diese Konstellation wählen wir bewusst für Umgebungen, in denen Sicherheit und Vertrauen die wichtigste Rolle spielen.
                        </p>
                        <p>
                            Für Fälle, die sich nicht planen lassen, halten wir unseren 24h-Umzugsservice bereit. Wenn es schnell gehen muss oder ein Notfall eintritt, reagieren wir auch außerhalb der üblichen Zeiten – strukturiert und diskret, ohne Hektik zu verbreiten.
                        </p>
                        <p>
                            Damit auch Kinder ihren Platz im Veränderungsprozess finden, nutzen wir die Kinder-Umzugsbox. Sie ist kein Spielzeug, sondern hilft den Kleinen dabei, sich emotional zu orientieren und ihre eigenen wichtigen Dinge sicher zu verpacken.
                        </p>
                        <p>
                            Oft fällt es schwer, sofort über alles zu entscheiden. Die Vielleicht-Box ist unser Angebot für genau diese Gegenstände: Wir lagern sie sicher ein, bis Sie in Ruhe entscheiden können, was damit geschehen soll. Das nimmt den Druck aus dem Moment.
                        </p>
                        <p>
                            Um Ihnen den Rücken freizuhalten, kümmert sich unser Bürokratie-Schutz um die lästigen Formalitäten und Behördengänge. Und wenn ein Lebensabschnitt endgültig abgeschlossen wird, bietet die Ritual Exit Box einen ruhigen Rahmen für den Abschied, ganz ohne Drama, aber mit dem nötigen Respekt.
                        </p>
                    </div>
                </div>
            </section>

            {/* SEO Content - Hidden */}
            <div style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden"
            }}>
                <h1>Umzugs- und Reinigungsservice in Bayern und Nordrhein-Westfalen</h1>

                <p>
                    Floxant bietet professionelle Umzugs-, Reinigungs- und Entrümpelungsservices
                    in ganz Bayern, einschließlich München, Nürnberg, Augsburg, Regensburg,
                    Ingolstadt, Würzburg, Fürth und Erlangen.
                </p>

                <p>
                    Zusätzlich sind unsere Teams in Nordrhein-Westfalen im Einsatz,
                    insbesondere in Düsseldorf und Köln.
                </p>

                <p>
                    Servicegebiete:
                    München, Nürnberg, Augsburg, Regensburg, Ingolstadt, Würzburg,
                    Fürth, Erlangen, Düsseldorf, Köln.
                </p>
            </div>
        </main >
    );
}
