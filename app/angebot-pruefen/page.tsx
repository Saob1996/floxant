import type { Metadata } from "next";

import { LocalSeoPage } from "@/components/local-seo/LocalSeoPage";
import { getLocalSeoPageByPath } from "@/lib/local-seo/localSeoPages";
import { buildLocalSeoMetadata } from "@/lib/local-seo/seoMetadata";

const page = getLocalSeoPageByPath("/angebot-pruefen")!;

export const metadata: Metadata = buildLocalSeoMetadata(page);

export default function AngebotPruefenPage() {
  return <LocalSeoPage page={page} />;
}
