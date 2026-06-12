import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { getDuesseldorfServicePage } from "@/lib/duesseldorf-service-pages";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";


const page = getDuesseldorfServicePage("firmenreinigung");

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: page.path,
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default function DuesseldorfFirmenreinigungPage() {
  return <DuesseldorfServicePage {...page} />;
}
