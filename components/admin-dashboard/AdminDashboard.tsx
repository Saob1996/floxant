"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Building2,
  CalendarClock,
  Check,
  ChevronRight,
  CircleDot,
  Clipboard,
  Clock3,
  FileQuestion,
  Inbox,
  Languages,
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
  formatBookingDate,
  getBookingSearchText,
  getBookingSummary,
  getServiceLabel,
  getStatusLabel,
  type BookingRecord,
} from "@/lib/admin-dashboard/bookings";
import {
  evaluateLeadCompleteness,
  getLeadCompletenessLabel,
  type LeadCompletenessResult,
  type LeadCompletenessStatus,
} from "@/lib/admin-dashboard/lead-completeness";
import {
  BOOKING_ADMIN_META_SELECT,
  getDefaultLeadStage,
  getLeadLocale,
  getLeadPriorityLabel,
  getLeadRegion,
  getLeadStageLabel,
  getNextRecommendedAction,
  isTerminalLeadStage,
  LEAD_PRIORITIES,
  LEAD_STAGES,
  type BookingAdminMeta,
  type LeadPriority,
  type LeadStage,
} from "@/lib/admin-dashboard/lead-operations";
import {
  buildLeadResponseDraft,
  getRecommendedReplyTemplateKey,
  getReplyTemplates,
  renderReplyTemplate,
  type ReplyTemplateKey,
} from "@/lib/admin-dashboard/reply-templates";
import {
  dashboardSupabaseConfig,
  getDashboardSupabaseClient,
} from "@/lib/admin-dashboard/supabase-browser";

type AdminMetaState = "loading" | "ready" | "unavailable";

function isAdmin(appMetadata: Record<string, unknown> | undefined): boolean {
  return appMetadata?.role === "admin";
}

function dateValue(booking: BookingRecord): string {
  return booking.timestamp || booking.created_at || "";
}

function isToday(value: string): boolean {
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date.toDateString() === new Date().toDateString();
}

function stageTone(stage: string): string {
  if (stage === "new") return "border-cyan-200/25 bg-cyan-200/10 text-cyan-100";
  if (stage === "needs_info") return "border-rose-200/25 bg-rose-200/10 text-rose-100";
  if (stage === "quote_prepared" || stage === "quote_sent") return "border-violet-200/25 bg-violet-200/10 text-violet-100";
  if (stage === "completed") return "border-emerald-200/25 bg-emerald-200/10 text-emerald-100";
  if (stage === "archived" || stage === "not_fit") return "border-white/10 bg-white/[0.05] text-slate-400";
  return "border-amber-200/25 bg-amber-200/10 text-amber-100";
}

function completenessTone(status: LeadCompletenessStatus): string {
  if (status === "sufficient") return "text-emerald-200";
  if (status === "follow_up_required") return "text-rose-200";
  if (status === "not_assessable") return "text-slate-400";
  return "text-amber-200";
}

function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

function toDateTimeLocal(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function fromDateTimeLocal(value: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [metaByBooking, setMetaByBooking] = useState<Record<string, BookingAdminMeta>>({});
  const [metaState, setMetaState] = useState<AdminMetaState>("loading");
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [localeFilter, setLocaleFilter] = useState("all");
  const [completenessFilter, setCompletenessFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

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
      setError(queryError.code === "42501"
        ? "Der Datenbankzugriff wurde abgelehnt. Admin-Rolle und RLS-Migration prüfen."
        : "Die Anfragen konnten nicht geladen werden. Bitte Verbindung und Supabase-Konfiguration prüfen.");
      setBookings([]);
      setLoading(false);
      return;
    }

    const nextBookings = (data || []) as unknown as BookingRecord[];
    setBookings(nextBookings);
    if (!nextBookings.length) {
      setMetaByBooking({});
      setMetaState("ready");
      setLoading(false);
      return;
    }

    const { data: metaRows, error: metaError } = await supabase
      .from("booking_admin_meta")
      .select(BOOKING_ADMIN_META_SELECT)
      .in("booking_id", nextBookings.map((booking) => booking.id));

    if (metaError) {
      setMetaByBooking({});
      setMetaState("unavailable");
    } else {
      setMetaByBooking(Object.fromEntries(((metaRows || []) as unknown as BookingAdminMeta[]).map((meta) => [meta.booking_id, meta])));
      setMetaState("ready");
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
      if (sessionError || !data.session) {
        router.replace("/dashboard/login");
        return;
      }
      if (!isAdmin(data.session.user.app_metadata)) {
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

  const completenessByBooking = useMemo(
    () => Object.fromEntries(bookings.map((booking) => [booking.id, evaluateLeadCompleteness(booking)])),
    [bookings],
  );
  const serviceOptions = useMemo(
    () => [...new Set(bookings.map((booking) => booking.service).filter((value): value is string => Boolean(value)))].sort(),
    [bookings],
  );

  const filteredBookings = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("de-DE");
    return bookings.filter((booking) => {
      const stage = metaByBooking[booking.id]?.stage || getDefaultLeadStage(booking);
      const completeness = completenessByBooking[booking.id];
      if (stageFilter !== "all" && stage !== stageFilter) return false;
      if (serviceFilter !== "all" && booking.service !== serviceFilter) return false;
      if (regionFilter !== "all" && getLeadRegion(booking) !== regionFilter) return false;
      if (localeFilter !== "all" && getLeadLocale(booking) !== localeFilter) return false;
      if (completenessFilter !== "all" && completeness.status !== completenessFilter) return false;
      return !normalizedQuery || getBookingSearchText(booking).includes(normalizedQuery);
    });
  }, [bookings, completenessByBooking, completenessFilter, localeFilter, metaByBooking, query, regionFilter, serviceFilter, stageFilter]);

  const selectedBooking = selectedId ? bookings.find((booking) => booking.id === selectedId) || null : null;
  const counts = useMemo(() => {
    let newToday = 0;
    let unanswered = 0;
    let missing = 0;
    let followUps = 0;
    let overdue = 0;
    for (const booking of bookings) {
      const meta = metaByBooking[booking.id] || null;
      const stage = meta?.stage || getDefaultLeadStage(booking);
      if (isToday(dateValue(booking))) newToday += 1;
      if (!meta?.first_contact_at && !isTerminalLeadStage(stage)) unanswered += 1;
      if (completenessByBooking[booking.id]?.status !== "sufficient") missing += 1;
      if (meta?.next_follow_up_at) {
        followUps += 1;
        if (new Date(meta.next_follow_up_at).getTime() < Date.now() && !isTerminalLeadStage(stage)) overdue += 1;
      }
    }
    return { totalNew: bookings.filter((booking) => (metaByBooking[booking.id]?.stage || getDefaultLeadStage(booking)) === "new").length, newToday, unanswered, missing, followUps, overdue };
  }, [bookings, completenessByBooking, metaByBooking]);

  async function saveAdminMeta(booking: BookingRecord, draft: EditableMetaDraft) {
    const supabase = getDashboardSupabaseClient();
    if (!supabase || metaState !== "ready") return;
    setSavingId(booking.id);
    setError("");
    const existing = metaByBooking[booking.id];
    const now = new Date().toISOString();
    const payload = {
      booking_id: booking.id,
      stage: draft.stage,
      priority: draft.priority,
      internal_notes: draft.internalNotes.slice(0, 10000),
      first_contact_at: draft.firstContactAt,
      next_follow_up_at: draft.nextFollowUpAt,
      quote_sent_at: draft.stage === "quote_sent" ? existing?.quote_sent_at || now : existing?.quote_sent_at || null,
      archived_at: draft.stage === "archived" ? existing?.archived_at || now : null,
      assigned_to: existing?.assigned_to || null,
    };
    const { data, error: updateError } = await supabase
      .from("booking_admin_meta")
      .upsert(payload, { onConflict: "booking_id" })
      .select(BOOKING_ADMIN_META_SELECT)
      .single();
    if (updateError || !data) {
      setError("Operations-Daten konnten nicht gespeichert werden. Migration, Admin-Rolle und RLS prüfen.");
      if (updateError?.code === "42P01") setMetaState("unavailable");
    } else {
      const nextMeta = data as unknown as BookingAdminMeta;
      setMetaByBooking((current) => ({ ...current, [booking.id]: nextMeta }));
    }
    setSavingId(null);
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
            Die Website bleibt funktionsfähig. Für das Dashboard müssen beim nächsten Cloudflare-Build die öffentlichen Supabase-URL- und Anon-Key-Variablen gesetzt sein.
          </p>
        </section>
      </main>
    );
  }

  if (checkingAccess) {
    return (
      <main className="grid min-h-[100svh] place-items-center bg-[#07111f] text-white" aria-live="polite">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-bold">
          <Loader2 className="h-5 w-5 animate-spin text-cyan-200" aria-hidden="true" /> Zugriff wird geprüft …
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100svh] bg-[#07111f] text-white">
      <header className="border-b border-white/10 bg-[#07111f]/95 px-5 py-4 backdrop-blur sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300 text-slate-950"><ShieldCheck className="h-5 w-5" aria-hidden="true" /></span>
            <div className="min-w-0"><p className="truncate text-sm font-black tracking-[0.18em]" translate="no">FLOXANT</p><p className="truncate text-xs font-semibold text-slate-400">Lead Operations</p></div>
          </div>
          <button type="button" onClick={logout} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm font-black text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <LogOut className="h-4 w-4" aria-hidden="true" /><span className="hidden sm:inline">Abmelden</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Interne Pipeline</p><h1 className="mt-3 text-3xl font-black tracking-[-0.03em] sm:text-5xl">Kundenanfragen</h1><p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-400 sm:text-base">Vollständigkeit, nächste Aktion und bearbeitbare Antwortentwürfe. Keine automatische Ablehnung, Preisberechnung oder Kontaktaufnahme.</p></div>
          <button type="button" onClick={() => void loadBookings()} disabled={loading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-black text-slate-950 disabled:opacity-60"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />Aktualisieren</button>
        </section>

        {metaState === "unavailable" ? (
          <div className="mt-6 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-5 text-sm font-semibold leading-6 text-amber-50" role="status">
            <p className="font-black">Lead-Operations-Migration noch nicht angewendet</p>
            <p className="mt-2">Bestehende Anfragen bleiben lesbar. Interne Notizen, Pipeline und Follow-ups werden erst nach manueller Prüfung und Anwendung von <code>20260718090000_booking_admin_operations.sql</code> speicherbar.</p>
          </div>
        ) : null}

        <section className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <MetricCard label="Neu" value={counts.totalNew} icon={<CircleDot />} tone="cyan" />
          <MetricCard label="Heute" value={counts.newToday} icon={<Inbox />} tone="cyan" />
          <MetricCard label="Unbeantwortet" value={counts.unanswered} icon={<MessageSquareText />} tone="amber" />
          <MetricCard label="Angaben fehlen" value={counts.missing} icon={<FileQuestion />} tone="amber" />
          <MetricCard label="Follow-ups" value={counts.followUps} icon={<CalendarClock />} tone="violet" />
          <MetricCard label="Überfällig" value={counts.overdue} icon={<AlertTriangle />} tone="rose" />
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
          <div className="grid gap-3 border-b border-white/10 p-4 md:grid-cols-2 xl:grid-cols-[minmax(16rem,1fr)_12rem_12rem_11rem_10rem_13rem_auto]">
            <FilterSearch value={query} onChange={setQuery} />
            <FilterSelect label="Pipeline-Stufe" value={stageFilter} onChange={setStageFilter} options={[{ value: "all", label: "Alle Stufen" }, ...LEAD_STAGES]} />
            <FilterSelect label="Leistung" value={serviceFilter} onChange={setServiceFilter} options={[{ value: "all", label: "Alle Leistungen" }, ...serviceOptions.map((service) => ({ value: service, label: getServiceLabel(service) }))]} />
            <FilterSelect label="Region" value={regionFilter} onChange={setRegionFilter} options={[{ value: "all", label: "Alle Regionen" }, { value: "duesseldorf", label: "Düsseldorf" }, { value: "regensburg", label: "Regensburg" }, { value: "unknown", label: "Unbekannt" }]} />
            <FilterSelect label="Sprache" value={localeFilter} onChange={setLocaleFilter} options={[{ value: "all", label: "Alle Sprachen" }, { value: "de", label: "Deutsch" }, { value: "en", label: "Englisch" }, { value: "unknown", label: "Unbekannt" }]} />
            <FilterSelect label="Vollständigkeit" value={completenessFilter} onChange={setCompletenessFilter} options={[{ value: "all", label: "Alle Angaben" }, { value: "sufficient", label: "Ausreichend" }, { value: "multiple_missing", label: "Angaben fehlen" }, { value: "follow_up_required", label: "Rückfrage" }, { value: "not_assessable", label: "Nicht bewertbar" }]} />
            <div className="flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm font-black text-slate-300">{filteredBookings.length}/{bookings.length}</div>
          </div>

          {error ? <div className="m-4 rounded-xl border border-red-300/25 bg-red-300/10 p-4 text-sm font-semibold text-red-100" role="alert">{error}</div> : null}
          {loading && !bookings.length ? <div className="flex min-h-80 items-center justify-center gap-3 text-sm font-bold text-slate-400" role="status"><Loader2 className="h-5 w-5 animate-spin" />Anfragen werden geladen …</div> : filteredBookings.length === 0 ? <EmptyState /> : (
            <div className="divide-y divide-white/[0.07]">
              {filteredBookings.map((booking) => {
                const summary = getBookingSummary(booking);
                const completeness = completenessByBooking[booking.id];
                const meta = metaByBooking[booking.id] || null;
                const stage = meta?.stage || getDefaultLeadStage(booking);
                const locale = getLeadLocale(booking);
                const region = getLeadRegion(booking);
                return (
                  <article key={booking.id} className="grid gap-4 p-4 transition hover:bg-white/[0.025] sm:p-5 lg:grid-cols-[1.1fr_1.2fr_.75fr_1fr_1fr_auto] lg:items-center">
                    <div className="min-w-0"><p className="truncate font-black">{summary.name}</p><p className="mt-1 truncate text-xs font-semibold text-slate-500">{summary.company || summary.email || "Keine Zusatzangabe"}</p></div>
                    <div className="min-w-0"><p className="truncate text-sm font-bold text-slate-200">{summary.service}</p><p className="mt-1 truncate text-xs font-semibold text-slate-500">{summary.location || "Ort nicht angegeben"}</p></div>
                    <div className="text-xs font-bold text-slate-400"><p>{locale === "en" ? "Englisch" : locale === "de" ? "Deutsch" : "Sprache?"}</p><p className="mt-1">{region === "duesseldorf" ? "Düsseldorf" : region === "regensburg" ? "Regensburg" : "Region?"}</p></div>
                    <div><p className={`text-xs font-black ${completenessTone(completeness.status)}`}>{getLeadCompletenessLabel(completeness.status)}</p><p className="mt-1 text-xs text-slate-600">{completeness.missing.length} offen</p></div>
                    <div><span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-black ${stageTone(stage)}`}>{getLeadStageLabel(stage)}</span><p className="mt-2 text-xs font-semibold text-slate-500">{meta?.next_follow_up_at ? formatBookingDate(meta.next_follow_up_at) : formatBookingDate(dateValue(booking))}</p></div>
                    <button type="button" onClick={() => setSelectedId(booking.id)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-xs font-black text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">Öffnen<ChevronRight className="h-4 w-4" /></button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {selectedBooking ? (
        <LeadDetail
          key={selectedBooking.id}
          booking={selectedBooking}
          meta={metaByBooking[selectedBooking.id] || null}
          completeness={completenessByBooking[selectedBooking.id]}
          operationsEnabled={metaState === "ready"}
          saving={savingId === selectedBooking.id}
          onClose={() => setSelectedId(null)}
          onSave={(draft) => void saveAdminMeta(selectedBooking, draft)}
        />
      ) : null}
    </main>
  );
}

type EditableMetaDraft = {
  stage: LeadStage;
  priority: LeadPriority;
  internalNotes: string;
  firstContactAt: string | null;
  nextFollowUpAt: string | null;
};

function LeadDetail({ booking, meta, completeness, operationsEnabled, saving, onClose, onSave }: { booking: BookingRecord; meta: BookingAdminMeta | null; completeness: LeadCompletenessResult; operationsEnabled: boolean; saving: boolean; onClose: () => void; onSave: (draft: EditableMetaDraft) => void }) {
  const summary = getBookingSummary(booking);
  const locale = getLeadLocale(booking);
  const defaultStage = meta?.stage || getDefaultLeadStage(booking);
  const [stage, setStage] = useState<LeadStage>(defaultStage);
  const [priority, setPriority] = useState<LeadPriority>(meta?.priority || "normal");
  const [internalNotes, setInternalNotes] = useState(meta?.internal_notes || "");
  const [firstContactAt, setFirstContactAt] = useState(toDateTimeLocal(meta?.first_contact_at));
  const [nextFollowUpAt, setNextFollowUpAt] = useState(toDateTimeLocal(meta?.next_follow_up_at));
  const recommendedTemplate = getRecommendedReplyTemplateKey(completeness);
  const [templateKey, setTemplateKey] = useState<ReplyTemplateKey>(recommendedTemplate);
  const initialReply = renderReplyTemplate(booking, completeness, recommendedTemplate);
  const [subject, setSubject] = useState(initialReply.subject);
  const [body, setBody] = useState(initialReply.body);
  const [copyState, setCopyState] = useState("");
  const responseDraft = buildLeadResponseDraft(booking, completeness, templateKey);

  function changeTemplate(key: ReplyTemplateKey) {
    setTemplateKey(key);
    const next = renderReplyTemplate(booking, completeness, key);
    setSubject(next.subject);
    setBody(next.body);
    setCopyState("");
  }

  async function copyText(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState(label);
    } catch {
      setCopyState("Kopieren nicht möglich");
    }
  }

  const mailto = summary.email ? `mailto:${encodeURIComponent(summary.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` : "";

  return (
    <div className="fixed inset-0 z-[10000] flex justify-end bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="lead-detail-title">
      <button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Detailansicht schließen" />
      <section className="relative h-full w-full max-w-4xl overflow-y-auto border-l border-white/10 bg-[#091525] p-5 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0"><p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Anfragedetail</p><h2 id="lead-detail-title" className="mt-3 break-words text-3xl font-black">{summary.name}</h2><p className="mt-2 font-mono text-xs text-slate-600">{booking.id}</p></div>
          <button type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" aria-label="Detailansicht schließen"><X className="h-5 w-5" /></button>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DetailField icon={<Clock3 />} label="Eingang" value={formatBookingDate(dateValue(booking))} />
          <DetailField icon={<Inbox />} label="Leistung" value={summary.service} />
          <DetailField icon={<MapPin />} label="Ort / Route" value={summary.location || "Nicht angegeben"} />
          <DetailField icon={<Languages />} label="Sprache" value={locale === "en" ? "Englisch" : locale === "de" ? "Deutsch" : "Unbekannt"} />
        </div>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h3 className="flex items-center gap-2 text-sm font-black"><UserRound className="h-4 w-4 text-cyan-200" />Kontakt</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {summary.email ? <a href={`mailto:${summary.email}`} className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 px-4 text-sm font-bold text-cyan-100"><Mail className="h-4 w-4" /><span className="truncate">{summary.email}</span></a> : <p className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-500">E-Mail fehlt</p>}
            {summary.phone ? <a href={phoneHref(summary.phone)} className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 px-4 text-sm font-bold text-cyan-100"><Phone className="h-4 w-4" /><span className="truncate">{summary.phone}</span></a> : <p className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-500">Telefon fehlt</p>}
          </div>
          <p className="mt-4 whitespace-pre-wrap text-sm font-semibold leading-7 text-slate-300">{summary.message || "Keine Nachricht gespeichert."}</p>
        </section>

        <section className="mt-6 rounded-2xl border border-amber-200/15 bg-amber-200/[0.05] p-5">
          <h3 className={`text-sm font-black ${completenessTone(completeness.status)}`}>{getLeadCompletenessLabel(completeness.status)}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{completeness.explanation}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2"><ListBlock title="Vorhanden" items={completeness.present} positive /><ListBlock title="Offen" items={completeness.missing} /></div>
          <p className="mt-4 rounded-xl bg-black/15 p-3 text-sm font-bold text-amber-50">Nächster Schritt: {getNextRecommendedAction(meta, completeness.missing.length)}</p>
        </section>

        <section className="mt-6 rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.05] p-5">
          <h3 className="text-sm font-black text-cyan-50">Interne Operations-Daten</h3>
          {!operationsEnabled ? <p className="mt-3 rounded-xl border border-amber-200/20 bg-amber-200/10 p-3 text-sm font-semibold text-amber-50">Nur lesbar, bis die vorbereitete Migration manuell angewendet und geprüft wurde.</p> : null}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <LabeledSelect label="Pipeline-Stufe" value={stage} onChange={(value) => setStage(value as LeadStage)} options={LEAD_STAGES} disabled={!operationsEnabled} />
            <LabeledSelect label="Priorität" value={priority} onChange={(value) => setPriority(value as LeadPriority)} options={LEAD_PRIORITIES} disabled={!operationsEnabled} />
            <label className="grid gap-2 text-sm font-bold text-slate-200">Erstkontakt<input type="datetime-local" value={firstContactAt} onChange={(event) => setFirstContactAt(event.target.value)} disabled={!operationsEnabled} className="min-h-11 rounded-xl border border-white/10 bg-[#0b1727] px-3 disabled:opacity-50" /></label>
            <label className="grid gap-2 text-sm font-bold text-slate-200">Nächstes Follow-up<input type="datetime-local" value={nextFollowUpAt} onChange={(event) => setNextFollowUpAt(event.target.value)} disabled={!operationsEnabled} className="min-h-11 rounded-xl border border-white/10 bg-[#0b1727] px-3 disabled:opacity-50" /></label>
          </div>
          <label className="mt-4 grid gap-2 text-sm font-bold text-slate-200">Interne Notiz<textarea value={internalNotes} onChange={(event) => setInternalNotes(event.target.value)} maxLength={10000} rows={5} disabled={!operationsEnabled} className="rounded-xl border border-white/10 bg-[#0b1727] px-4 py-3 leading-6 disabled:opacity-50" /><span className="text-right text-xs text-slate-600">{internalNotes.length}/10000</span></label>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" disabled={!operationsEnabled} onClick={() => setFirstContactAt(toDateTimeLocal(new Date().toISOString()))} className="min-h-11 rounded-xl border border-white/10 px-4 text-xs font-black disabled:opacity-40">Erstkontakt jetzt setzen</button>
            <button type="button" disabled={!operationsEnabled || saving} onClick={() => onSave({ stage, priority, internalNotes, firstContactAt: fromDateTimeLocal(firstContactAt), nextFollowUpAt: fromDateTimeLocal(nextFollowUpAt) })} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan-300 px-5 text-xs font-black text-slate-950 disabled:opacity-40">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}Operations-Daten speichern</button>
          </div>
          {meta?.status_history?.length ? <div className="mt-5"><p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">Statusverlauf</p><ol className="mt-3 grid gap-2">{[...meta.status_history].reverse().map((item, index) => <li key={`${item.changedAt}-${index}`} className="flex justify-between gap-3 rounded-xl border border-white/[0.07] px-3 py-2 text-xs"><span className="font-bold text-slate-300">{getLeadStageLabel(item.stage)}</span><span className="text-slate-600">{formatBookingDate(item.changedAt || "")}</span></li>)}</ol></div> : null}
        </section>

        <section className="mt-6 rounded-2xl border border-violet-200/15 bg-violet-200/[0.05] p-5">
          <h3 className="text-sm font-black text-violet-50">Deterministischer Antwortassistent</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">Entwurf vor Versand bearbeiten und manuell prüfen. Es wird nichts automatisch gespeichert oder gesendet.</p>
          <label className="mt-4 grid gap-2 text-sm font-bold text-slate-200">Vorlage<select value={templateKey} onChange={(event) => changeTemplate(event.target.value as ReplyTemplateKey)} className="min-h-11 rounded-xl border border-white/10 bg-[#0b1727] px-3">{getReplyTemplates(locale).map((template) => <option key={template.id} value={template.key}>{template.label}</option>)}</select></label>
          <label className="mt-4 grid gap-2 text-sm font-bold text-slate-200">Betreff<input value={subject} onChange={(event) => setSubject(event.target.value)} maxLength={180} className="min-h-11 rounded-xl border border-white/10 bg-[#0b1727] px-4" /></label>
          <label className="mt-4 grid gap-2 text-sm font-bold text-slate-200">Bearbeitbarer Antwortentwurf<textarea value={body} onChange={(event) => setBody(event.target.value)} rows={12} maxLength={10000} className="rounded-xl border border-white/10 bg-[#0b1727] px-4 py-3 leading-7" /></label>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => void copyText(`${subject}\n\n${body}`, "Antwort kopiert")} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-violet-200 px-4 text-xs font-black text-slate-950"><Clipboard className="h-4 w-4" />Antwort kopieren</button>
            <button type="button" onClick={() => void copyText([responseDraft.summary, ...responseDraft.missingDetails.map((item) => `Offen: ${item}`)].join("\n"), "Zusammenfassung kopiert")} className="min-h-11 rounded-xl border border-white/10 px-4 text-xs font-black">Zusammenfassung kopieren</button>
            {mailto ? <a href={mailto} className="inline-flex min-h-11 items-center rounded-xl border border-white/10 px-4 text-xs font-black">Nach manueller Prüfung in E-Mail öffnen</a> : null}
          </div>
          {copyState ? <p className="mt-3 text-xs font-bold text-violet-100" role="status">{copyState}</p> : null}
        </section>

        <p className="mt-6 text-xs font-semibold text-slate-600">Bestehender Bookings-Status: {getStatusLabel(booking.status)} · Priorität: {getLeadPriorityLabel(priority)} · Keine Löschfunktion.</p>
      </section>
    </div>
  );
}

function MetricCard({ label, value, icon, tone }: { label: string; value: number; icon: React.ReactNode; tone: "cyan" | "amber" | "violet" | "rose" }) {
  const classes = { cyan: "border-cyan-200/15 bg-cyan-200/[0.07] text-cyan-100", amber: "border-amber-200/15 bg-amber-200/[0.07] text-amber-100", violet: "border-violet-200/15 bg-violet-200/[0.07] text-violet-100", rose: "border-rose-200/15 bg-rose-200/[0.07] text-rose-100" };
  return <article className={`rounded-2xl border p-4 ${classes[tone]}`}><div className="flex items-center justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[0.12em] opacity-70">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div><span className="grid h-10 w-10 place-items-center rounded-xl border border-current/10 bg-black/10 [&>svg]:h-5 [&>svg]:w-5">{icon}</span></div></article>;
}

function FilterSearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <label className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4"><Search className="h-4 w-4 text-slate-500" /><span className="sr-only">Anfragen durchsuchen</span><input type="search" value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 flex-1 bg-transparent py-2 text-sm font-semibold outline-none" placeholder="Name, Ort, Leistung …" /></label>;
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: readonly { value: string; label: string }[] }) {
  return <label><span className="sr-only">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-11 w-full rounded-xl border border-white/10 bg-[#0b1727] px-3 text-xs font-bold outline-none">{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
}

function LabeledSelect({ label, value, onChange, options, disabled }: { label: string; value: string; onChange: (value: string) => void; options: readonly { value: string; label: string }[]; disabled?: boolean }) {
  return <label className="grid gap-2 text-sm font-bold text-slate-200">{label}<select value={value} onChange={(event) => onChange(event.target.value)} disabled={disabled} className="min-h-11 rounded-xl border border-white/10 bg-[#0b1727] px-3 disabled:opacity-50">{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
}

function DetailField({ icon, label, value }: { icon: React.ReactElement; label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-slate-600"><span className="text-cyan-200 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>{label}</div><p className="mt-3 break-words text-sm font-bold leading-6 text-slate-200">{value}</p></div>;
}

function ListBlock({ title, items, positive = false }: { title: string; items: string[]; positive?: boolean }) {
  return <div><p className={`text-xs font-black uppercase tracking-[0.12em] ${positive ? "text-emerald-200" : "text-amber-200"}`}>{title}</p>{items.length ? <ul className="mt-2 grid gap-1 text-sm text-slate-300">{items.map((item) => <li key={item}>• {item}</li>)}</ul> : <p className="mt-2 text-sm text-slate-500">Keine Punkte.</p>}</div>;
}

function EmptyState() {
  return <div className="grid min-h-80 place-items-center p-8 text-center"><div><Inbox className="mx-auto h-10 w-10 text-slate-600" /><h2 className="mt-4 text-xl font-black">Keine passenden Anfragen</h2><p className="mt-2 text-sm font-semibold text-slate-500">Suche oder Filter anpassen.</p></div></div>;
}
