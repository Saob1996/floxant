import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Home,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";

import {
  DUESSELDORF_CLEANING,
  buildDuesseldorfCleaningMetadata,
  buildDuesseldorfCleaningProviderJsonLd,
  buildDuesseldorfCleaningWhatsAppHref,
  buildDuesseldorfServiceJsonLd,
} from "@/lib/duesseldorf-cleaning";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";


const path = "/duesseldorf/reinigung-stadtteile-umgebung";
const title = "Reinigung in Düsseldorf und Umgebung";
const description =
  "FLOXANT Reinigung in Düsseldorf und Umgebung: Gewerbereinigung, Büroreinigung, Praxisreinigung, Endreinigung, Wohnungsreinigung, Übergabereinigung und Angebotsprüfung unverbindlich anfragen.";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path,
    title: "Reinigung Düsseldorf und Umgebung | FLOXANT",
    description,
  });
}

const services = [
  {
    title: "Gewerbereinigung",
    text: "Für Büros, Praxen, Kanzleien, Ladenflächen, kleinere Gewerbeobjekte und gemeinsam genutzte Bereiche.",
    href: "/duesseldorf/gewerbereinigung",
    Icon: Building2,
  },
  {
    title: "Büroreinigung",
    text: "Reinigung von Arbeitsplätzen, Empfang, Besprechungsräumen, Küche, Sanitär und Bodenflächen.",
    href: "/duesseldorf/bueroreinigung",
    Icon: Building2,
  },
  {
    title: "Praxisreinigung",
    text: "Allgemeine Reinigung von Praxisflächen, Empfang, Wartebereich, Nebenräumen und Sanitärbereichen.",
    href: "/duesseldorf/praxisreinigung",
    Icon: ClipboardCheck,
  },
  {
    title: "Unterhaltsreinigung",
    text: "Regelmäßige Reinigung nach abgestimmtem Turnus, Objektgröße, Zugang und gewünschtem Leistungsumfang.",
    href: "/duesseldorf/unterhaltsreinigung",
    Icon: CheckCircle2,
  },
  {
    title: "Treppenhausreinigung",
    text: "Für Hauseingang, Treppen, Flure, Aufzug, Kellerflur und Gemeinschaftsbereiche von Objekten.",
    href: "/duesseldorf/treppenhausreinigung",
    Icon: Home,
  },
  {
    title: "Endreinigung",
    text: "Für Wohnungen, Apartments oder Objekte, die nach Nutzung, Auszug oder Renovierung gereinigt werden sollen.",
    href: "/duesseldorf/endreinigung",
    Icon: Sparkles,
  },
  {
    title: "Wohnungsreinigung",
    text: "Für private Wohnungen, möblierte Wohnungen, Auszugssituationen oder Reinigungen vor Besichtigung.",
    href: "/duesseldorf/wohnungsreinigung",
    Icon: Home,
  },
  {
    title: "Reinigung nach Umzug",
    text: "Wenn nach dem Auszug Küche, Bad, Böden, Fenster, Schränke oder Übergabepunkte gereinigt werden sollen.",
    href: "/duesseldorf/endreinigung",
    Icon: Sparkles,
  },
  {
    title: "Reinigung nach Entrümpelung",
    text: "Wenn nach Räumung, Entsorgung oder Kellerleerung eine saubere Fläche für den nächsten Schritt gebraucht wird.",
    href: "/duesseldorf/grundreinigung",
    Icon: Sparkles,
  },
  {
    title: "Übergabereinigung",
    text: "Für Mieter, Vermieter, Hausverwaltungen oder Eigentümer, wenn eine Fläche vorbereitet werden soll.",
    href: "/duesseldorf/schluesseluebergabe-reinigung",
    Icon: ClipboardCheck,
  },
  {
    title: "Angebotsprüfung",
    text: "Wenn bereits ein Reinigungsangebot vorliegt und Umfang, Turnus, Preispositionen oder Fotos geprüft werden sollen.",
    href: "/angebot-vergleichen-duesseldorf",
    Icon: FileSearch,
  },
] as const;

const combinedServices = [
  {
    title: "Umzug + Reinigung",
    text: "Wenn nach einem Auszug in Düsseldorf eine Reinigung für Wohnung, Büro oder Objekt vorbereitet werden soll.",
    href: "/duesseldorf/endreinigung",
  },
  {
    title: "Entrümpelung + Reinigung",
    text: "Wenn nach dem Entfernen von Möbeln, Restmengen oder Kellerinhalt eine Fläche gereinigt werden soll.",
    href: "/duesseldorf/grundreinigung",
  },
  {
    title: "Haushaltsauflösung + Endreinigung",
    text: "Wenn eine Wohnung nach Räumung, Nachlass oder Auszug für Übergabe, Besichtigung oder Neuvermietung vorbereitet wird.",
    href: "/duesseldorf/endreinigung",
  },
  {
    title: "Übergabevorbereitung",
    text: "Wenn Fotos, Schlüsselweg, Zustand, Reinigung und letzte offene Punkte vor einem Termin sortiert werden sollen.",
    href: "/duesseldorf/schluesseluebergabe-reinigung",
  },
  {
    title: "Angebot prüfen lassen",
    text: "Wenn ein bestehendes Reinigungsangebot sachlich eingeordnet werden soll. Ohne Preisgarantie, aber mit klarem Blick auf Umfang und offene Punkte.",
    href: "/angebot-vergleichen-duesseldorf",
  },
] as const;

const requestSteps = [
  "Sie senden Ort, Objektart, gewünschte Leistung und Terminwunsch.",
  "Fotos, bestehende Angebote oder kurze Notizen können direkt mitgeschickt werden.",
  "FLOXANT prüft Umfang, Zugang, Zustand, Zeitfenster und Machbarkeit.",
  "Sie erhalten eine Rückmeldung und entscheiden kostenlos und unverbindlich über den nächsten Schritt.",
] as const;

const helpfulInputs = [
  "Düsseldorf oder nahe Umgebung, zum Beispiel Neuss, Ratingen, Meerbusch, Mettmann oder Hilden",
  "Objektart: Büro, Praxis, Wohnung, Treppenhaus, Gewerbefläche oder Hausverwaltung",
  "Fläche, Räume, Sanitärbereiche, Küche, Böden, Fenster oder besondere Stellen",
  "Fotos vom Zustand, vorhandenes Angebot oder grober Leistungswunsch",
  "Zugang, Schlüsselweg, Etage, Aufzug, Parkmöglichkeit und gewünschter Termin",
] as const;

const faqItems = [
  {
    q: "Welche Reinigung bietet FLOXANT in Düsseldorf an?",
    a: "FLOXANT prüft unter anderem Gewerbereinigung, Büroreinigung, Praxisreinigung, Unterhaltsreinigung, Treppenhausreinigung, Endreinigung, Wohnungsreinigung und Übergabereinigung in Düsseldorf und Umgebung.",
  },
  {
    q: "Kann ich Fotos oder ein bestehendes Angebot senden?",
    a: "Ja. Fotos, ein vorhandenes Reinigungsangebot oder kurze Eckdaten helfen, Umfang, Zustand und mögliche offene Punkte besser einzuordnen.",
  },
  {
    q: "Ist die Anfrage kostenlos und unverbindlich?",
    a: "Ja. Die Anfrage ist kostenlos und unverbindlich. Ein Auftrag entsteht erst, wenn Umfang, Termin und Leistung gemeinsam geklärt und bestätigt sind.",
  },
  {
    q: "Kann Reinigung mit Übergabe, Entrümpelung oder Umzug kombiniert werden?",
    a: "Ja, wenn es um Reinigung nach Auszug, nach Entrümpelung, nach Haushaltsauflösung oder zur Übergabevorbereitung geht. FLOXANT prüft, welcher Reinigungsweg in Düsseldorf passt.",
  },
  {
    q: "Gibt es eine Preisgarantie?",
    a: "Nein. FLOXANT gibt keine pauschale Preisgarantie. Der Aufwand hängt von Fläche, Zustand, Zugang, Fotos, Termin und gewünschtem Ergebnis ab.",
  },
] as const;

export default function DuesseldorfStadtteileUmgebungPage() {
  const whatsappHref = buildDuesseldorfCleaningWhatsAppHref(
    "Hallo FLOXANT, ich möchte eine Reinigung in Düsseldorf oder Umgebung unverbindlich anfragen. Ort, Objektart, Fotos, Termin und vorhandene Angebote kann ich senden.",
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung Düsseldorf", item: "/duesseldorf/reinigung" },
        { name: "Düsseldorf und Umgebung", item: path },
      ]),
      buildWebPageJsonLd({
        name: title,
        description,
        path,
        about: [
          "Reinigung Düsseldorf",
          "Reinigungsfirma Düsseldorf",
          "Büroreinigung Düsseldorf",
          "Praxisreinigung Düsseldorf",
          "Endreinigung Düsseldorf",
          "Übergabereinigung Düsseldorf",
        ],
        potentialActions: [
          { name: "Reinigung unverbindlich anfragen", target: "/duesseldorf/reinigung#kontakt", type: "ContactAction" },
        ],
      }),
      buildDuesseldorfCleaningProviderJsonLd(),
      buildDuesseldorfServiceJsonLd({
        name: title,
        description,
        path,
        serviceType: "Reinigung Düsseldorf und Umgebung",
        areaServed: ["Düsseldorf", "Neuss", "Ratingen", "Meerbusch", "Mettmann", "Hilden"],
      }),
      {
        "@type": "ItemList",
        "@id": `https://www.floxant.de${path}#leistungen`,
        name: "Reinigungsleistungen von FLOXANT in Düsseldorf",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.title,
          description: service.text,
          url: `https://www.floxant.de${service.href}`,
        })),
      },
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <main className="bg-slate-50 px-4 pb-24 pt-10 text-slate-950 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto max-w-7xl rounded-[1rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="inline-flex items-center gap-2 rounded-[0.75rem] border border-cyan-200 bg-cyan-50 px-4 py-2 text-[11px] font-black uppercase tracking-normal text-cyan-800">
          Reinigung Düsseldorf
        </div>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,5vw,4.8rem)] font-black leading-[0.98] tracking-normal">
          Reinigung in Düsseldorf und Umgebung
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-700">
          FLOXANT ist Ihre Reinigungsfirma in Düsseldorf für Gewerbe, Büro, Praxis, Wohnung,
          Treppenhaus, Endreinigung und Übergabereinigung. Wir prüfen jede Anfrage nach Objekt,
          Zustand, Zugang, Fotos und gewünschtem Termin. Kostenlos, unverbindlich und ohne
          übertriebene Versprechen.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/duesseldorf/reinigung#kontakt" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-slate-800">
            Reinigung unverbindlich anfragen
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
            <MessageCircle className="h-4 w-4" />
            Fotos per WhatsApp senden
          </a>
          <Link href="/angebot-vergleichen-duesseldorf" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] border border-slate-200 bg-white px-5 text-sm font-black text-slate-900 transition hover:bg-slate-100">
            Angebot prüfen lassen
            <FileSearch className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-[11px] font-black uppercase tracking-normal text-cyan-800">
            Leistungen
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Welche Reinigung FLOXANT in Düsseldorf anbietet
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Die Leistung richtet sich nach Ihrem Objekt: Unternehmen brauchen andere Abläufe
            als private Wohnungen, Praxen andere Zeitfenster als Treppenhäuser und eine
            Endreinigung andere Vorbereitung als eine regelmäßige Unterhaltsreinigung.
          </p>
        </div>
        <div id="leistungen" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.Icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-[0.9rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_16px_38px_rgba(8,145,178,0.12)]"
                data-event="service_card_click"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[0.8rem] bg-cyan-50 text-cyan-800">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-black text-slate-950">{service.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{service.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                  Leistung ansehen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-[11px] font-black uppercase tracking-normal text-cyan-800">
            Kombinierte Leistungen
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Wenn Reinigung Teil eines größeren Falls ist
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Reinigung hängt oft mit Auszug, Entrümpelung, Haushaltsauflösung oder Übergabe
            zusammen. FLOXANT prüft, was in Düsseldorf und Umgebung sinnvoll kombiniert werden
            kann und welche Reihenfolge passt.
          </p>
        </article>
        <div className="grid gap-4 sm:grid-cols-2">
          {combinedServices.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group rounded-[0.9rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_16px_38px_rgba(8,145,178,0.12)]"
              data-event="service_card_click"
            >
              <h3 className="text-lg font-black text-slate-950">{service.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{service.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                Passenden Einstieg öffnen
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-[11px] font-black uppercase tracking-normal text-cyan-800">
            Anfrageablauf
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            So läuft eine unverbindliche Anfrage ab
          </h2>
          <div className="mt-6 grid gap-3">
            {requestSteps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-[0.85rem] border border-slate-200 bg-slate-50 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-[0.95rem] border border-slate-800 bg-slate-950 p-6 text-white shadow-sm">
          <div className="text-[11px] font-black uppercase tracking-normal text-cyan-100">
            Was Sie senden können
          </div>
          <h2 className="mt-3 text-2xl font-black tracking-normal text-white">
            Fotos, Eckdaten oder vorhandenes Angebot reichen für den Start.
          </h2>
          <div className="mt-5 grid gap-3">
            {helpfulInputs.map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-7 text-slate-200">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.85rem] bg-emerald-400 px-4 text-sm font-black text-slate-950" data-event="whatsapp_click">
              <MessageCircle className="h-4 w-4" />
              Per WhatsApp senden
            </a>
            <Link href="/duesseldorf/reinigung#kontakt" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.85rem] border border-white/15 bg-white/10 px-4 text-sm font-black text-white" data-event="hero_cta_click">
              Formular öffnen
              <Send className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </section>

      <section className="mx-auto mt-8 max-w-7xl rounded-[0.95rem] border border-cyan-200 bg-cyan-50 p-6">
        <div className="max-w-3xl">
          <div className="text-[11px] font-black uppercase tracking-normal text-cyan-800">
            Einsatzbereich
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Düsseldorf und nahe Umgebung
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            FLOXANT prüft Reinigungsanfragen in Düsseldorf und je nach Objekt auch in der
            nahen Umgebung, etwa Neuss, Ratingen, Meerbusch, Mettmann oder Hilden. Entscheidend
            sind Ort, Objekt, Zugang, Fotos, Termin und gewünschte Leistung.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-3 md:grid-cols-2">
        {faqItems.map((item) => (
          <details key={item.q} className="rounded-[0.85rem] border border-slate-200 bg-white p-4 shadow-sm">
            <summary className="cursor-pointer text-sm font-black text-slate-950">
              <CheckCircle2 className="mr-2 inline h-4 w-4 text-cyan-700" />
              {item.q}
            </summary>
            <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
          </details>
        ))}
      </section>

      <section className="mx-auto mt-8 max-w-7xl rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm leading-7 text-slate-700">
          Adresse Düsseldorf: {DUESSELDORF_CLEANING.address.streetAddress},{" "}
          {DUESSELDORF_CLEANING.address.postalCode} {DUESSELDORF_CLEANING.address.city}. Anfragen
          werden nach Objektart, Umfang, Fotos, Zugang, Termin und Kapazität geprüft.
        </p>
      </section>
    </main>
  );
}
