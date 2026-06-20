import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import { LeadCta } from "@/components/LeadCta";

type OpportunityLinkCard = {
  title: string;
  text: string;
  href?: string;
  cta?: string;
};

type GscOpportunitySectionProps = {
  eyebrow: string;
  title: string;
  intro: string;
  proofTitle: string;
  proofItems: readonly string[];
  cards: readonly OpportunityLinkCard[];
  checklistTitle: string;
  checklist: readonly string[];
  combinationsTitle: string;
  combinations: readonly OpportunityLinkCard[];
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  trackingService?: string;
  trackingCity?: string;
  trackingPageIntent?: string;
  trackingPriority?: "p0" | "p1" | "p2" | "p3";
};

const icons = [FileText, Camera, ClipboardCheck, MapPin, ShieldCheck, MessageCircle] as const;

function getHrefSearchParam(href: string | undefined, key: string) {
  if (!href || !href.includes("?")) return "";
  const query = href.slice(href.indexOf("?") + 1).split("#")[0];
  return new URLSearchParams(query).get(key) || "";
}

export function GscOpportunitySection({
  eyebrow,
  title,
  intro,
  proofTitle,
  proofItems,
  cards,
  checklistTitle,
  checklist,
  combinationsTitle,
  combinations,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  trackingService,
  trackingCity,
  trackingPageIntent,
  trackingPriority,
}: GscOpportunitySectionProps) {
  const useLeadCta = Boolean(trackingService && trackingPageIntent);
  const inferredTrackingService = trackingService || getHrefSearchParam(primaryHref, "service");
  const inferredTrackingCity =
    trackingCity || getHrefSearchParam(primaryHref, "city") || getHrefSearchParam(primaryHref, "region");
  const rawTrackingIntent = trackingPageIntent || getHrefSearchParam(primaryHref, "intent");
  const resolvedTrackingIntent =
    inferredTrackingService && inferredTrackingCity && rawTrackingIntent && !rawTrackingIntent.includes(inferredTrackingCity)
      ? `${inferredTrackingService}-${inferredTrackingCity}`
      : rawTrackingIntent || (inferredTrackingService && inferredTrackingCity ? `${inferredTrackingService}-${inferredTrackingCity}` : inferredTrackingService);

  return (
    <section className="flox-section px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="text-[10px] font-black uppercase tracking-normal text-blue-700">
              {eyebrow}
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 md:text-5xl">
              {title}
            </h2>
          </div>
          <p className="text-sm leading-7 text-slate-700 md:text-base md:leading-8">
            {intro}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {proofItems.map((item) => (
            <article
              key={item}
              className="min-w-0 rounded-[1rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <h3 className="mt-4 text-base font-black text-slate-950">{proofTitle}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = icons[index % icons.length] || FileText;
            const body = (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-[0.8rem] bg-slate-950 text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-lg font-black leading-snug text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{card.text}</p>
                {card.cta ? (
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                    {card.cta}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                ) : null}
              </>
            );

            return card.href ? (
              <Link
                key={card.title}
                href={card.href}
                className="group min-w-0 rounded-[1rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-slate-950/10"
                data-event="service_card_click"
              >
                {body}
              </Link>
            ) : (
              <article
                key={card.title}
                className="min-w-0 rounded-[1rem] border border-slate-200 bg-slate-50 p-5"
              >
                {body}
              </article>
            );
          })}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <article className="rounded-[1rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
            <div className="text-[10px] font-black uppercase tracking-normal text-blue-700">
              Vor der Anfrage
            </div>
            <h3 className="mt-3 text-2xl font-black text-slate-950">{checklistTitle}</h3>
            <div className="mt-5 grid gap-3">
              {checklist.map((item) => (
                <div key={item} className="flex gap-3 text-sm font-semibold leading-7 text-slate-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1rem] border border-blue-100 bg-blue-50 p-6">
            <div className="text-[10px] font-black uppercase tracking-normal text-blue-700">
              Kombinierte Leistungen
            </div>
            <h3 className="mt-3 text-2xl font-black text-slate-950">{combinationsTitle}</h3>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {combinations.map((item) => (
                <Link
                  key={item.title}
                  href={item.href || primaryHref}
                  className="min-w-0 rounded-[0.9rem] border border-blue-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
                  data-event="service_card_click"
                >
                  <h4 className="text-sm font-black text-slate-950">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
                </Link>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-[1rem] border border-slate-200 bg-slate-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-normal text-cyan-200">
              Kostenlos und unverbindlich
            </div>
            <p className="mt-2 text-sm font-semibold leading-7 text-slate-200">
              Senden Sie die wichtigsten Eckdaten, Fotos oder ein vorhandenes Angebot. FLOXANT
              schaut sich Ihren Fall an und meldet sich mit einem realistischen nächsten Schritt.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {useLeadCta ? (
              <LeadCta
                service={inferredTrackingService}
                city={inferredTrackingCity}
                intent={resolvedTrackingIntent}
                priority={trackingPriority || "p2"}
                label={primaryLabel}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] bg-white px-5 text-sm font-black text-slate-950"
              >
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </LeadCta>
            ) : (
              <Link
                href={primaryHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] bg-white px-5 text-sm font-black text-slate-950"
                data-event="seo_cta_click"
                data-service={inferredTrackingService}
                data-city={inferredTrackingCity}
                data-page-intent={resolvedTrackingIntent}
                data-priority={trackingPriority}
                data-cta-label={primaryLabel}
                data-destination={primaryHref}
              >
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            {secondaryHref && secondaryLabel ? (
              useLeadCta ? (
                <LeadCta
                  service={inferredTrackingService}
                  city={inferredTrackingCity}
                  intent={resolvedTrackingIntent}
                  priority={trackingPriority || "p2"}
                  label={secondaryLabel}
                  className="inline-flex min-h-12 items-center justify-center rounded-[0.85rem] border border-white/20 bg-white/10 px-5 text-sm font-black text-white"
                >
                  {secondaryLabel}
                </LeadCta>
              ) : (
                <Link
                  href={secondaryHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-[0.85rem] border border-white/20 bg-white/10 px-5 text-sm font-black text-white"
                  data-event="seo_cta_click"
                  data-service={inferredTrackingService}
                  data-city={inferredTrackingCity}
                  data-page-intent={resolvedTrackingIntent}
                  data-priority={trackingPriority}
                  data-cta-label={secondaryLabel}
                  data-destination={secondaryHref}
                >
                  {secondaryLabel}
                </Link>
              )
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
