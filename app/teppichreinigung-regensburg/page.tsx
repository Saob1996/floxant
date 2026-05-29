import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Home,
  KeyRound,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Timer,
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

export const revalidate = 3600;

const pagePath = "/teppichreinigung-regensburg";

type IntentCard = {
  phrase: string;
  title: string;
  text: string;
  Icon: LucideIcon;
};

const customerIntents: IntentCard[] = [
  {
    phrase: "Teppichreinigung Regensburg",
    title: "Teppichart, Material und Flecken zuerst klären",
    text: "Für Teppichboden, Läufer oder textile Fläche mit Fotos, Maßen, Material, Flecken und gewünschtem Ergebnis.",
    Icon: Sparkles,
  },
  {
    phrase: "Teppichbodenreinigung Büro Regensburg",
    title: "Büroteppich nach Laufwegen und Nutzung prüfen",
    text: "FLOXANT fragt Fläche, Bürostühle, Laufspuren, Zeitfenster, Zugang, Möbelstand und Fotos ab.",
    Icon: Building2,
  },
  {
    phrase: "Polsterreinigung Regensburg",
    title: "Sofa, Stühle und Polster getrennt beschreiben",
    text: "Bei Polstern zählen Stoffart, Stückzahl, Flecken, Geruch, Nutzung, Haustiere, Zugang und Fotos.",
    Icon: Home,
  },
  {
    phrase: "Sofa reinigen lassen Regensburg",
    title: "Sofa-Fotos statt schneller Fleckenzusage",
    text: "Sofas werden nach Stoff, Größe, Polsterzustand, Fleckenart, Feuchtigkeit und Materialrisiko eingeordnet.",
    Icon: Camera,
  },
];

const serviceAreas = [
  { label: "Teppichboden & Laufwege", text: "Fest verlegte Teppichflächen, sichtbare Laufspuren und Bürobereiche nach Material- und Fotoprüfung.", Icon: Building2 },
  { label: "Sofa & Polster", text: "Stoffsofas, Polsterflächen, Sitzmöbel und textile Kontaktflächen nach Fotos, Stoffart und Zustand.", Icon: Home },
  { label: "Bürostühle & Wartebereiche", text: "Bürostühle, Praxis-Wartezimmer, Kanzlei- oder Empfangspolster mit Stückzahl und Nutzung.", Icon: ClipboardCheck },
  { label: "Auszug & Übergabe", text: "Textilflächen vor Einzug, nach Auszug, nach Nutzung oder vor Besichtigung realistisch einordnen.", Icon: KeyRound },
];

const decisionSignals = [
  {
    title: "Material nennen",
    text: "Teppichart, Stoff, Materialetikett, Alter, Farbe und empfindliche Fasern bestimmen, ob Reinigung sinnvoll prüfbar ist.",
    Icon: FileText,
  },
  {
    title: "Flecken und Geruch zeigen",
    text: "Nahaufnahmen von Flecken, Laufspuren, Geruchsthemen, Feuchtigkeit oder Haustierspuren vermeiden falsche Erwartungen.",
    Icon: Camera,
  },
  {
    title: "Fläche oder Stückzahl",
    text: "Bei Teppichboden zählen Quadratmeter und Möbelstand. Bei Polstern zählen Sofa-Größe, Stühle, Sitzflächen und Zugang.",
    Icon: ClipboardCheck,
  },
  {
    title: "Zeitfenster planen",
    text: "Büro, Praxis, Hotel oder Wohnung brauchen passende Zeiten, Trocknungsfenster, Zugang, Parken und Ansprechpartner.",
    Icon: Timer,
  },
];

const requestChecklist = [
  "Adresse in Regensburg oder Umgebung",
  "Teppichboden, Läufer, Sofa, Polster oder Bürostühle",
  "Fläche, Maße, Sitzplätze oder Stückzahl",
  "Material, Stoffart oder Foto vom Etikett",
  "Flecken, Laufspuren, Geruch, Feuchtigkeit oder Haustiere",
  "Büro, Wohnung, Praxis, Hotel oder Apartment",
  "Wunschtermin, Trocknungsfenster und Nutzung danach",
  "Fotos von Gesamtfläche, Nahaufnahme, Zugang und Möbelstand",
];

const occasionOptions = [
  {
    label: "Büro & Kanzlei",
    text: "Teppichboden, Bürostühle, Laufwege und Besprechungsräume nach Fläche, Möbelstand und Zeitfenster einordnen.",
  },
  {
    label: "Wohnung & Sofa",
    text: "Sofa, Läufer, Polster oder Teppich nach Auszug, Nutzung, Haustieren oder sichtbaren Flecken prüfen lassen.",
  },
  {
    label: "Hotel & Apartment",
    text: "Polster, Sitzflächen, Zimmerteppich oder Boardinghouse-Flächen mit Turnus, Check-out und Standard trennen.",
  },
  {
    label: "Vor Übergabe",
    text: "Wenn Teppich oder Polster vor Besichtigung, Übergabe oder Einzug auffallen, helfen Fotos und Zielbeschreibung.",
  },
];

const boundaries = [
  "keine Fleckengarantie",
  "keine Lederpflege oder Lederreparatur automatisch",
  "keine Orientteppichwäsche",
  "keine Teppichreparatur, Mottenfraß- oder Brandlochreparatur",
  "keine Schimmel-, Urin- oder Tiergeruch-Sonderfälle ohne gesonderte Prüfung",
  "keine Imprägnierung oder Spezialmaterial-Zusage ohne Materialprüfung",
];

const faqItems = [
  {
    q: "Was kostet Teppichreinigung in Regensburg?",
    a: "Die Kosten hängen von Teppichart, Fläche, Material, Flecken, Geruch, Laufspuren, Feuchtigkeit, Zugang, Etage, Möbelstand, Termin und gewünschtem Ergebnis ab. Bei Polstern zählen Stückzahl, Größe, Stoffart und Zustand.",
  },
  {
    q: "Reinigt FLOXANT auch Sofa, Polster oder Bürostühle?",
    a: "Sofa, Polsterflächen, Bürostühle und kleinere Textilflächen können nach Fotos, Material, Fleckenart, Zugang und Umfang geprüft werden. Eine Material- oder Fleckengarantie wird nicht pauschal zugesagt.",
  },
  {
    q: "Welche Angaben beschleunigen die Rückmeldung?",
    a: "Hilfreich sind Adresse, Objektart, Teppichboden oder loses Stück, Polsterart, Maße, Stückzahl, Flecken, Geruch, Haustiere, Fotos, Materialetikett und gewünschtes Zeitfenster.",
  },
  {
    q: "Kann Büro-Teppichboden in Regensburg gereinigt werden?",
    a: "Büro-Teppichboden kann nach Fläche, Laufwegen, Möbelstand, Stuhlrollen, Flecken, Zugang und Zeitfenster geprüft werden. Für Büroflächen sind Randzeiten oder betriebsruhige Zeiten oft wichtig.",
  },
  {
    q: "Gibt es eine Garantie, dass Flecken verschwinden?",
    a: "Nein. Flecken hängen von Material, Alter, Vorbehandlung, Farbstoff, Feuchtigkeit und Tiefe ab. FLOXANT prüft den Fall ehrlich nach Fotos und nennt Grenzen, statt eine pauschale Fleckengarantie zu versprechen.",
  },
  {
    q: "Gibt es Orientteppichwäsche, Lederpflege oder Teppichreparatur?",
    a: "Nicht als normale FLOXANT-Leistung. Orientteppichwäsche, Lederpflege, Reparaturen, Mottenfraß, Imprägnierung, Spezialfasern oder starke Geruchs- und Urinprobleme werden ohne gesonderte Prüfung nicht beworben.",
  },
];

const relatedLinks = [
  { href: "/grundreinigung-regensburg", label: "Grundreinigung Regensburg" },
  { href: "/bueroreinigung-regensburg", label: "Büroreinigung Regensburg" },
  { href: "/hotelreinigung-regensburg", label: "Hotelreinigung Regensburg" },
  { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg" },
  { href: "/fensterreinigung-regensburg", label: "Fensterreinigung Regensburg" },
  { href: "/baureinigung-regensburg", label: "Baureinigung Regensburg" },
  { href: "/unterhaltsreinigung-regensburg", label: "Unterhaltsreinigung Regensburg" },
  { href: "/gewerbereinigung-regensburg", label: "Gewerbereinigung Regensburg" },
  { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot prüfen" },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "teppichreinigung-regensburg",
    title: "Teppichreinigung Regensburg | Polster & Sofa | FLOXANT",
    description:
      "Teppichreinigung, Teppichbodenreinigung und Polsterreinigung in Regensburg nach Prüfung: Sofa, Bürostühle, Flecken, Fotos, Material und Angebot senden.",
    keywords: [
      "Teppichreinigung Regensburg",
      "Teppichbodenreinigung Regensburg",
      "Polsterreinigung Regensburg",
      "Sofa reinigen lassen Regensburg",
      "Bürostühle reinigen Regensburg",
      "Teppichreinigung Kosten Regensburg",
      "Büro Teppich reinigen Regensburg",
      "Teppich nach Auszug reinigen Regensburg",
      "Flecken entfernen Teppich Regensburg",
    ],
  });
}

export default function TeppichreinigungRegensburgPage() {
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hallo FLOXANT, wir möchten Teppich- oder Polsterreinigung in Regensburg anfragen. Objektart, Fläche/Stückzahl, Material, Flecken, Termin und Fotos können wir senden.",
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung", item: "/reinigung" },
        { name: "Gewerbereinigung Regensburg", item: "/gewerbereinigung-regensburg" },
        { name: "Teppichreinigung Regensburg", item: pagePath },
      ]),
      buildServiceJsonLd({
        name: "Teppichreinigung Regensburg",
        description:
          "Teppichreinigung, Teppichbodenreinigung und Polsterreinigung in Regensburg für Teppichboden, Läufer, Sofa, Polster, Bürostühle, Laufspuren und Flecken nach Material, Fotos, Zugang und Termin.",
        path: pagePath,
        serviceType:
          "Teppichreinigung, Teppichbodenreinigung, Polsterreinigung, Sofa-Reinigung und Bürostuhl-Reinigung in Regensburg",
        areaServed: ["Regensburg", "Landkreis Regensburg", "Neutraubling", "Lappersdorf", "Pentling", "Bayern nach Verfügbarkeit"],
      }),
      buildWebPageJsonLd({
        name: "Teppichreinigung Regensburg für Teppichboden, Sofa, Polster und Bürostühle",
        description:
          "Kundennaher Einstieg für Teppich- und Polsterreinigung in Regensburg mit Suchbegriffen, Materialprüfung, Anfragecheckliste, FAQ, Grenzen und direkter Kontaktmöglichkeit.",
        path: pagePath,
        about: [
          "Teppichreinigung Regensburg",
          "Teppichbodenreinigung Büro",
          "Polsterreinigung Regensburg",
          "Sofa reinigen lassen",
          "Bürostühle reinigen",
          "Flecken entfernen",
          "Materialprüfung",
        ],
        potentialActions: [
          { name: "Teppichreinigung anfragen", target: `${pagePath}#kontakt`, type: "ContactAction" },
          { name: "Teppich- und Polsterfotos per WhatsApp senden", target: whatsappUrl, type: "ContactAction" },
        ],
      }),
      {
        "@type": "ItemList",
        name: "Kundensuchen zur Teppichreinigung Regensburg",
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
          { label: "Gewerbereinigung Regensburg", href: "/gewerbereinigung-regensburg" },
          { label: "Teppichreinigung Regensburg" },
        ]}
      />

      <section id="ueberblick" className="relative overflow-hidden px-6 pb-12 pt-6 lg:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="flox-grid-backdrop" />
          <FloxantSymbolLayer variant="cleaning" density="soft" mode="hero" className="opacity-15" />
        </div>

        <div className="flox-shell relative">
          <div className="grid gap-5 xl:grid-cols-[1.03fr_0.97fr] xl:items-stretch">
            <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-9 md:py-9">
              <div className="flox-kicker">
                <Sparkles className="h-4 w-4" />
                Teppichreinigung Regensburg
              </div>

              <h1 className="mt-6 max-w-[18ch] text-[clamp(2.05rem,4.2vw,3.9rem)] font-black leading-[0.98] text-slate-950">
                Teppich, Sofa und Polster richtig prüfen lassen.
              </h1>

              <p className="mt-5 max-w-[62ch] text-base leading-8 text-slate-700">
                FLOXANT prüft Teppichreinigung, Teppichbodenreinigung und
                Polsterreinigung in Regensburg für Wohnung, Büro, Praxis, Hotel
                und Objekt. Wichtig sind Material, Fläche, Flecken, Geruch,
                Nutzung, Zugang, Termin und gute Fotos.
              </p>

              <nav
                aria-label="Schnelle Auswahl für Teppichreinigung Regensburg"
                className="mt-6 flex flex-wrap gap-2"
              >
                {[
                  ["Kundensuchen", "#kunden-suchen"],
                  ["Leistungen", "#leistungen"],
                  ["Kostenfaktoren", "#kostenfaktoren"],
                  ["Checkliste", "#anfrage-checkliste"],
                ].map(([label, href]) => (
                  <a key={href} href={href} className="flox-chip hover:border-blue-200 hover:bg-blue-50">
                    {label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#kontakt" className="flox-button-primary px-6">
                  Teppichreinigung anfragen
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flox-button-secondary px-6">
                  <MessageCircle className="h-4 w-4" />
                  Fotos per WhatsApp senden
                </a>
              </div>
            </article>

            <aside className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
              <Image
                src="https://images.unsplash.com/photo-1742483359033-13315b247c74?q=80&w=1600&auto=format&fit=crop"
                alt="Teppichreinigung mit Reinigungsgerät als Beispiel für Regensburg"
                fill
                priority
                sizes="(min-width: 1280px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/52 to-slate-900/8" />
              <div className="relative flex h-full min-h-[420px] flex-col justify-end p-6 md:p-8">
                <div className="max-w-md">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/12 px-3 py-2 text-[10px] font-black uppercase text-white">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Material erst prüfen
                  </div>
                  <h2 className="mt-4 text-2xl font-black text-white md:text-3xl">
                    Material, Flecken und Nutzung entscheiden über den Aufwand.
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Fotos", "senden"],
                      ["Material", "prüfen"],
                      ["Flecken", "einordnen"],
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
            <div className="flox-kicker">Kundensuchen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Kunden wollen wissen: laesst sich mein Teppich oder Sofa sinnvoll reinigen?
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Viele Kunden suchen ganz konkret nach Teppichbodenreinigung Büro,
              Polsterreinigung Regensburg, Sofa reinigen lassen, Bürostühle reinigen oder
              Teppichreinigung Kosten in Regensburg. Die Seite beantwortet diese
              Wörter direkt und fragt die Daten ab, die wirklich helfen.
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

      <section id="leistungen" className="flox-section pt-0">
        <div className="flox-shell grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article>
            <div className="flox-kicker">Leistungen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Textilflächen brauchen eine andere Einordnung als normale Reinigung.
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {serviceAreas.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.label} className="flox-panel rounded-[1.2rem] px-5 py-5">
                    <Icon className="h-6 w-6 text-blue-700" />
                    <h3 className="mt-4 text-lg font-black text-slate-950">{item.label}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </article>

          <article className="flox-panel-dark rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Anlass</div>
            <h2 className="mt-6 text-[clamp(1.9rem,3.7vw,3rem)] font-black text-white">
              Für Büro, Wohnung, Hotel oder Übergabe.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Teppich- und Polsterreinigung ist kein Einheitsprodukt. Ob Büro,
              Sofa, Hotelpolster oder Übergabe: Material, Risiko und Zeitfenster
              müssen vor der Zusage klar sein.
            </p>
            <div className="mt-6 grid gap-3">
              {occasionOptions.map((item) => (
                <div key={item.label} className="rounded-[1.1rem] border border-white/10 bg-white/6 px-4 py-3">
                  <p className="text-sm font-black text-cyan-100">{item.label}</p>
                  <p className="mt-1 text-sm leading-7 text-slate-200">{item.text}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="kostenfaktoren" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Kostenfaktoren</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Diese vier Punkte machen die Anfrage deutlich genauer.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {decisionSignals.map((item) => {
              const Icon = item.Icon;
              return (
                <article key={item.title} className="flox-panel rounded-[1.5rem] p-6">
                  <Icon className="h-6 w-6 text-blue-700" />
                  <h3 className="mt-5 text-xl font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="anfrage-checkliste" className="flox-section pt-0">
        <div className="flox-shell grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker">Anfrage-Checkliste</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              So kann FLOXANT schneller und ehrlicher antworten.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Bei Teppich und Polster entscheidet das Material. Ein Foto von der
              Gesamtfläche, eine Nahaufnahme der Flecken, ein Materialetikett
              und die Nutzung sagen mehr als lange Beschreibungen.
            </p>
          </article>

          <div className="grid gap-3 sm:grid-cols-2">
            {requestChecklist.map((item) => (
              <div key={item} className="flox-panel flex items-start gap-3 rounded-[1.3rem] p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                <span className="text-sm font-bold leading-7 text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flox-section pt-0">
        <div className="flox-shell grid gap-5 lg:grid-cols-[1fr_1fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker">Haeufige Fragen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Kurze Antworten, damit Zustand, Material und Preisrahmen klarer werden.
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
              Was Teppichreinigung nicht automatisch bedeutet.
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
                  Interne Links für Teppich und Polster in Regensburg.
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
            <div className="flox-kicker">Teppichreinigung anfragen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Material, Flecken und Fotos senden. FLOXANT prüft den nächsten Schritt.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-700">
              Für eine schnelle Einordnung reichen Adresse, Objektart,
              Teppich- oder Polsterart, Maße, Stückzahl, Flecken, Geruch,
              Materialfoto, Termin, Zugang und ein paar klare Bilder.
            </p>
          </div>

          <CommercialCleaningLeadForm />
        </div>
      </section>
    </main>
  );
}
