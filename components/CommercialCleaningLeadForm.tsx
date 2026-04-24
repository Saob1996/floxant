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
  propertyType: "Hotel",
  spaceRange: "150 bis 400 m²",
  cadence: "Täglich",
  location: "Regensburg",
  budget: "",
  message: "",
 });
 const [submitting, setSubmitting] = useState(false);
 const [state, setState] = useState<"idle" | "success" | "error">("idle");

 const whatsappUrl = useMemo(() => {
  const text =
   "Hallo FLOXANT, ich möchte eine gewerbliche Reinigungsanfrage für Regensburg stellen.";
  return `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
 }, []);

 async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setSubmitting(true);
  setState("idle");

  const budgetValue = parseBudget(form.budget);
  const topDrivers = [
   form.propertyType,
   form.spaceRange,
   form.cadence,
   form.location,
  ].filter(Boolean);

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

   if (!response.ok) {
    throw new Error("submit_failed");
   }

   setState("success");
   setForm({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    propertyType: "Hotel",
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
       Objekt kurz einordnen und Rückmeldung erhalten
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
       Ohne Rechner-Zwang. Wir sehen Objektart, Größenordnung, Turnus und Kontaktdaten sofort im Dashboard.
      </p>
     </div>
     <span className="hidden rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-700 sm:inline-flex">
      Für gewerbliche Anfragen
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
       <option>Hotel & Beherbergung</option>
       <option>Krankenhaus & Klinik</option>
       <option>Industrie & Produktion</option>
       <option>Büro</option>
       <option>Praxis & Pflege</option>
       <option>Einzelhandel & Gastronomie</option>
       <option>Fitnessstudio & Wellness</option>
       <option>Schule & Kita</option>
       <option>Immobilienbestand & Treppenhaus</option>
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
       placeholder="Regensburg / Stadtteil"
      />
     </label>
     <label className="space-y-2 text-sm font-semibold text-slate-800 md:col-span-2">
      Budgetvorstellung optional
      <input
       value={form.budget}
       onChange={(event) => updateField("budget", event.target.value)}
       className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
       placeholder="z. B. 1.800 € monatlich oder 2.500 € projektbezogen"
      />
     </label>
     <label className="space-y-2 text-sm font-semibold text-slate-800 md:col-span-2">
      Kurzbeschreibung
      <textarea
       required
       rows={5}
       value={form.message}
       onChange={(event) => updateField("message", event.target.value)}
       className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
       placeholder="Welche Flächen, welche Anforderungen, welcher Starttermin, welche Besonderheiten?"
      />
     </label>
    </div>

    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
     <button
      type="submit"
      disabled={submitting}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 text-sm font-black uppercase tracking-[0.14em] text-foreground shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
     >
      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      Anfrage senden
     </button>
     <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#25D366]/20 bg-white px-6 text-sm font-black uppercase tracking-[0.14em] text-slate-900 transition hover:border-[#25D366]/35 hover:bg-[#25D366]/5"
     >
      <MessageCircle className="h-4 w-4 text-[#25D366]" />
      Per WhatsApp starten
     </a>
    </div>

    {state === "success" ? (
     <p className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
      Anfrage gesendet. Sie ist jetzt im Dashboard sichtbar und kann direkt geprüft werden.
     </p>
    ) : null}

    {state === "error" ? (
     <p className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
      Die Anfrage konnte gerade nicht gesendet werden. Bitte nutzen Sie kurz WhatsApp oder versuchen Sie es erneut.
     </p>
    ) : null}
   </form>

   <div className="space-y-4">
    <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
     <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
      Gute Vorqualifizierung
     </p>
     <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
      Diese Seite filtert private Kleinanfragen bewusst heraus
     </h3>
     <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
      <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
       <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
       <span>Fokus auf Hotels, Krankenhäuser, Industrie, Gastronomie, Büros, Schulen und Gewerbeflächen.</span>
      </div>
      <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
       <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
       <span>Ideal für größere Volumen, mehrere Einheiten, Übergaben, feste Turni oder planbare Objektpflege.</span>
      </div>
      <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
       <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
       <span>Regensburg ist Kerngebiet. Angrenzende Orte prüfen wir nach Objektgröße, Termin und Route.</span>
      </div>
     </div>
    </div>

    <div className="rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_14%_0%,rgba(37,99,235,0.12),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
     <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
      Nächster Schritt
     </p>
     <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
      Erst Kontakt, dann Objektprüfung, dann konkretes Angebot
     </h3>
     <p className="mt-3 text-sm leading-relaxed text-slate-600">
      Diese Seite gibt absichtlich keinen Schnellpreis aus. Für gewerbliche Reinigung zählen Objektstruktur, Zugang, Turnus,
      Sonderzonen und Qualitätsniveau stärker als ein pauschaler Klickpreis.
     </p>
     <div className="mt-5 flex flex-wrap gap-3">
      <a
       href={whatsappUrl}
       target="_blank"
       rel="noopener noreferrer"
       className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
      >
       WhatsApp öffnen
       <ArrowRight className="h-4 w-4" />
      </a>
      <a
       href={`mailto:${company.email}`}
       className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
      >
       E-Mail schreiben
       <ArrowRight className="h-4 w-4" />
      </a>
     </div>
    </div>
   </div>
  </div>
 );
}
