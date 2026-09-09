import type { DominanceArticle } from "@/lib/content/dominance-articles";

type Seed = {
  locale: "de" | "en";
  slug: string;
  category: string;
  title: string;
  metaTitle: string;
  description: string;
  answer: string;
  details: readonly string[];
  checklist: readonly string[];
  boundaries: readonly string[];
  serviceId: string;
  serviceHref: string;
  serviceLabel: string;
  sourceLinks?: readonly { href: string; label: string }[];
  faqs: readonly { q: string; a: string }[];
};

const REVIEWED_AT = "2026-08-29";

function build(seed: Seed): DominanceArticle {
  const en = seed.locale === "en";
  return {
    locale: seed.locale,
    owner: "FLOXANT Redaktion",
    reviewedAt: REVIEWED_AT,
    serviceId: seed.serviceId,
    slug: seed.slug,
    category: seed.category,
    readTime: en ? "7 min" : "7 Min.",
    date: en ? "29 August 2026" : "29. August 2026",
    datePublished: REVIEWED_AT,
    title: seed.title,
    metaTitle: seed.metaTitle,
    description: seed.description,
    intro: seed.answer,
    about: [seed.category, seed.serviceId, "FLOXANT"],
    keywords: [],
    sections: [
      { title: en ? "The direct answer" : "Die direkte Antwort", paragraphs: [seed.answer] },
      { title: en ? "What matters in practice" : "Was praktisch wichtig ist", paragraphs: [...seed.details] },
      {
        title: en ? "Checklist" : "Checkliste",
        paragraphs: [en ? "Mark unknown points as open instead of guessing." : "Kennzeichnen Sie unbekannte Punkte als offen, statt sie zu erraten."],
        bullets: [...seed.checklist],
      },
      {
        title: en ? "Boundaries and official clarification" : "Grenzen und offizielle Klärung",
        paragraphs: [en ? "This guide helps with preparation but is not legal, tax, medical or customs advice. The responsible authority's current written information is decisive." : "Dieser Ratgeber hilft bei der Vorbereitung, ist aber keine Rechts-, Steuer-, Medizin- oder Zollberatung. Maßgeblich ist die aktuelle schriftliche Auskunft der zuständigen Stelle."],
        bullets: [...seed.boundaries],
      },
      { title: en ? "Next practical step" : "Der nächste praktische Schritt", paragraphs: [en ? "Tell us where you need help, which tasks you would like us to handle and what is still unclear. We will discuss the scope and timing with you. Sending an enquiry does not book a service." : "Beschreiben Sie, wo Sie Unterstützung brauchen, welche Arbeiten Sie abgeben möchten und was noch offen ist. Wir stimmen Umfang und Termin persönlich mit Ihnen ab. Mit der Anfrage buchen Sie noch keine Leistung."] },
    ],
    highlightTitle: en ? "Prepare these points first" : "Diese Punkte zuerst vorbereiten",
    highlightPoints: [...seed.checklist.slice(0, 4)],
    ctas: [
      { href: seed.serviceHref, label: seed.serviceLabel },
      ...(seed.sourceLinks || []).slice(0, 2),
    ],
    faqTitle: en ? "Questions about this guide" : "Fragen zu diesem Ratgeber",
    faqItems: [...seed.faqs],
  };
}

const seeds: readonly Seed[] = [
  {
    locale: "de",
    slug: "europa-umzug-ab-deutschland-checkliste",
    category: "Europa-Umzug",
    title: "Europa-Umzug ab Deutschland: vollständige Checkliste",
    metaTitle: "Europa-Umzug ab Deutschland: Checkliste | FLOXANT",
    description: "Route, Volumen, Zugang, Termine und Grenzprüfung: die vollständige Checkliste für einen Europa-Umzug mit Start in Deutschland.",
    answer: "Für einen Europa-Umzug mit Start in Deutschland sollten zuerst Route, Zeitfenster, Haushaltsumfang, Zugänge und gewünschte Zusatzleistungen geklärt werden. Bei Nicht-EU-Zielen oder Transitländern kommen offizielle Grenz- und Einfuhrvorgaben hinzu.",
    details: ["Trennen Sie Angaben für Start und Ziel. Etage, Aufzug, Laufweg, Haltemöglichkeit und Schlüsselzugang werden an beiden Orten benötigt.", "Eine Inventarliste oder aussagekräftige Fotos helfen beim Volumen. Persönliche Dokumente und unnötige sensible Inhalte gehören nicht in die Bilder."],
    checklist: ["Startort in Deutschland", "Zielland und Zielort", "Wunschtermin oder Zeitfenster", "Haushaltsgröße und Inventar", "Etage und Aufzug an beiden Orten", "Laufwege und Ladezugang", "Demontage und Montage", "Verpackungsbedarf", "mögliche Transitländer", "offene Zoll- oder Einfuhrfragen"],
    boundaries: ["keine Starts außerhalb Deutschlands", "keine Zollzusage durch das Formular", "steuerliche Behandlung im konkreten Angebot prüfen", "keine Terminbestätigung ohne Kapazitätsprüfung"],
    serviceId: "EUROPE_MOVE", serviceHref: "/europa-umzug-ab-deutschland", serviceLabel: "Europa-Umzug anfragen",
    sourceLinks: [{ href: "https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-transit_en", label: "EU-Kommission: Zolltransit" }],
    faqs: [
      { q: "Muss das Inventar schon vollständig sein?", a: "Für die erste Prüfung genügt eine ehrliche, möglichst strukturierte Übersicht. Vor einem verbindlichen Angebot können genauere Angaben nötig werden." },
      { q: "Warum ist das Startland fest Deutschland?", a: "Dieser FLOXANT-Anfrageweg ist operativ ausschließlich für Umzüge mit Start in Deutschland definiert." },
      { q: "Reicht ein Zielland ohne Zielort?", a: "Nein. Zielort, Zugang und Route beeinflussen Machbarkeit und Aufwand wesentlich." },
    ],
  },
  {
    locale: "de",
    slug: "kosten-umzug-deutschland-europaeisches-ausland",
    category: "Europa-Umzugskosten",
    title: "Was kostet ein Umzug von Deutschland ins europäische Ausland?",
    metaTitle: "Kosten eines Europa-Umzugs ab Deutschland | FLOXANT",
    description: "Welche Faktoren die Kosten eines Umzugs von Deutschland ins europäische Ausland bestimmen – ohne Scheingenauigkeit oder Lockpreis.",
    answer: "Ein seriöser Preis entsteht aus Route, Volumen, Zugängen, Personal, Fahrzeug, Termin und Zusatzleistungen. Bei grenzüberschreitenden Leistungen muss außerdem die tatsächlich anwendbare Steuer- und gegebenenfalls Grenzbehandlung vor dem konkreten Angebot geprüft werden.",
    details: ["Kilometer allein bilden die Kosten nicht ab. Ein kurzer Trageweg mit Aufzug kann anders geplant werden als ein enger Altbauzugang mit langen Laufwegen.", "Nicht-EU-Ziele können Dokumente, Wartezeiten oder externe Abwicklungen auslösen. Solche Positionen dürfen erst nach Routenprüfung konkret beziffert werden."],
    checklist: ["vollständige Route", "Volumen oder Inventar", "Etagen und Aufzüge", "Tragewege", "Terminflexibilität", "Verpackung und Montage", "Grenz- und Transitklasse"],
    boundaries: ["keine pauschale Kilometerpreiszusage", "keine erfundene Länderpauschale", "keine Netto-Verbraucherpreise", "keine Zoll- oder Steuerberatung"],
    serviceId: "EUROPE_MOVE", serviceHref: "/europa-umzug-ab-deutschland", serviceLabel: "Route und Umfang prüfen lassen",
    sourceLinks: [{ href: "https://europa.eu/youreurope/citizens/consumers/shopping/vat/index_en.htm", label: "EU: allgemeine Mehrwertsteuerhinweise" }],
    faqs: [
      { q: "Gibt es einen festen Preis pro Kilometer?", a: "Nein. Entfernung ist nur ein Faktor neben Volumen, Zugängen, Personal, Fahrzeug und Zusatzleistungen." },
      { q: "Ist die Mehrwertsteuer immer gleich?", a: "Die konkrete steuerliche Behandlung grenzüberschreitender Leistungen muss vor Veröffentlichung des Angebots fachlich geprüft und eindeutig ausgewiesen werden." },
      { q: "Kann Terminflexibilität helfen?", a: "Sie kann die Einsatzplanung erleichtern, ist aber keine Preis- oder Rückfahrtzusage." },
    ],
  },
  {
    locale: "de",
    slug: "eu-nicht-eu-unterlagen-auslandsumzug",
    category: "Unterlagen Europa-Umzug",
    title: "EU oder Nicht-EU: Welche Unterlagen braucht ein Auslandsumzug?",
    metaTitle: "Unterlagen für EU- und Nicht-EU-Umzüge | FLOXANT",
    description: "EU, Nicht-EU und Transit unterscheiden: Welche Umzugs- und Inventarangaben vorbereitet werden sollten und wer offizielle Vorgaben bestätigt.",
    answer: "Innerhalb der EU und bei Nicht-EU-Zielen gelten unterschiedliche Rahmenbedingungen. Für die Transportprüfung helfen immer Route, Identität des Auftraggebers, Inventar und Termine; konkrete Einfuhr- oder Zollunterlagen müssen bei der zuständigen Behörde bestätigt werden.",
    details: ["Für Schweiz, Vereinigtes Königreich und Norwegen stellt FLOXANT offizielle Länderlinks bereit. Formulare und Nachweise können sich je nach Wohnsitzwechsel und Warenart unterscheiden.", "Transitländer dürfen nicht übersehen werden. Eine Fahrt zu einem europäischen Ziel kann eine Nicht-EU-Grenze berühren und deshalb eine zusätzliche Prüfung benötigen."],
    checklist: ["Start- und Zielanschrift", "Inventarliste", "Eigentums- und Nutzungsangaben soweit behördlich verlangt", "Umzugsdatum", "Transitroute", "besondere oder beschränkte Güter", "schriftliche Behördenauskunft bei offenen Fragen"],
    boundaries: ["keine individuelle Zollberatung", "keine Prüfung verbotener Güter durch allgemeine Webtexte", "keine Dokumentenzusage vor Behördenprüfung"],
    serviceId: "EUROPE_MOVE", serviceHref: "/europa-umzug-ab-deutschland", serviceLabel: "Europa-Route einordnen",
    sourceLinks: [{ href: "https://www.gov.uk/guidance/transfer-of-residence-to-great-britain", label: "HMRC: Transfer of Residence" }, { href: "https://www.bazg.admin.ch/de/vorgehen-umzug-in-die-schweiz", label: "BAZG: Umzug in die Schweiz" }],
    faqs: [
      { q: "Sind innerhalb der EU nie Unterlagen nötig?", a: "Das lässt sich pauschal nicht behaupten. Transport-, Identitäts-, Zugangs- und Warenangaben bleiben nötig; Sondergüter oder Transit können weitere Prüfungen auslösen." },
      { q: "Wer bestätigt Zollanforderungen?", a: "Die zuständige Zoll- oder Einfuhrbehörde beziehungsweise ein hierfür beauftragter Fachanbieter." },
      { q: "Soll ich Reisepass oder Gesundheitsunterlagen hochladen?", a: "Nicht über das allgemeine Anfrageformular. Senden Sie zunächst nur die sachlichen Umzugsangaben; notwendige Nachweise werden separat und zweckgebunden geklärt." },
    ],
  },
  {
    locale: "de",
    slug: "beiladung-rueckfahrt-europa-umzug",
    category: "Beiladung und Rückfahrt",
    title: "Beiladung und Rückfahrt beim Europa-Umzug verständlich erklärt",
    metaTitle: "Beiladung und Rückfahrt beim Europa-Umzug | FLOXANT",
    description: "Wann Beiladung oder Rückfahrt denkbar ist, welche Flexibilität nötig ist und warum daraus keine automatische Verfügbarkeit folgt.",
    answer: "Eine Beiladung nutzt freie Fahrzeugkapazität auf einer passenden Route; eine Rückfahrt nutzt Kapazität nach einem vorhandenen Auftrag. Beides kann nur nach Route, Zeitfenster, Volumen und Ladungsverträglichkeit geprüft werden.",
    details: ["Ein ähnliches Zielland genügt nicht. Start- und Zielkorridor, Ladezeit, Entladezeit und Platzbedarf müssen zum tatsächlichen Fahrzeugeinsatz passen.", "Flexible Termine können die Chance einer Zuordnung erhöhen, begründen aber weder Anspruch noch Preisnachlass."],
    checklist: ["Start- und Zielort", "frühestes und spätestes Datum", "Volumen und Maße", "besondere Gegenstände", "Zugang", "Möglichkeit zur Zwischenlagerung", "Kontakt für kurzfristige Rückfrage"],
    boundaries: ["keine garantierte Rückfahrt", "kein automatischer Rabatt", "keine Vermischung inkompatibler Ladung", "Grenzanforderungen bleiben bestehen"],
    serviceId: "EUROPE_MOVE", serviceHref: "/europa-umzug-ab-deutschland", serviceLabel: "Europa-Umzug mit Flexibilität anfragen",
    faqs: [
      { q: "Ist Beiladung immer günstiger?", a: "Nein. Sie kann wirtschaftlich interessant sein, wenn Route, Zeit und Kapazität passen; eine Ersparnis wird nicht garantiert." },
      { q: "Wie flexibel muss der Termin sein?", a: "Je breiter das reale Zeitfenster, desto eher lässt sich eine Route prüfen. Die konkrete Zuordnung bleibt kapazitätsabhängig." },
      { q: "Kann ein kompletter Haushalt beigeladen werden?", a: "Das hängt von Volumen, Fahrzeug und Route ab und muss einzeln geprüft werden." },
    ],
  },
  {
    locale: "de",
    slug: "umzugskosten-jobcenter-arbeitsagentur-vorher-klaeren",
    category: "Mögliche Kostenübernahme",
    title: "Umzugskosten durch Jobcenter oder Arbeitsagentur: Was vorher geklärt werden muss",
    metaTitle: "Umzugskosten: Jobcenter oder Arbeitsagentur | FLOXANT",
    description: "Antrag, schriftliche Zusicherung, Kostenvoranschlag und Auftrag trennen, bevor Umzugskosten entstehen.",
    answer: "Vor einer Beauftragung sollte schriftlich geklärt werden, welche Stelle zuständig ist, welche Voraussetzungen gelten und wie viele Kostenvoranschläge benötigt werden. Ein FLOXANT-Kostenvoranschlag ist keine Bewilligung.",
    details: ["§ 22 SGB II sieht mögliche Umzugskosten unter Voraussetzungen und mit vorheriger Zusicherung vor. Die konkrete Entscheidung trifft die zuständige Stelle im Einzelfall.", "Beim Vermittlungsbudget weist die Bundesagentur darauf hin, vor Entstehung der Kosten zu beantragen; ein Rechtsanspruch besteht dort nicht."],
    checklist: ["zuständige Stelle", "Grund und Erforderlichkeit", "schriftliche Vorgaben", "Anzahl der Kostenvoranschläge", "genehmigter Leistungsumfang", "Entscheidung vor Auftrag", "Aktenzeichen ohne unnötige sensible Anlagen"],
    boundaries: ["keine Bewilligungsgarantie", "keine Antragstellung durch FLOXANT", "kein Auftrag vor ungeklärter Kostenfolge", "keine Sozialrechtsberatung"],
    serviceId: "COST_COVERAGE_REQUEST", serviceHref: "/kostenuebernahme-fuer-umzug-und-haushaltshilfe", serviceLabel: "Kostenvoranschlag strukturiert anfragen",
    sourceLinks: [{ href: "https://www.gesetze-im-internet.de/sgb_2/__22.html", label: "Offizieller Gesetzestext: § 22 SGB II" }, { href: "https://www.arbeitsagentur.de/vermittlungsbudget", label: "Bundesagentur: Vermittlungsbudget" }],
    faqs: [
      { q: "Reicht ein Kostenvoranschlag als Zusage?", a: "Nein. Maßgeblich ist eine schriftliche Entscheidung der zuständigen Stelle zum genehmigten Umfang." },
      { q: "Soll ich vor dem Antrag beauftragen?", a: "Die Bundesagentur weist beim Vermittlungsbudget darauf hin, vor Entstehung der Kosten zu beantragen. Lassen Sie die konkrete Reihenfolge schriftlich bestätigen." },
      { q: "Garantiert FLOXANT die Übernahme?", a: "Nein. FLOXANT kann einen Kostenvoranschlag erstellen; bewilligen kann nur die zuständige Stelle." },
    ],
  },
  {
    locale: "de",
    slug: "beruflicher-umzug-arbeitgeber-kostenuebernahme",
    category: "Beruflicher Umzug",
    title: "Beruflicher Umzug: Wann ein Arbeitgeber Kosten übernehmen kann",
    metaTitle: "Beruflicher Umzug und Arbeitgeberkosten | FLOXANT",
    description: "Freiwillige Arbeitgebererstattung, interne Zusage, Leistungsumfang und Nachweise vor einem beruflichen Umzug klären.",
    answer: "Ein Arbeitgeber kann Umzugskosten freiwillig übernehmen oder erstatten, wenn dies intern vereinbart ist. Eine allgemeine Zahlungspflicht wird nicht behauptet; Umfang, Höchstbetrag, Belege und steuerliche Behandlung sollten vor Auftrag schriftlich geklärt werden.",
    details: ["Eine Kostenfreigabe sollte benennen, ob Transport, Verpackung, Reise, Zwischenlagerung oder weitere Positionen erfasst sind.", "Die Lohnsteuer-Hinweise des Bundesfinanzministeriums beschreiben Rahmenbedingungen möglicher steuerfreier Erstattung. Die individuelle steuerliche Bewertung gehört zur zuständigen Fachberatung."],
    checklist: ["schriftliche Arbeitgeberzusage", "Höchstbetrag", "enthaltene Positionen", "Beleganforderungen", "Zahlungsweg", "Umzugstermin", "steuerliche Rückfrage an Fachstelle"],
    boundaries: ["keine Zahlungspflicht behaupten", "keine Steuerberatung", "keine Erstattung ohne schriftliche Grundlage", "private Zusatzleistungen getrennt ausweisen"],
    serviceId: "COST_COVERAGE_REQUEST", serviceHref: "/kostenuebernahme-fuer-umzug-und-haushaltshilfe", serviceLabel: "Arbeitgeberfreigabe und Umfang erfassen",
    sourceLinks: [{ href: "https://lsth.bundesfinanzministerium.de/lsth/2026/A-Einkommensteuergesetz/II-Einkommen-2-24b/4-Ueberschuss-d-Einnahmen-ueber-die-Werbungsk-8-9a/Paragraf-9/r-9-9.html", label: "BMF: Lohnsteuer-Hinweise 2026" }],
    faqs: [
      { q: "Muss der Arbeitgeber meinen Umzug zahlen?", a: "Eine allgemeine Pflicht wird hier nicht behauptet. Entscheidend sind Arbeitsvertrag, Richtlinie oder eine individuelle schriftliche Vereinbarung." },
      { q: "Kann FLOXANT direkt mit dem Arbeitgeber abrechnen?", a: "Das wird nur nach schriftlicher Bestätigung von Auftrag, Rechnungsadresse und Zahlungsweg geprüft." },
      { q: "Ist jede Erstattung steuerfrei?", a: "Nein. Die individuelle steuerliche Behandlung muss anhand der aktuellen Regeln fachlich geklärt werden." },
    ],
  },
  {
    locale: "de",
    slug: "haushaltshilfe-krankenkasse-leistungsgrenzen",
    category: "Haushaltshilfe",
    title: "Haushaltshilfe durch die Krankenkasse: Was Reinigung leisten darf und was nicht",
    metaTitle: "Haushaltshilfe und Reinigung: Leistungsgrenzen | FLOXANT",
    description: "Haushaltshilfe, Reinigungsumfang, Kassenentscheidung und Anbieterprüfung sachlich trennen – ohne Leistungs- oder Erstattungsversprechen.",
    answer: "Eine Krankenkasse entscheidet nach gesetzlichen Voraussetzungen und Einzelfall, ob Haushaltshilfe bewilligt wird. Eine Reinigungsfirma kann nur den konkret angebotenen praktischen Reinigungsumfang erbringen; Pflege, Betreuung und medizinische Leistungen sind davon getrennt.",
    details: ["§ 38 SGB V und § 24h SGB V enthalten unterschiedliche Voraussetzungen für Haushaltshilfe. Die Kasse bestätigt Anspruch, Dauer, Umfang und Abrechnungsweg.", "FLOXANT benötigt keine Diagnose im Webformular. Für einen Kostenvoranschlag genügen Aufgabe, Ort, Umfang, Zeitraum und schriftliche Vorgaben der Kasse."],
    checklist: ["schriftliche Kasseninformation", "genehmigter Zeitraum", "konkreter Reinigungsumfang", "Stunden- oder Leistungsgrenze", "Eigenanteil soweit mitgeteilt", "Abrechnungsweg", "Anbieteranforderungen"],
    boundaries: ["keine Pflege oder medizinische Leistung", "keine Kassenzusage", "keine Diagnose im Anfrageformular", "keine Abrechnung vor Anbieter- und Leistungsprüfung"],
    serviceId: "COST_COVERAGE_REQUEST", serviceHref: "/kostenuebernahme-fuer-umzug-und-haushaltshilfe", serviceLabel: "Haushaltshilfe-Anfrage vorbereiten",
    sourceLinks: [{ href: "https://www.gesetze-im-internet.de/sgb_5/__38.html", label: "Offizieller Gesetzestext: § 38 SGB V" }, { href: "https://www.gesetze-im-internet.de/sgb_5/__24h.html", label: "Offizieller Gesetzestext: § 24h SGB V" }],
    faqs: [
      { q: "Entscheidet FLOXANT über den Anspruch?", a: "Nein. Das entscheidet ausschließlich die Krankenkasse nach ihren Voraussetzungen und dem Einzelfall." },
      { q: "Muss ich eine Diagnose hochladen?", a: "Nicht über das FLOXANT-Webformular. Nennen Sie nur die praktische Aufgabe und die sachlichen Kassenanforderungen." },
      { q: "Ist Betreuung Teil der Reinigung?", a: "Nein. Reinigung ist eine praktische Dienstleistung und darf nicht mit Pflege, Betreuung oder medizinischer Versorgung gleichgesetzt werden." },
    ],
  },
  {
    locale: "de",
    slug: "umzug-schwangerschaft-praktisch-ruhig-planen",
    category: "Umzugsplanung",
    title: "Umzug während der Schwangerschaft praktisch und ruhig planen",
    metaTitle: "Umzug während der Schwangerschaft planen | FLOXANT",
    description: "Aufgaben, Termine, Hilfe und Haushaltshilfe-Anfrage bei einem Umzug während der Schwangerschaft praktisch strukturieren.",
    answer: "Ein ruhiger Ablauf entsteht durch frühe Aufgabenverteilung, realistische Puffer, klare Zugänge und eine Liste dessen, was andere übernehmen sollen. Medizinische Belastbarkeit und individuelle Vorsichtsmaßnahmen gehören in ärztliche Beratung, nicht in die Umzugsplanung einer Dienstleistungsseite.",
    details: ["Trennen Sie schwere, zeitkritische und organisatorische Aufgaben. Verpackung, Montage, Transport und Endreinigung können separat geplant werden.", "Falls eine Haushaltshilfe über die Krankenkasse geprüft werden soll, sollte die Kasse Voraussetzungen, Umfang und Anbieterweg schriftlich bestätigen."],
    checklist: ["Umzugszeitfenster mit Puffer", "Aufgaben für Helfer oder Dienstleister", "Zugänge und Schlüssel", "Packplan", "wichtige Dokumente separat", "Endreinigung", "Kassenrückfrage falls relevant"],
    boundaries: ["keine medizinische Empfehlung", "keine Aussage zur körperlichen Belastbarkeit", "keine Kassenbewilligung versprechen", "Notfallfragen gehören zu medizinischen Stellen"],
    serviceId: "DIFFICULT_SITUATION", serviceHref: "/hilfe-in-schwierigen-lebenssituationen", serviceLabel: "Praktische Aufgaben diskret anfragen",
    sourceLinks: [{ href: "https://www.gesetze-im-internet.de/sgb_5/__24h.html", label: "Offizieller Gesetzestext: § 24h SGB V" }],
    faqs: [
      { q: "Gibt FLOXANT medizinische Empfehlungen?", a: "Nein. Medizinische Fragen müssen mit Ärztinnen, Ärzten oder anderen zuständigen Fachstellen geklärt werden." },
      { q: "Welche Aufgaben kann ich zuerst abgeben?", a: "Häufig lassen sich Verpackung, Möbelmontage, Transport und Endreinigung getrennt beschreiben und priorisieren." },
      { q: "Zahlt die Krankenkasse automatisch?", a: "Nein. Die Kasse prüft Voraussetzungen und Umfang individuell und muss dies schriftlich bestätigen." },
    ],
  },
  {
    locale: "de",
    slug: "wohnungsaufloesung-todesfall-aufgaben-freigabe-kosten",
    category: "Wohnungsauflösung",
    title: "Wohnungsauflösung nach einem Todesfall: Aufgaben, Freigabe und Kosten",
    metaTitle: "Wohnungsauflösung nach Todesfall planen | FLOXANT",
    description: "Berechtigung, zu behaltende Dinge, Räumungsumfang, Reinigung und Kosten einer Wohnungsauflösung sachlich vorbereiten.",
    answer: "Vor einer Wohnungsauflösung müssen Auftraggeber, Berechtigung, zu behaltende Gegenstände, Räume, Schlüssel und gewünschter Endzustand geklärt sein. Eine Todesursache oder ausführliche private Geschichte ist dafür nicht nötig.",
    details: ["Kennzeichnen Sie eindeutig, was bleibt, an wen etwas übergeben wird und welche Räume erst nach Freigabe betreten werden dürfen.", "Kosten hängen von Menge, Material, Sortieraufwand, Zugang, Transport, tatsächlichen Entsorgungswegen und optionaler Reinigung ab."],
    checklist: ["berechtigter Auftraggeber", "Schlüssel und Zugang", "zu behaltende Gegenstände", "gesperrte Bereiche", "Räumungsumfang", "Fotofreigabe", "gewünschter Endzustand", "Übergabetermin"],
    boundaries: ["keine Rechtsberatung zur Erbfolge", "keine Todesursache abfragen", "keine Entsorgung ungeklärter Gegenstände", "Kosten erst nach realem Umfang"],
    serviceId: "DIFFICULT_SITUATION", serviceHref: "/hilfe-in-schwierigen-lebenssituationen", serviceLabel: "Wohnungsauflösung diskret einordnen",
    faqs: [
      { q: "Muss ich die Todesursache nennen?", a: "Nein. Für die praktische Planung werden nur Berechtigung, Aufgabe, Räume, Gegenstände, Zugang und Termin benötigt." },
      { q: "Kann vor der Freigabe geräumt werden?", a: "Nein. Berechtigung und Freigabe müssen vor Beginn eindeutig geklärt sein." },
      { q: "Wovon hängen die Kosten ab?", a: "Von Menge, Material, Sortierung, Zugang, Transport, Entsorgungswegen, Personal, Termin und gewünschtem Endzustand." },
    ],
  },
  {
    locale: "de",
    slug: "umzug-festes-budget-leistungsumfang-priorisieren",
    category: "Umzugsbudget",
    title: "Umzug mit festem Budget: Leistungsumfang richtig priorisieren",
    metaTitle: "Umzug mit festem Budget priorisieren | FLOXANT",
    description: "Unverzichtbare Leistungen, Eigenleistung, Terminflexibilität und Bruttobudget für einen prüfbaren Umzugsumfang ordnen.",
    answer: "Ein festes Budget wird prüfbar, wenn unverzichtbare Leistungen von flexiblen Zusatzleistungen getrennt werden. Für private Inlandsumzüge sollte die Preisvorstellung als Bruttobetrag inklusive 19 % MwSt. angegeben werden.",
    details: ["Starten Sie mit Transport, notwendigem Personal und schwierigen Zugängen. Verpackung, Demontage, Montage, Reinigung oder Terminwahl können danach als veränderbare Bausteine betrachtet werden.", "Eigenleistung spart nicht automatisch einen festen Betrag. Sie verändert den tatsächlichen Aufwand, der anschließend neu kalkuliert werden muss."],
    checklist: ["Bruttobudget inklusive 19 % MwSt.", "unverzichtbarer Transportumfang", "mögliche Eigenleistung", "flexibler Termin", "Möbelmontage", "Verpackung", "Reinigung", "Zugangsaufwand"],
    boundaries: ["keine automatische Budgetannahme", "kein garantierter Rabatt", "kein Auftrag durch Formulareingabe", "Gegenvorschlag bleibt unverbindlich"],
    serviceId: "BUDGET_MOVE", serviceHref: "/umzug-mit-preisvorstellung", serviceLabel: "Budget und Umfang abgleichen",
    faqs: [
      { q: "Welche Leistungen sollte ich zuerst priorisieren?", a: "Transport, sichere Durchführung und unvermeidbarer Zugangsaufwand kommen vor optionaler Verpackung, Montage oder Reinigung." },
      { q: "Muss das Budget brutto sein?", a: "Ja. Für private Inlandsumzüge wird die Preisvorstellung inklusive 19 % MwSt. erfasst." },
      { q: "Akzeptiert FLOXANT jedes Budget?", a: "Nein. FLOXANT prüft, ob Route, Umfang, Zugang und Mindestaufwand zum Budget passen oder ein reduzierter Umfang möglich ist." },
    ],
  },
  {
    locale: "en",
    slug: "moving-from-germany-to-europe-practical-checklist",
    category: "European moving",
    title: "Moving From Germany to Europe: A Practical Checklist",
    metaTitle: "Moving from Germany to Europe: Checklist | FLOXANT",
    description: "A practical checklist for route, volume, access, timing and border-review points when moving from Germany to Europe.",
    answer: "Start with the exact origin in Germany, destination, time window, household volume, access at both addresses and requested add-ons. Non-EU destinations or transit routes require separate checks against current official guidance.",
    details: ["Describe floors, lifts, carrying distances and loading access separately for the German origin and European destination.", "Use an inventory or factual photos for volume. Do not upload identity papers, diagnoses or unrelated private documents to the public form."],
    checklist: ["origin in Germany", "destination country and city", "date window", "inventory or volume", "floors and lifts", "vehicle access", "packing and assembly", "transit route", "open border questions", "preferred contact language"],
    boundaries: ["no origin outside Germany", "no automatic customs handling", "no binding date before capacity review", "tax treatment confirmed in the specific quote"],
    serviceId: "EUROPE_MOVE", serviceHref: "/en/moving-from-germany-to-europe", serviceLabel: "Request a European move",
    sourceLinks: [{ href: "https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-transit_en", label: "European Commission: customs transit" }],
    faqs: [
      { q: "Can the move start outside Germany?", a: "No. This FLOXANT request path is only for moves with Germany as the origin country." },
      { q: "Do I need an exact inventory immediately?", a: "A structured estimate can support the first review. More exact information may be needed before a binding quote." },
      { q: "Are customs requirements confirmed by the form?", a: "No. Current official requirements must be checked for the actual route and goods." },
    ],
  },
  {
    locale: "en",
    slug: "information-needed-european-moving-quote",
    category: "European moving quote",
    title: "What Information Is Needed for a European Moving Quote?",
    metaTitle: "Information for a European Moving Quote | FLOXANT",
    description: "The route, volume, access, dates and optional services needed before a European moving quote can be prepared.",
    answer: "A useful quote request states both addresses, route, date window, volume, large items, floors, lifts, carrying distances, parking access and optional services. Border classification and tax treatment are checked separately before a binding quote.",
    details: ["Room count alone is not enough. An inventory, box estimate and large-item dimensions make the operational scope clearer.", "Identify facts, estimates and open questions separately. This prevents a preliminary assumption from being mistaken for a confirmed service item."],
    checklist: ["full route", "moving date or window", "rooms and boxes", "large or heavy items", "access at both ends", "parking or loading limits", "packing", "assembly", "cleaning", "border or transit review"],
    boundaries: ["no quote based on distance alone", "no hidden net consumer price", "no customs advice", "no availability promise at enquiry stage"],
    serviceId: "EUROPE_MOVE", serviceHref: "/en/moving-from-germany-to-europe", serviceLabel: "Send route and moving scope",
    sourceLinks: [{ href: "https://www.gov.uk/guidance/transfer-of-residence-to-great-britain", label: "HMRC: Transfer of Residence guidance" }],
    faqs: [
      { q: "Is room count enough?", a: "No. Volume, large items, boxes and access can materially change the scope." },
      { q: "Can I submit a date range?", a: "Yes. A realistic window can help with review, but does not confirm capacity." },
      { q: "When is VAT treatment confirmed?", a: "The applicable treatment must be checked for the actual cross-border service and stated clearly in the specific quote." },
    ],
  },
  {
    locale: "en",
    slug: "moving-fixed-budget-what-can-be-adjusted",
    category: "Moving budget",
    title: "Moving With a Fixed Budget: What Can Be Adjusted?",
    metaTitle: "Moving with a Fixed Budget: Adjustable Scope | FLOXANT",
    description: "Separate essential transport from flexible packing, assembly, cleaning and timing to make a gross moving budget reviewable.",
    answer: "A fixed budget becomes useful when essential transport and access work are separated from flexible add-ons. For a private domestic move, state a gross amount including 19% VAT; it is reviewed, not automatically accepted.",
    details: ["Essential items usually include the actual load, safe handling and unavoidable access effort. Packing, disassembly, assembly, cleaning and timing may offer scope choices.", "Customer self-service does not create a fixed discount. It changes the workload, which then needs to be recalculated."],
    checklist: ["gross budget incl. 19% VAT", "essential load", "items the customer can handle", "flexible date", "packing", "assembly", "cleaning", "access constraints"],
    boundaries: ["no automatic acceptance", "no guaranteed discount", "no order created by submitting", "any reduced-scope proposal remains non-binding"],
    serviceId: "BUDGET_MOVE", serviceHref: "/en/moving-with-a-budget", serviceLabel: "Review budget and scope",
    faqs: [
      { q: "Which parts should remain essential?", a: "The actual load, safe handling and unavoidable access work should be defined before optional add-ons." },
      { q: "Must the budget be gross?", a: "Yes. For private domestic moves, the form asks for a gross amount including 19% VAT." },
      { q: "Will every budget be accepted?", a: "No. FLOXANT checks route, volume, access and minimum operational effort before giving a response." },
    ],
  },
] as const;

export const roundThreeBlogArticles = seeds.map(build);
export const roundThreeGermanBlogArticles = roundThreeBlogArticles.filter((article) => article.locale === "de");
export const roundThreeEnglishBlogArticles = roundThreeBlogArticles.filter((article) => article.locale === "en");

export function getRoundThreeBlogArticle(slug: string, locale: "de" | "en") {
  return roundThreeBlogArticles.find((article) => article.slug === slug && article.locale === locale);
}
