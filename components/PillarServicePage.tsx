import Link from "next/link";
import { ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";

import { PillarServiceHero } from "@/components/PillarServiceHero";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import type { FloxantVisualVariant } from "@/components/FloxantServiceVisual";
import { germanText } from "@/lib/german-text";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type HeroCard = {
  label: string;
  value: string;
};

type InfoCard = {
  icon: LucideIcon;
  title: string;
  text: string;
};

type LinkItem = {
  href: string;
  label: string;
};

type PillarServicePageProps = {
  dict: any;
  breadcrumbs: BreadcrumbItem[];
  heroBadge: string;
  heroTitle: string;
  heroIntro: string;
  heroImageSrc: string;
  heroImageAlt: string;
  heroCards: HeroCard[];
  visualVariant: FloxantVisualVariant;
  definitionCards: InfoCard[];
  differenceTitle: string;
  differenceCards: InfoCard[];
  costTitle: string;
  costIntro: string;
  costFactors: string[];
  calculatorTitle: string;
  calculatorText: string;
  faqTitle: string;
  faqItems: Array<{ q: string; a: string }>;
  bookingTitle: string;
  bookingText: string;
  serviceLinksTitle: string;
  serviceLinks: LinkItem[];
  cityLinksTitle: string;
  cityLinks: LinkItem[];
};

export function PillarServicePage({
  dict,
  breadcrumbs,
  heroBadge,
  heroTitle,
  heroIntro,
  heroImageSrc,
  heroImageAlt,
  heroCards,
  visualVariant,
  definitionCards,
  differenceTitle,
  differenceCards,
  costTitle,
  costIntro,
  costFactors,
  calculatorTitle,
  calculatorText,
  faqTitle,
  faqItems,
  bookingTitle,
  bookingText,
  serviceLinksTitle,
  serviceLinks,
  cityLinksTitle,
  cityLinks,
}: PillarServicePageProps) {


  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <Breadcrumbs lang="de" items={breadcrumbs} />


      <PillarServiceHero
        eyebrow={heroBadge}
        title={heroTitle}
        intro={heroIntro}
        imageSrc={heroImageSrc}
        imageAlt={heroImageAlt}
        cards={heroCards}
        visualVariant={visualVariant}
      />

      <section id="leistungen" className="flox-section">
        <div className="pointer-events-none absolute inset-0 opacity-28">
          <FloxantSymbolLayer variant={visualVariant} density="soft" />
        </div>
        <div className="flox-shell relative">
          <div className="max-w-3xl">
            <div className="flox-kicker">Service-Architektur</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">Was dieser Service wirklich leistet.</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
              Keine weiche Werbefläche, sondern eine klare Definition für Kunden, die Aufwand,
              Ablauf und regionale Relevanz sauber verstehen wollen.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {definitionCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="flox-panel rounded-[1.7rem] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-[1.45rem] font-bold tracking-tight text-slate-950">
                    {germanText(card.title, card.title)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {germanText(card.text, card.text)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="preis" className="flox-section pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="flox-panel rounded-[1.9rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Preislogik</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">{germanText(costTitle, costTitle)}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
              {germanText(costIntro, costIntro)}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {costFactors.map((factor) => (
                <div
                  key={factor}
                  className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-950/5"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                    <span>{germanText(factor, factor)}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="flox-panel-dark rounded-[1.9rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Direkter Einstieg</div>
            <h3 className="mt-6 text-[2rem] font-bold tracking-[-0.06em] text-white">
              {germanText(calculatorTitle, calculatorTitle)}
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-300">
              {germanText(calculatorText, calculatorText)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/rechner" className="flox-button-primary px-6">
                Zum Rechner
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/buchung" className="flox-button-secondary border-white/12 bg-white/6 px-6 text-white">
                Direkt anfragen
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section id="ablauf" className="flox-section pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="flox-panel-dark rounded-[1.9rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Warum FLOXANT</div>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3.3rem)] font-bold tracking-[-0.07em] text-white">
              {germanText(differenceTitle, differenceTitle)}
            </h2>
            <div className="mt-6 space-y-3">
              {differenceCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] bg-white/8 text-cyan-200">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {germanText(card.title, card.title)}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-300">
                          {germanText(card.text, card.text)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="flox-panel rounded-[1.9rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Ablauf</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">Wie aus einer Anfrage ein sauber geführter Einsatz wird.</h2>
            <div className="mt-6 flox-list-compact">
              {[
                "Bedarf und Rahmen aufnehmen",
                "Aufwand, Zugang und Termin realistisch prüfen",
                "Rückmeldung oder Angebot sauber abstimmen",
                "Erst danach verbindlich planen und durchfuehren",
              ].map((step, index) => (
                <div key={step} className="flox-list-item">
                  <span className="flox-list-step">{index + 1}</span>
                  <span className="text-sm font-semibold leading-7 text-slate-700">{step}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="zusatzservices" className="flox-section pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-2">
          <article className="flox-panel rounded-[1.9rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Weitere Wege</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              {germanText(serviceLinksTitle, serviceLinksTitle)}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {serviceLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>{germanText(item.label, item.label)}</span>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-blue-700" />
                  </div>
                </Link>
              ))}
            </div>
          </article>

          <article id="region" className="flox-panel rounded-[1.9rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Region</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              {germanText(cityLinksTitle, cityLinksTitle)}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {cityLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700 transition-all hover:border-blue-200 hover:bg-white hover:text-slate-950"
                >
                  {germanText(item.label, item.label)}
                </Link>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="kontakt" className="flox-section pt-0">
        <div className="flox-shell">
          <div id="booking" className="relative -top-24 block h-0 w-0" />
          <div className="mb-10 text-center">
            <div className="flox-kicker">Direkte Anfrage</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              {germanText(bookingTitle, bookingTitle)}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-700">
              {germanText(bookingText, bookingText)}
            </p>
          </div>

          <div className="flox-panel rounded-[2rem] p-4 md:p-6">
            <SmartBookingWizard
              dict={{
                common: dict.common,
                calculator: dict.calculator,
                booking: dict.booking,
              }}
            />
          </div>
        </div>
      </section>

      <section className="flox-section pt-0">
        <div className="flox-shell">
          <div className="flox-panel rounded-[1.9rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">FAQ</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">{germanText(faqTitle, faqTitle)}</h2>
            <div className="mt-6 grid gap-3">
              {faqItems.map((item) => (
                <details key={item.q} className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4">
                  <summary className="cursor-pointer list-none text-base font-semibold text-slate-950">
                    {germanText(item.q, item.q)}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {germanText(item.a, item.a)}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
