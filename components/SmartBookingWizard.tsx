"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Box, Sparkles, Trash2, ArrowRight, ArrowLeft, MapPin, Calendar,
    PackageOpen, Users, Clock, Shield, CheckCircle2, Upload
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PremiumButton } from "@/components/ui/PremiumButton";

// Types
type ServiceType = "umzug" | "reinigung" | "entsorgung" | null;

interface BookingState {
    step: number;
    service: ServiceType;
    details: any;
    upgrades: string[];
}

const steps = [
    { number: 1, title: "Service" },
    { number: 2, title: "Details" },
    { number: 3, title: "Upgrades" },
    { number: 4, title: "Kontakt" },
];

export function SmartBookingWizard() {
    const [state, setState] = useState<BookingState>({
        step: 1,
        service: null,
        details: {},
        upgrades: [],
    });

    const nextStep = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
    const prevStep = () => setState(prev => ({ ...prev, step: prev.step - 1 }));

    // Form State & Handlers (Lifted to top level to avoid Hook errors)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [file, setFile] = useState<File | null>(null);

    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();
        submitData.append("service", state.service || "");
        submitData.append("upgrades", JSON.stringify(state.upgrades));
        submitData.append("details", JSON.stringify(state.details));
        submitData.append("name", formData.name);
        submitData.append("email", formData.email);
        submitData.append("phone", formData.phone);
        submitData.append("timestamp", new Date().toISOString());
        if (file) {
            submitData.append("file", file);
        }

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                body: submitData,
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                alert("Fehler beim Senden. Bitte versuchen Sie es erneut.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Ein unerwarteter Fehler ist aufgetreten.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Step 5: Success View
    if (isSuccess) {
        return (
            <div className="w-full max-w-2xl mx-auto text-center space-y-8 py-12">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold">Anfrage erfolgreich!</h2>
                    <p className="text-xl text-muted-foreground">
                        Vielen Dank, {formData.name}. Wir haben Ihre Anfrage erhalten und prüfen Ihre Kapazitäten.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Eine Bestätigung wurde an {formData.email} gesendet.
                    </p>
                </div>
                <div className="pt-8">
                    <PremiumButton onClick={() => window.location.reload()}>
                        Neue Anfrage stellen
                    </PremiumButton>
                </div>
            </div>
        );
    }

    // Step 1: Service Selection
    const renderServiceSelection = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { id: "umzug", label: "Umzug", icon: Box, desc: "Stressfrei umziehen." },
                { id: "reinigung", label: "Reinigung", icon: Sparkles, desc: "Tiefenreinigung & Übergabe." },
                { id: "entsorgung", label: "Entsorgung", icon: Trash2, desc: "Fachgerecht & schnell." },
            ].map((option) => (
                <button
                    key={option.id}
                    onClick={() => {
                        setState(prev => ({ ...prev, service: option.id as ServiceType }));
                        nextStep();
                    }}
                    className="group relative h-64 w-full text-left transition-all hover:-translate-y-1"
                >
                    <div className="absolute inset-0 bg-white/5 bg-slate-100/50 dark:bg-white/5 rounded-2xl border border-slate-300 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-none transition-all group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/10" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                        <div className="p-4 rounded-full bg-slate-200 dark:bg-white/5 group-hover:bg-primary/20 transition-colors">
                            <option.icon className="w-8 h-8 md:w-10 md:h-10 text-slate-700 dark:text-white group-hover:text-primary transition-colors" />
                        </div>
                        <div className="text-center relative z-10">
                            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{option.label}</h3>
                            <p className="text-sm text-slate-600 dark:text-muted-foreground">{option.desc}</p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );

    // Step 2: Dynamic Details
    const renderDetails = () => (
        <div className="space-y-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-center">Details für {state.service?.toUpperCase()}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2"><MapPin size={16} /> Start-Adresse</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Straße, Ort" />
                </div>
                {state.service === "umzug" && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2"><MapPin size={16} /> Ziel-Adresse</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Straße, Ort" />
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><Calendar size={16} /> Wunschtermin</label>
                <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
            </div>

            <div className="flex justify-center gap-4 pt-8">
                <PremiumButton variant="ghost" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zurück
                </PremiumButton>
                <PremiumButton onClick={nextStep}>
                    Weiter <ArrowRight className="w-4 h-4 ml-2" />
                </PremiumButton>
            </div>
        </div>
    );

    // Step 3: Intelligent Upgrades
    const renderUpgrades = () => {
        const relevantUpgrades = [
            { id: "ladies_team", title: "Damen-Team", icon: Users, desc: "Maximale Sorgfalt & Empathie.", service: ["umzug", "reinigung"] },
            { id: "24h_service", title: "24h Service", icon: Clock, desc: "Rund um die Uhr einsatzbereit.", service: ["umzug", "entsorgung", "reinigung"] },
            { id: "furniture_opt", title: "Möbel-Optimierung", icon: Sparkles, desc: "Demontage, Aufbau & Pflege.", service: "umzug" },
            { id: "storage_rot", title: "Lager-Rotation", icon: PackageOpen, desc: "Flexible Zwischenlagerung.", service: "umzug" },
            { id: "maybe_box", title: "Die Vielleicht-Box", icon: Box, desc: "Entscheidungshilfe für Unklares.", service: ["umzug", "entsorgung"] },
            { id: "clean_shield", title: "Bureaucracy Shield", icon: Shield, desc: "Halteverbotszonen & Service.", service: ["umzug", "entsorgung"] },
        ].filter(u => Array.isArray(u.service) ? u.service.includes(state.service || "") : u.service === state.service);

        return (
            <div className="space-y-8">
                <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold">Darf es etwas mehr sein?</h3>
                    <p className="text-muted-foreground">Unsere Signature Services für Ihren Komfort.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relevantUpgrades.map((upgrade) => {
                        const isSelected = state.upgrades.includes(upgrade.id);
                        const Icon = upgrade.icon;
                        return (
                            <button
                                key={upgrade.id}
                                onClick={() => setState(prev => ({
                                    ...prev,
                                    upgrades: isSelected
                                        ? prev.upgrades.filter(id => id !== upgrade.id)
                                        : [...prev.upgrades, upgrade.id]
                                }))}
                                className={cn(
                                    "relative p-6 rounded-2xl border transition-all text-left group",
                                    isSelected
                                        ? "bg-primary/10 border-primary"
                                        : "bg-white/5 border-white/10 hover:border-primary/30"
                                )}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={cn("p-2 rounded-lg transition-colors", isSelected ? "bg-primary text-primary-foreground" : "bg-white/10 text-muted-foreground")}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    {isSelected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                                </div>
                                <h4 className="font-semibold mb-1">{upgrade.title}</h4>
                                <p className="text-sm text-muted-foreground">{upgrade.desc}</p>
                            </button>
                        );
                    })}
                </div>

                <div className="flex justify-center gap-4 pt-8">
                    <PremiumButton variant="ghost" onClick={prevStep}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zurück
                    </PremiumButton>
                    <PremiumButton onClick={nextStep}>
                        Zum Abschluss <ArrowRight className="w-4 h-4 ml-2" />
                    </PremiumButton>
                </div>
            </div>
        );
    };

    // Step 4: Summary & Contact - Simplified (Uses Top Level Hooks)
    const renderContact = () => {
        return (
            <div className="space-y-8 max-w-2xl mx-auto">
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Ihre Zusammenfassung</h3>
                    <p className="text-muted-foreground">Wir prüfen Ihre Kapazitäten sofort.</p>
                </div>

                <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-white/10 pb-4">
                        <span className="font-semibold capitalize text-lg text-foreground">{state.service}</span>
                        <span className="text-primary"><CheckCircle2 className="w-5 h-5" /></span>
                    </div>

                    {state.upgrades.length > 0 && (
                        <div className="space-y-2">
                            <span className="text-sm text-muted-foreground">Extras:</span>
                            <div className="flex flex-wrap gap-2">
                                {state.upgrades.map(u => (
                                    <span key={u} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20">
                                        {u.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name <span className="text-red-500">*</span></label>
                            <input
                                required
                                value={formData.name}
                                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                                placeholder="Ihr Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                                placeholder="email@beispiel.de"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Telefon <span className="text-red-500">*</span></label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                            placeholder="+49 ..."
                        />
                    </div>

                    {/* Photo Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            Fotos hochladen (Optional)
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setFile(e.target.files?.[0] || null)}
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-foreground"
                            >
                                <Upload className="w-5 h-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    {file ? file.name : "Klicken zum Hochladen"}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 pt-4">
                        <PremiumButton variant="ghost" type="button" onClick={prevStep}>
                            <ArrowLeft className="w-4 h-4 mr-2" /> Zurück
                        </PremiumButton>
                        <PremiumButton className="w-full md:w-auto" disabled={isSubmitting}>
                            {isSubmitting ? "Sende..." : "Jetzt verbindlich anfragen"}
                        </PremiumButton>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10" />
                    <div
                        className="absolute top-1/2 left-0 h-0.5 bg-primary -z-10 transition-all duration-500"
                        style={{ width: `${((state.step - 1) / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((s) => (
                        <div key={s.number} className="flex flex-col items-center gap-2 bg-background px-2">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all duration-300",
                                state.step >= s.number
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-muted-foreground/30 text-muted-foreground bg-background"
                            )}>
                                {s.number}
                            </div>
                            <span className={cn(
                                "text-xs font-medium transition-colors",
                                state.step >= s.number ? "text-primary" : "text-muted-foreground"
                            )}>
                                {s.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={state.step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {state.step === 1 && (
                        <div className="space-y-8 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold">Womit dürfen wir starten?</h2>
                                <p className="text-muted-foreground">Wählen Sie Ihren Hauptservice.</p>
                            </div>
                            {renderServiceSelection()}
                        </div>
                    )}

                    {state.step === 2 && renderDetails()}

                    {state.step === 3 && renderUpgrades()}

                    {state.step === 4 && renderContact()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
