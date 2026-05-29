import {
  PsychologicalCleaningLandingRoute,
  generatePsychologicalCleaningLandingMetadata,
} from "@/components/PsychologicalCleaningLandingRoute";

export const generateMetadata = () =>
  generatePsychologicalCleaningLandingMetadata("reset-reinigung");

export default function ResetReinigungPage() {
  return <PsychologicalCleaningLandingRoute slug="reset-reinigung" />;
}
