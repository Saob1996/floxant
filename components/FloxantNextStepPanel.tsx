import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Calculator,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  MessageCircle,
  Sparkles,
  UploadCloud,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { germanizeDeep } from "@/lib/german-text";
import { cn } from "@/lib/utils";

type NextStepVariant = "booking" | "calculator" | "offer" | "duesseldorf";

type StepCard = {
  title: string;
  text: string;
  href: string;
  label: string;
  Icon: LucideIcon;
};

type PanelConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  signal: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  cards: StepCard[];
};

const panelConfigs: Record<NextStepVariant, PanelConfig> = {
  booking: {
    eyebrow: "FLOXANT nächster Schritt",
    title: "Nicht lange suchen. Den passenden Start wählen.",
    intro:
      "Kunden kommen mit sehr unterschiedlichen Fragen: Preis, Termin, Fotos, Anbieter-Angebot oder akuter Zeitdruck. FLOXANT führt diese Fälle in klare Einstiege, damit die Anfrage schneller prüfbar wird.",
    signal:
      "Für Google, KI-Antworten und Kunden ist klar: FLOXANT prüft Umzug, Reinigung, Entrümpelung, Entsorgung und Zusatzservices mit Ort, Umfang, Fotos und Budget.",
    primaryHref: "/buchung#buchungssystem",
    primaryLabel: "Direkt anfragen",
    secondaryHref: "/rechner#rechner-wizard",
    secondaryLabel: "Erst rechnen",
    cards: [
      {
        title: "Fall direkt senden",
        text: "Wenn Leistung, Ort und Termin grob klar sind.",
        href: "/buchung#buchungssystem",
        label: "Anfrage öffnen",
        Icon: ClipboardCheck,
      },
      {
        title: "Preisrahmen prüfen",
        text: "Wenn Umfang, Zugang oder Budget noch unsicher sind.",
        href: "/rechner#rechner-wizard",
        label: "Rechner starten",
        Icon: Calculator,
      },
      {
        title: "Fotos ergänzen",
        text: "Wenn Zustand, Menge oder Fläche besser sichtbar werden sollen.",
        href: "/buchung#buchungssystem",
        label: "Mit Fotos senden",
        Icon: Camera,
      },
    ],
  },
  calculator: {
    eyebrow: "Vom Rechner zur echten Anfrage",
    title: "Orientierung ist gut. Prüfbarkeit bringt den Auftrag weiter.",
    intro:
      "Der Rechner sortiert Preisfaktoren. Danach braucht FLOXANT die entscheidenden Eckdaten: Ort, Termin, Zugang, Fläche oder Volumen, Fotos und gewünschte Leistung.",
    signal:
      "So entsteht ein sauberer Weg von Suchanfrage, Rechner und Maps-Intent bis zur konkreten FLOXANT-Anfrage.",
    primaryHref: "#rechner-wizard",
    primaryLabel: "Rechner starten",
    secondaryHref: "/buchung",
    secondaryLabel: "Direkt anfragen",
    cards: [
      {
        title: "Erst einordnen",
        text: "Für Umzug, Reinigung, Entrümpelung oder Büroumzug.",
        href: "#rechner-wizard",
        label: "Kosten einordnen",
        Icon: Calculator,
      },
      {
        title: "Budget nennen",
        text: "Wenn ein Preisrahmen vorhanden ist und realistisch geprüft werden soll.",
        href: "/anfrage-mit-preisrahmen",
        label: "Budget senden",
        Icon: Banknote,
      },
      {
        title: "Express prüfen",
        text: "Wenn Termin, Zugang oder Übergabe kurzfristig geklärt werden müssen.",
        href: "/express-anfrage",
        label: "Express-Check",
        Icon: Zap,
      },
    ],
  },
  offer: {
    eyebrow: "Angebotsprüfung mit FLOXANT",
    title: "Angebot hochladen. Lücken erkennen. Alternative prüfen.",
    intro:
      "Wenn ein Angebot einer anderen Firma unklar wirkt, prüft FLOXANT praktisch: Preis, Umfang, Termin, Fotos, Zusatzleistungen und ob eine klarere oder günstigere Alternative möglich ist.",
    signal:
      "Die Seite stärkt Suchanfragen wie Angebot prüfen lassen, Umzugsangebot vergleichen, Reinigungsangebot prüfen und Entsorgungsangebot einschätzen.",
    primaryHref: "/angebot-guenstiger-pruefen#guenstiger-form",
    primaryLabel: "Angebot hochladen",
    secondaryHref: "/plattform-auftrag-pruefen",
    secondaryLabel: "Plattform-Auftrag prüfen",
    cards: [
      {
        title: "Angebot senden",
        text: "PDF, Screenshot oder Text hochladen und offene Punkte nennen.",
        href: "/angebot-guenstiger-pruefen#guenstiger-form",
        label: "Datei senden",
        Icon: UploadCloud,
      },
      {
        title: "Red Flags prüfen",
        text: "Etage, Laufweg, MwSt., Zusatzkosten und Termin sauber klären.",
        href: "/angebotscheck#red-flag-scanner",
        label: "Check starten",
        Icon: FileSearch,
      },
      {
        title: "FLOXANT-Alternative",
        text: "Wenn eine passendere oder günstigere Lösung nach Prüfung möglich ist.",
        href: "/angebot-guenstiger-pruefen#guenstiger-form",
        label: "Alternative prüfen",
        Icon: Sparkles,
      },
    ],
  },
  duesseldorf: {
    eyebrow: "Düsseldorf klar getrennt",
    title: "Reinigung und Entsorgung anfragen. Keine Umzüge.",
    intro:
      "Für Düsseldorf positioniert FLOXANT bewusst Reinigung und Entsorgung: Wohnungen, möblierte Apartments, Büros, Treppenhaus, Grundreinigung und B2B-Reinigung nach Absprache.",
    signal:
      "Diese Trennung hilft Kunden und Suchmaschinen: Düsseldorf bedeutet Reinigung und Entsorgung, Regensburg/Bayern bleibt der Kern für Umzug, Reinigung, Entrümpelung und Transport.",
    primaryHref: "/duesseldorf/reinigung#kontakt",
    primaryLabel: "Reinigung anfragen",
    secondaryHref: "/entsorgung-duesseldorf",
    secondaryLabel: "Entsorgung prüfen",
    cards: [
      {
        title: "Wohnung reinigen",
        text: "Für Auszug, Übergabe, möblierte Wohnung oder Grundreinigung.",
        href: "/duesseldorf/reinigung#kontakt",
        label: "Reinigung starten",
        Icon: Sparkles,
      },
      {
        title: "B2B-Reinigung",
        text: "Für kleine Büros, Agenturen, Studios und Gewerbeflächen.",
        href: "/duesseldorf/bueroreinigung",
        label: "B2B prüfen",
        Icon: ClipboardCheck,
      },
      {
        title: "Direkt schreiben",
        text: "Wenn Fläche, Frequenz, Fotos oder Zeitfenster schon vorliegen.",
        href: "/buchung?service=reinigung&region=duesseldorf#buchungssystem",
        label: "Daten senden",
        Icon: MessageCircle,
      },
    ],
  },
};

type FloxantNextStepPanelProps = {
  variant?: NextStepVariant;
  className?: string;
};

export function FloxantNextStepPanel({ variant = "booking", className }: FloxantNextStepPanelProps) {
  const config = germanizeDeep(panelConfigs[variant]) as PanelConfig;

  return (
    <section className={cn("relative px-4 py-10 sm:px-6 lg:py-14", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-48 max-w-5xl rounded-full bg-blue-300/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur md:rounded-[2.6rem] md:p-6 lg:p-8">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-60 w-60 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="relative grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <AnimateOnScroll className="flex h-full flex-col justify-between rounded-[1.7rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_20px_60px_rgba(15,23,42,0.14)] md:p-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">
                <CheckCircle2 className="h-4 w-4" />
                {config.eyebrow}
              </div>
              <h2 className="flox-gradient-title mt-5 max-w-[14ch] text-3xl font-bold leading-[1.02] tracking-[-0.025em] md:text-5xl">
                {config.title}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 md:text-base">
                {config.intro}
              </p>
            </div>

            <div className="flox-proof-rail mt-6 rounded-[1.35rem] border border-white/10 bg-white/8 p-4 pl-5 text-sm leading-6 text-slate-200">
              {config.signal}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={config.primaryHref}
                className="flox-magnetic-cta inline-flex min-h-12 items-center justify-center gap-2 rounded-[1.15rem] bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                {config.primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={config.secondaryHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[1.15rem] border border-white/16 bg-white/8 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/14"
              >
                {config.secondaryLabel}
              </Link>
            </div>
          </AnimateOnScroll>

          <div className="grid gap-3 md:grid-cols-3 lg:gap-4">
            {config.cards.map((card, index) => {
              const Icon = card.Icon;

              return (
                <AnimateOnScroll key={card.title} delay={index * 90} className="h-full">
                  <Link
                    href={card.href}
                    className="flox-click-card flox-card-lift group flex h-full min-h-[15rem] flex-col justify-between rounded-[1.55rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-700" />
                      </div>
                      <h3 className="mt-5 text-xl font-bold leading-tight tracking-[-0.02em] text-slate-950">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{card.text}</p>
                    </div>
                    <span className="mt-5 inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-blue-700">
                      {card.label}
                    </span>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
