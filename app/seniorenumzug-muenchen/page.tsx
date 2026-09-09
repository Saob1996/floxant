import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/seniorenumzug-muenchen", "Seniorenumzug", "München");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="München" service="Seniorenumzug" moving={true} />;
}
