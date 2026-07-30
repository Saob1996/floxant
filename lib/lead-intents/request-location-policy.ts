import type { LeadService } from "@/lib/lead-intents";
import { serviceRoutingByKey } from "@/lib/service-routing";

export type RequestLocation = "duesseldorf" | "regensburg" | "unsicher";

export type RequestServiceOption = {
  key: string;
  label: string;
  service: LeadService;
  intent: string;
};

type ServicePolicyEntry = {
  key: string;
  service: LeadService;
  label?: string;
  intent?: string;
};

const confirmedServicePolicy: Readonly<
  Record<Exclude<RequestLocation, "unsicher">, readonly ServicePolicyEntry[]>
> = {
  duesseldorf: [
    { key: "reinigung", service: "reinigung" },
    { key: "bueroreinigung", service: "bueroreinigung", label: "Büroreinigung" },
    { key: "praxisreinigung", service: "praxisreinigung" },
    { key: "fensterreinigung", service: "fensterreinigung" },
    {
      key: "grundreinigung",
      service: "reinigung",
      label: "Grundreinigung",
      intent: "grundreinigung-anfrage",
    },
    { key: "unterhaltsreinigung", service: "unterhaltsreinigung" },
    {
      key: "baureinigung",
      service: "reinigung",
      label: "Bau- und Bauendreinigung",
      intent: "bauendreinigung-anfrage",
    },
    { key: "gewerbereinigung", service: "gewerbereinigung" },
    { key: "hausverwaltung-reinigung", service: "hausverwaltung-reinigung" },
    { key: "treppenhausreinigung", service: "treppenhausreinigung" },
  ],
  regensburg: [
    { key: "umzug", service: "umzug", intent: "umzug-anfrage" },
    { key: "entruempelung", service: "entruempelung", intent: "entruempelung-anfrage" },
    { key: "wohnungsaufloesung", service: "wohnungsaufloesung" },
    {
      key: "raeumung",
      service: "entruempelung",
      label: "Räumung",
      intent: "raeumung-anfrage",
    },
    { key: "reinigung", service: "reinigung" },
    { key: "moebeltransport", service: "moebeltransport" },
    { key: "klaviertransport", service: "klaviertransport" },
    { key: "seniorenumzug", service: "seniorenumzug" },
  ],
};

const unsureServices: readonly RequestServiceOption[] = [
  {
    key: "reinigung",
    label: "Reinigung",
    service: "reinigung",
    intent: "reinigung-anfrage",
  },
  { key: "umzug", label: "Umzug", service: "umzug", intent: "umzug-anfrage" },
  {
    key: "raeumung-aufloesung",
    label: "Räumung oder Auflösung",
    service: "entruempelung",
    intent: "raeumung-oder-aufloesung",
  },
  {
    key: "angebot-pruefen",
    label: "Angebot prüfen",
    service: "angebot-pruefen",
    intent: "angebot-pruefen",
  },
  {
    key: "sonstiges",
    label: "Andere Anfrage",
    service: "sonstiges",
    intent: "allgemeine-anfrage",
  },
] as const;

function buildConfirmedOptions(
  location: Exclude<RequestLocation, "unsicher">,
): readonly RequestServiceOption[] {
  return confirmedServicePolicy[location].flatMap((policy) => {
    const registry = serviceRoutingByKey[policy.service];
    if (!registry || !registry.supportedCities.includes(location)) return [];
    return [
      {
        key: policy.key,
        label: policy.label || registry.label,
        service: policy.service,
        intent: policy.intent || registry.defaultIntent,
      },
    ];
  });
}

export const requestServiceOptionsByLocation: Readonly<
  Record<RequestLocation, readonly RequestServiceOption[]>
> = {
  duesseldorf: buildConfirmedOptions("duesseldorf"),
  regensburg: buildConfirmedOptions("regensburg"),
  unsicher: unsureServices,
};

export function resolveAllowedRequestService(
  location: RequestLocation,
  serviceKey: string,
): RequestServiceOption | null {
  const options = requestServiceOptionsByLocation[location];
  return (
    options.find((candidate) => candidate.key === serviceKey) ||
    options.find((candidate) => candidate.service === serviceKey) ||
    null
  );
}

export function isRequestServiceAllowedAtLocation(
  location: RequestLocation,
  option: RequestServiceOption,
): boolean {
  if (location === "unsicher") return true;
  const registry = serviceRoutingByKey[option.service];
  return Boolean(registry?.supportedCities.includes(location));
}
