"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { Compass, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";

import type { CustomerJourneyItem } from "@/components/navigation/customer-journey.types";
import { germanizeText } from "@/lib/german-text";
import { cn } from "@/lib/utils";

interface CustomerJourneyMobileProps {
  visible: boolean;
  primaryItems: CustomerJourneyItem[];
  secondaryItems: CustomerJourneyItem[];
  activeKey: string | null;
  onSelect: (item: CustomerJourneyItem) => void;
}

const mobileLabelMap: Record<string, string> = {
  ueberblick: "Überblick",
  leistungen: "Leistungen",
  preis: "Preis & Budget",
  kontakt: "Anfragen",
  ablauf: "Ablauf",
  zusatzservices: "Extras",
  region: "Einsatzgebiet",
};

export function CustomerJourneyMobile({
  visible,
  primaryItems,
  secondaryItems,
  activeKey,
  onSelect,
}: CustomerJourneyMobileProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [drawerOpen]);

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-5 left-5 z-40 lg:hidden">
        <button
          type="button"
          aria-label="Direktwahl öffnen"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/96 px-4 py-3 text-sm font-semibold text-slate-800 shadow-[0_12px_26px_rgba(15,23,42,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-slate-50"
        >
          <Compass className="h-4 w-4 text-blue-700" />
          Direktwahl
        </button>
      </div>

      <AnimatePresence>
        {drawerOpen ? (
          <>
            <m.button
              type="button"
              aria-label="Schnellwahl schließen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-sm lg:hidden"
            />
            <m.aside
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed inset-x-4 bottom-4 z-[60] max-h-[80vh] overflow-auto rounded-[1.75rem] lg:hidden"
            >
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-[0_30px_70px_rgba(15,23,42,0.22)]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-950">Direktwahl</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Direkt zu Leistung, Preis oder Anfrage.
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Schnellwahl schließen"
                    onClick={() => setDrawerOpen(false)}
                    className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {primaryItems.map((item) => {
                    const active = item.key === activeKey;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        aria-label={`${germanizeText(mobileLabelMap[item.key] || item.label)} öffnen`}
                        onClick={() => {
                          onSelect(item);
                          setDrawerOpen(false);
                        }}
                        className={cn(
                          "w-full rounded-[1.05rem] border px-3.5 py-3 text-left transition",
                          active
                            ? "border-blue-200 bg-blue-50 text-slate-950"
                            : "border-slate-200 bg-slate-50 text-slate-700",
                        )}
                      >
                        <div className="text-sm font-semibold">
                          {germanizeText(mobileLabelMap[item.key] || item.label)}
                        </div>
                        <div className="mt-1 text-xs leading-5 text-slate-500">
                          {germanizeText(item.description)}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {secondaryItems.length > 0 ? (
                  <div className="mt-4 border-t border-slate-200 pt-4">
                    <button
                      type="button"
                      aria-label="Mehr Schnellwahl umschalten"
                      onClick={() => setShowMore((value) => !value)}
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
                    >
                      {showMore ? "Weniger anzeigen" : "Weitere Punkte anzeigen"}
                    </button>
                    {showMore ? (
                      <div className="mt-3 space-y-2">
                        {secondaryItems.map((item) => (
                          <button
                            key={item.key}
                            type="button"
                            aria-label={`${germanizeText(mobileLabelMap[item.key] || item.label)} öffnen`}
                            onClick={() => {
                              onSelect(item);
                              setDrawerOpen(false);
                            }}
                            className="w-full rounded-[1rem] border border-slate-200 bg-white px-3.5 py-3 text-left"
                          >
                            <div className="text-sm font-semibold text-slate-900">
                              {germanizeText(mobileLabelMap[item.key] || item.label)}
                            </div>
                            <div className="mt-1 text-xs leading-5 text-slate-500">
                              {germanizeText(item.description)}
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <div className="mt-4 text-center">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    Kontakt öffnen
                  </Link>
                </div>
              </div>
            </m.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
