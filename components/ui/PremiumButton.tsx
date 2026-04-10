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
            "bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.12)] hover:bg-white/95",
        secondary:
            "border border-white/10 bg-[#11131A] text-white hover:bg-white/[0.04] hover:border-white/15",
        ghost:
            "bg-transparent text-white/72 hover:bg-white/[0.04] hover:text-white",
        outline:
            "border border-white/10 bg-transparent text-white hover:border-blue-400/25 hover:bg-white/[0.03]",
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
                "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/30",
                "disabled:pointer-events-none disabled:opacity-45",
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