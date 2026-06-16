import { GrowthServiceLandingPage } from "@/components/GrowthServiceLandingPage";
import {
  buildGrowthServiceMetadata,
  getGrowthServicePage,
} from "@/lib/growth-service-pages";

const config = getGrowthServicePage("regensburg-solarreinigung");

export const metadata = buildGrowthServiceMetadata(config);

export default function RegensburgSolarreinigungPage() {
  return <GrowthServiceLandingPage config={config} />;
}
