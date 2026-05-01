"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Info,
  Mail,
  MessageSquare,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
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
      "Hallo FLOXANT,",
      `ich moechte meine Vorpruefung fuer ${serviceType || "den Service"} per WhatsApp weiterfuehren.`,
      `Name: ${leadDetails.customerName}`,
      `Telefon: ${leadDetails.customerPhone}`,
      `E-Mail: ${leadDetails.customerEmail}`,
      `Rueckrufzeit: ${leadDetails.callbackTime || "jederzeit"}`,
      `System-Orientierungsrahmen: ${range.min} EUR - ${range.max} EUR`,
      `Einordnung: ${estimate?.valuationStage || "Erste Einschaetzung"}`,
      `Basis: ${estimate?.calculationBasis || "Individuell"}`,
      `Zeitansatz: ${estimate?.estimatedHours || "offen"}`,
      leadDetails.customerBudget.trim()
        ? `Preisvorstellung: ${leadDetails.customerBudget.trim()}`
        : "",
      estimate?.topDrivers?.length
        ? `Wichtige Treiber: ${estimate.topDrivers.slice(0, 3).join(", ")}`
        : "",
      "Hinweis: Vorlaeufige Vorpruefung, keine Preiszusage.",
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join("\n"));
    const phoneClean = company.phoneRaw.replace(/\+/g, "").replace(/\s/g, "");
    window.open(`https://wa.me/${phoneClean}?text=${message}`, "_blank");
  };

  if (isSuccess) {
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-elevated rounded-[3rem] py-20 text-center shadow-[0_30px_90px_rgba(15,23,42,0.12)]"
      >
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-950">
          Vorprüfung übergeben
        </h2>
        <p className="mx-auto mb-12 max-w-md text-base leading-7 text-slate-600">
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
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
      <div className="glass-elevated relative overflow-hidden rounded-[3rem] p-8 shadow-[0_30px_90px_rgba(15,23,42,0.12)] lg:col-span-7 lg:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.08),transparent_24%)]" />

        <div className="relative z-10 mb-10">
          <button
            type="button"
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Zurück zur Vorprüfung
          </button>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-950">
            Anfrage realistisch prüfen lassen
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Ihre Konfiguration ist bereit für die fachliche Prüfung. Der Preisrahmen bleibt
            unverbindlich, bis Umfang, Zugang, Termin und Zusatzleistungen bestätigt sind.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FieldBox label="Ihr Name" icon={<User size={14} className="text-blue-600" />}>
              <input
                required
                disabled={isSubmitting}
                type="text"
                placeholder="Max Mustermann"
                className="w-full bg-transparent font-semibold text-slate-950 outline-none placeholder:text-slate-400 disabled:opacity-50"
                value={leadDetails.customerName}
                onChange={(e) => updateLeadDetails({ customerName: e.target.value })}
              />
            </FieldBox>
            <FieldBox label="Telefon" icon={<Phone size={14} className="text-blue-600" />}>
              <input
                required
                disabled={isSubmitting}
                type="tel"
                placeholder="+49 123 456789"
                className="w-full bg-transparent font-semibold text-slate-950 outline-none placeholder:text-slate-400 disabled:opacity-50"
                value={leadDetails.customerPhone}
                onChange={(e) => updateLeadDetails({ customerPhone: e.target.value })}
              />
            </FieldBox>
          </div>

          <FieldBox label="E-Mail Adresse" icon={<Mail size={14} className="text-blue-600" />}>
            <input
              required
              disabled={isSubmitting}
              type="email"
              placeholder="max@beispiel.de"
              className="w-full bg-transparent font-semibold text-slate-950 outline-none placeholder:text-slate-400 disabled:opacity-50"
              value={leadDetails.customerEmail}
              onChange={(e) => updateLeadDetails({ customerEmail: e.target.value })}
            />
          </FieldBox>

          <FieldBox
            label="Zielbudget / Preisvorstellung (optional)"
            icon={<Wallet size={14} className="text-blue-600" />}
          >
            <input
              disabled={isSubmitting}
              type="text"
              placeholder="z. B. 2.800 EUR"
              className="w-full bg-transparent font-semibold text-slate-950 outline-none placeholder:text-slate-400 disabled:opacity-50"
              value={leadDetails.customerBudget}
              onChange={(e) => updateLeadDetails({ customerBudget: e.target.value })}
            />
            <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
              Hilft uns, Leistungsumfang und Prioritäten besser einzuordnen. Überschreibt die
              System-Einschätzung nicht und ersetzt kein geprüftes Angebot.
            </p>
          </FieldBox>

          <div className="rounded-[2rem] border border-slate-200 bg-white/86 p-6 shadow-sm shadow-slate-950/5">
            <label className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
              <PhoneCall size={12} className="text-blue-600" />
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
                    "rounded-xl border px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] transition-all",
                    leadDetails.callbackTime === time
                      ? "border-blue-200 bg-blue-600 text-white shadow-[0_16px_36px_rgba(37,99,235,0.22)]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
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
                className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle size={16} className="shrink-0" />
                <p>
                  <strong>Ups:</strong> {errorMessage} Bitte nutzen Sie bei Bedarf den direkten
                  WhatsApp-Kontakt.
                </p>
              </m.div>
            ) : null}
          </AnimatePresence>

          <div className="flex flex-col gap-4 pt-2 md:flex-row">
            <FloxButton className="flex-1 py-4 text-[11px]" variant="primary" disabled={!canSend || isSubmitting}>
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
                "Fall senden und realistisch prüfen lassen"
              )}
            </FloxButton>

            <button
              type="button"
              onClick={handleWhatsApp}
              disabled={!canSend && !isError}
              className={cn(
                "flex flex-1 items-center justify-center gap-3 rounded-[1.35rem] border px-8 py-4 text-[11px] font-black uppercase tracking-[0.14em] transition-all",
                isError
                  ? "scale-[1.01] border-emerald-300 bg-[linear-gradient(135deg,#16a34a_0%,#059669_100%)] text-white shadow-[0_20px_44px_rgba(5,150,105,0.24)]"
                  : canSend
                    ? "border-emerald-200 bg-[linear-gradient(180deg,rgba(236,253,245,0.98),rgba(220,252,231,0.96))] text-emerald-800 shadow-[0_14px_34px_rgba(5,150,105,0.12)] hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_18px_40px_rgba(5,150,105,0.16)]"
                    : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
              )}
            >
              <MessageSquare size={16} />
              Preisrahmen per WhatsApp
            </button>
          </div>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-600" />
            DSGVO-konform
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-600" />
            SSL-verschlüsselt
          </div>
        </div>
      </div>

      <div className="space-y-6 lg:col-span-5">
        <div className="rounded-[3rem] bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-8 text-white shadow-[0_30px_80px_rgba(37,99,235,0.24)]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
            <Sparkles size={10} />
            Vorläufige Einordnung
          </div>
          <h3 className="mb-4 text-2xl font-bold tracking-tight">Ihr Orientierungsrahmen</h3>
          <div className="mb-5 flex items-end gap-2">
            <span className="text-4xl font-bold tracking-tight lg:text-5xl">
              {formatEuro(estimate?.priceRange?.min)}
            </span>
            <span className="pb-1 text-xl text-blue-100/85">-</span>
            <span className="text-4xl font-bold tracking-tight lg:text-5xl">
              {formatEuro(estimate?.priceRange?.max)}
            </span>
            <span className="pb-1 text-lg font-black uppercase tracking-[0.14em] text-blue-100">
              EUR
            </span>
          </div>

          <div className="mb-5 inline-flex rounded-full border border-white/16 bg-white/14 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/92">
            {estimate?.valuationStage || "Erste Einschätzung"}
          </div>

          <p className="text-sm leading-7 text-blue-50/92">
            {estimate?.priceExplanation ||
              "Diese Einordnung basiert auf Ihren Angaben und wird mit mehr Details belastbarer."}
          </p>

          {leadDetails.customerBudget.trim() ? (
            <div className="mt-6 rounded-2xl border border-white/18 bg-white/14 p-4">
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-100/82">
                Ihre Preisvorstellung
              </span>
              <p className="mt-2 text-lg font-bold text-white">{leadDetails.customerBudget}</p>
            </div>
          ) : null}

          {estimate?.topDrivers?.length ? (
            <div className="mt-8 space-y-4 border-t border-white/14 pt-8">
              {estimate.topDrivers.map((driver) => (
                <div key={driver} className="flex items-center gap-3 text-blue-50/90">
                  <TrendingUp size={14} className="shrink-0 text-blue-100" />
                  <span className="text-sm font-semibold">{driver}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="glass-elevated rounded-[2.3rem] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <Info size={20} className="text-blue-600" />
            </div>
            <p className="text-sm leading-7 text-slate-600">
              FLOXANT nutzt Ihre Angaben für die fachliche Vorprüfung, Rückfragen und die spätere
              Angebotsvorbereitung. Keine Preiszusage, kein Spam, keine Weitergabe.
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
    <label className="block rounded-[1.7rem] border border-slate-200 bg-white/92 px-5 py-4 shadow-sm shadow-slate-950/5">
      <span className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}
