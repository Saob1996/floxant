import Image from "next/image";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative h-10 w-auto aspect-[3/1]", className)}>
            <Image
                src="/logo_v10.png"
                alt="FLOXANT"
                fill
                className="object-contain object-left"
                priority
            />
        </div>
    );
};
