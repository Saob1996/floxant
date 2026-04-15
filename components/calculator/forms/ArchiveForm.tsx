"use client";

import React from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { m, AnimatePresence } from "framer-motion";
import {
  Archive,
  AlignJustify,
  Clock,
  ShieldCheck,
  Truck,
  Trash2,
  Scan,
} from "lucide-react";
import { ExpertTooltip } from "../ExpertTooltip";

function parseNumber(value: string): number {
  if (!value.trim()) return 0;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function ArchiveForm({ dic, currentStep = 1 }: { dic?: any; currentStep?: number }) {
  const data = useCalculatorStore((s) => s.akteneinlagerungData);
  const updateData = useCalculatorStore((s) => s.updateAkteneinlagerungData);

  const archiveDic = dic?.calculator?.archive || {};

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
              <h3 className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                <Archive size={14} className="text-blue-400" />
                {dic?.calculator?.archive_storage || "Archiv-Bestand"}
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FieldCard 
                   label={archiveDic.box_count || "Anzahl Archivkartons"}
                   tip="Standard-Archivkartons (ca. 5-6 Ordner pro Box)"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      value={data.boxCount || ""}
                      onChange={(e) => updateData({ boxCount: parseNumber(e.target.value) })}
                      placeholder="z. B. 50"
                      className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/20"
                    />
                    <span className="text-sm font-medium text-white/30">Boxen</span>
                  </div>
                </FieldCard>

                <FieldCard 
                   label={archiveDic.shelf_meters || "Regalmeter (lfm)"}
                   tip="Laufende Meter Regalfläche für Aktenordner"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      value={data.shelfMeters || ""}
                      onChange={(e) => updateData({ shelfMeters: parseNumber(e.target.value) })}
                      placeholder="z. B. 20"
                      className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/20"
                    />
                    <span className="text-sm font-medium text-white/30">lfm</span>
                  </div>
                </FieldCard>

                <FieldCard label={archiveDic.duration || "Lagerdauer (Monate)"}>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={data.durationMonths || ""}
                      onChange={(e) => updateData({ durationMonths: parseNumber(e.target.value) })}
                      placeholder="z. B. 12"
                      className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/20"
                    />
                    <span className="text-sm font-medium text-white/30">Monate</span>
                  </div>
                </FieldCard>

                <div className="rounded-2xl border border-white/5 bg-[#0B0D12] p-5">
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-white/20">
                    {archiveDic.insurance_value || "Versicherungswert"}
                  </label>
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-emerald-400" />
                    <input
                      type="number"
                      step={1000}
                      value={data.insuranceValue || ""}
                      onChange={(e) => updateData({ insuranceValue: parseNumber(e.target.value) })}
                      className="w-full bg-transparent text-sm font-bold text-white outline-none"
                      placeholder="Gesamtwert in €"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <OptionCard
                checked={data.pickupRequired}
                title={archiveDic.pickup || "Sicherheits-Abholung"}
                description="Fachgerechter Transport durch geschultes Archiv-Personal."
                onChange={(c) => updateData({ pickupRequired: c })}
                icon={<Truck size={18} className="text-blue-400" />}
              />
              <OptionCard
                checked={data.securityShredding}
                title={archiveDic.shredding || "Zertifizierte Vernichtung"}
                description="DSGVO-konforme Vernichtung nach Ablauf der Frist."
                onChange={(c) => updateData({ securityShredding: c })}
                icon={<Trash2 size={18} className="text-red-400" />}
              />
              <OptionCard
                checked={data.digitalization}
                title={archiveDic.digitalization || "Scan-on-Demand"}
                description="Schnelle digitale Bereitstellung einzelner Dokumente."
                onChange={(c) => updateData({ digitalization: c })}
                icon={<Scan size={18} className="text-amber-400" />}
              />
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
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20">
                {dic?.calculator?.notes_title || "Besonderheiten / Anmerkungen"}
              </label>
              <textarea
                value={data.freeTextNote || ""}
                onChange={(e) => updateData({ freeTextNote: e.target.value })}
                placeholder="Details zur Archivstruktur, Vertraulichkeitsstufen oder Zugangsbeschränkungen..."
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
        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">{label}</label>
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
