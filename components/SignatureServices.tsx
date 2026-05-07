"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Banknote,
  BriefcaseBusiness,
  Camera,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Key,
  MapPin,
  PackageOpen,
  RotateCw,
  Shield,
  Sparkles,
  Trash2,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { germanText } from "@/lib/german-text";

export type SignatureServiceId =
  | "key_handover"
  | "parking_zone"
  | "empty_return"
  | "move_cleaning"
  | "clear_cleaning"
  | "handover_ready"
  | "photo_check"
  | "budget_check"
  | "platform_order_check"
  | "property_ready_service"
  | "estate_clearance"
  | "discreet_move"
  | "short_notice"
  | "plan_b_service"
  | "premium_discreet"
  | "duesseldorf_b2b_cleaning"
  | "duesseldorf_disposal";

type ServiceContent = {
  title?: string;
  desc?: string;
};

type SignatureServiceCatalogItem = {
  title: string;
  desc: string;
  href: string;
  label: string;
  eyebrow: string;
  icon: LucideIcon;
  accent: string;
};

interface SignatureServicesProps {
  dict?: any;
  locale?: string;
  serviceIds?: readonly SignatureServiceId[];
  badge?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  source?: string;
  className?: string;
}

export const signatureServiceCatalog: Record<SignatureServiceId, SignatureServiceCatalogItem> = {
  key_handover: {
    title: "Schlüsselübergabe mit Übergabeprotokoll",
    desc: "Für Auszug, Reinigung oder Umzug, wenn Schlüssel, Zustand, Fotos und Übergabetermin nicht nebenbei laufen sollen.",
    href: "/schluesseluebergabe",
    label: "Übergabe planen",
    eyebrow: "Übergabe",
    icon: Key,
    accent: "from-blue-600 via-cyan-500 to-slate-500",
  },
  parking_zone: {
    title: "Halteverbotszone nach Absprache",
    desc: "Für enge Straßen, lange Laufwege oder sensible Ladezonen, bevor der Umzug am Zugang scheitert.",
    href: "/halteverbotszone-regensburg",
    label: "Halteverbot prüfen",
    eyebrow: "Zugang",
    icon: MapPin,
    accent: "from-slate-800 via-blue-700 to-cyan-500",
  },
  empty_return: {
    title: "Leerfahrt / Rückfahrt nach Verfügbarkeit",
    desc: "Für flexible Strecken, Teilmengen und Möbel, wenn Route, Datum und freie Kapazität sinnvoll zusammenpassen.",
    href: "/leerfahrt-rueckfahrt",
    label: "Strecke anfragen",
    eyebrow: "Rückfahrt",
    icon: RotateCw,
    accent: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  move_cleaning: {
    title: "Umzug + Endreinigung aus einer Hand",
    desc: "Wenn Transport, Reinigung und Rückgabe dicht zusammenliegen und nicht über mehrere Anbieter koordiniert werden sollen.",
    href: "/umzug-mit-reinigung",
    label: "Kombi ansehen",
    eyebrow: "Kombi-Service",
    icon: Sparkles,
    accent: "from-cyan-500 via-emerald-400 to-teal-400",
  },
  clear_cleaning: {
    title: "Entrümpelung + Reinigung kombiniert",
    desc: "Für Räume, Keller, Wohnungen oder kleinere Räumungen, die nach dem Leeren nicht unfertig zurückbleiben sollen.",
    href: "/entruempelung-regensburg",
    label: "Räumung planen",
    eyebrow: "Räumung",
    icon: PackageOpen,
    accent: "from-orange-500 via-amber-500 to-yellow-300",
  },
  handover_ready: {
    title: "Wohnungsübergabe vorbereiten",
    desc: "Für Kunden mit Übergabetermin, bei denen Sauberkeit, Restmengen, Fotos und Schlüssel sauber zusammenlaufen müssen.",
    href: "/blog/wohnungsuebergabe-regensburg-vorbereiten",
    label: "Übergabe vorbereiten",
    eyebrow: "Abnahme",
    icon: ClipboardCheck,
    accent: "from-blue-500 via-indigo-500 to-slate-600",
  },
  photo_check: {
    title: "Foto-basierte Schnellprüfung",
    desc: "Fotos von Zugang, Zustand, Menge oder Fläche verkürzen Rückfragen und machen die Einschätzung belastbarer.",
    href: "/buchung",
    label: "Fotos mitsenden",
    eyebrow: "Schnellprüfung",
    icon: Camera,
    accent: "from-sky-500 via-blue-500 to-cyan-400",
  },
  budget_check: {
    title: "Budget- und Preisrahmen-Prüfung",
    desc: "Wenn ein Zielbudget existiert, prüft FLOXANT ehrlich, welcher Umfang realistisch ist und wo Grenzen liegen.",
    href: "/anfrage-mit-preisrahmen",
    label: "Budget nennen",
    eyebrow: "Preisrahmen",
    icon: Banknote,
    accent: "from-emerald-600 via-teal-500 to-blue-500",
  },
  platform_order_check: {
    title: "Plattform-Auftrag neutral pruefen",
    desc: "Fuer Kunden mit Angebot, Screenshot oder Plattform-Anfrage, wenn Umfang, Preis, Termin oder Zusatzleistungen vor Zusage unklar sind.",
    href: "/plattform-auftrag-pruefen",
    label: "Plattformfall pruefen",
    eyebrow: "Zweite Einschaetzung",
    icon: FileSearch,
    accent: "from-blue-700 via-cyan-500 to-slate-500",
  },
  property_ready_service: {
    title: "Immobilie verkaufsbereit machen",
    desc: "Fuer Eigentuemer, Makler und Erbengemeinschaften, wenn Raeumung, Reinigung, Entsorgung oder Fotos vor Verkauf oder Besichtigung offen sind.",
    href: "/immobilie-verkaufsbereit-machen",
    label: "Objekt vorbereiten",
    eyebrow: "Property-Ready",
    icon: FileSearch,
    accent: "from-stone-950 via-amber-700 to-stone-400",
  },
  estate_clearance: {
    title: "Nachlass-Raeumung diskret",
    desc: "Fuer Angehoerige, Erben und Eigentuemer, wenn Wohnung, Haus, Keller oder Garage nach Erbfall ruhig geraeumt, entsorgt oder gereinigt werden sollen.",
    href: "/nachlass-raeumung-regensburg",
    label: "Nachlass-Fall senden",
    eyebrow: "Diskret",
    icon: Shield,
    accent: "from-stone-950 via-stone-700 to-amber-500",
  },
  discreet_move: {
    title: "Diskreter Auszug bei Trennung",
    desc: "Fuer sensible private Auszugssituationen mit Rueckruf, sicherer Kontaktmethode, Transport, Reinigung und Uebergabe nach Absprache.",
    href: "/diskreter-umzug-trennung-scheidung",
    label: "Diskret anfragen",
    eyebrow: "Diskret",
    icon: Shield,
    accent: "from-stone-950 via-stone-700 to-cyan-500",
  },
  short_notice: {
    title: "Kurzfristige Anfrage nach Verfügbarkeit",
    desc: "Für enge Zeitfenster, bei denen zuerst Machbarkeit, Zugang, Umfang und Termin realistisch geklärt werden müssen.",
    href: "/express-anfrage",
    label: "Express prüfen",
    eyebrow: "Zeitdruck",
    icon: CalendarClock,
    accent: "from-amber-500 via-orange-500 to-red-400",
  },
  plan_b_service: {
    title: "Plan-B-Service fuer unsichere Ablaeufe",
    desc: "Wenn Anbieter, Helfer, Reinigung, Entsorgung oder Uebergabe wackeln, prueft FLOXANT nach Verfuegbarkeit einen Ersatz- oder Ergaenzungsplan.",
    href: "/plan-b-service",
    label: "Plan B pruefen",
    eyebrow: "Backup",
    icon: Shield,
    accent: "from-slate-950 via-cyan-700 to-amber-500",
  },
  premium_discreet: {
    title: "Premium- und Diskret-Service",
    desc: "Für hochwertige Haushalte, sensible Übergänge und Kunden, die Koordination, Schutz und Rückrufwunsch ruhiger führen wollen.",
    href: "/private-client-service",
    label: "Premium anfragen",
    eyebrow: "Diskret",
    icon: Shield,
    accent: "from-slate-950 via-blue-900 to-amber-500",
  },
  duesseldorf_b2b_cleaning: {
    title: "B2B-Reinigung Düsseldorf",
    desc: "Für kleine Unternehmen, Büros, Agenturen, Studios, Kanzleien und Gewerbeflächen, wenn Fläche, Frequenz, Zeitfenster und Zugang klar geprüft werden sollen.",
    href: "/duesseldorf/bueroreinigung",
    label: "B2B-Reinigung",
    eyebrow: "Düsseldorf",
    icon: BriefcaseBusiness,
    accent: "from-teal-600 via-cyan-500 to-blue-500",
  },
  duesseldorf_disposal: {
    title: "Entsorgung Düsseldorf mit Fotoeinschätzung",
    desc: "Für Möbel, Sperrmüll, Inventar oder kleinere Räumungen, ohne Umzugssignal und ohne riskante Sonderstoff-Zusagen.",
    href: "/entsorgung-duesseldorf",
    label: "Entsorgung anfragen",
    eyebrow: "Düsseldorf",
    icon: Trash2,
    accent: "from-orange-600 via-amber-500 to-slate-700",
  },
};

const defaultServiceIds: SignatureServiceId[] = [
  "key_handover",
  "parking_zone",
  "empty_return",
  "move_cleaning",
  "clear_cleaning",
  "photo_check",
  "budget_check",
  "platform_order_check",
  "property_ready_service",
  "estate_clearance",
  "discreet_move",
  "plan_b_service",
  "premium_discreet",
];

export function SignatureServices({
  dict,
  serviceIds,
  badge,
  title,
  subtitle,
  compact = false,
  source = "signature_services",
  className = "",
}: SignatureServicesProps) {
  const t = dict?.signature_services || { items: {}, badge: "", title: "", subtitle: "" };
  const items: Record<string, ServiceContent> = t.items || {};
  const selectedIds = (serviceIds?.length ? serviceIds : defaultServiceIds).filter(
    (id) => signatureServiceCatalog[id],
  );

  if (selectedIds.length === 0) return null;

  return (
    <section
      id="signature-services"
      className={`section-glow content-auto relative overflow-hidden px-6 ${compact ? "py-14" : "py-24"} ${className}`}
    >
      <span id="extras" className="absolute -top-24 block h-0 w-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <FloxantSymbolLayer variant="premium" density="soft" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.96fr_1.04fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
              {germanText(badge || t.badge, "FLOXANT Signature Services")}
            </div>
            <h2 className="mt-4 text-[2.15rem] font-bold tracking-tight text-slate-950 md:text-[2.65rem]">
              {germanText(
                title || t.title,
                "Zusatzservices, die Übergabe, Preis und Zeitdruck greifbar machen",
              )}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
              {germanText(
                subtitle || t.subtitle,
                "Diese Bausteine sind keine Deko. Sie lösen typische Engpässe: Schlüssel, Haltezone, Rückfahrt, Fotos, Budget, Reinigung und die letzten Meter bis zur Übergabe.",
              )}
            </p>
          </div>

          <div className="glass-elevated rounded-[1.2rem] px-5 py-5">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Warum das Kunden hilft
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              FLOXANT trennt Hauptleistung und Zusatzbedarf sichtbar. So erkennt ein Kunde früher,
              ob nur Transport, nur Reinigung oder ein koordinierter Abschluss mit Fotos, Budget,
              Schlüssel oder Rückfahrt gebraucht wird.
            </p>
          </div>
        </div>

        <div className={`grid gap-4 md:grid-cols-2 ${compact ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>
          {selectedIds.map((id) => {
            const service = signatureServiceCatalog[id];
            const Icon = service.icon;
            const content = items[id];

            return (
              <article key={id} className="card-premium card-depth rounded-[1.35rem] p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-[1rem] bg-gradient-to-r ${service.accent} text-white shadow-[0_14px_28px_rgba(15,23,42,0.1)]`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                    {service.eyebrow}
                  </span>
                </div>

                <h3 className="mt-5 text-[1.28rem] font-bold leading-[1.1] tracking-tight text-slate-950">
                  {germanText(content?.title, service.title)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {germanText(content?.desc, service.desc)}
                </p>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-900 transition-all hover:border-blue-200 hover:bg-blue-50"
                    data-event="signature_service_click"
                    data-signature-service={id}
                    data-source={source}
                  >
                    {service.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-[1.4rem] border border-slate-200 bg-white/86 px-5 py-4 shadow-sm shadow-slate-950/5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3 text-sm leading-7 text-slate-700">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
              <span>
                Alle Zusatzservices werden nach Umfang, Ort, Termin und Verfügbarkeit geprüft.
                Es gibt keine automatische Zusage und keine versteckten Festpreisversprechen.
              </span>
            </div>
            <Link
              href="/buchung"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-[11px] font-black uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              data-event="start_booking"
              data-source={`${source}_signature_footer`}
            >
              Anfrage starten
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
