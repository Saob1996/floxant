import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/entruempelung-rosenheim", "Entrümpelung", "Rosenheim");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Rosenheim" service="Entrümpelung" moving={false} />;
}
