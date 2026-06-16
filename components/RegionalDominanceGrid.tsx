import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock3,
  MapPin,
  Radar,
  ShieldCheck,
  Sparkles,
  Trash2,
  Truck,
} from "lucide-react";

import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { SERVICE_AREA_SERVICES, SERVICE_AREA_ZONES } from "@/lib/service-area-200km";
import { germanText } from "@/lib/german-text";

const serviceIcons = [Truck, Trash2, Building2, Sparkles];

export function RegionalDominanceGrid({ dic }: { dic?: any }) {
  const t = dic?.regional_grid || {};
  const featuredCities = SERVICE_AREA_ZONES.flatMap((zone) => zone.cities).slice(0, 18);

  return (
    <section className="section-glow relative overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute inset-0 opacity-34">
        <FloxantSymbolLayer variant="moving" density="soft" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 grid gap-4 lg:grid-cols-[1fr_0.92fr] lg:items-end">
          <div className="glass-elevated rounded-[2rem] px-7 py-7 md:px-8 md:py-8">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
              {germanText(t.badge, "Einsatzgebiet Regensburg")}
            </div>
            <h2 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-[3rem]">
              Services im strukturierten Raum rund um Regensburg
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
              FLOXANT bündelt Umzug, Entrümpelung, Büroumzug, Reinigung und direkte Kontaktwege mit
              Regensburg als Ausgangspunkt. Der Radius ist kein leeres Werbeversprechen, sondern ein
              sauberer Planungsraum für realistische Vorprüfung.
            </p>
          </div>

          <Link href="/einsatzgebiet-regensburg-200km" className="card-premium card-depth rounded-[2rem] p-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  Regionaler Hub
                </div>
                <h3 className="mt-3 text-[1.75rem] font-bold tracking-tight text-slate-950">
                  Einsatzgebiet um Regensburg öffnen
                </h3>
              </div>
              <Radar className="h-9 w-9 shrink-0 text-blue-700" />
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Orte, Services und direkte Kontaktwege für Kunden, die in Bayern schnell den
              richtigen Weg finden sollen.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
              Hub ansehen
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {SERVICE_AREA_SERVICES.map((service, index) => {
            const Icon = serviceIcons[index] || Truck;
            return (
              <Link key={service.href} href={service.href} className="card-premium card-depth rounded-[1.6rem] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[1.5rem] font-bold tracking-tight text-slate-950">
                  {germanText(service.name, service.name)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {germanText(service.description, service.description)}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {SERVICE_AREA_ZONES.map((zone) => (
            <div key={zone.id} className="glass-elevated rounded-[1.8rem] px-6 py-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                    {germanText(zone.radius, zone.radius)}
                  </div>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                    {germanText(zone.title, zone.title)}
                  </h3>
                </div>
                {zone.id === "core" ? (
                  <MapPin className="h-6 w-6 text-blue-700" />
                ) : zone.id === "regional" ? (
                  <ShieldCheck className="h-6 w-6 text-blue-700" />
                ) : (
                  <Clock3 className="h-6 w-6 text-blue-700" />
                )}
              </div>

              <p className="mb-6 text-sm leading-7 text-slate-700">
                {germanText(zone.description, zone.description)}
              </p>

              <div className="grid gap-2">
                {zone.cities.slice(0, 6).map((city) => (
                  <Link
                    key={city.slug}
                    href={`/umzug-${city.slug}`}
                    className="flex items-center justify-between rounded-[1.1rem] border border-slate-200 bg-white px-4 py-3 text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50"
                  >
                    <span className="text-sm font-medium">{germanText(city.name, city.name)}</span>
                    <span className="text-[11px] text-slate-400">{germanText(city.distance, city.distance)}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white/97 p-6 shadow-[0_16px_38px_rgba(15,23,42,0.055)]">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                Städte-Auswahl
              </div>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                Direkte Kontaktwege im Einsatzraum
              </h3>
            </div>
            <Link
              href="/standorte"
              className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500 hover:text-slate-950"
            >
              Alle Standorte
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                href={`/umzug-${city.slug}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
              >
                {germanText(city.name, city.name)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
