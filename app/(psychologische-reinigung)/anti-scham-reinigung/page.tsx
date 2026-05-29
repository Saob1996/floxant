import {
  PsychologicalCleaningLandingRoute,
  generatePsychologicalCleaningLandingMetadata,
} from "@/components/PsychologicalCleaningLandingRoute";

export const generateMetadata = () =>
  generatePsychologicalCleaningLandingMetadata("anti-scham-reinigung");

export default function AntiSchamReinigungPage() {
  return <PsychologicalCleaningLandingRoute slug="anti-scham-reinigung" />;
}
