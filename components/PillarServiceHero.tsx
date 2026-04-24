import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Banknote, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { FloxantServiceVisual, type FloxantVisualVariant } from "@/components/FloxantServiceVisual";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";

type ServiceHeroCard = {
  label: string;
  value: string;
};

type PillarServiceHeroProps = {
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
  visualVariant?: FloxantVisualVariant;
};

function inferVisualVariant(signal: string): FloxantVisualVariant {
  const normalized = signal.toLowerCase();
  if (normalized.includes("büro") || normalized.includes("buero") || normalized.includes("firma")) return "office";
  if (normalized.includes("reinigung")) return "cleaning";
  if (normalized.includes("entr") || normalized.includes("räum") || normalized.includes("raeum")) return "clearance";
  return "moving";
}

export function PillarServiceHero({
  eyebrow,
  title,
  intro,
  imageSrc,
  imageAlt,
  primaryHref = "/rechner",
  primaryLabel = "Preisrahmen berechnen",
  secondaryHref = "/anfrage-mit-preisrahmen",
  secondaryLabel = "Preisvorstellung nennen",
  cards = [],
  visualVariant,
}: PillarServiceHeroProps) {
  const resolvedVisualVariant = visualVariant || inferVisualVariant(`${eyebrow} ${title} ${intro}`);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef5ff_0%,#f8fbff_62%,#ffffff_100%)] px-4 pb-14 pt-8 sm:px-6 lg:pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-10 h-72 w-72 rounded-full bg-blue-200/55 blur-3xl" />
        <div className="absolute right-[-6rem] top-4 h-80 w-80 rounded-full bg-sky-200/45 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
      </div>
      <FloxantSymbolLayer variant={resolvedVisualVariant} density="rich" className="opacity-70" />

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700 shadow-sm shadow-blue-950/5 backdrop-blur">
            <MapPin className="h-4 w-4" />
            {eyebrow}
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950 md:text-6xl xl:text-7xl">
              {title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-xl">
              {intro}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-foreground shadow-[0_18px_48px_rgba(37,99,235,0.24)] transition-all hover:-translate-y-1 hover:bg-blue-500"
            >
              <Banknote className="h-5 w-5" />
              {primaryLabel}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/85 px-6 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-slate-900 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:text-blue-700"
            >
              {secondaryLabel}
            </Link>
          </div>

          {cards.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-3">
              {cards.slice(0, 3).map((card) => (
                <div key={card.label} className="rounded-2xl border border-white bg-white/76 p-4 shadow-sm shadow-blue-950/5 backdrop-blur">
                  <div className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-blue-600">
                    {card.label}
                  </div>
                  <div className="mt-1 text-sm font-black leading-snug text-slate-950">{card.value}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[2.4rem] border border-white bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)] lg:min-h-[540px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1280px) 720px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/52 via-transparent to-blue-500/10" />
          <div className="absolute left-5 top-5 rounded-2xl border border-foreground/80 bg-white/88 px-4 py-3 shadow-xl shadow-slate-950/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-blue-700">
              <Sparkles className="h-4 w-4" />
              Smart geplant
            </div>
            <div className="mt-1 text-sm font-black text-slate-950">Regensburg zuerst, Bayern aktiv</div>
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-blue-100 bg-white/90 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur-md sm:right-auto sm:max-w-[22rem]">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
              <CheckCircle2 className="h-4 w-4" />
              Klarer nächster Schritt
            </div>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
              Erst Orientierung berechnen, dann Anfrage sauber prüfen lassen. Keine Lockpreise, kein Vergleichsportal-Nebel.
            </p>
          </div>
          <FloxantServiceVisual
            compact
            variant={resolvedVisualVariant}
            kicker="Vorprüfung"
            title="Service, Preisrahmen und Ablauf sichtbar verbunden"
            details={cards.slice(0, 3).map((card) => card.label)}
            className="absolute bottom-5 right-5 hidden w-[15rem] xl:block"
          />
        </div>
      </div>
    </section>
  );
}
