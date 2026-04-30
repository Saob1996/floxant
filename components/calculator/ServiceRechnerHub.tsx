"use client";

import React, { useEffect, useMemo } from "react";
import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Briefcase,
  CheckCircle2,
  Clock3,
  Repeat,
  ShieldCheck,
  Sparkles,
  Trash2,
  Truck,
  Zap,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { germanizeDeep, germanizeText } from "@/lib/german-text";
import { cn } from "@/lib/utils";
import { ServiceType, useCalculatorStore } from "@/store/calculatorStore";
import LeadClosing from "./LeadClosing";
import { IntakeWizard } from "./IntakeWizard";
import BueroumzugForm from "./forms/BueroumzugForm";
import EntsorgungForm from "./forms/EntsorgungForm";
import ReinigungForm from "./forms/ReinigungForm";
import UmzugForm from "./forms/UmzugForm";

const shellClasses =
  "glass-elevated relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(247,250,255,0.99))] shadow-[0_22px_56px_rgba(15,23,42,0.07)]";

const serviceCards = [
  {
    id: "umzug" as ServiceType,
    eyebrow: "Für Zuhause & Firmen",
    title: "Umzug",
    description:
      "Privat- oder Firmenumzug mit realistischer Vorprüfung zu Volumen, Strecke, Zugang und Zusatzleistungen.",
    icon: Truck,
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
    soft: "from-blue-50 via-white to-cyan-50",
    signal: "Belastbare Vorplanung",
    steps: ["Start", "Ziel", "Inventar", "Leistungen"],
  },
  {
    id: "reinigung" as ServiceType,
    eyebrow: "Für Objekt & Übergabe",
    title: "Reinigung",
    description:
      "Reinigung mit sauberer Einordnung zu Fläche, Zustand, Extras, Objektart und Terminlage.",
    icon: Sparkles,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    soft: "from-emerald-50 via-white to-cyan-50",
    signal: "Klare Leistungsbasis",
    steps: ["Objekt", "Details"],
  },
  {
    id: "entsorgung" as ServiceType,
    eyebrow: "Für Räumung & Abholung",
    title: "Entrümpelung",
    description:
      "Entrümpelung und Entsorgung mit plausibler Vorprüfung zu Volumen, Materialarten, Zugang und Sonderaufwand.",
    icon: Trash2,
    gradient: "from-orange-500 via-amber-500 to-rose-500",
    soft: "from-orange-50 via-white to-rose-50",
    signal: "Saubere Aufwandseinordnung",
    steps: ["Material", "Logistik"],
  },
  {
    id: "bueroumzug" as ServiceType,
    eyebrow: "Für Teams & Standorte",
    title: "Büroumzug",
    description:
      "Büro- und Firmenumzug mit Arbeitsplatzanzahl, IT, Archiv, Zugang, Teamlogik und Zeitfenstern im Blick.",
    icon: Briefcase,
    gradient: "from-cyan-600 via-blue-600 to-indigo-600",
    soft: "from-cyan-50 via-white to-indigo-50",
    signal: "Operativ für Firmen gedacht",
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

const selectionSignals = [
  "Unverbindlicher Orientierungsrahmen statt künstlicher Exaktheit",
  "Service-spezifische Treiber für Umzug, Reinigung, Entrümpelung und Büro",
  "Nahtloser Übergang in Anfrage, Preisvorstellung oder Express-Check",
];

const qualityPromises = [
  "Klarer Start ohne Fantasiepreise",
  "Echte Vorprüfung statt Formular-Nebel",
  "Saubere Übergabe in den passenden Anfrageweg",
];

const visualVariantByService: Partial<Record<ServiceType, "moving" | "cleaning" | "clearance" | "office">> = {
  umzug: "moving",
  reinigung: "cleaning",
  entsorgung: "clearance",
  bueroumzug: "office",
};

const ServiceRechnerHub: React.FC<{ dic?: any }> = ({ dic }) => {
  const activeService = useCalculatorStore((state) => state.serviceType);
  const setServiceType = useCalculatorStore((state) => state.setServiceType);
  const currentMode = useCalculatorStore((state) => state.mode);
  const setMode = useCalculatorStore((state) => state.setMode);

  const searchParams = useSearchParams();
  const queryService = searchParams.get("service");

  useEffect(() => {
    if (!queryService) {
      setServiceType(null);
      setMode("selection");
      return;
    }
    const safeService = queryService.trim().toLowerCase();
    const normalizedService =
      safeService === "entruempelung" || safeService === "entrümpelung"
        ? "entsorgung"
        : safeService === "büroumzug" || safeService === "bueroumzug"
          ? "bueroumzug"
          : safeService;

    if (["umzug", "reinigung", "entsorgung", "bueroumzug"].includes(normalizedService)) {
      setServiceType(normalizedService as ServiceType);
      setMode("advanced");
      return;
    }

    setServiceType(null);
    setMode("selection");
  }, [queryService, setMode, setServiceType]);

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

  const activeServiceConfig = localizedServiceCards.find((service) => service.id === activeService);

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
          <LeadClosing dic={dic} onBack={() => setMode("express")} />
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
                <div className="glass-elevated rounded-[1.8rem] p-6 md:p-7 xl:p-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                    <Clock3 className="h-4 w-4" />
                    {germanizeText("Rechner mit ehrlicher Vorprüfung")}
                  </div>

                  <h2 className="mt-6 max-w-4xl text-[2.1rem] font-bold leading-[0.98] tracking-[-0.05em] text-slate-950 md:text-[2.55rem]">
                    Welcher Service passt heute wirklich zu Ihrem Vorhaben?
                  </h2>

                  <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-700">
                    Wählen Sie zuerst den passenden Service. FLOXANT zeigt keinen Lockpreis, sondern einen
                    unverbindlichen Orientierungsrahmen mit den wichtigsten Kostentreibern. So bleibt die
                    Anfrage verständlich, glaubwürdig und angenehm klar. Wenn&apos;s schnell gehen soll, bitte
                    gern direkt gscheid einordnen.
                  </p>

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

                <div className="grid gap-4">
                  <div className="card-premium rounded-[1.8rem] p-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                      Klare Einordnung
                    </div>
                    <h3 className="mt-3 text-[1.6rem] font-bold leading-[1.06] tracking-tight text-slate-950">
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
                      onClick={() => {
                        setServiceType(service.id);
                        setMode("advanced");
                      }}
                    className={cn(
                        "card-premium service-card-hover group relative cursor-pointer rounded-[1.35rem] p-5",
                        "bg-gradient-to-br",
                        service.soft,
                      )}
                    >
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

                        <button
                          type="button"
                          onClick={() => {
                            setServiceType(service.id);
                            setMode("advanced");
                          }}
                          className="mt-5 inline-flex h-10 w-full items-center justify-between rounded-[1rem] border border-slate-200 bg-white/94 px-4 text-[11px] font-black uppercase tracking-[0.16em] text-slate-900 shadow-sm shadow-slate-950/5 transition-all hover:border-blue-200 hover:bg-white"
                        >
                          <span>Service starten</span>
                          <ArrowRight className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </m.article>
                  );
                })}
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                <div className="glass-elevated rounded-[1.4rem] p-5 xl:col-span-3">
                  <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                    <ShieldCheck className="h-4 w-4" />
                    Preiswahrheit statt Portal-Sprache
                  </div>
                  <h3 className="mt-4 max-w-2xl text-[1.35rem] font-bold tracking-tight text-slate-950">
                    Erst belastbar vorprüfen. Dann sauber weiterführen.
                  </h3>
                  <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-700">
                    FLOXANT zeigt zuerst, welche Faktoren die Einordnung wirklich beeinflussen. So wirkt die
                    Anfrage professionell, nicht künstlich exakt und für beide Seiten deutlich glaubwürdiger.
                  </p>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {["Klare Kostentreiber", "Ruhige Kundenführung", "Saubere Übergabe in die Anfrage"].map(
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
                    <Link key={item.href} href={item.href} className="card-premium group rounded-[1.35rem] p-5">
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
            <IntakeWizard
              key="wizard"
              dic={dic}
              serviceType={activeService}
              steps={activeServiceConfig?.steps.map((title, index) => ({ id: index + 1, title })) || []}
              renderStep={renderActiveForm}
              onClose={() => {
                setServiceType(null);
                setMode("selection");
              }}
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServiceRechnerHub;
