"use client";

import React, { useState } from 'react';
import { useCalculatorStore } from '@/store/calculatorStore';
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Trash2, Route, AlertTriangle, MessageSquare } from 'lucide-react';

const SECTIONS = [
  { id: 'access', label: 'Zugang & Demontage', icon: Route },
  { id: 'details', label: 'Sicherheit & Dringlichkeit', icon: AlertTriangle },
  { id: 'notes', label: 'Weitere Hinweise', icon: MessageSquare }
];

export default function EntsorgungForm() {
  const { entsorgungData, updateEntsorgungData } = useCalculatorStore();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => setOpenSection(prev => prev === id ? null : id);

  const toggleCategory = (cat: string) => {
    const active = entsorgungData.wasteCategories.includes(cat);
    updateEntsorgungData({
      wasteCategories: active 
        ? entsorgungData.wasteCategories.filter(i => i !== cat) 
        : [...entsorgungData.wasteCategories, cat]
    });
  };

  return (
    <div className="space-y-4">
      {/* BASIC DATA */}
      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 space-y-4">
        <h3 className="text-xs font-bold text-foreground/70 uppercase tracking-[0.15em] flex items-center gap-2 mb-4">
          <Trash2 size={14} className="text-primary" /> Volumen & Art
        </h3>
        
        <div className="space-y-2">
          <label className="text-[11px] text-muted-foreground tracking-wide uppercase">Geschätztes Volumen (m³)</label>
          <input 
            type="number" 
            value={entsorgungData.wasteVolumeM3 || ''}
            onChange={(e) => updateEntsorgungData({ wasteVolumeM3: parseInt(e.target.value) || 0 })}
            className="w-full bg-background border border-white/10 rounded-md p-3 text-sm outline-none focus:border-white/30 transition-colors"
          />
        </div>

        <label className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors">
          <input type="checkbox" checked={entsorgungData.uncertainVolume} onChange={e => updateEntsorgungData({ uncertainVolume: e.target.checked })} className="mt-1 accent-primary w-4 h-4" /> 
          <div>
              <span className="text-sm font-medium text-foreground block">Ich bin mir beim Entsorgungsvolumen sehr unsicher</span>
              <span className="text-[11px] text-muted-foreground block mt-1 leading-relaxed">Der Preisrahmen wird zur Sicherheit erweitert. Endpreis nach realem Volumen.</span>
          </div>
        </label>

        <div className="space-y-2 pt-2">
          <label className="text-[11px] text-muted-foreground tracking-wide uppercase">Abfallarten (Mehrfachnennung möglich)</label>
          <div className="flex flex-wrap gap-2">
            {['Sperrmüll', 'Elektroschrott', 'Bauschutt', 'Grünschnitt', 'Hausmüll', 'Altmetall', 'Mischabfall'].map(cat => {
              const val = cat.toLowerCase();
              const isActive = entsorgungData.wasteCategories.includes(val);
              return (
                <button 
                  key={cat} onClick={() => toggleCategory(val)}
                  className={`px-3 py-1.5 text-[11px] uppercase tracking-wider rounded-full border transition-colors ${isActive ? 'bg-primary/20 border-primary text-primary-foreground' : 'bg-background border-white/10 text-muted-foreground hover:border-white/30'}`}
                >
                  {cat}
                </button>
              )
            })}
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
                  
                  {/* ACCESS */}
                  {section.id === 'access' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div className="space-y-2">
                        <label className="text-[11px] text-muted-foreground uppercase tracking-wider">Zugangsschwierigkeit</label>
                        <select 
                          value={entsorgungData.accessDifficulty} 
                          onChange={e => updateEntsorgungData({ accessDifficulty: e.target.value as any })}
                          className="w-full bg-background border border-white/10 rounded-md p-3 text-sm outline-none focus:border-white/30 transition-colors"
                        >
                          <option value="einfach">Einfach (EG / Aufzug)</option>
                          <option value="mittel">Mittel (1.-2. OG ohne Aufzug)</option>
                          <option value="schwer">Schwer (Dachboden / Keller schwer zugänglich)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] text-muted-foreground uppercase tracking-wider">Laufweg zum LKW (ca. Meter)</label>
                        <input 
                          type="number" 
                          value={entsorgungData.loadingDistanceMeters || ''}
                          onChange={(e) => updateEntsorgungData({ loadingDistanceMeters: parseInt(e.target.value) || 0 })}
                          className="w-full bg-background border border-white/10 rounded-md p-3 text-sm outline-none focus:border-white/30 transition-colors"
                        />
                      </div>
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer md:col-span-2">
                        <input type="checkbox" checked={entsorgungData.disassemblyRequired} onChange={e => updateEntsorgungData({ disassemblyRequired: e.target.checked })} className="mt-0.5 accent-primary" /> 
                        <div>
                          <span className="text-sm font-medium block">Demontage erforderlich</span>
                          <span className="text-xs text-muted-foreground">Wir müssen vor Ort größere Möbelstücke (z.B. Schränke) abbauen.</span>
                        </div>
                      </label>
                    </div>
                  )}

                  {/* DETAILS */}
                  {section.id === 'details' && (
                    <div className="grid grid-cols-1 gap-4">
                      <label className="flex items-start gap-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 cursor-pointer">
                        <input type="checkbox" checked={entsorgungData.hazardMaterials} onChange={e => updateEntsorgungData({ hazardMaterials: e.target.checked })} className="mt-1 accent-amber-500" /> 
                        <div>
                          <span className="text-sm font-medium text-amber-500/90 block">Gefahrstoffe / Sondermüll vorhanden</span>
                          <span className="text-xs text-muted-foreground">Inkludiert Farben, Lacke, Asbest, Chemikalien. Erfordert gesonderte Entsorgungswege.</span>
                        </div>
                      </label>
                      
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground uppercase tracking-wider">Dringlichkeit</label>
                        <select 
                          value={entsorgungData.urgency} 
                          onChange={e => updateEntsorgungData({ urgency: e.target.value as any })}
                          className="w-full bg-background border border-border rounded-lg p-3 text-sm outline-none"
                        >
                          <option value="flexibel">Standard / Flexibel</option>
                          <option value="dringend">Dringend (Express-Abholung gewünscht)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* NOTES */}
                  {section.id === 'notes' && (
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground uppercase tracking-wider">Ergänzende Beschreibungen (Optional)</label>
                      <textarea 
                        value={entsorgungData.freeTextNote || ''}
                        onChange={e => updateEntsorgungData({ freeTextNote: e.target.value })}
                        placeholder="Z.B. Art der zu entsorgenden Möbel, Zugangsschwierigkeiten genauer erklären..."
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
