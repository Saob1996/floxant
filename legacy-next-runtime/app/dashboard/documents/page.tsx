import type { Metadata } from "next";
import { DocumentSystemClient } from "@/components/dashboard/documents/DocumentSystemClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
 title: "Dokumente | FLOXANT Dashboard",
 robots: {
  index: false,
  follow: false,
 },
};

export default function DashboardDocumentsPage() {
 return <DocumentSystemClient />;
}

