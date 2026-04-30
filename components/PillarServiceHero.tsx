import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Banknote, MapPin } from "lucide-react";

import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { germanText } from "@/lib/german-text";

type ServiceHeroCard = {
  label: string;
  value: string;
};

type PillarServiceHeroProps = {
  sectionId?: string;
  eyebrow: string;
  title: string;
  intro: string;
  imageSrc: string;
  imageAlt: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  cards?: ServiceHeroCard[];
  visualVariant?: "moving" | "cleaning" | "clearance" | "office" | "backhaul" | "premium";
};

export function PillarServiceHero({
  sectionId = "ueberblick",
  eyebrow,
  title,
  intro,
  imageSrc,
  imageAlt,
  primaryHref = "/rechner",
  primaryLabel = "Preisrahmen berechnen",
  secondaryHref = "/anfrage-mit-preisrahmen",
  secondaryLabel = "Budget nennen",
  cards = [],
  visualVariant = "moving",
}: PillarServiceHeroProps) {
  return (
    <section id={sectionId} className="relative overflow-hidden px-6 pb-16 pt-10 lg:pb-20 lg:pt-14">
      <div className="pointer-events-none absolute inset-0">
        <FloxantSymbolLayer variant={visualVariant} density="soft" mode="hero" className="opacity-45" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1.04fr_0.96fr] xl:items-center">
        <div className="flox-panel rounded-[2.2rem] px-6 py-7 sm:px-9 sm:py-9 xl:px-10 xl:py-10">
          <div className="flox-kicker">
            <MapPin className="h-4 w-4" />
            {germanText(eyebrow, eyebrow)}
          </div>

          <h1 className="mt-7 flox-title-lg max-w-[13ch] text-slate-950">
            {germanText(title, title)}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700">
            {germanText(intro, intro)}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryHref} className="flox-button-primary px-6">
              <Banknote className="h-4 w-4" />
              {germanText(primaryLabel, primaryLabel)}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={secondaryHref} className="flox-button-secondary px-6">
              {germanText(secondaryLabel, secondaryLabel)}
            </Link>
          </div>

          {cards.length > 0 ? (
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {cards.slice(0, 3).map((card) => (
                <div key={card.label} className="flox-metric">
                  <div className="flox-metric-label">
                    {germanText(card.label, card.label)}
                  </div>
                  <div className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                    {germanText(card.value, card.value)}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flox-panel overflow-hidden rounded-[2.2rem] p-4">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-[0_18px_38px_rgba(15,23,42,0.08)]">
            <div className="relative h-[300px] sm:h-[350px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1280px) 720px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#081427]/24 via-transparent to-white/18" />
            </div>

            <div className="grid gap-3 p-4 md:grid-cols-2">
              <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  Operative Basis
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Regensburg als klarer Startpunkt, Bayern als sauber gefuehrter Einsatzraum.
                </p>
              </div>
              <div className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  Naechster Schritt
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Erst Aufwand einordnen, dann Anfrage mit Substanz weiterfuehren.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
