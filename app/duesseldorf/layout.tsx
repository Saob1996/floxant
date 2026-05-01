import type { ReactNode } from "react";

import { DuesseldorfChrome } from "@/components/duesseldorf/DuesseldorfChrome";
import { DuesseldorfStickyActions } from "@/components/duesseldorf/DuesseldorfStickyActions";

export default function DuesseldorfLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DuesseldorfChrome>
      {children}
      <DuesseldorfStickyActions />
    </DuesseldorfChrome>
  );
}

