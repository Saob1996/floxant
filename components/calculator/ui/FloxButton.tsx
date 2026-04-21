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
    primary: "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white shadow-[0_15px_40px_-10px_rgba(37,99,235,0.6)] border border-white/20",
    secondary: "bg-white/5 backdrop-blur-xl text-white border border-white/10 hover:border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.3)]",
    glass: "bg-white/[0.04] backdrop-blur-3xl text-white border border-white/5 hover:bg-white/[0.08] hover:border-white/20",
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
        "relative overflow-hidden group inline-flex items-center justify-center gap-2.5 px-10 py-5 font-bold uppercase tracking-widest rounded-2xl transition-all duration-300",
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
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite_ease-in-out]" />
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
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl ring-2 ring-white/10 ring-inset shadow-[0_0_30px_rgba(37,99,235,0.2)]" />
    </m.button>
  );
};

export default FloxButton;
