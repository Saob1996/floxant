import type { Metadata } from "next";

import { PropertyOperationsLandingPage } from "@/components/PropertyOperationsLandingPage";
import {
  createPropertyOperationsMetadata,
  getPropertyOperationsPage,
} from "@/lib/property-operations-pages";

export async function generateMetadata(): Promise<Metadata> {
  return createPropertyOperationsMetadata("business-errand-service");
}

export default function BusinessErrandServicePage() {
  return <PropertyOperationsLandingPage page={getPropertyOperationsPage("business-errand-service")} />;
}
