import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BadgeEuro,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  MapPin,
  ShieldCheck,
  Sparkles,
  Timer,
  UploadCloud,
} from "lucide-react";

import {
  AiAnswerBlock,
  ChecklistBlock,
  ComparisonAnswerTable,
  HumanReadableFAQ,
  QuickDecisionBox,
  type ComparisonAnswerRow,
} from "@/components/ai-answer";
import {
  BeforeAfterCard,
  BlogInsightGraphic,
  OfferCheckVisual,
  ProcessStepGraphic,
  VisualServiceShape,
} from "@/components/visuals";
import { offerCheckFaqItems } from "@/lib/faqs";

const offerCheckUseCases = [
  {
    title: "Angebot wirkt zu teuer",
    text: "FLOXANT prueft, ob Preis, Umfang, Ort, Zugang und Termin nachvollziehbar zusammenpassen.",
    icon: BadgeEuro,
  },
  {
    title: "Leistungsumfang ist unklar",
    text: "Tragen, Flaeche, Turnus, Entsorgung, Anfahrt oder Zusatzleistungen sind nicht eindeutig beschrieben.",
    icon: ClipboardCheck,
  },
  {
    title: "Ungewoehnliche Vorkasse",
    text: "Wir ordnen die Situation praktisch ein und nennen klare Rueckfragen. Keine Rechtsberatung.",
    icon: ShieldCheck,
  },
  {
    title: "Mehrere Angebote sind schwer vergleichbar",
    text: "Die gleiche Summe kann unterschiedliche Leistungen enthalten. FLOXANT trennt echte Kostentreiber.",
    icon: FileSearch,
  },
  {
    title: "Zeitdruck vor Uebergabe",
    text: "Wenn Termin, Reinigung, Umzug oder Raeumung zusammenfallen, braucht es klare Prioritaeten.",
    icon: Timer,
  },
  {
    title: "Anbieter hat abgesagt",
    text: "Dann ist oft Plan B wichtiger als ein weiterer Preisvergleich. FLOXANT prueft Machbarkeit und naechsten Schritt.",
    icon: Sparkles,
  },
] as const;

const processSteps = [
  "Angebot, Preis oder Situation beschreiben",
  "Fotos oder Dateien optional senden",
  "Leistung und Ort angeben",
  "FLOXANT strukturiert Umfang, Aufwand und offene Punkte",
  "Einschaetzung, Rueckfragen oder passende Alternative erhalten",
] as const;

const scopeCan = [
  "Preis und Leistungsumfang praktisch einordnen",
  "fehlende Angaben und Rueckfragen sichtbar machen",
  "Reinigung, Umzug, Entsorgung, Solar/PV und Gewerbe unterscheiden",
  "Düsseldorf und Regensburg nach passendem Kontaktweg trennen",
  "eine FLOXANT Alternative pruefen, wenn Region, Termin und Umfang passen",
] as const;

const scopeCannot = [
  "keine Rechtsberatung und keine Vertragspruefung im juristischen Sinn",
  "keine garantierte Preisunterbietung",
  "keine Abwertung oder Bewertung fremder Anbieter",
  "keine Dumpingpreise ohne realistischen Umfang",
  "keine Zusage ohne Ort, Termin, Umfang und Machbarkeit",
] as const;

const matrixRows = [
  ["Reinigung", "Flaeche, Zustand, Kueche, Bad, Fenster, Uebergabeziel, Fotos"],
  ["Bueroreinigung", "Flaeche, Turnus, Zeitfenster, Raumliste, Schluesselweg, Ansprechpartner"],
  ["Gewerbereinigung", "Objektart, Nutzung, Oeffnungszeiten, Sanitär, Laufwege, Zusatzbereiche"],
  ["Umzug", "Volumen, Etage, Aufzug, Laufweg, Strecke, Montage, Termin"],
  ["Bueroumzug", "Arbeitsplaetze, IT, Archiv, Betriebsunterbrechung, Zeitfenster"],
  ["Entruempelung", "Menge, Material, Demontage, Zugang, Entsorgung, Reinigung danach"],
  ["Haushaltsaufloesung", "Nachlass, sensible Gegenstaende, Sortierung, Fristen, Diskretion"],
  ["Solarreinigung / PV", "Zugang, Dachlage, Modulzustand, Wasser, Sicherheit, Fotos"],
  ["Glas / Fassade", "Hoehe, Flaeche, Zugang, Verschmutzung, Steighilfe, Termin"],
  ["Eventreinigung", "Flaeche, Besucher, Zeitfenster, Abfall, Nachreinigung"],
  ["Sonderreinigung", "Risiko, Material, Zustand, Grenzen, keine falschen Zusagen"],
] as const;

const warningSigns = [
  "Leistungsbeschreibung bleibt allgemein",
  "Flaeche, Volumen oder Menge fehlen",
  "Entsorgung, Zusatzkosten oder Anfahrt sind unklar",
  "Terminlogik passt nicht zur Uebergabe oder Deadline",
  "sehr niedriger Preis ohne Leistungsumfang",
  "hoher Preis ohne nachvollziehbare Kostentreiber",
  "Fotos oder Besichtigung werden ignoriert",
  "Vorkasse oder Zahlungsweg wirkt ungewoehnlich",
] as const;

const internalLinks = [
  { href: "/angebot-guenstiger-pruefen", label: "Angebot pruefen", text: "zentrale Seite fuer vorhandene Angebote" },
  { href: "/angebotscheck", label: "Angebotscheck", text: "Red-Flag-Scanner und Uploadpfad" },
  { href: "/anbieter-vergleichen", label: "Anbieter vergleichen", text: "Portal, Direktanbieter und Leistungsumfang trennen" },
  { href: "/kontakt", label: "Kontakt", text: "Anfrage mit Ort, Termin und Fotos senden" },
  { href: "/reinigung", label: "Reinigung", text: "Reinigung und Uebergabe richtig beschreiben" },
  { href: "/umzug", label: "Umzug", text: "Volumen, Strecke und Zusatzleistungen einordnen" },
  { href: "/entruempelung", label: "Entruempelung", text: "Menge, Material und Zugang klaeren" },
  { href: "/solarreinigung", label: "Solarreinigung", text: "PV-Angebot und Zugang pruefen" },
  { href: "/duesseldorf", label: "Duesseldorf", text: "lokale Reinigungs- und Servicewege" },
  { href: "/regensburg", label: "Regensburg", text: "lokaler Schwerpunkt und Bayern-Nahbereich" },
  { href: "/signature-services", label: "Signature Services", text: "Fairpreis, Objektbrief, Plan B und Rueckfahrt" },
  { href: "/blog/reinigungsangebot-pruefen-regensburg-duesseldorf", label: "Blog: Reinigungsangebot", text: "Fläche, Zustand und Uebergabe verstehen" },
] as const;

const trustItems = [
  {
    title: "Echte zweite Einschaetzung",
    text: "FLOXANT ordnet Angebot, Fotos, Umfang und Termin praktisch ein. Es geht nicht um pauschales Unterbieten.",
  },
  {
    title: "Klare Grenzen",
    text: "Keine Rechtsberatung, keine Preisgarantie, keine Bewertung fremder Anbieter und keine Google-Maps-Rankingversprechen.",
  },
  {
    title: "Schneller Start mit wenigen Angaben",
    text: "Name, Kontakt, Ort, Service und eine kurze Beschreibung reichen. Angebot, Preis und Fotos bleiben optional.",
  },
  {
    title: "Passender naechster Schritt",
    text: "Je nach Situation fuehrt FLOXANT zu Rueckfrage, normaler Anfrage, Plan B, Objektbrief oder passender Service-Seite.",
  },
] as const;

const relatedBlogs = [
  {
    href: "/blog/reinigungsangebot-pruefen-regensburg-duesseldorf",
    title: "Reinigungsangebot pruefen",
    text: "Flaeche, Zustand, Fotos, Termin und Uebergabeziel vor der Zusage einordnen.",
  },
  {
    href: "/blog/umzugsangebot-pruefen-regensburg-bayern",
    title: "Umzugsangebot pruefen",
    text: "Volumen, Etage, Laufweg, Strecke, Rueckfahrt und Reinigung sauber trennen.",
  },
  {
    href: "/blog/entruempelungsangebot-pruefen-serioes",
    title: "Entruempelungsangebot pruefen",
    text: "Menge, Material, Zugang, Entsorgung und Reinigung danach sichtbar machen.",
  },
  {
    href: "/blog/solarreinigung-pv-angebot-pruefen",
    title: "PV-Angebot pruefen",
    text: "Dachzugang, Wasser, Modulzustand, Sicherheit und Fotos vor einem Preis klaeren.",
  },
  {
    href: "/blog/angebot-ohne-besichtigung-riskant",
    title: "Angebot ohne Besichtigung",
    text: "Wann Fotos reichen und wann Rueckfragen oder ein Vor-Ort-Blick sinnvoller sind.",
  },
  {
    href: "/blog/anbieter-hat-abgesagt-was-tun",
    title: "Anbieter hat abgesagt",
    text: "Wenn Deadline oder Uebergabe naeher ruecken, zaehlt Plan B statt weiterer Preisvergleich.",
  },
] as const;

const localLinks = [
  {
    href: "/duesseldorf",
    title: "Duesseldorf Hub",
    text: "Lokale Wege fuer Reinigung, Gewerbe, Umzug, Entruempelung und Angebotspruefung.",
  },
  {
    href: "/angebot-vergleichen-duesseldorf",
    title: "Reinigungsangebot Duesseldorf",
    text: "Turnus, Objektart, Stadtteil, Fotos und Preisrahmen lokal einordnen.",
  },
  {
    href: "/regensburg",
    title: "Regensburg Hub",
    text: "FLOXANT Schwerpunkt fuer Umzug, Reinigung, Entruempelung und Bayern-Nahbereich.",
  },
  {
    href: "/regensburg/solarreinigung",
    title: "Solarreinigung Regensburg",
    text: "PV-Anlage, Dachzugang, Wasser und Sicherheit ohne Ertragsversprechen pruefen.",
  },
] as const;

const comparisonRows: ComparisonAnswerRow[] = [
  {
    topic: "Pauschalpreis vs. Aufwand",
    left: "Pauschal wirkt einfach, kann aber Luecken verdecken.",
    right: "Aufwand erklaert Kostentreiber wie Flaeche, Etage, Menge oder Zugang.",
    decision: "Bei unklaren Angeboten zuerst Umfang klaeren.",
  },
  {
    topic: "Reinigung vs. Sonderreinigung",
    left: "Normale Reinigung meint regelmaessige oder uebliche Flaechen.",
    right: "Sonderreinigung braucht Fotos, Zustand, Material und Grenzen.",
    decision: "Bei PV, Glas, Fassade oder starker Verschmutzung Spezialweg nutzen.",
  },
  {
    topic: "Umzug vs. Moebeltransport",
    left: "Umzug umfasst meist Hausrat, Volumen und mehrere Positionen.",
    right: "Moebeltransport ist fokussierter, aber Strecke und Zugang bleiben wichtig.",
    decision: "Bei wenigen Teilen kann Rueckfahrt oder Beiladung sinnvoll sein.",
  },
  {
    topic: "Angebot pruefen vs. direkt buchen",
    left: "Pruefen passt, wenn Preis oder Umfang unklar sind.",
    right: "Direkt buchen passt, wenn Ort, Termin und Umfang bereits klar sind.",
    decision: "Unsicheres Angebot erst ordnen, klare Anfrage direkt senden.",
  },
  {
    topic: "Plan B vs. normale Anfrage",
    left: "Plan B passt bei Absage, Zeitdruck oder kippender Uebergabe.",
    right: "Normale Anfrage passt bei planbarer Frist.",
    decision: "Bei Deadline lieber Machbarkeit als Preisvergleich priorisieren.",
  },
];

export function OfferCheckHero({
  title = "Angebot pruefen lassen, bevor aus einem Preis ein Problem wird.",
  intro = "FLOXANT ordnet Preis, Umfang, Termin, Ort, Fotos und offene Punkte praktisch ein. Keine Rechtsberatung, keine Dumpinggarantie, sondern eine klare zweite Einschaetzung.",
  primaryHref = "/angebot-guenstiger-pruefen#guenstiger-form",
  secondaryHref = "/angebotscheck#red-flag-scanner",
}: {
  title?: string;
  intro?: string;
  primaryHref?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
            <FileSearch className="h-4 w-4" aria-hidden="true" />
            FLOXANT Angebotspruefung
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-black tracking-normal sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-300">{intro}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={primaryHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950 transition hover:bg-cyan-50">
              Angebot pruefen lassen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={secondaryHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white hover:text-slate-950">
              Situation beschreiben
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-black text-slate-200">
            {["keine Rechtsberatung", "keine Preisgarantie", "Düsseldorf und Regensburg", "nur echter Submit loest API aus"].map((item) => (
              <span key={item} className="rounded-md border border-white/12 bg-white/10 px-3 py-2">{item}</span>
            ))}
          </div>
        </div>
        <OfferCheckVisual tone="blue" title="Preis, Umfang, Termin und offene Punkte" label="sichtbarer Pruefpfad" />
      </div>
    </section>
  );
}

export function OfferCheckQuickAnswer({ className = "" }: { className?: string }) {
  return (
    <AiAnswerBlock
      className={className}
      title="Kurz gesagt: FLOXANT prueft nicht nur den Preis, sondern die Machbarkeit."
      answer="Ein Angebot ist erst vergleichbar, wenn Leistung, Ort, Termin, Fotos, Umfang, Zusatzkosten und Grenzen klar sind. FLOXANT macht diese Punkte sichtbar und sagt, welcher naechste Schritt sinnvoll ist."
      points={[
        "Preis ohne Umfang ist wenig aussagekraeftig.",
        "Fotos reduzieren Rueckfragen und Risikoaufschlaege.",
        "Region, Zugang und Termin entscheiden ueber Machbarkeit.",
        "Bei Zeitdruck kann Plan B wichtiger sein als Preisvergleich.",
        "Bei Reinigung, Umzug und Entruempelung zaehlen andere Kostentreiber.",
        "Die Pruefung ersetzt keine Rechtsberatung.",
      ]}
      usefulWhen={["Sie haben ein Angebot oder einen Preis erhalten", "der Umfang ist unklar", "Sie brauchen eine zweite praktische Einschaetzung"]}
      notUsefulWhen={["Sie eine rechtliche Vertragspruefung erwarten", "Sie ohne Angaben nur einen niedrigsten Preis suchen", "der Auftrag ausserhalb der FLOXANT-Leistungen liegt"]}
      neededInfo={["Angebot oder Preis", "Ort/PLZ und Termin", "Fotos oder kurze Beschreibung", "Serviceart und Ziel"]}
    />
  );
}

export function OfferCheckUseCases({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Typische Situationen
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">Wann Angebot pruefen wirklich hilft.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {offerCheckUseCases.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
              <Icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-black text-slate-950">{title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfferCheckProcess({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-slate-50 px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <UploadCloud className="h-4 w-4" aria-hidden="true" />
            Ablauf
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">Vom unklaren Angebot zur belastbaren Rueckfrage.</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
            Der Ablauf ist bewusst einfach: erst Angaben sammeln, dann sortieren, dann entscheiden, ob Rueckfragen, Alternative oder Plan B sinnvoll sind.
          </p>
          <ProcessStepGraphic className="mt-6" title="Angebotscheck-Ablauf" />
        </div>
        <div className="grid gap-3">
          {processSteps.map((step, index) => (
            <div key={step} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-700 text-sm font-black text-white">{index + 1}</span>
              <p className="text-sm font-semibold leading-7 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfferCheckScopePanel({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
          <p className="text-sm font-black uppercase tracking-normal text-emerald-800">FLOXANT kann pruefen</p>
          <ul className="mt-5 grid gap-3">
            {scopeCan.map((item) => (
              <li key={item} className="flex gap-3 text-sm font-semibold leading-7 text-emerald-950">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm font-black uppercase tracking-normal text-amber-900">FLOXANT verspricht nicht</p>
          <ul className="mt-5 grid gap-3">
            {scopeCannot.map((item) => (
              <li key={item} className="flex gap-3 text-sm font-semibold leading-7 text-amber-950">
                <AlertTriangle className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function OfferCheckServiceMatrix({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            Service-Matrix
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">Welche Angebote FLOXANT praktisch einordnen kann.</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-300">
            Jede Leistung hat andere Kostentreiber. Die Matrix zeigt, welche Angaben fuer die erste Einschaetzung wichtig sind.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {matrixRows.map(([service, factors]) => (
            <article key={service} className="rounded-lg border border-white/12 bg-white/[0.06] p-5">
              <h3 className="text-lg font-black text-white">{service}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">{factors}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfferCheckWarningSigns({ className = "" }: { className?: string }) {
  return (
    <ChecklistBlock
      className={className}
      title="Warnsignale, die vor der Zusage geklaert werden sollten."
      intro="Ein Warnsignal bedeutet nicht automatisch, dass ein Angebot unserioes ist. Es zeigt nur, wo Rueckfragen sinnvoll sind."
      items={warningSigns}
      columns={2}
    />
  );
}

export function OfferCheckTrustPanel({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Vertrauen und Grenzen
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
            Professionell pruefen heisst: ehrlich, nachvollziehbar und ohne falsche Versprechen.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <CheckCircle2 className="h-5 w-5 text-blue-700" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfferCheckFormIntro({ className = "" }: { className?: string }) {
  return (
    <section className={`w-full max-w-full min-w-0 overflow-hidden rounded-lg border border-blue-100 bg-blue-50 p-5 text-blue-950 ${className}`}>
      <p className="break-words text-sm font-black uppercase tracking-normal text-blue-800">Vor dem Absenden</p>
      <h2 className="mt-2 min-w-0 break-words text-2xl font-black tracking-normal text-slate-950">
        Wenige Pflichtangaben reichen. Alles Weitere hilft nur bei der Einordnung.
      </h2>
      <div className="mt-4 grid min-w-0 gap-3 md:grid-cols-3">
        {[
          "Pflicht: Name, Kontakt, Ort/Stadt, Service und kurze Beschreibung.",
          "Optional: vorhandenes Angebot, Preis, Fotos, Termin, Flaeche oder Umfang.",
          "Nach dem Submit prueft FLOXANT Rueckfragen, Machbarkeit und passenden naechsten Schritt.",
        ].map((item) => (
          <div key={item} className="min-w-0 break-words rounded-md border border-blue-100 bg-white p-4 text-sm font-semibold leading-7">
            {item}
          </div>
        ))}
      </div>
      <p className="mt-4 min-w-0 break-words text-sm font-semibold leading-7 text-blue-900">
        Keine automatische Pruefung beim Seitenaufruf: Die Anfrage wird erst gesendet, wenn Sie das Formular bewusst abschicken.
      </p>
    </section>
  );
}

export function OfferCheckFAQ({ className = "" }: { className?: string }) {
  return (
    <HumanReadableFAQ
      className={className}
      title="FAQ zur Angebotspruefung"
      intro="Die haeufigsten Fragen knapp beantwortet, bevor Sie ein Angebot zusagen."
      items={offerCheckFaqItems.slice(0, 7)}
    />
  );
}

export function OfferCheckRelatedBlogs({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-slate-50 px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <FileSearch className="h-4 w-4" aria-hidden="true" />
            Ratgeber, die bei der Entscheidung helfen
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
            Angebot pruefen besser verstehen, bevor Sie zusagen.
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {relatedBlogs.map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-lg border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
              <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                Ratgeber oeffnen
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfferCheckLocalLinks({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Lokale Wege
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
            Duesseldorf und Regensburg bleiben getrennt und nachvollziehbar.
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {localLinks.map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md">
              <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                Lokal ansehen
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfferCheckInternalLinks({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Passende Schritte
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">Von der Angebotsfrage zur passenden FLOXANT-Seite.</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {internalLinks.map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md">
              <h3 className="text-lg font-black text-slate-950">{item.label}</h3>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                Oeffnen
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfferCheckAuthoritySections({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <OfferCheckQuickAnswer />
      <OfferCheckTrustPanel />
      <QuickDecisionBox
        fits={[
          "ein Angebot liegt vor und wirkt unklar",
          "mehrere Anbieter nennen unterschiedliche Leistungen",
          "Ort, Zugang, Termin oder Zusatzkosten fehlen",
        ]}
        notFits={[
          "Sie erwarten eine juristische Vertragsbewertung",
          "Sie suchen nur einen Dumpingpreis ohne Leistungsumfang",
          "es gibt keine Angaben zu Ort, Termin oder Leistung",
        ]}
        nextSteps={[
          "Angebot oder Eckdaten senden",
          "Serviceart und Stadt auswaehlen",
          "Fotos optional ergaenzen",
          "Rueckfragen oder passende Alternative erhalten",
        ]}
      />
      <OfferCheckUseCases />
      <OfferCheckProcess />
      <OfferCheckScopePanel />
      <OfferCheckServiceMatrix />
      <ComparisonAnswerTable
        title="Vergleiche, die vor einer Zusage wichtig sind."
        intro="So bleiben Preis, Umfang und naechster Schritt fuer Kunden nachvollziehbar."
        leftLabel="Erster Eindruck"
        rightLabel="Praktische Pruefung"
        rows={comparisonRows}
      />
      <section className="bg-slate-50 px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
          <VisualServiceShape title="Service-Cluster fuer Angebotspruefung" />
          <BeforeAfterCard title="Before/After als neutrales Pruefvisual" />
          <BlogInsightGraphic title="Blogartikel als Entscheidungshilfe" />
        </div>
      </section>
      <OfferCheckWarningSigns />
      <OfferCheckRelatedBlogs />
      <OfferCheckLocalLinks />
      <OfferCheckFAQ />
      <OfferCheckInternalLinks />
    </div>
  );
}
