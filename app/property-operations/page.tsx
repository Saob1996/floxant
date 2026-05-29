import type { Metadata } from "next";

import { PropertyOperationsLandingPage } from "@/components/PropertyOperationsLandingPage";
import {
  createPropertyOperationsMetadata,
  getPropertyOperationsPage,
} from "@/lib/property-operations-pages";

export async function generateMetadata(): Promise<Metadata> {
  return createPropertyOperationsMetadata("property-operations");
}

export default function PropertyOperationsPage() {
  return <PropertyOperationsLandingPage page={getPropertyOperationsPage("property-operations")} />;
}
