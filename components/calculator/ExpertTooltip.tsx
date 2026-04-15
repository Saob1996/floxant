"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

interface ExpertTooltipProps {
    content: string;
    children?: React.ReactNode;
}

export function ExpertTooltip({ content, children }: ExpertTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative inline-flex items-center">
            <button
                type="button"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={() => setIsVisible(!isVisible)}
                className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/5 text-white/30 transition-colors hover:bg-white/10 hover:text-white"
            >
                <Info size={12} />
            </button>

            <AnimatePresence>
                {isVisible && (
                    <m.div
                        initial={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(4px)" }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute bottom-full left-1/2 z-[100] mb-3 w-64 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#161923]/95 p-4 shadow-2xl backdrop-blur-xl"
                    >
                        <div className="relative z-10">
                            <p className="text-xs font-medium leading-relaxed text-white/80">
                                {content}
                            </p>
                        </div>
                        {/* Arrow */}
                        <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-[#161923]/95" />
                    </m.div>
                )}
            </AnimatePresence>
            {children}
        </div>
    );
}
