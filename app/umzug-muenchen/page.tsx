import { LongDistanceMovePage, buildMovingRouteMetadata } from "@/components/LongDistanceMovePage";

const slug = "umzug-muenchen";
export const metadata = buildMovingRouteMetadata(slug);

export default function MovingRoutePage() {
  return <LongDistanceMovePage slug={slug} />;
}
