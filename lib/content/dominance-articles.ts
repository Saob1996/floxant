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

const REVIEWED_AT = "2026-07-26";
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
    directAnswer: "Umzüge mit Start oder Ziel im bedienten Regensburger Gebiet können auch über längere Strecken von bis zu ungefähr 500 km angefragt werden. Das ist kein garantierter Radius: Route, Umfang, Zugang, Zeitraum und verfügbare Kapazität werden für jeden Auftrag einzeln geprüft.",
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
      { q: "Ist 500 km ein garantierter Einsatzradius?", a: "Nein. Es ist eine ungefähre Obergrenze für mögliche Anfragen mit Start oder Ziel im bedienten Regensburger Gebiet." },
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
