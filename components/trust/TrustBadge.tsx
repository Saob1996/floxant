"use client";

import { m } from "framer-motion";
import { Award, ShieldCheck, Star } from "lucide-react";

import { germanText } from "@/lib/german-text";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  type?: "verified" | "expert" | "rating";
  className?: string;
  lang?: string;
}

const badgeConfig = {
  verified: {
    de: "Verifizierter Servicepartner",
    en: "Verified service partner",
    icon: ShieldCheck,
    tone:
      "border-emerald-200 bg-emerald-50/90 text-emerald-800",
    iconTone: "text-emerald-600",
  },
  expert: {
    de: "Eingespieltes Einsatzteam",
    en: "Experienced service team",
    icon: Award,
    tone:
      "border-blue-200 bg-blue-50/90 text-blue-800",
    iconTone: "text-blue-600",
  },
  rating: {
    de: "Dokumentierte Servicequalität",
    en: "Documented service quality",
    icon: Star,
    tone:
      "border-amber-200 bg-amber-50/90 text-amber-900",
    iconTone: "text-amber-500",
  },
} as const;

export function TrustBadge({ type = "verified", className, lang = "de" }: TrustBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;
  const label = lang === "en" ? config.en : config.de;

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] shadow-sm shadow-slate-950/5 backdrop-blur-md",
        config.tone,
        className,
      )}
    >
      <Icon size={13} className={config.iconTone} />
      <span>{germanText(label, label)}</span>
    </m.div>
  );
}
