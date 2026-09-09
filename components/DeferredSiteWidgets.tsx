import MobileFloatingContact from "@/components/MobileFloatingContact";

// Retain the component interface; essential contact is part of initial HTML.
export function DeferredSiteWidgets({ showFloatingContact }: { showFloatingContact: boolean }) {
  return showFloatingContact ? <MobileFloatingContact /> : null;
}
