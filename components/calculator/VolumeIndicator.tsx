"use client";

import React from "react";
import { m } from "framer-motion";
import { Truck } from "lucide-react";

interface VolumeIndicatorProps {
    cbm: number;
    maxCbm?: number;
    dic?: any;
}

export function VolumeIndicator({ cbm, maxCbm = 120, dic }: VolumeIndicatorProps) {
    const percentage = Math.min(100, (cbm / maxCbm) * 100);
    const roundedCbm = Math.round(cbm);

    return (
        <div className="flex w-full flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                        {dic?.calculator?.move_volume || "Umzugsvolumen"}
                    </span>
                </div>
                <span className="text-sm font-black text-white">
                    {roundedCbm} m³
                </span>
            </div>

            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/5">
                <m.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="absolute h-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                />
            </div>

            <div className="flex justify-between text-[10px] font-medium text-white/20 uppercase tracking-tight">
                <span>0 m³</span>
                <span>{dic?.calculator?.medium_load || "Mittlere Last"}</span>
                <span>{maxCbm}+ m³</span>
            </div>
        </div>
    );
}
