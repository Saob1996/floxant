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
    eyebrow: "Nächster Schritt",
    title: "Schnell zur richtigen Anfrage.",
    intro:
      "Wählen Sie den Einstieg, der zu Ihrer Situation passt. FLOXANT fragt nur die Angaben ab, die für den nächsten Schritt wirklich helfen.",
    signal:
      "Ort, Termin, Umfang und Fotos reichen oft für die erste Einordnung. Danach melden wir uns mit der passenden Rückfrage oder dem nächsten Schritt.",
    primaryHref: "/buchung#buchungssystem",
    primaryLabel: "Anfrage senden",
    secondaryHref: "/rechner#rechner-wizard",
    secondaryLabel: "Kosten einschätzen",
    cards: [
      {
        title: "Anfrage senden",
        text: "Wenn Leistung, Ort und Termin grob klar sind.",
        href: "/buchung#buchungssystem",
        label: "Jetzt anfragen",
        Icon: ClipboardCheck,
      },
      {
        title: "Kosten einschätzen",
        text: "Wenn Umfang, Zugang oder Budget noch offen sind.",
        href: "/rechner#rechner-wizard",
        label: "Einschätzung starten",
        Icon: Calculator,
      },
      {
        title: "Fotos mitsenden",
        text: "Wenn Zustand, Menge oder Fläche sichtbar werden sollen.",
        href: "/buchung#buchungssystem",
        label: "Fotos anhängen",
        Icon: Camera,
      },
    ],
  },
  calculator: {
    eyebrow: "Kosten einschätzen",
    title: "Erst einordnen. Dann gezielt anfragen.",
    intro:
      "Die Einschätzung hilft, wenn noch nicht alles feststeht. Danach reichen Ort, Termin, Zugang, Fläche oder Volumen und ein paar Fotos.",
    signal:
      "So entsteht aus einer groben Idee eine Anfrage, die wir sinnvoll beantworten können.",
    primaryHref: "#rechner-wizard",
    primaryLabel: "Kosten einschätzen",
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
        text: "Wenn ein gewünschter Rahmen vorhanden ist und eingeordnet werden soll.",
        href: "/anfrage-mit-preisrahmen",
        label: "Budget senden",
        Icon: Banknote,
      },
      {
        title: "Express-Anfrage",
        text: "Wenn Termin, Zugang oder Übergabe kurzfristig geklärt werden müssen.",
        href: "/express-anfrage",
        label: "Express-Check",
        Icon: Zap,
      },
    ],
  },
  offer: {
    eyebrow: "Angebot prüfen",
    title: "Vorhandenes Angebot verständlich prüfen lassen.",
    intro:
      "Wenn ein Angebot einer anderen Firma unklar wirkt, prüfen wir Preis, Umfang, Termin, Fotos und Zusatzleistungen praktisch ein.",
    signal:
      "Sie sehen schneller, ob Leistungen fehlen, Kosten unklar sind oder der Umfang sauber beschrieben ist.",
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
        title: "Unklare Punkte finden",
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
    eyebrow: "Düsseldorf",
    title: "Reinigung anfragen. Klar getrennt.",
    intro:
      "Für Düsseldorf steht Reinigung im Mittelpunkt: Wohnungen, möblierte Apartments, Büros, Treppenhaus, Grundreinigung und B2B-Reinigung nach Absprache.",
    signal:
      "Düsseldorf bleibt sauber getrennt. Regensburg/Bayern bleibt der Kern für Umzug, Reinigung, Entrümpelung und Transport.",
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
        label: "Gewerbe anfragen",
        Icon: ClipboardCheck,
      },
      {
        title: "Direkt schreiben",
        text: "Wenn Fläche, Frequenz, Fotos oder Zeitfenster schon vorliegen.",
        href: "/buchung?service=reinigung&region=duesseldorf#buchungssystem",
        label: "Anfrage senden",
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
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_28px_90px_rgba(15,23,42,0.12)] md:p-4 lg:p-5">
        <div className="relative grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <AnimateOnScroll className="relative flex h-full min-h-[26rem] flex-col justify-between overflow-hidden rounded-[1.55rem] bg-slate-950 p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-7">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.24),transparent_30%),radial-gradient(circle_at_82%_78%,rgba(16,185,129,0.18),transparent_32%)]" />
            <div>
              <div className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-cyan-100">
                <CheckCircle2 className="h-4 w-4" />
                {config.eyebrow}
              </div>
              <h2 className="relative mt-5 max-w-[13ch] text-3xl font-black leading-tight text-white md:text-4xl">
                {config.title}
              </h2>
              <p className="relative mt-5 max-w-2xl text-sm font-semibold leading-7 text-slate-200 md:text-base">
                {config.intro}
              </p>
            </div>

            <div className="relative mt-6 rounded-[1.35rem] border border-white/10 bg-white/8 p-4 text-sm font-semibold leading-6 text-slate-200">
              {config.signal}
            </div>

            <div className="relative mt-5 grid gap-2 sm:grid-cols-2">
              {[
                "Region zuerst",
                "Leistung trennen",
                "Fotos erlauben",
                "Rückruf klären",
              ].map((signal) => (
                <div key={signal} className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-3 text-xs font-black text-slate-100">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>

            <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={config.primaryHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-200"
              >
                {config.primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={config.secondaryHref}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/8 px-5 py-3 text-sm font-black text-white transition hover:bg-white/14 focus:outline-none focus:ring-2 focus:ring-cyan-200"
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
                    className="group flex h-full min-h-[18rem] flex-col justify-between overflow-hidden rounded-[1.45rem] border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-[0_18px_45px_rgba(15,23,42,0.1)] focus:outline-none focus:ring-2 focus:ring-blue-500 md:min-h-[26rem] lg:min-h-[26rem]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-blue-100 bg-white text-blue-700 shadow-sm transition group-hover:bg-blue-600 group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-700" />
                      </div>
                      <h3 className="mt-5 text-2xl font-black leading-tight text-slate-950">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{card.text}</p>
                    </div>
                    <span className="mt-5 inline-flex min-h-10 w-fit items-center rounded-xl border border-blue-200 bg-white px-3 text-xs font-black text-blue-700 transition group-hover:border-blue-700 group-hover:bg-blue-700 group-hover:text-white">
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
