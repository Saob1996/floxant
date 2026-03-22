"use client";

import React, { useState } from 'react';
import { useCalculatorStore } from '@/store/calculatorStore';
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MapPin, Box, Briefcase, Calendar, MessageSquare, Truck } from 'lucide-react';

const SECTIONS = [
  { id: 'access', label: 'Zugang & Parksituation', icon: MapPin },
  { id: 'volume', label: 'Inventar & Volumen (Optional)', icon: Box },
  { id: 'services', label: 'Leistungsumfang', icon: Briefcase },
  { id: 'time', label: 'Termin & Logistik', icon: Calendar },
  { id: 'notes', label: 'Weitere Hinweise', icon: MessageSquare }
];

export default function UmzugForm() {
  const { umzugData, updateUmzugData } = useCalculatorStore();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(prev => prev === id ? null : id);
  };

  const toggleHeavyItem = (item: string) => {
    const active = umzugData.heavyItems.includes(item);
    updateUmzugData({
      heavyItems: active 
        ? umzugData.heavyItems.filter(i => i !== item) 
        : [...umzugData.heavyItems, item]
    });
  };

  return (
    <div className="space-y-4">
      {/* BASIC DATA (Always visible) */}
      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 space-y-4">
        <h3 className="text-xs font-bold text-foreground/70 uppercase tracking-[0.15em] flex items-center gap-2 mb-4">
          <Truck size={14} className="text-primary" /> Basisdaten
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] text-muted-foreground tracking-wide uppercase">Wohnfläche (m²)</label>
            <input 
              type="number" 
              value={umzugData.areaM2 || ''}
              onChange={(e) => updateUmzugData({ areaM2: parseInt(e.target.value) || 0 })}
              placeholder="z.B. 65"
              className="w-full bg-background border border-white/10 rounded-md p-3 text-sm text-foreground outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] text-muted-foreground tracking-wide uppercase">Zimmeranzahl</label>
            <input 
              type="number" 
              value={umzugData.rooms || ''}
              onChange={(e) => updateUmzugData({ rooms: parseInt(e.target.value) || 0 })}
              placeholder="z.B. 3"
              className="w-full bg-background border border-white/10 rounded-md p-3 text-sm text-foreground outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ACCORDION SECTIONS */}
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
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-4 border-t border-border/50 pt-4"
                >
                  
                  {/* ACCESS SECTION */}
                  {section.id === 'access' && (
                    <div className="space-y-8 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* FROM */}
                        <div className="space-y-5">
                          <h4 className="text-[11px] font-bold text-foreground/50 uppercase tracking-[0.15em] border-b border-white/5 pb-2">Auszugsort</h4>
                          <div className="space-y-2">
                            <label className="text-[11px] text-muted-foreground tracking-wide">Vollständige Adresse (Optional)</label>
                            <input type="text" placeholder="Straße, PLZ, Ort" value={umzugData.fromAddressDetailed || ''} onChange={e => updateUmzugData({ fromAddressDetailed: e.target.value })} className="w-full bg-background border border-white/10 rounded-md p-2.5 text-sm outline-none focus:border-white/30 transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] text-muted-foreground tracking-wide">Etage</label>
                            <input type="number" placeholder="0 = Erdgeschoss" value={umzugData.fromFloor ?? ''} onChange={e => updateUmzugData({ fromFloor: parseInt(e.target.value) })} className="w-full bg-background border border-white/10 rounded-md p-2.5 text-sm outline-none focus:border-white/30 transition-colors" />
                          </div>
                          <div className="space-y-3 pt-2">
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.hasElevatorFrom} onChange={e => updateUmzugData({ hasElevatorFrom: e.target.checked })} className="accent-primary w-4 h-4" /> Aufzug vorhanden
                            </label>
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.narrowStairsFrom} onChange={e => updateUmzugData({ narrowStairsFrom: e.target.checked })} className="accent-primary w-4 h-4" /> Sehr enges Treppenhaus
                            </label>
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.courtyardAccessFrom} onChange={e => updateUmzugData({ courtyardAccessFrom: e.target.checked })} className="accent-primary w-4 h-4" /> Zugang über Innenhof
                            </label>
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.noParkingZoneFrom} onChange={e => updateUmzugData({ noParkingZoneFrom: e.target.checked })} className="accent-primary w-4 h-4" /> Halteverbotszone benötigt
                            </label>
                          </div>
                        </div>

                        {/* TO */}
                        <div className="space-y-5">
                          <h4 className="text-[11px] font-bold text-foreground/50 uppercase tracking-[0.15em] border-b border-white/5 pb-2">Einzugsort</h4>
                          <div className="space-y-2">
                            <label className="text-[11px] text-muted-foreground tracking-wide">Vollständige Adresse (Optional)</label>
                            <input type="text" placeholder="Straße, PLZ, Ort" value={umzugData.toAddressDetailed || ''} onChange={e => updateUmzugData({ toAddressDetailed: e.target.value })} className="w-full bg-background border border-white/10 rounded-md p-2.5 text-sm outline-none focus:border-white/30 transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] text-muted-foreground tracking-wide">Etage</label>
                            <input type="number" placeholder="0 = Erdgeschoss" value={umzugData.toFloor ?? ''} onChange={e => updateUmzugData({ toFloor: parseInt(e.target.value) })} className="w-full bg-background border border-white/10 rounded-md p-2.5 text-sm outline-none focus:border-white/30 transition-colors" />
                          </div>
                          <div className="space-y-3 pt-2">
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.hasElevatorTo} onChange={e => updateUmzugData({ hasElevatorTo: e.target.checked })} className="accent-primary w-4 h-4" /> Aufzug vorhanden
                            </label>
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.narrowStairsTo} onChange={e => updateUmzugData({ narrowStairsTo: e.target.checked })} className="accent-primary w-4 h-4" /> Sehr enges Treppenhaus
                            </label>
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.courtyardAccessTo} onChange={e => updateUmzugData({ courtyardAccessTo: e.target.checked })} className="accent-primary w-4 h-4" /> Zugang über Innenhof
                            </label>
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.noParkingZoneTo} onChange={e => updateUmzugData({ noParkingZoneTo: e.target.checked })} className="accent-primary w-4 h-4" /> Halteverbotszone benötigt
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-6 mt-4">
                        <div className="max-w-xs space-y-2">
                          <label className="text-[11px] text-muted-foreground tracking-wide">Distanz zwischen den Orten (km)</label>
                          <input type="number" placeholder="ca. 15" value={umzugData.distanceKm || ''} onChange={e => updateUmzugData({ distanceKm: parseInt(e.target.value) || 0 })} className="w-full bg-background border border-white/10 rounded-md p-2.5 text-sm outline-none focus:border-white/30 transition-colors" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* VOLUME SECTION */}
                  {section.id === 'volume' && (
                    <div className="space-y-8 pt-2">
                      <div className="space-y-2">
                        <label className="text-[11px] text-muted-foreground uppercase tracking-wider">Geschätzte Anzahl Umzugskartons</label>
                        <input type="number" placeholder="z.B. 40" value={umzugData.boxesCount || ''} onChange={e => updateUmzugData({ boxesCount: parseInt(e.target.value) || 0 })} className="w-full bg-background border border-white/10 rounded-md p-3 text-sm outline-none focus:border-white/30" />
                      </div>
                      
                      <label className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors">
                        <input type="checkbox" checked={umzugData.uncertainVolume} onChange={e => updateUmzugData({ uncertainVolume: e.target.checked })} className="mt-1 accent-primary w-4 h-4" /> 
                        <div>
                           <span className="text-sm font-medium text-foreground block">Ich bin mir beim Volumen sehr unsicher</span>
                           <span className="text-xs text-muted-foreground block mt-1 leading-relaxed">Der Preisrahmen wird basierend darauf zur Sicherheit stark erweitert. Eine finale Einschätzung erfolgt nach persönlicher Klärung oder Besichtigung.</span>
                        </div>
                      </label>

                      <div className="space-y-3 pt-2">
                        <label className="text-[11px] text-muted-foreground uppercase tracking-wider">Schwergut & Sonderteile</label>
                        <div className="flex flex-wrap gap-2">
                          {['Klavier', 'Tresor', 'Fitnessgerät', 'Aquarium', 'Flügel'].map(item => {
                             const active = umzugData.heavyItems.includes(item);
                             return (
                               <button 
                                 key={item} onClick={() => toggleHeavyItem(item)}
                                 className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${active ? 'bg-primary/20 border-primary text-primary-foreground' : 'bg-background border-border text-muted-foreground hover:border-muted-foreground/50'}`}
                               >
                                 {item}
                               </button>
                             )
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SERVICES SECTION */}
                  {section.id === 'services' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer hover:bg-background transition-colors">
                        <input type="checkbox" checked={umzugData.packingService} onChange={e => updateUmzugData({ packingService: e.target.checked })} className="mt-0.5 accent-primary" /> 
                        <div><span className="text-sm font-medium block">Einpackservice</span><span className="text-[10px] text-muted-foreground">Wir packen Ihre Hausrat sicher in Kartons.</span></div>
                      </label>
                      <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer hover:bg-background transition-colors">
                        <input type="checkbox" checked={umzugData.unpackingService} onChange={e => updateUmzugData({ unpackingService: e.target.checked })} className="mt-0.5 accent-primary" /> 
                        <div><span className="text-sm font-medium block">Auspackservice</span><span className="text-[10px] text-muted-foreground">Wir räumen alles wieder in Ihre Schränke.</span></div>
                      </label>
                      <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer hover:bg-background transition-colors">
                        <input type="checkbox" checked={umzugData.disassemblyService} onChange={e => updateUmzugData({ disassemblyService: e.target.checked })} className="mt-0.5 accent-primary" /> 
                        <div><span className="text-sm font-medium block">Möbeldemontage</span><span className="text-[10px] text-muted-foreground">Abbau großer Möbelstücke.</span></div>
                      </label>
                      <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer hover:bg-background transition-colors">
                        <input type="checkbox" checked={umzugData.assemblyService} onChange={e => updateUmzugData({ assemblyService: e.target.checked })} className="mt-0.5 accent-primary" /> 
                        <div><span className="text-sm font-medium block">Möbelmontage</span><span className="text-[10px] text-muted-foreground">Fachgerechter Aufbau am Zielort.</span></div>
                      </label>
                      <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer hover:bg-background transition-colors md:col-span-2">
                        <input type="checkbox" checked={umzugData.kitchenAssembly} onChange={e => updateUmzugData({ kitchenAssembly: e.target.checked })} className="mt-0.5 accent-primary" /> 
                        <div><span className="text-sm font-medium block">Küchendemontage / -montage</span><span className="text-[10px] text-muted-foreground">Inkl. Wasser- und Stromanschlüsse (soweit zulässig).</span></div>
                      </label>
                    </div>
                  )}

                  {/* TIME SECTION */}
                  {section.id === 'time' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground uppercase tracking-wider">Terminflexibilität</label>
                          <select 
                            value={umzugData.timeConstraint} 
                            onChange={e => updateUmzugData({ timeConstraint: e.target.value as any })}
                            className="w-full bg-background border border-border rounded-lg p-3 text-sm outline-none"
                          >
                            <option value="flexibel">Zeitlich flexibel (+/- 14 Tage)</option>
                            <option value="genaues_datum">Festes Datum benötigt</option>
                            <option value="wochenende">Zwingend Wochenende</option>
                            <option value="dringend">Dringend (innerhalb 7 Tage)</option>
                          </select>
                        </div>
                        <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer hover:bg-background transition-colors self-end h-[46px]">
                          <input type="checkbox" checked={umzugData.isPartialMove} onChange={e => updateUmzugData({ isPartialMove: e.target.checked })} className="accent-primary" /> 
                          <span className="text-sm">Nur Beiladung / Teilleistung</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* NOTES SECTION */}
                  {section.id === 'notes' && (
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground uppercase tracking-wider">Ergänzende Beschreibungen (Optional)</label>
                      <textarea 
                        value={umzugData.freeTextNote || ''}
                        onChange={e => updateUmzugData({ freeTextNote: e.target.value })}
                        placeholder="Z.B. Besonderheiten zum Treppenhaus, Art der Möbel, Wünsche zur Abwicklung..."
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
