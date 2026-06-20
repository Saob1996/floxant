import { GrowthServiceLandingPage } from "@/components/GrowthServiceLandingPage";
import {
  buildGrowthServiceMetadata,
  getGrowthServicePage,
} from "@/lib/growth-service-pages";

const config = getGrowthServicePage("pv-anlagen-reinigung");

export const metadata = buildGrowthServiceMetadata(config);

export default function PvAnlagenReinigungPage() {
  return <GrowthServiceLandingPage config={config} />;
}
