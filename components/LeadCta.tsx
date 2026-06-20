import Link from "next/link";
import type { ReactNode } from "react";

import { buildLeadHref, resolveLeadIntent, type LeadPriority, type LeadService } from "@/lib/lead-intents";

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
  const destination =
    href ||
    buildLeadHref({
      path,
      service: lead.service,
      city: lead.city,
      intent: lead.intent,
      priority: lead.priority,
    });
  const text = label || lead.ctaLabel;

  return (
    <Link
      href={destination}
      prefetch={prefetch}
      className={className}
      data-event="seo_cta_click"
      data-service={lead.trackingService}
      data-city={lead.trackingCity || undefined}
      data-page-intent={lead.trackingIntent}
      data-priority={lead.priority}
      data-cta-label={text}
      data-destination={destination}
      data-source={source}
    >
      {children || text}
    </Link>
  );
}
