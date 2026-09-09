import { ServiceAreaNotice, buildServiceAreaNoticeMetadata } from "@/components/ServiceAreaNotice";

export const metadata = buildServiceAreaNoticeMetadata("/bueroumzug-nuernberg", "Büroumzug", "Nürnberg");

export default function OutsideServiceAreaPage() {
  return <ServiceAreaNotice city="Nürnberg" service="Büroumzug" moving={true} />;
}
