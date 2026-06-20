import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";
import { getDuesseldorfServicePage } from "@/lib/duesseldorf-service-pages";

const page = getDuesseldorfServicePage("reinigung-heerdt");

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: page.path,
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default function DuesseldorfReinigungHeerdtPage() {
  return <DuesseldorfServicePage {...page} />;
}
