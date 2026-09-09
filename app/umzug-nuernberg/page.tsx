import { LongDistanceMovePage, buildMovingRouteMetadata } from "@/components/LongDistanceMovePage";

const slug = "umzug-nuernberg";
export const metadata = buildMovingRouteMetadata(slug);

export default function MovingRoutePage() {
  return <LongDistanceMovePage slug={slug} />;
}
