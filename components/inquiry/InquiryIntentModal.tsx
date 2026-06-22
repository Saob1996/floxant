"use client";

import { AnimatePresence, m } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, ExternalLink, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { company } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import {
  InquiryConfig,
  InquiryIntent,
  InquiryRegion,
  inquiryConfigs,
  OFFER_CHECK_ROUTE,
} from "@/components/inquiry/inquiry-config";

type InquiryIntentModalProps = {
  intent: InquiryIntent | null;
  open: boolean;
  onClose: () => void;
  initialRegion?: InquiryRegion;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const regionLabels: Record<InquiryRegion, { title: string; text: string }> = {
  "regensburg-bayern": {
    title: "Regensburg / Bayern",
    text: "Reinigung nach Einsatzgebiet und Verfügbarkeit.",
  },
  duesseldorf: {
    title: "Düsseldorf",
    text: "Reinigung zuerst. Keine Vermischung mit Regensburg/Bayern.",
  },
};

function getInitialValues(config: InquiryConfig, region?: InquiryRegion) {
  return {
    region: region || config.defaultRegion,
    contactName: "",
    phone: "",
    email: "",
    location: "",
    startLocation: "",
    destinationLocation: "",
    scope: "",
    timeframe: "",
    objectType: "",
    size: "",
    clearanceType: "",
    concern: "",
    preferredContact: "Rückruf oder WhatsApp",
  };
}

function getServiceType(config: InquiryConfig, values: Record<string, string>) {
  if (config.intent === "cleaning" && values.region === "duesseldorf") {
    return "duesseldorf_moeblierte_wohnung_reinigung";
  }

  if (config.intent === "express") {
    const concern = `${values.concern} ${values.location}`.toLowerCase();
    if (concern.includes("reinigung") || concern.includes("düsseldorf") || concern.includes("duesseldorf")) return "reinigung";
    if (concern.includes("entrümpel") || concern.includes("entruempel") || concern.includes("entsorgung")) return "entsorgung";
    return "umzug";
  }

  return config.serviceType;
}

function getPrimaryLocation(values: Record<string, string>) {
  return values.location || values.startLocation || "";
}

function buildSummary(config: InquiryConfig, values: Record<string, string>) {
  if (config.intent === "move") {
    return [
      `Startort: ${values.startLocation || "nicht angegeben"}`,
      `Zielort: ${values.destinationLocation || "nicht angegeben"}`,
      `Umfang: ${values.scope || "nicht angegeben"}`,
      `Zeitraum: ${values.timeframe || "nicht angegeben"}`,
    ].join("\n");
  }

  if (config.intent === "cleaning") {
    return [
      `Region: ${values.region === "duesseldorf" ? "Düsseldorf Reinigung" : "Regensburg/Bayern Reinigung"}`,
      `Ort: ${values.location || "nicht angegeben"}`,
      `Objektart: ${values.objectType || "nicht angegeben"}`,
      `Größe: ${values.size || "nicht angegeben"}`,
      `Zeitraum: ${values.timeframe || "nicht angegeben"}`,
    ].join("\n");
  }

  if (config.intent === "clearance") {
    return [
      `Ort: ${values.location || "nicht angegeben"}`,
      `Art: ${values.clearanceType || "nicht angegeben"}`,
      `Umfang: ${values.scope || "nicht angegeben"}`,
      `Zeitraum: ${values.timeframe || "nicht angegeben"}`,
      "Fotos: optional per WhatsApp möglich",
    ].join("\n");
  }

  return [
    `Ort: ${values.location || "nicht angegeben"}`,
    `Anliegen: ${values.concern || "nicht angegeben"}`,
    "Details sollen im Rückruf geklärt werden.",
  ].join("\n");
}

function buildStructuredDetails(
  config: InquiryConfig,
  values: Record<string, string>,
  pathname: string,
) {
  const serviceType = getServiceType(config, values);
  const region = values.region as InquiryRegion;
  const summary = buildSummary(config, values);
  const createdAt = new Date().toISOString();

  return {
    contact: {
      fullName: values.contactName?.trim() || "Interessent",
      email: values.email?.trim() || "",
      phone: values.phone?.trim() || "",
      callbackPreference: values.preferredContact || "Rückruf oder WhatsApp",
      notes: summary,
    },
    service: {
      type: serviceType,
      source: "header-modal",
      entryPoint: config.intent,
      presetFromUrl: serviceType,
      regionPreset: region,
    },
    valuation: {
      systemPriceRangeMin: 0,
      systemPriceRangeMax: 0,
      priceRangeMin: 0,
      priceRangeMax: 0,
      valuationLabel: config.title,
      valuationStage: "Header-Intent-Anfrage",
      accuracyState: "Eckdaten für Rückruf",
      topDrivers: [config.label, region, getPrimaryLocation(values)].filter(Boolean),
      priceExplanation: "Header-Intent-Anfrage mit wenigen Kundendaten. Operative Einordnung erfolgt im Rückruf.",
      pricingSignals: {
        intent: config.intent,
        serviceType,
        region,
        source: "header-modal",
      },
    },
    configuration: {
      intent: config.intent,
      serviceType,
      region,
      city: getPrimaryLocation(values),
      location: getPrimaryLocation(values),
      message: summary,
      details: values,
      requestContext: "header-modal",
    },
    metadata: {
      createdAt,
      intakeVersion: "header-intent-1.0",
      source: "header-modal",
      servicePresetFromUrl: serviceType,
      regionPreset: region,
      clientContext: {
        pagePath: pathname,
        intent: config.intent,
        region,
      },
    },
  };
}

export function InquiryIntentModal({
  intent,
  open,
  onClose,
  initialRegion,
}: InquiryIntentModalProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const config = intent ? inquiryConfigs[intent] : null;
  const [values, setValues] = useState<Record<string, string>>(() =>
    getInitialValues(inquiryConfigs.move, initialRegion),
  );

  const whatsappHref = useMemo(() => {
    if (!config) return "#";
    return buildWhatsAppHref(company.phoneRaw, config.whatsappText(values));
  }, [config, values]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!config || !open) return;

    setValues(getInitialValues(config, initialRegion));
    setSubmitState("idle");
    setErrorMessage("");
    window.setTimeout(() => closeButtonRef.current?.focus(), 40);
  }, [config, initialRegion, open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  function update(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!config) return;

    const missingField = config.fields.find((field) => field.required && !values[field.name]?.trim());
    if (missingField) {
      setErrorMessage(`Bitte ausfüllen: ${missingField.label}.`);
      setSubmitState("error");
      return;
    }

    if (!values.phone?.trim() && !values.email?.trim()) {
      setErrorMessage("Bitte Telefonnummer oder WhatsApp-Kontakt angeben.");
      setSubmitState("error");
      return;
    }

    const details = buildStructuredDetails(config, values, pathname);
    const submitData = new FormData();
    submitData.append("type", "booking_wizard");
    submitData.append("service", details.service.type);
    submitData.append("region", values.region);
    submitData.append("name", values.contactName?.trim() || "Interessent");
    submitData.append("email", values.email?.trim() || "");
    submitData.append("phone", values.phone?.trim() || "");
    submitData.append("message", details.configuration.message);
    submitData.append("leadSource", "header-modal");
    submitData.append("sourceComponent", "InquiryIntentModal");
    submitData.append("sourcePage", pathname);
    submitData.append("details", JSON.stringify(details));
    submitData.append("timestamp", details.metadata.createdAt);

    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message || result?.error || "Anfrage konnte nicht gesendet werden.");
      }

      setSubmitState("success");
      window.setTimeout(onClose, 1800);
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Die Anfrage konnte gerade nicht gesendet werden. Bitte nutzen Sie WhatsApp.",
      );
    }
  }

  if (!mounted || !config) return null;

  const Icon = config.icon;
  const showCleaningRegions = config.intent === "cleaning";
  const isOfferCheck = config.intent === "offer-check";

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center p-0 sm:items-center sm:p-5">
          <m.button
            type="button"
            aria-label="Dialog schließen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-md"
            onClick={onClose}
          />

          <m.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-modal-title"
            aria-describedby="inquiry-modal-description"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[10000] grid max-h-[96dvh] w-full overflow-hidden rounded-t-[1.8rem] border border-white/70 bg-white text-slate-950 shadow-[0_32px_100px_rgba(15,23,42,0.34)] sm:max-w-4xl sm:rounded-[2rem] lg:grid-cols-[0.88fr_1.12fr]"
          >
            <div className="relative overflow-hidden border-b border-slate-200 bg-slate-50 p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-blue-100 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-cyan-100 blur-3xl" />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Anfrage-Dialog schließen"
              >
                <X className="h-5 w-5" />
              </button>

              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_14px_34px_rgba(15,23,42,0.22)]">
                <Icon className="h-6 w-6" />
              </span>
              <p className="relative mt-6 text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                FLOXANT Anfrage
              </p>
              <h2 id="inquiry-modal-title" className="relative mt-2 max-w-sm text-3xl font-black leading-tight tracking-tight text-slate-950">
                {config.title}
              </h2>
              <p id="inquiry-modal-description" className="relative mt-4 max-w-sm text-sm font-semibold leading-6 text-slate-600">
                {config.subtitle}
              </p>
              <div className="relative mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700 shadow-sm">
                {config.regionScope}
              </div>

              {isOfferCheck ? (
                <div className="relative mt-5 grid gap-2 text-sm font-semibold leading-6 text-slate-700">
                  <span>Preis realistisch?</span>
                  <span>Leistungen vollständig?</span>
                  <span>Versteckte Kosten oder unklarer Umfang?</span>
                </div>
              ) : null}
            </div>

            <div className="max-h-[72dvh] overflow-y-auto bg-white p-5 text-slate-950 sm:p-7 lg:max-h-[96dvh]">
              {isOfferCheck ? (
                <div className="grid content-center gap-3">
                  <Link
                    href={config.routeFallback || OFFER_CHECK_ROUTE}
                    onClick={onClose}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Zur Angebotsprüfung
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Angebot per WhatsApp senden
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  {showCleaningRegions ? (
                    <div>
                      <label className="text-sm font-black text-slate-950">Einsatzgebiet</label>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {(Object.keys(regionLabels) as InquiryRegion[]).map((region) => (
                          <button
                            key={region}
                            type="button"
                            onClick={() => update("region", region)}
                            className={cn(
                              "min-h-24 rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-500",
                              values.region === region
                                ? "border-blue-600 bg-blue-600 text-white shadow-[0_14px_34px_rgba(37,99,235,0.2)]"
                                : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50",
                            )}
                          >
                            <span
                              className={cn(
                                "block text-sm font-black",
                                values.region === region ? "text-white" : "text-slate-950",
                              )}
                            >
                              {regionLabels[region].title}
                            </span>
                            <span
                              className={cn(
                                "mt-1 block text-xs font-semibold leading-5",
                                values.region === region ? "text-blue-50" : "text-slate-600",
                              )}
                            >
                              {regionLabels[region].text}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="grid gap-3 sm:grid-cols-2">
                    {config.fields.map((field) => (
                      <label
                        key={field.name}
                        className={cn("grid gap-1.5 text-sm font-bold text-slate-800", field.type === "textarea" && "sm:col-span-2")}
                      >
                        <span>
                          {field.label}
                          {field.required ? <span className="text-blue-700"> *</span> : null}
                        </span>
                        {field.type === "select" ? (
                          <select
                            value={values[field.name] || ""}
                            required={field.required}
                            onChange={(event) => update(field.name, event.target.value)}
                            className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                          >
                            <option value="">Bitte wählen</option>
                            {field.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea
                            value={values[field.name] || ""}
                            required={field.required}
                            placeholder={field.placeholder}
                            onChange={(event) => update(field.name, event.target.value)}
                            rows={4}
                            className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                          />
                        ) : (
                          <input
                            value={values[field.name] || ""}
                            required={field.required}
                            type={field.type || "text"}
                            placeholder={field.placeholder}
                            onChange={(event) => update(field.name, event.target.value)}
                            className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                          />
                        )}
                      </label>
                    ))}
                  </div>

                  {config.intent === "clearance" ? (
                    <p className="rounded-2xl border border-blue-100 bg-blue-50 p-3 text-sm font-semibold leading-6 text-blue-950">
                      Fotos sind optional. Wenn sie helfen, können Sie sie nach dem Absenden direkt per WhatsApp senden.
                    </p>
                  ) : null}

                  {submitState === "success" ? (
                    <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-black text-emerald-800">
                      <CheckCircle2 className="h-5 w-5" />
                      Anfrage gesendet. FLOXANT meldet sich.
                    </div>
                  ) : null}

                  {submitState === "error" && errorMessage ? (
                    <div className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-bold leading-6 text-red-800">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                      {errorMessage}
                    </div>
                  ) : null}

                  <div className="sticky bottom-0 -mx-5 -mb-5 grid gap-2 border-t border-slate-100 bg-white/95 p-5 backdrop-blur sm:-mx-7 sm:-mb-7 sm:grid-cols-[1fr_0.9fr] sm:p-7">
                    <button
                      type="submit"
                      aria-label={submitState === "submitting" ? "Anfrage wird gesendet" : config.primaryCta}
                      disabled={submitState === "submitting" || submitState === "success"}
                      className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitState === "submitting" ? "Wird gesendet..." : config.primaryCta}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Per WhatsApp senden
                    </a>
                  </div>
                </form>
              )}
            </div>
          </m.section>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
