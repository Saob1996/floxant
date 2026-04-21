"use client";

import { useMemo, useState } from "react";
import { m } from "framer-motion";
import {
  AlertTriangle,
  ArrowRightCircle,
  Check,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  Info,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Settings,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { PremiumButton } from "../ui/PremiumButton";
import { cn } from "@/lib/utils";
import { Booking } from "@/app/dashboard/DashboardClient";
import { DocumentManager } from "./documents/DocumentManager";
import { DocumentChainTracker } from "./documents/DocumentChainTracker";

interface BookingDetailViewProps {
  booking: Booking;
  onClose: () => void;
  onSave: (updatedBooking: Booking) => void;
}

function formatStatus(status: string) {
  if (!status) return "Unbekannt";
  if (status === "new") return "Neu";
  return status.replace(/_/g, " ");
}

function renderConfigValue(value: any) {
  if (value === null || value === undefined) return "Nicht angegeben";
  if (typeof value === "boolean") return value ? "Ja" : "Nein";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function formatServiceLabel(service: string) {
  const labels: Record<string, string> = {
    umzug: "Umzug",
    reinigung: "Reinigung",
    entsorgung: "Entsorgung",
    bueroumzug: "Büroumzug",
    firmenentsorgung: "Firmenentsorgung",
    leerfahrt: "Leerfahrt",
    private_client: "Private Client",
    villenservice: "Private Client",
  };

  return labels[service] || service.replace(/_/g, " ");
}

export function BookingDetailView({ booking, onClose, onSave }: BookingDetailViewProps) {
  const [status, setStatus] = useState(booking.status);
  const [internalNotes, setInternalNotes] = useState(booking.details?.admin?.internalNotes || "");
  const [nextAction, setNextAction] = useState(booking.details?.admin?.nextAction || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const history = useMemo(() => booking.details?.admin?.history || [], [booking.details?.admin?.history]);

  async function handleSave() {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          internalNotes,
          nextAction,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Speichern fehlgeschlagen");
      }

      onSave(data.data);
      onClose();
    } catch (saveError: any) {
      console.error("Save error:", saveError);
      setError(saveError.message || "Speichern fehlgeschlagen");
    } finally {
      setSaving(false);
    }
  }

  async function handleDocumentUpdate(documentParams: any) {
    setError(null);

    try {
      const response = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(documentParams),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Dokumentenaktion fehlgeschlagen");
      }

      onSave(data.data);
    } catch (documentError: any) {
      console.error("Document action error:", documentError);
      setError(documentError.message || "Dokumentenaktion fehlgeschlagen");
      throw documentError;
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end">
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <m.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden border-l border-white/10 bg-[#050505] shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <ClipboardList className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Vorgangsmanagement</h2>
              <p className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50">
                <span className="font-mono text-muted-foreground/35">{booking.id.slice(0, 8)}</span>
                <span>|</span>
                <span>{new Date(booking.timestamp).toLocaleDateString("de-DE")}</span>
              </p>
            </div>
          </div>

          <button onClick={onClose} className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </header>

        <div className="custom-scrollbar flex-1 overflow-y-auto">
          <div className="grid items-start gap-8 p-8 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-7">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-white/40">
                  <User className="h-4 w-4" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Kontakt und Kontext</h3>
                </div>

                <div className="grid gap-6 rounded-2xl border border-white/5 p-6 glass md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Kunde</p>
                    <p className="text-base font-bold text-white">{booking.name}</p>
                  </div>
                  <div className="space-y-1 text-end">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Service</p>
                    <p className="text-base font-bold text-white">{formatServiceLabel(booking.service)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">E-Mail</p>
                    <a href={`mailto:${booking.email}`} className="text-sm font-medium text-blue-400 hover:underline">
                      {booking.email}
                    </a>
                  </div>
                  <div className="space-y-1 text-end">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Telefon</p>
                    <a href={`tel:${booking.phone}`} className="text-sm font-medium text-blue-400 hover:underline">
                      {booking.phone}
                    </a>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-white/40">
                  <TrendingUp className="h-4 w-4" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Preiswahrheit</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-6 glass">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary/80">System-Einschätzung</span>
                      <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
                        {booking.details?.valuation?.valuationStage || "Vorprüfung"}
                      </span>
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-white">
                      {booking.details?.valuation?.systemPriceRangeMin || 0} EUR - {booking.details?.valuation?.systemPriceRangeMax || 0} EUR
                    </div>
                    {booking.details?.valuation?.priceExplanation ? (
                      <p className="text-[11px] italic leading-relaxed text-muted-foreground">"{booking.details.valuation.priceExplanation}"</p>
                    ) : null}
                    {booking.details?.valuation?.topDrivers?.length ? (
                      <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-2">
                        {booking.details.valuation.topDrivers.map((driver) => (
                          <span key={driver} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">
                            # {driver}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="space-y-3 rounded-2xl border border-white/10 p-6 glass">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Kunden-Budget</span>
                    <div className={cn("text-2xl font-bold tracking-tight", booking.details?.valuation?.customerBudget ? "text-blue-400" : "text-muted-foreground/30")}>
                      {booking.details?.valuation?.customerBudget ? `${booking.details.valuation.customerBudget} EUR` : "Nicht angegeben"}
                    </div>
                    {booking.details?.valuation?.customerBudget && booking.details?.valuation?.systemPriceRangeMin ? (
                      <div className="border-t border-white/5 pt-2">
                        {booking.details.valuation.customerBudget < booking.details.valuation.systemPriceRangeMin ? (
                          <div className="flex items-center gap-2 text-red-400">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-[10px] font-bold uppercase">Budget unter dem Rahmen</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-[10px] font-bold uppercase">Budget wirkt plausibel</span>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-white/40">
                  <Settings className="h-4 w-4" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Konfiguration</h3>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/5 glass">
                  <table className="w-full text-sm text-start">
                    <tbody className="divide-y divide-white/5">
                      {Object.entries(booking.details?.configuration || {}).map(([key, value]) => {
                        if (key === "pricingSignals" || key === "note") return null;

                        return (
                          <tr key={key} className="transition-colors hover:bg-white/[0.02]">
                            <td className="w-1/3 px-6 py-3 text-xs font-medium lowercase text-muted-foreground/70">
                              {key.replace(/([A-Z])/g, " $1")}
                            </td>
                            <td className="px-6 py-3 text-xs font-medium text-foreground">{renderConfigValue(value)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {booking.details?.configuration?.note ? (
                  <div className="space-y-2 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                    <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      <Info className="h-3 w-3" />
                      Kunden-Bemerkung
                    </span>
                    <p className="text-sm font-medium text-foreground">{booking.details.configuration.note}</p>
                  </div>
                ) : null}
              </section>

              <section className="space-y-6 border-t border-white/5 pt-4">
                <DocumentChainTracker documents={booking.details?.admin?.docs || []} />
                <DocumentManager bookingId={booking.id} documents={booking.details?.admin?.docs || []} onUpdate={handleDocumentUpdate} />
              </section>
            </div>

            <div className="space-y-8 lg:col-span-5">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-white/40">
                  <ArrowRightCircle className="h-4 w-4" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Operative Steuerung</h3>
                </div>

                <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 glass">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Vorgangs-Status</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["new", "in_bearbeitung", "besichtigung_geplant", "angebot_versendet", "abgeschlossen", "storniert"].map((entry) => (
                        <button
                          key={entry}
                          onClick={() => setStatus(entry)}
                          className={cn(
                            "rounded-xl border px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-all",
                            status === entry ? "scale-[1.02] border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
                          )}
                        >
                          {formatStatus(entry)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Nächster Schritt</label>
                    <select
                      value={nextAction}
                      onChange={(event) => setNextAction(event.target.value)}
                      className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Wählen...</option>
                      <option value="rueckruf_planung">Rückruf zur Detailplanung</option>
                      <option value="besichtigung_anbieten">Besichtigungstermin anbieten</option>
                      <option value="angebot_erstellen">Angebot finalisieren</option>
                      <option value="daten_nachfordern">Fotos oder Informationen nachfordern</option>
                      <option value="whatsapp_followup">WhatsApp-Nachfassaktion</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Interne Notizen</label>
                    <textarea
                      value={internalNotes}
                      onChange={(event) => setInternalNotes(event.target.value)}
                      placeholder="Interne Hinweise für die weitere Bearbeitung..."
                      className="h-48 w-full resize-none rounded-xl border border-white/10 bg-black/40 p-4 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-3 pt-4">
                    {error ? <p className="mb-4 text-xs font-medium text-red-400">{error}</p> : null}

                    <PremiumButton className="h-12 w-full bg-primary text-sm font-bold shadow-xl shadow-primary/20" onClick={handleSave} disabled={saving}>
                      {saving ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : <div className="flex items-center justify-center gap-2"><Check className="h-5 w-5" /> Änderungen speichern</div>}
                    </PremiumButton>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <a
                        href={`/dashboard/documents/${booking.id}`}
                        target="_blank"
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-white/10"
                        rel="noreferrer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Dokumente
                      </a>
                      <button
                        onClick={onClose}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-white/10"
                      >
                        Schließen
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-white/5 bg-white/[0.01] p-6">
                <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Bearbeitungshistorie</span>
                <div className="space-y-4">
                  {history.length > 0 ? (
                    history.slice(0, 8).map((entry, index) => (
                      <div key={`${entry.timestamp}-${index}`} className="flex gap-3">
                        <div className="w-1 rounded-full bg-primary/30" />
                        <div className="flex-1">
                          <p className="text-[11px] font-bold text-white">{entry.note || formatStatus(entry.status)}</p>
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleString("de-DE")} | {entry.user}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex gap-3">
                      <div className="w-1 rounded-full bg-primary/30" />
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-white">Vorgang erstellt</p>
                        <p className="mt-1 text-[10px] text-muted-foreground">{new Date(booking.timestamp).toLocaleString("de-DE")}</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section className="rounded-2xl border border-white/5 bg-white/[0.01] p-6">
                <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Schnellkontext</span>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-blue-400" />
                    <div>
                      <p className="font-medium text-white">{booking.email}</p>
                      <p className="text-white/45">E-Mail</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-blue-400" />
                    <div>
                      <p className="font-medium text-white">{booking.phone}</p>
                      <p className="text-white/45">Telefon</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-blue-400" />
                    <div>
                      <p className="font-medium text-white">{booking.details?.configuration?.fromAddress || booking.details?.configuration?.location || "Unbekannt"}</p>
                      <p className="text-white/45">Ort oder Startadresse</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </m.div>
    </div>
  );
}
