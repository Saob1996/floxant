"use client";

import React from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { m, AnimatePresence } from "framer-motion";
import {
 Paintbrush,
 Maximize,
 CheckCircle2,
 Home,
 Waves,
} from "lucide-react";
import { ExpertTooltip } from "../ExpertTooltip";

function parseNumber(value: string): number {
 if (!value.trim()) return 0;
 const parsed = Number.parseInt(value, 10);
 return Number.isFinite(parsed) ? parsed : 0;
}

export default function PaintingForm({ dic, currentStep = 1 }: { dic?: any; currentStep?: number }) {
 const malerarbeitenData = useCalculatorStore((s) => s.malerarbeitenData);
 const updateMalerarbeitenData = useCalculatorStore((s) => s.updateMalerarbeitenData);

 const qualities = [
  { id: "standard", label: "Standard", desc: "Solide Markenfarbe (weiß)", color: "text-blue-400" },
  { id: "premium", label: "Premium", desc: "Besonders deckend & abwaschbar", color: "text-purple-400" },
  { id: "bio", label: "Öko / Bio", desc: "Emissionsfrei & Allergikerfreundlich", color: "text-emerald-400" },
 ];

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
        <Maximize size={14} className="text-blue-400" />
        Flächen & Räume
       </h3>

       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FieldCard label={dic?.calculator?.painting_area || "Wandfläche gesamt"}>
         <div className="flex items-center gap-2">
          <input
           type="number"
           min={1}
           value={malerarbeitenData.areaM2 || ""}
           onChange={(e) => updateMalerarbeitenData({ areaM2: parseNumber(e.target.value) })}
           placeholder="z. B. 120"
           className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/20"
          />
          <span className="text-sm font-medium text-white/30">m²</span>
         </div>
        </FieldCard>

        <FieldCard label={dic?.calculator?.rooms || "Anzahl der Räume"}>
         <div className="flex items-center gap-2">
          <input
           type="number"
           min={1}
           value={malerarbeitenData.roomsCount || ""}
           onChange={(e) => updateMalerarbeitenData({ roomsCount: parseNumber(e.target.value) })}
           placeholder="z. B. 3"
           className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/20"
          />
          <Home size={18} className="text-white/20" />
         </div>
        </FieldCard>
       </div>
      </div>

      <div className="space-y-4">
       <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Farb-Qualität</label>
       <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {qualities.map((q) => (
         <button
          key={q.id}
          onClick={() => updateMalerarbeitenData({ paintQuality: q.id as any })}
          className={`flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-all ${
           malerarbeitenData.paintQuality === q.id 
            ? "border-blue-500/30 bg-blue-500/10" 
            : "border-white/5 bg-[#0B0D12] hover:bg-white/5"
          }`}
         >
          <span className={`text-[10px] font-bold uppercase tracking-widest ${q.color}`}>{q.label}</span>
          <span className="text-[11px] text-white/40">{q.desc}</span>
         </button>
        ))}
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
       <OptionCard
        checked={malerarbeitenData.includesCeiling}
        title="Decken streichen"
        description="Wir streichen auch alle Zimmerdecken."
        onChange={(c) => updateMalerarbeitenData({ includesCeiling: c })}
        icon={<Waves size={18} className="text-blue-400" />}
       />
       <OptionCard
        checked={malerarbeitenData.includesDoors}
        title="Türen & Rahmen"
        description="Lackieren von Türblättern und Zargen."
        onChange={(c) => updateMalerarbeitenData({ includesDoors: c })}
        icon={<Paintbrush size={18} className="text-purple-400" />}
       />
       <OptionCard
        checked={malerarbeitenData.isFurnished}
        title="Möblierte Wohnung"
        description="Wir rücken und decken Ihre Möbel fachgerecht ab."
        onChange={(c) => updateMalerarbeitenData({ isFurnished: c })}
        icon={<Home size={18} className="text-emerald-400" />}
       />
      </div>

      <div className="space-y-4">
       <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Sonderwünsche</label>
       <textarea
        value={malerarbeitenData.freeTextNote || ""}
        onChange={(e) => updateMalerarbeitenData({ freeTextNote: e.target.value })}
        placeholder="Details zu bunten Wänden, Mustertapeten oder Nikotinentfernung..."
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
