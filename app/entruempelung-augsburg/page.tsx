import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/entruempelung-augsburg", "Entrümpelung", "Augsburg");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Augsburg" service="Entrümpelung" moving={false} />;
}
