import { GrowthServiceLandingPage } from "@/components/GrowthServiceLandingPage";
import {
  buildGrowthServiceMetadata,
  getGrowthServicePage,
} from "@/lib/growth-service-pages";

const config = getGrowthServicePage("solarreinigung");

export const metadata = buildGrowthServiceMetadata(config);

export default function SolarreinigungPage() {
  return <GrowthServiceLandingPage config={config} />;
}
