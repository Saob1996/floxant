import type { Metadata } from "next";

import { PropertyOperationsLandingPage } from "@/components/PropertyOperationsLandingPage";
import {
  createPropertyOperationsMetadata,
  getPropertyOperationsPage,
} from "@/lib/property-operations-pages";

export async function generateMetadata(): Promise<Metadata> {
  return createPropertyOperationsMetadata("leerstandsmanagement");
}

export default function LeerstandsmanagementPage() {
  return <PropertyOperationsLandingPage page={getPropertyOperationsPage("leerstandsmanagement")} />;
}
