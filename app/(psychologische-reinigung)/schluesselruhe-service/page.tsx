import {
  PsychologicalCleaningLandingRoute,
  generatePsychologicalCleaningLandingMetadata,
} from "@/components/PsychologicalCleaningLandingRoute";

export const generateMetadata = () =>
  generatePsychologicalCleaningLandingMetadata("schluesselruhe-service");

export default function SchluesselruheServicePage() {
  return <PsychologicalCleaningLandingRoute slug="schluesselruhe-service" />;
}
