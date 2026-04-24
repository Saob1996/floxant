"use client";

import { AnimatePresence, m } from "framer-motion";
import { Calendar, CheckCircle2, Mail, MapPin, Phone, Send, Sparkles, Truck, User, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface QuickExpressModalProps {
 isOpen: boolean;
 onClose: () => void;
}

const serviceOptions = [
 { value: "umzug", label: "Umzug" },
 { value: "reinigung", label: "Reinigung" },
 { value: "entsorgung", label: "Entrümpelung" },
 { value: "firmenentsorgung", label: "Firmenentsorgung" },
 { value: "bueroumzug", label: "Büroumzug" },
 { value: "leerfahrt", label: "Leer-Rückfahrt" },
];

export function QuickExpressModal({ isOpen, onClose }: QuickExpressModalProps) {
 const [mounted, setMounted] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);
 const [formData, setFormData] = useState({
  service: "umzug",
  fromAddress: "",
  toAddress: "",
  date: "",
  name: "",
  phone: "",
  email: "",
  note: "",
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

 function update(field: keyof typeof formData, value: string) {
  setFormData((current) => ({ ...current, [field]: value }));
 }

 async function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
  setIsSubmitting(true);

  const details = {
   contact: {
    fullName: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    callbackPreference: "schnell",
    notes: formData.note.trim(),
   },
   service: {
    type: formData.service,
    source: "quick_express_modal",
    entryPoint: "navigation",
    presetFromUrl: formData.service,
   },
   valuation: {
    systemPriceRangeMin: 0,
    systemPriceRangeMax: 0,
    priceRangeMin: 0,
    priceRangeMax: 0,
    valuationLabel: "Express-Eckdaten",
    valuationStage: "Schnelle Machbarkeitsprüfung",
    accuracyState: "Erste Einschätzung",
    topDrivers: ["Serviceart", "Route", "Terminwunsch"],
    priceExplanation:
     "Die Express-Anfrage enthält nur Eckdaten. FLOXANT prüft kurzfristig, ob Route, Team und Termin realistisch passen.",
    pricingSignals: {
     inquiryMode: "quick_express",
     serviceType: formData.service,
     date: formData.date,
    },
   },
   configuration: {
    requestContext: "quick_express",
    fromAddress: formData.fromAddress.trim(),
    toAddress: formData.toAddress.trim(),
    moveDate: formData.date,
    customerMessage: formData.note.trim(),
   },
   metadata: {
    createdAt: new Date().toISOString(),
    intakeVersion: "1.2.0",
    source: "quick_express_modal",
    servicePresetFromUrl: formData.service,
   },
  };

  const submitData = new FormData();
  submitData.append("type", "express_inquiry");
  submitData.append("service", formData.service);
  submitData.append("name", formData.name.trim());
  submitData.append("email", formData.email.trim());
  submitData.append("phone", formData.phone.trim());
  submitData.append("message", formData.note.trim());
  submitData.append("details", JSON.stringify(details));
  submitData.append("timestamp", new Date().toISOString());

  try {
   const response = await fetch("/api/bookings", {
    method: "POST",
    body: submitData,
   });

   if (!response.ok) throw new Error("Express submit failed");

   setIsSuccess(true);
   setTimeout(() => {
    onClose();
    setIsSuccess(false);
    setFormData({
     service: "umzug",
     fromAddress: "",
     toAddress: "",
     date: "",
     name: "",
     phone: "",
     email: "",
     note: "",
    });
   }, 2600);
  } catch (error) {
   console.error("Express inquiry failed:", error);
   alert("Die Express-Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.");
  } finally {
   setIsSubmitting(false);
  }
 }

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
      aria-labelledby="quick-express-title"
      className="relative z-[10000] w-full max-w-2xl max-h-[calc(100dvh-4rem)] overflow-y-auto rounded-[2rem] border border-orange-200/15 bg-[#0B0D12] p-6 shadow-2xl md:max-h-[calc(100dvh-5rem)] md:rounded-[2.5rem] md:p-10"
     >
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />

      <button
       type="button"
       aria-label="Express-Dialog schließen"
       onClick={onClose}
       className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white/40 transition-all hover:bg-white/10 hover:text-white"
      >
       <X size={20} />
      </button>

      {isSuccess ? (
       <div className="flex flex-col items-center py-12 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
         <CheckCircle2 size={40} />
        </div>
        <h2 id="quick-express-title" className="mb-2 text-3xl font-bold text-white">Express-Anfrage gesendet</h2>
        <p className="max-w-md text-lg text-white/50">Wir prüfen Route, Termin und Machbarkeit mit Priorität.</p>
       </div>
      ) : (
       <>
        <div className="mb-8">
         <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-200">
          <Zap size={14} />
          Express-Check mit Eckdaten
         </div>
         <h2 id="quick-express-title" className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Schnell prüfen, ohne langen Rechner.
         </h2>
         <p className="mt-4 max-w-xl text-white/50">
          Für eilige Fälle reichen wenige Angaben. Der normale Rechner bleibt für detaillierte Orientierungsrahmen da.
         </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
         <div className="grid gap-3 sm:grid-cols-3">
          {serviceOptions.map((option) => (
           <button
            key={option.value}
            type="button"
            onClick={() => update("service", option.value)}
            className={[
             "rounded-2xl border px-4 py-3 text-sm font-bold transition-all",
             formData.service === option.value
              ? "border-orange-300/35 bg-orange-400/10 text-orange-100"
              : "border-white/10 bg-white/[0.03] text-white/55 hover:text-white",
            ].join(" ")}
           >
            {option.label}
           </button>
          ))}
         </div>

         <div className="grid gap-4 md:grid-cols-2">
          <Field icon={MapPin} label="Start / Abholort" value={formData.fromAddress} onChange={(value) => update("fromAddress", value)} required />
          <Field icon={Truck} label="Ziel / Einsatzort" value={formData.toAddress} onChange={(value) => update("toAddress", value)} />
         </div>

         <Field icon={Calendar} label="Wunschtermin" value={formData.date} onChange={(value) => update("date", value)} type="date" />

         <div className="grid gap-4 md:grid-cols-2">
          <Field icon={User} label="Name" value={formData.name} onChange={(value) => update("name", value)} required />
          <Field icon={Phone} label="Telefon" value={formData.phone} onChange={(value) => update("phone", value)} type="tel" required />
         </div>

         <Field icon={Mail} label="E-Mail optional" value={formData.email} onChange={(value) => update("email", value)} type="email" />

         <label className="block">
          <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
           <Sparkles className="h-3.5 w-3.5 text-orange-200" />
           Kurznotiz optional
          </span>
          <textarea
           value={formData.note}
           onChange={(event) => update("note", event.target.value)}
           placeholder="Was ist dringend? Volumen, Etage, Zeitfenster, Besonderheiten..."
           className="h-24 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all focus:border-orange-300/35 focus:bg-white/10"
          />
         </label>

         <button
          disabled={isSubmitting}
          type="submit"
          className="group relative flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-orange-300 font-bold uppercase tracking-wider text-slate-950 shadow-xl shadow-orange-900/20 transition-all hover:bg-orange-200 disabled:opacity-50"
         >
          {isSubmitting ? "Wird gesendet..." : "Express prüfen lassen"}
          {!isSubmitting && <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
         </button>
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

function Field({
 icon: Icon,
 label,
 value,
 onChange,
 required,
 type = "text",
}: {
 icon: any;
 label: string;
 value: string;
 onChange: (value: string) => void;
 required?: boolean;
 type?: string;
}) {
 return (
  <label className="block">
   <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
    <Icon className="h-3.5 w-3.5 text-orange-200" />
    {label}
   </span>
   <input
    required={required}
    type={type}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none transition-all focus:border-orange-300/35 focus:bg-white/10"
   />
  </label>
 );
}
