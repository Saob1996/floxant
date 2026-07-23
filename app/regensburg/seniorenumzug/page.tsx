import type { Metadata } from "next";

import { LocalSeoPage } from "@/components/local-seo/LocalSeoPage";
import { getLocalSeoPageByPath } from "@/lib/local-seo/localSeoPages";
import { buildLocalSeoMetadata } from "@/lib/local-seo/seoMetadata";

const page = getLocalSeoPageByPath("/regensburg/seniorenumzug")!;

export const metadata: Metadata = buildLocalSeoMetadata(page);

export default function RegensburgSeniorenumzugPage() {
  return <LocalSeoPage page={page} />;
}
