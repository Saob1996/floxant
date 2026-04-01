"use client";

import { m } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo as BrandLogo } from "@/components/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type NavDictionary = {
    home: string;
    services: string;
    pricing: string;
    contact: string;
    login: string;
    book_now: string;
    dashboard: string;
};

interface HeaderProps {
    dic: {
        nav: NavDictionary;
        common: any;
    };
}

export function Header({ dic }: HeaderProps) {
    const pathname = usePathname();
    const lang = pathname.split("/")[1] || "de";

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
        { label: dic?.nav?.home || "Home", href: `/${lang}` },
        { label: dic?.nav?.services || "Services", href: `/${lang}/#services` },
        { label: dic?.nav?.contact || "Contact", href: `/${lang}/#contact` },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-background/80 backdrop-blur-md border-border/50 py-4"
                    : "bg-transparent border-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href={`/${lang}`} className="relative z-50 flex items-center gap-2">
                    <BrandLogo />
                    <span className="font-bold text-xl tracking-tighter">FLOXANT</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="hidden lg:flex items-center gap-2 border-l border-border/50 pl-6 ml-2">
                        <a
                            href="https://wa.me/4915771105087"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-500 transition-colors"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            {dic?.common?.whatsapp_call || "WhatsApp / Call"}
                        </a>
                    </div>

                    <div className="border-l border-border/50 pl-6 ml-2">
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
                        {dic?.common?.cost_calculator_btn || "Cost Calculator"}
                    </Link>
                </nav>

                <button
                    className="md:hidden relative z-50 p-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>

                {isOpen && (
                    <m.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-0 left-0 right-0 bg-background border-b border-border/50 p-6 pt-24 md:hidden flex flex-col gap-6 shadow-2xl"
                    >
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
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
                                {dic?.common?.fast_question || "Fast Question?"}
                            </span>
                            <span className="text-lg font-bold text-green-700">
                                {dic?.common?.write_whatsapp_now || "WhatsApp us now"}
                            </span>
                        </a>

                        <Link
                            href={`/${lang}/#contact`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between text-lg font-bold text-primary p-4 bg-primary/5 rounded-xl"
                        >
                            {dic?.common?.cost_calculator_btn || "Cost Calculator"}
                            <ArrowUpRight className="w-5 h-5" />
                        </Link>
                    </m.div>
                )}
            </div>
        </header>
    );
}