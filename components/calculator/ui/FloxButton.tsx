import { cn } from "@/lib/utils";
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface PremiumButtonProps {
 children: React.ReactNode;
 onClick?: (e?: React.MouseEvent) => void;
 variant?: "primary" | "secondary" | "glass";
 className?: string;
 rightIcon?: React.ReactNode;
 fullWidth?: boolean;
 disabled?: boolean;
}

const FloxButton: React.FC<PremiumButtonProps> = ({
 children,
 onClick,
 variant = "primary",
 className = "",
 rightIcon,
 fullWidth = false,
 disabled = false,
}) => {
 const prefersReducedMotion = useReducedMotion();

 // Magnetic Effect Logic
 const x = useMotionValue(0);
 const y = useMotionValue(0);

 const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
 const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

 function handleMouseMove(event: React.MouseEvent<HTMLButtonElement>) {
  if (prefersReducedMotion) return;
  const rect = event.currentTarget.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distanceX = event.clientX - centerX;
  const distanceY = event.clientY - centerY;
  
  // Limited magnetic pull (max 10px)
  x.set(distanceX * 0.15);
  y.set(distanceY * 0.15);
 }

 function handleMouseLeave() {
  x.set(0);
  y.set(0);
 }

const variants = {
  primary:
   "bg-[linear-gradient(135deg,#2563eb_0%,#1d4ed8_42%,#06b6d4_100%)] text-white shadow-[0_20px_52px_rgba(37,99,235,0.26)] border border-blue-300/25 hover:shadow-[0_28px_64px_rgba(37,99,235,0.34)]",
  secondary:
   "bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(247,250,255,0.99))] text-slate-950 border border-slate-200 hover:border-blue-200 hover:bg-blue-50 shadow-[0_14px_34px_rgba(15,23,42,0.08)]",
  glass:
   "bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(243,248,255,0.99))] text-slate-900 border border-slate-200 hover:border-blue-200 hover:bg-blue-50 shadow-[0_16px_36px_rgba(15,23,42,0.08)]",
 };

 return (
  <m.button
   style={prefersReducedMotion ? undefined : { x: mouseX, y: mouseY }}
   onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
   onMouseLeave={prefersReducedMotion ? undefined : handleMouseLeave}
   whileHover={disabled || prefersReducedMotion ? {} : { scale: 1.05 }}
   whileTap={disabled || prefersReducedMotion ? {} : { scale: 0.96 }}
   onClick={disabled ? undefined : onClick}
   disabled={disabled}
   className={cn(
    "relative overflow-hidden group inline-flex items-center justify-center gap-2.5 rounded-[1.35rem] px-10 py-5 font-bold uppercase tracking-[0.16em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    variants[variant],
    fullWidth ? "w-full" : "",
    disabled && "opacity-50 pointer-events-none shadow-none",
    className
   )}
  >
   <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-70" />

   {/* Dynamic Cursor-Following Highlight (Glass variant only) */}
   {variant === "glass" && (
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
     <div className="absolute inset-[-50%] bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.1),transparent_50%)]" />
    </div>
   )}

   {/* Modern Shimmer Effect */}
   <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite_ease-in-out]" />
   </div>

   {variant === "primary" && (
    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/20 to-transparent opacity-70" />
   )}

   <span className="relative z-10 flex items-center gap-3">
    {children}
    {rightIcon && (
     <span className="transition-transform duration-500 group-hover:translate-x-1.5 group-hover:-translate-y-1">
      {rightIcon}
     </span>
    )}
   </span>

   {/* Decorative Outer Border Glow on Hover */}
   <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-white/40 opacity-0 shadow-[0_0_30px_rgba(37,99,235,0.16)] transition-opacity duration-500 group-hover:opacity-100" />
  </m.button>
 );
};

export default FloxButton;
