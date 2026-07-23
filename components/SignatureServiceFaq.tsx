import { FaqSection } from "@/components/FaqSection";
import { signatureServiceFaqItems } from "@/lib/faqs";

type SignatureServiceFaqProps = {
  includeJsonLd?: boolean;
  className?: string;
};

export function SignatureServiceFaq({ includeJsonLd = false, className }: SignatureServiceFaqProps) {
  return (
    <FaqSection
      title="FAQ zu FLOXANT Signature Services"
      intro="Was die besonderen FLOXANT Wege leisten, wo Grenzen liegen und wann welcher Startpunkt passt."
      items={signatureServiceFaqItems}
      includeJsonLd={includeJsonLd}
      className={className}
    />
  );
}
