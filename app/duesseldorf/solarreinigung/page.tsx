import { GrowthServiceLandingPage } from "@/components/GrowthServiceLandingPage";
import {
  buildGrowthServiceMetadata,
  getGrowthServicePage,
} from "@/lib/growth-service-pages";

const config = getGrowthServicePage("duesseldorf-solarreinigung");

export const metadata = buildGrowthServiceMetadata(config);

export default function DuesseldorfSolarreinigungPage() {
  return <GrowthServiceLandingPage config={config} />;
}
