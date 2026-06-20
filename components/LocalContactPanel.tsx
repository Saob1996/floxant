import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

import {
  floxantLocationList,
  getLocationContactHref,
  type FloxantLocationKey,
} from "@/lib/floxant-locations";

type LocalContactPanelProps = {
  locationKeys?: readonly FloxantLocationKey[];
  title?: string;
  intro?: string;
  service?: string;
  className?: string;
};

export function LocalContactPanel({
  locationKeys,
  title = "Lokale Kontaktwege mit echten NAP-Daten.",
  intro = "FLOXANT zeigt die vorhandenen Standortdaten sichtbar und trennt offene manuelle Pruefungen von bestaetigten Kontaktdaten.",
  service = "anfrage",
  className = "",
}: LocalContactPanelProps) {
  const locations = locationKeys
    ? floxantLocationList.filter((location) => locationKeys.includes(location.locationKey))
    : floxantLocationList;

  return (
    <section className={`bg-white px-5 py-12 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Kontakt und NAP
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{title}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{intro}</p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {locations.map((location) => {
            const contactHref = getLocationContactHref(location.locationKey, service);

            return (
              <article
                key={location.locationKey}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                      {location.displayName}
                    </p>
                    <h3 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
                      {location.addressLine1}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">
                      {location.postalCode} {location.city}, {location.country}
                    </p>
                  </div>
                  <Link
                    href={contactHref}
                    data-event="seo_cta_click"
                    data-service={service}
                    data-city={location.locationKey}
                    data-page-intent={`${service}-${location.locationKey}`}
                    data-priority="p1"
                    data-cta-label={`Anfrage ${location.displayName}`}
                    data-destination={contactHref}
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white"
                  >
                    Anfrage
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {location.phone && location.phoneRaw ? (
                    <a
                      href={`tel:${location.phoneRaw}`}
                      data-event="seo_phone_click"
                      data-city={location.locationKey}
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800"
                    >
                      <Phone className="h-4 w-4 text-blue-700" aria-hidden="true" />
                      {location.phone}
                    </a>
                  ) : null}
                  {location.email ? (
                    <a
                      href={`mailto:${location.email}`}
                      data-event="seo_email_click"
                      data-city={location.locationKey}
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800"
                    >
                      <Mail className="h-4 w-4 text-blue-700" aria-hidden="true" />
                      {location.email}
                    </a>
                  ) : null}
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {location.localTrustNotes.map((note) => (
                    <div
                      key={note}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-700"
                    >
                      {note}
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
