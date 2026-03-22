"use client";

import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, Percent, ArrowRight } from 'lucide-react';
import { useCalculatorStore } from '@/store/calculatorStore';

export default function ExitIntentModal() {
  const store = useCalculatorStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only attempt to show if they haven't seen it in this session
    // and if they are in the 'advanced' mode (actually comparing prices)
    if (typeof window === 'undefined') return;

    const hasSeenExitIntent = sessionStorage.getItem('floxant_exit_seen');
    if (hasSeenExitIntent) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect moving mouse aggressively up towards the tab bar
      if (e.clientY < 15 && store.mode === 'advanced') {
        setIsVisible(true);
        sessionStorage.setItem('floxant_exit_seen', 'true');
        // also active the hesitation discount forcefully so they see the real cheaper price
        store.setHesitationDiscountActive(true); 
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [store]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        
        {/* Backdrop */}
        <m.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={() => setIsVisible(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <m.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-[#1A1A24] to-[#0A0A0F] rounded-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden p-8 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="mx-auto w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
            <AlertTriangle size={32} />
          </div>

          <h2 className="text-3xl font-light text-white mb-2">Bevor Sie gehen...</h2>
          <p className="text-white/70 mb-8 max-w-sm mx-auto">
            Gute Angebote sind schnell vergriffen. Wir gewähren Ihnen einen <strong>sofortigen 5% Rabatt</strong> auf unsere Balanced & Premium-Pakete, wenn Sie heute buchen.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 flex items-center justify-center gap-6">
             <div className="flex items-center gap-2 text-emerald-400">
               <Percent size={20} /> <span className="font-medium">+ 5% Preisnachlass</span>
             </div>
             <div className="flex items-center gap-2 text-violet-400">
               <Clock size={20} /> <span className="font-medium">Prioritätsslot Reservierung</span>
             </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => {
                store.setMode('lead');
                setIsVisible(false);
              }}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Rabatt sichern & Buchen <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="w-full py-4 text-white/40 hover:text-white/80 transition-colors text-sm"
            >
              Nein danke, regulären Preis behalten
            </button>
          </div>

        </m.div>
      </div>
    </AnimatePresence>
  );
}
