import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileSearch,
  KeyRound,
  LifeBuoy,
  MessageCircle,
  Route,
  ShieldCheck,
  Sparkles,
  Trash2,
  Truck,
} from "lucide-react";

import { PlanBServiceForm } from "@/components/PlanBServiceForm";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/plan-b-service";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Plan-B-Service für Umzug, Reinigung & Übergabe | FLOXANT",
  description:
    "Ihr Umzug, Ihre Reinigung oder Übergabe wirkt unsicher? FLOXANT prüft nach Verfügbarkeit einen Plan B für Transport, Endreinigung, Entrümpelung, Entsorgung und Schlüsselübergabe.",
  keywords: [
    "plan b umzug",
    "umzug backup regensburg",
    "ersatz umzugsfirma regensburg",
    "reinigung plan b",
    "endreinigung kurzfristig ersatz",
    "wohnungsuebergabe plan b",
    "plan b reinigung duesseldorf",
    "entsorgung kurzfristig duesseldorf",
  ],
});

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20brauche%20einen%20Plan%20B.%20Mein%20aktueller%20Ablauf%20ist%20unsicher.%20Es%20geht%20um%20%5BUmzug%2FReinigung%2FEntr%C3%BCmpelung%2F%C3%9Cbergabe%5D%20in%20%5BOrt%5D.%20Deadline%3A%20%5BDatum%5D.%20Fotos%2FAngebot%2Foffene%20Punkte%20kann%20ich%20senden.";

const statusSteps = ["Ablauf", "Risiko", "Luecken", "Fotos", "Plan B"];

const triageOptions = [
  {
    title: "Anbieter meldet sich nicht zuverlaessig",
    text: "FLOXANT prueft, ob ein Ersatz- oder Ergaenzungsplan mit Ort, Termin und Umfang realistisch ist.",
    solution: "Kapazitaet, Strecke, Rueckruf",
  },
  {
    title: "Helfer oder Transporter sind unsicher",
    text: "Wenn Fahrzeug, Team oder Ladevolumen wackeln, zaehlen Fotos, Etage, Start/Ziel und Deadline.",
    solution: "Ersatztransport, Rueckfahrt, Fahrzeugbedarf",
  },
  {
    title: "Angebot wirkt unvollstaendig",
    text: "Unklare Etage, Zusatzkosten, Reinigung, Entsorgung oder Zugang sollten vor Zusage sichtbar werden.",
    solution: "Angebotscheck, Red-Flag-Scanner",
  },
  {
    title: "Reinigung wurde vergessen",
    text: "Endreinigung, Auszugsreinigung oder Reinigung vor Uebergabe koennen als Backup geprueft werden.",
    solution: "Reinigungs-Backup, Fotos, Budget",
  },
  {
    title: "Keller, Sperrmuell oder Entsorgung offen",
    text: "Raeumung, Entsorgung und Reinigung koennen als Luecke im Ablauf eingeordnet werden.",
    solution: "Raeumungs-Backup, Entsorgung",
  },
  {
    title: "Schluessel oder Uebergabe unklar",
    text: "Wenn Uebergabe, Schluesselstatus oder Dokumentation fehlen, kann FLOXANT passende Bausteine pruefen.",
    solution: "Uebergabeakte, Schluessel, Reinigung",
  },
  {
    title: "Aktueller Preisrahmen wirkt unrealistisch",
    text: "Ein Plan B kann helfen, Umfang, Budget und Grenzen ehrlich zu sortieren.",
    solution: "Budgetpruefung, zweite Einschaetzung",
  },
  {
    title: "Duesseldorf braucht Backup",
    text: "In Duesseldorf nur fuer Reinigung, Entsorgung, moeblierte Wohnung oder B2B-Reinigung, nicht fuer Umzug.",
    solution: "Duesseldorf Reinigung/Entsorgung",
  },
];

const riskLevels = [
  ["Beobachten", "Termin ist noch nicht akut, aber Angebot oder Ablauf wirken unklar.", "Zweite Einschaetzung starten"],
  ["Absichern", "Termin rueckt naeher, Anbieter ist unsicher oder eine Leistung fehlt.", "Ablauf absichern"],
  ["Plan B noetig", "Deadline ist nah, mehrere offene Punkte blockieren Uebergabe oder Auszug.", "Plan B dringend pruefen"],
];

const packages = [
  {
    title: "Ersatztransport pruefen",
    forText: "Umzug oder Transport wirkt unsicher.",
    includes: ["Strecke", "Umfang", "Fotos", "Fahrzeugbedarf", "Terminpruefung"],
    cta: "Ersatztransport pruefen",
    Icon: Truck,
  },
  {
    title: "Reinigungs-Backup",
    forText: "Endreinigung, Auszugsreinigung oder Uebergabe ist offen.",
    includes: ["Reinigungsart", "Termin", "Fotos", "Budgetpruefung"],
    cta: "Reinigungs-Backup anfragen",
    Icon: Sparkles,
  },
  {
    title: "Raeumungs-Backup",
    forText: "Keller, Garage, Sperrmuell oder Moebel sind noch offen.",
    includes: ["Entruempelung", "Entsorgung", "Fotos", "Zugang"],
    cta: "Raeumung pruefen lassen",
    Icon: Trash2,
  },
  {
    title: "Uebergabe-Backup",
    forText: "Schluessel, Uebergabetermin, Reinigung oder Dokumentation sind unklar.",
    includes: ["Schluessel nach Absprache", "Uebergabeakte", "Reinigung", "offene Hinweise"],
    cta: "Uebergabe absichern",
    Icon: KeyRound,
  },
  {
    title: "Komplett-Plan-B",
    forText: "Mehrere Dinge sind gleichzeitig unsicher.",
    includes: ["Transport", "Reinigung", "Entruempelung/Entsorgung", "Uebergabeakte", "Rueckruf"],
    cta: "Kompletten Plan B pruefen",
    Icon: LifeBuoy,
  },
  {
    title: "Duesseldorf Plan B",
    forText: "Nur Reinigung, Entsorgung, moeblierte Wohnung oder B2B-Reinigung.",
    includes: ["Reinigung", "Entsorgung", "Apartment-Reinigung", "B2B nach Absprache"],
    cta: "Duesseldorf Reinigung/Entsorgung pruefen",
    Icon: Route,
  },
];

const boundaries = [
  "keine Notdienstgarantie",
  "keine Soforteinsatzgarantie",
  "keine Konkurrenzdiffamierung",
  "keine Garantie, dass FLOXANT uebernehmen kann",
  "keine Preis-, Abnahme- oder Kautionsgarantie",
  "keine Rechtsberatung und keine Aufforderung, bestehende Vertraege zu brechen",
];

const faqItems = [
  {
    q: "Was ist der FLOXANT Plan-B-Service?",
    a: "Der Plan-B-Service ist eine Backup- und Absicherungspruefung. FLOXANT klaert nach Verfuegbarkeit, ob fuer Umzug, Reinigung, Entruempelung, Entsorgung oder Uebergabe ein Ersatz- oder Ergaenzungsplan moeglich ist.",
  },
  {
    q: "Ist FLOXANT ein Notdienst?",
    a: "Nein. FLOXANT tritt nicht als garantierter Notdienst auf. Machbarkeit haengt von Ort, Termin, Umfang, Fotos und Kapazitaet ab.",
  },
  {
    q: "Was ist der Unterschied zu Schadensbegrenzung?",
    a: "Schadensbegrenzung greift, wenn der Plan bereits gekippt ist. Der Plan-B-Service ist fuer Kunden gedacht, die den Ablauf bewusst absichern wollen, bevor alles kippt.",
  },
  {
    q: "Kann FLOXANT einspringen, wenn mein Anbieter ausfaellt?",
    a: "FLOXANT kann nach Verfuegbarkeit pruefen, ob ein Ersatz- oder Ergaenzungsplan moeglich ist. Eine Uebernahme wird nicht garantiert.",
  },
  {
    q: "Kann ich ein vorhandenes Angebot senden?",
    a: "Ja. Ein Angebot oder Screenshot kann helfen, Umfang, Luecken, Preisrahmen und offene Punkte organisatorisch einzuordnen.",
  },
  {
    q: "Funktioniert Plan B auch in Duesseldorf?",
    a: "Ja, aber nur fuer Reinigung, Entsorgung, moeblierte Wohnung oder B2B-Reinigung. FLOXANT positioniert in Duesseldorf keinen Umzugsservice.",
  },
  {
    q: "Welche Angaben braucht FLOXANT?",
    a: "Wichtig sind Ort/PLZ, Deadline, unsicherer Bereich, Fotos, vorhandenes Angebot, Umfang, Zugang, Budget und eine Telefonnummer oder E-Mail.",
  },
  {
    q: "Gibt es eine Garantie?",
    a: "Nein. Der Plan-B-Service ist eine Machbarkeitspruefung nach Verfuegbarkeit und ersetzt keine Rechtsberatung, keine Anbieterbewertung und keine Abnahmegarantie.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "FLOXANT Plan-B-Service",
      description:
        "Backup- und Absicherungsservice fuer unsichere Ablaeufe bei Umzug, Reinigung, Entruempelung, Entsorgung und Uebergabe nach Verfuegbarkeit.",
      path,
      about: ["Plan B", "Backup-Service", "Umzug Regensburg", "Reinigung", "Uebergabe", "Schadensbegrenzung"],
      potentialActions: [
        { name: "Plan B pruefen lassen", target: `${path}#plan-b-form` },
        { name: "Plan B per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Plan-B-Service",
      description:
        "Machbarkeitspruefung fuer Ersatz- oder Ergaenzungsplan bei unsicherem Umzug, Reinigung, Entruempelung, Entsorgung oder Uebergabe. Keine Notdienstgarantie.",
      path,
      serviceType: "Plan-B-Service fuer Umzug, Reinigung, Entruempelung, Entsorgung und Uebergabe",
      areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern nach Verfuegbarkeit", "Duesseldorf Reinigung und Entsorgung"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Plan-B-Service", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function PlanBServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe_0,transparent_34rem),linear-gradient(180deg,#eef6ff_0%,#ffffff_44%,#f8fafc_100%)] text-slate-950">
        <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm">
                <ShieldCheck className="h-4 w-4" />
                FLOXANT Backup-Control
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                FLOXANT Plan-B-Service fuer Umzug, Reinigung und Uebergabe
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Wenn Ihr aktueller Ablauf unsicher ist, prueft FLOXANT, ob ein Ersatz-, Ergaenzungs- oder Absicherungsplan moeglich ist - mit Ort, Termin, Fotos und offenen Punkten.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#plan-b-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-700" data-event="service_card_click">
                  Plan B pruefen lassen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-black text-white transition hover:bg-emerald-700" data-event="whatsapp_click">
                  <MessageCircle className="h-4 w-4" />
                  Plan B per WhatsApp senden
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Regensburg als Kernmarkt</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Backup vor dem Kippen</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Düsseldorf nur Reinigung/Entsorgung</span>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-blue-700">Pruefung nach Verfuegbarkeit</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-blue-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-blue-100 bg-white p-5 shadow-2xl shadow-blue-950/10">
                <div className="grid grid-cols-5 gap-2">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-3 text-center">
                      <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">{index + 1}</span>
                      <span className="mt-2 block text-[11px] font-black text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[1.5rem] bg-slate-950 p-5 text-white">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">Wenn Plan A wackelt</div>
                  <h2 className="mt-2 text-2xl font-black tracking-tight">Kein Alarmismus. Ein zweiter pruefbarer Ablauf.</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Der Plan-B-Service sortiert Risiko, Luecken, Fotos, Termin und Kapazitaet, bevor aus Unsicherheit ein akuter Schaden wird.
                  </p>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {["Angebot und Fotos senden", "Luecken im Ablauf markieren", "Risiko-Level einschaetzen", "Backup nach Verfuegbarkeit pruefen"].map((item) => (
                    <div key={item} className="rounded-[1rem] border border-blue-100 bg-blue-50 p-4 text-sm font-bold leading-6 text-blue-950">
                      <CheckCircle2 className="mb-2 h-5 w-5 text-blue-700" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Plan-B-Triage</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Warum brauchen Sie einen Plan B?</h2>
              <p className="mt-3 text-base leading-8 text-slate-700">
                Der Plan-B-Service richtet sich an Kunden, deren Ablauf noch nicht komplett gekippt ist, aber unsicher genug wirkt, dass eine zweite Absicherung sinnvoll wird.
              </p>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {triageOptions.map((item) => (
                <article key={item.title} className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <FileSearch className="h-5 w-5 text-blue-700" />
                  <h3 className="mt-4 text-lg font-black tracking-tight text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                  <div className="mt-4 rounded-full bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">{item.solution}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="rounded-[2rem] bg-slate-950 p-7 text-white">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">Risiko-Level</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Wie kritisch ist die Lage?</h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                Das Risiko-Level ist eine organisatorische Einschaetzung, keine Garantie. Es hilft, Rueckfragen und Prioritaeten schneller zu sortieren.
              </p>
              <Link href="#plan-b-form" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-slate-950" data-event="service_card_click">
                Risiko einschaetzen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {riskLevels.map(([title, text, cta]) => (
                <div key={title} className="rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <Clock3 className="h-5 w-5 text-blue-700" />
                  <h3 className="mt-4 text-xl font-black tracking-tight text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
                  <div className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-blue-700">{cta}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Plan-B-Pakete</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Welche Luecke soll der Backup-Plan schliessen?</h2>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {packages.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                    <Icon className="h-7 w-7 text-blue-700" />
                    <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.forText}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.includes.map((include) => (
                        <span key={include} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">{include}</span>
                      ))}
                    </div>
                    <Link href="#plan-b-form" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700" data-event="service_card_click">
                      {item.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Plan-B-Anfrage</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Ort, Termin, Angebot, Fotos und offene Punkte senden</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                FLOXANT prueft zuerst, ob ein Backup realistisch ist. Wenn nicht genug Angaben vorliegen, melden wir uns mit Rueckfragen. In Duesseldorf geht es nur um Reinigung und Entsorgung.
              </p>
              <div className="mt-5 grid gap-3">
                <Link href="/schadensbegrenzung" className="rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm font-bold leading-7 text-slate-700 transition hover:border-blue-200 hover:bg-blue-50">
                  Plan schon gekippt? Zur Schadensbegrenzung wechseln.
                </Link>
                <Link href="/angebotscheck#red-flag-scanner" className="rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm font-bold leading-7 text-slate-700 transition hover:border-blue-200 hover:bg-blue-50">
                  Angebot unklar? Red-Flag-Scanner nutzen.
                </Link>
                <Link href="/plattform-auftrag-pruefen" className="rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm font-bold leading-7 text-slate-700 transition hover:border-blue-200 hover:bg-blue-50">
                  Plattform-Auftrag oder vorhandenes Angebot neutral pruefen.
                </Link>
                <Link href="/uebergabeakte" className="rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm font-bold leading-7 text-slate-700 transition hover:border-blue-200 hover:bg-blue-50">
                  Uebergabe offen? Uebergabeakte ergaenzen.
                </Link>
              </div>
            </div>
            <PlanBServiceForm />
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Abgrenzung</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Plan B ist nicht Schadensbegrenzung</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Schadensbegrenzung ist fuer den Moment, in dem etwas bereits gekippt ist. Der Plan-B-Service ist der kontrollierte zweite Pfad, wenn Plan A wackelt und Sie vorab absichern wollen.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/schadensbegrenzung" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800">
                  Schadensbegrenzung ansehen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/makler-vermieter-link" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800">
                  Objektfall senden
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="rounded-[2rem] bg-slate-950 p-7 text-white">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">Grenzen</div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {boundaries.map((item) => (
                  <div key={item} className="flex gap-3 rounded-[1.2rem] border border-white/10 bg-white/5 p-4 text-sm font-bold leading-6 text-slate-200">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-200" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">FAQ</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Haeufige Fragen zum FLOXANT Plan-B-Service</h2>
            <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              {faqItems.map((item) => (
                <details key={item.q} className="group p-5">
                  <summary className="cursor-pointer list-none text-base font-black text-slate-950">{item.q}</summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#plan-b-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-700" data-event="service_card_click">
                Plan B pruefen lassen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
                Plan B per WhatsApp senden
              </a>
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 pt-6 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["/umzug-regensburg", "Backup fuer Umzug oder Transport"],
              ["/reinigung-regensburg", "Reinigungs-Backup Regensburg"],
              ["/entruempelung-regensburg", "Raeumung/Entsorgung pruefen"],
              ["/rueckfahrt-boerse", "Rueckfahrt als Alternative"],
              ["/uebergabeakte", "Plan B vor Uebergabe"],
              ["/diskreter-umzug-trennung-scheidung", "Diskreten Auszug absichern"],
              ["/wohnung-wieder-vermietbar", "Objekt wieder nutzbar machen"],
              ["/duesseldorf/reinigung", "Reinigung Duesseldorf"],
              ["/entsorgung-duesseldorf", "Entsorgung Duesseldorf"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:bg-blue-50">
                {label}
              </Link>
            ))}
          </div>
        </section>

        <div className="flox-mobile-action-wrap z-40 md:hidden">
          <div className="flox-mobile-action-shell">
            <div className="flox-mobile-action-grid">
          <Link href="#plan-b-form" className="flox-mobile-action flox-mobile-action-primary" data-event="service_card_click">
            Plan B pruefen
          </Link>
          <a href={whatsappHref} className="flox-mobile-action flox-mobile-action-whatsapp" data-event="whatsapp_click">
            WhatsApp
          </a>
          <a href="tel:+4915771105087" className="flox-mobile-action flox-mobile-action-light" data-event="phone_click">
            Anrufen
          </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
