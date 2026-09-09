import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch, Globe2, MapPin, Sparkles } from "lucide-react";

import {
  authorityEnglishIntents,
  authorityLocations,
  authorityProblemGroups,
  authorityServices,
  authoritySignatureServices,
  getAuthorityServiceById,
  getAuthorityServicesByLocation,
  getAuthorityServicesByPriority,
} from "@/lib/full-service-authority";
import { cn } from "@/lib/utils";

type FullServiceAuthorityExperienceProps = {
  className?: string;
  variant?: "default" | "compact" | "duesseldorf" | "regensburg" | "contact" | "offer";
  heading?: string;
  intro?: string;
};

const variantCopy = {
  default: {
    heading: "Welcher FLOXANT Service passt zu welchem Problem?",
    intro:
      "FLOXANT verbindet örtliche Leistungen, besondere Unterstützung und Angebotsprüfung zu einem klaren Anfrageweg für Düsseldorf, Regensburg und den geprüften Umkreis.",
  },
  compact: {
    heading: "Service schnell einordnen",
    intro: "Problem, Ort und Ziel reichen oft für den ersten sinnvollen Kontaktweg.",
  },
  duesseldorf: {
    heading: "Düsseldorf: lokale Anfrage sauber einordnen",
    intro:
      "Düsseldorf bleibt ein echter Standort. Servicegebiete im Umkreis werden nur als Einsatzgebiet erklärt, nicht als weitere Niederlassung.",
  },
  regensburg: {
    heading: "Regensburg: Servicezentrum plus 75 km",
    intro:
      "Regensburg ist der stärkste Hub für Reinigung, Umzug, Entrümpelung, Klaviertransport, B2B-Reinigung und Angebotsprüfung.",
  },
  contact: {
    heading: "Kontaktweg nach Anliegen wählen",
    intro:
      "Der richtige Service entsteht aus Ort, Umfang, Fotos, Termin und Ziel. Das Formular kann Deutsch oder Englisch einordnen.",
  },
  offer: {
    heading: "Angebotsprüfung als Entscheidungsknoten",
    intro:
      "Wenn ein Preis oder Angebot schon vorliegt, helfen Angebotscheck, Fairpreis-Check, Objektbrief und Plan B bei der nächsten Entscheidung.",
  },
} as const;

const p0Services = getAuthorityServicesByPriority("P0").slice(0, 10);
const locationHighlights = {
  duesseldorf: getAuthorityServicesByLocation("duesseldorf").slice(0, 6),
  regensburg: getAuthorityServicesByLocation("regensburg").slice(0, 6),
};

export function FullServiceAuthorityExperience({
  className,
  variant = "default",
  heading,
  intro,
}: FullServiceAuthorityExperienceProps) {
  const copy = variantCopy[variant];
  const locationFocus =
    variant === "duesseldorf" ? "duesseldorf" : variant === "regensburg" ? "regensburg" : null;
  const shownLocations = locationFocus
    ? authorityLocations.filter((location) => location.id === locationFocus)
    : authorityLocations;

  return (
    <section
      id="service-authority"
      className={cn("border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10", className)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-3 py-2 text-sm font-black text-blue-700 shadow-sm">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              FLOXANT Service-Autorität
            </p>
            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-normal text-slate-950 sm:text-4xl">
              {heading || copy.heading}
            </h2>
          </div>
          <p className="text-base font-semibold leading-8 text-slate-700">{intro || copy.intro}</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <ProblemToServiceMatcher />
          <RecommendedSignatureServices />
          <EnglishIntentRecommendation />
        </div>

        <LocalServiceRecommendation locations={shownLocations} />

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {p0Services.slice(0, 5).map((service) => (
            <Link
              key={service.id}
              href={service.regensburgUrl || service.primaryUrl}
              className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              data-event="service_authority_p0_click"
              data-service={service.id}
            >
              <span className="text-xs font-black uppercase tracking-normal text-blue-700">{service.category}</span>
              <span className="mt-2 block text-sm font-black leading-5 text-slate-950">{service.service}</span>
              <span className="mt-2 block text-xs leading-5 text-slate-600">{service.action}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-black text-blue-700">
                Service öffnen
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemToServiceMatcher() {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
          <FileSearch className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-black text-slate-950">Problem zu Service</h3>
          <p className="text-sm font-semibold text-slate-500">Welche Anfrage passt?</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {authorityProblemGroups.slice(0, 5).map((group) => {
          const service = getAuthorityServiceById(group.recommendedServiceIds[0]);
          return (
            <Link
              key={group.problem}
              href={group.cta}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
              data-event="problem_to_service_click"
            >
              <span className="block text-sm font-black text-slate-950">{group.problem}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-600">
                {service ? service.service : "FLOXANT ordnet die Anfrage ein"}
              </span>
            </Link>
          );
        })}
      </div>
    </article>
  );
}

function RecommendedSignatureServices() {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 text-white">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-black text-slate-950">Besondere Leistungen</h3>
          <p className="text-sm font-semibold text-slate-500">Problemlöser statt Marketingname</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {authoritySignatureServices.slice(0, 5).map((service) => (
          <Link
            key={service.id}
            href={service.cta}
            className="rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
            data-event="recommended_signature_click"
            data-signature-service={service.id}
          >
            <span className="block text-sm font-black text-slate-950">{service.name}</span>
            <span className="mt-1 block text-xs leading-5 text-slate-600">{service.solution}</span>
          </Link>
        ))}
      </div>
    </article>
  );
}

function EnglishIntentRecommendation() {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
          <Globe2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-black text-slate-950">Information in English</h3>
          <p className="text-sm font-semibold text-slate-500">Clear guidance for international customers</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {authorityEnglishIntents.slice(0, 5).map((intent) => (
          <Link
            key={intent.term}
            href={intent.contact}
            className="rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:border-emerald-200 hover:bg-emerald-50"
            data-event="english_intent_contact_click"
          >
            <span className="block text-sm font-black text-slate-950">{intent.term}</span>
            <span className="mt-1 block text-xs leading-5 text-slate-600">{intent.strategy}</span>
          </Link>
        ))}
      </div>
    </article>
  );
}

function LocalServiceRecommendation({ locations }: { locations: typeof authorityLocations }) {
  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-2">
      {locations.map((location) => {
        const services =
          location.id === "duesseldorf" ? locationHighlights.duesseldorf : locationHighlights.regensburg;
        return (
          <article key={location.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {location.name}
                </p>
                <h3 className="mt-2 text-2xl font-black text-slate-950">{location.serviceAreaLabel}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{location.confirmedScope}</p>
              </div>
              <Link
                href={location.primaryUrl}
                className="hidden shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-xs font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 sm:inline-flex"
              >
                Hub
              </Link>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {services.map((service) => (
                <Link
                  key={`${location.id}-${service.id}`}
                  href={location.id === "duesseldorf" ? service.duesseldorfUrl : service.regensburgUrl}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-bold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
                  data-event="local_service_recommendation_click"
                  data-location={location.id}
                  data-service={service.id}
                >
                  {service.service}
                </Link>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
