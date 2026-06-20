export type FloxantFaqItem = {
  q: string;
  a: string;
};

export const offerCheckFaqItems: FloxantFaqItem[] = [
  {
    q: "Wann lohnt sich eine Angebotspruefung?",
    a: "Sie lohnt sich, wenn Preis, Leistungsumfang, Termin, Fotos, Zugang oder Zusatzpositionen vor einer Zusage unklar sind.",
  },
  {
    q: "Kann FLOXANT garantieren, dass es guenstiger wird?",
    a: "Nein. FLOXANT prueft praktisch und organisatorisch, ob eine klarere oder passendere Alternative moeglich ist. Eine Preisunterbietung wird nicht garantiert.",
  },
  {
    q: "Ist das rechtliche Beratung?",
    a: "Nein. Die Pruefung ersetzt keine Rechtsberatung und bewertet keine Anbieter rechtlich. Sie ordnet Umfang, Aufwand, Fotos, Termin und offene Punkte ein.",
  },
  {
    q: "Welche Unterlagen helfen?",
    a: "Hilfreich sind Angebot oder Screenshot, Ort, Termin, Fotos, Flaeche oder Menge, Leistungsumfang, Preisrahmen und die konkrete offene Frage.",
  },
  {
    q: "Kann ich auch ohne schriftliches Angebot anfragen?",
    a: "Ja. Dann reichen Preisrahmen, Beschreibung, Fotos, Ort, Termin und gewuenschte Leistung fuer eine erste Einordnung.",
  },
  {
    q: "Welche Angebote koennen geprueft werden?",
    a: "Vor allem Angebote fuer Reinigung, Buero- oder Gewerbereinigung, Umzug, Entruempelung, Haushaltsaufloesung, Transport, Glas, Fassade und Solar/PV.",
  },
  {
    q: "Was passiert nach dem Absenden?",
    a: "FLOXANT schaut auf Machbarkeit, fehlende Angaben und naechsten Schritt: Rueckfrage, direkte Anfrage, Plan B oder eine passende Alternative.",
  },
];

export const cleaningFaqItems: FloxantFaqItem[] = [
  {
    q: "Welche Angaben braucht FLOXANT fuer eine Reinigungsanfrage?",
    a: "Ort, Objektart, Flaeche, Zustand, Fotos, Termin, Zugang, gewuenschtes Ergebnis und bei laufender Reinigung der Turnus helfen am meisten.",
  },
  {
    q: "Warum unterscheiden sich Reinigungsangebote?",
    a: "Angebote unterscheiden sich durch Flaeche, Zustand, Nutzung, Turnus, Sanitaer, Kueche, Glas, Randzeiten, Zugang und Zusatzleistungen.",
  },
  {
    q: "Was beeinflusst den Aufwand?",
    a: "Wichtig sind Verschmutzung, Material, Raeume, Etage, Laufwege, Zeitdruck, Uebergabeziel und ob Sonderreinigung statt normaler Reinigung gefragt ist.",
  },
  {
    q: "Wann sind Fotos sinnvoll?",
    a: "Fotos sind sinnvoll, wenn Zustand, Flaechen, Zugang, Fenster, Boden, Kueche, Bad oder Sonderstellen schwer kurz zu beschreiben sind.",
  },
  {
    q: "Was ist bei Buero- oder Gewerbereinigung wichtig?",
    a: "Raumliste, Flaeche, Turnus, Randzeit, Ansprechpartner, Schluesselweg, Sanitaer, Kueche und genutzte Bereiche sollten vorab klar sein.",
  },
  {
    q: "Was ist bei Reinigung nach Entruempelung wichtig?",
    a: "Erst muessen Restmengen, Freigabe und Endzustand klar sein. Danach wird geprueft, ob Grund-, End- oder Uebergabereinigung passt.",
  },
];

export const movingFaqItems: FloxantFaqItem[] = [
  {
    q: "Welche Angaben braucht FLOXANT fuer eine Umzugsanfrage?",
    a: "Start, Ziel, Etage, Aufzug, Laufweg, Parken, Volumen, Fotos, Termin, Montage, Sonderstuecke und gewuenschte Zusatzleistungen.",
  },
  {
    q: "Was beeinflusst ein Umzugsangebot?",
    a: "Volumen, Strecke, Etagen, Laufwege, Haltemoeglichkeit, Termin, Demontage, Packhilfe, Klaviertransport und Reinigung danach beeinflussen den Aufwand.",
  },
  {
    q: "Wann ist ein Mini-Umzug sinnvoll?",
    a: "Wenn nur wenige Moebel, Kartons oder Einzelstuecke bewegt werden und Strecke, Zugang und Termin klar sind.",
  },
  {
    q: "Wann lohnt sich Beiladung oder Rueckfahrt?",
    a: "Wenn Route, Volumen und Zeitfenster zu einer vorhandenen Fahrt passen. Das muss immer praktisch geprueft werden.",
  },
  {
    q: "Was ist bei Klaviertransport wichtig?",
    a: "Instrument, Gewicht, Etagen, Treppenhaus, Aufzug, Laufweg, Start, Ziel, Fotos und Termin sind entscheidend.",
  },
  {
    q: "Was ist bei Seniorenumzug wichtig?",
    a: "Angehoerige, Ruhebedarf, Freigabe, Packhilfe, Moebel, Reinigung, Uebergabe und ein klarer Ansprechpartner helfen bei der Planung.",
  },
];

export const clearanceFaqItems: FloxantFaqItem[] = [
  {
    q: "Welche Angaben braucht FLOXANT fuer Entruempelung?",
    a: "Raeume, Menge, Material, Fotos, Etage, Zugang, Freigabe, Termin, Entsorgungsgrenzen und gewuenschter Endzustand.",
  },
  {
    q: "Was beeinflusst den Aufwand?",
    a: "Menge, Sperrigkeit, Laufweg, Parken, Demontage, Sortierung, Sondermaterial, Etage und Reinigung danach koennen den Aufwand veraendern.",
  },
  {
    q: "Wann sind Fotos wichtig?",
    a: "Fotos sind fast immer hilfreich, weil Menge, Zugang, Material und Zustand besser sichtbar werden als in einer kurzen Beschreibung.",
  },
  {
    q: "Was ist der Unterschied zwischen Entruempelung und Haushaltsaufloesung?",
    a: "Entruempelung ist oft auf Menge und Entsorgung fokussiert. Haushaltsaufloesung umfasst haeufig mehrere Raeume, Freigaben, sensible Gegenstaende und Endzustand.",
  },
  {
    q: "Wie werden sensible Faelle angefragt?",
    a: "Sensible Faelle sollten mit Kontaktweg, Berechtigung, Freigabe, Fotos, Ansprechpartner und Diskretionsbedarf klar beschrieben werden.",
  },
  {
    q: "Wann ist Reinigung nach Entruempelung sinnvoll?",
    a: "Wenn Raeume nach Freigabe, Auszug, Nachlass oder Uebergabe nutzbar, besichtigbar oder uebergabebereit werden sollen.",
  },
];

export const duesseldorfFaqItems: FloxantFaqItem[] = [
  {
    q: "Welche Services bietet FLOXANT in Duesseldorf?",
    a: "Duesseldorf ist bei FLOXANT besonders stark fuer Reinigung, Buero-, Gewerbe-, Praxis-, Fenster-, End- und objektbezogene Reinigungsanfragen.",
  },
  {
    q: "Wie frage ich Reinigung in Duesseldorf an?",
    a: "Nennen Sie Stadtteil, Objektart, Flaeche, Zustand, Fotos, Termin, Zugang und gewuenschtes Ergebnis.",
  },
  {
    q: "Wie frage ich Buero- oder Gewerbereinigung in Duesseldorf an?",
    a: "Hilfreich sind Raumliste, Flaeche, Turnus, Zeitfenster, Ansprechpartner, Schluesselweg, Sanitaer, Kueche und Fotos.",
  },
  {
    q: "Kann ich ein Reinigungsangebot in Duesseldorf pruefen lassen?",
    a: "Ja. FLOXANT prueft Umfang, Turnus, Objektart, Fotos, Zusatzpunkte und Preisrahmen ohne Preisgarantie.",
  },
  {
    q: "Welche Angaben helfen fuer eine schnelle Einschaetzung?",
    a: "PLZ oder Stadtteil, Objektart, Flaeche, Fotos, Termin, Zugang, Angebot oder Preisrahmen und die offene Frage.",
  },
];

export const regensburgFaqItems: FloxantFaqItem[] = [
  {
    q: "Welche Services bietet FLOXANT in Regensburg?",
    a: "Regensburg ist der breite Hub fuer Umzug, Reinigung, Entruempelung, Haushaltsaufloesung, Klaviertransport, Seniorenumzug und Angebotspruefung.",
  },
  {
    q: "Wie frage ich Umzug in Regensburg an?",
    a: "Start, Ziel, Etage, Laufweg, Volumen, Fotos, Termin, Parken und Zusatzleistungen machen die Anfrage belastbar.",
  },
  {
    q: "Wie frage ich Klaviertransport in Regensburg an?",
    a: "Instrument, Start, Ziel, Etage, Treppenhaus, Aufzug, Laufweg, Fotos und Termin sind die wichtigsten Angaben.",
  },
  {
    q: "Wie frage ich Entruempelung in Regensburg an?",
    a: "Raeume, Menge, Material, Fotos, Zugang, Freigabe, Entsorgung, Termin und Endzustand sollten beschrieben werden.",
  },
  {
    q: "Kann ich ein Angebot in Regensburg pruefen lassen?",
    a: "Ja. FLOXANT prueft Angebote fuer Umzug, Reinigung, Entruempelung und verwandte Leistungen praktisch und ohne Preisgarantie.",
  },
];

export const signatureServiceFaqItems: FloxantFaqItem[] = [
  {
    q: "Was ist der FLOXANT Fairpreis-Check?",
    a: "Eine praktische Einordnung, ob Preis, Umfang, Fotos, Termin und offene Annahmen eines Angebots zusammenpassen.",
  },
  {
    q: "Was ist der Objektbrief?",
    a: "Der Objektbrief sortiert Ort, Ziel, Fotos, Zugang, Termin, Budget und passende FLOXANT-Leistung, wenn der Fall noch unscharf ist.",
  },
  {
    q: "Wann hilft der Plan-B-Service?",
    a: "Wenn Anbieter absagen, Termine kippen oder Uebergabe, Reinigung, Umzug oder Raeumung kurzfristig neu sortiert werden muessen.",
  },
  {
    q: "Was bedeutet Diskret-Service?",
    a: "Diskret-Service ist fuer sensible Faelle gedacht, bei denen Kontaktweg, Berechtigung, Fotos, Zugang und ruhige Abstimmung wichtig sind.",
  },
  {
    q: "Wann ist Rueckfahrt-Radar sinnvoll?",
    a: "Wenn Transport, Beiladung oder Moebelbewegung zu einer Route, Rueckfahrt oder vorhandenen Kapazitaet passen koennten.",
  },
  {
    q: "Was ist der PV-Sichtklar-Service?",
    a: "Eine strukturierte Anfrage fuer Solar- oder PV-Reinigung mit Fotos, Zugang, Dachlage, Wasser, Sicherheit und Leistungsgrenzen.",
  },
];
