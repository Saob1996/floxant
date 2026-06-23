import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";

import {
  serviceGroups,
  type ServiceCategory,
  type ServiceInventoryItem,
} from "@/lib/service-inventory";
import type { FloxantLocationKey } from "@/lib/floxant-locations";
import { germanText } from "@/lib/german-text";

const categoryLabels: Record<ServiceCategory, string> = {
  reinigung: "Reinigung",
  umzug_transport: "Umzug und Transport",
  entruempelung_aufloesung: "Entrümpelung und Auflösung",
  angebot_pruefen: "Angebot prüfen",
  signature_service: "Signature Services",
};

const categoryIntros: Record<ServiceCategory, string> = {
  reinigung:
    "Von Büroreinigung bis Spezialreinigung: Entscheidend sind Objekt, Fläche, Zustand, Zugang und Ziel.",
  umzug_transport:
    "Transport und Umzug werden nach Volumen, Strecke, Laufweg, Termin und Zusatzleistungen eingeordnet.",
  entruempelung_aufloesung:
    "Räumung, Auflösung und Nachlass brauchen Fotos, Freigabe, Menge, Zugang und klare Grenzen.",
  angebot_pruefen:
    "Vorhandene Angebote werden nach Umfang, Annahmen, Zusatzpositionen und Machbarkeit geprüft.",
  signature_service:
    "FLOXANT-Startpunkte für Fälle mit Angebot, Objektbrief, Übergabe, Plan B oder Diskretion.",
};

type ServiceClusterGridProps = {
  title?: string;
  intro?: string;
  categories?: readonly ServiceCategory[];
  locationKey?: FloxantLocationKey;
  limitPerCategory?: number;
  className?: string;
};

function isAvailableForLocation(service: ServiceInventoryItem, locationKey?: FloxantLocationKey) {
  if (!locationKey) return true;
  const key = locationKey === "duesseldorf" ? "dusseldorfAvailability" : "regensburgAvailability";
  return service[key] !== "not_offered";
}

function availabilityLabel(service: ServiceInventoryItem, locationKey?: FloxantLocationKey) {
  if (!locationKey) return service.priority;
  const availability =
    locationKey === "duesseldorf" ? service.dusseldorfAvailability : service.regensburgAvailability;
  if (availability === "available") return "verfügbar";
  if (availability === "limited") return "nach Prüfung";
  if (availability === "needs_manual_confirmation") return "manuell prüfen";
  return "nicht angeboten";
}

export function ServiceClusterGrid({
  title = "Services nach echter Kundensituation sortiert.",
  intro = "Die Cluster helfen, von einer unscharfen Anfrage zum passenden Service, Standort und Kontaktweg zu kommen.",
  categories = ["reinigung", "umzug_transport", "entruempelung_aufloesung", "angebot_pruefen"],
  locationKey,
  limitPerCategory = 6,
  className = "",
}: ServiceClusterGridProps) {
  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <Layers3 className="h-4 w-4" aria-hidden="true" />
            Service-Cluster
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{germanText(title, title)}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{germanText(intro, intro)}</p>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-2">
          {categories.map((category) => {
            const services = serviceGroups[category]
              .filter((service) => isAvailableForLocation(service, locationKey))
              .slice(0, limitPerCategory);

            if (services.length === 0) return null;

            return (
              <article key={category} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-black tracking-normal text-slate-950">
                      {germanText(categoryLabels[category], categoryLabels[category])}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">
                      {germanText(categoryIntros[category], categoryIntros[category])}
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <Link
                      key={service.serviceKey}
                      href={service.recommendedRoute}
                      data-event="service_card_click"
                      data-service={service.serviceKey}
                      data-city={locationKey || ""}
                      data-page-intent={service.seoIntent}
                      data-priority={service.priority.toLowerCase()}
                      data-destination={service.recommendedRoute}
                      className="group min-w-0 rounded-lg border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
                    >
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-black text-blue-700">
                          {germanText(availabilityLabel(service, locationKey), availabilityLabel(service, locationKey))}
                        </span>
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-black text-slate-600">
                          {service.priority}
                        </span>
                      </div>
                      <h4 className="mt-3 text-lg font-black text-slate-950">{germanText(service.name, service.name)}</h4>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                        {germanText(service.shortDescription, service.shortDescription)}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                        Service öffnen
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </Link>
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
