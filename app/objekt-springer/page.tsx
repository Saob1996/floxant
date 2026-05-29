import type { Metadata } from "next";

import { PropertyOperationsLandingPage } from "@/components/PropertyOperationsLandingPage";
import {
  createPropertyOperationsMetadata,
  getPropertyOperationsPage,
} from "@/lib/property-operations-pages";

export async function generateMetadata(): Promise<Metadata> {
  return createPropertyOperationsMetadata("objekt-springer");
}

export default function ObjektSpringerPage() {
  return <PropertyOperationsLandingPage page={getPropertyOperationsPage("objekt-springer")} />;
}
