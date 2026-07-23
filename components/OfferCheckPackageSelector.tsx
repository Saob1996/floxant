import { ServicePackageSelector } from "@/components/ServicePackageSelector";

export function OfferCheckPackageSelector() {
  return (
    <ServicePackageSelector
      groups="angebot-pruefen"
      title="Welcher Angebotscheck passt?"
      intro="Ob einzelnes Angebot, mehrere Anbieter, Zweitmeinung oder Plan B: Der passende Pruefpfad bestimmt, welche Angaben zuerst wichtig sind."
      limit={8}
    />
  );
}
