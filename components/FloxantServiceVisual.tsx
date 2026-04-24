import {
 Briefcase,
 CheckCircle2,
 Crown,
 Package,
 Sparkles,
 Trash2,
 Truck,
 type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";

export type FloxantVisualVariant =
 | "moving"
 | "cleaning"
 | "clearance"
 | "office"
 | "backhaul"
 | "premium";

type FloxantServiceVisualProps = {
 variant?: FloxantVisualVariant;
 title?: string;
 kicker?: string;
 details?: string[];
 compact?: boolean;
 className?: string;
};

const visualConfig: Record<
 FloxantVisualVariant,
 {
  icon: LucideIcon;
  kicker: string;
  title: string;
  accent: string;
  chip: string;
  surface: string;
  details: string[];
 }
> = {
 moving: {
  icon: Truck,
  kicker: "Umzug",
  title: "Transport, Zugang und Termin klar geplant",
  accent: "from-blue-500 to-sky-400",
  chip: "bg-blue-600 text-foreground",
  surface: "bg-[radial-gradient(circle_at_18%_0%,rgba(37,99,235,0.22),transparent_34%),linear-gradient(180deg,#ffffff,#edf6ff)]",
  details: ["Volumen", "Strecke", "Montage"],
 },
 cleaning: {
  icon: Sparkles,
  kicker: "Reinigung",
  title: "Fläche, Zustand und Übergabe sichtbar getrennt",
  accent: "from-cyan-500 to-emerald-400",
  chip: "bg-cyan-600 text-foreground",
  surface: "bg-[radial-gradient(circle_at_18%_0%,rgba(14,165,233,0.2),transparent_34%),linear-gradient(180deg,#ffffff,#eefcff)]",
  details: ["Fläche", "Küche/Bad", "Fenster"],
 },
 clearance: {
  icon: Trash2,
  kicker: "Entrümpelung",
  title: "Räumung, Material und Zugang realistisch geprüft",
  accent: "from-amber-500 to-orange-400",
  chip: "bg-amber-500 text-slate-950",
  surface: "bg-[radial-gradient(circle_at_18%_0%,rgba(245,158,11,0.22),transparent_34%),linear-gradient(180deg,#ffffff,#fff7ed)]",
  details: ["Volumen", "Material", "Abtransport"],
 },
 office: {
  icon: Briefcase,
  kicker: "Büro & Firma",
  title: "Arbeitsplätze, IT und Zeitfenster sauber koordiniert",
  accent: "from-indigo-500 to-blue-400",
  chip: "bg-indigo-600 text-foreground",
  surface: "bg-[radial-gradient(circle_at_18%_0%,rgba(99,102,241,0.2),transparent_34%),linear-gradient(180deg,#ffffff,#eef2ff)]",
  details: ["Team", "Archiv", "Betriebsruhe"],
 },
 backhaul: {
  icon: Package,
  kicker: "Leer-Rückfahrt",
  title: "Freier Laderaum fair genutzt, wenn Route und Datum passen",
  accent: "from-emerald-500 to-teal-400",
  chip: "bg-emerald-500 text-slate-950",
  surface: "bg-[radial-gradient(circle_at_18%_0%,rgba(16,185,129,0.22),transparent_34%),linear-gradient(180deg,#ffffff,#ecfdf5)]",
  details: ["Route", "Datum", "Ladefläche"],
 },
 premium: {
  icon: Crown,
  kicker: "Private Client",
  title: "Diskret, hochwertig und ohne öffentliche Standardlogik",
  accent: "from-stone-900 to-amber-500",
  chip: "bg-stone-950 text-amber-500 ",
  surface: "bg-[radial-gradient(circle_at_18%_0%,rgba(217,119,6,0.18),transparent_34%),linear-gradient(180deg,#ffffff,#fff7ed)]",
  details: ["Diskretion", "Anwesen", "Koordination"],
 },
};

export function FloxantServiceVisual({
 variant = "moving",
 title,
 kicker,
 details,
 compact = false,
 className,
}: FloxantServiceVisualProps) {
 const config = visualConfig[variant];
 const Icon = config.icon;
 const visibleDetails = details?.length ? details.slice(0, 3) : config.details;
 const gradientId = `floxant-visual-${variant}`;

 return (
  <div
   className={cn(
    "relative isolate overflow-hidden rounded-[1.75rem] border border-slate-200/80 text-slate-950 shadow-[0_22px_65px_rgba(15,23,42,0.1)]",
    "floxant-service-visual",
    config.surface,
    compact ? "min-h-[210px] p-4" : "min-h-[330px] p-6",
    className
   )}
  >
   <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),transparent_45%,rgba(37,99,235,0.08))]" />
   <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/70 blur-3xl" />
   <FloxantSymbolLayer variant={variant} className="opacity-35" />

   {variant === "cleaning" || variant === "office" ? (
    <svg
     aria-hidden="true"
     viewBox="0 0 560 330"
     className={cn("absolute inset-x-0 bottom-0 z-0 h-[82%] w-full", compact ? "opacity-80" : "opacity-95")}
    >
     <defs>
      <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1">
       <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.92" />
       <stop offset="100%" stopColor="#10b981" stopOpacity="0.7" />
      </linearGradient>
      <linearGradient id={`${gradientId}-alt`} x1="0" x2="1" y1="0" y2="1">
       <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
       <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
      </linearGradient>
     </defs>
     {/* Abstract background swoosh (wiping motion) */}
     <path d="M20 280 C140 240 220 160 380 180 C480 190 520 130 540 80" fill="none" stroke="#bae6fd" strokeWidth="28" strokeLinecap="round" opacity="0.4" />
     <path d="M40 260 C160 220 200 120 360 140 C440 150 480 90 500 50" fill="none" stroke="#7dd3fc" strokeWidth="12" strokeLinecap="round" opacity="0.6" />
     
     {/* Floor / baseline */}
     <path d="M38 276 H526" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" opacity="0.9" />

     {/* Cleaned Surface / Window Panes */}
     <rect x="80" y="140" width="140" height="136" rx="12" fill="#ffffff" stroke="#bae6fd" strokeWidth="3" opacity="0.9" />
     <rect x="92" y="152" width="54" height="112" rx="6" fill="#f0f9ff" />
     <rect x="154" y="152" width="54" height="112" rx="6" fill={`url(#${gradientId})`} opacity="0.8" />
     
     {/* Sparkles / Clean marks */}
     <path d="M181 180 L181 190 M176 185 L186 185" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
     <path d="M220 120 L226 108 L232 120 L244 126 L232 132 L226 144 L220 132 L208 126 Z" fill="#38bdf8" opacity="0.8" />
     <path d="M70 100 L74 92 L78 100 L86 104 L78 108 L74 116 L70 108 L62 104 Z" fill="#60a5fa" opacity="0.6" />

     {/* Office Building silhouette in background */}
     <rect x="360" y="120" width="100" height="156" rx="8" fill="#ffffff" stroke="#bfdbfe" strokeWidth="3" opacity="0.8" />
     <rect x="376" y="140" width="28" height="24" rx="4" fill="#dbeafe" />
     <rect x="416" y="140" width="28" height="24" rx="4" fill="#dbeafe" />
     <rect x="376" y="180" width="28" height="24" rx="4" fill={`url(#${gradientId}-alt)`} opacity="0.5" />
     <rect x="416" y="180" width="28" height="24" rx="4" fill={`url(#${gradientId}-alt)`} opacity="0.5" />
     <rect x="376" y="220" width="28" height="24" rx="4" fill="#dbeafe" />
     <rect x="416" y="220" width="28" height="24" rx="4" fill="#dbeafe" />

     {/* Checklist/Clipboard for workflow/quality */}
     <rect x="250" y="180" width="80" height="96" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" transform="rotate(8 290 228)" />
     <rect x="270" y="174" width="40" height="12" rx="4" fill="#94a3b8" transform="rotate(8 290 228)" />
     <path d="M266 210 H314" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" transform="rotate(8 290 228)" />
     <path d="M266 230 H314" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" transform="rotate(8 290 228)" />
     <path d="M266 250 H290" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" transform="rotate(8 290 228)" />
     {/* Checkmarks */}
     <path d="M256 208 L260 212 L266 204" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" transform="rotate(8 290 228)" />
     <path d="M256 228 L260 232 L266 224" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" transform="rotate(8 290 228)" />
    </svg>
   ) : (
    <svg
     aria-hidden="true"
     viewBox="0 0 560 330"
     className={cn("absolute inset-x-0 bottom-0 z-0 h-[82%] w-full", compact ? "opacity-80" : "opacity-95")}
    >
     <defs>
      <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1">
       <stop offset="0%" stopColor="#2563eb" stopOpacity="0.92" />
       <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
      </linearGradient>
     </defs>
     <path d="M40 246 C128 190 198 284 284 226 C364 172 442 188 520 120" fill="none" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" strokeDasharray="16 18" opacity="0.72" />
     <path d="M38 276 H526" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
     <rect x="46" y="178" width="210" height="76" rx="20" fill="#ffffff" stroke="#bfdbfe" strokeWidth="3" />
     <rect x="250" y="202" width="92" height="52" rx="16" fill={`url(#${gradientId})`} opacity="0.92" />
     <path d="M272 202 H324 L350 232 V254 H250 V224 C250 212 260 202 272 202Z" fill="#1d4ed8" opacity="0.9" />
     <circle cx="108" cy="264" r="18" fill="#0f172a" opacity="0.86" />
     <circle cx="284" cy="264" r="18" fill="#0f172a" opacity="0.86" />
     <circle cx="108" cy="264" r="7" fill="#e0f2fe" />
     <circle cx="284" cy="264" r="7" fill="#e0f2fe" />
     <rect x="82" y="134" width="52" height="42" rx="10" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
     <rect x="144" y="120" width="58" height="56" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
     <rect x="396" y="190" width="52" height="64" rx="12" fill="#ffffff" stroke="#bfdbfe" strokeWidth="2" />
     <rect x="458" y="152" width="52" height="102" rx="14" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" opacity="0.86" />
     <path d="M92 68 L118 44 L144 68" fill="none" stroke="#bfdbfe" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.72" />
     <path d="M410 82 H492" stroke="#bfdbfe" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
     <path d="M428 58 H476" stroke="#dbeafe" strokeWidth="5" strokeLinecap="round" opacity="0.82" />
    </svg>
   )}

   <div className="relative z-10 flex h-full flex-col justify-between gap-6">
    <div className="flex items-start justify-between gap-4">
     <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em]", config.chip)}>
      <Icon className="h-3.5 w-3.5" />
      {kicker || config.kicker}
     </span>
     <span className={cn("h-11 w-11 rounded-2xl bg-gradient-to-br shadow-lg", config.accent)} />
    </div>

    <div className="mt-auto max-w-[20rem]">
     <p className={cn("font-black tracking-tight text-slate-950", compact ? "text-lg" : "text-2xl")}>
      {title || config.title}
     </p>
     <div className="mt-4 flex flex-wrap gap-2">
      {visibleDetails.map((detail) => (
       <span
        key={detail}
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-slate-600 shadow-sm"
       >
        <CheckCircle2 className="h-3 w-3 text-blue-600" />
        {detail}
       </span>
      ))}
     </div>
    </div>
   </div>
  </div>
 );
}
