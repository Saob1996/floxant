import {
  PsychologicalCleaningLandingRoute,
  generatePsychologicalCleaningLandingMetadata,
} from "@/components/PsychologicalCleaningLandingRoute";

export const generateMetadata = () =>
  generatePsychologicalCleaningLandingMetadata("atemruhig-reinigung");

export default function AtemruhigReinigungPage() {
  return <PsychologicalCleaningLandingRoute slug="atemruhig-reinigung" />;
}
