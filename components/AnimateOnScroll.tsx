"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface AnimateOnScrollProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function AnimateOnScroll({ children, className = "", delay = 0 }: AnimateOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (delay > 0) {
                        setTimeout(() => setIsVisible(true), delay);
                    } else {
                        setIsVisible(true);
                    }
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "50px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-700 ease-out ${isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
        >
            {children}
        </div>
    );
}
