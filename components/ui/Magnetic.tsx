"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { m, useSpring, useMotionValue, useTransform } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
}

/**
 * Magnetic component that attracts its children towards the mouse cursor.
 * Provides a high-end, premium feel to interactive elements.
 */
export default function Magnetic({ children, strength = 0.4 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // useSpring for smooth, fluid motion
  const x = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    mouseX.set((clientX - centerX) * strength);
    mouseY.set((clientY - centerY) * strength);
  }, [strength, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="relative z-10"
    >
      {children}
    </m.div>
  );
}
