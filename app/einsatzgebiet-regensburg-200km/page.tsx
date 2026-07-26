import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  MapPin,
  Route,
  ShieldCheck,
  Sparkles,
  Trash2,
  Truck,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Einsatzradar } from "@/components/Einsatzradar";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { PublicAuthorityModules } from "@/components/PublicAuthorityModules";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "@/get-dictionary";
import {
  einsatzradarFilters,
  einsatzradarRegionZones,
  getPublishedEinsatzradarEntries,
} from "@/lib/einsatzradar-data";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const pagePath = "/einsatzgebiet-regensburg-200km";

const areaGroups = [
  {
    title: "Direkt um Regensburg",
    badge: "Nahbereich",
    places:
      "Neutraubling, Lappersdorf, Pentling, Sinzing, Tegernheim, Donaustauf, Wenzenbach, Regenstauf, Obertraubling, Barbing, Nittendorf und Zeitlarn",
    text:
      "Diese Orte sind besonders relevant für kurzfristige Anfragen, kleinere Transporte, Endreinigung, Entrümpelung und Umzüge im direkten Regensburger Umfeld. FLOXANT bleibt dabei klar in Regensburg verankert und prüft Ort, Zugang, Termin und Umfang.",
  },
  {
    title: "Richtung Kelheim, Bad Abbach und Abensberg",
    badge: "Donau- und Suedwestachse",
    places: "Kelheim, Bad Abbach, Abensberg, Hemau, Parsberg, Laaber und Schierling",
    text:
      "Diese Richtung ist für Umzug, Reinigung nach Auszug, Entrümpelung und kombinierte Übergabevorbereitung sinnvoll, wenn Route, Zeitfenster, Fotos und Zusatzleistungen sauber zusammenpassen.",
  },
  {
    title: "Richtung Straubing, Deggendorf, Cham und Roding",
    badge: "Ost- und Donaukorridor",
    places: "Straubing, Deggendorf, Cham, Roding und umliegende Orte",
    text:
      "Auf diesen Strecken sind Transport, Umzug, Leerfahrt/Rückfahrt und flexible Anfragefenster besonders wichtig. Bei laengeren Wegen wird keine pauschale Verfügbarkeit versprochen, sondern die Route geprüft.",
  },
  {
    title: "Richtung Schwandorf, Amberg und Weiden",
    badge: "Oberpfalz-Achse",
    places: "Schwandorf, Burglengenfeld, Maxhuette-Haidhof, Amberg und Weiden in der Oberpfalz",
    text:
      "Für Umzug, Transport, Entrümpelung und kombinierte Services ist diese Achse interessant, wenn Fahrzeugbedarf, Etage, Zugang und Termin realistisch geplant werden können.",
  },
  {
    title: "Größere bayerische Staedte",
    badge: "Erweiterte Einsatzregion",
    places: "Nürnberg, Ingolstadt, München, Landshut, Passau und Augsburg",
    text:
      "Diese Orte werden nicht als lokaler Kern dargestellt. Sie sind vor allem für planbare Bayern-Anfragen, größere Strecken, Rückfahrten und Kombi-Services nach Verfügbarkeit relevant.",
  },
] as const;

const serviceLinks = [
  {
    title: "Umzug in Regensburg und Umgebung",
    text:
      "Privatumzug, Transport, Etagen, Zugang, Reinigung und Schlüsselthemen werden aus Regensburg heraus geplant.",
    href: "/regensburg/umzug",
    cta: "Umzug anfragen",
    Icon: Truck,
  },
  {
    title: "Reinigung nahe Regensburg",
    text:
      "Endreinigung, Auszugsreinigung und Wohnungsuebergabe sind besonders stark, wenn Fotos, Fläche und Termin frueh vorliegen.",
    href: "/regensburg/reinigung",
    cta: "Reinigung prüfen",
    Icon: Sparkles,
  },
  {
    title: "Entrümpelung mit Fotoeinschaetzung",
    text:
      "Wohnung, Keller, Garage, Restmengen oder Nachlass können besser eingeordnet werden, wenn Zugang, Etage und Fotos sichtbar sind.",
    href: "/regensburg/entruempelung",
    cta: "Entrümpelung einschätzen",
    Icon: Trash2,
  },
  {
    title: "Nachlass-Räumung diskret klären",
    text:
      "Nach Erbfall oder Wohnungsauflösung zählen Freigabe, Zugang, Fotos, Rückruf und eine ruhige Abstimmung besonders stark.",
    href: "/nachlass-raeumung-regensburg",
    cta: "Nachlass-Fall senden",
    Icon: ShieldCheck,
  },
  {
    title: "Diskreter Auszug bei Trennung",
    text:
      "Für sensible private Auszuege im Raum Regensburg, wenn Rückruf, sichere Kontaktmethode, Transport, Reinigung und Übergabe ruhig abgestimmt werden sollen.",
    href: "/diskreter-umzug-trennung-scheidung",
    cta: "Diskret anfragen",
    Icon: ShieldCheck,
  },
  {
    title: "Transport und Leerfahrt",
    text:
      "Für Einzelstuecke, Möbel, flexible Strecken und Rückfahrten zählen Startort, Zielort, Datum, Umfang und Verfügbarkeit.",
    href: "/leerfahrt-rueckfahrt",
    cta: "Strecke prüfen",
    Icon: Route,
  },
] as const;

const faqItems = [
  {
    q: "Arbeitet FLOXANT nur in Regensburg?",
    a: "Nein. FLOXANT sitzt in Regensburg. Anfragen aus der direkten Umgebung und aus Bayern werden nach Ort, Strecke, Termin, Umfang, Zugang und Kapazität geprüft.",
  },
  {
    q: "Welche Orte in der Naehe von Regensburg sind relevant?",
    a: "Besonders naheliegend sind Orte wie Neutraubling, Lappersdorf, Pentling, Sinzing, Tegernheim, Regenstauf, Obertraubling, Barbing, Nittendorf und Zeitlarn. Diese Orte werden als Umfeld verstanden, nicht als eigene FLOXANT-Standorte.",
  },
  {
    q: "Sind Umzüge außerhalb Regensburg möglich?",
    a: "Ja, wenn Strecke, Volumen, Etagen, Zugang, Termin und Teamkapazitaet zusammenpassen. Für laengere Wege kann auch eine Leerfahrt oder Rückfahrt nach Verfügbarkeit sinnvoll sein.",
  },
  {
    q: "Bietet FLOXANT Reinigung in der Umgebung von Regensburg an?",
    a: "Ja, vor allem für Endreinigung, Auszugsreinigung, Wohnungsuebergabe und Kombi-Anfragen mit Umzug oder Entrümpelung. Entscheidend sind Fläche, Zustand, Termin und Fotos.",
  },
  {
    q: "Sind Entrümpelungen außerhalb Regensburg möglich?",
    a: "Ja, nach Prüfung. Wichtig sind Umfang, Etage, Zugang, Materialart, Fotos und ob danach eine Reinigung oder Übergabevorbereitung sinnvoll ist.",
  },
  {
    q: "Wie weit faehrt FLOXANT?",
    a: "Die Umgebung bis ca. 200 km wird als Nah- und Prüfbereich verstanden. Bayern ist eine erweiterte Einsatzregion nach Verfügbarkeit, nicht ein pauschales Versprechen für jeden Termin.",
  },
  {
    q: "Wann lohnt sich eine Leerfahrt oder Rückfahrt?",
    a: "Wenn Startort, Zielort, Datum, Umfang und flexible Zeitfenster zu einer vorhandenen Route passen. Je genauer die Angaben sind, desto besser kann FLOXANT freie Kapazität prüfen.",
  },
  {
    q: "Warum soll ich Ort oder PLZ angeben?",
    a: "Ort und PLZ helfen, Strecke, Fahrzeit, Park- und Zugangssituation, Teamplanung und moegliche Rückfahrten realistisch einzuordnen.",
  },
  {
    q: "Sind kurzfristige Termine in der Umgebung möglich?",
    a: "Manchmal, aber nur nach Kapazität. Vollständige Angaben zu Ort, Datum, Umfang, Fotos und Kontaktweg erhoehen die Chance auf eine schnelle Prüfung.",
  },
  {
    q: "Gilt Bayern als festes Servicegebiet?",
    a: "Bayern ist eine erweiterte Einsatzregion nach Verfügbarkeit. Regensburg bleibt der Kern, die Umgebung wird priorisiert, größere Strecken werden anhand des konkreten Auftrags geprüft.",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "einsatzgebiet-regensburg-200km",
    title: "Servicegebiet Regensburg und Umgebung | FLOXANT",
    description:
      "FLOXANT arbeitet mit Regensburg als Kern: Umzug, Reinigung, Entrümpelung und Transport in der Umgebung bis ca. 200 km und Regensburg nach Verfügbarkeit.",
  });
}

export default async function RegensburgServiceArea200KmPage() {
  const dict = await getDictionary("de");
  const radarEntries = getPublishedEinsatzradarEntries().filter(
    (entry) => entry.region_zone !== "duesseldorf_separat",
  );
  const radarFilters = einsatzradarFilters.filter(
    (filter) => !String(filter.id).startsWith("duesseldorf"),
  );
  const radarZones = einsatzradarRegionZones.filter((zone) => zone.id !== "duesseldorf_separat");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Servicegebiet Regensburg und Umgebung",
        description:
          "Öffentliche Servicegebiet-Seite für FLOXANT mit Sitz in Regensburg, direkter Umgebung, ca. 200-km-Nahbereich und Bayern nach Verfügbarkeit.",
        path: pagePath,
        about: [
          "Regensburg",
          "Servicegebiet",
          "Umzug",
          "Reinigung",
          "Entrümpelung",
          "Transport",
          "Leerfahrt",
        ],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Servicegebiet Regensburg und Umgebung", item: pagePath },
      ]),
      buildServiceJsonLd({
        name: "FLOXANT Servicegebiet Regensburg und Umgebung",
        description:
          "Umzug, Reinigung, Entrümpelung und Transport aus Regensburg heraus mit Umgebung bis ca. 200 km und Regensburg nach Verfügbarkeit.",
        path: pagePath,
        serviceType: "Servicegebiet für Umzug, Reinigung, Entrümpelung und Transport",
        areaServed: [
          "Regensburg",
          "Umgebung Regensburg ca. 200 km",
          "Neutraubling",
          "Lappersdorf",
          "Pentling",
          "Sinzing",
          "Regenstauf",
          "Kelheim",
          "Straubing",
          "Schwandorf",
          "Bayern",
        ],
      }),
      buildFaqJsonLd([...faqItems]),
      {
        "@type": "ItemList",
        name: "Kontextgruppen im FLOXANT Servicegebiet rund um Regensburg",
        itemListElement: areaGroups.map((group, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: group.title,
          description: `${group.places}. ${group.text}`,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Servicegebiet Regensburg und Umgebung" }]} />

      <section className="relative overflow-hidden px-6 pb-16 pt-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_45%_0%,rgba(59,130,246,0.14),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-45">
          <FloxantSymbolLayer variant="moving" density="soft" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              <MapPin className="h-4 w-4" />
              Regensburg als Ausgangspunkt
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              Servicegebiet Regensburg und Umgebung für Umzug, Reinigung und Entrümpelung
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
              FLOXANT sitzt in Regensburg. Deshalb sind Anfragen aus dem direkten Umfeld
              besonders gut planbar. Für laengere Strecken innerhalb Bayerns prüfen wir Termin,
              Umfang, Fahrzeugbedarf, Zugang, Fotos und moegliche Rückfahrten, bevor etwas
              verbindlich zugesagt wird.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/buchung#buchungssystem"
                data-event="hero_cta_click"
                data-region="regensburg_200km"
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Anfrage mit Ort/PLZ starten
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/leerfahrt-rueckfahrt"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
              >
                Leerfahrt/Rückfahrt prüfen
                <Route className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="glass-elevated premium-scan rounded-[2.4rem] p-7 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
            <div className="flex items-center justify-between gap-5">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Keine falschen Filialen
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  Ort nennen, Machbarkeit prüfen
                </h2>
              </div>
              <ShieldCheck className="h-9 w-9 text-blue-600" />
            </div>
            <div className="mt-7 grid gap-4">
              {[
                { icon: MapPin, label: "Kern", value: "Regensburg" },
                { icon: Route, label: "Nahbereich", value: "Umgebung bis ca. 200 km" },
                { icon: Clock3, label: "Erweiterung", value: "Bayern nach Verfügbarkeit" },
                { icon: Camera, label: "Prüfung", value: "Ort, PLZ, Fotos, Umfang, Termin" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-[1.4rem] border border-slate-200 bg-white/92 p-4">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                          {item.label}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-slate-950">{item.value}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Einsatzbereiche mit Kontext
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Orte helfen bei Planung, Anfahrt und Verfügbarkeit
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Die Gruppen helfen, eine Anfrage realistisch einzuordnen. FLOXANT benennt
              Einsatzbereiche transparent und prüft Ort, Umfang, Termin und Verfügbarkeit
              vor einer Zusage.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {areaGroups.map((group) => (
              <article key={group.title} className="card-premium rounded-[1.8rem] p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  {group.badge}
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{group.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{group.places}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{group.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Passende Services
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Welche Leistungen in der Umgebung besonders sinnvoll sind
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {serviceLinks.map((service) => {
              const Icon = service.Icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="card-premium premium-scan group rounded-[1.75rem] p-6 transition-all hover:-translate-y-1 hover:border-blue-400/25"
                >
                  <Icon className="h-7 w-7 text-blue-600" />
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{service.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                    {service.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Einsatzradar
        entries={radarEntries}
        filters={radarFilters}
        zones={radarZones}
        variant="compact"
        maxItems={6}
        showFilters={true}
        showZones={true}
        title="Einsatzarten im Servicegebiet Regensburg"
        subtitle="Grobe Zonen und typische Anfragen im Kernmarkt: keine Adressbehauptung, sondern klare Einordnung nach Ort, Umfang, Termin und Verfügbarkeit."
        source="service_area_einsatzradar"
      />

      <PublicAuthorityModules
        moduleIds={[
          "regensburg_core",
          "regensburg_200km",
          "bavaria_availability",
          "photo_check",
          "budget_check",
          "damage_control",
          "cellar_trashroom_rescue",
          "realtor_landlord_link",
          "tenant_turnover",
          "empty_return_fit",
          "route_board",
        ]}
        badge="Servicegebiet ohne Spam"
        title="Warum Ort, PLZ, Fotos und Termin wichtiger sind als Stadtlisten"
        subtitle="FLOXANT arbeitet in Regensburg und Umgebung mit klarer Vorprüfung: kurze Wege im Nahbereich, Bayern nach Verfügbarkeit und konkrete Angaben statt pauschaler Ortsversprechen."
        source="service_area_regensburg_200km"
      />

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Anfrage vorbereiten
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Rechner zuerst, finale Planung danach
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600">
              <p>
                Das Servicegebiet hilft bei der Orientierung. Die konkrete Prüfung bleibt aber
                konkret: Ort, PLZ, Etage, Zugang, Fotos, Termin und gewuenschte Zusatzleistungen
                entscheiden, ob ein Einsatz realistisch passt.
              </p>
              <p>
                Für Google-Maps-Nutzer ist der schnellste Weg die direkte Buchung. Wer zuerst
                Preisrahmen und Aufwand einordnen will, nutzt den Rechner auf derselben Seite.
              </p>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { icon: MapPin, text: "Ort und PLZ" },
                { icon: Camera, text: "Fotos und Umfang" },
                { icon: CheckCircle2, text: "Termin und Kapazität" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="rounded-2xl border border-slate-200 bg-white/92 p-4 shadow-sm shadow-slate-950/5"
                  >
                    <Icon className="mb-3 h-5 w-5 text-blue-600" />
                    <div className="text-sm font-semibold text-slate-950">{item.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="glass-elevated rounded-[2rem] p-4 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
            <SmartBookingWizard dict={{ common: dict.common, calculator: dict.calculator }} />
          </div>
        </div>
      </section>

      <section id="faq" className="section-glow px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            FAQ zum Servicegebiet Regensburg und Umgebung
          </h2>
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <div key={item.q} className="card-premium rounded-[1.5rem] p-6">
                <h3 className="text-lg font-semibold text-slate-950">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
