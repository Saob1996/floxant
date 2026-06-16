import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileSearch } from "lucide-react";

import { ServiceVisualBlock } from "@/components/ServiceVisualBlock";
import { getServiceVisual } from "@/lib/service-visuals";

type ServicePageCustomerSectionsProps = {
  region: "duesseldorf" | "regensburg";
  city: "Düsseldorf" | "Regensburg";
  path: string;
  serviceSlug: string;
  serviceLabel: string;
  audience: string;
  summary: string;
  services: readonly { title: string; text: string; href?: string }[];
  relatedLinks: readonly { href: string; label: string }[];
  offerCheckHref?: string;
  className?: string;
};

const combinedByRegion = {
  duesseldorf: [
    {
      title: "Reinigung + Entsorgung",
      text: "Wenn vor der Reinigung noch Möbel, Kellerinhalt oder kleinere Restmengen geklärt werden müssen.",
      href: "/duesseldorf/entsorgung",
    },
    {
      title: "Endreinigung vor Übergabe",
      text: "Für Auszug, Leerstand oder Übergabetermin, wenn Küche, Bad, Böden und sichtbare Bereiche stimmen sollen.",
      href: "/duesseldorf/endreinigung",
    },
    {
      title: "Gewerbereinigung + Angebotsprüfung",
      text: "Für Firmen, Praxen und Hausverwaltungen, wenn ein bestehendes Angebot sachlich geprüft werden soll.",
      href: "/angebot-vergleichen-duesseldorf",
    },
  ],
  regensburg: [
    {
      title: "Umzug + Reinigung",
      text: "Wenn Wohnungswechsel, Restmengen und Endreinigung zeitlich zusammenpassen müssen.",
      href: "/regensburg/umzug-reinigung",
    },
    {
      title: "Entrümpelung + Reinigung",
      text: "Wenn Räume nach der Räumung wieder nutzbar oder übergabefähig vorbereitet werden sollen.",
      href: "/regensburg/entruempelung",
    },
    {
      title: "Haushaltsauflösung + Übergabe",
      text: "Wenn Räumung, Fotos, Restpunkte und Übergabetermin ruhig abgestimmt werden sollen.",
      href: "/regensburg/haushaltsaufloesung",
    },
  ],
} as const;

const processSteps = [
  "Anfrage, Fotos oder vorhandenes Angebot senden.",
  "FLOXANT prüft Ort, Umfang, Zustand, Zugang und Termin.",
  "Sie erhalten Rückfragen oder eine klare erste Einschätzung.",
  "Erst danach werden Termin, Angebot oder nächster Schritt abgestimmt.",
] as const;

export function ServicePageCustomerSections({
  region,
  city,
  path,
  serviceSlug,
  serviceLabel,
  audience,
  summary,
  services,
  relatedLinks,
  offerCheckHref,
  className = "",
}: ServicePageCustomerSectionsProps) {
  const visual = getServiceVisual({
    region,
    slug: serviceSlug,
    path,
    serviceLabel,
  });
  const offerHref =
    offerCheckHref || (region === "duesseldorf" ? "/angebot-vergleichen-duesseldorf" : "/anbieter-vergleichen");

  return (
    <div className={`space-y-8 ${className}`}>
      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
        <ServiceVisualBlock visual={visual} />
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">
            Für Ihre Anfrage
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Worum es auf dieser Seite geht
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
            {summary}
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Gedacht für {audience} in {city}. Für den Start reichen Ort,
            gewünschter Zeitraum, kurze Eckdaten und nach Möglichkeit Fotos.
            Die Anfrage bleibt kostenlos und unverbindlich, bis Umfang und Termin
            gemeinsam abgestimmt sind.
          </p>
        </article>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_44px_rgba(15,23,42,0.06)] sm:p-7">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">
            Passende Startpunkte
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Leistungen passend zu Ihrer Situation.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
            Starten Sie mit dem Punkt, der Ihrem Fall am nächsten kommt, oder
            senden Sie direkt die wichtigsten Eckdaten. FLOXANT ordnet Objekt,
            Zustand, Ziel und nächsten Schritt sauber ein.
          </p>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((item) => {
            const Wrapper = item.href ? Link : "article";
            return (
              <Wrapper
                key={item.title}
                href={item.href || "#"}
                className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-white hover:shadow-sm"
                data-event={item.href ? "service_card_click" : undefined}
                data-region={region}
                data-service={serviceSlug}
              >
                <CheckCircle2 className="h-5 w-5 text-blue-700" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
                {item.href ? (
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                    Ansehen
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                ) : null}
              </Wrapper>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <article className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_44px_rgba(15,23,42,0.14)] sm:p-7">
          <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
            Kombinierte Leistungen
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal">
            Wenn mehrere Aufgaben zusammenkommen.
          </h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">
            Manche Anfragen bestehen nicht aus einer einzelnen Leistung. Dann zählt
            die Reihenfolge: Was muss zuerst erledigt werden, welche Punkte gehören
            zusammen und welcher Termin ist für Übergabe, Nutzung oder Rückmeldung
            entscheidend?
          </p>
        </article>
        <div className="grid gap-4 md:grid-cols-3">
          {combinedByRegion[region].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              data-event="service_card_click"
              data-region={region}
              data-service={serviceSlug}
            >
              <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                Kombi ansehen
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)] sm:p-7">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">
            So läuft die Anfrage ab
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm font-bold leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-[0_18px_44px_rgba(37,99,235,0.08)] sm:p-7">
          <FileSearch className="h-6 w-6 text-blue-700" aria-hidden="true" />
          <p className="mt-4 text-sm font-black uppercase tracking-normal text-blue-700">
            Bereits ein Angebot erhalten?
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
            Angebot oder Eckdaten prüfen lassen.
          </h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">
            Senden Sie uns Ihr bestehendes Angebot oder die wichtigsten Eckdaten.
            FLOXANT prüft kostenlos und unverbindlich, ob Umfang, Termin und
            Preisrahmen stimmig beschrieben sind und ob eine passende Alternative
            möglich ist.
          </p>
          <Link
            href={offerHref}
            className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
            data-event="service_card_click"
            data-region={region}
            data-service={serviceSlug}
          >
            Angebot prüfen lassen
            <ClipboardCheck className="h-4 w-4" />
          </Link>
        </article>
      </section>

      {relatedLinks.length > 0 ? (
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)] sm:p-7">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">
            Verwandte Leistungen
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {relatedLinks.slice(0, 8).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:bg-white hover:text-blue-700"
                data-event="service_card_click"
                data-region={region}
                data-service={serviceSlug}
              >
                {item.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
