"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import {
  dashboardSupabaseConfig,
  getDashboardSupabaseClient,
} from "@/lib/admin-dashboard/supabase-browser";

function isAdmin(appMetadata: Record<string, unknown> | undefined): boolean {
  return appMetadata?.role === "admin";
}

export function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = getDashboardSupabaseClient();
    if (!supabase) {
      setCheckingSession(false);
      return;
    }
    const supabaseClient = supabase;

    let active = true;

    async function checkSession() {
      const { data } = await supabaseClient.auth.getSession();
      if (!active) return;

      const session = data.session;
      if (session && isAdmin(session.user.app_metadata)) {
        router.replace("/dashboard");
        return;
      }

      if (session) {
        await supabaseClient.auth.signOut();
        if (active) setError("Dieses Konto ist nicht für das FLOXANT-Dashboard freigeschaltet.");
      } else if (new URLSearchParams(window.location.search).get("reason") === "forbidden") {
        setError("Dieses Konto ist nicht für das FLOXANT-Dashboard freigeschaltet.");
      }

      if (active) setCheckingSession(false);
    }

    void checkSession();
    return () => {
      active = false;
    };
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getDashboardSupabaseClient();
    if (!supabase) return;

    setSubmitting(true);
    setError("");

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setPassword("");

    if (signInError || !data.session) {
      setError("E-Mail-Adresse oder Passwort ist nicht korrekt.");
      setSubmitting(false);
      return;
    }

    if (!isAdmin(data.session.user.app_metadata)) {
      await supabase.auth.signOut();
      setError("Dieses Konto ist nicht für das FLOXANT-Dashboard freigeschaltet.");
      setSubmitting(false);
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#07111f] px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="max-w-xl">
          <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 shadow-2xl backdrop-blur">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-300 text-slate-950">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-black tracking-[0.2em]" translate="no">
                FLOXANT
              </span>
              <span className="block text-xs font-semibold text-slate-400">Interner Anfragebereich</span>
            </span>
          </div>

          <p className="mt-10 text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
            Geschützter Zugang
          </p>
          <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            Anfragen sicher im Blick behalten.
          </h1>
          <p className="mt-6 max-w-lg text-base font-semibold leading-8 text-slate-300 sm:text-lg">
            Anmeldung ausschließlich für freigeschaltete Betreiberkonten. Kundendaten werden erst nach erfolgreicher
            Prüfung der Admin-Rolle geladen.
          </p>

          <div className="mt-8 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-300">
            <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
            <p>Keine Registrierung, kein Gastzugang und keine Speicherung des eingegebenen Passworts.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-200/10 text-cyan-100">
              <KeyRound className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl font-black tracking-tight">Anmelden</h2>
              <p className="mt-1 text-sm font-semibold text-slate-400">Mit Supabase Auth</p>
            </div>
          </div>

          {!dashboardSupabaseConfig.isConfigured ? (
            <div className="mt-7 rounded-xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm font-semibold leading-6 text-amber-100" role="alert">
              Das Dashboard ist noch nicht konfiguriert. Für den Build müssen die öffentlichen Variablen
              <code className="mx-1 rounded bg-black/20 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_URL</code>
              und
              <code className="ml-1 rounded bg-black/20 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
              gesetzt werden.
            </div>
          ) : null}

          {checkingSession ? (
            <div className="mt-8 flex min-h-56 items-center justify-center gap-3 text-sm font-semibold text-slate-300" role="status">
              <Loader2 className="h-5 w-5 animate-spin text-cyan-200" aria-hidden="true" />
              Sitzung wird geprüft …
            </div>
          ) : (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit} data-track-submit="success_only">
              <label className="block">
                <span className="text-sm font-bold text-slate-200">E-Mail-Adresse</span>
                <span className="mt-2 flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 transition focus-within:border-cyan-200/50 focus-within:ring-2 focus-within:ring-cyan-300/10">
                  <Mail className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="username"
                    required
                    disabled={!dashboardSupabaseConfig.isConfigured || submitting}
                    className="min-w-0 flex-1 bg-transparent py-3 text-base font-semibold text-white outline-none placeholder:text-slate-600"
                    placeholder="E-Mail-Adresse"
                  />
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-200">Passwort</span>
                <span className="mt-2 flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 transition focus-within:border-cyan-200/50 focus-within:ring-2 focus-within:ring-cyan-300/10">
                  <LockKeyhole className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                    disabled={!dashboardSupabaseConfig.isConfigured || submitting}
                    className="min-w-0 flex-1 bg-transparent py-3 text-base font-semibold text-white outline-none placeholder:text-slate-600"
                    placeholder="Passwort"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    aria-label={showPassword ? "Passwort ausblenden" : "Passwort anzeigen"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </span>
              </label>

              {error ? (
                <div className="rounded-xl border border-red-300/25 bg-red-300/10 p-4 text-sm font-semibold leading-6 text-red-100" role="alert" aria-live="polite">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={!dashboardSupabaseConfig.isConfigured || submitting}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-black text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                {submitting ? "Anmeldung wird geprüft …" : "Sicher anmelden"}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
