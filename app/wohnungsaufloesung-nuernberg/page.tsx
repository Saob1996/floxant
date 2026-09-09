import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/wohnungsaufloesung-nuernberg", "Wohnungsauflösung", "Nürnberg");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Nürnberg" service="Wohnungsauflösung" moving={false} />;
}
