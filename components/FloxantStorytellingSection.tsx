import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  MapPin,
  MessageCircle,
  Sparkles,
  UploadCloud,
  type LucideIcon,
} from "lucide-react";

import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { germanizeDeep } from "@/lib/german-text";
import { cn } from "@/lib/utils";

type StoryVariant = "operations" | "cleaning" | "clearance" | "offer" | "duesseldorf";

type StoryStep = {
  title: string;
  text: string;
  icon: LucideIcon;
};

type DominanceMetric = {
  value: string;
  label: string;
};

type StorytellingProps = {
  variant?: StoryVariant;
  eyebrow?: string;
  title?: string;
  intro?: string;
  regionLabel?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
};

type VariantConfig = {
  image: string;
  accent: string;
  badge: string;
  title: string;
  intro: string;
  region: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  chips: string[];
  metrics: DominanceMetric[];
  steps: StoryStep[];
};

const variantConfig: Record<StoryVariant, VariantConfig> = {
  operations: {
    image: "/assets/floxant-story-operations.svg",
    accent: "from-blue-600 to-cyan-500",
    badge: "FLOXANT Ablauf",
    title: "Aus einer offenen Anfrage wird ein klarer nächster Schritt.",
    intro:
      "FLOXANT führt Kunden vom ersten Foto, Angebot oder Terminwunsch zu einer realistischen Prüfung: Ort, Umfang, Zugang, Budget und passende Leistung werden sichtbar.",
    region: "Regensburg · 200 km · Bayern nach Verfügbarkeit",
    primaryHref: "/buchung",
    primaryLabel: "Fall direkt senden",
    secondaryHref: "/angebot-guenstiger-pruefen",
    secondaryLabel: "Angebot prüfen",
    chips: ["Fotos statt Rätselraten", "Ort und Termin zuerst", "Service passend wählen"],
    metrics: [
      { value: "1", label: "klarer Einstieg" },
      { value: "5", label: "Prüfpunkte" },
      { value: "200 km", label: "Regensburg-Nahbereich" },
    ],
    steps: [
      {
        title: "Kurz zeigen",
        text: "Fotos, vorhandenes Angebot oder ein paar Eckdaten reichen für den ersten Überblick.",
        icon: UploadCloud,
      },
      {
        title: "Praktisch prüfen",
        text: "FLOXANT ordnet Service, Zugang, Umfang, Region, Zeitfenster und offene Punkte ein.",
        icon: FileSearch,
      },
      {
        title: "Sauber entscheiden",
        text: "Danach ist klarer, ob Anfrage, Rechner, Budgetweg oder Rückruf der beste nächste Schritt ist.",
        icon: CheckCircle2,
      },
    ],
  },
  cleaning: {
    image: "/assets/floxant-story-cleaning.svg",
    accent: "from-teal-600 to-cyan-500",
    badge: "Reinigung mit System",
    title: "Saubere Übergaben beginnen vor dem ersten Wischen.",
    intro:
      "Fläche, Zustand, Termin, Fotos und Ziel der Reinigung werden vorab geklärt. So wirkt Reinigung nicht beliebig, sondern planbar und nachvollziehbar.",
    region: "Regensburg und Bayern · Düsseldorf mit eigenen Servicepfaden",
    primaryHref: "/rechner?service=reinigung#rechner-wizard",
    primaryLabel: "Reinigung einschätzen",
    secondaryHref: "/angebot-guenstiger-pruefen",
    secondaryLabel: "Reinigungsangebot prüfen",
    chips: ["Fläche", "Zustand", "Übergabeziel"],
    metrics: [
      { value: "Fotos", label: "statt Blindpreis" },
      { value: "Termin", label: "vor Übergabe" },
      { value: "Ziel", label: "sauber geklärt" },
    ],
    steps: [
      {
        title: "Zustand sehen",
        text: "Küche, Bad, Böden, Fensterbereiche und starke Verschmutzung werden mit Fotos besser einschätzbar.",
        icon: Camera,
      },
      {
        title: "Ziel klären",
        text: "Endreinigung, Grundreinigung, Bürofläche oder Wohnungsübergabe brauchen unterschiedliche Vorbereitung.",
        icon: ClipboardCheck,
      },
      {
        title: "Termin sichern",
        text: "Der späteste Übergabetermin wird mit Umfang, Zugang und Kapazität abgeglichen.",
        icon: CheckCircle2,
      },
    ],
  },
  clearance: {
    image: "/assets/floxant-story-clearance.svg",
    accent: "from-orange-600 to-amber-400",
    badge: "Räumung & Entsorgung",
    title: "Erst Menge und Zugang verstehen, dann Räumung planen.",
    intro:
      "Keller, Garage, Wohnung oder Nebenfläche werden nicht pauschal betrachtet. Entscheidend sind Menge, Material, Laufweg, Entsorgung und gewünschter Zielzustand.",
    region: "Regensburg · Bayern nach Verfügbarkeit",
    primaryHref: "/rechner?service=entsorgung#rechner-wizard",
    primaryLabel: "Menge einschätzen",
    secondaryHref: "/angebot-guenstiger-pruefen",
    secondaryLabel: "Entsorgungsangebot prüfen",
    chips: ["Menge", "Zugang", "Zielzustand"],
    metrics: [
      { value: "Menge", label: "sichtbar machen" },
      { value: "Zugang", label: "realistisch prüfen" },
      { value: "Endzustand", label: "vorher klären" },
    ],
    steps: [
      {
        title: "Menge sichtbar machen",
        text: "Fotos von Raum, Keller, Garage oder Sperrmüll helfen schneller als lange Schätzungen.",
        icon: Camera,
      },
      {
        title: "Zugang prüfen",
        text: "Etage, Aufzug, Laufweg und Parkmöglichkeit entscheiden über Aufwand und Preisrahmen.",
        icon: MapPin,
      },
      {
        title: "Abschluss planen",
        text: "Räumung, Entsorgung und optional Reinigung werden als ein sauberer Ablauf gedacht.",
        icon: CheckCircle2,
      },
    ],
  },
  offer: {
    image: "/assets/floxant-story-offer.svg",
    accent: "from-slate-950 to-blue-700",
    badge: "Angebotsprüfung",
    title: "Nicht nur billiger fragen, sondern das Angebot verständlich machen.",
    intro:
      "FLOXANT prüft vorhandene Angebote praktisch: Preis, Umfang, Termin, Fotos, Zusatzkosten und offene Punkte. Wenn es passt, wird eine klarere oder günstigere Alternative geprüft.",
    region: "Für Umzug, Reinigung, Entrümpelung, Transport und Entsorgung",
    primaryHref: "/angebot-guenstiger-pruefen#guenstiger-form",
    primaryLabel: "Angebot hochladen",
    secondaryHref: "/plattform-auftrag-pruefen",
    secondaryLabel: "Plattform-Auftrag prüfen",
    chips: ["Preis", "Leistung", "FLOXANT-Alternative"],
    metrics: [
      { value: "PDF", label: "oder Screenshot" },
      { value: "Preis", label: "transparent prüfen" },
      { value: "Alternative", label: "ohne Garantie-Versprechen" },
    ],
    steps: [
      {
        title: "Angebot senden",
        text: "PDF, Screenshot, Foto oder Angebotstext reichen für die erste Prüfung.",
        icon: UploadCloud,
      },
      {
        title: "Lücken erkennen",
        text: "Etage, Laufweg, Zusatzkosten, Reinigung, Entsorgung und Termin werden sauber eingeordnet.",
        icon: FileSearch,
      },
      {
        title: "Alternative prüfen",
        text: "Wenn Ort, Termin und Umfang passen, prüft FLOXANT eine günstigere oder passendere Lösung.",
        icon: Sparkles,
      },
    ],
  },
  duesseldorf: {
    image: "/assets/floxant-story-duesseldorf.svg",
    accent: "from-teal-600 to-sky-500",
    badge: "Düsseldorf Cleaning OS",
    title: "Düsseldorf bleibt klar: Umzug, Reinigung und Räumung über eigene Seiten.",
    intro:
      "Für Wohnungen, Apartments, Büros, kleine Unternehmen, Treppenhäuser und Grundreinigung werden Objekt, Fläche, Frequenz, Zeitfenster und Fotos strukturiert abgefragt.",
    region: "Düsseldorf · Reinigung · Entsorgung separat",
    primaryHref: "/duesseldorf/reinigung#kontakt",
    primaryLabel: "Reinigung anfragen",
    secondaryHref: "/duesseldorf/bueroreinigung",
    secondaryLabel: "B2B-Reinigung",
    chips: ["Objekt", "Fläche", "Zeitfenster"],
    metrics: [
      { value: "0", label: "Umzug-Signale" },
      { value: "B2B", label: "kleine Unternehmen" },
      { value: "Fotos", label: "für Objektprüfung" },
    ],
    steps: [
      {
        title: "Objekt senden",
        text: "Wohnung, Büro, Treppenhaus, Apartment oder Gewerbefläche klar benennen.",
        icon: UploadCloud,
      },
      {
        title: "Frequenz klären",
        text: "Einmalig, wöchentlich, regelmäßig oder nach Bedarf wird sauber unterschieden.",
        icon: ClipboardCheck,
      },
      {
        title: "Anfrage bündeln",
        text: "Fotos, Fläche, Zeitfenster und Budget machen die Rückmeldung schneller.",
        icon: MessageCircle,
      },
    ],
  },
};

export function FloxantStorytellingSection({
  variant = "operations",
  eyebrow,
  title,
  intro,
  regionLabel,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  className,
}: StorytellingProps) {
  const config = germanizeDeep(variantConfig[variant]) as VariantConfig;
  const displayTitle = title || config.title;
  const displayIntro = intro || config.intro;
  const displayRegion = regionLabel || config.region;
  const displayPrimaryHref = primaryHref || config.primaryHref;
  const displayPrimaryLabel = primaryLabel || config.primaryLabel;
  const displaySecondaryHref = secondaryHref || config.secondaryHref;
  const displaySecondaryLabel = secondaryLabel || config.secondaryLabel;

  return (
    <section
      className={cn(
        "flox-story-section relative overflow-hidden px-4 py-14 sm:px-6 lg:py-20",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="flox-story-shape flox-story-shape-a" />
        <div className="flox-story-shape flox-story-shape-b" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-200/70 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
        <AnimateOnScroll>
          <div className="flox-panel-frame flox-story-copy-panel p-6 md:p-8">
            <div className="relative">
              <div className="flox-tag-soft">
                <Sparkles className="h-4 w-4" />
                {eyebrow || config.badge}
              </div>

              <h2 className="flox-ink-gradient-title flox-title-lg flox-display-section mt-6 max-w-3xl">
                {displayTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
                {displayIntro}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {config.metrics.map((metric) => (
                  <div
                    key={`${metric.value}-${metric.label}`}
                    className="flox-surface-card px-4 py-4"
                  >
                    <div className="flox-card-title-lg text-slate-950">
                      {metric.value}
                    </div>
                    <div className="flox-card-copy-sm mt-1 text-slate-500">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flox-proof-rail mt-7 rounded-[var(--flox-radius-lg)] border border-slate-800 bg-slate-950 p-4 pl-5 text-white">
                <div className="flox-overline text-cyan-200">
                  So wird Ihre Anfrage schneller einschätzbar
                </div>
                <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-100">
                  <div className="flox-type-line">
                    <span>Fotos zeigen, was Worte oft nicht erklären.</span>
                  </div>
                  <div className="flox-type-line flox-type-line-delay-1">
                    <span>Ort und Termin nennen.</span>
                  </div>
                  <div className="flox-type-line flox-type-line-delay-2">
                    <span>FLOXANT meldet sich mit dem passenden nächsten Schritt.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {config.steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <AnimateOnScroll key={step.title} delay={index * 90}>
                      <article className="flox-click-card flox-action-card h-full p-4">
                        <div
                          className={cn(
                            "flox-icon-tile flox-story-step-icon h-11 w-11 bg-gradient-to-br text-white",
                            config.accent,
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="flox-card-title mt-4 text-slate-950">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
                      </article>
                    </AnimateOnScroll>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={displayPrimaryHref}
                  className={cn(
                    "flox-button-primary min-h-12 px-6",
                    config.accent,
                  )}
                >
                  {displayPrimaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={displaySecondaryHref}
                  className="flox-button-secondary min-h-12 px-6"
                >
                  {displaySecondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={120}>
          <div className="relative">
            <div
              className={cn(
                "absolute -inset-4 rounded-[var(--flox-radius-frame)] bg-gradient-to-br opacity-[0.12] blur-2xl",
                config.accent,
              )}
            />
            <div className="flox-panel-frame flox-story-image-frame relative p-4">
              <div className="flox-story-image-card relative min-h-[430px] overflow-hidden rounded-[var(--flox-radius-panel)] bg-slate-950">
                <Image
                  src={config.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 620px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/54 via-slate-950/10 to-white/12" />

                <div className="absolute left-4 top-4 rounded-[var(--flox-radius-md)] border border-white/40 bg-white/94 px-4 py-3 text-slate-950 shadow-sm shadow-slate-950/10 backdrop-blur">
                  <div className="flox-overline text-blue-800">
                    Region / Kontext
                  </div>
                  <div className="flox-card-title mt-1 max-w-[16rem]">
                    {displayRegion}
                  </div>
                </div>

                <div className="absolute right-4 top-4 hidden rounded-[var(--flox-radius-md)] border border-cyan-100/30 bg-slate-950/70 px-4 py-3 text-white shadow-[0_18px_42px_rgba(2,6,23,0.24)] backdrop-blur sm:block">
                  <div className="flox-overline text-cyan-100">
                    Klarer Start
                  </div>
                  <div className="flox-card-title mt-1 text-white">Fotos · Ort · Termin</div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 rounded-[var(--flox-radius-lg)] border border-white/30 bg-slate-950/82 p-4 text-white shadow-[0_18px_42px_rgba(2,6,23,0.24)] backdrop-blur">
                  <div className="flex flex-wrap gap-2">
                    {config.chips.map((chip) => (
                      <span
                        key={chip}
                        className="flox-tag-dark flox-search-chip flox-card-copy-sm"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-200">
                    Sie sehen auf einen Blick, was FLOXANT für die Einschätzung braucht:
                    Fotos, Ort, Termin und Service. So startet die Anfrage verständlich
                    und ohne langes Hin und Her.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
