import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/klaviertransport-muenchen", "Klaviertransport", "München");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="München" service="Klaviertransport" moving={true} />;
}
