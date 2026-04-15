import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight, ChevronRight, Globe } from "lucide-react";
import { BAVARIAN_CITIES_GEO, type CityGeoData } from "@/lib/geo-data";

interface RegionalDominanceGridProps {
    locale: string;
    dic: any;
}

/**
 * RegionalDominanceGrid - The 'Bavarian Authority' Component
 * Displays the massive network of 30+ hubs siloed by region to visually anchor dominance.
 */
export function RegionalDominanceGrid({ locale, dic }: RegionalDominanceGridProps) {
    const t = dic?.regional_grid || {};
    const regionNamesMap = dic?.area?.regions || {};

    // Group cities by region
    const regions: Record<string, CityGeoData[]> = {};
    Object.values(BAVARIAN_CITIES_GEO).forEach((city) => {
        const r = city.region || "Weitere Gebiete";
        if (!regions[r]) regions[r] = [];
        regions[r].push(city);
    });

    // Sort regions to put core hubs first
    const sortedRegionNames = Object.keys(regions).sort((a, b) => {
        const priority = ["Oberpfalz", "Oberbayern", "Mittelfranken"];
        const indexA = priority.indexOf(a);
        const indexB = priority.indexOf(b);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.localeCompare(b);
    });

    return (
        <section className="relative overflow-hidden bg-slate-950 px-6 py-32">
            {/* Semantic Background Grid */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="mb-20 text-center md:text-start">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-widest mb-6">
                        <Globe className="w-4 h-4 text-primary" />
                        {t.badge || "Bayernweite Logistik-Präsenz"}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-6">
                        {t.title ? (
                            <>
                                {t.title.split(' ')[0]} {t.title.split(' ')[1]} <span className="text-primary italic">{t.title.split(' ').slice(2).join(' ')}</span>
                            </>
                        ) : (
                            <>
                                Unser regionales <span className="text-primary italic">Netzwerk</span>
                            </>
                        )}
                    </h2>
                    <p className="text-xl text-white/50 max-w-3xl leading-relaxed">
                        {t.subtitle || "Von den Alpen bis nach Franken – FLOXANT kombiniert internationale Logistik-Power mit tief verwurzelter lokaler Expertise in jedem bayerischen Bezirk."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {sortedRegionNames.map((regionName) => (
                        <div key={regionName} className="space-y-6 group">
                            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                                <div className="h-10 w-1 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                                <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                                    {regionNamesMap[regionName] || regionName}
                                </h3>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-2">
                                {regions[regionName].map((city) => {
                                    // Generate slug correctly (muenchen, regensburg, etc.)
                                    const slug = Object.keys(BAVARIAN_CITIES_GEO).find(key => BAVARIAN_CITIES_GEO[key].name === city.name) || city.name.toLowerCase();
                                    
                                    return (
                                        <Link 
                                            key={city.name}
                                            href={`/${locale}/umzug-${slug}`}
                                            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-white/60 hover:text-white group/item"
                                        >
                                            <div className="flex items-center gap-3">
                                                <MapPin className="w-4 h-4 text-primary/40 group-hover/item:text-primary transition-colors" />
                                                <span className="text-sm font-semibold">{city.name}</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-primary" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 p-8 rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-start">
                    <div className="max-w-xl">
                        <h4 className="text-2xl font-bold text-white mb-2">{t.help_title || "Ihre Stadt nicht in der Liste?"}</h4>
                        <p className="text-white/40 text-sm">{t.help_desc || "Kein Problem. Unsere Teams sind mobil und führen Logistikprojekte in ganz Bayern, Deutschland und Europa zum Festpreis durch."}</p>
                    </div>
                    <Link 
                        href={`/${locale}/standorte`}
                        className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center gap-2 hover:scale-[1.03] transition-all shadow-xl shadow-primary/20"
                    >
                        {t.cta || "Alle Standorte anzeigen"}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
