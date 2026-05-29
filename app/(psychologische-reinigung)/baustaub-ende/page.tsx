import {
  PsychologicalCleaningLandingRoute,
  generatePsychologicalCleaningLandingMetadata,
} from "@/components/PsychologicalCleaningLandingRoute";

export const generateMetadata = () =>
  generatePsychologicalCleaningLandingMetadata("baustaub-ende");

export default function BaustaubEndePage() {
  return <PsychologicalCleaningLandingRoute slug="baustaub-ende" />;
}
