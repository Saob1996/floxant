import { cn } from "@/lib/utils";

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

  return (
    <span
      className={cn("relative flex shrink-0 items-center justify-center", className)}
      style={{ width: baseSize, height: baseSize }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full drop-shadow-[0_10px_18px_rgba(2,6,23,0.34)]"
      >
        <path
          d="M50 4 L96 27.5 V72.5 L50 96 L4 72.5 V27.5 L50 4Z"
          fill="#07111F"
          stroke="#0EA5E9"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="M50 12 L86 31 V69 L50 88 L14 69 V31 L50 12Z"
          stroke="#BAE6FD"
          strokeOpacity="0.24"
          strokeWidth="2"
        />
        <path
          d="M30 27 H69 M30 49 H58 M30 27 V74"
          stroke="#F8FAFC"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M66 65 L78 77"
          stroke="#D6A638"
          strokeWidth="6.5"
          strokeLinecap="round"
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
    </span>
  );
};
