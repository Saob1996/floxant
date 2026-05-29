import {
  PsychologicalCleaningLandingRoute,
  generatePsychologicalCleaningLandingMetadata,
} from "@/components/PsychologicalCleaningLandingRoute";

export const generateMetadata = () =>
  generatePsychologicalCleaningLandingMetadata("sichtbar-sauber-protokoll");

export default function SichtbarSauberProtokollPage() {
  return <PsychologicalCleaningLandingRoute slug="sichtbar-sauber-protokoll" />;
}
