"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Truck, Sparkles, Trash2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import FloxButton from "./ui/FloxButton";

// Import calculators
import FloxUmzugRechner from "./standalone/FloxUmzugRechner";
import FloxReinigungRechner from "./standalone/FloxReinigungRechner";
import FloxEntsorgungRechner from "./standalone/FloxEntsorgungRechner";

type ServiceType = "umzug" | "reinigung" | "entsorgung" | null;

const ServiceRechnerHub: React.FC = () => {
  const [activeService, setActiveService] = useState<ServiceType>(null);

  const services = [
    {
      id: "umzug" as const,
      title: "Umzug",
      description: "Professionelle Umzugsplanung mit Preisgarantie.",
      icon: <Truck className="w-8 h-8" />,
      color: "from-blue-600 to-indigo-600",
      gradient: "hover:shadow-blue-500/20",
    },
    {
      id: "reinigung" as const,
      title: "Reinigung",
      description: "Bau-, Unterhalts- oder Endreinigung.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-600",
      gradient: "hover:shadow-emerald-500/20",
    },
    {
      id: "entsorgung" as const,
      title: "Entsorgung",
      description: "Fachgerechte Entsorgung & Entrümpelung.",
      icon: <Trash2 className="w-8 h-8" />,
      color: "from-orange-500 to-red-600",
      gradient: "hover:shadow-orange-500/20",
    },
  ];

  const renderCalculator = () => {
    switch (activeService) {
      case "umzug":
        return <FloxUmzugRechner />;
      case "reinigung":
        return <FloxReinigungRechner />;
      case "entsorgung":
        return <FloxEntsorgungRechner />;
      default:
        return null;
    }
  };

  return (    <div className="w-full max-w-7xl mx-auto px-6 py-20">
      <AnimatePresence mode="wait">
        {!activeService ? (
          <m.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <m.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                Was dürfen wir für Sie <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">berechnen?</span>
              </h2>
              <p className="text-white/40 text-xl mb-16 max-w-2xl mx-auto font-medium">
                Wählen Sie Ihren gewünschten Service für ein präzises, unverbindliches Angebot in Echtzeit.
              </p>
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {services.map((service, index) => (
                <m.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.2 + index * 0.15, 
                    duration: 0.8, 
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  whileHover={{ 
                    y: -15,
                    scale: 1.02,
                  }}
                  onClick={() => setActiveService(service.id)}
                  className={cn(
                    "group relative overflow-hidden bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 cursor-pointer transition-all duration-700",
                    service.gradient,
                    "hover:border-white/25 hover:bg-white/[0.04] shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                  )}
                >
                  {/* High-End Dynamic Background Glow */}
                  <div className={`absolute -right-16 -top-16 w-56 h-56 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-30 blur-[80px] transition-opacity duration-1000`} />
                  <div className={`absolute -left-16 -bottom-16 w-56 h-56 bg-gradient-to-tr ${service.color} opacity-0 group-hover:opacity-20 blur-[80px] transition-opacity duration-1000`} />
                  
                  {/* Icon Container with Floating Animation */}
                  <m.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className={`relative z-10 w-24 h-24 rounded-[2rem] bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-10 shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}
                  >
                    {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-12 h-12" })}
                  </m.div>
                  
                  <h3 className="relative z-10 text-3xl font-black text-white mb-5 tracking-tight group-hover:translate-x-2 transition-transform duration-500">{service.title}</h3>
                  <p className="relative z-10 text-white/50 text-lg mb-12 leading-relaxed font-semibold group-hover:text-white/70 transition-colors">
                    {service.description}
                  </p>
                  
                  <div className="relative z-10 mt-auto">
                    <FloxButton 
                      variant="primary" 
                      fullWidth 
                      className="rounded-2xl py-6 text-sm font-black uppercase tracking-[0.2em] shadow-none group-hover:shadow-[0_15px_40px_-10px_rgba(37,99,235,0.7)]"
                      onClick={(e) => { e?.stopPropagation(); setActiveService(service.id); }}
                    >
                      Konfigurieren
                    </FloxButton>
                  </div>

                  {/* Glass Highlight Overlay */}
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/15 rounded-[3rem] transition-all duration-700" />
                </m.div>
              ))}
            </div>
          </m.div>
        ) : (
          <m.div
            key="calculator"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <button
              onClick={() => setActiveService(null)}
              className="flex items-center text-white/40 hover:text-white mb-12 transition-all group font-bold tracking-wider"
            >
              <ArrowLeft className="w-5 h-5 mr-3 transform group-hover:-translate-x-2 transition-transform" />
              ZURÜCK ZUR AUSWAHL
            </button>
            
            <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[3rem] p-1 md:p-4 overflow-hidden shadow-2xl">
              {renderCalculator()}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceRechnerHub;
