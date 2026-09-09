import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/klaviertransport-nuernberg", "Klaviertransport", "Nürnberg");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Nürnberg" service="Klaviertransport" moving={true} />;
}
