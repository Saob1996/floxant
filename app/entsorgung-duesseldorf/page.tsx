import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Home,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { PublicAuthorityModules } from "@/components/PublicAuthorityModules";
import { SignatureServices } from "@/components/SignatureServices";
import { company } from "@/lib/company";
import {
  buildDuesseldorfCleaningProviderJsonLd,
  buildDuesseldorfServiceJsonLd,
} from "@/lib/duesseldorf-cleaning";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const pagePath = "/entsorgung-duesseldorf";
const bookingHref =
  "/buchung?service=entsorgung&region=duesseldorf&utm_source=entsorgung_duesseldorf#buchungssystem";
const whatsappHref = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hallo FLOXANT, ich möchte Entsorgung in Düsseldorf anfragen. Ich kann Umfang, Zugang, Termin, Budget und Fotos senden.",
)}`;

const privateItems = [
  "Möbelentsorgung",
  "Sperrmüll-Abholung",
  "Haushaltsgegenstände",
  "Entsorgung nach Auszug",
  "Keller oder kleine Räumung nach Prüfung",
] as const;

const businessItems = [
  "Büromöbel und Inventar",
  "Nebenraum oder Lagerbereich",
  "Entsorgung nach Renovierung nach Prüfung",
  "Kleine bis mittlere B2B-Abholung",
  "Kombination mit Reinigung nach Bedarf",
] as const;

const excludedItems = [
  "Gefahrstoffe",
  "Chemikalien",
  "Asbest",
  "kontaminierte Materialien",
  "unklare Sonderabfälle",
] as const;

const faqs = [
  {
    q: "Bietet FLOXANT in Düsseldorf Umzüge an?",
    a: "Nein. Dieser lokale Bereich ist bewusst für Reinigung und Entsorgung getrennt. Umzugsleistungen werden dort nicht als Hauptservice beworben.",
  },
  {
    q: "Welche Entsorgung kann ich in Düsseldorf anfragen?",
    a: "Möbel, Sperrmüll, Haushaltsgegenstände, kleinere Räumungen und regulär entsorgbare Gegenstände können nach Umfang, Zugang und Fotos geprüft werden.",
  },
  {
    q: "Kann ich Fotos senden?",
    a: "Ja. Fotos von Menge, Materialart, Etage, Laufweg und Zugang helfen, Aufwand und Preisrahmen realistischer einzuordnen.",
  },
  {
    q: "Kann ich Entsorgung mit Reinigung kombinieren?",
    a: "Ja, wenn es zum Auftrag passt. Für Reinigung in Düsseldorf gibt es eine eigene Reinigungsseite und einen getrennten Anfragepfad.",
  },
  {
    q: "Welche Leistungen werden ausgeschlossen?",
    a: "Gefahrstoffe, Chemikalien, Asbest, kontaminierte Materialien und rechtlich unklare Sonderabfälle werden nicht zugesagt.",
  },
  {
    q: "Wovon hängt der Preis ab?",
    a: "Der Preis hängt von Umfang, Zugang, Etage, Laufweg, Materialart, Termin, Fotos und Budgetrahmen ab.",
  },
  {
    q: "Was soll ich vor einer Entsorgung per WhatsApp senden?",
    a: "Hilfreich sind Fotos von Menge und Material, Stadtteil oder PLZ, Etage, Aufzug, Laufweg, Park- oder Ladezone, gewünschter Termin und ein realistischer Preisrahmen.",
  },
  {
    q: "Kann nach der Entsorgung auch Reinigung geprüft werden?",
    a: "Ja. Wenn nach Auszug, Kellerleerung oder kleiner Räumung noch gereinigt werden soll, wird Reinigung in Düsseldorf separat geprüft und nicht mit Umzug verwechselt.",
  },
] as const;

const disposalIntentItems = [
  {
    query: "Möbelentsorgung Düsseldorf",
    title: "Möbel, Regale und kleinere Mengen mit Fotos prüfen",
    text: "Für eine schnelle Einschätzung helfen Fotos, Etage, Aufzug, Laufweg, Parkmöglichkeit und gewünschter Termin.",
    href: bookingHref,
    cta: "Möbel anfragen",
    external: false,
  },
  {
    query: "Sperrmüll Abholung Düsseldorf",
    title: "Nicht jeder Sperrmüll ist gleich planbar",
    text: "Materialart, Menge, Zugang und mögliche Ausschlüsse werden vorab geklärt, damit kein falsches Pauschalversprechen entsteht.",
    href: "#preislogik",
    cta: "Preislogik ansehen",
    external: false,
  },
  {
    query: "Entsorgung mit Fotos senden",
    title: "WhatsApp ist oft der schnellste Start",
    text: "Fotos von Menge, Material, Keller, Etage, Laufweg oder Ladezone zeigen den Aufwand besser als eine kurze Beschreibung.",
    href: whatsappHref,
    cta: "Fotos senden",
    external: true,
  },
  {
    query: "Entsorgung nach Auszug Düsseldorf",
    title: "Erst raus, dann Reinigung separat prüfen",
    text: "Wenn nach Auszug oder Renovierung noch gereinigt werden soll, bleibt Entsorgung getrennt und Reinigung wird als eigener Schritt verlinkt.",
    href: "/duesseldorf/reinigung",
    cta: "Reinigung ergänzen",
    external: false,
  },
] as const;

const disposalRequestChecklist = [
  {
    title: "Fotos von Menge und Material",
    text: "Bilder von Möbeln, Sperrmüll, Keller, Nebenraum oder Inventar machen den Umfang schneller prüfbar.",
  },
  {
    title: "Zugang, Etage und Laufweg",
    text: "Aufzug, Treppenhaus, Hinterhof, Kellerzugang, Ladezone und Parkmöglichkeit beeinflussen Aufwand und Preisrahmen.",
  },
  {
    title: "Termin und Zielzustand",
    text: "Wichtig ist, ob nur abgeholt wird oder ob nach Auszug, Renovierung oder Räumung noch Reinigung folgen soll.",
  },
  {
    title: "Ausschlüsse offen nennen",
    text: "Sonderstoffe, Chemikalien, Asbest oder unklare Materialien werden nicht zugesagt und müssen vorher benannt werden.",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "entsorgung-duesseldorf",
    title: "Entsorgung Düsseldorf – Möbel, Sperrmüll & Abholung | FLOXANT",
    description:
      "Entsorgung in Düsseldorf für Möbel, Sperrmüll, Haushaltsgegenstände, Keller und kleinere Räumungen: Umfang, Zugang, Etage, Fotos, Termin und Budget senden. Reinigung separat möglich.",
    keywords: [
      "Entsorgung Düsseldorf",
      "Möbelentsorgung Düsseldorf",
      "Sperrmüll Entsorgung Düsseldorf",
      "Entsorgung nach Auszug Düsseldorf",
      "Inventar Entsorgung Düsseldorf",
    ],
  });
}

export default function EntsorgungDuesseldorfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Entsorgung Düsseldorf", item: pagePath },
      ]),
      buildWebPageJsonLd({
        name: "Entsorgung Düsseldorf",
        description:
          "Spezialseite für Entsorgung in Düsseldorf: Möbel, Sperrmüll, Haushaltsgegenstände, kleine Räumungen und B2B-Inventar nach Prüfung.",
        path: pagePath,
        about: ["Entsorgung", "Möbelentsorgung", "Sperrmüll", "Düsseldorf", "Fotos", "Budget"],
      }),
      buildDuesseldorfCleaningProviderJsonLd(),
      buildDuesseldorfServiceJsonLd({
        name: "FLOXANT Entsorgung Düsseldorf",
        description:
          "Entsorgung von Möbeln, Sperrmüll, Haushaltsgegenständen und regulär entsorgbaren Gegenständen in Düsseldorf nach Umfang, Zugang und Fotos.",
        path: pagePath,
        serviceType: "Entsorgung",
        areaServed: ["Düsseldorf", "Umgebung Düsseldorf"],
      }),
      {
        "@type": "ItemList",
        "@id": `https://www.floxant.de${pagePath}#disposal-click-intents`,
        name: "Kaufnahe Suchabsichten für Entsorgung Düsseldorf",
        itemListElement: disposalIntentItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.query,
          url: item.href.startsWith("#")
            ? `https://www.floxant.de${pagePath}${item.href}`
            : item.href.startsWith("http")
              ? item.href
              : `https://www.floxant.de${item.href}`,
          item: {
            "@type": "Thing",
            name: item.title,
            description: item.text,
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `https://www.floxant.de${pagePath}#request-checklist`,
        name: "Angaben für eine Entsorgungsanfrage in Düsseldorf",
        itemListElement: disposalRequestChecklist.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          description: item.text,
        })),
      },
    ],
  };
  const faqJsonLd = buildFaqJsonLd(faqs);

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fffaf4_0%,#f8fbff_42%,#edf4f8_100%)] text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumbs items={[{ label: "Entsorgung Düsseldorf" }]} />

      <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[linear-gradient(135deg,rgba(249,115,22,0.13),rgba(255,255,255,0.28)_42%,rgba(37,99,235,0.08))]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-22">
          <FloxantSymbolLayer variant="moving" density="soft" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.06fr_0.94fr] lg:items-stretch">
          <div className="rounded-[1.1rem] border border-white/80 bg-white/[0.9] p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-10">
            <div className="inline-flex items-center gap-2 rounded-[0.75rem] border border-orange-100 bg-orange-50 px-4 py-2 text-[11px] font-black uppercase tracking-normal text-orange-700">
              <Trash2 className="h-4 w-4" />
              Entsorgung Düsseldorf
            </div>
            <h1 className="mt-6 max-w-[13ch] text-4xl font-bold leading-[0.98] tracking-normal text-slate-950 md:text-6xl">
              Entsorgung Düsseldorf für Möbel, Sperrmüll und kleinere Räumungen
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-700 md:text-lg md:leading-8">
              Wenn nach Auszug, Renovierung oder Räumung Gegenstände weg müssen, zählen
              nicht nur Menge und Termin. Zugang, Etage, Laufweg, Materialart und Fotos
              entscheiden, ob ein Angebot realistisch ist. FLOXANT prüft diese Punkte vorab
              und führt diesen Bereich getrennt von anderen lokalen Leistungsarten.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={bookingHref}
                className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-[0_18px_46px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5"
                data-event="hero_cta_click"
                data-service="entsorgung"
                data-region="duesseldorf"
              >
                Entsorgung anfragen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-bold text-orange-800 transition hover:-translate-y-0.5 hover:bg-orange-100"
                data-event="whatsapp_click"
                data-service="entsorgung"
                data-region="duesseldorf"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp mit Fotos
              </a>
              <Link
                href="/duesseldorf/reinigung"
                className="inline-flex items-center justify-center rounded-[1.2rem] border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-teal-200"
                data-event="service_card_click"
                data-region="duesseldorf"
              >
                Reinigung separat ansehen
              </Link>
              <Link
                href="/reinigung-moeblierte-wohnung-duesseldorf"
                className="inline-flex items-center justify-center rounded-[1.2rem] border border-cyan-200 bg-cyan-50 px-5 py-3 text-sm font-bold text-cyan-900 transition hover:-translate-y-0.5 hover:bg-cyan-100"
                data-event="service_card_click"
                data-region="duesseldorf"
              >
                Apartment-Reinigung
              </Link>
            </div>
          </div>

          <aside className="rounded-[1.1rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] md:p-8">
            <div className="text-[11px] font-black uppercase tracking-normal text-orange-200">
              Was wir vor dem Angebot prüfen
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-normal">
              Preis entsteht aus Umfang, Zugang und Fotos.
            </h2>
            <div className="mt-6 grid gap-3">
              {[
                { icon: Camera, title: "Fotos", text: "Menge, Materialart und Zugang schneller erkennen." },
                { icon: MapPin, title: "Zugang", text: "Etage, Aufzug, Laufweg und Ladezone einordnen." },
                { icon: ClipboardCheck, title: "Budget", text: "Preisrahmen nennen und Machbarkeit prüfen lassen." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-[1.45rem] border border-white/10 bg-white/[0.08] p-4">
                    <Icon className="h-5 w-5 text-orange-200" />
                    <h3 className="mt-3 font-bold tracking-normal">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/70">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <ServiceListCard
            icon={Home}
            label="Privat"
            title="Private Entsorgung nach Auszug, Keller oder Haushalt"
            items={privateItems}
          />
          <ServiceListCard
            icon={BriefcaseBusiness}
            label="B2B"
            title="Inventar und Nebenräume für kleine Unternehmen"
            items={businessItems}
          />
        </div>
      </section>

      <section id="entsorgung-kundenfragen" className="px-4 py-10 sm:px-6">
        <div
          id="disposal-click-intents"
          className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.72fr_1.28fr]"
        >
          <article className="rounded-[1rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:p-8">
            <div className="text-[11px] font-black uppercase tracking-normal text-orange-700">
              Häufig gesucht
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950">
              Entsorgung mit Fotos, Zugang und klarem Umfang
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Kunden suchen oft nach Möbelentsorgung, Sperrmüll, Auszug oder schneller
              Fotoeinschätzung. Diese Einstiege machen aus einer groben Frage eine
              prüfbare Düsseldorfer Anfrage.
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-2">
            {disposalIntentItems.map((item) => {
              const className =
                "group rounded-[0.95rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-950/10";
              const content = (
                <>
                  <div className="text-[11px] font-black uppercase tracking-normal text-orange-700">
                    {item.query}
                  </div>
                  <h3 className="mt-3 text-base font-black tracking-normal text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-orange-800">
                    {item.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </>
              );

              return item.external ? (
                <a
                  key={item.query}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  data-event="service_card_click"
                  data-region="duesseldorf"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={item.query}
                  href={item.href}
                  className={className}
                  data-event="service_card_click"
                  data-region="duesseldorf"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="entsorgung-anfrage-checkliste" className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.76fr_1.24fr]">
          <article className="rounded-[1rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] md:p-8">
            <div className="text-[11px] font-black uppercase tracking-normal text-orange-200">
              Direkt richtig senden
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-normal">
              Diese Angaben machen die Entsorgung schneller prüfbar
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Je klarer Fotos, Zugang und Zielzustand sind, desto eher kann FLOXANT sagen,
              ob Entsorgung in Düsseldorf machbar ist und ob Reinigung danach separat
              sinnvoll wäre.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] bg-emerald-400 px-5 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                data-event="whatsapp_click"
                data-region="duesseldorf"
              >
                <MessageCircle className="h-4 w-4" />
                Fotos per WhatsApp senden
              </a>
              <Link
                href={bookingHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] border border-white/15 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
                data-event="hero_cta_click"
                data-region="duesseldorf"
              >
                Entsorgung anfragen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
          <div className="grid gap-3 md:grid-cols-2">
            {disposalRequestChecklist.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[0.95rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-[0.75rem] bg-orange-50 text-sm font-black text-orange-800">
                    {index + 1}
                  </span>
                  <ClipboardCheck className="h-5 w-5 text-orange-700" />
                </div>
                <h3 className="mt-4 text-base font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SignatureServices
        locale="de"
        dict={{ signature_services: { items: {} } }}
        serviceIds={["duesseldorf_disposal", "photo_check", "budget_check", "clear_cleaning"]}
        badge="Düsseldorf Entsorgung"
        title="Entsorgung mit Fotoeinschätzung statt unklarem Pauschalversprechen"
        subtitle="Diese Seite bleibt bewusst getrennt vom Umzug: Umfang, Zugang, Etage, Materialart, Fotos und Budget werden zuerst geprüft. Reinigung kann separat ergänzt werden."
        compact
        source="duesseldorf_disposal_signature_services"
      />

      <PublicAuthorityModules
        moduleIds={[
          "duesseldorf_disposal_private",
          "duesseldorf_disposal_b2b",
          "price_clearance",
          "damage_control",
          "offer_check",
          "referral_partnercode",
          "photo_check",
          "budget_check",
        ]}
        badge="Duesseldorf Entsorgung"
        title="Entsorgung in Duesseldorf braucht klare Fotos, Zugang und Grenzen"
        subtitle="Die Seite staerkt Entsorgung ohne Umzugsdominanz: privat und B2B bleiben getrennt, riskante Stoffe werden ausgeschlossen und Reinigung wird nur als separater Zusatzweg verlinkt."
        source="duesseldorf_disposal_authority_modules"
      />

      <section id="preislogik" className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[1.1rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-normal text-orange-700">
                <ShieldCheck className="h-4 w-4" />
                Ehrliche Preis-Kommunikation
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 md:text-5xl">
                Kein Lockpreis ohne Umfang.
              </h2>
            </div>
            <p className="text-base leading-8 text-slate-600">
              Der Preis haengt von Umfang, Zugang, Etage, Laufweg, Materialart, Termin,
              Fotos und Budgetrahmen ab. Wenn Sie einen Preisrahmen haben, nennen Sie ihn
              direkt. FLOXANT prüft, ob dieser Rahmen machbar ist oder welcher Umfang
              realistisch wäre.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[1.1rem] border border-red-100 bg-red-50 p-6 md:p-9">
          <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-normal text-red-700">
                <Ban className="h-4 w-4" />
                Nicht zusagen ohne Klärung
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-normal text-red-950">
                Sonderstoffe bleiben ausgeschlossen.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {excludedItems.map((item) => (
                <span key={item} className="rounded-[0.75rem] border border-red-200 bg-white px-3 py-2 text-sm font-bold text-red-800">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[1.1rem] bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,0.2)] md:p-9">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-[11px] font-black uppercase tracking-normal text-orange-200">
                Anfrage starten
              </div>
              <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-normal md:text-5xl">
                Fotos senden, Umfang nennen, Preisrahmen prüfen lassen.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
                Die Anfrage ist unverbindlich. Eine Zusage entsteht erst nach Prüfung von
                Umfang, Zugang, Termin und Machbarkeit.
              </p>
            </div>
            <Link
              href={bookingHref}
              className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-white px-6 py-4 text-sm font-black uppercase tracking-normal text-slate-950 transition hover:-translate-y-0.5"
              data-event="hero_cta_click"
              data-service="entsorgung"
              data-region="duesseldorf"
            >
              Entsorgung anfragen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-orange-700">FAQ</div>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950">
              Häufige Fragen zur Entsorgung in Düsseldorf
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item, index) => (
              <details
                key={item.q}
                className="rounded-[1.45rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
                open={index === 0}
              >
                <summary className="cursor-pointer list-none text-lg font-bold text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="flox-mobile-action-wrap flox-duesseldorf-action-wrap z-40 md:hidden">
        <div className="flox-mobile-action-shell">
          <div className="flox-mobile-action-grid">
            <Link
              href={bookingHref}
              className="flox-mobile-action flox-mobile-action-primary"
              data-event="service_card_click"
            >
              Anfragen
            </Link>
            <a
              href={whatsappHref}
              className="flox-mobile-action flox-mobile-action-whatsapp"
              data-event="whatsapp_click"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${company.phoneRaw}`}
              className="flox-mobile-action flox-mobile-action-light"
              data-event="phone_click"
            >
              Anrufen
            </a>
            <Link
              href="/duesseldorf/reinigung"
              className="flox-mobile-action flox-mobile-action-dark"
              data-event="service_card_click"
            >
              Reinigung
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function ServiceListCard({
  icon: Icon,
  label,
  title,
  items,
}: {
  icon: typeof Home;
  label: string;
  title: string;
  items: readonly string[];
}) {
  return (
    <article className="rounded-[1rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-[0.85rem] bg-orange-50 text-orange-700">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-5 text-[11px] font-black uppercase tracking-normal text-orange-700">
        {label}
      </div>
      <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">{title}</h2>
      <ul className="mt-6 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
