import Link from "next/link";
import { Building2, CheckCircle2, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { company } from "@/lib/company";

type LocalTrustBlockProps = {
  className?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

const trustSignals = [
  {
    title: "Regensburg als Mittelpunkt",
    text: "Adresse, Telefon, E-Mail und Servicegebiet kommen aus den zentralen FLOXANT-Unternehmensdaten.",
  },
  {
    title: "Reinigung im 50-km-Radius",
    text: "Reinigungsanfragen werden nach Objekt, Route, Zugang und Termin im Regensburger Umfeld eingeordnet.",
  },
  {
    title: "Keine erfundenen Belege",
    text: "Keine Sterne, Referenzen, Siegel oder Logos erscheinen ohne realen Nachweis und Freigabe.",
  },
  {
    title: "Klare Anfrage statt Blindpreis",
    text: "Fotos, Raumliste, Turnus und Zielzustand sind wichtiger als pauschale Quadratmeterpreise.",
  },
] as const;

export function LocalTrustBlock({
  className = "",
  ctaHref = "/buchung?region=regensburg&service=reinigung#buchungssystem",
  ctaLabel = "Reinigung mit Eckdaten anfragen",
}: LocalTrustBlockProps) {
  return (
    <section className={`bg-white px-5 py-14 sm:px-8 lg:px-10 ${className}`} aria-labelledby="local-trust-title">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Lokale Vertrauensbasis
          </p>
          <h2 id="local-trust-title" className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
            Reinigungsanfragen bleiben auf Regensburg, Objekt und Nachweisbarkeit fokussiert.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
            FLOXANT baut lokale Autorität über klare Kontaktdaten, nachvollziehbare Einsatzgrenzen und konkrete
            Anfrageinformationen auf. Es werden keine Sterne, Kundenreferenzen oder Zertifizierungen behauptet, die
            nicht als echte Geschäftsdaten vorliegen.
          </p>

          <div className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm font-semibold leading-7 text-slate-700">
            <div className="flex gap-3">
              <Building2 className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
              <span>{company.name}, {company.address}</span>
            </div>
            <a
              href={`tel:${company.phoneRaw}`}
              data-event="phone_click"
              data-region="regensburg"
              data-service="reinigung"
              className="flex gap-3 text-slate-700 transition hover:text-blue-700"
            >
              <Phone className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
              <span>{company.phone}</span>
            </a>
            <a
              href={`mailto:${company.email}`}
              data-event="email_click"
              data-region="regensburg"
              data-service="reinigung"
              className="flex gap-3 text-slate-700 transition hover:text-blue-700"
            >
              <Mail className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
              <span>{company.email}</span>
            </a>
          </div>

          <Link
            href={ctaHref}
            data-event="request_cta_click"
            data-region="regensburg"
            data-service="reinigung"
            data-source="local_trust_block"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
          >
            {ctaLabel}
            <MapPin className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {trustSignals.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <CheckCircle2 className="h-5 w-5 text-emerald-700" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
