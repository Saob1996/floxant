import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarClock,
  Camera,
  CheckCircle2,
  Clock3,
  Home,
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

const path = "/notfallreinigung-24h";
const whatsappHref = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hallo FLOXANT, ich brauche eine schnelle Notfallreinigung. Ich sende Ort, Fotos, Termin und kurze Beschreibung.",
)}`;

const faqItems = [
  {
    q: "Ist die Notfallreinigung 24 Stunden garantiert?",
    a: "Die Seite ist fuer dringende Reinigungsanfragen gedacht, die jederzeit vorbereitet und gesendet werden koennen. FLOXANT prueft den Fall priorisiert nach Ort, Umfang, Fotos, Zugang und verfuegbarer Kapazitaet. Eine automatische Sofortgarantie oder feste 24/7-Zusage entsteht dadurch nicht.",
  },
  {
    q: "Welche Faelle passen zu einer Notfallreinigung?",
    a: "Typische Faelle sind stark verschmutzte Wohnungen, kurzfristige Uebergaben, Reinigung nach Party oder Veranstaltung, Gewerbeflaechen vor Oeffnung, Treppenhaus- oder Kellerprobleme, Restverschmutzung nach Raeumung und Situationen, in denen ein Termin sonst kippen wuerde.",
  },
  {
    q: "Was soll ich fuer eine schnelle Einschaetzung senden?",
    a: "Hilfreich sind Ort, Objektart, ungefaehre Flaeche, Fotos oder Video, gewuenschter Termin, Zugang, Etage, Park- oder Ladezone, Ansprechpartner und eine klare Beschreibung, was unbedingt erledigt werden muss.",
  },
  {
    q: "Kann FLOXANT auch mit Entsorgung oder Raeumung helfen?",
    a: "Wenn neben Reinigung noch Restgegenstaende, Sperrmuell, Kartons oder Nebenflaechen betroffen sind, kann FLOXANT den Fall gemeinsam einordnen. Gefaehrliche Stoffe, Sondermuell oder medizinische Spezialreinigung werden nur nach ausdruecklicher Pruefung behandelt.",
  },
  {
    q: "Ist die Seite auch fuer Firmen und Hausverwaltungen geeignet?",
    a: "Ja. Bueros, Praxen, Kanzleien, Hausverwaltungen, Vermieter, Ferienwohnungen und kleine Gewerbeflaechen koennen eine dringende Reinigung strukturiert anfragen. Entscheidend sind klare Angaben zu Flaeche, Zeitfenster, Zugang und Verantwortlichem vor Ort.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildBreadcrumbJsonLd([
      { name: "FLOXANT", item: "/" },
      { name: "Reinigung", item: "/reinigung" },
      { name: "Notfallreinigung 24h", item: path },
    ]),
    buildServiceJsonLd({
      name: "Notfallreinigung 24h anfragen",
      description:
        "Dringende Reinigung fuer Wohnung, Buero, Gewerbe, Veranstaltung, Uebergabe und Objektfaelle nach Fotos, Ort, Termin und Verfuegbarkeit pruefen lassen.",
      path,
      serviceType: "Notfallreinigung",
      areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern", "Duesseldorf Reinigung nach Verfuegbarkeit"],
    }),
    buildWebPageJsonLd({
      name: "Notfallreinigung 24h anfragen | FLOXANT",
      description:
        "Schnelle Reinigungsanfrage fuer akute Faelle mit Fotos, Ort, Termin, Zugang und klarer Priorisierung.",
      path,
      about: [
        "Notfallreinigung",
        "24h Reinigungsanfrage",
        "Reinigung nach Party",
        "Reinigung vor Uebergabe",
        "Bueroreinigung kurzfristig",
      ],
      potentialActions: [
        { name: "Notfallreinigung anfragen", target: "/buchung?service=reinigung&urgency=notfall", type: "ContactAction" },
      ],
    }),
    buildFaqJsonLd(faqItems),
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "notfallreinigung-24h",
    title: "Notfallreinigung 24h | schnelle Reinigung anfragen",
    description:
      "Notfallreinigung 24h anfragen: Wohnung, Buero, Gewerbe, Veranstaltung oder Uebergabe. Fotos, Ort, Termin und Zugang senden. FLOXANT prueft schnell.",
    keywords: [
      "Notfallreinigung",
      "Notfallreinigung 24h",
      "Reinigung Notfall",
      "schnelle Reinigung",
      "Reinigung kurzfristig",
      "Reinigung nach Party",
      "Reinigung vor Uebergabe",
      "Bueroreinigung kurzfristig",
      "Reinigungsfirma Notfall",
    ],
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
      <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">{label}</p>
      <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 md:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-8 text-slate-700">{text}</p> : null}
    </div>
  );
}

export default function Notfallreinigung24hPage() {
  const urgentCases = [
    {
      icon: Home,
      title: "Wohnung oder Haus kurzfristig reinigen",
      text: "Wenn Auszug, Rueckgabe, Besichtigung oder Familienbesuch naeher rueckt und die Raeume deutlich mehr Aufmerksamkeit brauchen als geplant.",
    },
    {
      icon: Building2,
      title: "Buero, Praxis, Kanzlei oder Gewerbe",
      text: "Wenn Empfang, Arbeitsbereiche, Sanitaer, Kueche, Besprechungsraum oder Kundenflaeche schnell wieder praesentabel werden muessen.",
    },
    {
      icon: Sparkles,
      title: "Nach Party, Anlass oder Veranstaltung",
      text: "Wenn Boeden, Geruch, Glaeser, Verpackung, Kueche, Sanitaer oder Nebenflaechen nach einem Anlass geordnet gereinigt werden sollen.",
    },
    {
      icon: Trash2,
      title: "Reinigung mit Restmengen",
      text: "Wenn Kartons, Kleinmuell, Keller, Abstellraum oder einzelne Gegenstaende die Reinigung blockieren und vorher sauber eingeordnet werden muessen.",
    },
  ];

  const processSteps = [
    "Ort, Objektart, Deadline und Telefonnummer senden",
    "Fotos oder kurzes Video der betroffenen Bereiche beilegen",
    "Zugang, Etage, Parkmoeglichkeit und Schluesselthema klaeren",
    "FLOXANT prueft Aufwand, Reihenfolge, Grenzen und naechsten Schritt",
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef7f4_46%,#ffffff_100%)] pb-24 text-slate-950">
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-10 text-white shadow-2xl shadow-slate-300/60 md:px-12 md:py-16">
            <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                  <AlertTriangle className="h-4 w-4" />
                  Dringende Reinigungsanfrage
                </p>
                <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-normal text-white md:text-6xl">
                  Notfallreinigung 24h anfragen
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-100">
                  Wenn ein Objekt kurzfristig sauber, begehbar oder uebergabebereit werden muss, zaehlt nicht ein langer Text,
                  sondern eine klare Einschaetzung: Was ist passiert, wo ist das Objekt, wie gross ist die Flaeche, bis wann
                  muss es erledigt sein und welche Fotos zeigen den Zustand? FLOXANT prueft dringende Reinigungsfaelle
                  priorisiert und sagt ehrlich, welcher naechste Schritt nach Verfuegbarkeit sinnvoll ist.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/buchung?service=reinigung&urgency=notfall"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-cyan-50"
                  >
                    Notfallreinigung anfragen
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
                <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">Schnelle Pruefung braucht Klarheit</p>
                <div className="mt-6 grid gap-3">
                  {[
                    ["Fotos", "Zustand, Verschmutzung, Zugang und betroffene Bereiche sichtbar machen."],
                    ["Termin", "Deadline, gewuenschtes Zeitfenster und Dringlichkeit klar nennen."],
                    ["Ort", "Adresse oder Stadtteil, Etage, Aufzug, Parkmoeglichkeit und Schluesselzugang."],
                    ["Ziel", "Nur Grundsauberkeit, Uebergabe, Kundenflaeche, Geruch, Sanitaer oder komplette Flaeche."],
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
            label="Wann diese Seite passt"
            title="Notfall heisst: zuerst sauber sortieren, dann schnell entscheiden"
            text="Eine dringende Reinigung ist selten nur eine Frage von mehr Personal. Entscheidend ist, ob die Flaeche erreichbar ist, welche Verschmutzung vorliegt, ob Entsorgung noetig ist, wie hart die Deadline ist und welches Ergebnis wirklich gebraucht wird. Genau dafuer ist diese Seite aufgebaut."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {urgentCases.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <Icon className="h-7 w-7 text-cyan-700" />
                  <h3 className="mt-5 text-xl font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-8 text-slate-700">{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white/80">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <SectionTitle
              label="Anfahrts- und Preislogik"
              title="Schnelle Reinigung wird nach Aufwand, Zugang und Zeitfenster geprueft"
              text="Der Preis entsteht nicht aus einem starren Notfallwort, sondern aus der Kombination von Flaeche, Zustand, Uhrzeit, Entfernung, Material, Personalbedarf, Parkmoeglichkeit und Ziel. Eine kleine Flaeche mit gutem Zugang kann schneller pruefbar sein als eine grosse Flaeche mit unklarem Schluessel, fehlenden Fotos oder blockierten Wegen."
            />
            <div className="grid gap-4">
              {[
                "Regensburg und Umgebung werden als Kerngebiet besonders direkt eingeordnet.",
                "Bayernweite Anfragen werden nach Strecke, Uhrzeit, Kapazitaet und Umfang geprueft.",
                "Duesseldorf wird sauber als Reinigungs- und Entsorgungsbereich behandelt, nicht als Umzugsleistung.",
                "Bei starkem Zeitdruck helfen klare Fotos, kurze Sprachnachricht und erreichbare Kontaktperson am meisten.",
              ].map((text) => (
                <div key={text} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                  <p className="leading-7 text-slate-800">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[1.5rem] border border-cyan-200 bg-cyan-50 p-7">
              <Camera className="h-8 w-8 text-cyan-800" />
              <h2 className="mt-5 text-2xl font-black text-slate-950">Was wir fuer eine schnelle Rueckmeldung brauchen</h2>
              <div className="mt-6 grid gap-3">
                {processSteps.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl bg-white p-4">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <p className="leading-7 text-slate-800">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-7">
              <ShieldCheck className="h-8 w-8 text-amber-700" />
              <h2 className="mt-5 text-2xl font-black text-slate-950">Professionelle Grenze statt falsches Versprechen</h2>
              <p className="mt-4 leading-8 text-slate-800">
                FLOXANT nimmt dringende Situationen ernst, verspricht aber keinen blinden Soforteinsatz ohne Pruefung. Das ist im
                Interesse des Kunden: Erst wenn Zustand, Zugang, Zeitfenster und Ergebnisziel klar sind, kann ein Reinigungsfall
                serioes eingeordnet werden. Bei Sondermuell, gefaehrlichen Stoffen, biologischen Risiken, Schimmel, Brand- oder
                Wasserschaden kann eine besondere Fachpruefung oder ein Spezialbetrieb erforderlich sein.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/schadensbegrenzung" className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950 shadow-sm">
                  Schadensbegrenzung
                </Link>
                <Link href="/plan-b-service" className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950 shadow-sm">
                  Plan-B-Service
                </Link>
                <Link href="/reinigung-nach-veranstaltung" className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950 shadow-sm">
                  Nach Veranstaltung
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <SectionTitle label="Haeufige Fragen" title="Klare Antworten vor der Anfrage" />
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
                <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-200">Jetzt sauber starten</p>
                <h2 className="mt-3 text-3xl font-black">Senden Sie Ort, Fotos und Deadline. FLOXANT prueft den schnellsten sinnvollen Weg.</h2>
                <p className="mt-4 max-w-3xl leading-8 text-slate-200">
                  Passende interne Einstiege: <Link className="font-black text-white underline" href="/reinigung">Reinigung</Link>,{" "}
                  <Link className="font-black text-white underline" href="/endreinigung-regensburg">Endreinigung Regensburg</Link>,{" "}
                  <Link className="font-black text-white underline" href="/gewerbereinigung-regensburg">Gewerbereinigung Regensburg</Link> und{" "}
                  <Link className="font-black text-white underline" href="/duesseldorf/reinigung">Reinigung Duesseldorf</Link>.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/buchung?service=reinigung&urgency=notfall" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-950">
                  Anfrage starten
                  <CalendarClock className="h-4 w-4" />
                </Link>
                <Link href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-white">
                  WhatsApp mit Fotos
                  <Clock3 className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
