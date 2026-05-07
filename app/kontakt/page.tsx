import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPinned, MessageCircle } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  ContactTrustPanel,
  contactEntryPoints,
  googleMapsUrl,
  whatsappUrl,
} from "@/components/seo/ContactTrustPanel";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  BAVARIA_DIRECT_DEMAND_LINKS,
  BAVARIA_METRO_DISTRICT_LINKS,
} from "@/lib/bavaria-coverage";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
  {
    q: "Wie erreiche ich FLOXANT am schnellsten?",
    a: "Am schnellsten starten Sie über die Buchungsseite, den Rechner oder die Express-Anfrage. Für direkte Rückfragen sind Telefon, WhatsApp und E-Mail klar sichtbar angegeben.",
  },
  {
    q: "Ist eine Kontaktaufnahme direkt eine Buchung?",
    a: "Nein. Eine Kontaktaufnahme oder Rechner-Anfrage startet zuerst die fachliche Vorprüfung. Eine Beauftragung entsteht erst nach klarer Abstimmung von Leistung, Termin und Dokumenten.",
  },
  {
    q: "Welche Angaben helfen bei einer schnellen Rückmeldung?",
    a: "Hilfreich sind Serviceart, Ort, Umfang, Zugang, Terminwunsch, Fotos, besondere Bedingungen und eine optionale Preisvorstellung.",
  },
  {
    q: "Für welche Region ist FLOXANT erreichbar?",
    a: "Der operative Kern liegt in Regensburg. FLOXANT prüft Anfragen in Bayern und passende Einsätze im erweiterten Einsatzgebiet nach Strecke, Termin und Kapazität.",
  },
  {
    q: "Kann ich auch nur eine Preisvorstellung senden?",
    a: "Ja. Die Preisvorstellung ergänzt die fachliche Einschätzung, ersetzt sie aber nicht. Sie hilft bei der Prüfung, ob Budget und Leistungsumfang zusammenpassen.",
  },
  {
    q: "Welche URL eignet sich für Google Maps oder das Google-Unternehmensprofil?",
    a: "Für direkte Anfragen eignet sich vor allem die Buchungsseite. Sie bündelt Buchung, Express-Check, Preisvorstellung und klare nächste Schritte in einem einzigen sauberen Einstieg.",
  },
  {
    q: "Gibt es auch einen gezielten Kontaktweg für Firmen oder hochwertige Projekte?",
    a: "Ja. Für gewerbliche Reinigung ist die B2B-Seite in Regensburg gedacht. Für diskrete hochwertige Anfragen gibt es den separaten Private-Client-Bereich.",
  },
];

const preparationItems = [
  "Serviceart wählen: Umzug, Reinigung, Entrümpelung, Büroumzug oder Spezialservice.",
  "Ort und Zeitraum nennen: Regensburg, Bayern, Strecke, Datum oder gewünschtes Zeitfenster.",
  "Umfang beschreiben: Volumen, Fläche, Räume, Etagen, Aufzug, Laufwege oder Fotos.",
  "Kontaktweg festlegen: Rückruf, WhatsApp oder E-Mail für die nächste Abstimmung.",
];

const localTrustCards = [
  {
    title: "Schnell anfragen",
    text: "Wer schon weiß, worum es geht, landet direkt bei der Buchung: Leistung, Ort, Termin und Kontaktweg werden sauber abgefragt.",
    href: "/buchung",
    cta: "Buchungsseite öffnen",
  },
  {
    title: "Regensburg als Basis",
    text: "Adresse, Telefonnummer und Kontaktwege bleiben klar sichtbar. So wissen Kunden sofort, wo FLOXANT erreichbar ist und welcher Weg zur Anfrage passt.",
    href: company.mapsSearchUrl,
    cta: "Standort bei Google Maps",
  },
  {
    title: "Klare Wege statt Umwege",
    text: "Kontakt, Rechner, Express und Preisvorstellung bleiben getrennt. Das macht die Anfrage einfacher und spart spätere Rückfragen.",
    href: "/rechner",
    cta: "Rechner ansehen",
  },
  {
    title: "FLOXANT empfehlen",
    text: "Kunden, Freunde, Vermieter oder Makler koennen einen Partnercode teilen. Der 50-Euro-Bonus wird nur bei bestaetigtem und bezahltem Auftrag geprueft.",
    href: "/empfehlen",
    cta: "Empfehlungslink ansehen",
  },
];

const mapsReadyPoints = [
  "Buchung, WhatsApp und Telefon sind ohne Umwege erreichbar.",
  "Adresse, Telefonnummer und E-Mail sind konsistent sichtbar.",
  "Ort, Leistung und Kontaktweg bleiben für Kunden klar nachvollziehbar.",
];

const mapsClosingSignals = [
  {
    title: "Direkter Kontakt statt Leerlauf",
    text: "Kunden sehen sofort, wie sie Buchung, WhatsApp oder Preisprüfung ohne Suchschleife starten.",
  },
  {
    title: "Vertrauen durch klare Angaben",
    text: "Adresse, Telefonnummer, E-Mail und die nächsten Anfragewege sind sichtbar, statt in langen Texten versteckt zu sein.",
  },
  {
    title: "Spezialbereiche sauber getrennt",
    text: "Für Reinigung in Düsseldorf gibt es einen eigenen lokalen Bereich mit eigenem Kontaktweg und klarer Adresse.",
  },
];

const supportingKnowledgeLinks = [
  {
    title: "Preisrahmen statt Schnellpreis besser verstehen",
    href: "/blog/preisrahmen-vorpruefung-statt-festpreis",
    text: "Hilft, wenn vor der Kontaktaufnahme noch unklar ist, wie realistisch ein Budget oder Zeitfenster ist.",
  },
  {
    title: "Wohnungsübergabe sauber vorbereiten",
    href: "/blog/wohnungsuebergabe-regensburg-vorbereiten",
    text: "Sinnvoll, wenn Schlüssel, Fotos, Restmengen oder Reinigung vor dem Vermietertermin mitgedacht werden müssen.",
  },
  {
    title: "Direkt anfragen statt Umwege über Portale",
    href: "/blog/direkt-anfragen-statt-vergleichsportal-regensburg",
    text: "Erklärt, warum ein klarer direkter Kontaktweg oft bessere Rückfragen und weniger Reibung erzeugt.",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "kontakt",
    title: "Kontakt Regensburg | Buchung, Standort und Anfrage bei FLOXANT",
    description:
      "FLOXANT Kontakt in Regensburg: Buchung, WhatsApp, Telefon, E-Mail, Standort und klare Anfragewege für Umzug, Reinigung, Entrümpelung und Büroumzug.",
    keywords: [
      "Kontakt Regensburg",
      "Umzug Kontakt Regensburg",
      "Reinigung Kontakt Regensburg",
      "Entrümpelung Kontakt Regensburg",
      "Google Maps Buchungslink",
      "Google Unternehmensprofil Buchung Regensburg",
      "FLOXANT Kontakt",
    ],
  });
}

export default function KontaktPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Kontakt Regensburg",
        description:
          "Kontaktseite für FLOXANT mit Buchung, Rechner, Express-Anfrage, Telefon, WhatsApp, E-Mail und Standort in Regensburg.",
        path: "/kontakt",
        about: [
          "FLOXANT Kontakt",
          "Umzug Regensburg",
          "Reinigung Regensburg",
          "Entrümpelung Regensburg",
          "Büroumzug",
          "WhatsApp Kontakt",
          "Regensburg",
          "Bayern",
        ],
        potentialActions: [
          { name: "Direkte Anfrage starten", target: "/buchung" },
          { name: "Preisrahmen prüfen", target: "/rechner" },
        ],
      }),
      {
        "@type": "ContactPage",
        "@id": `${company.url}/kontakt#contactpage`,
        name: "FLOXANT Kontakt",
        url: `${company.url}/kontakt`,
        mainEntity: {
          "@type": "LocalBusiness",
          "@id": `${company.url}/#localbusiness`,
          name: company.name,
          telephone: company.phoneRaw,
          email: company.email,
          url: company.url,
          address: {
            "@type": "PostalAddress",
            streetAddress: company.streetAddress,
            postalCode: company.postalCode,
            addressLocality: company.city,
            addressCountry: company.countryCode,
          },
          areaServed: [
            { "@type": "City", name: "Regensburg" },
            { "@type": "State", name: "Bayern" },
          ],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: company.phoneRaw,
              contactType: "customer service",
              areaServed: "DE",
              availableLanguage: ["de"],
            },
          ],
        },
      },
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Kontakt", item: "/kontakt" },
      ]),
      buildFaqJsonLd(faqItems),
      {
        "@type": "ItemList",
        name: "FLOXANT Kontakt-Einstiege",
        itemListElement: contactEntryPoints.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: entry.title,
          url: `${company.url}${entry.href}`,
          description: entry.text,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Kontakt" }]} />

      <section className="relative px-6 pb-14 pt-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[590px] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.21),transparent_64%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
            <MapPinned className="h-4 w-4" />
            FLOXANT Kontakt Regensburg
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Kontakt aufnehmen, Anfrage starten oder Preisrahmen prüfen.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/58">
            Wählen Sie den Weg, der zu Ihrem Fall passt: direkt anfragen, erst den Preisrahmen
            prüfen, Express-Kontakt nutzen oder per WhatsApp schreiben. Wichtig sind Service,
            Ort, Umfang, Terminwunsch und ein Kontaktweg für die Rückmeldung.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/buchung"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Buchungsseite öffnen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/rechner"
              className="inline-flex items-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-900 transition hover:bg-blue-100"
            >
              Preisrahmen prüfen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-500/15"
            >
              WhatsApp öffnen
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-foreground/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground/82 transition hover:bg-white/[0.08]"
            >
              Standort ansehen
            </a>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {mapsClosingSignals.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.35rem] border border-white/65 bg-white/82 px-4 py-4 shadow-sm shadow-slate-950/5 backdrop-blur"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                  Schneller Kontakt
                </div>
                <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {[
              {
                label: "Direkt zur Buchung",
                href: "/buchung",
                text: "Wenn der Fall klar ist und Sie ohne Umweg in die strukturierte Anfrage wollen.",
              },
              {
                label: "Zum Rechner",
                href: "/rechner",
                text: "Wenn zuerst Aufwand, Zugang und Preisrahmen eingeordnet werden sollen.",
              },
              {
                label: "Lokale Servicepfade",
                href: "/standorte",
                text: "Wenn erst die passende Stadt- oder Service-Seite für Regensburg und Bayern gefunden werden soll.",
              },
              {
                label: "WhatsApp",
                href: whatsappUrl,
                text: "Wenn Fotos, kurze Rückfragen oder schnelle Abstimmung im Vordergrund stehen.",
              },
            ].map((item) =>
              item.href.startsWith("http") ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[1.35rem] border border-slate-200 bg-white/86 px-4 py-4 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-950">{item.label}</span>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group rounded-[1.35rem] border border-slate-200 bg-white/86 px-4 py-4 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-950">{item.label}</span>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {localTrustCards.map((item) => {
            const external = item.href.startsWith("http");
            const classes =
              "rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md";

            return external ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Lokal & klar
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                  {item.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </a>
            ) : (
              <Link key={item.title} href={item.href} className={classes}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Lokal & klar
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                  {item.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <ContactTrustPanel compact />

      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <article className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Lokal erreichbar
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Alles, was für eine schnelle Anfrage wichtig ist
            </h2>
            <div className="mt-5 grid gap-3">
              {mapsReadyPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Lokale Einstiege
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Häufige Servicepfade ohne lange Suche
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {BAVARIA_DIRECT_DEMAND_LINKS.slice(0, 6).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {BAVARIA_METRO_DISTRICT_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-5 rounded-[1.15rem] border border-emerald-200 bg-emerald-50 px-4 py-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-800">
                Separater Reinigungsbereich
              </div>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950/80">
                Für lokale Reinigungsanfragen in Düsseldorf gibt es einen eigenen Bereich mit
                Adresse, Rechner, Kontakt und klarer Reinigungspositionierung.
              </p>
              <Link
                href="/duesseldorf/reinigung"
                className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800"
              >
                Düsseldorf Reinigung ansehen
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/80 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Vorbereiten
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              So wird die Rückmeldung schneller und genauer.
            </h2>
          </div>
          <div className="grid gap-4">
            {preparationItems.map((item) => (
              <div
                key={item}
                className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                <p className="text-sm leading-relaxed text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl rounded-[1.8rem] border border-blue-100 bg-[linear-gradient(135deg,rgba(239,246,255,0.95),rgba(255,255,255,1))] p-6 shadow-sm shadow-slate-950/5 md:p-8">
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Vor dem Kontakt
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Erst kurz einordnen, dann schneller die richtige Rückmeldung bekommen.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 lg:text-right">
              Diese Inhalte helfen, Budget, Übergabe und direkte Anfragewege besser zu sortieren,
              bevor Sie FLOXANT kontaktieren.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {supportingKnowledgeLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.45rem] border border-white bg-white px-5 py-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Ratgeber
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                  Weiterlesen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Häufige Fragen zu Kontakt und Anfrage
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={item.q}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
                open={index === 0}
              >
                <summary className="cursor-pointer list-none text-lg font-semibold text-foreground">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
