import authorityData from "@/data/full-service-authority.json";

export type AuthorityLocation = (typeof authorityData.locations)[number];
export type AuthorityService = (typeof authorityData.services)[number];
export type AuthoritySignatureService = (typeof authorityData.signatureServices)[number];
export type AuthorityProblemGroup = (typeof authorityData.problemGroups)[number];
export type AuthorityEnglishIntent = (typeof authorityData.englishIntents)[number];

export const fullServiceAuthority = authorityData;

export const authorityServices = authorityData.services;
export const authorityLocations = authorityData.locations;
export const authoritySignatureServices = authorityData.signatureServices;
export const authorityProblemGroups = authorityData.problemGroups;
export const authorityEnglishIntents = authorityData.englishIntents;

export function getAuthorityServicesByPriority(priority: AuthorityService["priority"]) {
  return authorityServices.filter((service) => service.priority === priority);
}
export function getAuthorityServicesByLocation(locationId: "duesseldorf" | "regensburg") {
  const availabilityKey = locationId === "duesseldorf" ? "duesseldorfAvailable" : "regensburgAvailable";
  return authorityServices.filter((service) => service[availabilityKey] !== "no");
}

export function getAuthorityServiceById(id: string) {
  return authorityServices.find((service) => service.id === id);
}
