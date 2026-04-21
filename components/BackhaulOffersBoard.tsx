"use client";

import { useEffect, useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
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
        // Static fallback stays visible if the live offer endpoint is temporarily unavailable.
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

  async function submitInquiry(event: React.FormEvent) {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.pickupLocation.trim() || !form.items.trim()) return;

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
    } catch (error) {
      console.error("Backhaul inquiry failed:", error);
      alert("Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie FLOXANT direkt.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-4">
        {offers.map((offer, index) => {
          const isSelected = activeOffer?.id === offer.id;
          return (
            <m.button
              type="button"
              key={offer.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              onClick={() => {
                setSelectedOffer(offer);
                updateField("offerId", offer.id);
              }}
              className={[
                "premium-scan w-full rounded-[2rem] border p-6 text-left transition-all",
                isSelected
                  ? "border-blue-400/35 bg-blue-500/[0.08] shadow-2xl shadow-blue-950/20"
                  : "border-white/10 bg-white/[0.025] hover:border-blue-400/20 hover:bg-white/[0.04]",
              ].join(" ")}
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-200">
                    <Truck className="h-3.5 w-3.5" />
                    freie Rückfahrt für Privat & Firma
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">{offer.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50">{offer.fairPriceNote}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
                  <Calendar className="mb-2 h-4 w-4 text-blue-300" />
                  {formatDate(offer.date)}
                  <div className="mt-1 text-xs text-white/38">{offer.timeWindow}</div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <InfoPill icon={MapPin} label="Start" value={offer.origin} />
                <InfoPill icon={Route} label="Richtung" value={`${offer.destination}, ${offer.destinationRadius}`} />
                <InfoPill icon={PackageOpen} label="Kapazität" value={offer.availableCapacity} />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {offer.routeAreas.slice(0, 8).map((area) => (
                  <span key={area} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-white/45">
                    {area}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/5 pt-5">
                <span className="text-sm font-semibold text-blue-200">{offer.priceHint}</span>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
                  Anfrage vorbereiten
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </m.button>
          );
        })}
      </div>

      <div id="leerfahrt-anfrage" className="sticky top-28 h-fit rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.065),rgba(255,255,255,0.025))] p-6 shadow-2xl">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <m.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="py-12 text-center"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Anfrage gesendet</h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/50">
                FLOXANT prüft jetzt, ob Ihre Sendung zur Rückfahrt passt und meldet sich mit einer fairen Einordnung.
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
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">Rückfahrt anfragen</div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Passt Ihre Lieferung zur Tour?</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/48">
                  Wenige Eckdaten reichen. Geeignet für Möbel, Büroinventar, Paletten oder Teilmengen. Die Anfrage ist unverbindlich; der faire Preis hängt von Route, Volumen, Ladeaufwand und möglichem Umweg ab.
                </p>
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-blue-500 text-sm font-bold uppercase tracking-[0.14em] text-slate-950 transition hover:bg-blue-400 disabled:opacity-60"
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

function InfoPill({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
        <Icon className="h-3.5 w-3.5 text-blue-300" />
        {label}
      </div>
      <div className="text-sm font-semibold text-white/75">{value}</div>
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
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">{label}</span>
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm font-medium text-white outline-none transition focus:border-blue-400/40 focus:bg-black/35"
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
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">{label}</span>
      <textarea
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-blue-400/40 focus:bg-black/35"
      />
    </label>
  );
}
