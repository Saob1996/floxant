import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/wohnungsaufloesung-muenchen", "Wohnungsauflösung", "München");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="München" service="Wohnungsauflösung" moving={false} />;
}
