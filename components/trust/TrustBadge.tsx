"use client";

import React from "react";
import { ShieldCheck, Award, Star } from "lucide-react";
import { m } from "framer-motion";

interface TrustBadgeProps {
    type?: "verified" | "expert" | "rating";
    className?: string;
    lang?: string;
}

export function TrustBadge({ type = "verified", className, lang = "de" }: TrustBadgeProps) {
    const labels = {
        verified: {
            de: "Verifizierter Logistik-Partner",
            en: "Verified Logistics Partner",
            ru: "Проверенный партнер",
            icon: ShieldCheck,
            color: "text-emerald-400"
        },
        expert: {
            de: "Zertifiziertes Expertenteam",
            en: "Certified Expert Team",
            ru: "Сертифицированные эксперты",
            icon: Award,
            color: "text-blue-400"
        },
        rating: {
            de: "Dokumentierte Servicequalität",
            en: "Documented service quality",
            ru: "Документированное качество сервиса",
            icon: Star,
            color: "text-amber-400"
        }
    };

    const config = labels[type] || labels.verified;
    const Icon = config.icon;
    const label = (config as any)[lang] || (config as any).de;

    return (
        <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${className}`}
        >
            <Icon size={12} className={config.color} />
            <span className="text-white/80">{label}</span>
        </m.div>
    );
}
