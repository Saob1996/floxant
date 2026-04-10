"use client";

import { m, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

import { Logo as BrandLogo } from "@/components/BrandLogo";
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

export function Header({ lang, dic }: HeaderProps) {
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
            className={cn(
                "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
                scrolled
                    ? "border-white/10 bg-background/80 py-4 backdrop-blur-md"
                    : "border-transparent bg-transparent py-6"
            )}
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="relative flex items-center justify-between md:grid md:grid-cols-[auto_1fr_auto] md:gap-8">
                    <Link
                        href={`/${lang}`}
                        className="relative z-50 flex items-center gap-2 justify-self-start"
                        onClick={() => setIsOpen(false)}
                    >
                        <BrandLogo />
                        <span className="text-xl font-bold tracking-tighter" translate="no">
                            FLOXANT
                        </span>
                    </Link>

                    <nav className="hidden min-w-0 items-center justify-center gap-8 md:flex">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="ms-2 hidden items-center gap-2 border-s border-white/10 ps-6 lg:flex">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-green-500 transition-colors hover:text-green-400"
                            >
                                <span className="relative flex h-3 w-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                                </span>
                                {whatsappCallLabel}
                            </a>
                        </div>
                    </nav>

                    <div className="hidden items-center justify-self-end gap-3 md:flex">
                        <LanguageSwitcher lang={lang} />

                        <Link
                            href={`/${lang}/#contact`}
                            className={cn(
                                "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-semibold transition-all",
                                "bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.12)] hover:bg-white/95"
                            )}
                        >
                            {calculatorLabel}
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
                                    <LanguageSwitcher lang={lang} />
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
                                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-lg font-semibold text-white transition-colors hover:bg-white/[0.06]"
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