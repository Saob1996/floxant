import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
    className?: string;
    size?: number | { base: number; md: number };
    priority?: boolean;
}

export const Logo = ({
    className,
    size = { base: 52, md: 72 },
    priority = true,
}: BrandLogoProps) => {
    const baseWidth = typeof size === "number" ? size : size.base;
    const mdWidth = typeof size === "number" ? size : size.md;

    return (
        <div
            className={cn(
                "relative flex items-center justify-center transition-opacity duration-300 shrink-0",
                className
            )}
            style={
                {
                    "--logo-w": `${baseWidth}px`,
                    "--logo-h": `${Math.round(baseWidth * 0.34)}px`,
                    "--logo-w-md": `${mdWidth}px`,
                    "--logo-h-md": `${Math.round(mdWidth * 0.34)}px`,
                    opacity: 0.98,
                } as React.CSSProperties
            }
        >
            <div
                className="absolute inset-x-0 top-1/2 -z-10 h-1/2 w-full -translate-y-1/2 rounded-full bg-[hsl(var(--accent))] opacity-[0.08] blur-[18px]"
                aria-hidden="true"
            />

            <div
                className="relative h-[var(--logo-h)] w-[var(--logo-w)] md:h-[var(--logo-h-md)] md:w-[var(--logo-w-md)]"
                style={{
                    filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.22))",
                }}
            >
                <Image
                    src="/logo_v10.png"
                    alt="FLOXANT"
                    fill
                    className="object-contain"
                    priority={priority}
                    sizes={`(min-width: 768px) ${mdWidth}px, ${baseWidth}px`}
                />
            </div>
        </div>
    );
};