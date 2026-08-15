import { CheckCircle2, MapPin, Navigation } from "lucide-react";

import {
  cleaningServiceAreaRadiusKm,
  getVisibleCleaningAreaPlaces,
  regensburgCleaningAreaLabel,
} from "@/lib/regensburg-cleaning-service-area";

type CleaningServiceAreaProps = {
  className?: string;
  compact?: boolean;
  title?: string;
  intro?: string;
};

const priorityMunicipalities = [
  "Neutraubling",
  "Lappersdorf",
  "Pentling",
  "Obertraubling",
  "Regenstauf",
  "Kelheim",
  "Schwandorf",
  "Straubing",
  "Bad Abbach",
  "Nittendorf",
  "Wenzenbach",
  "Tegernheim",
];

export function CleaningServiceArea({
  className = "",
  compact = false,
  title = "Reinigungs-Servicegebiet Regensburg",
  intro = "FLOXANT fokussiert Reinigungsservices auf Regensburg und den Umkreis bis 50 km. So bleiben Anfahrt, Besichtigung, Fotos und Angebot realistisch planbar.",
}: CleaningServiceAreaProps) {
  const places = getVisibleCleaningAreaPlaces();
  const highlightedMunicipalities = priorityMunicipalities
    .filter((place) => places.municipalities.includes(place))
    .slice(0, compact ? 4 : 6);
  const visibleDistricts = places.districts.slice(0, compact ? 4 : 6);

  return (
    <section
      id="reinigungs-servicegebiet"
      className={`rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8 ${className}`}
      aria-labelledby="reinigungs-servicegebiet-title"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-normal text-emerald-700">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {regensburgCleaningAreaLabel}
          </p>
          <h2 id="reinigungs-servicegebiet-title" className="text-2xl font-bold text-slate-950 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">{intro}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <div className="flex items-center gap-2 font-semibold text-slate-950">
            <Navigation className="h-4 w-4 text-emerald-700" aria-hidden="true" />
            Bis {cleaningServiceAreaRadiusKm} km
          </div>
          <p className="mt-1">Keine Reinigungs-Landingpages für Orte außerhalb dieses Radius.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-950">
            <CheckCircle2 className="h-5 w-5 text-emerald-700" aria-hidden="true" />
            Regensburg Stadtteile
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700 sm:grid-cols-3">
            {visibleDistricts.map((district) => (
              <li key={district} className="rounded-xl bg-white px-3 py-2">
                {district}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Ihren genauen Stadtteil geben Sie einfach in der Anfrage an.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-950">
            <CheckCircle2 className="h-5 w-5 text-emerald-700" aria-hidden="true" />
            Umland bis 50 km
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700 sm:grid-cols-3">
            {highlightedMunicipalities.map((place) => (
              <li key={place} className="rounded-xl bg-white px-3 py-2">
                {place}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Für weitere Orte prüfen wir die Anfahrt anhand Ihrer Angaben.
          </p>
        </div>
      </div>
    </section>
  );
}
