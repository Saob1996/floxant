import { PracticalGuidePage, buildPracticalGuideMetadata } from "@/components/blog/PracticalGuidePage";
import { getPracticalGuide } from "@/lib/practical-guides";

const slug = "umzug-regensburg-tipps";
export const metadata = buildPracticalGuideMetadata(slug);

export default function GuidePage() {
  return <PracticalGuidePage guide={getPracticalGuide(slug)} />;
}
