import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Home,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";

import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/reinigung-nach-veranstaltung";
const whatsappHref = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hallo FLOXANT, ich brauche Reinigung nach einer Veranstaltung oder Party. Ich sende Ort, Fotos, Fläche, Termin und gewünschtes Ergebnis.",
)}`;

const faqItems = [
  {
    q: "Welche Anlaesse kann FLOXANT nach der Veranstaltung reinigen?",
    a: "Möglich sind private Feiern, Firmenfeiern, Empfänge, Seminare, Praxistermine, Kanzlei-Events, Hausgemeinschaften, Apartments, Boardinghouses und kleinere Veranstaltungsflächen. Der konkrete Umfang wird nach Fotos, Fläche, Zugang und Zeitfenster geprüft.",
  },
  {
    q: "Was gehoert typischerweise zur Reinigung nach Party oder Event?",
    a: "Typisch sind Böden, Sanitärbereiche, Küche oder Teeküche, Tische, Nebenflächen, Eingangsbereich, Treppenhausanteile, Abfalltrennung, Geruchsreduzierung und die Vorbereitung für die nächste Nutzung oder Übergabe.",
  },
  {
    q: "Kann die Reinigung sehr kurzfristig erfolgen?",
    a: "Kurzfristige Termine können geprüft werden, wenn Ort, Fotos, Fläche, Deadline, Zugang und Ansprechpartner schnell vorliegen. FLOXANT gibt keine pauschale Sofortgarantie, sondern prüft Machbarkeit und Reihenfolge seriös.",
  },
  {
    q: "Wie wird der Preis für eine Eventreinigung eingeschätzt?",
    a: "Entscheidend sind Fläche, Verschmutzung, Anzahl der Bereiche, Sanitär- und Küchenanteil, Müllmenge, Uhrzeit, Anfahrt, Parkmöglichkeit, Etage, Zugang und ob eine Übergabe oder erneute Nutzung direkt bevorsteht.",
  },
  {
    q: "Ist die Seite auch für Unternehmen geeignet?",
    a: "Ja. Gerade Büros, Kanzleien, Praxen, Hotels, Apartmenthäuser, Agenturen und Gewerbeflächen brauchen nach einem Anlass oft schnell wieder saubere Räume für Kunden, Mitarbeitende oder Gäste.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildBreadcrumbJsonLd([
      { name: "FLOXANT", item: "/" },
      { name: "Reinigung", item: "/reinigung" },
      { name: "Reinigung nach Veranstaltung", item: path },
    ]),
    buildServiceJsonLd({
      name: "Reinigung nach Veranstaltung, Party und Anlass",
      description:
        "Reinigung nach Party, Firmenfeier, Event, Empfang, Seminar oder Objektanlass mit Fotos, Fläche, Zugang und Termin prüfen lassen.",
      path,
      serviceType: "Eventreinigung",
      areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern", "Duesseldorf Reinigung nach Verfuegbarkeit"],
    }),
    buildWebPageJsonLd({
      name: "Reinigung nach Veranstaltung, Party und Event | FLOXANT",
      description:
        "Reinigung nach Anlass für private Feiern, Firmenfeiern, Events, Empfänge, Seminare, Apartments und Gewerbeflächen.",
      path,
      about: [
        "Reinigung nach Veranstaltung",
        "Reinigung nach Party",
        "Eventreinigung",
        "Firmenfeier Reinigung",
        "Reinigung nach Anlass",
      ],
      potentialActions: [
        { name: "Eventreinigung anfragen", target: "/buchung?service=reinigung&context=veranstaltung", type: "ContactAction" },
      ],
    }),
    buildFaqJsonLd(faqItems),
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "reinigung-nach-veranstaltung",
    title: "Reinigung nach Veranstaltung, Party & Event | FLOXANT",
    description:
      "Reinigung nach Veranstaltung, Party, Firmenfeier oder Event: Böden, Sanitär, Küche, Müll, Geruch und Übergabe konkret prüfen lassen.",
  });
}

function SectionTitle({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-700">{label}</p>
      <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 md:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-8 text-slate-700">{text}</p> : null}
    </div>
  );
}

export default function ReinigungNachVeranstaltungPage() {
  const occasionCards = [
    {
      icon: Home,
      title: "Private Party, Geburtstag oder Feier",
      text: "Wenn Wohnung, Haus, Gemeinschaftsraum, Küche, Bad oder Treppenhaus nach einem Abend wieder sauber und nutzbar werden sollen.",
    },
    {
      icon: Building2,
      title: "Firmenfeier, Empfang oder Kundentermin",
      text: "Wenn Empfang, Meetingraum, Bürofläche, Sanitär, Küche und Kundenbereiche am nächsten Tag wieder sauber und nutzbar sein müssen.",
    },
    {
      icon: CalendarClock,
      title: "Seminar, Workshop oder Praxisanlass",
      text: "Wenn Behandlungs-, Beratungs-, Schulungs- oder Nebenraeume nach einem Termin geordnet gereinigt und vorbereitet werden sollen.",
    },
    {
      icon: Sparkles,
      title: "Apartment, Hotelnähe oder Boardinghouse",
      text: "Wenn Gästewechsel, kleine Events, Aufenthalte oder Sondernutzungen eine gezielte Reinigung mit schneller Rückmeldung brauchen.",
    },
  ];

  const whatWeCheck = [
    "Böden, Laufwege, Eingangsbereich und sichtbare Hauptflächen",
    "Sanitärbereiche, Küche, Teeküche, Tische und Kontaktflächen",
    "Müll, Verpackung, Flaschen, Kartons, Restmengen und sortierbare Abfaelle",
    "Geruch, Flecken, Klebereste, Feuchtigkeit, Zugang und nächste Nutzung",
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f2fbf7_45%,#eef5ff_100%)] pb-24 text-slate-950">
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-10 text-white shadow-2xl shadow-slate-300/60 md:px-12 md:py-16">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-200">
                  <Sparkles className="h-4 w-4" />
                  Reinigung nach Anlass
                </p>
                <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-normal text-white md:text-6xl">
                  Reinigung nach Veranstaltung, Party und Event
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-100">
                  Nach einer Veranstaltung entscheidet der erste Eindruck am nächsten Morgen: riecht der Raum frisch, sind
                  Sanitär und Küche wieder nutzbar, sind Böden, Tische und Eingangsbereiche sauber, und ist der Abfall
                  geordnet? FLOXANT prüft Reinigungen nach privaten Feiern, Firmenanlaessen, Seminaren, Empfängen und
                  gewerblichen Sondernutzungen mit klarer Objektlogik statt pauschalem Versprechen.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/buchung?service=reinigung&context=veranstaltung"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-emerald-50"
                  >
                    Eventreinigung anfragen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={whatsappHref}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-emerald-900/30 transition hover:-translate-y-0.5 hover:bg-emerald-400"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Fotos per WhatsApp senden
                  </Link>
                  <Link
                    href={`tel:${company.phoneRaw}`}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/25 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Anrufen
                  </Link>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-6">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-200">Was den Preis beeinflusst</p>
                <div className="mt-6 grid gap-3">
                  {[
                    ["Anlass", "Private Feier, Firmenfeier, Seminar, Empfang, Gästewechsel oder Sondernutzung."],
                    ["Fläche", "Räume, Sanitär, Küche, Laufwege, Nebenflächen und Treppenhausanteile."],
                    ["Zustand", "Müll, Flecken, Geruch, Klebereste, Feuchtigkeit und Intensitaet der Nutzung."],
                    ["Zeitfenster", "Reinigung direkt danach, am Morgen danach oder vor Übergabe und nächster Nutzung."],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                      <p className="font-black text-white">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-200">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            label="Für welche Anlaesse"
            title="Von privater Feier bis B2B-Event: entscheidend ist die nächste Nutzung"
            text="Eine gute Reinigung nach einem Anlass ist nicht nur Aufräumen. Sie stellt den Raum wieder in einen Zustand, in dem Kunden, Mitarbeitende, Gäste, Vermieter oder Hausverwaltung den nächsten Schritt ohne unangenehme Überraschung erleben."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {occasionCards.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <Icon className="h-7 w-7 text-emerald-700" />
                  <h3 className="mt-5 text-xl font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-8 text-slate-700">{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white/85">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <SectionTitle
              label="Ablauf"
              title="Nach dem Anlass muss die Fläche wieder führbar sein"
              text="FLOXANT betrachtet Eventreinigung als Objektvorbereitung. Es geht um sichtbare Sauberkeit, hygienische Basis, geordnete Restmengen, gute Luft und eine klare Rückmeldung, ob etwas außerhalb der normalen Reinigung liegt."
            />
            <div className="grid gap-4">
              {whatWeCheck.map((text) => (
                <div key={text} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                  <p className="leading-7 text-slate-800">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-7 lg:col-span-2">
              <ClipboardCheck className="h-8 w-8 text-emerald-800" />
              <h2 className="mt-5 text-2xl font-black text-slate-950">So wird Ihre Anfrage schnell pruefbar</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  ["Ort und Zugang", "Adresse, Stadtteil, Etage, Aufzug, Schlüssel, Ansprechpartner und Parkmöglichkeit."],
                  ["Fotos und Fläche", "Kurze Bilder der Böden, Sanitärbereiche, Küche, Hauptflächen und Restmengen."],
                  ["Anlass und Nutzung", "Was war der Anlass, wie viele Personen waren da und wann wird die Fläche wieder gebraucht?"],
                  ["Ergebnisziel", "Nur Grundsauberkeit, komplette Wiederherstellung, Übergabe, Gästewechsel oder Kundentermin."],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl bg-white p-5">
                    <p className="font-black text-slate-950">{title}</p>
                    <p className="mt-2 leading-7 text-slate-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
              <Camera className="h-8 w-8 text-slate-900" />
              <h2 className="mt-5 text-2xl font-black text-slate-950">Fotos schlagen lange Erklaerungen</h2>
              <p className="mt-4 leading-8 text-slate-700">
                Drei bis acht klare Fotos helfen mehr als eine ungenaue Beschreibung. Zeigen Sie den schlechtesten Bereich, den
                Eingangsbereich, Sanitär, Küche, Böden und Restmengen. Dann kann FLOXANT schneller erkennen, ob Reinigung,
                Entsorgung oder eine Kombination sinnvoll ist.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <ShieldCheck className="h-8 w-8 text-slate-900" />
                <h2 className="mt-5 text-2xl font-black text-slate-950">Keine austauschbare Party-Seite, sondern klare Reinigungsentscheidung</h2>
                <p className="mt-4 leading-8 text-slate-700">
                  Kunden suchen nach einer Veranstaltung meistens nicht nach dekorativen Versprechen. Sie brauchen eine Firma,
                  die versteht, dass Zeitfenster, Hausordnung, Nachbarn, Geruch, Abfall, Sanitär, Küche und Wiederbenutzung
                  zusammenhängen. Deshalb fragt FLOXANT gezielt nach Anlass, Fläche, Zeitdruck und Ergebnis. So wird aus einer
                  unklaren Nachricht eine Anfrage, die ein Betrieb ernsthaft prüfen kann.
                </p>
              </div>
              <div className="grid gap-3">
                {[
                  { href: "/notfallreinigung-24h", label: "Notfallreinigung 24h" },
                  { href: "/reinigung", label: "Reinigung Hauptseite" },
                  { href: "/gewerbereinigung-regensburg", label: "Gewerbereinigung Regensburg" },
                  { href: "/duesseldorf/hotelreinigung", label: "Hotelreinigung Duesseldorf" },
                  { href: "/duesseldorf/bueroreinigung", label: "Bueroreinigung Duesseldorf" },
                  { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Duesseldorf Stadtteile und Umgebung" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex min-h-14 items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 font-black text-slate-950 transition hover:bg-white"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 text-slate-500" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <SectionTitle label="Haeufige Fragen" title="Was Kunden vor der Anfrage wissen sollten" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <article key={item.q} className="rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-black text-slate-950">{item.q}</h3>
                <p className="mt-3 leading-8 text-slate-700">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-[1.5rem] bg-slate-950 p-7 text-white md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-200">Anlass sauber abschliessen</p>
                <h2 className="mt-3 text-3xl font-black">Senden Sie Anlass, Ort, Fotos und nächste Nutzung. FLOXANT prüft die passende Reinigung.</h2>
                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 leading-8 text-slate-200">
                  <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Regensburg, Bayern und Duesseldorf Reinigung nach Pruefung</span>
                  <span className="inline-flex items-center gap-2"><Trash2 className="h-4 w-4" /> Reinigung mit Restmengen möglich</span>
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/buchung?service=reinigung&context=veranstaltung" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-950">
                  Anfrage starten
                  <CalendarClock className="h-4 w-4" />
                </Link>
                <Link href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-white">
                  WhatsApp mit Fotos
                  <MessageCircle className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
