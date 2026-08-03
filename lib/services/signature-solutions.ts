import type {
  ServiceCallToAction,
  ServiceEvidence,
  ServiceEvidenceStatus,
  ServiceRegion,
} from "./service-registry";

export type SignatureSolutionKind = "SIGNATURE" | "SPECIAL_SOLUTION" | "MANUAL_REVIEW";

export type SignatureSolution = {
  id: string;
  name: string;
  kind: SignatureSolutionKind;
  actualFunction: string;
  targetGroups: readonly string[];
  problem: string;
  result: string;
  process: readonly string[];
  boundaries: readonly string[];
  requiredDetails: readonly string[];
  regions: readonly ServiceRegion[];
  serviceIds: readonly string[];
  cta: ServiceCallToAction;
  canonicalRoute: string;
  evidence: readonly ServiceEvidence[];
  evidenceStatus: ServiceEvidenceStatus;
  publicAllowed: boolean;
  lastReviewedAt: string;
  owner: string;
};

const reviewedAt = "2026-07-19";
const owner = "FLOXANT Redaktion";

function page(source: string, note: string): ServiceEvidence {
  return { source, kind: "public_page", note };
}

function registry(source: string, note: string): ServiceEvidence {
  return { source, kind: "public_registry", note };
}

export const signatureSolutions: readonly SignatureSolution[] = [
  {
    id: "angebotscheck",
    name: "FLOXANT Angebotscheck",
    kind: "SIGNATURE",
    actualFunction:
      "Ordnet ein vorhandenes Dienstleistungsangebot anhand von Umfang, Zugang, Termin, Zusatzpositionen und fehlenden Angaben ein.",
    targetGroups: ["Privatpersonen mit vorhandenem Angebot", "Unternehmen mit Reinigungs- oder Umzugsangebot"],
    problem: "Ein Endpreis lässt sich nicht sinnvoll bewerten, solange Leistungsumfang und Annahmen unklar sind.",
    result: "Eine übersichtliche Liste nachvollziehbarer Punkte, offener Angaben und möglicher Rückfragen.",
    process: ["Angebot oder Screenshot bereitstellen", "Eckdaten und offene Punkte zuordnen", "nächsten sinnvollen Schritt abstimmen"],
    boundaries: ["keine Rechtsberatung", "keine Preis- oder Ersparnisgarantie", "keine Abwertung anderer Anbieter"],
    requiredDetails: ["Angebot oder Screenshot", "Ort", "Leistung", "Umfang", "Termin"],
    regions: ["Düsseldorf", "Regensburg"],
    serviceIds: ["angebotscheck", "anbieter-vergleichen", "objektbrief"],
    cta: { label: "Angebot einordnen", href: "/angebotscheck" },
    canonicalRoute: "/angebotscheck",
    evidence: [page("app/angebotscheck/page.tsx", "Öffentliche Seite beschreibt Prüfkriterien, Eingaben, Grenzen und Anfrageweg.")],
    evidenceStatus: "VERIFIED_PUBLIC",
    publicAllowed: true,
    lastReviewedAt: reviewedAt,
    owner,
  },
  {
    id: "anbieter-vergleichen",
    name: "FLOXANT Anbietervergleich",
    kind: "SIGNATURE",
    actualFunction:
      "Stellt Angebote anhand derselben Kriterien gegenüber: Leistungsumfang, Termin, Kommunikation, Zusatzpositionen und offene Annahmen.",
    targetGroups: ["Privatpersonen", "Unternehmen"],
    problem: "Angebote wirken vergleichbar, obwohl Umfang und Annahmen voneinander abweichen.",
    result: "Ein sachlicher Kriterienvergleich ohne Rangliste oder Niedrigpreisversprechen.",
    process: ["Vergleichsgegenstand festlegen", "gleiche Kriterien anwenden", "offene Punkte und Rückfragen festhalten"],
    boundaries: ["keine Anbieterrangliste", "keine Rechtsberatung", "keine Ersparnisgarantie"],
    requiredDetails: ["Angebot oder Eckdaten", "gewünschte Leistung", "Ort", "Termin", "offene Fragen"],
    regions: ["Düsseldorf", "Regensburg"],
    serviceIds: ["anbieter-vergleichen", "angebotscheck"],
    cta: { label: "Anbieter sachlich vergleichen", href: "/anbieter-vergleichen" },
    canonicalRoute: "/anbieter-vergleichen",
    evidence: [page("app/anbieter-vergleichen/page.tsx", "Öffentliche Seite erklärt Kriterien und ausdrückliche Grenzen.")],
    evidenceStatus: "VERIFIED_PUBLIC",
    publicAllowed: true,
    lastReviewedAt: reviewedAt,
    owner,
  },
  {
    id: "objektbrief",
    name: "FLOXANT Objektbrief",
    kind: "SIGNATURE",
    actualFunction:
      "Führt Objektart, Region, Ort, Termin, Zugang, Fotos und Zielzustand übersichtlich in einer Anfrage zusammen.",
    targetGroups: ["Privatpersonen", "Unternehmen", "Vermieter"],
    problem: "Der Bedarf ist bekannt, aber die für eine Einordnung nötigen Objektangaben sind noch unsortiert.",
    result: "Ein kompakter, wiederverwendbarer Anfragebrief mit den bekannten Eckdaten.",
    process: ["Objekt und Leistung auswählen", "bekannte Angaben ergänzen", "Vorschau prüfen", "bewusst Kontakt aufnehmen"],
    boundaries: ["keine automatische Buchung", "kein verbindliches Angebot ohne Prüfung", "keine Preisgarantie"],
    requiredDetails: ["Region", "Leistung", "Ort", "Termin", "Zugang", "kurze Beschreibung"],
    regions: ["Düsseldorf", "Regensburg"],
    serviceIds: ["objektbrief", "reinigung", "umzug", "entruempelung"],
    cta: { label: "Objektbrief erstellen", href: "/objektbrief" },
    canonicalRoute: "/objektbrief",
    evidence: [page("app/objektbrief/page.tsx", "Öffentliche Seite enthält Builder, Vorschau, erforderliche Angaben und CTA.")],
    evidenceStatus: "VERIFIED_PUBLIC",
    publicAllowed: true,
    lastReviewedAt: reviewedAt,
    owner,
  },
  {
    id: "uebergabeakte",
    name: "FLOXANT Übergabeakte",
    kind: "SIGNATURE",
    actualFunction:
      "Bündelt Fotos, Restpunkte, Schlüsselstatus, Termin und Ansprechpartner für eine Objektübergabe.",
    targetGroups: ["Mieter", "Vermieter", "Unternehmen"],
    problem: "Reinigung, Restmengen, Schlüssel und Dokumentation werden vor einer Übergabe getrennt behandelt.",
    result: "Eine geordnete Übersicht der bekannten Übergabepunkte und offenen Aufgaben.",
    process: ["Übergabetermin und Objekt erfassen", "Fotos und Restpunkte sammeln", "Schlüsselweg festhalten", "nächsten Schritt abstimmen"],
    boundaries: ["keine Rechtsberatung", "keine Abnahmegarantie", "keine Kautionsgarantie"],
    requiredDetails: ["Übergabetermin", "Objekt", "Fotos", "Restpunkte", "Schlüsselstatus", "Ansprechpartner"],
    regions: ["Düsseldorf", "Regensburg"],
    serviceIds: ["uebergabeakte", "endreinigung", "entruempelung"],
    cta: { label: "Übergabe vorbereiten", href: "/uebergabeakte" },
    canonicalRoute: "/uebergabeakte",
    evidence: [page("app/uebergabeakte/page.tsx", "Öffentliche Seite beschreibt Eingaben, Ablauf und Grenzen.")],
    evidenceStatus: "VERIFIED_PUBLIC",
    publicAllowed: true,
    lastReviewedAt: reviewedAt,
    owner,
  },
  {
    id: "uebergabe-sprint",
    name: "FLOXANT Übergabe-Sprint",
    kind: "MANUAL_REVIEW",
    actualFunction:
      "Priorisiert bei naher Frist Restmengen, Reinigung, Fotos, Zugang und Schlüsselweg nach Machbarkeit.",
    targetGroups: ["Mieter", "Vermieter", "Unternehmen mit naher Übergabe"],
    problem: "Mehrere offene Aufgaben konkurrieren kurz vor einer Übergabe um Zeit und Kapazität.",
    result: "Eine priorisierte Reihenfolge für die bekannten Restpunkte und den nächsten Kontakt.",
    process: ["Frist nennen", "Restpunkte und Fotos erfassen", "Machbarkeit und Priorität ordnen", "nächsten Schritt abstimmen"],
    boundaries: ["keine Soforteinsatzgarantie", "keine vollständige Erledigung ohne Kapazitätsprüfung", "keine Abnahmegarantie"],
    requiredDetails: ["Ort", "Frist", "offene Aufgaben", "Fotos", "Zugang", "Kontaktweg"],
    regions: [],
    serviceIds: ["uebergabe-sprint", "uebergabeakte", "endreinigung"],
    cta: { label: "Restpunkte priorisieren", href: "/uebergabe-sprint" },
    canonicalRoute: "/uebergabe-sprint",
    evidence: [registry("lib/signature-special-services.ts", "Öffentliche Referenz vorhanden, statische Zielseite fehlt.")],
    evidenceStatus: "MANUAL_REVIEW_REQUIRED",
    publicAllowed: false,
    lastReviewedAt: reviewedAt,
    owner,
  },
  {
    id: "plan-b-service",
    name: "FLOXANT Plan-B-Service",
    kind: "SIGNATURE",
    actualFunction:
      "Prüft Frist, Umfang, Region und mögliche nächste Schritte, wenn ein geplanter Dienstleister oder Ablauf unsicher wird.",
    targetGroups: ["Privatpersonen", "Unternehmen"],
    problem: "Ein Anbieter fällt aus, antwortet nicht oder eine Leistung fehlt vor einer Frist.",
    result: "Eine Machbarkeitseinschätzung mit offen benannten Grenzen und möglichen nächsten Schritten.",
    process: ["unsicheren Bereich und Frist nennen", "vorhandene Angaben oder Angebot ergänzen", "Machbarkeit prüfen", "Alternative abstimmen"],
    boundaries: ["kein garantierter Notdienst", "keine Soforteinsatzgarantie", "keine garantierte Übernahme"],
    requiredDetails: ["Ort", "Frist", "betroffene Leistung", "bisheriger Stand", "Fotos oder Angebot falls vorhanden"],
    regions: ["Düsseldorf", "Regensburg"],
    serviceIds: ["plan-b-service", "angebotscheck", "uebergabe-sprint"],
    cta: { label: "Plan B prüfen", href: "/plan-b-service" },
    canonicalRoute: "/plan-b-service",
    evidence: [page("app/plan-b-service/page.tsx", "Öffentliche Seite erklärt Backup-Prüfung, Pakete und Grenzen.")],
    evidenceStatus: "VERIFIED_PUBLIC",
    publicAllowed: true,
    lastReviewedAt: reviewedAt,
    owner,
  },
  {
    id: "diskret-service",
    name: "FLOXANT Diskret-Service",
    kind: "SPECIAL_SOLUTION",
    actualFunction:
      "Ermöglicht einen datensparsamen Erstkontakt für sensible Umzugs-, Räumungs-, Nachlass- oder Reinigungssituationen.",
    targetGroups: ["Privatpersonen", "Angehörige"],
    problem: "Nutzer möchten eine sensible Lage klären, ohne im ersten Schritt unnötige private Details offenzulegen.",
    result: "Eine zurückhaltende Anfrage mit bevorzugtem Kontaktweg und nur den nötigen Eckdaten.",
    process: ["Bedarf grob auswählen", "Ort und Frist nennen", "bevorzugten Kontaktweg wählen", "optionale Fotos oder Unterlagen später ergänzen"],
    boundaries: ["keine Rechts-, Pflege-, Medizin- oder psychologische Beratung", "keine Preis- oder Verfügbarkeitsgarantie"],
    requiredDetails: ["grober Servicebedarf", "Ort", "bevorzugter Kontaktweg", "kurze Beschreibung", "Frist falls wichtig"],
    regions: ["Düsseldorf", "Regensburg"],
    serviceIds: ["diskret-service", "nachlassaufloesung", "haushaltsaufloesung"],
    cta: { label: "Diskret anfragen", href: "/diskret-service" },
    canonicalRoute: "/diskret-service",
    evidence: [page("app/diskret-service/page.tsx", "Öffentliche Seite benennt Datensparsamkeit, Situationen und Grenzen.")],
    evidenceStatus: "VERIFIED_PUBLIC",
    publicAllowed: true,
    lastReviewedAt: reviewedAt,
    owner,
  },
  {
    id: "umzug-mit-reinigung",
    name: "Kombi-Anfrage Umzug und Reinigung",
    kind: "SPECIAL_SOLUTION",
    actualFunction:
      "Führt Umzug, Restmengen, Endreinigung und Übergabetermin in einer gemeinsamen Anfrage zusammen.",
    targetGroups: ["Privatpersonen", "Unternehmen"],
    problem: "Getrennte Anfragen übersehen Abhängigkeiten zwischen Transport, Räumung, Reinigung und Übergabe.",
    result: "Eine gemeinsame Ablaufklärung mit den bekannten Terminen, Abhängigkeiten und offenen Punkten.",
    process: ["Umzugs- und Übergabetermin nennen", "Umfang und Restmengen beschreiben", "Fotos ergänzen", "mögliche Kombination prüfen"],
    boundaries: ["keine pauschale Komplettzusage", "keine Abnahme- oder Kautionsgarantie", "nur nach Kapazitätsprüfung"],
    requiredDetails: ["Start", "Ziel", "Umfang", "Objekt", "Fotos", "Umzugs- und Übergabetermin"],
    regions: ["Regensburg"],
    serviceIds: ["umzug-mit-reinigung", "umzug", "endreinigung", "entruempelung"],
    cta: { label: "Kombi-Anfrage starten", href: "/umzug-mit-reinigung" },
    canonicalRoute: "/umzug-mit-reinigung",
    evidence: [page("app/umzug-mit-reinigung/page.tsx", "Öffentliche kombinierte Leistungsseite mit Anfrageweg.")],
    evidenceStatus: "VERIFIED_PUBLIC",
    publicAllowed: true,
    lastReviewedAt: reviewedAt,
    owner,
  },
  {
    id: "fairpreis-check",
    name: "FLOXANT Fairpreis-Check",
    kind: "MANUAL_REVIEW",
    actualFunction: "Im vorhandenen Register als Preis- und Umfangsprüfung beschrieben.",
    targetGroups: ["Privatpersonen", "Unternehmen"],
    problem: "Die Funktion überschneidet sich mit dem belegten Angebotscheck.",
    result: "Noch nicht öffentlich freigegeben; erst Route und eigenständiger Nutzwert bestätigen.",
    process: ["manuelle Bestätigung erforderlich"],
    boundaries: ["keine Preisgarantie", "keine Veröffentlichung ohne bestätigte Route"],
    requiredDetails: ["vorhandenes Angebot", "Leistungsumfang"],
    regions: [],
    serviceIds: ["fairpreis-check", "angebotscheck"],
    cta: { label: "Nicht öffentlich", href: "/angebotscheck" },
    canonicalRoute: "/fairpreis-check",
    evidence: [registry("lib/signature-special-services.ts", "Name und Zielroute werden referenziert, eine statische Zielseite fehlt.")],
    evidenceStatus: "MANUAL_REVIEW_REQUIRED",
    publicAllowed: false,
    lastReviewedAt: reviewedAt,
    owner,
  },
  {
    id: "rueckfahrt-radar",
    name: "FLOXANT Rückfahrt-Radar",
    kind: "MANUAL_REVIEW",
    actualFunction: "Im vorhandenen Register als Prüfung von Route, Zeitfenster und Transportgut beschrieben.",
    targetGroups: ["Privatpersonen", "Unternehmen"],
    problem: "Die Funktion überschneidet sich mit der belegten Beiladungs- und Rückfahrtseite.",
    result: "Noch nicht öffentlich freigegeben; die fehlende Zielseite und Abgrenzung müssen bestätigt werden.",
    process: ["manuelle Bestätigung erforderlich"],
    boundaries: ["keine garantierte Mitnahme", "keine Veröffentlichung ohne bestätigte Route"],
    requiredDetails: ["Start", "Ziel", "Zeitfenster", "Transportgut"],
    regions: [],
    serviceIds: ["rueckfahrt-radar", "beiladung-rueckfahrt"],
    cta: { label: "Beiladung ansehen", href: "/rueckfahrt-boerse" },
    canonicalRoute: "/rueckfahrt-radar",
    evidence: [registry("lib/signature-special-services.ts", "Name und Zielroute werden referenziert, eine statische Zielseite fehlt.")],
    evidenceStatus: "MANUAL_REVIEW_REQUIRED",
    publicAllowed: false,
    lastReviewedAt: reviewedAt,
    owner,
  },
  {
    id: "vermieter-ready-service",
    name: "FLOXANT Vermieter-Ready-Service",
    kind: "MANUAL_REVIEW",
    actualFunction: "Im vorhandenen Register als Vorbereitung eines Objekts für Rückgabe oder Neuvermietung beschrieben.",
    targetGroups: ["Vermieter", "Eigentümer"],
    problem: "Die Funktion überschneidet sich mit Endreinigung und Übergabeakte; eine eigene Route fehlt.",
    result: "Noch nicht öffentlich freigegeben; eigenständigen Umfang und Route bestätigen.",
    process: ["manuelle Bestätigung erforderlich"],
    boundaries: ["keine Abnahmegarantie", "keine Veröffentlichung ohne bestätigte Route"],
    requiredDetails: ["Objekt", "Zielzustand", "Termin", "Fotos"],
    regions: [],
    serviceIds: ["vermieter-ready-service", "endreinigung", "uebergabeakte"],
    cta: { label: "Übergabe vorbereiten", href: "/uebergabeakte" },
    canonicalRoute: "/vermieter-ready-service",
    evidence: [registry("lib/signature-special-services.ts", "Name und Zielroute werden referenziert, eine statische Zielseite fehlt.")],
    evidenceStatus: "MANUAL_REVIEW_REQUIRED",
    publicAllowed: false,
    lastReviewedAt: reviewedAt,
    owner,
  },
  {
    id: "buero-startklar-service",
    name: "FLOXANT Büro-Startklar-Service",
    kind: "MANUAL_REVIEW",
    actualFunction: "Im vorhandenen Register als Vorbereitung gewerblicher Flächen vor Einzug oder Übergabe beschrieben.",
    targetGroups: ["Unternehmen", "Praxen"],
    problem: "Der Eintrag verweist nur auf die Büroreinigung und belegt keine eigenständige Funktion.",
    result: "Nicht als eigenständige öffentliche Leistung freigegeben.",
    process: ["manuelle Bestätigung erforderlich"],
    boundaries: ["keine eigenständige Vermarktung ohne bestätigten Leistungsumfang"],
    requiredDetails: ["Objekt", "Fläche", "Termin", "Zielzustand"],
    regions: [],
    serviceIds: ["buero-startklar-service", "bueroreinigung"],
    cta: { label: "Büroreinigung ansehen", href: "/regensburg/bueroreinigung" },
    canonicalRoute: "/regensburg/bueroreinigung",
    evidence: [registry("lib/signature-special-services.ts", "Eintrag verweist auf eine Kernleistung statt auf eine eigene Seite.")],
    evidenceStatus: "MANUAL_REVIEW_REQUIRED",
    publicAllowed: false,
    lastReviewedAt: reviewedAt,
    owner,
  },
  {
    id: "pv-sichtklar-service",
    name: "FLOXANT PV-Sichtklar-Service",
    kind: "MANUAL_REVIEW",
    actualFunction: "Im vorhandenen Register als Vorprüfung von Fotos, Dachzugang und Verschmutzung beschrieben.",
    targetGroups: ["Eigentümer", "Unternehmen"],
    problem: "Die zugrunde liegende PV-Reinigung ist regional noch nicht bestätigt.",
    result: "Nicht öffentlich freigegeben, bis reale Verfügbarkeit und Sicherheitsrahmen bestätigt sind.",
    process: ["manuelle Bestätigung erforderlich"],
    boundaries: ["keine Ertragsgarantie", "keine Elektro- oder Dacharbeiten"],
    requiredDetails: ["Ort", "Fotos", "Dachzugang", "Modulfläche", "Sicherheitslage"],
    regions: [],
    serviceIds: ["pv-sichtklar-service", "solarreinigung"],
    cta: { label: "Nicht öffentlich", href: "/kontakt?mode=neutral&source=seo" },
    canonicalRoute: "/pv-anlagen-reinigung",
    evidence: [registry("lib/service-inventory.ts", "PV-Reinigung ist für beide Regionen needs_manual_confirmation.")],
    evidenceStatus: "MANUAL_REVIEW_REQUIRED",
    publicAllowed: false,
    lastReviewedAt: reviewedAt,
    owner,
  },
];

export const publicSignatureSolutions: readonly SignatureSolution[] = signatureSolutions.filter(
  ({ publicAllowed }) => publicAllowed,
);

export function getSignatureSolutionById(id: string): SignatureSolution | undefined {
  return signatureSolutions.find((solution) => solution.id === id);
}
