"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Truck, Database, Clock, Users, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useCalculatorStore } from "@/store/calculatorStore";
import {
 calculateUmzugAdvanced,
 calculateBueroumzugAdvanced,
 calculateSeniorenumzugAdvanced,
 calculateKlaviertransportAdvanced,
 calculateEinlagerungAdvanced,
} from "@/lib/pricing/calculator-engine";
import UmzugForm from "../forms/UmzugForm";
import BueroumzugForm from "../forms/BueroumzugForm";
import PianoForm from "../forms/PianoForm";
import StorageForm from "../forms/StorageForm";
import { VolumeIndicator } from "../VolumeIndicator";

function formatEuro(value: number | undefined): string {
 return new Intl.NumberFormat("de-DE").format(value || 0);
}

interface Props {
 dic: any;
}

export default function MovingEliteCalculator({ dic }: Props) {
 const serviceType = useCalculatorStore((state) => state.serviceType);
 const baseDetails = useCalculatorStore((state) => state.baseDetails);
 const umzugData = useCalculatorStore((state) => state.umzugData);
 const bueroumzugData = useCalculatorStore((state) => state.bueroumzugData);
 const seniorenumzugData = useCalculatorStore((state) => state.seniorenumzugData);
 const klaviertransportData = useCalculatorStore((state) => state.klaviertransportData);
 const einlagerungData = useCalculatorStore((state) => state.einlagerungData);
 const advancedEstimate = useCalculatorStore((state) => state.advancedEstimate);
 const setAdvancedEstimate = useCalculatorStore((state) => state.setAdvancedEstimate);
 const setMode = useCalculatorStore((state) => state.setMode);

 const [currentStep, setCurrentStep] = useState(1);
 const [isRefreshing, setIsRefreshing] = useState(false);

 const steps = [
  { id: 1, title: dic?.calculator?.step_basics || "Basis" },
  {
   id: 2,
   title:
    serviceType === "bueroumzug"
     ? dic?.calculator?.step_office || "Buero"
     : serviceType === "klaviertransport"
      ? dic?.calculator?.step_piano || "Instrument"
      : dic?.calculator?.step_inventory || "Inventar",
  },
  { id: 3, title: dic?.calculator?.step_services || "Services" },
 ];

 const calculatedEstimate = useMemo(() => {
  switch (serviceType) {
   case "umzug":
    return calculateUmzugAdvanced(umzugData, baseDetails, dic);
   case "bueroumzug":
    return calculateBueroumzugAdvanced(bueroumzugData, baseDetails, dic);
   case "seniorenumzug":
    return calculateSeniorenumzugAdvanced(seniorenumzugData, baseDetails, dic);
   case "klaviertransport":
    return calculateKlaviertransportAdvanced(klaviertransportData, baseDetails, dic);
   case "einlagerung":
    return calculateEinlagerungAdvanced(einlagerungData, baseDetails, dic);
   default:
    return null;
  }
 }, [serviceType, umzugData, bueroumzugData, seniorenumzugData, klaviertransportData, einlagerungData, baseDetails, dic]);

 useEffect(() => {
  if (!calculatedEstimate) return;
  if (JSON.stringify(advancedEstimate) !== JSON.stringify(calculatedEstimate)) {
   setAdvancedEstimate(calculatedEstimate);
  }
 }, [calculatedEstimate, advancedEstimate, setAdvancedEstimate]);

 useEffect(() => {
  if (!calculatedEstimate) return;
  setIsRefreshing(true);
  const timeout = setTimeout(() => setIsRefreshing(false), 200);
  return () => clearTimeout(timeout);
 }, [calculatedEstimate]);

 const hasInput = (baseDetails.fromAddress?.length || 0) > 2;
 const est = (calculatedEstimate || advancedEstimate) as any;

 const renderForm = () => {
  if (serviceType === "umzug" || serviceType === "seniorenumzug") {
   return <UmzugForm dic={dic} currentStep={currentStep} />;
  }
  if (serviceType === "bueroumzug") {
   return <BueroumzugForm dic={dic} currentStep={currentStep} />;
  }
  if (serviceType === "klaviertransport") {
   return <PianoForm dic={dic} currentStep={currentStep} />;
  }
  return <StorageForm dic={dic} currentStep={currentStep} />;
 };

 return (
  <div className="relative flex w-full max-w-7xl flex-col gap-8 xl:flex-row xl:items-start">
   <div className="w-full flex-[1.2]">
    <div className="relative overflow-hidden rounded-[32px] border border-blue-500/10 bg-[#0B0C10] p-6 shadow-2xl backdrop-blur-md lg:p-10">
     <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.05),transparent_40%)]" />

     <div className="relative z-10 mb-10 border-b border-white/5 pb-8">
      <div className="block sm:flex items-center justify-between">
       <div>
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
         Elite <span className="text-blue-500">Planung</span>
        </h2>
        <p className="mt-2 text-sm text-white/40">
         {steps[currentStep - 1].title} - Schritt {currentStep} von 3
        </p>
       </div>
       <div className="mt-4 flex gap-2 sm:mt-0">
        {steps.map((step) => (
         <div
          key={step.id}
          className={`h-1.5 w-10 rounded-full transition-all duration-500 ${step.id === currentStep ? "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]" : "bg-white/10"}`}
         />
        ))}
       </div>
      </div>
     </div>

     <div className="relative z-10 min-h-[400px]">{renderForm()}</div>

     <div className="relative z-10 mt-12 flex items-center justify-between border-t border-white/5 pt-8">
      <button
       onClick={() => setCurrentStep((step) => Math.max(1, step - 1))}
       disabled={currentStep === 1}
       className="flex items-center gap-2 text-sm font-bold text-white/30 transition-colors hover:text-white disabled:opacity-0"
      >
       <ArrowLeft size={18} />
       Zurück
      </button>
      {currentStep < 3 ? (
       <button
        onClick={() => setCurrentStep((step) => Math.min(3, step + 1))}
        className="flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-900/20 transition-all hover:bg-blue-500 active:scale-95"
       >
        Weiter
        <ArrowRight size={18} />
       </button>
      ) : (
       <button
        onClick={() => setMode("lead")}
        className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:bg-blue-50 active:scale-95"
       >
        Vorprüfung abschließen
        <CheckCircle2 size={18} />
       </button>
      )}
     </div>
    </div>
   </div>

   <div className="sticky top-24 w-full xl:w-[420px]">
    <div className="rounded-[32px] border border-white/10 bg-[#0B0C10] p-8 shadow-2xl">
     <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-6">
      <h3 className="flex items-center gap-2 text-lg font-bold text-white">
       <Database size={18} className="text-blue-500" />
       Aktuelle Einordnung
      </h3>
      <div className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/60">
       {est?.valuationStage || "Erste Einschätzung"}
      </div>
     </div>

     {!hasInput ? (
      <div className="py-12 text-center">
       <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-3xl">U</div>
       <p className="text-sm font-medium text-white/40">Geben Sie Ihre Daten ein für eine belastbare Vorprüfung.</p>
      </div>
     ) : isRefreshing ? (
      <div className="flex h-48 flex-col items-center justify-center gap-4">
       <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
       <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Daten werden geprüft...</span>
      </div>
     ) : (
      <div className="space-y-6">
       <div className="rounded-2xl bg-blue-600/5 p-6 shadow-inner ring-1 ring-blue-500/20">
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-blue-400">Unverbindlicher Orientierungsrahmen</span>
        <div className="flex items-baseline gap-2">
         <span className="text-5xl font-bold tracking-tighter text-white">{formatEuro(est?.priceRange?.min)}</span>
         <span className="text-xl text-white/20">-</span>
         <span className="text-5xl font-bold tracking-tighter text-white">{formatEuro(est?.priceRange?.max)}</span>
         <span className="ml-1 text-xl font-bold text-blue-400">EUR</span>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-white/50">{est?.priceExplanation}</p>
       </div>

       {est?.cbm > 0 ? <VolumeIndicator cbm={est.cbm} dic={dic} /> : null}

       <div className="grid grid-cols-2 gap-3">
        <InfoTile label="Zeitansatz" value={est?.estimatedHours || "-"} icon={<Clock size={12} />} />
        <InfoTile label="Personal" value={est?.recommendedTeam || "-"} icon={<Users size={12} />} />
       </div>

       {est?.topDrivers?.length ? (
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
         <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/25">Wichtige Kostentreiber</div>
         <div className="space-y-2">
          {est.topDrivers.map((driver: string) => (
           <div key={driver} className="text-sm font-medium leading-relaxed text-white/70">
            {driver}
           </div>
          ))}
         </div>
        </div>
       ) : null}

       <div className="rounded-2xl bg-emerald-500/5 p-4 ring-1 ring-emerald-500/20">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
         <ShieldCheck size={14} />
         Operative Einordnung
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-emerald-400/70">
         Versicherungsschutz und professionelles Equipment sind Teil der fachlichen Prüfung, aber noch keine Preiszusage.
        </p>
       </div>
      </div>
     )}

     <div className="mt-10 border-t border-white/5 pt-8">
      <div className="mb-4 flex items-center justify-center gap-6 opacity-30 grayscale">
       <ShieldCheck size={24} />
       <CheckCircle2 size={24} />
       <Truck size={24} />
      </div>
      <p className="text-center text-[10px] font-bold uppercase tracking-widest text-white/20">Unverbindliche Vorprüfung</p>
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
  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-start">
   <div className="mb-1 flex items-center gap-2 text-white/30">
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
   </div>
   <div className="text-sm font-bold text-white">{value}</div>
  </div>
 );
}
