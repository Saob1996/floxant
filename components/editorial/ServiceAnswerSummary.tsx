import {
  CostDrivers,
  IncludedExcluded,
  KeyFacts,
  NextStep,
  QuickAnswer,
  RelatedServices,
  RequiredDetails,
  ScopeSummary,
} from "@/components/editorial/AuthorityBlocks";
import { germanizeDeep } from "@/lib/german-text";
import { getServiceById, type ServiceRegistryEntry } from "@/lib/services/service-registry";

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
  const service = germanizeDeep(rawService) as ServiceRegistryEntry;
  const related = service.relatedServiceIds
    .map((id) => getServiceById(id))
    .filter((item): item is ServiceRegistryEntry => Boolean(item?.publicVisible))
    .slice(0, 4)
    .map((item) => ({
      href: item.canonicalRoute,
      label: germanizeDeep(item.germanName) as string,
      description: germanizeDeep(item.shortDescription) as string,
    }));
  const regions = region ? [region] : service.regions;

  return (
    <section
      aria-label={`Kurzüberblick ${service.germanName}`}
      className={`bg-white px-5 py-16 sm:px-8 lg:px-10 ${className}`.trim()}
    >
      <div className="mx-auto grid max-w-7xl gap-8">
        <QuickAnswer title={`${service.germanName}: Was wird angeboten?`}>
          <p>{service.detailedDescription}</p>
        </QuickAnswer>

        <KeyFacts
          items={[
            { label: "Für wen", value: service.targetAudiences.slice(0, 3).join(", ") || "private und gewerbliche Anfragen" },
            { label: "Wo", value: regions.join(" und ") },
            { label: "Rhythmus", value: service.cadence === "both" ? "einmalig oder regelmäßig" : service.cadence === "recurring" ? "regelmäßig" : "einmalig" },
          ]}
        />

        <ScopeSummary title="Leistung und Grenze gehören zusammen.">
          <p>{service.problemStatement}</p>
        </ScopeSummary>

        <IncludedExcluded
          included={service.includedServices.length ? service.includedServices : [service.shortDescription]}
          excluded={service.excludedServices}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <RequiredDetails items={service.requiredDetails} />
          <CostDrivers items={service.effortDrivers} />
        </div>

        {related.length ? <RelatedServices links={related} /> : null}

        <NextStep
          title="Nächsten Schritt vorbereiten"
          text="Senden Sie die bekannten Eckdaten. Offene Punkte dürfen als unklar markiert werden; eine Anfrage ist noch keine Buchung."
          href={service.cta.href}
          label={service.cta.label}
        />
      </div>
    </section>
  );
}
