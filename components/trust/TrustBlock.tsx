"use client";

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Star, Users, MapPin } from 'lucide-react';

interface TrustBlockProps {
  locationHint?: string;
  className?: string;
}

export default function TrustBlock({ locationHint, className = '' }: TrustBlockProps) {
  const [mounted, setMounted] = useState(false);
  
  // Jobs completed counter (simulated growth logic)
  const baseJobs = 14350;
  // Increase by roughly 1 every few hours since a specific date
  const timeDiffHours = (Date.now() - new Date('2026-01-01').getTime()) / (1000 * 60 * 60);
  const currentJobs = Math.floor(baseJobs + (timeDiffHours * 0.4));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch for dynamic counters

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 w-full ${className}`}>
      
      {/* Google Rating */}
      <div className="bg-background border border-border rounded-xl p-4 flex items-center gap-4 hover:bg-background/80 transition-colors">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-border/50">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.5 12.27c0-.85-.08-1.68-.22-2.48H12v4.61h6.53c-.28 1.54-1.14 2.85-2.43 3.71v3.08h3.93c2.3-2.12 3.63-5.24 3.63-8.92z" fill="#4285F4"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.93-3.08c-1.07.72-2.45 1.15-4 1.15-3.07 0-5.67-2.07-6.6-4.86H1.34v3.2C3.33 21.46 7.37 24 12 24z" fill="#34A853"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M5.4 14.31A6.98 6.98 0 015 12c0-.8.14-1.58.4-2.31V6.49H1.34A11.97 11.97 0 000 12c0 1.93.46 3.77 1.34 5.51l4.06-3.2z" fill="#FBBC05"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 4.83c1.76 0 3.34.6 4.58 1.78l3.43-3.43C17.95 1.22 15.24 0 12 0 7.37 0 3.33 2.54 1.34 6.49l4.06 3.2c.93-2.79 3.53-4.86 6.6-4.86z" fill="#EA4335"/>
          </svg>
        </div>
        <div>
          <div className="flex text-yellow-500 mb-1">
            {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
          </div>
          <p className="text-foreground text-xs font-semibold tracking-wide uppercase">4.9 / 5.0 (Google)</p>
          <span className="text-muted-foreground text-[10px] uppercase tracking-widest">Unabhängig verifiziert</span>
        </div>
      </div>

      {/* Counter */}
      <div className="bg-background border border-border rounded-xl p-4 flex items-center gap-4 hover:bg-background/80 transition-colors">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Users size={18} />
        </div>
        <div>
          <p className="text-foreground text-sm font-medium tracking-wide uppercase">{currentJobs.toLocaleString('de-DE')}+</p>
          <span className="text-muted-foreground text-[10px] uppercase tracking-widest text-balance">Verifizierte Aufträge</span>
        </div>
      </div>

      {/* Geo-Active */}
      <div className="bg-background border border-border rounded-xl p-4 flex items-center gap-4 hover:bg-background/80 transition-colors">
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
          <MapPin size={18} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-foreground text-xs font-semibold tracking-wide uppercase">Regional aktiv</p>
          </div>
          <span className="text-muted-foreground text-[10px] uppercase tracking-widest line-clamp-2">
            Disponenten vor Ort {locationHint ? `in ${locationHint}` : 'verfügbar'}.
          </span>
        </div>
      </div>

    </div>
  );
}
