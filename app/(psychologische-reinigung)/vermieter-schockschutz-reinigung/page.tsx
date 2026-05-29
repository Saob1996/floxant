import {
  PsychologicalCleaningLandingRoute,
  generatePsychologicalCleaningLandingMetadata,
} from "@/components/PsychologicalCleaningLandingRoute";

export const generateMetadata = () =>
  generatePsychologicalCleaningLandingMetadata("vermieter-schockschutz-reinigung");

export default function VermieterSchockschutzReinigungPage() {
  return <PsychologicalCleaningLandingRoute slug="vermieter-schockschutz-reinigung" />;
}
