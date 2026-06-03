import type { StrategicBlogArticle } from "@/lib/strategic-blog-articles";

export type PsychologicalCleaningFaq = {
  q: string;
  a: string;
};

export type PsychologicalCleaningProcessStep = {
  title: string;
  text: string;
};

export type PsychologicalCleaningArticleSeed = {
  articleSlug: string;
  category: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  keywordFocus: readonly string[];
  readerProblem: string;
  practicalAngle: string;
  checklist: readonly string[];
};

export type PsychologicalCleaningLandingPage = {
  slug: string;
  serviceName: string;
  shortName: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  primaryCta: string;
  whatsappText: string;
  emotionalPromise: string;
  localNote: string;
  problemTitle: string;
  worries: readonly string[];
  conflicts: readonly string[];
  stressSituations: readonly string[];
  solutionIntro: string;
  solutionSteps: readonly PsychologicalCleaningProcessStep[];
  whyItWorks: readonly string[];
  trustSignals: readonly string[];
  guarantees: readonly string[];
  processSteps: readonly PsychologicalCleaningProcessStep[];
  faqItems: readonly PsychologicalCleaningFaq[];
  relatedSlugs: readonly string[];
  searchIntents: readonly string[];
  supportingArticles: readonly PsychologicalCleaningArticleSeed[];
};

const sharedDate = "29. Mai 2026";
const sharedDatePublished = "2026-05-29";

const visibleProtocolArticles: PsychologicalCleaningArticleSeed[] = [
  {
    articleSlug: "saubere-fotos-vor-wohnungsuebergabe",
    category: "Uebergabe",
    title: "Warum saubere Fotos vor der Wohnungsuebergabe Streit sparen koennen",
    metaTitle: "Saubere Fotos vor der Wohnungsuebergabe | FLOXANT",
    description:
      "Welche Fotos bei Reinigung und Wohnungsuebergabe in Regensburg wirklich helfen und warum Dokumentation Diskussionen ruhiger macht.",
    intro:
      "Vor einer Wohnungsuebergabe werden Details schnell zu Diskussionen. Fotos sind kein Rechtsersatz, aber sie machen sichtbarer, was gereinigt, geprueft und offen geblieben ist.",
    keywordFocus: ["Wohnungsuebergabe Fotos", "Reinigung dokumentieren", "Regensburg"],
    readerProblem:
      "Mieter sind unsicher, ob Vermieter oder Hausverwaltung den Zustand spaeter anders bewerten.",
    practicalAngle:
      "Der Artikel zeigt, welche Bildbereiche sinnvoll sind und warum Fotos vor allem Reihenfolge und Zustand klaeren.",
    checklist: [
      "Kueche, Bad, Boden, Fensterbereiche und Tueren einzeln festhalten",
      "Nebenflaechen wie Keller, Balkon und Abstellraum nicht vergessen",
      "Nach Reinigung und vor Schluesselabgabe denselben Blickwinkel nutzen",
      "Fotos nicht beschriften wie ein Streitbeweis, sondern als ruhige Zustandsnotiz sammeln",
    ],
  },
  {
    articleSlug: "reinigungsergebnis-dokumentieren-regensburg",
    category: "Reinigung",
    title: "Reinigungsergebnis dokumentieren: welche Bilder wirklich helfen",
    metaTitle: "Reinigungsergebnis dokumentieren | FLOXANT Regensburg",
    description:
      "Ein praktischer Leitfaden fuer Regensburg: Welche Fotos nach Reinigung, Auszug oder Objektservice aussagekraeftig sind.",
    intro:
      "Viele machen nach der Reinigung wahllos Bilder. Besser ist ein kurzer Plan: sichtbare Flächen, kritische Stellen und offene Punkte getrennt dokumentieren.",
    keywordFocus: ["Reinigung Ergebnis dokumentieren", "Endreinigung Regensburg"],
    readerProblem:
      "Das Ergebnis wirkt sauber, aber der Kunde weiss nicht, ob die wichtigen Stellen wirklich sichtbar belegt sind.",
    practicalAngle:
      "Der Artikel trennt Ergebnisfotos, Detailfotos und offene Hinweise, damit aus Bildern ein verstaendlicher Abschluss wird.",
    checklist: [
      "Erst Gesamtansicht, dann Details aufnehmen",
      "Kritische Stellen wie Armaturen, Herd, Duschbereich und Sockel separat fotografieren",
      "Offene Punkte ehrlich markieren statt verstecken",
      "Fotos direkt nach Abschluss erstellen, bevor wieder Nutzung entsteht",
    ],
  },
  {
    articleSlug: "sichtbare-sauberkeit-vermietertermin",
    category: "Vermietertermin",
    title: "Sichtbare Sauberkeit: worauf Vermieter zuerst schauen",
    metaTitle: "Sichtbare Sauberkeit vor Vermietertermin | FLOXANT",
    description:
      "Welche Bereiche bei Wohnungsuebergabe, Endreinigung und Vermietertermin in Regensburg zuerst auffallen.",
    intro:
      "Bei einer Uebergabe entscheidet selten ein makelloser Gesamteindruck allein. Oft sind es wenige sichtbare Punkte, an denen sich ein Gespraech festhaelt.",
    keywordFocus: ["Vermietertermin Reinigung", "Endreinigung vor Uebergabe"],
    readerProblem:
      "Kurz vor dem Termin fehlt der Blick dafuer, welche Stellen wirklich entscheidend sind.",
    practicalAngle:
      "Der Artikel ordnet typische Blickpunkte ein und zeigt, wie ein sichtbar sauberer Abschluss vorbereitet wird.",
    checklist: [
      "Bad, Kueche und Boden zuerst bewerten",
      "Lichtschalter, Tueren, Rahmen und Sockel nicht auslassen",
      "Fenster nur dann priorisieren, wenn sie sichtbar Thema sind",
      "Nebenraeume vor dem Termin einmal bewusst durchgehen",
    ],
  },
];

const landlordShockArticles: PsychologicalCleaningArticleSeed[] = [
  {
    articleSlug: "haeufige-gruende-fuer-kautionsabzuege",
    category: "Kaution",
    title: "Die haeufigsten Gruende fuer Kautionsabzuege bei der Wohnungsuebergabe",
    metaTitle: "Gruende fuer Kautionsabzuege vermeiden | FLOXANT",
    description:
      "Welche vermeidbaren Punkte bei Uebergabe und Reinigung oft zu Diskussionen fuehren und wie Mieter in Regensburg besser vorbereiten.",
    intro:
      "Kautionsabzuege entstehen nicht nur wegen grosser Schaeden. Oft reichen sichtbare Restpunkte, fehlende Reinigung oder unklare Nebenflaechen, damit der Termin schwierig wird.",
    keywordFocus: ["Kautionsabzug Gruende", "Wohnungsuebergabe Regensburg"],
    readerProblem:
      "Der Mieter fuerchtet, dass der Vermieter kurz vor Schluss noch viele Punkte findet.",
    practicalAngle:
      "Der Artikel sortiert typische Abzugsausloeser, ohne eine Kautionsgarantie zu versprechen.",
    checklist: [
      "Reinigung von Kueche, Bad und Boden nicht bis zur letzten Stunde schieben",
      "Schluessel, Zaehlstaende und Nebenflaechen vorher abgleichen",
      "Offene Schaeden von Schmutz unterscheiden",
      "Fotos und kurze Notizen fuer den eigenen Ueberblick sammeln",
    ],
  },
  {
    articleSlug: "wohnungsuebergabe-ohne-streit",
    category: "Uebergabe",
    title: "Wohnungsuebergabe ohne Streit: was vorher wirklich helfen kann",
    metaTitle: "Wohnungsuebergabe ohne Streit | FLOXANT Regensburg",
    description:
      "Wie Reinigung, Restpunkte, Fotos und klare Reihenfolge vor der Wohnungsuebergabe Konflikte reduzieren koennen.",
    intro:
      "Eine ruhige Wohnungsuebergabe beginnt nicht erst an der Tuer. Sie entsteht vorher: durch klare Restliste, sichtbare Reinigung und weniger offene Fragen.",
    keywordFocus: ["Wohnungsuebergabe ohne Streit", "Endreinigung Regensburg"],
    readerProblem:
      "Kunde und Vermieter haben unterschiedliche Erwartungen an Sauberkeit und Zustand.",
    practicalAngle:
      "Der Artikel zeigt, wie Konflikte vor dem Termin kleiner werden, wenn Zustand und Aufgaben frueh sichtbar sind.",
    checklist: [
      "Vor dem Termin eine kurze Restliste schreiben",
      "Reinigung und Reparaturfragen getrennt betrachten",
      "Keller, Balkon und Briefkasten pruefen",
      "Nicht erst beim Termin klaeren, wer fuer was zustaendig ist",
    ],
  },
  {
    articleSlug: "auszug-checkliste-regensburg",
    category: "Auszug",
    title: "Checkliste fuer den Auszug in Regensburg: Reinigung, Schluessel, Restpunkte",
    metaTitle: "Auszug Checkliste Regensburg | FLOXANT",
    description:
      "Eine klare Auszugscheckliste fuer Regensburg: Was vor Endreinigung, Wohnungsuebergabe und Schluesselabgabe wichtig ist.",
    intro:
      "Beim Auszug stapeln sich kleine Aufgaben. Wer sie frueh sortiert, muss am letzten Tag weniger retten.",
    keywordFocus: ["Auszug Checkliste Regensburg", "Reinigung Auszug"],
    readerProblem:
      "Der Umzug ist fast erledigt, aber die alte Wohnung ist noch nicht uebergabebereit.",
    practicalAngle:
      "Der Artikel verbindet Reinigung, Restmengen, Schluessel und Dokumentation zu einer einfachen Reihenfolge.",
    checklist: [
      "Restgegenstaende vor der Endreinigung entfernen",
      "Zugang fuer Reinigung und Uebergabe sichern",
      "Fotos von kritischen Bereichen vorbereiten",
      "Schluessel, Garage, Keller und Briefkasten nicht vergessen",
    ],
  },
];

const keyCalmArticles: PsychologicalCleaningArticleSeed[] = [
  {
    articleSlug: "schluesseluebergabe-vorbereiten-nicht-vor-ort",
    category: "Schluessel",
    title: "Schluesseluebergabe vorbereiten, wenn man nicht vor Ort sein kann",
    metaTitle: "Schluesseluebergabe nicht vor Ort | FLOXANT",
    description:
      "Was vor einer Schluesseluebergabe in Regensburg zu klaeren ist, wenn Kunde, Vermieter oder Wohnung nicht am selben Ort sind.",
    intro:
      "Nicht vor Ort zu sein, ist bei einer Uebergabe kein kleines Detail. Reinigung, Fotos, Ansprechpartner und Schluesselweg muessen dann genauer geplant werden.",
    keywordFocus: ["Schluesseluebergabe nicht vor Ort", "Regensburg"],
    readerProblem:
      "Der Kunde kann den letzten Termin nicht persoenlich begleiten und moechte trotzdem Kontrolle behalten.",
    practicalAngle:
      "Der Artikel zeigt, welche Absprachen eine ruhige Schluesseluebergabe erst moeglich machen.",
    checklist: [
      "Wer bekommt welchen Schluessel und wann?",
      "Welche Fotos sollen vor oder nach der Uebergabe entstehen?",
      "Wer darf Rueckfragen vor Ort beantworten?",
      "Welche Reinigung oder Restpunkte muessen vorher fertig sein?",
    ],
  },
  {
    articleSlug: "reinigung-und-schluesseltermin-planen",
    category: "Ablauf",
    title: "Reinigung und Schluesseltermin richtig planen",
    metaTitle: "Reinigung und Schluesseltermin planen | FLOXANT",
    description:
      "Warum Endreinigung, Restarbeiten und Schluesseltermin in Regensburg in der richtigen Reihenfolge geplant werden sollten.",
    intro:
      "Der Schluesseltermin ist nur dann ruhig, wenn vorher wirklich klar ist, was noch getan werden muss. Reinigung und Uebergabe gehoeren in eine Reihenfolge.",
    keywordFocus: ["Reinigung Schluesseltermin", "Wohnungsuebergabe Regensburg"],
    readerProblem:
      "Die Reinigung ist noch nicht erledigt, aber der Termin zur Abgabe steht schon fest.",
    practicalAngle:
      "Der Artikel ordnet typische Zeitfehler ein und zeigt, wie ein sauberer Ablauf entsteht.",
    checklist: [
      "Raeumen vor Reinigen planen",
      "Reinigung nicht direkt in den Uebergabetermin pressen",
      "Puffer fuer Fotos und letzte Kontrolle lassen",
      "Schluesseluebergabe erst nach den sichtbaren Restpunkten einplanen",
    ],
  },
  {
    articleSlug: "vor-schluesselabgabe-fertig-sein",
    category: "Uebergabe",
    title: "Was vor der Schluesselabgabe wirklich fertig sein sollte",
    metaTitle: "Vor Schluesselabgabe fertig werden | FLOXANT",
    description:
      "Eine ruhige Liste fuer Mieter in Regensburg: Was vor Schluesselabgabe, Reinigung und Vermietertermin nicht offen bleiben sollte.",
    intro:
      "Vor der Schluesselabgabe zaehlt nicht, ob alles makellos wirkt. Entscheidend ist, dass die ueblichen Streitpunkte nicht mehr ungeklaert sind.",
    keywordFocus: ["Schluesselabgabe Wohnung", "Uebergabe Reinigung"],
    readerProblem:
      "Kurz vor der Abgabe ist unklar, welche Aufgaben wirklich noch wichtig sind.",
    practicalAngle:
      "Der Artikel trennt Muss-Punkte, Kann-Punkte und Dokumentation fuer den letzten Termin.",
    checklist: [
      "Wohnung, Keller und Balkon leer oder vereinbart hinterlassen",
      "Sichtbare Reinigungsbereiche abschliessen",
      "Zaehlstaende und Schluesselanzahl klären",
      "Offene Punkte ehrlich notieren und nicht ueberdecken",
    ],
  },
];

const urgentArticles: PsychologicalCleaningArticleSeed[] = [
  {
    articleSlug: "kurzfristige-reinigung-regensburg-24h-realistisch",
    category: "Express",
    title: "Kurzfristige Reinigung in Regensburg: was in 24 Stunden realistisch ist",
    metaTitle: "Kurzfristige Reinigung Regensburg 24h | FLOXANT",
    description:
      "Was bei kurzfristiger Reinigung bis morgen wirklich machbar ist und welche Angaben FLOXANT fuer eine schnelle Pruefung braucht.",
    intro:
      "Wenn die Uhr laeuft, braucht niemand leere Versprechen. Wichtig ist eine schnelle, ehrliche Pruefung von Flaeche, Zustand, Zugang und Ziel.",
    keywordFocus: ["kurzfristige Reinigung Regensburg", "24h Reinigung"],
    readerProblem:
      "Morgen ist Termin, Besuch oder Uebergabe und die Wohnung ist noch nicht bereit.",
    practicalAngle:
      "Der Artikel erklaert, was schnell geht, was meist zu viel ist und welche Angaben sofort helfen.",
    checklist: [
      "Fotos statt langer Beschreibung senden",
      "Ziel klar nennen: Besuch, Uebergabe, Besichtigung oder Alltag",
      "Flaeche und schlimmste Stellen ehrlich angeben",
      "Zugang, Parken und Zeitfenster direkt klaeren",
    ],
  },
  {
    articleSlug: "wenn-besuch-oder-uebergabe-morgen-ist",
    category: "Zeitdruck",
    title: "Wenn Besuch, Uebergabe oder Termin morgen ist: so sortieren Sie richtig",
    metaTitle: "Reinigung bis morgen sortieren | FLOXANT",
    description:
      "Wie Kunden in Regensburg bei Putzdruck bis morgen Prioritaeten setzen und FLOXANT schnell mit den richtigen Daten anfragen.",
    intro:
      "Ein Termin morgen macht jede offene Ecke lauter. Der Ausweg ist nicht Panik, sondern Priorisierung: Was sieht jemand zuerst, was ist wirklich kritisch?",
    keywordFocus: ["Reinigung bis morgen", "Putzdruck Regensburg"],
    readerProblem:
      "Es ist zu wenig Zeit fuer alles, aber genug Zeit fuer die wichtigsten Punkte.",
    practicalAngle:
      "Der Artikel hilft, Bad, Kueche, Eingangsbereich und sichtbare Flaechen richtig zu priorisieren.",
    checklist: [
      "Eingang, Bad und Kueche zuerst betrachten",
      "Stark sichtbare Flaechen vor versteckten Details erledigen",
      "Nicht alle Nebenraeume gleich behandeln",
      "Den gewuenschten Eindruck klar beschreiben",
    ],
  },
  {
    articleSlug: "notfallreinigung-ohne-falsche-versprechen",
    category: "Notfall",
    title: "Notfallreinigung ohne falsche Versprechen: was Kunden erwarten duerfen",
    metaTitle: "Notfallreinigung realistisch pruefen | FLOXANT",
    description:
      "Warum eine ehrliche Express-Pruefung besser ist als ein blindes 24h-Versprechen und wie FLOXANT in Bayern vorgeht.",
    intro:
      "Notfallreinigung klingt nach sofortiger Rettung. Seriös wird sie erst, wenn klar ist, ob Umfang, Zeitfenster und Team wirklich zusammenpassen.",
    keywordFocus: ["Notfallreinigung", "Express Reinigung Bayern"],
    readerProblem:
      "Kunden brauchen schnelle Hilfe, wollen aber keine Zusage, die am Ende kippt.",
    practicalAngle:
      "Der Artikel beschreibt eine realistische Sofortpruefung und grenzt sie von pauschalen Versprechen ab.",
    checklist: [
      "Deadline und Grund des Zeitdrucks offen nennen",
      "Fotos und Video der kritischen Stellen senden",
      "Ergebnisziel realistisch formulieren",
      "Alternativen erlauben, falls Vollumfang nicht machbar ist",
    ],
  },
];

const resetArticles: PsychologicalCleaningArticleSeed[] = [
  {
    articleSlug: "wohnung-wieder-bewohnbar-bekommen",
    category: "Reset",
    title: "Wohnung wieder bewohnbar bekommen nach Umzug, Stressphase oder langem Liegenlassen",
    metaTitle: "Wohnung wieder bewohnbar bekommen | FLOXANT",
    description:
      "Wie eine Reset-Reinigung hilft, wenn Wohnung, Kueche, Bad oder Wohnbereich wieder alltagstauglich werden sollen.",
    intro:
      "Manche Wohnungen brauchen keine Showreinigung, sondern einen Neustart. Es geht darum, wieder Luft, Struktur und benutzbare Flaechen zu bekommen.",
    keywordFocus: ["Wohnung wieder bewohnbar reinigen", "Reset Reinigung"],
    readerProblem:
      "Die Wohnung ist nicht unbewohnbar, aber sie blockiert den Alltag und fuehlt sich nicht mehr steuerbar an.",
    practicalAngle:
      "Der Artikel zeigt, wie eine Reset-Reinigung nach Prioritaeten statt Perfektionsdruck funktioniert.",
    checklist: [
      "Laufflaechen und Arbeitsflaechen zuerst frei bekommen",
      "Bad und Kueche als Funktionsraeume priorisieren",
      "Restmengen von Reinigung trennen",
      "Ein realistisches Tagesziel definieren",
    ],
  },
  {
    articleSlug: "reset-nach-party-krankheit-belastung",
    category: "Alltag",
    title: "Reset nach Party, Krankheit oder Belastung: wie Reinigung wieder Ruhe schafft",
    metaTitle: "Reset nach Party oder Krankheit | FLOXANT",
    description:
      "Warum Reinigung nach belastenden Tagen nicht nur Sauberkeit, sondern Entlastung, Ordnung und Kontrolle zurueckbringt.",
    intro:
      "Nach Party, Krankheit oder einer anstrengenden Phase bleibt nicht nur Schmutz. Es bleibt das Gefuehl, dass die Wohnung gegen einen arbeitet.",
    keywordFocus: ["Reinigung nach Party", "Wohnung Reset"],
    readerProblem:
      "Die Situation ist zu gross geworden, um entspannt selbst anzufangen.",
    practicalAngle:
      "Der Artikel beschreibt, wie FLOXANT sichtbar belastete Bereiche ohne Drama wieder in eine Reihenfolge bringt.",
    checklist: [
      "Geruchsquellen, Muell und klebrige Flaechen zuerst benennen",
      "Textilien und Oberflaechen getrennt betrachten",
      "Bad und Kueche nicht aufschieben",
      "Vorher Fotos senden, wenn Scham die Anfrage bremst",
    ],
  },
  {
    articleSlug: "kleine-restaufgaben-mental-gross",
    category: "Entlastung",
    title: "Warum kleine Restaufgaben mental gross werden",
    metaTitle: "Kleine Restaufgaben vor Reinigung | FLOXANT",
    description:
      "Wie viele kleine Putz- und Ordnungsaufgaben zu Stress werden und warum ein strukturierter Reset oft mehr hilft als Einzelaktionismus.",
    intro:
      "Es ist selten nur eine Ecke. Es sind zehn kleine Punkte, die zusammen den Eindruck machen, dass alles zu viel ist.",
    keywordFocus: ["Putzstress", "Reinigung Entlastung"],
    readerProblem:
      "Der Kunde schaemt sich, weil objektiv gar nicht alles schlimm ist, sich aber alles schwer anfuehlt.",
    practicalAngle:
      "Der Artikel erklaert, wie Struktur, Reihenfolge und externe Hilfe den Druck reduzieren koennen.",
    checklist: [
      "Alle offenen Punkte kurz notieren, ohne sie sofort zu bewerten",
      "Drei sichtbare Bereiche zuerst waehlen",
      "Entsorgung, Ordnung und Reinigung getrennt planen",
      "Hilfe anfragen, bevor der Druck in Panik kippt",
    ],
  },
];

const odorArticles: PsychologicalCleaningArticleSeed[] = [
  {
    articleSlug: "gerueche-in-wohnung-vor-uebergabe",
    category: "Geruch",
    title: "Gerueche in der Wohnung vor der Uebergabe richtig einordnen",
    metaTitle: "Gerueche vor Wohnungsuebergabe | FLOXANT",
    description:
      "Warum Geruch vor einer Wohnungsuebergabe ernst genommen werden sollte und wie Reinigung, Lueftung und Quellenpruefung zusammenhaengen.",
    intro:
      "Geruch ist schwer zu fotografieren, aber schnell Thema. Wer vor der Uebergabe nur ueberdeckt, riskiert, dass die Ursache bleibt.",
    keywordFocus: ["Geruch Wohnung Uebergabe", "Geruch Reinigung"],
    readerProblem:
      "In der Wohnung riecht es unangenehm, aber die Quelle ist nicht eindeutig.",
    practicalAngle:
      "Der Artikel erklaert, warum Geruchsquellen, Oberflaechen und Textilien getrennt bewertet werden sollten.",
    checklist: [
      "Quelle vermuten: Kueche, Bad, Textil, Muell, Tier, Feuchtigkeit",
      "Nicht nur Duftspray verwenden",
      "Fotos von betroffenen Bereichen senden",
      "Erwartung realistisch formulieren: reduzieren, reinigen, Quelle pruefen",
    ],
  },
  {
    articleSlug: "kueche-bad-textilien-geruch",
    category: "Geruchsquelle",
    title: "Kueche, Bad, Textilien: wo Geruch oft sitzt",
    metaTitle: "Geruchsquellen in Wohnung finden | FLOXANT",
    description:
      "Welche Bereiche bei Geruch in Wohnung, Apartment oder Objekt zuerst geprueft werden sollten.",
    intro:
      "Geruch haengt selten einfach in der Luft. Oft sitzt er in Fettfilm, Abflussnaehe, Textilien, Muellspuren oder schlecht gereinigten Ritzen.",
    keywordFocus: ["Geruchsquelle Wohnung", "Kueche Bad Reinigung"],
    readerProblem:
      "Der Raum wurde geputzt, riecht aber trotzdem nicht frisch.",
    practicalAngle:
      "Der Artikel zeigt, welche Bereiche zuerst geprueft werden, bevor man blind weiterputzt.",
    checklist: [
      "Dunstabzug, Herdumfeld und Kuechenfronten pruefen",
      "Abflussnaehe, WC-Umfeld und Fugen betrachten",
      "Textilien, Matratzen und Polster gesondert einordnen",
      "Muell- und Lagerbereiche nicht uebersehen",
    ],
  },
  {
    articleSlug: "geruchsproblem-dokumentieren-statt-ueberdecken",
    category: "Dokumentation",
    title: "Geruchsproblem dokumentieren statt ueberdecken",
    metaTitle: "Geruchsproblem dokumentieren | FLOXANT",
    description:
      "Wie Kunden Geruchsprobleme vor Reinigung oder Uebergabe sinnvoll beschreiben, ohne falsche Garantien zu erwarten.",
    intro:
      "Geruch laesst sich nicht wie Staub zeigen. Trotzdem kann man ihn sauber beschreiben: seit wann, wo staerker, welche Nutzung, welche Flaechen.",
    keywordFocus: ["Geruch beschreiben", "Geruchsreinigung Regensburg"],
    readerProblem:
      "Der Kunde weiss nicht, wie er das Problem anfragen soll, weil man Geruch nicht sieht.",
    practicalAngle:
      "Der Artikel gibt eine einfache Struktur fuer Beschreibung, Fotos und realistische Erwartung.",
    checklist: [
      "Raum und Staerke ehrlich beschreiben",
      "Moegliche Ursache nennen, auch wenn sie unangenehm ist",
      "Betroffene Flaechen fotografieren",
      "Keine komplette Geruchsgarantie erwarten, sondern Quellenpruefung starten",
    ],
  },
];

const shameArticles: PsychologicalCleaningArticleSeed[] = [
  {
    articleSlug: "diskrete-reinigung-peinliche-wohnsituation",
    category: "Diskretion",
    title: "Diskrete Reinigung bei peinlichen Wohnsituationen",
    metaTitle: "Diskrete Reinigung ohne Scham | FLOXANT",
    description:
      "Wie FLOXANT belastete Wohnsituationen diskret, ruhig und ohne Bloßstellung vorprueft.",
    intro:
      "Manche Anfragen werden zu lange nicht gestellt, weil Scham groesser wird als der Schmutz. Genau dann hilft ein ruhiger, sachlicher Einstieg.",
    keywordFocus: ["diskrete Reinigung", "peinliche Wohnung reinigen"],
    readerProblem:
      "Der Kunde schaemt sich fuer Fotos, Zustand oder Erklaerung und wartet deshalb zu lange.",
    practicalAngle:
      "Der Artikel macht klar, welche Angaben reichen und warum FLOXANT ohne Bewertung arbeitet.",
    checklist: [
      "Nur die noetigen Fotos senden",
      "Problem sachlich benennen: Geruch, Muell, Staub, Kueche, Bad",
      "Kontaktweg waehlen, der sich sicher anfuehlt",
      "Keine langen Rechtfertigungen schreiben",
    ],
  },
  {
    articleSlug: "warum-scham-reinigung-verzoegert",
    category: "Stress",
    title: "Warum Scham die Reinigungsanfrage oft zu lange stoppt",
    metaTitle: "Scham vor Reinigungsanfrage | FLOXANT",
    description:
      "Warum Menschen Reinigungsbedarf aus Scham aufschieben und wie ein diskreter Anfrageweg den ersten Schritt leichter macht.",
    intro:
      "Scham macht aus einer praktischen Aufgabe ein inneres Hindernis. Der erste Schritt muss deshalb klein, ruhig und respektvoll sein.",
    keywordFocus: ["Scham Reinigung", "Reinigung Hilfe anfragen"],
    readerProblem:
      "Der Kunde will Hilfe, schafft aber die Kontaktaufnahme nicht.",
    practicalAngle:
      "Der Artikel zeigt, wie eine kurze, sachliche WhatsApp-Anfrage schon genug fuer eine erste Einordnung sein kann.",
    checklist: [
      "Nur Ort, Raumart, grobes Ziel und Fotos senden",
      "Keine Geschichte erklaeren, wenn sie nicht noetig ist",
      "Ziel nennen: bewohnbar, uebergabebereit, besuchsbereit",
      "Diskretion und Rueckrufwunsch direkt dazuschreiben",
    ],
  },
  {
    articleSlug: "vertrauliche-hilfe-belastete-raeume",
    category: "Sensible Hilfe",
    title: "Vertrauliche Hilfe bei stark belasteten Raeumen",
    metaTitle: "Vertrauliche Reinigung belasteter Raeume | FLOXANT",
    description:
      "Wie stark belastete Raeume in Regensburg ruhig angefragt, eingeordnet und ohne Bloßstellung vorbereitet werden koennen.",
    intro:
      "Stark belastete Raeume brauchen keine laute Sprache. Sie brauchen klare Grenzen, Fotos, Zugang und einen respektvollen Ablauf.",
    keywordFocus: ["belastete Raeume Reinigung", "vertrauliche Reinigung"],
    readerProblem:
      "Der Raum ist so unangenehm geworden, dass normale Putzratschlaege nicht mehr helfen.",
    practicalAngle:
      "Der Artikel grenzt machbare Reinigung, Entsorgung und Vorpruefung voneinander ab.",
    checklist: [
      "Gefahren, Schimmel oder Sondermuell ehrlich nennen",
      "Zugang und Diskretionswunsch klaeren",
      "Reinigung und Entsorgung getrennt beschreiben",
      "Erst Vorpruefung, dann Umfang festlegen",
    ],
  },
];

const familyVisitArticles: PsychologicalCleaningArticleSeed[] = [
  {
    articleSlug: "morgen-besuch-wohnung-vorzeigbar",
    category: "Besuch",
    title: "Wenn morgen Besuch kommt: Wohnung schnell vorzeigbar machen",
    metaTitle: "Wohnung bis morgen vorzeigbar | FLOXANT",
    description:
      "Welche Bereiche zuerst zaehlen, wenn Besuch kommt und die Wohnung in Regensburg schnell einen besseren Eindruck machen soll.",
    intro:
      "Besuch macht die Wohnung ploetzlich oeffentlich. Wichtig ist dann nicht Perfektion, sondern ein sichtbarer, ruhiger Grundzustand.",
    keywordFocus: ["Wohnung schnell vorzeigbar", "Reinigung Besuch kommt"],
    readerProblem:
      "Morgen steht Besuch an und die Wohnung fuehlt sich nicht einladend an.",
    practicalAngle:
      "Der Artikel priorisiert Eingang, Bad, Kueche und Aufenthaltsbereiche.",
    checklist: [
      "Eingang und Wege zuerst frei machen",
      "Bad und Kueche sichtbar reinigen",
      "Wohnzimmer oder Essbereich fokussieren",
      "Schlafzimmer nur dann priorisieren, wenn es gesehen wird",
    ],
  },
  {
    articleSlug: "familienbesuch-ohne-putzpanik",
    category: "Familie",
    title: "Familienbesuch ohne Putzpanik vorbereiten",
    metaTitle: "Familienbesuch ohne Putzpanik | FLOXANT",
    description:
      "Wie man vor Familienbesuch die Wohnung realistisch vorbereitet, ohne sich an jeder Ecke aufzureiben.",
    intro:
      "Familienbesuch trifft oft genau die Stellen, bei denen man sich beobachtet fuehlt. Ein klarer Plan senkt den Druck.",
    keywordFocus: ["Putzpanik Familienbesuch", "Wohnung reinigen Regensburg"],
    readerProblem:
      "Der Kunde fuehlt sich bewertet und versucht, in zu kurzer Zeit alles makellos zu machen.",
    practicalAngle:
      "Der Artikel zeigt, wie man sichtbare Wirkung vor unsichtbarer Perfektion priorisiert.",
    checklist: [
      "Bad, Kueche, Eingang und Tischflaechen zuerst",
      "Geruch und Muell vor Detailstaub klaeren",
      "Unfertige Bereiche ruhig schliessen statt ueberarbeiten",
      "Hilfe holen, wenn Zeit und Nervenkraft nicht reichen",
    ],
  },
  {
    articleSlug: "welche-raeume-zaehlen-wenn-zeit-knapp",
    category: "Prioritaeten",
    title: "Welche Raeume zuerst zaehlen, wenn Zeit knapp ist",
    metaTitle: "Reinigung priorisieren bei wenig Zeit | FLOXANT",
    description:
      "Ein kurzer Prioritaetenplan fuer Regensburg: Welche Raeume bei Besuch, Termin oder Uebergabe zuerst gereinigt werden sollten.",
    intro:
      "Bei wenig Zeit wird jede Entscheidung wichtig. Wer alles gleichzeitig reinigen will, verliert Wirkung und Energie.",
    keywordFocus: ["Reinigung priorisieren", "Putzplan wenig Zeit"],
    readerProblem:
      "Es gibt zu viele offene Stellen und keine klare Reihenfolge.",
    practicalAngle:
      "Der Artikel trennt Besuchslogik, Uebergabelogik und Alltagslogik voneinander.",
    checklist: [
      "Bei Besuch: Eingang, Bad, Kueche, Sitzbereich",
      "Bei Uebergabe: Bad, Kueche, Boden, Nebenflaechen",
      "Bei Alltag: Kueche, Bad, Laufwege, Schlafbereich",
      "Nicht sichtbare Details erst danach einplanen",
    ],
  },
];

const hiddenDirtArticles: PsychologicalCleaningArticleSeed[] = [
  {
    articleSlug: "versteckter-schmutz-vor-uebergabe",
    category: "Hidden Dirt",
    title: "Versteckter Schmutz vor der Uebergabe: typische Stellen",
    metaTitle: "Versteckter Schmutz vor Uebergabe | FLOXANT",
    description:
      "Welche Stellen bei Wohnungsuebergabe und Endreinigung in Regensburg oft uebersehen werden.",
    intro:
      "Versteckter Schmutz faellt oft erst dann auf, wenn jemand gezielt hinsieht. Genau deshalb lohnt sich ein ruhiger Check vor der Uebergabe.",
    keywordFocus: ["versteckter Schmutz", "Uebergabe Reinigung"],
    readerProblem:
      "Die Wohnung wirkt sauber, aber der Kunde hat Sorge, dass Details uebersehen wurden.",
    practicalAngle:
      "Der Artikel nennt typische Bereiche, die bei normalem Putzen schnell aus dem Blick fallen.",
    checklist: [
      "Sockel, Tuerrahmen und Lichtschalter pruefen",
      "Hinter Geraeten und unter Heizkoerpern schauen",
      "Abfluesse, Fugen und Armaturbereiche nicht vergessen",
      "Keller- und Balkonränder kurz kontrollieren",
    ],
  },
  {
    articleSlug: "kueche-bad-gruendlich-pruefen-ohne-ueberforderung",
    category: "Check",
    title: "Kueche und Bad gruendlich pruefen, ohne sich zu ueberfordern",
    metaTitle: "Kueche Bad Reinigung Check | FLOXANT",
    description:
      "Wie Kueche und Bad vor Uebergabe oder Besuch sinnvoll gecheckt werden, ohne in Detailstress zu geraten.",
    intro:
      "Kueche und Bad entscheiden viel, aber nicht jedes Detail ist gleich wichtig. Ein klarer Check spart Zeit.",
    keywordFocus: ["Kueche Bad Reinigung", "Endreinigung Check"],
    readerProblem:
      "Die wichtigsten Raeume brauchen Aufmerksamkeit, aber der Kunde verliert sich in Einzelstellen.",
    practicalAngle:
      "Der Artikel trennt sichtbare Hygiene, starke Verschmutzung und Detailpunkte.",
    checklist: [
      "Arbeitsflaechen, Spuele, Herd und Fronten zuerst",
      "WC, Dusche, Waschbecken und Spiegel priorisieren",
      "Fugen, Ränder und Abfluesse als zweite Runde",
      "Innenbereiche nur nach Bedarf und Vereinbarung",
    ],
  },
  {
    articleSlug: "hidden-dirt-check-vermietertermin-regensburg",
    category: "Regensburg",
    title: "Hidden Dirt Check fuer den Vermietertermin in Regensburg",
    metaTitle: "Hidden Dirt Check Vermietertermin Regensburg | FLOXANT",
    description:
      "Wie FLOXANT vor Vermieterterminen in Regensburg versteckte Reinigungsrisiken sichtbarer macht.",
    intro:
      "Vor einem Vermietertermin ist das Risiko nicht immer der grosse Schmutz. Oft sind es uebersehene Details, die den Eindruck kippen.",
    keywordFocus: ["Hidden Dirt Check Regensburg", "Vermietertermin Reinigung"],
    readerProblem:
      "Die Uebergabe naht und der Kunde moechte die typischen Detailstellen nicht allein pruefen.",
    practicalAngle:
      "Der Artikel zeigt, warum ein zweiter Blick vor dem Termin mehr Ruhe schaffen kann.",
    checklist: [
      "Fotos der kritischen Stellen vorab senden",
      "Kueche, Bad und Boden als Hauptbereiche pruefen",
      "Nebenflaechen kurz mitnehmen",
      "Ergebnis nicht dramatisieren, sondern sauber priorisieren",
    ],
  },
];

const mondayArticles: PsychologicalCleaningArticleSeed[] = [
  {
    articleSlug: "bueroreinigung-wochenende-montag-sauber-starten",
    category: "Bueroreinigung",
    title: "Bueroreinigung am Wochenende: Montag sauber starten",
    metaTitle: "Bueroreinigung Wochenende Regensburg | FLOXANT",
    description:
      "Warum Wochenendreinigung fuer Bueros, Praxen und kleine Unternehmen in Regensburg den Montag ruhiger macht.",
    intro:
      "Der Montag entscheidet, wie ein Team in die Woche startet. Ein sauberer Empfang, klare Kueche und ordentliche Sanitärbereiche wirken sofort.",
    keywordFocus: ["Bueroreinigung Wochenende", "Montagmorgen Reinigung"],
    readerProblem:
      "Mitarbeitende kommen Montag in Raeume, die noch nach der Vorwoche aussehen.",
    practicalAngle:
      "Der Artikel erklaert, welche Flaechen fuer den Wochenstart zuerst zaehlen.",
    checklist: [
      "Empfang und Laufwege zuerst",
      "Kueche und Sanitärbereiche klar priorisieren",
      "Arbeitsplaetze nur im vereinbarten Umfang",
      "Schluessel, Alarm und Zugang vor dem Wochenende klaeren",
    ],
  },
  {
    articleSlug: "empfang-kueche-sanitaer-montag",
    category: "Gewerbe",
    title: "Empfang, Kueche, Sanitaer: was Mitarbeitende Montag sofort sehen",
    metaTitle: "Montag Bueroreinigung Sichtbereiche | FLOXANT",
    description:
      "Welche Bereiche in Bueros und Praxen fuer den ersten Eindruck am Montag besonders relevant sind.",
    intro:
      "Nicht jede Flaeche hat dieselbe Wirkung. Der Wochenstart haengt besonders an den Raeumen, die alle nutzen.",
    keywordFocus: ["Bueroreinigung Regensburg", "Sanitaer Kueche Empfang"],
    readerProblem:
      "Der Betrieb wirkt unorganisiert, obwohl eigentlich nur wenige stark sichtbare Bereiche fehlen.",
    practicalAngle:
      "Der Artikel fokussiert Sichtbereiche statt endlose Leistungslisten.",
    checklist: [
      "Empfang und Wartebereich als erstes Signal",
      "Kueche und Kaffeeecke als Team-Signal",
      "Sanitär als Vertrauensbereich",
      "Muell und Geruch vor Detailpolitur",
    ],
  },
  {
    articleSlug: "gewerbeflaechen-vor-wochenstart-vorbereiten",
    category: "Objekt",
    title: "Gewerbeflaechen vor dem Wochenstart richtig vorbereiten",
    metaTitle: "Gewerbeflaechen Wochenstart Reinigung | FLOXANT",
    description:
      "Wie Gewerbeflaechen in Regensburg mit klaren Reinigungszonen, Zeitfenstern und Ansprechpartnern vorbereitet werden.",
    intro:
      "Gewerbereinigung wird besser, wenn sie nicht als Putztermin, sondern als Betriebsstart gedacht wird.",
    keywordFocus: ["Gewerbereinigung Regensburg", "Wochenstart Reinigung"],
    readerProblem:
      "Unternehmen brauchen Reinigung, die den Betrieb nicht stoert und trotzdem sichtbar wirkt.",
    practicalAngle:
      "Der Artikel ordnet Zonen, Turnus und Zugang fuer den Wochenstart.",
    checklist: [
      "Zonen nach Sichtbarkeit und Nutzung trennen",
      "Randzeiten, Schluessel und Alarm klaeren",
      "Ansprechpartner fuer Rueckfragen festlegen",
      "Qualitaetsrueckmeldung kurz und regelmaessig halten",
    ],
  },
];

const breathingArticles: PsychologicalCleaningArticleSeed[] = [
  {
    articleSlug: "staubarme-reinigung-nach-renovierung-umzug",
    category: "Staub",
    title: "Staubarme Reinigung nach Renovierung oder Umzug",
    metaTitle: "Staubarme Reinigung nach Renovierung | FLOXANT",
    description:
      "Wie Staub nach Renovierung, Umzug oder Moebelaufbau reduziert wird, ohne medizinische Versprechen zu machen.",
    intro:
      "Staub macht Raeume schwer. Eine gute Reinigung kann Staubquellen reduzieren, ersetzt aber keine medizinische Beratung und keine Schadstoffpruefung.",
    keywordFocus: ["staubarme Reinigung", "Renovierung Staub entfernen"],
    readerProblem:
      "Nach Renovierung oder Umzug fuehlen sich Raeume staubig und unruhig an.",
    practicalAngle:
      "Der Artikel zeigt, wie Reihenfolge, Oberflaechen und Textilien zusammen betrachtet werden.",
    checklist: [
      "Von oben nach unten arbeiten",
      "Feinen Staub nicht trocken verwirbeln",
      "Textilien und offene Regale gesondert betrachten",
      "Lueften und Reinigung realistisch kombinieren",
    ],
  },
  {
    articleSlug: "raumluft-schwer-reinigung-ohne-medizinversprechen",
    category: "Raumgefuehl",
    title: "Wenn Raumluft schwer wirkt: Reinigung ohne Medizinversprechen",
    metaTitle: "Schwere Raumluft Reinigung | FLOXANT",
    description:
      "Was Reinigung bei schwer wirkender Raumluft leisten kann und welche Erwartungen realistisch bleiben muessen.",
    intro:
      "Wenn ein Raum schwer wirkt, kann Reinigung helfen, sichtbare Belastungen zu reduzieren. Sie ersetzt aber keine medizinische oder baubiologische Diagnose.",
    keywordFocus: ["Raumluft schwer Reinigung", "Atemruhig Reinigung"],
    readerProblem:
      "Der Kunde moechte sich in Raeumen wohler fuehlen, erwartet aber keine Heilversprechen.",
    practicalAngle:
      "Der Artikel klaert sauber, wo Reinigung hilft und wo Fachpruefung noetig sein kann.",
    checklist: [
      "Staub, Geruch und Feuchtigkeit getrennt beschreiben",
      "Betroffene Raeume und Zeitpunkte nennen",
      "Textilien, Regale und Bodenflaechen einordnen",
      "Bei Schimmel oder gesundheitlichen Beschwerden Fachleute hinzuziehen",
    ],
  },
  {
    articleSlug: "schlafzimmer-buero-kinderzimmer-ruhiger-sauber",
    category: "Wohnraeume",
    title: "Schlafzimmer, Buero, Kinderzimmer: ruhiger sauber machen",
    metaTitle: "Schlafzimmer Buero Kinderzimmer Reinigung | FLOXANT",
    description:
      "Welche Raeume bei staubigem oder belastetem Wohngefuehl zuerst gereinigt werden sollten.",
    intro:
      "Raeume, in denen man schlaeft, arbeitet oder Kinder spielen, brauchen oft ein anderes Augenmerk als reine Durchgangsraeume.",
    keywordFocus: ["Schlafzimmer Reinigung", "staubige Raeume reinigen"],
    readerProblem:
      "Der Kunde weiss nicht, welche Raeume zuerst entlastet werden sollten.",
    practicalAngle:
      "Der Artikel priorisiert Raeume nach Aufenthaltsdauer und Nutzungsart.",
    checklist: [
      "Schlafbereich und Arbeitsbereich zuerst klaeren",
      "Staubfaenger reduzieren oder getrennt reinigen",
      "Boden, Fensterbank und offene Flaechen priorisieren",
      "Kinderzimmer mit klarer Materialgrenze betrachten",
    ],
  },
];

const constructionDustArticles: PsychologicalCleaningArticleSeed[] = [
  {
    articleSlug: "baustaub-nach-renovierung-reihenfolge",
    category: "Baustaub",
    title: "Baustaub nach Renovierung entfernen: Die Reihenfolge zaehlt",
    metaTitle: "Baustaub nach Renovierung entfernen | FLOXANT",
    description:
      "Warum Baustaub nicht mit normalem Putzen verschwindet und welche Reihenfolge nach Renovierung sinnvoll ist.",
    intro:
      "Baustaub ist hartnaeckig, weil er sich immer wieder absetzt. Wer zu frueh dekoriert oder wischt, arbeitet oft doppelt.",
    keywordFocus: ["Baustaub entfernen", "Renovierung Reinigung"],
    readerProblem:
      "Nach Renovierung wirkt die Wohnung sauber, aber am naechsten Tag liegt wieder Staub.",
    practicalAngle:
      "Der Artikel erklaert, warum Absaugen, Absetzenlassen und Feuchtreinigung zusammengehoeren.",
    checklist: [
      "Groben Staub zuerst entfernen",
      "Feinstaub nicht trocken verteilen",
      "Oberflaechen mehrfach in Etappen pruefen",
      "Einzug oder Uebergabe nicht direkt nach der ersten Runde planen",
    ],
  },
  {
    articleSlug: "baufeinreinigung-vor-einzug-uebergabe",
    category: "Baufeinreinigung",
    title: "Baufeinreinigung vor Einzug oder Uebergabe",
    metaTitle: "Baufeinreinigung vor Einzug | FLOXANT",
    description:
      "Wann eine Baufeinreinigung in Regensburg sinnvoll ist und welche Flächen vor Einzug oder Abnahme geprueft werden.",
    intro:
      "Vor Einzug oder Abnahme geht es nicht nur um groben Baustellenstaub. Sichtflaechen, Boden, Bad, Kueche und Kanten entscheiden den Eindruck.",
    keywordFocus: ["Baufeinreinigung Regensburg", "Baureinigung vor Einzug"],
    readerProblem:
      "Die Renovierung ist fertig, aber die Raeume fuehlen sich noch nicht bezugsbereit an.",
    practicalAngle:
      "Der Artikel trennt Bauendreinigung, Baufeinreinigung und letzte Sichtkontrolle.",
    checklist: [
      "Bauarbeiten wirklich abschliessen lassen",
      "Fenster, Boden, Sockel und Sanitaerbereiche pruefen",
      "Handwerkerstaub und Verpackungsreste trennen",
      "Zeit fuer Nachstaub einplanen",
    ],
  },
  {
    articleSlug: "warum-baustaub-wiederkommt",
    category: "Renovierung",
    title: "Warum Baustaub immer wiederkommt und was dagegen hilft",
    metaTitle: "Warum Baustaub wiederkommt | FLOXANT",
    description:
      "Warum sich Baustaub nach der ersten Reinigung erneut absetzt und wie Kunden in Regensburg realistischer planen.",
    intro:
      "Baustaub wirkt manchmal wie ein Rueckfall. Das ist kein Zeichen, dass gar nichts passiert ist, sondern oft Folge von Feinstaub und falscher Reihenfolge.",
    keywordFocus: ["Baustaub kommt wieder", "Baustaub Reinigung"],
    readerProblem:
      "Der Kunde hat schon geputzt, aber es staubt sofort wieder.",
    practicalAngle:
      "Der Artikel erklaert Nachstaub, Luftbewegung und Etappenreinigung ohne falsche Sofortversprechen.",
    checklist: [
      "Nach Bauarbeiten Zeit zum Absetzen lassen",
      "Filter, Lueftung und offene Flaechen beachten",
      "Mehrere leichte Runden besser als eine hektische Runde",
      "Vor Uebergabe einen finalen Sichtcheck planen",
    ],
  },
];

export const psychologicalCleaningLandingPages = [
  {
    slug: "sichtbar-sauber-protokoll",
    serviceName: "Sichtbar-Sauber-Protokoll",
    shortName: "Sichtbar sauber",
    category: "Dokumentierte Reinigung",
    seoTitle: "Sichtbar-Sauber-Protokoll Regensburg | Reinigung dokumentieren",
    metaDescription:
      "Sichtbar-Sauber-Protokoll fuer Regensburg: Reinigung mit Foto-Check, klaren Sichtbereichen und ruhiger Vorbereitung vor Uebergabe, Besuch oder Vermietertermin.",
    heroHeadline: "Sauber soll nicht nur passiert sein. Es soll sichtbar sein.",
    heroSubheadline:
      "FLOXANT verbindet Reinigung, kritische Blickpunkte und Fotodokumentation, damit vor Uebergabe, Besichtigung oder Vermietertermin weniger Diskussion entsteht.",
    primaryCta: "Sauberkeit sichtbar machen",
    whatsappText:
      "Hallo FLOXANT, ich moechte das Sichtbar-Sauber-Protokoll anfragen. Es geht um Ort, Termin, Fotos und kritische Stellen:",
    emotionalPromise:
      "Sie bekommen nicht nur eine gereinigte Flaeche, sondern einen ruhigeren Abschluss mit nachvollziehbaren Sichtpunkten.",
    localNote:
      "Besonders gefragt bei Wohnungen und Objekten in Regensburg, der Oberpfalz und in Bayern, wenn ein Termin dokumentierbarer vorbereitet werden soll.",
    problemTitle: "Wenn Sauberkeit erst beim Termin diskutiert wird, ist es zu spaet.",
    worries: [
      "Der Vermieter sieht etwas, das man selbst uebersehen hat.",
      "Nach der Reinigung bleibt unklar, welche Bereiche wirklich erledigt wurden.",
      "Fotos fehlen, wenn spaeter Fragen zu Zustand oder Leistung entstehen.",
    ],
    conflicts: [
      "Mieter und Vermieter bewerten Sauberkeit unterschiedlich.",
      "Reinigung, Restpunkte und Uebergabe laufen ohne klare Reihenfolge.",
      "Eine gute Arbeit ist nicht nachvollziehbar, weil nichts festgehalten wurde.",
    ],
    stressSituations: [
      "Wohnungsuebergabe in zwei Tagen",
      "Besichtigung nach Auszug",
      "Nachreinigung nach Umzug",
      "Gewerbeflaeche vor Abnahme",
    ],
    solutionIntro:
      "FLOXANT prueft die sichtbaren Bereiche, priorisiert kritische Stellen und kann relevante Zustaende vor oder nach der Reinigung fotografisch festhalten.",
    solutionSteps: [
      { title: "Ziel klaeren", text: "Uebergabe, Besichtigung, Vermietertermin oder eigene Kontrolle werden getrennt eingeordnet." },
      { title: "Sichtbereiche festlegen", text: "Kueche, Bad, Boden, Fensterbereiche, Tueren und Nebenflaechen werden bewusst priorisiert." },
      { title: "Reinigung ausfuehren", text: "Der Umfang wird nach Flaeche, Zustand, Zugang und Termin realistisch geplant." },
      { title: "Fotopunkte sichern", text: "Relevante Bereiche koennen nach Absprache dokumentiert werden, ohne eine rechtliche Bewertung zu ersetzen." },
    ],
    whyItWorks: [
      "Sichtbare Kriterien senken das Risiko von Missverstaendnissen.",
      "Fotos machen erledigte Punkte leichter nachvollziehbar.",
      "Der Ablauf zwingt zu klarer Priorisierung statt hektischem Nachputzen.",
    ],
    trustSignals: [
      "Klare Kontaktwege per WhatsApp, Telefon und Buchung",
      "Realistische Vorpruefung mit Fotos und Termin",
      "Regionale Erfahrung mit Uebergabe- und Objektfaellen in Regensburg",
      "Bewertungs-Hinweis: Kunden achten besonders auf Zuverlaessigkeit, Ruhe und klare Rueckmeldung",
    ],
    guarantees: [
      "Ruhige Umfangspruefung vor Zusage",
      "Keine Kautions- oder Abnahmegarantie, aber klare Vorbereitung",
      "Nachvollziehbare Rueckmeldung zu sichtbaren Restpunkten",
    ],
    processSteps: [
      { title: "1. Fotos und Ziel senden", text: "Sie schicken Ort, Termin, Flaeche und kritische Stellen." },
      { title: "2. Sichtcheck definieren", text: "FLOXANT klaert, welche Bereiche fuer den Termin wirklich zaehlen." },
      { title: "3. Reinigung planen", text: "Team, Zeitfenster und Umfang werden realistisch eingeordnet." },
      { title: "4. Abschluss sichtbar machen", text: "Erledigte Punkte werden nach Absprache kurz dokumentiert." },
    ],
    faqItems: [
      {
        q: "Ist das Sichtbar-Sauber-Protokoll ein rechtliches Uebergabeprotokoll?",
        a: "Nein. Es ersetzt keine rechtliche Bewertung und kein offizielles Vermieterprotokoll. Es hilft, Reinigung und sichtbare Zustaende praktischer nachvollziehbar zu machen.",
      },
      {
        q: "Welche Bereiche werden dokumentiert?",
        a: "Typisch sind Bad, Kueche, Boden, Tueren, Fensterbereiche und Nebenflaechen. Der konkrete Umfang haengt vom Objekt und vom Zieltermin ab.",
      },
      {
        q: "Hilft das bei Kautionsfragen?",
        a: "Es gibt keine Kautionsgarantie. Eine bessere Vorbereitung und Fotodokumentation kann aber helfen, vermeidbare Diskussionen zu reduzieren.",
      },
      {
        q: "Kann FLOXANT kurzfristig helfen?",
        a: "Kurzfristige Termine werden nach Verfuegbarkeit geprueft. Fotos, Adresse, Zugang und Deadline beschleunigen die Rueckmeldung.",
      },
    ],
    relatedSlugs: ["vermieter-schockschutz-reinigung", "hidden-dirt-check", "schluesselruhe-service"],
    searchIntents: ["Reinigung dokumentieren", "Endreinigung vor Uebergabe", "Wohnungsuebergabe Fotos"],
    supportingArticles: visibleProtocolArticles,
  },
  {
    slug: "vermieter-schockschutz-reinigung",
    serviceName: "Vermieter-Schockschutz Reinigung",
    shortName: "Vermieter-Schockschutz",
    category: "Uebergabe-Reinigung",
    seoTitle: "Vermieter-Schockschutz Reinigung Regensburg | Uebergabe ruhiger vorbereiten",
    metaDescription:
      "Vermieter-Schockschutz Reinigung in Regensburg: Uebergabereinigung, Restpunkte, Sichtcheck und Fotohinweise vor Vermietertermin oder Wohnungsabgabe.",
    heroHeadline: "Der Vermietertermin soll kein Schockmoment werden.",
    heroSubheadline:
      "FLOXANT hilft, sichtbare Reinigungsrisiken vor der Wohnungsuebergabe zu erkennen, zu priorisieren und ruhig abzuarbeiten.",
    primaryCta: "Uebergabe ruhiger vorbereiten",
    whatsappText:
      "Hallo FLOXANT, ich moechte die Vermieter-Schockschutz Reinigung anfragen. Uebergabetermin, Ort und kritische Stellen:",
    emotionalPromise:
      "Sie gehen nicht blind in den Termin, sondern mit einem klareren Blick auf die Punkte, die wirklich auffallen koennen.",
    localNote:
      "Relevant fuer Mietwohnungen, Haeuser und Nebenflaechen in Regensburg, der Oberpfalz und Bayern, wenn der Uebergabetermin naeher rueckt.",
    problemTitle: "Kautionsstress entsteht oft durch vermeidbare Restpunkte.",
    worries: [
      "Der Vermieter findet Schmutzstellen, an die niemand gedacht hat.",
      "Keller, Balkon oder Kueche werden kurz vor Schluss zum Problem.",
      "Die Kaution fuehlt sich unsicher an, obwohl vieles erledigt wurde.",
    ],
    conflicts: [
      "Sauberkeit wird subjektiv bewertet.",
      "Reinigung und Schaeden werden im Termin vermischt.",
      "Nacharbeiten sind zeitlich kaum noch moeglich.",
    ],
    stressSituations: [
      "Uebergabe am naechsten Werktag",
      "Vermieter hat schon Mängel angekuendigt",
      "Auszug und Reinigung fallen auf denselben Zeitraum",
      "Kunde ist nicht mehr regelmaessig vor Ort",
    ],
    solutionIntro:
      "FLOXANT ordnet die ueblichen Uebergabepunkte ein: Was muss sauber, was muss leer und was muss ehrlich als offener Punkt sichtbar bleiben?",
    solutionSteps: [
      { title: "Uebergabeziel verstehen", text: "Wir klaeren Termin, Vermieteranforderung, Flaeche und bisherige Restpunkte." },
      { title: "Risiko-Bereiche priorisieren", text: "Kueche, Bad, Boden, Fensterbereiche, Keller und Balkon werden nach Sichtbarkeit sortiert." },
      { title: "Reinigung gezielt ausfuehren", text: "Der Fokus liegt auf den Bereichen, die beim Termin am ehesten Diskussionen ausloesen." },
      { title: "Restpunkte sauber benennen", text: "Was Reinigung nicht loesen kann, wird nicht versteckt, sondern klar getrennt." },
    ],
    whyItWorks: [
      "Kritische Stellen werden vor dem Termin sichtbar.",
      "Reinigung und Schadenthemen bleiben sauber getrennt.",
      "Der Kunde bekommt mehr Kontrolle ueber den letzten Eindruck.",
    ],
    trustSignals: [
      "Keine falsche Kautionsgarantie",
      "Saubere Vorabklaerung per Foto und Rueckfrage",
      "Erfahrung mit Uebergaben, Vermieterterminen und Regensburger Objektlagen",
      "Bewertungs-Hinweis: Verlaesslichkeit und ehrliche Grenzen sind wichtiger als grosse Versprechen",
    ],
    guarantees: [
      "Klarer Blick auf sichtbare Uebergabepunkte",
      "Keine Garantie auf Vermieterentscheidung",
      "Ruhige Rueckmeldung, wenn Nacharbeiten unrealistisch sind",
    ],
    processSteps: [
      { title: "1. Termin und Erwartung klaeren", text: "Was steht im Fokus: Kaution, Nachmieter, Vermieter, Hausverwaltung?" },
      { title: "2. Fotos senden", text: "Kritische Bereiche werden vorab sichtbar gemacht." },
      { title: "3. Prioritaeten setzen", text: "FLOXANT trennt Muss-Bereiche von Nebenthemen." },
      { title: "4. Reinigung und Abschluss", text: "Der Einsatz wird auf den Uebergabezweck ausgerichtet." },
    ],
    faqItems: [
      {
        q: "Garantiert der Service die volle Kaution?",
        a: "Nein. Die Kaution haengt von Mietvertrag, Zustand, Schaeden und Vermieterentscheidung ab. Der Service reduziert vermeidbare Reinigungs- und Sichtbarkeitsrisiken.",
      },
      {
        q: "Wann sollte ich anfragen?",
        a: "Am besten, sobald der Uebergabetermin feststeht. Bei kurzfristigen Faellen helfen Fotos und klare Deadlines besonders.",
      },
      {
        q: "Was ist, wenn Schaeden vorhanden sind?",
        a: "FLOXANT trennt Reinigung von Schaeden. Reinigung kann Schmutz entfernen, aber keine baulichen oder mietrechtlichen Fragen loesen.",
      },
      {
        q: "Gilt der Service auch ausserhalb Regensburgs?",
        a: "Ja, passende Einsaetze in der Oberpfalz und in Bayern werden nach Verfuegbarkeit, Strecke und Umfang geprueft.",
      },
    ],
    relatedSlugs: ["sichtbar-sauber-protokoll", "hidden-dirt-check", "schluesselruhe-service"],
    searchIntents: ["Kautionsabzug vermeiden", "Vermietertermin Reinigung", "Wohnungsuebergabe ohne Streit"],
    supportingArticles: landlordShockArticles,
  },
  {
    slug: "schluesselruhe-service",
    serviceName: "Schluesselruhe-Service",
    shortName: "Schluesselruhe",
    category: "Schluessel und Uebergabe",
    seoTitle: "Schluesselruhe-Service Regensburg | Reinigung und Schluessel ruhig planen",
    metaDescription:
      "Schluesselruhe-Service in Regensburg: Reinigung, Schluesselabgabe, Fotohinweise und Uebergabevorbereitung, wenn der letzte Termin sicherer laufen soll.",
    heroHeadline: "Der Schluesseltermin soll sich nicht wie ein Risiko anfuehlen.",
    heroSubheadline:
      "FLOXANT verbindet Reinigung, letzte Restpunkte und Schluessel-Logik, damit der Abschluss nicht an einer kleinen offenen Aufgabe scheitert.",
    primaryCta: "Schluesseltermin klaeren",
    whatsappText:
      "Hallo FLOXANT, ich moechte den Schluesselruhe-Service anfragen. Es geht um Schluessel, Reinigung, Termin und Ort:",
    emotionalPromise:
      "Der letzte Schritt wird greifbarer: Wer hat Zugang, was ist sauber, was ist dokumentiert und wann kann abgegeben werden?",
    localNote:
      "Besonders hilfreich in Regensburg und der Oberpfalz, wenn Kunden nach dem Auszug nicht mehr flexibel vor Ort sein koennen.",
    problemTitle: "Die Schluesselabgabe ist klein, aber sie traegt viel Verantwortung.",
    worries: [
      "Der Kunde kann beim Termin nicht selbst vor Ort sein.",
      "Reinigung, Fotos und Schluesselabgabe liegen zu dicht beieinander.",
      "Ein offener Keller oder Restpunkt blockiert den Abschluss.",
    ],
    conflicts: [
      "Der Vermieter erwartet Anwesenheit, der Kunde ist bereits weg.",
      "Schluesselwege sind unklar.",
      "Rueckfragen entstehen erst vor Ort.",
    ],
    stressSituations: [
      "Schluesselabgabe waehrend Arbeitszeit",
      "Wegzug aus Regensburg vor dem Uebergabetermin",
      "Reinigung erst nach Auszug moeglich",
      "Hausverwaltung braucht klare Rueckmeldung",
    ],
    solutionIntro:
      "FLOXANT klaert, welche Aufgaben vor der Schluesselabgabe wirklich abgeschlossen sein muessen und welche Anwesenheit oder Dokumentation nach Vereinbarung sinnvoll ist.",
    solutionSteps: [
      { title: "Zugang klaeren", text: "Schluessel, Ansprechpartner, Hauszugang und Zeitfenster werden frueh sichtbar gemacht." },
      { title: "Restpunkte trennen", text: "Reinigung, Restmengen, Fotos und Schluessel werden in eine sinnvolle Reihenfolge gebracht." },
      { title: "Termin vorbereiten", text: "FLOXANT prueft, ob Anwesenheit, Fotodokumentation oder Rueckmeldung benoetigt wird." },
      { title: "Abschluss ruhig melden", text: "Nach Absprache wird kurz rueckgemeldet, was erledigt wurde und was offen bleibt." },
    ],
    whyItWorks: [
      "Schluesselthemen werden nicht erst am Ende improvisiert.",
      "Reinigung und Uebergabe bekommen eine klare Reihenfolge.",
      "Der Kunde behaelt Kontrolle, auch wenn er nicht mehr vor Ort ist.",
    ],
    trustSignals: [
      "Direkter Rueckruf und WhatsApp-Abstimmung moeglich",
      "Klare Grenzen bei Verantwortung und Dokumentation",
      "Regionale Erfahrung mit Vermietern, Hausverwaltungen und Wohnungen in Regensburg",
      "Bewertungs-Hinweis: Kunden schaetzen besonders ruhige Kommunikation vor Terminen",
    ],
    guarantees: [
      "Keine Uebernahme ungeklaerter Rechts- oder Vermieterentscheidungen",
      "Klare Absprache vor Schluesselbewegung",
      "Transparente Rueckmeldung zu vereinbarten Punkten",
    ],
    processSteps: [
      { title: "1. Schluesselweg klaeren", text: "Wer hat Zugang, wer bekommt den Schluessel und wann?" },
      { title: "2. Reinigung vorher einordnen", text: "Was muss vor Abgabe sichtbar sauber sein?" },
      { title: "3. Termin und Rueckmeldung planen", text: "Anwesenheit, Fotos und Kontaktweg werden festgelegt." },
      { title: "4. Abschluss begleiten", text: "FLOXANT arbeitet den vereinbarten Ablauf ruhig ab." },
    ],
    faqItems: [
      {
        q: "Kann FLOXANT Schluessel abgeben?",
        a: "Das kann nach Vereinbarung geprueft werden. Voraussetzung sind klare Angaben zu Zugang, Termin, Ansprechpartner und Verantwortung.",
      },
      {
        q: "Kann der Service mit Reinigung kombiniert werden?",
        a: "Ja, wenn Kapazitaet und Reihenfolge passen. Besonders sinnvoll ist das, wenn Reinigung erst nach dem Auszug moeglich ist.",
      },
      {
        q: "Was passiert bei Rueckfragen des Vermieters?",
        a: "FLOXANT kann Rueckmeldungen im vereinbarten Rahmen weitergeben. Rechtliche Bewertungen oder Entscheidungen werden nicht ersetzt.",
      },
      {
        q: "Ist der Service auch fuer Bayern moeglich?",
        a: "Passende Einsaetze in Bayern werden nach Entfernung, Termin und Umfang geprueft.",
      },
    ],
    relatedSlugs: ["sichtbar-sauber-protokoll", "vermieter-schockschutz-reinigung", "panikfrei-in-24h"],
    searchIntents: ["Schluesseluebergabe Service", "Wohnungsuebergabe nicht vor Ort", "Reinigung Schluesseltermin"],
    supportingArticles: keyCalmArticles,
  },
  {
    slug: "panikfrei-in-24h",
    serviceName: "Panikfrei in 24h",
    shortName: "Panikfrei 24h",
    category: "Kurzfristige Reinigung",
    seoTitle: "Panikfrei in 24h Regensburg | Kurzfristige Reinigung pruefen",
    metaDescription:
      "Panikfrei in 24h: kurzfristige Reinigung in Regensburg und Bayern fuer Besuch, Uebergabe, Besichtigung oder Notfalltermin realistisch pruefen lassen.",
    heroHeadline: "Wenn morgen jemand kommt, muss heute Ruhe rein.",
    heroSubheadline:
      "FLOXANT prueft kurzfristige Reinigung ohne falsche Versprechen: Was ist in der Zeit machbar, was zaehlt zuerst und wie wird der Termin ruhiger?",
    primaryCta: "24h-Fall pruefen",
    whatsappText:
      "Hallo FLOXANT, ich brauche kurzfristige Reinigung. Deadline, Ort, Fotos und Ziel:",
    emotionalPromise:
      "Aus Panik wird ein geordneter Plan: die wichtigsten Bereiche zuerst, klare Grenzen und schnelle Rueckmeldung.",
    localNote:
      "In Regensburg und der Oberpfalz besonders relevant, wenn Uebergabe, Besuch, Besichtigung oder Objekttermin kurzfristig ansteht.",
    problemTitle: "Zeitdruck macht jede offene Flaeche groesser.",
    worries: [
      "Morgen kommt Besuch oder Vermieter und die Wohnung ist nicht bereit.",
      "Es ist unklar, was in 24 Stunden ueberhaupt machbar ist.",
      "Man verliert Zeit mit falschen Prioritaeten.",
    ],
    conflicts: [
      "Alles soll fertig werden, aber Zeit und Umfang passen nicht zusammen.",
      "Kunde erwartet Rettung, Dienstleister braucht klare Daten.",
      "Schnelle Hilfe darf kein leeres Versprechen werden.",
    ],
    stressSituations: [
      "Besichtigung morgen",
      "Uebergabe innerhalb von 24 Stunden",
      "Familienbesuch kuendigt sich an",
      "Kurzfristiger Objekttermin im Gewerbe",
    ],
    solutionIntro:
      "FLOXANT fragt nicht zuerst nach Perfektion, sondern nach Ziel, Deadline, Fotos und den Bereichen, die den groessten Unterschied machen.",
    solutionSteps: [
      { title: "Deadline sichtbar machen", text: "Wir klaeren, bis wann etwas wirklich fertig sein muss." },
      { title: "Fotos priorisieren", text: "Bilder helfen, Umfang und kritische Bereiche schnell einzuordnen." },
      { title: "Machbarkeit pruefen", text: "FLOXANT sagt ehrlich, ob Vollumfang, Fokusreinigung oder Teilentlastung sinnvoll ist." },
      { title: "Einsatz fokussieren", text: "Die sichtbarsten und wichtigsten Bereiche bekommen Vorrang." },
    ],
    whyItWorks: [
      "Zeitdruck wird in konkrete Prioritaeten uebersetzt.",
      "Der Kunde bekommt eine ehrliche Einschätzung statt blinder Zusage.",
      "Fotos sparen Rueckfragen und beschleunigen die Entscheidung.",
    ],
    trustSignals: [
      "WhatsApp mit Fotos fuer schnelle Vorpruefung",
      "Telefonische Klaerung bei echten Deadlines",
      "Keine unrealistische 24h-Garantie ohne Kapazitaetspruefung",
      "Bewertungs-Hinweis: schnelle Rueckmeldung und klare Grenzen zaehlen besonders",
    ],
    guarantees: [
      "Schnelle Machbarkeitspruefung",
      "Ehrliche Priorisierung bei Zeitdruck",
      "Keine leeren Sofortversprechen",
    ],
    processSteps: [
      { title: "1. Deadline nennen", text: "Warum eilt es und bis wann muss der Raum nutzbar sein?" },
      { title: "2. Fotos senden", text: "Gesamtbild und Problemstellen reichen fuer den ersten Eindruck." },
      { title: "3. Prioritaeten festlegen", text: "Bad, Kueche, Eingang oder Uebergabepunkte werden nach Ziel sortiert." },
      { title: "4. Schnell umsetzen", text: "Wenn es passt, wird der Einsatz fokussiert geplant." },
    ],
    faqItems: [
      {
        q: "Ist eine Reinigung innerhalb von 24 Stunden garantiert?",
        a: "Nein. FLOXANT prueft kurzfristige Faelle nach Kapazitaet, Ort, Umfang und Zugang. Eine ehrliche Pruefung ist besser als ein leeres Versprechen.",
      },
      {
        q: "Welche Angaben brauche ich sofort?",
        a: "Ort, Deadline, Fotos, grobe Flaeche, Zugang und das Ziel: Besuch, Uebergabe, Besichtigung oder Alltag.",
      },
      {
        q: "Was ist bei wenig Zeit am wichtigsten?",
        a: "Meist Eingang, Bad, Kueche, sichtbare Boeden und die Bereiche, die der Termin wirklich betrifft.",
      },
      {
        q: "Kann FLOXANT auch abends oder am Wochenende pruefen?",
        a: "Anfragen koennen jederzeit gesendet werden. Rueckmeldung und Einsatz haengen von Verfuegbarkeit und Kapazitaet ab.",
      },
    ],
    relatedSlugs: ["mama-kommt-morgen-service", "reset-reinigung", "schluesselruhe-service"],
    searchIntents: ["kurzfristige Reinigung Regensburg", "24h Reinigung", "Notfallreinigung"],
    supportingArticles: urgentArticles,
  },
  {
    slug: "reset-reinigung",
    serviceName: "Reset-Reinigung",
    shortName: "Reset",
    category: "Entlastungsreinigung",
    seoTitle: "Reset-Reinigung Regensburg | Wohnung wieder nutzbar machen",
    metaDescription:
      "Reset-Reinigung in Regensburg: Wohnung, Kueche, Bad und Wohnbereiche nach Stressphase, Umzug, Party oder Belastung wieder geordnet nutzbar machen.",
    heroHeadline: "Wenn die Wohnung zu laut geworden ist, braucht sie einen Reset.",
    heroSubheadline:
      "FLOXANT bringt belastete Wohnbereiche wieder in eine klare Reihenfolge: erst Nutzbarkeit, dann Details, ohne Scham und ohne Perfektionsdruck.",
    primaryCta: "Reset anfragen",
    whatsappText:
      "Hallo FLOXANT, ich moechte eine Reset-Reinigung anfragen. Ort, Situation, Fotos und Ziel:",
    emotionalPromise:
      "Sie muessen nicht alles erklaeren. Ein paar ehrliche Fotos und ein Ziel reichen, damit der erste Schritt kleiner wird.",
    localNote:
      "Fuer Wohnungen und Haeuser in Regensburg, der Oberpfalz und Bayern, wenn Alltag, Besuch oder Uebergabe wieder steuerbar werden soll.",
    problemTitle: "Manchmal ist nicht der Schmutz das Schwerste, sondern der Anfang.",
    worries: [
      "Die Wohnung fuehlt sich unkontrollierbar an.",
      "Kueche oder Bad blockieren den Alltag.",
      "Scham verhindert, dass Hilfe angefragt wird.",
    ],
    conflicts: [
      "Alles wirkt gleich wichtig.",
      "Ordnung, Muell und Reinigung werden vermischt.",
      "Der Kunde will Hilfe, aber keine Bloßstellung.",
    ],
    stressSituations: [
      "Nach Party oder Krankheit",
      "Nach Umzug oder Renovierungsphase",
      "Vor Besuch oder Familienankunft",
      "Nach laengerem Liegenlassen",
    ],
    solutionIntro:
      "FLOXANT behandelt die Situation sachlich: Welche Raeume muessen zuerst nutzbar werden, was muss weg, was muss gereinigt und was kann spaeter folgen?",
    solutionSteps: [
      { title: "Zielzustand festlegen", text: "Bewohnbar, besuchsbereit, uebergabebereit oder einfach wieder nutzbar." },
      { title: "Raeume priorisieren", text: "Kueche, Bad, Laufwege und Aufenthaltsbereiche bekommen eine klare Reihenfolge." },
      { title: "Restmengen trennen", text: "Muell, Gegenstaende und Reinigung werden nicht in einen Topf geworfen." },
      { title: "Reset ausfuehren", text: "Der Einsatz konzentriert sich auf Entlastung und sichtbare Nutzbarkeit." },
    ],
    whyItWorks: [
      "Der erste Schritt wird kleiner und konkreter.",
      "FLOXANT arbeitet ohne moralische Bewertung.",
      "Nutzbarkeit steht vor Perfektion.",
    ],
    trustSignals: [
      "Diskreter WhatsApp-Einstieg mit Fotos moeglich",
      "Ruhige Rueckmeldung ohne Rechtfertigungsdruck",
      "Erfahrung mit sensiblen Wohn- und Uebergabesituationen",
      "Bewertungs-Hinweis: Kunden achten bei solchen Faellen auf Respekt und Diskretion",
    ],
    guarantees: [
      "Keine Bloßstellung",
      "Klare Trennung von Reinigung, Ordnung und Entsorgung",
      "Realistischer Umfang vor Zusage",
    ],
    processSteps: [
      { title: "1. Kurz schildern", text: "Ein Satz zum Ziel reicht fuer den Anfang." },
      { title: "2. Fotos senden", text: "Nur die Bereiche, die relevant sind." },
      { title: "3. Reset-Plan erhalten", text: "FLOXANT setzt Prioritaeten statt Druck aufzubauen." },
      { title: "4. Alltag wieder oeffnen", text: "Die wichtigsten Raeume werden zuerst entlastet." },
    ],
    faqItems: [
      {
        q: "Muss ich mich fuer den Zustand rechtfertigen?",
        a: "Nein. Wichtig sind Ort, Ziel, Fotos und moegliche Risiken. Lange Erklaerungen sind nicht noetig.",
      },
      {
        q: "Ist Reset-Reinigung dasselbe wie Grundreinigung?",
        a: "Nicht ganz. Grundreinigung ist leistungsbezogen. Reset-Reinigung ist situationsbezogen: Es geht zuerst darum, den Alltag wieder steuerbar zu machen.",
      },
      {
        q: "Kann Entsorgung Teil des Services sein?",
        a: "Wenn Restmengen vorhanden sind, wird Entsorgung getrennt geprueft. Art, Menge und Zugang muessen klar sein.",
      },
      {
        q: "Ist der Service diskret?",
        a: "Ja. FLOXANT behandelt sensible Anfragen sachlich und respektvoll. Es werden nur die Informationen abgefragt, die fuer die Pruefung noetig sind.",
      },
    ],
    relatedSlugs: ["anti-scham-reinigung", "mama-kommt-morgen-service", "geruchslos-protokoll"],
    searchIntents: ["Wohnung wieder bewohnbar reinigen", "diskrete Reinigung", "Reinigung nach Party"],
    supportingArticles: resetArticles,
  },
  {
    slug: "geruchslos-protokoll",
    serviceName: "Geruchslos-Protokoll",
    shortName: "Geruchslos",
    category: "Geruchsorientierte Reinigung",
    seoTitle: "Geruchslos-Protokoll Regensburg | Gerueche sachlich reinigen lassen",
    metaDescription:
      "Geruchslos-Protokoll in Regensburg: Geruchsquellen, Kueche, Bad, Textilien und Oberflaechen vor Uebergabe, Besuch oder Neuvermietung sachlich pruefen.",
    heroHeadline: "Wenn ein Raum sauber aussieht, aber nicht sauber riecht.",
    heroSubheadline:
      "FLOXANT sucht nicht nach Duftspray-Loesungen, sondern nach sichtbaren Geruchsquellen, Reinigungsbereichen und realistischen Grenzen.",
    primaryCta: "Geruchsproblem einordnen",
    whatsappText:
      "Hallo FLOXANT, ich moechte ein Geruchsproblem einordnen lassen. Ort, Raeume, moegliche Quelle und Fotos:",
    emotionalPromise:
      "Das Thema wird sachlich: Quelle, Flaechen, Textilien, Zeitdruck und Ziel werden getrennt betrachtet.",
    localNote:
      "Fuer Wohnungen, Apartments und Objekte in Regensburg, der Oberpfalz und Bayern, wenn Geruch vor Uebergabe oder Nutzung zum Risiko wird.",
    problemTitle: "Geruch ist unsichtbar, aber beim Termin sofort spuerbar.",
    worries: [
      "Die Wohnung riecht trotz Putzen unangenehm.",
      "Besuch, Vermieter oder Nachmieter merken den Geruch sofort.",
      "Die Ursache ist nicht eindeutig.",
    ],
    conflicts: [
      "Duft ueberdeckt das Problem nur kurz.",
      "Kueche, Bad, Textilien und Muellbereiche werden nicht getrennt betrachtet.",
      "Erwartungen an komplette Geruchsentfernung sind unrealistisch, wenn die Quelle offen bleibt.",
    ],
    stressSituations: [
      "Uebergabe nach laengerer Nutzung",
      "Tier-, Rauch-, Koch- oder Feuchtigkeitsgeruch",
      "Apartmentwechsel",
      "Besichtigung oder Neuvermietung",
    ],
    solutionIntro:
      "FLOXANT prueft, wo Geruch wahrscheinlich sitzt und welche Reinigungsschritte realistisch helfen koennen, ohne medizinische oder baubiologische Versprechen.",
    solutionSteps: [
      { title: "Geruch beschreiben", text: "Raum, Staerke, Dauer und vermutete Quelle werden kurz eingeordnet." },
      { title: "Quellenbereiche pruefen", text: "Kueche, Bad, Textilien, Muellzonen und Oberflaechen werden getrennt betrachtet." },
      { title: "Reinigung priorisieren", text: "Fettfilm, Abflussnaehe, Textilien und Kontaktflaechen werden nach Wirkung sortiert." },
      { title: "Grenzen benennen", text: "Wenn Spezialpruefung oder Sanierung noetig sein koennte, wird das klar gesagt." },
    ],
    whyItWorks: [
      "Geruch wird als Quelle statt als peinliches Thema behandelt.",
      "Reinigung konzentriert sich auf wahrscheinliche Traegerflaechen.",
      "Falsche Garantien werden vermieden.",
    ],
    trustSignals: [
      "Diskrete Anfrage per WhatsApp moeglich",
      "Klare Abgrenzung zu Schimmel-, Schadstoff- oder Sanierungsfragen",
      "Praktische Erfahrung mit Uebergabe- und Apartment-Situationen",
      "Bewertungs-Hinweis: Ehrlichkeit bei Grenzen schafft mehr Vertrauen als Duftversprechen",
    ],
    guarantees: [
      "Quellenorientierte Vorpruefung",
      "Keine komplette Geruchsgarantie ohne Ursachenkenntnis",
      "Diskrete Behandlung sensibler Angaben",
    ],
    processSteps: [
      { title: "1. Geruch kurz beschreiben", text: "Wo, seit wann, wodurch vermutlich?" },
      { title: "2. Fotos und Nutzung nennen", text: "Kueche, Bad, Textilien, Haustier, Rauch oder Feuchtigkeit." },
      { title: "3. Reinigungspfad waehlen", text: "FLOXANT priorisiert die Bereiche mit groesster Wirkung." },
      { title: "4. Ergebnis realistisch pruefen", text: "Geruchsreduktion und weitere Schritte werden ehrlich eingeordnet." },
    ],
    faqItems: [
      {
        q: "Garantiert FLOXANT, dass jeder Geruch verschwindet?",
        a: "Nein. Geruch haengt von Quelle, Material, Dauer und Zustand ab. FLOXANT kann reinigen und Quellenbereiche pruefen, aber keine komplette Geruchsgarantie geben.",
      },
      {
        q: "Welche Gerueche sind typisch?",
        a: "Haeufig sind Kochgeruch, Rauch, Haustier, Muell, Feuchtigkeit, Abflussnaehe oder Textilien. Jede Ursache braucht eine andere Einordnung.",
      },
      {
        q: "Was soll ich zuerst senden?",
        a: "Raeume, vermutete Quelle, Dauer, Fotos der betroffenen Bereiche und den Termin, bis wann die Flaeche nutzbar sein muss.",
      },
      {
        q: "Was ist bei Schimmelverdacht?",
        a: "Bei Schimmel, Feuchtigkeit oder gesundheitlichen Beschwerden sollte eine geeignete Fachpruefung hinzugezogen werden. Reinigung ersetzt keine Diagnose.",
      },
    ],
    relatedSlugs: ["reset-reinigung", "anti-scham-reinigung", "atemruhig-reinigung"],
    searchIntents: ["Geruch Wohnung entfernen", "Geruchsreinigung Regensburg", "Wohnung riecht vor Uebergabe"],
    supportingArticles: odorArticles,
  },
  {
    slug: "anti-scham-reinigung",
    serviceName: "Anti-Scham Reinigung",
    shortName: "Anti-Scham",
    category: "Diskrete Reinigung",
    seoTitle: "Anti-Scham Reinigung Regensburg | Diskrete Hilfe ohne Bloßstellung",
    metaDescription:
      "Anti-Scham Reinigung in Regensburg: diskrete Hilfe bei belasteten Raeumen, peinlichen Situationen, Geruch, Schmutz oder starkem Putzdruck.",
    heroHeadline: "Sie muessen sich nicht schaemen, um Hilfe zu bekommen.",
    heroSubheadline:
      "FLOXANT behandelt sensible Reinigung sachlich, diskret und respektvoll. Keine Vorwuerfe, keine Bloßstellung, nur ein klarer naechster Schritt.",
    primaryCta: "Diskret anfragen",
    whatsappText:
      "Hallo FLOXANT, ich moechte diskret eine Reinigung anfragen. Ort, Ziel und Fotos:",
    emotionalPromise:
      "Der erste Schritt darf klein sein. Ein kurzer Satz, ein paar Fotos und ein sicherer Kontaktweg reichen.",
    localNote:
      "Fuer sensible Wohnsituationen in Regensburg, der Oberpfalz und Bayern, wenn Scham den ersten Schritt bisher blockiert hat.",
    problemTitle: "Scham macht aus einer praktischen Aufgabe ein stilles Problem.",
    worries: [
      "Jemand bewertet den Zustand der Wohnung.",
      "Fotos sind unangenehm.",
      "Der Fall ist zu privat fuer eine normale Anfrage.",
    ],
    conflicts: [
      "Der Kunde braucht Hilfe, will aber niemanden hineinlassen.",
      "Schmutz, Geruch und Restmengen werden emotional aufgeladen.",
      "Zu langes Warten macht die Aufgabe groesser.",
    ],
    stressSituations: [
      "Belastete Kueche oder Bad",
      "Geruch oder Muellspuren",
      "Nach Krankheit oder seelischer Belastung",
      "Vor Besuch, Vermietertermin oder Hilfe durch Angehoerige",
    ],
    solutionIntro:
      "FLOXANT reduziert die Anfrage auf das, was wirklich noetig ist: Ort, Ziel, Fotos, Risiken und gewuenschter Kontaktweg.",
    solutionSteps: [
      { title: "Sicheren Kontaktweg waehlen", text: "WhatsApp, Telefon oder Buchungsformular: Sie bestimmen den Einstieg." },
      { title: "Minimal beschreiben", text: "Ein Satz zum Ziel reicht: wieder bewohnbar, besuchsbereit oder uebergabebereit." },
      { title: "Umfang pruefen", text: "FLOXANT trennt Reinigung, Entsorgung, Geruch und moegliche Risiken." },
      { title: "Diskret umsetzen", text: "Der Einsatz wird ruhig, respektvoll und ohne unnoetige Fragen geplant." },
    ],
    whyItWorks: [
      "Die Anfrage verlangt keine Rechtfertigung.",
      "Sensible Themen werden praktisch und ohne Bewertung behandelt.",
      "Diskretion und klare Grenzen senken die Hemmschwelle.",
    ],
    trustSignals: [
      "Respektvoller Umgang mit Fotos und Zustandsangaben",
      "Klare Trennung von Reinigung, Entsorgung und Sonderrisiken",
      "Direkter Rueckruf nur nach Wunsch",
      "Bewertungs-Hinweis: Bei sensiblen Faellen zaehlen Diskretion und ruhiger Ton",
    ],
    guarantees: [
      "Keine Bloßstellung",
      "Keine unnoetige Detailabfrage",
      "Ehrliche Machbarkeitspruefung vor Auftrag",
    ],
    processSteps: [
      { title: "1. Kontaktweg waehlen", text: "WhatsApp ist oft der leichteste erste Schritt." },
      { title: "2. Ziel nennen", text: "Was soll nachher moeglich sein?" },
      { title: "3. Fotos senden", text: "Nur relevante Bereiche, keine Erklaerungspflicht." },
      { title: "4. Einsatz diskret planen", text: "FLOXANT stimmt Umfang und Ablauf ruhig ab." },
    ],
    faqItems: [
      {
        q: "Muss ich genau erklaeren, warum es so aussieht?",
        a: "Nein. Fuer die erste Pruefung reichen Ort, Ziel, Fotos und moegliche Risiken. Persoenliche Gruende sind nur relevant, wenn sie den Ablauf beeinflussen.",
      },
      {
        q: "Ist der Service fuer sehr stark belastete Raeume geeignet?",
        a: "Das wird geprueft. Bei Sondermuell, Gefahrstoffen, starkem Schimmel oder gesundheitlichen Risiken koennen Spezialanbieter noetig sein.",
      },
      {
        q: "Kann ich anonym vorfragen?",
        a: "Sie koennen zunaechst sehr knapp per WhatsApp schreiben. Fuer einen Auftrag braucht FLOXANT spaeter aber klare Kontakt- und Objektdaten.",
      },
      {
        q: "Gibt es Fotos nach der Reinigung?",
        a: "Wenn vereinbart, koennen relevante Ergebnisse dokumentiert werden. Das ersetzt kein offizielles Gutachten.",
      },
    ],
    relatedSlugs: ["reset-reinigung", "geruchslos-protokoll", "atemruhig-reinigung"],
    searchIntents: ["diskrete Reinigung", "Wohnung reinigen Scham", "belastete Raeume reinigen"],
    supportingArticles: shameArticles,
  },
  {
    slug: "mama-kommt-morgen-service",
    serviceName: "Mama-kommt-morgen Service",
    shortName: "Mama kommt morgen",
    category: "Besuchsbereit-Reinigung",
    seoTitle: "Mama-kommt-morgen Service Regensburg | Wohnung schnell vorzeigbar",
    metaDescription:
      "Mama-kommt-morgen Service in Regensburg: kurzfristige Besuchsreinigung fuer Wohnung, Bad, Kueche und sichtbare Bereiche ohne Putzpanik.",
    heroHeadline: "Morgen kommt Besuch. Heute holen wir den Druck raus.",
    heroSubheadline:
      "FLOXANT priorisiert die Raeume, die zuerst gesehen werden: Eingang, Bad, Kueche, Wohnbereich und Geruchseindruck.",
    primaryCta: "Wohnung vorzeigbar machen",
    whatsappText:
      "Hallo FLOXANT, morgen kommt Besuch. Ich moechte die Wohnung schnell vorzeigbar machen. Ort, Fotos, Zeitfenster:",
    emotionalPromise:
      "Nicht alles muss makellos werden. Aber der erste Eindruck kann deutlich ruhiger werden.",
    localNote:
      "Fuer Wohnungen und Haeuser in Regensburg, der Oberpfalz und Bayern, wenn Besuch, Familie oder ein privater Termin kurzfristig ansteht.",
    problemTitle: "Besuch macht private Unordnung ploetzlich oeffentlich.",
    worries: [
      "Familie oder Besuch beurteilt die Wohnung.",
      "Bad und Kueche wirken nicht vorzeigbar.",
      "Es ist zu wenig Zeit fuer einen kompletten Putzplan.",
    ],
    conflicts: [
      "Perfektion kostet Zeit, die nicht da ist.",
      "Sichtbare Bereiche zaehlen mehr als versteckte Details.",
      "Scham und Zeitdruck fuehren zu falscher Reihenfolge.",
    ],
    stressSituations: [
      "Familienbesuch am naechsten Tag",
      "Partner, Eltern oder Freunde kommen vorbei",
      "Kurzfristige Uebernachtung",
      "Wohnung soll nicht erklaert werden muessen",
    ],
    solutionIntro:
      "FLOXANT denkt in Wirkung: Was sieht jemand zuerst, wo entsteht Geruch, welche Flaechen muessen nutzbar wirken und welche Details koennen warten?",
    solutionSteps: [
      { title: "Sichtwege klaeren", text: "Eingang, Flur, Bad, Kueche und Aufenthaltsbereich werden zuerst betrachtet." },
      { title: "Zeitfenster setzen", text: "Die verfuegbare Zeit entscheidet, welche Tiefe realistisch ist." },
      { title: "Wirkung priorisieren", text: "Geruch, Muell, sichtbare Flaechen und Sanitärbereiche haben Vorrang." },
      { title: "Besuchsbereit abschliessen", text: "Ziel ist ein ruhiger Eindruck, nicht eine vollstaendige Inventur jeder Ecke." },
    ],
    whyItWorks: [
      "Der Fokus liegt auf Besuchslogik statt Komplettreinigung.",
      "Sichtbare Wirkung wird vor Detailarbeit gesetzt.",
      "Der Kunde muss sich nicht in Putzpanik verlieren.",
    ],
    trustSignals: [
      "Kurzfristige Vorpruefung per WhatsApp",
      "Klare Priorisierung bei knapper Zeit",
      "Diskreter Umgang mit privaten Raeumen",
      "Bewertungs-Hinweis: Kunden schaetzen schnelle, freundliche Entlastung",
    ],
    guarantees: [
      "Ehrliche Priorisierung nach Zeitfenster",
      "Keine Perfektionsversprechen bei unrealistischem Umfang",
      "Diskrete Behandlung privater Bereiche",
    ],
    processSteps: [
      { title: "1. Besuchszeit nennen", text: "Wann muss die Wohnung wirken?" },
      { title: "2. Sichtbereiche senden", text: "Fotos von Eingang, Bad, Kueche und Wohnbereich reichen oft." },
      { title: "3. Fokus festlegen", text: "FLOXANT priorisiert Eindruck, Geruch und Nutzbarkeit." },
      { title: "4. Putzpanik senken", text: "Der Einsatz wird auf die reale Zeit abgestimmt." },
    ],
    faqItems: [
      {
        q: "Ist das eine komplette Grundreinigung?",
        a: "Nein. Der Service ist besuchsorientiert. Bei wenig Zeit werden sichtbare und stark genutzte Bereiche priorisiert.",
      },
      {
        q: "Kann FLOXANT am selben Tag kommen?",
        a: "Das wird nach Kapazitaet, Ort und Umfang geprueft. Fotos und klare Deadline helfen.",
      },
      {
        q: "Was ist zuerst wichtig?",
        a: "Meist Eingang, Bad, Kueche, Muell/Geruch und der Aufenthaltsbereich, in dem Besuch wirklich sitzt.",
      },
      {
        q: "Muss ich vorher aufraeumen?",
        a: "Je weniger Flaechen blockiert sind, desto mehr Reinigung ist moeglich. Wenn Aufraeumen Teil des Problems ist, sollte das vorher ehrlich gesagt werden.",
      },
    ],
    relatedSlugs: ["panikfrei-in-24h", "reset-reinigung", "anti-scham-reinigung"],
    searchIntents: ["Wohnung schnell vorzeigbar", "Reinigung bevor Besuch kommt", "Putzpanik Hilfe"],
    supportingArticles: familyVisitArticles,
  },
  {
    slug: "hidden-dirt-check",
    serviceName: "Hidden Dirt Check",
    shortName: "Hidden Dirt",
    category: "Detailcheck Reinigung",
    seoTitle: "Hidden Dirt Check Regensburg | Versteckten Schmutz vor Uebergabe finden",
    metaDescription:
      "Hidden Dirt Check in Regensburg: versteckte Schmutzstellen in Kueche, Bad, Sockeln, Ecken und Nebenflaechen vor Uebergabe oder Besichtigung pruefen.",
    heroHeadline: "Die Wohnung wirkt sauber. Aber was sieht ein zweiter Blick?",
    heroSubheadline:
      "FLOXANT prueft typische Hidden-Dirt-Stellen, bevor Vermieter, Nachmieter oder Kunden sie zuerst entdecken.",
    primaryCta: "Hidden Dirt pruefen",
    whatsappText:
      "Hallo FLOXANT, ich moechte einen Hidden Dirt Check anfragen. Ort, Termin, Fotos und kritische Bereiche:",
    emotionalPromise:
      "Sie bekommen einen zweiten Blick auf die Stellen, die im Auszugsstress schnell uebersehen werden.",
    localNote:
      "Besonders sinnvoll in Regensburg, der Oberpfalz und Bayern vor Uebergabe, Besichtigung, Neuvermietung oder Objektabnahme.",
    problemTitle: "Versteckter Schmutz taucht genau dann auf, wenn jemand gezielt hinsieht.",
    worries: [
      "Kueche und Bad sehen oberflaechlich sauber aus, aber Details bleiben.",
      "Sockel, Fugen, Ränder oder Geraetenaehe wurden vergessen.",
      "Der Vermieter schaut genauer als erwartet.",
    ],
    conflicts: [
      "Normales Putzen deckt nicht jede Detailstelle ab.",
      "Kunde und Vermieter haben unterschiedliche Blickwinkel.",
      "Zu viel Detailarbeit kurz vor Schluss ueberfordert.",
    ],
    stressSituations: [
      "Uebergabe mit anspruchsvollem Vermieter",
      "Nachmieterbesichtigung",
      "Kueche oder Bad als Risikobereich",
      "Wohnung war lange genutzt",
    ],
    solutionIntro:
      "FLOXANT konzentriert sich auf die Stellen, die selten im ersten Putzdurchgang auffallen, aber beim Termin stark wirken koennen.",
    solutionSteps: [
      { title: "Risikostellen markieren", text: "Kueche, Bad, Sockel, Tueren, Fugen, Geraeteumfeld und Nebenflaechen werden eingeordnet." },
      { title: "Sichtbarkeit bewerten", text: "Nicht jede Stelle ist gleich wichtig. Der Terminzweck entscheidet." },
      { title: "Nachreinigung planen", text: "FLOXANT klaert, ob ein Check, eine Fokusreinigung oder eine tiefere Reinigung sinnvoll ist." },
      { title: "Ergebnis rueckmelden", text: "Offene Punkte werden sachlich benannt, nicht dramatisiert." },
    ],
    whyItWorks: [
      "Ein zweiter Blick findet typische Uebergabefallen.",
      "Detailstellen werden nach Wirkung priorisiert.",
      "Der Kunde gewinnt Sicherheit, ohne jede Ecke selbst kontrollieren zu muessen.",
    ],
    trustSignals: [
      "Klare Sichtbereiche statt pauschale Angstliste",
      "Fokus auf Uebergabe, Besichtigung oder Objektabnahme",
      "Erfahrung mit Endreinigung und Vermieterterminen",
      "Bewertungs-Hinweis: Gruendlichkeit wird besonders bei Details wahrgenommen",
    ],
    guarantees: [
      "Strukturierter Blick auf typische Risikostellen",
      "Keine Garantie, dass niemand weitere Punkte findet",
      "Ehrliche Trennung von sauber, nachreinigbar und nicht reinigungsbezogen",
    ],
    processSteps: [
      { title: "1. Termin und Flaeche senden", text: "Wofuer soll der Check dienen?" },
      { title: "2. Kritische Raeume nennen", text: "Kueche, Bad oder Nebenflaechen bekommen Prioritaet." },
      { title: "3. Hidden-Dirt-Liste pruefen", text: "FLOXANT geht typische Stellen durch." },
      { title: "4. Nachreinigung fokussieren", text: "Was relevant ist, wird gezielt erledigt." },
    ],
    faqItems: [
      {
        q: "Ist Hidden Dirt Check eine komplette Reinigung?",
        a: "Nicht zwingend. Der Check kann mit Nachreinigung kombiniert werden, ist aber vor allem ein strukturierter Blick auf typische Detailstellen.",
      },
      {
        q: "Welche Stellen werden oft uebersehen?",
        a: "Sockel, Tuerrahmen, Lichtschalter, Armaturen, Abfluesse, Fugen, Geraeteumfeld, Heizkoerpernaehe und Nebenflaechen.",
      },
      {
        q: "Wann lohnt sich der Check?",
        a: "Vor Uebergabe, Besichtigung, Neuvermietung oder wenn die Wohnung zwar sauber wirkt, aber Unsicherheit bei Details bleibt.",
      },
      {
        q: "Kann ich nur Fotos senden?",
        a: "Ja. Fotos helfen fuer die erste Einordnung. Fuer einen belastbaren Einsatz muessen Zugang, Termin und Umfang danach geklaert werden.",
      },
    ],
    relatedSlugs: ["sichtbar-sauber-protokoll", "vermieter-schockschutz-reinigung", "baustaub-ende"],
    searchIntents: ["versteckter Schmutz Uebergabe", "Endreinigung Detailcheck", "Hidden Dirt Check"],
    supportingArticles: hiddenDirtArticles,
  },
  {
    slug: "montagmorgen-effekt",
    serviceName: "Montagmorgen-Effekt",
    shortName: "Montagmorgen",
    category: "Gewerbliche Reinigung",
    seoTitle: "Montagmorgen-Effekt Regensburg | Buero sauber in die Woche starten",
    metaDescription:
      "Montagmorgen-Effekt fuer Regensburg: Bueroreinigung, Empfang, Kueche und Sanitaer vor Wochenstart so planen, dass Team und Kunden besser ankommen.",
    heroHeadline: "Montag soll nicht nach letzter Woche aussehen.",
    heroSubheadline:
      "FLOXANT bereitet Bueros, Praxen und Gewerbeflaechen so vor, dass der Wochenstart sauber, ruhig und ordentlich wirkt.",
    primaryCta: "Wochenstart vorbereiten",
    whatsappText:
      "Hallo FLOXANT, ich moechte den Montagmorgen-Effekt fuer unser Objekt anfragen. Ort, Flaeche, Turnus und Zeitfenster:",
    emotionalPromise:
      "Mitarbeitende, Kunden und Patienten betreten Raeume, die den Wochenstart tragen statt bremsen.",
    localNote:
      "Fuer Bueros, Praxen, Kanzleien, kleine Unternehmen und Objekte in Regensburg, der Oberpfalz und Bayern.",
    problemTitle: "Der erste Eindruck der Woche entsteht oft vor dem ersten Gespraech.",
    worries: [
      "Empfang, Kueche oder Sanitärbereich wirken Montag nicht bereit.",
      "Mitarbeitende starten in unruhige Raeume.",
      "Reinigung stoert den Betrieb, wenn sie falsch getaktet ist.",
    ],
    conflicts: [
      "Wochenendreinigung braucht Zugang und klare Verantwortung.",
      "Bueroreinigung muss sichtbar wirken, ohne Arbeitsplaetze zu verletzen.",
      "Turnus, Schluessel und Rueckmeldung sind oft unklar.",
    ],
    stressSituations: [
      "Kundenverkehr am Montagmorgen",
      "Praxisstart nach Wochenende",
      "Teamkueche stark genutzt",
      "Empfang oder Wartebereich wirkt unruhig",
    ],
    solutionIntro:
      "FLOXANT denkt nicht nur in Quadratmetern, sondern in Wirkung: Welche Bereiche entscheiden den Wochenstart und wie wird der Zugang sauber geregelt?",
    solutionSteps: [
      { title: "Objektzonen klaeren", text: "Empfang, Sanitär, Kueche, Laufwege und Arbeitsbereiche werden getrennt." },
      { title: "Zeitfenster planen", text: "Wochenende, Randzeit oder frueher Morgen werden nach Zugang und Betrieb geprueft." },
      { title: "Leistung definieren", text: "Turnus, Tiefe, Ansprechpartner und Rueckmeldung werden festgelegt." },
      { title: "Montag-Eindruck sichern", text: "Der Fokus liegt auf den Flaechen, die Team und Kunden sofort erleben." },
    ],
    whyItWorks: [
      "Gewerbliche Reinigung wird aus Sicht des Betriebsstarts geplant.",
      "Sichtbereiche und Nutzungsbereiche werden getrennt priorisiert.",
      "Klare Ansprechpartner reduzieren Reibung im laufenden Betrieb.",
    ],
    trustSignals: [
      "B2B-taugliche Anfrage mit Flaeche, Turnus und Zeitfenster",
      "Feste Ansprechpartner nach Abstimmung",
      "Erfahrung mit Bueros, Praxen, Hotels und Hausverwaltungen",
      "Bewertungs-Hinweis: Gewerbekunden achten auf Zuverlaessigkeit und Planbarkeit",
    ],
    guarantees: [
      "Klare Leistungsabgrenzung je Objekt",
      "Keine Stoerung des Betriebs ohne vorherige Abstimmung",
      "Rueckmeldeweg fuer Qualitaet und Anpassungen",
    ],
    processSteps: [
      { title: "1. Objekt beschreiben", text: "Flaeche, Nutzung, Teamgroesse und Kundenverkehr." },
      { title: "2. Zeitfenster klaeren", text: "Wann darf gereinigt werden?" },
      { title: "3. Zonen priorisieren", text: "Empfang, Kueche, Sanitär, Besprechung und Laufwege." },
      { title: "4. Turnus starten", text: "Nach Abstimmung wird der Wochenstart planbarer." },
    ],
    faqItems: [
      {
        q: "Ist der Montagmorgen-Effekt nur fuer Bueros?",
        a: "Nein. Er passt auch fuer Praxen, Kanzleien, kleine Hotels, Agenturen, Verwaltungen und Gewerbeflaechen.",
      },
      {
        q: "Kann die Reinigung am Wochenende stattfinden?",
        a: "Das wird nach Zugang, Schluessel, Alarm, Team und Verfuegbarkeit geprueft.",
      },
      {
        q: "Was wird zuerst gereinigt?",
        a: "Meist Empfang, Sanitär, Kueche, Laufwege und gemeinsam genutzte Bereiche. Arbeitsplaetze werden nur im vereinbarten Umfang beruehrt.",
      },
      {
        q: "Wie startet eine B2B-Anfrage?",
        a: "Hilfreich sind Flaeche, Objektart, Turnuswunsch, Zeitfenster, Fotos und Ansprechpartner.",
      },
    ],
    relatedSlugs: ["sichtbar-sauber-protokoll", "hidden-dirt-check", "baustaub-ende"],
    searchIntents: ["Bueroreinigung Wochenende", "Bueroreinigung Regensburg", "Gewerbereinigung Wochenstart"],
    supportingArticles: mondayArticles,
  },
  {
    slug: "atemruhig-reinigung",
    serviceName: "Atemruhig-Reinigung",
    shortName: "Atemruhig",
    category: "Staub- und Wohngefuehl-Reinigung",
    seoTitle: "Atemruhig-Reinigung Regensburg | Staubarme Reinigung ohne Heilversprechen",
    metaDescription:
      "Atemruhig-Reinigung in Regensburg: Staub, schwere Raumwirkung und belastete Flaechen nach Renovierung, Umzug oder Alltag sachlich reduzieren lassen.",
    heroHeadline: "Wenn Raeume schwer wirken, braucht Reinigung klare Grenzen.",
    heroSubheadline:
      "FLOXANT reduziert sichtbare Staub- und Belastungsquellen ohne medizinische Versprechen: sachlich, strukturiert und mit Blick auf Wohngefuehl.",
    primaryCta: "Staub und Raumgefuehl pruefen",
    whatsappText:
      "Hallo FLOXANT, ich moechte eine Atemruhig-Reinigung anfragen. Ort, Raeume, Staub-/Geruchsthema und Fotos:",
    emotionalPromise:
      "Sie bekommen eine ehrliche Reinigungseinordnung, die Wohngefuehl verbessert, ohne Gesundheit zu versprechen.",
    localNote:
      "Fuer Wohnungen, Schlafzimmer, Arbeitszimmer und Objekte in Regensburg, der Oberpfalz und Bayern nach Renovierung, Umzug oder laengerer Belastung.",
    problemTitle: "Manchmal ist ein Raum nicht dreckig im klassischen Sinn, sondern schwer.",
    worries: [
      "Staub kommt immer wieder.",
      "Der Raum fuehlt sich stickig oder belastet an.",
      "Der Kunde will Hilfe, aber keine medizinischen Versprechen.",
    ],
    conflicts: [
      "Reinigung kann sichtbare Belastung reduzieren, aber keine Diagnose ersetzen.",
      "Staub, Geruch und Feuchtigkeit werden oft vermischt.",
      "Textilien, Regale und Bodenflaechen brauchen unterschiedliche Behandlung.",
    ],
    stressSituations: [
      "Nach Renovierung",
      "Nach Umzug oder Moebelaufbau",
      "Schlafzimmer oder Kinderzimmer wirkt staubig",
      "Homeoffice soll ruhiger werden",
    ],
    solutionIntro:
      "FLOXANT trennt Staub, Geruch, Textilien, Oberflaechen und moegliche Fachthemen, damit aus einem diffusen Gefuehl ein machbarer Reinigungsplan wird.",
    solutionSteps: [
      { title: "Raumgefuehl beschreiben", text: "Schwer, staubig, muffig oder nach Renovierung: die Ursache wird eingegrenzt." },
      { title: "Flaechen priorisieren", text: "Boden, Regale, Fensterbank, Textilien und Staubfaenger werden getrennt betrachtet." },
      { title: "Reinigung schonend planen", text: "Ziel ist weniger Aufwirbeln und mehr klare Reihenfolge." },
      { title: "Grenzen offen halten", text: "Bei Schimmel, Feuchtigkeit oder Beschwerden wird Fachpruefung empfohlen." },
    ],
    whyItWorks: [
      "Das Thema wird ehrlich begrenzt.",
      "Staubquellen werden statt nur Oberflaechen betrachtet.",
      "Die Raeume werden nach Aufenthaltsdauer priorisiert.",
    ],
    trustSignals: [
      "Keine medizinischen Heilversprechen",
      "Klare Abgrenzung zu Schimmel- oder Schadstoffthemen",
      "Ruhige Vorpruefung per Foto und Beschreibung",
      "Bewertungs-Hinweis: Ehrliche Grenzen verhindern falsche Erwartungen",
    ],
    guarantees: [
      "Staub- und Flaechenfokus nach realistischem Umfang",
      "Keine Gesundheits- oder Allergiegarantie",
      "Empfehlung zur Fachpruefung bei Risiken",
    ],
    processSteps: [
      { title: "1. Raeume nennen", text: "Wo fuehlt es sich schwer oder staubig an?" },
      { title: "2. Ursache vermuten", text: "Renovierung, Umzug, Textilien, Feuchtigkeit oder Nutzung." },
      { title: "3. Flaechen priorisieren", text: "Schlaf-, Arbeits- und Kinderbereiche zuerst, wenn sie betroffen sind." },
      { title: "4. Reinigung realistisch planen", text: "FLOXANT arbeitet ohne Heilversprechen, aber mit klarer Struktur." },
    ],
    faqItems: [
      {
        q: "Ist Atemruhig-Reinigung eine medizinische Leistung?",
        a: "Nein. Es geht um Reinigung und sichtbare Staub- oder Belastungsquellen. Medizinische, allergologische oder baubiologische Fragen ersetzt der Service nicht.",
      },
      {
        q: "Kann der Service bei Allergien helfen?",
        a: "FLOXANT kann Staub und sichtbare Belastungen reduzieren. Ob das gesundheitlich hilft, kann nur medizinisch eingeordnet werden.",
      },
      {
        q: "Was ist bei Schimmelverdacht?",
        a: "Bei Schimmel, Feuchtigkeit oder gesundheitlichen Beschwerden sollte eine geeignete Fachpruefung erfolgen.",
      },
      {
        q: "Welche Raeume sind typisch?",
        a: "Schlafzimmer, Kinderzimmer, Arbeitszimmer, renovierte Raeume und Wohnbereiche mit viel Staub oder Textilien.",
      },
    ],
    relatedSlugs: ["baustaub-ende", "geruchslos-protokoll", "reset-reinigung"],
    searchIntents: ["staubarme Reinigung", "Raumluft schwer Reinigung", "Reinigung nach Renovierung"],
    supportingArticles: breathingArticles,
  },
  {
    slug: "baustaub-ende",
    serviceName: "Baustaub-Ende",
    shortName: "Baustaub-Ende",
    category: "Bau- und Renovierungsreinigung",
    seoTitle: "Baustaub-Ende Regensburg | Baustaub nach Renovierung entfernen",
    metaDescription:
      "Baustaub-Ende in Regensburg: Baustaub, Renovierungsstaub und Baufeinstaub vor Einzug, Uebergabe oder Nutzung in sinnvoller Reihenfolge reinigen lassen.",
    heroHeadline: "Baustaub ist erst vorbei, wenn er nicht morgen wieder da ist.",
    heroSubheadline:
      "FLOXANT plant Baustaub-Reinigung in Etappen: grob entfernen, Feinstaub beruhigen, Oberflaechen pruefen und den Raum wieder nutzbar machen.",
    primaryCta: "Baustaub beenden",
    whatsappText:
      "Hallo FLOXANT, ich moechte Baustaub-Ende anfragen. Ort, Renovierungsstand, Flaeche, Fotos und Termin:",
    emotionalPromise:
      "Nach Renovierung oder Bauphase entsteht wieder ein Raum, der sich bezugsbereit, ruhiger und klarer anfuehlt.",
    localNote:
      "Fuer Wohnungen, Haeuser, Bueros und Objekte in Regensburg, der Oberpfalz und Bayern nach Renovierung, Handwerkertermin oder Umbau.",
    problemTitle: "Baustaub haelt sich nicht an normale Putzlogik.",
    worries: [
      "Nach dem Wischen liegt am naechsten Tag wieder Staub.",
      "Einzug oder Uebergabe steht an, aber die Raeume wirken noch wie Baustelle.",
      "Feinstaub sitzt auf Kanten, Boeden, Fensterbaenken und Oberflaechen.",
    ],
    conflicts: [
      "Zu fruehes Putzen fuehrt zu doppelter Arbeit.",
      "Bauarbeiten, Reinigung und Einzug werden zu eng geplant.",
      "Grobe Reste und Feinstaub werden nicht getrennt.",
    ],
    stressSituations: [
      "Renovierung kurz vor Einzug",
      "Handwerkerstaub nach Umbau",
      "Baufeinreinigung vor Abnahme",
      "Bueroflaeche soll wieder nutzbar werden",
    ],
    solutionIntro:
      "FLOXANT klaert zuerst, ob die Bauarbeiten wirklich abgeschlossen sind und welche Staubebenen realistisch bearbeitet werden koennen.",
    solutionSteps: [
      { title: "Renovierungsstand klaeren", text: "Sind Handwerker fertig oder entsteht weiter Staub?" },
      { title: "Grob und fein trennen", text: "Bauschmutz, Verpackungsreste und Feinstaub brauchen unterschiedliche Reihenfolge." },
      { title: "Oberflaechen in Etappen reinigen", text: "Baustaub wird nicht einfach verteilt, sondern kontrolliert reduziert." },
      { title: "Nutzbarkeit pruefen", text: "Einzug, Uebergabe oder Arbeitsstart werden als Ziel mitgedacht." },
    ],
    whyItWorks: [
      "Die Reihenfolge passt zum Staubverhalten.",
      "Einzug und Uebergabe werden nicht direkt in die erste Putzrunde gepresst.",
      "FLOXANT grenzt normale Reinigung von Baufeinreinigung ab.",
    ],
    trustSignals: [
      "Vorpruefung mit Fotos vom Renovierungsstand",
      "Klare Einordnung von Bauendreinigung, Baufeinreinigung und Nachstaub",
      "Erfahrung mit Wohnungen, Bueros und Uebergabeobjekten",
      "Bewertungs-Hinweis: Zuverlaessige Reihenfolge zaehlt bei Baustaub mehr als Tempo",
    ],
    guarantees: [
      "Reinigung erst nach realistischer Staub- und Bauphase-Einordnung",
      "Keine Garantie gegen neuen Staub bei laufenden Arbeiten",
      "Klare Rueckmeldung, wenn weitere Runde sinnvoll ist",
    ],
    processSteps: [
      { title: "1. Bauphase beschreiben", text: "Was wurde gemacht und ist noch etwas offen?" },
      { title: "2. Fotos senden", text: "Boden, Fensterbank, Kanten, Sanitaer und grobe Reste zeigen." },
      { title: "3. Reihenfolge planen", text: "Grobstaub, Feinstaub und Sichtflaechen getrennt behandeln." },
      { title: "4. Raum nutzbar machen", text: "Der Einsatz wird auf Einzug, Uebergabe oder Arbeitsstart ausgerichtet." },
    ],
    faqItems: [
      {
        q: "Warum kommt Baustaub nach der Reinigung wieder?",
        a: "Feinstaub setzt sich oft mehrfach ab, besonders wenn Arbeiten gerade erst beendet sind oder Luftbewegung entsteht. Deshalb ist die Reihenfolge wichtig.",
      },
      {
        q: "Wann sollte Baustaub gereinigt werden?",
        a: "Sinnvoll ist Reinigung, wenn grobe Arbeiten abgeschlossen sind. Bei laufenden Arbeiten kann nur eine Zwischenreinigung realistisch sein.",
      },
      {
        q: "Ist Baustaub-Ende eine Baufeinreinigung?",
        a: "Je nach Umfang kann es Richtung Baufeinreinigung gehen. FLOXANT klaert vorab, ob normale Reinigung, Fokusreinigung oder Baufeinreinigung passt.",
      },
      {
        q: "Kann FLOXANT kurzfristig vor Einzug helfen?",
        a: "Das wird nach Kapazitaet, Ort, Flaeche und Renovierungsstand geprueft. Fotos beschleunigen die Einordnung.",
      },
    ],
    relatedSlugs: ["atemruhig-reinigung", "hidden-dirt-check", "sichtbar-sauber-protokoll"],
    searchIntents: ["Baustaub entfernen", "Baufeinreinigung Regensburg", "Reinigung nach Renovierung"],
    supportingArticles: constructionDustArticles,
  },
] as const satisfies readonly PsychologicalCleaningLandingPage[];

export type PsychologicalCleaningLandingSlug =
  (typeof psychologicalCleaningLandingPages)[number]["slug"];

export const psychologicalCleaningLandingRoutes = psychologicalCleaningLandingPages.map(
  (page) => `/${page.slug}`,
);

export function getPsychologicalCleaningPage(
  slug: string,
): PsychologicalCleaningLandingPage | undefined {
  return psychologicalCleaningLandingPages.find(
    (page) => page.slug === slug,
  ) as PsychologicalCleaningLandingPage | undefined;
}

export function getPsychologicalCleaningRelatedPages(page: PsychologicalCleaningLandingPage) {
  return page.relatedSlugs
    .map((slug) => getPsychologicalCleaningPage(slug))
    .filter((item): item is PsychologicalCleaningLandingPage => Boolean(item));
}

function buildBlogArticle(
  page: PsychologicalCleaningLandingPage,
  seed: PsychologicalCleaningArticleSeed,
): StrategicBlogArticle {
  return {
    slug: seed.articleSlug,
    category: seed.category,
    readTime: "6 Min.",
    date: sharedDate,
    datePublished: sharedDatePublished,
    title: seed.title,
    metaTitle: seed.metaTitle,
    description: seed.description,
    intro: seed.intro,
    about: [page.serviceName, page.category, "Reinigung", "Regensburg", "Oberpfalz", "Bayern"],
    keywords: [...seed.keywordFocus, ...page.searchIntents, "FLOXANT"].slice(0, 12),
    sections: [
      {
        title: "Das eigentliche Problem",
        paragraphs: [
          seed.readerProblem,
          `${page.shortName} passt, wenn aus einem diffusen Druck ein konkreter Reinigungs- oder Uebergabeschritt werden soll. FLOXANT fragt deshalb nicht nach langen Erklaerungen, sondern nach Ort, Ziel, Zeitfenster, Fotos und sichtbaren Risiken.`,
        ],
      },
      {
        title: "Worauf Kunden zuerst achten sollten",
        paragraphs: [
          seed.practicalAngle,
          "In Regensburg und der Oberpfalz entscheiden oft einfache praktische Details: Zugang, Etage, Parkmoeglichkeit, Nebenflaechen, Termin und die Frage, ob noch Restmengen vor der Reinigung im Weg stehen.",
        ],
        bullets: [...seed.checklist],
      },
      {
        title: `Wie ${page.serviceName} dabei hilft`,
        paragraphs: [
          page.solutionIntro,
          `Der Service ist keine lose Putzliste. Er ist als Problemloesung aufgebaut: ${page.emotionalPromise}`,
        ],
        bullets: page.solutionSteps.map((step) => `${step.title}: ${step.text}`),
      },
      {
        title: "Der naechste sinnvolle Schritt",
        paragraphs: [
          `Wer den Fall klaeren moechte, sollte nicht warten, bis der Druck groesser wird. Eine kurze Anfrage mit Fotos reicht fuer die erste Einordnung von ${page.serviceName}.`,
          page.localNote,
        ],
      },
    ],
    highlightTitle: "Kurz gesagt",
    highlightPoints: [
      page.whyItWorks[0],
      page.guarantees[0],
      `Der direkte Anschluss fuehrt zur passenden Anfrage fuer ${page.serviceName}.`,
    ],
    ctas: [
      { href: `/${page.slug}`, label: `${page.serviceName} ansehen` },
      { href: "/buchung", label: "Fall direkt senden" },
      { href: "/reinigung-regensburg", label: "Reinigung Regensburg" },
    ],
    faqTitle: `FAQ zu ${page.shortName}`,
    faqItems: page.faqItems.slice(0, 4),
  };
}

export const psychologicalCleaningBlogArticles = psychologicalCleaningLandingPages.flatMap(
  (page) => page.supportingArticles.map((seed) => buildBlogArticle(page, seed)),
);

export function getPsychologicalCleaningBlogArticle(slug: string) {
  return psychologicalCleaningBlogArticles.find((article) => article.slug === slug);
}

export function getPsychologicalCleaningBlogArticleSlugs() {
  return psychologicalCleaningBlogArticles.map((article) => article.slug);
}
