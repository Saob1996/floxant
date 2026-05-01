"use client";

import { Compass, Dot, MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { CustomerJourneyMobile } from "@/components/navigation/CustomerJourneyMobile";
import type { CustomerJourneyItem } from "@/components/navigation/customer-journey.types";
import { useActiveSection } from "@/hooks/useActiveSection";
import { germanizeText } from "@/lib/german-text";
import { cn } from "@/lib/utils";

export type { CustomerJourneyItem } from "@/components/navigation/customer-journey.types";

interface CustomerJourneyNavProps {
  items: CustomerJourneyItem[];
  title?: string;
  intro?: string;
}

const primaryOrder = ["ueberblick", "leistungen", "preis", "kontakt"] as const;
const secondaryOrder = ["ablauf", "zusatzservices", "region"] as const;

const primaryCopy: Record<string, { label: string; hint: string }> = {
  ueberblick: { label: "Überblick", hint: "Passt FLOXANT zu meinem Fall?" },
  leistungen: { label: "Leistungen", hint: "Was wird konkret übernommen?" },
  preis: { label: "Preis & Budget", hint: "Rechner, Budget oder Anfrage" },
  kontakt: { label: "Anfragen", hint: "Direkt senden oder WhatsApp" },
};

const secondaryCopy: Record<string, { label: string; hint: string }> = {
  ablauf: { label: "Ablauf", hint: "Was nach der Anfrage passiert" },
  zusatzservices: { label: "Extras", hint: "Reinigung, Übergabe, Schlüssel" },
  region: { label: "Einsatzgebiet", hint: "Wo Anfahrt und Termin realistisch passen" },
};

export function CustomerJourneyNav({
  items,
  title = "Schnellwahl",
  intro = "Direkt zur Stelle, die Sie gerade brauchen.",
}: CustomerJourneyNavProps) {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const { activeKey, setActiveKey, visibleItems } = useActiveSection(items);

  const primaryItems = useMemo(
    () =>
      primaryOrder
        .map((key) => visibleItems.find((item) => item.key === key))
        .filter((item): item is CustomerJourneyItem => Boolean(item)),
    [visibleItems],
  );

  const secondaryItems = useMemo(
    () =>
      secondaryOrder
        .map((key) => visibleItems.find((item) => item.key === key))
        .filter((item): item is CustomerJourneyItem => Boolean(item)),
    [visibleItems],
  );

  function handleSelect(item: CustomerJourneyItem) {
    const target = item.targetId ? document.getElementById(item.targetId) : null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveKey(item.key);
      setShowMore(false);
      return;
    }

    if (item.fallbackHref) {
      router.push(item.fallbackHref);
    }
  }

  if (primaryItems.length === 0 && secondaryItems.length === 0) return null;

  return (
    <>
      <section className="relative z-20 px-6 pb-4 pt-4 lg:pb-6">
        <div className="mx-auto hidden max-w-7xl lg:block">
          <div className="flox-panel rounded-[1.5rem] px-4 py-3">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-[1rem] bg-blue-50 text-blue-700">
                  <Compass className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-950">{germanizeText(title)}</p>
                  <p className="text-[11px] text-slate-500">{germanizeText(intro)}</p>
                </div>
              </div>

              <div className="flex flex-1 flex-wrap gap-2 xl:justify-center">
                {primaryItems.map((item) => {
                  const active = item.key === activeKey;
                  const copy = primaryCopy[item.key] || {
                    label: item.label,
                    hint: item.description,
                  };

                  return (
                    <button
                      key={item.key}
                      type="button"
                      aria-label={`${germanizeText(copy.label)} öffnen`}
                      onClick={() => handleSelect(item)}
                      className={cn(
                        "min-w-[152px] rounded-[1rem] border px-3.5 py-3 text-left transition",
                        active
                          ? "border-blue-200 bg-blue-50 text-slate-950"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                      )}
                    >
                      <div className="text-sm font-semibold text-slate-950">{germanizeText(copy.label)}</div>
                      <div className="mt-1 text-[11px] leading-5 text-slate-500">
                        {germanizeText(copy.hint)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {secondaryItems.length > 0 ? (
                <div className="relative shrink-0">
                  <button
                    type="button"
                    aria-label="Weitere Schnellwahl öffnen"
                    aria-expanded={showMore}
                    onClick={() => setShowMore((value) => !value)}
                    className="inline-flex h-11 items-center gap-2 rounded-[1rem] border border-slate-200 bg-white px-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <MoreHorizontal className="h-4 w-4 text-blue-700" />
                    Mehr
                  </button>

                  {showMore ? (
                    <div className="absolute right-0 top-[calc(100%+0.6rem)] z-30 w-[18rem] rounded-[1.2rem] border border-slate-200 bg-white p-3 shadow-[0_18px_38px_rgba(15,23,42,0.12)]">
                      <div className="space-y-2">
                        {secondaryItems.map((item) => {
                          const active = item.key === activeKey;
                          const copy = secondaryCopy[item.key] || {
                            label: item.label,
                            hint: item.description,
                          };

                          return (
                            <button
                              key={item.key}
                              type="button"
                              aria-label={`${germanizeText(copy.label)} öffnen`}
                              onClick={() => handleSelect(item)}
                              className={cn(
                                "w-full rounded-[1rem] border px-3.5 py-3 text-left transition",
                                active
                                  ? "border-blue-200 bg-blue-50 text-slate-950"
                                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white",
                              )}
                            >
                              <div className="text-sm font-semibold text-slate-950">
                                {germanizeText(copy.label)}
                              </div>
                              <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                                <Dot className="h-3.5 w-3.5 text-slate-300" />
                                <span>{germanizeText(copy.hint)}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <CustomerJourneyMobile
        visible={primaryItems.length > 0 || secondaryItems.length > 0}
        primaryItems={primaryItems}
        secondaryItems={secondaryItems}
        activeKey={activeKey}
        onSelect={handleSelect}
      />
    </>
  );
}
