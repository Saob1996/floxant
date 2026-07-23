import {
  getRequestChecklist,
  normalizeRequestChecklistKey,
  type RequestChecklistKey,
} from "@/lib/request-checklists";

export type PhotoGuidance = {
  serviceKey: RequestChecklistKey;
  title: string;
  intro: string;
  helpfulShots: string[];
  privacyNotes: string[];
};

const commonPrivacyNotes = [
  "Keine Ausweise, Vertragsseiten, Kontodaten oder privaten Nachrichten mitsenden.",
  "Kennzeichen, Namensschilder, Klingeln und fremde Personen nach Möglichkeit vermeiden.",
  "Fotos sind freiwillig und können auch nach dem Erstkontakt ergänzt werden.",
];

export function getPhotoGuidance(serviceKey?: string): PhotoGuidance {
  const checklist = getRequestChecklist(serviceKey);
  const key = normalizeRequestChecklistKey(serviceKey);

  return {
    serviceKey: key,
    title: `Welche Fotos bei ${checklist.shortLabel} helfen`,
    intro: checklist.microcopy.photoReminder,
    helpfulShots: checklist.photoHints,
    privacyNotes: commonPrivacyNotes,
  };
}

export function hasPhotoGuidance(serviceKey?: string) {
  return getRequestChecklist(serviceKey).photoHints.length > 0;
}
