"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { categorizeRouteForAnalytics } from "@/lib/calculator/analytics-policy";
import { trackCalculatorEvent } from "@/lib/calculator/analytics";
import { CALCULATOR_BAND_LABELS, CALCULATOR_VERSION } from "@/lib/calculator/effort-config";
import { calculateMovingEstimate } from "@/lib/calculator/moving-estimate";
import { normalizeNonNegativeMeasure, normalizeTextInput } from "@/lib/calculator/normalize";
import {
  CALCULATOR_CONTACT_HREFS,
  CALCULATOR_DRAFT_SESSION_KEYS,
  createCalculatorEnquiryTransfer,
  storeCalculatorEnquiryTransfer,
} from "@/lib/calculator/transfer";
import type {
  CalculatorDraft,
  MovingAdditionalService,
  MovingCalculatorInput,
  MovingFurnitureAmount,
  MovingScopeMode,
  YesNoUnknown,
} from "@/lib/calculator/types";

const DEFAULT_INPUT: MovingCalculatorInput = {
  origin: "",
  destination: "",
  desiredDate: "",
  flexible: "unknown",
  manualDistanceKm: "",
  scopeMode: "unknown",
  rooms: "",
  areaM2: "",
  boxes: "",
  furnitureAmount: "unknown",
  originFloor: "",
  destinationFloor: "",
  originElevator: "unknown",
  destinationElevator: "unknown",
  carryDistanceMeters: "",
  additionalServices: [],
  pianoType: "unknown",
  note: "",
};

const ADDITIONAL_SERVICES: ReadonlyArray<{
  value: MovingAdditionalService;
  label: string;
  description: string;
}> = [
  { value: "disassembly", label: "Demontage", description: "Möbel vor dem Transport abbauen" },
  { value: "assembly", label: "Montage", description: "Möbel am Ziel wieder aufbauen" },
  { value: "packing", label: "Verpackung", description: "Kartons oder Umzugsgut verpacken" },
  { value: "clearance", label: "Entrümpelung", description: "Restmengen separat prüfen" },
  { value: "cleaning", label: "Reinigung", description: "Reinigung nach dem Auszug prüfen" },
  { value: "piano", label: "Klaviertransport", description: "Klavier oder Flügel gesondert prüfen" },
];

const SERVICE_LABELS = Object.fromEntries(
  ADDITIONAL_SERVICES.map(({ value, label }) => [value, label]),
) as Record<MovingAdditionalService, string>;

const FURNITURE_LABELS: Record<MovingFurnitureAmount, string> = {
  none: "keine Möbel",
  some: "einige Möbel",
  many: "viele Möbel",
  unknown: "noch offen",
};

const PIANO_LABELS: Record<NonNullable<MovingCalculatorInput["pianoType"]>, string> = {
  upright: "Klavier",
  grand: "Flügel",
  unknown: "noch offen",
};

type CalculatorStep = 1 | 2 | 3 | 4;
type HistoryMarker = { type: "moving"; step: CalculatorStep; index: number };

const surfaceClass =
  "rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)] sm:p-7";
const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-base font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 motion-reduce:transition-none";
const primaryButtonClass =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-700 px-5 text-base font-black text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none";
const secondaryButtonClass =
  "inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-base font-black text-slate-800 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 motion-reduce:transition-none";

function isCalculatorStep(value: unknown): value is CalculatorStep {
  return value === 1 || value === 2 || value === 3 || value === 4;
}

function hasMovingInput(value: unknown): value is MovingCalculatorInput {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<MovingCalculatorInput>;
  return (
    typeof candidate.origin === "string" &&
    typeof candidate.destination === "string" &&
    Array.isArray(candidate.additionalServices)
  );
}

function numericError(value: unknown): string | null {
  return normalizeNonNegativeMeasure(value as string | number | null | undefined).state === "invalid"
    ? "Bitte 0 oder eine positive Zahl eingeben."
    : null;
}

function displayYesNoUnknown(value: YesNoUnknown): string {
  if (value === "yes") return "Ja";
  if (value === "no") return "Nein";
  return "Noch unbekannt";
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
      className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 motion-reduce:transition-none ${
        active
          ? "border-blue-600 bg-blue-50 text-blue-950"
          : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
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
              <span aria-hidden="true" className="font-black text-blue-700">•</span>
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

export default function MovingCalculator() {
  const router = useRouter();
  const [input, setInput] = useState<MovingCalculatorInput>(DEFAULT_INPUT);
  const [step, setStep] = useState<CalculatorStep>(1);
  const [hydrated, setHydrated] = useState(false);
  const historyIndexRef = useRef(0);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const estimate = useMemo(() => calculateMovingEstimate(input), [input]);

  useEffect(() => {
    let restoredStep: CalculatorStep = 1;
    try {
      const stored = window.sessionStorage.getItem(CALCULATOR_DRAFT_SESSION_KEYS.moving);
      if (stored) {
        const draft = JSON.parse(stored) as Partial<CalculatorDraft<MovingCalculatorInput>>;
        if (
          draft.schemaVersion === 1 &&
          draft.calculatorVersion === CALCULATOR_VERSION &&
          isCalculatorStep(draft.step) &&
          hasMovingInput(draft.input)
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
      { ...existingState, floxantCalculator: { type: "moving", step: restoredStep, index: 0 } satisfies HistoryMarker },
      "",
    );

    const handlePopState = (event: PopStateEvent) => {
      const marker = event.state?.floxantCalculator as HistoryMarker | undefined;
      if (marker?.type !== "moving" || !isCalculatorStep(marker.step)) return;
      historyIndexRef.current = Number.isInteger(marker.index) ? Math.max(0, marker.index) : 0;
      setStep(marker.step);
    };

    window.addEventListener("popstate", handlePopState);
    setHydrated(true);
    trackCalculatorEvent(
      "calculator_view",
      { calculator_type: "moving", service_type: "moving" },
      "moving:calculator_view",
    );
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const draft: CalculatorDraft<MovingCalculatorInput> = {
      schemaVersion: 1,
      calculatorVersion: CALCULATOR_VERSION,
      step,
      input,
      updatedAt: new Date().toISOString(),
    };
    try {
      window.sessionStorage.setItem(CALCULATOR_DRAFT_SESSION_KEYS.moving, JSON.stringify(draft));
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
        calculator_type: "moving",
        service_type: "moving",
        location_category: categorizeRouteForAnalytics(input.origin, input.destination),
        result_band: estimate.effortBand,
      },
      `moving:calculator_result_view:${estimate.effortBand}`,
    );
  }, [estimate.effortBand, input.destination, input.origin, step]);

  function updateInput<K extends keyof MovingCalculatorInput>(
    key: K,
    value: MovingCalculatorInput[K],
  ) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function writeHistory(nextStep: CalculatorStep, mode: "push" | "replace") {
    const nextIndex = mode === "push" ? historyIndexRef.current + 1 : historyIndexRef.current;
    const existingState = window.history.state && typeof window.history.state === "object" ? window.history.state : {};
    const state = {
      ...existingState,
      floxantCalculator: { type: "moving", step: nextStep, index: nextIndex } satisfies HistoryMarker,
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
        { calculator_type: "moving", service_type: "moving" },
        "moving:calculator_start",
      );
    }
    trackCalculatorEvent(
      "calculator_step_complete",
      { calculator_type: "moving", service_type: "moving", step_number: step },
      `moving:calculator_step_complete:${step}`,
    );
    writeHistory((step + 1) as CalculatorStep, "push");
  }

  function goBack() {
    if (step <= 1) return;
    const marker = window.history.state?.floxantCalculator as HistoryMarker | undefined;
    if (marker?.type === "moving" && marker.index > 0) {
      window.history.back();
      return;
    }
    writeHistory((step - 1) as CalculatorStep, "replace");
  }

  function toggleService(service: MovingAdditionalService) {
    setInput((current) => ({
      ...current,
      additionalServices: current.additionalServices.includes(service)
        ? current.additionalServices.filter((entry) => entry !== service)
        : [...current.additionalServices, service],
    }));
  }

  function sendResultToContact() {
    const scopeValue =
      input.scopeMode === "rooms"
        ? `${input.rooms || "noch offen"} Zimmer`
        : input.scopeMode === "area"
          ? `${input.areaM2 || "noch offen"} m²`
          : "Umfang noch unbekannt";
    const summary = [
      { label: "Start", value: normalizeTextInput(input.origin, 120) || "noch offen" },
      { label: "Ziel", value: normalizeTextInput(input.destination, 120) || "noch offen" },
      { label: "Termin", value: input.desiredDate || "noch offen" },
      { label: "Flexibel", value: displayYesNoUnknown(input.flexible) },
      { label: "Entfernung", value: input.manualDistanceKm ? `etwa ${input.manualDistanceKm} km` : "noch offen" },
      { label: "Umfang", value: scopeValue },
      { label: "Kartons", value: input.boxes ? `etwa ${input.boxes}` : "noch offen" },
      { label: "Möbel", value: FURNITURE_LABELS[input.furnitureAmount] },
      { label: "Startetage", value: input.originFloor ? String(input.originFloor) : "noch offen" },
      { label: "Aufzug am Start", value: displayYesNoUnknown(input.originElevator) },
      { label: "Zieletage", value: input.destinationFloor ? String(input.destinationFloor) : "noch offen" },
      { label: "Aufzug am Ziel", value: displayYesNoUnknown(input.destinationElevator) },
      { label: "Trageweg", value: input.carryDistanceMeters ? `etwa ${input.carryDistanceMeters} m` : "noch offen" },
      ...(input.additionalServices.includes("piano")
        ? [{ label: "Klavierart", value: PIANO_LABELS[input.pianoType || "unknown"] }]
        : []),
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
        calculator_type: "moving",
        service_type: "moving",
        location_category: categorizeRouteForAnalytics(input.origin, input.destination),
        result_band: estimate.effortBand,
        lead_source: "calculator",
      },
      "moving:calculator_lead_start",
    );
    router.push(CALCULATOR_CONTACT_HREFS.moving);
  }

  const progressValue = step === 4 ? 3 : step;
  const floorErrors = {
    origin: numericError(input.originFloor),
    destination: numericError(input.destinationFloor),
    carry: numericError(input.carryDistanceMeters),
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl overflow-x-clip" aria-label="Umzugsaufwand einschätzen">
      <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-black text-blue-950">
            {step === 4 ? "Ergebnis" : `Schritt ${step} von 3`}
          </p>
          <p className="text-sm font-semibold text-blue-800">
            {step === 1 ? "Route & Zeitraum" : step === 2 ? "Umfang & Zugang" : step === 3 ? "Zusatzleistungen" : "Erste Einschätzung"}
          </p>
        </div>
        <progress
          aria-label={step === 4 ? "Alle Eingabeschritte abgeschlossen" : `Fortschritt: Schritt ${step} von 3`}
          value={progressValue}
          max={3}
          className="mt-3 h-2 w-full overflow-hidden rounded-full accent-blue-700"
        />
      </div>

      {step === 1 ? (
        <section className={surfaceClass} aria-labelledby="moving-step-1-title">
          <h2 id="moving-step-1-title" className="text-2xl font-black tracking-tight text-slate-950">
            Wohin soll der Umzug gehen?
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Stadt oder Postleitzahl reicht. Eine genaue Adresse ist für diese Orientierung nicht nötig.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="moving-origin">Startort oder Start-PLZ</FieldLabel>
              <input
                id="moving-origin"
                value={input.origin}
                onChange={(event) => updateInput("origin", event.target.value)}
                className={inputClass}
                placeholder="z. B. 93047 Regensburg"
                autoComplete="postal-code"
              />
            </div>
            <div>
              <FieldLabel htmlFor="moving-destination">Zielort oder Ziel-PLZ</FieldLabel>
              <input
                id="moving-destination"
                value={input.destination}
                onChange={(event) => updateInput("destination", event.target.value)}
                className={inputClass}
                placeholder="z. B. Nürnberg"
              />
            </div>
            <div>
              <FieldLabel htmlFor="moving-date" optional>Gewünschter Termin</FieldLabel>
              <input
                id="moving-date"
                type="date"
                value={input.desiredDate}
                onChange={(event) => updateInput("desiredDate", event.target.value)}
                className={inputClass}
              />
              <p className="mt-2 text-xs leading-5 text-slate-500">Leer lassen, wenn der Zeitraum noch offen ist.</p>
            </div>
            <fieldset>
              <legend className="text-sm font-black text-slate-800">Sind Sie zeitlich flexibel?</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["yes", "no", "unknown"] as const).map((value) => (
                  <ChoiceButton key={value} active={input.flexible === value} onClick={() => updateInput("flexible", value)}>
                    {value === "yes" ? "Ja" : value === "no" ? "Nein" : "Weiß nicht"}
                  </ChoiceButton>
                ))}
              </div>
            </fieldset>
          </div>

          <details className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <summary className="min-h-11 cursor-pointer py-2 text-sm font-black text-slate-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100">
              Entfernung ergänzen (optional)
            </summary>
            <div className="mt-3 max-w-sm">
              <FieldLabel htmlFor="moving-distance" optional>Entfernung in Kilometern</FieldLabel>
              <input
                id="moving-distance"
                inputMode="decimal"
                value={input.manualDistanceKm ?? ""}
                onChange={(event) => updateInput("manualDistanceKm", event.target.value)}
                className={inputClass}
                placeholder="z. B. 85,5"
                aria-invalid={Boolean(numericError(input.manualDistanceKm))}
              />
              {numericError(input.manualDistanceKm) ? <p className="mt-2 text-sm font-semibold text-red-700">{numericError(input.manualDistanceKm)}</p> : null}
              <p className="mt-2 text-xs leading-5 text-slate-500">Ohne Angabe wird keine Entfernung erfunden; die Route wird später geprüft.</p>
            </div>
          </details>
        </section>
      ) : null}

      {step === 2 ? (
        <section className={surfaceClass} aria-labelledby="moving-step-2-title">
          <h2 id="moving-step-2-title" className="text-2xl font-black tracking-tight text-slate-950">
            Wie groß ist der Umzug ungefähr?
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Eine Hauptangabe genügt. Weitere Mengen können Sie freiwillig ergänzen.</p>

          <fieldset className="mt-6">
            <legend className="text-sm font-black text-slate-800">Umfang angeben</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {([
                ["rooms", "Zimmerzahl"],
                ["area", "Wohnfläche"],
                ["unknown", "Ich weiß es nicht"],
              ] as const).map(([value, label]) => (
                <ChoiceButton key={value} active={input.scopeMode === value} onClick={() => updateInput("scopeMode", value as MovingScopeMode)}>
                  {label}
                </ChoiceButton>
              ))}
            </div>
          </fieldset>

          {input.scopeMode === "rooms" ? (
            <div className="mt-5 max-w-sm">
              <FieldLabel htmlFor="moving-rooms">Zimmerzahl</FieldLabel>
              <input
                id="moving-rooms"
                inputMode="decimal"
                value={input.rooms ?? ""}
                onChange={(event) => updateInput("rooms", event.target.value)}
                className={inputClass}
                placeholder="z. B. 3"
                aria-invalid={Boolean(numericError(input.rooms))}
              />
              {numericError(input.rooms) ? <p className="mt-2 text-sm font-semibold text-red-700">{numericError(input.rooms)}</p> : null}
            </div>
          ) : null}

          {input.scopeMode === "area" ? (
            <div className="mt-5 max-w-sm">
              <FieldLabel htmlFor="moving-area">Wohnfläche in m²</FieldLabel>
              <input
                id="moving-area"
                inputMode="decimal"
                value={input.areaM2 ?? ""}
                onChange={(event) => updateInput("areaM2", event.target.value)}
                className={inputClass}
                placeholder="z. B. 82,5"
                aria-invalid={Boolean(numericError(input.areaM2))}
              />
              {numericError(input.areaM2) ? <p className="mt-2 text-sm font-semibold text-red-700">{numericError(input.areaM2)}</p> : null}
            </div>
          ) : null}

          <div className="mt-7 grid gap-5 border-t border-slate-200 pt-6 sm:grid-cols-2">
            <fieldset className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <legend className="px-1 text-sm font-black text-slate-900">Startzugang</legend>
              <FieldLabel htmlFor="moving-origin-floor" optional>Etage (0 = Erdgeschoss)</FieldLabel>
              <input
                id="moving-origin-floor"
                inputMode="decimal"
                value={input.originFloor ?? ""}
                onChange={(event) => updateInput("originFloor", event.target.value)}
                className={inputClass}
                placeholder="z. B. 2"
                aria-invalid={Boolean(floorErrors.origin)}
              />
              {floorErrors.origin ? <p className="mt-2 text-sm font-semibold text-red-700">{floorErrors.origin}</p> : null}
              <span className="mt-4 block text-sm font-black text-slate-800">Aufzug</span>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["yes", "no", "unknown"] as const).map((value) => (
                  <ChoiceButton key={value} active={input.originElevator === value} onClick={() => updateInput("originElevator", value)}>
                    {value === "yes" ? "Ja" : value === "no" ? "Nein" : "Unklar"}
                  </ChoiceButton>
                ))}
              </div>
            </fieldset>

            <fieldset className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <legend className="px-1 text-sm font-black text-slate-900">Zielzugang</legend>
              <FieldLabel htmlFor="moving-destination-floor" optional>Etage (0 = Erdgeschoss)</FieldLabel>
              <input
                id="moving-destination-floor"
                inputMode="decimal"
                value={input.destinationFloor ?? ""}
                onChange={(event) => updateInput("destinationFloor", event.target.value)}
                className={inputClass}
                placeholder="z. B. 4"
                aria-invalid={Boolean(floorErrors.destination)}
              />
              {floorErrors.destination ? <p className="mt-2 text-sm font-semibold text-red-700">{floorErrors.destination}</p> : null}
              <span className="mt-4 block text-sm font-black text-slate-800">Aufzug</span>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["yes", "no", "unknown"] as const).map((value) => (
                  <ChoiceButton key={value} active={input.destinationElevator === value} onClick={() => updateInput("destinationElevator", value)}>
                    {value === "yes" ? "Ja" : value === "no" ? "Nein" : "Unklar"}
                  </ChoiceButton>
                ))}
              </div>
            </fieldset>
          </div>

          <details className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <summary className="min-h-11 cursor-pointer py-2 text-sm font-black text-slate-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100">
              Mengen und Trageweg näher beschreiben (optional)
            </summary>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="moving-boxes" optional>Kartons ungefähr</FieldLabel>
                <input id="moving-boxes" inputMode="decimal" value={input.boxes ?? ""} onChange={(event) => updateInput("boxes", event.target.value)} className={inputClass} placeholder="z. B. 35" aria-invalid={Boolean(numericError(input.boxes))} />
                {numericError(input.boxes) ? <p className="mt-2 text-sm font-semibold text-red-700">{numericError(input.boxes)}</p> : null}
              </div>
              <div>
                <FieldLabel htmlFor="moving-carry" optional>Trageweg zum Fahrzeug in Metern</FieldLabel>
                <input id="moving-carry" inputMode="decimal" value={input.carryDistanceMeters ?? ""} onChange={(event) => updateInput("carryDistanceMeters", event.target.value)} className={inputClass} placeholder="z. B. 25" aria-invalid={Boolean(floorErrors.carry)} />
                {floorErrors.carry ? <p className="mt-2 text-sm font-semibold text-red-700">{floorErrors.carry}</p> : null}
              </div>
              <fieldset className="sm:col-span-2">
                <legend className="text-sm font-black text-slate-800">Große Möbel</legend>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {([
                    ["none", "Keine"],
                    ["some", "Einige"],
                    ["many", "Viele"],
                    ["unknown", "Unklar"],
                  ] as const).map(([value, label]) => (
                    <ChoiceButton key={value} active={input.furnitureAmount === value} onClick={() => updateInput("furnitureAmount", value as MovingFurnitureAmount)}>{label}</ChoiceButton>
                  ))}
                </div>
              </fieldset>
            </div>
          </details>
        </section>
      ) : null}

      {step === 3 ? (
        <section className={surfaceClass} aria-labelledby="moving-step-3-title">
          <h2 id="moving-step-3-title" className="text-2xl font-black tracking-tight text-slate-950">Welche Zusatzleistungen sind gewünscht?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Wählen Sie nur, was wirklich benötigt wird. Mehrfachauswahl ist möglich.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {ADDITIONAL_SERVICES.map((service) => {
              const active = input.additionalServices.includes(service.value);
              return (
                <button
                  key={service.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleService(service.value)}
                  className={`min-h-20 rounded-2xl border p-4 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 motion-reduce:transition-none ${active ? "border-blue-600 bg-blue-50" : "border-slate-300 bg-white hover:border-blue-300"}`}
                >
                  <span className="block font-black text-slate-950">{service.label}</span>
                  <span className="mt-1 block text-sm leading-5 text-slate-600">{service.description}</span>
                </button>
              );
            })}
          </div>

          {input.additionalServices.includes("piano") ? (
            <fieldset className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <legend className="px-1 text-sm font-black text-amber-950">Welches Instrument?</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["upright", "grand", "unknown"] as const).map((value) => (
                  <ChoiceButton key={value} active={input.pianoType === value} onClick={() => updateInput("pianoType", value)}>
                    {value === "upright" ? "Klavier" : value === "grand" ? "Flügel" : "Unklar"}
                  </ChoiceButton>
                ))}
              </div>
              <p className="mt-3 text-xs leading-5 text-amber-900">Zugang und Transportweg werden für Spezialtransporte immer persönlich geprüft.</p>
            </fieldset>
          ) : null}

          <details className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <summary className="min-h-11 cursor-pointer py-2 text-sm font-black text-slate-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100">Hinweis für die spätere Anfrage (optional)</summary>
            <div className="mt-3">
              <FieldLabel htmlFor="moving-note" optional>Kurzer Hinweis</FieldLabel>
              <textarea id="moving-note" value={input.note || ""} onChange={(event) => updateInput("note", event.target.value)} className={`${inputClass} min-h-28 py-3`} maxLength={800} placeholder="Was sollte FLOXANT bei der Prüfung wissen?" />
            </div>
          </details>
        </section>
      ) : null}

      {step === 4 ? (
        <section className={surfaceClass} aria-labelledby="moving-result-title">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-blue-700">Ihre erste Einschätzung</p>
          <h2 ref={resultHeadingRef} tabIndex={-1} id="moving-result-title" className="mt-2 text-3xl font-black tracking-tight text-slate-950 outline-none sm:text-4xl">
            Voraussichtlicher Aufwand: {CALCULATOR_BAND_LABELS[estimate.effortBand]}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{estimate.calculationSummary}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ResultList title="Berücksichtigt" items={estimate.includedFactors} emptyText="Noch keine belastbaren Faktoren angegeben." />
            <ResultList title="Für eine genauere Einordnung fehlt" items={estimate.missingInformation} emptyText="Die zentralen Angaben sind vorhanden." />
          </div>

          <section className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <h3 className="font-black text-blue-950">Mögliche Zusatzleistungen</h3>
            <p className="mt-2 text-sm leading-6 text-blue-900">
              {input.additionalServices.length > 0
                ? `Ausgewählt: ${input.additionalServices.map((service) => SERVICE_LABELS[service]).join(", ")}. Weitere Leistungen werden nur nach Absprache ergänzt.`
                : "Demontage, Montage, Verpackung, Entrümpelung, Reinigung oder Klaviertransport können bei Bedarf separat geprüft werden."}
            </p>
          </section>

          <details className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
            <summary className="min-h-11 cursor-pointer py-2 font-black text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100">So wurde die Einschätzung gebildet</summary>
            <p className="mt-3 text-sm leading-6 text-slate-700">Berücksichtigt werden nur verständliche Aufwandsfaktoren. Nicht eingerechnet sind:</p>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
              {estimate.excludedFactors.map((factor) => <li key={factor}>• {factor}</li>)}
            </ul>
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
          {step === 1 ? (
            <Link href="/rechner" className={secondaryButtonClass}>Zur Rechnerauswahl</Link>
          ) : (
            <button type="button" onClick={goBack} className={secondaryButtonClass}>Zurück</button>
          )}
          <button type="button" onClick={goNext} className={primaryButtonClass}>{step === 3 ? "Einschätzung anzeigen" : "Weiter"}</button>
        </div>
      ) : null}
    </div>
  );
}
