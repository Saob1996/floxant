"use client";
import React from "react";
import { m } from "framer-motion";
import { 
  Truck, 
  Sparkles, 
  Trash2,
  ArrowRight,
  Zap,
  Check
} from "lucide-react";
import { useCalculatorStore, ServiceType } from "@/store/calculatorStore";
import { cn } from "@/lib/utils";

interface ModeSelectionProps {
  dic: any;
}

export default function ModeSelection({ dic }: ModeSelectionProps) {
  const setMode = useCalculatorStore((s) => s.setMode);
  const setServiceType = useCalculatorStore((s) => s.setServiceType);

  const handleSelectService = (service: ServiceType) => {
      setServiceType(service);
      setMode("advanced"); // Immediately jump to detailed calculator
  };

  const options = [
    {
      id: "umzug" as ServiceType,
      title: dic?.calculator?.service_umzug_title || "Umzug & Transport",
      desc: dic?.calculator?.service_umzug_desc || "Professioneller Umzugsservice inklusive Montage und Versicherung.",
      icon: Truck,
      color: "blue",
      features: ["Inventar & Volumen", "Halteverbotszonen", "Möbelmontage"],
    },
    {
      id: "reinigung" as ServiceType,
      title: dic?.calculator?.service_reinigung_title || "Endreinigung & Maler",
      desc: dic?.calculator?.service_reinigung_desc || "Besenrein oder mit Abgabegarantie inkl. Malerarbeiten.",
      icon: Sparkles,
      color: "emerald",
      features: ["Abgabegarantie", "Alle Flächen", "Fenster & Extras"],
    },
    {
      id: "entsorgung" as ServiceType,
      title: dic?.calculator?.service_entsorgung_title || "Entrümpelung",
      desc: dic?.calculator?.service_entsorgung_desc || "Schnelle Räumung und fachgerechte Entsorgung von Sperrmüll.",
      icon: Trash2,
      color: "orange",
      features: ["Haus & Wohnung", "Kellerräumung", "Wertanrechnung"],
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-16">
      <div className="mb-12 text-center">
        <m.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400"
        >
          {dic?.common?.unbinding_note || "100% Kostenlos"}
        </m.span>
        <m.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          {dic?.calculator?.selection_title || "Wofür möchten Sie die Kosten berechnen?"}
        </m.h2>
        <m.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/50"
        >
          {dic?.calculator?.selection_subtitle || "Wählen Sie Ihren gewünschten Service für eine sofortige Online-Kalkulation."}
        </m.p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {options.map((opt, idx) => {
          const Icon = opt.icon;
          return (
            <m.div
              key={opt.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, type: "spring", stiffness: 100 }}
              className="relative"
            >              
              <button
                onClick={() => handleSelectService(opt.id)}
                className="group relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0F1116] p-8 text-start transition-all hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl hover:shadow-white/5 cursor-pointer"
              >
                {/* Background Decoration */}
                <div className={cn(
                  "absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[90px] transition-all duration-700 group-hover:opacity-60 group-hover:blur-[70px]",
                  opt.color === "blue" && "bg-blue-600/10 opacity-20",
                  opt.color === "emerald" && "bg-emerald-600/10 opacity-20",
                  opt.color === "orange" && "bg-orange-600/10 opacity-20"
                )} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-8 flex items-start justify-between">
                    <div className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/[0.08]",
                      opt.color === "blue" && "text-blue-400",
                      opt.color === "emerald" && "text-emerald-400",
                      opt.color === "orange" && "text-orange-400"
                    )}>
                      <Icon size={32} />
                    </div>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold text-white transition-colors group-hover:text-white">
                    {opt.title}
                  </h3>
                  <p className="mb-8 text-sm leading-relaxed text-white/50 group-hover:text-white/70 transition-colors">
                    {opt.desc}
                  </p>

                  <ul className="mb-10 space-y-3">
                    {opt.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-3 text-sm text-white/60">
                        <div className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full bg-white/10",
                          opt.color === "blue" && "text-blue-400",
                          opt.color === "emerald" && "text-emerald-400",
                          opt.color === "orange" && "text-orange-400"
                        )}>
                          <Check size={12} strokeWidth={3} />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-4">
                    <div className={cn(
                      "flex items-center gap-2 text-sm font-bold tracking-tight transition-all",
                      opt.color === "blue" && "text-blue-400",
                      opt.color === "emerald" && "text-emerald-400",
                      opt.color === "orange" && "text-orange-400",
                      "group-hover:translate-x-1"
                    )}>
                      {dic?.calculator?.start_btn || "Rechner starten"}
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </button>
            </m.div>
          );
        })}
      </div>
    </div>
  );
}
