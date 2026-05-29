import {
  PsychologicalCleaningLandingRoute,
  generatePsychologicalCleaningLandingMetadata,
} from "@/components/PsychologicalCleaningLandingRoute";

export const generateMetadata = () =>
  generatePsychologicalCleaningLandingMetadata("panikfrei-in-24h");

export default function PanikfreiIn24hPage() {
  return <PsychologicalCleaningLandingRoute slug="panikfrei-in-24h" />;
}
