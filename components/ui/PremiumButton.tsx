"use client";

import { m, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface PremiumButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
}

export function PremiumButton({
  children,
  className,
  variant = "primary",
  size = "md",
  disabled,
  ...props
}: PremiumButtonProps) {
  const variantClasses = {
    primary:
      "btn-premium border border-blue-500/10 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-[0_18px_44px_rgba(37,99,235,0.22)] hover:-translate-y-0.5 hover:shadow-[0_24px_56px_rgba(37,99,235,0.28)]",
    secondary:
      "border border-slate-200 bg-white/92 text-slate-900 shadow-sm shadow-slate-950/5 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/70 hover:text-blue-800",
    ghost:
      "border border-transparent bg-transparent text-slate-600 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white/90 hover:text-slate-950",
    outline:
      "border border-blue-200 bg-blue-50/70 text-blue-800 shadow-sm shadow-blue-950/5 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-100/80",
  };

  const sizeClasses = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
    icon: "h-11 w-11 shrink-0 p-0",
  };

  return (
    <m.button
      whileHover={disabled ? undefined : { scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      disabled={disabled}
      className={cn(
        "group inline-flex items-center justify-center gap-3 rounded-2xl font-bold tracking-[0.08em] transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        "disabled:pointer-events-none disabled:opacity-40 disabled:grayscale",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </m.button>
  );
}
