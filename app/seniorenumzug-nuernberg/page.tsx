import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/seniorenumzug-nuernberg", "Seniorenumzug", "Nürnberg");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Nürnberg" service="Seniorenumzug" moving={true} />;
}
