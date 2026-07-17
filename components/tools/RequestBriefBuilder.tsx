"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronLeft, Clipboard, FileText, RotateCcw } from "lucide-react";

import {
  getRequestBuilderFields,
  getRequestBuilderService,
  requestBuilderServices,
  type RequestBriefResult,
  type RequestBuilderLocale,
  type RequestBuilderRegion,
} from "@/lib/request-builder";

type RequestBriefBuilderProps = {
  locale: RequestBuilderLocale;
  contactHref: string;
  formTargetId?: string;
  onResultChange?: (result: RequestBriefResult) => void;
};

const handoffKey = "floxant:tool-handoff";

export function RequestBriefBuilder({ locale, contactHref, formTargetId, onResultChange }: RequestBriefBuilderProps) {
  const [step, setStep] = useState<"service" | "details" | "result">("service");
  const [region, setRegion] = useState<RequestBuilderRegion>("duesseldorf");
  const [serviceId, setServiceId] = useState("duesseldorf-cleaning");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const service = getRequestBuilderService(serviceId);
  const fields = useMemo(() => getRequestBuilderFields(service.group), [service.group]);
  const regionServices = requestBuilderServices.filter((item) => item.region === region);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const result = useMemo<RequestBriefResult>(() => {
    const serviceLabel = locale === "de" ? service.labelDe : service.labelEn;
    const openFields = fields.filter((field) => field.required && !answers[field.id]?.trim()).map((field) => locale === "de" ? field.labelDe : field.labelEn);
    const answerLines = fields
      .filter((field) => answers[field.id]?.trim())
      .map((field) => {
        const rawValue = answers[field.id];
        const selected = field.options?.find((option) => option.value === rawValue);
        const value = selected ? (locale === "de" ? selected.de : selected.en) : rawValue;
        return `- ${locale === "de" ? field.labelDe : field.labelEn}: ${value}`;
      });
    const regionLabel = region === "duesseldorf" ? "Düsseldorf" : "Regensburg";
    const summary = locale === "de" ? `${serviceLabel} in ${regionLabel}` : `${serviceLabel} in ${regionLabel}, Germany`;
    const brief = locale === "de"
      ? `FLOXANT Anfragebrief\nLeistung: ${serviceLabel}\nRegion: ${regionLabel}\n${answerLines.join("\n")}\nOffene Angaben: ${openFields.join(", ") || "keine Pflichtangabe offen"}`
      : `FLOXANT request brief\nService: ${serviceLabel}\nRegion: ${regionLabel}, Germany\n${answerLines.join("\n")}\nOpen details: ${openFields.join(", ") || "no required detail left open"}`;
    return { completed: step === "result", region, serviceId, serviceLabel, canonicalPath: service.canonicalPath, summary, brief, openFields };
  }, [answers, fields, locale, region, service, serviceId, step]);

  useEffect(() => {
    onResultChange?.(result);
  }, [onResultChange, result]);

  function chooseRegion(nextRegion: RequestBuilderRegion) {
    setRegion(nextRegion);
    const nextService = requestBuilderServices.find((item) => item.region === nextRegion)!;
    setServiceId(nextService.id);
    setAnswers({});
  }

  function updateAnswer(id: string, value: string) {
    setAnswers((current) => ({ ...current, [id]: value }));
    setCopied(false);
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(result.brief);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function prepareHandoff() {
    window.sessionStorage.setItem(handoffKey, result.brief);
    if (formTargetId) document.getElementById(formTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const t = locale === "de" ? {
    eyebrow: "FLOXANT Anfragebrief",
    choose: "Region und Leistung wählen",
    chooseIntro: "Wählen Sie nur Leistungen, die FLOXANT in der jeweiligen Region tatsächlich führt.",
    region: "Region",
    service: "Leistung",
    next: "Angaben ergänzen",
    details: "Leistungsanfrage beschreiben",
    detailsIntro: "Die Angaben bleiben in diesem Browser, bis Sie den Text kopieren oder ausdrücklich in ein Formular übernehmen.",
    back: "Zurück",
    create: "Anfragebrief erstellen",
    result: "Ihr strukturierter Anfragebrief",
    summary: "Kurzzusammenfassung",
    open: "Noch offene Angaben",
    none: "Keine Pflichtangabe offen.",
    copy: "Anfragebrief kopieren",
    copied: "Anfragebrief kopiert",
    handoff: formTargetId ? "In Formular übernehmen" : "Kontaktformular öffnen",
    servicePage: "Passende Leistungsseite",
    restart: "Neu beginnen",
    notice: "Keine Preisberechnung und keine Terminbestätigung. Erst das ausdrückliche Absenden eines vorhandenen Formulars überträgt Daten.",
  } : {
    eyebrow: "FLOXANT request brief",
    choose: "Choose the region and service",
    chooseIntro: "Only services actually listed for the selected FLOXANT region are shown.",
    region: "Region",
    service: "Service",
    next: "Add the details",
    details: "Describe the service request",
    detailsIntro: "The details stay in this browser until you copy the text or explicitly transfer it to a form.",
    back: "Back",
    create: "Create the request brief",
    result: "Your structured request brief",
    summary: "Short summary",
    open: "Open details",
    none: "No required detail is open.",
    copy: "Copy request brief",
    copied: "Request brief copied",
    handoff: formTargetId ? "Use in the form" : "Open the contact form",
    servicePage: "Relevant service page",
    restart: "Start again",
    notice: "No price calculation and no appointment confirmation. Data is sent only when you explicitly submit an existing form.",
  };

  if (step === "service") {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 sm:p-8" aria-labelledby="request-brief-service-title">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">{t.eyebrow}</p>
        <h2 id="request-brief-service-title" ref={headingRef} tabIndex={-1} className="mt-3 text-3xl font-black tracking-tight text-slate-950">{t.choose}</h2>
        <p className="mt-4 text-base leading-8 text-slate-700">{t.chooseIntro}</p>
        <fieldset className="mt-6"><legend className="text-sm font-black text-slate-950">{t.region}</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">{(["duesseldorf", "regensburg"] as const).map((item) => <label key={item} className={`cursor-pointer rounded-xl border p-4 font-black focus-within:ring-2 focus-within:ring-blue-500 ${region === item ? "border-blue-600 bg-blue-50 text-blue-950" : "border-slate-200"}`}><input type="radio" name="request-region" checked={region === item} onChange={() => chooseRegion(item)} className="mr-2" />{item === "duesseldorf" ? "Düsseldorf" : "Regensburg"}</label>)}</div></fieldset>
        <fieldset className="mt-6"><legend className="text-sm font-black text-slate-950">{t.service}</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">{regionServices.map((item) => <label key={item.id} className={`cursor-pointer rounded-xl border p-4 font-bold focus-within:ring-2 focus-within:ring-blue-500 ${serviceId === item.id ? "border-blue-600 bg-blue-50 text-blue-950" : "border-slate-200"}`}><input type="radio" name="request-service" checked={serviceId === item.id} onChange={() => { setServiceId(item.id); setAnswers({}); }} className="mr-2" />{locale === "de" ? item.labelDe : item.labelEn}</label>)}</div></fieldset>
        <button type="button" onClick={() => setStep("details")} className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white">{t.next}<ArrowRight className="h-4 w-4" /></button>
      </section>
    );
  }

  if (step === "details") {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 sm:p-8" aria-labelledby="request-brief-details-title">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">{t.eyebrow} · 2 / 3</p>
        <h2 id="request-brief-details-title" ref={headingRef} tabIndex={-1} className="mt-3 text-3xl font-black tracking-tight text-slate-950">{t.details}</h2>
        <p className="mt-4 text-base leading-8 text-slate-700">{t.detailsIntro}</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {fields.map((field) => {
            const label = locale === "de" ? field.labelDe : field.labelEn;
            const placeholder = locale === "de" ? field.placeholderDe : field.placeholderEn;
            const className = "min-h-12 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
            return <label key={field.id} className={`grid gap-2 text-sm font-black text-slate-800 ${field.type === "textarea" ? "md:col-span-2" : ""}`}><span>{label}{field.required ? " *" : ""}</span>{field.type === "select" ? <select value={answers[field.id] || ""} onChange={(event) => updateAnswer(field.id, event.target.value)} className={className}><option value="">{locale === "de" ? "Bitte wählen" : "Please select"}</option>{field.options?.map((option) => <option key={option.value} value={option.value}>{locale === "de" ? option.de : option.en}</option>)}</select> : field.type === "textarea" ? <textarea rows={4} value={answers[field.id] || ""} onChange={(event) => updateAnswer(field.id, event.target.value)} placeholder={placeholder} className={className} /> : <input type={field.type} value={answers[field.id] || ""} onChange={(event) => updateAnswer(field.id, event.target.value)} placeholder={placeholder} className={className} />}</label>;
          })}
        </div>
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-7 text-amber-950">{t.notice}</p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><button type="button" onClick={() => setStep("service")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 text-sm font-black"><ChevronLeft className="h-4 w-4" />{t.back}</button><button type="button" onClick={() => setStep("result")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white">{t.create}<FileText className="h-4 w-4" /></button></div>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 sm:p-8" aria-labelledby="request-brief-result-title" aria-live="polite">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">{t.eyebrow} · 3 / 3</p>
      <h2 id="request-brief-result-title" ref={headingRef} tabIndex={-1} className="mt-3 text-3xl font-black tracking-tight text-slate-950">{t.result}</h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-[0.7fr_1.3fr]"><article className="rounded-xl border border-blue-200 bg-blue-50 p-5"><h3 className="font-black text-blue-950">{t.summary}</h3><p className="mt-3 text-lg font-black text-blue-950">{result.summary}</p><h3 className="mt-5 font-black text-blue-950">{t.open}</h3>{result.openFields.length ? <ul className="mt-3 grid gap-2 text-sm text-blue-950">{result.openFields.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0" />{item}</li>)}</ul> : <p className="mt-3 text-sm text-blue-950">{t.none}</p>}</article><pre className="whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-950 p-5 text-sm font-semibold leading-7 text-slate-100">{result.brief}</pre></div>
      <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-7 text-amber-950">{t.notice}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><button type="button" onClick={copyBrief} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white"><Clipboard className="h-4 w-4" />{copied ? t.copied : t.copy}</button><a href={formTargetId ? `#${formTargetId}` : contactHref} onClick={prepareHandoff} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 text-sm font-black text-white">{t.handoff}<ArrowRight className="h-4 w-4" /></a><Link href={service.canonicalPath} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-black text-slate-800">{t.servicePage}</Link><button type="button" onClick={() => { setAnswers({}); setStep("service"); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 text-sm font-black text-slate-800"><RotateCcw className="h-4 w-4" />{t.restart}</button></div>
    </section>
  );
}
