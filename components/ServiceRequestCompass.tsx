import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  MapPin,
  MessageCircle,
  Sparkles,
  Trash2,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { company } from "@/lib/company";

const regensburgServices = [
  { label: "Umzug", href: "/regensburg/umzug", text: "Privat, Familie, Firma oder kurzfristiger Wechsel." },
  { label: "Reinigung", href: "/regensburg/reinigung", text: "Endreinigung, Übergabe, Objekt oder Gewerbe." },
  { label: "Entrümpelung", href: "/regensburg/entruempelung", text: "Wohnung, Keller, Nachlass oder Restmengen." },
  { label: "Übergabe", href: "/uebergabeakte", text: "Schlüssel, Fotos, Protokoll und offene Punkte." },
  { label: "Plan B", href: "/plan-b-service", text: "Wenn Termin, Anbieter oder Ablauf kippt." },
  { label: "Rückfahrt", href: "/leerfahrt-rueckfahrt", text: "Transport und freie Kapazität rund um Bayern." },
];

const duesseldorfServices = [
  { label: "Wohnungsreinigung", href: "/duesseldorf/reinigung", text: "Wohnung, Grundreinigung oder Übergabevorbereitung." },
  { label: "Büroreinigung", href: "/duesseldorf/bueroreinigung", text: "Räume, Turnus, Zeitfenster und Zugang." },
  { label: "Praxisreinigung", href: "/duesseldorf/praxisreinigung", text: "Sensible Bereiche, Turnus und Reinigungszeiten." },
  { label: "Gewerbereinigung", href: "/duesseldorf/gewerbereinigung", text: "Gewerbeflächen, Nutzung und Leistungsumfang." },
];

export function ServiceRequestCompass() {
  const whatsappHref = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hallo FLOXANT, ich möchte eine Anfrage stellen. Region, Leistung, Ort und Termin:",
  )}`;

  return (
    <section id="anfrage-kompass" className="flox-section flox-section-tight content-auto py-8">
      <div className="flox-shell">
        <div className="flox-panel-frame flox-service-compass-board overflow-hidden p-4 md:p-6 lg:p-7">
          <div className="grid gap-5 xl:grid-cols-[0.84fr_1.16fr] xl:items-stretch">
            <div className="flox-panel-dark flox-service-compass-primer relative overflow-hidden p-5 text-white md:p-7">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.24),transparent_34%),radial-gradient(circle_at_84%_72%,rgba(16,185,129,0.18),transparent_34%)]" />
              <div className="relative">
                <div className="flox-tag-dark">
                  <ClipboardCheck className="h-4 w-4" />
                  Anfrage-Kompass
                </div>
                <h2 className="flox-title-lg flox-display-section mt-5 max-w-[13ch] text-white">
                  Erst Region wählen. Dann richtig anfragen.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                  FLOXANT führt Kunden schneller zum passenden Kontaktweg. Regensburg bleibt der
                  Ausgangspunkt für Umzug, Transport und Räumung. Düsseldorf bleibt als eigener
                  Reinigungsbereich klar davon getrennt.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Online anfragen", "Anfrage jederzeit senden, Rückmeldung nach Prüfung."],
                    ["Fotos helfen", "Zugang, Zustand, Menge und Fläche schneller klären."],
                    ["Reinigung Düsseldorf", "Düsseldorf führt direkt zu den aktiven Reinigungsleistungen."],
                    ["Sauber angekommen", "Ihre Anfrage bleibt sortiert und gut nachvollziehbar."],
                  ].map(([label, text], index) => {
                    const SignalIcon = [Clock3, Sparkles, BadgeCheck, ClipboardCheck][index] ?? CheckCircle2;

                    return (
                    <div key={label} className="flox-service-compass-signal rounded-[1.15rem] border border-white/10 bg-white/8 p-3">
                      <SignalIcon className="mb-2 h-4 w-4 text-cyan-100" />
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">
                        {label}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-slate-300">{text}</p>
                    </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/buchung?utm_source=homepage_compass&contact=callback#buchungssystem"
                    className="flox-button-primary min-h-12 px-5 py-3"
                    data-event="hero_cta_click"
                    data-source="homepage_compass"
                    data-contact-channel="booking"
                    data-intent="service_compass_booking"
                    data-priority="hot"
                  >
                    Anfrage starten
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flox-button-secondary min-h-12 px-5 py-3"
                    data-event="whatsapp_click"
                    data-source="homepage_compass"
                    data-contact-channel="whatsapp"
                    data-intent="service_compass_whatsapp"
                    data-priority="hot"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp mit Fotos
                  </a>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <ServiceRegionColumn
                eyebrow="Regensburg / Bayern"
                title="Alle Kernservices"
                text="Für Regensburg und das verifizierte Einsatzgebiet bis 75 km. Längere Transportstrecken werden separat geprüft."
                Icon={MapPin}
                services={regensburgServices}
                actionHref="/buchung?region=regensburg&utm_source=homepage_compass#buchungssystem"
                actionLabel="Regensburg/Bayern anfragen"
                source="homepage_compass_regensburg"
              />
              <ServiceRegionColumn
                eyebrow="Düsseldorf"
                title="Reinigung getrennt"
                text="Wohnung, Büro, Praxis und Gewerbe werden über die aktiven Düsseldorfer Reinigungswege eingeordnet."
                Icon={Sparkles}
                services={duesseldorfServices}
                actionHref="/kontakt?source=homepage_compass&location=duesseldorf&service=reinigung&intent=reinigungsanfrage#direktanfrage"
                actionLabel="Reinigung Düsseldorf anfragen"
                source="homepage_compass_duesseldorf"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type RegionService = {
  label: string;
  href: string;
  text: string;
};

function ServiceRegionColumn({
  eyebrow,
  title,
  text,
  Icon,
  services,
  actionHref,
  actionLabel,
  source,
}: {
  eyebrow: string;
  title: string;
  text: string;
  Icon: LucideIcon;
  services: RegionService[];
  actionHref: string;
  actionLabel: string;
  source: string;
}) {
  return (
    <div className="flox-action-card flox-service-region-column flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flox-overline text-blue-700">{eyebrow}</div>
          <h3 className="flox-card-title-lg mt-2 text-slate-950">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
        </div>
        <span className="flox-icon-tile h-12 w-12">
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-5 grid gap-2">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="flox-service-region-link group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[1rem] border border-slate-200 bg-white px-3 py-3 text-left transition hover:border-blue-200 hover:bg-blue-50/70"
            data-event="service_card_click"
            data-source={source}
            data-label={service.label}
          >
            <span className="flox-service-region-link-icon flex h-8 w-8 items-center justify-center rounded-[0.8rem] bg-slate-100 text-slate-700">
              {service.label.includes("Ent") ? (
                <Trash2 className="h-4 w-4" />
              ) : service.label.includes("Firma") || service.label.includes("Gewerbe") ? (
                <Building2 className="h-4 w-4" />
              ) : service.label.includes("Umzug") ? (
                <Truck className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-black text-slate-950">{service.label}</span>
              <span className="mt-0.5 block text-xs leading-5 text-slate-500">{service.text}</span>
            </span>
            <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
          </Link>
        ))}
      </div>

      <Link
        href={actionHref}
        className="flox-button-primary mt-5 min-h-12 justify-center px-5"
        data-event="hero_cta_click"
        data-source={source}
        data-contact-channel="booking"
        data-intent="service_region_booking"
        data-priority="hot"
      >
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
