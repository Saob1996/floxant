import type { Metadata } from "next";

import { LocalSeoPage } from "@/components/local-seo/LocalSeoPage";
import { getLocalSeoPageByPath } from "@/lib/local-seo/localSeoPages";
import { buildLocalSeoMetadata } from "@/lib/local-seo/seoMetadata";

const page = getLocalSeoPageByPath("/duesseldorf/reinigungsdienst")!;

export const metadata: Metadata = buildLocalSeoMetadata(page);

export default function DuesseldorfReinigungsdienstPage() {
  return <LocalSeoPage page={page} />;
}
