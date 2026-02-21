"use client";

import React, { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
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

interface SmartBookingWizardProps {
    dict: any;
}

// ─── Inner component: only mounts when visible ───────────────────────────
function SmartBookingWizardInner({ dict }: SmartBookingWizardProps) {
    // Two-stage loading: first paint shows shell, then initialize heavy state
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        // Defer heavy state initialization to after first paint
        setInitialized(true);
    }, []);

    const defaultBooking = {
        steps: { service: "Service", details: "Details", upgrades: "Upgrades", contact: "Contact" },
        headings: {
            service_selection: "Select Service", service_subtitle: "Choose your service", details_prefix: "Details",
            upgrades_title: "Upgrades", upgrades_subtitle: "Select extras", summary_title: "Summary", summary_subtitle: "Review details",
            success_title: "Success", success_message: "Thank you {name}", success_email: "Email sent to {email}"
        },
        services: {
            umzug: { label: "Moving", desc: "Standard move" },
            reinigung: { label: "Cleaning", desc: "Cleaning service" },
            entsorgung: { label: "Disposal", desc: "Disposal service" }
        },
        form: {
            start_address: "Start Address", end_address: "End Address", date: "Date",
            name: "Name", email: "Email", phone: "Phone",
            photos: "Photos", photos_placeholder: "Upload photos", photos_count: "{count} selected",
            placeholder_address: "Address", placeholder_name: "Name", placeholder_email: "Email", placeholder_phone: "Phone"
        },
        buttons: { back: "Back", next: "Next", finish: "Finish", submit: "Submit", sending: "Sending...", new_request: "New Request" },
        upgrades: {
            ladies_team: { title: "Ladies Team", desc: "Care team" },
            "24h_service": { title: "24h Service", desc: "Fast service" },
            furniture_opt: { title: "Furniture Opt", desc: "Optimization" },
            storage_rot: { title: "Storage", desc: "Storage service" },
            maybe_box: { title: "Maybe Box", desc: "Decision box" },
            clean_shield: { title: "Clean Shield", desc: "Protection" }
        },
        error: { submit: "Error", generic: "Error" }
    };

    const t = dict?.booking || defaultBooking;

    const [state, setState] = useState<BookingState>({
        step: 1,
        service: null,
        details: {},
        upgrades: [],
    });

    // Form State & Handlers
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [files, setFiles] = useState<File[]>([]);

    const [isSuccess, setIsSuccess] = useState(false);

    // Show lightweight shell until initialized (all hooks called above)
    if (!initialized) {
        return <div className="w-full max-w-5xl mx-auto min-h-[400px] glass rounded-3xl border border-white/10" />;
    }

    const steps = [
        { number: 1, title: t?.steps?.service || "Service" },
        { number: 2, title: t?.steps?.details || "Details" },
        { number: 3, title: t?.steps?.upgrades || "Upgrades" },
        { number: 4, title: t?.steps?.contact || "Contact" },
    ];

    const nextStep = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
    const prevStep = () => setState(prev => ({ ...prev, step: prev.step - 1 }));

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
        if (files.length > 0) {
            files.forEach(file => {
                submitData.append("file", file);
            });
        }

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                body: submitData,
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                alert(t.error.submit);
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert(t.error.generic);
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
                    <h2 className="text-3xl font-bold">{t.headings.success_title}</h2>
                    <p className="text-xl text-muted-foreground">
                        {t.headings.success_message.replace("{name}", formData.name)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {t.headings.success_email.replace("{email}", formData.email)}
                    </p>
                </div>
                <div className="pt-8">
                    <PremiumButton onClick={() => window.location.reload()}>
                        {t.buttons.new_request}
                    </PremiumButton>
                </div>
            </div>
        );
    }

    // Step 1: Service Selection
    const renderServiceSelection = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { id: "umzug", label: t?.services?.umzug?.label || "Moving", icon: Box, desc: t?.services?.umzug?.desc || "" },
                { id: "reinigung", label: t?.services?.reinigung?.label || "Cleaning", icon: Sparkles, desc: t?.services?.reinigung?.desc || "" },
                { id: "entsorgung", label: t?.services?.entsorgung?.label || "Disposal", icon: Trash2, desc: t?.services?.entsorgung?.desc || "" },
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
            <h3 className="text-2xl font-semibold mb-4 text-center">{t.headings?.details_prefix || "Details"} {t.services?.[state.service || "umzug"]?.label}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2"><MapPin size={16} /> {t.form?.start_address || "Start Address"}</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder={t.form?.placeholder_address || "Address"} />
                </div>
                {state.service === "umzug" && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2"><MapPin size={16} /> {t.form?.end_address || "End Address"}</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder={t.form?.placeholder_address || "Address"} />
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><Calendar size={16} /> {t.form.date}</label>
                <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
            </div>

            <div className="flex justify-center gap-4 pt-8">
                <PremiumButton variant="ghost" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> {t.buttons.back}
                </PremiumButton>
                <PremiumButton onClick={nextStep}>
                    {t.buttons.next} <ArrowRight className="w-4 h-4 ml-2" />
                </PremiumButton>
            </div>
        </div>
    );

    // Step 3: Intelligent Upgrades
    const renderUpgrades = () => {
        const u = t.upgrades || {};
        const relevantUpgrades = [
            { id: "ladies_team", title: u.ladies_team?.title || "Ladies Team", icon: Users, desc: u.ladies_team?.desc || "", service: ["umzug", "reinigung"] },
            { id: "24h_service", title: u["24h_service"]?.title || "24h Service", icon: Clock, desc: u["24h_service"]?.desc || "", service: ["umzug", "entsorgung", "reinigung"] },
            { id: "furniture_opt", title: u.furniture_opt?.title || "Furniture Opt", icon: Sparkles, desc: u.furniture_opt?.desc || "", service: "umzug" },
            { id: "storage_rot", title: u.storage_rot?.title || "Storage", icon: PackageOpen, desc: u.storage_rot?.desc || "", service: "umzug" },
            { id: "maybe_box", title: u.maybe_box?.title || "Maybe Box", icon: Box, desc: u.maybe_box?.desc || "", service: ["umzug", "entsorgung"] },
            { id: "clean_shield", title: u.clean_shield?.title || "Clean Shield", icon: Shield, desc: u.clean_shield?.desc || "", service: ["umzug", "entsorgung"] },
        ].filter(u => Array.isArray(u.service) ? u.service.includes(state.service || "") : u.service === state.service);

        return (
            <div className="space-y-8">
                <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold">{t.headings.upgrades_title}</h3>
                    <p className="text-muted-foreground">{t.headings.upgrades_subtitle}</p>
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
                        <ArrowLeft className="w-4 h-4 mr-2" /> {t.buttons.back}
                    </PremiumButton>
                    <PremiumButton onClick={nextStep}>
                        {t.buttons.finish} <ArrowRight className="w-4 h-4 ml-2" />
                    </PremiumButton>
                </div>
            </div>
        );
    };

    // Step 4: Summary & Contact
    const renderContact = () => {
        return (
            <div className="space-y-8 max-w-2xl mx-auto">
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{t.headings.summary_title}</h3>
                    <p className="text-muted-foreground">{t.headings.summary_subtitle}</p>
                </div>

                <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-white/10 pb-4">
                        <span className="font-semibold capitalize text-lg text-foreground">
                            {state.service ? t.services[state.service]?.label : ""}
                        </span>
                        <span className="text-primary"><CheckCircle2 className="w-5 h-5" /></span>
                    </div>

                    {state.upgrades.length > 0 && (
                        <div className="space-y-2">
                            <span className="text-sm text-muted-foreground">Extras:</span>
                            <div className="flex flex-wrap gap-2">
                                {state.upgrades.map(u => {
                                    const title = t.upgrades[u]?.title || u;
                                    return (
                                        <span key={u} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20">
                                            {title}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t.form.name} <span className="text-red-500">*</span></label>
                            <input
                                required
                                value={formData.name}
                                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                                placeholder={t.form.placeholder_name}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t.form.email} <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                                placeholder={t.form.placeholder_email}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">{t.form.phone} <span className="text-red-500">*</span></label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                            placeholder={t.form.placeholder_phone}
                        />
                    </div>

                    {/* Photo Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            {t.form.photos}
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={e => {
                                    if (e.target.files) {
                                        setFiles(Array.from(e.target.files));
                                    }
                                }}
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-foreground"
                            >
                                <Upload className="w-5 h-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    {files.length > 0
                                        ? t.form.photos_count.replace("{count}", files.length.toString())
                                        : t.form.photos_placeholder}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 pt-4">
                        <PremiumButton variant="ghost" type="button" onClick={prevStep}>
                            <ArrowLeft className="w-4 h-4 mr-2" /> {t.buttons.back}
                        </PremiumButton>
                        <PremiumButton className="w-full md:w-auto" disabled={isSubmitting}>
                            {isSubmitting ? t.buttons.sending : t.buttons.submit}
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
                <m.div
                    key={state.step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {state.step === 1 && (
                        <div className="space-y-8 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold">{t.headings.service_selection}</h2>
                                <p className="text-muted-foreground">{t.headings.service_subtitle}</p>
                            </div>
                            {renderServiceSelection()}
                        </div>
                    )}

                    {state.step === 2 && renderDetails()}

                    {state.step === 3 && renderUpgrades()}

                    {state.step === 4 && renderContact()}
                </m.div>
            </AnimatePresence>
        </div>
    );
}

// ─── Outer component: visibility gate ────────────────────────────────────
export function SmartBookingWizard({ dict }: SmartBookingWizardProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" } // start loading slightly before visible
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef}>
            {isVisible ? (
                <SmartBookingWizardInner dict={dict} />
            ) : (
                <div className="w-full max-w-5xl mx-auto min-h-[400px]" />
            )}
        </div>
    );
}
