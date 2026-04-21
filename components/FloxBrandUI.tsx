"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useId, useState, useEffect } from "react";

interface BrandLogoProps {
    className?: string;
    size?: number | { base: number; md: number };
    priority?: boolean;
}

export const FloxBrandUI = ({
    className,
    size = { base: 36, md: 40 },
}: BrandLogoProps) => {
    const baseSize = typeof size === "number" ? size : size.base;
    const [mounted, setMounted] = useState(false);
    
    // Stable IDs for Client-side injection
    const primaryGradientId = useId();
    const silverGradientId = useId();
    const glowFilterId = useId();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Placeholder for SSR - prevents layout shift (CLS)
    // but contains NO complex IDs or attributes that could mismatch.
    if (!mounted) {
        return (
            <div
                className={cn("shrink-0", className)}
                style={{ width: baseSize, height: baseSize }}
            />
        );
    }

    return (
        <div
            className={cn("relative flex items-center justify-center shrink-0 group", className)}
            style={{
                width: baseSize,
                height: baseSize,
            } as React.CSSProperties}
        >
            {/* Ultra-refined background glow */}
            <div 
                className={cn(
                    "absolute inset-0 -z-10 bg-blue-600/20 blur-[30px] rounded-full scale-150 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                )} 
            />
            
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_12px_24px_rgba(37,99,235,0.4)]"
            >
                <defs>
                    <linearGradient id={primaryGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                    <linearGradient id={silverGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#E2E8F0" />
                        <stop offset="100%" stopColor="#94A3B8" />
                    </linearGradient>
                    <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                
                {/* Main Hexagonal Shield Frame */}
                <path
                    d="M50 4 L96 27.5 V72.5 L50 96 L4 72.5 V27.5 L50 4Z"
                    fill="#020617"
                    stroke={`url(#${primaryGradientId})`}
                    strokeWidth="4"
                    strokeLinejoin="round"
                    className="transition-colors duration-500 group-hover:fill-slate-900"
                />

                {/* Inner Bezel Effect */}
                <path
                    d="M50 10 L88 30 V70 L50 90 L12 30 V30 L50 10Z"
                    stroke="white"
                    strokeOpacity="0.05"
                    strokeWidth="1"
                />

                {/* The "F" Monogram */}
                <m.path
                    d="M32 28 H68 M32 50 H58 M32 28 V72"
                    stroke={`url(#${silverGradientId})`}
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={`url(#${glowFilterId})`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "anticipate" }}
                />

                {/* Dynamic Sharp Accent */}
                <m.path
                    d="M75 42 L88 58"
                    stroke="#22D3EE"
                    strokeWidth="6"
                    strokeLinecap="round"
                    animate={{ 
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                    }}
                />

                {/* Light glint animation */}
                <m.rect
                    x="-100%"
                    y="0"
                    width="200%"
                    height="100%"
                    fill={`url(#${silverGradientId})`}
                    className="opacity-10 mix-blend-overlay pointer-events-none"
                    initial={{ x: "-150%" }}
                    animate={{ x: "150%" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                />
            </svg>
        </div>
    );
};
