"use client";

import { AnimatePresence, m } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { FloxBrandUI as BrandLogo } from "@/components/FloxBrandUI";
import { company } from "@/lib/company";
import { germanizeDeep } from "@/lib/german-text";
import { cn } from "@/lib/utils";

const QuickBudgetModal = dynamic(
  () => import("@/components/QuickBudgetModal").then((mod) => mod.QuickBudgetModal),
  { ssr: false },
);

const QuickExpressModal = dynamic(
  () => import("@/components/QuickExpressModal").then((mod) => mod.QuickExpressModal),
  { ssr: false },
);

const SERVICE_GROUPS = [
  {
    label: "Kernleistungen",
    description: "Direkt zu den Leistungen, die Kunden am häufigsten brauchen.",
    items: [
      {
        label: "Umzug",
        href: "/umzug#leistungen",
        description: "Transport, Tragen, Laufwege und Übergabe sauber planen.",
      },
      {
        label: "Reinigung",
        href: "/reinigung#leistungen",
        description: "Endreinigung, Grundreinigung und Übergabe realistisch prüfen.",
      },
      {
        label: "Entrümpelung",
        href: "/entruempelung#leistungen",
        description: "Räume frei bekommen, Mengen klären, Entsorgung abstimmen.",
      },
      {
        label: "Büroumzug",
        href: "/bueroumzug#wizard",
        description: "Arbeitsplätze, Inventar und Terminfenster mit weniger Reibung.",
      },
    ],
  },
  {
    label: "Spezialwege",
    description: "Für Fälle, die mehr Abstimmung als eine normale Anfrage brauchen.",
    items: [
      {
        label: "Gewerbereinigung",
        href: "/gewerbereinigung-regensburg",
        description: "Büro, Praxis, Objekt und laufender Betrieb mit klaren Terminen.",
      },
      {
        label: "Firmenentsorgung",
        href: "/firmenentsorgung",
        description: "Inventar, Archiv, Altgeräte und Mengen geordnet abgeben.",
      },
      {
        label: "Leer-Rückfahrt",
        href: "/leerfahrt-rueckfahrt",
        description: "Beiladung oder Rückfahrt prüfen, wenn Route und Menge passen.",
      },
      {
        label: "Private Client",
        href: "/private-client-service",
        description: "Diskrete Betreuung für sensible Haushalte und hochwertige Räume.",
      },
    ],
  },
];

const NAV_SHORTCUTS = [
  { label: "Kosten einschätzen", href: "/rechner#rechner-start" },
  { label: "Budget nennen", href: "/anfrage-mit-preisrahmen" },
  { label: "Direkt anfragen", href: "/buchung" },
];

const CALCULATOR_SHORTCUTS = [
  {
    label: "Umzug berechnen",
    href: "/rechner?service=umzug#rechner-start",
    hint: "Volumen, Etagen, Laufwege und Strecke.",
  },
  {
    label: "Reinigung berechnen",
    href: "/rechner?service=reinigung#rechner-start",
    hint: "Fläche, Zustand, Objektart und Übergabeziel.",
  },
  {
    label: "Entrümpelung berechnen",
    href: "/rechner?service=entsorgung#rechner-start",
    hint: "Menge, Zugang, Entsorgung und Restarbeiten.",
  },
];

const LOCAL_INTENT_LINKS = [
  {
    label: "Umzug Regensburg",
    href: "/umzug-regensburg",
    hint: "Lokaler Umzugsservice mit Anfrageweg.",
  },
  {
    label: "Reinigung Regensburg",
    href: "/reinigung-regensburg",
    hint: "Reinigung, Übergabe und Objektservice.",
  },
  {
    label: "Entrümpelung Regensburg",
    href: "/entruempelung-regensburg",
    hint: "Räumung, Entsorgung und Vorbereitung.",
  },
  {
    label: "Reinigung Düsseldorf",
    href: "/duesseldorf/reinigung",
    hint: "Eigene Reinigungsseite für Düsseldorf.",
  },
];

const DESKTOP_LINKS = [
  { label: "Start", href: "/" },
  { label: "Buchung", href: "/buchung" },
  { label: "Rechner", href: "/rechner" },
  { label: "Standorte", href: "/standorte" },
  { label: "Wissen", href: "/blog" },
];

const MOBILE_LINKS = [
  { label: "Start", href: "/" },
  { label: "Buchung", href: "/buchung" },
  { label: "Rechner", href: "/rechner" },
  { label: "Standorte", href: "/standorte" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Wissen", href: "/blog" },
];

export function FloxNavigation({ dic }: { dic: any }) {
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [expressOpen, setExpressOpen] = useState(false);

  const whatsappUrl = useMemo(() => `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`, []);
  const serviceGroups = useMemo(() => germanizeDeep(SERVICE_GROUPS) as typeof SERVICE_GROUPS, []);
  const calculatorShortcuts = useMemo(
    () => germanizeDeep(CALCULATOR_SHORTCUTS) as typeof CALCULATOR_SHORTCUTS,
    [],
  );
  const localIntentLinks = useMemo(() => germanizeDeep(LOCAL_INTENT_LINKS) as typeof LOCAL_INTENT_LINKS, []);
  const desktopLinks = useMemo(() => germanizeDeep(DESKTOP_LINKS) as typeof DESKTOP_LINKS, []);
  const mobileLinks = useMemo(() => germanizeDeep(MOBILE_LINKS) as typeof MOBILE_LINKS, []);

  const servicesActive =
    serviceGroups.some((group) => group.items.some((item) => pathname === item.href.split("#")[0])) ||
    localIntentLinks.some((item) => pathname === item.href);

  const clearHideTimer = () => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const scheduleAutoHide = () => {
    clearHideTimer();
    hideTimerRef.current = window.setTimeout(() => {
      if (window.scrollY > 72 && !menuOpen && !servicesOpen) {
        setNavVisible(false);
      }
    }, 4600);
  };

  useEffect(() => {
    setMounted(true);
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 18);

      if (currentScrollY <= 24) {
        clearHideTimer();
        setNavVisible(true);
      } else if (currentScrollY < lastScrollY - 6) {
        setNavVisible(true);
        if (!menuOpen && !servicesOpen) {
          scheduleAutoHide();
        }
      } else if (currentScrollY > lastScrollY + 12 && !menuOpen && !servicesOpen) {
        clearHideTimer();
        setNavVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearHideTimer();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen, servicesOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen || servicesOpen) {
      clearHideTimer();
      setNavVisible(true);
    }
  }, [menuOpen, servicesOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  if (pathname === "/private-client-service" || pathname === "/villenservice") {
    return null;
  }

  return (
    <header
      suppressHydrationWarning
      className={cn(
        "fixed inset-x-3 z-50 mx-auto max-w-[1320px] transition-all duration-500 sm:inset-x-5",
        "flox-nav-shell rounded-[1.6rem] px-3 py-2.5 sm:px-4",
        navVisible ? "translate-y-0 opacity-100" : "-translate-y-[145%] opacity-0",
        mounted && scrolled ? "top-3" : "top-4",
      )}
    >
      <div className="relative flex items-center gap-3">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          onClick={() => {
            setMenuOpen(false);
            setServicesOpen(false);
          }}
          aria-label="FLOXANT Startseite"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[1rem] border border-blue-100/80 bg-white shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
            <BrandLogo size={30} />
          </span>
          <span className="min-w-0">
            <span className="block text-[0.92rem] font-black tracking-[0.16em] text-slate-950" translate="no">
              FLOXANT
            </span>
            <span className="mt-0.5 hidden text-[0.54rem] font-black uppercase tracking-[0.14em] text-slate-500 xl:block">
              Klar geplant.
            </span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center min-[1180px]:flex" aria-label="Hauptnavigation">
          <div className="flex items-center gap-0.5 rounded-full border border-slate-200 bg-white/96 p-1.5 shadow-sm shadow-slate-950/5">
            <Link
              href={desktopLinks[0].href}
              className={cn("flox-nav-link", pathname === desktopLinks[0].href && "flox-nav-link-active")}
            >
              {desktopLinks[0].label}
            </Link>

            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                aria-expanded={servicesOpen}
                className={cn(
                  "flox-nav-link inline-flex items-center gap-1.5",
                  (servicesOpen || servicesActive) && "flox-nav-link-active",
                )}
                onClick={() => setServicesOpen((value) => !value)}
              >
                {dic?.nav?.services || "Leistungen"}
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", servicesOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {servicesOpen ? (
                  <m.div
                    initial={{ opacity: 0, y: 8, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.985 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flox-nav-panel absolute left-1/2 top-full mt-3 w-[760px] -translate-x-1/2 rounded-[1.45rem] p-4"
                  >
                    <div className="mb-4 grid gap-3 md:grid-cols-2">
                      <div className="rounded-[1.1rem] border border-blue-100 bg-blue-50/70 px-4 py-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                          Direkt zur passenden Stelle
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          Wählen Sie nicht erst eine lange Seite. Springen Sie direkt zu Leistung,
                          Rechner, Budget oder Anfrage.
                        </p>
                      </div>
                      <div className="rounded-[1.1rem] border border-slate-200 bg-white px-4 py-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                          Lokal, wenn es hilft
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          Regensburg ist dort sichtbar, wo Nähe, Termin und Anfahrt für Kunden
                          wirklich wichtig sind.
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 rounded-[1.15rem] border border-slate-200 bg-white p-3">
                      <div className="mb-2 flex items-center justify-between gap-3 px-1">
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                          Rechner direkt öffnen
                        </div>
                        <span className="hidden text-[11px] font-semibold text-slate-400 sm:inline">
                          ohne Umweg in den passenden Service
                        </span>
                      </div>
                      <div className="grid gap-2 md:grid-cols-3">
                        {calculatorShortcuts.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-[0.95rem] border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-700 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                          >
                            <span className="flex items-center justify-between gap-3 text-sm font-black">
                              <span>{item.label}</span>
                              <ArrowUpRight className="h-3.5 w-3.5 text-blue-700" />
                            </span>
                            <span className="mt-1.5 block text-xs leading-5 text-slate-500">
                              {item.hint}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4 rounded-[1.15rem] border border-blue-100 bg-blue-50/60 p-3">
                      <div className="mb-2 flex items-center justify-between gap-3 px-1">
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                          Lokale Suchwege
                        </div>
                        <span className="hidden text-[11px] font-semibold text-blue-900/60 sm:inline">
                          klare Seiten für Maps, SEO und schnelle Kundenwege
                        </span>
                      </div>
                      <div className="grid gap-2 md:grid-cols-4">
                        {localIntentLinks.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-[0.95rem] border border-blue-100 bg-white px-3.5 py-3 text-slate-700 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                          >
                            <span className="flex items-center justify-between gap-3 text-sm font-black">
                              <span>{item.label}</span>
                              <ArrowUpRight className="h-3.5 w-3.5 text-blue-700" />
                            </span>
                            <span className="mt-1.5 block text-xs leading-5 text-slate-500">
                              {item.hint}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      {serviceGroups.map((group) => (
                        <div key={group.label} className="rounded-[1.15rem] border border-slate-200 bg-white p-4">
                          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                            {group.label}
                          </div>
                          <p className="mt-2 text-xs leading-5 text-slate-500">{group.description}</p>
                          <div className="mt-3 grid gap-2">
                            {group.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="group rounded-[0.95rem] border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                              >
                                <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                                  <span>{item.label}</span>
                                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-700" />
                                </span>
                                <span className="mt-1.5 block text-xs leading-5 text-slate-500">
                                  {item.description}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 grid gap-2 rounded-[1.15rem] border border-blue-100 bg-blue-50/70 p-3 sm:grid-cols-3">
                      {NAV_SHORTCUTS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="inline-flex items-center justify-center rounded-[0.9rem] border border-blue-100 bg-white px-3 py-2.5 text-[11px] font-black uppercase tracking-[0.13em] text-blue-800 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </div>

            {desktopLinks.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn("flox-nav-link", pathname === item.href && "flox-nav-link-active")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden items-center gap-2 min-[1180px]:flex">
          <Link
            href="/kontakt"
            className="inline-flex h-10 items-center gap-2 rounded-[0.95rem] border border-slate-200 bg-white px-3.5 text-[10px] font-black uppercase tracking-[0.14em] text-slate-700 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
          >
            <MapPin className="h-3.5 w-3.5 text-blue-700" />
            Kontakt
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-10 w-10 place-items-center rounded-[0.95rem] border border-slate-200 bg-white text-slate-500 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-0.5 hover:border-[#25D366]/20 hover:text-[#25D366]"
            aria-label="WhatsApp"
          >
            <MessageCircle size={15} />
          </a>

          <a
            href={`mailto:${company.email}`}
            className="grid h-10 w-10 place-items-center rounded-[0.95rem] border border-slate-200 bg-white text-slate-500 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
            aria-label="E-Mail"
          >
            <Mail size={15} />
          </a>

          <button
            type="button"
            onClick={() => setExpressOpen(true)}
            className="flox-button-quiet min-h-10 rounded-[0.95rem] border-amber-200 bg-amber-50 px-3.5 text-[10px] text-amber-800"
          >
            <Zap className="h-3.5 w-3.5" />
            Express-Check
          </button>

          <button
            type="button"
            onClick={() => setBudgetOpen(true)}
            className="flox-button-secondary hidden min-h-10 rounded-[0.95rem] px-3.5 text-[10px] min-[1280px]:inline-flex"
          >
            Budget nennen
          </button>

          <Link href="/buchung" className="flox-button-primary min-h-10 rounded-[0.95rem] px-4 text-[10px]">
            Direkt anfragen
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 text-[11px] font-black uppercase tracking-[0.16em] text-slate-900 shadow-sm shadow-slate-950/5 transition-all hover:bg-slate-50 min-[1180px]:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={17} /> : <Menu size={17} />}
          <span>{menuOpen ? "Schließen" : "Menü"}</span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <m.div
            initial={{ opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flox-nav-panel fixed inset-x-3 top-[5.4rem] z-[60] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[1.65rem] p-4 shadow-2xl min-[1180px]:hidden sm:inset-x-5 sm:p-5"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/buchung"
                className="flox-button-primary flex min-h-[86px] flex-col items-start justify-center rounded-[1.35rem] px-5 text-left normal-case tracking-normal"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/72">
                  Schnellster Weg
                </span>
                <span className="mt-2 text-xl font-black tracking-tight">Direkt anfragen</span>
              </Link>

              <div className="rounded-[1.35rem] border border-blue-100 bg-blue-50 px-5 py-5 text-sm leading-6 text-slate-700">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  Schnell entscheiden
                </div>
                <p className="mt-2">
                  Erst passenden Weg wählen, dann mit Rechner, Budget oder Anfrage sauber weitergehen.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-[1.35rem] border border-slate-200 bg-white p-4">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                Rechner direkt öffnen
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {calculatorShortcuts.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1rem] border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-800 transition-all hover:border-blue-200 hover:bg-blue-50"
                  >
                    <span className="text-sm font-black">{item.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">{item.hint}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-[1.35rem] border border-blue-100 bg-blue-50/70 p-4">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                Lokale Suchwege
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {localIntentLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1rem] border border-blue-100 bg-white px-3.5 py-3 text-slate-800 transition-all hover:border-blue-200 hover:bg-blue-50"
                  >
                    <span className="flex items-center justify-between gap-3 text-sm font-black">
                      <span>{item.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-blue-700" />
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">{item.hint}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              {mobileLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4 text-sm font-black text-slate-900 transition-all hover:border-blue-200 hover:bg-blue-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 grid gap-3">
              {serviceGroups.map((group) => (
                <div key={group.label} className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                    {group.label}
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-[1rem] border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                      >
                        <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                          <span>{item.label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                        </span>
                        <span className="mt-1.5 block text-xs leading-5 text-slate-500">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {NAV_SHORTCUTS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1.05rem] border border-blue-100 bg-blue-50 px-3.5 py-3 text-center text-[11px] font-black uppercase tracking-[0.13em] text-blue-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setExpressOpen(true);
                }}
                className="rounded-[1.15rem] border border-amber-200 bg-amber-50 px-4 py-4 text-sm font-black text-amber-900"
              >
                Express-Check
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setBudgetOpen(true);
                }}
                className="rounded-[1.15rem] border border-blue-200 bg-blue-50 px-4 py-4 text-sm font-black text-blue-900"
              >
                Budget nennen
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-[1.15rem] border border-[#25D366]/20 bg-white px-4 py-4 text-sm font-black text-slate-900"
              >
                <MessageCircle size={18} className="text-[#25D366]" />
                WhatsApp
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center justify-center gap-2 rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4 text-sm font-black text-slate-900"
              >
                <Mail size={18} className="text-blue-700" />
                E-Mail
              </a>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>

      <QuickBudgetModal isOpen={budgetOpen} onClose={() => setBudgetOpen(false)} />
      <QuickExpressModal isOpen={expressOpen} onClose={() => setExpressOpen(false)} />
    </header>
  );
}

