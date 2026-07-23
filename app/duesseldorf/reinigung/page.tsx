import {
  buildDuesseldorfCleaningMetadata,
  DuesseldorfCleaningServicePage,
} from "@/components/duesseldorf/DuesseldorfCleaningServicePage";

export const metadata = buildDuesseldorfCleaningMetadata("reinigung");

export default function DuesseldorfReinigungPage() {
  return <DuesseldorfCleaningServicePage pageKey="reinigung" />;
}
