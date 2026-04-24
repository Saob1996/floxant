"use client";

import React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { Box, Sparkles, Trash2, Briefcase, Heart, Music } from "lucide-react";

export type ServiceType = "umzug" | "reinigung" | "entsorgung" | "bueroumzug" | "seniorenumzug" | "klaviertransport";

interface ServiceSelectorProps {
  current: ServiceType;
  onSelect: (service: ServiceType) => void;
  dic?: any;
}

export function ServiceSelector({ current, onSelect, dic }: ServiceSelectorProps) {
  const options: { id: ServiceType; label: string; icon: React.ElementType }[] = [
    { id: "umzug", label: dic?.booking?.services?.service_umzug || "Umzug", icon: Box },
    { id: "bueroumzug", label: dic?.booking?.services?.service_bueroumzug || "Büro", icon: Briefcase },
    { id: "seniorenumzug", label: dic?.booking?.services?.service_seniorenumzug || "Senior", icon: Heart },
    { id: "reinigung", label: dic?.nav?.service_reinigung || "Reinigung", icon: Sparkles },
    { id: "entsorgung", label: dic?.nav?.service_entruempelung || "Entrümpelung", icon: Trash2 },
    { id: "klaviertransport", label: dic?.common?.klaviertransport || "Klavier", icon: Music },
  ];

  return (
    <div className="flex w-full justify-center p-4">
      <div className="glass flex gap-2 rounded-full p-2">
        {options.map((option) => {
          const isActive = current === option.id;
          const Icon = option.icon;

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors",
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <m.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
