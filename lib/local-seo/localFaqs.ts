import type { LocalSeoFaq } from "./types";

export function buildCleaningFaq(cityName: string, serviceLabel = "Reinigung"): LocalSeoFaq[] {
  return [
    {
      q: `Bietet FLOXANT ${serviceLabel} in ${cityName} an?`,
      a: `FLOXANT prüft ${serviceLabel}-Anfragen in ${cityName} im Rahmen des passenden regionalen Einsatzgebiets. Wichtig sind Ort, Objektart, Fläche, Zustand, Fotos, Termin und gewünschtes Ergebnis.`,
    },
    {
      q: `Welche Angaben braucht FLOXANT für eine Reinigung in ${cityName}?`,
      a: "Hilfreich sind Stadtteil oder PLZ, Objektart, Räume, Quadratmeter, Zustand, Zugang, Etage, Zeitfenster, Fotos und ein vorhandenes Angebot, falls es geprüft werden soll.",
    },
    {
      q: "Kann ein vorhandenes Reinigungsangebot geprüft werden?",
      a: "Ja. FLOXANT prüft Preis, Leistungsumfang, Turnus, Zusatzpositionen, Flächenangaben, Fotos und offene Punkte sachlich. Es gibt keine automatische Unterbietungsgarantie.",
    },
    {
      q: "Welche Reinigungsarten sind typisch?",
      a: "Typisch sind Wohnungsreinigung, Grundreinigung, Büroreinigung, Praxisreinigung, Treppenhausreinigung, Gewerbereinigung und Reinigung vor Übergabe.",
    },
    {
      q: "Gibt es eine feste Preisangabe pro Quadratmeter?",
      a: "Nein. Ein Preisrahmen hängt neben der Fläche auch von Zustand, Material, Küche, Bad, Sanitär, Turnus, Zugang, Zeitdruck und Zielzustand ab.",
    },
    {
      q: "Ist die Anfrage verbindlich?",
      a: "Nein. Die erste Anfrage und Einordnung ist unverbindlich. Verbindlich wird ein Auftrag erst, wenn Umfang, Termin, Zugang und Leistung abgestimmt sind.",
    },
  ];
}

export function buildMovingFaq(cityName: string): LocalSeoFaq[] {
  return [
    {
      q: `Was kostet ein Umzug in ${cityName}?`,
      a: "Die Kosten hängen von Wohnungsgröße, Volumen, Etage, Aufzug, Laufweg, Entfernung, Haltemöglichkeit, Termin, Demontage, Packhilfe und Zusatzleistungen ab.",
    },
    {
      q: "Welche Angaben machen ein Umzugsangebot belastbarer?",
      a: "Wichtig sind Start, Ziel, Etage, Aufzug, Laufweg, Parkmöglichkeit, Terminfenster, Möbelmenge, Kartons, große Einzelstücke, Fotos und gewünschte Zusatzleistungen.",
    },
    {
      q: "Kann FLOXANT ein vorhandenes Umzugsangebot prüfen?",
      a: "Ja. Senden Sie Angebot, Fotos, Volumen, Strecke, Etage, Laufweg, Termin und Budget. FLOXANT prüft sachlich, ob Umfang und Annahmen nachvollziehbar sind.",
    },
    {
      q: "Kann Reinigung nach dem Umzug mitgedacht werden?",
      a: "Ja. Reinigung nach Auszug, Endreinigung oder Übergabereinigung kann separat eingeordnet werden, damit Umzug und Reinigung nicht vermischt werden.",
    },
    {
      q: "Ist ein kurzfristiger Umzug möglich?",
      a: "Kurzfristige Anfragen können geprüft werden. Entscheidend sind Umfang, Fotos, Zugang, Strecke, Terminfenster und verfügbare Kapazität.",
    },
    {
      q: "Gibt es eine feste Preisgarantie?",
      a: "Nein. FLOXANT nennt keine Garantie auf den niedrigsten Preis und keinen Festpreis ohne prüfbare Eckdaten.",
    },
  ];
}

export function buildOfferFaq(cityName: string): LocalSeoFaq[] {
  return [
    {
      q: `Welche Angebote kann FLOXANT für ${cityName} prüfen?`,
      a: "Geeignet sind Angebote für Reinigung, Büroreinigung, Grundreinigung, Umzug, Entrümpelung, Wohnungsauflösung oder Reinigung nach Auszug.",
    },
    {
      q: "Was wird bei der Angebotsprüfung betrachtet?",
      a: "FLOXANT prüft Preis, Leistungsumfang, Flächen- oder Volumenangaben, Turnus, Termin, Zusatzpositionen, Zugang, Fotos und fehlende Annahmen.",
    },
    {
      q: "Wird ein vorhandenes Angebot garantiert unterboten?",
      a: "Nein. Es gibt keine Unterbietungsgarantie. Ziel ist eine sachliche zweite Einordnung und, falls passend, eine Alternative.",
    },
    {
      q: "Kann ich auch ohne fertiges Angebot anfragen?",
      a: "Ja. Dann reichen Ort, Objektart, Umfang, Fotos, Termin, Zielzustand und grober Preisrahmen für eine erste Prüfung.",
    },
    {
      q: "Warum sind Fotos wichtig?",
      a: "Fotos machen Zustand, Laufwege, Flächen, Mengen und Problemstellen sichtbar. Dadurch lassen sich Rückfragen und Missverständnisse reduzieren.",
    },
    {
      q: "Ist die Prüfung verbindlich?",
      a: "Nein. Die Prüfung ist unverbindlich. Ein Auftrag entsteht erst, wenn Leistung, Termin, Umfang und Zugang gemeinsam bestätigt werden.",
    },
  ];
}
