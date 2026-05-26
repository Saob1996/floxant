"use client";

import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";

import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_PRICE_CONFIG,
  DUESSELDORF_CLEANING_WHATSAPP_BASE_MESSAGE,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";
import { buildDuesseldorfCleaningIntakePayload } from "@/lib/duesseldorf-cleaning-intake";

type ServiceValue =
  | "wohnungsreinigung"
  | "bueroreinigung"
  | "hotelreinigung"
  | "grundreinigung"
  | "treppenhausreinigung"
  | "uebergabereinigung"
  | "endreinigung";

type ConditionValue = "leicht" | "normal" | "stärker verschmutzt";
type WindowsValue = "nein" | "wenige Fenster" | "viele Fenster";
type UrgencyValue = "flexibel" | "diese Woche" | "dringend";

const CONDITION_FACTORS: Record<ConditionValue, number> = {
  leicht: 0.9,
  normal: 1,
  "stärker verschmutzt": 1.25,
};

const WINDOWS_ADDONS: Record<WindowsValue, number> = {
  nein: 0,
  "wenige Fenster": 25,
  "viele Fenster": 55,
};

const URGENCY_FACTORS: Record<UrgencyValue, number> = {
  flexibel: 1,
  "diese Woche": 1.1,
  dringend: 1.2,
};

function euro(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getQueryValue(key: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) || "";
}

export function DuesseldorfCleaningCalculator() {
  const [serviceType, setServiceType] = useState<ServiceValue>("wohnungsreinigung");
  const [areaM2, setAreaM2] = useState(70);
  const [condition, setCondition] = useState<ConditionValue>("normal");
  const [furnished, setFurnished] = useState(false);
  const [windows, setWindows] = useState<WindowsValue>("nein");
  const [kitchenIntensive, setKitchenIntensive] = useState(false);
  const [bathroomIntensive, setBathroomIntensive] = useState(false);
  const [urgency, setUrgency] = useState<UrgencyValue>("flexibel");
  const [districtOrZip, setDistrictOrZip] = useState("");
  const [budgetSuggestion, setBudgetSuggestion] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const estimate = useMemo(() => {
    const config = DUESSELDORF_CLEANING_PRICE_CONFIG[serviceType];
    const conditionFactor = CONDITION_FACTORS[condition];
    const urgencyFactor = URGENCY_FACTORS[urgency];
    const furnishedFactor = furnished ? 1.1 : 1;
    const extras =
      WINDOWS_ADDONS[windows] +
      (kitchenIntensive ? 35 : 0) +
      (bathroomIntensive ? 30 : 0);

    const baseMin = Math.max(
      config.minimum,
      areaM2 * config.minPerM2 * conditionFactor * urgencyFactor * furnishedFactor + extras,
    );
    const baseMax = Math.max(
      config.minimum,
      areaM2 * config.maxPerM2 * conditionFactor * urgencyFactor * furnishedFactor + extras,
    );

    return {
      min: Math.round(baseMin),
      max: Math.round(Math.max(baseMin + 18, baseMax)),
    };
  }, [areaM2, bathroomIntensive, condition, furnished, kitchenIntensive, serviceType, urgency, windows]);

  const whatsappHref = useMemo(() => {
    const lines = [
      DUESSELDORF_CLEANING_WHATSAPP_BASE_MESSAGE,
      `Reinigungsart: ${serviceType}`,
      `Fläche: ${areaM2} m²`,
      districtOrZip.trim() ? `Stadtteil / PLZ: ${districtOrZip.trim()}` : "",
      budgetSuggestion.trim() ? `Budget / Preisrahmen: ${budgetSuggestion.trim()}` : "",
      `Preisbereich: ca. ${euro(estimate.min)} bis ${euro(estimate.max)}`,
    ].filter(Boolean);

    return buildDuesseldorfCleaningWhatsAppHref(lines.join("\n"));
  }, [areaM2, budgetSuggestion, districtOrZip, estimate.max, estimate.min, serviceType]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const intakePayload = buildDuesseldorfCleaningIntakePayload({
        serviceType,
        areaM2,
        condition,
        furnished,
        windows,
        kitchenIntensive,
        bathroomIntensive,
        urgency,
        districtOrZip,
        budgetSuggestion,
        name,
        phone,
        email,
        message,
        estimatedPriceMin: estimate.min,
        estimatedPriceMax: estimate.max,
      });
      const landingPage =
        typeof window === "undefined"
          ? "/duesseldorf/reinigung"
          : `${window.location.pathname}${window.location.search}`;
      const referralCode = getQueryValue("ref") || getQueryValue("partner_code") || getQueryValue("referral_code");

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "booking_wizard",
          name: name.trim() || "Interessent",
          phone: phone.trim(),
          email: email.trim(),
          service: "reinigung",
          message: [
            budgetSuggestion.trim()
              ? `Budget / Preisrahmen: ${budgetSuggestion.trim()}`
              : "",
            message.trim(),
          ]
            .filter(Boolean)
            .join("\n"),
          timestamp: intakePayload.metadata.createdAt,
          landingPage,
          referrer: typeof document === "undefined" ? "" : document.referrer,
          utmSource: getQueryValue("utm_source"),
          utmMedium: getQueryValue("utm_medium"),
          utmCampaign: getQueryValue("utm_campaign"),
          utmContent: getQueryValue("utm_content"),
          referralCode,
          partnerCode: referralCode,
          upgrades: [],
          details: intakePayload,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || result.error || "Anfrage konnte nicht gesendet werden.");
      }

      setSuccess(true);
    } catch (submitError: any) {
      setError(
        submitError?.message ||
          "Die Anfrage konnte gerade nicht übertragen werden. Bitte nutzen Sie WhatsApp als Alternative.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-[1rem] border border-emerald-200 bg-[linear-gradient(180deg,rgba(236,253,245,0.98),rgba(255,255,255,0.98))] p-8 shadow-[0_28px_72px_rgba(16,185,129,0.14)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-6 text-3xl font-bold text-slate-950">
          Anfrage erfolgreich übermittelt
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
          Ihre Anfrage wurde an FLOXANT Reinigung Düsseldorf übermittelt.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Falls Sie lieber direkt weiterschreiben möchten, steht WhatsApp als schneller
          Folgeweg bereit.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-[0.85rem] bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950"
            data-event="click_whatsapp"
            data-service="reinigung"
            data-region="duesseldorf"
          >
            <MessageCircle className="h-4 w-4" />
            Per WhatsApp fortsetzen
          </a>
          <a
            href={`tel:${DUESSELDORF_CLEANING.phoneRaw}`}
            className="inline-flex items-center justify-center rounded-[0.85rem] border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-900"
            data-event="click_phone"
            data-service="reinigung"
            data-region="duesseldorf"
          >
            015771105087 anrufen
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-[1rem] border border-slate-200 bg-white p-6 shadow-[0_24px_64px_rgba(15,23,42,0.08)] md:p-8"
        data-event="submit_budget_request"
        data-service="reinigung"
        data-region="duesseldorf"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Reinigungsart">
            <select
              value={serviceType}
              onChange={(event) => setServiceType(event.target.value as ServiceValue)}
              className="duesseldorf-input"
            >
              <option value="wohnungsreinigung">Wohnungsreinigung</option>
              <option value="bueroreinigung">Büroreinigung</option>
              <option value="hotelreinigung">Hotelreinigung</option>
              <option value="grundreinigung">Grundreinigung</option>
              <option value="treppenhausreinigung">Treppenhausreinigung</option>
              <option value="uebergabereinigung">Übergabereinigung</option>
              <option value="endreinigung">Endreinigung</option>
            </select>
          </Field>
          <Field label="Fläche in m²">
            <input
              type="number"
              min={10}
              value={areaM2}
              onChange={(event) => setAreaM2(Number(event.target.value) || 0)}
              className="duesseldorf-input"
            />
          </Field>
          <Field label="Zustand">
            <select
              value={condition}
              onChange={(event) => setCondition(event.target.value as ConditionValue)}
              className="duesseldorf-input"
            >
              <option value="leicht">leicht</option>
              <option value="normal">normal</option>
              <option value="stärker verschmutzt">stärker verschmutzt</option>
            </select>
          </Field>
          <Field label="Möbliert">
            <select
              value={furnished ? "ja" : "nein"}
              onChange={(event) => setFurnished(event.target.value === "ja")}
              className="duesseldorf-input"
            >
              <option value="nein">nein</option>
              <option value="ja">ja</option>
            </select>
          </Field>
          <Field label="Fensterreinigung">
            <select
              value={windows}
              onChange={(event) => setWindows(event.target.value as WindowsValue)}
              className="duesseldorf-input"
            >
              <option value="nein">nein</option>
              <option value="wenige Fenster">wenige Fenster</option>
              <option value="viele Fenster">viele Fenster</option>
            </select>
          </Field>
          <Field label="Terminwunsch">
            <select
              value={urgency}
              onChange={(event) => setUrgency(event.target.value as UrgencyValue)}
              className="duesseldorf-input"
            >
              <option value="flexibel">flexibel</option>
              <option value="diese Woche">diese Woche</option>
              <option value="dringend">dringend</option>
            </select>
          </Field>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="rounded-[0.85rem] border border-slate-200 bg-slate-50 p-4">
            <span className="text-sm font-semibold text-slate-900">Küche intensiv</span>
            <div className="mt-3 flex gap-2">
              <Toggle active={!kitchenIntensive} onClick={() => setKitchenIntensive(false)}>
                nein
              </Toggle>
              <Toggle active={kitchenIntensive} onClick={() => setKitchenIntensive(true)}>
                ja
              </Toggle>
            </div>
          </label>
          <label className="rounded-[0.85rem] border border-slate-200 bg-slate-50 p-4">
            <span className="text-sm font-semibold text-slate-900">Bad intensiv</span>
            <div className="mt-3 flex gap-2">
              <Toggle active={!bathroomIntensive} onClick={() => setBathroomIntensive(false)}>
                nein
              </Toggle>
              <Toggle active={bathroomIntensive} onClick={() => setBathroomIntensive(true)}>
                ja
              </Toggle>
            </div>
          </label>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field label="Stadtteil / PLZ">
            <input
              value={districtOrZip}
              onChange={(event) => setDistrictOrZip(event.target.value)}
              placeholder="z. B. Bilk oder 40213"
              className="duesseldorf-input"
            />
          </Field>
          <Field label="Name">
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ihr Name"
              className="duesseldorf-input"
            />
          </Field>
          <Field label="Telefon">
            <input
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="0157..."
              className="duesseldorf-input"
            />
          </Field>
          <Field label="E-Mail optional">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@beispiel.de"
              className="duesseldorf-input"
            />
          </Field>
        </div>

        <Field label="Budget / Preisrahmen optional" className="mt-4">
          <input
            value={budgetSuggestion}
            onChange={(event) => setBudgetSuggestion(event.target.value)}
            placeholder="z. B. bis 180 €, 250-300 € oder bitte prüfen"
            className="duesseldorf-input"
          />
        </Field>
        <p className="mt-2 text-xs leading-6 text-slate-500">
          Ihr Budget ist keine automatische Zusage. Es hilft uns, Umfang, Zustand und Termin
          ehrlich einzuordnen.
        </p>

        <Field label="Nachricht optional" className="mt-4">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Kurze Hinweise zu Objekt, Zugang oder Termin"
            rows={4}
            className="duesseldorf-input min-h-[120px] resize-y"
          />
        </Field>

        {error ? (
          <div className="mt-4 rounded-[0.85rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={submitting || !name.trim() || !phone.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-[0.85rem] bg-slate-950 px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            data-event="submit_budget_request"
            data-service="reinigung"
            data-region="duesseldorf"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Anfrage unverbindlich senden
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-[0.85rem] border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900"
            data-event="click_whatsapp"
            data-service="reinigung"
            data-region="duesseldorf"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp mit Angaben öffnen
          </a>
        </div>
      </form>

      <aside className="rounded-[1rem] border border-slate-200 bg-[linear-gradient(180deg,#0f172a_0%,#132238_100%)] p-6 text-white shadow-[0_28px_72px_rgba(15,23,42,0.2)] md:p-8">
        <div className="text-[11px] font-black uppercase tracking-normal text-teal-300">
          Unverbindliche Ersteinschätzung
        </div>
        <h3 className="mt-4 text-3xl font-bold">
          ca. {euro(estimate.min)} bis {euro(estimate.max)}
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Dies ist eine unverbindliche Ersteinschätzung. Der finale Preis hängt vom
          tatsächlichen Zustand, Umfang und Termin ab.
        </p>

        <div className="mt-6 space-y-3">
          {[
            `Reinigungsart: ${serviceType}`,
            `Fläche: ${areaM2} m²`,
            `Zustand: ${condition}`,
            budgetSuggestion.trim()
              ? `Budget: ${budgetSuggestion.trim()}`
              : "Budget: offen / bitte prüfen",
            districtOrZip.trim() ? `Ort: ${districtOrZip.trim()}` : "Ort: Düsseldorf / Umgebung",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[0.85rem] border border-white/10 bg-white/6 px-4 py-3 text-sm text-slate-100"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[0.95rem] border border-white/10 bg-white/6 p-5">
          <div className="text-sm font-semibold text-white">Was der Rechner bewusst nicht tut</div>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Er ersetzt kein geprüftes Angebot und bestätigt keinen Endpreis automatisch.
            Er dient als starker, ehrlicher Einstieg für Reinigung in Düsseldorf.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-semibold text-slate-900">{label}</span>
      {children}
    </label>
  );
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-[0.75rem] bg-slate-950 px-4 py-2 text-xs font-bold text-white"
          : "rounded-[0.75rem] border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700"
      }
    >
      {children}
    </button>
  );
}
