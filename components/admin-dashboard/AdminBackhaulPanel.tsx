"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Archive,
  CalendarDays,
  Check,
  CirclePause,
  Copy,
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
  type BackhaulOffer,
  type BackhaulOfferRow,
  type BackhaulOfferStatus,
} from "@/lib/backhaul-offers";
import { getDashboardSupabaseClient } from "@/lib/admin-dashboard/supabase-browser";

type BackhaulDraft = {
  title: string;
  date: string;
  timeWindow: string;
  origin: string;
  destination: string;
  destinationRadius: string;
  routeAreas: string;
  vehicleType: string;
  availableCapacity: string;
  priceHint: string;
  fairPriceNote: string;
  status: BackhaulOfferStatus;
  adminNote: string;
};

const emptyDraft: BackhaulDraft = {
  title: "Leer-Rückfahrt Richtung Regensburg",
  date: "",
  timeWindow: "nach Absprache",
  origin: "",
  destination: "Regensburg",
  destinationRadius: "ca. 200 km um Regensburg",
  routeAreas: "",
  vehicleType: "Transporter oder LKW nach Tour",
  availableCapacity: "Möbel, Kartons, Paletten oder Teilmengen nach Prüfung",
  priceHint: "fairer Rückfahrt-Preis nach Route und Volumen",
  fairPriceNote:
    "Der Preis hängt davon ab, ob Strecke, Datum, Volumen und Ladepunkte zur geplanten Rückfahrt passen. Sinnvolle Stopps unterwegs und mögliche Umwege werden vorab transparent geprüft.",
  status: "draft",
  adminNote: "",
};

const statusOptions: readonly { value: BackhaulOfferStatus; label: string }[] = [
  { value: "active", label: "Aktiv und öffentlich" },
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

export function AdminBackhaulPanel() {
  const [offers, setOffers] = useState<BackhaulOffer[]>([]);
  const [draft, setDraft] = useState<BackhaulDraft>(emptyDraft);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
      paused: offers.filter((offer) => offer.status === "paused").length,
    }),
    [offers],
  );

  function updateDraft<K extends keyof BackhaulDraft>(key: K, value: BackhaulDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setSuccess("");
  }

  async function createOffer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getDashboardSupabaseClient();
    if (!supabase || !tableAvailable) return;

    const routeAreas = parseRouteAreas(draft.routeAreas);
    if (!draft.title.trim() || !draft.date || !draft.origin.trim() || !draft.availableCapacity.trim() || !draft.fairPriceNote.trim()) {
      setError("Bitte Titel, Datum, Start, freie Kapazität und Preis-/Routenhinweis ausfüllen.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");
    const payload = {
      title: draft.title.trim(),
      departure_date: draft.date,
      time_window: draft.timeWindow.trim() || "nach Absprache",
      origin: draft.origin.trim(),
      destination: draft.destination.trim() || "Regensburg",
      destination_radius: draft.destinationRadius.trim() || "ca. 200 km um Regensburg",
      route_areas: routeAreas,
      vehicle_type: draft.vehicleType.trim() || "Transporter oder LKW nach Tour",
      available_capacity: draft.availableCapacity.trim(),
      price_hint: draft.priceHint.trim() || "fairer Rückfahrt-Preis nach Route und Volumen",
      fair_price_note: draft.fairPriceNote.trim(),
      status: draft.status,
      admin_note: draft.adminNote.trim(),
    };

    const { error: insertError } = await supabase.from("backhaul_offers").insert(payload);
    if (insertError) {
      setError("Rückfahrt konnte nicht gespeichert werden. Eingaben, Migration und Admin-Rolle prüfen.");
    } else {
      setSuccess(draft.status === "active" ? "Rückfahrt gespeichert und öffentlich freigeschaltet." : "Rückfahrt als Entwurf gespeichert.");
      setDraft(emptyDraft);
      await loadOffers();
    }
    setSaving(false);
  }

  async function changeStatus(offer: BackhaulOffer, status: BackhaulOfferStatus) {
    const supabase = getDashboardSupabaseClient();
    if (!supabase) return;
    setUpdatingId(offer.id);
    setError("");
    setSuccess("");
    const { error: updateError } = await supabase
      .from("backhaul_offers")
      .update({ status })
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
      title: offer.title,
      date: "",
      timeWindow: offer.timeWindow,
      origin: offer.origin,
      destination: offer.destination,
      destinationRadius: offer.destinationRadius,
      routeAreas: offer.routeAreas.join(", "),
      vehicleType: offer.vehicleType,
      availableCapacity: offer.availableCapacity,
      priceHint: offer.priceHint,
      fairPriceNote: offer.fairPriceNote,
      status: "draft",
      adminNote: offer.adminNote || "",
    });
    setSuccess("Rückfahrt wurde als neuer Entwurf übernommen. Bitte Datum prüfen und speichern.");
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
          <MiniMetric label="Pausiert" value={counts.paused} tone="text-amber-200" />
        </div>

        {!tableAvailable ? (
          <div className="m-5 rounded-xl border border-amber-300/25 bg-amber-300/10 p-4 text-sm font-semibold leading-6 text-amber-50">
            Die Rückfahrten-Tabelle fehlt noch. Nach manueller Prüfung muss die Migration <code>20260813110000_backhaul_offers.sql</code> in Supabase angewendet werden.
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
                      <span className="text-xs font-bold text-slate-500">{formatDate(offer.date)}</span>
                    </div>
                    <h3 className="mt-3 break-words text-lg font-black">{offer.title}</h3>
                    <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-400"><Route className="h-4 w-4 text-emerald-200" />{offer.origin} → {offer.destination}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{offer.availableCapacity}</p>
                  </div>
                  <button type="button" onClick={() => duplicateOffer(offer)} className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 text-xs font-black"><Copy className="h-4 w-4" />Duplizieren</button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {offer.status !== "active" ? <StatusButton label="Veröffentlichen" icon={<Check />} disabled={updatingId === offer.id} onClick={() => void changeStatus(offer, "active")} /> : null}
                  {offer.status !== "paused" ? <StatusButton label="Pausieren" icon={<CirclePause />} disabled={updatingId === offer.id} onClick={() => void changeStatus(offer, "paused")} /> : null}
                  {offer.status !== "archived" ? <StatusButton label="Archivieren" icon={<Archive />} disabled={updatingId === offer.id} onClick={() => void changeStatus(offer, "archived")} /> : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="neue-rueckfahrt" className="h-fit scroll-mt-24 rounded-2xl border border-emerald-200/15 bg-emerald-200/[0.05] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)] xl:sticky xl:top-6">
        <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-200 text-slate-950"><Plus className="h-5 w-5" /></span><div><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-200">Neue Tour</p><h2 className="mt-1 text-2xl font-black">Leer-Rückfahrt erstellen</h2></div></div>
        <p className="mt-4 text-sm font-semibold leading-6 text-slate-400">Nur reale, geplante Rückfahrten veröffentlichen. Entwurf bleibt intern; „Aktiv“ erscheint nach dem Speichern automatisch auf der öffentlichen Seite.</p>

        <form onSubmit={createOffer} className="mt-6 grid gap-4">
          <AdminInput label="Titel" value={draft.title} onChange={(value) => updateDraft("title", value)} required maxLength={160} />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput label="Datum" value={draft.date} onChange={(value) => updateDraft("date", value)} required type="date" icon={<CalendarDays />} />
            <AdminInput label="Zeitfenster" value={draft.timeWindow} onChange={(value) => updateDraft("timeWindow", value)} maxLength={120} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput label="Startort" value={draft.origin} onChange={(value) => updateDraft("origin", value)} required icon={<MapPin />} maxLength={160} />
            <AdminInput label="Zielort" value={draft.destination} onChange={(value) => updateDraft("destination", value)} required icon={<MapPin />} maxLength={160} />
          </div>
          <AdminInput label="Zielgebiet / Radius" value={draft.destinationRadius} onChange={(value) => updateDraft("destinationRadius", value)} maxLength={160} />
          <AdminTextarea label="Orte entlang der Route" value={draft.routeAreas} onChange={(value) => updateDraft("routeAreas", value)} placeholder="z. B. München, Ingolstadt, Regensburg – mit Komma oder Zeilenumbruch trennen" rows={3} />
          <AdminInput label="Fahrzeug" value={draft.vehicleType} onChange={(value) => updateDraft("vehicleType", value)} maxLength={160} icon={<Truck />} />
          <AdminTextarea label="Freie Kapazität" value={draft.availableCapacity} onChange={(value) => updateDraft("availableCapacity", value)} required rows={3} maxLength={500} icon={<PackageOpen />} />
          <AdminInput label="Preishinweis" value={draft.priceHint} onChange={(value) => updateDraft("priceHint", value)} maxLength={240} />
          <AdminTextarea label="Öffentlicher Routen- und Preishinweis" value={draft.fairPriceNote} onChange={(value) => updateDraft("fairPriceNote", value)} required rows={5} maxLength={1500} />
          <label className="grid gap-2 text-sm font-bold text-slate-200">Status<select value={draft.status} onChange={(event) => updateDraft("status", event.target.value as BackhaulOfferStatus)} className="min-h-11 rounded-xl border border-white/10 bg-[#0b1727] px-3">{statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
          <AdminTextarea label="Interne Notiz – niemals öffentlich" value={draft.adminNote} onChange={(value) => updateDraft("adminNote", value)} rows={3} maxLength={5000} />
          <button type="submit" disabled={saving || !tableAvailable} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-200 px-5 text-sm font-black text-slate-950 disabled:opacity-40">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}Rückfahrt speichern</button>
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
