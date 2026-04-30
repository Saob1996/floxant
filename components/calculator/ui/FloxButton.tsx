import { cn } from "@/lib/utils";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";

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
 // Magnetic Effect Logic
 const x = useMotionValue(0);
 const y = useMotionValue(0);

 const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
 const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

 function handleMouseMove(event: React.MouseEvent<HTMLButtonElement>) {
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
   "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-[0_18px_48px_rgba(37,99,235,0.24)] border border-blue-300/20 hover:shadow-[0_24px_58px_rgba(37,99,235,0.32)]",
  secondary:
   "bg-white text-slate-950 border border-slate-200 hover:border-blue-200 hover:bg-blue-50 shadow-[0_14px_34px_rgba(15,23,42,0.08)]",
  glass:
   "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,248,255,0.98))] text-slate-900 border border-slate-200 hover:border-blue-200 hover:bg-blue-50 shadow-[0_14px_34px_rgba(15,23,42,0.07)]",
 };

 return (
  <m.button
   style={{ x: mouseX, y: mouseY }}
   onMouseMove={handleMouseMove}
   onMouseLeave={handleMouseLeave}
   whileHover={disabled ? {} : { scale: 1.05 }}
   whileTap={disabled ? {} : { scale: 0.96 }}
   onClick={disabled ? undefined : onClick}
   disabled={disabled}
   className={cn(
    "relative overflow-hidden group inline-flex items-center justify-center gap-2.5 rounded-2xl px-10 py-5 font-bold uppercase tracking-widest transition-all duration-300",
    variants[variant],
    fullWidth ? "w-full" : "",
    disabled && "opacity-50 pointer-events-none shadow-none",
    className
   )}
  >
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
