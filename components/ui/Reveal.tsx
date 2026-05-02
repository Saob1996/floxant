"use client";

import { ElementType, ReactNode } from "react";
import { m, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

type TextRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  className?: string;
  delay?: number;
  wordDelay?: number;
  once?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className, delay = 0, y = 18, once = true }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.72, ease, delay }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </m.div>
  );
}

export function MaskReveal({ children, className, delay = 0, y = 26, once = true }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <m.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, amount: 0.4, margin: "0px 0px -80px 0px" }}
        transition={{ duration: 0.78, ease, delay }}
        className="will-change-transform"
      >
        {children}
      </m.div>
    </div>
  );
}

export function TextReveal({
  text,
  as = "div",
  className,
  delay = 0,
  wordDelay = 0.045,
  once = true,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = m[as] as ElementType;
  const words = text.split(" ");

  if (prefersReducedMotion) {
    const StaticComponent = as as ElementType;
    return <StaticComponent className={className}>{text}</StaticComponent>;
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.35, margin: "0px 0px -80px 0px" }}
      className={className}
      aria-label={text}
    >
      {words.map((word, index) => (
        <m.span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          variants={{
            hidden: { opacity: 0, y: 22 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: 0.68,
            ease,
            delay: delay + index * wordDelay,
          }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </m.span>
      ))}
    </Component>
  );
}
