import { PracticalGuidePage, buildPracticalGuideMetadata } from "@/components/blog/PracticalGuidePage";
import { getPracticalGuide } from "@/lib/practical-guides";

const slug = "fensterreinigung-duesseldorf-preisfaktoren";
export const metadata = buildPracticalGuideMetadata(slug);

export default function GuidePage() {
  return <PracticalGuidePage guide={getPracticalGuide(slug)} />;
}
