"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import { AnimatePresence, m } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Briefcase,
  ClipboardCheck,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  Repeat,
  ShieldCheck,
  Sparkles,
  Trash2,
  Truck,
  Zap,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { PlzOperationScanner } from "@/components/operations/PlzOperationScanner";
import { germanizeDeep } from "@/lib/german-text";
import { cn } from "@/lib/utils";
import { ServiceType, useCalculatorStore } from "@/store/calculatorStore";

const LeadClosing = dynamic(() => import("./LeadClosing"));
const IntakeWizard = dynamic(() => import("./IntakeWizard").then((mod) => mod.IntakeWizard));
const BueroumzugForm = dynamic(() => import("./forms/BueroumzugForm"));
const EntsorgungForm = dynamic(() => import("./forms/EntsorgungForm"));
const ReinigungForm = dynamic(() => import("./forms/ReinigungForm"));
const UmzugForm = dynamic(() => import("./forms/UmzugForm"));

const shellClasses =
  "glass-elevated relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(247,250,255,0.99))] shadow-[0_22px_56px_rgba(15,23,42,0.07)]";

const serviceCards = [
  {
    id: "umzug" as ServiceType,
    eyebrow: "Für Zuhause & Firmen",
    title: "Umzug",
    description:
      "Für Wohnungswechsel und Firmenumzüge, bei denen Volumen, Strecke, Zugang und Übergabe nicht erst am Einsatztag auffallen sollen.",
    icon: Truck,
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
    soft: "from-blue-50 via-white to-cyan-50",
    signal: "Solide Vorbereitung",
    operations:
      "Teamgröße, Fahrzeugbedarf, Tragewege und Zugang werden berücksichtigt.",
    steps: ["Start", "Ziel", "Inventar", "Leistungen"],
  },
  {
    id: "reinigung" as ServiceType,
    eyebrow: "Für Objekt & Übergabe",
    title: "Reinigung",
    description:
      "Für Wohnungen, Büros und Übergaben, wenn Fläche, Zustand, Küche, Bad, Fenster und Termin vorher sauber eingeordnet werden sollen.",
    icon: Sparkles,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    soft: "from-emerald-50 via-white to-cyan-50",
    signal: "Klare Leistungsbasis",
    operations:
      "Zustand, Fläche, Übergabeziel und Zusatzleistungen werden bewertet.",
    steps: ["Objekt", "Details"],
  },
  {
    id: "entsorgung" as ServiceType,
    eyebrow: "Für Räumung & Abholung",
    title: "Entrümpelung",
    description:
      "Für Keller, Wohnungen, Reste und größere Mengen, wenn klar werden muss, was weg kann, wie viel es ist und wie die Fläche danach aussehen soll.",
    icon: Trash2,
    gradient: "from-orange-500 via-amber-500 to-rose-500",
    soft: "from-orange-50 via-white to-rose-50",
    signal: "Saubere Aufwandseinordnung",
    operations:
      "Volumen, Zugang, Entsorgung und mögliche Wertanrechnung werden geprüft.",
    steps: ["Material", "Logistik"],
  },
  {
    id: "bueroumzug" as ServiceType,
    eyebrow: "Für Teams & Standorte",
    title: "Büroumzug",
    description:
      "Für Firmen, Praxen und Büros, wenn Arbeitsplätze, Technik, Archiv und Zeitfenster ohne unnötige Betriebsreibung geplant werden müssen.",
    icon: Briefcase,
    gradient: "from-cyan-600 via-blue-600 to-indigo-600",
    soft: "from-cyan-50 via-white to-indigo-50",
    signal: "Operativ für Firmen gedacht",
    operations:
      "Arbeitsplätze, IT, Archiv, Zeitfenster und Betriebsunterbrechung werden eingeordnet.",
    steps: ["Standorte", "Büro", "Extras"],
  },
];

const quickLinks = [
  {
    href: "/express-anfrage",
    eyebrow: "Sofortpfad",
    label: "Express-Check",
    text: "Für eilige Fälle mit wenigen Eingaben und klarem Rückrufweg.",
    icon: Zap,
    tone: "text-amber-700 bg-amber-50 border-amber-200",
  },
  {
    href: "/beiladung",
    eyebrow: "Flexible Mitnahme",
    label: "Beiladung",
    text: "Für Teilmengen, Einzelstücke und flexible Mitnahme ohne Vollumzug.",
    icon: Repeat,
    tone: "text-blue-700 bg-blue-50 border-blue-200",
  },
  {
    href: "/anfrage-mit-preisrahmen",
    eyebrow: "Budget zuerst",
    label: "Preisvorstellung",
    text: "Wenn Ihr Budget von Anfang an mitgedacht werden soll.",
    icon: Banknote,
    tone: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
];

const activeServiceSwitchLinks = [
  { id: "umzug" as ServiceType, label: "Umzug", href: "/rechner?service=umzug#rechner-wizard" },
  { id: "reinigung" as ServiceType, label: "Reinigung", href: "/rechner?service=reinigung#rechner-wizard" },
  { id: "entsorgung" as ServiceType, label: "Entrümpelung", href: "/rechner?service=entsorgung#rechner-wizard" },
  { id: "bueroumzug" as ServiceType, label: "Büroumzug", href: "/rechner?service=bueroumzug#rechner-wizard" },
];

const selectionSignals = [
  "Unverbindlicher Preisrahmen statt vorschneller Zusage",
  "Nur die Angaben, die für Ihren Service wirklich wichtig sind",
  "Danach direkt weiter zu Anfrage, Budgeteinschätzung oder Express-Check",
];

const qualityPromises = [
  "Ruhiger Startpunkt",
  "Realistische Einordnung",
  "Passender nächster Kontaktweg",
];

const comfortSignals = [
  "Regensburg & Bayern klar einordnen",
  "Reinigung, Umzug oder Entrümpelung gezielt starten",
  "WhatsApp, Budget oder Buchung ohne Umweg wählen",
];

const serviceSignals: Partial<Record<ServiceType, { eyebrow: string; title: string; text: string }>> = {
  umzug: {
    eyebrow: "Vorbereitung",
    title: "Umzug gut vorbereitet",
    text: "Volumen, Strecke, Zugang, Etagen, Parkmöglichkeit und Zusatzleistungen bleiben früh sichtbar, damit aus einem groben Vorhaben eine belastbare Anfrage wird.",
  },
  reinigung: {
    eyebrow: "Objektlogik",
    title: "Reinigung mit sauberer Leistungsbasis",
    text: "Fläche, Zustand, Objektart, Küche, Bad, Fenster und Übergabeziel werden geordnet erfasst, damit später weniger Rückfragen entstehen.",
  },
  entsorgung: {
    eyebrow: "Räumung",
    title: "Entsorgung sauber einordnen",
    text: "Volumen, Materialarten, Zugang und Zielzustand der Fläche werden logisch sortiert, statt zu früh eine feste Zahl zu behaupten.",
  },
  bueroumzug: {
    eyebrow: "Firmenfluss",
    title: "Büroumzug mit Betriebsrealität",
    text: "Arbeitsplätze, IT, Archiv und Zeitfenster werden früh strukturiert, damit der nächste Schritt klar und anschlussfähig bleibt.",
  },
};

const serviceValueCards: Partial<Record<ServiceType, Array<{ label: string; text: string }>>> = {
  umzug: [
    {
      label: "Volumen verstehen",
      text: "Möbelmenge, Kartons und Etagen zeigen, ob Fahrzeug, Team und Zeitfenster zusammenpassen.",
    },
    {
      label: "Zugang klären",
      text: "Treppenhaus, Aufzug, Laufweg und Parkmöglichkeit entscheiden oft über den tatsächlichen Aufwand.",
    },
    {
      label: "Übergabe mitdenken",
      text: "Reinigung, Rest-Entrümpelung oder Schlüsselthemen können früh mitgedacht werden.",
    },
  ],
  reinigung: [
    {
      label: "Ziel der Reinigung",
      text: "Übergabe, Grundreinigung, Büro oder laufende Reinigung haben unterschiedliche Anforderungen.",
    },
    {
      label: "Zustand sichtbar machen",
      text: "Fläche, Küche, Bad, Fenster, Möblierung und Fotos helfen, den Aufwand fair einzuordnen.",
    },
    {
      label: "Termin realistisch einordnen",
      text: "Flexible Reinigung, diese Woche oder dringend verändert Planung, Team und Rückmeldung.",
    },
  ],
  entsorgung: [
    {
      label: "Mengen einschätzen",
      text: "Volumen, Materialarten und Sperrgut entscheiden, welche Kapazität und Entsorgung nötig sind.",
    },
    {
      label: "Fläche danach",
      text: "Besenrein, leer, übergabebereit oder nur Abholung: Das Ziel verändert den Aufwand.",
    },
    {
      label: "Zugang planen",
      text: "Keller, Dachboden, Garage, Innenhof oder lange Laufwege sollten früh sichtbar werden.",
    },
  ],
  bueroumzug: [
    {
      label: "Betrieb schützen",
      text: "Arbeitsplätze, Technik und Zeitfenster werden so eingeordnet, dass der Ablauf anschlussfähig bleibt.",
    },
    {
      label: "Standorte sortieren",
      text: "Start, Ziel, Zugang, Aufzug und Parken müssen für beide Standorte realistisch passen.",
    },
    {
      label: "Extras sichtbar machen",
      text: "Archiv, IT, Möbelmontage oder Entsorgung sollten nicht erst im Einsatz auftauchen.",
    },
  ],
};

const serviceOutcomeGuides: Partial<
  Record<
    ServiceType,
    Array<{
      label: string;
      title: string;
      text: string;
      icon: React.ComponentType<{ className?: string }>;
      tone: string;
    }>
  >
> = {
  umzug: [
    {
      label: "Ergebnis",
      title: "Preisrahmen mit Kostentreibern",
      text: "Sie sehen, welche Punkte den Aufwand treiben: Volumen, Strecke, Etagen, Laufwege und Zusatzleistungen.",
      icon: ClipboardCheck,
      tone: "border-blue-100 bg-blue-50 text-blue-800",
    },
    {
      label: "Einordnung",
      title: "Nicht nur Möbelmenge",
      text: "FLOXANT ordnet ein, ob Team, Fahrzeug, Zeitfenster und Zugang realistisch zusammenpassen.",
      icon: ShieldCheck,
      tone: "border-slate-200 bg-white text-slate-800",
    },
    {
      label: "Weiter",
      title: "Anfrage ohne Neu-Erklären",
      text: "Ihre Angaben können direkt in Anfrage, Budgeteinschätzung oder WhatsApp-Kontext übernommen werden.",
      icon: MessageCircle,
      tone: "border-emerald-100 bg-emerald-50 text-emerald-800",
    },
  ],
  reinigung: [
    {
      label: "Ergebnis",
      title: "Reinigungsrahmen mit klaren Angaben",
      text: "Wohnung, Büro, Übergabe, Zustand, Küche, Bad und Fenster werden zu einer ersten Bandbreite verdichtet.",
      icon: ClipboardCheck,
      tone: "border-emerald-100 bg-emerald-50 text-emerald-800",
    },
    {
      label: "Einordnung",
      title: "Sauberkeit mit klarem Ziel",
      text: "Wir unterscheiden, ob es um laufende Pflege, Grundreinigung oder Übergabe mit Detaildruck geht.",
      icon: ShieldCheck,
      tone: "border-slate-200 bg-white text-slate-800",
    },
    {
      label: "Weiter",
      title: "Fotos und Termin helfen sofort",
      text: "Wenn der Rahmen passt, kann die Anfrage mit Fotos, Terminwunsch und Budget schneller geprüft werden.",
      icon: MessageCircle,
      tone: "border-blue-100 bg-blue-50 text-blue-800",
    },
  ],
  entsorgung: [
    {
      label: "Ergebnis",
      title: "Volumen und Zugang sichtbar",
      text: "Menge, Material, Etage, Keller, Garage oder Laufweg werden früh als Aufwandstreiber sichtbar.",
      icon: ClipboardCheck,
      tone: "border-orange-100 bg-orange-50 text-orange-800",
    },
    {
      label: "Einordnung",
      title: "Fläche danach mitdenken",
      text: "Nicht nur Abholung zählt, sondern auch, wie nutzbar oder übergabebereit der Raum danach sein soll.",
      icon: ShieldCheck,
      tone: "border-slate-200 bg-white text-slate-800",
    },
    {
      label: "Weiter",
      title: "Fotos reduzieren Rückfragen",
      text: "Bilder von Menge, Zugang und Material helfen, Kapazität und Entsorgungsweg schneller einzuordnen.",
      icon: MessageCircle,
      tone: "border-amber-100 bg-amber-50 text-amber-900",
    },
  ],
  bueroumzug: [
    {
      label: "Ergebnis",
      title: "Firmenumzug planbarer machen",
      text: "Arbeitsplätze, Technik, Archiv, Zeitfenster und Standortzugang werden als Ablauf statt nur als Strecke betrachtet.",
      icon: ClipboardCheck,
      tone: "border-cyan-100 bg-cyan-50 text-cyan-800",
    },
    {
      label: "Einordnung",
      title: "Betriebsreibung reduzieren",
      text: "FLOXANT achtet darauf, welche Punkte den laufenden Betrieb, Mitarbeitende oder Termine beeinflussen.",
      icon: ShieldCheck,
      tone: "border-slate-200 bg-white text-slate-800",
    },
    {
      label: "Weiter",
      title: "Besser vorbereitet ins Gespräch",
      text: "Nach der Einordnung liegen die wichtigsten Daten für Rückruf, Angebot oder Vor-Ort-Termin bereit.",
      icon: MessageCircle,
      tone: "border-blue-100 bg-blue-50 text-blue-800",
    },
  ],
};

const serviceLocalLinks: Partial<
  Record<
    ServiceType,
    Array<{ label: string; href: string; text: string; tone: string }>
  >
> = {
  umzug: [
    {
      label: "Umzug Regensburg",
      href: "/regensburg/umzug",
      text: "Lokaler Hauptpfad für Wohnungswechsel, Transport und Übergabe im Regensburger Raum.",
      tone: "border-blue-200 bg-blue-50 text-blue-800",
    },
    {
      label: "Umzug Bayern",
      href: "/umzug-bayern",
      text: "Für Einsätze außerhalb Regensburg, wenn Strecke, Termin und Umfang sinnvoll passen.",
      tone: "border-cyan-200 bg-cyan-50 text-cyan-800",
    },
    {
      label: "Umzug mit Reinigung",
      href: "/umzug-mit-reinigung",
      text: "Wenn Transport, Endreinigung und Übergabe zusammen gedacht werden sollen.",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-800",
    },
  ],
  reinigung: [
    {
      label: "Reinigung Regensburg",
      href: "/regensburg/reinigung",
      text: "Für Wohnungsreinigung, Endreinigung und Übergabe im Regensburger Kerngebiet.",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-800",
    },
    {
      label: "Gewerbereinigung",
      href: "/regensburg/gewerbereinigung",
      text: "Eigener Startpunkt für Büros, Praxen, Kanzleien, Treppenhäuser und Objektflächen.",
      tone: "border-blue-200 bg-blue-50 text-blue-800",
    },
    {
      label: "Reinigung Bayern",
      href: "/reinigung-bayern",
      text: "Für passende Reinigungsanfragen in Bayern, wenn Umfang und Termin planbar sind.",
      tone: "border-cyan-200 bg-cyan-50 text-cyan-800",
    },
  ],
  entsorgung: [
    {
      label: "Entrümpelung Regensburg",
      href: "/regensburg/entruempelung",
      text: "Direkter Kontaktweg für Keller, Wohnung, Restmengen und besenreine Vorbereitung.",
      tone: "border-orange-200 bg-orange-50 text-orange-800",
    },
    {
      label: "Wohnungsauflösung",
      href: "/regensburg/wohnungsaufloesung",
      text: "Für komplette Auflösungen, Nachlass, Räumung und Übergabevorbereitung.",
      tone: "border-amber-200 bg-amber-50 text-amber-900",
    },
    {
      label: "Kleinmengen",
      href: "/kleinmengen-entsorgung",
      text: "Wenn nur Einzelstücke, Möbel oder kleine Restmengen abgeholt werden sollen.",
      tone: "border-slate-200 bg-slate-50 text-slate-800",
    },
  ],
  bueroumzug: [
    {
      label: "Büroumzug Regensburg",
      href: "/bueroumzug-regensburg",
      text: "Lokaler Firmenpfad für Arbeitsplätze, Technik, Archiv und Standortwechsel.",
      tone: "border-blue-200 bg-blue-50 text-blue-800",
    },
    {
      label: "Firmenentsorgung",
      href: "/firmenentsorgung",
      text: "Für Büroinventar, Restmengen, Aktenreste und saubere Gewerbeflächen.",
      tone: "border-slate-200 bg-slate-50 text-slate-800",
    },
    {
      label: "Büroumzug Bayern",
      href: "/bueroumzug-bayern",
      text: "Für planbare Firmenumzüge in Bayern mit Standort-, Team- und Zeitfensterlogik.",
      tone: "border-cyan-200 bg-cyan-50 text-cyan-800",
    },
  ],
};

const visualVariantByService: Partial<Record<ServiceType, "moving" | "cleaning" | "clearance" | "office">> = {
  umzug: "moving",
  reinigung: "cleaning",
  entsorgung: "clearance",
  bueroumzug: "office",
};

function normalizeServiceParam(value: string | null): ServiceType | null {
  if (!value) {
    return null;
  }

  const safeService = value.trim().toLowerCase();
  const normalizedService =
    safeService === "entruempelung" || safeService === "entrümpelung"
      ? "entsorgung"
      : safeService === "büroumzug" || safeService === "bueroumzug"
        ? "bueroumzug"
        : safeService;

  return ["umzug", "reinigung", "entsorgung", "bueroumzug"].includes(normalizedService)
    ? (normalizedService as ServiceType)
    : null;
}

function buildWizardUrl(service: ServiceType | null) {
  if (typeof window === "undefined") {
    return `/rechner${service ? `?service=${service}` : ""}#rechner-wizard`;
  }

  const params = new URLSearchParams(window.location.search);
  if (service) {
    params.set("service", service);
  } else {
    params.delete("service");
  }

  const query = params.toString();
  return `${window.location.pathname}${query ? `?${query}` : ""}#rechner-wizard`;
}

const ServiceRechnerHub: React.FC<{ dic?: any }> = ({ dic }) => {
  const router = useRouter();
  const activeService = useCalculatorStore((state) => state.serviceType);
  const setServiceType = useCalculatorStore((state) => state.setServiceType);
  const currentMode = useCalculatorStore((state) => state.mode);
  const setMode = useCalculatorStore((state) => state.setMode);

  const searchParams = useSearchParams();
  const queryService = searchParams.get("service");
  const queryServiceType = useMemo(() => normalizeServiceParam(queryService), [queryService]);

  const replaceWizardUrl = useCallback(
    (service: ServiceType | null) => {
      router.replace(buildWizardUrl(service), { scroll: false });
    },
    [router],
  );

  useEffect(() => {
    if (!queryService) {
      setServiceType(null);
      setMode("selection");
      return;
    }

    if (queryServiceType) {
      setServiceType(queryServiceType);
      setMode("advanced");
      return;
    }

    setServiceType(null);
    setMode("selection");
  }, [queryService, queryServiceType, setMode, setServiceType]);

  useEffect(() => {
    if (!queryServiceType) {
      return;
    }

    const scrollToWizard = () =>
      document.getElementById("rechner-wizard")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    if (window.location.hash === "#rechner-start") {
      replaceWizardUrl(queryServiceType);
      const frame = window.requestAnimationFrame(scrollToWizard);
      return () => window.cancelAnimationFrame(frame);
    }

    if (window.location.hash === "#rechner-wizard" || window.scrollY > 120) {
      return;
    }

    const frame = window.requestAnimationFrame(scrollToWizard);

    return () => window.cancelAnimationFrame(frame);
  }, [queryServiceType, replaceWizardUrl]);

  const umzugData = useCalculatorStore((state) => state.umzugData);
  const hasUmzugInput = useMemo(
    () => (umzugData.fromAddressDetailed?.length || 0) > 5 || umzugData.areaM2 > 0,
    [umzugData],
  );

  const reinigungData = useCalculatorStore((state) => state.reinigungData);
  const hasReinigungInput = useMemo(() => reinigungData.areaM2 > 0, [reinigungData]);

  const entsorgungData = useCalculatorStore((state) => state.entsorgungData);
  const hasEntsorgungInput = useMemo(() => entsorgungData.wasteVolumeM3 > 0, [entsorgungData]);

  const bueroumzugData = useCalculatorStore((state) => state.bueroumzugData);
  const hasBueroumzugInput = useMemo(
    () =>
      (bueroumzugData.workstations || 0) > 1 ||
      (bueroumzugData.archiveMeters || 0) > 0 ||
      (bueroumzugData.walkingDistanceFrom || 0) > 0 ||
      (bueroumzugData.walkingDistanceTo || 0) > 0,
    [bueroumzugData],
  );

  const localizedServiceCards = useMemo(() => germanizeDeep(serviceCards) as typeof serviceCards, []);
  const localizedQuickLinks = useMemo(() => germanizeDeep(quickLinks) as typeof quickLinks, []);
  const localizedSelectionSignals = useMemo(
    () => germanizeDeep(selectionSignals) as typeof selectionSignals,
    [],
  );
  const localizedQualityPromises = useMemo(
    () => germanizeDeep(qualityPromises) as typeof qualityPromises,
    [],
  );
  const localizedComfortSignals = useMemo(
    () => germanizeDeep(comfortSignals) as typeof comfortSignals,
    [],
  );
  const localizedServiceSignals = useMemo(
    () => germanizeDeep(serviceSignals) as typeof serviceSignals,
    [],
  );
  const localizedServiceValueCards = useMemo(
    () => germanizeDeep(serviceValueCards) as typeof serviceValueCards,
    [],
  );

  const activeServiceConfig = localizedServiceCards.find((service) => service.id === activeService);
  const activeServiceSignal = activeService ? localizedServiceSignals[activeService] : null;
  const activeServiceValueCards = activeService ? localizedServiceValueCards[activeService] : null;
  const activeServiceOutcomeGuides = activeService ? serviceOutcomeGuides[activeService] : null;
  const activeServiceLocalLinks = activeService ? serviceLocalLinks[activeService] : null;

  const activateService = (service: ServiceType) => {
    setServiceType(service);
    setMode("advanced");
    replaceWizardUrl(service);
  };

  const resetToSelection = () => {
    setServiceType(null);
    setMode("selection");
    replaceWizardUrl(null);
  };

  const renderActiveForm = (step: number) => {
    switch (activeService) {
      case "umzug":
        return <UmzugForm dic={dic} currentStep={step} />;
      case "reinigung":
        return <ReinigungForm dic={dic} currentStep={step} />;
      case "entsorgung":
        return <EntsorgungForm dic={dic} currentStep={step} />;
      case "bueroumzug":
        return <BueroumzugForm dic={dic} currentStep={step} />;
      default:
        return null;
    }
  };

  if (currentMode === "lead") {
    return (
      <div className={shellClasses}>
        <div className="pointer-events-none absolute inset-0">
          <FloxantSymbolLayer
            variant={(activeService && visualVariantByService[activeService]) || "moving"}
            density="soft"
            className="opacity-38"
          />
        </div>
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
          <LeadClosing dic={dic} onBack={() => setMode("advanced")} />
        </div>
      </div>
    );
  }

  return (
    <div className={shellClasses}>
      <div className="pointer-events-none absolute inset-0">
        <FloxantSymbolLayer
          variant={(activeService && visualVariantByService[activeService]) || "moving"}
          density="soft"
          className={cn(activeService ? "opacity-22" : "opacity-28")}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <AnimatePresence mode="wait">
          {!activeService ? (
            <m.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985 }}
              className="space-y-8"
            >
              <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr] xl:items-stretch">
                <div className="glass-elevated relative overflow-hidden rounded-[1.8rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(239,246,255,0.82)_52%,rgba(236,253,245,0.66))] p-6 md:p-7 xl:p-7">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-200/35 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-20 left-10 h-44 w-44 rounded-full bg-emerald-200/30 blur-3xl" />
                  <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                    <Clock3 className="h-4 w-4" />
                    Sauber starten
                  </div>

                  <h2 className="mt-6 max-w-4xl text-[2.1rem] font-bold leading-[1] tracking-[-0.028em] text-slate-950 md:text-[2.55rem]">
                    Welcher Service passt heute wirklich zu Ihrem Vorhaben?
                  </h2>

                  <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-700">
                    Wählen Sie, was gerade wirklich gebraucht wird. FLOXANT fragt danach nur die Angaben ab,
                    die für eine realistische Einschätzung wichtig sind: Umfang, Ort, Zustand, Zugang,
                    Termin und mögliche Zusatzleistungen.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {localizedComfortSignals.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/80 bg-white/86 px-3 py-2 text-[11px] font-bold text-slate-700 shadow-sm shadow-slate-950/5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/buchung"
                      className="btn-premium inline-flex h-12 items-center justify-center gap-3 rounded-[1.1rem] bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-6 text-[11px] font-black uppercase tracking-[0.16em] text-white"
                    >
                      Direkt anfragen
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/express-anfrage"
                      className="inline-flex h-12 items-center justify-center gap-3 rounded-[1.1rem] border border-amber-200 bg-amber-50 px-6 text-[11px] font-black uppercase tracking-[0.16em] text-amber-900 transition-all hover:bg-amber-100"
                    >
                      <Zap className="h-4 w-4" />
                      Express-Check
                    </Link>
                  </div>

                  <div className="mt-7 grid gap-3 md:grid-cols-3">
                    {localizedQualityPromises.map((item) => (
                      <div
                        key={item}
                        className="rounded-[1rem] border border-slate-200 bg-white/92 px-4 py-3.5 shadow-sm shadow-slate-950/5"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-600" />
                          <p className="text-sm font-medium leading-6 text-slate-700">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="card-premium rounded-[1.8rem] p-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                      Klare Einordnung
                    </div>
                    <h3 className="mt-3 max-w-[15ch] text-[1.6rem] font-bold leading-[1.08] tracking-[-0.022em] text-slate-950">
                      Erst verstehen, dann sinnvoll weiterführen
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      Der Rechner sortiert Ihr Vorhaben zuerst sauber vor. Danach geht es passend weiter in
                      Anfrage, Preisvorstellung oder Express-Check, ohne Umweg und ohne unnötiges Hin und Her.
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {localizedSelectionSignals.map((item, index) => (
                      <div
                        key={item}
                        className="rounded-[1.25rem] border border-slate-200 bg-white/92 px-4 py-4 shadow-sm shadow-slate-950/5"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[11px] font-black text-blue-700">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className="text-sm font-medium leading-7 text-slate-700">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {localizedServiceCards.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <m.article
                      key={service.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`${service.title} Rechner starten`}
                      onClick={() => activateService(service.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          activateService(service.id);
                        }
                      }}
                      className={cn(
                        "card-premium service-card-hover group relative cursor-pointer overflow-hidden rounded-[1.35rem] p-5 outline-none transition focus-visible:ring-4 focus-visible:ring-blue-100",
                        "bg-gradient-to-br",
                        service.soft,
                      )}
                      data-event="service_card_click"
                      data-service={service.id === "entsorgung" ? "entruempelung" : service.id}
                      data-source="rechner_service_selection"
                    >
                      <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/80 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 group-focus:opacity-100" />
                      <span className="pointer-events-none absolute inset-0 rounded-[1.35rem] ring-1 ring-inset ring-blue-300/0 transition duration-300 group-hover:ring-blue-300/55 group-focus:ring-blue-300/55" />
                      <div className="relative z-10">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                              {service.eyebrow}
                            </div>
                            <h3 className="mt-3 text-[1.28rem] font-bold tracking-tight text-slate-950">
                              {service.title}
                            </h3>
                          </div>
                          <div
                            className={cn(
                              "flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-gradient-to-br text-white shadow-[0_14px_28px_rgba(15,23,42,0.08)]",
                              service.gradient,
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>

                        <div className="mt-3 inline-flex rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                          {service.signal}
                        </div>

                        <p className="mt-4 text-[14px] leading-6 text-slate-600">
                          {service.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {service.steps.map((step) => (
                            <span
                              key={step}
                              className="rounded-full border border-slate-200 bg-white/92 px-2.5 py-1 text-[10px] font-bold text-slate-700 shadow-sm shadow-slate-950/5"
                            >
                              {step}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 max-h-0 overflow-hidden rounded-[1rem] border border-white/80 bg-white/76 px-3 py-0 text-xs font-semibold leading-5 text-slate-600 opacity-0 transition-all duration-300 group-hover:max-h-28 group-hover:py-3 group-hover:opacity-100 group-focus:max-h-28 group-focus:py-3 group-focus:opacity-100">
                          <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                            Worauf wir achten
                          </span>
                          {service.operations}
                        </div>

                        <div
                          aria-hidden="true"
                          className="mt-5 inline-flex h-10 w-full items-center justify-between rounded-[1rem] border border-slate-200 bg-white/94 px-4 text-[11px] font-black uppercase tracking-[0.16em] text-slate-900 shadow-sm shadow-slate-950/5 transition-all hover:border-blue-200 hover:bg-white"
                        >
                          <span>Rechner starten</span>
                          <ArrowRight className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </m.article>
                  );
                })}
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                <div className="glass-elevated rounded-[1.4rem] p-5 xl:col-span-3">
                  <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                    <ShieldCheck className="h-4 w-4" />
                    Ehrlicher Preisrahmen
                  </div>
                  <h3 className="mt-4 max-w-2xl text-[1.35rem] font-bold leading-[1.12] tracking-[-0.018em] text-slate-950">
                    Erst realistisch einordnen. Dann sauber weiterführen.
                  </h3>
                  <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-700">
                    FLOXANT zeigt zuerst, welche Faktoren die Einordnung wirklich beeinflussen:
                    Aufwand, Strecke, Zugänglichkeit, Zusatzleistungen und Termin. So wird aus einer
                    losen Preisfrage eine brauchbare Anfragegrundlage.
                  </p>

                  <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Danach direkt weiter in den passenden Weg
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {["Klare Kostentreiber", "Geführte nächste Angaben", "Saubere Übergabe in die Anfrage"].map(
                      (item) => (
                        <div
                          key={item}
                          className="rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-[11px] font-semibold text-slate-700 shadow-sm shadow-slate-950/5"
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {localizedQuickLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="card-premium group rounded-[1.35rem] p-5"
                      data-event="service_card_click"
                      data-source={item.href.includes("preisrahmen") ? "budget_request_quick_link" : "booking_quick_link"}
                      data-origin="rechner_quick_link"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div
                          className={cn(
                            "inline-flex h-10 w-10 items-center justify-center rounded-[0.95rem] border shadow-sm shadow-slate-950/5",
                            item.tone,
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-600" />
                      </div>
                      <div className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                        {item.eyebrow}
                      </div>
                      <div className="mt-2 text-[1.02rem] font-bold tracking-tight text-slate-950">
                        {item.label}
                      </div>
                      <p className="mt-2 text-[14px] leading-6 text-slate-600">{item.text}</p>
                    </Link>
                  );
                })}
              </div>
            </m.div>
          ) : (
            <m.div
              key="wizard"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985 }}
              className="space-y-5"
            >
              {activeServiceSignal ? (
                <div className="glass-elevated overflow-hidden rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94)_50%,rgba(239,246,255,0.72))] px-5 py-5">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                        {activeServiceSignal.eyebrow}
                      </div>
                      <h3 className="mt-3 max-w-[18ch] text-[1.45rem] font-bold leading-[1.06] tracking-[-0.02em] text-slate-950">
                        {activeServiceSignal.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href="/buchung"
                        className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-[11px] font-semibold text-blue-700 transition hover:bg-blue-100"
                        data-event="hero_cta_click"
                        data-source="rechner_active_service"
                      >
                        Direkt anfragen
                      </Link>
                      <Link
                        href="/express-anfrage"
                        className="rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] font-semibold text-amber-900 transition hover:bg-amber-100"
                        data-event="hero_cta_click"
                        data-source="rechner_active_service"
                      >
                        Express-Check
                      </Link>
                      <Link
                        href="/anfrage-mit-preisrahmen"
                        className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-800 transition hover:bg-emerald-100"
                        data-event="form_submit"
                        data-source="rechner_active_service"
                      >
                        Budget nennen
                      </Link>
                    </div>
                  </div>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
                    {activeServiceSignal.text}
                  </p>
                  <PlzOperationScanner serviceLabel={activeServiceConfig?.title || "Service"} className="mt-5" />
                  <details className="group mt-5 rounded-[1.2rem] border border-slate-200 bg-white/80 p-3 shadow-sm shadow-slate-950/5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[11px] font-black uppercase tracking-[0.14em] text-slate-700 outline-none transition hover:text-blue-700 focus-visible:ring-4 focus-visible:ring-blue-100">
                        <span>Einordnung und lokale Wege anzeigen</span>
                      <ArrowRight className="h-4 w-4 transition group-open:rotate-90" />
                    </summary>
                    <div className="mt-4">
                  {activeServiceOutcomeGuides?.length ? (
                    <div className="mt-5 grid gap-3 lg:grid-cols-3">
                      {activeServiceOutcomeGuides.map((item, index) => {
                        const Icon = item.icon;

                        return (
                          <m.div
                            key={item.title}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
                            className={`rounded-[1.2rem] border p-4 shadow-sm shadow-slate-950/5 ${item.tone}`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/78 shadow-sm shadow-slate-950/5">
                                <Icon className="h-4 w-4" />
                              </span>
                              <div>
                                <div className="text-[10px] font-black uppercase tracking-[0.16em] opacity-70">
                                  {item.label}
                                </div>
                                <p className="mt-1 text-sm font-black text-slate-950">{item.title}</p>
                                <p className="mt-2 text-xs leading-5 text-slate-600">{item.text}</p>
                              </div>
                            </div>
                          </m.div>
                        );
                      })}
                    </div>
                  ) : null}
                  {activeServiceValueCards?.length ? (
                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                      {activeServiceValueCards.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[1.15rem] border border-white/80 bg-white/86 p-4 shadow-sm shadow-slate-950/5"
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                              <CheckCircle2 className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="text-sm font-black text-slate-950">{item.label}</p>
                              <p className="mt-1 text-xs leading-5 text-slate-600">{item.text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {activeServiceLocalLinks?.length ? (
                    <div className="mt-5 overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white/86 p-4 shadow-sm shadow-slate-950/5">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                            <MapPin className="h-3.5 w-3.5" />
                            Lokale Suchwege
                          </div>
                          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                            Regensburg bleibt der Kern. Wenn Ort und Leistung schon feststehen,
                            führen diese Seiten schneller zum passenden lokalen Kontaktweg.
                          </p>
                        </div>
                        <Link
                          href="/standorte"
                          className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 text-[11px] font-black uppercase tracking-[0.14em] text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
                        >
                          Standorte
                        </Link>
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-3">
                        {activeServiceLocalLinks.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`group rounded-[1.15rem] border p-4 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-950/10 ${item.tone}`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="text-sm font-black text-slate-950">{item.label}</span>
                              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 opacity-45 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                            </div>
                            <p className="mt-2 text-xs leading-5 opacity-75">{item.text}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                    </div>
                  </details>
                  <div className="mt-5 rounded-[1.15rem] border border-slate-200 bg-white/82 p-3">
                    <div className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Service wechseln, ohne neu zu suchen
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeServiceSwitchLinks.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={cn(
                            "rounded-full border px-3 py-2 text-[11px] font-black uppercase tracking-[0.13em] transition",
                            activeService === item.id
                              ? "border-blue-200 bg-blue-600 text-white shadow-sm shadow-blue-950/15"
                              : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950",
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <IntakeWizard
                dic={dic}
                serviceType={activeService}
                steps={activeServiceConfig?.steps.map((title, index) => ({ id: index + 1, title })) || []}
                renderStep={renderActiveForm}
                onClose={resetToSelection}
                onFinish={() => setMode("lead")}
                hasInput={
                  activeService === "umzug"
                    ? hasUmzugInput
                    : activeService === "reinigung"
                      ? hasReinigungInput
                      : activeService === "entsorgung"
                        ? hasEntsorgungInput
                        : hasBueroumzugInput
                }
              />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServiceRechnerHub;
