import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/entruempelung-wuerzburg", "Entrümpelung", "Würzburg");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Würzburg" service="Entrümpelung" moving={false} />;
}
