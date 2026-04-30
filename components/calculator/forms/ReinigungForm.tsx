"use client";

import React from "react";
import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

import { useCalculatorStore } from "@/store/calculatorStore";
import { cn } from "@/lib/utils";

type PropertyType = "wohnung" | "haus" | "buero";
type ConditionLevel = "leicht" | "mittel" | "stark";

function parseNumber(value: string): number {
 if (!value.trim()) return 0;
 const parsed = Number.parseInt(value, 10);
 return Number.isFinite(parsed) ? parsed : 0;
}

const cleaningExtras = [
 { id: "kueche_tiefenreinigung", title: "Küche+", icon: "K" },
 { id: "bad_kalk", title: "Bad Kalk", icon: "B" },
 { id: "teppich", title: "Teppich", icon: "T" },
 { id: "fenster_glas", title: "Glas", icon: "G" },
];

export default function ReinigungForm({ dic, currentStep }: { dic?: any; currentStep: number }) {
 const reinigungData = useCalculatorStore((state) => state.reinigungData);
 const updateReinigungData = useCalculatorStore((state) => state.updateReinigungData);

 const toggleExtra = (extra: string) => {
  const exists = reinigungData.extras.includes(extra);
  updateReinigungData({
   extras: exists
    ? reinigungData.extras.filter((item) => item !== extra)
    : [...reinigungData.extras, extra],
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
      <div className="calc-surface rounded-[2rem] p-6 lg:p-8">
       <h3 className="calc-kicker mb-8">
        <Sparkles size={14} className="text-emerald-500" />
        Objekt-Eckdaten
       </h3>

       <div className="space-y-6">
        <FieldCard label="Zu reinigende Fläche">
         <div className="space-y-4">
          <div className="flex items-center gap-3">
           <input
            type="number"
            min={0}
            value={reinigungData.areaM2 || ""}
            onChange={(event) =>
             updateReinigungData({ areaM2: parseNumber(event.target.value) })
            }
            placeholder="z. B. 80"
            className="calc-input text-2xl"
           />
           <span className="text-lg font-bold text-slate-400">m²</span>
          </div>

          <div className="flex flex-wrap gap-2">
           {[40, 60, 80, 120, 160].map((size) => (
            <button
             key={size}
             type="button"
             data-active={reinigungData.areaM2 === size}
             onClick={() => updateReinigungData({ areaM2: size })}
             className={cn(
              "calc-chip-card rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em]",
              reinigungData.areaM2 === size ? "text-emerald-700" : "text-slate-600",
             )}
            >
             {size} m²
            </button>
           ))}
          </div>
         </div>
        </FieldCard>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
         <FieldCard label="Objektart">
          <select
           value={reinigungData.propertyType}
           onChange={(event) =>
            updateReinigungData({ propertyType: event.target.value as PropertyType })
           }
           className="calc-select text-sm"
          >
           <option value="wohnung">Wohnung</option>
           <option value="haus">Haus</option>
           <option value="buero">Büro / Gewerbe</option>
          </select>
         </FieldCard>
         <FieldCard label="Fensteranzahl (ca.)">
          <input
           type="number"
           min={0}
           value={reinigungData.windowsCount || ""}
           onChange={(event) =>
            updateReinigungData({ windowsCount: parseNumber(event.target.value) })
           }
           placeholder="Anzahl"
           className="calc-input text-sm"
          />
         </FieldCard>
        </div>
       </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
       <OptionCard
        checked={reinigungData.frequency === "regelmaessig"}
        title="Regelmäßige Reinigung"
        description="Wiederkehrende Leistung mit anderem Aufwand als ein Einzeltermin."
        onChange={(checked) =>
         updateReinigungData({ frequency: checked ? "regelmaessig" : "einmalig" })
        }
       />
       <OptionCard
        checked={reinigungData.isFurnished}
        title="Objekt möbliert"
        description="Inventar und enge Objektstruktur werden als Aufwandstreiber berücksichtigt."
        onChange={(checked) => updateReinigungData({ isFurnished: checked })}
       />
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
      <div className="calc-surface rounded-[2rem] p-6 lg:p-8">
       <h3 className="calc-kicker mb-6">
        <Sparkles size={14} className="text-blue-500" />
        Zustand und Extras
       </h3>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FieldCard label="Verschmutzungsgrad">
         <select
          value={reinigungData.condition}
          onChange={(event) =>
           updateReinigungData({ condition: event.target.value as ConditionLevel })
          }
          className="calc-select text-sm"
         >
          <option value="leicht">Leicht / Normal</option>
          <option value="mittel">Mittel / Sichtbar</option>
          <option value="stark">Stark / Baustelle</option>
         </select>
        </FieldCard>
        <label className="calc-option-card flex cursor-pointer items-center gap-4 p-4">
         <input
          type="checkbox"
          checked={reinigungData.uncertainCondition}
          onChange={(event) =>
           updateReinigungData({ uncertainCondition: event.target.checked })
          }
          className="h-5 w-5 accent-blue-500"
         />
         <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-900">Zustand noch unsicher?</span>
          <span className="calc-help">
           Dann bleibt die Einordnung bewusst etwas breiter.
          </span>
         </div>
        </label>
       </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
       {cleaningExtras.map((extra) => {
        const active = reinigungData.extras.includes(extra.id);
        return (
         <button
          key={extra.id}
          type="button"
          data-active={active}
          onClick={() => toggleExtra(extra.id)}
          className={cn(
           "calc-chip-card flex flex-col items-center justify-center rounded-[1.6rem] p-4 hover:scale-[1.02] active:scale-[0.98]",
           active ? "text-blue-700" : "text-slate-600",
          )}
         >
          <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-sm font-black">
           {extra.icon}
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.14em]">
           {extra.title}
          </span>
         </button>
        );
       })}
      </div>

      <div className="space-y-4">
       <label className="calc-label">Besondere Hinweise</label>
       <textarea
        value={reinigungData.freeTextNote || ""}
        onChange={(event) => updateReinigungData({ freeTextNote: event.target.value })}
        placeholder="Details zu Haustieren, empfindlichen Oberflächen oder Zugang..."
        className="calc-field calc-textarea h-28 p-4 text-sm"
       />
      </div>
     </m.div>
    ) : null}
   </AnimatePresence>

   <div className="flex items-start gap-3 rounded-[1.5rem] border border-blue-100 bg-blue-50 px-4 py-3">
    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-600" />
    <p className="text-xs leading-relaxed text-slate-600">
     Je klarer Zustand und Sonderwünsche beschrieben sind, desto belastbarer wird die
     Vorprüfung.
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
   className="calc-option-card flex cursor-pointer items-start gap-4 p-5"
  >
   <input
    type="checkbox"
    checked={checked}
    onChange={(event) => onChange(event.target.checked)}
    className="mt-0.5 h-5 w-5 accent-emerald-500"
   />
   <div>
    <span className="block text-sm font-bold text-slate-950">{title}</span>
    <span className="calc-help">{description}</span>
   </div>
  </label>
 );
}
