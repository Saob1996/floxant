import {
  PsychologicalCleaningLandingRoute,
  generatePsychologicalCleaningLandingMetadata,
} from "@/components/PsychologicalCleaningLandingRoute";

export const generateMetadata = () =>
  generatePsychologicalCleaningLandingMetadata("hidden-dirt-check");

export default function HiddenDirtCheckPage() {
  return <PsychologicalCleaningLandingRoute slug="hidden-dirt-check" />;
}
