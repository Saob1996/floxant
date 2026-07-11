import {
  buildDuesseldorfCleaningMetadata,
  DuesseldorfCleaningServicePage,
} from "@/components/duesseldorf/DuesseldorfCleaningServicePage";

export const metadata = buildDuesseldorfCleaningMetadata("bueroreinigung");

export default function DuesseldorfBueroreinigungPage() {
  return <DuesseldorfCleaningServicePage pageKey="bueroreinigung" />;
}
