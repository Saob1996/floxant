import { NoPrefetchLink as Link } from "@/components/NoPrefetchLink";
import type { ReactNode } from "react";

import { resolveCtaConfig } from "@/lib/cta-config";
import { resolveLeadIntent, type LeadPriority, type LeadService } from "@/lib/lead-intents";

type LeadCtaProps = {
  path?: string;
  service?: LeadService | string;
  city?: string;
  intent?: string;
  priority?: LeadPriority | string;
  label?: string;
  href?: string;
  source?: string;
  className?: string;
  children?: ReactNode;
  prefetch?: boolean;
};

export function LeadCta({
  path,
  service,
  city,
  intent,
  priority,
  label,
  href,
  source = "seo",
  className,
  children,
  prefetch,
}: LeadCtaProps) {
  const lead = resolveLeadIntent({
    path,
    service,
    city,
    intent,
    priority,
    ctaLabel: label,
  });
  const cta = resolveCtaConfig({
    ctaKey: "service-contact",
    href,
    serviceKey: lead.service,
    city: lead.city,
    intent: lead.intent,
    priority: lead.priority,
    label: label || lead.ctaLabel,
    source,
  });

  return (
    <Link
      href={cta.href}
      prefetch={prefetch}
      className={className}
      data-event={cta.dataAttributes.event}
      data-service={cta.dataAttributes.service}
      data-city={cta.dataAttributes.city}
      data-page-intent={cta.dataAttributes.pageIntent}
      data-priority={cta.dataAttributes.priority}
      data-cta-label={cta.dataAttributes.ctaLabel}
      data-destination={cta.dataAttributes.destination}
      data-source={cta.dataAttributes.source}
    >
      {children || cta.label}
    </Link>
  );
}
