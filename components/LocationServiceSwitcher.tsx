import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";

import {
  floxantLocationList,
  getLocationContactHref,
  type FloxantLocation,
} from "@/lib/floxant-locations";
import { germanText } from "@/lib/german-text";

type LocationServiceSwitcherProps = {
  title?: string;
  intro?: string;
  className?: string;
};

function locationServiceList(location: FloxantLocation) {
  return [...location.primaryServices.slice(0, 6), ...location.secondaryServices.slice(0, 3)];
}

export function LocationServiceSwitcher({
  title = "Düsseldorf und Regensburg sauber getrennt.",
  intro = "Beide Standorte führen zu eigenen lokalen Einstiegen. Sichtbar sind nur Daten, die im Code vorhanden sind; offene Angaben bleiben als manuelle Prüfung markiert.",
  className = "",
}: LocationServiceSwitcherProps) {
  return (
    <section className={`bg-slate-50 px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Standortlogik
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{germanText(title, title)}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{germanText(intro, intro)}</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {floxantLocationList.map((location) => (
            <article key={location.locationKey} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                    {germanText(location.displayName, location.displayName)}
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
                    {germanText(location.city, location.city)}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">
                    {germanText(location.addressLine1, location.addressLine1)}, {location.postalCode} {germanText(location.city, location.city)}
                  </p>
                </div>
                <Link
                  href={location.localLandingPage}
                  data-event="region_select"
                  data-region={location.locationKey}
                  data-source="location_service_switcher"
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white"
                >
                  Standort
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {locationServiceList(location).map((service) => (
                  <Link
                    key={service}
                    href={getLocationContactHref(location.locationKey, service.toLowerCase().replace(/\s+/g, "-"))}
                    data-event="seo_cta_click"
                    data-service={service.toLowerCase().replace(/\s+/g, "-")}
                    data-city={location.locationKey}
                    data-page-intent={`${service.toLowerCase().replace(/\s+/g, "-")}-${location.locationKey}`}
                    data-priority="p2"
                    data-cta-label={service}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold leading-6 text-slate-800 transition hover:border-blue-200 hover:bg-white"
                  >
                    {germanText(service, service)}
                  </Link>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="inline-flex items-center gap-2 text-sm font-black text-amber-900">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Manuelle Datenprüfung
                </div>
                <p className="mt-2 text-sm font-semibold leading-7 text-amber-950">
                  Öffnungszeiten und GBP-Profil-URL sind nicht als bestätigte Daten hinterlegt.
                  Sie werden nicht erfunden und müssen vor Merge/GBP-Abgleich manuell geprüft werden.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
