"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { AnimatePresence, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { i18n, isValidLocale, type Locale } from "@/i18n-config";

const LANGUAGE_LABELS: Record<Locale, string> = {
    de: "Deutsch",
    en: "English",
    ru: "Русский",
};

const languages = i18n.locales.map((code) => ({
    code,
    name: LANGUAGE_LABELS[code],
})) as ReadonlyArray<{ code: Locale; name: string }>;

export function LanguageSwitcher({ lang }: { lang: Locale }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentPathLocale = useMemo<Locale>(() => {
        const firstSegment = pathname.split("/")[1];

        if (isValidLocale(firstSegment)) {
            return firstSegment;
        }

        if (isValidLocale(lang)) {
            return lang;
        }

        return i18n.defaultLocale;
    }, [pathname, lang]);

    const currentLang =
        languages.find((language) => language.code === currentPathLocale) ?? languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleLanguageChange = (newLocale: Locale) => {
        const segments = pathname.split("/");

        if (segments.length > 1 && isValidLocale(segments[1])) {
            segments[1] = newLocale;
        } else {
            segments.splice(1, 0, newLocale);
        }

        const newPath = segments.join("/") || `/${newLocale}`;
        router.push(newPath);
        setIsOpen(false);
    };

    return (
        <div className="relative z-50" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={cn(
                    "inline-flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-all duration-200",
                    isOpen
                        ? "border-blue-400/25 bg-blue-400/10 text-blue-300"
                        : "border-white/10 bg-[#11131A] text-white/60 hover:border-white/15 hover:text-white"
                )}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label="Sprache wählen"
            >
                <Globe className="h-4 w-4" />
                <span className="hidden max-w-[96px] truncate sm:inline-block">
                    {currentLang.name}
                </span>
                <span className="uppercase sm:hidden">{currentLang.code}</span>
                <ChevronDown
                    className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0, y: -8, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.985 }}
                        transition={{ duration: 0.12, ease: "easeOut" }}
                        className="absolute end-0 top-full mt-2 w-48 overflow-hidden rounded-2xl border border-white/10 bg-[#11131A] p-1.5 shadow-2xl"
                    >
                        <div className="mb-1 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/30">
                            Sprache wählen
                        </div>

                        <div className="flex flex-col gap-0.5">
                            {languages.map((language) => {
                                const isCurrent = currentLang.code === language.code;

                                return (
                                    <button
                                        key={language.code}
                                        type="button"
                                        onClick={() => handleLanguageChange(language.code)}
                                        className={cn(
                                            "flex items-center justify-between rounded-xl px-3 py-2.5 text-start text-sm transition-colors",
                                            isCurrent
                                                ? "bg-blue-400/10 font-medium text-blue-300"
                                                : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                                        )}
                                    >
                                        <span className="truncate">{language.name}</span>
                                        {isCurrent && (
                                            <Check className="h-3.5 w-3.5 shrink-0" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}