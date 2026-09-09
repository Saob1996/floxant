import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/klaviertransport-passau", "Klaviertransport", "Passau");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Passau" service="Klaviertransport" moving={true} />;
}
