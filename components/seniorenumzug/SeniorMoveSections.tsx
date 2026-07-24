import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ClipboardCheck,
  FileSearch,
  Home,
  Languages,
  MailQuestion,
  MessageSquareText,
  PackageCheck,
  Scale,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

type CardItem = {
  title: string;
  text: string;
  href?: string;
  cta?: string;
  Icon?: LucideIcon;
};

const primaryContactHref = "/kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo";
const offerCheckHref = "/kontakt?service=seniorenumzug&intent=seniorenumzug-angebot-pruefen&source=seo";
const discreetContactHref = "/kontakt?service=diskret-service&intent=seniorenumzug-diskret&source=seo";

export const seniorMoveFaqItems = [
  {
    q: "Welche Angaben braucht FLOXANT für einen Seniorenumzug?",
    a: "Hilfreich sind Startort, Zielort, Etage, Aufzug, Umfang, Termin oder Frist, Ansprechpartner, Zusatzbedarf und ein bevorzugter Kontaktweg. Fotos oder ein vorhandenes Angebot können optional ergänzt werden.",
  },
  {
    q: "Können Angehörige die Anfrage stellen?",
    a: "Ja. Angehörige können den Seniorenumzug anfragen, wenn Ansprechpartner, Freigaben, Kontaktweg und wichtige Fristen klar beschrieben werden.",
  },
  {
    q: "Kann Seniorenumzug mit Entrümpelung kombiniert werden?",
    a: "Ja, wenn nicht alles mitzieht, sollten Restmöbel, Keller, Garage, Entsorgung und Zielzustand früh genannt werden. FLOXANT ordnet die Kombination organisatorisch ein.",
  },
  {
    q: "Kann Reinigung danach mit angefragt werden?",
    a: "Ja. Wenn eine Wohnung übergabefertig werden soll, helfen Angaben zu Räumen, Zustand, Fotos, Schlüsselweg und Übergabefrist.",
  },
  {
    q: "Was ist bei einem Umzug im Alter besonders wichtig?",
    a: "Wichtig sind Ruhe im Ablauf, klare Kontaktpersonen, realistische Fristen, Reduzierung von Möbeln, sensible Kommunikation und eine nachvollziehbare Reihenfolge von Umzug, Räumung, Reinigung und Übergabe.",
  },
  {
    q: "Kann ich ein vorhandenes Seniorenumzug-Angebot prüfen lassen?",
    a: "Ja. FLOXANT kann Umfang, Zugang, Etage, Termin, Zusatzleistungen und mögliche offene Punkte praktisch einordnen. Es gibt keine Ersparnisgarantie und keine Rechtsberatung.",
  },
  {
    q: "Wie wird ein sensibler Fall diskret angefragt?",
    a: "Beschreiben Sie nur so viel wie nötig: Ort, grober Umfang, Frist und bevorzugter Kontaktweg reichen für den Start. Private Details müssen nicht in die erste Nachricht.",
  },
  {
    q: "Was passiert nach dem Absenden?",
    a: "FLOXANT prüft die Angaben und meldet sich bei fehlenden Informationen über den gewählten Kontaktweg. Eine Anfrage ist noch keine Buchung, kein Preis und keine Verfügbarkeitszusage.",
  },
  {
    q: "Can I ask in English?",
    a: "Yes. International customers or relatives can describe a senior moving request in simple English with start, destination, scope, floor, preferred date and possible needs such as decluttering or cleaning.",
  },
] as const;

export const seniorMoveSituations: CardItem[] = [
  {
    title: "Umzug in kleinere Wohnung",
    text: "Möbel werden reduziert, Kartons sortiert und die alte Wohnung muss häufig danach vorbereitet werden.",
    Icon: Home,
  },
  {
    title: "Angehörige organisieren mit",
    text: "Wenn mehrere Personen abstimmen, helfen ein fester Ansprechpartner, Freigaben und klare Rückrufzeiten.",
    Icon: UsersRound,
  },
  {
    title: "Betreutes Wohnen oder Pflegeumfeld",
    text: "FLOXANT organisiert Umzug und Logistik, macht aber keine Pflegeleistung, Pflegeberatung oder medizinische Beratung.",
    Icon: ShieldCheck,
  },
  {
    title: "Wohnung danach räumen",
    text: "Restmöbel, Keller, Garage, Entsorgung, Reinigung und Übergabe werden getrennt eingeordnet.",
    Icon: PackageCheck,
  },
  {
    title: "Angebot wirkt unklar",
    text: "Ein vorhandenes Angebot kann mit Umfang, Etage, Fotos, Termin und Zusatzleistungen praktisch geprüft werden.",
    Icon: FileSearch,
  },
  {
    title: "Diskreter Fall",
    text: "Bei sensiblen Situationen reicht zunächst eine knappe Beschreibung mit bevorzugtem Kontaktweg.",
    Icon: MailQuestion,
  },
];

export const seniorMoveEffortFactors = [
  "Startort und Zielort",
  "Etage, Aufzug und Laufweg",
  "Möbelmenge und Kartons",
  "Reduzierung, Sortierung oder Packhilfe",
  "Entrümpelung, Wohnungsauflösung oder Restmengen",
  "Reinigung, Zielzustand und Übergabefrist",
  "Angehörigenkoordination",
  "sensible Situation und gewünschter Kontaktweg",
  "Terminwunsch, Frist und Flexibilität",
  "Sonderstücke, Fotos oder vorhandenes Angebot",
] as const;

export const seniorMoveNeededItems = [
  "Startort und Zielort",
  "Etage, Aufzug und Laufweg",
  "grober Umfang: wenige Möbel, komplette Wohnung, Keller oder Garage",
  "Terminwunsch oder späteste Frist",
  "Ansprechpartner und Rolle der anfragenden Person",
  "Zusatzbedarf: Entrümpelung, Reinigung, Übergabe, Objektbrief oder Diskret-Service",
  "Fotos optional",
  "vorhandenes Angebot optional",
  "bevorzugter Kontaktweg",
] as const;

export const seniorMoveBoundaryItems = [
  "keine Pflegeleistung",
  "keine medizinische Beratung",
  "keine Rechtsberatung",
  "keine Preisgarantie",
  "keine Soforttermin-Garantie",
  "keine garantierte Verfügbarkeit",
  "keine automatische Buchung durch Anfrage",
] as const;

const combinedServices: CardItem[] = [
  {
    title: "Seniorenumzug + Entrümpelung",
    text: "Wenn nur ein Teil mitzieht und Restmengen, Keller oder Garage geordnet frei werden müssen.",
    href: "/regensburg/entruempelung",
    cta: "Entrümpelung einordnen",
    Icon: PackageCheck,
  },
  {
    title: "Seniorenumzug + Reinigung",
    text: "Wenn die alte Wohnung nach dem Umzug übergabefertig vorbereitet werden soll.",
    href: "/regensburg/reinigung",
    cta: "Reinigung mitdenken",
    Icon: Sparkles,
  },
  {
    title: "Diskret-Service",
    text: "Wenn Rückfragen, Kontaktweg oder private Details besonders zurückhaltend behandelt werden sollen.",
    href: "/diskreter-umzug-trennung-scheidung",
    cta: "Diskret beschreiben",
    Icon: ShieldCheck,
  },
  {
    title: "Objektbrief und Übergabeakte",
    text: "Wenn Fotos, Schlüsselweg, Zielzustand und offene Punkte übersichtlich gesammelt werden sollen.",
    href: "/objektbrief",
    cta: "Objektbrief ansehen",
    Icon: ClipboardCheck,
  },
  {
    title: "Übergabe-Sprint",
    text: "Wenn Termin, Restpunkte, Reinigung und Schlüsselübergabe in kurzer Zeit sortiert werden müssen.",
    href: "/uebergabe-sprint",
    cta: "Übergabe vorbereiten",
    Icon: CalendarClock,
  },
  {
    title: "Plan-B-Service",
    text: "Wenn ein Anbieter abgesagt hat oder ein Termin kippt. Ohne Sofort- oder Verfügbarkeitsgarantie.",
    href: "/plan-b-service",
    cta: "Plan B prüfen",
    Icon: BadgeCheck,
  },
];

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-normal text-blue-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 md:text-4xl">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-base leading-8 text-slate-600">{intro}</p> : null}
    </div>
  );
}

function SimpleCard({ item }: { item: CardItem }) {
  const Icon = item.Icon || ArrowRight;
  const content = (
    <>
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-black tracking-normal text-slate-950">{item.title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
      {item.cta ? (
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
          {item.cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      ) : null}
    </>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40"
      >
        {content}
      </Link>
    );
  }

  return <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">{content}</article>;
}

export function SeniorMoveHero() {
  const heroFacts = [
    "Angehörige und Kontaktweg",
    "Start, Ziel, Etage, Aufzug",
    "Umfang, Frist, Zusatzbedarf",
    "Fotos oder Angebot optional",
  ];

  return (
    <section className="border-b border-slate-200 bg-slate-50 px-4 pb-14 pt-12 sm:px-6 lg:pt-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-black uppercase tracking-normal text-blue-800 shadow-sm">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Seniorenumzug und Umzug im Alter
          </p>
          <h1 className="mt-6 max-w-5xl text-4xl font-black tracking-normal text-slate-950 md:text-6xl">
            Seniorenumzug mit konkreten Eckdaten anfragen - mit Angehörigen, Umfang und Terminwunsch
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            Ein Seniorenumzug ist oft mehr als ein normaler Umzug. Häufig müssen Möbel reduziert, Räume geräumt,
            Fristen beachtet und Angehörige einbezogen werden. FLOXANT hilft, die Situation mit den nötigen Angaben zu beschreiben
            und den passenden nächsten Schritt einzuordnen - ohne Preis- oder Sofortgarantie.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={primaryContactHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
              data-event="seo_cta_click"
              data-service="seniorenumzug"
              data-page-intent="seniorenumzug-anfragen"
              data-source="seniorenumzug_hero"
            >
              Seniorenumzug anfragen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={offerCheckHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-5 text-sm font-black text-blue-900 transition hover:border-blue-300 hover:bg-blue-50"
              data-event="seo_cta_click"
              data-service="seniorenumzug"
              data-page-intent="seniorenumzug-angebot-pruefen"
              data-source="seniorenumzug_hero"
            >
              Seniorenumzug-Angebot prüfen lassen
              <FileSearch className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={discreetContactHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 transition hover:border-slate-300 hover:bg-slate-100"
              data-event="seo_cta_click"
              data-service="diskret-service"
              data-page-intent="seniorenumzug-diskret"
              data-source="seniorenumzug_hero"
            >
              Unsicheren Fall beschreiben
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white">
            <p className="text-xs font-black uppercase tracking-normal text-cyan-200">Eckdaten für die Anfrage</p>
            <div className="mt-5 grid gap-3">
              {heroFacts.map((fact, index) => (
                <div key={fact} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/10 p-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-sm font-black text-slate-950">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-slate-100">{fact}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-950">
            Hinweis: Eine Anfrage ist noch keine Buchung. Verfügbarkeit, Termin und Preis werden erst nach Prüfung der Angaben eingeordnet.
          </p>
        </div>
      </div>
    </section>
  );
}

export function SeniorMoveQuickAnswer() {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm shadow-slate-950/5">
        <p className="text-xs font-black uppercase tracking-normal text-blue-800">Kurz erklärt</p>
        <p className="mt-3 text-lg font-semibold leading-8 text-slate-900">
          Für einen Seniorenumzug helfen Angaben zu Start, Ziel, Umfang, Etage, Termin, gewünschten Zusatzleistungen und
          Ansprechpartnern. Häufig sind auch Entrümpelung, Reinigung, Wohnungsauflösung oder Übergabe-Vorbereitung
          relevant. Eine Anfrage ist noch keine Buchung.
        </p>
      </div>
    </section>
  );
}

export function SeniorMoveSituationGrid() {
  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Kundensituationen"
          title="Typische Situationen beim Umzug im Alter"
          intro="Die folgenden Situationen können einzeln oder kombiniert auftreten. Wichtig ist nicht ein perfekter Text, sondern eine klare erste Beschreibung."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {seniorMoveSituations.map((item) => (
            <SimpleCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SeniorMoveChecklist() {
  const steps = [
    "Situation kurz beschreiben",
    "Start, Ziel und Terminwunsch angeben",
    "Umfang, Etage und besondere Möbel nennen",
    "Zusatzbedarf wie Entrümpelung oder Reinigung angeben",
    "Fotos oder Angebot optional ergänzen",
    "FLOXANT ordnet Anfrage und nächste Schritte ein",
    "Rückmeldung über gewünschte Kontaktmöglichkeit",
  ];

  return (
    <section className="bg-slate-50 px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeader
          eyebrow="Ablauf"
          title="Vom unsicheren Fall zur verwertbaren Anfrage"
          intro="Der Ablauf ist bewusst ruhig gehalten: erst Eckdaten sammeln, dann klären, ob Umzug, Reduzierung, Reinigung oder Übergabe zusammen geplant werden sollten."
        />
        <div className="grid gap-3">
          {steps.map((step, index) => (
            <div key={step} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white">
                {index + 1}
              </span>
              <p className="self-center text-sm font-semibold leading-6 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SeniorMoveEffortFactorsPanel() {
  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Wovon der Aufwand abhängt"
          title="Was den Aufwand bei Seniorenumzug und Umzug im Alter verändert"
          intro="Diese Punkte helfen FLOXANT, Rückfragen gezielt zu stellen. Sie sind keine Preisliste und keine Zusage."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {seniorMoveEffortFactors.map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-4 text-sm font-bold leading-6 text-slate-700 shadow-sm shadow-slate-950/5">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RelativeRequestPanel() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm shadow-slate-950/10">
          <UsersRound className="h-8 w-8 text-cyan-200" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black tracking-normal">Angehörige können den Fall ruhig vorbereiten</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-200">
            Wenn Sie aus Distanz organisieren, reichen für den Start Ort, Frist, Umfang, Fotos und ein Kontaktweg. Private Details müssen nicht breit geteilt werden.
          </p>
        </article>
        <div className="grid gap-3 sm:grid-cols-2">
          {seniorMoveNeededItems.map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SensitiveMoveNotice() {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
          <ShieldCheck className="h-8 w-8 text-amber-800" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-black tracking-normal text-slate-950">Diskret und würdevoll anfragen</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-amber-950">
            Bei sensiblen Wohnungen, Nachlass, Krankheit im Umfeld oder belastenden Situationen reicht eine knappe, sachliche Erstbeschreibung. FLOXANT vermeidet abwertende Sprache und fragt nur nach Angaben, die für die Einordnung nötig sind.
          </p>
          <Link
            href={discreetContactHref}
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-amber-900 px-4 text-sm font-black text-white transition hover:bg-amber-800"
          >
            Diskreten Seniorenumzug beschreiben
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <Scale className="h-8 w-8 text-blue-700" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-black tracking-normal text-slate-950">Was FLOXANT nicht verspricht</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {seniorMoveBoundaryItems.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SeniorMoveCombinedServices() {
  return (
    <section className="bg-slate-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Kombi-Leistungen"
          title="Wenn Umzug, Entrümpelung, Reinigung und Übergabe zusammenhängen"
          intro="Viele Fälle werden leichter, wenn Zusatzbedarf früh sichtbar wird. Die Links führen zu differenzierten Support-Seiten statt zu neuen Duplikaten."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {combinedServices.map((item) => (
            <SimpleCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SeniorMoveOfferCheckCTA({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "px-4 py-8 sm:px-6" : "px-4 py-12 sm:px-6"}>
      <div className="mx-auto max-w-7xl rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm shadow-slate-950/5">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-blue-800">Seniorenumzug-Angebot prüfen lassen</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Wenn ein Angebot unklar wirkt, Leistungsumfang und offene Punkte prüfen lassen
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">
              Wenn ein Angebot für Seniorenumzug oder Umzug im Alter unklar wirkt, kann FLOXANT Leistungsumfang und offene
              Fragen prüfen. Wichtig sind Start, Ziel, Etage, Umfang, Termin, Zusatzleistungen wie Entrümpelung oder Reinigung
              und mögliche Zusatzkosten. Es gibt keine Ersparnisgarantie und keine Rechtsberatung.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={offerCheckHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
            >
              Seniorenumzug-Angebot prüfen lassen
              <FileSearch className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/kontakt?service=umzug&intent=umzugsangebot-pruefen&source=seo"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-5 text-sm font-black text-blue-900 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Umzugsangebot einordnen lassen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/angebot-guenstiger-pruefen" className="rounded-lg border border-blue-100 bg-white px-4 py-3 text-sm font-black text-blue-800">
              Angebot günstiger prüfen
            </Link>
            <Link href="/angebotscheck" className="rounded-lg border border-blue-100 bg-white px-4 py-3 text-sm font-black text-blue-800">
              Angebotscheck
            </Link>
            <Link href="/anbieter-vergleichen" className="rounded-lg border border-blue-100 bg-white px-4 py-3 text-sm font-black text-blue-800">
              Anbieter vergleichen
            </Link>
            <Link href="/plan-b-service" className="rounded-lg border border-blue-100 bg-white px-4 py-3 text-sm font-black text-blue-800">
              Plan-B-Service
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SeniorMoveAiAnswer() {
  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
        <p className="text-xs font-black uppercase tracking-normal text-blue-700">Die wichtigste Antwort</p>
        <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
          Was gehört in eine gute Anfrage für Seniorenumzug?
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-700">
          Eine gute Anfrage nennt Start, Ziel, Etage, Aufzug, Umfang, Termin oder Frist, Ansprechpartner und Zusatzbedarf.
          Bei Umzug im Alter sind außerdem Angehörige, Reduzierung von Möbeln, Entrümpelung, Reinigung, Wohnungsauflösung
          und Übergabe wichtig. Ein vorhandenes Angebot oder Fotos können helfen, sind aber optional. FLOXANT ordnet den
          nächsten Schritt ein, ohne Preis, Soforttermin oder Verfügbarkeit zu garantieren.
        </p>
      </div>
    </section>
  );
}

export function EnglishSeniorMoveHint() {
  return (
    <section className="bg-slate-950 px-4 py-12 text-white sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-normal text-cyan-200">
            <Languages className="h-4 w-4" aria-hidden="true" />
            English request possible
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-normal">Senior moving request in simple English</h2>
        </div>
        <div>
          <p className="text-base font-semibold leading-8 text-slate-200">
            International customers or relatives can also describe a senior moving request in simple English. FLOXANT needs
            start, destination, scope, floor, preferred date and possible additional needs such as decluttering or cleaning.
            This is a practical moving request, not legal advice, medical advice or a guaranteed availability promise.
          </p>
          <Link
            href="/kontakt?service=seniorenumzug&intent=english-senior-moving-request&source=seo"
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
          >
            Start English senior moving request
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function RelatedSeniorMoveServices() {
  const links = [
    { href: "/seniorenumzug-bayern", label: "Seniorenumzug Bayern" },
    { href: "/regensburg/seniorenumzug", label: "Seniorenumzug Regensburg" },
    { href: "/seniorenumzug-landshut", label: "Seniorenumzug Landshut" },
    { href: "/regensburg/umzug", label: "Umzug Regensburg" },
    { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
    { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
    { href: "/objektbrief", label: "Objektbrief" },
    { href: "/uebergabeakte", label: "Übergabeakte" },
  ];

  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Passende Ergänzungen"
          title="Passende Wege nach einem Seniorenumzug"
          intro="Diese Seiten helfen Ihnen, Übergabe, Reinigung und weitere Aufgaben passend zum Seniorenumzug zu klären."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SeniorMoveFAQ() {
  return (
    <section className="border-t border-slate-200 px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="FAQ" title="Häufige Fragen zu Seniorenumzug und Umzug im Alter" />
        <div className="mt-8 space-y-4">
          {seniorMoveFaqItems.map((item, index) => (
            <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
              <summary className="cursor-pointer list-none text-lg font-black text-slate-950">{item.q}</summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocalSeniorMoveSupport({ city, route }: { city: string; route: string }) {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-blue-700">Lokale Seniorenumzug-Prüfung</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Seniorenumzug {city}: lokal anfragen, aber nicht als Duplikat behandeln
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
              Diese lokale Seite soll konkrete Eckdaten für {city} klären: Start, Ziel, Etage, Umfang, Frist, Angehörige,
              Entrümpelung, Reinigung und Übergabe. Für allgemeine Fragen bleibt `/seniorenumzug-bayern` die Hub-Seite.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href={`/kontakt?service=seniorenumzug&city=${route}&intent=seniorenumzug-${route}&source=seo`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white">
              Seniorenumzug {city} anfragen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={offerCheckHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 text-sm font-black text-blue-900">
              Angebot prüfen
              <FileSearch className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/seniorenumzug-bayern" className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800">
              Hub: Seniorenumzug Bayern
            </Link>
            <Link href="/objektbrief" className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800">
              Objektbrief vorbereiten
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SeniorMovePageSections() {
  return (
    <>
      <SeniorMoveHero />
      <SeniorMoveQuickAnswer />
      <SeniorMoveSituationGrid />
      <SeniorMoveChecklist />
      <SeniorMoveEffortFactorsPanel />
      <RelativeRequestPanel />
      <SensitiveMoveNotice />
      <SeniorMoveCombinedServices />
      <SeniorMoveOfferCheckCTA />
      <SeniorMoveAiAnswer />
      <EnglishSeniorMoveHint />
      <RelatedSeniorMoveServices />
      <SeniorMoveFAQ />
    </>
  );
}
