"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Calculator,
  CheckCircle2,
  Gauge,
  ShieldAlert,
  WalletCards,
} from "lucide-react";

import { calculateInternalCost } from "@/lib/pricing/internal-cost-engine";
import type { InternalCostInput, InternalServiceType } from "@/lib/pricing/types";
import { cn } from "@/lib/utils";

type PricingWorkbenchBooking = {
  id: string;
  name: string;
  service: string;
  status: string;
  details: {
    valuation?: {
      customerBudget?: number | null;
      priceSuggestion?: number | null;
      systemPriceRangeMin?: number;
      systemPriceRangeMax?: number;
      topDrivers?: string[];
    };
    configuration?: Record<string, unknown>;
  };
};

interface InternalPricingWorkbenchProps {
  mode: "calculator" | "review";
  booking?: PricingWorkbenchBooking | null;
}

type FormState = InternalCostInput;

function inferServiceType(service?: string): InternalServiceType {
  if (service === "reinigung") return "reinigung";
  if (service === "entsorgung" || service === "firmenentsorgung") return "entsorgung";
  if (service === "leerfahrt" || service === "beiladung") return "leer_rueckfahrt";
  if (service === "b2b_reinigung") return "b2b_reinigung";
  return "umzug";
}

function createInitialState(booking?: PricingWorkbenchBooking | null): FormState {
  const config = booking?.details?.configuration || {};
  const valuation = booking?.details?.valuation || {};
  const serviceType = inferServiceType(booking?.service);

  return {
    serviceType,
    distanceKm: Number(config.distanceKm || config.distance || 20) || 20,
    estimatedVolumeM3: Number(config.cbm || config.estimatedVolumeM3 || config.wasteVolumeM3 || 10) || 10,
    estimatedHours: Number(config.estimatedHours || 6) || 6,
    teamSize: Number(config.teamSize || 2) || 2,
    vehiclesCount: Number(config.vehiclesCount || 1) || 1,
    floorsFrom: Number(config.fromFloor || 0) || 0,
    floorsTo: Number(config.toFloor || 0) || 0,
    elevatorFrom: Boolean(config.hasElevatorFrom),
    elevatorTo: Boolean(config.hasElevatorTo),
    walkingDistanceMeters:
      Number(config.walkingDistanceMeters || config.walkingDistanceFrom || config.loadingDistanceMeters || 15) || 15,
    heavyItems: Array.isArray(config.heavyItems) ? config.heavyItems.length : Number(config.heavyItems || 0) || 0,
    packingService: Boolean(config.packingService),
    disassemblyService: Boolean(config.disassemblyService),
    assemblyService: Boolean(config.assemblyService),
    noParkingZone: Boolean(config.noParkingZone || config.noParkingZoneFrom || config.noParkingZoneTo),
    weekendOrUrgent: config.timeConstraint === "wochenende" || config.timeConstraint === "dringend",
    disposalWeightKg: Number(config.disposalWeightKg || 0) || 0,
    cleaningAreaM2: Number(config.areaM2 || config.cleaningAreaM2 || 120) || 120,
    cleaningCondition:
      config.cleaningCondition === "leicht" || config.cleaningCondition === "stark"
        ? config.cleaningCondition
        : "mittel",
    customerPriceGross:
      valuation.customerBudget ||
      valuation.priceSuggestion ||
      valuation.systemPriceRangeMax ||
      undefined,
    vatRate: 19,
    desiredMarginPercent: 22,
  };
}

function formatEuro(value: number | null) {
  const safe = typeof value === "number" && Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(safe);
}

function verdictTone(verdict: string) {
  if (verdict === "gut") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (verdict === "knapp") return "border-amber-200 bg-amber-50 text-amber-700";
  if (verdict === "riskant") return "border-orange-200 bg-orange-50 text-orange-700";
  return "border-red-200 bg-red-50 text-red-700";
}

export function InternalPricingWorkbench({
  mode,
  booking,
}: InternalPricingWorkbenchProps) {
  const [form, setForm] = useState<FormState>(() => createInitialState(booking));

  useEffect(() => {
    setForm(createInitialState(booking));
  }, [booking?.id]);

  const result = useMemo(() => calculateInternalCost(form), [form]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
      <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
              {mode === "review" ? "Preisprüfung" : "Interner Rechner"}
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {mode === "review"
                ? "Kundenpreis gegen internen Aufwand prüfen"
                : "Auftragskosten schnell intern überschlagen"}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {mode === "review"
                ? "Links die Eckdaten prüfen, rechts sofort Mindestpreis, Zielpreis, Marge und Hauptrisiken sehen."
                : "Für Telefon, Vor-Ort-Termin oder schnelle Einschätzung ohne konkrete Anfrage."}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <Calculator className="h-5 w-5" />
          </div>
        </div>

        {mode === "review" && booking ? (
          <div className="mb-5 rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
              Ausgewählte Anfrage
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="text-base font-bold text-slate-950">{booking.name}</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-600">
                {booking.service.replace(/_/g, " ")}
              </span>
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <SelectField
            label="Service"
            value={form.serviceType}
            onChange={(value) => setField("serviceType", value as InternalServiceType)}
            options={[
              ["umzug", "Umzug"],
              ["reinigung", "Reinigung"],
              ["entsorgung", "Entsorgung"],
              ["b2b_reinigung", "B2B-Reinigung"],
              ["leer_rueckfahrt", "Leer-Rückfahrt"],
            ]}
          />
          <Field
            label="Kundenpreis brutto"
            type="number"
            value={form.customerPriceGross ?? ""}
            onChange={(value) =>
              setField(
                "customerPriceGross",
                value === "" ? undefined : Number(value),
              )
            }
          />
          <Field
            label="Distanz in km"
            type="number"
            value={form.distanceKm ?? ""}
            onChange={(value) => setField("distanceKm", Number(value))}
          />
          <Field
            label="Geplante Stunden"
            type="number"
            value={form.estimatedHours ?? ""}
            onChange={(value) => setField("estimatedHours", Number(value))}
          />
          <Field
            label="Teamgröße"
            type="number"
            value={form.teamSize ?? ""}
            onChange={(value) => setField("teamSize", Number(value))}
          />
          <Field
            label="Fahrzeuge"
            type="number"
            value={form.vehiclesCount ?? ""}
            onChange={(value) => setField("vehiclesCount", Number(value))}
          />
          <Field
            label="Volumen in m³"
            type="number"
            value={form.estimatedVolumeM3 ?? ""}
            onChange={(value) => setField("estimatedVolumeM3", Number(value))}
          />
          <Field
            label="Fläche in m²"
            type="number"
            value={form.cleaningAreaM2 ?? ""}
            onChange={(value) => setField("cleaningAreaM2", Number(value))}
          />
          <SelectField
            label="Zustand"
            value={form.cleaningCondition || "mittel"}
            onChange={(value) => setField("cleaningCondition", value as FormState["cleaningCondition"])}
            options={[
              ["leicht", "Leicht"],
              ["mittel", "Mittel"],
              ["stark", "Stark"],
            ]}
          />
          <Field
            label="Entsorgungsgewicht kg"
            type="number"
            value={form.disposalWeightKg ?? ""}
            onChange={(value) => setField("disposalWeightKg", Number(value))}
          />
          <Field
            label="Stockwerke Start"
            type="number"
            value={form.floorsFrom ?? ""}
            onChange={(value) => setField("floorsFrom", Number(value))}
          />
          <Field
            label="Stockwerke Ziel"
            type="number"
            value={form.floorsTo ?? ""}
            onChange={(value) => setField("floorsTo", Number(value))}
          />
          <Field
            label="Laufweg in Metern"
            type="number"
            value={form.walkingDistanceMeters ?? ""}
            onChange={(value) => setField("walkingDistanceMeters", Number(value))}
          />
          <Field
            label="Schwere Stücke"
            type="number"
            value={form.heavyItems ?? ""}
            onChange={(value) => setField("heavyItems", Number(value))}
          />
          <Field
            label="Zielmarge in %"
            type="number"
            value={form.desiredMarginPercent ?? ""}
            onChange={(value) => setField("desiredMarginPercent", Number(value))}
          />
          <Field
            label="MwSt. in %"
            type="number"
            value={form.vatRate ?? ""}
            onChange={(value) => setField("vatRate", Number(value))}
          />
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <ToggleField
            label="Start mit Aufzug"
            checked={Boolean(form.elevatorFrom)}
            onChange={(checked) => setField("elevatorFrom", checked)}
          />
          <ToggleField
            label="Ziel mit Aufzug"
            checked={Boolean(form.elevatorTo)}
            onChange={(checked) => setField("elevatorTo", checked)}
          />
          <ToggleField
            label="Packservice"
            checked={Boolean(form.packingService)}
            onChange={(checked) => setField("packingService", checked)}
          />
          <ToggleField
            label="Demontage"
            checked={Boolean(form.disassemblyService)}
            onChange={(checked) => setField("disassemblyService", checked)}
          />
          <ToggleField
            label="Montage"
            checked={Boolean(form.assemblyService)}
            onChange={(checked) => setField("assemblyService", checked)}
          />
          <ToggleField
            label="Zugang / Parken"
            checked={Boolean(form.noParkingZone)}
            onChange={(checked) => setField("noParkingZone", checked)}
          />
          <ToggleField
            label="Wochenende / Eilauftrag"
            checked={Boolean(form.weekendOrUrgent)}
            onChange={(checked) => setField("weekendOrUrgent", checked)}
          />
        </div>
      </section>

      <section className="space-y-6">
        <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                Ergebnis
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                {result.verdict === "gut"
                  ? "Wirtschaftlich solide"
                  : result.verdict === "knapp"
                    ? "Knapp kalkuliert"
                    : result.verdict === "riskant"
                      ? "Nur mit sauberer Nachverhandlung"
                      : "So nicht wirtschaftlich"}
              </h3>
            </div>
            <span
              className={cn(
                "rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]",
                verdictTone(result.verdict)
              )}
            >
              {result.verdict}
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <ResultCard label="Interne Kosten brutto" value={formatEuro(result.internalCostGross)} icon={WalletCards} />
            <ResultCard label="Mindestpreis brutto" value={formatEuro(result.suggestedMinimumGross)} icon={ShieldAlert} />
            <ResultCard label="Zielpreis brutto" value={formatEuro(result.targetPriceGross)} icon={Gauge} />
            <ResultCard
              label="Erwarteter Gewinn netto"
              value={formatEuro(result.expectedProfitNet)}
              icon={result.expectedProfitNet >= 0 ? CheckCircle2 : AlertTriangle}
              tone={result.expectedProfitNet >= 0 ? "green" : "red"}
            />
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <MiniStat
              label="Kundenpreis brutto"
              value={result.input.customerPriceGross ? formatEuro(result.input.customerPriceGross) : "Nicht gesetzt"}
            />
            <MiniStat label="Marge" value={`${result.expectedMarginPercent.toFixed(1)} %`} />
            <MiniStat label="Risiko" value={result.riskLevel.toUpperCase()} />
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
          <div className="mb-4 flex items-center gap-2 text-slate-500">
            <Calculator className="h-4 w-4 text-blue-700" />
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
              Kosten-Breakdown
            </h4>
          </div>
          <div className="overflow-hidden rounded-[1.2rem] border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-[0.14em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-bold">Block</th>
                  <th className="px-4 py-3 font-bold">Beschreibung</th>
                  <th className="px-4 py-3 text-right font-bold">Netto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {result.breakdown.map((item) => (
                  <tr key={item.key} className="bg-white">
                    <td className="px-4 py-3 font-semibold text-slate-900">{item.label}</td>
                    <td className="px-4 py-3 text-slate-600">{item.description}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">
                      {formatEuro(item.amountNet)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-950/5">
          <div className="mb-3 flex items-center gap-2 text-slate-500">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
              Hauptrisiken
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {result.explanation.map((item) => (
              <li key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<[string, string]>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition",
        checked
          ? "border-blue-200 bg-blue-50 text-slate-950"
          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50/50"
      )}
    >
      <span className="font-semibold">{label}</span>
      <span
        className={cn(
          "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]",
          checked ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
        )}
      >
        {checked ? "Ja" : "Nein"}
      </span>
    </button>
  );
}

function ResultCard({
  label,
  value,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  icon: typeof Calculator;
  tone?: "default" | "green" | "red";
}) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</span>
        <Icon
          className={cn(
            "h-4 w-4",
            tone === "green" ? "text-emerald-600" : tone === "red" ? "text-red-600" : "text-blue-700"
          )}
        />
      </div>
      <div className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{value}</div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</div>
      <div className="mt-1 text-base font-semibold text-slate-950">{value}</div>
    </div>
  );
}
