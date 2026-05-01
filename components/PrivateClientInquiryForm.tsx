"use client";

import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send, UserRound } from "lucide-react";
import { useState } from "react";

const initialState = {
 name: "",
 email: "",
 phone: "",
 location: "",
 region: "Bayern",
 propertyType: "",
 serviceScope: "",
 preferredWindow: "",
 discretionNeeds: "",
 note: "",
};

export function PrivateClientInquiryForm() {
 const [form, setForm] = useState(initialState);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);
 const [submitError, setSubmitError] = useState("");

 function update(field: keyof typeof form, value: string) {
  setForm((current) => ({ ...current, [field]: value }));
 }

 async function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
  setSubmitError("");
  setIsSubmitting(true);

  const details = {
   contact: {
    fullName: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    callbackPreference: "diskret",
    notes: form.note.trim(),
   },
   service: {
    type: "private_client",
    source: "private_client_page",
    entryPoint: "/private-client-service",
    presetFromUrl: "private-client-service",
   },
   valuation: {
    systemPriceRangeMin: 0,
    systemPriceRangeMax: 0,
    priceRangeMin: 0,
    priceRangeMax: 0,
    valuationLabel: "Private Client Anfrage",
    valuationStage: "Diskrete Vorprüfung",
    accuracyState: "Individuelle Abstimmung",
    topDrivers: ["Anwesen oder Villa", "sensible Gegenstände", "Servicekombination", "Diskretion und Zugang"],
    priceExplanation:
     "Für Private-Client-Anfragen wird kein Online-Rahmen angezeigt. FLOXANT prüft Umfang, Schutzbedarf, Zugang, Terminfenster und Servicekombination diskret.",
    pricingSignals: {
     inquiryMode: "private_client",
     region: form.region,
     propertyType: form.propertyType.trim(),
     serviceScope: form.serviceScope.trim(),
     discretionNeeds: form.discretionNeeds.trim(),
    },
   },
   configuration: {
    requestContext: "private_client",
    location: form.location.trim(),
    region: form.region,
    propertyType: form.propertyType.trim(),
    serviceScope: form.serviceScope.trim(),
    preferredWindow: form.preferredWindow.trim(),
    discretionNeeds: form.discretionNeeds.trim(),
    customerMessage: form.note.trim(),
   },
   metadata: {
    createdAt: new Date().toISOString(),
    intakeVersion: "1.3.0",
    source: "private_client_page",
    servicePresetFromUrl: "private-client-service",
   },
  };

  const submitData = new FormData();
  submitData.append("type", "private_client_inquiry");
  submitData.append("service", "private_client");
  submitData.append("name", form.name.trim());
  submitData.append("email", form.email.trim());
  submitData.append("phone", form.phone.trim());
  submitData.append("message", form.note.trim());
  submitData.append("details", JSON.stringify(details));
  submitData.append("timestamp", new Date().toISOString());

  try {
   const response = await fetch("/api/bookings", {
    method: "POST",
    body: submitData,
   });

   if (!response.ok) throw new Error("Private client inquiry failed");

   setIsSuccess(true);
   setForm(initialState);
  } catch (error) {
   console.error("Private client inquiry failed:", error);
   setSubmitError("Die diskrete Anfrage konnte nicht gesendet werden. Bitte kontaktieren Sie FLOXANT direkt telefonisch oder per E-Mail.");
  } finally {
   setIsSubmitting(false);
  }
 }

 return (
  <div className="rounded-[2rem] border border-[#C9A45D]/25 bg-[#0B0805]/80 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.45)] md:p-7">
   <AnimatePresence mode="wait">
    {isSuccess ? (
     <m.div
      key="success"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="py-14 text-center"
     >
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A45D]/35 bg-[#C9A45D]/10 text-[#E8D2A2]">
       <CheckCircle2 className="h-8 w-8" />
      </div>
      <h3 className="text-3xl font-semibold tracking-tight text-[#F6EBDD]">Anfrage eingegangen</h3>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#E6D8C3]/60">
       FLOXANT prüft die Anfrage diskret und meldet sich persönlich zur weiteren Abstimmung.
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
       <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C9A45D]">Private Anfrage</div>
       <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#F6EBDD]">Diskret abstimmen</h2>
       <p className="mt-3 text-sm leading-relaxed text-[#E6D8C3]/55">
        Keine öffentliche Kalkulation, kein Standardformular. Nur die Eckdaten, damit FLOXANT den Schutzbedarf und den passenden Ablauf einordnen kann.
       </p>
      </div>

      <Field icon={UserRound} label="Name / Assistenz / Hausverwaltung" value={form.name} onChange={(value) => update("name", value)} required />
      <div className="grid gap-3 md:grid-cols-2">
       <Field icon={Phone} label="Telefon" value={form.phone} onChange={(value) => update("phone", value)} required type="tel" />
       <Field icon={Mail} label="E-Mail" value={form.email} onChange={(value) => update("email", value)} type="email" />
      </div>
      <Field icon={MapPin} label="Ort / Anwesen" value={form.location} onChange={(value) => update("location", value)} required placeholder="z. B. Starnberg, München, Stuttgart, Baden-Baden" />

      <div className="grid gap-3 md:grid-cols-2">
       <label className="block">
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#E6D8C3]/35">Region</span>
        <select
         value={form.region}
         onChange={(event) => update("region", event.target.value)}
         className="h-12 w-full rounded-2xl border border-[#C9A45D]/18 bg-[#14100B] px-4 text-sm font-medium text-[#F6EBDD] outline-none transition focus:border-[#D8B76E]/55"
        >
         <option>Bayern</option>
         <option>Baden-Württemberg</option>
         <option>Beide Regionen</option>
         <option>Andere Region auf Anfrage</option>
        </select>
       </label>
       <Field label="Objektart" value={form.propertyType} onChange={(value) => update("propertyType", value)} placeholder="Villa, Anwesen, Penthouse, Landhaus..." />
      </div>

      <Textarea label="Gewünschter Umfang" value={form.serviceScope} onChange={(value) => update("serviceScope", value)} required placeholder="Umzug, Reinigung, Räumung, Entsorgung, Kunst, Designmöbel, Safe-Zonen..." />
      <Field label="Zeitfenster" value={form.preferredWindow} onChange={(value) => update("preferredWindow", value)} placeholder="z. B. nach Besichtigung, diskret am Wochenende, Etappenplan" />
      <Textarea label="Diskretion / Schutzbedarf" value={form.discretionNeeds} onChange={(value) => update("discretionNeeds", value)} placeholder="Zugang, Personal, Sichtschutz, Inventarliste, sensible Räume..." />
      <Textarea label="Hinweis optional" value={form.note} onChange={(value) => update("note", value)} placeholder="Was soll FLOXANT vor dem persönlichen Kontakt wissen?" />

      {submitError ? (
       <div className="rounded-2xl border border-red-300/25 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
        {submitError}
       </div>
      ) : null}

      <button
       type="submit"
       disabled={isSubmitting}
       className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#D8B76E] text-[11px] font-bold uppercase tracking-[0.2em] text-[#120D08] transition hover:bg-[#F0D58B] disabled:opacity-60"
      >
       {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
       Diskrete Anfrage senden
      </button>
     </m.form>
    )}
   </AnimatePresence>
  </div>
 );
}

function Field({
 icon: Icon,
 label,
 value,
 onChange,
 required,
 type = "text",
 placeholder,
}: {
 icon?: any;
 label: string;
 value: string;
 onChange: (value: string) => void;
 required?: boolean;
 type?: string;
 placeholder?: string;
}) {
 return (
  <label className="block">
   <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#E6D8C3]/35">
    {Icon ? <Icon className="h-3.5 w-3.5 text-[#C9A45D]" /> : null}
    {label}
   </span>
   <input
    required={required}
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={(event) => onChange(event.target.value)}
    className="h-12 w-full rounded-2xl border border-[#C9A45D]/18 bg-[#14100B] px-4 text-sm font-medium text-[#F6EBDD] outline-none transition placeholder:text-[#E6D8C3]/25 focus:border-[#D8B76E]/55"
   />
  </label>
 );
}

function Textarea({
 label,
 value,
 onChange,
 required,
 placeholder,
}: {
 label: string;
 value: string;
 onChange: (value: string) => void;
 required?: boolean;
 placeholder?: string;
}) {
 return (
  <label className="block">
   <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#E6D8C3]/35">{label}</span>
   <textarea
    required={required}
    value={value}
    placeholder={placeholder}
    onChange={(event) => onChange(event.target.value)}
    className="h-24 w-full resize-none rounded-2xl border border-[#C9A45D]/18 bg-[#14100B] px-4 py-3 text-sm font-medium text-[#F6EBDD] outline-none transition placeholder:text-[#E6D8C3]/25 focus:border-[#D8B76E]/55"
   />
  </label>
 );
}
