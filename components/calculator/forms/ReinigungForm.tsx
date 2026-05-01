"use client";

import React from "react";
import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

import { useCalculatorStore } from "@/store/calculatorStore";
import type { CleaningGoal, CleaningPropertyType, ReinigungAdvancedData } from "@/store/calculatorStore";
import { cn } from "@/lib/utils";

type ConditionLevel = "leicht" | "mittel" | "stark";

function parseNumber(value: string): number {
 if (!value.trim()) return 0;
 const parsed = Number.parseInt(value, 10);
 return Number.isFinite(parsed) ? parsed : 0;
}

const cleaningExtras = [
 { id: "kueche_tiefenreinigung", title: "Küche intensiv", icon: "K" },
 { id: "bad_kalk", title: "Bad / Kalk", icon: "B" },
 { id: "teppich", title: "Teppich", icon: "T" },
 { id: "fenster_glas", title: "Fenster / Glas", icon: "G" },
];

const cleaningGoals: Array<{
 id: CleaningGoal;
 title: string;
 description: string;
 signal: string;
}> = [
 {
  id: "uebergabe",
  title: "Übergabe / Auszug",
  description: "Wenn Wohnung, Schlüssel und letzter Eindruck zusammenpassen müssen.",
  signal: "Frist & Details",
 },
 {
  id: "grundreinigung",
  title: "Grundreinigung",
  description: "Für stärkere Reinigung, sichtbare Rückstände und mehr Detailarbeit.",
  signal: "Mehr Tiefe",
 },
 {
  id: "unterhalt",
  title: "Regelmäßig / Büro",
  description: "Für laufende Reinigung mit planbarem Turnus und klaren Bereichen.",
  signal: "Wiederkehrend",
 },
 {
  id: "einzug",
  title: "Einzug vorbereiten",
  description: "Wenn Räume vor Nutzung sauber, ruhig und bezugsbereit wirken sollen.",
  signal: "Vor Nutzung",
 },
];

const propertyTypeOptions: Array<{ value: CleaningPropertyType; label: string }> = [
 { value: "wohnung", label: "Wohnung" },
 { value: "haus", label: "Haus" },
 { value: "buero", label: "Büro / Gewerbe" },
 { value: "praxis", label: "Praxis / Kundenfläche" },
 { value: "treppenhaus", label: "Treppenhaus" },
];

const cleaningPresets: Array<{
 title: string;
 description: string;
 patch: Partial<ReinigungAdvancedData>;
}> = [
 {
  title: "Wohnung vor Übergabe",
  description: "Auszug, Abnahme oder letzter sauberer Eindruck.",
  patch: {
   cleaningGoal: "uebergabe",
   propertyType: "wohnung",
   areaM2: 75,
   condition: "mittel",
   frequency: "einmalig",
   windowsCount: 6,
   isFurnished: false,
   cleaningGuarantee: true,
   extras: ["kueche_tiefenreinigung", "bad_kalk"],
  },
 },
 {
  title: "Büro laufend",
  description: "Regelmäßige Reinigung ohne Betriebsstörung.",
  patch: {
   cleaningGoal: "unterhalt",
   propertyType: "buero",
   areaM2: 140,
   condition: "leicht",
   frequency: "regelmaessig",
   windowsCount: 8,
   isFurnished: true,
   cleaningGuarantee: false,
   extras: [],
  },
 },
 {
  title: "Grundreinigung",
  description: "Mehr Detailarbeit bei sichtbarer Nutzung.",
  patch: {
   cleaningGoal: "grundreinigung",
   propertyType: "wohnung",
   areaM2: 90,
   condition: "stark",
   frequency: "einmalig",
   windowsCount: 8,
   isFurnished: false,
   cleaningGuarantee: true,
   uncertainCondition: true,
   extras: ["kueche_tiefenreinigung", "bad_kalk", "fenster_glas"],
  },
 },
 {
  title: "Treppenhaus",
  description: "Flächen, Turnus und Zugang schnell einordnen.",
  patch: {
   cleaningGoal: "unterhalt",
   propertyType: "treppenhaus",
   areaM2: 60,
   condition: "mittel",
   frequency: "regelmaessig",
   windowsCount: 0,
   isFurnished: false,
   cleaningGuarantee: false,
   extras: [],
  },
 },
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

       <div className="mb-6 rounded-[1.6rem] border border-emerald-100 bg-emerald-50/70 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
         <div>
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
           Schnellprofil
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-700">
           Wählen Sie einen typischen Startpunkt. Alle Werte bleiben danach frei anpassbar.
          </p>
         </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
         {cleaningPresets.map((preset) => (
          <button
           key={preset.title}
           type="button"
           onClick={() => updateReinigungData(preset.patch)}
           className="group rounded-[1.15rem] border border-emerald-100 bg-white px-4 py-4 text-left shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-md"
          >
           <span className="block text-sm font-bold text-slate-950">{preset.title}</span>
           <span className="mt-1 block text-xs leading-5 text-slate-600">{preset.description}</span>
           <span className="mt-3 inline-flex text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700">
            übernehmen
           </span>
          </button>
         ))}
        </div>
       </div>

       <div className="mb-6 flex flex-wrap gap-2">
       {[
         "Ziel zuerst: Übergabe, Grundreinigung oder laufende Betreuung",
         "Fläche, Zustand und Extras steuern den Rahmen am stärksten",
         "Fotos und kurze Hinweise machen die Prüfung deutlich schneller",
        ].map((item) => (
         <span
          key={item}
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium text-slate-600 shadow-sm shadow-slate-950/5"
         >
          {item}
         </span>
        ))}
       </div>

       <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
         {cleaningGoals.map((goal) => {
          const active = reinigungData.cleaningGoal === goal.id;

          return (
           <button
            key={goal.id}
            type="button"
            data-active={active}
            onClick={() =>
             updateReinigungData({
              cleaningGoal: goal.id,
              frequency: goal.id === "unterhalt" ? "regelmaessig" : "einmalig",
              cleaningGuarantee: goal.id !== "unterhalt",
             })
            }
            className={cn(
             "calc-chip-card group flex min-h-[9.2rem] flex-col items-start justify-between rounded-[1.45rem] p-5 text-left hover:-translate-y-0.5",
             active ? "text-emerald-800" : "text-slate-700",
            )}
           >
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500 group-data-[active=true]:border-emerald-200 group-data-[active=true]:bg-emerald-50 group-data-[active=true]:text-emerald-700">
             {goal.signal}
            </span>
            <span>
             <span className="block text-base font-bold leading-tight text-slate-950">{goal.title}</span>
             <span className="mt-2 block text-sm leading-6 text-slate-600">{goal.description}</span>
            </span>
           </button>
          );
         })}
        </div>

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
            updateReinigungData({ propertyType: event.target.value as CleaningPropertyType })
           }
           className="calc-select text-sm"
          >
           <option value="">Bitte auswählen</option>
           {propertyTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
             {option.label}
            </option>
           ))}
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
        description="Für Büros, Praxen, Treppenhäuser oder feste Turnusse mit planbarer Wiederholung."
        onChange={(checked) =>
         updateReinigungData({ frequency: checked ? "regelmaessig" : "einmalig" })
        }
       />
       <OptionCard
        checked={reinigungData.isFurnished}
        title="Objekt möbliert"
        description="Möbel, enge Bereiche und Inventar verändern Wege, Tempo und Detailaufwand."
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
          <option value="mittel">Normal / sichtbar genutzt</option>
          <option value="stark">Stärker / nach Auszug oder Renovierung</option>
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
       <OptionCard
        checked={reinigungData.cleaningGuarantee}
        title="Abnahmeorientierte Endkontrolle"
        description="Keine Kautionsgarantie, aber ein zusätzlicher Blick auf Details vor Übergabe oder Nutzung."
        onChange={(checked) => updateReinigungData({ cleaningGuarantee: checked })}
       />
       <OptionCard
        checked={reinigungData.keysHandover}
        title="Schlüsselübergabe abstimmen"
        description="Sinnvoll, wenn Zugang, Rückgabe oder Ansprechpartner vor Ort geklärt werden müssen."
        onChange={(checked) => updateReinigungData({ keysHandover: checked })}
       />
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
        placeholder="z. B. Übergabetermin, Fotos vorhanden, Haustiere, empfindliche Oberflächen, Schlüsselzugang oder Bereiche mit besonderem Aufwand..."
        className="calc-field calc-textarea h-28 p-4 text-sm"
       />
      </div>
     </m.div>
    ) : null}
   </AnimatePresence>

   <div className="flex items-start gap-3 rounded-[1.5rem] border border-blue-100 bg-blue-50 px-4 py-3">
    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-600" />
   <p className="text-xs leading-relaxed text-slate-600">
     Je klarer Ziel, Zustand und Termin beschrieben sind, desto schneller kann FLOXANT den Umfang
     realistisch prüfen und den passenden Kontaktweg wählen.
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
