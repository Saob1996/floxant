import { cn } from "@/lib/utils";
import type { FloxantVisualVariant } from "@/components/FloxantServiceVisual";

type FloxantSymbolLayerProps = {
 variant?: FloxantVisualVariant;
 density?: "soft" | "rich";
 className?: string;
};

const accents: Record<FloxantVisualVariant, string> = {
 moving: "from-blue-500/20 via-sky-400/12 to-transparent",
 cleaning: "from-cyan-500/20 via-emerald-400/12 to-transparent",
 clearance: "from-amber-500/20 via-orange-400/12 to-transparent",
 office: "from-indigo-500/20 via-blue-400/12 to-transparent",
 backhaul: "from-emerald-500/20 via-teal-400/12 to-transparent",
 premium: "from-amber-500/18 via-stone-500/12 to-transparent",
};

export function FloxantSymbolLayer({
 variant = "moving",
 density = "soft",
 className,
}: FloxantSymbolLayerProps) {
 const rich = density === "rich";

 return (
  <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
   <div className={cn("absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br blur-3xl", accents[variant])} />
   <div className="absolute left-[6%] top-[14%] h-24 w-24 rounded-[2rem] border border-blue-200/35 bg-white/18 rotate-12 backdrop-blur-sm" />
   <div className="absolute right-[12%] top-[28%] h-16 w-16 rounded-full border border-slate-300/35 bg-white/22" />
   <div className="absolute bottom-[13%] left-[16%] h-20 w-20 rounded-[1.5rem] border border-blue-200/35 bg-white/18 -rotate-6" />

   {variant === "cleaning" || variant === "office" ? (
    <svg className="absolute inset-x-0 bottom-0 h-[70%] w-full opacity-[0.38]" viewBox="0 0 960 420" fill="none">
     {/* Abstract clean zones / grid layout instead of logistics path */}
     <path d="M100 286 H860" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
     <path d="M100 200 H860" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeDasharray="10 15" opacity="0.4" />
     <rect x="142" y="214" width="120" height="58" rx="8" stroke="#38bdf8" strokeWidth="2" fill="white" fillOpacity="0.52" />
     <rect x="280" y="176" width="180" height="96" rx="10" stroke="#0ea5e9" strokeWidth="2" fill="#DBEAFE" fillOpacity="0.45" />
     <rect x="650" y="198" width="160" height="74" rx="8" stroke="#10b981" strokeWidth="2" fill="white" fillOpacity="0.58" />
     <circle cx="210" cy="152" r="5" fill="#10b981" fillOpacity="0.38" />
     <circle cx="436" cy="128" r="5" fill="#38BDF8" fillOpacity="0.42" />
     <circle cx="700" cy="160" r="5" fill="#0ea5e9" fillOpacity="0.28" />
    </svg>
   ) : (
    <svg className="absolute inset-x-0 bottom-0 h-[70%] w-full opacity-[0.38]" viewBox="0 0 960 420" fill="none">
     <path d="M74 330 C190 248 296 365 420 286 C560 196 674 236 850 112" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" strokeDasharray="12 18" />
     <path d="M116 286 H844" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
     <rect x="142" y="214" width="92" height="58" rx="14" stroke="#BFDBFE" strokeWidth="2" fill="white" fillOpacity="0.52" />
     <rect x="248" y="176" width="72" height="96" rx="15" stroke="#93C5FD" strokeWidth="2" fill="#DBEAFE" fillOpacity="0.45" />
     <rect x="678" y="198" width="112" height="74" rx="18" stroke="#BFDBFE" strokeWidth="2" fill="white" fillOpacity="0.58" />
     <circle cx="396" cy="152" r="7" fill="#2563EB" fillOpacity="0.38" />
     <circle cx="436" cy="128" r="4" fill="#38BDF8" fillOpacity="0.42" />
     <circle cx="476" cy="160" r="6" fill="#2563EB" fillOpacity="0.28" />
    </svg>
   )}

   {rich ? (
    <>
     <div className="absolute right-[22%] bottom-[18%] h-28 w-28 rounded-[2rem] border border-foreground/45 bg-white/18 rotate-45" />
     <div className="absolute left-[42%] top-[8%] h-12 w-32 rounded-full border border-blue-200/35 bg-white/20" />
    </>
   ) : null}
  </div>
 );
}
