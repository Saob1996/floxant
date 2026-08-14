import {
  buildDuesseldorfCleaningMetadata,
  DuesseldorfCleaningServicePage,
} from "@/components/duesseldorf/DuesseldorfCleaningServicePage";

export const metadata = buildDuesseldorfCleaningMetadata("grundreinigung");

export default function DuesseldorfGrundreinigungPage() {
  return <DuesseldorfCleaningServicePage pageKey="grundreinigung" />;
}
