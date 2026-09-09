import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/entruempelung-nuernberg", "Entrümpelung", "Nürnberg");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Nürnberg" service="Entrümpelung" moving={false} />;
}
