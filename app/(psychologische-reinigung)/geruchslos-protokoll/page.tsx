import {
  PsychologicalCleaningLandingRoute,
  generatePsychologicalCleaningLandingMetadata,
} from "@/components/PsychologicalCleaningLandingRoute";

export const generateMetadata = () =>
  generatePsychologicalCleaningLandingMetadata("geruchslos-protokoll");

export default function GeruchslosProtokollPage() {
  return <PsychologicalCleaningLandingRoute slug="geruchslos-protokoll" />;
}
