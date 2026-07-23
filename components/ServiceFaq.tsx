import { FaqSection } from "@/components/FaqSection";
import { getServiceFaqItems, type ServiceFaqKey } from "@/lib/service-faqs";

type ServiceFaqProps = {
  faqKey: ServiceFaqKey;
  title?: string;
  intro?: string;
  includeJsonLd?: boolean;
  className?: string;
};

export function ServiceFaq({ faqKey, title, intro, includeJsonLd = false, className }: ServiceFaqProps) {
  return (
    <FaqSection
      title={title || "Fragen vor der Anfrage"}
      intro={intro || "Die wichtigsten Punkte fuer eine realistische FLOXANT-Einschaetzung."}
      items={getServiceFaqItems(faqKey, 6)}
      includeJsonLd={includeJsonLd}
      className={className}
    />
  );
}
