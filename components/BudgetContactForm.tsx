"use client";

import React, { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  AlertCircle,
  Banknote,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
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
    cityOrZip: "",
    service: "umzug",
    urgency: "normal",
    preferredContact: "telefon",
    budget: "",
    message: "",
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setErrorDetails(null);

    const email = formData.email.trim();
    const emailLooksValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const hasRequiredBasics =
      formData.name.trim().length >= 2 &&
      formData.phone.trim().length >= 6 &&
      formData.budget.trim().length >= 2 &&
      emailLooksValid;

    if (!hasRequiredBasics) {
      setErrorDetails(
        emailLooksValid
          ? "Bitte Name, Telefonnummer und Preisrahmen ausfüllen. Ort/PLZ hilft bei der Einschätzung."
          : "Bitte eine gültige E-Mail eintragen oder das Feld leer lassen.",
      );
      setStatus("error");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("type", "budget_inquiry");
      fd.append("name", formData.name.trim());
      fd.append("email", email);
      fd.append("phone", formData.phone.trim());
      fd.append("cityOrZip", formData.cityOrZip.trim());
      fd.append("service", formData.service);
      fd.append("urgency", formData.urgency);
      fd.append("preferredContact", formData.preferredContact);
      fd.append("budget", formData.budget.trim());
      fd.append(
        "message",
        [
          formData.message.trim(),
          formData.cityOrZip.trim() ? `Ort/PLZ: ${formData.cityOrZip.trim()}` : "",
          `Dringlichkeit: ${formData.urgency}`,
          `Kontaktwunsch: ${formData.preferredContact}`,
        ]
          .filter(Boolean)
          .join("\n"),
      );
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
        className="glass-elevated flex flex-col items-center justify-center rounded-3xl px-6 py-16 text-center"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 shadow-[0_0_30px_rgba(16,185,129,0.08)]">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="mb-3 text-3xl font-bold tracking-tight text-slate-950">
          Preisvorstellung eingegangen
        </h3>
        <p className="max-w-md leading-relaxed text-slate-600">
          Ihre Anfrage ist sicher bei uns angekommen. FLOXANT prüft jetzt Ihre Angaben und
          gleicht Preisvorstellung, Umfang, Termin und Verfügbarkeit miteinander ab.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-10 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-600 transition-all hover:bg-blue-50 hover:text-slate-950 active:scale-95"
        >
          Neue Anfrage erstellen
        </button>
      </m.div>
    );
  }

  return (
    <div
      className={cn(
        "glass-elevated overflow-hidden rounded-3xl p-4 shadow-[0_18px_50px_rgba(15,23,42,0.1)] sm:p-8",
        className
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
            Unverbindliche Budget-Anfrage
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
            Ihre Preisvorstellung wird als zusätzlicher Hinweis gespeichert. Sie ersetzt keine
            fachliche Einschätzung und ist keine Preiszusage. Name, Telefon, Ort und Preisrahmen
            reichen für den ersten Kontakt; E-Mail ist optional.
          </p>
          <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-blue-700">
            Anfrage auf Deutsch oder Englisch möglich: cleaning service, moving help, quote check
            oder house clearance reichen als Stichwort.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                required
                type="text"
                placeholder="Max Mustermann"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              E-Mail optional
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="name@beispiel.de"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              Telefonnummer
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                required
                type="tel"
                placeholder="+49 123 4567890"
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              Ort / PLZ
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="z.B. Düsseldorf, Regensburg, Neuss"
                value={formData.cityOrZip}
                onChange={(event) => setFormData({ ...formData, cityOrZip: event.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              Projekt-Art
            </label>
            <select
              value={formData.service}
              onChange={(event) => setFormData({ ...formData, service: event.target.value })}
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-6 py-4 text-slate-950 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40"
            >
              <option value="umzug">Umzug und Transport / Moving help</option>
              <option value="reinigung">Reinigung / Cleaning service</option>
              <option value="solarreinigung">Solar- / PV-Reinigung / Solar panel cleaning</option>
              <option value="glas_fassade_event">Glas, Fassade oder Eventreinigung / Glass cleaning</option>
              <option value="entsorgung">Entrümpelung / Decluttering</option>
              <option value="nachlass_lager">Keller, Nachlass oder Lagerauflösung / House clearance</option>
              <option value="mini_transport">Mini-Umzug, Express oder Möbeltransport / Small move</option>
              <option value="signature">Fairpreis, Plan B oder Übergabe-Service / Second opinion</option>
              <option value="mixed">Kombination</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              Dringlichkeit
            </label>
            <div className="relative">
              <Clock3 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={formData.urgency}
                onChange={(event) => setFormData({ ...formData, urgency: event.target.value })}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-950 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40"
              >
                <option value="normal">Normal, Termin ist flexibel</option>
                <option value="soon">Bald, innerhalb von 7 Tagen</option>
                <option value="urgent">Dringend, Deadline steht</option>
                <option value="offer_check">Erst Angebot / Preis prüfen</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              Kontaktwunsch
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={formData.preferredContact}
                onChange={(event) => setFormData({ ...formData, preferredContact: event.target.value })}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-950 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40"
              >
                <option value="telefon">Telefon</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">E-Mail</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
            Ihre Preisvorstellung
          </label>
          <div className="relative">
            <Banknote className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              required
              type="text"
              placeholder="z.B. 600 bis 900 EUR"
              value={formData.budget}
              onChange={(event) => setFormData({ ...formData, budget: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40"
            />
          </div>
          <p className="ml-1 text-[10px] italic text-slate-500">
            Nennen Sie Ihren Rahmen in Kundensprache. FLOXANT prüft danach, welche Leistung dazu
            realistisch passt.
          </p>
        </div>

        <div className="space-y-2">
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
            Zusatzinfos
          </label>
          <textarea
            rows={3}
            placeholder="Ein paar Details zu Ihrem Projekt, z.B. Termin, Umfang oder besondere Bedingungen."
            value={formData.message}
            onChange={(event) => setFormData({ ...formData, message: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-white p-6 text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40"
          />
        </div>

        {errorDetails && status === "error" ? (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
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
              ? "cursor-not-allowed bg-slate-300"
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
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  Übertrage...
                </span>
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
          <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase text-slate-500">
            <Sparkles size={10} className="text-blue-600" />
            100% unverbindlich
          </div>
          <div className="h-1 w-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase text-slate-500">
            <CheckCircle2 size={10} className="text-emerald-600" />
            Für die Einschätzung vorbereitet
          </div>
        </div>
      </form>
    </div>
  );
}
