import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  HeartHandshake,
  Home,
  MapPin,
  PackageCheck,
  Phone,
  Users,
} from "lucide-react";

import { company } from "@/lib/company";

const canonicalPath = "/regensburg/seniorenumzug";
const canonicalUrl = `${company.url}${canonicalPath}`;
const contactHref =
  "/kontakt?location=regensburg&service=seniorenumzug&intent=seniorenumzug-anfragen&source=website";

const title = "Seniorenumzug Regensburg | Ruhig und persönlich planen";
const description =
  "Seniorenumzug in Regensburg für Seniorinnen, Senioren und Angehörige: Transport, Packhilfe, Räumung, Reinigung und Übergabe abgestimmt anfragen.";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title,
  description,
  alternates: {
    canonical: canonicalPath,
    languages: {
      "de-DE": canonicalPath,
      en: "/en/regensburg/senior-moving",
      "x-default": canonicalPath,
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonicalPath,
    title,
    description,
  },
  twitter: { card: "summary", title, description },
};

const services = [
  {
    title: "Umzug und Möbeltransport",
    text: "Tragen und Transport der abgestimmten Möbel und Kartons zwischen Start und Ziel.",
    icon: Home,
  },
  {
    title: "Packhilfe und Möbelmontage",
    text: "Ein- und Auspacken sowie Demontage und Montage können nach Umfang vereinbart werden.",
    icon: PackageCheck,
  },
  {
    title: "Entrümpelung oder Wohnungsauflösung",
    text: "Nicht benötigte Möbel und geeignete Restmengen können nach Prüfung getrennt eingeplant werden.",
    icon: ClipboardCheck,
  },
  {
    title: "Reinigung und Übergabevorbereitung",
    text: "Eine Reinigung der bisherigen Wohnung kann nach Absprache an den Umzug anschließen.",
    icon: CheckCircle2,
  },
] as const;

const neededDetails = [
  "Startadresse und Zieladresse",
  "Etagen, Aufzüge und Laufwege",
  "Möbel, Kartons und grober Umfang",
  "Gewünschter Termin und wichtige Fristen",
  "Benötigte Pack- oder Montagehilfe",
  "Mögliche Räumung oder Reinigung",
  "Fotos der Räume, Möbel und Zugänge",
  "Ansprechperson und notwendige Freigaben",
] as const;

const processSteps = [
  {
    title: "Eckdaten senden",
    text: "Sie senden die wichtigsten Eckdaten. Das kann die umziehende Person selbst, ein Angehöriger oder eine bevollmächtigte Ansprechperson übernehmen.",
  },
  {
    title: "Umfang persönlich klären",
    text: "Wir klären Transport, Zugänge, Termin und gewünschte Zusatzleistungen. Offene Entscheidungen bleiben sichtbar und werden nicht vorausgesetzt.",
  },
  {
    title: "Nächsten Schritt abstimmen",
    text: "Nach der Prüfung besprechen wir, was als Nächstes sinnvoll ist. Erst eine separate verbindliche Abstimmung macht aus der Anfrage einen Auftrag.",
  },
] as const;

const faqItems = [
  {
    q: "Können Angehörige den Seniorenumzug anfragen?",
    a: "Ja. Angehörige können die Anfrage übernehmen. Wichtig sind eine erreichbare Ansprechperson, klare Freigaben und die Information, wer Entscheidungen zum Umzugsgut treffen darf.",
  },
  {
    q: "Lassen sich Entrümpelung und Reinigung mit dem Umzug verbinden?",
    a: "Ja, wenn Umfang, Restmengen und gewünschter Endzustand vorab geprüft wurden. Umzug, Räumung und Reinigung bleiben dabei klar benannte, separat abgestimmte Leistungen.",
  },
  {
    q: "Welche Angaben braucht FLOXANT für die erste Einschätzung?",
    a: "Hilfreich sind Start und Ziel, Etagen, Aufzug, Möbelumfang, Termin, Fotos, Pack- oder Montagebedarf sowie Angaben zu Räumung, Reinigung und Freigaben.",
  },
  {
    q: "Können Betreuer oder Sozialdienste den Kontakt übernehmen?",
    a: "Ja. Gesetzliche Betreuer, Sozialdienste, Einrichtungen oder andere bevollmächtigte Stellen können die organisatorische Abstimmung übernehmen, sofern Zuständigkeit und Freigaben geklärt sind.",
  },
  {
    q: "Rechnet FLOXANT direkt mit Kassen oder Kostenträgern ab?",
    a: "Eine direkte Abrechnung wird nicht pauschal zugesagt. Rechnungsadresse, Unterlagen und mögliche Vorgaben müssen für jeden Auftrag vorab einzeln geklärt werden.",
  },
  {
    q: "Entscheidet FLOXANT, ob Kosten übernommen werden?",
    a: "Nein. Über Erstattung, Zuschüsse oder Leistungsansprüche entscheidet ausschließlich der jeweilige Kostenträger im Einzelfall. FLOXANT bietet dazu keine Rechts- oder Sozialleistungsberatung.",
  },
  {
    q: "Sind Fotos für die Anfrage hilfreich?",
    a: "Ja. Fotos von Räumen, Möbeln, Treppen, Aufzügen und Laufwegen helfen, Rückfragen zu reduzieren. Bitte senden Sie nur Informationen, die für die erste Einordnung nötig sind.",
  },
] as const;

function SeniorMoveJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        inLanguage: "de-DE",
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        url: canonicalUrl,
        name: "Seniorenumzug Regensburg",
        serviceType: "Seniorenumzug",
        description,
        areaServed: "Regensburg",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "FLOXANT", item: company.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Regensburg",
            item: `${company.url}/regensburg`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Seniorenumzug",
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

function ContactActions({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link
        href={contactHref}
        data-event="cta_click"
        data-city="regensburg"
        data-service="seniorenumzug"
        className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-black transition ${
          dark
            ? "bg-white text-slate-950 hover:bg-amber-50"
            : "bg-slate-950 text-white hover:bg-slate-800"
        }`}
      >
        Seniorenumzug anfragen
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <a
        href={`tel:${company.phoneRaw}`}
        className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-6 text-sm font-black transition ${
          dark
            ? "border-white/25 bg-white/10 text-white hover:bg-white/15"
            : "border-slate-300 bg-white text-slate-950 hover:bg-slate-50"
        }`}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        {company.phone}
      </a>
    </div>
  );
}

export default function RegensburgSeniorenumzugPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <SeniorMoveJsonLd />

      <section className="bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div>
            <nav
              aria-label="Brotkrümelnavigation"
              className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-300"
            >
              <Link href="/" className="hover:text-white">FLOXANT</Link>
              <span aria-hidden="true">/</span>
              <Link href="/regensburg" className="hover:text-white">Regensburg</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white">Seniorenumzug</span>
            </nav>
            <p className="mt-7 flex items-center gap-2 text-sm font-black uppercase tracking-normal text-amber-200">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Persönlich abgestimmt in Regensburg
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              Seniorenumzug in Regensburg ruhig und klar planen.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-200">
              Für Seniorinnen, Senioren und Angehörige: Wir stimmen Transport,
              gewünschte Hilfe und mögliche Folgearbeiten Schritt für Schritt mit Ihnen ab.
            </p>
            <div className="mt-8"><ContactActions dark /></div>
          </div>

          <aside className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur">
            <HeartHandshake className="h-8 w-8 text-amber-200" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-black">Die kurze Antwort</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-200">
              Ein Seniorenumzug braucht häufig mehr Abstimmung als ein normaler Transport.
              FLOXANT plant den vereinbarten Umfang in Regensburg mit einer klaren
              Ansprechperson und ohne unnötigen Zeitdruck.
            </p>
            <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.06] p-4 text-sm font-semibold leading-6 text-slate-200">
              Eine Anfrage ist noch keine Buchung. Termin, Umfang und Verfügbarkeit
              werden erst nach Prüfung verbindlich abgestimmt.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Bestätigter Leistungsumfang</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-normal sm:text-5xl">Was FLOXANT übernehmen kann</h2>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600">
            Welche Bausteine tatsächlich dazugehören, wird vor dem Auftrag einzeln geprüft und schriftlich abgestimmt.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <Icon className="h-7 w-7 text-blue-700" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-black">{service.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{service.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-amber-50 px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <Users className="h-8 w-8 text-amber-800" aria-hidden="true" />
            <p className="mt-5 text-sm font-black uppercase tracking-normal text-amber-900">Für Angehörige</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">
              Verantwortung darf auf mehrere Schultern verteilt werden.
            </h2>
          </div>
          <div className="space-y-4 text-base font-semibold leading-8 text-slate-700">
            <p>
              Angehörige können den ersten Kontakt übernehmen, auch wenn sie nicht in
              Regensburg wohnen. Hilfreich ist eine Person, die Fragen bündelt und
              notwendige Entscheidungen freigeben kann.
            </p>
            <p>
              Persönliche Gegenstände werden nicht eigenmächtig aussortiert. Was mitkommt,
              bleibt oder abgegeben werden darf, muss vor der Umsetzung eindeutig geklärt sein.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <Building2 className="h-8 w-8 text-blue-700" aria-hidden="true" />
              <p className="mt-5 text-sm font-black uppercase tracking-normal text-blue-700">Institutionelle Abstimmung</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">
                Für Kassen, Sozialdienste und professionelle Ansprechpartner
              </h2>
            </div>
            <div>
              <div className="space-y-4 text-base font-semibold leading-8 text-slate-700">
                <p>
                Sie begleiten einen Versicherten, Patienten oder Klienten bei einem
                Wohnungswechsel in Regensburg? Krankenkassen, Pflegekassen, Sozialdienste,
                Pflegeberatungen, gesetzliche Betreuer, Kliniken, Reha-Einrichtungen,
                Pflegeeinrichtungen und ambulante Dienste können die praktische Leistung
                für den konkreten Einzelfall anfragen.
                </p>
                <p>
                  Benötigt werden klare Zuständigkeiten, Freigaben, Rechnungsdaten und ein
                  erreichbarer Kontakt.
                </p>
                <p>
                  Die Nennung beschreibt mögliche anfragende Stellen und keine bestehende
                  Partnerschaft.
                </p>
              </div>
              <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-slate-700">
                Ob und in welchem Umfang ein Kostenträger Leistungen übernimmt, hängt vom
                Einzelfall ab. FLOXANT entscheidet nicht über Erstattungen oder
                Leistungsansprüche und bietet keine Rechts- oder Sozialleistungsberatung.
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href={contactHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white">
                  Seniorenumzug anfragen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href={contactHref} className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-black text-slate-950">
                  FLOXANT kontaktieren
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Vor der ersten Rückmeldung</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
            Diese Angaben helfen uns bei der Einordnung.
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {neededDetails.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Ablauf</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
            In drei Schritten zur nächsten Abstimmung.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</div>
                <h3 className="mt-5 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">Häufige Fragen</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">Antworten vor Ihrer Anfrage.</h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              Noch etwas offen? Rufen Sie uns direkt an oder senden Sie die wichtigsten Eckdaten über das Kontaktformular.
            </p>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer text-base font-black text-slate-950">{item.q}</summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-amber-200">Persönlich erreichbar</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">Schildern Sie uns den nächsten Schritt.</h2>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-300">
              Auch eine noch unvollständige Anfrage ist in Ordnung. Wir sagen Ihnen,
              welche Angaben für die weitere Prüfung fehlen.
            </p>
          </div>
          <ContactActions dark />
        </div>
      </section>
    </main>
  );
}
