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
      "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] ring-1 ring-white/20 hover:from-blue-500 hover:to-indigo-600 hover:shadow-[0_15px_40px_-5px_rgba(37,99,235,0.6)]",
    secondary:
      "border border-white/10 bg-[#161925] text-white shadow-inner hover:bg-[#1E2235] hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]",
    ghost:
      "bg-transparent text-white/70 hover:bg-white/5 hover:text-white",
    outline:
      "border-2 border-blue-500/30 bg-transparent text-blue-400 hover:border-blue-400 hover:bg-blue-500/10 hover:text-white",
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
        "group inline-flex items-center justify-center gap-3 rounded-xl font-bold tracking-wide transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0C10]",
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
