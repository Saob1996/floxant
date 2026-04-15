"use client";

import React, { useEffect, useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Database,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useCalculatorStore } from "@/store/calculatorStore";
import {
  calculateReinigungAdvanced,
  calculateMalerarbeitenAdvanced,
} from "@/lib/pricing/calculator-engine";
import ReinigungForm from "../forms/ReinigungForm";
import PaintingForm from "../forms/PaintingForm";

interface Props {
  dic: any;
}

export default function CleaningEliteCalculator({ dic }: Props) {
  const serviceType = useCalculatorStore((s) => s.serviceType);
  const baseDetails = useCalculatorStore((s) => s.baseDetails);
  const reinigungData = useCalculatorStore((s) => s.reinigungData);
  const malerarbeitenData = useCalculatorStore((s) => s.malerarbeitenData);

  const advancedEstimate = useCalculatorStore((s) => s.advancedEstimate);
  const setAdvancedEstimate = useCalculatorStore((s) => s.setAdvancedEstimate);
  const setMode = useCalculatorStore((s) => s.setMode);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const calculatedEstimate = useMemo(() => {
    switch (serviceType) {
      case "reinigung": return calculateReinigungAdvanced(reinigungData, dic);
      case "malerarbeiten": return calculateMalerarbeitenAdvanced(malerarbeitenData, baseDetails, dic);
      default: return null;
    }
  }, [serviceType, reinigungData, malerarbeitenData, baseDetails, dic]);

  useEffect(() => {
    if (!calculatedEstimate) return;
    if (JSON.stringify(advancedEstimate) !== JSON.stringify(calculatedEstimate)) {
      setAdvancedEstimate(calculatedEstimate);
      setIsRefreshing(true);
      const t = setTimeout(() => setIsRefreshing(false), 200);
      return () => clearTimeout(t);
    }
  }, [calculatedEstimate, advancedEstimate, setAdvancedEstimate]);

  const hasInput = (reinigungData.areaM2 > 0 || malerarbeitenData.areaM2 > 0);
  const est = (calculatedEstimate || advancedEstimate) as any;

  return (
    <div className="relative flex w-full max-w-7xl flex-col gap-8 xl:flex-row xl:items-start">
      {/* Main Form Area */}
      <div className="w-full flex-[1.2]">
        <div className="relative overflow-hidden rounded-[32px] border border-emerald-500/10 bg-[#0B0C0E] p-6 shadow-2xl backdrop-blur-md lg:p-10">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_0%_0%,rgba(16,185,129,0.05),transparent_40%)]" />
          
          {/* Header */}
          <div className="relative z-10 mb-10 border-b border-white/5 pb-8">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Elite <span className="text-emerald-500">Service Planung</span>
            </h2>
            <p className="mt-2 text-sm text-white/40">Geben Sie Ihre Objektdaten für ein exaktes Angebot an.</p>
          </div>

          <div className="relative z-10 min-h-[400px]">
            <AnimatePresence mode="wait">
              <m.div
                key={serviceType}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                {serviceType === "reinigung" ? (
                  <ReinigungForm dic={dic} />
                ) : (
                  <PaintingForm dic={dic} />
                )}
              </m.div>
            </AnimatePresence>
          </div>

          {/* Action */}
          <div className="relative z-10 mt-12 flex items-center justify-between border-t border-white/5 pt-8">
            <button
              onClick={() => setMode("selection")}
              className="flex items-center gap-2 text-sm font-bold text-white/30 transition-colors hover:text-white"
            >
              <ArrowLeft size={18} /> Zurück
            </button>
            <button
              onClick={() => setMode("lead")}
              className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 text-sm font-black text-white shadow-xl shadow-emerald-900/20 transition-all hover:bg-emerald-500 active:scale-95"
            >
              Kalkulation abschließen <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Result */}
      <div className="sticky top-24 w-full xl:w-[420px]">
        <div className="rounded-[32px] border border-white/10 bg-[#0B0C0E] p-8 shadow-2xl">
          <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <Database size={18} className="text-emerald-500" />
              Live-Preise
            </h3>
            <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${est?.confidenceLevel === 'high' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
              <div className={`h-1.5 w-1.5 rounded-full ${est?.confidenceLevel === 'high' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
              {est?.confidenceLevel === 'high' ? 'Qualitäts-Check' : 'Indikativ'}
            </div>
          </div>

          {!hasInput ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-3xl">✨</div>
              <p className="text-sm font-medium text-white/40">Starten Sie mit den Objektdaten für eine professionelle Analyse.</p>
            </div>
          ) : isRefreshing ? (
            <div className="flex h-48 flex-col items-center justify-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Dienstleistung wird kalkuliert...</span>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-2xl bg-emerald-600/5 p-6 shadow-inner ring-1 ring-emerald-500/20">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-emerald-400">Festpreis-Angebot (Voraussichtlich)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter text-white">{est?.priceRange?.min}€</span>
                  <span className="text-xl text-white/20">bis</span>
                  <span className="text-5xl font-black tracking-tighter text-white">{est?.priceRange?.max}€</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                <div className="mb-1 flex items-center gap-2 text-white/30"><Star size={12} /> <span className="text-[9px] font-black uppercase tracking-widest">Inkludierte Leistung</span></div>
                <div className="text-sm font-bold text-white leading-relaxed">{est?.calculationBasis}</div>
              </div>

              <div className="rounded-2xl bg-blue-500/5 p-4 ring-1 ring-blue-500/20">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400"><Clock size={14} /> Zeitrahmen</div>
                <p className="mt-2 text-[11px] leading-relaxed text-blue-400/70">Dauer ca. {est?.estimatedHours}. Personal: {est?.recommendedTeam}.</p>
              </div>
            </div>
          )}

          <div className="mt-10 border-t border-white/5 pt-8">
            <div className="mb-4 flex items-center justify-center gap-6 opacity-30 grayscale">
              <ShieldCheck size={24} />
              <CheckCircle2 size={24} />
              <Sparkles size={24} />
            </div>
            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-white/20">Elite-Standard in ganz Bayern</p>
          </div>
        </div>
      </div>
    </div>
  );
}
