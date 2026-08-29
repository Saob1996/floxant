import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, Info, ShieldCheck, XCircle } from "lucide-react";

import { RoundThreeRequestForm } from "@/components/round3/RoundThreeRequestForm";
import { company } from "@/lib/company";
import {
  getRoundThreeService,
  type RoundThreeLocale,
  type RoundThreeServiceKey,
} from "@/lib/round3/service-matrix";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from "@/lib/structured-data";

type Props = { serviceKey: RoundThreeServiceKey; locale: RoundThreeLocale };

type PageCopy = {
  eyebrow: string;
  lead: string;
  promise: string;
  processTitle: string;
  process: readonly { title: string; text: string }[];
  faq: readonly { q: string; a: string }[];
  sources: readonly { name: string; href: string; note: string }[];
  caution?: string;
};

const pageCopy: Record<RoundThreeServiceKey, Record<RoundThreeLocale, PageCopy>> = {
  europeMove: {
    de: {
      eyebrow: "Startland Deutschland · Ziel Europa",
      lead: "Eine belastbare Anfrage trennt Strecke, Umfang, Zugang und mögliche Grenzanforderungen. FLOXANT prüft genau diese Punkte, bevor ein Termin oder Angebot verbindlich werden kann.",
      promise: "Kein Start außerhalb Deutschlands. Keine automatische Zoll- oder Steuerzusage. Konkrete grenzüberschreitende Angebote werden erst nach Prüfung der Route und steuerlichen Behandlung erstellt.",
      processTitle: "Was sich je nach Route ändert",
      process: [
        { title: "EU", text: "Ziel innerhalb der EU. Route, Leistung, Umsatzsteuerbehandlung und mögliche Transitbesonderheiten werden geprüft." },
        { title: "Nicht-EU", text: "Schweiz, Vereinigtes Königreich und Norwegen benötigen eine eigene Prüfung der offiziellen Einfuhr- und Umzugsgut-Vorgaben." },
        { title: "Transit-Prüfung", text: "Bei weiteren europäischen Zielen können Grenzübertritte oder Transitländer zusätzliche Anforderungen auslösen. Erst nach Prüfung folgt eine belastbare Aussage." },
      ],
      faq: [
        { q: "Kann FLOXANT einen Umzug außerhalb Deutschlands starten?", a: "Nein. Dieser Anfrageweg gilt ausschließlich für Umzüge mit Startland Deutschland." },
        { q: "Ist ein EU-Umzug automatisch ohne Formalitäten möglich?", a: "Nein. Auch bei einem Ziel in der EU werden Route, Transportumfang, Steuerbehandlung und mögliche Transitbesonderheiten vor dem Angebot geprüft." },
        { q: "Übernimmt FLOXANT automatisch die Zollabwicklung?", a: "Nein. FLOXANT erteilt keine Zollberatung. Benötigte Unterlagen, Zuständigkeiten und ein möglicher externer Zollprozess werden anhand offizieller Vorgaben geklärt." },
        { q: "Welche Angaben sind für die erste Prüfung wichtig?", a: "Startort in Deutschland, Zielland und Zielort, Zeitraum, Haushaltsgröße oder Volumen sowie Etagen, Aufzüge, Zufahrt und gewünschte Zusatzleistungen." },
      ],
      sources: [
        { name: "EU-Kommission: Zolltransit", href: "https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-transit_en", note: "Offizielle Übersicht zu Transitverfahren." },
        { name: "Deutscher Zoll: Übersiedlungsgut", href: "https://www.zoll.de/DE/Fachthemen/Zoelle/Zollbefreiungen/Aussertarifliche-Zollbefreiung/Uebersiedlungsgut/uebersiedlungsgut_node.html", note: "Offizielle deutsche Zollinformation." },
        { name: "Schweiz: BAZG", href: "https://www.bazg.admin.ch/de/vorgehen-umzug-in-die-schweiz", note: "Vorgehen beim Umzug in die Schweiz." },
        { name: "Vereinigtes Königreich: HMRC", href: "https://www.gov.uk/guidance/transfer-of-residence-to-great-britain", note: "Transfer-of-Residence-Leitfaden." },
        { name: "Norwegen: Tolletaten", href: "https://www.toll.no/en/moving-to-or-out-of-norway/moving-goods", note: "Einfuhr von Hausrat bei einem Umzug." },
      ],
    },
    en: {
      eyebrow: "Origin Germany · destination Europe",
      lead: "A useful enquiry separates route, scope, access and possible border requirements. FLOXANT checks these points before a date or quote can become binding.",
      promise: "No origin outside Germany. No automatic customs or tax promise. A specific cross-border quote is prepared only after route and tax-treatment checks.",
      processTitle: "What changes by route",
      process: [
        { title: "EU", text: "For an EU destination, route, service scope, VAT treatment and any transit specifics are reviewed." },
        { title: "Non-EU", text: "Switzerland, the United Kingdom and Norway require separate checks against official rules for personal goods." },
        { title: "Transit review", text: "Other European destinations may involve borders or transit countries. A reliable answer follows only after review." },
      ],
      faq: [
        { q: "Can FLOXANT start a move outside Germany?", a: "No. This request path is exclusively for moves with Germany as the origin country." },
        { q: "Is an EU move automatically free of formalities?", a: "No. Route, transport scope, tax treatment and possible transit details are reviewed before a quote." },
        { q: "Does FLOXANT automatically handle customs?", a: "No. FLOXANT does not provide customs advice. Necessary documents, responsibilities and any external customs process are clarified against official guidance." },
        { q: "What is needed for the initial review?", a: "Origin in Germany, destination country and city, date window, household size or volume, floors, lifts, access and requested add-ons." },
      ],
      sources: [
        { name: "European Commission: customs transit", href: "https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-transit_en", note: "Official overview of transit procedures." },
        { name: "German Customs: household effects", href: "https://www.zoll.de/DE/Fachthemen/Zoelle/Zollbefreiungen/Aussertarifliche-Zollbefreiung/Uebersiedlungsgut/uebersiedlungsgut_node.html", note: "Official German customs information." },
        { name: "Switzerland: BAZG", href: "https://www.bazg.admin.ch/de/vorgehen-umzug-in-die-schweiz", note: "Official moving-to-Switzerland guidance." },
        { name: "United Kingdom: HMRC", href: "https://www.gov.uk/guidance/transfer-of-residence-to-great-britain", note: "Transfer of Residence guidance." },
        { name: "Norway: Tolletaten", href: "https://www.toll.no/en/moving-to-or-out-of-norway/moving-goods", note: "Importing household goods when moving." },
      ],
    },
  },
  budgetMove: {
    de: {
      eyebrow: "Bruttobudget · keine automatische Annahme",
      lead: "Nennen Sie offen, welcher Gesamtbetrag für den privaten Umzug realistisch ist. FLOXANT gleicht die Bruttopreisvorstellung inklusive 19 % MwSt. mit Route, Volumen und den unverzichtbaren Leistungen ab.",
      promise: "Das Budget ist eine Preisvorstellung, kein erteilter Auftrag. FLOXANT kann den Umfang bestätigen, eine kleinere Variante vorschlagen oder nachvollziehbar absagen.",
      processTitle: "Drei mögliche Ergebnisse",
      process: [
        { title: "Budget machbar", text: "Die genannten Eckdaten lassen eine weitere Kalkulation innerhalb der Preisvorstellung sinnvoll erscheinen." },
        { title: "Reduzierter Umfang", text: "FLOXANT schlägt transparent vor, welche Eigenleistung, Terminflexibilität oder Zusatzleistung den Umfang passend machen könnte." },
        { title: "Nicht machbar", text: "Wenn Mindestaufwand, Route oder Zugang nicht zusammenpassen, erhalten Sie eine klare Absage statt einer irreführenden Lockzusage." },
      ],
      faq: [
        { q: "Ist meine Preisvorstellung bereits ein Angebot?", a: "Nein. Sie ist die Grundlage für eine Machbarkeits- und Kalkulationsprüfung. Ein Auftrag entsteht erst nach einem bestätigten Angebot." },
        { q: "Muss das Budget die Mehrwertsteuer enthalten?", a: "Ja. Für private Inlandsumzüge wird hier ausschließlich eine Bruttopreisvorstellung inklusive 19 % MwSt. abgefragt." },
        { q: "Kann FLOXANT einen kleineren Umfang vorschlagen?", a: "Ja. Unverzichtbare und flexible Leistungen werden getrennt erfasst, damit ein nachvollziehbarer Gegenvorschlag möglich ist." },
        { q: "Wird jedes Budget akzeptiert?", a: "Nein. Route, Volumen, Zugang, Personal, Termin und gewünschte Zusatzleistungen bestimmen, ob eine Ausführung wirtschaftlich und praktisch möglich ist." },
      ],
      sources: [],
    },
    en: {
      eyebrow: "Gross budget · no automatic acceptance",
      lead: "State the total amount that is realistic for your private move. FLOXANT compares the gross budget including 19% VAT with the route, volume and essential services.",
      promise: "The budget is a stated expectation, not an order. FLOXANT may confirm a workable scope, suggest a smaller scope or decline with a clear reason.",
      processTitle: "Three possible outcomes",
      process: [
        { title: "Budget appears feasible", text: "The details make further calculation within the stated budget reasonable." },
        { title: "Reduced scope", text: "FLOXANT can show how self-service, flexible timing or fewer add-ons might make the move feasible." },
        { title: "Not feasible", text: "If minimum effort, route or access do not fit, you receive a clear response instead of a misleading low-price promise." },
      ],
      faq: [
        { q: "Is my stated budget already a quote?", a: "No. It is the basis for a feasibility and calculation review. An order exists only after a quote is confirmed." },
        { q: "Must the budget include VAT?", a: "Yes. For private domestic moves, this form asks only for a gross budget including 19% VAT." },
        { q: "Can FLOXANT suggest a smaller scope?", a: "Yes. Essential and flexible services are captured separately so that a transparent alternative can be proposed." },
        { q: "Is every budget accepted?", a: "No. Route, volume, access, crew, date and requested add-ons determine whether delivery is practical and economically viable." },
      ],
      sources: [],
    },
  },
  difficultSituation: {
    de: {
      eyebrow: "Diskret · praktisch · ohne Diagnose",
      lead: "Wenn Umzug, Räumung, Transport oder Reinigung gerade zusätzlich belastet, genügt eine sachliche Beschreibung der Aufgabe. FLOXANT benötigt weder Diagnose noch Todesursache oder intime Vorgeschichte.",
      promise: "FLOXANT ist kein medizinischer, psychologischer oder rechtlicher Krisendienst. Bei akuter Gefahr wenden Sie sich bitte an 112 oder die zuständigen Hilfsstellen.",
      processTitle: "Worauf die Prüfung konzentriert ist",
      process: [
        { title: "Praktische Aufgabe", text: "Was soll transportiert, geräumt, gereinigt oder für eine Übergabe vorbereitet werden?" },
        { title: "Zugang und Zeit", text: "Ort, Schlüssel, Etagen, Zufahrt und ein wichtiger Termin sind hilfreicher als private Hintergründe." },
        { title: "Klare nächste Entscheidung", text: "FLOXANT meldet zurück, ob Angaben fehlen, eine Besichtigung sinnvoll ist oder ein konkretes Angebot vorbereitet werden kann." },
      ],
      faq: [
        { q: "Muss ich eine Diagnose oder Todesursache nennen?", a: "Nein. Bitte nennen Sie nur die praktische Aufgabe, den Ort, den Zugang und das Zeitfenster. Unnötige Gesundheits- oder besonders private Daten sollen nicht übermittelt werden." },
        { q: "Ist dies eine Krisen- oder Beratungsstelle?", a: "Nein. FLOXANT prüft praktische Dienstleistungen wie Umzug, Transport, Räumung oder Reinigung und ersetzt keine medizinische, psychologische oder rechtliche Hilfe." },
        { q: "Kann eine andere Person die Anfrage stellen?", a: "Ja, beispielsweise Angehörige oder Bevollmächtigte. Die notwendige Berechtigung und der Ansprechpartner werden vor der Ausführung geklärt." },
        { q: "Wird sofort ein Termin zugesagt?", a: "Nein. FLOXANT prüft Kapazität, Umfang, Zugang und Termin persönlich. Die Eingangsbestätigung ist keine Termin- oder Auftragsbestätigung." },
      ],
      sources: [],
    },
    en: {
      eyebrow: "Discreet · practical · no diagnosis",
      lead: "When moving, clearance, transport or cleaning adds to an already difficult situation, a factual task description is enough. FLOXANT does not need a diagnosis, cause of death or intimate background story.",
      promise: "FLOXANT is not a medical, psychological or legal crisis service. In an immediate emergency, contact 112 or the appropriate local support service.",
      processTitle: "What the review focuses on",
      process: [
        { title: "Practical task", text: "What needs to be moved, cleared, cleaned or prepared for handover?" },
        { title: "Access and timing", text: "Location, keys, floors, vehicle access and an important date are more useful than private background details." },
        { title: "Clear next decision", text: "FLOXANT explains whether details are missing, a viewing is useful or a specific quote can be prepared." },
      ],
      faq: [
        { q: "Do I need to provide a diagnosis or cause of death?", a: "No. Provide only the practical task, location, access and time window. Unnecessary health or highly private data should not be sent." },
        { q: "Is this a crisis or counselling service?", a: "No. FLOXANT reviews practical services such as moving, transport, clearance or cleaning and does not replace medical, psychological or legal support." },
        { q: "Can another person submit the request?", a: "Yes, for example a relative or authorised representative. Necessary authority and the responsible contact are clarified before work starts." },
        { q: "Is a date confirmed immediately?", a: "No. FLOXANT personally reviews capacity, scope, access and timing. Receipt of the enquiry is not a date or order confirmation." },
      ],
      sources: [],
    },
  },
  costCoverage: {
    de: {
      eyebrow: "Kostenvoranschlag · Antrag · Freigabe · Auftrag",
      lead: "Ein Kostenvoranschlag ist noch keine Kostenübernahme. FLOXANT erfasst Leistung, möglichen Kostenträger und Antragsstand getrennt, damit erst nach schriftlicher Klärung ein Auftrag entstehen kann.",
      promise: "Keine Genehmigungs-, Erstattungs- oder Zahlungszusage. FLOXANT stellt keinen Antrag im Namen des Kunden und erteilt keine Sozial-, Pflege-, Steuer- oder Rechtsberatung.",
      processTitle: "Was bei den Stellen grundsätzlich zu beachten ist",
      process: [
        { title: "Jobcenter / Agentur für Arbeit", text: "Eine vorherige schriftliche Klärung ist entscheidend. Die Bundesagentur weist beim Vermittlungsbudget darauf hin, dass vor Entstehung der Kosten beantragt werden soll und kein Rechtsanspruch besteht." },
        { title: "Krankenkasse / Sozialamt", text: "Mögliche Leistungen hängen von gesetzlichen Voraussetzungen und dem Einzelfall ab. Die zuständige Stelle entscheidet, nicht FLOXANT." },
        { title: "Pflegekasse / Arbeitgeber", text: "Beim Entlastungsbetrag gelten gesetzliche Anbieteranforderungen. Für FLOXANT liegt keine bestätigte Anerkennung vor. Ein Arbeitgeber kann freiwillig erstatten; eine Pflicht wird nicht behauptet." },
      ],
      faq: [
        { q: "Garantiert FLOXANT eine Kostenübernahme?", a: "Nein. Nur der zuständige Kostenträger kann nach eigener Prüfung schriftlich entscheiden. Ein Kostenvoranschlag ist keine Genehmigung." },
        { q: "Soll ich den Auftrag vor der Entscheidung erteilen?", a: "Grundsätzlich sollte vor Auftrag und Kostenentstehung geklärt sein, welche schriftliche Zusage und welche Unterlagen die zuständige Stelle verlangt." },
        { q: "Kann FLOXANT über den Entlastungsbetrag der Pflegekasse abrechnen?", a: "FLOXANT bewirbt das derzeit nicht. Ein nach Landesrecht bestätigter Anbieterstatus ist für FLOXANT nicht dokumentiert; deshalb wird keine Abrechnung oder Erstattung zugesagt." },
        { q: "Welche Unterlagen darf ich senden?", a: "Senden Sie nur sachliche Vorgaben, Aktenzeichen oder schriftliche Entscheidungen, die für den Kostenvoranschlag nötig sind. Diagnosen und unnötige sensible Dokumente sollen nicht hochgeladen werden." },
        { q: "Muss ein Arbeitgeber Umzugskosten zahlen?", a: "Eine Zahlungspflicht wird nicht behauptet. Bei beruflichem Anlass kann eine freiwillige Erstattung möglich sein; Bedingungen und Nachweise müssen mit Arbeitgeber und gegebenenfalls Steuerberatung geklärt werden." },
      ],
      sources: [
        { name: "§ 22 SGB II", href: "https://www.gesetze-im-internet.de/sgb_2/__22.html", note: "Gesetzliche Grundlage zu Bedarfen für Unterkunft und Heizung einschließlich möglicher Umzugskosten." },
        { name: "Bundesagentur: Vermittlungsbudget", href: "https://www.arbeitsagentur.de/vermittlungsbudget", note: "Offizielle Hinweise zu Antrag, Nachweisen und fehlendem Rechtsanspruch." },
        { name: "§ 38 SGB V", href: "https://www.gesetze-im-internet.de/sgb_5/__38.html", note: "Gesetzliche Grundlage zur Haushaltshilfe." },
        { name: "§ 24h SGB V", href: "https://www.gesetze-im-internet.de/sgb_5/__24h.html", note: "Haushaltshilfe im Zusammenhang mit Schwangerschaft und Entbindung." },
        { name: "§ 35a und § 70 SGB XII", href: "https://www.gesetze-im-internet.de/sgb_12/__70.html", note: "Gesetzliche Regelungen zu Unterkunft/Umzug und Hilfe zur Weiterführung des Haushalts." },
        { name: "§ 45b SGB XI", href: "https://www.gesetze-im-internet.de/sgb_11/__45b.html", note: "Entlastungsbetrag und Anforderungen an erstattungsfähige Angebote." },
        { name: "BMF Lohnsteuer-Hinweise 2026", href: "https://lsth.bundesfinanzministerium.de/lsth/2026/A-Einkommensteuergesetz/II-Einkommen-2-24b/4-Ueberschuss-d-Einnahmen-ueber-die-Werbungsk-8-9a/Paragraf-9/r-9-9.html", note: "Offizielle steuerliche Hinweise zur möglichen Arbeitgebererstattung." },
      ],
      caution: "Stand 29.08.2026. Gesetze, Verwaltungsabläufe und der individuelle Status können sich ändern. Maßgeblich ist die schriftliche Auskunft der zuständigen Stelle.",
    },
    en: {
      eyebrow: "Cost estimate · application · approval · order",
      lead: "A cost estimate is not cost coverage. FLOXANT records the service, possible payer and application status separately, so an order can follow only after written clarification.",
      promise: "No approval, reimbursement or payment promise. FLOXANT does not submit applications on a customer's behalf and does not provide social-security, care, tax or legal advice.",
      processTitle: "General points for prospective payers",
      process: [
        { title: "Jobcenter / Employment Agency", text: "Prior written clarification matters. The Federal Employment Agency states that an application should be made before costs arise and that there is no legal entitlement under the placement budget." },
        { title: "Health insurer / Social welfare office", text: "Possible benefits depend on statutory conditions and the individual case. The responsible body decides, not FLOXANT." },
        { title: "Long-term care fund / Employer", text: "Statutory provider requirements apply to the relief amount. FLOXANT has no documented recognition. An employer may reimburse voluntarily; no duty to pay is claimed." },
      ],
      faq: [
        { q: "Does FLOXANT guarantee cost coverage?", a: "No. Only the responsible payer can decide in writing after its own review. A cost estimate is not approval." },
        { q: "Should I place the order before the decision?", a: "As a rule, clarify the written approval and document requirements before commissioning work or incurring costs." },
        { q: "Can FLOXANT bill the long-term care relief amount?", a: "FLOXANT does not advertise this. Recognition under state law is not documented for FLOXANT, so billing or reimbursement is not promised." },
        { q: "Which documents should I send?", a: "Send only factual requirements, a reference number or written decisions needed for the estimate. Do not upload diagnoses or unnecessary sensitive documents." },
        { q: "Must an employer pay moving costs?", a: "No payment obligation is claimed. Voluntary reimbursement may be possible for a work-related move; confirm conditions and evidence with the employer and, where needed, a tax adviser." },
      ],
      sources: [
        { name: "Section 22 SGB II", href: "https://www.gesetze-im-internet.de/sgb_2/__22.html", note: "Official German statutory text on housing needs and possible moving costs." },
        { name: "Federal Employment Agency: placement budget", href: "https://www.arbeitsagentur.de/vermittlungsbudget", note: "Official guidance on applying, evidence and the absence of an automatic entitlement." },
        { name: "Sections 38 and 24h SGB V", href: "https://www.gesetze-im-internet.de/sgb_5/__38.html", note: "Official statutory basis for household help in defined circumstances." },
        { name: "Sections 35a and 70 SGB XII", href: "https://www.gesetze-im-internet.de/sgb_12/__70.html", note: "Official provisions concerning housing/moving and continuation of the household." },
        { name: "Section 45b SGB XI", href: "https://www.gesetze-im-internet.de/sgb_11/__45b.html", note: "Relief amount and provider requirements." },
        { name: "Federal Ministry of Finance 2026", href: "https://lsth.bundesfinanzministerium.de/lsth/2026/A-Einkommensteuergesetz/II-Einkommen-2-24b/4-Ueberschuss-d-Einnahmen-ueber-die-Werbungsk-8-9a/Paragraf-9/r-9-9.html", note: "Official tax guidance on possible employer reimbursement." },
      ],
      caution: "Reviewed 29 August 2026. Laws, administrative procedures and individual status can change. The responsible body's written information is decisive.",
    },
  },
};

export function RoundThreeServicePage({ serviceKey, locale }: Props) {
  const service = getRoundThreeService(serviceKey);
  const copy = pageCopy[serviceKey][locale];
  const meta = service.metadata[locale];
  const path = service.path[locale];
  const isDe = locale === "de";
  const schemaGraph = [
    buildServiceJsonLd({
      name: service.name[locale],
      description: meta.metaDescription,
      path,
      serviceType: service.name[locale],
      areaServed: serviceKey === "europeMove" ? ["Germany", "Europe"] : ["Regensburg", "Germany"],
      availableLanguage: [locale],
    }),
    buildBreadcrumbJsonLd([
      { name: isDe ? "Startseite" : "Home", item: isDe ? "/" : "/en" },
      { name: isDe ? "Leistungen" : "Services", item: isDe ? "/leistungen" : "/en/services" },
      { name: service.name[locale], item: path },
    ]),
    buildFaqJsonLd(copy.faq),
  ];

  return (
    <main className="bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph }).replace(/</g, "\\u003c") }} />
      <section className="bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">{copy.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.04] sm:text-5xl lg:text-6xl">{meta.h1}</h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">{copy.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#anfrage" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-black text-slate-950 hover:bg-cyan-200 focus-visible:ring-2 focus-visible:ring-white">
              {isDe ? "Anfrage starten" : "Start request"}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={`tel:${company.phoneRaw}`} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-5 text-sm font-black text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white">
              {isDe ? `Telefon ${company.phone}` : `Call ${company.phone}`}
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="inline-flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 font-semibold leading-7 text-amber-950"><Info className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />{copy.promise}</p>
            <h2 className="mt-10 text-3xl font-black">{isDe ? "Was enthalten ist" : "What is included"}</h2>
            <ul className="mt-5 grid gap-3">
              {service.included[locale].map((item) => <li key={item} className="flex gap-3 rounded-xl bg-emerald-50 p-4 font-semibold leading-6"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />{item}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-black">{isDe ? "Nicht enthalten" : "Not included"}</h2>
            <ul className="mt-5 grid gap-3">
              {service.excluded[locale].map((item) => <li key={item} className="flex gap-3 rounded-xl bg-slate-100 p-4 font-semibold leading-6"><XCircle className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />{item}</li>)}
            </ul>
            <div className="mt-6 rounded-2xl bg-cyan-50 p-5"><strong className="block text-lg">{isDe ? "Kostenfaktoren" : "Cost factors"}</strong><p className="mt-2 leading-7 text-slate-700">{service.priceFactors[locale].join(" · ")}</p></div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black">{copy.processTitle}</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {copy.process.map((item, index) => <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6"><span className="text-sm font-black text-cyan-800">0{index + 1}</span><h3 className="mt-2 text-xl font-black">{item.title}</h3><p className="mt-3 leading-7 text-slate-700">{item.text}</p></article>)}
          </div>
        </div>
      </section>

      {copy.sources.length ? (
        <section className="px-5 py-14 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center gap-3"><ShieldCheck className="h-7 w-7 text-cyan-800" aria-hidden="true" /><h2 className="text-2xl font-black">{isDe ? "Offizielle Hinweise" : "Official guidance"}</h2></div>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">{isDe ? "Diese Links dienen der eigenen Prüfung. FLOXANT fasst sie nicht als Rechts-, Steuer- oder Zollberatung aus." : "Use these links for your own checks. FLOXANT does not interpret them as legal, tax or customs advice."}</p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {copy.sources.map((source) => <li key={source.href} className="rounded-xl bg-slate-50 p-4"><a href={source.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-black text-cyan-900 underline decoration-cyan-300 underline-offset-4">{source.name}<ExternalLink className="h-4 w-4" aria-hidden="true" /></a><p className="mt-2 text-sm leading-6 text-slate-700">{source.note}</p></li>)}
            </ul>
            {copy.caution ? <p className="mt-5 text-sm font-semibold leading-6 text-slate-600">{copy.caution}</p> : null}
          </div>
        </section>
      ) : null}

      <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl"><RoundThreeRequestForm locale={locale} requestType={service.requestType} serviceId={service.serviceId} sourcePage={path} /></div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-black">{isDe ? "Häufige Fragen" : "Frequently asked questions"}</h2>
          <div className="mt-7 grid gap-4">
            {copy.faq.map((item) => <details key={item.q} className="group rounded-2xl border border-white/15 bg-white/5 p-5"><summary className="cursor-pointer font-black marker:text-cyan-300">{item.q}</summary><p className="mt-3 max-w-4xl leading-7 text-slate-200">{item.a}</p></details>)}
          </div>
        </div>
      </section>
    </main>
  );
}
