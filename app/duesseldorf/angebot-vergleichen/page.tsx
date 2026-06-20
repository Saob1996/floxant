import type { Metadata } from "next";

import { LocalSeoPage } from "@/components/local-seo/LocalSeoPage";
import { getLocalSeoPageByPath } from "@/lib/local-seo/localSeoPages";
import { buildLocalSeoMetadata } from "@/lib/local-seo/seoMetadata";

const page = getLocalSeoPageByPath("/duesseldorf/angebot-vergleichen")!;

export const metadata: Metadata = buildLocalSeoMetadata(page);

export default function DuesseldorfAngebotVergleichenPage() {
  return <LocalSeoPage page={page} />;
}
