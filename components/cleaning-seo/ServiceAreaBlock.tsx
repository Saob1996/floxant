import { CleaningServiceArea } from "@/components/CleaningServiceArea";

type ServiceAreaBlockProps = {
  className?: string;
  compact?: boolean;
  title?: string;
  intro?: string;
};

export function ServiceAreaBlock({
  className = "",
  compact = true,
  title = "Reinigungs-Servicegebiet Regensburg und Umgebung",
  intro = "Für Reinigungsservices konzentriert sich FLOXANT auf Regensburg und den Umkreis bis 50 km. Orte außerhalb dieses Radius werden nicht als eigene Reinigungsziele beworben.",
}: ServiceAreaBlockProps) {
  return (
    <div className={`bg-white px-5 py-14 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <CleaningServiceArea compact={compact} title={title} intro={intro} />
      </div>
    </div>
  );
}
