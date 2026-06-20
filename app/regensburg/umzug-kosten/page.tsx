import type { Metadata } from "next";

import { LocalSeoPage } from "@/components/local-seo/LocalSeoPage";
import { getLocalSeoPageByPath } from "@/lib/local-seo/localSeoPages";
import { buildLocalSeoMetadata } from "@/lib/local-seo/seoMetadata";

const page = getLocalSeoPageByPath("/regensburg/umzug-kosten")!;

export const metadata: Metadata = buildLocalSeoMetadata(page);

export default function RegensburgUmzugKostenPage() {
  return <LocalSeoPage page={page} />;
}
