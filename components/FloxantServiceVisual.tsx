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

import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { germanText } from "@/lib/german-text";
import { cn } from "@/lib/utils";

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
  contentClassName?: string;
  titleClassName?: string;
  asideClassName?: string;
};

type VisualConfig = {
  icon: LucideIcon;
  kicker: string;
  title: string;
  accent: string;
  chipClassName: string;
  surfaceClassName: string;
  detailIntro: string;
  details: string[];
  flow: string[];
  metaLabel: string;
  metaValue: string;
};

const visualConfig: Record<FloxantVisualVariant, VisualConfig> = {
  moving: {
    icon: Truck,
    kicker: "Umzug",
    title: "Volumen, Strecke und Zugang werden vor dem Termin sauber geordnet.",
    accent: "from-blue-600 via-sky-500 to-cyan-400",
    chipClassName: "bg-blue-600 text-white",
    surfaceClassName:
      "bg-[radial-gradient(circle_at_16%_12%,rgba(37,99,235,0.16),transparent_38%),linear-gradient(180deg,#ffffff,#eef5ff)]",
    detailIntro: "Transport und Ablauf werden als klarer Operations-Flow vorbereitet.",
    details: ["Volumen sichtbar", "Strecke geordnet", "Zugang mitgedacht"],
    flow: ["Aufnahme", "Vorpruefung", "Durchfuehrung", "Uebergabe"],
    metaLabel: "Operations Frame",
    metaValue: "Regensburg · Bayern",
  },
  cleaning: {
    icon: Sparkles,
    kicker: "Reinigung",
    title: "Objektzustand, Turnus und Ansprechpartner wirken wie ein System statt wie eine Liste.",
    accent: "from-teal-600 via-cyan-500 to-sky-400",
    chipClassName: "bg-teal-600 text-white",
    surfaceClassName:
      "bg-[radial-gradient(circle_at_16%_12%,rgba(13,148,136,0.14),transparent_38%),linear-gradient(180deg,#ffffff,#effcfa)]",
    detailIntro: "Saubere Arbeitsumgebung beginnt mit einer ruhigen, dokumentierten Abstimmung.",
    details: ["Objektzustand", "Regelmaessige Reinigung", "Diskret & gruendlich"],
    flow: ["Objekt", "Turnus", "Durchfuehrung", "Betreuung"],
    metaLabel: "Leistungslogik",
    metaValue: "Regensburg · Umgebung",
  },
  clearance: {
    icon: Trash2,
    kicker: "Entruempelung",
    title: "Material, Zugang und Entsorgung werden realistisch eingeordnet, bevor etwas versprochen wird.",
    accent: "from-amber-500 via-orange-500 to-rose-400",
    chipClassName: "bg-amber-500 text-slate-950",
    surfaceClassName:
      "bg-[radial-gradient(circle_at_16%_12%,rgba(249,115,22,0.14),transparent_38%),linear-gradient(180deg,#ffffff,#fff7ee)]",
    detailIntro: "Raeumung und Abtransport folgen einer sichtbaren, plausiblen Logik.",
    details: ["Volumen sichtbar", "Material getrennt", "Abtransport geplant"],
    flow: ["Sichtung", "Sortierung", "Transport", "Besenrein"],
    metaLabel: "Abwicklung",
    metaValue: "Geordnet · fachgerecht",
  },
  office: {
    icon: Briefcase,
    kicker: "Buero & Firma",
    title: "Arbeitsplaetze, IT und Zeitfenster bleiben kontrollierbar, auch wenn der Wechsel komplex wird.",
    accent: "from-indigo-600 via-blue-600 to-cyan-400",
    chipClassName: "bg-indigo-600 text-white",
    surfaceClassName:
      "bg-[radial-gradient(circle_at_16%_12%,rgba(79,70,229,0.16),transparent_38%),linear-gradient(180deg,#ffffff,#eef2ff)]",
    detailIntro: "Betrieb und Team werden in einer operativen Struktur verbunden.",
    details: ["Arbeitsplaetze", "IT & Archiv", "Zeitfenster"],
    flow: ["Inventar", "Route", "Team", "Uebergabe"],
    metaLabel: "Projektmodus",
    metaValue: "Firma · Team",
  },
  backhaul: {
    icon: Package,
    kicker: "Leer-Rueckfahrt",
    title: "Freier Laderaum wird nicht improvisiert, sondern mit Route, Datum und Mitnahmepreis sauber abgestimmt.",
    accent: "from-emerald-500 via-teal-500 to-cyan-400",
    chipClassName: "bg-emerald-500 text-slate-950",
    surfaceClassName:
      "bg-[radial-gradient(circle_at_16%_12%,rgba(16,185,129,0.16),transparent_38%),linear-gradient(180deg,#ffffff,#ecfdf5)]",
    detailIntro: "Mitnahme bleibt flexibel, aber nie unklar.",
    details: ["Route sichtbar", "Datum fixiert", "Volumen offen"],
    flow: ["Route", "Kapazitaet", "Preis", "Mitnahme"],
    metaLabel: "Mitnahme",
    metaValue: "Fair · flexibel",
  },
  premium: {
    icon: Crown,
    kicker: "Private Client",
    title: "Diskretion, Auftreten und Ablauf werden so gefuehrt, wie es hochwertige Projekte verlangen.",
    accent: "from-stone-950 via-stone-800 to-amber-500",
    chipClassName: "bg-stone-950 text-amber-400",
    surfaceClassName:
      "bg-[radial-gradient(circle_at_16%_12%,rgba(217,119,6,0.14),transparent_38%),linear-gradient(180deg,#ffffff,#fff7ed)]",
    detailIntro: "Ein Premium-Fall braucht Ruhe, Verbindlichkeit und kontrollierte Kommunikation.",
    details: ["Diskret geplant", "Anwesen respektiert", "Team gefuehrt"],
    flow: ["Briefing", "Abstimmung", "Durchfuehrung", "Uebergabe"],
    metaLabel: "Servicelevel",
    metaValue: "White Glove",
  },
};

export function FloxantServiceVisual({
  variant = "moving",
  title,
  kicker,
  details,
  compact = false,
  className,
  contentClassName,
  titleClassName,
  asideClassName,
}: FloxantServiceVisualProps) {
  const config = visualConfig[variant];
  const Icon = config.icon;
  const visibleDetails = (details?.length ? details : config.details).slice(0, 3);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-slate-200/90 shadow-[0_24px_58px_rgba(15,23,42,0.08)]",
        config.surfaceClassName,
        compact ? "p-5" : "p-6 md:p-7",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.62),transparent_28%)]" />
      <FloxantSymbolLayer variant={variant} density="soft" className="opacity-28" />

      <div className={cn("relative z-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]", compact && "lg:grid-cols-1")}>
        <div className={cn("flex flex-col justify-between gap-6", contentClassName)}>
          <div>
            <div className="flex items-start justify-between gap-4">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] shadow-sm shadow-slate-950/5",
                  config.chipClassName,
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {germanText(kicker, config.kicker)}
              </span>
              <div className={cn("h-11 w-11 rounded-[1.15rem] bg-gradient-to-br shadow-[0_12px_24px_rgba(15,23,42,0.12)]", config.accent)} />
            </div>

            <p
              className={cn(
                "mt-6 font-black tracking-tight text-slate-950",
                compact ? "text-xl leading-8" : "text-[clamp(2rem,3.2vw,3rem)] leading-[1.02]",
                titleClassName,
              )}
            >
              {germanText(title, config.title)}
            </p>

            <p className="mt-4 max-w-[34rem] text-sm leading-7 text-slate-600">
              {germanText(config.detailIntro, config.detailIntro)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {visibleDetails.map((detail) => (
              <span
                key={detail}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-600 shadow-sm shadow-slate-950/5"
              >
                <CheckCircle2 className="h-3 w-3 text-blue-600" />
                {germanText(detail, detail)}
              </span>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "rounded-[1.7rem] border border-white/75 bg-white/82 p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl",
            asideClassName,
          )}
        >
          <div className="rounded-[1.2rem] border border-slate-200/80 bg-slate-50/80 px-4 py-4">
            <div className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
              {germanText(config.metaLabel, config.metaLabel)}
            </div>
            <div className="mt-1 text-base font-bold text-slate-900">
              {germanText(config.metaValue, config.metaValue)}
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            {config.flow.map((step, index) => (
              <div
                key={`${step}-${index}`}
                className="flex items-center gap-3 rounded-[1rem] border border-slate-200/80 bg-white px-3.5 py-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[11px] font-black text-blue-700">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {germanText(step, step)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
