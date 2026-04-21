"use client";

import React, { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  AlertCircle,
  Banknote,
  CheckCircle2,
  Mail,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BudgetContactFormProps {
  className?: string;
}

export function BudgetContactForm({ className }: BudgetContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "umzug",
    budget: "",
    message: "",
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setErrorDetails(null);

    try {
      const fd = new FormData();
      fd.append("type", "budget_inquiry");
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("service", formData.service);
      fd.append("budget", formData.budget);
      fd.append("message", formData.message);
      fd.append("timestamp", new Date().toISOString());

      const response = await fetch("/api/bookings", {
        method: "POST",
        body: fd,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || data.error || "Unbekannter Serverfehler");
      }

      setStatus("success");
    } catch (error: any) {
      setErrorDetails(error?.message || "Übertragung fehlgeschlagen");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  }

  if (status === "success") {
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-3xl border border-emerald-500/20 bg-white/[0.02] px-6 py-16 text-center shadow-2xl shadow-emerald-500/5"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="mb-3 text-3xl font-bold tracking-tight text-white">Preisvorstellung eingegangen</h3>
        <p className="max-w-md leading-relaxed text-white/55">
          Ihre Anfrage ist sicher bei uns angekommen. FLOXANT prüft jetzt Ihre Angaben und
          gleicht Preisvorstellung, Umfang und Einsatzlogik miteinander ab.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-10 rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white/60 transition-all hover:bg-white/10 hover:text-white active:scale-95"
        >
          Neue Anfrage erstellen
        </button>
      </m.div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-white/10 bg-[#0F1116] p-4 shadow-2xl sm:p-8",
        className
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400/80">
            Unverbindliche Budget-Anfrage
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
            Ihre Preisvorstellung wird als zusätzliches Signal gespeichert. Sie ersetzt keine
            fachliche Vorprüfung und ist keine Preiszusage.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-white/40">Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
              <input
                required
                type="text"
                placeholder="Max Mustermann"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] py-4 pl-12 pr-4 text-white placeholder-white/20 outline-none transition-all focus:border-blue-500/50 focus:bg-white/[0.05]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-white/40">E-Mail Adresse</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
              <input
                required
                type="email"
                placeholder="name@beispiel.de"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] py-4 pl-12 pr-4 text-white placeholder-white/20 outline-none transition-all focus:border-blue-500/50 focus:bg-white/[0.05]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-white/40">Telefonnummer</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
              <input
                required
                type="tel"
                placeholder="+49 123 4567890"
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] py-4 pl-12 pr-4 text-white placeholder-white/20 outline-none transition-all focus:border-blue-500/50 focus:bg-white/[0.05]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-white/40">Projekt-Art</label>
            <select
              value={formData.service}
              onChange={(event) => setFormData({ ...formData, service: event.target.value })}
              className="w-full appearance-none rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-4 text-white outline-none transition-all focus:border-blue-500/50 focus:bg-white/[0.05]"
            >
              <option value="umzug" className="bg-[#0F1116]">
                Umzug und Transport
              </option>
              <option value="reinigung" className="bg-[#0F1116]">
                Reinigung
              </option>
              <option value="entsorgung" className="bg-[#0F1116]">
                Entrümpelung
              </option>
              <option value="mixed" className="bg-[#0F1116]">
                Kombination
              </option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-white/40">
            Ihre Preisvorstellung
          </label>
          <div className="relative">
            <Banknote className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
            <input
              required
              type="text"
              placeholder="z.B. 600 bis 900 EUR"
              value={formData.budget}
              onChange={(event) => setFormData({ ...formData, budget: event.target.value })}
              className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] py-4 pl-12 pr-4 text-white placeholder-white/20 outline-none transition-all focus:border-blue-500/50 focus:bg-white/[0.05]"
            />
          </div>
          <p className="ml-1 text-[10px] italic text-white/25">
            Nennen Sie Ihren Rahmen in Kundensprache. FLOXANT prüft danach, welche Leistung dazu
            realistisch passt.
          </p>
        </div>

        <div className="space-y-2">
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-white/40">
            Zusatzinfos
          </label>
          <textarea
            rows={3}
            placeholder="Ein paar Details zu Ihrem Projekt, z.B. Termin, Umfang oder besondere Bedingungen."
            value={formData.message}
            onChange={(event) => setFormData({ ...formData, message: event.target.value })}
            className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-white placeholder-white/20 outline-none transition-all focus:border-blue-500/50 focus:bg-white/[0.05]"
          />
        </div>

        {errorDetails && status === "error" ? (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{errorDetails}</span>
          </div>
        ) : null}

        <button
          disabled={status === "loading"}
          type="submit"
          className={cn(
            "group relative flex h-16 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl shadow-xl transition-all duration-300",
            status === "loading"
              ? "cursor-not-allowed bg-white/10"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
          )}
        >
          <AnimatePresence mode="wait">
            {status === "loading" ? (
              <m.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Übertrage...</span>
              </m.div>
            ) : (
              <m.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  Unverbindlich absenden
                </span>
                <Send
                  size={16}
                  className="text-white/70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </m.div>
            )}
          </AnimatePresence>
        </button>

        <div className="flex items-center justify-center gap-4 py-2">
          <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase text-white/30">
            <Sparkles size={10} className="text-blue-400" />
            100% unverbindlich
          </div>
          <div className="h-1 w-1 rounded-full bg-white/10" />
          <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase text-white/30">
            <CheckCircle2 size={10} className="text-emerald-500" />
            Für die Vorprüfung vorbereitet
          </div>
        </div>
      </form>
    </div>
  );
}
