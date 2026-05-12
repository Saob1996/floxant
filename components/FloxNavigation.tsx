"use client";

import { AnimatePresence, m } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Mail,
  Menu,
  MessageCircle,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { RefObject } from "react";
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
        description: "Endreinigung, Grundreinigung und Übergabe realistisch einordnen.",
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
        description: "Beiladung oder Rückfahrt einordnen, wenn Route und Menge passen.",
      },
      {
        label: "Private Client",
        href: "/private-client-service",
        description: "Diskrete Betreuung für sensible Haushalte und hochwertige Räume.",
      },
    ],
  },
  {
    label: "FLOXANT Signature",
    description: "Wenn der Auftrag mehr Orientierung, Backup oder Dokumentation braucht.",
    items: [
      {
        label: "Plan-B-Service",
        href: "/plan-b-service",
        description: "Backup prüfen lassen, wenn Ablauf, Anbieter oder Termin unsicher sind.",
      },
      {
        label: "Übergabeakte",
        href: "/uebergabeakte",
        description: "Leistungen, Fotos, Schlüsselstatus und Hinweise sauber bündeln.",
      },
      {
        label: "Diskreter Auszug",
        href: "/diskreter-umzug-trennung-scheidung",
        description: "Ruhige Anfrage für sensible Auszugs- und Übergabesituationen.",
      },
      {
        label: "Plattform-Auftrag prüfen",
        href: "/plattform-auftrag-pruefen",
        description: "Angebot, Screenshot oder offene Punkte direkt einordnen lassen.",
      },
    ],
  },
];

const CALCULATOR_SHORTCUTS = [
  {
    label: "Umzug berechnen",
    href: "/rechner?service=umzug#rechner-wizard",
    hint: "Volumen, Etagen, Laufwege und Strecke.",
  },
  {
    label: "Reinigung berechnen",
    href: "/rechner?service=reinigung#rechner-wizard",
    hint: "Fläche, Zustand, Objektart und Übergabeziel.",
  },
  {
    label: "Entrümpelung berechnen",
    href: "/rechner?service=entsorgung#rechner-wizard",
    hint: "Menge, Zugang, Entsorgung und Restarbeiten.",
  },
];

const LOCAL_INTENT_LINKS = [
  {
    label: "Umzug Regensburg",
    href: "/umzug-regensburg",
    hint: "Operativer Kern für Umzug, Transport und Übergabe.",
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
    label: "Servicegebiet Bayern",
    href: "/service-area-bayern",
    hint: "Regensburg, Umgebung 200 km und Bayern nach Verfügbarkeit.",
  },
  {
    label: "Einsatzradar",
    href: "/einsatzradar-regensburg",
    hint: "Typische Einsatzarten, Zonen und lokale FLOXANT-Signale.",
  },
  {
    label: "Angebot günstiger prüfen",
    href: "/angebot-guenstiger-pruefen",
    hint: "Vorhandenes Angebot senden und Alternative prüfen lassen.",
  },
  {
    label: "Reinigung Düsseldorf",
    href: "/duesseldorf/reinigung",
    hint: "Düsseldorf nur für Reinigung und Entsorgung.",
  },
  {
    label: "Apartment Düsseldorf",
    href: "/reinigung-moeblierte-wohnung-duesseldorf",
    hint: "Möblierte Wohnungen, Apartments und Kurzzeitvermietung reinigen lassen.",
  },
];

const DESKTOP_LINKS = [
  { label: "Start", href: "/" },
  { label: "Wissen", href: "/blog" },
  { label: "Standorte", href: "/standorte" },
];

const DUESSELDORF_SERVICE_GROUPS = [
  {
    label: "Düsseldorf Reinigung",
    description: "Reinigungswege für Wohnungen, Apartments und kleine Gewerbeflächen.",
    items: [
      {
        label: "Reinigung Düsseldorf",
        href: "/duesseldorf/reinigung",
        description: "Wohnung, Auszug, Einzug und Übergabe sauber anfragen.",
      },
      {
        label: "Wohnungsreinigung",
        href: "/duesseldorf/wohnungsreinigung",
        description: "Wohnungen mit Zustand, Fläche, Termin und Fotos einordnen.",
      },
      {
        label: "Apartment-Reinigung",
        href: "/reinigung-moeblierte-wohnung-duesseldorf",
        description: "Möblierte Wohnungen, Apartments und Gästewechsel.",
      },
      {
        label: "Endreinigung",
        href: "/duesseldorf/endreinigung",
        description: "Reinigung vor Rückgabe, Einzug oder Objektwechsel.",
      },
    ],
  },
  {
    label: "B2B und Objekt",
    description: "Für kleine Unternehmen, Hausverwaltungen und Gewerbeflächen.",
    items: [
      {
        label: "B2B / Büroreinigung",
        href: "/duesseldorf/bueroreinigung",
        description: "Büro, Agentur, Studio, Kanzlei und Gewerbefläche.",
      },
      {
        label: "Grundreinigung",
        href: "/duesseldorf/grundreinigung",
        description: "Wenn normale Reinigung nicht reicht.",
      },
      {
        label: "Treppenhausreinigung",
        href: "/duesseldorf/treppenhausreinigung",
        description: "Treppenhaus, Eingangsbereich und Gemeinschaftsflächen.",
      },
      {
        label: "Entsorgung Düsseldorf",
        href: "/entsorgung-duesseldorf",
        description: "Möbel, Gegenstände und Reste separat anfragen.",
      },
    ],
  },
];

const DUESSELDORF_SHORTCUTS = [
  {
    label: "Reinigung anfragen",
    href: "/duesseldorf/reinigung#kontakt",
    hint: "Objekt, Termin, Fläche und Fotos senden.",
  },
  {
    label: "B2B anfragen",
    href: "/duesseldorf/bueroreinigung#b2b-reinigung-form",
    hint: "Firma, Frequenz, Zeitfenster und Fläche nennen.",
  },
  {
    label: "Apartment senden",
    href: "/reinigung-moeblierte-wohnung-duesseldorf#apartment-reinigung-form",
    hint: "Gästewechsel, Check-in, Check-out und Fotos.",
  },
];

const DUESSELDORF_LOCAL_INTENT_LINKS = [
  {
    label: "B2B-Reinigung Düsseldorf",
    href: "/duesseldorf/bueroreinigung",
    hint: "Kleine Unternehmen, Büros, Agenturen und Studios.",
  },
  {
    label: "Apartment Düsseldorf",
    href: "/reinigung-moeblierte-wohnung-duesseldorf",
    hint: "Möblierte Wohnung, Kurzzeitvermietung und Gästewechsel.",
  },
  {
    label: "Grundreinigung Düsseldorf",
    href: "/duesseldorf/grundreinigung",
    hint: "Stärkerer Zustand oder Objektwechsel.",
  },
  {
    label: "Entsorgung Düsseldorf",
    href: "/entsorgung-duesseldorf",
    hint: "Separat für Möbel, Gegenstände und Restmengen.",
  },
];

const DUESSELDORF_DESKTOP_LINKS = [
  { label: "Reinigung", href: "/duesseldorf/reinigung" },
  { label: "Kontakt", href: "/duesseldorf/reinigung#kontakt" },
];

const MOBILE_LINKS = [
  { label: "Start", href: "/" },
  { label: "Buchung", href: "/buchung" },
  { label: "Rechner", href: "/rechner" },
  { label: "Standorte", href: "/standorte" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Wissen", href: "/blog" },
];

type RouteLink = {
  label: string;
  href: string;
};

type ServiceGroup = (typeof SERVICE_GROUPS)[number];
type ShortcutLink = (typeof CALCULATOR_SHORTCUTS)[number];
export type PublicHeaderVariant = "default" | "duesseldorf";

export function PublicHeader({
  dic = {},
  variant = "default",
}: {
  dic?: any;
  variant?: PublicHeaderVariant;
}) {
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [expressOpen, setExpressOpen] = useState(false);
  const isDuesseldorf = variant === "duesseldorf";

  const whatsappUrl = useMemo(() => `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`, []);
  const serviceGroups = useMemo(
    () => germanizeDeep(isDuesseldorf ? DUESSELDORF_SERVICE_GROUPS : SERVICE_GROUPS),
    [isDuesseldorf],
  ) as typeof SERVICE_GROUPS;
  const calculatorShortcuts = useMemo(
    () => germanizeDeep(isDuesseldorf ? DUESSELDORF_SHORTCUTS : CALCULATOR_SHORTCUTS),
    [isDuesseldorf],
  ) as typeof CALCULATOR_SHORTCUTS;
  const localIntentLinks = useMemo(
    () => germanizeDeep(isDuesseldorf ? DUESSELDORF_LOCAL_INTENT_LINKS : LOCAL_INTENT_LINKS),
    [isDuesseldorf],
  ) as typeof LOCAL_INTENT_LINKS;
  const desktopLinks = useMemo(
    () => germanizeDeep(isDuesseldorf ? DUESSELDORF_DESKTOP_LINKS : DESKTOP_LINKS),
    [isDuesseldorf],
  ) as typeof DESKTOP_LINKS;
  const mobileLinks = useMemo(
    () => germanizeDeep(isDuesseldorf ? DUESSELDORF_DESKTOP_LINKS : MOBILE_LINKS),
    [isDuesseldorf],
  ) as typeof MOBILE_LINKS;

  const servicesActive =
    serviceGroups.some((group) => group.items.some((item) => pathname === item.href.split("#")[0])) ||
    localIntentLinks.some((item) => pathname === item.href);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (pathname === "/private-client-service" || pathname === "/villenservice") {
    return null;
  }

  return (
    <header
      suppressHydrationWarning
      className={cn(
        "fixed inset-x-2 top-2 z-50 mx-auto max-w-[1380px] transition-all duration-300 sm:inset-x-4 sm:top-3",
        "flox-nav-shell rounded-[1.25rem] px-2 py-2 sm:rounded-[1.45rem] sm:px-3 sm:py-2.5",
        scrolled && "shadow-[0_18px_46px_rgba(15,23,42,0.12)]",
      )}
    >
      <div className="relative z-10 flex min-h-11 items-center gap-1.5 sm:min-h-12 sm:gap-2.5">
        <BrandBlock variant={variant} />

        <DesktopNavigation
          dic={dic}
          pathname={pathname}
          desktopLinks={desktopLinks}
          serviceGroups={serviceGroups}
          calculatorShortcuts={calculatorShortcuts}
          localIntentLinks={localIntentLinks}
          servicesOpen={servicesOpen}
          servicesActive={servicesActive}
          dropdownRef={dropdownRef}
          setServicesOpen={setServicesOpen}
        />

        <HeaderCTAs
          variant={variant}
          whatsappUrl={whatsappUrl}
          onExpress={() => setExpressOpen(true)}
          onBudget={() => setBudgetOpen(true)}
        />

        <MobileHeaderActions
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </div>

      <MobileNavDrawer
        open={menuOpen}
        whatsappUrl={whatsappUrl}
        mobileLinks={mobileLinks}
        serviceGroups={serviceGroups}
        calculatorShortcuts={calculatorShortcuts}
        localIntentLinks={localIntentLinks}
        variant={variant}
        onExpress={() => {
          setMenuOpen(false);
          setExpressOpen(true);
        }}
        onBudget={() => {
          setMenuOpen(false);
          setBudgetOpen(true);
        }}
      />

      <QuickBudgetModal isOpen={budgetOpen} onClose={() => setBudgetOpen(false)} />
      <QuickExpressModal isOpen={expressOpen} onClose={() => setExpressOpen(false)} />
    </header>
  );
}

export function FloxNavigation({ dic }: { dic: any }) {
  return <PublicHeader dic={dic} />;
}

function BrandBlock({ variant }: { variant: PublicHeaderVariant }) {
  const isDuesseldorf = variant === "duesseldorf";

  return (
    <Link
      href={isDuesseldorf ? "/duesseldorf/reinigung" : "/"}
      className="group flex min-w-0 max-w-[calc(100%-4.7rem)] flex-1 items-center gap-2 rounded-[1.05rem] px-1 py-1 transition hover:bg-white/70 sm:min-w-[12rem] sm:max-w-none sm:flex-none sm:gap-2.5 sm:px-1.5 xl:shrink-0"
      aria-label={isDuesseldorf ? "FLOXANT Düsseldorf Reinigung" : "FLOXANT Startseite"}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[0.9rem] border border-blue-100/90 bg-white shadow-[0_10px_22px_rgba(15,23,42,0.07)] sm:h-10 sm:w-10 sm:rounded-[0.95rem]">
        <BrandLogo size={26} />
      </span>
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-[0.84rem] font-black leading-none tracking-[0.14em] text-slate-950" translate="no">
          FLOXANT
        </span>
        <span className="mt-1 hidden truncate text-[0.57rem] font-black uppercase tracking-[0.18em] text-slate-400 min-[390px]:block sm:tracking-[0.2em]">
          {isDuesseldorf ? "Düsseldorf · Reinigung" : "Regensburg · Bayern"}
        </span>
        <span className="mt-1 hidden max-w-[10.5rem] truncate text-[0.54rem] font-black uppercase tracking-[0.14em] text-slate-400 min-[1320px]:block">
          {isDuesseldorf ? "Entsorgung separat · keine Umzüge" : "200 km · Bayern nach Verfügbarkeit"}
        </span>
      </span>
    </Link>
  );
}

function DesktopNavigation({
  dic,
  pathname,
  desktopLinks,
  serviceGroups,
  calculatorShortcuts,
  localIntentLinks,
  servicesOpen,
  servicesActive,
  dropdownRef,
  setServicesOpen,
}: {
  dic: any;
  pathname: string;
  desktopLinks: RouteLink[];
  serviceGroups: typeof SERVICE_GROUPS;
  calculatorShortcuts: typeof CALCULATOR_SHORTCUTS;
  localIntentLinks: typeof LOCAL_INTENT_LINKS;
  servicesOpen: boolean;
  servicesActive: boolean;
  dropdownRef: RefObject<HTMLDivElement | null>;
  setServicesOpen: (value: boolean | ((current: boolean) => boolean)) => void;
}) {
  return (
    <nav className="hidden min-w-0 flex-1 items-center justify-center xl:flex" aria-label="Hauptnavigation">
      <div className="flex max-w-full min-w-0 items-center gap-0.5 overflow-visible rounded-[1.05rem] border border-slate-200 bg-white/92 p-1 shadow-sm shadow-slate-950/5">
        <NavLink item={desktopLinks[0]} active={pathname === desktopLinks[0].href} />

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

          <ServicesDropdown
            open={servicesOpen}
            serviceGroups={serviceGroups}
            calculatorShortcuts={calculatorShortcuts}
            localIntentLinks={localIntentLinks}
          />
        </div>

        {desktopLinks.slice(1).map((item) => (
          <NavLink key={item.href} item={item} active={pathname === item.href} />
        ))}
      </div>
    </nav>
  );
}

function NavLink({ item, active }: { item: RouteLink; active: boolean }) {
  return (
    <Link href={item.href} className={cn("flox-nav-link", active && "flox-nav-link-active")}>
      {item.label}
    </Link>
  );
}

function ServicesDropdown({
  open,
  serviceGroups,
  calculatorShortcuts,
  localIntentLinks,
}: {
  open: boolean;
  serviceGroups: typeof SERVICE_GROUPS;
  calculatorShortcuts: typeof CALCULATOR_SHORTCUTS;
  localIntentLinks: typeof LOCAL_INTENT_LINKS;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <m.div
          initial={{ opacity: 0, y: 8, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.985 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flox-nav-panel absolute left-1/2 top-full mt-3 w-[920px] -translate-x-1/2 rounded-[1.45rem] p-4"
        >
          <div className="mb-4 grid gap-3 md:grid-cols-2">
            <HeaderInfoCard
              tone="blue"
              title="Direkt zur passenden Stelle"
              text="Springen Sie direkt zu Leistung, Rechner, Budget oder Anfrage, ohne erst lange zu suchen."
            />
            <HeaderInfoCard
              title="Lokal, wenn es hilft"
              text="Regionale Wege bleiben dort sichtbar, wo Nähe, Termin und Anfahrt für Kunden wirklich zählen."
            />
          </div>

          <ShortcutGrid
            title="Rechner direkt öffnen"
            description="ohne Umweg in den passenden Service"
            items={calculatorShortcuts}
          />

          <div className="mt-4 rounded-[1.15rem] border border-blue-100 bg-blue-50/60 p-3">
            <div className="mb-2 flex items-center justify-between gap-3 px-1">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                Lokale Suchwege
              </div>
              <span className="hidden text-[11px] font-semibold text-blue-900/60 sm:inline">
                Serviceempfehlungen für Regensburg, Bayern und kaufnahe Anfragen
              </span>
            </div>
            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
              {localIntentLinks.map((item) => (
                <MiniLinkCard key={item.href} item={item} tone="blue" />
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {serviceGroups.map((group) => (
              <ServiceGroupCard key={group.label} group={group} />
            ))}
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

function HeaderInfoCard({
  title,
  text,
  tone = "neutral",
}: {
  title: string;
  text: string;
  tone?: "blue" | "neutral";
}) {
  return (
    <div
      className={cn(
        "rounded-[1.1rem] border px-4 py-4",
        tone === "blue" ? "border-blue-100 bg-blue-50/70" : "border-slate-200 bg-white",
      )}
    >
      <div className={cn("text-[10px] font-black uppercase tracking-[0.18em]", tone === "blue" ? "text-blue-700" : "text-slate-500")}>
        {title}
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
    </div>
  );
}

function ShortcutGrid({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: ShortcutLink[];
}) {
  return (
    <div className="rounded-[1.15rem] border border-slate-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between gap-3 px-1">
        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
          {title}
        </div>
        <span className="hidden text-[11px] font-semibold text-slate-400 sm:inline">{description}</span>
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        {items.map((item) => (
          <MiniLinkCard key={item.href} item={item} />
        ))}
      </div>
    </div>
  );
}

function MiniLinkCard({
  item,
  tone = "neutral",
}: {
  item: { label: string; href: string; hint: string };
  tone?: "blue" | "neutral";
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "rounded-[0.95rem] border px-3.5 py-3 text-slate-700 transition-all hover:-translate-y-0.5 hover:text-slate-950",
        tone === "blue"
          ? "border-blue-100 bg-white hover:border-blue-200 hover:bg-blue-50"
          : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-blue-50",
      )}
    >
      <span className="flex items-center justify-between gap-3 text-sm font-black">
        <span>{item.label}</span>
        <ArrowUpRight className="h-3.5 w-3.5 text-blue-700" />
      </span>
      <span className="mt-1.5 block text-xs leading-5 text-slate-500">{item.hint}</span>
    </Link>
  );
}

function ServiceGroupCard({ group }: { group: ServiceGroup }) {
  return (
    <div className="rounded-[1.15rem] border border-slate-200 bg-white p-4">
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
            <span className="mt-1.5 block text-xs leading-5 text-slate-500">{item.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function HeaderCTAs({
  variant,
  whatsappUrl,
  onExpress,
  onBudget,
}: {
  variant: PublicHeaderVariant;
  whatsappUrl: string;
  onExpress: () => void;
  onBudget: () => void;
}) {
  if (variant === "duesseldorf") {
    return (
      <div className="hidden shrink-0 items-center gap-1.5 xl:flex">
        <a
          href={`tel:${company.phoneRaw}`}
          className="inline-flex h-10 items-center justify-center rounded-[0.95rem] border border-slate-200 bg-white px-3.5 text-[10px] font-black uppercase tracking-[0.14em] text-slate-800 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-teal-100"
          data-event="click_duesseldorf_header_phone"
        >
          Anrufen
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-[0.95rem] border border-emerald-200 bg-emerald-50 px-3.5 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-800 shadow-sm shadow-emerald-900/5 transition hover:-translate-y-0.5 hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-100"
          data-event="click_duesseldorf_header_whatsapp"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp
        </a>
        <Link
          href="/duesseldorf/reinigung#kontakt"
          className="inline-flex h-10 items-center justify-center rounded-[0.95rem] bg-gradient-to-r from-teal-600 to-sky-500 px-4 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[0_15px_32px_rgba(20,184,166,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(20,184,166,0.3)] focus:outline-none focus:ring-4 focus:ring-teal-100"
          data-event="start_duesseldorf_cleaning_lead"
        >
          Anfrage starten
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden shrink-0 items-center gap-1.5 xl:flex">
      <button
        type="button"
        onClick={onExpress}
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-[0.95rem] border border-amber-200 bg-amber-50 px-3 text-[10px] font-black uppercase tracking-[0.14em] text-amber-800 shadow-sm shadow-amber-900/5 transition hover:-translate-y-0.5 hover:bg-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-100"
      >
        <Zap className="h-3.5 w-3.5" />
        <span className="min-[1460px]:hidden">Express</span>
        <span className="hidden min-[1460px]:inline">Express-Check</span>
      </button>

      <button
        type="button"
        onClick={onBudget}
        className="inline-flex h-10 items-center justify-center rounded-[0.95rem] border border-slate-200 bg-white px-3.5 text-[10px] font-black uppercase tracking-[0.14em] text-slate-800 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
      >
        <span className="min-[1460px]:hidden">Budget</span>
        <span className="hidden min-[1460px]:inline">Budget nennen</span>
      </button>

      <Link
        href="/buchung"
        className="inline-flex h-10 items-center justify-center rounded-[0.95rem] bg-gradient-to-r from-blue-600 to-sky-500 px-4 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[0_15px_32px_rgba(37,99,235,0.26)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(37,99,235,0.32)] focus:outline-none focus:ring-4 focus:ring-blue-100"
      >
        Direkt anfragen
      </Link>
    </div>
  );
}

function MobileHeaderActions({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (value: boolean | ((current: boolean) => boolean)) => void;
}) {
  return (
    <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 xl:hidden">
      <Link
        href="/buchung"
        className="hidden h-10 items-center justify-center rounded-[0.95rem] bg-blue-600 px-3.5 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(37,99,235,0.22)] sm:inline-flex"
      >
        Anfragen
      </Link>
      <button
        type="button"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-[0.95rem] border border-slate-200 bg-white px-3 text-[11px] font-black uppercase tracking-[0.12em] text-slate-900 shadow-sm shadow-slate-950/5 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100 min-[380px]:px-3.5 min-[380px]:tracking-[0.15em]"
        onClick={() => setMenuOpen((value) => !value)}
        aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={17} /> : <Menu size={17} />}
        <span>{menuOpen ? "Zu" : "Menü"}</span>
      </button>
    </div>
  );
}

function MobileNavDrawer({
  open,
  whatsappUrl,
  mobileLinks,
  serviceGroups,
  calculatorShortcuts,
  localIntentLinks,
  variant,
  onExpress,
  onBudget,
}: {
  open: boolean;
  whatsappUrl: string;
  mobileLinks: RouteLink[];
  serviceGroups: typeof SERVICE_GROUPS;
  calculatorShortcuts: typeof CALCULATOR_SHORTCUTS;
  localIntentLinks: typeof LOCAL_INTENT_LINKS;
  variant: PublicHeaderVariant;
  onExpress: () => void;
  onBudget: () => void;
}) {
  const isDuesseldorf = variant === "duesseldorf";

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          initial={{ opacity: 0, y: -8, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.985 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flox-nav-panel fixed inset-x-3 top-[5.4rem] z-[60] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[1.65rem] p-4 shadow-2xl xl:hidden sm:inset-x-5 sm:p-5"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={isDuesseldorf ? "/duesseldorf/reinigung#kontakt" : "/buchung"}
              className="flex min-h-[86px] flex-col items-start justify-center rounded-[1.35rem] bg-gradient-to-r from-blue-600 to-sky-500 px-5 text-left text-white shadow-[0_18px_38px_rgba(37,99,235,0.24)]"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/72">
                {isDuesseldorf ? "Düsseldorf" : "Schnellster Weg"}
              </span>
              <span className="mt-2 text-xl font-black tracking-tight">
                {isDuesseldorf ? "Reinigung anfragen" : "Direkt anfragen"}
              </span>
            </Link>

            <div className="rounded-[1.35rem] border border-blue-100 bg-blue-50 px-5 py-5 text-sm leading-6 text-slate-700">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                Schnell entscheiden
              </div>
              <p className="mt-2">
                {isDuesseldorf
                  ? "Düsseldorf bleibt klar: Reinigung und Entsorgung, keine Umzüge."
                  : "Erst passenden Weg wählen, dann mit Rechner, Budget oder Anfrage sauber weitergehen."}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {mobileLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.05rem] border border-slate-200 bg-white px-4 py-3.5 text-sm font-black text-slate-900 transition hover:border-blue-200 hover:bg-blue-50"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 rounded-[1.35rem] border border-slate-200 bg-white p-4">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
              {isDuesseldorf ? "Direkte Einstiege" : "Rechner direkt öffnen"}
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {calculatorShortcuts.map((item) => (
                <MiniLinkCard key={item.href} item={item} />
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[1.35rem] border border-blue-100 bg-blue-50/70 p-4">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Lokale Suchwege
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {localIntentLinks.map((item) => (
                <MiniLinkCard key={item.href} item={item} tone="blue" />
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {serviceGroups.map((group) => (
              <ServiceGroupCard key={group.label} group={group} />
            ))}
          </div>

          {!isDuesseldorf ? (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onExpress}
                className="rounded-[1.15rem] border border-amber-200 bg-amber-50 px-4 py-4 text-sm font-black text-amber-900"
              >
                Express-Check
              </button>
              <button
                type="button"
                onClick={onBudget}
                className="rounded-[1.15rem] border border-blue-200 bg-blue-50 px-4 py-4 text-sm font-black text-blue-900"
              >
                Budget nennen
              </button>
            </div>
          ) : null}

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
  );
}
