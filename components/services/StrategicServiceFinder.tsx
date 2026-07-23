"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RotateCcw, ShieldCheck } from "lucide-react";

export type FinderService = {
  id: string;
  title: string;
  description: string;
  category: "cleaning" | "moving" | "clearance" | "offer_check";
  regions: string[];
  audiences: ("private" | "business")[];
  cadence: "one_off" | "recurring" | "both";
  objectTypes: string[];
  requiredDetails: string[];
  canonicalRoute: string;
  ctaHref: string;
  faqLinks: { href: string; label: string }[];
  articleLinks: { href: string; label: string }[];
};

export type FinderSignature = {
  id: string;
  title: string;
  problem: string;
  serviceIds: string[];
  regions: string[];
  canonicalRoute: string;
};

type Answers = {
  region: string;
  audience: "private" | "business" | "";
  category: FinderService["category"] | "";
  cadence: "one_off" | "recurring" | "";
  objectType: string;
  situation: "standard" | "deadline" | "sensitive" | "combined" | "";
  specialRequirements: string[];
  hasOffer: "yes" | "no" | "";
  hasPhotos: "yes" | "no" | "";
  nextStep: "enquiry" | "information" | "quote_review" | "";
};

const initialAnswers: Answers = {
  region: "",
  audience: "",
  category: "",
  cadence: "",
  objectType: "",
  situation: "",
  specialRequirements: [],
  hasOffer: "",
  hasPhotos: "",
  nextStep: "",
};

export function StrategicServiceFinder({
  services,
  signatures,
  locale,
}: {
  services: readonly FinderService[];
  signatures: readonly FinderSignature[];
  locale: "de" | "en";
}) {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const questionRef = useRef<HTMLLegendElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const previousStepRef = useRef(step);
  const previousCompletedRef = useRef(completed);

  useEffect(() => {
    const stepChanged = previousStepRef.current !== step;
    const completionChanged = previousCompletedRef.current !== completed;
    previousStepRef.current = step;
    previousCompletedRef.current = completed;

    if (completed && completionChanged) resultHeadingRef.current?.focus();
    else if (!completed && (stepChanged || completionChanged)) questionRef.current?.focus();
  }, [completed, step]);

  const copy = locale === "de" ? deCopy : enCopy;
  const objectOptions = useMemo(() => [...new Set(services.flatMap((service) => service.objectTypes))].slice(0, 12), [services]);

  const steps = [
    { key: "region", title: copy.region, options: [...new Set(services.flatMap((service) => service.regions))].map((value) => ({ value, label: value })) },
    { key: "audience", title: copy.audience, options: [{ value: "private", label: copy.private }, { value: "business", label: copy.business }] },
    { key: "category", title: copy.category, options: [{ value: "cleaning", label: copy.cleaning }, { value: "moving", label: copy.moving }, { value: "clearance", label: copy.clearance }, { value: "offer_check", label: copy.offer }] },
    { key: "cadence", title: copy.cadence, options: [{ value: "one_off", label: copy.oneOff }, { value: "recurring", label: copy.recurring }] },
    { key: "objectType", title: copy.objectType, options: objectOptions.map((value) => ({ value, label: value })) },
    { key: "situation", title: copy.situation, options: [{ value: "standard", label: copy.standard }, { value: "deadline", label: copy.deadline }, { value: "sensitive", label: copy.sensitive }, { value: "combined", label: copy.combined }] },
    { key: "specialRequirements", title: copy.requirements, options: [{ value: "access", label: copy.access }, { value: "handover", label: copy.handover }, { value: "coordination", label: copy.coordination }, { value: "none", label: copy.none }], multi: true },
    { key: "hasOffer", title: copy.hasOffer, options: [{ value: "yes", label: copy.yes }, { value: "no", label: copy.no }] },
    { key: "hasPhotos", title: copy.hasPhotos, options: [{ value: "yes", label: copy.yes }, { value: "no", label: copy.no }] },
    { key: "nextStep", title: copy.nextStep, options: [{ value: "enquiry", label: copy.enquiry }, { value: "information", label: copy.information }, { value: "quote_review", label: copy.quoteReview }] },
  ] as const;

  const result = useMemo(() => {
    const eligibleServices = services.filter((service) => {
      if (answers.region && !service.regions.includes(answers.region)) return false;
      if (answers.audience && !service.audiences.includes(answers.audience)) return false;
      if (answers.cadence && service.cadence !== "both" && service.cadence !== answers.cadence) return false;
      return true;
    });
    const candidates = answers.category
      ? eligibleServices.filter((service) => service.category === answers.category)
      : eligibleServices;
    const ranked = candidates.map((service) => {
      let score = 0;
      if (answers.objectType && service.objectTypes.includes(answers.objectType)) score += 2;
      if (answers.hasOffer === "yes" && service.category === "offer_check") score += 6;
      if (answers.nextStep === "quote_review" && service.category === "offer_check") score += 8;
      return { service, score };
    }).sort((a, b) => b.score - a.score || a.service.title.localeCompare(b.service.title, locale));
    const primary = ranked[0]?.service;
    const addOn = answers.situation === "combined"
      ? eligibleServices.find((service) => service.id !== primary?.id && service.category !== primary?.category && service.category !== "offer_check")
      : undefined;
    const eligibleSignatures = signatures.filter((item) => !answers.region || item.regions.includes(answers.region));
    const signature = eligibleSignatures.find((item) => {
      if (answers.hasOffer === "yes" && /offer|angebot|quote/i.test(`${item.id} ${item.title}`)) return true;
      if (answers.situation === "sensitive" && /diskret|sensitive/i.test(`${item.id} ${item.title}`)) return true;
      if (answers.situation === "deadline" && /plan|uebergabe|handover/i.test(`${item.id} ${item.title}`)) return true;
      if (answers.specialRequirements.includes("handover") && /uebergabe|handover/i.test(`${item.id} ${item.title}`)) return true;
      return primary ? item.serviceIds.includes(primary.id) : false;
    });
    const requiredDetails = [
      ...(primary?.requiredDetails ?? []),
      ...(answers.hasPhotos === "no" ? [copy.photosReminder] : []),
    ];
    const requirementLabels: Record<string, string> = {
      access: copy.access,
      handover: copy.handover,
      coordination: copy.coordination,
    };
    const requirements = answers.specialRequirements
      .filter((item) => item !== "none")
      .map((item) => requirementLabels[item] ?? item);
    return { primary, addOn, signature, requiredDetails, requirements };
  }, [answers, copy, locale, services, signatures]);

  const current = steps[step];
  const currentValue = answers[current.key as keyof Answers];
  const hasAnswer = Array.isArray(currentValue) ? currentValue.length > 0 : Boolean(currentValue);

  function select(value: string, multi = false) {
    const key = current.key as keyof Answers;
    if (multi) {
      setAnswers((currentAnswers) => {
        const selected = currentAnswers.specialRequirements;
        const nextValue = value === "none"
          ? ["none"]
          : selected.includes(value)
            ? selected.filter((item) => item !== value)
            : [...selected.filter((item) => item !== "none"), value];
        return { ...currentAnswers, [key]: nextValue };
      });
      return;
    }
    setAnswers((currentAnswers) => ({ ...currentAnswers, [key]: value } as Answers));
  }

  function next() {
    if (!hasAnswer) return;
    if (step === steps.length - 1) { setCompleted(true); return; }
    setStep((currentStep) => currentStep + 1);
  }

  function reset() {
    setAnswers(initialAnswers);
    setStep(0);
    setCompleted(false);
  }

  if (completed && !result.primary) {
    return (
      <section className="rounded-3xl border border-amber-300 bg-amber-50 p-5 text-amber-950 sm:p-8">
        <h2 ref={resultHeadingRef} tabIndex={-1} className="text-2xl font-black outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-600">{copy.noMatchTitle}</h2>
        <p className="mt-3 max-w-3xl font-medium leading-7">{copy.noMatchText}</p>
        <button type="button" onClick={reset} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-amber-950 outline-none focus-visible:ring-2 focus-visible:ring-amber-700">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />{copy.restart}
        </button>
      </section>
    );
  }

  if (completed && result.primary) {
    return (
      <section className="rounded-3xl border border-cyan-300 bg-white p-5 shadow-sm sm:p-8">
        <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-cyan-900"><ShieldCheck className="h-5 w-5" aria-hidden="true" />{copy.result}</p>
        <h2 ref={resultHeadingRef} tabIndex={-1} className="mt-3 text-3xl font-black text-slate-950 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-600">{result.primary.title}</h2>
        <p className="mt-3 max-w-3xl font-medium leading-7 text-slate-700">{result.primary.description}</p>
        <p className="mt-6 text-sm font-black uppercase tracking-[0.1em] text-slate-600">{copy.required}</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">{result.requiredDetails.slice(0, 7).map((item) => <li key={item} className="flex gap-2 font-medium text-slate-800"><Check className="h-5 w-5 shrink-0 text-cyan-800" aria-hidden="true" />{item}</li>)}</ul>
        {result.requirements.length ? <p className="mt-5 font-medium text-slate-700"><span className="font-black text-slate-950">{copy.selectedRequirements}:</span> {result.requirements.join(" · ")}</p> : null}
        {result.signature ? <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white"><p className="text-xs font-black uppercase tracking-[0.1em] text-cyan-200">{copy.signature}</p><h3 className="mt-2 text-xl font-black">{result.signature.title}</h3><p className="mt-2 text-sm font-medium leading-6 text-slate-200">{result.signature.problem}</p><Link href={result.signature.canonicalRoute} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-slate-950">{copy.open}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div> : null}
        {result.addOn ? <p className="mt-5 font-medium text-slate-700"><span className="font-black text-slate-950">{copy.addOn}:</span> {result.addOn.title}</p> : null}
        <div className="mt-7 grid gap-3 sm:grid-cols-2"><Link href={result.primary.ctaHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 text-sm font-black text-slate-950 outline-none hover:bg-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-700">{copy.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href={result.primary.canonicalRoute} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-black text-slate-950 outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-cyan-600">{copy.details}</Link></div>
        <button type="button" onClick={reset} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-black text-blue-800 outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-cyan-600"><RotateCcw className="h-4 w-4" aria-hidden="true" />{copy.restart}</button>
        <p className="mt-5 text-xs font-medium leading-5 text-slate-600">{copy.privacy}</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="flex items-center justify-between gap-4"><p className="text-sm font-black text-cyan-900">{copy.step} {step + 1}/{steps.length}</p><div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200" aria-hidden="true"><div className="h-full rounded-full bg-cyan-600 transition-[width] motion-reduce:transition-none" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div></div>
      <fieldset className="mt-6 min-w-0 border-0 p-0">
        <legend ref={questionRef} tabIndex={-1} className="text-2xl font-black text-slate-950 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-600 sm:text-3xl">{current.title}</legend>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {current.options.map((option) => {
            const selected = Array.isArray(currentValue) ? currentValue.includes(option.value) : currentValue === option.value;
            return <button key={option.value} type="button" aria-pressed={selected} onClick={() => select(option.value, "multi" in current && current.multi)} className={`min-h-14 rounded-2xl border px-4 py-3 text-left font-bold outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 ${selected ? "border-cyan-700 bg-cyan-50 text-cyan-950" : "border-slate-300 bg-white text-slate-800 hover:border-cyan-500 hover:bg-slate-50"}`}>{option.label}</button>;
          })}
        </div>
      </fieldset>
      <div className="mt-7 flex items-center justify-between gap-3"><button type="button" disabled={step === 0} onClick={() => setStep((currentStep) => Math.max(0, currentStep - 1))} className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 text-sm font-black text-slate-700 outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-cyan-600 disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{copy.back}</button><button type="button" disabled={!hasAnswer} onClick={next} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white outline-none hover:bg-blue-900 focus-visible:ring-2 focus-visible:ring-cyan-600 disabled:cursor-not-allowed disabled:opacity-40">{step === steps.length - 1 ? copy.show : copy.continue}<ArrowRight className="h-4 w-4" aria-hidden="true" /></button></div>
      <p className="mt-5 text-xs font-medium leading-5 text-slate-600">{copy.privacy}</p>
    </section>
  );
}

const deCopy = {
  region: "In welcher Region liegt der Auftrag?", audience: "Ist die Anfrage privat oder gewerblich?", category: "Worum geht es hauptsächlich?", cadence: "Einmalig oder regelmäßig?", objectType: "Welche Objektart passt am besten?", situation: "Welche Situation beschreibt den Auftrag?", requirements: "Was ist besonders wichtig?", hasOffer: "Liegt bereits ein Angebot vor?", hasPhotos: "Sind Fotos vorhanden?", nextStep: "Was ist der gewünschte nächste Schritt?", private: "Privat", business: "Gewerblich", cleaning: "Reinigung", moving: "Umzug oder Transport", clearance: "Räumung oder Auflösung", offer: "Angebot prüfen", oneOff: "Einmalig", recurring: "Regelmäßig", standard: "Normal planbarer Auftrag", deadline: "Frist oder kurzfristige Änderung", sensitive: "Sensible oder diskrete Situation", combined: "Mehrere Leistungen kombinieren", access: "Zugang, Schlüssel oder Alarm", handover: "Übergabe oder Auszug", coordination: "Mehrere Beteiligte koordinieren", none: "Keine besondere Anforderung", yes: "Ja", no: "Nein", enquiry: "Anfrage vorbereiten", information: "Erst Leistung verstehen", quoteReview: "Vorhandenes Angebot prüfen", result: "Unverbindliche Orientierung", required: "Angaben für den nächsten Schritt", signature: "Passende besondere Lösung", addOn: "Mögliche Ergänzung", open: "Mehr erfahren", cta: "Anfrage vorbereiten", details: "Leistungsseite öffnen", restart: "Neu starten", privacy: "Alle Antworten bleiben ausschließlich in diesem Browser. Es wird nichts gespeichert oder übertragen, bevor Sie selbst einen Kontaktweg öffnen und Angaben absenden.", step: "Schritt", back: "Zurück", continue: "Weiter", show: "Empfehlung anzeigen",
  noMatchTitle: "Für diese Kombination ist keine bestätigte Leistung hinterlegt.",
  noMatchText: "Der Service Finder empfiehlt keine andere Region und erfindet keine Verfügbarkeit. Ändern Sie Ihre Auswahl oder öffnen Sie den Leistungskatalog.",
  photosReminder: "Fotos nach Möglichkeit ergänzen",
  selectedRequirements: "Berücksichtigte Anforderungen",
} as const;

const enCopy = {
  region: "Which region is the service for?", audience: "Is this a private or business enquiry?", category: "What is the main task?", cadence: "One-off or recurring?", objectType: "Which property type fits best?", situation: "Which situation best describes the task?", requirements: "What needs particular attention?", hasOffer: "Do you already have a quote?", hasPhotos: "Are photos available?", nextStep: "What would you like to do next?", private: "Private", business: "Business", cleaning: "Cleaning", moving: "Moving or transport", clearance: "Clearance", offer: "Review a quote", oneOff: "One-off", recurring: "Recurring", standard: "Normally planned service", deadline: "Deadline or last-minute change", sensitive: "Sensitive or discreet situation", combined: "Combine several services", access: "Access, keys or alarm", handover: "Handover or move-out", coordination: "Coordinate several parties", none: "No special requirement", yes: "Yes", no: "No", enquiry: "Prepare an enquiry", information: "Understand the service first", quoteReview: "Review an existing quote", result: "Non-binding guidance", required: "Details for the next step", signature: "Relevant special solution", addOn: "Possible additional service", open: "Learn more", cta: "Prepare enquiry", details: "Open service page", restart: "Start again", privacy: "All answers remain in this browser. Nothing is stored or transmitted until you choose a contact route and submit details yourself.", step: "Step", back: "Back", continue: "Continue", show: "Show recommendation",
  noMatchTitle: "No verified service is registered for this combination.",
  noMatchText: "The Service Finder does not recommend another region or invent availability. Change your selection or open the service catalogue.",
  photosReminder: "Add photos if possible",
  selectedRequirements: "Requirements taken into account",
} as const;
