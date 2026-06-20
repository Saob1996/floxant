export type EffortFactorGroup =
  | "reinigung"
  | "b2b"
  | "umzug"
  | "entruempelung"
  | "solar-pv"
  | "angebot-pruefen";

export type EffortFactor = {
  key: string;
  label: string;
  whyItMatters: string;
  helpfulInput: string;
};

export type EffortFactorDefinition = {
  group: EffortFactorGroup;
  title: string;
  intro: string;
  factors: EffortFactor[];
  boundaries: string[];
};

export const serviceEffortFactors: Record<EffortFactorGroup, EffortFactorDefinition> = {
  reinigung: {
    group: "reinigung",
    title: "Was den Reinigungsaufwand veraendert",
    intro: "Reinigungsangebote unterscheiden sich, weil Flaeche, Zustand, Zugang und Zielzustand nicht immer gleich beschrieben sind.",
    factors: [
      { key: "flaeche", label: "Flaeche", whyItMatters: "Mehr Flaeche bedeutet mehr Laufweg, Zeit und Material.", helpfulInput: "Quadratmeter oder Raumanzahl nennen." },
      { key: "objektart", label: "Objektart", whyItMatters: "Wohnung, Buero, Praxis oder Treppenhaus haben unterschiedliche Prioritaeten.", helpfulInput: "Objektart und Nutzung kurz beschreiben." },
      { key: "verschmutzung", label: "Verschmutzungsgrad", whyItMatters: "Grundreinigung, Endreinigung und laufende Pflege brauchen andere Zeitfenster.", helpfulInput: "Zustand ehrlich beschreiben, Fotos optional." },
      { key: "turnus", label: "Turnus", whyItMatters: "Einmalig, woechentlich oder mehrmals pro Woche veraendert Planung und Aufwand.", helpfulInput: "Gewuenschten Rhythmus nennen." },
      { key: "zugang", label: "Zugaenglichkeit", whyItMatters: "Schluessel, Etage, Aufzug und Parken beeinflussen den Ablauf.", helpfulInput: "Zugang, Etage und Schluesselweg nennen." },
      { key: "uhrzeit", label: "Uhrzeit", whyItMatters: "Randzeiten, Wochenende oder Betriebspausen muessen geplant werden.", helpfulInput: "Moegliche Zeitfenster angeben." },
      { key: "sonderflaechen", label: "Sonderflaechen", whyItMatters: "Fenster, Kueche, Bad, Boden oder Aussenbereiche sind oft eigene Aufwandspunkte.", helpfulInput: "Besondere Flaechen separat nennen." },
      { key: "fotos", label: "Fotos", whyItMatters: "Fotos reduzieren Rueckfragen und machen Zustand sichtbarer.", helpfulInput: "Bilder von Raeumen, Bad, Kueche und Zugang senden." },
      { key: "frist", label: "Frist", whyItMatters: "Kurze Fristen erfordern andere Planung als flexible Termine.", helpfulInput: "Deadline oder Wunschdatum nennen." },
    ],
    boundaries: ["Keine Preisgarantie.", "Keine Abnahme- oder Kautionsgarantie.", "Keine Spezialdesinfektion ohne ausdrueckliche Pruefung."],
  },
  b2b: {
    group: "b2b",
    title: "Was bei Buero- und Gewerbereinigung zaehlt",
    intro: "Bei Unternehmen wird ein Lead besser, wenn Flaeche, Turnus, Reinigungszeiten und Ansprechpartner direkt klar sind.",
    factors: [
      { key: "flaeche", label: "Flaeche", whyItMatters: "Quadratmeter und Raumanzahl bestimmen Zeit und Personalbedarf.", helpfulInput: "Flaeche und Raumliste nennen." },
      { key: "reinigungszeiten", label: "Reinigungszeiten", whyItMatters: "Vor Arbeitsbeginn, nach Feierabend oder Wochenende hat Einfluss auf Planung.", helpfulInput: "Moegliche Zeitfenster angeben." },
      { key: "turnus", label: "Turnus", whyItMatters: "Der Rhythmus entscheidet ueber Leistungsumfang und Stabilitaet.", helpfulInput: "Einmalig, woechentlich oder mehrmals pro Woche nennen." },
      { key: "leistungsumfang", label: "Leistungsumfang", whyItMatters: "Arbeitsplaetze, Boeden, Kueche und Sanitaerbereiche sind nicht automatisch gleich.", helpfulInput: "Bereiche einzeln nennen." },
      { key: "sanitaer-kueche", label: "Sanitaer/Kueche", whyItMatters: "Diese Bereiche haben oft hoeheren Pflege- und Hygieneaufwand.", helpfulInput: "Anzahl und Nutzung beschreiben." },
      { key: "ansprechpartner", label: "Ansprechpartner", whyItMatters: "B2B-Anfragen laufen schneller mit klarer Zustaendigkeit.", helpfulInput: "Kontaktperson und Rolle nennen." },
      { key: "schluessel", label: "Schluessel-/Zugangsregelung", whyItMatters: "Zugang und Alarm beeinflussen Zeitfenster und Ablauf.", helpfulInput: "Schluesselweg, Alarm und Zutritt beschreiben." },
      { key: "sonderanforderungen", label: "Sonderanforderungen", whyItMatters: "Praxis, Hotel, Treppenhaus oder sensibler Bereich brauchen Grenzen.", helpfulInput: "Besondere Anforderungen offen nennen." },
    ],
    boundaries: ["Keine Fake-Referenzen.", "Keine erfundenen Zertifikate.", "Keine medizinische Spezialdesinfektion ohne Pruefung."],
  },
  umzug: {
    group: "umzug",
    title: "Was Umzugsangebote unterschiedlich macht",
    intro: "Bei Umzug und Transport entscheidet nicht nur die Strecke. Volumen, Zugang, Haltezone und Terminfenster sind oft wichtiger.",
    factors: [
      { key: "start-ziel", label: "Start/Ziel", whyItMatters: "Route, Strecke und lokale Zufahrt bestimmen die Grundplanung.", helpfulInput: "Start- und Zielort nennen." },
      { key: "etage-aufzug", label: "Etage/Aufzug", whyItMatters: "Treppen und fehlender Aufzug veraendern Zeit und Teamstaerke.", helpfulInput: "Etage und Aufzug an beiden Orten nennen." },
      { key: "volumen", label: "Volumen", whyItMatters: "Menge entscheidet ueber Fahrzeug, Team und Zeitfenster.", helpfulInput: "Zimmerzahl, Kubikmeter oder Fotos senden." },
      { key: "moebelmontage", label: "Moebelmontage", whyItMatters: "Abbau und Aufbau brauchen eigene Zeit.", helpfulInput: "Moebel nennen, die zerlegt werden muessen." },
      { key: "haltezone", label: "Haltezone", whyItMatters: "Lange Laufwege oder fehlendes Parken sind echte Aufwandstreiber.", helpfulInput: "Parkmoeglichkeit und Laufweg beschreiben." },
      { key: "entfernung", label: "Entfernung", whyItMatters: "Fern- und Nahumzug haben andere Logistik.", helpfulInput: "Strecke und Zwischenstopps nennen." },
      { key: "terminfenster", label: "Terminfenster", whyItMatters: "Feste Termine sind schwerer zu planen als flexible Zeitfenster.", helpfulInput: "Wunschtermin und Ausweichfenster nennen." },
      { key: "verpackung", label: "Verpackung", whyItMatters: "Kartons, Schutzmaterial und Packhilfe veraendern den Umfang.", helpfulInput: "Packstatus nennen." },
      { key: "sonderstuecke", label: "Sonderstuecke", whyItMatters: "Klavier, Tresor, grosse Pflanzen oder empfindliche Moebel brauchen Pruefung.", helpfulInput: "Sonderstuecke mit Fotos angeben." },
    ],
    boundaries: ["Keine Sofortgarantie.", "Keine Preisgarantie ohne gepruefte Eckdaten.", "Keine Zusage fuer ungeklaerte Sonderstuecke."],
  },
  entruempelung: {
    group: "entruempelung",
    title: "Was Raeumung und Entsorgung beeinflusst",
    intro: "Bei Entruempelung zaehlen Menge, Material, Zugang, Freigabe und Zielzustand staerker als eine grobe Zimmerzahl.",
    factors: [
      { key: "menge", label: "Menge", whyItMatters: "Volumen bestimmt Transport, Team und Entsorgung.", helpfulInput: "Fotos oder grobe Kubikmeter nennen." },
      { key: "raeume", label: "Raeume", whyItMatters: "Keller, Dachboden, Garage oder Wohnung haben andere Laufwege.", helpfulInput: "Betroffene Raeume auflisten." },
      { key: "etage-zugang", label: "Etage/Zugang", whyItMatters: "Treppen, Aufzug, Parken und Schluesselweg veraendern den Ablauf.", helpfulInput: "Etage, Aufzug und Zugang nennen." },
      { key: "entsorgung", label: "Entsorgung", whyItMatters: "Materialarten und Trennung beeinflussen Aufwand.", helpfulInput: "Moebel, Holz, Metall, Elektro oder Sondermaterial nennen." },
      { key: "trennung", label: "Trennung/Wertstoffe", whyItMatters: "Sortierung braucht Zeit und klare Freigabe.", helpfulInput: "Was behalten, spenden oder entsorgen?" },
      { key: "frist", label: "Frist", whyItMatters: "Uebergabe, Verkauf oder Renovierung setzen Deadlines.", helpfulInput: "Termin und Zielzustand nennen." },
      { key: "sensibel", label: "Sensible Situation", whyItMatters: "Nachlass, Trennung oder belastende Lage brauchen ruhige Abstimmung.", helpfulInput: "Gewuenschten Kontaktweg nennen." },
      { key: "fotos", label: "Fotos", whyItMatters: "Bilder zeigen Menge und Zugang besser als Schaetzungen.", helpfulInput: "Raeume, Laufwege und groessere Stuecke fotografieren." },
    ],
    boundaries: ["Keine Rechtsberatung.", "Keine Bewertung von Eigentumsfragen.", "Keine heimliche oder rechtswidrige Abholung."],
  },
  "solar-pv": {
    group: "solar-pv",
    title: "Was PV- und Solarreinigung beeinflusst",
    intro: "PV-Reinigung muss nach Dach, Zugang und Sicherheitslage geprueft werden. Es gibt keine Ertragsversprechen.",
    factors: [
      { key: "dachart", label: "Dachart", whyItMatters: "Flach-, Schraeg- oder Sonderdach bestimmen Zugang und Sicherheit.", helpfulInput: "Dachart und Hoehe nennen." },
      { key: "zugang", label: "Zugaenglichkeit", whyItMatters: "Leiter, Geruest oder sicherer Zugang muessen geprueft werden.", helpfulInput: "Zugang und moegliche Standflaechen beschreiben." },
      { key: "modulflaeche", label: "Modulflaeche", whyItMatters: "Anzahl und Flaeche bestimmen Zeit und Material.", helpfulInput: "Modulanzahl oder grobe Flaeche nennen." },
      { key: "verschmutzung", label: "Verschmutzung", whyItMatters: "Staub, Pollen, Laub oder Vogelkot brauchen unterschiedliche Behandlung.", helpfulInput: "Verschmutzung und Fotos senden." },
      { key: "wasser-strom", label: "Wasser-/Stromzugang", whyItMatters: "Vor Ort vorhandene Anschluesse koennen den Ablauf erleichtern.", helpfulInput: "Anschluesse nennen, falls relevant." },
      { key: "sicherheitslage", label: "Sicherheitslage", whyItMatters: "Unsichere Dachlagen werden nicht pauschal zugesagt.", helpfulInput: "Hoehe, Neigung und Zugang realistisch beschreiben." },
      { key: "fotos", label: "Fotos", whyItMatters: "Fotos helfen bei Dach, Zugang und Verschmutzung.", helpfulInput: "Uebersicht und Zugang fotografieren." },
    ],
    boundaries: ["Keine Ertragsversprechen.", "Keine Dachbetretung ohne Sicherheitspruefung.", "Keine Garantiezusage fuer Anlagenleistung."],
  },
  "angebot-pruefen": {
    group: "angebot-pruefen",
    title: "Warum Angebote schwer vergleichbar sind",
    intro: "Ein Angebot kann teuer, billig oder unklar wirken. Entscheidend ist, ob dieselbe Leistung, derselbe Zugang und dieselbe Frist gemeint sind.",
    factors: [
      { key: "angebot", label: "Vorhandenes Angebot", whyItMatters: "PDF, Screenshot oder Text zeigen, was wirklich angeboten wurde.", helpfulInput: "Dokument oder Eckdaten senden." },
      { key: "umfang", label: "Leistungsumfang", whyItMatters: "Oft sind wichtige Punkte ein- oder ausgeschlossen.", helpfulInput: "Was ist enthalten und was offen?" },
      { key: "preispositionen", label: "Preispositionen", whyItMatters: "Pauschalen, Zusatzkosten und MwSt. muessen vergleichbar sein.", helpfulInput: "Preispositionen oder Gesamtpreis nennen." },
      { key: "termin", label: "Termin", whyItMatters: "Frist, Wochenende oder feste Uebergabe beeinflussen Machbarkeit.", helpfulInput: "Termin und Deadline nennen." },
      { key: "anbieterreaktion", label: "Anbieterreaktion", whyItMatters: "Keine Rueckmeldung oder unklare Zusage kann Plan-B-Bedarf zeigen.", helpfulInput: "Status der Abstimmung nennen." },
      { key: "zusatzkosten", label: "Zusatzkosten", whyItMatters: "Etage, Laufweg, Reinigung, Entsorgung oder Wartezeit sind oft nicht klar.", helpfulInput: "Offene Kostenpunkte markieren." },
      { key: "vergleichsangebote", label: "Vergleichsangebote", whyItMatters: "Mehrere Angebote sind nur fair vergleichbar, wenn Umfang gleich ist.", helpfulInput: "Unterschiede zwischen Angeboten nennen." },
      { key: "unsicherheit", label: "Unsicherheit des Kunden", whyItMatters: "Der wichtigste Zweifel lenkt die Rueckfragen.", helpfulInput: "Pruefgrund klar auswaehlen oder beschreiben." },
    ],
    boundaries: ["Keine Rechtsberatung.", "Keine Garantie, dass es guenstiger wird.", "Keine Bewertung oder Diffamierung anderer Anbieter."],
  },
};

export function getEffortFactors(group: EffortFactorGroup) {
  return serviceEffortFactors[group];
}

export function getEffortFactorGroups(groups: EffortFactorGroup[]) {
  return groups.map((group) => serviceEffortFactors[group]);
}
