import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/wohnungsaufloesung-augsburg", "Wohnungsauflösung", "Augsburg");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Augsburg" service="Wohnungsauflösung" moving={false} />;
}
