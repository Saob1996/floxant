"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Database, Clock, Users, Trash2, ArrowRight } from "lucide-react";
import FloxButton from "../ui/FloxButton";
import { useCalculatorStore } from "@/store/calculatorStore";
import { calculateEntsorgungAdvanced } from "@/lib/pricing/calculator-engine";
import EntsorgungForm from "../forms/EntsorgungForm";
import { VolumeIndicator } from "../VolumeIndicator";

function formatEuro(value: number | undefined): string {
  return new Intl.NumberFormat("de-DE").format(value || 0);
}

export default function FloxEntsorgungRechner({ dic }: { dic?: any }) {
  const entsorgungData = useCalculatorStore((state) => state.entsorgungData);
  const advancedEstimate = useCalculatorStore((state) => state.advancedEstimate);
  const setAdvancedEstimate = useCalculatorStore((state) => state.setAdvancedEstimate);
  const setMode = useCalculatorStore((state) => state.setMode);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const hasInput = (entsorgungData.wasteVolumeM3 || 0) >= 1 || (entsorgungData.wasteCategories?.length || 0) > 0;

  const calculatedEstimate = useMemo(() => calculateEntsorgungAdvanced(entsorgungData, dic), [entsorgungData, dic]);

  useEffect(() => {
    if (!calculatedEstimate) return;
    if (JSON.stringify(advancedEstimate) !== JSON.stringify(calculatedEstimate)) {
      setAdvancedEstimate(calculatedEstimate);
    }
  }, [calculatedEstimate, advancedEstimate, setAdvancedEstimate]);

  useEffect(() => {
    if (!hasInput || !calculatedEstimate) return;
    setIsRefreshing(true);
    const timeout = setTimeout(() => setIsRefreshing(false), 200);
    return () => clearTimeout(timeout);
  }, [calculatedEstimate, hasInput]);

  const est = (calculatedEstimate ?? advancedEstimate) as any;

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 xl:flex-row xl:items-start" id="premium-entsorgung">
      <div className="w-full flex-[1.2]">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-6 shadow-2xl backdrop-blur-2xl lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.15),transparent_70%)]" />

          <div className="relative z-10 mb-10 border-b border-white/5 pb-8">
            <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              <Trash2 className="text-orange-500" strokeWidth={2.5} size={28} />
              Premium Entsorgungsrechner
            </h2>
            <p className="mt-2 text-sm text-white/50">
              Detaillierte Vorprüfung für Entrümpelung, Sperrmüll und Materialentsorgung.
            </p>
          </div>

          <div className="relative z-10 min-h-[420px]">
            <EntsorgungForm dic={dic} currentStep={1} />
          </div>

          <div className="relative z-10 mt-12 flex items-center justify-end border-t border-white/5 pt-8">
            <FloxButton
              onClick={() => setMode("lead")}
              variant="primary"
              className="bg-orange-600 text-white hover:bg-orange-500"
              rightIcon={<ArrowRight size={18} />}
            >
              Vorprüfung weitergeben
            </FloxButton>
          </div>
        </div>
      </div>

      <div className="sticky top-24 z-40 w-full shrink-0 xl:w-[460px]">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-2xl">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-full bg-[radial-gradient(circle_at_100%_0%,rgba(249,115,22,0.1),transparent_70%)]" />

          <div className="relative z-10 mb-8 flex items-center justify-between border-b border-white/5 pb-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <Database className="text-orange-500" size={18} />
              Aktuelle Einordnung
            </h3>
            <div className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/60">
              {est?.valuationStage || "Erste Einschätzung"}
            </div>
          </div>

          {hasInput && est?.cbm > 0 ? (
            <div className="relative z-10 mb-6">
              <VolumeIndicator cbm={est.cbm} dic={dic} />
            </div>
          ) : null}

          {!hasInput ? (
            <div className="relative z-10 py-8">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-500/10 text-4xl shadow-inner">
                E
              </div>
              <h4 className="mb-4 text-center font-bold text-white">Vorprüfung wartet auf Daten</h4>
              <div className="space-y-3">
                <CheckState active={(entsorgungData.wasteVolumeM3 || 0) >= 1} label="Entsorgungsvolumen angeben" />
                <CheckState active={(entsorgungData.wasteCategories?.length || 0) > 0} label="Materialart auswählen" />
              </div>
              <p className="mt-6 text-center text-[11px] italic text-white/30">
                Die Einordnung startet, sobald die wichtigsten Angaben vorliegen.
              </p>
            </div>
          ) : isRefreshing ? (
            <div className="relative z-10 flex h-32 flex-col items-center justify-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
            </div>
          ) : (
            <div className="relative z-10 space-y-6">
              <div className="rounded-2xl border border-orange-500/10 bg-orange-500/5 p-6 ring-1 ring-orange-500/10">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-orange-400">
                  Unverbindlicher Orientierungsrahmen
                </span>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tighter text-white">{formatEuro(est?.priceRange?.min)}</span>
                  <span className="text-xl font-light text-white/30">-</span>
                  <span className="text-5xl font-bold tracking-tighter text-white">{formatEuro(est?.priceRange?.max)}</span>
                  <span className="ml-1 text-2xl font-medium text-orange-500">EUR</span>
                </div>
                <p className="mt-4 text-[11px] leading-relaxed text-white/50">{est?.priceExplanation}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <InfoTile label="Zeitansatz" value={est?.estimatedHours || "-"} icon={<Clock size={14} />} />
                <InfoTile label="Personal" value={est?.recommendedTeam || "-"} icon={<Users size={14} />} />
              </div>

              {est?.topDrivers?.length ? (
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
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

function CheckState({ active, label }: { active: boolean; label: string }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border p-3 text-xs ${active ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-white/10 bg-white/5 text-white/40"}`}
    >
      <div className={`h-2 w-2 rounded-full ${active ? "bg-emerald-500" : "bg-white/20"}`} />
      {label}
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
      <div className="text-[14px] font-bold text-white">{value}</div>
    </div>
  );
}
