"use client";

import React, { useState } from "react";
import { ServiceSelector, ServiceType } from "@/components/ServiceSelector";
import { GlassCard } from "@/components/ui/GlassCard";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { FileUp, Calendar, MapPin } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

export function BookingForm() {
    const [service, setService] = useState<ServiceType>("umzug");

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Wählen Sie Ihren Service</h2>
                <p className="text-muted-foreground">Wir kümmern uns um den Rest.</p>
            </div>

            <ServiceSelector current={service} onSelect={setService} />

            <AnimatePresence mode="wait">
                <m.div
                    key={service}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <GlassCard className="p-8 backdrop-blur-3xl">
                        <h3 className="text-2xl font-semibold mb-6 capitalize">{service} Anfrage</h3>

                        <form className="space-y-6">
                            {/* Common Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Name</label>
                                    <input className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Max Mustermann" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="max@example.com" />
                                </div>
                            </div>

                            {/* Service Specific Fields */}
                            {service === "umzug" && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><MapPin size={16} /> Start-Adresse</label>
                                            <input className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4" placeholder="Alte Straße 1" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><MapPin size={16} /> Ziel-Adresse</label>
                                            <input className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4" placeholder="Neue Allee 10" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {service === "reinigung" && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <button type="button" className="h-24 rounded-xl border border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-2">
                                            <span>Hausreinigung</span>
                                        </button>
                                        <button type="button" className="h-24 rounded-xl border border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-2">
                                            <span>Büroreinigung</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {service === "entsorgung" && (
                                <div className="space-y-4">
                                    <div className="h-32 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                                        <FileUp className="mb-2 h-8 w-8 opacity-50" />
                                        <span className="text-sm">Beschreiben Sie den Müll oder laden Sie ein Foto hoch</span>
                                    </div>
                                </div>
                            )}

                            {/* File Upload Global */}
                            <div className="pt-4">
                                <h4 className="flex items-center gap-2 font-medium mb-3"><FileUp size={18} /> Medien hochladen</h4>
                                <div className="h-40 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                                    <span className="text-sm">Fotos vom Objekt hier ablegen</span>
                                    <span className="text-xs opacity-50 mt-1">oder klicken zum Auswählen</span>
                                </div>
                            </div>

                            {/* Calendar */}
                            <div className="pt-4">
                                <h4 className="flex items-center gap-2 font-medium mb-3"><Calendar size={18} /> Wunschtermin</h4>
                                <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4" />
                            </div>

                            <div className="pt-6">
                                <PremiumButton className="w-full">
                                    Kostenpflichtig buchen
                                </PremiumButton>
                            </div>
                        </form>
                    </GlassCard>
                </m.div>
            </AnimatePresence>
        </div>
    );
}
