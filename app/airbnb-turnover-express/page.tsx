import type { Metadata } from "next";

import { PropertyOperationsLandingPage } from "@/components/PropertyOperationsLandingPage";
import {
  createPropertyOperationsMetadata,
  getPropertyOperationsPage,
} from "@/lib/property-operations-pages";

export async function generateMetadata(): Promise<Metadata> {
  return createPropertyOperationsMetadata("airbnb-turnover-express");
}

export default function AirbnbTurnoverExpressPage() {
  return <PropertyOperationsLandingPage page={getPropertyOperationsPage("airbnb-turnover-express")} />;
}
