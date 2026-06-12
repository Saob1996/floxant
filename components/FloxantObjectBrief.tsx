import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Clock3,
  FileText,
  KeyRound,
  MapPin,
  MessageCircle,
  WalletCards,
} from "lucide-react";

import { company } from "@/lib/company";
import { cn } from "@/lib/utils";
import { buildWhatsAppHref } from "@/lib/whatsapp";

type ObjectBriefVariant = "homepage" | "duesseldorf" | "regensburg";

type FloxantObjectBriefProps = {
  variant?: ObjectBriefVariant;
  className?: string;
};

const objectBriefConfig = {
  homepage: {
    region: "duesseldorf-regensburg",
    badge: "FLOXANT Objektbrief",
    title: "Ein guter Auftrag beginnt mit einem klaren Bild.",
    intro:
      "Der Objektbrief ist der kurze FLOXANT-Einstieg für eine bessere Anfrage: Ziel, Fotos, Zugang, Termin und Budgetrahmen werden gemeinsam betrachtet, bevor ein Auftrag geplant wird.",
    audience: "Für Reinigung in Düsseldorf sowie Umzug, Entrümpelung und Übergabe in Regensburg.",
    primaryHref: "/objektbrief#schnellstart",
    primaryLabel: "Objektbrief starten",
    secondaryHref: "/angebot-vergleichen-duesseldorf",
    secondaryLabel: "Angebot prüfen lassen",
    whatsappMessage: [
      "Hallo FLOXANT,",
      "ich möchte einen Objektbrief senden.",
      "Region:",
      "Leistung:",
      "Ort / PLZ:",
      "Termin / Deadline:",
      "Zugang / Ansprechpartner:",
      "Budgetrahmen, falls vorhanden:",
      "Fotos oder Angebot kann ich senden.",
    ].join("\n"),
  },
  duesseldorf: {
    region: "duesseldorf",
    badge: "Objektbrief Düsseldorf",
    title: "Reinigung mit klaren Angaben anfragen.",
    intro:
      "Für Büro, Praxis, Treppenhaus, Wohnung oder Gewerbefläche zählt nicht nur die Fläche. Fotos, Zugang, Termin, Zustand und Budget zeigen schneller, welcher Reinigungsumfang realistisch ist.",
    audience: "Für Gewerbereinigung, Büroreinigung, Praxisreinigung, Endreinigung und Angebotsprüfung.",
    primaryHref: "/objektbrief#schnellstart",
    primaryLabel: "Objektbrief ausfüllen",
    secondaryHref: "/angebot-vergleichen-duesseldorf",
    secondaryLabel: "Angebot prüfen lassen",
    whatsappMessage: [
      "Hallo FLOXANT Reinigung Düsseldorf,",
      "ich möchte einen Objektbrief für Reinigung senden.",
      "Objektart:",
      "Ort / PLZ:",
      "Fläche / Räume:",
      "Termin / Deadline:",
      "Zugang / Schlüsselweg:",
      "Budgetrahmen, falls vorhanden:",
      "Fotos oder ein vorhandenes Angebot kann ich senden.",
    ].join("\n"),
  },
  regensburg: {
    region: "regensburg",
    badge: "Objektbrief Regensburg",
    title: "Umzug, Räumung und Übergabe klar vorbereiten.",
    intro:
      "Bei Wohnungswechsel, Entrümpelung, Haushaltsauflösung oder Übergabe hilft ein kurzer Objektbrief: Was ist offen, welche Fotos gibt es, wann muss es fertig sein und wer entscheidet?",
    audience: "Für Umzug, Entrümpelung, Haushaltsauflösung, Endreinigung und Übergabevorbereitung.",
    primaryHref: "/objektbrief#schnellstart",
    primaryLabel: "Objektbrief ausfüllen",
    secondaryHref: "/regensburg/uebergabereinigung",
    secondaryLabel: "Übergabe vorbereiten",
    whatsappMessage: [
      "Hallo FLOXANT Regensburg,",
      "ich möchte einen Objektbrief senden.",
      "Leistung: Umzug / Entrümpelung / Haushaltsauflösung / Endreinigung / Übergabe",
      "Ort / PLZ:",
      "Objektart:",
      "Termin / Deadline:",
      "Zugang / Schlüsselweg:",
      "Budgetrahmen, falls vorhanden:",
      "Fotos kann ich senden.",
    ].join("\n"),
  },
} satisfies Record<ObjectBriefVariant, {
  region: string;
  badge: string;
  title: string;
  intro: string;
  audience: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  whatsappMessage: string;
}>;

const briefInputs = [
  {
    title: "Ziel",
    text: "Was soll am Ende erreicht sein: saubere Fläche, Übergabe, Räumung, Einzug oder laufender Betrieb?",
    Icon: BadgeCheck,
  },
  {
    title: "Fotos",
    text: "Räume, Böden, Laufwege, Treppenhaus, Keller, Müllbereich oder Problemstellen kurz zeigen.",
    Icon: Camera,
  },
  {
    title: "Zugang",
    text: "Schlüsselweg, Etage, Aufzug, Parken, Ansprechpartner und besondere Zugangszeiten nennen.",
    Icon: KeyRound,
  },
  {
    title: "Termin",
    text: "Wunschtermin, Deadline, Übergabe, Randzeit oder kurzfristigen Druck offen angeben.",
    Icon: Clock3,
  },
  {
    title: "Budget",
    text: "Ein Preisrahmen hilft bei der Einordnung. Er ist keine Garantie und kein Druckmittel.",
    Icon: WalletCards,
  },
] as const;

const briefOutputs = [
  "Welche Leistung passt wirklich?",
  "Welche Angaben fehlen noch?",
  "Was ist realistisch machbar?",
  "Welcher nächste Schritt ist sinnvoll?",
] as const;

export function FloxantObjectBrief({ variant = "homepage", className }: FloxantObjectBriefProps) {
  const config = objectBriefConfig[variant];
  const whatsappHref = buildWhatsAppHref(company.phoneRaw, config.whatsappMessage);

  return (
    <section className={cn("bg-white px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <article className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:p-8">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(16,185,129,0.10),transparent)]" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/25 bg-cyan-300/10 px-3 py-2 text-xs font-black uppercase tracking-normal text-cyan-100">
                <FileText className="h-4 w-4" aria-hidden="true" />
                {config.badge}
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-normal sm:text-5xl">
                {config.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-200">
                {config.intro}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                {config.audience}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                  data-event="whatsapp_click"
                  data-region={config.region}
                  data-source="floxant_object_brief"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Objektbrief per WhatsApp
                </a>
                <Link
                  href={config.primaryHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
                  data-event="hero_cta_click"
                  data-region={config.region}
                  data-source="floxant_object_brief"
                >
                  {config.primaryLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={config.secondaryHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
                  data-event="service_card_click"
                  data-region={config.region}
                  data-source="floxant_object_brief"
                >
                  {config.secondaryLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>

          <div className="grid gap-4">
            <article className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Was in den Objektbrief gehört
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 2xl:grid-cols-5">
                {briefInputs.map(({ title, text, Icon }) => (
                  <div key={title} className="min-w-0 rounded-lg border border-slate-200 bg-white p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <h3 className="mt-3 text-base font-black text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="grid gap-4 rounded-lg border border-blue-100 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_66%,#f8fafc_100%)] p-5 shadow-sm md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                  Das macht den Unterschied
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
                  Keine blinde Preiszusage. Erst ein klares Bild.
                </h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                  Der Objektbrief hilft, die Anfrage von Anfang an verständlich zu machen:
                  weniger Missverständnisse, bessere Rückfragen und ein nächster Schritt, der
                  zum Objekt und zur Situation passt.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {briefOutputs.map((item) => (
                  <div key={item} className="rounded-lg border border-blue-100 bg-white px-4 py-3 text-sm font-black leading-6 text-slate-800">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
