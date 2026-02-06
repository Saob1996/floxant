"use client";

import { motion } from "framer-motion";
import {
    PackageOpen, Sparkles, Users, Clock, Shield, Wrench,
    CheckCircle2, RotateCw, Baby, Truck, Heart, Archive,
    HelpCircle, Key
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const services = [
    {
        title: "Ritual Exit Box",
        description: "Ein bewusster Abschied. Wir begleiten den Übergang mit liebevollen Erinnerungs- und Abschiedsgegenständen, um einen Lebensabschnitt ruhig abzuschließen.",
        icon: PackageOpen,
        color: "text-amber-400"
    },
    {
        title: "Clean Start Ceremony",
        description: "Der Moment des Ankommens. Nach der Reinigung bereiten wir Ihr neues Zuhause atmosphärisch vor – mit Ordnung, Frische und einem Gefühl von Ruhe.",
        icon: Sparkles,
        color: "text-cyan-400"
    },
    {
        title: "New Neighbour Kit",
        description: "Ankommen im Umfeld. Unser Neighbour Kit erleichtert den Einstieg in die Nachbarschaft – stilvoll, zurückhaltend und respektvoll.",
        icon: Users,
        color: "text-green-400"
    },
    {
        title: "First 48h Package",
        description: "Stabilität in den ersten Stunden. Wir richten Schlafzimmer, Bad und Küche sofort ein, damit Ihr Alltag ohne Verzögerung beginnen kann.",
        icon: Clock,
        color: "text-blue-400"
    },
    {
        title: "Bürokratie-Schutz",
        description: "Weniger Papier. Mehr Fokus. Wir übernehmen Ummeldungen, Verträge und organisatorische Schritte strukturiert und zuverlässig.",
        icon: Shield,
        color: "text-slate-400"
    },
    {
        title: "Möbel-Optimierung",
        description: "Funktion trifft Ästhetik. Wir montieren, platzieren und optimieren nach Raumlogik und Lichtführung – funktional, ruhig und visuell ausgewogen.",
        icon: Wrench,
        color: "text-orange-400"
    },
    {
        title: "Reinigungsgarantie",
        description: "Sauberkeit mit Sicherheit. Endreinigung nach klar definierten Vermieterstandards, dokumentiert für eine reibungslose Kautionsrückzahlung.",
        icon: CheckCircle2,
        color: "text-teal-400"
    },
    {
        title: "Lager-Rotation",
        description: "Flexibel lagern. Klar entscheiden. Wir lagern Dinge sicher ein und liefern sie bei Bedarf zurück – ideal für saisonale Nutzung oder Übergangsphasen.",
        icon: RotateCw,
        color: "text-indigo-400"
    },
    {
        title: "Kinder-Umzugsbox",
        description: "Ein Umzug aus Kinderperspektive. Mit einer eigenen Box geben wir Orientierung, Struktur und ein positives Erlebnis für die Kleinsten.",
        icon: Baby,
        color: "text-pink-400"
    },
    {
        title: "24h Umzugsservice",
        description: "Wenn Zeit der Faktor ist. Diskrete, effiziente Umzüge innerhalb von 24 Stunden. Schnell, kontrolliert und professionell.",
        icon: Truck,
        color: "text-red-400"
    },
    {
        title: "Damen-Team",
        description: "Vertrauen in sensiblen Situationen. Ein Team für besondere Sicherheit und Ruhe – bei Bedarf durch männliche Kraft für schweres Tragen ergänzt.",
        icon: Heart,
        color: "text-rose-400"
    },
    {
        title: "Erinnerungskapsel",
        description: "Bewahren, was Bedeutung hat. Eine stilvolle Box für Persönliches aus dem alten Zuhause – geschützt und bewusst aufbewahrt.",
        icon: Archive,
        color: "text-purple-400"
    },
    {
        title: "Die Vielleicht-Box",
        description: "Entscheidungen vertagen. Wir lagern Unsicheres ein, bis Sie bereit sind, loszulassen oder zu behalten. Ohne Druck. Ohne Chaos.",
        icon: HelpCircle,
        color: "text-yellow-400"
    },
    {
        title: "Schlüsselübergabe",
        description: "Dokumentiert. Sicher. Nachvollziehbar. Professionelle Protokolle für Vermieter und visuelle Nachweise für Ihre Sicherheit.",
        icon: Key,
        color: "text-emerald-400"
    }
];

export function SignatureServices() {
    return (
        <section id="extras" className="py-24 px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-blue-900/5 skew-y-3 transform -z-10 origin-top-left" />

            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
                        Exklusiv bei Floxant
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Signature Services</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Mehr als nur Logistik. Wir kümmern uns um die emotionalen und organisatorischen Details Ihres Neuanfangs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative h-full"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-sm group-hover:blur-md transition-all opacity-50 dark:opacity-20" />

                                <div className="glass h-full p-6 rounded-2xl border border-white/10 relative overflow-hidden group-hover:border-primary/30 transition-colors">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                                        <Icon className="w-24 h-24" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className={cn("p-3 rounded-xl bg-background/50 w-fit mb-4 backdrop-blur-sm border border-white/5", service.color)}>
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
