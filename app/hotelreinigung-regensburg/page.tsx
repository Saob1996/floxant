import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Coffee,
  DoorOpen,
  FileText,
  KeyRound,
  MessageCircle,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CommercialCleaningLeadForm } from "@/components/CommercialCleaningLeadForm";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";


const pagePath = "/hotelreinigung-regensburg";

type IntentCard = {
  phrase: string;
  title: string;
  text: string;
  Icon: LucideIcon;
};

const customerIntents: IntentCard[] = [
  {
    phrase: "Hotelreinigung Regensburg",
    title: "Saubere Gästebereiche ohne lange Abstimmung",
    text: "Für Hotel, Pension, Boardinghouse, Apartmenthaus und Objektbetrieb mit klaren Flächen, Zeiten und Ansprechpartnern.",
    Icon: Building2,
  },
  {
    phrase: "Hotel Reinigung Firma Regensburg",
    title: "Anfrage mit Objekt, Turnus und Zeiten",
    text: "Kunden senden Zimmerzahl, Allgemeinflächen, Frühstücksbereich, Flure, Sanitär, Zugang, Wunschzeiten und Fotos.",
    Icon: FileText,
  },
  {
    phrase: "Zimmerreinigung Regensburg",
    title: "Zimmer und Apartments nach Absprache prüfen",
    text: "Zimmerwechsel, Apartmentreinigung oder Boardinghouse-Flächen werden nach Liste, Standard, Zugang und Wäschegrenzen eingeordnet.",
    Icon: KeyRound,
  },
  {
    phrase: "Hotel Unterhaltsreinigung Regensburg",
    title: "Wiederkehrender Ablauf statt Einzeleinsatz",
    text: "Lobby, Flure, Aufzug, Sanitär, Nebenflächen und sichtbare Gästebereiche brauchen Turnus, Randzeiten und Qualitätsabgleich.",
    Icon: CalendarClock,
  },
];

const hotelZones = [
  {
    label: "Lobby & Empfang",
    text: "Eingang, Empfangsbereich, Sitzflächenumfeld, Laufwege, sichtbare Kontaktflächen und Gästewirkung.",
    Icon: DoorOpen,
  },
  {
    label: "Flure & Aufzug",
    text: "Etagenflure, Aufzugsvorbereiche, Treppen, Türen, Böden und stark genutzte Wege im Objekt.",
    Icon: Building2,
  },
  {
    label: "Zimmer & Apartments",
    text: "Zimmerwechsel, Apartment- oder Boardinghouse-Reinigung nach Raumliste, Standard und klarer Leistungsgrenze.",
    Icon: ClipboardCheck,
  },
  {
    label: "Frühstück & Sanitär",
    text: "Frühstücksbereich, Gästetoiletten, Nebenräume und Pausenflächen nach Absprache, Zeitfenster und Fotos.",
    Icon: Coffee,
  },
];

const cadenceOptions = [
  {
    label: "Täglich",
    text: "Für Lobby, Sanitär, Frühstücksbereich, Flure oder stark sichtbare Gästebereiche mit hoher Nutzung.",
  },
  {
    label: "Mehrmals pro Woche",
    text: "Für kleinere Hotels, Pensionen, Boardinghouses oder Allgemeinflächen mit planbarem Gästeverkehr.",
  },
  {
    label: "Nach Check-out",
    text: "Für Zimmer, Apartments oder Mieterwechsel im Objekt, wenn Liste, Zugang, Standard und Wäschegrenzen klar sind.",
  },
  {
    label: "Sondertermin",
    text: "Für Saisonstart, Renovierung, Leerstand, Grundreinigung, Eventfolge oder starke Verschmutzung nach Fotos.",
  },
];

const requestChecklist = [
  "Hoteladresse in Regensburg",
  "Hotel, Pension, Boardinghouse oder Apartmenthaus",
  "Zimmerzahl und Allgemeinflächen",
  "Lobby, Flure, Aufzug, Sanitär und Frühstücksbereich",
  "Gewünschter Turnus oder Check-out-Logik",
  "Zeitfenster, Schlüssel, Code oder Rezeption",
  "Wäsche, Minibar, Küchenbereich und Sonderwünsche klar abgrenzen",
  "Fotos oder kurzer Rundgang",
];

const trustSignals = [
  "Flächenliste statt pauschalem Hotelversprechen",
  "Turnus nach Gästeverkehr und Sichtbarkeit",
  "Check-out, Randzeiten und Zugang vor Start geklärt",
  "Zimmer, Allgemeinflächen und Sonderpunkte getrennt einordnen",
  "klare Grenze zu Wäscherei, Küche und Personalverleih",
  "keine Preiszusage ohne Objekt- und Standardprüfung",
];

const boundaries = [
  "kein Wäscherei- oder Wäscheservice automatisch",
  "keine HACCP-, Küchenhygiene- oder Lebensmittel-Fachleistung pauschal",
  "keine 24/7-Housekeeping-Zusage ohne gesonderte Schichtprüfung",
  "kein Personalverleih oder Rezeptionsdienst",
  "keine Reinraum-, Gefahrstoff- oder Tatortreinigung",
  "keine Fassaden-, Dach- oder Hebebühnenarbeit",
];

const faqItems = [
  {
    q: "Was kostet Hotelreinigung in Regensburg?",
    a: "Die Kosten hängen von Zimmerzahl, Allgemeinflächen, Standard, Turnus, Check-out-Logik, Lobby, Fluren, Aufzug, Sanitär, Frühstücksbereich, Zugang, Zeitfenster und gewünschten Zusatzleistungen ab. Für eine realistische Prüfung braucht FLOXANT Objektadresse, Flächenliste, Fotos und den gewünschten Rhythmus.",
  },
  {
    q: "Welche Angaben braucht FLOXANT für ein Hotelreinigung-Angebot?",
    a: "Wichtig sind Objektart, Adresse, Zimmer- oder Apartmentzahl, Allgemeinflächen, Flure, Lobby, Sanitär, Frühstücksbereich, Turnus, Check-out-Zeiten, Zugang, Ansprechpartner, gewünschter Start und Fotos. Je konkreter die Anfrage, desto schneller kann FLOXANT sauber prüfen.",
  },
  {
    q: "Ist Zimmerreinigung oder Apartmentreinigung möglich?",
    a: "Zimmer, Apartments oder Boardinghouse-Flächen können nach Absprache geprüft werden, wenn Raumliste, Standard, Zeitfenster, Zugang, Wäschegrenzen und Verantwortlichkeiten klar sind. FLOXANT verspricht keine pauschale 24/7-Housekeeping-Leistung ohne gesonderte Prüfung.",
  },
  {
    q: "Kann FLOXANT Lobby, Flure und Gästetoiletten regelmäßig reinigen?",
    a: "Ja, solche Allgemeinflächen passen gut zu einer wiederkehrenden Objekt- oder Unterhaltsreinigung, wenn Turnus, Gästeverkehr, Öffnungszeiten, Schlüsselzugang und Leistungsumfang vorher geklärt sind.",
  },
  {
    q: "Gehören Wäsche, Küche oder Frühstück automatisch dazu?",
    a: "Nein. Wäsche, Wäscherei, Minibar, Küchenhygiene, HACCP-Themen, Lebensmittelbereiche und Sonderleistungen sollten separat genannt werden. FLOXANT prüft dann, ob und wie der Punkt eingeordnet werden kann.",
  },
];

const relatedLinks = [
  { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
  { href: "/unterhaltsreinigung-regensburg", label: "Unterhaltsreinigung Regensburg" },
  { href: "/grundreinigung-regensburg", label: "Grundreinigung Regensburg" },
  { href: "/fensterreinigung-regensburg", label: "Fensterreinigung Regensburg" },
  { href: "/baureinigung-regensburg", label: "Baureinigung Regensburg" },
  { href: "/teppichreinigung-regensburg", label: "Teppichreinigung Regensburg" },
  { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
  { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg" },
  { href: "/treppenhausreinigung-regensburg", label: "Treppenhausreinigung Regensburg" },
  { href: "/blog/grosse-reinigungsauftraege-regensburg-buero-hotel-praxis", label: "Ratgeber B2B-Reinigung" },
  { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot prüfen" },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "hotelreinigung-regensburg",
    title: "Hotelreinigung Regensburg | Zimmer, Lobby & Turnus | FLOXANT",
    description:
      "Hotelreinigung in Regensburg für Hotel, Pension, Boardinghouse, Lobby, Flure, Zimmer, Sanitär und Frühstücksbereich. Fotos, Turnus und Angebot prüfen.",
  });
}

export default function HotelreinigungRegensburgPage() {
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hallo FLOXANT, wir möchten Hotelreinigung in Regensburg anfragen. Objektart, Zimmerzahl, Allgemeinflächen, Turnus, Zeitfenster und Fotos können wir senden.",
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung", item: "/reinigung" },
        { name: "Gewerbereinigung Regensburg", item: "/regensburg/gewerbereinigung" },
        { name: "Hotelreinigung Regensburg", item: pagePath },
      ]),
      buildServiceJsonLd({
        name: "Hotelreinigung Regensburg",
        description:
          "Hotelreinigung in Regensburg für Hotel, Pension, Boardinghouse, Apartmenthaus und Objektbetrieb nach Zimmerzahl, Allgemeinflächen, Turnus, Zeitfenster, Zugang und Fotos.",
        path: pagePath,
        serviceType:
          "Hotelreinigung, Zimmerreinigung, Boardinghouse Reinigung, Lobbyreinigung und Hotel-Unterhaltsreinigung in Regensburg",
        areaServed: ["Regensburg", "Landkreis Regensburg", "Neutraubling", "Lappersdorf", "Pentling", "Bayern nach Verfügbarkeit"],
      }),
      buildWebPageJsonLd({
        name: "Hotelreinigung Regensburg für Hotel, Pension, Boardinghouse und Objektbetrieb",
        description:
          "Kundennaher Startpunkt für Hotelreinigung in Regensburg mit Turnus, Zimmer- und Allgemeinflächen, Anfragecheckliste, FAQ, Grenzen und B2B-Formular.",
        path: pagePath,
        about: [
          "Hotelreinigung Regensburg",
          "Zimmerreinigung Regensburg",
          "Pension Reinigung",
          "Boardinghouse Reinigung",
          "Lobby Reinigung",
          "Hotel Unterhaltsreinigung",
          "Hotelreinigung Angebot",
        ],
        potentialActions: [
          { name: "Hotelreinigung anfragen", target: `${pagePath}#kontakt`, type: "ContactAction" },
          { name: "Hotelreinigung per WhatsApp anfragen", target: whatsappUrl, type: "ContactAction" },
        ],
      }),
      {
        "@type": "ItemList",
        name: "Typische Anliegen zur Hotelreinigung Regensburg",
        itemListElement: customerIntents.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.phrase,
          description: item.text,
        })),
      },
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background pb-24 text-slate-900 sm:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Reinigung", href: "/reinigung" },
          { label: "Gewerbereinigung Regensburg", href: "/regensburg/gewerbereinigung" },
          { label: "Hotelreinigung Regensburg" },
        ]}
      />

      <section id="ueberblick" className="relative overflow-hidden px-6 pb-12 pt-6 lg:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="flox-grid-backdrop" />
          <FloxantSymbolLayer variant="cleaning" density="soft" mode="hero" className="opacity-15" />
        </div>

        <div className="flox-shell relative">
          <div className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr] xl:items-stretch">
            <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-9 md:py-9">
              <div className="flox-kicker">
                <Building2 className="h-4 w-4" />
                Hotelreinigung Regensburg
              </div>

              <h1 className="mt-6 max-w-[17ch] text-[clamp(2.1rem,4.3vw,4rem)] font-black leading-[0.98] text-slate-950">
                Saubere Gästebereiche, klare Zeiten, bessere Abläufe.
              </h1>

              <p className="mt-5 max-w-[60ch] text-base leading-8 text-slate-700">
                FLOXANT prüft Hotelreinigung in Regensburg nach Objektart,
                Zimmerzahl, Allgemeinflächen, Lobby, Fluren, Sanitär,
                Frühstücksbereich, Turnus, Check-out-Logik, Zugang und Fotos.
                Ideal für Hotels, Pensionen, Boardinghouses und Apartmenthäuser,
                die Reinigung sauber abstimmen möchten.
              </p>

              <nav
                aria-label="Schnelle Auswahl für Hotelreinigung Regensburg"
                className="mt-6 flex flex-wrap gap-2"
              >
                {[
                  ["Anliegen", "#kunden-suchen"],
                  ["Hotelbereiche", "#bereiche"],
                  ["Turnus", "#turnus"],
                  ["Checkliste", "#anfrage-checkliste"],
                ].map(([label, href]) => (
                  <a key={href} href={href} className="flox-chip hover:border-blue-200 hover:bg-blue-50">
                    {label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#kontakt" className="flox-button-primary px-6">
                  Hotelreinigung anfragen
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flox-button-secondary px-6">
                  <MessageCircle className="h-4 w-4" />
                  Per WhatsApp senden
                </a>
              </div>
            </article>

            <aside className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
              <Image
                  src="/assets/service-cleaning.png"
                alt="Aufgeräumtes Hotelzimmer als Beispiel für Hotelreinigung in Regensburg"
                fill
                priority
                sizes="(min-width: 1280px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/10" />
              <div className="relative flex h-full min-h-[420px] flex-col justify-end p-6 md:p-8">
                <div className="max-w-md">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/12 px-3 py-2 text-[10px] font-black uppercase text-white">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Anfrage nach Hotelablauf
                  </div>
                  <h2 className="mt-4 text-2xl font-black text-white md:text-3xl">
                    Erst Zimmerzahl, Flächenliste, Check-out-Zeiten und Zugang machen ein Angebot belastbar.
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Turnus", "klar"],
                      ["Zugang", "geklärt"],
                      ["Standard", "sichtbar"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[1rem] border border-white/15 bg-white/12 px-4 py-3">
                        <p className="text-[10px] font-black uppercase text-white/70">{label}</p>
                        <p className="mt-1 text-sm font-black text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="kunden-suchen" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Typische Anliegen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Hotelreinigung muss zum Gästealltag passen.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Für Hotel, Pension oder Boardinghouse zählen Lobby, Flure, zimmernahe
              Bereiche, Frühstücksbereich, Check-out-Zeiten, Turnus und ein Ablauf,
              der Gäste und Team nicht unnötig stört.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {customerIntents.map((item) => {
              const Icon = item.Icon;
              return (
                <article key={item.phrase} className="flox-panel rounded-[1.5rem] p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[0.9rem] bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-[11px] font-black uppercase text-blue-700">
                    {item.phrase}
                  </p>
                  <h3 className="mt-3 text-xl font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="bereiche" className="flox-section pt-0">
        <div className="flox-shell grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker">Hotelbereiche</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Hotelreinigung wird besser, wenn Zimmer und Allgemeinflächen getrennt gedacht werden.
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {hotelZones.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.label} className="rounded-[1.2rem] border border-slate-200 bg-white px-5 py-5">
                    <Icon className="h-6 w-6 text-blue-700" />
                    <h3 className="mt-4 text-lg font-black text-slate-950">{item.label}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </article>

          <article className="flox-panel-dark rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Ablaufklarheit</div>
            <h2 className="mt-6 text-[clamp(1.9rem,3.7vw,3rem)] font-black text-white">
              Hotelbetrieb braucht genaue Zeiten statt pauschaler Putzliste.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              FLOXANT fragt bewusst nach Check-out, Rezeption, Schlüssel,
              Gästebereichen, Standard und Sondergrenzen. So wird die Anfrage
              qualifizierter und der spätere Ablauf ruhiger.
            </p>
            <div className="mt-6 grid gap-3">
              {trustSignals.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.1rem] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-7 text-slate-200">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="turnus" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Turnus & Gästezeiten</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Der passende Rhythmus hängt von Gästeverkehr, Sichtbarkeit und Check-out-Zeiten ab.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cadenceOptions.map((item) => (
              <article key={item.label} className="flox-panel rounded-[1.5rem] p-6">
                <CalendarClock className="h-6 w-6 text-blue-700" />
                <h3 className="mt-5 text-xl font-black text-slate-950">{item.label}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="anfrage-checkliste" className="flox-section pt-0">
        <div className="flox-shell grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker">Anfrage-Checkliste</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Diese Angaben machen aus einer ersten Anfrage eine prüfbare Hotelanfrage.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Für Hotelreinigung zählen nicht nur Zimmer oder Quadratmeter. Erst
              mit Flächenliste, Standard, Turnus, Check-out-Zeiten, Zugang und
              Fotos kann FLOXANT sauber prüfen, ob ein Angebot realistisch ist.
            </p>
          </article>

          <div className="grid gap-3 sm:grid-cols-2">
            {requestChecklist.map((item) => (
              <div key={item} className="flox-panel flex items-start gap-3 rounded-[1.3rem] p-5">
                <Camera className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                <span className="text-sm font-bold leading-7 text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flox-section pt-0">
        <div className="flox-shell grid gap-5 lg:grid-cols-[1fr_1fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker">Häufige Fragen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Kurze Antworten für Betreiber mit Angebotsabsicht.
            </h2>
            <div className="mt-7 grid gap-3">
              {faqItems.map((item) => (
                <details key={item.q} className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4">
                  <summary className="cursor-pointer list-none text-base font-bold text-slate-950">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
                </details>
              ))}
            </div>
          </article>

          <article className="flox-panel-dark rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Grenzen</div>
            <h2 className="mt-6 text-[clamp(1.9rem,3.7vw,3rem)] font-black text-white">
              Was Hotelreinigung nicht automatisch enthält.
            </h2>
            <div className="mt-6 space-y-3">
              {boundaries.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.1rem] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-7 text-slate-200">
                  <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="flox-section pt-0">
        <div className="flox-shell">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 px-6 py-6 md:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase text-blue-700">Passende nächste Wege</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Weitere passende Leistungen für Hotelreinigung in Regensburg.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {relatedLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="flox-chip hover:border-blue-200 hover:bg-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="mb-10 text-center">
            <div className="flox-kicker">Hotelreinigung anfragen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Zimmerzahl, Allgemeinflächen, Turnus und Zeiten senden. FLOXANT prüft den nächsten Schritt.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-700">
              Für eine schnelle Einordnung reichen Adresse, Objektart,
              Zimmerzahl, Flächenliste, gewünschter Turnus, Zeitfenster, Zugang
              und ein paar Fotos von Zimmern, Lobby, Fluren und Sanitär.
            </p>
          </div>

          <CommercialCleaningLeadForm />
        </div>
      </section>
    </main>
  );
}
