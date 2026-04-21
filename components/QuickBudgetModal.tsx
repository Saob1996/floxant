"use client";

import { m, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, Phone, Banknote, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface QuickBudgetModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const serviceOptions = [
    { value: "umzug", label: "Umzug" },
    { value: "reinigung", label: "Reinigung" },
    { value: "entsorgung", label: "Entrümpelung" },
    { value: "bueroumzug", label: "Büroumzug" },
    { value: "firmenentsorgung", label: "Firmenentsorgung" },
    { value: "leerfahrt", label: "Leer-Rückfahrt" },
    { value: "beiladung", label: "Beiladung" },
];

export function QuickBudgetModal({ isOpen, onClose }: QuickBudgetModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        service: "umzug",
        name: "",
        email: "",
        phone: "",
        budget: "",
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();
        submitData.append("type", "budget_inquiry");
        submitData.append("service", formData.service);
        submitData.append("name", formData.name);
        submitData.append("email", formData.email);
        submitData.append("phone", formData.phone);
        submitData.append("budget", formData.budget);
        submitData.append("message", `Preisvorschlag über den Navigations-Button für ${formData.service}`);
        submitData.append("details", JSON.stringify({ budget: formData.budget, service: formData.service, source: "nav_pinned_button" }));
        submitData.append("timestamp", new Date().toISOString());

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                body: submitData,
            });

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    onClose();
                    setIsSuccess(false);
                    setFormData({ service: "umzug", name: "", email: "", phone: "", budget: "" });
                }, 3000);
            }
        } catch (error) {
            console.error("Budget inquiry failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto px-4 py-8 sm:items-center sm:py-10">
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
                    />

                    <m.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="quick-budget-title"
                        className="relative z-[10000] w-full max-w-lg max-h-[calc(100dvh-4rem)] overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0B0D12] p-6 shadow-2xl md:max-h-[calc(100dvh-5rem)] md:rounded-[2.5rem] md:p-12"
                    >
                        {/* Status Decoration */}
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
                        
                        <button
                            type="button"
                            aria-label="Preisvorschlag-Dialog schließen"
                            onClick={onClose}
                            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white/40 transition-all hover:bg-white/10 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        {isSuccess ? (
                            <div className="flex flex-col items-center py-12 text-center">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                                    <ShieldCheck size={40} />
                                </div>
                                <h2 id="quick-budget-title" className="mb-2 text-3xl font-bold text-white">Anfrage gesendet!</h2>
                                <p className="text-lg text-white/50">Wir melden uns zeitnah mit einer sauberen Einordnung bei Ihnen.</p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-10 text-center md:text-left">
                                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-400">
                                        <Banknote size={14} />
                                        <span>Preisvorschlag / Budget-Check</span>
                                    </div>
                                    <h2 id="quick-budget-title" className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                                        Ihr Budget, <br className="hidden md:block" />
                                        unsere Planung.
                                    </h2>
                                    <p className="mt-4 text-white/50">
                                        Nennen Sie uns Ihren Rahmen. Ihre Preisvorstellung ersetzt keine Prüfung, hilft aber bei der realistischen Einordnung von Leistung, Umfang und nächstem Schritt.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-white/30">
                                            Service
                                        </label>
                                        <select
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                            className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white outline-none transition-all focus:border-blue-500/50 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/5"
                                        >
                                            {serviceOptions.map((option) => (
                                                <option key={option.value} value={option.value} className="bg-[#0B0D12]">
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="group relative">
                                        <div className="absolute inset-y-0 left-5 flex items-center text-white/30 transition-colors group-focus-within:text-blue-400">
                                            <User size={18} />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            aria-label="Name"
                                            placeholder="Ihr Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-6 text-white outline-none transition-all focus:border-blue-500/50 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/5"
                                        />
                                    </div>

                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div className="group relative">
                                            <div className="absolute inset-y-0 left-5 flex items-center text-white/30 transition-colors group-focus-within:text-blue-400">
                                                <Mail size={18} />
                                            </div>
                                            <input
                                                required
                                                type="email"
                                                aria-label="E-Mail-Adresse"
                                                placeholder="E-Mail-Adresse"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-6 text-white outline-none transition-all focus:border-blue-500/50 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/5"
                                            />
                                        </div>

                                        <div className="group relative">
                                            <div className="absolute inset-y-0 left-5 flex items-center text-white/30 transition-colors group-focus-within:text-blue-400">
                                                <Phone size={18} />
                                            </div>
                                            <input
                                                required
                                                type="tel"
                                                aria-label="Telefonnummer"
                                                placeholder="Telefonnummer"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-6 text-white outline-none transition-all focus:border-blue-500/50 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/5"
                                            />
                                        </div>
                                    </div>

                                    <div className="group relative">
                                        <div className="absolute inset-y-0 left-5 flex items-center text-white/30 transition-colors group-focus-within:text-blue-400">
                                            <Banknote size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            aria-label="Preisvorstellung oder Zielbudget"
                                            placeholder="Preisvorstellung / Zielbudget (optional)"
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-6 text-white outline-none transition-all focus:border-blue-500/50 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/5"
                                        />
                                    </div>

                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="group relative flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-blue-600 font-bold uppercase tracking-wider text-white shadow-xl shadow-blue-900/40 transition-all hover:bg-blue-500 hover:shadow-blue-900/60 disabled:opacity-50"
                                    >
                                        <span className="relative z-10">
                                            {isSubmitting ? "Wird gesendet..." : "Jetzt Vorschlag senden"}
                                        </span>
                                        {!isSubmitting && <Send size={18} className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                                    </button>

                                    <p className="text-center text-[10px] uppercase tracking-widest text-white/20">
                                        Unverbindlich. Ihre Preisvorstellung ergänzt die Vorprüfung.
                                    </p>
                                </form>
                            </>
                        )}
                    </m.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
