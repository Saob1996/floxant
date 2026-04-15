"use client";

import React, { useEffect, useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Truck,
  Database,
  Clock,
  Users,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
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

interface Props {
  dic: any;
}

export default function MovingEliteCalculator({ dic }: Props) {
  const serviceType = useCalculatorStore((s) => s.serviceType);
  const baseDetails = useCalculatorStore((s) => s.baseDetails);
  const umzugData = useCalculatorStore((s) => s.umzugData);
  const bueroumzugData = useCalculatorStore((s) => s.bueroumzugData);
  const seniorenumzugData = useCalculatorStore((s) => s.seniorenumzugData);
  const klaviertransportData = useCalculatorStore((s) => s.klaviertransportData);
  const einlagerungData = useCalculatorStore((s) => s.einlagerungData);

  const advancedEstimate = useCalculatorStore((s) => s.advancedEstimate);
  const setAdvancedEstimate = useCalculatorStore((s) => s.setAdvancedEstimate);
  const setMode = useCalculatorStore((s) => s.setMode);

  const [currentStep, setCurrentStep] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const STEPS = [
    { id: 1, title: dic?.calculator?.step_basics || "Basis" },
    { 
      id: 2, 
      title: serviceType === "bueroumzug" ? (dic?.calculator?.step_office || "Büro") 
           : serviceType === "klaviertransport" ? (dic?.calculator?.step_piano || "Instrument") 
           : (dic?.calculator?.step_inventory || "Inventar") 
    },
    { id: 3, title: dic?.calculator?.step_services || "Services" },
  ];

  const calculatedEstimate = useMemo(() => {
    switch (serviceType) {
      case "umzug": return calculateUmzugAdvanced(umzugData, baseDetails, dic);
      case "bueroumzug": return calculateBueroumzugAdvanced(bueroumzugData, baseDetails, dic);
      case "seniorenumzug": return calculateSeniorenumzugAdvanced(seniorenumzugData, baseDetails, dic);
      case "klaviertransport": return calculateKlaviertransportAdvanced(klaviertransportData, baseDetails, dic);
      case "einlagerung": return calculateEinlagerungAdvanced(einlagerungData, baseDetails, dic);
      default: return null;
    }
  }, [serviceType, umzugData, bueroumzugData, seniorenumzugData, klaviertransportData, einlagerungData, baseDetails, dic]);

  useEffect(() => {
    if (!calculatedEstimate) return;
    if (JSON.stringify(advancedEstimate) !== JSON.stringify(calculatedEstimate)) {
      setAdvancedEstimate(calculatedEstimate);
      setIsRefreshing(true);
      const t = setTimeout(() => setIsRefreshing(false), 200);
      return () => clearTimeout(t);
    }
  }, [calculatedEstimate, advancedEstimate, setAdvancedEstimate]);

  const hasInput = (baseDetails.fromAddress?.length || 0) > 2;
  const est = (calculatedEstimate || advancedEstimate) as any;

  return (
    <div className="relative flex w-full max-w-7xl flex-col gap-8 xl:flex-row xl:items-start">
      {/* Main Form Area */}
      <div className="w-full flex-[1.2]">
        <div className="relative overflow-hidden rounded-[32px] border border-blue-500/10 bg-[#0B0C10] p-6 shadow-2xl backdrop-blur-md lg:p-10">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.05),transparent_40%)]" />
          
          {/* Header */}
          <div className="relative z-10 mb-10 block sm:flex items-center justify-between border-b border-white/5 pb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                Elite <span className="text-blue-500">Umzugsplanung</span>
              </h2>
              <p className="mt-2 text-sm text-white/40">{STEPS[currentStep - 1].title} — Schritt {currentStep} von 3</p>
            </div>
            <div className="mt-4 flex gap-2 sm:mt-0">
              {STEPS.map((s) => (
                <div key={s.id} className={`h-1.5 w-10 rounded-full transition-all duration-500 ${s.id === currentStep ? "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]" : "bg-white/10"}`} />
              ))}
            </div>
          </div>

          <div className="relative z-10 min-h-[400px]">
            <AnimatePresence mode="wait">
              <m.div
                key={currentStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {serviceType === "umzug" || serviceType === "seniorenumzug" ? (
                  <UmzugForm dic={dic} currentStep={currentStep} />
                ) : serviceType === "bueroumzug" ? (
                  <BueroumzugForm dic={dic} currentStep={currentStep} />
                ) : serviceType === "klaviertransport" ? (
                  <PianoForm dic={dic} currentStep={currentStep} />
                ) : (
                  <StorageForm dic={dic} currentStep={currentStep} />
                )}
              </m.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="relative z-10 mt-12 flex items-center justify-between border-t border-white/5 pt-8">
            <button
              onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 text-sm font-bold text-white/30 transition-colors hover:text-white disabled:opacity-0"
            >
              <ArrowLeft size={18} /> Zurück
            </button>
            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep((s) => Math.min(3, s + 1))}
                className="flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-black text-white shadow-xl shadow-blue-900/20 transition-all hover:bg-blue-500 active:scale-95"
              >
                Weiter <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={() => setMode("lead")}
                className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-black transition-all hover:bg-blue-50 active:scale-95"
              >
                Anfrage jetzt abschließen <CheckCircle2 size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Result */}
      <div className="sticky top-24 w-full xl:w-[420px]">
        <div className="rounded-[32px] border border-white/10 bg-[#0B0C10] p-8 shadow-2xl">
          <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <Database size={18} className="text-blue-500" />
              Live-Kalkulation
            </h3>
            <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${est?.confidenceLevel === 'high' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
              <div className={`h-1.5 w-1.5 rounded-full ${est?.confidenceLevel === 'high' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
              {est?.confidenceLevel === 'high' ? 'Präzise' : 'Schätzung'}
            </div>
          </div>

          {!hasInput ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-3xl">🚛</div>
              <p className="text-sm font-medium text-white/40">Geben Sie Ihre Daten ein für eine sofortige Elite-Kalkulation.</p>
            </div>
          ) : isRefreshing ? (
            <div className="flex h-48 flex-col items-center justify-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Daten werden analysiert...</span>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-2xl bg-blue-600/5 p-6 shadow-inner ring-1 ring-blue-500/20">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-blue-400">Preisrahmen für Elite-Fullservice</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter text-white">{est?.priceRange?.min}€</span>
                  <span className="text-xl text-white/20">bis</span>
                  <span className="text-5xl font-black tracking-tighter text-white">{est?.priceRange?.max}€</span>
                </div>
              </div>

              {est?.cbm > 0 && <VolumeIndicator cbm={est.cbm} dic={dic} />}

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-start">
                  <div className="mb-1 flex items-center gap-2 text-white/30"><Clock size={12} /> <span className="text-[9px] font-black uppercase tracking-widest">Zeitansatz</span></div>
                  <div className="text-sm font-bold text-white">{est?.estimatedHours}</div>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-start">
                  <div className="mb-1 flex items-center gap-2 text-white/30"><Users size={12} /> <span className="text-[9px] font-black uppercase tracking-widest">Elite-Team</span></div>
                  <div className="text-sm font-bold text-white">{est?.recommendedTeam}</div>
                </div>
              </div>

              <div className="rounded-2xl bg-emerald-500/5 p-4 ring-1 ring-emerald-500/20">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400"><ShieldCheck size={14} /> Qualitätsversprechen</div>
                <p className="mt-2 text-[11px] leading-relaxed text-emerald-400/70">Inklusive Versicherungsschutz & professionellem Equipment.</p>
              </div>
            </div>
          )}

          <div className="mt-10 border-t border-white/5 pt-8">
            <div className="mb-4 flex items-center justify-center gap-6 opacity-30 grayscale">
              <ShieldCheck size={24} />
              <CheckCircle2 size={24} />
              <Truck size={24} />
            </div>
            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-white/20">100% Sicher & Unverbindlich</p>
          </div>
        </div>
      </div>
    </div>
  );
}
