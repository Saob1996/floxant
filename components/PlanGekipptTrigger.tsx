"use client";

import { AnimatePresence, m } from "framer-motion";
import { AlertTriangle, ArrowRight, MessageCircle, ShieldAlert, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { company } from "@/lib/company";

type PlanContext =
  | "standard"
  | "umzug"
  | "reinigung"
  | "entruempelung"
  | "transport"
  | "objektfall"
  | "duesseldorf_reinigung"
  | "duesseldorf_entsorgung"
  | "duesseldorf_apartment_cleaning";

type TriggerCopy = {
  context: PlanContext;
  eyebrow: string;
  title: string;
  teaser: string;
  buttonLabel: string;
  whatsappMessage: string;
};

const HIDE_PREFIXES = [
  "/admin",
  "/dashboard",
  "/login",
  "/api",
  "/impressum",
  "/datenschutz",
  "/agb",
  "/widerruf",
  "/buchungsbedingungen",
  "/schadensbegrenzung",
  "/private-client-service",
  "/villenservice",
];

const HIDE_EXACT = new Set([
  "/duesseldorf/reinigung/agb",
  "/duesseldorf/reinigung/datenschutz",
  "/duesseldorf/reinigung/impressum",
]);

const PLAN_PROMPT_DELAY_MS = 120000;
const PLAN_PROMPT_SEEN_KEY = "floxant_plan_gekippt_seen_v1";
const PLAN_PROMPT_DISMISSED_KEY = "floxant_plan_gekippt_dismissed";

const CONTEXT_COPY: Record<PlanContext, TriggerCopy> = {
  standard: {
    context: "standard",
    eyebrow: "Plan-B Trigger",
    title: "Plan gekippt?",
    teaser: "Ort, Termin, Fotos und offene Punkte senden. FLOXANT prüft nach Verfügbarkeit, was noch machbar ist.",
    buttonLabel: "Kurzfristig prüfen",
    whatsappMessage:
      "Hallo FLOXANT, mein Plan ist kurzfristig gekippt. Es geht um [Service] in [Ort]. Deadline: [Datum]. Fotos und offene Punkte kann ich senden. Bitte prüfen, ob etwas machbar ist.",
  },
  umzug: {
    context: "umzug",
    eyebrow: "Umzug wackelt",
    title: "Umzug läuft nicht wie geplant?",
    teaser: "Senden Sie Ort, Strecke, Deadline, Fotos und offene Punkte. FLOXANT prüft nach Verfügbarkeit.",
    buttonLabel: "Umzug prüfen",
    whatsappMessage:
      "Hallo FLOXANT, mein Umzug läuft nicht wie geplant. Ort/Strecke: [Ort], Deadline: [Datum]. Fotos und Umfang kann ich senden. Bitte prüfen, ob etwas machbar ist.",
  },
  reinigung: {
    context: "reinigung",
    eyebrow: "Übergabe offen",
    title: "Übergabe bald und Reinigung offen?",
    teaser: "Termin, Objektart und Fotos helfen bei der kurzfristigen Machbarkeitsprüfung.",
    buttonLabel: "Reinigung prüfen",
    whatsappMessage:
      "Hallo FLOXANT, ich brauche kurzfristig Reinigung vor Übergabe. Ort: [Ort], Termin: [Datum]. Fotos kann ich senden.",
  },
  entruempelung: {
    context: "entruempelung",
    eyebrow: "Fläche noch voll",
    title: "Wohnung oder Keller noch voll?",
    teaser: "Fotos, Zugang, Umfang und Deadline senden. FLOXANT prüft Räumung, Entsorgung oder Reinigung.",
    buttonLabel: "Räumung prüfen",
    whatsappMessage:
      "Hallo FLOXANT, Wohnung/Keller ist noch nicht leer. Ort: [Ort], Deadline: [Datum]. Fotos kann ich senden. Bitte prüfen, ob Räumung/Entsorgung möglich ist.",
  },
  transport: {
    context: "transport",
    eyebrow: "Strecke wackelt",
    title: "Transportproblem?",
    teaser: "Start, Ziel, Deadline, Umfang und Fotos senden. FLOXANT prüft Transport, Rückfahrt oder Reststrecke.",
    buttonLabel: "Strecke prüfen",
    whatsappMessage:
      "Hallo FLOXANT, ich habe kurzfristig ein Transportproblem. Start/Ziel: [Ort], Deadline: [Datum]. Umfang und Fotos kann ich senden.",
  },
  objektfall: {
    context: "objektfall",
    eyebrow: "Objektfall dringend",
    title: "Objektfall dringend?",
    teaser: "Räumung, Reinigung oder Übergabevorbereitung nach Verfügbarkeit prüfen lassen.",
    buttonLabel: "Objektfall prüfen",
    whatsappMessage:
      "Hallo FLOXANT, ein Objektfall ist kurzfristig dringend. Es geht um Räumung/Reinigung/Übergabevorbereitung in [Ort]. Termin und Fotos kann ich senden.",
  },
  duesseldorf_reinigung: {
    context: "duesseldorf_reinigung",
    eyebrow: "Düsseldorf Reinigung",
    title: "Reinigung in Düsseldorf kurzfristig?",
    teaser: "Termin, Objektart und Fotos senden. FLOXANT prüft Reinigung nach Verfügbarkeit.",
    buttonLabel: "Reinigung prüfen",
    whatsappMessage:
      "Hallo FLOXANT, ich brauche kurzfristig Reinigung in Düsseldorf. Ort, Termin und Fotos kann ich senden. Bitte prüfen, ob etwas machbar ist.",
  },
  duesseldorf_entsorgung: {
    context: "duesseldorf_entsorgung",
    eyebrow: "Düsseldorf Entsorgung",
    title: "Entsorgung in Düsseldorf kurzfristig?",
    teaser: "Umfang, Fotos, Zugang und Termin senden. FLOXANT prüft Entsorgung nach Verfügbarkeit.",
    buttonLabel: "Entsorgung prüfen",
    whatsappMessage:
      "Hallo FLOXANT, ich brauche kurzfristig Entsorgung in Düsseldorf. Umfang, Zugang, Termin und Fotos kann ich senden. Bitte prüfen, ob etwas machbar ist.",
  },
  duesseldorf_apartment_cleaning: {
    context: "duesseldorf_apartment_cleaning",
    eyebrow: "Apartment-Reset",
    title: "Gästewechsel oder Reinigung kurzfristig?",
    teaser: "Check-in, Check-out, Objektart und Fotos senden. FLOXANT prüft Reinigung in Düsseldorf nach Verfügbarkeit.",
    buttonLabel: "Apartment prüfen",
    whatsappMessage:
      "Hallo FLOXANT, ich brauche kurzfristig Reinigung für eine möblierte Wohnung / ein Apartment in Düsseldorf. Termin, Fotos und Objektangaben kann ich senden.",
  },
};

function shouldHide(pathname: string) {
  if (!pathname) return true;
  if (HIDE_EXACT.has(pathname)) return true;
  return HIDE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function inferContext(pathname: string, serviceParam: string | null): PlanContext {
  const source = `${pathname} ${serviceParam || ""}`.toLowerCase();

  if (pathname === "/entsorgung-duesseldorf") return "duesseldorf_entsorgung";
  if (pathname === "/reinigung-moeblierte-wohnung-duesseldorf") return "duesseldorf_apartment_cleaning";
  if (pathname.startsWith("/duesseldorf") && source.includes("reinigung")) return "duesseldorf_reinigung";
  if (source.includes("duesseldorf") && source.includes("entsorgung")) return "duesseldorf_entsorgung";
  if (source.includes("duesseldorf") && source.includes("reinigung")) return "duesseldorf_reinigung";
  if (source.includes("mieterwechsel") || source.includes("wohnung-wieder") || source.includes("immobilie-verkaufsbereit") || source.includes("makler-vermieter") || source.includes("uebergabeakte")) return "objektfall";
  if (source.includes("rueckfahrt") || source.includes("leerfahrt") || source.includes("transport") || source.includes("kleintransport")) return "transport";
  if (source.includes("keller-muellraum") || source.includes("entruempel") || source.includes("entsorgung")) return "entruempelung";
  if (source.includes("reinigung")) return "reinigung";
  if (source.includes("umzug")) return "umzug";

  return "standard";
}

function buildTargetHref(context: PlanContext, sourcePage: string) {
  const params = new URLSearchParams({
    source: "plan_gekippt_button",
    context,
    source_page: sourcePage || "/",
  });

  return `/schadensbegrenzung?${params.toString()}#schadensbegrenzung-form`;
}

function buildWhatsAppHref(message: string) {
  const phone = company.phoneRaw.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function PlanGekipptTrigger() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [delayComplete, setDelayComplete] = useState(false);
  const [selectedContext, setSelectedContext] = useState<PlanContext>("standard");

  const routeContext = useMemo(() => inferContext(pathname || "/", searchParams.get("service")), [pathname, searchParams]);

  useEffect(() => {
    setSelectedContext(routeContext);
    setPanelOpen(false);
  }, [routeContext, pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const wasDismissed = sessionStorage.getItem(PLAN_PROMPT_DISMISSED_KEY) === "1";
    const wasSeen = localStorage.getItem(PLAN_PROMPT_SEEN_KEY) === "1";
    setDismissed(wasDismissed || wasSeen);
  }, []);

  useEffect(() => {
    if (shouldHide(pathname || "") || dismissed) {
      setDelayComplete(false);
      setVisible(false);
      return;
    }

    if (typeof window !== "undefined" && localStorage.getItem(PLAN_PROMPT_SEEN_KEY) === "1") {
      setDismissed(true);
      setDelayComplete(false);
      setVisible(false);
      return;
    }

    setDelayComplete(false);
    const timer = window.setTimeout(() => {
      localStorage.setItem(PLAN_PROMPT_SEEN_KEY, "1");
      setDelayComplete(true);
    }, PLAN_PROMPT_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [pathname, dismissed]);

  useEffect(() => {
    if (shouldHide(pathname || "") || dismissed || !delayComplete) {
      setVisible(false);
      return;
    }

    const handleScroll = () => setVisible(window.scrollY > 260);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, dismissed, delayComplete]);

  if (shouldHide(pathname || "") || dismissed || !visible) return null;

  const primaryCopy = CONTEXT_COPY[routeContext];
  const activeCopy = CONTEXT_COPY[selectedContext];
  const targetHref = buildTargetHref(selectedContext, pathname || "/");
  const whatsappHref = buildWhatsAppHref(activeCopy.whatsappMessage);
  const choices = Array.from(
    new Set<PlanContext>([
      routeContext,
      routeContext.startsWith("duesseldorf") ? "duesseldorf_reinigung" : "reinigung",
      routeContext.startsWith("duesseldorf") ? "duesseldorf_entsorgung" : "entruempelung",
    ]),
  ).slice(0, 3);

  function dismiss() {
    setDismissed(true);
    setPanelOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(PLAN_PROMPT_DISMISSED_KEY, "1");
      localStorage.setItem(PLAN_PROMPT_SEEN_KEY, "1");
    }
  }

  return (
    <div className="fixed bottom-36 right-4 z-[88] hidden sm:block sm:right-5 md:bottom-32 md:right-8" data-event="view_plan_gekippt_button">
      <AnimatePresence>
        {panelOpen ? (
          <m.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[min(calc(100vw-2rem),25rem)] overflow-hidden rounded-[1rem] border border-cyan-200/25 bg-slate-950 text-white shadow-[0_28px_80px_rgba(2,6,23,0.34)]"
            data-event="open_plan_gekippt_panel"
          >
            <div className="border-b border-cyan-200/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98)_0%,rgba(15,118,110,0.82)_100%)] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-[0.55rem] border border-cyan-200/20 bg-white/8 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    {activeCopy.eyebrow}
                  </div>
                  <h2 className="mt-3 text-lg font-black tracking-tight text-white">{activeCopy.title}</h2>
                  <p className="mt-1.5 text-xs leading-5 text-slate-200">{activeCopy.teaser}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPanelOpen(false)}
                  aria-label="Plan-B Panel schließen"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-[0.7rem] border border-white/10 bg-white/8 text-slate-200 transition hover:bg-white/12"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="grid gap-2">
                {choices.map((context) => (
                  <button
                    key={context}
                    type="button"
                    onClick={() => setSelectedContext(context)}
                    data-event="select_plan_gekippt_problem"
                    data-context={context}
                    className={`rounded-xl border px-3 py-2.5 text-left text-xs font-black transition ${
                      selectedContext === context
                        ? "border-cyan-200/50 bg-cyan-400/12 text-cyan-50"
                        : "border-white/10 bg-white/6 text-slate-200 hover:border-cyan-200/30"
                    }`}
                  >
                    {CONTEXT_COPY[context].title}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.72rem] bg-emerald-500 px-4 text-xs font-black text-white transition hover:bg-emerald-400"
                  data-event="click_plan_gekippt_whatsapp"
                  data-context={selectedContext}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp senden
                </a>
                <a
                  href={targetHref}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.72rem] border border-cyan-200/20 bg-white px-4 text-xs font-black text-slate-950 transition hover:bg-cyan-50"
                  data-event="start_plan_gekippt_form"
                  data-context={selectedContext}
                >
                  <ArrowRight className="h-4 w-4" />
                  {activeCopy.buttonLabel}
                </a>
              </div>

              <div className="mt-3 flex items-start gap-2 rounded-[0.72rem] border border-white/10 bg-white/6 px-3 py-2.5 text-[11px] leading-5 text-slate-300">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-200" />
                Keine Sofortzusage ohne Prüfung. Machbarkeit hängt von Ort, Termin, Umfang und Kapazität ab.
              </div>

              <button
                type="button"
                onClick={dismiss}
                className="mt-3 text-[11px] font-bold text-slate-400 transition hover:text-white"
              >
                Für diese Sitzung ausblenden
              </button>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setPanelOpen((value) => !value)}
        className="group flex max-w-[18rem] items-center gap-3 rounded-[0.9rem] border border-cyan-200/30 bg-[linear-gradient(135deg,#07111f_0%,#102033_56%,#0f766e_100%)] px-3.5 py-3 text-left text-white shadow-[0_20px_60px_rgba(2,6,23,0.24)] transition hover:-translate-y-0.5 hover:border-cyan-200/60"
        data-event="click_plan_gekippt_button"
        data-context={routeContext}
        aria-expanded={panelOpen}
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[0.72rem] bg-white text-emerald-700 transition group-hover:bg-cyan-50">
          <ShieldAlert className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-black leading-tight text-white">{primaryCopy.title}</span>
          <span className="mt-0.5 hidden text-[11px] font-semibold leading-snug text-cyan-100 sm:block">
            Ort, Termin, Fotos senden
          </span>
        </span>
      </button>
    </div>
  );
}

export default PlanGekipptTrigger;
