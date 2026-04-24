"use client";

import React, { useEffect, useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
 Truck,
 Sparkles,
 Trash2,
 ArrowRight,
 MapPin,
 Layers,
 CheckCircle2,
 Briefcase,
 Heart,
 Music,
} from "lucide-react";
import { useCalculatorStore, ServiceType } from "@/store/calculatorStore";
import {
 calculateUmzugExpress,
 calculateReinigungExpress,
 calculateEntsorgungExpress,
 calculateBueroumzugAdvanced,
} from "@/lib/pricing/calculator-engine";
import TrustBlock from "../trust/TrustBlock";

type PriceRange = { min: number; max: number };

export default function ExpressCalculator({ dic }: { dic?: any }) {
 const serviceType = useCalculatorStore((s) => s.serviceType);
 const setServiceType = useCalculatorStore((s) => s.setServiceType);

 const umzugData = useCalculatorStore((s) => s.umzugData);
 const reinigungData = useCalculatorStore((s) => s.reinigungData);
 const entsorgungData = useCalculatorStore((s) => s.entsorgungData);
 const bueroumzugData = useCalculatorStore((s) => s.bueroumzugData);
 const baseDetails = useCalculatorStore((s) => s.baseDetails);

 const expressPriceRange = useCalculatorStore((s) => s.expressPriceRange);
 const setExpressPriceRange = useCalculatorStore((s) => s.setExpressPriceRange);
 const setMode = useCalculatorStore((s) => s.setMode);

 const updateBaseDetails = useCalculatorStore((s) => s.updateBaseDetails);
 const updateUmzugData = useCalculatorStore((s) => s.updateUmzugData);
 const updateReinigungData = useCalculatorStore((s) => s.updateReinigungData);
 const updateEntsorgungData = useCalculatorStore((s) => s.updateEntsorgungData);
 const updateBueroumzugData = useCalculatorStore((s) => s.updateBueroumzugData);

 const [activeStep, setActiveStep] = useState(serviceType ? 1 : 0);
 const [isCalculating, setIsCalculating] = useState(false);

 const calculatedRange = useMemo<PriceRange | null>(() => {
  if (serviceType === "umzug" || serviceType === "seniorenumzug") {
   return calculateUmzugExpress(umzugData, baseDetails);
  }

  if (serviceType === "reinigung") {
   return calculateReinigungExpress(reinigungData);
  }

  if (serviceType === "entsorgung") {
   return calculateEntsorgungExpress(entsorgungData, baseDetails);
  }

  if (serviceType === "bueroumzug") {
   return calculateBueroumzugAdvanced(bueroumzugData, baseDetails, dic).priceRange;
  }

  if (serviceType === "klaviertransport") {
   return { min: 180, max: 280 };
  }

  return null;
 }, [serviceType, umzugData, reinigungData, entsorgungData, bueroumzugData, baseDetails, dic]);

 useEffect(() => {
  if (!serviceType && activeStep !== 0) {
   setActiveStep(0);
  }
 }, [serviceType, activeStep]);

 useEffect(() => {
  if (!calculatedRange) return;

  const currentMin = expressPriceRange?.min;
  const currentMax = expressPriceRange?.max;

  if (
   currentMin !== calculatedRange.min ||
   currentMax !== calculatedRange.max
  ) {
   setExpressPriceRange(calculatedRange.min, calculatedRange.max);
  }
 }, [calculatedRange, expressPriceRange?.min, expressPriceRange?.max, setExpressPriceRange]);

 const handleServiceSelect = (type: ServiceType) => {
  if (type !== serviceType) {
   setServiceType(type);
  }
  setActiveStep(1);
 };

 const progressWidth = useMemo(() => {
  if (activeStep <= 0) return "33.3333%";
  if (activeStep === 1) return "66.6667%";
  return "100%";
 }, [activeStep]);

 const isStepZeroValid = Boolean(serviceType);

 const resultMin = calculatedRange?.min ?? expressPriceRange?.min ?? 0;
 const resultMax = calculatedRange?.max ?? expressPriceRange?.max ?? 0;

 return (
  <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0B0B12] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)] md:p-8">
   <div className="pointer-events-none absolute start-1/4 top-0 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />
   <div className="pointer-events-none absolute bottom-0 end-1/4 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />

   <div className="relative z-10 mb-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
    <m.div
     className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
     initial={{ width: 0 }}
     animate={{ width: progressWidth }}
     transition={{ duration: 0.35, ease: "easeInOut" }}
    />
   </div>

   <div className="relative z-10 flex min-h-[420px] flex-col">
    <AnimatePresence mode="wait">
     {activeStep === 0 && (
      <m.div
       key="step-0"
       initial={{ opacity: 0, x: 18 }}
       animate={{ opacity: 1, x: 0 }}
       exit={{ opacity: 0, x: -18 }}
       transition={{ duration: 0.25 }}
       className="flex flex-col gap-6"
      >
       <div className="space-y-2">
        <h2 className="text-3xl font-light tracking-tight text-white">
         {dic?.calculator?.start_now || ""}
        </h2>
        <p className="max-w-xl text-sm leading-6 text-white/55">
         {dic?.calculator?.service_selection_note || ""}
        </p>
       </div>

       <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <ServiceCard
         icon={Truck}
         title={dic?.booking?.services?.umzug?.label || "Privatumzug"}
         onClick={() => handleServiceSelect("umzug")}
         active={serviceType === "umzug"}
        />
        <ServiceCard
         icon={Briefcase}
         title={dic?.booking?.services?.bueroumzug?.label || "Büroumzug"}
         onClick={() => handleServiceSelect("bueroumzug")}
         active={serviceType === "bueroumzug"}
        />
        <ServiceCard
          icon={Heart}
          title={dic?.booking?.services?.seniorenumzug?.label || "Seniorenumzug"}
          onClick={() => handleServiceSelect("seniorenumzug")}
          active={serviceType === "seniorenumzug"}
        />
        <ServiceCard
         icon={Sparkles}
         title={dic?.booking?.services?.reinigung?.label || "Reinigung"}
         onClick={() => handleServiceSelect("reinigung")}
         active={serviceType === "reinigung"}
        />
        <ServiceCard
         icon={Trash2}
         title={dic?.booking?.services?.entsorgung?.label || "Entrümpelung"}
         onClick={() => handleServiceSelect("entsorgung")}
         active={serviceType === "entsorgung"}
        />
        <ServiceCard
          icon={Music}
          title={dic?.booking?.services?.klaviertransport?.label || "Klavier"}
          onClick={() => handleServiceSelect("klaviertransport")}
          active={serviceType === "klaviertransport"}
        />
       </div>

       <div className="mt-2 flex justify-end">
        <button
         onClick={() => {
          if (!isStepZeroValid) return;
          setActiveStep(1);
         }}
         disabled={!isStepZeroValid}
         className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-8 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-white/20 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
        >
         {dic?.common?.next || "Weiter"}
         <ArrowRight size={18} />
        </button>
       </div>
      </m.div>
     )}

     {activeStep === 1 && (
      <m.div
       key="step-1"
       initial={{ opacity: 0, x: 18 }}
       animate={{ opacity: 1, x: 0 }}
       exit={{ opacity: 0, x: -18 }}
       transition={{ duration: 0.25 }}
       className="flex w-full flex-col gap-6"
      >
       <div className="space-y-2">
        <h2 className="text-3xl font-light tracking-tight text-white">
         {dic?.calculator?.requirements_title || ""}
        </h2>
        <p className="max-w-xl text-sm leading-6 text-white/55">
         {dic?.calculator?.requirements_note || ""}
        </p>
       </div>

       <div className="space-y-4">
        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 transition-colors focus-within:border-blue-500/40 focus-within:bg-white/[0.06]">
         <MapPin className="shrink-0 text-blue-400" size={18} />
         <input
          type="text"
          placeholder={
           dic?.calculator?.from_place_placeholder || ""
          }
          className="w-full bg-transparent text-[15px] text-white placeholder:text-white/35 outline-none"
          value={baseDetails.fromAddress}
          onChange={(e) =>
           updateBaseDetails({ fromAddress: e.target.value })
          }
         />
        </div>

        {serviceType === "umzug" && (
         <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 transition-colors focus-within:border-violet-500/40 focus-within:bg-white/[0.06]">
          <MapPin className="shrink-0 text-violet-400" size={18} />
          <input
           type="text"
           placeholder={
            dic?.calculator?.to_place_placeholder || ""
           }
           className="w-full bg-transparent text-[15px] text-white placeholder:text-white/35 outline-none"
           value={baseDetails.toAddress || ""}
           onChange={(e) =>
            updateBaseDetails({ toAddress: e.target.value })
           }
          />
         </div>
        )}

        {(serviceType === "umzug" || serviceType === "seniorenumzug" || serviceType === "reinigung") && (
         <div
          className={`grid gap-4 ${serviceType === "umzug" || serviceType === "seniorenumzug" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
           }`}
         >
          <FieldCard
           label={dic?.calculator?.living_area || ""}
          >
           <input
            type="number"
            min={0}
            inputMode="numeric"
            value={
             serviceType === "umzug" || serviceType === "seniorenumzug"
              ? umzugData.areaM2
              : reinigungData.areaM2
            }
            onChange={(e) => {
             const val = Number.parseInt(e.target.value, 10) || 0;
             if (serviceType === "umzug" || serviceType === "seniorenumzug") {
              updateUmzugData({ areaM2: val });
             } else {
              updateReinigungData({ areaM2: val });
             }
            }}
            className="w-full bg-transparent text-2xl font-light tracking-tight text-white outline-none placeholder:text-white/30"
           />
          </FieldCard>

          {(serviceType === "umzug" || serviceType === "seniorenumzug") && (
           <FieldCard
            label={dic?.calculator?.rooms || ""}
           >
            <input
             type="number"
             min={0}
             inputMode="numeric"
             value={umzugData.rooms}
             onChange={(e) =>
              updateUmzugData({
               rooms: Number.parseInt(e.target.value, 10) || 0,
              })
             }
             className="w-full bg-transparent text-2xl font-light tracking-tight text-white outline-none placeholder:text-white/30"
            />
           </FieldCard>
          )}
         </div>
        )}

        {serviceType === "bueroumzug" && (
         <div className="grid gap-4 md:grid-cols-2">
          <FieldCard label={dic?.calculator?.workstations || "Arbeitsplätze"}>
           <input
            type="number"
            min={1}
            inputMode="numeric"
            value={bueroumzugData.workstations || ""}
            onChange={(e) =>
             updateBueroumzugData({
              workstations: Number.parseInt(e.target.value, 10) || 1,
             })
            }
            className="w-full bg-transparent text-2xl font-light tracking-tight text-white outline-none placeholder:text-white/30"
           />
          </FieldCard>
          <FieldCard label={dic?.calculator?.archive_meters || "Archivmeter"}>
           <input
            type="number"
            min={0}
            inputMode="numeric"
            value={bueroumzugData.archiveMeters || ""}
            onChange={(e) =>
             updateBueroumzugData({
              archiveMeters: Number.parseInt(e.target.value, 10) || 0,
             })
            }
            className="w-full bg-transparent text-2xl font-light tracking-tight text-white outline-none placeholder:text-white/30"
           />
          </FieldCard>
         </div>
        )}

        {serviceType === "entsorgung" && (
         <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <label className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/45">
           <Layers size={14} />
           {dic?.calculator?.estimated_waste_volume || ""}
          </label>

          <input
           type="range"
           min="1"
           max="50"
           value={entsorgungData.wasteVolumeM3}
           onChange={(e) =>
            updateEntsorgungData({
             wasteVolumeM3: Number.parseInt(e.target.value, 10),
            })
           }
           className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-blue-500"
          />

          <div className="mt-3 text-2xl font-light tracking-tight text-white">
           {entsorgungData.wasteVolumeM3} m³
          </div>
         </div>
        )}
       </div>

       <div className="mt-auto flex items-center justify-between gap-4 pt-8">
        <button
         onClick={() => setActiveStep(0)}
         className="px-2 py-3 text-sm text-white/45 transition-colors hover:text-white"
        >
         {dic?.calculator?.back_to_overview || ""}
        </button>

        <button
         onClick={() => {
          setIsCalculating(true);
          setActiveStep(2);
          setTimeout(() => setIsCalculating(false), 1200);
         }}
         className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(59,130,246,0.28)] transition-all duration-200 hover:from-blue-500 hover:to-violet-500"
        >
         {dic?.common?.next || "Weiter"}
         <ArrowRight size={18} />
        </button>
       </div>
      </m.div>
     )}

     {activeStep === 2 && (
      <m.div
       key="step-2"
       initial={{ opacity: 0, scale: 0.97 }}
       animate={{ opacity: 1, scale: 1 }}
       exit={{ opacity: 0, scale: 0.97 }}
       transition={{ duration: 0.25 }}
       className="flex flex-col items-center justify-center py-8 text-center"
      >
       {isCalculating ? (
        <div className="flex flex-col items-center gap-4 py-12">
         <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-blue-400 border-t-transparent" />
         <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
          {dic?.calculator?.calculating || "Kalkulation für Bayern läuft"}
         </span>
        </div>
       ) : (
        <>
         <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] shadow-[0_0_30px_rgba(59,130,246,0.22)]">
          <Sparkles className="text-blue-400" size={30} />
         </div>

         <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
          <CheckCircle2 size={12} />
          Qualitätsgeprüft für Bayern
         </div>

         <h2 className="mb-2 text-sm uppercase tracking-[0.18em] text-white/45">
          {dic?.calculator?.prognosis_label || ""}
         </h2>

         <div className="mb-5 flex flex-wrap items-end justify-center gap-2 text-5xl font-light tracking-tight text-white md:text-6xl">
          <m.span
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text font-medium text-transparent"
          >
           {resultMin}€
          </m.span>
          <span className="px-1 text-3xl text-white/25">–</span>
          <m.span
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text font-medium text-transparent"
          >
           {resultMax}€
          </m.span>
         </div>

         <p className="mb-10 max-w-md text-sm leading-6 text-white/50">
          {dic?.calculator?.uncertainty_note || ""}
         </p>

         <button
          onClick={() => setMode("lead")}
          className="group relative w-full max-w-sm overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition-transform duration-200 hover:scale-[1.01]"
         >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-violet-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <span className="relative flex items-center justify-center gap-2">
           {dic?.calculator?.contact_us_now || "Jetzt Kontakt aufnehmen"}
           <ArrowRight
            size={20}
            className="transition-transform duration-200 group-hover:translate-x-1"
           />
          </span>
         </button>

         <button
          onClick={() => setActiveStep(1)}
          className="mt-6 text-sm text-white/40 underline-offset-4 transition-colors hover:text-white/80 hover:underline"
         >
          {dic?.calculator?.adjust_details || ""}
         </button>
        </>
       )}
      </m.div>
     )}
    </AnimatePresence>
   </div>

   <TrustBlock
    className="mt-8 border-t border-white/5 pt-8"
    locationHint={baseDetails.fromAddress || undefined}
    dic={dic}
   />
  </div>
 );
}

function FieldCard({
 label,
 children,
}: {
 label: string;
 children: React.ReactNode;
}) {
 return (
  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors focus-within:border-white/20 focus-within:bg-white/[0.06]">
   <label className="mb-2 block text-xs uppercase tracking-[0.14em] text-white/45">
    {label}
   </label>
   {children}
  </div>
 );
}

function ServiceCard({
 icon: Icon,
 title,
 onClick,
 active,
}: {
 icon: React.ComponentType<{ className?: string; size?: number }>;
 title: string;
 onClick: () => void;
 active: boolean;
}) {
 return (
  <button
   type="button"
   onClick={onClick}
   className={[
    "flex min-h-[148px] w-full flex-col items-center justify-center gap-3 rounded-2xl border p-6 text-center backdrop-blur-md transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-blue-500/40",
    active
     ? "border-blue-500/45 bg-blue-500/10 shadow-[0_0_24px_rgba(59,130,246,0.14)]"
     : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]",
   ].join(" ")}
   aria-pressed={active}
  >
   <Icon className={active ? "text-blue-400" : "text-white/60"} size={30} />
   <span
    className={
     active
      ? "text-sm font-medium text-white"
      : "text-sm font-medium text-white/72"
    }
   >
    {title}
   </span>
  </button>
 );
}
