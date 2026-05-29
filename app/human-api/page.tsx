import type { Metadata } from "next";

import { PropertyOperationsLandingPage } from "@/components/PropertyOperationsLandingPage";
import {
  createPropertyOperationsMetadata,
  getPropertyOperationsPage,
} from "@/lib/property-operations-pages";

export async function generateMetadata(): Promise<Metadata> {
  return createPropertyOperationsMetadata("human-api");
}

export default function HumanApiPage() {
  return <PropertyOperationsLandingPage page={getPropertyOperationsPage("human-api")} />;
}
