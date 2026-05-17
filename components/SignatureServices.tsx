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

export const signatureServiceCatalog: Readonly<Record<SignatureServiceId, SignatureServiceCatalogItem>> = Object.freeze({
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
});

const defaultServiceIds = Object.freeze([
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
] satisfies SignatureServiceId[]);

const signatureIconBackgrounds = Object.freeze({
  key_handover: "linear-gradient(135deg, #2563eb 0%, #06b6d4 58%, #475569 100%)",
  parking_zone: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 56%, #06b6d4 100%)",
  empty_return: "linear-gradient(135deg, #10b981 0%, #14b8a6 54%, #06b6d4 100%)",
  move_cleaning: "linear-gradient(135deg, #06b6d4 0%, #34d399 52%, #2dd4bf 100%)",
  clear_cleaning: "linear-gradient(135deg, #f97316 0%, #f59e0b 55%, #facc15 100%)",
  handover_ready: "linear-gradient(135deg, #3b82f6 0%, #6366f1 55%, #475569 100%)",
  photo_check: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 56%, #22d3ee 100%)",
  budget_check: "linear-gradient(135deg, #059669 0%, #14b8a6 52%, #2563eb 100%)",
  platform_order_check: "linear-gradient(135deg, #1d4ed8 0%, #06b6d4 55%, #475569 100%)",
  property_ready_service: "linear-gradient(135deg, #0c0a09 0%, #b45309 55%, #a8a29e 100%)",
  estate_clearance: "linear-gradient(135deg, #0c0a09 0%, #44403c 55%, #f59e0b 100%)",
  discreet_move: "linear-gradient(135deg, #0c0a09 0%, #44403c 55%, #06b6d4 100%)",
  short_notice: "linear-gradient(135deg, #f59e0b 0%, #f97316 54%, #f87171 100%)",
  plan_b_service: "linear-gradient(135deg, #020617 0%, #0e7490 54%, #f59e0b 100%)",
  premium_discreet: "linear-gradient(135deg, #020617 0%, #1e3a8a 55%, #f59e0b 100%)",
  duesseldorf_b2b_cleaning: "linear-gradient(135deg, #0d9488 0%, #06b6d4 55%, #2563eb 100%)",
  duesseldorf_disposal: "linear-gradient(135deg, #ea580c 0%, #f59e0b 55%, #334155 100%)",
} satisfies Record<SignatureServiceId, string>);

function normalizeSignatureText(value: string) {
  return germanText(value, value).normalize("NFC");
}

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
  const selectedIds = [...(serviceIds?.length ? serviceIds : defaultServiceIds)].filter(
    (id): id is SignatureServiceId => Boolean(signatureServiceCatalog[id]),
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
        <div className="flox-signature-header mb-10 grid gap-5 lg:grid-cols-[0.96fr_1.04fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="flox-overline text-blue-700">
              {germanText(badge || t.badge, "FLOXANT Signature Services")}
            </div>
            <h2 className="flox-title-lg flox-display-section mt-4 text-slate-950">
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

          <div className="glass-elevated px-5 py-5">
            <div className="flox-overline text-blue-700">
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
            const eyebrow = normalizeSignatureText(service.eyebrow);
            const serviceTitle = normalizeSignatureText(service.title);
            const serviceDesc = normalizeSignatureText(service.desc);
            const serviceLabel = normalizeSignatureText(service.label);

            return (
              <article key={id} className="flox-signature-card card-premium card-depth p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flox-icon-tile flox-signature-icon h-11 w-11"
                    style={{ background: signatureIconBackgrounds[id] }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="flox-tag text-slate-500">
                    {eyebrow}
                  </span>
                </div>

                <h3 className="flox-card-title-lg mt-5 text-slate-950">
                  {germanText(content?.title, serviceTitle)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {germanText(content?.desc, serviceDesc)}
                </p>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <Link
                    href={service.href}
                    className="flox-command-link text-slate-900"
                    data-event="signature_service_click"
                    data-signature-service={id}
                    data-source={source}
                  >
                    {serviceLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flox-signature-close mt-8 px-5 py-4">
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
              className="flox-button-primary shrink-0 px-5 py-3"
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
