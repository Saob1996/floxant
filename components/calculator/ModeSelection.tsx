"use client";

import React from "react";
import { m } from "framer-motion";
import { Truck, Sparkles, Trash2, ArrowRight, Check, Users } from "lucide-react";
import { useCalculatorStore, ServiceType } from "@/store/calculatorStore";
import { cn } from "@/lib/utils";
import Magnetic from "../ui/Magnetic";

interface ModeSelectionProps {
 dic: any;
}

export default function ModeSelection({ dic }: ModeSelectionProps) {
 const setMode = useCalculatorStore((state) => state.setMode);
 const setServiceType = useCalculatorStore((state) => state.setServiceType);

 const handleSelectService = (service: ServiceType) => {
  setServiceType(service);
  setMode("advanced");
 };

 const options = [
  {
   id: "umzug" as ServiceType,
   title: dic?.calculator?.service_umzug_title || "Umzug & Transport",
   desc: dic?.calculator?.service_umzug_desc || "Professioneller Umzug mit nachvollziehbarer Vorprüfung zu Aufwand, Strecke und Zusatzleistungen.",
   icon: Truck,
   color: "blue",
   features: ["Inventar und Volumen", "Zugang und Laufwege", "Montageleistungen"],
  },
  {
   id: "reinigung" as ServiceType,
   title: dic?.calculator?.service_reinigung_title || "Reinigung",
   desc: dic?.calculator?.service_reinigung_desc || "Reinigung mit klarer Einordnung zu Fläche, Zustand, Extras und Terminlage.",
   icon: Sparkles,
   color: "emerald",
   features: ["Fläche und Zustand", "Fenster und Extras", "Möblierung"],
  },
  {
   id: "entsorgung" as ServiceType,
   title: dic?.calculator?.service_entsorgung_title || "Entrümpelung",
   desc: dic?.calculator?.service_entsorgung_desc || "Entrümpelung und Entsorgung mit sauberer Vorprüfung zu Volumen, Zugang und Materialarten.",
   icon: Trash2,
   color: "orange",
   features: ["Volumen und Material", "Zugang und Laufweg", "Demontage und Dringlichkeit"],
  },
  {
   id: "budget" as any,
   title: "Preisvorschlag",
   desc: "Haben Sie einen Zielrahmen? Nennen Sie Ihre Preisvorstellung als Zusatzinformation zur späteren Vorprüfung.",
   icon: Users,
   color: "blue",
   features: ["Zielbudget optional", "Systemschätzung bleibt getrennt", "Bessere Einordnung"],
   isLink: true,
   href: "/anfrage-mit-preisrahmen"
  },
 ];

 return (
  <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-16">
   <div className="mb-12 text-center">
    <m.div
     initial={{ opacity: 0, y: 10 }}
     animate={{ opacity: 1, y: 0 }}
     className="flex flex-col items-center gap-4"
    >
     <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
      <span className="relative flex h-2 w-2">
       <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
       <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
      </span>
      {dic?.common?.unbinding_note || "Unverbindlich"}
     </div>

     <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter text-white/30">
      <Users size={12} />
      {dic?.lang === "en" ? "CLEAR INTAKE FOR BAVARIA" : "KLARER EINSTIEG FÜR BAYERN"}
     </div>
    </m.div>

    <m.h2
     initial={{ opacity: 0, y: 15 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: 0.1 }}
     className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
    >
     {dic?.calculator?.selection_title || "Wofür möchten Sie die Kosten einordnen?"}
    </m.h2>
    <m.p
     initial={{ opacity: 0, y: 15 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: 0.2 }}
     className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/50"
    >
     {dic?.calculator?.selection_subtitle || "Wählen Sie Ihren Service für eine unverbindliche Vorprüfung mit realistischem Orientierungsrahmen."}
    </m.p>
   </div>

   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {options.map((option, index) => {
     const Icon = option.icon;

     return (
      <m.div
       key={option.id}
       initial={{ opacity: 0, y: 30 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 100 }}
       className="relative"
      >
       <Magnetic strength={0.2}>
        <button
         type="button"
         onClick={() => (option as any).isLink ? (window.location.href = (option as any).href) : handleSelectService(option.id)}
         className="group relative h-full w-full cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#0F1116] p-8 text-start transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-white/5"
        >
         <div
          className={cn(
           "absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[90px] transition-all duration-700 group-hover:opacity-60 group-hover:blur-[70px]",
           option.color === "blue" && "bg-blue-600/10 opacity-20",
           option.color === "emerald" && "bg-emerald-600/10 opacity-20",
           option.color === "orange" && "bg-orange-600/10 opacity-20"
          )}
         />

         <div className="relative z-10 flex h-full flex-col">
          <div className="mb-8 flex items-start justify-between">
           <div
            className={cn(
             "flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/[0.08]",
             option.color === "blue" && "text-blue-400",
             option.color === "emerald" && "text-emerald-400",
             option.color === "orange" && "text-orange-400"
            )}
           >
            <Icon size={32} />
           </div>
          </div>

          <h3 className="mb-4 text-2xl font-bold text-white">{option.title}</h3>
          <p className="mb-8 text-sm leading-relaxed text-white/50 transition-colors group-hover:text-white/70">
           {option.desc}
          </p>

          <ul className="mb-10 space-y-3">
           {option.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm text-white/60">
             <div
              className={cn(
               "flex h-5 w-5 items-center justify-center rounded-full bg-white/10",
               option.color === "blue" && "text-blue-400",
               option.color === "emerald" && "text-emerald-400",
               option.color === "orange" && "text-orange-400"
              )}
             >
              <Check size={12} strokeWidth={3} />
             </div>
             {feature}
            </li>
           ))}
          </ul>

          <div className="mt-auto pt-4">
           {(option as any).isLink ? (
            <span
             className={cn(
              "flex items-center gap-2 text-sm font-bold tracking-tight transition-all group-hover:translate-x-1",
              "text-blue-400"
             )}
            >
              Mehr erfahren
              <ArrowRight size={18} />
            </span>
           ) : (
            <div
             className={cn(
              "flex items-center gap-2 text-sm font-bold tracking-tight transition-all group-hover:translate-x-1",
              option.color === "blue" && "text-blue-400",
              option.color === "emerald" && "text-emerald-400",
              option.color === "orange" && "text-orange-400"
             )}
            >
             {dic?.calculator?.start_btn || "Rechner starten"}
             <ArrowRight size={18} />
            </div>
           )}
          </div>
         </div>
        </button>
       </Magnetic>
      </m.div>
     );
    })}
   </div>
  </div>
 );
}
