import { cn } from "@/lib/utils";
import type { FloxantVisualVariant } from "@/components/FloxantServiceVisual";

type FloxantSymbolLayerProps = {
  variant?: FloxantVisualVariant;
  density?: "soft" | "rich";
  mode?: "section" | "hero";
  className?: string;
};

const accents: Record<FloxantVisualVariant, { primary: string; secondary: string; glow: string }> = {
  moving: { primary: "#2563EB", secondary: "#38BDF8", glow: "rgba(59,130,246,0.10)" },
  cleaning: { primary: "#0F766E", secondary: "#2DD4BF", glow: "rgba(45,212,191,0.08)" },
  clearance: { primary: "#EA580C", secondary: "#FDBA74", glow: "rgba(249,115,22,0.08)" },
  office: { primary: "#4338CA", secondary: "#60A5FA", glow: "rgba(99,102,241,0.08)" },
  backhaul: { primary: "#059669", secondary: "#34D399", glow: "rgba(16,185,129,0.08)" },
  premium: { primary: "#B7791F", secondary: "#F5D06A", glow: "rgba(245,208,106,0.08)" },
};

export function FloxantSymbolLayer({
  variant = "moving",
  density = "soft",
  mode = "section",
  className,
}: FloxantSymbolLayerProps) {
  const palette = accents[variant];
  const hero = mode === "hero";
  const rich = density === "rich";
  const plateOpacity = hero ? 0.78 : 0.5;

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute -left-16 top-10 h-40 w-80 -rotate-6 rounded-[2.2rem] border"
        style={{
          borderColor: palette.primary,
          background: `linear-gradient(135deg, ${palette.glow} 0%, transparent 68%)`,
          opacity: plateOpacity,
        }}
      />
      <div
        className="absolute right-[-4rem] top-16 h-56 w-96 rotate-6 rounded-[2.4rem] border"
        style={{
          borderColor: palette.secondary,
          background: `linear-gradient(225deg, ${palette.glow} 0%, transparent 72%)`,
          opacity: hero ? 0.62 : 0.42,
        }}
      />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 820" fill="none">
        <path
          d="M74 188 H420 L470 238 H816"
          stroke={palette.primary}
          strokeOpacity={hero ? "0.14" : "0.09"}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M730 620 H1042 L1096 566"
          stroke={palette.secondary}
          strokeOpacity={hero ? "0.16" : "0.1"}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M-20 640 C220 596 388 716 650 652 C854 602 1012 470 1200 412"
          stroke={palette.primary}
          strokeOpacity={hero ? "0.12" : "0.08"}
          strokeWidth={hero ? 1.8 : 1.35}
          strokeLinecap="round"
          strokeDasharray={hero ? "14 20" : "10 16"}
        />
        <path
          d="M760 102 C900 88 1042 150 1136 286"
          stroke={palette.secondary}
          strokeOpacity={hero ? "0.12" : "0.08"}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <ellipse
          cx="972"
          cy="176"
          rx={hero ? 156 : 132}
          ry={hero ? 114 : 96}
          stroke={palette.primary}
          strokeOpacity={hero ? "0.05" : "0.035"}
          strokeWidth="1"
        />
        <rect
          x="842"
          y="128"
          width={hero ? 260 : 220}
          height={hero ? 150 : 128}
          rx="28"
          stroke={palette.secondary}
          strokeOpacity={hero ? "0.09" : "0.055"}
          strokeWidth="1"
        />

        {rich ? (
          <>
            <path
              d="M824 228 H1052"
              stroke={palette.secondary}
              strokeOpacity="0.14"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M850 256 H1014"
              stroke={palette.primary}
              strokeOpacity="0.1"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </>
        ) : null}
      </svg>
    </div>
  );
}
