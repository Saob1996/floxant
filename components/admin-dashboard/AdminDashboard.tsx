"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
  ExternalLink,
  FileImage,
  Inbox,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  MessageSquareText,
  Paperclip,
  Phone,
  RefreshCw,
  Route,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
  Wrench,
  X,
} from "lucide-react";

import {
  buildAdminBookingDetailView,
  formatAdminDisplayScalar,
  type AdminDetailSection,
  type AdminDisplayValue,
} from "@/lib/admin-dashboard/booking-details";
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
  if (["in_progress", "contacted", "quote_sent", "appointment_scheduled", "in_bearbeitung"].includes(status)) {
    return "border-amber-200/25 bg-amber-200/10 text-amber-100";
  }
  if (["won", "completed", "erledigt"].includes(status)) return "border-emerald-200/25 bg-emerald-200/10 text-emerald-100";
  if (status === "lost") return "border-rose-200/25 bg-rose-200/10 text-rose-100";
  return "border-white/10 bg-white/[0.06] text-slate-300";
}

function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

function whatsappHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const withoutInternationalPrefix = digits.startsWith("00") ? digits.slice(2) : digits;
  const internationalDigits = withoutInternationalPrefix.startsWith("490")
    ? `49${withoutInternationalPrefix.slice(3)}`
    : withoutInternationalPrefix.startsWith("0")
      ? `49${withoutInternationalPrefix.slice(1)}`
      : withoutInternationalPrefix;
  return `https://wa.me/${internationalDigits}`;
}

type LocationFilter = "all" | "duesseldorf" | "regensburg" | "other";

function getLocationFilterValues(booking: BookingRecord): Array<Exclude<LocationFilter, "all">> {
  const location = getBookingSummary(booking).location.toLocaleLowerCase("de-DE");
  const matches: Array<Exclude<LocationFilter, "all" | "other">> = [];
  if (location.includes("düsseldorf") || location.includes("duesseldorf")) matches.push("duesseldorf");
  if (location.includes("regensburg")) matches.push("regensburg");
  return matches.length > 0 ? matches : ["other"];
}

function useModalFocus() {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const focusableSelector = [
      'a[href]',
      'button:not([disabled]):not([tabindex="-1"])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'summary',
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");
    const getFocusableElements = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => !element.closest("[inert]") && element.getAttribute("aria-hidden") !== "true",
      );

    (getFocusableElements()[0] || dialog).focus();

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusableElements = getFocusableElements();
      if (!focusableElements.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements.at(-1) || first;
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener("keydown", trapFocus);
    return () => {
      dialog.removeEventListener("keydown", trapFocus);
      previousFocus?.focus();
    };
  }, []);

  return dialogRef;
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
  const [locationFilter, setLocationFilter] = useState<LocationFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<BookingRecord | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");

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
          ? "Der Zugriff wurde abgelehnt. Bitte prüfen Sie Ihre Berechtigung."
          : "Die Anfragen konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
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
      if (event.key !== "Escape") return;
      if (deleteCandidate) {
        if (deletingId === deleteCandidate.id) return;
        setDeleteError("");
        setDeleteCandidate(null);
        return;
      }
      setSelectedId(null);
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [deleteCandidate, deletingId, selectedId]);

  const serviceOptions = useMemo(
    () => [...new Set(bookings.map((booking) => booking.service).filter((value): value is string => Boolean(value)))].sort(),
    [bookings],
  );
  const filteredBookings = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("de-DE");
    return bookings.filter((booking) => {
      if (statusFilter !== "all" && (booking.status || "new") !== statusFilter) return false;
      if (serviceFilter !== "all" && booking.service !== serviceFilter) return false;
      if (locationFilter !== "all" && !getLocationFilterValues(booking).includes(locationFilter)) return false;
      return !normalizedQuery || getBookingSearchText(booking).includes(normalizedQuery);
    });
  }, [bookings, locationFilter, query, serviceFilter, statusFilter]);

  const selectedBooking = selectedId
    ? bookings.find((booking) => booking.id === selectedId) || null
    : null;
  const counts = {
    new: bookings.filter((booking) => (booking.status || "new") === "new").length,
    inProgress: bookings.filter((booking) => ["in_progress", "contacted", "quote_sent", "appointment_scheduled", "in_bearbeitung"].includes(booking.status || "")).length,
    done: bookings.filter((booking) => ["completed", "erledigt"].includes(booking.status || "")).length,
  };

  async function updateStatus(bookingId: string, status: EditableBookingStatus) {
    const supabase = getDashboardSupabaseClient();
    if (!supabase) return;

    setUpdatingId(bookingId);
    setError("");

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;
    if (sessionError || !accessToken) {
      setError("Die Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.");
      setUpdatingId(null);
      return;
    }

    let result: { bookingId?: string; status?: string; details?: unknown } | null = null;
    let response: Response | null = null;
    try {
      response = await fetch(`/api/admin/bookings/${encodeURIComponent(bookingId)}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      result = await response.json().catch(() => null) as { bookingId?: string; status?: string; details?: unknown } | null;
    } catch {
      response = null;
    }

    if (!response?.ok || result?.bookingId !== bookingId || result.status !== status) {
      setError("Der Status konnte nicht aktualisiert werden. Bitte prüfen Sie Ihre Berechtigung und versuchen Sie es erneut.");
    } else {
      setBookings((current) =>
        current.map((booking) => (booking.id === bookingId ? { ...booking, status: result?.status || status, details: result?.details ?? booking.details } : booking)),
      );
    }

    setUpdatingId(null);
  }

  async function deleteBooking(booking: BookingRecord) {
    const supabase = getDashboardSupabaseClient();
    if (!supabase || !dashboardSupabaseConfig.adminDeleteEnabled) return;

    setDeletingId(booking.id);
    setError("");
    setDeleteError("");

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;
    if (sessionError || !accessToken) {
      const message = "Die Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.";
      setError(message);
      setDeleteError(message);
      setDeletingId(null);
      return;
    }

    let response: Response;
    try {
      response = await fetch(`/api/admin/bookings/${encodeURIComponent(booking.id)}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch {
      const message = "Die Anfrage konnte wegen eines Verbindungsfehlers nicht gelöscht werden.";
      setError(message);
      setDeleteError(message);
      setDeletingId(null);
      return;
    }

    const result = await response.json().catch(() => null) as { deletedId?: string } | null;
    if (!response.ok || result?.deletedId !== booking.id) {
      const message = "Die Anfrage wurde nicht gelöscht. Bitte prüfen Sie Admin-Rolle, DELETE-Policy und Datenbankmigration.";
      setError(message);
      setDeleteError(message);
    } else {
      setBookings((current) => current.filter((item) => item.id !== booking.id));
      setDeleteError("");
      setDeleteCandidate(null);
      setSelectedId(null);
    }

    setDeletingId(null);
  }

  async function logout() {
    const supabase = getDashboardSupabaseClient();
    if (supabase) await supabase.auth.signOut();
    router.replace("/dashboard/login");
  }

  if (!dashboardSupabaseConfig.isConfigured) {
    return (
      <main className="grid min-h-[100svh] min-w-0 place-items-center overflow-x-hidden bg-[#07111f] px-5 py-12 text-white">
        <section className="w-full min-w-0 max-w-xl rounded-2xl border border-amber-300/25 bg-amber-300/10 p-6 shadow-2xl sm:p-8">
          <ShieldCheck className="h-8 w-8 text-amber-100" aria-hidden="true" />
          <h1 className="mt-5 text-3xl font-black">Dashboard noch nicht konfiguriert</h1>
          <p className="mt-4 font-semibold leading-7 text-amber-50/90">
            Die Website bleibt funktionsfähig. Für das Dashboard müssen beim nächsten Cloudflare-Build
            <code className="mx-1 break-all rounded bg-black/20 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_URL</code>
            und
            <code className="ml-1 break-all rounded bg-black/20 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
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
      <header className="border-b border-white/10 bg-[#07111f]/95 px-5 py-4 backdrop-blur sm:px-8 lg:px-10" inert={Boolean(selectedBooking)} aria-hidden={selectedBooking ? true : undefined}>
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
            aria-label="Abmelden"
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm font-black text-slate-200 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Abmelden</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10" inert={Boolean(selectedBooking)} aria-hidden={selectedBooking ? true : undefined}>
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Interne Übersicht</p>
            <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] sm:text-5xl">Kundenanfragen</h1>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-400 sm:text-base">
              Neueste Anfragen zuerst. Statusänderungen werden geschützt gespeichert und sind nach dem Neuladen weiterhin verfügbar.
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
          <div className="grid gap-3 border-b border-white/10 p-4 lg:grid-cols-[minmax(18rem,1fr)_12rem_13rem_12rem_auto] lg:p-5">
            <label className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 focus-within:border-cyan-200/40 focus-within:ring-2 focus-within:ring-cyan-300/10">
              <Search className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
              <span className="sr-only">Anfragen durchsuchen</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent py-2 text-sm font-semibold text-white outline-none placeholder:text-slate-600"
                placeholder="Name, E-Mail, Telefon oder Anfrage-ID …"
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
                {EDITABLE_STATUSES.map((status) => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Nach Standort filtern</span>
              <select
                value={locationFilter}
                onChange={(event) => setLocationFilter(event.target.value as LocationFilter)}
                className="min-h-11 w-full rounded-xl border border-white/10 bg-[#0b1727] px-4 text-sm font-bold text-white outline-none focus:border-cyan-200/40 focus:ring-2 focus:ring-cyan-300/10"
              >
                <option value="all">Alle Standorte</option>
                <option value="duesseldorf">Düsseldorf</option>
                <option value="regensburg">Regensburg</option>
                <option value="other">Sonstiger / unklar</option>
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
                <table className="w-full min-w-[1500px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
                      <th className="px-5 py-4">Name</th>
                      <th className="px-5 py-4">Datum</th>
                      <th className="px-5 py-4">Service</th>
                      <th className="px-5 py-4">Standort</th>
                      <th className="px-5 py-4">Telefon</th>
                      <th className="px-5 py-4">E-Mail</th>
                      <th className="px-5 py-4">Quelle</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4 text-right">Schnellaktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => {
                      const summary = getBookingSummary(booking);
                      return (
                        <tr key={booking.id} className="border-b border-white/[0.07] align-top transition hover:bg-white/[0.035]">
                          <td className="px-5 py-5">
                            <p className="font-black text-white">{summary.name}</p>
                            <p className="mt-1 max-w-52 truncate text-xs font-semibold text-slate-500">{summary.company || summary.email || booking.id}</p>
                          </td>
                          <td className="whitespace-nowrap px-5 py-5 text-sm font-bold text-slate-300">{formatBookingDate(summary.date)}</td>
                          <td className="px-5 py-5">
                            <p className="font-bold text-slate-100">{summary.service}</p>
                          </td>
                          <td className="px-5 py-5">
                            <p className="max-w-56 truncate text-sm font-bold text-slate-300">{summary.location || "Nicht angegeben"}</p>
                          </td>
                          <td className="px-5 py-5 text-sm font-bold text-slate-300">
                            {summary.phone ? <a href={phoneHref(summary.phone)} className="whitespace-nowrap text-cyan-100 hover:text-white">{summary.phone}</a> : "Nicht angegeben"}
                          </td>
                          <td className="px-5 py-5 text-sm font-bold text-slate-300">
                            {summary.email ? <a href={`mailto:${summary.email}`} className="block max-w-56 truncate text-cyan-100 hover:text-white">{summary.email}</a> : "Nicht angegeben"}
                          </td>
                          <td className="px-5 py-5 text-sm font-bold text-slate-300">
                            <p className="max-w-48 truncate">{summary.source || "Nicht angegeben"}</p>
                          </td>
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
                            <div className="flex justify-end gap-2">
                              {summary.phone ? <a href={phoneHref(summary.phone)} aria-label={`${summary.name} anrufen`} title="Anrufen" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-cyan-100 hover:bg-white/10"><Phone className="h-4 w-4" /></a> : null}
                              {summary.phone ? <a href={whatsappHref(summary.phone)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp an ${summary.name} öffnen`} title="WhatsApp" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-emerald-200 hover:bg-white/10"><MessageCircle className="h-4 w-4" /></a> : null}
                              {summary.email ? <a href={`mailto:${summary.email}`} aria-label={`E-Mail an ${summary.name} öffnen`} title="E-Mail" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-cyan-100 hover:bg-white/10"><Mail className="h-4 w-4" /></a> : null}
                              <button type="button" onClick={() => setSelectedId(booking.id)} aria-label={`Anfrage von ${summary.name} öffnen`} title="Öffnen" className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300 text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"><ChevronRight className="h-4 w-4" /></button>
                            </div>
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
                        <p className="flex items-start gap-2 text-slate-400"><Phone className="mt-0.5 h-4 w-4 shrink-0" />{summary.phone || "Telefon nicht angegeben"}</p>
                        <p className="flex items-start gap-2 text-slate-400"><Mail className="mt-0.5 h-4 w-4 shrink-0" />{summary.email || "E-Mail nicht angegeben"}</p>
                        <p className="flex items-start gap-2 text-slate-400"><Megaphone className="mt-0.5 h-4 w-4 shrink-0" />{summary.source || "Quelle nicht angegeben"}</p>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {summary.phone ? <a href={phoneHref(summary.phone)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 text-xs font-black text-cyan-100"><Phone className="h-4 w-4" />Anrufen</a> : null}
                        {summary.phone ? <a href={whatsappHref(summary.phone)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 text-xs font-black text-emerald-200"><MessageCircle className="h-4 w-4" />WhatsApp</a> : null}
                        {summary.email ? <a href={`mailto:${summary.email}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 text-xs font-black text-cyan-100"><Mail className="h-4 w-4" />E-Mail</a> : null}
                        <button type="button" onClick={() => setSelectedId(booking.id)} className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl bg-cyan-300 px-4 text-xs font-black text-slate-950">Öffnen <ChevronRight className="h-4 w-4" /></button>
                      </div>
                      <div className="mt-2">
                        <select
                          value={EDITABLE_STATUSES.some((item) => item.value === summary.status) ? summary.status : ""}
                          onChange={(event) => void updateStatus(booking.id, event.target.value as EditableBookingStatus)}
                          disabled={updatingId === booking.id}
                          aria-label={`Status für ${summary.name}`}
                          className="min-h-11 w-full min-w-0 rounded-xl border border-white/10 bg-[#0b1727] px-3 text-xs font-black text-white outline-none focus:ring-2 focus:ring-cyan-300/20"
                        >
                          {!EDITABLE_STATUSES.some((item) => item.value === summary.status) ? <option value="">{getStatusLabel(summary.status)}</option> : null}
                          {EDITABLE_STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </select>
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
          obscured={Boolean(deleteCandidate)}
          onClose={() => setSelectedId(null)}
          onStatusChange={(status) => void updateStatus(selectedBooking.id, status)}
          onDeleteRequest={dashboardSupabaseConfig.adminDeleteEnabled
            ? () => {
                if (deletingId === selectedBooking.id) return;
                setDeleteError("");
                setDeleteCandidate(selectedBooking);
              }
            : undefined}
        />
      ) : null}

      {dashboardSupabaseConfig.adminDeleteEnabled && deleteCandidate ? (
        <DeleteConfirmation
          booking={deleteCandidate}
          deleting={deletingId === deleteCandidate.id}
          errorMessage={deleteError}
          onCancel={() => {
            if (deletingId === deleteCandidate.id) return;
            setDeleteError("");
            setDeleteCandidate(null);
          }}
          onConfirm={() => void deleteBooking(deleteCandidate)}
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

function sectionIcon(section: AdminDetailSection) {
  if (section.id === "overview") return <Inbox className="h-4 w-4" />;
  if (section.id === "contact") return <UserRound className="h-4 w-4" />;
  if (section.id === "location") return <Route className="h-4 w-4" />;
  if (section.id === "schedule") return <Clock3 className="h-4 w-4" />;
  if (section.id === "service") return <Wrench className="h-4 w-4" />;
  if (section.id === "campaign") return <Megaphone className="h-4 w-4" />;
  return <MessageSquareText className="h-4 w-4" />;
}

function BookingDetail({
  booking,
  updating,
  obscured,
  onClose,
  onStatusChange,
  onDeleteRequest,
}: {
  booking: BookingRecord;
  updating: boolean;
  obscured: boolean;
  onClose: () => void;
  onStatusChange: (status: EditableBookingStatus) => void;
  onDeleteRequest?: () => void;
}) {
  const dialogRef = useModalFocus();
  const summary = getBookingSummary(booking);
  const currentEditableStatus = EDITABLE_STATUSES.some((item) => item.value === summary.status) ? summary.status : "";
  const detailView = buildAdminBookingDetailView(booking);
  const sectionOrder = ["contact", "round-three-workflow", "service", "calculator", "location", "schedule", "description"];
  const customerSections = sectionOrder
    .map((sectionId) => detailView.sections.find((section) => section.id === sectionId))
    .filter((section): section is AdminDetailSection => Boolean(section?.items.length));
  const internalItems = detailView.sections
    .filter((section) => section.id === "overview" || section.id === "campaign")
    .flatMap((section) =>
      section.items.filter(
        (item) => !["name", "id", "timestamp", "service", "status"].includes(item.path),
      ),
    );

  return (
    <div ref={dialogRef} tabIndex={-1} className="fixed inset-0 z-[10000] flex justify-end bg-black/70 backdrop-blur-sm" role="dialog" aria-modal={obscured ? undefined : true} aria-hidden={obscured ? true : undefined} inert={obscured} aria-labelledby="booking-detail-title">
      <button type="button" tabIndex={-1} className="absolute inset-0 cursor-default" onClick={onClose} aria-hidden="true" />
      <section className="relative h-full w-full max-w-4xl overflow-x-hidden overflow-y-auto border-l border-white/10 bg-[#091525] p-5 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Anfragedetail</p>
            <h2 id="booking-detail-title" className="mt-3 break-words text-3xl font-black tracking-tight">{summary.name}</h2>
            <p className="mt-2 break-all font-mono text-xs text-slate-600">{booking.id}</p>
            <p className="mt-3 text-sm font-bold text-slate-300">
              {summary.service} · {formatBookingDate(summary.date)}
            </p>
          </div>
          <button type="button" onClick={onClose} autoFocus className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" aria-label="Detailansicht schließen">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {summary.email ? (
            <a href={`mailto:${summary.email}`} className="flex min-h-12 min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-bold text-cyan-100 transition hover:bg-white/[0.08]">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="break-all">{summary.email}</span>
            </a>
          ) : null}
          {summary.phone ? (
            <a href={phoneHref(summary.phone)} className="flex min-h-12 min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-bold text-cyan-100 transition hover:bg-white/[0.08]">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="break-all">{summary.phone}</span>
            </a>
          ) : null}
        </div>

        {customerSections.map((section) => (
          <DetailSectionCard key={section.id} section={section} />
        ))}

        {detailView.files.length ? (
          <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-sm font-black text-slate-100">
              <Paperclip className="h-4 w-4 text-cyan-200" aria-hidden="true" />
              Dateien und Fotos
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {detailView.files.map((file) => (
                <article key={file.url} className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-black/20">
                  {file.isImage ? (
                    <Image
                      src={file.url}
                      alt={`Vorschau: ${file.name}`}
                      width={800}
                      height={500}
                      sizes="(max-width: 640px) 100vw, 420px"
                      className="aspect-[8/5] w-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="grid aspect-[8/5] place-items-center bg-white/[0.03]">
                      <FileImage className="h-10 w-10 text-slate-600" aria-hidden="true" />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="break-all text-sm font-black text-slate-100">{file.name}</p>
                    <p className="mt-1 break-all text-xs font-semibold text-slate-500">{file.contentType}</p>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-black text-cyan-100 hover:bg-white/[0.06]"
                    >
                      Sicher öffnen
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {detailView.additionalItems.length ? (
          <details className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <summary className="cursor-pointer text-sm font-black text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
              Weitere gespeicherte Angaben ({detailView.additionalItems.length})
            </summary>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {detailView.additionalItems.map((detailItem) => (
                <div key={detailItem.path} className="min-w-0 rounded-xl border border-white/[0.08] bg-black/15 p-4">
                  <dt className="break-words text-[11px] font-black uppercase tracking-[0.1em] text-slate-500">
                    {detailItem.label}
                  </dt>
                  <dd className="mt-1 break-all font-mono text-[10px] text-slate-600">{detailItem.path}</dd>
                  <dd className="mt-3 min-w-0 text-sm font-semibold leading-6 text-slate-200">
                    <AdminValue value={detailItem.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        ) : null}

        {internalItems.length ? (
          <details className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
            <summary className="cursor-pointer text-sm font-black text-slate-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
              Technische Anfrageinformationen ({internalItems.length})
            </summary>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {internalItems.map((detailItem) => (
                <div key={`${detailItem.path}-${detailItem.label}`} className="min-w-0 rounded-xl border border-white/[0.08] bg-black/15 p-4">
                  <dt className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-500">{detailItem.label}</dt>
                  <dd className="mt-2 min-w-0 text-sm font-semibold leading-6 text-slate-300">
                    <AdminValue value={detailItem.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        ) : null}

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

        {onDeleteRequest ? <section className="mt-6 rounded-2xl border border-red-300/20 bg-red-300/[0.05] p-5">
          <h3 className="text-sm font-black text-red-100">Anfrage dauerhaft entfernen</h3>
          <p className="mt-2 text-xs font-semibold leading-5 text-slate-400">
            Diese Aktion löscht den Datensatz und kann nicht rückgängig gemacht werden.
          </p>
          <button
            type="button"
            onClick={onDeleteRequest}
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-red-300/25 bg-red-300/10 px-4 text-xs font-black text-red-100 transition hover:bg-red-300/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-200"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Anfrage löschen
          </button>
        </section> : null}
      </section>
    </div>
  );
}

function DetailSectionCard({ section }: { section: AdminDetailSection }) {
  const title = section.id === "service"
    ? "Auftrag"
    : section.id === "calculator"
      ? "Rechnerangaben zum Auftrag"
      : section.title;

  return (
    <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <h3 className="flex items-center gap-2 text-sm font-black text-slate-100">
        <span className="text-cyan-200" aria-hidden="true">{sectionIcon(section)}</span>
        {title}
      </h3>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        {section.items.map((detailItem) => (
          <div
            key={`${section.id}-${detailItem.path}-${detailItem.label}`}
            className={`min-w-0 rounded-xl border border-white/[0.08] bg-black/15 p-4 ${
              typeof detailItem.value === "object" ? "sm:col-span-2" : ""
            }`}
          >
            <dt className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">{detailItem.label}</dt>
            <dd className="mt-2 min-w-0 text-sm font-semibold leading-6 text-slate-200">
              <AdminValue value={detailItem.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function DeleteConfirmation({
  booking,
  deleting,
  errorMessage,
  onCancel,
  onConfirm,
}: {
  booking: BookingRecord;
  deleting: boolean;
  errorMessage: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const dialogRef = useModalFocus();
  const summary = getBookingSummary(booking);

  return (
    <div ref={dialogRef} tabIndex={-1} className="fixed inset-0 z-[11000] grid place-items-center bg-black/80 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="delete-booking-title" aria-describedby="delete-booking-description">
      <button type="button" tabIndex={-1} className="absolute inset-0 cursor-default" onClick={deleting ? undefined : onCancel} aria-hidden="true" />
      <section className="relative w-full max-w-lg rounded-2xl border border-red-300/25 bg-[#0b1727] p-6 shadow-2xl sm:p-8">
        <AlertTriangle className="h-8 w-8 text-red-200" aria-hidden="true" />
        <h2 id="delete-booking-title" className="mt-5 text-2xl font-black text-white">Diese Anfrage dauerhaft löschen?</h2>
        <p id="delete-booking-description" className="mt-3 text-sm font-semibold leading-6 text-slate-400">
          Der Anfragedatensatz und zugehörige FLOXANT-Uploads können danach nicht wiederhergestellt werden.
        </p>
        <dl className="mt-6 grid gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm">
          <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
            <dt className="font-black text-slate-500">Kundenname</dt>
            <dd className="break-words font-bold text-slate-100">{summary.name}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
            <dt className="font-black text-slate-500">Anfrage-ID</dt>
            <dd className="break-all font-mono text-xs text-slate-300">{booking.id}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
            <dt className="font-black text-slate-500">Datum</dt>
            <dd className="font-bold text-slate-100">{formatBookingDate(summary.date)}</dd>
          </div>
        </dl>
        {errorMessage ? (
          <p className="mt-4 rounded-xl border border-red-300/25 bg-red-300/10 p-3 text-sm font-semibold leading-6 text-red-100" role="alert">
            {errorMessage}
          </p>
        ) : null}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} disabled={deleting} autoFocus className="min-h-11 rounded-xl border border-white/10 px-5 text-sm font-black text-slate-200 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:opacity-50">
            Abbrechen
          </button>
          <button type="button" onClick={onConfirm} disabled={deleting} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 text-sm font-black text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-200 disabled:opacity-60">
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Trash2 className="h-4 w-4" aria-hidden="true" />}
            {deleting ? "Wird gelöscht …" : "Dauerhaft löschen"}
          </button>
        </div>
      </section>
    </div>
  );
}

function AdminValue({ value }: { value: AdminDisplayValue }) {
  if (Array.isArray(value)) {
    return (
      <ul className="grid gap-2">
        {value.map((item, index) => (
          <li key={index} className="min-w-0 rounded-lg border border-white/[0.07] bg-white/[0.035] px-3 py-2">
            <AdminValue value={item} />
          </li>
        ))}
      </ul>
    );
  }

  if (value && typeof value === "object") {
    return (
      <dl className="grid gap-3">
        {Object.entries(value).map(([label, nestedValue]) => (
          <div key={label} className="min-w-0 rounded-lg border border-white/[0.07] bg-white/[0.035] p-3">
            <dt className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">{label}</dt>
            <dd className="mt-2 min-w-0 break-words">
              <AdminValue value={nestedValue} />
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return <span className="whitespace-pre-wrap break-words">{formatAdminDisplayScalar(value)}</span>;
}
