import Link from "next/link";
import { ArrowRight, Camera, FileSearch, Languages } from "lucide-react";

type InternationalCustomerHintProps = {
  cityLabel?: string;
  serviceLabel?: string;
  tags?: readonly string[];
  primaryHref?: string;
  photoHref?: string;
  offerHref?: string;
  className?: string;
};

const defaultTags = [
  "Cleaning service",
  "Moving help",
  "Office cleaning",
  "House clearance",
  "Solar panel cleaning",
] as const;

export function InternationalCustomerHint({
  cityLabel = "Düsseldorf oder Regensburg",
  serviceLabel = "Umzug, Reinigung, Räumung oder Solar/PV",
  tags = defaultTags,
  primaryHref = "/kontakt#direktanfrage",
  photoHref = "/buchung#buchungssystem",
  offerHref = "/angebot-guenstiger-pruefen#guenstiger-form",
  className = "",
}: InternationalCustomerHintProps) {
  return (
    <section
      id="international-customers"
      className={`border-y border-slate-200 bg-white px-5 py-12 sm:px-8 lg:px-10 ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <article>
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <Languages className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-4 text-sm font-black uppercase tracking-normal text-blue-700">
            Auch für internationale Kunden verständlich
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
            Anfrage auf Deutsch oder Englisch möglich.
          </h2>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-700">
            Sie suchen nach {tags.slice(0, 3).join(", ")} oder {tags[3] || "moving help"} in {cityLabel}?
            Beschreiben Sie {serviceLabel} einfach kurz. Ort, Fotos, Termin und ein Kontaktweg reichen
            für die erste Einordnung.
          </p>
        </article>

        <div className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black uppercase tracking-normal text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href={primaryHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-blue-800"
            >
              Anfrage senden
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={photoHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-900 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
              Fotos senden
            </Link>
            <Link
              href={offerHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 text-sm font-black text-emerald-900 transition hover:bg-emerald-100"
            >
              <FileSearch className="h-4 w-4" aria-hidden="true" />
              Angebot prüfen lassen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
