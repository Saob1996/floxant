"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimateOnScrollProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function AnimateOnScroll({
    children,
    className,
    delay = 0,
}: AnimateOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hasTriggeredRef = useRef(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || hasTriggeredRef.current) return;

        let isMounted = true;

        const reveal = () => {
            if (!isMounted || hasTriggeredRef.current) return;
            hasTriggeredRef.current = true;
            setIsVisible(true);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || hasTriggeredRef.current) return;

                if (delay > 0) {
                    timeoutRef.current = setTimeout(reveal, delay);
                } else {
                    reveal();
                }

                observer.disconnect();
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        observer.observe(el);

        return () => {
            isMounted = false;
            observer.disconnect();

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [delay]);

    return (
        <div
            ref={ref}
            className={cn(
                "will-change-transform transition-all duration-700 ease-out",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                className
            )}
        >
            {children}
        </div>
    );
}
