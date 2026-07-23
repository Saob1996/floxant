import type { ReactNode } from "react";

import { DocumentLanguage } from "@/components/seo/DocumentLanguage";

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.lang='en';" }} />
      <DocumentLanguage lang="en" />
      {children}
    </>
  );
}
