const PUBLIC_CITY_LABELS: Readonly<Record<string, string>> = {
  duesseldorf: "Düsseldorf",
  muenchen: "München",
  nuernberg: "Nürnberg",
  regensburg: "Regensburg",
};

const PUBLIC_SERVICE_LABELS: Readonly<Record<string, string>> = {
  entsorgung: "Entsorgung",
  entruempelung: "Entrümpelung",
  reinigung: "Reinigung",
  umzug: "Umzug",
};

export function getPublicCityLabel(cityKey: string, fallback = "Ihrer Stadt") {
  const normalizedKey = cityKey.trim().toLocaleLowerCase("de-DE");
  return (
    PUBLIC_CITY_LABELS[normalizedKey] ||
    (normalizedKey
      ? normalizedKey.charAt(0).toLocaleUpperCase("de-DE") + normalizedKey.slice(1)
      : fallback)
  );
}

export function getPublicServiceLabel(serviceKey: string, fallback = "Service") {
  const normalizedKey = serviceKey.trim().toLocaleLowerCase("de-DE");
  return (
    PUBLIC_SERVICE_LABELS[normalizedKey] ||
    (normalizedKey
      ? normalizedKey.charAt(0).toLocaleUpperCase("de-DE") + normalizedKey.slice(1)
      : fallback)
  );
}
