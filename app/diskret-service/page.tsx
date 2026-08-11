import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Handshake,
  Home,
  KeyRound,
  Languages,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceFinder } from "@/components/ContactPathChooser";
import { PhotoGuidanceBlock } from "@/components/PhotoGuidanceBlock";
import { RequestChecklistBlock } from "@/components/RequestChecklistBlock";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/diskret-service";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path: "diskret-service",
  title: "Diskret-Service für sensible Anfragen – Umzug, Entrümpelung und Auflösung",
  description:
    "Sensible Anfrage? Beschreiben Sie Umzug, Entrümpelung, Auflösung, Reinigung oder ein Angebot mit wenigen vertraulichen Angaben.",
});

const primaryHref = "/kontakt?service=diskret-service&city=duesseldorf&intent=diskret-service-anfrage&source=website";
const caseHref = "/kontakt?service=diskret-service&city=duesseldorf&intent=diskreter-fall&source=website";
const offerHref = "/kontakt?service=angebotscheck&city=duesseldorf&intent=diskretes-angebot-pruefen&source=website";

const quickTrust = [
  "Bevorzugter Kontaktweg kann angegeben werden.",
  "Private Details sind im ersten Schritt nicht nötig.",
  "Fotos oder ein vorhandenes Angebot sind optional.",
  "Keine automatische Buchung durch die Anfrage.",
] as const;

const situations = [
  "Trennung oder Scheidung",
  "Nachlass oder Todesfall",
  "Haushaltsauflösung mit Angehörigen",
  "diskrete Entrümpelung",
  "sensible Wohnungssituation",
  "Umzug mit vertraulicher Kommunikation",
  "Messie-Kontext würdevoll und ohne Scham-Sprache",
  "Vermieter- oder Übergabe-Fall",
  "Angebot wirkt unklar",
  "Kunde will nicht alles telefonisch erklären",
] as const;

const processSteps = [
  "Situation kurz und zurückhaltend beschreiben",
  "bevorzugten Kontaktweg wählen",
  "Service grob auswählen",
  "Ort und Frist angeben",
  "Fotos oder Angebot optional ergaenzen",
  "FLOXANT ordnet Anfrage und nächste Schritte ein",
  "Rückmeldung über die gewuenschte Kontaktmöglichkeit",
] as const;

const neededItems = [
  "grober Servicebedarf",
  "Stadt oder Ort",
  "bevorzugter Kontaktweg",
  "kurze Beschreibung",
  "Frist oder Termin, falls wichtig",
  "Fotos optional",
  "vorhandenes Angebot optional",
  "sensible Hinweise optional",
] as const;

const notNeededItems = [
  "keine ausführlichen privaten Details im ersten Schritt",
  "keine vollständige Adresse im ersten Kontakt, wenn nicht nötig",
  "keine Rechtfertigung",
  "keine Scham-Erklärung",
] as const;

const boundaries = [
  "keine Rechtsberatung",
  "keine Pflegeberatung",
  "keine medizinische Beratung",
  "keine psychologische Beratung",
  "keine Preisgarantie",
  "keine Soforttermin-Garantie",
  "keine garantierte Verfügbarkeit",
  "keine automatische Buchung durch Anfrage",
] as const;

const serviceLinks = [
  {
    title: "Diskrete Entrümpelung",
    text: "Räume, Menge, Freigabe, Fotos und Reinigung danach ruhig einordnen.",
    href: "/kontakt?service=diskret-service&city=duesseldorf&intent=diskrete-entruempelung&source=website",
    Icon: ClipboardCheck,
  },
  {
    title: "Diskreter Umzug",
    text: "Start, Ziel, Zeitraum und Kontaktweg klären, ohne private Details zu erzwingen.",
    href: "/diskreter-umzug-trennung-scheidung",
    Icon: Truck,
  },
  {
    title: "Haushaltsauflösung",
    text: "Haushalt, Haus oder Wohnung mit Freigabe, Nachlass und Zielzustand sortieren.",
    href: "/regensburg/haushaltsaufloesung",
    Icon: Home,
  },
  {
    title: "Wohnungsauflösung",
    text: "Wohnung, Keller, Restmengen, Zugang und Übergabe mit den wichtigsten Angaben vorbereiten.",
    href: "/regensburg/wohnungsaufloesung",
    Icon: KeyRound,
  },
  {
    title: "Nachlassauflösung",
    text: "Nachlassfragen praktisch einordnen, ohne Rechts- oder Wertberatung zu behaupten.",
    href: "/nachlassaufloesung",
    Icon: Handshake,
  },
  {
    title: "Reinigung nach Entrümpelung",
    text: "Zielzustand, Flächen, Fotos und Übergabe nach der Räumung mitdenken.",
    href: "/regensburg/reinigung",
    Icon: Sparkles,
  },
  {
    title: "Objektbrief",
    text: "Unsichere Faelle mit Fotos, Umfang, Frist und offenen Punkten sortieren.",
    href: "/objektbrief",
    Icon: FileCheck2,
  },
  {
    title: "Übergabeakte",
    text: "Fotos, Schlüsselstatus, Restpunkte und Übergabehinweise buendeln.",
    href: "/uebergabeakte",
    Icon: BriefcaseBusiness,
  },
  {
    title: "Plan-B-Service",
    text: "Wenn Anbieter absagen, Termine kippen oder ein zweiter Ablauf gebraucht wird.",
    href: "/plan-b-service",
    Icon: ShieldCheck,
  },
  {
    title: "Angebotsprüfung",
    text: "Umfang, Ort, Frist, Zusatzkosten und offene Punkte sachlich einordnen.",
    href: offerHref,
    Icon: CheckCircle2,
  },
] as const;

const localLinks = [
  {
    title: "Regensburg diskret starten",
    text: "Für Entrümpelung, Umzug, Wohnungsauflösung, Reinigung oder Übergabe im echten Servicegebiet.",
    href: "/kontakt?service=diskret-service&city=regensburg&intent=diskrete-entruempelung-regensburg&source=website",
  },
  {
    title: "Düsseldorf diskret starten",
    text: "Für lokale Entrümpelung oder Haushaltsauflösung in Düsseldorf ohne Fake-Niederlassung.",
    href: "/kontakt?service=diskret-service&city=duesseldorf&intent=diskrete-entruempelung-duesseldorf&source=website",
  },
  {
    title: "Angebot sensibel prüfen",
    text: "Wenn ein Angebot für Räumung, Reinigung oder Umzug unklar wirkt.",
    href: offerHref,
  },
] as const;

const faqItems = [
  {
    q: "Wann ist der Diskret-Service sinnvoll?",
    a: "Der Diskret-Service ist sinnvoll, wenn eine Anfrage rückhaltende Kommunikation braucht: etwa bei Trennung, Nachlass, Todesfall, sensibler Wohnungssituation, diskreter Entrümpelung, Umzug, Reinigung, Übergabe oder einem unklaren Angebot.",
  },
  {
    q: "Muss ich sensible Details direkt erklären?",
    a: "Nein. Für den ersten Schritt reichen Ort, grober Servicebedarf, Frist und bevorzugter Kontaktweg. Private Details können später nur soweit nötig geklaert werden.",
  },
  {
    q: "Kann ich einen bevorzugten Kontaktweg wählen?",
    a: "Ja. Sie können Rückruf, WhatsApp, E-Mail oder ein bestimmtes Zeitfenster nennen. FLOXANT nutzt diese Angabe für die weitere Einordnung, soweit es praktisch möglich ist.",
  },
  {
    q: "Ist der Diskret-Service für Trennung oder Nachlass geeignet?",
    a: "Ja, wenn es um praktische Leistungen wie Umzug, Entrümpelung, Wohnungsauflösung, Reinigung, Schlüssel oder Übergabe geht. FLOXANT gibt dabei keine Rechts-, Pflege-, Medizin- oder psychologische Beratung.",
  },
  {
    q: "Kann eine diskrete Entrümpelung angefragt werden?",
    a: "Ja. Nennen Sie grob Räume, Menge, Zugang, Freigabe, Zielzustand und Kontaktweg. Fotos sind hilfreich, aber nicht im ersten Schritt verpflichtend.",
  },
  {
    q: "Kann ein Angebot diskret geprüft werden?",
    a: "Ja. Ein Angebot kann nach Umfang, Ort, Frist, Leistungsbeschreibung und moeglichen Zusatzkosten eingeordnet werden. Es gibt keine Ersparnisgarantie und keine Rechtsberatung.",
  },
  {
    q: "Was passiert nach dem Absenden?",
    a: "FLOXANT prüft Ihre Angaben und meldet sich über den gewählten Kontaktweg. Eine Anfrage ist noch keine automatische Buchung.",
  },
  {
    q: "Can I send the request in English?",
    a: "Yes. International customers can describe a discreet or private client request in simple English. FLOXANT can help structure moving, decluttering, house clearance or cleaning requests without unnecessary first-step details.",
  },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildBreadcrumbJsonLd([
      { name: "FLOXANT", item: "/" },
      { name: "Diskret-Service", item: path },
    ]),
    buildWebPageJsonLd({
      name: "Diskret-Service fuer sensible Anfragen",
      description:
        "Diskrete und sensible Anfragen zu Umzug, Entrümpelung, Auflösung, Nachlass, Reinigung, Übergabe oder Angebot ruhig einordnen.",
      path,
      about: [
        "diskreter service",
        "diskrete Entrümpelung",
        "diskreter Umzug",
        "sensible Anfrage",
        "bevorzugter Kontaktweg",
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Diskret-Service",
      description:
        "Rückhaltender Anfrageweg für sensible Faelle rund um Umzug, Entrümpelung, Haushaltsauflösung, Wohnungsauflösung, Nachlass, Reinigung, Übergabe und Angebotsprüfung.",
      path,
      serviceType: "Diskrete Serviceanfrage und praktische Einordnung",
      areaServed: ["Regensburg", "Düsseldorf", "Bayern nach Machbarkeit", "Deutschland nach Anfrage"],
    }),
    buildFaqJsonLd(faqItems),
  ],
};

function TrackingLink({
  href,
  children,
  className,
  label,
}: {
  href: string;
  children: ReactNode;
  className: string;
  label: string;
}) {
  const query = new URL(href, "https://www.floxant.de").searchParams;
  return (
    <Link
      href={href}
      className={className}
      data-event="request_cta_click"
      data-service={query.get("service") || "diskret-service"}
      data-city={query.get("city") || "deutschland"}
      data-cta-label={label}
      data-destination={href}
    >
      {children}
    </Link>
  );
}

export default function DiskretServicePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5f1] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Diskret-Service" }]} />

      <section className="relative px-4 pb-12 pt-10 sm:px-6 lg:pb-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-normal text-slate-600 shadow-sm">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Diskret-Service für sensible Anfragen
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              Diskret-Service für sensible Anfragen – Umzug, Entrümpelung und Auflösung zurückhaltend klären
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Manche Anfragen brauchen mehr Zurückhaltung als ein normales Serviceformular. Bei Trennung,
              Nachlass, Todesfall, sensibler Wohnungssituation, diskreter Entrümpelung oder diskretem Umzug
              können Sie kurz beschreiben, worum es geht, und den bevorzugten Kontaktweg wählen. FLOXANT
              prüft die Anfrage anhand der genannten Eckdaten - ohne unnoetige Details zu erzwingen.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackingLink
                href={primaryHref}
                label="Diskreten Fall beschreiben"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-slate-800"
              >
                Diskreten Fall beschreiben
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackingLink>
              <TrackingLink
                href={caseHref}
                label="Bevorzugten Kontaktweg angeben"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 text-sm font-black text-slate-900 transition hover:bg-slate-50"
              >
                Bevorzugten Kontaktweg angeben
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </TrackingLink>
              <TrackingLink
                href={offerHref}
                label="Angebot diskret prüfen lassen"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-900 transition hover:bg-emerald-100"
              >
                Angebot diskret prüfen lassen
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              </TrackingLink>
            </div>
            <div className="mt-5 grid gap-2 text-sm font-bold text-slate-600 sm:grid-cols-2">
              {quickTrust.map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-slate-300/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white bg-white shadow-2xl shadow-slate-950/10">
              <Image
                src="/assets/diskret-service-hero.webp"
                alt="Neutrale Unterlagen, Schlüssel und Kartons für eine diskrete Serviceanfrage"
                width={1536}
                height={1024}
                priority
                unoptimized
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="grid gap-3 p-5 sm:grid-cols-3">
                {[
                  { label: "Kontaktweg", value: "waehlbar" },
                  { label: "Details", value: "minimal" },
                  { label: "Angebot", value: "optional" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs font-black uppercase tracking-normal text-slate-500">{item.label}</div>
                    <div className="mt-1 text-lg font-black text-slate-950">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceFinder
        compact
        currentCity="bayern"
        title="Diskrete Unterstützung passend auswählen."
        intro="Die Auswahl setzt nur den Kontaktpfad. Private Details und Anfrage entstehen erst im Formular."
        source="diskret-service-finder"
      />

      <RequestChecklistBlock
        serviceKey="diskret-service"
        ctaHref={primaryHref}
        ctaLabel="Diskrete Eckdaten vorbereiten"
        compact
      />
      <PhotoGuidanceBlock serviceKey="diskret-service" compact />

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-normal text-slate-500">Kurz erklärt</div>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
                Der erste Schritt darf kurz bleiben.
              </h2>
            </div>
            <p className="text-base leading-8 text-slate-700">
              Der FLOXANT Diskret-Service ist für sensible Anfragen gedacht, bei denen zurückhaltende
              Kommunikation wichtig ist. Dazu gehören diskrete Entrümpelung, diskreter Umzug,
              Haushaltsauflösung, Nachlass, Trennung oder andere private Situationen. Sie müssen im ersten
              Schritt nur so viel beschreiben, wie für eine Einordnung nötig ist.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-xs font-black uppercase tracking-normal text-slate-500">Kundensituationen</div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Für Situationen, die ruhig eingeordnet werden sollten.
            </h2>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {situations.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700 shadow-sm shadow-slate-950/5">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="rounded-lg bg-slate-950 p-6 text-white lg:p-8">
            <div className="text-xs font-black uppercase tracking-normal text-slate-300">Ablauf</div>
            <h2 className="mt-3 text-3xl font-black tracking-normal">
              Von kurzer Lagebeschreibung zu nächsten Schritten.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              FLOXANT prüft zuerst den praktischen Rahmen. Es geht um Service, Ort, Frist, Kontaktweg,
              Umfang und Grenzen - nicht um Rechtfertigung oder private Erklärungen.
            </p>
          </div>
          <div className="grid gap-3">
            {processSteps.map((step, index) => (
              <div key={step} className="grid grid-cols-[3rem_1fr] items-center rounded-lg border border-slate-200 bg-white p-3 shadow-sm shadow-slate-950/5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </span>
                <span className="text-sm font-bold leading-6 text-slate-700">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          <InfoList title="Was FLOXANT braucht" items={neededItems} tone="white" />
          <InfoList title="Was nicht nötig ist" items={notNeededItems} tone="white" />
          <InfoList title="Was nicht versprochen wird" items={boundaries} tone="amber" />
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <div className="text-xs font-black uppercase tracking-normal text-slate-500">Service-Verknuepfungen</div>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
                Diskret-Service kann mit mehreren FLOXANT Wegen kombiniert werden.
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-600 lg:text-right">
              Diese Links sind bewusst kuratiert. Sie ersetzen keine Anfrage, helfen aber, Umzug,
              Entrümpelung, Auflösung, Reinigung, Objektbrief, Übergabe und Angebot sauber zu trennen.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {serviceLinks.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
                >
                  <Icon className="h-5 w-5 text-slate-700" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-black tracking-normal text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-slate-900">
                    Öffnen
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-lg border border-emerald-200 bg-emerald-50 p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-normal text-emerald-800">Angebotsprüfung</div>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
                Angebot für einen sensiblen Fall prüfen lassen
              </h2>
            </div>
            <div>
              <p className="text-sm font-semibold leading-7 text-emerald-950/85">
                Wenn ein Angebot für Entrümpelung, Haushaltsauflösung, Umzug oder Reinigung in einer
                sensiblen Situation unklar wirkt, kann FLOXANT die wichtigsten Angaben prüfen. Wichtig
                sind Umfang, Ort, Frist, Leistungsbeschreibung und moegliche Zusatzkosten. Es gibt keine
                Ersparnisgarantie und keine Rechtsberatung.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <TrackingLink
                  href={offerHref}
                  label="Diskretes Angebot prüfen lassen"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-900 px-5 text-sm font-black text-white transition hover:bg-emerald-800"
                >
                  Diskretes Angebot prüfen lassen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackingLink>
                <Link href="/angebot-guenstiger-pruefen" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-white px-5 text-sm font-black text-emerald-950 transition hover:bg-emerald-100">
                  Angebotsprüfung ansehen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 lg:p-8">
            <div className="text-xs font-black uppercase tracking-normal text-slate-500">Private Client Service</div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Wenn der Fall mehr persönliche Koordination braucht.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Private Client Service ist kein Duplikat des Diskret-Service. Er passt, wenn eine hochwertige
              private Anfrage, ein größeres Objekt, eine Assistenz, eine Eigentuemervertretung oder ein
              besonderer Abstimmungsrahmen gefuehrt werden soll. Diskret-Service bleibt der allgemeine
              Einstieg für sensible Faelle.
            </p>
            <Link href="/private-client-service" className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-slate-800">
              Private Client Service ansehen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {localLinks.map((item) => (
              <Link key={item.title} href={item.href} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:bg-slate-50">
                <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-slate-900">
                  Starten
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-slate-500">
                <Languages className="h-4 w-4" aria-hidden="true" />
                Information in English
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
                International customers can start in simple English.
              </h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-slate-600">
                International customers can also describe a discreet or private client request in simple English.
                FLOXANT can help structure sensitive moving, decluttering, house clearance or cleaning requests
                without requiring unnecessary details in the first step.
              </p>
              <Link href="/kontakt?service=diskret-service&city=duesseldorf&intent=english-discreet-request&source=website" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-slate-800">
                Start discreet request in English
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <div className="text-xs font-black uppercase tracking-normal text-slate-500">FAQ</div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Häufige Fragen zum Diskret-Service
            </h2>
          </div>
          <div className="mt-7 grid gap-3">
            {faqItems.map((item, index) => (
              <details key={item.q} open={index === 0} className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                <summary className="cursor-pointer list-none text-base font-black text-slate-950">
                  <span className="flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="text-xl leading-none text-slate-500 transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-8 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-lg bg-slate-950 p-6 text-white lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-normal text-slate-300">Naechster Schritt</div>
              <h2 className="mt-3 text-3xl font-black tracking-normal">Sensible Anfrage ruhig starten</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Senden Sie nur die Angaben, die für die erste Einordnung nötig sind. FLOXANT meldet sich
                über den bevorzugten Kontaktweg zurück.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackingLink href={primaryHref} label="Diskret-Service anfragen" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950 transition hover:bg-slate-100">
                Diskret-Service anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackingLink>
              <a href="tel:+4915771105087" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 text-sm font-black text-white transition hover:bg-white/10">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Rückruf
              </a>
              <a href="mailto:info@floxant.de" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 text-sm font-black text-white transition hover:bg-white/10">
                <Mail className="h-4 w-4" aria-hidden="true" />
                E-Mail
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoList({
  title,
  items,
  tone,
}: {
  title: string;
  items: readonly string[];
  tone: "white" | "amber";
}) {
  const isAmber = tone === "amber";

  return (
    <article className={`rounded-lg border p-6 shadow-sm shadow-slate-950/5 ${isAmber ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"}`}>
      <h2 className="text-2xl font-black tracking-normal text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className={`flex gap-3 rounded-lg border px-4 py-3 text-sm font-bold leading-6 ${isAmber ? "border-amber-200 bg-white text-amber-950" : "border-slate-200 bg-slate-50 text-slate-700"}`}>
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}
