import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";
import { getDuesseldorfServicePage } from "@/lib/duesseldorf-service-pages";

export const revalidate = 3600;

const page = getDuesseldorfServicePage("hotelreinigung");

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: page.path,
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default function DuesseldorfHotelreinigungPage() {
  return <DuesseldorfServicePage {...page} />;
}
