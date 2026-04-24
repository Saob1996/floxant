"use client";

import { AnimatePresence, m } from "framer-motion";
import {
  ArrowUpRight,
  Calculator,
  ChevronDown,
  Home,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Newspaper,
  Phone,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { QuickBudgetModal } from "./QuickBudgetModal";
import { QuickExpressModal } from "./QuickExpressModal";

import { FloxBrandUI as BrandLogo } from "@/components/FloxBrandUI";
import { cn } from "@/lib/utils";
import { company } from "@/lib/company";

const SERVICE_CATEGORIES = {
  kern: {
    label: "Kern-Services",
    items: [
      { label: "Umzug", href: "/umzug" },
      { label: "Reinigung", href: "/reinigung" },
      { label: "Entrümpelung", href: "/entruempelung" },
      { label: "Einlagerung", href: "/einlagerung" },
    ],
  },
  premium: {
    label: "Signatur-Services",
    items: [
      { label: "Schlüsselübergabe", href: "/schluesseluebergabe" },
      { label: "Reinigungsgarantie", href: "/reinigungsgarantie" },
      { label: "Bürokratie-Schutz", href: "/buerokratie-schutz" },
      { label: "Private Client", href: "/private-client-service" },
      { label: "Möbel-Optimierung", href: "/moebel-optimierung" },
      { label: "24h Umzugsservice", href: "/24h-umzugsservice" },
      { label: "Damen-Team", href: "/damen-team" },
      { label: "Lager-Rotation", href: "/lager-rotation" },
      { label: "Kinder-Umzugsbox", href: "/kinder-umzugsbox" },
    ],
  },
  spezial: {
    label: "Spezialservices",
    items: [
      { label: "Büroumzug", href: "/bueroumzug" },
      { label: "Firmenentsorgung", href: "/firmenentsorgung" },
      { label: "Leer-Rückfahrt", href: "/leerfahrt-rueckfahrt" },
      { label: "Seniorenumzug", href: "/seniorenumzug" },
      { label: "Klaviertransport", href: "/klaviertransport" },
      { label: "Beiladung", href: "/beiladung" },
      { label: "Anfrage mit Preisrahmen", href: "/anfrage-mit-preisrahmen" },
      { label: "Halteverbotszone", href: "/halteverbotszone-regensburg" },
      { label: "Express-Anfrage", href: "/express-anfrage" },
    ],
  },
};

const SERVICE_HIGHLIGHTS = [
  { label: "Umzug", href: "/umzug" },
  { label: "Reinigung", href: "/reinigung" },
  { label: "Entrümpelung", href: "/entruempelung" },
  { label: "Leer-Rückfahrt", href: "/leerfahrt-rueckfahrt" },
];

export function FloxNavigation({ dic }: { dic: any }) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isExpressOpen, setIsExpressOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const whatsappUrl = useMemo(
    () => `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`,
    []
  );

  useEffect(() => {
    setMounted(true);
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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowServices(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const calculatorLabel = dic?.common?.cost_calculator_btn || "Preis berechnen";
  const primaryNavItems = [
    { label: dic?.nav?.home || "Startseite", href: "/", icon: Home, hint: "FLOXANT" },
    { label: "Rechner", href: "/rechner", icon: Calculator, hint: "Preisrahmen" },
    { label: "Bayern", href: "/service-area-bayern", icon: MapPin, hint: "Einsatzgebiet" },
    { label: "Ratgeber", href: "/blog", icon: Newspaper, hint: "Wissen" },
  ];
  const isServiceActive = Object.values(SERVICE_CATEGORIES).some((cat) =>
    cat.items.some((item) => pathname === item.href)
  );

  if (pathname === "/private-client-service" || pathname === "/villenservice") {
    return null;
  }

  return (
    <header
      suppressHydrationWarning
      className={cn(
        "fixed inset-x-3 z-50 mx-auto max-w-[1280px] transition-[top,box-shadow,border-color] duration-500 ease-out sm:inset-x-5",
        "flox-nav-shell rounded-[1.65rem] px-3 py-2.5 sm:px-4 lg:px-5",
        mounted && scrolled ? "top-3 shadow-[0_18px_70px_rgba(0,0,0,0.48)]" : "top-4"
      )}
    >
      <div className="mx-auto w-full">
        <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-3 min-[1180px]:gap-5">
          {/* Brand Mark: Left Column */}
          <Link
            href="/"
            className="group relative z-50 flex min-w-0 items-center gap-3 rounded-2xl pr-1 transition-transform duration-300 active:scale-95"
            onClick={() => {
              setIsOpen(false);
              setShowServices(false);
            }}
            aria-label="FLOXANT Startseite"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.035] shadow-inner shadow-white/[0.03]">
              <BrandLogo size={30} />
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="font-heading text-[15px] font-black leading-none tracking-[0.16em] text-white" translate="no">
                FLOXANT
              </span>
              <span className="mt-1 hidden text-[8px] font-bold uppercase leading-none tracking-[0.28em] text-blue-100/[0.38] sm:block">
                Premium Services
              </span>
            </div>
          </Link>

          {/* Center: Navigation Links: Center Column */}
          <nav className={cn(
            "!hidden items-center justify-center min-[1180px]:!flex transition-opacity duration-500",
            mounted ? "opacity-100" : "opacity-0"
          )}
            aria-label="Hauptnavigation"
          >
            <div className="flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.025] p-1 shadow-inner shadow-white/[0.025]">
              <Link
                href="/"
                onClick={() => setShowServices(false)}
                className={cn("flox-nav-link", pathname === "/" && "flox-nav-link-active")}
              >
                {dic?.nav?.home || "Startseite"}
              </Link>

            {/* Services Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                aria-expanded={showServices}
                aria-label="Leistungsmenü öffnen"
                onClick={() => setShowServices((prev) => !prev)}
                className={cn(
                  "flox-nav-link inline-flex items-center gap-1.5",
                  (showServices || isServiceActive) && "flox-nav-link-active"
                )}
              >
                {dic?.nav?.services || "Leistungen"}
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", showServices && "rotate-180")} />
              </button>

              <AnimatePresence>
                {showServices && (
                  <m.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="flox-nav-panel absolute left-1/2 top-full mt-4 w-[760px] -translate-x-1/2 rounded-[2rem] p-5"
                  >
                    <div className="mb-4 flex items-center justify-between gap-4 rounded-3xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-200/[0.65]">
                          FLOXANT Leistungen
                        </p>
                        <p className="mt-1 text-sm text-white/[0.62]">
                          Schnell zu Umzug, Reinigung, Entrümpelung und Spezialservice.
                        </p>
                      </div>
                      <Sparkles className="h-5 w-5 shrink-0 text-blue-300/[0.65]" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {Object.values(SERVICE_CATEGORIES).map((cat) => (
                        <div
                          key={cat.label}
                          className="rounded-3xl border border-white/[0.055] bg-white/[0.018] p-3"
                        >
                          <span className="mb-2 block px-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-200/[0.65]">{cat.label}</span>
                          <div className="flex flex-col gap-1">
                            {cat.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setShowServices(false)}
                                className="group flex items-center justify-between rounded-2xl px-3 py-2 text-[13px] font-semibold text-white/[0.64] transition-all hover:bg-white/[0.055] hover:text-white"
                              >
                                <span>{item.label}</span>
                                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-70" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setShowServices(false);
                            setIsExpressOpen(true);
                          }}
                          className="group flex items-center justify-center gap-2 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-amber-100 transition-all hover:bg-amber-300/15 hover:text-white"
                        >
                          <Zap className="h-4 w-4 transition-transform group-hover:-rotate-12" />
                          Express-Check
                        </button>
                        <Link
                          href="/rechner"
                          onClick={() => setShowServices(false)}
                          className="group flex items-center justify-center gap-2 rounded-2xl border border-blue-400/20 bg-blue-500/[0.12] px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-blue-100 transition-all hover:bg-blue-500/[0.18] hover:text-white"
                        >
                          {calculatorLabel}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

              {primaryNavItems.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setShowServices(false)}
                  className={cn("flox-nav-link", pathname === item.href && "flox-nav-link-active")}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right: Actions: Right Column */}
          <div className="!hidden items-center justify-end gap-2 min-[1180px]:!flex">
            {/* Quick Contact Cluster */}
            <div className="mr-1 flex items-center gap-1 rounded-full border border-white/[0.065] bg-white/[0.025] p-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full text-white/[0.48] transition-all hover:bg-[#25D366]/10 hover:text-[#25D366]"
                aria-label="WhatsApp"
              >
                <MessageCircle size={15} />
              </a>
              <a
                href={`mailto:${company.email}`}
                className="grid h-9 w-9 place-items-center rounded-full text-white/[0.48] transition-all hover:bg-blue-500/10 hover:text-blue-200"
                aria-label="E-Mail"
              >
                <Mail size={15} />
              </a>
            </div>

            {/* Divider */}
            <div className="hidden h-5 w-px bg-white/[0.06]" />

            {/* Primary CTA Cluster */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Express-Rechner für kurzfristige Anfrage öffnen"
                onClick={() => setIsExpressOpen(true)}
                className="group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-amber-300/[0.22] bg-gradient-to-b from-amber-300/[0.13] to-amber-700/10 px-4 text-[10px] font-black uppercase tracking-[0.16em] text-amber-100 transition-all duration-300 hover:border-amber-200/40 hover:bg-amber-300/[0.16] hover:text-white"
              >
                <Zap className="h-3.5 w-3.5" />
                Express
                <span className="absolute inset-x-3 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-200/[0.65] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
              <button
                type="button"
                aria-label="Preisvorschlag unverbindlich senden"
                onClick={() => setIsBudgetOpen(true)}
                className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-2xl border border-blue-400/[0.28] bg-blue-500/10 px-4 text-[10px] font-black uppercase tracking-[0.16em] text-blue-100 transition-all duration-300 hover:border-blue-300/40 hover:bg-blue-500/[0.18] hover:text-white"
              >
                Preisvorschlag
                <span className="absolute inset-x-3 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-300/[0.65] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
              <Link
                href="/rechner"
                className="group relative inline-flex h-11 items-center justify-center rounded-2xl bg-gradient-to-b from-blue-500 to-blue-600 px-5 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:from-blue-400 hover:to-blue-600 hover:shadow-xl hover:shadow-blue-600/30"
              >
                {calculatorLabel}
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="relative z-50 !inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.045] px-3.5 text-[11px] font-black uppercase tracking-[0.16em] text-white/[0.82] shadow-inner shadow-white/[0.025] transition-all hover:bg-white/[0.07] min-[1180px]:!hidden sm:px-4"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
            <span className="hidden sm:inline">{isOpen ? "Schließen" : "Menü"}</span>
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <m.div
                initial={{ opacity: 0, y: -14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="flox-nav-panel fixed inset-x-3 top-[5.75rem] z-[60] flex max-h-[calc(100dvh-6.5rem)] flex-col gap-3 overflow-y-auto rounded-[2rem] p-4 shadow-2xl min-[1180px]:hidden sm:inset-x-5 sm:p-5"
              >
                <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/[0.06] bg-white/[0.025] p-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-200/[0.65]">
                      Navigation
                    </p>
                    <p className="mt-1 text-sm text-white/[0.62]">
                      Schnell zu Preis, Service und Kontakt.
                    </p>
                  </div>
                  <a
                    href={`tel:${company.phoneRaw}`}
                    onClick={() => setIsOpen(false)}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.035] text-white/[0.72]"
                    aria-label="FLOXANT anrufen"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Link
                    href="/rechner"
                    onClick={() => setIsOpen(false)}
                    className="group flex min-h-[76px] items-center justify-between rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 px-4 py-4 text-white shadow-lg shadow-blue-700/25"
                  >
                    <span>
                      <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-white/[0.62]">
                        Orientierung
                      </span>
                      <span className="mt-1 block text-base font-black">{calculatorLabel}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setIsExpressOpen(true);
                    }}
                    className="group flex min-h-[76px] items-center justify-between rounded-3xl border border-amber-300/[0.22] bg-amber-300/10 px-4 py-4 text-left text-amber-50"
                  >
                    <span>
                      <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-amber-100/[0.65]">
                        Kurz & schnell
                      </span>
                      <span className="mt-1 block text-base font-black">Express-Check</span>
                    </span>
                    <Zap className="h-5 w-5 transition-transform group-hover:-rotate-12" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setIsBudgetOpen(true);
                    }}
                    className="group flex min-h-[76px] items-center justify-between rounded-3xl border border-blue-300/20 bg-blue-400/10 px-4 py-4 text-left text-blue-50"
                  >
                    <span>
                      <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-blue-100/[0.65]">
                        Budget
                      </span>
                      <span className="mt-1 block text-base font-black">Preisvorschlag</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="rounded-3xl border border-white/[0.065] bg-white/[0.026] p-4 text-sm font-black text-white/[0.84] transition-all hover:border-blue-300/20 hover:bg-blue-500/[0.09]"
                >
                  {dic?.nav?.home || "Startseite"}
                </Link>
                <Link
                  href="/service-area-bayern"
                  onClick={() => setIsOpen(false)}
                  className="rounded-3xl border border-white/[0.065] bg-white/[0.026] p-4 text-sm font-black text-white/[0.84] transition-all hover:border-blue-300/20 hover:bg-blue-500/[0.09]"
                >
                  Servicegebiet Bayern
                </Link>
                <Link
                  href="/leerfahrt-rueckfahrt"
                  onClick={() => setIsOpen(false)}
                  className="rounded-3xl border border-white/[0.065] bg-white/[0.026] p-4 text-sm font-black text-white/[0.84] transition-all hover:border-blue-300/20 hover:bg-blue-500/[0.09]"
                >
                  Leer-Rückfahrt
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsOpen(false)}
                  className="rounded-3xl border border-white/[0.065] bg-white/[0.026] p-4 text-sm font-black text-white/[0.84] transition-all hover:border-blue-300/20 hover:bg-blue-500/[0.09]"
                >
                  Ratgeber & Blog
                </Link>

                <div className="rounded-[1.75rem] border border-white/[0.06] bg-white/[0.018] p-3">
                  <div className="mb-2 flex items-center justify-between px-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-200/[0.65]">
                      Häufig gesucht
                    </span>
                    <Sparkles className="h-4 w-4 text-blue-200/55" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVICE_HIGHLIGHTS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between rounded-2xl border border-white/[0.045] bg-white/[0.018] px-3 py-3 text-sm font-bold text-white/[0.72] transition-all hover:border-blue-300/[0.18] hover:bg-white/[0.05] hover:text-white"
                      >
                        {item.label}
                        <ArrowUpRight className="h-3.5 w-3.5 text-white/[0.32]" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Service Categories */}
                {Object.values(SERVICE_CATEGORIES).map((cat) => (
                  <div key={cat.label} className="rounded-[1.75rem] border border-white/[0.055] bg-white/[0.014] p-3">
                    <span className="mb-2 block px-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-200/[0.62]">{cat.label}</span>
                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {cat.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-semibold text-white/[0.62] transition-all hover:bg-white/[0.045] hover:text-white"
                        >
                          <span>{item.label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-white/[0.28]" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}


                <div className="h-px w-full bg-white/[0.06] my-2" />

                {/* Mobile Contact Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-3xl border border-[#25D366]/20 bg-[#25D366]/[0.07] px-4 py-4 text-sm font-black text-white"
                  >
                    <MessageCircle size={18} className="text-[#25D366]" />
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${company.email}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-3xl border border-blue-300/20 bg-blue-400/[0.08] px-4 py-4 text-sm font-black text-white"
                  >
                    <Mail size={18} className="text-blue-200" />
                    E-Mail
                  </a>
                </div>

                {/* Mobile Primary CTA */}
                <div className="hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setIsExpressOpen(true);
                    }}
                    className="flex items-center justify-center gap-3 rounded-2xl border border-orange-300/20 bg-orange-400/10 p-5 text-base font-bold text-orange-100 shadow-lg shadow-orange-900/10"
                  >
                    <Zap className="h-5 w-5" />
                    Express-Check
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setIsBudgetOpen(true);
                    }}
                    className="flex items-center justify-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 text-base font-bold text-blue-400 shadow-lg shadow-blue-600/5"
                  >
                    Preisvorschlag senden
                  </button>
                  <Link
                    href="/rechner"
                    onClick={() => setIsOpen(false)}
                    className="btn-premium flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-blue-500 to-blue-600 p-5 text-base font-bold text-white shadow-lg shadow-blue-600/20"
                  >
                    {calculatorLabel}
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <QuickBudgetModal isOpen={isBudgetOpen} onClose={() => setIsBudgetOpen(false)} />
      <QuickExpressModal isOpen={isExpressOpen} onClose={() => setIsExpressOpen(false)} />
    </header>
  );
}
