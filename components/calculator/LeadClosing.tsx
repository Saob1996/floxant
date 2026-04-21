"use client";

import React, { useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  CheckCircle2,
  PhoneCall,
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  Info,
  TrendingUp,
  Sparkles,
  AlertCircle,
  Wallet,
} from "lucide-react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { serializeIntakeStore } from "@/lib/utils/intake-serialization";
import { company } from "@/lib/company";
import FloxButton from "./ui/FloxButton";
import { cn } from "@/lib/utils";

const CALLBACK_OPTIONS = ["jederzeit", "vormittags", "nachmittags", "abends"] as const;

function formatEuro(value: number | undefined): string {
  return new Intl.NumberFormat("de-DE").format(value || 0);
}

export default function LeadClosing({ dic, onBack }: { dic?: any; onBack: () => void }) {
  const store = useCalculatorStore();
  const serviceType = store.serviceType;
  const leadDetails = store.leadDetails;
  const estimate = store.advancedEstimate;
  const updateLeadDetails = store.updateLeadDetails;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const canSend = useMemo(() => {
    return (
      leadDetails.customerName.trim().length >= 2 &&
      leadDetails.customerPhone.trim().length >= 6 &&
      leadDetails.customerEmail.includes("@")
    );
  }, [leadDetails]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend || isSubmitting) return;

    setIsSubmitting(true);
    setIsError(false);

    try {
      const payload = serializeIntakeStore(store);

      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Übertragung fehlgeschlagen");
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setIsError(true);
      setErrorMessage(err.message || "Ein unerwarteter Fehler ist aufgetreten.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const range = estimate?.priceRange || { min: 0, max: 0 };
    const lines = [
      `Neue Anfrage: ${serviceType || "service"}`,
      `Kunde: ${leadDetails.customerName}`,
      `Telefon: ${leadDetails.customerPhone}`,
      `E-Mail: ${leadDetails.customerEmail}`,
      `Rückruf: ${leadDetails.callbackTime || "jederzeit"}`,
      `System-Orientierungsrahmen: ${range.min} EUR - ${range.max} EUR`,
      `Einordnung: ${estimate?.valuationStage || "Erste Einschätzung"}`,
      `Basis: ${estimate?.calculationBasis || "Individuell"}`,
      `Zeitansatz: ${estimate?.estimatedHours || "offen"}`,
      leadDetails.customerBudget.trim()
        ? `Preisvorstellung: ${leadDetails.customerBudget.trim()}`
        : "",
      estimate?.topDrivers?.length
        ? `Wichtige Treiber: ${estimate.topDrivers.slice(0, 3).join(", ")}`
        : "",
      `Hinweis: Vorläufige Vorprüfung, keine Preiszusage.`,
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join("\n"));
    const phoneClean = company.phoneRaw.replace(/\+/g, "").replace(/\s/g, "");
    window.open(`https://wa.me/${phoneClean}?text=${message}`, "_blank");
  };

  if (isSuccess) {
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-[3rem] border border-white/10 bg-white/[0.02] py-20 text-center backdrop-blur-3xl"
      >
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
          <CheckCircle2 size={40} className="text-emerald-500" />
        </div>
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white">Vorprüfung übergeben</h2>
        <p className="mx-auto mb-12 max-w-md font-medium text-white/40">
          FLOXANT prüft Ihre Angaben jetzt fachlich und meldet sich in der Regel noch am selben
          Werktag persönlich bei Ihnen.
        </p>
        <FloxButton variant="secondary" onClick={() => window.location.reload()}>
          Fertig
        </FloxButton>
      </m.div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
      <div className="relative overflow-hidden rounded-[3rem] border border-white/8 bg-white/[0.02] p-8 backdrop-blur-2xl lg:col-span-7 lg:p-12">
        <div className="relative z-10 mb-10">
          <button
            type="button"
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/40 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Zurück zur Vorprüfung
          </button>
          <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white">
            Projekt <span className="text-blue-500">Abschluss</span>
          </h2>
          <p className="font-medium text-white/40">
            Ihre Konfiguration ist bereit für die fachliche Prüfung. Der Preisrahmen bleibt
            unverbindlich und dient als belastbare Vorprüfung.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FieldBox label="Ihr Name" icon={<User size={14} className="text-blue-500" />}>
              <input
                required
                disabled={isSubmitting}
                type="text"
                placeholder="Max Mustermann"
                className="w-full bg-transparent font-semibold text-white outline-none placeholder:text-white/20 disabled:opacity-50"
                value={leadDetails.customerName}
                onChange={(e) => updateLeadDetails({ customerName: e.target.value })}
              />
            </FieldBox>
            <FieldBox label="Telefon" icon={<Phone size={14} className="text-blue-500" />}>
              <input
                required
                disabled={isSubmitting}
                type="tel"
                placeholder="+49 123 456789"
                className="w-full bg-transparent font-semibold text-white outline-none placeholder:text-white/20 disabled:opacity-50"
                value={leadDetails.customerPhone}
                onChange={(e) => updateLeadDetails({ customerPhone: e.target.value })}
              />
            </FieldBox>
          </div>

          <FieldBox label="E-Mail Adresse" icon={<Mail size={14} className="text-blue-500" />}>
            <input
              required
              disabled={isSubmitting}
              type="email"
              placeholder="max@beispiel.de"
              className="w-full bg-transparent font-bold text-white outline-none placeholder:text-white/20 disabled:opacity-50"
              value={leadDetails.customerEmail}
              onChange={(e) => updateLeadDetails({ customerEmail: e.target.value })}
            />
          </FieldBox>

          <FieldBox
            label="Zielbudget / Preisvorstellung (optional)"
            icon={<Wallet size={14} className="text-blue-500" />}
          >
            <input
              disabled={isSubmitting}
              type="text"
              placeholder="z. B. 2.800 EUR"
              className="w-full bg-transparent font-bold text-white outline-none placeholder:text-white/20 disabled:opacity-50"
              value={leadDetails.customerBudget}
              onChange={(e) => updateLeadDetails({ customerBudget: e.target.value })}
            />
            <p className="text-[11px] font-medium leading-relaxed text-white/35">
              Hilft uns, Leistungsumfang und Prioritäten besser einzuordnen. Überschreibt die
              System-Einschätzung nicht.
            </p>
          </FieldBox>

          <div className="rounded-[2rem] border border-white/5 bg-white/[0.01] p-6">
            <label className="mb-4 flex items-center gap-2 label-premium !text-white/30">
              <PhoneCall size={12} className="text-blue-500" />
              Bester Zeitpunkt für Rückfragen
            </label>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {CALLBACK_OPTIONS.map((time) => (
                <button
                  key={time}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => updateLeadDetails({ callbackTime: time })}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] transition-all",
                    leadDetails.callbackTime === time
                      ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "border-white/5 bg-white/5 text-white/30 hover:border-white/10 hover:text-white/50"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {isError ? (
              <m.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-200"
              >
                <AlertCircle size={16} className="shrink-0" />
                <p>
                  <strong>Ups:</strong> {errorMessage} Bitte nutzen Sie bei Bedarf den direkten
                  WhatsApp-Kontakt.
                </p>
              </m.div>
            ) : null}
          </AnimatePresence>

          <div className="flex flex-col gap-4 pt-6 md:flex-row">
            <FloxButton className="flex-1" variant="primary" disabled={!canSend || isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Wird übermittelt...
                </span>
              ) : (
                "Vorprüfung senden und prüfen lassen"
              )}
            </FloxButton>

            <button
              type="button"
              onClick={handleWhatsApp}
              disabled={!canSend && !isError}
              className={cn(
                "flex flex-1 items-center justify-center gap-3 rounded-2xl border px-8 py-5 text-[11px] font-bold uppercase tracking-[0.14em] transition-all",
                isError
                  ? "scale-[1.02] animate-pulse border-emerald-400 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                  : canSend
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    : "cursor-not-allowed border-white/5 bg-white/5 text-white/20"
              )}
            >
              <MessageSquare size={16} />
              WhatsApp Direktkontakt
            </button>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">DSGVO Konform</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">SSL Verschlüsselt</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 lg:col-span-5">
        <div className="relative overflow-hidden rounded-[3rem] border border-blue-500/20 bg-gradient-to-br from-blue-600/20 to-indigo-600/10 p-10">
          <div className="absolute right-0 top-0 p-8 opacity-10">
            <TrendingUp size={120} />
          </div>

          <div className="relative z-10">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              <Sparkles size={10} />
              Vorläufige Einordnung
            </span>
            <h3 className="mb-4 text-2xl font-bold tracking-tight text-white">
              Ihr Orientierungsrahmen
            </h3>
            <div className="mb-5 flex items-baseline gap-2 text-white">
              <span className="text-5xl font-semibold tracking-tight">{formatEuro(estimate?.priceRange?.min)}</span>
              <span className="text-xl opacity-20">-</span>
              <span className="text-5xl font-semibold tracking-tight">{formatEuro(estimate?.priceRange?.max)}</span>
              <span className="ml-2 text-2xl font-semibold text-blue-500">EUR</span>
            </div>

            <div className="mb-5 inline-flex rounded-full bg-white/10 px-3 py-1 label-premium !text-white/75">
              {estimate?.valuationStage || "Erste Einschätzung"}
            </div>

            <p className="text-sm font-medium leading-relaxed text-white/70">
              {estimate?.priceExplanation ||
                "Diese Einordnung basiert auf Ihren Angaben und wird mit mehr Details belastbarer."}
            </p>

            {leadDetails.customerBudget.trim() ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Ihre Preisvorstellung
                </span>
                <p className="mt-2 text-lg font-bold text-white">{leadDetails.customerBudget}</p>
              </div>
            ) : null}

            {estimate?.topDrivers?.length ? (
              <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
                {estimate.topDrivers.map((driver) => (
                  <div key={driver} className="flex items-center gap-3 text-white/55">
                    <div className="h-1 w-1 rounded-full bg-blue-500" />
                    <span className="text-sm font-bold">{driver}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
              <Info size={20} className="text-blue-500" />
            </div>
            <p className="text-xs font-medium leading-relaxed text-white/40">
              FLOXANT nutzt Ihre Angaben für die fachliche Vorprüfung, Rückfragen und die
              spätere Angebotsvorbereitung. Keine Preiszusage, kein Spam, keine Weitergabe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldBox({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-inner transition-all hover:border-white/20 hover:bg-white/[0.05]">
      <label className="flex items-center gap-2 label-premium !text-white/30">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
