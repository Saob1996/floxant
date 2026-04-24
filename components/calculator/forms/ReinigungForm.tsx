"use client";

import React from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, CheckCircle2 } from "lucide-react";

type PropertyType = "wohnung" | "haus" | "buero";
type ConditionLevel = "leicht" | "mittel" | "stark";

function parseNumber(value: string): number {
 if (!value.trim()) return 0;
 const parsed = Number.parseInt(value, 10);
 return Number.isFinite(parsed) ? parsed : 0;
}

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
      <div className="rounded-[24px] border border-white/5 bg-white/[0.02] p-6 lg:p-8">
       <h3 className="mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
        <Sparkles size={14} className="text-emerald-400" />
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
            onChange={(e) => updateReinigungData({ areaM2: parseNumber(e.target.value) })}
            placeholder="z. B. 80"
            className="w-full bg-transparent text-2xl font-bold text-white outline-none placeholder:text-white/10"
           />
           <span className="text-lg font-bold text-white/20">m2</span>
          </div>

          <div className="flex flex-wrap gap-2">
           {[40, 60, 80, 120, 160].map((size) => (
            <button
             key={size}
             type="button"
             onClick={() => updateReinigungData({ areaM2: size })}
             className={cn(
              "rounded-xl border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
              reinigungData.areaM2 === size
               ? "border-emerald-400 bg-emerald-500 text-white"
               : "border-white/5 bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/60"
             )}
            >
             {size} m2
            </button>
           ))}
          </div>
         </div>
        </FieldCard>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
         <FieldCard label="Objektart">
          <select
           value={reinigungData.propertyType}
           onChange={(e) => updateReinigungData({ propertyType: e.target.value as PropertyType })}
           className="w-full bg-transparent text-sm font-bold text-white outline-none"
          >
           <option value="wohnung" className="bg-[#0B0D12]">Wohnung</option>
           <option value="haus" className="bg-[#0B0D12]">Haus</option>
           <option value="buero" className="bg-[#0B0D12]">Buero / Gewerbe</option>
          </select>
         </FieldCard>
         <FieldCard label="Fensteranzahl (ca.)">
          <input
           type="number"
           min={0}
           value={reinigungData.windowsCount || ""}
           onChange={(e) => updateReinigungData({ windowsCount: parseNumber(e.target.value) })}
           placeholder="Anzahl"
           className="w-full bg-transparent text-sm font-bold text-white outline-none"
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
        onChange={(checked) => updateReinigungData({ frequency: checked ? "regelmaessig" : "einmalig" })}
       />
       <OptionCard
        checked={reinigungData.isFurnished}
        title="Objekt moebliert"
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
      <div className="rounded-[24px] border border-white/5 bg-white/[0.02] p-6 lg:p-8">
       <h3 className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
        <Sparkles size={14} className="text-blue-400" />
        Zustand und Extras
       </h3>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FieldCard label="Verschmutzungsgrad">
         <select
          value={reinigungData.condition}
          onChange={(e) => updateReinigungData({ condition: e.target.value as ConditionLevel })}
          className="w-full bg-transparent text-sm font-bold text-white outline-none"
         >
          <option value="leicht" className="bg-[#0B0D12]">Leicht / Normal</option>
          <option value="mittel" className="bg-[#0B0D12]">Mittel / Sichtbar</option>
          <option value="stark" className="bg-[#0B0D12]">Stark / Baustelle</option>
         </select>
        </FieldCard>
        <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-white/5 bg-[#0B0D12] p-4 transition-all hover:bg-white/5">
         <input
          type="checkbox"
          checked={reinigungData.uncertainCondition}
          onChange={(e) => updateReinigungData({ uncertainCondition: e.target.checked })}
          className="h-5 w-5 accent-blue-500"
         />
         <div className="flex flex-col">
          <span className="text-xs font-bold text-white">Zustand noch unsicher?</span>
          <span className="text-[10px] text-white/40">Dann bleibt die Einordnung bewusst breiter.</span>
         </div>
        </label>
       </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
       {[
        { id: "kueche_tiefenreinigung", title: "Küche+", icon: "K" },
        { id: "bad_kalk", title: "Bad Kalk", icon: "B" },
        { id: "teppich", title: "Teppich", icon: "T" },
        { id: "fenster_glas", title: "Glas", icon: "G" },
       ].map((extra) => (
        <button
         key={extra.id}
         type="button"
         onClick={() => toggleExtra(extra.id)}
         className={cn(
          "flex flex-col items-center justify-center rounded-3xl border p-4 transition-all hover:scale-[1.02] active:scale-[0.98]",
          reinigungData.extras.includes(extra.id)
           ? "border-blue-500/30 bg-blue-600/10 text-white"
           : "border-white/5 bg-[#0B0D12] text-white/30 hover:border-white/10"
         )}
        >
         <span className="mb-2 text-xl">{extra.icon}</span>
         <span className="text-[10px] font-bold uppercase tracking-widest">{extra.title}</span>
        </button>
       ))}
      </div>

      <div className="space-y-4">
       <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Besondere Hinweise</label>
       <textarea
        value={reinigungData.freeTextNote || ""}
        onChange={(e) => updateReinigungData({ freeTextNote: e.target.value })}
      placeholder="Details zu Haustieren, empfindlichen Oberflächen oder Zugang..."
        className="h-28 w-full resize-none rounded-2xl border border-white/5 bg-[#0B0D12] p-4 text-sm font-medium text-white outline-none placeholder:text-white/20 focus:border-emerald-500/20"
       />
      </div>
     </m.div>
    ) : null}
   </AnimatePresence>

   <div className="flex items-start gap-3 rounded-2xl border border-blue-400/10 bg-blue-400/[0.06] px-4 py-3">
    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-300" />
    <p className="text-xs leading-relaxed text-white/55">
     Je klarer Zustand und Sonderwuensche beschrieben sind, desto belastbarer wird die
     Vorprüfung.
    </p>
   </div>
  </div>
 );
}

function FieldCard({ label, children }: { label: string; children: React.ReactNode }) {
 return (
  <div className="space-y-2 rounded-2xl border border-white/10 bg-[#0B0D12] p-4 shadow-sm transition-all hover:border-white/20">
   <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/30">{label}</label>
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
    "flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-all",
    checked
     ? "border-emerald-500/30 bg-emerald-500/[0.07]"
     : "border-white/10 bg-[#0B0D12] hover:border-white/20 hover:bg-white/[0.03]"
   )}
  >
   <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-5 w-5 accent-emerald-500" />
   <div>
    <span className="block text-sm font-bold text-white">{title}</span>
    <span className="text-[11px] font-medium leading-relaxed text-white/50">{description}</span>
   </div>
  </label>
 );
}
