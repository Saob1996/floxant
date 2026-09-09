import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Crown, Gem, Home, KeyRound, Leaf, ShieldCheck, Sparkles } from "lucide-react";

import { PrivateClientInquiryForm } from "@/components/PrivateClientInquiryForm";
import { GoogleReviews } from "@/components/GoogleReviews";
import { SocialLinks } from "@/components/SocialLinks";
import { company } from "@/lib/company";
import { germanizeDeep } from "@/lib/german-text";
import { buildLeadHref } from "@/lib/lead-intents";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = germanizeDeep([
  {
    q: "Was ist der FLOXANT Private Client Service?",
    a: "Der Private Client Service ist die persönliche Koordination individueller privater Serviceanfragen, wenn Umzug, Reinigung, Räumung, Übergabe oder Angebotsprüfung nicht in einen Standardablauf passen.",
  },
  {
    q: "Was bedeutet diskreter Service bei FLOXANT?",
    a: "Diskreter Service bedeutet: sensible Situation knapp beschreiben, bevorzugten Kontaktweg wählen und erst die nötigen Eckdaten klären. FLOXANT vermeidet reißerische Sprache, rechtliche Beratung und öffentliche Detailangaben.",
  },
  {
    q: "Warum gibt es keine öffentliche Kalkulation?",
    a: "Werte, Zugang, Schutzbedarf, Personaleinsatz, Zeitfenster und Vertraulichkeit lassen sich nicht seriös in einen Standardrechner pressen. FLOXANT arbeitet hier mit persönlicher Vorprüfung und individueller Einsatzplanung.",
  },
  {
    q: "Für wen ist diese Seite gedacht?",
    a: "Für Eigentümer, Family Offices, Assistenzen und anspruchsvolle Privathaushalte, die keinen Standardablauf wollen, sondern kontrollierte, diskrete und ruhige Ausführung.",
  },
  {
    q: "Welche Leistungen sind kombinierbar?",
    a: "Möglich sind Umzug, Verpackung, Materialschutz, Endreinigung, Grundreinigung, diskrete Räumung, koordinierte Entsorgung regulärer Gegenstände und eine sauber vorbereitete Übergabe.",
  },
  {
    q: "Welche Grenzen gelten bei Räumung und Entsorgung?",
    a: "FLOXANT übernimmt nur transportfähige und regulär entsorgbare Gegenstände. Gefahrstoffe, Asbest, Chemikalien, kontaminierte Materialien und genehmigungspflichtige Sonderabfälle sind ausgeschlossen.",
  },
  {
    q: "Ist der Service auch für Zweitwohnsitz, Eigentümerwechsel oder diskrete Nachlasssituationen geeignet?",
    a: "Ja, sofern Umfang, Zugang, Zuständigkeiten und gewünschte Diskretion sauber abgestimmt werden. Genau für solche sensiblen Übergänge ist die persönliche Vorprüfung gedacht.",
  },
  {
    q: "Kann eine Assistenz, Hausverwaltung oder ein Family Office die Abstimmung übernehmen?",
    a: "Ja. Genau dafür ist der Bereich geeignet. Wenn Zuständigkeiten, Entscheidungswege und gewünschte Diskretion klar sind, kann FLOXANT die Abstimmung auch über Assistenz, Eigentümervertretung oder Family Office führen.",
  },
  {
    q: "Ist der Service auch für Zweitwohnsitze, Eigentümerwechsel oder vorbereitete Übergaben geeignet?",
    a: "Ja. Gerade bei Zweitwohnsitzen, sensiblen Übergaben oder Eigentümerwechseln ist ein diskreter, ruhig geführter Ablauf oft besonders wichtig. Genau dafür ist die persönliche Vorprüfung gedacht.",
  },
  {
    q: "Warum ist diese Seite bewusst getrennt von Rechner, Express und Preisvorschlag?",
    a: "Weil individuelle private Servicekoordination erst eine ruhige Vorprüfung braucht. Allgemeine sensible Faelle laufen über den Diskret-Service; diese Seite bleibt für persönlich gefuehrte Private-Client-Anfragen.",
  },
  {
    q: "Warum ist dieser Bereich bewusst getrennt von den normalen Kontaktwegen?",
    a: "Weil die Seite die Zielgruppe sehr klar beschreibt: diskret, persönlich, ohne Standardrechner und ohne Massenprozess.",
  },
]);

const privateClientLeadHref = buildLeadHref({
  path: "/private-client-service",
  service: "private-client",
  city: "bayern",
  intent: "private-client-service",
  priority: "p0",
});

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "private-client-service",
    title:
      "Private Client Service – sensible private Anfragen abstimmen",
    description:
      "Private Client Service für individuelle private Anfragen: Umzug, Reinigung, Räumung, Übergabe oder Angebotsprüfung mit persönlicher Abstimmung.",
  });
}

export default function PrivateClientServicePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "FLOXANT Private Client", item: "/private-client-service" },
      ]),
      buildWebPageJsonLd({
        name: "FLOXANT Private Client Service",
        description:
          "Private Client Service für individuell koordinierte private Anfragen zu Umzug, Reinigung, Räumung, Übergabe und Angebotsprüfung.",
        path: "/private-client-service",
        about: [
          "Private Client",
          "Private Servicekoordination",
          "Sensible Objektabstimmung",
          "Persönlicher Kontaktweg",
          "Bayern",
          "Deutschland",
        ],
      }),
      buildServiceJsonLd({
        name: "FLOXANT Private Client Service",
        description:
          "Persönlich koordinierter Service für private Anfragen, die eine ruhige Vorprüfung und einen klaren Kontaktweg brauchen.",
        path: "/private-client-service",
        serviceType: "Private Client Service",
        areaServed: ["Bayern", "Deutschland", "Regensburg", "Düsseldorf"],
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  const pillars = germanizeDeep([
    {
      icon: Crown,
      title: "Private Servicekoordination",
      text: "Koordinierte Abstimmung, wenn Umzug, Reinigung, Räumung oder Übergabe mehrere Beteiligte und einen klaren Kontaktweg brauchen.",
    },
    {
      icon: Sparkles,
      title: "Reinigung und Übergabe",
      text: "Reinigung mit Blick auf Zustand, Termin, Zugang, Rückmeldung und die praktische Vorbereitung des nächsten Schritts.",
    },
    {
      icon: Leaf,
      title: "Diskrete Räumung und Entsorgung",
      text: "Sortierung, Abtransport und diskrete Räumung regulär transportfähiger Haushalts- und Einrichtungsgegenstände ohne Sonderabfall-Risiko.",
    },
  ]);

  const process = germanizeDeep([
    "Persönlicher Erstkontakt",
    "Ruhige Objekt- und Umfangspruefung",
    "Kontaktweg, Zugang und Zustaendigkeit klaeren",
    "Passendes Team und Zeitfenster",
    "Umsetzung mit Rueckmeldung oder Uebergabeprotokoll",
  ]);

  const premiumSignatureBlocks = germanizeDeep([
    {
      icon: KeyRound,
      title: "Schlüssel, Übergabe und Protokoll",
      text: "Für sensible Auszüge, Eigentümerwechsel oder Zweitwohnsitze, bei denen Zustand, Fotos, Schlüssel und Übergabetermin ruhig dokumentiert werden sollen.",
    },
    {
      icon: Sparkles,
      title: "Reinigung und Übergabe kombiniert",
      text: "Wenn sensible Räume nicht nur transportiert, sondern sauber zurückgegeben oder für den nächsten Schritt vorbereitet werden müssen.",
    },
    {
      icon: ShieldCheck,
      title: "Diskrete Vorprüfung statt Standardformular",
      text: "Objektart, Zugang, Besonderheiten, gewünschter Servicegrad und Rückrufwunsch werden zuerst vertraulich eingeordnet.",
    },
  ]);

  return (
    <main className="private-client min-h-screen overflow-hidden bg-[#040302] text-[#F6EBDD]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style
        dangerouslySetInnerHTML={{
          __html: `.private-client { --gold: #D8B76E; --champagne: #F6EBDD; --muted-champagne: rgba(246, 235, 221, 0.62); --oxblood: #2A0907; --mahogany: #120907; font-family: "Cormorant Garamond", "Bodoni 72", "Didot", Georgia, serif; } .private-client .private-copy { font-family: "Avenir Next", "Optima", "Segoe UI", sans-serif; }`,
        }}
      />

      <header className="absolute inset-x-0 top-0 z-30 px-6 py-7">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#D8B76E]/18 bg-[#080604]/55 px-5 py-3 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8B76E]/40 text-[#D8B76E]">
              <Gem className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.34em] text-[#F6EBDD]">FLOXANT</div>
              <div className="private-copy text-[10px] uppercase tracking-[0.22em] text-[#D8B76E]/75">Private Client</div>
            </div>
          </Link>
          <a
            href={`mailto:${company.email}?subject=${encodeURIComponent("Private Client Anfrage")}`}
            className="private-copy hidden rounded-full border border-[#D8B76E]/25 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D8B76E] transition hover:bg-[#D8B76E] hover:text-[#120D08] sm:inline-flex"
          >
            Privat kontaktieren
          </a>
        </div>
      </header>

      <section className="relative px-6 pb-24 pt-40 md:pb-32 md:pt-52">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(216,183,110,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(90,22,12,0.52),transparent_38%),linear-gradient(135deg,#040302_0%,#120907_44%,#050302_100%)]" />
        <div className="absolute left-1/2 top-24 -z-10 h-[680px] w-[680px] -translate-x-1/2 rounded-full border border-[#D8B76E]/10" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#040302] to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="private-copy mb-7 inline-flex items-center gap-3 rounded-full border border-[#D8B76E]/20 bg-[#D8B76E]/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D8B76E]">
              <ShieldCheck className="h-4 w-4" />
              Persönliche Abstimmung
            </div>
            <h1 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] text-[#F6EBDD] md:text-7xl lg:text-[6.7rem]">
              Private Client Service für sensible private Anfragen
            </h1>
            <p className="private-copy mt-8 max-w-2xl text-lg leading-relaxed text-[#E6D8C3]/68">
              Für Eigentümer, Family Offices, Assistenzen und Privathaushalte, bei denen Umzug,
              Reinigung, Räumung, Übergabe oder Angebotsprüfung persönlich abgestimmt werden
              sollen. FLOXANT klärt zuerst Kontaktweg, Zuständigkeit, Umfang und nächste Schritte.
              Für allgemeine sensible Fälle gibt es den separaten Diskret-Service.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={privateClientLeadHref}
                className="private-copy inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#D8B76E] px-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#120D08] transition hover:bg-[#F0D58B]"
                data-event="request_cta_click"
                data-service="private-client"
                data-city="bayern"
                data-cta-label="Vertraulich anfragen"
                data-destination={privateClientLeadHref}
              >
                Vertraulich anfragen
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`tel:${company.phoneRaw.replace(/\s/g, "")}`}
                className="private-copy inline-flex h-14 items-center justify-center rounded-full border border-[#D8B76E]/22 px-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8D2A2] transition hover:border-[#D8B76E]/50 hover:bg-[#D8B76E]/8"
                data-event="phone_click"
                data-service="private-client"
                data-city="bayern"
              >
                Persönlich sprechen
              </a>
              <Link
                href="/diskret-service"
                className="private-copy inline-flex h-14 items-center justify-center rounded-full border border-[#D8B76E]/22 px-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8D2A2] transition hover:border-[#D8B76E]/50 hover:bg-[#D8B76E]/8"
                data-event="service_card_click"
                data-source="private_client_hero"
                data-service="private-client"
                data-city="bayern"
                data-cta-label="Diskret-Service ansehen"
              >
                Diskret-Service ansehen
              </Link>
            </div>
          </div>

          <div className="relative rounded-[2.5rem] border border-[#D8B76E]/18 bg-[#0A0604]/72 p-5 shadow-[0_34px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#D8B76E]/16 bg-[linear-gradient(145deg,rgba(216,183,110,0.22),rgba(42,9,7,0.35)),radial-gradient(circle_at_50%_24%,rgba(246,235,221,0.16),transparent_28%)] p-8">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="private-copy text-[10px] uppercase tracking-[0.28em] text-[#D8B76E]">Persönliche Planung</div>
                  <p className="mt-6 text-4xl font-medium leading-tight text-[#F6EBDD] md:text-5xl">
                    Anfrage führen. Kontaktweg klären. Naechste Schritte strukturieren.
                  </p>
                </div>
                <div className="grid gap-3 private-copy">
                  {[
                    "Bevorzugter Kontaktweg",
                    "Zustaendigkeiten und Zugang",
                    "Reinigung und Übergabe",
                    "Persönliche Abstimmung",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-full border border-[#D8B76E]/14 bg-black/20 px-4 py-3 text-sm text-[#E6D8C3]/72">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D8B76E]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl rounded-[2.2rem] border border-[#D8B76E]/14 bg-[#0A0604] p-8">
          <div className="mb-8 max-w-3xl">
            <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D8B76E]">Kurz erklärt</div>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#F6EBDD] md:text-5xl">
              Was dieser Bereich sofort klar machen soll
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Was ist das?",
                text: "Ein persönlicher Bereich für private Anfragen, die Koordination, Rückruf und ruhige Vorprüfung brauchen.",
              },
              {
                title: "Für wen?",
                text: "Für Eigentümer, Family Offices, Assistenzen und Kunden, die keinen Standarddienstleister suchen.",
              },
              {
                title: "Wann sinnvoll?",
                text: "Wenn Kontaktweg, Zustaendigkeit, Umfang und nächste Schritte wichtiger sind als ein schneller Standardprozess.",
              },
              {
                title: "Wie läuft es ab?",
                text: "Zuerst persönliche Vorprüfung, dann ruhige Abstimmung zu Zugang, Serviceumfang, Team und Zeitfenster.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-[1.6rem] border border-[#D8B76E]/12 bg-black/20 p-5">
                <h3 className="text-2xl font-medium text-[#F6EBDD]">{item.title}</h3>
                <p className="private-copy mt-3 text-sm leading-relaxed text-[#E6D8C3]/62">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D8B76E]">Drei Ebenen</div>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#F6EBDD] md:text-6xl">
              Ein Service, der Umzug, Reinigung und diskrete Räumung zusammen denkt
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-[2rem] border border-[#D8B76E]/16 bg-[#0B0805] p-8">
                  <Icon className="mb-8 h-8 w-8 text-[#D8B76E]" />
                  <h3 className="text-3xl font-medium tracking-tight text-[#F6EBDD]">{item.title}</h3>
                  <p className="private-copy mt-5 text-sm leading-relaxed text-[#E6D8C3]/58">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl rounded-[2.4rem] border border-[#D8B76E]/14 bg-[#0A0604] p-8 md:p-10">
          <div className="mb-8 max-w-3xl">
            <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D8B76E]">
              Diskrete Bausteine
            </div>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#F6EBDD] md:text-5xl">
              Private Client heisst: weniger Schnittstellen, klarere Abstimmung
            </h2>
            <p className="private-copy mt-5 text-sm leading-relaxed text-[#E6D8C3]/58">
              FLOXANT verspricht keine pauschalen Sonderstatus-Siegel. Entscheidend ist, dass sensible
              Aufgaben wie Übergabe, Reinigung, Zugang, Schlüssel und Rückrufwunsch ruhig zusammen
              geplant werden.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {premiumSignatureBlocks.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-[1.7rem] border border-[#D8B76E]/12 bg-black/20 p-6">
                  <Icon className="mb-5 h-6 w-6 text-[#D8B76E]" />
                  <h3 className="text-2xl font-medium text-[#F6EBDD]">{item.title}</h3>
                  <p className="private-copy mt-3 text-sm leading-relaxed text-[#E6D8C3]/56">{item.text}</p>
                </article>
              );
            })}
          </div>

          <a
            href="#private-anfrage"
            className="private-copy mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#D8B76E] px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#120D08] transition hover:bg-[#F0D58B]"
            data-event="service_card_click"
            data-source="private_client_signature_services"
          >
            Anfrage vertraulich vorbereiten
          </a>
        </div>
      </section>

      <section className="border-y border-[#D8B76E]/10 bg-[#0A0604] px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D8B76E]">Nicht standardisiert</div>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#F6EBDD] md:text-6xl">
              Keine öffentliche Standardabwicklung. Keine Massenlogik.
            </h2>
            <p className="private-copy mt-6 text-sm leading-relaxed text-[#E6D8C3]/58">
              Bei privaten Sonderanfragen zählt nicht nur Volumen. Entscheidend sind Zugang,
              Wegefuehrung, Kontaktweg, Terminfenster, Ansprechpartner, Hausverwaltung,
              Materialschutz und die gewuenschte Rückmeldung.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { icon: KeyRound, title: "Kontaktweg", text: "Abstimmung mit Eigentuemer, Assistenz, Verwaltung oder beauftragter Kontaktperson." },
              { icon: Home, title: "Objektverstaendnis", text: "Zugang, Wege, Etagen, Schlüssel, Zeitfenster und praktische Grenzen vorab klären." },
              { icon: Gem, title: "Koordination", text: "Umzug, Reinigung, Räumung, Übergabe oder Angebotsprüfung in einen Ablauf bringen." },
              { icon: ShieldCheck, title: "Grenzen", text: "Keine Gefahrstoffe oder Sonderabfaelle. Keine falschen Zusagen für regulierte Materialien." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.6rem] border border-[#D8B76E]/12 bg-black/20 p-6">
                  <Icon className="mb-5 h-6 w-6 text-[#D8B76E]" />
                  <h3 className="text-2xl font-medium text-[#F6EBDD]">{item.title}</h3>
                  <p className="private-copy mt-3 text-sm leading-relaxed text-[#E6D8C3]/54">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D8B76E]">Ablauf</div>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#F6EBDD] md:text-6xl">
              Ruhig. Persönlich. Kontrolliert.
            </h2>
          </div>
          <div className="space-y-3">
            {process.map((step, index) => (
              <div key={step} className="grid grid-cols-[3.5rem_1fr] items-center rounded-full border border-[#D8B76E]/12 bg-[#0B0805] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D8B76E]/12 text-sm font-semibold text-[#D8B76E]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="private-copy text-sm font-medium text-[#E6D8C3]/74">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-[#D8B76E]/14 bg-[linear-gradient(135deg,rgba(216,183,110,0.12),rgba(42,9,7,0.46))] p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D8B76E]">Region</div>
              <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#F6EBDD] md:text-6xl">
                Bayern und Baden-Württemberg
              </h2>
              <p className="private-copy mt-6 text-sm leading-relaxed text-[#E6D8C3]/58">
                FLOXANT betreut individuelle private Serviceanfragen in
                Deutschland. Besonders relevant: Regensburg, Bayern, Düsseldorf, Nordrhein-Westfalen
                sowie abgestimmte ueberregionale Anfragen in umliegenden
                Regionen.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {["München", "Starnberg", "Tegernsee", "Regensburg", "Nürnberg", "Stuttgart", "Baden-Baden", "Heidelberg", "Freiburg", "Ulm"].map((city) => (
                <div key={city} className="rounded-full border border-[#D8B76E]/16 bg-black/20 px-5 py-3 private-copy text-sm font-medium text-[#E6D8C3]/72">
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="private-anfrage" className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D8B76E]">Private Desk</div>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#F6EBDD] md:text-6xl">
              Beginnen Sie mit wenigen vertraulichen Eckdaten
            </h2>
            <p className="private-copy mt-6 text-sm leading-relaxed text-[#E6D8C3]/58">
              FLOXANT meldet sich persönlich. Die weitere Planung erfolgt erst nach diskreter
              Einordnung von Objekt, Umfang, Zugang, Schutzbedarf und gewünschtem Servicegrad.
              Lieber eine ruhige Vorprüfung als ein falscher Schnellschuss.
            </p>
          </div>
          <PrivateClientInquiryForm />
        </div>
      </section>

      <section className="border-t border-[#D8B76E]/10 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          <Link href="/blog/family-office-umzug-bayern-diskret-abstimmen" className="rounded-[1.7rem] border border-[#D8B76E]/12 bg-[#0B0805] p-7 transition hover:border-[#D8B76E]/30 hover:bg-[#110a06]">
            <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D8B76E]">Ratgeber</div>
            <h2 className="mt-3 text-2xl font-medium text-[#F6EBDD]">Family Office & Private Client besser abstimmen</h2>
            <p className="private-copy mt-4 text-sm leading-relaxed text-[#E6D8C3]/58">
              Für Eigentümer, Family Offices und Assistenzen, die zuerst verstehen möchten, wie Zuständigkeiten, Diskretion und Schutzbedarf ruhig koordiniert werden.
            </p>
          </Link>
          <Link href="/nachlass-raeumung-regensburg" className="rounded-[1.7rem] border border-[#D8B76E]/12 bg-[#0B0805] p-7 transition hover:border-[#D8B76E]/30 hover:bg-[#110a06]">
            <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D8B76E]">Diskret</div>
            <h2 className="mt-3 text-2xl font-medium text-[#F6EBDD]">Nachlass-Räumung ruhig klären</h2>
            <p className="private-copy mt-4 text-sm leading-relaxed text-[#E6D8C3]/58">
              Für Angehörige, Erben und Eigentuemer, wenn Freigabe, Zugang, Fotos, Räumung und Reinigung sensibel abgestimmt werden sollen.
            </p>
          </Link>
          <Link href="/diskreter-umzug-trennung-scheidung" className="rounded-[1.7rem] border border-[#D8B76E]/12 bg-[#0B0805] p-7 transition hover:border-[#D8B76E]/30 hover:bg-[#110a06]">
            <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D8B76E]">Rückruf-First</div>
            <h2 className="mt-3 text-2xl font-medium text-[#F6EBDD]">Diskreter Auszug bei Trennung</h2>
            <p className="private-copy mt-4 text-sm leading-relaxed text-[#E6D8C3]/58">
              Für sensible private Auszugssituationen, wenn Rückruf, sichere Kontaktmethode, Transport, Reinigung und Übergabe ruhig abgestimmt werden sollen.
            </p>
          </Link>
          <Link href="/diskret-service" className="rounded-[1.7rem] border border-[#D8B76E]/12 bg-[#0B0805] p-7 transition hover:border-[#D8B76E]/30 hover:bg-[#110a06]">
            <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D8B76E]">Kontaktweg</div>
            <h2 className="mt-3 text-2xl font-medium text-[#F6EBDD]">Diskret-Service für sensible Faelle</h2>
            <p className="private-copy mt-4 text-sm leading-relaxed text-[#E6D8C3]/58">
              Wenn die Anfrage sensibel ist, aber keine persönlich gefuehrte Private-Client-Koordination braucht, beginnt sie hier.
            </p>
          </Link>
          <Link
            href={privateClientLeadHref}
            className="rounded-[1.7rem] border border-[#D8B76E]/12 bg-[linear-gradient(135deg,rgba(216,183,110,0.16),rgba(42,9,7,0.56))] p-7 transition hover:border-[#D8B76E]/30 hover:bg-[linear-gradient(135deg,rgba(216,183,110,0.22),rgba(42,9,7,0.62))]"
            data-event="request_cta_click"
            data-service="private-client"
            data-city="bayern"
            data-cta-label="Direkt vertraulich Kontakt aufnehmen"
            data-destination={privateClientLeadHref}
          >
            <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D8B76E]">Persönlich</div>
            <h2 className="mt-3 text-2xl font-medium text-[#F6EBDD]">Direkt vertraulich Kontakt aufnehmen</h2>
            <p className="private-copy mt-4 text-sm leading-relaxed text-[#E6D8C3]/62">
              Für vertrauliche Rückfragen, Vorabstimmung oder eine erste diskrete Einschätzung ohne langen Formularweg.
            </p>
          </Link>
        </div>
      </section>

      <section className="border-t border-[#D8B76E]/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-medium tracking-tight text-[#F6EBDD]">Häufige Fragen</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-[1.7rem] border border-[#D8B76E]/12 bg-[#0B0805] p-7">
                <h3 className="text-2xl font-medium text-[#F6EBDD]">{item.q}</h3>
                <p className="private-copy mt-4 text-sm leading-relaxed text-[#E6D8C3]/56">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />
      <footer className="border-t border-[#D8B76E]/10 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[0.34em] text-[#F6EBDD]">FLOXANT Private Client</div>
            <p className="private-copy mt-2 text-sm text-[#E6D8C3]/45">
              Private Client Service für sensible private Anfragen.
            </p>
          </div>
          <div className="private-copy flex flex-wrap gap-3 text-sm text-[#E6D8C3]/55">
            <Link href="/" className="hover:text-[#D8B76E]">Startseite</Link>
            <span>/</span>
            <Link href="/impressum" className="hover:text-[#D8B76E]">Impressum</Link>
            <span>/</span>
            <Link href="/datenschutz" className="hover:text-[#D8B76E]">Datenschutz</Link>
          </div>
        </div>
        <div className="mx-auto max-w-7xl"><SocialLinks /></div>
      </footer>
    </main>
  );
}
