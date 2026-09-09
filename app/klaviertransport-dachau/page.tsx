import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/klaviertransport-dachau", "Klaviertransport", "Dachau");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Dachau" service="Klaviertransport" moving={true} />;
}
