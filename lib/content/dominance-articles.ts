import type { StrategicBlogArticle } from "@/lib/strategic-blog-articles";

export type DominanceArticle = StrategicBlogArticle & {
  locale: "de" | "en";
  owner: string;
  reviewedAt: string;
  serviceId: string;
};

type ArticleSeed = {
  locale: "de" | "en";
  slug: string;
  category: string;
  title: string;
  metaTitle: string;
  description: string;
  directAnswer: string;
  serviceId: string;
  checklist: readonly string[];
  explanation: readonly string[];
  boundaries: readonly string[];
  relatedService: { href: string; label: string };
  relatedGuide: { href: string; label: string };
  faqItems: StrategicBlogArticle["faqItems"];
};

const REVIEWED_AT = "2026-07-27";
const OWNER = "FLOXANT Redaktion";

function buildArticle(seed: ArticleSeed): DominanceArticle {
  const english = seed.locale === "en";
  return {
    locale: seed.locale,
    owner: OWNER,
    reviewedAt: REVIEWED_AT,
    serviceId: seed.serviceId,
    slug: seed.slug,
    category: seed.category,
    readTime: english ? "6 min" : "6 Min.",
    date: english ? "26 July 2026" : "26. Juli 2026",
    datePublished: REVIEWED_AT,
    title: seed.title,
    metaTitle: seed.metaTitle,
    description: seed.description,
    intro: seed.directAnswer,
    about: [seed.category, seed.serviceId, "FLOXANT"],
    keywords: [],
    sections: [
      {
        title: english ? "The direct answer" : "Die direkte Antwort",
        paragraphs: [seed.directAnswer],
      },
      {
        title: english ? "Why these details matter" : "Warum diese Angaben wichtig sind",
        paragraphs: [...seed.explanation],
      },
      {
        title: english ? "Practical checklist" : "Praktische Checkliste",
        paragraphs: [
          english
            ? "Use this list before opening the request form. Unknown points can be marked as open instead of being guessed."
            : "Nutzen Sie diese Liste vor dem Anfrageformular. Unbekannte Punkte dürfen als offen markiert werden, statt sie zu schätzen.",
        ],
        bullets: [...seed.checklist],
      },
      {
        title: english ? "Boundaries and open points" : "Grenzen und offene Punkte",
        paragraphs: [
          english
            ? "A clear request improves the assessment but does not create an automatic booking, price or availability confirmation."
            : "Eine klare Anfrage verbessert die Prüfung, erzeugt aber keine automatische Buchung, Preis- oder Verfügbarkeitszusage.",
        ],
        bullets: [...seed.boundaries],
      },
      {
        title: english ? "Your next step" : "Der nächste Schritt",
        paragraphs: [
          english
            ? "Send the known details and identify what is still unclear. FLOXANT can then respond with focused questions or the next possible step."
            : "Senden Sie die bekannten Angaben und kennzeichnen Sie, was noch unklar ist. FLOXANT kann dann gezielt nachfragen oder den nächsten möglichen Schritt nennen.",
        ],
      },
    ],
    highlightTitle: english ? "Useful before you submit" : "Hilfreich vor dem Absenden",
    highlightPoints: seed.checklist.slice(0, 3) as string[],
    ctas: [
      seed.relatedService,
      seed.relatedGuide,
      {
        href: english ? "/en/service-finder" : "/service-finder",
        label: english ? "Use the service finder" : "Service Finder öffnen",
      },
    ],
    faqTitle: english ? "Related questions" : "Häufige Fragen",
    faqItems: seed.faqItems,
  };
}

const seeds: readonly ArticleSeed[] = [
  {
    locale: "de",
    slug: "zehn-angaben-klare-umzugsanfrage-regensburg",
    category: "Umzug Regensburg",
    title: "10 Angaben für eine klare Umzugsanfrage in Regensburg",
    metaTitle: "10 Angaben für eine Umzugsanfrage in Regensburg | FLOXANT",
    description: "Start, Ziel, Zugang, Umfang und Zeitraum: Diese zehn Angaben machen eine Umzugsanfrage in Regensburg nachvollziehbar.",
    directAnswer: "Eine klare Umzugsanfrage nennt Start, Ziel, Etagen, Aufzug, Laufwege, Haltemöglichkeit, Wohnungsgröße, Möbelumfang, Zeitraum und gewünschte Zusatzleistungen. Fotos ergänzen schwer beschreibbare Zugänge, ersetzen aber keine vollständigen Eckdaten.",
    serviceId: "umzug",
    checklist: [
      "Startort oder Start-PLZ",
      "Zielort oder Ziel-PLZ",
      "Etage und Aufzug an beiden Orten",
      "Laufwege und Haltemöglichkeit",
      "Wohnungsgröße und Zimmer",
      "Möbel, Kartons und größere Einzelstücke",
      "Demontage oder Montage",
      "gewünschter Termin oder Zeitraum",
      "mögliche Reinigung oder Räumung",
      "mindestens ein Kontaktweg",
    ],
    explanation: [
      "Die Wohnungsgröße allein beschreibt keinen Umzug. Zwei gleich große Wohnungen können durch Treppen, lange Wege, viele Kartons oder zerlegbare Möbel einen sehr unterschiedlichen Ablauf benötigen.",
      "Trennen Sie sichere Angaben von Schätzungen. Eine gekennzeichnete offene Frage ist hilfreicher als ein ungenauer Wert, auf dem später die gesamte Planung aufbaut.",
    ],
    boundaries: ["keine Terminbestätigung durch das Formular", "keine Preisberechnung ohne Prüfung", "Zusatzleistungen nur nach ausdrücklicher Abstimmung"],
    relatedService: { href: "/regensburg/umzug", label: "Umzug Regensburg" },
    relatedGuide: { href: "/umzug-regensburg/anfrage", label: "Umzug in zwei Schritten anfragen" },
    faqItems: [
      { q: "Muss ich die genaue Kartonzahl kennen?", a: "Nein. Eine ehrliche Spanne und Fotos helfen, solange unklare Angaben als Schätzung gekennzeichnet sind." },
      { q: "Welche Fotos sind besonders hilfreich?", a: "Übersichten der Möbel sowie Fotos von Treppen, Aufzügen, Türen und längeren Laufwegen." },
      { q: "Kann ich Zusatzleistungen später ergänzen?", a: "Ja. Reinigung, Räumung oder Montage sollten aber vor einer verbindlichen Abstimmung geklärt werden." },
    ],
  },
  {
    locale: "de",
    slug: "umzug-regensburg-laengere-strecke",
    category: "Umzug Regensburg",
    title: "Umzug aus oder nach Regensburg über längere Strecken",
    metaTitle: "Umzug Regensburg über längere Strecke anfragen | FLOXANT",
    description: "So beschreiben Sie Route, Zeitraum, Umfang und Zugang für einen Umzug aus oder nach Regensburg über eine längere Strecke.",
    directAnswer: "Umzüge mit Start oder Ziel im bedienten Regensburger Gebiet können auch über längere Strecken angefragt werden. Die konkrete Route, der Umfang, beide Zugänge, der Zeitraum und die verfügbare Kapazität werden für jeden Auftrag einzeln geprüft.",
    serviceId: "umzug",
    checklist: ["vollständige Start- und Zielorte", "flexibler oder fester Zeitraum", "Umfang und große Möbel", "Etagen, Aufzug und Ladewege", "Übergabe- oder Schlüsseltermine", "gewünschte Zusatzleistungen"],
    explanation: [
      "Bei einer längeren Strecke beeinflusst nicht nur die Entfernung den Ablauf. Ladezeit, Entladezeit, Zufahrt, mögliche Zwischenstopps und ein knappes Zeitfenster müssen zusammenpassen.",
      "Nennen Sie, ob Sie aus Regensburg wegziehen, nach Regensburg ziehen oder Regensburg nur Start- beziehungsweise Zielgebiet ist. So bleibt die regionale Zuordnung eindeutig.",
    ],
    boundaries: ["keine Zusage für jede Strecke", "keine feste Fahrtdauer ohne Routenprüfung", "keine Beiladungs- oder Rückfahrtzusage ohne Kapazitätsprüfung"],
    relatedService: { href: "/regensburg/umzug", label: "Umzug Regensburg" },
    relatedGuide: { href: "/umzug-regensburg/anfrage", label: "Längere Strecke anfragen" },
    faqItems: [
      { q: "Gibt es einen garantierten Einsatzradius?", a: "Nein. FLOXANT prüft jede längere Strecke einzeln nach Route, Umfang, Zugängen, Zeitraum und verfügbarer Kapazität." },
      { q: "Hilft ein flexibler Zeitraum?", a: "Ein Zeitraum kann die Prüfung erleichtern, ist aber keine Verfügbarkeitszusage." },
      { q: "Welche Zusatztermine sollte ich nennen?", a: "Schlüsselübergabe, Wohnungsübergabe, Einzug und andere nicht verschiebbare Zeitpunkte." },
    ],
  },
  {
    locale: "de",
    slug: "etage-aufzug-umzugsanfrage",
    category: "Umzugsplanung",
    title: "Etage und Aufzug bei einer Umzugsanfrage richtig angeben",
    metaTitle: "Etage und Aufzug bei der Umzugsanfrage | FLOXANT",
    description: "Startetage, Zieletage, Aufzuggröße und Laufwege richtig beschreiben, damit der Zugang vor dem Umzug geprüft werden kann.",
    directAnswer: "Geben Sie Start- und Zieletage getrennt an und schreiben Sie nicht nur „Aufzug vorhanden“. Wichtig ist, ob der Aufzug nutzbar und groß genug ist, wo er hält und welche Treppen, Türen oder Laufwege trotzdem bleiben.",
    serviceId: "umzug",
    checklist: ["Startetage und Zieletage", "Aufzug an Start und Ziel", "ungefähre Kabinen- und Türgröße", "Treppenform und enge Kurven", "Weg von Wohnung bis Fahrzeug", "Innenhof, Keller oder Nebeneingang"],
    explanation: [
      "Ein Aufzug kann den Aufwand reduzieren, aber nur wenn Möbel hineinpassen und er am benötigten Geschoss hält. Ein kleiner Personenaufzug ersetzt deshalb nicht automatisch den Treppenweg.",
      "Fotos sollten den gesamten Weg zeigen: Wohnungstür, Flur, Treppe, Aufzug, Hauseingang und Ladepunkt. Persönliche Dokumente oder Personen gehören nicht ins Bild.",
    ],
    boundaries: ["keine Machbarkeitszusage allein anhand eines Aufzug-Häkchens", "schwere oder sperrige Stücke separat prüfen", "Haltezonen nicht automatisch enthalten"],
    relatedService: { href: "/regensburg/umzug", label: "Umzug mit Zugangsdaten anfragen" },
    relatedGuide: { href: "/blog/zehn-angaben-klare-umzugsanfrage-regensburg", label: "10 Angaben für die Anfrage" },
    faqItems: [
      { q: "Reicht die Angabe „3. Etage mit Aufzug“?", a: "Für den Start ja, für sperrige Möbel helfen zusätzlich Aufzuggröße, Türbreite und Fotos." },
      { q: "Was ist ein Laufweg?", a: "Der Weg zwischen Wohnung oder Objekt und dem möglichen Ladeplatz des Fahrzeugs." },
      { q: "Soll ich Keller und Garage angeben?", a: "Ja, wenn dort Gegenstände abgeholt oder abgestellt werden sollen." },
    ],
  },
  {
    locale: "de",
    slug: "klaviertransport-regensburg-vorbereiten",
    category: "Klaviertransport",
    title: "Klaviertransport vorbereiten: Maße, Zugänge und Treppen",
    metaTitle: "Klaviertransport Regensburg richtig vorbereiten | FLOXANT",
    description: "Instrumentart, Maße, Gewicht, Etagen, Treppen und Zugangsfotos für eine Klaviertransport-Anfrage in Regensburg zusammenstellen.",
    directAnswer: "Für die Prüfung eines Klaviertransports braucht FLOXANT Instrumentart, ungefähre Maße und Gewicht sowie vollständige Angaben zu Start, Ziel, Etagen, Aufzug, Treppen, Türen und Laufwegen. Fotos sollten das Instrument und die gesamten Zugänge zeigen.",
    serviceId: "klaviertransport",
    checklist: ["Klavier, Flügel oder anderes Tasteninstrument", "Breite, Höhe, Tiefe und ungefähres Gewicht", "Start- und Zielort", "Etagen und Aufzug", "Treppen, Podeste und enge Kurven", "Türbreiten und Bodenverhältnisse", "Fotos des Instruments und beider Wege"],
    explanation: [
      "Bei einem Instrument entscheidet nicht nur das Gewicht. Länge, Schwerpunkt, Bauform und die engste Stelle im Weg können bestimmen, ob zusätzliche Planung nötig ist.",
      "Fotografieren Sie die Route in Laufrichtung und aus Gegenrichtung. So werden Kurven, Stufen, Türanschläge und mögliche Engstellen verständlicher.",
    ],
    boundaries: ["keine Blindzusage ohne Zugangsdaten", "keine Kran- oder Hebetechnik ohne gesonderte Prüfung", "Stimmung oder Reparatur nicht automatisch enthalten"],
    relatedService: { href: "/klaviertransport-regensburg", label: "Klaviertransport Regensburg" },
    relatedGuide: { href: "/kontakt?service=klaviertransport&city=regensburg", label: "Instrument und Zugänge beschreiben" },
    faqItems: [
      { q: "Muss ich das genaue Gewicht kennen?", a: "Eine Modellangabe oder Herstellerinformation hilft; unbekannte Werte können als Schätzung gekennzeichnet werden." },
      { q: "Welche Treppenfotos sind sinnvoll?", a: "Gesamtansichten, Podeste, Kurven, Geländer, Türbereiche und die schmalste Stelle." },
      { q: "Kann das Instrument zusammen mit dem Umzug angefragt werden?", a: "Ja, wenn Klaviertransport und übriger Umzugsumfang getrennt beschrieben werden." },
    ],
  },
  {
    locale: "de",
    slug: "bueroreinigung-duesseldorf-anfrage",
    category: "Büroreinigung Düsseldorf",
    title: "7 Angaben für eine Büroreinigungs-Anfrage in Düsseldorf",
    metaTitle: "Büroreinigung Düsseldorf richtig anfragen | FLOXANT",
    description: "Objekt, Fläche, Räume, Turnus, Zugangszeiten, Leistungsumfang und Ansprechpartner für eine Büroreinigung in Düsseldorf klären.",
    directAnswer: "Eine gute Büroreinigungs-Anfrage nennt Objektart, ungefähre Fläche, Raumgruppen, gewünschten Turnus, mögliche Zugangszeiten, Leistungsbereiche und eine verantwortliche Kontaktperson. Ein vorhandenes Leistungsverzeichnis oder Angebot kann ergänzend hochgeladen werden.",
    serviceId: "bueroreinigung",
    checklist: ["Objektart und Nutzung", "ungefähre Fläche", "Büros, Besprechung, Küche und Sanitär getrennt", "einmalig oder gewünschter Turnus", "Zugangs- und Schließzeiten", "Material und Verbrauchsmittel", "Ansprechpartner und Startwunsch"],
    explanation: [
      "Fläche und Turnus allein reichen selten. Unterschiedlich genutzte Bereiche benötigen unterschiedliche Aufgaben und Zeitfenster. Beschreiben Sie deshalb Raumgruppen statt nur eine Gesamtzahl.",
      "Trennen Sie Reinigungsaufgaben, Verbrauchsmaterial und interne Sondervorgaben. Dadurch werden Angebote vergleichbarer und offene Punkte früh sichtbar.",
    ],
    boundaries: ["keine automatische Empfehlung eines Turnus", "keine Spezialdesinfektion ohne klare Vorgaben", "keine Start- oder Personalzusage durch die Anfrage"],
    relatedService: { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
    relatedGuide: { href: "/duesseldorf", label: "Düsseldorfer Objektbrief öffnen" },
    faqItems: [
      { q: "Muss die Fläche exakt bekannt sein?", a: "Eine belastbare Näherung reicht für den Start; Teilflächen sollten nach Nutzung getrennt sein." },
      { q: "Welche Zugangsangaben helfen?", a: "Mögliche Uhrzeiten, Schlüssel- oder Alarmweg und verantwortliche Kontaktperson." },
      { q: "Sind Verbrauchsmittel automatisch enthalten?", a: "Nicht immer. Papier, Seife, Müllbeutel und andere Artikel sollten ausdrücklich zugeordnet werden." },
    ],
  },
  {
    locale: "de",
    slug: "grundreinigung-oder-unterhaltsreinigung-duesseldorf",
    category: "Reinigung Düsseldorf",
    title: "Grundreinigung oder Unterhaltsreinigung in Düsseldorf?",
    metaTitle: "Grundreinigung oder Unterhaltsreinigung Düsseldorf | FLOXANT",
    description: "Grundreinigung und Unterhaltsreinigung nach Ziel, Zustand, Flächen und Turnus unterscheiden.",
    directAnswer: "Grundreinigung beschreibt eine intensive, meist einmalige Bearbeitung klar benannter Bereiche. Unterhaltsreinigung beschreibt wiederkehrende Aufgaben in einem vereinbarten Rhythmus. Welche Leistung passt, hängt von Zustand, Ziel, Nutzung und gewünschtem Umfang ab.",
    serviceId: "reinigung",
    checklist: ["aktueller Zustand", "gewünschter Zielzustand", "betroffene Räume und Flächen", "einmaliger Anlass oder laufender Bedarf", "besonders belastete Bereiche", "nicht automatisch enthaltene Aufgaben"],
    explanation: [
      "Eine Grundreinigung ist nicht einfach eine längere Unterhaltsreinigung. Sie sollte konkrete Schwerpunkte nennen, etwa Böden, Kanten, Türen oder schwer erreichbare Bereiche.",
      "Bei Unterhaltsreinigung müssen Aufgabe und Intervall getrennt beschrieben werden. Nicht jede Tätigkeit wird bei jedem Termin ausgeführt.",
    ],
    boundaries: ["kein pauschaler Umfang nur anhand der Bezeichnung", "Fenster und Sonderbereiche ausdrücklich klären", "Turnus erst nach Objektprüfung abstimmen"],
    relatedService: { href: "/duesseldorf/grundreinigung", label: "Grundreinigung Düsseldorf" },
    relatedGuide: { href: "/duesseldorf/unterhaltsreinigung", label: "Unterhaltsreinigung Düsseldorf" },
    faqItems: [
      { q: "Kann vor einer laufenden Reinigung eine Grundreinigung sinnvoll sein?", a: "Das kann je nach Zustand sinnvoll sein, muss aber anhand des Objekts geprüft werden." },
      { q: "Sind Fenster automatisch Teil einer Grundreinigung?", a: "Nein. Glas, Rahmen, Falze und Zugänglichkeit sollten separat beschrieben werden." },
      { q: "Wer legt den Turnus fest?", a: "Der Rhythmus wird anhand von Nutzung, Flächen, gewünschtem Zustand und Rahmenbedingungen abgestimmt." },
    ],
  },
  {
    locale: "de",
    slug: "reinigungsangebot-duesseldorf-klar-vergleichen",
    category: "Angebot prüfen",
    title: "12 Punkte für ein nachvollziehbares Reinigungsangebot",
    metaTitle: "Reinigungsangebot Düsseldorf klar vergleichen | FLOXANT",
    description: "Leistungsumfang, Turnus, Material, Zugänge und Zusatzkosten in Reinigungsangeboten nachvollziehbar vergleichen.",
    directAnswer: "Ein Reinigungsangebot ist erst vergleichbar, wenn Objekt, Flächen, Aufgaben, Intervalle, Zugänge, Material, Verbrauchsmittel, Qualitätsweg, Zusatzleistungen, Ausschlüsse, Laufzeit und Ansprechpartner eindeutig beschrieben sind. Der Endpreis allein zeigt diese Unterschiede nicht.",
    serviceId: "angebot-pruefen",
    checklist: ["Objekt und Flächen", "Raumgruppen", "Aufgaben je Bereich", "Intervalle", "Zugangszeiten", "Schlüssel und Alarm", "Reinigungsmittel", "Verbrauchsmaterial", "Zusatzleistungen", "Ausschlüsse", "Laufzeit und Änderung", "Ansprechpartner"],
    explanation: [
      "Übertragen Sie mehrere Angebote in dieselbe Struktur. Eine Pauschale lässt sich nur vergleichen, wenn dieselben Aufgaben, Mengen und Voraussetzungen dahinterstehen.",
      "Markieren Sie offene Punkte als Rückfrage. FLOXANT kann die praktische Klarheit einordnen, bewertet aber keine Rechtsfragen und garantiert keine Ersparnis.",
    ],
    boundaries: ["keine Rechtsberatung", "keine Marktpreis- oder Ersparnisgarantie", "keine Abwertung anderer Anbieter"],
    relatedService: { href: "/angebot-vergleichen-duesseldorf", label: "Reinigungsangebot prüfen" },
    relatedGuide: { href: "/duesseldorf", label: "Düsseldorfer Leistungsumfang vorbereiten" },
    faqItems: [
      { q: "Sollte ich nur den Monatsbetrag vergleichen?", a: "Nein. Umfang, Intervalle, Material, Zugänge und Ausschlüsse müssen ebenfalls vergleichbar sein." },
      { q: "Kann ich ein Angebot ohne Datei prüfen lassen?", a: "Ja. Die wichtigsten Positionen und offenen Fragen können auch im Formular beschrieben werden." },
      { q: "Ist die Prüfung eine Rechtsberatung?", a: "Nein. Sie ist eine praktische Einordnung von Umfang, Annahmen und offenen Punkten." },
    ],
  },
  {
    locale: "de",
    slug: "angaben-reinigungsangebot-duesseldorf",
    category: "Reinigungsangebot Düsseldorf",
    title: "Welche Angaben braucht ein Reinigungsangebot?",
    metaTitle: "Reinigungsangebot Düsseldorf richtig vorbereiten | FLOXANT",
    description: "Objekt, Flächen, Aufgaben, Rhythmus, Zugang und Zusatzleistungen für ein klares Reinigungsangebot in Düsseldorf beschreiben.",
    directAnswer: "Ein nachvollziehbares Reinigungsangebot braucht Objektart, Ort, Flächen, Raumgruppen, gewünschte Aufgaben, Reinigungsrhythmus, Zugangszeiten, Startwunsch und ausdrücklich gewünschte Zusatzleistungen. Fotos oder ein vorhandenes Leistungsverzeichnis helfen, wenn Bereiche schwer zu beschreiben sind.",
    serviceId: "reinigung",
    checklist: [
      "Objektart und Düsseldorfer Ort oder PLZ",
      "Gesamtfläche und getrennte Raumgruppen",
      "gewünschte Aufgaben je Bereich",
      "einmaliger oder wiederkehrender Bedarf",
      "mögliche Zugangs- und Reinigungszeiten",
      "besonders belastete oder sensible Bereiche",
      "Fenster, Rahmen und andere Zusatzleistungen",
      "Startwunsch und verantwortliche Kontaktperson",
    ],
    explanation: [
      "Eine Quadratmeterzahl allein zeigt nicht, wie ein Objekt genutzt wird. Büro, Küche, Sanitär, Praxisraum und Lager benötigen unterschiedliche Aufgaben und oft unterschiedliche Zeitfenster.",
      "Benennen Sie, was enthalten sein soll und was zunächst offen bleibt. So lassen sich Rückfragen gezielt beantworten und Angebote später sachlich vergleichen.",
    ],
    boundaries: ["keine Preiszusage allein anhand der Fläche", "Material und Verbrauchsmittel ausdrücklich zuordnen", "Sonderleistungen erst nach Objektprüfung einplanen"],
    relatedService: { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf anfragen" },
    relatedGuide: { href: "/blog/reinigungsangebot-duesseldorf-klar-vergleichen", label: "12 Punkte im Angebot prüfen" },
    faqItems: [
      { q: "Muss eine Raumliste vorhanden sein?", a: "Nein. Eine verständliche Aufteilung nach Büro, Küche, Sanitär, Verkehrswegen und Sonderbereichen reicht für den Start." },
      { q: "Soll ich den gewünschten Rhythmus schon nennen?", a: "Ja. Einmalig, wöchentlich, mehrfach wöchentlich oder individuell verändert den benötigten Umfang." },
      { q: "Kann ein vorhandenes Angebot ergänzt werden?", a: "Ja. Es kann zusammen mit offenen Fragen oder fehlenden Leistungsangaben zur Einordnung gesendet werden." },
    ],
  },
  {
    locale: "de",
    slug: "fensterreinigung-hoehe-rahmen-zugang-duesseldorf",
    category: "Fensterreinigung Düsseldorf",
    title: "Fensterreinigung: Höhe, Rahmen und Zugang richtig angeben",
    metaTitle: "Fensterreinigung Düsseldorf richtig anfragen | FLOXANT",
    description: "Fensterzahl, Höhe, Rahmen, Falze, Innen- und Außenseite sowie Zugang für eine Fensterreinigung in Düsseldorf beschreiben.",
    directAnswer: "Für eine Fensterreinigungs-Anfrage helfen Fensterzahl oder Glasfläche, Etage, ungefähre Höhe, Innen- und Außenseite, Rahmen und Falze sowie die Erreichbarkeit. Zeigen Sie schwer erreichbare Fenster auf Fotos und nennen Sie feste Einbauten, Höfe oder andere Zugangshindernisse.",
    serviceId: "fensterreinigung",
    checklist: [
      "Anzahl der Fenster oder ungefähre Glasfläche",
      "Etage und Höhe der höchsten Fläche",
      "Innen-, Außen- oder beidseitige Reinigung",
      "Rahmen und Falze ausdrücklich nennen",
      "Öffnungsart und feststehende Glasflächen",
      "Zugang über Raum, Hof oder Außenbereich",
      "Fotos schwer erreichbarer Bereiche",
    ],
    explanation: [
      "Ein Fenster im Erdgeschoss ist anders erreichbar als eine feststehende Glasfläche in einer oberen Etage. Die Fensterzahl allein reicht deshalb nicht für eine belastbare Einordnung.",
      "Rahmen, Falze, Jalousien oder andere Bauteile sind nicht automatisch dasselbe wie Glasreinigung. Führen Sie diese Punkte getrennt auf.",
    ],
    boundaries: ["keine Höhenzusage ohne Zugangsdaten", "Hebetechnik nur nach gesonderter Prüfung", "Rahmen, Falze und Jalousien nicht automatisch enthalten"],
    relatedService: { href: "/duesseldorf/fensterreinigung", label: "Fensterreinigung Düsseldorf" },
    relatedGuide: { href: "/duesseldorf/reinigung/anfrage", label: "Reinigung direkt anfragen" },
    faqItems: [
      { q: "Reicht die Anzahl der Fenster?", a: "Für den Einstieg ja. Etage, Höhe, Öffnungsart, Rahmen und Zugang machen die Anfrage deutlich genauer." },
      { q: "Sind Rahmen und Falze automatisch enthalten?", a: "Nein. Nennen Sie beides ausdrücklich, damit der gewünschte Umfang geprüft werden kann." },
      { q: "Welche Fotos helfen?", a: "Hilfreich sind Übersichten, die höchste Glasfläche, die Öffnungsart und den möglichen Zugang innen und außen zeigen." },
    ],
  },
  {
    locale: "de",
    slug: "bauendreinigung-baufeinreinigung-unterschied-duesseldorf",
    category: "Baureinigung Düsseldorf",
    title: "Bauendreinigung und Baufeinreinigung unterscheiden",
    metaTitle: "Bauendreinigung oder Baufeinreinigung Düsseldorf | FLOXANT",
    description: "Bauendreinigung und Baufeinreinigung nach Bauphase, Verschmutzung, Zielzustand und Übergabetermin in Düsseldorf unterscheiden.",
    directAnswer: "Bauendreinigung entfernt grobe baubedingte Rückstände und bereitet den nächsten Arbeitsschritt vor. Baufeinreinigung richtet sich auf feine Stäube, Oberflächen und einen klar beschriebenen Zustand vor Einzug oder Übergabe. Entscheidend sind Bauphase, Restarbeiten, Flächen und Termin.",
    serviceId: "baureinigung",
    checklist: [
      "aktuelle Bau- oder Renovierungsphase",
      "Art der groben und feinen Rückstände",
      "betroffene Räume, Flächen und Oberflächen",
      "noch laufende oder abgeschlossene Gewerke",
      "Fenster, Rahmen und Schutzfolien getrennt nennen",
      "gewünschter Zustand und Übergabetermin",
      "Zugang, Wasser, Strom und Entsorgungsweg",
    ],
    explanation: [
      "Eine Reinigung während laufender Arbeiten hat ein anderes Ziel als die letzte Reinigung vor Einzug. Restarbeiten können gereinigte Flächen erneut belasten und müssen deshalb in der Reihenfolge berücksichtigt werden.",
      "Beschreiben Sie den Zielzustand konkret, etwa handwerkerbereit, frei von groben Rückständen oder fein gereinigt vor Übergabe. Die Bezeichnung allein ersetzt diese Angaben nicht.",
    ],
    boundaries: ["keine Bauabnahme oder rechtliche Bewertung", "Entfernung besonderer Stoffe nur nach Prüfung", "keine Terminbestätigung ohne Baufortschritt und Zugang"],
    relatedService: { href: "/duesseldorf/baureinigung", label: "Bau- und Bauendreinigung Düsseldorf" },
    relatedGuide: { href: "/duesseldorf/reinigung/anfrage", label: "Baureinigung beschreiben" },
    faqItems: [
      { q: "Ist Baufeinreinigung dasselbe wie Grundreinigung?", a: "Nein. Baufeinreinigung bezieht sich auf baubedingte Rückstände und einen konkreten Bau- oder Übergabezeitpunkt." },
      { q: "Wann sollte die Reinigung stattfinden?", a: "Der Zeitpunkt wird nach Restarbeiten, Staubentwicklung, Zugang und gewünschtem Übergabetermin abgestimmt." },
      { q: "Sind Fenster und Schutzfolien automatisch enthalten?", a: "Nein. Glas, Rahmen, Folien und mögliche Rückstände sollten ausdrücklich genannt werden." },
    ],
  },
  {
    locale: "de",
    slug: "fotos-umzugsangebot-regensburg",
    category: "Umzug Regensburg",
    title: "Welche Fotos helfen bei einem Umzugsangebot?",
    metaTitle: "Fotos für ein Umzugsangebot in Regensburg | FLOXANT",
    description: "Möbel, Treppen, Aufzüge, Türen und Ladewege sinnvoll fotografieren, damit eine Umzugsanfrage in Regensburg verständlicher wird.",
    directAnswer: "Hilfreich sind Übersichten der Räume und größeren Möbel sowie Fotos der vollständigen Wege an Start und Ziel: Wohnungstür, Flur, Treppe, Aufzug, Hauseingang und möglicher Ladepunkt. Persönliche Dokumente, Personen und unnötige private Details sollten nicht im Bild sein.",
    serviceId: "umzug",
    checklist: [
      "Raumübersichten statt einzelner Detailbilder",
      "größere und sperrige Möbel vollständig zeigen",
      "Treppen, Podeste und enge Kurven",
      "Aufzugkabine und Aufzugtür",
      "Wohnungs- und Haustüren",
      "Weg zwischen Gebäude und Ladepunkt",
      "dieselben Zugangspunkte am Ziel",
    ],
    explanation: [
      "Fotos ergänzen Zimmerzahl und Möbelliste, ersetzen sie aber nicht. Eine Übersicht zeigt Mengenverhältnisse, während Detailbilder Maße, Engstellen oder Besonderheiten erklären.",
      "Fotografieren Sie Wege in beide Richtungen und nennen Sie, ob das Bild zum Start oder Ziel gehört. So lassen sich Treppen und Kurven leichter zuordnen.",
    ],
    boundaries: ["keine Personen oder persönlichen Dokumente fotografieren", "Fotos ersetzen keine Maße bei engen Stellen", "Machbarkeit und Termin bleiben prüfpflichtig"],
    relatedService: { href: "/regensburg/umzug", label: "Umzug Regensburg" },
    relatedGuide: { href: "/umzug-regensburg/anfrage", label: "Fotos zur Anfrage hinzufügen" },
    faqItems: [
      { q: "Muss jedes Möbelstück fotografiert werden?", a: "Nein. Übersichten und Fotos großer, schwerer oder sperriger Stücke sind meist hilfreicher." },
      { q: "Soll der Ladepunkt sichtbar sein?", a: "Ja. Zeigen Sie den möglichen Weg vom Hauseingang bis zur Haltemöglichkeit, soweit das ohne private Daten möglich ist." },
      { q: "Kann ich die Anfrage ohne Fotos senden?", a: "Ja. Fotos sind optional; Start, Ziel, Umfang, Etagen, Aufzüge und Zeitraum bleiben die wichtigsten Angaben." },
    ],
  },
  {
    locale: "de",
    slug: "demontage-montage-umzug-anfragen",
    category: "Umzug Regensburg",
    title: "Demontage und Montage eindeutig anfragen",
    metaTitle: "Demontage und Montage beim Umzug Regensburg | FLOXANT",
    description: "Möbel, Maße, Bauart und gewünschten Arbeitsumfang für Demontage und Montage bei einem Umzug in Regensburg klar angeben.",
    directAnswer: "Nennen Sie jedes Möbel, das demontiert oder montiert werden soll, einzeln und beschreiben Sie Bauart, Maße, Zustand und vorhandene Anleitungen. Schreiben Sie dazu, ob nur Transportvorbereitung, vollständiger Abbau, Wiederaufbau oder eine bestimmte Teilaufgabe gewünscht ist.",
    serviceId: "umzug",
    checklist: [
      "betroffene Möbel einzeln auflisten",
      "ungefähre Maße und Bauart",
      "gewünschter Abbauumfang am Start",
      "gewünschter Aufbauumfang am Ziel",
      "Fotos von Möbeln und Verbindungen",
      "vorhandene Anleitungen und Beschläge",
      "Wandbefestigungen oder Anschlüsse getrennt markieren",
    ],
    explanation: [
      "Der Begriff Montage kann vom Lösen weniger Teile bis zum vollständigen Wiederaufbau reichen. Eine klare Möbelliste verhindert, dass unterschiedliche Erwartungen hinter demselben Wort stehen.",
      "Beschläge, Einlegeböden und Kleinteile sollten beschriftet und zugeordnet werden. Vorhandene Schäden oder fehlende Teile gehören vorab in die Beschreibung.",
    ],
    boundaries: ["Elektro-, Sanitär- und Küchenanschlüsse nicht automatisch enthalten", "Wandarbeiten nur nach ausdrücklicher Prüfung", "keine Wiederaufbauzusage ohne Angaben zum Möbel"],
    relatedService: { href: "/regensburg/umzug", label: "Umzug Regensburg mit Zusatzleistung" },
    relatedGuide: { href: "/umzug-regensburg/anfrage", label: "Montagebedarf angeben" },
    faqItems: [
      { q: "Ist Möbelmontage automatisch im Umzug enthalten?", a: "Nein. Die betroffenen Möbel und der gewünschte Arbeitsumfang müssen ausdrücklich genannt und geprüft werden." },
      { q: "Helfen Aufbauanleitungen?", a: "Ja. Anleitungen, Fotos und eine vollständige Zuordnung der Beschläge erleichtern die Prüfung." },
      { q: "Gehören Küchen- oder Elektroanschlüsse dazu?", a: "Nein, solche Anschlüsse sind nicht automatisch Teil einer Möbelmontage und müssen gesondert geklärt werden." },
    ],
  },
  {
    locale: "de",
    slug: "umzug-reinigung-kombinieren-regensburg",
    category: "Umzug und Reinigung Regensburg",
    title: "Umzug und Reinigung sinnvoll kombinieren",
    metaTitle: "Umzug und Reinigung in Regensburg kombinieren | FLOXANT",
    description: "Umzug, Restmengen, Schlüsselweg, Reinigung und Übergabetermin in Regensburg in der richtigen Reihenfolge anfragen.",
    directAnswer: "Umzug und Reinigung lassen sich sinnvoll kombinieren, wenn zuerst Möbel und Restgegenstände geklärt sind und die Reinigung danach einen eindeutigen Zielzustand hat. Wichtig sind beide Termine, Schlüsselzugang, verbleibende Räume, gewünschte Reinigungsbereiche und die Frage, was nicht automatisch enthalten ist.",
    serviceId: "umzug-reinigung",
    checklist: [
      "Umzugstermin und gewünschtes Zeitfenster",
      "Übergabe- oder Rückgabetermin",
      "Räume und Gegenstände, die zurückbleiben",
      "Schlüsselweg und Zugang nach dem Umzug",
      "gewünschte Reinigungsbereiche",
      "Fenster, Küche und besondere Rückstände getrennt nennen",
      "Fotos des Zustands vor der Reinigung",
    ],
    explanation: [
      "Reinigung vor dem letzten Möbeltransport führt oft zu neuen Laufspuren oder verdeckten Flächen. Deshalb sollte die Reihenfolge nach Restmengen, Zugang und Übergabetermin geplant werden.",
      "Trennen Sie Umzugs- und Reinigungsumfang in der Anfrage. Dadurch bleibt erkennbar, welche Angaben und Rückfragen zu welchem Arbeitspaket gehören.",
    ],
    boundaries: ["keine Übergabe- oder Kautionsgarantie", "Restgegenstände und Entsorgung nicht automatisch enthalten", "Fenster und Sonderreinigung ausdrücklich anfragen"],
    relatedService: { href: "/regensburg/umzug-reinigung", label: "Umzug und Reinigung Regensburg" },
    relatedGuide: { href: "/umzug-regensburg/anfrage", label: "Kombination anfragen" },
    faqItems: [
      { q: "Soll zuerst umgezogen oder gereinigt werden?", a: "Meist wird zuerst geräumt oder umgezogen. Die passende Reihenfolge hängt aber von Restmengen, Zugang und Termin ab." },
      { q: "Ist die Wohnung danach automatisch übergabefähig?", a: "Nein. Der gewünschte Zielzustand und alle Reinigungsbereiche müssen beschrieben und geprüft werden." },
      { q: "Kann Entrümpelung zusätzlich ergänzt werden?", a: "Ja. Restmengen sollten als eigenes Arbeitspaket mit Fotos, Räumen und gewünschtem Endzustand angegeben werden." },
    ],
  },
  {
    locale: "en",
    slug: "request-moving-quote-regensburg",
    category: "Moving in Regensburg",
    title: "How to request a moving quote in Regensburg",
    metaTitle: "How to request a moving quote in Regensburg | FLOXANT",
    description: "Prepare origin, destination, access, volume and timing for a clear moving request in Regensburg.",
    directAnswer: "A useful moving request states the origin, destination, floors, lift, carrying routes, loading access, approximate volume, preferred period and any additional service. Photos help with furniture and access that are difficult to describe.",
    serviceId: "umzug",
    checklist: ["origin and destination", "floors and usable lifts", "carrying and loading routes", "rooms, boxes and larger furniture", "preferred date or period", "dismantling, assembly or packing help", "cleaning or clearance as separate extras"],
    explanation: [
      "A property size does not fully describe a move. Access, stairs, furniture, boxes and fixed deadlines can change the practical scope.",
      "State which details are confirmed and which are estimates. Clear uncertainty is more useful than a precise-looking guess.",
    ],
    boundaries: ["no automatic booking", "no price without reviewing the details", "no availability confirmation from the form"],
    relatedService: { href: "/en/regensburg/moving", label: "Moving in Regensburg" },
    relatedGuide: { href: "/en/service-finder", label: "Use the service finder" },
    faqItems: [
      { q: "Do I need an exact number of boxes?", a: "No. A realistic range and photos are useful if estimates are clearly marked." },
      { q: "Can I request a move to another city?", a: "Yes, when the origin or destination is in the served Regensburg area; the specific route must be reviewed." },
      { q: "Can cleaning be added?", a: "It can be requested as a separate work package with its own scope and timing." },
    ],
  },
  {
    locale: "en",
    slug: "ten-details-clear-moving-request",
    category: "Moving request guide",
    title: "10 details for a clear moving request",
    metaTitle: "10 details for a clear moving request | FLOXANT",
    description: "A practical checklist covering route, access, volume, timing, special items and contact details.",
    directAnswer: "The ten most useful details are origin, destination, floors, lifts, carrying routes, loading access, property size, furniture and boxes, preferred timing and additional services. Add at least one contact method and identify any unknown details.",
    serviceId: "umzug",
    checklist: ["origin", "destination", "floor at both properties", "lift at both properties", "carrying route", "loading access", "rooms and approximate volume", "large or special items", "preferred period", "additional services and contact method"],
    explanation: [
      "These details reduce follow-up questions because they describe both what is moving and how it can be reached.",
      "Photos should show the route and larger items without exposing personal documents or unnecessary private information.",
    ],
    boundaries: ["estimates must be marked as estimates", "special items require separate details", "submission is not a confirmed appointment"],
    relatedService: { href: "/en/regensburg/moving", label: "Open the moving service" },
    relatedGuide: { href: "/en/search", label: "Search FLOXANT guides" },
    faqItems: [
      { q: "What if I do not know the exact volume?", a: "Provide rooms, a furniture list, a box range and photos, and mark the estimate as open." },
      { q: "Should I include parking?", a: "Yes. The possible distance between the property and loading point affects the route." },
      { q: "Are assembly services included?", a: "Only when the relevant furniture and requested work are stated and reviewed." },
    ],
  },
  {
    locale: "en",
    slug: "request-office-cleaning-duesseldorf",
    category: "Office cleaning Düsseldorf",
    title: "How to request office cleaning in Düsseldorf",
    metaTitle: "How to request office cleaning in Düsseldorf | FLOXANT",
    description: "Prepare property type, area, room groups, frequency, access and scope for an office cleaning request in Düsseldorf.",
    directAnswer: "A clear office cleaning request states the property type, approximate area, room groups, intended frequency, possible access times, requested tasks and responsible contact person. Existing specifications or quotes can be added for comparison.",
    serviceId: "bueroreinigung",
    checklist: ["property type and use", "approximate area", "offices, meeting rooms, kitchen and washrooms", "one-off or recurring need", "access and closing times", "products and consumables", "contact person and preferred start"],
    explanation: [
      "Total area alone is not enough. Different zones have different use, tasks and access constraints, so room groups should be described separately.",
      "Separate cleaning tasks from consumables and internal special requirements. This makes the scope easier to review and compare.",
    ],
    boundaries: ["no automatic frequency recommendation", "no specialist disinfection promise", "no start-date confirmation through the request"],
    relatedService: { href: "/en/duesseldorf/office-cleaning", label: "Office cleaning in Düsseldorf" },
    relatedGuide: { href: "/en/service-finder", label: "Use the service finder" },
    faqItems: [
      { q: "Does the area need to be exact?", a: "A reliable estimate is enough to start if different zones are described separately." },
      { q: "Which access details matter?", a: "Possible times, keys or alarm procedures and the responsible contact person." },
      { q: "Are consumables included?", a: "Not automatically. Paper, soap, bin liners and other items should be assigned explicitly." },
    ],
  },
] as const;

export const dominanceArticles: readonly DominanceArticle[] = seeds.map(buildArticle);
export const dominanceGermanArticles = dominanceArticles.filter((article) => article.locale === "de");
export const dominanceEnglishArticles = dominanceArticles.filter((article) => article.locale === "en");

export function getDominanceArticle(slug: string, locale: "de" | "en") {
  return dominanceArticles.find((article) => article.slug === slug && article.locale === locale);
}
