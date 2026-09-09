import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleSlash2,
  FileSearch,
  Gauge,
  HelpCircle,
  PackageCheck,
  Puzzle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { getCombinedServiceStrategies } from "@/lib/combined-services";
import {
  buildServicePackageHref,
  getServicePackages,
  servicePackageGroups,
  type ServicePackage,
  type ServicePackageGroup,
} from "@/lib/service-packages";
import { buildLeadHref } from "@/lib/lead-intents";
import { germanizeText } from "@/lib/german-text";

type ServicePackageDecisionExperienceVariant =
  | "default"
  | "compact"
  | "duesseldorf"
  | "regensburg"
  | "contact"
  | "offer";

type ServicePackageDecisionExperienceProps = {
  variant?: ServicePackageDecisionExperienceVariant;
  heading?: string;
  intro?: string;
  groups?: ServicePackageGroup[];
  limitPerGroup?: number;
};

const defaultGroups: ServicePackageGroup[] = [
  "reinigung",
  "umzug",
  "entruempelung",
  "angebot-pruefen",
  "signature",
];

const groupLabels: Record<ServicePackageGroup, string> = {
  reinigung: "Reinigung",
  umzug: "Umzug",
  entruempelung: "Entrümpelung",
  "angebot-pruefen": "Angebot prüfen",
  signature: "Besondere Leistungen",
};

const variantCopy: Record<
  ServicePackageDecisionExperienceVariant,
  { eyebrow: string; heading: string; intro: string; comboLimit: number }
> = {
  default: {
    eyebrow: "Leistungen nach Situation",
    heading: "Welche Leistung passt zu Ihrer Situation?",
    intro:
      "Beschreiben Sie Ihre Situation und wählen Sie die passende Leistung, eine Kombination oder eine Angebotsprüfung.",
    comboLimit: 6,
  },
  compact: {
    eyebrow: "Welche Leistung passt?",
    heading: "Leistung, Kombination oder Angebotsprüfung wählen.",
    intro:
      "Die Übersicht zeigt, wann eine einzelne Leistung, eine Kombination oder besondere Unterstützung sinnvoll ist.",
    comboLimit: 4,
  },
  duesseldorf: {
    eyebrow: "Leistungen in Düsseldorf",
    heading: "Die passende Hilfe für Ihre Anfrage in Düsseldorf finden.",
    intro:
      "Wählen Sie Reinigung, Umzug, Räumung, Angebotsprüfung oder eine besondere Lösung passend zu Ihrer Situation.",
    comboLimit: 4,
  },
  regensburg: {
    eyebrow: "Leistungen in Regensburg",
    heading: "Reinigung, Umzug, Räumung und Übergabe passend auswählen.",
    intro:
      "Die Übersicht zeigt, welche Leistung zu Ihrem Vorhaben passt und welche Angaben wir für eine schnelle Rückmeldung brauchen.",
    comboLimit: 5,
  },
  contact: {
    eyebrow: "Vor dem Formular",
    heading: "Erst die passende Leistung klären, dann wenige Angaben senden.",
    intro:
      "Die Auswahl dient zur Orientierung. Ihre Angaben werden erst gesendet, wenn Sie das Formular abschicken.",
    comboLimit: 4,
  },
  offer: {
    eyebrow: "Angebot und Alternative",
    heading: "Angebotspruefung entscheidet, ob Service, Kombi-Fall oder Plan B passt.",
    intro:
      "Ein vorhandenes Angebot wird nach Umfang, Zusatzkosten, Fotos, Termin und realistischem naechsten Schritt sortiert.",
    comboLimit: 5,
  },
};

const effortSignals = [
  {
    title: "Ort und Gebiet",
    text: "Regensburg plus 75 km ist fuer Reinigung relevant; Transporte und Plan B werden nach Strecke und Kapazitaet geprueft.",
  },
  {
    title: "Umfang und Zustand",
    text: "Flaeche, Volumen, Menge, Verschmutzung, Restpunkte und Zielzustand entscheiden mehr als ein Service-Label.",
  },
  {
    title: "Zugang und Frist",
    text: "Etage, Aufzug, Laufweg, Schluesselweg, Haltezone und Deadline bestimmen, ob der Ablauf realistisch ist.",
  },
  {
    title: "Angebot oder Fotos",
    text: "Dokumente und Fotos sind optional, machen Preisrahmen, Rueckfragen und Kombi-Leistungen aber deutlich klarer.",
  },
] as const;

const betterServiceSuggestions = [
  {
    from: "Nur Preis vergleichen",
    to: "Angebot pruefen",
    reason: "Wenn bereits ein Angebot, Screenshot oder Preis vorliegt.",
    href: buildLeadHref({ service: "angebot-pruefen", intent: "preisrahmen-pruefen", priority: "p0" }),
  },
  {
    from: "Umzug mit Restwohnung",
    to: "Umzug + Endreinigung",
    reason: "Wenn nach Transport noch Uebergabe, Bad, Kueche, Fenster oder Restpunkte offen sind.",
    href: buildLeadHref({ service: "umzug", city: "regensburg", intent: "umzug-plus-endreinigung", priority: "p1" }),
  },
  {
    from: "Keller leer, Wohnung sauber",
    to: "Entruempelung + Reinigung",
    reason: "Wenn Menge, Entsorgung und Zielzustand zusammenhaengen.",
    href: buildLeadHref({ service: "entruempelung", city: "regensburg", intent: "entruempelung-plus-reinigung", priority: "p1" }),
  },
  {
    from: "Sensible Lage",
    to: "Diskret-Service",
    reason: "Wenn zuerst ein sicherer Kontaktweg und ruhige Abstimmung gebraucht werden.",
    href: buildLeadHref({ service: "diskret-service", intent: "diskret-service", priority: "p0" }),
  },
] as const;

function sortByPriority(items: ServicePackage[]) {
  const order = { p0: 0, p1: 1, p2: 2, p3: 3 };
  return [...items].sort((a, b) => order[a.priority] - order[b.priority] || a.title.localeCompare(b.title));
}

function getPackagesForGroup(group: ServicePackageGroup, limit: number) {
  return sortByPriority(getServicePackages(group)).slice(0, limit);
}

function contactHref(service: string, intent: string) {
  return buildLeadHref({ service, intent, priority: "p1" }, "/kontakt");
}

export function ServicePackageDecisionExperience({
  variant = "default",
  heading,
  intro,
  groups,
  limitPerGroup = 2,
}: ServicePackageDecisionExperienceProps) {
  const copy = variantCopy[variant];
  const activeGroups = groups && groups.length ? groups : defaultGroups;
  const combos = getCombinedServiceStrategies(copy.comboLimit);
  const signaturePackages = getPackagesForGroup("signature", 3);
  const offerPackage = getServicePackages("angebot-pruefen")[0];

  return (
    <section
      className="border-y border-slate-200 bg-slate-50 px-4 py-12 text-slate-950 sm:px-6 lg:px-10"
      data-component="ServicePackageDecisionExperience"
      data-variant={variant}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-blue-700">
              <PackageCheck className="h-4 w-4" aria-hidden="true" />
              {germanizeText(copy.eyebrow)}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl">
              {germanizeText(heading || copy.heading)}
            </h2>
          </div>
          <p className="max-w-3xl text-base font-semibold leading-8 text-slate-600 lg:text-right">
            {germanizeText(intro || copy.intro)}
          </p>
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
          <div data-component="PackageComparisonGrid" className="grid gap-4 md:grid-cols-2">
            {activeGroups.map((group) => {
              const groupInfo = servicePackageGroups[group];
              const packages = getPackagesForGroup(group, limitPerGroup);

              return (
                <article key={group} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
                        {germanizeText(groupLabels[group])}
                      </div>
                      <h3 className="mt-2 text-xl font-black tracking-normal text-slate-950">{germanizeText(groupInfo.title)}</h3>
                    </div>
                    <span className="rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-[10px] font-black uppercase text-blue-800">
                      {packages.length} Optionen
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{germanizeText(groupInfo.intro)}</p>

                  <div className="mt-5 grid gap-3">
                    {packages.map((item) => (
                      <div key={item.serviceKey} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-black text-slate-950">{germanizeText(item.title)}</h4>
                            <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                              {germanizeText(item.typischeKundensituation || item.shortDescription)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.typischeAufwandstreiber.slice(0, 3).map((factor) => (
                            <span key={factor} className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-700">
                              {germanizeText(factor)}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={buildServicePackageHref(item)}
                          className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-950 px-3 text-xs font-black text-white transition hover:bg-blue-800"
                          data-event="request_cta_click"
                          data-service={item.kontaktParameter.service}
                          data-cta-label={item.empfohlenerCTA}
                        >
                          {germanizeText(item.empfohlenerCTA)}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="grid content-start gap-4">
            <div data-component="EffortFactorsPanel" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-amber-700">
                <Gauge className="h-4 w-4" aria-hidden="true" />
                Aufwand transparent machen
              </p>
              <div className="mt-4 grid gap-3">
                {effortSignals.map((item) => (
                  <div key={item.title} className="rounded-lg border border-amber-100 bg-amber-50 p-3">
                    <h3 className="text-sm font-black text-amber-950">{germanizeText(item.title)}</h3>
                    <p className="mt-1 text-xs font-semibold leading-5 text-amber-950/80">{germanizeText(item.text)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div data-component="ServiceDecisionGuide" className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm shadow-slate-950/10">
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-cyan-200">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Entscheidungsgrenzen
              </p>
              <ul className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-slate-200">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  Reinigung wird für Regensburg plus 75 km sichtbar begrenzt.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  Anfragen aus Düsseldorf werden nach Leistung, Ort, Umfang und Termin geprüft.
                </li>
                <li className="flex gap-2">
                  <CircleSlash2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                  Keine Preisgarantie, keine Sofortzusage, keine Rechtsberatung.
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <div data-component="CombinationServicePanel" className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-blue-700">
                <Puzzle className="h-4 w-4" aria-hidden="true" />
                Kombi-Services
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
                Wenn eine einzelne Leistung nicht reicht.
              </h3>
            </div>
            <Link
              href={contactHref("sonstiges", "kombiservice-klaeren")}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-black text-slate-950 transition hover:border-blue-200 hover:bg-blue-50"
              data-event="request_cta_click"
              data-service="sonstiges"
            >
              Kombi-Fall senden
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {combos.map((item) => (
              <article key={item.key} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-lg font-black leading-snug text-slate-950">{germanizeText(item.title)}</h4>
                  <Sparkles className="h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{germanizeText(item.problem)}</p>
                <div className="mt-4 grid gap-2">
                  <p className="text-xs font-black uppercase tracking-normal text-slate-500">Nötige Angaben</p>
                  <div data-component="WhatWeNeedChecklist" className="flex flex-wrap gap-2">
                    {item.neededInputs.slice(0, 4).map((input) => (
                      <span key={input} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-700">
                        {germanizeText(input)}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-xs font-bold leading-5 text-emerald-950">
                  {germanizeText(item.areaNote)}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-950 px-3 text-xs font-black text-white transition hover:bg-blue-800"
                  data-event="request_cta_click"
                  data-service={item.contact.service}
                  data-city={item.contact.city || ""}
                  data-cta-label={item.contact.ctaLabel}
                >
                  {germanizeText(item.contact.ctaLabel)}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
          <div data-component="BetterServiceSuggestion" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-blue-700">
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              Passende Anfrage
            </p>
            <div className="mt-4 grid gap-3">
              {betterServiceSuggestions.map((item) => (
                <Link
                  key={item.from}
                  href={item.href}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                  data-event="service_card_click"
                  data-source="better_service_suggestion"
                >
                  <div className="text-sm font-black text-slate-950">
                    {`${germanizeText(item.from)} -> ${germanizeText(item.to)}`}
                  </div>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">{germanizeText(item.reason)}</p>
                </Link>
              ))}
            </div>
          </div>

          <div data-component="SignatureServiceSuggestion" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-blue-700">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Besondere Empfehlungen
            </p>
            <div className="mt-4 grid gap-3">
              {signaturePackages.map((item) => (
                <Link
                  key={item.serviceKey}
                  href={buildServicePackageHref(item)}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                  data-event="service_card_click"
                  data-source="signature_service_suggestion"
                >
                  <div className="text-sm font-black text-slate-950">{germanizeText(item.title)}</div>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">{germanizeText(item.shortDescription)}</p>
                </Link>
              ))}
            </div>
          </div>

          <div data-component="OfferCheckInlineBox" className="rounded-lg border border-blue-200 bg-blue-50 p-5 shadow-sm shadow-slate-950/5">
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-blue-800">
              <FileSearch className="h-4 w-4" aria-hidden="true" />
              Angebotscheck
            </p>
            <h3 className="mt-3 text-xl font-black tracking-normal text-blue-950">
              Wenn schon ein Preis oder Angebot vorliegt.
            </h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-blue-950/80">
              Dann ist nicht die größte Service-Liste entscheidend, sondern Umfang, Zusatzkosten, Fotos, Termin und offene Rückfragen.
            </p>
            <Link
              href={offerPackage ? buildServicePackageHref(offerPackage) : buildLeadHref({ service: "angebot-pruefen", intent: "angebot-pruefen", priority: "p0" })}
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 text-sm font-black text-white transition hover:bg-slate-950"
              data-event="request_cta_click"
              data-service="angebot-pruefen"
            >
              Angebot prüfen lassen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
