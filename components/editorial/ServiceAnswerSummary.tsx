import {
  IncludedExcluded,
  KeyFacts,
  NextStep,
  QuickAnswer,
  RelatedServices,
  RequiredDetails,
  ScopeSummary,
} from "@/components/editorial/AuthorityBlocks";
import {
  getServiceById,
  selectPublicServiceFields,
  type InternalServiceRecord,
} from "@/lib/services/service-registry";

export function ServiceAnswerSummary({
  serviceId,
  region,
  className = "",
}: {
  serviceId: string;
  region?: "Düsseldorf" | "Regensburg";
  className?: string;
}) {
  const rawService = getServiceById(serviceId);
  if (!rawService?.publicVisible) return null;
  const service = selectPublicServiceFields(rawService);
  const related = rawService.relatedServiceIds
    .map((id) => getServiceById(id))
    .filter((item): item is InternalServiceRecord => Boolean(item?.publicVisible))
    .slice(0, 4)
    .map((item) => selectPublicServiceFields(item))
    .map((item) => ({
      href: item.publicRoute,
      label: item.publicTitle,
      description: item.publicDescription,
    }));
  const regions = region ? [region] : service.publicRegions;

  return (
    <section
      aria-label={`Kurzüberblick ${service.publicTitle}`}
      className={`bg-white px-5 py-16 sm:px-8 lg:px-10 ${className}`.trim()}
    >
      <div className="mx-auto grid max-w-7xl gap-8">
        <QuickAnswer title={`${service.publicTitle}: Was wird angeboten?`}>
          <p>{service.publicDescription}</p>
        </QuickAnswer>

        <KeyFacts
          items={[
            { label: "Für wen", value: service.publicTargetAudiences.slice(0, 3).join(", ") || service.publicAudienceLabels.join(", ") },
            { label: "Wo", value: regions.join(" und ") },
            { label: "Rhythmus", value: service.publicCadence },
          ]}
        />

        <ScopeSummary title="Leistung und Grenze gehören zusammen.">
          <p>{service.publicHeadline}</p>
        </ScopeSummary>

        <IncludedExcluded
          included={service.publicBenefits.length ? service.publicBenefits : [service.publicDescription]}
          excluded={["Nicht beschriebene Zusatzleistungen werden vor einem Angebot persönlich geklärt."]}
        />

        <RequiredDetails items={service.publicRequirements} />

        {related.length ? <RelatedServices links={related} /> : null}

        <NextStep
          title="Nächsten Schritt vorbereiten"
          text="Senden Sie die bekannten Eckdaten. Offene Punkte dürfen als unklar markiert werden; eine Anfrage ist noch keine Buchung."
          href={service.publicCta.href}
          label={service.publicCta.label}
        />
      </div>
    </section>
  );
}
