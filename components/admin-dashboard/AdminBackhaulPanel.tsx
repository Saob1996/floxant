"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Archive,
  CalendarDays,
  Check,
  CirclePause,
  Copy,
  Edit3,
  Loader2,
  MapPin,
  PackageOpen,
  Plus,
  RefreshCw,
  Route,
  Truck,
} from "lucide-react";

import {
  ADMIN_BACKHAUL_OFFER_SELECT,
  mapBackhaulOfferRow,
  type BackhaulCapacityMode,
  type BackhaulOffer,
  type BackhaulOfferRow,
  type BackhaulPriceType,
  type BackhaulPublicationStatus,
  type BackhaulOfferStatus,
} from "@/lib/backhaul-offers";
import { getDashboardSupabaseClient } from "@/lib/admin-dashboard/supabase-browser";

type BackhaulDraft = {
  routeId: string;
  title: string;
  date: string;
  dateEnd: string;
  timeWindow: string;
  origin: string;
  destination: string;
  intermediateStops: string;
  pickupRadiusKm: string;
  destinationRadius: string;
  routeAreas: string;
  vehicleType: string;
  availableCapacity: string;
  availableCubicMeters: string;
  loadingArea: string;
  weightLimitKg: string;
  requiredHelpers: string;
  itemTypes: string;
  capacityMode: BackhaulCapacityMode;
  internalNetPrice: string;
  publicGrossPrice: string;
  vatRate: string;
  priceType: BackhaulPriceType;
  conditions: string;
  publicDescription: string;
  publicationStatus: BackhaulPublicationStatus;
  priceHint: string;
  fairPriceNote: string;
  status: BackhaulOfferStatus;
  adminNote: string;
};

const emptyDraft: BackhaulDraft = {
  routeId: "",
  title: "Leer-Rückfahrt Richtung Regensburg",
  date: "",
  dateEnd: "",
  timeWindow: "nach Absprache",
  origin: "",
  destination: "Regensburg",
  intermediateStops: "",
  pickupRadiusKm: "",
  destinationRadius: "ca. 200 km um Regensburg",
  routeAreas: "",
  vehicleType: "Transporter oder LKW nach Tour",
  availableCapacity: "Möbel, Kartons, Paletten oder Teilmengen nach Prüfung",
  availableCubicMeters: "",
  loadingArea: "",
  weightLimitKg: "",
  requiredHelpers: "",
  itemTypes: "Möbel, Kartons, Paletten, Teilmengen",
  capacityMode: "empty-return",
  internalNetPrice: "",
  publicGrossPrice: "",
  vatRate: "19",
  priceType: "on-request",
  conditions: "",
  publicDescription: "",
  publicationStatus: "unpublished",
  priceHint: "fairer Rückfahrt-Preis nach Route und Volumen",
  fairPriceNote:
    "Der Preis hängt davon ab, ob Strecke, Datum, Volumen und Ladepunkte zur geplanten Rückfahrt passen. Sinnvolle Stopps unterwegs und mögliche Umwege werden vorab transparent geprüft.",
  status: "draft",
  adminNote: "",
};

const statusOptions: readonly { value: BackhaulOfferStatus; label: string }[] = [
  { value: "active", label: "Aktiv" },
  { value: "reserved", label: "Reserviert" },
  { value: "completed", label: "Abgeschlossen" },
  { value: "inactive", label: "Deaktiviert" },
  { value: "draft", label: "Entwurf" },
  { value: "paused", label: "Pausiert" },
  { value: "archived", label: "Archiviert" },
];

function statusLabel(status: BackhaulOfferStatus): string {
  return statusOptions.find((option) => option.value === status)?.label || status;
}

function statusTone(status: BackhaulOfferStatus): string {
  if (status === "active") return "border-emerald-200/25 bg-emerald-200/10 text-emerald-100";
  if (status === "draft") return "border-cyan-200/25 bg-cyan-200/10 text-cyan-100";
  if (status === "reserved") return "border-violet-200/25 bg-violet-200/10 text-violet-100";
  if (status === "completed") return "border-blue-200/25 bg-blue-200/10 text-blue-100";
  if (status === "paused") return "border-amber-200/25 bg-amber-200/10 text-amber-100";
  return "border-white/10 bg-white/[0.05] text-slate-400";
}

function formatDate(value: string): string {
  if (!value) return "Kein Datum";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}

function parseRouteAreas(value: string): string[] {
  return [...new Set(value.split(/[,;\n]/).map((item) => item.trim()).filter(Boolean))].slice(0, 30);
}

function optionalNumber(value: string): number | null {
  if (!value.trim()) return null;
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export function AdminBackhaulPanel() {
  const [offers, setOffers] = useState<BackhaulOffer[]>([]);
  const [draft, setDraft] = useState<BackhaulDraft>(emptyDraft);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tableAvailable, setTableAvailable] = useState(true);

  const loadOffers = useCallback(async () => {
    const supabase = getDashboardSupabaseClient();
    if (!supabase) return;
    setLoading(true);
    setError("");
    const { data, error: queryError } = await supabase
      .from("backhaul_offers")
      .select(ADMIN_BACKHAUL_OFFER_SELECT)
      .order("departure_date", { ascending: false });

    if (queryError) {
      setOffers([]);
      setTableAvailable(queryError.code !== "42P01" && queryError.code !== "PGRST205");
      setError("Rückfahrten konnten nicht geladen werden. Migration, Admin-Rolle und Zugriffsregeln prüfen.");
    } else {
      setTableAvailable(true);
      setOffers((data as unknown as BackhaulOfferRow[]).map(mapBackhaulOfferRow));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadOffers();
  }, [loadOffers]);

  const counts = useMemo(
    () => ({
      active: offers.filter((offer) => offer.status === "active").length,
      draft: offers.filter((offer) => offer.status === "draft").length,
      reserved: offers.filter((offer) => offer.status === "reserved").length,
    }),
    [offers],
  );

  function updateDraft<K extends keyof BackhaulDraft>(key: K, value: BackhaulDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setSuccess("");
  }

  async function saveOffer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getDashboardSupabaseClient();
    if (!supabase || !tableAvailable) return;

    if (!draft.routeId.trim() || !draft.title.trim() || !draft.date || !draft.origin.trim() || !draft.availableCapacity.trim() || !draft.fairPriceNote.trim()) {
      setError("Bitte Routen-ID, Titel, Datum, Start, freie Kapazität und Preis-/Routenhinweis ausfüllen.");
      return;
    }
    if (draft.dateEnd && draft.dateEnd < draft.date) {
      setError("Das Enddatum darf nicht vor dem Startdatum liegen.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");
    const payload = {
      route_id: draft.routeId.trim(),
      title: draft.title.trim(),
      departure_date: draft.date,
      date_end: draft.dateEnd || draft.date,
      time_window: draft.timeWindow.trim() || "nach Absprache",
      origin: draft.origin.trim(),
      destination: draft.destination.trim() || "Regensburg",
      intermediate_stops: parseRouteAreas(draft.intermediateStops),
      pickup_radius_km: optionalNumber(draft.pickupRadiusKm),
      destination_radius: draft.destinationRadius.trim() || "ca. 200 km um Regensburg",
      route_areas: parseRouteAreas(draft.routeAreas),
      vehicle_type: draft.vehicleType.trim() || "Transporter oder LKW nach Tour",
      available_capacity: draft.availableCapacity.trim(),
      available_cubic_meters: optionalNumber(draft.availableCubicMeters),
      loading_area: draft.loadingArea.trim(),
      weight_limit_kg: optionalNumber(draft.weightLimitKg),
      required_helpers: optionalNumber(draft.requiredHelpers),
      item_types: parseRouteAreas(draft.itemTypes),
      capacity_mode: draft.capacityMode,
      internal_net_price: optionalNumber(draft.internalNetPrice),
      public_gross_price: optionalNumber(draft.publicGrossPrice),
      vat_rate: optionalNumber(draft.vatRate) ?? 19,
      price_type: draft.priceType,
      conditions: draft.conditions.trim(),
      public_description: draft.publicDescription.trim() || draft.fairPriceNote.trim(),
      publication_status: draft.publicationStatus,
      price_hint: draft.priceHint.trim() || "fairer Rückfahrt-Preis nach Route und Volumen",
      fair_price_note: draft.fairPriceNote.trim(),
      status: draft.status,
      admin_note: draft.adminNote.trim(),
    };

    const mutation = editingId
      ? supabase.from("backhaul_offers").update(payload).eq("id", editingId)
      : supabase.from("backhaul_offers").insert(payload);
    const { error: saveError } = await mutation;
    if (saveError) {
      setError("Rückfahrt konnte nicht gespeichert werden. Eingaben, Migration und Admin-Rolle prüfen.");
    } else {
      setSuccess(editingId ? "Rückfahrt aktualisiert." : "Rückfahrt gespeichert.");
      setDraft(emptyDraft);
      setEditingId(null);
      await loadOffers();
    }
    setSaving(false);
  }

  async function changeStatus(offer: BackhaulOffer, status: BackhaulOfferStatus, publish = false) {
    const supabase = getDashboardSupabaseClient();
    if (!supabase) return;
    setUpdatingId(offer.id);
    setError("");
    setSuccess("");
    const { error: updateError } = await supabase
      .from("backhaul_offers")
      .update({ status, ...(publish ? { publication_status: "published" } : {}) })
      .eq("id", offer.id);

    if (updateError) {
      setError("Status konnte nicht geändert werden.");
    } else {
      setSuccess(`„${offer.title}“ ist jetzt ${statusLabel(status).toLocaleLowerCase("de-DE")}.`);
      await loadOffers();
    }
    setUpdatingId(null);
  }

  function duplicateOffer(offer: BackhaulOffer) {
    setDraft({
      routeId: "",
      title: offer.title,
      date: "",
      dateEnd: "",
      timeWindow: offer.timeWindow,
      origin: offer.origin,
      destination: offer.destination,
      intermediateStops: offer.intermediateStops.join(", "),
      pickupRadiusKm: offer.pickupRadiusKm === null ? "" : String(offer.pickupRadiusKm),
      destinationRadius: offer.destinationRadius,
      routeAreas: offer.routeAreas.join(", "),
      vehicleType: offer.vehicleType,
      availableCapacity: offer.availableCapacity,
      availableCubicMeters: offer.availableCubicMeters === null ? "" : String(offer.availableCubicMeters),
      loadingArea: offer.loadingArea,
      weightLimitKg: offer.weightLimitKg === null ? "" : String(offer.weightLimitKg),
      requiredHelpers: offer.requiredHelpers === null ? "" : String(offer.requiredHelpers),
      itemTypes: offer.itemTypes.join(", "),
      capacityMode: offer.capacityMode,
      internalNetPrice: offer.internalNetPrice === null ? "" : String(offer.internalNetPrice),
      publicGrossPrice: offer.publicGrossPrice === null ? "" : String(offer.publicGrossPrice),
      vatRate: String(offer.vatRate),
      priceType: offer.priceType,
      conditions: offer.conditions,
      publicDescription: offer.publicDescription,
      publicationStatus: "unpublished",
      priceHint: offer.priceHint,
      fairPriceNote: offer.fairPriceNote,
      status: "draft",
      adminNote: offer.adminNote || "",
    });
    setEditingId(null);
    setSuccess("Rückfahrt wurde als neuer Entwurf übernommen. Bitte Datum prüfen und speichern.");
    document.getElementById("neue-rueckfahrt")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function editOffer(offer: BackhaulOffer) {
    setDraft({
      routeId: offer.routeId,
      title: offer.title,
      date: offer.date,
      dateEnd: offer.dateEnd,
      timeWindow: offer.timeWindow,
      origin: offer.origin,
      destination: offer.destination,
      intermediateStops: offer.intermediateStops.join(", "),
      pickupRadiusKm: offer.pickupRadiusKm === null ? "" : String(offer.pickupRadiusKm),
      destinationRadius: offer.destinationRadius,
      routeAreas: offer.routeAreas.join(", "),
      vehicleType: offer.vehicleType,
      availableCapacity: offer.availableCapacity,
      availableCubicMeters: offer.availableCubicMeters === null ? "" : String(offer.availableCubicMeters),
      loadingArea: offer.loadingArea,
      weightLimitKg: offer.weightLimitKg === null ? "" : String(offer.weightLimitKg),
      requiredHelpers: offer.requiredHelpers === null ? "" : String(offer.requiredHelpers),
      itemTypes: offer.itemTypes.join(", "),
      capacityMode: offer.capacityMode,
      internalNetPrice: offer.internalNetPrice === null ? "" : String(offer.internalNetPrice),
      publicGrossPrice: offer.publicGrossPrice === null ? "" : String(offer.publicGrossPrice),
      vatRate: String(offer.vatRate),
      priceType: offer.priceType,
      conditions: offer.conditions,
      publicDescription: offer.publicDescription,
      publicationStatus: offer.publicationStatus,
      priceHint: offer.priceHint,
      fairPriceNote: offer.fairPriceNote,
      status: offer.status,
      adminNote: offer.adminNote || "",
    });
    setEditingId(offer.id);
    setSuccess("Änderungen laden im Formular. Speichern aktualisiert den bestehenden Datensatz.");
    document.getElementById("neue-rueckfahrt")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(24rem,.9fr)]">
      <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
        <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-200">Tourverwaltung</p>
            <h2 className="mt-2 text-2xl font-black">Gespeicherte Rückfahrten</h2>
          </div>
          <button type="button" onClick={() => void loadOffers()} disabled={loading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-xs font-black disabled:opacity-50">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Aktualisieren
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 border-b border-white/10 p-5">
          <MiniMetric label="Öffentlich" value={counts.active} tone="text-emerald-200" />
          <MiniMetric label="Entwürfe" value={counts.draft} tone="text-cyan-200" />
          <MiniMetric label="Reserviert" value={counts.reserved} tone="text-violet-200" />
        </div>

        {!tableAvailable ? (
          <div className="m-5 rounded-xl border border-amber-300/25 bg-amber-300/10 p-4 text-sm font-semibold leading-6 text-amber-50">
            Die Rückfahrten-Tabelle oder ihre Verwaltungserweiterung fehlt. Nach manueller Prüfung müssen die Datenbankänderungen bis <code>20260828190000_backhaul_offer_operations.sql</code> eingespielt werden.
          </div>
        ) : null}
        {error ? <div className="m-5 rounded-xl border border-red-300/25 bg-red-300/10 p-4 text-sm font-semibold text-red-100" role="alert">{error}</div> : null}
        {success ? <div className="m-5 rounded-xl border border-emerald-300/25 bg-emerald-300/10 p-4 text-sm font-semibold text-emerald-100" role="status">{success}</div> : null}

        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-sm font-bold text-slate-400"><Loader2 className="h-5 w-5 animate-spin" />Rückfahrten werden geladen …</div>
        ) : offers.length === 0 ? (
          <div className="grid min-h-64 place-items-center p-8 text-center"><div><Truck className="mx-auto h-10 w-10 text-slate-600" /><h3 className="mt-4 text-xl font-black">Noch keine Rückfahrt gespeichert</h3><p className="mt-2 text-sm text-slate-500">Rechts kannst du die erste echte Tour eintragen.</p></div></div>
        ) : (
          <div className="divide-y divide-white/[0.07]">
            {offers.map((offer) => (
              <article key={offer.id} className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black ${statusTone(offer.status)}`}>{statusLabel(offer.status)}</span>
                      <span className="text-xs font-bold text-slate-500">{formatDate(offer.date)}{offer.dateEnd !== offer.date ? ` bis ${formatDate(offer.dateEnd)}` : ""}</span>
                      <span className="font-mono text-[10px] text-slate-600">{offer.routeId}</span>
                      <span className="text-[10px] font-black uppercase text-slate-500">{offer.publicationStatus === "published" ? "publiziert" : "intern"}</span>
                    </div>
                    <h3 className="mt-3 break-words text-lg font-black">{offer.title}</h3>
                    <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-400"><Route className="h-4 w-4 text-emerald-200" />{offer.origin} → {offer.destination}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{offer.availableCapacity}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{offer.capacityMode === "shared-load" ? "Beiladung" : "Leerrückfahrt"}{offer.availableCubicMeters !== null ? ` · ${offer.availableCubicMeters} m³ frei` : ""}{offer.publicGrossPrice !== null ? ` · ${offer.publicGrossPrice.toLocaleString("de-DE")} € brutto` : ""}{offer.internalNetPrice !== null ? ` · intern ${offer.internalNetPrice.toLocaleString("de-DE")} € netto` : ""}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button type="button" onClick={() => editOffer(offer)} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 text-xs font-black"><Edit3 className="h-4 w-4" />Bearbeiten</button>
                    <button type="button" onClick={() => duplicateOffer(offer)} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 text-xs font-black"><Copy className="h-4 w-4" />Duplizieren</button>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {offer.status !== "active" || offer.publicationStatus !== "published" ? <StatusButton label="Veröffentlichen" icon={<Check />} disabled={updatingId === offer.id} onClick={() => void changeStatus(offer, "active", true)} /> : null}
                  {offer.status !== "reserved" ? <StatusButton label="Reservieren" icon={<CirclePause />} disabled={updatingId === offer.id} onClick={() => void changeStatus(offer, "reserved")} /> : null}
                  {offer.status !== "completed" ? <StatusButton label="Abschließen" icon={<Check />} disabled={updatingId === offer.id} onClick={() => void changeStatus(offer, "completed")} /> : null}
                  {offer.status !== "inactive" ? <StatusButton label="Deaktivieren" icon={<CirclePause />} disabled={updatingId === offer.id} onClick={() => void changeStatus(offer, "inactive")} /> : null}
                  {offer.status !== "archived" ? <StatusButton label="Archivieren" icon={<Archive />} disabled={updatingId === offer.id} onClick={() => void changeStatus(offer, "archived")} /> : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="neue-rueckfahrt" className="h-fit scroll-mt-24 rounded-2xl border border-emerald-200/15 bg-emerald-200/[0.05] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)] xl:sticky xl:top-6">
        <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-200 text-slate-950">{editingId ? <Edit3 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</span><div><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-200">{editingId ? "Tour bearbeiten" : "Neue Tour"}</p><h2 className="mt-1 text-2xl font-black">{editingId ? "Leer-Rückfahrt aktualisieren" : "Leer-Rückfahrt erstellen"}</h2></div></div>
        <p className="mt-4 text-sm font-semibold leading-6 text-slate-400">Nur reale, geplante Rückfahrten veröffentlichen. Öffentlich erscheint eine Tour nur mit Status „Aktiv“, Publikation „Veröffentlicht“ und nicht abgelaufenem Zeitraum.</p>

        <form onSubmit={saveOffer} className="mt-6 grid gap-4">
          <AdminInput label="Routen-ID" value={draft.routeId} onChange={(value) => updateDraft("routeId", value)} required maxLength={80} />
          <AdminInput label="Titel" value={draft.title} onChange={(value) => updateDraft("title", value)} required maxLength={160} />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput label="Datum von" value={draft.date} onChange={(value) => updateDraft("date", value)} required type="date" icon={<CalendarDays />} />
            <AdminInput label="Datum bis" value={draft.dateEnd} onChange={(value) => updateDraft("dateEnd", value)} type="date" icon={<CalendarDays />} />
          </div>
          <AdminInput label="Zeitfenster" value={draft.timeWindow} onChange={(value) => updateDraft("timeWindow", value)} maxLength={120} />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput label="Startort" value={draft.origin} onChange={(value) => updateDraft("origin", value)} required icon={<MapPin />} maxLength={160} />
            <AdminInput label="Zielort" value={draft.destination} onChange={(value) => updateDraft("destination", value)} required icon={<MapPin />} maxLength={160} />
          </div>
          <AdminTextarea label="Zwischenstopps" value={draft.intermediateStops} onChange={(value) => updateDraft("intermediateStops", value)} placeholder="Mit Komma oder Zeilenumbruch trennen" rows={2} />
          <AdminInput label="Abholradius in km" value={draft.pickupRadiusKm} onChange={(value) => updateDraft("pickupRadiusKm", value)} type="number" />
          <AdminInput label="Zielgebiet / Radius" value={draft.destinationRadius} onChange={(value) => updateDraft("destinationRadius", value)} maxLength={160} />
          <AdminTextarea label="Orte entlang der Route" value={draft.routeAreas} onChange={(value) => updateDraft("routeAreas", value)} placeholder="z. B. München, Ingolstadt, Regensburg – mit Komma oder Zeilenumbruch trennen" rows={3} />
          <AdminInput label="Fahrzeug" value={draft.vehicleType} onChange={(value) => updateDraft("vehicleType", value)} maxLength={160} icon={<Truck />} />
          <AdminTextarea label="Freie Kapazität" value={draft.availableCapacity} onChange={(value) => updateDraft("availableCapacity", value)} required rows={3} maxLength={500} icon={<PackageOpen />} />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput label="Freie Kubikmeter" value={draft.availableCubicMeters} onChange={(value) => updateDraft("availableCubicMeters", value)} type="number" />
            <AdminInput label="Gewichtsgrenze in kg" value={draft.weightLimitKg} onChange={(value) => updateDraft("weightLimitKg", value)} type="number" />
          </div>
          <AdminInput label="Ladefläche / Maße" value={draft.loadingArea} onChange={(value) => updateDraft("loadingArea", value)} maxLength={240} />
          <AdminInput label="Benötigte Helfer" value={draft.requiredHelpers} onChange={(value) => updateDraft("requiredHelpers", value)} type="number" />
          <AdminTextarea label="Geeignete Gegenstände" value={draft.itemTypes} onChange={(value) => updateDraft("itemTypes", value)} rows={2} placeholder="Möbel, Kartons, Paletten ..." />
          <label className="grid gap-2 text-sm font-bold text-slate-200">Kapazitätsart<select value={draft.capacityMode} onChange={(event) => updateDraft("capacityMode", event.target.value as BackhaulCapacityMode)} className="min-h-11 rounded-xl border border-white/10 bg-[#0b1727] px-3"><option value="empty-return">Leerrückfahrt</option><option value="shared-load">Beiladung</option></select></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput label="Interner Nettopreis" value={draft.internalNetPrice} onChange={(value) => updateDraft("internalNetPrice", value)} type="number" />
            <AdminInput label="Öffentlicher Bruttopreis" value={draft.publicGrossPrice} onChange={(value) => updateDraft("publicGrossPrice", value)} type="number" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput label="USt. in %" value={draft.vatRate} onChange={(value) => updateDraft("vatRate", value)} type="number" />
            <label className="grid gap-2 text-sm font-bold text-slate-200">Preisart<select value={draft.priceType} onChange={(event) => updateDraft("priceType", event.target.value as BackhaulPriceType)} className="min-h-11 rounded-xl border border-white/10 bg-[#0b1727] px-3"><option value="on-request">Auf Anfrage</option><option value="fixed">Festpreis</option><option value="from">Ab-Preis</option><option value="estimate">Schätzung</option></select></label>
          </div>
          <AdminInput label="Preishinweis" value={draft.priceHint} onChange={(value) => updateDraft("priceHint", value)} maxLength={240} />
          <AdminTextarea label="Öffentlicher Routen- und Preishinweis" value={draft.fairPriceNote} onChange={(value) => updateDraft("fairPriceNote", value)} required rows={5} maxLength={1500} />
          <AdminTextarea label="Öffentliche Beschreibung" value={draft.publicDescription} onChange={(value) => updateDraft("publicDescription", value)} rows={4} maxLength={2000} />
          <AdminTextarea label="Bedingungen" value={draft.conditions} onChange={(value) => updateDraft("conditions", value)} rows={3} maxLength={2000} />
          <label className="grid gap-2 text-sm font-bold text-slate-200">Status<select value={draft.status} onChange={(event) => updateDraft("status", event.target.value as BackhaulOfferStatus)} className="min-h-11 rounded-xl border border-white/10 bg-[#0b1727] px-3">{statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-bold text-slate-200">Publikation<select value={draft.publicationStatus} onChange={(event) => updateDraft("publicationStatus", event.target.value as BackhaulPublicationStatus)} className="min-h-11 rounded-xl border border-white/10 bg-[#0b1727] px-3"><option value="unpublished">Nicht veröffentlicht</option><option value="published">Veröffentlicht</option></select></label>
          <AdminTextarea label="Interne Notiz – niemals öffentlich" value={draft.adminNote} onChange={(value) => updateDraft("adminNote", value)} rows={3} maxLength={5000} />
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={saving || !tableAvailable} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-200 px-5 text-sm font-black text-slate-950 disabled:opacity-40">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingId ? <Edit3 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}{editingId ? "Änderungen speichern" : "Rückfahrt speichern"}</button>
            {editingId ? <button type="button" onClick={() => { setEditingId(null); setDraft(emptyDraft); }} className="min-h-12 rounded-xl border border-white/10 px-4 text-sm font-black">Abbrechen</button> : null}
          </div>
        </form>
      </section>
    </div>
  );
}

function MiniMetric({ label, value, tone }: { label: string; value: number; tone: string }) {
  return <div className="rounded-xl border border-white/10 bg-black/15 p-3 text-center"><p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">{label}</p><p className={`mt-2 text-2xl font-black ${tone}`}>{value}</p></div>;
}

function StatusButton({ label, icon, disabled, onClick }: { label: string; icon: React.ReactNode; disabled: boolean; onClick: () => void }) {
  return <button type="button" disabled={disabled} onClick={onClick} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-xs font-black text-slate-300 disabled:opacity-40 [&>svg]:h-4 [&>svg]:w-4">{disabled ? <Loader2 className="animate-spin" /> : icon}{label}</button>;
}

function AdminInput({ label, value, onChange, required, type = "text", maxLength, icon }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string; maxLength?: number; icon?: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-bold text-slate-200"><span className="flex items-center gap-2">{icon ? <span className="text-emerald-200 [&>svg]:h-4 [&>svg]:w-4">{icon}</span> : null}{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} required={required} type={type} maxLength={maxLength} className="min-h-11 rounded-xl border border-white/10 bg-[#0b1727] px-3 outline-none focus:border-emerald-200/50" /></label>;
}

function AdminTextarea({ label, value, onChange, required, rows, maxLength, placeholder, icon }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; rows: number; maxLength?: number; placeholder?: string; icon?: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-bold text-slate-200"><span className="flex items-center gap-2">{icon ? <span className="text-emerald-200 [&>svg]:h-4 [&>svg]:w-4">{icon}</span> : null}{label}</span><textarea value={value} onChange={(event) => onChange(event.target.value)} required={required} rows={rows} maxLength={maxLength} placeholder={placeholder} className="rounded-xl border border-white/10 bg-[#0b1727] px-3 py-3 leading-6 outline-none placeholder:text-slate-600 focus:border-emerald-200/50" /></label>;
}
