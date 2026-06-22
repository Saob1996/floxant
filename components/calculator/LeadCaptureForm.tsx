"use client";

import React, { useEffect, useMemo, useState } from "react";
import { m } from "framer-motion";
import { useCalculatorStore } from "@/store/calculatorStore";
import { appendConversionJourneyToFormData } from "@/lib/conversion-journey";
import {
 User,
 Phone,
 Mail,
 Send,
 CheckCircle2,
 PhoneCall,
 ArrowLeft,
 Info,
 Camera,
} from "lucide-react";

const CALLBACK_OPTIONS = [
 "jederzeit",
 "vormittags",
 "nachmittags",
 "abends",
] as const;

function parseBudget(value: string) {
 const normalized = value.replace(/[^\d.,-]/g, "").replace(/\./g, "").replace(",", ".");
 const parsed = Number.parseFloat(normalized);
 return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null;
}

export default function LeadCaptureForm({ dic }: { dic?: any }) {
 const serviceType = useCalculatorStore((s) => s.serviceType);
 const leadDetails = useCalculatorStore((s) => s.leadDetails);
 const umzugData = useCalculatorStore((s) => s.umzugData);
 const reinigungData = useCalculatorStore((s) => s.reinigungData);
 const entsorgungData = useCalculatorStore((s) => s.entsorgungData);
 const advancedEstimate = useCalculatorStore((s) => s.advancedEstimate);
 const expressPriceRange = useCalculatorStore((s) => s.expressPriceRange);
 const mode = useCalculatorStore((s) => s.mode);
 const timeOnPage = useCalculatorStore((s) => s.timeOnPage);

 const updateLeadDetails = useCalculatorStore((s) => s.updateLeadDetails);
 const incrementTimeOnPage = useCalculatorStore((s) => s.incrementTimeOnPage);
 const setMode = useCalculatorStore((s) => s.setMode);

 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);
 const [submitError, setSubmitError] = useState("");

 useEffect(() => {
  const timer = window.setInterval(() => {
   incrementTimeOnPage(1);
  }, 1000);

  return () => window.clearInterval(timer);
 }, [incrementTimeOnPage]);

 const priceRange = useMemo(() => {
  if (advancedEstimate?.priceRange) return advancedEstimate.priceRange;
  if (expressPriceRange) return expressPriceRange;
  return { min: 0, max: 0 };
 }, [advancedEstimate, expressPriceRange]);

 const canSubmit = useMemo(() => {
  const email = leadDetails.customerEmail.trim();
  const emailLooksValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasContactData =
   leadDetails.customerName.trim().length >= 2 &&
   leadDetails.customerPhone.trim().length >= 6 &&
   leadDetails.callbackTime.trim().length >= 2 &&
   emailLooksValid;

  const hasEstimate = Boolean(advancedEstimate || expressPriceRange);

  return Boolean(serviceType && hasEstimate && hasContactData && !isSubmitting);
 }, [serviceType, advancedEstimate, expressPriceRange, leadDetails, isSubmitting]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const hasEstimate = Boolean(advancedEstimate || expressPriceRange);

  if (!canSubmit || !serviceType || !hasEstimate) {
   setSubmitError(dic?.calculator?.error_submit || "Bitte fuellen Sie Name, Telefon und Rueckrufzeit aus.");
   return;
  }

  setSubmitError("");
  setIsSubmitting(true);

  try {
   if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "conversion", {
     send_to:
      "AW-CONVERSION_ID_HIER_EINTRAGEN/CONVERSION_LABEL_HIER_EINTRAGEN",
    });
   }
  } catch (err) {
   console.warn("GTAG error", err);
  }

  try {
   const formData = new FormData();

   // Get additional service data from store directly to ensure latest state
   const state = useCalculatorStore.getState();
   const estimate = advancedEstimate || { priceRange: expressPriceRange, type: "express" };
   const customerBudget = parseBudget(state.leadDetails.customerBudget || "");
   const calculatorInputs = {
    umzug: serviceType === "umzug" ? state.umzugData : null,
    reinigung: serviceType === "reinigung" ? state.reinigungData : null,
    entsorgung: serviceType === "entsorgung" ? state.entsorgungData : null,
    bueroumzug: serviceType === "bueroumzug" ? state.bueroumzugData : null,
    seniorenumzug: serviceType === "seniorenumzug" ? state.seniorenumzugData : null,
    klaviertransport: serviceType === "klaviertransport" ? state.klaviertransportData : null,
    einlagerung: serviceType === "einlagerung" ? state.einlagerungData : null,
    malerarbeiten: serviceType === "malerarbeiten" ? state.malerarbeitenData : null,
    akteneinlagerung: serviceType === "akteneinlagerung" ? state.akteneinlagerungData : null,
   };

   formData.append("type", "booking_wizard");
   formData.append("service", serviceType);
   formData.append("upgrades", JSON.stringify([]));
   formData.append(
    "details",
    JSON.stringify({
     contact: {
      fullName: leadDetails.customerName.trim(),
      email: leadDetails.customerEmail.trim(),
      phone: leadDetails.customerPhone.trim(),
      callbackPreference: leadDetails.callbackTime || "jederzeit",
      notes: leadDetails.customerNote || "",
     },
     service: {
      type: serviceType,
      source: "calculator_lead",
      entryPoint: typeof window !== "undefined" ? window.location.pathname : "/rechner",
      presetFromUrl: serviceType,
     },
     valuation: {
      systemPriceRangeMin: estimate?.priceRange?.min || 0,
      systemPriceRangeMax: estimate?.priceRange?.max || 0,
      priceRangeMin: estimate?.priceRange?.min || 0,
      priceRangeMax: estimate?.priceRange?.max || 0,
      valuationLabel: "Rechner-Anfrage",
      valuationStage: advancedEstimate?.valuationStage || "Rechner-Einschaetzung",
      accuracyState: advancedEstimate?.confidenceLevel || "Rechner-Einschaetzung",
      topDrivers: advancedEstimate?.topDrivers || advancedEstimate?.operationalDrivers || [],
      customerBudget,
      priceSuggestion: customerBudget,
      priceExplanation: advancedEstimate?.priceExplanation || "Die Anfrage stammt aus dem FLOXANT-Rechner und wird konkret geprueft.",
      pricingSignals: {
       ...(advancedEstimate?.pricingSignals || {}),
       calculatorMode: mode,
       timeToConvertSeconds: timeOnPage,
       calculatorInputs,
      },
     },
     configuration: {
      requestContext: "calculator_lead",
      calculatorMode: mode,
      timeToConvertSeconds: timeOnPage,
      deviceType: typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop",
      callbackTime: leadDetails.callbackTime,
      wantsPhotosLink: leadDetails.wantsPhotosLink,
      customerBudgetText: state.leadDetails.customerBudget || "",
      calculatorInputs,
     },
     metadata: {
      createdAt: new Date().toISOString(),
      intakeVersion: "calculator-legacy-2.0",
      source: "calculator_lead",
      servicePresetFromUrl: serviceType,
      clientContext: {
       calculatorMode: mode,
       timeToConvertSeconds: timeOnPage,
       wantsPhotosLink: leadDetails.wantsPhotosLink,
      },
     },
    })
   );

   formData.append("name", leadDetails.customerName.trim());
   formData.append("email", leadDetails.customerEmail.trim());
   formData.append("phone", leadDetails.customerPhone.trim());
   formData.append("timestamp", new Date().toISOString());
   appendConversionJourneyToFormData(formData);

   const res = await fetch("/api/bookings", {
    method: "POST",
    body: formData,
   });

   let result: any = null;

   try {
    result = await res.json();
   } catch {
    result = null;
   }

   if (!res.ok) {
    throw new Error(
     result?.error ||
     dic?.error?.generic ||
     "Error while saving booking request"
    );
   }

   setIsSuccess(true);
  } catch (err) {
   console.error("Submit error:", err);
   setSubmitError(
    err instanceof Error
     ? err.message
     : dic?.calculator?.error_submit ||
      "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut."
   );
  } finally {
   setIsSubmitting(false);
  }
 };

 if (isSuccess) {
  return (
   <m.div
    initial={{ opacity: 0, scale: 0.98, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    className="mx-auto flex min-h-[420px] w-full max-w-2xl flex-col items-center justify-center rounded-[28px] border border-white/10 bg-[#11131A] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.32)] lg:p-12"
   >
    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/15 bg-emerald-400/10">
     <CheckCircle2 className="text-emerald-300" size={40} />
    </div>

    <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
     {dic?.calculator?.success_title || ""}
    </h2>

    <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/55">
     {dic?.calculator?.success_description || ""}
    </p>

    {leadDetails.wantsPhotosLink && (
     <div className="mb-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-start">
      <Camera size={18} className="mt-0.5 shrink-0 text-blue-300" />
      <span className="text-xs leading-relaxed text-white/72">
       {dic?.calculator?.upload_link_note || ""}
      </span>
     </div>
    )}

    <button
     type="button"
     aria-label={dic?.common?.back_to_home || "Zurück"}
     onClick={() => setMode("express")}
     className="rounded-full border border-white/10 bg-white/[0.04] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
    >
     {dic?.common?.back_to_home || ""}
    </button>
   </m.div>
  );
 }

 return (
  <m.div
   initial={{ opacity: 0, y: 18 }}
   animate={{ opacity: 1, y: 0 }}
   className="mx-auto w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/10 bg-[#11131A] shadow-[0_24px_80px_rgba(0,0,0,0.32)]"
  >
   <div className="flex flex-col items-start justify-between gap-6 border-b border-white/8 bg-white/[0.02] p-6 md:flex-row md:items-center md:p-8">
    <div className="max-w-xl">
     <h2 className="mb-2 text-2xl font-semibold tracking-tight text-white">
      {dic?.calculator?.submit_details || ""}
     </h2>
     <p className="text-sm leading-relaxed text-white/55">
      {dic?.calculator?.submit_details_subtitle || ""}
     </p>
    </div>

    <div className="w-full rounded-2xl border border-white/10 bg-[#0B0D12] px-5 py-4 text-start shadow-sm md:w-auto md:min-w-[220px] md:text-end">
     <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-white/38">
      {dic?.calculator?.your_price_range || ""}
     </span>
     <span className="whitespace-nowrap text-2xl font-semibold tracking-tight text-white">
       {priceRange.min} EUR - {priceRange.max} EUR
     </span>
    </div>
   </div>

   <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8">
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
     <FieldBox
      label={dic?.calculator?.contact_person || ""}
      icon={<User size={12} className="text-blue-300" />}
     >
      <input
       required
       type="text"
       aria-label={dic?.calculator?.contact_person || "Kontaktperson"}
       placeholder={dic?.calculator?.name_placeholder || ""}
       className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
       value={leadDetails.customerName}
       onChange={(e) =>
        updateLeadDetails({ customerName: e.target.value })
       }
      />
     </FieldBox>

     <FieldBox
      label={dic?.calculator?.phone_number || ""}
      icon={<Phone size={12} className="text-blue-300" />}
     >
      <input
       required
       type="tel"
       aria-label={dic?.calculator?.phone_number || "Telefonnummer"}
       placeholder="+49 170 1234567"
       className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
       value={leadDetails.customerPhone}
       onChange={(e) =>
        updateLeadDetails({ customerPhone: e.target.value })
       }
      />
     </FieldBox>
    </div>

    <FieldBox
     label={dic?.calculator?.email_address || "E-Mail optional"}
     icon={<Mail size={12} className="text-blue-300" />}
    >
     <input
       type="email"
      aria-label={dic?.calculator?.email_address || "E-Mail optional"}
      placeholder="max@beispiel.de"
      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
      value={leadDetails.customerEmail}
      onChange={(e) =>
       updateLeadDetails({ customerEmail: e.target.value })
      }
     />
    </FieldBox>

    {submitError ? (
     <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm leading-relaxed text-red-100">
      {submitError}
     </div>
    ) : null}

    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
     <label className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
      <PhoneCall size={14} className="text-blue-300" />
      {dic?.calculator?.preferred_contact_time || ""}
     </label>

     <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {CALLBACK_OPTIONS.map((time) => (
       <label
        key={time}
        className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-center transition-all ${leadDetails.callbackTime === time
          ? "border-blue-400/40 bg-blue-400/10 text-blue-200"
          : "border-white/10 bg-[#0B0D12] text-white/55 hover:bg-white/[0.04]"
         }`}
       >
        <input
         type="radio"
         name="callback"
         value={time}
         required
         checked={leadDetails.callbackTime === time}
         onChange={(e) =>
          updateLeadDetails({
           callbackTime: e.target.value,
          })
         }
         className="hidden"
        />
        <span className="text-xs font-medium capitalize">
         {dic?.calculator?.[time] || time}
        </span>
       </label>
      ))}
     </div>
    </div>

    <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]">
     <input
      type="checkbox"
      checked={leadDetails.wantsPhotosLink}
      onChange={(e) =>
       updateLeadDetails({ wantsPhotosLink: e.target.checked })
      }
      className="mt-1 accent-blue-500"
     />
     <div>
      <span className="block text-sm font-medium text-white">
       {dic?.calculator?.submit_photos || ""}
      </span>
      <span className="text-xs text-white/50">
       {dic?.calculator?.submit_photos_subtitle || ""}
      </span>
     </div>
    </label>

    <div className="flex gap-3 rounded-2xl border border-blue-400/10 bg-blue-400/[0.06] p-4 text-start">
     <Info className="mt-0.5 shrink-0 text-blue-300" size={16} />
     <p className="text-xs leading-relaxed text-white/55">
      <strong className="text-white">
       {dic?.calculator?.important_price_note || ""}
      </strong>{" "}
      {dic?.calculator?.price_disclaimer || ""}
     </p>
    </div>

    <div className="flex flex-col items-center justify-between gap-4 pt-2 md:flex-row">
     <button
      type="button"
      onClick={() => setMode("advanced")}
      className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium text-white/55 transition-colors hover:bg-white/[0.04] hover:text-white md:w-auto"
     >
      <ArrowLeft size={16} />
      {dic?.calculator?.back_to_overview || ""}
     </button>

     <button
      type="submit"
      disabled={!canSubmit}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 py-3.5 font-medium text-black shadow-sm transition-colors hover:bg-white/95 disabled:cursor-not-allowed disabled:opacity-45 md:w-auto"
     >
      {isSubmitting ? (
       <span className="flex items-center gap-2">
        {dic?.calculator?.submitting || ""}
       </span>
      ) : (
       <span className="flex items-center gap-2">
        {dic?.calculator?.submit_request || ""}
        <Send size={16} />
       </span>
      )}
     </button>
    </div>

    <div className="flex items-center justify-center gap-2 pt-4 text-center text-white/28">
     <Info size={12} />
     <span className="text-[10px] uppercase tracking-[0.15em]">
      {dic?.calculator?.ssl_encryption_note || ""}
     </span>
    </div>
   </form>
  </m.div>
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
  <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
   <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/40">
    {icon}
    {label}
   </label>
   {children}
  </div>
 );
}
