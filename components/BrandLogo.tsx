import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
    className?: string;
    size?: number | { base: number; md: number };
}

export const Logo = ({ className, size = { base: 44, md: 60 } }: BrandLogoProps) => {
    const baseSize = typeof size === 'number' ? size : size.base;
    const mdSize = typeof size === 'number' ? size : size.md;

    return (
        <div
            className={cn(
                "relative flex items-center justify-center transition-opacity duration-500",
                className
            )}
            style={{
                "--logo-w": `${baseSize}px`,
                "--logo-h": `${baseSize / 3}px`,
                "--logo-w-md": `${mdSize}px`,
                "--logo-h-md": `${mdSize / 3}px`,
                opacity: 0.95,
            } as React.CSSProperties}
        >
            {/* Subtle premium brand glow layer */}
            <div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1/2 w-full bg-[hsl(var(--accent))] opacity-[0.07] blur-[24px] rounded-full -z-10"
                aria-hidden="true"
            />

            <div
                className="relative w-[var(--logo-w)] h-[var(--logo-h)] md:w-[var(--logo-w-md)] md:h-[var(--logo-h-md)]"
                style={{
                    filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.25))"
                }}
            >
                <Image
                    src="/logo_v10.png"
                    alt="FLOXANT"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
};
