"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2, Loader2, MapPin, PackageOpen, Route, Send, Truck } from "lucide-react";

import type { BackhaulOffer } from "@/lib/backhaul-offers";

type InquiryState = {
  offerId: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  pickupLocation: string;
  deliveryLocation: string;
  dateFlexibility: string;
  items: string;
  budget: string;
  message: string;
};

const emptyInquiry: InquiryState = {
  offerId: "",
  company: "",
  name: "",
  email: "",
  phone: "",
  pickupLocation: "",
  deliveryLocation: "Regensburg / ca. 150 km Umkreis",
  dateFlexibility: "",
  items: "",
  budget: "",
  message: "",
};

const quickBackhaulPresets = [
  {
    label: "Büromöbel",
    items: "Büromöbel, Stühle, Tische, Regale oder Archivkartons",
    note: "Bitte Fotos, Etage und Ladefenster ergänzen.",
  },
  {
    label: "Einzelstück",
    items: "Einzelstück oder wenige Möbelstücke mit Maßen und Gewicht",
    note: "Maße, Gewicht und Abholzeit helfen bei der Rückfahrt-Prüfung.",
  },
  {
    label: "Paletten",
    items: "Paletten, Kartons oder gewerbliche Teilmenge",
    note: "Bitte Stückzahl, Maße und Stapelbarkeit angeben.",
  },
  {
    label: "Wohnungsteil",
    items: "Teilumzug, Kartons und ausgewählte Möbelstücke",
    note: "Fotos und grobe Liste beschleunigen die Einschätzung.",
  },
] as const;

function parseBudget(value: string) {
  const normalized = value.replace(/[^\d.,-]/g, "").replace(/\./g, "").replace(",", ".");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null;
}

function formatDate(date: string) {
  if (!date) return "flexibel";
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}

export function BackhaulOffersBoard({ initialOffers }: { initialOffers: BackhaulOffer[] }) {
  const [offers, setOffers] = useState<BackhaulOffer[]>(initialOffers);
  const [selectedOffer, setSelectedOffer] = useState<BackhaulOffer | null>(initialOffers[0] || null);
  const [form, setForm] = useState<InquiryState>({
    ...emptyInquiry,
    offerId: initialOffers[0]?.id || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetch("/api/backhauls", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: BackhaulOffer[]) => {
        if (!isMounted || !Array.isArray(data) || data.length === 0) return;
        setOffers(data);
        setSelectedOffer((current) => current || data[0]);
        setForm((current) => ({
          ...current,
          offerId: current.offerId || data[0]?.id || "",
        }));
      })
      .catch(() => {
        // No fake fallback routes: customers can still submit a route for review.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const activeOffer = useMemo(
    () => offers.find((offer) => offer.id === form.offerId) || selectedOffer || offers[0],
    [form.offerId, offers, selectedOffer]
  );

  function updateField(field: keyof InquiryState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function applyPreset(preset: (typeof quickBackhaulPresets)[number]) {
    setForm((current) => ({
      ...current,
      items: current.items || preset.items,
      message: current.message || preset.note,
    }));
  }

  async function submitInquiry(event: React.FormEvent) {
    event.preventDefault();
    const missing = [
      !form.name.trim() ? "Name" : "",
      !form.phone.trim() ? "Telefon" : "",
      !form.pickupLocation.trim() ? "Abholort" : "",
      !form.items.trim() ? "Transportgut" : "",
    ].filter(Boolean);

    if (missing.length) {
      setSubmitError(`Bitte ergänzen: ${missing.join(", ")}.`);
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);
    setIsSuccess(false);

    const budget = parseBudget(form.budget);
    const details = {
      contact: {
        fullName: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        callbackPreference: "schnell",
        notes: form.message.trim(),
      },
      service: {
        type: "leerfahrt",
        source: "backhaul_page",
        entryPoint: "/leerfahrt-rueckfahrt",
        presetFromUrl: "leerfahrt-rueckfahrt",
      },
      valuation: {
        systemPriceRangeMin: 0,
        systemPriceRangeMax: 0,
        priceRangeMin: 0,
        priceRangeMax: 0,
        valuationLabel: "Leer-Rückfahrt Anfrage",
        valuationStage: "Rückfahrt-Matching",
        accuracyState: "Erste Einschätzung",
        topDrivers: ["Richtung Regensburg", "freie Fahrzeugkapazität", "Datum und Ladepunkte", "Umwegprüfung"],
        customerBudget: budget,
        priceSuggestion: budget,
        priceExplanation:
          "Die Anfrage bezieht sich auf eine mögliche Leer-Rückfahrt Richtung Regensburg und ca. 150 km Umkreis. FLOXANT prüft, ob Route, Datum, Volumen, Ladepunkte und ein möglicher Umweg zur freien Fahrzeugkapazität passen.",
        pricingSignals: {
          inquiryMode: "backhaul_inquiry",
          companyName: form.company.trim(),
          selectedOfferId: activeOffer?.id,
          selectedOfferTitle: activeOffer?.title,
          destinationRadius: activeOffer?.destinationRadius,
          routeAreas: activeOffer?.routeAreas,
        },
      },
      configuration: {
        requestContext: "backhaul_inquiry",
        selectedOffer: activeOffer,
        companyName: form.company.trim(),
        pickupLocation: form.pickupLocation.trim(),
        deliveryLocation: form.deliveryLocation.trim(),
        dateFlexibility: form.dateFlexibility.trim(),
        items: form.items.trim(),
        customerMessage: form.message.trim(),
      },
      metadata: {
        createdAt: new Date().toISOString(),
        intakeVersion: "1.2.0",
        source: "backhaul_page",
        servicePresetFromUrl: "leerfahrt-rueckfahrt",
      },
    };

    const submitData = new FormData();
    submitData.append("type", "backhaul_inquiry");
    submitData.append("service", "leerfahrt");
    submitData.append("name", form.name.trim());
    submitData.append("email", form.email.trim());
    submitData.append("phone", form.phone.trim());
    submitData.append("budget", form.budget.trim());
    submitData.append("message", form.message.trim());
    submitData.append("details", JSON.stringify(details));
    submitData.append("timestamp", new Date().toISOString());

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) throw new Error("Submit failed");

      setIsSuccess(true);
      setForm({
        ...emptyInquiry,
        offerId: activeOffer?.id || "",
      });
    } catch {
      setSubmitError("Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie FLOXANT direkt.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.03fr_0.97fr]">
      <div className="space-y-4">
        {offers.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-emerald-300 bg-emerald-50/70 p-6">
            <Truck className="mb-4 h-7 w-7 text-emerald-700" />
            <h3 className="text-2xl font-bold tracking-tight text-slate-950">
              Aktuell keine konkrete Rückfahrt veröffentlicht
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              FLOXANT zeigt hier nur echte, gepflegte Rückfahrten. Wenn keine Tour eingetragen ist,
              können Sie trotzdem Start, Ziel, Datum und Umfang über die Rückfahrt-Börse prüfen lassen.
            </p>
            <a
              href="/rueckfahrt-boerse#rueckfahrt-form"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-black text-white transition hover:bg-emerald-800"
              data-event="start_route_check"
              data-source="backhaul_empty_state"
            >
              Flexible Strecke eintragen
            </a>
          </div>
        ) : null}

        {offers.map((offer, index) => {
          const isSelected = activeOffer?.id === offer.id;

          return (
            <m.button
              type="button"
              key={offer.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                setSelectedOffer(offer);
                updateField("offerId", offer.id);
              }}
              className={[
                "card-premium premium-scan w-full rounded-[2rem] p-6 text-left",
                isSelected
                  ? "border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 shadow-[0_24px_60px_rgba(37,99,235,0.12)]"
                  : "border-slate-200 bg-white/96 hover:border-blue-200",
              ].join(" ")}
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700">
                    <Truck className="h-3.5 w-3.5" />
                    freie Rückfahrt für Privat & Firma
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-950">{offer.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{offer.fairPriceNote}</p>
                </div>
                <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm shadow-slate-950/5">
                  <Calendar className="mb-2 h-4 w-4 text-blue-600" />
                  {formatDate(offer.date)}
                  <div className="mt-1 text-xs text-slate-500">{offer.timeWindow}</div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <InfoPill icon={MapPin} label="Start" value={offer.origin} />
                <InfoPill icon={Route} label="Richtung" value={`${offer.destination}, ${offer.destinationRadius}`} />
                <InfoPill icon={PackageOpen} label="Kapazität" value={offer.availableCapacity} />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {offer.routeAreas.slice(0, 8).map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
                <span className="text-sm font-bold text-blue-700">{offer.priceHint}</span>
                <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                  Anfrage vorbereiten
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </m.button>
          );
        })}
      </div>

      <div
        id="leerfahrt-anfrage"
        className="h-fit rounded-[2.4rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(243,247,255,0.98))] p-6 shadow-[0_28px_90px_rgba(15,23,42,0.12)] lg:sticky lg:top-28"
      >
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <m.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="py-12 text-center"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-950">Anfrage gesendet</h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-600">
                FLOXANT prüft jetzt, ob Ihre Sendung zur Rückfahrt passt und meldet sich mit
                einer fairen Einordnung.
              </p>
            </m.div>
          ) : (
            <m.form
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onSubmit={submitInquiry}
              className="space-y-4"
            >
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                  Rückfahrt anfragen
                </div>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                  Passt Ihre Lieferung zur Tour?
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Wenige Eckdaten reichen. Geeignet für Möbel, Büroinventar, Paletten oder
                  Teilmengen. Die Anfrage ist unverbindlich; der faire Preis hängt von Route,
                  Volumen, Ladeaufwand und möglichem Umweg ab.
                </p>
              </div>

              {activeOffer ? (
                <div className="rounded-[1.4rem] border border-emerald-200 bg-emerald-50/70 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700">
                    Ausgewählte Rückfahrt
                  </div>
                  <p className="mt-2 text-sm font-bold text-slate-950">{activeOffer.title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    {activeOffer.origin} nach {activeOffer.destination}, {activeOffer.timeWindow || "nach Absprache"}
                  </p>
                </div>
              ) : null}

              <div>
                <div className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                  Schnellprofil
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {quickBackhaulPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-slate-800 transition hover:border-emerald-200 hover:bg-emerald-50"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <Input label="Firma optional" value={form.company} onChange={(value) => updateField("company", value)} placeholder="z. B. Büro, Kanzlei, Agentur, Lager" />
              <Input label="Name" value={form.name} onChange={(value) => updateField("name", value)} required />
              <div className="grid gap-3 md:grid-cols-2">
                <Input label="Telefon" value={form.phone} onChange={(value) => updateField("phone", value)} required type="tel" />
                <Input label="E-Mail" value={form.email} onChange={(value) => updateField("email", value)} type="email" />
              </div>
              <Input label="Abholort" value={form.pickupLocation} onChange={(value) => updateField("pickupLocation", value)} required placeholder="z. B. München, Nürnberg, Berlin" />
              <Input label="Zielort" value={form.deliveryLocation} onChange={(value) => updateField("deliveryLocation", value)} placeholder="Regensburg / ca. 150 km Umkreis" />
              <Input label="Terminflexibilität" value={form.dateFlexibility} onChange={(value) => updateField("dateFlexibility", value)} placeholder="z. B. flexibel in KW 18" />
              <Textarea label="Was soll mit?" value={form.items} onChange={(value) => updateField("items", value)} required placeholder="Büroinventar, Möbel, Kartons, Paletten, Maschine, Einzelstück..." />
              <Input label="Preisvorstellung optional" value={form.budget} onChange={(value) => updateField("budget", value)} placeholder="z. B. 250 EUR" />
              <Textarea label="Hinweis optional" value={form.message} onChange={(value) => updateField("message", value)} placeholder="Etage, Aufzug, Ladezeiten, Fotos vorhanden..." />

              {submitError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {submitError}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_48px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_58px_rgba(37,99,235,0.3)] disabled:opacity-60"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                Rückfahrt prüfen lassen
              </button>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function InfoPill({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
      <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
        <Icon className="h-3.5 w-3.5 text-blue-600" />
        {label}
      </div>
      <div className="text-sm font-bold text-slate-950">{value}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
        {label}
      </span>
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-blue-50/30"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
        {label}
      </span>
      <textarea
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-24 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-blue-50/30"
      />
    </label>
  );
}
