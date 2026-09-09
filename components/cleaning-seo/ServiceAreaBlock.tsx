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
  intro = "FLOXANT prüft Reinigungsanfragen für Regensburg und den Umkreis bis 75 km. Nennen Sie den Einsatzort, die gewünschten Arbeiten und Ihren Terminwunsch.",
}: ServiceAreaBlockProps) {
  return (
    <div className={`bg-white px-5 py-14 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <CleaningServiceArea compact={compact} title={title} intro={intro} />
      </div>
    </div>
  );
}
