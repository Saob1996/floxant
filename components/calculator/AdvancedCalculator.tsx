"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
 FileText,
 Clock,
 Users,
 Database,
 PhoneCall,
 ArrowLeft,
 ArrowRight,
 CheckCircle2,
} from "lucide-react";
import { useCalculatorStore } from "@/store/calculatorStore";
import {
 calculateUmzugAdvanced,
 calculateReinigungAdvanced,
 calculateEntsorgungAdvanced,
 calculateBueroumzugAdvanced,
 calculateSeniorenumzugAdvanced,
 calculateKlaviertransportAdvanced,
 calculateEinlagerungAdvanced,
 calculateMalerarbeitenAdvanced,
 calculateAkteneinlagerungAdvanced,
} from "@/lib/pricing/calculator-engine";
import UmzugForm from "./forms/UmzugForm";
import ReinigungForm from "./forms/ReinigungForm";
import EntsorgungForm from "./forms/EntsorgungForm";
import BueroumzugForm from "./forms/BueroumzugForm";
import PianoForm from "./forms/PianoForm";
import StorageForm from "./forms/StorageForm";
import PaintingForm from "./forms/PaintingForm";
import ArchiveForm from "./forms/ArchiveForm";
import { VolumeIndicator } from "./VolumeIndicator";

function formatEuro(value: number | undefined): string {
 return new Intl.NumberFormat("de-DE").format(value || 0);
}

export default function AdvancedCalculator({ dic }: { dic?: any }) {
 const serviceType = useCalculatorStore((state) => state.serviceType);
 const baseDetails = useCalculatorStore((state) => state.baseDetails);
 const umzugData = useCalculatorStore((state) => state.umzugData);
 const reinigungData = useCalculatorStore((state) => state.reinigungData);
 const entsorgungData = useCalculatorStore((state) => state.entsorgungData);
 const bueroumzugData = useCalculatorStore((state) => state.bueroumzugData);
 const seniorenumzugData = useCalculatorStore((state) => state.seniorenumzugData);
 const klaviertransportData = useCalculatorStore((state) => state.klaviertransportData);
 const einlagerungData = useCalculatorStore((state) => state.einlagerungData);
 const malerarbeitenData = useCalculatorStore((state) => state.malerarbeitenData);
 const akteneinlagerungData = useCalculatorStore((state) => state.akteneinlagerungData);
 const advancedEstimate = useCalculatorStore((state) => state.advancedEstimate);
 const setAdvancedEstimate = useCalculatorStore((state) => state.setAdvancedEstimate);
 const setMode = useCalculatorStore((state) => state.setMode);

 const [currentStep, setCurrentStep] = useState(1);
 const [isRefreshingEstimate, setIsRefreshingEstimate] = useState(false);

 const steps = [
  { id: 1, title: dic?.calculator?.step_basics || "Basis" },
  {
   id: 2,
   title:
    serviceType === "bueroumzug"
     ? dic?.calculator?.step_office || "Buero"
     : serviceType === "klaviertransport"
      ? dic?.calculator?.step_piano || "Instrument"
      : serviceType === "einlagerung"
       ? dic?.calculator?.step_storage || "Lager"
       : serviceType === "akteneinlagerung"
        ? dic?.calculator?.archive_label || "Archiv"
        : serviceType === "malerarbeiten"
         ? dic?.calculator?.step_painting || "Maler"
         : dic?.calculator?.step_inventory || "Inventar",
  },
  { id: 3, title: dic?.calculator?.step_services || "Services" },
 ];

 const hasInput = useMemo(() => {
  if ((baseDetails.fromAddress || "").trim().length >= 2 || (baseDetails.toAddress || "").trim().length >= 2) {
   return true;
  }

  if (serviceType === "umzug" || serviceType === "seniorenumzug") {
   const data = serviceType === "umzug" ? umzugData : seniorenumzugData;
   return (data.fromAddressDetailed?.trim().length || 0) >= 2 || data.areaM2 > 1 || data.boxesCount > 0;
  }

  if (serviceType === "reinigung") return reinigungData.areaM2 > 0;
  if (serviceType === "entsorgung") return entsorgungData.wasteVolumeM3 > 0;
  if (serviceType === "bueroumzug") return bueroumzugData.workstations > 0 || bueroumzugData.areaM2 > 0;
  if (serviceType === "akteneinlagerung") return akteneinlagerungData.boxCount > 0 || akteneinlagerungData.shelfMeters > 0;
  if (serviceType === "klaviertransport") return true;

  return false;
 }, [
  baseDetails,
  serviceType,
  umzugData,
  seniorenumzugData,
  reinigungData,
  entsorgungData,
  bueroumzugData,
  akteneinlagerungData,
 ]);

 const calculatedEstimate = useMemo(() => {
  if (!serviceType) return null;

  switch (serviceType) {
   case "umzug":
    return calculateUmzugAdvanced(umzugData, baseDetails, dic);
   case "reinigung":
    return calculateReinigungAdvanced(reinigungData, dic);
   case "entsorgung":
    return calculateEntsorgungAdvanced(entsorgungData, dic);
   case "bueroumzug":
    return calculateBueroumzugAdvanced(bueroumzugData, baseDetails, dic);
   case "seniorenumzug":
    return calculateSeniorenumzugAdvanced(seniorenumzugData, baseDetails, dic);
   case "klaviertransport":
    return calculateKlaviertransportAdvanced(klaviertransportData, baseDetails, dic);
   case "einlagerung":
    return calculateEinlagerungAdvanced(einlagerungData, baseDetails, dic);
   case "malerarbeiten":
    return calculateMalerarbeitenAdvanced(malerarbeitenData, baseDetails, dic);
   case "akteneinlagerung":
    return calculateAkteneinlagerungAdvanced(akteneinlagerungData, baseDetails, dic);
   default:
    return null;
  }
 }, [
  serviceType,
  umzugData,
  reinigungData,
  entsorgungData,
  bueroumzugData,
  seniorenumzugData,
  klaviertransportData,
  einlagerungData,
  malerarbeitenData,
  akteneinlagerungData,
  baseDetails,
  dic,
 ]);

 useEffect(() => {
  if (!calculatedEstimate) return;
  if (JSON.stringify(advancedEstimate) !== JSON.stringify(calculatedEstimate)) {
   setAdvancedEstimate(calculatedEstimate);
  }
 }, [calculatedEstimate, advancedEstimate, setAdvancedEstimate]);

 useEffect(() => {
  if (!hasInput || !calculatedEstimate) {
   setIsRefreshingEstimate(false);
   return;
  }

  setIsRefreshingEstimate(true);
  const timeout = window.setTimeout(() => setIsRefreshingEstimate(false), 180);
  return () => window.clearTimeout(timeout);
 }, [calculatedEstimate, hasInput]);

 const est = (calculatedEstimate ?? advancedEstimate) as any;
 const canProceedToLead = Boolean(hasInput && est);

 const renderCurrentForm = () => {
  switch (serviceType) {
   case "umzug":
   case "seniorenumzug":
    return <UmzugForm dic={dic} currentStep={currentStep} />;
   case "reinigung":
    return <ReinigungForm dic={dic} currentStep={currentStep} />;
   case "entsorgung":
    return <EntsorgungForm dic={dic} currentStep={currentStep} />;
   case "bueroumzug":
    return <BueroumzugForm dic={dic} currentStep={currentStep} />;
   case "klaviertransport":
    return <PianoForm dic={dic} currentStep={currentStep} />;
   case "einlagerung":
    return <StorageForm dic={dic} currentStep={currentStep} />;
   case "akteneinlagerung":
    return <ArchiveForm dic={dic} currentStep={currentStep} />;
   default:
    return <PaintingForm dic={dic} currentStep={currentStep} />;
  }
 };

 return (
  <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 xl:flex-row xl:items-start">
   <div className="w-full flex-[1.2]">
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#11131A] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-sm lg:p-10">
     <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.08),transparent_35%)]" />

     <div className="relative z-10 mb-10 border-b border-white/8 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
       <div>
        <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-white">
         <FileText size={22} className="text-blue-400" />
         {`Schritt ${currentStep}: ${steps[currentStep - 1].title}`}
        </h2>
        <p className="mt-2 text-sm text-white/45">
         Detaillierte Angaben für eine belastbare Vorprüfung.
        </p>
       </div>

       <div className="flex gap-2">
        {steps.map((step) => (
         <div
          key={step.id}
          className={`h-1.5 w-8 rounded-full transition-all duration-300 ${step.id === currentStep ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "bg-white/10"}`}
         />
        ))}
       </div>
      </div>
     </div>

     <div className="relative z-10">
      <AnimatePresence mode="wait">
       <m.div
        key={currentStep}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2 }}
       >
        {renderCurrentForm()}
       </m.div>
      </AnimatePresence>

      <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
       <button
        onClick={() => setCurrentStep((step) => Math.max(step - 1, 1))}
        disabled={currentStep === 1}
        className="flex items-center gap-2 text-sm font-semibold text-white/40 transition-colors hover:text-white disabled:opacity-0"
       >
        <ArrowLeft size={16} />
        {dic?.calculator?.back || "Zurück"}
       </button>

       {currentStep < 3 ? (
        <button
         onClick={() => setCurrentStep((step) => Math.min(step + 1, 3))}
         className="flex items-center gap-2 rounded-xl bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
        >
         {dic?.calculator?.next || "Weiter"}
         <ArrowRight size={16} />
        </button>
       ) : (
        <button
         onClick={() => setMode("lead")}
         disabled={!canProceedToLead}
         className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-blue-500 disabled:opacity-40"
        >
         {dic?.calculator?.finish_and_request || "Vorprüfung abschließen"}
         <CheckCircle2 size={16} />
        </button>
       )}
      </div>
     </div>
    </div>
   </div>

   <div className="sticky top-24 z-40 w-full shrink-0 xl:w-[460px]">
    <div className="relative overflow-hidden rounded-[28px] border border-blue-500/10 bg-[#0B0D12]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:p-8">
     <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-500/10 blur-[90px]" />

     <div className="relative z-10 mb-6 flex items-center justify-between gap-3 border-b border-white/6 pb-5">
      <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
       <Database className="text-blue-400" size={18} />
       Aktuelle Einordnung
      </h3>
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
       {est?.valuationStage || "Erste Einschätzung"}
      </span>
     </div>

     {serviceType === "umzug" && hasInput ? (
      <div className="mb-6">
       <VolumeIndicator cbm={est?.cbm ?? 0} dic={dic} />
      </div>
     ) : null}

     {!hasInput ? (
      <div className="py-12 text-center">
       <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-3xl">
        1
       </div>
       <h4 className="mb-2 text-lg font-bold text-white">Starten wir</h4>
       <p className="px-4 text-xs leading-relaxed text-white/40">
        Geben Sie oben Ihre Daten ein, um einen unverbindlichen Orientierungsrahmen zu
        erhalten.
       </p>
      </div>
     ) : isRefreshingEstimate ? (
      <div className="flex h-64 flex-col items-center justify-center gap-4 py-12">
       <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
       <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Analysiere Daten...</span>
      </div>
     ) : (
      <div className="relative z-10 space-y-6">
       <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] p-6 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]">
        <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300/60">
         Unverbindlicher Orientierungsrahmen
        </span>
        <div className="flex flex-wrap items-baseline gap-2">
         <span className="text-5xl font-bold tracking-tighter text-white">
          {formatEuro(est?.priceRange?.min)}
         </span>
         <span className="text-xl font-light text-white/30">-</span>
         <span className="text-5xl font-bold tracking-tighter text-white">
          {formatEuro(est?.priceRange?.max)}
         </span>
         <span className="ml-1 text-2xl font-medium text-blue-400">EUR</span>
        </div>

        <p className="mt-4 border-t border-white/5 pt-4 text-[11px] leading-relaxed text-white/50">
         {est?.priceExplanation ||
          "Diese Einordnung basiert auf Ihren Angaben und wird mit mehr Details belastbarer."}
        </p>
       </div>

       <div className="grid grid-cols-2 gap-3">
        <InfoTile icon={<Clock size={14} />} label="Zeitansatz" value={est?.estimatedHours || "-"} />
        <InfoTile icon={<Users size={14} />} label="Personal" value={est?.recommendedTeam || "-"} />
       </div>

       <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
        <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/20">Basis</h4>
        <p className="text-[13px] font-medium leading-relaxed text-white/80">{est?.calculationBasis}</p>
       </div>

       {est?.topDrivers?.length ? (
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
         <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/20">Wichtige Kostentreiber</h4>
         <div className="space-y-2">
          {est.topDrivers.map((driver: string) => (
           <p key={driver} className="text-[13px] font-medium leading-relaxed text-white/70">
            {driver}
           </p>
          ))}
         </div>
        </div>
       ) : null}
      </div>
     )}

     <div className="mt-8">
      <button
       onClick={() => setMode("lead")}
       disabled={!canProceedToLead}
       className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-6 py-4.5 text-[16px] font-bold tracking-tight text-black transition-all hover:bg-blue-50 active:scale-[0.98] disabled:opacity-20"
      >
       <PhoneCall size={18} className="transition-transform group-hover:scale-110" />
       {dic?.calculator?.fix_now_btn || "Vorprüfung abschließen"}
      </button>
      <p className="mt-4 text-center text-[10px] font-medium uppercase tracking-widest text-white/20">
       Unverbindlich und kostenlos
      </p>
     </div>
    </div>
   </div>
  </div>
 );
}

function InfoTile({
 icon,
 label,
 value,
}: {
 icon: React.ReactNode;
 label: string;
 value: string;
}) {
 return (
  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
   <div className="mb-2 flex items-center gap-2 text-white/30">
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
   </div>
   <span className="text-[14px] font-bold text-white">{value}</span>
  </div>
 );
}
