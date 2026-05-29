import type { Metadata } from "next";

import { PropertyOperationsLandingPage } from "@/components/PropertyOperationsLandingPage";
import {
  createPropertyOperationsMetadata,
  getPropertyOperationsPage,
} from "@/lib/property-operations-pages";

export async function generateMetadata(): Promise<Metadata> {
  return createPropertyOperationsMetadata("urlaubsretter");
}

export default function UrlaubsretterPage() {
  return <PropertyOperationsLandingPage page={getPropertyOperationsPage("urlaubsretter")} />;
}
