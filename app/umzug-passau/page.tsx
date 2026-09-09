import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/umzug-passau", "Umzug", "Passau");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Passau" service="Umzug" moving={true} />;
}
