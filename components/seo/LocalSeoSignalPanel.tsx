import Link from "next/link";
import { MapPin, Navigation, PhoneCall } from "lucide-react";

import { company } from "@/lib/company";

const localSignals = [
  "24h Online-Anfrage und WhatsApp",
  "Düsseldorf und Regensburg getrennt",
  "Regensburg und Umgebung nach Machbarkeit",
  "Ort, Umfang und Termin werden geprüft",
  "Direkte Anfrage ohne Umwege",
];

const localHighlights = [
  "Sie können Fall, Fotos, Termin und Budget jederzeit senden.",
  "FLOXANT prüft Ort, Umfang und Verfügbarkeit ehrlich vorab.",
  "Umzug, Reinigung, Entrümpelung und Übergabe können zusammen gedacht werden.",
  "Bei Rückfragen bleiben Telefon, WhatsApp und Anfrageformular direkt erreichbar.",
];

export function LocalSeoSignalPanel({ sectionId = "region" }: { sectionId?: string }) {
  return (
    <section id={sectionId} className="section-glow relative px-6 pb-22">
      <div className="mx-auto grid max-w-7xl gap-5 xl:grid-cols-[1.02fr_0.98fr]">
        <div className="glass-elevated px-6 py-6 md:px-8 md:py-8">
          <div className="flox-overline text-blue-700">
            Servicegebiet
          </div>
          <h2 className="flox-title-lg flox-display-section mt-4 max-w-3xl text-slate-950">
            Düsseldorf und Regensburg werden getrennt und klar angefragt.
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-700">
            FLOXANT trennt Düsseldorf und Regensburg sauber nach Region, Leistung und Anfrage.
            Regensburg und Umgebung werden nach Ort, Umfang, Termin, Zugang und Strecke
            sachlich eingeordnet.
          </p>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600">
            Wichtig ist nicht nur die Entfernung, sondern der Ablauf: Umzug, Reinigung,
            Entrümpelung, Transport, Übergabe, Plan B oder Angebotsprüfung werden passend
            zum Auftrag besprochen. Düsseldorf führt Umzug, Reinigung, Entrümpelung,
            Haushaltsauflösung und Entsorgung mit klaren lokalen Kontaktmöglichkeiten.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {localSignals.map((signal) => (
              <span
                key={signal}
                className="flox-tag-soft"
              >
                {signal}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="card-premium p-5">
              <div className="flox-overline flex items-center gap-2 text-blue-700">
                <MapPin className="h-3.5 w-3.5" />
                Adresse
              </div>
              <p className="mt-3 text-[1rem] font-semibold leading-8 text-slate-950">{company.address}</p>
              <a
                href={company.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex text-sm font-black text-blue-700 underline-offset-4 hover:underline"
              >
                Google Maps / Standort öffnen
              </a>
            </div>

            <div className="card-premium p-5">
              <div className="flox-overline flex items-center gap-2 text-blue-700">
                <PhoneCall className="h-3.5 w-3.5" />
                Direkter Kontakt
              </div>
              <div className="mt-3 space-y-1.5 text-[1rem] font-semibold leading-8 text-slate-950">
                <a href={`tel:${company.phoneRaw}`} className="flox-subtle-link block hover:text-blue-700">
                  {company.phone}
                </a>
                <a href={`mailto:${company.email}`} className="flox-subtle-link block hover:text-blue-700">
                  {company.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-elevated px-6 py-6 md:px-8 md:py-8">
          <div className="flox-overline text-blue-700">
            Kontakt ohne Umwege
          </div>
          <h3 className="flox-title-lg flox-display-section-tight mt-4 max-w-[15ch] text-slate-950">
            Schnell zum passenden Kontaktweg
          </h3>
          <p className="mt-4 text-[15px] leading-7 text-slate-700">
            Wenn Sie schon wissen, was gebraucht wird, starten Sie direkt mit der Anfrage. Wenn noch
            Unsicherheit besteht, helfen Rechner, Express-Check, Preisrahmen oder Kontakt weiter.
            So bleibt der Start ruhig und verständlich.
          </p>

          <div className="flox-info-panel mt-6 px-4 py-3.5 text-sm font-mono">
            Düsseldorf · Regensburg · Umgebung nach Machbarkeit
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/buchung"
              className="flox-button-primary h-11 px-5"
            >
              Anfrage öffnen
              <Navigation className="h-4 w-4" />
            </Link>
            <Link
              href="/kontakt"
              className="flox-button-secondary h-11 px-5"
            >
              Kontakt & Standort
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {localHighlights.map((item) => (
              <div
                key={item}
                className="flox-surface-card px-4 py-4"
              >
                <p className="text-sm leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
