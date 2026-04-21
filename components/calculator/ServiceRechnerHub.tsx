"use client";

import React, { useEffect, useMemo } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Banknote, Briefcase, Repeat, Sparkles, Trash2, Truck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import FloxButton from "./ui/FloxButton";
import { ServiceType, useCalculatorStore } from "@/store/calculatorStore";
import { IntakeWizard } from "./IntakeWizard";
import UmzugForm from "./forms/UmzugForm";
import ReinigungForm from "./forms/ReinigungForm";
import EntsorgungForm from "./forms/EntsorgungForm";
import BueroumzugForm from "./forms/BueroumzugForm";
import LeadClosing from "./LeadClosing";

const ServiceRechnerHub: React.FC<{ dic?: any }> = ({ dic }) => {
  const activeService = useCalculatorStore((state) => state.serviceType);
  const setServiceType = useCalculatorStore((state) => state.setServiceType);
  const currentMode = useCalculatorStore((state) => state.mode);
  const setMode = useCalculatorStore((state) => state.setMode);

  const searchParams = useSearchParams();
  const queryService = searchParams.get("service");

  useEffect(() => {
    if (!queryService || activeService) return;
    const safeService = queryService.trim().toLowerCase();
    const normalizedService =
      safeService === "entruempelung" || safeService === "entrümpelung"
        ? "entsorgung"
        : safeService === "büroumzug" || safeService === "bueroumzug"
          ? "bueroumzug"
          : safeService;

    if (["umzug", "reinigung", "entsorgung", "bueroumzug"].includes(normalizedService)) {
      setServiceType(normalizedService as ServiceType);
    }
  }, [queryService, activeService, setServiceType]);

  const umzugData = useCalculatorStore((state) => state.umzugData);
  const hasUmzugInput = useMemo(
    () => (umzugData.fromAddressDetailed?.length || 0) > 5 || umzugData.areaM2 > 0,
    [umzugData]
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
    [bueroumzugData]
  );

  const services = [
    {
      id: "umzug" as ServiceType,
      title: "Umzug",
      description: "Privat- oder Firmenumzug mit klarer Vorprüfung zu Aufwand, Strecke und Zusatzleistungen.",
      icon: <Truck className="h-8 w-8" />,
      color: "from-blue-600 to-indigo-600",
      gradient: "hover:shadow-blue-500/20",
      steps: [
        { id: 1, title: "Start" },
        { id: 2, title: "Ziel" },
        { id: 3, title: "Inventar" },
        { id: 4, title: "Leistungen" },
      ],
    },
    {
      id: "reinigung" as ServiceType,
      title: "Reinigung",
      description: "Reinigung mit klarer Einordnung zu Fläche, Zustand, Extras und Terminlage.",
      icon: <Sparkles className="h-8 w-8" />,
      color: "from-emerald-500 to-teal-600",
      gradient: "hover:shadow-emerald-500/20",
      steps: [
        { id: 1, title: "Objekt" },
        { id: 2, title: "Details" },
      ],
    },
    {
      id: "entsorgung" as ServiceType,
      title: "Entrümpelung",
      description: "Entrümpelung und Entsorgung mit plausibler Vorprüfung zu Volumen, Zugang und Materialarten.",
      icon: <Trash2 className="h-8 w-8" />,
      color: "from-orange-500 to-red-600",
      gradient: "hover:shadow-orange-500/20",
      steps: [
        { id: 1, title: "Material" },
        { id: 2, title: "Logistik" },
      ],
    },
    {
      id: "bueroumzug" as ServiceType,
      title: "Büroumzug",
      description: "Büro- und Firmenumzug mit Arbeitsplatzanzahl, IT, Archiv, Zugang und Zeitfenster im Blick.",
      icon: <Briefcase className="h-8 w-8" />,
      color: "from-cyan-500 to-blue-700",
      gradient: "hover:shadow-cyan-500/20",
      steps: [
        { id: 1, title: "Standorte" },
        { id: 2, title: "Büro" },
        { id: 3, title: "Extras" },
      ],
    },
  ];

  const activeServiceConfig = services.find((service) => service.id === activeService);

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
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-24">
        <LeadClosing dic={dic} onBack={() => setMode("express")} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-24">
      <AnimatePresence mode="wait">
        {!activeService ? (
          <m.div
            key="selection"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="text-center"
          >
            <m.div className="mb-16">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Rechner-Auswahl
              </div>
              <h2 className="mb-8 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                Was dürfen wir für Sie
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                  heute vorprüfen?
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-xl font-medium text-white/45">
                Wählen Sie einen Service für eine unverbindliche Vorprüfung mit realistischem
                Orientierungsrahmen, sichtbaren Kostentreibern und sauberer Weiterführung in die
                Anfrage.
              </p>
            </m.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service, index) => (
                <m.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setServiceType(service.id)}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-10 shadow-2xl backdrop-blur-3xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]",
                    service.gradient
                  )}
                >
                  <div
                    className={`absolute -right-12 -top-12 h-48 w-48 bg-gradient-to-br ${service.color} opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-20`}
                  />

                  <div
                    className={`mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${service.color} text-white shadow-xl transition-transform group-hover:scale-110`}
                  >
                    {React.cloneElement(service.icon as React.ReactElement<any>, { className: "h-10 w-10" })}
                  </div>

                  <h3 className="mb-4 text-2xl font-bold tracking-tight text-white">{service.title}</h3>
                  <p className="mb-10 text-base font-medium leading-relaxed text-white/45 transition-colors group-hover:text-white/65">
                    {service.description}
                  </p>

                  <FloxButton variant="glass" fullWidth onClick={() => setServiceType(service.id)}>
                    Service starten
                  </FloxButton>
                </m.div>
              ))}
            </div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/express-anfrage"
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white/50 transition-colors hover:bg-white/5 hover:text-blue-400"
              >
                <div className="animate-pulse text-blue-400">
                  <Zap size={14} />
                </div>
                Express-Anfrage
              </Link>
              <Link
                href="/beiladung"
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white/50 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Repeat size={14} className="text-white/30" />
                Beiladung prüfen
              </Link>
              <Link
                href="/anfrage-mit-preisrahmen"
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white/50 transition-colors hover:bg-white/5 hover:text-emerald-400"
              >
                <Banknote size={14} className="text-emerald-500" />
                Preisvorstellung
              </Link>
            </m.div>
          </m.div>
        ) : (
          <IntakeWizard
            key="wizard"
            dic={dic}
            serviceType={activeService}
            steps={activeServiceConfig?.steps || []}
            renderStep={renderActiveForm}
            onClose={() => setServiceType(null)}
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
  );
};

export default ServiceRechnerHub;
