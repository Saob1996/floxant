import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/entruempelung-passau", "Entrümpelung", "Passau");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Passau" service="Entrümpelung" moving={false} />;
}
