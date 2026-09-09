import selectedPlaces from "@/data/serviceAreas/selected75kmPlaces.json";
import { LOCAL_SERVICE_RADIUS_KM } from "@/lib/service-area-policy";

// Legacy filename retained for existing imports; local coverage is now 75 km.
export type ServiceAreaCity = { name: string; slug: string; distance: string; role: string };
export type ServiceAreaZone = { id: string; title: string; radius: string; description: string; cities: ServiceAreaCity[] };
const cities = selectedPlaces.regensburg.map(place => ({
  name: place.name,
  slug: place.name.toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"-"),
  distance: Math.round(place.distanceKm) + " km Luftlinie",
  role: "Einsatzort ab Regensburg",
  distanceKm: place.distanceKm,
}));
export const SERVICE_AREA_ZONES: ServiceAreaZone[] = [
  { id: "core", title: "Regensburg und nahes Umland", radius: "Bis 20 km Luftlinie", description: "Reinigung, Umzug und Entrümpelung in Regensburg und den umliegenden Orten. Wir stimmen Umfang und Termin mit Ihnen ab.", cities: cities.filter(city=>city.distanceKm<=20) },
  { id: "regional", title: "Weiteres Einsatzgebiet", radius: "Bis " + LOCAL_SERVICE_RADIUS_KM + " km Luftlinie", description: "Auch im weiteren Umland unterstützen wir Sie mit den vereinbarten Leistungen. Anfahrt und Zugang zur konkreten Adresse berücksichtigen wir im Angebot.", cities: cities.filter(city=>city.distanceKm>20 && city.distanceKm<=LOCAL_SERVICE_RADIUS_KM) },
];
export const SERVICE_AREA_SERVICES = [
  { name: "Umzug", href: "/regensburg/umzug", slugPrefix: "umzug", description: "Möbel und Kartons transportieren, auf Wunsch mit vereinbarter Montage und Unterstützung beim Einpacken." },
  { name: "Entrümpelung", href: "/regensburg/entruempelung", slugPrefix: "entruempelung", description: "Wohnung, Keller oder einzelne Räume räumen. Was bleiben soll und was abgefahren wird, legen wir gemeinsam fest." },
  { name: "Büroumzug", href: "/bueroumzug-regensburg", slugPrefix: "bueroumzug", description: "Arbeitsplätze, Möbel und Archivgut zum neuen Büro bringen – passend zu Ihrem Ablauf." },
  { name: "Reinigung", href: "/regensburg/reinigung", slugPrefix: "reinigung", description: "Wohnungen, Büros und Gewerbeflächen reinigen, einmalig oder regelmäßig nach vereinbartem Umfang." },
] as const;
export const PRIORITY_SERVICE_AREA_LINKS = SERVICE_AREA_SERVICES.map(service => ({href:service.href,label:service.name + " Regensburg"}));
