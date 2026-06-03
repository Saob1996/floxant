import type { Metadata } from "next";

import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";

export type PropertyOperationsSlug =
  | "objekt-springer"
  | "urlaubsretter"
  | "airbnb-turnover-express"
  | "leerstandsmanagement"
  | "business-errand-service"
  | "human-api"
  | "property-operations";

export type PropertyOperationsPage = {
  slug: PropertyOperationsSlug;
  path: `/${PropertyOperationsSlug}`;
  serviceName: string;
  shortName: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  accent: string;
  image: {
    src: string;
    alt: string;
    concept: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    promise: string;
    metrics: Array<{ label: string; value: string }>;
  };
  problem: {
    title: string;
    intro: string;
    worries: string[];
  };
  stress: Array<{ title: string; text: string }>;
  solution: {
    title: string;
    intro: string;
    points: Array<{ title: string; text: string }>;
  };
  workflow: Array<{ label: string; title: string; text: string }>;
  benefits: Array<{ title: string; text: string }>;
  guarantees: string[];
  faq: Array<{ q: string; a: string }>;
  related: PropertyOperationsSlug[];
  blogIdeas: Array<{ title: string; angle: string }>;
};

const assetBase = "/assets/property-operations";

export const propertyOperationsPages = {
  "objekt-springer": {
    slug: "objekt-springer",
    path: "/objekt-springer",
    serviceName: "Objektvertretung bei Ausfall",
    shortName: "Objektvertretung",
    seoTitle: "Objektvertretung Regensburg | Hilfe bei Ausfall & Übergabe",
    metaDescription:
      "Objektvertretung von FLOXANT: kurzfristige Hilfe, wenn im Objekt jemand ausfällt, ein Schlüssel fehlt oder vor Ort schnell etwas erledigt werden muss.",
    keywords: [
      "Objektvertretung Regensburg",
      "kurzfristige Hilfe vor Ort",
      "Personalausfall Reinigung",
      "Hausmeister ausgefallen",
      "Objektbetreuung Bayern",
    ],
    accent: "#38bdf8",
    image: {
      src: `${assetBase}/objekt-springer.png`,
      alt: "Funkgerät, Schlüssel und Einsatzplan für kurzfristige Hilfe vor Ort",
      concept:
        "Funkgerät, Schlüssel, Einsatzplan und Fahrzeug bereit für einen kurzfristigen Einsatz.",
    },
    hero: {
      eyebrow: "Kurzfristige Objektvertretung",
      headline: "Wenn im Objekt plötzlich jemand fehlt, prüft FLOXANT den nächsten Schritt.",
      subheadline:
        "Krankmeldung, ausgefallener Hausmeister, ungeklärte Übergabe oder kurzfristiger Engpass: FLOXANT sortiert die Lage, bevor aus einem Ausfall ein sichtbares Problem wird.",
      promise: "Sie melden den Engpass. Wir prüfen, wer hinfahren kann.",
      metrics: [
        { label: "Typischer Anlass", value: "Ausfall oder Engpass" },
        { label: "Fokus", value: "Objekt handlungsfähig halten" },
        { label: "Region", value: "Regensburg, Oberpfalz, Bayern" },
      ],
    },
    problem: {
      title: "Der Plan steht. Nur der Mensch fehlt.",
      intro:
        "In Gebäuden, Gewerbeflächen und Wohnanlagen kippen Abläufe selten spektakulär. Es reicht, wenn eine Schlüsselperson krank ist, niemand vor Ort prüfen kann oder eine Übergabe plötzlich heute erledigt werden muss.",
      worries: [
        "Eine Reinigungskraft meldet sich krank und der Kunde erwartet trotzdem einen sauberen Zustand.",
        "Der Hausmeister fällt aus, aber Schlüssel, Kontrollgang oder Übergabe bleiben offen.",
        "Ein Termin ist bestätigt, intern hat aber niemand mehr Zeit für die Vor-Ort-Aufgabe.",
        "Es braucht keine lange Ausschreibung, sondern jemanden, der die Situation ruhig übernimmt.",
      ],
    },
    stress: [
      {
        title: "Der Anruf kommt zu spät",
        text: "Die Fläche ist gebucht, der Nutzer ist informiert, aber der geplante Ablauf bricht am selben Tag weg.",
      },
      {
        title: "Niemand kann kurz hinfahren",
        text: "Die Aufgabe ist klein, aber wichtig: öffnen, prüfen, dokumentieren, Schlüssel sichern oder Zustand melden.",
      },
      {
        title: "Verantwortung bleibt hängen",
        text: "Ohne Ersatzperson muss intern jemand improvisieren, der eigentlich andere Aufgaben hat.",
      },
    ],
    solution: {
      title: "FLOXANT übernimmt die Aufgabe, wenn sie nicht liegen bleiben darf.",
      intro:
        "Die Objektvertretung ist kein klassischer Reinigungsauftrag. Sie ist gedacht für konkrete Aufgaben vor Ort, wenn Betrieb, Objekt oder Übergabe nicht warten können.",
      points: [
        {
          title: "Lage schnell sortieren",
          text: "Was ist offen, wo ist der Zugang, wer entscheidet, was muss dokumentiert werden und was darf nicht passieren?",
        },
        {
          title: "Vor-Ort-Aufgabe übernehmen",
          text: "Je nach Fall geht es um Reinigung, Kontrolle, Schlüssel, kleine Übergabewege, Fotodokumentation oder einfache Objektunterstützung.",
        },
        {
          title: "Ergebnis sichtbar machen",
          text: "Nach dem Einsatz bekommt der Auftraggeber eine klare Rückmeldung, damit intern niemand im Dunkeln bleibt.",
        },
      ],
    },
    workflow: [
      { label: "01", title: "Engpass melden", text: "Ort, Objekt, Aufgabe, Deadline und vorhandene Schlüssel- oder Kontaktwege kurz senden." },
      { label: "02", title: "Machbarkeit prüfen", text: "FLOXANT klärt, ob die Aufgabe seriös, sicher und im verfügbaren Zeitfenster ausführbar ist." },
      { label: "03", title: "Einsatz führen", text: "Der Ablauf wird mit Ansprechpartner, Zugang, Grenzen und gewünschter Dokumentation fixiert." },
      { label: "04", title: "Rückmeldung erhalten", text: "Nach Abschluss kommt eine klare Einsatznotiz mit Status, Auffälligkeiten und nächsten Schritten." },
    ],
    benefits: [
      { title: "Weniger Ausfallstress", text: "Kleine Lücken werden schneller aufgefangen, bevor Beschwerden, Verzögerungen oder Doppelarbeit entstehen." },
      { title: "Mehr Kontrolle", text: "Sie wissen, wer vor Ort ist, was geprüft wurde und wo die Grenze des Einsatzes liegt." },
      { title: "Kein Personalversprechen", text: "FLOXANT ersetzt keine dauerhafte Stelle, sondern übernimmt konkrete Aufgaben nach Prüfung." },
      { title: "Regionale Nähe", text: "Besonders stark für Regensburg, die Oberpfalz und bayerische Objektlagen nach Verfügbarkeit." },
    ],
    guarantees: [
      "Keine verdeckte Personalvermittlung",
      "Keine Zusage ohne Zugang, Aufgabe und Sicherheitsgrenze",
      "Statusrückmeldung nach dem Einsatz",
      "Diskrete Kommunikation mit klarer Verantwortlichkeit",
    ],
    faq: [
      {
        q: "Ist die Objektvertretung eine Reinigungsfirma?",
        a: "Nicht im klassischen Sinn. FLOXANT übernimmt konkrete Aufgaben vor Ort, zu denen Reinigung gehören kann. Entscheidend ist der Engpass: Ausfall, Zugang, Kontrolle, Übergabe oder kurzfristige Unterstützung.",
      },
      {
        q: "Kann FLOXANT am selben Tag helfen?",
        a: "Das wird nach Ort, Aufgabe, Zugang und verfügbarer Kapazität geprüft. Für Regensburg und die Oberpfalz sind kurzfristige Fälle realistischer als weit entfernte Einsätze in Bayern.",
      },
      {
        q: "Welche Aufgaben werden nicht übernommen?",
        a: "Keine Gefahrstoffe, keine Elektroarbeiten, keine Sicherheitsdienste, keine medizinischen Tätigkeiten, keine verdeckte Arbeitnehmerüberlassung und keine unklaren Einsätze ohne berechtigten Auftraggeber.",
      },
      {
        q: "Für wen ist der Service geeignet?",
        a: "Für Hausverwaltungen, Gewerbekunden, Vermieter, Objektbetreiber, Büros und Teams, die kurzfristig eine reale Aufgabe vor Ort lösen müssen.",
      },
    ],
    related: ["human-api", "business-errand-service", "leerstandsmanagement"],
    blogIdeas: [
      { title: "Was tun, wenn im Objekt kurzfristig Personal ausfällt?", angle: "Checkliste für Hausverwaltung und Gewerbe." },
      { title: "Warum kleine Vor-Ort-Aufgaben große Abläufe retten", angle: "Operative Risiken vor Übergabe, Nutzung oder Kundentermin." },
      { title: "Objektkontrolle statt Bauchgefühl", angle: "Welche Informationen ein sauberer Einsatzbericht enthalten sollte." },
    ],
  },
  urlaubsretter: {
    slug: "urlaubsretter",
    path: "/urlaubsretter",
    serviceName: "Urlaubsretter",
    shortName: "Urlaubsretter",
    seoTitle: "Urlaubsretter Regensburg | Schlüssel, Check & Übergabe",
    metaDescription:
      "Urlaubsretter von FLOXANT: Hilfe vor der Reise für Wohnungscheck, Schlüsselübergabe, letzte Erledigungen, Reinigung und Übergaben in Regensburg, Oberpfalz und Bayern.",
    keywords: [
      "Urlaubsretter Regensburg",
      "Schlüsselübergabe vor Urlaub",
      "Wohnungscheck vor Reise",
      "letzte Besorgungen vor Urlaub",
      "FLOXANT Urlaubsservice",
    ],
    accent: "#fbbf24",
    image: {
      src: `${assetBase}/urlaubsretter.png`,
      alt: "Reisepass, Gepäck, Wohnungsschlüssel und Checkliste als Symbol für Hilfe vor dem Urlaub",
      concept:
        "Reisepass, Wohnungsschlüssel, Gepäck und Checklisten auf einem ruhigen dunklen Reisetisch.",
    },
    hero: {
      eyebrow: "Vor der Reise alles unter Kontrolle",
      headline: "Sie fahren weg. FLOXANT kümmert sich um das, was liegen bleibt.",
      subheadline:
        "Kurz vor Abflug fehlt oft nicht der Wille, sondern Zeit: Schlüssel abgeben, Wohnung prüfen, kleine Reinigung, Übergabe, letzte Besorgungen. Urlaubsretter nimmt den Druck aus den letzten Stunden.",
      promise: "Reise starten, ohne dass der Kopf zuhause bleibt.",
      metrics: [
        { label: "Typischer Anlass", value: "Abreise in 24-72h" },
        { label: "Fokus", value: "Schlüssel, Check, Übergabe" },
        { label: "Gefühl", value: "Endlich ist es erledigt" },
      ],
    },
    problem: {
      title: "Der Koffer ist fast zu. Die Wohnungsliste nicht.",
      intro:
        "Die letzten Stunden vor einer Reise sind selten ruhig. Termine verschieben sich, Schlüssel müssen irgendwo hin, eine Person wartet, der Kühlschrank ist noch nicht leer oder die Wohnung soll nicht ungeordnet zurückbleiben.",
      worries: [
        "Der Schlüssel muss noch übergeben werden, aber der Kalender ist voll.",
        "Jemand soll kurz prüfen, ob Fenster, Licht, Heizung oder Wohnung in Ordnung sind.",
        "Vor Abreise bleibt keine Zeit mehr für Reinigung, Müll oder kleine Erledigungen.",
        "Eine Übergabe steht an, während Sie schon auf dem Weg zum Flughafen sind.",
      ],
    },
    stress: [
      {
        title: "Reisezeit trifft Objektpflicht",
        text: "Die Verantwortung endet nicht, nur weil der Flieger, Zug oder Familienurlaub wartet.",
      },
      {
        title: "Zu viele Kleinigkeiten",
        text: "Jede Aufgabe dauert nur kurz, zusammen rauben sie aber den letzten ruhigen Vormittag.",
      },
      {
        title: "Unsicherheit unterwegs",
        text: "Wenn niemand geprüft hat, bleibt das schlechte Gefühl bis zur Rückkehr.",
      },
    ],
    solution: {
      title: "FLOXANT macht aus Restpunkten einen Plan.",
      intro:
        "Urlaubsretter bündelt die kleinen, nervigen und zeitkritischen Aufgaben vor einer Reise. Kein Luxusversprechen, sondern praktische Hilfe, wenn die Zeit knapp wird.",
      points: [
        {
          title: "Prioritäten klären",
          text: "Was muss vor Abreise wirklich passieren, was ist optional, welche Übergabe oder Kontrolle hat Vorrang?",
        },
        {
          title: "Schlüssel und Zugang sichern",
          text: "Zugang, Abholung oder Übergabe werden nur mit eindeutiger Berechtigung und sauberer Rückmeldung durchgeführt.",
        },
        {
          title: "Ruhig abschließen",
          text: "Reinigung, Check, Fotos oder kleine Übergaben werden dokumentiert, damit unterwegs keine offene Schleife bleibt.",
        },
      ],
    },
    workflow: [
      { label: "01", title: "Restliste senden", text: "Reisedatum, Ort, Schlüsselweg, Aufgabe und gewünschte Rückmeldung kurz beschreiben." },
      { label: "02", title: "Grenzen festlegen", text: "FLOXANT prüft, was zeitlich, rechtlich und praktisch übernommen werden kann." },
      { label: "03", title: "Aufgabe erledigen", text: "Der Einsatz wird ruhig nach Liste ausgeführt: Check, Reinigung, Übergabe oder kleine Besorgung." },
      { label: "04", title: "Bestätigung bekommen", text: "Sie erhalten eine knappe Rückmeldung mit Foto- oder Statushinweis, wenn vereinbart." },
    ],
    benefits: [
      { title: "Mehr Reisefrieden", text: "Die offenen Punkte werden nicht mit in den Urlaub genommen." },
      { title: "Klare Berechtigung", text: "Schlüssel und Wohnung werden nur mit eindeutiger Freigabe behandelt." },
      { title: "Kein Organisations-Pingpong", text: "Eine Stelle bündelt Check, Übergabe und kleine Aufgaben." },
      { title: "Regensburg-nah", text: "Besonders sinnvoll für Wohnungen, Apartments und Objekte in Regensburg und Umgebung." },
    ],
    guarantees: [
      "Schlüssel nur nach klarer Freigabe",
      "Keine privaten Eingriffe ohne Auftrag",
      "Statusmeldung nach vereinbartem Umfang",
      "Diskrete Ausführung ohne unnötige Rückfragen",
    ],
    faq: [
      {
        q: "Kann FLOXANT meine Wohnung vor dem Urlaub prüfen?",
        a: "Ja, wenn Zugang, Berechtigung, Umfang und Zeitpunkt eindeutig geklärt sind. Typisch sind Fenster, Licht, Heizung, Schlüssel, Fotos und sichtbare Auffälligkeiten.",
      },
      {
        q: "Übernimmt FLOXANT auch kleine Besorgungen?",
        a: "Kleine Erledigungen können nach Verfügbarkeit geprüft werden. Wichtig sind klare Liste, Zeitfenster, Übergabeort und realistische Grenzen.",
      },
      {
        q: "Ist der Urlaubsretter auch für Airbnb oder Ferienwohnungen geeignet?",
        a: "Für Ferienwohnungen ist der Gästewechsel-Service meist passender. Urlaubsretter ist stärker auf private Abreise, Schlüssel, Check und letzte Restpunkte ausgerichtet.",
      },
      {
        q: "Kann ich den Service kurzfristig buchen?",
        a: "Kurzfristige Hilfe ist möglich, aber nicht garantiert. Je früher Ort, Aufgabe und Zugang gesendet werden, desto besser lässt sich der Einsatz prüfen.",
      },
    ],
    related: ["airbnb-turnover-express", "business-errand-service", "leerstandsmanagement"],
    blogIdeas: [
      { title: "Die letzte Stunde vor dem Urlaub: Was wirklich noch geprüft werden sollte", angle: "Praktische Wohnungscheckliste." },
      { title: "Schlüsselübergabe ohne Stress vor der Reise", angle: "Sichere Wege, Zuständigkeiten und Fehlerquellen." },
      { title: "Warum kleine Erledigungen vor Abreise so viel Kopfstress erzeugen", angle: "Zeitmangel und Kontrollverlust psychologisch erklären." },
    ],
  },
  "airbnb-turnover-express": {
    slug: "airbnb-turnover-express",
    path: "/airbnb-turnover-express",
    serviceName: "Gästewechsel-Service",
    shortName: "Gästewechsel",
    seoTitle: "Gästewechsel-Service Regensburg | Ferienwohnung vorbereiten",
    metaDescription:
      "Gästewechsel-Service von FLOXANT: Gästewechsel mit Reinigung, Kontrolle, Fotos, Schlüsselmanagement und Vorbereitung für Ferienwohnungen in Regensburg, Oberpfalz und Bayern.",
    keywords: [
      "Airbnb Reinigung Regensburg",
      "Gästewechsel Service",
      "Ferienwohnung Turnover",
      "Schlüsselmanagement Airbnb",
      "Apartment Kontrolle Bayern",
    ],
    accent: "#22c55e",
    image: {
      src: `${assetBase}/airbnb-turnover-express.png`,
      alt: "Vorbereitetes Apartment mit frischer Bettwäsche und Kontrollliste",
      concept:
        "Perfekt vorbereitetes Apartment mit frischer Bettwäsche, Kontrollliste, Foto-Check und ruhiger Hotelästhetik.",
    },
    hero: {
      eyebrow: "Gästewechsel ohne Nervenkitzel",
      headline: "Der nächste Gast kommt. FLOXANT macht das Apartment wieder bereit.",
      subheadline:
        "Reinigung, Blickkontrolle, frische Vorbereitung, Fotos und Schlüsselwege greifen in einem Ablauf zusammen. Für Hosts, die nicht jedes Detail selbst jagen wollen.",
      promise: "Checkout vorbei, nächster Check-in vorbereitet.",
      metrics: [
        { label: "Typischer Anlass", value: "Gästewechsel" },
        { label: "Fokus", value: "Reinigung + Kontrolle" },
        { label: "Ziel", value: "Weniger Host-Stress" },
      ],
    },
    problem: {
      title: "Zwischen zwei Gästen gibt es keinen Puffer für Chaos.",
      intro:
        "Kurzzeitvermietung lebt von Details: Bett, Bad, Küche, Müll, Schlüssel, Fotos, Schäden und Timing. Wenn nur ein Punkt offen bleibt, wird aus einer kleinen Lücke schnell eine schlechte Bewertung.",
      worries: [
        "Der vorige Gast ist weg, aber der nächste Check-in steht schon im Kalender.",
        "Es muss sauber sein, aber auch kontrolliert und belegbar vorbereitet.",
        "Schlüssel, Fotos und kleine Mängel dürfen nicht im Chat verloren gehen.",
        "Der Host braucht eine verlässliche Vor-Ort-Struktur, keine lose Hilfe.",
      ],
    },
    stress: [
      {
        title: "Bewertungen hängen an Details",
        text: "Staub, Bettwäsche, Geruch oder ein vergessener Müllbeutel wirken größer als der eigentliche Aufwand.",
      },
      {
        title: "Der Host ist nicht vor Ort",
        text: "Ohne Foto- und Zustandsrückmeldung bleibt die Frage, ob wirklich alles bereit ist.",
      },
      {
        title: "Schlüsselwege sind kritisch",
        text: "Ein sauberer Raum hilft nicht, wenn der Zugang für den nächsten Gast nicht funktioniert.",
      },
    ],
    solution: {
      title: "FLOXANT behandelt Turnover wie einen Mini-Betriebsprozess.",
      intro:
        "Gästewechsel-Service verbindet Reinigung, Vorbereitung, Sichtkontrolle und Rückmeldung. Nicht als anonyme Putzrunde, sondern als Gästewechsel-Ablauf mit klarer Verantwortung.",
      points: [
        {
          title: "Räume wieder gastbereit machen",
          text: "Bad, Küche, Schlafbereich, Oberflächen und sichtbare Details werden auf den nächsten Aufenthalt ausgerichtet.",
        },
        {
          title: "Kontrollpunkte dokumentieren",
          text: "Fotos und Hinweise helfen, Zustand, Auffälligkeiten oder fehlendes Material früh zu erkennen.",
        },
        {
          title: "Schlüssel und Check-in mitdenken",
          text: "Schlüsselbox, Übergabeweg oder Zugangslogik werden als Teil des Turnovers betrachtet.",
        },
      ],
    },
    workflow: [
      { label: "01", title: "Apartmentprofil anlegen", text: "Adresse, Zugang, Standardliste, Wäschelogik, Fotos und Besonderheiten einmal sauber definieren." },
      { label: "02", title: "Turnover auslösen", text: "Checkout, Check-in, gewünschte Rückmeldung und mögliche Extras werden je Einsatz bestätigt." },
      { label: "03", title: "Vor Ort vorbereiten", text: "Reinigung, Sichtkontrolle, Schlüsselweg und vereinbarte Fotos laufen in einer Reihenfolge." },
      { label: "04", title: "Host-Status senden", text: "Der Host bekommt eine klare Meldung: bereit, auffällig oder Rückfrage nötig." },
    ],
    benefits: [
      { title: "Bewertungsrisiko sinkt", text: "Wiederkehrende Kontrollpunkte reduzieren übersehene Details." },
      { title: "Host bleibt steuerungsfähig", text: "Fotos und Status ersetzen Bauchgefühl." },
      { title: "Mehr als Reinigung", text: "Der Service denkt Zugang, Vorbereitung und Gästeerlebnis mit." },
      { title: "Skalierbar nach Objekt", text: "Für einzelne Apartments oder mehrere Einheiten nach Verfügbarkeit." },
    ],
    guarantees: [
      "Keine Hotelwäsche-Zusage ohne geklärten Wäscheweg",
      "Keine Reparaturen oder Schadensregulierung ohne Freigabe",
      "Fotohinweise nach vereinbartem Umfang",
      "Klare Grenze zwischen Reinigung, Kontrolle und Gastgeberpflicht",
    ],
    faq: [
      {
        q: "Übernimmt FLOXANT komplette Airbnb-Gästewechsel?",
        a: "Ja, wenn Objektprofil, Zugang, Zeitfenster und Leistungsumfang geklärt sind. Typisch sind Reinigung, Vorbereitung, Kontrolle, Fotos und Schlüsselmanagement.",
      },
      {
        q: "Kann FLOXANT Bettwäsche wechseln?",
        a: "Das ist möglich, wenn Wäschebestand, Lagerort, Waschweg und Qualitätsgrenze vorher klar definiert sind. Ohne geklärten Wäscheprozess wird keine falsche Zusage gemacht.",
      },
      {
        q: "Ist der Service nur für Airbnb?",
        a: "Nein. Er passt auch für Ferienwohnungen, Kurzzeitvermietung, möblierte Apartments und Boardinghouse-nahe Einheiten.",
      },
      {
        q: "Wer haftet für Schäden durch Gäste?",
        a: "FLOXANT kann sichtbare Auffälligkeiten dokumentieren. Schadensbewertung, Regulierung und Plattformkommunikation bleiben beim Gastgeber oder Eigentümer.",
      },
    ],
    related: ["urlaubsretter", "leerstandsmanagement", "property-operations"],
    blogIdeas: [
      { title: "Airbnb-Gästewechsel: Welche Punkte Hosts nicht dem Zufall überlassen sollten", angle: "Turnover-Checkliste für Regensburg." },
      { title: "Warum Fotos nach dem Gästewechsel wertvoller sind als ein kurzes 'alles sauber'", angle: "Dokumentation als Host-Schutz." },
      { title: "Schlüsselmanagement bei Kurzzeitvermietung", angle: "Risiken, Zugangswege und klare Verantwortlichkeiten." },
    ],
  },
  leerstandsmanagement: {
    slug: "leerstandsmanagement",
    path: "/leerstandsmanagement",
    serviceName: "Leerstandsmanagement",
    shortName: "Leerstandsmanagement",
    seoTitle: "Leerstandsmanagement Regensburg | Kontrolle & Bericht",
    metaDescription:
      "Leerstandsmanagement von FLOXANT: Kontrollen, Lüften, Fotos, Zustandsberichte und Objektbetreuung für leerstehende Wohnungen in Regensburg, Oberpfalz und Bayern.",
    keywords: [
      "Leerstandsmanagement Regensburg",
      "Leerstandskontrolle Bayern",
      "Wohnung kontrollieren lassen",
      "Immobilie lüften lassen",
      "Zustandsbericht Wohnung",
    ],
    accent: "#a78bfa",
    image: {
      src: `${assetBase}/leerstandsmanagement.png`,
      alt: "Leere moderne Wohnung mit Tablet, Kontrollfotos und Dokumentation",
      concept:
        "Moderne leere Wohnung, Tablet mit Dokumentation, Kontrollfotos und ruhige Objektbetreuung.",
    },
    hero: {
      eyebrow: "Leerstand ohne Kontrollverlust",
      headline: "Auch wenn niemand dort wohnt, bleibt Ihre Immobilie nicht unbeobachtet.",
      subheadline:
        "FLOXANT kontrolliert leerstehende Wohnungen und Immobilien nach vereinbartem Rhythmus: lüften, prüfen, fotografieren, dokumentieren und Auffälligkeiten melden.",
      promise: "Sie müssen nicht vor Ort sein, um den Zustand zu kennen.",
      metrics: [
        { label: "Typischer Anlass", value: "Leerstand, Verkauf, Erbe" },
        { label: "Fokus", value: "Kontrolle + Dokumentation" },
        { label: "Region", value: "Regensburg, Oberpfalz, Bayern" },
      ],
    },
    problem: {
      title: "Leerstand fühlt sich ruhig an, bis etwas unbemerkt passiert.",
      intro:
        "Unbewohnte Immobilien brauchen keine tägliche Betreuung, aber sie brauchen Aufmerksamkeit. Geruch, Feuchtigkeit, Post, Fenster, Heizung, Spuren im Objekt oder kleine Schäden werden teuer, wenn sie zu spät auffallen.",
      worries: [
        "Die Wohnung steht leer, aber niemand schafft regelmäßige Kontrollgänge.",
        "Eigentümer, Erben oder Verwalter wohnen nicht in der Nähe.",
        "Vor Verkauf, Neuvermietung oder Sanierung soll der Zustand belegbar bleiben.",
        "Es fehlt ein ruhiger Blick vor Ort, der nicht erst bei Problemen aktiv wird.",
      ],
    },
    stress: [
      {
        title: "Distanz macht unsicher",
        text: "Wer weit weg ist, muss sich auf Vermutungen, Nachbarn oder spontane Fahrten verlassen.",
      },
      {
        title: "Kleine Schäden wachsen still",
        text: "Feuchtigkeit, Geruch oder offene Fenster werden nicht lauter, nur größer.",
      },
      {
        title: "Es fehlen Belege",
        text: "Ohne Fotos und Statusnotizen lässt sich später schwer zeigen, wann welcher Zustand vorlag.",
      },
    ],
    solution: {
      title: "FLOXANT macht Leerstand sichtbar und steuerbar.",
      intro:
        "Leerstandsmanagement ist kein Hausmeister-Abo von der Stange. Es ist ein objektbezogener Kontrollprozess mit klaren Punkten, sauberer Dokumentation und schnellem Hinweis bei Auffälligkeiten.",
      points: [
        {
          title: "Kontrollrhythmus definieren",
          text: "Einmalig, wöchentlich, zweiwöchentlich oder nach Ereignis: Der Rhythmus richtet sich nach Objekt, Risiko und Ziel.",
        },
        {
          title: "Zustand prüfen",
          text: "Lüften, sichtbare Schäden, Fenster, Türen, Geruch, Post, Heizung und Auffälligkeiten werden nach Liste betrachtet.",
        },
        {
          title: "Bericht liefern",
          text: "Fotos und kurze Statusnotizen geben Eigentümern, Verwaltern oder Bevollmächtigten Kontrolle zurück.",
        },
      ],
    },
    workflow: [
      { label: "01", title: "Objektprofil klären", text: "Adresse, Zugang, Berechtigung, Räume, Risiken und gewünschte Kontrollpunkte festlegen." },
      { label: "02", title: "Rhythmus planen", text: "Einmaliger Check oder wiederkehrende Betreuung nach Verfügbarkeit und Objektlage." },
      { label: "03", title: "Vor Ort kontrollieren", text: "Lüften, Sichtprüfung, Fotopunkte und Auffälligkeiten strukturiert abarbeiten." },
      { label: "04", title: "Bericht senden", text: "Status, Fotos und Hinweise kommen in einer Form, mit der Entscheidungen möglich sind." },
    ],
    benefits: [
      { title: "Sicherheit auf Distanz", text: "Eigentümer und Verwalter bekommen Kontrolle, ohne selbst fahren zu müssen." },
      { title: "Bessere Nachvollziehbarkeit", text: "Regelmäßige Fotos und Notizen schaffen eine klare Objektchronik." },
      { title: "Frühere Reaktion", text: "Auffälligkeiten werden gemeldet, bevor sie zum großen Problem werden." },
      { title: "Stark vor Verkauf", text: "Ein gepflegter Leerstand wirkt geordneter bei Besichtigung, Übergabe oder Wiedervermietung." },
    ],
    guarantees: [
      "Keine Schlüsselannahme ohne Berechtigung",
      "Keine verdeckte Hausverwaltung",
      "Keine Reparaturzusage ohne gesonderte Freigabe",
      "Dokumentation nach vereinbartem Kontrollumfang",
    ],
    faq: [
      {
        q: "Was gehört zum Leerstandsmanagement?",
        a: "Typisch sind Kontrollgänge, Lüften, Sichtprüfung, Fotos, Zustandsnotizen, Hinweise zu Auffälligkeiten und optional die Vorbereitung weiterer Schritte wie Reinigung oder Übergabe.",
      },
      {
        q: "Kann FLOXANT regelmäßig kontrollieren?",
        a: "Ja, wiederkehrende Kontrollen sind nach Objektlage, Zugang und Verfügbarkeit möglich. Der Rhythmus wird vorher festgelegt.",
      },
      {
        q: "Übernimmt FLOXANT Reparaturen?",
        a: "Nein, nicht automatisch. FLOXANT kann Auffälligkeiten dokumentieren und auf Wunsch weitere Schritte koordinieren, aber Reparaturen brauchen eine eigene Freigabe und passende Fachbetriebe.",
      },
      {
        q: "Für welche Immobilien ist das geeignet?",
        a: "Für Wohnungen, Häuser, Apartments, Nachlassobjekte, Verkaufsimmobilien und leerstehende Einheiten von Eigentümern oder Hausverwaltungen.",
      },
    ],
    related: ["property-operations", "objekt-springer", "airbnb-turnover-express"],
    blogIdeas: [
      { title: "Leerstehende Wohnung kontrollieren lassen: Worauf Eigentümer achten sollten", angle: "Risiken und Kontrollpunkte." },
      { title: "Warum Lüften im Leerstand kein Nebenthema ist", angle: "Geruch, Feuchtigkeit und Eindruck vor Verkauf." },
      { title: "Zustandsberichte für Immobilien: Welche Fotos wirklich helfen", angle: "Dokumentation für Eigentümer und Verwalter." },
    ],
  },
  "business-errand-service": {
    slug: "business-errand-service",
    path: "/business-errand-service",
    serviceName: "Erledigungsservice für Unternehmen",
    shortName: "Erledigungen für Firmen",
    seoTitle: "Erledigungsservice für Unternehmen Regensburg | Vor-Ort-Aufgaben",
    metaDescription:
      "FLOXANT erledigt kleine Vor-Ort-Aufgaben für Unternehmen: Dokumente abholen, Schlüssel übergeben, Material bringen oder etwas vor Ort prüfen.",
    keywords: [
      "Erledigungsservice Unternehmen Regensburg",
      "Dokumente abholen lassen",
      "Schlüssel transportieren Firma",
      "Vor Ort Kontrolle Unternehmen",
      "Aufgaben vor Ort Bayern",
    ],
    accent: "#fb7185",
    image: {
      src: `${assetBase}/business-errand-service.png`,
      alt: "Dokumententasche, Schlüsselbox und Mappe für Unternehmenswege",
      concept:
        "Dokumententasche, Schlüsselbox, Logistikmappe und strukturierte Übergabeobjekte ohne Personen.",
    },
    hero: {
      eyebrow: "Außenstelle für kleine Aufgaben",
      headline: "Wenn Ihr Team nicht hinfahren muss, sollte es das auch nicht tun.",
      subheadline:
        "Dokumente abholen, Schlüssel transportieren, Material übergeben, Objekt kurz prüfen: FLOXANT übernimmt kleine reale Wege, die im Alltag zu viel Zeit kosten.",
      promise: "Kleine Aufgabe auslagern, den Kopf wieder frei bekommen.",
      metrics: [
        { label: "Typischer Anlass", value: "Kleiner Weg, hoher Kontext" },
        { label: "Fokus", value: "Abholen, bringen, prüfen" },
        { label: "Kunden", value: "Büros, Praxen, Verwaltungen" },
      ],
    },
    problem: {
      title: "Nicht jede wichtige Aufgabe braucht eigenes Personal.",
      intro:
        "Unternehmen verlieren viel Zeit mit Wegen, die zu klein für ein Projekt und zu wichtig für Zufall sind. Genau diese Lücke blockiert Teams: Schlüssel, Unterlagen, Material, Fotoprüfung oder kurze Objektwege.",
      worries: [
        "Ein Mitarbeiter fährt quer durch die Stadt für eine Übergabe von zehn Minuten.",
        "Dokumente, Schlüssel oder Material müssen kontrolliert ankommen.",
        "Vor Ort soll etwas geprüft werden, aber niemand ist in der Nähe.",
        "Die Aufgabe ist zu individuell für Paketdienst, aber zu klein für einen großen Auftrag.",
      ],
    },
    stress: [
      {
        title: "Zeit wird unsichtbar verbrannt",
        text: "Anfahrt, Parkplatz, Wartezeit und Rückmeldung fressen mehr Ressourcen als die Aufgabe selbst.",
      },
      {
        title: "Übergaben brauchen Verantwortung",
        text: "Schlüssel, Unterlagen und Material dürfen nicht einfach irgendwo landen.",
      },
      {
        title: "Vor-Ort-Realität fehlt",
        text: "Manchmal braucht es keinen Berater, sondern Augen, Fotos und eine klare Rückmeldung.",
      },
    ],
    solution: {
      title: "FLOXANT fährt hin, erledigt es und meldet zurück.",
      intro:
        "Manche Aufgaben sind zu wichtig für Zuruf und zu klein für ein eigenes Projekt. Genau dafür ist dieser Service gedacht: abholen, bringen, prüfen, fotografieren, rückmelden.",
      points: [
        {
          title: "Aufgabe präzise definieren",
          text: "Was wird abgeholt, gebracht, geprüft oder dokumentiert? Wer darf übergeben? Was gilt als erledigt?",
        },
        {
          title: "Weg kontrolliert ausführen",
          text: "FLOXANT führt den Auftrag mit klarer Kontakt- und Übergabelogik aus.",
        },
        {
          title: "Rückmeldung liefern",
          text: "Status, Foto oder Übergabenotiz geben dem Unternehmen sofort Entscheidungssicherheit.",
        },
      ],
    },
    workflow: [
      { label: "01", title: "Aufgabe senden", text: "Ort, Kontaktperson, Gegenstand, Zeitfenster und gewünschte Bestätigung mitteilen." },
      { label: "02", title: "Risiko klären", text: "FLOXANT prüft Wert, Berechtigung, Datenschutz, Haftungsgrenzen und praktische Machbarkeit." },
      { label: "03", title: "Aufgabe erledigen", text: "Abholung, Übergabe, Vor-Ort-Check oder Materialweg werden sauber erledigt." },
      { label: "04", title: "Status schließen", text: "Nach Abschluss kommt eine knappe Rückmeldung mit Beleg, Foto oder Hinweis." },
    ],
    benefits: [
      { title: "Teamzeit bleibt im Unternehmen", text: "Mitarbeiter fahren nicht für Aufgaben los, die extern sauber lösbar sind." },
      { title: "Mehr Verlässlichkeit als Zuruf", text: "Aufgabe, Übergabe und Status sind klar definiert." },
      { title: "Besser als Standardversand", text: "Wenn Kontext, Zugang oder persönliche Übergabe nötig sind, hilft ein Mensch vor Ort." },
      { title: "Regional steuerbar", text: "Besonders stark im Raum Regensburg, Oberpfalz und Bayern nach Verfügbarkeit." },
    ],
    guarantees: [
      "Keine vertraulichen Inhalte ohne klare Freigabe",
      "Keine Bargeld- oder Hochwerttransporte ohne gesonderte Prüfung",
      "Keine rechtliche Zustellung im formalen Sinn",
      "Übergaben nur mit nachvollziehbarem Auftrag",
    ],
    faq: [
      {
        q: "Was übernimmt FLOXANT für Unternehmen?",
        a: "Kleine Aufgaben, die vor Ort erledigt werden müssen: abholen, bringen, prüfen, fotografieren, dokumentieren oder übergeben.",
      },
      {
        q: "Kann FLOXANT Schlüssel transportieren?",
        a: "Ja, wenn Auftraggeber, Berechtigung, Übergabeweg, Zielperson und Haftungsgrenzen eindeutig geklärt sind.",
      },
      {
        q: "Ist das ein Kurierdienst?",
        a: "Nicht klassisch. FLOXANT ist sinnvoll, wenn neben Transport auch Kontext, Zugang, Foto, Kontrolle oder persönliche Übergabe wichtig sind.",
      },
      {
        q: "Für welche Unternehmen ist das geeignet?",
        a: "Für Büros, Agenturen, Praxen, Hausverwaltungen, Immobilienunternehmen, Dienstleister und Teams mit kleinen, aber nervigen Vor-Ort-Aufgaben.",
      },
    ],
    related: ["human-api", "objekt-springer", "urlaubsretter"],
    blogIdeas: [
      { title: "Welche Aufgaben Unternehmen besser nicht intern erledigen sollten", angle: "Zeitfresser im Alltag erkennen." },
      { title: "Schlüssel, Dokumente, Material: Wie sichere Übergaben funktionieren", angle: "Business-Checkliste." },
      { title: "Warum jemand vor Ort manchmal schneller hilft als zehn E-Mails", angle: "Praktische Beispiele aus dem Firmenalltag." },
    ],
  },
  "human-api": {
    slug: "human-api",
    path: "/human-api",
    serviceName: "Vor-Ort-Prüfung",
    shortName: "Vor-Ort-Prüfung",
    seoTitle: "Vor-Ort-Prüfung Regensburg | Fotos, Kontrolle, Rückmeldung",
    metaDescription:
      "FLOXANT fährt hin, prüft den Zustand, macht Fotos nach Absprache und meldet zurück. Für Firmen, Verwaltungen und Teams ohne Person vor Ort.",
    keywords: [
      "Vor Ort Prüfung Regensburg",
      "Vor Ort Prüfung buchen",
      "Foto Dokumentation Objekt",
      "Objektkontrolle Bayern",
      "Bestandsaufnahme vor Ort",
    ],
    accent: "#2dd4bf",
    image: {
      src: `${assetBase}/human-api.png`,
      alt: "Smartphone mit Objektfotos und Checkliste",
      concept:
        "Smartphone, Objektfotos und Checkliste für eine klare Rückmeldung vom Objekt.",
    },
    hero: {
      eyebrow: "Jemand schaut vor Ort nach",
      headline: "Wenn niemand von Ihnen hinfahren kann, fährt FLOXANT.",
      subheadline:
        "Wir prüfen nach Absprache, machen Fotos, zählen einfache Bestände, kontrollieren Schlüssel oder melden den Zustand zurück. Praktisch, wenn Ihr Team nicht vor Ort ist.",
      promise: "Sie schicken die Aufgabe. Wir prüfen vor Ort und melden zurück.",
      metrics: [
        { label: "Typischer Anlass", value: "Niemand ist vor Ort" },
        { label: "Fokus", value: "Check, Foto, Status" },
        { label: "Modell", value: "Menschliche Ausführung" },
      ],
    },
    problem: {
      title: "Ein Foto von heute ist oft mehr wert als zehn Vermutungen.",
      intro:
        "Digitale Meldungen enden oft an der physischen Welt. Jemand muss hin, prüfen, fotografieren, zählen oder bestätigen. Genau dort entsteht Reibung.",
      worries: [
        "Ein Team entscheidet remote, hat aber keine aktuellen Objektfotos.",
        "Material, Schlüssel, Zustand oder Bestand müssen real geprüft werden.",
        "Eine App zeigt einen Status, aber niemand weiß, ob er stimmt.",
        "Für eine kleine Vor-Ort-Prüfung lohnt sich kein eigener Mitarbeiter-Einsatz.",
      ],
    },
    stress: [
      {
        title: "Digitale Tickets bleiben abstrakt",
        text: "Ohne Vor-Ort-Status entstehen Rückfragen, Vermutungen und falsche Entscheidungen.",
      },
      {
        title: "Remote braucht Vertrauen",
        text: "Wer nicht selbst dort ist, braucht Fotos, klare Notizen und eine saubere Ausführung.",
      },
      {
        title: "Die Aufgabe ist zu klein für Projektlogik",
        text: "Trotzdem ist sie wichtig genug, um sie nicht zufällig zu lösen.",
      },
    ],
    solution: {
      title: "FLOXANT prüft vor Ort und gibt eine klare Rückmeldung.",
      intro:
        "Sie sagen uns, was geprüft werden soll. Wir klären Zugang, Berechtigung und Grenzen. Danach fährt jemand hin und meldet das Ergebnis verständlich zurück.",
      points: [
        {
          title: "Prüfpunkte übersetzen",
          text: "Aus einem digitalen Auftrag werden einfache, vor Ort ausführbare Kontrollpunkte.",
        },
        {
          title: "Menschliche Wahrnehmung nutzen",
          text: "Fotos, Sichtprüfung, Zählen, Beschreiben und Kontext lassen sich nicht vollständig automatisieren.",
        },
        {
          title: "Daten zurückspielen",
          text: "Der Auftraggeber erhält Status, Fotos und Hinweise in einer verwertbaren Form.",
        },
      ],
    },
    workflow: [
      { label: "01", title: "Prüfauftrag formulieren", text: "Was soll gesehen, gezählt, fotografiert oder bestätigt werden?" },
      { label: "02", title: "Ausführbarkeit prüfen", text: "FLOXANT klärt Zugang, Sicherheit, Datenschutz, Berechtigung und Zeitfenster." },
      { label: "03", title: "Vor Ort erfassen", text: "Die Aufgabe wird nach Checkliste mit Foto- oder Statuspunkten abgearbeitet." },
      { label: "04", title: "Resultat liefern", text: "Das Ergebnis kommt als klare Rückmeldung, nicht als lose Chatnachricht." },
    ],
    benefits: [
      { title: "Schnellere Entscheidungen", text: "Remote-Teams bekommen reale Daten statt Vermutungen." },
      { title: "Weniger Wege", text: "Nicht jede kleine Prüfung braucht eigenes Personal." },
      { title: "Klare Datenpunkte", text: "Fotos, Status und Hinweise werden vorher definiert." },
      { title: "Klare Rückmeldung", text: "Sie bekommen Fotos, Status und Hinweise statt Vermutungen." },
    ],
    guarantees: [
      "Keine verdeckte Überwachung",
      "Keine Prüfung ohne Berechtigung und Zugang",
      "Keine Fachgutachten ohne qualifizierte Stelle",
      "Datenschutz- und Fotogrenzen werden vorab geklärt",
    ],
    faq: [
      {
        q: "Was bedeutet Vor-Ort-Prüfung bei FLOXANT?",
        a: "Sie geben eine konkrete Aufgabe: prüfen, fotografieren, kontrollieren, zählen oder dokumentieren. FLOXANT fährt hin und meldet das Ergebnis zurück.",
      },
      {
        q: "Ist das eine Software?",
        a: "Nein. Es geht um echte Aufgaben vor Ort. Gerade dann, wenn ein digitales Ticket nicht reicht und jemand den Zustand selbst sehen muss.",
      },
      {
        q: "Kann FLOXANT Bestände aufnehmen?",
        a: "Einfache Sicht- und Zählaufgaben können geprüft werden. Komplexe Inventuren, Warenbewertungen oder rechtliche Gutachten brauchen gesonderte Vereinbarung.",
      },
      {
        q: "Für wen ist der Service gedacht?",
        a: "Für Unternehmen, Immobilienakteure, Remote-Teams, Plattformen und Dienstleister, die kontrollierte Vor-Ort-Informationen brauchen.",
      },
    ],
    related: ["business-errand-service", "objekt-springer", "property-operations"],
    blogIdeas: [
      { title: "Warum Unternehmen manchmal einfach jemanden vor Ort brauchen", angle: "Prüfen, fotografieren, zählen und zurückmelden." },
      { title: "Foto-Dokumentation richtig beauftragen", angle: "Welche Motive, Blickwinkel und Notizen nützlich sind." },
      { title: "Wie kleine Vor-Ort-Prüfungen Entscheidungen beschleunigen", angle: "Praxisfälle für Objekt, Material und Bestand." },
    ],
  },
  "property-operations": {
    slug: "property-operations",
    path: "/property-operations",
    serviceName: "Immobilienbetreuung vor Ort",
    shortName: "Immobilienbetreuung",
    seoTitle: "Immobilienbetreuung Regensburg | Schlüssel, Übergabe, Kontrolle",
    metaDescription:
      "Immobilienbetreuung von FLOXANT: Schlüssel, Übergaben, Leerstandskontrolle, Reinigung, Fotos und kurzfristige Aufgaben vor Ort.",
    keywords: [
      "Immobilienbetreuung Regensburg",
      "Immobilienbetrieb Bayern",
      "Schlüsselmanagement Immobilien",
      "Übergabe Leerstand Reinigung",
      "Schlüssel Übergabe Reinigung Kontrolle",
    ],
    accent: "#60a5fa",
    image: {
      src: `${assetBase}/property-operations.png`,
      alt: "Schlüssel, Immobilienübersicht und Kontrollbericht",
      concept:
        "Schlüssel, Objektübersicht, Fotos und Kontrollbericht für Immobilien vor Ort.",
    },
    hero: {
      eyebrow: "Immobilie zuverlässig betreuen",
      headline: "Schlüssel, Übergabe, Reinigung und Kontrolle aus einer Hand.",
      subheadline:
        "Wenn niemand regelmäßig vor Ort ist, kümmert sich FLOXANT um klare Aufgaben: Schlüssel klären, Zustand prüfen, Fotos senden, Reinigung organisieren und Übergaben vorbereiten.",
      promise: "Ein Ansprechpartner. Klare Aufgaben. Verständliche Rückmeldung.",
      metrics: [
        { label: "Leistung", value: "Betreuung vor Ort" },
        { label: "Fokus", value: "Immobilie handlungsfähig halten" },
        { label: "Für wen", value: "Eigentümer, Verwaltungen, Firmen" },
      ],
    },
    problem: {
      title: "Immobilien scheitern selten an einer großen Sache.",
      intro:
        "Meist sind es viele kleine Schnittstellen: Schlüssel, Reinigung, Fotos, Leerstand, Übergabe, Rückfrage, Kontrolle, Notfall. Wer alles einzeln organisiert, verliert Zeit, Überblick und Verantwortlichkeit.",
      worries: [
        "Für jeden kleinen Schritt wird ein anderer Dienstleister gesucht.",
        "Niemand hält den Gesamtstatus von Objekt, Schlüssel, Reinigung und Übergabe zusammen.",
        "Eigentümer, Verwalter oder Firmen müssen immer wieder dieselben Informationen erklären.",
        "Wenn etwas kippt, ist unklar, wer wirklich hinfährt und sich kümmert.",
      ],
    },
    stress: [
      {
        title: "Schnittstellen kosten Kontrolle",
        text: "Viele Beteiligte bedeuten viele Übergaben, viele Missverständnisse und wenig Gesamtverantwortung.",
      },
      {
        title: "Immobilien brauchen physische Ausführung",
        text: "Digitale Tools helfen, aber jemand muss Türen öffnen, Zustände sehen und Aufgaben erledigen.",
      },
      {
        title: "Notfälle passen nicht in Standardprozesse",
        text: "Ausfall, Leerstand, Übergabe oder Gästewechsel brauchen jemanden, der kurzfristig vor Ort handeln kann.",
      },
    ],
    solution: {
      title: "FLOXANT bündelt die Aufgaben, die vor Ort erledigt werden müssen.",
      intro:
        "Statt für Schlüssel, Reinigung, Kontrolle und Fotos jedes Mal neu jemanden zu suchen, werden die Aufgaben sauber zusammengeführt. Umfang, Grenzen und Rückmeldung werden vorher geklärt.",
      points: [
        {
          title: "Objektlogik statt Einzelauftrag",
          text: "Jede Immobilie bekommt Kontext: Zugang, Ansprechpartner, Risiken, Kontrollpunkte, Dokumentation und passende Einsatzwege.",
        },
        {
          title: "Leistungen kombinieren",
          text: "Objektvertretung, Leerstandsmanagement, Vor-Ort-Prüfung, Erledigungsservice und Reinigung können je nach Lage zusammenarbeiten.",
        },
        {
          title: "Verantwortung sichtbar machen",
          text: "Status, Fotos und nächste Schritte werden so aufbereitet, dass Eigentümer und Unternehmen Entscheidungen treffen können.",
        },
      ],
    },
    workflow: [
      { label: "01", title: "Objekt aufnehmen", text: "Adresse, Zugang, Schlüssel, Ansprechpartner, Nutzungsart, Risiken und Zielzustand definieren." },
      { label: "02", title: "Aufgaben festlegen", text: "Welche Punkte sind sinnvoll: Kontrolle, Reinigung, Übergabe, Gästewechsel, Erledigungen oder kurzfristige Hilfe?" },
      { label: "03", title: "Einsätze steuern", text: "FLOXANT führt Aufgaben nach Plan oder Anlass aus und hält Grenzen, Freigaben und Dokumentation klar." },
      { label: "04", title: "Status verfügbar machen", text: "Der Auftraggeber erhält Rückmeldungen, Berichte und Hinweise für die nächsten Entscheidungen." },
    ],
    benefits: [
      { title: "Ein Ansprechpartner", text: "Weniger Reibung zwischen Reinigung, Kontrolle, Schlüssel und Übergabe." },
      { title: "Mehr Ruhe im Ablauf", text: "Schlüssel, Reinigung, Kontrolle und Übergabe laufen nicht mehr lose nebeneinander." },
      { title: "Bessere Dokumentation", text: "Fotos, Status und Objektwissen bauen sich über Zeit auf." },
      { title: "Schneller reagieren", text: "Wenn kurzfristig etwas kippt, ist der nächste Schritt schon geklärt." },
    ],
    guarantees: [
      "Kein Facility-Management-Vollversprechen ohne definierten Umfang",
      "Keine Verwaltungsvollmacht ohne gesonderte Vereinbarung",
      "Keine Facharbeiten ohne passende Qualifikation",
      "Jede Leistung wird mit Grenze, Zugang und Freigabe definiert",
    ],
    faq: [
      {
        q: "Was bedeutet Immobilienbetreuung bei FLOXANT?",
        a: "FLOXANT übernimmt klar vereinbarte Aufgaben vor Ort: Schlüssel, Übergaben, Leerstand, Reinigung, Fotos, Kontrollen und kurzfristige Einsätze.",
      },
      {
        q: "Ist das Facility Management?",
        a: "Nein, nicht als vollständiges Facility Management. FLOXANT übernimmt klar definierte Aufgaben vor Ort. Umfang, Grenzen und Verantwortlichkeiten werden vorher festgelegt.",
      },
      {
        q: "Für wen ist die Immobilienbetreuung geeignet?",
        a: "Für Eigentümer, Hausverwaltungen, Unternehmen, Hosts, Makler und Teams, die nicht immer selbst vor Ort sein können.",
      },
      {
        q: "Kann man mit einer einzelnen Leistung starten?",
        a: "Ja. Viele starten mit Leerstandsmanagement, Objektvertretung, Gästewechsel-Service oder einer Vor-Ort-Prüfung und erweitern später.",
      },
    ],
    related: ["leerstandsmanagement", "objekt-springer", "human-api"],
    blogIdeas: [
      { title: "Immobilienbetreuung: Welche Aufgaben sich bündeln lassen", angle: "Schlüssel, Reinigung, Kontrolle und Übergabe praktisch erklären." },
      { title: "Schlüsselmanagement, Reinigung und Kontrolle aus einer Hand", angle: "Wie weniger Schnittstellen Risiko senken." },
      { title: "Ein Ansprechpartner für viele kleine Objektaufgaben", angle: "Warum weniger Schnittstellen oft besser funktionieren." },
    ],
  },
} satisfies Record<PropertyOperationsSlug, PropertyOperationsPage>;

export const propertyOperationsSlugs = Object.keys(propertyOperationsPages) as PropertyOperationsSlug[];

export const propertyOperationsList = propertyOperationsSlugs.map(
  (slug) => propertyOperationsPages[slug],
);

export function getPropertyOperationsPage(slug: PropertyOperationsSlug) {
  return propertyOperationsPages[slug];
}

export function createPropertyOperationsMetadata(slug: PropertyOperationsSlug): Metadata {
  const page = getPropertyOperationsPage(slug);
  const metadata = generatePageSEO({
    lang: "de",
    path: page.path,
    title: page.seoTitle,
    description: page.metaDescription,
    keywords: page.keywords,
  });
  const imageUrl = `${company.url}${page.image.src}`;

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      title: page.seoTitle,
      description: page.metaDescription,
      url: `${company.url}${page.path}`,
      images: [{ url: imageUrl, width: 1600, height: 1000, alt: page.image.alt }],
    },
    twitter: {
      ...metadata.twitter,
      title: page.seoTitle,
      description: page.metaDescription,
      images: [imageUrl],
    },
  };
}
