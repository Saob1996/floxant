import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/umzug-augsburg", "Umzug", "Augsburg");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Augsburg" service="Umzug" moving={true} />;
}
