import {
  PsychologicalCleaningLandingRoute,
  generatePsychologicalCleaningLandingMetadata,
} from "@/components/PsychologicalCleaningLandingRoute";

export const generateMetadata = () =>
  generatePsychologicalCleaningLandingMetadata("montagmorgen-effekt");

export default function MontagmorgenEffektPage() {
  return <PsychologicalCleaningLandingRoute slug="montagmorgen-effekt" />;
}
