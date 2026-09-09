import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/bueroumzug-muenchen", "Büroumzug", "München");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="München" service="Büroumzug" moving={true} />;
}
