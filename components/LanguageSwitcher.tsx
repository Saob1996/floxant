'use client';

import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ lang }: { lang: string }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageChange = (newLocale: string) => {
        // Redirect to the new locale path
        const pathSegments = pathname.split('/');
        pathSegments[1] = newLocale;
        const newPath = pathSegments.join('/');

        router.push(newPath);
        setIsOpen(false);
    };

    const languages = [
        { code: 'de', name: 'Deutsch' },
        { code: 'en', name: 'English' },
        { code: 'ar', name: 'العربية' },
        { code: 'tr', name: 'Türkçe' },
        { code: 'ru', name: 'Русский' },
        { code: 'uk', name: 'Українська' },
        { code: 'pl', name: 'Polski' },
        { code: 'ro', name: 'Română' },
        { code: 'bg', name: 'Български' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'it', name: 'Italiano' },
        { code: 'fa', name: 'فارسی' },
        { code: 'zh', name: '中文' },
        { code: 'vi', name: 'Tiếng Việt' },
        { code: 'ko', name: '한국어' },
        { code: 'ja', name: '日本語' }
    ];

    const currentLang = languages.find(l => l.code === lang) || languages[0];

    return (
        <div className="relative z-50" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300",
                    isOpen
                        ? "bg-primary/10 border-primary/20 text-primary"
                        : "bg-white/5 hover:bg-white/10 border-white/10 text-muted-foreground hover:text-foreground"
                )}
            >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline-block">{currentLang.name}</span>
                <span className="text-sm font-medium sm:hidden uppercase">{lang}</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div
                    className="absolute top-full right-0 mt-2 w-48 max-h-[60vh] overflow-y-auto rounded-xl bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 shadow-2xl p-1.5"
                >
                    <div className="flex flex-col gap-0.5">
                        {languages.map((l) => (
                            <button
                                key={l.code}
                                onClick={() => handleLanguageChange(l.code)}
                                className={cn(
                                    "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all",
                                    lang === l.code
                                        ? "bg-primary/15 text-primary font-medium"
                                        : "hover:bg-white/5 text-muted-foreground hover:text-foreground hover:pl-4"
                                )}
                            >
                                <span>{l.name}</span>
                                {lang === l.code && <Check className="w-3.5 h-3.5" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
