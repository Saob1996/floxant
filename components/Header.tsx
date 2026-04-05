"use client";

import { m } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

import { Logo as BrandLogo } from "@/components/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n-config";

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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        { label: dic.nav.home, href: `/${lang}` },
        { label: dic.nav.services, href: `/${lang}/#services` },
        { label: dic.nav.contact, href: `/${lang}/#contact` },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 start- end- z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-background/80 backdrop-blur-md border-border/50 py-4"
                    : "bg-transparent border-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href={`/${lang}`} className="relative z-50 flex items-center gap-2">
                    <BrandLogo />
                    <span className="font-bold text-xl tracking-tighter" translate="no">
                        FLOXANT
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="hidden lg:flex items-center gap-2 border-s border-border/50 ps-6 ms-2">
                        <a
                            href="https://wa.me/4915771105087"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-500 transition-colors"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                            </span>
                            {dic.common.whatsapp_call}
                        </a>
                    </div>

                    <div className="border-s border-border/50 ps-6 ms-2">
                        <LanguageSwitcher lang={lang} />
                    </div>

                    <Link
                        href={`/${lang}/#contact`}
                        className={cn(
                            "hidden md:inline-flex items-center justify-center rounded-full text-sm font-bold transition-colors",
                            "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                            "h-9 px-6 py-2"
                        )}
                    >
                        {dic.common.cost_calculator_btn}
                    </Link>
                </nav>

                <button
                    type="button"
                    className="md:hidden relative z-50 p-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Open menu"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>

                {isOpen && (
                    <m.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-0 start- end- bg-background border-b border-border/50 p-6 pt-24 md:hidden flex flex-col gap-6 shadow-2xl"
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

                        <div className="py-4 border-t border-border/50">
                            <LanguageSwitcher lang={lang} />
                        </div>

                        <a
                            href="https://wa.me/4915771105087"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col gap-1 p-4 bg-green-50/50 rounded-xl mb-2"
                        >
                            <span className="text-sm font-semibold text-green-600">
                                {dic.common.fast_question}
                            </span>
                            <span className="text-lg font-bold text-green-700">
                                {dic.common.write_whatsapp_now}
                            </span>
                        </a>

                        <Link
                            href={`/${lang}/#contact`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between text-lg font-bold text-primary p-4 bg-primary/5 rounded-xl"
                        >
                            {dic.common.cost_calculator_btn}
                            <ArrowUpRight className="w-5 h-5" />
                        </Link>
                    </m.div>
                )}
            </div>
        </header>
    );
}