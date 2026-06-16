import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Mail,
  MapPinned,
  MessageCircle,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { company } from "@/lib/company";

const mapQuery = encodeURIComponent(
  `${company.name} ${company.streetAddress} ${company.postalCode} ${company.city}`,
);
export const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
export const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`;

export const contactEntryPoints = [
  {
    icon: Mail,
    title: "Direkt anfragen",
    text: "Für Kunden, die ihren Fall ohne Umweg schildern möchten: Leistung, Ort, Termin und Kontaktweg direkt angeben.",
    href: "/buchung",
    action: "Anfrage öffnen",
  },
  {
    icon: Zap,
    title: "Express-Anfrage",
    text: "Für kurzfristige Fälle, bei denen FLOXANT zuerst die Machbarkeit sauber prüfen soll.",
    href: "/express-anfrage",
    action: "Express öffnen",
  },
  {
    icon: Calculator,
    title: "Preisrahmen prüfen",
    text: "Für Umzug, Reinigung, Entrümpelung und Büroumzug mit strukturierter Einschätzung und ehrlicher Einordnung.",
    href: "/rechner",
    action: "Rechner starten",
  },
];

const mapsRankingSignals = [
  "Adresse, Telefonnummer und Kontaktwege bleiben klar auffindbar.",
  "Der lokale Schwerpunkt wird dort genannt, wo er für Anfahrt und Terminplanung relevant ist.",
  "Kontakt, Rechner und Buchung führen ohne Sackgassen zu echten nächsten Schritten.",
];

export function ContactTrustPanel({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`relative overflow-hidden px-6 ${compact ? "py-12" : "py-24"}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.16),transparent_32%),radial-gradient(circle_at_84%_52%,rgba(34,211,238,0.08),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
              <MapPinned className="h-4 w-4" />
              Kontakt Regensburg
            </div>
            <h2 className="mt-6 max-w-[14ch] text-3xl font-semibold flox-display-section text-foreground md:text-5xl">
              FLOXANT erreichen und den passenden Kontaktweg wählen.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 md:text-base">
              Für Kunden ist wichtig, ob sie direkt anfragen, erst kurz Rückfragen stellen
              oder einen Preisrahmen prüfen möchten. FLOXANT bündelt Telefon, WhatsApp,
              E-Mail, Standort und Rechner so, dass der nächste Schritt schnell klar ist.
            </p>

            <div className="mt-8 grid gap-3">
              <a
                href={`tel:${company.phoneRaw}`}
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700 transition hover:border-blue-300/25 hover:bg-blue-50 hover:text-slate-900"
              >
                <span className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-blue-700" />
                  {company.phone}
                </span>
                <ArrowRight className="h-4 w-4 text-blue-700 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100 hover:text-emerald-950"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-emerald-600" />
                  WhatsApp Direktkontakt
                </span>
                <ArrowRight className="h-4 w-4 text-emerald-600 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={`mailto:${company.email}`}
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700 transition hover:border-blue-300/25 hover:bg-blue-50 hover:text-slate-900"
              >
                <span className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-700" />
                  {company.email}
                </span>
                <ArrowRight className="h-4 w-4 text-blue-700 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700 transition hover:border-blue-300/25 hover:bg-blue-50 hover:text-slate-900"
              >
                <span className="flex items-center gap-3">
                  <MapPinned className="h-4 w-4 text-blue-700" />
                  {company.address}
                </span>
                <ArrowRight className="h-4 w-4 text-blue-700 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2.5rem] border border-blue-200 bg-blue-50 p-7">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
                Schnell zum richtigen Weg
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
                Wenn Eckdaten schon vorliegen, ist die Buchungsseite meist der klarste Startpunkt.
                Bei knapper Zeit passt Express. Für allgemeine Rückfragen bleiben Telefon,
                WhatsApp und E-Mail sichtbar und direkt erreichbar.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {contactEntryPoints.map((entry) => {
                const Icon = entry.icon;
                return (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    className="premium-scan group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition hover:-translate-y-1 hover:border-blue-300/25"
                  >
                    <Icon className="h-5 w-5 text-blue-700" />
                    <h3 className="mt-5 text-lg font-semibold text-foreground">{entry.title}</h3>
                    <p className="mt-3 min-h-[96px] text-sm leading-relaxed text-slate-600">
                      {entry.text}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                      {entry.action}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="rounded-[1.75rem] border border-blue-100 bg-blue-50 p-6 shadow-sm shadow-blue-950/5">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
                Klarer Kontaktweg
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Wer aus der lokalen Suche kommt, braucht keinen langen Umweg. Die Buchungsseite
                führt direkt zu Leistung, Termin, Preisrahmen und Kontaktmöglichkeit.
              </p>
              <Link
                href="/buchung"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900"
              >
                Buchungslink öffnen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
                Lokale Vertrauenspunkte
              </div>
              <h3 className="mt-3 text-xl font-semibold text-foreground">
                Was den lokalen Eindruck stärkt
              </h3>
              <div className="mt-4 grid gap-3">
                {mapsRankingSignals.map((signal) => (
                  <div
                    key={signal}
                    className="rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600"
                  >
                    {signal}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
              <div className="mb-3 flex items-center gap-2 text-blue-700">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
                  Lokale Einordnung
                </span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Lokal erreichbar, regional realistisch
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                FLOXANT prüft Anfragen nach Serviceart, Ort, Umfang, Zugang, Terminlage und
                gewünschtem Kontaktweg. So bleibt die Reichweite realistisch und die Anfrage
                für Kunden verständlich.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
