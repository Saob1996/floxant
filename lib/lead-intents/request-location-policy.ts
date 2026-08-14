import type { LeadService } from "@/lib/lead-intents";
import {
  REQUEST_LOCATION_OPTIONS,
  getRequestFormProfile,
  getRequestService,
  getRequestServicesForLocation,
  isAllowedRequestCombination,
} from "@/lib/booking/request-service-policy.js";

export type RequestLocation = "duesseldorf" | "regensburg" | "unsicher";
export type RequestFormProfile =
  | "cleaning"
  | "moving"
  | "furniture"
  | "piano"
  | "clearance"
  | "offer_check"
  | "general";

export type RequestServiceOption = {
  key: string;
  registryServiceId: string;
  label: string;
  service: LeadService;
  intent: string;
  category: string;
  formProfile: RequestFormProfile;
  analyticsServiceType: string;
  allowedUpgrades: readonly string[];
  dashboardLabel: string;
  successMessage: string;
  confirmationEmailVariant: string;
};

type ProjectedService = {
  id: string;
  name: string;
  category: string;
  leadService: string;
  intent: string;
  formProfile: string;
  allowedUpgrades: readonly string[];
  dashboardLabel: string;
  successMessage: string;
};

function toRequestServiceOption(projected: ProjectedService): RequestServiceOption {
  const profile = getRequestFormProfile(projected.formProfile);
  return {
    key: projected.id,
    registryServiceId: projected.id,
    label: projected.name,
    service: projected.leadService as LeadService,
    intent: projected.intent,
    category: projected.category,
    formProfile: projected.formProfile as RequestFormProfile,
    analyticsServiceType: profile.analyticsServiceType,
    allowedUpgrades: projected.allowedUpgrades,
    dashboardLabel: projected.dashboardLabel,
    successMessage: projected.successMessage,
    confirmationEmailVariant: profile.confirmationEmailVariant,
  };
}

function optionsFor(location: RequestLocation): readonly RequestServiceOption[] {
  return (getRequestServicesForLocation(location) as readonly ProjectedService[]).map(
    toRequestServiceOption,
  );
}

export const requestLocationOptions = REQUEST_LOCATION_OPTIONS as readonly {
  id: Exclude<RequestLocation, "unsicher">;
  label: string;
  registryRegion: string;
}[];

export const requestServiceOptionsByLocation: Readonly<
  Record<RequestLocation, readonly RequestServiceOption[]>
> = {
  duesseldorf: optionsFor("duesseldorf"),
  regensburg: optionsFor("regensburg"),
  unsicher: optionsFor("unsicher"),
};

export function resolveAllowedRequestService(
  location: RequestLocation,
  serviceKey: string,
): RequestServiceOption | null {
  const projected = getRequestService(location, serviceKey) as ProjectedService | null;
  return projected ? toRequestServiceOption(projected) : null;
}

export function isRequestServiceAllowedAtLocation(
  location: RequestLocation,
  option: RequestServiceOption,
): boolean {
  return isAllowedRequestCombination(location, option.registryServiceId);
}
