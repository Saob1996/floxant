import {
  PsychologicalCleaningLandingRoute,
  generatePsychologicalCleaningLandingMetadata,
} from "@/components/PsychologicalCleaningLandingRoute";

export const generateMetadata = () =>
  generatePsychologicalCleaningLandingMetadata("mama-kommt-morgen-service");

export default function MamaKommtMorgenServicePage() {
  return <PsychologicalCleaningLandingRoute slug="mama-kommt-morgen-service" />;
}
