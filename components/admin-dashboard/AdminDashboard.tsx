"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
  Inbox,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import {
  BOOKING_SELECT,
  EDITABLE_STATUSES,
  formatBookingDate,
  getBookingSearchText,
  getBookingSummary,
  getServiceLabel,
  getStatusLabel,
  type BookingRecord,
  type EditableBookingStatus,
} from "@/lib/admin-dashboard/bookings";
import {
  dashboardSupabaseConfig,
  getDashboardSupabaseClient,
} from "@/lib/admin-dashboard/supabase-browser";

function isAdmin(appMetadata: Record<string, unknown> | undefined): boolean {
  return appMetadata?.role === "admin";
}

function statusTone(status: string): string {
  if (status === "new") return "border-cyan-200/25 bg-cyan-200/10 text-cyan-100";
  if (status === "in_bearbeitung") return "border-amber-200/25 bg-amber-200/10 text-amber-100";
  if (status === "erledigt") return "border-emerald-200/25 bg-emerald-200/10 text-emerald-100";
  return "border-white/10 bg-white/[0.06] text-slate-300";
}

function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    const supabase = getDashboardSupabaseClient();
    if (!supabase) return;

    setLoading(true);
    setError("");

    const { data, error: queryError } = await supabase
      .from("bookings")
      .select(BOOKING_SELECT)
      .order("timestamp", { ascending: false });

    if (queryError) {
      setError(
        queryError.code === "42501"
          ? "Der Datenbankzugriff wurde abgelehnt. Admin-Rolle und RLS-Migration prüfen."
          : "Die Anfragen konnten nicht geladen werden. Bitte Verbindung und Supabase-Konfiguration prüfen.",
      );
      setBookings([]);
    } else {
      setBookings((data || []) as unknown as BookingRecord[]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const supabase = getDashboardSupabaseClient();
    if (!supabase) {
      setCheckingAccess(false);
      return;
    }
    const supabaseClient = supabase;

    let active = true;
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event) => {
      if (active && event === "SIGNED_OUT") router.replace("/dashboard/login");
    });

    async function initialize() {
      const { data, error: sessionError } = await supabaseClient.auth.getSession();
      if (!active) return;

      const session = data.session;
      if (sessionError || !session) {
        router.replace("/dashboard/login");
        return;
      }

      if (!isAdmin(session.user.app_metadata)) {
        await supabaseClient.auth.signOut();
        router.replace("/dashboard/login?reason=forbidden");
        return;
      }

      setCheckingAccess(false);
      await loadBookings();
    }

    void initialize();
    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, [loadBookings, router]);

  useEffect(() => {
    if (!selectedId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedId]);

  const serviceOptions = useMemo(
    () => [...new Set(bookings.map((booking) => booking.service).filter((value): value is string => Boolean(value)))].sort(),
    [bookings],
  );
  const statusOptions = useMemo(
    () => [...new Set(bookings.map((booking) => booking.status || "new"))].sort(),
    [bookings],
  );

  const filteredBookings = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("de-DE");
    return bookings.filter((booking) => {
      if (statusFilter !== "all" && (booking.status || "new") !== statusFilter) return false;
      if (serviceFilter !== "all" && booking.service !== serviceFilter) return false;
      return !normalizedQuery || getBookingSearchText(booking).includes(normalizedQuery);
    });
  }, [bookings, query, serviceFilter, statusFilter]);

  const selectedBooking = selectedId
    ? bookings.find((booking) => booking.id === selectedId) || null
    : null;
  const counts = {
    new: bookings.filter((booking) => (booking.status || "new") === "new").length,
    inProgress: bookings.filter((booking) => booking.status === "in_bearbeitung").length,
    done: bookings.filter((booking) => booking.status === "erledigt").length,
  };

  async function updateStatus(bookingId: string, status: EditableBookingStatus) {
    const supabase = getDashboardSupabaseClient();
    if (!supabase) return;

    setUpdatingId(bookingId);
    setError("");

    const { data, error: updateError } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", bookingId)
      .select("id,status")
      .single();

    if (updateError || !data) {
      setError("Der Status konnte nicht aktualisiert werden. Admin-Rolle und RLS-Policy prüfen.");
    } else {
      setBookings((current) =>
        current.map((booking) => (booking.id === bookingId ? { ...booking, status: data.status } : booking)),
      );
    }

    setUpdatingId(null);
  }

  async function logout() {
    const supabase = getDashboardSupabaseClient();
    if (supabase) await supabase.auth.signOut();
    router.replace("/dashboard/login");
  }

  if (!dashboardSupabaseConfig.isConfigured) {
    return (
      <main className="grid min-h-[100svh] place-items-center bg-[#07111f] px-5 py-12 text-white">
        <section className="w-full max-w-xl rounded-2xl border border-amber-300/25 bg-amber-300/10 p-6 shadow-2xl sm:p-8">
          <ShieldCheck className="h-8 w-8 text-amber-100" aria-hidden="true" />
          <h1 className="mt-5 text-3xl font-black">Dashboard noch nicht konfiguriert</h1>
          <p className="mt-4 font-semibold leading-7 text-amber-50/90">
            Die Website bleibt funktionsfähig. Für das Dashboard müssen beim nächsten Cloudflare-Build
            <code className="mx-1 rounded bg-black/20 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_URL</code>
            und
            <code className="ml-1 rounded bg-black/20 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
            gesetzt sein.
          </p>
        </section>
      </main>
    );
  }

  if (checkingAccess) {
    return (
      <main className="grid min-h-[100svh] place-items-center bg-[#07111f] text-white" aria-live="polite">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-bold">
          <Loader2 className="h-5 w-5 animate-spin text-cyan-200" aria-hidden="true" />
          Zugriff wird geprüft …
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100svh] bg-[#07111f] text-white">
      <header className="border-b border-white/10 bg-[#07111f]/95 px-5 py-4 backdrop-blur sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300 text-slate-950">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-black tracking-[0.18em]" translate="no">FLOXANT</p>
              <p className="truncate text-xs font-semibold text-slate-400">Anfrage-Dashboard</p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm font-black text-slate-200 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Abmelden</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Interne Übersicht</p>
            <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] sm:text-5xl">Kundenanfragen</h1>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-400 sm:text-base">
              Neueste Anfragen zuerst. Statusänderungen werden direkt und durch RLS abgesichert in Supabase gespeichert.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadBookings()}
            disabled={loading}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-black text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
            Aktualisieren
          </button>
        </section>

        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          <MetricCard label="Neue Anfragen" value={counts.new} icon={<CircleDot className="h-5 w-5" />} tone="cyan" />
          <MetricCard label="In Bearbeitung" value={counts.inProgress} icon={<Clock3 className="h-5 w-5" />} tone="amber" />
          <MetricCard label="Erledigt" value={counts.done} icon={<CheckCircle2 className="h-5 w-5" />} tone="emerald" />
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
          <div className="grid gap-3 border-b border-white/10 p-4 lg:grid-cols-[minmax(18rem,1fr)_14rem_14rem_auto] lg:p-5">
            <label className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 focus-within:border-cyan-200/40 focus-within:ring-2 focus-within:ring-cyan-300/10">
              <Search className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
              <span className="sr-only">Anfragen durchsuchen</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent py-2 text-sm font-semibold text-white outline-none placeholder:text-slate-600"
                placeholder="Name, Firma, Ort, Leistung …"
              />
            </label>
            <label>
              <span className="sr-only">Nach Status filtern</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="min-h-11 w-full rounded-xl border border-white/10 bg-[#0b1727] px-4 text-sm font-bold text-white outline-none focus:border-cyan-200/40 focus:ring-2 focus:ring-cyan-300/10"
              >
                <option value="all">Alle Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{getStatusLabel(status)}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Nach Anfrageart filtern</span>
              <select
                value={serviceFilter}
                onChange={(event) => setServiceFilter(event.target.value)}
                className="min-h-11 w-full rounded-xl border border-white/10 bg-[#0b1727] px-4 text-sm font-bold text-white outline-none focus:border-cyan-200/40 focus:ring-2 focus:ring-cyan-300/10"
              >
                <option value="all">Alle Anfragearten</option>
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>{getServiceLabel(service)}</option>
                ))}
              </select>
            </label>
            <div className="flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-black text-slate-300">
              {filteredBookings.length} von {bookings.length}
            </div>
          </div>

          {error ? (
            <div className="m-4 rounded-xl border border-red-300/25 bg-red-300/10 p-4 text-sm font-semibold leading-6 text-red-100" role="alert" aria-live="polite">
              {error}
            </div>
          ) : null}

          {loading && bookings.length === 0 ? (
            <div className="flex min-h-80 items-center justify-center gap-3 text-sm font-bold text-slate-400" role="status">
              <Loader2 className="h-5 w-5 animate-spin text-cyan-200" aria-hidden="true" />
              Anfragen werden geladen …
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="grid min-h-80 place-items-center p-8 text-center">
              <div>
                <Inbox className="mx-auto h-10 w-10 text-slate-600" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-black">Keine passenden Anfragen</h2>
                <p className="mt-2 text-sm font-semibold text-slate-500">Suche oder Filter anpassen und erneut prüfen.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1050px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
                      <th className="px-5 py-4">Kontakt</th>
                      <th className="px-5 py-4">Anfrage</th>
                      <th className="px-5 py-4">Ort / Herkunft</th>
                      <th className="px-5 py-4">Eingang</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => {
                      const summary = getBookingSummary(booking);
                      return (
                        <tr key={booking.id} className="border-b border-white/[0.07] align-top transition hover:bg-white/[0.035]">
                          <td className="px-5 py-5">
                            <p className="font-black text-white">{summary.name}</p>
                            <p className="mt-1 max-w-56 truncate text-xs font-semibold text-slate-500">{summary.company || summary.email || "Keine Zusatzangabe"}</p>
                          </td>
                          <td className="px-5 py-5">
                            <p className="font-bold text-slate-100">{summary.service}</p>
                            <p className="mt-1 max-w-64 truncate text-xs font-semibold text-slate-500">{summary.message || "Keine Beschreibung"}</p>
                          </td>
                          <td className="px-5 py-5">
                            <p className="max-w-64 truncate text-sm font-bold text-slate-300">{summary.location || "Nicht angegeben"}</p>
                            <p className="mt-1 max-w-64 truncate text-xs font-semibold text-slate-500">{summary.source || summary.entryPoint || "Nicht erfasst"}</p>
                          </td>
                          <td className="whitespace-nowrap px-5 py-5 text-sm font-bold text-slate-300">{formatBookingDate(summary.date)}</td>
                          <td className="px-5 py-5">
                            <select
                              value={EDITABLE_STATUSES.some((item) => item.value === summary.status) ? summary.status : ""}
                              onChange={(event) => void updateStatus(booking.id, event.target.value as EditableBookingStatus)}
                              disabled={updatingId === booking.id}
                              aria-label={`Status für ${summary.name}`}
                              className={`min-h-10 rounded-xl border px-3 text-xs font-black outline-none focus:ring-2 focus:ring-cyan-300/20 disabled:opacity-60 ${statusTone(summary.status)}`}
                            >
                              {!EDITABLE_STATUSES.some((item) => item.value === summary.status) ? <option value="">{getStatusLabel(summary.status)}</option> : null}
                              {EDITABLE_STATUSES.map((item) => <option key={item.value} value={item.value} className="bg-slate-900 text-white">{item.label}</option>)}
                            </select>
                          </td>
                          <td className="px-5 py-5 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedId(booking.id)}
                              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-xs font-black text-slate-200 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                            >
                              Öffnen
                              <ChevronRight className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-white/[0.07] lg:hidden">
                {filteredBookings.map((booking) => {
                  const summary = getBookingSummary(booking);
                  return (
                    <article key={booking.id} className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-base font-black">{summary.name}</p>
                          <p className="mt-1 truncate text-xs font-semibold text-slate-500">{summary.company || summary.email || "Keine Zusatzangabe"}</p>
                        </div>
                        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-black ${statusTone(summary.status)}`}>{getStatusLabel(summary.status)}</span>
                      </div>
                      <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-300">
                        <p>{summary.service}</p>
                        <p className="flex items-start gap-2 text-slate-400"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{summary.location || "Ort nicht angegeben"}</p>
                        <p className="flex items-start gap-2 text-slate-400"><Clock3 className="mt-0.5 h-4 w-4 shrink-0" />{formatBookingDate(summary.date)}</p>
                      </div>
                      <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
                        <select
                          value={EDITABLE_STATUSES.some((item) => item.value === summary.status) ? summary.status : ""}
                          onChange={(event) => void updateStatus(booking.id, event.target.value as EditableBookingStatus)}
                          disabled={updatingId === booking.id}
                          aria-label={`Status für ${summary.name}`}
                          className="min-h-11 min-w-0 rounded-xl border border-white/10 bg-[#0b1727] px-3 text-xs font-black text-white outline-none focus:ring-2 focus:ring-cyan-300/20"
                        >
                          {!EDITABLE_STATUSES.some((item) => item.value === summary.status) ? <option value="">{getStatusLabel(summary.status)}</option> : null}
                          {EDITABLE_STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </select>
                        <button type="button" onClick={() => setSelectedId(booking.id)} className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl bg-cyan-300 px-4 text-xs font-black text-slate-950">
                          Details <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </div>

      {selectedBooking ? (
        <BookingDetail
          booking={selectedBooking}
          updating={updatingId === selectedBooking.id}
          onClose={() => setSelectedId(null)}
          onStatusChange={(status) => void updateStatus(selectedBooking.id, status)}
        />
      ) : null}
    </main>
  );
}

function MetricCard({ label, value, icon, tone }: { label: string; value: number; icon: React.ReactNode; tone: "cyan" | "amber" | "emerald" }) {
  const classes = {
    cyan: "border-cyan-200/15 bg-cyan-200/[0.07] text-cyan-100",
    amber: "border-amber-200/15 bg-amber-200/[0.07] text-amber-100",
    emerald: "border-emerald-200/15 bg-emerald-200/[0.07] text-emerald-100",
  };
  return (
    <article className={`rounded-2xl border p-5 ${classes[tone]}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] opacity-70">{label}</p>
          <p className="mt-3 text-4xl font-black tracking-tight">{value}</p>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-current/10 bg-black/10">{icon}</span>
      </div>
    </article>
  );
}

function BookingDetail({ booking, updating, onClose, onStatusChange }: { booking: BookingRecord; updating: boolean; onClose: () => void; onStatusChange: (status: EditableBookingStatus) => void }) {
  const summary = getBookingSummary(booking);
  const currentEditableStatus = EDITABLE_STATUSES.some((item) => item.value === summary.status) ? summary.status : "";

  return (
    <div className="fixed inset-0 z-[10000] flex justify-end bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="booking-detail-title">
      <button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Detailansicht schließen" />
      <section className="relative h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-[#091525] p-5 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Anfragedetail</p>
            <h2 id="booking-detail-title" className="mt-3 break-words text-3xl font-black tracking-tight">{summary.name}</h2>
            <p className="mt-2 break-all font-mono text-xs text-slate-600">{booking.id}</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" aria-label="Detailansicht schließen">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <DetailField icon={<Clock3 />} label="Eingang" value={formatBookingDate(summary.date)} />
          <DetailField icon={<Inbox />} label="Anfrageart" value={summary.service} />
          <DetailField icon={<Building2 />} label="Firma" value={summary.company || "Nicht angegeben"} />
          <DetailField icon={<MapPin />} label="Ort / Route" value={summary.location || "Nicht angegeben"} />
        </div>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 text-sm font-black text-slate-200">
            <UserRound className="h-4 w-4 text-cyan-200" aria-hidden="true" />
            Kontakt
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {summary.email ? (
              <a href={`mailto:${summary.email}`} className="flex min-h-11 min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-black/15 px-4 text-sm font-bold text-cyan-100 transition hover:bg-white/[0.06]">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /><span className="truncate">{summary.email}</span>
              </a>
            ) : <p className="rounded-xl border border-white/10 bg-black/15 px-4 py-3 text-sm font-semibold text-slate-500">E-Mail nicht angegeben</p>}
            {summary.phone ? (
              <a href={phoneHref(summary.phone)} className="flex min-h-11 min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-black/15 px-4 text-sm font-bold text-cyan-100 transition hover:bg-white/[0.06]">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" /><span className="truncate">{summary.phone}</span>
              </a>
            ) : <p className="rounded-xl border border-white/10 bg-black/15 px-4 py-3 text-sm font-semibold text-slate-500">Telefon nicht angegeben</p>}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 text-sm font-black text-slate-200">
            <MessageSquareText className="h-4 w-4 text-cyan-200" aria-hidden="true" />
            Nachricht / Auftragsbeschreibung
          </div>
          <p className="mt-4 whitespace-pre-wrap break-words text-sm font-semibold leading-7 text-slate-300">{summary.message || "Keine Nachricht gespeichert."}</p>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h3 className="text-sm font-black text-slate-200">Herkunft</h3>
          <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
            <div><dt className="text-xs font-black uppercase tracking-[0.12em] text-slate-600">Quelle / Formulartyp</dt><dd className="mt-2 break-words font-bold text-slate-300">{summary.source || "Nicht erfasst"}</dd></div>
            <div><dt className="text-xs font-black uppercase tracking-[0.12em] text-slate-600">Einstiegsseite</dt><dd className="mt-2 break-words font-bold text-slate-300">{summary.entryPoint || "Nicht erfasst"}</dd></div>
          </dl>
        </section>

        <section className="mt-6 rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.06] p-5">
          <label className="block text-sm font-black text-cyan-50" htmlFor={`detail-status-${booking.id}`}>Status ändern</label>
          <div className="mt-3 flex items-center gap-3">
            <select
              id={`detail-status-${booking.id}`}
              value={currentEditableStatus}
              onChange={(event) => onStatusChange(event.target.value as EditableBookingStatus)}
              disabled={updating}
              className="min-h-12 min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0b1727] px-4 text-sm font-black text-white outline-none focus:ring-2 focus:ring-cyan-300/20 disabled:opacity-60"
            >
              {!currentEditableStatus ? <option value="">{getStatusLabel(summary.status)}</option> : null}
              {EDITABLE_STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
            {updating ? <Loader2 className="h-5 w-5 animate-spin text-cyan-200" aria-label="Status wird gespeichert" /> : null}
          </div>
        </section>
      </section>
    </div>
  );
}

function DetailField({ icon, label, value }: { icon: React.ReactElement<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-slate-600">
        <span className="text-cyan-200">{icon}</span>{label}
      </div>
      <p className="mt-3 break-words text-sm font-bold leading-6 text-slate-200">{value}</p>
    </div>
  );
}
