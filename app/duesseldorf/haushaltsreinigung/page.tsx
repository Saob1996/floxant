import type { Metadata } from "next";

import { LocalSeoPage } from "@/components/local-seo/LocalSeoPage";
import { getLocalSeoPageByPath } from "@/lib/local-seo/localSeoPages";
import { buildLocalSeoMetadata } from "@/lib/local-seo/seoMetadata";

const page = getLocalSeoPageByPath("/duesseldorf/haushaltsreinigung")!;

export const metadata: Metadata = buildLocalSeoMetadata(page);

export default function DuesseldorfHaushaltsreinigungPage() {
  return <LocalSeoPage page={page} />;
}
