import type { Metadata } from "next";

import { AdminLogin } from "@/components/admin-dashboard/AdminLogin";

export const metadata: Metadata = {
  title: "Dashboard-Anmeldung | FLOXANT",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: {},
};

export default function DashboardLoginPage() {
  return <AdminLogin />;
}
