import { buildRequestHref } from "@/lib/lead-intents/resolve-request-context";

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
    label: "Reinigung Regensburg",
    shortLabel: "Reinigung",
    customerNeed: "Wir reinigen Wohnungen, Büros und Gewerberäume in Regensburg, einmalig oder regelmäßig.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Übergabereinigung ansehen",
  },
  {
    path: "/regensburg/gewerbereinigung",
    label: "Gewerbliche Reinigung Regensburg",
    shortLabel: "Gewerbliche Reinigung",
    customerNeed: "Für gepflegte Gewerberäume: Wir stimmen Flächen, Aufgaben und Rhythmus auf Ihren Betrieb ab.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Leistungen in Regensburg",
  },
  {
    path: "/regensburg/bueroreinigung",
    label: "Büroreinigung Regensburg",
    shortLabel: "Büroreinigung",
    customerNeed: "Wir reinigen Ihre Büroflächen, Sanitärbereiche und Teeküche zu gemeinsam abgestimmten Zeiten.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Reinigung anfragen",
  },
  {
    path: "/praxisreinigung-regensburg",
    label: "Praxisreinigung Regensburg",
    shortLabel: "Praxisreinigung",
    customerNeed: "Für Empfang, Wartebereich und Nebenflächen, klar getrennt von medizinischer Spezialdesinfektion.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Reinigung anfragen",
  },
  {
    path: "/hotelreinigung-regensburg",
    label: "Hotelreinigung Regensburg",
    shortLabel: "Hotelreinigung",
    customerNeed: "Reinigung für Hotel, Pension oder Boardinghouse, passend zu Belegung und Gästewechsel.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Reinigung anfragen",
  },
  {
    path: "/fensterreinigung-regensburg",
    label: "Fensterreinigung Regensburg",
    shortLabel: "Fensterreinigung",
    customerNeed: "Für Fenster, Glasflächen, Rahmen und Schaufenster nach Fotos, Zugang, Etage und Termin.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Reinigung anfragen",
  },
  {
    path: "/baureinigung-regensburg",
    label: "Baureinigung Regensburg",
    shortLabel: "Baureinigung",
    customerNeed: "Für Baustaub, Renovierung und Übergabe, wenn Zustand, Fläche und Deadline klar beschrieben werden.",
    targetHref: "/regensburg/endreinigung",
    targetLabel: "Endreinigung ansehen",
  },
  {
    path: "/teppichreinigung-regensburg",
    label: "Teppichreinigung Regensburg",
    shortLabel: "Teppichreinigung",
    customerNeed: "Beschreiben Sie Teppich, Material und Flecken; gemeinsam besprechen wir die passende Reinigung.",
    targetHref: "/regensburg/endreinigung",
    targetLabel: "Endreinigung ansehen",
  },
  {
    path: "/treppenhausreinigung-regensburg",
    label: "Treppenhausreinigung Regensburg",
    shortLabel: "Treppenhaus",
    customerNeed: "Für Eingänge, Etagen, Kellerflure und gemeinschaftliche Flächen mit klarer Objektabstimmung.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Leistungen in Regensburg",
  },
  {
    path: "/unterhaltsreinigung-regensburg",
    label: "Unterhaltsreinigung Regensburg",
    shortLabel: "Unterhalt",
    customerNeed: "Wiederkehrende Reinigung Ihrer Flächen mit abgestimmten Aufgaben, Rhythmus und Zugang.",
    targetHref: "/regensburg/uebergabereinigung",
    targetLabel: "Reinigung anfragen",
  },
  {
    path: "/grundreinigung-regensburg",
    label: "Grundreinigung Regensburg",
    shortLabel: "Grundreinigung",
    customerNeed: "Gründliche Reinigung bei starker Verschmutzung, vor dem Einzug oder nach dem Auszug.",
    targetHref: "/regensburg/endreinigung",
    targetLabel: "Endreinigung ansehen",
  },
];

export function getRegionalRoutePolicy(pathname: string) {
  const route = regensburgCleaningReviewRoutes.find((entry) => entry.path === pathname);
  if (!route) return null;
  const service = pathname.split("/").filter(Boolean).at(-1)?.replace(/-regensburg$/, "") || "reinigung";
  return { ...route, targetHref: buildRequestHref({ location: "regensburg", service, source: "service_page", entryPage: pathname }), targetLabel: "Angebot anfragen" };
}
