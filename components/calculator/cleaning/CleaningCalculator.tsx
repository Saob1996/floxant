"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { categorizeLocationForAnalytics } from "@/lib/calculator/analytics-policy";
import { trackCalculatorEvent } from "@/lib/calculator/analytics";
import { calculateCleaningEstimate } from "@/lib/calculator/cleaning-estimate";
import {
  CALCULATOR_BAND_LABELS,
  CALCULATOR_VERSION,
  CLEANING_OBJECT_TYPE_OPTIONS,
} from "@/lib/calculator/effort-config";
import { normalizeNonNegativeMeasure, normalizeTextInput } from "@/lib/calculator/normalize";
import {
  CALCULATOR_CONTACT_HREFS,
  CALCULATOR_DRAFT_SESSION_KEYS,
  createCalculatorEnquiryTransfer,
  storeCalculatorEnquiryTransfer,
} from "@/lib/calculator/transfer";
import type {
  CalculatorDraft,
  CleaningAdditionalService,
  CleaningCalculatorInput,
  CleaningCondition,
  CleaningObjectType,
  CleaningType,
  WindowAccess,
  WindowExtent,
  WindowSides,
  YesNoUnknown,
} from "@/lib/calculator/types";

const DEFAULT_INPUT: CleaningCalculatorInput = {
  location: "",
  objectType: "unknown",
  areaM2: "",
  cleaningType: "unknown",
  cadence: "unknown",
  timeWindow: "",
  desiredDate: "",
  condition: "unknown",
  windowCount: "",
  windowExtent: "unknown",
  windowSides: "unknown",
  windowAccess: "unknown",
  additionalServices: [],
  photosAvailable: "unknown",
  note: "",
};

const CLEANING_TYPES: ReadonlyArray<{ value: CleaningType; label: string; description: string }> = [
  { value: "one_off", label: "Einmalige Reinigung", description: "Ein Termin mit klarem Zielzustand" },
  { value: "recurring", label: "Regelmäßige Reinigung", description: "Wiederkehrender Turnus und Zeitfenster" },
  { value: "handover", label: "Übergabe oder Auszug", description: "Vor Übergabe, Auszug oder Einzug" },
  { value: "windows", label: "Fenster oder Glas", description: "Innen, außen oder beidseitig" },
  { value: "construction", label: "Bau oder Renovierung", description: "Rückstände nach Arbeiten einordnen" },
  { value: "unknown", label: "Noch unsicher", description: "Reinigungsart später gemeinsam klären" },
];

const ADDITIONAL_SERVICES: ReadonlyArray<{
  value: CleaningAdditionalService;
  label: string;
  description: string;
}> = [
  { value: "windows", label: "Fenster", description: "Fenster als Ergänzung prüfen" },
  { value: "kitchen", label: "Küche", description: "Küche gezielt berücksichtigen" },
  { value: "sanitary", label: "Sanitär", description: "Bad und Sanitärbereiche" },
  { value: "heavy_soiling", label: "Stärkere Verschmutzung", description: "Mehr Aufwand als normal erwartet" },
];

const OBJECT_LABELS = Object.fromEntries(
  CLEANING_OBJECT_TYPE_OPTIONS.map(({ value, label }) => [value, label]),
) as Record<Exclude<CleaningObjectType, "unknown">, string>;
const TYPE_LABELS = Object.fromEntries(CLEANING_TYPES.map(({ value, label }) => [value, label])) as Record<CleaningType, string>;
const SERVICE_LABELS = Object.fromEntries(
  ADDITIONAL_SERVICES.map(({ value, label }) => [value, label]),
) as Record<CleaningAdditionalService, string>;

const CADENCE_LABELS: Record<NonNullable<CleaningCalculatorInput["cadence"]>, string> = {
  weekly: "wöchentlich",
  twice_weekly: "zweimal wöchentlich",
  monthly: "monatlich",
  other: "anderer Turnus",
  unknown: "noch offen",
};

const CONDITION_LABELS: Record<NonNullable<CleaningCalculatorInput["condition"]>, string> = {
  normal: "normal",
  used: "stärker genutzt",
  heavy: "stark verschmutzt",
  unknown: "noch offen",
};

const WINDOW_EXTENT_LABELS: Record<NonNullable<CleaningCalculatorInput["windowExtent"]>, string> = {
  few: "wenige Fenster",
  some: "mehrere Fenster",
  many: "viele Fenster",
  unknown: "noch offen",
};

const WINDOW_SIDE_LABELS: Record<NonNullable<CleaningCalculatorInput["windowSides"]>, string> = {
  inside: "innen",
  outside: "außen",
  both: "innen und außen",
  unknown: "noch offen",
};

const WINDOW_ACCESS_LABELS: Record<NonNullable<CleaningCalculatorInput["windowAccess"]>, string> = {
  easy: "gut erreichbar",
  limited: "eingeschränkt erreichbar",
  special: "besondere Zugangslösung nötig",
  unknown: "noch offen",
};

type CalculatorStep = 1 | 2 | 3 | 4;
type HistoryMarker = { type: "cleaning"; step: CalculatorStep; index: number };

const surfaceClass =
  "rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)] sm:p-7";
const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-base font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 motion-reduce:transition-none";
const primaryButtonClass =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-5 text-base font-black text-white transition hover:bg-emerald-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none";
const secondaryButtonClass =
  "inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-base font-black text-slate-800 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100 motion-reduce:transition-none";

function isCalculatorStep(value: unknown): value is CalculatorStep {
  return value === 1 || value === 2 || value === 3 || value === 4;
}

function hasCleaningInput(value: unknown): value is CleaningCalculatorInput {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<CleaningCalculatorInput>;
  return typeof candidate.location === "string" && Array.isArray(candidate.additionalServices);
}

function numericError(value: unknown): string | null {
  return normalizeNonNegativeMeasure(value as string | number | null | undefined).state === "invalid"
    ? "Bitte 0 oder eine positive Zahl eingeben."
    : null;
}

function ChoiceButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100 motion-reduce:transition-none ${
        active
          ? "border-emerald-600 bg-emerald-50 text-emerald-950"
          : "border-slate-300 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50"
      }`}
    >
      {children}
    </button>
  );
}

function FieldLabel({ htmlFor, children, optional = false }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-black text-slate-800">
      {children} {optional ? <span className="font-semibold text-slate-500">(optional)</span> : null}
    </label>
  );
}

function ResultList({ title, items, emptyText }: { title: string; items: readonly string[]; emptyText: string }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-base font-black text-slate-950">{title}</h3>
      {items.length > 0 ? (
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="font-black text-emerald-700">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm leading-6 text-slate-600">{emptyText}</p>
      )}
    </section>
  );
}

function displayPhotos(value: YesNoUnknown): string {
  if (value === "yes") return "Fotos vorhanden";
  if (value === "no") return "Keine Fotos vorhanden";
  return "Noch unklar";
}

export default function CleaningCalculator() {
  const router = useRouter();
  const [input, setInput] = useState<CleaningCalculatorInput>(DEFAULT_INPUT);
  const [step, setStep] = useState<CalculatorStep>(1);
  const [hydrated, setHydrated] = useState(false);
  const historyIndexRef = useRef(0);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const estimate = useMemo(() => calculateCleaningEstimate(input), [input]);

  useEffect(() => {
    let restoredStep: CalculatorStep = 1;
    try {
      const stored = window.sessionStorage.getItem(CALCULATOR_DRAFT_SESSION_KEYS.cleaning);
      if (stored) {
        const draft = JSON.parse(stored) as Partial<CalculatorDraft<CleaningCalculatorInput>>;
        if (
          draft.schemaVersion === 1 &&
          draft.calculatorVersion === CALCULATOR_VERSION &&
          isCalculatorStep(draft.step) &&
          hasCleaningInput(draft.input)
        ) {
          setInput({ ...DEFAULT_INPUT, ...draft.input });
          setStep(draft.step);
          restoredStep = draft.step;
        }
      }
    } catch {
      // Storage is optional; the calculator remains fully usable without it.
    }

    const existingState = window.history.state && typeof window.history.state === "object" ? window.history.state : {};
    window.history.replaceState(
      { ...existingState, floxantCalculator: { type: "cleaning", step: restoredStep, index: 0 } satisfies HistoryMarker },
      "",
    );

    const handlePopState = (event: PopStateEvent) => {
      const marker = event.state?.floxantCalculator as HistoryMarker | undefined;
      if (marker?.type !== "cleaning" || !isCalculatorStep(marker.step)) return;
      historyIndexRef.current = Number.isInteger(marker.index) ? Math.max(0, marker.index) : 0;
      setStep(marker.step);
    };

    window.addEventListener("popstate", handlePopState);
    setHydrated(true);
    trackCalculatorEvent(
      "calculator_view",
      { calculator_type: "cleaning", service_type: input.cleaningType },
      "cleaning:calculator_view",
    );
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const draft: CalculatorDraft<CleaningCalculatorInput> = {
      schemaVersion: 1,
      calculatorVersion: CALCULATOR_VERSION,
      step,
      input,
      updatedAt: new Date().toISOString(),
    };
    try {
      window.sessionStorage.setItem(CALCULATOR_DRAFT_SESSION_KEYS.cleaning, JSON.stringify(draft));
    } catch {
      // Storage is optional; current in-memory values remain available.
    }
  }, [hydrated, input, step]);

  useEffect(() => {
    if (step !== 4) return;
    resultHeadingRef.current?.focus();
    trackCalculatorEvent(
      "calculator_result_view",
      {
        calculator_type: "cleaning",
        service_type: input.cleaningType,
        location_category: categorizeLocationForAnalytics(input.location),
        result_band: estimate.effortBand,
      },
      `cleaning:calculator_result_view:${estimate.effortBand}`,
    );
  }, [estimate.effortBand, input.cleaningType, input.location, step]);

  function updateInput<K extends keyof CleaningCalculatorInput>(
    key: K,
    value: CleaningCalculatorInput[K],
  ) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function writeHistory(nextStep: CalculatorStep, mode: "push" | "replace") {
    const nextIndex = mode === "push" ? historyIndexRef.current + 1 : historyIndexRef.current;
    const existingState = window.history.state && typeof window.history.state === "object" ? window.history.state : {};
    const state = {
      ...existingState,
      floxantCalculator: { type: "cleaning", step: nextStep, index: nextIndex } satisfies HistoryMarker,
    };
    if (mode === "push") window.history.pushState(state, "");
    else window.history.replaceState(state, "");
    historyIndexRef.current = nextIndex;
    setStep(nextStep);
  }

  function goNext() {
    if (step >= 4) return;
    if (step === 1) {
      trackCalculatorEvent(
        "calculator_start",
        { calculator_type: "cleaning", service_type: input.cleaningType },
        "cleaning:calculator_start",
      );
    }
    trackCalculatorEvent(
      "calculator_step_complete",
      { calculator_type: "cleaning", service_type: input.cleaningType, step_number: step },
      `cleaning:calculator_step_complete:${step}`,
    );
    writeHistory((step + 1) as CalculatorStep, "push");
  }

  function goBack() {
    if (step <= 1) return;
    const marker = window.history.state?.floxantCalculator as HistoryMarker | undefined;
    if (marker?.type === "cleaning" && marker.index > 0) {
      window.history.back();
      return;
    }
    writeHistory((step - 1) as CalculatorStep, "replace");
  }

  function selectCleaningType(type: CleaningType) {
    setInput((current) => ({
      ...current,
      cleaningType: type,
      cadence: type === "recurring" ? current.cadence : "unknown",
      condition: type === "recurring" || type === "windows" ? "unknown" : current.condition,
    }));
  }

  function toggleService(service: CleaningAdditionalService) {
    setInput((current) => ({
      ...current,
      additionalServices: current.additionalServices.includes(service)
        ? current.additionalServices.filter((entry) => entry !== service)
        : [...current.additionalServices, service],
    }));
  }

  function sendResultToContact() {
    const summary = [
      { label: "Standort", value: normalizeTextInput(input.location, 120) || "noch offen" },
      { label: "Objekt", value: input.objectType === "unknown" ? "noch offen" : OBJECT_LABELS[input.objectType] },
      { label: "Fläche", value: input.areaM2 ? `${input.areaM2} m²` : "noch offen" },
      { label: "Reinigungsart", value: TYPE_LABELS[input.cleaningType] },
      { label: "Turnus", value: CADENCE_LABELS[input.cadence || "unknown"] },
      { label: "Zeitfenster", value: normalizeTextInput(input.timeWindow, 120) || "noch offen" },
      { label: "Termin", value: input.desiredDate || "noch offen" },
      { label: "Zustand", value: CONDITION_LABELS[input.condition || "unknown"] },
      ...(input.cleaningType === "windows"
        ? [
            { label: "Fensteranzahl", value: input.windowCount ? `etwa ${input.windowCount}` : "noch offen" },
            { label: "Fensterumfang", value: WINDOW_EXTENT_LABELS[input.windowExtent || "unknown"] },
            { label: "Fensterseiten", value: WINDOW_SIDE_LABELS[input.windowSides || "unknown"] },
            { label: "Fensterzugang", value: WINDOW_ACCESS_LABELS[input.windowAccess || "unknown"] },
          ]
        : []),
      { label: "Fotos", value: displayPhotos(input.photosAvailable) },
    ];
    const selectedServices = input.additionalServices.map((service) => SERVICE_LABELS[service]);
    const transfer = createCalculatorEnquiryTransfer({
      estimate,
      inputSummary: summary,
      selectedAdditionalServices: selectedServices,
      enquiryNote: input.note,
    });
    storeCalculatorEnquiryTransfer(transfer);
    trackCalculatorEvent(
      "calculator_lead_start",
      {
        calculator_type: "cleaning",
        service_type: input.cleaningType,
        location_category: categorizeLocationForAnalytics(input.location),
        result_band: estimate.effortBand,
        lead_source: "calculator",
      },
      "cleaning:calculator_lead_start",
    );
    router.push(CALCULATOR_CONTACT_HREFS.cleaning);
  }

  const progressValue = step === 4 ? 3 : step;
  const areaError = numericError(input.areaM2);
  const windowCountError = numericError(input.windowCount);

  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl overflow-x-clip" aria-label="Reinigungsaufwand einschätzen">
      <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-black text-emerald-950">{step === 4 ? "Ergebnis" : `Schritt ${step} von 3`}</p>
          <p className="text-sm font-semibold text-emerald-800">
            {step === 1 ? "Objekt & Ort" : step === 2 ? "Reinigungsart" : step === 3 ? "Ergänzungen" : "Erste Einschätzung"}
          </p>
        </div>
        <progress aria-label={step === 4 ? "Alle Eingabeschritte abgeschlossen" : `Fortschritt: Schritt ${step} von 3`} value={progressValue} max={3} className="mt-3 h-2 w-full overflow-hidden rounded-full accent-emerald-700" />
      </div>

      {step === 1 ? (
        <section className={surfaceClass} aria-labelledby="cleaning-step-1-title">
          <h2 id="cleaning-step-1-title" className="text-2xl font-black tracking-tight text-slate-950">Welches Objekt soll gereinigt werden?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Standort, Objektart und eine grobe Fläche reichen für den ersten Schritt.</p>

          <div className="mt-6">
            <FieldLabel htmlFor="cleaning-location">Standort oder Postleitzahl</FieldLabel>
            <input id="cleaning-location" value={input.location} onChange={(event) => updateInput("location", event.target.value)} className={inputClass} placeholder="z. B. Düsseldorf oder 93047" autoComplete="postal-code" />
            <p className="mt-2 text-xs leading-5 text-slate-500">Eine genaue Adresse ist für diese Orientierung nicht nötig.</p>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-black text-slate-800">Objektart</legend>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CLEANING_OBJECT_TYPE_OPTIONS.map((option) => (
                <ChoiceButton key={option.value} active={input.objectType === option.value} onClick={() => updateInput("objectType", option.value)}>{option.label}</ChoiceButton>
              ))}
              <ChoiceButton active={input.objectType === "unknown"} onClick={() => updateInput("objectType", "unknown")}>Ich weiß es nicht</ChoiceButton>
            </div>
          </fieldset>

          <div className="mt-6 max-w-sm">
            <FieldLabel htmlFor="cleaning-area">Fläche ungefähr in m²</FieldLabel>
            <input id="cleaning-area" inputMode="decimal" value={input.areaM2 ?? ""} onChange={(event) => updateInput("areaM2", event.target.value)} className={inputClass} placeholder="z. B. 120,5" aria-invalid={Boolean(areaError)} />
            {areaError ? <p className="mt-2 text-sm font-semibold text-red-700">{areaError}</p> : null}
            <button type="button" onClick={() => updateInput("areaM2", "")} className="mt-3 min-h-11 rounded-lg px-2 text-sm font-black text-emerald-800 underline decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100">Ich kenne die Fläche noch nicht</button>
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section className={surfaceClass} aria-labelledby="cleaning-step-2-title">
          <h2 id="cleaning-step-2-title" className="text-2xl font-black tracking-tight text-slate-950">Welche Reinigung passt am ehesten?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Wählen Sie die Hauptart. Danach erscheinen nur die dazu passenden Fragen.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {CLEANING_TYPES.map((type) => {
              const active = input.cleaningType === type.value;
              return (
                <button key={type.value} type="button" aria-pressed={active} onClick={() => selectCleaningType(type.value)} className={`min-h-20 rounded-2xl border p-4 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100 motion-reduce:transition-none ${active ? "border-emerald-600 bg-emerald-50" : "border-slate-300 bg-white hover:border-emerald-300"}`}>
                  <span className="block font-black text-slate-950">{type.label}</span>
                  <span className="mt-1 block text-sm leading-5 text-slate-600">{type.description}</span>
                </button>
              );
            })}
          </div>

          {input.cleaningType === "recurring" ? (
            <div className="mt-6 grid gap-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="cleaning-cadence">Turnus</FieldLabel>
                <select id="cleaning-cadence" value={input.cadence || "unknown"} onChange={(event) => updateInput("cadence", event.target.value as CleaningCalculatorInput["cadence"])} className={inputClass}>
                  <option value="unknown">Ich weiß es noch nicht</option>
                  <option value="weekly">Wöchentlich</option>
                  <option value="twice_weekly">Zweimal wöchentlich</option>
                  <option value="monthly">Monatlich</option>
                  <option value="other">Anderer Turnus</option>
                </select>
              </div>
              <div>
                <FieldLabel htmlFor="cleaning-time-window" optional>Zeitfenster</FieldLabel>
                <select id="cleaning-time-window" value={input.timeWindow || ""} onChange={(event) => updateInput("timeWindow", event.target.value)} className={inputClass}>
                  <option value="">Noch offen</option>
                  <option value="morgens">Morgens</option>
                  <option value="tagsueber">Tagsüber</option>
                  <option value="abends">Abends</option>
                  <option value="flexibel">Flexibel</option>
                </select>
              </div>
            </div>
          ) : null}

          {input.cleaningType === "one_off" || input.cleaningType === "handover" || input.cleaningType === "construction" ? (
            <div className="mt-6 grid gap-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:grid-cols-2">
              <fieldset>
                <legend className="text-sm font-black text-slate-800">Zustand</legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {([
                    ["normal", "Normal"],
                    ["used", "Sichtbar genutzt"],
                    ["heavy", "Stärker"],
                    ["unknown", "Unklar"],
                  ] as const).map(([value, label]) => (
                    <ChoiceButton key={value} active={input.condition === value} onClick={() => updateInput("condition", value as CleaningCondition)}>{label}</ChoiceButton>
                  ))}
                </div>
              </fieldset>
              <div>
                <FieldLabel htmlFor="cleaning-date" optional>Gewünschter Termin</FieldLabel>
                <input id="cleaning-date" type="date" value={input.desiredDate || ""} onChange={(event) => updateInput("desiredDate", event.target.value)} className={inputClass} />
                <p className="mt-2 text-xs leading-5 text-slate-500">Leer lassen, wenn der Zeitraum noch offen ist.</p>
              </div>
            </div>
          ) : null}

          {input.cleaningType === "windows" ? (
            <div className="mt-6 space-y-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="cleaning-window-count" optional>Fensteranzahl ungefähr</FieldLabel>
                  <input id="cleaning-window-count" inputMode="decimal" value={input.windowCount ?? ""} onChange={(event) => updateInput("windowCount", event.target.value)} className={inputClass} placeholder="z. B. 12" aria-invalid={Boolean(windowCountError)} />
                  {windowCountError ? <p className="mt-2 text-sm font-semibold text-red-700">{windowCountError}</p> : null}
                </div>
                <fieldset>
                  <legend className="text-sm font-black text-slate-800">Oder grobe Glasmenge</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {([[
                      "few", "Wenig"], ["some", "Mittel"], ["many", "Viel"], ["unknown", "Unklar"]] as const).map(([value, label]) => (
                      <ChoiceButton key={value} active={input.windowExtent === value} onClick={() => updateInput("windowExtent", value as WindowExtent)}>{label}</ChoiceButton>
                    ))}
                  </div>
                </fieldset>
              </div>
              <fieldset>
                <legend className="text-sm font-black text-slate-800">Welche Seiten?</legend>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {([["inside", "Innen"], ["outside", "Außen"], ["both", "Beidseitig"], ["unknown", "Unklar"]] as const).map(([value, label]) => (
                    <ChoiceButton key={value} active={input.windowSides === value} onClick={() => updateInput("windowSides", value as WindowSides)}>{label}</ChoiceButton>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-black text-slate-800">Erreichbarkeit</legend>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {([["easy", "Gut erreichbar"], ["limited", "Teilweise schwer"], ["special", "Besonderer Zugang"], ["unknown", "Unklar"]] as const).map(([value, label]) => (
                    <ChoiceButton key={value} active={input.windowAccess === value} onClick={() => updateInput("windowAccess", value as WindowAccess)}>{label}</ChoiceButton>
                  ))}
                </div>
              </fieldset>
            </div>
          ) : null}
        </section>
      ) : null}

      {step === 3 ? (
        <section className={surfaceClass} aria-labelledby="cleaning-step-3-title">
          <h2 id="cleaning-step-3-title" className="text-2xl font-black tracking-tight text-slate-950">Was soll zusätzlich berücksichtigt werden?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Alle Angaben in diesem Schritt sind optional.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {ADDITIONAL_SERVICES.map((service) => {
              const active = input.additionalServices.includes(service.value);
              return (
                <button key={service.value} type="button" aria-pressed={active} onClick={() => toggleService(service.value)} className={`min-h-20 rounded-2xl border p-4 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100 motion-reduce:transition-none ${active ? "border-emerald-600 bg-emerald-50" : "border-slate-300 bg-white hover:border-emerald-300"}`}>
                  <span className="block font-black text-slate-950">{service.label}</span>
                  <span className="mt-1 block text-sm leading-5 text-slate-600">{service.description}</span>
                </button>
              );
            })}
          </div>

          <fieldset className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <legend className="px-1 text-sm font-black text-slate-900">Können später Fotos ergänzt werden?</legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(["yes", "no", "unknown"] as const).map((value) => (
                <ChoiceButton key={value} active={input.photosAvailable === value} onClick={() => updateInput("photosAvailable", value)}>{value === "yes" ? "Ja" : value === "no" ? "Nein" : "Unklar"}</ChoiceButton>
              ))}
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">In diesem Rechner werden keine Dateien hochgeladen.</p>
          </fieldset>

          <details className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <summary className="min-h-11 cursor-pointer py-2 text-sm font-black text-slate-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100">Hinweis für die spätere Anfrage (optional)</summary>
            <div className="mt-3">
              <FieldLabel htmlFor="cleaning-note" optional>Kurzer Hinweis</FieldLabel>
              <textarea id="cleaning-note" value={input.note || ""} onChange={(event) => updateInput("note", event.target.value)} className={`${inputClass} min-h-28 py-3`} maxLength={800} placeholder="Was sollte FLOXANT bei der Prüfung wissen?" />
            </div>
          </details>
        </section>
      ) : null}

      {step === 4 ? (
        <section className={surfaceClass} aria-labelledby="cleaning-result-title">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-emerald-700">Ihre erste Einschätzung</p>
          <h2 ref={resultHeadingRef} tabIndex={-1} id="cleaning-result-title" className="mt-2 text-3xl font-black tracking-tight text-slate-950 outline-none sm:text-4xl">Voraussichtlicher Aufwand: {CALCULATOR_BAND_LABELS[estimate.effortBand]}</h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{estimate.calculationSummary}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ResultList title="Berücksichtigt" items={estimate.includedFactors} emptyText="Noch keine belastbaren Faktoren angegeben." />
            <ResultList title="Für eine genauere Einordnung fehlt" items={estimate.missingInformation} emptyText="Die zentralen Angaben sind vorhanden." />
          </div>

          <section className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <h3 className="font-black text-emerald-950">Mögliche Ergänzungen</h3>
            <p className="mt-2 text-sm leading-6 text-emerald-900">
              {input.additionalServices.length > 0 ? `Ausgewählt: ${input.additionalServices.map((service) => SERVICE_LABELS[service]).join(", ")}. Weitere Leistungen werden nur nach Absprache ergänzt.` : "Fenster, Küche, Sanitärbereiche oder stärkere Verschmutzung können bei Bedarf separat geprüft werden."}
            </p>
          </section>

          <details className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
            <summary className="min-h-11 cursor-pointer py-2 font-black text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100">So wurde die Einschätzung gebildet</summary>
            <p className="mt-3 text-sm leading-6 text-slate-700">Berücksichtigt werden nur verständliche Aufwandsfaktoren. Nicht eingerechnet sind:</p>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">{estimate.excludedFactors.map((factor) => <li key={factor}>• {factor}</li>)}</ul>
          </details>

          <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-950">{estimate.disclaimer}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={sendResultToContact} className={primaryButtonClass}>Ergebnis als Anfrage senden</button>
            <button type="button" onClick={() => writeHistory(1, "push")} className={secondaryButtonClass}>Angaben ändern</button>
          </div>
        </section>
      ) : null}

      {step < 4 ? (
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step === 1 ? <Link href="/rechner" className={secondaryButtonClass}>Zur Rechnerauswahl</Link> : <button type="button" onClick={goBack} className={secondaryButtonClass}>Zurück</button>}
          <button type="button" onClick={goNext} className={primaryButtonClass}>{step === 3 ? "Einschätzung anzeigen" : "Weiter"}</button>
        </div>
      ) : null}
    </div>
  );
}
