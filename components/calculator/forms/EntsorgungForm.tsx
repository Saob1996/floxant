"use client";

import React, { useMemo } from "react";
import { AnimatePresence, m } from "framer-motion";
import { AlertTriangle, CheckCircle2, Route, Trash2 } from "lucide-react";

import { useCalculatorStore } from "@/store/calculatorStore";
import { cn } from "@/lib/utils";

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
   { id: "gruenschnitt", label: dic?.calculator?.green_waste || "Grünschnitt" },
   { id: "hausmuell", label: dic?.calculator?.household_waste || "Hausmüll" },
   { id: "altmetall", label: dic?.calculator?.scrap_metal || "Altmetall" },
   { id: "mischabfall", label: dic?.calculator?.mixed_waste || "Mischabfall" },
  ],
  [dic],
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
      <div className="calc-surface rounded-[2rem] p-6">
       <h3 className="calc-kicker mb-6">
        <Trash2 size={14} className="text-blue-500" />
        {dic?.calculator?.waste_volume_title || "Volumen und Material"}
       </h3>

       <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2">
        <FieldCard label={dic?.calculator?.estimated_waste_volume || "Geschätztes Volumen"}>
         <div className="flex items-center gap-2">
          <input
           type="number"
           min={0}
           value={entsorgungData.wasteVolumeM3 || ""}
           onChange={(event) =>
            updateEntsorgungData({ wasteVolumeM3: parseNumber(event.target.value) })
           }
           placeholder="z. B. 8"
           className="calc-input text-lg"
          />
          <span className="text-sm font-semibold text-slate-400">m³</span>
         </div>
        </FieldCard>
        <label className="calc-option-card flex h-full cursor-pointer items-center gap-4 p-4">
         <input
          type="checkbox"
          checked={entsorgungData.uncertainVolume}
          onChange={(event) =>
           updateEntsorgungData({ uncertainVolume: event.target.checked })
          }
          className="h-5 w-5 accent-blue-500"
         />
         <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-900">Menge noch unklar?</span>
          <span className="calc-help">
           Dann bleibt die Einordnung bewusst etwas breiter.
          </span>
         </div>
        </label>
       </div>
      </div>

      <div className="space-y-4">
       <label className="calc-label">Materialarten (Mehrfachwahl)</label>
       <div className="flex flex-wrap gap-2">
        {wasteCategories.map((category) => {
         const active = entsorgungData.wasteCategories.includes(category.id);
         return (
          <button
           key={category.id}
           type="button"
           data-active={active}
           onClick={() => toggleCategory(category.id)}
           className={cn(
            "calc-chip-card rounded-xl px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em]",
            active ? "text-blue-700" : "text-slate-600",
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
      <div className="calc-surface rounded-[2rem] p-6">
       <h3 className="calc-kicker mb-6">
        <Route size={14} className="text-blue-500" />
        Zugang und Logistik
       </h3>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FieldCard label="Zugänglichkeit">
         <select
          value={entsorgungData.accessDifficulty}
          onChange={(event) =>
           updateEntsorgungData({
            accessDifficulty: event.target.value as AccessDifficulty,
           })
          }
          className="calc-select text-sm"
         >
          <option value="einfach">Einfach (EG / Lift)</option>
          <option value="mittel">Mittel (Treppe)</option>
          <option value="schwer">Schwer (eng / Hinterhof)</option>
         </select>
        </FieldCard>
        <FieldCard label="Laufweg zum Fahrzeug">
         <div className="flex items-center gap-2">
          <input
           type="number"
           min={0}
           value={entsorgungData.loadingDistanceMeters || ""}
           onChange={(event) =>
            updateEntsorgungData({
             loadingDistanceMeters: parseNumber(event.target.value),
            })
           }
           placeholder="z. B. 20"
           className="calc-input text-sm"
          />
          <span className="text-sm font-semibold text-slate-400">Meter</span>
         </div>
        </FieldCard>
       </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
       <OptionCard
        checked={entsorgungData.disassemblyRequired}
        title="Demontage-Service"
        description="Auseinanderbauen von Möbeln oder Einbauten vor Ort."
        onChange={(checked) =>
         updateEntsorgungData({ disassemblyRequired: checked })
        }
       />
       <OptionCard
        checked={entsorgungData.hazardMaterials}
        title="Problemstoffe"
        description="Farben, Öle oder andere Stoffe mit Sonderaufwand."
        onChange={(checked) =>
         updateEntsorgungData({ hazardMaterials: checked })
        }
       />
      </div>

      <div className="calc-surface rounded-[2rem] p-6">
       <h3 className="calc-kicker mb-6">
        <AlertTriangle size={14} className="text-amber-500" />
        Zeitplan und Hinweise
       </h3>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FieldCard label="Dringlichkeit">
         <select
          value={entsorgungData.urgency}
          onChange={(event) =>
           updateEntsorgungData({ urgency: event.target.value as UrgencyType })
          }
          className="calc-select text-sm"
         >
          <option value="flexibel">Flexibel</option>
          <option value="dringend">Dringend</option>
         </select>
        </FieldCard>
        <textarea
         value={entsorgungData.freeTextNote || ""}
         onChange={(event) => updateEntsorgungData({ freeTextNote: event.target.value })}
         placeholder="Wichtige Details zum Standort, Zugang oder Spezialaufwand..."
         className="calc-field calc-textarea h-24 p-4 text-sm"
        />
       </div>
      </div>
     </m.div>
    ) : null}
   </AnimatePresence>

   <div className="flex items-start gap-3 rounded-[1.5rem] border border-blue-100 bg-blue-50 px-4 py-3">
    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-600" />
    <p className="text-xs leading-relaxed text-slate-600">
     Je klarer Volumen, Zugang und Materialarten beschrieben sind, desto belastbarer wird
     die Einschätzung.
    </p>
   </div>
  </div>
 );
}

function FieldCard({ label, children }: { label: string; children: React.ReactNode }) {
 return (
  <div className="calc-field space-y-2">
   <label className="calc-label">{label}</label>
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
   data-active={checked}
   className="calc-option-card flex cursor-pointer items-start gap-3 p-4"
  >
   <input
    type="checkbox"
    checked={checked}
    onChange={(event) => onChange(event.target.checked)}
    className="mt-0.5 accent-blue-500"
   />
   <div>
    <span className="block text-sm font-semibold text-slate-950">{title}</span>
    <span className="calc-help">{description}</span>
   </div>
  </label>
 );
}
