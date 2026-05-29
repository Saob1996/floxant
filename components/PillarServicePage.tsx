import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  KeyRound,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantStorytellingSection } from "@/components/FloxantStorytellingSection";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";

import { PillarServiceHero } from "@/components/PillarServiceHero";
import { SearchDominanceExperience } from "@/components/seo/SearchDominanceExperience";
import { SearchIntentExpansion } from "@/components/seo/SearchIntentExpansion";
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
  const handoverPackage = [
    {
      title: "Transport und Tragen",
      text: "Möbel, Kartons und relevante Gegenstände werden nicht isoliert betrachtet, sondern im Zusammenhang mit Termin, Zugang und Übergabeziel.",
      Icon: PackageCheck,
    },
    {
      title: "Endreinigung nach Absprache",
      text: "Reinigung wird mit Blick auf Abnahme, Eindruck und Nutzbarkeit geplant, nicht nur als lose Zusatzposition.",
      Icon: CheckCircle2,
    },
    {
      title: "Rest-Entrümpelung",
      text: "Kleine Restmengen, Keller- oder Nebenflächen können eingeordnet werden, damit die Wohnung nicht halbfertig zurückbleibt.",
      Icon: ClipboardCheck,
    },
    {
      title: "Fotos, Schlüssel und Protokoll",
      text: "Auf Wunsch werden Fotodokumentation, Schlüsselübergabe und ein einfacher Übergabehinweis als Abschlusslogik mitgedacht.",
      Icon: KeyRound,
    },
  ] as const;
  const jumpLinks = [
    {
      href: "#leistungen",
      label: "Leistung verstehen",
      text: "Worum es geht, wann der Service passt und was vor der Anfrage wichtig ist.",
    },
    {
      href: "#preis",
      label: "Preislogik",
      text: "Welche Faktoren Aufwand, Einsatzplanung und Preisrahmen beeinflussen.",
    },
    {
      href: "#ablauf",
      label: "Ablauf prüfen",
      text: "Wie aus einer ersten Anfrage ein planbarer und sauber abgestimmter Einsatz wird.",
    },
    {
      href: "#booking",
      label: "Direkt anfragen",
      text: "Ohne Umweg in die Buchung wechseln, wenn Umfang und Ziel schon grob klar sind.",
    },
  ] as const;
  const storyVariant =
    visualVariant === "cleaning" ? "cleaning" : visualVariant === "clearance" ? "clearance" : "operations";

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

      <FloxantStorytellingSection
        variant={storyVariant}
        eyebrow="FLOXANT Story"
        title="So wird aus einer groben Idee ein sauber planbarer Auftrag."
        intro="Kunden müssen nicht alles vollständig vorbereiten. FLOXANT hilft, aus Fotos, Ort, Termin, Umfang und Budget einen klaren nächsten Schritt zu machen."
        primaryHref="/buchung"
        primaryLabel="Anfrage starten"
        secondaryHref="/angebot-guenstiger-pruefen"
        secondaryLabel="Angebot prüfen"
        className="pt-8"
      />

      <SearchDominanceExperience variant="pillar" className="py-8" />

      <SearchIntentExpansion
        route={breadcrumbs[breadcrumbs.length - 1]?.href || `/${heroBadge.toLowerCase().replace(/\s+/g, "-")}`}
        city="Regensburg"
        serviceName={heroTitle}
        relatedLinks={[...serviceLinks, ...cityLinks].slice(0, 6)}
        className="pt-4"
      />

      <section className="flox-section pt-0">
        <div className="flox-shell">
          <div className="rounded-[1.9rem] border border-blue-100 bg-[linear-gradient(135deg,rgba(239,246,255,0.95),rgba(255,255,255,1))] p-4 shadow-sm shadow-slate-950/5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="flox-kicker">Schnell zum richtigen Abschnitt</div>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                  Erst orientieren, dann anfragen.
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Diese Sprungpunkte helfen dabei, Preislogik, Ablauf und den passenden Einstieg
                  ohne Scroll-Suche direkt zu erreichen.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {jumpLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-[1.35rem] border border-white bg-white px-4 py-4 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-950">{item.label}</span>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="leistungen" className="flox-section">
        <div className="pointer-events-none absolute inset-0 opacity-28">
          <FloxantSymbolLayer variant={visualVariant} density="soft" />
        </div>
        <div className="flox-shell relative">
          <div className="max-w-3xl">
            <div className="flox-kicker">Was Kunden wissen müssen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">Leistung, Umfang und nächster Schritt auf einen Blick.</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
              Hier geht es um die Fragen vor einer Anfrage: Was wird übernommen, wann ist
              der Service sinnvoll, welche Angaben brauchen wir und wie kommen Sie ohne
              Umwege zum passenden Einstieg?
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
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Schnell entscheiden</div>
            <h3 className="mt-6 text-[2rem] font-bold tracking-[-0.025em] text-white">
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
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Warum der Ablauf zählt</div>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3.3rem)] font-bold tracking-[-0.025em] text-white">
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
            <h2 className="mt-6 flox-title-lg text-slate-950">So wird aus Ihrer Anfrage ein planbarer Einsatz.</h2>
            <div className="mt-6 flox-list-compact">
              {[
                "Kurz klären, was erledigt werden soll und welches Ergebnis am Ende zählt",
                "Aufwand, Zugang, Laufwege, Termin und besondere Risiken realistisch prüfen",
                "Rückmeldung oder Angebot mit klaren Leistungsgrenzen abstimmen",
                "Erst danach verbindlich planen und sauber durchführen",
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

      <section id="uebergabe-komplettpaket" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div className="flox-kicker">Signatur-Service</div>
                <h2 className="mt-6 flox-title-lg text-slate-950">
                  Wohnungsübergabe-Komplettpaket
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  Für alle, die eine Wohnung nicht nur verlassen, sondern sauber abschließen müssen:
                  Umzug, Endreinigung, kleine Rest-Entrümpelung und Schlüsselübergabe können als ein
                  abgestimmter Ablauf geprüft werden. Das ist besonders sinnvoll, wenn Termin,
                  Vermieter, Hausverwaltung und Kaution zusammenhängen.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/buchung" className="flox-button-primary px-6">
                    Übergabe vorbereiten lassen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/rechner" className="flox-button-secondary px-6">
                    Kosten einschätzen
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {handoverPackage.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <article
                      key={item.title}
                      className="rounded-[1.35rem] border border-slate-200 bg-white px-4 py-4 shadow-sm shadow-slate-950/5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] bg-blue-50 text-blue-700">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="zusatzservices" className="flox-section pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-2">
          <article className="flox-panel rounded-[1.9rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Direkt zum passenden Weg</div>
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
            <div className="flox-kicker">Orte nur dort, wo sinnvoll</div>
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
              {faqItems.map((item, index) => (
                <details
                  key={item.q}
                  className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4"
                  open={index === 0}
                >
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
