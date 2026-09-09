import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/bueroumzug-augsburg", "Büroumzug", "Augsburg");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Augsburg" service="Büroumzug" moving={true} />;
}
