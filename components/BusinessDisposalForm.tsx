"use client";

import { AnimatePresence, m } from "framer-motion";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  PackageOpen,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";

const initialState = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  location: "",
  preferredDate: "",
  volumeEstimate: "",
  materialTypes: "",
  access: "",
  budget: "",
  note: "",
};

function parseBudget(value: string) {
  const normalized = value.replace(/[^\d.,-]/g, "").replace(/\./g, "").replace(",", ".");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null;
}

export function BusinessDisposalForm() {
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    const budget = parseBudget(form.budget);
    const details = {
      contact: {
        fullName: `${form.contactName.trim()}${form.companyName.trim() ? ` | ${form.companyName.trim()}` : ""}`,
        email: form.email.trim(),
        phone: form.phone.trim(),
        callbackPreference: "werktags",
        notes: form.note.trim(),
      },
      service: {
        type: "firmenentsorgung",
        source: "business_disposal_page",
        entryPoint: "/firmenentsorgung",
        presetFromUrl: "firmenentsorgung",
      },
      valuation: {
        systemPriceRangeMin: 0,
        systemPriceRangeMax: 0,
        priceRangeMin: 0,
        priceRangeMax: 0,
        valuationLabel: "Firmenentsorgung Anfrage",
        valuationStage: "B2B-Vorprüfung",
        accuracyState: "Erste Einschätzung",
        topDrivers: ["Büroinventar", "Volumen", "Zugang und Terminfenster"],
        customerBudget: budget,
        priceSuggestion: budget,
        priceExplanation:
          "Die Anfrage betrifft nicht erlaubnispflichtige Büro- und Gewerbegegenstände. FLOXANT prüft Volumen, Zugang, Materialarten und Terminfenster.",
        pricingSignals: {
          inquiryMode: "business_disposal",
          companyName: form.companyName.trim(),
          volumeEstimate: form.volumeEstimate.trim(),
          materialTypes: form.materialTypes.trim(),
          access: form.access.trim(),
        },
      },
      configuration: {
        requestContext: "business_disposal",
        companyName: form.companyName.trim(),
        location: form.location.trim(),
        preferredDate: form.preferredDate,
        volumeEstimate: form.volumeEstimate.trim(),
        materialTypes: form.materialTypes.trim(),
        access: form.access.trim(),
        customerMessage: form.note.trim(),
      },
      metadata: {
        createdAt: new Date().toISOString(),
        intakeVersion: "1.2.0",
        source: "business_disposal_page",
        servicePresetFromUrl: "firmenentsorgung",
      },
    };

    const submitData = new FormData();
    submitData.append("type", "business_disposal");
    submitData.append("service", "firmenentsorgung");
    submitData.append("name", form.contactName.trim() || form.companyName.trim());
    submitData.append("email", form.email.trim());
    submitData.append("phone", form.phone.trim());
    submitData.append("budget", form.budget.trim());
    submitData.append("message", form.note.trim());
    submitData.append("details", JSON.stringify(details));
    submitData.append("timestamp", new Date().toISOString());

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) throw new Error("Business disposal submit failed");

      setIsSuccess(true);
      setForm(initialState);
    } catch (error) {
      console.error("Business disposal inquiry failed:", error);
      alert("Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie FLOXANT direkt.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="glass-elevated relative isolate overflow-hidden rounded-[2.2rem] border border-slate-200/90 bg-white/98 p-6 text-slate-950 shadow-[0_18px_50px_rgba(15,23,42,0.1)]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,250,255,0.96))]" />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <m.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-12 text-center"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-950">Firmenanfrage gesendet</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
                FLOXANT prüft jetzt Volumen, Materialarten, Zugang und Terminfenster. Wir melden uns
                mit einer sauberen B2B-Einordnung.
              </p>
            </m.div>
          ) : (
            <m.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700">B2B-Anfrage</div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  Firmenentsorgung prüfen lassen
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Für Büroinventar, Möbel, Kartons, Verpackung und normale Gewerbegegenstände ohne Sondergenehmigung.
                </p>
              </div>

              <Input icon={Building2} label="Firma" value={form.companyName} onChange={(value) => update("companyName", value)} required />
              <div className="grid gap-3 md:grid-cols-2">
                <Input icon={User} label="Ansprechpartner" value={form.contactName} onChange={(value) => update("contactName", value)} required />
                <Input icon={Phone} label="Telefon" value={form.phone} onChange={(value) => update("phone", value)} type="tel" required />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Input icon={Mail} label="E-Mail" value={form.email} onChange={(value) => update("email", value)} type="email" />
                <Input icon={Calendar} label="Wunschtermin" value={form.preferredDate} onChange={(value) => update("preferredDate", value)} type="date" />
              </div>
              <Input icon={MapPin} label="Standort / Objektadresse" value={form.location} onChange={(value) => update("location", value)} required />
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  icon={PackageOpen}
                  label="Menge / Volumen"
                  value={form.volumeEstimate}
                  onChange={(value) => update("volumeEstimate", value)}
                  placeholder="z. B. 20 Arbeitsplätze, 30 m³"
                />
                <Input
                  icon={PackageOpen}
                  label="Materialarten"
                  value={form.materialTypes}
                  onChange={(value) => update("materialTypes", value)}
                  placeholder="Möbel, Kartons, Verpackung, Regale..."
                />
              </div>
              <Input
                icon={MapPin}
                label="Zugang / Ladeweg"
                value={form.access}
                onChange={(value) => update("access", value)}
                placeholder="Etage, Aufzug, Rampe, Hof, Zeitfenster..."
              />
              <Input
                icon={PackageOpen}
                label="Preisvorstellung optional"
                value={form.budget}
                onChange={(value) => update("budget", value)}
                placeholder="z. B. 850 EUR"
              />

              <label className="block">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  Hinweis optional
                </span>
                <textarea
                  value={form.note}
                  onChange={(event) => update("note", event.target.value)}
                  placeholder="Was soll weg? Gibt es interne Zeitfenster, Gebäuderegeln oder sensible Bereiche?"
                  className="h-24 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-950 outline-none transition focus:border-cyan-300 focus:bg-cyan-50/40"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-cyan-500 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-cyan-400 disabled:opacity-60"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                Firmenentsorgung anfragen
              </button>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Input({
  icon: Icon,
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}: {
  icon: any;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
        <Icon className="h-3.5 w-3.5 text-cyan-600" />
        {label}
      </span>
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-950 outline-none transition focus:border-cyan-300 focus:bg-cyan-50/40"
      />
    </label>
  );
}
