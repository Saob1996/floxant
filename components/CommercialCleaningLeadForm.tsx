"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Loader2, MessageCircle, Send, ShieldCheck } from "lucide-react";

import { company } from "@/lib/company";

function parseBudget(value: string) {
 const normalized = value.replace(/[^\d.,-]/g, "").replace(/\./g, "").replace(",", ".");
 const parsed = Number.parseFloat(normalized);
 return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null;
}

export function CommercialCleaningLeadForm() {
 const [form, setForm] = useState({
  name: "",
  companyName: "",
  phone: "",
  email: "",
  propertyType: "Büro & Office",
  spaceRange: "150 bis 400 m²",
  cadence: "Täglich",
  location: "Regensburg",
  budget: "",
  message: "",
 });
 const [submitting, setSubmitting] = useState(false);
 const [state, setState] = useState<"idle" | "success" | "error">("idle");

 const whatsappUrl = useMemo(() => {
  const text = "Hallo FLOXANT, ich möchte eine gewerbliche Reinigungsanfrage für Regensburg stellen.";
  return `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
 }, []);

 async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setSubmitting(true);
  setState("idle");

  const budgetValue = parseBudget(form.budget);
  const topDrivers = [form.propertyType, form.spaceRange, form.cadence, form.location].filter(Boolean);

  const payload = {
   name: form.name,
   email: form.email,
   phone: form.phone,
   service: "reinigung",
   upgrades: [],
   details: {
    contact: {
     fullName: form.name,
     email: form.email,
     phone: form.phone,
     callbackPreference: "Geschäftszeiten",
     notes: form.message,
    },
    service: {
     type: "reinigung",
     source: "gewerbereinigung_regensburg",
     entryPoint: "/gewerbereinigung-regensburg",
     presetFromUrl: "reinigung",
    },
    valuation: {
     systemPriceRangeMin: 0,
     systemPriceRangeMax: 0,
     priceRangeMin: 0,
     priceRangeMax: 0,
     valuationLabel: "Direktanfrage Gewerbereinigung",
     valuationStage: "B2B-Direktanfrage",
     accuracyState: "B2B-Direktanfrage",
     topDrivers: topDrivers.length ? topDrivers : ["Gewerbeobjekt", "Regensburg", "Direktanfrage"],
     customerBudget: budgetValue,
     priceSuggestion: budgetValue,
     priceExplanation:
      "Direkte gewerbliche Reinigungsanfrage ohne Rechner. Die operative Einordnung erfolgt nach Objektart, Fläche, Zugang, Turnus und Leistungsumfang.",
     pricingSignals: {
      propertyType: form.propertyType,
      spaceRange: form.spaceRange,
      cadence: form.cadence,
      location: form.location,
      companyName: form.companyName,
      budgetText: form.budget,
      leadChannel: "landingpage",
     },
    },
    configuration: {
     requestContext: "commercial_cleaning",
     companyName: form.companyName,
     propertyType: form.propertyType,
     spaceRange: form.spaceRange,
     cadence: form.cadence,
     location: form.location,
     note: form.message,
    },
    metadata: {
      createdAt: new Date().toISOString(),
      intakeVersion: "1.1.0",
      source: "gewerbereinigung_regensburg",
      servicePresetFromUrl: "reinigung",
    },
   },
  };

  try {
   const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
   });

   if (!response.ok) throw new Error("submit_failed");

   setState("success");
   setForm({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    propertyType: "Büro & Office",
    spaceRange: "150 bis 400 m²",
    cadence: "Täglich",
    location: "Regensburg",
    budget: "",
    message: "",
   });
  } catch {
   setState("error");
  } finally {
   setSubmitting(false);
  }
 }

 function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
  setForm((current) => ({ ...current, [key]: value }));
 }

 return (
  <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
   <form
    onSubmit={handleSubmit}
    className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
   >
    <div className="mb-6 flex items-start justify-between gap-4">
     <div>
      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
       Direkte B2B-Anfrage
      </p>
      <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
       Objekt kurz einordnen und qualifizierte Rückmeldung erhalten
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
       Ohne Rechner-Zwang. Wir sehen Objektart, Größenordnung, Turnus und Kontaktdaten sofort im Dashboard.
      </p>
     </div>
     <span className="hidden rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-700 sm:inline-flex">
      Nur B2B
     </span>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
     <label className="space-y-2 text-sm font-semibold text-slate-800">
      Ansprechpartner
      <input
       required
       value={form.name}
       onChange={(event) => updateField("name", event.target.value)}
       className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
       placeholder="Name"
      />
     </label>
     <label className="space-y-2 text-sm font-semibold text-slate-800">
      Firma / Verwaltung
      <input
       value={form.companyName}
       onChange={(event) => updateField("companyName", event.target.value)}
       className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
       placeholder="Firmenname"
      />
     </label>
     <label className="space-y-2 text-sm font-semibold text-slate-800">
      Telefon
      <input
       required
       value={form.phone}
       onChange={(event) => updateField("phone", event.target.value)}
       className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
       placeholder="Telefonnummer"
      />
     </label>
     <label className="space-y-2 text-sm font-semibold text-slate-800">
      E-Mail
      <input
       required
       type="email"
       value={form.email}
       onChange={(event) => updateField("email", event.target.value)}
       className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
       placeholder="E-Mail"
      />
     </label>
     <label className="space-y-2 text-sm font-semibold text-slate-800">
      Objektart
      <select
       value={form.propertyType}
       onChange={(event) => updateField("propertyType", event.target.value)}
       className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
      >
       <option>Büro & Office</option>
       <option>Kanzlei</option>
       <option>Praxis & Pflege</option>
       <option>Hotel & Beherbergung</option>
       <option>Verwaltung & Empfang</option>
       <option>Hausverwaltung & Treppenhaus</option>
       <option>Gesundheitsimmobilie & Klinikverwaltung</option>
       <option>Einzelhandel & Gastronomie</option>
       <option>Industrie & Produktion</option>
      </select>
     </label>
     <label className="space-y-2 text-sm font-semibold text-slate-800">
      Größenordnung
      <select
       value={form.spaceRange}
       onChange={(event) => updateField("spaceRange", event.target.value)}
       className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
      >
       <option>150 bis 400 m²</option>
       <option>400 bis 800 m²</option>
       <option>800 bis 1.500 m²</option>
       <option>1.500 m² und größer</option>
       <option>Mehrere Einheiten / Treppenhäuser</option>
      </select>
     </label>
     <label className="space-y-2 text-sm font-semibold text-slate-800">
      Turnus / Anlass
      <select
       value={form.cadence}
       onChange={(event) => updateField("cadence", event.target.value)}
       className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
      >
       <option>Täglich</option>
       <option>Mehrmals pro Woche</option>
       <option>Wöchentlich</option>
       <option>Monatlich</option>
       <option>Einmalig / Grundreinigung</option>
       <option>Nach Absprache / Turnus flexibel</option>
      </select>
     </label>
     <label className="space-y-2 text-sm font-semibold text-slate-800">
      Ort
      <input
       value={form.location}
       onChange={(event) => updateField("location", event.target.value)}
       className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
       placeholder="z. B. Regensburg"
      />
     </label>
     <label className="space-y-2 text-sm font-semibold text-slate-800 md:col-span-2">
      Wunschbudget (optional)
      <input
       value={form.budget}
       onChange={(event) => updateField("budget", event.target.value)}
       className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
       placeholder="z. B. 1800"
      />
     </label>
     <label className="space-y-2 text-sm font-semibold text-slate-800 md:col-span-2">
      Nachricht / Besonderheiten
      <textarea
       value={form.message}
       onChange={(event) => updateField("message", event.target.value)}
       className="min-h-[140px] w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
       placeholder="z. B. Zugang, Randzeiten, Hygieneanforderungen, mehrere Etagen, feste Ansprechpartner"
      />
     </label>
    </div>

    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
     <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
      <ShieldCheck className="h-4 w-4 text-emerald-600" />
      Nur gewerblich. Private Kleinstaufträge sind hier nicht der Fokus.
     </div>

     <button
      type="submit"
      disabled={submitting}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
     >
      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      Anfrage senden
     </button>
    </div>

    {state === "success" ? (
     <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
      Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns zeitnah zurück.
     </div>
    ) : null}

    {state === "error" ? (
     <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
      Die Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder nutzen Sie WhatsApp.
     </div>
    ) : null}
   </form>

   <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-950/5">
    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">Warum diese Seite gut funktioniert</p>
    <h3 className="mt-2 text-lg font-black tracking-tight text-slate-950">
     Diese Seite ist für gewerbliche Anfragen vorbereitet
    </h3>
    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
     <li>Klare Einordnung nach Objektart, Fläche, Turnus und Zugangslogik</li>
     <li>Sauber getrennt von privaten Kleinstaufträgen</li>
     <li>Direkte Übergabe ins Dashboard ohne Pflicht-Rechner</li>
     <li>Kundenbudget bleibt sichtbar, ersetzt aber nie die fachliche Prüfung</li>
    </ul>

    <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-5">
     <h4 className="text-sm font-black uppercase tracking-[0.14em] text-slate-950">
      Alternativ direkt schreiben
     </h4>
     <p className="mt-3 text-sm leading-relaxed text-slate-600">
      Wenn Sie lieber kurz per WhatsApp anfragen, senden Sie uns Objektart, Größenordnung, Turnus und Standort.
     </p>
     <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-5 inline-flex items-center gap-2 rounded-2xl border border-[#25D366]/25 bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:border-[#25D366] hover:text-[#25D366]"
     >
      <MessageCircle className="h-4 w-4 text-[#25D366]" />
      WhatsApp starten
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
     </a>
    </div>
   </aside>
  </div>
 );
}
