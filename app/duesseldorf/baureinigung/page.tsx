import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { getDuesseldorfServicePage } from "@/lib/duesseldorf-service-pages";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";


const page = getDuesseldorfServicePage("baureinigung");

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: page.path,
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default function DuesseldorfBaureinigungPage() {
  return <DuesseldorfServicePage {...page} />;
}
