"use client";

import React, { useState } from 'react';
import { useCalculatorStore } from '@/store/calculatorStore';
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Sparkles, Home, Settings, MessageSquare } from 'lucide-react';

export default function ReinigungForm({ dic }: { dic?: any }) {
  const SECTIONS = [
    { id: 'condition', label: dic?.calculator.condition_equipment, icon: Sparkles },
    { id: 'logistics', label: dic?.calculator.process_extras, icon: Settings },
    { id: 'notes', label: dic?.calculator.notes_title, icon: MessageSquare }
  ];
  const { reinigungData, updateReinigungData } = useCalculatorStore();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => setOpenSection(prev => prev === id ? null : id);

  const toggleExtra = (extra: string) => {
    const active = reinigungData.extras.includes(extra);
    updateReinigungData({
      extras: active 
        ? reinigungData.extras.filter(i => i !== extra) 
        : [...reinigungData.extras, extra]
    });
  };

  return (
    <div className="space-y-4">
      {/* BASIC DATA */}
      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 space-y-4">
        <h3 className="text-xs font-bold text-foreground/70 uppercase tracking-[0.15em] flex items-center gap-2 mb-4">
          <Home size={14} className="text-primary" />{dic?.calculator.basis_data}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] text-muted-foreground tracking-wide uppercase">{dic?.calculator.property_type}</label>
            <select 
              value={reinigungData.propertyType} 
              onChange={e => updateReinigungData({ propertyType: e.target.value as any })}
              className="w-full bg-background border border-white/10 rounded-md p-3 text-sm outline-none focus:border-white/30 transition-colors"
            >
              <option value="wohnung">{dic?.calculator.apartment}</option>
              <option value="haus">{dic?.calculator.house}</option>
              <option value="buero">{dic?.calculator.commercial_office}</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] text-muted-foreground tracking-wide uppercase">{dic?.calculator.living_area}</label>
            <input 
              type="number" 
              value={reinigungData.areaM2 || ''}
              onChange={(e) => updateReinigungData({ areaM2: parseInt(e.target.value) || 0 })}
              placeholder="e.g. 60"
              className="w-full bg-background border border-white/10 rounded-md p-3 text-sm outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] text-muted-foreground tracking-wide uppercase">{dic?.calculator.windows_approx}</label>
            <input 
              type="number" 
              value={reinigungData.windowsCount || ''}
              onChange={(e) => updateReinigungData({ windowsCount: parseInt(e.target.value) || 0 })}
              placeholder={dic?.calculator.windows_hint}
              className="w-full bg-background border border-white/10 rounded-md p-3 text-sm outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ACCORDIONS */}
      {SECTIONS.map(section => {
        const isOpen = openSection === section.id;
        const Icon = section.icon;
        return (
          <div key={section.id} className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-background/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className={isOpen ? "text-primary" : "text-muted-foreground"} />
                <span className={`text-sm font-medium ${isOpen ? 'text-foreground' : 'text-foreground/80'}`}>{section.label}</span>
              </div>
              {isOpen ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
            </button>
            <AnimatePresence>
              {isOpen && (
                <m.div 
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-4 border-t border-border/50 pt-4"
                >
                  
                  {/* CONDITION */}
                  {section.id === 'condition' && (
                    <div className="space-y-8 pt-2">
                      <div className="space-y-2">
                        <label className="text-[11px] text-muted-foreground uppercase tracking-wider">{dic?.calculator.condition_level}</label>
                        <select 
                          value={reinigungData.condition} 
                          onChange={e => updateReinigungData({ condition: e.target.value as any })}
                          className="w-full bg-background border border-white/10 rounded-md p-3 text-sm outline-none focus:border-white/30 transition-colors"
                        >
                          <option value="leicht">{dic?.calculator.light}</option>
                          <option value="mittel">{dic?.calculator.medium}</option>
                          <option value="stark">{dic?.calculator.heavy}</option>
                        </select>
                      </div>

                      <label className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors">
                        <input type="checkbox" checked={reinigungData.uncertainCondition} onChange={e => updateReinigungData({ uncertainCondition: e.target.checked })} className="mt-1 accent-primary w-4 h-4" /> 
                        <div>
                           <span className="text-sm font-medium text-foreground block">{dic?.calculator.uncertain_condition}</span>
                           <span className="text-xs text-muted-foreground block mt-1 leading-relaxed">{dic?.calculator.uncertain_condition_desc}</span>
                        </div>
                      </label>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer">
                          <input type="checkbox" checked={reinigungData.isFurnished} onChange={e => updateReinigungData({ isFurnished: e.target.checked })} className="accent-primary" /> 
                          <span className="text-sm font-medium">{dic?.calculator.is_furnished}</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer">
                          <input type="checkbox" checked={reinigungData.extras.includes('teppich')} onChange={() => toggleExtra('teppich')} className="accent-primary" /> 
                          <span className="text-sm font-medium">{dic?.calculator.carpet_cleaning}</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer">
                          <input type="checkbox" checked={reinigungData.extras.includes('kueche_tiefenreinigung')} onChange={() => toggleExtra('kueche_tiefenreinigung')} className="accent-primary" /> 
                          <span className="text-sm font-medium">{dic?.calculator.kitchen_deep_clean}</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer">
                          <input type="checkbox" checked={reinigungData.extras.includes('bad_kalk')} onChange={() => toggleExtra('bad_kalk')} className="accent-primary" /> 
                          <span className="text-sm font-medium">{dic?.calculator.lime_removal}</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* LOGISTICS */}
                  {section.id === 'logistics' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground uppercase tracking-wider">{dic?.calculator.frequency}</label>
                        <select 
                          value={reinigungData.frequency} 
                          onChange={e => updateReinigungData({ frequency: e.target.value as any })}
                          className="w-full bg-background border border-border rounded-lg p-3 text-sm outline-none"
                        >
                          <option value="einmalig">{dic?.calculator.one_time}</option>
                          <option value="regelmaessig">{dic?.calculator.regular}</option>
                        </select>
                      </div>
                      
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer self-end h-[46px]">
                        <input type="checkbox" checked={reinigungData.keysHandover} onChange={e => updateReinigungData({ keysHandover: e.target.checked })} className="accent-primary" /> 
                        <span className="text-sm">{dic?.calculator.keys_handover}</span>
                      </label>
                      
                      <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer md:col-span-2">
                        <input type="checkbox" checked={reinigungData.cleaningGuarantee} onChange={e => updateReinigungData({ cleaningGuarantee: e.target.checked })} className="mt-1 accent-primary" /> 
                        <div>
                          <span className="text-sm font-medium block">{dic?.calculator.handover_guarantee}</span>
                          <span className="text-xs text-muted-foreground">{dic?.calculator.handover_guarantee_desc}</span>
                        </div>
                      </label>
                    </div>
                  )}

                  {/* NOTES */}
                  {section.id === 'notes' && (
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground uppercase tracking-wider">{dic?.calculator.additional_notes}</label>
                      <textarea 
                        value={reinigungData.freeTextNote || ''}
                        onChange={e => updateReinigungData({ freeTextNote: e.target.value })}
                        placeholder={dic?.calculator.cleaning_notes_placeholder}
                        className="w-full h-24 bg-background border border-border rounded-lg p-3 text-sm outline-none focus:border-primary resize-none"
                      />
                    </div>
                  )}

                </m.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  );
}
