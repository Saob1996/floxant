"use client";

import { m, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

import { FloxBrandUI as BrandLogo } from "@/components/FloxBrandUI";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n-config";
import { company } from "@/lib/company";

type NavDictionary = {
    home: string;
    services: string;
    pricing: string;
    contact: string;
    login: string;
    book_now: string;
    dashboard: string;
};

type CommonDictionary = {
    whatsapp_call?: string;
    cost_calculator_btn?: string;
    fast_question?: string;
    write_whatsapp_now?: string;
};

interface HeaderProps {
    lang: Locale;
    dic: {
        nav: NavDictionary;
        common: CommonDictionary;
    };
}

export function FloxNavigation({ lang, dic }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const whatsappUrl = useMemo(
        () => `https://wa.me/${company.phoneRaw.replace("+", "")}`,
        []
    );

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;

        if (isOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    const menuItems = [
        { label: dic?.nav?.home || "Startseite", href: `/${lang}` },
        { label: dic?.nav?.services || "Leistungen", href: `/${lang}/#services` },
        { label: dic?.nav?.contact || "Kontakt", href: `/${lang}/#contact` },
    ];

    const calculatorLabel =
        dic?.common?.cost_calculator_btn || "Preis berechnen";
    const whatsappCallLabel =
        dic?.common?.whatsapp_call || "WhatsApp direkt";
    const fastQuestionLabel =
        dic?.common?.fast_question || "Kurze Frage?";
    const writeWhatsappLabel =
        dic?.common?.write_whatsapp_now || "Jetzt per WhatsApp schreiben";

    return (
        <header
            suppressHydrationWarning
            className={cn(
                "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
                scrolled
                    ? "border-white/5 bg-[#020617]/80 py-2.5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                    : "border-transparent bg-transparent py-7"
            )}
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="relative flex items-center justify-between md:grid md:grid-cols-[auto_1fr_auto] md:gap-8">
                    <Link
                        href={`/${lang}`}
                        className="group relative z-50 flex items-center gap-3 justify-self-start transition-transform duration-300 active:scale-95"
                        onClick={() => setIsOpen(false)}
                    >
                        <BrandLogo />
                        <span 
                            className="text-xl font-black tracking-[0.25em] transition-all duration-700 group-hover:tracking-[0.3em]" 
                            translate="no"
                            style={{
                                background: "linear-gradient(135deg, #FFFFFF 0%, #60A5FA 50%, #3B82F6 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                filter: "drop-shadow(0 0 10px rgba(59,130,246,0.3))"
                            }}
                        >
                            FLOXANT
                        </span>
                    </Link>

                    <nav className="hidden min-w-0 items-center justify-center gap-10 md:flex">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative whitespace-nowrap text-sm font-bold tracking-wide text-white/70 transition-all duration-300 hover:text-white group/nav"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover/nav:w-full" />
                            </Link>
                        ))}

                        <div className="ms-4 hidden items-center gap-2 border-s border-white/10 ps-8 lg:flex">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 whitespace-nowrap text-sm font-bold text-[#4ADE80] transition-colors hover:text-[#22C55E]"
                            >
                                <span className="relative flex h-3 w-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                                </span>
                                {whatsappCallLabel}
                            </a>
                        </div>
                    </nav>

                    <div className="hidden items-center justify-self-end gap-4 md:flex">
                        <LanguageSwitcher lang={lang} dic={dic} />

                        <Link
                            href={`/${lang}/#contact`}
                            className={cn(
                                "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl px-10 py-3 text-sm font-black uppercase tracking-widest transition-all duration-500",
                                "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] hover:scale-[1.05] active:scale-95"
                            )}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {calculatorLabel}
                                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent" />
                            
                            {/* Premium Shimmer for the call-to-action */}
                            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                        </Link>
                    </div>

                    <button
                        type="button"
                        className="relative z-50 p-2 text-foreground md:hidden"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <m.div
                                initial={{ opacity: 0, y: -18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -18 }}
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                className="absolute inset-x-0 top-0 flex flex-col gap-6 border-b border-white/10 bg-background p-6 pt-24 shadow-2xl md:hidden"
                            >
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-foreground"
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                <div className="border-t border-white/10 py-4">
                                    <LanguageSwitcher lang={lang} dic={dic} />
                                </div>

                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className="mb-2 flex flex-col gap-1 rounded-2xl border border-green-500/15 bg-green-500/10 p-4"
                                >
                                    <span className="text-sm font-semibold text-green-300">
                                        {fastQuestionLabel}
                                    </span>
                                    <span className="text-lg font-bold text-green-200">
                                        {writeWhatsappLabel}
                                    </span>
                                </a>

                                <Link
                                    href={`/${lang}/#contact`}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between rounded-xl bg-white p-4 text-lg font-bold text-zinc-950 shadow-[0_4px_14px_rgba(255,255,255,0.1)] transition-colors hover:bg-zinc-100"
                                >
                                    {calculatorLabel}
                                    <ArrowUpRight className="h-5 w-5" />
                                </Link>
                            </m.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}