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
      {/* Brand plate glow */}
      <div 
        className={cn(
          "absolute inset-0 -z-10 scale-125 rotate-[-8deg] rounded-[0.8rem] bg-cyan-500/18 blur-[20px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        )} 
      />
      
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full drop-shadow-[0_10px_18px_rgba(2,6,23,0.34)] transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_14px_24px_rgba(14,165,233,0.28)]"
      >
        <defs>
          <linearGradient id={primaryGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D6A638" />
            <stop offset="48%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id={silverGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="56%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Main FLOXANT shield frame */}
        <path
          d="M50 4 L96 27.5 V72.5 L50 96 L4 72.5 V27.5 L50 4Z"
          fill="#07111F"
          stroke={`url(#${primaryGradientId})`}
          strokeWidth="5"
          strokeLinejoin="round"
          className="transition-colors duration-500 group-hover:fill-[#102033]"
        />

        {/* Inner service corridor */}
        <path
          d="M50 12 L86 31 V69 L50 88 L14 69 V31 L50 12Z"
          stroke="#BAE6FD"
          strokeOpacity="0.18"
          strokeWidth="2"
        />

        {/* FLOXANT F monogram */}
        <m.path
          d="M30 27 H69 M30 49 H58 M30 27 V74"
          stroke={`url(#${silverGradientId})`}
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowFilterId})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "anticipate" }}
        />

        {/* Operational route accent */}
        <m.path
          d="M66 65 L78 77"
          stroke="#D6A638"
          strokeWidth="6.5"
          strokeLinecap="round"
          animate={{ 
            opacity: [0.64, 1, 0.64],
            scale: [1, 1.08, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />

        <circle
          cx="78"
          cy="27"
          r="5.4"
          fill="#0EA5E9"
          stroke="white"
          strokeOpacity="0.88"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
