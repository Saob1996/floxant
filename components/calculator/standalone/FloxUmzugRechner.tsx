"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { m, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Clock, Users, Database, FileText, CheckCircle2, ArrowLeft, ArrowRight, Truck } from "lucide-react";
import FloxButton from "../ui/FloxButton";
import { useCalculatorStore } from "@/store/calculatorStore";
import { calculateUmzugAdvanced } from "@/lib/pricing/calculator-engine";
import UmzugForm from "../forms/UmzugForm";
import { VolumeIndicator } from "../VolumeIndicator";

export default function FloxUmzugRechner({ dic }: { dic?: any }) {
  const baseDetails = useCalculatorStore((s) => s.baseDetails);
  const umzugData = useCalculatorStore((s) => s.umzugData);
  const advancedEstimate = useCalculatorStore((s) => s.advancedEstimate);
  const setAdvancedEstimate = useCalculatorStore((s) => s.setAdvancedEstimate);
  const setMode = useCalculatorStore((s) => s.setMode);

  const [currentStep, setCurrentStep] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const STEPS = [
    { id: 1, title: dic?.calculator?.step_basics || "Basisdaten" },
    { id: 2, title: dic?.calculator?.step_inventory || "Aufwand & Inventar" },
    { id: 3, title: dic?.calculator?.step_services || "Leistungen" },
  ];

  const hasInput = 
    ((umzugData.fromAddressDetailed?.length || 0) > 8) && 
    ((umzugData.toAddressDetailed?.length || 0) > 8) && 
    (umzugData.areaM2 > 10 || (umzugData.furnitureList?.length || 0) >= 3);

  const calculatedEstimate = useMemo(() => {
    return calculateUmzugAdvanced(umzugData, baseDetails, dic);
  }, [umzugData, baseDetails, dic]);

  useEffect(() => {
    if (!calculatedEstimate) return;
    if (JSON.stringify(advancedEstimate) !== JSON.stringify(calculatedEstimate)) {
      setAdvancedEstimate(calculatedEstimate);
    }
  }, [calculatedEstimate, advancedEstimate, setAdvancedEstimate]);

  useEffect(() => {
    if (!hasInput || !calculatedEstimate) return;
    setIsRefreshing(true);
    const t = setTimeout(() => setIsRefreshing(false), 200);
    return () => clearTimeout(t);
  }, [calculatedEstimate, hasInput]);

  const est = (calculatedEstimate ?? advancedEstimate) as any;

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 xl:flex-row xl:items-start" id="premium-umzug">
      {/* Formular-Bereich */}
      <div className="w-full flex-[1.2]">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-6 shadow-2xl lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_70%)]" />

          {/* Wizard Header */}
          <div className="relative z-10 mb-10 border-b border-white/5 pb-8">
            <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              <Truck className="text-blue-500" strokeWidth={2.5} size={28} />
              Premium Umzugsrechner
            </h2>
            <p className="mt-2 text-sm text-white/50">Detaillierte Planung für Ihren Wohnungs- oder Firmenumzug.</p>
            
            <div className="mt-8 flex gap-2">
              {STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step.id === currentStep ? "bg-gradient-to-r from-blue-500 to-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]" : "bg-white/10"}`}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 min-h-[420px]">
            <AnimatePresence mode="wait">
              <m.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <UmzugForm dic={dic} currentStep={currentStep} />
              </m.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 mt-12 flex items-center justify-between border-t border-white/5 pt-8">
            <button
              onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/40 transition-colors hover:text-white disabled:opacity-0"
            >
              <ArrowLeft size={18} /> Zurück
            </button>
            
            {currentStep < 3 ? (
              <FloxButton
                onClick={() => setCurrentStep((s) => Math.min(3, s + 1))}
                rightIcon={<ArrowRight size={18} />}
              >
                Weiter
              </FloxButton>
            ) : (
              <FloxButton
                onClick={() => setMode("lead")}
                variant="primary"
                className="w-full sm:w-auto"
                rightIcon={<CheckCircle2 size={18} />}
              >
                Planung abschließen
              </FloxButton>
            )}
          </div>
        </div>
      </div>

      {/* Ergebnis-Seitenleiste */}
      <div className="sticky top-24 z-40 w-full shrink-0 xl:w-[460px]">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-8 shadow-2xl">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-full bg-[radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.1),transparent_70%)]" />

          <div className="relative z-10 mb-8 flex items-center justify-between border-b border-white/5 pb-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <Database className="text-blue-500" size={18} />
              Live Analyse
            </h3>
            <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${est?.confidenceLevel === 'high' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
              <div className={`h-1.5 w-1.5 rounded-full ${est?.confidenceLevel === 'high' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
              {est?.confidenceLevel === 'high' ? 'Präzise' : 'Schätzung'}
            </div>
          </div>

          {hasInput && est?.cbm > 0 && (
            <div className="mb-6 relative z-10">
              <VolumeIndicator cbm={est.cbm} dic={dic} />
            </div>
          )}

          {!hasInput ? (
            <div className="py-8 relative z-10">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 text-4xl shadow-inner group-hover:scale-110 transition-transform">🚛</div>
              <h4 className="text-white font-bold text-center mb-4">Kalkulation gesperrt</h4>
              <div className="space-y-3">
                <div className={`flex items-center gap-3 text-xs p-3 rounded-xl border ${((umzugData.fromAddressDetailed?.length || 0) > 8) ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/40'}`}>
                  <div className={`h-2 w-2 rounded-full ${((umzugData.fromAddressDetailed?.length || 0) > 8) ? 'bg-emerald-500' : 'bg-white/20'}`} />
                  Startadresse eingeben
                </div>
                <div className={`flex items-center gap-3 text-xs p-3 rounded-xl border ${((umzugData.toAddressDetailed?.length || 0) > 8) ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/40'}`}>
                  <div className={`h-2 w-2 rounded-full ${((umzugData.toAddressDetailed?.length || 0) > 8) ? 'bg-emerald-500' : 'bg-white/20'}`} />
                  Zieladresse eingeben
                </div>
                <div className={`flex items-center gap-3 text-xs p-3 rounded-xl border ${(umzugData.areaM2 > 10 || (umzugData.furnitureList?.length || 0) >= 3) ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/40'}`}>
                  <div className={`h-2 w-2 rounded-full ${(umzugData.areaM2 > 10 || (umzugData.furnitureList?.length || 0) >= 3) ? 'bg-emerald-500' : 'bg-white/20'}`} />
                  Fläche m² oder Inventar angeben
                </div>
              </div>
              <p className="mt-6 text-[11px] text-center text-white/30 italic">Preise werden erst nach vollständigen Angaben berechnet.</p>
            </div>
          ) : isRefreshing ? (
            <div className="flex h-32 flex-col items-center justify-center gap-4 relative z-10">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            </div>
          ) : (
            <div className="space-y-6 relative z-10">
              <div className="rounded-2xl border border-blue-500/10 bg-blue-500/5 p-6 ring-1 ring-blue-500/10 transition-all hover:bg-blue-500/10">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-blue-400">Preisrahmen für Komplettservice</span>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter text-white"><AnimatedCounter value={est?.priceRange?.min || 0} /></span>
                  <span className="text-xl font-light text-white/30">bis</span>
                  <span className="text-5xl font-black tracking-tighter text-white"><AnimatedCounter value={est?.priceRange?.max || 0} /></span>
                  <span className="ml-1 text-2xl font-medium text-blue-500">€</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="mb-2 flex items-center gap-2 text-white/30"><Clock size={14} /><span className="text-[9px] font-black uppercase tracking-widest">Zeitansatz</span></div>
                  <div className="text-[14px] font-bold text-white">{est?.estimatedHours || "–"}</div>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="mb-2 flex items-center gap-2 text-white/30"><Users size={14} /><span className="text-[9px] font-black uppercase tracking-widest">Personal</span></div>
                  <div className="text-[14px] font-bold text-white">{est?.recommendedTeam || "–"}</div>
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm leading-relaxed text-white/70">
                {est?.calculationBasis}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const anim = animate(count, value, { duration: 0.6, ease: "easeOut" });
    return anim.stop;
  }, [count, value]);

  useEffect(() => rounded.on("change", (v) => { if (nodeRef.current) nodeRef.current.textContent = v.toLocaleString(); }), [rounded]);

  return <span ref={nodeRef} />;
}
