import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Phone } from "lucide-react";

import { ContactLeadForm } from "@/components/ContactQueryPersonalization";
import { company } from "@/lib/company";
import { resolveLeadIntent } from "@/lib/lead-intents";
import type { RequestLocation } from "@/lib/lead-intents/resolve-request-context";

type BookingLink = { href: string; label: string };
type BookingFaq = { question: string; answer: string };

export type LocalBookingPageProps = {
  city: "Regensburg" | "Düsseldorf";
  location: Exclude<RequestLocation, "unsicher">;
  path: `/${string}/buchen`;
  intro: string;
  serviceLinks: readonly BookingLink[];
  faq: readonly BookingFaq[];
};

export function LocalBookingPage({
  city,
  location,
  path,
  intro,
  serviceLinks,
  faq,
}: LocalBookingPageProps) {
  const fallbackIntent = resolveLeadIntent({
    path,
    service: "kontakt",
    city: location,
    intent: `${location}-terminanfrage`,
    priority: "p1",
  });

  return (
    <main className="overflow-x-clip bg-slate-50 text-slate-950">
      <section className="bg-slate-950 px-5 pb-14 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/25 bg-cyan-200/10 px-3 py-2 text-sm font-black text-cyan-100">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              FLOXANT {city}
            </p>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
              Angebot und Termin in {city} anfragen
            </h1>
            <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-slate-200 sm:text-lg">
              {intro} Wählen Sie die Leistung und senden Sie Ihre Eckdaten; FLOXANT prüft die Anfrage und meldet sich zur Abstimmung.
            </p>
            <a
              href={`tel:${company.phoneRaw}`}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 text-sm font-black text-white transition hover:bg-white/10"
              data-event="phone_click"
              data-source={`${location}_booking_page`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {company.phone} anrufen
            </a>
            <ul className="mt-7 grid gap-3 text-sm font-bold text-slate-200">
              {["Anfrage ohne Login", "Fotos und Dateien mitsenden", "Termin erst nach persönlicher Prüfung"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Suspense fallback={<div className="min-h-96 rounded-lg bg-white" aria-label="Anfrageformular wird geladen" />}>
            <ContactLeadForm
              fallbackIntent={fallbackIntent}
              defaultLocation={location}
              sourcePage={path}
            />
          </Suspense>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black">Leistung vorab ansehen</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-14 items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-900 transition hover:border-cyan-300 hover:bg-cyan-50"
              >
                {item.label}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-cyan-800">Häufige Fragen</p>
            <h2 className="mt-3 text-3xl font-black">Vor der Terminanfrage kurz geklärt</h2>
          </div>
          <div className="grid gap-3">
            {faq.map((item, index) => (
              <details key={item.question} open={index === 0} className="rounded-lg border border-slate-200 bg-white p-5">
                <summary className="cursor-pointer font-black">{item.question}</summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
