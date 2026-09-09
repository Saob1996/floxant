import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/entruempelung-muenchen", "Entrümpelung", "München");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="München" service="Entrümpelung" moving={false} />;
}
