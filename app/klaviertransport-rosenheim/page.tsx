import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/klaviertransport-rosenheim", "Klaviertransport", "Rosenheim");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Rosenheim" service="Klaviertransport" moving={true} />;
}
