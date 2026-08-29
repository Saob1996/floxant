"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronLeft, Compass, RotateCcw } from "lucide-react";

import { FinderSelect } from "@/components/tools/FinderSelect";
import {
  resolveServiceFinder,
  type ServiceFinderCadence,
  type ServiceFinderContext,
  type ServiceFinderInput,
  type ServiceFinderJob,
  type ServiceFinderLocale,
  type ServiceFinderOffer,
  type ServiceFinderRegion,
} from "@/lib/service-finder";

type Step = "region" | "details" | "result";

export function ServiceFinderTool({ locale }: { locale: ServiceFinderLocale }) {
  const [step, setStep] = useState<Step>("region");
  const [region, setRegion] = useState<ServiceFinderRegion>("duesseldorf");
  const [job, setJob] = useState<ServiceFinderJob>("cleaning");
  const [context, setContext] = useState<ServiceFinderContext>("private");
  const [cadence, setCadence] = useState<ServiceFinderCadence>("once");
  const [offer, setOffer] = useState<ServiceFinderOffer>("no");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const result = useMemo(
    () => resolveServiceFinder({ region, job, context, cadence, offer } satisfies ServiceFinderInput, locale),
    [cadence, context, job, locale, offer, region],
  );
  const isGerman = locale === "de";

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const labels = isGerman ? {
    name: "FLOXANT Leistungsfinder",
    regionTitle: "In welcher Region liegt der Auftrag?",
    regionIntro: "Die Region entscheidet, welche FLOXANT-Leistungen sachlich vorgeschlagen werden können.",
    next: "Leistung eingrenzen",
    detailsTitle: "Was soll erledigt werden?",
    job: "Aufgabenart",
    context: "Objekt oder Auftrag",
    cadence: "Häufigkeit",
    offer: "Vorhandenes Angebot",
    result: "Ihre Einordnung",
    back: "Zurück",
    show: "Ergebnis anzeigen",
    related: "Verwandte Leistungen",
    required: "Diese Angaben helfen für den nächsten Schritt",
    canonical: "Hauptleistung ansehen",
    restart: "Neu beginnen",
  } : {
    name: "FLOXANT Service Finder",
    regionTitle: "Which region is the request in?",
    regionIntro: "The region determines which FLOXANT services can be suggested accurately.",
    next: "Narrow down the service",
    detailsTitle: "What needs to be done?",
    job: "Type of work",
    context: "Property or request",
    cadence: "Frequency",
    offer: "Existing quote",
    result: "Your service match",
    back: "Back",
    show: "Show the result",
    related: "Related services",
    required: "Details that help with the next step",
    canonical: "View the main service",
    restart: "Start again",
  };

  if (step === "region") {
    const options: readonly { value: ServiceFinderRegion; label: string }[] = [
      { value: "duesseldorf", label: "Düsseldorf" },
      { value: "regensburg", label: "Regensburg" },
      { value: "outside", label: isGerman ? "Andere Region" : "Another region" },
    ];
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 sm:p-8" aria-labelledby="service-finder-region-title">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">{labels.name} · 1 / 3</p>
        <h2 id="service-finder-region-title" ref={headingRef} tabIndex={-1} className="mt-3 text-3xl font-black tracking-tight text-slate-950">{labels.regionTitle}</h2>
        <p className="mt-4 text-base leading-8 text-slate-700">{labels.regionIntro}</p>
        <fieldset className="mt-7 grid gap-3 sm:grid-cols-3">
          <legend className="sr-only">{labels.regionTitle}</legend>
          {options.map((option) => (
            <label key={option.value} className={`cursor-pointer rounded-xl border p-4 font-black focus-within:ring-2 focus-within:ring-blue-500 ${region === option.value ? "border-blue-600 bg-blue-50 text-blue-950" : "border-slate-200"}`}>
              <input type="radio" name="finder-region" checked={region === option.value} onChange={() => setRegion(option.value)} className="mr-2" />
              {option.label}
            </label>
          ))}
        </fieldset>
        <button type="button" onClick={() => setStep("details")} className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white">{labels.next}<ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
      </section>
    );
  }

  if (step === "details") {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 sm:p-8" aria-labelledby="service-finder-details-title">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">{labels.name} · 2 / 3</p>
        <h2 id="service-finder-details-title" ref={headingRef} tabIndex={-1} className="mt-3 text-3xl font-black tracking-tight text-slate-950">{labels.detailsTitle}</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <FinderSelect label={labels.job} value={job} onChange={(value) => setJob(value as ServiceFinderJob)} options={[
            ["cleaning", isGerman ? "Reinigung" : "Cleaning"], ["moving", isGerman ? "Umzug" : "Moving"], ["clearance", isGerman ? "Räumung oder Entrümpelung" : "Clearance"],
          ]} />
          <FinderSelect label={labels.context} value={context} onChange={(value) => setContext(value as ServiceFinderContext)} options={[
            ["private", isGerman ? "Privat" : "Private"], ["business", isGerman ? "Gewerblich" : "Business"],
          ]} />
          <FinderSelect label={labels.cadence} value={cadence} onChange={(value) => setCadence(value as ServiceFinderCadence)} options={[
            ["once", isGerman ? "Einmalig" : "One-off"], ["recurring", isGerman ? "Regelmäßig" : "Recurring"],
          ]} />
          <FinderSelect label={labels.offer} value={offer} onChange={(value) => setOffer(value as ServiceFinderOffer)} options={[
            ["no", isGerman ? "Noch kein Angebot" : "No quote yet"], ["yes", isGerman ? "Angebot liegt vor" : "A quote is available"],
          ]} />
        </div>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button type="button" onClick={() => setStep("region")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 text-sm font-black"><ChevronLeft className="h-4 w-4" aria-hidden="true" />{labels.back}</button>
          <button type="button" onClick={() => setStep("result")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white">{labels.show}<Compass className="h-4 w-4" aria-hidden="true" /></button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 sm:p-8" aria-labelledby="service-finder-result-title" aria-live="polite">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">{labels.name} · 3 / 3</p>
      <h2 id="service-finder-result-title" ref={headingRef} tabIndex={-1} className="mt-3 text-3xl font-black tracking-tight text-slate-950">{labels.result}</h2>
      <article className={`mt-6 rounded-xl border p-5 ${result.supported ? "border-blue-200 bg-blue-50" : "border-amber-200 bg-amber-50"}`}>
        <h3 className="text-xl font-black text-slate-950">{result.title}</h3>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{result.explanation}</p>
      </article>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {result.related.length ? <section className="rounded-xl border border-slate-200 p-5"><h3 className="font-black text-slate-950">{labels.related}</h3><ul className="mt-4 grid gap-3">{result.related.map((item) => <li key={item.href}><Link href={item.href} className="inline-flex items-center gap-2 font-bold text-blue-700 hover:underline">{item.label}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></li>)}</ul></section> : null}
        <section className="rounded-xl border border-slate-200 p-5"><h3 className="font-black text-slate-950">{labels.required}</h3><ul className="mt-4 grid gap-3 text-sm font-semibold text-slate-700">{result.requiredDetails.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />{item}</li>)}</ul></section>
      </div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href={result.primaryCta.href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white">{result.primaryCta.label}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        {result.canonical ? <Link href={result.canonical.href} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-700 px-5 text-sm font-black text-white">{labels.canonical}</Link> : null}
        <button type="button" onClick={() => setStep("details")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 text-sm font-black"><ChevronLeft className="h-4 w-4" aria-hidden="true" />{labels.back}</button>
        <button type="button" onClick={() => { setRegion("duesseldorf"); setJob("cleaning"); setContext("private"); setCadence("once"); setOffer("no"); setStep("region"); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 text-sm font-black"><RotateCcw className="h-4 w-4" aria-hidden="true" />{labels.restart}</button>
      </div>
    </section>
  );
}
