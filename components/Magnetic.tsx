"use client";

import React, { useRef, useState } from "react";
import { m, useSpring, useTransform } from "framer-motion";

interface MagneticProps {
 children: React.ReactElement;
 strength?: number;
}

export default function Magnetic({ children, strength = 0.35 }: MagneticProps) {
 const ref = useRef<HTMLDivElement>(null);
 const [position, setPosition] = useState({ x: 0, y: 0 });

 const handleMouse = (e: React.MouseEvent) => {
  const { clientX, clientY } = e;
  const { height, width, left, top } = ref.current!.getBoundingClientRect();
  const middleX = clientX - (left + width / 2);
  const middleY = clientY - (top + height / 2);
  setPosition({ x: middleX * strength, y: middleY * strength });
 };

 const reset = () => {
  setPosition({ x: 0, y: 0 });
 };

 const { x, y } = position;

 return (
  <m.div
   style={{ position: "relative" }}
   ref={ref}
   onMouseMove={handleMouse}
   onMouseLeave={reset}
   animate={{ x, y }}
   transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
  >
   {children}
  </m.div>
 );
}
