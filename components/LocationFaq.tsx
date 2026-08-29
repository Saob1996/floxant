import { FaqSection } from "@/components/FaqSection";
import { duesseldorfFaqItems, regensburgFaqItems } from "@/lib/faqs";

type LocationFaqProps = {
  location: "duesseldorf" | "regensburg";
  includeJsonLd?: boolean;
  className?: string;
};

export function LocationFaq({ location, includeJsonLd = false, className }: LocationFaqProps) {
  const isDuesseldorf = location === "duesseldorf";

  return (
    <FaqSection
      title={isDuesseldorf ? "FAQ zu Duesseldorf" : "FAQ zu Regensburg"}
      intro={
        isDuesseldorf
          ? "Lokale Antworten für Reinigung, Geschäftskunden und Angebotsprüfung in Düsseldorf."
          : "Lokale Antworten für Umzug, Reinigung, Entrümpelung und Angebotsprüfung in Regensburg."
      }
      items={isDuesseldorf ? duesseldorfFaqItems : regensburgFaqItems}
      includeJsonLd={includeJsonLd}
      className={className}
    />
  );
}
