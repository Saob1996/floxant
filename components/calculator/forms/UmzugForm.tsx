"use client";

import React, { useState } from 'react';
import { useCalculatorStore } from '@/store/calculatorStore';
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MapPin, Box, Briefcase, Calendar, MessageSquare, Truck, Sparkles } from 'lucide-react';

export default function UmzugForm({ dic }: { dic?: any }) {
  const SECTIONS = [
    { id: 'access', label: dic?.calculator.access_conditions || "Zugang & Parksituation", icon: MapPin },
    { id: 'volume', label: dic?.calculator.inventory_volume || "Inventar & Volumen (Optional)", icon: Box },
    { id: 'services', label: dic?.calculator.service_scope || "Leistungsumfang", icon: Briefcase },
    { id: 'time', label: dic?.calculator.arrival_time || "Termin & Logistik", icon: Calendar },
    { id: 'notes', label: dic?.calculator.notes_title || "Weitere Hinweise", icon: MessageSquare }
  ];
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
          <Truck size={14} className="text-primary" />{dic?.calculator.basis_data || "Basisdaten"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] text-muted-foreground tracking-wide uppercase">{dic?.calculator.living_area || "Wohnfläche (m²)"}</label>
            <input 
              type="number" 
              value={umzugData.areaM2 || ''}
              onChange={(e) => updateUmzugData({ areaM2: parseInt(e.target.value) || 0 })}
              placeholder={dic?.calculator.area_placeholder || "z.B. 65"}
              className="w-full bg-background border border-white/10 rounded-md p-3 text-sm text-foreground outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] text-muted-foreground tracking-wide uppercase">{dic?.calculator.rooms || "Zimmeranzahl"}</label>
            <input 
              type="number" 
              value={umzugData.rooms || ''}
              onChange={(e) => updateUmzugData({ rooms: parseInt(e.target.value) || 0 })}
              placeholder={dic?.calculator.rooms_placeholder || "z.B. 3"}
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
                          <h4 className="text-[11px] font-bold text-foreground/50 uppercase tracking-[0.15em] border-b border-white/5 pb-2">{dic?.calculator.from_address || "Auszugsort"}</h4>
                          <div className="space-y-2">
                            <label className="text-[11px] text-muted-foreground tracking-wide">{dic?.calculator.address_optional || "Vollständige Adresse (Optional)"}</label>
                            <input type="text" placeholder={dic?.calculator.address_placeholder || "Straße, PLZ, Ort"} value={umzugData.fromAddressDetailed || ''} onChange={e => updateUmzugData({ fromAddressDetailed: e.target.value })} className="w-full bg-background border border-white/10 rounded-md p-2.5 text-sm outline-none focus:border-white/30 transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] text-muted-foreground tracking-wide">{dic?.calculator.floor || "Etage"}</label>
                            <input type="number" placeholder="0 = Erdgeschoss" value={umzugData.fromFloor ?? ''} onChange={e => updateUmzugData({ fromFloor: parseInt(e.target.value) })} className="w-full bg-background border border-white/10 rounded-md p-2.5 text-sm outline-none focus:border-white/30 transition-colors" />
                          </div>
                          <div className="space-y-3 pt-2">
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.hasElevatorFrom} onChange={e => updateUmzugData({ hasElevatorFrom: e.target.checked })} className="accent-primary w-4 h-4" /> {dic?.calculator.lift || "Aufzug vorhanden"}
                            </label>
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.narrowStairsFrom} onChange={e => updateUmzugData({ narrowStairsFrom: e.target.checked })} className="accent-primary w-4 h-4" /> {dic?.calculator.narrow_stairs || "Sehr enges Treppenhaus"}
                            </label>
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.courtyardAccessFrom} onChange={e => updateUmzugData({ courtyardAccessFrom: e.target.checked })} className="accent-primary w-4 h-4" /> {dic?.calculator.courtyard_access || "Zugang über Innenhof"}
                            </label>
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.noParkingZoneFrom} onChange={e => updateUmzugData({ noParkingZoneFrom: e.target.checked })} className="accent-primary w-4 h-4" /> {dic?.footer.no_parking_zone || "Halteverbotszone benötigt"}
                            </label>
                          </div>
                        </div>

                        {/* TO */}
                        <div className="space-y-5">
                          <h4 className="text-[11px] font-bold text-foreground/50 uppercase tracking-[0.15em] border-b border-white/5 pb-2">{dic?.calculator.to_address || "Einzugsort"}</h4>
                          <div className="space-y-2">
                            <label className="text-[11px] text-muted-foreground tracking-wide">{dic?.calculator.address_optional || "Vollständige Adresse (Optional)"}</label>
                            <input type="text" placeholder={dic?.calculator.address_placeholder || "Straße, PLZ, Ort"} value={umzugData.toAddressDetailed || ''} onChange={e => updateUmzugData({ toAddressDetailed: e.target.value })} className="w-full bg-background border border-white/10 rounded-md p-2.5 text-sm outline-none focus:border-white/30 transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] text-muted-foreground tracking-wide">{dic?.calculator.floor || "Etage"}</label>
                            <input type="number" placeholder="0 = Erdgeschoss" value={umzugData.toFloor ?? ''} onChange={e => updateUmzugData({ toFloor: parseInt(e.target.value) })} className="w-full bg-background border border-white/10 rounded-md p-2.5 text-sm outline-none focus:border-white/30 transition-colors" />
                          </div>
                          <div className="space-y-3 pt-2">
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.hasElevatorTo} onChange={e => updateUmzugData({ hasElevatorTo: e.target.checked })} className="accent-primary w-4 h-4" /> {dic?.calculator.lift || "Aufzug vorhanden"}
                            </label>
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.narrowStairsTo} onChange={e => updateUmzugData({ narrowStairsTo: e.target.checked })} className="accent-primary w-4 h-4" /> {dic?.calculator.narrow_stairs || "Sehr enges Treppenhaus"}
                            </label>
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.courtyardAccessTo} onChange={e => updateUmzugData({ courtyardAccessTo: e.target.checked })} className="accent-primary w-4 h-4" /> {dic?.calculator.courtyard_access || "Zugang über Innenhof"}
                            </label>
                            <label className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={umzugData.noParkingZoneTo} onChange={e => updateUmzugData({ noParkingZoneTo: e.target.checked })} className="accent-primary w-4 h-4" /> {dic?.footer.no_parking_zone || "Halteverbotszone benötigt"}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-6 mt-4">
                        <div className="max-w-xs space-y-2">
                          <label className="text-[11px] text-muted-foreground tracking-wide">{dic?.calculator.distance_parking || "Distanz zwischen den Orten (km)"}</label>
                          <input type="number" placeholder={dic?.calculator.dist_placeholder || "ca. 15"} value={umzugData.distanceKm || ''} onChange={e => updateUmzugData({ distanceKm: parseInt(e.target.value) || 0 })} className="w-full bg-background border border-white/10 rounded-md p-2.5 text-sm outline-none focus:border-white/30 transition-colors" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* VOLUME SECTION */}
                  {section.id === 'volume' && (
                    <div className="space-y-8 pt-2">
                      <div className="space-y-2">
                        <label className="text-[11px] text-muted-foreground uppercase tracking-wider">{dic?.calculator.estimated_boxes || "Geschätzte Anzahl Umzugskartons"}</label>
                        <input type="number" placeholder={dic?.calculator.boxes_placeholder || "z.B. 40"} value={umzugData.boxesCount || ''} onChange={e => updateUmzugData({ boxesCount: parseInt(e.target.value) || 0 })} className="w-full bg-background border border-white/10 rounded-md p-3 text-sm outline-none focus:border-white/30" />
                      </div>
                      
                      <label className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors">
                        <input type="checkbox" checked={umzugData.uncertainVolume} onChange={e => updateUmzugData({ uncertainVolume: e.target.checked })} className="mt-1 accent-primary w-4 h-4" /> 
                        <div>
                           <span className="text-sm font-medium text-foreground block">{dic?.calculator.uncertain_volume || "Ich bin mir beim Volumen sehr unsicher"}</span>
                           <span className="text-xs text-muted-foreground block mt-1 leading-relaxed">{dic?.calculator.uncertain_volume_desc || "Der Preisrahmen wird basierend darauf zur Sicherheit stark erweitert. Eine finale Einschätzung erfolgt nach persönlicher Klärung oder Besichtigung."}</span>
                        </div>
                      </label>

                      <div className="space-y-3 pt-2">
                        <label className="text-[11px] text-muted-foreground uppercase tracking-wider">{dic?.calculator.heavy_items_title || "Schwergut & Sonderteile"}</label>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(dic?.calculator.heavy_items || {
                            "piano": "Piano",
                            "safe": "Safe",
                            "fitness_gear": "Fitnessgerät",
                            "aquarium": "Aquarium",
                            "grand_piano": "Flügel"
                          }).map(([key, label]) => {
                             const active = umzugData.heavyItems.includes(key);
                             return (
                               <button 
                                 type="button"
                                 key={key} onClick={() => toggleHeavyItem(key)}
                                 className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${active ? 'bg-primary/20 border-primary text-primary' : 'bg-background border-border text-muted-foreground hover:border-muted-foreground/50'}`}
                               >
                                 {label as string}
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
                        <div><span className="text-sm font-medium block">{dic?.calculator.packing_service || "Einpackservice"}</span><span className="text-[10px] text-muted-foreground">{dic?.calculator.packing_desc || "Wir packen Ihre Hausrat sicher in Kartons."}</span></div>
                      </label>
                      <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer hover:bg-background transition-colors">
                        <input type="checkbox" checked={umzugData.unpackingService} onChange={e => updateUmzugData({ unpackingService: e.target.checked })} className="mt-0.5 accent-primary" /> 
                        <div><span className="text-sm font-medium block">{dic?.calculator.unpacking_service || "Auspackservice"}</span><span className="text-[10px] text-muted-foreground">{dic?.calculator.unpacking_desc || "Wir räumen alles wieder in Ihre Schränke."}</span></div>
                      </label>
                      <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer hover:bg-background transition-colors">
                        <input type="checkbox" checked={umzugData.disassemblyService} onChange={e => updateUmzugData({ disassemblyService: e.target.checked })} className="mt-0.5 accent-primary" /> 
                        <div><span className="text-sm font-medium block">{dic?.calculator.disassembly_service || "Möbeldemontage"}</span><span className="text-[10px] text-muted-foreground">{dic?.calculator.disassembly_desc || "Abbau großer Möbelstücke."}</span></div>
                      </label>
                      <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer hover:bg-background transition-colors">
                        <input type="checkbox" checked={umzugData.assemblyService} onChange={e => updateUmzugData({ assemblyService: e.target.checked })} className="mt-0.5 accent-primary" /> 
                        <div><span className="text-sm font-medium block">{dic?.calculator.assembly_service || "Möbelmontage"}</span><span className="text-[10px] text-muted-foreground">{dic?.calculator.assembly_desc || "Fachgerechter Aufbau am Zielort."}</span></div>
                      </label>
                      <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer hover:bg-background transition-colors md:col-span-2">
                        <input type="checkbox" checked={umzugData.kitchenAssembly} onChange={e => updateUmzugData({ kitchenAssembly: e.target.checked })} className="mt-0.5 accent-primary" /> 
                        <div><span className="text-sm font-medium block">{dic?.calculator.kitchen_service || "Küchendemontage / -montage"}</span><span className="text-[10px] text-muted-foreground">{dic?.calculator.kitchen_desc || "Inkl. Wasser- und Stromanschlüsse (soweit zulässig)."}</span></div>
                      </label>
                    </div>
                  )}

                  {/* TIME SECTION */}
                  {section.id === 'time' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground uppercase tracking-wider">{dic?.calculator.time_flexibility || "Terminflexibilität"}</label>
                          <select 
                            value={umzugData.timeConstraint} 
                            onChange={e => updateUmzugData({ timeConstraint: e.target.value as any })}
                            className="w-full bg-background border border-border rounded-lg p-3 text-sm outline-none"
                          >
                            <option value="flexibel">{dic?.calculator.flexible_time || "Zeitlich flexibel (+/- 14 Tage)"}</option>
                            <option value="genaues_datum">{dic?.calculator.exact_date || "Festes Datum benötigt"}</option>
                            <option value="wochenende">{dic?.calculator.weekend_only || "Zwingend Wochenende"}</option>
                            <option value="dringend">{dic?.calculator.urgent || "Dringend (innerhalb 7 Tage)"}</option>
                          </select>
                        </div>
                        <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 cursor-pointer hover:bg-background transition-colors self-end h-[46px]">
                          <input type="checkbox" checked={umzugData.isPartialMove} onChange={e => updateUmzugData({ isPartialMove: e.target.checked })} className="accent-primary" /> 
                          <span className="text-sm">{dic?.calculator.partial_move || "Nur Beiladung / Teilleistung"}</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* NOTES SECTION */}
                  {section.id === 'notes' && (
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground uppercase tracking-wider">{dic?.calculator.additional_notes || "Ergänzende Beschreibungen (Optional)"}</label>
                      <textarea 
                        value={umzugData.freeTextNote || ''}
                        onChange={e => updateUmzugData({ freeTextNote: e.target.value })}
                        placeholder={dic?.calculator.notes_placeholder_detailed || "Z.B. Besonderheiten zum Treppenhaus, Art der Möbel, Wünsche zur Abwicklung..."}
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

      {/* Social Proof Banner */}
      <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border border-primary/10 rounded-xl animate-pulse-slow">
        <div className="flex -space-x-2">
          {[1,2,3].map(i => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold text-primary">
              <Sparkles size={10} />
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground/60 font-medium">{dic?.calculator.social_proof || "Aktuell schauen 3 Personen diesen Rechner an"}</p>
      </div>
    </div>
  );
}
