"use client";

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  TrendingUp, Users, Activity, BarChart3, Zap, MapPin, 
  ArrowUpRight, ArrowDownRight, Target, Truck, Euro
} from 'lucide-react';

const mockDataTime = [
  { name: 'Mo', volume: 4000, margin: 2400 },
  { name: 'Di', volume: 3000, margin: 1398 },
  { name: 'Mi', volume: 2000, margin: 9800 },
  { name: 'Do', volume: 2780, margin: 3908 },
  { name: 'Fr', volume: 1890, margin: 4800 },
  { name: 'Sa', volume: 2390, margin: 3800 },
  { name: 'So', volume: 3490, margin: 4300 },
];

const competitorGapData = [
  { region: 'München', floxant: 850, avg: 920, movinga: 890 },
  { region: 'Berlin', floxant: 450, avg: 410, movinga: 430 },
  { region: 'Hamburg', floxant: 680, avg: 700, movinga: 750 },
  { region: 'Köln', floxant: 520, avg: 550, movinga: 580 },
];

const clusterData = [
  { id: 'MUC-0A1-332', jobs: 4, revenue: 3200, efficiency: 94 },
  { id: 'BER-9B2-110', jobs: 2, revenue: 950, efficiency: 65 },
  { id: 'HAM-4C8-553', jobs: 5, revenue: 4100, efficiency: 98 },
];

export default function EnhancedPricingInsights() {

  const [timeRange, setTimeRange] = useState('7d');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#05050A] text-white p-4 md:p-8">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-light mb-2 flex items-center gap-3">
             <BarChart3 className="text-blue-500" />
             Market & Pricing Operations
           </h1>
           <p className="text-white/50">Zentrales Steuerungsmodul für Margen und Wettbewerbsausrichtung.</p>
        </div>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 outline-none"
        >
          <option value="24h">Letzte 24h</option>
          <option value="7d">Letzte 7 Tage</option>
          <option value="30d">Letzte 30 Tage</option>
        </select>
      </div>

      {/* Primary KPIs */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <KPICard title="Ø Angebotsvolumen" value="€842.50" trend="+4.2%" up />
        <KPICard title="Ø Akquisitionsmarge" value="38.5%" trend="+2.1%" up />
        <KPICard title="Hesitation Triggers" value="142" trend="-12%" up={false} />
        <KPICard title="Cluster Effizienz" value="89%" trend="+5.4%" up />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Core Financial Trajectory */}
        <div className="lg:col-span-2 bg-[#0B0B12] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-lg font-medium flex items-center gap-2">
               <TrendingUp className="text-emerald-400" /> Umsatz vs. Reale Marge
             </h2>
             <span className="text-xs text-white/40">Gleichende Woche</span>
          </div>
          <div className="h-72 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockDataTime}>
                <defs>
                  <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#ffffff30" tick={{fill: '#ffffff60', fontSize: 12}} />
                <Tooltip contentStyle={{backgroundColor: '#111', borderColor: '#333', borderRadius: '8px'}}/>
                <Area type="monotone" dataKey="volume" stroke="#3B82F6" fillOpacity={1} fill="url(#colorVol)" />
                <Area type="monotone" dataKey="margin" stroke="#10B981" fillOpacity={1} fill="url(#colorMargin)" />
              </AreaChart>
            </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Phase 4: Market Intelligence Gap Tracker */}
        <div className="bg-[#0B0B12] border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
            <Target className="text-red-400" /> Wettbewerbs-Gap Radar
          </h2>
          <div className="space-y-6">
            {competitorGapData.map((gap, i) => {
              const diff = gap.floxant - gap.avg;
              const isUndercut = diff < 0;
              return (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium">{gap.region}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isUndercut ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {isUndercut ? 'Undercutting' : 'Premium'} ({isUndercut ? '' : '+'}{Math.round((diff/gap.avg)*100)}%)
                    </span>
                  </div>
                  <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                     {/* Market Average Marker */}
                     <div className="absolute top-0 bottom-0 left-[50%] w-0.5 bg-white/30 z-10" />
                     {/* Floxant Bar relative to average (which is arbitrarily mapped to 50%) */}
                     <div 
                       className={`absolute top-0 bottom-0 ${isUndercut ? 'bg-emerald-500' : 'bg-red-500'}`} 
                       style={{ 
                         left: isUndercut ? `${50 - Math.abs((diff/gap.avg)*50)}%` : '50%',
                         width: `${Math.abs((diff/gap.avg)*50)}%`
                       }} 
                     />
                  </div>
                  <div className="flex justify-between text-[10px] text-white/40 mt-1">
                    <span>FLOX: {gap.floxant}€</span>
                    <span>Ø Markt: {gap.avg}€</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Phase 4: Cluster Operations */}
         <div className="bg-[#0B0B12] border border-white/10 rounded-2xl p-6 shadow-xl">
           <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
             <Truck className="text-blue-400" /> Aktive Routen-Cluster
           </h2>
           <div className="space-y-3">
             {clusterData.map((cluster, i) => (
               <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                 <div>
                   <span className="text-sm font-mono text-blue-400 block mb-1">{cluster.id}</span>
                   <span className="text-xs text-white/50">{cluster.jobs} Gebündelte Aufträge</span>
                 </div>
                 <div className="text-right">
                   <span className="block text-lg font-medium text-emerald-400">{cluster.revenue}€</span>
                   <span className="text-xs text-white/40">Auslastung: {cluster.efficiency}%</span>
                 </div>
               </div>
             ))}
           </div>
         </div>

         {/* Phase 4: Conversion & Upsell Engine */}
         <div className="bg-[#0B0B12] border border-white/10 rounded-2xl p-6 shadow-xl">
           <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
             <Zap className="text-violet-400" /> Upsell-Performance Engine
           </h2>
           <div className="space-y-4">
             <div className="flex justify-between items-center p-3 border-b border-white/5">
                <div>
                  <h4 className="text-sm font-medium">Verpackungsservice</h4>
                  <p className="text-[10px] text-white/50">Attached in 42% of Premium orders</p>
                </div>
                <span className="text-emerald-400 font-medium">+12.4K €</span>
             </div>
             <div className="flex justify-between items-center p-3 border-b border-white/5">
                <div>
                  <h4 className="text-sm font-medium">Express-Slot Reservierung</h4>
                  <p className="text-[10px] text-white/50">Attached in 18% of Balanced orders</p>
                </div>
                <span className="text-emerald-400 font-medium">+8.2K €</span>
             </div>
             <div className="flex justify-between items-center p-3">
                <div>
                  <h4 className="text-sm font-medium">Hesitation Trigger (5%)</h4>
                  <p className="text-[10px] text-white/50">Rescued 142 drop-offs</p>
                </div>
                <span className="text-emerald-400 font-medium">+18.0K €</span>
             </div>
           </div>
         </div>
      </div>

    </div>
  );
}

function KPICard({ title, value, trend, up }: { title: string, value: string, trend: string, up: boolean }) {
  return (
    <div className="bg-[#0B0B12] border border-white/10 p-6 rounded-2xl shadow-xl">
      <h3 className="text-white/50 text-sm font-medium mb-4">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-light">{value}</span>
        <span className={`flex items-center text-sm font-medium ${up ? 'text-emerald-400' : 'text-red-400'}`}>
          {up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {trend}
        </span>
      </div>
    </div>
  );
}
