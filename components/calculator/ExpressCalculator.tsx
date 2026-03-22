"use client";

import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from "framer-motion";
import { Truck, Sparkles, Trash2, ArrowRight, MapPin, Home, Layers } from 'lucide-react';
import { useCalculatorStore, ServiceType } from '@/store/calculatorStore';
import { 
  calculateUmzugExpress,
  calculateReinigungExpress, 
  calculateEntsorgungExpress
} from '@/lib/pricing/calculator-engine';
import TrustBlock from '../trust/TrustBlock';

export default function ExpressCalculator() {
  const store = useCalculatorStore();
  const [activeStep, setActiveStep] = useState(0);

  // Recalculate price whenever relevant data changes
  useEffect(() => {
    let range = null;
    if (store.serviceType === 'umzug') {
      range = calculateUmzugExpress(store.umzugData, store.baseDetails);
    } else if (store.serviceType === 'reinigung') {
      range = calculateReinigungExpress(store.reinigungData);
    } else if (store.serviceType === 'entsorgung') {
      range = calculateEntsorgungExpress(store.entsorgungData);
    }
    
    if (range) {
      store.setExpressPriceRange(range.min, range.max);
    }
  }, [store.serviceType, store.umzugData, store.reinigungData, store.entsorgungData, store.baseDetails]);

  const handleServiceSelect = (type: ServiceType) => {
    store.setServiceType(type);
    setActiveStep(1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8 rounded-3xl relative overflow-hidden bg-[#0B0B12] border border-white/5 shadow-2xl">
      {/* Background Neon Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Progress Bar */}
      <div className="w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden relative z-10">
        <m.div 
          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((activeStep + 1) / 3) * 100}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-[400px]">
        <AnimatePresence mode="wait">
          
          {/* STEP 0: Select Service */}
          {activeStep === 0 && (
            <m.div 
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-3xl font-light text-white mb-2">
                Was können wir für Sie tun?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ServiceCard icon={Truck} title="Umzug" onClick={() => handleServiceSelect('umzug')} active={store.serviceType === 'umzug'} />
                <ServiceCard icon={Sparkles} title="Reinigung" onClick={() => handleServiceSelect('reinigung')} active={store.serviceType === 'reinigung'} />
                <ServiceCard icon={Trash2} title="Entsorgung" onClick={() => handleServiceSelect('entsorgung')} active={store.serviceType === 'entsorgung'} />
              </div>
              <button 
                onClick={() => setActiveStep(1)}
                className="mt-8 self-end px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all flex items-center gap-2"
              >
                Weiter <ArrowRight size={18} />
              </button>
            </m.div>
          )}

          {/* STEP 1: Basic Details (Address / Size) */}
          {activeStep === 1 && (
            <m.div 
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6 w-full"
            >
              <h2 className="text-3xl font-light text-white mb-2">
                Eckdaten eingeben
              </h2>
              
              <div className="space-y-4">
                {/* Location Input (Mocked for now) */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                  <MapPin className="text-blue-400" />
                  <input 
                    type="text" 
                    placeholder="Von Ort / PLZ"
                    className="bg-transparent text-white outline-none w-full"
                    value={store.baseDetails.fromAddress}
                    onChange={(e) => store.updateBaseDetails({ fromAddress: e.target.value })}
                  />
                </div>

                {store.serviceType === 'umzug' && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                    <MapPin className="text-violet-400" />
                    <input 
                      type="text" 
                      placeholder="Nach Ort / PLZ"
                      className="bg-transparent text-white outline-none w-full"
                      value={store.baseDetails.toAddress || ''}
                      onChange={(e) => store.updateBaseDetails({ toAddress: e.target.value })}
                    />
                  </div>
                )}

                {/* Specifics based on service */}
                {(store.serviceType === 'umzug' || store.serviceType === 'reinigung') && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <label className="text-xs text-white/50 mb-1 block">Wohnfläche (m²)</label>
                      <input 
                        type="number" 
                        value={store.serviceType === 'umzug' ? store.umzugData.areaM2 : store.reinigungData.areaM2}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          if (store.serviceType === 'umzug') store.updateUmzugData({ areaM2: val });
                          else store.updateReinigungData({ areaM2: val });
                        }}
                        className="bg-transparent text-white text-xl outline-none w-full"
                      />
                    </div>
                    {store.serviceType === 'umzug' && (
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                         <label className="text-xs text-white/50 mb-1 block">Zimmeranzahl</label>
                        <input 
                          type="number" 
                          value={store.umzugData.rooms}
                          onChange={(e) => store.updateUmzugData({ rooms: parseInt(e.target.value) || 0 })}
                          className="bg-transparent text-white text-xl outline-none w-full"
                        />
                      </div>
                    )}
                  </div>
                )}

                {store.serviceType === 'entsorgung' && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col">
                    <label className="text-xs text-white/50 mb-2 block flex items-center gap-2"><Layers size={14} /> Schätzvolumen (m³)</label>
                    <input 
                      type="range" 
                      min="1" max="50" 
                      value={store.entsorgungData.wasteVolumeM3}
                      onChange={(e) => store.updateEntsorgungData({ wasteVolumeM3: parseInt(e.target.value) })}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <span className="text-white mt-2 text-xl font-light">{store.entsorgungData.wasteVolumeM3} m³</span>
                  </div>
                )}

              </div>

              <div className="flex justify-between mt-auto pt-8">
                <button 
                  onClick={() => setActiveStep(0)}
                  className="px-6 py-3 text-white/50 hover:text-white transition-all"
                >
                  Zurück
                </button>
                <button 
                  onClick={() => setActiveStep(2)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-full transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 font-medium"
                >
                  Preis berechnen
                </button>
              </div>
            </m.div>
          )}

          {/* STEP 2: Instant Results / Hook */}
          {activeStep === 2 && (
            <m.div 
              key="step-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <Sparkles className="text-blue-400" size={32} />
              </div>
              <h2 className="text-white/60 text-lg mb-2">Ihre Kostenschätzung</h2>
              <div className="text-5xl font-light text-white mb-6 flex items-center justify-center gap-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 font-medium">
                  {store.expressPriceRange?.min}€
                </span>
                <span className="text-white/30 text-3xl">-</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 font-medium">
                  {store.expressPriceRange?.max}€
                </span>
              </div>
              <p className="text-white/50 text-sm max-w-sm mb-10">
                Dies ist eine grobe Schätzung basiert auf Ihren Angaben. Für ein verbindliches, milllimetergenaues Angebot wechseln Sie zum Detailrechner.
              </p>
              
              <button 
                onClick={() => store.setMode('advanced')}
                className="group relative px-8 py-4 bg-white text-black rounded-full font-medium text-lg overflow-hidden w-full max-w-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-violet-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  Genau berechnen <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button 
                onClick={() => setActiveStep(1)}
                className="mt-6 text-white/40 hover:text-white/80 text-sm underline-offset-4 hover:underline"
              >
                Angaben anpassen
              </button>
            </m.div>
          )}

        </AnimatePresence>
      </div>

      <TrustBlock className="mt-8 pt-8 border-t border-white/5" locationHint={store.baseDetails.fromAddress || undefined} />
    </div>
  );
}

function ServiceCard({ icon: Icon, title, onClick, active }: { icon: any, title: string, onClick: () => void, active: boolean }) {
  return (
    <div 
      onClick={onClick}
      className={`
        cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-md
        ${active 
          ? 'bg-blue-500/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] glow' 
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
        }
      `}
    >
      <Icon className={active ? 'text-blue-400' : 'text-white/60'} size={32} />
      <span className={active ? 'text-white font-medium' : 'text-white/70'}>{title}</span>
    </div>
  );
}
