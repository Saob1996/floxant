import type { ReactNode } from "react";

import { DocumentLanguage } from "@/components/seo/DocumentLanguage";

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocumentLanguage lang="en" />
      {children}
    </>
  );
}
