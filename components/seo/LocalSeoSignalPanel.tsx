import Link from "next/link";
import { MapPin, Navigation, PhoneCall } from "lucide-react";

import { company } from "@/lib/company";

const localSignals = [
  "Regensburg als operative Basis",
  "Bayern als klares Einsatzgebiet",
  "Buchung als direkter Maps- und Search-Einstieg",
];

const localHighlights = [
  "Klare Standortsignale statt unruhiger Linkpfade",
  "Ein bevorzugter Einstieg für Maps, Search und direkte Empfehlungen",
  "Freundliche Führung statt verstreuter Kontaktwege",
];

export function LocalSeoSignalPanel({ sectionId = "region" }: { sectionId?: string }) {
  return (
    <section id={sectionId} className="section-glow relative px-6 pb-22">
      <div className="mx-auto grid max-w-7xl gap-5 xl:grid-cols-[1.02fr_0.98fr]">
        <div className="glass-elevated rounded-[1.9rem] px-6 py-6 md:px-8 md:py-8">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
            Lokales Signal
          </div>
          <h2 className="mt-4 max-w-3xl text-[1.9rem] font-bold flox-display-section text-slate-950 md:text-[2.45rem]">
            Regensburg ist unser operativer Kern. Bayern bleibt das klare Einsatzgebiet.
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-700">
            Für Google Maps, Google Search und direkte Kundenanfragen soll sofort sichtbar sein:
            FLOXANT plant von Regensburg aus, prüft Einsätze sauber und führt Interessenten nicht
            im Kreis, sondern in einen verständlichen direkten Anfrageweg.
          </p>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600">
            Kurz gesagt: lieber klar geführt als irgendwo zwischen Vergleichsportalen hängen
            bleiben. So wirkt es menschlicher, vertrauenswürdiger und im Alltag deutlich ruhiger.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {localSignals.map((signal) => (
              <span
                key={signal}
                className="rounded-full border border-blue-100 bg-blue-50/80 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-blue-800"
              >
                {signal}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="card-premium rounded-[1.25rem] p-5">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                <MapPin className="h-3.5 w-3.5" />
                Adresse
              </div>
              <p className="mt-3 text-[1rem] font-semibold leading-8 text-slate-950">{company.address}</p>
            </div>

            <div className="card-premium rounded-[1.25rem] p-5">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                <PhoneCall className="h-3.5 w-3.5" />
                Direkter Kontakt
              </div>
              <div className="mt-3 space-y-1.5 text-[1rem] font-semibold leading-8 text-slate-950">
                <a href={`tel:${company.phoneRaw}`} className="block hover:text-blue-700">
                  {company.phone}
                </a>
                <a href={`mailto:${company.email}`} className="block hover:text-blue-700">
                  {company.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-elevated rounded-[1.9rem] px-6 py-6 md:px-8 md:py-8">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
            Maps, Search & direkte Wege
          </div>
          <h3 className="mt-4 max-w-[15ch] text-[1.75rem] font-bold flox-display-section-tight text-slate-950 md:text-[2.1rem]">
            Ein direkter Pfad, der in Google Maps und Search sofort verständlich wirkt
          </h3>
          <p className="mt-4 text-[15px] leading-7 text-slate-700">
            Der direkte Einstieg für spontane Kunden bleibt bewusst die Buchungsseite. Von dort aus
            bleiben Buchung, Express-Check, Preisvorstellung und Kontakt sauber getrennt. Genau das
            wirkt für Kunden ruhiger, verständlicher und oft auch klickstärker.
          </p>

          <div className="mt-6 rounded-[1.1rem] border border-blue-100 bg-blue-50/75 px-4 py-3.5 text-sm font-mono text-blue-800">
            {company.businessProfilePreferredUrl}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/buchung"
              className="btn-premium inline-flex h-11 items-center justify-center gap-2 rounded-[1rem] bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-5 text-[11px] font-black uppercase tracking-[0.16em] text-white"
            >
              Buchungsseite öffnen
              <Navigation className="h-4 w-4" />
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex h-11 items-center justify-center rounded-[1rem] border border-slate-200 bg-white px-5 text-[11px] font-black uppercase tracking-[0.16em] text-slate-900 transition-all hover:border-blue-200 hover:bg-blue-50"
            >
              Kontakt & Standort
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {localHighlights.map((item) => (
              <div
                key={item}
                className="rounded-[1.05rem] border border-slate-200 bg-white/92 px-4 py-4 shadow-sm shadow-slate-950/5"
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
