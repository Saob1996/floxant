"use client";

import React, { useMemo } from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Trash2, Route, AlertTriangle, CheckCircle2 } from "lucide-react";

type AccessDifficulty = "einfach" | "mittel" | "schwer";
type UrgencyType = "flexibel" | "dringend";

function parseNumber(value: string): number {
  if (!value.trim()) return 0;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function EntsorgungForm({ dic, currentStep }: { dic?: any; currentStep: number }) {
  const entsorgungData = useCalculatorStore((state) => state.entsorgungData);
  const updateEntsorgungData = useCalculatorStore((state) => state.updateEntsorgungData);
  const wasteCategories = useMemo(
    () => [
      { id: "sperrmuell", label: dic?.calculator?.bulky_waste || "Sperrmüll" },
      { id: "elektroschrott", label: dic?.calculator?.e_waste || "Elektroschrott" },
      { id: "bauschutt", label: dic?.calculator?.construction_waste || "Bauschutt" },
      { id: "gruenschnitt", label: dic?.calculator?.green_waste || "Gruenschnitt" },
      { id: "hausmuell", label: dic?.calculator?.household_waste || "Hausmüll" },
      { id: "altmetall", label: dic?.calculator?.scrap_metal || "Altmetall" },
      { id: "mischabfall", label: dic?.calculator?.mixed_waste || "Mischabfall" },
    ],
    [dic]
  );

  const toggleCategory = (category: string) => {
    const exists = entsorgungData.wasteCategories.includes(category);
    updateEntsorgungData({
      wasteCategories: exists
        ? entsorgungData.wasteCategories.filter((item) => item !== category)
        : [...entsorgungData.wasteCategories, category],
    });
  };

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {currentStep === 1 ? (
          <m.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="rounded-[24px] border border-white/5 bg-white/[0.02] p-6">
              <h3 className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                <Trash2 size={14} className="text-blue-400" />
                {dic?.calculator?.waste_volume_title || "Volumen und Material"}
              </h3>

              <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2">
                <FieldCard label={dic?.calculator?.estimated_waste_volume || "Geschaetztes Volumen"}>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      value={entsorgungData.wasteVolumeM3 || ""}
                      onChange={(e) => updateEntsorgungData({ wasteVolumeM3: parseNumber(e.target.value) })}
                      placeholder="z. B. 8"
                      className="w-full bg-transparent text-lg font-bold text-white outline-none"
                    />
                    <span className="text-sm font-medium text-white/30">m3</span>
                  </div>
                </FieldCard>
                <label className="flex h-full cursor-pointer items-center gap-4 rounded-2xl border border-white/5 bg-[#0B0D12] p-4 transition-all hover:bg-white/10">
                  <input
                    type="checkbox"
                    checked={entsorgungData.uncertainVolume}
                    onChange={(e) => updateEntsorgungData({ uncertainVolume: e.target.checked })}
                    className="h-5 w-5 accent-blue-500"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Menge noch unklar?</span>
                    <span className="text-[10px] text-white/40">Dann bleibt die Einordnung bewusst breiter.</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Materialarten (Mehrfachwahl)</label>
              <div className="flex flex-wrap gap-2">
                {wasteCategories.map((category) => {
                  const active = entsorgungData.wasteCategories.includes(category.id);
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className={cn(
                        "rounded-xl border px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all",
                        active
                          ? "border-blue-500/30 bg-blue-600/10 text-white"
                          : "border-white/5 bg-[#0B0D12] text-white/30 hover:border-white/10"
                      )}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </m.div>
        ) : null}

        {currentStep === 2 ? (
          <m.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="rounded-[24px] border border-white/5 bg-white/[0.02] p-6">
              <h3 className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                <Route size={14} className="text-blue-400" />
                Zugang und Logistik
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FieldCard label="Zugaenglichkeit">
                  <select
                    value={entsorgungData.accessDifficulty}
                    onChange={(e) => updateEntsorgungData({ accessDifficulty: e.target.value as AccessDifficulty })}
                    className="w-full bg-transparent text-sm font-bold text-white outline-none"
                  >
                    <option value="einfach" className="bg-[#0B0D12]">Einfach (EG / Lift)</option>
                    <option value="mittel" className="bg-[#0B0D12]">Mittel (Treppe)</option>
                    <option value="schwer" className="bg-[#0B0D12]">Schwer (eng / Hinterhof)</option>
                  </select>
                </FieldCard>
                <FieldCard label="Laufweg zum Fahrzeug">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      value={entsorgungData.loadingDistanceMeters || ""}
                      onChange={(e) => updateEntsorgungData({ loadingDistanceMeters: parseNumber(e.target.value) })}
                      placeholder="z. B. 20"
                      className="w-full bg-transparent text-sm font-bold text-white outline-none"
                    />
                    <span className="text-sm font-medium text-white/30">Meter</span>
                  </div>
                </FieldCard>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <OptionCard
                checked={entsorgungData.disassemblyRequired}
                title="Demontage-Service"
                description="Auseinanderbauen von Möbeln oder Einbauten vor Ort."
                onChange={(checked) => updateEntsorgungData({ disassemblyRequired: checked })}
              />
              <OptionCard
                checked={entsorgungData.hazardMaterials}
                title="Problemstoffe"
                description="Farben, Oele oder andere Stoffe mit Sonderaufwand."
                onChange={(checked) => updateEntsorgungData({ hazardMaterials: checked })}
              />
            </div>

            <div className="rounded-[24px] border border-white/5 bg-white/[0.02] p-6">
              <h3 className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                <AlertTriangle size={14} className="text-amber-500" />
                Zeitplan und Hinweise
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FieldCard label="Dringlichkeit">
                  <select
                    value={entsorgungData.urgency}
                    onChange={(e) => updateEntsorgungData({ urgency: e.target.value as UrgencyType })}
                    className="w-full bg-transparent text-sm font-bold text-white outline-none"
                  >
                    <option value="flexibel" className="bg-[#0B0D12]">Flexibel</option>
                    <option value="dringend" className="bg-[#0B0D12]">Dringend</option>
                  </select>
                </FieldCard>
                <textarea
                  value={entsorgungData.freeTextNote || ""}
                  onChange={(e) => updateEntsorgungData({ freeTextNote: e.target.value })}
                  placeholder="Wichtige Details zum Standort, Zugang oder Spezialaufwand..."
                  className="h-24 w-full resize-none rounded-2xl border border-white/5 bg-[#0B0D12] p-4 text-sm font-medium text-white outline-none placeholder:text-white/20"
                />
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>

      <div className="flex items-start gap-3 rounded-2xl border border-blue-400/10 bg-blue-400/[0.06] px-4 py-3">
        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-300" />
        <p className="text-xs leading-relaxed text-white/55">
          Je klarer Volumen, Zugang und Materialarten beschrieben sind, desto belastbarer wird die
          Vorprüfung.
        </p>
      </div>
    </div>
  );
}

function FieldCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 rounded-2xl border border-white/10 bg-[#0B0D12] p-4">
      <label className="text-[11px] uppercase tracking-[0.14em] text-white/40">{label}</label>
      {children}
    </div>
  );
}

function OptionCard({
  checked,
  title,
  description,
  onChange,
}: {
  checked: boolean;
  title: string;
  description: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors",
        checked
          ? "border-blue-400/30 bg-blue-400/[0.07]"
          : "border-white/10 bg-[#0B0D12] hover:bg-white/[0.03]"
      )}
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 accent-blue-500" />
      <div>
        <span className="block text-sm font-medium text-white">{title}</span>
        <span className="text-[11px] leading-relaxed text-white/50">{description}</span>
      </div>
    </label>
  );
}
