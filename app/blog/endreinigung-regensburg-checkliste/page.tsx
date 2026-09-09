import { PracticalGuidePage, buildPracticalGuideMetadata } from "@/components/blog/PracticalGuidePage";
import { getPracticalGuide } from "@/lib/practical-guides";

const slug = "endreinigung-regensburg-checkliste";
export const metadata = buildPracticalGuideMetadata(slug);

export default function GuidePage() {
  return <PracticalGuidePage guide={getPracticalGuide(slug)} />;
}
