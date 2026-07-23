export type RegionalRoutePolicy = {
  path: string;
  label: string;
  shortLabel: string;
  customerNeed: string;
  targetHref: string;
  targetLabel: string;
};

export const regensburgCleaningReviewRoutes: RegionalRoutePolicy[] = [
  {
    path: "/regensburg/reinigung",
    label: "Reinigung Regensburg nach Prüfung",
    shortLabel: "Reinigung",
    customerNeed: "Wenn Reinigung in Regensburg mit Auszug, Übergabe, Objektzustand oder Fotos eingeordnet werden soll.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Übergabereinigung ansehen",
  },
  {
    path: "/regensburg/gewerbereinigung",
    label: "Gewerbliche Reinigung Regensburg nach Prüfung",
    shortLabel: "Gewerbliche Reinigung",
    customerNeed: "Für gewerbliche Flächen in Regensburg, wenn Objekt, Turnus, Zugang und Umfang zuerst sauber geprüft werden müssen.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Regensburg-Einordnung öffnen",
  },
  {
    path: "/regensburg/bueroreinigung",
    label: "Büroreinigung Regensburg nach Prüfung",
    shortLabel: "Büroreinigung",
    customerNeed: "Für Büroflächen, wenn Raumliste, Turnus, Zugang und Fotos vor einer Zusage geprüft werden sollen.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Gewerbliche Prüfung ansehen",
  },
  {
    path: "/praxisreinigung-regensburg",
    label: "Praxisreinigung Regensburg nach Prüfung",
    shortLabel: "Praxisreinigung",
    customerNeed: "Für Empfang, Wartebereich und Nebenflächen, klar getrennt von medizinischer Spezialdesinfektion.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Gewerbliche Prüfung ansehen",
  },
  {
    path: "/hotelreinigung-regensburg",
    label: "Hotelreinigung Regensburg nach Prüfung",
    shortLabel: "Hotelreinigung",
    customerNeed: "Für Hotel, Pension oder Boardinghouse, wenn Turnus, Zeitfenster und Bereiche zuerst geklärt werden müssen.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Gewerbliche Prüfung ansehen",
  },
  {
    path: "/fensterreinigung-regensburg",
    label: "Fensterreinigung Regensburg nach Prüfung",
    shortLabel: "Fensterreinigung",
    customerNeed: "Für Fenster, Glasflächen, Rahmen und Schaufenster nach Fotos, Zugang, Etage und Termin.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Übergabe-Kontext ansehen",
  },
  {
    path: "/baureinigung-regensburg",
    label: "Baureinigung Regensburg nach Prüfung",
    shortLabel: "Baureinigung",
    customerNeed: "Für Baustaub, Renovierung und Übergabe, wenn Zustand, Fläche und Deadline klar beschrieben werden.",
    targetHref: "/regensburg/endreinigung",
    targetLabel: "Endreinigung ansehen",
  },
  {
    path: "/teppichreinigung-regensburg",
    label: "Teppichreinigung Regensburg nach Prüfung",
    shortLabel: "Teppichreinigung",
    customerNeed: "Für Teppichboden, Polster oder Laufspuren, wenn Material und Flecken erst per Foto geprüft werden.",
    targetHref: "/regensburg/endreinigung",
    targetLabel: "Endreinigung ansehen",
  },
  {
    path: "/treppenhausreinigung-regensburg",
    label: "Treppenhausreinigung Regensburg nach Prüfung",
    shortLabel: "Treppenhaus",
    customerNeed: "Für Eingänge, Etagen, Kellerflure und gemeinschaftliche Flächen mit klarer Objektabstimmung.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Regensburg-Einordnung öffnen",
  },
  {
    path: "/unterhaltsreinigung-regensburg",
    label: "Unterhaltsreinigung Regensburg nach Prüfung",
    shortLabel: "Unterhalt",
    customerNeed: "Für wiederkehrende Reinigung, wenn Turnus, Flächen, Zugang und Zuständigkeit vorab sortiert werden.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Gewerbliche Prüfung ansehen",
  },
  {
    path: "/grundreinigung-regensburg",
    label: "Grundreinigung Regensburg nach Prüfung",
    shortLabel: "Grundreinigung",
    customerNeed: "Für starke Verschmutzung, Leerstand, Einzug, Auszug oder sichtbare Übergabepunkte.",
    targetHref: "/regensburg/endreinigung",
    targetLabel: "Endreinigung ansehen",
  },
];

export function getRegionalRoutePolicy(pathname: string) {
  return regensburgCleaningReviewRoutes.find((route) => route.path === pathname) ?? null;
}
