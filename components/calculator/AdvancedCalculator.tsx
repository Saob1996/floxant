"use client";

import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FileText, Clock, Users, Database, Info, HardHat, PhoneCall } from 'lucide-react';
import { useCalculatorStore } from '@/store/calculatorStore';
import { 
  calculateUmzugAdvanced, 
  calculateReinigungAdvanced, 
  calculateEntsorgungAdvanced 
} from '@/lib/pricing/calculator-engine';
import UmzugForm from './forms/UmzugForm';
import ReinigungForm from './forms/ReinigungForm';
import EntsorgungForm from './forms/EntsorgungForm';

export default function AdvancedCalculator() {
  const store = useCalculatorStore();
  const [isGenerating, setIsGenerating] = useState(true);

  // Mount anticipation delay
  useEffect(() => {
    const t = setTimeout(() => setIsGenerating(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Determine if the user has provided enough initial input to justify showing a price
  const hasInput = React.useMemo(() => {
    if ((store.baseDetails.fromAddress || '').length >= 2 || (store.baseDetails.toAddress || '').length >= 2) return true;

    if (store.serviceType === 'umzug') {
      return store.umzugData.fromAddressDetailed?.length >= 2 || store.umzugData.areaM2 > 1 || store.umzugData.furnitureList?.length > 0 || store.umzugData.boxesCount > 0;
    }
    if (store.serviceType === 'reinigung') {
      return store.reinigungData.areaM2 >= 10 || store.reinigungData.windowsCount > 0 || store.reinigungData.extras?.length > 0;
    }
    if (store.serviceType === 'entsorgung') {
      return store.entsorgungData.wasteCategories?.length > 1 || store.entsorgungData.wasteVolumeM3 > 1 || store.entsorgungData.freeTextNote?.length > 2;
    }
    return false;
  }, [store.serviceType, store.umzugData, store.reinigungData, store.entsorgungData, store.baseDetails]);

  // Recalculate deep estimate on any store change
  useEffect(() => {
    const updateEstimate = () => {
      let estimate = null;

      if (store.serviceType === 'umzug') {
        estimate = calculateUmzugAdvanced(store.umzugData, store.baseDetails);
      } else if (store.serviceType === 'reinigung') {
        estimate = calculateReinigungAdvanced(store.reinigungData);
      } else if (store.serviceType === 'entsorgung') {
        estimate = calculateEntsorgungAdvanced(store.entsorgungData);
      }
      
      if (estimate) {
        store.setAdvancedEstimate(estimate);
      }
    };

    updateEstimate();
  }, [store.serviceType, store.umzugData, store.reinigungData, store.entsorgungData, store.baseDetails]);

  const est = store.advancedEstimate;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col xl:flex-row gap-8 items-start relative group/calculator">
      
      {/* LEFT: Dynamic Wizard Form */}
      <div className="flex-[1.2] w-full transition-all duration-700 ease-in-out">
        <div className="bg-secondary/40 rounded-3xl p-6 lg:p-10 border border-white/5 shadow-lg relative overflow-hidden backdrop-blur-sm">
          <div className="relative z-10">
            <div className="mb-10 border-b border-border/50 pb-5">
               <h2 className="text-2xl font-heading font-semibold text-foreground flex items-center gap-3">
                 <FileText size={24} className="text-primary" />
                 Ihre Anforderungen
               </h2>
               <p className="text-[15px] text-muted-foreground mt-3 font-normal leading-relaxed">
                 Um Ihnen ein seriöses Angebot zu machen, füllen Sie bitte die relevanten Punkte grob aus. 
                 Je mehr wir wissen, desto genauer definieren sich Preis und Teamstärke.
               </p>
            </div>
            
            {store.serviceType === 'umzug' && <UmzugForm />}
            {store.serviceType === 'reinigung' && <ReinigungForm />}
            {store.serviceType === 'entsorgung' && <EntsorgungForm />}
          </div>
        </div>
      </div>

      {/* RIGHT: Serious Estimate Document */}
      <div className="w-full xl:w-[480px] shrink-0 sticky top-24 snap-y snap-mandatory transition-transform duration-500 z-50">
        
        <div className="bg-[#0a0a0a] rounded-3xl p-6 lg:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle gradient glow inside the card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/5 relative z-10">
            <h3 className="text-foreground tracking-tight font-heading font-semibold text-lg flex items-center gap-2">
              <Database className="text-primary" size={20} /> 
              Ihre Kalkulation
            </h3>
            {est && hasInput && (
              <span className={`text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 px-2.5 py-1 rounded-full ${est.confidenceLevel === 'low' ? 'text-primary bg-primary/10' : 'text-blue-400 bg-blue-400/10'}`}>
                <Info size={12} />
                {est.confidenceLevel === 'low' ? 'Erste Prognose' : 'Echte Schätzung'}
              </span>
            )}
          </div>

          {!hasInput ? (
            <div className="w-full relative z-10">
               <div className="min-h-[256px] bg-white/[0.02] border border-white/5 rounded-2xl w-full flex items-center justify-center flex-col gap-4 p-8 text-center transition-all duration-500">
                 <m.div 
                    initial={{ rotate: -10 }} 
                    animate={{ rotate: 10 }} 
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
                 >
                   <span className="text-4xl">👋</span>
                 </m.div>
                 <h4 className="text-white text-lg font-heading font-semibold">Lassen Sie uns starten!</h4>
                 <p className="text-neutral-400 text-[14px] font-normal leading-relaxed max-w-[280px]">
                   Geben Sie einfach ein paar erste Eckdaten (z.B. die Wohnfläche) links ein. 
                   Unser intelligenter Rechner ermittelt sofort einen fairen Preis für Sie.
                 </p>
               </div>
            </div>
          ) : !est || isGenerating ? (
            <div className="w-full relative z-10">
              <div className="animate-pulse h-64 bg-white/[0.02] border border-white/5 rounded-2xl w-full flex items-center justify-center flex-col gap-4">
                <div className="w-8 h-8 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
                <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Kalkuliere Aufwand...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6 relative z-10">
              
              {/* Main Price Frame */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 shadow-inner">
                 <span className="text-primary/70 text-[11px] font-bold uppercase tracking-[0.2em] block mb-3">Live Preisindikativ</span>
                 <div className="flex items-baseline gap-2 font-heading">
                   <span className="text-5xl font-bold text-white">{est.priceRange.min}€</span>
                   <span className="text-neutral-500 font-light text-2xl px-1">–</span>
                   <span className="text-5xl font-bold text-white">{est.priceRange.max}€</span>
                 </div>
                 {est.confidenceLevel === 'low' ? (
                    <span className="text-primary/80 text-[12px] block mt-4 leading-relaxed border-t border-primary/10 pt-4 font-medium">
                      Dies ist eine maschinelle Schätzung zur groben Orientierung. Bitte geben Sie mehr Details ein, um einen genaueren Wert zu erhalten.
                    </span>
                 ) : (
                    <span className="text-neutral-400 text-[12px] block mt-4 leading-relaxed border-t border-white/5 pt-4">
                      *Hinweis: Hierbei handelt es sich um einen unverbindlichen Richtwert. Da jedes Objekt individuell ist, können die realen Kosten variieren. Ein verbindliches Festpreisangebot erstellen wir Ihnen gerne nach unserer kostenlosen Erstbesichtigung!
                    </span>
                 )}
              </div>

              {/* Parametrics */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 transition-colors hover:bg-white/[0.04]">
                    <div className="flex items-center gap-2 text-neutral-400 mb-2">
                      <Clock size={14} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Dauer</span>
                    </div>
                    <span className="text-[15px] font-medium text-white">{est.estimatedHours}</span>
                 </div>
                 <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 transition-colors hover:bg-white/[0.04]">
                    <div className="flex items-center gap-2 text-neutral-400 mb-2">
                      <Users size={14} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Personal</span>
                    </div>
                    <span className="text-[15px] font-medium text-white">{est.recommendedTeam}</span>
                 </div>
              </div>

              {/* Basis */}
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                 <h4 className="text-[11px] uppercase tracking-[0.1em] font-bold text-neutral-500 mb-3">Zusammenfassung</h4>
                 <p className="text-[14px] text-white/90 leading-relaxed font-medium">{est.calculationBasis}</p>
                 
                 {est.operationalFlags.length > 0 && (
                   <div className="mt-5 pt-5 border-t border-white/5">
                     <h4 className="text-[11px] uppercase tracking-[0.1em] font-bold text-neutral-500 mb-3 flex items-center gap-1.5">
                        <HardHat size={14} className="text-primary/70" />
                        In der Kalkulation enthalten
                     </h4>
                     <ul className="space-y-2">
                       {est.operationalFlags.map((flag, i) => (
                         <li key={i} className="text-[12px] text-neutral-300 flex items-start leading-relaxed">
                           <span className="mr-2.5 text-primary mt-[2px]">✓</span> {flag}
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}
              </div>

            </div>
          )}

          <div className="mt-8 space-y-4 relative z-10">
            <button 
              onClick={() => store.setMode('lead')}
              className="w-full py-4 rounded-xl text-[15px] font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/25 bg-primary hover:bg-primary/90 text-primary-foreground transform hover:-translate-y-0.5"
            >
              <PhoneCall size={18} />
              Jetzt kostenlos fixieren
            </button>
            <div className="pt-2 px-2 text-center">
              <p className="text-neutral-500 font-normal text-[11px] leading-relaxed">
                Diese Schnell-Schätzung ist zu 100% unverbindlich. Im nächsten Schritt können Sie einen Rückruf oder Ihre kostenlose Erstbesichtigung vereinbaren.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
