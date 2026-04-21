"use client";

import React from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { m, AnimatePresence } from "framer-motion";
import {
  Package,
  Calendar,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { ExpertTooltip } from "../ExpertTooltip";

function parseNumber(value: string): number {
  if (!value.trim()) return 0;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function StorageForm({ dic, currentStep = 1 }: { dic?: any; currentStep?: number }) {
  const einlagerungData = useCalculatorStore((s) => s.einlagerungData);
  const baseDetails = useCalculatorStore((s) => s.baseDetails);
  const updateEinlagerungData = useCalculatorStore((s) => s.updateEinlagerungData);
  const updateBaseDetails = useCalculatorStore((s) => s.updateBaseDetails);

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <m.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="rounded-[24px] border border-white/5 bg-white/[0.02] p-6">
              <h3 className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                <Package size={14} className="text-blue-400" />
                Lager-Details
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FieldCard label={dic?.calculator?.storage_volume || "Lagervolumen"}>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={einlagerungData.volumeM3 || ""}
                      onChange={(e) => updateEinlagerungData({ volumeM3: parseNumber(e.target.value) })}
                      placeholder="z. B. 10"
                      className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/20"
                    />
                    <span className="text-sm font-medium text-white/30">m³</span>
                  </div>
                </FieldCard>

                <FieldCard label={dic?.calculator?.duration || "Lagerdauer"}>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={einlagerungData.durationMonths || ""}
                      onChange={(e) => updateEinlagerungData({ durationMonths: parseNumber(e.target.value) })}
                      placeholder="z. B. 3"
                      className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/20"
                    />
                    <span className="text-sm font-medium text-white/30">{dic?.common?.months || "Monate"}</span>
                  </div>
                </FieldCard>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <OptionCard
                checked={einlagerungData.pickupRequired}
                title={dic?.calculator?.flag_storage_pickup || "Abholservice"}
                description="Wir holen Ihre Möbel direkt bei Ihnen ab und lagern sie ein."
                onChange={(c) => updateEinlagerungData({ pickupRequired: c })}
                icon={<Truck size={18} className="text-blue-400" />}
              />
              <div className="rounded-2xl border border-white/5 bg-[#0B0D12] p-5">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-white/20">Versicherungswert</label>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-emerald-400" />
                  <input
                    type="number"
                    step={1000}
                    value={einlagerungData.insuranceValue || ""}
                    onChange={(e) => updateEinlagerungData({ insuranceValue: parseNumber(e.target.value) })}
                    className="w-full bg-transparent text-sm font-bold text-white outline-none"
                    placeholder="Warenwert in €"
                  />
                </div>
              </div>
            </div>
          </m.div>
        )}

        {currentStep === 2 && (
          <m.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Besondere Anforderungen</label>
              <textarea
                value={einlagerungData.freeTextNote || ""}
                onChange={(e) => updateEinlagerungData({ freeTextNote: e.target.value })}
                placeholder="Details zu empfindlichen Möbeln, Zugangswünschen oder Teilanlieferungen..."
                className="h-32 w-full resize-none rounded-2xl border border-white/5 bg-[#0B0D12] p-4 text-sm font-medium text-white outline-none placeholder:text-white/20 focus:border-blue-400/20"
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldCard({ label, children, tip }: { label: string; children: React.ReactNode; tip?: string }) {
  return (
    <div className="space-y-2 rounded-2xl border border-white/5 bg-[#0B0D12] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">{label}</label>
        {tip && <ExpertTooltip content={tip} />}
      </div>
      {children}
    </div>
  );
}

function OptionCard({
  checked,
  title,
  description,
  onChange,
  icon,
}: {
  checked: boolean;
  title: string;
  description: string;
  onChange: (c: boolean) => void;
  icon?: React.ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-all ${checked ? "border-blue-500/30 bg-blue-500/10" : "border-white/5 bg-[#0B0D12] hover:bg-white/5"}`}
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-4 w-4 accent-blue-500" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-bold text-white">{title}</span>
        </div>
        <span className="mt-1 block text-[11px] leading-relaxed text-white/40">{description}</span>
      </div>
    </label>
  );
}
