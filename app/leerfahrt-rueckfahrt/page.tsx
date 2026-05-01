import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarClock, MapPin, PackageOpen, Route, ShieldCheck, Truck } from "lucide-react";

import { BackhaulOffersBoard } from "@/components/BackhaulOffersBoard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { company } from "@/lib/company";
import { FALLBACK_BACKHAUL_OFFERS, normalizeBackhaulOffer, type BackhaulOffer } from "@/lib/backhaul-offers";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const faqItems = [
  {
    q: "Was ist eine Leer-Rückfahrt bei FLOXANT?",
    a: "Eine Leer-Rückfahrt entsteht, wenn ein Fahrzeug nach einem Auftrag ohnehin Richtung Regensburg zurückfährt und noch freie Kapazität hat. Diese freie Fläche kann für Möbel, Büroinventar, Kartons, Paletten, Einzelstücke oder Teilmengen genutzt werden.",
  },
  {
    q: "Warum ist eine Rückfahrt oft günstiger?",
    a: "Weil Fahrzeug, Fahrer und Route teilweise bereits eingeplant sind. Der faire Preis hängt trotzdem von Ladeort, Zielort, Volumen, Gewicht, Etage, Zeitfenster und Umweg ab.",
  },
  {
    q: "Für welche Richtungen ist der Service gedacht?",
    a: "Der Schwerpunkt liegt auf deutschlandweiten Rückfahrten Richtung Regensburg sowie Zielorten im Umkreis von etwa 150 km um Regensburg. Besonders interessant sind flexible Termine aus Bayern, Franken, Baden-Württemberg, Hessen und angrenzenden Regionen.",
  },
  {
    q: "Ist der Service auch für Firmen und große Büros geeignet?",
    a: "Ja. Wenn Büroinventar, Paletten, Archivkartons, Messematerial oder Möbelstücke zur freien Rückfahrt passen, kann FLOXANT die Mitnahme für Firmen, Kanzleien, Praxen, Agenturen und große Büros prüfen.",
  },
  {
    q: "Können Firmen auch mehrere Ladepunkte oder Zwischenstopps anfragen?",
    a: "Ja, sofern die Stopps sinnvoll auf der Route liegen und zur ohnehin geplanten Rückfahrt passen. Zusätzliche Wege und Ladepunkte werden vorab transparent geprüft und nicht automatisch als Standard zugesagt.",
  },
  {
    q: "Was passiert, wenn ein Abholort nur unterwegs liegt?",
    a: "Wenn der Abholort sinnvoll auf der Route liegt, prüfen wir den zusätzlichen Umweg. Der mögliche Mehrpreis wird vorher transparent besprochen und nicht automatisch als Festpreis zugesagt.",
  },
  {
    q: "Ist eine Leer-Rückfahrt garantiert verfügbar?",
    a: "Nein. FLOXANT prüft jede Anfrage nach Datum, Route, Fahrzeugkapazität und Ladeaufwand. Wenn es passt, entsteht ein fairer Rückfahrt-Preis; wenn nicht, empfehlen wir einen normalen Transport oder eine Beiladung.",
  },
];

async function loadOffers(): Promise<BackhaulOffer[]> {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("service", "leerfahrt_offer")
      .eq("status", "active")
      .order("timestamp", { ascending: false });

    if (error) throw error;
    const offers = (data || []).map(normalizeBackhaulOffer).filter((offer) => offer.status === "active");
    return offers.length ? offers : FALLBACK_BACKHAUL_OFFERS;
  } catch {
    return FALLBACK_BACKHAUL_OFFERS;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "leerfahrt-rueckfahrt",
    title: "Leer-Rückfahrt & Beiladung Richtung Regensburg | FLOXANT",
    description:
      "FLOXANT prüft Leer-Rückfahrten, Beiladung und Rücktransporte Richtung Regensburg: freie Kapazität für Möbel, Firmeninventar, Kartons, Paletten und Teiltransporte fair nutzen.",
    keywords: [
      "Leer Rückfahrt Regensburg",
      "Leerfahrt Umzug Regensburg",
      "Rücktransport nach Regensburg",
      "Beiladung Rückfahrt",
      "Firmen Leerfahrt Regensburg",
      "günstiger Möbeltransport Regensburg",
      "Firmeninventar Rücktransport Regensburg",
      "Teiltransport Regensburg Rückfahrt",
      "Leerfahrt Firma Bayern",
      "Büroinventar Mitnahme Regensburg",
    ],
  });
}

export default async function LeerfahrtRueckfahrtPage() {
  const offers = await loadOffers();
  const fitChecks = [
    {
      title: "Route passt",
      text: "Der Abholort liegt sinnvoll auf dem Weg Richtung Regensburg oder im planbaren Umweg.",
    },
    {
      title: "Termin bleibt flexibel",
      text: "Je flexibler Datum und Zeitfenster sind, desto eher kann freie Fahrzeugkapazität genutzt werden.",
    },
    {
      title: "Umfang ist klar",
      text: "Fotos, Maße, Gewicht und Stückzahl helfen, Volumen und Ladezeit realistisch einzuschätzen.",
    },
    {
      title: "Zugang ist machbar",
      text: "Etage, Aufzug, Ladezone und kurze Wege entscheiden oft, ob der Rückfahrt-Preis fair bleibt.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Leer-Rückfahrt", item: "/leerfahrt-rueckfahrt" },
      ]),
      buildWebPageJsonLd({
        name: "Leer-Rückfahrt nach Regensburg",
        description:
          "FLOXANT nutzt freie Fahrzeugkapazität auf Rückfahrten Richtung Regensburg für faire Beiladung, Firmenlieferungen, Möbeltransport und Teiltransporte.",
        path: "/leerfahrt-rueckfahrt",
        about: ["Leer-Rückfahrt", "Beiladung", "Regensburg", "Rücktransport", "Möbeltransport", "Büroinventar", "Firmenlieferung"],
      }),
      buildServiceJsonLd({
        name: "Leer-Rückfahrt und Beiladung Richtung Regensburg",
        description:
          "Faire Rückfahrt-Preise für Umzugsgut, Firmeninventar, Möbel, Kartons, Paletten und Teilmengen, wenn Route und freie Fahrzeugkapazität passen.",
        path: "/leerfahrt-rueckfahrt",
        serviceType: "Leer-Rückfahrt",
        areaServed: ["Regensburg", "Bayern", "Nürnberg", "München", "Deutschland"],
      }),
      buildFaqJsonLd(faqItems),
      {
        "@type": "ItemList",
        name: "Aktuelle FLOXANT Leer-Rückfahrten",
        itemListElement: offers.map((offer, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: offer.title,
          description: `${offer.origin} nach ${offer.destination}, ${offer.destinationRadius}. ${offer.availableCapacity}`,
          url: `${company.url}/leerfahrt-rueckfahrt#leerfahrt-anfrage`,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Leer-Rückfahrt" }]} />

      <section className="relative overflow-hidden px-6 pb-20 pt-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10rem] top-16 h-80 w-80 rounded-full bg-emerald-200/55 blur-3xl" />
          <div className="absolute right-[-8rem] top-6 h-96 w-96 rounded-full bg-blue-200/45 blur-3xl" />
          <FloxantSymbolLayer variant="moving" density="rich" className="opacity-55" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">
              <Truck className="h-4 w-4" />
              freie Rückfahrt Richtung Regensburg
            </div>
            <h1 className="mt-7 max-w-5xl text-4xl font-bold leading-[0.95] tracking-[-0.06em] text-slate-950 md:text-6xl">
              Leer-Rückfahrt Richtung Regensburg fair und flexibel nutzen
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              FLOXANT fährt nach Aufträgen regelmäßig Richtung Regensburg zurück. Wenn dabei freie
              Fahrzeugkapazität vorhanden ist, können Privatkunden, Firmen und größere Büros Möbel,
              Büroinventar, Kartons, Paletten, Einzelstücke oder Teilmengen fair mitnehmen lassen.
              Kein Lockpreis, sondern eine ehrliche Prüfung: Datum, Route, Volumen, Ladeaufwand und
              möglicher Umweg müssen zur Rückfahrt passen. So wird freie Strecke sinnvoll genutzt,
              ohne dass Sie direkt einen kompletten Transport buchen müssen. Kurz gesagt: wenn es
              gut auf die Route passt, wird es oft deutlich entspannter und fairer.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#aktuelle-rueckfahrten"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-500 to-cyan-500 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_46px_rgba(16,185,129,0.22)] transition-all hover:-translate-y-1"
              >
                Aktuelle Rückfahrten ansehen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/beiladung"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-slate-900 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50"
              >
                Beiladung vergleichen
              </Link>
            </div>
          </div>

          <div className="glass-elevated premium-scan rounded-[2.7rem] p-6 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
            <div className="grid gap-4">
              {[
                { icon: Route, label: "Richtung", value: "Deutschlandweit nach Regensburg" },
                { icon: MapPin, label: "Zielgebiet", value: "Regensburg + ca. 150 km Umkreis" },
                { icon: PackageOpen, label: "Geeignet für", value: "Büroinventar, Möbel, Kartons, Paletten" },
                { icon: CalendarClock, label: "Preislogik", value: "fair, wenn Route und Termin passen" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-[1.7rem] border border-slate-200 bg-white/92 p-5 shadow-sm shadow-slate-950/5">
                    <Icon className="mb-4 h-6 w-6 text-emerald-600" />
                    <div className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                      {item.label}
                    </div>
                    <div className="mt-2 text-lg font-bold text-slate-950">{item.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-glow relative px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            {
              title: "Für wen lohnt sich das?",
              text: "Für flexible Privatkunden, Firmen und große Büros, die Umzugsgut, Büroinventar, Möbel, Kartons oder Teilmengen Richtung Regensburg transportieren möchten und nicht zwingend eine eigene Fahrt brauchen.",
            },
            {
              title: "Wann ist es nicht passend?",
              text: "Wenn Termin, Ladepunkt, Volumen, Gewicht oder Umweg nicht zur geplanten Rückfahrt passen. Dann ist ein normaler Transport ehrlicher und planbarer.",
            },
            {
              title: "Warum FLOXANT?",
              text: "Weil Route, Preislogik, Umweg und Anfrage sauber geprüft werden. So wird freie Fahrzeugfläche genutzt, ohne falsche Versprechen zu machen.",
            },
          ].map((item) => (
            <article key={item.title} className="card-premium rounded-[2rem] p-7">
              <ShieldCheck className="mb-5 h-7 w-7 text-emerald-600" />
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-glow relative px-6 pb-16">
        <div className="mx-auto max-w-7xl rounded-[2.2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:p-8">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">
                Rückfahrt-Fit
              </div>
              <h2 className="mt-3 max-w-[14ch] text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Wann eine Leer-Rückfahrt wirklich Sinn ergibt
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-600">
              Eine Rückfahrt ist dann stark, wenn sie nicht künstlich passend gerechnet wird. Route,
              Termin, Volumen und Zugang müssen zusammen funktionieren. Wenn einer dieser Punkte
              nicht passt, ist ein normaler Transport oder eine Beiladung oft ehrlicher.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {fitChecks.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.55rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50/40"
              >
                <ShieldCheck className="mb-4 h-6 w-6 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="aktuelle-rueckfahrten" className="section-glow relative px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">Live-Angebote</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Aktuelle Leer-Rückfahrten und flexible Rücktransport-Anfragen
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600 md:text-right">
              Admin-gepflegte Rückfahrten erscheinen hier automatisch. Wenn aktuell keine konkrete
              Tour eingetragen ist, bleibt der flexible Rückfahrt-Check sichtbar.
            </p>
          </div>

          <BackhaulOffersBoard initialOffers={offers} />
        </div>
      </section>

      <section className="section-glow relative px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            FAQ zu Leer-Rückfahrt und fairem Rücktransport
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <article key={item.q} className="card-premium rounded-[1.7rem] p-6">
                <h3 className="text-xl font-bold text-slate-950">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow relative px-6 pb-20 pt-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:p-8">
          <div className="mb-8 max-w-3xl">
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">Direkte nächste Wege</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Rückfahrt, Beiladung und Firmeninventar sauber abgrenzen
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Wenn die freie Rückfahrt nicht exakt passt, gibt es oft trotzdem einen sinnvollen Weg:
              Beiladung, Firmenentsorgung oder eine normale Anfrage mit sauberer Vorprüfung.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/beiladung",
                label: "Beiladung für Einzelstücke",
                text: "Wenn keine konkrete Rückfahrt veröffentlicht ist, aber flexible Mitnahme trotzdem sinnvoll bleibt.",
              },
              {
                href: "/firmenentsorgung",
                label: "Firmenentsorgung & Büroinventar",
                text: "Für Büroinventar, Möbel, Kartons und reguläre Gewerbegegenstände mit sauberer Prüfung.",
              },
              {
                href: "/blog/leer-rueckfahrt-regensburg-firmen-moebeltransport",
                label: "Rückfahrt-Ratgeber",
                text: "Wann freie Kapazität wirklich passt und wann ein normaler Transport ehrlicher bleibt.",
              },
              {
                href: "/buchung",
                label: "Direkt anfragen",
                text: "Wenn Sie Strecke, Termin und Menge schon kennen und den Fall direkt sauber einordnen möchten.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-premium rounded-[1.7rem] p-5 transition hover:-translate-y-1"
              >
                <h3 className="text-base font-bold text-slate-900">{item.label}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
